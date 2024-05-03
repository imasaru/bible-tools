bcv_parser = require("../../js/gu_bcv_parser.js").bcv_parser

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

describe "Localized book Gen (gu)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: Gen (gu)", ->
		`
		expect(p.parse("ઉત્પત્તિ 1:1").osis()).toEqual("Gen.1.1")
		expect(p.parse("ઉત્પાતિ 1:1").osis()).toEqual("Gen.1.1")
		expect(p.parse("ઉત્ત 1:1").osis()).toEqual("Gen.1.1")
		expect(p.parse("Gen 1:1").osis()).toEqual("Gen.1.1")
		p.include_apocrypha(false)
		expect(p.parse("ઉત્પત્તિ 1:1").osis()).toEqual("Gen.1.1")
		expect(p.parse("ઉત્પાતિ 1:1").osis()).toEqual("Gen.1.1")
		expect(p.parse("ઉત્ત 1:1").osis()).toEqual("Gen.1.1")
		expect(p.parse("GEN 1:1").osis()).toEqual("Gen.1.1")
		`
		true
describe "Localized book Exod (gu)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: Exod (gu)", ->
		`
		expect(p.parse("નિર્ગમન 1:1").osis()).toEqual("Exod.1.1")
		expect(p.parse("નિર્ગ 1:1").osis()).toEqual("Exod.1.1")
		expect(p.parse("Exod 1:1").osis()).toEqual("Exod.1.1")
		p.include_apocrypha(false)
		expect(p.parse("નિર્ગમન 1:1").osis()).toEqual("Exod.1.1")
		expect(p.parse("નિર્ગ 1:1").osis()).toEqual("Exod.1.1")
		expect(p.parse("EXOD 1:1").osis()).toEqual("Exod.1.1")
		`
		true
describe "Localized book Bel (gu)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: Bel (gu)", ->
		`
		expect(p.parse("Bel 1:1").osis()).toEqual("Bel.1.1")
		`
		true
describe "Localized book Lev (gu)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: Lev (gu)", ->
		`
		expect(p.parse("લેવીય 1:1").osis()).toEqual("Lev.1.1")
		expect(p.parse("લેવી 1:1").osis()).toEqual("Lev.1.1")
		expect(p.parse("Lev 1:1").osis()).toEqual("Lev.1.1")
		p.include_apocrypha(false)
		expect(p.parse("લેવીય 1:1").osis()).toEqual("Lev.1.1")
		expect(p.parse("લેવી 1:1").osis()).toEqual("Lev.1.1")
		expect(p.parse("LEV 1:1").osis()).toEqual("Lev.1.1")
		`
		true
describe "Localized book Num (gu)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: Num (gu)", ->
		`
		expect(p.parse("ગણના 1:1").osis()).toEqual("Num.1.1")
		expect(p.parse("Num 1:1").osis()).toEqual("Num.1.1")
		expect(p.parse("ગણ 1:1").osis()).toEqual("Num.1.1")
		p.include_apocrypha(false)
		expect(p.parse("ગણના 1:1").osis()).toEqual("Num.1.1")
		expect(p.parse("NUM 1:1").osis()).toEqual("Num.1.1")
		expect(p.parse("ગણ 1:1").osis()).toEqual("Num.1.1")
		`
		true
describe "Localized book Sir (gu)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: Sir (gu)", ->
		`
		expect(p.parse("Sir 1:1").osis()).toEqual("Sir.1.1")
		`
		true
describe "Localized book Wis (gu)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: Wis (gu)", ->
		`
		expect(p.parse("Wis 1:1").osis()).toEqual("Wis.1.1")
		`
		true
describe "Localized book Lam (gu)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: Lam (gu)", ->
		`
		expect(p.parse("યર્મિયાનો વિલાપ 1:1").osis()).toEqual("Lam.1.1")
		expect(p.parse("ય. વિ 1:1").osis()).toEqual("Lam.1.1")
		expect(p.parse("ય વિ 1:1").osis()).toEqual("Lam.1.1")
		expect(p.parse("Lam 1:1").osis()).toEqual("Lam.1.1")
		p.include_apocrypha(false)
		expect(p.parse("યર્મિયાનો વિલાપ 1:1").osis()).toEqual("Lam.1.1")
		expect(p.parse("ય. વિ 1:1").osis()).toEqual("Lam.1.1")
		expect(p.parse("ય વિ 1:1").osis()).toEqual("Lam.1.1")
		expect(p.parse("LAM 1:1").osis()).toEqual("Lam.1.1")
		`
		true
describe "Localized book EpJer (gu)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: EpJer (gu)", ->
		`
		expect(p.parse("EpJer 1:1").osis()).toEqual("EpJer.1.1")
		`
		true
describe "Localized book Rev (gu)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: Rev (gu)", ->
		`
		expect(p.parse("પ્રકટીકરણ 1:1").osis()).toEqual("Rev.1.1")
		expect(p.parse("પ્રકટી 1:1").osis()).toEqual("Rev.1.1")
		expect(p.parse("Rev 1:1").osis()).toEqual("Rev.1.1")
		p.include_apocrypha(false)
		expect(p.parse("પ્રકટીકરણ 1:1").osis()).toEqual("Rev.1.1")
		expect(p.parse("પ્રકટી 1:1").osis()).toEqual("Rev.1.1")
		expect(p.parse("REV 1:1").osis()).toEqual("Rev.1.1")
		`
		true
describe "Localized book PrMan (gu)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: PrMan (gu)", ->
		`
		expect(p.parse("PrMan 1:1").osis()).toEqual("PrMan.1.1")
		`
		true
describe "Localized book Deut (gu)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: Deut (gu)", ->
		`
		expect(p.parse("પુનર્નિયમ 1:1").osis()).toEqual("Deut.1.1")
		expect(p.parse("Deut 1:1").osis()).toEqual("Deut.1.1")
		expect(p.parse("પુન. 1:1").osis()).toEqual("Deut.1.1")
		expect(p.parse("પુન 1:1").osis()).toEqual("Deut.1.1")
		expect(p.parse("પૂન 1:1").osis()).toEqual("Deut.1.1")
		p.include_apocrypha(false)
		expect(p.parse("પુનર્નિયમ 1:1").osis()).toEqual("Deut.1.1")
		expect(p.parse("DEUT 1:1").osis()).toEqual("Deut.1.1")
		expect(p.parse("પુન. 1:1").osis()).toEqual("Deut.1.1")
		expect(p.parse("પુન 1:1").osis()).toEqual("Deut.1.1")
		expect(p.parse("પૂન 1:1").osis()).toEqual("Deut.1.1")
		`
		true
describe "Localized book Josh (gu)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: Josh (gu)", ->
		`
		expect(p.parse("યહોશુઆ 1:1").osis()).toEqual("Josh.1.1")
		expect(p.parse("જોશુઆ 1:1").osis()).toEqual("Josh.1.1")
		expect(p.parse("Josh 1:1").osis()).toEqual("Josh.1.1")
		expect(p.parse("યહો 1:1").osis()).toEqual("Josh.1.1")
		p.include_apocrypha(false)
		expect(p.parse("યહોશુઆ 1:1").osis()).toEqual("Josh.1.1")
		expect(p.parse("જોશુઆ 1:1").osis()).toEqual("Josh.1.1")
		expect(p.parse("JOSH 1:1").osis()).toEqual("Josh.1.1")
		expect(p.parse("યહો 1:1").osis()).toEqual("Josh.1.1")
		`
		true
describe "Localized book Judg (gu)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: Judg (gu)", ->
		`
		expect(p.parse("ન્યાયાધીશો 1:1").osis()).toEqual("Judg.1.1")
		expect(p.parse("ન્યાયા 1:1").osis()).toEqual("Judg.1.1")
		expect(p.parse("Judg 1:1").osis()).toEqual("Judg.1.1")
		p.include_apocrypha(false)
		expect(p.parse("ન્યાયાધીશો 1:1").osis()).toEqual("Judg.1.1")
		expect(p.parse("ન્યાયા 1:1").osis()).toEqual("Judg.1.1")
		expect(p.parse("JUDG 1:1").osis()).toEqual("Judg.1.1")
		`
		true
describe "Localized book Ruth (gu)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: Ruth (gu)", ->
		`
		expect(p.parse("Ruth 1:1").osis()).toEqual("Ruth.1.1")
		expect(p.parse("રૂથ 1:1").osis()).toEqual("Ruth.1.1")
		p.include_apocrypha(false)
		expect(p.parse("RUTH 1:1").osis()).toEqual("Ruth.1.1")
		expect(p.parse("રૂથ 1:1").osis()).toEqual("Ruth.1.1")
		`
		true
describe "Localized book 1Esd (gu)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: 1Esd (gu)", ->
		`
		expect(p.parse("1Esd 1:1").osis()).toEqual("1Esd.1.1")
		`
		true
describe "Localized book 2Esd (gu)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: 2Esd (gu)", ->
		`
		expect(p.parse("2Esd 1:1").osis()).toEqual("2Esd.1.1")
		`
		true
describe "Localized book Isa (gu)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: Isa (gu)", ->
		`
		expect(p.parse("યશાયાહ 1:1").osis()).toEqual("Isa.1.1")
		expect(p.parse("યશાયા 1:1").osis()).toEqual("Isa.1.1")
		expect(p.parse("Isa 1:1").osis()).toEqual("Isa.1.1")
		expect(p.parse("યશા 1:1").osis()).toEqual("Isa.1.1")
		p.include_apocrypha(false)
		expect(p.parse("યશાયાહ 1:1").osis()).toEqual("Isa.1.1")
		expect(p.parse("યશાયા 1:1").osis()).toEqual("Isa.1.1")
		expect(p.parse("ISA 1:1").osis()).toEqual("Isa.1.1")
		expect(p.parse("યશા 1:1").osis()).toEqual("Isa.1.1")
		`
		true
