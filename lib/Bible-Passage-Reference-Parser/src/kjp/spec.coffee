bcv_parser = require("../../js/kjp_bcv_parser.js").bcv_parser

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

describe "Localized book Gen (kjp)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: Gen (kjp)", ->
		`
		expect(p.parse("ၥ မိစ့ၭ 1:1").osis()).toEqual("Gen.1.1")
		expect(p.parse("ၥ မိ 1:1").osis()).toEqual("Gen.1.1")
		expect(p.parse("Gen 1:1").osis()).toEqual("Gen.1.1")
		p.include_apocrypha(false)
		expect(p.parse("ၥ မိစ့ၭ 1:1").osis()).toEqual("Gen.1.1")
		expect(p.parse("ၥ မိ 1:1").osis()).toEqual("Gen.1.1")
		expect(p.parse("GEN 1:1").osis()).toEqual("Gen.1.1")
		`
		true
describe "Localized book Exod (kjp)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: Exod (kjp)", ->
		`
		expect(p.parse("2 မိစ့ၭ 1:1").osis()).toEqual("Exod.1.1")
		expect(p.parse("၂ မိစ့ၭ 1:1").osis()).toEqual("Exod.1.1")
		expect(p.parse("2 မိ 1:1").osis()).toEqual("Exod.1.1")
		expect(p.parse("Exod 1:1").osis()).toEqual("Exod.1.1")
		expect(p.parse("၂ မိ 1:1").osis()).toEqual("Exod.1.1")
		`
		true
	it "should handle non-Latin digits in book: Exod (kjp)", ->
		p.set_options non_latin_digits_strategy: "replace"
		`
		expect(p.parse("2 မိစ့ၭ 1:1").osis()).toEqual("Exod.1.1")
		expect(p.parse("၂ မိစ့ၭ 1:1").osis()).toEqual("Exod.1.1")
		expect(p.parse("2 မိ 1:1").osis()).toEqual("Exod.1.1")
		expect(p.parse("Exod 1:1").osis()).toEqual("Exod.1.1")
		expect(p.parse("၂ မိ 1:1").osis()).toEqual("Exod.1.1")
		p.include_apocrypha(false)
		expect(p.parse("2 မိစ့ၭ 1:1").osis()).toEqual("Exod.1.1")
		expect(p.parse("၂ မိစ့ၭ 1:1").osis()).toEqual("Exod.1.1")
		expect(p.parse("2 မိ 1:1").osis()).toEqual("Exod.1.1")
		expect(p.parse("EXOD 1:1").osis()).toEqual("Exod.1.1")
		expect(p.parse("၂ မိ 1:1").osis()).toEqual("Exod.1.1")
		`
		true
describe "Localized book Bel (kjp)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: Bel (kjp)", ->
		`
		expect(p.parse("Bel 1:1").osis()).toEqual("Bel.1.1")
		`
		true
describe "Localized book Lev (kjp)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: Lev (kjp)", ->
		`
		expect(p.parse("3 မိစ့ၭ 1:1").osis()).toEqual("Lev.1.1")
		expect(p.parse("၃ မိစ့ၭ 1:1").osis()).toEqual("Lev.1.1")
		expect(p.parse("3 မိ 1:1").osis()).toEqual("Lev.1.1")
		expect(p.parse("၃ မိ 1:1").osis()).toEqual("Lev.1.1")
		expect(p.parse("Lev 1:1").osis()).toEqual("Lev.1.1")
		`
		true
	it "should handle non-Latin digits in book: Lev (kjp)", ->
		p.set_options non_latin_digits_strategy: "replace"
		`
		expect(p.parse("3 မိစ့ၭ 1:1").osis()).toEqual("Lev.1.1")
		expect(p.parse("၃ မိစ့ၭ 1:1").osis()).toEqual("Lev.1.1")
		expect(p.parse("3 မိ 1:1").osis()).toEqual("Lev.1.1")
		expect(p.parse("၃ မိ 1:1").osis()).toEqual("Lev.1.1")
		expect(p.parse("Lev 1:1").osis()).toEqual("Lev.1.1")
		p.include_apocrypha(false)
		expect(p.parse("3 မိစ့ၭ 1:1").osis()).toEqual("Lev.1.1")
		expect(p.parse("၃ မိစ့ၭ 1:1").osis()).toEqual("Lev.1.1")
		expect(p.parse("3 မိ 1:1").osis()).toEqual("Lev.1.1")
		expect(p.parse("၃ မိ 1:1").osis()).toEqual("Lev.1.1")
		expect(p.parse("LEV 1:1").osis()).toEqual("Lev.1.1")
		`
		true
describe "Localized book Num (kjp)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: Num (kjp)", ->
		`
		expect(p.parse("4 မိစ့ၭ 1:1").osis()).toEqual("Num.1.1")
		expect(p.parse("၄ မိစ့ၭ 1:1").osis()).toEqual("Num.1.1")
		expect(p.parse("4 မိ 1:1").osis()).toEqual("Num.1.1")
		expect(p.parse("၄ မိ 1:1").osis()).toEqual("Num.1.1")
		expect(p.parse("Num 1:1").osis()).toEqual("Num.1.1")
		`
		true
	it "should handle non-Latin digits in book: Num (kjp)", ->
		p.set_options non_latin_digits_strategy: "replace"
		`
		expect(p.parse("4 မိစ့ၭ 1:1").osis()).toEqual("Num.1.1")
		expect(p.parse("၄ မိစ့ၭ 1:1").osis()).toEqual("Num.1.1")
		expect(p.parse("4 မိ 1:1").osis()).toEqual("Num.1.1")
		expect(p.parse("၄ မိ 1:1").osis()).toEqual("Num.1.1")
		expect(p.parse("Num 1:1").osis()).toEqual("Num.1.1")
		p.include_apocrypha(false)
		expect(p.parse("4 မိစ့ၭ 1:1").osis()).toEqual("Num.1.1")
		expect(p.parse("၄ မိစ့ၭ 1:1").osis()).toEqual("Num.1.1")
		expect(p.parse("4 မိ 1:1").osis()).toEqual("Num.1.1")
		expect(p.parse("၄ မိ 1:1").osis()).toEqual("Num.1.1")
		expect(p.parse("NUM 1:1").osis()).toEqual("Num.1.1")
		`
		true
describe "Localized book Sir (kjp)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: Sir (kjp)", ->
		`
		expect(p.parse("Sir 1:1").osis()).toEqual("Sir.1.1")
		`
		true
describe "Localized book Wis (kjp)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: Wis (kjp)", ->
		`
		expect(p.parse("Wis 1:1").osis()).toEqual("Wis.1.1")
		`
		true
describe "Localized book Lam (kjp)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: Lam (kjp)", ->
		`
		expect(p.parse("ဂၪ့ဆၧယၧၩ့ဆၧ 1:1").osis()).toEqual("Lam.1.1")
		expect(p.parse("ဂၪ့ဆၧ 1:1").osis()).toEqual("Lam.1.1")
		expect(p.parse("Lam 1:1").osis()).toEqual("Lam.1.1")
		p.include_apocrypha(false)
		expect(p.parse("ဂၪ့ဆၧယၧၩ့ဆၧ 1:1").osis()).toEqual("Lam.1.1")
		expect(p.parse("ဂၪ့ဆၧ 1:1").osis()).toEqual("Lam.1.1")
		expect(p.parse("LAM 1:1").osis()).toEqual("Lam.1.1")
		`
		true
describe "Localized book EpJer (kjp)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: EpJer (kjp)", ->
		`
		expect(p.parse("EpJer 1:1").osis()).toEqual("EpJer.1.1")
		`
		true
describe "Localized book Rev (kjp)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: Rev (kjp)", ->
		`
		expect(p.parse("နဲၪဖျီၪ 1:1").osis()).toEqual("Rev.1.1")
		expect(p.parse("Rev 1:1").osis()).toEqual("Rev.1.1")
		expect(p.parse("နဲၪ 1:1").osis()).toEqual("Rev.1.1")
		p.include_apocrypha(false)
		expect(p.parse("နဲၪဖျီၪ 1:1").osis()).toEqual("Rev.1.1")
		expect(p.parse("REV 1:1").osis()).toEqual("Rev.1.1")
		expect(p.parse("နဲၪ 1:1").osis()).toEqual("Rev.1.1")
		`
		true
describe "Localized book PrMan (kjp)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: PrMan (kjp)", ->
		`
		expect(p.parse("PrMan 1:1").osis()).toEqual("PrMan.1.1")
		`
		true
describe "Localized book Deut (kjp)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: Deut (kjp)", ->
		`
		expect(p.parse("5 မိစ့ၭ 1:1").osis()).toEqual("Deut.1.1")
		expect(p.parse("၅ မိစ့ၭ 1:1").osis()).toEqual("Deut.1.1")
		expect(p.parse("5 မိ 1:1").osis()).toEqual("Deut.1.1")
		expect(p.parse("Deut 1:1").osis()).toEqual("Deut.1.1")
		expect(p.parse("၅ မိ 1:1").osis()).toEqual("Deut.1.1")
		`
		true
	it "should handle non-Latin digits in book: Deut (kjp)", ->
		p.set_options non_latin_digits_strategy: "replace"
		`
		expect(p.parse("5 မိစ့ၭ 1:1").osis()).toEqual("Deut.1.1")
		expect(p.parse("၅ မိစ့ၭ 1:1").osis()).toEqual("Deut.1.1")
		expect(p.parse("5 မိ 1:1").osis()).toEqual("Deut.1.1")
		expect(p.parse("Deut 1:1").osis()).toEqual("Deut.1.1")
		expect(p.parse("၅ မိ 1:1").osis()).toEqual("Deut.1.1")
		p.include_apocrypha(false)
		expect(p.parse("5 မိစ့ၭ 1:1").osis()).toEqual("Deut.1.1")
		expect(p.parse("၅ မိစ့ၭ 1:1").osis()).toEqual("Deut.1.1")
		expect(p.parse("5 မိ 1:1").osis()).toEqual("Deut.1.1")
		expect(p.parse("DEUT 1:1").osis()).toEqual("Deut.1.1")
		expect(p.parse("၅ မိ 1:1").osis()).toEqual("Deut.1.1")
		`
		true
