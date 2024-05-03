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
"use strict";

require("./bible_helpers");
const fs = require('fs')

var getBookByOSIS = function(lang, version, book_osis, b){
    var bibleInfo = require("./bibles/" + lang + "/" + version + "/info");

    for (var bookIterator = 0; bookIterator < bibleInfo.books.length; bookIterator++) {
        var bookRegExp = "^("+bibleInfo.books[bookIterator].name.bibleSynonymOptimization() + "|";

        for (var bookSynonymIterator = 0; bookSynonymIterator < bibleInfo.books[bookIterator].synonyms.length; bookSynonymIterator++) {
            bookRegExp += bibleInfo.books[bookIterator].synonyms[bookSynonymIterator].bibleSynonymOptimization() + "|";
        }
        bookRegExp = bookRegExp.customTrim("| ") + ")$";


        if (book_osis.match(new RegExp(bookRegExp, "g"))) {
            let book = fs.readFileSync(__dirname+"/bibles/" + lang + "/" + version + "/books/" + (bookIterator + 1).toString().lpad(2) + ".js", 'utf-8');
            book = book.replace(/};/gm, "}");
            book = book.replace(/module.exports = book;/gm, "");
            book = book.replace(/var book = /gm, '');
            book = book.replace(/,\n( |\t)*}/gm, '}');

            try {
                return JSON.parse(book, 'utf-8');
            } catch (e) {
                console.error(book)
                console.error(__dirname+"/bibles/" + lang + "/" + version + "/books/" + (bookIterator + 1).toString().lpad(2) + ".js")
                return
            }
        }
    }
};

var search = function(lang, version, text, markdown) {
    var options = {};
    try {
        options = require("./bibles/" + lang + "/options")
    } catch (err){}

    try {
        var bcv_parser = require("./lib/Bible-Passage-Reference-Parser/js/"+lang+"_bcv_parser").bcv_parser,
          bcv = new bcv_parser;
    } catch (err) {
        var e = new Error();
        e.sender = "bibleParserBCVMissingLanguage";
        throw e;
    }

    bcv.set_options(options);

    var parsed_entitites = bcv.parse(text).parsed_entities(),
      output = text,
      verses = [],
      cv_delimeter = (options && options["punctuation_strategy"] && options["punctuation_strategy"] === "eu") ? "," : ":";

    for (var i = parsed_entitites.length-1; i >= 0; i--){
        var match = parsed_entitites[i],
          verse = match.osis.replace(/\./g, '');

        if (markdown) {
            output = [output.slice(0, match["indices"][1]), "](sspmBible://"+verse+")", output.slice(match["indices"][1])].join('');
            output = [output.slice(0, match["indices"][0]), "[", output.slice(match["indices"][0])].join('');
        } else {
            output = [output.slice(0, match["indices"][1]), "</a>", output.slice(match["indices"][1])].join('');
            output = [output.slice(0, match["indices"][0]), "<a class=\"verse\" verse=\""+verse+"\">", output.slice(match["indices"][0])].join('');
        }

        var match_verses = "";

        for (var j = 0; j < match.entities.length; j++){
            var entity = match.entities[j],
              book_osis = entity.start.b;

            var bibleBook = getBookByOSIS(lang, version, book_osis);

            if (!bibleBook) break;

            switch(entity.type) {
                case "cv": {
                    for (var _verseIterator = entity.start.v; _verseIterator <= entity.end.v; _verseIterator++){
                        var _verse = _verseIterator.toString().customTrim(" "),
                          _chapter = entity.start.c.toString().customTrim(" "),
                          _header =
                              markdown
                                  ? "### " + bibleBook.name + " " + _chapter + cv_delimeter + _verse + "\n\n"
                                  : "<h2>" + bibleBook.name + " " + _chapter + cv_delimeter + _verse + "</h2>";

                        if (_verse in bibleBook.chapters[_chapter]){

                            match_verses += markdown
                                ? "\n\n" +  _header + " " + bibleBook.chapters[_chapter][_verse]
                                : _header + " " + bibleBook.chapters[_chapter][_verse];
                        }
                    }

                    break;
                }

                case "bc": {
                    for (var _chapterIterator = entity.start.c; _chapterIterator <= entity.end.c; _chapterIterator++){
                        var _chapter = _chapterIterator.toString().customTrim(" "),
                          _header = markdown
                              ? "### " + bibleBook.name + " " + _chapter + "\n\n"
                              : "<h2>" + bibleBook.name + " " + _chapter + "</h2>";

                        match_verses += markdown
                            ? "\n\n" + _header
                            : _header;

                        for (var key in bibleBook.chapters[_chapter]) {
                            match_verses += " " + bibleBook.chapters[_chapter][key];
                        }
                    }

                    break;

                }

                case "integer":
                case "bcv":
                case "range": {

                    var _header = markdown
                        ? "### " + bibleBook.name + " "
                        : "<h2>" + bibleBook.name + " ";

                    if (entity.type === "range" || ((entity.start.c !== entity.end.c) || (entity.start.c === entity.end.c && entity.start.v !== entity.end.v))){
                        if (entity.start.c === entity.end.c){
                            _header += entity.start.c + cv_delimeter + entity.start.v + "-" + entity.end.v;
                        } else {
                            _header += entity.start.c + cv_delimeter + entity.start.v + "-" + entity.end.c + cv_delimeter + entity.end.v;
                        }
                    } else {
                        _header += entity.start.c + cv_delimeter + entity.start.v;
                    }

                    _header += markdown
                    ? "\n\n"
                    : "</h2>"

                    match_verses += markdown
                    ? "\n\n"+_header
                    : _header

                    for (var chapterIterator = entity.start.c; chapterIterator <= entity.end.c; chapterIterator++){
                        var _chapter = chapterIterator.toString().customTrim(" "),
                          verseIteratorStart = (chapterIterator === entity.start.c) ? entity.start.v : 1,
                          verseIteratorEnd =  (chapterIterator === entity.end.c) ? entity.end.v : Object.keys(bibleBook.chapters[_chapter]).length,
                          _verse = verseIteratorStart.toString().customTrim(" ");

                        for (var key in bibleBook.chapters[_chapter]) {
                            if (parseInt(key) >= verseIteratorStart && parseInt(key) <= verseIteratorEnd){
                                match_verses += " " + bibleBook.chapters[_chapter][key];
                            }
                        }
                    }
                    break;
                }
            }

            bibleBook = null
        }

        if (match_verses){
            var _verse = {};
            _verse[verse] = match_verses.customTrim("\n");
            verses.push(_verse);
        }
    }

    return {
        "input": text,
        "output": output,
        "verses": verses
    }
};

var bibleTools = {
    search: search
};

module.exports = bibleTools;