describe "Localized book 2Sam (gu)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: 2Sam (gu)", ->
		`
		expect(p.parse("2 શમુએલ 1:1").osis()).toEqual("2Sam.1.1")
		expect(p.parse("2 શમૂએલ 1:1").osis()).toEqual("2Sam.1.1")
		expect(p.parse("૨ શમુએલ 1:1").osis()).toEqual("2Sam.1.1")
		expect(p.parse("2શમું 1:1").osis()).toEqual("2Sam.1.1")
		expect(p.parse("૨શમું 1:1").osis()).toEqual("2Sam.1.1")
		expect(p.parse("2Sam 1:1").osis()).toEqual("2Sam.1.1")
		`
		true
	it "should handle non-Latin digits in book: 2Sam (gu)", ->
		p.set_options non_latin_digits_strategy: "replace"
		`
		expect(p.parse("2 શમુએલ 1:1").osis()).toEqual("2Sam.1.1")
		expect(p.parse("2 શમૂએલ 1:1").osis()).toEqual("2Sam.1.1")
		expect(p.parse("૨ શમુએલ 1:1").osis()).toEqual("2Sam.1.1")
		expect(p.parse("2શમું 1:1").osis()).toEqual("2Sam.1.1")
		expect(p.parse("૨શમું 1:1").osis()).toEqual("2Sam.1.1")
		expect(p.parse("2Sam 1:1").osis()).toEqual("2Sam.1.1")
		p.include_apocrypha(false)
		expect(p.parse("2 શમુએલ 1:1").osis()).toEqual("2Sam.1.1")
		expect(p.parse("2 શમૂએલ 1:1").osis()).toEqual("2Sam.1.1")
		expect(p.parse("૨ શમુએલ 1:1").osis()).toEqual("2Sam.1.1")
		expect(p.parse("2શમું 1:1").osis()).toEqual("2Sam.1.1")
		expect(p.parse("૨શમું 1:1").osis()).toEqual("2Sam.1.1")
		expect(p.parse("2SAM 1:1").osis()).toEqual("2Sam.1.1")
		`
		true
describe "Localized book 1Sam (gu)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: 1Sam (gu)", ->
		`
		expect(p.parse("1 શમુએલ 1:1").osis()).toEqual("1Sam.1.1")
		expect(p.parse("1 શમૂએલ 1:1").osis()).toEqual("1Sam.1.1")
		expect(p.parse("૧ શમુએલ 1:1").osis()).toEqual("1Sam.1.1")
		expect(p.parse("1 શમું 1:1").osis()).toEqual("1Sam.1.1")
		expect(p.parse("૧ શમું 1:1").osis()).toEqual("1Sam.1.1")
		expect(p.parse("1Sam 1:1").osis()).toEqual("1Sam.1.1")
		`
		true
	it "should handle non-Latin digits in book: 1Sam (gu)", ->
		p.set_options non_latin_digits_strategy: "replace"
		`
		expect(p.parse("1 શમુએલ 1:1").osis()).toEqual("1Sam.1.1")
		expect(p.parse("1 શમૂએલ 1:1").osis()).toEqual("1Sam.1.1")
		expect(p.parse("૧ શમુએલ 1:1").osis()).toEqual("1Sam.1.1")
		expect(p.parse("1 શમું 1:1").osis()).toEqual("1Sam.1.1")
		expect(p.parse("૧ શમું 1:1").osis()).toEqual("1Sam.1.1")
		expect(p.parse("1Sam 1:1").osis()).toEqual("1Sam.1.1")
		p.include_apocrypha(false)
		expect(p.parse("1 શમુએલ 1:1").osis()).toEqual("1Sam.1.1")
		expect(p.parse("1 શમૂએલ 1:1").osis()).toEqual("1Sam.1.1")
		expect(p.parse("૧ શમુએલ 1:1").osis()).toEqual("1Sam.1.1")
		expect(p.parse("1 શમું 1:1").osis()).toEqual("1Sam.1.1")
		expect(p.parse("૧ શમું 1:1").osis()).toEqual("1Sam.1.1")
		expect(p.parse("1SAM 1:1").osis()).toEqual("1Sam.1.1")
		`
		true
describe "Localized book 2Kgs (gu)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: 2Kgs (gu)", ->
		`
		expect(p.parse("2 રાજાઓ 1:1").osis()).toEqual("2Kgs.1.1")
		expect(p.parse("૨ રાજાઓ 1:1").osis()).toEqual("2Kgs.1.1")
		expect(p.parse("2 રાજા 1:1").osis()).toEqual("2Kgs.1.1")
		expect(p.parse("૨ રાજા 1:1").osis()).toEqual("2Kgs.1.1")
		expect(p.parse("2Kgs 1:1").osis()).toEqual("2Kgs.1.1")
		`
		true
	it "should handle non-Latin digits in book: 2Kgs (gu)", ->
		p.set_options non_latin_digits_strategy: "replace"
		`
		expect(p.parse("2 રાજાઓ 1:1").osis()).toEqual("2Kgs.1.1")
		expect(p.parse("૨ રાજાઓ 1:1").osis()).toEqual("2Kgs.1.1")
		expect(p.parse("2 રાજા 1:1").osis()).toEqual("2Kgs.1.1")
		expect(p.parse("૨ રાજા 1:1").osis()).toEqual("2Kgs.1.1")
		expect(p.parse("2Kgs 1:1").osis()).toEqual("2Kgs.1.1")
		p.include_apocrypha(false)
		expect(p.parse("2 રાજાઓ 1:1").osis()).toEqual("2Kgs.1.1")
		expect(p.parse("૨ રાજાઓ 1:1").osis()).toEqual("2Kgs.1.1")
		expect(p.parse("2 રાજા 1:1").osis()).toEqual("2Kgs.1.1")
		expect(p.parse("૨ રાજા 1:1").osis()).toEqual("2Kgs.1.1")
		expect(p.parse("2KGS 1:1").osis()).toEqual("2Kgs.1.1")
		`
		true
describe "Localized book 1Kgs (gu)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: 1Kgs (gu)", ->
		`
		expect(p.parse("1 રાજાઓ 1:1").osis()).toEqual("1Kgs.1.1")
		expect(p.parse("૧ રાજાઓ 1:1").osis()).toEqual("1Kgs.1.1")
		expect(p.parse("1 રાજા 1:1").osis()).toEqual("1Kgs.1.1")
		expect(p.parse("૧ રાજા 1:1").osis()).toEqual("1Kgs.1.1")
		expect(p.parse("1Kgs 1:1").osis()).toEqual("1Kgs.1.1")
		`
		true
	it "should handle non-Latin digits in book: 1Kgs (gu)", ->
		p.set_options non_latin_digits_strategy: "replace"
		`
		expect(p.parse("1 રાજાઓ 1:1").osis()).toEqual("1Kgs.1.1")
		expect(p.parse("૧ રાજાઓ 1:1").osis()).toEqual("1Kgs.1.1")
		expect(p.parse("1 રાજા 1:1").osis()).toEqual("1Kgs.1.1")
		expect(p.parse("૧ રાજા 1:1").osis()).toEqual("1Kgs.1.1")
		expect(p.parse("1Kgs 1:1").osis()).toEqual("1Kgs.1.1")
		p.include_apocrypha(false)
		expect(p.parse("1 રાજાઓ 1:1").osis()).toEqual("1Kgs.1.1")
		expect(p.parse("૧ રાજાઓ 1:1").osis()).toEqual("1Kgs.1.1")
		expect(p.parse("1 રાજા 1:1").osis()).toEqual("1Kgs.1.1")
		expect(p.parse("૧ રાજા 1:1").osis()).toEqual("1Kgs.1.1")
		expect(p.parse("1KGS 1:1").osis()).toEqual("1Kgs.1.1")
		`
		true
describe "Localized book 2Chr (gu)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: 2Chr (gu)", ->
		`
		expect(p.parse("2 કાળવૃત્તાંત 1:1").osis()).toEqual("2Chr.1.1")
		expect(p.parse("૨ કાળવૃત્તાંત 1:1").osis()).toEqual("2Chr.1.1")
		expect(p.parse("2 કાળ 1:1").osis()).toEqual("2Chr.1.1")
		expect(p.parse("૨ કાળ 1:1").osis()).toEqual("2Chr.1.1")
		expect(p.parse("2Chr 1:1").osis()).toEqual("2Chr.1.1")
		`
		true
	it "should handle non-Latin digits in book: 2Chr (gu)", ->
		p.set_options non_latin_digits_strategy: "replace"
		`
		expect(p.parse("2 કાળવૃત્તાંત 1:1").osis()).toEqual("2Chr.1.1")
		expect(p.parse("૨ કાળવૃત્તાંત 1:1").osis()).toEqual("2Chr.1.1")
		expect(p.parse("2 કાળ 1:1").osis()).toEqual("2Chr.1.1")
		expect(p.parse("૨ કાળ 1:1").osis()).toEqual("2Chr.1.1")
		expect(p.parse("2Chr 1:1").osis()).toEqual("2Chr.1.1")
		p.include_apocrypha(false)
		expect(p.parse("2 કાળવૃત્તાંત 1:1").osis()).toEqual("2Chr.1.1")
		expect(p.parse("૨ કાળવૃત્તાંત 1:1").osis()).toEqual("2Chr.1.1")
		expect(p.parse("2 કાળ 1:1").osis()).toEqual("2Chr.1.1")
		expect(p.parse("૨ કાળ 1:1").osis()).toEqual("2Chr.1.1")
		expect(p.parse("2CHR 1:1").osis()).toEqual("2Chr.1.1")
		`
		true
