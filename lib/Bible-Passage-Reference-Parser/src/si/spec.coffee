bcv_parser = require("../../js/si_bcv_parser.js").bcv_parser

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

describe "Localized book Gen (si)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: Gen (si)", ->
		`
		expect(p.parse("උත්පත්ති 1:1").osis()).toEqual("Gen.1.1")
		expect(p.parse("Gen 1:1").osis()).toEqual("Gen.1.1")
		expect(p.parse("උත් 1:1").osis()).toEqual("Gen.1.1")
		p.include_apocrypha(false)
		expect(p.parse("උත්පත්ති 1:1").osis()).toEqual("Gen.1.1")
		expect(p.parse("GEN 1:1").osis()).toEqual("Gen.1.1")
		expect(p.parse("උත් 1:1").osis()).toEqual("Gen.1.1")
		`
		true
describe "Localized book Exod (si)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: Exod (si)", ->
		`
		expect(p.parse("නික්මයාම 1:1").osis()).toEqual("Exod.1.1")
		expect(p.parse("Exod 1:1").osis()).toEqual("Exod.1.1")
		expect(p.parse("නික් 1:1").osis()).toEqual("Exod.1.1")
		p.include_apocrypha(false)
		expect(p.parse("නික්මයාම 1:1").osis()).toEqual("Exod.1.1")
		expect(p.parse("EXOD 1:1").osis()).toEqual("Exod.1.1")
		expect(p.parse("නික් 1:1").osis()).toEqual("Exod.1.1")
		`
		true
describe "Localized book Bel (si)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: Bel (si)", ->
		`
		expect(p.parse("Bel 1:1").osis()).toEqual("Bel.1.1")
		`
		true
describe "Localized book Lev (si)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: Lev (si)", ->
		`
		expect(p.parse("ලෙවී කථාව 1:1").osis()).toEqual("Lev.1.1")
		expect(p.parse("ලෙවී 1:1").osis()).toEqual("Lev.1.1")
		expect(p.parse("Lev 1:1").osis()).toEqual("Lev.1.1")
		p.include_apocrypha(false)
		expect(p.parse("ලෙවී කථාව 1:1").osis()).toEqual("Lev.1.1")
		expect(p.parse("ලෙවී 1:1").osis()).toEqual("Lev.1.1")
		expect(p.parse("LEV 1:1").osis()).toEqual("Lev.1.1")
		`
		true
describe "Localized book Num (si)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: Num (si)", ->
		`
		expect(p.parse("ගණන් කථාව 1:1").osis()).toEqual("Num.1.1")
		expect(p.parse("ගණන් 1:1").osis()).toEqual("Num.1.1")
		expect(p.parse("Num 1:1").osis()).toEqual("Num.1.1")
		p.include_apocrypha(false)
		expect(p.parse("ගණන් කථාව 1:1").osis()).toEqual("Num.1.1")
		expect(p.parse("ගණන් 1:1").osis()).toEqual("Num.1.1")
		expect(p.parse("NUM 1:1").osis()).toEqual("Num.1.1")
		`
		true
describe "Localized book Sir (si)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: Sir (si)", ->
		`
		expect(p.parse("Sir 1:1").osis()).toEqual("Sir.1.1")
		`
		true
describe "Localized book Wis (si)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: Wis (si)", ->
		`
		expect(p.parse("Wis 1:1").osis()).toEqual("Wis.1.1")
		`
		true
describe "Localized book Lam (si)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: Lam (si)", ->
		`
		expect(p.parse("විලාප ගී 1:1").osis()).toEqual("Lam.1.1")
		expect(p.parse("විලා 1:1").osis()).toEqual("Lam.1.1")
		expect(p.parse("Lam 1:1").osis()).toEqual("Lam.1.1")
		p.include_apocrypha(false)
		expect(p.parse("විලාප ගී 1:1").osis()).toEqual("Lam.1.1")
		expect(p.parse("විලා 1:1").osis()).toEqual("Lam.1.1")
		expect(p.parse("LAM 1:1").osis()).toEqual("Lam.1.1")
		`
		true
describe "Localized book EpJer (si)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: EpJer (si)", ->
		`
		expect(p.parse("EpJer 1:1").osis()).toEqual("EpJer.1.1")
		`
		true
describe "Localized book Rev (si)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: Rev (si)", ->
		`
		expect(p.parse("එළිදරව් 1:1").osis()).toEqual("Rev.1.1")
		expect(p.parse("Rev 1:1").osis()).toEqual("Rev.1.1")
		expect(p.parse("එළි 1:1").osis()).toEqual("Rev.1.1")
		p.include_apocrypha(false)
		expect(p.parse("එළිදරව් 1:1").osis()).toEqual("Rev.1.1")
		expect(p.parse("REV 1:1").osis()).toEqual("Rev.1.1")
		expect(p.parse("එළි 1:1").osis()).toEqual("Rev.1.1")
		`
		true
describe "Localized book PrMan (si)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: PrMan (si)", ->
		`
		expect(p.parse("PrMan 1:1").osis()).toEqual("PrMan.1.1")
		`
		true
describe "Localized book Deut (si)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: Deut (si)", ->
		`
		expect(p.parse("ද්විතීය කථාව 1:1").osis()).toEqual("Deut.1.1")
		expect(p.parse("ද්වීතීය කථාව 1:1").osis()).toEqual("Deut.1.1")
		expect(p.parse("Deut 1:1").osis()).toEqual("Deut.1.1")
		expect(p.parse("ද්වි 1:1").osis()).toEqual("Deut.1.1")
		p.include_apocrypha(false)
		expect(p.parse("ද්විතීය කථාව 1:1").osis()).toEqual("Deut.1.1")
		expect(p.parse("ද්වීතීය කථාව 1:1").osis()).toEqual("Deut.1.1")
		expect(p.parse("DEUT 1:1").osis()).toEqual("Deut.1.1")
		expect(p.parse("ද්වි 1:1").osis()).toEqual("Deut.1.1")
		`
		true
describe "Localized book Josh (si)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: Josh (si)", ->
		`
		expect(p.parse("යෝෂුවා 1:1").osis()).toEqual("Josh.1.1")
		expect(p.parse("Josh 1:1").osis()).toEqual("Josh.1.1")
		expect(p.parse("යෝෂු 1:1").osis()).toEqual("Josh.1.1")
		p.include_apocrypha(false)
		expect(p.parse("යෝෂුවා 1:1").osis()).toEqual("Josh.1.1")
		expect(p.parse("JOSH 1:1").osis()).toEqual("Josh.1.1")
		expect(p.parse("යෝෂු 1:1").osis()).toEqual("Josh.1.1")
		`
		true
