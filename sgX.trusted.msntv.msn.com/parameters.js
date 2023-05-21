// THIS FILE IS NOT AN ORIGINAL SERVICE FILE. THIS HAS BEEN INCLUDED FOR COMPLETION'S SAKE
// UNTIL THE ORIGINAL VERSION OF THIS FILE CAN BE FOUND

function unspace( element ) {
	var re = /[+]/g; 
    return element.replace(re, ' ');
}

function escapeplus( element ) {
	var re = /[+]/g; 
    return element.replace(re, "%2B");
}

function FindParameters(panelManager)
{
	var parameters = new Array();
	var search = document.location.search;

	if (search.length > 1) {
		var query = search.substring( 1, search.length );
		var pairs = query.split( '&' );
		for ( var index = 0; index < pairs.length; index++ ) {
			var element = pairs[index].split( '=' );
			if (element.length > 1) {
				parameters[element[0]] = decodeURIComponent( unspace( element[1] ) );
			} else if (element.length > 0 && element[0] != "" ) {
				parameters[element[0]] = "";
			}
		}
	}

	return parameters;
}

var TVShell = new ActiveXObject("MSNTV.TVShell");
var parameters	= FindParameters(TVShell.PanelManager);


function FindParametersFromFile(fileName)
{
	if(!TVShell)
		return null;
	
	var parameters;	
	var paramStr=TVShell.ReadFile(fileName);
	
	if(!paramStr)
		return null;
		
	var namevalues=paramStr.split(" ");
	var len=namevalues.length;
	if(len>0)
	  len=len/2;

	parameters = new Array(len);

	for(i=0;i<len;i++)
		parameters[unescape(namevalues[2*i])]=unescape(namevalues[2*i+1]);

	return parameters;
}

// PANEL FUNCTIONS
function SetProgressPercent(percent)
{
	var panel = TVShell.PanelManager.Item("progress");

	if (panel && panel.Document)
		panel.Document.SetProgressPercent(percent);
}

function SetProgressText(text)
{
	var panel = TVShell.PanelManager.Item("progress");

	if (panel && panel.Document)
		panel.Document.SetProgressText(text);
}

function SetProgressStopFunction(stopFunc)
{
	var panel = TVShell.PanelManager.Item("progress");

	if (panel && panel.Document)
		panel.Document.SetStopFunction(stopFunc);
}

function ShowProgressPanel()
{
	var panel = TVShell.PanelManager.FocusedPanel;
	if ( panel )
	{
		// do not show if the reconnect panel is up
		if ( panel.Name == "reconnect" ) return;
	}
	TVShell.PanelManager.Show("progress");
}

function HideProgressPanel()
{
	TVShell.PanelManager.Hide("progress");
}
