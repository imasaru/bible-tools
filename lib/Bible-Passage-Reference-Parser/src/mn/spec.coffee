bcv_parser = require("../../js/mn_bcv_parser.js").bcv_parser

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

describe "Localized book Gen (mn)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: Gen (mn)", ->
		`
		expect(p.parse("Эхлэл 1:1").osis()).toEqual("Gen.1.1")
		expect(p.parse("Gen 1:1").osis()).toEqual("Gen.1.1")
		expect(p.parse("Эхл 1:1").osis()).toEqual("Gen.1.1")
		expect(p.parse("Эх 1:1").osis()).toEqual("Gen.1.1")
		p.include_apocrypha(false)
		expect(p.parse("ЭХЛЭЛ 1:1").osis()).toEqual("Gen.1.1")
		expect(p.parse("GEN 1:1").osis()).toEqual("Gen.1.1")
		expect(p.parse("ЭХЛ 1:1").osis()).toEqual("Gen.1.1")
		expect(p.parse("ЭХ 1:1").osis()).toEqual("Gen.1.1")
		`
		true
describe "Localized book Exod (mn)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: Exod (mn)", ->
		`
		expect(p.parse("Египетээс гарсан нь 1:1").osis()).toEqual("Exod.1.1")
		expect(p.parse("Гэтлэл 1:1").osis()).toEqual("Exod.1.1")
		expect(p.parse("Ег.гар 1:1").osis()).toEqual("Exod.1.1")
		expect(p.parse("Ег. Г 1:1").osis()).toEqual("Exod.1.1")
		expect(p.parse("Еггар 1:1").osis()).toEqual("Exod.1.1")
		expect(p.parse("Exod 1:1").osis()).toEqual("Exod.1.1")
		expect(p.parse("Ег Г 1:1").osis()).toEqual("Exod.1.1")
		expect(p.parse("Егга 1:1").osis()).toEqual("Exod.1.1")
		expect(p.parse("Гэт 1:1").osis()).toEqual("Exod.1.1")
		expect(p.parse("Ег 1:1").osis()).toEqual("Exod.1.1")
		p.include_apocrypha(false)
		expect(p.parse("ЕГИПЕТЭЭС ГАРСАН НЬ 1:1").osis()).toEqual("Exod.1.1")
		expect(p.parse("ГЭТЛЭЛ 1:1").osis()).toEqual("Exod.1.1")
		expect(p.parse("ЕГ.ГАР 1:1").osis()).toEqual("Exod.1.1")
		expect(p.parse("ЕГ. Г 1:1").osis()).toEqual("Exod.1.1")
		expect(p.parse("ЕГГАР 1:1").osis()).toEqual("Exod.1.1")
		expect(p.parse("EXOD 1:1").osis()).toEqual("Exod.1.1")
		expect(p.parse("ЕГ Г 1:1").osis()).toEqual("Exod.1.1")
		expect(p.parse("ЕГГА 1:1").osis()).toEqual("Exod.1.1")
		expect(p.parse("ГЭТ 1:1").osis()).toEqual("Exod.1.1")
		expect(p.parse("ЕГ 1:1").osis()).toEqual("Exod.1.1")
		`
		true
describe "Localized book Bel (mn)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: Bel (mn)", ->
		`
		expect(p.parse("Bel 1:1").osis()).toEqual("Bel.1.1")
		`
		true
describe "Localized book Lev (mn)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: Lev (mn)", ->
		`
		expect(p.parse("Левит 1:1").osis()).toEqual("Lev.1.1")
		expect(p.parse("Леви 1:1").osis()).toEqual("Lev.1.1")
		expect(p.parse("Lev 1:1").osis()).toEqual("Lev.1.1")
		expect(p.parse("Лев 1:1").osis()).toEqual("Lev.1.1")
		expect(p.parse("Лв 1:1").osis()).toEqual("Lev.1.1")
		p.include_apocrypha(false)
		expect(p.parse("ЛЕВИТ 1:1").osis()).toEqual("Lev.1.1")
		expect(p.parse("ЛЕВИ 1:1").osis()).toEqual("Lev.1.1")
		expect(p.parse("LEV 1:1").osis()).toEqual("Lev.1.1")
		expect(p.parse("ЛЕВ 1:1").osis()).toEqual("Lev.1.1")
		expect(p.parse("ЛВ 1:1").osis()).toEqual("Lev.1.1")
		`
		true
describe "Localized book Num (mn)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: Num (mn)", ->
		`
		expect(p.parse("Тооллого 1:1").osis()).toEqual("Num.1.1")
		expect(p.parse("Num 1:1").osis()).toEqual("Num.1.1")
		expect(p.parse("Тоо 1:1").osis()).toEqual("Num.1.1")
		expect(p.parse("То 1:1").osis()).toEqual("Num.1.1")
		p.include_apocrypha(false)
		expect(p.parse("ТООЛЛОГО 1:1").osis()).toEqual("Num.1.1")
		expect(p.parse("NUM 1:1").osis()).toEqual("Num.1.1")
		expect(p.parse("ТОО 1:1").osis()).toEqual("Num.1.1")
		expect(p.parse("ТО 1:1").osis()).toEqual("Num.1.1")
		`
		true
describe "Localized book Sir (mn)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: Sir (mn)", ->
		`
		expect(p.parse("Sir 1:1").osis()).toEqual("Sir.1.1")
		`
		true
describe "Localized book Wis (mn)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: Wis (mn)", ->
		`
		expect(p.parse("Wis 1:1").osis()).toEqual("Wis.1.1")
		`
		true
describe "Localized book Lam (mn)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: Lam (mn)", ->
		`
		expect(p.parse("Гашуудал 1:1").osis()).toEqual("Lam.1.1")
		expect(p.parse("Lam 1:1").osis()).toEqual("Lam.1.1")
		expect(p.parse("Гаш 1:1").osis()).toEqual("Lam.1.1")
		p.include_apocrypha(false)
		expect(p.parse("ГАШУУДАЛ 1:1").osis()).toEqual("Lam.1.1")
		expect(p.parse("LAM 1:1").osis()).toEqual("Lam.1.1")
		expect(p.parse("ГАШ 1:1").osis()).toEqual("Lam.1.1")
		`
		true
describe "Localized book EpJer (mn)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: EpJer (mn)", ->
		`
		expect(p.parse("EpJer 1:1").osis()).toEqual("EpJer.1.1")
		`
		true
describe "Localized book Rev (mn)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: Rev (mn)", ->
		`
		expect(p.parse("Илчлэлт 1:1").osis()).toEqual("Rev.1.1")
		expect(p.parse("Илчлэл 1:1").osis()).toEqual("Rev.1.1")
		expect(p.parse("Rev 1:1").osis()).toEqual("Rev.1.1")
		expect(p.parse("Илч 1:1").osis()).toEqual("Rev.1.1")
		p.include_apocrypha(false)
		expect(p.parse("ИЛЧЛЭЛТ 1:1").osis()).toEqual("Rev.1.1")
		expect(p.parse("ИЛЧЛЭЛ 1:1").osis()).toEqual("Rev.1.1")
		expect(p.parse("REV 1:1").osis()).toEqual("Rev.1.1")
		expect(p.parse("ИЛЧ 1:1").osis()).toEqual("Rev.1.1")
		`
		true
describe "Localized book PrMan (mn)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: PrMan (mn)", ->
		`
		expect(p.parse("PrMan 1:1").osis()).toEqual("PrMan.1.1")
		`
		true
describe "Localized book Deut (mn)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: Deut (mn)", ->
		`
		expect(p.parse("Дэд хууль 1:1").osis()).toEqual("Deut.1.1")
		expect(p.parse("Д. Хууль 1:1").osis()).toEqual("Deut.1.1")
		expect(p.parse("Д Хууль 1:1").osis()).toEqual("Deut.1.1")
		expect(p.parse("Дэд х 1:1").osis()).toEqual("Deut.1.1")
		expect(p.parse("Deut 1:1").osis()).toEqual("Deut.1.1")
		expect(p.parse("Д.Х. 1:1").osis()).toEqual("Deut.1.1")
		expect(p.parse("Д.Х 1:1").osis()).toEqual("Deut.1.1")
		expect(p.parse("ДХ. 1:1").osis()).toEqual("Deut.1.1")
		expect(p.parse("ДХ 1:1").osis()).toEqual("Deut.1.1")
		expect(p.parse("Дх 1:1").osis()).toEqual("Deut.1.1")
		p.include_apocrypha(false)
		expect(p.parse("ДЭД ХУУЛЬ 1:1").osis()).toEqual("Deut.1.1")
		expect(p.parse("Д. ХУУЛЬ 1:1").osis()).toEqual("Deut.1.1")
		expect(p.parse("Д ХУУЛЬ 1:1").osis()).toEqual("Deut.1.1")
		expect(p.parse("ДЭД Х 1:1").osis()).toEqual("Deut.1.1")
		expect(p.parse("DEUT 1:1").osis()).toEqual("Deut.1.1")
		expect(p.parse("Д.Х. 1:1").osis()).toEqual("Deut.1.1")
		expect(p.parse("Д.Х 1:1").osis()).toEqual("Deut.1.1")
		expect(p.parse("ДХ. 1:1").osis()).toEqual("Deut.1.1")
		expect(p.parse("ДХ 1:1").osis()).toEqual("Deut.1.1")
		expect(p.parse("ДХ 1:1").osis()).toEqual("Deut.1.1")
		`
		true