describe "Localized book Josh (kjp)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: Josh (kjp)", ->
		`
		expect(p.parse("ယီရှုၫအ့ၫ. 1:1").osis()).toEqual("Josh.1.1")
		expect(p.parse("ယီရှုၫအ့ၫ 1:1").osis()).toEqual("Josh.1.1")
		expect(p.parse("ရှုၫ. 1:1").osis()).toEqual("Josh.1.1")
		expect(p.parse("Josh 1:1").osis()).toEqual("Josh.1.1")
		expect(p.parse("ရှုၫ 1:1").osis()).toEqual("Josh.1.1")
		p.include_apocrypha(false)
		expect(p.parse("ယီရှုၫအ့ၫ. 1:1").osis()).toEqual("Josh.1.1")
		expect(p.parse("ယီရှုၫအ့ၫ 1:1").osis()).toEqual("Josh.1.1")
		expect(p.parse("ရှုၫ. 1:1").osis()).toEqual("Josh.1.1")
		expect(p.parse("JOSH 1:1").osis()).toEqual("Josh.1.1")
		expect(p.parse("ရှုၫ 1:1").osis()).toEqual("Josh.1.1")
		`
		true
describe "Localized book Judg (kjp)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: Judg (kjp)", ->
		`
		expect(p.parse("စ့ၩရၫ့ 1:1").osis()).toEqual("Judg.1.1")
		expect(p.parse("Judg 1:1").osis()).toEqual("Judg.1.1")
		expect(p.parse("စ့ၩ 1:1").osis()).toEqual("Judg.1.1")
		p.include_apocrypha(false)
		expect(p.parse("စ့ၩရၫ့ 1:1").osis()).toEqual("Judg.1.1")
		expect(p.parse("JUDG 1:1").osis()).toEqual("Judg.1.1")
		expect(p.parse("စ့ၩ 1:1").osis()).toEqual("Judg.1.1")
		`
		true
describe "Localized book Ruth (kjp)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: Ruth (kjp)", ->
		`
		expect(p.parse("Ruth 1:1").osis()).toEqual("Ruth.1.1")
		expect(p.parse("ရုၥၭ 1:1").osis()).toEqual("Ruth.1.1")
		expect(p.parse("ရု 1:1").osis()).toEqual("Ruth.1.1")
		p.include_apocrypha(false)
		expect(p.parse("RUTH 1:1").osis()).toEqual("Ruth.1.1")
		expect(p.parse("ရုၥၭ 1:1").osis()).toEqual("Ruth.1.1")
		expect(p.parse("ရု 1:1").osis()).toEqual("Ruth.1.1")
		`
		true
describe "Localized book 1Esd (kjp)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: 1Esd (kjp)", ->
		`
		expect(p.parse("1Esd 1:1").osis()).toEqual("1Esd.1.1")
		`
		true
describe "Localized book 2Esd (kjp)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: 2Esd (kjp)", ->
		`
		expect(p.parse("2Esd 1:1").osis()).toEqual("2Esd.1.1")
		`
		true
describe "Localized book Isa (kjp)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: Isa (kjp)", ->
		`
		expect(p.parse("အဲၫစ့ယၫ 1:1").osis()).toEqual("Isa.1.1")
		expect(p.parse("Isa 1:1").osis()).toEqual("Isa.1.1")
		expect(p.parse("အဲၫ 1:1").osis()).toEqual("Isa.1.1")
		p.include_apocrypha(false)
		expect(p.parse("အဲၫစ့ယၫ 1:1").osis()).toEqual("Isa.1.1")
		expect(p.parse("ISA 1:1").osis()).toEqual("Isa.1.1")
		expect(p.parse("အဲၫ 1:1").osis()).toEqual("Isa.1.1")
		`
		true
describe "Localized book 2Sam (kjp)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: 2Sam (kjp)", ->
		`
		expect(p.parse("2 စၫမုၫအ့လၭ 1:1").osis()).toEqual("2Sam.1.1")
		expect(p.parse("၂ စၫမုၫအ့လၭ 1:1").osis()).toEqual("2Sam.1.1")
		expect(p.parse("2 စၫ 1:1").osis()).toEqual("2Sam.1.1")
		expect(p.parse("2Sam 1:1").osis()).toEqual("2Sam.1.1")
		expect(p.parse("၂ စၫ 1:1").osis()).toEqual("2Sam.1.1")
		`
		true
	it "should handle non-Latin digits in book: 2Sam (kjp)", ->
		p.set_options non_latin_digits_strategy: "replace"
		`
		expect(p.parse("2 စၫမုၫအ့လၭ 1:1").osis()).toEqual("2Sam.1.1")
		expect(p.parse("၂ စၫမုၫအ့လၭ 1:1").osis()).toEqual("2Sam.1.1")
		expect(p.parse("2 စၫ 1:1").osis()).toEqual("2Sam.1.1")
		expect(p.parse("2Sam 1:1").osis()).toEqual("2Sam.1.1")
		expect(p.parse("၂ စၫ 1:1").osis()).toEqual("2Sam.1.1")
		p.include_apocrypha(false)
		expect(p.parse("2 စၫမုၫအ့လၭ 1:1").osis()).toEqual("2Sam.1.1")
		expect(p.parse("၂ စၫမုၫအ့လၭ 1:1").osis()).toEqual("2Sam.1.1")
		expect(p.parse("2 စၫ 1:1").osis()).toEqual("2Sam.1.1")
		expect(p.parse("2SAM 1:1").osis()).toEqual("2Sam.1.1")
		expect(p.parse("၂ စၫ 1:1").osis()).toEqual("2Sam.1.1")
		`
		true
describe "Localized book 1Sam (kjp)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: 1Sam (kjp)", ->
		`
		expect(p.parse("ၥ စၫမုၫအ့လၭ 1:1").osis()).toEqual("1Sam.1.1")
		expect(p.parse("1Sam 1:1").osis()).toEqual("1Sam.1.1")
		expect(p.parse("ၥ စၫ 1:1").osis()).toEqual("1Sam.1.1")
		p.include_apocrypha(false)
		expect(p.parse("ၥ စၫမုၫအ့လၭ 1:1").osis()).toEqual("1Sam.1.1")
		expect(p.parse("1SAM 1:1").osis()).toEqual("1Sam.1.1")
		expect(p.parse("ၥ စၫ 1:1").osis()).toEqual("1Sam.1.1")
		`
		true
describe "Localized book 2Kgs (kjp)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: 2Kgs (kjp)", ->
		`
		expect(p.parse("2 စဎွၩ 1:1").osis()).toEqual("2Kgs.1.1")
		expect(p.parse("၂ စဎွၩ 1:1").osis()).toEqual("2Kgs.1.1")
		expect(p.parse("2 ဎွၩ 1:1").osis()).toEqual("2Kgs.1.1")
		expect(p.parse("၂ ဎွၩ 1:1").osis()).toEqual("2Kgs.1.1")
		expect(p.parse("2Kgs 1:1").osis()).toEqual("2Kgs.1.1")
		`
		true
	it "should handle non-Latin digits in book: 2Kgs (kjp)", ->
		p.set_options non_latin_digits_strategy: "replace"
		`
		expect(p.parse("2 စဎွၩ 1:1").osis()).toEqual("2Kgs.1.1")
		expect(p.parse("၂ စဎွၩ 1:1").osis()).toEqual("2Kgs.1.1")
		expect(p.parse("2 ဎွၩ 1:1").osis()).toEqual("2Kgs.1.1")
		expect(p.parse("၂ ဎွၩ 1:1").osis()).toEqual("2Kgs.1.1")
		expect(p.parse("2Kgs 1:1").osis()).toEqual("2Kgs.1.1")
		p.include_apocrypha(false)
		expect(p.parse("2 စဎွၩ 1:1").osis()).toEqual("2Kgs.1.1")
		expect(p.parse("၂ စဎွၩ 1:1").osis()).toEqual("2Kgs.1.1")
		expect(p.parse("2 ဎွၩ 1:1").osis()).toEqual("2Kgs.1.1")
		expect(p.parse("၂ ဎွၩ 1:1").osis()).toEqual("2Kgs.1.1")
		expect(p.parse("2KGS 1:1").osis()).toEqual("2Kgs.1.1")
		`
		true
