bcv_parser = require("../../js/km_bcv_parser.js").bcv_parser

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

describe "Localized book Gen (km)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: Gen (km)", ->
		`
		expect(p.parse("ខគម្ពីរលោកុប្បត្តិ 1:1").osis()).toEqual("Gen.1.1")
		expect(p.parse("លោកុប្បត្តិ 1:1").osis()).toEqual("Gen.1.1")
		expect(p.parse("Gen 1:1").osis()).toEqual("Gen.1.1")
		p.include_apocrypha(false)
		expect(p.parse("ខគម្ពីរលោកុប្បត្តិ 1:1").osis()).toEqual("Gen.1.1")
		expect(p.parse("លោកុប្បត្តិ 1:1").osis()).toEqual("Gen.1.1")
		expect(p.parse("GEN 1:1").osis()).toEqual("Gen.1.1")
		`
		true
describe "Localized book Exod (km)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: Exod (km)", ->
		`
		expect(p.parse("និក្ខមនំ 1:1").osis()).toEqual("Exod.1.1")
		expect(p.parse("Exod 1:1").osis()).toEqual("Exod.1.1")
		p.include_apocrypha(false)
		expect(p.parse("និក្ខមនំ 1:1").osis()).toEqual("Exod.1.1")
		expect(p.parse("EXOD 1:1").osis()).toEqual("Exod.1.1")
		`
		true
describe "Localized book Bel (km)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: Bel (km)", ->
		`
		expect(p.parse("Bel 1:1").osis()).toEqual("Bel.1.1")
		`
		true
describe "Localized book Lev (km)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: Lev (km)", ->
		`
		expect(p.parse("សូមអានលេវីវិន័យ 1:1").osis()).toEqual("Lev.1.1")
		expect(p.parse("លេវីវិន័យ 1:1").osis()).toEqual("Lev.1.1")
		expect(p.parse("Lev 1:1").osis()).toEqual("Lev.1.1")
		p.include_apocrypha(false)
		expect(p.parse("សូមអានលេវីវិន័យ 1:1").osis()).toEqual("Lev.1.1")
		expect(p.parse("លេវីវិន័យ 1:1").osis()).toEqual("Lev.1.1")
		expect(p.parse("LEV 1:1").osis()).toEqual("Lev.1.1")
		`
		true
describe "Localized book Num (km)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: Num (km)", ->
		`
		expect(p.parse("ជនគណនា 1:1").osis()).toEqual("Num.1.1")
		expect(p.parse("Num 1:1").osis()).toEqual("Num.1.1")
		p.include_apocrypha(false)
		expect(p.parse("ជនគណនា 1:1").osis()).toEqual("Num.1.1")
		expect(p.parse("NUM 1:1").osis()).toEqual("Num.1.1")
		`
		true
describe "Localized book Sir (km)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: Sir (km)", ->
		`
		expect(p.parse("Sir 1:1").osis()).toEqual("Sir.1.1")
		`
		true
describe "Localized book Wis (km)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: Wis (km)", ->
		`
		expect(p.parse("Wis 1:1").osis()).toEqual("Wis.1.1")
		`
		true
describe "Localized book Lam (km)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: Lam (km)", ->
		`
		expect(p.parse("បរិទេវ 1:1").osis()).toEqual("Lam.1.1")
		expect(p.parse("Lam 1:1").osis()).toEqual("Lam.1.1")
		p.include_apocrypha(false)
		expect(p.parse("បរិទេវ 1:1").osis()).toEqual("Lam.1.1")
		expect(p.parse("LAM 1:1").osis()).toEqual("Lam.1.1")
		`
		true
describe "Localized book EpJer (km)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: EpJer (km)", ->
		`
		expect(p.parse("EpJer 1:1").osis()).toEqual("EpJer.1.1")
		`
		true
describe "Localized book Rev (km)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: Rev (km)", ->
		`
		expect(p.parse("វិវរណៈ 1:1").osis()).toEqual("Rev.1.1")
		expect(p.parse("វិវរណ 1:1").osis()).toEqual("Rev.1.1")
		expect(p.parse("Rev 1:1").osis()).toEqual("Rev.1.1")
		p.include_apocrypha(false)
		expect(p.parse("វិវរណៈ 1:1").osis()).toEqual("Rev.1.1")
		expect(p.parse("វិវរណ 1:1").osis()).toEqual("Rev.1.1")
		expect(p.parse("REV 1:1").osis()).toEqual("Rev.1.1")
		`
		true
describe "Localized book PrMan (km)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: PrMan (km)", ->
		`
		expect(p.parse("PrMan 1:1").osis()).toEqual("PrMan.1.1")
		`
		true
describe "Localized book Deut (km)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: Deut (km)", ->
		`
		expect(p.parse("នចោទិយកថា 1:1").osis()).toEqual("Deut.1.1")
		expect(p.parse("ទុតិយកថា 1:1").osis()).toEqual("Deut.1.1")
		expect(p.parse("Deut 1:1").osis()).toEqual("Deut.1.1")
		p.include_apocrypha(false)
		expect(p.parse("នចោទិយកថា 1:1").osis()).toEqual("Deut.1.1")
		expect(p.parse("ទុតិយកថា 1:1").osis()).toEqual("Deut.1.1")
		expect(p.parse("DEUT 1:1").osis()).toEqual("Deut.1.1")
		`
		true
describe "Localized book Josh (km)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: Josh (km)", ->
		`
		expect(p.parse("យ៉ូស្វេ 1:1").osis()).toEqual("Josh.1.1")
		expect(p.parse("Josh 1:1").osis()).toEqual("Josh.1.1")
		p.include_apocrypha(false)
		expect(p.parse("យ៉ូស្វេ 1:1").osis()).toEqual("Josh.1.1")
		expect(p.parse("JOSH 1:1").osis()).toEqual("Josh.1.1")
		`
		true
describe "Localized book Judg (km)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: Judg (km)", ->
		`
		expect(p.parse("ចៅហ្វាយ 1:1").osis()).toEqual("Judg.1.1")
		expect(p.parse("Judg 1:1").osis()).toEqual("Judg.1.1")
		p.include_apocrypha(false)
		expect(p.parse("ចៅហ្វាយ 1:1").osis()).toEqual("Judg.1.1")
		expect(p.parse("JUDG 1:1").osis()).toEqual("Judg.1.1")
		`
		true
describe "Localized book Ruth (km)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: Ruth (km)", ->
		`
		expect(p.parse("នាងរស់ 1:1").osis()).toEqual("Ruth.1.1")
		expect(p.parse("Ruth 1:1").osis()).toEqual("Ruth.1.1")
		p.include_apocrypha(false)
		expect(p.parse("នាងរស់ 1:1").osis()).toEqual("Ruth.1.1")
		expect(p.parse("RUTH 1:1").osis()).toEqual("Ruth.1.1")
		`
		true
describe "Localized book 1Esd (km)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: 1Esd (km)", ->
		`
		expect(p.parse("1Esd 1:1").osis()).toEqual("1Esd.1.1")
		`
		true
describe "Localized book 2Esd (km)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: 2Esd (km)", ->
		`
		expect(p.parse("2Esd 1:1").osis()).toEqual("2Esd.1.1")
		`
		true
describe "Localized book Isa (km)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: Isa (km)", ->
		`
		expect(p.parse("អេសាយ 1:1").osis()).toEqual("Isa.1.1")
		expect(p.parse("Isa 1:1").osis()).toEqual("Isa.1.1")
		p.include_apocrypha(false)
		expect(p.parse("អេសាយ 1:1").osis()).toEqual("Isa.1.1")
		expect(p.parse("ISA 1:1").osis()).toEqual("Isa.1.1")
		`
		true
