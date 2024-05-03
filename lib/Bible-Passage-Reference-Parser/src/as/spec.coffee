bcv_parser = require("../../js/as_bcv_parser.js").bcv_parser

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

describe "Localized book Gen (as)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: Gen (as)", ->
		`
		expect(p.parse("আদিপুস্তক 1:1").osis()).toEqual("Gen.1.1")
		expect(p.parse("Gen 1:1").osis()).toEqual("Gen.1.1")
		expect(p.parse("আদি 1:1").osis()).toEqual("Gen.1.1")
		p.include_apocrypha(false)
		expect(p.parse("আদিপুস্তক 1:1").osis()).toEqual("Gen.1.1")
		expect(p.parse("GEN 1:1").osis()).toEqual("Gen.1.1")
		expect(p.parse("আদি 1:1").osis()).toEqual("Gen.1.1")
		`
		true
describe "Localized book Exod (as)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: Exod (as)", ->
		`
		expect(p.parse("যাত্ৰা পুস্তক 1:1").osis()).toEqual("Exod.1.1")
		expect(p.parse("যাত্ৰা 1:1").osis()).toEqual("Exod.1.1")
		expect(p.parse("Exod 1:1").osis()).toEqual("Exod.1.1")
		p.include_apocrypha(false)
		expect(p.parse("যাত্ৰা পুস্তক 1:1").osis()).toEqual("Exod.1.1")
		expect(p.parse("যাত্ৰা 1:1").osis()).toEqual("Exod.1.1")
		expect(p.parse("EXOD 1:1").osis()).toEqual("Exod.1.1")
		`
		true
describe "Localized book Bel (as)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: Bel (as)", ->
		`
		expect(p.parse("Bel 1:1").osis()).toEqual("Bel.1.1")
		`
		true
describe "Localized book Lev (as)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: Lev (as)", ->
		`
		expect(p.parse("লেবীয়া পুস্তক 1:1").osis()).toEqual("Lev.1.1")
		expect(p.parse("লেবীয়া 1:1").osis()).toEqual("Lev.1.1")
		expect(p.parse("Lev 1:1").osis()).toEqual("Lev.1.1")
		p.include_apocrypha(false)
		expect(p.parse("লেবীয়া পুস্তক 1:1").osis()).toEqual("Lev.1.1")
		expect(p.parse("লেবীয়া 1:1").osis()).toEqual("Lev.1.1")
		expect(p.parse("LEV 1:1").osis()).toEqual("Lev.1.1")
		`
		true
describe "Localized book Num (as)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: Num (as)", ->
		`
		expect(p.parse("গননা পুস্তক 1:1").osis()).toEqual("Num.1.1")
		expect(p.parse("গননা 1:1").osis()).toEqual("Num.1.1")
		expect(p.parse("Num 1:1").osis()).toEqual("Num.1.1")
		p.include_apocrypha(false)
		expect(p.parse("গননা পুস্তক 1:1").osis()).toEqual("Num.1.1")
		expect(p.parse("গননা 1:1").osis()).toEqual("Num.1.1")
		expect(p.parse("NUM 1:1").osis()).toEqual("Num.1.1")
		`
		true
describe "Localized book Sir (as)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: Sir (as)", ->
		`
		expect(p.parse("Sir 1:1").osis()).toEqual("Sir.1.1")
		`
		true
describe "Localized book Wis (as)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: Wis (as)", ->
		`
		expect(p.parse("Wis 1:1").osis()).toEqual("Wis.1.1")
		`
		true
describe "Localized book Lam (as)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: Lam (as)", ->
		`
		expect(p.parse("বিলাপ 1:1").osis()).toEqual("Lam.1.1")
		expect(p.parse("বিলা 1:1").osis()).toEqual("Lam.1.1")
		expect(p.parse("Lam 1:1").osis()).toEqual("Lam.1.1")
		p.include_apocrypha(false)
		expect(p.parse("বিলাপ 1:1").osis()).toEqual("Lam.1.1")
		expect(p.parse("বিলা 1:1").osis()).toEqual("Lam.1.1")
		expect(p.parse("LAM 1:1").osis()).toEqual("Lam.1.1")
		`
		true
describe "Localized book EpJer (as)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: EpJer (as)", ->
		`
		expect(p.parse("EpJer 1:1").osis()).toEqual("EpJer.1.1")
		`
		true
describe "Localized book Rev (as)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: Rev (as)", ->
		`
		expect(p.parse("প্ৰকাশিত বাক্য 1:1").osis()).toEqual("Rev.1.1")
		expect(p.parse("Rev 1:1").osis()).toEqual("Rev.1.1")
		p.include_apocrypha(false)
		expect(p.parse("প্ৰকাশিত বাক্য 1:1").osis()).toEqual("Rev.1.1")
		expect(p.parse("REV 1:1").osis()).toEqual("Rev.1.1")
		`
		true
describe "Localized book PrMan (as)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: PrMan (as)", ->
		`
		expect(p.parse("PrMan 1:1").osis()).toEqual("PrMan.1.1")
		`
		true
describe "Localized book Deut (as)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: Deut (as)", ->
		`
		expect(p.parse("দ্বিতীয় বিৱৰণ 1:1").osis()).toEqual("Deut.1.1")
		expect(p.parse("দ্বিঃ বিৱৰণ 1:1").osis()).toEqual("Deut.1.1")
		expect(p.parse("দ্বি.বি. 1:1").osis()).toEqual("Deut.1.1")
		expect(p.parse("দ্বি.বি 1:1").osis()).toEqual("Deut.1.1")
		expect(p.parse("দ্বিবি. 1:1").osis()).toEqual("Deut.1.1")
		expect(p.parse("দ্বিবি 1:1").osis()).toEqual("Deut.1.1")
		expect(p.parse("Deut 1:1").osis()).toEqual("Deut.1.1")
		p.include_apocrypha(false)
		expect(p.parse("দ্বিতীয় বিৱৰণ 1:1").osis()).toEqual("Deut.1.1")
		expect(p.parse("দ্বিঃ বিৱৰণ 1:1").osis()).toEqual("Deut.1.1")
		expect(p.parse("দ্বি.বি. 1:1").osis()).toEqual("Deut.1.1")
		expect(p.parse("দ্বি.বি 1:1").osis()).toEqual("Deut.1.1")
		expect(p.parse("দ্বিবি. 1:1").osis()).toEqual("Deut.1.1")
		expect(p.parse("দ্বিবি 1:1").osis()).toEqual("Deut.1.1")
		expect(p.parse("DEUT 1:1").osis()).toEqual("Deut.1.1")
		`
		true
describe "Localized book Josh (as)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: Josh (as)", ->
		`
		expect(p.parse("যিহোচূৱা 1:1").osis()).toEqual("Josh.1.1")
		expect(p.parse("Josh 1:1").osis()).toEqual("Josh.1.1")
		expect(p.parse("যিহো 1:1").osis()).toEqual("Josh.1.1")
		p.include_apocrypha(false)
		expect(p.parse("যিহোচূৱা 1:1").osis()).toEqual("Josh.1.1")
		expect(p.parse("JOSH 1:1").osis()).toEqual("Josh.1.1")
		expect(p.parse("যিহো 1:1").osis()).toEqual("Josh.1.1")
		`
		true
describe "Localized book Judg (as)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: Judg (as)", ->
		`
		expect(p.parse("বিচাৰকর্তাবিলাক 1:1").osis()).toEqual("Judg.1.1")
		expect(p.parse("বিচাৰ 1:1").osis()).toEqual("Judg.1.1")
		expect(p.parse("Judg 1:1").osis()).toEqual("Judg.1.1")
		p.include_apocrypha(false)
		expect(p.parse("বিচাৰকর্তাবিলাক 1:1").osis()).toEqual("Judg.1.1")
		expect(p.parse("বিচাৰ 1:1").osis()).toEqual("Judg.1.1")
		expect(p.parse("JUDG 1:1").osis()).toEqual("Judg.1.1")
		`
		true
describe "Localized book Ruth (as)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: Ruth (as)", ->
		`
		expect(p.parse("Ruth 1:1").osis()).toEqual("Ruth.1.1")
		expect(p.parse("ৰূথ 1:1").osis()).toEqual("Ruth.1.1")
		p.include_apocrypha(false)
		expect(p.parse("RUTH 1:1").osis()).toEqual("Ruth.1.1")
		expect(p.parse("ৰূথ 1:1").osis()).toEqual("Ruth.1.1")
		`
		true
describe "Localized book 1Esd (as)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: 1Esd (as)", ->
		`
		expect(p.parse("1Esd 1:1").osis()).toEqual("1Esd.1.1")
		`
		true
describe "Localized book 2Esd (as)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: 2Esd (as)", ->
		`
		expect(p.parse("2Esd 1:1").osis()).toEqual("2Esd.1.1")
		`
		true
describe "Localized book Isa (as)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: Isa (as)", ->
		`
		expect(p.parse("যিচয়া 1:1").osis()).toEqual("Isa.1.1")
		expect(p.parse("Isa 1:1").osis()).toEqual("Isa.1.1")
		expect(p.parse("যিচ 1:1").osis()).toEqual("Isa.1.1")
		p.include_apocrypha(false)
		expect(p.parse("যিচয়া 1:1").osis()).toEqual("Isa.1.1")
		expect(p.parse("ISA 1:1").osis()).toEqual("Isa.1.1")
		expect(p.parse("যিচ 1:1").osis()).toEqual("Isa.1.1")
		`
		true
