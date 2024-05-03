bcv_parser = require("../../js/lt_bcv_parser.js").bcv_parser

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

describe "Localized book Gen (lt)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: Gen (lt)", ->
		`
		expect(p.parse("Pradzios knyga 1:1").osis()).toEqual("Gen.1.1")
		expect(p.parse("Pradžios knyga 1:1").osis()).toEqual("Gen.1.1")
		expect(p.parse("Pradzios 1:1").osis()).toEqual("Gen.1.1")
		expect(p.parse("Pradžios 1:1").osis()).toEqual("Gen.1.1")
		expect(p.parse("Gen 1:1").osis()).toEqual("Gen.1.1")
		expect(p.parse("Pr 1:1").osis()).toEqual("Gen.1.1")
		p.include_apocrypha(false)
		expect(p.parse("PRADZIOS KNYGA 1:1").osis()).toEqual("Gen.1.1")
		expect(p.parse("PRADŽIOS KNYGA 1:1").osis()).toEqual("Gen.1.1")
		expect(p.parse("PRADZIOS 1:1").osis()).toEqual("Gen.1.1")
		expect(p.parse("PRADŽIOS 1:1").osis()).toEqual("Gen.1.1")
		expect(p.parse("GEN 1:1").osis()).toEqual("Gen.1.1")
		expect(p.parse("PR 1:1").osis()).toEqual("Gen.1.1")
		`
		true
describe "Localized book Exod (lt)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: Exod (lt)", ->
		`
		expect(p.parse("Isejimo knyga 1:1").osis()).toEqual("Exod.1.1")
		expect(p.parse("Isėjimo knyga 1:1").osis()).toEqual("Exod.1.1")
		expect(p.parse("Išejimo knyga 1:1").osis()).toEqual("Exod.1.1")
		expect(p.parse("Išėjimo knyga 1:1").osis()).toEqual("Exod.1.1")
		expect(p.parse("Isejimo 1:1").osis()).toEqual("Exod.1.1")
		expect(p.parse("Isėjimo 1:1").osis()).toEqual("Exod.1.1")
		expect(p.parse("Išejimo 1:1").osis()).toEqual("Exod.1.1")
		expect(p.parse("Išėjimo 1:1").osis()).toEqual("Exod.1.1")
		expect(p.parse("Exod 1:1").osis()).toEqual("Exod.1.1")
		expect(p.parse("Is 1:1").osis()).toEqual("Exod.1.1")
		expect(p.parse("Iš 1:1").osis()).toEqual("Exod.1.1")
		p.include_apocrypha(false)
		expect(p.parse("ISEJIMO KNYGA 1:1").osis()).toEqual("Exod.1.1")
		expect(p.parse("ISĖJIMO KNYGA 1:1").osis()).toEqual("Exod.1.1")
		expect(p.parse("IŠEJIMO KNYGA 1:1").osis()).toEqual("Exod.1.1")
		expect(p.parse("IŠĖJIMO KNYGA 1:1").osis()).toEqual("Exod.1.1")
		expect(p.parse("ISEJIMO 1:1").osis()).toEqual("Exod.1.1")
		expect(p.parse("ISĖJIMO 1:1").osis()).toEqual("Exod.1.1")
		expect(p.parse("IŠEJIMO 1:1").osis()).toEqual("Exod.1.1")
		expect(p.parse("IŠĖJIMO 1:1").osis()).toEqual("Exod.1.1")
		expect(p.parse("EXOD 1:1").osis()).toEqual("Exod.1.1")
		expect(p.parse("IS 1:1").osis()).toEqual("Exod.1.1")
		expect(p.parse("IŠ 1:1").osis()).toEqual("Exod.1.1")
		`
		true
describe "Localized book Bel (lt)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: Bel (lt)", ->
		`
		expect(p.parse("Bel 1:1").osis()).toEqual("Bel.1.1")
		`
		true
describe "Localized book Lev (lt)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: Lev (lt)", ->
		`
		expect(p.parse("Kunigu knyga 1:1").osis()).toEqual("Lev.1.1")
		expect(p.parse("Kunigų knyga 1:1").osis()).toEqual("Lev.1.1")
		expect(p.parse("Kunigu 1:1").osis()).toEqual("Lev.1.1")
		expect(p.parse("Kunigų 1:1").osis()).toEqual("Lev.1.1")
		expect(p.parse("Kun 1:1").osis()).toEqual("Lev.1.1")
		expect(p.parse("Lev 1:1").osis()).toEqual("Lev.1.1")
		p.include_apocrypha(false)
		expect(p.parse("KUNIGU KNYGA 1:1").osis()).toEqual("Lev.1.1")
		expect(p.parse("KUNIGŲ KNYGA 1:1").osis()).toEqual("Lev.1.1")
		expect(p.parse("KUNIGU 1:1").osis()).toEqual("Lev.1.1")
		expect(p.parse("KUNIGŲ 1:1").osis()).toEqual("Lev.1.1")
		expect(p.parse("KUN 1:1").osis()).toEqual("Lev.1.1")
		expect(p.parse("LEV 1:1").osis()).toEqual("Lev.1.1")
		`
		true
describe "Localized book Num (lt)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: Num (lt)", ->
		`
		expect(p.parse("Skaiciu knyga 1:1").osis()).toEqual("Num.1.1")
		expect(p.parse("Skaicių knyga 1:1").osis()).toEqual("Num.1.1")
		expect(p.parse("Skaičiu knyga 1:1").osis()).toEqual("Num.1.1")
		expect(p.parse("Skaičių knyga 1:1").osis()).toEqual("Num.1.1")
		expect(p.parse("Skaiciu 1:1").osis()).toEqual("Num.1.1")
		expect(p.parse("Skaicių 1:1").osis()).toEqual("Num.1.1")
		expect(p.parse("Skaičiu 1:1").osis()).toEqual("Num.1.1")
		expect(p.parse("Skaičių 1:1").osis()).toEqual("Num.1.1")
		expect(p.parse("Num 1:1").osis()).toEqual("Num.1.1")
		expect(p.parse("Sk 1:1").osis()).toEqual("Num.1.1")
		p.include_apocrypha(false)
		expect(p.parse("SKAICIU KNYGA 1:1").osis()).toEqual("Num.1.1")
		expect(p.parse("SKAICIŲ KNYGA 1:1").osis()).toEqual("Num.1.1")
		expect(p.parse("SKAIČIU KNYGA 1:1").osis()).toEqual("Num.1.1")
		expect(p.parse("SKAIČIŲ KNYGA 1:1").osis()).toEqual("Num.1.1")
		expect(p.parse("SKAICIU 1:1").osis()).toEqual("Num.1.1")
		expect(p.parse("SKAICIŲ 1:1").osis()).toEqual("Num.1.1")
		expect(p.parse("SKAIČIU 1:1").osis()).toEqual("Num.1.1")
		expect(p.parse("SKAIČIŲ 1:1").osis()).toEqual("Num.1.1")
		expect(p.parse("NUM 1:1").osis()).toEqual("Num.1.1")
		expect(p.parse("SK 1:1").osis()).toEqual("Num.1.1")
		`
		true
describe "Localized book Sir (lt)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: Sir (lt)", ->
		`
		expect(p.parse("Sir 1:1").osis()).toEqual("Sir.1.1")
		`
		true
describe "Localized book Wis (lt)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: Wis (lt)", ->
		`
		expect(p.parse("Wis 1:1").osis()).toEqual("Wis.1.1")
		`
		true
describe "Localized book Lam (lt)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: Lam (lt)", ->
		`
		expect(p.parse("Raudu knyga 1:1").osis()).toEqual("Lam.1.1")
		expect(p.parse("Raudų knyga 1:1").osis()).toEqual("Lam.1.1")
		expect(p.parse("Raudu 1:1").osis()).toEqual("Lam.1.1")
		expect(p.parse("Raudų 1:1").osis()).toEqual("Lam.1.1")
		expect(p.parse("Lam 1:1").osis()).toEqual("Lam.1.1")
		expect(p.parse("Rd 1:1").osis()).toEqual("Lam.1.1")
		p.include_apocrypha(false)
		expect(p.parse("RAUDU KNYGA 1:1").osis()).toEqual("Lam.1.1")
		expect(p.parse("RAUDŲ KNYGA 1:1").osis()).toEqual("Lam.1.1")
		expect(p.parse("RAUDU 1:1").osis()).toEqual("Lam.1.1")
		expect(p.parse("RAUDŲ 1:1").osis()).toEqual("Lam.1.1")
		expect(p.parse("LAM 1:1").osis()).toEqual("Lam.1.1")
		expect(p.parse("RD 1:1").osis()).toEqual("Lam.1.1")
		`
		true
describe "Localized book EpJer (lt)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: EpJer (lt)", ->
		`
		expect(p.parse("EpJer 1:1").osis()).toEqual("EpJer.1.1")
		`
		true
describe "Localized book Rev (lt)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: Rev (lt)", ->
		`
		expect(p.parse("Apreiskimas Jonui 1:1").osis()).toEqual("Rev.1.1")
		expect(p.parse("Apreiškimas Jonui 1:1").osis()).toEqual("Rev.1.1")
		expect(p.parse("Apreiskimo Jonui 1:1").osis()).toEqual("Rev.1.1")
		expect(p.parse("Apreiškimo Jonui 1:1").osis()).toEqual("Rev.1.1")
		expect(p.parse("Apr 1:1").osis()).toEqual("Rev.1.1")
		expect(p.parse("Rev 1:1").osis()).toEqual("Rev.1.1")
		p.include_apocrypha(false)
		expect(p.parse("APREISKIMAS JONUI 1:1").osis()).toEqual("Rev.1.1")
		expect(p.parse("APREIŠKIMAS JONUI 1:1").osis()).toEqual("Rev.1.1")
		expect(p.parse("APREISKIMO JONUI 1:1").osis()).toEqual("Rev.1.1")
		expect(p.parse("APREIŠKIMO JONUI 1:1").osis()).toEqual("Rev.1.1")
		expect(p.parse("APR 1:1").osis()).toEqual("Rev.1.1")
		expect(p.parse("REV 1:1").osis()).toEqual("Rev.1.1")
		`
		true
describe "Localized book PrMan (lt)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: PrMan (lt)", ->
		`
		expect(p.parse("PrMan 1:1").osis()).toEqual("PrMan.1.1")
		`
		true
describe "Localized book Deut (lt)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: Deut (lt)", ->
		`
		expect(p.parse("Pakartoto Istatymo knyga 1:1").osis()).toEqual("Deut.1.1")
		expect(p.parse("Pakartoto Įstatymo knyga 1:1").osis()).toEqual("Deut.1.1")
		expect(p.parse("Pakartoto Istatymo 1:1").osis()).toEqual("Deut.1.1")
		expect(p.parse("Pakartoto Įstatymo 1:1").osis()).toEqual("Deut.1.1")
		expect(p.parse("Deut 1:1").osis()).toEqual("Deut.1.1")
		expect(p.parse("Ist 1:1").osis()).toEqual("Deut.1.1")
		expect(p.parse("Įst 1:1").osis()).toEqual("Deut.1.1")
		p.include_apocrypha(false)
		expect(p.parse("PAKARTOTO ISTATYMO KNYGA 1:1").osis()).toEqual("Deut.1.1")
		expect(p.parse("PAKARTOTO ĮSTATYMO KNYGA 1:1").osis()).toEqual("Deut.1.1")
		expect(p.parse("PAKARTOTO ISTATYMO 1:1").osis()).toEqual("Deut.1.1")
		expect(p.parse("PAKARTOTO ĮSTATYMO 1:1").osis()).toEqual("Deut.1.1")
		expect(p.parse("DEUT 1:1").osis()).toEqual("Deut.1.1")
		expect(p.parse("IST 1:1").osis()).toEqual("Deut.1.1")
		expect(p.parse("ĮST 1:1").osis()).toEqual("Deut.1.1")
		`
		true