describe "Localized book 2Sam (km)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: 2Sam (km)", ->
		`
		expect(p.parse("2 សាំយូអែល 1:1").osis()).toEqual("2Sam.1.1")
		expect(p.parse("២ សាំយូអែល 1:1").osis()).toEqual("2Sam.1.1")
		expect(p.parse("2Sam 1:1").osis()).toEqual("2Sam.1.1")
		`
		true
	it "should handle non-Latin digits in book: 2Sam (km)", ->
		p.set_options non_latin_digits_strategy: "replace"
		`
		expect(p.parse("2 សាំយូអែល 1:1").osis()).toEqual("2Sam.1.1")
		expect(p.parse("២ សាំយូអែល 1:1").osis()).toEqual("2Sam.1.1")
		expect(p.parse("2Sam 1:1").osis()).toEqual("2Sam.1.1")
		p.include_apocrypha(false)
		expect(p.parse("2 សាំយូអែល 1:1").osis()).toEqual("2Sam.1.1")
		expect(p.parse("២ សាំយូអែល 1:1").osis()).toEqual("2Sam.1.1")
		expect(p.parse("2SAM 1:1").osis()).toEqual("2Sam.1.1")
		`
		true
describe "Localized book 1Sam (km)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: 1Sam (km)", ->
		`
		expect(p.parse("សាំយូអែលទី1 1:1").osis()).toEqual("1Sam.1.1")
		expect(p.parse("សាំយូអែលទី១ 1:1").osis()).toEqual("1Sam.1.1")
		expect(p.parse("1 សាំយូអែល 1:1").osis()).toEqual("1Sam.1.1")
		expect(p.parse("១ សាំយូអែល 1:1").osis()).toEqual("1Sam.1.1")
		expect(p.parse("1Sam 1:1").osis()).toEqual("1Sam.1.1")
		`
		true
	it "should handle non-Latin digits in book: 1Sam (km)", ->
		p.set_options non_latin_digits_strategy: "replace"
		`
		expect(p.parse("សាំយូអែលទី1 1:1").osis()).toEqual("1Sam.1.1")
		expect(p.parse("សាំយូអែលទី១ 1:1").osis()).toEqual("1Sam.1.1")
		expect(p.parse("1 សាំយូអែល 1:1").osis()).toEqual("1Sam.1.1")
		expect(p.parse("១ សាំយូអែល 1:1").osis()).toEqual("1Sam.1.1")
		expect(p.parse("1Sam 1:1").osis()).toEqual("1Sam.1.1")
		p.include_apocrypha(false)
		expect(p.parse("សាំយូអែលទី1 1:1").osis()).toEqual("1Sam.1.1")
		expect(p.parse("សាំយូអែលទី១ 1:1").osis()).toEqual("1Sam.1.1")
		expect(p.parse("1 សាំយូអែល 1:1").osis()).toEqual("1Sam.1.1")
		expect(p.parse("១ សាំយូអែល 1:1").osis()).toEqual("1Sam.1.1")
		expect(p.parse("1SAM 1:1").osis()).toEqual("1Sam.1.1")
		`
		true
describe "Localized book 2Kgs (km)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: 2Kgs (km)", ->
		`
		expect(p.parse("ពង្សាវតារក្សត្រទី2 1:1").osis()).toEqual("2Kgs.1.1")
		expect(p.parse("ពង្សាវតារក្សត្រទី២ 1:1").osis()).toEqual("2Kgs.1.1")
		expect(p.parse("2 ពង្សាវតារក្សត្រ 1:1").osis()).toEqual("2Kgs.1.1")
		expect(p.parse("២ ពង្សាវតារក្សត្រ 1:1").osis()).toEqual("2Kgs.1.1")
		expect(p.parse("រក្សត្រទី2 1:1").osis()).toEqual("2Kgs.1.1")
		expect(p.parse("រក្សត្រទី២ 1:1").osis()).toEqual("2Kgs.1.1")
		expect(p.parse("2Kgs 1:1").osis()).toEqual("2Kgs.1.1")
		`
		true
	it "should handle non-Latin digits in book: 2Kgs (km)", ->
		p.set_options non_latin_digits_strategy: "replace"
		`
		expect(p.parse("ពង្សាវតារក្សត្រទី2 1:1").osis()).toEqual("2Kgs.1.1")
		expect(p.parse("ពង្សាវតារក្សត្រទី២ 1:1").osis()).toEqual("2Kgs.1.1")
		expect(p.parse("2 ពង្សាវតារក្សត្រ 1:1").osis()).toEqual("2Kgs.1.1")
		expect(p.parse("២ ពង្សាវតារក្សត្រ 1:1").osis()).toEqual("2Kgs.1.1")
		expect(p.parse("រក្សត្រទី2 1:1").osis()).toEqual("2Kgs.1.1")
		expect(p.parse("រក្សត្រទី២ 1:1").osis()).toEqual("2Kgs.1.1")
		expect(p.parse("2Kgs 1:1").osis()).toEqual("2Kgs.1.1")
		p.include_apocrypha(false)
		expect(p.parse("ពង្សាវតារក្សត្រទី2 1:1").osis()).toEqual("2Kgs.1.1")
		expect(p.parse("ពង្សាវតារក្សត្រទី២ 1:1").osis()).toEqual("2Kgs.1.1")
		expect(p.parse("2 ពង្សាវតារក្សត្រ 1:1").osis()).toEqual("2Kgs.1.1")
		expect(p.parse("២ ពង្សាវតារក្សត្រ 1:1").osis()).toEqual("2Kgs.1.1")
		expect(p.parse("រក្សត្រទី2 1:1").osis()).toEqual("2Kgs.1.1")
		expect(p.parse("រក្សត្រទី២ 1:1").osis()).toEqual("2Kgs.1.1")
		expect(p.parse("2KGS 1:1").osis()).toEqual("2Kgs.1.1")
		`
		true
describe "Localized book 1Kgs (km)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: 1Kgs (km)", ->
		`
		expect(p.parse("1 ពង្សាវតារក្សត្រ 1:1").osis()).toEqual("1Kgs.1.1")
		expect(p.parse("ពង្សាវតាក្សត្រទី1 1:1").osis()).toEqual("1Kgs.1.1")
		expect(p.parse("ពង្សាវតាក្សត្រទី១ 1:1").osis()).toEqual("1Kgs.1.1")
		expect(p.parse("១ ពង្សាវតារក្សត្រ 1:1").osis()).toEqual("1Kgs.1.1")
		expect(p.parse("1Kgs 1:1").osis()).toEqual("1Kgs.1.1")
		`
		true
	it "should handle non-Latin digits in book: 1Kgs (km)", ->
		p.set_options non_latin_digits_strategy: "replace"
		`
		expect(p.parse("1 ពង្សាវតារក្សត្រ 1:1").osis()).toEqual("1Kgs.1.1")
		expect(p.parse("ពង្សាវតាក្សត្រទី1 1:1").osis()).toEqual("1Kgs.1.1")
		expect(p.parse("ពង្សាវតាក្សត្រទី១ 1:1").osis()).toEqual("1Kgs.1.1")
		expect(p.parse("១ ពង្សាវតារក្សត្រ 1:1").osis()).toEqual("1Kgs.1.1")
		expect(p.parse("1Kgs 1:1").osis()).toEqual("1Kgs.1.1")
		p.include_apocrypha(false)
		expect(p.parse("1 ពង្សាវតារក្សត្រ 1:1").osis()).toEqual("1Kgs.1.1")
		expect(p.parse("ពង្សាវតាក្សត្រទី1 1:1").osis()).toEqual("1Kgs.1.1")
		expect(p.parse("ពង្សាវតាក្សត្រទី១ 1:1").osis()).toEqual("1Kgs.1.1")
		expect(p.parse("១ ពង្សាវតារក្សត្រ 1:1").osis()).toEqual("1Kgs.1.1")
		expect(p.parse("1KGS 1:1").osis()).toEqual("1Kgs.1.1")
		`
		true