describe "Localized book Josh (mn)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: Josh (mn)", ->
		`
		expect(p.parse("Иошуа 1:1").osis()).toEqual("Josh.1.1")
		expect(p.parse("Josh 1:1").osis()).toEqual("Josh.1.1")
		expect(p.parse("Иош 1:1").osis()).toEqual("Josh.1.1")
		p.include_apocrypha(false)
		expect(p.parse("ИОШУА 1:1").osis()).toEqual("Josh.1.1")
		expect(p.parse("JOSH 1:1").osis()).toEqual("Josh.1.1")
		expect(p.parse("ИОШ 1:1").osis()).toEqual("Josh.1.1")
		`
		true
describe "Localized book Judg (mn)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: Judg (mn)", ->
		`
		expect(p.parse("Шүүгчид 1:1").osis()).toEqual("Judg.1.1")
		expect(p.parse("Judg 1:1").osis()).toEqual("Judg.1.1")
		expect(p.parse("Шүү 1:1").osis()).toEqual("Judg.1.1")
		p.include_apocrypha(false)
		expect(p.parse("ШҮҮГЧИД 1:1").osis()).toEqual("Judg.1.1")
		expect(p.parse("JUDG 1:1").osis()).toEqual("Judg.1.1")
		expect(p.parse("ШҮҮ 1:1").osis()).toEqual("Judg.1.1")
		`
		true
describe "Localized book Ruth (mn)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: Ruth (mn)", ->
		`
		expect(p.parse("Ruth 1:1").osis()).toEqual("Ruth.1.1")
		expect(p.parse("Рут 1:1").osis()).toEqual("Ruth.1.1")
		p.include_apocrypha(false)
		expect(p.parse("RUTH 1:1").osis()).toEqual("Ruth.1.1")
		expect(p.parse("РУТ 1:1").osis()).toEqual("Ruth.1.1")
		`
		true
describe "Localized book 1Esd (mn)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: 1Esd (mn)", ->
		`
		expect(p.parse("1Esd 1:1").osis()).toEqual("1Esd.1.1")
		`
		true
describe "Localized book 2Esd (mn)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: 2Esd (mn)", ->
		`
		expect(p.parse("2Esd 1:1").osis()).toEqual("2Esd.1.1")
		`
		true
describe "Localized book Isa (mn)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: Isa (mn)", ->
		`
		expect(p.parse("Исаиа 1:1").osis()).toEqual("Isa.1.1")
		expect(p.parse("Isa 1:1").osis()).toEqual("Isa.1.1")
		expect(p.parse("Иса 1:1").osis()).toEqual("Isa.1.1")
		p.include_apocrypha(false)
		expect(p.parse("ИСАИА 1:1").osis()).toEqual("Isa.1.1")
		expect(p.parse("ISA 1:1").osis()).toEqual("Isa.1.1")
		expect(p.parse("ИСА 1:1").osis()).toEqual("Isa.1.1")
		`
		true
describe "Localized book 2Sam (mn)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: 2Sam (mn)", ->
		`
		expect(p.parse("2 Самуел 1:1").osis()).toEqual("2Sam.1.1")
		expect(p.parse("2 Сам 1:1").osis()).toEqual("2Sam.1.1")
		expect(p.parse("2 См 1:1").osis()).toEqual("2Sam.1.1")
		expect(p.parse("2Sam 1:1").osis()).toEqual("2Sam.1.1")
		p.include_apocrypha(false)
		expect(p.parse("2 САМУЕЛ 1:1").osis()).toEqual("2Sam.1.1")
		expect(p.parse("2 САМ 1:1").osis()).toEqual("2Sam.1.1")
		expect(p.parse("2 СМ 1:1").osis()).toEqual("2Sam.1.1")
		expect(p.parse("2SAM 1:1").osis()).toEqual("2Sam.1.1")
		`
		true
describe "Localized book 1Sam (mn)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: 1Sam (mn)", ->
		`
		expect(p.parse("1 Самуел 1:1").osis()).toEqual("1Sam.1.1")
		expect(p.parse("1 Сам 1:1").osis()).toEqual("1Sam.1.1")
		expect(p.parse("1 См 1:1").osis()).toEqual("1Sam.1.1")
		expect(p.parse("1Sam 1:1").osis()).toEqual("1Sam.1.1")
		p.include_apocrypha(false)
		expect(p.parse("1 САМУЕЛ 1:1").osis()).toEqual("1Sam.1.1")
		expect(p.parse("1 САМ 1:1").osis()).toEqual("1Sam.1.1")
		expect(p.parse("1 СМ 1:1").osis()).toEqual("1Sam.1.1")
		expect(p.parse("1SAM 1:1").osis()).toEqual("1Sam.1.1")
		`
		true
describe "Localized book 2Kgs (mn)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: 2Kgs (mn)", ->
		`
		expect(p.parse("Хаадын дэд 1:1").osis()).toEqual("2Kgs.1.1")
		expect(p.parse("Ха. Дэд 1:1").osis()).toEqual("2Kgs.1.1")
		expect(p.parse("2 Хаад 1:1").osis()).toEqual("2Kgs.1.1")
		expect(p.parse("Х. Дэд 1:1").osis()).toEqual("2Kgs.1.1")
		expect(p.parse("Ха Дэд 1:1").osis()).toEqual("2Kgs.1.1")
		expect(p.parse("Х Дэд 1:1").osis()).toEqual("2Kgs.1.1")
		expect(p.parse("2 Ха 1:1").osis()).toEqual("2Kgs.1.1")
		expect(p.parse("2Kgs 1:1").osis()).toEqual("2Kgs.1.1")
		expect(p.parse("Хдэд 1:1").osis()).toEqual("2Kgs.1.1")
		p.include_apocrypha(false)
		expect(p.parse("ХААДЫН ДЭД 1:1").osis()).toEqual("2Kgs.1.1")
		expect(p.parse("ХА. ДЭД 1:1").osis()).toEqual("2Kgs.1.1")
		expect(p.parse("2 ХААД 1:1").osis()).toEqual("2Kgs.1.1")
		expect(p.parse("Х. ДЭД 1:1").osis()).toEqual("2Kgs.1.1")
		expect(p.parse("ХА ДЭД 1:1").osis()).toEqual("2Kgs.1.1")
		expect(p.parse("Х ДЭД 1:1").osis()).toEqual("2Kgs.1.1")
		expect(p.parse("2 ХА 1:1").osis()).toEqual("2Kgs.1.1")
		expect(p.parse("2KGS 1:1").osis()).toEqual("2Kgs.1.1")
		expect(p.parse("ХДЭД 1:1").osis()).toEqual("2Kgs.1.1")
		`
		true
describe "Localized book 1Kgs (mn)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: 1Kgs (mn)", ->
		`
		expect(p.parse("Хаадын дээд 1:1").osis()).toEqual("1Kgs.1.1")
		expect(p.parse("Ха. Дээд 1:1").osis()).toEqual("1Kgs.1.1")
		expect(p.parse("Х. Дээд 1:1").osis()).toEqual("1Kgs.1.1")
		expect(p.parse("Ха Дээд 1:1").osis()).toEqual("1Kgs.1.1")
		expect(p.parse("1 Хаад 1:1").osis()).toEqual("1Kgs.1.1")
		expect(p.parse("Х Дээд 1:1").osis()).toEqual("1Kgs.1.1")
		expect(p.parse("Хдээд 1:1").osis()).toEqual("1Kgs.1.1")
		expect(p.parse("1 Ха 1:1").osis()).toEqual("1Kgs.1.1")
		expect(p.parse("1Kgs 1:1").osis()).toEqual("1Kgs.1.1")
		expect(p.parse("Хдээ 1:1").osis()).toEqual("1Kgs.1.1")
		p.include_apocrypha(false)
		expect(p.parse("ХААДЫН ДЭЭД 1:1").osis()).toEqual("1Kgs.1.1")
		expect(p.parse("ХА. ДЭЭД 1:1").osis()).toEqual("1Kgs.1.1")
		expect(p.parse("Х. ДЭЭД 1:1").osis()).toEqual("1Kgs.1.1")
		expect(p.parse("ХА ДЭЭД 1:1").osis()).toEqual("1Kgs.1.1")
		expect(p.parse("1 ХААД 1:1").osis()).toEqual("1Kgs.1.1")
		expect(p.parse("Х ДЭЭД 1:1").osis()).toEqual("1Kgs.1.1")
		expect(p.parse("ХДЭЭД 1:1").osis()).toEqual("1Kgs.1.1")
		expect(p.parse("1 ХА 1:1").osis()).toEqual("1Kgs.1.1")
		expect(p.parse("1KGS 1:1").osis()).toEqual("1Kgs.1.1")
		expect(p.parse("ХДЭЭ 1:1").osis()).toEqual("1Kgs.1.1")
		`
		true