describe "Localized book Josh (lt)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: Josh (lt)", ->
		`
		expect(p.parse("Jozues knyga 1:1").osis()).toEqual("Josh.1.1")
		expect(p.parse("Jozuės knyga 1:1").osis()).toEqual("Josh.1.1")
		expect(p.parse("Jozues 1:1").osis()).toEqual("Josh.1.1")
		expect(p.parse("Jozuės 1:1").osis()).toEqual("Josh.1.1")
		expect(p.parse("Josh 1:1").osis()).toEqual("Josh.1.1")
		expect(p.parse("Joz 1:1").osis()).toEqual("Josh.1.1")
		p.include_apocrypha(false)
		expect(p.parse("JOZUES KNYGA 1:1").osis()).toEqual("Josh.1.1")
		expect(p.parse("JOZUĖS KNYGA 1:1").osis()).toEqual("Josh.1.1")
		expect(p.parse("JOZUES 1:1").osis()).toEqual("Josh.1.1")
		expect(p.parse("JOZUĖS 1:1").osis()).toEqual("Josh.1.1")
		expect(p.parse("JOSH 1:1").osis()).toEqual("Josh.1.1")
		expect(p.parse("JOZ 1:1").osis()).toEqual("Josh.1.1")
		`
		true
describe "Localized book Judg (lt)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: Judg (lt)", ->
		`
		expect(p.parse("Teiseju knyga 1:1").osis()).toEqual("Judg.1.1")
		expect(p.parse("Teisejų knyga 1:1").osis()).toEqual("Judg.1.1")
		expect(p.parse("Teisėju knyga 1:1").osis()).toEqual("Judg.1.1")
		expect(p.parse("Teisėjų knyga 1:1").osis()).toEqual("Judg.1.1")
		expect(p.parse("Teiseju 1:1").osis()).toEqual("Judg.1.1")
		expect(p.parse("Teisejų 1:1").osis()).toEqual("Judg.1.1")
		expect(p.parse("Teisėju 1:1").osis()).toEqual("Judg.1.1")
		expect(p.parse("Teisėjų 1:1").osis()).toEqual("Judg.1.1")
		expect(p.parse("Judg 1:1").osis()).toEqual("Judg.1.1")
		expect(p.parse("Ts 1:1").osis()).toEqual("Judg.1.1")
		p.include_apocrypha(false)
		expect(p.parse("TEISEJU KNYGA 1:1").osis()).toEqual("Judg.1.1")
		expect(p.parse("TEISEJŲ KNYGA 1:1").osis()).toEqual("Judg.1.1")
		expect(p.parse("TEISĖJU KNYGA 1:1").osis()).toEqual("Judg.1.1")
		expect(p.parse("TEISĖJŲ KNYGA 1:1").osis()).toEqual("Judg.1.1")
		expect(p.parse("TEISEJU 1:1").osis()).toEqual("Judg.1.1")
		expect(p.parse("TEISEJŲ 1:1").osis()).toEqual("Judg.1.1")
		expect(p.parse("TEISĖJU 1:1").osis()).toEqual("Judg.1.1")
		expect(p.parse("TEISĖJŲ 1:1").osis()).toEqual("Judg.1.1")
		expect(p.parse("JUDG 1:1").osis()).toEqual("Judg.1.1")
		expect(p.parse("TS 1:1").osis()).toEqual("Judg.1.1")
		`
		true
describe "Localized book Ruth (lt)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: Ruth (lt)", ->
		`
		expect(p.parse("Rutos knyga 1:1").osis()).toEqual("Ruth.1.1")
		expect(p.parse("Rūtos knyga 1:1").osis()).toEqual("Ruth.1.1")
		expect(p.parse("Rutos 1:1").osis()).toEqual("Ruth.1.1")
		expect(p.parse("Rūtos 1:1").osis()).toEqual("Ruth.1.1")
		expect(p.parse("Ruth 1:1").osis()).toEqual("Ruth.1.1")
		expect(p.parse("Rut 1:1").osis()).toEqual("Ruth.1.1")
		expect(p.parse("Rūt 1:1").osis()).toEqual("Ruth.1.1")
		p.include_apocrypha(false)
		expect(p.parse("RUTOS KNYGA 1:1").osis()).toEqual("Ruth.1.1")
		expect(p.parse("RŪTOS KNYGA 1:1").osis()).toEqual("Ruth.1.1")
		expect(p.parse("RUTOS 1:1").osis()).toEqual("Ruth.1.1")
		expect(p.parse("RŪTOS 1:1").osis()).toEqual("Ruth.1.1")
		expect(p.parse("RUTH 1:1").osis()).toEqual("Ruth.1.1")
		expect(p.parse("RUT 1:1").osis()).toEqual("Ruth.1.1")
		expect(p.parse("RŪT 1:1").osis()).toEqual("Ruth.1.1")
		`
		true
describe "Localized book 1Esd (lt)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: 1Esd (lt)", ->
		`
		expect(p.parse("1Esd 1:1").osis()).toEqual("1Esd.1.1")
		`
		true
describe "Localized book 2Esd (lt)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: 2Esd (lt)", ->
		`
		expect(p.parse("2Esd 1:1").osis()).toEqual("2Esd.1.1")
		`
		true
describe "Localized book Isa (lt)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: Isa (lt)", ->
		`
		expect(p.parse("Izaijo knyga 1:1").osis()).toEqual("Isa.1.1")
		expect(p.parse("Izaijo 1:1").osis()).toEqual("Isa.1.1")
		expect(p.parse("Isa 1:1").osis()).toEqual("Isa.1.1")
		expect(p.parse("Iz 1:1").osis()).toEqual("Isa.1.1")
		p.include_apocrypha(false)
		expect(p.parse("IZAIJO KNYGA 1:1").osis()).toEqual("Isa.1.1")
		expect(p.parse("IZAIJO 1:1").osis()).toEqual("Isa.1.1")
		expect(p.parse("ISA 1:1").osis()).toEqual("Isa.1.1")
		expect(p.parse("IZ 1:1").osis()).toEqual("Isa.1.1")
		`
		true
describe "Localized book 2Sam (lt)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: 2Sam (lt)", ->
		`
		expect(p.parse("Samuelio antra knyga 1:1").osis()).toEqual("2Sam.1.1")
		expect(p.parse("2 Samuelio 1:1").osis()).toEqual("2Sam.1.1")
		expect(p.parse("2 Sam 1:1").osis()).toEqual("2Sam.1.1")
		expect(p.parse("2Sam 1:1").osis()).toEqual("2Sam.1.1")
		p.include_apocrypha(false)
		expect(p.parse("SAMUELIO ANTRA KNYGA 1:1").osis()).toEqual("2Sam.1.1")
		expect(p.parse("2 SAMUELIO 1:1").osis()).toEqual("2Sam.1.1")
		expect(p.parse("2 SAM 1:1").osis()).toEqual("2Sam.1.1")
		expect(p.parse("2SAM 1:1").osis()).toEqual("2Sam.1.1")
		`
		true
describe "Localized book 1Sam (lt)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: 1Sam (lt)", ->
		`
		expect(p.parse("Samuelio pirma knyga 1:1").osis()).toEqual("1Sam.1.1")
		expect(p.parse("1 Samuelio 1:1").osis()).toEqual("1Sam.1.1")
		expect(p.parse("1 Sam 1:1").osis()).toEqual("1Sam.1.1")
		expect(p.parse("1Sam 1:1").osis()).toEqual("1Sam.1.1")
		p.include_apocrypha(false)
		expect(p.parse("SAMUELIO PIRMA KNYGA 1:1").osis()).toEqual("1Sam.1.1")
		expect(p.parse("1 SAMUELIO 1:1").osis()).toEqual("1Sam.1.1")
		expect(p.parse("1 SAM 1:1").osis()).toEqual("1Sam.1.1")
		expect(p.parse("1SAM 1:1").osis()).toEqual("1Sam.1.1")
		`
		true
describe "Localized book 2Kgs (lt)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: 2Kgs (lt)", ->
		`
		expect(p.parse("Karaliu antra knyga 1:1").osis()).toEqual("2Kgs.1.1")
		expect(p.parse("Karalių antra knyga 1:1").osis()).toEqual("2Kgs.1.1")
		expect(p.parse("2 Karaliu 1:1").osis()).toEqual("2Kgs.1.1")
		expect(p.parse("2 Karalių 1:1").osis()).toEqual("2Kgs.1.1")
		expect(p.parse("2 Kar 1:1").osis()).toEqual("2Kgs.1.1")
		expect(p.parse("2Kgs 1:1").osis()).toEqual("2Kgs.1.1")
		p.include_apocrypha(false)
		expect(p.parse("KARALIU ANTRA KNYGA 1:1").osis()).toEqual("2Kgs.1.1")
		expect(p.parse("KARALIŲ ANTRA KNYGA 1:1").osis()).toEqual("2Kgs.1.1")
		expect(p.parse("2 KARALIU 1:1").osis()).toEqual("2Kgs.1.1")
		expect(p.parse("2 KARALIŲ 1:1").osis()).toEqual("2Kgs.1.1")
		expect(p.parse("2 KAR 1:1").osis()).toEqual("2Kgs.1.1")
		expect(p.parse("2KGS 1:1").osis()).toEqual("2Kgs.1.1")
		`
		true
describe "Localized book 1Kgs (lt)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: 1Kgs (lt)", ->
		`
		expect(p.parse("Karaliu pirma knyga 1:1").osis()).toEqual("1Kgs.1.1")
		expect(p.parse("Karalių pirma knyga 1:1").osis()).toEqual("1Kgs.1.1")
		expect(p.parse("1 Karaliu 1:1").osis()).toEqual("1Kgs.1.1")
		expect(p.parse("1 Karalių 1:1").osis()).toEqual("1Kgs.1.1")
		expect(p.parse("1 Kar 1:1").osis()).toEqual("1Kgs.1.1")
		expect(p.parse("1Kgs 1:1").osis()).toEqual("1Kgs.1.1")
		p.include_apocrypha(false)
		expect(p.parse("KARALIU PIRMA KNYGA 1:1").osis()).toEqual("1Kgs.1.1")
		expect(p.parse("KARALIŲ PIRMA KNYGA 1:1").osis()).toEqual("1Kgs.1.1")
		expect(p.parse("1 KARALIU 1:1").osis()).toEqual("1Kgs.1.1")
		expect(p.parse("1 KARALIŲ 1:1").osis()).toEqual("1Kgs.1.1")
		expect(p.parse("1 KAR 1:1").osis()).toEqual("1Kgs.1.1")
		expect(p.parse("1KGS 1:1").osis()).toEqual("1Kgs.1.1")
		`
		true