describe "Localized book 1Kgs (kjp)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: 1Kgs (kjp)", ->
		`
		expect(p.parse("ၥ စဎွၩ 1:1").osis()).toEqual("1Kgs.1.1")
		expect(p.parse("ၥ ဎွၩ 1:1").osis()).toEqual("1Kgs.1.1")
		expect(p.parse("1Kgs 1:1").osis()).toEqual("1Kgs.1.1")
		p.include_apocrypha(false)
		expect(p.parse("ၥ စဎွၩ 1:1").osis()).toEqual("1Kgs.1.1")
		expect(p.parse("ၥ ဎွၩ 1:1").osis()).toEqual("1Kgs.1.1")
		expect(p.parse("1KGS 1:1").osis()).toEqual("1Kgs.1.1")
		`
		true
describe "Localized book 2Chr (kjp)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: 2Chr (kjp)", ->
		`
		expect(p.parse("2 ကွ့ၭနဲၪ့ဆၧ 1:1").osis()).toEqual("2Chr.1.1")
		expect(p.parse("၂ ကွ့ၭနဲၪ့ဆၧ 1:1").osis()).toEqual("2Chr.1.1")
		expect(p.parse("2 ကွ့ၭ 1:1").osis()).toEqual("2Chr.1.1")
		expect(p.parse("၂ ကွ့ၭ 1:1").osis()).toEqual("2Chr.1.1")
		expect(p.parse("2Chr 1:1").osis()).toEqual("2Chr.1.1")
		`
		true
	it "should handle non-Latin digits in book: 2Chr (kjp)", ->
		p.set_options non_latin_digits_strategy: "replace"
		`
		expect(p.parse("2 ကွ့ၭနဲၪ့ဆၧ 1:1").osis()).toEqual("2Chr.1.1")
		expect(p.parse("၂ ကွ့ၭနဲၪ့ဆၧ 1:1").osis()).toEqual("2Chr.1.1")
		expect(p.parse("2 ကွ့ၭ 1:1").osis()).toEqual("2Chr.1.1")
		expect(p.parse("၂ ကွ့ၭ 1:1").osis()).toEqual("2Chr.1.1")
		expect(p.parse("2Chr 1:1").osis()).toEqual("2Chr.1.1")
		p.include_apocrypha(false)
		expect(p.parse("2 ကွ့ၭနဲၪ့ဆၧ 1:1").osis()).toEqual("2Chr.1.1")
		expect(p.parse("၂ ကွ့ၭနဲၪ့ဆၧ 1:1").osis()).toEqual("2Chr.1.1")
		expect(p.parse("2 ကွ့ၭ 1:1").osis()).toEqual("2Chr.1.1")
		expect(p.parse("၂ ကွ့ၭ 1:1").osis()).toEqual("2Chr.1.1")
		expect(p.parse("2CHR 1:1").osis()).toEqual("2Chr.1.1")
		`
		true
describe "Localized book 1Chr (kjp)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: 1Chr (kjp)", ->
		`
		expect(p.parse("1 ကွ့ၭနဲၪ့ဆၧ 1:1").osis()).toEqual("1Chr.1.1")
		expect(p.parse("၁ ကွ့ၭနဲၪ့ဆၧ 1:1").osis()).toEqual("1Chr.1.1")
		expect(p.parse("1 ကွ့ၭ 1:1").osis()).toEqual("1Chr.1.1")
		expect(p.parse("၁ ကွ့ၭ 1:1").osis()).toEqual("1Chr.1.1")
		expect(p.parse("1Chr 1:1").osis()).toEqual("1Chr.1.1")
		`
		true
	it "should handle non-Latin digits in book: 1Chr (kjp)", ->
		p.set_options non_latin_digits_strategy: "replace"
		`
		expect(p.parse("1 ကွ့ၭနဲၪ့ဆၧ 1:1").osis()).toEqual("1Chr.1.1")
		expect(p.parse("၁ ကွ့ၭနဲၪ့ဆၧ 1:1").osis()).toEqual("1Chr.1.1")
		expect(p.parse("1 ကွ့ၭ 1:1").osis()).toEqual("1Chr.1.1")
		expect(p.parse("၁ ကွ့ၭ 1:1").osis()).toEqual("1Chr.1.1")
		expect(p.parse("1Chr 1:1").osis()).toEqual("1Chr.1.1")
		p.include_apocrypha(false)
		expect(p.parse("1 ကွ့ၭနဲၪ့ဆၧ 1:1").osis()).toEqual("1Chr.1.1")
		expect(p.parse("၁ ကွ့ၭနဲၪ့ဆၧ 1:1").osis()).toEqual("1Chr.1.1")
		expect(p.parse("1 ကွ့ၭ 1:1").osis()).toEqual("1Chr.1.1")
		expect(p.parse("၁ ကွ့ၭ 1:1").osis()).toEqual("1Chr.1.1")
		expect(p.parse("1CHR 1:1").osis()).toEqual("1Chr.1.1")
		`
		true
describe "Localized book Ezra (kjp)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: Ezra (kjp)", ->
		`
		expect(p.parse("အ့ဇရၫ 1:1").osis()).toEqual("Ezra.1.1")
		expect(p.parse("Ezra 1:1").osis()).toEqual("Ezra.1.1")
		expect(p.parse("ရၫ 1:1").osis()).toEqual("Ezra.1.1")
		p.include_apocrypha(false)
		expect(p.parse("အ့ဇရၫ 1:1").osis()).toEqual("Ezra.1.1")
		expect(p.parse("EZRA 1:1").osis()).toEqual("Ezra.1.1")
		expect(p.parse("ရၫ 1:1").osis()).toEqual("Ezra.1.1")
		`
		true
describe "Localized book Neh (kjp)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: Neh (kjp)", ->
		`
		expect(p.parse("နံၫဟမဲအၫ 1:1").osis()).toEqual("Neh.1.1")
		expect(p.parse("Neh 1:1").osis()).toEqual("Neh.1.1")
		expect(p.parse("နံၫ 1:1").osis()).toEqual("Neh.1.1")
		p.include_apocrypha(false)
		expect(p.parse("နံၫဟမဲအၫ 1:1").osis()).toEqual("Neh.1.1")
		expect(p.parse("NEH 1:1").osis()).toEqual("Neh.1.1")
		expect(p.parse("နံၫ 1:1").osis()).toEqual("Neh.1.1")
		`
		true
describe "Localized book GkEsth (kjp)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: GkEsth (kjp)", ->
		`
		expect(p.parse("GkEsth 1:1").osis()).toEqual("GkEsth.1.1")
		`
		true
describe "Localized book Esth (kjp)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: Esth (kjp)", ->
		`
		expect(p.parse("အ့စတၧၫ 1:1").osis()).toEqual("Esth.1.1")
		expect(p.parse("Esth 1:1").osis()).toEqual("Esth.1.1")
		expect(p.parse("တၧၫ 1:1").osis()).toEqual("Esth.1.1")
		p.include_apocrypha(false)
		expect(p.parse("အ့စတၧၫ 1:1").osis()).toEqual("Esth.1.1")
		expect(p.parse("ESTH 1:1").osis()).toEqual("Esth.1.1")
		expect(p.parse("တၧၫ 1:1").osis()).toEqual("Esth.1.1")
		`
		true
describe "Localized book Job (kjp)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: Job (kjp)", ->
		`
		expect(p.parse("ယိဘၭ 1:1").osis()).toEqual("Job.1.1")
		expect(p.parse("Job 1:1").osis()).toEqual("Job.1.1")
		expect(p.parse("ဘၭ 1:1").osis()).toEqual("Job.1.1")
		p.include_apocrypha(false)
		expect(p.parse("ယိဘၭ 1:1").osis()).toEqual("Job.1.1")
		expect(p.parse("JOB 1:1").osis()).toEqual("Job.1.1")
		expect(p.parse("ဘၭ 1:1").osis()).toEqual("Job.1.1")
		`
		true
describe "Localized book Ps (kjp)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: Ps (kjp)", ->
		`
		expect(p.parse("အၪ့အူၭ 1:1").osis()).toEqual("Ps.1.1")
		expect(p.parse("အၪ့ 1:1").osis()).toEqual("Ps.1.1")
		expect(p.parse("Ps 1:1").osis()).toEqual("Ps.1.1")
		p.include_apocrypha(false)
		expect(p.parse("အၪ့အူၭ 1:1").osis()).toEqual("Ps.1.1")
		expect(p.parse("အၪ့ 1:1").osis()).toEqual("Ps.1.1")
		expect(p.parse("PS 1:1").osis()).toEqual("Ps.1.1")
		`
		true
describe "Localized book PrAzar (kjp)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: PrAzar (kjp)", ->
		`
		expect(p.parse("PrAzar 1:1").osis()).toEqual("PrAzar.1.1")
		`
		true
describe "Localized book Prov (kjp)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: Prov (kjp)", ->
		`
		expect(p.parse("ချဲၩ့ဒီၩ့လၩ့ 1:1").osis()).toEqual("Prov.1.1")
		expect(p.parse("Prov 1:1").osis()).toEqual("Prov.1.1")
		expect(p.parse("ဒီၩ့ 1:1").osis()).toEqual("Prov.1.1")
		p.include_apocrypha(false)
		expect(p.parse("ချဲၩ့ဒီၩ့လၩ့ 1:1").osis()).toEqual("Prov.1.1")
		expect(p.parse("PROV 1:1").osis()).toEqual("Prov.1.1")
		expect(p.parse("ဒီၩ့ 1:1").osis()).toEqual("Prov.1.1")
		`
		true
