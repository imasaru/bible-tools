bcv_parser = require("../../js/st_bcv_parser.js").bcv_parser

describe "Parsing", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.options.osis_compaction_strategy = "b"
		p.options.sequence_combination_strategy = "combine"

	it "should round-trip OSIS references", ->
		p.set_options osis_compaction_strategy: "bc"
		books = ["Gen","Exod","Lev","Num","Deut","Josh","Judg","Ruth","1Sam","2Sam","1Kgs","2Kgs","1Chr","2Chr","Ezra","Neh","Esth","Job","Ps","Prov","Eccl","Song","Isa","Jer","Lam","Ezek","Dan","Hos","Joel","Amos","Obad","Jonah","Mic","Nah","Hab","Zeph","Hag","Zech","Mal","Matt","Mark","Luke","John","Acts","Rom","1Cor","2Cor","Gal","Eph","Phil","Col","1Thess","2Thess","1Tim","2Tim","Titus","Phlm","Heb","Jas","1Pet","2Pet","1John","2John","3John","Jude","Rev"]
		for book in books
			bc = book + ".1"
			bcv = bc + ".1"
			bcv_range = bcv + "-" + bc + ".2"
			expect(p.parse(bc).osis()).toEqual bc
			expect(p.parse(bcv).osis()).toEqual bcv
			expect(p.parse(bcv_range).osis()).toEqual bcv_range

	it "should round-trip OSIS Apocrypha references", ->
		p.set_options osis_compaction_strategy: "bc", ps151_strategy: "b"
		p.include_apocrypha true
		books = ["Tob","Jdt","GkEsth","Wis","Sir","Bar","PrAzar","Sus","Bel","SgThree","EpJer","1Macc","2Macc","3Macc","4Macc","1Esd","2Esd","PrMan","Ps151"]
		for book in books
			bc = book + ".1"
			bcv = bc + ".1"
			bcv_range = bcv + "-" + bc + ".2"
			expect(p.parse(bc).osis()).toEqual bc
			expect(p.parse(bcv).osis()).toEqual bcv
			expect(p.parse(bcv_range).osis()).toEqual bcv_range
		p.set_options ps151_strategy: "bc"
		expect(p.parse("Ps151.1").osis()).toEqual "Ps.151"
		expect(p.parse("Ps151.1.1").osis()).toEqual "Ps.151.1"
		expect(p.parse("Ps151.1-Ps151.2").osis()).toEqual "Ps.151.1-Ps.151.2"
		p.include_apocrypha false
		for book in books
			bc = book + ".1"
			expect(p.parse(bc).osis()).toEqual ""

	it "should handle a preceding character", ->
		expect(p.parse(" Gen 1").osis()).toEqual "Gen.1"
		expect(p.parse("Matt5John3").osis()).toEqual "Matt.5,John.3"
		expect(p.parse("1Ps 1").osis()).toEqual ""
		expect(p.parse("11Sam 1").osis()).toEqual ""

describe "Localized book Gen (st)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: Gen (st)", ->
		`
		expect(p.parse("Genese 1:1").osis()).toEqual("Gen.1.1")
		expect(p.parse("Gen 1:1").osis()).toEqual("Gen.1.1")
		p.include_apocrypha(false)
		expect(p.parse("GENESE 1:1").osis()).toEqual("Gen.1.1")
		expect(p.parse("GEN 1:1").osis()).toEqual("Gen.1.1")
		`
		true
describe "Localized book Exod (st)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: Exod (st)", ->
		`
		expect(p.parse("Eksoda 1:1").osis()).toEqual("Exod.1.1")
		expect(p.parse("Exoda 1:1").osis()).toEqual("Exod.1.1")
		expect(p.parse("Exod 1:1").osis()).toEqual("Exod.1.1")
		p.include_apocrypha(false)
		expect(p.parse("EKSODA 1:1").osis()).toEqual("Exod.1.1")
		expect(p.parse("EXODA 1:1").osis()).toEqual("Exod.1.1")
		expect(p.parse("EXOD 1:1").osis()).toEqual("Exod.1.1")
		`
		true
describe "Localized book Bel (st)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: Bel (st)", ->
		`
		expect(p.parse("Bel 1:1").osis()).toEqual("Bel.1.1")
		`
		true
describe "Localized book Lev (st)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: Lev (st)", ->
		`
		expect(p.parse("Levitike 1:1").osis()).toEqual("Lev.1.1")
		expect(p.parse("Lev 1:1").osis()).toEqual("Lev.1.1")
		p.include_apocrypha(false)
		expect(p.parse("LEVITIKE 1:1").osis()).toEqual("Lev.1.1")
		expect(p.parse("LEV 1:1").osis()).toEqual("Lev.1.1")
		`
		true
describe "Localized book Num (st)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: Num (st)", ->
		`
		expect(p.parse("Numere 1:1").osis()).toEqual("Num.1.1")
		expect(p.parse("Num 1:1").osis()).toEqual("Num.1.1")
		p.include_apocrypha(false)
		expect(p.parse("NUMERE 1:1").osis()).toEqual("Num.1.1")
		expect(p.parse("NUM 1:1").osis()).toEqual("Num.1.1")
		`
		true
describe "Localized book Sir (st)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: Sir (st)", ->
		`
		expect(p.parse("Sir 1:1").osis()).toEqual("Sir.1.1")
		`
		true
describe "Localized book Wis (st)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: Wis (st)", ->
		`
		expect(p.parse("Wis 1:1").osis()).toEqual("Wis.1.1")
		`
		true
describe "Localized book Lam (st)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: Lam (st)", ->
		`
		expect(p.parse("Dillo Tsa Jeremia 1:1").osis()).toEqual("Lam.1.1")
		expect(p.parse("Lam 1:1").osis()).toEqual("Lam.1.1")
		p.include_apocrypha(false)
		expect(p.parse("DILLO TSA JEREMIA 1:1").osis()).toEqual("Lam.1.1")
		expect(p.parse("LAM 1:1").osis()).toEqual("Lam.1.1")
		`
		true
describe "Localized book EpJer (st)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: EpJer (st)", ->
		`
		expect(p.parse("EpJer 1:1").osis()).toEqual("EpJer.1.1")
		`
		true
describe "Localized book Rev (st)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: Rev (st)", ->
		`
		expect(p.parse("Tshenolo 1:1").osis()).toEqual("Rev.1.1")
		expect(p.parse("Tsen 1:1").osis()).toEqual("Rev.1.1")
		expect(p.parse("Tšen 1:1").osis()).toEqual("Rev.1.1")
		expect(p.parse("Rev 1:1").osis()).toEqual("Rev.1.1")
		p.include_apocrypha(false)
		expect(p.parse("TSHENOLO 1:1").osis()).toEqual("Rev.1.1")
		expect(p.parse("TSEN 1:1").osis()).toEqual("Rev.1.1")
		expect(p.parse("TŠEN 1:1").osis()).toEqual("Rev.1.1")
		expect(p.parse("REV 1:1").osis()).toEqual("Rev.1.1")
		`
		true
describe "Localized book PrMan (st)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: PrMan (st)", ->
		`
		expect(p.parse("PrMan 1:1").osis()).toEqual("PrMan.1.1")
		`
		true
describe "Localized book Deut (st)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: Deut (st)", ->
		`
		expect(p.parse("Deuteronoma 1:1").osis()).toEqual("Deut.1.1")
		expect(p.parse("Deut 1:1").osis()).toEqual("Deut.1.1")
		p.include_apocrypha(false)
		expect(p.parse("DEUTERONOMA 1:1").osis()).toEqual("Deut.1.1")
		expect(p.parse("DEUT 1:1").osis()).toEqual("Deut.1.1")
		`
		true
describe "Localized book Josh (st)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: Josh (st)", ->
		`
		expect(p.parse("Joshua 1:1").osis()).toEqual("Josh.1.1")
		expect(p.parse("Josh 1:1").osis()).toEqual("Josh.1.1")
		p.include_apocrypha(false)
		expect(p.parse("JOSHUA 1:1").osis()).toEqual("Josh.1.1")
		expect(p.parse("JOSH 1:1").osis()).toEqual("Josh.1.1")
		`
		true
