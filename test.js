/*
 * Copyright (c) 2017 Adventech <info@adventech.io>
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

var async = require("async"),
    redis = require("redis"),
    cheerio = require("cheerio"),
    request = require("request"),
    fswf = require("safe-write-file"),
    helper = require("./bible_helpers"),
    fs = require("fs");

var cursorBook = 0,
    cursorChapter = 0,
    bibleInfo = "";

var write = function(chapterRaw){
    var $ = cheerio.load(chapterRaw, {decodeEntities: false});
    var chapter = {};

    var prevVerse;

    $(".text").each(function(i, e){
        var verse = $(e).find(".versenum").text();
        if ($(e).find(".chapternum").length){
            verse = "1";
        }

        if (isNaN(parseInt(verse))){
            verse = prevVerse;
            chapter[parseInt(verse)] += $(e).html();
        } else {
            chapter[parseInt(verse)] = $(e).html();
        }

        prevVerse = verse;
    });

    try {
        var bookInfo = require("./bibles/" + bibleInfo.lang + "/" + bibleInfo.version + "/books/" + cursorBook.toString().lpad(2) + ".js");
        bookInfo.chapters[cursorChapter] = chapter;
        fswf("./bibles/" + bibleInfo.lang + "/" + bibleInfo.version + "/books/" + cursorBook.toString().lpad(2) + ".js", "var book = "+JSON.stringify(bookInfo, null, '\t')+";\nmodule.exports = book;");
    } catch (err){
        console.log(err)
    }
};

var scrapeBibleChapter = function(bookChapter, version, callback, scrapeOnly){
    var redis_client = redis.createClient();
    var url = "http://mobile.legacy.biblegateway.com/passage/?search=" + encodeURIComponent(bookChapter) + "&version=" + version;
    console.log("Fetching ", url);

    redis_client.get(url, function(err, reply) {
        if (!reply){
            request(
                {
                    "url": url,
                    "headers" : {
                        "User-Agent": "Mozilla/4.0 (compatible; MSIE 7.0; Windows NT 6.0)"
                    }
                },
                function(err, response, body) {
                    if (err) {console.log(err);return;}

                    var output = "";
                    var $ = cheerio.load(body, {decodeEntities: false});

                    $(".publisher-info-bottom").remove();
                    $(".passage-display-version").remove();

                    $(".passage-wrap > .passage-content").find(".passage-display, p").each(function(i, e){
                        $(e).find(".footnote, .footnotes").remove();
                        $(e).removeAttr("class");
                        $(e).removeAttr("id");
                        $(e).find("p, span, div, sup").removeAttr("id");
                        output += $("<div></div>").html($(e).clone()).html();
                        output = output.replace("h1>", "h3>");
                    });

                    redis_client.set(url, output);
                    redis_client.quit();

                    if (!scrapeOnly){
                        write(output);
                    }
                    setTimeout(function(){callback(null, 'test')}, 400);

                }
            );
        } else {
            redis_client.quit();
            if (!scrapeOnly){
                write(reply);
            }
            callback(null, 'test');
        }
    });
};

var scrapeBible = function(lang, version){
    var tasks = [];
    try {
        bibleInfo = require("./bibles/" + lang + "/" + version + "/info.js");

        for (var i = 1; i <= bibleInfo.books.length; i++){
            cursorBook = i;
            var bookInfo = {
                name: bibleInfo.books[i-1].name,
                numChapters: bibleInfo.books[i-1].numChapters,
                chapters: {}
            };
            fswf("./bibles/" + lang + "/" + version + "/books/" + cursorBook.toString().lpad(2) + ".js", "var book = "+JSON.stringify(bookInfo, null, '\t')+";\nmodule.exports = book;");

            for (var j = 1; j <= bibleInfo.books[i-1].numChapters; j++){
                cursorChapter = j;
                var bookName = bibleInfo.books[i-1].name + " " + cursorChapter;

                tasks.push((function(bookName,j,i){
                    return function(callback){
                        cursorBook = i;
                        cursorChapter = j;
                        scrapeBibleChapter(bookName, version, callback, false);
                    }
                })(bookName,j,i));
            }
        }
    } catch (err){
        console.log(err)
    }
    async.series(tasks);
};

/**
 * Scrapes Bible info and writes it as an info file
 * @param lang
 * @param version
 * @param name
 */
var scrapeBibleInfo = function(lang, version, name){
    var url = "https://www.biblegateway.com/versions/"+name;
    request(
        {
            "url": url,
            "headers" : {
                "User-Agent": "Mozilla/4.0 (compatible; MSIE 7.0; Windows NT 6.0)"
            }
        },
        function(err, response, body) {
            if (err) {console.log(err);}

            var $ = cheerio.load(body);

            var info = {
                lang: lang,
                version: version,
                books: []
            };

            $(".infotable tr").each(function(i, e){
                var numChapters = $(e).find(".num-chapters").text();
                $(e).find(".num-chapters").remove();
                var bookName = $(e).find(".book-name").text();
                info.books.push({"name": bookName, "numChapters": parseInt(numChapters), "synonyms": [bookName]});
            });

            fswf("./bibles/" + lang + "/" + version + "/info.js", "var info = " + JSON.stringify(info, null, '\t') + ";\nmodule.exports = info;");
        }
    );
};

/**
 * Creates Bible structure from offline version of Bible from wordproject
 * @param lang
 * @param version
 * @param pathPrefix
 */
