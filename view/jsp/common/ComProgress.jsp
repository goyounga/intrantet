<%@ page language="java" contentType="text/html; charset=EUC-KR"%>
<%@ include file="/jsp/include/include.jsp"%>
<%
	String waittime = CUtil.nvlNequal(request.getParameter("waittime"), "5");
	String msg = CUtil.nvlNequal(new String(CUtil.nvl(request.getParameter("questitle")).getBytes("ISO-8859-1"),"euc-kr"),"처리중입니다...");
%>
<html>
<head>
<title>처리중.....</title>
</head>
<script language=javascript>
	var gProgress;
	var time = <%=waittime %>;
	var obj = dialogArguments;
	function local_onLoad()
	{
		time = time * 1000;
		gProgress = setInterval("self.close()", time);
	}

	function winProgressClose() {
		gProgress = null;
	}
</script>
<body onLoad="local_onLoad()" onUnLoad="winProgressClose()" style="margin-top:0; margin-right:0; margin-bottom:0; margin-left:0;overflow:'hidden'">

<center>
<table id="tblAlert" border="0" width="360" height="100" cellpadding="0" cellspacing="0" align="center" background="/html/images/common/ingbg.gif">		
<!--<Tr><td align=right><img src=/ucare/images/editimg/ed_format_sub.gif></a></td></Tr>-->
	<tr><td align="center" class="txt01" valign=bottom><%=msg %></td></tr>
	<tr><Td align="center" valign=top><img src="/html/images/common/ingbar.gif" width="252" height="17" vspace="5"></td></tr>
</table>
</center>
</BODY>
</HTML>