describe "Localized book 2Sam (as)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: 2Sam (as)", ->
		`
		expect(p.parse("2. চমূৱেল 1:1").osis()).toEqual("2Sam.1.1")
		expect(p.parse("2 চমূৱেল 1:1").osis()).toEqual("2Sam.1.1")
		expect(p.parse("২ চমূৱেল 1:1").osis()).toEqual("2Sam.1.1")
		expect(p.parse("2. চমূ 1:1").osis()).toEqual("2Sam.1.1")
		expect(p.parse("2 চমূ 1:1").osis()).toEqual("2Sam.1.1")
		expect(p.parse("২ চমূ 1:1").osis()).toEqual("2Sam.1.1")
		expect(p.parse("2Sam 1:1").osis()).toEqual("2Sam.1.1")
		`
		true
	it "should handle non-Latin digits in book: 2Sam (as)", ->
		p.set_options non_latin_digits_strategy: "replace"
		`
		expect(p.parse("2. চমূৱেল 1:1").osis()).toEqual("2Sam.1.1")
		expect(p.parse("2 চমূৱেল 1:1").osis()).toEqual("2Sam.1.1")
		expect(p.parse("২ চমূৱেল 1:1").osis()).toEqual("2Sam.1.1")
		expect(p.parse("2. চমূ 1:1").osis()).toEqual("2Sam.1.1")
		expect(p.parse("2 চমূ 1:1").osis()).toEqual("2Sam.1.1")
		expect(p.parse("২ চমূ 1:1").osis()).toEqual("2Sam.1.1")
		expect(p.parse("2Sam 1:1").osis()).toEqual("2Sam.1.1")
		p.include_apocrypha(false)
		expect(p.parse("2. চমূৱেল 1:1").osis()).toEqual("2Sam.1.1")
		expect(p.parse("2 চমূৱেল 1:1").osis()).toEqual("2Sam.1.1")
		expect(p.parse("২ চমূৱেল 1:1").osis()).toEqual("2Sam.1.1")
		expect(p.parse("2. চমূ 1:1").osis()).toEqual("2Sam.1.1")
		expect(p.parse("2 চমূ 1:1").osis()).toEqual("2Sam.1.1")
		expect(p.parse("২ চমূ 1:1").osis()).toEqual("2Sam.1.1")
		expect(p.parse("2SAM 1:1").osis()).toEqual("2Sam.1.1")
		`
		true
describe "Localized book 1Sam (as)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: 1Sam (as)", ->
		`
		expect(p.parse("1. চমূৱেল 1:1").osis()).toEqual("1Sam.1.1")
		expect(p.parse("1 চমূৱেল 1:1").osis()).toEqual("1Sam.1.1")
		expect(p.parse("১ চমূৱেল 1:1").osis()).toEqual("1Sam.1.1")
		expect(p.parse("1. চমূ 1:1").osis()).toEqual("1Sam.1.1")
		expect(p.parse("1 চমূ 1:1").osis()).toEqual("1Sam.1.1")
		expect(p.parse("১ চমূ 1:1").osis()).toEqual("1Sam.1.1")
		expect(p.parse("1Sam 1:1").osis()).toEqual("1Sam.1.1")
		`
		true
	it "should handle non-Latin digits in book: 1Sam (as)", ->
		p.set_options non_latin_digits_strategy: "replace"
		`
		expect(p.parse("1. চমূৱেল 1:1").osis()).toEqual("1Sam.1.1")
		expect(p.parse("1 চমূৱেল 1:1").osis()).toEqual("1Sam.1.1")
		expect(p.parse("১ চমূৱেল 1:1").osis()).toEqual("1Sam.1.1")
		expect(p.parse("1. চমূ 1:1").osis()).toEqual("1Sam.1.1")
		expect(p.parse("1 চমূ 1:1").osis()).toEqual("1Sam.1.1")
		expect(p.parse("১ চমূ 1:1").osis()).toEqual("1Sam.1.1")
		expect(p.parse("1Sam 1:1").osis()).toEqual("1Sam.1.1")
		p.include_apocrypha(false)
		expect(p.parse("1. চমূৱেল 1:1").osis()).toEqual("1Sam.1.1")
		expect(p.parse("1 চমূৱেল 1:1").osis()).toEqual("1Sam.1.1")
		expect(p.parse("১ চমূৱেল 1:1").osis()).toEqual("1Sam.1.1")
		expect(p.parse("1. চমূ 1:1").osis()).toEqual("1Sam.1.1")
		expect(p.parse("1 চমূ 1:1").osis()).toEqual("1Sam.1.1")
		expect(p.parse("১ চমূ 1:1").osis()).toEqual("1Sam.1.1")
		expect(p.parse("1SAM 1:1").osis()).toEqual("1Sam.1.1")
		`
		true
describe "Localized book 2Kgs (as)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: 2Kgs (as)", ->
		`
		expect(p.parse("2. ৰাজাৱলি 1:1").osis()).toEqual("2Kgs.1.1")
		expect(p.parse("2 ৰাজাৱলি 1:1").osis()).toEqual("2Kgs.1.1")
		expect(p.parse("২ ৰাজাৱলি 1:1").osis()).toEqual("2Kgs.1.1")
		expect(p.parse("2. ৰাজা 1:1").osis()).toEqual("2Kgs.1.1")
		expect(p.parse("2 ৰাজা 1:1").osis()).toEqual("2Kgs.1.1")
		expect(p.parse("২ ৰাজা 1:1").osis()).toEqual("2Kgs.1.1")
		expect(p.parse("2Kgs 1:1").osis()).toEqual("2Kgs.1.1")
		`
		true
	it "should handle non-Latin digits in book: 2Kgs (as)", ->
		p.set_options non_latin_digits_strategy: "replace"
		`
		expect(p.parse("2. ৰাজাৱলি 1:1").osis()).toEqual("2Kgs.1.1")
		expect(p.parse("2 ৰাজাৱলি 1:1").osis()).toEqual("2Kgs.1.1")
		expect(p.parse("২ ৰাজাৱলি 1:1").osis()).toEqual("2Kgs.1.1")
		expect(p.parse("2. ৰাজা 1:1").osis()).toEqual("2Kgs.1.1")
		expect(p.parse("2 ৰাজা 1:1").osis()).toEqual("2Kgs.1.1")
		expect(p.parse("২ ৰাজা 1:1").osis()).toEqual("2Kgs.1.1")
		expect(p.parse("2Kgs 1:1").osis()).toEqual("2Kgs.1.1")
		p.include_apocrypha(false)
		expect(p.parse("2. ৰাজাৱলি 1:1").osis()).toEqual("2Kgs.1.1")
		expect(p.parse("2 ৰাজাৱলি 1:1").osis()).toEqual("2Kgs.1.1")
		expect(p.parse("২ ৰাজাৱলি 1:1").osis()).toEqual("2Kgs.1.1")
		expect(p.parse("2. ৰাজা 1:1").osis()).toEqual("2Kgs.1.1")
		expect(p.parse("2 ৰাজা 1:1").osis()).toEqual("2Kgs.1.1")
		expect(p.parse("২ ৰাজা 1:1").osis()).toEqual("2Kgs.1.1")
		expect(p.parse("2KGS 1:1").osis()).toEqual("2Kgs.1.1")
		`
		true
describe "Localized book 1Kgs (as)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: 1Kgs (as)", ->
		`
		expect(p.parse("1. ৰাজাৱলী 1:1").osis()).toEqual("1Kgs.1.1")
		expect(p.parse("1 ৰাজাৱলী 1:1").osis()).toEqual("1Kgs.1.1")
		expect(p.parse("১ ৰাজাৱলী 1:1").osis()).toEqual("1Kgs.1.1")
		expect(p.parse("1. ৰাজা 1:1").osis()).toEqual("1Kgs.1.1")
		expect(p.parse("1 ৰাজা 1:1").osis()).toEqual("1Kgs.1.1")
		expect(p.parse("১ ৰাজা 1:1").osis()).toEqual("1Kgs.1.1")
		expect(p.parse("1Kgs 1:1").osis()).toEqual("1Kgs.1.1")
		`
		true
	it "should handle non-Latin digits in book: 1Kgs (as)", ->
		p.set_options non_latin_digits_strategy: "replace"
		`
		expect(p.parse("1. ৰাজাৱলী 1:1").osis()).toEqual("1Kgs.1.1")
		expect(p.parse("1 ৰাজাৱলী 1:1").osis()).toEqual("1Kgs.1.1")
		expect(p.parse("১ ৰাজাৱলী 1:1").osis()).toEqual("1Kgs.1.1")
		expect(p.parse("1. ৰাজা 1:1").osis()).toEqual("1Kgs.1.1")
		expect(p.parse("1 ৰাজা 1:1").osis()).toEqual("1Kgs.1.1")
		expect(p.parse("১ ৰাজা 1:1").osis()).toEqual("1Kgs.1.1")
		expect(p.parse("1Kgs 1:1").osis()).toEqual("1Kgs.1.1")
		p.include_apocrypha(false)
		expect(p.parse("1. ৰাজাৱলী 1:1").osis()).toEqual("1Kgs.1.1")
		expect(p.parse("1 ৰাজাৱলী 1:1").osis()).toEqual("1Kgs.1.1")
		expect(p.parse("১ ৰাজাৱলী 1:1").osis()).toEqual("1Kgs.1.1")
		expect(p.parse("1. ৰাজা 1:1").osis()).toEqual("1Kgs.1.1")
		expect(p.parse("1 ৰাজা 1:1").osis()).toEqual("1Kgs.1.1")
		expect(p.parse("১ ৰাজা 1:1").osis()).toEqual("1Kgs.1.1")
		expect(p.parse("1KGS 1:1").osis()).toEqual("1Kgs.1.1")
		`
		true
