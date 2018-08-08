<!--
  PROJ   : Nexfron Intranet
  NAME   : dasMain.jsp
  DESC   : 현황판 - 전광판
  Author : 박준규 과장
  VER    : 1.0
  Copyright 2009 Nexfron All rights reserved
  ============================================================================================
  								변		경		사		항
  ============================================================================================
  VERSION		DATE		AUTHOR		DESCRIPTION
  ============================================================================================
  1.0		2010.09.06		박준규		개발
  -->
<%@ page language="java" contentType="text/html; charset=EUC-KR" %>
<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=euc-kr" />
	<title>전광판</title>
	<%@ include file="/jsp/include/include.jsp"%>
	<%String path = request.getParameter("path");
	//out.println(path);%>
	<body>
	<script language=javascript>
	window.open("http://222.112.196.235:89/<%=path%>","", "width=1200,heigth=1500,scrollbars=yes, resizable=yes");
	</script>
</body>
</html>