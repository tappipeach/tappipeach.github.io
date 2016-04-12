//******************************************
// This is a special european version of searchFunctions.js
// that converts european search term characters to ISO-8859-1
//******************************************

//This generic function will return the value of a QueryString
function getQueryString(Val) {
	thisURLparamStr = document.location.search;
	//chop "?" off thisURLparamStr
	if (thisURLparamStr.charAt(0) == "?") thisURLparamStr = thisURLparamStr.substring(1, thisURLparamStr.length);
	returnStr = "";
	if (thisURLparamStr != "") {
		//Build array out of thisURLparamStr using "&" as delimiter
		divide1=(thisURLparamStr.split("&"))
		for (i=0; i < divide1.length; i++) {
			divide2 = divide1[i].split("=")
			if (unescape(divide2[0]) == Val) {
				if (returnStr == "") {
					returnStr = unescape(divide2[1]);
				} else {
					returnStr += "|" + unescape(divide2[1])
				}
			}
		}
	}
	
	var myRegExp = new RegExp();
	myREgExp = /\+/g;
	returnStr = returnStr.replace(myREgExp, " ");	
	return returnStr;
}


// This function merges title, brief description, page content, keywords 
function mergeStrings(str1, str2, str3) {

	var mergeStr = "";
	var mergeString = "";
	// join str2 (brief description) and str3 (rest of page text)
	// if page content is longer than brief description length,
	// then str2 ends "..."
	// if str2 ends "..." remove dots
	if ((str2.length > 0) && (str2.charAt(0) != " ")) str2 = " " + str2;
	if (str2.substring(str2.length - 3, str2.length) == "...") {
			mergeString = str2.substring(0, str2.length - 3).concat(str3);
	} else {
			mergeString = str2.concat(str3);
	}
	mergeString = str1 + mergeString
	return mergeString

}


//this function builds brief description object
function briefDescrip(posStart, posEnd, posTerm, termTxt, isBegin, isEnd) {


	//get workable substring from termTxt characters
	var subStrStart = (isBegin)? 0:termTxt.indexOf(" ");
	var subStrEnd = (isEnd)? termTxt.length:termTxt.lastIndexOf(" ");
	termTxt = termTxt.substring(subStrStart, subStrEnd);
	//adjust position properties to new termTxt substring
	var termStrStart = posStart + subStrStart;
	var termStrEnd = termStrStart + termTxt.length;
	var posTerm = posTerm - subStrStart;
	
	//alert(termTxt + ", " + termStrStart + ", " + termStrEnd + ", " + posTerm)

	this.posStart = termStrStart;
	this.posEnd = termStrEnd;
	this.posTerm = posTerm;
	this.termTxt= termTxt;
}


//This function ensures that the brief description string does not contain repeats
function noPreviousOccur(thisArray, thisIndex) {
	returnStr = true;

	if (thisIndex > refineAllString.length) {
		returnStr = false;
	} else {
		//if thisIndex is contained in an existing substring return false
		for (x=0; x < thisArray.length; x++) {
			if ((thisIndex > thisArray[x].posStart) && (thisIndex < thisArray[x].posEnd)) {
				returnStr = false;
				break;
			}
		}
	}
	return returnStr;
}


// This function will parse the URL search string and change a name/value pair
function changeParam(whichParam, newVal) {
	newParamStr = "";
	thisURLstr = document.location.href.substring(0, document.location.href.indexOf("?"));
	thisURLparamStr = document.location.href.substring(document.location.href.indexOf("?") + 1, document.location.href.length);
	//Build array out of thisURLparamStr using "&" as delimiter
	divide1=(thisURLparamStr.split("&"))
	for (cnt=0; cnt < divide1.length; cnt++) {
		divide2 = divide1[cnt].split("=")
		if (divide2[0] == whichParam) {
			// if we find whichParam in thisURLparamStr replace whichParam's value with newVal
			newParamStr = newParamStr + divide2[0] + "=" + escape(newVal) + "&";
		} else {
			//leave other parameters intact
			newParamStr = newParamStr + divide2[0] + "=" + divide2[1] + "&";
		}
	}
	//strip off trailing ampersand
	if (newParamStr.charAt(newParamStr.length - 1) == "&") newParamStr = newParamStr.substring(0, newParamStr.length - 1);
	//return new URL
 	return(thisURLstr + "?" + newParamStr);
}


