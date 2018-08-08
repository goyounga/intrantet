function ucare_rMateChartCreate(id, fileName, flashVars, w, h, bgColor){

	// Version check for the Flash Player that has the ability to start Player Product Install (6.0r65)
	var hasProductInstall = DetectFlashVer(6, 0, 65);

	// Version check based upon the values defined in globals
	var hasRequestedVersion = DetectFlashVer(requiredMajorVersion, requiredMinorVersion, requiredRevision);

	if ( hasProductInstall && !hasRequestedVersion ) {
		// DO NOT MODIFY THE FOLLOWING FOUR LINES
		// Location visited after installation is complete if installation is required
		var MMPlayerType = (isIE == true) ? "ActiveX" : "PlugIn";
		var MMredirectURL = window.location;
		document.title = document.title.slice(0, 47) + " - Flash Player Installation";
		var MMdoctitle = document.title;

		return  ucare_AC_FL_RunContent(
			"src", "playerProductInstall",
			"FlashVars", "MMredirectURL="+MMredirectURL+'&MMplayerType='+MMPlayerType+'&MMdoctitle='+MMdoctitle+"",
			"width", w,
			"height", h,
			"align", "middle",
			"id", id,
			"wmode", "window",
			"quality", "high",
			"bgcolor", bgColor,
			"name", fileName,
			"allowScriptAccess","sameDomain",
			"type", "application/x-shockwave-flash",
			"pluginspage", "http://www.adobe.com/go/getflashplayer"
		);
	} else if (hasRequestedVersion) {
		// if we've detected an acceptable version
		// embed the Flash Content SWF when all tests are passed
		return ucare_AC_FL_RunContent(
				"src", fileName,
				"flashVars", flashVars,
				"width", w,
				"height", h,
				"align", "middle",
				"id", id,
				"wmode", "window",
				"quality", "high",
				"bgcolor", bgColor,
				"name", fileName,
				"allowScriptAccess","sameDomain",
				"type", "application/x-shockwave-flash",
				"pluginspage", "http://www.adobe.com/go/getflashplayer"
		);
	  } else {  // flash is too old or we can't detect the plugin
		var alternateContent = 'Alternate HTML content should be placed here. '
		+ 'This content requires the Adobe Flash Player. '
		+ '<a href=http://www.adobe.com/go/getflash/>Get Flash</a>';
		return alternateContent;  // insert non-flash content
	  }
}

function ucare_AC_Generateobj(objAttrs, params, embedAttrs) 
{ 
    var str = '';
    if (isIE && isWin && !isOpera)
    {
  		str += '<object ';
  		for (var i in objAttrs)
  			str += i + '="' + objAttrs[i] + '" ';
  		str += '>';
  		for (var i in params)
  			str += '<param name="' + i + '" value="' + params[i] + '" /> ';
  		str += '</object>';
    } else {
  		str += '<embed ';
  		for (var i in embedAttrs)
  			str += i + '="' + embedAttrs[i] + '" ';
  		str += '> </embed>';
    }

    return str;
}


function ucare_AC_FL_RunContent(){
  var ret = 
    AC_GetArgs
    (  arguments, ".swf", "movie", "clsid:d27cdb6e-ae6d-11cf-96b8-444553540000"
     , "application/x-shockwave-flash"
    );
  return ucare_AC_Generateobj(ret.objAttrs, ret.params, ret.embedAttrs);
}

