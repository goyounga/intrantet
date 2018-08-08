<SCRIPT language="Javascript1.2">
	_editor_url = "../screditor/";
	var win_ie_ver = parseFloat(navigator.appVersion.split("MSIE")[1]);
	if (navigator.userAgent.indexOf('Mac')        >= 0) { win_ie_ver = 0; }
	if (navigator.userAgent.indexOf('Windows CE') >= 0) { win_ie_ver = 0; }
	if (navigator.userAgent.indexOf('Opera')      >= 0) { win_ie_ver = 0; }

	if (win_ie_ver >= 5.5)
	{
		document.write('<scr' + 'ipt src="' +_editor_url+ 'js/editor.js"');
	  	document.write(' language="Javascript1.2"></scr' + 'ipt>');
	}
	else
	{
		document.write('<scr'+'ipt>function editor_generate() { return false; }</scr'+'ipt>');
	}
</SCRIPT>