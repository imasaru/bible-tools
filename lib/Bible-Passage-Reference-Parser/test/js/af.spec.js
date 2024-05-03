(function() {
  var bcv_parser;

  bcv_parser = require("../../js/af_bcv_parser.js").bcv_parser;

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

  describe("Localized book Gen (af)", function() {
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
    return it("should handle book: Gen (af)", function() {
      
		expect(p.parse("Genesis 1:1").osis()).toEqual("Gen.1.1")
		expect(p.parse("Génesis 1:1").osis()).toEqual("Gen.1.1")
		expect(p.parse("Gen 1:1").osis()).toEqual("Gen.1.1")
		p.include_apocrypha(false)
		expect(p.parse("GENESIS 1:1").osis()).toEqual("Gen.1.1")
		expect(p.parse("GÉNESIS 1:1").osis()).toEqual("Gen.1.1")
		expect(p.parse("GEN 1:1").osis()).toEqual("Gen.1.1")
		;
      return true;
    });
  });

  describe("Localized book Exod (af)", function() {
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
    return it("should handle book: Exod (af)", function() {
      
		expect(p.parse("Eksodus 1:1").osis()).toEqual("Exod.1.1")
		expect(p.parse("Exodus 1:1").osis()).toEqual("Exod.1.1")
		expect(p.parse("Exod 1:1").osis()).toEqual("Exod.1.1")
		expect(p.parse("Eks 1:1").osis()).toEqual("Exod.1.1")
		p.include_apocrypha(false)
		expect(p.parse("EKSODUS 1:1").osis()).toEqual("Exod.1.1")
		expect(p.parse("EXODUS 1:1").osis()).toEqual("Exod.1.1")
		expect(p.parse("EXOD 1:1").osis()).toEqual("Exod.1.1")
		expect(p.parse("EKS 1:1").osis()).toEqual("Exod.1.1")
		;
      return true;
    });
  });

  describe("Localized book Bel (af)", function() {
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
    return it("should handle book: Bel (af)", function() {
      
		expect(p.parse("Bel 1:1").osis()).toEqual("Bel.1.1")
		;
      return true;
    });
  });

  describe("Localized book Lev (af)", function() {
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
    return it("should handle book: Lev (af)", function() {
      
		expect(p.parse("Levitikus 1:1").osis()).toEqual("Lev.1.1")
		expect(p.parse("Levítikus 1:1").osis()).toEqual("Lev.1.1")
		expect(p.parse("Lev 1:1").osis()).toEqual("Lev.1.1")
		p.include_apocrypha(false)
		expect(p.parse("LEVITIKUS 1:1").osis()).toEqual("Lev.1.1")
		expect(p.parse("LEVÍTIKUS 1:1").osis()).toEqual("Lev.1.1")
		expect(p.parse("LEV 1:1").osis()).toEqual("Lev.1.1")
		;
      return true;
    });
  });

  describe("Localized book Num (af)", function() {
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
    return it("should handle book: Num (af)", function() {
      
		expect(p.parse("Numeri 1:1").osis()).toEqual("Num.1.1")
		expect(p.parse("Númeri 1:1").osis()).toEqual("Num.1.1")
		expect(p.parse("Num 1:1").osis()).toEqual("Num.1.1")
		p.include_apocrypha(false)
		expect(p.parse("NUMERI 1:1").osis()).toEqual("Num.1.1")
		expect(p.parse("NÚMERI 1:1").osis()).toEqual("Num.1.1")
		expect(p.parse("NUM 1:1").osis()).toEqual("Num.1.1")
		;
      return true;
    });
  });

  describe("Localized book Sir (af)", function() {
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
    return it("should handle book: Sir (af)", function() {
      
		expect(p.parse("Sir 1:1").osis()).toEqual("Sir.1.1")
		;
      return true;
    });
  });

  describe("Localized book Wis (af)", function() {
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
    return it("should handle book: Wis (af)", function() {
      
		expect(p.parse("Wis 1:1").osis()).toEqual("Wis.1.1")
		;
      return true;
    });
  });

  describe("Localized book Lam (af)", function() {
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
    return it("should handle book: Lam (af)", function() {
      
		expect(p.parse("Klaagliedere 1:1").osis()).toEqual("Lam.1.1")
		expect(p.parse("Klaagl 1:1").osis()).toEqual("Lam.1.1")
		expect(p.parse("Lam 1:1").osis()).toEqual("Lam.1.1")
		p.include_apocrypha(false)
		expect(p.parse("KLAAGLIEDERE 1:1").osis()).toEqual("Lam.1.1")
		expect(p.parse("KLAAGL 1:1").osis()).toEqual("Lam.1.1")
		expect(p.parse("LAM 1:1").osis()).toEqual("Lam.1.1")
		;
      return true;
    });
  });

  describe("Localized book EpJer (af)", function() {
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
    return it("should handle book: EpJer (af)", function() {
      
		expect(p.parse("EpJer 1:1").osis()).toEqual("EpJer.1.1")
		;
      return true;
    });
  });

  describe("Localized book Rev (af)", function() {
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
    return it("should handle book: Rev (af)", function() {
      
		expect(p.parse("Openbaring 1:1").osis()).toEqual("Rev.1.1")
		expect(p.parse("Rev 1:1").osis()).toEqual("Rev.1.1")
		expect(p.parse("Op 1:1").osis()).toEqual("Rev.1.1")
		p.include_apocrypha(false)
		expect(p.parse("OPENBARING 1:1").osis()).toEqual("Rev.1.1")
		expect(p.parse("REV 1:1").osis()).toEqual("Rev.1.1")
		expect(p.parse("OP 1:1").osis()).toEqual("Rev.1.1")
		;
      return true;
    });
  });

  describe("Localized book PrMan (af)", function() {
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
    return it("should handle book: PrMan (af)", function() {
      
		expect(p.parse("PrMan 1:1").osis()).toEqual("PrMan.1.1")
		;
      return true;
    });
  });

  describe("Localized book Deut (af)", function() {
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
    return it("should handle book: Deut (af)", function() {
      
		expect(p.parse("Deuteronomium 1:1").osis()).toEqual("Deut.1.1")
		expect(p.parse("Deuteronómium 1:1").osis()).toEqual("Deut.1.1")
		expect(p.parse("Deut 1:1").osis()).toEqual("Deut.1.1")
		p.include_apocrypha(false)
		expect(p.parse("DEUTERONOMIUM 1:1").osis()).toEqual("Deut.1.1")
		expect(p.parse("DEUTERONÓMIUM 1:1").osis()).toEqual("Deut.1.1")
		expect(p.parse("DEUT 1:1").osis()).toEqual("Deut.1.1")
		;
      return true;
    });
  });

  describe("Localized book Josh (af)", function() {
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
    return it("should handle book: Josh (af)", function() {
      
		expect(p.parse("Josua 1:1").osis()).toEqual("Josh.1.1")
		expect(p.parse("Josh 1:1").osis()).toEqual("Josh.1.1")
		expect(p.parse("Jos 1:1").osis()).toEqual("Josh.1.1")
		p.include_apocrypha(false)
		expect(p.parse("JOSUA 1:1").osis()).toEqual("Josh.1.1")
		expect(p.parse("JOSH 1:1").osis()).toEqual("Josh.1.1")
		expect(p.parse("JOS 1:1").osis()).toEqual("Josh.1.1")
		;
      return true;
    });
  });

  describe("Localized book Judg (af)", function() {
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
    return it("should handle book: Judg (af)", function() {
      
		expect(p.parse("Rigters 1:1").osis()).toEqual("Judg.1.1")
		expect(p.parse("Judg 1:1").osis()).toEqual("Judg.1.1")
		expect(p.parse("Rig 1:1").osis()).toEqual("Judg.1.1")
		p.include_apocrypha(false)
		expect(p.parse("RIGTERS 1:1").osis()).toEqual("Judg.1.1")
		expect(p.parse("JUDG 1:1").osis()).toEqual("Judg.1.1")
		expect(p.parse("RIG 1:1").osis()).toEqual("Judg.1.1")
		;
      return true;
    });
  });

  describe("Localized book Ruth (af)", function() {
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
    return it("should handle book: Ruth (af)", function() {
      
		expect(p.parse("Ruth 1:1").osis()).toEqual("Ruth.1.1")
		expect(p.parse("Rut 1:1").osis()).toEqual("Ruth.1.1")
		p.include_apocrypha(false)
		expect(p.parse("RUTH 1:1").osis()).toEqual("Ruth.1.1")
		expect(p.parse("RUT 1:1").osis()).toEqual("Ruth.1.1")
		;
      return true;
    });
  });

  describe("Localized book 1Esd (af)", function() {
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
    return it("should handle book: 1Esd (af)", function() {
      
		expect(p.parse("1Esd 1:1").osis()).toEqual("1Esd.1.1")
		;
      return true;
    });
  });

  describe("Localized book 2Esd (af)", function() {
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
    return it("should handle book: 2Esd (af)", function() {
      
		expect(p.parse("2Esd 1:1").osis()).toEqual("2Esd.1.1")
		;
      return true;
    });
  });

  describe("Localized book Isa (af)", function() {
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
    return it("should handle book: Isa (af)", function() {
      
		expect(p.parse("Jesaja 1:1").osis()).toEqual("Isa.1.1")
		expect(p.parse("Isa 1:1").osis()).toEqual("Isa.1.1")
		expect(p.parse("Jes 1:1").osis()).toEqual("Isa.1.1")
		p.include_apocrypha(false)
		expect(p.parse("JESAJA 1:1").osis()).toEqual("Isa.1.1")
		expect(p.parse("ISA 1:1").osis()).toEqual("Isa.1.1")
		expect(p.parse("JES 1:1").osis()).toEqual("Isa.1.1")
		;
      return true;
    });
  });

  describe("Localized book 2Sam (af)", function() {
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
    return it("should handle book: 2Sam (af)", function() {
      
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

  describe("Localized book 1Sam (af)", function() {
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
    return it("should handle book: 1Sam (af)", function() {
      
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

  describe("Localized book 2Kgs (af)", function() {
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
    return it("should handle book: 2Kgs (af)", function() {
      
		expect(p.parse("2 Konings 1:1").osis()).toEqual("2Kgs.1.1")
		expect(p.parse("2 Kon 1:1").osis()).toEqual("2Kgs.1.1")
		expect(p.parse("2Kgs 1:1").osis()).toEqual("2Kgs.1.1")
		p.include_apocrypha(false)
		expect(p.parse("2 KONINGS 1:1").osis()).toEqual("2Kgs.1.1")
		expect(p.parse("2 KON 1:1").osis()).toEqual("2Kgs.1.1")
		expect(p.parse("2KGS 1:1").osis()).toEqual("2Kgs.1.1")
		;
      return true;
    });
  });

  describe("Localized book 1Kgs (af)", function() {
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
    return it("should handle book: 1Kgs (af)", function() {
      
		expect(p.parse("1 Konings 1:1").osis()).toEqual("1Kgs.1.1")
		expect(p.parse("1 Kon 1:1").osis()).toEqual("1Kgs.1.1")
		expect(p.parse("1Kgs 1:1").osis()).toEqual("1Kgs.1.1")
		p.include_apocrypha(false)
		expect(p.parse("1 KONINGS 1:1").osis()).toEqual("1Kgs.1.1")
		expect(p.parse("1 KON 1:1").osis()).toEqual("1Kgs.1.1")
		expect(p.parse("1KGS 1:1").osis()).toEqual("1Kgs.1.1")
		;
      return true;
    });
  });

  describe("Localized book 2Chr (af)", function() {
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
    return it("should handle book: 2Chr (af)", function() {
      
		expect(p.parse("2 Kronieke 1:1").osis()).toEqual("2Chr.1.1")
		expect(p.parse("2 Kron 1:1").osis()).toEqual("2Chr.1.1")
		expect(p.parse("2Chr 1:1").osis()).toEqual("2Chr.1.1")
		p.include_apocrypha(false)
		expect(p.parse("2 KRONIEKE 1:1").osis()).toEqual("2Chr.1.1")
		expect(p.parse("2 KRON 1:1").osis()).toEqual("2Chr.1.1")
		expect(p.parse("2CHR 1:1").osis()).toEqual("2Chr.1.1")
		;
      return true;
    });
  });

  describe("Localized book 1Chr (af)", function() {
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
    return it("should handle book: 1Chr (af)", function() {
      
		expect(p.parse("1 Kronieke 1:1").osis()).toEqual("1Chr.1.1")
		expect(p.parse("1 Kron 1:1").osis()).toEqual("1Chr.1.1")
		expect(p.parse("1Chr 1:1").osis()).toEqual("1Chr.1.1")
		p.include_apocrypha(false)
		expect(p.parse("1 KRONIEKE 1:1").osis()).toEqual("1Chr.1.1")
		expect(p.parse("1 KRON 1:1").osis()).toEqual("1Chr.1.1")
		expect(p.parse("1CHR 1:1").osis()).toEqual("1Chr.1.1")
		;
      return true;
    });
  });

  describe("Localized book Ezra (af)", function() {
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
    return it("should handle book: Ezra (af)", function() {
      
		expect(p.parse("Esra 1:1").osis()).toEqual("Ezra.1.1")
		expect(p.parse("Ezra 1:1").osis()).toEqual("Ezra.1.1")
		p.include_apocrypha(false)
		expect(p.parse("ESRA 1:1").osis()).toEqual("Ezra.1.1")
		expect(p.parse("EZRA 1:1").osis()).toEqual("Ezra.1.1")
		;
      return true;
    });
  });

  describe("Localized book Neh (af)", function() {
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
    return it("should handle book: Neh (af)", function() {
      
		expect(p.parse("Nehemia 1:1").osis()).toEqual("Neh.1.1")
		expect(p.parse("Neh 1:1").osis()).toEqual("Neh.1.1")
		p.include_apocrypha(false)
		expect(p.parse("NEHEMIA 1:1").osis()).toEqual("Neh.1.1")
		expect(p.parse("NEH 1:1").osis()).toEqual("Neh.1.1")
		;
      return true;
    });
  });

  describe("Localized book GkEsth (af)", function() {
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
    return it("should handle book: GkEsth (af)", function() {
      
		expect(p.parse("GkEsth 1:1").osis()).toEqual("GkEsth.1.1")
		;
      return true;
    });
  });

  describe("Localized book Esth (af)", function() {
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
    return it("should handle book: Esth (af)", function() {
      
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

  describe("Localized book Job (af)", function() {
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
    return it("should handle book: Job (af)", function() {
      
		expect(p.parse("Job 1:1").osis()).toEqual("Job.1.1")
		p.include_apocrypha(false)
		expect(p.parse("JOB 1:1").osis()).toEqual("Job.1.1")
		;
      return true;
    });
  });

  describe("Localized book Ps (af)", function() {
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
    return it("should handle book: Ps (af)", function() {
      
		expect(p.parse("Psalms 1:1").osis()).toEqual("Ps.1.1")
		expect(p.parse("Psalm 1:1").osis()).toEqual("Ps.1.1")
		expect(p.parse("Ps 1:1").osis()).toEqual("Ps.1.1")
		p.include_apocrypha(false)
		expect(p.parse("PSALMS 1:1").osis()).toEqual("Ps.1.1")
		expect(p.parse("PSALM 1:1").osis()).toEqual("Ps.1.1")
		expect(p.parse("PS 1:1").osis()).toEqual("Ps.1.1")
		;
      return true;
    });
  });

  describe("Localized book PrAzar (af)", function() {
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
    return it("should handle book: PrAzar (af)", function() {
      
		expect(p.parse("PrAzar 1:1").osis()).toEqual("PrAzar.1.1")
		;
      return true;
    });
  });

  describe("Localized book Prov (af)", function() {
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
    return it("should handle book: Prov (af)", function() {
      
		expect(p.parse("Spreuke 1:1").osis()).toEqual("Prov.1.1")
		expect(p.parse("Prov 1:1").osis()).toEqual("Prov.1.1")
		expect(p.parse("Spr 1:1").osis()).toEqual("Prov.1.1")
		p.include_apocrypha(false)
		expect(p.parse("SPREUKE 1:1").osis()).toEqual("Prov.1.1")
		expect(p.parse("PROV 1:1").osis()).toEqual("Prov.1.1")
		expect(p.parse("SPR 1:1").osis()).toEqual("Prov.1.1")
		;
      return true;
    });
  });

  describe("Localized book Eccl (af)", function() {
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
    return it("should handle book: Eccl (af)", function() {
      
		expect(p.parse("Prediker 1:1").osis()).toEqual("Eccl.1.1")
		expect(p.parse("Eccl 1:1").osis()).toEqual("Eccl.1.1")
		expect(p.parse("Pred 1:1").osis()).toEqual("Eccl.1.1")
		p.include_apocrypha(false)
		expect(p.parse("PREDIKER 1:1").osis()).toEqual("Eccl.1.1")
		expect(p.parse("ECCL 1:1").osis()).toEqual("Eccl.1.1")
		expect(p.parse("PRED 1:1").osis()).toEqual("Eccl.1.1")
		;
      return true;
    });
  });

  describe("Localized book SgThree (af)", function() {
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
    return it("should handle book: SgThree (af)", function() {
      
		expect(p.parse("SgThree 1:1").osis()).toEqual("SgThree.1.1")
		;
      return true;
    });
  });

  describe("Localized book Song (af)", function() {
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
    return it("should handle book: Song (af)", function() {
      
		expect(p.parse("Hooglied 1:1").osis()).toEqual("Song.1.1")
		expect(p.parse("Hoogl 1:1").osis()).toEqual("Song.1.1")
		expect(p.parse("Song 1:1").osis()).toEqual("Song.1.1")
		p.include_apocrypha(false)
		expect(p.parse("HOOGLIED 1:1").osis()).toEqual("Song.1.1")
		expect(p.parse("HOOGL 1:1").osis()).toEqual("Song.1.1")
		expect(p.parse("SONG 1:1").osis()).toEqual("Song.1.1")
		;
      return true;
    });
  });

  describe("Localized book Jer (af)", function() {
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
    return it("should handle book: Jer (af)", function() {
      
		expect(p.parse("Jeremia 1:1").osis()).toEqual("Jer.1.1")
		expect(p.parse("Jer 1:1").osis()).toEqual("Jer.1.1")
		p.include_apocrypha(false)
		expect(p.parse("JEREMIA 1:1").osis()).toEqual("Jer.1.1")
		expect(p.parse("JER 1:1").osis()).toEqual("Jer.1.1")
		;
      return true;
    });
  });

  describe("Localized book Ezek (af)", function() {
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
    return it("should handle book: Ezek (af)", function() {
      
		expect(p.parse("Esegiel 1:1").osis()).toEqual("Ezek.1.1")
		expect(p.parse("Esegiël 1:1").osis()).toEqual("Ezek.1.1")
		expect(p.parse("Eseg 1:1").osis()).toEqual("Ezek.1.1")
		expect(p.parse("Ezek 1:1").osis()).toEqual("Ezek.1.1")
		p.include_apocrypha(false)
		expect(p.parse("ESEGIEL 1:1").osis()).toEqual("Ezek.1.1")
		expect(p.parse("ESEGIËL 1:1").osis()).toEqual("Ezek.1.1")
		expect(p.parse("ESEG 1:1").osis()).toEqual("Ezek.1.1")
		expect(p.parse("EZEK 1:1").osis()).toEqual("Ezek.1.1")
		;
      return true;
    });
  });

  describe("Localized book Dan (af)", function() {
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
    return it("should handle book: Dan (af)", function() {
      
		expect(p.parse("Daniel 1:1").osis()).toEqual("Dan.1.1")
		expect(p.parse("Daniël 1:1").osis()).toEqual("Dan.1.1")
		expect(p.parse("Dan 1:1").osis()).toEqual("Dan.1.1")
		p.include_apocrypha(false)
		expect(p.parse("DANIEL 1:1").osis()).toEqual("Dan.1.1")
		expect(p.parse("DANIËL 1:1").osis()).toEqual("Dan.1.1")
		expect(p.parse("DAN 1:1").osis()).toEqual("Dan.1.1")
		;
      return true;
    });
  });

  describe("Localized book Hos (af)", function() {
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
    return it("should handle book: Hos (af)", function() {
      
		expect(p.parse("Hosea 1:1").osis()).toEqual("Hos.1.1")
		expect(p.parse("Hoséa 1:1").osis()).toEqual("Hos.1.1")
		expect(p.parse("Hos 1:1").osis()).toEqual("Hos.1.1")
		p.include_apocrypha(false)
		expect(p.parse("HOSEA 1:1").osis()).toEqual("Hos.1.1")
		expect(p.parse("HOSÉA 1:1").osis()).toEqual("Hos.1.1")
		expect(p.parse("HOS 1:1").osis()).toEqual("Hos.1.1")
		;
      return true;
    });
  });

  describe("Localized book Joel (af)", function() {
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
    return it("should handle book: Joel (af)", function() {
      
		expect(p.parse("Joel 1:1").osis()).toEqual("Joel.1.1")
		expect(p.parse("Joël 1:1").osis()).toEqual("Joel.1.1")
		p.include_apocrypha(false)
		expect(p.parse("JOEL 1:1").osis()).toEqual("Joel.1.1")
		expect(p.parse("JOËL 1:1").osis()).toEqual("Joel.1.1")
		;
      return true;
    });
  });

  describe("Localized book Amos (af)", function() {
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
    return it("should handle book: Amos (af)", function() {
      
		expect(p.parse("Amos 1:1").osis()).toEqual("Amos.1.1")
		expect(p.parse("Am 1:1").osis()).toEqual("Amos.1.1")
		p.include_apocrypha(false)
		expect(p.parse("AMOS 1:1").osis()).toEqual("Amos.1.1")
		expect(p.parse("AM 1:1").osis()).toEqual("Amos.1.1")
		;
      return true;
    });
  });

  describe("Localized book Obad (af)", function() {
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
    return it("should handle book: Obad (af)", function() {
      
		expect(p.parse("Obadja 1:1").osis()).toEqual("Obad.1.1")
		expect(p.parse("Obad 1:1").osis()).toEqual("Obad.1.1")
		expect(p.parse("Ob 1:1").osis()).toEqual("Obad.1.1")
		p.include_apocrypha(false)
		expect(p.parse("OBADJA 1:1").osis()).toEqual("Obad.1.1")
		expect(p.parse("OBAD 1:1").osis()).toEqual("Obad.1.1")
		expect(p.parse("OB 1:1").osis()).toEqual("Obad.1.1")
		;
      return true;
    });
  });

  describe("Localized book Jonah (af)", function() {
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
    return it("should handle book: Jonah (af)", function() {
      
		expect(p.parse("Jonah 1:1").osis()).toEqual("Jonah.1.1")
		expect(p.parse("Jona 1:1").osis()).toEqual("Jonah.1.1")
		p.include_apocrypha(false)
		expect(p.parse("JONAH 1:1").osis()).toEqual("Jonah.1.1")
		expect(p.parse("JONA 1:1").osis()).toEqual("Jonah.1.1")
		;
      return true;
    });
  });

  describe("Localized book Mic (af)", function() {
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
    return it("should handle book: Mic (af)", function() {
      
		expect(p.parse("Miga 1:1").osis()).toEqual("Mic.1.1")
		expect(p.parse("Mic 1:1").osis()).toEqual("Mic.1.1")
		p.include_apocrypha(false)
		expect(p.parse("MIGA 1:1").osis()).toEqual("Mic.1.1")
		expect(p.parse("MIC 1:1").osis()).toEqual("Mic.1.1")
		;
      return true;
    });
  });

  describe("Localized book Nah (af)", function() {
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
    return it("should handle book: Nah (af)", function() {
      
		expect(p.parse("Nahum 1:1").osis()).toEqual("Nah.1.1")
		expect(p.parse("Nah 1:1").osis()).toEqual("Nah.1.1")
		p.include_apocrypha(false)
		expect(p.parse("NAHUM 1:1").osis()).toEqual("Nah.1.1")
		expect(p.parse("NAH 1:1").osis()).toEqual("Nah.1.1")
		;
      return true;
    });
  });

  describe("Localized book Hab (af)", function() {
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
    return it("should handle book: Hab (af)", function() {
      
		expect(p.parse("Habakuk 1:1").osis()).toEqual("Hab.1.1")
		expect(p.parse("Hab 1:1").osis()).toEqual("Hab.1.1")
		p.include_apocrypha(false)
		expect(p.parse("HABAKUK 1:1").osis()).toEqual("Hab.1.1")
		expect(p.parse("HAB 1:1").osis()).toEqual("Hab.1.1")
		;
      return true;
    });
  });

  describe("Localized book Zeph (af)", function() {
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
    return it("should handle book: Zeph (af)", function() {
      
		expect(p.parse("Sefanja 1:1").osis()).toEqual("Zeph.1.1")
		expect(p.parse("Zeph 1:1").osis()).toEqual("Zeph.1.1")
		expect(p.parse("Sef 1:1").osis()).toEqual("Zeph.1.1")
		p.include_apocrypha(false)
		expect(p.parse("SEFANJA 1:1").osis()).toEqual("Zeph.1.1")
		expect(p.parse("ZEPH 1:1").osis()).toEqual("Zeph.1.1")
		expect(p.parse("SEF 1:1").osis()).toEqual("Zeph.1.1")
		;
      return true;
    });
  });

  describe("Localized book Hag (af)", function() {
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
    return it("should handle book: Hag (af)", function() {
      
		expect(p.parse("Haggai 1:1").osis()).toEqual("Hag.1.1")
		expect(p.parse("Hag 1:1").osis()).toEqual("Hag.1.1")
		p.include_apocrypha(false)
		expect(p.parse("HAGGAI 1:1").osis()).toEqual("Hag.1.1")
		expect(p.parse("HAG 1:1").osis()).toEqual("Hag.1.1")
		;
      return true;
    });
  });

  describe("Localized book Zech (af)", function() {
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
    return it("should handle book: Zech (af)", function() {
      
		expect(p.parse("Sagaria 1:1").osis()).toEqual("Zech.1.1")
		expect(p.parse("Zech 1:1").osis()).toEqual("Zech.1.1")
		expect(p.parse("Sag 1:1").osis()).toEqual("Zech.1.1")
		p.include_apocrypha(false)
		expect(p.parse("SAGARIA 1:1").osis()).toEqual("Zech.1.1")
		expect(p.parse("ZECH 1:1").osis()).toEqual("Zech.1.1")
		expect(p.parse("SAG 1:1").osis()).toEqual("Zech.1.1")
		;
      return true;
    });
  });

  describe("Localized book Mal (af)", function() {
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
    return it("should handle book: Mal (af)", function() {
      
		expect(p.parse("Maleagi 1:1").osis()).toEqual("Mal.1.1")
		expect(p.parse("Mal 1:1").osis()).toEqual("Mal.1.1")
		p.include_apocrypha(false)
		expect(p.parse("MALEAGI 1:1").osis()).toEqual("Mal.1.1")
		expect(p.parse("MAL 1:1").osis()).toEqual("Mal.1.1")
		;
      return true;
    });
  });

  describe("Localized book Matt (af)", function() {
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
    return it("should handle book: Matt (af)", function() {
      
		expect(p.parse("Mattheus 1:1").osis()).toEqual("Matt.1.1")
		expect(p.parse("Mattheüs 1:1").osis()).toEqual("Matt.1.1")
		expect(p.parse("Matthéus 1:1").osis()).toEqual("Matt.1.1")
		expect(p.parse("Matthéüs 1:1").osis()).toEqual("Matt.1.1")
		expect(p.parse("Matteus 1:1").osis()).toEqual("Matt.1.1")
		expect(p.parse("Matt 1:1").osis()).toEqual("Matt.1.1")
		p.include_apocrypha(false)
		expect(p.parse("MATTHEUS 1:1").osis()).toEqual("Matt.1.1")
		expect(p.parse("MATTHEÜS 1:1").osis()).toEqual("Matt.1.1")
		expect(p.parse("MATTHÉUS 1:1").osis()).toEqual("Matt.1.1")
		expect(p.parse("MATTHÉÜS 1:1").osis()).toEqual("Matt.1.1")
		expect(p.parse("MATTEUS 1:1").osis()).toEqual("Matt.1.1")
		expect(p.parse("MATT 1:1").osis()).toEqual("Matt.1.1")
		;
      return true;
    });
  });

  describe("Localized book Mark (af)", function() {
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
    return it("should handle book: Mark (af)", function() {
      
		expect(p.parse("Markus 1:1").osis()).toEqual("Mark.1.1")
		expect(p.parse("Mark 1:1").osis()).toEqual("Mark.1.1")
		p.include_apocrypha(false)
		expect(p.parse("MARKUS 1:1").osis()).toEqual("Mark.1.1")
		expect(p.parse("MARK 1:1").osis()).toEqual("Mark.1.1")
		;
      return true;
    });
  });

  describe("Localized book Luke (af)", function() {
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
    return it("should handle book: Luke (af)", function() {
      
		expect(p.parse("Lukas 1:1").osis()).toEqual("Luke.1.1")
		expect(p.parse("Luke 1:1").osis()).toEqual("Luke.1.1")
		expect(p.parse("Luk 1:1").osis()).toEqual("Luke.1.1")
		p.include_apocrypha(false)
		expect(p.parse("LUKAS 1:1").osis()).toEqual("Luke.1.1")
		expect(p.parse("LUKE 1:1").osis()).toEqual("Luke.1.1")
		expect(p.parse("LUK 1:1").osis()).toEqual("Luke.1.1")
		;
      return true;
    });
  });

  describe("Localized book 1John (af)", function() {
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
    return it("should handle book: 1John (af)", function() {
      
		expect(p.parse("1. Johannes 1:1").osis()).toEqual("1John.1.1")
		expect(p.parse("I. Johannes 1:1").osis()).toEqual("1John.1.1")
		expect(p.parse("1 Johannes 1:1").osis()).toEqual("1John.1.1")
		expect(p.parse("I Johannes 1:1").osis()).toEqual("1John.1.1")
		expect(p.parse("1. Joh 1:1").osis()).toEqual("1John.1.1")
		expect(p.parse("I. Joh 1:1").osis()).toEqual("1John.1.1")
		expect(p.parse("1 Joh 1:1").osis()).toEqual("1John.1.1")
		expect(p.parse("1John 1:1").osis()).toEqual("1John.1.1")
		expect(p.parse("I Joh 1:1").osis()).toEqual("1John.1.1")
		p.include_apocrypha(false)
		expect(p.parse("1. JOHANNES 1:1").osis()).toEqual("1John.1.1")
		expect(p.parse("I. JOHANNES 1:1").osis()).toEqual("1John.1.1")
		expect(p.parse("1 JOHANNES 1:1").osis()).toEqual("1John.1.1")
		expect(p.parse("I JOHANNES 1:1").osis()).toEqual("1John.1.1")
		expect(p.parse("1. JOH 1:1").osis()).toEqual("1John.1.1")
		expect(p.parse("I. JOH 1:1").osis()).toEqual("1John.1.1")
		expect(p.parse("1 JOH 1:1").osis()).toEqual("1John.1.1")
		expect(p.parse("1JOHN 1:1").osis()).toEqual("1John.1.1")
		expect(p.parse("I JOH 1:1").osis()).toEqual("1John.1.1")
		;
      return true;
    });
  });

  describe("Localized book 2John (af)", function() {
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
    return it("should handle book: 2John (af)", function() {
      
		expect(p.parse("II. Johannes 1:1").osis()).toEqual("2John.1.1")
		expect(p.parse("2. Johannes 1:1").osis()).toEqual("2John.1.1")
		expect(p.parse("II Johannes 1:1").osis()).toEqual("2John.1.1")
		expect(p.parse("2 Johannes 1:1").osis()).toEqual("2John.1.1")
		expect(p.parse("II. Joh 1:1").osis()).toEqual("2John.1.1")
		expect(p.parse("2. Joh 1:1").osis()).toEqual("2John.1.1")
		expect(p.parse("II Joh 1:1").osis()).toEqual("2John.1.1")
		expect(p.parse("2 Joh 1:1").osis()).toEqual("2John.1.1")
		expect(p.parse("2John 1:1").osis()).toEqual("2John.1.1")
		p.include_apocrypha(false)
		expect(p.parse("II. JOHANNES 1:1").osis()).toEqual("2John.1.1")
		expect(p.parse("2. JOHANNES 1:1").osis()).toEqual("2John.1.1")
		expect(p.parse("II JOHANNES 1:1").osis()).toEqual("2John.1.1")
		expect(p.parse("2 JOHANNES 1:1").osis()).toEqual("2John.1.1")
		expect(p.parse("II. JOH 1:1").osis()).toEqual("2John.1.1")
		expect(p.parse("2. JOH 1:1").osis()).toEqual("2John.1.1")
		expect(p.parse("II JOH 1:1").osis()).toEqual("2John.1.1")
		expect(p.parse("2 JOH 1:1").osis()).toEqual("2John.1.1")
		expect(p.parse("2JOHN 1:1").osis()).toEqual("2John.1.1")
		;
      return true;
    });
  });

  describe("Localized book 3John (af)", function() {
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
    return it("should handle book: 3John (af)", function() {
      
		expect(p.parse("III. Johannes 1:1").osis()).toEqual("3John.1.1")
		expect(p.parse("III Johannes 1:1").osis()).toEqual("3John.1.1")
		expect(p.parse("3. Johannes 1:1").osis()).toEqual("3John.1.1")
		expect(p.parse("3 Johannes 1:1").osis()).toEqual("3John.1.1")
		expect(p.parse("III. Joh 1:1").osis()).toEqual("3John.1.1")
		expect(p.parse("III Joh 1:1").osis()).toEqual("3John.1.1")
		expect(p.parse("3. Joh 1:1").osis()).toEqual("3John.1.1")
		expect(p.parse("3 Joh 1:1").osis()).toEqual("3John.1.1")
		expect(p.parse("3John 1:1").osis()).toEqual("3John.1.1")
		p.include_apocrypha(false)
		expect(p.parse("III. JOHANNES 1:1").osis()).toEqual("3John.1.1")
		expect(p.parse("III JOHANNES 1:1").osis()).toEqual("3John.1.1")
		expect(p.parse("3. JOHANNES 1:1").osis()).toEqual("3John.1.1")
		expect(p.parse("3 JOHANNES 1:1").osis()).toEqual("3John.1.1")
		expect(p.parse("III. JOH 1:1").osis()).toEqual("3John.1.1")
		expect(p.parse("III JOH 1:1").osis()).toEqual("3John.1.1")
		expect(p.parse("3. JOH 1:1").osis()).toEqual("3John.1.1")
		expect(p.parse("3 JOH 1:1").osis()).toEqual("3John.1.1")
		expect(p.parse("3JOHN 1:1").osis()).toEqual("3John.1.1")
		;
      return true;
    });
  });

  describe("Localized book John (af)", function() {
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
    return it("should handle book: John (af)", function() {
      
		expect(p.parse("Johannes 1:1").osis()).toEqual("John.1.1")
		expect(p.parse("John 1:1").osis()).toEqual("John.1.1")
		expect(p.parse("Joh 1:1").osis()).toEqual("John.1.1")
		p.include_apocrypha(false)
		expect(p.parse("JOHANNES 1:1").osis()).toEqual("John.1.1")
		expect(p.parse("JOHN 1:1").osis()).toEqual("John.1.1")
		expect(p.parse("JOH 1:1").osis()).toEqual("John.1.1")
		;
      return true;
    });
  });

  describe("Localized book Acts (af)", function() {
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
    return it("should handle book: Acts (af)", function() {
      
		expect(p.parse("Handelinge 1:1").osis()).toEqual("Acts.1.1")
		expect(p.parse("Acts 1:1").osis()).toEqual("Acts.1.1")
		expect(p.parse("Hand 1:1").osis()).toEqual("Acts.1.1")
		p.include_apocrypha(false)
		expect(p.parse("HANDELINGE 1:1").osis()).toEqual("Acts.1.1")
		expect(p.parse("ACTS 1:1").osis()).toEqual("Acts.1.1")
		expect(p.parse("HAND 1:1").osis()).toEqual("Acts.1.1")
		;
      return true;
    });
  });

  describe("Localized book Rom (af)", function() {
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
    return it("should handle book: Rom (af)", function() {
      
		expect(p.parse("Romeine 1:1").osis()).toEqual("Rom.1.1")
		expect(p.parse("Rom 1:1").osis()).toEqual("Rom.1.1")
		p.include_apocrypha(false)
		expect(p.parse("ROMEINE 1:1").osis()).toEqual("Rom.1.1")
		expect(p.parse("ROM 1:1").osis()).toEqual("Rom.1.1")
		;
      return true;
    });
  });

  describe("Localized book 2Cor (af)", function() {
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
    return it("should handle book: 2Cor (af)", function() {
      
		expect(p.parse("II. Korinthiers 1:1").osis()).toEqual("2Cor.1.1")
		expect(p.parse("II. Korinthiërs 1:1").osis()).toEqual("2Cor.1.1")
		expect(p.parse("2. Korinthiers 1:1").osis()).toEqual("2Cor.1.1")
		expect(p.parse("2. Korinthiërs 1:1").osis()).toEqual("2Cor.1.1")
		expect(p.parse("II Korinthiers 1:1").osis()).toEqual("2Cor.1.1")
		expect(p.parse("II Korinthiërs 1:1").osis()).toEqual("2Cor.1.1")
		expect(p.parse("II. Korintiers 1:1").osis()).toEqual("2Cor.1.1")
		expect(p.parse("II. Korintiërs 1:1").osis()).toEqual("2Cor.1.1")
		expect(p.parse("2 Korinthiers 1:1").osis()).toEqual("2Cor.1.1")
		expect(p.parse("2 Korinthiërs 1:1").osis()).toEqual("2Cor.1.1")
		expect(p.parse("2. Korintiers 1:1").osis()).toEqual("2Cor.1.1")
		expect(p.parse("2. Korintiërs 1:1").osis()).toEqual("2Cor.1.1")
		expect(p.parse("II Korintiers 1:1").osis()).toEqual("2Cor.1.1")
		expect(p.parse("II Korintiërs 1:1").osis()).toEqual("2Cor.1.1")
		expect(p.parse("2 Korintiers 1:1").osis()).toEqual("2Cor.1.1")
		expect(p.parse("2 Korintiërs 1:1").osis()).toEqual("2Cor.1.1")
		expect(p.parse("II. Kor 1:1").osis()).toEqual("2Cor.1.1")
		expect(p.parse("2. Kor 1:1").osis()).toEqual("2Cor.1.1")
		expect(p.parse("II Kor 1:1").osis()).toEqual("2Cor.1.1")
		expect(p.parse("2 Kor 1:1").osis()).toEqual("2Cor.1.1")
		expect(p.parse("2Cor 1:1").osis()).toEqual("2Cor.1.1")
		p.include_apocrypha(false)
		expect(p.parse("II. KORINTHIERS 1:1").osis()).toEqual("2Cor.1.1")
		expect(p.parse("II. KORINTHIËRS 1:1").osis()).toEqual("2Cor.1.1")
		expect(p.parse("2. KORINTHIERS 1:1").osis()).toEqual("2Cor.1.1")
		expect(p.parse("2. KORINTHIËRS 1:1").osis()).toEqual("2Cor.1.1")
		expect(p.parse("II KORINTHIERS 1:1").osis()).toEqual("2Cor.1.1")
		expect(p.parse("II KORINTHIËRS 1:1").osis()).toEqual("2Cor.1.1")
		expect(p.parse("II. KORINTIERS 1:1").osis()).toEqual("2Cor.1.1")
		expect(p.parse("II. KORINTIËRS 1:1").osis()).toEqual("2Cor.1.1")
		expect(p.parse("2 KORINTHIERS 1:1").osis()).toEqual("2Cor.1.1")
		expect(p.parse("2 KORINTHIËRS 1:1").osis()).toEqual("2Cor.1.1")
		expect(p.parse("2. KORINTIERS 1:1").osis()).toEqual("2Cor.1.1")
		expect(p.parse("2. KORINTIËRS 1:1").osis()).toEqual("2Cor.1.1")
		expect(p.parse("II KORINTIERS 1:1").osis()).toEqual("2Cor.1.1")
		expect(p.parse("II KORINTIËRS 1:1").osis()).toEqual("2Cor.1.1")
		expect(p.parse("2 KORINTIERS 1:1").osis()).toEqual("2Cor.1.1")
		expect(p.parse("2 KORINTIËRS 1:1").osis()).toEqual("2Cor.1.1")
		expect(p.parse("II. KOR 1:1").osis()).toEqual("2Cor.1.1")
		expect(p.parse("2. KOR 1:1").osis()).toEqual("2Cor.1.1")
		expect(p.parse("II KOR 1:1").osis()).toEqual("2Cor.1.1")
		expect(p.parse("2 KOR 1:1").osis()).toEqual("2Cor.1.1")
		expect(p.parse("2COR 1:1").osis()).toEqual("2Cor.1.1")
		;
      return true;
    });
  });

  describe("Localized book 1Cor (af)", function() {
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
    return it("should handle book: 1Cor (af)", function() {
      
		expect(p.parse("1. Korinthiers 1:1").osis()).toEqual("1Cor.1.1")
		expect(p.parse("1. Korinthiërs 1:1").osis()).toEqual("1Cor.1.1")
		expect(p.parse("I. Korinthiers 1:1").osis()).toEqual("1Cor.1.1")
		expect(p.parse("I. Korinthiërs 1:1").osis()).toEqual("1Cor.1.1")
		expect(p.parse("1 Korinthiers 1:1").osis()).toEqual("1Cor.1.1")
		expect(p.parse("1 Korinthiërs 1:1").osis()).toEqual("1Cor.1.1")
		expect(p.parse("1. Korintiers 1:1").osis()).toEqual("1Cor.1.1")
		expect(p.parse("1. Korintiërs 1:1").osis()).toEqual("1Cor.1.1")
		expect(p.parse("I Korinthiers 1:1").osis()).toEqual("1Cor.1.1")
		expect(p.parse("I Korinthiërs 1:1").osis()).toEqual("1Cor.1.1")
		expect(p.parse("I. Korintiers 1:1").osis()).toEqual("1Cor.1.1")
		expect(p.parse("I. Korintiërs 1:1").osis()).toEqual("1Cor.1.1")
		expect(p.parse("1 Korintiers 1:1").osis()).toEqual("1Cor.1.1")
		expect(p.parse("1 Korintiërs 1:1").osis()).toEqual("1Cor.1.1")
		expect(p.parse("I Korintiers 1:1").osis()).toEqual("1Cor.1.1")
		expect(p.parse("I Korintiërs 1:1").osis()).toEqual("1Cor.1.1")
		expect(p.parse("1. Kor 1:1").osis()).toEqual("1Cor.1.1")
		expect(p.parse("I. Kor 1:1").osis()).toEqual("1Cor.1.1")
		expect(p.parse("1 Kor 1:1").osis()).toEqual("1Cor.1.1")
		expect(p.parse("I Kor 1:1").osis()).toEqual("1Cor.1.1")
		expect(p.parse("1Cor 1:1").osis()).toEqual("1Cor.1.1")
		p.include_apocrypha(false)
		expect(p.parse("1. KORINTHIERS 1:1").osis()).toEqual("1Cor.1.1")
		expect(p.parse("1. KORINTHIËRS 1:1").osis()).toEqual("1Cor.1.1")
		expect(p.parse("I. KORINTHIERS 1:1").osis()).toEqual("1Cor.1.1")
		expect(p.parse("I. KORINTHIËRS 1:1").osis()).toEqual("1Cor.1.1")
		expect(p.parse("1 KORINTHIERS 1:1").osis()).toEqual("1Cor.1.1")
		expect(p.parse("1 KORINTHIËRS 1:1").osis()).toEqual("1Cor.1.1")
		expect(p.parse("1. KORINTIERS 1:1").osis()).toEqual("1Cor.1.1")
		expect(p.parse("1. KORINTIËRS 1:1").osis()).toEqual("1Cor.1.1")
		expect(p.parse("I KORINTHIERS 1:1").osis()).toEqual("1Cor.1.1")
		expect(p.parse("I KORINTHIËRS 1:1").osis()).toEqual("1Cor.1.1")
		expect(p.parse("I. KORINTIERS 1:1").osis()).toEqual("1Cor.1.1")
		expect(p.parse("I. KORINTIËRS 1:1").osis()).toEqual("1Cor.1.1")
		expect(p.parse("1 KORINTIERS 1:1").osis()).toEqual("1Cor.1.1")
		expect(p.parse("1 KORINTIËRS 1:1").osis()).toEqual("1Cor.1.1")
		expect(p.parse("I KORINTIERS 1:1").osis()).toEqual("1Cor.1.1")
		expect(p.parse("I KORINTIËRS 1:1").osis()).toEqual("1Cor.1.1")
		expect(p.parse("1. KOR 1:1").osis()).toEqual("1Cor.1.1")
		expect(p.parse("I. KOR 1:1").osis()).toEqual("1Cor.1.1")
		expect(p.parse("1 KOR 1:1").osis()).toEqual("1Cor.1.1")
		expect(p.parse("I KOR 1:1").osis()).toEqual("1Cor.1.1")
		expect(p.parse("1COR 1:1").osis()).toEqual("1Cor.1.1")
		;
      return true;
    });
  });

  describe("Localized book Gal (af)", function() {
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
    return it("should handle book: Gal (af)", function() {
      
		expect(p.parse("Galasiers 1:1").osis()).toEqual("Gal.1.1")
		expect(p.parse("Galasiërs 1:1").osis()).toEqual("Gal.1.1")
		expect(p.parse("Galásiers 1:1").osis()).toEqual("Gal.1.1")
		expect(p.parse("Galásiërs 1:1").osis()).toEqual("Gal.1.1")
		expect(p.parse("Gal 1:1").osis()).toEqual("Gal.1.1")
		p.include_apocrypha(false)
		expect(p.parse("GALASIERS 1:1").osis()).toEqual("Gal.1.1")
		expect(p.parse("GALASIËRS 1:1").osis()).toEqual("Gal.1.1")
		expect(p.parse("GALÁSIERS 1:1").osis()).toEqual("Gal.1.1")
		expect(p.parse("GALÁSIËRS 1:1").osis()).toEqual("Gal.1.1")
		expect(p.parse("GAL 1:1").osis()).toEqual("Gal.1.1")
		;
      return true;
    });
  });

  describe("Localized book Eph (af)", function() {
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
    return it("should handle book: Eph (af)", function() {
      
		expect(p.parse("Efesiers 1:1").osis()).toEqual("Eph.1.1")
		expect(p.parse("Efesiërs 1:1").osis()).toEqual("Eph.1.1")
		expect(p.parse("Efésiers 1:1").osis()).toEqual("Eph.1.1")
		expect(p.parse("Efésiërs 1:1").osis()).toEqual("Eph.1.1")
		expect(p.parse("Eph 1:1").osis()).toEqual("Eph.1.1")
		expect(p.parse("Ef 1:1").osis()).toEqual("Eph.1.1")
		p.include_apocrypha(false)
		expect(p.parse("EFESIERS 1:1").osis()).toEqual("Eph.1.1")
		expect(p.parse("EFESIËRS 1:1").osis()).toEqual("Eph.1.1")
		expect(p.parse("EFÉSIERS 1:1").osis()).toEqual("Eph.1.1")
		expect(p.parse("EFÉSIËRS 1:1").osis()).toEqual("Eph.1.1")
		expect(p.parse("EPH 1:1").osis()).toEqual("Eph.1.1")
		expect(p.parse("EF 1:1").osis()).toEqual("Eph.1.1")
		;
      return true;
    });
  });

  describe("Localized book Phil (af)", function() {
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
    return it("should handle book: Phil (af)", function() {
      
		expect(p.parse("Filippense 1:1").osis()).toEqual("Phil.1.1")
		expect(p.parse("Phil 1:1").osis()).toEqual("Phil.1.1")
		expect(p.parse("Fil 1:1").osis()).toEqual("Phil.1.1")
		p.include_apocrypha(false)
		expect(p.parse("FILIPPENSE 1:1").osis()).toEqual("Phil.1.1")
		expect(p.parse("PHIL 1:1").osis()).toEqual("Phil.1.1")
		expect(p.parse("FIL 1:1").osis()).toEqual("Phil.1.1")
		;
      return true;
    });
  });

  describe("Localized book Col (af)", function() {
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
    return it("should handle book: Col (af)", function() {
      
		expect(p.parse("Kolossense 1:1").osis()).toEqual("Col.1.1")
		expect(p.parse("Col 1:1").osis()).toEqual("Col.1.1")
		expect(p.parse("Kol 1:1").osis()).toEqual("Col.1.1")
		p.include_apocrypha(false)
		expect(p.parse("KOLOSSENSE 1:1").osis()).toEqual("Col.1.1")
		expect(p.parse("COL 1:1").osis()).toEqual("Col.1.1")
		expect(p.parse("KOL 1:1").osis()).toEqual("Col.1.1")
		;
      return true;
    });
  });

  describe("Localized book 2Thess (af)", function() {
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
    return it("should handle book: 2Thess (af)", function() {
      
		expect(p.parse("II. Tessalonisense 1:1").osis()).toEqual("2Thess.1.1")
		expect(p.parse("2. Tessalonisense 1:1").osis()).toEqual("2Thess.1.1")
		expect(p.parse("II Tessalonisense 1:1").osis()).toEqual("2Thess.1.1")
		expect(p.parse("II. Tessaonicense 1:1").osis()).toEqual("2Thess.1.1")
		expect(p.parse("2 Tessalonisense 1:1").osis()).toEqual("2Thess.1.1")
		expect(p.parse("2. Tessaonicense 1:1").osis()).toEqual("2Thess.1.1")
		expect(p.parse("II Tessaonicense 1:1").osis()).toEqual("2Thess.1.1")
		expect(p.parse("2 Tessaonicense 1:1").osis()).toEqual("2Thess.1.1")
		expect(p.parse("II. Thess 1:1").osis()).toEqual("2Thess.1.1")
		expect(p.parse("2. Thess 1:1").osis()).toEqual("2Thess.1.1")
		expect(p.parse("II Thess 1:1").osis()).toEqual("2Thess.1.1")
		expect(p.parse("II. Tess 1:1").osis()).toEqual("2Thess.1.1")
		expect(p.parse("2 Thess 1:1").osis()).toEqual("2Thess.1.1")
		expect(p.parse("2. Tess 1:1").osis()).toEqual("2Thess.1.1")
		expect(p.parse("II Tess 1:1").osis()).toEqual("2Thess.1.1")
		expect(p.parse("2 Tess 1:1").osis()).toEqual("2Thess.1.1")
		expect(p.parse("2Thess 1:1").osis()).toEqual("2Thess.1.1")
		p.include_apocrypha(false)
		expect(p.parse("II. TESSALONISENSE 1:1").osis()).toEqual("2Thess.1.1")
		expect(p.parse("2. TESSALONISENSE 1:1").osis()).toEqual("2Thess.1.1")
		expect(p.parse("II TESSALONISENSE 1:1").osis()).toEqual("2Thess.1.1")
		expect(p.parse("II. TESSAONICENSE 1:1").osis()).toEqual("2Thess.1.1")
		expect(p.parse("2 TESSALONISENSE 1:1").osis()).toEqual("2Thess.1.1")
		expect(p.parse("2. TESSAONICENSE 1:1").osis()).toEqual("2Thess.1.1")
		expect(p.parse("II TESSAONICENSE 1:1").osis()).toEqual("2Thess.1.1")
		expect(p.parse("2 TESSAONICENSE 1:1").osis()).toEqual("2Thess.1.1")
		expect(p.parse("II. THESS 1:1").osis()).toEqual("2Thess.1.1")
		expect(p.parse("2. THESS 1:1").osis()).toEqual("2Thess.1.1")
		expect(p.parse("II THESS 1:1").osis()).toEqual("2Thess.1.1")
		expect(p.parse("II. TESS 1:1").osis()).toEqual("2Thess.1.1")
		expect(p.parse("2 THESS 1:1").osis()).toEqual("2Thess.1.1")
		expect(p.parse("2. TESS 1:1").osis()).toEqual("2Thess.1.1")
		expect(p.parse("II TESS 1:1").osis()).toEqual("2Thess.1.1")
		expect(p.parse("2 TESS 1:1").osis()).toEqual("2Thess.1.1")
		expect(p.parse("2THESS 1:1").osis()).toEqual("2Thess.1.1")
		;
      return true;
    });
  });

  describe("Localized book 1Thess (af)", function() {
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
    return it("should handle book: 1Thess (af)", function() {
      
		expect(p.parse("1. Tessalonisense 1:1").osis()).toEqual("1Thess.1.1")
		expect(p.parse("I. Tessalonisense 1:1").osis()).toEqual("1Thess.1.1")
		expect(p.parse("1 Tessalonisense 1:1").osis()).toEqual("1Thess.1.1")
		expect(p.parse("1. Tessaonicense 1:1").osis()).toEqual("1Thess.1.1")
		expect(p.parse("I Tessalonisense 1:1").osis()).toEqual("1Thess.1.1")
		expect(p.parse("I. Tessaonicense 1:1").osis()).toEqual("1Thess.1.1")
		expect(p.parse("1 Tessaonicense 1:1").osis()).toEqual("1Thess.1.1")
		expect(p.parse("I Tessaonicense 1:1").osis()).toEqual("1Thess.1.1")
		expect(p.parse("1. Thess 1:1").osis()).toEqual("1Thess.1.1")
		expect(p.parse("I. Thess 1:1").osis()).toEqual("1Thess.1.1")
		expect(p.parse("1 Thess 1:1").osis()).toEqual("1Thess.1.1")
		expect(p.parse("1. Tess 1:1").osis()).toEqual("1Thess.1.1")
		expect(p.parse("I Thess 1:1").osis()).toEqual("1Thess.1.1")
		expect(p.parse("I. Tess 1:1").osis()).toEqual("1Thess.1.1")
		expect(p.parse("1 Tess 1:1").osis()).toEqual("1Thess.1.1")
		expect(p.parse("1Thess 1:1").osis()).toEqual("1Thess.1.1")
		expect(p.parse("I Tess 1:1").osis()).toEqual("1Thess.1.1")
		p.include_apocrypha(false)
		expect(p.parse("1. TESSALONISENSE 1:1").osis()).toEqual("1Thess.1.1")
		expect(p.parse("I. TESSALONISENSE 1:1").osis()).toEqual("1Thess.1.1")
		expect(p.parse("1 TESSALONISENSE 1:1").osis()).toEqual("1Thess.1.1")
		expect(p.parse("1. TESSAONICENSE 1:1").osis()).toEqual("1Thess.1.1")
		expect(p.parse("I TESSALONISENSE 1:1").osis()).toEqual("1Thess.1.1")
		expect(p.parse("I. TESSAONICENSE 1:1").osis()).toEqual("1Thess.1.1")
		expect(p.parse("1 TESSAONICENSE 1:1").osis()).toEqual("1Thess.1.1")
		expect(p.parse("I TESSAONICENSE 1:1").osis()).toEqual("1Thess.1.1")
		expect(p.parse("1. THESS 1:1").osis()).toEqual("1Thess.1.1")
		expect(p.parse("I. THESS 1:1").osis()).toEqual("1Thess.1.1")
		expect(p.parse("1 THESS 1:1").osis()).toEqual("1Thess.1.1")
		expect(p.parse("1. TESS 1:1").osis()).toEqual("1Thess.1.1")
		expect(p.parse("I THESS 1:1").osis()).toEqual("1Thess.1.1")
		expect(p.parse("I. TESS 1:1").osis()).toEqual("1Thess.1.1")
		expect(p.parse("1 TESS 1:1").osis()).toEqual("1Thess.1.1")
		expect(p.parse("1THESS 1:1").osis()).toEqual("1Thess.1.1")
		expect(p.parse("I TESS 1:1").osis()).toEqual("1Thess.1.1")
		;
      return true;
    });
  });

  describe("Localized book 2Tim (af)", function() {
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
    return it("should handle book: 2Tim (af)", function() {
      
		expect(p.parse("II. Timotheus 1:1").osis()).toEqual("2Tim.1.1")
		expect(p.parse("II. Timotheüs 1:1").osis()).toEqual("2Tim.1.1")
		expect(p.parse("II. Timótheus 1:1").osis()).toEqual("2Tim.1.1")
		expect(p.parse("II. Timótheüs 1:1").osis()).toEqual("2Tim.1.1")
		expect(p.parse("2. Timotheus 1:1").osis()).toEqual("2Tim.1.1")
		expect(p.parse("2. Timotheüs 1:1").osis()).toEqual("2Tim.1.1")
		expect(p.parse("2. Timótheus 1:1").osis()).toEqual("2Tim.1.1")
		expect(p.parse("2. Timótheüs 1:1").osis()).toEqual("2Tim.1.1")
		expect(p.parse("II Timotheus 1:1").osis()).toEqual("2Tim.1.1")
		expect(p.parse("II Timotheüs 1:1").osis()).toEqual("2Tim.1.1")
		expect(p.parse("II Timótheus 1:1").osis()).toEqual("2Tim.1.1")
		expect(p.parse("II Timótheüs 1:1").osis()).toEqual("2Tim.1.1")
		expect(p.parse("II. Timoteus 1:1").osis()).toEqual("2Tim.1.1")
		expect(p.parse("2 Timotheus 1:1").osis()).toEqual("2Tim.1.1")
		expect(p.parse("2 Timotheüs 1:1").osis()).toEqual("2Tim.1.1")
		expect(p.parse("2 Timótheus 1:1").osis()).toEqual("2Tim.1.1")
		expect(p.parse("2 Timótheüs 1:1").osis()).toEqual("2Tim.1.1")
		expect(p.parse("2. Timoteus 1:1").osis()).toEqual("2Tim.1.1")
		expect(p.parse("II Timoteus 1:1").osis()).toEqual("2Tim.1.1")
		expect(p.parse("2 Timoteus 1:1").osis()).toEqual("2Tim.1.1")
		expect(p.parse("II. Tim 1:1").osis()).toEqual("2Tim.1.1")
		expect(p.parse("2. Tim 1:1").osis()).toEqual("2Tim.1.1")
		expect(p.parse("II Tim 1:1").osis()).toEqual("2Tim.1.1")
		expect(p.parse("2 Tim 1:1").osis()).toEqual("2Tim.1.1")
		expect(p.parse("2Tim 1:1").osis()).toEqual("2Tim.1.1")
		p.include_apocrypha(false)
		expect(p.parse("II. TIMOTHEUS 1:1").osis()).toEqual("2Tim.1.1")
		expect(p.parse("II. TIMOTHEÜS 1:1").osis()).toEqual("2Tim.1.1")
		expect(p.parse("II. TIMÓTHEUS 1:1").osis()).toEqual("2Tim.1.1")
		expect(p.parse("II. TIMÓTHEÜS 1:1").osis()).toEqual("2Tim.1.1")
		expect(p.parse("2. TIMOTHEUS 1:1").osis()).toEqual("2Tim.1.1")
		expect(p.parse("2. TIMOTHEÜS 1:1").osis()).toEqual("2Tim.1.1")
		expect(p.parse("2. TIMÓTHEUS 1:1").osis()).toEqual("2Tim.1.1")
		expect(p.parse("2. TIMÓTHEÜS 1:1").osis()).toEqual("2Tim.1.1")
		expect(p.parse("II TIMOTHEUS 1:1").osis()).toEqual("2Tim.1.1")
		expect(p.parse("II TIMOTHEÜS 1:1").osis()).toEqual("2Tim.1.1")
		expect(p.parse("II TIMÓTHEUS 1:1").osis()).toEqual("2Tim.1.1")
		expect(p.parse("II TIMÓTHEÜS 1:1").osis()).toEqual("2Tim.1.1")
		expect(p.parse("II. TIMOTEUS 1:1").osis()).toEqual("2Tim.1.1")
		expect(p.parse("2 TIMOTHEUS 1:1").osis()).toEqual("2Tim.1.1")
		expect(p.parse("2 TIMOTHEÜS 1:1").osis()).toEqual("2Tim.1.1")
		expect(p.parse("2 TIMÓTHEUS 1:1").osis()).toEqual("2Tim.1.1")
		expect(p.parse("2 TIMÓTHEÜS 1:1").osis()).toEqual("2Tim.1.1")
		expect(p.parse("2. TIMOTEUS 1:1").osis()).toEqual("2Tim.1.1")
		expect(p.parse("II TIMOTEUS 1:1").osis()).toEqual("2Tim.1.1")
		expect(p.parse("2 TIMOTEUS 1:1").osis()).toEqual("2Tim.1.1")
		expect(p.parse("II. TIM 1:1").osis()).toEqual("2Tim.1.1")
		expect(p.parse("2. TIM 1:1").osis()).toEqual("2Tim.1.1")
		expect(p.parse("II TIM 1:1").osis()).toEqual("2Tim.1.1")
		expect(p.parse("2 TIM 1:1").osis()).toEqual("2Tim.1.1")
		expect(p.parse("2TIM 1:1").osis()).toEqual("2Tim.1.1")
		;
      return true;
    });
  });

  describe("Localized book 1Tim (af)", function() {
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
    return it("should handle book: 1Tim (af)", function() {
      
		expect(p.parse("1. Timotheus 1:1").osis()).toEqual("1Tim.1.1")
		expect(p.parse("1. Timotheüs 1:1").osis()).toEqual("1Tim.1.1")
		expect(p.parse("1. Timótheus 1:1").osis()).toEqual("1Tim.1.1")
		expect(p.parse("1. Timótheüs 1:1").osis()).toEqual("1Tim.1.1")
		expect(p.parse("I. Timotheus 1:1").osis()).toEqual("1Tim.1.1")
		expect(p.parse("I. Timotheüs 1:1").osis()).toEqual("1Tim.1.1")
		expect(p.parse("I. Timótheus 1:1").osis()).toEqual("1Tim.1.1")
		expect(p.parse("I. Timótheüs 1:1").osis()).toEqual("1Tim.1.1")
		expect(p.parse("1 Timotheus 1:1").osis()).toEqual("1Tim.1.1")
		expect(p.parse("1 Timotheüs 1:1").osis()).toEqual("1Tim.1.1")
		expect(p.parse("1 Timótheus 1:1").osis()).toEqual("1Tim.1.1")
		expect(p.parse("1 Timótheüs 1:1").osis()).toEqual("1Tim.1.1")
		expect(p.parse("1. Timoteus 1:1").osis()).toEqual("1Tim.1.1")
		expect(p.parse("I Timotheus 1:1").osis()).toEqual("1Tim.1.1")
		expect(p.parse("I Timotheüs 1:1").osis()).toEqual("1Tim.1.1")
		expect(p.parse("I Timótheus 1:1").osis()).toEqual("1Tim.1.1")
		expect(p.parse("I Timótheüs 1:1").osis()).toEqual("1Tim.1.1")
		expect(p.parse("I. Timoteus 1:1").osis()).toEqual("1Tim.1.1")
		expect(p.parse("1 Timoteus 1:1").osis()).toEqual("1Tim.1.1")
		expect(p.parse("I Timoteus 1:1").osis()).toEqual("1Tim.1.1")
		expect(p.parse("1. Tim 1:1").osis()).toEqual("1Tim.1.1")
		expect(p.parse("I. Tim 1:1").osis()).toEqual("1Tim.1.1")
		expect(p.parse("1 Tim 1:1").osis()).toEqual("1Tim.1.1")
		expect(p.parse("I Tim 1:1").osis()).toEqual("1Tim.1.1")
		expect(p.parse("1Tim 1:1").osis()).toEqual("1Tim.1.1")
		p.include_apocrypha(false)
		expect(p.parse("1. TIMOTHEUS 1:1").osis()).toEqual("1Tim.1.1")
		expect(p.parse("1. TIMOTHEÜS 1:1").osis()).toEqual("1Tim.1.1")
		expect(p.parse("1. TIMÓTHEUS 1:1").osis()).toEqual("1Tim.1.1")
		expect(p.parse("1. TIMÓTHEÜS 1:1").osis()).toEqual("1Tim.1.1")
		expect(p.parse("I. TIMOTHEUS 1:1").osis()).toEqual("1Tim.1.1")
		expect(p.parse("I. TIMOTHEÜS 1:1").osis()).toEqual("1Tim.1.1")
		expect(p.parse("I. TIMÓTHEUS 1:1").osis()).toEqual("1Tim.1.1")
		expect(p.parse("I. TIMÓTHEÜS 1:1").osis()).toEqual("1Tim.1.1")
		expect(p.parse("1 TIMOTHEUS 1:1").osis()).toEqual("1Tim.1.1")
		expect(p.parse("1 TIMOTHEÜS 1:1").osis()).toEqual("1Tim.1.1")
		expect(p.parse("1 TIMÓTHEUS 1:1").osis()).toEqual("1Tim.1.1")
		expect(p.parse("1 TIMÓTHEÜS 1:1").osis()).toEqual("1Tim.1.1")
		expect(p.parse("1. TIMOTEUS 1:1").osis()).toEqual("1Tim.1.1")
		expect(p.parse("I TIMOTHEUS 1:1").osis()).toEqual("1Tim.1.1")
		expect(p.parse("I TIMOTHEÜS 1:1").osis()).toEqual("1Tim.1.1")
		expect(p.parse("I TIMÓTHEUS 1:1").osis()).toEqual("1Tim.1.1")
		expect(p.parse("I TIMÓTHEÜS 1:1").osis()).toEqual("1Tim.1.1")
		expect(p.parse("I. TIMOTEUS 1:1").osis()).toEqual("1Tim.1.1")
		expect(p.parse("1 TIMOTEUS 1:1").osis()).toEqual("1Tim.1.1")
		expect(p.parse("I TIMOTEUS 1:1").osis()).toEqual("1Tim.1.1")
		expect(p.parse("1. TIM 1:1").osis()).toEqual("1Tim.1.1")
		expect(p.parse("I. TIM 1:1").osis()).toEqual("1Tim.1.1")
		expect(p.parse("1 TIM 1:1").osis()).toEqual("1Tim.1.1")
		expect(p.parse("I TIM 1:1").osis()).toEqual("1Tim.1.1")
		expect(p.parse("1TIM 1:1").osis()).toEqual("1Tim.1.1")
		;
      return true;
    });
  });

  describe("Localized book Titus (af)", function() {
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
    return it("should handle book: Titus (af)", function() {
      
		expect(p.parse("Titus 1:1").osis()).toEqual("Titus.1.1")
		expect(p.parse("Tit 1:1").osis()).toEqual("Titus.1.1")
		p.include_apocrypha(false)
		expect(p.parse("TITUS 1:1").osis()).toEqual("Titus.1.1")
		expect(p.parse("TIT 1:1").osis()).toEqual("Titus.1.1")
		;
      return true;
    });
  });

  describe("Localized book Phlm (af)", function() {
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
    return it("should handle book: Phlm (af)", function() {
      
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

  describe("Localized book Heb (af)", function() {
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
    return it("should handle book: Heb (af)", function() {
      
		expect(p.parse("Hebreers 1:1").osis()).toEqual("Heb.1.1")
		expect(p.parse("Hebreërs 1:1").osis()).toEqual("Heb.1.1")
		expect(p.parse("Heb 1:1").osis()).toEqual("Heb.1.1")
		p.include_apocrypha(false)
		expect(p.parse("HEBREERS 1:1").osis()).toEqual("Heb.1.1")
		expect(p.parse("HEBREËRS 1:1").osis()).toEqual("Heb.1.1")
		expect(p.parse("HEB 1:1").osis()).toEqual("Heb.1.1")
		;
      return true;
    });
  });

  describe("Localized book Jas (af)", function() {
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
    return it("should handle book: Jas (af)", function() {
      
		expect(p.parse("Jakobus 1:1").osis()).toEqual("Jas.1.1")
		expect(p.parse("Jak 1:1").osis()).toEqual("Jas.1.1")
		expect(p.parse("Jas 1:1").osis()).toEqual("Jas.1.1")
		p.include_apocrypha(false)
		expect(p.parse("JAKOBUS 1:1").osis()).toEqual("Jas.1.1")
		expect(p.parse("JAK 1:1").osis()).toEqual("Jas.1.1")
		expect(p.parse("JAS 1:1").osis()).toEqual("Jas.1.1")
		;
      return true;
    });
  });

  describe("Localized book 2Pet (af)", function() {
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
    return it("should handle book: 2Pet (af)", function() {
      
		expect(p.parse("II. Petrus 1:1").osis()).toEqual("2Pet.1.1")
		expect(p.parse("2. Petrus 1:1").osis()).toEqual("2Pet.1.1")
		expect(p.parse("II Petrus 1:1").osis()).toEqual("2Pet.1.1")
		expect(p.parse("2 Petrus 1:1").osis()).toEqual("2Pet.1.1")
		expect(p.parse("II. Pet 1:1").osis()).toEqual("2Pet.1.1")
		expect(p.parse("2. Pet 1:1").osis()).toEqual("2Pet.1.1")
		expect(p.parse("II Pet 1:1").osis()).toEqual("2Pet.1.1")
		expect(p.parse("2 Pet 1:1").osis()).toEqual("2Pet.1.1")
		expect(p.parse("2Pet 1:1").osis()).toEqual("2Pet.1.1")
		p.include_apocrypha(false)
		expect(p.parse("II. PETRUS 1:1").osis()).toEqual("2Pet.1.1")
		expect(p.parse("2. PETRUS 1:1").osis()).toEqual("2Pet.1.1")
		expect(p.parse("II PETRUS 1:1").osis()).toEqual("2Pet.1.1")
		expect(p.parse("2 PETRUS 1:1").osis()).toEqual("2Pet.1.1")
		expect(p.parse("II. PET 1:1").osis()).toEqual("2Pet.1.1")
		expect(p.parse("2. PET 1:1").osis()).toEqual("2Pet.1.1")
		expect(p.parse("II PET 1:1").osis()).toEqual("2Pet.1.1")
		expect(p.parse("2 PET 1:1").osis()).toEqual("2Pet.1.1")
		expect(p.parse("2PET 1:1").osis()).toEqual("2Pet.1.1")
		;
      return true;
    });
  });

  describe("Localized book 1Pet (af)", function() {
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
    return it("should handle book: 1Pet (af)", function() {
      
		expect(p.parse("1. Petrus 1:1").osis()).toEqual("1Pet.1.1")
		expect(p.parse("I. Petrus 1:1").osis()).toEqual("1Pet.1.1")
		expect(p.parse("1 Petrus 1:1").osis()).toEqual("1Pet.1.1")
		expect(p.parse("I Petrus 1:1").osis()).toEqual("1Pet.1.1")
		expect(p.parse("1. Pet 1:1").osis()).toEqual("1Pet.1.1")
		expect(p.parse("I. Pet 1:1").osis()).toEqual("1Pet.1.1")
		expect(p.parse("1 Pet 1:1").osis()).toEqual("1Pet.1.1")
		expect(p.parse("I Pet 1:1").osis()).toEqual("1Pet.1.1")
		expect(p.parse("1Pet 1:1").osis()).toEqual("1Pet.1.1")
		p.include_apocrypha(false)
		expect(p.parse("1. PETRUS 1:1").osis()).toEqual("1Pet.1.1")
		expect(p.parse("I. PETRUS 1:1").osis()).toEqual("1Pet.1.1")
		expect(p.parse("1 PETRUS 1:1").osis()).toEqual("1Pet.1.1")
		expect(p.parse("I PETRUS 1:1").osis()).toEqual("1Pet.1.1")
		expect(p.parse("1. PET 1:1").osis()).toEqual("1Pet.1.1")
		expect(p.parse("I. PET 1:1").osis()).toEqual("1Pet.1.1")
		expect(p.parse("1 PET 1:1").osis()).toEqual("1Pet.1.1")
		expect(p.parse("I PET 1:1").osis()).toEqual("1Pet.1.1")
		expect(p.parse("1PET 1:1").osis()).toEqual("1Pet.1.1")
		;
      return true;
    });
  });

  describe("Localized book Jude (af)", function() {
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
    return it("should handle book: Jude (af)", function() {
      
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

  describe("Localized book Tob (af)", function() {
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
    return it("should handle book: Tob (af)", function() {
      
		expect(p.parse("Tob 1:1").osis()).toEqual("Tob.1.1")
		;
      return true;
    });
  });

  describe("Localized book Jdt (af)", function() {
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
    return it("should handle book: Jdt (af)", function() {
      
		expect(p.parse("Jdt 1:1").osis()).toEqual("Jdt.1.1")
		;
      return true;
    });
  });

  describe("Localized book Bar (af)", function() {
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
    return it("should handle book: Bar (af)", function() {
      
		expect(p.parse("Bar 1:1").osis()).toEqual("Bar.1.1")
		;
      return true;
    });
  });

  describe("Localized book Sus (af)", function() {
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
    return it("should handle book: Sus (af)", function() {
      
		expect(p.parse("Sus 1:1").osis()).toEqual("Sus.1.1")
		;
      return true;
    });
  });

  describe("Localized book 2Macc (af)", function() {
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
    return it("should handle book: 2Macc (af)", function() {
      
		expect(p.parse("2Macc 1:1").osis()).toEqual("2Macc.1.1")
		;
      return true;
    });
  });

  describe("Localized book 3Macc (af)", function() {
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
    return it("should handle book: 3Macc (af)", function() {
      
		expect(p.parse("3Macc 1:1").osis()).toEqual("3Macc.1.1")
		;
      return true;
    });
  });

  describe("Localized book 4Macc (af)", function() {
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
    return it("should handle book: 4Macc (af)", function() {
      
		expect(p.parse("4Macc 1:1").osis()).toEqual("4Macc.1.1")
		;
      return true;
    });
  });

  describe("Localized book 1Macc (af)", function() {
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
    return it("should handle book: 1Macc (af)", function() {
      
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
      return expect(p.languages).toEqual(["af"]);
    });
    it("should handle ranges (af)", function() {
      expect(p.parse("Titus 1:1 tot 2").osis()).toEqual("Titus.1.1-Titus.1.2");
      expect(p.parse("Matt 1tot2").osis()).toEqual("Matt.1-Matt.2");
      return expect(p.parse("Phlm 2 TOT 3").osis()).toEqual("Phlm.1.2-Phlm.1.3");
    });
    it("should handle chapters (af)", function() {
      expect(p.parse("Titus 1:1, hoofstuk 2").osis()).toEqual("Titus.1.1,Titus.2");
      expect(p.parse("Matt 3:4 HOOFSTUK 6").osis()).toEqual("Matt.3.4,Matt.6");
      expect(p.parse("Titus 1:1, hfst. 2").osis()).toEqual("Titus.1.1,Titus.2");
      expect(p.parse("Matt 3:4 HFST. 6").osis()).toEqual("Matt.3.4,Matt.6");
      expect(p.parse("Titus 1:1, hfst 2").osis()).toEqual("Titus.1.1,Titus.2");
      return expect(p.parse("Matt 3:4 HFST 6").osis()).toEqual("Matt.3.4,Matt.6");
    });
    it("should handle verses (af)", function() {
      expect(p.parse("Exod 1:1 vers 3").osis()).toEqual("Exod.1.1,Exod.1.3");
      expect(p.parse("Phlm VERS 6").osis()).toEqual("Phlm.1.6");
      expect(p.parse("Exod 1:1 Bybelvers 3").osis()).toEqual("Exod.1.1,Exod.1.3");
      return expect(p.parse("Phlm BYBELVERS 6").osis()).toEqual("Phlm.1.6");
    });
    it("should handle 'and' (af)", function() {
      expect(p.parse("Exod 1:1 en 3").osis()).toEqual("Exod.1.1,Exod.1.3");
      expect(p.parse("Phlm 2 EN 6").osis()).toEqual("Phlm.1.2,Phlm.1.6");
      expect(p.parse("Exod 1:1 asook 3").osis()).toEqual("Exod.1.1,Exod.1.3");
      return expect(p.parse("Phlm 2 ASOOK 6").osis()).toEqual("Phlm.1.2,Phlm.1.6");
    });
    it("should handle titles (af)", function() {
      expect(p.parse("Ps 3 title, 4:2, 5:title").osis()).toEqual("Ps.3.1,Ps.4.2,Ps.5.1");
      return expect(p.parse("PS 3 TITLE, 4:2, 5:TITLE").osis()).toEqual("Ps.3.1,Ps.4.2,Ps.5.1");
    });
    it("should handle 'ff' (af)", function() {
      expect(p.parse("Rev 3ff., 4:2ff.").osis()).toEqual("Rev.3-Rev.22,Rev.4.2-Rev.4.11");
      expect(p.parse("REV 3 FF., 4:2 FF.").osis()).toEqual("Rev.3-Rev.22,Rev.4.2-Rev.4.11");
      expect(p.parse("Rev 3ff, 4:2ff").osis()).toEqual("Rev.3-Rev.22,Rev.4.2-Rev.4.11");
      return expect(p.parse("REV 3 FF, 4:2 FF").osis()).toEqual("Rev.3-Rev.22,Rev.4.2-Rev.4.11");
    });
    it("should handle translations (af)", function() {
      expect(p.parse("Lev 1 (AFR53)").osis_and_translations()).toEqual([["Lev.1", "AFR53"]]);
      expect(p.parse("lev 1 afr53").osis_and_translations()).toEqual([["Lev.1", "AFR53"]]);
      expect(p.parse("Lev 1 (AFR83)").osis_and_translations()).toEqual([["Lev.1", "AFR83"]]);
      return expect(p.parse("lev 1 afr83").osis_and_translations()).toEqual([["Lev.1", "AFR83"]]);
    });
    it("should handle book ranges (af)", function() {
      p.set_options({
        book_alone_strategy: "full",
        book_range_strategy: "include"
      });
      return expect(p.parse("1 tot 3  Joh").osis()).toEqual("1John.1-3John.1");
    });
    return it("should handle boundaries (af)", function() {
      p.set_options({
        book_alone_strategy: "full"
      });
      expect(p.parse("\u2014Matt\u2014").osis()).toEqual("Matt.1-Matt.28");
      return expect(p.parse("\u201cMatt 1:1\u201d").osis()).toEqual("Matt.1.1");
    });
  });

}).call(this);