describe "Localized book 2Chr (km)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: 2Chr (km)", ->
		`
		expect(p.parse("2 របាក្សត្រ 1:1").osis()).toEqual("2Chr.1.1")
		expect(p.parse("២ របាក្សត្រ 1:1").osis()).toEqual("2Chr.1.1")
		expect(p.parse("2Chr 1:1").osis()).toEqual("2Chr.1.1")
		`
		true
	it "should handle non-Latin digits in book: 2Chr (km)", ->
		p.set_options non_latin_digits_strategy: "replace"
		`
		expect(p.parse("2 របាក្សត្រ 1:1").osis()).toEqual("2Chr.1.1")
		expect(p.parse("២ របាក្សត្រ 1:1").osis()).toEqual("2Chr.1.1")
		expect(p.parse("2Chr 1:1").osis()).toEqual("2Chr.1.1")
		p.include_apocrypha(false)
		expect(p.parse("2 របាក្សត្រ 1:1").osis()).toEqual("2Chr.1.1")
		expect(p.parse("២ របាក្សត្រ 1:1").osis()).toEqual("2Chr.1.1")
		expect(p.parse("2CHR 1:1").osis()).toEqual("2Chr.1.1")
		`
		true
describe "Localized book 1Chr (km)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: 1Chr (km)", ->
		`
		expect(p.parse("1 របាក្សត្រ 1:1").osis()).toEqual("1Chr.1.1")
		expect(p.parse("១ របាក្សត្រ 1:1").osis()).toEqual("1Chr.1.1")
		expect(p.parse("1Chr 1:1").osis()).toEqual("1Chr.1.1")
		`
		true
	it "should handle non-Latin digits in book: 1Chr (km)", ->
		p.set_options non_latin_digits_strategy: "replace"
		`
		expect(p.parse("1 របាក្សត្រ 1:1").osis()).toEqual("1Chr.1.1")
		expect(p.parse("១ របាក្សត្រ 1:1").osis()).toEqual("1Chr.1.1")
		expect(p.parse("1Chr 1:1").osis()).toEqual("1Chr.1.1")
		p.include_apocrypha(false)
		expect(p.parse("1 របាក្សត្រ 1:1").osis()).toEqual("1Chr.1.1")
		expect(p.parse("១ របាក្សត្រ 1:1").osis()).toEqual("1Chr.1.1")
		expect(p.parse("1CHR 1:1").osis()).toEqual("1Chr.1.1")
		`
		true
describe "Localized book Ezra (km)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: Ezra (km)", ->
		`
		expect(p.parse("បទគម្ពីរអែសរ៉ា 1:1").osis()).toEqual("Ezra.1.1")
		expect(p.parse("អែសរ៉ា 1:1").osis()).toEqual("Ezra.1.1")
		expect(p.parse("Ezra 1:1").osis()).toEqual("Ezra.1.1")
		p.include_apocrypha(false)
		expect(p.parse("បទគម្ពីរអែសរ៉ា 1:1").osis()).toEqual("Ezra.1.1")
		expect(p.parse("អែសរ៉ា 1:1").osis()).toEqual("Ezra.1.1")
		expect(p.parse("EZRA 1:1").osis()).toEqual("Ezra.1.1")
		`
		true
describe "Localized book Neh (km)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: Neh (km)", ->
		`
		expect(p.parse("នេហេមា 1:1").osis()).toEqual("Neh.1.1")
		expect(p.parse("Neh 1:1").osis()).toEqual("Neh.1.1")
		p.include_apocrypha(false)
		expect(p.parse("នេហេមា 1:1").osis()).toEqual("Neh.1.1")
		expect(p.parse("NEH 1:1").osis()).toEqual("Neh.1.1")
		`
		true
describe "Localized book GkEsth (km)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: GkEsth (km)", ->
		`
		expect(p.parse("GkEsth 1:1").osis()).toEqual("GkEsth.1.1")
		`
		true
describe "Localized book Esth (km)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: Esth (km)", ->
		`
		expect(p.parse("នាងអេសធើរ 1:1").osis()).toEqual("Esth.1.1")
		expect(p.parse("អេសធើរ 1:1").osis()).toEqual("Esth.1.1")
		expect(p.parse("Esth 1:1").osis()).toEqual("Esth.1.1")
		p.include_apocrypha(false)
		expect(p.parse("នាងអេសធើរ 1:1").osis()).toEqual("Esth.1.1")
		expect(p.parse("អេសធើរ 1:1").osis()).toEqual("Esth.1.1")
		expect(p.parse("ESTH 1:1").osis()).toEqual("Esth.1.1")
		`
		true
describe "Localized book Job (km)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: Job (km)", ->
		`
		expect(p.parse("យ៉ូប 1:1").osis()).toEqual("Job.1.1")
		expect(p.parse("Job 1:1").osis()).toEqual("Job.1.1")
		p.include_apocrypha(false)
		expect(p.parse("យ៉ូប 1:1").osis()).toEqual("Job.1.1")
		expect(p.parse("JOB 1:1").osis()).toEqual("Job.1.1")
		`
		true
describe "Localized book Ps (km)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: Ps (km)", ->
		`
		expect(p.parse("ទំនុកតម្កើង 1:1").osis()).toEqual("Ps.1.1")
		expect(p.parse("ទំនុកដំកើង 1:1").osis()).toEqual("Ps.1.1")
		expect(p.parse("នុកតម្កើង 1:1").osis()).toEqual("Ps.1.1")
		expect(p.parse("Ps 1:1").osis()).toEqual("Ps.1.1")
		p.include_apocrypha(false)
		expect(p.parse("ទំនុកតម្កើង 1:1").osis()).toEqual("Ps.1.1")
		expect(p.parse("ទំនុកដំកើង 1:1").osis()).toEqual("Ps.1.1")
		expect(p.parse("នុកតម្កើង 1:1").osis()).toEqual("Ps.1.1")
		expect(p.parse("PS 1:1").osis()).toEqual("Ps.1.1")
		`
		true
describe "Localized book PrAzar (km)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: PrAzar (km)", ->
		`
		expect(p.parse("PrAzar 1:1").osis()).toEqual("PrAzar.1.1")
		`
		true
describe "Localized book Prov (km)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: Prov (km)", ->
		`
		expect(p.parse("សុភាសិត 1:1").osis()).toEqual("Prov.1.1")
		expect(p.parse("Prov 1:1").osis()).toEqual("Prov.1.1")
		p.include_apocrypha(false)
		expect(p.parse("សុភាសិត 1:1").osis()).toEqual("Prov.1.1")
		expect(p.parse("PROV 1:1").osis()).toEqual("Prov.1.1")
		`
		true
describe "Localized book Eccl (km)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: Eccl (km)", ->
		`
		expect(p.parse("សាស្ដា 1:1").osis()).toEqual("Eccl.1.1")
		expect(p.parse("Eccl 1:1").osis()).toEqual("Eccl.1.1")
		p.include_apocrypha(false)
		expect(p.parse("សាស្ដា 1:1").osis()).toEqual("Eccl.1.1")
		expect(p.parse("ECCL 1:1").osis()).toEqual("Eccl.1.1")
		`
		true
describe "Localized book SgThree (km)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: SgThree (km)", ->
		`
		expect(p.parse("SgThree 1:1").osis()).toEqual("SgThree.1.1")
		`
		true
describe "Localized book Song (km)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: Song (km)", ->
		`
		expect(p.parse("បទចម្រៀង 1:1").osis()).toEqual("Song.1.1")
		expect(p.parse("Song 1:1").osis()).toEqual("Song.1.1")
		p.include_apocrypha(false)
		expect(p.parse("បទចម្រៀង 1:1").osis()).toEqual("Song.1.1")
		expect(p.parse("SONG 1:1").osis()).toEqual("Song.1.1")
		`
		true
describe "Localized book Jer (km)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: Jer (km)", ->
		`
		expect(p.parse("ងយេរេមា 1:1").osis()).toEqual("Jer.1.1")
		expect(p.parse("យេរេមា 1:1").osis()).toEqual("Jer.1.1")
		expect(p.parse("Jer 1:1").osis()).toEqual("Jer.1.1")
		p.include_apocrypha(false)
		expect(p.parse("ងយេរេមា 1:1").osis()).toEqual("Jer.1.1")
		expect(p.parse("យេរេមា 1:1").osis()).toEqual("Jer.1.1")
		expect(p.parse("JER 1:1").osis()).toEqual("Jer.1.1")
		`
		true