describe "Localized book 2Chr (mn)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: 2Chr (mn)", ->
		`
		expect(p.parse("Шастирын дэд 1:1").osis()).toEqual("2Chr.1.1")
		expect(p.parse("2 Шастир 1:1").osis()).toEqual("2Chr.1.1")
		expect(p.parse("Ша. Дэд 1:1").osis()).toEqual("2Chr.1.1")
		expect(p.parse("Ш. дэд 1:1").osis()).toEqual("2Chr.1.1")
		expect(p.parse("Ша Дэд 1:1").osis()).toEqual("2Chr.1.1")
		expect(p.parse("2 Шас 1:1").osis()).toEqual("2Chr.1.1")
		expect(p.parse("Ш дэд 1:1").osis()).toEqual("2Chr.1.1")
		expect(p.parse("2 Шс 1:1").osis()).toEqual("2Chr.1.1")
		expect(p.parse("2Chr 1:1").osis()).toEqual("2Chr.1.1")
		expect(p.parse("Шдэд 1:1").osis()).toEqual("2Chr.1.1")
		p.include_apocrypha(false)
		expect(p.parse("ШАСТИРЫН ДЭД 1:1").osis()).toEqual("2Chr.1.1")
		expect(p.parse("2 ШАСТИР 1:1").osis()).toEqual("2Chr.1.1")
		expect(p.parse("ША. ДЭД 1:1").osis()).toEqual("2Chr.1.1")
		expect(p.parse("Ш. ДЭД 1:1").osis()).toEqual("2Chr.1.1")
		expect(p.parse("ША ДЭД 1:1").osis()).toEqual("2Chr.1.1")
		expect(p.parse("2 ШАС 1:1").osis()).toEqual("2Chr.1.1")
		expect(p.parse("Ш ДЭД 1:1").osis()).toEqual("2Chr.1.1")
		expect(p.parse("2 ШС 1:1").osis()).toEqual("2Chr.1.1")
		expect(p.parse("2CHR 1:1").osis()).toEqual("2Chr.1.1")
		expect(p.parse("ШДЭД 1:1").osis()).toEqual("2Chr.1.1")
		`
		true
describe "Localized book 1Chr (mn)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: 1Chr (mn)", ->
		`
		expect(p.parse("Шастирын дээд 1:1").osis()).toEqual("1Chr.1.1")
		expect(p.parse("Ша. Дэээд 1:1").osis()).toEqual("1Chr.1.1")
		expect(p.parse("1 Шастир 1:1").osis()).toEqual("1Chr.1.1")
		expect(p.parse("Ша Дэээд 1:1").osis()).toEqual("1Chr.1.1")
		expect(p.parse("Ш. дээд 1:1").osis()).toEqual("1Chr.1.1")
		expect(p.parse("Ш дээд 1:1").osis()).toEqual("1Chr.1.1")
		expect(p.parse("1 Шас 1:1").osis()).toEqual("1Chr.1.1")
		expect(p.parse("1 Шс 1:1").osis()).toEqual("1Chr.1.1")
		expect(p.parse("1Chr 1:1").osis()).toEqual("1Chr.1.1")
		expect(p.parse("Шдээ 1:1").osis()).toEqual("1Chr.1.1")
		p.include_apocrypha(false)
		expect(p.parse("ШАСТИРЫН ДЭЭД 1:1").osis()).toEqual("1Chr.1.1")
		expect(p.parse("ША. ДЭЭЭД 1:1").osis()).toEqual("1Chr.1.1")
		expect(p.parse("1 ШАСТИР 1:1").osis()).toEqual("1Chr.1.1")
		expect(p.parse("ША ДЭЭЭД 1:1").osis()).toEqual("1Chr.1.1")
		expect(p.parse("Ш. ДЭЭД 1:1").osis()).toEqual("1Chr.1.1")
		expect(p.parse("Ш ДЭЭД 1:1").osis()).toEqual("1Chr.1.1")
		expect(p.parse("1 ШАС 1:1").osis()).toEqual("1Chr.1.1")
		expect(p.parse("1 ШС 1:1").osis()).toEqual("1Chr.1.1")
		expect(p.parse("1CHR 1:1").osis()).toEqual("1Chr.1.1")
		expect(p.parse("ШДЭЭ 1:1").osis()).toEqual("1Chr.1.1")
		`
		true
describe "Localized book Ezra (mn)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: Ezra (mn)", ->
		`
		expect(p.parse("Ezra 1:1").osis()).toEqual("Ezra.1.1")
		expect(p.parse("Езра 1:1").osis()).toEqual("Ezra.1.1")
		expect(p.parse("Езр 1:1").osis()).toEqual("Ezra.1.1")
		expect(p.parse("Ез 1:1").osis()).toEqual("Ezra.1.1")
		p.include_apocrypha(false)
		expect(p.parse("EZRA 1:1").osis()).toEqual("Ezra.1.1")
		expect(p.parse("ЕЗРА 1:1").osis()).toEqual("Ezra.1.1")
		expect(p.parse("ЕЗР 1:1").osis()).toEqual("Ezra.1.1")
		expect(p.parse("ЕЗ 1:1").osis()).toEqual("Ezra.1.1")
		`
		true
describe "Localized book Neh (mn)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: Neh (mn)", ->
		`
		expect(p.parse("Нехемиа 1:1").osis()).toEqual("Neh.1.1")
		expect(p.parse("Neh 1:1").osis()).toEqual("Neh.1.1")
		expect(p.parse("Нех 1:1").osis()).toEqual("Neh.1.1")
		p.include_apocrypha(false)
		expect(p.parse("НЕХЕМИА 1:1").osis()).toEqual("Neh.1.1")
		expect(p.parse("NEH 1:1").osis()).toEqual("Neh.1.1")
		expect(p.parse("НЕХ 1:1").osis()).toEqual("Neh.1.1")
		`
		true
describe "Localized book GkEsth (mn)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: GkEsth (mn)", ->
		`
		expect(p.parse("GkEsth 1:1").osis()).toEqual("GkEsth.1.1")
		`
		true
describe "Localized book Esth (mn)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: Esth (mn)", ->
		`
		expect(p.parse("Естер 1:1").osis()).toEqual("Esth.1.1")
		expect(p.parse("Esth 1:1").osis()).toEqual("Esth.1.1")
		expect(p.parse("Ест 1:1").osis()).toEqual("Esth.1.1")
		p.include_apocrypha(false)
		expect(p.parse("ЕСТЕР 1:1").osis()).toEqual("Esth.1.1")
		expect(p.parse("ESTH 1:1").osis()).toEqual("Esth.1.1")
		expect(p.parse("ЕСТ 1:1").osis()).toEqual("Esth.1.1")
		`
		true
describe "Localized book Job (mn)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: Job (mn)", ->
		`
		expect(p.parse("Job 1:1").osis()).toEqual("Job.1.1")
		expect(p.parse("Иов 1:1").osis()).toEqual("Job.1.1")
		p.include_apocrypha(false)
		expect(p.parse("JOB 1:1").osis()).toEqual("Job.1.1")
		expect(p.parse("ИОВ 1:1").osis()).toEqual("Job.1.1")
		`
		true
