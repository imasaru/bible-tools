bcv_parser::regexps.space = "[\\s\\xa0]"
bcv_parser::regexps.escaped_passage = ///
	(?:^ | [^\x1f\x1e\dA-Za-zªµºÀ-ÖØ-öø-ɏက-ဪိ-ူဲ-့္-်ွ-ဿၐ-ၕၘ-ၡၥ-ၦၮ-ႂႅ-ႆႍ-ႎႝḀ-ỿⱠ-ⱿꜢ-ꞈꞋ-ꞎꞐ-ꞓꞠ-Ɦꟸ-ꟿꩠ-ꩶꩺ] )	# Beginning of string or not in the middle of a word or immediately following another book. Only count a book if it's part of a sequence: `Matt5John3` is OK, but not `1Matt5John3`
		(
			# Start inverted book/chapter (cb)
			(?:
				  (?: ch (?: apters? | a?pts?\.? | a?p?s?\.? )? \s*
					\d+ \s* (?: [\u2013\u2014\-] | through | thru | to) \s* \d+ \s*
					(?: from | of | in ) (?: \s+ the \s+ book \s+ of )?\s* )
				| (?: ch (?: apters? | a?pts?\.? | a?p?s?\.? )? \s*
					\d+ \s*
					(?: from | of | in ) (?: \s+ the \s+ book \s+ of )?\s* )
				| (?: \d+ (?: th | nd | st ) \s*
					ch (?: apter | a?pt\.? | a?p?\.? )? \s* #no plurals here since it's a single chapter
					(?: from | of | in ) (?: \s+ the \s+ book \s+ of )? \s* )
			)? # End inverted book/chapter (cb)
			\x1f(\d+)(?:/\d+)?\x1f		#book
				(?:
				    /\d+\x1f				#special Psalm chapters
				  | [\d\s\xa0.:,;\x1e\x1f&\(\)\uff08\uff09\[\]/"'\*=~\-\u2013\u2014]
				  | kar (?! [a-z] )		#could be followed by a number
				  | တၢ်မၤလိ | and | အဆၢ | ff | - | း
				  | [ကခ] (?! \w )			#a-e allows 1:1a
				  | $						#or the end of the string
				 )+
		)
	///gi
# These are the only valid ways to end a potential passage match. The closing parenthesis allows for fully capturing parentheses surrounding translations (ESV**)**. The last one, `[\d\x1f]` needs not to be +; otherwise `Gen5ff` becomes `\x1f0\x1f5ff`, and `adjust_regexp_end` matches the `\x1f5` and incorrectly dangles the ff.
bcv_parser::regexps.match_end_split = ///
	  \d \W* kar
	| \d \W* ff (?: [\s\xa0*]* \.)?
	| \d [\s\xa0*]* [ကခ] (?! \w )
	| \x1e (?: [\s\xa0*]* [)\]\uff09] )? #ff09 is a full-width closing parenthesis
	| [\d\x1f]
	///gi
bcv_parser::regexps.control = /[\x1e\x1f]/g
bcv_parser::regexps.pre_book = "[^A-Za-zªµºÀ-ÖØ-öø-ɏက-ဪိ-ူဲ-့္-်ွ-ဿၐ-ၕၘ-ၡၥ-ၦၮ-ႂႅ-ႆႍ-ႎႝḀ-ỿⱠ-ⱿꜢ-ꞈꞋ-ꞎꞐ-ꞓꞠ-Ɦꟸ-ꟿꩠ-ꩶꩺ]"