describe "Localized book 2Chr (lt)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: 2Chr (lt)", ->
		`
		expect(p.parse("Metrasciu antra knyga 1:1").osis()).toEqual("2Chr.1.1")
		expect(p.parse("Metrascių antra knyga 1:1").osis()).toEqual("2Chr.1.1")
		expect(p.parse("Metrasčiu antra knyga 1:1").osis()).toEqual("2Chr.1.1")
		expect(p.parse("Metrasčių antra knyga 1:1").osis()).toEqual("2Chr.1.1")
		expect(p.parse("Metrašciu antra knyga 1:1").osis()).toEqual("2Chr.1.1")
		expect(p.parse("Metrašcių antra knyga 1:1").osis()).toEqual("2Chr.1.1")
		expect(p.parse("Metraščiu antra knyga 1:1").osis()).toEqual("2Chr.1.1")
		expect(p.parse("Metraščių antra knyga 1:1").osis()).toEqual("2Chr.1.1")
		expect(p.parse("2 Metrasciu 1:1").osis()).toEqual("2Chr.1.1")
		expect(p.parse("2 Metrascių 1:1").osis()).toEqual("2Chr.1.1")
		expect(p.parse("2 Metrasčiu 1:1").osis()).toEqual("2Chr.1.1")
		expect(p.parse("2 Metrasčių 1:1").osis()).toEqual("2Chr.1.1")
		expect(p.parse("2 Metrašciu 1:1").osis()).toEqual("2Chr.1.1")
		expect(p.parse("2 Metrašcių 1:1").osis()).toEqual("2Chr.1.1")
		expect(p.parse("2 Metraščiu 1:1").osis()).toEqual("2Chr.1.1")
		expect(p.parse("2 Metraščių 1:1").osis()).toEqual("2Chr.1.1")
		expect(p.parse("2 Met 1:1").osis()).toEqual("2Chr.1.1")
		expect(p.parse("2Chr 1:1").osis()).toEqual("2Chr.1.1")
		p.include_apocrypha(false)
		expect(p.parse("METRASCIU ANTRA KNYGA 1:1").osis()).toEqual("2Chr.1.1")
		expect(p.parse("METRASCIŲ ANTRA KNYGA 1:1").osis()).toEqual("2Chr.1.1")
		expect(p.parse("METRASČIU ANTRA KNYGA 1:1").osis()).toEqual("2Chr.1.1")
		expect(p.parse("METRASČIŲ ANTRA KNYGA 1:1").osis()).toEqual("2Chr.1.1")
		expect(p.parse("METRAŠCIU ANTRA KNYGA 1:1").osis()).toEqual("2Chr.1.1")
		expect(p.parse("METRAŠCIŲ ANTRA KNYGA 1:1").osis()).toEqual("2Chr.1.1")
		expect(p.parse("METRAŠČIU ANTRA KNYGA 1:1").osis()).toEqual("2Chr.1.1")
		expect(p.parse("METRAŠČIŲ ANTRA KNYGA 1:1").osis()).toEqual("2Chr.1.1")
		expect(p.parse("2 METRASCIU 1:1").osis()).toEqual("2Chr.1.1")
		expect(p.parse("2 METRASCIŲ 1:1").osis()).toEqual("2Chr.1.1")
		expect(p.parse("2 METRASČIU 1:1").osis()).toEqual("2Chr.1.1")
		expect(p.parse("2 METRASČIŲ 1:1").osis()).toEqual("2Chr.1.1")
		expect(p.parse("2 METRAŠCIU 1:1").osis()).toEqual("2Chr.1.1")
		expect(p.parse("2 METRAŠCIŲ 1:1").osis()).toEqual("2Chr.1.1")
		expect(p.parse("2 METRAŠČIU 1:1").osis()).toEqual("2Chr.1.1")
		expect(p.parse("2 METRAŠČIŲ 1:1").osis()).toEqual("2Chr.1.1")
		expect(p.parse("2 MET 1:1").osis()).toEqual("2Chr.1.1")
		expect(p.parse("2CHR 1:1").osis()).toEqual("2Chr.1.1")
		`
		true
describe "Localized book 1Chr (lt)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: 1Chr (lt)", ->
		`
		expect(p.parse("Metrasciu pirma knyga 1:1").osis()).toEqual("1Chr.1.1")
		expect(p.parse("Metrascių pirma knyga 1:1").osis()).toEqual("1Chr.1.1")
		expect(p.parse("Metrasčiu pirma knyga 1:1").osis()).toEqual("1Chr.1.1")
		expect(p.parse("Metrasčių pirma knyga 1:1").osis()).toEqual("1Chr.1.1")
		expect(p.parse("Metrašciu pirma knyga 1:1").osis()).toEqual("1Chr.1.1")
		expect(p.parse("Metrašcių pirma knyga 1:1").osis()).toEqual("1Chr.1.1")
		expect(p.parse("Metraščiu pirma knyga 1:1").osis()).toEqual("1Chr.1.1")
		expect(p.parse("Metraščių pirma knyga 1:1").osis()).toEqual("1Chr.1.1")
		expect(p.parse("1 Metrasciu 1:1").osis()).toEqual("1Chr.1.1")
		expect(p.parse("1 Metrascių 1:1").osis()).toEqual("1Chr.1.1")
		expect(p.parse("1 Metrasčiu 1:1").osis()).toEqual("1Chr.1.1")
		expect(p.parse("1 Metrasčių 1:1").osis()).toEqual("1Chr.1.1")
		expect(p.parse("1 Metrašciu 1:1").osis()).toEqual("1Chr.1.1")
		expect(p.parse("1 Metrašcių 1:1").osis()).toEqual("1Chr.1.1")
		expect(p.parse("1 Metraščiu 1:1").osis()).toEqual("1Chr.1.1")
		expect(p.parse("1 Metraščių 1:1").osis()).toEqual("1Chr.1.1")
		expect(p.parse("1 Met 1:1").osis()).toEqual("1Chr.1.1")
		expect(p.parse("1Chr 1:1").osis()).toEqual("1Chr.1.1")
		p.include_apocrypha(false)
		expect(p.parse("METRASCIU PIRMA KNYGA 1:1").osis()).toEqual("1Chr.1.1")
		expect(p.parse("METRASCIŲ PIRMA KNYGA 1:1").osis()).toEqual("1Chr.1.1")
		expect(p.parse("METRASČIU PIRMA KNYGA 1:1").osis()).toEqual("1Chr.1.1")
		expect(p.parse("METRASČIŲ PIRMA KNYGA 1:1").osis()).toEqual("1Chr.1.1")
		expect(p.parse("METRAŠCIU PIRMA KNYGA 1:1").osis()).toEqual("1Chr.1.1")
		expect(p.parse("METRAŠCIŲ PIRMA KNYGA 1:1").osis()).toEqual("1Chr.1.1")
		expect(p.parse("METRAŠČIU PIRMA KNYGA 1:1").osis()).toEqual("1Chr.1.1")
		expect(p.parse("METRAŠČIŲ PIRMA KNYGA 1:1").osis()).toEqual("1Chr.1.1")
		expect(p.parse("1 METRASCIU 1:1").osis()).toEqual("1Chr.1.1")
		expect(p.parse("1 METRASCIŲ 1:1").osis()).toEqual("1Chr.1.1")
		expect(p.parse("1 METRASČIU 1:1").osis()).toEqual("1Chr.1.1")
		expect(p.parse("1 METRASČIŲ 1:1").osis()).toEqual("1Chr.1.1")
		expect(p.parse("1 METRAŠCIU 1:1").osis()).toEqual("1Chr.1.1")
		expect(p.parse("1 METRAŠCIŲ 1:1").osis()).toEqual("1Chr.1.1")
		expect(p.parse("1 METRAŠČIU 1:1").osis()).toEqual("1Chr.1.1")
		expect(p.parse("1 METRAŠČIŲ 1:1").osis()).toEqual("1Chr.1.1")
		expect(p.parse("1 MET 1:1").osis()).toEqual("1Chr.1.1")
		expect(p.parse("1CHR 1:1").osis()).toEqual("1Chr.1.1")
		`
		true
describe "Localized book Ezra (lt)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: Ezra (lt)", ->
		`
		expect(p.parse("Ezros knyga 1:1").osis()).toEqual("Ezra.1.1")
		expect(p.parse("Ezros 1:1").osis()).toEqual("Ezra.1.1")
		expect(p.parse("Ezra 1:1").osis()).toEqual("Ezra.1.1")
		expect(p.parse("Ezr 1:1").osis()).toEqual("Ezra.1.1")
		p.include_apocrypha(false)
		expect(p.parse("EZROS KNYGA 1:1").osis()).toEqual("Ezra.1.1")
		expect(p.parse("EZROS 1:1").osis()).toEqual("Ezra.1.1")
		expect(p.parse("EZRA 1:1").osis()).toEqual("Ezra.1.1")
		expect(p.parse("EZR 1:1").osis()).toEqual("Ezra.1.1")
		`
		true
describe "Localized book Neh (lt)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: Neh (lt)", ->
		`
		expect(p.parse("Nehemijo knyga 1:1").osis()).toEqual("Neh.1.1")
		expect(p.parse("Nehemijo 1:1").osis()).toEqual("Neh.1.1")
		expect(p.parse("Neh 1:1").osis()).toEqual("Neh.1.1")
		p.include_apocrypha(false)
		expect(p.parse("NEHEMIJO KNYGA 1:1").osis()).toEqual("Neh.1.1")
		expect(p.parse("NEHEMIJO 1:1").osis()).toEqual("Neh.1.1")
		expect(p.parse("NEH 1:1").osis()).toEqual("Neh.1.1")
		`
		true
describe "Localized book GkEsth (lt)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: GkEsth (lt)", ->
		`
		expect(p.parse("GkEsth 1:1").osis()).toEqual("GkEsth.1.1")
		`
		true
describe "Localized book Esth (lt)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: Esth (lt)", ->
		`
		expect(p.parse("Esteros knyga 1:1").osis()).toEqual("Esth.1.1")
		expect(p.parse("Esteros 1:1").osis()).toEqual("Esth.1.1")
		expect(p.parse("Esth 1:1").osis()).toEqual("Esth.1.1")
		expect(p.parse("Est 1:1").osis()).toEqual("Esth.1.1")
		p.include_apocrypha(false)
		expect(p.parse("ESTEROS KNYGA 1:1").osis()).toEqual("Esth.1.1")
		expect(p.parse("ESTEROS 1:1").osis()).toEqual("Esth.1.1")
		expect(p.parse("ESTH 1:1").osis()).toEqual("Esth.1.1")
		expect(p.parse("EST 1:1").osis()).toEqual("Esth.1.1")
		`
		true
describe "Localized book Job (lt)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: Job (lt)", ->
		`
		expect(p.parse("Jobo knyga 1:1").osis()).toEqual("Job.1.1")
		expect(p.parse("Jobo 1:1").osis()).toEqual("Job.1.1")
		expect(p.parse("Job 1:1").osis()).toEqual("Job.1.1")
		p.include_apocrypha(false)
		expect(p.parse("JOBO KNYGA 1:1").osis()).toEqual("Job.1.1")
		expect(p.parse("JOBO 1:1").osis()).toEqual("Job.1.1")
		expect(p.parse("JOB 1:1").osis()).toEqual("Job.1.1")
		`
		true
describe "Localized book Ps (lt)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: Ps (lt)", ->
		`
		expect(p.parse("Psalmynas 1:1").osis()).toEqual("Ps.1.1")
		expect(p.parse("Ps 1:1").osis()).toEqual("Ps.1.1")
		p.include_apocrypha(false)
		expect(p.parse("PSALMYNAS 1:1").osis()).toEqual("Ps.1.1")
		expect(p.parse("PS 1:1").osis()).toEqual("Ps.1.1")
		`
		true
describe "Localized book PrAzar (lt)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: PrAzar (lt)", ->
		`
		expect(p.parse("PrAzar 1:1").osis()).toEqual("PrAzar.1.1")
		`
		true
describe "Localized book Prov (lt)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: Prov (lt)", ->
		`
		expect(p.parse("Patarliu knyga 1:1").osis()).toEqual("Prov.1.1")
		expect(p.parse("Patarlių knyga 1:1").osis()).toEqual("Prov.1.1")
		expect(p.parse("Patarliu 1:1").osis()).toEqual("Prov.1.1")
		expect(p.parse("Patarlių 1:1").osis()).toEqual("Prov.1.1")
		expect(p.parse("Prov 1:1").osis()).toEqual("Prov.1.1")
		expect(p.parse("Pat 1:1").osis()).toEqual("Prov.1.1")
		p.include_apocrypha(false)
		expect(p.parse("PATARLIU KNYGA 1:1").osis()).toEqual("Prov.1.1")
		expect(p.parse("PATARLIŲ KNYGA 1:1").osis()).toEqual("Prov.1.1")
		expect(p.parse("PATARLIU 1:1").osis()).toEqual("Prov.1.1")
		expect(p.parse("PATARLIŲ 1:1").osis()).toEqual("Prov.1.1")
		expect(p.parse("PROV 1:1").osis()).toEqual("Prov.1.1")
		expect(p.parse("PAT 1:1").osis()).toEqual("Prov.1.1")
		`
		true
