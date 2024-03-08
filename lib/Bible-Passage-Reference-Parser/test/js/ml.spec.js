(function() {
  var bcv_parser;

  bcv_parser = require("../../js/ml_bcv_parser.js").bcv_parser;

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

  describe("Localized book Gen (ml)", function() {
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
    return it("should handle book: Gen (ml)", function() {
      
		expect(p.parse("ഉല്പ്പത്തി 1:1").osis()).toEqual("Gen.1.1")
		expect(p.parse("ഉല്പത്തി 1:1").osis()).toEqual("Gen.1.1")
		expect(p.parse("ഉല്പ 1:1").osis()).toEqual("Gen.1.1")
		expect(p.parse("Gen 1:1").osis()).toEqual("Gen.1.1")
		p.include_apocrypha(false)
		expect(p.parse("ഉല്പ്പത്തി 1:1").osis()).toEqual("Gen.1.1")
		expect(p.parse("ഉല്പത്തി 1:1").osis()).toEqual("Gen.1.1")
		expect(p.parse("ഉല്പ 1:1").osis()).toEqual("Gen.1.1")
		expect(p.parse("GEN 1:1").osis()).toEqual("Gen.1.1")
		;
      return true;
    });
  });

  describe("Localized book Exod (ml)", function() {
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
    return it("should handle book: Exod (ml)", function() {
      
		expect(p.parse("പുറപ്പാടു് 1:1").osis()).toEqual("Exod.1.1")
		expect(p.parse("പുറപ്പാട് 1:1").osis()).toEqual("Exod.1.1")
		expect(p.parse("Exod 1:1").osis()).toEqual("Exod.1.1")
		expect(p.parse("പുറ 1:1").osis()).toEqual("Exod.1.1")
		p.include_apocrypha(false)
		expect(p.parse("പുറപ്പാടു് 1:1").osis()).toEqual("Exod.1.1")
		expect(p.parse("പുറപ്പാട് 1:1").osis()).toEqual("Exod.1.1")
		expect(p.parse("EXOD 1:1").osis()).toEqual("Exod.1.1")
		expect(p.parse("പുറ 1:1").osis()).toEqual("Exod.1.1")
		;
      return true;
    });
  });

  describe("Localized book Bel (ml)", function() {
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
    return it("should handle book: Bel (ml)", function() {
      
		expect(p.parse("Bel 1:1").osis()).toEqual("Bel.1.1")
		;
      return true;
    });
  });

  describe("Localized book Lev (ml)", function() {
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
    return it("should handle book: Lev (ml)", function() {
      
		expect(p.parse("ലേവ്യപുസ്തകം 1:1").osis()).toEqual("Lev.1.1")
		expect(p.parse("Lev 1:1").osis()).toEqual("Lev.1.1")
		p.include_apocrypha(false)
		expect(p.parse("ലേവ്യപുസ്തകം 1:1").osis()).toEqual("Lev.1.1")
		expect(p.parse("LEV 1:1").osis()).toEqual("Lev.1.1")
		;
      return true;
    });
  });

  describe("Localized book Num (ml)", function() {
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
    return it("should handle book: Num (ml)", function() {
      
		expect(p.parse("സംഖ്യാപുസ്തകം 1:1").osis()).toEqual("Num.1.1")
		expect(p.parse("സംഖ്യാ 1:1").osis()).toEqual("Num.1.1")
		expect(p.parse("Num 1:1").osis()).toEqual("Num.1.1")
		p.include_apocrypha(false)
		expect(p.parse("സംഖ്യാപുസ്തകം 1:1").osis()).toEqual("Num.1.1")
		expect(p.parse("സംഖ്യാ 1:1").osis()).toEqual("Num.1.1")
		expect(p.parse("NUM 1:1").osis()).toEqual("Num.1.1")
		;
      return true;
    });
  });

  describe("Localized book Sir (ml)", function() {
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
    return it("should handle book: Sir (ml)", function() {
      
		expect(p.parse("Sir 1:1").osis()).toEqual("Sir.1.1")
		;
      return true;
    });
  });

  describe("Localized book Wis (ml)", function() {
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
    return it("should handle book: Wis (ml)", function() {
      
		expect(p.parse("Wis 1:1").osis()).toEqual("Wis.1.1")
		;
      return true;
    });
  });

  describe("Localized book Lam (ml)", function() {
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
    return it("should handle book: Lam (ml)", function() {
      
		expect(p.parse("വിലാപങ്ങൾ 1:1").osis()).toEqual("Lam.1.1")
		expect(p.parse("Lam 1:1").osis()).toEqual("Lam.1.1")
		p.include_apocrypha(false)
		expect(p.parse("വിലാപങ്ങൾ 1:1").osis()).toEqual("Lam.1.1")
		expect(p.parse("LAM 1:1").osis()).toEqual("Lam.1.1")
		;
      return true;
    });
  });

  describe("Localized book EpJer (ml)", function() {
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
    return it("should handle book: EpJer (ml)", function() {
      
		expect(p.parse("EpJer 1:1").osis()).toEqual("EpJer.1.1")
		;
      return true;
    });
  });

  describe("Localized book Rev (ml)", function() {
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
    return it("should handle book: Rev (ml)", function() {
      
		expect(p.parse("വെളിപ്പാടു 1:1").osis()).toEqual("Rev.1.1")
		expect(p.parse("വെളിപാട് 1:1").osis()).toEqual("Rev.1.1")
		expect(p.parse("വെളി 1:1").osis()).toEqual("Rev.1.1")
		expect(p.parse("Rev 1:1").osis()).toEqual("Rev.1.1")
		p.include_apocrypha(false)
		expect(p.parse("വെളിപ്പാടു 1:1").osis()).toEqual("Rev.1.1")
		expect(p.parse("വെളിപാട് 1:1").osis()).toEqual("Rev.1.1")
		expect(p.parse("വെളി 1:1").osis()).toEqual("Rev.1.1")
		expect(p.parse("REV 1:1").osis()).toEqual("Rev.1.1")
		;
      return true;
    });
  });

  describe("Localized book PrMan (ml)", function() {
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
    return it("should handle book: PrMan (ml)", function() {
      
		expect(p.parse("PrMan 1:1").osis()).toEqual("PrMan.1.1")
		;
      return true;
    });
  });

  describe("Localized book Deut (ml)", function() {
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
    return it("should handle book: Deut (ml)", function() {
      
		expect(p.parse("ആവർത്തനപുസ്തകം 1:1").osis()).toEqual("Deut.1.1")
		expect(p.parse("ആവർത്തനം 1:1").osis()).toEqual("Deut.1.1")
		expect(p.parse("Deut 1:1").osis()).toEqual("Deut.1.1")
		expect(p.parse("ആവർ 1:1").osis()).toEqual("Deut.1.1")
		expect(p.parse("ആവ 1:1").osis()).toEqual("Deut.1.1")
		p.include_apocrypha(false)
		expect(p.parse("ആവർത്തനപുസ്തകം 1:1").osis()).toEqual("Deut.1.1")
		expect(p.parse("ആവർത്തനം 1:1").osis()).toEqual("Deut.1.1")
		expect(p.parse("DEUT 1:1").osis()).toEqual("Deut.1.1")
		expect(p.parse("ആവർ 1:1").osis()).toEqual("Deut.1.1")
		expect(p.parse("ആവ 1:1").osis()).toEqual("Deut.1.1")
		;
      return true;
    });
  });

  describe("Localized book Josh (ml)", function() {
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
    return it("should handle book: Josh (ml)", function() {
      
		expect(p.parse("യോശുവ 1:1").osis()).toEqual("Josh.1.1")
		expect(p.parse("Josh 1:1").osis()).toEqual("Josh.1.1")
		p.include_apocrypha(false)
		expect(p.parse("യോശുവ 1:1").osis()).toEqual("Josh.1.1")
		expect(p.parse("JOSH 1:1").osis()).toEqual("Josh.1.1")
		;
      return true;
    });
  });

  describe("Localized book Judg (ml)", function() {
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
    return it("should handle book: Judg (ml)", function() {
      
		expect(p.parse("ന്യായാധിപന്മാർ 1:1").osis()).toEqual("Judg.1.1")
		expect(p.parse("Judg 1:1").osis()).toEqual("Judg.1.1")
		p.include_apocrypha(false)
		expect(p.parse("ന്യായാധിപന്മാർ 1:1").osis()).toEqual("Judg.1.1")
		expect(p.parse("JUDG 1:1").osis()).toEqual("Judg.1.1")
		;
      return true;
    });
  });

  describe("Localized book Ruth (ml)", function() {
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
    return it("should handle book: Ruth (ml)", function() {
      
		expect(p.parse("രൂത്ത് 1:1").osis()).toEqual("Ruth.1.1")
		expect(p.parse("Ruth 1:1").osis()).toEqual("Ruth.1.1")
		p.include_apocrypha(false)
		expect(p.parse("രൂത്ത് 1:1").osis()).toEqual("Ruth.1.1")
		expect(p.parse("RUTH 1:1").osis()).toEqual("Ruth.1.1")
		;
      return true;
    });
  });

  describe("Localized book 1Esd (ml)", function() {
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
    return it("should handle book: 1Esd (ml)", function() {
      
		expect(p.parse("1Esd 1:1").osis()).toEqual("1Esd.1.1")
		;
      return true;
    });
  });

  describe("Localized book 2Esd (ml)", function() {
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
    return it("should handle book: 2Esd (ml)", function() {
      
		expect(p.parse("2Esd 1:1").osis()).toEqual("2Esd.1.1")
		;
      return true;
    });
  });

  describe("Localized book Isa (ml)", function() {
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
    return it("should handle book: Isa (ml)", function() {
      
		expect(p.parse("യെശയ്യാവു 1:1").osis()).toEqual("Isa.1.1")
		expect(p.parse("യെശയ്യാവ് 1:1").osis()).toEqual("Isa.1.1")
		expect(p.parse("യെശയ്യാ 1:1").osis()).toEqual("Isa.1.1")
		expect(p.parse("Isa 1:1").osis()).toEqual("Isa.1.1")
		expect(p.parse("യെശ 1:1").osis()).toEqual("Isa.1.1")
		p.include_apocrypha(false)
		expect(p.parse("യെശയ്യാവു 1:1").osis()).toEqual("Isa.1.1")
		expect(p.parse("യെശയ്യാവ് 1:1").osis()).toEqual("Isa.1.1")
		expect(p.parse("യെശയ്യാ 1:1").osis()).toEqual("Isa.1.1")
		expect(p.parse("ISA 1:1").osis()).toEqual("Isa.1.1")
		expect(p.parse("യെശ 1:1").osis()).toEqual("Isa.1.1")
		;
      return true;
    });
  });

  describe("Localized book 2Sam (ml)", function() {
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
    return it("should handle book: 2Sam (ml)", function() {
      
		expect(p.parse("2.. ശമൂവേൽ 1:1").osis()).toEqual("2Sam.1.1")
		expect(p.parse("2. ശമൂവേൽ 1:1").osis()).toEqual("2Sam.1.1")
		expect(p.parse("2 ശമൂവേൽ 1:1").osis()).toEqual("2Sam.1.1")
		expect(p.parse("2.. ശമു 1:1").osis()).toEqual("2Sam.1.1")
		expect(p.parse("2. ശമു 1:1").osis()).toEqual("2Sam.1.1")
		expect(p.parse("2 ശമു 1:1").osis()).toEqual("2Sam.1.1")
		expect(p.parse("2Sam 1:1").osis()).toEqual("2Sam.1.1")
		expect(p.parse("2ശമു 1:1").osis()).toEqual("2Sam.1.1")
		p.include_apocrypha(false)
		expect(p.parse("2.. ശമൂവേൽ 1:1").osis()).toEqual("2Sam.1.1")
		expect(p.parse("2. ശമൂവേൽ 1:1").osis()).toEqual("2Sam.1.1")
		expect(p.parse("2 ശമൂവേൽ 1:1").osis()).toEqual("2Sam.1.1")
		expect(p.parse("2.. ശമു 1:1").osis()).toEqual("2Sam.1.1")
		expect(p.parse("2. ശമു 1:1").osis()).toEqual("2Sam.1.1")
		expect(p.parse("2 ശമു 1:1").osis()).toEqual("2Sam.1.1")
		expect(p.parse("2SAM 1:1").osis()).toEqual("2Sam.1.1")
		expect(p.parse("2ശമു 1:1").osis()).toEqual("2Sam.1.1")
		;
      return true;
    });
  });

  describe("Localized book 1Sam (ml)", function() {
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
    return it("should handle book: 1Sam (ml)", function() {
      
		expect(p.parse("1.. ശമൂവേൽ 1:1").osis()).toEqual("1Sam.1.1")
		expect(p.parse("1. ശമൂവേൽ 1:1").osis()).toEqual("1Sam.1.1")
		expect(p.parse("1 ശമൂവേൽ 1:1").osis()).toEqual("1Sam.1.1")
		expect(p.parse("1.. ശമു 1:1").osis()).toEqual("1Sam.1.1")
		expect(p.parse("1. ശമു 1:1").osis()).toEqual("1Sam.1.1")
		expect(p.parse("1 ശമു 1:1").osis()).toEqual("1Sam.1.1")
		expect(p.parse("1Sam 1:1").osis()).toEqual("1Sam.1.1")
		expect(p.parse("1ശമു 1:1").osis()).toEqual("1Sam.1.1")
		p.include_apocrypha(false)
		expect(p.parse("1.. ശമൂവേൽ 1:1").osis()).toEqual("1Sam.1.1")
		expect(p.parse("1. ശമൂവേൽ 1:1").osis()).toEqual("1Sam.1.1")
		expect(p.parse("1 ശമൂവേൽ 1:1").osis()).toEqual("1Sam.1.1")
		expect(p.parse("1.. ശമു 1:1").osis()).toEqual("1Sam.1.1")
		expect(p.parse("1. ശമു 1:1").osis()).toEqual("1Sam.1.1")
		expect(p.parse("1 ശമു 1:1").osis()).toEqual("1Sam.1.1")
		expect(p.parse("1SAM 1:1").osis()).toEqual("1Sam.1.1")
		expect(p.parse("1ശമു 1:1").osis()).toEqual("1Sam.1.1")
		;
      return true;
    });
  });

  describe("Localized book 2Kgs (ml)", function() {
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
    return it("should handle book: 2Kgs (ml)", function() {
      
		expect(p.parse("2.. രാജാക്കന്മാർ 1:1").osis()).toEqual("2Kgs.1.1")
		expect(p.parse("2. രാജാക്കന്മാർ 1:1").osis()).toEqual("2Kgs.1.1")
		expect(p.parse("2 രാജാക്കന്മാർ 1:1").osis()).toEqual("2Kgs.1.1")
		expect(p.parse("2.. രാജാ 1:1").osis()).toEqual("2Kgs.1.1")
		expect(p.parse("2. രാജാ 1:1").osis()).toEqual("2Kgs.1.1")
		expect(p.parse("2 രാജാ 1:1").osis()).toEqual("2Kgs.1.1")
		expect(p.parse("2Kgs 1:1").osis()).toEqual("2Kgs.1.1")
		p.include_apocrypha(false)
		expect(p.parse("2.. രാജാക്കന്മാർ 1:1").osis()).toEqual("2Kgs.1.1")
		expect(p.parse("2. രാജാക്കന്മാർ 1:1").osis()).toEqual("2Kgs.1.1")
		expect(p.parse("2 രാജാക്കന്മാർ 1:1").osis()).toEqual("2Kgs.1.1")
		expect(p.parse("2.. രാജാ 1:1").osis()).toEqual("2Kgs.1.1")
		expect(p.parse("2. രാജാ 1:1").osis()).toEqual("2Kgs.1.1")
		expect(p.parse("2 രാജാ 1:1").osis()).toEqual("2Kgs.1.1")
		expect(p.parse("2KGS 1:1").osis()).toEqual("2Kgs.1.1")
		;
      return true;
    });
  });

  describe("Localized book 1Kgs (ml)", function() {
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
    return it("should handle book: 1Kgs (ml)", function() {
      
		expect(p.parse("1.. രാജാക്കന്മാർ 1:1").osis()).toEqual("1Kgs.1.1")
		expect(p.parse("1. രാജാക്കന്മാർ 1:1").osis()).toEqual("1Kgs.1.1")
		expect(p.parse("1 രാജാക്കന്മാർ 1:1").osis()).toEqual("1Kgs.1.1")
		expect(p.parse("1.. രാജാ 1:1").osis()).toEqual("1Kgs.1.1")
		expect(p.parse("1. രാജാ 1:1").osis()).toEqual("1Kgs.1.1")
		expect(p.parse("1 രാജാ 1:1").osis()).toEqual("1Kgs.1.1")
		expect(p.parse("1Kgs 1:1").osis()).toEqual("1Kgs.1.1")
		p.include_apocrypha(false)
		expect(p.parse("1.. രാജാക്കന്മാർ 1:1").osis()).toEqual("1Kgs.1.1")
		expect(p.parse("1. രാജാക്കന്മാർ 1:1").osis()).toEqual("1Kgs.1.1")
		expect(p.parse("1 രാജാക്കന്മാർ 1:1").osis()).toEqual("1Kgs.1.1")
		expect(p.parse("1.. രാജാ 1:1").osis()).toEqual("1Kgs.1.1")
		expect(p.parse("1. രാജാ 1:1").osis()).toEqual("1Kgs.1.1")
		expect(p.parse("1 രാജാ 1:1").osis()).toEqual("1Kgs.1.1")
		expect(p.parse("1KGS 1:1").osis()).toEqual("1Kgs.1.1")
		;
      return true;
    });
  });

  describe("Localized book 2Chr (ml)", function() {
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
    return it("should handle book: 2Chr (ml)", function() {
      
		expect(p.parse("2.. ദിനവൃത്താന്തം 1:1").osis()).toEqual("2Chr.1.1")
		expect(p.parse("2. ദിനവൃത്താന്തം 1:1").osis()).toEqual("2Chr.1.1")
		expect(p.parse("2 ദിനവൃത്താന്തം 1:1").osis()).toEqual("2Chr.1.1")
		expect(p.parse("2.. ദിന 1:1").osis()).toEqual("2Chr.1.1")
		expect(p.parse("2. ദിന 1:1").osis()).toEqual("2Chr.1.1")
		expect(p.parse("2 ദിന 1:1").osis()).toEqual("2Chr.1.1")
		expect(p.parse("2Chr 1:1").osis()).toEqual("2Chr.1.1")
		p.include_apocrypha(false)
		expect(p.parse("2.. ദിനവൃത്താന്തം 1:1").osis()).toEqual("2Chr.1.1")
		expect(p.parse("2. ദിനവൃത്താന്തം 1:1").osis()).toEqual("2Chr.1.1")
		expect(p.parse("2 ദിനവൃത്താന്തം 1:1").osis()).toEqual("2Chr.1.1")
		expect(p.parse("2.. ദിന 1:1").osis()).toEqual("2Chr.1.1")
		expect(p.parse("2. ദിന 1:1").osis()).toEqual("2Chr.1.1")
		expect(p.parse("2 ദിന 1:1").osis()).toEqual("2Chr.1.1")
		expect(p.parse("2CHR 1:1").osis()).toEqual("2Chr.1.1")
		;
      return true;
    });
  });

  describe("Localized book 1Chr (ml)", function() {
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
    return it("should handle book: 1Chr (ml)", function() {
      
		expect(p.parse("1.. ദിനവൃത്താന്തം 1:1").osis()).toEqual("1Chr.1.1")
		expect(p.parse("1. ദിനവൃത്താന്തം 1:1").osis()).toEqual("1Chr.1.1")
		expect(p.parse("1 ദിനവൃത്താന്തം 1:1").osis()).toEqual("1Chr.1.1")
		expect(p.parse("1.. ദിന 1:1").osis()).toEqual("1Chr.1.1")
		expect(p.parse("1. ദിന 1:1").osis()).toEqual("1Chr.1.1")
		expect(p.parse("1 ദിന 1:1").osis()).toEqual("1Chr.1.1")
		expect(p.parse("1Chr 1:1").osis()).toEqual("1Chr.1.1")
		p.include_apocrypha(false)
		expect(p.parse("1.. ദിനവൃത്താന്തം 1:1").osis()).toEqual("1Chr.1.1")
		expect(p.parse("1. ദിനവൃത്താന്തം 1:1").osis()).toEqual("1Chr.1.1")
		expect(p.parse("1 ദിനവൃത്താന്തം 1:1").osis()).toEqual("1Chr.1.1")
		expect(p.parse("1.. ദിന 1:1").osis()).toEqual("1Chr.1.1")
		expect(p.parse("1. ദിന 1:1").osis()).toEqual("1Chr.1.1")
		expect(p.parse("1 ദിന 1:1").osis()).toEqual("1Chr.1.1")
		expect(p.parse("1CHR 1:1").osis()).toEqual("1Chr.1.1")
		;
      return true;
    });
  });

  describe("Localized book Ezra (ml)", function() {
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
    return it("should handle book: Ezra (ml)", function() {
      
		expect(p.parse("എസ്രാ 1:1").osis()).toEqual("Ezra.1.1")
		expect(p.parse("Ezra 1:1").osis()).toEqual("Ezra.1.1")
		p.include_apocrypha(false)
		expect(p.parse("എസ്രാ 1:1").osis()).toEqual("Ezra.1.1")
		expect(p.parse("EZRA 1:1").osis()).toEqual("Ezra.1.1")
		;
      return true;
    });
  });

  describe("Localized book Neh (ml)", function() {
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
    return it("should handle book: Neh (ml)", function() {
      
		expect(p.parse("നെഹെമ്യാവു 1:1").osis()).toEqual("Neh.1.1")
		expect(p.parse("Neh 1:1").osis()).toEqual("Neh.1.1")
		p.include_apocrypha(false)
		expect(p.parse("നെഹെമ്യാവു 1:1").osis()).toEqual("Neh.1.1")
		expect(p.parse("NEH 1:1").osis()).toEqual("Neh.1.1")
		;
      return true;
    });
  });

  describe("Localized book GkEsth (ml)", function() {
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
    return it("should handle book: GkEsth (ml)", function() {
      
		expect(p.parse("GkEsth 1:1").osis()).toEqual("GkEsth.1.1")
		;
      return true;
    });
  });

  describe("Localized book Esth (ml)", function() {
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
    return it("should handle book: Esth (ml)", function() {
      
		expect(p.parse("എസ്ഥേർ 1:1").osis()).toEqual("Esth.1.1")
		expect(p.parse("Esth 1:1").osis()).toEqual("Esth.1.1")
		p.include_apocrypha(false)
		expect(p.parse("എസ്ഥേർ 1:1").osis()).toEqual("Esth.1.1")
		expect(p.parse("ESTH 1:1").osis()).toEqual("Esth.1.1")
		;
      return true;
    });
  });

  describe("Localized book Job (ml)", function() {
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
    return it("should handle book: Job (ml)", function() {
      
		expect(p.parse("ഇയ്യോബ് 1:1").osis()).toEqual("Job.1.1")
		expect(p.parse("ഇയ്യോ 1:1").osis()).toEqual("Job.1.1")
		expect(p.parse("Job 1:1").osis()).toEqual("Job.1.1")
		p.include_apocrypha(false)
		expect(p.parse("ഇയ്യോബ് 1:1").osis()).toEqual("Job.1.1")
		expect(p.parse("ഇയ്യോ 1:1").osis()).toEqual("Job.1.1")
		expect(p.parse("JOB 1:1").osis()).toEqual("Job.1.1")
		;
      return true;
    });
  });

  describe("Localized book Ps (ml)", function() {
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
    return it("should handle book: Ps (ml)", function() {
      
		expect(p.parse("സങ്കീർത്തനങ്ങൾ 1:1").osis()).toEqual("Ps.1.1")
		expect(p.parse("സങ്കീ 1:1").osis()).toEqual("Ps.1.1")
		expect(p.parse("Ps 1:1").osis()).toEqual("Ps.1.1")
		p.include_apocrypha(false)
		expect(p.parse("സങ്കീർത്തനങ്ങൾ 1:1").osis()).toEqual("Ps.1.1")
		expect(p.parse("സങ്കീ 1:1").osis()).toEqual("Ps.1.1")
		expect(p.parse("PS 1:1").osis()).toEqual("Ps.1.1")
		;
      return true;
    });
  });

  describe("Localized book PrAzar (ml)", function() {
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
    return it("should handle book: PrAzar (ml)", function() {
      
		expect(p.parse("PrAzar 1:1").osis()).toEqual("PrAzar.1.1")
		;
      return true;
    });
  });

  describe("Localized book Prov (ml)", function() {
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
    return it("should handle book: Prov (ml)", function() {
      
		expect(p.parse("സദൃശ്യവാക്യങ്ങൾ 1:1").osis()).toEqual("Prov.1.1")
		expect(p.parse("സദൃശവാക്യങ്ങൾ 1:1").osis()).toEqual("Prov.1.1")
		expect(p.parse("Prov 1:1").osis()).toEqual("Prov.1.1")
		expect(p.parse("സദൃശ 1:1").osis()).toEqual("Prov.1.1")
		p.include_apocrypha(false)
		expect(p.parse("സദൃശ്യവാക്യങ്ങൾ 1:1").osis()).toEqual("Prov.1.1")
		expect(p.parse("സദൃശവാക്യങ്ങൾ 1:1").osis()).toEqual("Prov.1.1")
		expect(p.parse("PROV 1:1").osis()).toEqual("Prov.1.1")
		expect(p.parse("സദൃശ 1:1").osis()).toEqual("Prov.1.1")
		;
      return true;
    });
  });

  describe("Localized book Eccl (ml)", function() {
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
    return it("should handle book: Eccl (ml)", function() {
      
		expect(p.parse("സഭാപ്രസംഗി 1:1").osis()).toEqual("Eccl.1.1")
		expect(p.parse("Eccl 1:1").osis()).toEqual("Eccl.1.1")
		p.include_apocrypha(false)
		expect(p.parse("സഭാപ്രസംഗി 1:1").osis()).toEqual("Eccl.1.1")
		expect(p.parse("ECCL 1:1").osis()).toEqual("Eccl.1.1")
		;
      return true;
    });
  });

  describe("Localized book SgThree (ml)", function() {
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
    return it("should handle book: SgThree (ml)", function() {
      
		expect(p.parse("SgThree 1:1").osis()).toEqual("SgThree.1.1")
		;
      return true;
    });
  });

  describe("Localized book Song (ml)", function() {
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
    return it("should handle book: Song (ml)", function() {
      
		expect(p.parse("ഉത്തമ ഗീതം 1:1").osis()).toEqual("Song.1.1")
		expect(p.parse("ഉത്തമഗീതം 1:1").osis()).toEqual("Song.1.1")
		expect(p.parse("Song 1:1").osis()).toEqual("Song.1.1")
		p.include_apocrypha(false)
		expect(p.parse("ഉത്തമ ഗീതം 1:1").osis()).toEqual("Song.1.1")
		expect(p.parse("ഉത്തമഗീതം 1:1").osis()).toEqual("Song.1.1")
		expect(p.parse("SONG 1:1").osis()).toEqual("Song.1.1")
		;
      return true;
    });
  });

  describe("Localized book Jer (ml)", function() {
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
    return it("should handle book: Jer (ml)", function() {
      
		expect(p.parse("യിരെമ്യാവു 1:1").osis()).toEqual("Jer.1.1")
		expect(p.parse("യിരേമ്യാവു 1:1").osis()).toEqual("Jer.1.1")
		expect(p.parse("യിരെ 1:1").osis()).toEqual("Jer.1.1")
		expect(p.parse("Jer 1:1").osis()).toEqual("Jer.1.1")
		p.include_apocrypha(false)
		expect(p.parse("യിരെമ്യാവു 1:1").osis()).toEqual("Jer.1.1")
		expect(p.parse("യിരേമ്യാവു 1:1").osis()).toEqual("Jer.1.1")
		expect(p.parse("യിരെ 1:1").osis()).toEqual("Jer.1.1")
		expect(p.parse("JER 1:1").osis()).toEqual("Jer.1.1")
		;
      return true;
    });
  });

  describe("Localized book Ezek (ml)", function() {
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
    return it("should handle book: Ezek (ml)", function() {
      
		expect(p.parse("യെഹെസ്കേൽ 1:1").osis()).toEqual("Ezek.1.1")
		expect(p.parse("യേഹേസ്കേൽ 1:1").osis()).toEqual("Ezek.1.1")
		expect(p.parse("Ezek 1:1").osis()).toEqual("Ezek.1.1")
		p.include_apocrypha(false)
		expect(p.parse("യെഹെസ്കേൽ 1:1").osis()).toEqual("Ezek.1.1")
		expect(p.parse("യേഹേസ്കേൽ 1:1").osis()).toEqual("Ezek.1.1")
		expect(p.parse("EZEK 1:1").osis()).toEqual("Ezek.1.1")
		;
      return true;
    });
  });

  describe("Localized book Dan (ml)", function() {
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
    return it("should handle book: Dan (ml)", function() {
      
		expect(p.parse("ദാനീയേൽ 1:1").osis()).toEqual("Dan.1.1")
		expect(p.parse("ദാനീ 1:1").osis()).toEqual("Dan.1.1")
		expect(p.parse("Dan 1:1").osis()).toEqual("Dan.1.1")
		p.include_apocrypha(false)
		expect(p.parse("ദാനീയേൽ 1:1").osis()).toEqual("Dan.1.1")
		expect(p.parse("ദാനീ 1:1").osis()).toEqual("Dan.1.1")
		expect(p.parse("DAN 1:1").osis()).toEqual("Dan.1.1")
		;
      return true;
    });
  });

  describe("Localized book Hos (ml)", function() {
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
    return it("should handle book: Hos (ml)", function() {
      
		expect(p.parse("ഹോശേയ 1:1").osis()).toEqual("Hos.1.1")
		expect(p.parse("Hos 1:1").osis()).toEqual("Hos.1.1")
		p.include_apocrypha(false)
		expect(p.parse("ഹോശേയ 1:1").osis()).toEqual("Hos.1.1")
		expect(p.parse("HOS 1:1").osis()).toEqual("Hos.1.1")
		;
      return true;
    });
  });

  describe("Localized book Joel (ml)", function() {
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
    return it("should handle book: Joel (ml)", function() {
      
		expect(p.parse("യോവേൽ 1:1").osis()).toEqual("Joel.1.1")
		expect(p.parse("Joel 1:1").osis()).toEqual("Joel.1.1")
		p.include_apocrypha(false)
		expect(p.parse("യോവേൽ 1:1").osis()).toEqual("Joel.1.1")
		expect(p.parse("JOEL 1:1").osis()).toEqual("Joel.1.1")
		;
      return true;
    });
  });

  describe("Localized book Amos (ml)", function() {
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
    return it("should handle book: Amos (ml)", function() {
      
		expect(p.parse("ആമോസ് 1:1").osis()).toEqual("Amos.1.1")
		expect(p.parse("Amos 1:1").osis()).toEqual("Amos.1.1")
		p.include_apocrypha(false)
		expect(p.parse("ആമോസ് 1:1").osis()).toEqual("Amos.1.1")
		expect(p.parse("AMOS 1:1").osis()).toEqual("Amos.1.1")
		;
      return true;
    });
  });

  describe("Localized book Obad (ml)", function() {
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
    return it("should handle book: Obad (ml)", function() {
      
		expect(p.parse("ഓബദ്യാവു 1:1").osis()).toEqual("Obad.1.1")
		expect(p.parse("Obad 1:1").osis()).toEqual("Obad.1.1")
		p.include_apocrypha(false)
		expect(p.parse("ഓബദ്യാവു 1:1").osis()).toEqual("Obad.1.1")
		expect(p.parse("OBAD 1:1").osis()).toEqual("Obad.1.1")
		;
      return true;
    });
  });

  describe("Localized book Jonah (ml)", function() {
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
    return it("should handle book: Jonah (ml)", function() {
      
		expect(p.parse("Jonah 1:1").osis()).toEqual("Jonah.1.1")
		expect(p.parse("യോനാ 1:1").osis()).toEqual("Jonah.1.1")
		p.include_apocrypha(false)
		expect(p.parse("JONAH 1:1").osis()).toEqual("Jonah.1.1")
		expect(p.parse("യോനാ 1:1").osis()).toEqual("Jonah.1.1")
		;
      return true;
    });
  });

  describe("Localized book Mic (ml)", function() {
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
    return it("should handle book: Mic (ml)", function() {
      
		expect(p.parse("മീഖാ 1:1").osis()).toEqual("Mic.1.1")
		expect(p.parse("Mic 1:1").osis()).toEqual("Mic.1.1")
		p.include_apocrypha(false)
		expect(p.parse("മീഖാ 1:1").osis()).toEqual("Mic.1.1")
		expect(p.parse("MIC 1:1").osis()).toEqual("Mic.1.1")
		;
      return true;
    });
  });

  describe("Localized book Nah (ml)", function() {
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
    return it("should handle book: Nah (ml)", function() {
      
		expect(p.parse("നഹൂം 1:1").osis()).toEqual("Nah.1.1")
		expect(p.parse("Nah 1:1").osis()).toEqual("Nah.1.1")
		p.include_apocrypha(false)
		expect(p.parse("നഹൂം 1:1").osis()).toEqual("Nah.1.1")
		expect(p.parse("NAH 1:1").osis()).toEqual("Nah.1.1")
		;
      return true;
    });
  });

  describe("Localized book Hab (ml)", function() {
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
    return it("should handle book: Hab (ml)", function() {
      
		expect(p.parse("ഹബക്കൂക്‍ 1:1").osis()).toEqual("Hab.1.1")
		expect(p.parse("ഹബക്കൂൿ 1:1").osis()).toEqual("Hab.1.1")
		expect(p.parse("Hab 1:1").osis()).toEqual("Hab.1.1")
		p.include_apocrypha(false)
		expect(p.parse("ഹബക്കൂക്‍ 1:1").osis()).toEqual("Hab.1.1")
		expect(p.parse("ഹബക്കൂൿ 1:1").osis()).toEqual("Hab.1.1")
		expect(p.parse("HAB 1:1").osis()).toEqual("Hab.1.1")
		;
      return true;
    });
  });

  describe("Localized book Zeph (ml)", function() {
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
    return it("should handle book: Zeph (ml)", function() {
      
		expect(p.parse("സെഫന്യാവു 1:1").osis()).toEqual("Zeph.1.1")
		expect(p.parse("Zeph 1:1").osis()).toEqual("Zeph.1.1")
		p.include_apocrypha(false)
		expect(p.parse("സെഫന്യാവു 1:1").osis()).toEqual("Zeph.1.1")
		expect(p.parse("ZEPH 1:1").osis()).toEqual("Zeph.1.1")
		;
      return true;
    });
  });

  describe("Localized book Hag (ml)", function() {
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
    return it("should handle book: Hag (ml)", function() {
      
		expect(p.parse("ഹഗ്ഗായി 1:1").osis()).toEqual("Hag.1.1")
		expect(p.parse("Hag 1:1").osis()).toEqual("Hag.1.1")
		p.include_apocrypha(false)
		expect(p.parse("ഹഗ്ഗായി 1:1").osis()).toEqual("Hag.1.1")
		expect(p.parse("HAG 1:1").osis()).toEqual("Hag.1.1")
		;
      return true;
    });
  });

  describe("Localized book Zech (ml)", function() {
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
    return it("should handle book: Zech (ml)", function() {
      
		expect(p.parse("സെഖർയ്യാവു 1:1").osis()).toEqual("Zech.1.1")
		expect(p.parse("സെഖര്യാവു 1:1").osis()).toEqual("Zech.1.1")
		expect(p.parse("സെഖര്യാവ് 1:1").osis()).toEqual("Zech.1.1")
		expect(p.parse("സെഖര്യാ 1:1").osis()).toEqual("Zech.1.1")
		expect(p.parse("Zech 1:1").osis()).toEqual("Zech.1.1")
		p.include_apocrypha(false)
		expect(p.parse("സെഖർയ്യാവു 1:1").osis()).toEqual("Zech.1.1")
		expect(p.parse("സെഖര്യാവു 1:1").osis()).toEqual("Zech.1.1")
		expect(p.parse("സെഖര്യാവ് 1:1").osis()).toEqual("Zech.1.1")
		expect(p.parse("സെഖര്യാ 1:1").osis()).toEqual("Zech.1.1")
		expect(p.parse("ZECH 1:1").osis()).toEqual("Zech.1.1")
		;
      return true;
    });
  });

  describe("Localized book Mal (ml)", function() {
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
    return it("should handle book: Mal (ml)", function() {
      
		expect(p.parse("മലാഖി 1:1").osis()).toEqual("Mal.1.1")
		expect(p.parse("Mal 1:1").osis()).toEqual("Mal.1.1")
		p.include_apocrypha(false)
		expect(p.parse("മലാഖി 1:1").osis()).toEqual("Mal.1.1")
		expect(p.parse("MAL 1:1").osis()).toEqual("Mal.1.1")
		;
      return true;
    });
  });

  describe("Localized book Matt (ml)", function() {
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
    return it("should handle book: Matt (ml)", function() {
      
		expect(p.parse("മത്തായി 1:1").osis()).toEqual("Matt.1.1")
		expect(p.parse("മത്താ 1:1").osis()).toEqual("Matt.1.1")
		expect(p.parse("Matt 1:1").osis()).toEqual("Matt.1.1")
		p.include_apocrypha(false)
		expect(p.parse("മത്തായി 1:1").osis()).toEqual("Matt.1.1")
		expect(p.parse("മത്താ 1:1").osis()).toEqual("Matt.1.1")
		expect(p.parse("MATT 1:1").osis()).toEqual("Matt.1.1")
		;
      return true;
    });
  });

  describe("Localized book Mark (ml)", function() {
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
    return it("should handle book: Mark (ml)", function() {
      
		expect(p.parse("മർക്കൊസ് 1:1").osis()).toEqual("Mark.1.1")
		expect(p.parse("മർക്കൊ 1:1").osis()).toEqual("Mark.1.1")
		expect(p.parse("Mark 1:1").osis()).toEqual("Mark.1.1")
		p.include_apocrypha(false)
		expect(p.parse("മർക്കൊസ് 1:1").osis()).toEqual("Mark.1.1")
		expect(p.parse("മർക്കൊ 1:1").osis()).toEqual("Mark.1.1")
		expect(p.parse("MARK 1:1").osis()).toEqual("Mark.1.1")
		;
      return true;
    });
  });

  describe("Localized book Luke (ml)", function() {
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
    return it("should handle book: Luke (ml)", function() {
      
		expect(p.parse("ലൂക്കൊസ് 1:1").osis()).toEqual("Luke.1.1")
		expect(p.parse("ലൂക്കോസ് 1:1").osis()).toEqual("Luke.1.1")
		expect(p.parse("ലൂക്കൊ 1:1").osis()).toEqual("Luke.1.1")
		expect(p.parse("Luke 1:1").osis()).toEqual("Luke.1.1")
		p.include_apocrypha(false)
		expect(p.parse("ലൂക്കൊസ് 1:1").osis()).toEqual("Luke.1.1")
		expect(p.parse("ലൂക്കോസ് 1:1").osis()).toEqual("Luke.1.1")
		expect(p.parse("ലൂക്കൊ 1:1").osis()).toEqual("Luke.1.1")
		expect(p.parse("LUKE 1:1").osis()).toEqual("Luke.1.1")
		;
      return true;
    });
  });

  describe("Localized book 1John (ml)", function() {
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
    return it("should handle book: 1John (ml)", function() {
      
		expect(p.parse("1.. യോഹന്നാൻ 1:1").osis()).toEqual("1John.1.1")
		expect(p.parse("1. യോഹന്നാൻ 1:1").osis()).toEqual("1John.1.1")
		expect(p.parse("1 യോഹന്നാൻ 1:1").osis()).toEqual("1John.1.1")
		expect(p.parse("1.. യോഹ 1:1").osis()).toEqual("1John.1.1")
		expect(p.parse("1. യോഹ 1:1").osis()).toEqual("1John.1.1")
		expect(p.parse("1 യോഹ 1:1").osis()).toEqual("1John.1.1")
		expect(p.parse("1John 1:1").osis()).toEqual("1John.1.1")
		p.include_apocrypha(false)
		expect(p.parse("1.. യോഹന്നാൻ 1:1").osis()).toEqual("1John.1.1")
		expect(p.parse("1. യോഹന്നാൻ 1:1").osis()).toEqual("1John.1.1")
		expect(p.parse("1 യോഹന്നാൻ 1:1").osis()).toEqual("1John.1.1")
		expect(p.parse("1.. യോഹ 1:1").osis()).toEqual("1John.1.1")
		expect(p.parse("1. യോഹ 1:1").osis()).toEqual("1John.1.1")
		expect(p.parse("1 യോഹ 1:1").osis()).toEqual("1John.1.1")
		expect(p.parse("1JOHN 1:1").osis()).toEqual("1John.1.1")
		;
      return true;
    });
  });

  describe("Localized book 2John (ml)", function() {
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
    return it("should handle book: 2John (ml)", function() {
      
		expect(p.parse("2.. യോഹന്നാൻ 1:1").osis()).toEqual("2John.1.1")
		expect(p.parse("2. യോഹന്നാൻ 1:1").osis()).toEqual("2John.1.1")
		expect(p.parse("2 യോഹന്നാൻ 1:1").osis()).toEqual("2John.1.1")
		expect(p.parse("2.. യോഹ 1:1").osis()).toEqual("2John.1.1")
		expect(p.parse("2. യോഹ 1:1").osis()).toEqual("2John.1.1")
		expect(p.parse("2 യോഹ 1:1").osis()).toEqual("2John.1.1")
		expect(p.parse("2John 1:1").osis()).toEqual("2John.1.1")
		p.include_apocrypha(false)
		expect(p.parse("2.. യോഹന്നാൻ 1:1").osis()).toEqual("2John.1.1")
		expect(p.parse("2. യോഹന്നാൻ 1:1").osis()).toEqual("2John.1.1")
		expect(p.parse("2 യോഹന്നാൻ 1:1").osis()).toEqual("2John.1.1")
		expect(p.parse("2.. യോഹ 1:1").osis()).toEqual("2John.1.1")
		expect(p.parse("2. യോഹ 1:1").osis()).toEqual("2John.1.1")
		expect(p.parse("2 യോഹ 1:1").osis()).toEqual("2John.1.1")
		expect(p.parse("2JOHN 1:1").osis()).toEqual("2John.1.1")
		;
      return true;
    });
  });

  describe("Localized book 3John (ml)", function() {
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
    return it("should handle book: 3John (ml)", function() {
      
		expect(p.parse("3.. യോഹന്നാൻ 1:1").osis()).toEqual("3John.1.1")
		expect(p.parse("3. യോഹന്നാൻ 1:1").osis()).toEqual("3John.1.1")
		expect(p.parse("3 യോഹന്നാൻ 1:1").osis()).toEqual("3John.1.1")
		expect(p.parse("3.. യോഹ 1:1").osis()).toEqual("3John.1.1")
		expect(p.parse("3. യോഹ 1:1").osis()).toEqual("3John.1.1")
		expect(p.parse("3 യോഹ 1:1").osis()).toEqual("3John.1.1")
		expect(p.parse("3John 1:1").osis()).toEqual("3John.1.1")
		p.include_apocrypha(false)
		expect(p.parse("3.. യോഹന്നാൻ 1:1").osis()).toEqual("3John.1.1")
		expect(p.parse("3. യോഹന്നാൻ 1:1").osis()).toEqual("3John.1.1")
		expect(p.parse("3 യോഹന്നാൻ 1:1").osis()).toEqual("3John.1.1")
		expect(p.parse("3.. യോഹ 1:1").osis()).toEqual("3John.1.1")
		expect(p.parse("3. യോഹ 1:1").osis()).toEqual("3John.1.1")
		expect(p.parse("3 യോഹ 1:1").osis()).toEqual("3John.1.1")
		expect(p.parse("3JOHN 1:1").osis()).toEqual("3John.1.1")
		;
      return true;
    });
  });

  describe("Localized book John (ml)", function() {
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
    return it("should handle book: John (ml)", function() {
      
		expect(p.parse("യോഹന്നാൻ 1:1").osis()).toEqual("John.1.1")
		expect(p.parse("John 1:1").osis()).toEqual("John.1.1")
		expect(p.parse("യോഹ 1:1").osis()).toEqual("John.1.1")
		p.include_apocrypha(false)
		expect(p.parse("യോഹന്നാൻ 1:1").osis()).toEqual("John.1.1")
		expect(p.parse("JOHN 1:1").osis()).toEqual("John.1.1")
		expect(p.parse("യോഹ 1:1").osis()).toEqual("John.1.1")
		;
      return true;
    });
  });

  describe("Localized book Acts (ml)", function() {
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
    return it("should handle book: Acts (ml)", function() {
      
		expect(p.parse("അപ്പ. പ്രവര്‍ത്തനങ്ങള്‍ 1:1").osis()).toEqual("Acts.1.1")
		expect(p.parse("അപ്പ പ്രവര്‍ത്തനങ്ങള്‍ 1:1").osis()).toEqual("Acts.1.1")
		expect(p.parse("അപ്പൊ. പ്രവൃത്തികൾ 1:1").osis()).toEqual("Acts.1.1")
		expect(p.parse("അപ്പൊ പ്രവൃത്തികൾ 1:1").osis()).toEqual("Acts.1.1")
		expect(p.parse("പ്രവൃത്തികൾ 1:1").osis()).toEqual("Acts.1.1")
		expect(p.parse("അ. പ്ര 1:1").osis()).toEqual("Acts.1.1")
		expect(p.parse("അ പ്ര 1:1").osis()).toEqual("Acts.1.1")
		expect(p.parse("അ.പ്ര 1:1").osis()).toEqual("Acts.1.1")
		expect(p.parse("Acts 1:1").osis()).toEqual("Acts.1.1")
		expect(p.parse("അ. പ 1:1").osis()).toEqual("Acts.1.1")
		expect(p.parse("അപ്ര 1:1").osis()).toEqual("Acts.1.1")
		expect(p.parse("അ പ 1:1").osis()).toEqual("Acts.1.1")
		expect(p.parse("അ.പ 1:1").osis()).toEqual("Acts.1.1")
		expect(p.parse("അപ 1:1").osis()).toEqual("Acts.1.1")
		p.include_apocrypha(false)
		expect(p.parse("അപ്പ. പ്രവര്‍ത്തനങ്ങള്‍ 1:1").osis()).toEqual("Acts.1.1")
		expect(p.parse("അപ്പ പ്രവര്‍ത്തനങ്ങള്‍ 1:1").osis()).toEqual("Acts.1.1")
		expect(p.parse("അപ്പൊ. പ്രവൃത്തികൾ 1:1").osis()).toEqual("Acts.1.1")
		expect(p.parse("അപ്പൊ പ്രവൃത്തികൾ 1:1").osis()).toEqual("Acts.1.1")
		expect(p.parse("പ്രവൃത്തികൾ 1:1").osis()).toEqual("Acts.1.1")
		expect(p.parse("അ. പ്ര 1:1").osis()).toEqual("Acts.1.1")
		expect(p.parse("അ പ്ര 1:1").osis()).toEqual("Acts.1.1")
		expect(p.parse("അ.പ്ര 1:1").osis()).toEqual("Acts.1.1")
		expect(p.parse("ACTS 1:1").osis()).toEqual("Acts.1.1")
		expect(p.parse("അ. പ 1:1").osis()).toEqual("Acts.1.1")
		expect(p.parse("അപ്ര 1:1").osis()).toEqual("Acts.1.1")
		expect(p.parse("അ പ 1:1").osis()).toEqual("Acts.1.1")
		expect(p.parse("അ.പ 1:1").osis()).toEqual("Acts.1.1")
		expect(p.parse("അപ 1:1").osis()).toEqual("Acts.1.1")
		;
      return true;
    });
  });

  describe("Localized book Rom (ml)", function() {
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
    return it("should handle book: Rom (ml)", function() {
      
		expect(p.parse("റോമർ 1:1").osis()).toEqual("Rom.1.1")
		expect(p.parse("Rom 1:1").osis()).toEqual("Rom.1.1")
		expect(p.parse("റോമ 1:1").osis()).toEqual("Rom.1.1")
		p.include_apocrypha(false)
		expect(p.parse("റോമർ 1:1").osis()).toEqual("Rom.1.1")
		expect(p.parse("ROM 1:1").osis()).toEqual("Rom.1.1")
		expect(p.parse("റോമ 1:1").osis()).toEqual("Rom.1.1")
		;
      return true;
    });
  });

  describe("Localized book 2Cor (ml)", function() {
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
    return it("should handle book: 2Cor (ml)", function() {
      
		expect(p.parse("2.. കൊരിന്ത്യർ 1:1").osis()).toEqual("2Cor.1.1")
		expect(p.parse("2. കൊരിന്ത്യർ 1:1").osis()).toEqual("2Cor.1.1")
		expect(p.parse("2 കൊരിന്ത്യർ 1:1").osis()).toEqual("2Cor.1.1")
		expect(p.parse("2.. കൊരി 1:1").osis()).toEqual("2Cor.1.1")
		expect(p.parse("2. കൊരി 1:1").osis()).toEqual("2Cor.1.1")
		expect(p.parse("2 കൊരി 1:1").osis()).toEqual("2Cor.1.1")
		expect(p.parse("2Cor 1:1").osis()).toEqual("2Cor.1.1")
		p.include_apocrypha(false)
		expect(p.parse("2.. കൊരിന്ത്യർ 1:1").osis()).toEqual("2Cor.1.1")
		expect(p.parse("2. കൊരിന്ത്യർ 1:1").osis()).toEqual("2Cor.1.1")
		expect(p.parse("2 കൊരിന്ത്യർ 1:1").osis()).toEqual("2Cor.1.1")
		expect(p.parse("2.. കൊരി 1:1").osis()).toEqual("2Cor.1.1")
		expect(p.parse("2. കൊരി 1:1").osis()).toEqual("2Cor.1.1")
		expect(p.parse("2 കൊരി 1:1").osis()).toEqual("2Cor.1.1")
		expect(p.parse("2COR 1:1").osis()).toEqual("2Cor.1.1")
		;
      return true;
    });
  });

  describe("Localized book 1Cor (ml)", function() {
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
    return it("should handle book: 1Cor (ml)", function() {
      
		expect(p.parse("1.. കൊരിന്ത്യർ 1:1").osis()).toEqual("1Cor.1.1")
		expect(p.parse("1. കൊരിന്ത്യർ 1:1").osis()).toEqual("1Cor.1.1")
		expect(p.parse("1 കൊരിന്ത്യർ 1:1").osis()).toEqual("1Cor.1.1")
		expect(p.parse("1.. കൊരി 1:1").osis()).toEqual("1Cor.1.1")
		expect(p.parse("1. കൊരി 1:1").osis()).toEqual("1Cor.1.1")
		expect(p.parse("1 കൊരി 1:1").osis()).toEqual("1Cor.1.1")
		expect(p.parse("1Cor 1:1").osis()).toEqual("1Cor.1.1")
		p.include_apocrypha(false)
		expect(p.parse("1.. കൊരിന്ത്യർ 1:1").osis()).toEqual("1Cor.1.1")
		expect(p.parse("1. കൊരിന്ത്യർ 1:1").osis()).toEqual("1Cor.1.1")
		expect(p.parse("1 കൊരിന്ത്യർ 1:1").osis()).toEqual("1Cor.1.1")
		expect(p.parse("1.. കൊരി 1:1").osis()).toEqual("1Cor.1.1")
		expect(p.parse("1. കൊരി 1:1").osis()).toEqual("1Cor.1.1")
		expect(p.parse("1 കൊരി 1:1").osis()).toEqual("1Cor.1.1")
		expect(p.parse("1COR 1:1").osis()).toEqual("1Cor.1.1")
		;
      return true;
    });
  });

  describe("Localized book Gal (ml)", function() {
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
    return it("should handle book: Gal (ml)", function() {
      
		expect(p.parse("ഗലാത്തിയാ 1:1").osis()).toEqual("Gal.1.1")
		expect(p.parse("ഗലാത്യർ 1:1").osis()).toEqual("Gal.1.1")
		expect(p.parse("Gal 1:1").osis()).toEqual("Gal.1.1")
		expect(p.parse("ഗലാ 1:1").osis()).toEqual("Gal.1.1")
		p.include_apocrypha(false)
		expect(p.parse("ഗലാത്തിയാ 1:1").osis()).toEqual("Gal.1.1")
		expect(p.parse("ഗലാത്യർ 1:1").osis()).toEqual("Gal.1.1")
		expect(p.parse("GAL 1:1").osis()).toEqual("Gal.1.1")
		expect(p.parse("ഗലാ 1:1").osis()).toEqual("Gal.1.1")
		;
      return true;
    });
  });

  describe("Localized book Eph (ml)", function() {
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
    return it("should handle book: Eph (ml)", function() {
      
		expect(p.parse("എഫെസ്യർ 1:1").osis()).toEqual("Eph.1.1")
		expect(p.parse("എഫേസോസ് 1:1").osis()).toEqual("Eph.1.1")
		expect(p.parse("Eph 1:1").osis()).toEqual("Eph.1.1")
		expect(p.parse("എഫെ 1:1").osis()).toEqual("Eph.1.1")
		p.include_apocrypha(false)
		expect(p.parse("എഫെസ്യർ 1:1").osis()).toEqual("Eph.1.1")
		expect(p.parse("എഫേസോസ് 1:1").osis()).toEqual("Eph.1.1")
		expect(p.parse("EPH 1:1").osis()).toEqual("Eph.1.1")
		expect(p.parse("എഫെ 1:1").osis()).toEqual("Eph.1.1")
		;
      return true;
    });
  });

  describe("Localized book Phil (ml)", function() {
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
    return it("should handle book: Phil (ml)", function() {
      
		expect(p.parse("ഫിലിപ്പിയർ 1:1").osis()).toEqual("Phil.1.1")
		expect(p.parse("ഫിലിപ്പി 1:1").osis()).toEqual("Phil.1.1")
		expect(p.parse("Phil 1:1").osis()).toEqual("Phil.1.1")
		expect(p.parse("ഫിലി 1:1").osis()).toEqual("Phil.1.1")
		p.include_apocrypha(false)
		expect(p.parse("ഫിലിപ്പിയർ 1:1").osis()).toEqual("Phil.1.1")
		expect(p.parse("ഫിലിപ്പി 1:1").osis()).toEqual("Phil.1.1")
		expect(p.parse("PHIL 1:1").osis()).toEqual("Phil.1.1")
		expect(p.parse("ഫിലി 1:1").osis()).toEqual("Phil.1.1")
		;
      return true;
    });
  });

  describe("Localized book Col (ml)", function() {
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
    return it("should handle book: Col (ml)", function() {
      
		expect(p.parse("കൊലൊസ്സ്യർ 1:1").osis()).toEqual("Col.1.1")
		expect(p.parse("കൊളോസോസ് 1:1").osis()).toEqual("Col.1.1")
		expect(p.parse("കൊലൊ 1:1").osis()).toEqual("Col.1.1")
		expect(p.parse("Col 1:1").osis()).toEqual("Col.1.1")
		p.include_apocrypha(false)
		expect(p.parse("കൊലൊസ്സ്യർ 1:1").osis()).toEqual("Col.1.1")
		expect(p.parse("കൊളോസോസ് 1:1").osis()).toEqual("Col.1.1")
		expect(p.parse("കൊലൊ 1:1").osis()).toEqual("Col.1.1")
		expect(p.parse("COL 1:1").osis()).toEqual("Col.1.1")
		;
      return true;
    });
  });

  describe("Localized book 2Thess (ml)", function() {
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
    return it("should handle book: 2Thess (ml)", function() {
      
		expect(p.parse("2.. തെസ്സലൊനീക്യർ 1:1").osis()).toEqual("2Thess.1.1")
		expect(p.parse("2. തെസ്സലൊനീക്യർ 1:1").osis()).toEqual("2Thess.1.1")
		expect(p.parse("2 തെസ്സലൊനീക്യർ 1:1").osis()).toEqual("2Thess.1.1")
		expect(p.parse("2.. തെസ്സ 1:1").osis()).toEqual("2Thess.1.1")
		expect(p.parse("2. തെസ്സ 1:1").osis()).toEqual("2Thess.1.1")
		expect(p.parse("2 തെസ്സ 1:1").osis()).toEqual("2Thess.1.1")
		expect(p.parse("2Thess 1:1").osis()).toEqual("2Thess.1.1")
		p.include_apocrypha(false)
		expect(p.parse("2.. തെസ്സലൊനീക്യർ 1:1").osis()).toEqual("2Thess.1.1")
		expect(p.parse("2. തെസ്സലൊനീക്യർ 1:1").osis()).toEqual("2Thess.1.1")
		expect(p.parse("2 തെസ്സലൊനീക്യർ 1:1").osis()).toEqual("2Thess.1.1")
		expect(p.parse("2.. തെസ്സ 1:1").osis()).toEqual("2Thess.1.1")
		expect(p.parse("2. തെസ്സ 1:1").osis()).toEqual("2Thess.1.1")
		expect(p.parse("2 തെസ്സ 1:1").osis()).toEqual("2Thess.1.1")
		expect(p.parse("2THESS 1:1").osis()).toEqual("2Thess.1.1")
		;
      return true;
    });
  });

  describe("Localized book 1Thess (ml)", function() {
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
    return it("should handle book: 1Thess (ml)", function() {
      
		expect(p.parse("1.. തെസ്സലൊനീക്യർ 1:1").osis()).toEqual("1Thess.1.1")
		expect(p.parse("1. തെസ്സലൊനീക്യർ 1:1").osis()).toEqual("1Thess.1.1")
		expect(p.parse("1 തെസ്സലൊനീക്യർ 1:1").osis()).toEqual("1Thess.1.1")
		expect(p.parse("1.. തെസ്സ 1:1").osis()).toEqual("1Thess.1.1")
		expect(p.parse("1. തെസ്സ 1:1").osis()).toEqual("1Thess.1.1")
		expect(p.parse("1 തെസ്സ 1:1").osis()).toEqual("1Thess.1.1")
		expect(p.parse("1Thess 1:1").osis()).toEqual("1Thess.1.1")
		p.include_apocrypha(false)
		expect(p.parse("1.. തെസ്സലൊനീക്യർ 1:1").osis()).toEqual("1Thess.1.1")
		expect(p.parse("1. തെസ്സലൊനീക്യർ 1:1").osis()).toEqual("1Thess.1.1")
		expect(p.parse("1 തെസ്സലൊനീക്യർ 1:1").osis()).toEqual("1Thess.1.1")
		expect(p.parse("1.. തെസ്സ 1:1").osis()).toEqual("1Thess.1.1")
		expect(p.parse("1. തെസ്സ 1:1").osis()).toEqual("1Thess.1.1")
		expect(p.parse("1 തെസ്സ 1:1").osis()).toEqual("1Thess.1.1")
		expect(p.parse("1THESS 1:1").osis()).toEqual("1Thess.1.1")
		;
      return true;
    });
  });

  describe("Localized book 2Tim (ml)", function() {
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
    return it("should handle book: 2Tim (ml)", function() {
      
		expect(p.parse("2.. തിമൊഥെയൊസ് 2.. തിമൊ 1:1").osis()).toEqual("2Tim.1.1")
		expect(p.parse("2. തിമൊഥെയൊസ് 2.. തിമൊ 1:1").osis()).toEqual("2Tim.1.1")
		expect(p.parse("2.. തിമൊഥെയൊസ് 2. തിമൊ 1:1").osis()).toEqual("2Tim.1.1")
		expect(p.parse("2 തിമൊഥെയൊസ് 2.. തിമൊ 1:1").osis()).toEqual("2Tim.1.1")
		expect(p.parse("2. തിമൊഥെയൊസ് 2. തിമൊ 1:1").osis()).toEqual("2Tim.1.1")
		expect(p.parse("2.. തിമൊഥെയൊസ് 2 തിമൊ 1:1").osis()).toEqual("2Tim.1.1")
		expect(p.parse("2 തിമൊഥെയൊസ് 2. തിമൊ 1:1").osis()).toEqual("2Tim.1.1")
		expect(p.parse("2. തിമൊഥെയൊസ് 2 തിമൊ 1:1").osis()).toEqual("2Tim.1.1")
		expect(p.parse("2 തിമൊഥെയൊസ് 2 തിമൊ 1:1").osis()).toEqual("2Tim.1.1")
		expect(p.parse("2.. തിമൊഥയൊസ് 1:1").osis()).toEqual("2Tim.1.1")
		expect(p.parse("2. തിമൊഥയൊസ് 1:1").osis()).toEqual("2Tim.1.1")
		expect(p.parse("2 തിമൊഥയൊസ് 1:1").osis()).toEqual("2Tim.1.1")
		expect(p.parse("2Tim 1:1").osis()).toEqual("2Tim.1.1")
		p.include_apocrypha(false)
		expect(p.parse("2.. തിമൊഥെയൊസ് 2.. തിമൊ 1:1").osis()).toEqual("2Tim.1.1")
		expect(p.parse("2. തിമൊഥെയൊസ് 2.. തിമൊ 1:1").osis()).toEqual("2Tim.1.1")
		expect(p.parse("2.. തിമൊഥെയൊസ് 2. തിമൊ 1:1").osis()).toEqual("2Tim.1.1")
		expect(p.parse("2 തിമൊഥെയൊസ് 2.. തിമൊ 1:1").osis()).toEqual("2Tim.1.1")
		expect(p.parse("2. തിമൊഥെയൊസ് 2. തിമൊ 1:1").osis()).toEqual("2Tim.1.1")
		expect(p.parse("2.. തിമൊഥെയൊസ് 2 തിമൊ 1:1").osis()).toEqual("2Tim.1.1")
		expect(p.parse("2 തിമൊഥെയൊസ് 2. തിമൊ 1:1").osis()).toEqual("2Tim.1.1")
		expect(p.parse("2. തിമൊഥെയൊസ് 2 തിമൊ 1:1").osis()).toEqual("2Tim.1.1")
		expect(p.parse("2 തിമൊഥെയൊസ് 2 തിമൊ 1:1").osis()).toEqual("2Tim.1.1")
		expect(p.parse("2.. തിമൊഥയൊസ് 1:1").osis()).toEqual("2Tim.1.1")
		expect(p.parse("2. തിമൊഥയൊസ് 1:1").osis()).toEqual("2Tim.1.1")
		expect(p.parse("2 തിമൊഥയൊസ് 1:1").osis()).toEqual("2Tim.1.1")
		expect(p.parse("2TIM 1:1").osis()).toEqual("2Tim.1.1")
		;
      return true;
    });
  });

  describe("Localized book 1Tim (ml)", function() {
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
    return it("should handle book: 1Tim (ml)", function() {
      
		expect(p.parse("1.. തിമൊഥെയൊസ് 1:1").osis()).toEqual("1Tim.1.1")
		expect(p.parse("1. തിമൊഥെയൊസ് 1:1").osis()).toEqual("1Tim.1.1")
		expect(p.parse("1.. തിമൊഥയൊസ് 1:1").osis()).toEqual("1Tim.1.1")
		expect(p.parse("1 തിമൊഥെയൊസ് 1:1").osis()).toEqual("1Tim.1.1")
		expect(p.parse("1. തിമൊഥയൊസ് 1:1").osis()).toEqual("1Tim.1.1")
		expect(p.parse("1 തിമൊഥയൊസ് 1:1").osis()).toEqual("1Tim.1.1")
		expect(p.parse("1.. തിമൊ 1:1").osis()).toEqual("1Tim.1.1")
		expect(p.parse("1. തിമൊ 1:1").osis()).toEqual("1Tim.1.1")
		expect(p.parse("1 തിമൊ 1:1").osis()).toEqual("1Tim.1.1")
		expect(p.parse("1Tim 1:1").osis()).toEqual("1Tim.1.1")
		p.include_apocrypha(false)
		expect(p.parse("1.. തിമൊഥെയൊസ് 1:1").osis()).toEqual("1Tim.1.1")
		expect(p.parse("1. തിമൊഥെയൊസ് 1:1").osis()).toEqual("1Tim.1.1")
		expect(p.parse("1.. തിമൊഥയൊസ് 1:1").osis()).toEqual("1Tim.1.1")
		expect(p.parse("1 തിമൊഥെയൊസ് 1:1").osis()).toEqual("1Tim.1.1")
		expect(p.parse("1. തിമൊഥയൊസ് 1:1").osis()).toEqual("1Tim.1.1")
		expect(p.parse("1 തിമൊഥയൊസ് 1:1").osis()).toEqual("1Tim.1.1")
		expect(p.parse("1.. തിമൊ 1:1").osis()).toEqual("1Tim.1.1")
		expect(p.parse("1. തിമൊ 1:1").osis()).toEqual("1Tim.1.1")
		expect(p.parse("1 തിമൊ 1:1").osis()).toEqual("1Tim.1.1")
		expect(p.parse("1TIM 1:1").osis()).toEqual("1Tim.1.1")
		;
      return true;
    });
  });

  describe("Localized book Titus (ml)", function() {
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
    return it("should handle book: Titus (ml)", function() {
      
		expect(p.parse("തീത്തൊസ് 1:1").osis()).toEqual("Titus.1.1")
		expect(p.parse("തീത്തൊ 1:1").osis()).toEqual("Titus.1.1")
		expect(p.parse("Titus 1:1").osis()).toEqual("Titus.1.1")
		p.include_apocrypha(false)
		expect(p.parse("തീത്തൊസ് 1:1").osis()).toEqual("Titus.1.1")
		expect(p.parse("തീത്തൊ 1:1").osis()).toEqual("Titus.1.1")
		expect(p.parse("TITUS 1:1").osis()).toEqual("Titus.1.1")
		;
      return true;
    });
  });

  describe("Localized book Phlm (ml)", function() {
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
    return it("should handle book: Phlm (ml)", function() {
      
		expect(p.parse("ഫിലേമോൻ 1:1").osis()).toEqual("Phlm.1.1")
		expect(p.parse("Phlm 1:1").osis()).toEqual("Phlm.1.1")
		p.include_apocrypha(false)
		expect(p.parse("ഫിലേമോൻ 1:1").osis()).toEqual("Phlm.1.1")
		expect(p.parse("PHLM 1:1").osis()).toEqual("Phlm.1.1")
		;
      return true;
    });
  });

  describe("Localized book Heb (ml)", function() {
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
    return it("should handle book: Heb (ml)", function() {
      
		expect(p.parse("എബ്രായർ 1:1").osis()).toEqual("Heb.1.1")
		expect(p.parse("എബ്രാ 1:1").osis()).toEqual("Heb.1.1")
		expect(p.parse("Heb 1:1").osis()).toEqual("Heb.1.1")
		p.include_apocrypha(false)
		expect(p.parse("എബ്രായർ 1:1").osis()).toEqual("Heb.1.1")
		expect(p.parse("എബ്രാ 1:1").osis()).toEqual("Heb.1.1")
		expect(p.parse("HEB 1:1").osis()).toEqual("Heb.1.1")
		;
      return true;
    });
  });

  describe("Localized book Jas (ml)", function() {
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
    return it("should handle book: Jas (ml)", function() {
      
		expect(p.parse("യാക്കോബ് 1:1").osis()).toEqual("Jas.1.1")
		expect(p.parse("യാക്കോ 1:1").osis()).toEqual("Jas.1.1")
		expect(p.parse("Jas 1:1").osis()).toEqual("Jas.1.1")
		p.include_apocrypha(false)
		expect(p.parse("യാക്കോബ് 1:1").osis()).toEqual("Jas.1.1")
		expect(p.parse("യാക്കോ 1:1").osis()).toEqual("Jas.1.1")
		expect(p.parse("JAS 1:1").osis()).toEqual("Jas.1.1")
		;
      return true;
    });
  });

  describe("Localized book 2Pet (ml)", function() {
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
    return it("should handle book: 2Pet (ml)", function() {
      
		expect(p.parse("2.. പത്രൊസ് 1:1").osis()).toEqual("2Pet.1.1")
		expect(p.parse("2. പത്രൊസ് 1:1").osis()).toEqual("2Pet.1.1")
		expect(p.parse("2 പത്രൊസ് 1:1").osis()).toEqual("2Pet.1.1")
		expect(p.parse("2.. പതാസ് 1:1").osis()).toEqual("2Pet.1.1")
		expect(p.parse("2. പതാസ് 1:1").osis()).toEqual("2Pet.1.1")
		expect(p.parse("2 പതാസ് 1:1").osis()).toEqual("2Pet.1.1")
		expect(p.parse("2Pet 1:1").osis()).toEqual("2Pet.1.1")
		p.include_apocrypha(false)
		expect(p.parse("2.. പത്രൊസ് 1:1").osis()).toEqual("2Pet.1.1")
		expect(p.parse("2. പത്രൊസ് 1:1").osis()).toEqual("2Pet.1.1")
		expect(p.parse("2 പത്രൊസ് 1:1").osis()).toEqual("2Pet.1.1")
		expect(p.parse("2.. പതാസ് 1:1").osis()).toEqual("2Pet.1.1")
		expect(p.parse("2. പതാസ് 1:1").osis()).toEqual("2Pet.1.1")
		expect(p.parse("2 പതാസ് 1:1").osis()).toEqual("2Pet.1.1")
		expect(p.parse("2PET 1:1").osis()).toEqual("2Pet.1.1")
		;
      return true;
    });
  });

  describe("Localized book 1Pet (ml)", function() {
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
    return it("should handle book: 1Pet (ml)", function() {
      
		expect(p.parse("1.. പത്രൊസ് 1:1").osis()).toEqual("1Pet.1.1")
		expect(p.parse("1. പത്രൊസ് 1:1").osis()).toEqual("1Pet.1.1")
		expect(p.parse("1 പത്രൊസ് 1:1").osis()).toEqual("1Pet.1.1")
		expect(p.parse("1.. പതാസ് 1:1").osis()).toEqual("1Pet.1.1")
		expect(p.parse("1. പതാസ് 1:1").osis()).toEqual("1Pet.1.1")
		expect(p.parse("1 പതാസ് 1:1").osis()).toEqual("1Pet.1.1")
		expect(p.parse("1Pet 1:1").osis()).toEqual("1Pet.1.1")
		p.include_apocrypha(false)
		expect(p.parse("1.. പത്രൊസ് 1:1").osis()).toEqual("1Pet.1.1")
		expect(p.parse("1. പത്രൊസ് 1:1").osis()).toEqual("1Pet.1.1")
		expect(p.parse("1 പത്രൊസ് 1:1").osis()).toEqual("1Pet.1.1")
		expect(p.parse("1.. പതാസ് 1:1").osis()).toEqual("1Pet.1.1")
		expect(p.parse("1. പതാസ് 1:1").osis()).toEqual("1Pet.1.1")
		expect(p.parse("1 പതാസ് 1:1").osis()).toEqual("1Pet.1.1")
		expect(p.parse("1PET 1:1").osis()).toEqual("1Pet.1.1")
		;
      return true;
    });
  });

  describe("Localized book Jude (ml)", function() {
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
    return it("should handle book: Jude (ml)", function() {
      
		expect(p.parse("യുദാസ് 1:1").osis()).toEqual("Jude.1.1")
		expect(p.parse("Jude 1:1").osis()).toEqual("Jude.1.1")
		expect(p.parse("യൂദാ 1:1").osis()).toEqual("Jude.1.1")
		p.include_apocrypha(false)
		expect(p.parse("യുദാസ് 1:1").osis()).toEqual("Jude.1.1")
		expect(p.parse("JUDE 1:1").osis()).toEqual("Jude.1.1")
		expect(p.parse("യൂദാ 1:1").osis()).toEqual("Jude.1.1")
		;
      return true;
    });
  });

  describe("Localized book Tob (ml)", function() {
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
    return it("should handle book: Tob (ml)", function() {
      
		expect(p.parse("Tob 1:1").osis()).toEqual("Tob.1.1")
		;
      return true;
    });
  });

  describe("Localized book Jdt (ml)", function() {
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
    return it("should handle book: Jdt (ml)", function() {
      
		expect(p.parse("Jdt 1:1").osis()).toEqual("Jdt.1.1")
		;
      return true;
    });
  });

  describe("Localized book Bar (ml)", function() {
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
    return it("should handle book: Bar (ml)", function() {
      
		expect(p.parse("Bar 1:1").osis()).toEqual("Bar.1.1")
		;
      return true;
    });
  });

  describe("Localized book Sus (ml)", function() {
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
    return it("should handle book: Sus (ml)", function() {
      
		expect(p.parse("Sus 1:1").osis()).toEqual("Sus.1.1")
		;
      return true;
    });
  });

  describe("Localized book 2Macc (ml)", function() {
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
    return it("should handle book: 2Macc (ml)", function() {
      
		expect(p.parse("2Macc 1:1").osis()).toEqual("2Macc.1.1")
		;
      return true;
    });
  });

  describe("Localized book 3Macc (ml)", function() {
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
    return it("should handle book: 3Macc (ml)", function() {
      
		expect(p.parse("3Macc 1:1").osis()).toEqual("3Macc.1.1")
		;
      return true;
    });
  });

  describe("Localized book 4Macc (ml)", function() {
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
    return it("should handle book: 4Macc (ml)", function() {
      
		expect(p.parse("4Macc 1:1").osis()).toEqual("4Macc.1.1")
		;
      return true;
    });
  });

  describe("Localized book 1Macc (ml)", function() {
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
    return it("should handle book: 1Macc (ml)", function() {
      
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
      return expect(p.languages).toEqual(["ml"]);
    });
    it("should handle ranges (ml)", function() {
      expect(p.parse("Titus 1:1 ടു 2").osis()).toEqual("Titus.1.1-Titus.1.2");
      expect(p.parse("Matt 1ടു2").osis()).toEqual("Matt.1-Matt.2");
      return expect(p.parse("Phlm 2 ടു 3").osis()).toEqual("Phlm.1.2-Phlm.1.3");
    });
    it("should handle chapters (ml)", function() {
      expect(p.parse("Titus 1:1, അധ്യായം 2").osis()).toEqual("Titus.1.1,Titus.2");
      return expect(p.parse("Matt 3:4 അധ്യായം 6").osis()).toEqual("Matt.3.4,Matt.6");
    });
    it("should handle verses (ml)", function() {
      expect(p.parse("Exod 1:1 വാക്യം 3").osis()).toEqual("Exod.1.1,Exod.1.3");
      return expect(p.parse("Phlm വാക്യം 6").osis()).toEqual("Phlm.1.6");
    });
    it("should handle 'and' (ml)", function() {
      expect(p.parse("Exod 1:1 ഒപ്പം 3").osis()).toEqual("Exod.1.1,Exod.1.3");
      return expect(p.parse("Phlm 2 ഒപ്പം 6").osis()).toEqual("Phlm.1.2,Phlm.1.6");
    });
    it("should handle titles (ml)", function() {
      expect(p.parse("Ps 3 title, 4:2, 5:title").osis()).toEqual("Ps.3.1,Ps.4.2,Ps.5.1");
      return expect(p.parse("PS 3 TITLE, 4:2, 5:TITLE").osis()).toEqual("Ps.3.1,Ps.4.2,Ps.5.1");
    });
    it("should handle 'ff' (ml)", function() {
      expect(p.parse("Rev 3ff, 4:2ff").osis()).toEqual("Rev.3-Rev.22,Rev.4.2-Rev.4.11");
      return expect(p.parse("REV 3 FF, 4:2 FF").osis()).toEqual("Rev.3-Rev.22,Rev.4.2-Rev.4.11");
    });
    it("should handle translations (ml)", function() {
      expect(p.parse("Lev 1 (mlb)").osis_and_translations()).toEqual([["Lev.1", "mlb"]]);
      return expect(p.parse("lev 1 mlb").osis_and_translations()).toEqual([["Lev.1", "mlb"]]);
    });
    it("should handle book ranges (ml)", function() {
      p.set_options({
        book_alone_strategy: "full",
        book_range_strategy: "include"
      });
      return expect(p.parse("1 ടു 3  യോഹ").osis()).toEqual("1John.1-3John.1");
    });
    return it("should handle boundaries (ml)", function() {
      p.set_options({
        book_alone_strategy: "full"
      });
      expect(p.parse("\u2014Matt\u2014").osis()).toEqual("Matt.1-Matt.28");
      return expect(p.parse("\u201cMatt 1:1\u201d").osis()).toEqual("Matt.1.1");
    });
  });

}).call(this);