describe "Localized book Judg (st)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: Judg (st)", ->
		`
		expect(p.parse("Baahlodi 1:1").osis()).toEqual("Judg.1.1")
		expect(p.parse("Judg 1:1").osis()).toEqual("Judg.1.1")
		p.include_apocrypha(false)
		expect(p.parse("BAAHLODI 1:1").osis()).toEqual("Judg.1.1")
		expect(p.parse("JUDG 1:1").osis()).toEqual("Judg.1.1")
		`
		true
describe "Localized book Ruth (st)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: Ruth (st)", ->
		`
		expect(p.parse("Ruthe 1:1").osis()).toEqual("Ruth.1.1")
		expect(p.parse("Ruth 1:1").osis()).toEqual("Ruth.1.1")
		p.include_apocrypha(false)
		expect(p.parse("RUTHE 1:1").osis()).toEqual("Ruth.1.1")
		expect(p.parse("RUTH 1:1").osis()).toEqual("Ruth.1.1")
		`
		true
describe "Localized book 1Esd (st)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: 1Esd (st)", ->
		`
		expect(p.parse("1Esd 1:1").osis()).toEqual("1Esd.1.1")
		`
		true
describe "Localized book 2Esd (st)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: 2Esd (st)", ->
		`
		expect(p.parse("2Esd 1:1").osis()).toEqual("2Esd.1.1")
		`
		true
describe "Localized book Isa (st)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: Isa (st)", ->
		`
		expect(p.parse("Esaia 1:1").osis()).toEqual("Isa.1.1")
		expect(p.parse("Esa 1:1").osis()).toEqual("Isa.1.1")
		expect(p.parse("Isa 1:1").osis()).toEqual("Isa.1.1")
		p.include_apocrypha(false)
		expect(p.parse("ESAIA 1:1").osis()).toEqual("Isa.1.1")
		expect(p.parse("ESA 1:1").osis()).toEqual("Isa.1.1")
		expect(p.parse("ISA 1:1").osis()).toEqual("Isa.1.1")
		`
		true
describe "Localized book 2Sam (st)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: 2Sam (st)", ->
		`
		expect(p.parse("II. Samuele 1:1").osis()).toEqual("2Sam.1.1")
		expect(p.parse("2. Samuele 1:1").osis()).toEqual("2Sam.1.1")
		expect(p.parse("II Samuele 1:1").osis()).toEqual("2Sam.1.1")
		expect(p.parse("2 Samuele 1:1").osis()).toEqual("2Sam.1.1")
		expect(p.parse("II. Sam 1:1").osis()).toEqual("2Sam.1.1")
		expect(p.parse("2. Sam 1:1").osis()).toEqual("2Sam.1.1")
		expect(p.parse("II Sam 1:1").osis()).toEqual("2Sam.1.1")
		expect(p.parse("2 Sam 1:1").osis()).toEqual("2Sam.1.1")
		expect(p.parse("2Sam 1:1").osis()).toEqual("2Sam.1.1")
		p.include_apocrypha(false)
		expect(p.parse("II. SAMUELE 1:1").osis()).toEqual("2Sam.1.1")
		expect(p.parse("2. SAMUELE 1:1").osis()).toEqual("2Sam.1.1")
		expect(p.parse("II SAMUELE 1:1").osis()).toEqual("2Sam.1.1")
		expect(p.parse("2 SAMUELE 1:1").osis()).toEqual("2Sam.1.1")
		expect(p.parse("II. SAM 1:1").osis()).toEqual("2Sam.1.1")
		expect(p.parse("2. SAM 1:1").osis()).toEqual("2Sam.1.1")
		expect(p.parse("II SAM 1:1").osis()).toEqual("2Sam.1.1")
		expect(p.parse("2 SAM 1:1").osis()).toEqual("2Sam.1.1")
		expect(p.parse("2SAM 1:1").osis()).toEqual("2Sam.1.1")
		`
		true
describe "Localized book 1Sam (st)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: 1Sam (st)", ->
		`
		expect(p.parse("1. Samuele 1:1").osis()).toEqual("1Sam.1.1")
		expect(p.parse("I. Samuele 1:1").osis()).toEqual("1Sam.1.1")
		expect(p.parse("1 Samuele 1:1").osis()).toEqual("1Sam.1.1")
		expect(p.parse("I Samuele 1:1").osis()).toEqual("1Sam.1.1")
		expect(p.parse("1. Sam 1:1").osis()).toEqual("1Sam.1.1")
		expect(p.parse("I. Sam 1:1").osis()).toEqual("1Sam.1.1")
		expect(p.parse("1 Sam 1:1").osis()).toEqual("1Sam.1.1")
		expect(p.parse("I Sam 1:1").osis()).toEqual("1Sam.1.1")
		expect(p.parse("1Sam 1:1").osis()).toEqual("1Sam.1.1")
		p.include_apocrypha(false)
		expect(p.parse("1. SAMUELE 1:1").osis()).toEqual("1Sam.1.1")
		expect(p.parse("I. SAMUELE 1:1").osis()).toEqual("1Sam.1.1")
		expect(p.parse("1 SAMUELE 1:1").osis()).toEqual("1Sam.1.1")
		expect(p.parse("I SAMUELE 1:1").osis()).toEqual("1Sam.1.1")
		expect(p.parse("1. SAM 1:1").osis()).toEqual("1Sam.1.1")
		expect(p.parse("I. SAM 1:1").osis()).toEqual("1Sam.1.1")
		expect(p.parse("1 SAM 1:1").osis()).toEqual("1Sam.1.1")
		expect(p.parse("I SAM 1:1").osis()).toEqual("1Sam.1.1")
		expect(p.parse("1SAM 1:1").osis()).toEqual("1Sam.1.1")
		`
		true
describe "Localized book 2Kgs (st)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: 2Kgs (st)", ->
		`
		expect(p.parse("II. Marena 1:1").osis()).toEqual("2Kgs.1.1")
		expect(p.parse("2. Marena 1:1").osis()).toEqual("2Kgs.1.1")
		expect(p.parse("II Marena 1:1").osis()).toEqual("2Kgs.1.1")
		expect(p.parse("2 Marena 1:1").osis()).toEqual("2Kgs.1.1")
		expect(p.parse("2Kgs 1:1").osis()).toEqual("2Kgs.1.1")
		p.include_apocrypha(false)
		expect(p.parse("II. MARENA 1:1").osis()).toEqual("2Kgs.1.1")
		expect(p.parse("2. MARENA 1:1").osis()).toEqual("2Kgs.1.1")
		expect(p.parse("II MARENA 1:1").osis()).toEqual("2Kgs.1.1")
		expect(p.parse("2 MARENA 1:1").osis()).toEqual("2Kgs.1.1")
		expect(p.parse("2KGS 1:1").osis()).toEqual("2Kgs.1.1")
		`
		true
describe "Localized book 1Kgs (st)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: 1Kgs (st)", ->
		`
		expect(p.parse("1. Marena 1:1").osis()).toEqual("1Kgs.1.1")
		expect(p.parse("I. Marena 1:1").osis()).toEqual("1Kgs.1.1")
		expect(p.parse("1 Marena 1:1").osis()).toEqual("1Kgs.1.1")
		expect(p.parse("I Marena 1:1").osis()).toEqual("1Kgs.1.1")
		expect(p.parse("1Kgs 1:1").osis()).toEqual("1Kgs.1.1")
		p.include_apocrypha(false)
		expect(p.parse("1. MARENA 1:1").osis()).toEqual("1Kgs.1.1")
		expect(p.parse("I. MARENA 1:1").osis()).toEqual("1Kgs.1.1")
		expect(p.parse("1 MARENA 1:1").osis()).toEqual("1Kgs.1.1")
		expect(p.parse("I MARENA 1:1").osis()).toEqual("1Kgs.1.1")
		expect(p.parse("1KGS 1:1").osis()).toEqual("1Kgs.1.1")
		`
		true