describe "Localized book Ps (mn)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: Ps (mn)", ->
		`
		expect(p.parse("Дуулал 1:1").osis()).toEqual("Ps.1.1")
		expect(p.parse("Дуул 1:1").osis()).toEqual("Ps.1.1")
		expect(p.parse("Дуу 1:1").osis()).toEqual("Ps.1.1")
		expect(p.parse("Ps 1:1").osis()).toEqual("Ps.1.1")
		p.include_apocrypha(false)
		expect(p.parse("ДУУЛАЛ 1:1").osis()).toEqual("Ps.1.1")
		expect(p.parse("ДУУЛ 1:1").osis()).toEqual("Ps.1.1")
		expect(p.parse("ДУУ 1:1").osis()).toEqual("Ps.1.1")
		expect(p.parse("PS 1:1").osis()).toEqual("Ps.1.1")
		`
		true
describe "Localized book PrAzar (mn)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: PrAzar (mn)", ->
		`
		expect(p.parse("PrAzar 1:1").osis()).toEqual("PrAzar.1.1")
		`
		true
describe "Localized book Prov (mn)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: Prov (mn)", ->
		`
		expect(p.parse("Сургаалт үгс 1:1").osis()).toEqual("Prov.1.1")
		expect(p.parse("Сур. үгс 1:1").osis()).toEqual("Prov.1.1")
		expect(p.parse("Сур үгс 1:1").osis()).toEqual("Prov.1.1")
		expect(p.parse("Сур. үг 1:1").osis()).toEqual("Prov.1.1")
		expect(p.parse("Су. үг 1:1").osis()).toEqual("Prov.1.1")
		expect(p.parse("Сур үг 1:1").osis()).toEqual("Prov.1.1")
		expect(p.parse("Су үг 1:1").osis()).toEqual("Prov.1.1")
		expect(p.parse("Сурүг 1:1").osis()).toEqual("Prov.1.1")
		expect(p.parse("Prov 1:1").osis()).toEqual("Prov.1.1")
		expect(p.parse("Сур 1:1").osis()).toEqual("Prov.1.1")
		p.include_apocrypha(false)
		expect(p.parse("СУРГААЛТ ҮГС 1:1").osis()).toEqual("Prov.1.1")
		expect(p.parse("СУР. ҮГС 1:1").osis()).toEqual("Prov.1.1")
		expect(p.parse("СУР ҮГС 1:1").osis()).toEqual("Prov.1.1")
		expect(p.parse("СУР. ҮГ 1:1").osis()).toEqual("Prov.1.1")
		expect(p.parse("СУ. ҮГ 1:1").osis()).toEqual("Prov.1.1")
		expect(p.parse("СУР ҮГ 1:1").osis()).toEqual("Prov.1.1")
		expect(p.parse("СУ ҮГ 1:1").osis()).toEqual("Prov.1.1")
		expect(p.parse("СУРҮГ 1:1").osis()).toEqual("Prov.1.1")
		expect(p.parse("PROV 1:1").osis()).toEqual("Prov.1.1")
		expect(p.parse("СУР 1:1").osis()).toEqual("Prov.1.1")
		`
		true
describe "Localized book Eccl (mn)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: Eccl (mn)", ->
		`
		expect(p.parse("Номлогчиин үгс 1:1").osis()).toEqual("Eccl.1.1")
		expect(p.parse("Номлогчийн үгс 1:1").osis()).toEqual("Eccl.1.1")
		expect(p.parse("Ном. үг 1:1").osis()).toEqual("Eccl.1.1")
		expect(p.parse("Ном үг 1:1").osis()).toEqual("Eccl.1.1")
		expect(p.parse("Eccl 1:1").osis()).toEqual("Eccl.1.1")
		expect(p.parse("Ном 1:1").osis()).toEqual("Eccl.1.1")
		p.include_apocrypha(false)
		expect(p.parse("НОМЛОГЧИИН ҮГС 1:1").osis()).toEqual("Eccl.1.1")
		expect(p.parse("НОМЛОГЧИЙН ҮГС 1:1").osis()).toEqual("Eccl.1.1")
		expect(p.parse("НОМ. ҮГ 1:1").osis()).toEqual("Eccl.1.1")
		expect(p.parse("НОМ ҮГ 1:1").osis()).toEqual("Eccl.1.1")
		expect(p.parse("ECCL 1:1").osis()).toEqual("Eccl.1.1")
		expect(p.parse("НОМ 1:1").osis()).toEqual("Eccl.1.1")
		`
		true
describe "Localized book SgThree (mn)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: SgThree (mn)", ->
		`
		expect(p.parse("SgThree 1:1").osis()).toEqual("SgThree.1.1")
		`
		true
describe "Localized book Song (mn)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: Song (mn)", ->
		`
		expect(p.parse("Соломоны дуун 1:1").osis()).toEqual("Song.1.1")
		expect(p.parse("Со дуун 1:1").osis()).toEqual("Song.1.1")
		expect(p.parse("Со. дуу 1:1").osis()).toEqual("Song.1.1")
		expect(p.parse("Со дуу 1:1").osis()).toEqual("Song.1.1")
		expect(p.parse("Song 1:1").osis()).toEqual("Song.1.1")
		expect(p.parse("Сол 1:1").osis()).toEqual("Song.1.1")
		expect(p.parse("Сд 1:1").osis()).toEqual("Song.1.1")
		p.include_apocrypha(false)
		expect(p.parse("СОЛОМОНЫ ДУУН 1:1").osis()).toEqual("Song.1.1")
		expect(p.parse("СО ДУУН 1:1").osis()).toEqual("Song.1.1")
		expect(p.parse("СО. ДУУ 1:1").osis()).toEqual("Song.1.1")
		expect(p.parse("СО ДУУ 1:1").osis()).toEqual("Song.1.1")
		expect(p.parse("SONG 1:1").osis()).toEqual("Song.1.1")
		expect(p.parse("СОЛ 1:1").osis()).toEqual("Song.1.1")
		expect(p.parse("СД 1:1").osis()).toEqual("Song.1.1")
		`
		true
describe "Localized book Jer (mn)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: Jer (mn)", ->
		`
		expect(p.parse("Иеремиа 1:1").osis()).toEqual("Jer.1.1")
		expect(p.parse("Jer 1:1").osis()).toEqual("Jer.1.1")
		expect(p.parse("Иер 1:1").osis()).toEqual("Jer.1.1")
		p.include_apocrypha(false)
		expect(p.parse("ИЕРЕМИА 1:1").osis()).toEqual("Jer.1.1")
		expect(p.parse("JER 1:1").osis()).toEqual("Jer.1.1")
		expect(p.parse("ИЕР 1:1").osis()).toEqual("Jer.1.1")
		`
		true
describe "Localized book Ezek (mn)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: Ezek (mn)", ->
		`
		expect(p.parse("Езекиел 1:1").osis()).toEqual("Ezek.1.1")
		expect(p.parse("Ezek 1:1").osis()).toEqual("Ezek.1.1")
		expect(p.parse("Езек 1:1").osis()).toEqual("Ezek.1.1")
		expect(p.parse("Езе 1:1").osis()).toEqual("Ezek.1.1")
		expect(p.parse("Езк 1:1").osis()).toEqual("Ezek.1.1")
		p.include_apocrypha(false)
		expect(p.parse("ЕЗЕКИЕЛ 1:1").osis()).toEqual("Ezek.1.1")
		expect(p.parse("EZEK 1:1").osis()).toEqual("Ezek.1.1")
		expect(p.parse("ЕЗЕК 1:1").osis()).toEqual("Ezek.1.1")
		expect(p.parse("ЕЗЕ 1:1").osis()).toEqual("Ezek.1.1")
		expect(p.parse("ЕЗК 1:1").osis()).toEqual("Ezek.1.1")
		`
		true
describe "Localized book Dan (mn)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: Dan (mn)", ->
		`
		expect(p.parse("Даниел 1:1").osis()).toEqual("Dan.1.1")
		expect(p.parse("Dan 1:1").osis()).toEqual("Dan.1.1")
		expect(p.parse("Дан 1:1").osis()).toEqual("Dan.1.1")
		p.include_apocrypha(false)
		expect(p.parse("ДАНИЕЛ 1:1").osis()).toEqual("Dan.1.1")
		expect(p.parse("DAN 1:1").osis()).toEqual("Dan.1.1")
		expect(p.parse("ДАН 1:1").osis()).toEqual("Dan.1.1")
		`
		true
describe "Localized book Hos (mn)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: Hos (mn)", ->
		`
		expect(p.parse("Хосеа 1:1").osis()).toEqual("Hos.1.1")
		expect(p.parse("Hos 1:1").osis()).toEqual("Hos.1.1")
		expect(p.parse("Хос 1:1").osis()).toEqual("Hos.1.1")
		p.include_apocrypha(false)
		expect(p.parse("ХОСЕА 1:1").osis()).toEqual("Hos.1.1")
		expect(p.parse("HOS 1:1").osis()).toEqual("Hos.1.1")
		expect(p.parse("ХОС 1:1").osis()).toEqual("Hos.1.1")
		`
		true
