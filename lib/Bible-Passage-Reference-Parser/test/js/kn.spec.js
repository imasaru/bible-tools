(function() {
  var bcv_parser;

  bcv_parser = require("../../js/kn_bcv_parser.js").bcv_parser;

  describe("Parsing", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser;
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

  describe("Localized book Gen (kn)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser;
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    return it("should handle book: Gen (kn)", function() {
      
		expect(p.parse("ಆದಿಕಾಂಡ 1:1").osis()).toEqual("Gen.1.1")
		expect(p.parse("ಆ.ಕಾಂಡ 1:1").osis()).toEqual("Gen.1.1")
		expect(p.parse("ಆಕಾಂಡ 1:1").osis()).toEqual("Gen.1.1")
		expect(p.parse("ಆ.ಕಾ 1:1").osis()).toEqual("Gen.1.1")
		expect(p.parse("Gen 1:1").osis()).toEqual("Gen.1.1")
		expect(p.parse("ಆಕಾ 1:1").osis()).toEqual("Gen.1.1")
		expect(p.parse("ಆದಿ 1:1").osis()).toEqual("Gen.1.1")
		p.include_apocrypha(false)
		expect(p.parse("ಆದಿಕಾಂಡ 1:1").osis()).toEqual("Gen.1.1")
		expect(p.parse("ಆ.ಕಾಂಡ 1:1").osis()).toEqual("Gen.1.1")
		expect(p.parse("ಆಕಾಂಡ 1:1").osis()).toEqual("Gen.1.1")
		expect(p.parse("ಆ.ಕಾ 1:1").osis()).toEqual("Gen.1.1")
		expect(p.parse("GEN 1:1").osis()).toEqual("Gen.1.1")
		expect(p.parse("ಆಕಾ 1:1").osis()).toEqual("Gen.1.1")
		expect(p.parse("ಆದಿ 1:1").osis()).toEqual("Gen.1.1")
		;
      return true;
    });
  });

  describe("Localized book Exod (kn)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser;
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    return it("should handle book: Exod (kn)", function() {
      
		expect(p.parse("ವಿಮೋಚನಕಾಂಡ 1:1").osis()).toEqual("Exod.1.1")
		expect(p.parse("ವಿ.ಕಾಂಡ 1:1").osis()).toEqual("Exod.1.1")
		expect(p.parse("ವಿಕಾಂಡ 1:1").osis()).toEqual("Exod.1.1")
		expect(p.parse("ವಿ.ಕಾ 1:1").osis()).toEqual("Exod.1.1")
		expect(p.parse("Exod 1:1").osis()).toEqual("Exod.1.1")
		expect(p.parse("ವಿಕಾ 1:1").osis()).toEqual("Exod.1.1")
		expect(p.parse("ವಿಮೋ 1:1").osis()).toEqual("Exod.1.1")
		p.include_apocrypha(false)
		expect(p.parse("ವಿಮೋಚನಕಾಂಡ 1:1").osis()).toEqual("Exod.1.1")
		expect(p.parse("ವಿ.ಕಾಂಡ 1:1").osis()).toEqual("Exod.1.1")
		expect(p.parse("ವಿಕಾಂಡ 1:1").osis()).toEqual("Exod.1.1")
		expect(p.parse("ವಿ.ಕಾ 1:1").osis()).toEqual("Exod.1.1")
		expect(p.parse("EXOD 1:1").osis()).toEqual("Exod.1.1")
		expect(p.parse("ವಿಕಾ 1:1").osis()).toEqual("Exod.1.1")
		expect(p.parse("ವಿಮೋ 1:1").osis()).toEqual("Exod.1.1")
		;
      return true;
    });
  });

  describe("Localized book Bel (kn)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser;
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    return it("should handle book: Bel (kn)", function() {
      
		expect(p.parse("Bel 1:1").osis()).toEqual("Bel.1.1")
		;
      return true;
    });
  });

  describe("Localized book Lev (kn)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser;
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    return it("should handle book: Lev (kn)", function() {
      
		expect(p.parse("ಯಾಜಕಕಾಂಡ 1:1").osis()).toEqual("Lev.1.1")
		expect(p.parse("Lev 1:1").osis()).toEqual("Lev.1.1")
		expect(p.parse("ಯಾಜ 1:1").osis()).toEqual("Lev.1.1")
		p.include_apocrypha(false)
		expect(p.parse("ಯಾಜಕಕಾಂಡ 1:1").osis()).toEqual("Lev.1.1")
		expect(p.parse("LEV 1:1").osis()).toEqual("Lev.1.1")
		expect(p.parse("ಯಾಜ 1:1").osis()).toEqual("Lev.1.1")
		;
      return true;
    });
  });

  describe("Localized book Num (kn)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser;
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    return it("should handle book: Num (kn)", function() {
      
		expect(p.parse("ಸಂಖ್ಯಾಕಾಂಡ 1:1").osis()).toEqual("Num.1.1")
		expect(p.parse("ಅರಣ್ಯಕಾಂಡ 1:1").osis()).toEqual("Num.1.1")
		expect(p.parse("ಯಾಕಾಂಡ 1:1").osis()).toEqual("Num.1.1")
		expect(p.parse("ಅರಣ್ಯ 1:1").osis()).toEqual("Num.1.1")
		expect(p.parse("Num 1:1").osis()).toEqual("Num.1.1")
		p.include_apocrypha(false)
		expect(p.parse("ಸಂಖ್ಯಾಕಾಂಡ 1:1").osis()).toEqual("Num.1.1")
		expect(p.parse("ಅರಣ್ಯಕಾಂಡ 1:1").osis()).toEqual("Num.1.1")
		expect(p.parse("ಯಾಕಾಂಡ 1:1").osis()).toEqual("Num.1.1")
		expect(p.parse("ಅರಣ್ಯ 1:1").osis()).toEqual("Num.1.1")
		expect(p.parse("NUM 1:1").osis()).toEqual("Num.1.1")
		;
      return true;
    });
  });

  describe("Localized book Sir (kn)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser;
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    return it("should handle book: Sir (kn)", function() {
      
		expect(p.parse("Sir 1:1").osis()).toEqual("Sir.1.1")
		;
      return true;
    });
  });

  describe("Localized book Wis (kn)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser;
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    return it("should handle book: Wis (kn)", function() {
      
		expect(p.parse("Wis 1:1").osis()).toEqual("Wis.1.1")
		;
      return true;
    });
  });

  describe("Localized book Lam (kn)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser;
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    return it("should handle book: Lam (kn)", function() {
      
		expect(p.parse("ಪ್ರಲಾಪಗಳು 1:1").osis()).toEqual("Lam.1.1")
		expect(p.parse("ಪ್ರಲಾ 1:1").osis()).toEqual("Lam.1.1")
		expect(p.parse("Lam 1:1").osis()).toEqual("Lam.1.1")
		p.include_apocrypha(false)
		expect(p.parse("ಪ್ರಲಾಪಗಳು 1:1").osis()).toEqual("Lam.1.1")
		expect(p.parse("ಪ್ರಲಾ 1:1").osis()).toEqual("Lam.1.1")
		expect(p.parse("LAM 1:1").osis()).toEqual("Lam.1.1")
		;
      return true;
    });
  });

  describe("Localized book EpJer (kn)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser;
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    return it("should handle book: EpJer (kn)", function() {
      
		expect(p.parse("EpJer 1:1").osis()).toEqual("EpJer.1.1")
		;
      return true;
    });
  });

  describe("Localized book Rev (kn)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser;
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    return it("should handle book: Rev (kn)", function() {
      
		expect(p.parse("ಪ್ರಕಟನೆ 1:1").osis()).toEqual("Rev.1.1")
		expect(p.parse("ಪ್ರಕ 1:1").osis()).toEqual("Rev.1.1")
		expect(p.parse("Rev 1:1").osis()).toEqual("Rev.1.1")
		p.include_apocrypha(false)
		expect(p.parse("ಪ್ರಕಟನೆ 1:1").osis()).toEqual("Rev.1.1")
		expect(p.parse("ಪ್ರಕ 1:1").osis()).toEqual("Rev.1.1")
		expect(p.parse("REV 1:1").osis()).toEqual("Rev.1.1")
		;
      return true;
    });
  });

  describe("Localized book PrMan (kn)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser;
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    return it("should handle book: PrMan (kn)", function() {
      
		expect(p.parse("PrMan 1:1").osis()).toEqual("PrMan.1.1")
		;
      return true;
    });
  });

  describe("Localized book Deut (kn)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser;
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    return it("should handle book: Deut (kn)", function() {
      
		expect(p.parse("ಧರ್ಮೋಪದೇಶಕಾಂಡ 1:1").osis()).toEqual("Deut.1.1")
		expect(p.parse("ಧ.ಕಾಂಡ 1:1").osis()).toEqual("Deut.1.1")
		expect(p.parse("ಧಕಾಂಡ 1:1").osis()).toEqual("Deut.1.1")
		expect(p.parse("ಧರ್ಮೋ 1:1").osis()).toEqual("Deut.1.1")
		expect(p.parse("Deut 1:1").osis()).toEqual("Deut.1.1")
		expect(p.parse("ಧ.ಕಾ 1:1").osis()).toEqual("Deut.1.1")
		expect(p.parse("ಧಕಾ 1:1").osis()).toEqual("Deut.1.1")
		p.include_apocrypha(false)
		expect(p.parse("ಧರ್ಮೋಪದೇಶಕಾಂಡ 1:1").osis()).toEqual("Deut.1.1")
		expect(p.parse("ಧ.ಕಾಂಡ 1:1").osis()).toEqual("Deut.1.1")
		expect(p.parse("ಧಕಾಂಡ 1:1").osis()).toEqual("Deut.1.1")
		expect(p.parse("ಧರ್ಮೋ 1:1").osis()).toEqual("Deut.1.1")
		expect(p.parse("DEUT 1:1").osis()).toEqual("Deut.1.1")
		expect(p.parse("ಧ.ಕಾ 1:1").osis()).toEqual("Deut.1.1")
		expect(p.parse("ಧಕಾ 1:1").osis()).toEqual("Deut.1.1")
		;
      return true;
    });
  });

  describe("Localized book Josh (kn)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser;
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    return it("should handle book: Josh (kn)", function() {
      
		expect(p.parse("ಯೆಹೋಶುವ 1:1").osis()).toEqual("Josh.1.1")
		expect(p.parse("Josh 1:1").osis()).toEqual("Josh.1.1")
		expect(p.parse("ಯೆಹೋ 1:1").osis()).toEqual("Josh.1.1")
		p.include_apocrypha(false)
		expect(p.parse("ಯೆಹೋಶುವ 1:1").osis()).toEqual("Josh.1.1")
		expect(p.parse("JOSH 1:1").osis()).toEqual("Josh.1.1")
		expect(p.parse("ಯೆಹೋ 1:1").osis()).toEqual("Josh.1.1")
		;
      return true;
    });
  });

  describe("Localized book Judg (kn)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser;
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    return it("should handle book: Judg (kn)", function() {
      
		expect(p.parse("ನ್ಯಾಯಸ್ಥಾಪಕರು 1:1").osis()).toEqual("Judg.1.1")
		expect(p.parse("ನ್ಯಾಯ 1:1").osis()).toEqual("Judg.1.1")
		expect(p.parse("Judg 1:1").osis()).toEqual("Judg.1.1")
		p.include_apocrypha(false)
		expect(p.parse("ನ್ಯಾಯಸ್ಥಾಪಕರು 1:1").osis()).toEqual("Judg.1.1")
		expect(p.parse("ನ್ಯಾಯ 1:1").osis()).toEqual("Judg.1.1")
		expect(p.parse("JUDG 1:1").osis()).toEqual("Judg.1.1")
		;
      return true;
    });
  });

  describe("Localized book Ruth (kn)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser;
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    return it("should handle book: Ruth (kn)", function() {
      
		expect(p.parse("ರೂತಳು 1:1").osis()).toEqual("Ruth.1.1")
		expect(p.parse("Ruth 1:1").osis()).toEqual("Ruth.1.1")
		expect(p.parse("ರೂತ 1:1").osis()).toEqual("Ruth.1.1")
		p.include_apocrypha(false)
		expect(p.parse("ರೂತಳು 1:1").osis()).toEqual("Ruth.1.1")
		expect(p.parse("RUTH 1:1").osis()).toEqual("Ruth.1.1")
		expect(p.parse("ರೂತ 1:1").osis()).toEqual("Ruth.1.1")
		;
      return true;
    });
  });

  describe("Localized book 1Esd (kn)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser;
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    return it("should handle book: 1Esd (kn)", function() {
      
		expect(p.parse("1Esd 1:1").osis()).toEqual("1Esd.1.1")
		;
      return true;
    });
  });

  describe("Localized book 2Esd (kn)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser;
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    return it("should handle book: 2Esd (kn)", function() {
      
		expect(p.parse("2Esd 1:1").osis()).toEqual("2Esd.1.1")
		;
      return true;
    });
  });

  describe("Localized book Isa (kn)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser;
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    return it("should handle book: Isa (kn)", function() {
      
		expect(p.parse("ಪ್ರವಾದಿ ಯೆಶಾಯನ ಗ್ರಂಥ 1:1").osis()).toEqual("Isa.1.1")
		expect(p.parse("ಯೆಶಾಯ 1:1").osis()).toEqual("Isa.1.1")
		expect(p.parse("ಯೆಶಾ 1:1").osis()).toEqual("Isa.1.1")
		expect(p.parse("Isa 1:1").osis()).toEqual("Isa.1.1")
		p.include_apocrypha(false)
		expect(p.parse("ಪ್ರವಾದಿ ಯೆಶಾಯನ ಗ್ರಂಥ 1:1").osis()).toEqual("Isa.1.1")
		expect(p.parse("ಯೆಶಾಯ 1:1").osis()).toEqual("Isa.1.1")
		expect(p.parse("ಯೆಶಾ 1:1").osis()).toEqual("Isa.1.1")
		expect(p.parse("ISA 1:1").osis()).toEqual("Isa.1.1")
		;
      return true;
    });
  });

  describe("Localized book 2Sam (kn)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser;
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    it("should handle book: 2Sam (kn)", function() {
      
		expect(p.parse("2 ಸಮುವೇಲನು 1:1").osis()).toEqual("2Sam.1.1")
		expect(p.parse("೨ ಸಮುವೇಲನು 1:1").osis()).toEqual("2Sam.1.1")
		expect(p.parse("2 ಸಮುವೇಲ 1:1").osis()).toEqual("2Sam.1.1")
		expect(p.parse("2 ಸಮು 1:1").osis()).toEqual("2Sam.1.1")
		expect(p.parse("2Sam 1:1").osis()).toEqual("2Sam.1.1")
		;
      return true;
    });
    return it("should handle non-Latin digits in book: 2Sam (kn)", function() {
      p.set_options({
        non_latin_digits_strategy: "replace"
      });
      
		expect(p.parse("2 ಸಮುವೇಲನು 1:1").osis()).toEqual("2Sam.1.1")
		expect(p.parse("೨ ಸಮುವೇಲನು 1:1").osis()).toEqual("2Sam.1.1")
		expect(p.parse("2 ಸಮುವೇಲ 1:1").osis()).toEqual("2Sam.1.1")
		expect(p.parse("2 ಸಮು 1:1").osis()).toEqual("2Sam.1.1")
		expect(p.parse("2Sam 1:1").osis()).toEqual("2Sam.1.1")
		p.include_apocrypha(false)
		expect(p.parse("2 ಸಮುವೇಲನು 1:1").osis()).toEqual("2Sam.1.1")
		expect(p.parse("೨ ಸಮುವೇಲನು 1:1").osis()).toEqual("2Sam.1.1")
		expect(p.parse("2 ಸಮುವೇಲ 1:1").osis()).toEqual("2Sam.1.1")
		expect(p.parse("2 ಸಮು 1:1").osis()).toEqual("2Sam.1.1")
		expect(p.parse("2SAM 1:1").osis()).toEqual("2Sam.1.1")
		;
      return true;
    });
  });

  describe("Localized book 1Sam (kn)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser;
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    it("should handle book: 1Sam (kn)", function() {
      
		expect(p.parse("1 ಸಮುವೇಲನು 1:1").osis()).toEqual("1Sam.1.1")
		expect(p.parse("೧ ಸಮುವೇಲನು 1:1").osis()).toEqual("1Sam.1.1")
		expect(p.parse("1 ಸಮುವೇಲ 1:1").osis()).toEqual("1Sam.1.1")
		expect(p.parse("1 ಸಮು 1:1").osis()).toEqual("1Sam.1.1")
		expect(p.parse("1Sam 1:1").osis()).toEqual("1Sam.1.1")
		;
      return true;
    });
    return it("should handle non-Latin digits in book: 1Sam (kn)", function() {
      p.set_options({
        non_latin_digits_strategy: "replace"
      });
      
		expect(p.parse("1 ಸಮುವೇಲನು 1:1").osis()).toEqual("1Sam.1.1")
		expect(p.parse("೧ ಸಮುವೇಲನು 1:1").osis()).toEqual("1Sam.1.1")
		expect(p.parse("1 ಸಮುವೇಲ 1:1").osis()).toEqual("1Sam.1.1")
		expect(p.parse("1 ಸಮು 1:1").osis()).toEqual("1Sam.1.1")
		expect(p.parse("1Sam 1:1").osis()).toEqual("1Sam.1.1")
		p.include_apocrypha(false)
		expect(p.parse("1 ಸಮುವೇಲನು 1:1").osis()).toEqual("1Sam.1.1")
		expect(p.parse("೧ ಸಮುವೇಲನು 1:1").osis()).toEqual("1Sam.1.1")
		expect(p.parse("1 ಸಮುವೇಲ 1:1").osis()).toEqual("1Sam.1.1")
		expect(p.parse("1 ಸಮು 1:1").osis()).toEqual("1Sam.1.1")
		expect(p.parse("1SAM 1:1").osis()).toEqual("1Sam.1.1")
		;
      return true;
    });
  });

  describe("Localized book 2Kgs (kn)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser;
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    it("should handle book: 2Kgs (kn)", function() {
      
		expect(p.parse("2 ಅರಸುಗಳು 1:1").osis()).toEqual("2Kgs.1.1")
		expect(p.parse("೨ ಅರಸುಗಳು 1:1").osis()).toEqual("2Kgs.1.1")
		expect(p.parse("2 ಅರಸು 1:1").osis()).toEqual("2Kgs.1.1")
		expect(p.parse("2Kgs 1:1").osis()).toEqual("2Kgs.1.1")
		;
      return true;
    });
    return it("should handle non-Latin digits in book: 2Kgs (kn)", function() {
      p.set_options({
        non_latin_digits_strategy: "replace"
      });
      
		expect(p.parse("2 ಅರಸುಗಳು 1:1").osis()).toEqual("2Kgs.1.1")
		expect(p.parse("೨ ಅರಸುಗಳು 1:1").osis()).toEqual("2Kgs.1.1")
		expect(p.parse("2 ಅರಸು 1:1").osis()).toEqual("2Kgs.1.1")
		expect(p.parse("2Kgs 1:1").osis()).toEqual("2Kgs.1.1")
		p.include_apocrypha(false)
		expect(p.parse("2 ಅರಸುಗಳು 1:1").osis()).toEqual("2Kgs.1.1")
		expect(p.parse("೨ ಅರಸುಗಳು 1:1").osis()).toEqual("2Kgs.1.1")
		expect(p.parse("2 ಅರಸು 1:1").osis()).toEqual("2Kgs.1.1")
		expect(p.parse("2KGS 1:1").osis()).toEqual("2Kgs.1.1")
		;
      return true;
    });
  });

  describe("Localized book 1Kgs (kn)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser;
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    it("should handle book: 1Kgs (kn)", function() {
      
		expect(p.parse("1 ಅರಸುಗಳು 1:1").osis()).toEqual("1Kgs.1.1")
		expect(p.parse("೧ ಅರಸುಗಳು 1:1").osis()).toEqual("1Kgs.1.1")
		expect(p.parse("1 ಅರಸು 1:1").osis()).toEqual("1Kgs.1.1")
		expect(p.parse("1Kgs 1:1").osis()).toEqual("1Kgs.1.1")
		;
      return true;
    });
    return it("should handle non-Latin digits in book: 1Kgs (kn)", function() {
      p.set_options({
        non_latin_digits_strategy: "replace"
      });
      
		expect(p.parse("1 ಅರಸುಗಳು 1:1").osis()).toEqual("1Kgs.1.1")
		expect(p.parse("೧ ಅರಸುಗಳು 1:1").osis()).toEqual("1Kgs.1.1")
		expect(p.parse("1 ಅರಸು 1:1").osis()).toEqual("1Kgs.1.1")
		expect(p.parse("1Kgs 1:1").osis()).toEqual("1Kgs.1.1")
		p.include_apocrypha(false)
		expect(p.parse("1 ಅರಸುಗಳು 1:1").osis()).toEqual("1Kgs.1.1")
		expect(p.parse("೧ ಅರಸುಗಳು 1:1").osis()).toEqual("1Kgs.1.1")
		expect(p.parse("1 ಅರಸು 1:1").osis()).toEqual("1Kgs.1.1")
		expect(p.parse("1KGS 1:1").osis()).toEqual("1Kgs.1.1")
		;
      return true;
    });
  });

  describe("Localized book 2Chr (kn)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser;
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    it("should handle book: 2Chr (kn)", function() {
      
		expect(p.parse("2 ಪೂರ್ವಕಾಲದ ಇತಿಹಾಸ 1:1").osis()).toEqual("2Chr.1.1")
		expect(p.parse("2 ಪೂರ್ವಕಾಲವೃತ್ತಾಂತ 1:1").osis()).toEqual("2Chr.1.1")
		expect(p.parse("೨ ಪೂರ್ವಕಾಲದ ಇತಿಹಾಸ 1:1").osis()).toEqual("2Chr.1.1")
		expect(p.parse("2. ಪೂ.ವೃ.ಕಾ 1:1").osis()).toEqual("2Chr.1.1")
		expect(p.parse("2 ಪೂ.ವೃ.ಕಾ 1:1").osis()).toEqual("2Chr.1.1")
		expect(p.parse("2. ಪೂ.ವೃಕಾ 1:1").osis()).toEqual("2Chr.1.1")
		expect(p.parse("2. ಪೂವೃ.ಕಾ 1:1").osis()).toEqual("2Chr.1.1")
		expect(p.parse("೨ ಪೂ.ವೃ.ಕಾ 1:1").osis()).toEqual("2Chr.1.1")
		expect(p.parse("2 ಪೂ.ವೃಕಾ 1:1").osis()).toEqual("2Chr.1.1")
		expect(p.parse("2 ಪೂವೃ.ಕಾ 1:1").osis()).toEqual("2Chr.1.1")
		expect(p.parse("2. ಪೂವೃಕಾ 1:1").osis()).toEqual("2Chr.1.1")
		expect(p.parse("೨ ಪೂ.ವೃಕಾ 1:1").osis()).toEqual("2Chr.1.1")
		expect(p.parse("೨ ಪೂವೃ.ಕಾ 1:1").osis()).toEqual("2Chr.1.1")
		expect(p.parse("2 ಪೂವೃಕಾ 1:1").osis()).toEqual("2Chr.1.1")
		expect(p.parse("೨ ಪೂವೃಕಾ 1:1").osis()).toEqual("2Chr.1.1")
		expect(p.parse("2 ಪೂರ್ವ 1:1").osis()).toEqual("2Chr.1.1")
		expect(p.parse("2Chr 1:1").osis()).toEqual("2Chr.1.1")
		;
      return true;
    });
    return it("should handle non-Latin digits in book: 2Chr (kn)", function() {
      p.set_options({
        non_latin_digits_strategy: "replace"
      });
      
		expect(p.parse("2 ಪೂರ್ವಕಾಲದ ಇತಿಹಾಸ 1:1").osis()).toEqual("2Chr.1.1")
		expect(p.parse("2 ಪೂರ್ವಕಾಲವೃತ್ತಾಂತ 1:1").osis()).toEqual("2Chr.1.1")
		expect(p.parse("೨ ಪೂರ್ವಕಾಲದ ಇತಿಹಾಸ 1:1").osis()).toEqual("2Chr.1.1")
		expect(p.parse("2. ಪೂ.ವೃ.ಕಾ 1:1").osis()).toEqual("2Chr.1.1")
		expect(p.parse("2 ಪೂ.ವೃ.ಕಾ 1:1").osis()).toEqual("2Chr.1.1")
		expect(p.parse("2. ಪೂ.ವೃಕಾ 1:1").osis()).toEqual("2Chr.1.1")
		expect(p.parse("2. ಪೂವೃ.ಕಾ 1:1").osis()).toEqual("2Chr.1.1")
		expect(p.parse("೨ ಪೂ.ವೃ.ಕಾ 1:1").osis()).toEqual("2Chr.1.1")
		expect(p.parse("2 ಪೂ.ವೃಕಾ 1:1").osis()).toEqual("2Chr.1.1")
		expect(p.parse("2 ಪೂವೃ.ಕಾ 1:1").osis()).toEqual("2Chr.1.1")
		expect(p.parse("2. ಪೂವೃಕಾ 1:1").osis()).toEqual("2Chr.1.1")
		expect(p.parse("೨ ಪೂ.ವೃಕಾ 1:1").osis()).toEqual("2Chr.1.1")
		expect(p.parse("೨ ಪೂವೃ.ಕಾ 1:1").osis()).toEqual("2Chr.1.1")
		expect(p.parse("2 ಪೂವೃಕಾ 1:1").osis()).toEqual("2Chr.1.1")
		expect(p.parse("೨ ಪೂವೃಕಾ 1:1").osis()).toEqual("2Chr.1.1")
		expect(p.parse("2 ಪೂರ್ವ 1:1").osis()).toEqual("2Chr.1.1")
		expect(p.parse("2Chr 1:1").osis()).toEqual("2Chr.1.1")
		p.include_apocrypha(false)
		expect(p.parse("2 ಪೂರ್ವಕಾಲದ ಇತಿಹಾಸ 1:1").osis()).toEqual("2Chr.1.1")
		expect(p.parse("2 ಪೂರ್ವಕಾಲವೃತ್ತಾಂತ 1:1").osis()).toEqual("2Chr.1.1")
		expect(p.parse("೨ ಪೂರ್ವಕಾಲದ ಇತಿಹಾಸ 1:1").osis()).toEqual("2Chr.1.1")
		expect(p.parse("2. ಪೂ.ವೃ.ಕಾ 1:1").osis()).toEqual("2Chr.1.1")
		expect(p.parse("2 ಪೂ.ವೃ.ಕಾ 1:1").osis()).toEqual("2Chr.1.1")
		expect(p.parse("2. ಪೂ.ವೃಕಾ 1:1").osis()).toEqual("2Chr.1.1")
		expect(p.parse("2. ಪೂವೃ.ಕಾ 1:1").osis()).toEqual("2Chr.1.1")
		expect(p.parse("೨ ಪೂ.ವೃ.ಕಾ 1:1").osis()).toEqual("2Chr.1.1")
		expect(p.parse("2 ಪೂ.ವೃಕಾ 1:1").osis()).toEqual("2Chr.1.1")
		expect(p.parse("2 ಪೂವೃ.ಕಾ 1:1").osis()).toEqual("2Chr.1.1")
		expect(p.parse("2. ಪೂವೃಕಾ 1:1").osis()).toEqual("2Chr.1.1")
		expect(p.parse("೨ ಪೂ.ವೃಕಾ 1:1").osis()).toEqual("2Chr.1.1")
		expect(p.parse("೨ ಪೂವೃ.ಕಾ 1:1").osis()).toEqual("2Chr.1.1")
		expect(p.parse("2 ಪೂವೃಕಾ 1:1").osis()).toEqual("2Chr.1.1")
		expect(p.parse("೨ ಪೂವೃಕಾ 1:1").osis()).toEqual("2Chr.1.1")
		expect(p.parse("2 ಪೂರ್ವ 1:1").osis()).toEqual("2Chr.1.1")
		expect(p.parse("2CHR 1:1").osis()).toEqual("2Chr.1.1")
		;
      return true;
    });
  });

  describe("Localized book 1Chr (kn)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser;
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    it("should handle book: 1Chr (kn)", function() {
      
		expect(p.parse("1 ಪೂರ್ವಕಾಲದ ಇತಿಹಾಸ 1:1").osis()).toEqual("1Chr.1.1")
		expect(p.parse("1 ಪೂರ್ವಕಾಲವೃತ್ತಾಂತ 1:1").osis()).toEqual("1Chr.1.1")
		expect(p.parse("೧ ಪೂರ್ವಕಾಲದ ಇತಿಹಾಸ 1:1").osis()).toEqual("1Chr.1.1")
		expect(p.parse("1. ಪೂ.ವೃ.ಕಾ 1:1").osis()).toEqual("1Chr.1.1")
		expect(p.parse("1 ಪೂ.ವೃ.ಕಾ 1:1").osis()).toEqual("1Chr.1.1")
		expect(p.parse("1. ಪೂ.ವೃಕಾ 1:1").osis()).toEqual("1Chr.1.1")
		expect(p.parse("1. ಪೂವೃ.ಕಾ 1:1").osis()).toEqual("1Chr.1.1")
		expect(p.parse("೧ ಪೂ.ವೃ.ಕಾ 1:1").osis()).toEqual("1Chr.1.1")
		expect(p.parse("1 ಪೂ.ವೃಕಾ 1:1").osis()).toEqual("1Chr.1.1")
		expect(p.parse("1 ಪೂವೃ.ಕಾ 1:1").osis()).toEqual("1Chr.1.1")
		expect(p.parse("1. ಪೂವೃಕಾ 1:1").osis()).toEqual("1Chr.1.1")
		expect(p.parse("೧ ಪೂ.ವೃಕಾ 1:1").osis()).toEqual("1Chr.1.1")
		expect(p.parse("೧ ಪೂವೃ.ಕಾ 1:1").osis()).toEqual("1Chr.1.1")
		expect(p.parse("1 ಪೂವೃಕಾ 1:1").osis()).toEqual("1Chr.1.1")
		expect(p.parse("೧ ಪೂವೃಕಾ 1:1").osis()).toEqual("1Chr.1.1")
		expect(p.parse("1 ಪೂರ್ವ 1:1").osis()).toEqual("1Chr.1.1")
		expect(p.parse("1Chr 1:1").osis()).toEqual("1Chr.1.1")
		;
      return true;
    });
    return it("should handle non-Latin digits in book: 1Chr (kn)", function() {
      p.set_options({
        non_latin_digits_strategy: "replace"
      });
      
		expect(p.parse("1 ಪೂರ್ವಕಾಲದ ಇತಿಹಾಸ 1:1").osis()).toEqual("1Chr.1.1")
		expect(p.parse("1 ಪೂರ್ವಕಾಲವೃತ್ತಾಂತ 1:1").osis()).toEqual("1Chr.1.1")
		expect(p.parse("೧ ಪೂರ್ವಕಾಲದ ಇತಿಹಾಸ 1:1").osis()).toEqual("1Chr.1.1")
		expect(p.parse("1. ಪೂ.ವೃ.ಕಾ 1:1").osis()).toEqual("1Chr.1.1")
		expect(p.parse("1 ಪೂ.ವೃ.ಕಾ 1:1").osis()).toEqual("1Chr.1.1")
		expect(p.parse("1. ಪೂ.ವೃಕಾ 1:1").osis()).toEqual("1Chr.1.1")
		expect(p.parse("1. ಪೂವೃ.ಕಾ 1:1").osis()).toEqual("1Chr.1.1")
		expect(p.parse("೧ ಪೂ.ವೃ.ಕಾ 1:1").osis()).toEqual("1Chr.1.1")
		expect(p.parse("1 ಪೂ.ವೃಕಾ 1:1").osis()).toEqual("1Chr.1.1")
		expect(p.parse("1 ಪೂವೃ.ಕಾ 1:1").osis()).toEqual("1Chr.1.1")
		expect(p.parse("1. ಪೂವೃಕಾ 1:1").osis()).toEqual("1Chr.1.1")
		expect(p.parse("೧ ಪೂ.ವೃಕಾ 1:1").osis()).toEqual("1Chr.1.1")
		expect(p.parse("೧ ಪೂವೃ.ಕಾ 1:1").osis()).toEqual("1Chr.1.1")
		expect(p.parse("1 ಪೂವೃಕಾ 1:1").osis()).toEqual("1Chr.1.1")
		expect(p.parse("೧ ಪೂವೃಕಾ 1:1").osis()).toEqual("1Chr.1.1")
		expect(p.parse("1 ಪೂರ್ವ 1:1").osis()).toEqual("1Chr.1.1")
		expect(p.parse("1Chr 1:1").osis()).toEqual("1Chr.1.1")
		p.include_apocrypha(false)
		expect(p.parse("1 ಪೂರ್ವಕಾಲದ ಇತಿಹಾಸ 1:1").osis()).toEqual("1Chr.1.1")
		expect(p.parse("1 ಪೂರ್ವಕಾಲವೃತ್ತಾಂತ 1:1").osis()).toEqual("1Chr.1.1")
		expect(p.parse("೧ ಪೂರ್ವಕಾಲದ ಇತಿಹಾಸ 1:1").osis()).toEqual("1Chr.1.1")
		expect(p.parse("1. ಪೂ.ವೃ.ಕಾ 1:1").osis()).toEqual("1Chr.1.1")
		expect(p.parse("1 ಪೂ.ವೃ.ಕಾ 1:1").osis()).toEqual("1Chr.1.1")
		expect(p.parse("1. ಪೂ.ವೃಕಾ 1:1").osis()).toEqual("1Chr.1.1")
		expect(p.parse("1. ಪೂವೃ.ಕಾ 1:1").osis()).toEqual("1Chr.1.1")
		expect(p.parse("೧ ಪೂ.ವೃ.ಕಾ 1:1").osis()).toEqual("1Chr.1.1")
		expect(p.parse("1 ಪೂ.ವೃಕಾ 1:1").osis()).toEqual("1Chr.1.1")
		expect(p.parse("1 ಪೂವೃ.ಕಾ 1:1").osis()).toEqual("1Chr.1.1")
		expect(p.parse("1. ಪೂವೃಕಾ 1:1").osis()).toEqual("1Chr.1.1")
		expect(p.parse("೧ ಪೂ.ವೃಕಾ 1:1").osis()).toEqual("1Chr.1.1")
		expect(p.parse("೧ ಪೂವೃ.ಕಾ 1:1").osis()).toEqual("1Chr.1.1")
		expect(p.parse("1 ಪೂವೃಕಾ 1:1").osis()).toEqual("1Chr.1.1")
		expect(p.parse("೧ ಪೂವೃಕಾ 1:1").osis()).toEqual("1Chr.1.1")
		expect(p.parse("1 ಪೂರ್ವ 1:1").osis()).toEqual("1Chr.1.1")
		expect(p.parse("1CHR 1:1").osis()).toEqual("1Chr.1.1")
		;
      return true;
    });
  });

  describe("Localized book Ezra (kn)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser;
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    return it("should handle book: Ezra (kn)", function() {
      
		expect(p.parse("ಎಜ್ರನು 1:1").osis()).toEqual("Ezra.1.1")
		expect(p.parse("Ezra 1:1").osis()).toEqual("Ezra.1.1")
		expect(p.parse("ಎಜ್ರ 1:1").osis()).toEqual("Ezra.1.1")
		p.include_apocrypha(false)
		expect(p.parse("ಎಜ್ರನು 1:1").osis()).toEqual("Ezra.1.1")
		expect(p.parse("EZRA 1:1").osis()).toEqual("Ezra.1.1")
		expect(p.parse("ಎಜ್ರ 1:1").osis()).toEqual("Ezra.1.1")
		;
      return true;
    });
  });

  describe("Localized book Neh (kn)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser;
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    return it("should handle book: Neh (kn)", function() {
      
		expect(p.parse("ನೆಹೆಮೀಯ 1:1").osis()).toEqual("Neh.1.1")
		expect(p.parse("ನೆಹೆ 1:1").osis()).toEqual("Neh.1.1")
		expect(p.parse("Neh 1:1").osis()).toEqual("Neh.1.1")
		p.include_apocrypha(false)
		expect(p.parse("ನೆಹೆಮೀಯ 1:1").osis()).toEqual("Neh.1.1")
		expect(p.parse("ನೆಹೆ 1:1").osis()).toEqual("Neh.1.1")
		expect(p.parse("NEH 1:1").osis()).toEqual("Neh.1.1")
		;
      return true;
    });
  });

  describe("Localized book GkEsth (kn)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser;
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    return it("should handle book: GkEsth (kn)", function() {
      
		expect(p.parse("GkEsth 1:1").osis()).toEqual("GkEsth.1.1")
		;
      return true;
    });
  });

  describe("Localized book Esth (kn)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser;
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    return it("should handle book: Esth (kn)", function() {
      
		expect(p.parse("ಎಸ್ತೇರಳು 1:1").osis()).toEqual("Esth.1.1")
		expect(p.parse("ಎಸ್ತೇ 1:1").osis()).toEqual("Esth.1.1")
		expect(p.parse("Esth 1:1").osis()).toEqual("Esth.1.1")
		p.include_apocrypha(false)
		expect(p.parse("ಎಸ್ತೇರಳು 1:1").osis()).toEqual("Esth.1.1")
		expect(p.parse("ಎಸ್ತೇ 1:1").osis()).toEqual("Esth.1.1")
		expect(p.parse("ESTH 1:1").osis()).toEqual("Esth.1.1")
		;
      return true;
    });
  });

  describe("Localized book Job (kn)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser;
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    return it("should handle book: Job (kn)", function() {
      
		expect(p.parse("ಯೋಬನು ಗ್ರಂಥ 1:1").osis()).toEqual("Job.1.1")
		expect(p.parse("ಯೋಬನು 1:1").osis()).toEqual("Job.1.1")
		expect(p.parse("Job 1:1").osis()).toEqual("Job.1.1")
		expect(p.parse("ಯೋಬ 1:1").osis()).toEqual("Job.1.1")
		p.include_apocrypha(false)
		expect(p.parse("ಯೋಬನು ಗ್ರಂಥ 1:1").osis()).toEqual("Job.1.1")
		expect(p.parse("ಯೋಬನು 1:1").osis()).toEqual("Job.1.1")
		expect(p.parse("JOB 1:1").osis()).toEqual("Job.1.1")
		expect(p.parse("ಯೋಬ 1:1").osis()).toEqual("Job.1.1")
		;
      return true;
    });
  });

  describe("Localized book Ps (kn)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser;
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    return it("should handle book: Ps (kn)", function() {
      
		expect(p.parse("ಕೀರ್ತನೆಗಳು 1:1").osis()).toEqual("Ps.1.1")
		expect(p.parse("ಕೀರ್ತನೆ 1:1").osis()).toEqual("Ps.1.1")
		expect(p.parse("ಕೀರ್ತ 1:1").osis()).toEqual("Ps.1.1")
		expect(p.parse("Ps 1:1").osis()).toEqual("Ps.1.1")
		p.include_apocrypha(false)
		expect(p.parse("ಕೀರ್ತನೆಗಳು 1:1").osis()).toEqual("Ps.1.1")
		expect(p.parse("ಕೀರ್ತನೆ 1:1").osis()).toEqual("Ps.1.1")
		expect(p.parse("ಕೀರ್ತ 1:1").osis()).toEqual("Ps.1.1")
		expect(p.parse("PS 1:1").osis()).toEqual("Ps.1.1")
		;
      return true;
    });
  });

  describe("Localized book PrAzar (kn)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser;
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    return it("should handle book: PrAzar (kn)", function() {
      
		expect(p.parse("PrAzar 1:1").osis()).toEqual("PrAzar.1.1")
		;
      return true;
    });
  });

  describe("Localized book Prov (kn)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser;
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    return it("should handle book: Prov (kn)", function() {
      
		expect(p.parse("ಜ್ಞಾನೋಕ್ತಿಗಳು 1:1").osis()).toEqual("Prov.1.1")
		expect(p.parse("ಜ್ಞಾನೋ 1:1").osis()).toEqual("Prov.1.1")
		expect(p.parse("Prov 1:1").osis()).toEqual("Prov.1.1")
		expect(p.parse("ಜ್ಞಾ 1:1").osis()).toEqual("Prov.1.1")
		p.include_apocrypha(false)
		expect(p.parse("ಜ್ಞಾನೋಕ್ತಿಗಳು 1:1").osis()).toEqual("Prov.1.1")
		expect(p.parse("ಜ್ಞಾನೋ 1:1").osis()).toEqual("Prov.1.1")
		expect(p.parse("PROV 1:1").osis()).toEqual("Prov.1.1")
		expect(p.parse("ಜ್ಞಾ 1:1").osis()).toEqual("Prov.1.1")
		;
      return true;
    });
  });

  describe("Localized book Eccl (kn)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser;
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    return it("should handle book: Eccl (kn)", function() {
      
		expect(p.parse("ಪ್ರಸಂಗಿ 1:1").osis()).toEqual("Eccl.1.1")
		expect(p.parse("Eccl 1:1").osis()).toEqual("Eccl.1.1")
		expect(p.parse("ಪ್ರಸ 1:1").osis()).toEqual("Eccl.1.1")
		p.include_apocrypha(false)
		expect(p.parse("ಪ್ರಸಂಗಿ 1:1").osis()).toEqual("Eccl.1.1")
		expect(p.parse("ECCL 1:1").osis()).toEqual("Eccl.1.1")
		expect(p.parse("ಪ್ರಸ 1:1").osis()).toEqual("Eccl.1.1")
		;
      return true;
    });
  });

  describe("Localized book SgThree (kn)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser;
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    return it("should handle book: SgThree (kn)", function() {
      
		expect(p.parse("SgThree 1:1").osis()).toEqual("SgThree.1.1")
		;
      return true;
    });
  });

  describe("Localized book Song (kn)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser;
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    return it("should handle book: Song (kn)", function() {
      
		expect(p.parse("ಪರಮಗೀತೆ 1:1").osis()).toEqual("Song.1.1")
		expect(p.parse("ಪರಮಗೀತ 1:1").osis()).toEqual("Song.1.1")
		expect(p.parse("ಪ.ಗೀ. 1:1").osis()).toEqual("Song.1.1")
		expect(p.parse("Song 1:1").osis()).toEqual("Song.1.1")
		expect(p.parse("ಪ.ಗೀ 1:1").osis()).toEqual("Song.1.1")
		expect(p.parse("ಪಗೀ. 1:1").osis()).toEqual("Song.1.1")
		expect(p.parse("ಪಗೀ 1:1").osis()).toEqual("Song.1.1")
		p.include_apocrypha(false)
		expect(p.parse("ಪರಮಗೀತೆ 1:1").osis()).toEqual("Song.1.1")
		expect(p.parse("ಪರಮಗೀತ 1:1").osis()).toEqual("Song.1.1")
		expect(p.parse("ಪ.ಗೀ. 1:1").osis()).toEqual("Song.1.1")
		expect(p.parse("SONG 1:1").osis()).toEqual("Song.1.1")
		expect(p.parse("ಪ.ಗೀ 1:1").osis()).toEqual("Song.1.1")
		expect(p.parse("ಪಗೀ. 1:1").osis()).toEqual("Song.1.1")
		expect(p.parse("ಪಗೀ 1:1").osis()).toEqual("Song.1.1")
		;
      return true;
    });
  });

  describe("Localized book Jer (kn)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser;
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    return it("should handle book: Jer (kn)", function() {
      
		expect(p.parse("ಪ್ರವಾದಿ ಯೆರೆಮೀಯನ ಗ್ರಂಥ 1:1").osis()).toEqual("Jer.1.1")
		expect(p.parse("ಯೆರೆಮೀಯ 1:1").osis()).toEqual("Jer.1.1")
		expect(p.parse("ಯೆರೆ 1:1").osis()).toEqual("Jer.1.1")
		expect(p.parse("Jer 1:1").osis()).toEqual("Jer.1.1")
		p.include_apocrypha(false)
		expect(p.parse("ಪ್ರವಾದಿ ಯೆರೆಮೀಯನ ಗ್ರಂಥ 1:1").osis()).toEqual("Jer.1.1")
		expect(p.parse("ಯೆರೆಮೀಯ 1:1").osis()).toEqual("Jer.1.1")
		expect(p.parse("ಯೆರೆ 1:1").osis()).toEqual("Jer.1.1")
		expect(p.parse("JER 1:1").osis()).toEqual("Jer.1.1")
		;
      return true;
    });
  });

  describe("Localized book Ezek (kn)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser;
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    return it("should handle book: Ezek (kn)", function() {
      
		expect(p.parse("ಪ್ರವಾದಿ ಯೆಜೆಕಿಯೇಲನ ಗ್ರಂಥ 1:1").osis()).toEqual("Ezek.1.1")
		expect(p.parse("ಯೆಹೆಜ್ಕೇಲ 1:1").osis()).toEqual("Ezek.1.1")
		expect(p.parse("Ezek 1:1").osis()).toEqual("Ezek.1.1")
		expect(p.parse("ಯೆಹೆ 1:1").osis()).toEqual("Ezek.1.1")
		p.include_apocrypha(false)
		expect(p.parse("ಪ್ರವಾದಿ ಯೆಜೆಕಿಯೇಲನ ಗ್ರಂಥ 1:1").osis()).toEqual("Ezek.1.1")
		expect(p.parse("ಯೆಹೆಜ್ಕೇಲ 1:1").osis()).toEqual("Ezek.1.1")
		expect(p.parse("EZEK 1:1").osis()).toEqual("Ezek.1.1")
		expect(p.parse("ಯೆಹೆ 1:1").osis()).toEqual("Ezek.1.1")
		;
      return true;
    });
  });

  describe("Localized book Dan (kn)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser;
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    return it("should handle book: Dan (kn)", function() {
      
		expect(p.parse("ಪ್ರವಾದಿ ದಾನಿಯೇಲನ ಗ್ರಂಥ 1:1").osis()).toEqual("Dan.1.1")
		expect(p.parse("ದಾನಿಯೇಲನು 1:1").osis()).toEqual("Dan.1.1")
		expect(p.parse("ದಾನಿ 1:1").osis()).toEqual("Dan.1.1")
		expect(p.parse("Dan 1:1").osis()).toEqual("Dan.1.1")
		p.include_apocrypha(false)
		expect(p.parse("ಪ್ರವಾದಿ ದಾನಿಯೇಲನ ಗ್ರಂಥ 1:1").osis()).toEqual("Dan.1.1")
		expect(p.parse("ದಾನಿಯೇಲನು 1:1").osis()).toEqual("Dan.1.1")
		expect(p.parse("ದಾನಿ 1:1").osis()).toEqual("Dan.1.1")
		expect(p.parse("DAN 1:1").osis()).toEqual("Dan.1.1")
		;
      return true;
    });
  });

  describe("Localized book Hos (kn)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser;
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    return it("should handle book: Hos (kn)", function() {
      
		expect(p.parse("ಪ್ರವಾದಿ ಹೋಶೇಯನ ಗ್ರಂಥ 1:1").osis()).toEqual("Hos.1.1")
		expect(p.parse("ಹೋಶೇಯ 1:1").osis()).toEqual("Hos.1.1")
		expect(p.parse("ಹೋಶೇ 1:1").osis()).toEqual("Hos.1.1")
		expect(p.parse("Hos 1:1").osis()).toEqual("Hos.1.1")
		p.include_apocrypha(false)
		expect(p.parse("ಪ್ರವಾದಿ ಹೋಶೇಯನ ಗ್ರಂಥ 1:1").osis()).toEqual("Hos.1.1")
		expect(p.parse("ಹೋಶೇಯ 1:1").osis()).toEqual("Hos.1.1")
		expect(p.parse("ಹೋಶೇ 1:1").osis()).toEqual("Hos.1.1")
		expect(p.parse("HOS 1:1").osis()).toEqual("Hos.1.1")
		;
      return true;
    });
  });

  describe("Localized book Joel (kn)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser;
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    return it("should handle book: Joel (kn)", function() {
      
		expect(p.parse("ಪ್ರವಾದಿ ಯೋವೇಲನ ಗ್ರಂಥ 1:1").osis()).toEqual("Joel.1.1")
		expect(p.parse("ಯೋವೇಲ 1:1").osis()).toEqual("Joel.1.1")
		expect(p.parse("Joel 1:1").osis()).toEqual("Joel.1.1")
		expect(p.parse("ಯೋವೇ 1:1").osis()).toEqual("Joel.1.1")
		p.include_apocrypha(false)
		expect(p.parse("ಪ್ರವಾದಿ ಯೋವೇಲನ ಗ್ರಂಥ 1:1").osis()).toEqual("Joel.1.1")
		expect(p.parse("ಯೋವೇಲ 1:1").osis()).toEqual("Joel.1.1")
		expect(p.parse("JOEL 1:1").osis()).toEqual("Joel.1.1")
		expect(p.parse("ಯೋವೇ 1:1").osis()).toEqual("Joel.1.1")
		;
      return true;
    });
  });

  describe("Localized book Amos (kn)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser;
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    return it("should handle book: Amos (kn)", function() {
      
		expect(p.parse("ಪ್ರವಾದಿ ಆಮೋಸನ ಗ್ರಂಥ 1:1").osis()).toEqual("Amos.1.1")
		expect(p.parse("Amos 1:1").osis()).toEqual("Amos.1.1")
		expect(p.parse("ಆಮೋಸ 1:1").osis()).toEqual("Amos.1.1")
		expect(p.parse("ಆಮೋ 1:1").osis()).toEqual("Amos.1.1")
		p.include_apocrypha(false)
		expect(p.parse("ಪ್ರವಾದಿ ಆಮೋಸನ ಗ್ರಂಥ 1:1").osis()).toEqual("Amos.1.1")
		expect(p.parse("AMOS 1:1").osis()).toEqual("Amos.1.1")
		expect(p.parse("ಆಮೋಸ 1:1").osis()).toEqual("Amos.1.1")
		expect(p.parse("ಆಮೋ 1:1").osis()).toEqual("Amos.1.1")
		;
      return true;
    });
  });

  describe("Localized book Obad (kn)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser;
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    return it("should handle book: Obad (kn)", function() {
      
		expect(p.parse("ಪ್ರವಾದಿ ಓಬದ್ಯನ ಗ್ರಂಥ 1:1").osis()).toEqual("Obad.1.1")
		expect(p.parse("ಓಬದ್ಯ 1:1").osis()).toEqual("Obad.1.1")
		expect(p.parse("Obad 1:1").osis()).toEqual("Obad.1.1")
		expect(p.parse("ಓಬ 1:1").osis()).toEqual("Obad.1.1")
		p.include_apocrypha(false)
		expect(p.parse("ಪ್ರವಾದಿ ಓಬದ್ಯನ ಗ್ರಂಥ 1:1").osis()).toEqual("Obad.1.1")
		expect(p.parse("ಓಬದ್ಯ 1:1").osis()).toEqual("Obad.1.1")
		expect(p.parse("OBAD 1:1").osis()).toEqual("Obad.1.1")
		expect(p.parse("ಓಬ 1:1").osis()).toEqual("Obad.1.1")
		;
      return true;
    });
  });

  describe("Localized book Jonah (kn)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser;
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    return it("should handle book: Jonah (kn)", function() {
      
		expect(p.parse("ಪ್ರವಾದಿ ಯೋನನ ಗ್ರಂಥ 1:1").osis()).toEqual("Jonah.1.1")
		expect(p.parse("Jonah 1:1").osis()).toEqual("Jonah.1.1")
		expect(p.parse("ಯೋನ 1:1").osis()).toEqual("Jonah.1.1")
		p.include_apocrypha(false)
		expect(p.parse("ಪ್ರವಾದಿ ಯೋನನ ಗ್ರಂಥ 1:1").osis()).toEqual("Jonah.1.1")
		expect(p.parse("JONAH 1:1").osis()).toEqual("Jonah.1.1")
		expect(p.parse("ಯೋನ 1:1").osis()).toEqual("Jonah.1.1")
		;
      return true;
    });
  });

  describe("Localized book Mic (kn)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser;
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    return it("should handle book: Mic (kn)", function() {
      
		expect(p.parse("ಪ್ರವಾದಿ ಮೀಕನ ಗ್ರಂಥ 1:1").osis()).toEqual("Mic.1.1")
		expect(p.parse("Mic 1:1").osis()).toEqual("Mic.1.1")
		expect(p.parse("ಮೀಕ 1:1").osis()).toEqual("Mic.1.1")
		p.include_apocrypha(false)
		expect(p.parse("ಪ್ರವಾದಿ ಮೀಕನ ಗ್ರಂಥ 1:1").osis()).toEqual("Mic.1.1")
		expect(p.parse("MIC 1:1").osis()).toEqual("Mic.1.1")
		expect(p.parse("ಮೀಕ 1:1").osis()).toEqual("Mic.1.1")
		;
      return true;
    });
  });

  describe("Localized book Nah (kn)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser;
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    return it("should handle book: Nah (kn)", function() {
      
		expect(p.parse("ಪ್ರವಾದಿ ನಹೂಮನ ಗ್ರಂಥ 1:1").osis()).toEqual("Nah.1.1")
		expect(p.parse("ನಹೂಮ 1:1").osis()).toEqual("Nah.1.1")
		expect(p.parse("Nah 1:1").osis()).toEqual("Nah.1.1")
		expect(p.parse("ನಹೂ 1:1").osis()).toEqual("Nah.1.1")
		p.include_apocrypha(false)
		expect(p.parse("ಪ್ರವಾದಿ ನಹೂಮನ ಗ್ರಂಥ 1:1").osis()).toEqual("Nah.1.1")
		expect(p.parse("ನಹೂಮ 1:1").osis()).toEqual("Nah.1.1")
		expect(p.parse("NAH 1:1").osis()).toEqual("Nah.1.1")
		expect(p.parse("ನಹೂ 1:1").osis()).toEqual("Nah.1.1")
		;
      return true;
    });
  });

  describe("Localized book Hab (kn)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser;
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    return it("should handle book: Hab (kn)", function() {
      
		expect(p.parse("ಪ್ರವಾದಿ ಹಬಕ್ಕೂಕನ ಗ್ರಂಥ 1:1").osis()).toEqual("Hab.1.1")
		expect(p.parse("ಹಬಕ್ಕೂಕ 1:1").osis()).toEqual("Hab.1.1")
		expect(p.parse("Hab 1:1").osis()).toEqual("Hab.1.1")
		expect(p.parse("ಹಬ 1:1").osis()).toEqual("Hab.1.1")
		p.include_apocrypha(false)
		expect(p.parse("ಪ್ರವಾದಿ ಹಬಕ್ಕೂಕನ ಗ್ರಂಥ 1:1").osis()).toEqual("Hab.1.1")
		expect(p.parse("ಹಬಕ್ಕೂಕ 1:1").osis()).toEqual("Hab.1.1")
		expect(p.parse("HAB 1:1").osis()).toEqual("Hab.1.1")
		expect(p.parse("ಹಬ 1:1").osis()).toEqual("Hab.1.1")
		;
      return true;
    });
  });

  describe("Localized book Zeph (kn)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser;
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    return it("should handle book: Zeph (kn)", function() {
      
		expect(p.parse("ಪ್ರವಾದಿ ಜೆಫನ್ಯನ ಗ್ರಂಥ 1:1").osis()).toEqual("Zeph.1.1")
		expect(p.parse("ಚೆಫನ್ಯ 1:1").osis()).toEqual("Zeph.1.1")
		expect(p.parse("Zeph 1:1").osis()).toEqual("Zeph.1.1")
		expect(p.parse("ಚೆಫ 1:1").osis()).toEqual("Zeph.1.1")
		p.include_apocrypha(false)
		expect(p.parse("ಪ್ರವಾದಿ ಜೆಫನ್ಯನ ಗ್ರಂಥ 1:1").osis()).toEqual("Zeph.1.1")
		expect(p.parse("ಚೆಫನ್ಯ 1:1").osis()).toEqual("Zeph.1.1")
		expect(p.parse("ZEPH 1:1").osis()).toEqual("Zeph.1.1")
		expect(p.parse("ಚೆಫ 1:1").osis()).toEqual("Zeph.1.1")
		;
      return true;
    });
  });

  describe("Localized book Hag (kn)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser;
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    return it("should handle book: Hag (kn)", function() {
      
		expect(p.parse("ಪ್ರವಾದಿ ಹಗ್ಗಾಯನ ಗ್ರಂಥ 1:1").osis()).toEqual("Hag.1.1")
		expect(p.parse("ಹಗ್ಗಾಯ 1:1").osis()).toEqual("Hag.1.1")
		expect(p.parse("ಹಗ್ಗಾ 1:1").osis()).toEqual("Hag.1.1")
		expect(p.parse("Hag 1:1").osis()).toEqual("Hag.1.1")
		p.include_apocrypha(false)
		expect(p.parse("ಪ್ರವಾದಿ ಹಗ್ಗಾಯನ ಗ್ರಂಥ 1:1").osis()).toEqual("Hag.1.1")
		expect(p.parse("ಹಗ್ಗಾಯ 1:1").osis()).toEqual("Hag.1.1")
		expect(p.parse("ಹಗ್ಗಾ 1:1").osis()).toEqual("Hag.1.1")
		expect(p.parse("HAG 1:1").osis()).toEqual("Hag.1.1")
		;
      return true;
    });
  });

  describe("Localized book Zech (kn)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser;
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    return it("should handle book: Zech (kn)", function() {
      
		expect(p.parse("ಪ್ರವಾದಿ ಜೆಕರ್ಯನ ಗ್ರಂಥ 1:1").osis()).toEqual("Zech.1.1")
		expect(p.parse("ಜೆಕರ್ಯ 1:1").osis()).toEqual("Zech.1.1")
		expect(p.parse("Zech 1:1").osis()).toEqual("Zech.1.1")
		expect(p.parse("ಜೆಕ 1:1").osis()).toEqual("Zech.1.1")
		p.include_apocrypha(false)
		expect(p.parse("ಪ್ರವಾದಿ ಜೆಕರ್ಯನ ಗ್ರಂಥ 1:1").osis()).toEqual("Zech.1.1")
		expect(p.parse("ಜೆಕರ್ಯ 1:1").osis()).toEqual("Zech.1.1")
		expect(p.parse("ZECH 1:1").osis()).toEqual("Zech.1.1")
		expect(p.parse("ಜೆಕ 1:1").osis()).toEqual("Zech.1.1")
		;
      return true;
    });
  });

  describe("Localized book Mal (kn)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser;
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    return it("should handle book: Mal (kn)", function() {
      
		expect(p.parse("ಪ್ರವಾದಿ ಮಲಾಕಿಯನ ಗ್ರಂಥ 1:1").osis()).toEqual("Mal.1.1")
		expect(p.parse("ಮಲಾಕಿಯ 1:1").osis()).toEqual("Mal.1.1")
		expect(p.parse("Mal 1:1").osis()).toEqual("Mal.1.1")
		expect(p.parse("ಮಲಾ 1:1").osis()).toEqual("Mal.1.1")
		p.include_apocrypha(false)
		expect(p.parse("ಪ್ರವಾದಿ ಮಲಾಕಿಯನ ಗ್ರಂಥ 1:1").osis()).toEqual("Mal.1.1")
		expect(p.parse("ಮಲಾಕಿಯ 1:1").osis()).toEqual("Mal.1.1")
		expect(p.parse("MAL 1:1").osis()).toEqual("Mal.1.1")
		expect(p.parse("ಮಲಾ 1:1").osis()).toEqual("Mal.1.1")
		;
      return true;
    });
  });

  describe("Localized book Matt (kn)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser;
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    return it("should handle book: Matt (kn)", function() {
      
		expect(p.parse("ಮತ್ತಾಯ 1:1").osis()).toEqual("Matt.1.1")
		expect(p.parse("ಮತ್ತಾ 1:1").osis()).toEqual("Matt.1.1")
		expect(p.parse("Matt 1:1").osis()).toEqual("Matt.1.1")
		p.include_apocrypha(false)
		expect(p.parse("ಮತ್ತಾಯ 1:1").osis()).toEqual("Matt.1.1")
		expect(p.parse("ಮತ್ತಾ 1:1").osis()).toEqual("Matt.1.1")
		expect(p.parse("MATT 1:1").osis()).toEqual("Matt.1.1")
		;
      return true;
    });
  });

  describe("Localized book Mark (kn)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser;
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    return it("should handle book: Mark (kn)", function() {
      
		expect(p.parse("ಮಾರ್ಕ 1:1").osis()).toEqual("Mark.1.1")
		expect(p.parse("Mark 1:1").osis()).toEqual("Mark.1.1")
		p.include_apocrypha(false)
		expect(p.parse("ಮಾರ್ಕ 1:1").osis()).toEqual("Mark.1.1")
		expect(p.parse("MARK 1:1").osis()).toEqual("Mark.1.1")
		;
      return true;
    });
  });

  describe("Localized book Luke (kn)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser;
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    return it("should handle book: Luke (kn)", function() {
      
		expect(p.parse("Luke 1:1").osis()).toEqual("Luke.1.1")
		expect(p.parse("ಲೂಕ 1:1").osis()).toEqual("Luke.1.1")
		p.include_apocrypha(false)
		expect(p.parse("LUKE 1:1").osis()).toEqual("Luke.1.1")
		expect(p.parse("ಲೂಕ 1:1").osis()).toEqual("Luke.1.1")
		;
      return true;
    });
  });

  describe("Localized book 1John (kn)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser;
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    it("should handle book: 1John (kn)", function() {
      
		expect(p.parse("1 ಯೊವಾನ್ನನು 1:1").osis()).toEqual("1John.1.1")
		expect(p.parse("೧ ಯೊವಾನ್ನನು 1:1").osis()).toEqual("1John.1.1")
		expect(p.parse("1 ಯೋಹಾನನು 1:1").osis()).toEqual("1John.1.1")
		expect(p.parse("1. ಯೋಹಾನ 1:1").osis()).toEqual("1John.1.1")
		expect(p.parse("1 ಯೋಹಾನ 1:1").osis()).toEqual("1John.1.1")
		expect(p.parse("೧ ಯೋಹಾನ 1:1").osis()).toEqual("1John.1.1")
		expect(p.parse("1 ಯೋಹಾ 1:1").osis()).toEqual("1John.1.1")
		expect(p.parse("1John 1:1").osis()).toEqual("1John.1.1")
		;
      return true;
    });
    return it("should handle non-Latin digits in book: 1John (kn)", function() {
      p.set_options({
        non_latin_digits_strategy: "replace"
      });
      
		expect(p.parse("1 ಯೊವಾನ್ನನು 1:1").osis()).toEqual("1John.1.1")
		expect(p.parse("೧ ಯೊವಾನ್ನನು 1:1").osis()).toEqual("1John.1.1")
		expect(p.parse("1 ಯೋಹಾನನು 1:1").osis()).toEqual("1John.1.1")
		expect(p.parse("1. ಯೋಹಾನ 1:1").osis()).toEqual("1John.1.1")
		expect(p.parse("1 ಯೋಹಾನ 1:1").osis()).toEqual("1John.1.1")
		expect(p.parse("೧ ಯೋಹಾನ 1:1").osis()).toEqual("1John.1.1")
		expect(p.parse("1 ಯೋಹಾ 1:1").osis()).toEqual("1John.1.1")
		expect(p.parse("1John 1:1").osis()).toEqual("1John.1.1")
		p.include_apocrypha(false)
		expect(p.parse("1 ಯೊವಾನ್ನನು 1:1").osis()).toEqual("1John.1.1")
		expect(p.parse("೧ ಯೊವಾನ್ನನು 1:1").osis()).toEqual("1John.1.1")
		expect(p.parse("1 ಯೋಹಾನನು 1:1").osis()).toEqual("1John.1.1")
		expect(p.parse("1. ಯೋಹಾನ 1:1").osis()).toEqual("1John.1.1")
		expect(p.parse("1 ಯೋಹಾನ 1:1").osis()).toEqual("1John.1.1")
		expect(p.parse("೧ ಯೋಹಾನ 1:1").osis()).toEqual("1John.1.1")
		expect(p.parse("1 ಯೋಹಾ 1:1").osis()).toEqual("1John.1.1")
		expect(p.parse("1JOHN 1:1").osis()).toEqual("1John.1.1")
		;
      return true;
    });
  });

  describe("Localized book 2John (kn)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser;
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    it("should handle book: 2John (kn)", function() {
      
		expect(p.parse("2 ಯೊವಾನ್ನನು 1:1").osis()).toEqual("2John.1.1")
		expect(p.parse("೨ ಯೊವಾನ್ನನು 1:1").osis()).toEqual("2John.1.1")
		expect(p.parse("2 ಯೋಹಾನನು 1:1").osis()).toEqual("2John.1.1")
		expect(p.parse("2. ಯೋಹಾನ 1:1").osis()).toEqual("2John.1.1")
		expect(p.parse("2 ಯೋಹಾನ 1:1").osis()).toEqual("2John.1.1")
		expect(p.parse("೨ ಯೋಹಾನ 1:1").osis()).toEqual("2John.1.1")
		expect(p.parse("2 ಯೋಹಾ 1:1").osis()).toEqual("2John.1.1")
		expect(p.parse("2John 1:1").osis()).toEqual("2John.1.1")
		;
      return true;
    });
    return it("should handle non-Latin digits in book: 2John (kn)", function() {
      p.set_options({
        non_latin_digits_strategy: "replace"
      });
      
		expect(p.parse("2 ಯೊವಾನ್ನನು 1:1").osis()).toEqual("2John.1.1")
		expect(p.parse("೨ ಯೊವಾನ್ನನು 1:1").osis()).toEqual("2John.1.1")
		expect(p.parse("2 ಯೋಹಾನನು 1:1").osis()).toEqual("2John.1.1")
		expect(p.parse("2. ಯೋಹಾನ 1:1").osis()).toEqual("2John.1.1")
		expect(p.parse("2 ಯೋಹಾನ 1:1").osis()).toEqual("2John.1.1")
		expect(p.parse("೨ ಯೋಹಾನ 1:1").osis()).toEqual("2John.1.1")
		expect(p.parse("2 ಯೋಹಾ 1:1").osis()).toEqual("2John.1.1")
		expect(p.parse("2John 1:1").osis()).toEqual("2John.1.1")
		p.include_apocrypha(false)
		expect(p.parse("2 ಯೊವಾನ್ನನು 1:1").osis()).toEqual("2John.1.1")
		expect(p.parse("೨ ಯೊವಾನ್ನನು 1:1").osis()).toEqual("2John.1.1")
		expect(p.parse("2 ಯೋಹಾನನು 1:1").osis()).toEqual("2John.1.1")
		expect(p.parse("2. ಯೋಹಾನ 1:1").osis()).toEqual("2John.1.1")
		expect(p.parse("2 ಯೋಹಾನ 1:1").osis()).toEqual("2John.1.1")
		expect(p.parse("೨ ಯೋಹಾನ 1:1").osis()).toEqual("2John.1.1")
		expect(p.parse("2 ಯೋಹಾ 1:1").osis()).toEqual("2John.1.1")
		expect(p.parse("2JOHN 1:1").osis()).toEqual("2John.1.1")
		;
      return true;
    });
  });

  describe("Localized book 3John (kn)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser;
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    it("should handle book: 3John (kn)", function() {
      
		expect(p.parse("3 ಯೊವಾನ್ನನು 1:1").osis()).toEqual("3John.1.1")
		expect(p.parse("೩ ಯೊವಾನ್ನನು 1:1").osis()).toEqual("3John.1.1")
		expect(p.parse("3 ಯೋಹಾನನು 1:1").osis()).toEqual("3John.1.1")
		expect(p.parse("3. ಯೋಹಾನ 1:1").osis()).toEqual("3John.1.1")
		expect(p.parse("3 ಯೋಹಾನ 1:1").osis()).toEqual("3John.1.1")
		expect(p.parse("೩ ಯೋಹಾನ 1:1").osis()).toEqual("3John.1.1")
		expect(p.parse("3 ಯೋಹಾ 1:1").osis()).toEqual("3John.1.1")
		expect(p.parse("3John 1:1").osis()).toEqual("3John.1.1")
		;
      return true;
    });
    return it("should handle non-Latin digits in book: 3John (kn)", function() {
      p.set_options({
        non_latin_digits_strategy: "replace"
      });
      
		expect(p.parse("3 ಯೊವಾನ್ನನು 1:1").osis()).toEqual("3John.1.1")
		expect(p.parse("೩ ಯೊವಾನ್ನನು 1:1").osis()).toEqual("3John.1.1")
		expect(p.parse("3 ಯೋಹಾನನು 1:1").osis()).toEqual("3John.1.1")
		expect(p.parse("3. ಯೋಹಾನ 1:1").osis()).toEqual("3John.1.1")
		expect(p.parse("3 ಯೋಹಾನ 1:1").osis()).toEqual("3John.1.1")
		expect(p.parse("೩ ಯೋಹಾನ 1:1").osis()).toEqual("3John.1.1")
		expect(p.parse("3 ಯೋಹಾ 1:1").osis()).toEqual("3John.1.1")
		expect(p.parse("3John 1:1").osis()).toEqual("3John.1.1")
		p.include_apocrypha(false)
		expect(p.parse("3 ಯೊವಾನ್ನನು 1:1").osis()).toEqual("3John.1.1")
		expect(p.parse("೩ ಯೊವಾನ್ನನು 1:1").osis()).toEqual("3John.1.1")
		expect(p.parse("3 ಯೋಹಾನನು 1:1").osis()).toEqual("3John.1.1")
		expect(p.parse("3. ಯೋಹಾನ 1:1").osis()).toEqual("3John.1.1")
		expect(p.parse("3 ಯೋಹಾನ 1:1").osis()).toEqual("3John.1.1")
		expect(p.parse("೩ ಯೋಹಾನ 1:1").osis()).toEqual("3John.1.1")
		expect(p.parse("3 ಯೋಹಾ 1:1").osis()).toEqual("3John.1.1")
		expect(p.parse("3JOHN 1:1").osis()).toEqual("3John.1.1")
		;
      return true;
    });
  });

  describe("Localized book John (kn)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser;
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    return it("should handle book: John (kn)", function() {
      
		expect(p.parse("ಯೊವಾನ್ನ 1:1").osis()).toEqual("John.1.1")
		expect(p.parse("ಯೋಹಾನ 1:1").osis()).toEqual("John.1.1")
		expect(p.parse("John 1:1").osis()).toEqual("John.1.1")
		expect(p.parse("ಯೋಹಾ 1:1").osis()).toEqual("John.1.1")
		p.include_apocrypha(false)
		expect(p.parse("ಯೊವಾನ್ನ 1:1").osis()).toEqual("John.1.1")
		expect(p.parse("ಯೋಹಾನ 1:1").osis()).toEqual("John.1.1")
		expect(p.parse("JOHN 1:1").osis()).toEqual("John.1.1")
		expect(p.parse("ಯೋಹಾ 1:1").osis()).toEqual("John.1.1")
		;
      return true;
    });
  });

  describe("Localized book Acts (kn)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser;
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    return it("should handle book: Acts (kn)", function() {
      
		expect(p.parse("ಪ್ರೇಷಿತರ ಕಾರ್ಯಕಲಾಪಗಳು 1:1").osis()).toEqual("Acts.1.1")
		expect(p.parse("ಅಪೊಸ್ತಲರ ಕೃತ್ಯಗಳು 1:1").osis()).toEqual("Acts.1.1")
		expect(p.parse("ಅ. ಕೃ. 1:1").osis()).toEqual("Acts.1.1")
		expect(p.parse("ಅ ಕೃ. 1:1").osis()).toEqual("Acts.1.1")
		expect(p.parse("ಅ. ಕೃ 1:1").osis()).toEqual("Acts.1.1")
		expect(p.parse("Acts 1:1").osis()).toEqual("Acts.1.1")
		expect(p.parse("ಅ ಕೃ 1:1").osis()).toEqual("Acts.1.1")
		p.include_apocrypha(false)
		expect(p.parse("ಪ್ರೇಷಿತರ ಕಾರ್ಯಕಲಾಪಗಳು 1:1").osis()).toEqual("Acts.1.1")
		expect(p.parse("ಅಪೊಸ್ತಲರ ಕೃತ್ಯಗಳು 1:1").osis()).toEqual("Acts.1.1")
		expect(p.parse("ಅ. ಕೃ. 1:1").osis()).toEqual("Acts.1.1")
		expect(p.parse("ಅ ಕೃ. 1:1").osis()).toEqual("Acts.1.1")
		expect(p.parse("ಅ. ಕೃ 1:1").osis()).toEqual("Acts.1.1")
		expect(p.parse("ACTS 1:1").osis()).toEqual("Acts.1.1")
		expect(p.parse("ಅ ಕೃ 1:1").osis()).toEqual("Acts.1.1")
		;
      return true;
    });
  });

  describe("Localized book Rom (kn)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser;
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    return it("should handle book: Rom (kn)", function() {
      
		expect(p.parse("ರೋಮಾಪುರದವರಿಗೆ 1:1").osis()).toEqual("Rom.1.1")
		expect(p.parse("ರೋಮನರಿಗೆ 1:1").osis()).toEqual("Rom.1.1")
		expect(p.parse("ರೋಮಾ 1:1").osis()).toEqual("Rom.1.1")
		expect(p.parse("Rom 1:1").osis()).toEqual("Rom.1.1")
		expect(p.parse("ರೋಮ 1:1").osis()).toEqual("Rom.1.1")
		p.include_apocrypha(false)
		expect(p.parse("ರೋಮಾಪುರದವರಿಗೆ 1:1").osis()).toEqual("Rom.1.1")
		expect(p.parse("ರೋಮನರಿಗೆ 1:1").osis()).toEqual("Rom.1.1")
		expect(p.parse("ರೋಮಾ 1:1").osis()).toEqual("Rom.1.1")
		expect(p.parse("ROM 1:1").osis()).toEqual("Rom.1.1")
		expect(p.parse("ರೋಮ 1:1").osis()).toEqual("Rom.1.1")
		;
      return true;
    });
  });

  describe("Localized book 2Cor (kn)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser;
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    it("should handle book: 2Cor (kn)", function() {
      
		expect(p.parse("2 ಕೊರಿಂಥದವರಿಗೆ 1:1").osis()).toEqual("2Cor.1.1")
		expect(p.parse("2 ಕೊರಿಂಥಿಯರಿಗೆ 1:1").osis()).toEqual("2Cor.1.1")
		expect(p.parse("೨ ಕೊರಿಂಥಿಯರಿಗೆ 1:1").osis()).toEqual("2Cor.1.1")
		expect(p.parse("2. ಕೊರಿಂಥ 1:1").osis()).toEqual("2Cor.1.1")
		expect(p.parse("2 ಕೊರಿಂಥ 1:1").osis()).toEqual("2Cor.1.1")
		expect(p.parse("೨ ಕೊರಿಂಥ 1:1").osis()).toEqual("2Cor.1.1")
		expect(p.parse("2 ಕೊರಿ 1:1").osis()).toEqual("2Cor.1.1")
		expect(p.parse("2Cor 1:1").osis()).toEqual("2Cor.1.1")
		;
      return true;
    });
    return it("should handle non-Latin digits in book: 2Cor (kn)", function() {
      p.set_options({
        non_latin_digits_strategy: "replace"
      });
      
		expect(p.parse("2 ಕೊರಿಂಥದವರಿಗೆ 1:1").osis()).toEqual("2Cor.1.1")
		expect(p.parse("2 ಕೊರಿಂಥಿಯರಿಗೆ 1:1").osis()).toEqual("2Cor.1.1")
		expect(p.parse("೨ ಕೊರಿಂಥಿಯರಿಗೆ 1:1").osis()).toEqual("2Cor.1.1")
		expect(p.parse("2. ಕೊರಿಂಥ 1:1").osis()).toEqual("2Cor.1.1")
		expect(p.parse("2 ಕೊರಿಂಥ 1:1").osis()).toEqual("2Cor.1.1")
		expect(p.parse("೨ ಕೊರಿಂಥ 1:1").osis()).toEqual("2Cor.1.1")
		expect(p.parse("2 ಕೊರಿ 1:1").osis()).toEqual("2Cor.1.1")
		expect(p.parse("2Cor 1:1").osis()).toEqual("2Cor.1.1")
		p.include_apocrypha(false)
		expect(p.parse("2 ಕೊರಿಂಥದವರಿಗೆ 1:1").osis()).toEqual("2Cor.1.1")
		expect(p.parse("2 ಕೊರಿಂಥಿಯರಿಗೆ 1:1").osis()).toEqual("2Cor.1.1")
		expect(p.parse("೨ ಕೊರಿಂಥಿಯರಿಗೆ 1:1").osis()).toEqual("2Cor.1.1")
		expect(p.parse("2. ಕೊರಿಂಥ 1:1").osis()).toEqual("2Cor.1.1")
		expect(p.parse("2 ಕೊರಿಂಥ 1:1").osis()).toEqual("2Cor.1.1")
		expect(p.parse("೨ ಕೊರಿಂಥ 1:1").osis()).toEqual("2Cor.1.1")
		expect(p.parse("2 ಕೊರಿ 1:1").osis()).toEqual("2Cor.1.1")
		expect(p.parse("2COR 1:1").osis()).toEqual("2Cor.1.1")
		;
      return true;
    });
  });

  describe("Localized book 1Cor (kn)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser;
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    it("should handle book: 1Cor (kn)", function() {
      
		expect(p.parse("1 ಕೊರಿಂಥದವರಿಗೆ 1:1").osis()).toEqual("1Cor.1.1")
		expect(p.parse("1 ಕೊರಿಂಥಿಯರಿಗೆ 1:1").osis()).toEqual("1Cor.1.1")
		expect(p.parse("೧ ಕೊರಿಂಥಿಯರಿಗೆ 1:1").osis()).toEqual("1Cor.1.1")
		expect(p.parse("1. ಕೊರಿಂಥ 1:1").osis()).toEqual("1Cor.1.1")
		expect(p.parse("1 ಕೊರಿಂಥ 1:1").osis()).toEqual("1Cor.1.1")
		expect(p.parse("೧ ಕೊರಿಂಥ 1:1").osis()).toEqual("1Cor.1.1")
		expect(p.parse("1 ಕೊರಿ 1:1").osis()).toEqual("1Cor.1.1")
		expect(p.parse("1Cor 1:1").osis()).toEqual("1Cor.1.1")
		;
      return true;
    });
    return it("should handle non-Latin digits in book: 1Cor (kn)", function() {
      p.set_options({
        non_latin_digits_strategy: "replace"
      });
      
		expect(p.parse("1 ಕೊರಿಂಥದವರಿಗೆ 1:1").osis()).toEqual("1Cor.1.1")
		expect(p.parse("1 ಕೊರಿಂಥಿಯರಿಗೆ 1:1").osis()).toEqual("1Cor.1.1")
		expect(p.parse("೧ ಕೊರಿಂಥಿಯರಿಗೆ 1:1").osis()).toEqual("1Cor.1.1")
		expect(p.parse("1. ಕೊರಿಂಥ 1:1").osis()).toEqual("1Cor.1.1")
		expect(p.parse("1 ಕೊರಿಂಥ 1:1").osis()).toEqual("1Cor.1.1")
		expect(p.parse("೧ ಕೊರಿಂಥ 1:1").osis()).toEqual("1Cor.1.1")
		expect(p.parse("1 ಕೊರಿ 1:1").osis()).toEqual("1Cor.1.1")
		expect(p.parse("1Cor 1:1").osis()).toEqual("1Cor.1.1")
		p.include_apocrypha(false)
		expect(p.parse("1 ಕೊರಿಂಥದವರಿಗೆ 1:1").osis()).toEqual("1Cor.1.1")
		expect(p.parse("1 ಕೊರಿಂಥಿಯರಿಗೆ 1:1").osis()).toEqual("1Cor.1.1")
		expect(p.parse("೧ ಕೊರಿಂಥಿಯರಿಗೆ 1:1").osis()).toEqual("1Cor.1.1")
		expect(p.parse("1. ಕೊರಿಂಥ 1:1").osis()).toEqual("1Cor.1.1")
		expect(p.parse("1 ಕೊರಿಂಥ 1:1").osis()).toEqual("1Cor.1.1")
		expect(p.parse("೧ ಕೊರಿಂಥ 1:1").osis()).toEqual("1Cor.1.1")
		expect(p.parse("1 ಕೊರಿ 1:1").osis()).toEqual("1Cor.1.1")
		expect(p.parse("1COR 1:1").osis()).toEqual("1Cor.1.1")
		;
      return true;
    });
  });

  describe("Localized book Gal (kn)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser;
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    return it("should handle book: Gal (kn)", function() {
      
		expect(p.parse("ಗಲಾತ್ಯದವರಿಗೆ 1:1").osis()).toEqual("Gal.1.1")
		expect(p.parse("ಗಲಾತ್ಯರಿಗೆ 1:1").osis()).toEqual("Gal.1.1")
		expect(p.parse("ಗಲಾತ್ಯ 1:1").osis()).toEqual("Gal.1.1")
		expect(p.parse("Gal 1:1").osis()).toEqual("Gal.1.1")
		expect(p.parse("ಗಲಾ 1:1").osis()).toEqual("Gal.1.1")
		p.include_apocrypha(false)
		expect(p.parse("ಗಲಾತ್ಯದವರಿಗೆ 1:1").osis()).toEqual("Gal.1.1")
		expect(p.parse("ಗಲಾತ್ಯರಿಗೆ 1:1").osis()).toEqual("Gal.1.1")
		expect(p.parse("ಗಲಾತ್ಯ 1:1").osis()).toEqual("Gal.1.1")
		expect(p.parse("GAL 1:1").osis()).toEqual("Gal.1.1")
		expect(p.parse("ಗಲಾ 1:1").osis()).toEqual("Gal.1.1")
		;
      return true;
    });
  });

  describe("Localized book Eph (kn)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser;
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    return it("should handle book: Eph (kn)", function() {
      
		expect(p.parse("ಎಫೆಸದವರಿಗೆ 1:1").osis()).toEqual("Eph.1.1")
		expect(p.parse("ಎಫೆಸಿಯರಿಗೆ 1:1").osis()).toEqual("Eph.1.1")
		expect(p.parse("ಎಫೆಸ 1:1").osis()).toEqual("Eph.1.1")
		expect(p.parse("Eph 1:1").osis()).toEqual("Eph.1.1")
		expect(p.parse("ಎಫೆ 1:1").osis()).toEqual("Eph.1.1")
		p.include_apocrypha(false)
		expect(p.parse("ಎಫೆಸದವರಿಗೆ 1:1").osis()).toEqual("Eph.1.1")
		expect(p.parse("ಎಫೆಸಿಯರಿಗೆ 1:1").osis()).toEqual("Eph.1.1")
		expect(p.parse("ಎಫೆಸ 1:1").osis()).toEqual("Eph.1.1")
		expect(p.parse("EPH 1:1").osis()).toEqual("Eph.1.1")
		expect(p.parse("ಎಫೆ 1:1").osis()).toEqual("Eph.1.1")
		;
      return true;
    });
  });

  describe("Localized book Phil (kn)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser;
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    return it("should handle book: Phil (kn)", function() {
      
		expect(p.parse("ಫಿಲಿಪ್ಪಿಯವರಿಗೆ 1:1").osis()).toEqual("Phil.1.1")
		expect(p.parse("ಫಿಲಿಪ್ಪಿಯರಿಗೆ 1:1").osis()).toEqual("Phil.1.1")
		expect(p.parse("ಫಿಲಿಪ್ಪಿ 1:1").osis()).toEqual("Phil.1.1")
		expect(p.parse("Phil 1:1").osis()).toEqual("Phil.1.1")
		expect(p.parse("ಫಿಲಿ 1:1").osis()).toEqual("Phil.1.1")
		p.include_apocrypha(false)
		expect(p.parse("ಫಿಲಿಪ್ಪಿಯವರಿಗೆ 1:1").osis()).toEqual("Phil.1.1")
		expect(p.parse("ಫಿಲಿಪ್ಪಿಯರಿಗೆ 1:1").osis()).toEqual("Phil.1.1")
		expect(p.parse("ಫಿಲಿಪ್ಪಿ 1:1").osis()).toEqual("Phil.1.1")
		expect(p.parse("PHIL 1:1").osis()).toEqual("Phil.1.1")
		expect(p.parse("ಫಿಲಿ 1:1").osis()).toEqual("Phil.1.1")
		;
      return true;
    });
  });

  describe("Localized book Col (kn)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser;
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    return it("should handle book: Col (kn)", function() {
      
		expect(p.parse("ಕೊಲೊಸ್ಸೆಯವರಿಗೆ 1:1").osis()).toEqual("Col.1.1")
		expect(p.parse("ಕೊಲೊಸ್ಸೆಯರಿಗೆ 1:1").osis()).toEqual("Col.1.1")
		expect(p.parse("ಕೊಲೊ 1:1").osis()).toEqual("Col.1.1")
		expect(p.parse("Col 1:1").osis()).toEqual("Col.1.1")
		p.include_apocrypha(false)
		expect(p.parse("ಕೊಲೊಸ್ಸೆಯವರಿಗೆ 1:1").osis()).toEqual("Col.1.1")
		expect(p.parse("ಕೊಲೊಸ್ಸೆಯರಿಗೆ 1:1").osis()).toEqual("Col.1.1")
		expect(p.parse("ಕೊಲೊ 1:1").osis()).toEqual("Col.1.1")
		expect(p.parse("COL 1:1").osis()).toEqual("Col.1.1")
		;
      return true;
    });
  });

  describe("Localized book 2Thess (kn)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser;
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    it("should handle book: 2Thess (kn)", function() {
      
		expect(p.parse("2 ಥೆಸಲೋನಿಕದವರಿಗೆ 1:1").osis()).toEqual("2Thess.1.1")
		expect(p.parse("2 ಥೆಸಲೋನಿಯರಿಗೆ 1:1").osis()).toEqual("2Thess.1.1")
		expect(p.parse("೨ ಥೆಸಲೋನಿಯರಿಗೆ 1:1").osis()).toEqual("2Thess.1.1")
		expect(p.parse("2Thess 1:1").osis()).toEqual("2Thess.1.1")
		expect(p.parse("2 ಥೆಸ 1:1").osis()).toEqual("2Thess.1.1")
		;
      return true;
    });
    return it("should handle non-Latin digits in book: 2Thess (kn)", function() {
      p.set_options({
        non_latin_digits_strategy: "replace"
      });
      
		expect(p.parse("2 ಥೆಸಲೋನಿಕದವರಿಗೆ 1:1").osis()).toEqual("2Thess.1.1")
		expect(p.parse("2 ಥೆಸಲೋನಿಯರಿಗೆ 1:1").osis()).toEqual("2Thess.1.1")
		expect(p.parse("೨ ಥೆಸಲೋನಿಯರಿಗೆ 1:1").osis()).toEqual("2Thess.1.1")
		expect(p.parse("2Thess 1:1").osis()).toEqual("2Thess.1.1")
		expect(p.parse("2 ಥೆಸ 1:1").osis()).toEqual("2Thess.1.1")
		p.include_apocrypha(false)
		expect(p.parse("2 ಥೆಸಲೋನಿಕದವರಿಗೆ 1:1").osis()).toEqual("2Thess.1.1")
		expect(p.parse("2 ಥೆಸಲೋನಿಯರಿಗೆ 1:1").osis()).toEqual("2Thess.1.1")
		expect(p.parse("೨ ಥೆಸಲೋನಿಯರಿಗೆ 1:1").osis()).toEqual("2Thess.1.1")
		expect(p.parse("2THESS 1:1").osis()).toEqual("2Thess.1.1")
		expect(p.parse("2 ಥೆಸ 1:1").osis()).toEqual("2Thess.1.1")
		;
      return true;
    });
  });

  describe("Localized book 1Thess (kn)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser;
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    it("should handle book: 1Thess (kn)", function() {
      
		expect(p.parse("1 ಥೆಸಲೋನಿಕದವರಿಗೆ 1:1").osis()).toEqual("1Thess.1.1")
		expect(p.parse("1 ಥೆಸಲೋನಿಯರಿಗೆ 1:1").osis()).toEqual("1Thess.1.1")
		expect(p.parse("೧ ಥೆಸಲೋನಿಯರಿಗೆ 1:1").osis()).toEqual("1Thess.1.1")
		expect(p.parse("1Thess 1:1").osis()).toEqual("1Thess.1.1")
		expect(p.parse("1 ಥೆಸ 1:1").osis()).toEqual("1Thess.1.1")
		;
      return true;
    });
    return it("should handle non-Latin digits in book: 1Thess (kn)", function() {
      p.set_options({
        non_latin_digits_strategy: "replace"
      });
      
		expect(p.parse("1 ಥೆಸಲೋನಿಕದವರಿಗೆ 1:1").osis()).toEqual("1Thess.1.1")
		expect(p.parse("1 ಥೆಸಲೋನಿಯರಿಗೆ 1:1").osis()).toEqual("1Thess.1.1")
		expect(p.parse("೧ ಥೆಸಲೋನಿಯರಿಗೆ 1:1").osis()).toEqual("1Thess.1.1")
		expect(p.parse("1Thess 1:1").osis()).toEqual("1Thess.1.1")
		expect(p.parse("1 ಥೆಸ 1:1").osis()).toEqual("1Thess.1.1")
		p.include_apocrypha(false)
		expect(p.parse("1 ಥೆಸಲೋನಿಕದವರಿಗೆ 1:1").osis()).toEqual("1Thess.1.1")
		expect(p.parse("1 ಥೆಸಲೋನಿಯರಿಗೆ 1:1").osis()).toEqual("1Thess.1.1")
		expect(p.parse("೧ ಥೆಸಲೋನಿಯರಿಗೆ 1:1").osis()).toEqual("1Thess.1.1")
		expect(p.parse("1THESS 1:1").osis()).toEqual("1Thess.1.1")
		expect(p.parse("1 ಥೆಸ 1:1").osis()).toEqual("1Thess.1.1")
		;
      return true;
    });
  });

  describe("Localized book 2Tim (kn)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser;
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    it("should handle book: 2Tim (kn)", function() {
      
		expect(p.parse("2 ತಿಮೊಥೆಯನಿಗೆ 1:1").osis()).toEqual("2Tim.1.1")
		expect(p.parse("2 ತಿಮೊಥೇಯನಿಗೆ 1:1").osis()).toEqual("2Tim.1.1")
		expect(p.parse("೨ ತಿಮೊಥೇಯನಿಗೆ 1:1").osis()).toEqual("2Tim.1.1")
		expect(p.parse("2. ತಿಮೊಥಿ 1:1").osis()).toEqual("2Tim.1.1")
		expect(p.parse("2 ತಿಮೊಥಿ 1:1").osis()).toEqual("2Tim.1.1")
		expect(p.parse("೨ ತಿಮೊಥಿ 1:1").osis()).toEqual("2Tim.1.1")
		expect(p.parse("2 ತಿಮೊ 1:1").osis()).toEqual("2Tim.1.1")
		expect(p.parse("2Tim 1:1").osis()).toEqual("2Tim.1.1")
		;
      return true;
    });
    return it("should handle non-Latin digits in book: 2Tim (kn)", function() {
      p.set_options({
        non_latin_digits_strategy: "replace"
      });
      
		expect(p.parse("2 ತಿಮೊಥೆಯನಿಗೆ 1:1").osis()).toEqual("2Tim.1.1")
		expect(p.parse("2 ತಿಮೊಥೇಯನಿಗೆ 1:1").osis()).toEqual("2Tim.1.1")
		expect(p.parse("೨ ತಿಮೊಥೇಯನಿಗೆ 1:1").osis()).toEqual("2Tim.1.1")
		expect(p.parse("2. ತಿಮೊಥಿ 1:1").osis()).toEqual("2Tim.1.1")
		expect(p.parse("2 ತಿಮೊಥಿ 1:1").osis()).toEqual("2Tim.1.1")
		expect(p.parse("೨ ತಿಮೊಥಿ 1:1").osis()).toEqual("2Tim.1.1")
		expect(p.parse("2 ತಿಮೊ 1:1").osis()).toEqual("2Tim.1.1")
		expect(p.parse("2Tim 1:1").osis()).toEqual("2Tim.1.1")
		p.include_apocrypha(false)
		expect(p.parse("2 ತಿಮೊಥೆಯನಿಗೆ 1:1").osis()).toEqual("2Tim.1.1")
		expect(p.parse("2 ತಿಮೊಥೇಯನಿಗೆ 1:1").osis()).toEqual("2Tim.1.1")
		expect(p.parse("೨ ತಿಮೊಥೇಯನಿಗೆ 1:1").osis()).toEqual("2Tim.1.1")
		expect(p.parse("2. ತಿಮೊಥಿ 1:1").osis()).toEqual("2Tim.1.1")
		expect(p.parse("2 ತಿಮೊಥಿ 1:1").osis()).toEqual("2Tim.1.1")
		expect(p.parse("೨ ತಿಮೊಥಿ 1:1").osis()).toEqual("2Tim.1.1")
		expect(p.parse("2 ತಿಮೊ 1:1").osis()).toEqual("2Tim.1.1")
		expect(p.parse("2TIM 1:1").osis()).toEqual("2Tim.1.1")
		;
      return true;
    });
  });

  describe("Localized book 1Tim (kn)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser;
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    it("should handle book: 1Tim (kn)", function() {
      
		expect(p.parse("1 ತಿಮೊಥೆಯನಿಗೆ 1:1").osis()).toEqual("1Tim.1.1")
		expect(p.parse("1 ತಿಮೊಥೇಯನಿಗೆ 1:1").osis()).toEqual("1Tim.1.1")
		expect(p.parse("೧ ತಿಮೊಥೇಯನಿಗೆ 1:1").osis()).toEqual("1Tim.1.1")
		expect(p.parse("1. ತಿಮೊಥಿ 1:1").osis()).toEqual("1Tim.1.1")
		expect(p.parse("1 ತಿಮೊಥಿ 1:1").osis()).toEqual("1Tim.1.1")
		expect(p.parse("೧ ತಿಮೊಥಿ 1:1").osis()).toEqual("1Tim.1.1")
		expect(p.parse("1 ತಿಮೊ 1:1").osis()).toEqual("1Tim.1.1")
		expect(p.parse("1Tim 1:1").osis()).toEqual("1Tim.1.1")
		;
      return true;
    });
    return it("should handle non-Latin digits in book: 1Tim (kn)", function() {
      p.set_options({
        non_latin_digits_strategy: "replace"
      });
      
		expect(p.parse("1 ತಿಮೊಥೆಯನಿಗೆ 1:1").osis()).toEqual("1Tim.1.1")
		expect(p.parse("1 ತಿಮೊಥೇಯನಿಗೆ 1:1").osis()).toEqual("1Tim.1.1")
		expect(p.parse("೧ ತಿಮೊಥೇಯನಿಗೆ 1:1").osis()).toEqual("1Tim.1.1")
		expect(p.parse("1. ತಿಮೊಥಿ 1:1").osis()).toEqual("1Tim.1.1")
		expect(p.parse("1 ತಿಮೊಥಿ 1:1").osis()).toEqual("1Tim.1.1")
		expect(p.parse("೧ ತಿಮೊಥಿ 1:1").osis()).toEqual("1Tim.1.1")
		expect(p.parse("1 ತಿಮೊ 1:1").osis()).toEqual("1Tim.1.1")
		expect(p.parse("1Tim 1:1").osis()).toEqual("1Tim.1.1")
		p.include_apocrypha(false)
		expect(p.parse("1 ತಿಮೊಥೆಯನಿಗೆ 1:1").osis()).toEqual("1Tim.1.1")
		expect(p.parse("1 ತಿಮೊಥೇಯನಿಗೆ 1:1").osis()).toEqual("1Tim.1.1")
		expect(p.parse("೧ ತಿಮೊಥೇಯನಿಗೆ 1:1").osis()).toEqual("1Tim.1.1")
		expect(p.parse("1. ತಿಮೊಥಿ 1:1").osis()).toEqual("1Tim.1.1")
		expect(p.parse("1 ತಿಮೊಥಿ 1:1").osis()).toEqual("1Tim.1.1")
		expect(p.parse("೧ ತಿಮೊಥಿ 1:1").osis()).toEqual("1Tim.1.1")
		expect(p.parse("1 ತಿಮೊ 1:1").osis()).toEqual("1Tim.1.1")
		expect(p.parse("1TIM 1:1").osis()).toEqual("1Tim.1.1")
		;
      return true;
    });
  });

  describe("Localized book Titus (kn)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser;
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    return it("should handle book: Titus (kn)", function() {
      
		expect(p.parse("ತೀತನಿಗೆ 1:1").osis()).toEqual("Titus.1.1")
		expect(p.parse("Titus 1:1").osis()).toEqual("Titus.1.1")
		expect(p.parse("ತೀತ 1:1").osis()).toEqual("Titus.1.1")
		p.include_apocrypha(false)
		expect(p.parse("ತೀತನಿಗೆ 1:1").osis()).toEqual("Titus.1.1")
		expect(p.parse("TITUS 1:1").osis()).toEqual("Titus.1.1")
		expect(p.parse("ತೀತ 1:1").osis()).toEqual("Titus.1.1")
		;
      return true;
    });
  });

  describe("Localized book Phlm (kn)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser;
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    return it("should handle book: Phlm (kn)", function() {
      
		expect(p.parse("ಫಿಲೆಮೋನನಿಗೆ 1:1").osis()).toEqual("Phlm.1.1")
		expect(p.parse("Phlm 1:1").osis()).toEqual("Phlm.1.1")
		expect(p.parse("ಫಿಲೆ 1:1").osis()).toEqual("Phlm.1.1")
		p.include_apocrypha(false)
		expect(p.parse("ಫಿಲೆಮೋನನಿಗೆ 1:1").osis()).toEqual("Phlm.1.1")
		expect(p.parse("PHLM 1:1").osis()).toEqual("Phlm.1.1")
		expect(p.parse("ಫಿಲೆ 1:1").osis()).toEqual("Phlm.1.1")
		;
      return true;
    });
  });

  describe("Localized book Heb (kn)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser;
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    return it("should handle book: Heb (kn)", function() {
      
		expect(p.parse("ಹಿಬ್ರಿಯರಿಗೆ 1:1").osis()).toEqual("Heb.1.1")
		expect(p.parse("ಇಬ್ರಿಯರಿಗೆ 1:1").osis()).toEqual("Heb.1.1")
		expect(p.parse("ಇಬ್ರಿಯ 1:1").osis()).toEqual("Heb.1.1")
		expect(p.parse("ಇಬ್ರಿ 1:1").osis()).toEqual("Heb.1.1")
		expect(p.parse("Heb 1:1").osis()).toEqual("Heb.1.1")
		p.include_apocrypha(false)
		expect(p.parse("ಹಿಬ್ರಿಯರಿಗೆ 1:1").osis()).toEqual("Heb.1.1")
		expect(p.parse("ಇಬ್ರಿಯರಿಗೆ 1:1").osis()).toEqual("Heb.1.1")
		expect(p.parse("ಇಬ್ರಿಯ 1:1").osis()).toEqual("Heb.1.1")
		expect(p.parse("ಇಬ್ರಿ 1:1").osis()).toEqual("Heb.1.1")
		expect(p.parse("HEB 1:1").osis()).toEqual("Heb.1.1")
		;
      return true;
    });
  });

  describe("Localized book Jas (kn)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser;
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    return it("should handle book: Jas (kn)", function() {
      
		expect(p.parse("ಯಾಕೋಬನು 1:1").osis()).toEqual("Jas.1.1")
		expect(p.parse("ಯಾಕೋ 1:1").osis()).toEqual("Jas.1.1")
		expect(p.parse("Jas 1:1").osis()).toEqual("Jas.1.1")
		p.include_apocrypha(false)
		expect(p.parse("ಯಾಕೋಬನು 1:1").osis()).toEqual("Jas.1.1")
		expect(p.parse("ಯಾಕೋ 1:1").osis()).toEqual("Jas.1.1")
		expect(p.parse("JAS 1:1").osis()).toEqual("Jas.1.1")
		;
      return true;
    });
  });

  describe("Localized book 2Pet (kn)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser;
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    it("should handle book: 2Pet (kn)", function() {
      
		expect(p.parse("2 ಪೇತ್ರನು 1:1").osis()).toEqual("2Pet.1.1")
		expect(p.parse("೨ ಪೇತ್ರನು 1:1").osis()).toEqual("2Pet.1.1")
		expect(p.parse("2 ಪೇತ್ರ 1:1").osis()).toEqual("2Pet.1.1")
		expect(p.parse("2Pet 1:1").osis()).toEqual("2Pet.1.1")
		;
      return true;
    });
    return it("should handle non-Latin digits in book: 2Pet (kn)", function() {
      p.set_options({
        non_latin_digits_strategy: "replace"
      });
      
		expect(p.parse("2 ಪೇತ್ರನು 1:1").osis()).toEqual("2Pet.1.1")
		expect(p.parse("೨ ಪೇತ್ರನು 1:1").osis()).toEqual("2Pet.1.1")
		expect(p.parse("2 ಪೇತ್ರ 1:1").osis()).toEqual("2Pet.1.1")
		expect(p.parse("2Pet 1:1").osis()).toEqual("2Pet.1.1")
		p.include_apocrypha(false)
		expect(p.parse("2 ಪೇತ್ರನು 1:1").osis()).toEqual("2Pet.1.1")
		expect(p.parse("೨ ಪೇತ್ರನು 1:1").osis()).toEqual("2Pet.1.1")
		expect(p.parse("2 ಪೇತ್ರ 1:1").osis()).toEqual("2Pet.1.1")
		expect(p.parse("2PET 1:1").osis()).toEqual("2Pet.1.1")
		;
      return true;
    });
  });

  describe("Localized book 1Pet (kn)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser;
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    it("should handle book: 1Pet (kn)", function() {
      
		expect(p.parse("1 ಪೇತ್ರನು 1:1").osis()).toEqual("1Pet.1.1")
		expect(p.parse("೧ ಪೇತ್ರನು 1:1").osis()).toEqual("1Pet.1.1")
		expect(p.parse("1 ಪೇತ್ರ 1:1").osis()).toEqual("1Pet.1.1")
		expect(p.parse("1Pet 1:1").osis()).toEqual("1Pet.1.1")
		;
      return true;
    });
    return it("should handle non-Latin digits in book: 1Pet (kn)", function() {
      p.set_options({
        non_latin_digits_strategy: "replace"
      });
      
		expect(p.parse("1 ಪೇತ್ರನು 1:1").osis()).toEqual("1Pet.1.1")
		expect(p.parse("೧ ಪೇತ್ರನು 1:1").osis()).toEqual("1Pet.1.1")
		expect(p.parse("1 ಪೇತ್ರ 1:1").osis()).toEqual("1Pet.1.1")
		expect(p.parse("1Pet 1:1").osis()).toEqual("1Pet.1.1")
		p.include_apocrypha(false)
		expect(p.parse("1 ಪೇತ್ರನು 1:1").osis()).toEqual("1Pet.1.1")
		expect(p.parse("೧ ಪೇತ್ರನು 1:1").osis()).toEqual("1Pet.1.1")
		expect(p.parse("1 ಪೇತ್ರ 1:1").osis()).toEqual("1Pet.1.1")
		expect(p.parse("1PET 1:1").osis()).toEqual("1Pet.1.1")
		;
      return true;
    });
  });

  describe("Localized book Jude (kn)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser;
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    return it("should handle book: Jude (kn)", function() {
      
		expect(p.parse("ಯೂದನು 1:1").osis()).toEqual("Jude.1.1")
		expect(p.parse("Jude 1:1").osis()).toEqual("Jude.1.1")
		expect(p.parse("ಯೂದ 1:1").osis()).toEqual("Jude.1.1")
		p.include_apocrypha(false)
		expect(p.parse("ಯೂದನು 1:1").osis()).toEqual("Jude.1.1")
		expect(p.parse("JUDE 1:1").osis()).toEqual("Jude.1.1")
		expect(p.parse("ಯೂದ 1:1").osis()).toEqual("Jude.1.1")
		;
      return true;
    });
  });

  describe("Localized book Tob (kn)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser;
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    return it("should handle book: Tob (kn)", function() {
      
		expect(p.parse("Tob 1:1").osis()).toEqual("Tob.1.1")
		;
      return true;
    });
  });

  describe("Localized book Jdt (kn)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser;
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    return it("should handle book: Jdt (kn)", function() {
      
		expect(p.parse("Jdt 1:1").osis()).toEqual("Jdt.1.1")
		;
      return true;
    });
  });

  describe("Localized book Bar (kn)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser;
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    return it("should handle book: Bar (kn)", function() {
      
		expect(p.parse("Bar 1:1").osis()).toEqual("Bar.1.1")
		;
      return true;
    });
  });

  describe("Localized book Sus (kn)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser;
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    return it("should handle book: Sus (kn)", function() {
      
		expect(p.parse("Sus 1:1").osis()).toEqual("Sus.1.1")
		;
      return true;
    });
  });

  describe("Localized book 2Macc (kn)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser;
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    return it("should handle book: 2Macc (kn)", function() {
      
		expect(p.parse("2Macc 1:1").osis()).toEqual("2Macc.1.1")
		;
      return true;
    });
  });

  describe("Localized book 3Macc (kn)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser;
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    return it("should handle book: 3Macc (kn)", function() {
      
		expect(p.parse("3Macc 1:1").osis()).toEqual("3Macc.1.1")
		;
      return true;
    });
  });

  describe("Localized book 4Macc (kn)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser;
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    return it("should handle book: 4Macc (kn)", function() {
      
		expect(p.parse("4Macc 1:1").osis()).toEqual("4Macc.1.1")
		;
      return true;
    });
  });

  describe("Localized book 1Macc (kn)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser;
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    return it("should handle book: 1Macc (kn)", function() {
      
		expect(p.parse("1Macc 1:1").osis()).toEqual("1Macc.1.1")
		;
      return true;
    });
  });

  describe("Miscellaneous tests", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser;
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    it("should return the expected language", function() {
      return expect(p.languages).toEqual(["kn"]);
    });
    it("should handle ranges (kn)", function() {
      expect(p.parse("Titus 1:1 ಗೆ 2").osis()).toEqual("Titus.1.1-Titus.1.2");
      expect(p.parse("Matt 1ಗೆ2").osis()).toEqual("Matt.1-Matt.2");
      expect(p.parse("Phlm 2 ಗೆ 3").osis()).toEqual("Phlm.1.2-Phlm.1.3");
      expect(p.parse("Titus 1:1 ರಿಂದ 2").osis()).toEqual("Titus.1.1-Titus.1.2");
      expect(p.parse("Matt 1ರಿಂದ2").osis()).toEqual("Matt.1-Matt.2");
      return expect(p.parse("Phlm 2 ರಿಂದ 3").osis()).toEqual("Phlm.1.2-Phlm.1.3");
    });
    it("should handle chapters (kn)", function() {
      expect(p.parse("Titus 1:1, ಅಧ್ಯಾಯ 2").osis()).toEqual("Titus.1.1,Titus.2");
      expect(p.parse("Matt 3:4 ಅಧ್ಯಾಯ 6").osis()).toEqual("Matt.3.4,Matt.6");
      expect(p.parse("Titus 1:1, ಅಧ್ಯಾಯಗಳು 2").osis()).toEqual("Titus.1.1,Titus.2");
      return expect(p.parse("Matt 3:4 ಅಧ್ಯಾಯಗಳು 6").osis()).toEqual("Matt.3.4,Matt.6");
    });
    it("should handle verses (kn)", function() {
      expect(p.parse("Exod 1:1 ಪದ್ಯ 3").osis()).toEqual("Exod.1.1,Exod.1.3");
      return expect(p.parse("Phlm ಪದ್ಯ 6").osis()).toEqual("Phlm.1.6");
    });
    it("should handle 'and' (kn)", function() {
      expect(p.parse("Exod 1:1 ಮತ್ತು 3").osis()).toEqual("Exod.1.1,Exod.1.3");
      return expect(p.parse("Phlm 2 ಮತ್ತು 6").osis()).toEqual("Phlm.1.2,Phlm.1.6");
    });
    it("should handle titles (kn)", function() {
      expect(p.parse("Ps 3 title, 4:2, 5:title").osis()).toEqual("Ps.3.1,Ps.4.2,Ps.5.1");
      return expect(p.parse("PS 3 TITLE, 4:2, 5:TITLE").osis()).toEqual("Ps.3.1,Ps.4.2,Ps.5.1");
    });
    it("should handle 'ff' (kn)", function() {
      expect(p.parse("Rev 3ff, 4:2ff").osis()).toEqual("Rev.3-Rev.22,Rev.4.2-Rev.4.11");
      return expect(p.parse("REV 3 FF, 4:2 FF").osis()).toEqual("Rev.3-Rev.22,Rev.4.2-Rev.4.11");
    });
    it("should handle translations (kn)", function() {
      expect(p.parse("Lev 1 (krv)").osis_and_translations()).toEqual([["Lev.1", "krv"]]);
      return expect(p.parse("lev 1 krv").osis_and_translations()).toEqual([["Lev.1", "krv"]]);
    });
    it("should handle book ranges (kn)", function() {
      p.set_options({
        book_alone_strategy: "full",
        book_range_strategy: "include"
      });
      expect(p.parse("1 ಗೆ 3  ಯೋಹಾನ").osis()).toEqual("1John.1-3John.1");
      return expect(p.parse("1 ರಿಂದ 3  ಯೋಹಾನ").osis()).toEqual("1John.1-3John.1");
    });
    return it("should handle boundaries (kn)", function() {
      p.set_options({
        book_alone_strategy: "full"
      });
      expect(p.parse("\u2014Matt\u2014").osis()).toEqual("Matt.1-Matt.28");
      return expect(p.parse("\u201cMatt 1:1\u201d").osis()).toEqual("Matt.1.1");
    });
  });

}).call(this);