describe "Localized book 2Chr (st)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: 2Chr (st)", ->
		`
		expect(p.parse("II. Dikronike 1:1").osis()).toEqual("2Chr.1.1")
		expect(p.parse("2. Dikronike 1:1").osis()).toEqual("2Chr.1.1")
		expect(p.parse("II Dikronike 1:1").osis()).toEqual("2Chr.1.1")
		expect(p.parse("2 Dikronike 1:1").osis()).toEqual("2Chr.1.1")
		expect(p.parse("2Chr 1:1").osis()).toEqual("2Chr.1.1")
		p.include_apocrypha(false)
		expect(p.parse("II. DIKRONIKE 1:1").osis()).toEqual("2Chr.1.1")
		expect(p.parse("2. DIKRONIKE 1:1").osis()).toEqual("2Chr.1.1")
		expect(p.parse("II DIKRONIKE 1:1").osis()).toEqual("2Chr.1.1")
		expect(p.parse("2 DIKRONIKE 1:1").osis()).toEqual("2Chr.1.1")
		expect(p.parse("2CHR 1:1").osis()).toEqual("2Chr.1.1")
		`
		true
describe "Localized book 1Chr (st)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: 1Chr (st)", ->
		`
		expect(p.parse("1. Dikronike 1:1").osis()).toEqual("1Chr.1.1")
		expect(p.parse("I. Dikronike 1:1").osis()).toEqual("1Chr.1.1")
		expect(p.parse("1 Dikronike 1:1").osis()).toEqual("1Chr.1.1")
		expect(p.parse("I Dikronike 1:1").osis()).toEqual("1Chr.1.1")
		expect(p.parse("1Chr 1:1").osis()).toEqual("1Chr.1.1")
		p.include_apocrypha(false)
		expect(p.parse("1. DIKRONIKE 1:1").osis()).toEqual("1Chr.1.1")
		expect(p.parse("I. DIKRONIKE 1:1").osis()).toEqual("1Chr.1.1")
		expect(p.parse("1 DIKRONIKE 1:1").osis()).toEqual("1Chr.1.1")
		expect(p.parse("I DIKRONIKE 1:1").osis()).toEqual("1Chr.1.1")
		expect(p.parse("1CHR 1:1").osis()).toEqual("1Chr.1.1")
		`
		true
describe "Localized book Ezra (st)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: Ezra (st)", ->
		`
		expect(p.parse("Esdrase 1:1").osis()).toEqual("Ezra.1.1")
		expect(p.parse("Ezra 1:1").osis()).toEqual("Ezra.1.1")
		p.include_apocrypha(false)
		expect(p.parse("ESDRASE 1:1").osis()).toEqual("Ezra.1.1")
		expect(p.parse("EZRA 1:1").osis()).toEqual("Ezra.1.1")
		`
		true
describe "Localized book Neh (st)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: Neh (st)", ->
		`
		expect(p.parse("Nehemia 1:1").osis()).toEqual("Neh.1.1")
		expect(p.parse("Neh 1:1").osis()).toEqual("Neh.1.1")
		p.include_apocrypha(false)
		expect(p.parse("NEHEMIA 1:1").osis()).toEqual("Neh.1.1")
		expect(p.parse("NEH 1:1").osis()).toEqual("Neh.1.1")
		`
		true
describe "Localized book GkEsth (st)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: GkEsth (st)", ->
		`
		expect(p.parse("GkEsth 1:1").osis()).toEqual("GkEsth.1.1")
		`
		true
describe "Localized book Esth (st)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: Esth (st)", ->
		`
		expect(p.parse("Esthere 1:1").osis()).toEqual("Esth.1.1")
		expect(p.parse("Esth 1:1").osis()).toEqual("Esth.1.1")
		p.include_apocrypha(false)
		expect(p.parse("ESTHERE 1:1").osis()).toEqual("Esth.1.1")
		expect(p.parse("ESTH 1:1").osis()).toEqual("Esth.1.1")
		`
		true
describe "Localized book Job (st)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: Job (st)", ->
		`
		expect(p.parse("Jobo 1:1").osis()).toEqual("Job.1.1")
		expect(p.parse("Job 1:1").osis()).toEqual("Job.1.1")
		p.include_apocrypha(false)
		expect(p.parse("JOBO 1:1").osis()).toEqual("Job.1.1")
		expect(p.parse("JOB 1:1").osis()).toEqual("Job.1.1")
		`
		true
describe "Localized book Ps (st)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: Ps (st)", ->
		`
		expect(p.parse("Dipesaleme 1:1").osis()).toEqual("Ps.1.1")
		expect(p.parse("Pes 1:1").osis()).toEqual("Ps.1.1")
		expect(p.parse("Ps 1:1").osis()).toEqual("Ps.1.1")
		p.include_apocrypha(false)
		expect(p.parse("DIPESALEME 1:1").osis()).toEqual("Ps.1.1")
		expect(p.parse("PES 1:1").osis()).toEqual("Ps.1.1")
		expect(p.parse("PS 1:1").osis()).toEqual("Ps.1.1")
		`
		true
describe "Localized book PrAzar (st)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: PrAzar (st)", ->
		`
		expect(p.parse("PrAzar 1:1").osis()).toEqual("PrAzar.1.1")
		`
		true
describe "Localized book Prov (st)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: Prov (st)", ->
		`
		expect(p.parse("Diproverbia 1:1").osis()).toEqual("Prov.1.1")
		expect(p.parse("Prov 1:1").osis()).toEqual("Prov.1.1")
		p.include_apocrypha(false)
		expect(p.parse("DIPROVERBIA 1:1").osis()).toEqual("Prov.1.1")
		expect(p.parse("PROV 1:1").osis()).toEqual("Prov.1.1")
		`
		true
describe "Localized book Eccl (st)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: Eccl (st)", ->
		`
		expect(p.parse("Moeklesia 1:1").osis()).toEqual("Eccl.1.1")
		expect(p.parse("Eccl 1:1").osis()).toEqual("Eccl.1.1")
		p.include_apocrypha(false)
		expect(p.parse("MOEKLESIA 1:1").osis()).toEqual("Eccl.1.1")
		expect(p.parse("ECCL 1:1").osis()).toEqual("Eccl.1.1")
		`
		true
describe "Localized book SgThree (st)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: SgThree (st)", ->
		`
		expect(p.parse("SgThree 1:1").osis()).toEqual("SgThree.1.1")
		`
		true
describe "Localized book Song (st)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: Song (st)", ->
		`
		expect(p.parse("Sefela Sa Salomone 1:1").osis()).toEqual("Song.1.1")
		expect(p.parse("Song 1:1").osis()).toEqual("Song.1.1")
		p.include_apocrypha(false)
		expect(p.parse("SEFELA SA SALOMONE 1:1").osis()).toEqual("Song.1.1")
		expect(p.parse("SONG 1:1").osis()).toEqual("Song.1.1")
		`
		true
describe "Localized book Jer (st)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: Jer (st)", ->
		`
		expect(p.parse("Jeremia 1:1").osis()).toEqual("Jer.1.1")
		expect(p.parse("Jer 1:1").osis()).toEqual("Jer.1.1")
		p.include_apocrypha(false)
		expect(p.parse("JEREMIA 1:1").osis()).toEqual("Jer.1.1")
		expect(p.parse("JER 1:1").osis()).toEqual("Jer.1.1")
		`
		true
describe "Localized book Ezek (st)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: Ezek (st)", ->
		`
		expect(p.parse("Esekiele 1:1").osis()).toEqual("Ezek.1.1")
		expect(p.parse("Ezek 1:1").osis()).toEqual("Ezek.1.1")
		p.include_apocrypha(false)
		expect(p.parse("ESEKIELE 1:1").osis()).toEqual("Ezek.1.1")
		expect(p.parse("EZEK 1:1").osis()).toEqual("Ezek.1.1")
		`
		true