describe "Localized book 2Chr (as)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: 2Chr (as)", ->
		`
		expect(p.parse("2. বংশাৱলি 1:1").osis()).toEqual("2Chr.1.1")
		expect(p.parse("2. বংশাৱলী 1:1").osis()).toEqual("2Chr.1.1")
		expect(p.parse("2 বংশাৱলি 1:1").osis()).toEqual("2Chr.1.1")
		expect(p.parse("2 বংশাৱলী 1:1").osis()).toEqual("2Chr.1.1")
		expect(p.parse("২ বংশাৱলি 1:1").osis()).toEqual("2Chr.1.1")
		expect(p.parse("২ বংশাৱলী 1:1").osis()).toEqual("2Chr.1.1")
		expect(p.parse("2. বংশা 1:1").osis()).toEqual("2Chr.1.1")
		expect(p.parse("2 বংশা 1:1").osis()).toEqual("2Chr.1.1")
		expect(p.parse("২ বংশা 1:1").osis()).toEqual("2Chr.1.1")
		expect(p.parse("2Chr 1:1").osis()).toEqual("2Chr.1.1")
		`
		true
	it "should handle non-Latin digits in book: 2Chr (as)", ->
		p.set_options non_latin_digits_strategy: "replace"
		`
		expect(p.parse("2. বংশাৱলি 1:1").osis()).toEqual("2Chr.1.1")
		expect(p.parse("2. বংশাৱলী 1:1").osis()).toEqual("2Chr.1.1")
		expect(p.parse("2 বংশাৱলি 1:1").osis()).toEqual("2Chr.1.1")
		expect(p.parse("2 বংশাৱলী 1:1").osis()).toEqual("2Chr.1.1")
		expect(p.parse("২ বংশাৱলি 1:1").osis()).toEqual("2Chr.1.1")
		expect(p.parse("২ বংশাৱলী 1:1").osis()).toEqual("2Chr.1.1")
		expect(p.parse("2. বংশা 1:1").osis()).toEqual("2Chr.1.1")
		expect(p.parse("2 বংশা 1:1").osis()).toEqual("2Chr.1.1")
		expect(p.parse("২ বংশা 1:1").osis()).toEqual("2Chr.1.1")
		expect(p.parse("2Chr 1:1").osis()).toEqual("2Chr.1.1")
		p.include_apocrypha(false)
		expect(p.parse("2. বংশাৱলি 1:1").osis()).toEqual("2Chr.1.1")
		expect(p.parse("2. বংশাৱলী 1:1").osis()).toEqual("2Chr.1.1")
		expect(p.parse("2 বংশাৱলি 1:1").osis()).toEqual("2Chr.1.1")
		expect(p.parse("2 বংশাৱলী 1:1").osis()).toEqual("2Chr.1.1")
		expect(p.parse("২ বংশাৱলি 1:1").osis()).toEqual("2Chr.1.1")
		expect(p.parse("২ বংশাৱলী 1:1").osis()).toEqual("2Chr.1.1")
		expect(p.parse("2. বংশা 1:1").osis()).toEqual("2Chr.1.1")
		expect(p.parse("2 বংশা 1:1").osis()).toEqual("2Chr.1.1")
		expect(p.parse("২ বংশা 1:1").osis()).toEqual("2Chr.1.1")
		expect(p.parse("2CHR 1:1").osis()).toEqual("2Chr.1.1")
		`
		true
describe "Localized book 1Chr (as)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: 1Chr (as)", ->
		`
		expect(p.parse("1. বংশাৱলি 1:1").osis()).toEqual("1Chr.1.1")
		expect(p.parse("1. বংশাৱলী 1:1").osis()).toEqual("1Chr.1.1")
		expect(p.parse("1 বংশাৱলি 1:1").osis()).toEqual("1Chr.1.1")
		expect(p.parse("1 বংশাৱলী 1:1").osis()).toEqual("1Chr.1.1")
		expect(p.parse("১ বংশাৱলি 1:1").osis()).toEqual("1Chr.1.1")
		expect(p.parse("১ বংশাৱলী 1:1").osis()).toEqual("1Chr.1.1")
		expect(p.parse("1. বংশা 1:1").osis()).toEqual("1Chr.1.1")
		expect(p.parse("1 বংশা 1:1").osis()).toEqual("1Chr.1.1")
		expect(p.parse("১ বংশা 1:1").osis()).toEqual("1Chr.1.1")
		expect(p.parse("1Chr 1:1").osis()).toEqual("1Chr.1.1")
		`
		true
	it "should handle non-Latin digits in book: 1Chr (as)", ->
		p.set_options non_latin_digits_strategy: "replace"
		`
		expect(p.parse("1. বংশাৱলি 1:1").osis()).toEqual("1Chr.1.1")
		expect(p.parse("1. বংশাৱলী 1:1").osis()).toEqual("1Chr.1.1")
		expect(p.parse("1 বংশাৱলি 1:1").osis()).toEqual("1Chr.1.1")
		expect(p.parse("1 বংশাৱলী 1:1").osis()).toEqual("1Chr.1.1")
		expect(p.parse("১ বংশাৱলি 1:1").osis()).toEqual("1Chr.1.1")
		expect(p.parse("১ বংশাৱলী 1:1").osis()).toEqual("1Chr.1.1")
		expect(p.parse("1. বংশা 1:1").osis()).toEqual("1Chr.1.1")
		expect(p.parse("1 বংশা 1:1").osis()).toEqual("1Chr.1.1")
		expect(p.parse("১ বংশা 1:1").osis()).toEqual("1Chr.1.1")
		expect(p.parse("1Chr 1:1").osis()).toEqual("1Chr.1.1")
		p.include_apocrypha(false)
		expect(p.parse("1. বংশাৱলি 1:1").osis()).toEqual("1Chr.1.1")
		expect(p.parse("1. বংশাৱলী 1:1").osis()).toEqual("1Chr.1.1")
		expect(p.parse("1 বংশাৱলি 1:1").osis()).toEqual("1Chr.1.1")
		expect(p.parse("1 বংশাৱলী 1:1").osis()).toEqual("1Chr.1.1")
		expect(p.parse("১ বংশাৱলি 1:1").osis()).toEqual("1Chr.1.1")
		expect(p.parse("১ বংশাৱলী 1:1").osis()).toEqual("1Chr.1.1")
		expect(p.parse("1. বংশা 1:1").osis()).toEqual("1Chr.1.1")
		expect(p.parse("1 বংশা 1:1").osis()).toEqual("1Chr.1.1")
		expect(p.parse("১ বংশা 1:1").osis()).toEqual("1Chr.1.1")
		expect(p.parse("1CHR 1:1").osis()).toEqual("1Chr.1.1")
		`
		true
describe "Localized book Ezra (as)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: Ezra (as)", ->
		`
		expect(p.parse("ইজ্ৰা 1:1").osis()).toEqual("Ezra.1.1")
		expect(p.parse("Ezra 1:1").osis()).toEqual("Ezra.1.1")
		p.include_apocrypha(false)
		expect(p.parse("ইজ্ৰা 1:1").osis()).toEqual("Ezra.1.1")
		expect(p.parse("EZRA 1:1").osis()).toEqual("Ezra.1.1")
		`
		true
describe "Localized book Neh (as)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: Neh (as)", ->
		`
		expect(p.parse("নহিমিয়া 1:1").osis()).toEqual("Neh.1.1")
		expect(p.parse("নহিমীয়া 1:1").osis()).toEqual("Neh.1.1")
		expect(p.parse("Neh 1:1").osis()).toEqual("Neh.1.1")
		expect(p.parse("নহি 1:1").osis()).toEqual("Neh.1.1")
		p.include_apocrypha(false)
		expect(p.parse("নহিমিয়া 1:1").osis()).toEqual("Neh.1.1")
		expect(p.parse("নহিমীয়া 1:1").osis()).toEqual("Neh.1.1")
		expect(p.parse("NEH 1:1").osis()).toEqual("Neh.1.1")
		expect(p.parse("নহি 1:1").osis()).toEqual("Neh.1.1")
		`
		true
describe "Localized book GkEsth (as)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: GkEsth (as)", ->
		`
		expect(p.parse("GkEsth 1:1").osis()).toEqual("GkEsth.1.1")
		`
		true
describe "Localized book Esth (as)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: Esth (as)", ->
		`
		expect(p.parse("ইষ্টেৰ 1:1").osis()).toEqual("Esth.1.1")
		expect(p.parse("Esth 1:1").osis()).toEqual("Esth.1.1")
		expect(p.parse("ইষ্ট 1:1").osis()).toEqual("Esth.1.1")
		p.include_apocrypha(false)
		expect(p.parse("ইষ্টেৰ 1:1").osis()).toEqual("Esth.1.1")
		expect(p.parse("ESTH 1:1").osis()).toEqual("Esth.1.1")
		expect(p.parse("ইষ্ট 1:1").osis()).toEqual("Esth.1.1")
		`
		true