describe "Localized book Eccl (lt)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: Eccl (lt)", ->
		`
		expect(p.parse("Mokytojo knyga 1:1").osis()).toEqual("Eccl.1.1")
		expect(p.parse("Mokytojo 1:1").osis()).toEqual("Eccl.1.1")
		expect(p.parse("Eccl 1:1").osis()).toEqual("Eccl.1.1")
		expect(p.parse("Mok 1:1").osis()).toEqual("Eccl.1.1")
		p.include_apocrypha(false)
		expect(p.parse("MOKYTOJO KNYGA 1:1").osis()).toEqual("Eccl.1.1")
		expect(p.parse("MOKYTOJO 1:1").osis()).toEqual("Eccl.1.1")
		expect(p.parse("ECCL 1:1").osis()).toEqual("Eccl.1.1")
		expect(p.parse("MOK 1:1").osis()).toEqual("Eccl.1.1")
		`
		true
describe "Localized book SgThree (lt)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: SgThree (lt)", ->
		`
		expect(p.parse("SgThree 1:1").osis()).toEqual("SgThree.1.1")
		`
		true
describe "Localized book Song (lt)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: Song (lt)", ->
		`
		expect(p.parse("Giesmiu giesmes knyga 1:1").osis()).toEqual("Song.1.1")
		expect(p.parse("Giesmiu giesmės knyga 1:1").osis()).toEqual("Song.1.1")
		expect(p.parse("Giesmių giesmes knyga 1:1").osis()).toEqual("Song.1.1")
		expect(p.parse("Giesmių giesmės knyga 1:1").osis()).toEqual("Song.1.1")
		expect(p.parse("Giesmiu giesmes 1:1").osis()).toEqual("Song.1.1")
		expect(p.parse("Giesmiu giesmės 1:1").osis()).toEqual("Song.1.1")
		expect(p.parse("Giesmių giesmes 1:1").osis()).toEqual("Song.1.1")
		expect(p.parse("Giesmių giesmės 1:1").osis()).toEqual("Song.1.1")
		expect(p.parse("Song 1:1").osis()).toEqual("Song.1.1")
		expect(p.parse("Gg 1:1").osis()).toEqual("Song.1.1")
		p.include_apocrypha(false)
		expect(p.parse("GIESMIU GIESMES KNYGA 1:1").osis()).toEqual("Song.1.1")
		expect(p.parse("GIESMIU GIESMĖS KNYGA 1:1").osis()).toEqual("Song.1.1")
		expect(p.parse("GIESMIŲ GIESMES KNYGA 1:1").osis()).toEqual("Song.1.1")
		expect(p.parse("GIESMIŲ GIESMĖS KNYGA 1:1").osis()).toEqual("Song.1.1")
		expect(p.parse("GIESMIU GIESMES 1:1").osis()).toEqual("Song.1.1")
		expect(p.parse("GIESMIU GIESMĖS 1:1").osis()).toEqual("Song.1.1")
		expect(p.parse("GIESMIŲ GIESMES 1:1").osis()).toEqual("Song.1.1")
		expect(p.parse("GIESMIŲ GIESMĖS 1:1").osis()).toEqual("Song.1.1")
		expect(p.parse("SONG 1:1").osis()).toEqual("Song.1.1")
		expect(p.parse("GG 1:1").osis()).toEqual("Song.1.1")
		`
		true
describe "Localized book Jer (lt)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: Jer (lt)", ->
		`
		expect(p.parse("Jeremijo knyga 1:1").osis()).toEqual("Jer.1.1")
		expect(p.parse("Jeremijo 1:1").osis()).toEqual("Jer.1.1")
		expect(p.parse("Jer 1:1").osis()).toEqual("Jer.1.1")
		p.include_apocrypha(false)
		expect(p.parse("JEREMIJO KNYGA 1:1").osis()).toEqual("Jer.1.1")
		expect(p.parse("JEREMIJO 1:1").osis()).toEqual("Jer.1.1")
		expect(p.parse("JER 1:1").osis()).toEqual("Jer.1.1")
		`
		true
describe "Localized book Ezek (lt)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: Ezek (lt)", ->
		`
		expect(p.parse("Ezechielio knyga 1:1").osis()).toEqual("Ezek.1.1")
		expect(p.parse("Ezechielio 1:1").osis()).toEqual("Ezek.1.1")
		expect(p.parse("Ezek 1:1").osis()).toEqual("Ezek.1.1")
		expect(p.parse("Ez 1:1").osis()).toEqual("Ezek.1.1")
		p.include_apocrypha(false)
		expect(p.parse("EZECHIELIO KNYGA 1:1").osis()).toEqual("Ezek.1.1")
		expect(p.parse("EZECHIELIO 1:1").osis()).toEqual("Ezek.1.1")
		expect(p.parse("EZEK 1:1").osis()).toEqual("Ezek.1.1")
		expect(p.parse("EZ 1:1").osis()).toEqual("Ezek.1.1")
		`
		true
describe "Localized book Dan (lt)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: Dan (lt)", ->
		`
		expect(p.parse("Danieliaus knyga 1:1").osis()).toEqual("Dan.1.1")
		expect(p.parse("Danieliaus 1:1").osis()).toEqual("Dan.1.1")
		expect(p.parse("Dan 1:1").osis()).toEqual("Dan.1.1")
		p.include_apocrypha(false)
		expect(p.parse("DANIELIAUS KNYGA 1:1").osis()).toEqual("Dan.1.1")
		expect(p.parse("DANIELIAUS 1:1").osis()).toEqual("Dan.1.1")
		expect(p.parse("DAN 1:1").osis()).toEqual("Dan.1.1")
		`
		true
describe "Localized book Hos (lt)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: Hos (lt)", ->
		`
		expect(p.parse("Ozejo knyga 1:1").osis()).toEqual("Hos.1.1")
		expect(p.parse("Ozėjo knyga 1:1").osis()).toEqual("Hos.1.1")
		expect(p.parse("Ozejo 1:1").osis()).toEqual("Hos.1.1")
		expect(p.parse("Ozėjo 1:1").osis()).toEqual("Hos.1.1")
		expect(p.parse("Hos 1:1").osis()).toEqual("Hos.1.1")
		expect(p.parse("Oz 1:1").osis()).toEqual("Hos.1.1")
		p.include_apocrypha(false)
		expect(p.parse("OZEJO KNYGA 1:1").osis()).toEqual("Hos.1.1")
		expect(p.parse("OZĖJO KNYGA 1:1").osis()).toEqual("Hos.1.1")
		expect(p.parse("OZEJO 1:1").osis()).toEqual("Hos.1.1")
		expect(p.parse("OZĖJO 1:1").osis()).toEqual("Hos.1.1")
		expect(p.parse("HOS 1:1").osis()).toEqual("Hos.1.1")
		expect(p.parse("OZ 1:1").osis()).toEqual("Hos.1.1")
		`
		true
describe "Localized book Joel (lt)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: Joel (lt)", ->
		`
		expect(p.parse("Joelio knyga 1:1").osis()).toEqual("Joel.1.1")
		expect(p.parse("Joelio 1:1").osis()).toEqual("Joel.1.1")
		expect(p.parse("Joel 1:1").osis()).toEqual("Joel.1.1")
		expect(p.parse("Jl 1:1").osis()).toEqual("Joel.1.1")
		p.include_apocrypha(false)
		expect(p.parse("JOELIO KNYGA 1:1").osis()).toEqual("Joel.1.1")
		expect(p.parse("JOELIO 1:1").osis()).toEqual("Joel.1.1")
		expect(p.parse("JOEL 1:1").osis()).toEqual("Joel.1.1")
		expect(p.parse("JL 1:1").osis()).toEqual("Joel.1.1")
		`
		true
describe "Localized book Amos (lt)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: Amos (lt)", ->
		`
		expect(p.parse("Amoso knyga 1:1").osis()).toEqual("Amos.1.1")
		expect(p.parse("Amoso 1:1").osis()).toEqual("Amos.1.1")
		expect(p.parse("Amos 1:1").osis()).toEqual("Amos.1.1")
		expect(p.parse("Am 1:1").osis()).toEqual("Amos.1.1")
		p.include_apocrypha(false)
		expect(p.parse("AMOSO KNYGA 1:1").osis()).toEqual("Amos.1.1")
		expect(p.parse("AMOSO 1:1").osis()).toEqual("Amos.1.1")
		expect(p.parse("AMOS 1:1").osis()).toEqual("Amos.1.1")
		expect(p.parse("AM 1:1").osis()).toEqual("Amos.1.1")
		`
		true
describe "Localized book Obad (lt)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: Obad (lt)", ->
		`
		expect(p.parse("Abdijo knyga 1:1").osis()).toEqual("Obad.1.1")
		expect(p.parse("Abdijo 1:1").osis()).toEqual("Obad.1.1")
		expect(p.parse("Obad 1:1").osis()).toEqual("Obad.1.1")
		expect(p.parse("Abd 1:1").osis()).toEqual("Obad.1.1")
		p.include_apocrypha(false)
		expect(p.parse("ABDIJO KNYGA 1:1").osis()).toEqual("Obad.1.1")
		expect(p.parse("ABDIJO 1:1").osis()).toEqual("Obad.1.1")
		expect(p.parse("OBAD 1:1").osis()).toEqual("Obad.1.1")
		expect(p.parse("ABD 1:1").osis()).toEqual("Obad.1.1")
		`
		true
describe "Localized book Jonah (lt)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: Jonah (lt)", ->
		`
		expect(p.parse("Jonos knyga 1:1").osis()).toEqual("Jonah.1.1")
		expect(p.parse("Jonah 1:1").osis()).toEqual("Jonah.1.1")
		expect(p.parse("Jonos 1:1").osis()).toEqual("Jonah.1.1")
		expect(p.parse("Jon 1:1").osis()).toEqual("Jonah.1.1")
		p.include_apocrypha(false)
		expect(p.parse("JONOS KNYGA 1:1").osis()).toEqual("Jonah.1.1")
		expect(p.parse("JONAH 1:1").osis()).toEqual("Jonah.1.1")
		expect(p.parse("JONOS 1:1").osis()).toEqual("Jonah.1.1")
		expect(p.parse("JON 1:1").osis()).toEqual("Jonah.1.1")
		`
		true
describe "Localized book Mic (lt)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: Mic (lt)", ->
		`
		expect(p.parse("Michejo knyga 1:1").osis()).toEqual("Mic.1.1")
		expect(p.parse("Michėjo knyga 1:1").osis()).toEqual("Mic.1.1")
		expect(p.parse("Michejo 1:1").osis()).toEqual("Mic.1.1")
		expect(p.parse("Michėjo 1:1").osis()).toEqual("Mic.1.1")
		expect(p.parse("Mch 1:1").osis()).toEqual("Mic.1.1")
		expect(p.parse("Mic 1:1").osis()).toEqual("Mic.1.1")
		p.include_apocrypha(false)
		expect(p.parse("MICHEJO KNYGA 1:1").osis()).toEqual("Mic.1.1")
		expect(p.parse("MICHĖJO KNYGA 1:1").osis()).toEqual("Mic.1.1")
		expect(p.parse("MICHEJO 1:1").osis()).toEqual("Mic.1.1")
		expect(p.parse("MICHĖJO 1:1").osis()).toEqual("Mic.1.1")
		expect(p.parse("MCH 1:1").osis()).toEqual("Mic.1.1")
		expect(p.parse("MIC 1:1").osis()).toEqual("Mic.1.1")
		`
		true
