<html>
<head>
<title>UCare</title>
<meta http-equiv="Content-Type" content="text/html; charset=euc-kr">
<link rel="STYLESHEET" type="text/css" href="/html/style/common.css">
<script language="JavaScript" src="/html/js/ucare/ucare_objectUtils.js"></script>
<script language="JavaScript" src="/html/js/ucare/ucare_util.js"></script>
</head>
<BODY leftmargin="0" topmargin="0" bgcolor="#ffffff">
<script language="javascript">
	//var obj = window.open("/common/login.jsp","uCarelogin","left=0,top=0,width=1015,height=685");

	//â ��� ����
	try{
	var cwp = getPopupProperties("", "", 450, 320, "status=no");
	}
	catch(e){alert(e.description);}	
	
	var obj = window.open("/jsp/main/login.jsp","uCareIntranetlogin",cwp);
	
	if (/MSIE/.test(navigator.userAgent)) { 
		if(navigator.appVersion.indexOf("MSIE 7.0")>=0 || navigator.appVersion.indexOf("MSIE 8.0")>=0 || navigator.appVersion.indexOf("MSIE 9.0")>=0){	//IE7, IE8, IE9
			//IE7������ �Ʒ��� ����
			window.open('about:blank','_self').close();
		}
		else { 
			//IE7�� �ƴ� ���
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
