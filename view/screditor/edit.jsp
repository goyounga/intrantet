<%@ page language="java" contentType="text/html; charset=EUC-KR"%>


<link rel = "stylesheet" href = "/style/style01.css" type = "text/css">
<link rel = "stylesheet" href = "/style/style02.css" type = "text/css">
<link rel = "stylesheet" href = "/style/style03.css" type = "text/css">


<html>
<head>
<title></title>
<SCRIPT language="Javascript1.2">
	_editor_url = "/screditor/";
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
</head>
<body style="margin-top:0;margin-bottom:0;margin-left:0;margin-right:0;overflow:hidden" onLoad="init()">
<form name="f" method="post" target="iLog" action="../common.do">

<textarea name="_content" style="height:220;width:810"></textarea>
<SCRIPT language=javascript>
	editor_generate('_content');
</SCRIPT>

</form>
<iframe name="iLog" height="110" width="110"></iframe>
</body>
</html>