describe "Localized book Job (as)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: Job (as)", ->
		`
		expect(p.parse("ইয়োব 1:1").osis()).toEqual("Job.1.1")
		expect(p.parse("ইয়ো 1:1").osis()).toEqual("Job.1.1")
		expect(p.parse("Job 1:1").osis()).toEqual("Job.1.1")
		p.include_apocrypha(false)
		expect(p.parse("ইয়োব 1:1").osis()).toEqual("Job.1.1")
		expect(p.parse("ইয়ো 1:1").osis()).toEqual("Job.1.1")
		expect(p.parse("JOB 1:1").osis()).toEqual("Job.1.1")
		`
		true
describe "Localized book Ps (as)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: Ps (as)", ->
		`
		expect(p.parse("গীতমালাল 1:1").osis()).toEqual("Ps.1.1")
		expect(p.parse("গীতমালা 1:1").osis()).toEqual("Ps.1.1")
		expect(p.parse("গীত 1:1").osis()).toEqual("Ps.1.1")
		expect(p.parse("দীত 1:1").osis()).toEqual("Ps.1.1")
		expect(p.parse("Ps 1:1").osis()).toEqual("Ps.1.1")
		p.include_apocrypha(false)
		expect(p.parse("গীতমালাল 1:1").osis()).toEqual("Ps.1.1")
		expect(p.parse("গীতমালা 1:1").osis()).toEqual("Ps.1.1")
		expect(p.parse("গীত 1:1").osis()).toEqual("Ps.1.1")
		expect(p.parse("দীত 1:1").osis()).toEqual("Ps.1.1")
		expect(p.parse("PS 1:1").osis()).toEqual("Ps.1.1")
		`
		true
describe "Localized book PrAzar (as)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: PrAzar (as)", ->
		`
		expect(p.parse("PrAzar 1:1").osis()).toEqual("PrAzar.1.1")
		`
		true
describe "Localized book Prov (as)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: Prov (as)", ->
		`
		expect(p.parse("হিতোপদেশ 1:1").osis()).toEqual("Prov.1.1")
		expect(p.parse("Prov 1:1").osis()).toEqual("Prov.1.1")
		expect(p.parse("হিতো 1:1").osis()).toEqual("Prov.1.1")
		p.include_apocrypha(false)
		expect(p.parse("হিতোপদেশ 1:1").osis()).toEqual("Prov.1.1")
		expect(p.parse("PROV 1:1").osis()).toEqual("Prov.1.1")
		expect(p.parse("হিতো 1:1").osis()).toEqual("Prov.1.1")
		`
		true
describe "Localized book Eccl (as)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: Eccl (as)", ->
		`
		expect(p.parse("উপদেশক 1:1").osis()).toEqual("Eccl.1.1")
		expect(p.parse("Eccl 1:1").osis()).toEqual("Eccl.1.1")
		expect(p.parse("উপ 1:1").osis()).toEqual("Eccl.1.1")
		p.include_apocrypha(false)
		expect(p.parse("উপদেশক 1:1").osis()).toEqual("Eccl.1.1")
		expect(p.parse("ECCL 1:1").osis()).toEqual("Eccl.1.1")
		expect(p.parse("উপ 1:1").osis()).toEqual("Eccl.1.1")
		`
		true
describe "Localized book SgThree (as)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: SgThree (as)", ->
		`
		expect(p.parse("SgThree 1:1").osis()).toEqual("SgThree.1.1")
		`
		true
describe "Localized book Song (as)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: Song (as)", ->
		`
		expect(p.parse("পৰমগীত 1:1").osis()).toEqual("Song.1.1")
		expect(p.parse("Song 1:1").osis()).toEqual("Song.1.1")
		expect(p.parse("পৰম 1:1").osis()).toEqual("Song.1.1")
		p.include_apocrypha(false)
		expect(p.parse("পৰমগীত 1:1").osis()).toEqual("Song.1.1")
		expect(p.parse("SONG 1:1").osis()).toEqual("Song.1.1")
		expect(p.parse("পৰম 1:1").osis()).toEqual("Song.1.1")
		`
		true
describe "Localized book Jer (as)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: Jer (as)", ->
		`
		expect(p.parse("যিৰিমিয়া 1:1").osis()).toEqual("Jer.1.1")
		expect(p.parse("যিৰি 1:1").osis()).toEqual("Jer.1.1")
		expect(p.parse("Jer 1:1").osis()).toEqual("Jer.1.1")
		p.include_apocrypha(false)
		expect(p.parse("যিৰিমিয়া 1:1").osis()).toEqual("Jer.1.1")
		expect(p.parse("যিৰি 1:1").osis()).toEqual("Jer.1.1")
		expect(p.parse("JER 1:1").osis()).toEqual("Jer.1.1")
		`
		true
describe "Localized book Ezek (as)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: Ezek (as)", ->
		`
		expect(p.parse("যিহিষ্কেল 1:1").osis()).toEqual("Ezek.1.1")
		expect(p.parse("Ezek 1:1").osis()).toEqual("Ezek.1.1")
		expect(p.parse("যিহি 1:1").osis()).toEqual("Ezek.1.1")
		p.include_apocrypha(false)
		expect(p.parse("যিহিষ্কেল 1:1").osis()).toEqual("Ezek.1.1")
		expect(p.parse("EZEK 1:1").osis()).toEqual("Ezek.1.1")
		expect(p.parse("যিহি 1:1").osis()).toEqual("Ezek.1.1")
		`
		true
describe "Localized book Dan (as)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: Dan (as)", ->
		`
		expect(p.parse("দানিয়েল 1:1").osis()).toEqual("Dan.1.1")
		expect(p.parse("দানি 1:1").osis()).toEqual("Dan.1.1")
		expect(p.parse("Dan 1:1").osis()).toEqual("Dan.1.1")
		p.include_apocrypha(false)
		expect(p.parse("দানিয়েল 1:1").osis()).toEqual("Dan.1.1")
		expect(p.parse("দানি 1:1").osis()).toEqual("Dan.1.1")
		expect(p.parse("DAN 1:1").osis()).toEqual("Dan.1.1")
		`
		true
describe "Localized book Hos (as)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: Hos (as)", ->
		`
		expect(p.parse("হোচেয়া 1:1").osis()).toEqual("Hos.1.1")
		expect(p.parse("Hos 1:1").osis()).toEqual("Hos.1.1")
		expect(p.parse("হোচ 1:1").osis()).toEqual("Hos.1.1")
		p.include_apocrypha(false)
		expect(p.parse("হোচেয়া 1:1").osis()).toEqual("Hos.1.1")
		expect(p.parse("HOS 1:1").osis()).toEqual("Hos.1.1")
		expect(p.parse("হোচ 1:1").osis()).toEqual("Hos.1.1")
		`
		true
describe "Localized book Joel (as)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: Joel (as)", ->
		`
		expect(p.parse("যোৱেল 1:1").osis()).toEqual("Joel.1.1")
		expect(p.parse("Joel 1:1").osis()).toEqual("Joel.1.1")
		expect(p.parse("যোৱে 1:1").osis()).toEqual("Joel.1.1")
		p.include_apocrypha(false)
		expect(p.parse("যোৱেল 1:1").osis()).toEqual("Joel.1.1")
		expect(p.parse("JOEL 1:1").osis()).toEqual("Joel.1.1")
		expect(p.parse("যোৱে 1:1").osis()).toEqual("Joel.1.1")
		`
		true
describe "Localized book Amos (as)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: Amos (as)", ->
		`
		expect(p.parse("Amos 1:1").osis()).toEqual("Amos.1.1")
		expect(p.parse("আমোচ 1:1").osis()).toEqual("Amos.1.1")
		expect(p.parse("আমো 1:1").osis()).toEqual("Amos.1.1")
		p.include_apocrypha(false)
		expect(p.parse("AMOS 1:1").osis()).toEqual("Amos.1.1")
		expect(p.parse("আমোচ 1:1").osis()).toEqual("Amos.1.1")
		expect(p.parse("আমো 1:1").osis()).toEqual("Amos.1.1")
		`
		true
describe "Localized book Obad (as)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: Obad (as)", ->
		`
		expect(p.parse("ওবদিয়া 1:1").osis()).toEqual("Obad.1.1")
		expect(p.parse("Obad 1:1").osis()).toEqual("Obad.1.1")
		expect(p.parse("ওবদি 1:1").osis()).toEqual("Obad.1.1")
		p.include_apocrypha(false)
		expect(p.parse("ওবদিয়া 1:1").osis()).toEqual("Obad.1.1")
		expect(p.parse("OBAD 1:1").osis()).toEqual("Obad.1.1")
		expect(p.parse("ওবদি 1:1").osis()).toEqual("Obad.1.1")
		`
		true
describe "Localized book Jonah (as)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: Jonah (as)", ->
		`
		expect(p.parse("Jonah 1:1").osis()).toEqual("Jonah.1.1")
		expect(p.parse("যোনা 1:1").osis()).toEqual("Jonah.1.1")
		p.include_apocrypha(false)
		expect(p.parse("JONAH 1:1").osis()).toEqual("Jonah.1.1")
		expect(p.parse("যোনা 1:1").osis()).toEqual("Jonah.1.1")
		`
		true
describe "Localized book Mic (as)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: Mic (as)", ->
		`
		expect(p.parse("মীখা 1:1").osis()).toEqual("Mic.1.1")
		expect(p.parse("Mic 1:1").osis()).toEqual("Mic.1.1")
		expect(p.parse("মীখ 1:1").osis()).toEqual("Mic.1.1")
		p.include_apocrypha(false)
		expect(p.parse("মীখা 1:1").osis()).toEqual("Mic.1.1")
		expect(p.parse("MIC 1:1").osis()).toEqual("Mic.1.1")
		expect(p.parse("মীখ 1:1").osis()).toEqual("Mic.1.1")
		`
		true
