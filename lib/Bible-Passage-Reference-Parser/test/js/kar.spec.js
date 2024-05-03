(function() {
  var bcv_parser;

  bcv_parser = require("../../js/kar_bcv_parser.js").bcv_parser;

  describe("Parsing", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser();
      p.options.osis_compaction_strategy = "b";
      return p.options.sequence_combination_strategy = "combine";
    });
    it("should round-trip OSIS references", function() {
      var bc, bcv, bcv_range, book, books, i, len, results;
      p.set_options({
        osis_compaction_strategy: "bc"
      });
      books = ["Gen", "Exod", "Lev", "Num", "Deut", "Josh", "Judg", "Ruth", "1Sam", "2Sam", "1Kgs", "2Kgs", "1Chr", "2Chr", "Ezra", "Neh", "Esth", "Job", "Ps", "Prov", "Eccl", "Song", "Isa", "Jer", "Lam", "Ezek", "Dan", "Hos", "Joel", "Amos", "Obad", "Jonah", "Mic", "Nah", "Hab", "Zeph", "Hag", "Zech", "Mal", "Matt", "Mark", "Luke", "John", "Acts", "Rom", "1Cor", "2Cor", "Gal", "Eph", "Phil", "Col", "1Thess", "2Thess", "1Tim", "2Tim", "Titus", "Phlm", "Heb", "Jas", "1Pet", "2Pet", "1John", "2John", "3John", "Jude", "Rev"];
      results = [];
      for (i = 0, len = books.length; i < len; i++) {
        book = books[i];
        bc = book + ".1";
        bcv = bc + ".1";
        bcv_range = bcv + "-" + bc + ".2";
        expect(p.parse(bc).osis()).toEqual(bc);
        expect(p.parse(bcv).osis()).toEqual(bcv);
        results.push(expect(p.parse(bcv_range).osis()).toEqual(bcv_range));
      }
      return results;
    });
    it("should round-trip OSIS Apocrypha references", function() {
      var bc, bcv, bcv_range, book, books, i, j, len, len1, results;
      p.set_options({
        osis_compaction_strategy: "bc",
        ps151_strategy: "b"
      });
      p.include_apocrypha(true);
      books = ["Tob", "Jdt", "GkEsth", "Wis", "Sir", "Bar", "PrAzar", "Sus", "Bel", "SgThree", "EpJer", "1Macc", "2Macc", "3Macc", "4Macc", "1Esd", "2Esd", "PrMan", "Ps151"];
      for (i = 0, len = books.length; i < len; i++) {
        book = books[i];
        bc = book + ".1";
        bcv = bc + ".1";
        bcv_range = bcv + "-" + bc + ".2";
        expect(p.parse(bc).osis()).toEqual(bc);
        expect(p.parse(bcv).osis()).toEqual(bcv);
        expect(p.parse(bcv_range).osis()).toEqual(bcv_range);
      }
      p.set_options({
        ps151_strategy: "bc"
      });
      expect(p.parse("Ps151.1").osis()).toEqual("Ps.151");
      expect(p.parse("Ps151.1.1").osis()).toEqual("Ps.151.1");
      expect(p.parse("Ps151.1-Ps151.2").osis()).toEqual("Ps.151.1-Ps.151.2");
      p.include_apocrypha(false);
      results = [];
      for (j = 0, len1 = books.length; j < len1; j++) {
        book = books[j];
        bc = book + ".1";
        results.push(expect(p.parse(bc).osis()).toEqual(""));
      }
      return results;
    });
    return it("should handle a preceding character", function() {
      expect(p.parse(" Gen 1").osis()).toEqual("Gen.1");
      expect(p.parse("Matt5John3").osis()).toEqual("Matt.5,John.3");
      expect(p.parse("1Ps 1").osis()).toEqual("");
      return expect(p.parse("11Sam 1").osis()).toEqual("");
    });
  });

  describe("Localized book Gen (kar)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser();
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    it("should handle book: Gen (kar)", function() {
      
		expect(p.parse("လံၥ်စီၤမိၤၡ့အခီၣ်ထံးတဘ့ၣ် 1:1").osis()).toEqual("Gen.1.1")
		expect(p.parse("လံာ်တၢ်ကဲထီၣ်အခီၣ်ထံး 1:1").osis()).toEqual("Gen.1.1")
		expect(p.parse("1. မိၤၡ့ 1:1").osis()).toEqual("Gen.1.1")
		expect(p.parse("1 မိၤၡ့ 1:1").osis()).toEqual("Gen.1.1")
		expect(p.parse("1.မိၤၡ့ 1:1").osis()).toEqual("Gen.1.1")
		expect(p.parse("၁ မိၤၡ့ 1:1").osis()).toEqual("Gen.1.1")
		expect(p.parse("1မိၤၡ့ 1:1").osis()).toEqual("Gen.1.1")
		expect(p.parse("၁မိၤၡ့ 1:1").osis()).toEqual("Gen.1.1")
		expect(p.parse("Gen 1:1").osis()).toEqual("Gen.1.1")
		;
      return true;
    });
    return it("should handle non-Latin digits in book: Gen (kar)", function() {
      p.set_options({
        non_latin_digits_strategy: "replace"
      });
      
		expect(p.parse("လံၥ်စီၤမိၤၡ့အခီၣ်ထံးတဘ့ၣ် 1:1").osis()).toEqual("Gen.1.1")
		expect(p.parse("လံာ်တၢ်ကဲထီၣ်အခီၣ်ထံး 1:1").osis()).toEqual("Gen.1.1")
		expect(p.parse("1. မိၤၡ့ 1:1").osis()).toEqual("Gen.1.1")
		expect(p.parse("1 မိၤၡ့ 1:1").osis()).toEqual("Gen.1.1")
		expect(p.parse("1.မိၤၡ့ 1:1").osis()).toEqual("Gen.1.1")
		expect(p.parse("၁ မိၤၡ့ 1:1").osis()).toEqual("Gen.1.1")
		expect(p.parse("1မိၤၡ့ 1:1").osis()).toEqual("Gen.1.1")
		expect(p.parse("၁မိၤၡ့ 1:1").osis()).toEqual("Gen.1.1")
		expect(p.parse("Gen 1:1").osis()).toEqual("Gen.1.1")
		p.include_apocrypha(false)
		expect(p.parse("လံၥ်စီၤမိၤၡ့အခီၣ်ထံးတဘ့ၣ် 1:1").osis()).toEqual("Gen.1.1")
		expect(p.parse("လံာ်တၢ်ကဲထီၣ်အခီၣ်ထံး 1:1").osis()).toEqual("Gen.1.1")
		expect(p.parse("1. မိၤၡ့ 1:1").osis()).toEqual("Gen.1.1")
		expect(p.parse("1 မိၤၡ့ 1:1").osis()).toEqual("Gen.1.1")
		expect(p.parse("1.မိၤၡ့ 1:1").osis()).toEqual("Gen.1.1")
		expect(p.parse("၁ မိၤၡ့ 1:1").osis()).toEqual("Gen.1.1")
		expect(p.parse("1မိၤၡ့ 1:1").osis()).toEqual("Gen.1.1")
		expect(p.parse("၁မိၤၡ့ 1:1").osis()).toEqual("Gen.1.1")
		expect(p.parse("GEN 1:1").osis()).toEqual("Gen.1.1")
		;
      return true;
    });
  });

  describe("Localized book Exod (kar)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser();
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    it("should handle book: Exod (kar)", function() {
      
		expect(p.parse("လံၥ်စီၤမိၤၡ့ခံဘ့ၣ်တဘ့ၣ် 1:1").osis()).toEqual("Exod.1.1")
		expect(p.parse("လံာ်တၢ်ဟးထီၣ်ကွံာ် 1:1").osis()).toEqual("Exod.1.1")
		expect(p.parse("2. မိၤၡ့ 1:1").osis()).toEqual("Exod.1.1")
		expect(p.parse("2 မိၤၡ့ 1:1").osis()).toEqual("Exod.1.1")
		expect(p.parse("2.မိၤၡ့ 1:1").osis()).toEqual("Exod.1.1")
		expect(p.parse("၂ မိၤၡ့ 1:1").osis()).toEqual("Exod.1.1")
		expect(p.parse("2. မိၤ 1:1").osis()).toEqual("Exod.1.1")
		expect(p.parse("2မိၤၡ့ 1:1").osis()).toEqual("Exod.1.1")
		expect(p.parse("၂မိၤၡ့ 1:1").osis()).toEqual("Exod.1.1")
		expect(p.parse("2 မိၤ 1:1").osis()).toEqual("Exod.1.1")
		expect(p.parse("၂ မိၤ 1:1").osis()).toEqual("Exod.1.1")
		expect(p.parse("Exod 1:1").osis()).toEqual("Exod.1.1")
		;
      return true;
    });
    return it("should handle non-Latin digits in book: Exod (kar)", function() {
      p.set_options({
        non_latin_digits_strategy: "replace"
      });
      
		expect(p.parse("လံၥ်စီၤမိၤၡ့ခံဘ့ၣ်တဘ့ၣ် 1:1").osis()).toEqual("Exod.1.1")
		expect(p.parse("လံာ်တၢ်ဟးထီၣ်ကွံာ် 1:1").osis()).toEqual("Exod.1.1")
		expect(p.parse("2. မိၤၡ့ 1:1").osis()).toEqual("Exod.1.1")
		expect(p.parse("2 မိၤၡ့ 1:1").osis()).toEqual("Exod.1.1")
		expect(p.parse("2.မိၤၡ့ 1:1").osis()).toEqual("Exod.1.1")
		expect(p.parse("၂ မိၤၡ့ 1:1").osis()).toEqual("Exod.1.1")
		expect(p.parse("2. မိၤ 1:1").osis()).toEqual("Exod.1.1")
		expect(p.parse("2မိၤၡ့ 1:1").osis()).toEqual("Exod.1.1")
		expect(p.parse("၂မိၤၡ့ 1:1").osis()).toEqual("Exod.1.1")
		expect(p.parse("2 မိၤ 1:1").osis()).toEqual("Exod.1.1")
		expect(p.parse("၂ မိၤ 1:1").osis()).toEqual("Exod.1.1")
		expect(p.parse("Exod 1:1").osis()).toEqual("Exod.1.1")
		p.include_apocrypha(false)
		expect(p.parse("လံၥ်စီၤမိၤၡ့ခံဘ့ၣ်တဘ့ၣ် 1:1").osis()).toEqual("Exod.1.1")
		expect(p.parse("လံာ်တၢ်ဟးထီၣ်ကွံာ် 1:1").osis()).toEqual("Exod.1.1")
		expect(p.parse("2. မိၤၡ့ 1:1").osis()).toEqual("Exod.1.1")
		expect(p.parse("2 မိၤၡ့ 1:1").osis()).toEqual("Exod.1.1")
		expect(p.parse("2.မိၤၡ့ 1:1").osis()).toEqual("Exod.1.1")
		expect(p.parse("၂ မိၤၡ့ 1:1").osis()).toEqual("Exod.1.1")
		expect(p.parse("2. မိၤ 1:1").osis()).toEqual("Exod.1.1")
		expect(p.parse("2မိၤၡ့ 1:1").osis()).toEqual("Exod.1.1")
		expect(p.parse("၂မိၤၡ့ 1:1").osis()).toEqual("Exod.1.1")
		expect(p.parse("2 မိၤ 1:1").osis()).toEqual("Exod.1.1")
		expect(p.parse("၂ မိၤ 1:1").osis()).toEqual("Exod.1.1")
		expect(p.parse("EXOD 1:1").osis()).toEqual("Exod.1.1")
		;
      return true;
    });
  });

  describe("Localized book Bel (kar)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser();
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    return it("should handle book: Bel (kar)", function() {
      
		expect(p.parse("Bel 1:1").osis()).toEqual("Bel.1.1")
		;
      return true;
    });
  });

  describe("Localized book Lev (kar)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser();
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    it("should handle book: Lev (kar)", function() {
      
		expect(p.parse("လံၥ်စီၤမိၤၡ့သၢဘ့ၣ်တဘ့ၣ် 1:1").osis()).toEqual("Lev.1.1")
		expect(p.parse("လံာ်တၢ်ဘူၣ်ထီၣ်ဘါထီၣ် 1:1").osis()).toEqual("Lev.1.1")
		expect(p.parse("3. မိၤၡ့ 1:1").osis()).toEqual("Lev.1.1")
		expect(p.parse("3 မိၤၡ့ 1:1").osis()).toEqual("Lev.1.1")
		expect(p.parse("3.မိၤၡ့ 1:1").osis()).toEqual("Lev.1.1")
		expect(p.parse("၃ မိၤၡ့ 1:1").osis()).toEqual("Lev.1.1")
		expect(p.parse("3. မိၤ 1:1").osis()).toEqual("Lev.1.1")
		expect(p.parse("3မိၤၡ့ 1:1").osis()).toEqual("Lev.1.1")
		expect(p.parse("၃မိၤၡ့ 1:1").osis()).toEqual("Lev.1.1")
		expect(p.parse("3 မိၤ 1:1").osis()).toEqual("Lev.1.1")
		expect(p.parse("၃ မိၤ 1:1").osis()).toEqual("Lev.1.1")
		expect(p.parse("Lev 1:1").osis()).toEqual("Lev.1.1")
		;
      return true;
    });
    return it("should handle non-Latin digits in book: Lev (kar)", function() {
      p.set_options({
        non_latin_digits_strategy: "replace"
      });
      
		expect(p.parse("လံၥ်စီၤမိၤၡ့သၢဘ့ၣ်တဘ့ၣ် 1:1").osis()).toEqual("Lev.1.1")
		expect(p.parse("လံာ်တၢ်ဘူၣ်ထီၣ်ဘါထီၣ် 1:1").osis()).toEqual("Lev.1.1")
		expect(p.parse("3. မိၤၡ့ 1:1").osis()).toEqual("Lev.1.1")
		expect(p.parse("3 မိၤၡ့ 1:1").osis()).toEqual("Lev.1.1")
		expect(p.parse("3.မိၤၡ့ 1:1").osis()).toEqual("Lev.1.1")
		expect(p.parse("၃ မိၤၡ့ 1:1").osis()).toEqual("Lev.1.1")
		expect(p.parse("3. မိၤ 1:1").osis()).toEqual("Lev.1.1")
		expect(p.parse("3မိၤၡ့ 1:1").osis()).toEqual("Lev.1.1")
		expect(p.parse("၃မိၤၡ့ 1:1").osis()).toEqual("Lev.1.1")
		expect(p.parse("3 မိၤ 1:1").osis()).toEqual("Lev.1.1")
		expect(p.parse("၃ မိၤ 1:1").osis()).toEqual("Lev.1.1")
		expect(p.parse("Lev 1:1").osis()).toEqual("Lev.1.1")
		p.include_apocrypha(false)
		expect(p.parse("လံၥ်စီၤမိၤၡ့သၢဘ့ၣ်တဘ့ၣ် 1:1").osis()).toEqual("Lev.1.1")
		expect(p.parse("လံာ်တၢ်ဘူၣ်ထီၣ်ဘါထီၣ် 1:1").osis()).toEqual("Lev.1.1")
		expect(p.parse("3. မိၤၡ့ 1:1").osis()).toEqual("Lev.1.1")
		expect(p.parse("3 မိၤၡ့ 1:1").osis()).toEqual("Lev.1.1")
		expect(p.parse("3.မိၤၡ့ 1:1").osis()).toEqual("Lev.1.1")
		expect(p.parse("၃ မိၤၡ့ 1:1").osis()).toEqual("Lev.1.1")
		expect(p.parse("3. မိၤ 1:1").osis()).toEqual("Lev.1.1")
		expect(p.parse("3မိၤၡ့ 1:1").osis()).toEqual("Lev.1.1")
		expect(p.parse("၃မိၤၡ့ 1:1").osis()).toEqual("Lev.1.1")
		expect(p.parse("3 မိၤ 1:1").osis()).toEqual("Lev.1.1")
		expect(p.parse("၃ မိၤ 1:1").osis()).toEqual("Lev.1.1")
		expect(p.parse("LEV 1:1").osis()).toEqual("Lev.1.1")
		;
      return true;
    });
  });

  describe("Localized book Num (kar)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser();
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    it("should handle book: Num (kar)", function() {
      
		expect(p.parse("လံၥ်စီၤမိၤၡ့လွံၢ်ဘ့ၣ်တဘ့ၣ် 1:1").osis()).toEqual("Num.1.1")
		expect(p.parse("လံာ်တၢ်ဂံၢ် 1:1").osis()).toEqual("Num.1.1")
		expect(p.parse("4. မိၤၡ့ 1:1").osis()).toEqual("Num.1.1")
		expect(p.parse("4 မိၤၡ့ 1:1").osis()).toEqual("Num.1.1")
		expect(p.parse("4.မိၤၡ့ 1:1").osis()).toEqual("Num.1.1")
		expect(p.parse("၄ မိၤၡ့ 1:1").osis()).toEqual("Num.1.1")
		expect(p.parse("4. မိၤ 1:1").osis()).toEqual("Num.1.1")
		expect(p.parse("4မိၤၡ့ 1:1").osis()).toEqual("Num.1.1")
		expect(p.parse("၄မိၤၡ့ 1:1").osis()).toEqual("Num.1.1")
		expect(p.parse("4 မိၤ 1:1").osis()).toEqual("Num.1.1")
		expect(p.parse("၄ မိၤ 1:1").osis()).toEqual("Num.1.1")
		expect(p.parse("Num 1:1").osis()).toEqual("Num.1.1")
		;
      return true;
    });
    return it("should handle non-Latin digits in book: Num (kar)", function() {
      p.set_options({
        non_latin_digits_strategy: "replace"
      });
      
		expect(p.parse("လံၥ်စီၤမိၤၡ့လွံၢ်ဘ့ၣ်တဘ့ၣ် 1:1").osis()).toEqual("Num.1.1")
		expect(p.parse("လံာ်တၢ်ဂံၢ် 1:1").osis()).toEqual("Num.1.1")
		expect(p.parse("4. မိၤၡ့ 1:1").osis()).toEqual("Num.1.1")
		expect(p.parse("4 မိၤၡ့ 1:1").osis()).toEqual("Num.1.1")
		expect(p.parse("4.မိၤၡ့ 1:1").osis()).toEqual("Num.1.1")
		expect(p.parse("၄ မိၤၡ့ 1:1").osis()).toEqual("Num.1.1")
		expect(p.parse("4. မိၤ 1:1").osis()).toEqual("Num.1.1")
		expect(p.parse("4မိၤၡ့ 1:1").osis()).toEqual("Num.1.1")
		expect(p.parse("၄မိၤၡ့ 1:1").osis()).toEqual("Num.1.1")
		expect(p.parse("4 မိၤ 1:1").osis()).toEqual("Num.1.1")
		expect(p.parse("၄ မိၤ 1:1").osis()).toEqual("Num.1.1")
		expect(p.parse("Num 1:1").osis()).toEqual("Num.1.1")
		p.include_apocrypha(false)
		expect(p.parse("လံၥ်စီၤမိၤၡ့လွံၢ်ဘ့ၣ်တဘ့ၣ် 1:1").osis()).toEqual("Num.1.1")
		expect(p.parse("လံာ်တၢ်ဂံၢ် 1:1").osis()).toEqual("Num.1.1")
		expect(p.parse("4. မိၤၡ့ 1:1").osis()).toEqual("Num.1.1")
		expect(p.parse("4 မိၤၡ့ 1:1").osis()).toEqual("Num.1.1")
		expect(p.parse("4.မိၤၡ့ 1:1").osis()).toEqual("Num.1.1")
		expect(p.parse("၄ မိၤၡ့ 1:1").osis()).toEqual("Num.1.1")
		expect(p.parse("4. မိၤ 1:1").osis()).toEqual("Num.1.1")
		expect(p.parse("4မိၤၡ့ 1:1").osis()).toEqual("Num.1.1")
		expect(p.parse("၄မိၤၡ့ 1:1").osis()).toEqual("Num.1.1")
		expect(p.parse("4 မိၤ 1:1").osis()).toEqual("Num.1.1")
		expect(p.parse("၄ မိၤ 1:1").osis()).toEqual("Num.1.1")
		expect(p.parse("NUM 1:1").osis()).toEqual("Num.1.1")
		;
      return true;
    });
  });

  describe("Localized book Sir (kar)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser();
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    return it("should handle book: Sir (kar)", function() {
      
		expect(p.parse("Sir 1:1").osis()).toEqual("Sir.1.1")
		;
      return true;
    });
  });

  describe("Localized book Wis (kar)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser();
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    return it("should handle book: Wis (kar)", function() {
      
		expect(p.parse("Wis 1:1").osis()).toEqual("Wis.1.1")
		;
      return true;
    });
  });

  describe("Localized book Lam (kar)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser();
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    return it("should handle book: Lam (kar)", function() {
      
		expect(p.parse("လံာ်သးသယုၢ်တၢ် 1:1").osis()).toEqual("Lam.1.1")
		expect(p.parse("လံၥ်သးသယုၢ်တၢ် 1:1").osis()).toEqual("Lam.1.1")
		expect(p.parse("Lam 1:1").osis()).toEqual("Lam.1.1")
		expect(p.parse("သး 1:1").osis()).toEqual("Lam.1.1")
		p.include_apocrypha(false)
		expect(p.parse("လံာ်သးသယုၢ်တၢ် 1:1").osis()).toEqual("Lam.1.1")
		expect(p.parse("လံၥ်သးသယုၢ်တၢ် 1:1").osis()).toEqual("Lam.1.1")
		expect(p.parse("LAM 1:1").osis()).toEqual("Lam.1.1")
		expect(p.parse("သး 1:1").osis()).toEqual("Lam.1.1")
		;
      return true;
    });
  });

  describe("Localized book EpJer (kar)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser();
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    return it("should handle book: EpJer (kar)", function() {
      
		expect(p.parse("EpJer 1:1").osis()).toEqual("EpJer.1.1")
		;
      return true;
    });
  });

  describe("Localized book Rev (kar)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser();
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    return it("should handle book: Rev (kar)", function() {
      
		expect(p.parse("လံာ်လီၣ်ဖျါ 1:1").osis()).toEqual("Rev.1.1")
		expect(p.parse("တၢ်လီၣ်ဖျါ 1:1").osis()).toEqual("Rev.1.1")
		expect(p.parse("လီၣ် 1:1").osis()).toEqual("Rev.1.1")
		expect(p.parse("Rev 1:1").osis()).toEqual("Rev.1.1")
		p.include_apocrypha(false)
		expect(p.parse("လံာ်လီၣ်ဖျါ 1:1").osis()).toEqual("Rev.1.1")
		expect(p.parse("တၢ်လီၣ်ဖျါ 1:1").osis()).toEqual("Rev.1.1")
		expect(p.parse("လီၣ် 1:1").osis()).toEqual("Rev.1.1")
		expect(p.parse("REV 1:1").osis()).toEqual("Rev.1.1")
		;
      return true;
    });
  });

  describe("Localized book PrMan (kar)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser();
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    return it("should handle book: PrMan (kar)", function() {
      
		expect(p.parse("PrMan 1:1").osis()).toEqual("PrMan.1.1")
		;
      return true;
    });
  });

  describe("Localized book Deut (kar)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser();
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    it("should handle book: Deut (kar)", function() {
      
		expect(p.parse("5. မိၤၡ့ လံၥ်စီၤမိၤၡ့ယဲၢ်ဘ့ၣ်တဘ့ၣ် 1:1").osis()).toEqual("Deut.1.1")
		expect(p.parse("5 မိၤၡ့ လံၥ်စီၤမိၤၡ့ယဲၢ်ဘ့ၣ်တဘ့ၣ် 1:1").osis()).toEqual("Deut.1.1")
		expect(p.parse("5.မိၤၡ့ လံၥ်စီၤမိၤၡ့ယဲၢ်ဘ့ၣ်တဘ့ၣ် 1:1").osis()).toEqual("Deut.1.1")
		expect(p.parse("၅ မိၤၡ့ လံၥ်စီၤမိၤၡ့ယဲၢ်ဘ့ၣ်တဘ့ၣ် 1:1").osis()).toEqual("Deut.1.1")
		expect(p.parse("5မိၤၡ့ လံၥ်စီၤမိၤၡ့ယဲၢ်ဘ့ၣ်တဘ့ၣ် 1:1").osis()).toEqual("Deut.1.1")
		expect(p.parse("၅မိၤၡ့ လံၥ်စီၤမိၤၡ့ယဲၢ်ဘ့ၣ်တဘ့ၣ် 1:1").osis()).toEqual("Deut.1.1")
		expect(p.parse("လံာ်သိၣ်လီၤသီလီၤတၢ် 1:1").osis()).toEqual("Deut.1.1")
		expect(p.parse("5. မိၤ 1:1").osis()).toEqual("Deut.1.1")
		expect(p.parse("5 မိၤ 1:1").osis()).toEqual("Deut.1.1")
		expect(p.parse("၅ မိၤ 1:1").osis()).toEqual("Deut.1.1")
		expect(p.parse("Deut 1:1").osis()).toEqual("Deut.1.1")
		;
      return true;
    });
    return it("should handle non-Latin digits in book: Deut (kar)", function() {
      p.set_options({
        non_latin_digits_strategy: "replace"
      });
      
		expect(p.parse("5. မိၤၡ့ လံၥ်စီၤမိၤၡ့ယဲၢ်ဘ့ၣ်တဘ့ၣ် 1:1").osis()).toEqual("Deut.1.1")
		expect(p.parse("5 မိၤၡ့ လံၥ်စီၤမိၤၡ့ယဲၢ်ဘ့ၣ်တဘ့ၣ် 1:1").osis()).toEqual("Deut.1.1")
		expect(p.parse("5.မိၤၡ့ လံၥ်စီၤမိၤၡ့ယဲၢ်ဘ့ၣ်တဘ့ၣ် 1:1").osis()).toEqual("Deut.1.1")
		expect(p.parse("၅ မိၤၡ့ လံၥ်စီၤမိၤၡ့ယဲၢ်ဘ့ၣ်တဘ့ၣ် 1:1").osis()).toEqual("Deut.1.1")
		expect(p.parse("5မိၤၡ့ လံၥ်စီၤမိၤၡ့ယဲၢ်ဘ့ၣ်တဘ့ၣ် 1:1").osis()).toEqual("Deut.1.1")
		expect(p.parse("၅မိၤၡ့ လံၥ်စီၤမိၤၡ့ယဲၢ်ဘ့ၣ်တဘ့ၣ် 1:1").osis()).toEqual("Deut.1.1")
		expect(p.parse("လံာ်သိၣ်လီၤသီလီၤတၢ် 1:1").osis()).toEqual("Deut.1.1")
		expect(p.parse("5. မိၤ 1:1").osis()).toEqual("Deut.1.1")
		expect(p.parse("5 မိၤ 1:1").osis()).toEqual("Deut.1.1")
		expect(p.parse("၅ မိၤ 1:1").osis()).toEqual("Deut.1.1")
		expect(p.parse("Deut 1:1").osis()).toEqual("Deut.1.1")
		p.include_apocrypha(false)
		expect(p.parse("5. မိၤၡ့ လံၥ်စီၤမိၤၡ့ယဲၢ်ဘ့ၣ်တဘ့ၣ် 1:1").osis()).toEqual("Deut.1.1")
		expect(p.parse("5 မိၤၡ့ လံၥ်စီၤမိၤၡ့ယဲၢ်ဘ့ၣ်တဘ့ၣ် 1:1").osis()).toEqual("Deut.1.1")
		expect(p.parse("5.မိၤၡ့ လံၥ်စီၤမိၤၡ့ယဲၢ်ဘ့ၣ်တဘ့ၣ် 1:1").osis()).toEqual("Deut.1.1")
		expect(p.parse("၅ မိၤၡ့ လံၥ်စီၤမိၤၡ့ယဲၢ်ဘ့ၣ်တဘ့ၣ် 1:1").osis()).toEqual("Deut.1.1")
		expect(p.parse("5မိၤၡ့ လံၥ်စီၤမိၤၡ့ယဲၢ်ဘ့ၣ်တဘ့ၣ် 1:1").osis()).toEqual("Deut.1.1")
		expect(p.parse("၅မိၤၡ့ လံၥ်စီၤမိၤၡ့ယဲၢ်ဘ့ၣ်တဘ့ၣ် 1:1").osis()).toEqual("Deut.1.1")
		expect(p.parse("လံာ်သိၣ်လီၤသီလီၤတၢ် 1:1").osis()).toEqual("Deut.1.1")
		expect(p.parse("5. မိၤ 1:1").osis()).toEqual("Deut.1.1")
		expect(p.parse("5 မိၤ 1:1").osis()).toEqual("Deut.1.1")
		expect(p.parse("၅ မိၤ 1:1").osis()).toEqual("Deut.1.1")
		expect(p.parse("DEUT 1:1").osis()).toEqual("Deut.1.1")
		;
      return true;
    });
  });

  describe("Localized book Josh (kar)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser();
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    return it("should handle book: Josh (kar)", function() {
      
		expect(p.parse("လံာ်စီၤယိၤၡူ 1:1").osis()).toEqual("Josh.1.1")
		expect(p.parse("လံၥ်ယိၤၡူ 1:1").osis()).toEqual("Josh.1.1")
		expect(p.parse("ယိၤၡူ 1:1").osis()).toEqual("Josh.1.1")
		expect(p.parse("Josh 1:1").osis()).toEqual("Josh.1.1")
		expect(p.parse("ၡူ 1:1").osis()).toEqual("Josh.1.1")
		p.include_apocrypha(false)
		expect(p.parse("လံာ်စီၤယိၤၡူ 1:1").osis()).toEqual("Josh.1.1")
		expect(p.parse("လံၥ်ယိၤၡူ 1:1").osis()).toEqual("Josh.1.1")
		expect(p.parse("ယိၤၡူ 1:1").osis()).toEqual("Josh.1.1")
		expect(p.parse("JOSH 1:1").osis()).toEqual("Josh.1.1")
		expect(p.parse("ၡူ 1:1").osis()).toEqual("Josh.1.1")
		;
      return true;
    });
  });

  describe("Localized book Judg (kar)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser();
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    return it("should handle book: Judg (kar)", function() {
      
		expect(p.parse("လံာ်ပှၤစံၣ်ညီၣ်ကွီၢ် 1:1").osis()).toEqual("Judg.1.1")
		expect(p.parse("လံၥ်ၦၤစံၣ်ညီၣ်ကွီၢ် 1:1").osis()).toEqual("Judg.1.1")
		expect(p.parse("စံၣ်ညီၣ် 1:1").osis()).toEqual("Judg.1.1")
		expect(p.parse("Judg 1:1").osis()).toEqual("Judg.1.1")
		p.include_apocrypha(false)
		expect(p.parse("လံာ်ပှၤစံၣ်ညီၣ်ကွီၢ် 1:1").osis()).toEqual("Judg.1.1")
		expect(p.parse("လံၥ်ၦၤစံၣ်ညီၣ်ကွီၢ် 1:1").osis()).toEqual("Judg.1.1")
		expect(p.parse("စံၣ်ညီၣ် 1:1").osis()).toEqual("Judg.1.1")
		expect(p.parse("JUDG 1:1").osis()).toEqual("Judg.1.1")
		;
      return true;
    });
  });

  describe("Localized book Ruth (kar)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser();
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    return it("should handle book: Ruth (kar)", function() {
      
		expect(p.parse("လံာ်နီၢ်ရူၤသး 1:1").osis()).toEqual("Ruth.1.1")
		expect(p.parse("လံၥ်နီၢ်ရူၤသး 1:1").osis()).toEqual("Ruth.1.1")
		expect(p.parse("Ruth 1:1").osis()).toEqual("Ruth.1.1")
		expect(p.parse("ရူၤ 1:1").osis()).toEqual("Ruth.1.1")
		p.include_apocrypha(false)
		expect(p.parse("လံာ်နီၢ်ရူၤသး 1:1").osis()).toEqual("Ruth.1.1")
		expect(p.parse("လံၥ်နီၢ်ရူၤသး 1:1").osis()).toEqual("Ruth.1.1")
		expect(p.parse("RUTH 1:1").osis()).toEqual("Ruth.1.1")
		expect(p.parse("ရူၤ 1:1").osis()).toEqual("Ruth.1.1")
		;
      return true;
    });
  });

  describe("Localized book 1Esd (kar)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser();
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    return it("should handle book: 1Esd (kar)", function() {
      
		expect(p.parse("1Esd 1:1").osis()).toEqual("1Esd.1.1")
		;
      return true;
    });
  });

  describe("Localized book 2Esd (kar)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser();
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    return it("should handle book: 2Esd (kar)", function() {
      
		expect(p.parse("2Esd 1:1").osis()).toEqual("2Esd.1.1")
		;
      return true;
    });
  });

  describe("Localized book Isa (kar)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser();
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    return it("should handle book: Isa (kar)", function() {
      
		expect(p.parse("လံာ်ယၡါယၤ 1:1").osis()).toEqual("Isa.1.1")
		expect(p.parse("လံၥ်ယၡါယၤ 1:1").osis()).toEqual("Isa.1.1")
		expect(p.parse("ယၡါယၤ 1:1").osis()).toEqual("Isa.1.1")
		expect(p.parse("Isa 1:1").osis()).toEqual("Isa.1.1")
		expect(p.parse("ၡါ 1:1").osis()).toEqual("Isa.1.1")
		p.include_apocrypha(false)
		expect(p.parse("လံာ်ယၡါယၤ 1:1").osis()).toEqual("Isa.1.1")
		expect(p.parse("လံၥ်ယၡါယၤ 1:1").osis()).toEqual("Isa.1.1")
		expect(p.parse("ယၡါယၤ 1:1").osis()).toEqual("Isa.1.1")
		expect(p.parse("ISA 1:1").osis()).toEqual("Isa.1.1")
		expect(p.parse("ၡါ 1:1").osis()).toEqual("Isa.1.1")
		;
      return true;
    });
  });

  describe("Localized book 2Sam (kar)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser();
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    it("should handle book: 2Sam (kar)", function() {
      
		expect(p.parse("လံာ်စီၤၡမူၤအ့လးခံဘ့ၣ်တဘ့ၣ် 1:1").osis()).toEqual("2Sam.1.1")
		expect(p.parse("လံၥ်ၡမူၤအ့လးခံဘ့ၣ်တဘ့ၣ် 1:1").osis()).toEqual("2Sam.1.1")
		expect(p.parse("2ၡမူၤအ့လး 1:1").osis()).toEqual("2Sam.1.1")
		expect(p.parse("2. မူၤ 1:1").osis()).toEqual("2Sam.1.1")
		expect(p.parse("2 မူၤ 1:1").osis()).toEqual("2Sam.1.1")
		expect(p.parse("၂ မူၤ 1:1").osis()).toEqual("2Sam.1.1")
		expect(p.parse("2Sam 1:1").osis()).toEqual("2Sam.1.1")
		;
      return true;
    });
    return it("should handle non-Latin digits in book: 2Sam (kar)", function() {
      p.set_options({
        non_latin_digits_strategy: "replace"
      });
      
		expect(p.parse("လံာ်စီၤၡမူၤအ့လးခံဘ့ၣ်တဘ့ၣ် 1:1").osis()).toEqual("2Sam.1.1")
		expect(p.parse("လံၥ်ၡမူၤအ့လးခံဘ့ၣ်တဘ့ၣ် 1:1").osis()).toEqual("2Sam.1.1")
		expect(p.parse("2ၡမူၤအ့လး 1:1").osis()).toEqual("2Sam.1.1")
		expect(p.parse("2. မူၤ 1:1").osis()).toEqual("2Sam.1.1")
		expect(p.parse("2 မူၤ 1:1").osis()).toEqual("2Sam.1.1")
		expect(p.parse("၂ မူၤ 1:1").osis()).toEqual("2Sam.1.1")
		expect(p.parse("2Sam 1:1").osis()).toEqual("2Sam.1.1")
		p.include_apocrypha(false)
		expect(p.parse("လံာ်စီၤၡမူၤအ့လးခံဘ့ၣ်တဘ့ၣ် 1:1").osis()).toEqual("2Sam.1.1")
		expect(p.parse("လံၥ်ၡမူၤအ့လးခံဘ့ၣ်တဘ့ၣ် 1:1").osis()).toEqual("2Sam.1.1")
		expect(p.parse("2ၡမူၤအ့လး 1:1").osis()).toEqual("2Sam.1.1")
		expect(p.parse("2. မူၤ 1:1").osis()).toEqual("2Sam.1.1")
		expect(p.parse("2 မူၤ 1:1").osis()).toEqual("2Sam.1.1")
		expect(p.parse("၂ မူၤ 1:1").osis()).toEqual("2Sam.1.1")
		expect(p.parse("2SAM 1:1").osis()).toEqual("2Sam.1.1")
		;
      return true;
    });
  });

  describe("Localized book 1Sam (kar)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser();
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    it("should handle book: 1Sam (kar)", function() {
      
		expect(p.parse("လံာ်စီၤၡမူၤအ့လးအခီၣ်ထံးတဘ့ၣ် 1:1").osis()).toEqual("1Sam.1.1")
		expect(p.parse("လံၥ်ၡမူၤအ့လးအခီၣ်ထံးတဘ့ၣ် 1:1").osis()).toEqual("1Sam.1.1")
		expect(p.parse("1ၡမူၤအ့လး 1:1").osis()).toEqual("1Sam.1.1")
		expect(p.parse("1. မူၤ 1:1").osis()).toEqual("1Sam.1.1")
		expect(p.parse("1 မူၤ 1:1").osis()).toEqual("1Sam.1.1")
		expect(p.parse("၁ မူၤ 1:1").osis()).toEqual("1Sam.1.1")
		expect(p.parse("1Sam 1:1").osis()).toEqual("1Sam.1.1")
		;
      return true;
    });
    return it("should handle non-Latin digits in book: 1Sam (kar)", function() {
      p.set_options({
        non_latin_digits_strategy: "replace"
      });
      
		expect(p.parse("လံာ်စီၤၡမူၤအ့လးအခီၣ်ထံးတဘ့ၣ် 1:1").osis()).toEqual("1Sam.1.1")
		expect(p.parse("လံၥ်ၡမူၤအ့လးအခီၣ်ထံးတဘ့ၣ် 1:1").osis()).toEqual("1Sam.1.1")
		expect(p.parse("1ၡမူၤအ့လး 1:1").osis()).toEqual("1Sam.1.1")
		expect(p.parse("1. မူၤ 1:1").osis()).toEqual("1Sam.1.1")
		expect(p.parse("1 မူၤ 1:1").osis()).toEqual("1Sam.1.1")
		expect(p.parse("၁ မူၤ 1:1").osis()).toEqual("1Sam.1.1")
		expect(p.parse("1Sam 1:1").osis()).toEqual("1Sam.1.1")
		p.include_apocrypha(false)
		expect(p.parse("လံာ်စီၤၡမူၤအ့လးအခီၣ်ထံးတဘ့ၣ် 1:1").osis()).toEqual("1Sam.1.1")
		expect(p.parse("လံၥ်ၡမူၤအ့လးအခီၣ်ထံးတဘ့ၣ် 1:1").osis()).toEqual("1Sam.1.1")
		expect(p.parse("1ၡမူၤအ့လး 1:1").osis()).toEqual("1Sam.1.1")
		expect(p.parse("1. မူၤ 1:1").osis()).toEqual("1Sam.1.1")
		expect(p.parse("1 မူၤ 1:1").osis()).toEqual("1Sam.1.1")
		expect(p.parse("၁ မူၤ 1:1").osis()).toEqual("1Sam.1.1")
		expect(p.parse("1SAM 1:1").osis()).toEqual("1Sam.1.1")
		;
      return true;
    });
  });

  describe("Localized book 2Kgs (kar)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser();
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    it("should handle book: 2Kgs (kar)", function() {
      
		expect(p.parse("လံာ်စီၤပၤခံဘ့ၣ်တဘ့ၣ် 1:1").osis()).toEqual("2Kgs.1.1")
		expect(p.parse("လံၥ်စီၤပၤခံဘ့ၣ်တဘ့ၣ် 1:1").osis()).toEqual("2Kgs.1.1")
		expect(p.parse("2. စီၤပၤ 1:1").osis()).toEqual("2Kgs.1.1")
		expect(p.parse("2 စီၤပၤ 1:1").osis()).toEqual("2Kgs.1.1")
		expect(p.parse("၂ စီၤပၤ 1:1").osis()).toEqual("2Kgs.1.1")
		expect(p.parse("2Kgs 1:1").osis()).toEqual("2Kgs.1.1")
		;
      return true;
    });
    return it("should handle non-Latin digits in book: 2Kgs (kar)", function() {
      p.set_options({
        non_latin_digits_strategy: "replace"
      });
      
		expect(p.parse("လံာ်စီၤပၤခံဘ့ၣ်တဘ့ၣ် 1:1").osis()).toEqual("2Kgs.1.1")
		expect(p.parse("လံၥ်စီၤပၤခံဘ့ၣ်တဘ့ၣ် 1:1").osis()).toEqual("2Kgs.1.1")
		expect(p.parse("2. စီၤပၤ 1:1").osis()).toEqual("2Kgs.1.1")
		expect(p.parse("2 စီၤပၤ 1:1").osis()).toEqual("2Kgs.1.1")
		expect(p.parse("၂ စီၤပၤ 1:1").osis()).toEqual("2Kgs.1.1")
		expect(p.parse("2Kgs 1:1").osis()).toEqual("2Kgs.1.1")
		p.include_apocrypha(false)
		expect(p.parse("လံာ်စီၤပၤခံဘ့ၣ်တဘ့ၣ် 1:1").osis()).toEqual("2Kgs.1.1")
		expect(p.parse("လံၥ်စီၤပၤခံဘ့ၣ်တဘ့ၣ် 1:1").osis()).toEqual("2Kgs.1.1")
		expect(p.parse("2. စီၤပၤ 1:1").osis()).toEqual("2Kgs.1.1")
		expect(p.parse("2 စီၤပၤ 1:1").osis()).toEqual("2Kgs.1.1")
		expect(p.parse("၂ စီၤပၤ 1:1").osis()).toEqual("2Kgs.1.1")
		expect(p.parse("2KGS 1:1").osis()).toEqual("2Kgs.1.1")
		;
      return true;
    });
  });

  describe("Localized book 1Kgs (kar)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser();
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    it("should handle book: 1Kgs (kar)", function() {
      
		expect(p.parse("လံာ်စီၤပၤအခီၣ်ထံးတဘ့ၣ် 1:1").osis()).toEqual("1Kgs.1.1")
		expect(p.parse("လံၥ်စီၤပၤအခီၣ်ထံးတဘ့ၣ် 1:1").osis()).toEqual("1Kgs.1.1")
		expect(p.parse("1. စီၤပၤ 1:1").osis()).toEqual("1Kgs.1.1")
		expect(p.parse("1 စီၤပၤ 1:1").osis()).toEqual("1Kgs.1.1")
		expect(p.parse("၁ စီၤပၤ 1:1").osis()).toEqual("1Kgs.1.1")
		expect(p.parse("1Kgs 1:1").osis()).toEqual("1Kgs.1.1")
		;
      return true;
    });
    return it("should handle non-Latin digits in book: 1Kgs (kar)", function() {
      p.set_options({
        non_latin_digits_strategy: "replace"
      });
      
		expect(p.parse("လံာ်စီၤပၤအခီၣ်ထံးတဘ့ၣ် 1:1").osis()).toEqual("1Kgs.1.1")
		expect(p.parse("လံၥ်စီၤပၤအခီၣ်ထံးတဘ့ၣ် 1:1").osis()).toEqual("1Kgs.1.1")
		expect(p.parse("1. စီၤပၤ 1:1").osis()).toEqual("1Kgs.1.1")
		expect(p.parse("1 စီၤပၤ 1:1").osis()).toEqual("1Kgs.1.1")
		expect(p.parse("၁ စီၤပၤ 1:1").osis()).toEqual("1Kgs.1.1")
		expect(p.parse("1Kgs 1:1").osis()).toEqual("1Kgs.1.1")
		p.include_apocrypha(false)
		expect(p.parse("လံာ်စီၤပၤအခီၣ်ထံးတဘ့ၣ် 1:1").osis()).toEqual("1Kgs.1.1")
		expect(p.parse("လံၥ်စီၤပၤအခီၣ်ထံးတဘ့ၣ် 1:1").osis()).toEqual("1Kgs.1.1")
		expect(p.parse("1. စီၤပၤ 1:1").osis()).toEqual("1Kgs.1.1")
		expect(p.parse("1 စီၤပၤ 1:1").osis()).toEqual("1Kgs.1.1")
		expect(p.parse("၁ စီၤပၤ 1:1").osis()).toEqual("1Kgs.1.1")
		expect(p.parse("1KGS 1:1").osis()).toEqual("1Kgs.1.1")
		;
      return true;
    });
  });

  describe("Localized book 2Chr (kar)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser();
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    it("should handle book: 2Chr (kar)", function() {
      
		expect(p.parse("လံာ်ကွဲးနီၣ်တၢ်ခံဘ့ၣ်တဘ့ၣ် 1:1").osis()).toEqual("2Chr.1.1")
		expect(p.parse("လံၥ်ကွဲးနီၣ်တၢ်ခံဘ့ၣ်တဘ့ၣ် 1:1").osis()).toEqual("2Chr.1.1")
		expect(p.parse("2. ကွဲးနီၣ်တၢ် 1:1").osis()).toEqual("2Chr.1.1")
		expect(p.parse("2 ကွဲးနီၣ်တၢ် 1:1").osis()).toEqual("2Chr.1.1")
		expect(p.parse("၂ ကွဲးနီၣ်တၢ် 1:1").osis()).toEqual("2Chr.1.1")
		expect(p.parse("2. ကွဲး 1:1").osis()).toEqual("2Chr.1.1")
		expect(p.parse("2 ကွဲး 1:1").osis()).toEqual("2Chr.1.1")
		expect(p.parse("၂ ကွဲး 1:1").osis()).toEqual("2Chr.1.1")
		expect(p.parse("2Chr 1:1").osis()).toEqual("2Chr.1.1")
		;
      return true;
    });
    return it("should handle non-Latin digits in book: 2Chr (kar)", function() {
      p.set_options({
        non_latin_digits_strategy: "replace"
      });
      
		expect(p.parse("လံာ်ကွဲးနီၣ်တၢ်ခံဘ့ၣ်တဘ့ၣ် 1:1").osis()).toEqual("2Chr.1.1")
		expect(p.parse("လံၥ်ကွဲးနီၣ်တၢ်ခံဘ့ၣ်တဘ့ၣ် 1:1").osis()).toEqual("2Chr.1.1")
		expect(p.parse("2. ကွဲးနီၣ်တၢ် 1:1").osis()).toEqual("2Chr.1.1")
		expect(p.parse("2 ကွဲးနီၣ်တၢ် 1:1").osis()).toEqual("2Chr.1.1")
		expect(p.parse("၂ ကွဲးနီၣ်တၢ် 1:1").osis()).toEqual("2Chr.1.1")
		expect(p.parse("2. ကွဲး 1:1").osis()).toEqual("2Chr.1.1")
		expect(p.parse("2 ကွဲး 1:1").osis()).toEqual("2Chr.1.1")
		expect(p.parse("၂ ကွဲး 1:1").osis()).toEqual("2Chr.1.1")
		expect(p.parse("2Chr 1:1").osis()).toEqual("2Chr.1.1")
		p.include_apocrypha(false)
		expect(p.parse("လံာ်ကွဲးနီၣ်တၢ်ခံဘ့ၣ်တဘ့ၣ် 1:1").osis()).toEqual("2Chr.1.1")
		expect(p.parse("လံၥ်ကွဲးနီၣ်တၢ်ခံဘ့ၣ်တဘ့ၣ် 1:1").osis()).toEqual("2Chr.1.1")
		expect(p.parse("2. ကွဲးနီၣ်တၢ် 1:1").osis()).toEqual("2Chr.1.1")
		expect(p.parse("2 ကွဲးနီၣ်တၢ် 1:1").osis()).toEqual("2Chr.1.1")
		expect(p.parse("၂ ကွဲးနီၣ်တၢ် 1:1").osis()).toEqual("2Chr.1.1")
		expect(p.parse("2. ကွဲး 1:1").osis()).toEqual("2Chr.1.1")
		expect(p.parse("2 ကွဲး 1:1").osis()).toEqual("2Chr.1.1")
		expect(p.parse("၂ ကွဲး 1:1").osis()).toEqual("2Chr.1.1")
		expect(p.parse("2CHR 1:1").osis()).toEqual("2Chr.1.1")
		;
      return true;
    });
  });

  describe("Localized book 1Chr (kar)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser();
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    it("should handle book: 1Chr (kar)", function() {
      
		expect(p.parse("လံာ်ကွဲးနီၣ်တၢ်အခီၣ်ထံးတဘ့ၣ် 1:1").osis()).toEqual("1Chr.1.1")
		expect(p.parse("လံၥ်ကွဲးနီၣ်တၢ်အခီၣ်ထံးတဘ့ၣ် 1:1").osis()).toEqual("1Chr.1.1")
		expect(p.parse("1. ကွဲးနီၣ်တၢ် 1:1").osis()).toEqual("1Chr.1.1")
		expect(p.parse("1 ကွဲးနီၣ်တၢ် 1:1").osis()).toEqual("1Chr.1.1")
		expect(p.parse("၁ ကွဲးနီၣ်တၢ် 1:1").osis()).toEqual("1Chr.1.1")
		expect(p.parse("1. ကွဲး 1:1").osis()).toEqual("1Chr.1.1")
		expect(p.parse("1 ကွဲး 1:1").osis()).toEqual("1Chr.1.1")
		expect(p.parse("၁ ကွဲး 1:1").osis()).toEqual("1Chr.1.1")
		expect(p.parse("1Chr 1:1").osis()).toEqual("1Chr.1.1")
		;
      return true;
    });
    return it("should handle non-Latin digits in book: 1Chr (kar)", function() {
      p.set_options({
        non_latin_digits_strategy: "replace"
      });
      
		expect(p.parse("လံာ်ကွဲးနီၣ်တၢ်အခီၣ်ထံးတဘ့ၣ် 1:1").osis()).toEqual("1Chr.1.1")
		expect(p.parse("လံၥ်ကွဲးနီၣ်တၢ်အခီၣ်ထံးတဘ့ၣ် 1:1").osis()).toEqual("1Chr.1.1")
		expect(p.parse("1. ကွဲးနီၣ်တၢ် 1:1").osis()).toEqual("1Chr.1.1")
		expect(p.parse("1 ကွဲးနီၣ်တၢ် 1:1").osis()).toEqual("1Chr.1.1")
		expect(p.parse("၁ ကွဲးနီၣ်တၢ် 1:1").osis()).toEqual("1Chr.1.1")
		expect(p.parse("1. ကွဲး 1:1").osis()).toEqual("1Chr.1.1")
		expect(p.parse("1 ကွဲး 1:1").osis()).toEqual("1Chr.1.1")
		expect(p.parse("၁ ကွဲး 1:1").osis()).toEqual("1Chr.1.1")
		expect(p.parse("1Chr 1:1").osis()).toEqual("1Chr.1.1")
		p.include_apocrypha(false)
		expect(p.parse("လံာ်ကွဲးနီၣ်တၢ်အခီၣ်ထံးတဘ့ၣ် 1:1").osis()).toEqual("1Chr.1.1")
		expect(p.parse("လံၥ်ကွဲးနီၣ်တၢ်အခီၣ်ထံးတဘ့ၣ် 1:1").osis()).toEqual("1Chr.1.1")
		expect(p.parse("1. ကွဲးနီၣ်တၢ် 1:1").osis()).toEqual("1Chr.1.1")
		expect(p.parse("1 ကွဲးနီၣ်တၢ် 1:1").osis()).toEqual("1Chr.1.1")
		expect(p.parse("၁ ကွဲးနီၣ်တၢ် 1:1").osis()).toEqual("1Chr.1.1")
		expect(p.parse("1. ကွဲး 1:1").osis()).toEqual("1Chr.1.1")
		expect(p.parse("1 ကွဲး 1:1").osis()).toEqual("1Chr.1.1")
		expect(p.parse("၁ ကွဲး 1:1").osis()).toEqual("1Chr.1.1")
		expect(p.parse("1CHR 1:1").osis()).toEqual("1Chr.1.1")
		;
      return true;
    });
  });

  describe("Localized book Ezra (kar)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser();
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    return it("should handle book: Ezra (kar)", function() {
      
		expect(p.parse("လံာ်စီၤဧ့စြၤ 1:1").osis()).toEqual("Ezra.1.1")
		expect(p.parse("လံၥ်ဧ့စြၤ 1:1").osis()).toEqual("Ezra.1.1")
		expect(p.parse("Ezra 1:1").osis()).toEqual("Ezra.1.1")
		expect(p.parse("ဧ့ 1:1").osis()).toEqual("Ezra.1.1")
		p.include_apocrypha(false)
		expect(p.parse("လံာ်စီၤဧ့စြၤ 1:1").osis()).toEqual("Ezra.1.1")
		expect(p.parse("လံၥ်ဧ့စြၤ 1:1").osis()).toEqual("Ezra.1.1")
		expect(p.parse("EZRA 1:1").osis()).toEqual("Ezra.1.1")
		expect(p.parse("ဧ့ 1:1").osis()).toEqual("Ezra.1.1")
		;
      return true;
    });
  });

  describe("Localized book Neh (kar)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser();
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    return it("should handle book: Neh (kar)", function() {
      
		expect(p.parse("လံာ်စီၤနဃ့မယၤ 1:1").osis()).toEqual("Neh.1.1")
		expect(p.parse("လံၥ်နဃ့မယၤ 1:1").osis()).toEqual("Neh.1.1")
		expect(p.parse("Neh 1:1").osis()).toEqual("Neh.1.1")
		expect(p.parse("ဃ့ 1:1").osis()).toEqual("Neh.1.1")
		p.include_apocrypha(false)
		expect(p.parse("လံာ်စီၤနဃ့မယၤ 1:1").osis()).toEqual("Neh.1.1")
		expect(p.parse("လံၥ်နဃ့မယၤ 1:1").osis()).toEqual("Neh.1.1")
		expect(p.parse("NEH 1:1").osis()).toEqual("Neh.1.1")
		expect(p.parse("ဃ့ 1:1").osis()).toEqual("Neh.1.1")
		;
      return true;
    });
  });

  describe("Localized book GkEsth (kar)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser();
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    return it("should handle book: GkEsth (kar)", function() {
      
		expect(p.parse("GkEsth 1:1").osis()).toEqual("GkEsth.1.1")
		;
      return true;
    });
  });

  describe("Localized book Esth (kar)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser();
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    return it("should handle book: Esth (kar)", function() {
      
		expect(p.parse("လံာ်နီၢ်အ့ၤစတၢ် 1:1").osis()).toEqual("Esth.1.1")
		expect(p.parse("လံၥ်နီၢ်အ့ၤစတၢ် 1:1").osis()).toEqual("Esth.1.1")
		expect(p.parse("Esth 1:1").osis()).toEqual("Esth.1.1")
		expect(p.parse("အ့ၤ 1:1").osis()).toEqual("Esth.1.1")
		p.include_apocrypha(false)
		expect(p.parse("လံာ်နီၢ်အ့ၤစတၢ် 1:1").osis()).toEqual("Esth.1.1")
		expect(p.parse("လံၥ်နီၢ်အ့ၤစတၢ် 1:1").osis()).toEqual("Esth.1.1")
		expect(p.parse("ESTH 1:1").osis()).toEqual("Esth.1.1")
		expect(p.parse("အ့ၤ 1:1").osis()).toEqual("Esth.1.1")
		;
      return true;
    });
  });

  describe("Localized book Job (kar)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser();
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    return it("should handle book: Job (kar)", function() {
      
		expect(p.parse("လံာ်စီၤယိၤဘး 1:1").osis()).toEqual("Job.1.1")
		expect(p.parse("လံၥ်ယိၤဘး 1:1").osis()).toEqual("Job.1.1")
		expect(p.parse("ယိၤဘး 1:1").osis()).toEqual("Job.1.1")
		expect(p.parse("Job 1:1").osis()).toEqual("Job.1.1")
		expect(p.parse("ဘး 1:1").osis()).toEqual("Job.1.1")
		p.include_apocrypha(false)
		expect(p.parse("လံာ်စီၤယိၤဘး 1:1").osis()).toEqual("Job.1.1")
		expect(p.parse("လံၥ်ယိၤဘး 1:1").osis()).toEqual("Job.1.1")
		expect(p.parse("ယိၤဘး 1:1").osis()).toEqual("Job.1.1")
		expect(p.parse("JOB 1:1").osis()).toEqual("Job.1.1")
		expect(p.parse("ဘး 1:1").osis()).toEqual("Job.1.1")
		;
      return true;
    });
  });

  describe("Localized book Ps (kar)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser();
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    return it("should handle book: Ps (kar)", function() {
      
		expect(p.parse("လံၥ်စံးထီၣ်ပတြၢၤ 1:1").osis()).toEqual("Ps.1.1")
		expect(p.parse("စံးထီၣ်ပတြၢၤ 1:1").osis()).toEqual("Ps.1.1")
		expect(p.parse("စံး 1:1").osis()).toEqual("Ps.1.1")
		expect(p.parse("Ps 1:1").osis()).toEqual("Ps.1.1")
		p.include_apocrypha(false)
		expect(p.parse("လံၥ်စံးထီၣ်ပတြၢၤ 1:1").osis()).toEqual("Ps.1.1")
		expect(p.parse("စံးထီၣ်ပတြၢၤ 1:1").osis()).toEqual("Ps.1.1")
		expect(p.parse("စံး 1:1").osis()).toEqual("Ps.1.1")
		expect(p.parse("PS 1:1").osis()).toEqual("Ps.1.1")
		;
      return true;
    });
  });

  describe("Localized book PrAzar (kar)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser();
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    return it("should handle book: PrAzar (kar)", function() {
      
		expect(p.parse("PrAzar 1:1").osis()).toEqual("PrAzar.1.1")
		;
      return true;
    });
  });

  describe("Localized book Prov (kar)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser();
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    return it("should handle book: Prov (kar)", function() {
      
		expect(p.parse("လံာ်တၢ်ကူၣ်သ့အတၢ်ကတိၤ 1:1").osis()).toEqual("Prov.1.1")
		expect(p.parse("လံၥ်တၢ်ကတိၤဒိ 1:1").osis()).toEqual("Prov.1.1")
		expect(p.parse("ကတိၤဒိ 1:1").osis()).toEqual("Prov.1.1")
		expect(p.parse("Prov 1:1").osis()).toEqual("Prov.1.1")
		expect(p.parse("ကတိၤ 1:1").osis()).toEqual("Prov.1.1")
		p.include_apocrypha(false)
		expect(p.parse("လံာ်တၢ်ကူၣ်သ့အတၢ်ကတိၤ 1:1").osis()).toEqual("Prov.1.1")
		expect(p.parse("လံၥ်တၢ်ကတိၤဒိ 1:1").osis()).toEqual("Prov.1.1")
		expect(p.parse("ကတိၤဒိ 1:1").osis()).toEqual("Prov.1.1")
		expect(p.parse("PROV 1:1").osis()).toEqual("Prov.1.1")
		expect(p.parse("ကတိၤ 1:1").osis()).toEqual("Prov.1.1")
		;
      return true;
    });
  });

  describe("Localized book Eccl (kar)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser();
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    return it("should handle book: Eccl (kar)", function() {
      
		expect(p.parse("လံာ်ပှၤစံၣ်တဲၤတဲလီၤတၢ် 1:1").osis()).toEqual("Eccl.1.1")
		expect(p.parse("လံၥ်ၦၤစံၣ်တဲၤတဲလီၤတၢ် 1:1").osis()).toEqual("Eccl.1.1")
		expect(p.parse("Eccl 1:1").osis()).toEqual("Eccl.1.1")
		expect(p.parse("စံၣ် 1:1").osis()).toEqual("Eccl.1.1")
		p.include_apocrypha(false)
		expect(p.parse("လံာ်ပှၤစံၣ်တဲၤတဲလီၤတၢ် 1:1").osis()).toEqual("Eccl.1.1")
		expect(p.parse("လံၥ်ၦၤစံၣ်တဲၤတဲလီၤတၢ် 1:1").osis()).toEqual("Eccl.1.1")
		expect(p.parse("ECCL 1:1").osis()).toEqual("Eccl.1.1")
		expect(p.parse("စံၣ် 1:1").osis()).toEqual("Eccl.1.1")
		;
      return true;
    });
  });

  describe("Localized book SgThree (kar)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser();
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    return it("should handle book: SgThree (kar)", function() {
      
		expect(p.parse("SgThree 1:1").osis()).toEqual("SgThree.1.1")
		;
      return true;
    });
  });

  describe("Localized book Song (kar)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser();
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    return it("should handle book: Song (kar)", function() {
      
		expect(p.parse("လံာ်တၢ်သးဝံၣ်တဖၣ်အတၢ်သးဝံၣ် 1:1").osis()).toEqual("Song.1.1")
		expect(p.parse("လံၥ်တၢ်သးဝံၣ်တဖၣ်အတၢ်သးဝံၣ် 1:1").osis()).toEqual("Song.1.1")
		expect(p.parse("Song 1:1").osis()).toEqual("Song.1.1")
		expect(p.parse("တၢ် 1:1").osis()).toEqual("Song.1.1")
		p.include_apocrypha(false)
		expect(p.parse("လံာ်တၢ်သးဝံၣ်တဖၣ်အတၢ်သးဝံၣ် 1:1").osis()).toEqual("Song.1.1")
		expect(p.parse("လံၥ်တၢ်သးဝံၣ်တဖၣ်အတၢ်သးဝံၣ် 1:1").osis()).toEqual("Song.1.1")
		expect(p.parse("SONG 1:1").osis()).toEqual("Song.1.1")
		expect(p.parse("တၢ် 1:1").osis()).toEqual("Song.1.1")
		;
      return true;
    });
  });

  describe("Localized book Jer (kar)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser();
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    return it("should handle book: Jer (kar)", function() {
      
		expect(p.parse("လံာ်ယံးရမံယၤ 1:1").osis()).toEqual("Jer.1.1")
		expect(p.parse("လံၥ်ယံးရမံယၤ 1:1").osis()).toEqual("Jer.1.1")
		expect(p.parse("ယံးရမံယၤ 1:1").osis()).toEqual("Jer.1.1")
		expect(p.parse("Jer 1:1").osis()).toEqual("Jer.1.1")
		expect(p.parse("ယံး 1:1").osis()).toEqual("Jer.1.1")
		p.include_apocrypha(false)
		expect(p.parse("လံာ်ယံးရမံယၤ 1:1").osis()).toEqual("Jer.1.1")
		expect(p.parse("လံၥ်ယံးရမံယၤ 1:1").osis()).toEqual("Jer.1.1")
		expect(p.parse("ယံးရမံယၤ 1:1").osis()).toEqual("Jer.1.1")
		expect(p.parse("JER 1:1").osis()).toEqual("Jer.1.1")
		expect(p.parse("ယံး 1:1").osis()).toEqual("Jer.1.1")
		;
      return true;
    });
  });

  describe("Localized book Ezek (kar)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser();
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    return it("should handle book: Ezek (kar)", function() {
      
		expect(p.parse("လံာ်ယဃ့းစက့လး 1:1").osis()).toEqual("Ezek.1.1")
		expect(p.parse("လံၥ်ယဃ့းစက့လး 1:1").osis()).toEqual("Ezek.1.1")
		expect(p.parse("ယဃ့းစက့လး 1:1").osis()).toEqual("Ezek.1.1")
		expect(p.parse("Ezek 1:1").osis()).toEqual("Ezek.1.1")
		expect(p.parse("ဃ့း 1:1").osis()).toEqual("Ezek.1.1")
		p.include_apocrypha(false)
		expect(p.parse("လံာ်ယဃ့းစက့လး 1:1").osis()).toEqual("Ezek.1.1")
		expect(p.parse("လံၥ်ယဃ့းစက့လး 1:1").osis()).toEqual("Ezek.1.1")
		expect(p.parse("ယဃ့းစက့လး 1:1").osis()).toEqual("Ezek.1.1")
		expect(p.parse("EZEK 1:1").osis()).toEqual("Ezek.1.1")
		expect(p.parse("ဃ့း 1:1").osis()).toEqual("Ezek.1.1")
		;
      return true;
    });
  });

  describe("Localized book Dan (kar)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser();
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    return it("should handle book: Dan (kar)", function() {
      
		expect(p.parse("လံာ်ဒၤနံးယ့လး 1:1").osis()).toEqual("Dan.1.1")
		expect(p.parse("လံၥ်ဒၤနံးယ့လး 1:1").osis()).toEqual("Dan.1.1")
		expect(p.parse("ဒၤနံးယ့လး 1:1").osis()).toEqual("Dan.1.1")
		expect(p.parse("Dan 1:1").osis()).toEqual("Dan.1.1")
		expect(p.parse("ဒၤ 1:1").osis()).toEqual("Dan.1.1")
		p.include_apocrypha(false)
		expect(p.parse("လံာ်ဒၤနံးယ့လး 1:1").osis()).toEqual("Dan.1.1")
		expect(p.parse("လံၥ်ဒၤနံးယ့လး 1:1").osis()).toEqual("Dan.1.1")
		expect(p.parse("ဒၤနံးယ့လး 1:1").osis()).toEqual("Dan.1.1")
		expect(p.parse("DAN 1:1").osis()).toEqual("Dan.1.1")
		expect(p.parse("ဒၤ 1:1").osis()).toEqual("Dan.1.1")
		;
      return true;
    });
  });

  describe("Localized book Hos (kar)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser();
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    return it("should handle book: Hos (kar)", function() {
      
		expect(p.parse("လံာ်ဟိၤၡ့ 1:1").osis()).toEqual("Hos.1.1")
		expect(p.parse("လံၥ်ဟိၤၡ့ 1:1").osis()).toEqual("Hos.1.1")
		expect(p.parse("ဟိၤၡ့ 1:1").osis()).toEqual("Hos.1.1")
		expect(p.parse("Hos 1:1").osis()).toEqual("Hos.1.1")
		expect(p.parse("ဟိၤ 1:1").osis()).toEqual("Hos.1.1")
		p.include_apocrypha(false)
		expect(p.parse("လံာ်ဟိၤၡ့ 1:1").osis()).toEqual("Hos.1.1")
		expect(p.parse("လံၥ်ဟိၤၡ့ 1:1").osis()).toEqual("Hos.1.1")
		expect(p.parse("ဟိၤၡ့ 1:1").osis()).toEqual("Hos.1.1")
		expect(p.parse("HOS 1:1").osis()).toEqual("Hos.1.1")
		expect(p.parse("ဟိၤ 1:1").osis()).toEqual("Hos.1.1")
		;
      return true;
    });
  });

  describe("Localized book Joel (kar)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser();
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    return it("should handle book: Joel (kar)", function() {
      
		expect(p.parse("လံာ်ယိၤအ့လး 1:1").osis()).toEqual("Joel.1.1")
		expect(p.parse("လံၥ်ယိၤအ့လး 1:1").osis()).toEqual("Joel.1.1")
		expect(p.parse("Joel 1:1").osis()).toEqual("Joel.1.1")
		expect(p.parse("အ့ 1:1").osis()).toEqual("Joel.1.1")
		p.include_apocrypha(false)
		expect(p.parse("လံာ်ယိၤအ့လး 1:1").osis()).toEqual("Joel.1.1")
		expect(p.parse("လံၥ်ယိၤအ့လး 1:1").osis()).toEqual("Joel.1.1")
		expect(p.parse("JOEL 1:1").osis()).toEqual("Joel.1.1")
		expect(p.parse("အ့ 1:1").osis()).toEqual("Joel.1.1")
		;
      return true;
    });
  });

  describe("Localized book Amos (kar)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser();
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    return it("should handle book: Amos (kar)", function() {
      
		expect(p.parse("လံာ်ဧၤမိၣ် 1:1").osis()).toEqual("Amos.1.1")
		expect(p.parse("လံၥ်ဧၤမိၣ် 1:1").osis()).toEqual("Amos.1.1")
		expect(p.parse("Amos 1:1").osis()).toEqual("Amos.1.1")
		expect(p.parse("ဧၤ 1:1").osis()).toEqual("Amos.1.1")
		p.include_apocrypha(false)
		expect(p.parse("လံာ်ဧၤမိၣ် 1:1").osis()).toEqual("Amos.1.1")
		expect(p.parse("လံၥ်ဧၤမိၣ် 1:1").osis()).toEqual("Amos.1.1")
		expect(p.parse("AMOS 1:1").osis()).toEqual("Amos.1.1")
		expect(p.parse("ဧၤ 1:1").osis()).toEqual("Amos.1.1")
		;
      return true;
    });
  });

  describe("Localized book Obad (kar)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser();
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    return it("should handle book: Obad (kar)", function() {
      
		expect(p.parse("လံာ်ဧိၤဘါဒယၤ 1:1").osis()).toEqual("Obad.1.1")
		expect(p.parse("လံၥ်ဧိၤဘါဒယၤ 1:1").osis()).toEqual("Obad.1.1")
		expect(p.parse("Obad 1:1").osis()).toEqual("Obad.1.1")
		expect(p.parse("ဧိၤ 1:1").osis()).toEqual("Obad.1.1")
		p.include_apocrypha(false)
		expect(p.parse("လံာ်ဧိၤဘါဒယၤ 1:1").osis()).toEqual("Obad.1.1")
		expect(p.parse("လံၥ်ဧိၤဘါဒယၤ 1:1").osis()).toEqual("Obad.1.1")
		expect(p.parse("OBAD 1:1").osis()).toEqual("Obad.1.1")
		expect(p.parse("ဧိၤ 1:1").osis()).toEqual("Obad.1.1")
		;
      return true;
    });
  });

  describe("Localized book Jonah (kar)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser();
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    return it("should handle book: Jonah (kar)", function() {
      
		expect(p.parse("လံာ်ယိၤနါ 1:1").osis()).toEqual("Jonah.1.1")
		expect(p.parse("လံၥ်ယိၤနါ 1:1").osis()).toEqual("Jonah.1.1")
		expect(p.parse("Jonah 1:1").osis()).toEqual("Jonah.1.1")
		expect(p.parse("နါ 1:1").osis()).toEqual("Jonah.1.1")
		p.include_apocrypha(false)
		expect(p.parse("လံာ်ယိၤနါ 1:1").osis()).toEqual("Jonah.1.1")
		expect(p.parse("လံၥ်ယိၤနါ 1:1").osis()).toEqual("Jonah.1.1")
		expect(p.parse("JONAH 1:1").osis()).toEqual("Jonah.1.1")
		expect(p.parse("နါ 1:1").osis()).toEqual("Jonah.1.1")
		;
      return true;
    });
  });

  describe("Localized book Mic (kar)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser();
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    return it("should handle book: Mic (kar)", function() {
      
		expect(p.parse("လံာ်မံကၤ 1:1").osis()).toEqual("Mic.1.1")
		expect(p.parse("လံၥ်မံကၤ 1:1").osis()).toEqual("Mic.1.1")
		expect(p.parse("Mic 1:1").osis()).toEqual("Mic.1.1")
		expect(p.parse("မံ 1:1").osis()).toEqual("Mic.1.1")
		p.include_apocrypha(false)
		expect(p.parse("လံာ်မံကၤ 1:1").osis()).toEqual("Mic.1.1")
		expect(p.parse("လံၥ်မံကၤ 1:1").osis()).toEqual("Mic.1.1")
		expect(p.parse("MIC 1:1").osis()).toEqual("Mic.1.1")
		expect(p.parse("မံ 1:1").osis()).toEqual("Mic.1.1")
		;
      return true;
    });
  });

  describe("Localized book Nah (kar)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser();
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    return it("should handle book: Nah (kar)", function() {
      
		expect(p.parse("လံာ်နၤဃူၣ် 1:1").osis()).toEqual("Nah.1.1")
		expect(p.parse("လံၥ်နၤဃူၣ် 1:1").osis()).toEqual("Nah.1.1")
		expect(p.parse("Nah 1:1").osis()).toEqual("Nah.1.1")
		expect(p.parse("နၤ 1:1").osis()).toEqual("Nah.1.1")
		p.include_apocrypha(false)
		expect(p.parse("လံာ်နၤဃူၣ် 1:1").osis()).toEqual("Nah.1.1")
		expect(p.parse("လံၥ်နၤဃူၣ် 1:1").osis()).toEqual("Nah.1.1")
		expect(p.parse("NAH 1:1").osis()).toEqual("Nah.1.1")
		expect(p.parse("နၤ 1:1").osis()).toEqual("Nah.1.1")
		;
      return true;
    });
  });

  describe("Localized book Hab (kar)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser();
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    return it("should handle book: Hab (kar)", function() {
      
		expect(p.parse("ဃံၥ်ဃဘးကူၥ် 1:1").osis()).toEqual("Hab.1.1")
		expect(p.parse("လံာ်ဃဘးကူာ် 1:1").osis()).toEqual("Hab.1.1")
		expect(p.parse("ဃဘးကူၥ် 1:1").osis()).toEqual("Hab.1.1")
		expect(p.parse("Hab 1:1").osis()).toEqual("Hab.1.1")
		expect(p.parse("ဃဘး 1:1").osis()).toEqual("Hab.1.1")
		p.include_apocrypha(false)
		expect(p.parse("ဃံၥ်ဃဘးကူၥ် 1:1").osis()).toEqual("Hab.1.1")
		expect(p.parse("လံာ်ဃဘးကူာ် 1:1").osis()).toEqual("Hab.1.1")
		expect(p.parse("ဃဘးကူၥ် 1:1").osis()).toEqual("Hab.1.1")
		expect(p.parse("HAB 1:1").osis()).toEqual("Hab.1.1")
		expect(p.parse("ဃဘး 1:1").osis()).toEqual("Hab.1.1")
		;
      return true;
    });
  });

  describe("Localized book Zeph (kar)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser();
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    return it("should handle book: Zeph (kar)", function() {
      
		expect(p.parse("လံာ်စဖါနယၤ 1:1").osis()).toEqual("Zeph.1.1")
		expect(p.parse("လံၥ်စဖါနယၤ 1:1").osis()).toEqual("Zeph.1.1")
		expect(p.parse("Zeph 1:1").osis()).toEqual("Zeph.1.1")
		expect(p.parse("ဖါ 1:1").osis()).toEqual("Zeph.1.1")
		p.include_apocrypha(false)
		expect(p.parse("လံာ်စဖါနယၤ 1:1").osis()).toEqual("Zeph.1.1")
		expect(p.parse("လံၥ်စဖါနယၤ 1:1").osis()).toEqual("Zeph.1.1")
		expect(p.parse("ZEPH 1:1").osis()).toEqual("Zeph.1.1")
		expect(p.parse("ဖါ 1:1").osis()).toEqual("Zeph.1.1")
		;
      return true;
    });
  });

  describe("Localized book Hag (kar)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser();
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    return it("should handle book: Hag (kar)", function() {
      
		expect(p.parse("လံာ်ဃးကဲ 1:1").osis()).toEqual("Hag.1.1")
		expect(p.parse("လံၥ်ဃးကဲ 1:1").osis()).toEqual("Hag.1.1")
		expect(p.parse("Hag 1:1").osis()).toEqual("Hag.1.1")
		expect(p.parse("ဃး 1:1").osis()).toEqual("Hag.1.1")
		p.include_apocrypha(false)
		expect(p.parse("လံာ်ဃးကဲ 1:1").osis()).toEqual("Hag.1.1")
		expect(p.parse("လံၥ်ဃးကဲ 1:1").osis()).toEqual("Hag.1.1")
		expect(p.parse("HAG 1:1").osis()).toEqual("Hag.1.1")
		expect(p.parse("ဃး 1:1").osis()).toEqual("Hag.1.1")
		;
      return true;
    });
  });

  describe("Localized book Zech (kar)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser();
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    return it("should handle book: Zech (kar)", function() {
      
		expect(p.parse("လံာ်စကၤရယၤ 1:1").osis()).toEqual("Zech.1.1")
		expect(p.parse("လံၥ်စကၤရယၤ 1:1").osis()).toEqual("Zech.1.1")
		expect(p.parse("စကၤရယၤ 1:1").osis()).toEqual("Zech.1.1")
		expect(p.parse("Zech 1:1").osis()).toEqual("Zech.1.1")
		expect(p.parse("ကၤ 1:1").osis()).toEqual("Zech.1.1")
		p.include_apocrypha(false)
		expect(p.parse("လံာ်စကၤရယၤ 1:1").osis()).toEqual("Zech.1.1")
		expect(p.parse("လံၥ်စကၤရယၤ 1:1").osis()).toEqual("Zech.1.1")
		expect(p.parse("စကၤရယၤ 1:1").osis()).toEqual("Zech.1.1")
		expect(p.parse("ZECH 1:1").osis()).toEqual("Zech.1.1")
		expect(p.parse("ကၤ 1:1").osis()).toEqual("Zech.1.1")
		;
      return true;
    });
  });

  describe("Localized book Mal (kar)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser();
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    return it("should handle book: Mal (kar)", function() {
      
		expect(p.parse("လံာ်မၤလကံ 1:1").osis()).toEqual("Mal.1.1")
		expect(p.parse("လံၥ်မၤလကံ 1:1").osis()).toEqual("Mal.1.1")
		expect(p.parse("Mal 1:1").osis()).toEqual("Mal.1.1")
		expect(p.parse("မၤ 1:1").osis()).toEqual("Mal.1.1")
		p.include_apocrypha(false)
		expect(p.parse("လံာ်မၤလကံ 1:1").osis()).toEqual("Mal.1.1")
		expect(p.parse("လံၥ်မၤလကံ 1:1").osis()).toEqual("Mal.1.1")
		expect(p.parse("MAL 1:1").osis()).toEqual("Mal.1.1")
		expect(p.parse("မၤ 1:1").osis()).toEqual("Mal.1.1")
		;
      return true;
    });
  });

  describe("Localized book Matt (kar)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser();
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    return it("should handle book: Matt (kar)", function() {
      
		expect(p.parse("လံာ်မးသဲ 1:1").osis()).toEqual("Matt.1.1")
		expect(p.parse("Matt 1:1").osis()).toEqual("Matt.1.1")
		expect(p.parse("မးသဲ 1:1").osis()).toEqual("Matt.1.1")
		expect(p.parse("မသဲ 1:1").osis()).toEqual("Matt.1.1")
		expect(p.parse("မး 1:1").osis()).toEqual("Matt.1.1")
		p.include_apocrypha(false)
		expect(p.parse("လံာ်မးသဲ 1:1").osis()).toEqual("Matt.1.1")
		expect(p.parse("MATT 1:1").osis()).toEqual("Matt.1.1")
		expect(p.parse("မးသဲ 1:1").osis()).toEqual("Matt.1.1")
		expect(p.parse("မသဲ 1:1").osis()).toEqual("Matt.1.1")
		expect(p.parse("မး 1:1").osis()).toEqual("Matt.1.1")
		;
      return true;
    });
  });

  describe("Localized book Mark (kar)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser();
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    return it("should handle book: Mark (kar)", function() {
      
		expect(p.parse("လံာ်မၢ်ကူး 1:1").osis()).toEqual("Mark.1.1")
		expect(p.parse("မၢ်ကူး 1:1").osis()).toEqual("Mark.1.1")
		expect(p.parse("Mark 1:1").osis()).toEqual("Mark.1.1")
		expect(p.parse("မၢ် 1:1").osis()).toEqual("Mark.1.1")
		p.include_apocrypha(false)
		expect(p.parse("လံာ်မၢ်ကူး 1:1").osis()).toEqual("Mark.1.1")
		expect(p.parse("မၢ်ကူး 1:1").osis()).toEqual("Mark.1.1")
		expect(p.parse("MARK 1:1").osis()).toEqual("Mark.1.1")
		expect(p.parse("မၢ် 1:1").osis()).toEqual("Mark.1.1")
		;
      return true;
    });
  });

  describe("Localized book Luke (kar)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser();
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    return it("should handle book: Luke (kar)", function() {
      
		expect(p.parse("လံာ်လူၤကၣ် 1:1").osis()).toEqual("Luke.1.1")
		expect(p.parse("လူၤကၣ် 1:1").osis()).toEqual("Luke.1.1")
		expect(p.parse("Luke 1:1").osis()).toEqual("Luke.1.1")
		expect(p.parse("လူၤ 1:1").osis()).toEqual("Luke.1.1")
		p.include_apocrypha(false)
		expect(p.parse("လံာ်လူၤကၣ် 1:1").osis()).toEqual("Luke.1.1")
		expect(p.parse("လူၤကၣ် 1:1").osis()).toEqual("Luke.1.1")
		expect(p.parse("LUKE 1:1").osis()).toEqual("Luke.1.1")
		expect(p.parse("လူၤ 1:1").osis()).toEqual("Luke.1.1")
		;
      return true;
    });
  });

  describe("Localized book 1John (kar)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser();
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    it("should handle book: 1John (kar)", function() {
      
		expect(p.parse("1. ယိၥ်ဟၣ်သိၣ်တၢ် 1:1").osis()).toEqual("1John.1.1")
		expect(p.parse("1 ယိၥ်ဟၣ်သိၣ်တၢ် 1:1").osis()).toEqual("1John.1.1")
		expect(p.parse("၁ ယိၥ်ဟၣ်သိၣ်တၢ် 1:1").osis()).toEqual("1John.1.1")
		expect(p.parse("1. ယိၤဟၣ် 1:1").osis()).toEqual("1John.1.1")
		expect(p.parse("1 ယိၤဟၣ် 1:1").osis()).toEqual("1John.1.1")
		expect(p.parse("၁ ယိၤဟၣ် 1:1").osis()).toEqual("1John.1.1")
		expect(p.parse("1. ယိၤ 1:1").osis()).toEqual("1John.1.1")
		expect(p.parse("1 ယိၤ 1:1").osis()).toEqual("1John.1.1")
		expect(p.parse("1John 1:1").osis()).toEqual("1John.1.1")
		expect(p.parse("၁ ယိၤ 1:1").osis()).toEqual("1John.1.1")
		;
      return true;
    });
    return it("should handle non-Latin digits in book: 1John (kar)", function() {
      p.set_options({
        non_latin_digits_strategy: "replace"
      });
      
		expect(p.parse("1. ယိၥ်ဟၣ်သိၣ်တၢ် 1:1").osis()).toEqual("1John.1.1")
		expect(p.parse("1 ယိၥ်ဟၣ်သိၣ်တၢ် 1:1").osis()).toEqual("1John.1.1")
		expect(p.parse("၁ ယိၥ်ဟၣ်သိၣ်တၢ် 1:1").osis()).toEqual("1John.1.1")
		expect(p.parse("1. ယိၤဟၣ် 1:1").osis()).toEqual("1John.1.1")
		expect(p.parse("1 ယိၤဟၣ် 1:1").osis()).toEqual("1John.1.1")
		expect(p.parse("၁ ယိၤဟၣ် 1:1").osis()).toEqual("1John.1.1")
		expect(p.parse("1. ယိၤ 1:1").osis()).toEqual("1John.1.1")
		expect(p.parse("1 ယိၤ 1:1").osis()).toEqual("1John.1.1")
		expect(p.parse("1John 1:1").osis()).toEqual("1John.1.1")
		expect(p.parse("၁ ယိၤ 1:1").osis()).toEqual("1John.1.1")
		p.include_apocrypha(false)
		expect(p.parse("1. ယိၥ်ဟၣ်သိၣ်တၢ် 1:1").osis()).toEqual("1John.1.1")
		expect(p.parse("1 ယိၥ်ဟၣ်သိၣ်တၢ် 1:1").osis()).toEqual("1John.1.1")
		expect(p.parse("၁ ယိၥ်ဟၣ်သိၣ်တၢ် 1:1").osis()).toEqual("1John.1.1")
		expect(p.parse("1. ယိၤဟၣ် 1:1").osis()).toEqual("1John.1.1")
		expect(p.parse("1 ယိၤဟၣ် 1:1").osis()).toEqual("1John.1.1")
		expect(p.parse("၁ ယိၤဟၣ် 1:1").osis()).toEqual("1John.1.1")
		expect(p.parse("1. ယိၤ 1:1").osis()).toEqual("1John.1.1")
		expect(p.parse("1 ယိၤ 1:1").osis()).toEqual("1John.1.1")
		expect(p.parse("1JOHN 1:1").osis()).toEqual("1John.1.1")
		expect(p.parse("၁ ယိၤ 1:1").osis()).toEqual("1John.1.1")
		;
      return true;
    });
  });

  describe("Localized book 2John (kar)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser();
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    it("should handle book: 2John (kar)", function() {
      
		expect(p.parse("2. ယိၥ်ဟၣ်သိၣ်တၢ် 1:1").osis()).toEqual("2John.1.1")
		expect(p.parse("2 ယိၥ်ဟၣ်သိၣ်တၢ် 1:1").osis()).toEqual("2John.1.1")
		expect(p.parse("၂ ယိၥ်ဟၣ်သိၣ်တၢ် 1:1").osis()).toEqual("2John.1.1")
		expect(p.parse("2. ယိၤဟၣ် 1:1").osis()).toEqual("2John.1.1")
		expect(p.parse("2 ယိၤဟၣ် 1:1").osis()).toEqual("2John.1.1")
		expect(p.parse("၂ ယိၤဟၣ် 1:1").osis()).toEqual("2John.1.1")
		expect(p.parse("2. ယိၤ 1:1").osis()).toEqual("2John.1.1")
		expect(p.parse("2 ယိၤ 1:1").osis()).toEqual("2John.1.1")
		expect(p.parse("2John 1:1").osis()).toEqual("2John.1.1")
		expect(p.parse("၂ ယိၤ 1:1").osis()).toEqual("2John.1.1")
		;
      return true;
    });
    return it("should handle non-Latin digits in book: 2John (kar)", function() {
      p.set_options({
        non_latin_digits_strategy: "replace"
      });
      
		expect(p.parse("2. ယိၥ်ဟၣ်သိၣ်တၢ် 1:1").osis()).toEqual("2John.1.1")
		expect(p.parse("2 ယိၥ်ဟၣ်သိၣ်တၢ် 1:1").osis()).toEqual("2John.1.1")
		expect(p.parse("၂ ယိၥ်ဟၣ်သိၣ်တၢ် 1:1").osis()).toEqual("2John.1.1")
		expect(p.parse("2. ယိၤဟၣ် 1:1").osis()).toEqual("2John.1.1")
		expect(p.parse("2 ယိၤဟၣ် 1:1").osis()).toEqual("2John.1.1")
		expect(p.parse("၂ ယိၤဟၣ် 1:1").osis()).toEqual("2John.1.1")
		expect(p.parse("2. ယိၤ 1:1").osis()).toEqual("2John.1.1")
		expect(p.parse("2 ယိၤ 1:1").osis()).toEqual("2John.1.1")
		expect(p.parse("2John 1:1").osis()).toEqual("2John.1.1")
		expect(p.parse("၂ ယိၤ 1:1").osis()).toEqual("2John.1.1")
		p.include_apocrypha(false)
		expect(p.parse("2. ယိၥ်ဟၣ်သိၣ်တၢ် 1:1").osis()).toEqual("2John.1.1")
		expect(p.parse("2 ယိၥ်ဟၣ်သိၣ်တၢ် 1:1").osis()).toEqual("2John.1.1")
		expect(p.parse("၂ ယိၥ်ဟၣ်သိၣ်တၢ် 1:1").osis()).toEqual("2John.1.1")
		expect(p.parse("2. ယိၤဟၣ် 1:1").osis()).toEqual("2John.1.1")
		expect(p.parse("2 ယိၤဟၣ် 1:1").osis()).toEqual("2John.1.1")
		expect(p.parse("၂ ယိၤဟၣ် 1:1").osis()).toEqual("2John.1.1")
		expect(p.parse("2. ယိၤ 1:1").osis()).toEqual("2John.1.1")
		expect(p.parse("2 ယိၤ 1:1").osis()).toEqual("2John.1.1")
		expect(p.parse("2JOHN 1:1").osis()).toEqual("2John.1.1")
		expect(p.parse("၂ ယိၤ 1:1").osis()).toEqual("2John.1.1")
		;
      return true;
    });
  });

  describe("Localized book 3John (kar)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser();
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    it("should handle book: 3John (kar)", function() {
      
		expect(p.parse("3. ယိၤဟၣ်သိၣ်တၢ် 1:1").osis()).toEqual("3John.1.1")
		expect(p.parse("3 ယိၤဟၣ်သိၣ်တၢ် 1:1").osis()).toEqual("3John.1.1")
		expect(p.parse("၃ ယိၤဟၣ်သိၣ်တၢ် 1:1").osis()).toEqual("3John.1.1")
		expect(p.parse("3. ယိၤဟၣ် 1:1").osis()).toEqual("3John.1.1")
		expect(p.parse("3 ယိၤဟၣ် 1:1").osis()).toEqual("3John.1.1")
		expect(p.parse("၃ ယိၤဟၣ် 1:1").osis()).toEqual("3John.1.1")
		expect(p.parse("3. ယိၤ 1:1").osis()).toEqual("3John.1.1")
		expect(p.parse("3 ယိၤ 1:1").osis()).toEqual("3John.1.1")
		expect(p.parse("3John 1:1").osis()).toEqual("3John.1.1")
		expect(p.parse("၃ ယိၤ 1:1").osis()).toEqual("3John.1.1")
		;
      return true;
    });
    return it("should handle non-Latin digits in book: 3John (kar)", function() {
      p.set_options({
        non_latin_digits_strategy: "replace"
      });
      
		expect(p.parse("3. ယိၤဟၣ်သိၣ်တၢ် 1:1").osis()).toEqual("3John.1.1")
		expect(p.parse("3 ယိၤဟၣ်သိၣ်တၢ် 1:1").osis()).toEqual("3John.1.1")
		expect(p.parse("၃ ယိၤဟၣ်သိၣ်တၢ် 1:1").osis()).toEqual("3John.1.1")
		expect(p.parse("3. ယိၤဟၣ် 1:1").osis()).toEqual("3John.1.1")
		expect(p.parse("3 ယိၤဟၣ် 1:1").osis()).toEqual("3John.1.1")
		expect(p.parse("၃ ယိၤဟၣ် 1:1").osis()).toEqual("3John.1.1")
		expect(p.parse("3. ယိၤ 1:1").osis()).toEqual("3John.1.1")
		expect(p.parse("3 ယိၤ 1:1").osis()).toEqual("3John.1.1")
		expect(p.parse("3John 1:1").osis()).toEqual("3John.1.1")
		expect(p.parse("၃ ယိၤ 1:1").osis()).toEqual("3John.1.1")
		p.include_apocrypha(false)
		expect(p.parse("3. ယိၤဟၣ်သိၣ်တၢ် 1:1").osis()).toEqual("3John.1.1")
		expect(p.parse("3 ယိၤဟၣ်သိၣ်တၢ် 1:1").osis()).toEqual("3John.1.1")
		expect(p.parse("၃ ယိၤဟၣ်သိၣ်တၢ် 1:1").osis()).toEqual("3John.1.1")
		expect(p.parse("3. ယိၤဟၣ် 1:1").osis()).toEqual("3John.1.1")
		expect(p.parse("3 ယိၤဟၣ် 1:1").osis()).toEqual("3John.1.1")
		expect(p.parse("၃ ယိၤဟၣ် 1:1").osis()).toEqual("3John.1.1")
		expect(p.parse("3. ယိၤ 1:1").osis()).toEqual("3John.1.1")
		expect(p.parse("3 ယိၤ 1:1").osis()).toEqual("3John.1.1")
		expect(p.parse("3JOHN 1:1").osis()).toEqual("3John.1.1")
		expect(p.parse("၃ ယိၤ 1:1").osis()).toEqual("3John.1.1")
		;
      return true;
    });
  });

  describe("Localized book John (kar)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser();
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    return it("should handle book: John (kar)", function() {
      
		expect(p.parse("လံာ်ယိၤဟၣ် 1:1").osis()).toEqual("John.1.1")
		expect(p.parse("ယိၤဟၣ် 1:1").osis()).toEqual("John.1.1")
		expect(p.parse("John 1:1").osis()).toEqual("John.1.1")
		expect(p.parse("ယိၤ 1:1").osis()).toEqual("John.1.1")
		p.include_apocrypha(false)
		expect(p.parse("လံာ်ယိၤဟၣ် 1:1").osis()).toEqual("John.1.1")
		expect(p.parse("ယိၤဟၣ် 1:1").osis()).toEqual("John.1.1")
		expect(p.parse("JOHN 1:1").osis()).toEqual("John.1.1")
		expect(p.parse("ယိၤ 1:1").osis()).toEqual("John.1.1")
		;
      return true;
    });
  });

  describe("Localized book Acts (kar)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser();
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    return it("should handle book: Acts (kar)", function() {
      
		expect(p.parse("တၢ်မၢဖိမၤတၢ် 1:1").osis()).toEqual("Acts.1.1")
		expect(p.parse("မၤတၢ် 1:1").osis()).toEqual("Acts.1.1")
		expect(p.parse("Acts 1:1").osis()).toEqual("Acts.1.1")
		p.include_apocrypha(false)
		expect(p.parse("တၢ်မၢဖိမၤတၢ် 1:1").osis()).toEqual("Acts.1.1")
		expect(p.parse("မၤတၢ် 1:1").osis()).toEqual("Acts.1.1")
		expect(p.parse("ACTS 1:1").osis()).toEqual("Acts.1.1")
		;
      return true;
    });
  });

  describe("Localized book Rom (kar)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser();
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    return it("should handle book: Rom (kar)", function() {
      
		expect(p.parse("ရိမ့ၤ 1:1").osis()).toEqual("Rom.1.1")
		expect(p.parse("Rom 1:1").osis()).toEqual("Rom.1.1")
		expect(p.parse("ရိ 1:1").osis()).toEqual("Rom.1.1")
		p.include_apocrypha(false)
		expect(p.parse("ရိမ့ၤ 1:1").osis()).toEqual("Rom.1.1")
		expect(p.parse("ROM 1:1").osis()).toEqual("Rom.1.1")
		expect(p.parse("ရိ 1:1").osis()).toEqual("Rom.1.1")
		;
      return true;
    });
  });

  describe("Localized book 2Cor (kar)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser();
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    it("should handle book: 2Cor (kar)", function() {
      
		expect(p.parse("2. ကရံၣ်သူး 1:1").osis()).toEqual("2Cor.1.1")
		expect(p.parse("2 ကရံၣ်သူး 1:1").osis()).toEqual("2Cor.1.1")
		expect(p.parse("၂ ကရံၣ်သူး 1:1").osis()).toEqual("2Cor.1.1")
		expect(p.parse("2. ကရံၣ် 1:1").osis()).toEqual("2Cor.1.1")
		expect(p.parse("2 ကရံၣ် 1:1").osis()).toEqual("2Cor.1.1")
		expect(p.parse("၂ ကရံၣ် 1:1").osis()).toEqual("2Cor.1.1")
		expect(p.parse("2Cor 1:1").osis()).toEqual("2Cor.1.1")
		;
      return true;
    });
    return it("should handle non-Latin digits in book: 2Cor (kar)", function() {
      p.set_options({
        non_latin_digits_strategy: "replace"
      });
      
		expect(p.parse("2. ကရံၣ်သူး 1:1").osis()).toEqual("2Cor.1.1")
		expect(p.parse("2 ကရံၣ်သူး 1:1").osis()).toEqual("2Cor.1.1")
		expect(p.parse("၂ ကရံၣ်သူး 1:1").osis()).toEqual("2Cor.1.1")
		expect(p.parse("2. ကရံၣ် 1:1").osis()).toEqual("2Cor.1.1")
		expect(p.parse("2 ကရံၣ် 1:1").osis()).toEqual("2Cor.1.1")
		expect(p.parse("၂ ကရံၣ် 1:1").osis()).toEqual("2Cor.1.1")
		expect(p.parse("2Cor 1:1").osis()).toEqual("2Cor.1.1")
		p.include_apocrypha(false)
		expect(p.parse("2. ကရံၣ်သူး 1:1").osis()).toEqual("2Cor.1.1")
		expect(p.parse("2 ကရံၣ်သူး 1:1").osis()).toEqual("2Cor.1.1")
		expect(p.parse("၂ ကရံၣ်သူး 1:1").osis()).toEqual("2Cor.1.1")
		expect(p.parse("2. ကရံၣ် 1:1").osis()).toEqual("2Cor.1.1")
		expect(p.parse("2 ကရံၣ် 1:1").osis()).toEqual("2Cor.1.1")
		expect(p.parse("၂ ကရံၣ် 1:1").osis()).toEqual("2Cor.1.1")
		expect(p.parse("2COR 1:1").osis()).toEqual("2Cor.1.1")
		;
      return true;
    });
  });

  describe("Localized book 1Cor (kar)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser();
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    it("should handle book: 1Cor (kar)", function() {
      
		expect(p.parse("1. ကရံၣ်သူး 1:1").osis()).toEqual("1Cor.1.1")
		expect(p.parse("1 ကရံၣ်သူး 1:1").osis()).toEqual("1Cor.1.1")
		expect(p.parse("၁ ကရံၣ်သူး 1:1").osis()).toEqual("1Cor.1.1")
		expect(p.parse("1. ကရံၣ် 1:1").osis()).toEqual("1Cor.1.1")
		expect(p.parse("1 ကရံၣ် 1:1").osis()).toEqual("1Cor.1.1")
		expect(p.parse("၁ ကရံၣ် 1:1").osis()).toEqual("1Cor.1.1")
		expect(p.parse("1Cor 1:1").osis()).toEqual("1Cor.1.1")
		;
      return true;
    });
    return it("should handle non-Latin digits in book: 1Cor (kar)", function() {
      p.set_options({
        non_latin_digits_strategy: "replace"
      });
      
		expect(p.parse("1. ကရံၣ်သူး 1:1").osis()).toEqual("1Cor.1.1")
		expect(p.parse("1 ကရံၣ်သူး 1:1").osis()).toEqual("1Cor.1.1")
		expect(p.parse("၁ ကရံၣ်သူး 1:1").osis()).toEqual("1Cor.1.1")
		expect(p.parse("1. ကရံၣ် 1:1").osis()).toEqual("1Cor.1.1")
		expect(p.parse("1 ကရံၣ် 1:1").osis()).toEqual("1Cor.1.1")
		expect(p.parse("၁ ကရံၣ် 1:1").osis()).toEqual("1Cor.1.1")
		expect(p.parse("1Cor 1:1").osis()).toEqual("1Cor.1.1")
		p.include_apocrypha(false)
		expect(p.parse("1. ကရံၣ်သူး 1:1").osis()).toEqual("1Cor.1.1")
		expect(p.parse("1 ကရံၣ်သူး 1:1").osis()).toEqual("1Cor.1.1")
		expect(p.parse("၁ ကရံၣ်သူး 1:1").osis()).toEqual("1Cor.1.1")
		expect(p.parse("1. ကရံၣ် 1:1").osis()).toEqual("1Cor.1.1")
		expect(p.parse("1 ကရံၣ် 1:1").osis()).toEqual("1Cor.1.1")
		expect(p.parse("၁ ကရံၣ် 1:1").osis()).toEqual("1Cor.1.1")
		expect(p.parse("1COR 1:1").osis()).toEqual("1Cor.1.1")
		;
      return true;
    });
  });

  describe("Localized book Gal (kar)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser();
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    return it("should handle book: Gal (kar)", function() {
      
		expect(p.parse("ကလၤတံ 1:1").osis()).toEqual("Gal.1.1")
		expect(p.parse("Gal 1:1").osis()).toEqual("Gal.1.1")
		expect(p.parse("ကလၤ 1:1").osis()).toEqual("Gal.1.1")
		p.include_apocrypha(false)
		expect(p.parse("ကလၤတံ 1:1").osis()).toEqual("Gal.1.1")
		expect(p.parse("GAL 1:1").osis()).toEqual("Gal.1.1")
		expect(p.parse("ကလၤ 1:1").osis()).toEqual("Gal.1.1")
		;
      return true;
    });
  });

  describe("Localized book Eph (kar)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser();
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    return it("should handle book: Eph (kar)", function() {
      
		expect(p.parse("အ့းဖ့းစူး 1:1").osis()).toEqual("Eph.1.1")
		expect(p.parse("Eph 1:1").osis()).toEqual("Eph.1.1")
		expect(p.parse("အ့း 1:1").osis()).toEqual("Eph.1.1")
		p.include_apocrypha(false)
		expect(p.parse("အ့းဖ့းစူး 1:1").osis()).toEqual("Eph.1.1")
		expect(p.parse("EPH 1:1").osis()).toEqual("Eph.1.1")
		expect(p.parse("အ့း 1:1").osis()).toEqual("Eph.1.1")
		;
      return true;
    });
  });

  describe("Localized book Phil (kar)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser();
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    return it("should handle book: Phil (kar)", function() {
      
		expect(p.parse("ဖံလံးပံၤ 1:1").osis()).toEqual("Phil.1.1")
		expect(p.parse("ဖံလံး 1:1").osis()).toEqual("Phil.1.1")
		expect(p.parse("Phil 1:1").osis()).toEqual("Phil.1.1")
		p.include_apocrypha(false)
		expect(p.parse("ဖံလံးပံၤ 1:1").osis()).toEqual("Phil.1.1")
		expect(p.parse("ဖံလံး 1:1").osis()).toEqual("Phil.1.1")
		expect(p.parse("PHIL 1:1").osis()).toEqual("Phil.1.1")
		;
      return true;
    });
  });

  describe("Localized book Col (kar)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser();
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    return it("should handle book: Col (kar)", function() {
      
		expect(p.parse("ကလီးစဲ 1:1").osis()).toEqual("Col.1.1")
		expect(p.parse("ကလီး 1:1").osis()).toEqual("Col.1.1")
		expect(p.parse("Col 1:1").osis()).toEqual("Col.1.1")
		p.include_apocrypha(false)
		expect(p.parse("ကလီးစဲ 1:1").osis()).toEqual("Col.1.1")
		expect(p.parse("ကလီး 1:1").osis()).toEqual("Col.1.1")
		expect(p.parse("COL 1:1").osis()).toEqual("Col.1.1")
		;
      return true;
    });
  });

  describe("Localized book 2Thess (kar)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser();
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    it("should handle book: 2Thess (kar)", function() {
      
		expect(p.parse("2. သ့းစၤလနံ 1:1").osis()).toEqual("2Thess.1.1")
		expect(p.parse("2 သ့းစၤလနံ 1:1").osis()).toEqual("2Thess.1.1")
		expect(p.parse("၂ သ့းစၤလနံ 1:1").osis()).toEqual("2Thess.1.1")
		expect(p.parse("2. သ့း 1:1").osis()).toEqual("2Thess.1.1")
		expect(p.parse("2Thess 1:1").osis()).toEqual("2Thess.1.1")
		expect(p.parse("2 သ့း 1:1").osis()).toEqual("2Thess.1.1")
		expect(p.parse("၂ သ့း 1:1").osis()).toEqual("2Thess.1.1")
		;
      return true;
    });
    return it("should handle non-Latin digits in book: 2Thess (kar)", function() {
      p.set_options({
        non_latin_digits_strategy: "replace"
      });
      
		expect(p.parse("2. သ့းစၤလနံ 1:1").osis()).toEqual("2Thess.1.1")
		expect(p.parse("2 သ့းစၤလနံ 1:1").osis()).toEqual("2Thess.1.1")
		expect(p.parse("၂ သ့းစၤလနံ 1:1").osis()).toEqual("2Thess.1.1")
		expect(p.parse("2. သ့း 1:1").osis()).toEqual("2Thess.1.1")
		expect(p.parse("2Thess 1:1").osis()).toEqual("2Thess.1.1")
		expect(p.parse("2 သ့း 1:1").osis()).toEqual("2Thess.1.1")
		expect(p.parse("၂ သ့း 1:1").osis()).toEqual("2Thess.1.1")
		p.include_apocrypha(false)
		expect(p.parse("2. သ့းစၤလနံ 1:1").osis()).toEqual("2Thess.1.1")
		expect(p.parse("2 သ့းစၤလနံ 1:1").osis()).toEqual("2Thess.1.1")
		expect(p.parse("၂ သ့းစၤလနံ 1:1").osis()).toEqual("2Thess.1.1")
		expect(p.parse("2. သ့း 1:1").osis()).toEqual("2Thess.1.1")
		expect(p.parse("2THESS 1:1").osis()).toEqual("2Thess.1.1")
		expect(p.parse("2 သ့း 1:1").osis()).toEqual("2Thess.1.1")
		expect(p.parse("၂ သ့း 1:1").osis()).toEqual("2Thess.1.1")
		;
      return true;
    });
  });

  describe("Localized book 1Thess (kar)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser();
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    it("should handle book: 1Thess (kar)", function() {
      
		expect(p.parse("1. သ့းစၤလနံ 1:1").osis()).toEqual("1Thess.1.1")
		expect(p.parse("1 သ့းစၤလနံ 1:1").osis()).toEqual("1Thess.1.1")
		expect(p.parse("၁ သ့းစၤလနံ 1:1").osis()).toEqual("1Thess.1.1")
		expect(p.parse("1. သ့း 1:1").osis()).toEqual("1Thess.1.1")
		expect(p.parse("1Thess 1:1").osis()).toEqual("1Thess.1.1")
		expect(p.parse("1 သ့း 1:1").osis()).toEqual("1Thess.1.1")
		expect(p.parse("၁ သ့း 1:1").osis()).toEqual("1Thess.1.1")
		;
      return true;
    });
    return it("should handle non-Latin digits in book: 1Thess (kar)", function() {
      p.set_options({
        non_latin_digits_strategy: "replace"
      });
      
		expect(p.parse("1. သ့းစၤလနံ 1:1").osis()).toEqual("1Thess.1.1")
		expect(p.parse("1 သ့းစၤလနံ 1:1").osis()).toEqual("1Thess.1.1")
		expect(p.parse("၁ သ့းစၤလနံ 1:1").osis()).toEqual("1Thess.1.1")
		expect(p.parse("1. သ့း 1:1").osis()).toEqual("1Thess.1.1")
		expect(p.parse("1Thess 1:1").osis()).toEqual("1Thess.1.1")
		expect(p.parse("1 သ့း 1:1").osis()).toEqual("1Thess.1.1")
		expect(p.parse("၁ သ့း 1:1").osis()).toEqual("1Thess.1.1")
		p.include_apocrypha(false)
		expect(p.parse("1. သ့းစၤလနံ 1:1").osis()).toEqual("1Thess.1.1")
		expect(p.parse("1 သ့းစၤလနံ 1:1").osis()).toEqual("1Thess.1.1")
		expect(p.parse("၁ သ့းစၤလနံ 1:1").osis()).toEqual("1Thess.1.1")
		expect(p.parse("1. သ့း 1:1").osis()).toEqual("1Thess.1.1")
		expect(p.parse("1THESS 1:1").osis()).toEqual("1Thess.1.1")
		expect(p.parse("1 သ့း 1:1").osis()).toEqual("1Thess.1.1")
		expect(p.parse("၁ သ့း 1:1").osis()).toEqual("1Thess.1.1")
		;
      return true;
    });
  });

  describe("Localized book 2Tim (kar)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser();
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    it("should handle book: 2Tim (kar)", function() {
      
		expect(p.parse("2. တံၤမသ့း 1:1").osis()).toEqual("2Tim.1.1")
		expect(p.parse("2 တံၤမသ့း 1:1").osis()).toEqual("2Tim.1.1")
		expect(p.parse("၂ တံၤမသ့း 1:1").osis()).toEqual("2Tim.1.1")
		expect(p.parse("2. တံၤ 1:1").osis()).toEqual("2Tim.1.1")
		expect(p.parse("2 တံၤ 1:1").osis()).toEqual("2Tim.1.1")
		expect(p.parse("၂ တံၤ 1:1").osis()).toEqual("2Tim.1.1")
		expect(p.parse("2Tim 1:1").osis()).toEqual("2Tim.1.1")
		;
      return true;
    });
    return it("should handle non-Latin digits in book: 2Tim (kar)", function() {
      p.set_options({
        non_latin_digits_strategy: "replace"
      });
      
		expect(p.parse("2. တံၤမသ့း 1:1").osis()).toEqual("2Tim.1.1")
		expect(p.parse("2 တံၤမသ့း 1:1").osis()).toEqual("2Tim.1.1")
		expect(p.parse("၂ တံၤမသ့း 1:1").osis()).toEqual("2Tim.1.1")
		expect(p.parse("2. တံၤ 1:1").osis()).toEqual("2Tim.1.1")
		expect(p.parse("2 တံၤ 1:1").osis()).toEqual("2Tim.1.1")
		expect(p.parse("၂ တံၤ 1:1").osis()).toEqual("2Tim.1.1")
		expect(p.parse("2Tim 1:1").osis()).toEqual("2Tim.1.1")
		p.include_apocrypha(false)
		expect(p.parse("2. တံၤမသ့း 1:1").osis()).toEqual("2Tim.1.1")
		expect(p.parse("2 တံၤမသ့း 1:1").osis()).toEqual("2Tim.1.1")
		expect(p.parse("၂ တံၤမသ့း 1:1").osis()).toEqual("2Tim.1.1")
		expect(p.parse("2. တံၤ 1:1").osis()).toEqual("2Tim.1.1")
		expect(p.parse("2 တံၤ 1:1").osis()).toEqual("2Tim.1.1")
		expect(p.parse("၂ တံၤ 1:1").osis()).toEqual("2Tim.1.1")
		expect(p.parse("2TIM 1:1").osis()).toEqual("2Tim.1.1")
		;
      return true;
    });
  });

  describe("Localized book 1Tim (kar)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser();
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    it("should handle book: 1Tim (kar)", function() {
      
		expect(p.parse("1. တံၤမသ့း 1:1").osis()).toEqual("1Tim.1.1")
		expect(p.parse("1 တံၤမသ့း 1:1").osis()).toEqual("1Tim.1.1")
		expect(p.parse("၁ တံၤမသ့း 1:1").osis()).toEqual("1Tim.1.1")
		expect(p.parse("1. တံၤ 1:1").osis()).toEqual("1Tim.1.1")
		expect(p.parse("1 တံၤ 1:1").osis()).toEqual("1Tim.1.1")
		expect(p.parse("၁ တံၤ 1:1").osis()).toEqual("1Tim.1.1")
		expect(p.parse("1Tim 1:1").osis()).toEqual("1Tim.1.1")
		;
      return true;
    });
    return it("should handle non-Latin digits in book: 1Tim (kar)", function() {
      p.set_options({
        non_latin_digits_strategy: "replace"
      });
      
		expect(p.parse("1. တံၤမသ့း 1:1").osis()).toEqual("1Tim.1.1")
		expect(p.parse("1 တံၤမသ့း 1:1").osis()).toEqual("1Tim.1.1")
		expect(p.parse("၁ တံၤမသ့း 1:1").osis()).toEqual("1Tim.1.1")
		expect(p.parse("1. တံၤ 1:1").osis()).toEqual("1Tim.1.1")
		expect(p.parse("1 တံၤ 1:1").osis()).toEqual("1Tim.1.1")
		expect(p.parse("၁ တံၤ 1:1").osis()).toEqual("1Tim.1.1")
		expect(p.parse("1Tim 1:1").osis()).toEqual("1Tim.1.1")
		p.include_apocrypha(false)
		expect(p.parse("1. တံၤမသ့း 1:1").osis()).toEqual("1Tim.1.1")
		expect(p.parse("1 တံၤမသ့း 1:1").osis()).toEqual("1Tim.1.1")
		expect(p.parse("၁ တံၤမသ့း 1:1").osis()).toEqual("1Tim.1.1")
		expect(p.parse("1. တံၤ 1:1").osis()).toEqual("1Tim.1.1")
		expect(p.parse("1 တံၤ 1:1").osis()).toEqual("1Tim.1.1")
		expect(p.parse("၁ တံၤ 1:1").osis()).toEqual("1Tim.1.1")
		expect(p.parse("1TIM 1:1").osis()).toEqual("1Tim.1.1")
		;
      return true;
    });
  });

  describe("Localized book Titus (kar)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser();
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    return it("should handle book: Titus (kar)", function() {
      
		expect(p.parse("Titus 1:1").osis()).toEqual("Titus.1.1")
		expect(p.parse("တံတူး 1:1").osis()).toEqual("Titus.1.1")
		expect(p.parse("တံ 1:1").osis()).toEqual("Titus.1.1")
		p.include_apocrypha(false)
		expect(p.parse("TITUS 1:1").osis()).toEqual("Titus.1.1")
		expect(p.parse("တံတူး 1:1").osis()).toEqual("Titus.1.1")
		expect(p.parse("တံ 1:1").osis()).toEqual("Titus.1.1")
		;
      return true;
    });
  });

  describe("Localized book Phlm (kar)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser();
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    return it("should handle book: Phlm (kar)", function() {
      
		expect(p.parse("ဖံၤလ့မိၣ် 1:1").osis()).toEqual("Phlm.1.1")
		expect(p.parse("Phlm 1:1").osis()).toEqual("Phlm.1.1")
		expect(p.parse("ဖံၤ 1:1").osis()).toEqual("Phlm.1.1")
		p.include_apocrypha(false)
		expect(p.parse("ဖံၤလ့မိၣ် 1:1").osis()).toEqual("Phlm.1.1")
		expect(p.parse("PHLM 1:1").osis()).toEqual("Phlm.1.1")
		expect(p.parse("ဖံၤ 1:1").osis()).toEqual("Phlm.1.1")
		;
      return true;
    });
  });

  describe("Localized book Heb (kar)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser();
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    return it("should handle book: Heb (kar)", function() {
      
		expect(p.parse("ဧ့ၤဘြံၤ 1:1").osis()).toEqual("Heb.1.1")
		expect(p.parse("Heb 1:1").osis()).toEqual("Heb.1.1")
		expect(p.parse("ဧ့ၤ 1:1").osis()).toEqual("Heb.1.1")
		p.include_apocrypha(false)
		expect(p.parse("ဧ့ၤဘြံၤ 1:1").osis()).toEqual("Heb.1.1")
		expect(p.parse("HEB 1:1").osis()).toEqual("Heb.1.1")
		expect(p.parse("ဧ့ၤ 1:1").osis()).toEqual("Heb.1.1")
		;
      return true;
    });
  });

  describe("Localized book Jas (kar)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser();
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    return it("should handle book: Jas (kar)", function() {
      
		expect(p.parse("ယၤကိာ် 1:1").osis()).toEqual("Jas.1.1")
		expect(p.parse("ယၤကိၥ် 1:1").osis()).toEqual("Jas.1.1")
		expect(p.parse("Jas 1:1").osis()).toEqual("Jas.1.1")
		expect(p.parse("ယၤ 1:1").osis()).toEqual("Jas.1.1")
		p.include_apocrypha(false)
		expect(p.parse("ယၤကိာ် 1:1").osis()).toEqual("Jas.1.1")
		expect(p.parse("ယၤကိၥ် 1:1").osis()).toEqual("Jas.1.1")
		expect(p.parse("JAS 1:1").osis()).toEqual("Jas.1.1")
		expect(p.parse("ယၤ 1:1").osis()).toEqual("Jas.1.1")
		;
      return true;
    });
  });

  describe("Localized book 2Pet (kar)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser();
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    it("should handle book: 2Pet (kar)", function() {
      
		expect(p.parse("2. ပ့းတရူး 1:1").osis()).toEqual("2Pet.1.1")
		expect(p.parse("2 ပ့းတရူး 1:1").osis()).toEqual("2Pet.1.1")
		expect(p.parse("၂ ပ့းတရူး 1:1").osis()).toEqual("2Pet.1.1")
		expect(p.parse("2. ပ့း 1:1").osis()).toEqual("2Pet.1.1")
		expect(p.parse("2 ပ့း 1:1").osis()).toEqual("2Pet.1.1")
		expect(p.parse("၂ ပ့း 1:1").osis()).toEqual("2Pet.1.1")
		expect(p.parse("2Pet 1:1").osis()).toEqual("2Pet.1.1")
		;
      return true;
    });
    return it("should handle non-Latin digits in book: 2Pet (kar)", function() {
      p.set_options({
        non_latin_digits_strategy: "replace"
      });
      
		expect(p.parse("2. ပ့းတရူး 1:1").osis()).toEqual("2Pet.1.1")
		expect(p.parse("2 ပ့းတရူး 1:1").osis()).toEqual("2Pet.1.1")
		expect(p.parse("၂ ပ့းတရူး 1:1").osis()).toEqual("2Pet.1.1")
		expect(p.parse("2. ပ့း 1:1").osis()).toEqual("2Pet.1.1")
		expect(p.parse("2 ပ့း 1:1").osis()).toEqual("2Pet.1.1")
		expect(p.parse("၂ ပ့း 1:1").osis()).toEqual("2Pet.1.1")
		expect(p.parse("2Pet 1:1").osis()).toEqual("2Pet.1.1")
		p.include_apocrypha(false)
		expect(p.parse("2. ပ့းတရူး 1:1").osis()).toEqual("2Pet.1.1")
		expect(p.parse("2 ပ့းတရူး 1:1").osis()).toEqual("2Pet.1.1")
		expect(p.parse("၂ ပ့းတရူး 1:1").osis()).toEqual("2Pet.1.1")
		expect(p.parse("2. ပ့း 1:1").osis()).toEqual("2Pet.1.1")
		expect(p.parse("2 ပ့း 1:1").osis()).toEqual("2Pet.1.1")
		expect(p.parse("၂ ပ့း 1:1").osis()).toEqual("2Pet.1.1")
		expect(p.parse("2PET 1:1").osis()).toEqual("2Pet.1.1")
		;
      return true;
    });
  });

  describe("Localized book 1Pet (kar)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser();
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    it("should handle book: 1Pet (kar)", function() {
      
		expect(p.parse("1. ပ့းတရူး 1:1").osis()).toEqual("1Pet.1.1")
		expect(p.parse("1 ပ့းတရူး 1:1").osis()).toEqual("1Pet.1.1")
		expect(p.parse("၁ ပ့းတရူး 1:1").osis()).toEqual("1Pet.1.1")
		expect(p.parse("1. ပ့း 1:1").osis()).toEqual("1Pet.1.1")
		expect(p.parse("1 ပ့း 1:1").osis()).toEqual("1Pet.1.1")
		expect(p.parse("၁ ပ့း 1:1").osis()).toEqual("1Pet.1.1")
		expect(p.parse("1Pet 1:1").osis()).toEqual("1Pet.1.1")
		;
      return true;
    });
    return it("should handle non-Latin digits in book: 1Pet (kar)", function() {
      p.set_options({
        non_latin_digits_strategy: "replace"
      });
      
		expect(p.parse("1. ပ့းတရူး 1:1").osis()).toEqual("1Pet.1.1")
		expect(p.parse("1 ပ့းတရူး 1:1").osis()).toEqual("1Pet.1.1")
		expect(p.parse("၁ ပ့းတရူး 1:1").osis()).toEqual("1Pet.1.1")
		expect(p.parse("1. ပ့း 1:1").osis()).toEqual("1Pet.1.1")
		expect(p.parse("1 ပ့း 1:1").osis()).toEqual("1Pet.1.1")
		expect(p.parse("၁ ပ့း 1:1").osis()).toEqual("1Pet.1.1")
		expect(p.parse("1Pet 1:1").osis()).toEqual("1Pet.1.1")
		p.include_apocrypha(false)
		expect(p.parse("1. ပ့းတရူး 1:1").osis()).toEqual("1Pet.1.1")
		expect(p.parse("1 ပ့းတရူး 1:1").osis()).toEqual("1Pet.1.1")
		expect(p.parse("၁ ပ့းတရူး 1:1").osis()).toEqual("1Pet.1.1")
		expect(p.parse("1. ပ့း 1:1").osis()).toEqual("1Pet.1.1")
		expect(p.parse("1 ပ့း 1:1").osis()).toEqual("1Pet.1.1")
		expect(p.parse("၁ ပ့း 1:1").osis()).toEqual("1Pet.1.1")
		expect(p.parse("1PET 1:1").osis()).toEqual("1Pet.1.1")
		;
      return true;
    });
  });

  describe("Localized book Jude (kar)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser();
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    return it("should handle book: Jude (kar)", function() {
      
		expect(p.parse("Jude 1:1").osis()).toEqual("Jude.1.1")
		expect(p.parse("ယူဒၤ 1:1").osis()).toEqual("Jude.1.1")
		expect(p.parse("ယူ 1:1").osis()).toEqual("Jude.1.1")
		p.include_apocrypha(false)
		expect(p.parse("JUDE 1:1").osis()).toEqual("Jude.1.1")
		expect(p.parse("ယူဒၤ 1:1").osis()).toEqual("Jude.1.1")
		expect(p.parse("ယူ 1:1").osis()).toEqual("Jude.1.1")
		;
      return true;
    });
  });

  describe("Localized book Tob (kar)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser();
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    return it("should handle book: Tob (kar)", function() {
      
		expect(p.parse("Tob 1:1").osis()).toEqual("Tob.1.1")
		;
      return true;
    });
  });

  describe("Localized book Jdt (kar)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser();
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    return it("should handle book: Jdt (kar)", function() {
      
		expect(p.parse("Jdt 1:1").osis()).toEqual("Jdt.1.1")
		;
      return true;
    });
  });

  describe("Localized book Bar (kar)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser();
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    return it("should handle book: Bar (kar)", function() {
      
		expect(p.parse("Bar 1:1").osis()).toEqual("Bar.1.1")
		;
      return true;
    });
  });

  describe("Localized book Sus (kar)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser();
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    return it("should handle book: Sus (kar)", function() {
      
		expect(p.parse("Sus 1:1").osis()).toEqual("Sus.1.1")
		;
      return true;
    });
  });

  describe("Localized book 2Macc (kar)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser();
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    return it("should handle book: 2Macc (kar)", function() {
      
		expect(p.parse("2Macc 1:1").osis()).toEqual("2Macc.1.1")
		;
      return true;
    });
  });

  describe("Localized book 3Macc (kar)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser();
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    return it("should handle book: 3Macc (kar)", function() {
      
		expect(p.parse("3Macc 1:1").osis()).toEqual("3Macc.1.1")
		;
      return true;
    });
  });

  describe("Localized book 4Macc (kar)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser();
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    return it("should handle book: 4Macc (kar)", function() {
      
		expect(p.parse("4Macc 1:1").osis()).toEqual("4Macc.1.1")
		;
      return true;
    });
  });

  describe("Localized book 1Macc (kar)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser();
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    return it("should handle book: 1Macc (kar)", function() {
      
		expect(p.parse("1Macc 1:1").osis()).toEqual("1Macc.1.1")
		;
      return true;
    });
  });

  describe("Miscellaneous tests", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser();
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    it("should return the expected language", function() {
      return expect(p.languages).toEqual(["kar"]);
    });
    it("should handle ranges (kar)", function() {
      expect(p.parse("Titus 1:1 - 2").osis()).toEqual("Titus.1.1-Titus.1.2");
      expect(p.parse("Matt 1-2").osis()).toEqual("Matt.1-Matt.2");
      return expect(p.parse("Phlm 2 - 3").osis()).toEqual("Phlm.1.2-Phlm.1.3");
    });
    it("should handle chapters (kar)", function() {
      expect(p.parse("Titus 1:1, တၢ်မၤလိ 2").osis()).toEqual("Titus.1.1,Titus.2");
      return expect(p.parse("Matt 3:4 တၢ်မၤလိ 6").osis()).toEqual("Matt.3.4,Matt.6");
    });
    it("should handle verses (kar)", function() {
      expect(p.parse("Exod 1:1 အဆၢ 3").osis()).toEqual("Exod.1.1,Exod.1.3");
      expect(p.parse("Phlm အဆၢ 6").osis()).toEqual("Phlm.1.6");
      expect(p.parse("Exod 1:1 း 3").osis()).toEqual("Exod.1.1,Exod.1.3");
      return expect(p.parse("Phlm း 6").osis()).toEqual("Phlm.1.6");
    });
    it("should handle 'and' (kar)", function() {
      expect(p.parse("Exod 1:1 and 3").osis()).toEqual("Exod.1.1,Exod.1.3");
      return expect(p.parse("Phlm 2 AND 6").osis()).toEqual("Phlm.1.2,Phlm.1.6");
    });
    it("should handle titles (kar)", function() {
      expect(p.parse("Ps 3 kar, 4:2, 5:kar").osis()).toEqual("Ps.3.1,Ps.4.2,Ps.5.1");
      return expect(p.parse("PS 3 KAR, 4:2, 5:KAR").osis()).toEqual("Ps.3.1,Ps.4.2,Ps.5.1");
    });
    it("should handle 'ff' (kar)", function() {
      expect(p.parse("Rev 3ff, 4:2ff").osis()).toEqual("Rev.3-Rev.22,Rev.4.2-Rev.4.11");
      return expect(p.parse("REV 3 FF, 4:2 FF").osis()).toEqual("Rev.3-Rev.22,Rev.4.2-Rev.4.11");
    });
    it("should handle translations (kar)", function() {
      expect(p.parse("Lev 1 (kswc)").osis_and_translations()).toEqual([["Lev.1", "kswc"]]);
      return expect(p.parse("lev 1 kswc").osis_and_translations()).toEqual([["Lev.1", "kswc"]]);
    });
    it("should handle book ranges (kar)", function() {
      p.set_options({
        book_alone_strategy: "full",
        book_range_strategy: "include"
      });
      return expect(p.parse("1 - 3  ယိၤ").osis()).toEqual("1John.1-3John.1");
    });
    return it("should handle boundaries (kar)", function() {
      p.set_options({
        book_alone_strategy: "full"
      });
      expect(p.parse("\u2014Matt\u2014").osis()).toEqual("Matt.1-Matt.28");
      return expect(p.parse("\u201cMatt 1:1\u201d").osis()).toEqual("Matt.1.1");
    });
  });

}).call(this);