describe "Localized book Eccl (kjp)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: Eccl (kjp)", ->
		`
		expect(p.parse("လီၩလၩ့ဆၧ 1:1").osis()).toEqual("Eccl.1.1")
		expect(p.parse("Eccl 1:1").osis()).toEqual("Eccl.1.1")
		expect(p.parse("လီၩ 1:1").osis()).toEqual("Eccl.1.1")
		p.include_apocrypha(false)
		expect(p.parse("လီၩလၩ့ဆၧ 1:1").osis()).toEqual("Eccl.1.1")
		expect(p.parse("ECCL 1:1").osis()).toEqual("Eccl.1.1")
		expect(p.parse("လီၩ 1:1").osis()).toEqual("Eccl.1.1")
		`
		true
describe "Localized book SgThree (kjp)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: SgThree (kjp)", ->
		`
		expect(p.parse("SgThree 1:1").osis()).toEqual("SgThree.1.1")
		`
		true
describe "Localized book Song (kjp)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: Song (kjp)", ->
		`
		expect(p.parse("စီလမၧၫ့အထၭခိၪ 1:1").osis()).toEqual("Song.1.1")
		expect(p.parse("Song 1:1").osis()).toEqual("Song.1.1")
		expect(p.parse("ထၭ 1:1").osis()).toEqual("Song.1.1")
		p.include_apocrypha(false)
		expect(p.parse("စီလမၧၫ့အထၭခိၪ 1:1").osis()).toEqual("Song.1.1")
		expect(p.parse("SONG 1:1").osis()).toEqual("Song.1.1")
		expect(p.parse("ထၭ 1:1").osis()).toEqual("Song.1.1")
		`
		true
describe "Localized book Jer (kjp)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: Jer (kjp)", ->
		`
		expect(p.parse("ယ့ၫရမဲအၫ 1:1").osis()).toEqual("Jer.1.1")
		expect(p.parse("မဲအၫ 1:1").osis()).toEqual("Jer.1.1")
		expect(p.parse("Jer 1:1").osis()).toEqual("Jer.1.1")
		p.include_apocrypha(false)
		expect(p.parse("ယ့ၫရမဲအၫ 1:1").osis()).toEqual("Jer.1.1")
		expect(p.parse("မဲအၫ 1:1").osis()).toEqual("Jer.1.1")
		expect(p.parse("JER 1:1").osis()).toEqual("Jer.1.1")
		`
		true
describe "Localized book Ezek (kjp)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: Ezek (kjp)", ->
		`
		expect(p.parse("အဇံၫခအ့လၭ 1:1").osis()).toEqual("Ezek.1.1")
		expect(p.parse("Ezek 1:1").osis()).toEqual("Ezek.1.1")
		expect(p.parse("ဇံၫ 1:1").osis()).toEqual("Ezek.1.1")
		p.include_apocrypha(false)
		expect(p.parse("အဇံၫခအ့လၭ 1:1").osis()).toEqual("Ezek.1.1")
		expect(p.parse("EZEK 1:1").osis()).toEqual("Ezek.1.1")
		expect(p.parse("ဇံၫ 1:1").osis()).toEqual("Ezek.1.1")
		`
		true
describe "Localized book Dan (kjp)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: Dan (kjp)", ->
		`
		expect(p.parse("ဒၫ့နအ့လၭ 1:1").osis()).toEqual("Dan.1.1")
		expect(p.parse("Dan 1:1").osis()).toEqual("Dan.1.1")
		expect(p.parse("ဒၫ့ 1:1").osis()).toEqual("Dan.1.1")
		p.include_apocrypha(false)
		expect(p.parse("ဒၫ့နအ့လၭ 1:1").osis()).toEqual("Dan.1.1")
		expect(p.parse("DAN 1:1").osis()).toEqual("Dan.1.1")
		expect(p.parse("ဒၫ့ 1:1").osis()).toEqual("Dan.1.1")
		`
		true
describe "Localized book Hos (kjp)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: Hos (kjp)", ->
		`
		expect(p.parse("ဟိၫစံအၫ 1:1").osis()).toEqual("Hos.1.1")
		expect(p.parse("Hos 1:1").osis()).toEqual("Hos.1.1")
		expect(p.parse("ဟိၫ 1:1").osis()).toEqual("Hos.1.1")
		p.include_apocrypha(false)
		expect(p.parse("ဟိၫစံအၫ 1:1").osis()).toEqual("Hos.1.1")
		expect(p.parse("HOS 1:1").osis()).toEqual("Hos.1.1")
		expect(p.parse("ဟိၫ 1:1").osis()).toEqual("Hos.1.1")
		`
		true
describe "Localized book Joel (kjp)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: Joel (kjp)", ->
		`
		expect(p.parse("ယိၫအ့လၭ 1:1").osis()).toEqual("Joel.1.1")
		expect(p.parse("Joel 1:1").osis()).toEqual("Joel.1.1")
		expect(p.parse("ယိၫ 1:1").osis()).toEqual("Joel.1.1")
		p.include_apocrypha(false)
		expect(p.parse("ယိၫအ့လၭ 1:1").osis()).toEqual("Joel.1.1")
		expect(p.parse("JOEL 1:1").osis()).toEqual("Joel.1.1")
		expect(p.parse("ယိၫ 1:1").osis()).toEqual("Joel.1.1")
		`
		true
describe "Localized book Amos (kjp)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: Amos (kjp)", ->
		`
		expect(p.parse("အၫမူၭ 1:1").osis()).toEqual("Amos.1.1")
		expect(p.parse("Amos 1:1").osis()).toEqual("Amos.1.1")
		expect(p.parse("မူၭ 1:1").osis()).toEqual("Amos.1.1")
		p.include_apocrypha(false)
		expect(p.parse("အၫမူၭ 1:1").osis()).toEqual("Amos.1.1")
		expect(p.parse("AMOS 1:1").osis()).toEqual("Amos.1.1")
		expect(p.parse("မူၭ 1:1").osis()).toEqual("Amos.1.1")
		`
		true
describe "Localized book Obad (kjp)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: Obad (kjp)", ->
		`
		expect(p.parse("အိၫဘဒဲအၫ 1:1").osis()).toEqual("Obad.1.1")
		expect(p.parse("Obad 1:1").osis()).toEqual("Obad.1.1")
		expect(p.parse("အိၫ 1:1").osis()).toEqual("Obad.1.1")
		p.include_apocrypha(false)
		expect(p.parse("အိၫဘဒဲအၫ 1:1").osis()).toEqual("Obad.1.1")
		expect(p.parse("OBAD 1:1").osis()).toEqual("Obad.1.1")
		expect(p.parse("အိၫ 1:1").osis()).toEqual("Obad.1.1")
		`
		true
describe "Localized book Jonah (kjp)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: Jonah (kjp)", ->
		`
		expect(p.parse("Jonah 1:1").osis()).toEqual("Jonah.1.1")
		expect(p.parse("ယိနၫ 1:1").osis()).toEqual("Jonah.1.1")
		expect(p.parse("နၫ 1:1").osis()).toEqual("Jonah.1.1")
		p.include_apocrypha(false)
		expect(p.parse("JONAH 1:1").osis()).toEqual("Jonah.1.1")
		expect(p.parse("ယိနၫ 1:1").osis()).toEqual("Jonah.1.1")
		expect(p.parse("နၫ 1:1").osis()).toEqual("Jonah.1.1")
		`
		true
describe "Localized book Mic (kjp)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: Mic (kjp)", ->
		`
		expect(p.parse("မဲကၫ 1:1").osis()).toEqual("Mic.1.1")
		expect(p.parse("Mic 1:1").osis()).toEqual("Mic.1.1")
		expect(p.parse("မဲ 1:1").osis()).toEqual("Mic.1.1")
		p.include_apocrypha(false)
		expect(p.parse("မဲကၫ 1:1").osis()).toEqual("Mic.1.1")
		expect(p.parse("MIC 1:1").osis()).toEqual("Mic.1.1")
		expect(p.parse("မဲ 1:1").osis()).toEqual("Mic.1.1")
		`
		true
describe "Localized book Nah (kjp)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: Nah (kjp)", ->
		`
		expect(p.parse("နၫဟၧၫ့ 1:1").osis()).toEqual("Nah.1.1")
		expect(p.parse("ဟၧၫ့ 1:1").osis()).toEqual("Nah.1.1")
		expect(p.parse("Nah 1:1").osis()).toEqual("Nah.1.1")
		p.include_apocrypha(false)
		expect(p.parse("နၫဟၧၫ့ 1:1").osis()).toEqual("Nah.1.1")
		expect(p.parse("ဟၧၫ့ 1:1").osis()).toEqual("Nah.1.1")
		expect(p.parse("NAH 1:1").osis()).toEqual("Nah.1.1")
		`
		true
describe "Localized book Hab (kjp)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: Hab (kjp)", ->
		`
		expect(p.parse("ဟဘၭကၧၭ 1:1").osis()).toEqual("Hab.1.1")
		expect(p.parse("Hab 1:1").osis()).toEqual("Hab.1.1")
		expect(p.parse("ကၧၭ 1:1").osis()).toEqual("Hab.1.1")
		p.include_apocrypha(false)
		expect(p.parse("ဟဘၭကၧၭ 1:1").osis()).toEqual("Hab.1.1")
		expect(p.parse("HAB 1:1").osis()).toEqual("Hab.1.1")
		expect(p.parse("ကၧၭ 1:1").osis()).toEqual("Hab.1.1")
		`
		true