describe "Localized book Joel (mn)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: Joel (mn)", ->
		`
		expect(p.parse("Joel 1:1").osis()).toEqual("Joel.1.1")
		expect(p.parse("Иоел 1:1").osis()).toEqual("Joel.1.1")
		expect(p.parse("Иое 1:1").osis()).toEqual("Joel.1.1")
		p.include_apocrypha(false)
		expect(p.parse("JOEL 1:1").osis()).toEqual("Joel.1.1")
		expect(p.parse("ИОЕЛ 1:1").osis()).toEqual("Joel.1.1")
		expect(p.parse("ИОЕ 1:1").osis()).toEqual("Joel.1.1")
		`
		true
describe "Localized book Amos (mn)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: Amos (mn)", ->
		`
		expect(p.parse("Amos 1:1").osis()).toEqual("Amos.1.1")
		expect(p.parse("Амос 1:1").osis()).toEqual("Amos.1.1")
		expect(p.parse("Амо 1:1").osis()).toEqual("Amos.1.1")
		expect(p.parse("Ам 1:1").osis()).toEqual("Amos.1.1")
		p.include_apocrypha(false)
		expect(p.parse("AMOS 1:1").osis()).toEqual("Amos.1.1")
		expect(p.parse("АМОС 1:1").osis()).toEqual("Amos.1.1")
		expect(p.parse("АМО 1:1").osis()).toEqual("Amos.1.1")
		expect(p.parse("АМ 1:1").osis()).toEqual("Amos.1.1")
		`
		true
describe "Localized book Obad (mn)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: Obad (mn)", ->
		`
		expect(p.parse("Обадиа 1:1").osis()).toEqual("Obad.1.1")
		expect(p.parse("Obad 1:1").osis()).toEqual("Obad.1.1")
		expect(p.parse("Оба 1:1").osis()).toEqual("Obad.1.1")
		p.include_apocrypha(false)
		expect(p.parse("ОБАДИА 1:1").osis()).toEqual("Obad.1.1")
		expect(p.parse("OBAD 1:1").osis()).toEqual("Obad.1.1")
		expect(p.parse("ОБА 1:1").osis()).toEqual("Obad.1.1")
		`
		true
describe "Localized book Jonah (mn)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: Jonah (mn)", ->
		`
		expect(p.parse("Jonah 1:1").osis()).toEqual("Jonah.1.1")
		expect(p.parse("Иона 1:1").osis()).toEqual("Jonah.1.1")
		expect(p.parse("Ион 1:1").osis()).toEqual("Jonah.1.1")
		p.include_apocrypha(false)
		expect(p.parse("JONAH 1:1").osis()).toEqual("Jonah.1.1")
		expect(p.parse("ИОНА 1:1").osis()).toEqual("Jonah.1.1")
		expect(p.parse("ИОН 1:1").osis()).toEqual("Jonah.1.1")
		`
		true
describe "Localized book Mic (mn)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: Mic (mn)", ->
		`
		expect(p.parse("Мика 1:1").osis()).toEqual("Mic.1.1")
		expect(p.parse("Mic 1:1").osis()).toEqual("Mic.1.1")
		expect(p.parse("Мик 1:1").osis()).toEqual("Mic.1.1")
		p.include_apocrypha(false)
		expect(p.parse("МИКА 1:1").osis()).toEqual("Mic.1.1")
		expect(p.parse("MIC 1:1").osis()).toEqual("Mic.1.1")
		expect(p.parse("МИК 1:1").osis()).toEqual("Mic.1.1")
		`
		true
describe "Localized book Nah (mn)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: Nah (mn)", ->
		`
		expect(p.parse("Нахум 1:1").osis()).toEqual("Nah.1.1")
		expect(p.parse("Наху 1:1").osis()).toEqual("Nah.1.1")
		expect(p.parse("Nah 1:1").osis()).toEqual("Nah.1.1")
		expect(p.parse("Нах 1:1").osis()).toEqual("Nah.1.1")
		p.include_apocrypha(false)
		expect(p.parse("НАХУМ 1:1").osis()).toEqual("Nah.1.1")
		expect(p.parse("НАХУ 1:1").osis()).toEqual("Nah.1.1")
		expect(p.parse("NAH 1:1").osis()).toEqual("Nah.1.1")
		expect(p.parse("НАХ 1:1").osis()).toEqual("Nah.1.1")
		`
		true
describe "Localized book Hab (mn)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: Hab (mn)", ->
		`
		expect(p.parse("Хабаккук 1:1").osis()).toEqual("Hab.1.1")
		expect(p.parse("Hab 1:1").osis()).toEqual("Hab.1.1")
		expect(p.parse("Хаб 1:1").osis()).toEqual("Hab.1.1")
		p.include_apocrypha(false)
		expect(p.parse("ХАБАККУК 1:1").osis()).toEqual("Hab.1.1")
		expect(p.parse("HAB 1:1").osis()).toEqual("Hab.1.1")
		expect(p.parse("ХАБ 1:1").osis()).toEqual("Hab.1.1")
		`
		true
describe "Localized book Zeph (mn)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: Zeph (mn)", ->
		`
		expect(p.parse("Зефаниа 1:1").osis()).toEqual("Zeph.1.1")
		expect(p.parse("Zeph 1:1").osis()).toEqual("Zeph.1.1")
		expect(p.parse("Зеф 1:1").osis()).toEqual("Zeph.1.1")
		p.include_apocrypha(false)
		expect(p.parse("ЗЕФАНИА 1:1").osis()).toEqual("Zeph.1.1")
		expect(p.parse("ZEPH 1:1").osis()).toEqual("Zeph.1.1")
		expect(p.parse("ЗЕФ 1:1").osis()).toEqual("Zeph.1.1")
		`
		true
describe "Localized book Hag (mn)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: Hag (mn)", ->
		`
		expect(p.parse("Хаггаи 1:1").osis()).toEqual("Hag.1.1")
		expect(p.parse("Hag 1:1").osis()).toEqual("Hag.1.1")
		expect(p.parse("Хаг 1:1").osis()).toEqual("Hag.1.1")
		p.include_apocrypha(false)
		expect(p.parse("ХАГГАИ 1:1").osis()).toEqual("Hag.1.1")
		expect(p.parse("HAG 1:1").osis()).toEqual("Hag.1.1")
		expect(p.parse("ХАГ 1:1").osis()).toEqual("Hag.1.1")
		`
		true
describe "Localized book Zech (mn)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: Zech (mn)", ->
		`
		expect(p.parse("Зехариа 1:1").osis()).toEqual("Zech.1.1")
		expect(p.parse("Zech 1:1").osis()).toEqual("Zech.1.1")
		expect(p.parse("Зех 1:1").osis()).toEqual("Zech.1.1")
		p.include_apocrypha(false)
		expect(p.parse("ЗЕХАРИА 1:1").osis()).toEqual("Zech.1.1")
		expect(p.parse("ZECH 1:1").osis()).toEqual("Zech.1.1")
		expect(p.parse("ЗЕХ 1:1").osis()).toEqual("Zech.1.1")
		`
		true
describe "Localized book Mal (mn)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: Mal (mn)", ->
		`
		expect(p.parse("Малахи 1:1").osis()).toEqual("Mal.1.1")
		expect(p.parse("Mal 1:1").osis()).toEqual("Mal.1.1")
		expect(p.parse("Мал 1:1").osis()).toEqual("Mal.1.1")
		p.include_apocrypha(false)
		expect(p.parse("МАЛАХИ 1:1").osis()).toEqual("Mal.1.1")
		expect(p.parse("MAL 1:1").osis()).toEqual("Mal.1.1")
		expect(p.parse("МАЛ 1:1").osis()).toEqual("Mal.1.1")
		`
		true
describe "Localized book Matt (mn)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: Matt (mn)", ->
		`
		expect(p.parse("Матаи 1:1").osis()).toEqual("Matt.1.1")
		expect(p.parse("Матай 1:1").osis()).toEqual("Matt.1.1")
		expect(p.parse("Matt 1:1").osis()).toEqual("Matt.1.1")
		expect(p.parse("Мат 1:1").osis()).toEqual("Matt.1.1")
		expect(p.parse("Мт 1:1").osis()).toEqual("Matt.1.1")
		p.include_apocrypha(false)
		expect(p.parse("МАТАИ 1:1").osis()).toEqual("Matt.1.1")
		expect(p.parse("МАТАЙ 1:1").osis()).toEqual("Matt.1.1")
		expect(p.parse("MATT 1:1").osis()).toEqual("Matt.1.1")
		expect(p.parse("МАТ 1:1").osis()).toEqual("Matt.1.1")
		expect(p.parse("МТ 1:1").osis()).toEqual("Matt.1.1")
		`
		true