// Sorts search results based on 1.Number of hits 2.alphabetically
function compare(a, b) {
	if (parseInt(a) - parseInt(b) != 0) {
		return parseInt(a) - parseInt(b)
	}else {
		var aComp = a.substring(a.indexOf("|") + 1, a.length).toLowerCase();
		var bComp = b.substring(b.indexOf("|") + 1, b.length).toLowerCase();
		if (aComp < bComp) {return -1}
		if (aComp > bComp) {return 1}
		return 0
	}
}


function cleanUp(inputStr) {
	var returnStr = "";
	//myRE = new RegExp(/(\*|\/|\?|\[|\])/g)
	var myRegExp = new RegExp();
	myREgExp = /\+/g;
	returnStr = inputStr.replace(myREgExp, " ");
	//clean up spaces at beginning of string
	while (returnStr.charAt(0) == ' ') {					
		returnStr = returnStr.substring(1,returnStr.length);
	}
	//clean up spaces at end of string
	while (returnStr.charAt(returnStr.length - 1) == ' ') {
		returnStr = returnStr.substring(0,returnStr.length - 1);
	}

	//change ASCII euro to ISO-8859-1
	returnStr = convertSGML(returnStr);
	return returnStr;
}

//convert ASCII euro characters to ISO-8859-1
function convertSGML(entry) {

	var SGMLlist = new Array("À|&Agrave;", "à|&agrave;", "Á|&Aacute;", "á|&aacute;", "Â|&Acirc;", "â|&acirc;", "Ã|&Atilde;", "ã|&atilde;", "Ä|&Auml;", "ä|&auml;", "Å|&Aring;", "å|&aring;", "Æ|&AElig;", "æ|&aelig;", "Ç|&Ccedil;", "ç|&ccedil;", "È|&Egrave;", "è|&egrave;", "É|&Eacute;", "é|&eacute;", "Ê|&Ecirc;", "ê|&ecirc;", "Ë|&Euml;", "ë|&euml;", "Ì|&Igrave;", "ì|&igrave;", "Í|&Iacute;", "í|&iacute;", "Î|&Icirc;", "î|&icirc;", "Ï|&Iuml;", "ï|&iuml;", "Ð|&ETH;", "ð|&eth;", "Ñ|&Ntilde;", "ñ|&ntilde;", "Ò|&Ograve;", "ò|&ograve;", "Ó|&Oacute;", "ó|&oacute;", "Ô|&Ocirc;", "ô|&ocirc;", "Õ|&Otilde;", "õ|&otilde;", "Ö|&Ouml;", "ö|&ouml;", "Ø|&Oslash;", "ø|&oslash;", "Ù|&Ugrave;", "ù|&ugrave;", "Ú|&Uacute;", "ú|&uacute;", "Û|&Ucirc;", "û|&ucirc;", "Ü|&Uuml;", "Ü|&Uuml;", "ü|&uuml;", "Ý|&Yacute;", "ý|&yacute;");

	for (i=0; i<SGMLlist.length; i++) {
		divide = SGMLlist[i].split("|");
		eval("myRE = /"+divide[0]+"/g");
		entry = entry.replace(myRE, divide[1]);
	}

	return entry;
}

function checkMetaData() {
	thisMeta = 3;
	isMatch = true;
	meta_loop:
	for (i=0; i<metaArray.length; i++) {
		//alert("meta" + parseInt(i+1) + ": " + metaArray[i])
		if (metaArray[i] != "") {
			metaSplit = metaArray[i].split("|");
			for (j=0; j<metaSplit.length; j++) {
				isMatch = false;
				//alert((splitline[thisMeta].toUpperCase()) + ": " + (metaSplit[j].toUpperCase()))
				//if (splitline[thisMeta].toUpperCase() == metaSplit[j].toUpperCase()) {
				if (splitline[thisMeta].toUpperCase().indexOf(metaSplit[j].toUpperCase()) > -1) {
					isMatch = true;
					break;
				}
			}
			if (isMatch == false) break meta_loop;
		}
		thisMeta++;
		
	}
	//alert(isMatch)
	return isMatch;
}