describe "Localized book Zeph (kjp)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: Zeph (kjp)", ->
		`
		expect(p.parse("ဇ့ၭဖနဲအၫ 1:1").osis()).toEqual("Zeph.1.1")
		expect(p.parse("Zeph 1:1").osis()).toEqual("Zeph.1.1")
		expect(p.parse("ဖနဲ 1:1").osis()).toEqual("Zeph.1.1")
		p.include_apocrypha(false)
		expect(p.parse("ဇ့ၭဖနဲအၫ 1:1").osis()).toEqual("Zeph.1.1")
		expect(p.parse("ZEPH 1:1").osis()).toEqual("Zeph.1.1")
		expect(p.parse("ဖနဲ 1:1").osis()).toEqual("Zeph.1.1")
		`
		true
describe "Localized book Hag (kjp)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: Hag (kjp)", ->
		`
		expect(p.parse("ဟၭဂဲၫ 1:1").osis()).toEqual("Hag.1.1")
		expect(p.parse("Hag 1:1").osis()).toEqual("Hag.1.1")
		expect(p.parse("ဟၭ 1:1").osis()).toEqual("Hag.1.1")
		p.include_apocrypha(false)
		expect(p.parse("ဟၭဂဲၫ 1:1").osis()).toEqual("Hag.1.1")
		expect(p.parse("HAG 1:1").osis()).toEqual("Hag.1.1")
		expect(p.parse("ဟၭ 1:1").osis()).toEqual("Hag.1.1")
		`
		true
describe "Localized book Zech (kjp)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: Zech (kjp)", ->
		`
		expect(p.parse("ဇ့ၭခရဲအၫ 1:1").osis()).toEqual("Zech.1.1")
		expect(p.parse("Zech 1:1").osis()).toEqual("Zech.1.1")
		expect(p.parse("ရဲ 1:1").osis()).toEqual("Zech.1.1")
		p.include_apocrypha(false)
		expect(p.parse("ဇ့ၭခရဲအၫ 1:1").osis()).toEqual("Zech.1.1")
		expect(p.parse("ZECH 1:1").osis()).toEqual("Zech.1.1")
		expect(p.parse("ရဲ 1:1").osis()).toEqual("Zech.1.1")
		`
		true
describe "Localized book Mal (kjp)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: Mal (kjp)", ->
		`
		expect(p.parse("မၪလခဲၫ 1:1").osis()).toEqual("Mal.1.1")
		expect(p.parse("Mal 1:1").osis()).toEqual("Mal.1.1")
		expect(p.parse("ခဲၫ 1:1").osis()).toEqual("Mal.1.1")
		p.include_apocrypha(false)
		expect(p.parse("မၪလခဲၫ 1:1").osis()).toEqual("Mal.1.1")
		expect(p.parse("MAL 1:1").osis()).toEqual("Mal.1.1")
		expect(p.parse("ခဲၫ 1:1").osis()).toEqual("Mal.1.1")
		`
		true
describe "Localized book Matt (kjp)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: Matt (kjp)", ->
		`
		expect(p.parse("မၭၥုၫ 1:1").osis()).toEqual("Matt.1.1")
		expect(p.parse("Matt 1:1").osis()).toEqual("Matt.1.1")
		expect(p.parse("မၭ 1:1").osis()).toEqual("Matt.1.1")
		p.include_apocrypha(false)
		expect(p.parse("မၭၥုၫ 1:1").osis()).toEqual("Matt.1.1")
		expect(p.parse("MATT 1:1").osis()).toEqual("Matt.1.1")
		expect(p.parse("မၭ 1:1").osis()).toEqual("Matt.1.1")
		`
		true
describe "Localized book Mark (kjp)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: Mark (kjp)", ->
		`
		expect(p.parse("မၫကၧၭ 1:1").osis()).toEqual("Mark.1.1")
		expect(p.parse("Mark 1:1").osis()).toEqual("Mark.1.1")
		expect(p.parse("မၫ 1:1").osis()).toEqual("Mark.1.1")
		p.include_apocrypha(false)
		expect(p.parse("မၫကၧၭ 1:1").osis()).toEqual("Mark.1.1")
		expect(p.parse("MARK 1:1").osis()).toEqual("Mark.1.1")
		expect(p.parse("မၫ 1:1").osis()).toEqual("Mark.1.1")
		`
		true
describe "Localized book Luke (kjp)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: Luke (kjp)", ->
		`
		expect(p.parse("Luke 1:1").osis()).toEqual("Luke.1.1")
		expect(p.parse("လုကၭ 1:1").osis()).toEqual("Luke.1.1")
		expect(p.parse("လု 1:1").osis()).toEqual("Luke.1.1")
		p.include_apocrypha(false)
		expect(p.parse("LUKE 1:1").osis()).toEqual("Luke.1.1")
		expect(p.parse("လုကၭ 1:1").osis()).toEqual("Luke.1.1")
		expect(p.parse("လု 1:1").osis()).toEqual("Luke.1.1")
		`
		true
describe "Localized book 1John (kjp)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: 1John (kjp)", ->
		`
		expect(p.parse("1 ယီဟၫ့ 1:1").osis()).toEqual("1John.1.1")
		expect(p.parse("၁ ယီဟၫ့ 1:1").osis()).toEqual("1John.1.1")
		expect(p.parse("1John 1:1").osis()).toEqual("1John.1.1")
		expect(p.parse("1 ယီ 1:1").osis()).toEqual("1John.1.1")
		expect(p.parse("၁ ယီ 1:1").osis()).toEqual("1John.1.1")
		`
		true
	it "should handle non-Latin digits in book: 1John (kjp)", ->
		p.set_options non_latin_digits_strategy: "replace"
		`
		expect(p.parse("1 ယီဟၫ့ 1:1").osis()).toEqual("1John.1.1")
		expect(p.parse("၁ ယီဟၫ့ 1:1").osis()).toEqual("1John.1.1")
		expect(p.parse("1John 1:1").osis()).toEqual("1John.1.1")
		expect(p.parse("1 ယီ 1:1").osis()).toEqual("1John.1.1")
		expect(p.parse("၁ ယီ 1:1").osis()).toEqual("1John.1.1")
		p.include_apocrypha(false)
		expect(p.parse("1 ယီဟၫ့ 1:1").osis()).toEqual("1John.1.1")
		expect(p.parse("၁ ယီဟၫ့ 1:1").osis()).toEqual("1John.1.1")
		expect(p.parse("1JOHN 1:1").osis()).toEqual("1John.1.1")
		expect(p.parse("1 ယီ 1:1").osis()).toEqual("1John.1.1")
		expect(p.parse("၁ ယီ 1:1").osis()).toEqual("1John.1.1")
		`
		true
describe "Localized book 2John (kjp)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: 2John (kjp)", ->
		`
		expect(p.parse("2 ယီဟၫ့ 1:1").osis()).toEqual("2John.1.1")
		expect(p.parse("၂ ယီဟၫ့ 1:1").osis()).toEqual("2John.1.1")
		expect(p.parse("2John 1:1").osis()).toEqual("2John.1.1")
		expect(p.parse("2 ယီ 1:1").osis()).toEqual("2John.1.1")
		expect(p.parse("၂ ယီ 1:1").osis()).toEqual("2John.1.1")
		`
		true
	it "should handle non-Latin digits in book: 2John (kjp)", ->
		p.set_options non_latin_digits_strategy: "replace"
		`
		expect(p.parse("2 ယီဟၫ့ 1:1").osis()).toEqual("2John.1.1")
		expect(p.parse("၂ ယီဟၫ့ 1:1").osis()).toEqual("2John.1.1")
		expect(p.parse("2John 1:1").osis()).toEqual("2John.1.1")
		expect(p.parse("2 ယီ 1:1").osis()).toEqual("2John.1.1")
		expect(p.parse("၂ ယီ 1:1").osis()).toEqual("2John.1.1")
		p.include_apocrypha(false)
		expect(p.parse("2 ယီဟၫ့ 1:1").osis()).toEqual("2John.1.1")
		expect(p.parse("၂ ယီဟၫ့ 1:1").osis()).toEqual("2John.1.1")
		expect(p.parse("2JOHN 1:1").osis()).toEqual("2John.1.1")
		expect(p.parse("2 ယီ 1:1").osis()).toEqual("2John.1.1")
		expect(p.parse("၂ ယီ 1:1").osis()).toEqual("2John.1.1")
		`
		true
describe "Localized book 3John (kjp)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: 3John (kjp)", ->
		`
		expect(p.parse("3 ယီဟၫ့ 1:1").osis()).toEqual("3John.1.1")
		expect(p.parse("၃ ယီဟၫ့ 1:1").osis()).toEqual("3John.1.1")
		expect(p.parse("3John 1:1").osis()).toEqual("3John.1.1")
		expect(p.parse("3 ယီ 1:1").osis()).toEqual("3John.1.1")
		expect(p.parse("၃ ယီ 1:1").osis()).toEqual("3John.1.1")
		`
		true
	it "should handle non-Latin digits in book: 3John (kjp)", ->
		p.set_options non_latin_digits_strategy: "replace"
		`
		expect(p.parse("3 ယီဟၫ့ 1:1").osis()).toEqual("3John.1.1")
		expect(p.parse("၃ ယီဟၫ့ 1:1").osis()).toEqual("3John.1.1")
		expect(p.parse("3John 1:1").osis()).toEqual("3John.1.1")
		expect(p.parse("3 ယီ 1:1").osis()).toEqual("3John.1.1")
		expect(p.parse("၃ ယီ 1:1").osis()).toEqual("3John.1.1")
		p.include_apocrypha(false)
		expect(p.parse("3 ယီဟၫ့ 1:1").osis()).toEqual("3John.1.1")
		expect(p.parse("၃ ယီဟၫ့ 1:1").osis()).toEqual("3John.1.1")
		expect(p.parse("3JOHN 1:1").osis()).toEqual("3John.1.1")
		expect(p.parse("3 ယီ 1:1").osis()).toEqual("3John.1.1")
		expect(p.parse("၃ ယီ 1:1").osis()).toEqual("3John.1.1")
		`
		true
