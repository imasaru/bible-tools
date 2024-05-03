(function() {
  var bcv_parser;

  bcv_parser = require("../../js/hil_bcv_parser.js").bcv_parser;

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

  describe("Localized book Gen (hil)", function() {
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
    return it("should handle book: Gen (hil)", function() {
      
		expect(p.parse("Genesis 1:1").osis()).toEqual("Gen.1.1")
		expect(p.parse("Gen 1:1").osis()).toEqual("Gen.1.1")
		p.include_apocrypha(false)
		expect(p.parse("GENESIS 1:1").osis()).toEqual("Gen.1.1")
		expect(p.parse("GEN 1:1").osis()).toEqual("Gen.1.1")
		;
      return true;
    });
  });

  describe("Localized book Exod (hil)", function() {
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
    return it("should handle book: Exod (hil)", function() {
      
		expect(p.parse("Exodo 1:1").osis()).toEqual("Exod.1.1")
		expect(p.parse("Exod 1:1").osis()).toEqual("Exod.1.1")
		expect(p.parse("Ex 1:1").osis()).toEqual("Exod.1.1")
		p.include_apocrypha(false)
		expect(p.parse("EXODO 1:1").osis()).toEqual("Exod.1.1")
		expect(p.parse("EXOD 1:1").osis()).toEqual("Exod.1.1")
		expect(p.parse("EX 1:1").osis()).toEqual("Exod.1.1")
		;
      return true;
    });
  });

  describe("Localized book Bel (hil)", function() {
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
    return it("should handle book: Bel (hil)", function() {
      
		expect(p.parse("Bel 1:1").osis()).toEqual("Bel.1.1")
		;
      return true;
    });
  });

  describe("Localized book Lev (hil)", function() {
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
    return it("should handle book: Lev (hil)", function() {
      
		expect(p.parse("Levitico 1:1").osis()).toEqual("Lev.1.1")
		expect(p.parse("Lev 1:1").osis()).toEqual("Lev.1.1")
		p.include_apocrypha(false)
		expect(p.parse("LEVITICO 1:1").osis()).toEqual("Lev.1.1")
		expect(p.parse("LEV 1:1").osis()).toEqual("Lev.1.1")
		;
      return true;
    });
  });

  describe("Localized book Num (hil)", function() {
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
    return it("should handle book: Num (hil)", function() {
      
		expect(p.parse("Numeros 1:1").osis()).toEqual("Num.1.1")
		expect(p.parse("Num 1:1").osis()).toEqual("Num.1.1")
		p.include_apocrypha(false)
		expect(p.parse("NUMEROS 1:1").osis()).toEqual("Num.1.1")
		expect(p.parse("NUM 1:1").osis()).toEqual("Num.1.1")
		;
      return true;
    });
  });

  describe("Localized book Sir (hil)", function() {
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
    return it("should handle book: Sir (hil)", function() {
      
		expect(p.parse("Sir 1:1").osis()).toEqual("Sir.1.1")
		;
      return true;
    });
  });

  describe("Localized book Wis (hil)", function() {
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
    return it("should handle book: Wis (hil)", function() {
      
		expect(p.parse("Wis 1:1").osis()).toEqual("Wis.1.1")
		;
      return true;
    });
  });

  describe("Localized book Lam (hil)", function() {
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
    return it("should handle book: Lam (hil)", function() {
      
		expect(p.parse("Mga Panalabiton 1:1").osis()).toEqual("Lam.1.1")
		expect(p.parse("Panalabiton 1:1").osis()).toEqual("Lam.1.1")
		expect(p.parse("Lam 1:1").osis()).toEqual("Lam.1.1")
		expect(p.parse("Pan 1:1").osis()).toEqual("Lam.1.1")
		p.include_apocrypha(false)
		expect(p.parse("MGA PANALABITON 1:1").osis()).toEqual("Lam.1.1")
		expect(p.parse("PANALABITON 1:1").osis()).toEqual("Lam.1.1")
		expect(p.parse("LAM 1:1").osis()).toEqual("Lam.1.1")
		expect(p.parse("PAN 1:1").osis()).toEqual("Lam.1.1")
		;
      return true;
    });
  });

  describe("Localized book EpJer (hil)", function() {
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
    return it("should handle book: EpJer (hil)", function() {
      
		expect(p.parse("EpJer 1:1").osis()).toEqual("EpJer.1.1")
		;
      return true;
    });
  });

  describe("Localized book Rev (hil)", function() {
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
    return it("should handle book: Rev (hil)", function() {
      
		expect(p.parse("Bugna 1:1").osis()).toEqual("Rev.1.1")
		expect(p.parse("Bug 1:1").osis()).toEqual("Rev.1.1")
		expect(p.parse("Rev 1:1").osis()).toEqual("Rev.1.1")
		p.include_apocrypha(false)
		expect(p.parse("BUGNA 1:1").osis()).toEqual("Rev.1.1")
		expect(p.parse("BUG 1:1").osis()).toEqual("Rev.1.1")
		expect(p.parse("REV 1:1").osis()).toEqual("Rev.1.1")
		;
      return true;
    });
  });

  describe("Localized book PrMan (hil)", function() {
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
    return it("should handle book: PrMan (hil)", function() {
      
		expect(p.parse("PrMan 1:1").osis()).toEqual("PrMan.1.1")
		;
      return true;
    });
  });

  describe("Localized book Deut (hil)", function() {
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
    return it("should handle book: Deut (hil)", function() {
      
		expect(p.parse("Deuteronomio 1:1").osis()).toEqual("Deut.1.1")
		expect(p.parse("Deut 1:1").osis()).toEqual("Deut.1.1")
		p.include_apocrypha(false)
		expect(p.parse("DEUTERONOMIO 1:1").osis()).toEqual("Deut.1.1")
		expect(p.parse("DEUT 1:1").osis()).toEqual("Deut.1.1")
		;
      return true;
    });
  });

  describe("Localized book Josh (hil)", function() {
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
    return it("should handle book: Josh (hil)", function() {
      
		expect(p.parse("Josue 1:1").osis()).toEqual("Josh.1.1")
		expect(p.parse("Josh 1:1").osis()).toEqual("Josh.1.1")
		expect(p.parse("Jos 1:1").osis()).toEqual("Josh.1.1")
		p.include_apocrypha(false)
		expect(p.parse("JOSUE 1:1").osis()).toEqual("Josh.1.1")
		expect(p.parse("JOSH 1:1").osis()).toEqual("Josh.1.1")
		expect(p.parse("JOS 1:1").osis()).toEqual("Josh.1.1")
		;
      return true;
    });
  });

  describe("Localized book Judg (hil)", function() {
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
    return it("should handle book: Judg (hil)", function() {
      
		expect(p.parse("Hukom 1:1").osis()).toEqual("Judg.1.1")
		expect(p.parse("Judg 1:1").osis()).toEqual("Judg.1.1")
		expect(p.parse("Huk 1:1").osis()).toEqual("Judg.1.1")
		p.include_apocrypha(false)
		expect(p.parse("HUKOM 1:1").osis()).toEqual("Judg.1.1")
		expect(p.parse("JUDG 1:1").osis()).toEqual("Judg.1.1")
		expect(p.parse("HUK 1:1").osis()).toEqual("Judg.1.1")
		;
      return true;
    });
  });

  describe("Localized book Ruth (hil)", function() {
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
    return it("should handle book: Ruth (hil)", function() {
      
		expect(p.parse("Ruth 1:1").osis()).toEqual("Ruth.1.1")
		expect(p.parse("Rut 1:1").osis()).toEqual("Ruth.1.1")
		p.include_apocrypha(false)
		expect(p.parse("RUTH 1:1").osis()).toEqual("Ruth.1.1")
		expect(p.parse("RUT 1:1").osis()).toEqual("Ruth.1.1")
		;
      return true;
    });
  });

  describe("Localized book 1Esd (hil)", function() {
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
    return it("should handle book: 1Esd (hil)", function() {
      
		expect(p.parse("1Esd 1:1").osis()).toEqual("1Esd.1.1")
		;
      return true;
    });
  });

  describe("Localized book 2Esd (hil)", function() {
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
    return it("should handle book: 2Esd (hil)", function() {
      
		expect(p.parse("2Esd 1:1").osis()).toEqual("2Esd.1.1")
		;
      return true;
    });
  });

  describe("Localized book Isa (hil)", function() {
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
    return it("should handle book: Isa (hil)", function() {
      
		expect(p.parse("Isaias 1:1").osis()).toEqual("Isa.1.1")
		expect(p.parse("Isa 1:1").osis()).toEqual("Isa.1.1")
		p.include_apocrypha(false)
		expect(p.parse("ISAIAS 1:1").osis()).toEqual("Isa.1.1")
		expect(p.parse("ISA 1:1").osis()).toEqual("Isa.1.1")
		;
      return true;
    });
  });

  describe("Localized book 2Sam (hil)", function() {
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
    return it("should handle book: 2Sam (hil)", function() {
      
		expect(p.parse("2 Samuel 1:1").osis()).toEqual("2Sam.1.1")
		expect(p.parse("2 Sam 1:1").osis()).toEqual("2Sam.1.1")
		expect(p.parse("2Sam 1:1").osis()).toEqual("2Sam.1.1")
		p.include_apocrypha(false)
		expect(p.parse("2 SAMUEL 1:1").osis()).toEqual("2Sam.1.1")
		expect(p.parse("2 SAM 1:1").osis()).toEqual("2Sam.1.1")
		expect(p.parse("2SAM 1:1").osis()).toEqual("2Sam.1.1")
		;
      return true;
    });
  });

  describe("Localized book 1Sam (hil)", function() {
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
    return it("should handle book: 1Sam (hil)", function() {
      
		expect(p.parse("1 Samuel 1:1").osis()).toEqual("1Sam.1.1")
		expect(p.parse("1 Sam 1:1").osis()).toEqual("1Sam.1.1")
		expect(p.parse("1Sam 1:1").osis()).toEqual("1Sam.1.1")
		p.include_apocrypha(false)
		expect(p.parse("1 SAMUEL 1:1").osis()).toEqual("1Sam.1.1")
		expect(p.parse("1 SAM 1:1").osis()).toEqual("1Sam.1.1")
		expect(p.parse("1SAM 1:1").osis()).toEqual("1Sam.1.1")
		;
      return true;
    });
  });

  describe("Localized book 2Kgs (hil)", function() {
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
    return it("should handle book: 2Kgs (hil)", function() {
      
		expect(p.parse("2 Mga Hari 1:1").osis()).toEqual("2Kgs.1.1")
		expect(p.parse("2 Hari 1:1").osis()).toEqual("2Kgs.1.1")
		expect(p.parse("2Kgs 1:1").osis()).toEqual("2Kgs.1.1")
		p.include_apocrypha(false)
		expect(p.parse("2 MGA HARI 1:1").osis()).toEqual("2Kgs.1.1")
		expect(p.parse("2 HARI 1:1").osis()).toEqual("2Kgs.1.1")
		expect(p.parse("2KGS 1:1").osis()).toEqual("2Kgs.1.1")
		;
      return true;
    });
  });

  describe("Localized book 1Kgs (hil)", function() {
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
    return it("should handle book: 1Kgs (hil)", function() {
      
		expect(p.parse("1 Mga Hari 1:1").osis()).toEqual("1Kgs.1.1")
		expect(p.parse("1 Hari 1:1").osis()).toEqual("1Kgs.1.1")
		expect(p.parse("1Kgs 1:1").osis()).toEqual("1Kgs.1.1")
		p.include_apocrypha(false)
		expect(p.parse("1 MGA HARI 1:1").osis()).toEqual("1Kgs.1.1")
		expect(p.parse("1 HARI 1:1").osis()).toEqual("1Kgs.1.1")
		expect(p.parse("1KGS 1:1").osis()).toEqual("1Kgs.1.1")
		;
      return true;
    });
  });

  describe("Localized book 2Chr (hil)", function() {
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
    return it("should handle book: 2Chr (hil)", function() {
      
		expect(p.parse("2 Mga Cronica 1:1").osis()).toEqual("2Chr.1.1")
		expect(p.parse("2 Cron 1:1").osis()).toEqual("2Chr.1.1")
		expect(p.parse("2Chr 1:1").osis()).toEqual("2Chr.1.1")
		p.include_apocrypha(false)
		expect(p.parse("2 MGA CRONICA 1:1").osis()).toEqual("2Chr.1.1")
		expect(p.parse("2 CRON 1:1").osis()).toEqual("2Chr.1.1")
		expect(p.parse("2CHR 1:1").osis()).toEqual("2Chr.1.1")
		;
      return true;
    });
  });

  describe("Localized book 1Chr (hil)", function() {
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
    return it("should handle book: 1Chr (hil)", function() {
      
		expect(p.parse("1 Mga Cronica 1:1").osis()).toEqual("1Chr.1.1")
		expect(p.parse("1 Cron 1:1").osis()).toEqual("1Chr.1.1")
		expect(p.parse("1Chr 1:1").osis()).toEqual("1Chr.1.1")
		p.include_apocrypha(false)
		expect(p.parse("1 MGA CRONICA 1:1").osis()).toEqual("1Chr.1.1")
		expect(p.parse("1 CRON 1:1").osis()).toEqual("1Chr.1.1")
		expect(p.parse("1CHR 1:1").osis()).toEqual("1Chr.1.1")
		;
      return true;
    });
  });

  describe("Localized book Ezra (hil)", function() {
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
    return it("should handle book: Ezra (hil)", function() {
      
		expect(p.parse("Esdras 1:1").osis()).toEqual("Ezra.1.1")
		expect(p.parse("Ezra 1:1").osis()).toEqual("Ezra.1.1")
		expect(p.parse("Esd 1:1").osis()).toEqual("Ezra.1.1")
		p.include_apocrypha(false)
		expect(p.parse("ESDRAS 1:1").osis()).toEqual("Ezra.1.1")
		expect(p.parse("EZRA 1:1").osis()).toEqual("Ezra.1.1")
		expect(p.parse("ESD 1:1").osis()).toEqual("Ezra.1.1")
		;
      return true;
    });
  });

  describe("Localized book Neh (hil)", function() {
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
    return it("should handle book: Neh (hil)", function() {
      
		expect(p.parse("Nehemias 1:1").osis()).toEqual("Neh.1.1")
		expect(p.parse("Neh 1:1").osis()).toEqual("Neh.1.1")
		p.include_apocrypha(false)
		expect(p.parse("NEHEMIAS 1:1").osis()).toEqual("Neh.1.1")
		expect(p.parse("NEH 1:1").osis()).toEqual("Neh.1.1")
		;
      return true;
    });
  });

  describe("Localized book GkEsth (hil)", function() {
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
    return it("should handle book: GkEsth (hil)", function() {
      
		expect(p.parse("GkEsth 1:1").osis()).toEqual("GkEsth.1.1")
		;
      return true;
    });
  });

  describe("Localized book Esth (hil)", function() {
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
    return it("should handle book: Esth (hil)", function() {
      
		expect(p.parse("Ester 1:1").osis()).toEqual("Esth.1.1")
		expect(p.parse("Esth 1:1").osis()).toEqual("Esth.1.1")
		expect(p.parse("Est 1:1").osis()).toEqual("Esth.1.1")
		p.include_apocrypha(false)
		expect(p.parse("ESTER 1:1").osis()).toEqual("Esth.1.1")
		expect(p.parse("ESTH 1:1").osis()).toEqual("Esth.1.1")
		expect(p.parse("EST 1:1").osis()).toEqual("Esth.1.1")
		;
      return true;
    });
  });

  describe("Localized book Job (hil)", function() {
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
    return it("should handle book: Job (hil)", function() {
      
		expect(p.parse("Job 1:1").osis()).toEqual("Job.1.1")
		p.include_apocrypha(false)
		expect(p.parse("JOB 1:1").osis()).toEqual("Job.1.1")
		;
      return true;
    });
  });

  describe("Localized book Ps (hil)", function() {
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
    return it("should handle book: Ps (hil)", function() {
      
		expect(p.parse("Mga Salmo 1:1").osis()).toEqual("Ps.1.1")
		expect(p.parse("Salmo 1:1").osis()).toEqual("Ps.1.1")
		expect(p.parse("Sal 1:1").osis()).toEqual("Ps.1.1")
		expect(p.parse("Ps 1:1").osis()).toEqual("Ps.1.1")
		p.include_apocrypha(false)
		expect(p.parse("MGA SALMO 1:1").osis()).toEqual("Ps.1.1")
		expect(p.parse("SALMO 1:1").osis()).toEqual("Ps.1.1")
		expect(p.parse("SAL 1:1").osis()).toEqual("Ps.1.1")
		expect(p.parse("PS 1:1").osis()).toEqual("Ps.1.1")
		;
      return true;
    });
  });

  describe("Localized book PrAzar (hil)", function() {
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
    return it("should handle book: PrAzar (hil)", function() {
      
		expect(p.parse("PrAzar 1:1").osis()).toEqual("PrAzar.1.1")
		;
      return true;
    });
  });

  describe("Localized book Prov (hil)", function() {
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
    return it("should handle book: Prov (hil)", function() {
      
		expect(p.parse("Mga Hulobaton 1:1").osis()).toEqual("Prov.1.1")
		expect(p.parse("Mga Hulubaton 1:1").osis()).toEqual("Prov.1.1")
		expect(p.parse("Hulubaton 1:1").osis()).toEqual("Prov.1.1")
		expect(p.parse("Hulo 1:1").osis()).toEqual("Prov.1.1")
		expect(p.parse("Prov 1:1").osis()).toEqual("Prov.1.1")
		p.include_apocrypha(false)
		expect(p.parse("MGA HULOBATON 1:1").osis()).toEqual("Prov.1.1")
		expect(p.parse("MGA HULUBATON 1:1").osis()).toEqual("Prov.1.1")
		expect(p.parse("HULUBATON 1:1").osis()).toEqual("Prov.1.1")
		expect(p.parse("HULO 1:1").osis()).toEqual("Prov.1.1")
		expect(p.parse("PROV 1:1").osis()).toEqual("Prov.1.1")
		;
      return true;
    });
  });

  describe("Localized book Eccl (hil)", function() {
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
    return it("should handle book: Eccl (hil)", function() {
      
		expect(p.parse("Manugwali 1:1").osis()).toEqual("Eccl.1.1")
		expect(p.parse("Manug 1:1").osis()).toEqual("Eccl.1.1")
		expect(p.parse("Eccl 1:1").osis()).toEqual("Eccl.1.1")
		p.include_apocrypha(false)
		expect(p.parse("MANUGWALI 1:1").osis()).toEqual("Eccl.1.1")
		expect(p.parse("MANUG 1:1").osis()).toEqual("Eccl.1.1")
		expect(p.parse("ECCL 1:1").osis()).toEqual("Eccl.1.1")
		;
      return true;
    });
  });

  describe("Localized book SgThree (hil)", function() {
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
    return it("should handle book: SgThree (hil)", function() {
      
		expect(p.parse("SgThree 1:1").osis()).toEqual("SgThree.1.1")
		;
      return true;
    });
  });

  describe("Localized book Song (hil)", function() {
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
    return it("should handle book: Song (hil)", function() {
      
		expect(p.parse("Ambahanon 1:1").osis()).toEqual("Song.1.1")
		expect(p.parse("Song 1:1").osis()).toEqual("Song.1.1")
		expect(p.parse("Amb 1:1").osis()).toEqual("Song.1.1")
		p.include_apocrypha(false)
		expect(p.parse("AMBAHANON 1:1").osis()).toEqual("Song.1.1")
		expect(p.parse("SONG 1:1").osis()).toEqual("Song.1.1")
		expect(p.parse("AMB 1:1").osis()).toEqual("Song.1.1")
		;
      return true;
    });
  });

  describe("Localized book Jer (hil)", function() {
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
    return it("should handle book: Jer (hil)", function() {
      
		expect(p.parse("Jeremias 1:1").osis()).toEqual("Jer.1.1")
		expect(p.parse("Jer 1:1").osis()).toEqual("Jer.1.1")
		p.include_apocrypha(false)
		expect(p.parse("JEREMIAS 1:1").osis()).toEqual("Jer.1.1")
		expect(p.parse("JER 1:1").osis()).toEqual("Jer.1.1")
		;
      return true;
    });
  });

  describe("Localized book Ezek (hil)", function() {
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
    return it("should handle book: Ezek (hil)", function() {
      
		expect(p.parse("Ezequiel 1:1").osis()).toEqual("Ezek.1.1")
		expect(p.parse("Ezek 1:1").osis()).toEqual("Ezek.1.1")
		expect(p.parse("Ezeq 1:1").osis()).toEqual("Ezek.1.1")
		p.include_apocrypha(false)
		expect(p.parse("EZEQUIEL 1:1").osis()).toEqual("Ezek.1.1")
		expect(p.parse("EZEK 1:1").osis()).toEqual("Ezek.1.1")
		expect(p.parse("EZEQ 1:1").osis()).toEqual("Ezek.1.1")
		;
      return true;
    });
  });

  describe("Localized book Dan (hil)", function() {
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
    return it("should handle book: Dan (hil)", function() {
      
		expect(p.parse("Daniel 1:1").osis()).toEqual("Dan.1.1")
		expect(p.parse("Dan 1:1").osis()).toEqual("Dan.1.1")
		p.include_apocrypha(false)
		expect(p.parse("DANIEL 1:1").osis()).toEqual("Dan.1.1")
		expect(p.parse("DAN 1:1").osis()).toEqual("Dan.1.1")
		;
      return true;
    });
  });

  describe("Localized book Hos (hil)", function() {
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
    return it("should handle book: Hos (hil)", function() {
      
		expect(p.parse("Oseas 1:1").osis()).toEqual("Hos.1.1")
		expect(p.parse("Hos 1:1").osis()).toEqual("Hos.1.1")
		expect(p.parse("Os 1:1").osis()).toEqual("Hos.1.1")
		p.include_apocrypha(false)
		expect(p.parse("OSEAS 1:1").osis()).toEqual("Hos.1.1")
		expect(p.parse("HOS 1:1").osis()).toEqual("Hos.1.1")
		expect(p.parse("OS 1:1").osis()).toEqual("Hos.1.1")
		;
      return true;
    });
  });

  describe("Localized book Joel (hil)", function() {
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
    return it("should handle book: Joel (hil)", function() {
      
		expect(p.parse("Joel 1:1").osis()).toEqual("Joel.1.1")
		p.include_apocrypha(false)
		expect(p.parse("JOEL 1:1").osis()).toEqual("Joel.1.1")
		;
      return true;
    });
  });

  describe("Localized book Amos (hil)", function() {
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
    return it("should handle book: Amos (hil)", function() {
      
		expect(p.parse("Amos 1:1").osis()).toEqual("Amos.1.1")
		p.include_apocrypha(false)
		expect(p.parse("AMOS 1:1").osis()).toEqual("Amos.1.1")
		;
      return true;
    });
  });

  describe("Localized book Obad (hil)", function() {
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
    return it("should handle book: Obad (hil)", function() {
      
		expect(p.parse("Abdias 1:1").osis()).toEqual("Obad.1.1")
		expect(p.parse("Obad 1:1").osis()).toEqual("Obad.1.1")
		expect(p.parse("Ab 1:1").osis()).toEqual("Obad.1.1")
		p.include_apocrypha(false)
		expect(p.parse("ABDIAS 1:1").osis()).toEqual("Obad.1.1")
		expect(p.parse("OBAD 1:1").osis()).toEqual("Obad.1.1")
		expect(p.parse("AB 1:1").osis()).toEqual("Obad.1.1")
		;
      return true;
    });
  });

  describe("Localized book Jonah (hil)", function() {
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
    return it("should handle book: Jonah (hil)", function() {
      
		expect(p.parse("Jonah 1:1").osis()).toEqual("Jonah.1.1")
		expect(p.parse("Jonas 1:1").osis()).toEqual("Jonah.1.1")
		expect(p.parse("Jon 1:1").osis()).toEqual("Jonah.1.1")
		p.include_apocrypha(false)
		expect(p.parse("JONAH 1:1").osis()).toEqual("Jonah.1.1")
		expect(p.parse("JONAS 1:1").osis()).toEqual("Jonah.1.1")
		expect(p.parse("JON 1:1").osis()).toEqual("Jonah.1.1")
		;
      return true;
    });
  });

  describe("Localized book Mic (hil)", function() {
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
    return it("should handle book: Mic (hil)", function() {
      
		expect(p.parse("Miqueas 1:1").osis()).toEqual("Mic.1.1")
		expect(p.parse("Mic 1:1").osis()).toEqual("Mic.1.1")
		expect(p.parse("Miq 1:1").osis()).toEqual("Mic.1.1")
		p.include_apocrypha(false)
		expect(p.parse("MIQUEAS 1:1").osis()).toEqual("Mic.1.1")
		expect(p.parse("MIC 1:1").osis()).toEqual("Mic.1.1")
		expect(p.parse("MIQ 1:1").osis()).toEqual("Mic.1.1")
		;
      return true;
    });
  });

  describe("Localized book Nah (hil)", function() {
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
    return it("should handle book: Nah (hil)", function() {
      
		expect(p.parse("Nahum 1:1").osis()).toEqual("Nah.1.1")
		expect(p.parse("Nah 1:1").osis()).toEqual("Nah.1.1")
		p.include_apocrypha(false)
		expect(p.parse("NAHUM 1:1").osis()).toEqual("Nah.1.1")
		expect(p.parse("NAH 1:1").osis()).toEqual("Nah.1.1")
		;
      return true;
    });
  });

  describe("Localized book Hab (hil)", function() {
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
    return it("should handle book: Hab (hil)", function() {
      
		expect(p.parse("Habacuc 1:1").osis()).toEqual("Hab.1.1")
		expect(p.parse("Hab 1:1").osis()).toEqual("Hab.1.1")
		p.include_apocrypha(false)
		expect(p.parse("HABACUC 1:1").osis()).toEqual("Hab.1.1")
		expect(p.parse("HAB 1:1").osis()).toEqual("Hab.1.1")
		;
      return true;
    });
  });

  describe("Localized book Zeph (hil)", function() {
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
    return it("should handle book: Zeph (hil)", function() {
      
		expect(p.parse("Sofonias Sof 1:1").osis()).toEqual("Zeph.1.1")
		expect(p.parse("Zeph 1:1").osis()).toEqual("Zeph.1.1")
		p.include_apocrypha(false)
		expect(p.parse("SOFONIAS SOF 1:1").osis()).toEqual("Zeph.1.1")
		expect(p.parse("ZEPH 1:1").osis()).toEqual("Zeph.1.1")
		;
      return true;
    });
  });

  describe("Localized book Hag (hil)", function() {
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
    return it("should handle book: Hag (hil)", function() {
      
		expect(p.parse("Hageo 1:1").osis()).toEqual("Hag.1.1")
		expect(p.parse("Hag 1:1").osis()).toEqual("Hag.1.1")
		p.include_apocrypha(false)
		expect(p.parse("HAGEO 1:1").osis()).toEqual("Hag.1.1")
		expect(p.parse("HAG 1:1").osis()).toEqual("Hag.1.1")
		;
      return true;
    });
  });

  describe("Localized book Zech (hil)", function() {
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
    return it("should handle book: Zech (hil)", function() {
      
		expect(p.parse("Zacarias 1:1").osis()).toEqual("Zech.1.1")
		expect(p.parse("Zech 1:1").osis()).toEqual("Zech.1.1")
		expect(p.parse("Zac 1:1").osis()).toEqual("Zech.1.1")
		p.include_apocrypha(false)
		expect(p.parse("ZACARIAS 1:1").osis()).toEqual("Zech.1.1")
		expect(p.parse("ZECH 1:1").osis()).toEqual("Zech.1.1")
		expect(p.parse("ZAC 1:1").osis()).toEqual("Zech.1.1")
		;
      return true;
    });
  });

  describe("Localized book Mal (hil)", function() {
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
    return it("should handle book: Mal (hil)", function() {
      
		expect(p.parse("Malaquias 1:1").osis()).toEqual("Mal.1.1")
		expect(p.parse("Mal 1:1").osis()).toEqual("Mal.1.1")
		p.include_apocrypha(false)
		expect(p.parse("MALAQUIAS 1:1").osis()).toEqual("Mal.1.1")
		expect(p.parse("MAL 1:1").osis()).toEqual("Mal.1.1")
		;
      return true;
    });
  });

  describe("Localized book Matt (hil)", function() {
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
    return it("should handle book: Matt (hil)", function() {
      
		expect(p.parse("Mateo 1:1").osis()).toEqual("Matt.1.1")
		expect(p.parse("Matt 1:1").osis()).toEqual("Matt.1.1")
		expect(p.parse("Mat 1:1").osis()).toEqual("Matt.1.1")
		expect(p.parse("Mt 1:1").osis()).toEqual("Matt.1.1")
		p.include_apocrypha(false)
		expect(p.parse("MATEO 1:1").osis()).toEqual("Matt.1.1")
		expect(p.parse("MATT 1:1").osis()).toEqual("Matt.1.1")
		expect(p.parse("MAT 1:1").osis()).toEqual("Matt.1.1")
		expect(p.parse("MT 1:1").osis()).toEqual("Matt.1.1")
		;
      return true;
    });
  });

  describe("Localized book Mark (hil)", function() {
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
    return it("should handle book: Mark (hil)", function() {
      
		expect(p.parse("Marcos 1:1").osis()).toEqual("Mark.1.1")
		expect(p.parse("Mark 1:1").osis()).toEqual("Mark.1.1")
		expect(p.parse("Mar 1:1").osis()).toEqual("Mark.1.1")
		p.include_apocrypha(false)
		expect(p.parse("MARCOS 1:1").osis()).toEqual("Mark.1.1")
		expect(p.parse("MARK 1:1").osis()).toEqual("Mark.1.1")
		expect(p.parse("MAR 1:1").osis()).toEqual("Mark.1.1")
		;
      return true;
    });
  });

  describe("Localized book Luke (hil)", function() {
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
    return it("should handle book: Luke (hil)", function() {
      
		expect(p.parse("Lucas 1:1").osis()).toEqual("Luke.1.1")
		expect(p.parse("Luke 1:1").osis()).toEqual("Luke.1.1")
		expect(p.parse("Luc 1:1").osis()).toEqual("Luke.1.1")
		p.include_apocrypha(false)
		expect(p.parse("LUCAS 1:1").osis()).toEqual("Luke.1.1")
		expect(p.parse("LUKE 1:1").osis()).toEqual("Luke.1.1")
		expect(p.parse("LUC 1:1").osis()).toEqual("Luke.1.1")
		;
      return true;
    });
  });

  describe("Localized book 1John (hil)", function() {
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
    return it("should handle book: 1John (hil)", function() {
      
		expect(p.parse("1 Juan 1:1").osis()).toEqual("1John.1.1")
		expect(p.parse("1John 1:1").osis()).toEqual("1John.1.1")
		p.include_apocrypha(false)
		expect(p.parse("1 JUAN 1:1").osis()).toEqual("1John.1.1")
		expect(p.parse("1JOHN 1:1").osis()).toEqual("1John.1.1")
		;
      return true;
    });
  });

  describe("Localized book 2John (hil)", function() {
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
    return it("should handle book: 2John (hil)", function() {
      
		expect(p.parse("2 Juan 1:1").osis()).toEqual("2John.1.1")
		expect(p.parse("2John 1:1").osis()).toEqual("2John.1.1")
		p.include_apocrypha(false)
		expect(p.parse("2 JUAN 1:1").osis()).toEqual("2John.1.1")
		expect(p.parse("2JOHN 1:1").osis()).toEqual("2John.1.1")
		;
      return true;
    });
  });

  describe("Localized book 3John (hil)", function() {
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
    return it("should handle book: 3John (hil)", function() {
      
		expect(p.parse("3 Juan 1:1").osis()).toEqual("3John.1.1")
		expect(p.parse("3John 1:1").osis()).toEqual("3John.1.1")
		p.include_apocrypha(false)
		expect(p.parse("3 JUAN 1:1").osis()).toEqual("3John.1.1")
		expect(p.parse("3JOHN 1:1").osis()).toEqual("3John.1.1")
		;
      return true;
    });
  });

  describe("Localized book John (hil)", function() {
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
    return it("should handle book: John (hil)", function() {
      
		expect(p.parse("John 1:1").osis()).toEqual("John.1.1")
		expect(p.parse("Juan 1:1").osis()).toEqual("John.1.1")
		p.include_apocrypha(false)
		expect(p.parse("JOHN 1:1").osis()).toEqual("John.1.1")
		expect(p.parse("JUAN 1:1").osis()).toEqual("John.1.1")
		;
      return true;
    });
  });

  describe("Localized book Acts (hil)", function() {
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
    return it("should handle book: Acts (hil)", function() {
      
		expect(p.parse("Mga Binuhatan 1:1").osis()).toEqual("Acts.1.1")
		expect(p.parse("Binuhatan 1:1").osis()).toEqual("Acts.1.1")
		expect(p.parse("Acts 1:1").osis()).toEqual("Acts.1.1")
		expect(p.parse("Bin 1:1").osis()).toEqual("Acts.1.1")
		p.include_apocrypha(false)
		expect(p.parse("MGA BINUHATAN 1:1").osis()).toEqual("Acts.1.1")
		expect(p.parse("BINUHATAN 1:1").osis()).toEqual("Acts.1.1")
		expect(p.parse("ACTS 1:1").osis()).toEqual("Acts.1.1")
		expect(p.parse("BIN 1:1").osis()).toEqual("Acts.1.1")
		;
      return true;
    });
  });

  describe("Localized book Rom (hil)", function() {
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
    return it("should handle book: Rom (hil)", function() {
      
		expect(p.parse("Roma 1:1").osis()).toEqual("Rom.1.1")
		expect(p.parse("Rom 1:1").osis()).toEqual("Rom.1.1")
		p.include_apocrypha(false)
		expect(p.parse("ROMA 1:1").osis()).toEqual("Rom.1.1")
		expect(p.parse("ROM 1:1").osis()).toEqual("Rom.1.1")
		;
      return true;
    });
  });

  describe("Localized book 2Cor (hil)", function() {
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
    return it("should handle book: 2Cor (hil)", function() {
      
		expect(p.parse("2 Mga Taga-Corinto 1:1").osis()).toEqual("2Cor.1.1")
		expect(p.parse("2 Corinto 1:1").osis()).toEqual("2Cor.1.1")
		expect(p.parse("2 Cor 1:1").osis()).toEqual("2Cor.1.1")
		expect(p.parse("2Cor 1:1").osis()).toEqual("2Cor.1.1")
		p.include_apocrypha(false)
		expect(p.parse("2 MGA TAGA-CORINTO 1:1").osis()).toEqual("2Cor.1.1")
		expect(p.parse("2 CORINTO 1:1").osis()).toEqual("2Cor.1.1")
		expect(p.parse("2 COR 1:1").osis()).toEqual("2Cor.1.1")
		expect(p.parse("2COR 1:1").osis()).toEqual("2Cor.1.1")
		;
      return true;
    });
  });

  describe("Localized book 1Cor (hil)", function() {
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
    return it("should handle book: 1Cor (hil)", function() {
      
		expect(p.parse("1 Mga Taga-Corinto 1:1").osis()).toEqual("1Cor.1.1")
		expect(p.parse("1 Corinto 1:1").osis()).toEqual("1Cor.1.1")
		expect(p.parse("1 Cor 1:1").osis()).toEqual("1Cor.1.1")
		expect(p.parse("1Cor 1:1").osis()).toEqual("1Cor.1.1")
		p.include_apocrypha(false)
		expect(p.parse("1 MGA TAGA-CORINTO 1:1").osis()).toEqual("1Cor.1.1")
		expect(p.parse("1 CORINTO 1:1").osis()).toEqual("1Cor.1.1")
		expect(p.parse("1 COR 1:1").osis()).toEqual("1Cor.1.1")
		expect(p.parse("1COR 1:1").osis()).toEqual("1Cor.1.1")
		;
      return true;
    });
  });

  describe("Localized book Gal (hil)", function() {
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
    return it("should handle book: Gal (hil)", function() {
      
		expect(p.parse("Galacia 1:1").osis()).toEqual("Gal.1.1")
		expect(p.parse("Gal 1:1").osis()).toEqual("Gal.1.1")
		p.include_apocrypha(false)
		expect(p.parse("GALACIA 1:1").osis()).toEqual("Gal.1.1")
		expect(p.parse("GAL 1:1").osis()).toEqual("Gal.1.1")
		;
      return true;
    });
  });

  describe("Localized book Eph (hil)", function() {
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
    return it("should handle book: Eph (hil)", function() {
      
		expect(p.parse("Efeso 1:1").osis()).toEqual("Eph.1.1")
		expect(p.parse("Efe 1:1").osis()).toEqual("Eph.1.1")
		expect(p.parse("Eph 1:1").osis()).toEqual("Eph.1.1")
		expect(p.parse("Ef 1:1").osis()).toEqual("Eph.1.1")
		p.include_apocrypha(false)
		expect(p.parse("EFESO 1:1").osis()).toEqual("Eph.1.1")
		expect(p.parse("EFE 1:1").osis()).toEqual("Eph.1.1")
		expect(p.parse("EPH 1:1").osis()).toEqual("Eph.1.1")
		expect(p.parse("EF 1:1").osis()).toEqual("Eph.1.1")
		;
      return true;
    });
  });

  describe("Localized book Phil (hil)", function() {
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
    return it("should handle book: Phil (hil)", function() {
      
		expect(p.parse("Filipos 1:1").osis()).toEqual("Phil.1.1")
		expect(p.parse("Filip 1:1").osis()).toEqual("Phil.1.1")
		expect(p.parse("Phil 1:1").osis()).toEqual("Phil.1.1")
		p.include_apocrypha(false)
		expect(p.parse("FILIPOS 1:1").osis()).toEqual("Phil.1.1")
		expect(p.parse("FILIP 1:1").osis()).toEqual("Phil.1.1")
		expect(p.parse("PHIL 1:1").osis()).toEqual("Phil.1.1")
		;
      return true;
    });
  });

  describe("Localized book Col (hil)", function() {
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
    return it("should handle book: Col (hil)", function() {
      
		expect(p.parse("Colosas 1:1").osis()).toEqual("Col.1.1")
		expect(p.parse("Col 1:1").osis()).toEqual("Col.1.1")
		p.include_apocrypha(false)
		expect(p.parse("COLOSAS 1:1").osis()).toEqual("Col.1.1")
		expect(p.parse("COL 1:1").osis()).toEqual("Col.1.1")
		;
      return true;
    });
  });

  describe("Localized book 2Thess (hil)", function() {
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
    return it("should handle book: 2Thess (hil)", function() {
      
		expect(p.parse("2 Mga Taga-Tesalonica 1:1").osis()).toEqual("2Thess.1.1")
		expect(p.parse("2 Tesalonica 1:1").osis()).toEqual("2Thess.1.1")
		expect(p.parse("2Thess 1:1").osis()).toEqual("2Thess.1.1")
		expect(p.parse("2 Tes 1:1").osis()).toEqual("2Thess.1.1")
		p.include_apocrypha(false)
		expect(p.parse("2 MGA TAGA-TESALONICA 1:1").osis()).toEqual("2Thess.1.1")
		expect(p.parse("2 TESALONICA 1:1").osis()).toEqual("2Thess.1.1")
		expect(p.parse("2THESS 1:1").osis()).toEqual("2Thess.1.1")
		expect(p.parse("2 TES 1:1").osis()).toEqual("2Thess.1.1")
		;
      return true;
    });
  });

  describe("Localized book 1Thess (hil)", function() {
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
    return it("should handle book: 1Thess (hil)", function() {
      
		expect(p.parse("1 Mga Taga-Tesalonica 1:1").osis()).toEqual("1Thess.1.1")
		expect(p.parse("1 Tesalonica 1:1").osis()).toEqual("1Thess.1.1")
		expect(p.parse("1Thess 1:1").osis()).toEqual("1Thess.1.1")
		expect(p.parse("1 Tes 1:1").osis()).toEqual("1Thess.1.1")
		p.include_apocrypha(false)
		expect(p.parse("1 MGA TAGA-TESALONICA 1:1").osis()).toEqual("1Thess.1.1")
		expect(p.parse("1 TESALONICA 1:1").osis()).toEqual("1Thess.1.1")
		expect(p.parse("1THESS 1:1").osis()).toEqual("1Thess.1.1")
		expect(p.parse("1 TES 1:1").osis()).toEqual("1Thess.1.1")
		;
      return true;
    });
  });

  describe("Localized book 2Tim (hil)", function() {
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
    return it("should handle book: 2Tim (hil)", function() {
      
		expect(p.parse("2 Timoteo 1:1").osis()).toEqual("2Tim.1.1")
		expect(p.parse("2 Tim 1:1").osis()).toEqual("2Tim.1.1")
		expect(p.parse("2Tim 1:1").osis()).toEqual("2Tim.1.1")
		p.include_apocrypha(false)
		expect(p.parse("2 TIMOTEO 1:1").osis()).toEqual("2Tim.1.1")
		expect(p.parse("2 TIM 1:1").osis()).toEqual("2Tim.1.1")
		expect(p.parse("2TIM 1:1").osis()).toEqual("2Tim.1.1")
		;
      return true;
    });
  });

  describe("Localized book 1Tim (hil)", function() {
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
    return it("should handle book: 1Tim (hil)", function() {
      
		expect(p.parse("1 Timoteo 1:1").osis()).toEqual("1Tim.1.1")
		expect(p.parse("1 Tim 1:1").osis()).toEqual("1Tim.1.1")
		expect(p.parse("1Tim 1:1").osis()).toEqual("1Tim.1.1")
		p.include_apocrypha(false)
		expect(p.parse("1 TIMOTEO 1:1").osis()).toEqual("1Tim.1.1")
		expect(p.parse("1 TIM 1:1").osis()).toEqual("1Tim.1.1")
		expect(p.parse("1TIM 1:1").osis()).toEqual("1Tim.1.1")
		;
      return true;
    });
  });

  describe("Localized book Titus (hil)", function() {
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
    return it("should handle book: Titus (hil)", function() {
      
		expect(p.parse("Titus 1:1").osis()).toEqual("Titus.1.1")
		expect(p.parse("Tito 1:1").osis()).toEqual("Titus.1.1")
		p.include_apocrypha(false)
		expect(p.parse("TITUS 1:1").osis()).toEqual("Titus.1.1")
		expect(p.parse("TITO 1:1").osis()).toEqual("Titus.1.1")
		;
      return true;
    });
  });

  describe("Localized book Phlm (hil)", function() {
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
    return it("should handle book: Phlm (hil)", function() {
      
		expect(p.parse("Filemon 1:1").osis()).toEqual("Phlm.1.1")
		expect(p.parse("Filem 1:1").osis()).toEqual("Phlm.1.1")
		expect(p.parse("Phlm 1:1").osis()).toEqual("Phlm.1.1")
		p.include_apocrypha(false)
		expect(p.parse("FILEMON 1:1").osis()).toEqual("Phlm.1.1")
		expect(p.parse("FILEM 1:1").osis()).toEqual("Phlm.1.1")
		expect(p.parse("PHLM 1:1").osis()).toEqual("Phlm.1.1")
		;
      return true;
    });
  });

  describe("Localized book Heb (hil)", function() {
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
    return it("should handle book: Heb (hil)", function() {
      
		expect(p.parse("Hebreo 1:1").osis()).toEqual("Heb.1.1")
		expect(p.parse("Heb 1:1").osis()).toEqual("Heb.1.1")
		p.include_apocrypha(false)
		expect(p.parse("HEBREO 1:1").osis()).toEqual("Heb.1.1")
		expect(p.parse("HEB 1:1").osis()).toEqual("Heb.1.1")
		;
      return true;
    });
  });

  describe("Localized book Jas (hil)", function() {
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
    return it("should handle book: Jas (hil)", function() {
      
		expect(p.parse("Santiago 1:1").osis()).toEqual("Jas.1.1")
		expect(p.parse("Sant 1:1").osis()).toEqual("Jas.1.1")
		expect(p.parse("Jas 1:1").osis()).toEqual("Jas.1.1")
		p.include_apocrypha(false)
		expect(p.parse("SANTIAGO 1:1").osis()).toEqual("Jas.1.1")
		expect(p.parse("SANT 1:1").osis()).toEqual("Jas.1.1")
		expect(p.parse("JAS 1:1").osis()).toEqual("Jas.1.1")
		;
      return true;
    });
  });

  describe("Localized book 2Pet (hil)", function() {
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
    return it("should handle book: 2Pet (hil)", function() {
      
		expect(p.parse("2 Pedro 1:1").osis()).toEqual("2Pet.1.1")
		expect(p.parse("2 Ped 1:1").osis()).toEqual("2Pet.1.1")
		expect(p.parse("2Pet 1:1").osis()).toEqual("2Pet.1.1")
		p.include_apocrypha(false)
		expect(p.parse("2 PEDRO 1:1").osis()).toEqual("2Pet.1.1")
		expect(p.parse("2 PED 1:1").osis()).toEqual("2Pet.1.1")
		expect(p.parse("2PET 1:1").osis()).toEqual("2Pet.1.1")
		;
      return true;
    });
  });

  describe("Localized book 1Pet (hil)", function() {
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
    return it("should handle book: 1Pet (hil)", function() {
      
		expect(p.parse("1 Pedro 1:1").osis()).toEqual("1Pet.1.1")
		expect(p.parse("1 Ped 1:1").osis()).toEqual("1Pet.1.1")
		expect(p.parse("1Pet 1:1").osis()).toEqual("1Pet.1.1")
		p.include_apocrypha(false)
		expect(p.parse("1 PEDRO 1:1").osis()).toEqual("1Pet.1.1")
		expect(p.parse("1 PED 1:1").osis()).toEqual("1Pet.1.1")
		expect(p.parse("1PET 1:1").osis()).toEqual("1Pet.1.1")
		;
      return true;
    });
  });

  describe("Localized book Jude (hil)", function() {
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
    return it("should handle book: Jude (hil)", function() {
      
		expect(p.parse("Judas 1:1").osis()).toEqual("Jude.1.1")
		expect(p.parse("Jude 1:1").osis()).toEqual("Jude.1.1")
		expect(p.parse("Jud 1:1").osis()).toEqual("Jude.1.1")
		p.include_apocrypha(false)
		expect(p.parse("JUDAS 1:1").osis()).toEqual("Jude.1.1")
		expect(p.parse("JUDE 1:1").osis()).toEqual("Jude.1.1")
		expect(p.parse("JUD 1:1").osis()).toEqual("Jude.1.1")
		;
      return true;
    });
  });

  describe("Localized book Tob (hil)", function() {
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
    return it("should handle book: Tob (hil)", function() {
      
		expect(p.parse("Tob 1:1").osis()).toEqual("Tob.1.1")
		;
      return true;
    });
  });

  describe("Localized book Jdt (hil)", function() {
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
    return it("should handle book: Jdt (hil)", function() {
      
		expect(p.parse("Jdt 1:1").osis()).toEqual("Jdt.1.1")
		;
      return true;
    });
  });

  describe("Localized book Bar (hil)", function() {
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
    return it("should handle book: Bar (hil)", function() {
      
		expect(p.parse("Bar 1:1").osis()).toEqual("Bar.1.1")
		;
      return true;
    });
  });

  describe("Localized book Sus (hil)", function() {
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
    return it("should handle book: Sus (hil)", function() {
      
		expect(p.parse("Sus 1:1").osis()).toEqual("Sus.1.1")
		;
      return true;
    });
  });

  describe("Localized book 2Macc (hil)", function() {
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
    return it("should handle book: 2Macc (hil)", function() {
      
		expect(p.parse("2Macc 1:1").osis()).toEqual("2Macc.1.1")
		;
      return true;
    });
  });

  describe("Localized book 3Macc (hil)", function() {
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
    return it("should handle book: 3Macc (hil)", function() {
      
		expect(p.parse("3Macc 1:1").osis()).toEqual("3Macc.1.1")
		;
      return true;
    });
  });

  describe("Localized book 4Macc (hil)", function() {
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
    return it("should handle book: 4Macc (hil)", function() {
      
		expect(p.parse("4Macc 1:1").osis()).toEqual("4Macc.1.1")
		;
      return true;
    });
  });

  describe("Localized book 1Macc (hil)", function() {
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
    return it("should handle book: 1Macc (hil)", function() {
      
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
      return expect(p.languages).toEqual(["hil"]);
    });
    it("should handle ranges (hil)", function() {
      expect(p.parse("Titus 1:1 tubtob 2").osis()).toEqual("Titus.1.1-Titus.1.2");
      expect(p.parse("Matt 1tubtob2").osis()).toEqual("Matt.1-Matt.2");
      return expect(p.parse("Phlm 2 TUBTOB 3").osis()).toEqual("Phlm.1.2-Phlm.1.3");
    });
    it("should handle chapters (hil)", function() {
      expect(p.parse("Titus 1:1, kapitulo 2").osis()).toEqual("Titus.1.1,Titus.2");
      return expect(p.parse("Matt 3:4 KAPITULO 6").osis()).toEqual("Matt.3.4,Matt.6");
    });
    it("should handle verses (hil)", function() {
      expect(p.parse("Exod 1:1 bersikulo 3").osis()).toEqual("Exod.1.1,Exod.1.3");
      return expect(p.parse("Phlm BERSIKULO 6").osis()).toEqual("Phlm.1.6");
    });
    it("should handle 'and' (hil)", function() {
      expect(p.parse("Exod 1:1 kag 3").osis()).toEqual("Exod.1.1,Exod.1.3");
      return expect(p.parse("Phlm 2 KAG 6").osis()).toEqual("Phlm.1.2,Phlm.1.6");
    });
    it("should handle titles (hil)", function() {
      expect(p.parse("Ps 3 titulo, 4:2, 5:titulo").osis()).toEqual("Ps.3.1,Ps.4.2,Ps.5.1");
      return expect(p.parse("PS 3 TITULO, 4:2, 5:TITULO").osis()).toEqual("Ps.3.1,Ps.4.2,Ps.5.1");
    });
    it("should handle 'ff' (hil)", function() {
      expect(p.parse("Rev 3ff., 4:2ff.").osis()).toEqual("Rev.3-Rev.22,Rev.4.2-Rev.4.11");
      expect(p.parse("REV 3 FF., 4:2 FF.").osis()).toEqual("Rev.3-Rev.22,Rev.4.2-Rev.4.11");
      expect(p.parse("Rev 3ff, 4:2ff").osis()).toEqual("Rev.3-Rev.22,Rev.4.2-Rev.4.11");
      return expect(p.parse("REV 3 FF, 4:2 FF").osis()).toEqual("Rev.3-Rev.22,Rev.4.2-Rev.4.11");
    });
    it("should handle translations (hil)", function() {
      expect(p.parse("Lev 1 (HIL82)").osis_and_translations()).toEqual([["Lev.1", "HIL82"]]);
      return expect(p.parse("lev 1 hil82").osis_and_translations()).toEqual([["Lev.1", "HIL82"]]);
    });
    return it("should handle boundaries (hil)", function() {
      p.set_options({
        book_alone_strategy: "full"
      });
      expect(p.parse("\u2014Matt\u2014").osis()).toEqual("Matt.1-Matt.28");
      return expect(p.parse("\u201cMatt 1:1\u201d").osis()).toEqual("Matt.1.1");
    });
  });

}).call(this);