describe "Localized book Dan (st)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: Dan (st)", ->
		`
		expect(p.parse("Daniele 1:1").osis()).toEqual("Dan.1.1")
		expect(p.parse("Dan 1:1").osis()).toEqual("Dan.1.1")
		p.include_apocrypha(false)
		expect(p.parse("DANIELE 1:1").osis()).toEqual("Dan.1.1")
		expect(p.parse("DAN 1:1").osis()).toEqual("Dan.1.1")
		`
		true
describe "Localized book Hos (st)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: Hos (st)", ->
		`
		expect(p.parse("Hosea 1:1").osis()).toEqual("Hos.1.1")
		expect(p.parse("Hos 1:1").osis()).toEqual("Hos.1.1")
		p.include_apocrypha(false)
		expect(p.parse("HOSEA 1:1").osis()).toEqual("Hos.1.1")
		expect(p.parse("HOS 1:1").osis()).toEqual("Hos.1.1")
		`
		true
describe "Localized book Joel (st)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: Joel (st)", ->
		`
		expect(p.parse("Joele 1:1").osis()).toEqual("Joel.1.1")
		expect(p.parse("Joel 1:1").osis()).toEqual("Joel.1.1")
		p.include_apocrypha(false)
		expect(p.parse("JOELE 1:1").osis()).toEqual("Joel.1.1")
		expect(p.parse("JOEL 1:1").osis()).toEqual("Joel.1.1")
		`
		true
describe "Localized book Amos (st)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: Amos (st)", ->
		`
		expect(p.parse("Amose 1:1").osis()).toEqual("Amos.1.1")
		expect(p.parse("Amos 1:1").osis()).toEqual("Amos.1.1")
		p.include_apocrypha(false)
		expect(p.parse("AMOSE 1:1").osis()).toEqual("Amos.1.1")
		expect(p.parse("AMOS 1:1").osis()).toEqual("Amos.1.1")
		`
		true
describe "Localized book Obad (st)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: Obad (st)", ->
		`
		expect(p.parse("Obadia 1:1").osis()).toEqual("Obad.1.1")
		expect(p.parse("Obad 1:1").osis()).toEqual("Obad.1.1")
		p.include_apocrypha(false)
		expect(p.parse("OBADIA 1:1").osis()).toEqual("Obad.1.1")
		expect(p.parse("OBAD 1:1").osis()).toEqual("Obad.1.1")
		`
		true
describe "Localized book Jonah (st)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: Jonah (st)", ->
		`
		expect(p.parse("Jonase 1:1").osis()).toEqual("Jonah.1.1")
		expect(p.parse("Jonah 1:1").osis()).toEqual("Jonah.1.1")
		p.include_apocrypha(false)
		expect(p.parse("JONASE 1:1").osis()).toEqual("Jonah.1.1")
		expect(p.parse("JONAH 1:1").osis()).toEqual("Jonah.1.1")
		`
		true
describe "Localized book Mic (st)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: Mic (st)", ->
		`
		expect(p.parse("Mikea 1:1").osis()).toEqual("Mic.1.1")
		expect(p.parse("Mic 1:1").osis()).toEqual("Mic.1.1")
		p.include_apocrypha(false)
		expect(p.parse("MIKEA 1:1").osis()).toEqual("Mic.1.1")
		expect(p.parse("MIC 1:1").osis()).toEqual("Mic.1.1")
		`
		true
describe "Localized book Nah (st)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: Nah (st)", ->
		`
		expect(p.parse("Nahume 1:1").osis()).toEqual("Nah.1.1")
		expect(p.parse("Nah 1:1").osis()).toEqual("Nah.1.1")
		p.include_apocrypha(false)
		expect(p.parse("NAHUME 1:1").osis()).toEqual("Nah.1.1")
		expect(p.parse("NAH 1:1").osis()).toEqual("Nah.1.1")
		`
		true
describe "Localized book Hab (st)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: Hab (st)", ->
		`
		expect(p.parse("Habakuke 1:1").osis()).toEqual("Hab.1.1")
		expect(p.parse("Hab 1:1").osis()).toEqual("Hab.1.1")
		p.include_apocrypha(false)
		expect(p.parse("HABAKUKE 1:1").osis()).toEqual("Hab.1.1")
		expect(p.parse("HAB 1:1").osis()).toEqual("Hab.1.1")
		`
		true
describe "Localized book Zeph (st)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: Zeph (st)", ->
		`
		expect(p.parse("Sofonia 1:1").osis()).toEqual("Zeph.1.1")
		expect(p.parse("Zeph 1:1").osis()).toEqual("Zeph.1.1")
		p.include_apocrypha(false)
		expect(p.parse("SOFONIA 1:1").osis()).toEqual("Zeph.1.1")
		expect(p.parse("ZEPH 1:1").osis()).toEqual("Zeph.1.1")
		`
		true
describe "Localized book Hag (st)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: Hag (st)", ->
		`
		expect(p.parse("Haggai 1:1").osis()).toEqual("Hag.1.1")
		expect(p.parse("Hag 1:1").osis()).toEqual("Hag.1.1")
		p.include_apocrypha(false)
		expect(p.parse("HAGGAI 1:1").osis()).toEqual("Hag.1.1")
		expect(p.parse("HAG 1:1").osis()).toEqual("Hag.1.1")
		`
		true
describe "Localized book Zech (st)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: Zech (st)", ->
		`
		expect(p.parse("Sakaria 1:1").osis()).toEqual("Zech.1.1")
		expect(p.parse("Zech 1:1").osis()).toEqual("Zech.1.1")
		p.include_apocrypha(false)
		expect(p.parse("SAKARIA 1:1").osis()).toEqual("Zech.1.1")
		expect(p.parse("ZECH 1:1").osis()).toEqual("Zech.1.1")
		`
		true
describe "Localized book Mal (st)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: Mal (st)", ->
		`
		expect(p.parse("Malakia 1:1").osis()).toEqual("Mal.1.1")
		expect(p.parse("Mal 1:1").osis()).toEqual("Mal.1.1")
		p.include_apocrypha(false)
		expect(p.parse("MALAKIA 1:1").osis()).toEqual("Mal.1.1")
		expect(p.parse("MAL 1:1").osis()).toEqual("Mal.1.1")
		`
		true
describe "Localized book Matt (st)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: Matt (st)", ->
		`
		expect(p.parse("Mattheu 1:1").osis()).toEqual("Matt.1.1")
		expect(p.parse("Matt 1:1").osis()).toEqual("Matt.1.1")
		p.include_apocrypha(false)
		expect(p.parse("MATTHEU 1:1").osis()).toEqual("Matt.1.1")
		expect(p.parse("MATT 1:1").osis()).toEqual("Matt.1.1")
		`
		true
describe "Localized book Mark (st)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: Mark (st)", ->
		`
		expect(p.parse("Mareka 1:1").osis()).toEqual("Mark.1.1")
		expect(p.parse("Mark 1:1").osis()).toEqual("Mark.1.1")
		p.include_apocrypha(false)
		expect(p.parse("MAREKA 1:1").osis()).toEqual("Mark.1.1")
		expect(p.parse("MARK 1:1").osis()).toEqual("Mark.1.1")
		`
		true
describe "Localized book Luke (st)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: Luke (st)", ->
		`
		expect(p.parse("Luka 1:1").osis()).toEqual("Luke.1.1")
		expect(p.parse("Luke 1:1").osis()).toEqual("Luke.1.1")
		p.include_apocrypha(false)
		expect(p.parse("LUKA 1:1").osis()).toEqual("Luke.1.1")
		expect(p.parse("LUKE 1:1").osis()).toEqual("Luke.1.1")
		`
		true