describe "Localized book 1Chr (gu)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: 1Chr (gu)", ->
		`
		expect(p.parse("1 કાળવૃત્તાંત 1:1").osis()).toEqual("1Chr.1.1")
		expect(p.parse("૧ કાળવૃત્તાંત 1:1").osis()).toEqual("1Chr.1.1")
		expect(p.parse("1 કાળ. 1:1").osis()).toEqual("1Chr.1.1")
		expect(p.parse("૧ કાળ. 1:1").osis()).toEqual("1Chr.1.1")
		expect(p.parse("1 કાળ 1:1").osis()).toEqual("1Chr.1.1")
		expect(p.parse("૧ કાળ 1:1").osis()).toEqual("1Chr.1.1")
		expect(p.parse("1Chr 1:1").osis()).toEqual("1Chr.1.1")
		`
		true
	it "should handle non-Latin digits in book: 1Chr (gu)", ->
		p.set_options non_latin_digits_strategy: "replace"
		`
		expect(p.parse("1 કાળવૃત્તાંત 1:1").osis()).toEqual("1Chr.1.1")
		expect(p.parse("૧ કાળવૃત્તાંત 1:1").osis()).toEqual("1Chr.1.1")
		expect(p.parse("1 કાળ. 1:1").osis()).toEqual("1Chr.1.1")
		expect(p.parse("૧ કાળ. 1:1").osis()).toEqual("1Chr.1.1")
		expect(p.parse("1 કાળ 1:1").osis()).toEqual("1Chr.1.1")
		expect(p.parse("૧ કાળ 1:1").osis()).toEqual("1Chr.1.1")
		expect(p.parse("1Chr 1:1").osis()).toEqual("1Chr.1.1")
		p.include_apocrypha(false)
		expect(p.parse("1 કાળવૃત્તાંત 1:1").osis()).toEqual("1Chr.1.1")
		expect(p.parse("૧ કાળવૃત્તાંત 1:1").osis()).toEqual("1Chr.1.1")
		expect(p.parse("1 કાળ. 1:1").osis()).toEqual("1Chr.1.1")
		expect(p.parse("૧ કાળ. 1:1").osis()).toEqual("1Chr.1.1")
		expect(p.parse("1 કાળ 1:1").osis()).toEqual("1Chr.1.1")
		expect(p.parse("૧ કાળ 1:1").osis()).toEqual("1Chr.1.1")
		expect(p.parse("1CHR 1:1").osis()).toEqual("1Chr.1.1")
		`
		true
describe "Localized book Ezra (gu)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: Ezra (gu)", ->
		`
		expect(p.parse("Ezra 1:1").osis()).toEqual("Ezra.1.1")
		expect(p.parse("એઝરા 1:1").osis()).toEqual("Ezra.1.1")
		expect(p.parse("એઝ 1:1").osis()).toEqual("Ezra.1.1")
		p.include_apocrypha(false)
		expect(p.parse("EZRA 1:1").osis()).toEqual("Ezra.1.1")
		expect(p.parse("એઝરા 1:1").osis()).toEqual("Ezra.1.1")
		expect(p.parse("એઝ 1:1").osis()).toEqual("Ezra.1.1")
		`
		true
describe "Localized book Neh (gu)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: Neh (gu)", ->
		`
		expect(p.parse("નહેમ્યા 1:1").osis()).toEqual("Neh.1.1")
		expect(p.parse("નેહે 1:1").osis()).toEqual("Neh.1.1")
		expect(p.parse("Neh 1:1").osis()).toEqual("Neh.1.1")
		p.include_apocrypha(false)
		expect(p.parse("નહેમ્યા 1:1").osis()).toEqual("Neh.1.1")
		expect(p.parse("નેહે 1:1").osis()).toEqual("Neh.1.1")
		expect(p.parse("NEH 1:1").osis()).toEqual("Neh.1.1")
		`
		true
describe "Localized book GkEsth (gu)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: GkEsth (gu)", ->
		`
		expect(p.parse("GkEsth 1:1").osis()).toEqual("GkEsth.1.1")
		`
		true
describe "Localized book Esth (gu)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: Esth (gu)", ->
		`
		expect(p.parse("એસ્તેર 1:1").osis()).toEqual("Esth.1.1")
		expect(p.parse("Esth 1:1").osis()).toEqual("Esth.1.1")
		expect(p.parse("એસ્ત 1:1").osis()).toEqual("Esth.1.1")
		p.include_apocrypha(false)
		expect(p.parse("એસ્તેર 1:1").osis()).toEqual("Esth.1.1")
		expect(p.parse("ESTH 1:1").osis()).toEqual("Esth.1.1")
		expect(p.parse("એસ્ત 1:1").osis()).toEqual("Esth.1.1")
		`
		true
describe "Localized book Job (gu)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: Job (gu)", ->
		`
		expect(p.parse("અયૂબ 1:1").osis()).toEqual("Job.1.1")
		expect(p.parse("Job 1:1").osis()).toEqual("Job.1.1")
		expect(p.parse("અયુ 1:1").osis()).toEqual("Job.1.1")
		p.include_apocrypha(false)
		expect(p.parse("અયૂબ 1:1").osis()).toEqual("Job.1.1")
		expect(p.parse("JOB 1:1").osis()).toEqual("Job.1.1")
		expect(p.parse("અયુ 1:1").osis()).toEqual("Job.1.1")
		`
		true
describe "Localized book Ps (gu)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: Ps (gu)", ->
		`
		expect(p.parse("ગીતશાસ્‍ત્ર 1:1").osis()).toEqual("Ps.1.1")
		expect(p.parse("ગીતશાસ્ત્ર 1:1").osis()).toEqual("Ps.1.1")
		expect(p.parse("ગી.શા 1:1").osis()).toEqual("Ps.1.1")
		expect(p.parse("ગીત. 1:1").osis()).toEqual("Ps.1.1")
		expect(p.parse("ગીશા 1:1").osis()).toEqual("Ps.1.1")
		expect(p.parse("ગીત 1:1").osis()).toEqual("Ps.1.1")
		expect(p.parse("Ps 1:1").osis()).toEqual("Ps.1.1")
		p.include_apocrypha(false)
		expect(p.parse("ગીતશાસ્‍ત્ર 1:1").osis()).toEqual("Ps.1.1")
		expect(p.parse("ગીતશાસ્ત્ર 1:1").osis()).toEqual("Ps.1.1")
		expect(p.parse("ગી.શા 1:1").osis()).toEqual("Ps.1.1")
		expect(p.parse("ગીત. 1:1").osis()).toEqual("Ps.1.1")
		expect(p.parse("ગીશા 1:1").osis()).toEqual("Ps.1.1")
		expect(p.parse("ગીત 1:1").osis()).toEqual("Ps.1.1")
		expect(p.parse("PS 1:1").osis()).toEqual("Ps.1.1")
		`
		true
describe "Localized book PrAzar (gu)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: PrAzar (gu)", ->
		`
		expect(p.parse("PrAzar 1:1").osis()).toEqual("PrAzar.1.1")
		`
		true
describe "Localized book Prov (gu)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: Prov (gu)", ->
		`
		expect(p.parse("નીતિવચનો 1:1").osis()).toEqual("Prov.1.1")
		expect(p.parse("Prov 1:1").osis()).toEqual("Prov.1.1")
		expect(p.parse("નીતિ 1:1").osis()).toEqual("Prov.1.1")
		p.include_apocrypha(false)
		expect(p.parse("નીતિવચનો 1:1").osis()).toEqual("Prov.1.1")
		expect(p.parse("PROV 1:1").osis()).toEqual("Prov.1.1")
		expect(p.parse("નીતિ 1:1").osis()).toEqual("Prov.1.1")
		`
		true
describe "Localized book Eccl (gu)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: Eccl (gu)", ->
		`
		expect(p.parse("સભાશિક્ષક 1:1").osis()).toEqual("Eccl.1.1")
		expect(p.parse("Eccl 1:1").osis()).toEqual("Eccl.1.1")
		expect(p.parse("જુઓ. 1:1").osis()).toEqual("Eccl.1.1")
		expect(p.parse("જુઓ 1:1").osis()).toEqual("Eccl.1.1")
		expect(p.parse("સભા 1:1").osis()).toEqual("Eccl.1.1")
		p.include_apocrypha(false)
		expect(p.parse("સભાશિક્ષક 1:1").osis()).toEqual("Eccl.1.1")
		expect(p.parse("ECCL 1:1").osis()).toEqual("Eccl.1.1")
		expect(p.parse("જુઓ. 1:1").osis()).toEqual("Eccl.1.1")
		expect(p.parse("જુઓ 1:1").osis()).toEqual("Eccl.1.1")
		expect(p.parse("સભા 1:1").osis()).toEqual("Eccl.1.1")
		`
		true
describe "Localized book SgThree (gu)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: SgThree (gu)", ->
		`
		expect(p.parse("SgThree 1:1").osis()).toEqual("SgThree.1.1")
		`
		true
describe "Localized book Song (gu)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: Song (gu)", ->
		`
		expect(p.parse("ગીતોનું ગીત 1:1").osis()).toEqual("Song.1.1")
		expect(p.parse("ગી.ગી 1:1").osis()).toEqual("Song.1.1")
		expect(p.parse("Song 1:1").osis()).toEqual("Song.1.1")
		expect(p.parse("ગીગી 1:1").osis()).toEqual("Song.1.1")
		p.include_apocrypha(false)
		expect(p.parse("ગીતોનું ગીત 1:1").osis()).toEqual("Song.1.1")
		expect(p.parse("ગી.ગી 1:1").osis()).toEqual("Song.1.1")
		expect(p.parse("SONG 1:1").osis()).toEqual("Song.1.1")
		expect(p.parse("ગીગી 1:1").osis()).toEqual("Song.1.1")
		`
		true
describe "Localized book Jer (gu)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: Jer (gu)", ->
		`
		expect(p.parse("યર્મિયા 1:1").osis()).toEqual("Jer.1.1")
		expect(p.parse("યર્મિ 1:1").osis()).toEqual("Jer.1.1")
		expect(p.parse("Jer 1:1").osis()).toEqual("Jer.1.1")
		p.include_apocrypha(false)
		expect(p.parse("યર્મિયા 1:1").osis()).toEqual("Jer.1.1")
		expect(p.parse("યર્મિ 1:1").osis()).toEqual("Jer.1.1")
		expect(p.parse("JER 1:1").osis()).toEqual("Jer.1.1")
		`
		true
