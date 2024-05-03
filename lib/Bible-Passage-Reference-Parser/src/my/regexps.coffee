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
				  | title (?! [a-z] )		#could be followed by a number
				  | အခန်းငယ် | အခန်း | နှင့် | ff | မှ | း | ၊ | း
				  | [a-e] (?! \w )			#a-e allows 1:1a
				  | $						#or the end of the string
				 )+
		)
	///gi
# These are the only valid ways to end a potential passage match. The closing parenthesis allows for fully capturing parentheses surrounding translations (ESV**)**. The last one, `[\d\x1f]` needs not to be +; otherwise `Gen5ff` becomes `\x1f0\x1f5ff`, and `adjust_regexp_end` matches the `\x1f5` and incorrectly dangles the ff.
bcv_parser::regexps.match_end_split = ///
	  \d \W* title
	| \d \W* ff (?: [\s\xa0*]* \.)?
	| \d [\s\xa0*]* [a-e] (?! \w )
	| \x1e (?: [\s\xa0*]* [)\]\uff09] )? #ff09 is a full-width closing parenthesis
	| [\d\x1f]
	///gi
bcv_parser::regexps.control = /[\x1e\x1f]/g
bcv_parser::regexps.pre_book = "[^A-Za-zªµºÀ-ÖØ-öø-ɏက-ဪိ-ူဲ-့္-်ွ-ဿၐ-ၕၘ-ၡၥ-ၦၮ-ႂႅ-ႆႍ-ႎႝḀ-ỿⱠ-ⱿꜢ-ꞈꞋ-ꞎꞐ-ꞓꞠ-Ɦꟸ-ꟿꩠ-ꩶꩺ]"