describe "Localized book 1John (st)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: 1John (st)", ->
		`
		expect(p.parse("1. Johanne 1:1").osis()).toEqual("1John.1.1")
		expect(p.parse("I. Johanne 1:1").osis()).toEqual("1John.1.1")
		expect(p.parse("1 Johanne 1:1").osis()).toEqual("1John.1.1")
		expect(p.parse("I Johanne 1:1").osis()).toEqual("1John.1.1")
		expect(p.parse("1John 1:1").osis()).toEqual("1John.1.1")
		p.include_apocrypha(false)
		expect(p.parse("1. JOHANNE 1:1").osis()).toEqual("1John.1.1")
		expect(p.parse("I. JOHANNE 1:1").osis()).toEqual("1John.1.1")
		expect(p.parse("1 JOHANNE 1:1").osis()).toEqual("1John.1.1")
		expect(p.parse("I JOHANNE 1:1").osis()).toEqual("1John.1.1")
		expect(p.parse("1JOHN 1:1").osis()).toEqual("1John.1.1")
		`
		true
describe "Localized book 2John (st)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: 2John (st)", ->
		`
		expect(p.parse("II. Johanne 1:1").osis()).toEqual("2John.1.1")
		expect(p.parse("2. Johanne 1:1").osis()).toEqual("2John.1.1")
		expect(p.parse("II Johanne 1:1").osis()).toEqual("2John.1.1")
		expect(p.parse("2 Johanne 1:1").osis()).toEqual("2John.1.1")
		expect(p.parse("2John 1:1").osis()).toEqual("2John.1.1")
		p.include_apocrypha(false)
		expect(p.parse("II. JOHANNE 1:1").osis()).toEqual("2John.1.1")
		expect(p.parse("2. JOHANNE 1:1").osis()).toEqual("2John.1.1")
		expect(p.parse("II JOHANNE 1:1").osis()).toEqual("2John.1.1")
		expect(p.parse("2 JOHANNE 1:1").osis()).toEqual("2John.1.1")
		expect(p.parse("2JOHN 1:1").osis()).toEqual("2John.1.1")
		`
		true
describe "Localized book 3John (st)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: 3John (st)", ->
		`
		expect(p.parse("III. Johanne 1:1").osis()).toEqual("3John.1.1")
		expect(p.parse("III Johanne 1:1").osis()).toEqual("3John.1.1")
		expect(p.parse("3. Johanne 1:1").osis()).toEqual("3John.1.1")
		expect(p.parse("3 Johanne 1:1").osis()).toEqual("3John.1.1")
		expect(p.parse("3John 1:1").osis()).toEqual("3John.1.1")
		p.include_apocrypha(false)
		expect(p.parse("III. JOHANNE 1:1").osis()).toEqual("3John.1.1")
		expect(p.parse("III JOHANNE 1:1").osis()).toEqual("3John.1.1")
		expect(p.parse("3. JOHANNE 1:1").osis()).toEqual("3John.1.1")
		expect(p.parse("3 JOHANNE 1:1").osis()).toEqual("3John.1.1")
		expect(p.parse("3JOHN 1:1").osis()).toEqual("3John.1.1")
		`
		true
describe "Localized book John (st)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: John (st)", ->
		`
		expect(p.parse("Johanne 1:1").osis()).toEqual("John.1.1")
		expect(p.parse("John 1:1").osis()).toEqual("John.1.1")
		p.include_apocrypha(false)
		expect(p.parse("JOHANNE 1:1").osis()).toEqual("John.1.1")
		expect(p.parse("JOHN 1:1").osis()).toEqual("John.1.1")
		`
		true
describe "Localized book Acts (st)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: Acts (st)", ->
		`
		expect(p.parse("Diketso 1:1").osis()).toEqual("Acts.1.1")
		expect(p.parse("Liketso 1:1").osis()).toEqual("Acts.1.1")
		expect(p.parse("Acts 1:1").osis()).toEqual("Acts.1.1")
		p.include_apocrypha(false)
		expect(p.parse("DIKETSO 1:1").osis()).toEqual("Acts.1.1")
		expect(p.parse("LIKETSO 1:1").osis()).toEqual("Acts.1.1")
		expect(p.parse("ACTS 1:1").osis()).toEqual("Acts.1.1")
		`
		true
describe "Localized book Rom (st)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: Rom (st)", ->
		`
		expect(p.parse("Ba-Roma 1:1").osis()).toEqual("Rom.1.1")
		expect(p.parse("Baroma 1:1").osis()).toEqual("Rom.1.1")
		expect(p.parse("Rom 1:1").osis()).toEqual("Rom.1.1")
		p.include_apocrypha(false)
		expect(p.parse("BA-ROMA 1:1").osis()).toEqual("Rom.1.1")
		expect(p.parse("BAROMA 1:1").osis()).toEqual("Rom.1.1")
		expect(p.parse("ROM 1:1").osis()).toEqual("Rom.1.1")
		`
		true
describe "Localized book 2Cor (st)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: 2Cor (st)", ->
		`
		expect(p.parse("II. Ba-Korinthe 1:1").osis()).toEqual("2Cor.1.1")
		expect(p.parse("2. Ba-Korinthe 1:1").osis()).toEqual("2Cor.1.1")
		expect(p.parse("II Ba-Korinthe 1:1").osis()).toEqual("2Cor.1.1")
		expect(p.parse("II. Bakorinthe 1:1").osis()).toEqual("2Cor.1.1")
		expect(p.parse("2 Ba-Korinthe 1:1").osis()).toEqual("2Cor.1.1")
		expect(p.parse("2. Bakorinthe 1:1").osis()).toEqual("2Cor.1.1")
		expect(p.parse("II Bakorinthe 1:1").osis()).toEqual("2Cor.1.1")
		expect(p.parse("2 Bakorinthe 1:1").osis()).toEqual("2Cor.1.1")
		expect(p.parse("II. Ba-Kor 1:1").osis()).toEqual("2Cor.1.1")
		expect(p.parse("2. Ba-Kor 1:1").osis()).toEqual("2Cor.1.1")
		expect(p.parse("II Ba-Kor 1:1").osis()).toEqual("2Cor.1.1")
		expect(p.parse("2 Ba-Kor 1:1").osis()).toEqual("2Cor.1.1")
		expect(p.parse("II. Bakr 1:1").osis()).toEqual("2Cor.1.1")
		expect(p.parse("2. Bakr 1:1").osis()).toEqual("2Cor.1.1")
		expect(p.parse("II Bakr 1:1").osis()).toEqual("2Cor.1.1")
		expect(p.parse("2 Bakr 1:1").osis()).toEqual("2Cor.1.1")
		expect(p.parse("2Cor 1:1").osis()).toEqual("2Cor.1.1")
		p.include_apocrypha(false)
		expect(p.parse("II. BA-KORINTHE 1:1").osis()).toEqual("2Cor.1.1")
		expect(p.parse("2. BA-KORINTHE 1:1").osis()).toEqual("2Cor.1.1")
		expect(p.parse("II BA-KORINTHE 1:1").osis()).toEqual("2Cor.1.1")
		expect(p.parse("II. BAKORINTHE 1:1").osis()).toEqual("2Cor.1.1")
		expect(p.parse("2 BA-KORINTHE 1:1").osis()).toEqual("2Cor.1.1")
		expect(p.parse("2. BAKORINTHE 1:1").osis()).toEqual("2Cor.1.1")
		expect(p.parse("II BAKORINTHE 1:1").osis()).toEqual("2Cor.1.1")
		expect(p.parse("2 BAKORINTHE 1:1").osis()).toEqual("2Cor.1.1")
		expect(p.parse("II. BA-KOR 1:1").osis()).toEqual("2Cor.1.1")
		expect(p.parse("2. BA-KOR 1:1").osis()).toEqual("2Cor.1.1")
		expect(p.parse("II BA-KOR 1:1").osis()).toEqual("2Cor.1.1")
		expect(p.parse("2 BA-KOR 1:1").osis()).toEqual("2Cor.1.1")
		expect(p.parse("II. BAKR 1:1").osis()).toEqual("2Cor.1.1")
		expect(p.parse("2. BAKR 1:1").osis()).toEqual("2Cor.1.1")
		expect(p.parse("II BAKR 1:1").osis()).toEqual("2Cor.1.1")
		expect(p.parse("2 BAKR 1:1").osis()).toEqual("2Cor.1.1")
		expect(p.parse("2COR 1:1").osis()).toEqual("2Cor.1.1")
		`
		true