describe "Localized book John (kjp)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: John (kjp)", ->
		`
		expect(p.parse("ယီဟၫ့ 1:1").osis()).toEqual("John.1.1")
		expect(p.parse("John 1:1").osis()).toEqual("John.1.1")
		expect(p.parse("ယီ 1:1").osis()).toEqual("John.1.1")
		p.include_apocrypha(false)
		expect(p.parse("ယီဟၫ့ 1:1").osis()).toEqual("John.1.1")
		expect(p.parse("JOHN 1:1").osis()).toEqual("John.1.1")
		expect(p.parse("ယီ 1:1").osis()).toEqual("John.1.1")
		`
		true
describe "Localized book Acts (kjp)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: Acts (kjp)", ->
		`
		expect(p.parse("Acts 1:1").osis()).toEqual("Acts.1.1")
		expect(p.parse("ၦဆၧ 1:1").osis()).toEqual("Acts.1.1")
		expect(p.parse("ဆၧ 1:1").osis()).toEqual("Acts.1.1")
		p.include_apocrypha(false)
		expect(p.parse("ACTS 1:1").osis()).toEqual("Acts.1.1")
		expect(p.parse("ၦဆၧ 1:1").osis()).toEqual("Acts.1.1")
		expect(p.parse("ဆၧ 1:1").osis()).toEqual("Acts.1.1")
		`
		true
describe "Localized book Rom (kjp)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: Rom (kjp)", ->
		`
		expect(p.parse("ရိမၫ 1:1").osis()).toEqual("Rom.1.1")
		expect(p.parse("Rom 1:1").osis()).toEqual("Rom.1.1")
		expect(p.parse("ရိ 1:1").osis()).toEqual("Rom.1.1")
		p.include_apocrypha(false)
		expect(p.parse("ရိမၫ 1:1").osis()).toEqual("Rom.1.1")
		expect(p.parse("ROM 1:1").osis()).toEqual("Rom.1.1")
		expect(p.parse("ရိ 1:1").osis()).toEqual("Rom.1.1")
		`
		true
describe "Localized book 2Cor (kjp)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: 2Cor (kjp)", ->
		`
		expect(p.parse("2 ကီရံၫ့ 1:1").osis()).toEqual("2Cor.1.1")
		expect(p.parse("၂ ကီရံၫ့ 1:1").osis()).toEqual("2Cor.1.1")
		expect(p.parse("2 ကီ 1:1").osis()).toEqual("2Cor.1.1")
		expect(p.parse("2Cor 1:1").osis()).toEqual("2Cor.1.1")
		expect(p.parse("၂ ကီ 1:1").osis()).toEqual("2Cor.1.1")
		`
		true
	it "should handle non-Latin digits in book: 2Cor (kjp)", ->
		p.set_options non_latin_digits_strategy: "replace"
		`
		expect(p.parse("2 ကီရံၫ့ 1:1").osis()).toEqual("2Cor.1.1")
		expect(p.parse("၂ ကီရံၫ့ 1:1").osis()).toEqual("2Cor.1.1")
		expect(p.parse("2 ကီ 1:1").osis()).toEqual("2Cor.1.1")
		expect(p.parse("2Cor 1:1").osis()).toEqual("2Cor.1.1")
		expect(p.parse("၂ ကီ 1:1").osis()).toEqual("2Cor.1.1")
		p.include_apocrypha(false)
		expect(p.parse("2 ကီရံၫ့ 1:1").osis()).toEqual("2Cor.1.1")
		expect(p.parse("၂ ကီရံၫ့ 1:1").osis()).toEqual("2Cor.1.1")
		expect(p.parse("2 ကီ 1:1").osis()).toEqual("2Cor.1.1")
		expect(p.parse("2COR 1:1").osis()).toEqual("2Cor.1.1")
		expect(p.parse("၂ ကီ 1:1").osis()).toEqual("2Cor.1.1")
		`
		true
describe "Localized book 1Cor (kjp)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: 1Cor (kjp)", ->
		`
		expect(p.parse("1 ကီရံၫ့ 1:1").osis()).toEqual("1Cor.1.1")
		expect(p.parse("၁ ကီရံၫ့ 1:1").osis()).toEqual("1Cor.1.1")
		expect(p.parse("1 ကီ 1:1").osis()).toEqual("1Cor.1.1")
		expect(p.parse("1Cor 1:1").osis()).toEqual("1Cor.1.1")
		expect(p.parse("၁ ကီ 1:1").osis()).toEqual("1Cor.1.1")
		`
		true
	it "should handle non-Latin digits in book: 1Cor (kjp)", ->
		p.set_options non_latin_digits_strategy: "replace"
		`
		expect(p.parse("1 ကီရံၫ့ 1:1").osis()).toEqual("1Cor.1.1")
		expect(p.parse("၁ ကီရံၫ့ 1:1").osis()).toEqual("1Cor.1.1")
		expect(p.parse("1 ကီ 1:1").osis()).toEqual("1Cor.1.1")
		expect(p.parse("1Cor 1:1").osis()).toEqual("1Cor.1.1")
		expect(p.parse("၁ ကီ 1:1").osis()).toEqual("1Cor.1.1")
		p.include_apocrypha(false)
		expect(p.parse("1 ကီရံၫ့ 1:1").osis()).toEqual("1Cor.1.1")
		expect(p.parse("၁ ကီရံၫ့ 1:1").osis()).toEqual("1Cor.1.1")
		expect(p.parse("1 ကီ 1:1").osis()).toEqual("1Cor.1.1")
		expect(p.parse("1COR 1:1").osis()).toEqual("1Cor.1.1")
		expect(p.parse("၁ ကီ 1:1").osis()).toEqual("1Cor.1.1")
		`
		true
describe "Localized book Gal (kjp)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: Gal (kjp)", ->
		`
		expect(p.parse("ဂလ့ၡၫ 1:1").osis()).toEqual("Gal.1.1")
		expect(p.parse("Gal 1:1").osis()).toEqual("Gal.1.1")
		expect(p.parse("လ့ 1:1").osis()).toEqual("Gal.1.1")
		p.include_apocrypha(false)
		expect(p.parse("ဂလ့ၡၫ 1:1").osis()).toEqual("Gal.1.1")
		expect(p.parse("GAL 1:1").osis()).toEqual("Gal.1.1")
		expect(p.parse("လ့ 1:1").osis()).toEqual("Gal.1.1")
		`
		true
describe "Localized book Eph (kjp)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: Eph (kjp)", ->
		`
		expect(p.parse("အ့ဖစၧၭ 1:1").osis()).toEqual("Eph.1.1")
		expect(p.parse("Eph 1:1").osis()).toEqual("Eph.1.1")
		expect(p.parse("အ့ 1:1").osis()).toEqual("Eph.1.1")
		p.include_apocrypha(false)
		expect(p.parse("အ့ဖစၧၭ 1:1").osis()).toEqual("Eph.1.1")
		expect(p.parse("EPH 1:1").osis()).toEqual("Eph.1.1")
		expect(p.parse("အ့ 1:1").osis()).toEqual("Eph.1.1")
		`
		true
describe "Localized book Phil (kjp)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: Phil (kjp)", ->
		`
		expect(p.parse("ဖလံဖံၫ 1:1").osis()).toEqual("Phil.1.1")
		expect(p.parse("Phil 1:1").osis()).toEqual("Phil.1.1")
		expect(p.parse("ဖံၫ 1:1").osis()).toEqual("Phil.1.1")
		p.include_apocrypha(false)
		expect(p.parse("ဖလံဖံၫ 1:1").osis()).toEqual("Phil.1.1")
		expect(p.parse("PHIL 1:1").osis()).toEqual("Phil.1.1")
		expect(p.parse("ဖံၫ 1:1").osis()).toEqual("Phil.1.1")
		`
		true
describe "Localized book Col (kjp)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: Col (kjp)", ->
		`
		expect(p.parse("ကလီစံၫ 1:1").osis()).toEqual("Col.1.1")
		expect(p.parse("Col 1:1").osis()).toEqual("Col.1.1")
		expect(p.parse("လီ 1:1").osis()).toEqual("Col.1.1")
		p.include_apocrypha(false)
		expect(p.parse("ကလီစံၫ 1:1").osis()).toEqual("Col.1.1")
		expect(p.parse("COL 1:1").osis()).toEqual("Col.1.1")
		expect(p.parse("လီ 1:1").osis()).toEqual("Col.1.1")
		`
		true