describe "Localized book Nah (lt)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: Nah (lt)", ->
		`
		expect(p.parse("Nahumo knyga 1:1").osis()).toEqual("Nah.1.1")
		expect(p.parse("Nahumo 1:1").osis()).toEqual("Nah.1.1")
		expect(p.parse("Nah 1:1").osis()).toEqual("Nah.1.1")
		p.include_apocrypha(false)
		expect(p.parse("NAHUMO KNYGA 1:1").osis()).toEqual("Nah.1.1")
		expect(p.parse("NAHUMO 1:1").osis()).toEqual("Nah.1.1")
		expect(p.parse("NAH 1:1").osis()).toEqual("Nah.1.1")
		`
		true
describe "Localized book Hab (lt)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: Hab (lt)", ->
		`
		expect(p.parse("Habakuko knyga 1:1").osis()).toEqual("Hab.1.1")
		expect(p.parse("Habakuko 1:1").osis()).toEqual("Hab.1.1")
		expect(p.parse("Hab 1:1").osis()).toEqual("Hab.1.1")
		p.include_apocrypha(false)
		expect(p.parse("HABAKUKO KNYGA 1:1").osis()).toEqual("Hab.1.1")
		expect(p.parse("HABAKUKO 1:1").osis()).toEqual("Hab.1.1")
		expect(p.parse("HAB 1:1").osis()).toEqual("Hab.1.1")
		`
		true
describe "Localized book Zeph (lt)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: Zeph (lt)", ->
		`
		expect(p.parse("Sofonijo knyga 1:1").osis()).toEqual("Zeph.1.1")
		expect(p.parse("Sofonijo 1:1").osis()).toEqual("Zeph.1.1")
		expect(p.parse("Zeph 1:1").osis()).toEqual("Zeph.1.1")
		expect(p.parse("Sof 1:1").osis()).toEqual("Zeph.1.1")
		p.include_apocrypha(false)
		expect(p.parse("SOFONIJO KNYGA 1:1").osis()).toEqual("Zeph.1.1")
		expect(p.parse("SOFONIJO 1:1").osis()).toEqual("Zeph.1.1")
		expect(p.parse("ZEPH 1:1").osis()).toEqual("Zeph.1.1")
		expect(p.parse("SOF 1:1").osis()).toEqual("Zeph.1.1")
		`
		true
describe "Localized book Hag (lt)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: Hag (lt)", ->
		`
		expect(p.parse("Agejo knyga 1:1").osis()).toEqual("Hag.1.1")
		expect(p.parse("Agėjo knyga 1:1").osis()).toEqual("Hag.1.1")
		expect(p.parse("Agejo 1:1").osis()).toEqual("Hag.1.1")
		expect(p.parse("Agėjo 1:1").osis()).toEqual("Hag.1.1")
		expect(p.parse("Hag 1:1").osis()).toEqual("Hag.1.1")
		expect(p.parse("Ag 1:1").osis()).toEqual("Hag.1.1")
		p.include_apocrypha(false)
		expect(p.parse("AGEJO KNYGA 1:1").osis()).toEqual("Hag.1.1")
		expect(p.parse("AGĖJO KNYGA 1:1").osis()).toEqual("Hag.1.1")
		expect(p.parse("AGEJO 1:1").osis()).toEqual("Hag.1.1")
		expect(p.parse("AGĖJO 1:1").osis()).toEqual("Hag.1.1")
		expect(p.parse("HAG 1:1").osis()).toEqual("Hag.1.1")
		expect(p.parse("AG 1:1").osis()).toEqual("Hag.1.1")
		`
		true
describe "Localized book Zech (lt)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: Zech (lt)", ->
		`
		expect(p.parse("Zacharijo knyga 1:1").osis()).toEqual("Zech.1.1")
		expect(p.parse("Zacharijo 1:1").osis()).toEqual("Zech.1.1")
		expect(p.parse("Zech 1:1").osis()).toEqual("Zech.1.1")
		expect(p.parse("Zch 1:1").osis()).toEqual("Zech.1.1")
		p.include_apocrypha(false)
		expect(p.parse("ZACHARIJO KNYGA 1:1").osis()).toEqual("Zech.1.1")
		expect(p.parse("ZACHARIJO 1:1").osis()).toEqual("Zech.1.1")
		expect(p.parse("ZECH 1:1").osis()).toEqual("Zech.1.1")
		expect(p.parse("ZCH 1:1").osis()).toEqual("Zech.1.1")
		`
		true
describe "Localized book Mal (lt)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: Mal (lt)", ->
		`
		expect(p.parse("Malachijo knyga 1:1").osis()).toEqual("Mal.1.1")
		expect(p.parse("Malachijo 1:1").osis()).toEqual("Mal.1.1")
		expect(p.parse("Mal 1:1").osis()).toEqual("Mal.1.1")
		p.include_apocrypha(false)
		expect(p.parse("MALACHIJO KNYGA 1:1").osis()).toEqual("Mal.1.1")
		expect(p.parse("MALACHIJO 1:1").osis()).toEqual("Mal.1.1")
		expect(p.parse("MAL 1:1").osis()).toEqual("Mal.1.1")
		`
		true
describe "Localized book Matt (lt)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: Matt (lt)", ->
		`
		expect(p.parse("Evangelija pagal Mata 1:1").osis()).toEqual("Matt.1.1")
		expect(p.parse("Evangelija pagal Matą 1:1").osis()).toEqual("Matt.1.1")
		expect(p.parse("Mato 1:1").osis()).toEqual("Matt.1.1")
		expect(p.parse("Matt 1:1").osis()).toEqual("Matt.1.1")
		expect(p.parse("Mt 1:1").osis()).toEqual("Matt.1.1")
		p.include_apocrypha(false)
		expect(p.parse("EVANGELIJA PAGAL MATA 1:1").osis()).toEqual("Matt.1.1")
		expect(p.parse("EVANGELIJA PAGAL MATĄ 1:1").osis()).toEqual("Matt.1.1")
		expect(p.parse("MATO 1:1").osis()).toEqual("Matt.1.1")
		expect(p.parse("MATT 1:1").osis()).toEqual("Matt.1.1")
		expect(p.parse("MT 1:1").osis()).toEqual("Matt.1.1")
		`
		true
describe "Localized book Mark (lt)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: Mark (lt)", ->
		`
		expect(p.parse("Evangelija pagal Morku 1:1").osis()).toEqual("Mark.1.1")
		expect(p.parse("Evangelija pagal Morkų 1:1").osis()).toEqual("Mark.1.1")
		expect(p.parse("Morkaus 1:1").osis()).toEqual("Mark.1.1")
		expect(p.parse("Mark 1:1").osis()).toEqual("Mark.1.1")
		expect(p.parse("Mk 1:1").osis()).toEqual("Mark.1.1")
		p.include_apocrypha(false)
		expect(p.parse("EVANGELIJA PAGAL MORKU 1:1").osis()).toEqual("Mark.1.1")
		expect(p.parse("EVANGELIJA PAGAL MORKŲ 1:1").osis()).toEqual("Mark.1.1")
		expect(p.parse("MORKAUS 1:1").osis()).toEqual("Mark.1.1")
		expect(p.parse("MARK 1:1").osis()).toEqual("Mark.1.1")
		expect(p.parse("MK 1:1").osis()).toEqual("Mark.1.1")
		`
		true
describe "Localized book Luke (lt)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: Luke (lt)", ->
		`
		expect(p.parse("Evangelija pagal Luka 1:1").osis()).toEqual("Luke.1.1")
		expect(p.parse("Evangelija pagal Luką 1:1").osis()).toEqual("Luke.1.1")
		expect(p.parse("Luke 1:1").osis()).toEqual("Luke.1.1")
		expect(p.parse("Luko 1:1").osis()).toEqual("Luke.1.1")
		expect(p.parse("Lk 1:1").osis()).toEqual("Luke.1.1")
		p.include_apocrypha(false)
		expect(p.parse("EVANGELIJA PAGAL LUKA 1:1").osis()).toEqual("Luke.1.1")
		expect(p.parse("EVANGELIJA PAGAL LUKĄ 1:1").osis()).toEqual("Luke.1.1")
		expect(p.parse("LUKE 1:1").osis()).toEqual("Luke.1.1")
		expect(p.parse("LUKO 1:1").osis()).toEqual("Luke.1.1")
		expect(p.parse("LK 1:1").osis()).toEqual("Luke.1.1")
		`
		true
describe "Localized book 1John (lt)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: 1John (lt)", ->
		`
		expect(p.parse("Jono pirmas laiskas 1:1").osis()).toEqual("1John.1.1")
		expect(p.parse("Jono pirmas laiškas 1:1").osis()).toEqual("1John.1.1")
		expect(p.parse("1 Jono 1:1").osis()).toEqual("1John.1.1")
		expect(p.parse("1John 1:1").osis()).toEqual("1John.1.1")
		expect(p.parse("1 Jn 1:1").osis()).toEqual("1John.1.1")
		p.include_apocrypha(false)
		expect(p.parse("JONO PIRMAS LAISKAS 1:1").osis()).toEqual("1John.1.1")
		expect(p.parse("JONO PIRMAS LAIŠKAS 1:1").osis()).toEqual("1John.1.1")
		expect(p.parse("1 JONO 1:1").osis()).toEqual("1John.1.1")
		expect(p.parse("1JOHN 1:1").osis()).toEqual("1John.1.1")
		expect(p.parse("1 JN 1:1").osis()).toEqual("1John.1.1")
		`
		true
describe "Localized book 2John (lt)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: 2John (lt)", ->
		`
		expect(p.parse("Jono antras laiskas 1:1").osis()).toEqual("2John.1.1")
		expect(p.parse("Jono antras laiškas 1:1").osis()).toEqual("2John.1.1")
		expect(p.parse("2 Jono 1:1").osis()).toEqual("2John.1.1")
		expect(p.parse("2John 1:1").osis()).toEqual("2John.1.1")
		expect(p.parse("2 Jn 1:1").osis()).toEqual("2John.1.1")
		p.include_apocrypha(false)
		expect(p.parse("JONO ANTRAS LAISKAS 1:1").osis()).toEqual("2John.1.1")
		expect(p.parse("JONO ANTRAS LAIŠKAS 1:1").osis()).toEqual("2John.1.1")
		expect(p.parse("2 JONO 1:1").osis()).toEqual("2John.1.1")
		expect(p.parse("2JOHN 1:1").osis()).toEqual("2John.1.1")
		expect(p.parse("2 JN 1:1").osis()).toEqual("2John.1.1")
		`
		true
describe "Localized book 3John (lt)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: 3John (lt)", ->
		`
		expect(p.parse("Jono trecias laiskas 1:1").osis()).toEqual("3John.1.1")
		expect(p.parse("Jono trecias laiškas 1:1").osis()).toEqual("3John.1.1")
		expect(p.parse("Jono trečias laiskas 1:1").osis()).toEqual("3John.1.1")
		expect(p.parse("Jono trečias laiškas 1:1").osis()).toEqual("3John.1.1")
		expect(p.parse("3 Jono 1:1").osis()).toEqual("3John.1.1")
		expect(p.parse("3John 1:1").osis()).toEqual("3John.1.1")
		expect(p.parse("3 Jn 1:1").osis()).toEqual("3John.1.1")
		p.include_apocrypha(false)
		expect(p.parse("JONO TRECIAS LAISKAS 1:1").osis()).toEqual("3John.1.1")
		expect(p.parse("JONO TRECIAS LAIŠKAS 1:1").osis()).toEqual("3John.1.1")
		expect(p.parse("JONO TREČIAS LAISKAS 1:1").osis()).toEqual("3John.1.1")
		expect(p.parse("JONO TREČIAS LAIŠKAS 1:1").osis()).toEqual("3John.1.1")
		expect(p.parse("3 JONO 1:1").osis()).toEqual("3John.1.1")
		expect(p.parse("3JOHN 1:1").osis()).toEqual("3John.1.1")
		expect(p.parse("3 JN 1:1").osis()).toEqual("3John.1.1")
		`
		true