bcv_parser::regexps.first = "(?:1|[၁1])\\.?#{bcv_parser::regexps.space}*"
bcv_parser::regexps.second = "(?:2|[၂2])\\.?#{bcv_parser::regexps.space}*"
bcv_parser::regexps.third = "(?:3|[၃3])\\.?#{bcv_parser::regexps.space}*"
bcv_parser::regexps.range_and = "(?:[&\u2013\u2014-]|and|-)"
bcv_parser::regexps.range_only = "(?:[\u2013\u2014-]|-)"
# Each book regexp should return two parenthesized objects: an optional preliminary character and the book itself.
bcv_parser::regexps.get_books = (include_apocrypha, case_sensitive) ->
	books = [
		osis: ["Ps"]
		apocrypha: true
		extra: "2"
		regexp: ///(\b)( # Don't match a preceding \d like usual because we only want to match a valid OSIS, which will never have a preceding digit.
			Ps151
			# Always follwed by ".1"; the regular Psalms parser can handle `Ps151` on its own.
			)(?=\.1)///g # Case-sensitive because we only want to match a valid OSIS.
	,
		osis: ["Gen"]
		regexp: ///(^|[^0-9A-Za-zªµºÀ-ÖØ-öø-ɏက-ဪိ-ူဲ-့္-်ွ-ဿၐ-ၕၘ-ၡၥ-ၦၮ-ႂႅ-ႆႍ-ႎႝḀ-ỿⱠ-ⱿꜢ-ꞈꞋ-ꞎꞐ-ꞓꞠ-Ɦꟸ-ꟿꩠ-ꩶꩺ])(
		(?:လံ(?:ၥ်စီၤမိၤၡ့အခီၣ်ထံးတဘ့ၣ်|ာ်တၢ်ကဲထီၣ်အခီၣ်ထံး)|1(?:\.[\s\xa0]*?|[\s\xa0]*)?မိၤၡ့|၁[\s\xa0]*?မိၤၡ့|Gen)
			)(?:(?=[\d\s\xa0.:,;\x1e\x1f&\(\)\uff08\uff09\[\]/"'\*=~\-\u2013\u2014])|$)///gi
	,
		osis: ["Exod"]
		regexp: ///(^|[^0-9A-Za-zªµºÀ-ÖØ-öø-ɏက-ဪိ-ူဲ-့္-်ွ-ဿၐ-ၕၘ-ၡၥ-ၦၮ-ႂႅ-ႆႍ-ႎႝḀ-ỿⱠ-ⱿꜢ-ꞈꞋ-ꞎꞐ-ꞓꞠ-Ɦꟸ-ꟿꩠ-ꩶꩺ])(
		(?:လံ(?:ၥ်စီၤမိၤၡ့ခံဘ့ၣ်တဘ့ၣ|ာ်တၢ်ဟးထီၣ်ကွံာ)်|2(?:\.[\s\xa0]*?|[\s\xa0]*)?မိၤၡ့|၂[\s\xa0]*?မိၤၡ့|(?:2\.?|၂)[\s\xa0]*မိၤ|Exod)
			)(?:(?=[\d\s\xa0.:,;\x1e\x1f&\(\)\uff08\uff09\[\]/"'\*=~\-\u2013\u2014])|$)///gi
	,
		osis: ["Bel"]
		apocrypha: true
		regexp: ///(^|#{bcv_parser::regexps.pre_book})(
		(?:Bel)
			)(?:(?=[\d\s\xa0.:,;\x1e\x1f&\(\)\uff08\uff09\[\]/"'\*=~\-\u2013\u2014])|$)///gi
	,
		osis: ["Lev"]
		regexp: ///(^|[^0-9A-Za-zªµºÀ-ÖØ-öø-ɏက-ဪိ-ူဲ-့္-်ွ-ဿၐ-ၕၘ-ၡၥ-ၦၮ-ႂႅ-ႆႍ-ႎႝḀ-ỿⱠ-ⱿꜢ-ꞈꞋ-ꞎꞐ-ꞓꞠ-Ɦꟸ-ꟿꩠ-ꩶꩺ])(
		(?:လံ(?:ၥ်စီၤမိၤၡ့သၢဘ့ၣ်တဘ့|ာ်တၢ်ဘူၣ်ထီၣ်ဘါထီ)ၣ်|3(?:\.[\s\xa0]*?|[\s\xa0]*)?မိၤၡ့|၃[\s\xa0]*?မိၤၡ့|(?:3\.?|၃)[\s\xa0]*မိၤ|Lev)
			)(?:(?=[\d\s\xa0.:,;\x1e\x1f&\(\)\uff08\uff09\[\]/"'\*=~\-\u2013\u2014])|$)///gi
	,
		osis: ["Num"]
		regexp: ///(^|[^0-9A-Za-zªµºÀ-ÖØ-öø-ɏက-ဪိ-ူဲ-့္-်ွ-ဿၐ-ၕၘ-ၡၥ-ၦၮ-ႂႅ-ႆႍ-ႎႝḀ-ỿⱠ-ⱿꜢ-ꞈꞋ-ꞎꞐ-ꞓꞠ-Ɦꟸ-ꟿꩠ-ꩶꩺ])(
		(?:လံ(?:ၥ်စီၤမိၤၡ့လွံၢ်ဘ့ၣ်တဘ့ၣ|ာ်တၢ်ဂံၢ)်|4(?:\.[\s\xa0]*?|[\s\xa0]*)?မိၤၡ့|၄[\s\xa0]*?မိၤၡ့|(?:4\.?|၄)[\s\xa0]*မိၤ|Num)
			)(?:(?=[\d\s\xa0.:,;\x1e\x1f&\(\)\uff08\uff09\[\]/"'\*=~\-\u2013\u2014])|$)///gi
	,
		osis: ["Sir"]
		apocrypha: true
		regexp: ///(^|#{bcv_parser::regexps.pre_book})(
		(?:Sir)
			)(?:(?=[\d\s\xa0.:,;\x1e\x1f&\(\)\uff08\uff09\[\]/"'\*=~\-\u2013\u2014])|$)///gi
	,
		osis: ["Wis"]
		apocrypha: true
		regexp: ///(^|#{bcv_parser::regexps.pre_book})(
		(?:Wis)
			)(?:(?=[\d\s\xa0.:,;\x1e\x1f&\(\)\uff08\uff09\[\]/"'\*=~\-\u2013\u2014])|$)///gi
	,
		osis: ["Lam"]
		regexp: ///(^|#{bcv_parser::regexps.pre_book})(
		(?:လံ[ာၥ]်သးသယုၢ်တၢ်|Lam|သး)
			)(?:(?=[\d\s\xa0.:,;\x1e\x1f&\(\)\uff08\uff09\[\]/"'\*=~\-\u2013\u2014])|$)///gi
	,
		osis: ["EpJer"]
		apocrypha: true
		regexp: ///(^|#{bcv_parser::regexps.pre_book})(
		(?:EpJer)
			)(?:(?=[\d\s\xa0.:,;\x1e\x1f&\(\)\uff08\uff09\[\]/"'\*=~\-\u2013\u2014])|$)///gi
	,
		osis: ["Rev"]
		regexp: ///(^|#{bcv_parser::regexps.pre_book})(
		(?:လ(?:ံာ်လီၣ်ဖျါ|ီၣ်)|တၢ်လီၣ်ဖျါ|Rev)
			)(?:(?=[\d\s\xa0.:,;\x1e\x1f&\(\)\uff08\uff09\[\]/"'\*=~\-\u2013\u2014])|$)///gi
	,
		osis: ["PrMan"]
		apocrypha: true
		regexp: ///(^|#{bcv_parser::regexps.pre_book})(
		(?:PrMan)
			)(?:(?=[\d\s\xa0.:,;\x1e\x1f&\(\)\uff08\uff09\[\]/"'\*=~\-\u2013\u2014])|$)///gi
	,
		osis: ["Deut"]
		regexp: ///(^|[^0-9A-Za-zªµºÀ-ÖØ-öø-ɏက-ဪိ-ူဲ-့္-်ွ-ဿၐ-ၕၘ-ၡၥ-ၦၮ-ႂႅ-ႆႍ-ႎႝḀ-ỿⱠ-ⱿꜢ-ꞈꞋ-ꞎꞐ-ꞓꞠ-Ɦꟸ-ꟿꩠ-ꩶꩺ])(
		(?:5(?:\.(?:[\s\xa0]*မိၤ(?:ၡ့[\s\xa0]*လံၥ်စီၤမိၤၡ့ယဲၢ်ဘ့ၣ်တဘ့ၣ်)?|မိၤၡ့[\s\xa0]*လံၥ်စီၤမိၤၡ့ယဲၢ်ဘ့ၣ်တဘ့ၣ်)|[\s\xa0]*မိၤ(?:ၡ့[\s\xa0]*လံၥ်စီၤမိၤၡ့ယဲၢ်ဘ့ၣ်တဘ့ၣ်)?|မိၤၡ့[\s\xa0]*လံၥ်စီၤမိၤၡ့ယဲၢ်ဘ့ၣ်တဘ့ၣ်)|၅(?:[\s\xa0]*မိၤ(?:ၡ့[\s\xa0]*လံၥ်စီၤမိၤၡ့ယဲၢ်ဘ့ၣ်တဘ့ၣ်)?|မိၤၡ့[\s\xa0]*လံၥ်စီၤမိၤၡ့ယဲၢ်ဘ့ၣ်တဘ့ၣ်)|လံာ်သိၣ်လီၤသီလီၤတၢ်|Deut)
			)(?:(?=[\d\s\xa0.:,;\x1e\x1f&\(\)\uff08\uff09\[\]/"'\*=~\-\u2013\u2014])|$)///gi
	,
		osis: ["Josh"]
		regexp: ///(^|#{bcv_parser::regexps.pre_book})(
		(?:လံ(?:ာ်စီၤ|ၥ်)ယိၤၡူ|ယိၤၡူ|Josh|ၡူ)
			)(?:(?=[\d\s\xa0.:,;\x1e\x1f&\(\)\uff08\uff09\[\]/"'\*=~\-\u2013\u2014])|$)///gi
	,
		osis: ["Judg"]
		regexp: ///(^|#{bcv_parser::regexps.pre_book})(
		(?:လံ(?:ာ်ပှ|ၥ်ၦ)ၤစံၣ်ညီၣ်ကွီၢ်|စံၣ်ညီၣ်|Judg)
			)(?:(?=[\d\s\xa0.:,;\x1e\x1f&\(\)\uff08\uff09\[\]/"'\*=~\-\u2013\u2014])|$)///gi
	,
		osis: ["Ruth"]
		regexp: ///(^|#{bcv_parser::regexps.pre_book})(
		(?:လံ[ာၥ]်နီၢ်ရူၤသး|Ruth|ရူၤ)
			)(?:(?=[\d\s\xa0.:,;\x1e\x1f&\(\)\uff08\uff09\[\]/"'\*=~\-\u2013\u2014])|$)///gi
	,
		osis: ["1Esd"]
		apocrypha: true
		regexp: ///(^|[^0-9A-Za-zªµºÀ-ÖØ-öø-ɏက-ဪိ-ူဲ-့္-်ွ-ဿၐ-ၕၘ-ၡၥ-ၦၮ-ႂႅ-ႆႍ-ႎႝḀ-ỿⱠ-ⱿꜢ-ꞈꞋ-ꞎꞐ-ꞓꞠ-Ɦꟸ-ꟿꩠ-ꩶꩺ])(
		(?:1Esd)
			)(?:(?=[\d\s\xa0.:,;\x1e\x1f&\(\)\uff08\uff09\[\]/"'\*=~\-\u2013\u2014])|$)///gi
	,
		osis: ["2Esd"]
		apocrypha: true
		regexp: ///(^|[^0-9A-Za-zªµºÀ-ÖØ-öø-ɏက-ဪိ-ူဲ-့္-်ွ-ဿၐ-ၕၘ-ၡၥ-ၦၮ-ႂႅ-ႆႍ-ႎႝḀ-ỿⱠ-ⱿꜢ-ꞈꞋ-ꞎꞐ-ꞓꞠ-Ɦꟸ-ꟿꩠ-ꩶꩺ])(
		(?:2Esd)
			)(?:(?=[\d\s\xa0.:,;\x1e\x1f&\(\)\uff08\uff09\[\]/"'\*=~\-\u2013\u2014])|$)///gi
	,
		osis: ["Isa"]
		regexp: ///(^|#{bcv_parser::regexps.pre_book})(
		(?:လံ[ာၥ]်ယၡါယၤ|ယၡါယၤ|Isa|ၡါ)
			)(?:(?=[\d\s\xa0.:,;\x1e\x1f&\(\)\uff08\uff09\[\]/"'\*=~\-\u2013\u2014])|$)///gi
	,
		osis: ["2Sam"]
		regexp: ///(^|[^0-9A-Za-zªµºÀ-ÖØ-öø-ɏက-ဪိ-ူဲ-့္-်ွ-ဿၐ-ၕၘ-ၡၥ-ၦၮ-ႂႅ-ႆႍ-ႎႝḀ-ỿⱠ-ⱿꜢ-ꞈꞋ-ꞎꞐ-ꞓꞠ-Ɦꟸ-ꟿꩠ-ꩶꩺ])(
		(?:လံ(?:ာ်စီၤ|ၥ်)ၡမူၤအ့လးခံဘ့ၣ်တဘ့ၣ်|2(?:ၡမူၤအ့လး|\.[\s\xa0]*မူၤ|[\s\xa0]*မူၤ|Sam)|၂[\s\xa0]*မူၤ)
			)(?:(?=[\d\s\xa0.:,;\x1e\x1f&\(\)\uff08\uff09\[\]/"'\*=~\-\u2013\u2014])|$)///gi
	,
		osis: ["1Sam"]
		regexp: ///(^|[^0-9A-Za-zªµºÀ-ÖØ-öø-ɏက-ဪိ-ူဲ-့္-်ွ-ဿၐ-ၕၘ-ၡၥ-ၦၮ-ႂႅ-ႆႍ-ႎႝḀ-ỿⱠ-ⱿꜢ-ꞈꞋ-ꞎꞐ-ꞓꞠ-Ɦꟸ-ꟿꩠ-ꩶꩺ])(
		(?:လံ(?:ာ်စီၤ|ၥ်)ၡမူၤအ့လးအခီၣ်ထံးတဘ့ၣ်|1(?:ၡမူၤအ့လး|\.[\s\xa0]*မူၤ|[\s\xa0]*မူၤ|Sam)|၁[\s\xa0]*မူၤ)
			)(?:(?=[\d\s\xa0.:,;\x1e\x1f&\(\)\uff08\uff09\[\]/"'\*=~\-\u2013\u2014])|$)///gi
	,
		osis: ["2Kgs"]
		regexp: ///(^|[^0-9A-Za-zªµºÀ-ÖØ-öø-ɏက-ဪိ-ူဲ-့္-်ွ-ဿၐ-ၕၘ-ၡၥ-ၦၮ-ႂႅ-ႆႍ-ႎႝḀ-ỿⱠ-ⱿꜢ-ꞈꞋ-ꞎꞐ-ꞓꞠ-Ɦꟸ-ꟿꩠ-ꩶꩺ])(
		(?:လံ[ာၥ]်စီၤပၤခံဘ့ၣ်တဘ့ၣ်|2(?:\.[\s\xa0]*စီၤပၤ|[\s\xa0]*စီၤပၤ|Kgs)|၂[\s\xa0]*စီၤပၤ)
			)(?:(?=[\d\s\xa0.:,;\x1e\x1f&\(\)\uff08\uff09\[\]/"'\*=~\-\u2013\u2014])|$)///gi
	,
		osis: ["1Kgs"]
		regexp: ///(^|[^0-9A-Za-zªµºÀ-ÖØ-öø-ɏက-ဪိ-ူဲ-့္-်ွ-ဿၐ-ၕၘ-ၡၥ-ၦၮ-ႂႅ-ႆႍ-ႎႝḀ-ỿⱠ-ⱿꜢ-ꞈꞋ-ꞎꞐ-ꞓꞠ-Ɦꟸ-ꟿꩠ-ꩶꩺ])(
		(?:လံ[ာၥ]်စီၤပၤအခီၣ်ထံးတဘ့ၣ်|1(?:\.[\s\xa0]*စီၤပၤ|[\s\xa0]*စီၤပၤ|Kgs)|၁[\s\xa0]*စီၤပၤ)
			)(?:(?=[\d\s\xa0.:,;\x1e\x1f&\(\)\uff08\uff09\[\]/"'\*=~\-\u2013\u2014])|$)///gi
	,
		osis: ["2Chr"]
		regexp: ///(^|[^0-9A-Za-zªµºÀ-ÖØ-öø-ɏက-ဪိ-ူဲ-့္-်ွ-ဿၐ-ၕၘ-ၡၥ-ၦၮ-ႂႅ-ႆႍ-ႎႝḀ-ỿⱠ-ⱿꜢ-ꞈꞋ-ꞎꞐ-ꞓꞠ-Ɦꟸ-ꟿꩠ-ꩶꩺ])(
		(?:လံ[ာၥ]်ကွဲးနီၣ်တၢ်ခံဘ့ၣ်တဘ့ၣ်|(?:2\.?|၂)[\s\xa0]*ကွဲးနီၣ်တၢ်|(?:2\.?|၂)[\s\xa0]*ကွဲး|2Chr)
			)(?:(?=[\d\s\xa0.:,;\x1e\x1f&\(\)\uff08\uff09\[\]/"'\*=~\-\u2013\u2014])|$)///gi
	,
		osis: ["1Chr"]
		regexp: ///(^|[^0-9A-Za-zªµºÀ-ÖØ-öø-ɏက-ဪိ-ူဲ-့္-်ွ-ဿၐ-ၕၘ-ၡၥ-ၦၮ-ႂႅ-ႆႍ-ႎႝḀ-ỿⱠ-ⱿꜢ-ꞈꞋ-ꞎꞐ-ꞓꞠ-Ɦꟸ-ꟿꩠ-ꩶꩺ])(
		(?:လံ[ာၥ]်ကွဲးနီၣ်တၢ်အခီၣ်ထံးတဘ့ၣ်|(?:1\.?|၁)[\s\xa0]*ကွဲးနီၣ်တၢ်|(?:1\.?|၁)[\s\xa0]*ကွဲး|1Chr)
			)(?:(?=[\d\s\xa0.:,;\x1e\x1f&\(\)\uff08\uff09\[\]/"'\*=~\-\u2013\u2014])|$)///gi
	,
		osis: ["Ezra"]
		regexp: ///(^|#{bcv_parser::regexps.pre_book})(
		(?:လံ(?:ာ်စီၤ|ၥ်)ဧ့စြၤ|Ezra|ဧ့)
			)(?:(?=[\d\s\xa0.:,;\x1e\x1f&\(\)\uff08\uff09\[\]/"'\*=~\-\u2013\u2014])|$)///gi
	,
		osis: ["Neh"]
		regexp: ///(^|#{bcv_parser::regexps.pre_book})(
		(?:လံ(?:ာ်စီၤ|ၥ်)နဃ့မယၤ|Neh|ဃ့)
			)(?:(?=[\d\s\xa0.:,;\x1e\x1f&\(\)\uff08\uff09\[\]/"'\*=~\-\u2013\u2014])|$)///gi
	,
		osis: ["GkEsth"]
		apocrypha: true
		regexp: ///(^|#{bcv_parser::regexps.pre_book})(
		(?:GkEsth)
			)(?:(?=[\d\s\xa0.:,;\x1e\x1f&\(\)\uff08\uff09\[\]/"'\*=~\-\u2013\u2014])|$)///gi
	,
		osis: ["Esth"]
		regexp: ///(^|#{bcv_parser::regexps.pre_book})(
		(?:လံ[ာၥ]်နီၢ်အ့ၤစတၢ်|Esth|အ့ၤ)
			)(?:(?=[\d\s\xa0.:,;\x1e\x1f&\(\)\uff08\uff09\[\]/"'\*=~\-\u2013\u2014])|$)///gi
	,
		osis: ["Job"]
		regexp: ///(^|#{bcv_parser::regexps.pre_book})(
		(?:လံ(?:ာ်စီၤ|ၥ်)ယိၤဘး|ယိၤဘး|Job|ဘး)
			)(?:(?=[\d\s\xa0.:,;\x1e\x1f&\(\)\uff08\uff09\[\]/"'\*=~\-\u2013\u2014])|$)///gi
	,
		osis: ["Ps"]
		regexp: ///(^|#{bcv_parser::regexps.pre_book})(
		(?:လံၥ်စံးထီၣ်ပတြၢၤ|စံးထီၣ်ပတြၢၤ|စံး|Ps)
			)(?:(?=[\d\s\xa0.:,;\x1e\x1f&\(\)\uff08\uff09\[\]/"'\*=~\-\u2013\u2014])|$)///gi
	,
		osis: ["PrAzar"]
		apocrypha: true
		regexp: ///(^|#{bcv_parser::regexps.pre_book})(
		(?:PrAzar)
			)(?:(?=[\d\s\xa0.:,;\x1e\x1f&\(\)\uff08\uff09\[\]/"'\*=~\-\u2013\u2014])|$)///gi
	,
		osis: ["Prov"]
		regexp: ///(^|#{bcv_parser::regexps.pre_book})(
		(?:လံ(?:ာ်တၢ်ကူၣ်သ့အတၢ်ကတိၤ|ၥ်တၢ်ကတိၤဒိ)|ကတိၤဒိ|ကတိၤ|Prov)
			)(?:(?=[\d\s\xa0.:,;\x1e\x1f&\(\)\uff08\uff09\[\]/"'\*=~\-\u2013\u2014])|$)///gi
	,
		osis: ["Eccl"]
		regexp: ///(^|#{bcv_parser::regexps.pre_book})(
		(?:လံ(?:ာ်ပှ|ၥ်ၦ)ၤစံၣ်တဲၤတဲလီၤတၢ်|Eccl|စံၣ်)
			)(?:(?=[\d\s\xa0.:,;\x1e\x1f&\(\)\uff08\uff09\[\]/"'\*=~\-\u2013\u2014])|$)///gi
	,
		osis: ["SgThree"]
		apocrypha: true
		regexp: ///(^|#{bcv_parser::regexps.pre_book})(
		(?:SgThree)
			)(?:(?=[\d\s\xa0.:,;\x1e\x1f&\(\)\uff08\uff09\[\]/"'\*=~\-\u2013\u2014])|$)///gi
	,
		osis: ["Song"]
		regexp: ///(^|#{bcv_parser::regexps.pre_book})(
		(?:လံ[ာၥ]်တၢ်သးဝံၣ်တဖၣ်အတၢ်သးဝံၣ်|Song|တၢ်)
			)(?:(?=[\d\s\xa0.:,;\x1e\x1f&\(\)\uff08\uff09\[\]/"'\*=~\-\u2013\u2014])|$)///gi
	,
		osis: ["Jer"]
		regexp: ///(^|#{bcv_parser::regexps.pre_book})(
		(?:လံ[ာၥ]်ယံးရမံယၤ|ယံးရမံယၤ|ယံး|Jer)
			)(?:(?=[\d\s\xa0.:,;\x1e\x1f&\(\)\uff08\uff09\[\]/"'\*=~\-\u2013\u2014])|$)///gi
	,
		osis: ["Ezek"]
		regexp: ///(^|#{bcv_parser::regexps.pre_book})(
		(?:လံ[ာၥ]်ယဃ့းစက့လး|ယဃ့းစက့လး|Ezek|ဃ့း)
			)(?:(?=[\d\s\xa0.:,;\x1e\x1f&\(\)\uff08\uff09\[\]/"'\*=~\-\u2013\u2014])|$)///gi
	,
		osis: ["Dan"]
		regexp: ///(^|#{bcv_parser::regexps.pre_book})(
		(?:လံ[ာၥ]်ဒၤနံးယ့လး|ဒၤနံးယ့လး|Dan|ဒၤ)
			)(?:(?=[\d\s\xa0.:,;\x1e\x1f&\(\)\uff08\uff09\[\]/"'\*=~\-\u2013\u2014])|$)///gi
	,
		osis: ["Hos"]
		regexp: ///(^|#{bcv_parser::regexps.pre_book})(
		(?:လံ[ာၥ]်ဟိၤၡ့|ဟိၤၡ့|ဟိၤ|Hos)
			)(?:(?=[\d\s\xa0.:,;\x1e\x1f&\(\)\uff08\uff09\[\]/"'\*=~\-\u2013\u2014])|$)///gi
	,
		osis: ["Joel"]
		regexp: ///(^|#{bcv_parser::regexps.pre_book})(
		(?:လံ[ာၥ]်ယိၤအ့လး|Joel|အ့)
			)(?:(?=[\d\s\xa0.:,;\x1e\x1f&\(\)\uff08\uff09\[\]/"'\*=~\-\u2013\u2014])|$)///gi
	,
		osis: ["Amos"]
		regexp: ///(^|#{bcv_parser::regexps.pre_book})(
		(?:လံ[ာၥ]်ဧၤမိၣ်|Amos|ဧၤ)
			)(?:(?=[\d\s\xa0.:,;\x1e\x1f&\(\)\uff08\uff09\[\]/"'\*=~\-\u2013\u2014])|$)///gi
	,
		osis: ["Obad"]
		regexp: ///(^|#{bcv_parser::regexps.pre_book})(
		(?:လံ[ာၥ]်ဧိၤဘါဒယၤ|Obad|ဧိၤ)
			)(?:(?=[\d\s\xa0.:,;\x1e\x1f&\(\)\uff08\uff09\[\]/"'\*=~\-\u2013\u2014])|$)///gi
	,
		osis: ["Jonah"]
		regexp: ///(^|#{bcv_parser::regexps.pre_book})(
		(?:လံ[ာၥ]်ယိၤနါ|Jonah|နါ)
			)(?:(?=[\d\s\xa0.:,;\x1e\x1f&\(\)\uff08\uff09\[\]/"'\*=~\-\u2013\u2014])|$)///gi
	,
		osis: ["Mic"]
		regexp: ///(^|#{bcv_parser::regexps.pre_book})(
		(?:လံ[ာၥ]်မံကၤ|Mic|မံ)
			)(?:(?=[\d\s\xa0.:,;\x1e\x1f&\(\)\uff08\uff09\[\]/"'\*=~\-\u2013\u2014])|$)///gi
	,
		osis: ["Nah"]
		regexp: ///(^|#{bcv_parser::regexps.pre_book})(
		(?:လံ[ာၥ]်နၤဃူၣ်|Nah|နၤ)
			)(?:(?=[\d\s\xa0.:,;\x1e\x1f&\(\)\uff08\uff09\[\]/"'\*=~\-\u2013\u2014])|$)///gi
	,
		osis: ["Hab"]
		regexp: ///(^|#{bcv_parser::regexps.pre_book})(
		(?:လံာ်ဃဘးကူာ်|ဃ(?:ံၥ်ဃဘးကူၥ်|ဘး(?:ကူၥ်)?)|Hab)
			)(?:(?=[\d\s\xa0.:,;\x1e\x1f&\(\)\uff08\uff09\[\]/"'\*=~\-\u2013\u2014])|$)///gi
	,
		osis: ["Zeph"]
		regexp: ///(^|#{bcv_parser::regexps.pre_book})(
		(?:လံ[ာၥ]်စဖါနယၤ|Zeph|ဖါ)
			)(?:(?=[\d\s\xa0.:,;\x1e\x1f&\(\)\uff08\uff09\[\]/"'\*=~\-\u2013\u2014])|$)///gi
	,
		osis: ["Hag"]
		regexp: ///(^|#{bcv_parser::regexps.pre_book})(
		(?:လံ[ာၥ]်ဃးကဲ|Hag|ဃး)
			)(?:(?=[\d\s\xa0.:,;\x1e\x1f&\(\)\uff08\uff09\[\]/"'\*=~\-\u2013\u2014])|$)///gi
	,
		osis: ["Zech"]
		regexp: ///(^|#{bcv_parser::regexps.pre_book})(
		(?:လံ[ာၥ]်စကၤရယၤ|စကၤရယၤ|Zech|ကၤ)
			)(?:(?=[\d\s\xa0.:,;\x1e\x1f&\(\)\uff08\uff09\[\]/"'\*=~\-\u2013\u2014])|$)///gi
	,
		osis: ["Mal"]
		regexp: ///(^|#{bcv_parser::regexps.pre_book})(
		(?:လံ[ာၥ]်မၤလကံ|Mal|မၤ)
			)(?:(?=[\d\s\xa0.:,;\x1e\x1f&\(\)\uff08\uff09\[\]/"'\*=~\-\u2013\u2014])|$)///gi
	,
		osis: ["Matt"]
		regexp: ///(^|#{bcv_parser::regexps.pre_book})(
		(?:လံာ်မးသဲ|Matt|မး?သဲ|မး)
			)(?:(?=[\d\s\xa0.:,;\x1e\x1f&\(\)\uff08\uff09\[\]/"'\*=~\-\u2013\u2014])|$)///gi
	,
		osis: ["Mark"]
		regexp: ///(^|#{bcv_parser::regexps.pre_book})(
		(?:လံာ်မၢ်ကူး|မၢ်ကူး|Mark|မၢ်)
			)(?:(?=[\d\s\xa0.:,;\x1e\x1f&\(\)\uff08\uff09\[\]/"'\*=~\-\u2013\u2014])|$)///gi
	,
		osis: ["Luke"]
		regexp: ///(^|#{bcv_parser::regexps.pre_book})(
		(?:လ(?:ံာ်လူၤကၣ်|ူၤ(?:ကၣ်)?)|Luke)
			)(?:(?=[\d\s\xa0.:,;\x1e\x1f&\(\)\uff08\uff09\[\]/"'\*=~\-\u2013\u2014])|$)///gi
	,
		osis: ["1John"]
		regexp: ///(^|[^0-9A-Za-zªµºÀ-ÖØ-öø-ɏက-ဪိ-ူဲ-့္-်ွ-ဿၐ-ၕၘ-ၡၥ-ၦၮ-ႂႅ-ႆႍ-ႎႝḀ-ỿⱠ-ⱿꜢ-ꞈꞋ-ꞎꞐ-ꞓꞠ-Ɦꟸ-ꟿꩠ-ꩶꩺ])(
		(?:1(?:\.[\s\xa0]*ယိ(?:ၥ်ဟၣ်သိၣ်တၢ်|ၤ(?:ဟၣ်)?)|[\s\xa0]*ယိ(?:ၥ်ဟၣ်သိၣ်တၢ်|ၤ(?:ဟၣ်)?)|John)|၁[\s\xa0]*ယိ(?:ၥ်ဟၣ်သိၣ်တၢ်|ၤ(?:ဟၣ်)?))
			)(?:(?=[\d\s\xa0.:,;\x1e\x1f&\(\)\uff08\uff09\[\]/"'\*=~\-\u2013\u2014])|$)///gi
	,
		osis: ["2John"]
		regexp: ///(^|[^0-9A-Za-zªµºÀ-ÖØ-öø-ɏက-ဪိ-ူဲ-့္-်ွ-ဿၐ-ၕၘ-ၡၥ-ၦၮ-ႂႅ-ႆႍ-ႎႝḀ-ỿⱠ-ⱿꜢ-ꞈꞋ-ꞎꞐ-ꞓꞠ-Ɦꟸ-ꟿꩠ-ꩶꩺ])(
		(?:2(?:\.[\s\xa0]*ယိ(?:ၥ်ဟၣ်သိၣ်တၢ်|ၤ(?:ဟၣ်)?)|[\s\xa0]*ယိ(?:ၥ်ဟၣ်သိၣ်တၢ်|ၤ(?:ဟၣ်)?)|John)|၂[\s\xa0]*ယိ(?:ၥ်ဟၣ်သိၣ်တၢ်|ၤ(?:ဟၣ်)?))
			)(?:(?=[\d\s\xa0.:,;\x1e\x1f&\(\)\uff08\uff09\[\]/"'\*=~\-\u2013\u2014])|$)///gi
	,
		osis: ["3John"]
		regexp: ///(^|[^0-9A-Za-zªµºÀ-ÖØ-öø-ɏက-ဪိ-ူဲ-့္-်ွ-ဿၐ-ၕၘ-ၡၥ-ၦၮ-ႂႅ-ႆႍ-ႎႝḀ-ỿⱠ-ⱿꜢ-ꞈꞋ-ꞎꞐ-ꞓꞠ-Ɦꟸ-ꟿꩠ-ꩶꩺ])(
		(?:3(?:\.[\s\xa0]*ယိၤ(?:ဟၣ်(?:သိၣ်တၢ်)?)?|[\s\xa0]*ယိၤ(?:ဟၣ်(?:သိၣ်တၢ်)?)?|John)|၃[\s\xa0]*ယိၤ(?:ဟၣ်(?:သိၣ်တၢ်)?)?)
			)(?:(?=[\d\s\xa0.:,;\x1e\x1f&\(\)\uff08\uff09\[\]/"'\*=~\-\u2013\u2014])|$)///gi
	,
		osis: ["John"]
		regexp: ///(^|#{bcv_parser::regexps.pre_book})(
		(?:လံာ်ယိၤဟၣ်|ယိၤဟၣ်|John|ယိၤ)
			)(?:(?=[\d\s\xa0.:,;\x1e\x1f&\(\)\uff08\uff09\[\]/"'\*=~\-\u2013\u2014])|$)///gi
	,
		osis: ["Acts"]
		regexp: ///(^|#{bcv_parser::regexps.pre_book})(
		(?:တၢ်မၢဖိမၤတၢ်|မၤတၢ်|Acts)
			)(?:(?=[\d\s\xa0.:,;\x1e\x1f&\(\)\uff08\uff09\[\]/"'\*=~\-\u2013\u2014])|$)///gi
	,
		osis: ["Rom"]
		regexp: ///(^|#{bcv_parser::regexps.pre_book})(
		(?:ရိ(?:မ့ၤ)?|Rom)
			)(?:(?=[\d\s\xa0.:,;\x1e\x1f&\(\)\uff08\uff09\[\]/"'\*=~\-\u2013\u2014])|$)///gi
	,
		osis: ["2Cor"]
		regexp: ///(^|[^0-9A-Za-zªµºÀ-ÖØ-öø-ɏက-ဪိ-ူဲ-့္-်ွ-ဿၐ-ၕၘ-ၡၥ-ၦၮ-ႂႅ-ႆႍ-ႎႝḀ-ỿⱠ-ⱿꜢ-ꞈꞋ-ꞎꞐ-ꞓꞠ-Ɦꟸ-ꟿꩠ-ꩶꩺ])(
		(?:2(?:\.[\s\xa0]*ကရံၣ်(?:သူး)?|[\s\xa0]*ကရံၣ်(?:သူး)?|Cor)|၂[\s\xa0]*ကရံၣ်(?:သူး)?)
			)(?:(?=[\d\s\xa0.:,;\x1e\x1f&\(\)\uff08\uff09\[\]/"'\*=~\-\u2013\u2014])|$)///gi
	,
		osis: ["1Cor"]
		regexp: ///(^|[^0-9A-Za-zªµºÀ-ÖØ-öø-ɏက-ဪိ-ူဲ-့္-်ွ-ဿၐ-ၕၘ-ၡၥ-ၦၮ-ႂႅ-ႆႍ-ႎႝḀ-ỿⱠ-ⱿꜢ-ꞈꞋ-ꞎꞐ-ꞓꞠ-Ɦꟸ-ꟿꩠ-ꩶꩺ])(
		(?:1(?:\.[\s\xa0]*ကရံၣ်(?:သူး)?|[\s\xa0]*ကရံၣ်(?:သူး)?|Cor)|၁[\s\xa0]*ကရံၣ်(?:သူး)?)
			)(?:(?=[\d\s\xa0.:,;\x1e\x1f&\(\)\uff08\uff09\[\]/"'\*=~\-\u2013\u2014])|$)///gi
	,
		osis: ["Gal"]
		regexp: ///(^|#{bcv_parser::regexps.pre_book})(
		(?:ကလၤ(?:တံ)?|Gal)
			)(?:(?=[\d\s\xa0.:,;\x1e\x1f&\(\)\uff08\uff09\[\]/"'\*=~\-\u2013\u2014])|$)///gi
	,
		osis: ["Eph"]
		regexp: ///(^|#{bcv_parser::regexps.pre_book})(
		(?:အ့း(?:ဖ့းစူး)?|Eph)
			)(?:(?=[\d\s\xa0.:,;\x1e\x1f&\(\)\uff08\uff09\[\]/"'\*=~\-\u2013\u2014])|$)///gi
	,
		osis: ["Phil"]
		regexp: ///(^|#{bcv_parser::regexps.pre_book})(
		(?:ဖံလံး(?:ပံၤ)?|Phil)
			)(?:(?=[\d\s\xa0.:,;\x1e\x1f&\(\)\uff08\uff09\[\]/"'\*=~\-\u2013\u2014])|$)///gi
	,
		osis: ["Col"]
		regexp: ///(^|#{bcv_parser::regexps.pre_book})(
		(?:ကလီး(?:စဲ)?|Col)
			)(?:(?=[\d\s\xa0.:,;\x1e\x1f&\(\)\uff08\uff09\[\]/"'\*=~\-\u2013\u2014])|$)///gi
	,
		osis: ["2Thess"]
		regexp: ///(^|[^0-9A-Za-zªµºÀ-ÖØ-öø-ɏက-ဪိ-ူဲ-့္-်ွ-ဿၐ-ၕၘ-ၡၥ-ၦၮ-ႂႅ-ႆႍ-ႎႝḀ-ỿⱠ-ⱿꜢ-ꞈꞋ-ꞎꞐ-ꞓꞠ-Ɦꟸ-ꟿꩠ-ꩶꩺ])(
		(?:2(?:\.[\s\xa0]*သ့း(?:စၤလနံ)?|[\s\xa0]*သ့း(?:စၤလနံ)?|Thess)|၂[\s\xa0]*သ့း(?:စၤလနံ)?)
			)(?:(?=[\d\s\xa0.:,;\x1e\x1f&\(\)\uff08\uff09\[\]/"'\*=~\-\u2013\u2014])|$)///gi
	,
		osis: ["1Thess"]
		regexp: ///(^|[^0-9A-Za-zªµºÀ-ÖØ-öø-ɏက-ဪိ-ူဲ-့္-်ွ-ဿၐ-ၕၘ-ၡၥ-ၦၮ-ႂႅ-ႆႍ-ႎႝḀ-ỿⱠ-ⱿꜢ-ꞈꞋ-ꞎꞐ-ꞓꞠ-Ɦꟸ-ꟿꩠ-ꩶꩺ])(
		(?:1(?:\.[\s\xa0]*သ့း(?:စၤလနံ)?|[\s\xa0]*သ့း(?:စၤလနံ)?|Thess)|၁[\s\xa0]*သ့း(?:စၤလနံ)?)
			)(?:(?=[\d\s\xa0.:,;\x1e\x1f&\(\)\uff08\uff09\[\]/"'\*=~\-\u2013\u2014])|$)///gi
	,
		osis: ["2Tim"]
		regexp: ///(^|[^0-9A-Za-zªµºÀ-ÖØ-öø-ɏက-ဪိ-ူဲ-့္-်ွ-ဿၐ-ၕၘ-ၡၥ-ၦၮ-ႂႅ-ႆႍ-ႎႝḀ-ỿⱠ-ⱿꜢ-ꞈꞋ-ꞎꞐ-ꞓꞠ-Ɦꟸ-ꟿꩠ-ꩶꩺ])(
		(?:2(?:\.[\s\xa0]*တံၤ(?:မသ့း)?|[\s\xa0]*တံၤ(?:မသ့း)?|Tim)|၂[\s\xa0]*တံၤ(?:မသ့း)?)
			)(?:(?=[\d\s\xa0.:,;\x1e\x1f&\(\)\uff08\uff09\[\]/"'\*=~\-\u2013\u2014])|$)///gi
	,
		osis: ["1Tim"]
		regexp: ///(^|[^0-9A-Za-zªµºÀ-ÖØ-öø-ɏက-ဪိ-ူဲ-့္-်ွ-ဿၐ-ၕၘ-ၡၥ-ၦၮ-ႂႅ-ႆႍ-ႎႝḀ-ỿⱠ-ⱿꜢ-ꞈꞋ-ꞎꞐ-ꞓꞠ-Ɦꟸ-ꟿꩠ-ꩶꩺ])(
		(?:1(?:\.[\s\xa0]*တံၤ(?:မသ့း)?|[\s\xa0]*တံၤ(?:မသ့း)?|Tim)|၁[\s\xa0]*တံၤ(?:မသ့း)?)
			)(?:(?=[\d\s\xa0.:,;\x1e\x1f&\(\)\uff08\uff09\[\]/"'\*=~\-\u2013\u2014])|$)///gi
	,
		osis: ["Titus"]
		regexp: ///(^|#{bcv_parser::regexps.pre_book})(
		(?:တံ(?:တူး)?|Titus)
			)(?:(?=[\d\s\xa0.:,;\x1e\x1f&\(\)\uff08\uff09\[\]/"'\*=~\-\u2013\u2014])|$)///gi
	,
		osis: ["Phlm"]
		regexp: ///(^|#{bcv_parser::regexps.pre_book})(
		(?:ဖံၤ(?:လ့မိၣ်)?|Phlm)
			)(?:(?=[\d\s\xa0.:,;\x1e\x1f&\(\)\uff08\uff09\[\]/"'\*=~\-\u2013\u2014])|$)///gi
	,
		osis: ["Heb"]
		regexp: ///(^|#{bcv_parser::regexps.pre_book})(
		(?:ဧ့ၤ(?:ဘြံၤ)?|Heb)
			)(?:(?=[\d\s\xa0.:,;\x1e\x1f&\(\)\uff08\uff09\[\]/"'\*=~\-\u2013\u2014])|$)///gi
	,
		osis: ["Jas"]
		regexp: ///(^|#{bcv_parser::regexps.pre_book})(
		(?:ယၤ(?:ကိ[ာၥ]်)?|Jas)
			)(?:(?=[\d\s\xa0.:,;\x1e\x1f&\(\)\uff08\uff09\[\]/"'\*=~\-\u2013\u2014])|$)///gi
	,
		osis: ["2Pet"]
		regexp: ///(^|[^0-9A-Za-zªµºÀ-ÖØ-öø-ɏက-ဪိ-ူဲ-့္-်ွ-ဿၐ-ၕၘ-ၡၥ-ၦၮ-ႂႅ-ႆႍ-ႎႝḀ-ỿⱠ-ⱿꜢ-ꞈꞋ-ꞎꞐ-ꞓꞠ-Ɦꟸ-ꟿꩠ-ꩶꩺ])(
		(?:2(?:\.[\s\xa0]*ပ့း(?:တရူး)?|[\s\xa0]*ပ့း(?:တရူး)?|Pet)|၂[\s\xa0]*ပ့း(?:တရူး)?)
			)(?:(?=[\d\s\xa0.:,;\x1e\x1f&\(\)\uff08\uff09\[\]/"'\*=~\-\u2013\u2014])|$)///gi
	,
		osis: ["1Pet"]
		regexp: ///(^|[^0-9A-Za-zªµºÀ-ÖØ-öø-ɏက-ဪိ-ူဲ-့္-်ွ-ဿၐ-ၕၘ-ၡၥ-ၦၮ-ႂႅ-ႆႍ-ႎႝḀ-ỿⱠ-ⱿꜢ-ꞈꞋ-ꞎꞐ-ꞓꞠ-Ɦꟸ-ꟿꩠ-ꩶꩺ])(
		(?:1(?:\.[\s\xa0]*ပ့း(?:တရူး)?|[\s\xa0]*ပ့း(?:တရူး)?|Pet)|၁[\s\xa0]*ပ့း(?:တရူး)?)
			)(?:(?=[\d\s\xa0.:,;\x1e\x1f&\(\)\uff08\uff09\[\]/"'\*=~\-\u2013\u2014])|$)///gi
	,
		osis: ["Jude"]
		regexp: ///(^|#{bcv_parser::regexps.pre_book})(
		(?:ယူ(?:ဒၤ)?|Jude)
			)(?:(?=[\d\s\xa0.:,;\x1e\x1f&\(\)\uff08\uff09\[\]/"'\*=~\-\u2013\u2014])|$)///gi
	,
		osis: ["Tob"]
		apocrypha: true
		regexp: ///(^|#{bcv_parser::regexps.pre_book})(
		(?:Tob)
			)(?:(?=[\d\s\xa0.:,;\x1e\x1f&\(\)\uff08\uff09\[\]/"'\*=~\-\u2013\u2014])|$)///gi
	,
		osis: ["Jdt"]
		apocrypha: true
		regexp: ///(^|#{bcv_parser::regexps.pre_book})(
		(?:Jdt)
			)(?:(?=[\d\s\xa0.:,;\x1e\x1f&\(\)\uff08\uff09\[\]/"'\*=~\-\u2013\u2014])|$)///gi
	,
		osis: ["Bar"]
		apocrypha: true
		regexp: ///(^|#{bcv_parser::regexps.pre_book})(
		(?:Bar)
			)(?:(?=[\d\s\xa0.:,;\x1e\x1f&\(\)\uff08\uff09\[\]/"'\*=~\-\u2013\u2014])|$)///gi
	,
		osis: ["Sus"]
		apocrypha: true
		regexp: ///(^|#{bcv_parser::regexps.pre_book})(
		(?:Sus)
			)(?:(?=[\d\s\xa0.:,;\x1e\x1f&\(\)\uff08\uff09\[\]/"'\*=~\-\u2013\u2014])|$)///gi
	,
		osis: ["2Macc"]
		apocrypha: true
		regexp: ///(^|[^0-9A-Za-zªµºÀ-ÖØ-öø-ɏက-ဪိ-ူဲ-့္-်ွ-ဿၐ-ၕၘ-ၡၥ-ၦၮ-ႂႅ-ႆႍ-ႎႝḀ-ỿⱠ-ⱿꜢ-ꞈꞋ-ꞎꞐ-ꞓꞠ-Ɦꟸ-ꟿꩠ-ꩶꩺ])(
		(?:2Macc)
			)(?:(?=[\d\s\xa0.:,;\x1e\x1f&\(\)\uff08\uff09\[\]/"'\*=~\-\u2013\u2014])|$)///gi
	,
		osis: ["3Macc"]
		apocrypha: true
		regexp: ///(^|[^0-9A-Za-zªµºÀ-ÖØ-öø-ɏက-ဪိ-ူဲ-့္-်ွ-ဿၐ-ၕၘ-ၡၥ-ၦၮ-ႂႅ-ႆႍ-ႎႝḀ-ỿⱠ-ⱿꜢ-ꞈꞋ-ꞎꞐ-ꞓꞠ-Ɦꟸ-ꟿꩠ-ꩶꩺ])(
		(?:3Macc)
			)(?:(?=[\d\s\xa0.:,;\x1e\x1f&\(\)\uff08\uff09\[\]/"'\*=~\-\u2013\u2014])|$)///gi
	,
		osis: ["4Macc"]
		apocrypha: true
		regexp: ///(^|[^0-9A-Za-zªµºÀ-ÖØ-öø-ɏက-ဪိ-ူဲ-့္-်ွ-ဿၐ-ၕၘ-ၡၥ-ၦၮ-ႂႅ-ႆႍ-ႎႝḀ-ỿⱠ-ⱿꜢ-ꞈꞋ-ꞎꞐ-ꞓꞠ-Ɦꟸ-ꟿꩠ-ꩶꩺ])(
		(?:4Macc)
			)(?:(?=[\d\s\xa0.:,;\x1e\x1f&\(\)\uff08\uff09\[\]/"'\*=~\-\u2013\u2014])|$)///gi
	,
		osis: ["1Macc"]
		apocrypha: true
		regexp: ///(^|[^0-9A-Za-zªµºÀ-ÖØ-öø-ɏက-ဪိ-ူဲ-့္-်ွ-ဿၐ-ၕၘ-ၡၥ-ၦၮ-ႂႅ-ႆႍ-ႎႝḀ-ỿⱠ-ⱿꜢ-ꞈꞋ-ꞎꞐ-ꞓꞠ-Ɦꟸ-ꟿꩠ-ꩶꩺ])(
		(?:1Macc)
			)(?:(?=[\d\s\xa0.:,;\x1e\x1f&\(\)\uff08\uff09\[\]/"'\*=~\-\u2013\u2014])|$)///gi
	]
	# Short-circuit the look if we know we want all the books.
	return books if include_apocrypha is true and case_sensitive is "none"
	# Filter out books in the Apocrypha if we don't want them. `Array.map` isn't supported below IE9.
	out = []
	for book in books
		continue if include_apocrypha is false and book.apocrypha? and book.apocrypha is true
		if case_sensitive is "books"
			book.regexp = new RegExp book.regexp.source, "g"
		out.push book
	out

# Default to not using the Apocrypha
bcv_parser::regexps.books = bcv_parser::regexps.get_books false, "none"