describe "Localized book Nah (as)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: Nah (as)", ->
		`
		expect(p.parse("নহূম 1:1").osis()).toEqual("Nah.1.1")
		expect(p.parse("Nah 1:1").osis()).toEqual("Nah.1.1")
		expect(p.parse("নহূ 1:1").osis()).toEqual("Nah.1.1")
		p.include_apocrypha(false)
		expect(p.parse("নহূম 1:1").osis()).toEqual("Nah.1.1")
		expect(p.parse("NAH 1:1").osis()).toEqual("Nah.1.1")
		expect(p.parse("নহূ 1:1").osis()).toEqual("Nah.1.1")
		`
		true
describe "Localized book Hab (as)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: Hab (as)", ->
		`
		expect(p.parse("হবক্কুক 1:1").osis()).toEqual("Hab.1.1")
		expect(p.parse("Hab 1:1").osis()).toEqual("Hab.1.1")
		expect(p.parse("হব 1:1").osis()).toEqual("Hab.1.1")
		p.include_apocrypha(false)
		expect(p.parse("হবক্কুক 1:1").osis()).toEqual("Hab.1.1")
		expect(p.parse("HAB 1:1").osis()).toEqual("Hab.1.1")
		expect(p.parse("হব 1:1").osis()).toEqual("Hab.1.1")
		`
		true
describe "Localized book Zeph (as)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: Zeph (as)", ->
		`
		expect(p.parse("চফনিয়া 1:1").osis()).toEqual("Zeph.1.1")
		expect(p.parse("Zeph 1:1").osis()).toEqual("Zeph.1.1")
		expect(p.parse("চফ 1:1").osis()).toEqual("Zeph.1.1")
		p.include_apocrypha(false)
		expect(p.parse("চফনিয়া 1:1").osis()).toEqual("Zeph.1.1")
		expect(p.parse("ZEPH 1:1").osis()).toEqual("Zeph.1.1")
		expect(p.parse("চফ 1:1").osis()).toEqual("Zeph.1.1")
		`
		true
describe "Localized book Hag (as)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: Hag (as)", ->
		`
		expect(p.parse("হ্গ্গয় 1:1").osis()).toEqual("Hag.1.1")
		expect(p.parse("হ্গ্গ 1:1").osis()).toEqual("Hag.1.1")
		expect(p.parse("Hag 1:1").osis()).toEqual("Hag.1.1")
		p.include_apocrypha(false)
		expect(p.parse("হ্গ্গয় 1:1").osis()).toEqual("Hag.1.1")
		expect(p.parse("হ্গ্গ 1:1").osis()).toEqual("Hag.1.1")
		expect(p.parse("HAG 1:1").osis()).toEqual("Hag.1.1")
		`
		true
describe "Localized book Zech (as)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: Zech (as)", ->
		`
		expect(p.parse("জখৰিয়া 1:1").osis()).toEqual("Zech.1.1")
		expect(p.parse("Zech 1:1").osis()).toEqual("Zech.1.1")
		expect(p.parse("জখ 1:1").osis()).toEqual("Zech.1.1")
		p.include_apocrypha(false)
		expect(p.parse("জখৰিয়া 1:1").osis()).toEqual("Zech.1.1")
		expect(p.parse("ZECH 1:1").osis()).toEqual("Zech.1.1")
		expect(p.parse("জখ 1:1").osis()).toEqual("Zech.1.1")
		`
		true
describe "Localized book Mal (as)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: Mal (as)", ->
		`
		expect(p.parse("মলাখী 1:1").osis()).toEqual("Mal.1.1")
		expect(p.parse("Mal 1:1").osis()).toEqual("Mal.1.1")
		expect(p.parse("মলা 1:1").osis()).toEqual("Mal.1.1")
		p.include_apocrypha(false)
		expect(p.parse("মলাখী 1:1").osis()).toEqual("Mal.1.1")
		expect(p.parse("MAL 1:1").osis()).toEqual("Mal.1.1")
		expect(p.parse("মলা 1:1").osis()).toEqual("Mal.1.1")
		`
		true
describe "Localized book Matt (as)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: Matt (as)", ->
		`
		expect(p.parse("মথিয়ে লিখা শুভবাৰ্তা 1:1").osis()).toEqual("Matt.1.1")
		expect(p.parse("Matt 1:1").osis()).toEqual("Matt.1.1")
		expect(p.parse("মথি 1:1").osis()).toEqual("Matt.1.1")
		p.include_apocrypha(false)
		expect(p.parse("মথিয়ে লিখা শুভবাৰ্তা 1:1").osis()).toEqual("Matt.1.1")
		expect(p.parse("MATT 1:1").osis()).toEqual("Matt.1.1")
		expect(p.parse("মথি 1:1").osis()).toEqual("Matt.1.1")
		`
		true
describe "Localized book Mark (as)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: Mark (as)", ->
		`
		expect(p.parse("মাৰ্কে লিখা শুভবাৰ্তা 1:1").osis()).toEqual("Mark.1.1")
		expect(p.parse("মাৰ্ক 1:1").osis()).toEqual("Mark.1.1")
		expect(p.parse("Mark 1:1").osis()).toEqual("Mark.1.1")
		p.include_apocrypha(false)
		expect(p.parse("মাৰ্কে লিখা শুভবাৰ্তা 1:1").osis()).toEqual("Mark.1.1")
		expect(p.parse("মাৰ্ক 1:1").osis()).toEqual("Mark.1.1")
		expect(p.parse("MARK 1:1").osis()).toEqual("Mark.1.1")
		`
		true
describe "Localized book Luke (as)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: Luke (as)", ->
		`
		expect(p.parse("লূকে লিখা শুভবার্তা 1:1").osis()).toEqual("Luke.1.1")
		expect(p.parse("Luke 1:1").osis()).toEqual("Luke.1.1")
		expect(p.parse("লুক 1:1").osis()).toEqual("Luke.1.1")
		expect(p.parse("লূক 1:1").osis()).toEqual("Luke.1.1")
		p.include_apocrypha(false)
		expect(p.parse("লূকে লিখা শুভবার্তা 1:1").osis()).toEqual("Luke.1.1")
		expect(p.parse("LUKE 1:1").osis()).toEqual("Luke.1.1")
		expect(p.parse("লুক 1:1").osis()).toEqual("Luke.1.1")
		expect(p.parse("লূক 1:1").osis()).toEqual("Luke.1.1")
		`
		true
describe "Localized book 1John (as)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: 1John (as)", ->
		`
		expect(p.parse("1. যোহন 1:1").osis()).toEqual("1John.1.1")
		expect(p.parse("1 যোহন 1:1").osis()).toEqual("1John.1.1")
		expect(p.parse("১ যোহন 1:1").osis()).toEqual("1John.1.1")
		expect(p.parse("1John 1:1").osis()).toEqual("1John.1.1")
		`
		true
	it "should handle non-Latin digits in book: 1John (as)", ->
		p.set_options non_latin_digits_strategy: "replace"
		`
		expect(p.parse("1. যোহন 1:1").osis()).toEqual("1John.1.1")
		expect(p.parse("1 যোহন 1:1").osis()).toEqual("1John.1.1")
		expect(p.parse("১ যোহন 1:1").osis()).toEqual("1John.1.1")
		expect(p.parse("1John 1:1").osis()).toEqual("1John.1.1")
		p.include_apocrypha(false)
		expect(p.parse("1. যোহন 1:1").osis()).toEqual("1John.1.1")
		expect(p.parse("1 যোহন 1:1").osis()).toEqual("1John.1.1")
		expect(p.parse("১ যোহন 1:1").osis()).toEqual("1John.1.1")
		expect(p.parse("1JOHN 1:1").osis()).toEqual("1John.1.1")
		`
		true
describe "Localized book 2John (as)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: 2John (as)", ->
		`
		expect(p.parse("2. যোহন 1:1").osis()).toEqual("2John.1.1")
		expect(p.parse("2 যোহন 1:1").osis()).toEqual("2John.1.1")
		expect(p.parse("২ যোহন 1:1").osis()).toEqual("2John.1.1")
		expect(p.parse("2John 1:1").osis()).toEqual("2John.1.1")
		`
		true
	it "should handle non-Latin digits in book: 2John (as)", ->
		p.set_options non_latin_digits_strategy: "replace"
		`
		expect(p.parse("2. যোহন 1:1").osis()).toEqual("2John.1.1")
		expect(p.parse("2 যোহন 1:1").osis()).toEqual("2John.1.1")
		expect(p.parse("২ যোহন 1:1").osis()).toEqual("2John.1.1")
		expect(p.parse("2John 1:1").osis()).toEqual("2John.1.1")
		p.include_apocrypha(false)
		expect(p.parse("2. যোহন 1:1").osis()).toEqual("2John.1.1")
		expect(p.parse("2 যোহন 1:1").osis()).toEqual("2John.1.1")
		expect(p.parse("২ যোহন 1:1").osis()).toEqual("2John.1.1")
		expect(p.parse("2JOHN 1:1").osis()).toEqual("2John.1.1")
		`
		true