describe "Localized book John (lt)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: John (lt)", ->
		`
		expect(p.parse("Evangelija pagal Jona 1:1").osis()).toEqual("John.1.1")
		expect(p.parse("Evangelija pagal Joną 1:1").osis()).toEqual("John.1.1")
		expect(p.parse("John 1:1").osis()).toEqual("John.1.1")
		expect(p.parse("Jono 1:1").osis()).toEqual("John.1.1")
		expect(p.parse("Jn 1:1").osis()).toEqual("John.1.1")
		p.include_apocrypha(false)
		expect(p.parse("EVANGELIJA PAGAL JONA 1:1").osis()).toEqual("John.1.1")
		expect(p.parse("EVANGELIJA PAGAL JONĄ 1:1").osis()).toEqual("John.1.1")
		expect(p.parse("JOHN 1:1").osis()).toEqual("John.1.1")
		expect(p.parse("JONO 1:1").osis()).toEqual("John.1.1")
		expect(p.parse("JN 1:1").osis()).toEqual("John.1.1")
		`
		true
describe "Localized book Acts (lt)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: Acts (lt)", ->
		`
		expect(p.parse("Apastalu darbai 1:1").osis()).toEqual("Acts.1.1")
		expect(p.parse("Apastalų darbai 1:1").osis()).toEqual("Acts.1.1")
		expect(p.parse("Apaštalu darbai 1:1").osis()).toEqual("Acts.1.1")
		expect(p.parse("Apaštalų darbai 1:1").osis()).toEqual("Acts.1.1")
		expect(p.parse("Apastalu darbu 1:1").osis()).toEqual("Acts.1.1")
		expect(p.parse("Apastalu darbų 1:1").osis()).toEqual("Acts.1.1")
		expect(p.parse("Apastalų darbu 1:1").osis()).toEqual("Acts.1.1")
		expect(p.parse("Apastalų darbų 1:1").osis()).toEqual("Acts.1.1")
		expect(p.parse("Apaštalu darbu 1:1").osis()).toEqual("Acts.1.1")
		expect(p.parse("Apaštalu darbų 1:1").osis()).toEqual("Acts.1.1")
		expect(p.parse("Apaštalų darbu 1:1").osis()).toEqual("Acts.1.1")
		expect(p.parse("Apaštalų darbų 1:1").osis()).toEqual("Acts.1.1")
		expect(p.parse("Acts 1:1").osis()).toEqual("Acts.1.1")
		expect(p.parse("Apd 1:1").osis()).toEqual("Acts.1.1")
		p.include_apocrypha(false)
		expect(p.parse("APASTALU DARBAI 1:1").osis()).toEqual("Acts.1.1")
		expect(p.parse("APASTALŲ DARBAI 1:1").osis()).toEqual("Acts.1.1")
		expect(p.parse("APAŠTALU DARBAI 1:1").osis()).toEqual("Acts.1.1")
		expect(p.parse("APAŠTALŲ DARBAI 1:1").osis()).toEqual("Acts.1.1")
		expect(p.parse("APASTALU DARBU 1:1").osis()).toEqual("Acts.1.1")
		expect(p.parse("APASTALU DARBŲ 1:1").osis()).toEqual("Acts.1.1")
		expect(p.parse("APASTALŲ DARBU 1:1").osis()).toEqual("Acts.1.1")
		expect(p.parse("APASTALŲ DARBŲ 1:1").osis()).toEqual("Acts.1.1")
		expect(p.parse("APAŠTALU DARBU 1:1").osis()).toEqual("Acts.1.1")
		expect(p.parse("APAŠTALU DARBŲ 1:1").osis()).toEqual("Acts.1.1")
		expect(p.parse("APAŠTALŲ DARBU 1:1").osis()).toEqual("Acts.1.1")
		expect(p.parse("APAŠTALŲ DARBŲ 1:1").osis()).toEqual("Acts.1.1")
		expect(p.parse("ACTS 1:1").osis()).toEqual("Acts.1.1")
		expect(p.parse("APD 1:1").osis()).toEqual("Acts.1.1")
		`
		true
describe "Localized book Rom (lt)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: Rom (lt)", ->
		`
		expect(p.parse("Laiskas romieciams 1:1").osis()).toEqual("Rom.1.1")
		expect(p.parse("Laiskas romiečiams 1:1").osis()).toEqual("Rom.1.1")
		expect(p.parse("Laiškas romieciams 1:1").osis()).toEqual("Rom.1.1")
		expect(p.parse("Laiškas romiečiams 1:1").osis()).toEqual("Rom.1.1")
		expect(p.parse("Romieciams 1:1").osis()).toEqual("Rom.1.1")
		expect(p.parse("Romiečiams 1:1").osis()).toEqual("Rom.1.1")
		expect(p.parse("Rom 1:1").osis()).toEqual("Rom.1.1")
		p.include_apocrypha(false)
		expect(p.parse("LAISKAS ROMIECIAMS 1:1").osis()).toEqual("Rom.1.1")
		expect(p.parse("LAISKAS ROMIEČIAMS 1:1").osis()).toEqual("Rom.1.1")
		expect(p.parse("LAIŠKAS ROMIECIAMS 1:1").osis()).toEqual("Rom.1.1")
		expect(p.parse("LAIŠKAS ROMIEČIAMS 1:1").osis()).toEqual("Rom.1.1")
		expect(p.parse("ROMIECIAMS 1:1").osis()).toEqual("Rom.1.1")
		expect(p.parse("ROMIEČIAMS 1:1").osis()).toEqual("Rom.1.1")
		expect(p.parse("ROM 1:1").osis()).toEqual("Rom.1.1")
		`
		true
describe "Localized book 2Cor (lt)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: 2Cor (lt)", ->
		`
		expect(p.parse("Antras laiskas korintieciams 1:1").osis()).toEqual("2Cor.1.1")
		expect(p.parse("Antras laiskas korintiečiams 1:1").osis()).toEqual("2Cor.1.1")
		expect(p.parse("Antras laiškas korintieciams 1:1").osis()).toEqual("2Cor.1.1")
		expect(p.parse("Antras laiškas korintiečiams 1:1").osis()).toEqual("2Cor.1.1")
		expect(p.parse("2 Korintieciams 1:1").osis()).toEqual("2Cor.1.1")
		expect(p.parse("2 Korintiečiams 1:1").osis()).toEqual("2Cor.1.1")
		expect(p.parse("2 Kor 1:1").osis()).toEqual("2Cor.1.1")
		expect(p.parse("2Cor 1:1").osis()).toEqual("2Cor.1.1")
		p.include_apocrypha(false)
		expect(p.parse("ANTRAS LAISKAS KORINTIECIAMS 1:1").osis()).toEqual("2Cor.1.1")
		expect(p.parse("ANTRAS LAISKAS KORINTIEČIAMS 1:1").osis()).toEqual("2Cor.1.1")
		expect(p.parse("ANTRAS LAIŠKAS KORINTIECIAMS 1:1").osis()).toEqual("2Cor.1.1")
		expect(p.parse("ANTRAS LAIŠKAS KORINTIEČIAMS 1:1").osis()).toEqual("2Cor.1.1")
		expect(p.parse("2 KORINTIECIAMS 1:1").osis()).toEqual("2Cor.1.1")
		expect(p.parse("2 KORINTIEČIAMS 1:1").osis()).toEqual("2Cor.1.1")
		expect(p.parse("2 KOR 1:1").osis()).toEqual("2Cor.1.1")
		expect(p.parse("2COR 1:1").osis()).toEqual("2Cor.1.1")
		`
		true
describe "Localized book 1Cor (lt)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: 1Cor (lt)", ->
		`
		expect(p.parse("Pirmas laiskas korintieciams 1:1").osis()).toEqual("1Cor.1.1")
		expect(p.parse("Pirmas laiskas korintiečiams 1:1").osis()).toEqual("1Cor.1.1")
		expect(p.parse("Pirmas laiškas korintieciams 1:1").osis()).toEqual("1Cor.1.1")
		expect(p.parse("Pirmas laiškas korintiečiams 1:1").osis()).toEqual("1Cor.1.1")
		expect(p.parse("1 Korintieciams 1:1").osis()).toEqual("1Cor.1.1")
		expect(p.parse("1 Korintiečiams 1:1").osis()).toEqual("1Cor.1.1")
		expect(p.parse("1 Kor 1:1").osis()).toEqual("1Cor.1.1")
		expect(p.parse("1Cor 1:1").osis()).toEqual("1Cor.1.1")
		p.include_apocrypha(false)
		expect(p.parse("PIRMAS LAISKAS KORINTIECIAMS 1:1").osis()).toEqual("1Cor.1.1")
		expect(p.parse("PIRMAS LAISKAS KORINTIEČIAMS 1:1").osis()).toEqual("1Cor.1.1")
		expect(p.parse("PIRMAS LAIŠKAS KORINTIECIAMS 1:1").osis()).toEqual("1Cor.1.1")
		expect(p.parse("PIRMAS LAIŠKAS KORINTIEČIAMS 1:1").osis()).toEqual("1Cor.1.1")
		expect(p.parse("1 KORINTIECIAMS 1:1").osis()).toEqual("1Cor.1.1")
		expect(p.parse("1 KORINTIEČIAMS 1:1").osis()).toEqual("1Cor.1.1")
		expect(p.parse("1 KOR 1:1").osis()).toEqual("1Cor.1.1")
		expect(p.parse("1COR 1:1").osis()).toEqual("1Cor.1.1")
		`
		true
describe "Localized book Gal (lt)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: Gal (lt)", ->
		`
		expect(p.parse("Laiskas galatams 1:1").osis()).toEqual("Gal.1.1")
		expect(p.parse("Laiškas galatams 1:1").osis()).toEqual("Gal.1.1")
		expect(p.parse("Galatams 1:1").osis()).toEqual("Gal.1.1")
		expect(p.parse("Gal 1:1").osis()).toEqual("Gal.1.1")
		p.include_apocrypha(false)
		expect(p.parse("LAISKAS GALATAMS 1:1").osis()).toEqual("Gal.1.1")
		expect(p.parse("LAIŠKAS GALATAMS 1:1").osis()).toEqual("Gal.1.1")
		expect(p.parse("GALATAMS 1:1").osis()).toEqual("Gal.1.1")
		expect(p.parse("GAL 1:1").osis()).toEqual("Gal.1.1")
		`
		true
