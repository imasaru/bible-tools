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

require("./bible_helpers");

/**
 * Returns the full regex for searching Bible references for specific language and Bible version
 * @param lang Language, for example 'en'
 * @param version Version, for example 'nkjv'
 */
var getBibleRegex = function(lang, version){
    var literals_v2 = {
        "through": {
            "default": '-',
            "list": [
                '\\-', '᠆', '‐', '‑', '‒', '–', '—', '―', '⁻', '₋', '−', '﹣', '－', '～', '~', '〜'
            ]
        },

        "and": {
            "default": ';',
            "list": [
                ';', '；'
            ]
        },

        "andEnum": {
            "default": ',',
            "list": [
                ',', '，', '、'
            ]
        },

        "range": {
            "default": ':',
            "list": [
                ':', '：'
            ]
        }
    };

    var literalsShort = '';

    var bibleBooks = "",
        ret = {
            "bibleBooksRegex": ""
        };

    try {
        var bibleBookInfo = require("./bibles/" + lang + "/" + version + "/info");
        for (var i = 0; i < bibleBookInfo.books.length; i++){

            bibleBooks += bibleBookInfo.books[i].name.bibleSynonymOptimization() + "|";

            bibleBookInfo.books[i].synonyms = bibleBookInfo.books[i].synonyms.sort(function(a, b){
                return b.length - a.length;
            });

            for (var j = 0; j < bibleBookInfo.books[i].synonyms.length; j++){
                bibleBooks += bibleBookInfo.books[i].synonyms[j].bibleSynonymOptimization() + "|";
            }
        }
    } catch (err) {}

    /**
     * Custom merge for overwrite props from specific language
     */
    try {

        var literalsInfo = require("./bibles/" + lang + "/literals");

        if (literalsInfo["through"]) {
            var through = literalsInfo["through"];
            if (through["default"]) {
                literals_v2["through"]["default"] = through["default"];
            }
            if (through["list"]) {
                literals_v2["through"]["list"] = literals_v2["through"]["list"].concat(through["list"]);
            }
            if (through["replace"]) {
                literals_v2["through"]["list"] = through["list"];
            }
        }

        if (literalsInfo["and"]) {
            var and = literalsInfo["and"];
            if (and["default"]) {
                literals_v2["and"]["default"] = and["default"];
            }
            if (and["list"]) {
                literals_v2["and"]["list"] = literals_v2["and"]["list"].concat(and["list"]);
            }
            if (and["replace"]) {
                literals_v2["and"]["list"] = and["list"];
            }
        }

        if (literalsInfo["andEnum"]) {
            var andEnum = literalsInfo["andEnum"];
            if (andEnum["default"]) {
                literals_v2["andEnum"]["default"] = andEnum["default"];
            }
            if (andEnum["list"]) {
                literals_v2["andEnum"]["list"] = literals_v2["andEnum"]["list"].concat(andEnum["list"]);
            }
            if (andEnum["replace"]) {
                literals_v2["andEnum"]["list"] = andEnum["list"];
            }
        }

        if (literalsInfo["range"]) {
            var range = literalsInfo["range"];
            if (range["default"]) {
                literals_v2["range"]["default"] = range["default"];
            }
            if (range["list"]) {
                literals_v2["range"]["list"] = literals_v2["range"]["list"].concat(range["list"]);
            }
            if (range["replace"]) {
                literals_v2["range"]["list"] = range["list"];
            }
        }
    } catch (err) {}

    /**
     * Here we are creating handy regexps for literals
     */

    literals_v2["through"]["regexpLong"] = "";
    literals_v2["through"]["regexpShort"] = "";

    for (var i = 0; i < literals_v2["through"]["list"].length; i++){
        var through = literals_v2["through"]["list"][i];
        if (through.replace('\\', '').length > 1){
            literals_v2["through"]["regexpLong"] += '( ' + through.customTrim(" ") + ' )?'
        } else {
            literalsShort += through;
            literals_v2["through"]["regexpShort"] += through;
        }
    }
    literals_v2["through"]["regexpShort"] = '[' + literals_v2["through"]["regexpShort"] + ']';

    literals_v2["and"]["regexpLong"] = "";
    literals_v2["and"]["regexpShort"] = "";

    for (var i = 0; i < literals_v2["and"]["list"].length; i++){
        var and = literals_v2["and"]["list"][i];
        if (and.replace('\\', '').length > 1){
            literals_v2["and"]["regexpLong"] += '( ' + and.customTrim(" ") + ' )?'
        } else {
            literalsShort += and;
            literals_v2["and"]["regexpShort"] += and;
        }
    }
    literals_v2["and"]["regexpShort"] = '[' + literals_v2["and"]["regexpShort"] + ']';

    literals_v2["andEnum"]["regexpLong"] = "";
    literals_v2["andEnum"]["regexpShort"] = "";

    for (var i = 0; i < literals_v2["andEnum"]["list"].length; i++){
        var andEnum = literals_v2["andEnum"]["list"][i];
        if (andEnum.replace('\\', '').length > 1){
            literals_v2["andEnum"]["regexpLong"] += '( ' + andEnum.customTrim(" ") + ' )?'
        } else {
            literalsShort += andEnum;
            literals_v2["andEnum"]["regexpShort"] += andEnum;
        }
    }
    literals_v2["andEnum"]["regexpShort"] = '[' + literals_v2["andEnum"]["regexpShort"] + ']';

    literals_v2["range"]["regexpLong"] = "";
    literals_v2["range"]["regexpShort"] = "";

    for (var i = 0; i < literals_v2["range"]["list"].length; i++){
        var range = literals_v2["range"]["list"][i];
        if (range.replace('\\', '').length > 1){
            literals_v2["range"]["regexpLong"] += '( ' + range.customTrim(" ") + ' )?'
        } else {
            literalsShort += range;
            literals_v2["range"]["regexpShort"] += range;
        }
    }
    literals_v2["range"]["regexpShort"] = '[' + literals_v2["range"]["regexpShort"] + ']';


    bibleBooks = bibleBooks.customTrim("| ");
    ret["literals"] = literals_v2;
    ret["bibleBooksRegex"] = "("+bibleBooks+")";
    ret["regex"] = "((" + bibleBooks + ")\\.?\\ ?([0-9\\.\\ "+literalsShort+"]" + literals_v2["through"]["regexpLong"] + literals_v2["and"]["regexpLong"] + literals_v2["andEnum"]["regexpLong"] + literals_v2["range"]["regexpLong"] + "(?!" + bibleBooks + "))+)";

    return ret;
};