describe "Localized book 2Thess (kjp)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: 2Thess (kjp)", ->
		`
		expect(p.parse("2 ၥ့ၭစလနဲကၫ 1:1").osis()).toEqual("2Thess.1.1")
		expect(p.parse("၂ ၥ့ၭစလနဲကၫ 1:1").osis()).toEqual("2Thess.1.1")
		expect(p.parse("2Thess 1:1").osis()).toEqual("2Thess.1.1")
		expect(p.parse("2 ၥ့ၭ 1:1").osis()).toEqual("2Thess.1.1")
		expect(p.parse("၂ ၥ့ၭ 1:1").osis()).toEqual("2Thess.1.1")
		`
		true
	it "should handle non-Latin digits in book: 2Thess (kjp)", ->
		p.set_options non_latin_digits_strategy: "replace"
		`
		expect(p.parse("2 ၥ့ၭစလနဲကၫ 1:1").osis()).toEqual("2Thess.1.1")
		expect(p.parse("၂ ၥ့ၭစလနဲကၫ 1:1").osis()).toEqual("2Thess.1.1")
		expect(p.parse("2Thess 1:1").osis()).toEqual("2Thess.1.1")
		expect(p.parse("2 ၥ့ၭ 1:1").osis()).toEqual("2Thess.1.1")
		expect(p.parse("၂ ၥ့ၭ 1:1").osis()).toEqual("2Thess.1.1")
		p.include_apocrypha(false)
		expect(p.parse("2 ၥ့ၭစလနဲကၫ 1:1").osis()).toEqual("2Thess.1.1")
		expect(p.parse("၂ ၥ့ၭစလနဲကၫ 1:1").osis()).toEqual("2Thess.1.1")
		expect(p.parse("2THESS 1:1").osis()).toEqual("2Thess.1.1")
		expect(p.parse("2 ၥ့ၭ 1:1").osis()).toEqual("2Thess.1.1")
		expect(p.parse("၂ ၥ့ၭ 1:1").osis()).toEqual("2Thess.1.1")
		`
		true
describe "Localized book 1Thess (kjp)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: 1Thess (kjp)", ->
		`
		expect(p.parse("1 ၥ့ၭစလနဲကၫ 1:1").osis()).toEqual("1Thess.1.1")
		expect(p.parse("၁ ၥ့ၭစလနဲကၫ 1:1").osis()).toEqual("1Thess.1.1")
		expect(p.parse("1Thess 1:1").osis()).toEqual("1Thess.1.1")
		expect(p.parse("1 ၥ့ၭ 1:1").osis()).toEqual("1Thess.1.1")
		expect(p.parse("၁ ၥ့ၭ 1:1").osis()).toEqual("1Thess.1.1")
		`
		true
	it "should handle non-Latin digits in book: 1Thess (kjp)", ->
		p.set_options non_latin_digits_strategy: "replace"
		`
		expect(p.parse("1 ၥ့ၭစလနဲကၫ 1:1").osis()).toEqual("1Thess.1.1")
		expect(p.parse("၁ ၥ့ၭစလနဲကၫ 1:1").osis()).toEqual("1Thess.1.1")
		expect(p.parse("1Thess 1:1").osis()).toEqual("1Thess.1.1")
		expect(p.parse("1 ၥ့ၭ 1:1").osis()).toEqual("1Thess.1.1")
		expect(p.parse("၁ ၥ့ၭ 1:1").osis()).toEqual("1Thess.1.1")
		p.include_apocrypha(false)
		expect(p.parse("1 ၥ့ၭစလနဲကၫ 1:1").osis()).toEqual("1Thess.1.1")
		expect(p.parse("၁ ၥ့ၭစလနဲကၫ 1:1").osis()).toEqual("1Thess.1.1")
		expect(p.parse("1THESS 1:1").osis()).toEqual("1Thess.1.1")
		expect(p.parse("1 ၥ့ၭ 1:1").osis()).toEqual("1Thess.1.1")
		expect(p.parse("၁ ၥ့ၭ 1:1").osis()).toEqual("1Thess.1.1")
		`
		true
describe "Localized book 2Tim (kjp)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: 2Tim (kjp)", ->
		`
		expect(p.parse("2 ထံမၥံၫ 1:1").osis()).toEqual("2Tim.1.1")
		expect(p.parse("၂ ထံမၥံၫ 1:1").osis()).toEqual("2Tim.1.1")
		expect(p.parse("2 ထံ 1:1").osis()).toEqual("2Tim.1.1")
		expect(p.parse("2Tim 1:1").osis()).toEqual("2Tim.1.1")
		expect(p.parse("၂ ထံ 1:1").osis()).toEqual("2Tim.1.1")
		`
		true
	it "should handle non-Latin digits in book: 2Tim (kjp)", ->
		p.set_options non_latin_digits_strategy: "replace"
		`
		expect(p.parse("2 ထံမၥံၫ 1:1").osis()).toEqual("2Tim.1.1")
		expect(p.parse("၂ ထံမၥံၫ 1:1").osis()).toEqual("2Tim.1.1")
		expect(p.parse("2 ထံ 1:1").osis()).toEqual("2Tim.1.1")
		expect(p.parse("2Tim 1:1").osis()).toEqual("2Tim.1.1")
		expect(p.parse("၂ ထံ 1:1").osis()).toEqual("2Tim.1.1")
		p.include_apocrypha(false)
		expect(p.parse("2 ထံမၥံၫ 1:1").osis()).toEqual("2Tim.1.1")
		expect(p.parse("၂ ထံမၥံၫ 1:1").osis()).toEqual("2Tim.1.1")
		expect(p.parse("2 ထံ 1:1").osis()).toEqual("2Tim.1.1")
		expect(p.parse("2TIM 1:1").osis()).toEqual("2Tim.1.1")
		expect(p.parse("၂ ထံ 1:1").osis()).toEqual("2Tim.1.1")
		`
		true
describe "Localized book 1Tim (kjp)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: 1Tim (kjp)", ->
		`
		expect(p.parse("1 ထံမၥံၫ 1:1").osis()).toEqual("1Tim.1.1")
		expect(p.parse("၁ ထံမၥံၫ 1:1").osis()).toEqual("1Tim.1.1")
		expect(p.parse("1 ထံ 1:1").osis()).toEqual("1Tim.1.1")
		expect(p.parse("1Tim 1:1").osis()).toEqual("1Tim.1.1")
		expect(p.parse("၁ ထံ 1:1").osis()).toEqual("1Tim.1.1")
		`
		true
	it "should handle non-Latin digits in book: 1Tim (kjp)", ->
		p.set_options non_latin_digits_strategy: "replace"
		`
		expect(p.parse("1 ထံမၥံၫ 1:1").osis()).toEqual("1Tim.1.1")
		expect(p.parse("၁ ထံမၥံၫ 1:1").osis()).toEqual("1Tim.1.1")
		expect(p.parse("1 ထံ 1:1").osis()).toEqual("1Tim.1.1")
		expect(p.parse("1Tim 1:1").osis()).toEqual("1Tim.1.1")
		expect(p.parse("၁ ထံ 1:1").osis()).toEqual("1Tim.1.1")
		p.include_apocrypha(false)
		expect(p.parse("1 ထံမၥံၫ 1:1").osis()).toEqual("1Tim.1.1")
		expect(p.parse("၁ ထံမၥံၫ 1:1").osis()).toEqual("1Tim.1.1")
		expect(p.parse("1 ထံ 1:1").osis()).toEqual("1Tim.1.1")
		expect(p.parse("1TIM 1:1").osis()).toEqual("1Tim.1.1")
		expect(p.parse("၁ ထံ 1:1").osis()).toEqual("1Tim.1.1")
		`
		true
describe "Localized book Titus (kjp)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: Titus (kjp)", ->
		`
		expect(p.parse("Titus 1:1").osis()).toEqual("Titus.1.1")
		expect(p.parse("တဲတၧၭ 1:1").osis()).toEqual("Titus.1.1")
		expect(p.parse("တဲ 1:1").osis()).toEqual("Titus.1.1")
		p.include_apocrypha(false)
		expect(p.parse("TITUS 1:1").osis()).toEqual("Titus.1.1")
		expect(p.parse("တဲတၧၭ 1:1").osis()).toEqual("Titus.1.1")
		expect(p.parse("တဲ 1:1").osis()).toEqual("Titus.1.1")
		`
		true
describe "Localized book Phlm (kjp)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: Phlm (kjp)", ->
		`
		expect(p.parse("ဖလံမၧၫ့ 1:1").osis()).toEqual("Phlm.1.1")
		expect(p.parse("လံမၧၫ့ 1:1").osis()).toEqual("Phlm.1.1")
		expect(p.parse("Phlm 1:1").osis()).toEqual("Phlm.1.1")
		p.include_apocrypha(false)
		expect(p.parse("ဖလံမၧၫ့ 1:1").osis()).toEqual("Phlm.1.1")
		expect(p.parse("လံမၧၫ့ 1:1").osis()).toEqual("Phlm.1.1")
		expect(p.parse("PHLM 1:1").osis()).toEqual("Phlm.1.1")
		`
		true
describe "Localized book Heb (kjp)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: Heb (kjp)", ->
		`
		expect(p.parse("ဟံဘြႃၫ 1:1").osis()).toEqual("Heb.1.1")
		expect(p.parse("Heb 1:1").osis()).toEqual("Heb.1.1")
		expect(p.parse("ဟံ 1:1").osis()).toEqual("Heb.1.1")
		p.include_apocrypha(false)
		expect(p.parse("ဟံဘြႃၫ 1:1").osis()).toEqual("Heb.1.1")
		expect(p.parse("HEB 1:1").osis()).toEqual("Heb.1.1")
		expect(p.parse("ဟံ 1:1").osis()).toEqual("Heb.1.1")
		`
		true
