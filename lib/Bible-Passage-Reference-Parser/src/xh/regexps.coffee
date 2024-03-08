bcv_parser::regexps.space = "[\\s\\xa0]"
bcv_parser::regexps.escaped_passage = ///
	(?:^ | [^\x1f\x1e\dA-Za-zªµºÀ-ÖØ-öø-ɏḀ-ỿⱠ-ⱿꜢ-ꞈꞋ-ꞎꞐ-ꞓꞠ-Ɦꟸ-ꟿ] )	# Beginning of string or not in the middle of a word or immediately following another book. Only count a book if it's part of a sequence: `Matt5John3` is OK, but not `1Matt5John3`
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
				  | isahluko | ukuya | kwaye | ivesi | ff
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
bcv_parser::regexps.pre_book = "[^A-Za-zªµºÀ-ÖØ-öø-ɏḀ-ỿⱠ-ⱿꜢ-ꞈꞋ-ꞎꞐ-ꞓꞠ-Ɦꟸ-ꟿ]"

bcv_parser::regexps.first = "(?:1|I)\\.?#{bcv_parser::regexps.space}*"
bcv_parser::regexps.second = "(?:2|II)\\.?#{bcv_parser::regexps.space}*"
bcv_parser::regexps.third = "(?:3|III)\\.?#{bcv_parser::regexps.space}*"
bcv_parser::regexps.range_and = "(?:[&\u2013\u2014-]|kwaye|ukuya)"
bcv_parser::regexps.range_only = "(?:[\u2013\u2014-]|ukuya)"
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
		(?:K(?:wabase?|(?:um)?a|um?)?Genesis|(?:Y(?:ezi|oo)|I[msz]i|(?:Ek|Ab)a|Ii|Oo|U)Genesis|(?:Y(?:ez|o)|I[msz]|Ek|Ab|[IO])Genesis|Gen(?:esis)?)
			)(?:(?=[\d\s\xa0.:,;\x1e\x1f&\(\)\uff08\uff09\[\]/"'\*=~\-\u2013\u2014])|$)///gi
	,
		osis: ["Exod"]
		regexp: ///(^|#{bcv_parser::regexps.pre_book})(
		(?:K(?:wabase?|(?:um)?a|um?)?Eksodus|(?:Y(?:ezi|oo)|Eka|I[msz]i|Aba|Ii|Oo|U)Eksodus|(?:Y(?:ez|o)|Ek|I[msz]|Ab|I|O)Eksodus|E(?:ksodus|xod|ks))
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
		(?:K(?:wabase?|(?:um)?a|um?)?Levitikus|(?:Y(?:ezi|oo)|I[msz]i|(?:Ek|Ab)a|Ii|Oo|U)Levitikus|(?:Y(?:ez|o)|I[msz]|Ek|Ab|[IO])Levitikus|Lev(?:itikus)?)
			)(?:(?=[\d\s\xa0.:,;\x1e\x1f&\(\)\uff08\uff09\[\]/"'\*=~\-\u2013\u2014])|$)///gi
	,
		osis: ["Num"]
		regexp: ///(^|#{bcv_parser::regexps.pre_book})(
		(?:K(?:wabase?|(?:um)?a|um?)?Numeri|(?:Y(?:ezi|oo)|I[msz]i|(?:Ek|Ab)a|Ii|Oo|U)Numeri|(?:Y(?:ez|o)|I[msz]|Ek|Ab|[IO])Numeri|Num(?:eri)?)
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
		(?:K(?:wabase?|(?:um)?a|um?)?Lilo|(?:Y(?:ezi|oo)|I[msz]i|(?:Ek|Ab)a|Ii|Oo|U)Lilo|(?:Y(?:ez|o)|I[msz]|Ek|Ab|[IO])Lilo|L(?:ilo|am))
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
		(?:K(?:wabas(?:eTy(?:hilelo)?|Ty(?:hilelo)?)|(?:um)?aTy(?:hilelo)?|(?:um?)?Ty(?:hilelo)?)|(?:Y(?:ezi|oo)|I[msz]i|(?:Ek|Ab)a|Ii|Oo|U)Ty(?:hilelo)?|(?:Y(?:ez|o)|I[msz]|Ek|Ab|I|O)?Ty(?:hilelo)?|Rev)
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
		(?:K(?:wabase?|(?:um)?a|um?)?Duteronomi|(?:Y(?:ezi|oo)|I[msz]i|(?:Ek|Ab)a|Ii|Oo|U)Duteronomi|(?:Y(?:ez|o)|I[msz]|Ek|Ab|[IO])Duteronomi|D(?:uteronomi|e?ut))
			)(?:(?=[\d\s\xa0.:,;\x1e\x1f&\(\)\uff08\uff09\[\]/"'\*=~\-\u2013\u2014])|$)///gi
	,
		osis: ["Josh"]
		regexp: ///(^|#{bcv_parser::regexps.pre_book})(
		(?:K(?:wabase?|(?:um)?a|um?)?Yoshuwa|(?:Y(?:ezi|oo)|I[msz]i|(?:Ek|Ab)a|Oo|Ii|U)Yoshuwa|(?:Y(?:ez|o)|I[msz]|Ek|Ab|[IO])Yoshuwa|Yoshuwa|[JY]osh)
			)(?:(?=[\d\s\xa0.:,;\x1e\x1f&\(\)\uff08\uff09\[\]/"'\*=~\-\u2013\u2014])|$)///gi
	,
		osis: ["Judg"]
		regexp: ///(^|#{bcv_parser::regexps.pre_book})(
		(?:K(?:wabase?|(?:um)?a|um?)?Gwebi|(?:Y(?:ezi|oo)|I[msz]i|Eka|Ii|Oo|U)Gwebi|(?:Aba?|Y(?:ez|o)|I[msz]|Ek|I|O)?Gwebi|Abagw|Judg)
			)(?:(?=[\d\s\xa0.:,;\x1e\x1f&\(\)\uff08\uff09\[\]/"'\*=~\-\u2013\u2014])|$)///gi
	,
		osis: ["Ruth"]
		regexp: ///(^|#{bcv_parser::regexps.pre_book})(
		(?:K(?:wabase?|(?:um)?a|um?)?Rute|(?:Y(?:ezi|oo)|I[msz]i|(?:Ek|Ab)a|Ii|Oo|U)Rute|(?:Y(?:ez|o)|I[msz]|Ek|Ab|[IO])Rute|Rut[eh]?)
			)(?:(?=[\d\s\xa0.:,;\x1e\x1f&\(\)\uff08\uff09\[\]/"'\*=~\-\u2013\u2014])|$)///gi
	,
		osis: ["1Esd"]
		apocrypha: true
		regexp: ///(^|[^0-9A-Za-zªµºÀ-ÖØ-öø-ɏḀ-ỿⱠ-ⱿꜢ-ꞈꞋ-ꞎꞐ-ꞓꞠ-Ɦꟸ-ꟿ])(
		(?:1Esd)
			)(?:(?=[\d\s\xa0.:,;\x1e\x1f&\(\)\uff08\uff09\[\]/"'\*=~\-\u2013\u2014])|$)///gi
	,
		osis: ["2Esd"]
		apocrypha: true
		regexp: ///(^|[^0-9A-Za-zªµºÀ-ÖØ-öø-ɏḀ-ỿⱠ-ⱿꜢ-ꞈꞋ-ꞎꞐ-ꞓꞠ-Ɦꟸ-ꟿ])(
		(?:2Esd)
			)(?:(?=[\d\s\xa0.:,;\x1e\x1f&\(\)\uff08\uff09\[\]/"'\*=~\-\u2013\u2014])|$)///gi
	,
		osis: ["Isa"]
		regexp: ///(^|#{bcv_parser::regexps.pre_book})(
		(?:K(?:wabase?|(?:um)?a|um?)?Isaya|(?:Y(?:ezi|oo)|Is?i|I[mz]i|(?:Ek|Ab)a|Oo|U)Isaya|(?:Y(?:ez|o)|Is?|I[mz]|Ek|Ab|O)Isaya|Isa(?:ya)?)
			)(?:(?=[\d\s\xa0.:,;\x1e\x1f&\(\)\uff08\uff09\[\]/"'\*=~\-\u2013\u2014])|$)///gi
	,
		osis: ["2Sam"]
		regexp: ///(^|[^0-9A-Za-zªµºÀ-ÖØ-öø-ɏḀ-ỿⱠ-ⱿꜢ-ꞈꞋ-ꞎꞐ-ꞓꞠ-Ɦꟸ-ꟿ])(
		(?:IiSamuweli[\s\xa0]*(?:II|2))|(?:I(?:I(?:\.[\s\xa0]*(?:K(?:wabase?|(?:um)?a|um?)?Samuweli|(?:Y(?:ezi|oo)|I[msz]i|(?:Ek|Ab)a|Ii|Oo|U)Samuweli|(?:Y(?:ez|o)|I[msz]|Ek|Ab|[IO])Samuweli|Sam(?:uweli|uel)?)|[\s\xa0]*(?:K(?:wabase?|(?:um)?a|um?)?Samuweli|(?:Y(?:ezi|oo)|I[msz]i|(?:Ek|Ab)a|Ii|Oo|U)Samuweli|(?:Y(?:ez|o)|I[msz]|Ek|Ab|[IO])Samuweli|Sam(?:uweli|uel)?))|[msz](?:iSamuweli[\s\xa0]*(?:II|2)|Samuweli[\s\xa0]*(?:II|2))|Samuweli[\s\xa0]*(?:II|2))|(?:K(?:wabase|(?:um)?a)|Yoo|(?:Ek|Ab)a|Oo|U)Samuweli[\s\xa0]*(?:II|2)|2\.[\s\xa0]*(?:K(?:wabase?|(?:um)?a|um?)?Samuweli|(?:Y(?:ezi|oo)|I[msz]i|(?:Ek|Ab)a|Ii|Oo|U)Samuweli|(?:Y(?:ez|o)|I[msz]|Ek|Ab|[IO])Samuweli|Sam(?:uweli|uel)?)|(?:K(?:wabas|um?)?|Yo|Ek|Ab|O)?Samuweli[\s\xa0]*(?:II|2)|2[\s\xa0]*(?:K(?:wabase?|(?:um)?a|um?)?Samuweli|(?:Y(?:ezi|oo)|I[msz]i|(?:Ek|Ab)a|Ii|Oo|U)Samuweli|(?:Y(?:ez|o)|I[msz]|Ek|Ab|[IO])Samuweli|Sam(?:uweli|uel)?)|Yez(?:iSamuweli[\s\xa0]*(?:II|2)|Samuweli[\s\xa0]*(?:II|2))|2Sam)
			)(?:(?=[\d\s\xa0.:,;\x1e\x1f&\(\)\uff08\uff09\[\]/"'\*=~\-\u2013\u2014])|$)///gi
	,
		osis: ["1Sam"]
		regexp: ///(^|[^0-9A-Za-zªµºÀ-ÖØ-öø-ɏḀ-ỿⱠ-ⱿꜢ-ꞈꞋ-ꞎꞐ-ꞓꞠ-Ɦꟸ-ꟿ])(
		(?:I(?:iSamuweli[\s\xa0]*[1I]|Samuweli[\s\xa0]*[1I]))|(?:I\.[\s\xa0]*(?:K(?:wabase?|(?:um)?a|um?)?Samuweli|(?:Y(?:ezi|oo)|I[msz]i|(?:Ek|Ab)a|Ii|Oo|U)Samuweli|(?:Y(?:ez|o)|I[msz]|Ek|Ab|[IO])Samuweli|Sam(?:uweli|uel)?)|1(?:\.[\s\xa0]*(?:K(?:wabase?|(?:um)?a|um?)?Samuweli|(?:Y(?:ezi|oo)|I[msz]i|(?:Ek|Ab)a|Ii|Oo|U)Samuweli|(?:Y(?:ez|o)|I[msz]|Ek|Ab|[IO])Samuweli|Sam(?:uweli|uel)?)|[\s\xa0]*(?:K(?:wabase?|(?:um)?a|um?)?Samuweli|(?:Y(?:ezi|oo)|I[msz]i|(?:Ek|Ab)a|Ii|Oo|U)Samuweli|(?:Y(?:ez|o)|I[msz]|Ek|Ab|[IO])Samuweli|Sam(?:uweli|uel)?)|Sam)|(?:K(?:wabase|(?:um)?a)|Yoo|(?:Ek|Ab)a|Oo|U)Samuweli[\s\xa0]*[1I]|I[\s\xa0]*(?:K(?:wabase?|(?:um)?a|um?)?Samuweli|(?:Y(?:ezi|oo)|I[msz]i|(?:Ek|Ab)a|Ii|Oo|U)Samuweli|(?:Y(?:ez|o)|I[msz]|Ek|Ab|[IO])Samuweli|Sam(?:uweli|uel)?)|(?:K(?:wabas|um?)?|Yo|Ek|Ab|O)?Samuweli[\s\xa0]*[1I]|Yez(?:iSamuweli[\s\xa0]*[1I]|Samuweli[\s\xa0]*[1I])|I[msz](?:iSamuweli[\s\xa0]*[1I]|Samuweli[\s\xa0]*[1I]))
			)(?:(?=[\d\s\xa0.:,;\x1e\x1f&\(\)\uff08\uff09\[\]/"'\*=~\-\u2013\u2014])|$)///gi
	,
		osis: ["2Kgs"]
		regexp: ///(^|[^0-9A-Za-zªµºÀ-ÖØ-öø-ɏḀ-ỿⱠ-ⱿꜢ-ꞈꞋ-ꞎꞐ-ꞓꞠ-Ɦꟸ-ꟿ])(
		(?:IiKumkani[\s\xa0]*(?:II|2))|(?:I(?:I(?:\.[\s\xa0]*(?:K(?:wabase?K|(?:um)?aK|(?:um?)?K)?|(?:Y(?:ezi|oo)|Y(?:ez|o)|I[msz]i|Aba|Eka|Ek|I[msz]|Ab|Ii|Oo|O|I|U)K)|[\s\xa0]*(?:K(?:wabase?K|(?:um)?aK|(?:um?)?K)?|(?:Y(?:ezi|oo)|Y(?:ez|o)|I[msz]i|Aba|Eka|Ek|I[msz]|Ab|Ii|Oo|O|I|U)K))umkani|[msz](?:iKumkani[\s\xa0]*(?:II|2)|Kumkani[\s\xa0]*(?:II|2))|Kumkani[\s\xa0]*(?:II|2))|(?:K(?:wabase|(?:um)?a)|Eka|Aba|Yoo|Oo|U)Kumkani[\s\xa0]*(?:II|2)|2\.[\s\xa0]*(?:K(?:wabase?K|(?:um)?aK|(?:um?)?K)?|(?:Y(?:ezi|oo)|Y(?:ez|o)|I[msz]i|Aba|Eka|Ek|I[msz]|Ab|Ii|Oo|O|I|U)K)umkani|(?:K(?:wabas|um?)?|Ek|Ab|Yo|O)Kumkani[\s\xa0]*(?:II|2)|2[\s\xa0]*(?:K(?:wabase?K|(?:um)?aK|(?:um?)?K)?|(?:Y(?:ezi|oo)|Y(?:ez|o)|I[msz]i|Aba|Eka|Ek|I[msz]|Ab|Ii|Oo|O|I|U)K)umkani|Yez(?:iKumkani[\s\xa0]*(?:II|2)|Kumkani[\s\xa0]*(?:II|2))|Kumkani[\s\xa0]*(?:II|2)|2Kgs)
			)(?:(?=[\d\s\xa0.:,;\x1e\x1f&\(\)\uff08\uff09\[\]/"'\*=~\-\u2013\u2014])|$)///gi
	,
		osis: ["1Kgs"]
		regexp: ///(^|[^0-9A-Za-zªµºÀ-ÖØ-öø-ɏḀ-ỿⱠ-ⱿꜢ-ꞈꞋ-ꞎꞐ-ꞓꞠ-Ɦꟸ-ꟿ])(
		(?:I(?:iKumkani[\s\xa0]*[1I]|Kumkani[\s\xa0]*[1I]))|(?:I\.[\s\xa0]*(?:K(?:wabase?K|(?:um)?aK|(?:um?)?K)?|(?:Y(?:ezi|oo)|Y(?:ez|o)|I[msz]i|Aba|Eka|Ek|I[msz]|Ab|Ii|Oo|O|I|U)K)umkani|1(?:\.[\s\xa0]*(?:K(?:wabase?K|(?:um)?aK|(?:um?)?K)?|(?:Y(?:ezi|oo)|Y(?:ez|o)|I[msz]i|Aba|Eka|Ek|I[msz]|Ab|Ii|Oo|O|I|U)K)umkani|[\s\xa0]*(?:K(?:wabase?K|(?:um)?aK|(?:um?)?K)?|(?:Y(?:ezi|oo)|Y(?:ez|o)|I[msz]i|Aba|Eka|Ek|I[msz]|Ab|Ii|Oo|O|I|U)K)umkani|Kgs)|(?:K(?:wabase|(?:um)?a)|Eka|Aba|Yoo|Oo|U)Kumkani[\s\xa0]*[1I]|I[\s\xa0]*(?:K(?:wabase?K|(?:um)?aK|(?:um?)?K)?|(?:Y(?:ezi|oo)|Y(?:ez|o)|I[msz]i|Aba|Eka|Ek|I[msz]|Ab|Ii|Oo|O|I|U)K)umkani|(?:K(?:wabas|um?)?|Ek|Ab|Yo|O)Kumkani[\s\xa0]*[1I]|Yez(?:iKumkani[\s\xa0]*[1I]|Kumkani[\s\xa0]*[1I])|I[msz](?:iKumkani[\s\xa0]*[1I]|Kumkani[\s\xa0]*[1I])|Kumkani[\s\xa0]*[1I])
			)(?:(?=[\d\s\xa0.:,;\x1e\x1f&\(\)\uff08\uff09\[\]/"'\*=~\-\u2013\u2014])|$)///gi
	,
		osis: ["2Chr"]
		regexp: ///(^|[^0-9A-Za-zªµºÀ-ÖØ-öø-ɏḀ-ỿⱠ-ⱿꜢ-ꞈꞋ-ꞎꞐ-ꞓꞠ-Ɦꟸ-ꟿ])(
		(?:I(?:I(?:\.[\s\xa0]*(?:K(?:wabase?K|(?:um)?aK|(?:um?)?K)?|(?:Y(?:ezi|oo)|Y(?:ez|o)|I[msz]i|Aba|Eka|Ek|I[msz]|Ab|Ii|Oo|O|I|U)K)|[\s\xa0]*(?:K(?:wabase?K|(?:um)?aK|(?:um?)?K)?|(?:Y(?:ezi|oo)|Y(?:ez|o)|I[msz]i|Aba|Eka|Ek|I[msz]|Ab|Ii|Oo|O|I|U)K))umkani|[msz](?:iKronike[\s\xa0]*(?:II|2)|Kronike[\s\xa0]*(?:II|2))|iKronike[\s\xa0]*(?:II|2)|Kronike[\s\xa0]*(?:II|2))|(?:K(?:wabase|(?:um)?a)|Yoo|(?:Ek|Ab)a|Oo|U)Kronike[\s\xa0]*(?:II|2)|2\.[\s\xa0]*(?:K(?:wabase?K|(?:um)?aK|(?:um?)?K)?|(?:Y(?:ezi|oo)|Y(?:ez|o)|I[msz]i|Aba|Eka|Ek|I[msz]|Ab|Ii|Oo|O|I|U)K)umkani|(?:K(?:wabas|um?)?|Yo|Ek|Ab|O)Kronike[\s\xa0]*(?:II|2)|2[\s\xa0]*(?:K(?:wabase?K|(?:um)?aK|(?:um?)?K)?|(?:Y(?:ezi|oo)|Y(?:ez|o)|I[msz]i|Aba|Eka|Ek|I[msz]|Ab|Ii|Oo|O|I|U)K)umkani|Yez(?:iKronike[\s\xa0]*(?:II|2)|Kronike[\s\xa0]*(?:II|2))|Kronike[\s\xa0]*(?:II|2)|2Chr)
			)(?:(?=[\d\s\xa0.:,;\x1e\x1f&\(\)\uff08\uff09\[\]/"'\*=~\-\u2013\u2014])|$)///gi
	,
		osis: ["1Chr"]
		regexp: ///(^|[^0-9A-Za-zªµºÀ-ÖØ-öø-ɏḀ-ỿⱠ-ⱿꜢ-ꞈꞋ-ꞎꞐ-ꞓꞠ-Ɦꟸ-ꟿ])(
		(?:I\.[\s\xa0]*(?:K(?:wabase?K|(?:um)?aK|(?:um?)?K)?|(?:Y(?:ezi|oo)|Y(?:ez|o)|I[msz]i|Aba|Eka|Ek|I[msz]|Ab|Ii|Oo|O|I|U)K)umkani|1(?:\.[\s\xa0]*(?:K(?:wabase?K|(?:um)?aK|(?:um?)?K)?|(?:Y(?:ezi|oo)|Y(?:ez|o)|I[msz]i|Aba|Eka|Ek|I[msz]|Ab|Ii|Oo|O|I|U)K)umkani|[\s\xa0]*(?:K(?:wabase?K|(?:um)?aK|(?:um?)?K)?|(?:Y(?:ezi|oo)|Y(?:ez|o)|I[msz]i|Aba|Eka|Ek|I[msz]|Ab|Ii|Oo|O|I|U)K)umkani|Chr)|(?:K(?:wabase|(?:um)?a)|Yoo|(?:Ek|Ab)a|Oo|U)Kronike[\s\xa0]*[1I]|I[\s\xa0]*(?:K(?:wabase?K|(?:um)?aK|(?:um?)?K)?|(?:Y(?:ezi|oo)|Y(?:ez|o)|I[msz]i|Aba|Eka|Ek|I[msz]|Ab|Ii|Oo|O|I|U)K)umkani|(?:K(?:wabas|um?)?|Yo|Ek|Ab|O)Kronike[\s\xa0]*[1I]|Yez(?:iKronike[\s\xa0]*[1I]|Kronike[\s\xa0]*[1I])|I(?:[msz](?:iKronike[\s\xa0]*[1I]|Kronike[\s\xa0]*[1I])|iKronike[\s\xa0]*[1I]|Kronike[\s\xa0]*[1I])|Kronike[\s\xa0]*[1I])
			)(?:(?=[\d\s\xa0.:,;\x1e\x1f&\(\)\uff08\uff09\[\]/"'\*=~\-\u2013\u2014])|$)///gi
	,
		osis: ["Ezra"]
		regexp: ///(^|#{bcv_parser::regexps.pre_book})(
		(?:K(?:wabase?|(?:um)?a|um?)?Ezra|(?:Y(?:ezi|oo)|I[msz]i|(?:Ek|Ab)a|Ii|Oo|U)Ezra|(?:Y(?:ez|o)|I[msz]|Ek|Ab|[IO])Ezra|Ez(?:ra|r)?)
			)(?:(?=[\d\s\xa0.:,;\x1e\x1f&\(\)\uff08\uff09\[\]/"'\*=~\-\u2013\u2014])|$)///gi
	,
		osis: ["Neh"]
		regexp: ///(^|#{bcv_parser::regexps.pre_book})(
		(?:K(?:wabase?|(?:um)?a|um?)?Nehemiya|(?:Y(?:ezi|oo)|I[msz]i|(?:Ek|Ab)a|Ii|Oo|U)Nehemiya|(?:Y(?:ez|o)|I[msz]|Ek|Ab|[IO])Nehemiya|Neh(?:emiya)?)
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
		(?:K(?:wabase?|(?:um)?a|um?)?Estere|(?:Y(?:ezi|oo)|I[msz]i|(?:Ek|Ab)a|Ii|Oo|U)Estere|(?:Y(?:ez|o)|I[msz]|Ek|Ab|[IO])Estere|Es(?:tere|th|t)?)
			)(?:(?=[\d\s\xa0.:,;\x1e\x1f&\(\)\uff08\uff09\[\]/"'\*=~\-\u2013\u2014])|$)///gi
	,
		osis: ["Job"]
		regexp: ///(^|#{bcv_parser::regexps.pre_book})(
		(?:K(?:wabase?|(?:um)?a|um?)?Yobhi|(?:Y(?:ezi|oo)|I[msz]i|(?:Ek|Ab)a|Oo|Ii|U)Yobhi|(?:Y(?:ez|o)|I[msz]|Ek|Ab|[IO])Yobhi|Yobhi|[JY]ob)
			)(?:(?=[\d\s\xa0.:,;\x1e\x1f&\(\)\uff08\uff09\[\]/"'\*=~\-\u2013\u2014])|$)///gi
	,
		osis: ["Ps"]
		regexp: ///(^|#{bcv_parser::regexps.pre_book})(
		(?:K(?:wabas(?:eNd(?:umiso)?|Nd(?:umiso)?)|(?:um)?aNd(?:umiso)?|(?:um?)?Nd(?:umiso)?)|(?:Y(?:ezi|oo)|I[msz]i|(?:Ek|Ab)a|Ii|Oo|U)Nd(?:umiso)?|(?:Y(?:ez|o)|I[msz]|Ek|Ab|I|O)?Nd(?:umiso)?|Ps)|(?:Indumiso)
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
		(?:K(?:wabase?|(?:um)?a|um?)?Zekeliso|(?:Y(?:ezi|oo)|I[msz]i|(?:Ek|Ab)a|Ii|Oo|U)Zekeliso|(?:Y(?:ez|o)|I[msz]|Ek|Ab|I|O)?Zekeliso|Prov|IMiz)
			)(?:(?=[\d\s\xa0.:,;\x1e\x1f&\(\)\uff08\uff09\[\]/"'\*=~\-\u2013\u2014])|$)///gi
	,
		osis: ["Eccl"]
		regexp: ///(^|#{bcv_parser::regexps.pre_book})(
		(?:K(?:wabase?|(?:um)?a|um?)?Ntshumayeli|(?:Y(?:ezi|oo)|I[msz]i|(?:Ek|Ab)a|Ii|Oo|U)Ntshumayeli|(?:Y(?:ez|o)|I[msz]|Ek|Ab|I|O)?Ntshumayeli|Intsh|Eccl)
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
		(?:K(?:wabase?|(?:um)?a|um?)?Ngoma[\s\xa0]*Yazo[\s\xa0]*Iingoma|(?:Y(?:ezi|oo)|I[msz]i|(?:Ek|Ab)a|Ii|Oo|U)Ngoma[\s\xa0]*Yazo[\s\xa0]*Iingoma|(?:Y(?:ez|o)|I[msz]|Ek|Ab|I|O)?Ngoma[\s\xa0]*Yazo[\s\xa0]*Iingoma|Song)
			)(?:(?=[\d\s\xa0.:,;\x1e\x1f&\(\)\uff08\uff09\[\]/"'\*=~\-\u2013\u2014])|$)///gi
	,
		osis: ["Jer"]
		regexp: ///(^|#{bcv_parser::regexps.pre_book})(
		(?:K(?:wabase?|(?:um)?a|um?)?Yeremiya|(?:Y(?:ezi|oo)|I[msz]i|(?:Ek|Ab)a|Ii|Oo|U)Yeremiya|(?:Y(?:ez|o)|I[msz]|Ek|Ab|[IO])Yeremiya|Yeremiya|Jer)
			)(?:(?=[\d\s\xa0.:,;\x1e\x1f&\(\)\uff08\uff09\[\]/"'\*=~\-\u2013\u2014])|$)///gi
	,
		osis: ["Ezek"]
		regexp: ///(^|#{bcv_parser::regexps.pre_book})(
		(?:K(?:wabase?|(?:um)?a|um?)?Hezekile|(?:Y(?:ezi|oo)|I[msz]i|(?:Ek|Ab)a|Ii|Oo|U)Hezekile|(?:Y(?:ez|o)|I[msz]|Ek|Ab|[IO])Hezekile|Hezekile|Ezek|Hez)
			)(?:(?=[\d\s\xa0.:,;\x1e\x1f&\(\)\uff08\uff09\[\]/"'\*=~\-\u2013\u2014])|$)///gi
	,
		osis: ["Dan"]
		regexp: ///(^|#{bcv_parser::regexps.pre_book})(
		(?:K(?:wabase?|(?:um)?a|um?)?Daniyeli|(?:Y(?:ezi|oo)|I[msz]i|(?:Ek|Ab)a|Ii|Oo|U)Daniyeli|(?:Y(?:ez|o)|I[msz]|Ek|Ab|[IO])Daniyeli|Dan(?:iyeli)?)
			)(?:(?=[\d\s\xa0.:,;\x1e\x1f&\(\)\uff08\uff09\[\]/"'\*=~\-\u2013\u2014])|$)///gi
	,
		osis: ["Hos"]
		regexp: ///(^|#{bcv_parser::regexps.pre_book})(
		(?:K(?:wabase?|(?:um)?a|um?)?Hoseya|(?:Y(?:ezi|oo)|I[msz]i|(?:Ek|Ab)a|Ii|Oo|U)Hoseya|(?:Y(?:ez|o)|I[msz]|Ek|Ab|[IO])Hoseya|Hos(?:eya)?)
			)(?:(?=[\d\s\xa0.:,;\x1e\x1f&\(\)\uff08\uff09\[\]/"'\*=~\-\u2013\u2014])|$)///gi
	,
		osis: ["Joel"]
		regexp: ///(^|#{bcv_parser::regexps.pre_book})(
		(?:K(?:wabase?|(?:um)?a|um?)?Yoweli|(?:Y(?:ezi|oo)|I[msz]i|(?:Ek|Ab)a|Oo|Ii|U)Yoweli|(?:Y(?:ez|o)|I[msz]|Ek|Ab|[IO])Yoweli|Yoweli|Joel)
			)(?:(?=[\d\s\xa0.:,;\x1e\x1f&\(\)\uff08\uff09\[\]/"'\*=~\-\u2013\u2014])|$)///gi
	,
		osis: ["Amos"]
		regexp: ///(^|#{bcv_parser::regexps.pre_book})(
		(?:K(?:wabase?|(?:um)?a|um?)?Amosi|(?:Y(?:ezi|oo)|I[msz]i|(?:Ek|Ab)a|Ii|Oo|U)Amosi|(?:Y(?:ez|o)|I[msz]|Ek|Ab|[IO])Amosi|Amosi?)
			)(?:(?=[\d\s\xa0.:,;\x1e\x1f&\(\)\uff08\uff09\[\]/"'\*=~\-\u2013\u2014])|$)///gi
	,
		osis: ["Obad"]
		regexp: ///(^|#{bcv_parser::regexps.pre_book})(
		(?:K(?:wabase?|(?:um)?a|um?)?Obhadiya|(?:Y(?:ezi|oo)|I[msz]i|(?:Ek|Ab)a|Oo|Ii|U)Obhadiya|(?:Y(?:ez|o)|I[msz]|Ek|Ab|[IO])Obhadiya|Ob(?:hadiya|ad))
			)(?:(?=[\d\s\xa0.:,;\x1e\x1f&\(\)\uff08\uff09\[\]/"'\*=~\-\u2013\u2014])|$)///gi
	,
		osis: ["Jonah"]
		regexp: ///(^|#{bcv_parser::regexps.pre_book})(
		(?:K(?:wabase?|(?:um)?a|um?)?Yona|(?:Y(?:ezi|oo)|I[msz]i|(?:Ek|Ab)a|Oo|Ii|U)Yona|(?:Y(?:ez|o)|I[msz]|Ek|Ab|[IO])Yona|Jonah|Yona)
			)(?:(?=[\d\s\xa0.:,;\x1e\x1f&\(\)\uff08\uff09\[\]/"'\*=~\-\u2013\u2014])|$)///gi
	,
		osis: ["Mic"]
		regexp: ///(^|#{bcv_parser::regexps.pre_book})(
		(?:K(?:wabase?|(?:um)?a|um?)?Mika|(?:Y(?:ezi|oo)|I[msz]i|(?:Ek|Ab)a|Ii|Oo|U)Mika|(?:Y(?:ez|o)|I[msz]|Ek|Ab|[IO])Mika|Mi(?:ka|c))
			)(?:(?=[\d\s\xa0.:,;\x1e\x1f&\(\)\uff08\uff09\[\]/"'\*=~\-\u2013\u2014])|$)///gi
	,
		osis: ["Nah"]
		regexp: ///(^|#{bcv_parser::regexps.pre_book})(
		(?:K(?:wabase?|(?:um)?a|um?)?UNahum|(?:Y(?:ezi|oo)|I[msz]i|(?:Ek|Ab)a|Ii|Oo)UNahum|(?:Y(?:ez|o)|I[msz]|Ek|Ab|[IOU])UNahum|UNahum|Nah)
			)(?:(?=[\d\s\xa0.:,;\x1e\x1f&\(\)\uff08\uff09\[\]/"'\*=~\-\u2013\u2014])|$)///gi
	,
		osis: ["Hab"]
		regexp: ///(^|#{bcv_parser::regexps.pre_book})(
		(?:K(?:wabase?|(?:um)?a|um?)?Habhakuki|(?:Y(?:ezi|oo)|I[msz]i|(?:Ek|Ab)a|Ii|Oo|U)Habhakuki|(?:Y(?:ez|o)|I[msz]|Ek|Ab|[IO])Habhakuki|Hab(?:hakuki)?)
			)(?:(?=[\d\s\xa0.:,;\x1e\x1f&\(\)\uff08\uff09\[\]/"'\*=~\-\u2013\u2014])|$)///gi
	,
		osis: ["Zeph"]
		regexp: ///(^|#{bcv_parser::regexps.pre_book})(
		(?:K(?:wabase?|(?:um)?a|um?)?Zefaniya|(?:Y(?:ezi|oo)|I[msz]i|(?:Ek|Ab)a|Ii|Oo|U)Zefaniya|(?:Y(?:ez|o)|I[msz]|Ek|Ab|[IO])Zefaniya|Ze(?:faniya|ph))
			)(?:(?=[\d\s\xa0.:,;\x1e\x1f&\(\)\uff08\uff09\[\]/"'\*=~\-\u2013\u2014])|$)///gi
	,
		osis: ["Hag"]
		regexp: ///(^|#{bcv_parser::regexps.pre_book})(
		(?:K(?:wabase?|(?:um)?a|um?)?Hagayi|(?:Y(?:ezi|oo)|I[msz]i|(?:Ek|Ab)a|Ii|Oo|U)Hagayi|(?:Y(?:ez|o)|I[msz]|Ek|Ab|[IO])Hagayi|Hag(?:ayi)?)
			)(?:(?=[\d\s\xa0.:,;\x1e\x1f&\(\)\uff08\uff09\[\]/"'\*=~\-\u2013\u2014])|$)///gi
	,
		osis: ["Zech"]
		regexp: ///(^|#{bcv_parser::regexps.pre_book})(
		(?:K(?:wabase?|(?:um)?a|um?)?Zekariya|(?:Y(?:ezi|oo)|I[msz]i|(?:Ek|Ab)a|Ii|Oo|U)Zekariya|(?:Y(?:ez|o)|I[msz]|Ek|Ab|[IO])Zekariya|Ze(?:kariya|ch))
			)(?:(?=[\d\s\xa0.:,;\x1e\x1f&\(\)\uff08\uff09\[\]/"'\*=~\-\u2013\u2014])|$)///gi
	,
		osis: ["Mal"]
		regexp: ///(^|#{bcv_parser::regexps.pre_book})(
		(?:K(?:wabase?|(?:um)?a|um?)?Malaki|(?:Y(?:ezi|oo)|I[msz]i|(?:Ek|Ab)a|Ii|Oo|U)Malaki|(?:Y(?:ez|o)|I[msz]|Ek|Ab|[IO])Malaki|Mal(?:aki)?)
			)(?:(?=[\d\s\xa0.:,;\x1e\x1f&\(\)\uff08\uff09\[\]/"'\*=~\-\u2013\u2014])|$)///gi
	,
		osis: ["Matt"]
		regexp: ///(^|#{bcv_parser::regexps.pre_book})(
		(?:K(?:wabase?|(?:um)?a|um?)?Mateyu|(?:Y(?:ezi|oo)|I[msz]i|(?:Ek|Ab)a|Ii|Oo|U)Mateyu|(?:Y(?:ez|o)|I[msz]|Ek|Ab|[IO])Mateyu|Mat(?:eyu|t)?)
			)(?:(?=[\d\s\xa0.:,;\x1e\x1f&\(\)\uff08\uff09\[\]/"'\*=~\-\u2013\u2014])|$)///gi
	,
		osis: ["Mark"]
		regexp: ///(^|#{bcv_parser::regexps.pre_book})(
		(?:K(?:wabase?|(?:um)?a|um?)?Marko|(?:Y(?:ezi|oo)|I[msz]i|(?:Ek|Ab)a|Ii|Oo|U)Marko|(?:Y(?:ez|o)|I[msz]|Ek|Ab|[IO])Marko|Marko?)
			)(?:(?=[\d\s\xa0.:,;\x1e\x1f&\(\)\uff08\uff09\[\]/"'\*=~\-\u2013\u2014])|$)///gi
	,
		osis: ["Luke"]
		regexp: ///(^|#{bcv_parser::regexps.pre_book})(
		(?:K(?:wabase?|(?:um)?a|um?)?Luka|(?:Y(?:ezi|oo)|I[msz]i|(?:Ek|Ab)a|Ii|Oo|U)Luka|(?:Y(?:ez|o)|I[msz]|Ek|Ab|[IO])Luka|Luk[ae])
			)(?:(?=[\d\s\xa0.:,;\x1e\x1f&\(\)\uff08\uff09\[\]/"'\*=~\-\u2013\u2014])|$)///gi
	,
		osis: ["1John"]
		regexp: ///(^|[^0-9A-Za-zªµºÀ-ÖØ-öø-ɏḀ-ỿⱠ-ⱿꜢ-ꞈꞋ-ꞎꞐ-ꞓꞠ-Ɦꟸ-ꟿ])(
		(?:K(?:wabas(?:eYohane[\s\xa0]*[1I]|Yohane[\s\xa0]*[1I])|(?:um)?aYohane[\s\xa0]*[1I]|(?:um?)?Yohane[\s\xa0]*[1I])|(?:Y(?:ezi|oo)|I[msz]i|(?:Ek|Ab)a|Oo|Ii|U)Yohane[\s\xa0]*[1I]|(?:Y(?:ez|o)|I[msz]|Ek|Ab|[IO])Yohane[\s\xa0]*[1I]|1(?:\.[\s\xa0]*Y(?:ohane|h)|[\s\xa0]*Y(?:ohane|h)|John)|I(?:\.[\s\xa0]*Y(?:ohane|h)|[\s\xa0]*Y(?:ohane|h))|Yohane[\s\xa0]*[1I]|(?:1\.?|I\.?)[\s\xa0]*Yoh)
			)(?:(?=[\d\s\xa0.:,;\x1e\x1f&\(\)\uff08\uff09\[\]/"'\*=~\-\u2013\u2014])|$)///gi
	,
		osis: ["2John"]
		regexp: ///(^|[^0-9A-Za-zªµºÀ-ÖØ-öø-ɏḀ-ỿⱠ-ⱿꜢ-ꞈꞋ-ꞎꞐ-ꞓꞠ-Ɦꟸ-ꟿ])(
		(?:K(?:wabas(?:eYohane[\s\xa0]*(?:II|2)|Yohane[\s\xa0]*(?:II|2))|(?:um)?aYohane[\s\xa0]*(?:II|2)|(?:um?)?Yohane[\s\xa0]*(?:II|2))|(?:Y(?:ezi|oo)|I[msz]i|(?:Ek|Ab)a|Oo|Ii|U)Yohane[\s\xa0]*(?:II|2)|(?:Y(?:ez|o)|I[msz]|Ek|Ab|[IO])Yohane[\s\xa0]*(?:II|2)|II(?:\.[\s\xa0]*Y(?:ohane|h)|[\s\xa0]*Y(?:ohane|h))|2(?:\.[\s\xa0]*Y(?:ohane|h)|[\s\xa0]*Y(?:ohane|h)|John)|Yohane[\s\xa0]*(?:II|2)|(?:II\.?|2\.?)[\s\xa0]*Yoh)
			)(?:(?=[\d\s\xa0.:,;\x1e\x1f&\(\)\uff08\uff09\[\]/"'\*=~\-\u2013\u2014])|$)///gi
	,
		osis: ["3John"]
		regexp: ///(^|[^0-9A-Za-zªµºÀ-ÖØ-öø-ɏḀ-ỿⱠ-ⱿꜢ-ꞈꞋ-ꞎꞐ-ꞓꞠ-Ɦꟸ-ꟿ])(
		(?:K(?:wabas(?:eYohane[\s\xa0]*(?:III|3)|Yohane[\s\xa0]*(?:III|3))|(?:um)?aYohane[\s\xa0]*(?:III|3)|(?:um?)?Yohane[\s\xa0]*(?:III|3))|(?:Y(?:ezi|oo)|I[msz]i|(?:Ek|Ab)a|Oo|Ii|U)Yohane[\s\xa0]*(?:III|3)|(?:Y(?:ez|o)|I[msz]|Ek|Ab|[IO])Yohane[\s\xa0]*(?:III|3)|III(?:\.[\s\xa0]*Y(?:ohane|h)|[\s\xa0]*Y(?:ohane|h))|Yohane[\s\xa0]*(?:III|3)|3(?:\.[\s\xa0]*Y(?:ohane|h)|[\s\xa0]*Y(?:ohane|h)|John)|(?:III\.?|3\.?)[\s\xa0]*Yoh)
			)(?:(?=[\d\s\xa0.:,;\x1e\x1f&\(\)\uff08\uff09\[\]/"'\*=~\-\u2013\u2014])|$)///gi
	,
		osis: ["John"]
		regexp: ///(^|#{bcv_parser::regexps.pre_book})(
		(?:K(?:wabase?|(?:um)?a|um?)?Yohane|(?:Y(?:ezi|oo)|I[msz]i|(?:Ek|Ab)a|Oo|Ii|U)Yohane|(?:Y(?:ez|o)|I[msz]|Ek|Ab|[IO])Yohane|Yohane|John|Yoh)
			)(?:(?=[\d\s\xa0.:,;\x1e\x1f&\(\)\uff08\uff09\[\]/"'\*=~\-\u2013\u2014])|$)///gi
	,
		osis: ["Acts"]
		regexp: ///(^|#{bcv_parser::regexps.pre_book})(
		(?:K(?:wabase?|(?:um)?a|um?)?Zenzo|(?:Y(?:ezi|oo)|I[msz]i|(?:Ek|Ab)a|Ii|Oo|U)Zenzo|(?:Y(?:ez|o)|I[msz]|Ek|Ab|I|O)?Zenzo|Acts)
			)(?:(?=[\d\s\xa0.:,;\x1e\x1f&\(\)\uff08\uff09\[\]/"'\*=~\-\u2013\u2014])|$)///gi
	,
		osis: ["Rom"]
		regexp: ///(^|#{bcv_parser::regexps.pre_book})(
		(?:K(?:wabase?|(?:um)?a|um?)?Roma|(?:Y(?:ezi|oo)|I[msz]i|(?:Ek|Ab)a|Ii|Oo|U)Roma|(?:Y(?:ez|o)|I[msz]|Ek|Ab|[IO])Roma|Roma?)
			)(?:(?=[\d\s\xa0.:,;\x1e\x1f&\(\)\uff08\uff09\[\]/"'\*=~\-\u2013\u2014])|$)///gi
	,
		osis: ["2Cor"]
		regexp: ///(^|[^0-9A-Za-zªµºÀ-ÖØ-öø-ɏḀ-ỿⱠ-ⱿꜢ-ꞈꞋ-ꞎꞐ-ꞓꞠ-Ɦꟸ-ꟿ])(
		(?:K(?:wabas(?:eKorinte[\s\xa0]*(?:II|2)|Korinte[\s\xa0]*(?:II|2))|(?:um)?aKorinte[\s\xa0]*(?:II|2)|(?:um?)?Korinte[\s\xa0]*(?:II|2)|orinte[\s\xa0]*(?:II|2))|(?:Y(?:ezi|oo)|I[msz]i|(?:Ek|Ab)a|Ii|Oo|U)Korinte[\s\xa0]*(?:II|2)|(?:Y(?:ez|o)|I[msz]|Ek|Ab|[IO])Korinte[\s\xa0]*(?:II|2)|(?:II\.?[\s\xa0]*K|2(?:\.[\s\xa0]*K|[\s\xa0]*K|C))or)
			)(?:(?=[\d\s\xa0.:,;\x1e\x1f&\(\)\uff08\uff09\[\]/"'\*=~\-\u2013\u2014])|$)///gi
	,
		osis: ["1Cor"]
		regexp: ///(^|[^0-9A-Za-zªµºÀ-ÖØ-öø-ɏḀ-ỿⱠ-ⱿꜢ-ꞈꞋ-ꞎꞐ-ꞓꞠ-Ɦꟸ-ꟿ])(
		(?:K(?:wabas(?:eKorinte[\s\xa0]*[1I]|Korinte[\s\xa0]*[1I])|(?:um)?aKorinte[\s\xa0]*[1I]|(?:um?)?Korinte[\s\xa0]*[1I]|orinte[\s\xa0]*[1I])|(?:Y(?:ezi|oo)|I[msz]i|(?:Ek|Ab)a|Ii|Oo|U)Korinte[\s\xa0]*[1I]|(?:Y(?:ez|o)|I[msz]|Ek|Ab|[IO])Korinte[\s\xa0]*[1I]|(?:1(?:\.[\s\xa0]*K|[\s\xa0]*K|C)|I\.?[\s\xa0]*K)or)
			)(?:(?=[\d\s\xa0.:,;\x1e\x1f&\(\)\uff08\uff09\[\]/"'\*=~\-\u2013\u2014])|$)///gi
	,
		osis: ["Gal"]
		regexp: ///(^|#{bcv_parser::regexps.pre_book})(
		(?:K(?:wabase?|(?:um)?a|um?)?Galati|(?:Y(?:ezi|oo)|I[msz]i|(?:Ek|Ab)a|Ii|Oo|U)Galati|(?:Y(?:ez|o)|I[msz]|Ek|Ab|[IO])Galati|Gal(?:ati)?)
			)(?:(?=[\d\s\xa0.:,;\x1e\x1f&\(\)\uff08\uff09\[\]/"'\*=~\-\u2013\u2014])|$)///gi
	,
		osis: ["Eph"]
		regexp: ///(^|#{bcv_parser::regexps.pre_book})(
		(?:K(?:wabase?|(?:um)?a|um?)?Efese|(?:Y(?:ezi|oo)|I[msz]i|(?:Ek|Ab)a|Ii|Oo|U)Efese|(?:Y(?:ez|o)|I[msz]|Ek|Ab|[IO])Efese|E(?:fese|ph))
			)(?:(?=[\d\s\xa0.:,;\x1e\x1f&\(\)\uff08\uff09\[\]/"'\*=~\-\u2013\u2014])|$)///gi
	,
		osis: ["Phil"]
		regexp: ///(^|#{bcv_parser::regexps.pre_book})(
		(?:K(?:wabase?|(?:um)?a|um?)?Filipi|(?:Y(?:ezi|oo)|I[msz]i|(?:Ek|Ab)a|Ii|Oo|U)Filipi|(?:Y(?:ez|o)|I[msz]|Ek|Ab|[IO])Filipi|Filip[iu]|Phil)
			)(?:(?=[\d\s\xa0.:,;\x1e\x1f&\(\)\uff08\uff09\[\]/"'\*=~\-\u2013\u2014])|$)///gi
	,
		osis: ["Col"]
		regexp: ///(^|#{bcv_parser::regexps.pre_book})(
		(?:K(?:wabase?Kolose|(?:um)?aKolose|(?:um?)?Kolose|ol(?:ose)?)|(?:Y(?:ezi|oo)|I[msz]i|(?:Ek|Ab)a|Ii|Oo|U)Kolose|(?:Y(?:ez|o)|I[msz]|Ek|Ab|[IO])Kolose|Col)
			)(?:(?=[\d\s\xa0.:,;\x1e\x1f&\(\)\uff08\uff09\[\]/"'\*=~\-\u2013\u2014])|$)///gi
	,
		osis: ["2Thess"]
		regexp: ///(^|[^0-9A-Za-zªµºÀ-ÖØ-öø-ɏḀ-ỿⱠ-ⱿꜢ-ꞈꞋ-ꞎꞐ-ꞓꞠ-Ɦꟸ-ꟿ])(
		(?:K(?:wabas(?:eTesalonika[\s\xa0]*(?:II|2)|Tesalonika[\s\xa0]*(?:II|2))|(?:um)?aTesalonika[\s\xa0]*(?:II|2)|(?:um?)?Tesalonika[\s\xa0]*(?:II|2))|(?:Y(?:ezi|oo)|I[msz]i|(?:Ek|Ab)a|Ii|Oo|U)Tesalonika[\s\xa0]*(?:II|2)|(?:Y(?:ez|o)|I[msz]|Ek|Ab|I|O)?Tesalonika[\s\xa0]*(?:II|2)|II(?:\.[\s\xa0]*T(?:esalonika|s)|[\s\xa0]*T(?:esalonika|s))|2(?:\.[\s\xa0]*T(?:esalonika|s)|[\s\xa0]*T(?:esalonika|s)|Thess)|(?:II\.?|2\.?)[\s\xa0]*Tes)
			)(?:(?=[\d\s\xa0.:,;\x1e\x1f&\(\)\uff08\uff09\[\]/"'\*=~\-\u2013\u2014])|$)///gi
	,
		osis: ["1Thess"]
		regexp: ///(^|[^0-9A-Za-zªµºÀ-ÖØ-öø-ɏḀ-ỿⱠ-ⱿꜢ-ꞈꞋ-ꞎꞐ-ꞓꞠ-Ɦꟸ-ꟿ])(
		(?:K(?:wabas(?:eTesalonika[\s\xa0]*[1I]|Tesalonika[\s\xa0]*[1I])|(?:um)?aTesalonika[\s\xa0]*[1I]|(?:um?)?Tesalonika[\s\xa0]*[1I])|(?:Y(?:ezi|oo)|I[msz]i|(?:Ek|Ab)a|Ii|Oo|U)Tesalonika[\s\xa0]*[1I]|(?:Y(?:ez|o)|I[msz]|Ek|Ab|I|O)?Tesalonika[\s\xa0]*[1I]|1(?:\.[\s\xa0]*T(?:esalonika|s)|[\s\xa0]*T(?:esalonika|s)|Thess)|I(?:\.[\s\xa0]*T(?:esalonika|s)|[\s\xa0]*T(?:esalonika|s))|(?:1\.?|I\.?)[\s\xa0]*Tes)
			)(?:(?=[\d\s\xa0.:,;\x1e\x1f&\(\)\uff08\uff09\[\]/"'\*=~\-\u2013\u2014])|$)///gi
	,
		osis: ["2Tim"]
		regexp: ///(^|[^0-9A-Za-zªµºÀ-ÖØ-öø-ɏḀ-ỿⱠ-ⱿꜢ-ꞈꞋ-ꞎꞐ-ꞓꞠ-Ɦꟸ-ꟿ])(
		(?:K(?:wabas(?:eTimoti[\s\xa0]*(?:II|2)|Timoti[\s\xa0]*(?:II|2))|(?:um)?aTimoti[\s\xa0]*(?:II|2)|(?:um?)?Timoti[\s\xa0]*(?:II|2))|(?:Y(?:ezi|oo)|I[msz]i|(?:Ek|Ab)a|Ii|Oo|U)Timoti[\s\xa0]*(?:II|2)|(?:Y(?:ez|o)|I[msz]|Ek|Ab|I|O)?Timoti[\s\xa0]*(?:II|2)|(?:II\.?[\s\xa0]*|2(?:\.[\s\xa0]*|[\s\xa0]*)?)Tim)
			)(?:(?=[\d\s\xa0.:,;\x1e\x1f&\(\)\uff08\uff09\[\]/"'\*=~\-\u2013\u2014])|$)///gi
	,
		osis: ["1Tim"]
		regexp: ///(^|[^0-9A-Za-zªµºÀ-ÖØ-öø-ɏḀ-ỿⱠ-ⱿꜢ-ꞈꞋ-ꞎꞐ-ꞓꞠ-Ɦꟸ-ꟿ])(
		(?:K(?:wabas(?:eTimoti[\s\xa0]*[1I]|Timoti[\s\xa0]*[1I])|(?:um)?aTimoti[\s\xa0]*[1I]|(?:um?)?Timoti[\s\xa0]*[1I])|(?:Y(?:ezi|oo)|I[msz]i|(?:Ek|Ab)a|Ii|Oo|U)Timoti[\s\xa0]*[1I]|(?:Y(?:ez|o)|I[msz]|Ek|Ab|I|O)?Timoti[\s\xa0]*[1I]|(?:1(?:\.[\s\xa0]*|[\s\xa0]*)?|I\.?[\s\xa0]*)Tim)
			)(?:(?=[\d\s\xa0.:,;\x1e\x1f&\(\)\uff08\uff09\[\]/"'\*=~\-\u2013\u2014])|$)///gi
	,
		osis: ["Titus"]
		regexp: ///(^|#{bcv_parser::regexps.pre_book})(
		(?:K(?:wabase?|(?:um)?a|um?)?Tito|(?:Y(?:ezi|oo)|I[msz]i|(?:Ek|Ab)a|Ii|Oo|U)Tito|(?:Y(?:ez|o)|I[msz]|Ek|Ab|[IO])Tito|Tit(?:us|o))
			)(?:(?=[\d\s\xa0.:,;\x1e\x1f&\(\)\uff08\uff09\[\]/"'\*=~\-\u2013\u2014])|$)///gi
	,
		osis: ["Phlm"]
		regexp: ///(^|#{bcv_parser::regexps.pre_book})(
		(?:K(?:wabase?|(?:um)?a|um?)?Filemon|(?:Y(?:ezi|oo)|I[msz]i|(?:Ek|Ab)a|Ii|Oo|U)Filemon|(?:Y(?:ez|o)|I[msz]|Ek|Ab|I|O)?Filemon|Phlm)
			)(?:(?=[\d\s\xa0.:,;\x1e\x1f&\(\)\uff08\uff09\[\]/"'\*=~\-\u2013\u2014])|$)///gi
	,
		osis: ["Heb"]
		regexp: ///(^|#{bcv_parser::regexps.pre_book})(
		(?:K(?:wabase?|(?:um)?a|um?)?Hebhere|(?:Y(?:ezi|oo)|I[msz]i|(?:Ek|Ab)a|Ii|Oo|U)Hebhere|(?:Y(?:ez|o)|I[msz]|Ek|Ab|[IO])Hebhere|Heb(?:here)?)
			)(?:(?=[\d\s\xa0.:,;\x1e\x1f&\(\)\uff08\uff09\[\]/"'\*=~\-\u2013\u2014])|$)///gi
	,
		osis: ["Jas"]
		regexp: ///(^|#{bcv_parser::regexps.pre_book})(
		(?:K(?:wabase?|(?:um)?a|um?)?Yakobi|(?:Y(?:ezi|oo)|I[msz]i|(?:Ek|Ab)a|Ii|Oo|U)Yakobi|(?:Y(?:ez|o)|I[msz]|Ek|Ab|[IO])Yakobi|Yakobi|Jas)
			)(?:(?=[\d\s\xa0.:,;\x1e\x1f&\(\)\uff08\uff09\[\]/"'\*=~\-\u2013\u2014])|$)///gi
	,
		osis: ["2Pet"]
		regexp: ///(^|[^0-9A-Za-zªµºÀ-ÖØ-öø-ɏḀ-ỿⱠ-ⱿꜢ-ꞈꞋ-ꞎꞐ-ꞓꞠ-Ɦꟸ-ꟿ])(
		(?:2(?:\.[\s\xa0]*Pe?|[\s\xa0]*Pe?)tr)|(?:K(?:wabas(?:ePetros[\s\xa0]*(?:II|2)|Petros[\s\xa0]*(?:II|2))|(?:um)?aPetros[\s\xa0]*(?:II|2)|(?:um?)?Petros[\s\xa0]*(?:II|2))|(?:Y(?:ezi|oo)|I[msz]i|(?:Ek|Ab)a|Ii|Oo|U)Petros[\s\xa0]*(?:II|2)|(?:Y(?:ez|o)|I[msz]|Ek|Ab|I|O)?Petros[\s\xa0]*(?:II|2)|II(?:\.[\s\xa0]*Pe?|[\s\xa0]*Pe?)tr|II(?:\.[\s\xa0]*Pe?|[\s\xa0]*Pe?)t|2(?:\.[\s\xa0]*Pe?|[\s\xa0]*Pe?|Pe)t)
			)(?:(?=[\d\s\xa0.:,;\x1e\x1f&\(\)\uff08\uff09\[\]/"'\*=~\-\u2013\u2014])|$)///gi
	,
		osis: ["1Pet"]
		regexp: ///(^|[^0-9A-Za-zªµºÀ-ÖØ-öø-ɏḀ-ỿⱠ-ⱿꜢ-ꞈꞋ-ꞎꞐ-ꞓꞠ-Ɦꟸ-ꟿ])(
		(?:K(?:wabas(?:ePetros[\s\xa0]*[1I]|Petros[\s\xa0]*[1I])|(?:um)?aPetros[\s\xa0]*[1I]|(?:um?)?Petros[\s\xa0]*[1I])|(?:Y(?:ezi|oo)|I[msz]i|(?:Ek|Ab)a|Ii|Oo|U)Petros[\s\xa0]*[1I]|(?:Y(?:ez|o)|I[msz]|Ek|Ab|I|O)?Petros[\s\xa0]*[1I]|1(?:\.[\s\xa0]*Pe?tr|[\s\xa0]*Pe?tr|Pet)|I(?:\.[\s\xa0]*Pe?|[\s\xa0]*Pe?)tr|(?:1(?:\.[\s\xa0]*Pe?|[\s\xa0]*Pe?)|I(?:\.[\s\xa0]*Pe?|[\s\xa0]*Pe?))t)
			)(?:(?=[\d\s\xa0.:,;\x1e\x1f&\(\)\uff08\uff09\[\]/"'\*=~\-\u2013\u2014])|$)///gi
	,
		osis: ["Jude"]
		regexp: ///(^|#{bcv_parser::regexps.pre_book})(
		(?:K(?:wabase?|(?:um)?a|um?)?Yuda|(?:Y(?:ezi|oo)|I[msz]i|(?:Ek|Ab)a|Ii|Oo|U)Yuda|(?:Y(?:ez|o)|I[msz]|Ek|Ab|[IO])Yuda|Jude|Yuda)
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
		regexp: ///(^|[^0-9A-Za-zªµºÀ-ÖØ-öø-ɏḀ-ỿⱠ-ⱿꜢ-ꞈꞋ-ꞎꞐ-ꞓꞠ-Ɦꟸ-ꟿ])(
		(?:2Macc)
			)(?:(?=[\d\s\xa0.:,;\x1e\x1f&\(\)\uff08\uff09\[\]/"'\*=~\-\u2013\u2014])|$)///gi
	,
		osis: ["3Macc"]
		apocrypha: true
		regexp: ///(^|[^0-9A-Za-zªµºÀ-ÖØ-öø-ɏḀ-ỿⱠ-ⱿꜢ-ꞈꞋ-ꞎꞐ-ꞓꞠ-Ɦꟸ-ꟿ])(
		(?:3Macc)
			)(?:(?=[\d\s\xa0.:,;\x1e\x1f&\(\)\uff08\uff09\[\]/"'\*=~\-\u2013\u2014])|$)///gi
	,
		osis: ["4Macc"]
		apocrypha: true
		regexp: ///(^|[^0-9A-Za-zªµºÀ-ÖØ-öø-ɏḀ-ỿⱠ-ⱿꜢ-ꞈꞋ-ꞎꞐ-ꞓꞠ-Ɦꟸ-ꟿ])(
		(?:4Macc)
			)(?:(?=[\d\s\xa0.:,;\x1e\x1f&\(\)\uff08\uff09\[\]/"'\*=~\-\u2013\u2014])|$)///gi
	,
		osis: ["1Macc"]
		apocrypha: true
		regexp: ///(^|[^0-9A-Za-zªµºÀ-ÖØ-öø-ɏḀ-ỿⱠ-ⱿꜢ-ꞈꞋ-ꞎꞐ-ꞓꞠ-Ɦꟸ-ꟿ])(
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