describe "Localized book Ezek (gu)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: Ezek (gu)", ->
		`
		expect(p.parse("હઝકિયેલ 1:1").osis()).toEqual("Ezek.1.1")
		expect(p.parse("હઝકીએલ 1:1").osis()).toEqual("Ezek.1.1")
		expect(p.parse("હઝકી. 1:1").osis()).toEqual("Ezek.1.1")
		expect(p.parse("Ezek 1:1").osis()).toEqual("Ezek.1.1")
		expect(p.parse("હઝકી 1:1").osis()).toEqual("Ezek.1.1")
		expect(p.parse("હઝ 1:1").osis()).toEqual("Ezek.1.1")
		p.include_apocrypha(false)
		expect(p.parse("હઝકિયેલ 1:1").osis()).toEqual("Ezek.1.1")
		expect(p.parse("હઝકીએલ 1:1").osis()).toEqual("Ezek.1.1")
		expect(p.parse("હઝકી. 1:1").osis()).toEqual("Ezek.1.1")
		expect(p.parse("EZEK 1:1").osis()).toEqual("Ezek.1.1")
		expect(p.parse("હઝકી 1:1").osis()).toEqual("Ezek.1.1")
		expect(p.parse("હઝ 1:1").osis()).toEqual("Ezek.1.1")
		`
		true
describe "Localized book Dan (gu)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: Dan (gu)", ->
		`
		expect(p.parse("દાનિયેલ 1:1").osis()).toEqual("Dan.1.1")
		expect(p.parse("દાનીયેલ 1:1").osis()).toEqual("Dan.1.1")
		expect(p.parse("દાની 1:1").osis()).toEqual("Dan.1.1")
		expect(p.parse("Dan 1:1").osis()).toEqual("Dan.1.1")
		p.include_apocrypha(false)
		expect(p.parse("દાનિયેલ 1:1").osis()).toEqual("Dan.1.1")
		expect(p.parse("દાનીયેલ 1:1").osis()).toEqual("Dan.1.1")
		expect(p.parse("દાની 1:1").osis()).toEqual("Dan.1.1")
		expect(p.parse("DAN 1:1").osis()).toEqual("Dan.1.1")
		`
		true
describe "Localized book Hos (gu)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: Hos (gu)", ->
		`
		expect(p.parse("હોશિયા 1:1").osis()).toEqual("Hos.1.1")
		expect(p.parse("હોશિ 1:1").osis()).toEqual("Hos.1.1")
		expect(p.parse("Hos 1:1").osis()).toEqual("Hos.1.1")
		p.include_apocrypha(false)
		expect(p.parse("હોશિયા 1:1").osis()).toEqual("Hos.1.1")
		expect(p.parse("હોશિ 1:1").osis()).toEqual("Hos.1.1")
		expect(p.parse("HOS 1:1").osis()).toEqual("Hos.1.1")
		`
		true
describe "Localized book Joel (gu)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: Joel (gu)", ->
		`
		expect(p.parse("Joel 1:1").osis()).toEqual("Joel.1.1")
		expect(p.parse("યોએલ 1:1").osis()).toEqual("Joel.1.1")
		expect(p.parse("યોએ 1:1").osis()).toEqual("Joel.1.1")
		p.include_apocrypha(false)
		expect(p.parse("JOEL 1:1").osis()).toEqual("Joel.1.1")
		expect(p.parse("યોએલ 1:1").osis()).toEqual("Joel.1.1")
		expect(p.parse("યોએ 1:1").osis()).toEqual("Joel.1.1")
		`
		true
describe "Localized book Amos (gu)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: Amos (gu)", ->
		`
		expect(p.parse("Amos 1:1").osis()).toEqual("Amos.1.1")
		expect(p.parse("આમોસ 1:1").osis()).toEqual("Amos.1.1")
		expect(p.parse("આમો 1:1").osis()).toEqual("Amos.1.1")
		p.include_apocrypha(false)
		expect(p.parse("AMOS 1:1").osis()).toEqual("Amos.1.1")
		expect(p.parse("આમોસ 1:1").osis()).toEqual("Amos.1.1")
		expect(p.parse("આમો 1:1").osis()).toEqual("Amos.1.1")
		`
		true
describe "Localized book Obad (gu)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: Obad (gu)", ->
		`
		expect(p.parse("ઓબાદ્યા 1:1").osis()).toEqual("Obad.1.1")
		expect(p.parse("Obad 1:1").osis()).toEqual("Obad.1.1")
		expect(p.parse("ઓબા 1:1").osis()).toEqual("Obad.1.1")
		p.include_apocrypha(false)
		expect(p.parse("ઓબાદ્યા 1:1").osis()).toEqual("Obad.1.1")
		expect(p.parse("OBAD 1:1").osis()).toEqual("Obad.1.1")
		expect(p.parse("ઓબા 1:1").osis()).toEqual("Obad.1.1")
		`
		true
describe "Localized book Jonah (gu)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: Jonah (gu)", ->
		`
		expect(p.parse("Jonah 1:1").osis()).toEqual("Jonah.1.1")
		expect(p.parse("યૂના 1:1").osis()).toEqual("Jonah.1.1")
		p.include_apocrypha(false)
		expect(p.parse("JONAH 1:1").osis()).toEqual("Jonah.1.1")
		expect(p.parse("યૂના 1:1").osis()).toEqual("Jonah.1.1")
		`
		true
describe "Localized book Mic (gu)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: Mic (gu)", ->
		`
		expect(p.parse("મીખાહ 1:1").osis()).toEqual("Mic.1.1")
		expect(p.parse("મિખા 1:1").osis()).toEqual("Mic.1.1")
		expect(p.parse("Mic 1:1").osis()).toEqual("Mic.1.1")
		p.include_apocrypha(false)
		expect(p.parse("મીખાહ 1:1").osis()).toEqual("Mic.1.1")
		expect(p.parse("મિખા 1:1").osis()).toEqual("Mic.1.1")
		expect(p.parse("MIC 1:1").osis()).toEqual("Mic.1.1")
		`
		true
describe "Localized book Nah (gu)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: Nah (gu)", ->
		`
		expect(p.parse("નાહૂમ 1:1").osis()).toEqual("Nah.1.1")
		expect(p.parse("નાહુ 1:1").osis()).toEqual("Nah.1.1")
		expect(p.parse("Nah 1:1").osis()).toEqual("Nah.1.1")
		p.include_apocrypha(false)
		expect(p.parse("નાહૂમ 1:1").osis()).toEqual("Nah.1.1")
		expect(p.parse("નાહુ 1:1").osis()).toEqual("Nah.1.1")
		expect(p.parse("NAH 1:1").osis()).toEqual("Nah.1.1")
		`
		true
describe "Localized book Hab (gu)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: Hab (gu)", ->
		`
		expect(p.parse("હબાકુક 1:1").osis()).toEqual("Hab.1.1")
		expect(p.parse("Hab 1:1").osis()).toEqual("Hab.1.1")
		expect(p.parse("હબા 1:1").osis()).toEqual("Hab.1.1")
		p.include_apocrypha(false)
		expect(p.parse("હબાકુક 1:1").osis()).toEqual("Hab.1.1")
		expect(p.parse("HAB 1:1").osis()).toEqual("Hab.1.1")
		expect(p.parse("હબા 1:1").osis()).toEqual("Hab.1.1")
		`
		true
describe "Localized book Zeph (gu)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: Zeph (gu)", ->
		`
		expect(p.parse("સફાન્યા 1:1").osis()).toEqual("Zeph.1.1")
		expect(p.parse("Zeph 1:1").osis()).toEqual("Zeph.1.1")
		expect(p.parse("સફા 1:1").osis()).toEqual("Zeph.1.1")
		p.include_apocrypha(false)
		expect(p.parse("સફાન્યા 1:1").osis()).toEqual("Zeph.1.1")
		expect(p.parse("ZEPH 1:1").osis()).toEqual("Zeph.1.1")
		expect(p.parse("સફા 1:1").osis()).toEqual("Zeph.1.1")
		`
		true
describe "Localized book Hag (gu)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: Hag (gu)", ->
		`
		expect(p.parse("હાગ્ગાય 1:1").osis()).toEqual("Hag.1.1")
		expect(p.parse("હાગા 1:1").osis()).toEqual("Hag.1.1")
		expect(p.parse("Hag 1:1").osis()).toEqual("Hag.1.1")
		p.include_apocrypha(false)
		expect(p.parse("હાગ્ગાય 1:1").osis()).toEqual("Hag.1.1")
		expect(p.parse("હાગા 1:1").osis()).toEqual("Hag.1.1")
		expect(p.parse("HAG 1:1").osis()).toEqual("Hag.1.1")
		`
		true
describe "Localized book Zech (gu)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: Zech (gu)", ->
		`
		expect(p.parse("ઝખાર્યા 1:1").osis()).toEqual("Zech.1.1")
		expect(p.parse("Zech 1:1").osis()).toEqual("Zech.1.1")
		expect(p.parse("ઝખા 1:1").osis()).toEqual("Zech.1.1")
		p.include_apocrypha(false)
		expect(p.parse("ઝખાર્યા 1:1").osis()).toEqual("Zech.1.1")
		expect(p.parse("ZECH 1:1").osis()).toEqual("Zech.1.1")
		expect(p.parse("ઝખા 1:1").osis()).toEqual("Zech.1.1")
		`
		true