describe "Localized book Eph (lt)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: Eph (lt)", ->
		`
		expect(p.parse("Laiskas efezieciams 1:1").osis()).toEqual("Eph.1.1")
		expect(p.parse("Laiskas efeziečiams 1:1").osis()).toEqual("Eph.1.1")
		expect(p.parse("Laiškas efezieciams 1:1").osis()).toEqual("Eph.1.1")
		expect(p.parse("Laiškas efeziečiams 1:1").osis()).toEqual("Eph.1.1")
		expect(p.parse("Efezieciams 1:1").osis()).toEqual("Eph.1.1")
		expect(p.parse("Efeziečiams 1:1").osis()).toEqual("Eph.1.1")
		expect(p.parse("Eph 1:1").osis()).toEqual("Eph.1.1")
		expect(p.parse("Ef 1:1").osis()).toEqual("Eph.1.1")
		p.include_apocrypha(false)
		expect(p.parse("LAISKAS EFEZIECIAMS 1:1").osis()).toEqual("Eph.1.1")
		expect(p.parse("LAISKAS EFEZIEČIAMS 1:1").osis()).toEqual("Eph.1.1")
		expect(p.parse("LAIŠKAS EFEZIECIAMS 1:1").osis()).toEqual("Eph.1.1")
		expect(p.parse("LAIŠKAS EFEZIEČIAMS 1:1").osis()).toEqual("Eph.1.1")
		expect(p.parse("EFEZIECIAMS 1:1").osis()).toEqual("Eph.1.1")
		expect(p.parse("EFEZIEČIAMS 1:1").osis()).toEqual("Eph.1.1")
		expect(p.parse("EPH 1:1").osis()).toEqual("Eph.1.1")
		expect(p.parse("EF 1:1").osis()).toEqual("Eph.1.1")
		`
		true
describe "Localized book Phil (lt)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: Phil (lt)", ->
		`
		expect(p.parse("Laiskas filipieciams 1:1").osis()).toEqual("Phil.1.1")
		expect(p.parse("Laiskas filipiečiams 1:1").osis()).toEqual("Phil.1.1")
		expect(p.parse("Laiškas filipieciams 1:1").osis()).toEqual("Phil.1.1")
		expect(p.parse("Laiškas filipiečiams 1:1").osis()).toEqual("Phil.1.1")
		expect(p.parse("Filipieciams 1:1").osis()).toEqual("Phil.1.1")
		expect(p.parse("Filipiečiams 1:1").osis()).toEqual("Phil.1.1")
		expect(p.parse("Phil 1:1").osis()).toEqual("Phil.1.1")
		expect(p.parse("Fil 1:1").osis()).toEqual("Phil.1.1")
		p.include_apocrypha(false)
		expect(p.parse("LAISKAS FILIPIECIAMS 1:1").osis()).toEqual("Phil.1.1")
		expect(p.parse("LAISKAS FILIPIEČIAMS 1:1").osis()).toEqual("Phil.1.1")
		expect(p.parse("LAIŠKAS FILIPIECIAMS 1:1").osis()).toEqual("Phil.1.1")
		expect(p.parse("LAIŠKAS FILIPIEČIAMS 1:1").osis()).toEqual("Phil.1.1")
		expect(p.parse("FILIPIECIAMS 1:1").osis()).toEqual("Phil.1.1")
		expect(p.parse("FILIPIEČIAMS 1:1").osis()).toEqual("Phil.1.1")
		expect(p.parse("PHIL 1:1").osis()).toEqual("Phil.1.1")
		expect(p.parse("FIL 1:1").osis()).toEqual("Phil.1.1")
		`
		true
describe "Localized book Col (lt)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: Col (lt)", ->
		`
		expect(p.parse("Laiskas kolosieciams 1:1").osis()).toEqual("Col.1.1")
		expect(p.parse("Laiskas kolosiečiams 1:1").osis()).toEqual("Col.1.1")
		expect(p.parse("Laiškas kolosieciams 1:1").osis()).toEqual("Col.1.1")
		expect(p.parse("Laiškas kolosiečiams 1:1").osis()).toEqual("Col.1.1")
		expect(p.parse("Kolosieciams 1:1").osis()).toEqual("Col.1.1")
		expect(p.parse("Kolosiečiams 1:1").osis()).toEqual("Col.1.1")
		expect(p.parse("Col 1:1").osis()).toEqual("Col.1.1")
		expect(p.parse("Kol 1:1").osis()).toEqual("Col.1.1")
		p.include_apocrypha(false)
		expect(p.parse("LAISKAS KOLOSIECIAMS 1:1").osis()).toEqual("Col.1.1")
		expect(p.parse("LAISKAS KOLOSIEČIAMS 1:1").osis()).toEqual("Col.1.1")
		expect(p.parse("LAIŠKAS KOLOSIECIAMS 1:1").osis()).toEqual("Col.1.1")
		expect(p.parse("LAIŠKAS KOLOSIEČIAMS 1:1").osis()).toEqual("Col.1.1")
		expect(p.parse("KOLOSIECIAMS 1:1").osis()).toEqual("Col.1.1")
		expect(p.parse("KOLOSIEČIAMS 1:1").osis()).toEqual("Col.1.1")
		expect(p.parse("COL 1:1").osis()).toEqual("Col.1.1")
		expect(p.parse("KOL 1:1").osis()).toEqual("Col.1.1")
		`
		true
describe "Localized book 2Thess (lt)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: 2Thess (lt)", ->
		`
		expect(p.parse("Antras laiskas tesalonikieciams 1:1").osis()).toEqual("2Thess.1.1")
		expect(p.parse("Antras laiskas tesalonikiečiams 1:1").osis()).toEqual("2Thess.1.1")
		expect(p.parse("Antras laiškas tesalonikieciams 1:1").osis()).toEqual("2Thess.1.1")
		expect(p.parse("Antras laiškas tesalonikiečiams 1:1").osis()).toEqual("2Thess.1.1")
		expect(p.parse("2 Tesalonikieciams 1:1").osis()).toEqual("2Thess.1.1")
		expect(p.parse("2 Tesalonikiečiams 1:1").osis()).toEqual("2Thess.1.1")
		expect(p.parse("2Thess 1:1").osis()).toEqual("2Thess.1.1")
		expect(p.parse("2 Tes 1:1").osis()).toEqual("2Thess.1.1")
		p.include_apocrypha(false)
		expect(p.parse("ANTRAS LAISKAS TESALONIKIECIAMS 1:1").osis()).toEqual("2Thess.1.1")
		expect(p.parse("ANTRAS LAISKAS TESALONIKIEČIAMS 1:1").osis()).toEqual("2Thess.1.1")
		expect(p.parse("ANTRAS LAIŠKAS TESALONIKIECIAMS 1:1").osis()).toEqual("2Thess.1.1")
		expect(p.parse("ANTRAS LAIŠKAS TESALONIKIEČIAMS 1:1").osis()).toEqual("2Thess.1.1")
		expect(p.parse("2 TESALONIKIECIAMS 1:1").osis()).toEqual("2Thess.1.1")
		expect(p.parse("2 TESALONIKIEČIAMS 1:1").osis()).toEqual("2Thess.1.1")
		expect(p.parse("2THESS 1:1").osis()).toEqual("2Thess.1.1")
		expect(p.parse("2 TES 1:1").osis()).toEqual("2Thess.1.1")
		`
		true
describe "Localized book 1Thess (lt)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: 1Thess (lt)", ->
		`
		expect(p.parse("Pirmas laiskas tesalonikieciams 1:1").osis()).toEqual("1Thess.1.1")
		expect(p.parse("Pirmas laiskas tesalonikiečiams 1:1").osis()).toEqual("1Thess.1.1")
		expect(p.parse("Pirmas laiškas tesalonikieciams 1:1").osis()).toEqual("1Thess.1.1")
		expect(p.parse("Pirmas laiškas tesalonikiečiams 1:1").osis()).toEqual("1Thess.1.1")
		expect(p.parse("1 Tesalonikieciams 1:1").osis()).toEqual("1Thess.1.1")
		expect(p.parse("1 Tesalonikiečiams 1:1").osis()).toEqual("1Thess.1.1")
		expect(p.parse("1Thess 1:1").osis()).toEqual("1Thess.1.1")
		expect(p.parse("1 Tes 1:1").osis()).toEqual("1Thess.1.1")
		p.include_apocrypha(false)
		expect(p.parse("PIRMAS LAISKAS TESALONIKIECIAMS 1:1").osis()).toEqual("1Thess.1.1")
		expect(p.parse("PIRMAS LAISKAS TESALONIKIEČIAMS 1:1").osis()).toEqual("1Thess.1.1")
		expect(p.parse("PIRMAS LAIŠKAS TESALONIKIECIAMS 1:1").osis()).toEqual("1Thess.1.1")
		expect(p.parse("PIRMAS LAIŠKAS TESALONIKIEČIAMS 1:1").osis()).toEqual("1Thess.1.1")
		expect(p.parse("1 TESALONIKIECIAMS 1:1").osis()).toEqual("1Thess.1.1")
		expect(p.parse("1 TESALONIKIEČIAMS 1:1").osis()).toEqual("1Thess.1.1")
		expect(p.parse("1THESS 1:1").osis()).toEqual("1Thess.1.1")
		expect(p.parse("1 TES 1:1").osis()).toEqual("1Thess.1.1")
		`
		true
describe "Localized book 2Tim (lt)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: 2Tim (lt)", ->
		`
		expect(p.parse("Antras laiskas Timotiejui 1:1").osis()).toEqual("2Tim.1.1")
		expect(p.parse("Antras laiškas Timotiejui 1:1").osis()).toEqual("2Tim.1.1")
		expect(p.parse("2 Timotiejui 1:1").osis()).toEqual("2Tim.1.1")
		expect(p.parse("2 Tim 1:1").osis()).toEqual("2Tim.1.1")
		expect(p.parse("2Tim 1:1").osis()).toEqual("2Tim.1.1")
		p.include_apocrypha(false)
		expect(p.parse("ANTRAS LAISKAS TIMOTIEJUI 1:1").osis()).toEqual("2Tim.1.1")
		expect(p.parse("ANTRAS LAIŠKAS TIMOTIEJUI 1:1").osis()).toEqual("2Tim.1.1")
		expect(p.parse("2 TIMOTIEJUI 1:1").osis()).toEqual("2Tim.1.1")
		expect(p.parse("2 TIM 1:1").osis()).toEqual("2Tim.1.1")
		expect(p.parse("2TIM 1:1").osis()).toEqual("2Tim.1.1")
		`
		true
describe "Localized book 1Tim (lt)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: 1Tim (lt)", ->
		`
		expect(p.parse("Pirmas laiskas Timotiejui 1:1").osis()).toEqual("1Tim.1.1")
		expect(p.parse("Pirmas laiškas Timotiejui 1:1").osis()).toEqual("1Tim.1.1")
		expect(p.parse("1 Timotiejui 1:1").osis()).toEqual("1Tim.1.1")
		expect(p.parse("1 Tim 1:1").osis()).toEqual("1Tim.1.1")
		expect(p.parse("1Tim 1:1").osis()).toEqual("1Tim.1.1")
		p.include_apocrypha(false)
		expect(p.parse("PIRMAS LAISKAS TIMOTIEJUI 1:1").osis()).toEqual("1Tim.1.1")
		expect(p.parse("PIRMAS LAIŠKAS TIMOTIEJUI 1:1").osis()).toEqual("1Tim.1.1")
		expect(p.parse("1 TIMOTIEJUI 1:1").osis()).toEqual("1Tim.1.1")
		expect(p.parse("1 TIM 1:1").osis()).toEqual("1Tim.1.1")
		expect(p.parse("1TIM 1:1").osis()).toEqual("1Tim.1.1")
		`
		true
describe "Localized book Titus (lt)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: Titus (lt)", ->
		`
		expect(p.parse("Laiskas Titui 1:1").osis()).toEqual("Titus.1.1")
		expect(p.parse("Laiškas Titui 1:1").osis()).toEqual("Titus.1.1")
		expect(p.parse("Titui 1:1").osis()).toEqual("Titus.1.1")
		expect(p.parse("Titus 1:1").osis()).toEqual("Titus.1.1")
		expect(p.parse("Tit 1:1").osis()).toEqual("Titus.1.1")
		p.include_apocrypha(false)
		expect(p.parse("LAISKAS TITUI 1:1").osis()).toEqual("Titus.1.1")
		expect(p.parse("LAIŠKAS TITUI 1:1").osis()).toEqual("Titus.1.1")
		expect(p.parse("TITUI 1:1").osis()).toEqual("Titus.1.1")
		expect(p.parse("TITUS 1:1").osis()).toEqual("Titus.1.1")
		expect(p.parse("TIT 1:1").osis()).toEqual("Titus.1.1")
		`
		true
