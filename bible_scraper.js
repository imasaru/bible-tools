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
    fs = require("fs-extra"),
    htmlEntities = require('html-entities').XmlEntities,
    changeCase = require('change-case'),
    _ = require("lodash");


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
                    setTimeout(function(){callback(null, 'test')}, 800);

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
            if (i!==5)continue;
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
            bookIndex = fs.readFileSync(pathPrefix+bookCursor+"/1.htm", "utf-8"),
            $ = cheerio.load(bookIndex, {decodeEntities: false}),
            bookName = $(".textHeader h2").text().customTrim("\n\r\t ").replace(/ 1$/, ""),
            numChapters = $("p.ym-noprint").children("A, span").length;

        var bookInfo = {
            name: bookName,
            numChapters: numChapters,
            chapters: {}
        };

        if (numChapters == 0) {
            console.log("0 num chapters, book = ", bookCursor);
        }


        for (var j = 1; j <= numChapters; j++){
            var chapterContent = fs.readFileSync(pathPrefix+bookCursor+"/" + j + ".htm", "utf-8"),
                $$ = cheerio.load(chapterContent, {decodeEntities: false}),
                chapter = {};

            var buffer = "",
                cur_verse = 0;

            var sel = ".textBody p";

            if (!$$(sel).length){
              sel = ".textBody";
            }

            $$(sel).children().each(function(index, element){
                if ($$(element).hasClass("verse")) {
                    if (cur_verse > 0){
                        chapter[cur_verse.toString()] = "<span>"+cur_verse.toString()+"</span> " + buffer.customTrim(" ");
                    }
                    buffer = "";
                    cur_verse = cur_verse+1;
                } else {
                    buffer += $$(element).text().customTrim("\n\r\t ") + " ";
                }

                if ($$(element)[0].nextSibling && $$(element)[0].nextSibling.nodeValue){
                    buffer += $$(element)[0].nextSibling.nodeValue.customTrim("\n\r\t ");
                }
            });

            if (cur_verse==1){
              cur_verse = 0;

              console.log("0 verses in chapter", j, " of book = ", bookCursor);

              var new_el = "<div><span class='verse'>"+cur_verse.toString()+" </span> " + buffer.customTrim(" ").replace(/(\d)/g, "<span class='verse'>$1</span>")+"</div>";

              buffer = "";
              $$(new_el).children().each(function(index, element) {
                if ($$(element).hasClass("verse")) {
                  if (cur_verse > 0){
                    chapter[cur_verse.toString()] = "<span>"+cur_verse.toString()+"</span> " + buffer.customTrim(" ");
                  }
                  buffer = "";
                  cur_verse = cur_verse+1;
                } else {
                  buffer += $$(element).text().customTrim("\n\r\t ") + " ";
                }

                if ($$(element)[0].nextSibling && $$(element)[0].nextSibling.nodeValue){
                  buffer += $$(element)[0].nextSibling.nodeValue.customTrim("\n\r\t ");
                }
              });
            }

            chapter[(cur_verse).toString()] = "<span>"+cur_verse.toString()+"</span> " + buffer.customTrim(" ");

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


/**
 *
 */
function reformatBibleJson(lang, version, path){
    var bibleJSON = require(path);
    var bookNames = [
{ "book_id": 1, "name": "ປະຖົມມະການ" },
{ "book_id": 2, "name": "ອົບພະຍົບ" },
{ "book_id": 3, "name": "ກົດລະບຽບການເລວີ" },
{ "book_id": 4, "name": "ຈົດເຊັນບັນຊີ" },
{ "book_id": 5, "name": "ພຣະບັນຍັດສອງ" },
{ "book_id": 6, "name": "ໂຢຊວຍ" },
{ "book_id": 7, "name": "ພວກຜູ້ປົກຄອງ" },
{ "book_id": 8, "name": "ນາງຣຸດ" },
{ "book_id": 9, "name": "1 ຊາມູເອນ" },
{ "book_id": 10, "name": "2 ຊາມູເອນ" },
{ "book_id": 11, "name": "1 ກະສັດ" },
{ "book_id": 12, "name": "2 ກະສັດ" },
{ "book_id": 13, "name": "1 ຂ່າວຄາວ" },
{ "book_id": 14, "name": "2 ຂ່າວຄາວ" },
{ "book_id": 15, "name": "ເອັດຊະຣາ" },
{ "book_id": 16, "name": "ເນເຮມີຢາ" },
{ "book_id": 17, "name": "ເອສະເທີ" },
{ "book_id": 18, "name": "ໂຢບ" },
{ "book_id": 19, "name": "ເພງສັນລະເສີນ" },
{ "book_id": 20, "name": "ສຸພາສິດ" },
{ "book_id": 21, "name": "ປັນຍາຈານ" },
{ "book_id": 22, "name": "ຍອດເພງ" },
{ "book_id": 23, "name": "ເອຊາຢາ" },
{ "book_id": 24, "name": "ເຢເຣມີຢາ" },
{ "book_id": 25, "name": "ເພງຄ່ຳຄວນ" },
{ "book_id": 26, "name": "ເອເຊກີ​ເອນ" },
{ "book_id": 27, "name": "ດານີເອນ" },
{ "book_id": 28, "name": "ໂຮເຊອາ" },
{ "book_id": 29, "name": "ໂຢເອນ" },
{ "book_id": 30, "name": "ອາໂມດ" },
{ "book_id": 31, "name": "ໂອບາດີຢາ" },
{ "book_id": 32, "name": "ໂຢນາ" },
{ "book_id": 33, "name": "ມີກາ" },
{ "book_id": 34, "name": "ນາຮູມ" },
{ "book_id": 35, "name": "ຮາບາກຸກ" },
{ "book_id": 36, "name": "ເຊຟານີຢາ" },
{ "book_id": 37, "name": "ຮັກກາຍ" },
{ "book_id": 38, "name": "ເຊຄາຣີຢາ" },
{ "book_id": 39, "name": "ມາລາກີ" },
{ "book_id": 40, "name": "ມັດທາຍ" },
{ "book_id": 41, "name": "ມາຣະໂກ" },
{ "book_id": 42, "name": "ລູກາ" },
{ "book_id": 43, "name": "ໂຢຮັນ" },
{ "book_id": 44, "name": "ກິດຈະການ" },
{ "book_id": 45, "name": "ໂຣມ" },
{ "book_id": 46, "name": "1 ໂກຣິນໂທ" },
{ "book_id": 47, "name": "2 ໂກຣິນໂທ" },
{ "book_id": 48, "name": "ຄາລາເຕຍ" },
{ "book_id": 49, "name": "ເອເຟໂຊ" },
{ "book_id": 50, "name": "ຟີລິບປອຍ" },
{ "book_id": 51, "name": "ໂກໂລຊາຍ" },
{ "book_id": 52, "name": "1 ເທຊະໂລນິກ" },
{ "book_id": 53, "name": "2 ເທຊະໂລນິກ" },
{ "book_id": 54, "name": "1 ຕີໂມທຽວ" },
{ "book_id": 55, "name": "2 ຕີໂມທຽວ" },
{ "book_id": 56, "name": "ຕີໂຕ" },
{ "book_id": 57, "name": "ຟີເລໂມນ" },
{ "book_id": 58, "name": "ເຮັບເຣີ" },
{ "book_id": 59, "name": "ຢາໂກໂບ" },
{ "book_id": 60, "name": "1 ເປໂຕ" },
{ "book_id": 61, "name": "2 ເປໂຕ" },
{ "book_id": 62, "name": "1 ໂຢຮັນ" },
{ "book_id": 63, "name": "2 ໂຢຮັນ" },
{ "book_id": 64, "name": "3 ໂຢຮັນ" },
{ "book_id": 65, "name": "ຢຸດາ" },
{ "book_id": 66, "name": "ພຣະນິມິດ" }
        ];

    var getBookInfo = function(){
        return {
            "name": "",
            "numChapters": 0,
            "chapters": {}
        }
    };

    var bookCursor = 0,
        bookInfo = getBookInfo(),
        chapterCursor = 0,
        chapterInfo = {};

    for(var i = 0; i < bibleJSON.data.length; i++){
        if (bookCursor !== bibleJSON.data[i].Book){
            if (bookCursor){
                fswf("./bibles/" + lang + "/" + version + "/books/" + bookCursor.toString().lpad(2) + ".js", "var book = "+JSON.stringify(bookInfo, null, '\t')+";\nmodule.exports = book;");
            }

            bookInfo = getBookInfo();
            bookCursor = bibleJSON.data[i].Book;
            chapterCursor = -1;

            var _bibleInfo = require("./bibles/"+lang+"/"+version+"/info");
            _bibleInfo.books.push(
              {
                "name": bookNames[bookCursor-1].name,
                "numChapters": 0,
                "synonyms": []
              }
            );
            fswf("./bibles/"+lang+"/"+version+"/info.js", "var info = " + JSON.stringify(_bibleInfo, null, '\t') + ";\nmodule.exports = info;");
        }

        if (chapterCursor !== bibleJSON.data[i].Chapter){
            chapterInfo = {};
            chapterCursor = bibleJSON.data[i].Chapter;
            if (chapterCursor){
                bookInfo.chapters[chapterCursor] = chapterInfo;
                bookInfo.numChapters = chapterCursor;
                bookInfo.name = bookNames[bookCursor-1].name;

              var _bibleInfo = require("./bibles/"+lang+"/"+version+"/info");
              _bibleInfo.books[bookCursor-1].numChapters++;
              fswf("./bibles/"+lang+"/"+version+"/info.js", "var info = " + JSON.stringify(_bibleInfo, null, '\t') + ";\nmodule.exports = info;");
            }


        }



        chapterInfo[bibleJSON.data[i].Verse] = "<sup>"+bibleJSON.data[i].Verse+"</sup> " + bibleJSON.data[i].Text.customTrim("\n\r\t ");
    }
    bookInfo.chapters[chapterCursor] = chapterInfo;
    bookInfo.numChapters = chapterCursor;
    bookInfo.name = bookNames[bookCursor-1].name;
    fswf("./bibles/" + lang + "/" + version + "/books/" + bookCursor + ".js", "var book = "+JSON.stringify(bookInfo, null, '\t')+";\nmodule.exports = book;");
}

function reformatBibleJsonTwo(lang, version, bookNamesPath, bookVersesPath){
    var bookNamesJSON = require(bookNamesPath),
        bibleJSON = require(bookVersesPath);

    var getBookInfo = function(){
        return {
            "name": "",
            "numChapters": 0,
            "chapters": {}
        }
    };

    var bookCursor = 0,
        bookName = "",
        bookInfo = getBookInfo(),
        chapterCursor = 0,
        chapterInfo = {},
        verseBaseLen = 0;

    for(var i = 0; i < bibleJSON.length; i++){

        if (bookName !== bibleJSON[i].book){
            if (bookCursor > 0){
                console.log(bookCursor)
                fswf("./bibles/" + lang + "/" + version + "/books/" + bookCursor.toString().lpad(2) + ".js", "var book = "+JSON.stringify(bookInfo, null, '\t')+";\nmodule.exports = book;");
            }

            bookInfo = getBookInfo();
            bookCursor++;
            bookName = bibleJSON[i].book;
            chapterCursor = -1;
        }

        var tempChapter = parseInt(bibleJSON[i].verse.substr(0, bibleJSON[i].verse.indexOf(".")));


        if (chapterCursor !== tempChapter){
            verseBaseLen = bibleJSON[i].verse.substr(bibleJSON[i].verse.indexOf(".")+1).length;
            chapterInfo = {};
            chapterCursor = tempChapter;
            if (chapterCursor){
                bookInfo.chapters[chapterCursor] = chapterInfo;
                bookInfo.numChapters = chapterCursor;
                bookInfo.name = bookNamesJSON[bookCursor-1].human;
            }
        }

        var tempVerse = bibleJSON[i].verse.substr(bibleJSON[i].verse.indexOf(".")+1);

        if (verseBaseLen - tempVerse.length) {
            tempVerse += new Array(verseBaseLen - tempVerse.length + 1).join("0");
        }

        tempVerse = parseInt(tempVerse)

        chapterInfo[tempVerse] = "<sup>"+tempVerse+"</sup> " + bibleJSON[i].unformatted;
    }
    bookInfo.chapters[chapterCursor] = chapterInfo;
    bookInfo.numChapters = chapterCursor;
    bookInfo.name = bookNamesJSON[bookCursor-1].human;

    fswf("./bibles/" + lang + "/" + version + "/books/" + bookCursor + ".js", "var book = "+JSON.stringify(bookInfo, null, '\t')+";\nmodule.exports = book;");

    var bibleInfo = {
        "lang": lang,
        "version": version,
        "books": []
    };

    for (var i = 0; i < bookNamesJSON.length; i++){
        bibleInfo.books.push({
            "name": bookNamesJSON[i].human,
            "numChapters": parseInt(bookNamesJSON[i].chapters),
            "synonyms": [
                bookNamesJSON[i].osis
            ]
        });
    }
    fswf("./bibles/" + lang + "/" + version + "/info.js", "var info = " + JSON.stringify(bibleInfo, null, '\t') + ";\nmodule.exports = info;");
}

function createBibleInfoForSerbian(lang, version){
    var ruBibleInfo = require("./bibles/ru/rusv/info");
    var bibleInfo = require("./bibles/"+lang+"/"+version+"/info");

    for (var i = 0; i < ruBibleInfo.books.length; i++){
        var osisName = ruBibleInfo.books[i].synonyms[ruBibleInfo.books[i].synonyms.length-1];
        bibleInfo.books[i].synonyms = [osisName];
        console.log(bibleInfo.books[i].name);
    }

    fswf("./bibles/"+lang+"/"+version+"/info.js", "var info = " + JSON.stringify(bibleInfo, null, '\t') + ";\nmodule.exports = info;");
}

// createBibleInfoForSerbian("da", "bibelen1992");

function scrapeBeblia(lang, version){
  var tasks = [],
      chapterTasks = [];

  for (var i = 0; i < 66; i++){
    tasks.push((function(bookId){
      return function(callback){
        var url = "http://www.beblia.com/pages/main.aspx?Language=SwedishFolk&Book="+bookId+"&Chapter=1";
        var redis_client = redis.createClient();

        var process = function(body, delay){
          var $ = cheerio.load(body, {decodeEntities: false});

          setTimeout(function(){callback(null, {
            "id": bookId,
            "title": $(".dropDownListBooks").find(":selected").text(),
            "chapters": $(".dropDownListBookChapters").children().length
          })}, delay || 800);
        };

        console.log("Processing", url);

        redis_client.get(url, function(err, reply) {
          if (!reply){
            request(
              {
                "url": url,
                "headers" : {
                  "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X x.y; rv:42.0) Gecko/20100101 Firefox/42.0"
                }
              },
              function(err, response, body) {
                if (err) {console.log(err);return;}

                redis_client.set(url, body);
                redis_client.quit();

                process(body);
              }
            );
          } else {
            redis_client.quit();
            process(reply, 10);
          }
        });
      }
    })(i+1));
  }

  async.series(tasks, function(err, results){
    var bibleInfo = {
      lang: lang,
      version: version,
      books: []
    };
    for(var i = 0; i < results.length; i++){
      var bookInfo = {
        name: htmlEntities.decode(results[i].title),
        numChapters: results[i].chapters,
        chapters: {}
      };
      fswf("./bibles/"+lang+"/"+version+"/books/" + (i+1).toString().lpad(2) + ".js", "var book = "+JSON.stringify(bookInfo, null, '\t')+";\nmodule.exports = book;");
      bookInfo.synonyms = [];
      delete bookInfo.chapters;
      bibleInfo.books.push(bookInfo);

      for(var j = 0; j < results[i].chapters; j++){
        chapterTasks.push((function(lang, version, bookId, bookTitle, chapterIterator){
          return function(callback){
            var redis_client = redis.createClient();
            var url = "http://www.beblia.com/pages/main.aspx?Language=SwedishFolk&Book="+bookId+"&Chapter="+chapterIterator;

            console.log("Processing", url);

            var writer = function(chapterRaw){
              var chapter = {};
              var $ = cheerio.load(chapterRaw, {decodeEntities: false});

              var verseIterator = 0;

              $(".verseTextText").each(function(i, e){
                var verse = $($(".verseTextButton")[verseIterator]).text();

                chapter[parseInt(verse)] = "<span>"+verse+"</span> " + $(e).html();
                verseIterator++;
              });

              try {
                var bookInfo = require("./bibles/"+lang+"/"+version+"/books/" + bookId.toString().lpad(2) + ".js");
                bookInfo.chapters[chapterIterator] = chapter;
                fswf("./bibles/"+lang+"/"+version+"/books/" + bookId.toString().lpad(2) + ".js", "var book = "+JSON.stringify(bookInfo, null, '\t')+";\nmodule.exports = book;");
              } catch (err){
                console.log(err);
              }
            };

            redis_client.get(url, function(err, reply) {
              if (!reply){
                request(
                  {
                    "url": url,
                    "headers" : {
                      "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X x.y; rv:42.0) Gecko/20100101 Firefox/42.0"
                    }
                  },
                  function(err, response, body) {
                    if (err) {console.log(err);return;}

                    redis_client.set(url, body);
                    redis_client.quit();

                    writer(body);

                    setTimeout(function(){callback(null, 'test')}, 3000);
                  }
                );
              } else {
                redis_client.quit();
                writer(reply);
                callback(null, 'test');
              }
            });
          }
        })(lang, version, results[i].id, results[i].title, j+1));
      }
    }

    fswf("./bibles/"+lang+"/"+version+"/info.js", "var info = "+JSON.stringify(bibleInfo, null, '\t')+";\nmodule.exports = info;");
    async.series(chapterTasks);
  });
}

var scrapeBibleCorpus = function(lang, version, path) {
  var bible = require(path);

  var getNameByOsis = function(osisName) {
    var osisDB =
      {"GEN": "Pradžios knyga",
        "EXO": "Išėjimo knyga",
        "LEV": "Kunigų knyga",
        "NUM": "Skaičių knyga",
        "DEU": "Pakartoto Įstatymo knyga",
        "JOS": "Jozuės knyga",
        "JDG": "Teisėjų knyga",
        "RUT": "Rūtos knyga",
        "1SA": "Samuelio pirma knyga",
        "2SA": "Samuelio antra knyga",
        "1KI": "Karalių pirma knyga",
        "2KI": "Karalių antra knyga",
        "1CH": "Metraščių pirma knyga",
        "2CH": "Metraščių antra knyga",
        "EZR": "Ezros knyga",
        "NEH": "Nehemijo knyga",
        "EST": "Esteros knyga",
        "JOB": "Jobo knyga",
        "PSA": "Psalmynas",
        "PRO": "Patarlių knyga",
        "ECC": "Mokytojo knyga",
        "SON": "Giesmių giesmės knyga",
        "ISA": "Izaijo knyga",
        "JER": "Jeremijo knyga",
        "LAM": "Raudų knyga",
        "EZE": "Ezechielio knyga",
        "DAN": "Danieliaus knyga",
        "HOS": "Ozėjo knyga",
        "JOE": "Joelio knyga",
        "AMO": "Amoso knyga",
        "OBA": "Abdijo knyga",
        "JON": "Jonos knyga",
        "MIC": "Michėjo knyga",
        "NAH": "Nahumo knyga",
        "HAB": "Habakuko knyga",
        "ZEP": "Sofonijo knyga",
        "HAG": "Agėjo knyga",
        "ZEC": "Zacharijo knyga",
        "MAL": "Malachijo knyga",
        "MAT": "Evangelija pagal Matą",
        "MAR": "Evangelija pagal Morkų",
        "LUK": "Evangelija pagal Luką",
        "JOH": "Evangelija pagal Joną",
        "ACT": "Apaštalų darbai",
        "ROM": "Laiškas romiečiams",
        "1CO": "Pirmas laiškas korintiečiams",
        "2CO": "Antras laiškas korintiečiams",
        "GAL": "Laiškas galatams",
        "EPH": "Laiškas efeziečiams",
        "PHI": "Laiškas filipiečiams",
        "COL": "Laiškas kolosiečiams",
        "1TH": "Pirmas laiškas tesalonikiečiams",
        "2TH": "Antras laiškas tesalonikiečiams",
        "1TI": "Pirmas laiškas Timotiejui",
        "2TI": "Antras laiškas Timotiejui",
        "TIT": "Laiškas Titui",
        "PHM": "Laiškas Filemonui",
        "HEB": "Laiškas hebrajams",
        "JAM": "Jokūbo laiškas",
        "1PE": "Petro pirmas laiškas",
        "2PE": "Petro antras laiškas",
        "1JO": "Jono pirmas laiškas",
        "2JO": "Jono antras laiškas",
        "3JO": "Jono trečias laiškas",
        "JUD": "Judo laiškas",
        "REV": "Apreiškimas Jonui"};

    return osisDB[osisName];
  };

  var parseChapter = function(chapter){
    var chapterContents = {};
    for (var verseIterator = 0; verseIterator < chapter.seg.length; verseIterator++){
      chapterContents[verseIterator+1] = "<sup>" + (verseIterator+1) + "</sup> " + chapter.seg[verseIterator]["#text"];
    }
    return chapterContents;
  };

  var parseBook = function(bookIterator, book){
    var bookContent = {
      "name": getNameByOsis(book['@id'].split(".")[1]),
      "numChapters": chapters = book['div'].length || 1,
      "chapters": {}
    };

    if (book.div.length) {
      for (var chapterIterator = 0; chapterIterator < book.div.length; chapterIterator++){
        bookContent.chapters[chapterIterator+1] = parseChapter(book.div[chapterIterator]);
      }
    } else {
      bookContent.chapters["1"] = parseChapter(book.div);
    }

    fs.outputFileSync("./bibles/"+lang+"/"+version+"/books/"+bookIterator.toString().lpad(2)+".js", "var book = "+JSON.stringify(bookContent, null, '\t')+";\nmodule.exports = book;");
  };

  var info = {
    "lang": lang,
    "version": version,
    "books": []
  };

  for (var bookIterator = 0; bookIterator < bible.cesDoc.text.body.div.length; bookIterator++){
    var book = bible.cesDoc.text.body.div[bookIterator];
    var chapters = book['div'].length || 1;
    info.books.push({
      "name": getNameByOsis(book['@id'].split(".")[1]),
      "numChapters": chapters,
      "synonyms": []
    })
    parseBook(bookIterator+1, book);
  }

  fs.outputFileSync("./bibles/"+lang+"/"+version+"/info.js", "var info = "+JSON.stringify(info, null, '\t')+";\nmodule.exports = info;");
};

// scrapeBibleCorpus('lt', 'lit', './LT-pp.json');

//scrapeBeblia("sv", "sf1998");

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
// scrapeBibleInfo("da", "dn1933", encodeURIComponent("Dette-er-Biblen-på-dansk-1933"));
// scrapeBibleInfo("da", "bph", encodeURIComponent("Bibelen-på-hverdagsdansk-BPH"));

// scrapeBible("en", "nkjv");
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
// scrapeBible("da", "dn1933");
// scrapeBible("da", "bph");

// parseOfflineBible("fj", "fov", "/Users/vitaliy/Downloads/fiji/fj/");
//
// function fixNamesCZ(){
//     var bibleInfo = require("./bibles/zh/ctv/info");
//
//     for (var i = 0; i < bibleInfo.books.length; i++){
//         var bookId = i+1;
//
//         var bookInfo = require("./bibles/zh/ctv/books/"+bookId.toString().lpad(2));
//         bookInfo.name = bibleInfo.books[i].name;
//         fswf("./bibles/zh/ctv/books/"+bookId.toString().lpad(2) + ".js", "var book = "+JSON.stringify(bookInfo, null, '\t')+";\nmodule.exports = book;");
//     }
// }
//
// fixNamesCZ()


// reformatBibleJson("lo", "lb", "/Users/vitaliy/Sites/Adventech/bible-tools/LaoBible.json");
// createBibleInfoForSerbian()
// reformatBibleJsonTwo("ne", "ERV", "/Users/vitaliy/Sites/Adventech/bible-tools/books.json", "/Users/vitaliy/Sites/Adventech/bible-tools/ervne.json")

var createBTIBible = function(){
  var books = require("/Users/vitaliy/Downloads/bti/books.json"),
      verses = require("/Users/vitaliy/Downloads/bti/verses.json"),
      bookIterator = 0,
      bookContent = {},
      lastBookNumber = "",
    lastBookInfo = {},
      bookInfo = {};

  var getBookByID = function(id){
    for (var i = 0; i < books.length; i++){
      if (books[i].book_number===id){
        return books[i];
      }
    }
    return null;
  };

  var write = function(){
    if (bookIterator>0){
      var book = {
        "name": lastBookInfo.long_name,
        "numChapters": Object.keys(bookContent).length,
        "chapters": bookContent
      };

      fswf("./bibles/ru/bti/books/"+bookIterator.toString().lpad(2) + ".js", "var book = "+JSON.stringify(book, null, '\t')+";\nmodule.exports = book;");
    }
  };

  for(var i = 0; i < verses.length; i++){
    bookInfo = getBookByID(verses[i].book_number);

    if (bookInfo){
      if (bookInfo.book_number!==lastBookNumber){

        write();

        bookContent = {};
        bookIterator++;
        lastBookNumber = bookInfo.book_number;
        lastBookInfo = bookInfo;
      }

      if(!bookContent.hasOwnProperty(verses[i].chapter)){
        bookContent[verses[i].chapter] = {};
      }

      var verse = verses[i].text;

      verse = verse.replace(/<pb\/> ?/g, "");
      verse = verse.replace(/<f>.*<\/f>/g, "");
      verse = verse.replace(/<t>/g, "<div>");
      verse = verse.replace(/<\/t>/g, "<\/div>");
      verse = verse.replace(/<e>/g, "<em>");
      verse = verse.replace(/<\/e>/g, "<\/em>");

      bookContent[verses[i].chapter][verses[i].verse] = "<sup>"+verses[i].verse+"</sup> "+verse;
    } else {
      console.log("Warning, null returned from getBookById, ", verses[i].book_number);
    }
  }
  write();
};

// createBTIBible();

// reformatBibleJsonTwo("st", "SO89", "/Users/vitaliy/Downloads/books.json", "/Users/vitaliy/Downloads/verses.json");

var getRequestOrHtml = async function(url){
  var axios = require('axios');
  var redis_client = redis.createClient();
  const {promisify} = require('util');
  const getAsync = promisify(redis_client.get).bind(redis_client);
  const setAsync = promisify(redis_client.set).bind(redis_client);

  let headers = {
    "User-Agent": "Mozilla/4.0 (compatible; MSIE 7.0; Windows NT 6.0)"
  };

  let data = await getAsync(url);

  if (!data){
    await sleep(500);
    data = await axios({
      url: url,
      headers: headers
    });
    await setAsync(url, data.data)
    data = data.data
  }
  redis_client.quit();
  return data;
};

var getRequestOrCached = async function(url){
  var axios = require('axios');
  var redis_client = redis.createClient();
  const {promisify} = require('util');
  const getAsync = promisify(redis_client.get).bind(redis_client);
  const setAsync = promisify(redis_client.set).bind(redis_client);

  let headers = {
    "User-Agent": "Mozilla/4.0 (compatible; MSIE 7.0; Windows NT 6.0)"
  };

  let data = await getAsync(url);

  if (!data){
    await sleep(500);
    data = await axios({
      url: url,
      headers: headers
    });
    data = JSON.stringify(data.data)
    await setAsync(url, data)
  }
  redis_client.quit();
  return JSON.parse(data);
};

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

var scrapeBibleCom = async function(bibleComId, lang, version, booksId, changeCaseForBookNames) {
  var paratextToOsis = function (paratextAbbr) {
    let paratextOsisTable = {
      'GEN': 'Gen',
      'EXO': 'Exod',
      'LEV': 'Lev',
      'NUM': 'Num',
      'DEU': 'Deut',
      'JOS': 'Josh',
      'JDG': 'Judg',
      'RUT': 'Ruth',
      '1SA': '1Sam',
      '2SA': '2Sam',
      '1KI': '1Kgs',
      '2KI': '2Kgs',
      '1CH': '1Chr',
      '2CH': '2Chr',
      'EZR': 'Ezra',
      'NEH': 'Neh',
      'EST': 'Esth',
      'JOB': 'Job',
      'PSA': 'Ps',
      'PRO': 'Prov',
      'ECC': 'Eccl',
      'SNG': 'Song',
      'ISA': 'Isa',
      'JER': 'Jer',
      'LAM': 'Lam',
      'EZK': 'Ezek',
      'DAN': 'Dan',
      'HOS': 'Hos',
      'JOL': 'Joel',
      'AMO': 'Amos',
      'OBA': 'Obad',
      'JON': 'Jonah',
      'MIC': 'Mic',
      'NAM': 'Nah',
      'HAB': 'Hab',
      'ZEP': 'Zeph',
      'HAG': 'Hag',
      'ZEC': 'Zech',
      'MAL': 'Mal',
      'MAT': 'Matt',
      'MRK': 'Mark',
      'LUK': 'Luke',
      'JHN': 'John',
      'ACT': 'Acts',
      'ROM': 'Rom',
      '1CO': '1Cor',
      '2CO': '2Cor',
      'GAL': 'Gal',
      'EPH': 'Eph',
      'PHP': 'Phil',
      'COL': 'Col',
      '1TH': '1Thess',
      '2TH': '2Thess',
      '1TI': '1Tim',
      '2TI': '2Tim',
      'TIT': 'Titus',
      'PHM': 'Phlm',
      'HEB': 'Heb',
      'JAS': 'Jas',
      '1PE': '1Pet',
      '2PE': '2Pet',
      '1JN': '1John',
      '2JN': '2John',
      '3JN': '3John',
      'JUD': 'Jude',
      'REV': 'Rev'
    }
    return paratextOsisTable[paratextAbbr]
  }

  var parseVerses = async function(url){
    var axios = require('axios');
    var redis_client = redis.createClient();
    const {promisify} = require('util');
    const getAsync = promisify(redis_client.get).bind(redis_client);
    const setAsync = promisify(redis_client.set).bind(redis_client);

    let headers = {
      "User-Agent": "Mozilla/4.0 (compatible; MSIE 7.0; Windows NT 6.0)"
    };

    let data = await getAsync(url);

    if (!data){
      await sleep(800);
      data = await axios({
        url: url,
        headers: headers
      });
      data = data.data
      await setAsync(url, data)
    }
    redis_client.quit();

    var $ = cheerio.load(data, {decodeEntities: true});

    var verses = {};

    $(".book .chapter .verse").each(function(i,e){
      let verse = parseInt($(e).attr('data-usfm').split('.')[2]);
      let content = $(e).find(".content").text().trim();
      if (content.length){
        if (verses[verse]) {
          verses[verse] += (" " + content);
        } else {
          verses[verse] = "<sup>" + verse + "</sup> " + content;
        }
      }
    });

    return verses;
  };

  var booksUrl = "https://www.bible.com/json/bible/books/" +(bibleComId) + "?filter=&__amp_source_origin=https%3A%2F%2Fwww.bible.com";

  var books = await getRequestOrCached(booksUrl);

  books.items = _.filter(books.items, function(o) { return !_.includes(['TOB', 'JDT', 'ESG', '1MA', '2MA', 'WIS', 'SIR', 'BAR', 'LJE', 'DAG', 'PS2', '3MA', '1ES', 'MAN'],o.usfm); });

  var info = {
    "lang": lang,
    "version": version,
    "books": []
  };

  console.log(books.items.length)

  for(var i = 0; i < books.items.length; i++){

    var bookName = changeCaseForBookNames ? changeCase.title(books.items[i].human) : books.items[i].human;

    bookName = bookName.replace(/^Iii/, "III");
    bookName = bookName.replace(/^Ii/, "II");
    bookName = bookName.replace(/^Iv/, "IV");

    var bookInfo = {
      "name": bookName.customTrim(". "),
      "synonyms": [paratextToOsis(books.items[i].usfm)]
    };

    const chapterUrl = "https://www.bible.com/json/bible/books/"+bibleComId+"/"+books.items[i].usfm+"/chapters?__amp_source_origin=https%3A%2F%2Fwww.bible.com";
    let chapter = await getRequestOrCached(chapterUrl);

    for (var j = 0; j < chapter.items.length; j++){
      if (isNaN(+chapter.items[j].human)) {
        chapter.items.splice(j, 1);
      }
    }


    bookInfo["numChapters"] = chapter.items.length;
    info.books.push(bookInfo);

    var bookContent = {
      "name": bookInfo.name,
      "numChapters": bookInfo.numChapters,
      "chapters": {}
    };

    for (var j = 0; j < chapter.items.length; j++){
      console.log("Processing", bookContent.name, ":", (j+1));
      var verses = await parseVerses("https://www.bible.com/bible/" + bibleComId + "/" + chapter.items[j].usfm);
      bookContent.chapters[(j+1)] = verses;
    }
    fs.outputFileSync("./bibles/"+lang+"/"+version+"/books/" + (i+1).toString().lpad(2) + ".js", "var book = "+JSON.stringify(bookContent, null, '\t')+";\nmodule.exports = book;");
  }
  fs.outputFileSync("./bibles/"+lang+"/"+version+"/info.js", "var info = "+JSON.stringify(info, null, '\t')+";\nmodule.exports = info;");
  for (var i = 0; i < info.books.length; i++) {
    console.log(info.books[i].name)
  }

  // createBibleInfoForSerbian(lang, version);
};

var scrapeCroatianBible = async function(lang, version, columnIndex) {
  var parseVerses = async function(url){
    var data = await getRequestOrHtml(url);

    var $ = cheerio.load(data, {decodeEntities: true});

    var verses = {};

    $("#sadrzaj table.b td.b").eq(columnIndex).find("tr").each(function(i,e){
      let verse = parseInt($(e).find("td").eq(0).find("a").eq(0).attr("name"));
      let content = $(e).find("td").eq(1).text().trim();
      if (content.length){
        verses[verse] = "<sup>" + verse + "</sup> " + content;
      }
    });

    return verses;
  }

  var url = "http://biblija.biblija-govori.hr";
  var booksPage = await getRequestOrHtml(url);

  var info = {
    "lang": lang,
    "version": version,
    "books": []
  };

  var $ = cheerio.load(booksPage, {decodeEntities: true});
  for (var i = 0; i < 66; i++) {
    var bookName = $(".knjiga").eq(i).find("h3").text().trim();
    var numChapters = $(".knjiga").eq(i).find(".poglavlja a").length;

    var bookInfo = {
      "name": bookName,
      "numChapters": numChapters,
      "synonyms": []
    };

    info.books.push(bookInfo);

    var bookContent = {
      "name": bookInfo.name,
      "numChapters": bookInfo.numChapters,
      "chapters": {}
    };

    for (var j = 0; j < numChapters; j++){
      console.log("Processing", bookContent.name, ":", (j+1), $(".knjiga").eq(i).find(".poglavlja a").eq(j).attr("href"));
      var verses = await parseVerses(url+"/"+$(".knjiga").eq(i).find(".poglavlja a").eq(j).attr("href"));
      bookContent.chapters[(j+1)] = verses;
    }
    fs.outputFileSync("./bibles/"+lang+"/"+version+"/books/" + (i+1).toString().lpad(2) + ".js", "var book = "+JSON.stringify(bookContent, null, '\t')+";\nmodule.exports = book;");
  }
  fs.outputFileSync("./bibles/"+lang+"/"+version+"/info.js", "var info = "+JSON.stringify(info, null, '\t')+";\nmodule.exports = info;");
  createBibleInfoForSerbian(lang, version);
}

var scrapeSlovenianBible = async function(lang, version, slovenianBibleIndex) {
  var getRequestOrJSON = async function(url, params){
    var axios = require('axios');
    var redis_client = redis.createClient();
    const {promisify} = require('util');
    const getAsync = promisify(redis_client.get).bind(redis_client);
    const setAsync = promisify(redis_client.set).bind(redis_client);

    let headers = {
      "api-key": "9e63bdad5df21c293b58b6944c253a74"
    };

    let data = await getAsync(url);

    if (!data){
      await sleep(500);
      data = await axios({
        url: url,
        data: params,
        headers: headers
      });
      await setAsync(url, JSON.stringify(data.data))
      data = data.data
    } else {
      data = JSON.parse(data)
    }
    redis_client.quit();
    return data;
  };

  var parseVerses = async function(url){
    var data = await getRequestOrJSON(url+"?content-type=json", {"content-type": "json"});

    var verses = {},
        lastVerse = 1;

    for (var i = 0; i < data.data.content.length; i++) {
      let para = data.data.content[i];
      if (para.attrs && (
          para.attrs.style === "p"
          || para.attrs.style === "q"
          || para.attrs.style === "q1"
          || para.attrs.style === "q2"
          || para.attrs.style === "d")) {
        for (var j = 0; j < para.items.length; j++) {
          let inner = para.items[j];
          if (inner.name && inner.name === "verse") {
            lastVerse = inner.attrs.number
          } else if (inner.type && inner.type === "text"){
            if (inner.text && inner.text.trim()){
              if (verses[lastVerse]) {
                verses[lastVerse] += " " + inner.text.trim();
              } else {
                verses[lastVerse] = "<sup>" + lastVerse + "</sup> " + inner.text.trim();
              }
            }
          } else if (inner.type && inner.type === "tag") {
            let innerInner = inner.items;
            for (var k = 0; k < innerInner.length; k++) {
              if (innerInner[k].text) {
                if (verses[lastVerse]) {
                  verses[lastVerse] += " " + innerInner[k].text.trim();
                } else {
                  verses[lastVerse] = "<sup>" + lastVerse + "</sup> " + innerInner[k].text.trim();
                }
              }
            }
          }
        }
      }
    }

    return verses;
  }

  var url = "https://api.scripture.api.bible/v1/bibles/"+slovenianBibleIndex;
  var booksPage = await getRequestOrJSON(url+"/books?include-chapters=true", {"include-chapters": "true"});

  var info = {
    "lang": lang,
    "version": version,
    "books": []
  };

  // removing apocrypha
  booksPage.data = _.filter(booksPage.data, function(o) { return !_.includes(['TOB', 'JDT', 'ESG', '1MA', '2MA', 'WIS', 'SIR', 'BAR', 'LJE', 'DAG'],o.id); });

  console.log(booksPage.data.length)

  for (var i = 0; i < booksPage.data.length; i++) {
    booksPage.data[i].chapters = _.filter(booksPage.data[i].chapters, function(o) { return o.number !== "intro"; });

    var bookName = changeCase.title(booksPage.data[i].name);
    var numChapters = booksPage.data[i].chapters.length;

    var bookInfo = {
      "name": bookName,
      "numChapters": numChapters,
      "synonyms": []
    };

    info.books.push(bookInfo);

    var bookContent = {
      "name": bookInfo.name,
      "numChapters": bookInfo.numChapters,
      "chapters": {}
    };

    for (var j = 0; j < booksPage.data[i].chapters.length; j++){
      console.log("Processing", bookContent.name, ":", (j+1));
      var verses = await parseVerses(url+"/chapters/"+booksPage.data[i].chapters[j].id);
      // console.log(verses)
      bookContent.chapters[(j+1)] = verses;
    }
    fs.outputFileSync("./bibles/"+lang+"/"+version+"/books/" + (i+1).toString().lpad(2) + ".js", "var book = "+JSON.stringify(bookContent, null, '\t')+";\nmodule.exports = book;");
  }
  fs.outputFileSync("./bibles/"+lang+"/"+version+"/info.js", "var info = "+JSON.stringify(info, null, '\t')+";\nmodule.exports = info;");
}

// scrapeBibleCom("330", "fi", "fb92");
scrapeBibleCom("85", "km", "ksv");
// scrapeBibleCom("400", "ru", "rusv");
// scrapeBibleCom("368", "ctd", "tdb", null, true);
// 644 slb
// scrapeBibleCom("1692", "kn", "kcl-bsi");
// scrapeBibleCom("73", "de", "hfa");
// https://www.bible.com/ru/bible/100/JHN.1.NASB
// scrapeBibleCom("114", "en", "nkjv-2");
// scrapeCroatianBible("hr", "danicic", 3);
// 1685 ml malcl-bsi

// scrapeBibleCom("281", "xh", "xho75", false, false);
// scrapeBibleCom("328", "nl", "nbg51", false, false);
// scrapeBibleCom("84", "hu", "hunk", false, false);

// async function slovenian () {
//   await scrapeSlovenianBible("sl", "ssp", "07320d32756929af-01");
//   await scrapeSlovenianBible("sl", "chr", "659513b6f1a40dd8-01");
//   await scrapeSlovenianBible("sl", "eku", "ac95eb59643cae13-01")
// }

// slovenian()

// createBibleInfoForSerbian("ka", "geo");

var scrapeArmenianBible = async function(lang, version) {
  var getRequest = async function(url){
    var axios = require('axios');
    var redis_client = redis.createClient();
    const {promisify} = require('util');
    const getAsync = promisify(redis_client.get).bind(redis_client);
    const setAsync = promisify(redis_client.set).bind(redis_client);

    let data = await getAsync(url);

    if (!data){
      await sleep(500);
      data = await axios({
        url
      });
      await setAsync(url, data.data)
      data = data.data
    }

    redis_client.quit();
    return data;
  };

  var parseVerses = async function(url){
    var data = await getRequest(url);

    var verses = {},
      lastVerse = 1;

    var $ = cheerio.load(data, {decodeEntities: false});

    $("article .b-load").children().each(function (i, e) {
      if (!$(e).find("div span").length) return;

      $(e).find("div span").each(function(ii,ee) {
        let matches = /^v-(\d+)-(\d+)$/gi.exec($(ee).attr("id"));

        if (matches.length < 3) {
          console.log("Fatal error! ", url, $(ee).attr("id"));
        }

        let chapter = matches[1];
        let verse = matches[2];

        if (!verses[chapter]) {
          verses[chapter] = {}
        }

        if ($(ee).find("sup").length){
          $(ee).find("sup").html(
            $(ee).find("sup").html().replace(new RegExp("^" + verse), "")
          )
        }

        verses[chapter][verse] = "<sup>"+verse+"</sup> " + $(ee).text().trim();
      })
    });

    return { numChapters: Object.keys(verses).length, verses };
  }

  var url = "http://bible.armenia.ru/hy/toc/3.html";

  var toc = await getRequest(url);

  var $ = cheerio.load(toc, {decodeEntities: false});
  var info = {
    "lang": lang,
    "version": version,
    "books": []
  };

  let ignoreList = [
    '/hy/book/173.html',
    '/hy/book/176.html',
    '/hy/book/177.html',
    '/hy/book/178.html',
    '/hy/book/179.html',
    '/hy/book/180.html',
    '/hy/book/185.html',
    '/hy/book/186.html',
    '/hy/book/202.html'
  ]
  let urls = {
    'http://bible.armenia.ru/hy/book/158.html': {name: '', title: ''}, // Gen
    'http://bible.armenia.ru/hy/book/159.html': {name: '', title: ''}, // Exodus
    'http://bible.armenia.ru/hy/book/160.html': {name: '', title: ''}, // Leviticus
    'http://bible.armenia.ru/hy/book/161.html': {name: '', title: ''}, // Numbers
    'http://bible.armenia.ru/hy/book/162.html': {name: '', title: ''}, // Deut
    'http://bible.armenia.ru/hy/book/163.html': {name: '', title: ''}, // Josh
    'http://bible.armenia.ru/hy/book/164.html': {name: '', title: ''}, // Judges
    'http://bible.armenia.ru/hy/book/165.html': {name: '', title: ''}, // Ruth
    'http://bible.armenia.ru/hy/book/166.html': {name: '', title: ''}, // 1 Sam
    'http://bible.armenia.ru/hy/book/167.html': {name: '', title: ''}, // 2 Sam
    'http://bible.armenia.ru/hy/book/168.html': {name: '', title: ''}, // 1 King
    'http://bible.armenia.ru/hy/book/169.html': {name: '', title: ''}, // 2 King
    'http://bible.armenia.ru/hy/book/170.html': {name: '', title: ''}, // 1 Chr
    'http://bible.armenia.ru/hy/book/171.html': {name: '', title: ''}, // 2 Chr
    'http://bible.armenia.ru/hy/book/172.html': {name: '', title: ''}, // Ezr
    'http://bible.armenia.ru/hy/book/174.html': {name: '', title: ''}, // Neh
    'http://bible.armenia.ru/hy/book/175.html': {name: '', title: ''}, // Esther
    'http://bible.armenia.ru/hy/book/187.html': {name: '', title: ''}, // Job
    'http://bible.armenia.ru/hy/book/181.html': {name: '', title: ''}, // Psalms
    'http://bible.armenia.ru/hy/book/182.html': {name: '', title: ''}, // Prov
    'http://bible.armenia.ru/hy/book/183.html': {name: '', title: ''}, // Eccl
    'http://bible.armenia.ru/hy/book/184.html': {name: '', title: ''}, // Song
    'http://bible.armenia.ru/hy/book/188.html': {name: '', title: ''}, // Is
    'http://bible.armenia.ru/hy/book/201.html': {name: '', title: ''}, // Jer
    'http://bible.armenia.ru/hy/book/203.html': {name: '', title: ''}, // Lam
    'http://bible.armenia.ru/hy/book/205.html': {name: '', title: ''}, // Ez
    'http://bible.armenia.ru/hy/book/204.html': {name: '', title: ''}, // Dan
    'http://bible.armenia.ru/hy/book/189.html': {name: '', title: ''}, // Hos
    'http://bible.armenia.ru/hy/book/192.html': {name: '', title: ''}, // Joel
    'http://bible.armenia.ru/hy/book/190.html': {name: '', title: ''}, // Amos
    'http://bible.armenia.ru/hy/book/193.html': {name: '', title: ''}, // Obadiah
    'http://bible.armenia.ru/hy/book/194.html': {name: '', title: ''}, // Jonah
    'http://bible.armenia.ru/hy/book/191.html': {name: '', title: ''}, // Micah
    'http://bible.armenia.ru/hy/book/195.html': {name: '', title: ''}, // Nahum
    'http://bible.armenia.ru/hy/book/196.html': {name: '', title: ''}, // Hab
    'http://bible.armenia.ru/hy/book/197.html': {name: '', title: ''}, // Zeph
    'http://bible.armenia.ru/hy/book/198.html': {name: '', title: ''}, // Hag
    'http://bible.armenia.ru/hy/book/199.html': {name: '', title: ''}, // Zech
    'http://bible.armenia.ru/hy/book/200.html': {name: '', title: ''}, // Mal
    'http://bible.armenia.ru/hy/book/206.html': {name: '', title: ''},
    'http://bible.armenia.ru/hy/book/207.html': {name: '', title: ''},
    'http://bible.armenia.ru/hy/book/208.html': {name: '', title: ''},
    'http://bible.armenia.ru/hy/book/209.html': {name: '', title: ''},
    'http://bible.armenia.ru/hy/book/210.html': {name: '', title: ''},
    'http://bible.armenia.ru/hy/book/211.html': {name: '', title: ''},
    'http://bible.armenia.ru/hy/book/212.html': {name: '', title: ''},
    'http://bible.armenia.ru/hy/book/213.html': {name: '', title: ''},
    'http://bible.armenia.ru/hy/book/214.html': {name: '', title: ''},
    'http://bible.armenia.ru/hy/book/215.html': {name: '', title: ''},
    'http://bible.armenia.ru/hy/book/216.html': {name: '', title: ''},
    'http://bible.armenia.ru/hy/book/217.html': {name: '', title: ''},
    'http://bible.armenia.ru/hy/book/218.html': {name: '', title: ''},
    'http://bible.armenia.ru/hy/book/219.html': {name: '', title: ''},
    'http://bible.armenia.ru/hy/book/220.html': {name: '', title: ''},
    'http://bible.armenia.ru/hy/book/221.html': {name: '', title: ''},
    'http://bible.armenia.ru/hy/book/222.html': {name: '', title: ''},
    'http://bible.armenia.ru/hy/book/223.html': {name: '', title: ''},
    'http://bible.armenia.ru/hy/book/224.html': {name: '', title: ''},
    'http://bible.armenia.ru/hy/book/225.html': {name: '', title: ''},
    'http://bible.armenia.ru/hy/book/226.html': {name: '', title: ''},
    'http://bible.armenia.ru/hy/book/227.html': {name: '', title: ''},
    'http://bible.armenia.ru/hy/book/228.html': {name: '', title: ''},
    'http://bible.armenia.ru/hy/book/229.html': {name: '', title: ''},
    'http://bible.armenia.ru/hy/book/230.html': {name: '', title: ''},
    'http://bible.armenia.ru/hy/book/231.html': {name: '', title: ''},
    'http://bible.armenia.ru/hy/book/232.html': {name: '', title: ''}
  }

  $(".text .issue a").each(function(i,e){
    let urlToParse = $(e).attr('href').trim();
    if (ignoreList.indexOf($(e).attr('href').trim()) >= 0) {
      return;
    }
    urls["http://bible.armenia.ru" + urlToParse].name = $(e).text().trim();
    urls["http://bible.armenia.ru" + urlToParse].title = $(e).attr("title").trim();
  });

  let i = 0;
  for(var url in urls) {
    if (!urls.hasOwnProperty(url)) {
      return
    }
    // console.log("Parsing ", url)

    let { numChapters, verses } = await parseVerses(url);

    var bookName = urls[url].name;
    var bookInfo = {
      "name": bookName,
      "numChapters": numChapters,
      "synonyms": []
    };

    console.log(bookName+"TABHERE"+urls[url].title)

    info.books.push(bookInfo);

    var bookContent = {
      "name": bookName,
      "numChapters": numChapters,
      "chapters": verses
    };


    fs.outputFileSync("./bibles/"+lang+"/"+version+"/books/" + (i+1).toString().lpad(2) + ".js", "var book = "+JSON.stringify(bookContent, null, '\t')+";\nmodule.exports = book;")
    i++;
  }
  console.log("Total books:", info.books.length)
  fs.outputFileSync("./bibles/"+lang+"/"+version+"/info.js", "var info = "+JSON.stringify(info, null, '\t')+";\nmodule.exports = info;");
  createBibleInfoForSerbian(lang, version);
}

// async function armenian () {
//   await scrapeArmenianBible('hy', 'm43')
// }

// armenian()

let scrapeHungarianBible = async function () {
  var getRequest = async function(url){
    var axios = require('axios');
    var redis_client = redis.createClient();
    const {promisify} = require('util');
    const getAsync = promisify(redis_client.get).bind(redis_client);
    const setAsync = promisify(redis_client.set).bind(redis_client);

    let data = await getAsync(url);

    if (!data){
      await sleep(500);
      data = await axios({
        url
      });
      await setAsync(url, data.data)
      data = data.data
    }

    redis_client.quit();
    return data;
  };

  var parseVerses = async function(url){
    var data = await getRequest(url);

    ///
  }

  var url = "http://www.karolibiblia.hu/biblia/";

  var toc = await getRequest(url);

  var $ = cheerio.load(toc, {decodeEntities: false});
  var info = {
    "lang": "hu",
    "version": "úrk",
    "books": []
  };
  let urls = [];

  $(".gridrow a").each(function(i,e){
    let url = $(e).attr('href').trim()
    if (url.indexOf("http")!==0) {
      url = "http://karoli-biblia.mozello.com" + url
    }
    let urlToParse = { url }
    urlToParse.name = $(e).text().trim();
    urls.push(urlToParse);
  });

  for(let i = 0; i < urls.length; i++) {
    let url = urls[i];
    console.log("Parsing ", url.url, url.name)
    continue;
    // let { numChapters, verses } = await parseVerses(url);

    //var bookName = urls[url].name;
    //var bookInfo = {
    //  "name": bookName,
    //  "numChapters": numChapters,
    //  "synonyms": []
    //};
    //
    //console.log(bookName+"TABHERE"+urls[url].title)
    //
    //info.books.push(bookInfo);
    //
    //var bookContent = {
    //  "name": bookName,
    //  "numChapters": numChapters,
    //  "chapters": verses
    //};
    //
    //
    //fs.outputFileSync("./bibles/"+lang+"/"+version+"/books/" + (i+1).toString().lpad(2) + ".js", "var book = "+JSON.stringify(bookContent, null, '\t')+";\nmodule.exports = book;")
  }

  // fs.outputFileSync("./bibles/"+lang+"/"+version+"/info.js", "var info = "+JSON.stringify(info, null, '\t')+";\nmodule.exports = info;");
  // createBibleInfoForSerbian(lang, version);
}

// scrapeHungarianBible()

let scrapeDutchBible = async function (version) {
  let lang = "nl";
  let books = {
    order: ["Gen", "Exod", "Lev", "Num", "Deut", "Josh", "Judg", "Ruth", "1Sam", "2Sam", "1Kgs", "2Kgs", "1Chr", "2Chr", "Ezra", "Neh", "Esth", "Job", "Ps", "Prov", "Eccl", "Song", "Isa", "Jer", "Lam", "Ezek", "Dan", "Hos", "Joel", "Amos", "Obad", "Jonah", "Mic", "Nah", "Hab", "Zeph", "Hag", "Zech", "Mal", "Matt", "Mark", "Luke", "John", "Acts", "Rom", "1Cor", "2Cor", "Gal", "Eph", "Phil", "Col", "1Thess", "2Thess", "1Tim", "2Tim", "Titus", "Phlm", "Heb", "Jas", "1Pet", "2Pet", "1John", "2John", "3John", "Jude", "Rev"],
    books: {
      Gen: {
        testament: "OT",
        chapters: 50,
        order: 1,
        bibleOrgID: 0,
        abbr: "Gen",
        name: "Genesis"
      },
      Exod: {
        testament: "OT",
        chapters: 40,
        order: 2,
        bibleOrgID: 1,
        abbr: "Exod",
        name: "Exodus"
      },
      Lev: {
        testament: "OT",
        chapters: 27,
        order: 3,
        bibleOrgID: 2,
        abbr: "Lev",
        name: "Leviticus"
      },
      Num: {
        testament: "OT",
        chapters: 36,
        order: 4,
        bibleOrgID: 3,
        abbr: "Num",
        name: "Numeri"
      },
      Deut: {
        testament: "OT",
        chapters: 34,
        order: 5,
        bibleOrgID: 4,
        abbr: "Deut",
        name: "Deuteronomium"
      },
      Josh: {
        testament: "OT",
        chapters: 24,
        order: 6,
        bibleOrgID: 5,
        abbr: "Josh",
        name: "Jozua"
      },
      Judg: {
        testament: "OT",
        chapters: 21,
        order: 7,
        bibleOrgID: 6,
        abbr: "Judg",
        name: "Rechters"
      },
      Ruth: {
        testament: "OT",
        chapters: 4,
        order: 8,
        bibleOrgID: 7,
        abbr: "Ruth",
        name: "Ruth"
      },
      "1Sam": {
        testament: "OT",
        chapters: 31,
        order: 9,
        bibleOrgID: 8,
        abbr: "1Sam",
        name: "1 Samuel"
      },
      "2Sam": {
        testament: "OT",
        chapters: 24,
        order: 10,
        bibleOrgID: 9,
        abbr: "2Sam",
        name: "2 Samuel"
      },
      "1Kgs": {
        testament: "OT",
        chapters: 22,
        order: 11,
        bibleOrgID: 10,
        abbr: "1Kgs",
        name: "1 Koningen"
      },
      "2Kgs": {
        testament: "OT",
        chapters: 25,
        order: 12,
        bibleOrgID: 11,
        abbr: "2Kgs",
        name: "2 Koningen"
      },
      "1Chr": {
        testament: "OT",
        chapters: 29,
        order: 13,
        bibleOrgID: 12,
        abbr: "1Chr",
        name: "1 Kronieken"
      },
      "2Chr": {
        testament: "OT",
        chapters: 36,
        order: 14,
        bibleOrgID: 13,
        abbr: "2Chr",
        name: "2 Kronieken"
      },
      Ezra: {
        testament: "OT",
        chapters: 10,
        order: 15,
        bibleOrgID: 14,
        abbr: "Ezra",
        name: "Ezra"
      },
      Neh: {
        testament: "OT",
        chapters: 13,
        order: 16,
        bibleOrgID: 15,
        abbr: "Neh",
        name: "Nehemia"
      },
      Esth: {
        testament: "OT",
        chapters: 10,
        order: 17,
        bibleOrgID: 16,
        abbr: "Esth",
        name: "Ester"
      },
      Job: {
        testament: "OT",
        chapters: 42,
        order: 18,
        bibleOrgID: 17,
        abbr: "Job",
        name: "Job"
      },
      Ps: {
        testament: "OT",
        chapters: 150,
        order: 19,
        bibleOrgID: 18,
        abbr: "Ps",
        name: "Psalmen"
      },
      Prov: {
        testament: "OT",
        chapters: 31,
        order: 20,
        bibleOrgID: 19,
        abbr: "Prov",
        name: "Spreuken"
      },
      Eccl: {
        testament: "OT",
        chapters: 12,
        order: 21,
        bibleOrgID: 20,
        abbr: "Eccl",
        name: "Prediker"
      },
      Song: {
        testament: "OT",
        chapters: 8,
        order: 22,
        bibleOrgID: 21,
        abbr: "Song",
        name: "Hooglied"
      },
      Isa: {
        testament: "OT",
        chapters: 66,
        order: 23,
        bibleOrgID: 22,
        abbr: "Isa",
        name: "Jesaja"
      },
      Jer: {
        testament: "OT",
        chapters: 52,
        order: 24,
        bibleOrgID: 23,
        abbr: "Jer",
        name: "Jeremia"
      },
      Lam: {
        testament: "OT",
        chapters: 5,
        order: 25,
        bibleOrgID: 24,
        abbr: "Lam",
        name: "Klaagliederen"
      },
      Ezek: {
        testament: "OT",
        chapters: 48,
        order: 26,
        bibleOrgID: 25,
        abbr: "Ezek",
        name: "Ezechiël"
      },
      Dan: {
        testament: "OT",
        chapters: 12,
        order: 27,
        bibleOrgID: 26,
        abbr: "Dan",
        name: "Daniël"
      },
      Hos: {
        testament: "OT",
        chapters: 14,
        order: 28,
        bibleOrgID: 27,
        abbr: "Hos",
        name: "Hosea"
      },
      Joel: {
        testament: "OT",
        chapters: 4,
        order: 29,
        bibleOrgID: 28,
        abbr: "Joel",
        name: "Joël"
      },
      Amos: {
        testament: "OT",
        chapters: 9,
        order: 30,
        bibleOrgID: 29,
        abbr: "Amos",
        name: "Amos"
      },
      Obad: {
        testament: "OT",
        chapters: 1,
        order: 31,
        bibleOrgID: 30,
        abbr: "Obad",
        name: "Obadja"
      },
      Jonah: {
        testament: "OT",
        chapters: 4,
        order: 32,
        bibleOrgID: 31,
        abbr: "Jonah",
        name: "Jona"
      },
      Mic: {
        testament: "OT",
        chapters: 7,
        order: 33,
        bibleOrgID: 32,
        abbr: "Mic",
        name: "Micha"
      },
      Nah: {
        testament: "OT",
        chapters: 3,
        order: 34,
        bibleOrgID: 33,
        abbr: "Nah",
        name: "Nahum"
      },
      Hab: {
        testament: "OT",
        chapters: 3,
        order: 35,
        bibleOrgID: 34,
        abbr: "Hab",
        name: "Habakuk"
      },
      Zeph: {
        testament: "OT",
        chapters: 3,
        order: 36,
        bibleOrgID: 35,
        abbr: "Zeph",
        name: "Sefanja"
      },
      Hag: {
        testament: "OT",
        chapters: 2,
        order: 37,
        bibleOrgID: 36,
        abbr: "Hag",
        name: "Haggai"
      },
      Zech: {
        testament: "OT",
        chapters: 14,
        order: 38,
        bibleOrgID: 37,
        abbr: "Zech",
        name: "Zacharia"
      },
      Mal: {
        testament: "OT",
        chapters: 4,
        order: 39,
        bibleOrgID: 38,
        abbr: "Mal",
        name: "Maleachi"
      },
      Matt: {
        testament: "NT",
        chapters: 28,
        order: 40,
        bibleOrgID: 50,
        abbr: "Matt",
        name: "Matteüs"
      },
      Mark: {
        testament: "NT",
        chapters: 16,
        order: 41,
        bibleOrgID: 51,
        abbr: "Mark",
        name: "Marcus"
      },
      Luke: {
        testament: "NT",
        chapters: 24,
        order: 42,
        bibleOrgID: 52,
        abbr: "Luke",
        name: "Lucas"
      },
      John: {
        testament: "NT",
        chapters: 21,
        order: 43,
        bibleOrgID: 53,
        abbr: "John",
        name: "Johannes"
      },
      Acts: {
        testament: "NT",
        chapters: 28,
        order: 44,
        bibleOrgID: 54,
        abbr: "Acts",
        name: "Handelingen"
      },
      Rom: {
        testament: "NT",
        chapters: 16,
        order: 45,
        bibleOrgID: 55,
        abbr: "Rom",
        name: "Romeinen"
      },
      "1Cor": {
        testament: "NT",
        chapters: 16,
        order: 46,
        bibleOrgID: 56,
        abbr: "1Cor",
        name: "1 Korintiërs"
      },
      "2Cor": {
        testament: "NT",
        chapters: 13,
        order: 47,
        bibleOrgID: 57,
        abbr: "2Cor",
        name: "2 Korintiërs"
      },
      Gal: {
        testament: "NT",
        chapters: 6,
        order: 48,
        bibleOrgID: 58,
        abbr: "Gal",
        name: "Galaten"
      },
      Eph: {
        testament: "NT",
        chapters: 6,
        order: 49,
        bibleOrgID: 59,
        abbr: "Eph",
        name: "Efeziërs"
      },
      Phil: {
        testament: "NT",
        chapters: 4,
        order: 50,
        bibleOrgID: 60,
        abbr: "Phil",
        name: "Filippenzen"
      },
      Col: {
        testament: "NT",
        chapters: 4,
        order: 51,
        bibleOrgID: 61,
        abbr: "Col",
        name: "Kolossenzen"
      },
      "1Thess": {
        testament: "NT",
        chapters: 5,
        order: 52,
        bibleOrgID: 62,
        abbr: "1Thess",
        name: "1 Tessalonicenzen"
      },
      "2Thess": {
        testament: "NT",
        chapters: 3,
        order: 53,
        bibleOrgID: 63,
        abbr: "2Thess",
        name: "2 Tessalonicenzen"
      },
      "1Tim": {
        testament: "NT",
        chapters: 6,
        order: 54,
        bibleOrgID: 64,
        abbr: "1Tim",
        name: "1 Timoteüs"
      },
      "2Tim": {
        testament: "NT",
        chapters: 4,
        order: 55,
        bibleOrgID: 65,
        abbr: "2Tim",
        name: "2 Timoteüs"
      },
      Titus: {
        testament: "NT",
        chapters: 3,
        order: 56,
        bibleOrgID: 66,
        abbr: "Titus",
        name: "Titus"
      },
      Phlm: {
        testament: "NT",
        chapters: 1,
        order: 57,
        bibleOrgID: 67,
        abbr: "Phlm",
        name: "Filemon"
      },
      Heb: {
        testament: "NT",
        chapters: 13,
        order: 58,
        bibleOrgID: 68,
        abbr: "Heb",
        name: "Hebreeën"
      },
      Jas: {
        testament: "NT",
        chapters: 5,
        order: 59,
        bibleOrgID: 69,
        abbr: "Jas",
        name: "Jakobus"
      },
      "1Pet": {
        testament: "NT",
        chapters: 5,
        order: 60,
        bibleOrgID: 70,
        abbr: "1Pet",
        name: "1 Petrus"
      },
      "2Pet": {
        testament: "NT",
        chapters: 3,
        order: 61,
        bibleOrgID: 71,
        abbr: "2Pet",
        name: "2 Petrus"
      },
      "1John": {
        testament: "NT",
        chapters: 5,
        order: 62,
        bibleOrgID: 72,
        abbr: "1John",
        name: "1 Johannes"
      },
      "2John": {
        testament: "NT",
        chapters: 1,
        order: 63,
        bibleOrgID: 73,
        abbr: "2John",
        name: "2 Johannes"
      },
      "3John": {
        testament: "NT",
        chapters: 1,
        order: 64,
        bibleOrgID: 74,
        abbr: "3John",
        name: "3 Johannes"
      },
      Jude: {
        testament: "NT",
        chapters: 1,
        order: 65,
        bibleOrgID: 75,
        abbr: "Jude",
        name: "Judas"
      },
      Rev: {
        testament: "NT",
        chapters: 22,
        order: 66,
        bibleOrgID: 76,
        abbr: "Rev",
        name: "Openbaring"
      }
    }
  };

  let info =  {
    "lang": lang,
    "version": version,
    "books": []
  };

  for (let book of books.order) {
    // if (books.books[book].order!==29)continue;
    info.books.push({
      "name": books.books[book].name,
      "numChapters": books.books[book].chapters,
      "synonyms": [
        books.books[book].abbr
      ]
    });

    let bookJSON = {
      "name": books.books[book].name,
      "numChapters": books.books[book].chapters,
      "chapters": {}
    };

    for (let chapterNum = 1; chapterNum <= books.books[book].chapters; chapterNum++) {
      console.log("Processing", bookJSON.name, chapterNum)
      let identifier = books.books[book].abbr + chapterNum
      // console.log('https://www.debijbel.nl/api/bible/passage?identifier='+identifier+'&language=nl&version='+version)
      let result = await getRequestOrCached('https://www.debijbel.nl/api/bible/passage?identifier='+identifier+'&language=nl&version='+version);


      bookJSON.chapters[chapterNum] = {}
      var $ = cheerio.load(result.result.response.search.result.passages[0].text, {decodeEntities: false});

      $("span").filter(function () {
        if (!$(this).attr("class")) return false;
        let classes = $(this).attr("class").split(/\s+/);
        for (let cssClass of classes) {
          if (/v\d+_\d+_\d+/ig.test(cssClass)) {
            return true
          }
        }
        return false
      }).each(function (ii, ee){
        let verses = [];
        let classes = $(ee).attr("class").split(/\s+/);
        for (let cssClass of classes) {
          let match = cssClass.match(/v\d+_\d+_(\d+)/i);
          if (match) {
            verses.push(match[1]);
          }
        }
        $(ee).find("sup, .c, .tooltipfoot").remove();
        let verse = $(ee).text().trim();

        for (let versesIndex = 0; versesIndex < verses.length; versesIndex++) {
          if (bookJSON.chapters[chapterNum][parseInt(verses[versesIndex])]) {
            bookJSON.chapters[chapterNum][parseInt(verses[versesIndex])] += " " + verse;
          } else {
            bookJSON.chapters[chapterNum][parseInt(verses[versesIndex])] = "<sup>" + verses.join("-") + "</sup> " + verse;
          }

        }
      })

      //$("sup").each(function(ii, ee){
      //  let verses = $(ee).text().split("-");
      //  let tempNode = $(ee).parent().clone()
      //  $(tempNode).find("sup, .c, .tooltipfoot").remove();
      //  let verse = $(tempNode).text().trim();
      //
      //  let sibling = $(ee).closest('p').next();
      //  while (!$(sibling).find("sup.v").length) {
      //    $(sibling).find("sup, .c, .tooltipfoot").remove();
      //    if ($(sibling).text().trim().length) {
      //      verse += "<br/>" + $(sibling).text().trim();
      //    }
      //
      //    sibling = $(sibling).next();
      //    if (!$(sibling).prev().is(':last-child')) {
      //      break;
      //    }
      //  }
      //
      //  for (let versesIndex = 0; versesIndex < verses.length; versesIndex++) {
      //    bookJSON.chapters[chapterNum][parseInt(verses[versesIndex])] = "<sup>" + verses.join("-") + "</sup> " + verse;
      //  }
      //});

      // for (let verseNum = 1; verseNum <= result.result.response.strings.length; verseNum++) {
      //   let verse = result.result.response.strings[verseNum-1].trim();
      //   verse = verse.replace(/\$\$\d/ig, '');
      //   bookJSON.chapters[chapterNum][verseNum] = "<sup>" + verseNum + "</sup> " + verse;
      // }
    }
    fs.outputFileSync("./bibles/"+lang+"/"+version+"/books/" + (books.books[book].order).toString().lpad(2) + ".js", "var book = "+JSON.stringify(bookJSON, null, '\t')+";\nmodule.exports = book;")
  }

  fs.outputFileSync("./bibles/"+lang+"/"+version+"/info.js", "var info = "+JSON.stringify(info, null, '\t')+";\nmodule.exports = info;");
}

// scrapeDutchBible('nld-HSV');
// scrapeDutchBible('nld-BGT');
// scrapeDutchBible('nld-NBV');