describe "Localized book Mal (gu)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: Mal (gu)", ->
		`
		expect(p.parse("માલાખી 1:1").osis()).toEqual("Mal.1.1")
		expect(p.parse("માલા 1:1").osis()).toEqual("Mal.1.1")
		expect(p.parse("Mal 1:1").osis()).toEqual("Mal.1.1")
		p.include_apocrypha(false)
		expect(p.parse("માલાખી 1:1").osis()).toEqual("Mal.1.1")
		expect(p.parse("માલા 1:1").osis()).toEqual("Mal.1.1")
		expect(p.parse("MAL 1:1").osis()).toEqual("Mal.1.1")
		`
		true
describe "Localized book Matt (gu)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: Matt (gu)", ->
		`
		expect(p.parse("માત્થી 1:1").osis()).toEqual("Matt.1.1")
		expect(p.parse("માથ્થી 1:1").osis()).toEqual("Matt.1.1")
		expect(p.parse("Matt 1:1").osis()).toEqual("Matt.1.1")
		expect(p.parse("માથ્ 1:1").osis()).toEqual("Matt.1.1")
		p.include_apocrypha(false)
		expect(p.parse("માત્થી 1:1").osis()).toEqual("Matt.1.1")
		expect(p.parse("માથ્થી 1:1").osis()).toEqual("Matt.1.1")
		expect(p.parse("MATT 1:1").osis()).toEqual("Matt.1.1")
		expect(p.parse("માથ્ 1:1").osis()).toEqual("Matt.1.1")
		`
		true
describe "Localized book Mark (gu)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: Mark (gu)", ->
		`
		expect(p.parse("માર્ક 1:1").osis()).toEqual("Mark.1.1")
		expect(p.parse("Mark 1:1").osis()).toEqual("Mark.1.1")
		p.include_apocrypha(false)
		expect(p.parse("માર્ક 1:1").osis()).toEqual("Mark.1.1")
		expect(p.parse("MARK 1:1").osis()).toEqual("Mark.1.1")
		`
		true
describe "Localized book Luke (gu)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: Luke (gu)", ->
		`
		expect(p.parse("Luke 1:1").osis()).toEqual("Luke.1.1")
		expect(p.parse("લુક 1:1").osis()).toEqual("Luke.1.1")
		expect(p.parse("લૂક 1:1").osis()).toEqual("Luke.1.1")
		p.include_apocrypha(false)
		expect(p.parse("LUKE 1:1").osis()).toEqual("Luke.1.1")
		expect(p.parse("લુક 1:1").osis()).toEqual("Luke.1.1")
		expect(p.parse("લૂક 1:1").osis()).toEqual("Luke.1.1")
		`
		true
describe "Localized book 1John (gu)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: 1John (gu)", ->
		`
		expect(p.parse("યોહાનનો પહેલો પત્ર 1:1").osis()).toEqual("1John.1.1")
		expect(p.parse("1 યોહાન 1:1").osis()).toEqual("1John.1.1")
		expect(p.parse("૧ યોહાન 1:1").osis()).toEqual("1John.1.1")
		expect(p.parse("1યોહાન 1:1").osis()).toEqual("1John.1.1")
		expect(p.parse("1John 1:1").osis()).toEqual("1John.1.1")
		expect(p.parse("1યોહ 1:1").osis()).toEqual("1John.1.1")
		expect(p.parse("૧યોહ 1:1").osis()).toEqual("1John.1.1")
		`
		true
	it "should handle non-Latin digits in book: 1John (gu)", ->
		p.set_options non_latin_digits_strategy: "replace"
		`
		expect(p.parse("યોહાનનો પહેલો પત્ર 1:1").osis()).toEqual("1John.1.1")
		expect(p.parse("1 યોહાન 1:1").osis()).toEqual("1John.1.1")
		expect(p.parse("૧ યોહાન 1:1").osis()).toEqual("1John.1.1")
		expect(p.parse("1યોહાન 1:1").osis()).toEqual("1John.1.1")
		expect(p.parse("1John 1:1").osis()).toEqual("1John.1.1")
		expect(p.parse("1યોહ 1:1").osis()).toEqual("1John.1.1")
		expect(p.parse("૧યોહ 1:1").osis()).toEqual("1John.1.1")
		p.include_apocrypha(false)
		expect(p.parse("યોહાનનો પહેલો પત્ર 1:1").osis()).toEqual("1John.1.1")
		expect(p.parse("1 યોહાન 1:1").osis()).toEqual("1John.1.1")
		expect(p.parse("૧ યોહાન 1:1").osis()).toEqual("1John.1.1")
		expect(p.parse("1યોહાન 1:1").osis()).toEqual("1John.1.1")
		expect(p.parse("1JOHN 1:1").osis()).toEqual("1John.1.1")
		expect(p.parse("1યોહ 1:1").osis()).toEqual("1John.1.1")
		expect(p.parse("૧યોહ 1:1").osis()).toEqual("1John.1.1")
		`
		true
describe "Localized book 2John (gu)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: 2John (gu)", ->
		`
		expect(p.parse("યોહાનનો બીજો પત્ર 1:1").osis()).toEqual("2John.1.1")
		expect(p.parse("2John 1:1").osis()).toEqual("2John.1.1")
		expect(p.parse("2યોહ 1:1").osis()).toEqual("2John.1.1")
		expect(p.parse("૨યોહ 1:1").osis()).toEqual("2John.1.1")
		`
		true
	it "should handle non-Latin digits in book: 2John (gu)", ->
		p.set_options non_latin_digits_strategy: "replace"
		`
		expect(p.parse("યોહાનનો બીજો પત્ર 1:1").osis()).toEqual("2John.1.1")
		expect(p.parse("2John 1:1").osis()).toEqual("2John.1.1")
		expect(p.parse("2યોહ 1:1").osis()).toEqual("2John.1.1")
		expect(p.parse("૨યોહ 1:1").osis()).toEqual("2John.1.1")
		p.include_apocrypha(false)
		expect(p.parse("યોહાનનો બીજો પત્ર 1:1").osis()).toEqual("2John.1.1")
		expect(p.parse("2JOHN 1:1").osis()).toEqual("2John.1.1")
		expect(p.parse("2યોહ 1:1").osis()).toEqual("2John.1.1")
		expect(p.parse("૨યોહ 1:1").osis()).toEqual("2John.1.1")
		`
		true
describe "Localized book 3John (gu)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: 3John (gu)", ->
		`
		expect(p.parse("યોહાનનો ત્રીજો પત્ર 1:1").osis()).toEqual("3John.1.1")
		expect(p.parse("3John 1:1").osis()).toEqual("3John.1.1")
		expect(p.parse("3યોહ 1:1").osis()).toEqual("3John.1.1")
		expect(p.parse("૩યોહ 1:1").osis()).toEqual("3John.1.1")
		`
		true
	it "should handle non-Latin digits in book: 3John (gu)", ->
		p.set_options non_latin_digits_strategy: "replace"
		`
		expect(p.parse("યોહાનનો ત્રીજો પત્ર 1:1").osis()).toEqual("3John.1.1")
		expect(p.parse("3John 1:1").osis()).toEqual("3John.1.1")
		expect(p.parse("3યોહ 1:1").osis()).toEqual("3John.1.1")
		expect(p.parse("૩યોહ 1:1").osis()).toEqual("3John.1.1")
		p.include_apocrypha(false)
		expect(p.parse("યોહાનનો ત્રીજો પત્ર 1:1").osis()).toEqual("3John.1.1")
		expect(p.parse("3JOHN 1:1").osis()).toEqual("3John.1.1")
		expect(p.parse("3યોહ 1:1").osis()).toEqual("3John.1.1")
		expect(p.parse("૩યોહ 1:1").osis()).toEqual("3John.1.1")
		`
		true
describe "Localized book John (gu)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: John (gu)", ->
		`
		expect(p.parse("યોહાન 1:1").osis()).toEqual("John.1.1")
		expect(p.parse("John 1:1").osis()).toEqual("John.1.1")
		expect(p.parse("યોહન 1:1").osis()).toEqual("John.1.1")
		expect(p.parse("યોહ 1:1").osis()).toEqual("John.1.1")
		p.include_apocrypha(false)
		expect(p.parse("યોહાન 1:1").osis()).toEqual("John.1.1")
		expect(p.parse("JOHN 1:1").osis()).toEqual("John.1.1")
		expect(p.parse("યોહન 1:1").osis()).toEqual("John.1.1")
		expect(p.parse("યોહ 1:1").osis()).toEqual("John.1.1")
		`
		true
describe "Localized book Acts (gu)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: Acts (gu)", ->
		`
		expect(p.parse("પ્રેરિતોનાં કૃત્યો 1:1").osis()).toEqual("Acts.1.1")
		expect(p.parse("પ્રેકૃ 1:1").osis()).toEqual("Acts.1.1")
		expect(p.parse("Acts 1:1").osis()).toEqual("Acts.1.1")
		p.include_apocrypha(false)
		expect(p.parse("પ્રેરિતોનાં કૃત્યો 1:1").osis()).toEqual("Acts.1.1")
		expect(p.parse("પ્રેકૃ 1:1").osis()).toEqual("Acts.1.1")
		expect(p.parse("ACTS 1:1").osis()).toEqual("Acts.1.1")
		`
		true
describe "Localized book Rom (gu)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: Rom (gu)", ->
		`
		expect(p.parse("રોમનોને પત્ર 1:1").osis()).toEqual("Rom.1.1")
		expect(p.parse("રૂમી. 1:1").osis()).toEqual("Rom.1.1")
		expect(p.parse("રૂમી 1:1").osis()).toEqual("Rom.1.1")
		expect(p.parse("રોમન 1:1").osis()).toEqual("Rom.1.1")
		expect(p.parse("Rom 1:1").osis()).toEqual("Rom.1.1")
		expect(p.parse("રોમ 1:1").osis()).toEqual("Rom.1.1")
		p.include_apocrypha(false)
		expect(p.parse("રોમનોને પત્ર 1:1").osis()).toEqual("Rom.1.1")
		expect(p.parse("રૂમી. 1:1").osis()).toEqual("Rom.1.1")
		expect(p.parse("રૂમી 1:1").osis()).toEqual("Rom.1.1")
		expect(p.parse("રોમન 1:1").osis()).toEqual("Rom.1.1")
		expect(p.parse("ROM 1:1").osis()).toEqual("Rom.1.1")
		expect(p.parse("રોમ 1:1").osis()).toEqual("Rom.1.1")
		`
		true