describe "Localized book 3John (as)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: 3John (as)", ->
		`
		expect(p.parse("3. যোহন 1:1").osis()).toEqual("3John.1.1")
		expect(p.parse("3 যোহন 1:1").osis()).toEqual("3John.1.1")
		expect(p.parse("৩ যোহন 1:1").osis()).toEqual("3John.1.1")
		expect(p.parse("3John 1:1").osis()).toEqual("3John.1.1")
		`
		true
	it "should handle non-Latin digits in book: 3John (as)", ->
		p.set_options non_latin_digits_strategy: "replace"
		`
		expect(p.parse("3. যোহন 1:1").osis()).toEqual("3John.1.1")
		expect(p.parse("3 যোহন 1:1").osis()).toEqual("3John.1.1")
		expect(p.parse("৩ যোহন 1:1").osis()).toEqual("3John.1.1")
		expect(p.parse("3John 1:1").osis()).toEqual("3John.1.1")
		p.include_apocrypha(false)
		expect(p.parse("3. যোহন 1:1").osis()).toEqual("3John.1.1")
		expect(p.parse("3 যোহন 1:1").osis()).toEqual("3John.1.1")
		expect(p.parse("৩ যোহন 1:1").osis()).toEqual("3John.1.1")
		expect(p.parse("3JOHN 1:1").osis()).toEqual("3John.1.1")
		`
		true
describe "Localized book John (as)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: John (as)", ->
		`
		expect(p.parse("যোহনে লিখা শুভবাৰ্তা 1:1").osis()).toEqual("John.1.1")
		expect(p.parse("John 1:1").osis()).toEqual("John.1.1")
		expect(p.parse("যোহন 1:1").osis()).toEqual("John.1.1")
		p.include_apocrypha(false)
		expect(p.parse("যোহনে লিখা শুভবাৰ্তা 1:1").osis()).toEqual("John.1.1")
		expect(p.parse("JOHN 1:1").osis()).toEqual("John.1.1")
		expect(p.parse("যোহন 1:1").osis()).toEqual("John.1.1")
		`
		true
describe "Localized book Acts (as)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: Acts (as)", ->
		`
		expect(p.parse("পাঁচনি সকলৰ কৰ্ম 1:1").osis()).toEqual("Acts.1.1")
		expect(p.parse("পাঁচনি 1:1").osis()).toEqual("Acts.1.1")
		expect(p.parse("Acts 1:1").osis()).toEqual("Acts.1.1")
		p.include_apocrypha(false)
		expect(p.parse("পাঁচনি সকলৰ কৰ্ম 1:1").osis()).toEqual("Acts.1.1")
		expect(p.parse("পাঁচনি 1:1").osis()).toEqual("Acts.1.1")
		expect(p.parse("ACTS 1:1").osis()).toEqual("Acts.1.1")
		`
		true
describe "Localized book Rom (as)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: Rom (as)", ->
		`
		expect(p.parse("ৰোমীয়াসকলৰ প্ৰতি পত্ৰ 1:1").osis()).toEqual("Rom.1.1")
		expect(p.parse("ৰোমীয়া 1:1").osis()).toEqual("Rom.1.1")
		expect(p.parse("Rom 1:1").osis()).toEqual("Rom.1.1")
		p.include_apocrypha(false)
		expect(p.parse("ৰোমীয়াসকলৰ প্ৰতি পত্ৰ 1:1").osis()).toEqual("Rom.1.1")
		expect(p.parse("ৰোমীয়া 1:1").osis()).toEqual("Rom.1.1")
		expect(p.parse("ROM 1:1").osis()).toEqual("Rom.1.1")
		`
		true
describe "Localized book 2Cor (as)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: 2Cor (as)", ->
		`
		expect(p.parse("2. কৰিন্থীয়া 1:1").osis()).toEqual("2Cor.1.1")
		expect(p.parse("2 কৰিন্থীয়া 1:1").osis()).toEqual("2Cor.1.1")
		expect(p.parse("২ কৰিন্থীয়া 1:1").osis()).toEqual("2Cor.1.1")
		expect(p.parse("2. কৰি 1:1").osis()).toEqual("2Cor.1.1")
		expect(p.parse("2 কৰি 1:1").osis()).toEqual("2Cor.1.1")
		expect(p.parse("২ কৰি 1:1").osis()).toEqual("2Cor.1.1")
		expect(p.parse("2Cor 1:1").osis()).toEqual("2Cor.1.1")
		`
		true
	it "should handle non-Latin digits in book: 2Cor (as)", ->
		p.set_options non_latin_digits_strategy: "replace"
		`
		expect(p.parse("2. কৰিন্থীয়া 1:1").osis()).toEqual("2Cor.1.1")
		expect(p.parse("2 কৰিন্থীয়া 1:1").osis()).toEqual("2Cor.1.1")
		expect(p.parse("২ কৰিন্থীয়া 1:1").osis()).toEqual("2Cor.1.1")
		expect(p.parse("2. কৰি 1:1").osis()).toEqual("2Cor.1.1")
		expect(p.parse("2 কৰি 1:1").osis()).toEqual("2Cor.1.1")
		expect(p.parse("২ কৰি 1:1").osis()).toEqual("2Cor.1.1")
		expect(p.parse("2Cor 1:1").osis()).toEqual("2Cor.1.1")
		p.include_apocrypha(false)
		expect(p.parse("2. কৰিন্থীয়া 1:1").osis()).toEqual("2Cor.1.1")
		expect(p.parse("2 কৰিন্থীয়া 1:1").osis()).toEqual("2Cor.1.1")
		expect(p.parse("২ কৰিন্থীয়া 1:1").osis()).toEqual("2Cor.1.1")
		expect(p.parse("2. কৰি 1:1").osis()).toEqual("2Cor.1.1")
		expect(p.parse("2 কৰি 1:1").osis()).toEqual("2Cor.1.1")
		expect(p.parse("২ কৰি 1:1").osis()).toEqual("2Cor.1.1")
		expect(p.parse("2COR 1:1").osis()).toEqual("2Cor.1.1")
		`
		true
describe "Localized book 1Cor (as)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: 1Cor (as)", ->
		`
		expect(p.parse("1. কৰিন্থীয়া 1:1").osis()).toEqual("1Cor.1.1")
		expect(p.parse("1 কৰিন্থীয়া 1:1").osis()).toEqual("1Cor.1.1")
		expect(p.parse("১ কৰিন্থীয়া 1:1").osis()).toEqual("1Cor.1.1")
		expect(p.parse("1. কৰি 1:1").osis()).toEqual("1Cor.1.1")
		expect(p.parse("1 কৰি 1:1").osis()).toEqual("1Cor.1.1")
		expect(p.parse("১ কৰি 1:1").osis()).toEqual("1Cor.1.1")
		expect(p.parse("1Cor 1:1").osis()).toEqual("1Cor.1.1")
		`
		true
	it "should handle non-Latin digits in book: 1Cor (as)", ->
		p.set_options non_latin_digits_strategy: "replace"
		`
		expect(p.parse("1. কৰিন্থীয়া 1:1").osis()).toEqual("1Cor.1.1")
		expect(p.parse("1 কৰিন্থীয়া 1:1").osis()).toEqual("1Cor.1.1")
		expect(p.parse("১ কৰিন্থীয়া 1:1").osis()).toEqual("1Cor.1.1")
		expect(p.parse("1. কৰি 1:1").osis()).toEqual("1Cor.1.1")
		expect(p.parse("1 কৰি 1:1").osis()).toEqual("1Cor.1.1")
		expect(p.parse("১ কৰি 1:1").osis()).toEqual("1Cor.1.1")
		expect(p.parse("1Cor 1:1").osis()).toEqual("1Cor.1.1")
		p.include_apocrypha(false)
		expect(p.parse("1. কৰিন্থীয়া 1:1").osis()).toEqual("1Cor.1.1")
		expect(p.parse("1 কৰিন্থীয়া 1:1").osis()).toEqual("1Cor.1.1")
		expect(p.parse("১ কৰিন্থীয়া 1:1").osis()).toEqual("1Cor.1.1")
		expect(p.parse("1. কৰি 1:1").osis()).toEqual("1Cor.1.1")
		expect(p.parse("1 কৰি 1:1").osis()).toEqual("1Cor.1.1")
		expect(p.parse("১ কৰি 1:1").osis()).toEqual("1Cor.1.1")
		expect(p.parse("1COR 1:1").osis()).toEqual("1Cor.1.1")
		`
		true
describe "Localized book Gal (as)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: Gal (as)", ->
		`
		expect(p.parse("গালাতীয়া পত্র 1:1").osis()).toEqual("Gal.1.1")
		expect(p.parse("গালাতীয়া 1:1").osis()).toEqual("Gal.1.1")
		expect(p.parse("গালা 1:1").osis()).toEqual("Gal.1.1")
		expect(p.parse("Gal 1:1").osis()).toEqual("Gal.1.1")
		p.include_apocrypha(false)
		expect(p.parse("গালাতীয়া পত্র 1:1").osis()).toEqual("Gal.1.1")
		expect(p.parse("গালাতীয়া 1:1").osis()).toEqual("Gal.1.1")
		expect(p.parse("গালা 1:1").osis()).toEqual("Gal.1.1")
		expect(p.parse("GAL 1:1").osis()).toEqual("Gal.1.1")
		`
		true
