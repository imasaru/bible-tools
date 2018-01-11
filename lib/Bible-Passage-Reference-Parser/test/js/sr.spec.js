(function() {
  var bcv_parser;

  bcv_parser = require("../../js/sr_bcv_parser.js").bcv_parser;

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

  describe("Localized book Gen (sr)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser;
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    return it("should handle book: Gen (sr)", function() {
      
		expect(p.parse("Prva Knjiga Mojsijeva 1:1").osis()).toEqual("Gen.1.1")
		expect(p.parse("1. Knjiga Mojsijeva 1:1").osis()).toEqual("Gen.1.1")
		expect(p.parse("I. Knjiga Mojsijeva 1:1").osis()).toEqual("Gen.1.1")
		expect(p.parse("1 Knjiga Mojsijeva 1:1").osis()).toEqual("Gen.1.1")
		expect(p.parse("I Knjiga Mojsijeva 1:1").osis()).toEqual("Gen.1.1")
		expect(p.parse("Prva Mojsijeva 1:1").osis()).toEqual("Gen.1.1")
		expect(p.parse("1. Mojsijeva 1:1").osis()).toEqual("Gen.1.1")
		expect(p.parse("I. Mojsijeva 1:1").osis()).toEqual("Gen.1.1")
		expect(p.parse("1 Mojsijeva 1:1").osis()).toEqual("Gen.1.1")
		expect(p.parse("I Mojsijeva 1:1").osis()).toEqual("Gen.1.1")
		expect(p.parse("Prva Moj 1:1").osis()).toEqual("Gen.1.1")
		expect(p.parse("1. Moj 1:1").osis()).toEqual("Gen.1.1")
		expect(p.parse("I. Moj 1:1").osis()).toEqual("Gen.1.1")
		expect(p.parse("1 Moj 1:1").osis()).toEqual("Gen.1.1")
		expect(p.parse("I Moj 1:1").osis()).toEqual("Gen.1.1")
		expect(p.parse("Gen 1:1").osis()).toEqual("Gen.1.1")
		p.include_apocrypha(false)
		expect(p.parse("PRVA KNJIGA MOJSIJEVA 1:1").osis()).toEqual("Gen.1.1")
		expect(p.parse("1. KNJIGA MOJSIJEVA 1:1").osis()).toEqual("Gen.1.1")
		expect(p.parse("I. KNJIGA MOJSIJEVA 1:1").osis()).toEqual("Gen.1.1")
		expect(p.parse("1 KNJIGA MOJSIJEVA 1:1").osis()).toEqual("Gen.1.1")
		expect(p.parse("I KNJIGA MOJSIJEVA 1:1").osis()).toEqual("Gen.1.1")
		expect(p.parse("PRVA MOJSIJEVA 1:1").osis()).toEqual("Gen.1.1")
		expect(p.parse("1. MOJSIJEVA 1:1").osis()).toEqual("Gen.1.1")
		expect(p.parse("I. MOJSIJEVA 1:1").osis()).toEqual("Gen.1.1")
		expect(p.parse("1 MOJSIJEVA 1:1").osis()).toEqual("Gen.1.1")
		expect(p.parse("I MOJSIJEVA 1:1").osis()).toEqual("Gen.1.1")
		expect(p.parse("PRVA MOJ 1:1").osis()).toEqual("Gen.1.1")
		expect(p.parse("1. MOJ 1:1").osis()).toEqual("Gen.1.1")
		expect(p.parse("I. MOJ 1:1").osis()).toEqual("Gen.1.1")
		expect(p.parse("1 MOJ 1:1").osis()).toEqual("Gen.1.1")
		expect(p.parse("I MOJ 1:1").osis()).toEqual("Gen.1.1")
		expect(p.parse("GEN 1:1").osis()).toEqual("Gen.1.1")
		;
      return true;
    });
  });

  describe("Localized book Exod (sr)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser;
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    return it("should handle book: Exod (sr)", function() {
      
		expect(p.parse("Druga Knjiga Mojsijeva 1:1").osis()).toEqual("Exod.1.1")
		expect(p.parse("II. Knjiga Mojsijeva 1:1").osis()).toEqual("Exod.1.1")
		expect(p.parse("2. Knjiga Mojsijeva 1:1").osis()).toEqual("Exod.1.1")
		expect(p.parse("II Knjiga Mojsijeva 1:1").osis()).toEqual("Exod.1.1")
		expect(p.parse("2 Knjiga Mojsijeva 1:1").osis()).toEqual("Exod.1.1")
		expect(p.parse("Druga Mojsijeva 1:1").osis()).toEqual("Exod.1.1")
		expect(p.parse("II. Mojsijeva 1:1").osis()).toEqual("Exod.1.1")
		expect(p.parse("2. Mojsijeva 1:1").osis()).toEqual("Exod.1.1")
		expect(p.parse("II Mojsijeva 1:1").osis()).toEqual("Exod.1.1")
		expect(p.parse("2 Mojsijeva 1:1").osis()).toEqual("Exod.1.1")
		expect(p.parse("Druga Moj 1:1").osis()).toEqual("Exod.1.1")
		expect(p.parse("II. Moj 1:1").osis()).toEqual("Exod.1.1")
		expect(p.parse("2. Moj 1:1").osis()).toEqual("Exod.1.1")
		expect(p.parse("II Moj 1:1").osis()).toEqual("Exod.1.1")
		expect(p.parse("2 Moj 1:1").osis()).toEqual("Exod.1.1")
		expect(p.parse("Exod 1:1").osis()).toEqual("Exod.1.1")
		p.include_apocrypha(false)
		expect(p.parse("DRUGA KNJIGA MOJSIJEVA 1:1").osis()).toEqual("Exod.1.1")
		expect(p.parse("II. KNJIGA MOJSIJEVA 1:1").osis()).toEqual("Exod.1.1")
		expect(p.parse("2. KNJIGA MOJSIJEVA 1:1").osis()).toEqual("Exod.1.1")
		expect(p.parse("II KNJIGA MOJSIJEVA 1:1").osis()).toEqual("Exod.1.1")
		expect(p.parse("2 KNJIGA MOJSIJEVA 1:1").osis()).toEqual("Exod.1.1")
		expect(p.parse("DRUGA MOJSIJEVA 1:1").osis()).toEqual("Exod.1.1")
		expect(p.parse("II. MOJSIJEVA 1:1").osis()).toEqual("Exod.1.1")
		expect(p.parse("2. MOJSIJEVA 1:1").osis()).toEqual("Exod.1.1")
		expect(p.parse("II MOJSIJEVA 1:1").osis()).toEqual("Exod.1.1")
		expect(p.parse("2 MOJSIJEVA 1:1").osis()).toEqual("Exod.1.1")
		expect(p.parse("DRUGA MOJ 1:1").osis()).toEqual("Exod.1.1")
		expect(p.parse("II. MOJ 1:1").osis()).toEqual("Exod.1.1")
		expect(p.parse("2. MOJ 1:1").osis()).toEqual("Exod.1.1")
		expect(p.parse("II MOJ 1:1").osis()).toEqual("Exod.1.1")
		expect(p.parse("2 MOJ 1:1").osis()).toEqual("Exod.1.1")
		expect(p.parse("EXOD 1:1").osis()).toEqual("Exod.1.1")
		;
      return true;
    });
  });

  describe("Localized book Bel (sr)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser;
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    return it("should handle book: Bel (sr)", function() {
      
		expect(p.parse("Bel 1:1").osis()).toEqual("Bel.1.1")
		;
      return true;
    });
  });

  describe("Localized book Lev (sr)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser;
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    return it("should handle book: Lev (sr)", function() {
      
		expect(p.parse("Treca Knjiga Mojsijeva 1:1").osis()).toEqual("Lev.1.1")
		expect(p.parse("Treća Knjiga Mojsijeva 1:1").osis()).toEqual("Lev.1.1")
		expect(p.parse("III. Knjiga Mojsijeva 1:1").osis()).toEqual("Lev.1.1")
		expect(p.parse("III Knjiga Mojsijeva 1:1").osis()).toEqual("Lev.1.1")
		expect(p.parse("3. Knjiga Mojsijeva 1:1").osis()).toEqual("Lev.1.1")
		expect(p.parse("3 Knjiga Mojsijeva 1:1").osis()).toEqual("Lev.1.1")
		expect(p.parse("Treca Mojsijeva 1:1").osis()).toEqual("Lev.1.1")
		expect(p.parse("Treća Mojsijeva 1:1").osis()).toEqual("Lev.1.1")
		expect(p.parse("III. Mojsijeva 1:1").osis()).toEqual("Lev.1.1")
		expect(p.parse("III Mojsijeva 1:1").osis()).toEqual("Lev.1.1")
		expect(p.parse("3. Mojsijeva 1:1").osis()).toEqual("Lev.1.1")
		expect(p.parse("3 Mojsijeva 1:1").osis()).toEqual("Lev.1.1")
		expect(p.parse("Treca Moj 1:1").osis()).toEqual("Lev.1.1")
		expect(p.parse("Treća Moj 1:1").osis()).toEqual("Lev.1.1")
		expect(p.parse("III. Moj 1:1").osis()).toEqual("Lev.1.1")
		expect(p.parse("III Moj 1:1").osis()).toEqual("Lev.1.1")
		expect(p.parse("3. Moj 1:1").osis()).toEqual("Lev.1.1")
		expect(p.parse("3 Moj 1:1").osis()).toEqual("Lev.1.1")
		expect(p.parse("Lev 1:1").osis()).toEqual("Lev.1.1")
		p.include_apocrypha(false)
		expect(p.parse("TRECA KNJIGA MOJSIJEVA 1:1").osis()).toEqual("Lev.1.1")
		expect(p.parse("TREĆA KNJIGA MOJSIJEVA 1:1").osis()).toEqual("Lev.1.1")
		expect(p.parse("III. KNJIGA MOJSIJEVA 1:1").osis()).toEqual("Lev.1.1")
		expect(p.parse("III KNJIGA MOJSIJEVA 1:1").osis()).toEqual("Lev.1.1")
		expect(p.parse("3. KNJIGA MOJSIJEVA 1:1").osis()).toEqual("Lev.1.1")
		expect(p.parse("3 KNJIGA MOJSIJEVA 1:1").osis()).toEqual("Lev.1.1")
		expect(p.parse("TRECA MOJSIJEVA 1:1").osis()).toEqual("Lev.1.1")
		expect(p.parse("TREĆA MOJSIJEVA 1:1").osis()).toEqual("Lev.1.1")
		expect(p.parse("III. MOJSIJEVA 1:1").osis()).toEqual("Lev.1.1")
		expect(p.parse("III MOJSIJEVA 1:1").osis()).toEqual("Lev.1.1")
		expect(p.parse("3. MOJSIJEVA 1:1").osis()).toEqual("Lev.1.1")
		expect(p.parse("3 MOJSIJEVA 1:1").osis()).toEqual("Lev.1.1")
		expect(p.parse("TRECA MOJ 1:1").osis()).toEqual("Lev.1.1")
		expect(p.parse("TREĆA MOJ 1:1").osis()).toEqual("Lev.1.1")
		expect(p.parse("III. MOJ 1:1").osis()).toEqual("Lev.1.1")
		expect(p.parse("III MOJ 1:1").osis()).toEqual("Lev.1.1")
		expect(p.parse("3. MOJ 1:1").osis()).toEqual("Lev.1.1")
		expect(p.parse("3 MOJ 1:1").osis()).toEqual("Lev.1.1")
		expect(p.parse("LEV 1:1").osis()).toEqual("Lev.1.1")
		;
      return true;
    });
  });

  describe("Localized book Num (sr)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser;
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    return it("should handle book: Num (sr)", function() {
      
		expect(p.parse("Cetvrta Knjiga Mojsijeva 1:1").osis()).toEqual("Num.1.1")
		expect(p.parse("Četvrta Knjiga Mojsijeva 1:1").osis()).toEqual("Num.1.1")
		expect(p.parse("IV. Knjiga Mojsijeva 1:1").osis()).toEqual("Num.1.1")
		expect(p.parse("4. Knjiga Mojsijeva 1:1").osis()).toEqual("Num.1.1")
		expect(p.parse("IV Knjiga Mojsijeva 1:1").osis()).toEqual("Num.1.1")
		expect(p.parse("4 Knjiga Mojsijeva 1:1").osis()).toEqual("Num.1.1")
		expect(p.parse("Cetvrta Mojsijeva 1:1").osis()).toEqual("Num.1.1")
		expect(p.parse("Četvrta Mojsijeva 1:1").osis()).toEqual("Num.1.1")
		expect(p.parse("IV. Mojsijeva 1:1").osis()).toEqual("Num.1.1")
		expect(p.parse("4. Mojsijeva 1:1").osis()).toEqual("Num.1.1")
		expect(p.parse("IV Mojsijeva 1:1").osis()).toEqual("Num.1.1")
		expect(p.parse("4 Mojsijeva 1:1").osis()).toEqual("Num.1.1")
		expect(p.parse("Cetvrta Moj 1:1").osis()).toEqual("Num.1.1")
		expect(p.parse("Četvrta Moj 1:1").osis()).toEqual("Num.1.1")
		expect(p.parse("IV. Moj 1:1").osis()).toEqual("Num.1.1")
		expect(p.parse("4. Moj 1:1").osis()).toEqual("Num.1.1")
		expect(p.parse("IV Moj 1:1").osis()).toEqual("Num.1.1")
		expect(p.parse("4 Moj 1:1").osis()).toEqual("Num.1.1")
		expect(p.parse("Num 1:1").osis()).toEqual("Num.1.1")
		p.include_apocrypha(false)
		expect(p.parse("CETVRTA KNJIGA MOJSIJEVA 1:1").osis()).toEqual("Num.1.1")
		expect(p.parse("ČETVRTA KNJIGA MOJSIJEVA 1:1").osis()).toEqual("Num.1.1")
		expect(p.parse("IV. KNJIGA MOJSIJEVA 1:1").osis()).toEqual("Num.1.1")
		expect(p.parse("4. KNJIGA MOJSIJEVA 1:1").osis()).toEqual("Num.1.1")
		expect(p.parse("IV KNJIGA MOJSIJEVA 1:1").osis()).toEqual("Num.1.1")
		expect(p.parse("4 KNJIGA MOJSIJEVA 1:1").osis()).toEqual("Num.1.1")
		expect(p.parse("CETVRTA MOJSIJEVA 1:1").osis()).toEqual("Num.1.1")
		expect(p.parse("ČETVRTA MOJSIJEVA 1:1").osis()).toEqual("Num.1.1")
		expect(p.parse("IV. MOJSIJEVA 1:1").osis()).toEqual("Num.1.1")
		expect(p.parse("4. MOJSIJEVA 1:1").osis()).toEqual("Num.1.1")
		expect(p.parse("IV MOJSIJEVA 1:1").osis()).toEqual("Num.1.1")
		expect(p.parse("4 MOJSIJEVA 1:1").osis()).toEqual("Num.1.1")
		expect(p.parse("CETVRTA MOJ 1:1").osis()).toEqual("Num.1.1")
		expect(p.parse("ČETVRTA MOJ 1:1").osis()).toEqual("Num.1.1")
		expect(p.parse("IV. MOJ 1:1").osis()).toEqual("Num.1.1")
		expect(p.parse("4. MOJ 1:1").osis()).toEqual("Num.1.1")
		expect(p.parse("IV MOJ 1:1").osis()).toEqual("Num.1.1")
		expect(p.parse("4 MOJ 1:1").osis()).toEqual("Num.1.1")
		expect(p.parse("NUM 1:1").osis()).toEqual("Num.1.1")
		;
      return true;
    });
  });

  describe("Localized book Sir (sr)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser;
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    return it("should handle book: Sir (sr)", function() {
      
		expect(p.parse("Премудрости Исуса сина Сирахова 1:1").osis()).toEqual("Sir.1.1")
		expect(p.parse("Еклезијастикус 1:1").osis()).toEqual("Sir.1.1")
		expect(p.parse("Сирина 1:1").osis()).toEqual("Sir.1.1")
		expect(p.parse("Sir 1:1").osis()).toEqual("Sir.1.1")
		expect(p.parse("ИсС 1:1").osis()).toEqual("Sir.1.1")
		expect(p.parse("Сир 1:1").osis()).toEqual("Sir.1.1")
		;
      return true;
    });
  });

  describe("Localized book Wis (sr)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser;
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    return it("should handle book: Wis (sr)", function() {
      
		expect(p.parse("Премудорсти Соломонове 1:1").osis()).toEqual("Wis.1.1")
		expect(p.parse("Мудрости Соломонове 1:1").osis()).toEqual("Wis.1.1")
		expect(p.parse("Мудрости 1:1").osis()).toEqual("Wis.1.1")
		expect(p.parse("Прем Сол 1:1").osis()).toEqual("Wis.1.1")
		expect(p.parse("Wis 1:1").osis()).toEqual("Wis.1.1")
		;
      return true;
    });
  });

  describe("Localized book Lam (sr)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser;
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    return it("should handle book: Lam (sr)", function() {
      
		expect(p.parse("Plac Jeremijin 1:1").osis()).toEqual("Lam.1.1")
		expect(p.parse("Plač Jeremijin 1:1").osis()).toEqual("Lam.1.1")
		expect(p.parse("Plac 1:1").osis()).toEqual("Lam.1.1")
		expect(p.parse("Plač 1:1").osis()).toEqual("Lam.1.1")
		expect(p.parse("Lam 1:1").osis()).toEqual("Lam.1.1")
		p.include_apocrypha(false)
		expect(p.parse("PLAC JEREMIJIN 1:1").osis()).toEqual("Lam.1.1")
		expect(p.parse("PLAČ JEREMIJIN 1:1").osis()).toEqual("Lam.1.1")
		expect(p.parse("PLAC 1:1").osis()).toEqual("Lam.1.1")
		expect(p.parse("PLAČ 1:1").osis()).toEqual("Lam.1.1")
		expect(p.parse("LAM 1:1").osis()).toEqual("Lam.1.1")
		;
      return true;
    });
  });

  describe("Localized book EpJer (sr)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser;
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    return it("should handle book: EpJer (sr)", function() {
      
		expect(p.parse("Посланица Јеремијина 1:1").osis()).toEqual("EpJer.1.1")
		expect(p.parse("Писма Јеремије 1:1").osis()).toEqual("EpJer.1.1")
		expect(p.parse("EpJer 1:1").osis()).toEqual("EpJer.1.1")
		;
      return true;
    });
  });

  describe("Localized book Rev (sr)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser;
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    return it("should handle book: Rev (sr)", function() {
      
		expect(p.parse("Otkrivenje 1:1").osis()).toEqual("Rev.1.1")
		expect(p.parse("Otkr 1:1").osis()).toEqual("Rev.1.1")
		expect(p.parse("Rev 1:1").osis()).toEqual("Rev.1.1")
		p.include_apocrypha(false)
		expect(p.parse("OTKRIVENJE 1:1").osis()).toEqual("Rev.1.1")
		expect(p.parse("OTKR 1:1").osis()).toEqual("Rev.1.1")
		expect(p.parse("REV 1:1").osis()).toEqual("Rev.1.1")
		;
      return true;
    });
  });

  describe("Localized book PrMan (sr)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser;
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    return it("should handle book: PrMan (sr)", function() {
      
		expect(p.parse("Молитва Манасијина 1:1").osis()).toEqual("PrMan.1.1")
		expect(p.parse("PrMan 1:1").osis()).toEqual("PrMan.1.1")
		;
      return true;
    });
  });

  describe("Localized book Deut (sr)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser;
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    return it("should handle book: Deut (sr)", function() {
      
		expect(p.parse("Peta Knjiga Mojsijeva 1:1").osis()).toEqual("Deut.1.1")
		expect(p.parse("5. Knjiga Mojsijeva 1:1").osis()).toEqual("Deut.1.1")
		expect(p.parse("V. Knjiga Mojsijeva 1:1").osis()).toEqual("Deut.1.1")
		expect(p.parse("5 Knjiga Mojsijeva 1:1").osis()).toEqual("Deut.1.1")
		expect(p.parse("V Knjiga Mojsijeva 1:1").osis()).toEqual("Deut.1.1")
		expect(p.parse("Peta Mojsijeva 1:1").osis()).toEqual("Deut.1.1")
		expect(p.parse("5. Mojsijeva 1:1").osis()).toEqual("Deut.1.1")
		expect(p.parse("V. Mojsijeva 1:1").osis()).toEqual("Deut.1.1")
		expect(p.parse("5 Mojsijeva 1:1").osis()).toEqual("Deut.1.1")
		expect(p.parse("V Mojsijeva 1:1").osis()).toEqual("Deut.1.1")
		expect(p.parse("Peta Moj 1:1").osis()).toEqual("Deut.1.1")
		expect(p.parse("5. Moj 1:1").osis()).toEqual("Deut.1.1")
		expect(p.parse("V. Moj 1:1").osis()).toEqual("Deut.1.1")
		expect(p.parse("5 Moj 1:1").osis()).toEqual("Deut.1.1")
		expect(p.parse("V Moj 1:1").osis()).toEqual("Deut.1.1")
		expect(p.parse("Deut 1:1").osis()).toEqual("Deut.1.1")
		p.include_apocrypha(false)
		expect(p.parse("PETA KNJIGA MOJSIJEVA 1:1").osis()).toEqual("Deut.1.1")
		expect(p.parse("5. KNJIGA MOJSIJEVA 1:1").osis()).toEqual("Deut.1.1")
		expect(p.parse("V. KNJIGA MOJSIJEVA 1:1").osis()).toEqual("Deut.1.1")
		expect(p.parse("5 KNJIGA MOJSIJEVA 1:1").osis()).toEqual("Deut.1.1")
		expect(p.parse("V KNJIGA MOJSIJEVA 1:1").osis()).toEqual("Deut.1.1")
		expect(p.parse("PETA MOJSIJEVA 1:1").osis()).toEqual("Deut.1.1")
		expect(p.parse("5. MOJSIJEVA 1:1").osis()).toEqual("Deut.1.1")
		expect(p.parse("V. MOJSIJEVA 1:1").osis()).toEqual("Deut.1.1")
		expect(p.parse("5 MOJSIJEVA 1:1").osis()).toEqual("Deut.1.1")
		expect(p.parse("V MOJSIJEVA 1:1").osis()).toEqual("Deut.1.1")
		expect(p.parse("PETA MOJ 1:1").osis()).toEqual("Deut.1.1")
		expect(p.parse("5. MOJ 1:1").osis()).toEqual("Deut.1.1")
		expect(p.parse("V. MOJ 1:1").osis()).toEqual("Deut.1.1")
		expect(p.parse("5 MOJ 1:1").osis()).toEqual("Deut.1.1")
		expect(p.parse("V MOJ 1:1").osis()).toEqual("Deut.1.1")
		expect(p.parse("DEUT 1:1").osis()).toEqual("Deut.1.1")
		;
      return true;
    });
  });

  describe("Localized book Josh (sr)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser;
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    return it("should handle book: Josh (sr)", function() {
      
		expect(p.parse("Isus Navin 1:1").osis()).toEqual("Josh.1.1")
		expect(p.parse("Josh 1:1").osis()).toEqual("Josh.1.1")
		expect(p.parse("Isu 1:1").osis()).toEqual("Josh.1.1")
		p.include_apocrypha(false)
		expect(p.parse("ISUS NAVIN 1:1").osis()).toEqual("Josh.1.1")
		expect(p.parse("JOSH 1:1").osis()).toEqual("Josh.1.1")
		expect(p.parse("ISU 1:1").osis()).toEqual("Josh.1.1")
		;
      return true;
    });
  });

  describe("Localized book Judg (sr)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser;
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    return it("should handle book: Judg (sr)", function() {
      
		expect(p.parse("Sudije 1:1").osis()).toEqual("Judg.1.1")
		expect(p.parse("Judg 1:1").osis()).toEqual("Judg.1.1")
		expect(p.parse("Sud 1:1").osis()).toEqual("Judg.1.1")
		p.include_apocrypha(false)
		expect(p.parse("SUDIJE 1:1").osis()).toEqual("Judg.1.1")
		expect(p.parse("JUDG 1:1").osis()).toEqual("Judg.1.1")
		expect(p.parse("SUD 1:1").osis()).toEqual("Judg.1.1")
		;
      return true;
    });
  });

  describe("Localized book Ruth (sr)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser;
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    return it("should handle book: Ruth (sr)", function() {
      
		expect(p.parse("Ruta 1:1").osis()).toEqual("Ruth.1.1")
		expect(p.parse("Ruth 1:1").osis()).toEqual("Ruth.1.1")
		p.include_apocrypha(false)
		expect(p.parse("RUTA 1:1").osis()).toEqual("Ruth.1.1")
		expect(p.parse("RUTH 1:1").osis()).toEqual("Ruth.1.1")
		;
      return true;
    });
  });

  describe("Localized book 1Esd (sr)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser;
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    return it("should handle book: 1Esd (sr)", function() {
      
		expect(p.parse("Prva Јездрина 1:1").osis()).toEqual("1Esd.1.1")
		expect(p.parse("Prva Ездрина 1:1").osis()).toEqual("1Esd.1.1")
		expect(p.parse("1. Јездрина 1:1").osis()).toEqual("1Esd.1.1")
		expect(p.parse("I. Јездрина 1:1").osis()).toEqual("1Esd.1.1")
		expect(p.parse("1 Јездрина 1:1").osis()).toEqual("1Esd.1.1")
		expect(p.parse("1. Ездрина 1:1").osis()).toEqual("1Esd.1.1")
		expect(p.parse("I Јездрина 1:1").osis()).toEqual("1Esd.1.1")
		expect(p.parse("I. Ездрина 1:1").osis()).toEqual("1Esd.1.1")
		expect(p.parse("1 Ездрина 1:1").osis()).toEqual("1Esd.1.1")
		expect(p.parse("I Ездрина 1:1").osis()).toEqual("1Esd.1.1")
		expect(p.parse("1 Јез 1:1").osis()).toEqual("1Esd.1.1")
		expect(p.parse("1Esd 1:1").osis()).toEqual("1Esd.1.1")
		;
      return true;
    });
  });

  describe("Localized book 2Esd (sr)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser;
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    return it("should handle book: 2Esd (sr)", function() {
      
		expect(p.parse("Druga Јездрина 1:1").osis()).toEqual("2Esd.1.1")
		expect(p.parse("Druga Ездрина 1:1").osis()).toEqual("2Esd.1.1")
		expect(p.parse("II. Јездрина 1:1").osis()).toEqual("2Esd.1.1")
		expect(p.parse("2. Јездрина 1:1").osis()).toEqual("2Esd.1.1")
		expect(p.parse("II Јездрина 1:1").osis()).toEqual("2Esd.1.1")
		expect(p.parse("II. Ездрина 1:1").osis()).toEqual("2Esd.1.1")
		expect(p.parse("2 Јездрина 1:1").osis()).toEqual("2Esd.1.1")
		expect(p.parse("2. Ездрина 1:1").osis()).toEqual("2Esd.1.1")
		expect(p.parse("II Ездрина 1:1").osis()).toEqual("2Esd.1.1")
		expect(p.parse("2 Ездрина 1:1").osis()).toEqual("2Esd.1.1")
		expect(p.parse("2 Јез 1:1").osis()).toEqual("2Esd.1.1")
		expect(p.parse("2Esd 1:1").osis()).toEqual("2Esd.1.1")
		;
      return true;
    });
  });

  describe("Localized book Isa (sr)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser;
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    return it("should handle book: Isa (sr)", function() {
      
		expect(p.parse("Isaija 1:1").osis()).toEqual("Isa.1.1")
		expect(p.parse("Isa 1:1").osis()).toEqual("Isa.1.1")
		p.include_apocrypha(false)
		expect(p.parse("ISAIJA 1:1").osis()).toEqual("Isa.1.1")
		expect(p.parse("ISA 1:1").osis()).toEqual("Isa.1.1")
		;
      return true;
    });
  });

  describe("Localized book 2Sam (sr)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser;
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    return it("should handle book: 2Sam (sr)", function() {
      
		expect(p.parse("Druga Samuilova 1:1").osis()).toEqual("2Sam.1.1")
		expect(p.parse("II. Samuilova 1:1").osis()).toEqual("2Sam.1.1")
		expect(p.parse("2. Samuilova 1:1").osis()).toEqual("2Sam.1.1")
		expect(p.parse("II Samuilova 1:1").osis()).toEqual("2Sam.1.1")
		expect(p.parse("2 Samuilova 1:1").osis()).toEqual("2Sam.1.1")
		expect(p.parse("Druga Sam 1:1").osis()).toEqual("2Sam.1.1")
		expect(p.parse("II. Sam 1:1").osis()).toEqual("2Sam.1.1")
		expect(p.parse("2. Sam 1:1").osis()).toEqual("2Sam.1.1")
		expect(p.parse("II Sam 1:1").osis()).toEqual("2Sam.1.1")
		expect(p.parse("2 Sam 1:1").osis()).toEqual("2Sam.1.1")
		expect(p.parse("2Sam 1:1").osis()).toEqual("2Sam.1.1")
		p.include_apocrypha(false)
		expect(p.parse("DRUGA SAMUILOVA 1:1").osis()).toEqual("2Sam.1.1")
		expect(p.parse("II. SAMUILOVA 1:1").osis()).toEqual("2Sam.1.1")
		expect(p.parse("2. SAMUILOVA 1:1").osis()).toEqual("2Sam.1.1")
		expect(p.parse("II SAMUILOVA 1:1").osis()).toEqual("2Sam.1.1")
		expect(p.parse("2 SAMUILOVA 1:1").osis()).toEqual("2Sam.1.1")
		expect(p.parse("DRUGA SAM 1:1").osis()).toEqual("2Sam.1.1")
		expect(p.parse("II. SAM 1:1").osis()).toEqual("2Sam.1.1")
		expect(p.parse("2. SAM 1:1").osis()).toEqual("2Sam.1.1")
		expect(p.parse("II SAM 1:1").osis()).toEqual("2Sam.1.1")
		expect(p.parse("2 SAM 1:1").osis()).toEqual("2Sam.1.1")
		expect(p.parse("2SAM 1:1").osis()).toEqual("2Sam.1.1")
		;
      return true;
    });
  });

  describe("Localized book 1Sam (sr)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser;
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    return it("should handle book: 1Sam (sr)", function() {
      
		expect(p.parse("Prva Samuilova 1:1").osis()).toEqual("1Sam.1.1")
		expect(p.parse("1. Samuilova 1:1").osis()).toEqual("1Sam.1.1")
		expect(p.parse("I. Samuilova 1:1").osis()).toEqual("1Sam.1.1")
		expect(p.parse("1 Samuilova 1:1").osis()).toEqual("1Sam.1.1")
		expect(p.parse("I Samuilova 1:1").osis()).toEqual("1Sam.1.1")
		expect(p.parse("Prva Sam 1:1").osis()).toEqual("1Sam.1.1")
		expect(p.parse("1. Sam 1:1").osis()).toEqual("1Sam.1.1")
		expect(p.parse("I. Sam 1:1").osis()).toEqual("1Sam.1.1")
		expect(p.parse("1 Sam 1:1").osis()).toEqual("1Sam.1.1")
		expect(p.parse("I Sam 1:1").osis()).toEqual("1Sam.1.1")
		expect(p.parse("1Sam 1:1").osis()).toEqual("1Sam.1.1")
		p.include_apocrypha(false)
		expect(p.parse("PRVA SAMUILOVA 1:1").osis()).toEqual("1Sam.1.1")
		expect(p.parse("1. SAMUILOVA 1:1").osis()).toEqual("1Sam.1.1")
		expect(p.parse("I. SAMUILOVA 1:1").osis()).toEqual("1Sam.1.1")
		expect(p.parse("1 SAMUILOVA 1:1").osis()).toEqual("1Sam.1.1")
		expect(p.parse("I SAMUILOVA 1:1").osis()).toEqual("1Sam.1.1")
		expect(p.parse("PRVA SAM 1:1").osis()).toEqual("1Sam.1.1")
		expect(p.parse("1. SAM 1:1").osis()).toEqual("1Sam.1.1")
		expect(p.parse("I. SAM 1:1").osis()).toEqual("1Sam.1.1")
		expect(p.parse("1 SAM 1:1").osis()).toEqual("1Sam.1.1")
		expect(p.parse("I SAM 1:1").osis()).toEqual("1Sam.1.1")
		expect(p.parse("1SAM 1:1").osis()).toEqual("1Sam.1.1")
		;
      return true;
    });
  });

  describe("Localized book 2Kgs (sr)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser;
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    return it("should handle book: 2Kgs (sr)", function() {
      
		expect(p.parse("Druga O Carevima 1:1").osis()).toEqual("2Kgs.1.1")
		expect(p.parse("Druga Carevima 1:1").osis()).toEqual("2Kgs.1.1")
		expect(p.parse("II. O Carevima 1:1").osis()).toEqual("2Kgs.1.1")
		expect(p.parse("2. O Carevima 1:1").osis()).toEqual("2Kgs.1.1")
		expect(p.parse("II O Carevima 1:1").osis()).toEqual("2Kgs.1.1")
		expect(p.parse("2 O Carevima 1:1").osis()).toEqual("2Kgs.1.1")
		expect(p.parse("II. Carevima 1:1").osis()).toEqual("2Kgs.1.1")
		expect(p.parse("2. Carevima 1:1").osis()).toEqual("2Kgs.1.1")
		expect(p.parse("II Carevima 1:1").osis()).toEqual("2Kgs.1.1")
		expect(p.parse("2 Carevima 1:1").osis()).toEqual("2Kgs.1.1")
		expect(p.parse("Druga Car 1:1").osis()).toEqual("2Kgs.1.1")
		expect(p.parse("II. Car 1:1").osis()).toEqual("2Kgs.1.1")
		expect(p.parse("2. Car 1:1").osis()).toEqual("2Kgs.1.1")
		expect(p.parse("II Car 1:1").osis()).toEqual("2Kgs.1.1")
		expect(p.parse("2 Car 1:1").osis()).toEqual("2Kgs.1.1")
		expect(p.parse("2Kgs 1:1").osis()).toEqual("2Kgs.1.1")
		p.include_apocrypha(false)
		expect(p.parse("DRUGA O CAREVIMA 1:1").osis()).toEqual("2Kgs.1.1")
		expect(p.parse("DRUGA CAREVIMA 1:1").osis()).toEqual("2Kgs.1.1")
		expect(p.parse("II. O CAREVIMA 1:1").osis()).toEqual("2Kgs.1.1")
		expect(p.parse("2. O CAREVIMA 1:1").osis()).toEqual("2Kgs.1.1")
		expect(p.parse("II O CAREVIMA 1:1").osis()).toEqual("2Kgs.1.1")
		expect(p.parse("2 O CAREVIMA 1:1").osis()).toEqual("2Kgs.1.1")
		expect(p.parse("II. CAREVIMA 1:1").osis()).toEqual("2Kgs.1.1")
		expect(p.parse("2. CAREVIMA 1:1").osis()).toEqual("2Kgs.1.1")
		expect(p.parse("II CAREVIMA 1:1").osis()).toEqual("2Kgs.1.1")
		expect(p.parse("2 CAREVIMA 1:1").osis()).toEqual("2Kgs.1.1")
		expect(p.parse("DRUGA CAR 1:1").osis()).toEqual("2Kgs.1.1")
		expect(p.parse("II. CAR 1:1").osis()).toEqual("2Kgs.1.1")
		expect(p.parse("2. CAR 1:1").osis()).toEqual("2Kgs.1.1")
		expect(p.parse("II CAR 1:1").osis()).toEqual("2Kgs.1.1")
		expect(p.parse("2 CAR 1:1").osis()).toEqual("2Kgs.1.1")
		expect(p.parse("2KGS 1:1").osis()).toEqual("2Kgs.1.1")
		;
      return true;
    });
  });

  describe("Localized book 1Kgs (sr)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser;
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    return it("should handle book: 1Kgs (sr)", function() {
      
		expect(p.parse("Prva O Carevima 1:1").osis()).toEqual("1Kgs.1.1")
		expect(p.parse("1. O Carevima 1:1").osis()).toEqual("1Kgs.1.1")
		expect(p.parse("I. O Carevima 1:1").osis()).toEqual("1Kgs.1.1")
		expect(p.parse("Prva Carevima 1:1").osis()).toEqual("1Kgs.1.1")
		expect(p.parse("1 O Carevima 1:1").osis()).toEqual("1Kgs.1.1")
		expect(p.parse("I O Carevima 1:1").osis()).toEqual("1Kgs.1.1")
		expect(p.parse("1. Carevima 1:1").osis()).toEqual("1Kgs.1.1")
		expect(p.parse("I. Carevima 1:1").osis()).toEqual("1Kgs.1.1")
		expect(p.parse("1 Carevima 1:1").osis()).toEqual("1Kgs.1.1")
		expect(p.parse("I Carevima 1:1").osis()).toEqual("1Kgs.1.1")
		expect(p.parse("Prva Car 1:1").osis()).toEqual("1Kgs.1.1")
		expect(p.parse("1. Car 1:1").osis()).toEqual("1Kgs.1.1")
		expect(p.parse("I. Car 1:1").osis()).toEqual("1Kgs.1.1")
		expect(p.parse("1 Car 1:1").osis()).toEqual("1Kgs.1.1")
		expect(p.parse("I Car 1:1").osis()).toEqual("1Kgs.1.1")
		expect(p.parse("1Kgs 1:1").osis()).toEqual("1Kgs.1.1")
		p.include_apocrypha(false)
		expect(p.parse("PRVA O CAREVIMA 1:1").osis()).toEqual("1Kgs.1.1")
		expect(p.parse("1. O CAREVIMA 1:1").osis()).toEqual("1Kgs.1.1")
		expect(p.parse("I. O CAREVIMA 1:1").osis()).toEqual("1Kgs.1.1")
		expect(p.parse("PRVA CAREVIMA 1:1").osis()).toEqual("1Kgs.1.1")
		expect(p.parse("1 O CAREVIMA 1:1").osis()).toEqual("1Kgs.1.1")
		expect(p.parse("I O CAREVIMA 1:1").osis()).toEqual("1Kgs.1.1")
		expect(p.parse("1. CAREVIMA 1:1").osis()).toEqual("1Kgs.1.1")
		expect(p.parse("I. CAREVIMA 1:1").osis()).toEqual("1Kgs.1.1")
		expect(p.parse("1 CAREVIMA 1:1").osis()).toEqual("1Kgs.1.1")
		expect(p.parse("I CAREVIMA 1:1").osis()).toEqual("1Kgs.1.1")
		expect(p.parse("PRVA CAR 1:1").osis()).toEqual("1Kgs.1.1")
		expect(p.parse("1. CAR 1:1").osis()).toEqual("1Kgs.1.1")
		expect(p.parse("I. CAR 1:1").osis()).toEqual("1Kgs.1.1")
		expect(p.parse("1 CAR 1:1").osis()).toEqual("1Kgs.1.1")
		expect(p.parse("I CAR 1:1").osis()).toEqual("1Kgs.1.1")
		expect(p.parse("1KGS 1:1").osis()).toEqual("1Kgs.1.1")
		;
      return true;
    });
  });

  describe("Localized book 2Chr (sr)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser;
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    return it("should handle book: 2Chr (sr)", function() {
      
		expect(p.parse("Druga Dnevnika 1:1").osis()).toEqual("2Chr.1.1")
		expect(p.parse("II. Dnevnika 1:1").osis()).toEqual("2Chr.1.1")
		expect(p.parse("2. Dnevnika 1:1").osis()).toEqual("2Chr.1.1")
		expect(p.parse("II Dnevnika 1:1").osis()).toEqual("2Chr.1.1")
		expect(p.parse("2 Dnevnika 1:1").osis()).toEqual("2Chr.1.1")
		expect(p.parse("Druga Dnev 1:1").osis()).toEqual("2Chr.1.1")
		expect(p.parse("II. Dnev 1:1").osis()).toEqual("2Chr.1.1")
		expect(p.parse("2. Dnev 1:1").osis()).toEqual("2Chr.1.1")
		expect(p.parse("II Dnev 1:1").osis()).toEqual("2Chr.1.1")
		expect(p.parse("2 Dnev 1:1").osis()).toEqual("2Chr.1.1")
		expect(p.parse("2Chr 1:1").osis()).toEqual("2Chr.1.1")
		p.include_apocrypha(false)
		expect(p.parse("DRUGA DNEVNIKA 1:1").osis()).toEqual("2Chr.1.1")
		expect(p.parse("II. DNEVNIKA 1:1").osis()).toEqual("2Chr.1.1")
		expect(p.parse("2. DNEVNIKA 1:1").osis()).toEqual("2Chr.1.1")
		expect(p.parse("II DNEVNIKA 1:1").osis()).toEqual("2Chr.1.1")
		expect(p.parse("2 DNEVNIKA 1:1").osis()).toEqual("2Chr.1.1")
		expect(p.parse("DRUGA DNEV 1:1").osis()).toEqual("2Chr.1.1")
		expect(p.parse("II. DNEV 1:1").osis()).toEqual("2Chr.1.1")
		expect(p.parse("2. DNEV 1:1").osis()).toEqual("2Chr.1.1")
		expect(p.parse("II DNEV 1:1").osis()).toEqual("2Chr.1.1")
		expect(p.parse("2 DNEV 1:1").osis()).toEqual("2Chr.1.1")
		expect(p.parse("2CHR 1:1").osis()).toEqual("2Chr.1.1")
		;
      return true;
    });
  });

  describe("Localized book 1Chr (sr)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser;
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    return it("should handle book: 1Chr (sr)", function() {
      
		expect(p.parse("Prva Dnevnika 1:1").osis()).toEqual("1Chr.1.1")
		expect(p.parse("1. Dnevnika 1:1").osis()).toEqual("1Chr.1.1")
		expect(p.parse("I. Dnevnika 1:1").osis()).toEqual("1Chr.1.1")
		expect(p.parse("1 Dnevnika 1:1").osis()).toEqual("1Chr.1.1")
		expect(p.parse("I Dnevnika 1:1").osis()).toEqual("1Chr.1.1")
		expect(p.parse("Prva Dnev 1:1").osis()).toEqual("1Chr.1.1")
		expect(p.parse("1. Dnev 1:1").osis()).toEqual("1Chr.1.1")
		expect(p.parse("I. Dnev 1:1").osis()).toEqual("1Chr.1.1")
		expect(p.parse("1 Dnev 1:1").osis()).toEqual("1Chr.1.1")
		expect(p.parse("I Dnev 1:1").osis()).toEqual("1Chr.1.1")
		expect(p.parse("1Chr 1:1").osis()).toEqual("1Chr.1.1")
		p.include_apocrypha(false)
		expect(p.parse("PRVA DNEVNIKA 1:1").osis()).toEqual("1Chr.1.1")
		expect(p.parse("1. DNEVNIKA 1:1").osis()).toEqual("1Chr.1.1")
		expect(p.parse("I. DNEVNIKA 1:1").osis()).toEqual("1Chr.1.1")
		expect(p.parse("1 DNEVNIKA 1:1").osis()).toEqual("1Chr.1.1")
		expect(p.parse("I DNEVNIKA 1:1").osis()).toEqual("1Chr.1.1")
		expect(p.parse("PRVA DNEV 1:1").osis()).toEqual("1Chr.1.1")
		expect(p.parse("1. DNEV 1:1").osis()).toEqual("1Chr.1.1")
		expect(p.parse("I. DNEV 1:1").osis()).toEqual("1Chr.1.1")
		expect(p.parse("1 DNEV 1:1").osis()).toEqual("1Chr.1.1")
		expect(p.parse("I DNEV 1:1").osis()).toEqual("1Chr.1.1")
		expect(p.parse("1CHR 1:1").osis()).toEqual("1Chr.1.1")
		;
      return true;
    });
  });

  describe("Localized book Ezra (sr)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser;
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    return it("should handle book: Ezra (sr)", function() {
      
		expect(p.parse("Jezdra 1:1").osis()).toEqual("Ezra.1.1")
		expect(p.parse("Ezra 1:1").osis()).toEqual("Ezra.1.1")
		expect(p.parse("Jezd 1:1").osis()).toEqual("Ezra.1.1")
		p.include_apocrypha(false)
		expect(p.parse("JEZDRA 1:1").osis()).toEqual("Ezra.1.1")
		expect(p.parse("EZRA 1:1").osis()).toEqual("Ezra.1.1")
		expect(p.parse("JEZD 1:1").osis()).toEqual("Ezra.1.1")
		;
      return true;
    });
  });

  describe("Localized book Neh (sr)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser;
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    return it("should handle book: Neh (sr)", function() {
      
		expect(p.parse("Nemija 1:1").osis()).toEqual("Neh.1.1")
		expect(p.parse("Neh 1:1").osis()).toEqual("Neh.1.1")
		expect(p.parse("Nem 1:1").osis()).toEqual("Neh.1.1")
		p.include_apocrypha(false)
		expect(p.parse("NEMIJA 1:1").osis()).toEqual("Neh.1.1")
		expect(p.parse("NEH 1:1").osis()).toEqual("Neh.1.1")
		expect(p.parse("NEM 1:1").osis()).toEqual("Neh.1.1")
		;
      return true;
    });
  });

  describe("Localized book GkEsth (sr)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser;
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    return it("should handle book: GkEsth (sr)", function() {
      
		expect(p.parse("GkEsth 1:1").osis()).toEqual("GkEsth.1.1")
		;
      return true;
    });
  });

  describe("Localized book Esth (sr)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser;
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    return it("should handle book: Esth (sr)", function() {
      
		expect(p.parse("Jestira 1:1").osis()).toEqual("Esth.1.1")
		expect(p.parse("Esth 1:1").osis()).toEqual("Esth.1.1")
		expect(p.parse("Jest 1:1").osis()).toEqual("Esth.1.1")
		p.include_apocrypha(false)
		expect(p.parse("JESTIRA 1:1").osis()).toEqual("Esth.1.1")
		expect(p.parse("ESTH 1:1").osis()).toEqual("Esth.1.1")
		expect(p.parse("JEST 1:1").osis()).toEqual("Esth.1.1")
		;
      return true;
    });
  });

  describe("Localized book Ps (sr)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser;
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    return it("should handle book: Ps (sr)", function() {
      
		expect(p.parse("Psalam 1:1").osis()).toEqual("Ps.1.1")
		expect(p.parse("Psalmi 1:1").osis()).toEqual("Ps.1.1")
		expect(p.parse("Psal 1:1").osis()).toEqual("Ps.1.1")
		expect(p.parse("Ps 1:1").osis()).toEqual("Ps.1.1")
		p.include_apocrypha(false)
		expect(p.parse("PSALAM 1:1").osis()).toEqual("Ps.1.1")
		expect(p.parse("PSALMI 1:1").osis()).toEqual("Ps.1.1")
		expect(p.parse("PSAL 1:1").osis()).toEqual("Ps.1.1")
		expect(p.parse("PS 1:1").osis()).toEqual("Ps.1.1")
		;
      return true;
    });
  });

  describe("Localized book PrAzar (sr)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser;
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    return it("should handle book: PrAzar (sr)", function() {
      
		expect(p.parse("PrAzar 1:1").osis()).toEqual("PrAzar.1.1")
		;
      return true;
    });
  });

  describe("Localized book Prov (sr)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser;
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    return it("should handle book: Prov (sr)", function() {
      
		expect(p.parse("Price Solomunove 1:1").osis()).toEqual("Prov.1.1")
		expect(p.parse("Priče Solomunove 1:1").osis()).toEqual("Prov.1.1")
		expect(p.parse("Price 1:1").osis()).toEqual("Prov.1.1")
		expect(p.parse("Priče 1:1").osis()).toEqual("Prov.1.1")
		expect(p.parse("Prov 1:1").osis()).toEqual("Prov.1.1")
		p.include_apocrypha(false)
		expect(p.parse("PRICE SOLOMUNOVE 1:1").osis()).toEqual("Prov.1.1")
		expect(p.parse("PRIČE SOLOMUNOVE 1:1").osis()).toEqual("Prov.1.1")
		expect(p.parse("PRICE 1:1").osis()).toEqual("Prov.1.1")
		expect(p.parse("PRIČE 1:1").osis()).toEqual("Prov.1.1")
		expect(p.parse("PROV 1:1").osis()).toEqual("Prov.1.1")
		;
      return true;
    });
  });

  describe("Localized book Eccl (sr)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser;
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    return it("should handle book: Eccl (sr)", function() {
      
		expect(p.parse("Knjiga propovednika 1:1").osis()).toEqual("Eccl.1.1")
		expect(p.parse("Propovednika 1:1").osis()).toEqual("Eccl.1.1")
		expect(p.parse("Propovjednik 1:1").osis()).toEqual("Eccl.1.1")
		expect(p.parse("Eccl 1:1").osis()).toEqual("Eccl.1.1")
		expect(p.parse("Prop 1:1").osis()).toEqual("Eccl.1.1")
		p.include_apocrypha(false)
		expect(p.parse("KNJIGA PROPOVEDNIKA 1:1").osis()).toEqual("Eccl.1.1")
		expect(p.parse("PROPOVEDNIKA 1:1").osis()).toEqual("Eccl.1.1")
		expect(p.parse("PROPOVJEDNIK 1:1").osis()).toEqual("Eccl.1.1")
		expect(p.parse("ECCL 1:1").osis()).toEqual("Eccl.1.1")
		expect(p.parse("PROP 1:1").osis()).toEqual("Eccl.1.1")
		;
      return true;
    });
  });

  describe("Localized book SgThree (sr)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser;
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    return it("should handle book: SgThree (sr)", function() {
      
		expect(p.parse("SgThree 1:1").osis()).toEqual("SgThree.1.1")
		;
      return true;
    });
  });

  describe("Localized book Song (sr)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser;
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    return it("should handle book: Song (sr)", function() {
      
		expect(p.parse("Pjesma nad pjesmama 1:1").osis()).toEqual("Song.1.1")
		expect(p.parse("Pesma 1:1").osis()).toEqual("Song.1.1")
		expect(p.parse("Song 1:1").osis()).toEqual("Song.1.1")
		p.include_apocrypha(false)
		expect(p.parse("PJESMA NAD PJESMAMA 1:1").osis()).toEqual("Song.1.1")
		expect(p.parse("PESMA 1:1").osis()).toEqual("Song.1.1")
		expect(p.parse("SONG 1:1").osis()).toEqual("Song.1.1")
		;
      return true;
    });
  });

  describe("Localized book Jer (sr)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser;
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    return it("should handle book: Jer (sr)", function() {
      
		expect(p.parse("Jeremija 1:1").osis()).toEqual("Jer.1.1")
		expect(p.parse("Jer 1:1").osis()).toEqual("Jer.1.1")
		p.include_apocrypha(false)
		expect(p.parse("JEREMIJA 1:1").osis()).toEqual("Jer.1.1")
		expect(p.parse("JER 1:1").osis()).toEqual("Jer.1.1")
		;
      return true;
    });
  });

  describe("Localized book Ezek (sr)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser;
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    return it("should handle book: Ezek (sr)", function() {
      
		expect(p.parse("Jezekilj 1:1").osis()).toEqual("Ezek.1.1")
		expect(p.parse("Jezek 1:1").osis()).toEqual("Ezek.1.1")
		expect(p.parse("Ezek 1:1").osis()).toEqual("Ezek.1.1")
		p.include_apocrypha(false)
		expect(p.parse("JEZEKILJ 1:1").osis()).toEqual("Ezek.1.1")
		expect(p.parse("JEZEK 1:1").osis()).toEqual("Ezek.1.1")
		expect(p.parse("EZEK 1:1").osis()).toEqual("Ezek.1.1")
		;
      return true;
    });
  });

  describe("Localized book Dan (sr)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser;
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    return it("should handle book: Dan (sr)", function() {
      
		expect(p.parse("Danilo 1:1").osis()).toEqual("Dan.1.1")
		expect(p.parse("Dan 1:1").osis()).toEqual("Dan.1.1")
		p.include_apocrypha(false)
		expect(p.parse("DANILO 1:1").osis()).toEqual("Dan.1.1")
		expect(p.parse("DAN 1:1").osis()).toEqual("Dan.1.1")
		;
      return true;
    });
  });

  describe("Localized book Amos (sr)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser;
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    return it("should handle book: Amos (sr)", function() {
      
		expect(p.parse("Amos 1:1").osis()).toEqual("Amos.1.1")
		p.include_apocrypha(false)
		expect(p.parse("AMOS 1:1").osis()).toEqual("Amos.1.1")
		;
      return true;
    });
  });

  describe("Localized book Hos (sr)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser;
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    return it("should handle book: Hos (sr)", function() {
      
		expect(p.parse("Osija 1:1").osis()).toEqual("Hos.1.1")
		expect(p.parse("Hos 1:1").osis()).toEqual("Hos.1.1")
		expect(p.parse("Os 1:1").osis()).toEqual("Hos.1.1")
		p.include_apocrypha(false)
		expect(p.parse("OSIJA 1:1").osis()).toEqual("Hos.1.1")
		expect(p.parse("HOS 1:1").osis()).toEqual("Hos.1.1")
		expect(p.parse("OS 1:1").osis()).toEqual("Hos.1.1")
		;
      return true;
    });
  });

  describe("Localized book Joel (sr)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser;
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    return it("should handle book: Joel (sr)", function() {
      
		expect(p.parse("Joilo 1:1").osis()).toEqual("Joel.1.1")
		expect(p.parse("Joel 1:1").osis()).toEqual("Joel.1.1")
		expect(p.parse("Joil 1:1").osis()).toEqual("Joel.1.1")
		p.include_apocrypha(false)
		expect(p.parse("JOILO 1:1").osis()).toEqual("Joel.1.1")
		expect(p.parse("JOEL 1:1").osis()).toEqual("Joel.1.1")
		expect(p.parse("JOIL 1:1").osis()).toEqual("Joel.1.1")
		;
      return true;
    });
  });

  describe("Localized book Obad (sr)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser;
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    return it("should handle book: Obad (sr)", function() {
      
		expect(p.parse("Avdija 1:1").osis()).toEqual("Obad.1.1")
		expect(p.parse("Obad 1:1").osis()).toEqual("Obad.1.1")
		expect(p.parse("Avd 1:1").osis()).toEqual("Obad.1.1")
		p.include_apocrypha(false)
		expect(p.parse("AVDIJA 1:1").osis()).toEqual("Obad.1.1")
		expect(p.parse("OBAD 1:1").osis()).toEqual("Obad.1.1")
		expect(p.parse("AVD 1:1").osis()).toEqual("Obad.1.1")
		;
      return true;
    });
  });

  describe("Localized book Jonah (sr)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser;
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    return it("should handle book: Jonah (sr)", function() {
      
		expect(p.parse("Jonah 1:1").osis()).toEqual("Jonah.1.1")
		expect(p.parse("Jona 1:1").osis()).toEqual("Jonah.1.1")
		p.include_apocrypha(false)
		expect(p.parse("JONAH 1:1").osis()).toEqual("Jonah.1.1")
		expect(p.parse("JONA 1:1").osis()).toEqual("Jonah.1.1")
		;
      return true;
    });
  });

  describe("Localized book Mic (sr)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser;
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    return it("should handle book: Mic (sr)", function() {
      
		expect(p.parse("Mihej 1:1").osis()).toEqual("Mic.1.1")
		expect(p.parse("Mic 1:1").osis()).toEqual("Mic.1.1")
		expect(p.parse("Mih 1:1").osis()).toEqual("Mic.1.1")
		p.include_apocrypha(false)
		expect(p.parse("MIHEJ 1:1").osis()).toEqual("Mic.1.1")
		expect(p.parse("MIC 1:1").osis()).toEqual("Mic.1.1")
		expect(p.parse("MIH 1:1").osis()).toEqual("Mic.1.1")
		;
      return true;
    });
  });

  describe("Localized book Nah (sr)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser;
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    return it("should handle book: Nah (sr)", function() {
      
		expect(p.parse("Naum 1:1").osis()).toEqual("Nah.1.1")
		expect(p.parse("Nah 1:1").osis()).toEqual("Nah.1.1")
		p.include_apocrypha(false)
		expect(p.parse("NAUM 1:1").osis()).toEqual("Nah.1.1")
		expect(p.parse("NAH 1:1").osis()).toEqual("Nah.1.1")
		;
      return true;
    });
  });

  describe("Localized book Hab (sr)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser;
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    return it("should handle book: Hab (sr)", function() {
      
		expect(p.parse("Avakum 1:1").osis()).toEqual("Hab.1.1")
		expect(p.parse("Avak 1:1").osis()).toEqual("Hab.1.1")
		expect(p.parse("Hab 1:1").osis()).toEqual("Hab.1.1")
		p.include_apocrypha(false)
		expect(p.parse("AVAKUM 1:1").osis()).toEqual("Hab.1.1")
		expect(p.parse("AVAK 1:1").osis()).toEqual("Hab.1.1")
		expect(p.parse("HAB 1:1").osis()).toEqual("Hab.1.1")
		;
      return true;
    });
  });

  describe("Localized book Zeph (sr)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser;
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    return it("should handle book: Zeph (sr)", function() {
      
		expect(p.parse("Sofonija 1:1").osis()).toEqual("Zeph.1.1")
		expect(p.parse("Zeph 1:1").osis()).toEqual("Zeph.1.1")
		expect(p.parse("Sof 1:1").osis()).toEqual("Zeph.1.1")
		p.include_apocrypha(false)
		expect(p.parse("SOFONIJA 1:1").osis()).toEqual("Zeph.1.1")
		expect(p.parse("ZEPH 1:1").osis()).toEqual("Zeph.1.1")
		expect(p.parse("SOF 1:1").osis()).toEqual("Zeph.1.1")
		;
      return true;
    });
  });

  describe("Localized book Hag (sr)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser;
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    return it("should handle book: Hag (sr)", function() {
      
		expect(p.parse("Agej 1:1").osis()).toEqual("Hag.1.1")
		expect(p.parse("Hag 1:1").osis()).toEqual("Hag.1.1")
		p.include_apocrypha(false)
		expect(p.parse("AGEJ 1:1").osis()).toEqual("Hag.1.1")
		expect(p.parse("HAG 1:1").osis()).toEqual("Hag.1.1")
		;
      return true;
    });
  });

  describe("Localized book Zech (sr)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser;
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    return it("should handle book: Zech (sr)", function() {
      
		expect(p.parse("Zaharija 1:1").osis()).toEqual("Zech.1.1")
		expect(p.parse("Zech 1:1").osis()).toEqual("Zech.1.1")
		expect(p.parse("Zah 1:1").osis()).toEqual("Zech.1.1")
		p.include_apocrypha(false)
		expect(p.parse("ZAHARIJA 1:1").osis()).toEqual("Zech.1.1")
		expect(p.parse("ZECH 1:1").osis()).toEqual("Zech.1.1")
		expect(p.parse("ZAH 1:1").osis()).toEqual("Zech.1.1")
		;
      return true;
    });
  });

  describe("Localized book Mal (sr)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser;
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    return it("should handle book: Mal (sr)", function() {
      
		expect(p.parse("Malahija 1:1").osis()).toEqual("Mal.1.1")
		expect(p.parse("Mal 1:1").osis()).toEqual("Mal.1.1")
		p.include_apocrypha(false)
		expect(p.parse("MALAHIJA 1:1").osis()).toEqual("Mal.1.1")
		expect(p.parse("MAL 1:1").osis()).toEqual("Mal.1.1")
		;
      return true;
    });
  });

  describe("Localized book Matt (sr)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser;
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    return it("should handle book: Matt (sr)", function() {
      
		expect(p.parse("Matej 1:1").osis()).toEqual("Matt.1.1")
		expect(p.parse("Matt 1:1").osis()).toEqual("Matt.1.1")
		expect(p.parse("Mat 1:1").osis()).toEqual("Matt.1.1")
		p.include_apocrypha(false)
		expect(p.parse("MATEJ 1:1").osis()).toEqual("Matt.1.1")
		expect(p.parse("MATT 1:1").osis()).toEqual("Matt.1.1")
		expect(p.parse("MAT 1:1").osis()).toEqual("Matt.1.1")
		;
      return true;
    });
  });

  describe("Localized book 2Macc (sr)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser;
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    return it("should handle book: 2Macc (sr)", function() {
      
		expect(p.parse("Druga Макабејаца 1:1").osis()).toEqual("2Macc.1.1")
		expect(p.parse("Druga Макавејска 1:1").osis()).toEqual("2Macc.1.1")
		expect(p.parse("Druga Макавеја 1:1").osis()).toEqual("2Macc.1.1")
		expect(p.parse("II. Макабејаца 1:1").osis()).toEqual("2Macc.1.1")
		expect(p.parse("II. Макавејска 1:1").osis()).toEqual("2Macc.1.1")
		expect(p.parse("2. Макабејаца 1:1").osis()).toEqual("2Macc.1.1")
		expect(p.parse("2. Макавејска 1:1").osis()).toEqual("2Macc.1.1")
		expect(p.parse("II Макабејаца 1:1").osis()).toEqual("2Macc.1.1")
		expect(p.parse("II Макавејска 1:1").osis()).toEqual("2Macc.1.1")
		expect(p.parse("2 Макабејаца 1:1").osis()).toEqual("2Macc.1.1")
		expect(p.parse("2 Макавејска 1:1").osis()).toEqual("2Macc.1.1")
		expect(p.parse("II. Макавеја 1:1").osis()).toEqual("2Macc.1.1")
		expect(p.parse("2. Макавеја 1:1").osis()).toEqual("2Macc.1.1")
		expect(p.parse("II Макавеја 1:1").osis()).toEqual("2Macc.1.1")
		expect(p.parse("2 Макавеја 1:1").osis()).toEqual("2Macc.1.1")
		expect(p.parse("2Macc 1:1").osis()).toEqual("2Macc.1.1")
		expect(p.parse("2 Мк 1:1").osis()).toEqual("2Macc.1.1")
		;
      return true;
    });
  });

  describe("Localized book 3Macc (sr)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser;
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    return it("should handle book: 3Macc (sr)", function() {
      
		expect(p.parse("Treca Макабејаца 1:1").osis()).toEqual("3Macc.1.1")
		expect(p.parse("Treca Макавејска 1:1").osis()).toEqual("3Macc.1.1")
		expect(p.parse("Treća Макабејаца 1:1").osis()).toEqual("3Macc.1.1")
		expect(p.parse("Treća Макавејска 1:1").osis()).toEqual("3Macc.1.1")
		expect(p.parse("III. Макабејаца 1:1").osis()).toEqual("3Macc.1.1")
		expect(p.parse("III. Макавејска 1:1").osis()).toEqual("3Macc.1.1")
		expect(p.parse("III Макабејаца 1:1").osis()).toEqual("3Macc.1.1")
		expect(p.parse("III Макавејска 1:1").osis()).toEqual("3Macc.1.1")
		expect(p.parse("Treca Макавеја 1:1").osis()).toEqual("3Macc.1.1")
		expect(p.parse("Treća Макавеја 1:1").osis()).toEqual("3Macc.1.1")
		expect(p.parse("3. Макабејаца 1:1").osis()).toEqual("3Macc.1.1")
		expect(p.parse("3. Макавејска 1:1").osis()).toEqual("3Macc.1.1")
		expect(p.parse("III. Макавеја 1:1").osis()).toEqual("3Macc.1.1")
		expect(p.parse("3 Макабејаца 1:1").osis()).toEqual("3Macc.1.1")
		expect(p.parse("3 Макавејска 1:1").osis()).toEqual("3Macc.1.1")
		expect(p.parse("III Макавеја 1:1").osis()).toEqual("3Macc.1.1")
		expect(p.parse("3. Макавеја 1:1").osis()).toEqual("3Macc.1.1")
		expect(p.parse("3 Макавеја 1:1").osis()).toEqual("3Macc.1.1")
		expect(p.parse("3Macc 1:1").osis()).toEqual("3Macc.1.1")
		expect(p.parse("3 Мк 1:1").osis()).toEqual("3Macc.1.1")
		;
      return true;
    });
  });

  describe("Localized book 4Macc (sr)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser;
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    return it("should handle book: 4Macc (sr)", function() {
      
		expect(p.parse("Cetvrta Макабејаца 1:1").osis()).toEqual("4Macc.1.1")
		expect(p.parse("Cetvrta Макавејска 1:1").osis()).toEqual("4Macc.1.1")
		expect(p.parse("Četvrta Макабејаца 1:1").osis()).toEqual("4Macc.1.1")
		expect(p.parse("Četvrta Макавејска 1:1").osis()).toEqual("4Macc.1.1")
		expect(p.parse("Cetvrta Макавеја 1:1").osis()).toEqual("4Macc.1.1")
		expect(p.parse("Četvrta Макавеја 1:1").osis()).toEqual("4Macc.1.1")
		expect(p.parse("IV. Макабејаца 1:1").osis()).toEqual("4Macc.1.1")
		expect(p.parse("IV. Макавејска 1:1").osis()).toEqual("4Macc.1.1")
		expect(p.parse("4. Макабејаца 1:1").osis()).toEqual("4Macc.1.1")
		expect(p.parse("4. Макавејска 1:1").osis()).toEqual("4Macc.1.1")
		expect(p.parse("IV Макабејаца 1:1").osis()).toEqual("4Macc.1.1")
		expect(p.parse("IV Макавејска 1:1").osis()).toEqual("4Macc.1.1")
		expect(p.parse("4 Макабејаца 1:1").osis()).toEqual("4Macc.1.1")
		expect(p.parse("4 Макавејска 1:1").osis()).toEqual("4Macc.1.1")
		expect(p.parse("IV. Макавеја 1:1").osis()).toEqual("4Macc.1.1")
		expect(p.parse("4. Макавеја 1:1").osis()).toEqual("4Macc.1.1")
		expect(p.parse("IV Макавеја 1:1").osis()).toEqual("4Macc.1.1")
		expect(p.parse("4 Макавеја 1:1").osis()).toEqual("4Macc.1.1")
		expect(p.parse("4Macc 1:1").osis()).toEqual("4Macc.1.1")
		expect(p.parse("4 Мк 1:1").osis()).toEqual("4Macc.1.1")
		;
      return true;
    });
  });

  describe("Localized book 1Macc (sr)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser;
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    return it("should handle book: 1Macc (sr)", function() {
      
		expect(p.parse("Prva Макабејаца 1:1").osis()).toEqual("1Macc.1.1")
		expect(p.parse("Prva Макавејска 1:1").osis()).toEqual("1Macc.1.1")
		expect(p.parse("1. Макабејаца 1:1").osis()).toEqual("1Macc.1.1")
		expect(p.parse("1. Макавејска 1:1").osis()).toEqual("1Macc.1.1")
		expect(p.parse("I. Макабејаца 1:1").osis()).toEqual("1Macc.1.1")
		expect(p.parse("I. Макавејска 1:1").osis()).toEqual("1Macc.1.1")
		expect(p.parse("Prva Макавеја 1:1").osis()).toEqual("1Macc.1.1")
		expect(p.parse("1 Макабејаца 1:1").osis()).toEqual("1Macc.1.1")
		expect(p.parse("1 Макавејска 1:1").osis()).toEqual("1Macc.1.1")
		expect(p.parse("I Макабејаца 1:1").osis()).toEqual("1Macc.1.1")
		expect(p.parse("I Макавејска 1:1").osis()).toEqual("1Macc.1.1")
		expect(p.parse("1. Макавеја 1:1").osis()).toEqual("1Macc.1.1")
		expect(p.parse("I. Макавеја 1:1").osis()).toEqual("1Macc.1.1")
		expect(p.parse("1 Макавеја 1:1").osis()).toEqual("1Macc.1.1")
		expect(p.parse("I Макавеја 1:1").osis()).toEqual("1Macc.1.1")
		expect(p.parse("1Macc 1:1").osis()).toEqual("1Macc.1.1")
		expect(p.parse("1 Мк 1:1").osis()).toEqual("1Macc.1.1")
		;
      return true;
    });
  });

  describe("Localized book Mark (sr)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser;
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    return it("should handle book: Mark (sr)", function() {
      
		expect(p.parse("Marko 1:1").osis()).toEqual("Mark.1.1")
		expect(p.parse("Mark 1:1").osis()).toEqual("Mark.1.1")
		expect(p.parse("Mar 1:1").osis()).toEqual("Mark.1.1")
		p.include_apocrypha(false)
		expect(p.parse("MARKO 1:1").osis()).toEqual("Mark.1.1")
		expect(p.parse("MARK 1:1").osis()).toEqual("Mark.1.1")
		expect(p.parse("MAR 1:1").osis()).toEqual("Mark.1.1")
		;
      return true;
    });
  });

  describe("Localized book Luke (sr)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser;
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    return it("should handle book: Luke (sr)", function() {
      
		expect(p.parse("Luka 1:1").osis()).toEqual("Luke.1.1")
		expect(p.parse("Luke 1:1").osis()).toEqual("Luke.1.1")
		p.include_apocrypha(false)
		expect(p.parse("LUKA 1:1").osis()).toEqual("Luke.1.1")
		expect(p.parse("LUKE 1:1").osis()).toEqual("Luke.1.1")
		;
      return true;
    });
  });

  describe("Localized book 1John (sr)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser;
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    return it("should handle book: 1John (sr)", function() {
      
		expect(p.parse("Prva Jovanova 1:1").osis()).toEqual("1John.1.1")
		expect(p.parse("1. Jovanova 1:1").osis()).toEqual("1John.1.1")
		expect(p.parse("I. Jovanova 1:1").osis()).toEqual("1John.1.1")
		expect(p.parse("1 Jovanova 1:1").osis()).toEqual("1John.1.1")
		expect(p.parse("I Jovanova 1:1").osis()).toEqual("1John.1.1")
		expect(p.parse("Prva Jov 1:1").osis()).toEqual("1John.1.1")
		expect(p.parse("1. Jov 1:1").osis()).toEqual("1John.1.1")
		expect(p.parse("I. Jov 1:1").osis()).toEqual("1John.1.1")
		expect(p.parse("1 Jov 1:1").osis()).toEqual("1John.1.1")
		expect(p.parse("1John 1:1").osis()).toEqual("1John.1.1")
		expect(p.parse("I Jov 1:1").osis()).toEqual("1John.1.1")
		p.include_apocrypha(false)
		expect(p.parse("PRVA JOVANOVA 1:1").osis()).toEqual("1John.1.1")
		expect(p.parse("1. JOVANOVA 1:1").osis()).toEqual("1John.1.1")
		expect(p.parse("I. JOVANOVA 1:1").osis()).toEqual("1John.1.1")
		expect(p.parse("1 JOVANOVA 1:1").osis()).toEqual("1John.1.1")
		expect(p.parse("I JOVANOVA 1:1").osis()).toEqual("1John.1.1")
		expect(p.parse("PRVA JOV 1:1").osis()).toEqual("1John.1.1")
		expect(p.parse("1. JOV 1:1").osis()).toEqual("1John.1.1")
		expect(p.parse("I. JOV 1:1").osis()).toEqual("1John.1.1")
		expect(p.parse("1 JOV 1:1").osis()).toEqual("1John.1.1")
		expect(p.parse("1JOHN 1:1").osis()).toEqual("1John.1.1")
		expect(p.parse("I JOV 1:1").osis()).toEqual("1John.1.1")
		;
      return true;
    });
  });

  describe("Localized book 2John (sr)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser;
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    return it("should handle book: 2John (sr)", function() {
      
		expect(p.parse("Druga Jovanova 1:1").osis()).toEqual("2John.1.1")
		expect(p.parse("II. Jovanova 1:1").osis()).toEqual("2John.1.1")
		expect(p.parse("2. Jovanova 1:1").osis()).toEqual("2John.1.1")
		expect(p.parse("II Jovanova 1:1").osis()).toEqual("2John.1.1")
		expect(p.parse("2 Jovanova 1:1").osis()).toEqual("2John.1.1")
		expect(p.parse("Druga Jov 1:1").osis()).toEqual("2John.1.1")
		expect(p.parse("II. Jov 1:1").osis()).toEqual("2John.1.1")
		expect(p.parse("2. Jov 1:1").osis()).toEqual("2John.1.1")
		expect(p.parse("II Jov 1:1").osis()).toEqual("2John.1.1")
		expect(p.parse("2 Jov 1:1").osis()).toEqual("2John.1.1")
		expect(p.parse("2John 1:1").osis()).toEqual("2John.1.1")
		p.include_apocrypha(false)
		expect(p.parse("DRUGA JOVANOVA 1:1").osis()).toEqual("2John.1.1")
		expect(p.parse("II. JOVANOVA 1:1").osis()).toEqual("2John.1.1")
		expect(p.parse("2. JOVANOVA 1:1").osis()).toEqual("2John.1.1")
		expect(p.parse("II JOVANOVA 1:1").osis()).toEqual("2John.1.1")
		expect(p.parse("2 JOVANOVA 1:1").osis()).toEqual("2John.1.1")
		expect(p.parse("DRUGA JOV 1:1").osis()).toEqual("2John.1.1")
		expect(p.parse("II. JOV 1:1").osis()).toEqual("2John.1.1")
		expect(p.parse("2. JOV 1:1").osis()).toEqual("2John.1.1")
		expect(p.parse("II JOV 1:1").osis()).toEqual("2John.1.1")
		expect(p.parse("2 JOV 1:1").osis()).toEqual("2John.1.1")
		expect(p.parse("2JOHN 1:1").osis()).toEqual("2John.1.1")
		;
      return true;
    });
  });

  describe("Localized book 3John (sr)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser;
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    return it("should handle book: 3John (sr)", function() {
      
		expect(p.parse("Treca Jovanova 1:1").osis()).toEqual("3John.1.1")
		expect(p.parse("Treća Jovanova 1:1").osis()).toEqual("3John.1.1")
		expect(p.parse("III. Jovanova 1:1").osis()).toEqual("3John.1.1")
		expect(p.parse("III Jovanova 1:1").osis()).toEqual("3John.1.1")
		expect(p.parse("3. Jovanova 1:1").osis()).toEqual("3John.1.1")
		expect(p.parse("3 Jovanova 1:1").osis()).toEqual("3John.1.1")
		expect(p.parse("Treca Jov 1:1").osis()).toEqual("3John.1.1")
		expect(p.parse("Treća Jov 1:1").osis()).toEqual("3John.1.1")
		expect(p.parse("III. Jov 1:1").osis()).toEqual("3John.1.1")
		expect(p.parse("III Jov 1:1").osis()).toEqual("3John.1.1")
		expect(p.parse("3. Jov 1:1").osis()).toEqual("3John.1.1")
		expect(p.parse("3 Jov 1:1").osis()).toEqual("3John.1.1")
		expect(p.parse("3John 1:1").osis()).toEqual("3John.1.1")
		p.include_apocrypha(false)
		expect(p.parse("TRECA JOVANOVA 1:1").osis()).toEqual("3John.1.1")
		expect(p.parse("TREĆA JOVANOVA 1:1").osis()).toEqual("3John.1.1")
		expect(p.parse("III. JOVANOVA 1:1").osis()).toEqual("3John.1.1")
		expect(p.parse("III JOVANOVA 1:1").osis()).toEqual("3John.1.1")
		expect(p.parse("3. JOVANOVA 1:1").osis()).toEqual("3John.1.1")
		expect(p.parse("3 JOVANOVA 1:1").osis()).toEqual("3John.1.1")
		expect(p.parse("TRECA JOV 1:1").osis()).toEqual("3John.1.1")
		expect(p.parse("TREĆA JOV 1:1").osis()).toEqual("3John.1.1")
		expect(p.parse("III. JOV 1:1").osis()).toEqual("3John.1.1")
		expect(p.parse("III JOV 1:1").osis()).toEqual("3John.1.1")
		expect(p.parse("3. JOV 1:1").osis()).toEqual("3John.1.1")
		expect(p.parse("3 JOV 1:1").osis()).toEqual("3John.1.1")
		expect(p.parse("3JOHN 1:1").osis()).toEqual("3John.1.1")
		;
      return true;
    });
  });

  describe("Localized book John (sr)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser;
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    return it("should handle book: John (sr)", function() {
      
		expect(p.parse("Jovan 1:1").osis()).toEqual("John.1.1")
		expect(p.parse("John 1:1").osis()).toEqual("John.1.1")
		p.include_apocrypha(false)
		expect(p.parse("JOVAN 1:1").osis()).toEqual("John.1.1")
		expect(p.parse("JOHN 1:1").osis()).toEqual("John.1.1")
		;
      return true;
    });
  });

  describe("Localized book Job (sr)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser;
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    return it("should handle book: Job (sr)", function() {
      
		expect(p.parse("O Jovu 1:1").osis()).toEqual("Job.1.1")
		expect(p.parse("Job 1:1").osis()).toEqual("Job.1.1")
		expect(p.parse("Jov 1:1").osis()).toEqual("Job.1.1")
		p.include_apocrypha(false)
		expect(p.parse("O JOVU 1:1").osis()).toEqual("Job.1.1")
		expect(p.parse("JOB 1:1").osis()).toEqual("Job.1.1")
		expect(p.parse("JOV 1:1").osis()).toEqual("Job.1.1")
		;
      return true;
    });
  });

  describe("Localized book Acts (sr)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser;
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    return it("should handle book: Acts (sr)", function() {
      
		expect(p.parse("Djela apostolska 1:1").osis()).toEqual("Acts.1.1")
		expect(p.parse("Acts 1:1").osis()).toEqual("Acts.1.1")
		expect(p.parse("Dela 1:1").osis()).toEqual("Acts.1.1")
		p.include_apocrypha(false)
		expect(p.parse("DJELA APOSTOLSKA 1:1").osis()).toEqual("Acts.1.1")
		expect(p.parse("ACTS 1:1").osis()).toEqual("Acts.1.1")
		expect(p.parse("DELA 1:1").osis()).toEqual("Acts.1.1")
		;
      return true;
    });
  });

  describe("Localized book Rom (sr)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser;
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    return it("should handle book: Rom (sr)", function() {
      
		expect(p.parse("Rimljanima 1:1").osis()).toEqual("Rom.1.1")
		expect(p.parse("Rim 1:1").osis()).toEqual("Rom.1.1")
		expect(p.parse("Rom 1:1").osis()).toEqual("Rom.1.1")
		p.include_apocrypha(false)
		expect(p.parse("RIMLJANIMA 1:1").osis()).toEqual("Rom.1.1")
		expect(p.parse("RIM 1:1").osis()).toEqual("Rom.1.1")
		expect(p.parse("ROM 1:1").osis()).toEqual("Rom.1.1")
		;
      return true;
    });
  });

  describe("Localized book 2Cor (sr)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser;
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    return it("should handle book: 2Cor (sr)", function() {
      
		expect(p.parse("Druga Korincanima 1:1").osis()).toEqual("2Cor.1.1")
		expect(p.parse("Druga Korinćanima 1:1").osis()).toEqual("2Cor.1.1")
		expect(p.parse("II. Korincanima 1:1").osis()).toEqual("2Cor.1.1")
		expect(p.parse("II. Korinćanima 1:1").osis()).toEqual("2Cor.1.1")
		expect(p.parse("2. Korincanima 1:1").osis()).toEqual("2Cor.1.1")
		expect(p.parse("2. Korinćanima 1:1").osis()).toEqual("2Cor.1.1")
		expect(p.parse("II Korincanima 1:1").osis()).toEqual("2Cor.1.1")
		expect(p.parse("II Korinćanima 1:1").osis()).toEqual("2Cor.1.1")
		expect(p.parse("2 Korincanima 1:1").osis()).toEqual("2Cor.1.1")
		expect(p.parse("2 Korinćanima 1:1").osis()).toEqual("2Cor.1.1")
		expect(p.parse("Druga Kor 1:1").osis()).toEqual("2Cor.1.1")
		expect(p.parse("II. Kor 1:1").osis()).toEqual("2Cor.1.1")
		expect(p.parse("2. Kor 1:1").osis()).toEqual("2Cor.1.1")
		expect(p.parse("II Kor 1:1").osis()).toEqual("2Cor.1.1")
		expect(p.parse("2 Kor 1:1").osis()).toEqual("2Cor.1.1")
		expect(p.parse("2Cor 1:1").osis()).toEqual("2Cor.1.1")
		p.include_apocrypha(false)
		expect(p.parse("DRUGA KORINCANIMA 1:1").osis()).toEqual("2Cor.1.1")
		expect(p.parse("DRUGA KORINĆANIMA 1:1").osis()).toEqual("2Cor.1.1")
		expect(p.parse("II. KORINCANIMA 1:1").osis()).toEqual("2Cor.1.1")
		expect(p.parse("II. KORINĆANIMA 1:1").osis()).toEqual("2Cor.1.1")
		expect(p.parse("2. KORINCANIMA 1:1").osis()).toEqual("2Cor.1.1")
		expect(p.parse("2. KORINĆANIMA 1:1").osis()).toEqual("2Cor.1.1")
		expect(p.parse("II KORINCANIMA 1:1").osis()).toEqual("2Cor.1.1")
		expect(p.parse("II KORINĆANIMA 1:1").osis()).toEqual("2Cor.1.1")
		expect(p.parse("2 KORINCANIMA 1:1").osis()).toEqual("2Cor.1.1")
		expect(p.parse("2 KORINĆANIMA 1:1").osis()).toEqual("2Cor.1.1")
		expect(p.parse("DRUGA KOR 1:1").osis()).toEqual("2Cor.1.1")
		expect(p.parse("II. KOR 1:1").osis()).toEqual("2Cor.1.1")
		expect(p.parse("2. KOR 1:1").osis()).toEqual("2Cor.1.1")
		expect(p.parse("II KOR 1:1").osis()).toEqual("2Cor.1.1")
		expect(p.parse("2 KOR 1:1").osis()).toEqual("2Cor.1.1")
		expect(p.parse("2COR 1:1").osis()).toEqual("2Cor.1.1")
		;
      return true;
    });
  });

  describe("Localized book 1Cor (sr)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser;
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    return it("should handle book: 1Cor (sr)", function() {
      
		expect(p.parse("Prva Korincanima 1:1").osis()).toEqual("1Cor.1.1")
		expect(p.parse("Prva Korinćanima 1:1").osis()).toEqual("1Cor.1.1")
		expect(p.parse("1. Korincanima 1:1").osis()).toEqual("1Cor.1.1")
		expect(p.parse("1. Korinćanima 1:1").osis()).toEqual("1Cor.1.1")
		expect(p.parse("I. Korincanima 1:1").osis()).toEqual("1Cor.1.1")
		expect(p.parse("I. Korinćanima 1:1").osis()).toEqual("1Cor.1.1")
		expect(p.parse("1 Korincanima 1:1").osis()).toEqual("1Cor.1.1")
		expect(p.parse("1 Korinćanima 1:1").osis()).toEqual("1Cor.1.1")
		expect(p.parse("I Korincanima 1:1").osis()).toEqual("1Cor.1.1")
		expect(p.parse("I Korinćanima 1:1").osis()).toEqual("1Cor.1.1")
		expect(p.parse("Prva Kor 1:1").osis()).toEqual("1Cor.1.1")
		expect(p.parse("1. Kor 1:1").osis()).toEqual("1Cor.1.1")
		expect(p.parse("I. Kor 1:1").osis()).toEqual("1Cor.1.1")
		expect(p.parse("1 Kor 1:1").osis()).toEqual("1Cor.1.1")
		expect(p.parse("I Kor 1:1").osis()).toEqual("1Cor.1.1")
		expect(p.parse("1Cor 1:1").osis()).toEqual("1Cor.1.1")
		p.include_apocrypha(false)
		expect(p.parse("PRVA KORINCANIMA 1:1").osis()).toEqual("1Cor.1.1")
		expect(p.parse("PRVA KORINĆANIMA 1:1").osis()).toEqual("1Cor.1.1")
		expect(p.parse("1. KORINCANIMA 1:1").osis()).toEqual("1Cor.1.1")
		expect(p.parse("1. KORINĆANIMA 1:1").osis()).toEqual("1Cor.1.1")
		expect(p.parse("I. KORINCANIMA 1:1").osis()).toEqual("1Cor.1.1")
		expect(p.parse("I. KORINĆANIMA 1:1").osis()).toEqual("1Cor.1.1")
		expect(p.parse("1 KORINCANIMA 1:1").osis()).toEqual("1Cor.1.1")
		expect(p.parse("1 KORINĆANIMA 1:1").osis()).toEqual("1Cor.1.1")
		expect(p.parse("I KORINCANIMA 1:1").osis()).toEqual("1Cor.1.1")
		expect(p.parse("I KORINĆANIMA 1:1").osis()).toEqual("1Cor.1.1")
		expect(p.parse("PRVA KOR 1:1").osis()).toEqual("1Cor.1.1")
		expect(p.parse("1. KOR 1:1").osis()).toEqual("1Cor.1.1")
		expect(p.parse("I. KOR 1:1").osis()).toEqual("1Cor.1.1")
		expect(p.parse("1 KOR 1:1").osis()).toEqual("1Cor.1.1")
		expect(p.parse("I KOR 1:1").osis()).toEqual("1Cor.1.1")
		expect(p.parse("1COR 1:1").osis()).toEqual("1Cor.1.1")
		;
      return true;
    });
  });

  describe("Localized book Gal (sr)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser;
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    return it("should handle book: Gal (sr)", function() {
      
		expect(p.parse("Galatima 1:1").osis()).toEqual("Gal.1.1")
		expect(p.parse("Gal 1:1").osis()).toEqual("Gal.1.1")
		p.include_apocrypha(false)
		expect(p.parse("GALATIMA 1:1").osis()).toEqual("Gal.1.1")
		expect(p.parse("GAL 1:1").osis()).toEqual("Gal.1.1")
		;
      return true;
    });
  });

  describe("Localized book Eph (sr)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser;
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    return it("should handle book: Eph (sr)", function() {
      
		expect(p.parse("Efescima 1:1").osis()).toEqual("Eph.1.1")
		expect(p.parse("Eph 1:1").osis()).toEqual("Eph.1.1")
		expect(p.parse("Ef 1:1").osis()).toEqual("Eph.1.1")
		p.include_apocrypha(false)
		expect(p.parse("EFESCIMA 1:1").osis()).toEqual("Eph.1.1")
		expect(p.parse("EPH 1:1").osis()).toEqual("Eph.1.1")
		expect(p.parse("EF 1:1").osis()).toEqual("Eph.1.1")
		;
      return true;
    });
  });

  describe("Localized book Phil (sr)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser;
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    return it("should handle book: Phil (sr)", function() {
      
		expect(p.parse("Filibljanima 1:1").osis()).toEqual("Phil.1.1")
		expect(p.parse("Phil 1:1").osis()).toEqual("Phil.1.1")
		expect(p.parse("Fil 1:1").osis()).toEqual("Phil.1.1")
		p.include_apocrypha(false)
		expect(p.parse("FILIBLJANIMA 1:1").osis()).toEqual("Phil.1.1")
		expect(p.parse("PHIL 1:1").osis()).toEqual("Phil.1.1")
		expect(p.parse("FIL 1:1").osis()).toEqual("Phil.1.1")
		;
      return true;
    });
  });

  describe("Localized book Col (sr)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser;
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    return it("should handle book: Col (sr)", function() {
      
		expect(p.parse("Kolosanima 1:1").osis()).toEqual("Col.1.1")
		expect(p.parse("Kološanima 1:1").osis()).toEqual("Col.1.1")
		expect(p.parse("Col 1:1").osis()).toEqual("Col.1.1")
		expect(p.parse("Kol 1:1").osis()).toEqual("Col.1.1")
		p.include_apocrypha(false)
		expect(p.parse("KOLOSANIMA 1:1").osis()).toEqual("Col.1.1")
		expect(p.parse("KOLOŠANIMA 1:1").osis()).toEqual("Col.1.1")
		expect(p.parse("COL 1:1").osis()).toEqual("Col.1.1")
		expect(p.parse("KOL 1:1").osis()).toEqual("Col.1.1")
		;
      return true;
    });
  });

  describe("Localized book 2Thess (sr)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser;
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    return it("should handle book: 2Thess (sr)", function() {
      
		expect(p.parse("Druga Solunjanima 1:1").osis()).toEqual("2Thess.1.1")
		expect(p.parse("II. Solunjanima 1:1").osis()).toEqual("2Thess.1.1")
		expect(p.parse("2. Solunjanima 1:1").osis()).toEqual("2Thess.1.1")
		expect(p.parse("II Solunjanima 1:1").osis()).toEqual("2Thess.1.1")
		expect(p.parse("2 Solunjanima 1:1").osis()).toEqual("2Thess.1.1")
		expect(p.parse("Druga Sol 1:1").osis()).toEqual("2Thess.1.1")
		expect(p.parse("II. Sol 1:1").osis()).toEqual("2Thess.1.1")
		expect(p.parse("2. Sol 1:1").osis()).toEqual("2Thess.1.1")
		expect(p.parse("2Thess 1:1").osis()).toEqual("2Thess.1.1")
		expect(p.parse("II Sol 1:1").osis()).toEqual("2Thess.1.1")
		expect(p.parse("2 Sol 1:1").osis()).toEqual("2Thess.1.1")
		p.include_apocrypha(false)
		expect(p.parse("DRUGA SOLUNJANIMA 1:1").osis()).toEqual("2Thess.1.1")
		expect(p.parse("II. SOLUNJANIMA 1:1").osis()).toEqual("2Thess.1.1")
		expect(p.parse("2. SOLUNJANIMA 1:1").osis()).toEqual("2Thess.1.1")
		expect(p.parse("II SOLUNJANIMA 1:1").osis()).toEqual("2Thess.1.1")
		expect(p.parse("2 SOLUNJANIMA 1:1").osis()).toEqual("2Thess.1.1")
		expect(p.parse("DRUGA SOL 1:1").osis()).toEqual("2Thess.1.1")
		expect(p.parse("II. SOL 1:1").osis()).toEqual("2Thess.1.1")
		expect(p.parse("2. SOL 1:1").osis()).toEqual("2Thess.1.1")
		expect(p.parse("2THESS 1:1").osis()).toEqual("2Thess.1.1")
		expect(p.parse("II SOL 1:1").osis()).toEqual("2Thess.1.1")
		expect(p.parse("2 SOL 1:1").osis()).toEqual("2Thess.1.1")
		;
      return true;
    });
  });

  describe("Localized book 1Thess (sr)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser;
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    return it("should handle book: 1Thess (sr)", function() {
      
		expect(p.parse("Prva Solunjanima 1:1").osis()).toEqual("1Thess.1.1")
		expect(p.parse("1. Solunjanima 1:1").osis()).toEqual("1Thess.1.1")
		expect(p.parse("I. Solunjanima 1:1").osis()).toEqual("1Thess.1.1")
		expect(p.parse("1 Solunjanima 1:1").osis()).toEqual("1Thess.1.1")
		expect(p.parse("I Solunjanima 1:1").osis()).toEqual("1Thess.1.1")
		expect(p.parse("Prva Sol 1:1").osis()).toEqual("1Thess.1.1")
		expect(p.parse("1. Sol 1:1").osis()).toEqual("1Thess.1.1")
		expect(p.parse("1Thess 1:1").osis()).toEqual("1Thess.1.1")
		expect(p.parse("I. Sol 1:1").osis()).toEqual("1Thess.1.1")
		expect(p.parse("1 Sol 1:1").osis()).toEqual("1Thess.1.1")
		expect(p.parse("I Sol 1:1").osis()).toEqual("1Thess.1.1")
		p.include_apocrypha(false)
		expect(p.parse("PRVA SOLUNJANIMA 1:1").osis()).toEqual("1Thess.1.1")
		expect(p.parse("1. SOLUNJANIMA 1:1").osis()).toEqual("1Thess.1.1")
		expect(p.parse("I. SOLUNJANIMA 1:1").osis()).toEqual("1Thess.1.1")
		expect(p.parse("1 SOLUNJANIMA 1:1").osis()).toEqual("1Thess.1.1")
		expect(p.parse("I SOLUNJANIMA 1:1").osis()).toEqual("1Thess.1.1")
		expect(p.parse("PRVA SOL 1:1").osis()).toEqual("1Thess.1.1")
		expect(p.parse("1. SOL 1:1").osis()).toEqual("1Thess.1.1")
		expect(p.parse("1THESS 1:1").osis()).toEqual("1Thess.1.1")
		expect(p.parse("I. SOL 1:1").osis()).toEqual("1Thess.1.1")
		expect(p.parse("1 SOL 1:1").osis()).toEqual("1Thess.1.1")
		expect(p.parse("I SOL 1:1").osis()).toEqual("1Thess.1.1")
		;
      return true;
    });
  });

  describe("Localized book 2Tim (sr)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser;
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    return it("should handle book: 2Tim (sr)", function() {
      
		expect(p.parse("Druga Timotiju 1:1").osis()).toEqual("2Tim.1.1")
		expect(p.parse("II. Timotiju 1:1").osis()).toEqual("2Tim.1.1")
		expect(p.parse("2. Timotiju 1:1").osis()).toEqual("2Tim.1.1")
		expect(p.parse("II Timotiju 1:1").osis()).toEqual("2Tim.1.1")
		expect(p.parse("2 Timotiju 1:1").osis()).toEqual("2Tim.1.1")
		expect(p.parse("Druga Tim 1:1").osis()).toEqual("2Tim.1.1")
		expect(p.parse("II. Tim 1:1").osis()).toEqual("2Tim.1.1")
		expect(p.parse("2. Tim 1:1").osis()).toEqual("2Tim.1.1")
		expect(p.parse("II Tim 1:1").osis()).toEqual("2Tim.1.1")
		expect(p.parse("2 Tim 1:1").osis()).toEqual("2Tim.1.1")
		expect(p.parse("2Tim 1:1").osis()).toEqual("2Tim.1.1")
		p.include_apocrypha(false)
		expect(p.parse("DRUGA TIMOTIJU 1:1").osis()).toEqual("2Tim.1.1")
		expect(p.parse("II. TIMOTIJU 1:1").osis()).toEqual("2Tim.1.1")
		expect(p.parse("2. TIMOTIJU 1:1").osis()).toEqual("2Tim.1.1")
		expect(p.parse("II TIMOTIJU 1:1").osis()).toEqual("2Tim.1.1")
		expect(p.parse("2 TIMOTIJU 1:1").osis()).toEqual("2Tim.1.1")
		expect(p.parse("DRUGA TIM 1:1").osis()).toEqual("2Tim.1.1")
		expect(p.parse("II. TIM 1:1").osis()).toEqual("2Tim.1.1")
		expect(p.parse("2. TIM 1:1").osis()).toEqual("2Tim.1.1")
		expect(p.parse("II TIM 1:1").osis()).toEqual("2Tim.1.1")
		expect(p.parse("2 TIM 1:1").osis()).toEqual("2Tim.1.1")
		expect(p.parse("2TIM 1:1").osis()).toEqual("2Tim.1.1")
		;
      return true;
    });
  });

  describe("Localized book 1Tim (sr)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser;
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    return it("should handle book: 1Tim (sr)", function() {
      
		expect(p.parse("Prva Timotiju 1:1").osis()).toEqual("1Tim.1.1")
		expect(p.parse("1. Timotiju 1:1").osis()).toEqual("1Tim.1.1")
		expect(p.parse("I. Timotiju 1:1").osis()).toEqual("1Tim.1.1")
		expect(p.parse("1 Timotiju 1:1").osis()).toEqual("1Tim.1.1")
		expect(p.parse("I Timotiju 1:1").osis()).toEqual("1Tim.1.1")
		expect(p.parse("Prva Tim 1:1").osis()).toEqual("1Tim.1.1")
		expect(p.parse("1. Tim 1:1").osis()).toEqual("1Tim.1.1")
		expect(p.parse("I. Tim 1:1").osis()).toEqual("1Tim.1.1")
		expect(p.parse("1 Tim 1:1").osis()).toEqual("1Tim.1.1")
		expect(p.parse("I Tim 1:1").osis()).toEqual("1Tim.1.1")
		expect(p.parse("1Tim 1:1").osis()).toEqual("1Tim.1.1")
		p.include_apocrypha(false)
		expect(p.parse("PRVA TIMOTIJU 1:1").osis()).toEqual("1Tim.1.1")
		expect(p.parse("1. TIMOTIJU 1:1").osis()).toEqual("1Tim.1.1")
		expect(p.parse("I. TIMOTIJU 1:1").osis()).toEqual("1Tim.1.1")
		expect(p.parse("1 TIMOTIJU 1:1").osis()).toEqual("1Tim.1.1")
		expect(p.parse("I TIMOTIJU 1:1").osis()).toEqual("1Tim.1.1")
		expect(p.parse("PRVA TIM 1:1").osis()).toEqual("1Tim.1.1")
		expect(p.parse("1. TIM 1:1").osis()).toEqual("1Tim.1.1")
		expect(p.parse("I. TIM 1:1").osis()).toEqual("1Tim.1.1")
		expect(p.parse("1 TIM 1:1").osis()).toEqual("1Tim.1.1")
		expect(p.parse("I TIM 1:1").osis()).toEqual("1Tim.1.1")
		expect(p.parse("1TIM 1:1").osis()).toEqual("1Tim.1.1")
		;
      return true;
    });
  });

  describe("Localized book Titus (sr)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser;
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    return it("should handle book: Titus (sr)", function() {
      
		expect(p.parse("Titus 1:1").osis()).toEqual("Titus.1.1")
		expect(p.parse("Titu 1:1").osis()).toEqual("Titus.1.1")
		expect(p.parse("Tit 1:1").osis()).toEqual("Titus.1.1")
		p.include_apocrypha(false)
		expect(p.parse("TITUS 1:1").osis()).toEqual("Titus.1.1")
		expect(p.parse("TITU 1:1").osis()).toEqual("Titus.1.1")
		expect(p.parse("TIT 1:1").osis()).toEqual("Titus.1.1")
		;
      return true;
    });
  });

  describe("Localized book Phlm (sr)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser;
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    return it("should handle book: Phlm (sr)", function() {
      
		expect(p.parse("Filimonu 1:1").osis()).toEqual("Phlm.1.1")
		expect(p.parse("Filim 1:1").osis()).toEqual("Phlm.1.1")
		expect(p.parse("Phlm 1:1").osis()).toEqual("Phlm.1.1")
		p.include_apocrypha(false)
		expect(p.parse("FILIMONU 1:1").osis()).toEqual("Phlm.1.1")
		expect(p.parse("FILIM 1:1").osis()).toEqual("Phlm.1.1")
		expect(p.parse("PHLM 1:1").osis()).toEqual("Phlm.1.1")
		;
      return true;
    });
  });

  describe("Localized book Heb (sr)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser;
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    return it("should handle book: Heb (sr)", function() {
      
		expect(p.parse("Jevrejima 1:1").osis()).toEqual("Heb.1.1")
		expect(p.parse("Jevr 1:1").osis()).toEqual("Heb.1.1")
		expect(p.parse("Heb 1:1").osis()).toEqual("Heb.1.1")
		p.include_apocrypha(false)
		expect(p.parse("JEVREJIMA 1:1").osis()).toEqual("Heb.1.1")
		expect(p.parse("JEVR 1:1").osis()).toEqual("Heb.1.1")
		expect(p.parse("HEB 1:1").osis()).toEqual("Heb.1.1")
		;
      return true;
    });
  });

  describe("Localized book Jas (sr)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser;
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    return it("should handle book: Jas (sr)", function() {
      
		expect(p.parse("Jakov 1:1").osis()).toEqual("Jas.1.1")
		expect(p.parse("Jak 1:1").osis()).toEqual("Jas.1.1")
		expect(p.parse("Jas 1:1").osis()).toEqual("Jas.1.1")
		p.include_apocrypha(false)
		expect(p.parse("JAKOV 1:1").osis()).toEqual("Jas.1.1")
		expect(p.parse("JAK 1:1").osis()).toEqual("Jas.1.1")
		expect(p.parse("JAS 1:1").osis()).toEqual("Jas.1.1")
		;
      return true;
    });
  });

  describe("Localized book 2Pet (sr)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser;
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    return it("should handle book: 2Pet (sr)", function() {
      
		expect(p.parse("Druga Petrova 1:1").osis()).toEqual("2Pet.1.1")
		expect(p.parse("II. Petrova 1:1").osis()).toEqual("2Pet.1.1")
		expect(p.parse("2. Petrova 1:1").osis()).toEqual("2Pet.1.1")
		expect(p.parse("II Petrova 1:1").osis()).toEqual("2Pet.1.1")
		expect(p.parse("2 Petrova 1:1").osis()).toEqual("2Pet.1.1")
		expect(p.parse("Druga Pet 1:1").osis()).toEqual("2Pet.1.1")
		expect(p.parse("II. Pet 1:1").osis()).toEqual("2Pet.1.1")
		expect(p.parse("2. Pet 1:1").osis()).toEqual("2Pet.1.1")
		expect(p.parse("II Pet 1:1").osis()).toEqual("2Pet.1.1")
		expect(p.parse("2 Pet 1:1").osis()).toEqual("2Pet.1.1")
		expect(p.parse("2Pet 1:1").osis()).toEqual("2Pet.1.1")
		p.include_apocrypha(false)
		expect(p.parse("DRUGA PETROVA 1:1").osis()).toEqual("2Pet.1.1")
		expect(p.parse("II. PETROVA 1:1").osis()).toEqual("2Pet.1.1")
		expect(p.parse("2. PETROVA 1:1").osis()).toEqual("2Pet.1.1")
		expect(p.parse("II PETROVA 1:1").osis()).toEqual("2Pet.1.1")
		expect(p.parse("2 PETROVA 1:1").osis()).toEqual("2Pet.1.1")
		expect(p.parse("DRUGA PET 1:1").osis()).toEqual("2Pet.1.1")
		expect(p.parse("II. PET 1:1").osis()).toEqual("2Pet.1.1")
		expect(p.parse("2. PET 1:1").osis()).toEqual("2Pet.1.1")
		expect(p.parse("II PET 1:1").osis()).toEqual("2Pet.1.1")
		expect(p.parse("2 PET 1:1").osis()).toEqual("2Pet.1.1")
		expect(p.parse("2PET 1:1").osis()).toEqual("2Pet.1.1")
		;
      return true;
    });
  });

  describe("Localized book 1Pet (sr)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser;
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    return it("should handle book: 1Pet (sr)", function() {
      
		expect(p.parse("Prva Petrova 1:1").osis()).toEqual("1Pet.1.1")
		expect(p.parse("1. Petrova 1:1").osis()).toEqual("1Pet.1.1")
		expect(p.parse("I. Petrova 1:1").osis()).toEqual("1Pet.1.1")
		expect(p.parse("1 Petrova 1:1").osis()).toEqual("1Pet.1.1")
		expect(p.parse("I Petrova 1:1").osis()).toEqual("1Pet.1.1")
		expect(p.parse("Prva Pet 1:1").osis()).toEqual("1Pet.1.1")
		expect(p.parse("1. Pet 1:1").osis()).toEqual("1Pet.1.1")
		expect(p.parse("I. Pet 1:1").osis()).toEqual("1Pet.1.1")
		expect(p.parse("1 Pet 1:1").osis()).toEqual("1Pet.1.1")
		expect(p.parse("I Pet 1:1").osis()).toEqual("1Pet.1.1")
		expect(p.parse("1Pet 1:1").osis()).toEqual("1Pet.1.1")
		p.include_apocrypha(false)
		expect(p.parse("PRVA PETROVA 1:1").osis()).toEqual("1Pet.1.1")
		expect(p.parse("1. PETROVA 1:1").osis()).toEqual("1Pet.1.1")
		expect(p.parse("I. PETROVA 1:1").osis()).toEqual("1Pet.1.1")
		expect(p.parse("1 PETROVA 1:1").osis()).toEqual("1Pet.1.1")
		expect(p.parse("I PETROVA 1:1").osis()).toEqual("1Pet.1.1")
		expect(p.parse("PRVA PET 1:1").osis()).toEqual("1Pet.1.1")
		expect(p.parse("1. PET 1:1").osis()).toEqual("1Pet.1.1")
		expect(p.parse("I. PET 1:1").osis()).toEqual("1Pet.1.1")
		expect(p.parse("1 PET 1:1").osis()).toEqual("1Pet.1.1")
		expect(p.parse("I PET 1:1").osis()).toEqual("1Pet.1.1")
		expect(p.parse("1PET 1:1").osis()).toEqual("1Pet.1.1")
		;
      return true;
    });
  });

  describe("Localized book Jude (sr)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser;
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    return it("should handle book: Jude (sr)", function() {
      
		expect(p.parse("Juda 1:1").osis()).toEqual("Jude.1.1")
		expect(p.parse("Jude 1:1").osis()).toEqual("Jude.1.1")
		p.include_apocrypha(false)
		expect(p.parse("JUDA 1:1").osis()).toEqual("Jude.1.1")
		expect(p.parse("JUDE 1:1").osis()).toEqual("Jude.1.1")
		;
      return true;
    });
  });

  describe("Localized book Tob (sr)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser;
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    return it("should handle book: Tob (sr)", function() {
      
		expect(p.parse("Књига Товијина 1:1").osis()).toEqual("Tob.1.1")
		expect(p.parse("Тобија 1:1").osis()).toEqual("Tob.1.1")
		expect(p.parse("Товит 1:1").osis()).toEqual("Tob.1.1")
		expect(p.parse("Tob 1:1").osis()).toEqual("Tob.1.1")
		expect(p.parse("Тов 1:1").osis()).toEqual("Tob.1.1")
		;
      return true;
    });
  });

  describe("Localized book Jdt (sr)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser;
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    return it("should handle book: Jdt (sr)", function() {
      
		expect(p.parse("Књига о Јудити 1:1").osis()).toEqual("Jdt.1.1")
		expect(p.parse("Јудита 1:1").osis()).toEqual("Jdt.1.1")
		expect(p.parse("Jdt 1:1").osis()).toEqual("Jdt.1.1")
		expect(p.parse("Јуд 1:1").osis()).toEqual("Jdt.1.1")
		;
      return true;
    });
  });

  describe("Localized book Bar (sr)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser;
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    return it("should handle book: Bar (sr)", function() {
      
		expect(p.parse("Барух 1:1").osis()).toEqual("Bar.1.1")
		expect(p.parse("Варух 1:1").osis()).toEqual("Bar.1.1")
		expect(p.parse("Bar 1:1").osis()).toEqual("Bar.1.1")
		expect(p.parse("Вар 1:1").osis()).toEqual("Bar.1.1")
		;
      return true;
    });
  });

  describe("Localized book Sus (sr)", function() {
    var p;
    p = {};
    beforeEach(function() {
      p = new bcv_parser;
      p.set_options({
        book_alone_strategy: "ignore",
        book_sequence_strategy: "ignore",
        osis_compaction_strategy: "bc",
        captive_end_digits_strategy: "delete"
      });
      return p.include_apocrypha(true);
    });
    return it("should handle book: Sus (sr)", function() {
      
		expect(p.parse("Sus 1:1").osis()).toEqual("Sus.1.1")
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
      return expect(p.languages).toEqual(["sr"]);
    });
    it("should handle ranges (sr)", function() {
      expect(p.parse("Titus 1:1 - 2").osis()).toEqual("Titus.1.1-Titus.1.2");
      expect(p.parse("Matt 1-2").osis()).toEqual("Matt.1-Matt.2");
      return expect(p.parse("Phlm 2 - 3").osis()).toEqual("Phlm.1.2-Phlm.1.3");
    });
    it("should handle chapters (sr)", function() {
      expect(p.parse("Titus 1:1, poglavlje 2").osis()).toEqual("Titus.1.1,Titus.2");
      return expect(p.parse("Matt 3:4 POGLAVLJE 6").osis()).toEqual("Matt.3.4,Matt.6");
    });
    it("should handle verses (sr)", function() {
      expect(p.parse("Exod 1:1 stih 3").osis()).toEqual("Exod.1.1,Exod.1.3");
      return expect(p.parse("Phlm STIH 6").osis()).toEqual("Phlm.1.6");
    });
    it("should handle 'and' (sr)", function() {
      expect(p.parse("Exod 1:1 i 3").osis()).toEqual("Exod.1.1,Exod.1.3");
      return expect(p.parse("Phlm 2 I 6").osis()).toEqual("Phlm.1.2,Phlm.1.6");
    });
    it("should handle titles (sr)", function() {
      expect(p.parse("Ps 3 title, 4:2, 5:title").osis()).toEqual("Ps.3.1,Ps.4.2,Ps.5.1");
      return expect(p.parse("PS 3 TITLE, 4:2, 5:TITLE").osis()).toEqual("Ps.3.1,Ps.4.2,Ps.5.1");
    });
    it("should handle 'ff' (sr)", function() {
      expect(p.parse("Rev 3ff, 4:2ff").osis()).toEqual("Rev.3-Rev.22,Rev.4.2-Rev.4.11");
      return expect(p.parse("REV 3 FF, 4:2 FF").osis()).toEqual("Rev.3-Rev.22,Rev.4.2-Rev.4.11");
    });
    it("should handle translations (sr)", function() {
      expect(p.parse("Lev 1 (ERV)").osis_and_translations()).toEqual([["Lev.1", "ERV"]]);
      return expect(p.parse("lev 1 erv").osis_and_translations()).toEqual([["Lev.1", "ERV"]]);
    });
    it("should handle book ranges (sr)", function() {
      p.set_options({
        book_alone_strategy: "full",
        book_range_strategy: "include"
      });
      return expect(p.parse("Prva - Treća  Jov").osis()).toEqual("1John.1-3John.1");
    });
    return it("should handle boundaries (sr)", function() {
      p.set_options({
        book_alone_strategy: "full"
      });
      expect(p.parse("\u2014Matt\u2014").osis()).toEqual("Matt.1-Matt.28");
      return expect(p.parse("\u201cMatt 1:1\u201d").osis()).toEqual("Matt.1.1");
    });
  });

}).call(this);