describe "Localized book Ezek (km)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: Ezek (km)", ->
		`
		expect(p.parse("ខគម្ពីរអេសេគាល 1:1").osis()).toEqual("Ezek.1.1")
		expect(p.parse("អេសេគាល 1:1").osis()).toEqual("Ezek.1.1")
		expect(p.parse("Ezek 1:1").osis()).toEqual("Ezek.1.1")
		p.include_apocrypha(false)
		expect(p.parse("ខគម្ពីរអេសេគាល 1:1").osis()).toEqual("Ezek.1.1")
		expect(p.parse("អេសេគាល 1:1").osis()).toEqual("Ezek.1.1")
		expect(p.parse("EZEK 1:1").osis()).toEqual("Ezek.1.1")
		`
		true
describe "Localized book Dan (km)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: Dan (km)", ->
		`
		expect(p.parse("ដានីយ៉ែល 1:1").osis()).toEqual("Dan.1.1")
		expect(p.parse("Dan 1:1").osis()).toEqual("Dan.1.1")
		p.include_apocrypha(false)
		expect(p.parse("ដានីយ៉ែល 1:1").osis()).toEqual("Dan.1.1")
		expect(p.parse("DAN 1:1").osis()).toEqual("Dan.1.1")
		`
		true
describe "Localized book Hos (km)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: Hos (km)", ->
		`
		expect(p.parse("ហូសេ 1:1").osis()).toEqual("Hos.1.1")
		expect(p.parse("Hos 1:1").osis()).toEqual("Hos.1.1")
		p.include_apocrypha(false)
		expect(p.parse("ហូសេ 1:1").osis()).toEqual("Hos.1.1")
		expect(p.parse("HOS 1:1").osis()).toEqual("Hos.1.1")
		`
		true
describe "Localized book Joel (km)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: Joel (km)", ->
		`
		expect(p.parse("យ៉ូអែល 1:1").osis()).toEqual("Joel.1.1")
		expect(p.parse("Joel 1:1").osis()).toEqual("Joel.1.1")
		p.include_apocrypha(false)
		expect(p.parse("យ៉ូអែល 1:1").osis()).toEqual("Joel.1.1")
		expect(p.parse("JOEL 1:1").osis()).toEqual("Joel.1.1")
		`
		true
describe "Localized book Amos (km)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: Amos (km)", ->
		`
		expect(p.parse("អេម៉ុស 1:1").osis()).toEqual("Amos.1.1")
		expect(p.parse("Amos 1:1").osis()).toEqual("Amos.1.1")
		p.include_apocrypha(false)
		expect(p.parse("អេម៉ុស 1:1").osis()).toEqual("Amos.1.1")
		expect(p.parse("AMOS 1:1").osis()).toEqual("Amos.1.1")
		`
		true
describe "Localized book Obad (km)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: Obad (km)", ->
		`
		expect(p.parse("អូបាឌា 1:1").osis()).toEqual("Obad.1.1")
		expect(p.parse("Obad 1:1").osis()).toEqual("Obad.1.1")
		p.include_apocrypha(false)
		expect(p.parse("អូបាឌា 1:1").osis()).toEqual("Obad.1.1")
		expect(p.parse("OBAD 1:1").osis()).toEqual("Obad.1.1")
		`
		true
describe "Localized book Jonah (km)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: Jonah (km)", ->
		`
		expect(p.parse("នខគម្ពីរយ៉ូណាស 1:1").osis()).toEqual("Jonah.1.1")
		expect(p.parse("រយ៉ូណាស 1:1").osis()).toEqual("Jonah.1.1")
		expect(p.parse("យ៉ូណាស 1:1").osis()).toEqual("Jonah.1.1")
		expect(p.parse("Jonah 1:1").osis()).toEqual("Jonah.1.1")
		p.include_apocrypha(false)
		expect(p.parse("នខគម្ពីរយ៉ូណាស 1:1").osis()).toEqual("Jonah.1.1")
		expect(p.parse("រយ៉ូណាស 1:1").osis()).toEqual("Jonah.1.1")
		expect(p.parse("យ៉ូណាស 1:1").osis()).toEqual("Jonah.1.1")
		expect(p.parse("JONAH 1:1").osis()).toEqual("Jonah.1.1")
		`
		true
describe "Localized book Mic (km)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: Mic (km)", ->
		`
		expect(p.parse("មីកា 1:1").osis()).toEqual("Mic.1.1")
		expect(p.parse("Mic 1:1").osis()).toEqual("Mic.1.1")
		p.include_apocrypha(false)
		expect(p.parse("មីកា 1:1").osis()).toEqual("Mic.1.1")
		expect(p.parse("MIC 1:1").osis()).toEqual("Mic.1.1")
		`
		true
describe "Localized book Nah (km)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: Nah (km)", ->
		`
		expect(p.parse("ណាហ៊ូម 1:1").osis()).toEqual("Nah.1.1")
		expect(p.parse("Nah 1:1").osis()).toEqual("Nah.1.1")
		p.include_apocrypha(false)
		expect(p.parse("ណាហ៊ូម 1:1").osis()).toEqual("Nah.1.1")
		expect(p.parse("NAH 1:1").osis()).toEqual("Nah.1.1")
		`
		true
describe "Localized book Hab (km)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: Hab (km)", ->
		`
		expect(p.parse("ហាបាគុក 1:1").osis()).toEqual("Hab.1.1")
		expect(p.parse("Hab 1:1").osis()).toEqual("Hab.1.1")
		p.include_apocrypha(false)
		expect(p.parse("ហាបាគុក 1:1").osis()).toEqual("Hab.1.1")
		expect(p.parse("HAB 1:1").osis()).toEqual("Hab.1.1")
		`
		true
describe "Localized book Zeph (km)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: Zeph (km)", ->
		`
		expect(p.parse("សេផានា 1:1").osis()).toEqual("Zeph.1.1")
		expect(p.parse("សេផានី 1:1").osis()).toEqual("Zeph.1.1")
		expect(p.parse("Zeph 1:1").osis()).toEqual("Zeph.1.1")
		p.include_apocrypha(false)
		expect(p.parse("សេផានា 1:1").osis()).toEqual("Zeph.1.1")
		expect(p.parse("សេផានី 1:1").osis()).toEqual("Zeph.1.1")
		expect(p.parse("ZEPH 1:1").osis()).toEqual("Zeph.1.1")
		`
		true
describe "Localized book Hag (km)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: Hag (km)", ->
		`
		expect(p.parse("ហាកាយ 1:1").osis()).toEqual("Hag.1.1")
		expect(p.parse("Hag 1:1").osis()).toEqual("Hag.1.1")
		p.include_apocrypha(false)
		expect(p.parse("ហាកាយ 1:1").osis()).toEqual("Hag.1.1")
		expect(p.parse("HAG 1:1").osis()).toEqual("Hag.1.1")
		`
		true
describe "Localized book Zech (km)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: Zech (km)", ->
		`
		expect(p.parse("សាការី 1:1").osis()).toEqual("Zech.1.1")
		expect(p.parse("Zech 1:1").osis()).toEqual("Zech.1.1")
		p.include_apocrypha(false)
		expect(p.parse("សាការី 1:1").osis()).toEqual("Zech.1.1")
		expect(p.parse("ZECH 1:1").osis()).toEqual("Zech.1.1")
		`
		true
describe "Localized book Mal (km)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: Mal (km)", ->
		`
		expect(p.parse("ម៉ាឡាគី 1:1").osis()).toEqual("Mal.1.1")
		expect(p.parse("Mal 1:1").osis()).toEqual("Mal.1.1")
		p.include_apocrypha(false)
		expect(p.parse("ម៉ាឡាគី 1:1").osis()).toEqual("Mal.1.1")
		expect(p.parse("MAL 1:1").osis()).toEqual("Mal.1.1")
		`
		true