describe "Localized book Judg (si)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: Judg (si)", ->
		`
		expect(p.parse("විනිශ්චයකාරයන්ගේ පොත 1:1").osis()).toEqual("Judg.1.1")
		expect(p.parse("Judg 1:1").osis()).toEqual("Judg.1.1")
		expect(p.parse("විනි 1:1").osis()).toEqual("Judg.1.1")
		p.include_apocrypha(false)
		expect(p.parse("විනිශ්චයකාරයන්ගේ පොත 1:1").osis()).toEqual("Judg.1.1")
		expect(p.parse("JUDG 1:1").osis()).toEqual("Judg.1.1")
		expect(p.parse("විනි 1:1").osis()).toEqual("Judg.1.1")
		`
		true
describe "Localized book Ruth (si)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: Ruth (si)", ->
		`
		expect(p.parse("රූත්ගේ කථාව 1:1").osis()).toEqual("Ruth.1.1")
		expect(p.parse("Ruth 1:1").osis()).toEqual("Ruth.1.1")
		expect(p.parse("රූත් 1:1").osis()).toEqual("Ruth.1.1")
		p.include_apocrypha(false)
		expect(p.parse("රූත්ගේ කථාව 1:1").osis()).toEqual("Ruth.1.1")
		expect(p.parse("RUTH 1:1").osis()).toEqual("Ruth.1.1")
		expect(p.parse("රූත් 1:1").osis()).toEqual("Ruth.1.1")
		`
		true
describe "Localized book 1Esd (si)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: 1Esd (si)", ->
		`
		expect(p.parse("1Esd 1:1").osis()).toEqual("1Esd.1.1")
		`
		true
describe "Localized book 2Esd (si)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: 2Esd (si)", ->
		`
		expect(p.parse("2Esd 1:1").osis()).toEqual("2Esd.1.1")
		`
		true
describe "Localized book Isa (si)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: Isa (si)", ->
		`
		expect(p.parse("යෙසායා 1:1").osis()).toEqual("Isa.1.1")
		expect(p.parse("යෙසා 1:1").osis()).toEqual("Isa.1.1")
		expect(p.parse("Isa 1:1").osis()).toEqual("Isa.1.1")
		p.include_apocrypha(false)
		expect(p.parse("යෙසායා 1:1").osis()).toEqual("Isa.1.1")
		expect(p.parse("යෙසා 1:1").osis()).toEqual("Isa.1.1")
		expect(p.parse("ISA 1:1").osis()).toEqual("Isa.1.1")
		`
		true
describe "Localized book 2Sam (si)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: 2Sam (si)", ->
		`
		expect(p.parse("2 සාමුවෙල් 1:1").osis()).toEqual("2Sam.1.1")
		expect(p.parse("2සාමු 1:1").osis()).toEqual("2Sam.1.1")
		expect(p.parse("2Sam 1:1").osis()).toEqual("2Sam.1.1")
		p.include_apocrypha(false)
		expect(p.parse("2 සාමුවෙල් 1:1").osis()).toEqual("2Sam.1.1")
		expect(p.parse("2සාමු 1:1").osis()).toEqual("2Sam.1.1")
		expect(p.parse("2SAM 1:1").osis()).toEqual("2Sam.1.1")
		`
		true
describe "Localized book 1Sam (si)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: 1Sam (si)", ->
		`
		expect(p.parse("1 සාමුවෙල් 1:1").osis()).toEqual("1Sam.1.1")
		expect(p.parse("1සාමු 1:1").osis()).toEqual("1Sam.1.1")
		expect(p.parse("1Sam 1:1").osis()).toEqual("1Sam.1.1")
		p.include_apocrypha(false)
		expect(p.parse("1 සාමුවෙල් 1:1").osis()).toEqual("1Sam.1.1")
		expect(p.parse("1සාමු 1:1").osis()).toEqual("1Sam.1.1")
		expect(p.parse("1SAM 1:1").osis()).toEqual("1Sam.1.1")
		`
		true
describe "Localized book 2Kgs (si)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: 2Kgs (si)", ->
		`
		expect(p.parse("2 රාජාවලිය 1:1").osis()).toEqual("2Kgs.1.1")
		expect(p.parse("2රාජා 1:1").osis()).toEqual("2Kgs.1.1")
		expect(p.parse("2Kgs 1:1").osis()).toEqual("2Kgs.1.1")
		p.include_apocrypha(false)
		expect(p.parse("2 රාජාවලිය 1:1").osis()).toEqual("2Kgs.1.1")
		expect(p.parse("2රාජා 1:1").osis()).toEqual("2Kgs.1.1")
		expect(p.parse("2KGS 1:1").osis()).toEqual("2Kgs.1.1")
		`
		true
describe "Localized book 1Kgs (si)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: 1Kgs (si)", ->
		`
		expect(p.parse("1 රාජාවලිය 1:1").osis()).toEqual("1Kgs.1.1")
		expect(p.parse("1රාජා 1:1").osis()).toEqual("1Kgs.1.1")
		expect(p.parse("1Kgs 1:1").osis()).toEqual("1Kgs.1.1")
		p.include_apocrypha(false)
		expect(p.parse("1 රාජාවලිය 1:1").osis()).toEqual("1Kgs.1.1")
		expect(p.parse("1රාජා 1:1").osis()).toEqual("1Kgs.1.1")
		expect(p.parse("1KGS 1:1").osis()).toEqual("1Kgs.1.1")
		`
		true
describe "Localized book 2Chr (si)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: 2Chr (si)", ->
		`
		expect(p.parse("2 ලේකම් 1:1").osis()).toEqual("2Chr.1.1")
		expect(p.parse("2Chr 1:1").osis()).toEqual("2Chr.1.1")
		expect(p.parse("2ලේක 1:1").osis()).toEqual("2Chr.1.1")
		p.include_apocrypha(false)
		expect(p.parse("2 ලේකම් 1:1").osis()).toEqual("2Chr.1.1")
		expect(p.parse("2CHR 1:1").osis()).toEqual("2Chr.1.1")
		expect(p.parse("2ලේක 1:1").osis()).toEqual("2Chr.1.1")
		`
		true