describe "Localized book Mark (mn)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: Mark (mn)", ->
		`
		expect(p.parse("Mark 1:1").osis()).toEqual("Mark.1.1")
		expect(p.parse("Марк 1:1").osis()).toEqual("Mark.1.1")
		expect(p.parse("Мар 1:1").osis()).toEqual("Mark.1.1")
		expect(p.parse("Мк 1:1").osis()).toEqual("Mark.1.1")
		p.include_apocrypha(false)
		expect(p.parse("MARK 1:1").osis()).toEqual("Mark.1.1")
		expect(p.parse("МАРК 1:1").osis()).toEqual("Mark.1.1")
		expect(p.parse("МАР 1:1").osis()).toEqual("Mark.1.1")
		expect(p.parse("МК 1:1").osis()).toEqual("Mark.1.1")
		`
		true
describe "Localized book Luke (mn)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: Luke (mn)", ->
		`
		expect(p.parse("Luke 1:1").osis()).toEqual("Luke.1.1")
		expect(p.parse("Лук 1:1").osis()).toEqual("Luke.1.1")
		expect(p.parse("Лк 1:1").osis()).toEqual("Luke.1.1")
		p.include_apocrypha(false)
		expect(p.parse("LUKE 1:1").osis()).toEqual("Luke.1.1")
		expect(p.parse("ЛУК 1:1").osis()).toEqual("Luke.1.1")
		expect(p.parse("ЛК 1:1").osis()).toEqual("Luke.1.1")
		`
		true
describe "Localized book 1John (mn)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: 1John (mn)", ->
		`
		expect(p.parse("1 Иохан 1:1").osis()).toEqual("1John.1.1")
		expect(p.parse("1 Иох 1:1").osis()).toEqual("1John.1.1")
		expect(p.parse("1John 1:1").osis()).toEqual("1John.1.1")
		expect(p.parse("1 Ио 1:1").osis()).toEqual("1John.1.1")
		p.include_apocrypha(false)
		expect(p.parse("1 ИОХАН 1:1").osis()).toEqual("1John.1.1")
		expect(p.parse("1 ИОХ 1:1").osis()).toEqual("1John.1.1")
		expect(p.parse("1JOHN 1:1").osis()).toEqual("1John.1.1")
		expect(p.parse("1 ИО 1:1").osis()).toEqual("1John.1.1")
		`
		true
describe "Localized book 2John (mn)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: 2John (mn)", ->
		`
		expect(p.parse("2 Иохан 1:1").osis()).toEqual("2John.1.1")
		expect(p.parse("2 Иох 1:1").osis()).toEqual("2John.1.1")
		expect(p.parse("2John 1:1").osis()).toEqual("2John.1.1")
		expect(p.parse("2 Ио 1:1").osis()).toEqual("2John.1.1")
		p.include_apocrypha(false)
		expect(p.parse("2 ИОХАН 1:1").osis()).toEqual("2John.1.1")
		expect(p.parse("2 ИОХ 1:1").osis()).toEqual("2John.1.1")
		expect(p.parse("2JOHN 1:1").osis()).toEqual("2John.1.1")
		expect(p.parse("2 ИО 1:1").osis()).toEqual("2John.1.1")
		`
		true
describe "Localized book 3John (mn)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: 3John (mn)", ->
		`
		expect(p.parse("3 Иохан 1:1").osis()).toEqual("3John.1.1")
		expect(p.parse("3 Иох 1:1").osis()).toEqual("3John.1.1")
		expect(p.parse("3John 1:1").osis()).toEqual("3John.1.1")
		expect(p.parse("3 Ио 1:1").osis()).toEqual("3John.1.1")
		p.include_apocrypha(false)
		expect(p.parse("3 ИОХАН 1:1").osis()).toEqual("3John.1.1")
		expect(p.parse("3 ИОХ 1:1").osis()).toEqual("3John.1.1")
		expect(p.parse("3JOHN 1:1").osis()).toEqual("3John.1.1")
		expect(p.parse("3 ИО 1:1").osis()).toEqual("3John.1.1")
		`
		true
describe "Localized book John (mn)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: John (mn)", ->
		`
		expect(p.parse("Иохан 1:1").osis()).toEqual("John.1.1")
		expect(p.parse("John 1:1").osis()).toEqual("John.1.1")
		expect(p.parse("Иох 1:1").osis()).toEqual("John.1.1")
		p.include_apocrypha(false)
		expect(p.parse("ИОХАН 1:1").osis()).toEqual("John.1.1")
		expect(p.parse("JOHN 1:1").osis()).toEqual("John.1.1")
		expect(p.parse("ИОХ 1:1").osis()).toEqual("John.1.1")
		`
		true
describe "Localized book Acts (mn)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: Acts (mn)", ->
		`
		expect(p.parse("Acts 1:1").osis()).toEqual("Acts.1.1")
		expect(p.parse("Үилс 1:1").osis()).toEqual("Acts.1.1")
		expect(p.parse("Үйлс 1:1").osis()).toEqual("Acts.1.1")
		expect(p.parse("Үил 1:1").osis()).toEqual("Acts.1.1")
		expect(p.parse("Үйл 1:1").osis()).toEqual("Acts.1.1")
		p.include_apocrypha(false)
		expect(p.parse("ACTS 1:1").osis()).toEqual("Acts.1.1")
		expect(p.parse("ҮИЛС 1:1").osis()).toEqual("Acts.1.1")
		expect(p.parse("ҮЙЛС 1:1").osis()).toEqual("Acts.1.1")
		expect(p.parse("ҮИЛ 1:1").osis()).toEqual("Acts.1.1")
		expect(p.parse("ҮЙЛ 1:1").osis()).toEqual("Acts.1.1")
		`
		true
describe "Localized book Rom (mn)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: Rom (mn)", ->
		`
		expect(p.parse("Rom 1:1").osis()).toEqual("Rom.1.1")
		expect(p.parse("Ром 1:1").osis()).toEqual("Rom.1.1")
		p.include_apocrypha(false)
		expect(p.parse("ROM 1:1").osis()).toEqual("Rom.1.1")
		expect(p.parse("РОМ 1:1").osis()).toEqual("Rom.1.1")
		`
		true
describe "Localized book 2Cor (mn)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: 2Cor (mn)", ->
		`
		expect(p.parse("2 Коринт 1:1").osis()).toEqual("2Cor.1.1")
		expect(p.parse("2 Кор 1:1").osis()).toEqual("2Cor.1.1")
		expect(p.parse("2 Ко 1:1").osis()).toEqual("2Cor.1.1")
		expect(p.parse("2Cor 1:1").osis()).toEqual("2Cor.1.1")
		p.include_apocrypha(false)
		expect(p.parse("2 КОРИНТ 1:1").osis()).toEqual("2Cor.1.1")
		expect(p.parse("2 КОР 1:1").osis()).toEqual("2Cor.1.1")
		expect(p.parse("2 КО 1:1").osis()).toEqual("2Cor.1.1")
		expect(p.parse("2COR 1:1").osis()).toEqual("2Cor.1.1")
		`
		true
describe "Localized book 1Cor (mn)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: 1Cor (mn)", ->
		`
		expect(p.parse("1 Коринт 1:1").osis()).toEqual("1Cor.1.1")
		expect(p.parse("1 Кор 1:1").osis()).toEqual("1Cor.1.1")
		expect(p.parse("1 Ко 1:1").osis()).toEqual("1Cor.1.1")
		expect(p.parse("1Cor 1:1").osis()).toEqual("1Cor.1.1")
		p.include_apocrypha(false)
		expect(p.parse("1 КОРИНТ 1:1").osis()).toEqual("1Cor.1.1")
		expect(p.parse("1 КОР 1:1").osis()).toEqual("1Cor.1.1")
		expect(p.parse("1 КО 1:1").osis()).toEqual("1Cor.1.1")
		expect(p.parse("1COR 1:1").osis()).toEqual("1Cor.1.1")
		`
		true
describe "Localized book Gal (mn)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: Gal (mn)", ->
		`
		expect(p.parse("Галат 1:1").osis()).toEqual("Gal.1.1")
		expect(p.parse("Gal 1:1").osis()).toEqual("Gal.1.1")
		expect(p.parse("Гал 1:1").osis()).toEqual("Gal.1.1")
		p.include_apocrypha(false)
		expect(p.parse("ГАЛАТ 1:1").osis()).toEqual("Gal.1.1")
		expect(p.parse("GAL 1:1").osis()).toEqual("Gal.1.1")
		expect(p.parse("ГАЛ 1:1").osis()).toEqual("Gal.1.1")
		`
		true
