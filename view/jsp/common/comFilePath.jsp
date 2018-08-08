<%@ page language="java" contentType="text/html; charset=EUC-KR"%>
<%@ include file="/jsp/include/include.jsp"%>    

<html>
<head>
<title>파일선택</title>
<script language="javascript" src="/html/js/common/comFilePath.js"></script>
</head>
<body onLoad="init()" style="margin:0">
<%
	String dirType = request.getParameter("dirType");
	
	System.out.println("##############>>>>> " + dirType);
	
	String root = CIni.getString("ROOT");
%>
<form name="fQuery" method="post">
<input type="hidden" name="curdir" value="<%=root%>"/>
<input type="hidden" name="pardir" value="<%=root%>"/>
</form>
<form name="f" method="post" target="iLog" action="/readdir.do">
<table border=0 cellpadding=0 cellspacing=0 id=tblList width=100% height=100%>
	<tr>
		<td>
			<table width="100%" height="30" border="0" cellpadding="0" cellspacing="0" background="/html/images/common/popupbg.gif">
				<tr>	
					<td class="popup_tit"><b>파일선택</b></td>									
				</tr>											
			</table>
		</td>
	</tr>	
	<tr>
		<td>
			<div id="folder" style="overflow:auto;background-color:#FFFFDD;width:100%;height:184"/>
		</td>
	</tr>
	<tr>
		<td align="right" class="popup_bg01" style="padding:2 15 0 0">
		<a href="Javascript:window.close();"><img src="/html/images/common/popup_close.gif"></a></td>
	</tr>
	
	
</table>
</form>
</body>
</html>