describe "Localized book 1Chr (si)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: 1Chr (si)", ->
		`
		expect(p.parse("1 ලේකම් 1:1").osis()).toEqual("1Chr.1.1")
		expect(p.parse("1Chr 1:1").osis()).toEqual("1Chr.1.1")
		expect(p.parse("1ලේක 1:1").osis()).toEqual("1Chr.1.1")
		p.include_apocrypha(false)
		expect(p.parse("1 ලේකම් 1:1").osis()).toEqual("1Chr.1.1")
		expect(p.parse("1CHR 1:1").osis()).toEqual("1Chr.1.1")
		expect(p.parse("1ලේක 1:1").osis()).toEqual("1Chr.1.1")
		`
		true
describe "Localized book Ezra (si)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: Ezra (si)", ->
		`
		expect(p.parse("එස්රා 1:1").osis()).toEqual("Ezra.1.1")
		expect(p.parse("Ezra 1:1").osis()).toEqual("Ezra.1.1")
		p.include_apocrypha(false)
		expect(p.parse("එස්රා 1:1").osis()).toEqual("Ezra.1.1")
		expect(p.parse("EZRA 1:1").osis()).toEqual("Ezra.1.1")
		`
		true
describe "Localized book Neh (si)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: Neh (si)", ->
		`
		expect(p.parse("නෙහෙමියා 1:1").osis()).toEqual("Neh.1.1")
		expect(p.parse("නෙහෙ 1:1").osis()).toEqual("Neh.1.1")
		expect(p.parse("Neh 1:1").osis()).toEqual("Neh.1.1")
		p.include_apocrypha(false)
		expect(p.parse("නෙහෙමියා 1:1").osis()).toEqual("Neh.1.1")
		expect(p.parse("නෙහෙ 1:1").osis()).toEqual("Neh.1.1")
		expect(p.parse("NEH 1:1").osis()).toEqual("Neh.1.1")
		`
		true
describe "Localized book GkEsth (si)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: GkEsth (si)", ->
		`
		expect(p.parse("GkEsth 1:1").osis()).toEqual("GkEsth.1.1")
		`
		true
describe "Localized book Esth (si)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: Esth (si)", ->
		`
		expect(p.parse("එස්තර් 1:1").osis()).toEqual("Esth.1.1")
		expect(p.parse("Esth 1:1").osis()).toEqual("Esth.1.1")
		expect(p.parse("එස්ත 1:1").osis()).toEqual("Esth.1.1")
		p.include_apocrypha(false)
		expect(p.parse("එස්තර් 1:1").osis()).toEqual("Esth.1.1")
		expect(p.parse("ESTH 1:1").osis()).toEqual("Esth.1.1")
		expect(p.parse("එස්ත 1:1").osis()).toEqual("Esth.1.1")
		`
		true
describe "Localized book Job (si)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: Job (si)", ->
		`
		expect(p.parse("යෝබ් 1:1").osis()).toEqual("Job.1.1")
		expect(p.parse("Job 1:1").osis()).toEqual("Job.1.1")
		p.include_apocrypha(false)
		expect(p.parse("යෝබ් 1:1").osis()).toEqual("Job.1.1")
		expect(p.parse("JOB 1:1").osis()).toEqual("Job.1.1")
		`
		true
describe "Localized book Ps (si)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: Ps (si)", ->
		`
		expect(p.parse("ගීතාවලිය 1:1").osis()).toEqual("Ps.1.1")
		expect(p.parse("ගීතා 1:1").osis()).toEqual("Ps.1.1")
		expect(p.parse("Ps 1:1").osis()).toEqual("Ps.1.1")
		p.include_apocrypha(false)
		expect(p.parse("ගීතාවලිය 1:1").osis()).toEqual("Ps.1.1")
		expect(p.parse("ගීතා 1:1").osis()).toEqual("Ps.1.1")
		expect(p.parse("PS 1:1").osis()).toEqual("Ps.1.1")
		`
		true
describe "Localized book PrAzar (si)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: PrAzar (si)", ->
		`
		expect(p.parse("PrAzar 1:1").osis()).toEqual("PrAzar.1.1")
		`
		true
describe "Localized book Prov (si)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: Prov (si)", ->
		`
		expect(p.parse("හිතෝපදේශ 1:1").osis()).toEqual("Prov.1.1")
		expect(p.parse("Prov 1:1").osis()).toEqual("Prov.1.1")
		expect(p.parse("හිතෝ 1:1").osis()).toEqual("Prov.1.1")
		p.include_apocrypha(false)
		expect(p.parse("හිතෝපදේශ 1:1").osis()).toEqual("Prov.1.1")
		expect(p.parse("PROV 1:1").osis()).toEqual("Prov.1.1")
		expect(p.parse("හිතෝ 1:1").osis()).toEqual("Prov.1.1")
		`
		true
describe "Localized book Eccl (si)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: Eccl (si)", ->
		`
		expect(p.parse("දේශනාකාරයා 1:1").osis()).toEqual("Eccl.1.1")
		expect(p.parse("Eccl 1:1").osis()).toEqual("Eccl.1.1")
		expect(p.parse("දේශ 1:1").osis()).toEqual("Eccl.1.1")
		p.include_apocrypha(false)
		expect(p.parse("දේශනාකාරයා 1:1").osis()).toEqual("Eccl.1.1")
		expect(p.parse("ECCL 1:1").osis()).toEqual("Eccl.1.1")
		expect(p.parse("දේශ 1:1").osis()).toEqual("Eccl.1.1")
		`
		true
describe "Localized book SgThree (si)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: SgThree (si)", ->
		`
		expect(p.parse("SgThree 1:1").osis()).toEqual("SgThree.1.1")
		`
		true
describe "Localized book Song (si)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: Song (si)", ->
		`
		expect(p.parse("සාලමොන්ගේ ගීතිකා 1:1").osis()).toEqual("Song.1.1")
		expect(p.parse("Song 1:1").osis()).toEqual("Song.1.1")
		expect(p.parse("සල 1:1").osis()).toEqual("Song.1.1")
		p.include_apocrypha(false)
		expect(p.parse("සාලමොන්ගේ ගීතිකා 1:1").osis()).toEqual("Song.1.1")
		expect(p.parse("SONG 1:1").osis()).toEqual("Song.1.1")
		expect(p.parse("සල 1:1").osis()).toEqual("Song.1.1")
		`
		true
