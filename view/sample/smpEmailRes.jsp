<%@ page language="java" contentType="text/html; charset=EUC-KR"%>
<%@ include file="/jsp/include/include.jsp"%>  
<html>
<head>
<title>Äõ¸®(Query) »ùÇÃ</title>
<script language="javascript">

function update()
{
	var tran = new Trans();
	tran.setSvc("UCCOM018U");
	tran.open("f","f","/common.do");
}	
	
</script>
</head>
<body onLoad="update()">

<form name="f" method="post">
<input type="text" name="user_id" style="width:100" value="<%=request.getParameter("user_id")%>"/>
<input type="text" name="mail_send_no" style="width:100" value="<%=request.getParameter("mail_send_no")%>"/>
</form>