//retrieve form submission, declare globals
var searchTerm = cleanUp(getQueryString("searchField"));
var srcCrit = getQueryString("srcriteria");
var meta1 = getQueryString("meta1");
var meta2 = getQueryString("meta2");
var meta3 = getQueryString("meta3");
var meta4 = getQueryString("meta4");
var meta5 = getQueryString("meta5");
var meta6 = getQueryString("meta6");
var meta7 = getQueryString("meta7");
var meta8 = getQueryString("meta8");
var meta9 = getQueryString("meta9");
var meta10 = getQueryString("meta10");
var metaArray = new Array(meta1, meta2, meta3, meta4, meta5, meta6, meta7, meta8, meta9, meta10);
var srcRange = (getQueryString("range") != "")? parseInt(getQueryString("range")):1;
var maxPages = 10;
var OccurNum = 0;
var beginPhrase = 0;
var splitline = new Array();
var searchArray = new Array();
var matchArray = new Array();
var descripStrArray = new Array();
var DescripStr = "";
var allConfirmation = true;
var atBegin = false;
var atEnd = false;
var isMatchPage = false;
var REsearchTerm = searchTerm;
var myRegExp = new RegExp();
var specialChars = new Array("*", "/", "?", "[", "]")
for (i=0; i<specialChars.length; i++) {
	eval("myREgExp = /\\" + specialChars[i] + "/g");
	REsearchTerm = REsearchTerm.replace(myREgExp, "\\" + specialChars[i]);
}