describe "Localized book 2Cor (gu)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: 2Cor (gu)", ->
		`
		expect(p.parse("કરિંથીઓને બીજો પત્ર 1:1").osis()).toEqual("2Cor.1.1")
		expect(p.parse("2 કોરીંથી 1:1").osis()).toEqual("2Cor.1.1")
		expect(p.parse("2કોરી 1:1").osis()).toEqual("2Cor.1.1")
		expect(p.parse("૨કોરી 1:1").osis()).toEqual("2Cor.1.1")
		expect(p.parse("2Cor 1:1").osis()).toEqual("2Cor.1.1")
		`
		true
	it "should handle non-Latin digits in book: 2Cor (gu)", ->
		p.set_options non_latin_digits_strategy: "replace"
		`
		expect(p.parse("કરિંથીઓને બીજો પત્ર 1:1").osis()).toEqual("2Cor.1.1")
		expect(p.parse("2 કોરીંથી 1:1").osis()).toEqual("2Cor.1.1")
		expect(p.parse("2કોરી 1:1").osis()).toEqual("2Cor.1.1")
		expect(p.parse("૨કોરી 1:1").osis()).toEqual("2Cor.1.1")
		expect(p.parse("2Cor 1:1").osis()).toEqual("2Cor.1.1")
		p.include_apocrypha(false)
		expect(p.parse("કરિંથીઓને બીજો પત્ર 1:1").osis()).toEqual("2Cor.1.1")
		expect(p.parse("2 કોરીંથી 1:1").osis()).toEqual("2Cor.1.1")
		expect(p.parse("2કોરી 1:1").osis()).toEqual("2Cor.1.1")
		expect(p.parse("૨કોરી 1:1").osis()).toEqual("2Cor.1.1")
		expect(p.parse("2COR 1:1").osis()).toEqual("2Cor.1.1")
		`
		true
describe "Localized book 1Cor (gu)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: 1Cor (gu)", ->
		`
		expect(p.parse("કરિંથીઓને પહેલો પત્ર 1:1").osis()).toEqual("1Cor.1.1")
		expect(p.parse("1 કોરીંથી 1:1").osis()).toEqual("1Cor.1.1")
		expect(p.parse("1 કોરીં. 1:1").osis()).toEqual("1Cor.1.1")
		expect(p.parse("૧ કોરીં. 1:1").osis()).toEqual("1Cor.1.1")
		expect(p.parse("1 કોરીં 1:1").osis()).toEqual("1Cor.1.1")
		expect(p.parse("૧ કોરીં 1:1").osis()).toEqual("1Cor.1.1")
		expect(p.parse("1કોરી 1:1").osis()).toEqual("1Cor.1.1")
		expect(p.parse("૧કોરી 1:1").osis()).toEqual("1Cor.1.1")
		expect(p.parse("1Cor 1:1").osis()).toEqual("1Cor.1.1")
		`
		true
	it "should handle non-Latin digits in book: 1Cor (gu)", ->
		p.set_options non_latin_digits_strategy: "replace"
		`
		expect(p.parse("કરિંથીઓને પહેલો પત્ર 1:1").osis()).toEqual("1Cor.1.1")
		expect(p.parse("1 કોરીંથી 1:1").osis()).toEqual("1Cor.1.1")
		expect(p.parse("1 કોરીં. 1:1").osis()).toEqual("1Cor.1.1")
		expect(p.parse("૧ કોરીં. 1:1").osis()).toEqual("1Cor.1.1")
		expect(p.parse("1 કોરીં 1:1").osis()).toEqual("1Cor.1.1")
		expect(p.parse("૧ કોરીં 1:1").osis()).toEqual("1Cor.1.1")
		expect(p.parse("1કોરી 1:1").osis()).toEqual("1Cor.1.1")
		expect(p.parse("૧કોરી 1:1").osis()).toEqual("1Cor.1.1")
		expect(p.parse("1Cor 1:1").osis()).toEqual("1Cor.1.1")
		p.include_apocrypha(false)
		expect(p.parse("કરિંથીઓને પહેલો પત્ર 1:1").osis()).toEqual("1Cor.1.1")
		expect(p.parse("1 કોરીંથી 1:1").osis()).toEqual("1Cor.1.1")
		expect(p.parse("1 કોરીં. 1:1").osis()).toEqual("1Cor.1.1")
		expect(p.parse("૧ કોરીં. 1:1").osis()).toEqual("1Cor.1.1")
		expect(p.parse("1 કોરીં 1:1").osis()).toEqual("1Cor.1.1")
		expect(p.parse("૧ કોરીં 1:1").osis()).toEqual("1Cor.1.1")
		expect(p.parse("1કોરી 1:1").osis()).toEqual("1Cor.1.1")
		expect(p.parse("૧કોરી 1:1").osis()).toEqual("1Cor.1.1")
		expect(p.parse("1COR 1:1").osis()).toEqual("1Cor.1.1")
		`
		true
describe "Localized book Gal (gu)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: Gal (gu)", ->
		`
		expect(p.parse("ગલાતીઓને પત્ર 1:1").osis()).toEqual("Gal.1.1")
		expect(p.parse("ગલાતી 1:1").osis()).toEqual("Gal.1.1")
		expect(p.parse("Gal 1:1").osis()).toEqual("Gal.1.1")
		expect(p.parse("ગલા 1:1").osis()).toEqual("Gal.1.1")
		p.include_apocrypha(false)
		expect(p.parse("ગલાતીઓને પત્ર 1:1").osis()).toEqual("Gal.1.1")
		expect(p.parse("ગલાતી 1:1").osis()).toEqual("Gal.1.1")
		expect(p.parse("GAL 1:1").osis()).toEqual("Gal.1.1")
		expect(p.parse("ગલા 1:1").osis()).toEqual("Gal.1.1")
		`
		true
describe "Localized book Eph (gu)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: Eph (gu)", ->
		`
		expect(p.parse("એફેસીઓને પત્ર 1:1").osis()).toEqual("Eph.1.1")
		expect(p.parse("એફેસી 1:1").osis()).toEqual("Eph.1.1")
		expect(p.parse("Eph 1:1").osis()).toEqual("Eph.1.1")
		expect(p.parse("એફે 1:1").osis()).toEqual("Eph.1.1")
		p.include_apocrypha(false)
		expect(p.parse("એફેસીઓને પત્ર 1:1").osis()).toEqual("Eph.1.1")
		expect(p.parse("એફેસી 1:1").osis()).toEqual("Eph.1.1")
		expect(p.parse("EPH 1:1").osis()).toEqual("Eph.1.1")
		expect(p.parse("એફે 1:1").osis()).toEqual("Eph.1.1")
		`
		true
describe "Localized book Phil (gu)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: Phil (gu)", ->
		`
		expect(p.parse("ફિલિપીઓને પત્ર 1:1").osis()).toEqual("Phil.1.1")
		expect(p.parse("ફિલીપી 1:1").osis()).toEqual("Phil.1.1")
		expect(p.parse("Phil 1:1").osis()).toEqual("Phil.1.1")
		expect(p.parse("ફિલિ 1:1").osis()).toEqual("Phil.1.1")
		p.include_apocrypha(false)
		expect(p.parse("ફિલિપીઓને પત્ર 1:1").osis()).toEqual("Phil.1.1")
		expect(p.parse("ફિલીપી 1:1").osis()).toEqual("Phil.1.1")
		expect(p.parse("PHIL 1:1").osis()).toEqual("Phil.1.1")
		expect(p.parse("ફિલિ 1:1").osis()).toEqual("Phil.1.1")
		`
		true
describe "Localized book Col (gu)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: Col (gu)", ->
		`
		expect(p.parse("કલોસીઓને પત્ર 1:1").osis()).toEqual("Col.1.1")
		expect(p.parse("કલોસ્સી 1:1").osis()).toEqual("Col.1.1")
		expect(p.parse("ક્લોસી. 1:1").osis()).toEqual("Col.1.1")
		expect(p.parse("ક્લોસી 1:1").osis()).toEqual("Col.1.1")
		expect(p.parse("કૉલો 1:1").osis()).toEqual("Col.1.1")
		expect(p.parse("Col 1:1").osis()).toEqual("Col.1.1")
		p.include_apocrypha(false)
		expect(p.parse("કલોસીઓને પત્ર 1:1").osis()).toEqual("Col.1.1")
		expect(p.parse("કલોસ્સી 1:1").osis()).toEqual("Col.1.1")
		expect(p.parse("ક્લોસી. 1:1").osis()).toEqual("Col.1.1")
		expect(p.parse("ક્લોસી 1:1").osis()).toEqual("Col.1.1")
		expect(p.parse("કૉલો 1:1").osis()).toEqual("Col.1.1")
		expect(p.parse("COL 1:1").osis()).toEqual("Col.1.1")
		`
		true