/**
 * This function performs the actual fetch of the data in given language, version, book, chapter and verse.
 * Note that verse is optional parameter, since sometimes you want to fetch the whole chapter.
 * @param lang
 * @param version
 * @param book
 * @param chapter
 * @param verse
 * @returns {{book: string, chapter: string, verse: string, results: Array}}
 */
var fetch = function(lang, version, book, chapter, verse){
    var bibleInfo = require("./bibles/" + lang + "/" + version + "/info"),
        ret = {
            book: "",
            chapter: "",
            verse: "",
            results: []
        };

    for (var i = 0; i < bibleInfo.books.length; i++){
        var bookRegExp = bibleInfo.books[i].name.bibleSynonymOptimization() + "|";
        for (var j = 0; j < bibleInfo.books[i].synonyms.length; j++){
            bookRegExp += bibleInfo.books[i].synonyms[j].bibleSynonymOptimization() + "|";
        }
        bookRegExp = bookRegExp.customTrim("| ");
        if (book.match(new RegExp("^"+bookRegExp, "g"))){
            var bibleBook = require("./bibles/" + lang + "/" + version + "/books/" + (i+1).toString().lpad(2));

            chapter = chapter.toString().customTrim(" ");
            ret.book = bibleBook.name;
            ret.chapter = chapter;
            ret.verse = null;

            if (bibleBook.chapters.hasOwnProperty(chapter)){

                if (verse){
                    verse = verse.toString().customTrim(" ");
                    ret.verse = verse;
                    if (verse in bibleBook.chapters[chapter]){
                        ret.results.push(bibleBook.chapters[chapter][verse]);
                    }
                } else {
                    for (var key in bibleBook.chapters[chapter]) {
                        ret.results.push(bibleBook.chapters[chapter][key]);
                    }
                }
            }

            return ret;
        }
    }
};

