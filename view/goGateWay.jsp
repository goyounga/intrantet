<%@ page language="java" contentType="text/html; charset=EUC-KR"
	import ="java.io.*,ucare.jaf.common.*"%>
<html>
<head>
<title>UCare</title>
<meta http-equiv="Content-Type" content="text/html; charset=euc-kr">
<%@ include file="/jsp/include/include.jsp"%>
<link rel="STYLESHEET" type="text/css" href="/html/style/common.css">
</head>
<BODY leftmargin="0" topmargin="0" bgcolor="#ffffff" onload="javascript:f.submit();">
<form name=f action="<%=CUtil.nvlNequal(CIni.getString("NEW_SERVER"), "")%>/gateWay.jsp" method="post" target="oldIntra">
<input type=hidden name=menu_id value="<%=request.getParameter("menu_id") %>">
<input type=hidden name=user_id value="<%=sessioninfo.getUserID()%>">
<input type=hidden name=grd_cd value="<%=sessioninfo.getUserGradeCD()%>">

</form>
<script language="javascript">
</script>