describe "Localized book Jas (kjp)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: Jas (kjp)", ->
		`
		expect(p.parse("ယ့မံၭ 1:1").osis()).toEqual("Jas.1.1")
		expect(p.parse("Jas 1:1").osis()).toEqual("Jas.1.1")
		expect(p.parse("ယ့ 1:1").osis()).toEqual("Jas.1.1")
		p.include_apocrypha(false)
		expect(p.parse("ယ့မံၭ 1:1").osis()).toEqual("Jas.1.1")
		expect(p.parse("JAS 1:1").osis()).toEqual("Jas.1.1")
		expect(p.parse("ယ့ 1:1").osis()).toEqual("Jas.1.1")
		`
		true
describe "Localized book 2Pet (kjp)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: 2Pet (kjp)", ->
		`
		expect(p.parse("2 ပံတၧၫ 1:1").osis()).toEqual("2Pet.1.1")
		expect(p.parse("၂ ပံတၧၫ 1:1").osis()).toEqual("2Pet.1.1")
		expect(p.parse("2 ပံ 1:1").osis()).toEqual("2Pet.1.1")
		expect(p.parse("2Pet 1:1").osis()).toEqual("2Pet.1.1")
		expect(p.parse("၂ ပံ 1:1").osis()).toEqual("2Pet.1.1")
		`
		true
	it "should handle non-Latin digits in book: 2Pet (kjp)", ->
		p.set_options non_latin_digits_strategy: "replace"
		`
		expect(p.parse("2 ပံတၧၫ 1:1").osis()).toEqual("2Pet.1.1")
		expect(p.parse("၂ ပံတၧၫ 1:1").osis()).toEqual("2Pet.1.1")
		expect(p.parse("2 ပံ 1:1").osis()).toEqual("2Pet.1.1")
		expect(p.parse("2Pet 1:1").osis()).toEqual("2Pet.1.1")
		expect(p.parse("၂ ပံ 1:1").osis()).toEqual("2Pet.1.1")
		p.include_apocrypha(false)
		expect(p.parse("2 ပံတၧၫ 1:1").osis()).toEqual("2Pet.1.1")
		expect(p.parse("၂ ပံတၧၫ 1:1").osis()).toEqual("2Pet.1.1")
		expect(p.parse("2 ပံ 1:1").osis()).toEqual("2Pet.1.1")
		expect(p.parse("2PET 1:1").osis()).toEqual("2Pet.1.1")
		expect(p.parse("၂ ပံ 1:1").osis()).toEqual("2Pet.1.1")
		`
		true
describe "Localized book 1Pet (kjp)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: 1Pet (kjp)", ->
		`
		expect(p.parse("1 ပံတၧၫ 1:1").osis()).toEqual("1Pet.1.1")
		expect(p.parse("၁ ပံတၧၫ 1:1").osis()).toEqual("1Pet.1.1")
		expect(p.parse("1 ပံ 1:1").osis()).toEqual("1Pet.1.1")
		expect(p.parse("1Pet 1:1").osis()).toEqual("1Pet.1.1")
		expect(p.parse("၁ ပံ 1:1").osis()).toEqual("1Pet.1.1")
		`
		true
	it "should handle non-Latin digits in book: 1Pet (kjp)", ->
		p.set_options non_latin_digits_strategy: "replace"
		`
		expect(p.parse("1 ပံတၧၫ 1:1").osis()).toEqual("1Pet.1.1")
		expect(p.parse("၁ ပံတၧၫ 1:1").osis()).toEqual("1Pet.1.1")
		expect(p.parse("1 ပံ 1:1").osis()).toEqual("1Pet.1.1")
		expect(p.parse("1Pet 1:1").osis()).toEqual("1Pet.1.1")
		expect(p.parse("၁ ပံ 1:1").osis()).toEqual("1Pet.1.1")
		p.include_apocrypha(false)
		expect(p.parse("1 ပံတၧၫ 1:1").osis()).toEqual("1Pet.1.1")
		expect(p.parse("၁ ပံတၧၫ 1:1").osis()).toEqual("1Pet.1.1")
		expect(p.parse("1 ပံ 1:1").osis()).toEqual("1Pet.1.1")
		expect(p.parse("1PET 1:1").osis()).toEqual("1Pet.1.1")
		expect(p.parse("၁ ပံ 1:1").osis()).toEqual("1Pet.1.1")
		`
		true
describe "Localized book Jude (kjp)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: Jude (kjp)", ->
		`
		expect(p.parse("Jude 1:1").osis()).toEqual("Jude.1.1")
		expect(p.parse("ယုဒၭ 1:1").osis()).toEqual("Jude.1.1")
		expect(p.parse("ဒၭ 1:1").osis()).toEqual("Jude.1.1")
		p.include_apocrypha(false)
		expect(p.parse("JUDE 1:1").osis()).toEqual("Jude.1.1")
		expect(p.parse("ယုဒၭ 1:1").osis()).toEqual("Jude.1.1")
		expect(p.parse("ဒၭ 1:1").osis()).toEqual("Jude.1.1")
		`
		true
describe "Localized book Tob (kjp)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: Tob (kjp)", ->
		`
		expect(p.parse("Tob 1:1").osis()).toEqual("Tob.1.1")
		`
		true
describe "Localized book Jdt (kjp)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: Jdt (kjp)", ->
		`
		expect(p.parse("Jdt 1:1").osis()).toEqual("Jdt.1.1")
		`
		true
describe "Localized book Bar (kjp)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: Bar (kjp)", ->
		`
		expect(p.parse("Bar 1:1").osis()).toEqual("Bar.1.1")
		`
		true
describe "Localized book Sus (kjp)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: Sus (kjp)", ->
		`
		expect(p.parse("Sus 1:1").osis()).toEqual("Sus.1.1")
		`
		true
describe "Localized book 2Macc (kjp)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: 2Macc (kjp)", ->
		`
		expect(p.parse("2Macc 1:1").osis()).toEqual("2Macc.1.1")
		`
		true
describe "Localized book 3Macc (kjp)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: 3Macc (kjp)", ->
		`
		expect(p.parse("3Macc 1:1").osis()).toEqual("3Macc.1.1")
		`
		true
describe "Localized book 4Macc (kjp)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: 4Macc (kjp)", ->
		`
		expect(p.parse("4Macc 1:1").osis()).toEqual("4Macc.1.1")
		`
		true
describe "Localized book 1Macc (kjp)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: 1Macc (kjp)", ->
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
		expect(p.languages).toEqual ["kjp"]

	it "should handle ranges (kjp)", ->
		expect(p.parse("Titus 1:1 - 2").osis()).toEqual "Titus.1.1-Titus.1.2"
		expect(p.parse("Matt 1-2").osis()).toEqual "Matt.1-Matt.2"
		expect(p.parse("Phlm 2 - 3").osis()).toEqual "Phlm.1.2-Phlm.1.3"
	it "should handle chapters (kjp)", ->
		expect(p.parse("Titus 1:1, တၢ်မၤလိ 2").osis()).toEqual "Titus.1.1,Titus.2"
		expect(p.parse("Matt 3:4 တၢ်မၤလိ 6").osis()).toEqual "Matt.3.4,Matt.6"
	it "should handle verses (kjp)", ->
		expect(p.parse("Exod 1:1 အဆၢ 3").osis()).toEqual "Exod.1.1,Exod.1.3"
		expect(p.parse("Phlm အဆၢ 6").osis()).toEqual "Phlm.1.6"
		expect(p.parse("Exod 1:1 း 3").osis()).toEqual "Exod.1.1,Exod.1.3"
		expect(p.parse("Phlm း 6").osis()).toEqual "Phlm.1.6"
	it "should handle 'and' (kjp)", ->
		expect(p.parse("Exod 1:1 and 3").osis()).toEqual "Exod.1.1,Exod.1.3"
		expect(p.parse("Phlm 2 AND 6").osis()).toEqual "Phlm.1.2,Phlm.1.6"
	it "should handle titles (kjp)", ->
		expect(p.parse("Ps 3 kjp, 4:2, 5:kjp").osis()).toEqual "Ps.3.1,Ps.4.2,Ps.5.1"
		expect(p.parse("PS 3 KJP, 4:2, 5:KJP").osis()).toEqual "Ps.3.1,Ps.4.2,Ps.5.1"
	it "should handle 'ff' (kjp)", ->
		expect(p.parse("Rev 3ff, 4:2ff").osis()).toEqual "Rev.3-Rev.22,Rev.4.2-Rev.4.11"
		expect(p.parse("REV 3 FF, 4:2 FF").osis()).toEqual "Rev.3-Rev.22,Rev.4.2-Rev.4.11"
	it "should handle translations (kjp)", ->
		expect(p.parse("Lev 1 (pwokyn)").osis_and_translations()).toEqual [["Lev.1", "pwokyn"]]
		expect(p.parse("lev 1 pwokyn").osis_and_translations()).toEqual [["Lev.1", "pwokyn"]]
	it "should handle boundaries (kjp)", ->
		p.set_options {book_alone_strategy: "full"}
		expect(p.parse("\u2014Matt\u2014").osis()).toEqual "Matt.1-Matt.28"
		expect(p.parse("\u201cMatt 1:1\u201d").osis()).toEqual "Matt.1.1"