describe "Localized book 2Thess (gu)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: 2Thess (gu)", ->
		`
		expect(p.parse("થેસ્સાલોનિકીઓને બીજો પત્ર 1:1").osis()).toEqual("2Thess.1.1")
		expect(p.parse("2Thess 1:1").osis()).toEqual("2Thess.1.1")
		expect(p.parse("2થેસા 1:1").osis()).toEqual("2Thess.1.1")
		expect(p.parse("૨થેસા 1:1").osis()).toEqual("2Thess.1.1")
		`
		true
	it "should handle non-Latin digits in book: 2Thess (gu)", ->
		p.set_options non_latin_digits_strategy: "replace"
		`
		expect(p.parse("થેસ્સાલોનિકીઓને બીજો પત્ર 1:1").osis()).toEqual("2Thess.1.1")
		expect(p.parse("2Thess 1:1").osis()).toEqual("2Thess.1.1")
		expect(p.parse("2થેસા 1:1").osis()).toEqual("2Thess.1.1")
		expect(p.parse("૨થેસા 1:1").osis()).toEqual("2Thess.1.1")
		p.include_apocrypha(false)
		expect(p.parse("થેસ્સાલોનિકીઓને બીજો પત્ર 1:1").osis()).toEqual("2Thess.1.1")
		expect(p.parse("2THESS 1:1").osis()).toEqual("2Thess.1.1")
		expect(p.parse("2થેસા 1:1").osis()).toEqual("2Thess.1.1")
		expect(p.parse("૨થેસા 1:1").osis()).toEqual("2Thess.1.1")
		`
		true
describe "Localized book 1Thess (gu)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: 1Thess (gu)", ->
		`
		expect(p.parse("થેસ્સાલોનિકીઓને પહેલો પત્ર 1:1").osis()).toEqual("1Thess.1.1")
		expect(p.parse("1 થેસ્સાલોનીકી 1:1").osis()).toEqual("1Thess.1.1")
		expect(p.parse("1 થેસ્સા. 1:1").osis()).toEqual("1Thess.1.1")
		expect(p.parse("1 થેસ્સા 1:1").osis()).toEqual("1Thess.1.1")
		expect(p.parse("1Thess 1:1").osis()).toEqual("1Thess.1.1")
		expect(p.parse("1થેસા 1:1").osis()).toEqual("1Thess.1.1")
		expect(p.parse("૧થેસા 1:1").osis()).toEqual("1Thess.1.1")
		`
		true
	it "should handle non-Latin digits in book: 1Thess (gu)", ->
		p.set_options non_latin_digits_strategy: "replace"
		`
		expect(p.parse("થેસ્સાલોનિકીઓને પહેલો પત્ર 1:1").osis()).toEqual("1Thess.1.1")
		expect(p.parse("1 થેસ્સાલોનીકી 1:1").osis()).toEqual("1Thess.1.1")
		expect(p.parse("1 થેસ્સા. 1:1").osis()).toEqual("1Thess.1.1")
		expect(p.parse("1 થેસ્સા 1:1").osis()).toEqual("1Thess.1.1")
		expect(p.parse("1Thess 1:1").osis()).toEqual("1Thess.1.1")
		expect(p.parse("1થેસા 1:1").osis()).toEqual("1Thess.1.1")
		expect(p.parse("૧થેસા 1:1").osis()).toEqual("1Thess.1.1")
		p.include_apocrypha(false)
		expect(p.parse("થેસ્સાલોનિકીઓને પહેલો પત્ર 1:1").osis()).toEqual("1Thess.1.1")
		expect(p.parse("1 થેસ્સાલોનીકી 1:1").osis()).toEqual("1Thess.1.1")
		expect(p.parse("1 થેસ્સા. 1:1").osis()).toEqual("1Thess.1.1")
		expect(p.parse("1 થેસ્સા 1:1").osis()).toEqual("1Thess.1.1")
		expect(p.parse("1THESS 1:1").osis()).toEqual("1Thess.1.1")
		expect(p.parse("1થેસા 1:1").osis()).toEqual("1Thess.1.1")
		expect(p.parse("૧થેસા 1:1").osis()).toEqual("1Thess.1.1")
		`
		true
describe "Localized book 2Tim (gu)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: 2Tim (gu)", ->
		`
		expect(p.parse("તિમોથીને બીજો પત્ર 1:1").osis()).toEqual("2Tim.1.1")
		expect(p.parse("2તીમો 1:1").osis()).toEqual("2Tim.1.1")
		expect(p.parse("૨તીમો 1:1").osis()).toEqual("2Tim.1.1")
		expect(p.parse("2Tim 1:1").osis()).toEqual("2Tim.1.1")
		`
		true
	it "should handle non-Latin digits in book: 2Tim (gu)", ->
		p.set_options non_latin_digits_strategy: "replace"
		`
		expect(p.parse("તિમોથીને બીજો પત્ર 1:1").osis()).toEqual("2Tim.1.1")
		expect(p.parse("2તીમો 1:1").osis()).toEqual("2Tim.1.1")
		expect(p.parse("૨તીમો 1:1").osis()).toEqual("2Tim.1.1")
		expect(p.parse("2Tim 1:1").osis()).toEqual("2Tim.1.1")
		p.include_apocrypha(false)
		expect(p.parse("તિમોથીને બીજો પત્ર 1:1").osis()).toEqual("2Tim.1.1")
		expect(p.parse("2તીમો 1:1").osis()).toEqual("2Tim.1.1")
		expect(p.parse("૨તીમો 1:1").osis()).toEqual("2Tim.1.1")
		expect(p.parse("2TIM 1:1").osis()).toEqual("2Tim.1.1")
		`
		true
describe "Localized book 1Tim (gu)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: 1Tim (gu)", ->
		`
		expect(p.parse("તિમોથીને પહેલો પત્ર 1:1").osis()).toEqual("1Tim.1.1")
		expect(p.parse("1 તીમોથી 1:1").osis()).toEqual("1Tim.1.1")
		expect(p.parse("1તીમો 1:1").osis()).toEqual("1Tim.1.1")
		expect(p.parse("૧તીમો 1:1").osis()).toEqual("1Tim.1.1")
		expect(p.parse("1Tim 1:1").osis()).toEqual("1Tim.1.1")
		`
		true
	it "should handle non-Latin digits in book: 1Tim (gu)", ->
		p.set_options non_latin_digits_strategy: "replace"
		`
		expect(p.parse("તિમોથીને પહેલો પત્ર 1:1").osis()).toEqual("1Tim.1.1")
		expect(p.parse("1 તીમોથી 1:1").osis()).toEqual("1Tim.1.1")
		expect(p.parse("1તીમો 1:1").osis()).toEqual("1Tim.1.1")
		expect(p.parse("૧તીમો 1:1").osis()).toEqual("1Tim.1.1")
		expect(p.parse("1Tim 1:1").osis()).toEqual("1Tim.1.1")
		p.include_apocrypha(false)
		expect(p.parse("તિમોથીને પહેલો પત્ર 1:1").osis()).toEqual("1Tim.1.1")
		expect(p.parse("1 તીમોથી 1:1").osis()).toEqual("1Tim.1.1")
		expect(p.parse("1તીમો 1:1").osis()).toEqual("1Tim.1.1")
		expect(p.parse("૧તીમો 1:1").osis()).toEqual("1Tim.1.1")
		expect(p.parse("1TIM 1:1").osis()).toEqual("1Tim.1.1")
		`
		true
describe "Localized book Titus (gu)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: Titus (gu)", ->
		`
		expect(p.parse("તિતસને પત્ર 1:1").osis()).toEqual("Titus.1.1")
		expect(p.parse("Titus 1:1").osis()).toEqual("Titus.1.1")
		expect(p.parse("તીત 1:1").osis()).toEqual("Titus.1.1")
		p.include_apocrypha(false)
		expect(p.parse("તિતસને પત્ર 1:1").osis()).toEqual("Titus.1.1")
		expect(p.parse("TITUS 1:1").osis()).toEqual("Titus.1.1")
		expect(p.parse("તીત 1:1").osis()).toEqual("Titus.1.1")
		`
		true
describe "Localized book Phlm (gu)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: Phlm (gu)", ->
		`
		expect(p.parse("ફિલેમોનને પાઉલ પ્રેરિતનો પત્ર 1:1").osis()).toEqual("Phlm.1.1")
		expect(p.parse("Phlm 1:1").osis()).toEqual("Phlm.1.1")
		expect(p.parse("ફિલે 1:1").osis()).toEqual("Phlm.1.1")
		p.include_apocrypha(false)
		expect(p.parse("ફિલેમોનને પાઉલ પ્રેરિતનો પત્ર 1:1").osis()).toEqual("Phlm.1.1")
		expect(p.parse("PHLM 1:1").osis()).toEqual("Phlm.1.1")
		expect(p.parse("ફિલે 1:1").osis()).toEqual("Phlm.1.1")
		`
		true
describe "Localized book Heb (gu)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: Heb (gu)", ->
		`
		expect(p.parse("હિબ્રૂઓને પત્ર 1:1").osis()).toEqual("Heb.1.1")
		expect(p.parse("હિબ્રૂ. 1:1").osis()).toEqual("Heb.1.1")
		expect(p.parse("હેબ્રી. 1:1").osis()).toEqual("Heb.1.1")
		expect(p.parse("હિબ્રૂ 1:1").osis()).toEqual("Heb.1.1")
		expect(p.parse("હીબ્રુ 1:1").osis()).toEqual("Heb.1.1")
		expect(p.parse("હેબ્રી 1:1").osis()).toEqual("Heb.1.1")
		expect(p.parse("Heb 1:1").osis()).toEqual("Heb.1.1")
		p.include_apocrypha(false)
		expect(p.parse("હિબ્રૂઓને પત્ર 1:1").osis()).toEqual("Heb.1.1")
		expect(p.parse("હિબ્રૂ. 1:1").osis()).toEqual("Heb.1.1")
		expect(p.parse("હેબ્રી. 1:1").osis()).toEqual("Heb.1.1")
		expect(p.parse("હિબ્રૂ 1:1").osis()).toEqual("Heb.1.1")
		expect(p.parse("હીબ્રુ 1:1").osis()).toEqual("Heb.1.1")
		expect(p.parse("હેબ્રી 1:1").osis()).toEqual("Heb.1.1")
		expect(p.parse("HEB 1:1").osis()).toEqual("Heb.1.1")
		`
		true