describe "Localized book Jer (si)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: Jer (si)", ->
		`
		expect(p.parse("යෙරෙමියා 1:1").osis()).toEqual("Jer.1.1")
		expect(p.parse("යෙරෙ 1:1").osis()).toEqual("Jer.1.1")
		expect(p.parse("Jer 1:1").osis()).toEqual("Jer.1.1")
		p.include_apocrypha(false)
		expect(p.parse("යෙරෙමියා 1:1").osis()).toEqual("Jer.1.1")
		expect(p.parse("යෙරෙ 1:1").osis()).toEqual("Jer.1.1")
		expect(p.parse("JER 1:1").osis()).toEqual("Jer.1.1")
		`
		true
describe "Localized book Ezek (si)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: Ezek (si)", ->
		`
		expect(p.parse("එසකියෙල් 1:1").osis()).toEqual("Ezek.1.1")
		expect(p.parse("Ezek 1:1").osis()).toEqual("Ezek.1.1")
		expect(p.parse("එස 1:1").osis()).toEqual("Ezek.1.1")
		p.include_apocrypha(false)
		expect(p.parse("එසකියෙල් 1:1").osis()).toEqual("Ezek.1.1")
		expect(p.parse("EZEK 1:1").osis()).toEqual("Ezek.1.1")
		expect(p.parse("එස 1:1").osis()).toEqual("Ezek.1.1")
		`
		true
describe "Localized book Dan (si)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: Dan (si)", ->
		`
		expect(p.parse("දානියෙල් 1:1").osis()).toEqual("Dan.1.1")
		expect(p.parse("දානි 1:1").osis()).toEqual("Dan.1.1")
		expect(p.parse("Dan 1:1").osis()).toEqual("Dan.1.1")
		p.include_apocrypha(false)
		expect(p.parse("දානියෙල් 1:1").osis()).toEqual("Dan.1.1")
		expect(p.parse("දානි 1:1").osis()).toEqual("Dan.1.1")
		expect(p.parse("DAN 1:1").osis()).toEqual("Dan.1.1")
		`
		true
describe "Localized book Hos (si)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: Hos (si)", ->
		`
		expect(p.parse("හොෂෙයා 1:1").osis()).toEqual("Hos.1.1")
		expect(p.parse("හොෂෙ 1:1").osis()).toEqual("Hos.1.1")
		expect(p.parse("Hos 1:1").osis()).toEqual("Hos.1.1")
		p.include_apocrypha(false)
		expect(p.parse("හොෂෙයා 1:1").osis()).toEqual("Hos.1.1")
		expect(p.parse("හොෂෙ 1:1").osis()).toEqual("Hos.1.1")
		expect(p.parse("HOS 1:1").osis()).toEqual("Hos.1.1")
		`
		true
describe "Localized book Joel (si)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: Joel (si)", ->
		`
		expect(p.parse("යෝවෙල් 1:1").osis()).toEqual("Joel.1.1")
		expect(p.parse("Joel 1:1").osis()).toEqual("Joel.1.1")
		expect(p.parse("යෝවෙ 1:1").osis()).toEqual("Joel.1.1")
		p.include_apocrypha(false)
		expect(p.parse("යෝවෙල් 1:1").osis()).toEqual("Joel.1.1")
		expect(p.parse("JOEL 1:1").osis()).toEqual("Joel.1.1")
		expect(p.parse("යෝවෙ 1:1").osis()).toEqual("Joel.1.1")
		`
		true
describe "Localized book Amos (si)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: Amos (si)", ->
		`
		expect(p.parse("ආමොස් 1:1").osis()).toEqual("Amos.1.1")
		expect(p.parse("Amos 1:1").osis()).toEqual("Amos.1.1")
		expect(p.parse("ආමො 1:1").osis()).toEqual("Amos.1.1")
		p.include_apocrypha(false)
		expect(p.parse("ආමොස් 1:1").osis()).toEqual("Amos.1.1")
		expect(p.parse("AMOS 1:1").osis()).toEqual("Amos.1.1")
		expect(p.parse("ආමො 1:1").osis()).toEqual("Amos.1.1")
		`
		true
describe "Localized book Obad (si)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: Obad (si)", ->
		`
		expect(p.parse("ඔබදියා 1:1").osis()).toEqual("Obad.1.1")
		expect(p.parse("Obad 1:1").osis()).toEqual("Obad.1.1")
		expect(p.parse("ඔබ 1:1").osis()).toEqual("Obad.1.1")
		p.include_apocrypha(false)
		expect(p.parse("ඔබදියා 1:1").osis()).toEqual("Obad.1.1")
		expect(p.parse("OBAD 1:1").osis()).toEqual("Obad.1.1")
		expect(p.parse("ඔබ 1:1").osis()).toEqual("Obad.1.1")
		`
		true
describe "Localized book Jonah (si)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: Jonah (si)", ->
		`
		expect(p.parse("Jonah 1:1").osis()).toEqual("Jonah.1.1")
		expect(p.parse("යෝනා 1:1").osis()).toEqual("Jonah.1.1")
		p.include_apocrypha(false)
		expect(p.parse("JONAH 1:1").osis()).toEqual("Jonah.1.1")
		expect(p.parse("යෝනා 1:1").osis()).toEqual("Jonah.1.1")
		`
		true
describe "Localized book Mic (si)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: Mic (si)", ->
		`
		expect(p.parse("මීකා 1:1").osis()).toEqual("Mic.1.1")
		expect(p.parse("Mic 1:1").osis()).toEqual("Mic.1.1")
		p.include_apocrypha(false)
		expect(p.parse("මීකා 1:1").osis()).toEqual("Mic.1.1")
		expect(p.parse("MIC 1:1").osis()).toEqual("Mic.1.1")
		`
		true
describe "Localized book Nah (si)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: Nah (si)", ->
		`
		expect(p.parse("නාහුම් 1:1").osis()).toEqual("Nah.1.1")
		expect(p.parse("නාහු 1:1").osis()).toEqual("Nah.1.1")
		expect(p.parse("Nah 1:1").osis()).toEqual("Nah.1.1")
		p.include_apocrypha(false)
		expect(p.parse("නාහුම් 1:1").osis()).toEqual("Nah.1.1")
		expect(p.parse("නාහු 1:1").osis()).toEqual("Nah.1.1")
		expect(p.parse("NAH 1:1").osis()).toEqual("Nah.1.1")
		`
		true
