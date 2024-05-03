bcv_parser::regexps.space = "[\\s\\xa0]"
bcv_parser::regexps.escaped_passage = ///
	(?:^ | [^\x1f\x1e\dA-Za-zªµºÀ-ÖØ-öø-ɏḀ-ỿⱠ-Ɀ々-〆〪-〭〱-〵〻-〼㐀-䶵一-鿌Ꜣ-ꞈꞋ-ꞎꞐ-ꞓꞠ-Ɦꟸ-ꟿ豈-舘並-龎] )	# Beginning of string or not in the middle of a word or immediately following another book. Only count a book if it's part of a sequence: `Matt5John3` is OK, but not `1Matt5John3`
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
				  | and | ff | 章、 | 章 | ～ | ~ | 〜 | ∼ | と | 、 | 節 | ：
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
bcv_parser::regexps.pre_book = "[^A-Za-zªµºÀ-ÖØ-öø-ɏḀ-ỿⱠ-Ɀ々-〆〪-〭〱-〵〻-〼㐀-䶵一-鿌Ꜣ-ꞈꞋ-ꞎꞐ-ꞓꞠ-Ɦꟸ-ꟿ豈-舘並-龎]"

bcv_parser::regexps.first = "一\\.?#{bcv_parser::regexps.space}*"
bcv_parser::regexps.second = "二\\.?#{bcv_parser::regexps.space}*"
bcv_parser::regexps.third = "三\\.?#{bcv_parser::regexps.space}*"
bcv_parser::regexps.range_and = "(?:[&\u2013\u2014-]|(?:and|と|章、|、)|(?:～|~|〜|∼))"
bcv_parser::regexps.range_only = "(?:[\u2013\u2014-]|(?:～|~|〜|∼))"
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
		(?:創(?:世記|世)?|Gen)
			)(?:(?=[\d\s\xa0.:,;\x1e\x1f&\(\)\uff08\uff09\[\]/"'\*=~\-\u2013\u2014])|$)///gi
	,
		osis: ["Exod"]
		regexp: ///(^|#{bcv_parser::regexps.pre_book})(
		(?:出(?:エ[シジ][フプ]ト記?)?|エ[シジ][フプ]ト記|Exod)
			)(?:(?=[\d\s\xa0.:,;\x1e\x1f&\(\)\uff08\uff09\[\]/"'\*=~\-\u2013\u2014])|$)///gi
	,
		osis: ["Bel"]
		apocrypha: true
		regexp: ///(^|#{bcv_parser::regexps.pre_book})(
		(?:ベルと竜|Bel)
			)(?:(?=[\d\s\xa0.:,;\x1e\x1f&\(\)\uff08\uff09\[\]/"'\*=~\-\u2013\u2014])|$)///gi
	,
		osis: ["Lev"]
		regexp: ///(^|#{bcv_parser::regexps.pre_book})(
		(?:レ(?:[ヒビ]記|[ヒビ])|Lev)
			)(?:(?=[\d\s\xa0.:,;\x1e\x1f&\(\)\uff08\uff09\[\]/"'\*=~\-\u2013\u2014])|$)///gi
	,
		osis: ["Num"]
		regexp: ///(^|#{bcv_parser::regexps.pre_book})(
		(?:民(?:数記|数)?|Num)
			)(?:(?=[\d\s\xa0.:,;\x1e\x1f&\(\)\uff08\uff09\[\]/"'\*=~\-\u2013\u2014])|$)///gi
	,
		osis: ["Sir"]
		apocrypha: true
		regexp: ///(^|#{bcv_parser::regexps.pre_book})(
		(?:シラ書?|Sir)
			)(?:(?=[\d\s\xa0.:,;\x1e\x1f&\(\)\uff08\uff09\[\]/"'\*=~\-\u2013\u2014])|$)///gi
	,
		osis: ["Wis"]
		apocrypha: true
		regexp: ///(^|#{bcv_parser::regexps.pre_book})(
		(?:知恵(?:の書)?|Wis)
			)(?:(?=[\d\s\xa0.:,;\x1e\x1f&\(\)\uff08\uff09\[\]/"'\*=~\-\u2013\u2014])|$)///gi
	,
		osis: ["Lam"]
		regexp: ///(^|#{bcv_parser::regexps.pre_book})(
		(?:エレミヤの哀歌|Lam|哀歌|哀)
			)(?:(?=[\d\s\xa0.:,;\x1e\x1f&\(\)\uff08\uff09\[\]/"'\*=~\-\u2013\u2014])|$)///gi
	,
		osis: ["EpJer"]
		apocrypha: true
		regexp: ///(^|#{bcv_parser::regexps.pre_book})(
		(?:エレミヤ(?:の手紙|・手)|EpJer)
			)(?:(?=[\d\s\xa0.:,;\x1e\x1f&\(\)\uff08\uff09\[\]/"'\*=~\-\u2013\u2014])|$)///gi
	,
		osis: ["Rev"]
		regexp: ///(^|#{bcv_parser::regexps.pre_book})(
		(?:ヨハネの[默黙]示録|黙示録|Rev|黙示?)
			)(?:(?=[\d\s\xa0.:,;\x1e\x1f&\(\)\uff08\uff09\[\]/"'\*=~\-\u2013\u2014])|$)///gi
	,
		osis: ["PrMan"]
		apocrypha: true
		regexp: ///(^|#{bcv_parser::regexps.pre_book})(
		(?:マナセの祈り|PrMan)
			)(?:(?=[\d\s\xa0.:,;\x1e\x1f&\(\)\uff08\uff09\[\]/"'\*=~\-\u2013\u2014])|$)///gi
	,
		osis: ["Deut"]
		regexp: ///(^|#{bcv_parser::regexps.pre_book})(
		(?:Deut|申(?:命記|命)?)
			)(?:(?=[\d\s\xa0.:,;\x1e\x1f&\(\)\uff08\uff09\[\]/"'\*=~\-\u2013\u2014])|$)///gi
	,
		osis: ["Josh"]
		regexp: ///(^|#{bcv_parser::regexps.pre_book})(
		(?:ヨシ(?:ュ(?:ア記?)?)?|Josh)
			)(?:(?=[\d\s\xa0.:,;\x1e\x1f&\(\)\uff08\uff09\[\]/"'\*=~\-\u2013\u2014])|$)///gi
	,
		osis: ["Judg"]
		regexp: ///(^|#{bcv_parser::regexps.pre_book})(
		(?:Judg|士(?:師記|師)?)
			)(?:(?=[\d\s\xa0.:,;\x1e\x1f&\(\)\uff08\uff09\[\]/"'\*=~\-\u2013\u2014])|$)///gi
	,
		osis: ["Ruth"]
		regexp: ///(^|#{bcv_parser::regexps.pre_book})(
		(?:Ruth|ル(?:ツ記|ツ|ト))
			)(?:(?=[\d\s\xa0.:,;\x1e\x1f&\(\)\uff08\uff09\[\]/"'\*=~\-\u2013\u2014])|$)///gi
	,
		osis: ["1Esd"]
		apocrypha: true
		regexp: ///(^|[^0-9A-Za-zªµºÀ-ÖØ-öø-ɏḀ-ỿⱠ-Ɀ々-〆〪-〭〱-〵〻-〼㐀-䶵一-鿌Ꜣ-ꞈꞋ-ꞎꞐ-ꞓꞠ-Ɦꟸ-ꟿ豈-舘並-龎])(
		(?:エズドラ第一巻|1Esd)
			)(?:(?=[\d\s\xa0.:,;\x1e\x1f&\(\)\uff08\uff09\[\]/"'\*=~\-\u2013\u2014])|$)///gi
	,
		osis: ["2Esd"]
		apocrypha: true
		regexp: ///(^|[^0-9A-Za-zªµºÀ-ÖØ-öø-ɏḀ-ỿⱠ-Ɀ々-〆〪-〭〱-〵〻-〼㐀-䶵一-鿌Ꜣ-ꞈꞋ-ꞎꞐ-ꞓꞠ-Ɦꟸ-ꟿ豈-舘並-龎])(
		(?:エズドラ第二巻|2Esd)
			)(?:(?=[\d\s\xa0.:,;\x1e\x1f&\(\)\uff08\uff09\[\]/"'\*=~\-\u2013\u2014])|$)///gi
	,
		osis: ["Isa"]
		regexp: ///(^|#{bcv_parser::regexps.pre_book})(
		(?:イ(?:[サザ](?:ヤ書?)?|シャ)|Isa)
			)(?:(?=[\d\s\xa0.:,;\x1e\x1f&\(\)\uff08\uff09\[\]/"'\*=~\-\u2013\u2014])|$)///gi
	,
		osis: ["2Sam"]
		regexp: ///(^|[^0-9A-Za-zªµºÀ-ÖØ-öø-ɏḀ-ỿⱠ-Ɀ々-〆〪-〭〱-〵〻-〼㐀-䶵一-鿌Ꜣ-ꞈꞋ-ꞎꞐ-ꞓꞠ-Ɦꟸ-ꟿ豈-舘並-龎])(
		(?:列王記第二巻|サム(?:エル(?:記[Ⅱ下]|後書|[\s\xa0]*2|下)|下)|Ⅱ(?:サムエル|シェム)|2Sam|Ⅱサム)
			)(?:(?=[\d\s\xa0.:,;\x1e\x1f&\(\)\uff08\uff09\[\]/"'\*=~\-\u2013\u2014])|$)///gi
	,
		osis: ["1Sam"]
		regexp: ///(^|[^0-9A-Za-zªµºÀ-ÖØ-öø-ɏḀ-ỿⱠ-Ɀ々-〆〪-〭〱-〵〻-〼㐀-䶵一-鿌Ꜣ-ꞈꞋ-ꞎꞐ-ꞓꞠ-Ɦꟸ-ꟿ豈-舘並-龎])(
		(?:列王記第一巻|サム(?:エル(?:記[Ⅰ上]|前書|[\s\xa0]*1|上)|上)|Ⅰ(?:サムエル|シェム)|1Sam|Ⅰサム)
			)(?:(?=[\d\s\xa0.:,;\x1e\x1f&\(\)\uff08\uff09\[\]/"'\*=~\-\u2013\u2014])|$)///gi
	,
		osis: ["2Kgs"]
		regexp: ///(^|[^0-9A-Za-zªµºÀ-ÖØ-öø-ɏḀ-ỿⱠ-Ɀ々-〆〪-〭〱-〵〻-〼㐀-䶵一-鿌Ꜣ-ꞈꞋ-ꞎꞐ-ꞓꞠ-Ɦꟸ-ꟿ豈-舘並-龎])(
		(?:列(?:王(?:記(?:第四巻|[Ⅱ下])|紀略?下|[\s\xa0]*2)|下)|2Kgs|Ⅱ列王|王下)
			)(?:(?=[\d\s\xa0.:,;\x1e\x1f&\(\)\uff08\uff09\[\]/"'\*=~\-\u2013\u2014])|$)///gi
	,
		osis: ["1Kgs"]
		regexp: ///(^|[^0-9A-Za-zªµºÀ-ÖØ-öø-ɏḀ-ỿⱠ-Ɀ々-〆〪-〭〱-〵〻-〼㐀-䶵一-鿌Ꜣ-ꞈꞋ-ꞎꞐ-ꞓꞠ-Ɦꟸ-ꟿ豈-舘並-龎])(
		(?:列(?:王(?:記(?:第三巻|[Ⅰ上])|紀略?上|[\s\xa0]*1)|上)|1Kgs|Ⅰ列王|王上)
			)(?:(?=[\d\s\xa0.:,;\x1e\x1f&\(\)\uff08\uff09\[\]/"'\*=~\-\u2013\u2014])|$)///gi
	,
		osis: ["2Chr"]
		regexp: ///(^|[^0-9A-Za-zªµºÀ-ÖØ-öø-ɏḀ-ỿⱠ-Ɀ々-〆〪-〭〱-〵〻-〼㐀-䶵一-鿌Ꜣ-ꞈꞋ-ꞎꞐ-ꞓꞠ-Ɦꟸ-ꟿ豈-舘並-龎])(
		(?:歴(?:代(?:誌(?:[\s\xa0]*2|[Ⅱ下])|志略?下|史下)|下)|2Chr|Ⅱ歴代|代下)
			)(?:(?=[\d\s\xa0.:,;\x1e\x1f&\(\)\uff08\uff09\[\]/"'\*=~\-\u2013\u2014])|$)///gi
	,
		osis: ["1Chr"]
		regexp: ///(^|[^0-9A-Za-zªµºÀ-ÖØ-öø-ɏḀ-ỿⱠ-Ɀ々-〆〪-〭〱-〵〻-〼㐀-䶵一-鿌Ꜣ-ꞈꞋ-ꞎꞐ-ꞓꞠ-Ɦꟸ-ꟿ豈-舘並-龎])(
		(?:歴(?:代(?:誌(?:[\s\xa0]*1|[Ⅰ上])|志略?上|史上)|上)|1Chr|Ⅰ歴代|代上)
			)(?:(?=[\d\s\xa0.:,;\x1e\x1f&\(\)\uff08\uff09\[\]/"'\*=~\-\u2013\u2014])|$)///gi
	,
		osis: ["Ezra"]
		regexp: ///(^|#{bcv_parser::regexps.pre_book})(
		(?:エ(?:[スズ]ラ[書記]|[スズ]ラ?)|Ezra)
			)(?:(?=[\d\s\xa0.:,;\x1e\x1f&\(\)\uff08\uff09\[\]/"'\*=~\-\u2013\u2014])|$)///gi
	,
		osis: ["Neh"]
		regexp: ///(^|#{bcv_parser::regexps.pre_book})(
		(?:ネヘ(?:ミヤ(?:[\s\xa0]*記|記)?)?|Neh)
			)(?:(?=[\d\s\xa0.:,;\x1e\x1f&\(\)\uff08\uff09\[\]/"'\*=~\-\u2013\u2014])|$)///gi
	,
		osis: ["GkEsth"]
		apocrypha: true
		regexp: ///(^|#{bcv_parser::regexps.pre_book})(
		(?:エステル記補遺|GkEsth)
			)(?:(?=[\d\s\xa0.:,;\x1e\x1f&\(\)\uff08\uff09\[\]/"'\*=~\-\u2013\u2014])|$)///gi
	,
		osis: ["Esth"]
		regexp: ///(^|#{bcv_parser::regexps.pre_book})(
		(?:エステル(?:[\s\xa0]*記|[書記])?|Esth)
			)(?:(?=[\d\s\xa0.:,;\x1e\x1f&\(\)\uff08\uff09\[\]/"'\*=~\-\u2013\u2014])|$)///gi
	,
		osis: ["Job"]
		regexp: ///(^|#{bcv_parser::regexps.pre_book})(
		(?:ヨ[フブ](?:[\s\xa0]*記|記)?|Job|イヨ)
			)(?:(?=[\d\s\xa0.:,;\x1e\x1f&\(\)\uff08\uff09\[\]/"'\*=~\-\u2013\u2014])|$)///gi
	,
		osis: ["Ps"]
		regexp: ///(^|#{bcv_parser::regexps.pre_book})(
		(?:詩(?:篇(?:\/聖詠)?|編)?|Ps)
			)(?:(?=[\d\s\xa0.:,;\x1e\x1f&\(\)\uff08\uff09\[\]/"'\*=~\-\u2013\u2014])|$)///gi
	,
		osis: ["PrAzar"]
		apocrypha: true
		regexp: ///(^|#{bcv_parser::regexps.pre_book})(
		(?:アザルヤの祈り|PrAzar)
			)(?:(?=[\d\s\xa0.:,;\x1e\x1f&\(\)\uff08\uff09\[\]/"'\*=~\-\u2013\u2014])|$)///gi
	,
		osis: ["Prov"]
		regexp: ///(^|#{bcv_parser::regexps.pre_book})(
		(?:箴(?:言(?:[\s\xa0]*知恵の泉)?)?|格言の書|Prov|格)
			)(?:(?=[\d\s\xa0.:,;\x1e\x1f&\(\)\uff08\uff09\[\]/"'\*=~\-\u2013\u2014])|$)///gi
	,
		osis: ["Eccl"]
		regexp: ///(^|#{bcv_parser::regexps.pre_book})(
		(?:コヘ(?:レト(?:の(?:こと[はば]|言葉))?)?|伝道者?の書|伝道(?:者の)?|Eccl|傳道之書)
			)(?:(?=[\d\s\xa0.:,;\x1e\x1f&\(\)\uff08\uff09\[\]/"'\*=~\-\u2013\u2014])|$)///gi
	,
		osis: ["SgThree"]
		apocrypha: true
		regexp: ///(^|#{bcv_parser::regexps.pre_book})(
		(?:三(?:人の若者の賛|童兒の)歌|SgThree)
			)(?:(?=[\d\s\xa0.:,;\x1e\x1f&\(\)\uff08\uff09\[\]/"'\*=~\-\u2013\u2014])|$)///gi
	,
		osis: ["Song"]
		regexp: ///(^|#{bcv_parser::regexps.pre_book})(
		(?:(?:諸歌の|雅)歌|Song|雅)
			)(?:(?=[\d\s\xa0.:,;\x1e\x1f&\(\)\uff08\uff09\[\]/"'\*=~\-\u2013\u2014])|$)///gi
	,
		osis: ["Jer"]
		regexp: ///(^|#{bcv_parser::regexps.pre_book})(
		(?:ヱレミヤ記|エレ(?:ミヤ書?)?|Jer|イル)
			)(?:(?=[\d\s\xa0.:,;\x1e\x1f&\(\)\uff08\uff09\[\]/"'\*=~\-\u2013\u2014])|$)///gi
	,
		osis: ["Ezek"]
		regexp: ///(^|#{bcv_parser::regexps.pre_book})(
		(?:エ[セゼ](?:キエル書?)?|Ezek)
			)(?:(?=[\d\s\xa0.:,;\x1e\x1f&\(\)\uff08\uff09\[\]/"'\*=~\-\u2013\u2014])|$)///gi
	,
		osis: ["Dan"]
		regexp: ///(^|#{bcv_parser::regexps.pre_book})(
		(?:[タダ]ニ(?:エル書?)?|Dan)
			)(?:(?=[\d\s\xa0.:,;\x1e\x1f&\(\)\uff08\uff09\[\]/"'\*=~\-\u2013\u2014])|$)///gi
	,
		osis: ["Hos"]
		regexp: ///(^|#{bcv_parser::regexps.pre_book})(
		(?:ホ(?:セ(?:ア(?:しょ|書)?)?|シェ)|Hos)
			)(?:(?=[\d\s\xa0.:,;\x1e\x1f&\(\)\uff08\uff09\[\]/"'\*=~\-\u2013\u2014])|$)///gi
	,
		osis: ["Joel"]
		regexp: ///(^|#{bcv_parser::regexps.pre_book})(
		(?:よえるしょ|ヨエル書|Joel|ヨエル?)
			)(?:(?=[\d\s\xa0.:,;\x1e\x1f&\(\)\uff08\uff09\[\]/"'\*=~\-\u2013\u2014])|$)///gi
	,
		osis: ["Amos"]
		regexp: ///(^|#{bcv_parser::regexps.pre_book})(
		(?:アモ(?:ス(?:しょ|書)?)?|Amos)
			)(?:(?=[\d\s\xa0.:,;\x1e\x1f&\(\)\uff08\uff09\[\]/"'\*=~\-\u2013\u2014])|$)///gi
	,
		osis: ["Obad"]
		regexp: ///(^|#{bcv_parser::regexps.pre_book})(
		(?:オ[ハバ](?:[テデ](?:ヤ(?:しょ|書)?|ア書))?|Obad)
			)(?:(?=[\d\s\xa0.:,;\x1e\x1f&\(\)\uff08\uff09\[\]/"'\*=~\-\u2013\u2014])|$)///gi
	,
		osis: ["Jonah"]
		regexp: ///(^|#{bcv_parser::regexps.pre_book})(
		(?:Jonah|ヨナ(?:しょ|書)?)
			)(?:(?=[\d\s\xa0.:,;\x1e\x1f&\(\)\uff08\uff09\[\]/"'\*=~\-\u2013\u2014])|$)///gi
	,
		osis: ["Mic"]
		regexp: ///(^|#{bcv_parser::regexps.pre_book})(
		(?:ミカ(?:しょ|書)?|Mic)
			)(?:(?=[\d\s\xa0.:,;\x1e\x1f&\(\)\uff08\uff09\[\]/"'\*=~\-\u2013\u2014])|$)///gi
	,
		osis: ["Nah"]
		regexp: ///(^|#{bcv_parser::regexps.pre_book})(
		(?:ナ(?:ホ(?:ム(?:しょ|書)?)?|フ)|Nah)
			)(?:(?=[\d\s\xa0.:,;\x1e\x1f&\(\)\uff08\uff09\[\]/"'\*=~\-\u2013\u2014])|$)///gi
	,
		osis: ["Hab"]
		regexp: ///(^|#{bcv_parser::regexps.pre_book})(
		(?:ハ[ハバ](?:クク(?:しょ|書)?)?|Hab)
			)(?:(?=[\d\s\xa0.:,;\x1e\x1f&\(\)\uff08\uff09\[\]/"'\*=~\-\u2013\u2014])|$)///gi
	,
		osis: ["Zeph"]
		regexp: ///(^|#{bcv_parser::regexps.pre_book})(
		(?:[セゼ](?:ファ(?:ニ(?:ヤ(?:しょ|書)?|ア書?))?|[ハパ]ニヤ書|[ハパ]ニヤ|[ハパ])|Zeph|ツェフ)
			)(?:(?=[\d\s\xa0.:,;\x1e\x1f&\(\)\uff08\uff09\[\]/"'\*=~\-\u2013\u2014])|$)///gi
	,
		osis: ["Hag"]
		regexp: ///(^|#{bcv_parser::regexps.pre_book})(
		(?:ハ[カガ](?:イ(?:しょ|書)?)?|Hag)
			)(?:(?=[\d\s\xa0.:,;\x1e\x1f&\(\)\uff08\uff09\[\]/"'\*=~\-\u2013\u2014])|$)///gi
	,
		osis: ["Zech"]
		regexp: ///(^|#{bcv_parser::regexps.pre_book})(
		(?:[セゼ]カ(?:リヤ(?:しょ|書)?)?|Zech)
			)(?:(?=[\d\s\xa0.:,;\x1e\x1f&\(\)\uff08\uff09\[\]/"'\*=~\-\u2013\u2014])|$)///gi
	,
		osis: ["Mal"]
		regexp: ///(^|#{bcv_parser::regexps.pre_book})(
		(?:マラ(?:キ書?)?|Mal)
			)(?:(?=[\d\s\xa0.:,;\x1e\x1f&\(\)\uff08\uff09\[\]/"'\*=~\-\u2013\u2014])|$)///gi
	,
		osis: ["Matt"]
		regexp: ///(^|#{bcv_parser::regexps.pre_book})(
		(?:マタ(?:イ(?:による福音書|[の傳]福音書|福音書|[伝書])?)?|Matt)
			)(?:(?=[\d\s\xa0.:,;\x1e\x1f&\(\)\uff08\uff09\[\]/"'\*=~\-\u2013\u2014])|$)///gi
	,
		osis: ["Mark"]
		regexp: ///(^|#{bcv_parser::regexps.pre_book})(
		(?:マ(?:ルコ(?:による福音書|[の傳]福音書|福音書|[伝書])?|コ)|Mark)
			)(?:(?=[\d\s\xa0.:,;\x1e\x1f&\(\)\uff08\uff09\[\]/"'\*=~\-\u2013\u2014])|$)///gi
	,
		osis: ["Luke"]
		regexp: ///(^|#{bcv_parser::regexps.pre_book})(
		(?:ルカ(?:による福音書|[の傳]福音書|福音書|[伝書])?|Luke)
			)(?:(?=[\d\s\xa0.:,;\x1e\x1f&\(\)\uff08\uff09\[\]/"'\*=~\-\u2013\u2014])|$)///gi
	,
		osis: ["1John"]
		regexp: ///(^|[^0-9A-Za-zªµºÀ-ÖØ-öø-ɏḀ-ỿⱠ-Ɀ々-〆〪-〭〱-〵〻-〼㐀-䶵一-鿌Ꜣ-ꞈꞋ-ꞎꞐ-ꞓꞠ-Ɦꟸ-ꟿ豈-舘並-龎])(
		(?:ヨハ(?:ネ(?:の(?:第一の(?:手紙|書)|手紙[Ⅰ一])|Ⅰ)|Ⅰ)|(?:Ⅰ[\s\xa0]*?|一)ヨハネ|1John|Ⅰヨハ)
			)(?:(?=[\d\s\xa0.:,;\x1e\x1f&\(\)\uff08\uff09\[\]/"'\*=~\-\u2013\u2014])|$)///gi
	,
		osis: ["2John"]
		regexp: ///(^|[^0-9A-Za-zªµºÀ-ÖØ-öø-ɏḀ-ỿⱠ-Ɀ々-〆〪-〭〱-〵〻-〼㐀-䶵一-鿌Ꜣ-ꞈꞋ-ꞎꞐ-ꞓꞠ-Ɦꟸ-ꟿ豈-舘並-龎])(
		(?:ヨハ(?:ネ(?:の(?:第二の(?:手紙|書)|手紙[Ⅱ二])|Ⅱ)|Ⅱ)|(?:Ⅱ[\s\xa0]*?|二)ヨハネ|2John|Ⅱヨハ)
			)(?:(?=[\d\s\xa0.:,;\x1e\x1f&\(\)\uff08\uff09\[\]/"'\*=~\-\u2013\u2014])|$)///gi
	,
		osis: ["3John"]
		regexp: ///(^|[^0-9A-Za-zªµºÀ-ÖØ-öø-ɏḀ-ỿⱠ-Ɀ々-〆〪-〭〱-〵〻-〼㐀-䶵一-鿌Ꜣ-ꞈꞋ-ꞎꞐ-ꞓꞠ-Ɦꟸ-ꟿ豈-舘並-龎])(
		(?:ヨハ(?:ネ(?:の(?:第三の(?:手紙|書)|手紙[Ⅲ三])|Ⅲ)|Ⅲ)|(?:Ⅲ[\s\xa0]*?|三)ヨハネ|3John|Ⅲヨハ)
			)(?:(?=[\d\s\xa0.:,;\x1e\x1f&\(\)\uff08\uff09\[\]/"'\*=~\-\u2013\u2014])|$)///gi
	,
		osis: ["John"]
		regexp: ///(^|#{bcv_parser::regexps.pre_book})(
		(?:ヨハ(?:ネ(?:による福音書|[の傳]福音書|福音書|伝)?)?|John)
			)(?:(?=[\d\s\xa0.:,;\x1e\x1f&\(\)\uff08\uff09\[\]/"'\*=~\-\u2013\u2014])|$)///gi
	,
		osis: ["Acts"]
		regexp: ///(^|#{bcv_parser::regexps.pre_book})(
		(?:使徒(?:言行録|の働き|行[伝傳録]|書)?|Acts|行)
			)(?:(?=[\d\s\xa0.:,;\x1e\x1f&\(\)\uff08\uff09\[\]/"'\*=~\-\u2013\u2014])|$)///gi
	,
		osis: ["Rom"]
		regexp: ///(^|#{bcv_parser::regexps.pre_book})(
		(?:ロ(?:ーマ(?:の信徒への手紙|人への手紙|人へ|書)?|マ(?:人への書)?)|Rom)
			)(?:(?=[\d\s\xa0.:,;\x1e\x1f&\(\)\uff08\uff09\[\]/"'\*=~\-\u2013\u2014])|$)///gi
	,
		osis: ["2Cor"]
		regexp: ///(^|[^0-9A-Za-zªµºÀ-ÖØ-öø-ɏḀ-ỿⱠ-Ɀ々-〆〪-〭〱-〵〻-〼㐀-䶵一-鿌Ꜣ-ꞈꞋ-ꞎꞐ-ꞓꞠ-Ɦꟸ-ꟿ豈-舘並-龎])(
		(?:コリ(?:ント(?:人への(?:第二の手紙|手紙[Ⅱ二]|後の書)|の信徒への手紙二|[\s\xa0]*2|後書|Ⅱ)|Ⅱ)|Ⅱ(?:[\s\xa0]*コリント人へ|コリント)|IIコリ|2Cor|Ⅱコリ)
			)(?:(?=[\d\s\xa0.:,;\x1e\x1f&\(\)\uff08\uff09\[\]/"'\*=~\-\u2013\u2014])|$)///gi
	,
		osis: ["1Cor"]
		regexp: ///(^|[^0-9A-Za-zªµºÀ-ÖØ-öø-ɏḀ-ỿⱠ-Ɀ々-〆〪-〭〱-〵〻-〼㐀-䶵一-鿌Ꜣ-ꞈꞋ-ꞎꞐ-ꞓꞠ-Ɦꟸ-ꟿ豈-舘並-龎])(
		(?:コリ(?:ント(?:人への(?:第一の手紙|手紙[Ⅰ一]|前の書)|の信徒への手紙一|[\s\xa0]*1|前書|Ⅰ)|Ⅰ)|Ⅰ(?:[\s\xa0]*コリント人へ|コリント)|1Cor|Ⅰコリ|Iコリ)
			)(?:(?=[\d\s\xa0.:,;\x1e\x1f&\(\)\uff08\uff09\[\]/"'\*=~\-\u2013\u2014])|$)///gi
	,
		osis: ["Gal"]
		regexp: ///(^|#{bcv_parser::regexps.pre_book})(
		(?:[カガ]ラ(?:テヤ(?:の信徒への手紙|人への手紙|(?:人への)?書|人へ)?)?|Gal)
			)(?:(?=[\d\s\xa0.:,;\x1e\x1f&\(\)\uff08\uff09\[\]/"'\*=~\-\u2013\u2014])|$)///gi
	,
		osis: ["Eph"]
		regexp: ///(^|#{bcv_parser::regexps.pre_book})(
		(?:エ(?:フェ(?:ソ(?:の信徒への手紙|人への手紙|書)?)?|[ヘペ]ソ人への手紙|[ヘペ]ソ(?:人への)?書|[ヘペ](?:ソ人へ)?)|Eph)
			)(?:(?=[\d\s\xa0.:,;\x1e\x1f&\(\)\uff08\uff09\[\]/"'\*=~\-\u2013\u2014])|$)///gi
	,
		osis: ["Phil"]
		regexp: ///(^|#{bcv_parser::regexps.pre_book})(
		(?:フィリ(?:[ヒピ](?:の信徒への手紙|人への手紙|書)?)?|[ヒピ]リ[ヒピ]人への手紙|[ヒピ]リ[ヒピ](?:人への)?書|[ヒピ]リ(?:[ヒピ](?:人へ)?)?|Phil)
			)(?:(?=[\d\s\xa0.:,;\x1e\x1f&\(\)\uff08\uff09\[\]/"'\*=~\-\u2013\u2014])|$)///gi
	,
		osis: ["Col"]
		regexp: ///(^|#{bcv_parser::regexps.pre_book})(
		(?:コロ(?:サイ(?:の信徒への手紙|人への手紙|(?:人への)?書|人へ)?)?|Col)
			)(?:(?=[\d\s\xa0.:,;\x1e\x1f&\(\)\uff08\uff09\[\]/"'\*=~\-\u2013\u2014])|$)///gi
	,
		osis: ["2Thess"]
		regexp: ///(^|[^0-9A-Za-zªµºÀ-ÖØ-öø-ɏḀ-ỿⱠ-Ɀ々-〆〪-〭〱-〵〻-〼㐀-䶵一-鿌Ꜣ-ꞈꞋ-ꞎꞐ-ꞓꞠ-Ɦꟸ-ꟿ豈-舘並-龎])(
		(?:テサ(?:ロニケ(?:人への(?:第二の手紙|手紙[Ⅱ二]|後の書)|の信徒への手紙二|[\s\xa0]*2|後書|Ⅱ)|Ⅱ)|Ⅱ(?:[\s\xa0]*テサロニケ人へ|テサロニケ)|2Thess|IIテサ|Ⅱテサ)
			)(?:(?=[\d\s\xa0.:,;\x1e\x1f&\(\)\uff08\uff09\[\]/"'\*=~\-\u2013\u2014])|$)///gi
	,
		osis: ["1Thess"]
		regexp: ///(^|[^0-9A-Za-zªµºÀ-ÖØ-öø-ɏḀ-ỿⱠ-Ɀ々-〆〪-〭〱-〵〻-〼㐀-䶵一-鿌Ꜣ-ꞈꞋ-ꞎꞐ-ꞓꞠ-Ɦꟸ-ꟿ豈-舘並-龎])(
		(?:テサ(?:ロニケ(?:人への(?:第一の手紙|手紙[Ⅰ一]|前の書)|の信徒への手紙一|[\s\xa0]*1|前書|Ⅰ)|Ⅰ)|Ⅰ(?:[\s\xa0]*テサロニケ人へ|テサロニケ)|1Thess|Ⅰテサ|Iテサ)
			)(?:(?=[\d\s\xa0.:,;\x1e\x1f&\(\)\uff08\uff09\[\]/"'\*=~\-\u2013\u2014])|$)///gi
	,
		osis: ["2Tim"]
		regexp: ///(^|[^0-9A-Za-zªµºÀ-ÖØ-öø-ɏḀ-ỿⱠ-Ɀ々-〆〪-〭〱-〵〻-〼㐀-䶵一-鿌Ꜣ-ꞈꞋ-ꞎꞐ-ꞓꞠ-Ɦꟸ-ꟿ豈-舘並-龎])(
		(?:テモ(?:テ(?:ヘの第二の手紙|への(?:第二の手紙|手紙[Ⅱ二]|後の書)|[\s\xa0]*2|後書|Ⅱ)|Ⅱ)|Ⅱ(?:[\s\xa0]*テモテへ|テモテ)|二テモテ|2Tim|Ⅱテモ)
			)(?:(?=[\d\s\xa0.:,;\x1e\x1f&\(\)\uff08\uff09\[\]/"'\*=~\-\u2013\u2014])|$)///gi
	,
		osis: ["1Tim"]
		regexp: ///(^|[^0-9A-Za-zªµºÀ-ÖØ-öø-ɏḀ-ỿⱠ-Ɀ々-〆〪-〭〱-〵〻-〼㐀-䶵一-鿌Ꜣ-ꞈꞋ-ꞎꞐ-ꞓꞠ-Ɦꟸ-ꟿ豈-舘並-龎])(
		(?:テモ(?:テ(?:ヘの第一の手紙|への(?:第一の手紙|手紙[Ⅰ一]|前の書)|[\s\xa0]*1|前書|Ⅰ)|Ⅰ)|Ⅰ(?:[\s\xa0]*テモテへ|テ(?:モテ|ィモ))|[I一]テモテ|1Tim|Ⅱティモ|Ⅰテモ)
			)(?:(?=[\d\s\xa0.:,;\x1e\x1f&\(\)\uff08\uff09\[\]/"'\*=~\-\u2013\u2014])|$)///gi
	,
		osis: ["Titus"]
		regexp: ///(^|#{bcv_parser::regexps.pre_book})(
		(?:テ(?:ト(?:ス(?:への(?:て[かが]み|手紙|書)|ヘの手紙|書)|スへ?)?|ィト(?:に達する書)?)|Titus)
			)(?:(?=[\d\s\xa0.:,;\x1e\x1f&\(\)\uff08\uff09\[\]/"'\*=~\-\u2013\u2014])|$)///gi
	,
		osis: ["Phlm"]
		regexp: ///(^|#{bcv_parser::regexps.pre_book})(
		(?:フィレ(?:モン(?:への手紙|書)?)?|[ヒピ]レモンへの手紙|[ヒピ]レモンヘの手紙|[ヒピ]レモン(?:への)?書|[ヒピ]レ(?:モンへ?)?|Phlm)
			)(?:(?=[\d\s\xa0.:,;\x1e\x1f&\(\)\uff08\uff09\[\]/"'\*=~\-\u2013\u2014])|$)///gi
	,
		osis: ["Heb"]
		regexp: ///(^|#{bcv_parser::regexps.pre_book})(
		(?:ヘ[フブ](?:ライ(?:人への手紙|書)?|ル人への手紙|ル(?:人への)?書|ル(?:人へ)?)?|へ[フブ]ル人への手紙|Heb)
			)(?:(?=[\d\s\xa0.:,;\x1e\x1f&\(\)\uff08\uff09\[\]/"'\*=~\-\u2013\u2014])|$)///gi
	,
		osis: ["Jas"]
		regexp: ///(^|#{bcv_parser::regexps.pre_book})(
		(?:ヤコ(?:[フブ](?:からの手紙|の手紙|の?書)?)?|Jas)
			)(?:(?=[\d\s\xa0.:,;\x1e\x1f&\(\)\uff08\uff09\[\]/"'\*=~\-\u2013\u2014])|$)///gi
	,
		osis: ["2Pet"]
		regexp: ///(^|[^0-9A-Za-zªµºÀ-ÖØ-öø-ɏḀ-ỿⱠ-Ɀ々-〆〪-〭〱-〵〻-〼㐀-䶵一-鿌Ꜣ-ꞈꞋ-ꞎꞐ-ꞓꞠ-Ɦꟸ-ꟿ豈-舘並-龎])(
		(?:[ヘペ](?:トロ(?:の第二の手紙|の手紙二|[\s\xa0]*2)|テ(?:ロ(?:の(?:第二の手紙|手紙Ⅱ|後の書)|Ⅱ)|Ⅱ))|Ⅱ[\s\xa0]*[ヘペ]テロ|II[ヘペ]トロ|II[ヘペ]ト|2Pet|二[ヘペ]トロ|Ⅱ[ヘペ][テト]ロ|Ⅱ[ヘペ][テト])
			)(?:(?=[\d\s\xa0.:,;\x1e\x1f&\(\)\uff08\uff09\[\]/"'\*=~\-\u2013\u2014])|$)///gi
	,
		osis: ["1Pet"]
		regexp: ///(^|[^0-9A-Za-zªµºÀ-ÖØ-öø-ɏḀ-ỿⱠ-Ɀ々-〆〪-〭〱-〵〻-〼㐀-䶵一-鿌Ꜣ-ꞈꞋ-ꞎꞐ-ꞓꞠ-Ɦꟸ-ꟿ豈-舘並-龎])(
		(?:[ヘペ](?:トロ(?:の第一の手紙|の手紙一|[\s\xa0]*1)|テ(?:ロ(?:の(?:第一の手紙|手紙Ⅰ|前の書)|Ⅰ)|I))|Ⅰ(?:[\s\xa0]*[ヘペ]テ|[ヘペ][テト])ロ|1Pet|I[ヘペ]トロ|一[ヘペ]トロ|I[ヘペ]ト|Ⅰ[ヘペ][テト])
			)(?:(?=[\d\s\xa0.:,;\x1e\x1f&\(\)\uff08\uff09\[\]/"'\*=~\-\u2013\u2014])|$)///gi
	,
		osis: ["Jude"]
		regexp: ///(^|#{bcv_parser::regexps.pre_book})(
		(?:ユ[タダ](?:からの手紙|の手紙|の書)?|Jude)
			)(?:(?=[\d\s\xa0.:,;\x1e\x1f&\(\)\uff08\uff09\[\]/"'\*=~\-\u2013\u2014])|$)///gi
	,
		osis: ["Tob"]
		apocrypha: true
		regexp: ///(^|#{bcv_parser::regexps.pre_book})(
		(?:トビト記?|Tob)
			)(?:(?=[\d\s\xa0.:,;\x1e\x1f&\(\)\uff08\uff09\[\]/"'\*=~\-\u2013\u2014])|$)///gi
	,
		osis: ["Jdt"]
		apocrypha: true
		regexp: ///(^|#{bcv_parser::regexps.pre_book})(
		(?:ユディト記?|Jdt)
			)(?:(?=[\d\s\xa0.:,;\x1e\x1f&\(\)\uff08\uff09\[\]/"'\*=~\-\u2013\u2014])|$)///gi
	,
		osis: ["Bar"]
		apocrypha: true
		regexp: ///(^|#{bcv_parser::regexps.pre_book})(
		(?:バルク書?|Bar)
			)(?:(?=[\d\s\xa0.:,;\x1e\x1f&\(\)\uff08\uff09\[\]/"'\*=~\-\u2013\u2014])|$)///gi
	,
		osis: ["Sus"]
		apocrypha: true
		regexp: ///(^|#{bcv_parser::regexps.pre_book})(
		(?:スザンナ|Sus)
			)(?:(?=[\d\s\xa0.:,;\x1e\x1f&\(\)\uff08\uff09\[\]/"'\*=~\-\u2013\u2014])|$)///gi
	,
		osis: ["2Macc"]
		apocrypha: true
		regexp: ///(^|[^0-9A-Za-zªµºÀ-ÖØ-öø-ɏḀ-ỿⱠ-Ɀ々-〆〪-〭〱-〵〻-〼㐀-䶵一-鿌Ꜣ-ꞈꞋ-ꞎꞐ-ꞓꞠ-Ɦꟸ-ꟿ豈-舘並-龎])(
		(?:マカバイ(?:記2|下)|2Macc)
			)(?:(?=[\d\s\xa0.:,;\x1e\x1f&\(\)\uff08\uff09\[\]/"'\*=~\-\u2013\u2014])|$)///gi
	,
		osis: ["3Macc"]
		apocrypha: true
		regexp: ///(^|[^0-9A-Za-zªµºÀ-ÖØ-öø-ɏḀ-ỿⱠ-Ɀ々-〆〪-〭〱-〵〻-〼㐀-䶵一-鿌Ꜣ-ꞈꞋ-ꞎꞐ-ꞓꞠ-Ɦꟸ-ꟿ豈-舘並-龎])(
		(?:マカバイ記3|3Macc)
			)(?:(?=[\d\s\xa0.:,;\x1e\x1f&\(\)\uff08\uff09\[\]/"'\*=~\-\u2013\u2014])|$)///gi
	,
		osis: ["4Macc"]
		apocrypha: true
		regexp: ///(^|[^0-9A-Za-zªµºÀ-ÖØ-öø-ɏḀ-ỿⱠ-Ɀ々-〆〪-〭〱-〵〻-〼㐀-䶵一-鿌Ꜣ-ꞈꞋ-ꞎꞐ-ꞓꞠ-Ɦꟸ-ꟿ豈-舘並-龎])(
		(?:マカバイ記4|4Macc)
			)(?:(?=[\d\s\xa0.:,;\x1e\x1f&\(\)\uff08\uff09\[\]/"'\*=~\-\u2013\u2014])|$)///gi
	,
		osis: ["1Macc"]
		apocrypha: true
		regexp: ///(^|[^0-9A-Za-zªµºÀ-ÖØ-öø-ɏḀ-ỿⱠ-Ɀ々-〆〪-〭〱-〵〻-〼㐀-䶵一-鿌Ꜣ-ꞈꞋ-ꞎꞐ-ꞓꞠ-Ɦꟸ-ꟿ豈-舘並-龎])(
		(?:マカバイ(?:記1|上)|1Macc)
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