describe "Localized book 1Cor (st)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: 1Cor (st)", ->
		`
		expect(p.parse("1. Ba-Korinthe 1:1").osis()).toEqual("1Cor.1.1")
		expect(p.parse("I. Ba-Korinthe 1:1").osis()).toEqual("1Cor.1.1")
		expect(p.parse("1 Ba-Korinthe 1:1").osis()).toEqual("1Cor.1.1")
		expect(p.parse("1. Bakorinthe 1:1").osis()).toEqual("1Cor.1.1")
		expect(p.parse("I Ba-Korinthe 1:1").osis()).toEqual("1Cor.1.1")
		expect(p.parse("I. Bakorinthe 1:1").osis()).toEqual("1Cor.1.1")
		expect(p.parse("1 Bakorinthe 1:1").osis()).toEqual("1Cor.1.1")
		expect(p.parse("I Bakorinthe 1:1").osis()).toEqual("1Cor.1.1")
		expect(p.parse("1. Ba-Kor 1:1").osis()).toEqual("1Cor.1.1")
		expect(p.parse("I. Ba-Kor 1:1").osis()).toEqual("1Cor.1.1")
		expect(p.parse("1 Ba-Kor 1:1").osis()).toEqual("1Cor.1.1")
		expect(p.parse("I Ba-Kor 1:1").osis()).toEqual("1Cor.1.1")
		expect(p.parse("1. Bakr 1:1").osis()).toEqual("1Cor.1.1")
		expect(p.parse("I. Bakr 1:1").osis()).toEqual("1Cor.1.1")
		expect(p.parse("1 Bakr 1:1").osis()).toEqual("1Cor.1.1")
		expect(p.parse("I Bakr 1:1").osis()).toEqual("1Cor.1.1")
		expect(p.parse("1Cor 1:1").osis()).toEqual("1Cor.1.1")
		p.include_apocrypha(false)
		expect(p.parse("1. BA-KORINTHE 1:1").osis()).toEqual("1Cor.1.1")
		expect(p.parse("I. BA-KORINTHE 1:1").osis()).toEqual("1Cor.1.1")
		expect(p.parse("1 BA-KORINTHE 1:1").osis()).toEqual("1Cor.1.1")
		expect(p.parse("1. BAKORINTHE 1:1").osis()).toEqual("1Cor.1.1")
		expect(p.parse("I BA-KORINTHE 1:1").osis()).toEqual("1Cor.1.1")
		expect(p.parse("I. BAKORINTHE 1:1").osis()).toEqual("1Cor.1.1")
		expect(p.parse("1 BAKORINTHE 1:1").osis()).toEqual("1Cor.1.1")
		expect(p.parse("I BAKORINTHE 1:1").osis()).toEqual("1Cor.1.1")
		expect(p.parse("1. BA-KOR 1:1").osis()).toEqual("1Cor.1.1")
		expect(p.parse("I. BA-KOR 1:1").osis()).toEqual("1Cor.1.1")
		expect(p.parse("1 BA-KOR 1:1").osis()).toEqual("1Cor.1.1")
		expect(p.parse("I BA-KOR 1:1").osis()).toEqual("1Cor.1.1")
		expect(p.parse("1. BAKR 1:1").osis()).toEqual("1Cor.1.1")
		expect(p.parse("I. BAKR 1:1").osis()).toEqual("1Cor.1.1")
		expect(p.parse("1 BAKR 1:1").osis()).toEqual("1Cor.1.1")
		expect(p.parse("I BAKR 1:1").osis()).toEqual("1Cor.1.1")
		expect(p.parse("1COR 1:1").osis()).toEqual("1Cor.1.1")
		`
		true
describe "Localized book Gal (st)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: Gal (st)", ->
		`
		expect(p.parse("Ba-Galata 1:1").osis()).toEqual("Gal.1.1")
		expect(p.parse("Bagalata 1:1").osis()).toEqual("Gal.1.1")
		expect(p.parse("Gal 1:1").osis()).toEqual("Gal.1.1")
		p.include_apocrypha(false)
		expect(p.parse("BA-GALATA 1:1").osis()).toEqual("Gal.1.1")
		expect(p.parse("BAGALATA 1:1").osis()).toEqual("Gal.1.1")
		expect(p.parse("GAL 1:1").osis()).toEqual("Gal.1.1")
		`
		true
describe "Localized book Eph (st)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: Eph (st)", ->
		`
		expect(p.parse("Ba-Efese 1:1").osis()).toEqual("Eph.1.1")
		expect(p.parse("Baefese 1:1").osis()).toEqual("Eph.1.1")
		expect(p.parse("Ba-Efe 1:1").osis()).toEqual("Eph.1.1")
		expect(p.parse("Eph 1:1").osis()).toEqual("Eph.1.1")
		p.include_apocrypha(false)
		expect(p.parse("BA-EFESE 1:1").osis()).toEqual("Eph.1.1")
		expect(p.parse("BAEFESE 1:1").osis()).toEqual("Eph.1.1")
		expect(p.parse("BA-EFE 1:1").osis()).toEqual("Eph.1.1")
		expect(p.parse("EPH 1:1").osis()).toEqual("Eph.1.1")
		`
		true
describe "Localized book Phil (st)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: Phil (st)", ->
		`
		expect(p.parse("Ba-Filipi 1:1").osis()).toEqual("Phil.1.1")
		expect(p.parse("Bafilipi 1:1").osis()).toEqual("Phil.1.1")
		expect(p.parse("Ba-Fil 1:1").osis()).toEqual("Phil.1.1")
		expect(p.parse("Phil 1:1").osis()).toEqual("Phil.1.1")
		p.include_apocrypha(false)
		expect(p.parse("BA-FILIPI 1:1").osis()).toEqual("Phil.1.1")
		expect(p.parse("BAFILIPI 1:1").osis()).toEqual("Phil.1.1")
		expect(p.parse("BA-FIL 1:1").osis()).toEqual("Phil.1.1")
		expect(p.parse("PHIL 1:1").osis()).toEqual("Phil.1.1")
		`
		true
describe "Localized book Col (st)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: Col (st)", ->
		`
		expect(p.parse("Bakolose 1:1").osis()).toEqual("Col.1.1")
		expect(p.parse("Col 1:1").osis()).toEqual("Col.1.1")
		p.include_apocrypha(false)
		expect(p.parse("BAKOLOSE 1:1").osis()).toEqual("Col.1.1")
		expect(p.parse("COL 1:1").osis()).toEqual("Col.1.1")
		`
		true
describe "Localized book 2Thess (st)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: 2Thess (st)", ->
		`
		expect(p.parse("II. Ba-Thesalonika 1:1").osis()).toEqual("2Thess.1.1")
		expect(p.parse("2. Ba-Thesalonika 1:1").osis()).toEqual("2Thess.1.1")
		expect(p.parse("II Ba-Thesalonika 1:1").osis()).toEqual("2Thess.1.1")
		expect(p.parse("II. Bathesalonika 1:1").osis()).toEqual("2Thess.1.1")
		expect(p.parse("2 Ba-Thesalonika 1:1").osis()).toEqual("2Thess.1.1")
		expect(p.parse("2. Bathesalonika 1:1").osis()).toEqual("2Thess.1.1")
		expect(p.parse("II Bathesalonika 1:1").osis()).toEqual("2Thess.1.1")
		expect(p.parse("2 Bathesalonika 1:1").osis()).toEqual("2Thess.1.1")
		expect(p.parse("2Thess 1:1").osis()).toEqual("2Thess.1.1")
		p.include_apocrypha(false)
		expect(p.parse("II. BA-THESALONIKA 1:1").osis()).toEqual("2Thess.1.1")
		expect(p.parse("2. BA-THESALONIKA 1:1").osis()).toEqual("2Thess.1.1")
		expect(p.parse("II BA-THESALONIKA 1:1").osis()).toEqual("2Thess.1.1")
		expect(p.parse("II. BATHESALONIKA 1:1").osis()).toEqual("2Thess.1.1")
		expect(p.parse("2 BA-THESALONIKA 1:1").osis()).toEqual("2Thess.1.1")
		expect(p.parse("2. BATHESALONIKA 1:1").osis()).toEqual("2Thess.1.1")
		expect(p.parse("II BATHESALONIKA 1:1").osis()).toEqual("2Thess.1.1")
		expect(p.parse("2 BATHESALONIKA 1:1").osis()).toEqual("2Thess.1.1")
		expect(p.parse("2THESS 1:1").osis()).toEqual("2Thess.1.1")
		`
		true