describe "Localized book Hab (si)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: Hab (si)", ->
		`
		expect(p.parse("හබක්කුක් 1:1").osis()).toEqual("Hab.1.1")
		expect(p.parse("Hab 1:1").osis()).toEqual("Hab.1.1")
		expect(p.parse("හබ 1:1").osis()).toEqual("Hab.1.1")
		p.include_apocrypha(false)
		expect(p.parse("හබක්කුක් 1:1").osis()).toEqual("Hab.1.1")
		expect(p.parse("HAB 1:1").osis()).toEqual("Hab.1.1")
		expect(p.parse("හබ 1:1").osis()).toEqual("Hab.1.1")
		`
		true
describe "Localized book Zeph (si)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: Zeph (si)", ->
		`
		expect(p.parse("ශෙපනියා 1:1").osis()).toEqual("Zeph.1.1")
		expect(p.parse("Zeph 1:1").osis()).toEqual("Zeph.1.1")
		expect(p.parse("ශෙප 1:1").osis()).toEqual("Zeph.1.1")
		p.include_apocrypha(false)
		expect(p.parse("ශෙපනියා 1:1").osis()).toEqual("Zeph.1.1")
		expect(p.parse("ZEPH 1:1").osis()).toEqual("Zeph.1.1")
		expect(p.parse("ශෙප 1:1").osis()).toEqual("Zeph.1.1")
		`
		true
describe "Localized book Hag (si)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: Hag (si)", ->
		`
		expect(p.parse("හග්ගයි 1:1").osis()).toEqual("Hag.1.1")
		expect(p.parse("Hag 1:1").osis()).toEqual("Hag.1.1")
		expect(p.parse("හග් 1:1").osis()).toEqual("Hag.1.1")
		p.include_apocrypha(false)
		expect(p.parse("හග්ගයි 1:1").osis()).toEqual("Hag.1.1")
		expect(p.parse("HAG 1:1").osis()).toEqual("Hag.1.1")
		expect(p.parse("හග් 1:1").osis()).toEqual("Hag.1.1")
		`
		true
describe "Localized book Zech (si)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: Zech (si)", ->
		`
		expect(p.parse("සෙකරියා 1:1").osis()).toEqual("Zech.1.1")
		expect(p.parse("Zech 1:1").osis()).toEqual("Zech.1.1")
		expect(p.parse("සෙක 1:1").osis()).toEqual("Zech.1.1")
		p.include_apocrypha(false)
		expect(p.parse("සෙකරියා 1:1").osis()).toEqual("Zech.1.1")
		expect(p.parse("ZECH 1:1").osis()).toEqual("Zech.1.1")
		expect(p.parse("සෙක 1:1").osis()).toEqual("Zech.1.1")
		`
		true
describe "Localized book Mal (si)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: Mal (si)", ->
		`
		expect(p.parse("මලාකි 1:1").osis()).toEqual("Mal.1.1")
		expect(p.parse("Mal 1:1").osis()).toEqual("Mal.1.1")
		expect(p.parse("මලා 1:1").osis()).toEqual("Mal.1.1")
		p.include_apocrypha(false)
		expect(p.parse("මලාකි 1:1").osis()).toEqual("Mal.1.1")
		expect(p.parse("MAL 1:1").osis()).toEqual("Mal.1.1")
		expect(p.parse("මලා 1:1").osis()).toEqual("Mal.1.1")
		`
		true
describe "Localized book Matt (si)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: Matt (si)", ->
		`
		expect(p.parse("ශු මතෙව් 1:1").osis()).toEqual("Matt.1.1")
		expect(p.parse("මතෙව් 1:1").osis()).toEqual("Matt.1.1")
		expect(p.parse("Matt 1:1").osis()).toEqual("Matt.1.1")
		expect(p.parse("මතෙ 1:1").osis()).toEqual("Matt.1.1")
		p.include_apocrypha(false)
		expect(p.parse("ශු මතෙව් 1:1").osis()).toEqual("Matt.1.1")
		expect(p.parse("මතෙව් 1:1").osis()).toEqual("Matt.1.1")
		expect(p.parse("MATT 1:1").osis()).toEqual("Matt.1.1")
		expect(p.parse("මතෙ 1:1").osis()).toEqual("Matt.1.1")
		`
		true
describe "Localized book Mark (si)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: Mark (si)", ->
		`
		expect(p.parse("ශු මාර්ක් 1:1").osis()).toEqual("Mark.1.1")
		expect(p.parse("මාර්ක් 1:1").osis()).toEqual("Mark.1.1")
		expect(p.parse("Mark 1:1").osis()).toEqual("Mark.1.1")
		expect(p.parse("මාක් 1:1").osis()).toEqual("Mark.1.1")
		p.include_apocrypha(false)
		expect(p.parse("ශු මාර්ක් 1:1").osis()).toEqual("Mark.1.1")
		expect(p.parse("මාර්ක් 1:1").osis()).toEqual("Mark.1.1")
		expect(p.parse("MARK 1:1").osis()).toEqual("Mark.1.1")
		expect(p.parse("මාක් 1:1").osis()).toEqual("Mark.1.1")
		`
		true
describe "Localized book Luke (si)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: Luke (si)", ->
		`
		expect(p.parse("ශු ලූක් 1:1").osis()).toEqual("Luke.1.1")
		expect(p.parse("Luke 1:1").osis()).toEqual("Luke.1.1")
		expect(p.parse("ලූක් 1:1").osis()).toEqual("Luke.1.1")
		p.include_apocrypha(false)
		expect(p.parse("ශු ලූක් 1:1").osis()).toEqual("Luke.1.1")
		expect(p.parse("LUKE 1:1").osis()).toEqual("Luke.1.1")
		expect(p.parse("ලූක් 1:1").osis()).toEqual("Luke.1.1")
		`
		true
describe "Localized book 1John (si)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: 1John (si)", ->
		`
		expect(p.parse("1 යොහන් 1:1").osis()).toEqual("1John.1.1")
		expect(p.parse("1John 1:1").osis()).toEqual("1John.1.1")
		expect(p.parse("1යොහ 1:1").osis()).toEqual("1John.1.1")
		p.include_apocrypha(false)
		expect(p.parse("1 යොහන් 1:1").osis()).toEqual("1John.1.1")
		expect(p.parse("1JOHN 1:1").osis()).toEqual("1John.1.1")
		expect(p.parse("1යොහ 1:1").osis()).toEqual("1John.1.1")
		`
		true