describe "Localized book Matt (km)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: Matt (km)", ->
		`
		expect(p.parse("ម៉ាថាយ 1:1").osis()).toEqual("Matt.1.1")
		expect(p.parse("Matt 1:1").osis()).toEqual("Matt.1.1")
		p.include_apocrypha(false)
		expect(p.parse("ម៉ាថាយ 1:1").osis()).toEqual("Matt.1.1")
		expect(p.parse("MATT 1:1").osis()).toEqual("Matt.1.1")
		`
		true
describe "Localized book Mark (km)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: Mark (km)", ->
		`
		expect(p.parse("ម៉ាកុស 1:1").osis()).toEqual("Mark.1.1")
		expect(p.parse("Mark 1:1").osis()).toEqual("Mark.1.1")
		p.include_apocrypha(false)
		expect(p.parse("ម៉ាកុស 1:1").osis()).toEqual("Mark.1.1")
		expect(p.parse("MARK 1:1").osis()).toEqual("Mark.1.1")
		`
		true
describe "Localized book Luke (km)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: Luke (km)", ->
		`
		expect(p.parse("Luke 1:1").osis()).toEqual("Luke.1.1")
		expect(p.parse("លូកា 1:1").osis()).toEqual("Luke.1.1")
		p.include_apocrypha(false)
		expect(p.parse("LUKE 1:1").osis()).toEqual("Luke.1.1")
		expect(p.parse("លូកា 1:1").osis()).toEqual("Luke.1.1")
		`
		true
describe "Localized book 1John (km)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: 1John (km)", ->
		`
		expect(p.parse("យ៉ូហានទី1 1:1").osis()).toEqual("1John.1.1")
		expect(p.parse("1 យ៉ូហាន 1:1").osis()).toEqual("1John.1.1")
		expect(p.parse("១ យ៉ូហាន 1:1").osis()).toEqual("1John.1.1")
		expect(p.parse("1John 1:1").osis()).toEqual("1John.1.1")
		`
		true
	it "should handle non-Latin digits in book: 1John (km)", ->
		p.set_options non_latin_digits_strategy: "replace"
		`
		expect(p.parse("យ៉ូហានទី1 1:1").osis()).toEqual("1John.1.1")
		expect(p.parse("1 យ៉ូហាន 1:1").osis()).toEqual("1John.1.1")
		expect(p.parse("១ យ៉ូហាន 1:1").osis()).toEqual("1John.1.1")
		expect(p.parse("1John 1:1").osis()).toEqual("1John.1.1")
		p.include_apocrypha(false)
		expect(p.parse("យ៉ូហានទី1 1:1").osis()).toEqual("1John.1.1")
		expect(p.parse("1 យ៉ូហាន 1:1").osis()).toEqual("1John.1.1")
		expect(p.parse("១ យ៉ូហាន 1:1").osis()).toEqual("1John.1.1")
		expect(p.parse("1JOHN 1:1").osis()).toEqual("1John.1.1")
		`
		true
describe "Localized book 2John (km)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: 2John (km)", ->
		`
		expect(p.parse("យ៉ូហានទី2 1:1").osis()).toEqual("2John.1.1")
		expect(p.parse("2 យ៉ូហាន 1:1").osis()).toEqual("2John.1.1")
		expect(p.parse("២ យ៉ូហាន 1:1").osis()).toEqual("2John.1.1")
		expect(p.parse("2John 1:1").osis()).toEqual("2John.1.1")
		`
		true
	it "should handle non-Latin digits in book: 2John (km)", ->
		p.set_options non_latin_digits_strategy: "replace"
		`
		expect(p.parse("យ៉ូហានទី2 1:1").osis()).toEqual("2John.1.1")
		expect(p.parse("2 យ៉ូហាន 1:1").osis()).toEqual("2John.1.1")
		expect(p.parse("២ យ៉ូហាន 1:1").osis()).toEqual("2John.1.1")
		expect(p.parse("2John 1:1").osis()).toEqual("2John.1.1")
		p.include_apocrypha(false)
		expect(p.parse("យ៉ូហានទី2 1:1").osis()).toEqual("2John.1.1")
		expect(p.parse("2 យ៉ូហាន 1:1").osis()).toEqual("2John.1.1")
		expect(p.parse("២ យ៉ូហាន 1:1").osis()).toEqual("2John.1.1")
		expect(p.parse("2JOHN 1:1").osis()).toEqual("2John.1.1")
		`
		true
describe "Localized book 3John (km)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: 3John (km)", ->
		`
		expect(p.parse("យ៉ូហានទី3 1:1").osis()).toEqual("3John.1.1")
		expect(p.parse("3 យ៉ូហាន 1:1").osis()).toEqual("3John.1.1")
		expect(p.parse("៣ យ៉ូហាន 1:1").osis()).toEqual("3John.1.1")
		expect(p.parse("3John 1:1").osis()).toEqual("3John.1.1")
		`
		true
	it "should handle non-Latin digits in book: 3John (km)", ->
		p.set_options non_latin_digits_strategy: "replace"
		`
		expect(p.parse("យ៉ូហានទី3 1:1").osis()).toEqual("3John.1.1")
		expect(p.parse("3 យ៉ូហាន 1:1").osis()).toEqual("3John.1.1")
		expect(p.parse("៣ យ៉ូហាន 1:1").osis()).toEqual("3John.1.1")
		expect(p.parse("3John 1:1").osis()).toEqual("3John.1.1")
		p.include_apocrypha(false)
		expect(p.parse("យ៉ូហានទី3 1:1").osis()).toEqual("3John.1.1")
		expect(p.parse("3 យ៉ូហាន 1:1").osis()).toEqual("3John.1.1")
		expect(p.parse("៣ យ៉ូហាន 1:1").osis()).toEqual("3John.1.1")
		expect(p.parse("3JOHN 1:1").osis()).toEqual("3John.1.1")
		`
		true
describe "Localized book John (km)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: John (km)", ->
		`
		expect(p.parse("យ៉ូហាន 1:1").osis()).toEqual("John.1.1")
		expect(p.parse("John 1:1").osis()).toEqual("John.1.1")
		p.include_apocrypha(false)
		expect(p.parse("យ៉ូហាន 1:1").osis()).toEqual("John.1.1")
		expect(p.parse("JOHN 1:1").osis()).toEqual("John.1.1")
		`
		true
describe "Localized book Acts (km)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: Acts (km)", ->
		`
		expect(p.parse("កិច្ចការ 1:1").osis()).toEqual("Acts.1.1")
		expect(p.parse("Acts 1:1").osis()).toEqual("Acts.1.1")
		p.include_apocrypha(false)
		expect(p.parse("កិច្ចការ 1:1").osis()).toEqual("Acts.1.1")
		expect(p.parse("ACTS 1:1").osis()).toEqual("Acts.1.1")
		`
		true
describe "Localized book Rom (km)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: Rom (km)", ->
		`
		expect(p.parse("រ៉ូម 1:1").osis()).toEqual("Rom.1.1")
		expect(p.parse("Rom 1:1").osis()).toEqual("Rom.1.1")
		p.include_apocrypha(false)
		expect(p.parse("រ៉ូម 1:1").osis()).toEqual("Rom.1.1")
		expect(p.parse("ROM 1:1").osis()).toEqual("Rom.1.1")
		`
		true
