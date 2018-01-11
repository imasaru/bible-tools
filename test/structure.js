var expect = require("chai").expect,
    bibleTools = require('../bible_tools_bcv');

var validStructCheck = function(result){
    it("Should have valid structure", function() {
        expect(result).to.have.property("input");
        expect(result).to.have.property("output");
        expect(result).to.have.property("verses");
        expect(result.verses).to.be.an("array").that.is.not.empty;
    });
};

describe("Book and Chapter", function(){
    var result = bibleTools.search("en", "nkjv", "Genesis 1");

    validStructCheck(result);

    it("Should pull correct chapter", function(){
        expect(result.verses[0]).to.have.property("Gen1");
        expect(result.verses[0]["Gen1"]).to.have.string("In the beginning God created the heavens and the earth");
    });
});

describe("Book and Chapters enumerated", function(){
    var result = bibleTools.search("en", "nkjv", "Genesis 1,2,3");

    validStructCheck(result);

    it("Should pull correct chapters", function() {
        expect(result.verses[0]).to.have.property("Gen1-Gen3");
        expect(result.verses[0]["Gen1-Gen3"]).to.have.string("In the beginning God created the heavens and the earth");
        expect(result.verses[0]["Gen1-Gen3"]).to.have.string("Thus the heavens and the earth, and all the host of them, were finished");
        expect(result.verses[0]["Gen1-Gen3"]).to.have.string("So He drove out the man; and He placed cherubim at the east of the garden of Eden, and a flaming sword which turned every way, to guard the way to the tree of life");
    });
});

describe("Book and Range of Chapters", function(){
    var result = bibleTools.search("en", "nkjv", "Genesis 1-2");

    validStructCheck(result);

    it("Should pull correct chapters", function() {
        expect(result.verses[0]).to.have.property("Gen1-Gen2");
        expect(result.verses[0]["Gen1-Gen2"]).to.have.string("In the beginning God created the heavens and the earth");
        expect(result.verses[0]["Gen1-Gen2"]).to.have.string("Thus the heavens and the earth, and all the host of them, were finished");
    });
});

describe("Book, Chapter and Verse", function(){
    var result = bibleTools.search("en", "nkjv", "Genesis 1:1");

    validStructCheck(result);

    it("Should pull correct verse", function() {
        expect(result.verses[0]).to.have.property("Gen11");
        expect(result.verses[0]["Gen11"]).to.have.string("In the beginning God created the heavens and the earth");
    });
});

describe("Book, Chapter and Verses enumerated", function(){
    var result = bibleTools.search("en", "nkjv", "Genesis 1:1,2");

    validStructCheck(result);

    it("Should pull correct verses", function() {
        expect(result.verses[0]).to.have.property("Gen11-Gen12");
        expect(result.verses[0]["Gen11-Gen12"]).to.have.string("In the beginning God created the heavens and the earth");
        expect(result.verses[0]["Gen11-Gen12"]).to.have.string("And the Spirit of God was hovering over the face of the waters");
    });
});

describe("Book, Chapter and Verses range", function(){
    var result = bibleTools.search("en", "nkjv", "Genesis 1:1-10");

    validStructCheck(result);

    it("Should pull correct verses", function() {
        expect(result.verses[0]).to.have.property("Gen11-Gen110");
        expect(result.verses[0]["Gen11-Gen110"]).to.have.string("In the beginning God created the heavens and the earth");
        expect(result.verses[0]["Gen11-Gen110"]).to.have.string("Let the waters under the heavens be gathered together into one place");
    });
});

describe("Book, Chapter enumerated with verse", function(){
    var result = bibleTools.search("en", "nkjv", "Genesis 1:1, 2:1");

    validStructCheck(result);

    it("Should pull correct verses", function() {
        expect(result.verses[0]).to.have.property("Gen11,Gen21");
        expect(result.verses[0]["Gen11,Gen21"]).to.have.string("In the beginning God created the heavens and the earth");
        expect(result.verses[0]["Gen11,Gen21"]).to.have.string("Thus the heavens and the earth, and all the host of them, were finished");
    });
});

describe("Book, Chapter enumerated with verse enumerated", function(){
    var result = bibleTools.search("en", "nkjv", "Genesis 1:1,2; 2:1,2");

    validStructCheck(result);

    it("Should pull correct verses", function() {
        expect(result.verses[0]).to.have.property("Gen11-Gen12,Gen21-Gen22");
        expect(result.verses[0]["Gen11-Gen12,Gen21-Gen22"]).to.have.string("In the beginning God created the heavens and the earth");
        expect(result.verses[0]["Gen11-Gen12,Gen21-Gen22"]).to.have.string("And the Spirit of God was hovering over the face of the waters");
        expect(result.verses[0]["Gen11-Gen12,Gen21-Gen22"]).to.have.string("Thus the heavens and the earth, and all the host of them, were finished");
        expect(result.verses[0]["Gen11-Gen12,Gen21-Gen22"]).to.have.string("He rested on the seventh day from all His work which He had done");
    });
});

describe("Book, Chapter enumerated with verse range", function(){
    var result = bibleTools.search("en", "nkjv", "Genesis 1:1-2; 2:1-2");

    validStructCheck(result);

    it("Should pull correct verses", function() {
        expect(result.verses[0]).to.have.property("Gen11-Gen12,Gen21-Gen22");
        expect(result.verses[0]["Gen11-Gen12,Gen21-Gen22"]).to.have.string("In the beginning God created the heavens and the earth");
        expect(result.verses[0]["Gen11-Gen12,Gen21-Gen22"]).to.have.string("And the Spirit of God was hovering over the face of the waters");
        expect(result.verses[0]["Gen11-Gen12,Gen21-Gen22"]).to.have.string("Thus the heavens and the earth, and all the host of them, were finished");
        expect(result.verses[0]["Gen11-Gen12,Gen21-Gen22"]).to.have.string("He rested on the seventh day from all His work which He had done");
    });
});

describe("Multiple Books Enumerated", function(){
    var result = bibleTools.search("en", "nkjv", "Genesis 1, Revelation 1");

    validStructCheck(result);

    it("Should pull correct books and chapters", function() {
        expect(result.verses[0]).to.have.property("Gen1,Rev1");
        expect(result.verses[0]["Gen1,Rev1"]).to.have.string("In the beginning God created the heavens and the earth");
        expect(result.verses[0]["Gen1,Rev1"]).to.have.string("The Revelation of Jesus Christ, which God gave Him to show His servants");
    });
});

describe("Multiple Books Separated", function(){
    var result = bibleTools.search("en", "nkjv", "Genesis 1 separator Revelation 1");

    validStructCheck(result);

    it("Should pull correct books and chapters", function() {
        var members = [];

        result.verses.forEach(function(e){
            members = members.concat(Object.keys(e));
        });

        expect(members).to.be.an("array").that.has.lengthOf(2).that.includes("Rev1");
        expect(members).to.be.an("array").that.has.lengthOf(2).that.includes("Gen1");
    });
});

describe("Multiple Books with Chapter and Verse Range Separated", function(){
    var result = bibleTools.search("en", "nkjv", "Genesis 1:1-10 separator Revelation 1:2-3");

    validStructCheck(result);

    it("Should pull correct books and chapters", function() {
        var members = [];

        result.verses.forEach(function(e){
            members = members.concat(Object.keys(e));
        });

        expect(members).to.be.an("array").that.has.lengthOf(2).that.includes("Rev12-Rev13");
        expect(members).to.be.an("array").that.has.lengthOf(2).that.includes("Gen11-Gen110");
    });
});