describe "Localized book 2John (si)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: 2John (si)", ->
		`
		expect(p.parse("2 යොහන් 1:1").osis()).toEqual("2John.1.1")
		expect(p.parse("2John 1:1").osis()).toEqual("2John.1.1")
		expect(p.parse("2යොහ 1:1").osis()).toEqual("2John.1.1")
		p.include_apocrypha(false)
		expect(p.parse("2 යොහන් 1:1").osis()).toEqual("2John.1.1")
		expect(p.parse("2JOHN 1:1").osis()).toEqual("2John.1.1")
		expect(p.parse("2යොහ 1:1").osis()).toEqual("2John.1.1")
		`
		true
describe "Localized book 3John (si)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: 3John (si)", ->
		`
		expect(p.parse("3 යොහන් 1:1").osis()).toEqual("3John.1.1")
		expect(p.parse("3John 1:1").osis()).toEqual("3John.1.1")
		expect(p.parse("3යොහ 1:1").osis()).toEqual("3John.1.1")
		p.include_apocrypha(false)
		expect(p.parse("3 යොහන් 1:1").osis()).toEqual("3John.1.1")
		expect(p.parse("3JOHN 1:1").osis()).toEqual("3John.1.1")
		expect(p.parse("3යොහ 1:1").osis()).toEqual("3John.1.1")
		`
		true
describe "Localized book John (si)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: John (si)", ->
		`
		expect(p.parse("ශු යොහන් 1:1").osis()).toEqual("John.1.1")
		expect(p.parse("යොහන් 1:1").osis()).toEqual("John.1.1")
		expect(p.parse("John 1:1").osis()).toEqual("John.1.1")
		expect(p.parse("යොහ 1:1").osis()).toEqual("John.1.1")
		p.include_apocrypha(false)
		expect(p.parse("ශු යොහන් 1:1").osis()).toEqual("John.1.1")
		expect(p.parse("යොහන් 1:1").osis()).toEqual("John.1.1")
		expect(p.parse("JOHN 1:1").osis()).toEqual("John.1.1")
		expect(p.parse("යොහ 1:1").osis()).toEqual("John.1.1")
		`
		true
describe "Localized book Acts (si)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: Acts (si)", ->
		`
		expect(p.parse("ක්‍රියා 1:1").osis()).toEqual("Acts.1.1")
		expect(p.parse("ක්රියා 1:1").osis()).toEqual("Acts.1.1")
		expect(p.parse("Acts 1:1").osis()).toEqual("Acts.1.1")
		p.include_apocrypha(false)
		expect(p.parse("ක්‍රියා 1:1").osis()).toEqual("Acts.1.1")
		expect(p.parse("ක්රියා 1:1").osis()).toEqual("Acts.1.1")
		expect(p.parse("ACTS 1:1").osis()).toEqual("Acts.1.1")
		`
		true
describe "Localized book Rom (si)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: Rom (si)", ->
		`
		expect(p.parse("Rom 1:1").osis()).toEqual("Rom.1.1")
		expect(p.parse("රෝම 1:1").osis()).toEqual("Rom.1.1")
		p.include_apocrypha(false)
		expect(p.parse("ROM 1:1").osis()).toEqual("Rom.1.1")
		expect(p.parse("රෝම 1:1").osis()).toEqual("Rom.1.1")
		`
		true
describe "Localized book 2Cor (si)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: 2Cor (si)", ->
		`
		expect(p.parse("2 කොරින්ති 1:1").osis()).toEqual("2Cor.1.1")
		expect(p.parse("2කොරි 1:1").osis()).toEqual("2Cor.1.1")
		expect(p.parse("2Cor 1:1").osis()).toEqual("2Cor.1.1")
		p.include_apocrypha(false)
		expect(p.parse("2 කොරින්ති 1:1").osis()).toEqual("2Cor.1.1")
		expect(p.parse("2කොරි 1:1").osis()).toEqual("2Cor.1.1")
		expect(p.parse("2COR 1:1").osis()).toEqual("2Cor.1.1")
		`
		true
describe "Localized book 1Cor (si)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: 1Cor (si)", ->
		`
		expect(p.parse("1 කොරින්ති 1:1").osis()).toEqual("1Cor.1.1")
		expect(p.parse("1කොරි 1:1").osis()).toEqual("1Cor.1.1")
		expect(p.parse("1Cor 1:1").osis()).toEqual("1Cor.1.1")
		p.include_apocrypha(false)
		expect(p.parse("1 කොරින්ති 1:1").osis()).toEqual("1Cor.1.1")
		expect(p.parse("1කොරි 1:1").osis()).toEqual("1Cor.1.1")
		expect(p.parse("1COR 1:1").osis()).toEqual("1Cor.1.1")
		`
		true
describe "Localized book Gal (si)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: Gal (si)", ->
		`
		expect(p.parse("ගලාති 1:1").osis()).toEqual("Gal.1.1")
		expect(p.parse("Gal 1:1").osis()).toEqual("Gal.1.1")
		expect(p.parse("ගලා 1:1").osis()).toEqual("Gal.1.1")
		p.include_apocrypha(false)
		expect(p.parse("ගලාති 1:1").osis()).toEqual("Gal.1.1")
		expect(p.parse("GAL 1:1").osis()).toEqual("Gal.1.1")
		expect(p.parse("ගලා 1:1").osis()).toEqual("Gal.1.1")
		`
		true
describe "Localized book Eph (si)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: Eph (si)", ->
		`
		expect(p.parse("එපීස 1:1").osis()).toEqual("Eph.1.1")
		expect(p.parse("Eph 1:1").osis()).toEqual("Eph.1.1")
		expect(p.parse("එපි 1:1").osis()).toEqual("Eph.1.1")
		p.include_apocrypha(false)
		expect(p.parse("එපීස 1:1").osis()).toEqual("Eph.1.1")
		expect(p.parse("EPH 1:1").osis()).toEqual("Eph.1.1")
		expect(p.parse("එපි 1:1").osis()).toEqual("Eph.1.1")
		`
		true
describe "Localized book Phil (si)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: Phil (si)", ->
		`
		expect(p.parse("පිලිප්පි 1:1").osis()).toEqual("Phil.1.1")
		expect(p.parse("Phil 1:1").osis()).toEqual("Phil.1.1")
		expect(p.parse("පිලි 1:1").osis()).toEqual("Phil.1.1")
		p.include_apocrypha(false)
		expect(p.parse("පිලිප්පි 1:1").osis()).toEqual("Phil.1.1")
		expect(p.parse("PHIL 1:1").osis()).toEqual("Phil.1.1")
		expect(p.parse("පිලි 1:1").osis()).toEqual("Phil.1.1")
		`
		true