describe "Localized book Eph (mn)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: Eph (mn)", ->
		`
		expect(p.parse("Ефес 1:1").osis()).toEqual("Eph.1.1")
		expect(p.parse("Eph 1:1").osis()).toEqual("Eph.1.1")
		expect(p.parse("Еф 1:1").osis()).toEqual("Eph.1.1")
		p.include_apocrypha(false)
		expect(p.parse("ЕФЕС 1:1").osis()).toEqual("Eph.1.1")
		expect(p.parse("EPH 1:1").osis()).toEqual("Eph.1.1")
		expect(p.parse("ЕФ 1:1").osis()).toEqual("Eph.1.1")
		`
		true
describe "Localized book Phil (mn)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: Phil (mn)", ->
		`
		expect(p.parse("Филиппои 1:1").osis()).toEqual("Phil.1.1")
		expect(p.parse("Филиппой 1:1").osis()).toEqual("Phil.1.1")
		expect(p.parse("Phil 1:1").osis()).toEqual("Phil.1.1")
		expect(p.parse("Фил 1:1").osis()).toEqual("Phil.1.1")
		expect(p.parse("Флп 1:1").osis()).toEqual("Phil.1.1")
		p.include_apocrypha(false)
		expect(p.parse("ФИЛИППОИ 1:1").osis()).toEqual("Phil.1.1")
		expect(p.parse("ФИЛИППОЙ 1:1").osis()).toEqual("Phil.1.1")
		expect(p.parse("PHIL 1:1").osis()).toEqual("Phil.1.1")
		expect(p.parse("ФИЛ 1:1").osis()).toEqual("Phil.1.1")
		expect(p.parse("ФЛП 1:1").osis()).toEqual("Phil.1.1")
		`
		true
describe "Localized book Col (mn)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: Col (mn)", ->
		`
		expect(p.parse("Колоссаи 1:1").osis()).toEqual("Col.1.1")
		expect(p.parse("Колоссай 1:1").osis()).toEqual("Col.1.1")
		expect(p.parse("Col 1:1").osis()).toEqual("Col.1.1")
		expect(p.parse("Кол 1:1").osis()).toEqual("Col.1.1")
		p.include_apocrypha(false)
		expect(p.parse("КОЛОССАИ 1:1").osis()).toEqual("Col.1.1")
		expect(p.parse("КОЛОССАЙ 1:1").osis()).toEqual("Col.1.1")
		expect(p.parse("COL 1:1").osis()).toEqual("Col.1.1")
		expect(p.parse("КОЛ 1:1").osis()).toEqual("Col.1.1")
		`
		true
describe "Localized book 2Thess (mn)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: 2Thess (mn)", ->
		`
		expect(p.parse("2 Тесалоник 1:1").osis()).toEqual("2Thess.1.1")
		expect(p.parse("2Thess 1:1").osis()).toEqual("2Thess.1.1")
		expect(p.parse("2 Тес 1:1").osis()).toEqual("2Thess.1.1")
		expect(p.parse("2 Тс 1:1").osis()).toEqual("2Thess.1.1")
		p.include_apocrypha(false)
		expect(p.parse("2 ТЕСАЛОНИК 1:1").osis()).toEqual("2Thess.1.1")
		expect(p.parse("2THESS 1:1").osis()).toEqual("2Thess.1.1")
		expect(p.parse("2 ТЕС 1:1").osis()).toEqual("2Thess.1.1")
		expect(p.parse("2 ТС 1:1").osis()).toEqual("2Thess.1.1")
		`
		true
describe "Localized book 1Thess (mn)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: 1Thess (mn)", ->
		`
		expect(p.parse("1 Тесалоник 1:1").osis()).toEqual("1Thess.1.1")
		expect(p.parse("1Thess 1:1").osis()).toEqual("1Thess.1.1")
		expect(p.parse("1 Тес 1:1").osis()).toEqual("1Thess.1.1")
		expect(p.parse("1 Тс 1:1").osis()).toEqual("1Thess.1.1")
		p.include_apocrypha(false)
		expect(p.parse("1 ТЕСАЛОНИК 1:1").osis()).toEqual("1Thess.1.1")
		expect(p.parse("1THESS 1:1").osis()).toEqual("1Thess.1.1")
		expect(p.parse("1 ТЕС 1:1").osis()).toEqual("1Thess.1.1")
		expect(p.parse("1 ТС 1:1").osis()).toEqual("1Thess.1.1")
		`
		true
describe "Localized book 2Tim (mn)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: 2Tim (mn)", ->
		`
		expect(p.parse("2 Тимот 1:1").osis()).toEqual("2Tim.1.1")
		expect(p.parse("2 Тим 1:1").osis()).toEqual("2Tim.1.1")
		expect(p.parse("2 Ти 1:1").osis()).toEqual("2Tim.1.1")
		expect(p.parse("2 Тм 1:1").osis()).toEqual("2Tim.1.1")
		expect(p.parse("2Tim 1:1").osis()).toEqual("2Tim.1.1")
		p.include_apocrypha(false)
		expect(p.parse("2 ТИМОТ 1:1").osis()).toEqual("2Tim.1.1")
		expect(p.parse("2 ТИМ 1:1").osis()).toEqual("2Tim.1.1")
		expect(p.parse("2 ТИ 1:1").osis()).toEqual("2Tim.1.1")
		expect(p.parse("2 ТМ 1:1").osis()).toEqual("2Tim.1.1")
		expect(p.parse("2TIM 1:1").osis()).toEqual("2Tim.1.1")
		`
		true
describe "Localized book 1Tim (mn)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: 1Tim (mn)", ->
		`
		expect(p.parse("1 Тимот 1:1").osis()).toEqual("1Tim.1.1")
		expect(p.parse("1 Тим 1:1").osis()).toEqual("1Tim.1.1")
		expect(p.parse("1 Ти 1:1").osis()).toEqual("1Tim.1.1")
		expect(p.parse("1 Тм 1:1").osis()).toEqual("1Tim.1.1")
		expect(p.parse("1Tim 1:1").osis()).toEqual("1Tim.1.1")
		p.include_apocrypha(false)
		expect(p.parse("1 ТИМОТ 1:1").osis()).toEqual("1Tim.1.1")
		expect(p.parse("1 ТИМ 1:1").osis()).toEqual("1Tim.1.1")
		expect(p.parse("1 ТИ 1:1").osis()).toEqual("1Tim.1.1")
		expect(p.parse("1 ТМ 1:1").osis()).toEqual("1Tim.1.1")
		expect(p.parse("1TIM 1:1").osis()).toEqual("1Tim.1.1")
		`
		true
describe "Localized book Titus (mn)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: Titus (mn)", ->
		`
		expect(p.parse("Titus 1:1").osis()).toEqual("Titus.1.1")
		expect(p.parse("Тит 1:1").osis()).toEqual("Titus.1.1")
		p.include_apocrypha(false)
		expect(p.parse("TITUS 1:1").osis()).toEqual("Titus.1.1")
		expect(p.parse("ТИТ 1:1").osis()).toEqual("Titus.1.1")
		`
		true
describe "Localized book Phlm (mn)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: Phlm (mn)", ->
		`
		expect(p.parse("Филемон 1:1").osis()).toEqual("Phlm.1.1")
		expect(p.parse("Phlm 1:1").osis()).toEqual("Phlm.1.1")
		expect(p.parse("Филе 1:1").osis()).toEqual("Phlm.1.1")
		expect(p.parse("Фил 1:1").osis()).toEqual("Phlm.1.1")
		expect(p.parse("Флм 1:1").osis()).toEqual("Phlm.1.1")
		p.include_apocrypha(false)
		expect(p.parse("ФИЛЕМОН 1:1").osis()).toEqual("Phlm.1.1")
		expect(p.parse("PHLM 1:1").osis()).toEqual("Phlm.1.1")
		expect(p.parse("ФИЛЕ 1:1").osis()).toEqual("Phlm.1.1")
		expect(p.parse("ФИЛ 1:1").osis()).toEqual("Phlm.1.1")
		expect(p.parse("ФЛМ 1:1").osis()).toEqual("Phlm.1.1")
		`
		true
