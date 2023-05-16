
// Determine what must be appended to each filename to go to the correct version
//
// Agent string:
//	Mozilla/4.0 (compatible; MSIE 6.0; Windows NT 5.1; STB; 560x384; MSNTV 4.0; THMDR)
//
//	where Client 1.0 is "MSNTV 4.0"
//	and   Client 1.1 is "MSNTV 4.1"

var midPath = "/resources/targeted/en-us/msntvv1/content/";
//var midPath = "/";	// Use this for testing pages on your own server

var clientVerAppendStr = getClientVerAppendStr();

function getClientVerAppendStr()
{
	var agent = navigator.userAgent;
	var startOfVersionIndex = agent.indexOf("MSNTV");

	if (startOfVersionIndex == -1)
	{
		// Default for when not MSN TV (probably a PC)
		return "_v21";
	}
	else
	{
		startOfVersionIndex = startOfVersionIndex + 6; // Skip "MSNTV "
		var endOfVersionIndex = agent.indexOf(";", startOfVersionIndex);
		var clientVersion = parseFloat(agent.substring(startOfVersionIndex, endOfVersionIndex));
		if (clientVersion <= 4.0)
			return "";
		else
		if (clientVersion == 4.1)
			return "_v11";
		else
		if (clientVersion == 4.2)
			return "_v12";
		else
		if (clientVersion == 4.3)
			return "_v13";
		else
		if (clientVersion == 5.0)
			return "_v20";
		else
		if (clientVersion == 5.1)
			return "_v21";
		else
			// Default for unknown version
			return "_v21";
	}
}

function constructBaseURL(pageURL)
{
	var protocol = "http:";	
	return protocol + "//" + document.location.host + midPath;	//	Example:  http://help.msn-int.com/!data/en_us/data/msntvv1.its51/$content$/
}


function insertVersionInFilename(filename)
{
	var HTMsuffixPos = filename.indexOf(".htm");
	if (HTMsuffixPos == -1)
	{
		alert("filename not HTM: "+filename);
		return "";
	}
	var stuffBeforeSuffix = filename.substring(0, HTMsuffixPos);
	var suffix = filename.substring(HTMsuffixPos);

	var newFileName = stuffBeforeSuffix + clientVerAppendStr + suffix;
	return newFileName;
}


//	Go to the specified page and set the return page value to the current page
//		Used when main TOC calls sub-TOC or sub-TOC calls a topic
//
function goToPageAndPassNewOrigin(pageURL)
{
	//alert("goToPageAndPassNewOrigin: "+ constructBaseURL(pageURL) + insertVersionInFilename(pageURL) + "?retURL=" + encodeURIComponent(window.location.href));
	document.location = constructBaseURL(pageURL) + insertVersionInFilename(pageURL) + "?retURL=" + encodeURIComponent(window.location.href);

}


//	Go to the specified page and set the return page value to the current retURL parameter
//		Used by help detail pages to pass along the page that they must return to, which is stored in the retURL parameter
//		E.g. The "Sending an email" topic may return to either the main TOC or the Email sub-TOC, depending on which called it