describe "Localized book Eph (as)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: Eph (as)", ->
		`
		expect(p.parse("ইফিচীয়া পত্ৰ 1:1").osis()).toEqual("Eph.1.1")
		expect(p.parse("ইফিচীয়া 1:1").osis()).toEqual("Eph.1.1")
		expect(p.parse("Eph 1:1").osis()).toEqual("Eph.1.1")
		p.include_apocrypha(false)
		expect(p.parse("ইফিচীয়া পত্ৰ 1:1").osis()).toEqual("Eph.1.1")
		expect(p.parse("ইফিচীয়া 1:1").osis()).toEqual("Eph.1.1")
		expect(p.parse("EPH 1:1").osis()).toEqual("Eph.1.1")
		`
		true
describe "Localized book Phil (as)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: Phil (as)", ->
		`
		expect(p.parse("ফিলিপীয়া পত্ৰ 1:1").osis()).toEqual("Phil.1.1")
		expect(p.parse("ফিলিপীয়া 1:1").osis()).toEqual("Phil.1.1")
		expect(p.parse("Phil 1:1").osis()).toEqual("Phil.1.1")
		p.include_apocrypha(false)
		expect(p.parse("ফিলিপীয়া পত্ৰ 1:1").osis()).toEqual("Phil.1.1")
		expect(p.parse("ফিলিপীয়া 1:1").osis()).toEqual("Phil.1.1")
		expect(p.parse("PHIL 1:1").osis()).toEqual("Phil.1.1")
		`
		true
describe "Localized book Col (as)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: Col (as)", ->
		`
		expect(p.parse("কলচীয়া পত্ৰ 1:1").osis()).toEqual("Col.1.1")
		expect(p.parse("কলচীয়া 1:1").osis()).toEqual("Col.1.1")
		expect(p.parse("Col 1:1").osis()).toEqual("Col.1.1")
		p.include_apocrypha(false)
		expect(p.parse("কলচীয়া পত্ৰ 1:1").osis()).toEqual("Col.1.1")
		expect(p.parse("কলচীয়া 1:1").osis()).toEqual("Col.1.1")
		expect(p.parse("COL 1:1").osis()).toEqual("Col.1.1")
		`
		true
describe "Localized book 2Thess (as)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: 2Thess (as)", ->
		`
		expect(p.parse("2. থিচলনীকীয়া 1:1").osis()).toEqual("2Thess.1.1")
		expect(p.parse("2 থিচলনীকীয়া 1:1").osis()).toEqual("2Thess.1.1")
		expect(p.parse("২ থিচলনীকীয়া 1:1").osis()).toEqual("2Thess.1.1")
		expect(p.parse("2Thess 1:1").osis()).toEqual("2Thess.1.1")
		`
		true
	it "should handle non-Latin digits in book: 2Thess (as)", ->
		p.set_options non_latin_digits_strategy: "replace"
		`
		expect(p.parse("2. থিচলনীকীয়া 1:1").osis()).toEqual("2Thess.1.1")
		expect(p.parse("2 থিচলনীকীয়া 1:1").osis()).toEqual("2Thess.1.1")
		expect(p.parse("২ থিচলনীকীয়া 1:1").osis()).toEqual("2Thess.1.1")
		expect(p.parse("2Thess 1:1").osis()).toEqual("2Thess.1.1")
		p.include_apocrypha(false)
		expect(p.parse("2. থিচলনীকীয়া 1:1").osis()).toEqual("2Thess.1.1")
		expect(p.parse("2 থিচলনীকীয়া 1:1").osis()).toEqual("2Thess.1.1")
		expect(p.parse("২ থিচলনীকীয়া 1:1").osis()).toEqual("2Thess.1.1")
		expect(p.parse("2THESS 1:1").osis()).toEqual("2Thess.1.1")
		`
		true
describe "Localized book 1Thess (as)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: 1Thess (as)", ->
		`
		expect(p.parse("1. থিচলনীকীয়া 1:1").osis()).toEqual("1Thess.1.1")
		expect(p.parse("1 থিচলনীকীয়া 1:1").osis()).toEqual("1Thess.1.1")
		expect(p.parse("১ থিচলনীকীয়া 1:1").osis()).toEqual("1Thess.1.1")
		expect(p.parse("1Thess 1:1").osis()).toEqual("1Thess.1.1")
		`
		true
	it "should handle non-Latin digits in book: 1Thess (as)", ->
		p.set_options non_latin_digits_strategy: "replace"
		`
		expect(p.parse("1. থিচলনীকীয়া 1:1").osis()).toEqual("1Thess.1.1")
		expect(p.parse("1 থিচলনীকীয়া 1:1").osis()).toEqual("1Thess.1.1")
		expect(p.parse("১ থিচলনীকীয়া 1:1").osis()).toEqual("1Thess.1.1")
		expect(p.parse("1Thess 1:1").osis()).toEqual("1Thess.1.1")
		p.include_apocrypha(false)
		expect(p.parse("1. থিচলনীকীয়া 1:1").osis()).toEqual("1Thess.1.1")
		expect(p.parse("1 থিচলনীকীয়া 1:1").osis()).toEqual("1Thess.1.1")
		expect(p.parse("১ থিচলনীকীয়া 1:1").osis()).toEqual("1Thess.1.1")
		expect(p.parse("1THESS 1:1").osis()).toEqual("1Thess.1.1")
		`
		true
describe "Localized book 2Tim (as)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: 2Tim (as)", ->
		`
		expect(p.parse("2. তীমথিয় 1:1").osis()).toEqual("2Tim.1.1")
		expect(p.parse("2 তীমথিয় 1:1").osis()).toEqual("2Tim.1.1")
		expect(p.parse("২ তীমথিয় 1:1").osis()).toEqual("2Tim.1.1")
		expect(p.parse("2Tim 1:1").osis()).toEqual("2Tim.1.1")
		`
		true
	it "should handle non-Latin digits in book: 2Tim (as)", ->
		p.set_options non_latin_digits_strategy: "replace"
		`
		expect(p.parse("2. তীমথিয় 1:1").osis()).toEqual("2Tim.1.1")
		expect(p.parse("2 তীমথিয় 1:1").osis()).toEqual("2Tim.1.1")
		expect(p.parse("২ তীমথিয় 1:1").osis()).toEqual("2Tim.1.1")
		expect(p.parse("2Tim 1:1").osis()).toEqual("2Tim.1.1")
		p.include_apocrypha(false)
		expect(p.parse("2. তীমথিয় 1:1").osis()).toEqual("2Tim.1.1")
		expect(p.parse("2 তীমথিয় 1:1").osis()).toEqual("2Tim.1.1")
		expect(p.parse("২ তীমথিয় 1:1").osis()).toEqual("2Tim.1.1")
		expect(p.parse("2TIM 1:1").osis()).toEqual("2Tim.1.1")
		`
		true
describe "Localized book 1Tim (as)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: 1Tim (as)", ->
		`
		expect(p.parse("1. তীমথিয় 1:1").osis()).toEqual("1Tim.1.1")
		expect(p.parse("1 তীমথিয় 1:1").osis()).toEqual("1Tim.1.1")
		expect(p.parse("১ তীমথিয় 1:1").osis()).toEqual("1Tim.1.1")
		expect(p.parse("1Tim 1:1").osis()).toEqual("1Tim.1.1")
		`
		true
	it "should handle non-Latin digits in book: 1Tim (as)", ->
		p.set_options non_latin_digits_strategy: "replace"
		`
		expect(p.parse("1. তীমথিয় 1:1").osis()).toEqual("1Tim.1.1")
		expect(p.parse("1 তীমথিয় 1:1").osis()).toEqual("1Tim.1.1")
		expect(p.parse("১ তীমথিয় 1:1").osis()).toEqual("1Tim.1.1")
		expect(p.parse("1Tim 1:1").osis()).toEqual("1Tim.1.1")
		p.include_apocrypha(false)
		expect(p.parse("1. তীমথিয় 1:1").osis()).toEqual("1Tim.1.1")
		expect(p.parse("1 তীমথিয় 1:1").osis()).toEqual("1Tim.1.1")
		expect(p.parse("১ তীমথিয় 1:1").osis()).toEqual("1Tim.1.1")
		expect(p.parse("1TIM 1:1").osis()).toEqual("1Tim.1.1")
		`
		true
describe "Localized book Titus (as)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: Titus (as)", ->
		`
		expect(p.parse("তীতৰ প্ৰতি পত্ৰ 1:1").osis()).toEqual("Titus.1.1")
		expect(p.parse("Titus 1:1").osis()).toEqual("Titus.1.1")
		expect(p.parse("তীত 1:1").osis()).toEqual("Titus.1.1")
		p.include_apocrypha(false)
		expect(p.parse("তীতৰ প্ৰতি পত্ৰ 1:1").osis()).toEqual("Titus.1.1")
		expect(p.parse("TITUS 1:1").osis()).toEqual("Titus.1.1")
		expect(p.parse("তীত 1:1").osis()).toEqual("Titus.1.1")
		`
		true
describe "Localized book Phlm (as)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: Phlm (as)", ->
		`
		expect(p.parse("ফিলীমনৰ প্ৰতি পত্ৰ 1:1").osis()).toEqual("Phlm.1.1")
		expect(p.parse("ফিলীমন 1:1").osis()).toEqual("Phlm.1.1")
		expect(p.parse("Phlm 1:1").osis()).toEqual("Phlm.1.1")
		p.include_apocrypha(false)
		expect(p.parse("ফিলীমনৰ প্ৰতি পত্ৰ 1:1").osis()).toEqual("Phlm.1.1")
		expect(p.parse("ফিলীমন 1:1").osis()).toEqual("Phlm.1.1")
		expect(p.parse("PHLM 1:1").osis()).toEqual("Phlm.1.1")
		`
		true