function parseOfflineBible(lang, version, pathPrefix){
    var bibleInfo = {
        lang: lang,
        version: version,
        books: []
    };
    for (var i = 1; i <= 66; i++){
        var bookCursor = i.toString().lpad(2),
            bookIndex = fs.readFileSync(pathPrefix+bookCursor+"/1.html", "utf-8"),
            $ = cheerio.load(bookIndex, {decodeEntities: false}),
            bookName = $(".textHeader h2").text().customTrim("\n\r "),
            numChapters = $("p.ym-noprint").children().length;

        var bookInfo = {
            name: bookName,
            numChapters: numChapters,
            chapters: {}
        };


        for (var j = 1; j <= numChapters; j++){
            var chapterContent = fs.readFileSync(pathPrefix+bookCursor+"/" + j + ".html", "utf-8"),
                $$ = cheerio.load(chapterContent, {decodeEntities: false}),
                chapter = {};

            $$(".verse").each(function(verseIndex,verseElement){
                if ($$(verseElement)[0]
                    && $$(verseElement)[0].nextSibling
                    && $$(verseElement)[0].nextSibling.nodeValue
                ) {
                    chapter[$$(verseElement).text().customTrim(" ")] = "<span>"+$$(verseElement).text()+"</span> " + $$(verseElement)[0].nextSibling.nodeValue.customTrim("\n\r ");
                } else if ($$(verseElement)) {
                    chapter[$$(verseElement).text().customTrim(" ")] = "<span>"+$$(verseElement).text()+"</span>";
                }
            });

            bookInfo.chapters[j.toString()] = chapter;
        }
        fswf("./bibles/" + lang + "/" + version + "/books/" + bookCursor + ".js", "var book = "+JSON.stringify(bookInfo, null, '\t')+";\nmodule.exports = book;");
        bibleInfo.books.push({"name": bookName, "numChapters": parseInt(numChapters), "synonyms": [bookName]});
    }
    fswf("./bibles/" + lang + "/" + version + "/info.js", "var info = " + JSON.stringify(bibleInfo, null, '\t') + ";\nmodule.exports = info;");
}

/**
 * Quickly add synonyms given the array of them which is exact size as the length of books in target Bible
 * @param lang
 * @param version
 * @param synonyms
 */
function addSynonyms(lang, version, synonyms){
    var bibleInfo = require("./bibles/" + lang + "/" + version + "/info.js");
    if (bibleInfo.books.length === synonyms.length){
        for (var i = 0; i < bibleInfo.books.length; i++){
            bibleInfo.books[i].synonyms.push(synonyms[i]);
        }
    }
    fswf("./bibles/" + lang + "/" + version + "/info.js", "var info = " + JSON.stringify(bibleInfo, null, '\t') + ";\nmodule.exports = info;");
}

// scrapeBibleInfo("en", "nasb", "New-American-Standard-Bible-NASB");
// scrapeBibleInfo("pt", "arc", "Almeida-Revista-e-Corrigida-2009-ARC");
// scrapeBibleInfo("uk", "ukr", "Ukrainian-Bible-UKR");
// scrapeBibleInfo("fr", "lsg", "Louis-Segond-LSG");
// scrapeBibleInfo("bg", "bg1940", "1940-Bulgarian-Bible-BG1940");
// scrapeBibleInfo("es", "rvr1960", "Reina-Valera-1960-RVR1960-Biblia");
// scrapeBibleInfo("ja", "jlb", "Japanese-Living-Bible-JLB");
// scrapeBibleInfo("ro", "rmnn", "Cornilescu-1924-RMNN-Bible");
// scrapeBibleInfo("pt", "nvi-pt", encodeURIComponent("Nova-Versão-Internacional-NVI-PT-Bíblia"))
// scrapeBibleInfo("de", "luth1545", "Luther-Bibel-1545-LUTH1545")
// scrapeBibleInfo("zh", "cuvs", "Chinese-Union-Version-Simplified-CUVS");

// scrapeBible("en", "nasb");
// scrapeBible("ja", "jlb");
// scrapeBible("pt", "arc");
// scrapeBible("fr", "lsg");
// scrapeBible("bg", "bg1940");
// scrapeBible("es", "rvr1960");
// scrapeBible("ro", "rmnn");
// scrapeBible("uk", "ukr");
// scrapeBible("pt", "nvi-pt");
// scrapeBible("de", "luth1545");
// scrapeBible("zh", "cuvs");

// parseOfflineBible("in", "alkitab", "/Users/vitalik/Downloads/Bibles/id_tb/");
// addSynonyms("in", "alkitab", idSynonyms);
// parseOfflineBible("in", "alkitab", "/Users/vitalik/Downloads/Bibles/id_tb/");
// addSynonyms("in", "alkitab", idSynonyms);


//---------------------------------//-----------------------------------------//

// Scrape from BibleGateway

var argv = require("optimist")

  .usage("Pull Bible from BibleGateway.\n" +
    "Usage: $0 -l [string] -v [string] -n [string]")
  .alias({
    "l": "language",
    "v": "version",
    "n": "name"
  })
  .describe({
    "l": "Language of Bible.",
    "v": "Version of Bible in lowercase, e.g. nasb",
    "n": "Full name of Bible w/ caps abbreviation as defined in BibleGateway, e.g. New-American-Standard-Bible-NASB"
  })
  .demand(["l", "v", "n"])
  .argv;

scrapeBibleInfo(argv.l, argv.v, argv.n);
console.log(argv.v + " info scraping completed.")

scrapeBible(argv.l, argv.v);
console.log(argv.v + " Bible scraping completed.")
