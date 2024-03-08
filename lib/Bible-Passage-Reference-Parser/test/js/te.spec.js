(function() {
  var bcv_parser;

  bcv_parser = require("../../js/te_bcv_parser.js").bcv_parser;

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

  describe("Localized book Gen (te)", function() {
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
    return it("should handle book: Gen (te)", function() {
      
		expect(p.parse("ఆదికాండము 1:1").osis()).toEqual("Gen.1.1")
		expect(p.parse("ఆదికాండం 1:1").osis()).toEqual("Gen.1.1")
		expect(p.parse("Gen 1:1").osis()).toEqual("Gen.1.1")
		expect(p.parse("ఆది 1:1").osis()).toEqual("Gen.1.1")
		p.include_apocrypha(false)
		expect(p.parse("ఆదికాండము 1:1").osis()).toEqual("Gen.1.1")
		expect(p.parse("ఆదికాండం 1:1").osis()).toEqual("Gen.1.1")
		expect(p.parse("GEN 1:1").osis()).toEqual("Gen.1.1")
		expect(p.parse("ఆది 1:1").osis()).toEqual("Gen.1.1")
		;
      return true;
    });
  });

  describe("Localized book Exod (te)", function() {
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
    return it("should handle book: Exod (te)", function() {
      
		expect(p.parse("నిర్గమకాండము 1:1").osis()).toEqual("Exod.1.1")
		expect(p.parse("నిర్గమకాండం 1:1").osis()).toEqual("Exod.1.1")
		expect(p.parse("నిర్గమ 1:1").osis()).toEqual("Exod.1.1")
		expect(p.parse("నిర్గ 1:1").osis()).toEqual("Exod.1.1")
		expect(p.parse("Exod 1:1").osis()).toEqual("Exod.1.1")
		p.include_apocrypha(false)
		expect(p.parse("నిర్గమకాండము 1:1").osis()).toEqual("Exod.1.1")
		expect(p.parse("నిర్గమకాండం 1:1").osis()).toEqual("Exod.1.1")
		expect(p.parse("నిర్గమ 1:1").osis()).toEqual("Exod.1.1")
		expect(p.parse("నిర్గ 1:1").osis()).toEqual("Exod.1.1")
		expect(p.parse("EXOD 1:1").osis()).toEqual("Exod.1.1")
		;
      return true;
    });
  });

  describe("Localized book Bel (te)", function() {
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
    return it("should handle book: Bel (te)", function() {
      
		expect(p.parse("Bel 1:1").osis()).toEqual("Bel.1.1")
		;
      return true;
    });
  });

  describe("Localized book Lev (te)", function() {
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
    return it("should handle book: Lev (te)", function() {
      
		expect(p.parse("లేవీయకాండము 1:1").osis()).toEqual("Lev.1.1")
		expect(p.parse("లేవీకాండం 1:1").osis()).toEqual("Lev.1.1")
		expect(p.parse("లేవి 1:1").osis()).toEqual("Lev.1.1")
		expect(p.parse("లేవీ 1:1").osis()).toEqual("Lev.1.1")
		expect(p.parse("Lev 1:1").osis()).toEqual("Lev.1.1")
		p.include_apocrypha(false)
		expect(p.parse("లేవీయకాండము 1:1").osis()).toEqual("Lev.1.1")
		expect(p.parse("లేవీకాండం 1:1").osis()).toEqual("Lev.1.1")
		expect(p.parse("లేవి 1:1").osis()).toEqual("Lev.1.1")
		expect(p.parse("లేవీ 1:1").osis()).toEqual("Lev.1.1")
		expect(p.parse("LEV 1:1").osis()).toEqual("Lev.1.1")
		;
      return true;
    });
  });

  describe("Localized book Num (te)", function() {
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
    return it("should handle book: Num (te)", function() {
      
		expect(p.parse("సంఖ్యాకాండము 1:1").osis()).toEqual("Num.1.1")
		expect(p.parse("సంఖ్యాకాండం 1:1").osis()).toEqual("Num.1.1")
		expect(p.parse("సంఖ్యా 1:1").osis()).toEqual("Num.1.1")
		expect(p.parse("Num 1:1").osis()).toEqual("Num.1.1")
		p.include_apocrypha(false)
		expect(p.parse("సంఖ్యాకాండము 1:1").osis()).toEqual("Num.1.1")
		expect(p.parse("సంఖ్యాకాండం 1:1").osis()).toEqual("Num.1.1")
		expect(p.parse("సంఖ్యా 1:1").osis()).toEqual("Num.1.1")
		expect(p.parse("NUM 1:1").osis()).toEqual("Num.1.1")
		;
      return true;
    });
  });

  describe("Localized book Sir (te)", function() {
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
    return it("should handle book: Sir (te)", function() {
      
		expect(p.parse("Sir 1:1").osis()).toEqual("Sir.1.1")
		;
      return true;
    });
  });

  describe("Localized book Wis (te)", function() {
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
    return it("should handle book: Wis (te)", function() {
      
		expect(p.parse("Wis 1:1").osis()).toEqual("Wis.1.1")
		;
      return true;
    });
  });

  describe("Localized book Lam (te)", function() {
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
    return it("should handle book: Lam (te)", function() {
      
		expect(p.parse("విలాపవాక్యములు 1:1").osis()).toEqual("Lam.1.1")
		expect(p.parse("విలాపవాక్యాలు 1:1").osis()).toEqual("Lam.1.1")
		expect(p.parse("విలాప 1:1").osis()).toEqual("Lam.1.1")
		expect(p.parse("Lam 1:1").osis()).toEqual("Lam.1.1")
		p.include_apocrypha(false)
		expect(p.parse("విలాపవాక్యములు 1:1").osis()).toEqual("Lam.1.1")
		expect(p.parse("విలాపవాక్యాలు 1:1").osis()).toEqual("Lam.1.1")
		expect(p.parse("విలాప 1:1").osis()).toEqual("Lam.1.1")
		expect(p.parse("LAM 1:1").osis()).toEqual("Lam.1.1")
		;
      return true;
    });
  });

  describe("Localized book EpJer (te)", function() {
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
    return it("should handle book: EpJer (te)", function() {
      
		expect(p.parse("EpJer 1:1").osis()).toEqual("EpJer.1.1")
		;
      return true;
    });
  });

  describe("Localized book Rev (te)", function() {
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
    return it("should handle book: Rev (te)", function() {
      
		expect(p.parse("యోహాను రాసిన ప్రకటన గ్రంథం 1:1").osis()).toEqual("Rev.1.1")
		expect(p.parse("ప్రకటన గ్రంథం 1:1").osis()).toEqual("Rev.1.1")
		expect(p.parse("ప్రకటన 1:1").osis()).toEqual("Rev.1.1")
		expect(p.parse("ప్రక 1:1").osis()).toEqual("Rev.1.1")
		expect(p.parse("Rev 1:1").osis()).toEqual("Rev.1.1")
		p.include_apocrypha(false)
		expect(p.parse("యోహాను రాసిన ప్రకటన గ్రంథం 1:1").osis()).toEqual("Rev.1.1")
		expect(p.parse("ప్రకటన గ్రంథం 1:1").osis()).toEqual("Rev.1.1")
		expect(p.parse("ప్రకటన 1:1").osis()).toEqual("Rev.1.1")
		expect(p.parse("ప్రక 1:1").osis()).toEqual("Rev.1.1")
		expect(p.parse("REV 1:1").osis()).toEqual("Rev.1.1")
		;
      return true;
    });
  });

  describe("Localized book PrMan (te)", function() {
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
    return it("should handle book: PrMan (te)", function() {
      
		expect(p.parse("PrMan 1:1").osis()).toEqual("PrMan.1.1")
		;
      return true;
    });
  });

  describe("Localized book Deut (te)", function() {
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
    return it("should handle book: Deut (te)", function() {
      
		expect(p.parse("ద్వితీయోపదేశ కాండము 1:1").osis()).toEqual("Deut.1.1")
		expect(p.parse("ద్వితీయోపదేశకాండము 1:1").osis()).toEqual("Deut.1.1")
		expect(p.parse("ద్వితి 1:1").osis()).toEqual("Deut.1.1")
		expect(p.parse("ద్వితీ 1:1").osis()).toEqual("Deut.1.1")
		expect(p.parse("Deut 1:1").osis()).toEqual("Deut.1.1")
		p.include_apocrypha(false)
		expect(p.parse("ద్వితీయోపదేశ కాండము 1:1").osis()).toEqual("Deut.1.1")
		expect(p.parse("ద్వితీయోపదేశకాండము 1:1").osis()).toEqual("Deut.1.1")
		expect(p.parse("ద్వితి 1:1").osis()).toEqual("Deut.1.1")
		expect(p.parse("ద్వితీ 1:1").osis()).toEqual("Deut.1.1")
		expect(p.parse("DEUT 1:1").osis()).toEqual("Deut.1.1")
		;
      return true;
    });
  });

  describe("Localized book Josh (te)", function() {
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
    return it("should handle book: Josh (te)", function() {
      
		expect(p.parse("యెహోషువ 1:1").osis()).toEqual("Josh.1.1")
		expect(p.parse("Josh 1:1").osis()).toEqual("Josh.1.1")
		expect(p.parse("యెహో 1:1").osis()).toEqual("Josh.1.1")
		p.include_apocrypha(false)
		expect(p.parse("యెహోషువ 1:1").osis()).toEqual("Josh.1.1")
		expect(p.parse("JOSH 1:1").osis()).toEqual("Josh.1.1")
		expect(p.parse("యెహో 1:1").osis()).toEqual("Josh.1.1")
		;
      return true;
    });
  });

  describe("Localized book Judg (te)", function() {
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
    return it("should handle book: Judg (te)", function() {
      
		expect(p.parse("న్యాయాధిపతులు 1:1").osis()).toEqual("Judg.1.1")
		expect(p.parse("న్యాయాధి 1:1").osis()).toEqual("Judg.1.1")
		expect(p.parse("న్యాయా 1:1").osis()).toEqual("Judg.1.1")
		expect(p.parse("Judg 1:1").osis()).toEqual("Judg.1.1")
		p.include_apocrypha(false)
		expect(p.parse("న్యాయాధిపతులు 1:1").osis()).toEqual("Judg.1.1")
		expect(p.parse("న్యాయాధి 1:1").osis()).toEqual("Judg.1.1")
		expect(p.parse("న్యాయా 1:1").osis()).toEqual("Judg.1.1")
		expect(p.parse("JUDG 1:1").osis()).toEqual("Judg.1.1")
		;
      return true;
    });
  });

  describe("Localized book Ruth (te)", function() {
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
    return it("should handle book: Ruth (te)", function() {
      
		expect(p.parse("Ruth 1:1").osis()).toEqual("Ruth.1.1")
		expect(p.parse("రూతు 1:1").osis()).toEqual("Ruth.1.1")
		p.include_apocrypha(false)
		expect(p.parse("RUTH 1:1").osis()).toEqual("Ruth.1.1")
		expect(p.parse("రూతు 1:1").osis()).toEqual("Ruth.1.1")
		;
      return true;
    });
  });

  describe("Localized book 1Esd (te)", function() {
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
    return it("should handle book: 1Esd (te)", function() {
      
		expect(p.parse("1Esd 1:1").osis()).toEqual("1Esd.1.1")
		;
      return true;
    });
  });

  describe("Localized book 2Esd (te)", function() {
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
    return it("should handle book: 2Esd (te)", function() {
      
		expect(p.parse("2Esd 1:1").osis()).toEqual("2Esd.1.1")
		;
      return true;
    });
  });

  describe("Localized book Isa (te)", function() {
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
    return it("should handle book: Isa (te)", function() {
      
		expect(p.parse("యెషయా 1:1").osis()).toEqual("Isa.1.1")
		expect(p.parse("Isa 1:1").osis()).toEqual("Isa.1.1")
		expect(p.parse("యెష 1:1").osis()).toEqual("Isa.1.1")
		p.include_apocrypha(false)
		expect(p.parse("యెషయా 1:1").osis()).toEqual("Isa.1.1")
		expect(p.parse("ISA 1:1").osis()).toEqual("Isa.1.1")
		expect(p.parse("యెష 1:1").osis()).toEqual("Isa.1.1")
		;
      return true;
    });
  });

  describe("Localized book 2Sam (te)", function() {
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
    return it("should handle book: 2Sam (te)", function() {
      
		expect(p.parse("2 సమూయేలు 1:1").osis()).toEqual("2Sam.1.1")
		expect(p.parse("2 సమూ 1:1").osis()).toEqual("2Sam.1.1")
		expect(p.parse("2Sam 1:1").osis()).toEqual("2Sam.1.1")
		expect(p.parse("2సమూ 1:1").osis()).toEqual("2Sam.1.1")
		p.include_apocrypha(false)
		expect(p.parse("2 సమూయేలు 1:1").osis()).toEqual("2Sam.1.1")
		expect(p.parse("2 సమూ 1:1").osis()).toEqual("2Sam.1.1")
		expect(p.parse("2SAM 1:1").osis()).toEqual("2Sam.1.1")
		expect(p.parse("2సమూ 1:1").osis()).toEqual("2Sam.1.1")
		;
      return true;
    });
  });

  describe("Localized book 1Sam (te)", function() {
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
    return it("should handle book: 1Sam (te)", function() {
      
		expect(p.parse("1 సమూయేలు 1:1").osis()).toEqual("1Sam.1.1")
		expect(p.parse("1 సమూ 1:1").osis()).toEqual("1Sam.1.1")
		expect(p.parse("1Sam 1:1").osis()).toEqual("1Sam.1.1")
		expect(p.parse("1సమూ 1:1").osis()).toEqual("1Sam.1.1")
		p.include_apocrypha(false)
		expect(p.parse("1 సమూయేలు 1:1").osis()).toEqual("1Sam.1.1")
		expect(p.parse("1 సమూ 1:1").osis()).toEqual("1Sam.1.1")
		expect(p.parse("1SAM 1:1").osis()).toEqual("1Sam.1.1")
		expect(p.parse("1సమూ 1:1").osis()).toEqual("1Sam.1.1")
		;
      return true;
    });
  });

  describe("Localized book 2Kgs (te)", function() {
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
    return it("should handle book: 2Kgs (te)", function() {
      
		expect(p.parse("2 రాజులు 1:1").osis()).toEqual("2Kgs.1.1")
		expect(p.parse("2రాజులు 1:1").osis()).toEqual("2Kgs.1.1")
		expect(p.parse("2Kgs 1:1").osis()).toEqual("2Kgs.1.1")
		p.include_apocrypha(false)
		expect(p.parse("2 రాజులు 1:1").osis()).toEqual("2Kgs.1.1")
		expect(p.parse("2రాజులు 1:1").osis()).toEqual("2Kgs.1.1")
		expect(p.parse("2KGS 1:1").osis()).toEqual("2Kgs.1.1")
		;
      return true;
    });
  });

  describe("Localized book 1Kgs (te)", function() {
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
    return it("should handle book: 1Kgs (te)", function() {
      
		expect(p.parse("1 రాజులు 1:1").osis()).toEqual("1Kgs.1.1")
		expect(p.parse("1రాజులు 1:1").osis()).toEqual("1Kgs.1.1")
		expect(p.parse("1Kgs 1:1").osis()).toEqual("1Kgs.1.1")
		p.include_apocrypha(false)
		expect(p.parse("1 రాజులు 1:1").osis()).toEqual("1Kgs.1.1")
		expect(p.parse("1రాజులు 1:1").osis()).toEqual("1Kgs.1.1")
		expect(p.parse("1KGS 1:1").osis()).toEqual("1Kgs.1.1")
		;
      return true;
    });
  });

  describe("Localized book 2Chr (te)", function() {
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
    return it("should handle book: 2Chr (te)", function() {
      
		expect(p.parse("2 దినవృత్తాంతములు 1:1").osis()).toEqual("2Chr.1.1")
		expect(p.parse("2 దినవృత్తాంతాలు 1:1").osis()).toEqual("2Chr.1.1")
		expect(p.parse("2దినవృత్తా 1:1").osis()).toEqual("2Chr.1.1")
		expect(p.parse("2 దిన 1:1").osis()).toEqual("2Chr.1.1")
		expect(p.parse("2Chr 1:1").osis()).toEqual("2Chr.1.1")
		expect(p.parse("2దిన 1:1").osis()).toEqual("2Chr.1.1")
		p.include_apocrypha(false)
		expect(p.parse("2 దినవృత్తాంతములు 1:1").osis()).toEqual("2Chr.1.1")
		expect(p.parse("2 దినవృత్తాంతాలు 1:1").osis()).toEqual("2Chr.1.1")
		expect(p.parse("2దినవృత్తా 1:1").osis()).toEqual("2Chr.1.1")
		expect(p.parse("2 దిన 1:1").osis()).toEqual("2Chr.1.1")
		expect(p.parse("2CHR 1:1").osis()).toEqual("2Chr.1.1")
		expect(p.parse("2దిన 1:1").osis()).toEqual("2Chr.1.1")
		;
      return true;
    });
  });

  describe("Localized book 1Chr (te)", function() {
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
    return it("should handle book: 1Chr (te)", function() {
      
		expect(p.parse("1 దినవృత్తాంతములు 1:1").osis()).toEqual("1Chr.1.1")
		expect(p.parse("1 దినవృత్తాంతాలు 1:1").osis()).toEqual("1Chr.1.1")
		expect(p.parse("1దినవృత్తా 1:1").osis()).toEqual("1Chr.1.1")
		expect(p.parse("1 దిన 1:1").osis()).toEqual("1Chr.1.1")
		expect(p.parse("1Chr 1:1").osis()).toEqual("1Chr.1.1")
		expect(p.parse("1దిన 1:1").osis()).toEqual("1Chr.1.1")
		p.include_apocrypha(false)
		expect(p.parse("1 దినవృత్తాంతములు 1:1").osis()).toEqual("1Chr.1.1")
		expect(p.parse("1 దినవృత్తాంతాలు 1:1").osis()).toEqual("1Chr.1.1")
		expect(p.parse("1దినవృత్తా 1:1").osis()).toEqual("1Chr.1.1")
		expect(p.parse("1 దిన 1:1").osis()).toEqual("1Chr.1.1")
		expect(p.parse("1CHR 1:1").osis()).toEqual("1Chr.1.1")
		expect(p.parse("1దిన 1:1").osis()).toEqual("1Chr.1.1")
		;
      return true;
    });
  });

  describe("Localized book Ezra (te)", function() {
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
    return it("should handle book: Ezra (te)", function() {
      
		expect(p.parse("ఎజ్రా 1:1").osis()).toEqual("Ezra.1.1")
		expect(p.parse("Ezra 1:1").osis()).toEqual("Ezra.1.1")
		p.include_apocrypha(false)
		expect(p.parse("ఎజ్రా 1:1").osis()).toEqual("Ezra.1.1")
		expect(p.parse("EZRA 1:1").osis()).toEqual("Ezra.1.1")
		;
      return true;
    });
  });

  describe("Localized book Neh (te)", function() {
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
    return it("should handle book: Neh (te)", function() {
      
		expect(p.parse("నెహెమ్యా 1:1").osis()).toEqual("Neh.1.1")
		expect(p.parse("నెహె 1:1").osis()).toEqual("Neh.1.1")
		expect(p.parse("Neh 1:1").osis()).toEqual("Neh.1.1")
		p.include_apocrypha(false)
		expect(p.parse("నెహెమ్యా 1:1").osis()).toEqual("Neh.1.1")
		expect(p.parse("నెహె 1:1").osis()).toEqual("Neh.1.1")
		expect(p.parse("NEH 1:1").osis()).toEqual("Neh.1.1")
		;
      return true;
    });
  });

  describe("Localized book GkEsth (te)", function() {
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
    return it("should handle book: GkEsth (te)", function() {
      
		expect(p.parse("GkEsth 1:1").osis()).toEqual("GkEsth.1.1")
		;
      return true;
    });
  });

  describe("Localized book Esth (te)", function() {
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
    return it("should handle book: Esth (te)", function() {
      
		expect(p.parse("ఎస్తేరు 1:1").osis()).toEqual("Esth.1.1")
		expect(p.parse("ఎస్తే 1:1").osis()).toEqual("Esth.1.1")
		expect(p.parse("Esth 1:1").osis()).toEqual("Esth.1.1")
		p.include_apocrypha(false)
		expect(p.parse("ఎస్తేరు 1:1").osis()).toEqual("Esth.1.1")
		expect(p.parse("ఎస్తే 1:1").osis()).toEqual("Esth.1.1")
		expect(p.parse("ESTH 1:1").osis()).toEqual("Esth.1.1")
		;
      return true;
    });
  });

  describe("Localized book Job (te)", function() {
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
    return it("should handle book: Job (te)", function() {
      
		expect(p.parse("యోబు 1:1").osis()).toEqual("Job.1.1")
		expect(p.parse("Job 1:1").osis()).toEqual("Job.1.1")
		p.include_apocrypha(false)
		expect(p.parse("యోబు 1:1").osis()).toEqual("Job.1.1")
		expect(p.parse("JOB 1:1").osis()).toEqual("Job.1.1")
		;
      return true;
    });
  });

  describe("Localized book Ps (te)", function() {
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
    return it("should handle book: Ps (te)", function() {
      
		expect(p.parse("కీర్తనలు 1:1").osis()).toEqual("Ps.1.1")
		expect(p.parse("కీర్తన 1:1").osis()).toEqual("Ps.1.1")
		expect(p.parse("కీర్త 1:1").osis()).toEqual("Ps.1.1")
		expect(p.parse("Ps 1:1").osis()).toEqual("Ps.1.1")
		p.include_apocrypha(false)
		expect(p.parse("కీర్తనలు 1:1").osis()).toEqual("Ps.1.1")
		expect(p.parse("కీర్తన 1:1").osis()).toEqual("Ps.1.1")
		expect(p.parse("కీర్త 1:1").osis()).toEqual("Ps.1.1")
		expect(p.parse("PS 1:1").osis()).toEqual("Ps.1.1")
		;
      return true;
    });
  });

  describe("Localized book PrAzar (te)", function() {
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
    return it("should handle book: PrAzar (te)", function() {
      
		expect(p.parse("PrAzar 1:1").osis()).toEqual("PrAzar.1.1")
		;
      return true;
    });
  });

  describe("Localized book Prov (te)", function() {
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
    return it("should handle book: Prov (te)", function() {
      
		expect(p.parse("సామెతలు 1:1").osis()).toEqual("Prov.1.1")
		expect(p.parse("సామెత 1:1").osis()).toEqual("Prov.1.1")
		expect(p.parse("Prov 1:1").osis()).toEqual("Prov.1.1")
		expect(p.parse("సామె 1:1").osis()).toEqual("Prov.1.1")
		p.include_apocrypha(false)
		expect(p.parse("సామెతలు 1:1").osis()).toEqual("Prov.1.1")
		expect(p.parse("సామెత 1:1").osis()).toEqual("Prov.1.1")
		expect(p.parse("PROV 1:1").osis()).toEqual("Prov.1.1")
		expect(p.parse("సామె 1:1").osis()).toEqual("Prov.1.1")
		;
      return true;
    });
  });

  describe("Localized book Eccl (te)", function() {
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
    return it("should handle book: Eccl (te)", function() {
      
		expect(p.parse("ప్రసంగి 1:1").osis()).toEqual("Eccl.1.1")
		expect(p.parse("Eccl 1:1").osis()).toEqual("Eccl.1.1")
		expect(p.parse("ప్రస 1:1").osis()).toEqual("Eccl.1.1")
		p.include_apocrypha(false)
		expect(p.parse("ప్రసంగి 1:1").osis()).toEqual("Eccl.1.1")
		expect(p.parse("ECCL 1:1").osis()).toEqual("Eccl.1.1")
		expect(p.parse("ప్రస 1:1").osis()).toEqual("Eccl.1.1")
		;
      return true;
    });
  });

  describe("Localized book SgThree (te)", function() {
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
    return it("should handle book: SgThree (te)", function() {
      
		expect(p.parse("SgThree 1:1").osis()).toEqual("SgThree.1.1")
		;
      return true;
    });
  });

  describe("Localized book Song (te)", function() {
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
    return it("should handle book: Song (te)", function() {
      
		expect(p.parse("పరమగీతము 1:1").osis()).toEqual("Song.1.1")
		expect(p.parse("పరమగీతం 1:1").osis()).toEqual("Song.1.1")
		expect(p.parse("Song 1:1").osis()).toEqual("Song.1.1")
		expect(p.parse("పరమ 1:1").osis()).toEqual("Song.1.1")
		p.include_apocrypha(false)
		expect(p.parse("పరమగీతము 1:1").osis()).toEqual("Song.1.1")
		expect(p.parse("పరమగీతం 1:1").osis()).toEqual("Song.1.1")
		expect(p.parse("SONG 1:1").osis()).toEqual("Song.1.1")
		expect(p.parse("పరమ 1:1").osis()).toEqual("Song.1.1")
		;
      return true;
    });
  });

  describe("Localized book Jer (te)", function() {
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
    return it("should handle book: Jer (te)", function() {
      
		expect(p.parse("యిర్మియా 1:1").osis()).toEqual("Jer.1.1")
		expect(p.parse("యిర్మీయా 1:1").osis()).toEqual("Jer.1.1")
		expect(p.parse("యిర్మి 1:1").osis()).toEqual("Jer.1.1")
		expect(p.parse("యిర్మీ 1:1").osis()).toEqual("Jer.1.1")
		expect(p.parse("Jer 1:1").osis()).toEqual("Jer.1.1")
		p.include_apocrypha(false)
		expect(p.parse("యిర్మియా 1:1").osis()).toEqual("Jer.1.1")
		expect(p.parse("యిర్మీయా 1:1").osis()).toEqual("Jer.1.1")
		expect(p.parse("యిర్మి 1:1").osis()).toEqual("Jer.1.1")
		expect(p.parse("యిర్మీ 1:1").osis()).toEqual("Jer.1.1")
		expect(p.parse("JER 1:1").osis()).toEqual("Jer.1.1")
		;
      return true;
    });
  });

  describe("Localized book Ezek (te)", function() {
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
    return it("should handle book: Ezek (te)", function() {
      
		expect(p.parse("యెహెజ్కేలు 1:1").osis()).toEqual("Ezek.1.1")
		expect(p.parse("Ezek 1:1").osis()).toEqual("Ezek.1.1")
		expect(p.parse("యెహె 1:1").osis()).toEqual("Ezek.1.1")
		p.include_apocrypha(false)
		expect(p.parse("యెహెజ్కేలు 1:1").osis()).toEqual("Ezek.1.1")
		expect(p.parse("EZEK 1:1").osis()).toEqual("Ezek.1.1")
		expect(p.parse("యెహె 1:1").osis()).toEqual("Ezek.1.1")
		;
      return true;
    });
  });

  describe("Localized book Dan (te)", function() {
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
    return it("should handle book: Dan (te)", function() {
      
		expect(p.parse("దానియేలు 1:1").osis()).toEqual("Dan.1.1")
		expect(p.parse("దాని 1:1").osis()).toEqual("Dan.1.1")
		expect(p.parse("Dan 1:1").osis()).toEqual("Dan.1.1")
		p.include_apocrypha(false)
		expect(p.parse("దానియేలు 1:1").osis()).toEqual("Dan.1.1")
		expect(p.parse("దాని 1:1").osis()).toEqual("Dan.1.1")
		expect(p.parse("DAN 1:1").osis()).toEqual("Dan.1.1")
		;
      return true;
    });
  });

  describe("Localized book Hos (te)", function() {
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
    return it("should handle book: Hos (te)", function() {
      
		expect(p.parse("హోషేయ 1:1").osis()).toEqual("Hos.1.1")
		expect(p.parse("హోషే 1:1").osis()).toEqual("Hos.1.1")
		expect(p.parse("Hos 1:1").osis()).toEqual("Hos.1.1")
		p.include_apocrypha(false)
		expect(p.parse("హోషేయ 1:1").osis()).toEqual("Hos.1.1")
		expect(p.parse("హోషే 1:1").osis()).toEqual("Hos.1.1")
		expect(p.parse("HOS 1:1").osis()).toEqual("Hos.1.1")
		;
      return true;
    });
  });

  describe("Localized book Joel (te)", function() {
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
    return it("should handle book: Joel (te)", function() {
      
		expect(p.parse("యోవేలు 1:1").osis()).toEqual("Joel.1.1")
		expect(p.parse("Joel 1:1").osis()).toEqual("Joel.1.1")
		expect(p.parse("యోవే 1:1").osis()).toEqual("Joel.1.1")
		p.include_apocrypha(false)
		expect(p.parse("యోవేలు 1:1").osis()).toEqual("Joel.1.1")
		expect(p.parse("JOEL 1:1").osis()).toEqual("Joel.1.1")
		expect(p.parse("యోవే 1:1").osis()).toEqual("Joel.1.1")
		;
      return true;
    });
  });

  describe("Localized book Amos (te)", function() {
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
    return it("should handle book: Amos (te)", function() {
      
		expect(p.parse("ఆమోసు 1:1").osis()).toEqual("Amos.1.1")
		expect(p.parse("Amos 1:1").osis()).toEqual("Amos.1.1")
		expect(p.parse("ఆమో 1:1").osis()).toEqual("Amos.1.1")
		p.include_apocrypha(false)
		expect(p.parse("ఆమోసు 1:1").osis()).toEqual("Amos.1.1")
		expect(p.parse("AMOS 1:1").osis()).toEqual("Amos.1.1")
		expect(p.parse("ఆమో 1:1").osis()).toEqual("Amos.1.1")
		;
      return true;
    });
  });

  describe("Localized book Obad (te)", function() {
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
    return it("should handle book: Obad (te)", function() {
      
		expect(p.parse("ఓబద్యా 1:1").osis()).toEqual("Obad.1.1")
		expect(p.parse("Obad 1:1").osis()).toEqual("Obad.1.1")
		p.include_apocrypha(false)
		expect(p.parse("ఓబద్యా 1:1").osis()).toEqual("Obad.1.1")
		expect(p.parse("OBAD 1:1").osis()).toEqual("Obad.1.1")
		;
      return true;
    });
  });

  describe("Localized book Jonah (te)", function() {
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
    return it("should handle book: Jonah (te)", function() {
      
		expect(p.parse("Jonah 1:1").osis()).toEqual("Jonah.1.1")
		expect(p.parse("యోనా 1:1").osis()).toEqual("Jonah.1.1")
		p.include_apocrypha(false)
		expect(p.parse("JONAH 1:1").osis()).toEqual("Jonah.1.1")
		expect(p.parse("యోనా 1:1").osis()).toEqual("Jonah.1.1")
		;
      return true;
    });
  });

  describe("Localized book Mic (te)", function() {
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
    return it("should handle book: Mic (te)", function() {
      
		expect(p.parse("మీకా 1:1").osis()).toEqual("Mic.1.1")
		expect(p.parse("Mic 1:1").osis()).toEqual("Mic.1.1")
		p.include_apocrypha(false)
		expect(p.parse("మీకా 1:1").osis()).toEqual("Mic.1.1")
		expect(p.parse("MIC 1:1").osis()).toEqual("Mic.1.1")
		;
      return true;
    });
  });

  describe("Localized book Nah (te)", function() {
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
    return it("should handle book: Nah (te)", function() {
      
		expect(p.parse("నహూము 1:1").osis()).toEqual("Nah.1.1")
		expect(p.parse("Nah 1:1").osis()).toEqual("Nah.1.1")
		expect(p.parse("నహూ 1:1").osis()).toEqual("Nah.1.1")
		p.include_apocrypha(false)
		expect(p.parse("నహూము 1:1").osis()).toEqual("Nah.1.1")
		expect(p.parse("NAH 1:1").osis()).toEqual("Nah.1.1")
		expect(p.parse("నహూ 1:1").osis()).toEqual("Nah.1.1")
		;
      return true;
    });
  });

  describe("Localized book Hab (te)", function() {
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
    return it("should handle book: Hab (te)", function() {
      
		expect(p.parse("హబక్కూకు 1:1").osis()).toEqual("Hab.1.1")
		expect(p.parse("Hab 1:1").osis()).toEqual("Hab.1.1")
		expect(p.parse("హబ 1:1").osis()).toEqual("Hab.1.1")
		p.include_apocrypha(false)
		expect(p.parse("హబక్కూకు 1:1").osis()).toEqual("Hab.1.1")
		expect(p.parse("HAB 1:1").osis()).toEqual("Hab.1.1")
		expect(p.parse("హబ 1:1").osis()).toEqual("Hab.1.1")
		;
      return true;
    });
  });

  describe("Localized book Zeph (te)", function() {
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
    return it("should handle book: Zeph (te)", function() {
      
		expect(p.parse("జెఫన్యా 1:1").osis()).toEqual("Zeph.1.1")
		expect(p.parse("Zeph 1:1").osis()).toEqual("Zeph.1.1")
		expect(p.parse("జెఫ 1:1").osis()).toEqual("Zeph.1.1")
		p.include_apocrypha(false)
		expect(p.parse("జెఫన్యా 1:1").osis()).toEqual("Zeph.1.1")
		expect(p.parse("ZEPH 1:1").osis()).toEqual("Zeph.1.1")
		expect(p.parse("జెఫ 1:1").osis()).toEqual("Zeph.1.1")
		;
      return true;
    });
  });

  describe("Localized book Hag (te)", function() {
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
    return it("should handle book: Hag (te)", function() {
      
		expect(p.parse("హగ్గయి 1:1").osis()).toEqual("Hag.1.1")
		expect(p.parse("హగ్గ 1:1").osis()).toEqual("Hag.1.1")
		expect(p.parse("Hag 1:1").osis()).toEqual("Hag.1.1")
		p.include_apocrypha(false)
		expect(p.parse("హగ్గయి 1:1").osis()).toEqual("Hag.1.1")
		expect(p.parse("హగ్గ 1:1").osis()).toEqual("Hag.1.1")
		expect(p.parse("HAG 1:1").osis()).toEqual("Hag.1.1")
		;
      return true;
    });
  });

  describe("Localized book Zech (te)", function() {
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
    return it("should handle book: Zech (te)", function() {
      
		expect(p.parse("జెకర్యా 1:1").osis()).toEqual("Zech.1.1")
		expect(p.parse("Zech 1:1").osis()).toEqual("Zech.1.1")
		expect(p.parse("జెక 1:1").osis()).toEqual("Zech.1.1")
		p.include_apocrypha(false)
		expect(p.parse("జెకర్యా 1:1").osis()).toEqual("Zech.1.1")
		expect(p.parse("ZECH 1:1").osis()).toEqual("Zech.1.1")
		expect(p.parse("జెక 1:1").osis()).toEqual("Zech.1.1")
		;
      return true;
    });
  });

  describe("Localized book Mal (te)", function() {
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
    return it("should handle book: Mal (te)", function() {
      
		expect(p.parse("మలాకి 1:1").osis()).toEqual("Mal.1.1")
		expect(p.parse("మలాకీ 1:1").osis()).toEqual("Mal.1.1")
		expect(p.parse("Mal 1:1").osis()).toEqual("Mal.1.1")
		expect(p.parse("మలా 1:1").osis()).toEqual("Mal.1.1")
		p.include_apocrypha(false)
		expect(p.parse("మలాకి 1:1").osis()).toEqual("Mal.1.1")
		expect(p.parse("మలాకీ 1:1").osis()).toEqual("Mal.1.1")
		expect(p.parse("MAL 1:1").osis()).toEqual("Mal.1.1")
		expect(p.parse("మలా 1:1").osis()).toEqual("Mal.1.1")
		;
      return true;
    });
  });

  describe("Localized book Matt (te)", function() {
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
    return it("should handle book: Matt (te)", function() {
      
		expect(p.parse("మత్తయి రాసిన సువార్త 1:1").osis()).toEqual("Matt.1.1")
		expect(p.parse("మత్తయి 1:1").osis()).toEqual("Matt.1.1")
		expect(p.parse("Matt 1:1").osis()).toEqual("Matt.1.1")
		expect(p.parse("మత్త 1:1").osis()).toEqual("Matt.1.1")
		p.include_apocrypha(false)
		expect(p.parse("మత్తయి రాసిన సువార్త 1:1").osis()).toEqual("Matt.1.1")
		expect(p.parse("మత్తయి 1:1").osis()).toEqual("Matt.1.1")
		expect(p.parse("MATT 1:1").osis()).toEqual("Matt.1.1")
		expect(p.parse("మత్త 1:1").osis()).toEqual("Matt.1.1")
		;
      return true;
    });
  });

  describe("Localized book Mark (te)", function() {
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
    return it("should handle book: Mark (te)", function() {
      
		expect(p.parse("మార్కు రాసిన సువార్త 1:1").osis()).toEqual("Mark.1.1")
		expect(p.parse("మార్కు 1:1").osis()).toEqual("Mark.1.1")
		expect(p.parse("Mark 1:1").osis()).toEqual("Mark.1.1")
		p.include_apocrypha(false)
		expect(p.parse("మార్కు రాసిన సువార్త 1:1").osis()).toEqual("Mark.1.1")
		expect(p.parse("మార్కు 1:1").osis()).toEqual("Mark.1.1")
		expect(p.parse("MARK 1:1").osis()).toEqual("Mark.1.1")
		;
      return true;
    });
  });

  describe("Localized book Luke (te)", function() {
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
    return it("should handle book: Luke (te)", function() {
      
		expect(p.parse("లూకా రాసిన సువార్త 1:1").osis()).toEqual("Luke.1.1")
		expect(p.parse("Luke 1:1").osis()).toEqual("Luke.1.1")
		expect(p.parse("లూకా 1:1").osis()).toEqual("Luke.1.1")
		p.include_apocrypha(false)
		expect(p.parse("లూకా రాసిన సువార్త 1:1").osis()).toEqual("Luke.1.1")
		expect(p.parse("LUKE 1:1").osis()).toEqual("Luke.1.1")
		expect(p.parse("లూకా 1:1").osis()).toEqual("Luke.1.1")
		;
      return true;
    });
  });

  describe("Localized book 1John (te)", function() {
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
    return it("should handle book: 1John (te)", function() {
      
		expect(p.parse("యోహాను రాసిన మొదటి పత్రిక 1:1").osis()).toEqual("1John.1.1")
		expect(p.parse("1 యోహాను పత్రిక 1:1").osis()).toEqual("1John.1.1")
		expect(p.parse("1 యోహాను 1:1").osis()).toEqual("1John.1.1")
		expect(p.parse("1John 1:1").osis()).toEqual("1John.1.1")
		expect(p.parse("1యోహా 1:1").osis()).toEqual("1John.1.1")
		p.include_apocrypha(false)
		expect(p.parse("యోహాను రాసిన మొదటి పత్రిక 1:1").osis()).toEqual("1John.1.1")
		expect(p.parse("1 యోహాను పత్రిక 1:1").osis()).toEqual("1John.1.1")
		expect(p.parse("1 యోహాను 1:1").osis()).toEqual("1John.1.1")
		expect(p.parse("1JOHN 1:1").osis()).toEqual("1John.1.1")
		expect(p.parse("1యోహా 1:1").osis()).toEqual("1John.1.1")
		;
      return true;
    });
  });

  describe("Localized book 2John (te)", function() {
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
    return it("should handle book: 2John (te)", function() {
      
		expect(p.parse("యోహాను రాసిన రెండవ పత్రిక 1:1").osis()).toEqual("2John.1.1")
		expect(p.parse("2 యోహాను పత్రిక 1:1").osis()).toEqual("2John.1.1")
		expect(p.parse("2 యోహాను 1:1").osis()).toEqual("2John.1.1")
		expect(p.parse("2John 1:1").osis()).toEqual("2John.1.1")
		expect(p.parse("2యోహా 1:1").osis()).toEqual("2John.1.1")
		p.include_apocrypha(false)
		expect(p.parse("యోహాను రాసిన రెండవ పత్రిక 1:1").osis()).toEqual("2John.1.1")
		expect(p.parse("2 యోహాను పత్రిక 1:1").osis()).toEqual("2John.1.1")
		expect(p.parse("2 యోహాను 1:1").osis()).toEqual("2John.1.1")
		expect(p.parse("2JOHN 1:1").osis()).toEqual("2John.1.1")
		expect(p.parse("2యోహా 1:1").osis()).toEqual("2John.1.1")
		;
      return true;
    });
  });

  describe("Localized book 3John (te)", function() {
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
    return it("should handle book: 3John (te)", function() {
      
		expect(p.parse("యోహాను రాసిన మూడవ పత్రిక 1:1").osis()).toEqual("3John.1.1")
		expect(p.parse("3 యోహాను పత్రిక 1:1").osis()).toEqual("3John.1.1")
		expect(p.parse("3 యోహాను 1:1").osis()).toEqual("3John.1.1")
		expect(p.parse("3John 1:1").osis()).toEqual("3John.1.1")
		expect(p.parse("3యోహా 1:1").osis()).toEqual("3John.1.1")
		p.include_apocrypha(false)
		expect(p.parse("యోహాను రాసిన మూడవ పత్రిక 1:1").osis()).toEqual("3John.1.1")
		expect(p.parse("3 యోహాను పత్రిక 1:1").osis()).toEqual("3John.1.1")
		expect(p.parse("3 యోహాను 1:1").osis()).toEqual("3John.1.1")
		expect(p.parse("3JOHN 1:1").osis()).toEqual("3John.1.1")
		expect(p.parse("3యోహా 1:1").osis()).toEqual("3John.1.1")
		;
      return true;
    });
  });

  describe("Localized book John (te)", function() {
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
    return it("should handle book: John (te)", function() {
      
		expect(p.parse("యోహాను రాసిన సువార్త 1:1").osis()).toEqual("John.1.1")
		expect(p.parse("యోహాను 1:1").osis()).toEqual("John.1.1")
		expect(p.parse("John 1:1").osis()).toEqual("John.1.1")
		expect(p.parse("యోహా 1:1").osis()).toEqual("John.1.1")
		p.include_apocrypha(false)
		expect(p.parse("యోహాను రాసిన సువార్త 1:1").osis()).toEqual("John.1.1")
		expect(p.parse("యోహాను 1:1").osis()).toEqual("John.1.1")
		expect(p.parse("JOHN 1:1").osis()).toEqual("John.1.1")
		expect(p.parse("యోహా 1:1").osis()).toEqual("John.1.1")
		;
      return true;
    });
  });

  describe("Localized book Acts (te)", function() {
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
    return it("should handle book: Acts (te)", function() {
      
		expect(p.parse("అపొస్తలుల కార్యములు 1:1").osis()).toEqual("Acts.1.1")
		expect(p.parse("అపొ.కా. 1:1").osis()).toEqual("Acts.1.1")
		expect(p.parse("అపొ.కా 1:1").osis()).toEqual("Acts.1.1")
		expect(p.parse("అపొకా. 1:1").osis()).toEqual("Acts.1.1")
		expect(p.parse("అపొకా 1:1").osis()).toEqual("Acts.1.1")
		expect(p.parse("Acts 1:1").osis()).toEqual("Acts.1.1")
		p.include_apocrypha(false)
		expect(p.parse("అపొస్తలుల కార్యములు 1:1").osis()).toEqual("Acts.1.1")
		expect(p.parse("అపొ.కా. 1:1").osis()).toEqual("Acts.1.1")
		expect(p.parse("అపొ.కా 1:1").osis()).toEqual("Acts.1.1")
		expect(p.parse("అపొకా. 1:1").osis()).toEqual("Acts.1.1")
		expect(p.parse("అపొకా 1:1").osis()).toEqual("Acts.1.1")
		expect(p.parse("ACTS 1:1").osis()).toEqual("Acts.1.1")
		;
      return true;
    });
  });

  describe("Localized book Rom (te)", function() {
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
    return it("should handle book: Rom (te)", function() {
      
		expect(p.parse("రోమీయులకు రాసిన పత్రిక 1:1").osis()).toEqual("Rom.1.1")
		expect(p.parse("రోమా పత్రిక 1:1").osis()).toEqual("Rom.1.1")
		expect(p.parse("రోమా 1:1").osis()).toEqual("Rom.1.1")
		expect(p.parse("Rom 1:1").osis()).toEqual("Rom.1.1")
		p.include_apocrypha(false)
		expect(p.parse("రోమీయులకు రాసిన పత్రిక 1:1").osis()).toEqual("Rom.1.1")
		expect(p.parse("రోమా పత్రిక 1:1").osis()).toEqual("Rom.1.1")
		expect(p.parse("రోమా 1:1").osis()).toEqual("Rom.1.1")
		expect(p.parse("ROM 1:1").osis()).toEqual("Rom.1.1")
		;
      return true;
    });
  });

  describe("Localized book 2Cor (te)", function() {
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
    return it("should handle book: 2Cor (te)", function() {
      
		expect(p.parse("కొరింతీయులకు రాసిన రెండవ పత్రిక 1:1").osis()).toEqual("2Cor.1.1")
		expect(p.parse("2 కొరింతీ పత్రిక 1:1").osis()).toEqual("2Cor.1.1")
		expect(p.parse("2 కొరింథీయులకు 1:1").osis()).toEqual("2Cor.1.1")
		expect(p.parse("2కొరింతీ 1:1").osis()).toEqual("2Cor.1.1")
		expect(p.parse("2కొరింథి 1:1").osis()).toEqual("2Cor.1.1")
		expect(p.parse("2Cor 1:1").osis()).toEqual("2Cor.1.1")
		p.include_apocrypha(false)
		expect(p.parse("కొరింతీయులకు రాసిన రెండవ పత్రిక 1:1").osis()).toEqual("2Cor.1.1")
		expect(p.parse("2 కొరింతీ పత్రిక 1:1").osis()).toEqual("2Cor.1.1")
		expect(p.parse("2 కొరింథీయులకు 1:1").osis()).toEqual("2Cor.1.1")
		expect(p.parse("2కొరింతీ 1:1").osis()).toEqual("2Cor.1.1")
		expect(p.parse("2కొరింథి 1:1").osis()).toEqual("2Cor.1.1")
		expect(p.parse("2COR 1:1").osis()).toEqual("2Cor.1.1")
		;
      return true;
    });
  });

  describe("Localized book 1Cor (te)", function() {
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
    return it("should handle book: 1Cor (te)", function() {
      
		expect(p.parse("కొరింతీయులకు రాసిన మొదటి పత్రిక 1:1").osis()).toEqual("1Cor.1.1")
		expect(p.parse("1 కొరింతీ పత్రిక 1:1").osis()).toEqual("1Cor.1.1")
		expect(p.parse("1 కొరింథీయులకు 1:1").osis()).toEqual("1Cor.1.1")
		expect(p.parse("1కొరింతీ 1:1").osis()).toEqual("1Cor.1.1")
		expect(p.parse("1కొరింథి 1:1").osis()).toEqual("1Cor.1.1")
		expect(p.parse("1Cor 1:1").osis()).toEqual("1Cor.1.1")
		p.include_apocrypha(false)
		expect(p.parse("కొరింతీయులకు రాసిన మొదటి పత్రిక 1:1").osis()).toEqual("1Cor.1.1")
		expect(p.parse("1 కొరింతీ పత్రిక 1:1").osis()).toEqual("1Cor.1.1")
		expect(p.parse("1 కొరింథీయులకు 1:1").osis()).toEqual("1Cor.1.1")
		expect(p.parse("1కొరింతీ 1:1").osis()).toEqual("1Cor.1.1")
		expect(p.parse("1కొరింథి 1:1").osis()).toEqual("1Cor.1.1")
		expect(p.parse("1COR 1:1").osis()).toEqual("1Cor.1.1")
		;
      return true;
    });
  });

  describe("Localized book Gal (te)", function() {
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
    return it("should handle book: Gal (te)", function() {
      
		expect(p.parse("గలతీయులకు రాసిన పత్రిక 1:1").osis()).toEqual("Gal.1.1")
		expect(p.parse("గలతీ పత్రిక 1:1").osis()).toEqual("Gal.1.1")
		expect(p.parse("గలతీయులకు 1:1").osis()).toEqual("Gal.1.1")
		expect(p.parse("గలతి 1:1").osis()).toEqual("Gal.1.1")
		expect(p.parse("గలతీ 1:1").osis()).toEqual("Gal.1.1")
		expect(p.parse("Gal 1:1").osis()).toEqual("Gal.1.1")
		p.include_apocrypha(false)
		expect(p.parse("గలతీయులకు రాసిన పత్రిక 1:1").osis()).toEqual("Gal.1.1")
		expect(p.parse("గలతీ పత్రిక 1:1").osis()).toEqual("Gal.1.1")
		expect(p.parse("గలతీయులకు 1:1").osis()).toEqual("Gal.1.1")
		expect(p.parse("గలతి 1:1").osis()).toEqual("Gal.1.1")
		expect(p.parse("గలతీ 1:1").osis()).toEqual("Gal.1.1")
		expect(p.parse("GAL 1:1").osis()).toEqual("Gal.1.1")
		;
      return true;
    });
  });

  describe("Localized book Eph (te)", function() {
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
    return it("should handle book: Eph (te)", function() {
      
		expect(p.parse("ఎఫెసీయులకు రాసిన పత్రిక 1:1").osis()).toEqual("Eph.1.1")
		expect(p.parse("ఎఫెసీ పత్రిక 1:1").osis()).toEqual("Eph.1.1")
		expect(p.parse("ఎఫెసీయులకు 1:1").osis()).toEqual("Eph.1.1")
		expect(p.parse("ఎఫెసి 1:1").osis()).toEqual("Eph.1.1")
		expect(p.parse("ఎఫెసీ 1:1").osis()).toEqual("Eph.1.1")
		expect(p.parse("Eph 1:1").osis()).toEqual("Eph.1.1")
		p.include_apocrypha(false)
		expect(p.parse("ఎఫెసీయులకు రాసిన పత్రిక 1:1").osis()).toEqual("Eph.1.1")
		expect(p.parse("ఎఫెసీ పత్రిక 1:1").osis()).toEqual("Eph.1.1")
		expect(p.parse("ఎఫెసీయులకు 1:1").osis()).toEqual("Eph.1.1")
		expect(p.parse("ఎఫెసి 1:1").osis()).toEqual("Eph.1.1")
		expect(p.parse("ఎఫెసీ 1:1").osis()).toEqual("Eph.1.1")
		expect(p.parse("EPH 1:1").osis()).toEqual("Eph.1.1")
		;
      return true;
    });
  });

  describe("Localized book Phil (te)", function() {
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
    return it("should handle book: Phil (te)", function() {
      
		expect(p.parse("ఫిలిప్పీయులకు రాసిన పత్రిక 1:1").osis()).toEqual("Phil.1.1")
		expect(p.parse("ఫిలిప్పీ పత్రిక 1:1").osis()).toEqual("Phil.1.1")
		expect(p.parse("ఫిలిప్పీయులకు 1:1").osis()).toEqual("Phil.1.1")
		expect(p.parse("ఫిలిప్పి 1:1").osis()).toEqual("Phil.1.1")
		expect(p.parse("ఫిలిప్పీ 1:1").osis()).toEqual("Phil.1.1")
		expect(p.parse("Phil 1:1").osis()).toEqual("Phil.1.1")
		p.include_apocrypha(false)
		expect(p.parse("ఫిలిప్పీయులకు రాసిన పత్రిక 1:1").osis()).toEqual("Phil.1.1")
		expect(p.parse("ఫిలిప్పీ పత్రిక 1:1").osis()).toEqual("Phil.1.1")
		expect(p.parse("ఫిలిప్పీయులకు 1:1").osis()).toEqual("Phil.1.1")
		expect(p.parse("ఫిలిప్పి 1:1").osis()).toEqual("Phil.1.1")
		expect(p.parse("ఫిలిప్పీ 1:1").osis()).toEqual("Phil.1.1")
		expect(p.parse("PHIL 1:1").osis()).toEqual("Phil.1.1")
		;
      return true;
    });
  });

  describe("Localized book Col (te)", function() {
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
    return it("should handle book: Col (te)", function() {
      
		expect(p.parse("కొలస్సయులకు రాసిన పత్రిక 1:1").osis()).toEqual("Col.1.1")
		expect(p.parse("కొలస్సీ పత్రిక 1:1").osis()).toEqual("Col.1.1")
		expect(p.parse("కొలొస్సయులకు 1:1").osis()).toEqual("Col.1.1")
		expect(p.parse("కొలస్సీ 1:1").osis()).toEqual("Col.1.1")
		expect(p.parse("కొలస్స 1:1").osis()).toEqual("Col.1.1")
		expect(p.parse("Col 1:1").osis()).toEqual("Col.1.1")
		p.include_apocrypha(false)
		expect(p.parse("కొలస్సయులకు రాసిన పత్రిక 1:1").osis()).toEqual("Col.1.1")
		expect(p.parse("కొలస్సీ పత్రిక 1:1").osis()).toEqual("Col.1.1")
		expect(p.parse("కొలొస్సయులకు 1:1").osis()).toEqual("Col.1.1")
		expect(p.parse("కొలస్సీ 1:1").osis()).toEqual("Col.1.1")
		expect(p.parse("కొలస్స 1:1").osis()).toEqual("Col.1.1")
		expect(p.parse("COL 1:1").osis()).toEqual("Col.1.1")
		;
      return true;
    });
  });

  describe("Localized book 2Thess (te)", function() {
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
    return it("should handle book: 2Thess (te)", function() {
      
		expect(p.parse("తెస్సలోనికయులకు రాసిన రెండవ పత్రిక 1:1").osis()).toEqual("2Thess.1.1")
		expect(p.parse("2 తెస్సలోనిక పత్రిక 1:1").osis()).toEqual("2Thess.1.1")
		expect(p.parse("2 థెస్సలొనీకయులకు 1:1").osis()).toEqual("2Thess.1.1")
		expect(p.parse("2థెస్సలో 1:1").osis()).toEqual("2Thess.1.1")
		expect(p.parse("2Thess 1:1").osis()).toEqual("2Thess.1.1")
		expect(p.parse("2తెస్స 1:1").osis()).toEqual("2Thess.1.1")
		p.include_apocrypha(false)
		expect(p.parse("తెస్సలోనికయులకు రాసిన రెండవ పత్రిక 1:1").osis()).toEqual("2Thess.1.1")
		expect(p.parse("2 తెస్సలోనిక పత్రిక 1:1").osis()).toEqual("2Thess.1.1")
		expect(p.parse("2 థెస్సలొనీకయులకు 1:1").osis()).toEqual("2Thess.1.1")
		expect(p.parse("2థెస్సలో 1:1").osis()).toEqual("2Thess.1.1")
		expect(p.parse("2THESS 1:1").osis()).toEqual("2Thess.1.1")
		expect(p.parse("2తెస్స 1:1").osis()).toEqual("2Thess.1.1")
		;
      return true;
    });
  });

  describe("Localized book 1Thess (te)", function() {
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
    return it("should handle book: 1Thess (te)", function() {
      
		expect(p.parse("తెస్సలోనికయులకు రాసిన మొదటి పత్రిక 1:1").osis()).toEqual("1Thess.1.1")
		expect(p.parse("1 తెస్సలోనిక పత్రిక 1:1").osis()).toEqual("1Thess.1.1")
		expect(p.parse("1 థెస్సలొనీకయులకు 1:1").osis()).toEqual("1Thess.1.1")
		expect(p.parse("1థెస్సలో 1:1").osis()).toEqual("1Thess.1.1")
		expect(p.parse("1Thess 1:1").osis()).toEqual("1Thess.1.1")
		expect(p.parse("1తెస్స 1:1").osis()).toEqual("1Thess.1.1")
		p.include_apocrypha(false)
		expect(p.parse("తెస్సలోనికయులకు రాసిన మొదటి పత్రిక 1:1").osis()).toEqual("1Thess.1.1")
		expect(p.parse("1 తెస్సలోనిక పత్రిక 1:1").osis()).toEqual("1Thess.1.1")
		expect(p.parse("1 థెస్సలొనీకయులకు 1:1").osis()).toEqual("1Thess.1.1")
		expect(p.parse("1థెస్సలో 1:1").osis()).toEqual("1Thess.1.1")
		expect(p.parse("1THESS 1:1").osis()).toEqual("1Thess.1.1")
		expect(p.parse("1తెస్స 1:1").osis()).toEqual("1Thess.1.1")
		;
      return true;
    });
  });

  describe("Localized book 2Tim (te)", function() {
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
    return it("should handle book: 2Tim (te)", function() {
      
		expect(p.parse("తిమోతికి రాసిన రెండవ పత్రిక 1:1").osis()).toEqual("2Tim.1.1")
		expect(p.parse("2 తిమోతి పత్రిక 1:1").osis()).toEqual("2Tim.1.1")
		expect(p.parse("2 తిమోతికి 1:1").osis()).toEqual("2Tim.1.1")
		expect(p.parse("2తిమోతి 1:1").osis()).toEqual("2Tim.1.1")
		expect(p.parse("2తిమో 1:1").osis()).toEqual("2Tim.1.1")
		expect(p.parse("2Tim 1:1").osis()).toEqual("2Tim.1.1")
		p.include_apocrypha(false)
		expect(p.parse("తిమోతికి రాసిన రెండవ పత్రిక 1:1").osis()).toEqual("2Tim.1.1")
		expect(p.parse("2 తిమోతి పత్రిక 1:1").osis()).toEqual("2Tim.1.1")
		expect(p.parse("2 తిమోతికి 1:1").osis()).toEqual("2Tim.1.1")
		expect(p.parse("2తిమోతి 1:1").osis()).toEqual("2Tim.1.1")
		expect(p.parse("2తిమో 1:1").osis()).toEqual("2Tim.1.1")
		expect(p.parse("2TIM 1:1").osis()).toEqual("2Tim.1.1")
		;
      return true;
    });
  });

  describe("Localized book 1Tim (te)", function() {
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
    return it("should handle book: 1Tim (te)", function() {
      
		expect(p.parse("తిమోతికి రాసిన మొదటి పత్రిక 1:1").osis()).toEqual("1Tim.1.1")
		expect(p.parse("1 తిమోతి పత్రిక 1:1").osis()).toEqual("1Tim.1.1")
		expect(p.parse("1 తిమోతికి 1:1").osis()).toEqual("1Tim.1.1")
		expect(p.parse("1తిమోతి 1:1").osis()).toEqual("1Tim.1.1")
		expect(p.parse("1తిమో 1:1").osis()).toEqual("1Tim.1.1")
		expect(p.parse("1Tim 1:1").osis()).toEqual("1Tim.1.1")
		p.include_apocrypha(false)
		expect(p.parse("తిమోతికి రాసిన మొదటి పత్రిక 1:1").osis()).toEqual("1Tim.1.1")
		expect(p.parse("1 తిమోతి పత్రిక 1:1").osis()).toEqual("1Tim.1.1")
		expect(p.parse("1 తిమోతికి 1:1").osis()).toEqual("1Tim.1.1")
		expect(p.parse("1తిమోతి 1:1").osis()).toEqual("1Tim.1.1")
		expect(p.parse("1తిమో 1:1").osis()).toEqual("1Tim.1.1")
		expect(p.parse("1TIM 1:1").osis()).toEqual("1Tim.1.1")
		;
      return true;
    });
  });

  describe("Localized book Titus (te)", function() {
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
    return it("should handle book: Titus (te)", function() {
      
		expect(p.parse("తీతుకు రాసిన పత్రిక 1:1").osis()).toEqual("Titus.1.1")
		expect(p.parse("తీతు పత్రిక 1:1").osis()).toEqual("Titus.1.1")
		expect(p.parse("తీతుకు 1:1").osis()).toEqual("Titus.1.1")
		expect(p.parse("Titus 1:1").osis()).toEqual("Titus.1.1")
		expect(p.parse("తీతు 1:1").osis()).toEqual("Titus.1.1")
		p.include_apocrypha(false)
		expect(p.parse("తీతుకు రాసిన పత్రిక 1:1").osis()).toEqual("Titus.1.1")
		expect(p.parse("తీతు పత్రిక 1:1").osis()).toEqual("Titus.1.1")
		expect(p.parse("తీతుకు 1:1").osis()).toEqual("Titus.1.1")
		expect(p.parse("TITUS 1:1").osis()).toEqual("Titus.1.1")
		expect(p.parse("తీతు 1:1").osis()).toEqual("Titus.1.1")
		;
      return true;
    });
  });

  describe("Localized book Phlm (te)", function() {
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
    return it("should handle book: Phlm (te)", function() {
      
		expect(p.parse("ఫిలేమోనుకు రాసిన పత్రిక 1:1").osis()).toEqual("Phlm.1.1")
		expect(p.parse("ఫిలేమోను పత్రిక 1:1").osis()).toEqual("Phlm.1.1")
		expect(p.parse("ఫిలేమోనుకు 1:1").osis()).toEqual("Phlm.1.1")
		expect(p.parse("Phlm 1:1").osis()).toEqual("Phlm.1.1")
		expect(p.parse("ఫిలే 1:1").osis()).toEqual("Phlm.1.1")
		p.include_apocrypha(false)
		expect(p.parse("ఫిలేమోనుకు రాసిన పత్రిక 1:1").osis()).toEqual("Phlm.1.1")
		expect(p.parse("ఫిలేమోను పత్రిక 1:1").osis()).toEqual("Phlm.1.1")
		expect(p.parse("ఫిలేమోనుకు 1:1").osis()).toEqual("Phlm.1.1")
		expect(p.parse("PHLM 1:1").osis()).toEqual("Phlm.1.1")
		expect(p.parse("ఫిలే 1:1").osis()).toEqual("Phlm.1.1")
		;
      return true;
    });
  });

  describe("Localized book Heb (te)", function() {
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
    return it("should handle book: Heb (te)", function() {
      
		expect(p.parse("హెబ్రీయులకు రాసిన పత్రిక 1:1").osis()).toEqual("Heb.1.1")
		expect(p.parse("హెబ్రీ పత్రిక 1:1").osis()).toEqual("Heb.1.1")
		expect(p.parse("హెబ్రీయులకు 1:1").osis()).toEqual("Heb.1.1")
		expect(p.parse("హెబ్రి 1:1").osis()).toEqual("Heb.1.1")
		expect(p.parse("హెబ్రీ 1:1").osis()).toEqual("Heb.1.1")
		expect(p.parse("Heb 1:1").osis()).toEqual("Heb.1.1")
		p.include_apocrypha(false)
		expect(p.parse("హెబ్రీయులకు రాసిన పత్రిక 1:1").osis()).toEqual("Heb.1.1")
		expect(p.parse("హెబ్రీ పత్రిక 1:1").osis()).toEqual("Heb.1.1")
		expect(p.parse("హెబ్రీయులకు 1:1").osis()).toEqual("Heb.1.1")
		expect(p.parse("హెబ్రి 1:1").osis()).toEqual("Heb.1.1")
		expect(p.parse("హెబ్రీ 1:1").osis()).toEqual("Heb.1.1")
		expect(p.parse("HEB 1:1").osis()).toEqual("Heb.1.1")
		;
      return true;
    });
  });

  describe("Localized book Jas (te)", function() {
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
    return it("should handle book: Jas (te)", function() {
      
		expect(p.parse("యాకోబు రాసిన పత్రిక 1:1").osis()).toEqual("Jas.1.1")
		expect(p.parse("యాకోబు పత్రిక 1:1").osis()).toEqual("Jas.1.1")
		expect(p.parse("యాకోబు 1:1").osis()).toEqual("Jas.1.1")
		expect(p.parse("యాకో 1:1").osis()).toEqual("Jas.1.1")
		expect(p.parse("Jas 1:1").osis()).toEqual("Jas.1.1")
		p.include_apocrypha(false)
		expect(p.parse("యాకోబు రాసిన పత్రిక 1:1").osis()).toEqual("Jas.1.1")
		expect(p.parse("యాకోబు పత్రిక 1:1").osis()).toEqual("Jas.1.1")
		expect(p.parse("యాకోబు 1:1").osis()).toEqual("Jas.1.1")
		expect(p.parse("యాకో 1:1").osis()).toEqual("Jas.1.1")
		expect(p.parse("JAS 1:1").osis()).toEqual("Jas.1.1")
		;
      return true;
    });
  });

  describe("Localized book 2Pet (te)", function() {
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
    return it("should handle book: 2Pet (te)", function() {
      
		expect(p.parse("పేతురు రాసిన రెండవ పత్రిక 1:1").osis()).toEqual("2Pet.1.1")
		expect(p.parse("2 పేతురు పత్రిక 1:1").osis()).toEqual("2Pet.1.1")
		expect(p.parse("2 పేతురు 1:1").osis()).toEqual("2Pet.1.1")
		expect(p.parse("2పేతురు 1:1").osis()).toEqual("2Pet.1.1")
		expect(p.parse("2పేతు 1:1").osis()).toEqual("2Pet.1.1")
		expect(p.parse("2Pet 1:1").osis()).toEqual("2Pet.1.1")
		p.include_apocrypha(false)
		expect(p.parse("పేతురు రాసిన రెండవ పత్రిక 1:1").osis()).toEqual("2Pet.1.1")
		expect(p.parse("2 పేతురు పత్రిక 1:1").osis()).toEqual("2Pet.1.1")
		expect(p.parse("2 పేతురు 1:1").osis()).toEqual("2Pet.1.1")
		expect(p.parse("2పేతురు 1:1").osis()).toEqual("2Pet.1.1")
		expect(p.parse("2పేతు 1:1").osis()).toEqual("2Pet.1.1")
		expect(p.parse("2PET 1:1").osis()).toEqual("2Pet.1.1")
		;
      return true;
    });
  });

  describe("Localized book 1Pet (te)", function() {
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
    return it("should handle book: 1Pet (te)", function() {
      
		expect(p.parse("పేతురు రాసిన మొదటి పత్రిక 1:1").osis()).toEqual("1Pet.1.1")
		expect(p.parse("1 పేతురు పత్రిక 1:1").osis()).toEqual("1Pet.1.1")
		expect(p.parse("1 పేతురు 1:1").osis()).toEqual("1Pet.1.1")
		expect(p.parse("1పేతురు 1:1").osis()).toEqual("1Pet.1.1")
		expect(p.parse("1పేతు 1:1").osis()).toEqual("1Pet.1.1")
		expect(p.parse("1Pet 1:1").osis()).toEqual("1Pet.1.1")
		p.include_apocrypha(false)
		expect(p.parse("పేతురు రాసిన మొదటి పత్రిక 1:1").osis()).toEqual("1Pet.1.1")
		expect(p.parse("1 పేతురు పత్రిక 1:1").osis()).toEqual("1Pet.1.1")
		expect(p.parse("1 పేతురు 1:1").osis()).toEqual("1Pet.1.1")
		expect(p.parse("1పేతురు 1:1").osis()).toEqual("1Pet.1.1")
		expect(p.parse("1పేతు 1:1").osis()).toEqual("1Pet.1.1")
		expect(p.parse("1PET 1:1").osis()).toEqual("1Pet.1.1")
		;
      return true;
    });
  });

  describe("Localized book Jude (te)", function() {
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
    return it("should handle book: Jude (te)", function() {
      
		expect(p.parse("యూదా రాసిన పత్రిక 1:1").osis()).toEqual("Jude.1.1")
		expect(p.parse("యూదా పత్రిక 1:1").osis()).toEqual("Jude.1.1")
		expect(p.parse("Jude 1:1").osis()).toEqual("Jude.1.1")
		expect(p.parse("యూదా 1:1").osis()).toEqual("Jude.1.1")
		p.include_apocrypha(false)
		expect(p.parse("యూదా రాసిన పత్రిక 1:1").osis()).toEqual("Jude.1.1")
		expect(p.parse("యూదా పత్రిక 1:1").osis()).toEqual("Jude.1.1")
		expect(p.parse("JUDE 1:1").osis()).toEqual("Jude.1.1")
		expect(p.parse("యూదా 1:1").osis()).toEqual("Jude.1.1")
		;
      return true;
    });
  });

  describe("Localized book Tob (te)", function() {
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
    return it("should handle book: Tob (te)", function() {
      
		expect(p.parse("Tob 1:1").osis()).toEqual("Tob.1.1")
		;
      return true;
    });
  });

  describe("Localized book Jdt (te)", function() {
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
    return it("should handle book: Jdt (te)", function() {
      
		expect(p.parse("Jdt 1:1").osis()).toEqual("Jdt.1.1")
		;
      return true;
    });
  });

  describe("Localized book Bar (te)", function() {
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
    return it("should handle book: Bar (te)", function() {
      
		expect(p.parse("Bar 1:1").osis()).toEqual("Bar.1.1")
		;
      return true;
    });
  });

  describe("Localized book Sus (te)", function() {
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
    return it("should handle book: Sus (te)", function() {
      
		expect(p.parse("Sus 1:1").osis()).toEqual("Sus.1.1")
		;
      return true;
    });
  });

  describe("Localized book 2Macc (te)", function() {
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
    return it("should handle book: 2Macc (te)", function() {
      
		expect(p.parse("2Macc 1:1").osis()).toEqual("2Macc.1.1")
		;
      return true;
    });
  });

  describe("Localized book 3Macc (te)", function() {
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
    return it("should handle book: 3Macc (te)", function() {
      
		expect(p.parse("3Macc 1:1").osis()).toEqual("3Macc.1.1")
		;
      return true;
    });
  });

  describe("Localized book 4Macc (te)", function() {
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
    return it("should handle book: 4Macc (te)", function() {
      
		expect(p.parse("4Macc 1:1").osis()).toEqual("4Macc.1.1")
		;
      return true;
    });
  });

  describe("Localized book 1Macc (te)", function() {
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
    return it("should handle book: 1Macc (te)", function() {
      
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
      return expect(p.languages).toEqual(["te"]);
    });
    it("should handle ranges (te)", function() {
      expect(p.parse("Titus 1:1 to 2").osis()).toEqual("Titus.1.1-Titus.1.2");
      expect(p.parse("Matt 1to2").osis()).toEqual("Matt.1-Matt.2");
      return expect(p.parse("Phlm 2 TO 3").osis()).toEqual("Phlm.1.2-Phlm.1.3");
    });
    it("should handle chapters (te)", function() {
      expect(p.parse("Titus 1:1, అధ్యాయం 2").osis()).toEqual("Titus.1.1,Titus.2");
      return expect(p.parse("Matt 3:4 అధ్యాయం 6").osis()).toEqual("Matt.3.4,Matt.6");
    });
    it("should handle verses (te)", function() {
      expect(p.parse("Exod 1:1 వచనం 3").osis()).toEqual("Exod.1.1,Exod.1.3");
      return expect(p.parse("Phlm వచనం 6").osis()).toEqual("Phlm.1.6");
    });
    it("should handle 'and' (te)", function() {
      expect(p.parse("Exod 1:1 మరియు 3").osis()).toEqual("Exod.1.1,Exod.1.3");
      return expect(p.parse("Phlm 2 మరియు 6").osis()).toEqual("Phlm.1.2,Phlm.1.6");
    });
    it("should handle titles (te)", function() {
      expect(p.parse("Ps 3 శీర్షిక, 4:2, 5:శీర్షిక").osis()).toEqual("Ps.3.1,Ps.4.2,Ps.5.1");
      return expect(p.parse("PS 3 శీర్షిక, 4:2, 5:శీర్షిక").osis()).toEqual("Ps.3.1,Ps.4.2,Ps.5.1");
    });
    it("should handle 'ff' (te)", function() {
      expect(p.parse("Rev 3ff, 4:2ff").osis()).toEqual("Rev.3-Rev.22,Rev.4.2-Rev.4.11");
      return expect(p.parse("REV 3 FF, 4:2 FF").osis()).toEqual("Rev.3-Rev.22,Rev.4.2-Rev.4.11");
    });
    it("should handle translations (te)", function() {
      expect(p.parse("Lev 1 (IRV)").osis_and_translations()).toEqual([["Lev.1", "IRV"]]);
      return expect(p.parse("lev 1 irv").osis_and_translations()).toEqual([["Lev.1", "IRV"]]);
    });
    return it("should handle boundaries (te)", function() {
      p.set_options({
        book_alone_strategy: "full"
      });
      expect(p.parse("\u2014Matt\u2014").osis()).toEqual("Matt.1-Matt.28");
      return expect(p.parse("\u201cMatt 1:1\u201d").osis()).toEqual("Matt.1.1");
    });
  });

}).call(this);
