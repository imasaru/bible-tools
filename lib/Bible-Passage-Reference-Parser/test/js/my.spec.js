(function() {
  var bcv_parser;

  bcv_parser = require("../../js/my_bcv_parser.js").bcv_parser;

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

  describe("Localized book Gen (my)", function() {
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
    return it("should handle book: Gen (my)", function() {
      
		expect(p.parse("က မ္ဘာ ဥး ကျမ်း။ 1:1").osis()).toEqual("Gen.1.1")
		expect(p.parse("က မ္ဘာ ဦး ကျမ်း။ 1:1").osis()).toEqual("Gen.1.1")
		expect(p.parse("ကမ္ဘာ၊ 1:1").osis()).toEqual("Gen.1.1")
		expect(p.parse("Gen 1:1").osis()).toEqual("Gen.1.1")
		expect(p.parse("က၊ 1:1").osis()).toEqual("Gen.1.1")
		expect(p.parse("က 1:1").osis()).toEqual("Gen.1.1")
		p.include_apocrypha(false)
		expect(p.parse("က မ္ဘာ ဥး ကျမ်း။ 1:1").osis()).toEqual("Gen.1.1")
		expect(p.parse("က မ္ဘာ ဦး ကျမ်း။ 1:1").osis()).toEqual("Gen.1.1")
		expect(p.parse("ကမ္ဘာ၊ 1:1").osis()).toEqual("Gen.1.1")
		expect(p.parse("GEN 1:1").osis()).toEqual("Gen.1.1")
		expect(p.parse("က၊ 1:1").osis()).toEqual("Gen.1.1")
		expect(p.parse("က 1:1").osis()).toEqual("Gen.1.1")
		;
      return true;
    });
  });

  describe("Localized book Exod (my)", function() {
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
    return it("should handle book: Exod (my)", function() {
      
		expect(p.parse("ထွက် မြောက် ရာ ကျမ်း။ 1:1").osis()).toEqual("Exod.1.1")
		expect(p.parse("ထကွ ၊် 1:1").osis()).toEqual("Exod.1.1")
		expect(p.parse("ထွက်၊ 1:1").osis()).toEqual("Exod.1.1")
		expect(p.parse("Exod 1:1").osis()).toEqual("Exod.1.1")
		expect(p.parse("ထွ 1:1").osis()).toEqual("Exod.1.1")
		p.include_apocrypha(false)
		expect(p.parse("ထွက် မြောက် ရာ ကျမ်း။ 1:1").osis()).toEqual("Exod.1.1")
		expect(p.parse("ထကွ ၊် 1:1").osis()).toEqual("Exod.1.1")
		expect(p.parse("ထွက်၊ 1:1").osis()).toEqual("Exod.1.1")
		expect(p.parse("EXOD 1:1").osis()).toEqual("Exod.1.1")
		expect(p.parse("ထွ 1:1").osis()).toEqual("Exod.1.1")
		;
      return true;
    });
  });

  describe("Localized book Bel (my)", function() {
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
    return it("should handle book: Bel (my)", function() {
      
		expect(p.parse("Bel 1:1").osis()).toEqual("Bel.1.1")
		;
      return true;
    });
  });

  describe("Localized book Lev (my)", function() {
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
    return it("should handle book: Lev (my)", function() {
      
		expect(p.parse("ဝတ် ပြု ရာ ကျမ်း။ 1:1").osis()).toEqual("Lev.1.1")
		expect(p.parse("ဝတ်၊ 1:1").osis()).toEqual("Lev.1.1")
		expect(p.parse("Lev 1:1").osis()).toEqual("Lev.1.1")
		expect(p.parse("ဝတ် 1:1").osis()).toEqual("Lev.1.1")
		p.include_apocrypha(false)
		expect(p.parse("ဝတ် ပြု ရာ ကျမ်း။ 1:1").osis()).toEqual("Lev.1.1")
		expect(p.parse("ဝတ်၊ 1:1").osis()).toEqual("Lev.1.1")
		expect(p.parse("LEV 1:1").osis()).toEqual("Lev.1.1")
		expect(p.parse("ဝတ် 1:1").osis()).toEqual("Lev.1.1")
		;
      return true;
    });
  });

  describe("Localized book Num (my)", function() {
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
    return it("should handle book: Num (my)", function() {
      
		expect(p.parse("တော လည် ရာ ကျမ်း။ 1:1").osis()).toEqual("Num.1.1")
		expect(p.parse("တော၊ 1:1").osis()).toEqual("Num.1.1")
		expect(p.parse("Num 1:1").osis()).toEqual("Num.1.1")
		expect(p.parse("တော 1:1").osis()).toEqual("Num.1.1")
		p.include_apocrypha(false)
		expect(p.parse("တော လည် ရာ ကျမ်း။ 1:1").osis()).toEqual("Num.1.1")
		expect(p.parse("တော၊ 1:1").osis()).toEqual("Num.1.1")
		expect(p.parse("NUM 1:1").osis()).toEqual("Num.1.1")
		expect(p.parse("တော 1:1").osis()).toEqual("Num.1.1")
		;
      return true;
    });
  });

  describe("Localized book Sir (my)", function() {
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
    return it("should handle book: Sir (my)", function() {
      
		expect(p.parse("Sir 1:1").osis()).toEqual("Sir.1.1")
		;
      return true;
    });
  });

  describe("Localized book Wis (my)", function() {
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
    return it("should handle book: Wis (my)", function() {
      
		expect(p.parse("Wis 1:1").osis()).toEqual("Wis.1.1")
		;
      return true;
    });
  });

  describe("Localized book Lam (my)", function() {
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
    return it("should handle book: Lam (my)", function() {
      
		expect(p.parse("ယေ ရ မိ မြည် တမ်း စ ကား။ 1:1").osis()).toEqual("Lam.1.1")
		expect(p.parse("မြည် 1:1").osis()).toEqual("Lam.1.1")
		expect(p.parse("Lam 1:1").osis()).toEqual("Lam.1.1")
		p.include_apocrypha(false)
		expect(p.parse("ယေ ရ မိ မြည် တမ်း စ ကား။ 1:1").osis()).toEqual("Lam.1.1")
		expect(p.parse("မြည် 1:1").osis()).toEqual("Lam.1.1")
		expect(p.parse("LAM 1:1").osis()).toEqual("Lam.1.1")
		;
      return true;
    });
  });

  describe("Localized book EpJer (my)", function() {
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
    return it("should handle book: EpJer (my)", function() {
      
		expect(p.parse("EpJer 1:1").osis()).toEqual("EpJer.1.1")
		;
      return true;
    });
  });

  describe("Localized book Rev (my)", function() {
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
    return it("should handle book: Rev (my)", function() {
      
		expect(p.parse("ဗျာ ဒိတ် ကျမ်း။ 1:1").osis()).toEqual("Rev.1.1")
		expect(p.parse("ဗျာ၊ 1:1").osis()).toEqual("Rev.1.1")
		expect(p.parse("Rev 1:1").osis()).toEqual("Rev.1.1")
		expect(p.parse("ဗျာ 1:1").osis()).toEqual("Rev.1.1")
		p.include_apocrypha(false)
		expect(p.parse("ဗျာ ဒိတ် ကျမ်း။ 1:1").osis()).toEqual("Rev.1.1")
		expect(p.parse("ဗျာ၊ 1:1").osis()).toEqual("Rev.1.1")
		expect(p.parse("REV 1:1").osis()).toEqual("Rev.1.1")
		expect(p.parse("ဗျာ 1:1").osis()).toEqual("Rev.1.1")
		;
      return true;
    });
  });

  describe("Localized book PrMan (my)", function() {
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
    return it("should handle book: PrMan (my)", function() {
      
		expect(p.parse("PrMan 1:1").osis()).toEqual("PrMan.1.1")
		;
      return true;
    });
  });

  describe("Localized book Deut (my)", function() {
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
    return it("should handle book: Deut (my)", function() {
      
		expect(p.parse("တ ရား ဟော ရာ ကျမ်း။ 1:1").osis()).toEqual("Deut.1.1")
		expect(p.parse("တရားဟော၊ 1:1").osis()).toEqual("Deut.1.1")
		expect(p.parse("တရား‌ဟော 1:1").osis()).toEqual("Deut.1.1")
		expect(p.parse("Deut 1:1").osis()).toEqual("Deut.1.1")
		expect(p.parse("တရား 1:1").osis()).toEqual("Deut.1.1")
		p.include_apocrypha(false)
		expect(p.parse("တ ရား ဟော ရာ ကျမ်း။ 1:1").osis()).toEqual("Deut.1.1")
		expect(p.parse("တရားဟော၊ 1:1").osis()).toEqual("Deut.1.1")
		expect(p.parse("တရား‌ဟော 1:1").osis()).toEqual("Deut.1.1")
		expect(p.parse("DEUT 1:1").osis()).toEqual("Deut.1.1")
		expect(p.parse("တရား 1:1").osis()).toEqual("Deut.1.1")
		;
      return true;
    });
  });

  describe("Localized book Josh (my)", function() {
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
    return it("should handle book: Josh (my)", function() {
      
		expect(p.parse("ယော ရှု မှတ် စာ။ 1:1").osis()).toEqual("Josh.1.1")
		expect(p.parse("ယောရှု 1:1").osis()).toEqual("Josh.1.1")
		expect(p.parse("Josh 1:1").osis()).toEqual("Josh.1.1")
		p.include_apocrypha(false)
		expect(p.parse("ယော ရှု မှတ် စာ။ 1:1").osis()).toEqual("Josh.1.1")
		expect(p.parse("ယောရှု 1:1").osis()).toEqual("Josh.1.1")
		expect(p.parse("JOSH 1:1").osis()).toEqual("Josh.1.1")
		;
      return true;
    });
  });

  describe("Localized book Judg (my)", function() {
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
    return it("should handle book: Judg (my)", function() {
      
		expect(p.parse("တ ရား သူ ကြီး မှတ် စာ။ 1:1").osis()).toEqual("Judg.1.1")
		expect(p.parse("သူကြီး 1:1").osis()).toEqual("Judg.1.1")
		expect(p.parse("Judg 1:1").osis()).toEqual("Judg.1.1")
		p.include_apocrypha(false)
		expect(p.parse("တ ရား သူ ကြီး မှတ် စာ။ 1:1").osis()).toEqual("Judg.1.1")
		expect(p.parse("သူကြီး 1:1").osis()).toEqual("Judg.1.1")
		expect(p.parse("JUDG 1:1").osis()).toEqual("Judg.1.1")
		;
      return true;
    });
  });

  describe("Localized book Ruth (my)", function() {
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
    return it("should handle book: Ruth (my)", function() {
      
		expect(p.parse("ရု​သ​ဝ​တ္တု။ 1:1").osis()).toEqual("Ruth.1.1")
		expect(p.parse("Ruth 1:1").osis()).toEqual("Ruth.1.1")
		expect(p.parse("ရု 1:1").osis()).toEqual("Ruth.1.1")
		p.include_apocrypha(false)
		expect(p.parse("ရု​သ​ဝ​တ္တု။ 1:1").osis()).toEqual("Ruth.1.1")
		expect(p.parse("RUTH 1:1").osis()).toEqual("Ruth.1.1")
		expect(p.parse("ရု 1:1").osis()).toEqual("Ruth.1.1")
		;
      return true;
    });
  });

  describe("Localized book 1Esd (my)", function() {
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
    return it("should handle book: 1Esd (my)", function() {
      
		expect(p.parse("1Esd 1:1").osis()).toEqual("1Esd.1.1")
		;
      return true;
    });
  });

  describe("Localized book 2Esd (my)", function() {
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
    return it("should handle book: 2Esd (my)", function() {
      
		expect(p.parse("2Esd 1:1").osis()).toEqual("2Esd.1.1")
		;
      return true;
    });
  });

  describe("Localized book Isa (my)", function() {
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
    return it("should handle book: Isa (my)", function() {
      
		expect(p.parse("ဟေ ရှာ ယ အ နာ ဂ တ္တိ ကျမ်း။ 1:1").osis()).toEqual("Isa.1.1")
		expect(p.parse("ဟေရှာယ၊ 1:1").osis()).toEqual("Isa.1.1")
		expect(p.parse("ဟေရှာ၊ 1:1").osis()).toEqual("Isa.1.1")
		expect(p.parse("‌ဟေရာှ 1:1").osis()).toEqual("Isa.1.1")
		expect(p.parse("ဟေရှာ 1:1").osis()).toEqual("Isa.1.1")
		expect(p.parse("Isa 1:1").osis()).toEqual("Isa.1.1")
		p.include_apocrypha(false)
		expect(p.parse("ဟေ ရှာ ယ အ နာ ဂ တ္တိ ကျမ်း။ 1:1").osis()).toEqual("Isa.1.1")
		expect(p.parse("ဟေရှာယ၊ 1:1").osis()).toEqual("Isa.1.1")
		expect(p.parse("ဟေရှာ၊ 1:1").osis()).toEqual("Isa.1.1")
		expect(p.parse("‌ဟေရာှ 1:1").osis()).toEqual("Isa.1.1")
		expect(p.parse("ဟေရှာ 1:1").osis()).toEqual("Isa.1.1")
		expect(p.parse("ISA 1:1").osis()).toEqual("Isa.1.1")
		;
      return true;
    });
  });

  describe("Localized book 2Sam (my)", function() {
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
    it("should handle book: 2Sam (my)", function() {
      
		expect(p.parse("ဓ မ္မ ရာ ဇ ဝင် ဒု တိ ယ စောင်။ 1:1").osis()).toEqual("2Sam.1.1")
		expect(p.parse("2. ရာ၊ 1:1").osis()).toEqual("2Sam.1.1")
		expect(p.parse("2 ရာ၊ 1:1").osis()).toEqual("2Sam.1.1")
		expect(p.parse("2.ရာ၊ 1:1").osis()).toEqual("2Sam.1.1")
		expect(p.parse("၂ ရာ၊ 1:1").osis()).toEqual("2Sam.1.1")
		expect(p.parse("2 ရာ 1:1").osis()).toEqual("2Sam.1.1")
		expect(p.parse("2Sam 1:1").osis()).toEqual("2Sam.1.1")
		expect(p.parse("2ရာ၊ 1:1").osis()).toEqual("2Sam.1.1")
		expect(p.parse("၂ ရာ 1:1").osis()).toEqual("2Sam.1.1")
		expect(p.parse("၂ရာ၊ 1:1").osis()).toEqual("2Sam.1.1")
		;
      return true;
    });
    return it("should handle non-Latin digits in book: 2Sam (my)", function() {
      p.set_options({
        non_latin_digits_strategy: "replace"
      });
      
		expect(p.parse("ဓ မ္မ ရာ ဇ ဝင် ဒု တိ ယ စောင်။ 1:1").osis()).toEqual("2Sam.1.1")
		expect(p.parse("2. ရာ၊ 1:1").osis()).toEqual("2Sam.1.1")
		expect(p.parse("2 ရာ၊ 1:1").osis()).toEqual("2Sam.1.1")
		expect(p.parse("2.ရာ၊ 1:1").osis()).toEqual("2Sam.1.1")
		expect(p.parse("၂ ရာ၊ 1:1").osis()).toEqual("2Sam.1.1")
		expect(p.parse("2 ရာ 1:1").osis()).toEqual("2Sam.1.1")
		expect(p.parse("2Sam 1:1").osis()).toEqual("2Sam.1.1")
		expect(p.parse("2ရာ၊ 1:1").osis()).toEqual("2Sam.1.1")
		expect(p.parse("၂ ရာ 1:1").osis()).toEqual("2Sam.1.1")
		expect(p.parse("၂ရာ၊ 1:1").osis()).toEqual("2Sam.1.1")
		p.include_apocrypha(false)
		expect(p.parse("ဓ မ္မ ရာ ဇ ဝင် ဒု တိ ယ စောင်။ 1:1").osis()).toEqual("2Sam.1.1")
		expect(p.parse("2. ရာ၊ 1:1").osis()).toEqual("2Sam.1.1")
		expect(p.parse("2 ရာ၊ 1:1").osis()).toEqual("2Sam.1.1")
		expect(p.parse("2.ရာ၊ 1:1").osis()).toEqual("2Sam.1.1")
		expect(p.parse("၂ ရာ၊ 1:1").osis()).toEqual("2Sam.1.1")
		expect(p.parse("2 ရာ 1:1").osis()).toEqual("2Sam.1.1")
		expect(p.parse("2SAM 1:1").osis()).toEqual("2Sam.1.1")
		expect(p.parse("2ရာ၊ 1:1").osis()).toEqual("2Sam.1.1")
		expect(p.parse("၂ ရာ 1:1").osis()).toEqual("2Sam.1.1")
		expect(p.parse("၂ရာ၊ 1:1").osis()).toEqual("2Sam.1.1")
		;
      return true;
    });
  });

  describe("Localized book 1Sam (my)", function() {
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
    it("should handle book: 1Sam (my)", function() {
      
		expect(p.parse("ဓ မ္မ ရာ ဇ ဝင် ပ ထ မ စောင်။ 1:1").osis()).toEqual("1Sam.1.1")
		expect(p.parse("1. ရာ၊ 1:1").osis()).toEqual("1Sam.1.1")
		expect(p.parse("1 ရာ၊ 1:1").osis()).toEqual("1Sam.1.1")
		expect(p.parse("1.ရာ၊ 1:1").osis()).toEqual("1Sam.1.1")
		expect(p.parse("၁ ရာ၊ 1:1").osis()).toEqual("1Sam.1.1")
		expect(p.parse("1 ရာ 1:1").osis()).toEqual("1Sam.1.1")
		expect(p.parse("1Sam 1:1").osis()).toEqual("1Sam.1.1")
		expect(p.parse("1ရာ၊ 1:1").osis()).toEqual("1Sam.1.1")
		expect(p.parse("၁ ရာ 1:1").osis()).toEqual("1Sam.1.1")
		expect(p.parse("၁ရာ၊ 1:1").osis()).toEqual("1Sam.1.1")
		;
      return true;
    });
    return it("should handle non-Latin digits in book: 1Sam (my)", function() {
      p.set_options({
        non_latin_digits_strategy: "replace"
      });
      
		expect(p.parse("ဓ မ္မ ရာ ဇ ဝင် ပ ထ မ စောင်။ 1:1").osis()).toEqual("1Sam.1.1")
		expect(p.parse("1. ရာ၊ 1:1").osis()).toEqual("1Sam.1.1")
		expect(p.parse("1 ရာ၊ 1:1").osis()).toEqual("1Sam.1.1")
		expect(p.parse("1.ရာ၊ 1:1").osis()).toEqual("1Sam.1.1")
		expect(p.parse("၁ ရာ၊ 1:1").osis()).toEqual("1Sam.1.1")
		expect(p.parse("1 ရာ 1:1").osis()).toEqual("1Sam.1.1")
		expect(p.parse("1Sam 1:1").osis()).toEqual("1Sam.1.1")
		expect(p.parse("1ရာ၊ 1:1").osis()).toEqual("1Sam.1.1")
		expect(p.parse("၁ ရာ 1:1").osis()).toEqual("1Sam.1.1")
		expect(p.parse("၁ရာ၊ 1:1").osis()).toEqual("1Sam.1.1")
		p.include_apocrypha(false)
		expect(p.parse("ဓ မ္မ ရာ ဇ ဝင် ပ ထ မ စောင်။ 1:1").osis()).toEqual("1Sam.1.1")
		expect(p.parse("1. ရာ၊ 1:1").osis()).toEqual("1Sam.1.1")
		expect(p.parse("1 ရာ၊ 1:1").osis()).toEqual("1Sam.1.1")
		expect(p.parse("1.ရာ၊ 1:1").osis()).toEqual("1Sam.1.1")
		expect(p.parse("၁ ရာ၊ 1:1").osis()).toEqual("1Sam.1.1")
		expect(p.parse("1 ရာ 1:1").osis()).toEqual("1Sam.1.1")
		expect(p.parse("1SAM 1:1").osis()).toEqual("1Sam.1.1")
		expect(p.parse("1ရာ၊ 1:1").osis()).toEqual("1Sam.1.1")
		expect(p.parse("၁ ရာ 1:1").osis()).toEqual("1Sam.1.1")
		expect(p.parse("၁ရာ၊ 1:1").osis()).toEqual("1Sam.1.1")
		;
      return true;
    });
  });

  describe("Localized book 2Kgs (my)", function() {
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
    it("should handle book: 2Kgs (my)", function() {
      
		expect(p.parse("ဓ မ္မ ရာ ဇ ဝင် စ တု တ္ထ စောင်။ 1:1").osis()).toEqual("2Kgs.1.1")
		expect(p.parse("4. ရာ၊ 1:1").osis()).toEqual("2Kgs.1.1")
		expect(p.parse("4 ရာ၊ 1:1").osis()).toEqual("2Kgs.1.1")
		expect(p.parse("4.ရာ၊ 1:1").osis()).toEqual("2Kgs.1.1")
		expect(p.parse("၄ ရာ၊ 1:1").osis()).toEqual("2Kgs.1.1")
		expect(p.parse("2Kgs 1:1").osis()).toEqual("2Kgs.1.1")
		expect(p.parse("4 ရာ 1:1").osis()).toEqual("2Kgs.1.1")
		expect(p.parse("4ရာ၊ 1:1").osis()).toEqual("2Kgs.1.1")
		expect(p.parse("၄ ရာ 1:1").osis()).toEqual("2Kgs.1.1")
		expect(p.parse("၄ရာ၊ 1:1").osis()).toEqual("2Kgs.1.1")
		;
      return true;
    });
    return it("should handle non-Latin digits in book: 2Kgs (my)", function() {
      p.set_options({
        non_latin_digits_strategy: "replace"
      });
      
		expect(p.parse("ဓ မ္မ ရာ ဇ ဝင် စ တု တ္ထ စောင်။ 1:1").osis()).toEqual("2Kgs.1.1")
		expect(p.parse("4. ရာ၊ 1:1").osis()).toEqual("2Kgs.1.1")
		expect(p.parse("4 ရာ၊ 1:1").osis()).toEqual("2Kgs.1.1")
		expect(p.parse("4.ရာ၊ 1:1").osis()).toEqual("2Kgs.1.1")
		expect(p.parse("၄ ရာ၊ 1:1").osis()).toEqual("2Kgs.1.1")
		expect(p.parse("2Kgs 1:1").osis()).toEqual("2Kgs.1.1")
		expect(p.parse("4 ရာ 1:1").osis()).toEqual("2Kgs.1.1")
		expect(p.parse("4ရာ၊ 1:1").osis()).toEqual("2Kgs.1.1")
		expect(p.parse("၄ ရာ 1:1").osis()).toEqual("2Kgs.1.1")
		expect(p.parse("၄ရာ၊ 1:1").osis()).toEqual("2Kgs.1.1")
		p.include_apocrypha(false)
		expect(p.parse("ဓ မ္မ ရာ ဇ ဝင် စ တု တ္ထ စောင်။ 1:1").osis()).toEqual("2Kgs.1.1")
		expect(p.parse("4. ရာ၊ 1:1").osis()).toEqual("2Kgs.1.1")
		expect(p.parse("4 ရာ၊ 1:1").osis()).toEqual("2Kgs.1.1")
		expect(p.parse("4.ရာ၊ 1:1").osis()).toEqual("2Kgs.1.1")
		expect(p.parse("၄ ရာ၊ 1:1").osis()).toEqual("2Kgs.1.1")
		expect(p.parse("2KGS 1:1").osis()).toEqual("2Kgs.1.1")
		expect(p.parse("4 ရာ 1:1").osis()).toEqual("2Kgs.1.1")
		expect(p.parse("4ရာ၊ 1:1").osis()).toEqual("2Kgs.1.1")
		expect(p.parse("၄ ရာ 1:1").osis()).toEqual("2Kgs.1.1")
		expect(p.parse("၄ရာ၊ 1:1").osis()).toEqual("2Kgs.1.1")
		;
      return true;
    });
  });

  describe("Localized book 1Kgs (my)", function() {
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
    it("should handle book: 1Kgs (my)", function() {
      
		expect(p.parse("ဓ မ္မ ရာ ဇ ဝင် တ တိ ယ စောင်။ 1:1").osis()).toEqual("1Kgs.1.1")
		expect(p.parse("3. ရာ၊ 1:1").osis()).toEqual("1Kgs.1.1")
		expect(p.parse("3 ရာ၊ 1:1").osis()).toEqual("1Kgs.1.1")
		expect(p.parse("3.ရာ၊ 1:1").osis()).toEqual("1Kgs.1.1")
		expect(p.parse("၃ ရာ၊ 1:1").osis()).toEqual("1Kgs.1.1")
		expect(p.parse("1Kgs 1:1").osis()).toEqual("1Kgs.1.1")
		expect(p.parse("3 ရာ 1:1").osis()).toEqual("1Kgs.1.1")
		expect(p.parse("3ရာ၊ 1:1").osis()).toEqual("1Kgs.1.1")
		expect(p.parse("၃ ရာ 1:1").osis()).toEqual("1Kgs.1.1")
		expect(p.parse("၃ရာ၊ 1:1").osis()).toEqual("1Kgs.1.1")
		;
      return true;
    });
    return it("should handle non-Latin digits in book: 1Kgs (my)", function() {
      p.set_options({
        non_latin_digits_strategy: "replace"
      });
      
		expect(p.parse("ဓ မ္မ ရာ ဇ ဝင် တ တိ ယ စောင်။ 1:1").osis()).toEqual("1Kgs.1.1")
		expect(p.parse("3. ရာ၊ 1:1").osis()).toEqual("1Kgs.1.1")
		expect(p.parse("3 ရာ၊ 1:1").osis()).toEqual("1Kgs.1.1")
		expect(p.parse("3.ရာ၊ 1:1").osis()).toEqual("1Kgs.1.1")
		expect(p.parse("၃ ရာ၊ 1:1").osis()).toEqual("1Kgs.1.1")
		expect(p.parse("1Kgs 1:1").osis()).toEqual("1Kgs.1.1")
		expect(p.parse("3 ရာ 1:1").osis()).toEqual("1Kgs.1.1")
		expect(p.parse("3ရာ၊ 1:1").osis()).toEqual("1Kgs.1.1")
		expect(p.parse("၃ ရာ 1:1").osis()).toEqual("1Kgs.1.1")
		expect(p.parse("၃ရာ၊ 1:1").osis()).toEqual("1Kgs.1.1")
		p.include_apocrypha(false)
		expect(p.parse("ဓ မ္မ ရာ ဇ ဝင် တ တိ ယ စောင်။ 1:1").osis()).toEqual("1Kgs.1.1")
		expect(p.parse("3. ရာ၊ 1:1").osis()).toEqual("1Kgs.1.1")
		expect(p.parse("3 ရာ၊ 1:1").osis()).toEqual("1Kgs.1.1")
		expect(p.parse("3.ရာ၊ 1:1").osis()).toEqual("1Kgs.1.1")
		expect(p.parse("၃ ရာ၊ 1:1").osis()).toEqual("1Kgs.1.1")
		expect(p.parse("1KGS 1:1").osis()).toEqual("1Kgs.1.1")
		expect(p.parse("3 ရာ 1:1").osis()).toEqual("1Kgs.1.1")
		expect(p.parse("3ရာ၊ 1:1").osis()).toEqual("1Kgs.1.1")
		expect(p.parse("၃ ရာ 1:1").osis()).toEqual("1Kgs.1.1")
		expect(p.parse("၃ရာ၊ 1:1").osis()).toEqual("1Kgs.1.1")
		;
      return true;
    });
  });

  describe("Localized book 2Chr (my)", function() {
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
    it("should handle book: 2Chr (my)", function() {
      
		expect(p.parse("ရာ ဇ ဝင် ချုပ် ဒု တိ ယ စောင်။ 1:1").osis()).toEqual("2Chr.1.1")
		expect(p.parse("6 ရာ၊ 1:1").osis()).toEqual("2Chr.1.1")
		expect(p.parse("၆ ရာ၊ 1:1").osis()).toEqual("2Chr.1.1")
		expect(p.parse("2Chr 1:1").osis()).toEqual("2Chr.1.1")
		expect(p.parse("6 ရာ 1:1").osis()).toEqual("2Chr.1.1")
		expect(p.parse("6ရာ၊ 1:1").osis()).toEqual("2Chr.1.1")
		expect(p.parse("၆ ရာ 1:1").osis()).toEqual("2Chr.1.1")
		expect(p.parse("၆ရာ၊ 1:1").osis()).toEqual("2Chr.1.1")
		;
      return true;
    });
    return it("should handle non-Latin digits in book: 2Chr (my)", function() {
      p.set_options({
        non_latin_digits_strategy: "replace"
      });
      
		expect(p.parse("ရာ ဇ ဝင် ချုပ် ဒု တိ ယ စောင်။ 1:1").osis()).toEqual("2Chr.1.1")
		expect(p.parse("6 ရာ၊ 1:1").osis()).toEqual("2Chr.1.1")
		expect(p.parse("၆ ရာ၊ 1:1").osis()).toEqual("2Chr.1.1")
		expect(p.parse("2Chr 1:1").osis()).toEqual("2Chr.1.1")
		expect(p.parse("6 ရာ 1:1").osis()).toEqual("2Chr.1.1")
		expect(p.parse("6ရာ၊ 1:1").osis()).toEqual("2Chr.1.1")
		expect(p.parse("၆ ရာ 1:1").osis()).toEqual("2Chr.1.1")
		expect(p.parse("၆ရာ၊ 1:1").osis()).toEqual("2Chr.1.1")
		p.include_apocrypha(false)
		expect(p.parse("ရာ ဇ ဝင် ချုပ် ဒု တိ ယ စောင်။ 1:1").osis()).toEqual("2Chr.1.1")
		expect(p.parse("6 ရာ၊ 1:1").osis()).toEqual("2Chr.1.1")
		expect(p.parse("၆ ရာ၊ 1:1").osis()).toEqual("2Chr.1.1")
		expect(p.parse("2CHR 1:1").osis()).toEqual("2Chr.1.1")
		expect(p.parse("6 ရာ 1:1").osis()).toEqual("2Chr.1.1")
		expect(p.parse("6ရာ၊ 1:1").osis()).toEqual("2Chr.1.1")
		expect(p.parse("၆ ရာ 1:1").osis()).toEqual("2Chr.1.1")
		expect(p.parse("၆ရာ၊ 1:1").osis()).toEqual("2Chr.1.1")
		;
      return true;
    });
  });

  describe("Localized book 1Chr (my)", function() {
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
    it("should handle book: 1Chr (my)", function() {
      
		expect(p.parse("ရာ ဇ ဝင် ချုပ် ပ ထ မ စောင်။ 1:1").osis()).toEqual("1Chr.1.1")
		expect(p.parse("5. ရာ၊ 1:1").osis()).toEqual("1Chr.1.1")
		expect(p.parse("5 ရာ၊ 1:1").osis()).toEqual("1Chr.1.1")
		expect(p.parse("5.ရာ၊ 1:1").osis()).toEqual("1Chr.1.1")
		expect(p.parse("၅ ရာ၊ 1:1").osis()).toEqual("1Chr.1.1")
		expect(p.parse("1Chr 1:1").osis()).toEqual("1Chr.1.1")
		expect(p.parse("5 ရာ 1:1").osis()).toEqual("1Chr.1.1")
		expect(p.parse("5ရာ၊ 1:1").osis()).toEqual("1Chr.1.1")
		expect(p.parse("၅ ရာ 1:1").osis()).toEqual("1Chr.1.1")
		expect(p.parse("၅ရာ၊ 1:1").osis()).toEqual("1Chr.1.1")
		;
      return true;
    });
    return it("should handle non-Latin digits in book: 1Chr (my)", function() {
      p.set_options({
        non_latin_digits_strategy: "replace"
      });
      
		expect(p.parse("ရာ ဇ ဝင် ချုပ် ပ ထ မ စောင်။ 1:1").osis()).toEqual("1Chr.1.1")
		expect(p.parse("5. ရာ၊ 1:1").osis()).toEqual("1Chr.1.1")
		expect(p.parse("5 ရာ၊ 1:1").osis()).toEqual("1Chr.1.1")
		expect(p.parse("5.ရာ၊ 1:1").osis()).toEqual("1Chr.1.1")
		expect(p.parse("၅ ရာ၊ 1:1").osis()).toEqual("1Chr.1.1")
		expect(p.parse("1Chr 1:1").osis()).toEqual("1Chr.1.1")
		expect(p.parse("5 ရာ 1:1").osis()).toEqual("1Chr.1.1")
		expect(p.parse("5ရာ၊ 1:1").osis()).toEqual("1Chr.1.1")
		expect(p.parse("၅ ရာ 1:1").osis()).toEqual("1Chr.1.1")
		expect(p.parse("၅ရာ၊ 1:1").osis()).toEqual("1Chr.1.1")
		p.include_apocrypha(false)
		expect(p.parse("ရာ ဇ ဝင် ချုပ် ပ ထ မ စောင်။ 1:1").osis()).toEqual("1Chr.1.1")
		expect(p.parse("5. ရာ၊ 1:1").osis()).toEqual("1Chr.1.1")
		expect(p.parse("5 ရာ၊ 1:1").osis()).toEqual("1Chr.1.1")
		expect(p.parse("5.ရာ၊ 1:1").osis()).toEqual("1Chr.1.1")
		expect(p.parse("၅ ရာ၊ 1:1").osis()).toEqual("1Chr.1.1")
		expect(p.parse("1CHR 1:1").osis()).toEqual("1Chr.1.1")
		expect(p.parse("5 ရာ 1:1").osis()).toEqual("1Chr.1.1")
		expect(p.parse("5ရာ၊ 1:1").osis()).toEqual("1Chr.1.1")
		expect(p.parse("၅ ရာ 1:1").osis()).toEqual("1Chr.1.1")
		expect(p.parse("၅ရာ၊ 1:1").osis()).toEqual("1Chr.1.1")
		;
      return true;
    });
  });

  describe("Localized book Ezra (my)", function() {
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
    return it("should handle book: Ezra (my)", function() {
      
		expect(p.parse("ဧ ဇ ရ မှတ် စာ။ 1:1").osis()).toEqual("Ezra.1.1")
		expect(p.parse("Ezra 1:1").osis()).toEqual("Ezra.1.1")
		expect(p.parse("ဧဇရ၊ 1:1").osis()).toEqual("Ezra.1.1")
		expect(p.parse("ဧဇ 1:1").osis()).toEqual("Ezra.1.1")
		p.include_apocrypha(false)
		expect(p.parse("ဧ ဇ ရ မှတ် စာ။ 1:1").osis()).toEqual("Ezra.1.1")
		expect(p.parse("EZRA 1:1").osis()).toEqual("Ezra.1.1")
		expect(p.parse("ဧဇရ၊ 1:1").osis()).toEqual("Ezra.1.1")
		expect(p.parse("ဧဇ 1:1").osis()).toEqual("Ezra.1.1")
		;
      return true;
    });
  });

  describe("Localized book Neh (my)", function() {
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
    return it("should handle book: Neh (my)", function() {
      
		expect(p.parse("နေ ဟ မိ မှတ် စာ။ 1:1").osis()).toEqual("Neh.1.1")
		expect(p.parse("Neh 1:1").osis()).toEqual("Neh.1.1")
		expect(p.parse("နေ 1:1").osis()).toEqual("Neh.1.1")
		p.include_apocrypha(false)
		expect(p.parse("နေ ဟ မိ မှတ် စာ။ 1:1").osis()).toEqual("Neh.1.1")
		expect(p.parse("NEH 1:1").osis()).toEqual("Neh.1.1")
		expect(p.parse("နေ 1:1").osis()).toEqual("Neh.1.1")
		;
      return true;
    });
  });

  describe("Localized book GkEsth (my)", function() {
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
    return it("should handle book: GkEsth (my)", function() {
      
		expect(p.parse("GkEsth 1:1").osis()).toEqual("GkEsth.1.1")
		;
      return true;
    });
  });

  describe("Localized book Esth (my)", function() {
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
    return it("should handle book: Esth (my)", function() {
      
		expect(p.parse("ဧ သ တာ ဝ တ္ထု။ 1:1").osis()).toEqual("Esth.1.1")
		expect(p.parse("Esth 1:1").osis()).toEqual("Esth.1.1")
		expect(p.parse("ဧသ 1:1").osis()).toEqual("Esth.1.1")
		p.include_apocrypha(false)
		expect(p.parse("ဧ သ တာ ဝ တ္ထု။ 1:1").osis()).toEqual("Esth.1.1")
		expect(p.parse("ESTH 1:1").osis()).toEqual("Esth.1.1")
		expect(p.parse("ဧသ 1:1").osis()).toEqual("Esth.1.1")
		;
      return true;
    });
  });

  describe("Localized book Job (my)", function() {
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
    return it("should handle book: Job (my)", function() {
      
		expect(p.parse("ယော ဘ ဝ တ္တု။ 1:1").osis()).toEqual("Job.1.1")
		expect(p.parse("ယောဘ၊ 1:1").osis()).toEqual("Job.1.1")
		expect(p.parse("ယောဘ 1:1").osis()).toEqual("Job.1.1")
		expect(p.parse("Job 1:1").osis()).toEqual("Job.1.1")
		p.include_apocrypha(false)
		expect(p.parse("ယော ဘ ဝ တ္တု။ 1:1").osis()).toEqual("Job.1.1")
		expect(p.parse("ယောဘ၊ 1:1").osis()).toEqual("Job.1.1")
		expect(p.parse("ယောဘ 1:1").osis()).toEqual("Job.1.1")
		expect(p.parse("JOB 1:1").osis()).toEqual("Job.1.1")
		;
      return true;
    });
  });

  describe("Localized book Ps (my)", function() {
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
    return it("should handle book: Ps (my)", function() {
      
		expect(p.parse("ဆာ လံ ကျမ်း။ 1:1").osis()).toEqual("Ps.1.1")
		expect(p.parse("ဆာလံ၊ 1:1").osis()).toEqual("Ps.1.1")
		expect(p.parse("ဆာ၊ 1:1").osis()).toEqual("Ps.1.1")
		expect(p.parse("Ps 1:1").osis()).toEqual("Ps.1.1")
		expect(p.parse("ဆာ 1:1").osis()).toEqual("Ps.1.1")
		p.include_apocrypha(false)
		expect(p.parse("ဆာ လံ ကျမ်း။ 1:1").osis()).toEqual("Ps.1.1")
		expect(p.parse("ဆာလံ၊ 1:1").osis()).toEqual("Ps.1.1")
		expect(p.parse("ဆာ၊ 1:1").osis()).toEqual("Ps.1.1")
		expect(p.parse("PS 1:1").osis()).toEqual("Ps.1.1")
		expect(p.parse("ဆာ 1:1").osis()).toEqual("Ps.1.1")
		;
      return true;
    });
  });

  describe("Localized book PrAzar (my)", function() {
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
    return it("should handle book: PrAzar (my)", function() {
      
		expect(p.parse("PrAzar 1:1").osis()).toEqual("PrAzar.1.1")
		;
      return true;
    });
  });

  describe("Localized book Prov (my)", function() {
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
    return it("should handle book: Prov (my)", function() {
      
		expect(p.parse("သု တ္တံ ကျမ်း။ 1:1").osis()).toEqual("Prov.1.1")
		expect(p.parse("သုတ္တံ၊ 1:1").osis()).toEqual("Prov.1.1")
		expect(p.parse("Prov 1:1").osis()).toEqual("Prov.1.1")
		expect(p.parse("သု 1:1").osis()).toEqual("Prov.1.1")
		p.include_apocrypha(false)
		expect(p.parse("သု တ္တံ ကျမ်း။ 1:1").osis()).toEqual("Prov.1.1")
		expect(p.parse("သုတ္တံ၊ 1:1").osis()).toEqual("Prov.1.1")
		expect(p.parse("PROV 1:1").osis()).toEqual("Prov.1.1")
		expect(p.parse("သု 1:1").osis()).toEqual("Prov.1.1")
		;
      return true;
    });
  });

  describe("Localized book Eccl (my)", function() {
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
    return it("should handle book: Eccl (my)", function() {
      
		expect(p.parse("ဒေ သ နာ ကျမ်း။ 1:1").osis()).toEqual("Eccl.1.1")
		expect(p.parse("ဒေသနာ၊ 1:1").osis()).toEqual("Eccl.1.1")
		expect(p.parse("Eccl 1:1").osis()).toEqual("Eccl.1.1")
		expect(p.parse("ဒေ 1:1").osis()).toEqual("Eccl.1.1")
		p.include_apocrypha(false)
		expect(p.parse("ဒေ သ နာ ကျမ်း။ 1:1").osis()).toEqual("Eccl.1.1")
		expect(p.parse("ဒေသနာ၊ 1:1").osis()).toEqual("Eccl.1.1")
		expect(p.parse("ECCL 1:1").osis()).toEqual("Eccl.1.1")
		expect(p.parse("ဒေ 1:1").osis()).toEqual("Eccl.1.1")
		;
      return true;
    });
  });

  describe("Localized book SgThree (my)", function() {
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
    return it("should handle book: SgThree (my)", function() {
      
		expect(p.parse("SgThree 1:1").osis()).toEqual("SgThree.1.1")
		;
      return true;
    });
  });

  describe("Localized book Song (my)", function() {
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
    return it("should handle book: Song (my)", function() {
      
		expect(p.parse("ရှော လ မုန် သီ ချင်း။ 1:1").osis()).toEqual("Song.1.1")
		expect(p.parse("Song 1:1").osis()).toEqual("Song.1.1")
		expect(p.parse("သီ 1:1").osis()).toEqual("Song.1.1")
		p.include_apocrypha(false)
		expect(p.parse("ရှော လ မုန် သီ ချင်း။ 1:1").osis()).toEqual("Song.1.1")
		expect(p.parse("SONG 1:1").osis()).toEqual("Song.1.1")
		expect(p.parse("သီ 1:1").osis()).toEqual("Song.1.1")
		;
      return true;
    });
  });

  describe("Localized book Jer (my)", function() {
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
    return it("should handle book: Jer (my)", function() {
      
		expect(p.parse("ယေ ရ မိ အ နာ ဂ တ္တိ ကျမ်း။ 1:1").osis()).toEqual("Jer.1.1")
		expect(p.parse("ယေရမိ၊ 1:1").osis()).toEqual("Jer.1.1")
		expect(p.parse("ယေရမိ 1:1").osis()).toEqual("Jer.1.1")
		expect(p.parse("Jer 1:1").osis()).toEqual("Jer.1.1")
		expect(p.parse("ယေ 1:1").osis()).toEqual("Jer.1.1")
		p.include_apocrypha(false)
		expect(p.parse("ယေ ရ မိ အ နာ ဂ တ္တိ ကျမ်း။ 1:1").osis()).toEqual("Jer.1.1")
		expect(p.parse("ယေရမိ၊ 1:1").osis()).toEqual("Jer.1.1")
		expect(p.parse("ယေရမိ 1:1").osis()).toEqual("Jer.1.1")
		expect(p.parse("JER 1:1").osis()).toEqual("Jer.1.1")
		expect(p.parse("ယေ 1:1").osis()).toEqual("Jer.1.1")
		;
      return true;
    });
  });

  describe("Localized book Ezek (my)", function() {
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
    return it("should handle book: Ezek (my)", function() {
      
		expect(p.parse("ယေ ဇ ကျေ လ အ နာ ဂ တ္တိ ကျမ်း။ 1:1").osis()).toEqual("Ezek.1.1")
		expect(p.parse("ယေဇကျေလ၊ 1:1").osis()).toEqual("Ezek.1.1")
		expect(p.parse("ယေဇ‌ကျေလ 1:1").osis()).toEqual("Ezek.1.1")
		expect(p.parse("Ezek 1:1").osis()).toEqual("Ezek.1.1")
		expect(p.parse("ယေဇ 1:1").osis()).toEqual("Ezek.1.1")
		p.include_apocrypha(false)
		expect(p.parse("ယေ ဇ ကျေ လ အ နာ ဂ တ္တိ ကျမ်း။ 1:1").osis()).toEqual("Ezek.1.1")
		expect(p.parse("ယေဇကျေလ၊ 1:1").osis()).toEqual("Ezek.1.1")
		expect(p.parse("ယေဇ‌ကျေလ 1:1").osis()).toEqual("Ezek.1.1")
		expect(p.parse("EZEK 1:1").osis()).toEqual("Ezek.1.1")
		expect(p.parse("ယေဇ 1:1").osis()).toEqual("Ezek.1.1")
		;
      return true;
    });
  });

  describe("Localized book Dan (my)", function() {
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
    return it("should handle book: Dan (my)", function() {
      
		expect(p.parse("ဒံ ယေ လ အ နာ ဂ တ္တိ ကျမ်း။ 1:1").osis()).toEqual("Dan.1.1")
		expect(p.parse("ဒံ‌ယေလ 1:1").osis()).toEqual("Dan.1.1")
		expect(p.parse("Dan 1:1").osis()).toEqual("Dan.1.1")
		expect(p.parse("ဒံ၊ 1:1").osis()).toEqual("Dan.1.1")
		expect(p.parse("ဒံ 1:1").osis()).toEqual("Dan.1.1")
		p.include_apocrypha(false)
		expect(p.parse("ဒံ ယေ လ အ နာ ဂ တ္တိ ကျမ်း။ 1:1").osis()).toEqual("Dan.1.1")
		expect(p.parse("ဒံ‌ယေလ 1:1").osis()).toEqual("Dan.1.1")
		expect(p.parse("DAN 1:1").osis()).toEqual("Dan.1.1")
		expect(p.parse("ဒံ၊ 1:1").osis()).toEqual("Dan.1.1")
		expect(p.parse("ဒံ 1:1").osis()).toEqual("Dan.1.1")
		;
      return true;
    });
  });

  describe("Localized book Hos (my)", function() {
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
    return it("should handle book: Hos (my)", function() {
      
		expect(p.parse("ဟော ရှေ အ နာ ဂ တ္တိ ကျမ်း။ 1:1").osis()).toEqual("Hos.1.1")
		expect(p.parse("Hos 1:1").osis()).toEqual("Hos.1.1")
		expect(p.parse("ဟော 1:1").osis()).toEqual("Hos.1.1")
		p.include_apocrypha(false)
		expect(p.parse("ဟော ရှေ အ နာ ဂ တ္တိ ကျမ်း။ 1:1").osis()).toEqual("Hos.1.1")
		expect(p.parse("HOS 1:1").osis()).toEqual("Hos.1.1")
		expect(p.parse("ဟော 1:1").osis()).toEqual("Hos.1.1")
		;
      return true;
    });
  });

  describe("Localized book Joel (my)", function() {
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
    return it("should handle book: Joel (my)", function() {
      
		expect(p.parse("ယော လ အ နာ ဂ တ္တိ ကျမ်း။ 1:1").osis()).toEqual("Joel.1.1")
		expect(p.parse("Joel 1:1").osis()).toEqual("Joel.1.1")
		expect(p.parse("ယောလ 1:1").osis()).toEqual("Joel.1.1")
		p.include_apocrypha(false)
		expect(p.parse("ယော လ အ နာ ဂ တ္တိ ကျမ်း။ 1:1").osis()).toEqual("Joel.1.1")
		expect(p.parse("JOEL 1:1").osis()).toEqual("Joel.1.1")
		expect(p.parse("ယောလ 1:1").osis()).toEqual("Joel.1.1")
		;
      return true;
    });
  });

  describe("Localized book Amos (my)", function() {
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
    return it("should handle book: Amos (my)", function() {
      
		expect(p.parse("အာ မုတ် အ နာ ဂ တ္တိ ကျမ်း။ 1:1").osis()).toEqual("Amos.1.1")
		expect(p.parse("Amos 1:1").osis()).toEqual("Amos.1.1")
		expect(p.parse("အာ 1:1").osis()).toEqual("Amos.1.1")
		p.include_apocrypha(false)
		expect(p.parse("အာ မုတ် အ နာ ဂ တ္တိ ကျမ်း။ 1:1").osis()).toEqual("Amos.1.1")
		expect(p.parse("AMOS 1:1").osis()).toEqual("Amos.1.1")
		expect(p.parse("အာ 1:1").osis()).toEqual("Amos.1.1")
		;
      return true;
    });
  });

  describe("Localized book Obad (my)", function() {
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
    return it("should handle book: Obad (my)", function() {
      
		expect(p.parse("ဩ ဗ ဒိ ဗျာ ဒိတ် ရူ ပါ ရုံ။ 1:1").osis()).toEqual("Obad.1.1")
		expect(p.parse("Obad 1:1").osis()).toEqual("Obad.1.1")
		expect(p.parse("ဩ 1:1").osis()).toEqual("Obad.1.1")
		p.include_apocrypha(false)
		expect(p.parse("ဩ ဗ ဒိ ဗျာ ဒိတ် ရူ ပါ ရုံ။ 1:1").osis()).toEqual("Obad.1.1")
		expect(p.parse("OBAD 1:1").osis()).toEqual("Obad.1.1")
		expect(p.parse("ဩ 1:1").osis()).toEqual("Obad.1.1")
		;
      return true;
    });
  });

  describe("Localized book Jonah (my)", function() {
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
    return it("should handle book: Jonah (my)", function() {
      
		expect(p.parse("ယော န ဝ တ္ထု။ 1:1").osis()).toEqual("Jonah.1.1")
		expect(p.parse("Jonah 1:1").osis()).toEqual("Jonah.1.1")
		expect(p.parse("ယောန 1:1").osis()).toEqual("Jonah.1.1")
		p.include_apocrypha(false)
		expect(p.parse("ယော န ဝ တ္ထု။ 1:1").osis()).toEqual("Jonah.1.1")
		expect(p.parse("JONAH 1:1").osis()).toEqual("Jonah.1.1")
		expect(p.parse("ယောန 1:1").osis()).toEqual("Jonah.1.1")
		;
      return true;
    });
  });

  describe("Localized book Mic (my)", function() {
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
    return it("should handle book: Mic (my)", function() {
      
		expect(p.parse("မိ က္ခာ အ နာ ဂ တ္တိ ကျမ်း။ 1:1").osis()).toEqual("Mic.1.1")
		expect(p.parse("Mic 1:1").osis()).toEqual("Mic.1.1")
		expect(p.parse("မိ 1:1").osis()).toEqual("Mic.1.1")
		p.include_apocrypha(false)
		expect(p.parse("မိ က္ခာ အ နာ ဂ တ္တိ ကျမ်း။ 1:1").osis()).toEqual("Mic.1.1")
		expect(p.parse("MIC 1:1").osis()).toEqual("Mic.1.1")
		expect(p.parse("မိ 1:1").osis()).toEqual("Mic.1.1")
		;
      return true;
    });
  });

  describe("Localized book Nah (my)", function() {
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
    return it("should handle book: Nah (my)", function() {
      
		expect(p.parse("နာ ဟုံ အ နာ ဂ တ္တိ ကျမ်း။ 1:1").osis()).toEqual("Nah.1.1")
		expect(p.parse("Nah 1:1").osis()).toEqual("Nah.1.1")
		expect(p.parse("နာ 1:1").osis()).toEqual("Nah.1.1")
		p.include_apocrypha(false)
		expect(p.parse("နာ ဟုံ အ နာ ဂ တ္တိ ကျမ်း။ 1:1").osis()).toEqual("Nah.1.1")
		expect(p.parse("NAH 1:1").osis()).toEqual("Nah.1.1")
		expect(p.parse("နာ 1:1").osis()).toEqual("Nah.1.1")
		;
      return true;
    });
  });

  describe("Localized book Hab (my)", function() {
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
    return it("should handle book: Hab (my)", function() {
      
		expect(p.parse("ဟ ဗ က္ကုတ် အ နာ ဂ တ္တိ ကျမ်း။ 1:1").osis()).toEqual("Hab.1.1")
		expect(p.parse("Hab 1:1").osis()).toEqual("Hab.1.1")
		expect(p.parse("ဟဗ 1:1").osis()).toEqual("Hab.1.1")
		p.include_apocrypha(false)
		expect(p.parse("ဟ ဗ က္ကုတ် အ နာ ဂ တ္တိ ကျမ်း။ 1:1").osis()).toEqual("Hab.1.1")
		expect(p.parse("HAB 1:1").osis()).toEqual("Hab.1.1")
		expect(p.parse("ဟဗ 1:1").osis()).toEqual("Hab.1.1")
		;
      return true;
    });
  });

  describe("Localized book Zeph (my)", function() {
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
    return it("should handle book: Zeph (my)", function() {
      
		expect(p.parse("ဇေ ဖ နိ အ နာ ဂ တ္တိ ကျမ်း။ 1:1").osis()).toEqual("Zeph.1.1")
		expect(p.parse("Zeph 1:1").osis()).toEqual("Zeph.1.1")
		expect(p.parse("ဇေ 1:1").osis()).toEqual("Zeph.1.1")
		p.include_apocrypha(false)
		expect(p.parse("ဇေ ဖ နိ အ နာ ဂ တ္တိ ကျမ်း။ 1:1").osis()).toEqual("Zeph.1.1")
		expect(p.parse("ZEPH 1:1").osis()).toEqual("Zeph.1.1")
		expect(p.parse("ဇေ 1:1").osis()).toEqual("Zeph.1.1")
		;
      return true;
    });
  });

  describe("Localized book Hag (my)", function() {
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
    return it("should handle book: Hag (my)", function() {
      
		expect(p.parse("ဟ ဂ္ဂဲ အ နာ ဂ တ္တိ ကျမ်း။ 1:1").osis()).toEqual("Hag.1.1")
		expect(p.parse("ဟ ဂ္ဂဲ 1:1").osis()).toEqual("Hag.1.1")
		expect(p.parse("Hag 1:1").osis()).toEqual("Hag.1.1")
		expect(p.parse("ဟဂ္ 1:1").osis()).toEqual("Hag.1.1")
		p.include_apocrypha(false)
		expect(p.parse("ဟ ဂ္ဂဲ အ နာ ဂ တ္တိ ကျမ်း။ 1:1").osis()).toEqual("Hag.1.1")
		expect(p.parse("ဟ ဂ္ဂဲ 1:1").osis()).toEqual("Hag.1.1")
		expect(p.parse("HAG 1:1").osis()).toEqual("Hag.1.1")
		expect(p.parse("ဟဂ္ 1:1").osis()).toEqual("Hag.1.1")
		;
      return true;
    });
  });

  describe("Localized book Zech (my)", function() {
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
    return it("should handle book: Zech (my)", function() {
      
		expect(p.parse("ဇာ ခ ရိ အ နာ ဂ တ္တိ ကျမ်း။ 1:1").osis()).toEqual("Zech.1.1")
		expect(p.parse("ဇာခရိ၊ 1:1").osis()).toEqual("Zech.1.1")
		expect(p.parse("Zech 1:1").osis()).toEqual("Zech.1.1")
		expect(p.parse("ဇာ 1:1").osis()).toEqual("Zech.1.1")
		p.include_apocrypha(false)
		expect(p.parse("ဇာ ခ ရိ အ နာ ဂ တ္တိ ကျမ်း။ 1:1").osis()).toEqual("Zech.1.1")
		expect(p.parse("ဇာခရိ၊ 1:1").osis()).toEqual("Zech.1.1")
		expect(p.parse("ZECH 1:1").osis()).toEqual("Zech.1.1")
		expect(p.parse("ဇာ 1:1").osis()).toEqual("Zech.1.1")
		;
      return true;
    });
  });

  describe("Localized book Mal (my)", function() {
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
    return it("should handle book: Mal (my)", function() {
      
		expect(p.parse("မာ လ ခိ အ နာ ဂ တ္တိ ကျမ်း။ 1:1").osis()).toEqual("Mal.1.1")
		expect(p.parse("မာလခိ၊ 1:1").osis()).toEqual("Mal.1.1")
		expect(p.parse("မာလခိ 1:1").osis()).toEqual("Mal.1.1")
		expect(p.parse("Mal 1:1").osis()).toEqual("Mal.1.1")
		expect(p.parse("မာလ 1:1").osis()).toEqual("Mal.1.1")
		p.include_apocrypha(false)
		expect(p.parse("မာ လ ခိ အ နာ ဂ တ္တိ ကျမ်း။ 1:1").osis()).toEqual("Mal.1.1")
		expect(p.parse("မာလခိ၊ 1:1").osis()).toEqual("Mal.1.1")
		expect(p.parse("မာလခိ 1:1").osis()).toEqual("Mal.1.1")
		expect(p.parse("MAL 1:1").osis()).toEqual("Mal.1.1")
		expect(p.parse("မာလ 1:1").osis()).toEqual("Mal.1.1")
		;
      return true;
    });
  });

  describe("Localized book Matt (my)", function() {
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
    return it("should handle book: Matt (my)", function() {
      
		expect(p.parse("ရှင် မဿဲ ခ ရစ် ဝင်။ 1:1").osis()).toEqual("Matt.1.1")
		expect(p.parse("Matt 1:1").osis()).toEqual("Matt.1.1")
		expect(p.parse("မသဲ၊ 1:1").osis()).toEqual("Matt.1.1")
		expect(p.parse("မဿဲ 1:1").osis()).toEqual("Matt.1.1")
		expect(p.parse("မ 1:1").osis()).toEqual("Matt.1.1")
		p.include_apocrypha(false)
		expect(p.parse("ရှင် မဿဲ ခ ရစ် ဝင်။ 1:1").osis()).toEqual("Matt.1.1")
		expect(p.parse("MATT 1:1").osis()).toEqual("Matt.1.1")
		expect(p.parse("မသဲ၊ 1:1").osis()).toEqual("Matt.1.1")
		expect(p.parse("မဿဲ 1:1").osis()).toEqual("Matt.1.1")
		expect(p.parse("မ 1:1").osis()).toEqual("Matt.1.1")
		;
      return true;
    });
  });

  describe("Localized book Mark (my)", function() {
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
    return it("should handle book: Mark (my)", function() {
      
		expect(p.parse("ရှင် မာ ကု ခ ရစ် ဝင်။ 1:1").osis()).toEqual("Mark.1.1")
		expect(p.parse("မာကု၊ 1:1").osis()).toEqual("Mark.1.1")
		expect(p.parse("Mark 1:1").osis()).toEqual("Mark.1.1")
		expect(p.parse("မာ 1:1").osis()).toEqual("Mark.1.1")
		p.include_apocrypha(false)
		expect(p.parse("ရှင် မာ ကု ခ ရစ် ဝင်။ 1:1").osis()).toEqual("Mark.1.1")
		expect(p.parse("မာကု၊ 1:1").osis()).toEqual("Mark.1.1")
		expect(p.parse("MARK 1:1").osis()).toEqual("Mark.1.1")
		expect(p.parse("မာ 1:1").osis()).toEqual("Mark.1.1")
		;
      return true;
    });
  });

  describe("Localized book Luke (my)", function() {
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
    return it("should handle book: Luke (my)", function() {
      
		expect(p.parse("ရှင် လု ကာ ခ ရစ် ဝင်။ 1:1").osis()).toEqual("Luke.1.1")
		expect(p.parse("လုကာ၊ 1:1").osis()).toEqual("Luke.1.1")
		expect(p.parse("Luke 1:1").osis()).toEqual("Luke.1.1")
		expect(p.parse("လုကာ 1:1").osis()).toEqual("Luke.1.1")
		expect(p.parse("လု 1:1").osis()).toEqual("Luke.1.1")
		p.include_apocrypha(false)
		expect(p.parse("ရှင် လု ကာ ခ ရစ် ဝင်။ 1:1").osis()).toEqual("Luke.1.1")
		expect(p.parse("လုကာ၊ 1:1").osis()).toEqual("Luke.1.1")
		expect(p.parse("LUKE 1:1").osis()).toEqual("Luke.1.1")
		expect(p.parse("လုကာ 1:1").osis()).toEqual("Luke.1.1")
		expect(p.parse("လု 1:1").osis()).toEqual("Luke.1.1")
		;
      return true;
    });
  });

  describe("Localized book 1John (my)", function() {
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
    it("should handle book: 1John (my)", function() {
      
		expect(p.parse("ရှင် ယော ဟန် ဩ ဝါ ဒ စာ ပ ထ မ စောင်။ 1:1").osis()).toEqual("1John.1.1")
		expect(p.parse("1. ယော၊ 1:1").osis()).toEqual("1John.1.1")
		expect(p.parse("1 ယော၊ 1:1").osis()).toEqual("1John.1.1")
		expect(p.parse("1.ယော၊ 1:1").osis()).toEqual("1John.1.1")
		expect(p.parse("၁ ယော၊ 1:1").osis()).toEqual("1John.1.1")
		expect(p.parse("1 ယော 1:1").osis()).toEqual("1John.1.1")
		expect(p.parse("1John 1:1").osis()).toEqual("1John.1.1")
		expect(p.parse("1ယော၊ 1:1").osis()).toEqual("1John.1.1")
		expect(p.parse("၁ ယော 1:1").osis()).toEqual("1John.1.1")
		expect(p.parse("၁ယော၊ 1:1").osis()).toEqual("1John.1.1")
		;
      return true;
    });
    return it("should handle non-Latin digits in book: 1John (my)", function() {
      p.set_options({
        non_latin_digits_strategy: "replace"
      });
      
		expect(p.parse("ရှင် ယော ဟန် ဩ ဝါ ဒ စာ ပ ထ မ စောင်။ 1:1").osis()).toEqual("1John.1.1")
		expect(p.parse("1. ယော၊ 1:1").osis()).toEqual("1John.1.1")
		expect(p.parse("1 ယော၊ 1:1").osis()).toEqual("1John.1.1")
		expect(p.parse("1.ယော၊ 1:1").osis()).toEqual("1John.1.1")
		expect(p.parse("၁ ယော၊ 1:1").osis()).toEqual("1John.1.1")
		expect(p.parse("1 ယော 1:1").osis()).toEqual("1John.1.1")
		expect(p.parse("1John 1:1").osis()).toEqual("1John.1.1")
		expect(p.parse("1ယော၊ 1:1").osis()).toEqual("1John.1.1")
		expect(p.parse("၁ ယော 1:1").osis()).toEqual("1John.1.1")
		expect(p.parse("၁ယော၊ 1:1").osis()).toEqual("1John.1.1")
		p.include_apocrypha(false)
		expect(p.parse("ရှင် ယော ဟန် ဩ ဝါ ဒ စာ ပ ထ မ စောင်။ 1:1").osis()).toEqual("1John.1.1")
		expect(p.parse("1. ယော၊ 1:1").osis()).toEqual("1John.1.1")
		expect(p.parse("1 ယော၊ 1:1").osis()).toEqual("1John.1.1")
		expect(p.parse("1.ယော၊ 1:1").osis()).toEqual("1John.1.1")
		expect(p.parse("၁ ယော၊ 1:1").osis()).toEqual("1John.1.1")
		expect(p.parse("1 ယော 1:1").osis()).toEqual("1John.1.1")
		expect(p.parse("1JOHN 1:1").osis()).toEqual("1John.1.1")
		expect(p.parse("1ယော၊ 1:1").osis()).toEqual("1John.1.1")
		expect(p.parse("၁ ယော 1:1").osis()).toEqual("1John.1.1")
		expect(p.parse("၁ယော၊ 1:1").osis()).toEqual("1John.1.1")
		;
      return true;
    });
  });

  describe("Localized book 2John (my)", function() {
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
    it("should handle book: 2John (my)", function() {
      
		expect(p.parse("ရှင် ယော ဟန် ဩ ဝါ ဒ စာ ဒု တိ ယ စောင်။ 1:1").osis()).toEqual("2John.1.1")
		expect(p.parse("2. ယော၊ 1:1").osis()).toEqual("2John.1.1")
		expect(p.parse("2 ယော၊ 1:1").osis()).toEqual("2John.1.1")
		expect(p.parse("2.ယော၊ 1:1").osis()).toEqual("2John.1.1")
		expect(p.parse("၂ ယော၊ 1:1").osis()).toEqual("2John.1.1")
		expect(p.parse("2 ယော 1:1").osis()).toEqual("2John.1.1")
		expect(p.parse("2John 1:1").osis()).toEqual("2John.1.1")
		expect(p.parse("2ယော၊ 1:1").osis()).toEqual("2John.1.1")
		expect(p.parse("၂ ယော 1:1").osis()).toEqual("2John.1.1")
		expect(p.parse("၂ယော၊ 1:1").osis()).toEqual("2John.1.1")
		;
      return true;
    });
    return it("should handle non-Latin digits in book: 2John (my)", function() {
      p.set_options({
        non_latin_digits_strategy: "replace"
      });
      
		expect(p.parse("ရှင် ယော ဟန် ဩ ဝါ ဒ စာ ဒု တိ ယ စောင်။ 1:1").osis()).toEqual("2John.1.1")
		expect(p.parse("2. ယော၊ 1:1").osis()).toEqual("2John.1.1")
		expect(p.parse("2 ယော၊ 1:1").osis()).toEqual("2John.1.1")
		expect(p.parse("2.ယော၊ 1:1").osis()).toEqual("2John.1.1")
		expect(p.parse("၂ ယော၊ 1:1").osis()).toEqual("2John.1.1")
		expect(p.parse("2 ယော 1:1").osis()).toEqual("2John.1.1")
		expect(p.parse("2John 1:1").osis()).toEqual("2John.1.1")
		expect(p.parse("2ယော၊ 1:1").osis()).toEqual("2John.1.1")
		expect(p.parse("၂ ယော 1:1").osis()).toEqual("2John.1.1")
		expect(p.parse("၂ယော၊ 1:1").osis()).toEqual("2John.1.1")
		p.include_apocrypha(false)
		expect(p.parse("ရှင် ယော ဟန် ဩ ဝါ ဒ စာ ဒု တိ ယ စောင်။ 1:1").osis()).toEqual("2John.1.1")
		expect(p.parse("2. ယော၊ 1:1").osis()).toEqual("2John.1.1")
		expect(p.parse("2 ယော၊ 1:1").osis()).toEqual("2John.1.1")
		expect(p.parse("2.ယော၊ 1:1").osis()).toEqual("2John.1.1")
		expect(p.parse("၂ ယော၊ 1:1").osis()).toEqual("2John.1.1")
		expect(p.parse("2 ယော 1:1").osis()).toEqual("2John.1.1")
		expect(p.parse("2JOHN 1:1").osis()).toEqual("2John.1.1")
		expect(p.parse("2ယော၊ 1:1").osis()).toEqual("2John.1.1")
		expect(p.parse("၂ ယော 1:1").osis()).toEqual("2John.1.1")
		expect(p.parse("၂ယော၊ 1:1").osis()).toEqual("2John.1.1")
		;
      return true;
    });
  });

  describe("Localized book 3John (my)", function() {
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
    it("should handle book: 3John (my)", function() {
      
		expect(p.parse("ရှင် ယော ဟန် ဩ ဝါ ဒ စာ တ တိ ယ စောင်။ 1:1").osis()).toEqual("3John.1.1")
		expect(p.parse("3. ယော၊ 1:1").osis()).toEqual("3John.1.1")
		expect(p.parse("3 ယော၊ 1:1").osis()).toEqual("3John.1.1")
		expect(p.parse("3.ယော၊ 1:1").osis()).toEqual("3John.1.1")
		expect(p.parse("၃ ယော၊ 1:1").osis()).toEqual("3John.1.1")
		expect(p.parse("3 ယော 1:1").osis()).toEqual("3John.1.1")
		expect(p.parse("3John 1:1").osis()).toEqual("3John.1.1")
		expect(p.parse("3ယော၊ 1:1").osis()).toEqual("3John.1.1")
		expect(p.parse("၃ ယော 1:1").osis()).toEqual("3John.1.1")
		expect(p.parse("၃ယော၊ 1:1").osis()).toEqual("3John.1.1")
		;
      return true;
    });
    return it("should handle non-Latin digits in book: 3John (my)", function() {
      p.set_options({
        non_latin_digits_strategy: "replace"
      });
      
		expect(p.parse("ရှင် ယော ဟန် ဩ ဝါ ဒ စာ တ တိ ယ စောင်။ 1:1").osis()).toEqual("3John.1.1")
		expect(p.parse("3. ယော၊ 1:1").osis()).toEqual("3John.1.1")
		expect(p.parse("3 ယော၊ 1:1").osis()).toEqual("3John.1.1")
		expect(p.parse("3.ယော၊ 1:1").osis()).toEqual("3John.1.1")
		expect(p.parse("၃ ယော၊ 1:1").osis()).toEqual("3John.1.1")
		expect(p.parse("3 ယော 1:1").osis()).toEqual("3John.1.1")
		expect(p.parse("3John 1:1").osis()).toEqual("3John.1.1")
		expect(p.parse("3ယော၊ 1:1").osis()).toEqual("3John.1.1")
		expect(p.parse("၃ ယော 1:1").osis()).toEqual("3John.1.1")
		expect(p.parse("၃ယော၊ 1:1").osis()).toEqual("3John.1.1")
		p.include_apocrypha(false)
		expect(p.parse("ရှင် ယော ဟန် ဩ ဝါ ဒ စာ တ တိ ယ စောင်။ 1:1").osis()).toEqual("3John.1.1")
		expect(p.parse("3. ယော၊ 1:1").osis()).toEqual("3John.1.1")
		expect(p.parse("3 ယော၊ 1:1").osis()).toEqual("3John.1.1")
		expect(p.parse("3.ယော၊ 1:1").osis()).toEqual("3John.1.1")
		expect(p.parse("၃ ယော၊ 1:1").osis()).toEqual("3John.1.1")
		expect(p.parse("3 ယော 1:1").osis()).toEqual("3John.1.1")
		expect(p.parse("3JOHN 1:1").osis()).toEqual("3John.1.1")
		expect(p.parse("3ယော၊ 1:1").osis()).toEqual("3John.1.1")
		expect(p.parse("၃ ယော 1:1").osis()).toEqual("3John.1.1")
		expect(p.parse("၃ယော၊ 1:1").osis()).toEqual("3John.1.1")
		;
      return true;
    });
  });

  describe("Localized book John (my)", function() {
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
    return it("should handle book: John (my)", function() {
      
		expect(p.parse("ရှင် ယော ဟန် ခ ရစ် ဝင်။ 1:1").osis()).toEqual("John.1.1")
		expect(p.parse("ယောဟန်၊ 1:1").osis()).toEqual("John.1.1")
		expect(p.parse("ယောဟန် 1:1").osis()).toEqual("John.1.1")
		expect(p.parse("John 1:1").osis()).toEqual("John.1.1")
		expect(p.parse("ယော 1:1").osis()).toEqual("John.1.1")
		p.include_apocrypha(false)
		expect(p.parse("ရှင် ယော ဟန် ခ ရစ် ဝင်။ 1:1").osis()).toEqual("John.1.1")
		expect(p.parse("ယောဟန်၊ 1:1").osis()).toEqual("John.1.1")
		expect(p.parse("ယောဟန် 1:1").osis()).toEqual("John.1.1")
		expect(p.parse("JOHN 1:1").osis()).toEqual("John.1.1")
		expect(p.parse("ယော 1:1").osis()).toEqual("John.1.1")
		;
      return true;
    });
  });

  describe("Localized book Acts (my)", function() {
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
    return it("should handle book: Acts (my)", function() {
      
		expect(p.parse("တ မန် တော် ဝ တ္ထု။ 1:1").osis()).toEqual("Acts.1.1")
		expect(p.parse("တမန်၊ 1:1").osis()).toEqual("Acts.1.1")
		expect(p.parse("Acts 1:1").osis()).toEqual("Acts.1.1")
		expect(p.parse("တ 1:1").osis()).toEqual("Acts.1.1")
		p.include_apocrypha(false)
		expect(p.parse("တ မန် တော် ဝ တ္ထု။ 1:1").osis()).toEqual("Acts.1.1")
		expect(p.parse("တမန်၊ 1:1").osis()).toEqual("Acts.1.1")
		expect(p.parse("ACTS 1:1").osis()).toEqual("Acts.1.1")
		expect(p.parse("တ 1:1").osis()).toEqual("Acts.1.1")
		;
      return true;
    });
  });

  describe("Localized book Rom (my)", function() {
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
    return it("should handle book: Rom (my)", function() {
      
		expect(p.parse("ရော မ ဩ ဝါ ဒ စာ။ 1:1").osis()).toEqual("Rom.1.1")
		expect(p.parse("ရောမ၊ 1:1").osis()).toEqual("Rom.1.1")
		expect(p.parse("ရောမ 1:1").osis()).toEqual("Rom.1.1")
		expect(p.parse("Rom 1:1").osis()).toEqual("Rom.1.1")
		expect(p.parse("ရော 1:1").osis()).toEqual("Rom.1.1")
		p.include_apocrypha(false)
		expect(p.parse("ရော မ ဩ ဝါ ဒ စာ။ 1:1").osis()).toEqual("Rom.1.1")
		expect(p.parse("ရောမ၊ 1:1").osis()).toEqual("Rom.1.1")
		expect(p.parse("ရောမ 1:1").osis()).toEqual("Rom.1.1")
		expect(p.parse("ROM 1:1").osis()).toEqual("Rom.1.1")
		expect(p.parse("ရော 1:1").osis()).toEqual("Rom.1.1")
		;
      return true;
    });
  });

  describe("Localized book 2Cor (my)", function() {
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
    it("should handle book: 2Cor (my)", function() {
      
		expect(p.parse("ကော ရိ န္သု ဩ ဝါ ဒ စာ ဒု တိ ယ စောင်။ 1:1").osis()).toEqual("2Cor.1.1")
		expect(p.parse("2. ကော၊ 1:1").osis()).toEqual("2Cor.1.1")
		expect(p.parse("2 ကော၊ 1:1").osis()).toEqual("2Cor.1.1")
		expect(p.parse("2.ကော၊ 1:1").osis()).toEqual("2Cor.1.1")
		expect(p.parse("၂ ကော၊ 1:1").osis()).toEqual("2Cor.1.1")
		expect(p.parse("2 ကော 1:1").osis()).toEqual("2Cor.1.1")
		expect(p.parse("2ကော၊ 1:1").osis()).toEqual("2Cor.1.1")
		expect(p.parse("၂ ကော 1:1").osis()).toEqual("2Cor.1.1")
		expect(p.parse("၂ကော၊ 1:1").osis()).toEqual("2Cor.1.1")
		expect(p.parse("2Cor 1:1").osis()).toEqual("2Cor.1.1")
		;
      return true;
    });
    return it("should handle non-Latin digits in book: 2Cor (my)", function() {
      p.set_options({
        non_latin_digits_strategy: "replace"
      });
      
		expect(p.parse("ကော ရိ န္သု ဩ ဝါ ဒ စာ ဒု တိ ယ စောင်။ 1:1").osis()).toEqual("2Cor.1.1")
		expect(p.parse("2. ကော၊ 1:1").osis()).toEqual("2Cor.1.1")
		expect(p.parse("2 ကော၊ 1:1").osis()).toEqual("2Cor.1.1")
		expect(p.parse("2.ကော၊ 1:1").osis()).toEqual("2Cor.1.1")
		expect(p.parse("၂ ကော၊ 1:1").osis()).toEqual("2Cor.1.1")
		expect(p.parse("2 ကော 1:1").osis()).toEqual("2Cor.1.1")
		expect(p.parse("2ကော၊ 1:1").osis()).toEqual("2Cor.1.1")
		expect(p.parse("၂ ကော 1:1").osis()).toEqual("2Cor.1.1")
		expect(p.parse("၂ကော၊ 1:1").osis()).toEqual("2Cor.1.1")
		expect(p.parse("2Cor 1:1").osis()).toEqual("2Cor.1.1")
		p.include_apocrypha(false)
		expect(p.parse("ကော ရိ န္သု ဩ ဝါ ဒ စာ ဒု တိ ယ စောင်။ 1:1").osis()).toEqual("2Cor.1.1")
		expect(p.parse("2. ကော၊ 1:1").osis()).toEqual("2Cor.1.1")
		expect(p.parse("2 ကော၊ 1:1").osis()).toEqual("2Cor.1.1")
		expect(p.parse("2.ကော၊ 1:1").osis()).toEqual("2Cor.1.1")
		expect(p.parse("၂ ကော၊ 1:1").osis()).toEqual("2Cor.1.1")
		expect(p.parse("2 ကော 1:1").osis()).toEqual("2Cor.1.1")
		expect(p.parse("2ကော၊ 1:1").osis()).toEqual("2Cor.1.1")
		expect(p.parse("၂ ကော 1:1").osis()).toEqual("2Cor.1.1")
		expect(p.parse("၂ကော၊ 1:1").osis()).toEqual("2Cor.1.1")
		expect(p.parse("2COR 1:1").osis()).toEqual("2Cor.1.1")
		;
      return true;
    });
  });

  describe("Localized book 1Cor (my)", function() {
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
    it("should handle book: 1Cor (my)", function() {
      
		expect(p.parse("ကော ရိ န္သု ဩ ဝါ ဒ စာ ပ ထ မ စောင်။ 1:1").osis()).toEqual("1Cor.1.1")
		expect(p.parse("1. ကော၊ 1:1").osis()).toEqual("1Cor.1.1")
		expect(p.parse("1 ကော၊ 1:1").osis()).toEqual("1Cor.1.1")
		expect(p.parse("1.ကော၊ 1:1").osis()).toEqual("1Cor.1.1")
		expect(p.parse("1‌ကော၊ 1:1").osis()).toEqual("1Cor.1.1")
		expect(p.parse("၁ ကော၊ 1:1").osis()).toEqual("1Cor.1.1")
		expect(p.parse("၁‌ကော၊ 1:1").osis()).toEqual("1Cor.1.1")
		expect(p.parse("1 ကော 1:1").osis()).toEqual("1Cor.1.1")
		expect(p.parse("1ကော၊ 1:1").osis()).toEqual("1Cor.1.1")
		expect(p.parse("၁ ကော 1:1").osis()).toEqual("1Cor.1.1")
		expect(p.parse("၁ကော၊ 1:1").osis()).toEqual("1Cor.1.1")
		expect(p.parse("1Cor 1:1").osis()).toEqual("1Cor.1.1")
		;
      return true;
    });
    return it("should handle non-Latin digits in book: 1Cor (my)", function() {
      p.set_options({
        non_latin_digits_strategy: "replace"
      });
      
		expect(p.parse("ကော ရိ န္သု ဩ ဝါ ဒ စာ ပ ထ မ စောင်။ 1:1").osis()).toEqual("1Cor.1.1")
		expect(p.parse("1. ကော၊ 1:1").osis()).toEqual("1Cor.1.1")
		expect(p.parse("1 ကော၊ 1:1").osis()).toEqual("1Cor.1.1")
		expect(p.parse("1.ကော၊ 1:1").osis()).toEqual("1Cor.1.1")
		expect(p.parse("1‌ကော၊ 1:1").osis()).toEqual("1Cor.1.1")
		expect(p.parse("၁ ကော၊ 1:1").osis()).toEqual("1Cor.1.1")
		expect(p.parse("၁‌ကော၊ 1:1").osis()).toEqual("1Cor.1.1")
		expect(p.parse("1 ကော 1:1").osis()).toEqual("1Cor.1.1")
		expect(p.parse("1ကော၊ 1:1").osis()).toEqual("1Cor.1.1")
		expect(p.parse("၁ ကော 1:1").osis()).toEqual("1Cor.1.1")
		expect(p.parse("၁ကော၊ 1:1").osis()).toEqual("1Cor.1.1")
		expect(p.parse("1Cor 1:1").osis()).toEqual("1Cor.1.1")
		p.include_apocrypha(false)
		expect(p.parse("ကော ရိ န္သု ဩ ဝါ ဒ စာ ပ ထ မ စောင်။ 1:1").osis()).toEqual("1Cor.1.1")
		expect(p.parse("1. ကော၊ 1:1").osis()).toEqual("1Cor.1.1")
		expect(p.parse("1 ကော၊ 1:1").osis()).toEqual("1Cor.1.1")
		expect(p.parse("1.ကော၊ 1:1").osis()).toEqual("1Cor.1.1")
		expect(p.parse("1‌ကော၊ 1:1").osis()).toEqual("1Cor.1.1")
		expect(p.parse("၁ ကော၊ 1:1").osis()).toEqual("1Cor.1.1")
		expect(p.parse("၁‌ကော၊ 1:1").osis()).toEqual("1Cor.1.1")
		expect(p.parse("1 ကော 1:1").osis()).toEqual("1Cor.1.1")
		expect(p.parse("1ကော၊ 1:1").osis()).toEqual("1Cor.1.1")
		expect(p.parse("၁ ကော 1:1").osis()).toEqual("1Cor.1.1")
		expect(p.parse("၁ကော၊ 1:1").osis()).toEqual("1Cor.1.1")
		expect(p.parse("1COR 1:1").osis()).toEqual("1Cor.1.1")
		;
      return true;
    });
  });

  describe("Localized book Gal (my)", function() {
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
    return it("should handle book: Gal (my)", function() {
      
		expect(p.parse("ဂ လာ တိ ဩ ဝါ ဒ စာ။ 1:1").osis()).toEqual("Gal.1.1")
		expect(p.parse("ဂလာတိ၊ 1:1").osis()).toEqual("Gal.1.1")
		expect(p.parse("ဂလာတိ 1:1").osis()).toEqual("Gal.1.1")
		expect(p.parse("Gal 1:1").osis()).toEqual("Gal.1.1")
		expect(p.parse("ဂ လ 1:1").osis()).toEqual("Gal.1.1")
		p.include_apocrypha(false)
		expect(p.parse("ဂ လာ တိ ဩ ဝါ ဒ စာ။ 1:1").osis()).toEqual("Gal.1.1")
		expect(p.parse("ဂလာတိ၊ 1:1").osis()).toEqual("Gal.1.1")
		expect(p.parse("ဂလာတိ 1:1").osis()).toEqual("Gal.1.1")
		expect(p.parse("GAL 1:1").osis()).toEqual("Gal.1.1")
		expect(p.parse("ဂ လ 1:1").osis()).toEqual("Gal.1.1")
		;
      return true;
    });
  });

  describe("Localized book Eph (my)", function() {
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
    return it("should handle book: Eph (my)", function() {
      
		expect(p.parse("ဧ ဖက် ဩ ဝါ ဒ စာ။ 1:1").osis()).toEqual("Eph.1.1")
		expect(p.parse("ဧဖက်၊ 1:1").osis()).toEqual("Eph.1.1")
		expect(p.parse("ဧဖက် 1:1").osis()).toEqual("Eph.1.1")
		expect(p.parse("Eph 1:1").osis()).toEqual("Eph.1.1")
		expect(p.parse("ဧ 1:1").osis()).toEqual("Eph.1.1")
		p.include_apocrypha(false)
		expect(p.parse("ဧ ဖက် ဩ ဝါ ဒ စာ။ 1:1").osis()).toEqual("Eph.1.1")
		expect(p.parse("ဧဖက်၊ 1:1").osis()).toEqual("Eph.1.1")
		expect(p.parse("ဧဖက် 1:1").osis()).toEqual("Eph.1.1")
		expect(p.parse("EPH 1:1").osis()).toEqual("Eph.1.1")
		expect(p.parse("ဧ 1:1").osis()).toEqual("Eph.1.1")
		;
      return true;
    });
  });

  describe("Localized book Phil (my)", function() {
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
    return it("should handle book: Phil (my)", function() {
      
		expect(p.parse("ဖိ လိ ပ္ပိ ဩ ဝါ ဒ စာ။ 1:1").osis()).toEqual("Phil.1.1")
		expect(p.parse("ဖိလိပ္ပိ၊ 1:1").osis()).toEqual("Phil.1.1")
		expect(p.parse("Phil 1:1").osis()).toEqual("Phil.1.1")
		expect(p.parse("ဖိ 1:1").osis()).toEqual("Phil.1.1")
		p.include_apocrypha(false)
		expect(p.parse("ဖိ လိ ပ္ပိ ဩ ဝါ ဒ စာ။ 1:1").osis()).toEqual("Phil.1.1")
		expect(p.parse("ဖိလိပ္ပိ၊ 1:1").osis()).toEqual("Phil.1.1")
		expect(p.parse("PHIL 1:1").osis()).toEqual("Phil.1.1")
		expect(p.parse("ဖိ 1:1").osis()).toEqual("Phil.1.1")
		;
      return true;
    });
  });

  describe("Localized book Col (my)", function() {
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
    return it("should handle book: Col (my)", function() {
      
		expect(p.parse("ကော လော သဲ ဩ ဝါ ဒ စာ။ 1:1").osis()).toEqual("Col.1.1")
		expect(p.parse("ကောလောသဲ၊ 1:1").osis()).toEqual("Col.1.1")
		expect(p.parse("ကော‌လောသဲ 1:1").osis()).toEqual("Col.1.1")
		expect(p.parse("Col 1:1").osis()).toEqual("Col.1.1")
		expect(p.parse("ကော 1:1").osis()).toEqual("Col.1.1")
		p.include_apocrypha(false)
		expect(p.parse("ကော လော သဲ ဩ ဝါ ဒ စာ။ 1:1").osis()).toEqual("Col.1.1")
		expect(p.parse("ကောလောသဲ၊ 1:1").osis()).toEqual("Col.1.1")
		expect(p.parse("ကော‌လောသဲ 1:1").osis()).toEqual("Col.1.1")
		expect(p.parse("COL 1:1").osis()).toEqual("Col.1.1")
		expect(p.parse("ကော 1:1").osis()).toEqual("Col.1.1")
		;
      return true;
    });
  });

  describe("Localized book 2Thess (my)", function() {
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
    it("should handle book: 2Thess (my)", function() {
      
		expect(p.parse("သက် သာ လော နိတ် ဩ ဝါ ဒ စာ ဒု တိ ယ စောင်။ 1:1").osis()).toEqual("2Thess.1.1")
		expect(p.parse("2. သက်၊ 1:1").osis()).toEqual("2Thess.1.1")
		expect(p.parse("2 သက်၊ 1:1").osis()).toEqual("2Thess.1.1")
		expect(p.parse("2.သက်၊ 1:1").osis()).toEqual("2Thess.1.1")
		expect(p.parse("2Thess 1:1").osis()).toEqual("2Thess.1.1")
		expect(p.parse("၂ သက်၊ 1:1").osis()).toEqual("2Thess.1.1")
		expect(p.parse("2 သက် 1:1").osis()).toEqual("2Thess.1.1")
		expect(p.parse("2သက်၊ 1:1").osis()).toEqual("2Thess.1.1")
		expect(p.parse("၂ သက် 1:1").osis()).toEqual("2Thess.1.1")
		expect(p.parse("၂သက်၊ 1:1").osis()).toEqual("2Thess.1.1")
		;
      return true;
    });
    return it("should handle non-Latin digits in book: 2Thess (my)", function() {
      p.set_options({
        non_latin_digits_strategy: "replace"
      });
      
		expect(p.parse("သက် သာ လော နိတ် ဩ ဝါ ဒ စာ ဒု တိ ယ စောင်။ 1:1").osis()).toEqual("2Thess.1.1")
		expect(p.parse("2. သက်၊ 1:1").osis()).toEqual("2Thess.1.1")
		expect(p.parse("2 သက်၊ 1:1").osis()).toEqual("2Thess.1.1")
		expect(p.parse("2.သက်၊ 1:1").osis()).toEqual("2Thess.1.1")
		expect(p.parse("2Thess 1:1").osis()).toEqual("2Thess.1.1")
		expect(p.parse("၂ သက်၊ 1:1").osis()).toEqual("2Thess.1.1")
		expect(p.parse("2 သက် 1:1").osis()).toEqual("2Thess.1.1")
		expect(p.parse("2သက်၊ 1:1").osis()).toEqual("2Thess.1.1")
		expect(p.parse("၂ သက် 1:1").osis()).toEqual("2Thess.1.1")
		expect(p.parse("၂သက်၊ 1:1").osis()).toEqual("2Thess.1.1")
		p.include_apocrypha(false)
		expect(p.parse("သက် သာ လော နိတ် ဩ ဝါ ဒ စာ ဒု တိ ယ စောင်။ 1:1").osis()).toEqual("2Thess.1.1")
		expect(p.parse("2. သက်၊ 1:1").osis()).toEqual("2Thess.1.1")
		expect(p.parse("2 သက်၊ 1:1").osis()).toEqual("2Thess.1.1")
		expect(p.parse("2.သက်၊ 1:1").osis()).toEqual("2Thess.1.1")
		expect(p.parse("2THESS 1:1").osis()).toEqual("2Thess.1.1")
		expect(p.parse("၂ သက်၊ 1:1").osis()).toEqual("2Thess.1.1")
		expect(p.parse("2 သက် 1:1").osis()).toEqual("2Thess.1.1")
		expect(p.parse("2သက်၊ 1:1").osis()).toEqual("2Thess.1.1")
		expect(p.parse("၂ သက် 1:1").osis()).toEqual("2Thess.1.1")
		expect(p.parse("၂သက်၊ 1:1").osis()).toEqual("2Thess.1.1")
		;
      return true;
    });
  });

  describe("Localized book 1Thess (my)", function() {
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
    it("should handle book: 1Thess (my)", function() {
      
		expect(p.parse("သက် သာ လော နိတ် ဩ ဝါ ဒ စာ ပ ထ မ စောင်။ 1:1").osis()).toEqual("1Thess.1.1")
		expect(p.parse("1. သက်၊ 1:1").osis()).toEqual("1Thess.1.1")
		expect(p.parse("1 သက်၊ 1:1").osis()).toEqual("1Thess.1.1")
		expect(p.parse("1.သက်၊ 1:1").osis()).toEqual("1Thess.1.1")
		expect(p.parse("1Thess 1:1").osis()).toEqual("1Thess.1.1")
		expect(p.parse("၁ သက်၊ 1:1").osis()).toEqual("1Thess.1.1")
		expect(p.parse("1 သက် 1:1").osis()).toEqual("1Thess.1.1")
		expect(p.parse("1သက်၊ 1:1").osis()).toEqual("1Thess.1.1")
		expect(p.parse("၁ သက် 1:1").osis()).toEqual("1Thess.1.1")
		expect(p.parse("၁သက်၊ 1:1").osis()).toEqual("1Thess.1.1")
		;
      return true;
    });
    return it("should handle non-Latin digits in book: 1Thess (my)", function() {
      p.set_options({
        non_latin_digits_strategy: "replace"
      });
      
		expect(p.parse("သက် သာ လော နိတ် ဩ ဝါ ဒ စာ ပ ထ မ စောင်။ 1:1").osis()).toEqual("1Thess.1.1")
		expect(p.parse("1. သက်၊ 1:1").osis()).toEqual("1Thess.1.1")
		expect(p.parse("1 သက်၊ 1:1").osis()).toEqual("1Thess.1.1")
		expect(p.parse("1.သက်၊ 1:1").osis()).toEqual("1Thess.1.1")
		expect(p.parse("1Thess 1:1").osis()).toEqual("1Thess.1.1")
		expect(p.parse("၁ သက်၊ 1:1").osis()).toEqual("1Thess.1.1")
		expect(p.parse("1 သက် 1:1").osis()).toEqual("1Thess.1.1")
		expect(p.parse("1သက်၊ 1:1").osis()).toEqual("1Thess.1.1")
		expect(p.parse("၁ သက် 1:1").osis()).toEqual("1Thess.1.1")
		expect(p.parse("၁သက်၊ 1:1").osis()).toEqual("1Thess.1.1")
		p.include_apocrypha(false)
		expect(p.parse("သက် သာ လော နိတ် ဩ ဝါ ဒ စာ ပ ထ မ စောင်။ 1:1").osis()).toEqual("1Thess.1.1")
		expect(p.parse("1. သက်၊ 1:1").osis()).toEqual("1Thess.1.1")
		expect(p.parse("1 သက်၊ 1:1").osis()).toEqual("1Thess.1.1")
		expect(p.parse("1.သက်၊ 1:1").osis()).toEqual("1Thess.1.1")
		expect(p.parse("1THESS 1:1").osis()).toEqual("1Thess.1.1")
		expect(p.parse("၁ သက်၊ 1:1").osis()).toEqual("1Thess.1.1")
		expect(p.parse("1 သက် 1:1").osis()).toEqual("1Thess.1.1")
		expect(p.parse("1သက်၊ 1:1").osis()).toEqual("1Thess.1.1")
		expect(p.parse("၁ သက် 1:1").osis()).toEqual("1Thess.1.1")
		expect(p.parse("၁သက်၊ 1:1").osis()).toEqual("1Thess.1.1")
		;
      return true;
    });
  });

  describe("Localized book 2Tim (my)", function() {
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
    it("should handle book: 2Tim (my)", function() {
      
		expect(p.parse("တိ မော သေ ဩ ဝါ ဒ စာ ဒု တိ ယ စောင်။ 1:1").osis()).toEqual("2Tim.1.1")
		expect(p.parse("2. တိ၊ 1:1").osis()).toEqual("2Tim.1.1")
		expect(p.parse("2 တိ၊ 1:1").osis()).toEqual("2Tim.1.1")
		expect(p.parse("2.တိ၊ 1:1").osis()).toEqual("2Tim.1.1")
		expect(p.parse("၂ တိ၊ 1:1").osis()).toEqual("2Tim.1.1")
		expect(p.parse("2 တိ 1:1").osis()).toEqual("2Tim.1.1")
		expect(p.parse("2Tim 1:1").osis()).toEqual("2Tim.1.1")
		expect(p.parse("2တိ၊ 1:1").osis()).toEqual("2Tim.1.1")
		expect(p.parse("၂ တိ 1:1").osis()).toEqual("2Tim.1.1")
		expect(p.parse("၂တိ၊ 1:1").osis()).toEqual("2Tim.1.1")
		;
      return true;
    });
    return it("should handle non-Latin digits in book: 2Tim (my)", function() {
      p.set_options({
        non_latin_digits_strategy: "replace"
      });
      
		expect(p.parse("တိ မော သေ ဩ ဝါ ဒ စာ ဒု တိ ယ စောင်။ 1:1").osis()).toEqual("2Tim.1.1")
		expect(p.parse("2. တိ၊ 1:1").osis()).toEqual("2Tim.1.1")
		expect(p.parse("2 တိ၊ 1:1").osis()).toEqual("2Tim.1.1")
		expect(p.parse("2.တိ၊ 1:1").osis()).toEqual("2Tim.1.1")
		expect(p.parse("၂ တိ၊ 1:1").osis()).toEqual("2Tim.1.1")
		expect(p.parse("2 တိ 1:1").osis()).toEqual("2Tim.1.1")
		expect(p.parse("2Tim 1:1").osis()).toEqual("2Tim.1.1")
		expect(p.parse("2တိ၊ 1:1").osis()).toEqual("2Tim.1.1")
		expect(p.parse("၂ တိ 1:1").osis()).toEqual("2Tim.1.1")
		expect(p.parse("၂တိ၊ 1:1").osis()).toEqual("2Tim.1.1")
		p.include_apocrypha(false)
		expect(p.parse("တိ မော သေ ဩ ဝါ ဒ စာ ဒု တိ ယ စောင်။ 1:1").osis()).toEqual("2Tim.1.1")
		expect(p.parse("2. တိ၊ 1:1").osis()).toEqual("2Tim.1.1")
		expect(p.parse("2 တိ၊ 1:1").osis()).toEqual("2Tim.1.1")
		expect(p.parse("2.တိ၊ 1:1").osis()).toEqual("2Tim.1.1")
		expect(p.parse("၂ တိ၊ 1:1").osis()).toEqual("2Tim.1.1")
		expect(p.parse("2 တိ 1:1").osis()).toEqual("2Tim.1.1")
		expect(p.parse("2TIM 1:1").osis()).toEqual("2Tim.1.1")
		expect(p.parse("2တိ၊ 1:1").osis()).toEqual("2Tim.1.1")
		expect(p.parse("၂ တိ 1:1").osis()).toEqual("2Tim.1.1")
		expect(p.parse("၂တိ၊ 1:1").osis()).toEqual("2Tim.1.1")
		;
      return true;
    });
  });

  describe("Localized book 1Tim (my)", function() {
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
    it("should handle book: 1Tim (my)", function() {
      
		expect(p.parse("တိ မော သေ ဩ ဝါ ဒ စာ ပ ထ မ စောင်။ 1:1").osis()).toEqual("1Tim.1.1")
		expect(p.parse("1. တိ၊ 1:1").osis()).toEqual("1Tim.1.1")
		expect(p.parse("1 တိ၊ 1:1").osis()).toEqual("1Tim.1.1")
		expect(p.parse("1.တိ၊ 1:1").osis()).toEqual("1Tim.1.1")
		expect(p.parse("၁ တိ၊ 1:1").osis()).toEqual("1Tim.1.1")
		expect(p.parse("1 တိ 1:1").osis()).toEqual("1Tim.1.1")
		expect(p.parse("1Tim 1:1").osis()).toEqual("1Tim.1.1")
		expect(p.parse("1တိ၊ 1:1").osis()).toEqual("1Tim.1.1")
		expect(p.parse("၁ တိ 1:1").osis()).toEqual("1Tim.1.1")
		expect(p.parse("၁တိ၊ 1:1").osis()).toEqual("1Tim.1.1")
		;
      return true;
    });
    return it("should handle non-Latin digits in book: 1Tim (my)", function() {
      p.set_options({
        non_latin_digits_strategy: "replace"
      });
      
		expect(p.parse("တိ မော သေ ဩ ဝါ ဒ စာ ပ ထ မ စောင်။ 1:1").osis()).toEqual("1Tim.1.1")
		expect(p.parse("1. တိ၊ 1:1").osis()).toEqual("1Tim.1.1")
		expect(p.parse("1 တိ၊ 1:1").osis()).toEqual("1Tim.1.1")
		expect(p.parse("1.တိ၊ 1:1").osis()).toEqual("1Tim.1.1")
		expect(p.parse("၁ တိ၊ 1:1").osis()).toEqual("1Tim.1.1")
		expect(p.parse("1 တိ 1:1").osis()).toEqual("1Tim.1.1")
		expect(p.parse("1Tim 1:1").osis()).toEqual("1Tim.1.1")
		expect(p.parse("1တိ၊ 1:1").osis()).toEqual("1Tim.1.1")
		expect(p.parse("၁ တိ 1:1").osis()).toEqual("1Tim.1.1")
		expect(p.parse("၁တိ၊ 1:1").osis()).toEqual("1Tim.1.1")
		p.include_apocrypha(false)
		expect(p.parse("တိ မော သေ ဩ ဝါ ဒ စာ ပ ထ မ စောင်။ 1:1").osis()).toEqual("1Tim.1.1")
		expect(p.parse("1. တိ၊ 1:1").osis()).toEqual("1Tim.1.1")
		expect(p.parse("1 တိ၊ 1:1").osis()).toEqual("1Tim.1.1")
		expect(p.parse("1.တိ၊ 1:1").osis()).toEqual("1Tim.1.1")
		expect(p.parse("၁ တိ၊ 1:1").osis()).toEqual("1Tim.1.1")
		expect(p.parse("1 တိ 1:1").osis()).toEqual("1Tim.1.1")
		expect(p.parse("1TIM 1:1").osis()).toEqual("1Tim.1.1")
		expect(p.parse("1တိ၊ 1:1").osis()).toEqual("1Tim.1.1")
		expect(p.parse("၁ တိ 1:1").osis()).toEqual("1Tim.1.1")
		expect(p.parse("၁တိ၊ 1:1").osis()).toEqual("1Tim.1.1")
		;
      return true;
    });
  });

  describe("Localized book Titus (my)", function() {
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
    return it("should handle book: Titus (my)", function() {
      
		expect(p.parse("တိ တု ဩ ဝါ ဒ စာ။ 1:1").osis()).toEqual("Titus.1.1")
		expect(p.parse("Titus 1:1").osis()).toEqual("Titus.1.1")
		expect(p.parse("တိတု၊ 1:1").osis()).toEqual("Titus.1.1")
		expect(p.parse("တိ 1:1").osis()).toEqual("Titus.1.1")
		p.include_apocrypha(false)
		expect(p.parse("တိ တု ဩ ဝါ ဒ စာ။ 1:1").osis()).toEqual("Titus.1.1")
		expect(p.parse("TITUS 1:1").osis()).toEqual("Titus.1.1")
		expect(p.parse("တိတု၊ 1:1").osis()).toEqual("Titus.1.1")
		expect(p.parse("တိ 1:1").osis()).toEqual("Titus.1.1")
		;
      return true;
    });
  });

  describe("Localized book Phlm (my)", function() {
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
    return it("should handle book: Phlm (my)", function() {
      
		expect(p.parse("ဖိ လေ မုန် ဩ ဝါ ဒ စာ။ 1:1").osis()).toEqual("Phlm.1.1")
		expect(p.parse("Phlm 1:1").osis()).toEqual("Phlm.1.1")
		expect(p.parse("ဖိလေ 1:1").osis()).toEqual("Phlm.1.1")
		p.include_apocrypha(false)
		expect(p.parse("ဖိ လေ မုန် ဩ ဝါ ဒ စာ။ 1:1").osis()).toEqual("Phlm.1.1")
		expect(p.parse("PHLM 1:1").osis()).toEqual("Phlm.1.1")
		expect(p.parse("ဖိလေ 1:1").osis()).toEqual("Phlm.1.1")
		;
      return true;
    });
  });

  describe("Localized book Heb (my)", function() {
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
    return it("should handle book: Heb (my)", function() {
      
		expect(p.parse("ဟေ ဗြဲ ဩ ဝါ ဒ စာ။ 1:1").osis()).toEqual("Heb.1.1")
		expect(p.parse("ဟေ ဗြဲ 1:1").osis()).toEqual("Heb.1.1")
		expect(p.parse("ဟေဗြဲ၊ 1:1").osis()).toEqual("Heb.1.1")
		expect(p.parse("ဟေဗြဲ 1:1").osis()).toEqual("Heb.1.1")
		expect(p.parse("Heb 1:1").osis()).toEqual("Heb.1.1")
		p.include_apocrypha(false)
		expect(p.parse("ဟေ ဗြဲ ဩ ဝါ ဒ စာ။ 1:1").osis()).toEqual("Heb.1.1")
		expect(p.parse("ဟေ ဗြဲ 1:1").osis()).toEqual("Heb.1.1")
		expect(p.parse("ဟေဗြဲ၊ 1:1").osis()).toEqual("Heb.1.1")
		expect(p.parse("ဟေဗြဲ 1:1").osis()).toEqual("Heb.1.1")
		expect(p.parse("HEB 1:1").osis()).toEqual("Heb.1.1")
		;
      return true;
    });
  });

  describe("Localized book Jas (my)", function() {
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
    return it("should handle book: Jas (my)", function() {
      
		expect(p.parse("ရှင် ယာ ကုပ် ဩ ဝါ ဒ စာ။ 1:1").osis()).toEqual("Jas.1.1")
		expect(p.parse("ယာကုပ်၊ 1:1").osis()).toEqual("Jas.1.1")
		expect(p.parse("Jas 1:1").osis()).toEqual("Jas.1.1")
		expect(p.parse("ယာ 1:1").osis()).toEqual("Jas.1.1")
		p.include_apocrypha(false)
		expect(p.parse("ရှင် ယာ ကုပ် ဩ ဝါ ဒ စာ။ 1:1").osis()).toEqual("Jas.1.1")
		expect(p.parse("ယာကုပ်၊ 1:1").osis()).toEqual("Jas.1.1")
		expect(p.parse("JAS 1:1").osis()).toEqual("Jas.1.1")
		expect(p.parse("ယာ 1:1").osis()).toEqual("Jas.1.1")
		;
      return true;
    });
  });

  describe("Localized book 2Pet (my)", function() {
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
    it("should handle book: 2Pet (my)", function() {
      
		expect(p.parse("ရှင် ပေ တ ရု ဩ ဝါ ဒ စာ ဒု တိ ယ စောင်။ 1:1").osis()).toEqual("2Pet.1.1")
		expect(p.parse("2. ပေ၊ 1:1").osis()).toEqual("2Pet.1.1")
		expect(p.parse("2 ပေ၊ 1:1").osis()).toEqual("2Pet.1.1")
		expect(p.parse("2.ပေ၊ 1:1").osis()).toEqual("2Pet.1.1")
		expect(p.parse("၂ ပေ၊ 1:1").osis()).toEqual("2Pet.1.1")
		expect(p.parse("2 ပေ 1:1").osis()).toEqual("2Pet.1.1")
		expect(p.parse("2Pet 1:1").osis()).toEqual("2Pet.1.1")
		expect(p.parse("2ပေ၊ 1:1").osis()).toEqual("2Pet.1.1")
		expect(p.parse("၂ ပေ 1:1").osis()).toEqual("2Pet.1.1")
		expect(p.parse("၂ပေ၊ 1:1").osis()).toEqual("2Pet.1.1")
		;
      return true;
    });
    return it("should handle non-Latin digits in book: 2Pet (my)", function() {
      p.set_options({
        non_latin_digits_strategy: "replace"
      });
      
		expect(p.parse("ရှင် ပေ တ ရု ဩ ဝါ ဒ စာ ဒု တိ ယ စောင်။ 1:1").osis()).toEqual("2Pet.1.1")
		expect(p.parse("2. ပေ၊ 1:1").osis()).toEqual("2Pet.1.1")
		expect(p.parse("2 ပေ၊ 1:1").osis()).toEqual("2Pet.1.1")
		expect(p.parse("2.ပေ၊ 1:1").osis()).toEqual("2Pet.1.1")
		expect(p.parse("၂ ပေ၊ 1:1").osis()).toEqual("2Pet.1.1")
		expect(p.parse("2 ပေ 1:1").osis()).toEqual("2Pet.1.1")
		expect(p.parse("2Pet 1:1").osis()).toEqual("2Pet.1.1")
		expect(p.parse("2ပေ၊ 1:1").osis()).toEqual("2Pet.1.1")
		expect(p.parse("၂ ပေ 1:1").osis()).toEqual("2Pet.1.1")
		expect(p.parse("၂ပေ၊ 1:1").osis()).toEqual("2Pet.1.1")
		p.include_apocrypha(false)
		expect(p.parse("ရှင် ပေ တ ရု ဩ ဝါ ဒ စာ ဒု တိ ယ စောင်။ 1:1").osis()).toEqual("2Pet.1.1")
		expect(p.parse("2. ပေ၊ 1:1").osis()).toEqual("2Pet.1.1")
		expect(p.parse("2 ပေ၊ 1:1").osis()).toEqual("2Pet.1.1")
		expect(p.parse("2.ပေ၊ 1:1").osis()).toEqual("2Pet.1.1")
		expect(p.parse("၂ ပေ၊ 1:1").osis()).toEqual("2Pet.1.1")
		expect(p.parse("2 ပေ 1:1").osis()).toEqual("2Pet.1.1")
		expect(p.parse("2PET 1:1").osis()).toEqual("2Pet.1.1")
		expect(p.parse("2ပေ၊ 1:1").osis()).toEqual("2Pet.1.1")
		expect(p.parse("၂ ပေ 1:1").osis()).toEqual("2Pet.1.1")
		expect(p.parse("၂ပေ၊ 1:1").osis()).toEqual("2Pet.1.1")
		;
      return true;
    });
  });

  describe("Localized book 1Pet (my)", function() {
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
    it("should handle book: 1Pet (my)", function() {
      
		expect(p.parse("ရှင် ပေ တ ရု သြ ဝါ ဒ စာ ပ ထ မ စောင်။ 1:1").osis()).toEqual("1Pet.1.1")
		expect(p.parse("1. ပေ၊ 1:1").osis()).toEqual("1Pet.1.1")
		expect(p.parse("1 ပေ၊ 1:1").osis()).toEqual("1Pet.1.1")
		expect(p.parse("1.ပေ၊ 1:1").osis()).toEqual("1Pet.1.1")
		expect(p.parse("1‌ပေ၊ 1:1").osis()).toEqual("1Pet.1.1")
		expect(p.parse("၁ ပေ၊ 1:1").osis()).toEqual("1Pet.1.1")
		expect(p.parse("၁‌ပေ၊ 1:1").osis()).toEqual("1Pet.1.1")
		expect(p.parse("1 ပေ 1:1").osis()).toEqual("1Pet.1.1")
		expect(p.parse("1Pet 1:1").osis()).toEqual("1Pet.1.1")
		expect(p.parse("1ပေ၊ 1:1").osis()).toEqual("1Pet.1.1")
		expect(p.parse("1‌ပေ 1:1").osis()).toEqual("1Pet.1.1")
		expect(p.parse("၁ ပေ 1:1").osis()).toEqual("1Pet.1.1")
		expect(p.parse("၁ပေ၊ 1:1").osis()).toEqual("1Pet.1.1")
		expect(p.parse("၁‌ပေ 1:1").osis()).toEqual("1Pet.1.1")
		;
      return true;
    });
    return it("should handle non-Latin digits in book: 1Pet (my)", function() {
      p.set_options({
        non_latin_digits_strategy: "replace"
      });
      
		expect(p.parse("ရှင် ပေ တ ရု သြ ဝါ ဒ စာ ပ ထ မ စောင်။ 1:1").osis()).toEqual("1Pet.1.1")
		expect(p.parse("1. ပေ၊ 1:1").osis()).toEqual("1Pet.1.1")
		expect(p.parse("1 ပေ၊ 1:1").osis()).toEqual("1Pet.1.1")
		expect(p.parse("1.ပေ၊ 1:1").osis()).toEqual("1Pet.1.1")
		expect(p.parse("1‌ပေ၊ 1:1").osis()).toEqual("1Pet.1.1")
		expect(p.parse("၁ ပေ၊ 1:1").osis()).toEqual("1Pet.1.1")
		expect(p.parse("၁‌ပေ၊ 1:1").osis()).toEqual("1Pet.1.1")
		expect(p.parse("1 ပေ 1:1").osis()).toEqual("1Pet.1.1")
		expect(p.parse("1Pet 1:1").osis()).toEqual("1Pet.1.1")
		expect(p.parse("1ပေ၊ 1:1").osis()).toEqual("1Pet.1.1")
		expect(p.parse("1‌ပေ 1:1").osis()).toEqual("1Pet.1.1")
		expect(p.parse("၁ ပေ 1:1").osis()).toEqual("1Pet.1.1")
		expect(p.parse("၁ပေ၊ 1:1").osis()).toEqual("1Pet.1.1")
		expect(p.parse("၁‌ပေ 1:1").osis()).toEqual("1Pet.1.1")
		p.include_apocrypha(false)
		expect(p.parse("ရှင် ပေ တ ရု သြ ဝါ ဒ စာ ပ ထ မ စောင်။ 1:1").osis()).toEqual("1Pet.1.1")
		expect(p.parse("1. ပေ၊ 1:1").osis()).toEqual("1Pet.1.1")
		expect(p.parse("1 ပေ၊ 1:1").osis()).toEqual("1Pet.1.1")
		expect(p.parse("1.ပေ၊ 1:1").osis()).toEqual("1Pet.1.1")
		expect(p.parse("1‌ပေ၊ 1:1").osis()).toEqual("1Pet.1.1")
		expect(p.parse("၁ ပေ၊ 1:1").osis()).toEqual("1Pet.1.1")
		expect(p.parse("၁‌ပေ၊ 1:1").osis()).toEqual("1Pet.1.1")
		expect(p.parse("1 ပေ 1:1").osis()).toEqual("1Pet.1.1")
		expect(p.parse("1PET 1:1").osis()).toEqual("1Pet.1.1")
		expect(p.parse("1ပေ၊ 1:1").osis()).toEqual("1Pet.1.1")
		expect(p.parse("1‌ပေ 1:1").osis()).toEqual("1Pet.1.1")
		expect(p.parse("၁ ပေ 1:1").osis()).toEqual("1Pet.1.1")
		expect(p.parse("၁ပေ၊ 1:1").osis()).toEqual("1Pet.1.1")
		expect(p.parse("၁‌ပေ 1:1").osis()).toEqual("1Pet.1.1")
		;
      return true;
    });
  });

  describe("Localized book Jude (my)", function() {
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
    return it("should handle book: Jude (my)", function() {
      
		expect(p.parse("ရှင် ယု ဒ ဩ ဝါ ဒ စာ။ 1:1").osis()).toEqual("Jude.1.1")
		expect(p.parse("Jude 1:1").osis()).toEqual("Jude.1.1")
		expect(p.parse("ယု 1:1").osis()).toEqual("Jude.1.1")
		p.include_apocrypha(false)
		expect(p.parse("ရှင် ယု ဒ ဩ ဝါ ဒ စာ။ 1:1").osis()).toEqual("Jude.1.1")
		expect(p.parse("JUDE 1:1").osis()).toEqual("Jude.1.1")
		expect(p.parse("ယု 1:1").osis()).toEqual("Jude.1.1")
		;
      return true;
    });
  });

  describe("Localized book Tob (my)", function() {
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
    return it("should handle book: Tob (my)", function() {
      
		expect(p.parse("Tob 1:1").osis()).toEqual("Tob.1.1")
		;
      return true;
    });
  });

  describe("Localized book Jdt (my)", function() {
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
    return it("should handle book: Jdt (my)", function() {
      
		expect(p.parse("Jdt 1:1").osis()).toEqual("Jdt.1.1")
		;
      return true;
    });
  });

  describe("Localized book Bar (my)", function() {
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
    return it("should handle book: Bar (my)", function() {
      
		expect(p.parse("Bar 1:1").osis()).toEqual("Bar.1.1")
		;
      return true;
    });
  });

  describe("Localized book Sus (my)", function() {
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
    return it("should handle book: Sus (my)", function() {
      
		expect(p.parse("Sus 1:1").osis()).toEqual("Sus.1.1")
		;
      return true;
    });
  });

  describe("Localized book 2Macc (my)", function() {
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
    return it("should handle book: 2Macc (my)", function() {
      
		expect(p.parse("2Macc 1:1").osis()).toEqual("2Macc.1.1")
		;
      return true;
    });
  });

  describe("Localized book 3Macc (my)", function() {
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
    return it("should handle book: 3Macc (my)", function() {
      
		expect(p.parse("3Macc 1:1").osis()).toEqual("3Macc.1.1")
		;
      return true;
    });
  });

  describe("Localized book 4Macc (my)", function() {
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
    return it("should handle book: 4Macc (my)", function() {
      
		expect(p.parse("4Macc 1:1").osis()).toEqual("4Macc.1.1")
		;
      return true;
    });
  });

  describe("Localized book 1Macc (my)", function() {
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
    return it("should handle book: 1Macc (my)", function() {
      
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
      return expect(p.languages).toEqual(["my"]);
    });
    it("should handle ranges (my)", function() {
      expect(p.parse("Titus 1:1 မှ 2").osis()).toEqual("Titus.1.1-Titus.1.2");
      expect(p.parse("Matt 1မှ2").osis()).toEqual("Matt.1-Matt.2");
      return expect(p.parse("Phlm 2 မှ 3").osis()).toEqual("Phlm.1.2-Phlm.1.3");
    });
    it("should handle chapters (my)", function() {
      expect(p.parse("Titus 1:1, အခန်း 2").osis()).toEqual("Titus.1.1,Titus.2");
      expect(p.parse("Matt 3:4 အခန်း 6").osis()).toEqual("Matt.3.4,Matt.6");
      expect(p.parse("Titus 1:1, း 2").osis()).toEqual("Titus.1.1,Titus.2");
      return expect(p.parse("Matt 3:4 း 6").osis()).toEqual("Matt.3.4,Matt.6");
    });
    it("should handle verses (my)", function() {
      expect(p.parse("Exod 1:1 အခန်းငယ် 3").osis()).toEqual("Exod.1.1,Exod.1.3");
      expect(p.parse("Phlm အခန်းငယ် 6").osis()).toEqual("Phlm.1.6");
      expect(p.parse("Exod 1:1 း 3").osis()).toEqual("Exod.1.1,Exod.1.3");
      return expect(p.parse("Phlm း 6").osis()).toEqual("Phlm.1.6");
    });
    it("should handle 'and' (my)", function() {
      expect(p.parse("Exod 1:1 နှင့် 3").osis()).toEqual("Exod.1.1,Exod.1.3");
      expect(p.parse("Phlm 2 နှင့် 6").osis()).toEqual("Phlm.1.2,Phlm.1.6");
      expect(p.parse("Exod 1:1 ၊ 3").osis()).toEqual("Exod.1.1,Exod.1.3");
      return expect(p.parse("Phlm 2 ၊ 6").osis()).toEqual("Phlm.1.2,Phlm.1.6");
    });
    it("should handle titles (my)", function() {
      expect(p.parse("Ps 3 title, 4:2, 5:title").osis()).toEqual("Ps.3.1,Ps.4.2,Ps.5.1");
      return expect(p.parse("PS 3 TITLE, 4:2, 5:TITLE").osis()).toEqual("Ps.3.1,Ps.4.2,Ps.5.1");
    });
    it("should handle 'ff' (my)", function() {
      expect(p.parse("Rev 3ff, 4:2ff").osis()).toEqual("Rev.3-Rev.22,Rev.4.2-Rev.4.11");
      return expect(p.parse("REV 3 FF, 4:2 FF").osis()).toEqual("Rev.3-Rev.22,Rev.4.2-Rev.4.11");
    });
    it("should handle translations (my)", function() {
      expect(p.parse("Lev 1 (trans)").osis_and_translations()).toEqual([["Lev.1", "trans"]]);
      return expect(p.parse("lev 1 trans").osis_and_translations()).toEqual([["Lev.1", "trans"]]);
    });
    it("should handle book ranges (my)", function() {
      p.set_options({
        book_alone_strategy: "full",
        book_range_strategy: "include"
      });
      expect(p.parse("1 မှ 3  ယော၊").osis()).toEqual("1John.1-3John.1");
      return expect(p.parse("1 မှ 3 ယော၊").osis()).toEqual("1John.1-3John.1");
    });
    return it("should handle boundaries (my)", function() {
      p.set_options({
        book_alone_strategy: "full"
      });
      expect(p.parse("\u2014Matt\u2014").osis()).toEqual("Matt.1-Matt.28");
      return expect(p.parse("\u201cMatt 1:1\u201d").osis()).toEqual("Matt.1.1");
    });
  });

}).call(this);