function doSearch() {
	for (cnt1=0; cnt1<profiles.length; cnt1++) {
	
		OccurNum = 0;
		MatchesPerTerm = 0;
		isMatchPage = false;
		splitline = profiles[cnt1].split("|");
		//refineAllString = mergeStrings(splitline[0], splitline[1], splitline[2])
		refineAllString = mergeStrings(splitline[0], splitline[1], "")
		pgKeyWds = splitline[3];
		descripStrArray = new Array();
		DescripStr = "";

		if (checkMetaData()) {   //does meta tag info match?
		
			isMatchPage = (REsearchTerm == "")? true:false;
			switch (srcCrit) {

				case "all":    //user requests ALL WORDS
				allConfirmation = true;
				if (REsearchTerm!= "") searchArray = REsearchTerm.split(" ");
				//determine how many terms get a phrase in the description
				MatchesPerTerm = (parseInt(4/searchArray.length) > 0)? parseInt(4/searchArray.length):1;
				// loop through all search terms
				for (cnt2 = 0; cnt2 < searchArray.length; cnt2++) {
					TotalMatches = 0;    //reset to zero for every new word
					eval("myRE = /" + searchArray[cnt2] + "/gi");
					OccurTest = myRE.test(refineAllString + pgKeyWds);

					if (OccurTest) {    // matches are found
						OccurArray = myRE.exec(refineAllString + pgKeyWds);
						myRE.firstIndex = 0;
						myRE.lastIndex = 0;
						beginPhrase = 0;
						while (OccurArray = myRE.exec(refineAllString + pgKeyWds)) {
						//while (refineAllString.match(myRE)) {
							OccurNum++;

							if ((TotalMatches < MatchesPerTerm) && (descripStrArray.length < 4)) {
								// if index for this term is not already contained in descripStrArray items then
								// build description object with four properties:
								// start index, end index, term position index, matching substring.
								beginPhrase = myRE.lastIndex - myRE.source.length;
								if (noPreviousOccur(descripStrArray, beginPhrase)) {

									//is substring beginning of refineAllString?
									if (beginPhrase - 35 > 0) {
										startPos = beginPhrase - 35;
										atBegin = false;

									} else {
										startPos = 0;
										atBegin = true;
									}
									//is substring end of refineAllString?
									if (myRE.lastIndex + 35 < refineAllString.length) {
										endPos =  myRE.lastIndex + 35;
										atEnd = false;

									} else {
										endPos = refineAllString.length;
										atEnd = true;
									}
									descripStrArray[descripStrArray.length] = new briefDescrip(startPos, endPos, beginPhrase, refineAllString.substring(startPos, endPos), atBegin, atEnd)
									TotalMatches++;
								}

							} else {
								break;
							}

						}    //end while


					} else {    //no match on this term
						allConfirmation = false;
						break;
					}


				} // end cnt2 loop

				if (allConfirmation) {

					//build brief description
					DescripStr = "";
					for (cnt2 = 0; cnt2 < descripStrArray.length; cnt2++) {
						DescripStr += descripStrArray[cnt2].termTxt + "&#8230;";
					}
					//matchArray[matchArray.length] = (0 - OccurNum) + "|" + splitline[0] + "|" + DescripStr + "|" + splitline[13]
					isMatchPage = true;
				}
				break;


				case "phrase":	//user requests EXACT PHRASE
				TotalMatches = 0;
				MatchesPerTerm = 4;
				if (REsearchTerm != "") {
					eval("myRE = /" + REsearchTerm + "/gi");
					OccurTest = myRE.test(refineAllString + pgKeyWds);
				} else {
					OccurTest = false;
				}
				if (OccurTest) {
					OccurArray = myRE.exec(refineAllString + pgKeyWds);
					myRE.firstIndex = 0;
					myRE.lastIndex = 0;
					beginPhrase = 0;
					while (OccurArray = myRE.exec(refineAllString + pgKeyWds)) {
						OccurNum++;
						if ((TotalMatches < MatchesPerTerm) && (descripStrArray.length < 4)) {

							beginPhrase = myRE.lastIndex - myRE.source.length;
							if (noPreviousOccur(descripStrArray, beginPhrase)) {

								//is substring beginning of refineAllString?
								if (beginPhrase - 35 > 0) {
									startPos = beginPhrase - 35;
									atBegin = false;

								} else {
									startPos = 0;
									atBegin = true;
								}
								//is substring end of refineAllString?
								if (myRE.lastIndex + 35 < refineAllString.length) {
									endPos =  myRE.lastIndex + 35;
									atEnd = false;

								} else {
									endPos = refineAllString.length;
									atEnd = true;
								}
								descripStrArray[descripStrArray.length] = new briefDescrip(startPos, endPos, beginPhrase, refineAllString.substring(startPos, endPos), atBegin, atEnd)
								TotalMatches++;
							}
						}
					}
					DescripStr = "";
					for (cnt2 = 0; cnt2 < descripStrArray.length; cnt2++) {
						DescripStr += descripStrArray[cnt2].termTxt + "&#8230;";
					}

					//matchArray[matchArray.length] = (0 - OccurNum) + "|" + splitline[0] + "|" + DescripStr + "|" + splitline[3]
					isMatchPage = true;
				}
				break;


				default:		//user requests nothing or ANY WORDS
				if (REsearchTerm != "") {
					searchArray = REsearchTerm.split(" ");
				} else {
					
					searchArray = new Array();
				}
				MatchesPerTerm = (parseInt(4/searchArray.length) > 0)? parseInt(4/searchArray.length):1;
				for (cnt2 = 0; cnt2 < searchArray.length; cnt2++) {

					TotalMatches = 0;    //reset to zero for every new word
					eval("myRE = /" + searchArray[cnt2] + "/gi");
					OccurTest = myRE.test(refineAllString + pgKeyWds);

					if (OccurTest) {    // matches are found
						OccurArray = myRE.exec(refineAllString + pgKeyWds);
						myRE.firstIndex = 0;
						myRE.lastIndex = 0;
						beginPhrase = 0;
						while (OccurArray = myRE.exec(refineAllString + pgKeyWds)) {
							OccurNum++;
							if ((TotalMatches < MatchesPerTerm) && (descripStrArray.length < 4)) {
								// if index for this term is not already contained in descripStrArray items then
								// build description object with four properties:
								// start index, end index, term position index, matching substring.
								beginPhrase = myRE.lastIndex - myRE.source.length;
								if (noPreviousOccur(descripStrArray, beginPhrase)) {

									//is substring beginning of refineAllString?
									if (beginPhrase - 35 > 0) {
										startPos = beginPhrase - 35;
										atBegin = false;

									} else {
										startPos = 0;
										atBegin = true;
									}
									//is substring end of refineAllString?
									if (myRE.lastIndex + 35 < refineAllString.length) {
										endPos =  myRE.lastIndex + 35;
										atEnd = false;

									} else {
										endPos = refineAllString.length;
										atEnd = true;
									}
									descripStrArray[descripStrArray.length] = new briefDescrip(startPos, endPos, beginPhrase, refineAllString.substring(startPos, endPos), atBegin, atEnd);
									TotalMatches++;
								}

							} else {
								break;
							}
						}
					}
				}
				if (OccurNum > 0) {
					//build brief description
					DescripStr = "";
					for (cnt3 = 0; cnt3 < descripStrArray.length; cnt3++) {
						DescripStr += descripStrArray[cnt3].termTxt + "&#8230;";
					}
					//matchArray[matchArray.length] = (0 - OccurNum) + "|" + splitline[0] + "|" + DescripStr + "|" + splitline[3]
					isMatchPage = true;
				}
				break;

			} //end switch
			
			
		if (isMatchPage) matchArray[matchArray.length] = (0 - OccurNum) + "|" + splitline[0] + "|" + DescripStr + "|" + splitline[13]

		} //end if checkMetaData()

	} //end cnt1



	//for (i=0; i<matchArray.length; i++) {
	//	divide = matchArray[i].split("|");
	//	document.write("<br>" + "<b>" + divide[1] + "</b> (" + divide[0] + ") " + "<br>" + divide[2] + "<br>")
	//}

	//results = passedArray;
	//pgRange = (getQueryString("range") != "")? parseInt(getQueryString("range")):1;
	document.writeln("<a name=\"top_of_page\"></a><h3>Search Results</h3>");
	document.writeln("<h4><hr size=\"1\">Search Query: " + searchTerm + "<br>");
	document.writeln("Search Results: "+ matchArray.length + "");
	document.writeln("<hr size=\"1\"></h4>");
	thisPg = 1;
	endPg = matchArray.length;
	if (matchArray.length > maxPages) {
		thisPg = (maxPages * srcRange) - (maxPages - 1);
		endPg = (parseInt(thisPg + (maxPages - 1)) < matchArray.length)? parseInt(thisPg + (maxPages - 1)):matchArray.length;
		document.writeln(thisPg + " - " + endPg + " of " + matchArray.length);
	}
	document.writeln("<dl>");
	matchArray.sort(compare);
	if (REsearchTerm != "") {
		wrdArray = (srcCrit != "phrase")? REsearchTerm.split(" "):new Array(REsearchTerm);
	} else {
		wrdArray = new Array();
	}

	
	for (i = (thisPg - 1); i < endPg; i++) {
		divide = matchArray[i].split("|"); 			// Print each profile result as a unit of a definition list
		
		// begin hilite terms in red
		for (j=0; j<wrdArray.length; j++) {
			eval("myRE1 = /" + wrdArray[j] + "/gi");
			regArr = null;
			regArr = divide[2].match(myRE1);
			if (regArr != null) {
				//look for uniqueness in regArr
				beenThere = new Array();
				for (k=0; k<regArr.length; k++) {
					beenhere = 0; 
					for (l=0; l<beenThere.length; l++) {
						if (beenThere[l] == regArr[k]) {
							beenhere = 1;
							//break;
						}
					}
					if (beenhere == 0) {
						beenThere[beenThere.length] = regArr[k];
						//escape RegExp special chars for RegExp
						var specialChars = new Array("*", "/", "?", "[", "]")
						tmpRegArr = regArr[k];
						for (l=0; l<specialChars.length; l++) {
							eval("myRE1a = /\\" + specialChars[l] + "/g");
							regArr[k] = regArr[k].replace(myRE1a, "\\" + specialChars[l]);
						}
						eval("myRE2 = /"+regArr[k]+"/g");
						divide[2] = divide[2].replace(myRE2, "<\|>" + tmpRegArr + "<\/\|>");
					}
				}
			}
		}

		myRE3 = /\<\|\>/g;
		myRE4 = /\<\/\|\>/g;
		divide[2] = divide[2].replace(myRE3, "<font color=red>");
		divide[2] = divide[2].replace(myRE4, "</font>");
		// end hilite terms in red
		document.writeln("<dt><a href=\""+divide[3]+"\" target=\"_self\"><b>" + divide[1] + "</b></a><\dt>");
		document.writeln("<dd>" + divide[2] + "</dd><br><br>");
	}
	
	document.writeln("</dl>");				// Finish the HTML document

	//write results page numbers
	if (matchArray.length > maxPages) {
		pgNum = parseInt(matchArray.length/maxPages);
		if (matchArray.length/maxPages > pgNum) pgNum++;
		pgLinks = "go to page: ";
		for (i=0; i < pgNum; i ++) {
			locationStr = (location.href.indexOf("&range=") > -1)? changeParam("range", parseInt(i + 1)):location.href + "&range=" + parseInt(i + 1);
			pgLinks += (parseInt(i + 1) != srcRange)? "<a href=\"" + locationStr + "\">" + (i + 1) + "</a> ":"<b>" + (i + 1) + "</b> ";
		}
		document.writeln(pgLinks + "<hr size=\"1\">");
	} 


}