describe "Localized book Col (si)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: Col (si)", ->
		`
		expect(p.parse("කොලොස්සි 1:1").osis()).toEqual("Col.1.1")
		expect(p.parse("කොලො 1:1").osis()).toEqual("Col.1.1")
		expect(p.parse("Col 1:1").osis()).toEqual("Col.1.1")
		p.include_apocrypha(false)
		expect(p.parse("කොලොස්සි 1:1").osis()).toEqual("Col.1.1")
		expect(p.parse("කොලො 1:1").osis()).toEqual("Col.1.1")
		expect(p.parse("COL 1:1").osis()).toEqual("Col.1.1")
		`
		true
describe "Localized book 2Thess (si)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: 2Thess (si)", ->
		`
		expect(p.parse("2 තෙසලෝනික 1:1").osis()).toEqual("2Thess.1.1")
		expect(p.parse("2Thess 1:1").osis()).toEqual("2Thess.1.1")
		expect(p.parse("2තෙස 1:1").osis()).toEqual("2Thess.1.1")
		p.include_apocrypha(false)
		expect(p.parse("2 තෙසලෝනික 1:1").osis()).toEqual("2Thess.1.1")
		expect(p.parse("2THESS 1:1").osis()).toEqual("2Thess.1.1")
		expect(p.parse("2තෙස 1:1").osis()).toEqual("2Thess.1.1")
		`
		true
describe "Localized book 1Thess (si)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: 1Thess (si)", ->
		`
		expect(p.parse("1 තෙසලෝනික 1:1").osis()).toEqual("1Thess.1.1")
		expect(p.parse("1Thess 1:1").osis()).toEqual("1Thess.1.1")
		expect(p.parse("1තෙස 1:1").osis()).toEqual("1Thess.1.1")
		p.include_apocrypha(false)
		expect(p.parse("1 තෙසලෝනික 1:1").osis()).toEqual("1Thess.1.1")
		expect(p.parse("1THESS 1:1").osis()).toEqual("1Thess.1.1")
		expect(p.parse("1තෙස 1:1").osis()).toEqual("1Thess.1.1")
		`
		true
describe "Localized book 2Tim (si)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: 2Tim (si)", ->
		`
		expect(p.parse("2 තිමෝති 1:1").osis()).toEqual("2Tim.1.1")
		expect(p.parse("2තිමෝ 1:1").osis()).toEqual("2Tim.1.1")
		expect(p.parse("2Tim 1:1").osis()).toEqual("2Tim.1.1")
		p.include_apocrypha(false)
		expect(p.parse("2 තිමෝති 1:1").osis()).toEqual("2Tim.1.1")
		expect(p.parse("2තිමෝ 1:1").osis()).toEqual("2Tim.1.1")
		expect(p.parse("2TIM 1:1").osis()).toEqual("2Tim.1.1")
		`
		true
describe "Localized book 1Tim (si)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: 1Tim (si)", ->
		`
		expect(p.parse("1 තිමෝති 1:1").osis()).toEqual("1Tim.1.1")
		expect(p.parse("1තිමෝ 1:1").osis()).toEqual("1Tim.1.1")
		expect(p.parse("1Tim 1:1").osis()).toEqual("1Tim.1.1")
		p.include_apocrypha(false)
		expect(p.parse("1 තිමෝති 1:1").osis()).toEqual("1Tim.1.1")
		expect(p.parse("1තිමෝ 1:1").osis()).toEqual("1Tim.1.1")
		expect(p.parse("1TIM 1:1").osis()).toEqual("1Tim.1.1")
		`
		true
describe "Localized book Titus (si)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: Titus (si)", ->
		`
		expect(p.parse("Titus 1:1").osis()).toEqual("Titus.1.1")
		expect(p.parse("තීතස් 1:1").osis()).toEqual("Titus.1.1")
		expect(p.parse("තීත 1:1").osis()).toEqual("Titus.1.1")
		p.include_apocrypha(false)
		expect(p.parse("TITUS 1:1").osis()).toEqual("Titus.1.1")
		expect(p.parse("තීතස් 1:1").osis()).toEqual("Titus.1.1")
		expect(p.parse("තීත 1:1").osis()).toEqual("Titus.1.1")
		`
		true
describe "Localized book Phlm (si)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: Phlm (si)", ->
		`
		expect(p.parse("පිලෙමොන් 1:1").osis()).toEqual("Phlm.1.1")
		expect(p.parse("Phlm 1:1").osis()).toEqual("Phlm.1.1")
		expect(p.parse("පිලෙ 1:1").osis()).toEqual("Phlm.1.1")
		p.include_apocrypha(false)
		expect(p.parse("පිලෙමොන් 1:1").osis()).toEqual("Phlm.1.1")
		expect(p.parse("PHLM 1:1").osis()).toEqual("Phlm.1.1")
		expect(p.parse("පිලෙ 1:1").osis()).toEqual("Phlm.1.1")
		`
		true
describe "Localized book Heb (si)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: Heb (si)", ->
		`
		expect(p.parse("හෙබ්‍රෙව් 1:1").osis()).toEqual("Heb.1.1")
		expect(p.parse("හෙබ්‍රෙ 1:1").osis()).toEqual("Heb.1.1")
		expect(p.parse("Heb 1:1").osis()).toEqual("Heb.1.1")
		p.include_apocrypha(false)
		expect(p.parse("හෙබ්‍රෙව් 1:1").osis()).toEqual("Heb.1.1")
		expect(p.parse("හෙබ්‍රෙ 1:1").osis()).toEqual("Heb.1.1")
		expect(p.parse("HEB 1:1").osis()).toEqual("Heb.1.1")
		`
		true
describe "Localized book Jas (si)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: Jas (si)", ->
		`
		expect(p.parse("යාකොබ් 1:1").osis()).toEqual("Jas.1.1")
		expect(p.parse("යාකො 1:1").osis()).toEqual("Jas.1.1")
		expect(p.parse("Jas 1:1").osis()).toEqual("Jas.1.1")
		p.include_apocrypha(false)
		expect(p.parse("යාකොබ් 1:1").osis()).toEqual("Jas.1.1")
		expect(p.parse("යාකො 1:1").osis()).toEqual("Jas.1.1")
		expect(p.parse("JAS 1:1").osis()).toEqual("Jas.1.1")
		`
		true