/**
 * Performs the search of the passage
 * @param lang
 * @param version
 * @param term
 */
var search = function(lang, version, term) {
    var result = { "term": term, results: []};

    try {
        var bibleRegex = getBibleRegex(lang, version),
            bibleBooksRegex = new RegExp(bibleRegex.bibleBooksRegex, "ig");

        term = term.customTrim(" "+bibleRegex.literals.through.list.join(""));
        term = term.customTrim(" "+bibleRegex.literals.and.list.join(""));
        term = term.customTrim(" "+bibleRegex.literals.andEnum.list.join(""));
        term = term.customTrim(" "+bibleRegex.literals.range.list.join(""));

        term = term.replace(new RegExp(bibleRegex.literals.through.regexpShort, "ig"), bibleRegex.literals.through.default);
        term = term.replace(new RegExp(bibleRegex.literals.and.regexpShort, "ig"), bibleRegex.literals.and.default);
        term = term.replace(new RegExp(bibleRegex.literals.andEnum.regexpShort, "ig"), bibleRegex.literals.andEnum.default);
        term = term.replace(new RegExp(bibleRegex.literals.range.regexpShort, "ig"), bibleRegex.literals.range.default);

        if (bibleRegex.literals.through.regexpLong){
            term = term.replace(new RegExp(bibleRegex.literals.through.regexpLong.replace("?", ""), "ig"), bibleRegex.literals.through.default);
        }

        if (bibleRegex.literals.and.regexpLong){
            term = term.replace(new RegExp(bibleRegex.literals.and.regexpLong.replace("?", ""), "ig"), bibleRegex.literals.and.default);
        }

        if (bibleRegex.literals.andEnum.regexpLong){
            term = term.replace(new RegExp(bibleRegex.literals.andEnum.regexpLong.replace("?", ""), "ig"), bibleRegex.literals.andEnum.default);
        }

        if (bibleRegex.literals.range.regexpLong){
            term = term.replace(new RegExp(bibleRegex.literals.range.regexpLong.replace("?", ""), "ig"), bibleRegex.literals.range.default);
        }

        if (!term.match(bibleBooksRegex) || !term.match(bibleBooksRegex).length) return result;

        var book = term.match(bibleBooksRegex)[0];

        // tmp contains the part of search term without book name (ex 1:1)
        var tmp = term.replace(new RegExp(bibleRegex.bibleBooksRegex, "ig"), ""),
            blocks = tmp.split(bibleRegex.literals.and.default);

        for (var i = 0; i < blocks.length; i++){
            var block = blocks[i],
                ranges = block.split(bibleRegex.literals.range.default),
                chapter = ranges[0];

            result.results.push({});

            // This is explicitly to extract single chapter range of verses
            // ex. 1:3-5
            // TODO: support more complicated intra chapter references like 1:3-2:1
            if (ranges.length === 2){
                var references = ranges[1].split(bibleRegex.literals.andEnum.default);


                result.results[i]["verses"]  = "";

                for (var reference = 0; reference < references.length; reference++) {
                    var verses = references[reference].split(bibleRegex.literals.through.default);

                    if (verses.length === 1){
                        var _t = fetch(lang, version, book, chapter, verses[0]);
                        var _temp = _t.results.join("");

                        if (reference !== 0){
                            _temp = "<h3>"+_t.book + " " + chapter.customTrim(" ") + bibleRegex.literals.range.default + references[reference] +"</h3>" + _temp;
                        }

                        result.results[i]["verses"] += _temp;
                        result.results[i]["header"] = "<h3>"+_t.book +" "+ block.customTrim(" ")+"</h3>";
                    } else {

                        for (var j = parseInt(verses[0]); j <= parseInt(verses[verses.length-1]); j++){
                            var _t = fetch(lang, version, book, chapter, j);
                            var _temp = _t.results.join("");

                            if (reference !== 0 && j === parseInt(verses[0])){
                                _temp = "<h3>"+_t.book + " " + chapter.customTrim(" ") + bibleRegex.literals.range.default + parseInt(verses[0])+bibleRegex.literals.through.default+parseInt(verses[verses.length-1])+"</h3>" + _temp;
                            }

                            result.results[i]["verses"] += _temp;
                            result.results[i]["header"] = "<h3>"+_t.book +" "+ block.customTrim(" ")+"</h3>";
                        }
                    }
                }


                // var verses = ranges[1].split(bibleRegex.literals.through.default);
                //
                //
                // if (verses.length === 2){
                //     var references = verses[1].split(bibleRegex.literals.andEnum.default);
                //
                //
                //     for (var reference = 0; reference < references.length; reference++){
                //         var _result = {header:"", verses:""};
                //
                //         if (reference === 0){
                //             // Bible verse matching <book> <chapter>:<verse start>-<verse end> (ex. Gen. 1:1-2)
                //             for (var j = parseInt(verses[0]); j <= parseInt(references[reference]); j++){
                //                 var _t = fetch(lang, version, book, chapter, j);
                //
                //                 _result["verses"] += _t.results.join("");
                //                 result.results[i]["verses"] = _result["verses"];
                //                 result.results[i]["header"] = "<h3>"+_t.book +" "+ block.customTrim(" ")+"</h3>";
                //             }
                //         } else {
                //             // And enum part of the above for ex Gen 1:1-2,3
                //             // here we fetch Gen 1:3
                //             var _t = fetch(lang, version, book, chapter, references[reference]);
                //             _result["verses"] += "<h3>"+_t.book + " " + chapter.customTrim(" ") + bibleRegex.literals.range.default + references[reference] +"</h3>" + _t.results.join("");
                //             result.results[i]["verses"] += _result["verses"];
                //         }
                //     }
                // } else {
                //     // Bible verse matching <book> <chapter>:<verse> or <book> <chapter>:<verse>, <verse 2>, .. , <verse N>
                //     // (ex. Gen. 1:1)
                //     var versesEnum = verses[0].split(bibleRegex.literals.andEnum.default);
                //
                //     result.results[i]["verses"] = "";
                //
                //     for (var j = 0; j < versesEnum.length; j++){
                //         var _t = fetch(lang, version, book, chapter, parseInt(versesEnum[j]));
                //         result.results[i]["header"] = "<h3>"+_t.book +" "+ chapter.customTrim(" ") + bibleRegex.literals.range.default + verses[0].customTrim(" ") +"</h3>";
                //         result.results[i]["verses"] += _t.results.join("");
                //     }
                // }
            } else {
                var chapters = ranges[0].split(bibleRegex.literals.through.default);
                if (chapters.length === 2){
                    result.results[i]["verses"] = "";

                    for (var j = parseInt(chapters[0].customTrim(" ")); j <= parseInt(chapters[1].customTrim(" ")); j++){
                        var _t = fetch(lang, version, book, j);
                        result.results[i]["header"] = "<h3>"+_t.book +" "+ block.customTrim(" ")+"</h3>";
                        result.results[i]["verses"] += _t.results.join("");
                    }
                } else if (chapters.length === 1) {
                    // Bible verse matching <book> <chapter> (ex. Gen. 1)
                    var _t = fetch(lang, version, book, chapter);
                    result.results[i]["header"] =  "<h3>"+_t.book +" "+ block.customTrim(" ")+"</h3>";
                    result.results[i]["verses"] = _t.results.join("");
                }
            }
        }

        return result;
    } catch (err) {
        console.log(err);
    }
};

// Bible Tools Module
var bibleTools = {
    // TODO:
    // listAvailableBibles()
    search: search,
    getBibleRegex: getBibleRegex
};

module.exports = bibleTools;