describe "Localized book Phlm (lt)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: Phlm (lt)", ->
		`
		expect(p.parse("Laiskas Filemonui 1:1").osis()).toEqual("Phlm.1.1")
		expect(p.parse("Laiškas Filemonui 1:1").osis()).toEqual("Phlm.1.1")
		expect(p.parse("Filemonui 1:1").osis()).toEqual("Phlm.1.1")
		expect(p.parse("Phlm 1:1").osis()).toEqual("Phlm.1.1")
		expect(p.parse("Fm 1:1").osis()).toEqual("Phlm.1.1")
		p.include_apocrypha(false)
		expect(p.parse("LAISKAS FILEMONUI 1:1").osis()).toEqual("Phlm.1.1")
		expect(p.parse("LAIŠKAS FILEMONUI 1:1").osis()).toEqual("Phlm.1.1")
		expect(p.parse("FILEMONUI 1:1").osis()).toEqual("Phlm.1.1")
		expect(p.parse("PHLM 1:1").osis()).toEqual("Phlm.1.1")
		expect(p.parse("FM 1:1").osis()).toEqual("Phlm.1.1")
		`
		true
describe "Localized book Heb (lt)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: Heb (lt)", ->
		`
		expect(p.parse("Laiskas hebrajams 1:1").osis()).toEqual("Heb.1.1")
		expect(p.parse("Laiškas hebrajams 1:1").osis()).toEqual("Heb.1.1")
		expect(p.parse("Hebrajams 1:1").osis()).toEqual("Heb.1.1")
		expect(p.parse("Hbr 1:1").osis()).toEqual("Heb.1.1")
		expect(p.parse("Heb 1:1").osis()).toEqual("Heb.1.1")
		p.include_apocrypha(false)
		expect(p.parse("LAISKAS HEBRAJAMS 1:1").osis()).toEqual("Heb.1.1")
		expect(p.parse("LAIŠKAS HEBRAJAMS 1:1").osis()).toEqual("Heb.1.1")
		expect(p.parse("HEBRAJAMS 1:1").osis()).toEqual("Heb.1.1")
		expect(p.parse("HBR 1:1").osis()).toEqual("Heb.1.1")
		expect(p.parse("HEB 1:1").osis()).toEqual("Heb.1.1")
		`
		true
describe "Localized book Jas (lt)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: Jas (lt)", ->
		`
		expect(p.parse("Jokubo laiskas 1:1").osis()).toEqual("Jas.1.1")
		expect(p.parse("Jokubo laiškas 1:1").osis()).toEqual("Jas.1.1")
		expect(p.parse("Jokūbo laiskas 1:1").osis()).toEqual("Jas.1.1")
		expect(p.parse("Jokūbo laiškas 1:1").osis()).toEqual("Jas.1.1")
		expect(p.parse("Jokubo 1:1").osis()).toEqual("Jas.1.1")
		expect(p.parse("Jokūbo 1:1").osis()).toEqual("Jas.1.1")
		expect(p.parse("Jas 1:1").osis()).toEqual("Jas.1.1")
		expect(p.parse("Jok 1:1").osis()).toEqual("Jas.1.1")
		p.include_apocrypha(false)
		expect(p.parse("JOKUBO LAISKAS 1:1").osis()).toEqual("Jas.1.1")
		expect(p.parse("JOKUBO LAIŠKAS 1:1").osis()).toEqual("Jas.1.1")
		expect(p.parse("JOKŪBO LAISKAS 1:1").osis()).toEqual("Jas.1.1")
		expect(p.parse("JOKŪBO LAIŠKAS 1:1").osis()).toEqual("Jas.1.1")
		expect(p.parse("JOKUBO 1:1").osis()).toEqual("Jas.1.1")
		expect(p.parse("JOKŪBO 1:1").osis()).toEqual("Jas.1.1")
		expect(p.parse("JAS 1:1").osis()).toEqual("Jas.1.1")
		expect(p.parse("JOK 1:1").osis()).toEqual("Jas.1.1")
		`
		true
describe "Localized book 2Pet (lt)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: 2Pet (lt)", ->
		`
		expect(p.parse("Petro antras laiskas 1:1").osis()).toEqual("2Pet.1.1")
		expect(p.parse("Petro antras laiškas 1:1").osis()).toEqual("2Pet.1.1")
		expect(p.parse("2 Petro 1:1").osis()).toEqual("2Pet.1.1")
		expect(p.parse("2 Pt 1:1").osis()).toEqual("2Pet.1.1")
		expect(p.parse("2Pet 1:1").osis()).toEqual("2Pet.1.1")
		p.include_apocrypha(false)
		expect(p.parse("PETRO ANTRAS LAISKAS 1:1").osis()).toEqual("2Pet.1.1")
		expect(p.parse("PETRO ANTRAS LAIŠKAS 1:1").osis()).toEqual("2Pet.1.1")
		expect(p.parse("2 PETRO 1:1").osis()).toEqual("2Pet.1.1")
		expect(p.parse("2 PT 1:1").osis()).toEqual("2Pet.1.1")
		expect(p.parse("2PET 1:1").osis()).toEqual("2Pet.1.1")
		`
		true
describe "Localized book 1Pet (lt)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: 1Pet (lt)", ->
		`
		expect(p.parse("Petro pirmas laiskas 1:1").osis()).toEqual("1Pet.1.1")
		expect(p.parse("Petro pirmas laiškas 1:1").osis()).toEqual("1Pet.1.1")
		expect(p.parse("1 Petro 1:1").osis()).toEqual("1Pet.1.1")
		expect(p.parse("1 Pt 1:1").osis()).toEqual("1Pet.1.1")
		expect(p.parse("1Pet 1:1").osis()).toEqual("1Pet.1.1")
		p.include_apocrypha(false)
		expect(p.parse("PETRO PIRMAS LAISKAS 1:1").osis()).toEqual("1Pet.1.1")
		expect(p.parse("PETRO PIRMAS LAIŠKAS 1:1").osis()).toEqual("1Pet.1.1")
		expect(p.parse("1 PETRO 1:1").osis()).toEqual("1Pet.1.1")
		expect(p.parse("1 PT 1:1").osis()).toEqual("1Pet.1.1")
		expect(p.parse("1PET 1:1").osis()).toEqual("1Pet.1.1")
		`
		true
describe "Localized book Jude (lt)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: Jude (lt)", ->
		`
		expect(p.parse("Judo laiskas 1:1").osis()).toEqual("Jude.1.1")
		expect(p.parse("Judo laiškas 1:1").osis()).toEqual("Jude.1.1")
		expect(p.parse("Jude 1:1").osis()).toEqual("Jude.1.1")
		expect(p.parse("Judo 1:1").osis()).toEqual("Jude.1.1")
		expect(p.parse("Jud 1:1").osis()).toEqual("Jude.1.1")
		p.include_apocrypha(false)
		expect(p.parse("JUDO LAISKAS 1:1").osis()).toEqual("Jude.1.1")
		expect(p.parse("JUDO LAIŠKAS 1:1").osis()).toEqual("Jude.1.1")
		expect(p.parse("JUDE 1:1").osis()).toEqual("Jude.1.1")
		expect(p.parse("JUDO 1:1").osis()).toEqual("Jude.1.1")
		expect(p.parse("JUD 1:1").osis()).toEqual("Jude.1.1")
		`
		true
describe "Localized book Tob (lt)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: Tob (lt)", ->
		`
		expect(p.parse("Tob 1:1").osis()).toEqual("Tob.1.1")
		`
		true
describe "Localized book Jdt (lt)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: Jdt (lt)", ->
		`
		expect(p.parse("Jdt 1:1").osis()).toEqual("Jdt.1.1")
		`
		true
describe "Localized book Bar (lt)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: Bar (lt)", ->
		`
		expect(p.parse("Bar 1:1").osis()).toEqual("Bar.1.1")
		`
		true
describe "Localized book Sus (lt)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: Sus (lt)", ->
		`
		expect(p.parse("Sus 1:1").osis()).toEqual("Sus.1.1")
		`
		true
describe "Localized book 2Macc (lt)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: 2Macc (lt)", ->
		`
		expect(p.parse("2Macc 1:1").osis()).toEqual("2Macc.1.1")
		`
		true
describe "Localized book 3Macc (lt)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: 3Macc (lt)", ->
		`
		expect(p.parse("3Macc 1:1").osis()).toEqual("3Macc.1.1")
		`
		true
describe "Localized book 4Macc (lt)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: 4Macc (lt)", ->
		`
		expect(p.parse("4Macc 1:1").osis()).toEqual("4Macc.1.1")
		`
		true
describe "Localized book 1Macc (lt)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: 1Macc (lt)", ->
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
		expect(p.languages).toEqual ["lt"]

	it "should handle ranges (lt)", ->
		expect(p.parse("Titus 1:1 iki 2").osis()).toEqual "Titus.1.1-Titus.1.2"
		expect(p.parse("Matt 1iki2").osis()).toEqual "Matt.1-Matt.2"
		expect(p.parse("Phlm 2 IKI 3").osis()).toEqual "Phlm.1.2-Phlm.1.3"
	it "should handle chapters (lt)", ->
		expect(p.parse("Titus 1:1, Skyrius 2").osis()).toEqual "Titus.1.1,Titus.2"
		expect(p.parse("Matt 3:4 SKYRIUS 6").osis()).toEqual "Matt.3.4,Matt.6"
	it "should handle verses (lt)", ->
		expect(p.parse("Exod 1:1 eilutė 3").osis()).toEqual "Exod.1.1,Exod.1.3"
		expect(p.parse("Phlm EILUTĖ 6").osis()).toEqual "Phlm.1.6"
		expect(p.parse("Exod 1:1 eilute 3").osis()).toEqual "Exod.1.1,Exod.1.3"
		expect(p.parse("Phlm EILUTE 6").osis()).toEqual "Phlm.1.6"
	it "should handle 'and' (lt)", ->
		expect(p.parse("Exod 1:1 Ir 3").osis()).toEqual "Exod.1.1,Exod.1.3"
		expect(p.parse("Phlm 2 IR 6").osis()).toEqual "Phlm.1.2,Phlm.1.6"
	it "should handle titles (lt)", ->
		expect(p.parse("Ps 3 title, 4:2, 5:title").osis()).toEqual "Ps.3.1,Ps.4.2,Ps.5.1"
		expect(p.parse("PS 3 TITLE, 4:2, 5:TITLE").osis()).toEqual "Ps.3.1,Ps.4.2,Ps.5.1"
	it "should handle 'ff' (lt)", ->
		expect(p.parse("Rev 3ff, 4:2ff").osis()).toEqual "Rev.3-Rev.22,Rev.4.2-Rev.4.11"
		expect(p.parse("REV 3 FF, 4:2 FF").osis()).toEqual "Rev.3-Rev.22,Rev.4.2-Rev.4.11"
	it "should handle translations (lt)", ->
		expect(p.parse("Lev 1 (lit)").osis_and_translations()).toEqual [["Lev.1", "lit"]]
		expect(p.parse("lev 1 lit").osis_and_translations()).toEqual [["Lev.1", "lit"]]
	it "should handle boundaries (lt)", ->
		p.set_options {book_alone_strategy: "full"}
		expect(p.parse("\u2014Matt\u2014").osis()).toEqual "Matt.1-Matt.28"
		expect(p.parse("\u201cMatt 1:1\u201d").osis()).toEqual "Matt.1.1"