describe "Localized book 2Cor (km)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: 2Cor (km)", ->
		`
		expect(p.parse("ងកូរិនថូសទី2 1:1").osis()).toEqual("2Cor.1.1")
		expect(p.parse("ងកូរិនថូសទី២ 1:1").osis()).toEqual("2Cor.1.1")
		expect(p.parse("កូរិនថូសទី2 1:1").osis()).toEqual("2Cor.1.1")
		expect(p.parse("កូរិនថូសទី២ 1:1").osis()).toEqual("2Cor.1.1")
		expect(p.parse("2Cor 1:1").osis()).toEqual("2Cor.1.1")
		`
		true
	it "should handle non-Latin digits in book: 2Cor (km)", ->
		p.set_options non_latin_digits_strategy: "replace"
		`
		expect(p.parse("ងកូរិនថូសទី2 1:1").osis()).toEqual("2Cor.1.1")
		expect(p.parse("ងកូរិនថូសទី២ 1:1").osis()).toEqual("2Cor.1.1")
		expect(p.parse("កូរិនថូសទី2 1:1").osis()).toEqual("2Cor.1.1")
		expect(p.parse("កូរិនថូសទី២ 1:1").osis()).toEqual("2Cor.1.1")
		expect(p.parse("2Cor 1:1").osis()).toEqual("2Cor.1.1")
		p.include_apocrypha(false)
		expect(p.parse("ងកូរិនថូសទី2 1:1").osis()).toEqual("2Cor.1.1")
		expect(p.parse("ងកូរិនថូសទី២ 1:1").osis()).toEqual("2Cor.1.1")
		expect(p.parse("កូរិនថូសទី2 1:1").osis()).toEqual("2Cor.1.1")
		expect(p.parse("កូរិនថូសទី២ 1:1").osis()).toEqual("2Cor.1.1")
		expect(p.parse("2COR 1:1").osis()).toEqual("2Cor.1.1")
		`
		true
describe "Localized book 1Cor (km)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: 1Cor (km)", ->
		`
		expect(p.parse("ងកូរិនថូសទី1 1:1").osis()).toEqual("1Cor.1.1")
		expect(p.parse("ងកូរិនថូសទី១ 1:1").osis()).toEqual("1Cor.1.1")
		expect(p.parse("កូរិនថូសទី1 1:1").osis()).toEqual("1Cor.1.1")
		expect(p.parse("កូរិនថូសទី១ 1:1").osis()).toEqual("1Cor.1.1")
		expect(p.parse("1Cor 1:1").osis()).toEqual("1Cor.1.1")
		`
		true
	it "should handle non-Latin digits in book: 1Cor (km)", ->
		p.set_options non_latin_digits_strategy: "replace"
		`
		expect(p.parse("ងកូរិនថូសទី1 1:1").osis()).toEqual("1Cor.1.1")
		expect(p.parse("ងកូរិនថូសទី១ 1:1").osis()).toEqual("1Cor.1.1")
		expect(p.parse("កូរិនថូសទី1 1:1").osis()).toEqual("1Cor.1.1")
		expect(p.parse("កូរិនថូសទី១ 1:1").osis()).toEqual("1Cor.1.1")
		expect(p.parse("1Cor 1:1").osis()).toEqual("1Cor.1.1")
		p.include_apocrypha(false)
		expect(p.parse("ងកូរិនថូសទី1 1:1").osis()).toEqual("1Cor.1.1")
		expect(p.parse("ងកូរិនថូសទី១ 1:1").osis()).toEqual("1Cor.1.1")
		expect(p.parse("កូរិនថូសទី1 1:1").osis()).toEqual("1Cor.1.1")
		expect(p.parse("កូរិនថូសទី១ 1:1").osis()).toEqual("1Cor.1.1")
		expect(p.parse("1COR 1:1").osis()).toEqual("1Cor.1.1")
		`
		true
describe "Localized book Gal (km)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: Gal (km)", ->
		`
		expect(p.parse("កាឡាទី 1:1").osis()).toEqual("Gal.1.1")
		expect(p.parse("Gal 1:1").osis()).toEqual("Gal.1.1")
		p.include_apocrypha(false)
		expect(p.parse("កាឡាទី 1:1").osis()).toEqual("Gal.1.1")
		expect(p.parse("GAL 1:1").osis()).toEqual("Gal.1.1")
		`
		true
describe "Localized book Eph (km)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: Eph (km)", ->
		`
		expect(p.parse("អេភេសូរ 1:1").osis()).toEqual("Eph.1.1")
		expect(p.parse("Eph 1:1").osis()).toEqual("Eph.1.1")
		p.include_apocrypha(false)
		expect(p.parse("អេភេសូរ 1:1").osis()).toEqual("Eph.1.1")
		expect(p.parse("EPH 1:1").osis()).toEqual("Eph.1.1")
		`
		true
describe "Localized book Phil (km)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: Phil (km)", ->
		`
		expect(p.parse("នខគម្ពីរភីលីព 1:1").osis()).toEqual("Phil.1.1")
		expect(p.parse("ភីលីព 1:1").osis()).toEqual("Phil.1.1")
		expect(p.parse("Phil 1:1").osis()).toEqual("Phil.1.1")
		p.include_apocrypha(false)
		expect(p.parse("នខគម្ពីរភីលីព 1:1").osis()).toEqual("Phil.1.1")
		expect(p.parse("ភីលីព 1:1").osis()).toEqual("Phil.1.1")
		expect(p.parse("PHIL 1:1").osis()).toEqual("Phil.1.1")
		`
		true
describe "Localized book Col (km)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: Col (km)", ->
		`
		expect(p.parse("កូល៉ុស 1:1").osis()).toEqual("Col.1.1")
		expect(p.parse("Col 1:1").osis()).toEqual("Col.1.1")
		p.include_apocrypha(false)
		expect(p.parse("កូល៉ុស 1:1").osis()).toEqual("Col.1.1")
		expect(p.parse("COL 1:1").osis()).toEqual("Col.1.1")
		`
		true
describe "Localized book 2Thess (km)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: 2Thess (km)", ->
		`
		expect(p.parse("គម្ពីរ ថែស្សាឡូនីចទី2 1:1").osis()).toEqual("2Thess.1.1")
		expect(p.parse("គម្ពីរ ថែស្សាឡូនីចទី២ 1:1").osis()).toEqual("2Thess.1.1")
		expect(p.parse("ថែស្សាឡូនីចទី2 1:1").osis()).toEqual("2Thess.1.1")
		expect(p.parse("2 ថេស្សាឡូនិក 1:1").osis()).toEqual("2Thess.1.1")
		expect(p.parse("២ ថេស្សាឡូនិក 1:1").osis()).toEqual("2Thess.1.1")
		expect(p.parse("2Thess 1:1").osis()).toEqual("2Thess.1.1")
		`
		true
	it "should handle non-Latin digits in book: 2Thess (km)", ->
		p.set_options non_latin_digits_strategy: "replace"
		`
		expect(p.parse("គម្ពីរ ថែស្សាឡូនីចទី2 1:1").osis()).toEqual("2Thess.1.1")
		expect(p.parse("គម្ពីរ ថែស្សាឡូនីចទី២ 1:1").osis()).toEqual("2Thess.1.1")
		expect(p.parse("ថែស្សាឡូនីចទី2 1:1").osis()).toEqual("2Thess.1.1")
		expect(p.parse("2 ថេស្សាឡូនិក 1:1").osis()).toEqual("2Thess.1.1")
		expect(p.parse("២ ថេស្សាឡូនិក 1:1").osis()).toEqual("2Thess.1.1")
		expect(p.parse("2Thess 1:1").osis()).toEqual("2Thess.1.1")
		p.include_apocrypha(false)
		expect(p.parse("គម្ពីរ ថែស្សាឡូនីចទី2 1:1").osis()).toEqual("2Thess.1.1")
		expect(p.parse("គម្ពីរ ថែស្សាឡូនីចទី២ 1:1").osis()).toEqual("2Thess.1.1")
		expect(p.parse("ថែស្សាឡូនីចទី2 1:1").osis()).toEqual("2Thess.1.1")
		expect(p.parse("2 ថេស្សាឡូនិក 1:1").osis()).toEqual("2Thess.1.1")
		expect(p.parse("២ ថេស្សាឡូនិក 1:1").osis()).toEqual("2Thess.1.1")
		expect(p.parse("2THESS 1:1").osis()).toEqual("2Thess.1.1")
		`
		true