describe "Localized book 2Pet (si)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: 2Pet (si)", ->
		`
		expect(p.parse("2 පේතෘස් 1:1").osis()).toEqual("2Pet.1.1")
		expect(p.parse("2පේතෘ 1:1").osis()).toEqual("2Pet.1.1")
		expect(p.parse("2Pet 1:1").osis()).toEqual("2Pet.1.1")
		p.include_apocrypha(false)
		expect(p.parse("2 පේතෘස් 1:1").osis()).toEqual("2Pet.1.1")
		expect(p.parse("2පේතෘ 1:1").osis()).toEqual("2Pet.1.1")
		expect(p.parse("2PET 1:1").osis()).toEqual("2Pet.1.1")
		`
		true
describe "Localized book 1Pet (si)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: 1Pet (si)", ->
		`
		expect(p.parse("1 පේතෘස් 1:1").osis()).toEqual("1Pet.1.1")
		expect(p.parse("1පේතෘ 1:1").osis()).toEqual("1Pet.1.1")
		expect(p.parse("1Pet 1:1").osis()).toEqual("1Pet.1.1")
		p.include_apocrypha(false)
		expect(p.parse("1 පේතෘස් 1:1").osis()).toEqual("1Pet.1.1")
		expect(p.parse("1පේතෘ 1:1").osis()).toEqual("1Pet.1.1")
		expect(p.parse("1PET 1:1").osis()).toEqual("1Pet.1.1")
		`
		true
describe "Localized book Jude (si)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: Jude (si)", ->
		`
		expect(p.parse("යූදස් (යූද්) 1:1").osis()).toEqual("Jude.1.1")
		expect(p.parse("Jude 1:1").osis()).toEqual("Jude.1.1")
		expect(p.parse("යූද් 1:1").osis()).toEqual("Jude.1.1")
		p.include_apocrypha(false)
		expect(p.parse("යූදස් (යූද්) 1:1").osis()).toEqual("Jude.1.1")
		expect(p.parse("JUDE 1:1").osis()).toEqual("Jude.1.1")
		expect(p.parse("යූද් 1:1").osis()).toEqual("Jude.1.1")
		`
		true
describe "Localized book Tob (si)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: Tob (si)", ->
		`
		expect(p.parse("Tob 1:1").osis()).toEqual("Tob.1.1")
		`
		true
describe "Localized book Jdt (si)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: Jdt (si)", ->
		`
		expect(p.parse("Jdt 1:1").osis()).toEqual("Jdt.1.1")
		`
		true
describe "Localized book Bar (si)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: Bar (si)", ->
		`
		expect(p.parse("Bar 1:1").osis()).toEqual("Bar.1.1")
		`
		true
describe "Localized book Sus (si)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: Sus (si)", ->
		`
		expect(p.parse("Sus 1:1").osis()).toEqual("Sus.1.1")
		`
		true
describe "Localized book 2Macc (si)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: 2Macc (si)", ->
		`
		expect(p.parse("2Macc 1:1").osis()).toEqual("2Macc.1.1")
		`
		true
describe "Localized book 3Macc (si)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: 3Macc (si)", ->
		`
		expect(p.parse("3Macc 1:1").osis()).toEqual("3Macc.1.1")
		`
		true
describe "Localized book 4Macc (si)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: 4Macc (si)", ->
		`
		expect(p.parse("4Macc 1:1").osis()).toEqual("4Macc.1.1")
		`
		true
describe "Localized book 1Macc (si)", ->
	p = {}
	beforeEach ->
		p = new bcv_parser
		p.set_options book_alone_strategy: "ignore",book_sequence_strategy: "ignore",osis_compaction_strategy: "bc",captive_end_digits_strategy: "delete"
		p.include_apocrypha true
	it "should handle book: 1Macc (si)", ->
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
		expect(p.languages).toEqual ["si"]

	it "should handle ranges (si)", ->
		expect(p.parse("Titus 1:1 to 2").osis()).toEqual "Titus.1.1-Titus.1.2"
		expect(p.parse("Matt 1to2").osis()).toEqual "Matt.1-Matt.2"
		expect(p.parse("Phlm 2 TO 3").osis()).toEqual "Phlm.1.2-Phlm.1.3"
	it "should handle chapters (si)", ->
		expect(p.parse("Titus 1:1, පරිච්ඡේදය 2").osis()).toEqual "Titus.1.1,Titus.2"
		expect(p.parse("Matt 3:4 පරිච්ඡේදය 6").osis()).toEqual "Matt.3.4,Matt.6"
	it "should handle verses (si)", ->
		expect(p.parse("Exod 1:1 පදය 3").osis()).toEqual "Exod.1.1,Exod.1.3"
		expect(p.parse("Phlm පදය 6").osis()).toEqual "Phlm.1.6"
	it "should handle 'and' (si)", ->
		expect(p.parse("Exod 1:1 සහ 3").osis()).toEqual "Exod.1.1,Exod.1.3"
		expect(p.parse("Phlm 2 සහ 6").osis()).toEqual "Phlm.1.2,Phlm.1.6"
	it "should handle titles (si)", ->
		expect(p.parse("Ps 3 title, 4:2, 5:title").osis()).toEqual "Ps.3.1,Ps.4.2,Ps.5.1"
		expect(p.parse("PS 3 TITLE, 4:2, 5:TITLE").osis()).toEqual "Ps.3.1,Ps.4.2,Ps.5.1"
	it "should handle 'ff' (si)", ->
		expect(p.parse("Rev 3ff, 4:2ff").osis()).toEqual "Rev.3-Rev.22,Rev.4.2-Rev.4.11"
		expect(p.parse("REV 3 FF, 4:2 FF").osis()).toEqual "Rev.3-Rev.22,Rev.4.2-Rev.4.11"
	it "should handle translations (si)", ->
		expect(p.parse("Lev 1 (srov)").osis_and_translations()).toEqual [["Lev.1", "srov"]]
		expect(p.parse("lev 1 srov").osis_and_translations()).toEqual [["Lev.1", "srov"]]
	it "should handle boundaries (si)", ->
		p.set_options {book_alone_strategy: "full"}
		expect(p.parse("\u2014Matt\u2014").osis()).toEqual "Matt.1-Matt.28"
		expect(p.parse("\u201cMatt 1:1\u201d").osis()).toEqual "Matt.1.1"