describe "Localized book 1Thess (st)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: 1Thess (st)", ->
		`
		expect(p.parse("1. Ba-Thesalonika 1:1").osis()).toEqual("1Thess.1.1")
		expect(p.parse("I. Ba-Thesalonika 1:1").osis()).toEqual("1Thess.1.1")
		expect(p.parse("1 Ba-Thesalonika 1:1").osis()).toEqual("1Thess.1.1")
		expect(p.parse("1. Bathesalonika 1:1").osis()).toEqual("1Thess.1.1")
		expect(p.parse("I Ba-Thesalonika 1:1").osis()).toEqual("1Thess.1.1")
		expect(p.parse("I. Bathesalonika 1:1").osis()).toEqual("1Thess.1.1")
		expect(p.parse("1 Bathesalonika 1:1").osis()).toEqual("1Thess.1.1")
		expect(p.parse("I Bathesalonika 1:1").osis()).toEqual("1Thess.1.1")
		expect(p.parse("1Thess 1:1").osis()).toEqual("1Thess.1.1")
		p.include_apocrypha(false)
		expect(p.parse("1. BA-THESALONIKA 1:1").osis()).toEqual("1Thess.1.1")
		expect(p.parse("I. BA-THESALONIKA 1:1").osis()).toEqual("1Thess.1.1")
		expect(p.parse("1 BA-THESALONIKA 1:1").osis()).toEqual("1Thess.1.1")
		expect(p.parse("1. BATHESALONIKA 1:1").osis()).toEqual("1Thess.1.1")
		expect(p.parse("I BA-THESALONIKA 1:1").osis()).toEqual("1Thess.1.1")
		expect(p.parse("I. BATHESALONIKA 1:1").osis()).toEqual("1Thess.1.1")
		expect(p.parse("1 BATHESALONIKA 1:1").osis()).toEqual("1Thess.1.1")
		expect(p.parse("I BATHESALONIKA 1:1").osis()).toEqual("1Thess.1.1")
		expect(p.parse("1THESS 1:1").osis()).toEqual("1Thess.1.1")
		`
		true
describe "Localized book 2Tim (st)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: 2Tim (st)", ->
		`
		expect(p.parse("II. Timothea 1:1").osis()).toEqual("2Tim.1.1")
		expect(p.parse("2. Timothea 1:1").osis()).toEqual("2Tim.1.1")
		expect(p.parse("II Timothea 1:1").osis()).toEqual("2Tim.1.1")
		expect(p.parse("2 Timothea 1:1").osis()).toEqual("2Tim.1.1")
		expect(p.parse("2Tim 1:1").osis()).toEqual("2Tim.1.1")
		p.include_apocrypha(false)
		expect(p.parse("II. TIMOTHEA 1:1").osis()).toEqual("2Tim.1.1")
		expect(p.parse("2. TIMOTHEA 1:1").osis()).toEqual("2Tim.1.1")
		expect(p.parse("II TIMOTHEA 1:1").osis()).toEqual("2Tim.1.1")
		expect(p.parse("2 TIMOTHEA 1:1").osis()).toEqual("2Tim.1.1")
		expect(p.parse("2TIM 1:1").osis()).toEqual("2Tim.1.1")
		`
		true
describe "Localized book 1Tim (st)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: 1Tim (st)", ->
		`
		expect(p.parse("1. Timothea 1:1").osis()).toEqual("1Tim.1.1")
		expect(p.parse("I. Timothea 1:1").osis()).toEqual("1Tim.1.1")
		expect(p.parse("1 Timothea 1:1").osis()).toEqual("1Tim.1.1")
		expect(p.parse("I Timothea 1:1").osis()).toEqual("1Tim.1.1")
		expect(p.parse("1Tim 1:1").osis()).toEqual("1Tim.1.1")
		p.include_apocrypha(false)
		expect(p.parse("1. TIMOTHEA 1:1").osis()).toEqual("1Tim.1.1")
		expect(p.parse("I. TIMOTHEA 1:1").osis()).toEqual("1Tim.1.1")
		expect(p.parse("1 TIMOTHEA 1:1").osis()).toEqual("1Tim.1.1")
		expect(p.parse("I TIMOTHEA 1:1").osis()).toEqual("1Tim.1.1")
		expect(p.parse("1TIM 1:1").osis()).toEqual("1Tim.1.1")
		`
		true
describe "Localized book Titus (st)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: Titus (st)", ->
		`
		expect(p.parse("Titus 1:1").osis()).toEqual("Titus.1.1")
		expect(p.parse("Tite 1:1").osis()).toEqual("Titus.1.1")
		p.include_apocrypha(false)
		expect(p.parse("TITUS 1:1").osis()).toEqual("Titus.1.1")
		expect(p.parse("TITE 1:1").osis()).toEqual("Titus.1.1")
		`
		true
describe "Localized book Phlm (st)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: Phlm (st)", ->
		`
		expect(p.parse("Filemone 1:1").osis()).toEqual("Phlm.1.1")
		expect(p.parse("Phlm 1:1").osis()).toEqual("Phlm.1.1")
		p.include_apocrypha(false)
		expect(p.parse("FILEMONE 1:1").osis()).toEqual("Phlm.1.1")
		expect(p.parse("PHLM 1:1").osis()).toEqual("Phlm.1.1")
		`
		true
describe "Localized book Heb (st)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: Heb (st)", ->
		`
		expect(p.parse("Baheberu 1:1").osis()).toEqual("Heb.1.1")
		expect(p.parse("Heb 1:1").osis()).toEqual("Heb.1.1")
		p.include_apocrypha(false)
		expect(p.parse("BAHEBERU 1:1").osis()).toEqual("Heb.1.1")
		expect(p.parse("HEB 1:1").osis()).toEqual("Heb.1.1")
		`
		true
describe "Localized book Jas (st)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: Jas (st)", ->
		`
		expect(p.parse("Jakobo 1:1").osis()).toEqual("Jas.1.1")
		expect(p.parse("Jas 1:1").osis()).toEqual("Jas.1.1")
		p.include_apocrypha(false)
		expect(p.parse("JAKOBO 1:1").osis()).toEqual("Jas.1.1")
		expect(p.parse("JAS 1:1").osis()).toEqual("Jas.1.1")
		`
		true
describe "Localized book 2Pet (st)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: 2Pet (st)", ->
		`
		expect(p.parse("II. Petrose 1:1").osis()).toEqual("2Pet.1.1")
		expect(p.parse("2. Petrose 1:1").osis()).toEqual("2Pet.1.1")
		expect(p.parse("II Petrose 1:1").osis()).toEqual("2Pet.1.1")
		expect(p.parse("2 Petrose 1:1").osis()).toEqual("2Pet.1.1")
		expect(p.parse("II. Pet 1:1").osis()).toEqual("2Pet.1.1")
		expect(p.parse("2. Pet 1:1").osis()).toEqual("2Pet.1.1")
		expect(p.parse("II Pet 1:1").osis()).toEqual("2Pet.1.1")
		expect(p.parse("2 Pet 1:1").osis()).toEqual("2Pet.1.1")
		expect(p.parse("2Pet 1:1").osis()).toEqual("2Pet.1.1")
		p.include_apocrypha(false)
		expect(p.parse("II. PETROSE 1:1").osis()).toEqual("2Pet.1.1")
		expect(p.parse("2. PETROSE 1:1").osis()).toEqual("2Pet.1.1")
		expect(p.parse("II PETROSE 1:1").osis()).toEqual("2Pet.1.1")
		expect(p.parse("2 PETROSE 1:1").osis()).toEqual("2Pet.1.1")
		expect(p.parse("II. PET 1:1").osis()).toEqual("2Pet.1.1")
		expect(p.parse("2. PET 1:1").osis()).toEqual("2Pet.1.1")
		expect(p.parse("II PET 1:1").osis()).toEqual("2Pet.1.1")
		expect(p.parse("2 PET 1:1").osis()).toEqual("2Pet.1.1")
		expect(p.parse("2PET 1:1").osis()).toEqual("2Pet.1.1")
		`
		true