describe "Localized book 1Thess (km)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: 1Thess (km)", ->
		`
		expect(p.parse("ថែស្សាឡូនីចទី1 1:1").osis()).toEqual("1Thess.1.1")
		expect(p.parse("1 ថេស្សាឡូនិក 1:1").osis()).toEqual("1Thess.1.1")
		expect(p.parse("១ ថេស្សាឡូនិក 1:1").osis()).toEqual("1Thess.1.1")
		expect(p.parse("1Thess 1:1").osis()).toEqual("1Thess.1.1")
		`
		true
	it "should handle non-Latin digits in book: 1Thess (km)", ->
		p.set_options non_latin_digits_strategy: "replace"
		`
		expect(p.parse("ថែស្សាឡូនីចទី1 1:1").osis()).toEqual("1Thess.1.1")
		expect(p.parse("1 ថេស្សាឡូនិក 1:1").osis()).toEqual("1Thess.1.1")
		expect(p.parse("១ ថេស្សាឡូនិក 1:1").osis()).toEqual("1Thess.1.1")
		expect(p.parse("1Thess 1:1").osis()).toEqual("1Thess.1.1")
		p.include_apocrypha(false)
		expect(p.parse("ថែស្សាឡូនីចទី1 1:1").osis()).toEqual("1Thess.1.1")
		expect(p.parse("1 ថេស្សាឡូនិក 1:1").osis()).toEqual("1Thess.1.1")
		expect(p.parse("១ ថេស្សាឡូនិក 1:1").osis()).toEqual("1Thess.1.1")
		expect(p.parse("1THESS 1:1").osis()).toEqual("1Thess.1.1")
		`
		true
describe "Localized book 2Tim (km)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: 2Tim (km)", ->
		`
		expect(p.parse("ធីម៉ូថេ ទី2 1:1").osis()).toEqual("2Tim.1.1")
		expect(p.parse("ធីម៉ូថេទី2 1:1").osis()).toEqual("2Tim.1.1")
		expect(p.parse("ធីម៉ូថេទី២ 1:1").osis()).toEqual("2Tim.1.1")
		expect(p.parse("2 ធីម៉ូថេ 1:1").osis()).toEqual("2Tim.1.1")
		expect(p.parse("២ ធីម៉ូថេ 1:1").osis()).toEqual("2Tim.1.1")
		expect(p.parse("2Tim 1:1").osis()).toEqual("2Tim.1.1")
		`
		true
	it "should handle non-Latin digits in book: 2Tim (km)", ->
		p.set_options non_latin_digits_strategy: "replace"
		`
		expect(p.parse("ធីម៉ូថេ ទី2 1:1").osis()).toEqual("2Tim.1.1")
		expect(p.parse("ធីម៉ូថេទី2 1:1").osis()).toEqual("2Tim.1.1")
		expect(p.parse("ធីម៉ូថេទី២ 1:1").osis()).toEqual("2Tim.1.1")
		expect(p.parse("2 ធីម៉ូថេ 1:1").osis()).toEqual("2Tim.1.1")
		expect(p.parse("២ ធីម៉ូថេ 1:1").osis()).toEqual("2Tim.1.1")
		expect(p.parse("2Tim 1:1").osis()).toEqual("2Tim.1.1")
		p.include_apocrypha(false)
		expect(p.parse("ធីម៉ូថេ ទី2 1:1").osis()).toEqual("2Tim.1.1")
		expect(p.parse("ធីម៉ូថេទី2 1:1").osis()).toEqual("2Tim.1.1")
		expect(p.parse("ធីម៉ូថេទី២ 1:1").osis()).toEqual("2Tim.1.1")
		expect(p.parse("2 ធីម៉ូថេ 1:1").osis()).toEqual("2Tim.1.1")
		expect(p.parse("២ ធីម៉ូថេ 1:1").osis()).toEqual("2Tim.1.1")
		expect(p.parse("2TIM 1:1").osis()).toEqual("2Tim.1.1")
		`
		true
describe "Localized book 1Tim (km)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: 1Tim (km)", ->
		`
		expect(p.parse("ធីម៉ូថេ ទី1 1:1").osis()).toEqual("1Tim.1.1")
		expect(p.parse("ធីម៉ូថេទី1 1:1").osis()).toEqual("1Tim.1.1")
		expect(p.parse("ធីម៉ូថេទី១ 1:1").osis()).toEqual("1Tim.1.1")
		expect(p.parse("1 ធីម៉ូថេ 1:1").osis()).toEqual("1Tim.1.1")
		expect(p.parse("១ ធីម៉ូថេ 1:1").osis()).toEqual("1Tim.1.1")
		expect(p.parse("1Tim 1:1").osis()).toEqual("1Tim.1.1")
		`
		true
	it "should handle non-Latin digits in book: 1Tim (km)", ->
		p.set_options non_latin_digits_strategy: "replace"
		`
		expect(p.parse("ធីម៉ូថេ ទី1 1:1").osis()).toEqual("1Tim.1.1")
		expect(p.parse("ធីម៉ូថេទី1 1:1").osis()).toEqual("1Tim.1.1")
		expect(p.parse("ធីម៉ូថេទី១ 1:1").osis()).toEqual("1Tim.1.1")
		expect(p.parse("1 ធីម៉ូថេ 1:1").osis()).toEqual("1Tim.1.1")
		expect(p.parse("១ ធីម៉ូថេ 1:1").osis()).toEqual("1Tim.1.1")
		expect(p.parse("1Tim 1:1").osis()).toEqual("1Tim.1.1")
		p.include_apocrypha(false)
		expect(p.parse("ធីម៉ូថេ ទី1 1:1").osis()).toEqual("1Tim.1.1")
		expect(p.parse("ធីម៉ូថេទី1 1:1").osis()).toEqual("1Tim.1.1")
		expect(p.parse("ធីម៉ូថេទី១ 1:1").osis()).toEqual("1Tim.1.1")
		expect(p.parse("1 ធីម៉ូថេ 1:1").osis()).toEqual("1Tim.1.1")
		expect(p.parse("១ ធីម៉ូថេ 1:1").osis()).toEqual("1Tim.1.1")
		expect(p.parse("1TIM 1:1").osis()).toEqual("1Tim.1.1")
		`
		true
describe "Localized book Titus (km)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: Titus (km)", ->
		`
		expect(p.parse("Titus 1:1").osis()).toEqual("Titus.1.1")
		expect(p.parse("ទីតុស 1:1").osis()).toEqual("Titus.1.1")
		p.include_apocrypha(false)
		expect(p.parse("TITUS 1:1").osis()).toEqual("Titus.1.1")
		expect(p.parse("ទីតុស 1:1").osis()).toEqual("Titus.1.1")
		`
		true
describe "Localized book Phlm (km)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: Phlm (km)", ->
		`
		expect(p.parse("ភីលេម៉ូន 1:1").osis()).toEqual("Phlm.1.1")
		expect(p.parse("Phlm 1:1").osis()).toEqual("Phlm.1.1")
		p.include_apocrypha(false)
		expect(p.parse("ភីលេម៉ូន 1:1").osis()).toEqual("Phlm.1.1")
		expect(p.parse("PHLM 1:1").osis()).toEqual("Phlm.1.1")
		`
		true
describe "Localized book Heb (km)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: Heb (km)", ->
		`
		expect(p.parse("ហេព្រើរ 1:1").osis()).toEqual("Heb.1.1")
		expect(p.parse("Heb 1:1").osis()).toEqual("Heb.1.1")
		p.include_apocrypha(false)
		expect(p.parse("ហេព្រើរ 1:1").osis()).toEqual("Heb.1.1")
		expect(p.parse("HEB 1:1").osis()).toEqual("Heb.1.1")
		`
		true
describe "Localized book Jas (km)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: Jas (km)", ->
		`
		expect(p.parse("យ៉ាកុប 1:1").osis()).toEqual("Jas.1.1")
		expect(p.parse("Jas 1:1").osis()).toEqual("Jas.1.1")
		p.include_apocrypha(false)
		expect(p.parse("យ៉ាកុប 1:1").osis()).toEqual("Jas.1.1")
		expect(p.parse("JAS 1:1").osis()).toEqual("Jas.1.1")
		`
		true