describe "Localized book Jas (gu)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: Jas (gu)", ->
		`
		expect(p.parse("યાકૂબનો પત્ર 1:1").osis()).toEqual("Jas.1.1")
		expect(p.parse("યાકૂબ 1:1").osis()).toEqual("Jas.1.1")
		expect(p.parse("યાકુ 1:1").osis()).toEqual("Jas.1.1")
		expect(p.parse("Jas 1:1").osis()).toEqual("Jas.1.1")
		p.include_apocrypha(false)
		expect(p.parse("યાકૂબનો પત્ર 1:1").osis()).toEqual("Jas.1.1")
		expect(p.parse("યાકૂબ 1:1").osis()).toEqual("Jas.1.1")
		expect(p.parse("યાકુ 1:1").osis()).toEqual("Jas.1.1")
		expect(p.parse("JAS 1:1").osis()).toEqual("Jas.1.1")
		`
		true
describe "Localized book 2Pet (gu)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: 2Pet (gu)", ->
		`
		expect(p.parse("પિતરનો બીજો પત્ર 1:1").osis()).toEqual("2Pet.1.1")
		expect(p.parse("2 પિતર 1:1").osis()).toEqual("2Pet.1.1")
		expect(p.parse("2પિત્ત 1:1").osis()).toEqual("2Pet.1.1")
		expect(p.parse("૨પિત્ત 1:1").osis()).toEqual("2Pet.1.1")
		expect(p.parse("2Pet 1:1").osis()).toEqual("2Pet.1.1")
		`
		true
	it "should handle non-Latin digits in book: 2Pet (gu)", ->
		p.set_options non_latin_digits_strategy: "replace"
		`
		expect(p.parse("પિતરનો બીજો પત્ર 1:1").osis()).toEqual("2Pet.1.1")
		expect(p.parse("2 પિતર 1:1").osis()).toEqual("2Pet.1.1")
		expect(p.parse("2પિત્ત 1:1").osis()).toEqual("2Pet.1.1")
		expect(p.parse("૨પિત્ત 1:1").osis()).toEqual("2Pet.1.1")
		expect(p.parse("2Pet 1:1").osis()).toEqual("2Pet.1.1")
		p.include_apocrypha(false)
		expect(p.parse("પિતરનો બીજો પત્ર 1:1").osis()).toEqual("2Pet.1.1")
		expect(p.parse("2 પિતર 1:1").osis()).toEqual("2Pet.1.1")
		expect(p.parse("2પિત્ત 1:1").osis()).toEqual("2Pet.1.1")
		expect(p.parse("૨પિત્ત 1:1").osis()).toEqual("2Pet.1.1")
		expect(p.parse("2PET 1:1").osis()).toEqual("2Pet.1.1")
		`
		true
describe "Localized book 1Pet (gu)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: 1Pet (gu)", ->
		`
		expect(p.parse("પિતરનો પહેલો પત્ર 1:1").osis()).toEqual("1Pet.1.1")
		expect(p.parse("1. પીત્તર 1:1").osis()).toEqual("1Pet.1.1")
		expect(p.parse("1 પીત્તર 1:1").osis()).toEqual("1Pet.1.1")
		expect(p.parse("1 પિતર 1:1").osis()).toEqual("1Pet.1.1")
		expect(p.parse("1પીત્ત 1:1").osis()).toEqual("1Pet.1.1")
		expect(p.parse("૧પીત્ત 1:1").osis()).toEqual("1Pet.1.1")
		expect(p.parse("1Pet 1:1").osis()).toEqual("1Pet.1.1")
		`
		true
	it "should handle non-Latin digits in book: 1Pet (gu)", ->
		p.set_options non_latin_digits_strategy: "replace"
		`
		expect(p.parse("પિતરનો પહેલો પત્ર 1:1").osis()).toEqual("1Pet.1.1")
		expect(p.parse("1. પીત્તર 1:1").osis()).toEqual("1Pet.1.1")
		expect(p.parse("1 પીત્તર 1:1").osis()).toEqual("1Pet.1.1")
		expect(p.parse("1 પિતર 1:1").osis()).toEqual("1Pet.1.1")
		expect(p.parse("1પીત્ત 1:1").osis()).toEqual("1Pet.1.1")
		expect(p.parse("૧પીત્ત 1:1").osis()).toEqual("1Pet.1.1")
		expect(p.parse("1Pet 1:1").osis()).toEqual("1Pet.1.1")
		p.include_apocrypha(false)
		expect(p.parse("પિતરનો પહેલો પત્ર 1:1").osis()).toEqual("1Pet.1.1")
		expect(p.parse("1. પીત્તર 1:1").osis()).toEqual("1Pet.1.1")
		expect(p.parse("1 પીત્તર 1:1").osis()).toEqual("1Pet.1.1")
		expect(p.parse("1 પિતર 1:1").osis()).toEqual("1Pet.1.1")
		expect(p.parse("1પીત્ત 1:1").osis()).toEqual("1Pet.1.1")
		expect(p.parse("૧પીત્ત 1:1").osis()).toEqual("1Pet.1.1")
		expect(p.parse("1PET 1:1").osis()).toEqual("1Pet.1.1")
		`
		true
describe "Localized book Jude (gu)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: Jude (gu)", ->
		`
		expect(p.parse("યહૂદાનો પત્ર 1:1").osis()).toEqual("Jude.1.1")
		expect(p.parse("યહુદા 1:1").osis()).toEqual("Jude.1.1")
		expect(p.parse("Jude 1:1").osis()).toEqual("Jude.1.1")
		expect(p.parse("યહુ 1:1").osis()).toEqual("Jude.1.1")
		p.include_apocrypha(false)
		expect(p.parse("યહૂદાનો પત્ર 1:1").osis()).toEqual("Jude.1.1")
		expect(p.parse("યહુદા 1:1").osis()).toEqual("Jude.1.1")
		expect(p.parse("JUDE 1:1").osis()).toEqual("Jude.1.1")
		expect(p.parse("યહુ 1:1").osis()).toEqual("Jude.1.1")
		`
		true
describe "Localized book Tob (gu)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: Tob (gu)", ->
		`
		expect(p.parse("Tob 1:1").osis()).toEqual("Tob.1.1")
		`
		true
describe "Localized book Jdt (gu)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: Jdt (gu)", ->
		`
		expect(p.parse("Jdt 1:1").osis()).toEqual("Jdt.1.1")
		`
		true
describe "Localized book Bar (gu)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: Bar (gu)", ->
		`
		expect(p.parse("Bar 1:1").osis()).toEqual("Bar.1.1")
		`
		true
describe "Localized book Sus (gu)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: Sus (gu)", ->
		`
		expect(p.parse("Sus 1:1").osis()).toEqual("Sus.1.1")
		`
		true
describe "Localized book 2Macc (gu)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: 2Macc (gu)", ->
		`
		expect(p.parse("2Macc 1:1").osis()).toEqual("2Macc.1.1")
		`
		true
describe "Localized book 3Macc (gu)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: 3Macc (gu)", ->
		`
		expect(p.parse("3Macc 1:1").osis()).toEqual("3Macc.1.1")
		`
		true
describe "Localized book 4Macc (gu)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: 4Macc (gu)", ->
		`
		expect(p.parse("4Macc 1:1").osis()).toEqual("4Macc.1.1")
		`
		true
describe "Localized book 1Macc (gu)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: 1Macc (gu)", ->
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
		expect(p.languages).toEqual ["gu"]

	it "should handle ranges (gu)", ->
		expect(p.parse("Titus 1:1 થી 2").osis()).toEqual "Titus.1.1-Titus.1.2"
		expect(p.parse("Matt 1થી2").osis()).toEqual "Matt.1-Matt.2"
		expect(p.parse("Phlm 2 થી 3").osis()).toEqual "Phlm.1.2-Phlm.1.3"
	it "should handle chapters (gu)", ->
		expect(p.parse("Titus 1:1, પ્રકરણ 2").osis()).toEqual "Titus.1.1,Titus.2"
		expect(p.parse("Matt 3:4 પ્રકરણ 6").osis()).toEqual "Matt.3.4,Matt.6"
	it "should handle verses (gu)", ->
		expect(p.parse("Exod 1:1 શ્લોક 3").osis()).toEqual "Exod.1.1,Exod.1.3"
		expect(p.parse("Phlm શ્લોક 6").osis()).toEqual "Phlm.1.6"
	it "should handle 'and' (gu)", ->
		expect(p.parse("Exod 1:1 અને 3").osis()).toEqual "Exod.1.1,Exod.1.3"
		expect(p.parse("Phlm 2 અને 6").osis()).toEqual "Phlm.1.2,Phlm.1.6"
	it "should handle titles (gu)", ->
		expect(p.parse("Ps 3 title, 4:2, 5:title").osis()).toEqual "Ps.3.1,Ps.4.2,Ps.5.1"
		expect(p.parse("PS 3 TITLE, 4:2, 5:TITLE").osis()).toEqual "Ps.3.1,Ps.4.2,Ps.5.1"
	it "should handle 'ff' (gu)", ->
		expect(p.parse("Rev 3ff, 4:2ff").osis()).toEqual "Rev.3-Rev.22,Rev.4.2-Rev.4.11"
		expect(p.parse("REV 3 FF, 4:2 FF").osis()).toEqual "Rev.3-Rev.22,Rev.4.2-Rev.4.11"
	it "should handle translations (gu)", ->
		expect(p.parse("Lev 1 (gu2017)").osis_and_translations()).toEqual [["Lev.1", "gu2017"]]
		expect(p.parse("lev 1 gu2017").osis_and_translations()).toEqual [["Lev.1", "gu2017"]]
	it "should handle boundaries (gu)", ->
		p.set_options {book_alone_strategy: "full"}
		expect(p.parse("\u2014Matt\u2014").osis()).toEqual "Matt.1-Matt.28"
		expect(p.parse("\u201cMatt 1:1\u201d").osis()).toEqual "Matt.1.1"