describe "Localized book 1Pet (st)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: 1Pet (st)", ->
		`
		expect(p.parse("1. Petrose 1:1").osis()).toEqual("1Pet.1.1")
		expect(p.parse("I. Petrose 1:1").osis()).toEqual("1Pet.1.1")
		expect(p.parse("1 Petrose 1:1").osis()).toEqual("1Pet.1.1")
		expect(p.parse("I Petrose 1:1").osis()).toEqual("1Pet.1.1")
		expect(p.parse("1. Pet 1:1").osis()).toEqual("1Pet.1.1")
		expect(p.parse("I. Pet 1:1").osis()).toEqual("1Pet.1.1")
		expect(p.parse("1 Pet 1:1").osis()).toEqual("1Pet.1.1")
		expect(p.parse("I Pet 1:1").osis()).toEqual("1Pet.1.1")
		expect(p.parse("1Pet 1:1").osis()).toEqual("1Pet.1.1")
		p.include_apocrypha(false)
		expect(p.parse("1. PETROSE 1:1").osis()).toEqual("1Pet.1.1")
		expect(p.parse("I. PETROSE 1:1").osis()).toEqual("1Pet.1.1")
		expect(p.parse("1 PETROSE 1:1").osis()).toEqual("1Pet.1.1")
		expect(p.parse("I PETROSE 1:1").osis()).toEqual("1Pet.1.1")
		expect(p.parse("1. PET 1:1").osis()).toEqual("1Pet.1.1")
		expect(p.parse("I. PET 1:1").osis()).toEqual("1Pet.1.1")
		expect(p.parse("1 PET 1:1").osis()).toEqual("1Pet.1.1")
		expect(p.parse("I PET 1:1").osis()).toEqual("1Pet.1.1")
		expect(p.parse("1PET 1:1").osis()).toEqual("1Pet.1.1")
		`
		true
describe "Localized book Jude (st)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: Jude (st)", ->
		`
		expect(p.parse("Juda 1:1").osis()).toEqual("Jude.1.1")
		expect(p.parse("Jude 1:1").osis()).toEqual("Jude.1.1")
		p.include_apocrypha(false)
		expect(p.parse("JUDA 1:1").osis()).toEqual("Jude.1.1")
		expect(p.parse("JUDE 1:1").osis()).toEqual("Jude.1.1")
		`
		true
describe "Localized book Tob (st)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: Tob (st)", ->
		`
		expect(p.parse("Tob 1:1").osis()).toEqual("Tob.1.1")
		`
		true
describe "Localized book Jdt (st)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: Jdt (st)", ->
		`
		expect(p.parse("Jdt 1:1").osis()).toEqual("Jdt.1.1")
		`
		true
describe "Localized book Bar (st)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: Bar (st)", ->
		`
		expect(p.parse("Bar 1:1").osis()).toEqual("Bar.1.1")
		`
		true
describe "Localized book Sus (st)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: Sus (st)", ->
		`
		expect(p.parse("Sus 1:1").osis()).toEqual("Sus.1.1")
		`
		true
describe "Localized book 2Macc (st)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: 2Macc (st)", ->
		`
		expect(p.parse("2Macc 1:1").osis()).toEqual("2Macc.1.1")
		`
		true
describe "Localized book 3Macc (st)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: 3Macc (st)", ->
		`
		expect(p.parse("3Macc 1:1").osis()).toEqual("3Macc.1.1")
		`
		true
describe "Localized book 4Macc (st)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: 4Macc (st)", ->
		`
		expect(p.parse("4Macc 1:1").osis()).toEqual("4Macc.1.1")
		`
		true
describe "Localized book 1Macc (st)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: 1Macc (st)", ->
		`
		expect(p.parse("1Macc 1:1").osis()).toEqual("1Macc.1.1")
		`
		true

describe "Miscellaneous tests", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore", book_sequence_strategy: "ignore", osis_compaction_strategy: "bc", captive_end_digits_strategy: "delete"
		p.include_apocrypha true

	it "should return the expected language", ->
		expect(p.languages).toEqual ["st"]

	it "should handle ranges (st)", ->
		expect(p.parse("Titus 1:1 ho ea ho ea 2").osis()).toEqual "Titus.1.1-Titus.1.2"
		expect(p.parse("Matt 1ho ea ho ea2").osis()).toEqual "Matt.1-Matt.2"
		expect(p.parse("Phlm 2 HO EA HO EA 3").osis()).toEqual "Phlm.1.2-Phlm.1.3"
		expect(p.parse("Titus 1:1 ho 2").osis()).toEqual "Titus.1.1-Titus.1.2"
		expect(p.parse("Matt 1ho2").osis()).toEqual "Matt.1-Matt.2"
		expect(p.parse("Phlm 2 HO 3").osis()).toEqual "Phlm.1.2-Phlm.1.3"
	it "should handle chapters (st)", ->
		expect(p.parse("Titus 1:1, khaolo 2").osis()).toEqual "Titus.1.1,Titus.2"
		expect(p.parse("Matt 3:4 KHAOLO 6").osis()).toEqual "Matt.3.4,Matt.6"
	it "should handle verses (st)", ->
		expect(p.parse("Exod 1:1 temana 3").osis()).toEqual "Exod.1.1,Exod.1.3"
		expect(p.parse("Phlm TEMANA 6").osis()).toEqual "Phlm.1.6"
	it "should handle 'and' (st)", ->
		expect(p.parse("Exod 1:1 le 3").osis()).toEqual "Exod.1.1,Exod.1.3"
		expect(p.parse("Phlm 2 LE 6").osis()).toEqual "Phlm.1.2,Phlm.1.6"
	it "should handle titles (st)", ->
		expect(p.parse("Ps 3 sehlooho, 4:2, 5:sehlooho").osis()).toEqual "Ps.3.1,Ps.4.2,Ps.5.1"
		expect(p.parse("PS 3 SEHLOOHO, 4:2, 5:SEHLOOHO").osis()).toEqual "Ps.3.1,Ps.4.2,Ps.5.1"
	it "should handle 'ff' (st)", ->
		expect(p.parse("Rev 3ff, 4:2ff").osis()).toEqual "Rev.3-Rev.22,Rev.4.2-Rev.4.11"
		expect(p.parse("REV 3 FF, 4:2 FF").osis()).toEqual "Rev.3-Rev.22,Rev.4.2-Rev.4.11"
	it "should handle translations (st)", ->
		expect(p.parse("Lev 1 (sso61)").osis_and_translations()).toEqual [["Lev.1", "sso61"]]
		expect(p.parse("lev 1 sso61").osis_and_translations()).toEqual [["Lev.1", "sso61"]]
	it "should handle book ranges (st)", ->
		p.set_options {book_alone_strategy: "full", book_range_strategy: "include"}
		expect(p.parse("1 ho ea ho ea 3  Johanne").osis()).toEqual "1John.1-3John.1"
		expect(p.parse("1 ho 3  Johanne").osis()).toEqual "1John.1-3John.1"
	it "should handle boundaries (st)", ->
		p.set_options {book_alone_strategy: "full"}
		expect(p.parse("\u2014Matt\u2014").osis()).toEqual "Matt.1-Matt.28"
		expect(p.parse("\u201cMatt 1:1\u201d").osis()).toEqual "Matt.1.1"
