<%@ page language="java" contentType="text/html; charset=EUC-KR"%>
<%@ include file="/jsp/include/include.jsp"%>

<html>
<head>
<title>LogOut</title>
<script language="JavaScript" src="/html/js/main/logout.js"></script>
</head>

<body topmargin="0" leftmargin=0 onload="log_out('<%=request.getParameter("userid")%>','<%=sessioninfo.getUserLoginIP()%>');">

<form name="f">
<table border=1 cellpadding=0 cellspacing=0 width="100%">
	<tr height=100>
		<td >
			<table width="100%" height="100%" border="0" cellpadding="0" cellspacing="0">
				<tr align=center>
					<td style="color:#ff9966"><b>·Î±×¾Æ¿ô Áß ...</b></td>
				</tr>
			</table>
		</td>
	</tr>
</table>
</form>
</body>
</html>