bcv_parser::regexps.first = "(?:1|[၁1])\\.?#{bcv_parser::regexps.space}*"
bcv_parser::regexps.second = "(?:2|[၂2])\\.?#{bcv_parser::regexps.space}*"
bcv_parser::regexps.third = "(?:3|[၃3])\\.?#{bcv_parser::regexps.space}*"
bcv_parser::regexps.range_and = "(?:[&\u2013\u2014-]|(?:နှင့်|၊)|မှ)"
bcv_parser::regexps.range_only = "(?:[\u2013\u2014-]|မှ)"
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
		regexp: ///(^|#{bcv_parser::regexps.pre_book})(
		(?:က(?:[\s\xa0]*မ္ဘာ[\s\xa0]*[ဥဦ]း[\s\xa0]*ကျမ်း။|(?:မ္ဘာ)?၊)?|Gen)
			)(?:(?=[\d\s\xa0.:,;\x1e\x1f&\(\)\uff08\uff09\[\]/"'\*=~\-\u2013\u2014])|$)///gi
	,
		osis: ["Exod"]
		regexp: ///(^|#{bcv_parser::regexps.pre_book})(
		(?:ထ(?:ွ(?:က်(?:[\s\xa0]*မြောက်[\s\xa0]*ရာ[\s\xa0]*ကျမ်း။|၊))?|ကွ[\s\xa0]*၊်)|Exod)
			)(?:(?=[\d\s\xa0.:,;\x1e\x1f&\(\)\uff08\uff09\[\]/"'\*=~\-\u2013\u2014])|$)///gi
	,
		osis: ["Bel"]
		apocrypha: true
		regexp: ///(^|#{bcv_parser::regexps.pre_book})(
		(?:Bel)
			)(?:(?=[\d\s\xa0.:,;\x1e\x1f&\(\)\uff08\uff09\[\]/"'\*=~\-\u2013\u2014])|$)///gi
	,
		osis: ["Lev"]
		regexp: ///(^|#{bcv_parser::regexps.pre_book})(
		(?:ဝတ်(?:[\s\xa0]*ပြု[\s\xa0]*ရာ[\s\xa0]*ကျမ်း။|၊)?|Lev)
			)(?:(?=[\d\s\xa0.:,;\x1e\x1f&\(\)\uff08\uff09\[\]/"'\*=~\-\u2013\u2014])|$)///gi
	,
		osis: ["Num"]
		regexp: ///(^|#{bcv_parser::regexps.pre_book})(
		(?:တော(?:[\s\xa0]*လည်[\s\xa0]*ရာ[\s\xa0]*ကျမ်း။|၊)?|Num)
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
		(?:ယေ[\s\xa0]*ရ[\s\xa0]*မိ[\s\xa0]*မြည်[\s\xa0]*တမ်း[\s\xa0]*စ[\s\xa0]*ကား။|မြည်|Lam)
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
		(?:ဗျာ(?:[\s\xa0]*ဒိတ်[\s\xa0]*ကျမ်း။|၊)?|Rev)
			)(?:(?=[\d\s\xa0.:,;\x1e\x1f&\(\)\uff08\uff09\[\]/"'\*=~\-\u2013\u2014])|$)///gi
	,
		osis: ["PrMan"]
		apocrypha: true
		regexp: ///(^|#{bcv_parser::regexps.pre_book})(
		(?:PrMan)
			)(?:(?=[\d\s\xa0.:,;\x1e\x1f&\(\)\uff08\uff09\[\]/"'\*=~\-\u2013\u2014])|$)///gi
	,
		osis: ["Deut"]
		regexp: ///(^|#{bcv_parser::regexps.pre_book})(
		(?:တ(?:[\s\xa0]*ရား[\s\xa0]*ဟော[\s\xa0]*ရာ[\s\xa0]*ကျမ်း။|ရား(?:‌ဟော|ဟော၊)?)|Deut)
			)(?:(?=[\d\s\xa0.:,;\x1e\x1f&\(\)\uff08\uff09\[\]/"'\*=~\-\u2013\u2014])|$)///gi
	,
		osis: ["Josh"]
		regexp: ///(^|#{bcv_parser::regexps.pre_book})(
		(?:ယော(?:[\s\xa0]*ရှု[\s\xa0]*မှတ်[\s\xa0]*စာ။|ရှု)|Josh)
			)(?:(?=[\d\s\xa0.:,;\x1e\x1f&\(\)\uff08\uff09\[\]/"'\*=~\-\u2013\u2014])|$)///gi
	,
		osis: ["Judg"]
		regexp: ///(^|#{bcv_parser::regexps.pre_book})(
		(?:တ[\s\xa0]*ရား[\s\xa0]*သူ[\s\xa0]*ကြီး[\s\xa0]*မှတ်[\s\xa0]*စာ။|သူကြီး|Judg)
			)(?:(?=[\d\s\xa0.:,;\x1e\x1f&\(\)\uff08\uff09\[\]/"'\*=~\-\u2013\u2014])|$)///gi
	,
		osis: ["Ruth"]
		regexp: ///(^|#{bcv_parser::regexps.pre_book})(
		(?:ရု(?:​သ​ဝ​တ္တု။)?|Ruth)
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
		(?:ဟေ(?:[\s\xa0]*ရှာ[\s\xa0]*ယ[\s\xa0]*အ[\s\xa0]*နာ[\s\xa0]*ဂ[\s\xa0]*တ္တိ[\s\xa0]*ကျမ်း။|ရှာ(?:ယ?၊)?)|‌ဟေရာှ|Isa)
			)(?:(?=[\d\s\xa0.:,;\x1e\x1f&\(\)\uff08\uff09\[\]/"'\*=~\-\u2013\u2014])|$)///gi
	,
		osis: ["2Sam"]
		regexp: ///(^|[^0-9A-Za-zªµºÀ-ÖØ-öø-ɏက-ဪိ-ူဲ-့္-်ွ-ဿၐ-ၕၘ-ၡၥ-ၦၮ-ႂႅ-ႆႍ-ႎႝḀ-ỿⱠ-ⱿꜢ-ꞈꞋ-ꞎꞐ-ꞓꞠ-Ɦꟸ-ꟿꩠ-ꩶꩺ])(
		(?:ဓ[\s\xa0]*မ္မ[\s\xa0]*ရာ[\s\xa0]*ဇ[\s\xa0]*ဝင်[\s\xa0]*ဒု[\s\xa0]*တိ[\s\xa0]*ယ[\s\xa0]*စောင်။|2(?:\.[\s\xa0]*?ရာ၊|[\s\xa0]*ရာ၊|Sam|ရာ၊)|၂[\s\xa0]*?ရာ၊|[2၂][\s\xa0]*ရာ)
			)(?:(?=[\d\s\xa0.:,;\x1e\x1f&\(\)\uff08\uff09\[\]/"'\*=~\-\u2013\u2014])|$)///gi
	,
		osis: ["1Sam"]
		regexp: ///(^|[^0-9A-Za-zªµºÀ-ÖØ-öø-ɏက-ဪိ-ူဲ-့္-်ွ-ဿၐ-ၕၘ-ၡၥ-ၦၮ-ႂႅ-ႆႍ-ႎႝḀ-ỿⱠ-ⱿꜢ-ꞈꞋ-ꞎꞐ-ꞓꞠ-Ɦꟸ-ꟿꩠ-ꩶꩺ])(
		(?:ဓ[\s\xa0]*မ္မ[\s\xa0]*ရာ[\s\xa0]*ဇ[\s\xa0]*ဝင်[\s\xa0]*ပ[\s\xa0]*ထ[\s\xa0]*မ[\s\xa0]*စောင်။|1(?:\.[\s\xa0]*?ရာ၊|[\s\xa0]*ရာ၊|Sam|ရာ၊)|၁[\s\xa0]*?ရာ၊|[1၁][\s\xa0]*ရာ)
			)(?:(?=[\d\s\xa0.:,;\x1e\x1f&\(\)\uff08\uff09\[\]/"'\*=~\-\u2013\u2014])|$)///gi
	,
		osis: ["2Kgs"]
		regexp: ///(^|[^0-9A-Za-zªµºÀ-ÖØ-öø-ɏက-ဪိ-ူဲ-့္-်ွ-ဿၐ-ၕၘ-ၡၥ-ၦၮ-ႂႅ-ႆႍ-ႎႝḀ-ỿⱠ-ⱿꜢ-ꞈꞋ-ꞎꞐ-ꞓꞠ-Ɦꟸ-ꟿꩠ-ꩶꩺ])(
		(?:ဓ[\s\xa0]*မ္မ[\s\xa0]*ရာ[\s\xa0]*ဇ[\s\xa0]*ဝင်[\s\xa0]*စ[\s\xa0]*တု[\s\xa0]*တ္ထ[\s\xa0]*စောင်။|4(?:\.[\s\xa0]*?|[\s\xa0]*)?ရာ၊|၄[\s\xa0]*ရာ၊|[4၄][\s\xa0]*ရာ|2Kgs|၄ရာ၊)
			)(?:(?=[\d\s\xa0.:,;\x1e\x1f&\(\)\uff08\uff09\[\]/"'\*=~\-\u2013\u2014])|$)///gi
	,
		osis: ["1Kgs"]
		regexp: ///(^|[^0-9A-Za-zªµºÀ-ÖØ-öø-ɏက-ဪိ-ူဲ-့္-်ွ-ဿၐ-ၕၘ-ၡၥ-ၦၮ-ႂႅ-ႆႍ-ႎႝḀ-ỿⱠ-ⱿꜢ-ꞈꞋ-ꞎꞐ-ꞓꞠ-Ɦꟸ-ꟿꩠ-ꩶꩺ])(
		(?:ဓ[\s\xa0]*မ္မ[\s\xa0]*ရာ[\s\xa0]*ဇ[\s\xa0]*ဝင်[\s\xa0]*တ[\s\xa0]*တိ[\s\xa0]*ယ[\s\xa0]*စောင်။|3(?:\.[\s\xa0]*?|[\s\xa0]*)?ရာ၊|၃[\s\xa0]*ရာ၊|[3၃][\s\xa0]*ရာ|1Kgs|၃ရာ၊)
			)(?:(?=[\d\s\xa0.:,;\x1e\x1f&\(\)\uff08\uff09\[\]/"'\*=~\-\u2013\u2014])|$)///gi
	,
		osis: ["2Chr"]
		regexp: ///(^|[^0-9A-Za-zªµºÀ-ÖØ-öø-ɏက-ဪိ-ူဲ-့္-်ွ-ဿၐ-ၕၘ-ၡၥ-ၦၮ-ႂႅ-ႆႍ-ႎႝḀ-ỿⱠ-ⱿꜢ-ꞈꞋ-ꞎꞐ-ꞓꞠ-Ɦꟸ-ꟿꩠ-ꩶꩺ])(
		(?:ရာ[\s\xa0]*ဇ[\s\xa0]*ဝင်[\s\xa0]*ချုပ်[\s\xa0]*ဒု[\s\xa0]*တိ[\s\xa0]*ယ[\s\xa0]*စောင်။|[6၆][\s\xa0]*?ရာ၊|[6၆][\s\xa0]*ရာ|2Chr)
			)(?:(?=[\d\s\xa0.:,;\x1e\x1f&\(\)\uff08\uff09\[\]/"'\*=~\-\u2013\u2014])|$)///gi
	,
		osis: ["1Chr"]
		regexp: ///(^|[^0-9A-Za-zªµºÀ-ÖØ-öø-ɏက-ဪိ-ူဲ-့္-်ွ-ဿၐ-ၕၘ-ၡၥ-ၦၮ-ႂႅ-ႆႍ-ႎႝḀ-ỿⱠ-ⱿꜢ-ꞈꞋ-ꞎꞐ-ꞓꞠ-Ɦꟸ-ꟿꩠ-ꩶꩺ])(
		(?:ရာ[\s\xa0]*ဇ[\s\xa0]*ဝင်[\s\xa0]*ချုပ်[\s\xa0]*ပ[\s\xa0]*ထ[\s\xa0]*မ[\s\xa0]*စောင်။|5(?:\.[\s\xa0]*?|[\s\xa0]*)?ရာ၊|၅[\s\xa0]*ရာ၊|[5၅][\s\xa0]*ရာ|1Chr|၅ရာ၊)
			)(?:(?=[\d\s\xa0.:,;\x1e\x1f&\(\)\uff08\uff09\[\]/"'\*=~\-\u2013\u2014])|$)///gi
	,
		osis: ["Ezra"]
		regexp: ///(^|#{bcv_parser::regexps.pre_book})(
		(?:ဧ(?:[\s\xa0]*ဇ[\s\xa0]*ရ[\s\xa0]*မှတ်[\s\xa0]*စာ။|ဇ(?:ရ၊)?)|Ezra)
			)(?:(?=[\d\s\xa0.:,;\x1e\x1f&\(\)\uff08\uff09\[\]/"'\*=~\-\u2013\u2014])|$)///gi
	,
		osis: ["Neh"]
		regexp: ///(^|#{bcv_parser::regexps.pre_book})(
		(?:နေ(?:[\s\xa0]*ဟ[\s\xa0]*မိ[\s\xa0]*မှတ်[\s\xa0]*စာ။)?|Neh)
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
		(?:ဧ(?:[\s\xa0]*သ[\s\xa0]*တာ[\s\xa0]*ဝ[\s\xa0]*တ္ထု။|သ)|Esth)
			)(?:(?=[\d\s\xa0.:,;\x1e\x1f&\(\)\uff08\uff09\[\]/"'\*=~\-\u2013\u2014])|$)///gi
	,
		osis: ["Job"]
		regexp: ///(^|#{bcv_parser::regexps.pre_book})(
		(?:ယော(?:[\s\xa0]*ဘ[\s\xa0]*ဝ[\s\xa0]*တ္တု။|ဘ၊?)|Job)
			)(?:(?=[\d\s\xa0.:,;\x1e\x1f&\(\)\uff08\uff09\[\]/"'\*=~\-\u2013\u2014])|$)///gi
	,
		osis: ["Ps"]
		regexp: ///(^|#{bcv_parser::regexps.pre_book})(
		(?:ဆာ(?:[\s\xa0]*လံ[\s\xa0]*ကျမ်း။|(?:လံ)?၊)?|Ps)
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
		(?:သု(?:[\s\xa0]*တ္တံ[\s\xa0]*ကျမ်း။|တ္တံ၊)?|Prov)
			)(?:(?=[\d\s\xa0.:,;\x1e\x1f&\(\)\uff08\uff09\[\]/"'\*=~\-\u2013\u2014])|$)///gi
	,
		osis: ["Eccl"]
		regexp: ///(^|#{bcv_parser::regexps.pre_book})(
		(?:ဒေ(?:[\s\xa0]*သ[\s\xa0]*နာ[\s\xa0]*ကျမ်း။|သနာ၊)?|Eccl)
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
		(?:ရှော[\s\xa0]*လ[\s\xa0]*မုန်[\s\xa0]*သီ[\s\xa0]*ချင်း။|Song|သီ)
			)(?:(?=[\d\s\xa0.:,;\x1e\x1f&\(\)\uff08\uff09\[\]/"'\*=~\-\u2013\u2014])|$)///gi
	,
		osis: ["Jer"]
		regexp: ///(^|#{bcv_parser::regexps.pre_book})(
		(?:ယေ(?:[\s\xa0]*ရ[\s\xa0]*မိ[\s\xa0]*အ[\s\xa0]*နာ[\s\xa0]*ဂ[\s\xa0]*တ္တိ[\s\xa0]*ကျမ်း။|ရမိ၊|ရမိ)?|Jer)
			)(?:(?=[\d\s\xa0.:,;\x1e\x1f&\(\)\uff08\uff09\[\]/"'\*=~\-\u2013\u2014])|$)///gi
	,
		osis: ["Ezek"]
		regexp: ///(^|#{bcv_parser::regexps.pre_book})(
		(?:ယေ(?:[\s\xa0]*ဇ[\s\xa0]*ကျေ[\s\xa0]*လ[\s\xa0]*အ[\s\xa0]*နာ[\s\xa0]*ဂ[\s\xa0]*တ္တိ[\s\xa0]*ကျမ်း။|ဇ(?:‌ကျေလ|ကျေလ၊)?)|Ezek)
			)(?:(?=[\d\s\xa0.:,;\x1e\x1f&\(\)\uff08\uff09\[\]/"'\*=~\-\u2013\u2014])|$)///gi
	,
		osis: ["Dan"]
		regexp: ///(^|#{bcv_parser::regexps.pre_book})(
		(?:ဒံ(?:[\s\xa0]*ယေ[\s\xa0]*လ[\s\xa0]*အ[\s\xa0]*နာ[\s\xa0]*ဂ[\s\xa0]*တ္တိ[\s\xa0]*ကျမ်း။|‌ယေလ|၊)?|Dan)
			)(?:(?=[\d\s\xa0.:,;\x1e\x1f&\(\)\uff08\uff09\[\]/"'\*=~\-\u2013\u2014])|$)///gi
	,
		osis: ["Hos"]
		regexp: ///(^|#{bcv_parser::regexps.pre_book})(
		(?:ဟော(?:[\s\xa0]*ရှေ[\s\xa0]*အ[\s\xa0]*နာ[\s\xa0]*ဂ[\s\xa0]*တ္တိ[\s\xa0]*ကျမ်း။)?|Hos)
			)(?:(?=[\d\s\xa0.:,;\x1e\x1f&\(\)\uff08\uff09\[\]/"'\*=~\-\u2013\u2014])|$)///gi
	,
		osis: ["Joel"]
		regexp: ///(^|#{bcv_parser::regexps.pre_book})(
		(?:ယော(?:[\s\xa0]*လ[\s\xa0]*အ[\s\xa0]*နာ[\s\xa0]*ဂ[\s\xa0]*တ္တိ[\s\xa0]*ကျမ်း။|လ)|Joel)
			)(?:(?=[\d\s\xa0.:,;\x1e\x1f&\(\)\uff08\uff09\[\]/"'\*=~\-\u2013\u2014])|$)///gi
	,
		osis: ["Amos"]
		regexp: ///(^|#{bcv_parser::regexps.pre_book})(
		(?:အာ(?:[\s\xa0]*မုတ်[\s\xa0]*အ[\s\xa0]*နာ[\s\xa0]*ဂ[\s\xa0]*တ္တိ[\s\xa0]*ကျမ်း။)?|Amos)
			)(?:(?=[\d\s\xa0.:,;\x1e\x1f&\(\)\uff08\uff09\[\]/"'\*=~\-\u2013\u2014])|$)///gi
	,
		osis: ["Obad"]
		regexp: ///(^|#{bcv_parser::regexps.pre_book})(
		(?:ဩ(?:[\s\xa0]*ဗ[\s\xa0]*ဒိ[\s\xa0]*ဗျာ[\s\xa0]*ဒိတ်[\s\xa0]*ရူ[\s\xa0]*ပါ[\s\xa0]*ရုံ။)?|Obad)
			)(?:(?=[\d\s\xa0.:,;\x1e\x1f&\(\)\uff08\uff09\[\]/"'\*=~\-\u2013\u2014])|$)///gi
	,
		osis: ["Jonah"]
		regexp: ///(^|#{bcv_parser::regexps.pre_book})(
		(?:ယော(?:[\s\xa0]*န[\s\xa0]*ဝ[\s\xa0]*တ္ထု။|န)|Jonah)
			)(?:(?=[\d\s\xa0.:,;\x1e\x1f&\(\)\uff08\uff09\[\]/"'\*=~\-\u2013\u2014])|$)///gi
	,
		osis: ["Mic"]
		regexp: ///(^|#{bcv_parser::regexps.pre_book})(
		(?:မိ(?:[\s\xa0]*က္ခာ[\s\xa0]*အ[\s\xa0]*နာ[\s\xa0]*ဂ[\s\xa0]*တ္တိ[\s\xa0]*ကျမ်း။)?|Mic)
			)(?:(?=[\d\s\xa0.:,;\x1e\x1f&\(\)\uff08\uff09\[\]/"'\*=~\-\u2013\u2014])|$)///gi
	,
		osis: ["Nah"]
		regexp: ///(^|#{bcv_parser::regexps.pre_book})(
		(?:နာ(?:[\s\xa0]*ဟုံ[\s\xa0]*အ[\s\xa0]*နာ[\s\xa0]*ဂ[\s\xa0]*တ္တိ[\s\xa0]*ကျမ်း။)?|Nah)
			)(?:(?=[\d\s\xa0.:,;\x1e\x1f&\(\)\uff08\uff09\[\]/"'\*=~\-\u2013\u2014])|$)///gi
	,
		osis: ["Hab"]
		regexp: ///(^|#{bcv_parser::regexps.pre_book})(
		(?:ဟ(?:[\s\xa0]*ဗ[\s\xa0]*က္ကုတ်[\s\xa0]*အ[\s\xa0]*နာ[\s\xa0]*ဂ[\s\xa0]*တ္တိ[\s\xa0]*ကျမ်း။|ဗ)|Hab)
			)(?:(?=[\d\s\xa0.:,;\x1e\x1f&\(\)\uff08\uff09\[\]/"'\*=~\-\u2013\u2014])|$)///gi
	,
		osis: ["Zeph"]
		regexp: ///(^|#{bcv_parser::regexps.pre_book})(
		(?:ဇေ(?:[\s\xa0]*ဖ[\s\xa0]*နိ[\s\xa0]*အ[\s\xa0]*နာ[\s\xa0]*ဂ[\s\xa0]*တ္တိ[\s\xa0]*ကျမ်း။)?|Zeph)
			)(?:(?=[\d\s\xa0.:,;\x1e\x1f&\(\)\uff08\uff09\[\]/"'\*=~\-\u2013\u2014])|$)///gi
	,
		osis: ["Hag"]
		regexp: ///(^|#{bcv_parser::regexps.pre_book})(
		(?:ဟ(?:[\s\xa0]*ဂ္ဂဲ(?:[\s\xa0]*အ[\s\xa0]*နာ[\s\xa0]*ဂ[\s\xa0]*တ္တိ[\s\xa0]*ကျမ်း။)?|ဂ္)|Hag)
			)(?:(?=[\d\s\xa0.:,;\x1e\x1f&\(\)\uff08\uff09\[\]/"'\*=~\-\u2013\u2014])|$)///gi
	,
		osis: ["Zech"]
		regexp: ///(^|#{bcv_parser::regexps.pre_book})(
		(?:ဇာ(?:[\s\xa0]*ခ[\s\xa0]*ရိ[\s\xa0]*အ[\s\xa0]*နာ[\s\xa0]*ဂ[\s\xa0]*တ္တိ[\s\xa0]*ကျမ်း။|ခရိ၊)?|Zech)
			)(?:(?=[\d\s\xa0.:,;\x1e\x1f&\(\)\uff08\uff09\[\]/"'\*=~\-\u2013\u2014])|$)///gi
	,
		osis: ["Mal"]
		regexp: ///(^|#{bcv_parser::regexps.pre_book})(
		(?:မာ(?:[\s\xa0]*လ[\s\xa0]*ခိ[\s\xa0]*အ[\s\xa0]*နာ[\s\xa0]*ဂ[\s\xa0]*တ္တိ[\s\xa0]*ကျမ်း။|လ(?:ခိ၊|ခိ)?)|Mal)
			)(?:(?=[\d\s\xa0.:,;\x1e\x1f&\(\)\uff08\uff09\[\]/"'\*=~\-\u2013\u2014])|$)///gi
	,
		osis: ["Matt"]
		regexp: ///(^|#{bcv_parser::regexps.pre_book})(
		(?:ရှင်[\s\xa0]*မဿဲ[\s\xa0]*ခ[\s\xa0]*ရစ်[\s\xa0]*ဝင်။|မ(?:သဲ၊|ဿဲ)|Matt|မ)
			)(?:(?=[\d\s\xa0.:,;\x1e\x1f&\(\)\uff08\uff09\[\]/"'\*=~\-\u2013\u2014])|$)///gi
	,
		osis: ["Mark"]
		regexp: ///(^|#{bcv_parser::regexps.pre_book})(
		(?:ရှင်[\s\xa0]*မာ[\s\xa0]*ကု[\s\xa0]*ခ[\s\xa0]*ရစ်[\s\xa0]*ဝင်။|မာကု၊|Mark|မာ)
			)(?:(?=[\d\s\xa0.:,;\x1e\x1f&\(\)\uff08\uff09\[\]/"'\*=~\-\u2013\u2014])|$)///gi
	,
		osis: ["Luke"]
		regexp: ///(^|#{bcv_parser::regexps.pre_book})(
		(?:ရှင်[\s\xa0]*လု[\s\xa0]*ကာ[\s\xa0]*ခ[\s\xa0]*ရစ်[\s\xa0]*ဝင်။|လုကာ၊|လု(?:ကာ)?|Luke)
			)(?:(?=[\d\s\xa0.:,;\x1e\x1f&\(\)\uff08\uff09\[\]/"'\*=~\-\u2013\u2014])|$)///gi
	,
		osis: ["1John"]
		regexp: ///(^|[^0-9A-Za-zªµºÀ-ÖØ-öø-ɏက-ဪိ-ူဲ-့္-်ွ-ဿၐ-ၕၘ-ၡၥ-ၦၮ-ႂႅ-ႆႍ-ႎႝḀ-ỿⱠ-ⱿꜢ-ꞈꞋ-ꞎꞐ-ꞓꞠ-Ɦꟸ-ꟿꩠ-ꩶꩺ])(
		(?:ရှင်[\s\xa0]*ယော[\s\xa0]*ဟန်[\s\xa0]*ဩ[\s\xa0]*ဝါ[\s\xa0]*ဒ[\s\xa0]*စာ[\s\xa0]*ပ[\s\xa0]*ထ[\s\xa0]*မ[\s\xa0]*စောင်။|1(?:\.[\s\xa0]*?ယော၊|[\s\xa0]*ယော၊|John|ယော၊)|၁[\s\xa0]*?ယော၊|[1၁][\s\xa0]*ယော)
			)(?:(?=[\d\s\xa0.:,;\x1e\x1f&\(\)\uff08\uff09\[\]/"'\*=~\-\u2013\u2014])|$)///gi
	,
		osis: ["2John"]
		regexp: ///(^|[^0-9A-Za-zªµºÀ-ÖØ-öø-ɏက-ဪိ-ူဲ-့္-်ွ-ဿၐ-ၕၘ-ၡၥ-ၦၮ-ႂႅ-ႆႍ-ႎႝḀ-ỿⱠ-ⱿꜢ-ꞈꞋ-ꞎꞐ-ꞓꞠ-Ɦꟸ-ꟿꩠ-ꩶꩺ])(
		(?:ရှင်[\s\xa0]*ယော[\s\xa0]*ဟန်[\s\xa0]*ဩ[\s\xa0]*ဝါ[\s\xa0]*ဒ[\s\xa0]*စာ[\s\xa0]*ဒု[\s\xa0]*တိ[\s\xa0]*ယ[\s\xa0]*စောင်။|2(?:\.[\s\xa0]*?ယော၊|[\s\xa0]*ယော၊|John|ယော၊)|၂[\s\xa0]*?ယော၊|[2၂][\s\xa0]*ယော)
			)(?:(?=[\d\s\xa0.:,;\x1e\x1f&\(\)\uff08\uff09\[\]/"'\*=~\-\u2013\u2014])|$)///gi
	,
		osis: ["3John"]
		regexp: ///(^|[^0-9A-Za-zªµºÀ-ÖØ-öø-ɏက-ဪိ-ူဲ-့္-်ွ-ဿၐ-ၕၘ-ၡၥ-ၦၮ-ႂႅ-ႆႍ-ႎႝḀ-ỿⱠ-ⱿꜢ-ꞈꞋ-ꞎꞐ-ꞓꞠ-Ɦꟸ-ꟿꩠ-ꩶꩺ])(
		(?:ရှင်[\s\xa0]*ယော[\s\xa0]*ဟန်[\s\xa0]*ဩ[\s\xa0]*ဝါ[\s\xa0]*ဒ[\s\xa0]*စာ[\s\xa0]*တ[\s\xa0]*တိ[\s\xa0]*ယ[\s\xa0]*စောင်။|3(?:\.[\s\xa0]*?ယော၊|[\s\xa0]*ယော၊|John|ယော၊)|၃[\s\xa0]*?ယော၊|[3၃][\s\xa0]*ယော)
			)(?:(?=[\d\s\xa0.:,;\x1e\x1f&\(\)\uff08\uff09\[\]/"'\*=~\-\u2013\u2014])|$)///gi
	,
		osis: ["John"]
		regexp: ///(^|#{bcv_parser::regexps.pre_book})(
		(?:ရှင်[\s\xa0]*ယော[\s\xa0]*ဟန်[\s\xa0]*ခ[\s\xa0]*ရစ်[\s\xa0]*ဝင်။|ယောဟန်၊|ယော(?:ဟန်)?|John)
			)(?:(?=[\d\s\xa0.:,;\x1e\x1f&\(\)\uff08\uff09\[\]/"'\*=~\-\u2013\u2014])|$)///gi
	,
		osis: ["Acts"]
		regexp: ///(^|#{bcv_parser::regexps.pre_book})(
		(?:တ(?:[\s\xa0]*မန်[\s\xa0]*တော်[\s\xa0]*ဝ[\s\xa0]*တ္ထု။|မန်၊)?|Acts)
			)(?:(?=[\d\s\xa0.:,;\x1e\x1f&\(\)\uff08\uff09\[\]/"'\*=~\-\u2013\u2014])|$)///gi
	,
		osis: ["Rom"]
		regexp: ///(^|#{bcv_parser::regexps.pre_book})(
		(?:ရော(?:[\s\xa0]*မ[\s\xa0]*ဩ[\s\xa0]*ဝါ[\s\xa0]*ဒ[\s\xa0]*စာ။|မ၊|မ)?|Rom)
			)(?:(?=[\d\s\xa0.:,;\x1e\x1f&\(\)\uff08\uff09\[\]/"'\*=~\-\u2013\u2014])|$)///gi
	,
		osis: ["2Cor"]
		regexp: ///(^|[^0-9A-Za-zªµºÀ-ÖØ-öø-ɏက-ဪိ-ူဲ-့္-်ွ-ဿၐ-ၕၘ-ၡၥ-ၦၮ-ႂႅ-ႆႍ-ႎႝḀ-ỿⱠ-ⱿꜢ-ꞈꞋ-ꞎꞐ-ꞓꞠ-Ɦꟸ-ꟿꩠ-ꩶꩺ])(
		(?:ကော[\s\xa0]*ရိ[\s\xa0]*န္သု[\s\xa0]*ဩ[\s\xa0]*ဝါ[\s\xa0]*ဒ[\s\xa0]*စာ[\s\xa0]*ဒု[\s\xa0]*တိ[\s\xa0]*ယ[\s\xa0]*စောင်။|2(?:\.[\s\xa0]*?ကော၊|[\s\xa0]*ကော၊|ကော၊|Cor)|၂[\s\xa0]*?ကော၊|[2၂][\s\xa0]*ကော)
			)(?:(?=[\d\s\xa0.:,;\x1e\x1f&\(\)\uff08\uff09\[\]/"'\*=~\-\u2013\u2014])|$)///gi
	,
		osis: ["1Cor"]
		regexp: ///(^|[^0-9A-Za-zªµºÀ-ÖØ-öø-ɏက-ဪိ-ူဲ-့္-်ွ-ဿၐ-ၕၘ-ၡၥ-ၦၮ-ႂႅ-ႆႍ-ႎႝḀ-ỿⱠ-ⱿꜢ-ꞈꞋ-ꞎꞐ-ꞓꞠ-Ɦꟸ-ꟿꩠ-ꩶꩺ])(
		(?:ကော[\s\xa0]*ရိ[\s\xa0]*န္သု[\s\xa0]*ဩ[\s\xa0]*ဝါ[\s\xa0]*ဒ[\s\xa0]*စာ[\s\xa0]*ပ[\s\xa0]*ထ[\s\xa0]*မ[\s\xa0]*စောင်။|1(?:\.[\s\xa0]*?ကော၊|[\s\xa0]*ကော၊|‌ကော၊|ကော၊|Cor)|၁(?:[\s\xa0]*|‌)?ကော၊|[1၁][\s\xa0]*ကော)
			)(?:(?=[\d\s\xa0.:,;\x1e\x1f&\(\)\uff08\uff09\[\]/"'\*=~\-\u2013\u2014])|$)///gi
	,
		osis: ["Gal"]
		regexp: ///(^|#{bcv_parser::regexps.pre_book})(
		(?:ဂလာတိ၊?)|(?:ဂ[\s\xa0]*လ(?:ာ[\s\xa0]*တိ[\s\xa0]*ဩ[\s\xa0]*ဝါ[\s\xa0]*ဒ[\s\xa0]*စာ။)?|Gal)
			)(?:(?=[\d\s\xa0.:,;\x1e\x1f&\(\)\uff08\uff09\[\]/"'\*=~\-\u2013\u2014])|$)///gi
	,
		osis: ["Eph"]
		regexp: ///(^|#{bcv_parser::regexps.pre_book})(
		(?:ဧ(?:[\s\xa0]*ဖက်[\s\xa0]*ဩ[\s\xa0]*ဝါ[\s\xa0]*ဒ[\s\xa0]*စာ။|ဖက်၊|ဖက်)?|Eph)
			)(?:(?=[\d\s\xa0.:,;\x1e\x1f&\(\)\uff08\uff09\[\]/"'\*=~\-\u2013\u2014])|$)///gi
	,
		osis: ["Phil"]
		regexp: ///(^|#{bcv_parser::regexps.pre_book})(
		(?:ဖိ(?:[\s\xa0]*လိ[\s\xa0]*ပ္ပိ[\s\xa0]*ဩ[\s\xa0]*ဝါ[\s\xa0]*ဒ[\s\xa0]*စာ။|လိပ္ပိ၊)?|Phil)
			)(?:(?=[\d\s\xa0.:,;\x1e\x1f&\(\)\uff08\uff09\[\]/"'\*=~\-\u2013\u2014])|$)///gi
	,
		osis: ["Col"]
		regexp: ///(^|#{bcv_parser::regexps.pre_book})(
		(?:ကော(?:[\s\xa0]*လော[\s\xa0]*သဲ[\s\xa0]*ဩ[\s\xa0]*ဝါ[\s\xa0]*ဒ[\s\xa0]*စာ။|‌လောသဲ|လောသဲ၊)?|Col)
			)(?:(?=[\d\s\xa0.:,;\x1e\x1f&\(\)\uff08\uff09\[\]/"'\*=~\-\u2013\u2014])|$)///gi
	,
		osis: ["2Thess"]
		regexp: ///(^|[^0-9A-Za-zªµºÀ-ÖØ-öø-ɏက-ဪိ-ူဲ-့္-်ွ-ဿၐ-ၕၘ-ၡၥ-ၦၮ-ႂႅ-ႆႍ-ႎႝḀ-ỿⱠ-ⱿꜢ-ꞈꞋ-ꞎꞐ-ꞓꞠ-Ɦꟸ-ꟿꩠ-ꩶꩺ])(
		(?:သက်[\s\xa0]*သာ[\s\xa0]*လော[\s\xa0]*နိတ်[\s\xa0]*ဩ[\s\xa0]*ဝါ[\s\xa0]*ဒ[\s\xa0]*စာ[\s\xa0]*ဒု[\s\xa0]*တိ[\s\xa0]*ယ[\s\xa0]*စောင်။|2(?:\.[\s\xa0]*?သက်၊|Thess|[\s\xa0]*သက်၊|သက်၊)|၂[\s\xa0]*?သက်၊|[2၂][\s\xa0]*သက်)
			)(?:(?=[\d\s\xa0.:,;\x1e\x1f&\(\)\uff08\uff09\[\]/"'\*=~\-\u2013\u2014])|$)///gi
	,
		osis: ["1Thess"]
		regexp: ///(^|[^0-9A-Za-zªµºÀ-ÖØ-öø-ɏက-ဪိ-ူဲ-့္-်ွ-ဿၐ-ၕၘ-ၡၥ-ၦၮ-ႂႅ-ႆႍ-ႎႝḀ-ỿⱠ-ⱿꜢ-ꞈꞋ-ꞎꞐ-ꞓꞠ-Ɦꟸ-ꟿꩠ-ꩶꩺ])(
		(?:သက်[\s\xa0]*သာ[\s\xa0]*လော[\s\xa0]*နိတ်[\s\xa0]*ဩ[\s\xa0]*ဝါ[\s\xa0]*ဒ[\s\xa0]*စာ[\s\xa0]*ပ[\s\xa0]*ထ[\s\xa0]*မ[\s\xa0]*စောင်။|1(?:\.[\s\xa0]*?သက်၊|Thess|[\s\xa0]*သက်၊|သက်၊)|၁[\s\xa0]*?သက်၊|[1၁][\s\xa0]*သက်)
			)(?:(?=[\d\s\xa0.:,;\x1e\x1f&\(\)\uff08\uff09\[\]/"'\*=~\-\u2013\u2014])|$)///gi
	,
		osis: ["2Tim"]
		regexp: ///(^|[^0-9A-Za-zªµºÀ-ÖØ-öø-ɏက-ဪိ-ူဲ-့္-်ွ-ဿၐ-ၕၘ-ၡၥ-ၦၮ-ႂႅ-ႆႍ-ႎႝḀ-ỿⱠ-ⱿꜢ-ꞈꞋ-ꞎꞐ-ꞓꞠ-Ɦꟸ-ꟿꩠ-ꩶꩺ])(
		(?:တိ[\s\xa0]*မော[\s\xa0]*သေ[\s\xa0]*ဩ[\s\xa0]*ဝါ[\s\xa0]*ဒ[\s\xa0]*စာ[\s\xa0]*ဒု[\s\xa0]*တိ[\s\xa0]*ယ[\s\xa0]*စောင်။|2(?:\.[\s\xa0]*?တိ၊|[\s\xa0]*တိ၊|Tim|တိ၊)|၂[\s\xa0]*?တိ၊|[2၂][\s\xa0]*တိ)
			)(?:(?=[\d\s\xa0.:,;\x1e\x1f&\(\)\uff08\uff09\[\]/"'\*=~\-\u2013\u2014])|$)///gi
	,
		osis: ["1Tim"]
		regexp: ///(^|[^0-9A-Za-zªµºÀ-ÖØ-öø-ɏက-ဪိ-ူဲ-့္-်ွ-ဿၐ-ၕၘ-ၡၥ-ၦၮ-ႂႅ-ႆႍ-ႎႝḀ-ỿⱠ-ⱿꜢ-ꞈꞋ-ꞎꞐ-ꞓꞠ-Ɦꟸ-ꟿꩠ-ꩶꩺ])(
		(?:တိ[\s\xa0]*မော[\s\xa0]*သေ[\s\xa0]*ဩ[\s\xa0]*ဝါ[\s\xa0]*ဒ[\s\xa0]*စာ[\s\xa0]*ပ[\s\xa0]*ထ[\s\xa0]*မ[\s\xa0]*စောင်။|1(?:\.[\s\xa0]*?တိ၊|[\s\xa0]*တိ၊|Tim|တိ၊)|၁[\s\xa0]*?တိ၊|[1၁][\s\xa0]*တိ)
			)(?:(?=[\d\s\xa0.:,;\x1e\x1f&\(\)\uff08\uff09\[\]/"'\*=~\-\u2013\u2014])|$)///gi
	,
		osis: ["Titus"]
		regexp: ///(^|#{bcv_parser::regexps.pre_book})(
		(?:တိ(?:[\s\xa0]*တု[\s\xa0]*ဩ[\s\xa0]*ဝါ[\s\xa0]*ဒ[\s\xa0]*စာ။|တု၊)?|Titus)
			)(?:(?=[\d\s\xa0.:,;\x1e\x1f&\(\)\uff08\uff09\[\]/"'\*=~\-\u2013\u2014])|$)///gi
	,
		osis: ["Phlm"]
		regexp: ///(^|#{bcv_parser::regexps.pre_book})(
		(?:ဖိ(?:[\s\xa0]*လေ[\s\xa0]*မုန်[\s\xa0]*ဩ[\s\xa0]*ဝါ[\s\xa0]*ဒ[\s\xa0]*စာ။|လေ)|Phlm)
			)(?:(?=[\d\s\xa0.:,;\x1e\x1f&\(\)\uff08\uff09\[\]/"'\*=~\-\u2013\u2014])|$)///gi
	,
		osis: ["Heb"]
		regexp: ///(^|#{bcv_parser::regexps.pre_book})(
		(?:ဟေဗြဲ၊)|(?:ဟေ(?:[\s\xa0]*ဗြဲ(?:[\s\xa0]*ဩ[\s\xa0]*ဝါ[\s\xa0]*ဒ[\s\xa0]*စာ။)?|ဗြဲ)|Heb)
			)(?:(?=[\d\s\xa0.:,;\x1e\x1f&\(\)\uff08\uff09\[\]/"'\*=~\-\u2013\u2014])|$)///gi
	,
		osis: ["Jas"]
		regexp: ///(^|#{bcv_parser::regexps.pre_book})(
		(?:ရှင်[\s\xa0]*ယာ[\s\xa0]*ကုပ်[\s\xa0]*ဩ[\s\xa0]*ဝါ[\s\xa0]*ဒ[\s\xa0]*စာ။|ယာကုပ်၊|Jas|ယာ)
			)(?:(?=[\d\s\xa0.:,;\x1e\x1f&\(\)\uff08\uff09\[\]/"'\*=~\-\u2013\u2014])|$)///gi
	,
		osis: ["2Pet"]
		regexp: ///(^|[^0-9A-Za-zªµºÀ-ÖØ-öø-ɏက-ဪိ-ူဲ-့္-်ွ-ဿၐ-ၕၘ-ၡၥ-ၦၮ-ႂႅ-ႆႍ-ႎႝḀ-ỿⱠ-ⱿꜢ-ꞈꞋ-ꞎꞐ-ꞓꞠ-Ɦꟸ-ꟿꩠ-ꩶꩺ])(
		(?:ရှင်[\s\xa0]*ပေ[\s\xa0]*တ[\s\xa0]*ရု[\s\xa0]*ဩ[\s\xa0]*ဝါ[\s\xa0]*ဒ[\s\xa0]*စာ[\s\xa0]*ဒု[\s\xa0]*တိ[\s\xa0]*ယ[\s\xa0]*စောင်။|2(?:\.[\s\xa0]*?ပေ၊|[\s\xa0]*ပေ၊|Pet|ပေ၊)|၂[\s\xa0]*?ပေ၊|[2၂][\s\xa0]*ပေ)
			)(?:(?=[\d\s\xa0.:,;\x1e\x1f&\(\)\uff08\uff09\[\]/"'\*=~\-\u2013\u2014])|$)///gi
	,
		osis: ["1Pet"]
		regexp: ///(^|[^0-9A-Za-zªµºÀ-ÖØ-öø-ɏက-ဪိ-ူဲ-့္-်ွ-ဿၐ-ၕၘ-ၡၥ-ၦၮ-ႂႅ-ႆႍ-ႎႝḀ-ỿⱠ-ⱿꜢ-ꞈꞋ-ꞎꞐ-ꞓꞠ-Ɦꟸ-ꟿꩠ-ꩶꩺ])(
		(?:ရှင်[\s\xa0]*ပေ[\s\xa0]*တ[\s\xa0]*ရု[\s\xa0]*သြ[\s\xa0]*ဝါ[\s\xa0]*ဒ[\s\xa0]*စာ[\s\xa0]*ပ[\s\xa0]*ထ[\s\xa0]*မ[\s\xa0]*စောင်။|1(?:\.[\s\xa0]*?ပေ၊|[\s\xa0‌]*ပေ၊|Pet|ပေ၊)|၁[\s\xa0‌]*?ပေ၊|(?:၁[\s\xa0‌]*|1[\s\xa0‌]*)ပေ)
			)(?:(?=[\d\s\xa0.:,;\x1e\x1f&\(\)\uff08\uff09\[\]/"'\*=~\-\u2013\u2014])|$)///gi
	,
		osis: ["Jude"]
		regexp: ///(^|#{bcv_parser::regexps.pre_book})(
		(?:ရှင်[\s\xa0]*ယု[\s\xa0]*ဒ[\s\xa0]*ဩ[\s\xa0]*ဝါ[\s\xa0]*ဒ[\s\xa0]*စာ။|Jude|ယု)
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