describe "Localized book Heb (as)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: Heb (as)", ->
		`
		expect(p.parse("ইব্ৰীসকলৰ প্ৰতি পত্ৰ 1:1").osis()).toEqual("Heb.1.1")
		expect(p.parse("ইব্ৰী 1:1").osis()).toEqual("Heb.1.1")
		expect(p.parse("Heb 1:1").osis()).toEqual("Heb.1.1")
		p.include_apocrypha(false)
		expect(p.parse("ইব্ৰীসকলৰ প্ৰতি পত্ৰ 1:1").osis()).toEqual("Heb.1.1")
		expect(p.parse("ইব্ৰী 1:1").osis()).toEqual("Heb.1.1")
		expect(p.parse("HEB 1:1").osis()).toEqual("Heb.1.1")
		`
		true
describe "Localized book Jas (as)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: Jas (as)", ->
		`
		expect(p.parse("যাকোবৰ পত্ৰ 1:1").osis()).toEqual("Jas.1.1")
		expect(p.parse("যাকোব 1:1").osis()).toEqual("Jas.1.1")
		expect(p.parse("Jas 1:1").osis()).toEqual("Jas.1.1")
		p.include_apocrypha(false)
		expect(p.parse("যাকোবৰ পত্ৰ 1:1").osis()).toEqual("Jas.1.1")
		expect(p.parse("যাকোব 1:1").osis()).toEqual("Jas.1.1")
		expect(p.parse("JAS 1:1").osis()).toEqual("Jas.1.1")
		`
		true
describe "Localized book 2Pet (as)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: 2Pet (as)", ->
		`
		expect(p.parse("2. পিতৰ 1:1").osis()).toEqual("2Pet.1.1")
		expect(p.parse("2 পিতৰ 1:1").osis()).toEqual("2Pet.1.1")
		expect(p.parse("২ পিতৰ 1:1").osis()).toEqual("2Pet.1.1")
		expect(p.parse("2Pet 1:1").osis()).toEqual("2Pet.1.1")
		`
		true
	it "should handle non-Latin digits in book: 2Pet (as)", ->
		p.set_options non_latin_digits_strategy: "replace"
		`
		expect(p.parse("2. পিতৰ 1:1").osis()).toEqual("2Pet.1.1")
		expect(p.parse("2 পিতৰ 1:1").osis()).toEqual("2Pet.1.1")
		expect(p.parse("২ পিতৰ 1:1").osis()).toEqual("2Pet.1.1")
		expect(p.parse("2Pet 1:1").osis()).toEqual("2Pet.1.1")
		p.include_apocrypha(false)
		expect(p.parse("2. পিতৰ 1:1").osis()).toEqual("2Pet.1.1")
		expect(p.parse("2 পিতৰ 1:1").osis()).toEqual("2Pet.1.1")
		expect(p.parse("২ পিতৰ 1:1").osis()).toEqual("2Pet.1.1")
		expect(p.parse("2PET 1:1").osis()).toEqual("2Pet.1.1")
		`
		true
describe "Localized book 1Pet (as)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: 1Pet (as)", ->
		`
		expect(p.parse("1. পিতৰ 1:1").osis()).toEqual("1Pet.1.1")
		expect(p.parse("1 পিতৰ 1:1").osis()).toEqual("1Pet.1.1")
		expect(p.parse("১ পিতৰ 1:1").osis()).toEqual("1Pet.1.1")
		expect(p.parse("1Pet 1:1").osis()).toEqual("1Pet.1.1")
		`
		true
	it "should handle non-Latin digits in book: 1Pet (as)", ->
		p.set_options non_latin_digits_strategy: "replace"
		`
		expect(p.parse("1. পিতৰ 1:1").osis()).toEqual("1Pet.1.1")
		expect(p.parse("1 পিতৰ 1:1").osis()).toEqual("1Pet.1.1")
		expect(p.parse("১ পিতৰ 1:1").osis()).toEqual("1Pet.1.1")
		expect(p.parse("1Pet 1:1").osis()).toEqual("1Pet.1.1")
		p.include_apocrypha(false)
		expect(p.parse("1. পিতৰ 1:1").osis()).toEqual("1Pet.1.1")
		expect(p.parse("1 পিতৰ 1:1").osis()).toEqual("1Pet.1.1")
		expect(p.parse("১ পিতৰ 1:1").osis()).toEqual("1Pet.1.1")
		expect(p.parse("1PET 1:1").osis()).toEqual("1Pet.1.1")
		`
		true
describe "Localized book Jude (as)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: Jude (as)", ->
		`
		expect(p.parse("যিহূদাৰ পত্ৰ 1:1").osis()).toEqual("Jude.1.1")
		expect(p.parse("যিহূদা 1:1").osis()).toEqual("Jude.1.1")
		expect(p.parse("Jude 1:1").osis()).toEqual("Jude.1.1")
		p.include_apocrypha(false)
		expect(p.parse("যিহূদাৰ পত্ৰ 1:1").osis()).toEqual("Jude.1.1")
		expect(p.parse("যিহূদা 1:1").osis()).toEqual("Jude.1.1")
		expect(p.parse("JUDE 1:1").osis()).toEqual("Jude.1.1")
		`
		true
describe "Localized book Tob (as)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: Tob (as)", ->
		`
		expect(p.parse("Tob 1:1").osis()).toEqual("Tob.1.1")
		`
		true
describe "Localized book Jdt (as)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: Jdt (as)", ->
		`
		expect(p.parse("Jdt 1:1").osis()).toEqual("Jdt.1.1")
		`
		true
describe "Localized book Bar (as)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: Bar (as)", ->
		`
		expect(p.parse("Bar 1:1").osis()).toEqual("Bar.1.1")
		`
		true
describe "Localized book Sus (as)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: Sus (as)", ->
		`
		expect(p.parse("Sus 1:1").osis()).toEqual("Sus.1.1")
		`
		true
describe "Localized book 2Macc (as)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: 2Macc (as)", ->
		`
		expect(p.parse("2Macc 1:1").osis()).toEqual("2Macc.1.1")
		`
		true
describe "Localized book 3Macc (as)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: 3Macc (as)", ->
		`
		expect(p.parse("3Macc 1:1").osis()).toEqual("3Macc.1.1")
		`
		true
describe "Localized book 4Macc (as)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: 4Macc (as)", ->
		`
		expect(p.parse("4Macc 1:1").osis()).toEqual("4Macc.1.1")
		`
		true
describe "Localized book 1Macc (as)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: 1Macc (as)", ->
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
		expect(p.languages).toEqual ["as"]

	it "should handle ranges (as)", ->
		expect(p.parse("Titus 1:1 লৈ 2").osis()).toEqual "Titus.1.1-Titus.1.2"
		expect(p.parse("Matt 1লৈ2").osis()).toEqual "Matt.1-Matt.2"
		expect(p.parse("Phlm 2 লৈ 3").osis()).toEqual "Phlm.1.2-Phlm.1.3"
	it "should handle chapters (as)", ->
		expect(p.parse("Titus 1:1, অধ্যায় 2").osis()).toEqual "Titus.1.1,Titus.2"
		expect(p.parse("Matt 3:4 অধ্যায় 6").osis()).toEqual "Matt.3.4,Matt.6"
	it "should handle verses (as)", ->
		expect(p.parse("Exod 1:1 পদ 3").osis()).toEqual "Exod.1.1,Exod.1.3"
		expect(p.parse("Phlm পদ 6").osis()).toEqual "Phlm.1.6"
		expect(p.parse("Exod 1:1 ছ 3").osis()).toEqual "Exod.1.1,Exod.1.3"
		expect(p.parse("Phlm ছ 6").osis()).toEqual "Phlm.1.6"
	it "should handle 'and' (as)", ->
		expect(p.parse("Exod 1:1 আৰু 3").osis()).toEqual "Exod.1.1,Exod.1.3"
		expect(p.parse("Phlm 2 আৰু 6").osis()).toEqual "Phlm.1.2,Phlm.1.6"
	it "should handle titles (as)", ->
		expect(p.parse("Ps 3 title, 4:2, 5:title").osis()).toEqual "Ps.3.1,Ps.4.2,Ps.5.1"
		expect(p.parse("PS 3 TITLE, 4:2, 5:TITLE").osis()).toEqual "Ps.3.1,Ps.4.2,Ps.5.1"
	it "should handle 'ff' (as)", ->
		expect(p.parse("Rev 3ff, 4:2ff").osis()).toEqual "Rev.3-Rev.22,Rev.4.2-Rev.4.11"
		expect(p.parse("REV 3 FF, 4:2 FF").osis()).toEqual "Rev.3-Rev.22,Rev.4.2-Rev.4.11"
	it "should handle translations (as)", ->
		expect(p.parse("Lev 1 (irv)").osis_and_translations()).toEqual [["Lev.1", "irv"]]
		expect(p.parse("lev 1 irv").osis_and_translations()).toEqual [["Lev.1", "irv"]]
	it "should handle book ranges (as)", ->
		p.set_options {book_alone_strategy: "full", book_range_strategy: "include"}
		expect(p.parse("1 লৈ 3  যোহন").osis()).toEqual "1John.1-3John.1"
	it "should handle boundaries (as)", ->
		p.set_options {book_alone_strategy: "full"}
		expect(p.parse("\u2014Matt\u2014").osis()).toEqual "Matt.1-Matt.28"
		expect(p.parse("\u201cMatt 1:1\u201d").osis()).toEqual "Matt.1.1"