describe "Localized book 2Pet (km)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: 2Pet (km)", ->
		`
		expect(p.parse("ពេត្រុសទី2 1:1").osis()).toEqual("2Pet.1.1")
		expect(p.parse("2 ពេត្រុស 1:1").osis()).toEqual("2Pet.1.1")
		expect(p.parse("២ ពេត្រុស 1:1").osis()).toEqual("2Pet.1.1")
		expect(p.parse("2Pet 1:1").osis()).toEqual("2Pet.1.1")
		`
		true
	it "should handle non-Latin digits in book: 2Pet (km)", ->
		p.set_options non_latin_digits_strategy: "replace"
		`
		expect(p.parse("ពេត្រុសទី2 1:1").osis()).toEqual("2Pet.1.1")
		expect(p.parse("2 ពេត្រុស 1:1").osis()).toEqual("2Pet.1.1")
		expect(p.parse("២ ពេត្រុស 1:1").osis()).toEqual("2Pet.1.1")
		expect(p.parse("2Pet 1:1").osis()).toEqual("2Pet.1.1")
		p.include_apocrypha(false)
		expect(p.parse("ពេត្រុសទី2 1:1").osis()).toEqual("2Pet.1.1")
		expect(p.parse("2 ពេត្រុស 1:1").osis()).toEqual("2Pet.1.1")
		expect(p.parse("២ ពេត្រុស 1:1").osis()).toEqual("2Pet.1.1")
		expect(p.parse("2PET 1:1").osis()).toEqual("2Pet.1.1")
		`
		true
describe "Localized book 1Pet (km)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: 1Pet (km)", ->
		`
		expect(p.parse("ពេត្រុសទី1 1:1").osis()).toEqual("1Pet.1.1")
		expect(p.parse("ពេត្រុសទី១ 1:1").osis()).toEqual("1Pet.1.1")
		expect(p.parse("1 ពេត្រុស 1:1").osis()).toEqual("1Pet.1.1")
		expect(p.parse("១ ពេត្រុស 1:1").osis()).toEqual("1Pet.1.1")
		expect(p.parse("1Pet 1:1").osis()).toEqual("1Pet.1.1")
		`
		true
	it "should handle non-Latin digits in book: 1Pet (km)", ->
		p.set_options non_latin_digits_strategy: "replace"
		`
		expect(p.parse("ពេត្រុសទី1 1:1").osis()).toEqual("1Pet.1.1")
		expect(p.parse("ពេត្រុសទី១ 1:1").osis()).toEqual("1Pet.1.1")
		expect(p.parse("1 ពេត្រុស 1:1").osis()).toEqual("1Pet.1.1")
		expect(p.parse("១ ពេត្រុស 1:1").osis()).toEqual("1Pet.1.1")
		expect(p.parse("1Pet 1:1").osis()).toEqual("1Pet.1.1")
		p.include_apocrypha(false)
		expect(p.parse("ពេត្រុសទី1 1:1").osis()).toEqual("1Pet.1.1")
		expect(p.parse("ពេត្រុសទី១ 1:1").osis()).toEqual("1Pet.1.1")
		expect(p.parse("1 ពេត្រុស 1:1").osis()).toEqual("1Pet.1.1")
		expect(p.parse("១ ពេត្រុស 1:1").osis()).toEqual("1Pet.1.1")
		expect(p.parse("1PET 1:1").osis()).toEqual("1Pet.1.1")
		`
		true
describe "Localized book Jude (km)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: Jude (km)", ->
		`
		expect(p.parse("គម្ពីរយូដាស 1:1").osis()).toEqual("Jude.1.1")
		expect(p.parse("យូដាស 1:1").osis()).toEqual("Jude.1.1")
		expect(p.parse("Jude 1:1").osis()).toEqual("Jude.1.1")
		p.include_apocrypha(false)
		expect(p.parse("គម្ពីរយូដាស 1:1").osis()).toEqual("Jude.1.1")
		expect(p.parse("យូដាស 1:1").osis()).toEqual("Jude.1.1")
		expect(p.parse("JUDE 1:1").osis()).toEqual("Jude.1.1")
		`
		true
describe "Localized book Tob (km)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: Tob (km)", ->
		`
		expect(p.parse("Tob 1:1").osis()).toEqual("Tob.1.1")
		`
		true
describe "Localized book Jdt (km)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: Jdt (km)", ->
		`
		expect(p.parse("Jdt 1:1").osis()).toEqual("Jdt.1.1")
		`
		true
describe "Localized book Bar (km)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: Bar (km)", ->
		`
		expect(p.parse("Bar 1:1").osis()).toEqual("Bar.1.1")
		`
		true
describe "Localized book Sus (km)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: Sus (km)", ->
		`
		expect(p.parse("Sus 1:1").osis()).toEqual("Sus.1.1")
		`
		true
describe "Localized book 2Macc (km)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: 2Macc (km)", ->
		`
		expect(p.parse("2Macc 1:1").osis()).toEqual("2Macc.1.1")
		`
		true
describe "Localized book 3Macc (km)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: 3Macc (km)", ->
		`
		expect(p.parse("3Macc 1:1").osis()).toEqual("3Macc.1.1")
		`
		true
describe "Localized book 4Macc (km)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: 4Macc (km)", ->
		`
		expect(p.parse("4Macc 1:1").osis()).toEqual("4Macc.1.1")
		`
		true
describe "Localized book 1Macc (km)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: 1Macc (km)", ->
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
		expect(p.languages).toEqual ["km"]

	it "should handle ranges (km)", ->
		expect(p.parse("Titus 1:1 ដល់ 2").osis()).toEqual "Titus.1.1-Titus.1.2"
		expect(p.parse("Matt 1ដល់2").osis()).toEqual "Matt.1-Matt.2"
		expect(p.parse("Phlm 2 ដល់ 3").osis()).toEqual "Phlm.1.2-Phlm.1.3"
	it "should handle chapters (km)", ->
		expect(p.parse("Titus 1:1, ជំពូក 2").osis()).toEqual "Titus.1.1,Titus.2"
		expect(p.parse("Matt 3:4 ជំពូក 6").osis()).toEqual "Matt.3.4,Matt.6"
	it "should handle verses (km)", ->
		expect(p.parse("Exod 1:1 ខ 3").osis()).toEqual "Exod.1.1,Exod.1.3"
		expect(p.parse("Phlm ខ 6").osis()).toEqual "Phlm.1.6"
		expect(p.parse("Exod 1:1 ៖ 3").osis()).toEqual "Exod.1.1,Exod.1.3"
		expect(p.parse("Phlm ៖ 6").osis()).toEqual "Phlm.1.6"
	it "should handle 'and' (km)", ->
		expect(p.parse("Exod 1:1 and 3").osis()).toEqual "Exod.1.1,Exod.1.3"
		expect(p.parse("Phlm 2 AND 6").osis()).toEqual "Phlm.1.2,Phlm.1.6"
	it "should handle titles (km)", ->
		expect(p.parse("Ps 3 title, 4:2, 5:title").osis()).toEqual "Ps.3.1,Ps.4.2,Ps.5.1"
		expect(p.parse("PS 3 TITLE, 4:2, 5:TITLE").osis()).toEqual "Ps.3.1,Ps.4.2,Ps.5.1"
	it "should handle 'ff' (km)", ->
		expect(p.parse("Rev 3ff, 4:2ff").osis()).toEqual "Rev.3-Rev.22,Rev.4.2-Rev.4.11"
		expect(p.parse("REV 3 FF, 4:2 FF").osis()).toEqual "Rev.3-Rev.22,Rev.4.2-Rev.4.11"
	it "should handle translations (km)", ->
		expect(p.parse("Lev 1 (ksv)").osis_and_translations()).toEqual [["Lev.1", "ksv"]]
		expect(p.parse("lev 1 ksv").osis_and_translations()).toEqual [["Lev.1", "ksv"]]
	it "should handle boundaries (km)", ->
		p.set_options {book_alone_strategy: "full"}
		expect(p.parse("\u2014Matt\u2014").osis()).toEqual "Matt.1-Matt.28"
		expect(p.parse("\u201cMatt 1:1\u201d").osis()).toEqual "Matt.1.1"