function goToPageAndPassPriorOrigin(pageURL)
{
	//	Pass on the retURL parameter
	var URLargs = getURLargs();
	if (URLargs.retInbox) 
	{
    
		//alert("goToPageAndPassPriorOrigin: "+constructBaseURL(pageURL) + insertVersionInFilename(pageURL) + "?retInbox=y");
	        document.location = constructBaseURL(pageURL) + insertVersionInFilename(pageURL) + "?retInbox=y";
	} 
	
	else 
	
	if (URLargs.retURL) 
	{
		//	argument retURL (the return path) is specified
		//	Tell the next page that it must use history.go
		//alert("goToPageAndPassPriorOrigin: "+ constructBaseURL(pageURL) + insertVersionInFilename(pageURL) + "?retURL=" + encodeURIComponent(URLargs.retURL));
		document.location = constructBaseURL(pageURL) + insertVersionInFilename(pageURL) + "?retURL=" + encodeURIComponent(URLargs.retURL);
	}
	
	else

	if (URLargs.jumpURL)
	{
		//	Tell the next page that it must use document.location
		//alert("goToPageAndPassPriorOrigin: "+constructBaseURL(pageURL) + insertVersionInFilename(pageURL) + "?jumpURL=" + encodeURIComponent(URLargs.jumpURL));
		document.location = constructBaseURL(pageURL) + insertVersionInFilename(pageURL) + "?jumpURL=" + encodeURIComponent(URLargs.jumpURL);
		return;
	}

	else

	{
		//alert("goToPageAndPassPriorOrigin: "+constructBaseURL(pageURL) + insertVersionInFilename(pageURL) + "?retURL=" + encodeURIComponent(window.location.href));
		document.location = constructBaseURL(pageURL) + insertVersionInFilename(pageURL) + "?retURL=" + encodeURIComponent(window.location.href);
	}
}

//	Return to the page of origin, specified in the retURL URL argument

function ReturnToReferrer()
{
	ReturnFromDiploma();
}


//	Diplomas jump to the specified page
function ReturnFromDiploma()
{
	var URLargs = getURLargs();

	if (URLargs.jumpURL)
	{
		//	jumpURL is defined, try history.go and document.location at the same time
		//alert("ReturnFromDiploma/referrer history.go URLargs.jumpURL="+URLargs.jumpURL);
		history.go(URLargs.jumpURL);
		document.location = URLargs.jumpURL;
		return;
	}


	if (URLargs.retURL)
	{
		//	retURL is defined, so must use history.go to the specified page, not jump
		if (URLargs.retURL == "")
		{
			// Empty value means just go back
			//alert("ReturnFromDiploma/referrer retURL blank. history.back");
			history.back();
		}
		else
		{
			//	argument retURL (the return path) is specified and is not empty
			//	This means the diploma specified a page to jump to other than the referring page
			//alert("ReturnFromDiploma/referrer history.go URLargs.retURL="+URLargs.retURL);
			history.go(URLargs.retURL);
		}
	}
	else
	{
		//	Missing retURL arg. Go back one page
		//alert("ReturnFromDiploma/referrer Missing retURL arg. history.back");
		history.back();
	}
}



//	Put all URL arguments into an object named args. Values are unescaped
//
//	Example: Get the value of the argument named myargname (if it exists)
//		var myargs = getURLargs();
//		if (myargs.myargname) myargvalue = myargs.myargname;

function getURLargs()
{
	var s = "";
	var args = new Object();
	var query = location.search.substring(1);// Get arguments after the "?"
	var pairs = query.split("&");
	for (var i = 0; i < pairs.length; i++)
	{
		var pos = pairs[i].indexOf("=");
		if (pos == -1) continue;
		var argname = pairs[i].substring(0, pos);
		s += argname + "=";
		var value = pairs[i].substring(pos + 1);
		s += value + ";";
		if (argname == "retInbox") 
		{
		    value = window.external.SafeGetServiceURL("mail::listmail");
		    if ((value != null) && (value != "")) 
		    {
			args["jumpURL"] = value;
			args["retInbox"] = "y";
		    }
		} 
		else 
		{
		    args[argname] = decodeURIComponent(value);
		}
	}

	return args;
}

function goToMessenger()
{
            if (window.external.SafeGetServiceURL('messenger::root') != null &&
                        window.external.SafeGetServiceURL('messenger::root') != "" )

                        window.open(" ", "impanel", "msntv:panel");
            else
                        window.location = "msntv:/OLTK/IMBlock.html";
}


/* Messenger pages require these functions to access the Messenger panel */
var returning = false;
function exitroute()
{
	if (returning) TVShell.PanelManager.TogglePanel( 'impanel' , "" );
}

function ReturnToReferrerFromMessenger()
{
	returning = true;
	ReturnToReferrer();
}