describe "Localized book Heb (mn)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: Heb (mn)", ->
		`
		expect(p.parse("Евреи 1:1").osis()).toEqual("Heb.1.1")
		expect(p.parse("Еврей 1:1").osis()).toEqual("Heb.1.1")
		expect(p.parse("Heb 1:1").osis()).toEqual("Heb.1.1")
		expect(p.parse("Евр 1:1").osis()).toEqual("Heb.1.1")
		p.include_apocrypha(false)
		expect(p.parse("ЕВРЕИ 1:1").osis()).toEqual("Heb.1.1")
		expect(p.parse("ЕВРЕЙ 1:1").osis()).toEqual("Heb.1.1")
		expect(p.parse("HEB 1:1").osis()).toEqual("Heb.1.1")
		expect(p.parse("ЕВР 1:1").osis()).toEqual("Heb.1.1")
		`
		true
describe "Localized book Jas (mn)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: Jas (mn)", ->
		`
		expect(p.parse("Иаков 1:1").osis()).toEqual("Jas.1.1")
		expect(p.parse("Jas 1:1").osis()).toEqual("Jas.1.1")
		expect(p.parse("Иак 1:1").osis()).toEqual("Jas.1.1")
		expect(p.parse("Ик 1:1").osis()).toEqual("Jas.1.1")
		p.include_apocrypha(false)
		expect(p.parse("ИАКОВ 1:1").osis()).toEqual("Jas.1.1")
		expect(p.parse("JAS 1:1").osis()).toEqual("Jas.1.1")
		expect(p.parse("ИАК 1:1").osis()).toEqual("Jas.1.1")
		expect(p.parse("ИК 1:1").osis()).toEqual("Jas.1.1")
		`
		true
describe "Localized book 2Pet (mn)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: 2Pet (mn)", ->
		`
		expect(p.parse("2 Петр 1:1").osis()).toEqual("2Pet.1.1")
		expect(p.parse("2 Пет 1:1").osis()).toEqual("2Pet.1.1")
		expect(p.parse("2 Пе 1:1").osis()).toEqual("2Pet.1.1")
		expect(p.parse("2 Пр 1:1").osis()).toEqual("2Pet.1.1")
		expect(p.parse("2 Пт 1:1").osis()).toEqual("2Pet.1.1")
		expect(p.parse("2Pet 1:1").osis()).toEqual("2Pet.1.1")
		p.include_apocrypha(false)
		expect(p.parse("2 ПЕТР 1:1").osis()).toEqual("2Pet.1.1")
		expect(p.parse("2 ПЕТ 1:1").osis()).toEqual("2Pet.1.1")
		expect(p.parse("2 ПЕ 1:1").osis()).toEqual("2Pet.1.1")
		expect(p.parse("2 ПР 1:1").osis()).toEqual("2Pet.1.1")
		expect(p.parse("2 ПТ 1:1").osis()).toEqual("2Pet.1.1")
		expect(p.parse("2PET 1:1").osis()).toEqual("2Pet.1.1")
		`
		true
describe "Localized book 1Pet (mn)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: 1Pet (mn)", ->
		`
		expect(p.parse("1 Петр 1:1").osis()).toEqual("1Pet.1.1")
		expect(p.parse("1 Пет 1:1").osis()).toEqual("1Pet.1.1")
		expect(p.parse("1 Пе 1:1").osis()).toEqual("1Pet.1.1")
		expect(p.parse("1 Пр 1:1").osis()).toEqual("1Pet.1.1")
		expect(p.parse("1 Пт 1:1").osis()).toEqual("1Pet.1.1")
		expect(p.parse("1Pet 1:1").osis()).toEqual("1Pet.1.1")
		p.include_apocrypha(false)
		expect(p.parse("1 ПЕТР 1:1").osis()).toEqual("1Pet.1.1")
		expect(p.parse("1 ПЕТ 1:1").osis()).toEqual("1Pet.1.1")
		expect(p.parse("1 ПЕ 1:1").osis()).toEqual("1Pet.1.1")
		expect(p.parse("1 ПР 1:1").osis()).toEqual("1Pet.1.1")
		expect(p.parse("1 ПТ 1:1").osis()).toEqual("1Pet.1.1")
		expect(p.parse("1PET 1:1").osis()).toEqual("1Pet.1.1")
		`
		true
describe "Localized book Jude (mn)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: Jude (mn)", ->
		`
		expect(p.parse("Jude 1:1").osis()).toEqual("Jude.1.1")
		expect(p.parse("Иуда 1:1").osis()).toEqual("Jude.1.1")
		expect(p.parse("Иуд 1:1").osis()).toEqual("Jude.1.1")
		p.include_apocrypha(false)
		expect(p.parse("JUDE 1:1").osis()).toEqual("Jude.1.1")
		expect(p.parse("ИУДА 1:1").osis()).toEqual("Jude.1.1")
		expect(p.parse("ИУД 1:1").osis()).toEqual("Jude.1.1")
		`
		true
describe "Localized book Tob (mn)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: Tob (mn)", ->
		`
		expect(p.parse("Tob 1:1").osis()).toEqual("Tob.1.1")
		`
		true
describe "Localized book Jdt (mn)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: Jdt (mn)", ->
		`
		expect(p.parse("Jdt 1:1").osis()).toEqual("Jdt.1.1")
		`
		true
describe "Localized book Bar (mn)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: Bar (mn)", ->
		`
		expect(p.parse("Bar 1:1").osis()).toEqual("Bar.1.1")
		`
		true
describe "Localized book Sus (mn)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: Sus (mn)", ->
		`
		expect(p.parse("Sus 1:1").osis()).toEqual("Sus.1.1")
		`
		true
describe "Localized book 2Macc (mn)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: 2Macc (mn)", ->
		`
		expect(p.parse("2Macc 1:1").osis()).toEqual("2Macc.1.1")
		`
		true
describe "Localized book 3Macc (mn)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: 3Macc (mn)", ->
		`
		expect(p.parse("3Macc 1:1").osis()).toEqual("3Macc.1.1")
		`
		true
describe "Localized book 4Macc (mn)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: 4Macc (mn)", ->
		`
		expect(p.parse("4Macc 1:1").osis()).toEqual("4Macc.1.1")
		`
		true
describe "Localized book 1Macc (mn)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: 1Macc (mn)", ->
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
		expect(p.languages).toEqual ["mn"]

	it "should handle ranges (mn)", ->
		expect(p.parse("Titus 1:1 do 2").osis()).toEqual "Titus.1.1-Titus.1.2"
		expect(p.parse("Matt 1do2").osis()).toEqual "Matt.1-Matt.2"
		expect(p.parse("Phlm 2 DO 3").osis()).toEqual "Phlm.1.2-Phlm.1.3"
	it "should handle chapters (mn)", ->
		expect(p.parse("Titus 1:1, бүлэг 2").osis()).toEqual "Titus.1.1,Titus.2"
		expect(p.parse("Matt 3:4 БҮЛЭГ 6").osis()).toEqual "Matt.3.4,Matt.6"
	it "should handle verses (mn)", ->
		expect(p.parse("Exod 1:1 шүлэг 3").osis()).toEqual "Exod.1.1,Exod.1.3"
		expect(p.parse("Phlm ШҮЛЭГ 6").osis()).toEqual "Phlm.1.6"
	it "should handle 'and' (mn)", ->
		expect(p.parse("Exod 1:1 болон 3").osis()).toEqual "Exod.1.1,Exod.1.3"
		expect(p.parse("Phlm 2 БОЛОН 6").osis()).toEqual "Phlm.1.2,Phlm.1.6"
	it "should handle titles (mn)", ->
		expect(p.parse("Ps 3 Гарчиг, 4:2, 5:Гарчиг").osis()).toEqual "Ps.3.1,Ps.4.2,Ps.5.1"
		expect(p.parse("PS 3 ГАРЧИГ, 4:2, 5:ГАРЧИГ").osis()).toEqual "Ps.3.1,Ps.4.2,Ps.5.1"
	it "should handle 'ff' (mn)", ->
		expect(p.parse("Rev 3ff, 4:2ff").osis()).toEqual "Rev.3-Rev.22,Rev.4.2-Rev.4.11"
		expect(p.parse("REV 3 FF, 4:2 FF").osis()).toEqual "Rev.3-Rev.22,Rev.4.2-Rev.4.11"
	it "should handle translations (mn)", ->
		expect(p.parse("Lev 1 (AB2013)").osis_and_translations()).toEqual [["Lev.1", "AB2013"]]
		expect(p.parse("lev 1 ab2013").osis_and_translations()).toEqual [["Lev.1", "AB2013"]]
	it "should handle boundaries (mn)", ->
		p.set_options {book_alone_strategy: "full"}
		expect(p.parse("\u2014Matt\u2014").osis()).toEqual "Matt.1-Matt.28"
		expect(p.parse("\u201cMatt 1:1\u201d").osis()).toEqual "Matt.1.1"
