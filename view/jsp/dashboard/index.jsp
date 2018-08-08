<%@ page language="java" contentType="text/html; charset=EUC-KR" %>
<html>
<head>
<title>전광판</title>
<meta http-equiv="Content-Type" content="text/html; charset=euc-kr">
</head>
<BODY leftmargin="0" topmargin="0" bgcolor="#ffffff">
<script language="javascript">

	var winW = 1280;
	var winH = 770;

	//모니터 스크린의 정중앙
	var winX = (screen.width - Number(winW)  - 8 ) / 2;
	var winY = (screen.height - Number(winH) - 66) / 2;

	//현재 실행 브라우저의 정중앙
	//var winX = top.screenLeft+(document.body.clientWidth  - winW)/2;
	//var winY = top.screenTop +(document.body.clientHeight - winH)/2;



//	window.open("dasMain.jsp", "dashboard","top="+winY+"px,left="+winX+"px,width="+winW+"px,height="+winH+"px,scrollbars=no,fullscreen=no,resizable=no,status=no");
	window.open("dasMain.jsp", "dashboard","top="+winY+"px,left="+winX+"px,width="+winW+"px,height="+winH+"px,scrollbars=no,resizable=no,status=no");

//	window.open("dasMain.jsp","dashboard","fullscreen=yes");
//	window.open("dasMain.jsp","dashboard","channelmode=yes");
//	window.open("dasMain.jsp", "dashboard", "width=1280,height=770,scrollbars=no,fullscreen=no,resizable=no");
//	window.open("dasMain.jsp", "dashboard", "width=1270,height=933,scrollbars=no,fullscreen=no,resizable=no");	//intranet size
//	opener=self;
//	self.close();

	if (/MSIE/.test(navigator.userAgent))
	{
		if(navigator.appVersion.indexOf("MSIE 7.0")>=0 || navigator.appVersion.indexOf("MSIE 8.0")>=0){	//IE7, IE8
			//IE7에서는 아래와 같이
			window.open('about:blank','_self').close();
		} else {
			//IE7이 아닌 경우
			window.opener = self;
			self.close();
		}
	} else {
		window.name = '__t__';
		var w = window.open('about:blank');
		w.document.open();
		w.document.write('<html><body><script type="text/javascript">function _(){var w=window.open("about:blank","'+window.name+'");w.close();self.close();}</'+'script></body></html>');
		w.document.close();
		w._();
	}
</script>