<!--
  PROJ   : Nexfron Intranet
  NAME   : dasMain.jsp
  DESC   : ��Ȳ�� - ������
  Author : ���ر� ����
  VER    : 1.0
  Copyright 2009 Nexfron All rights reserved
  ============================================================================================
  								��		��		��		��
  ============================================================================================
  VERSION		DATE		AUTHOR		DESCRIPTION
  ============================================================================================
  1.0		2010.09.06		���ر�		����
  -->
<%@ page language="java" contentType="text/html; charset=EUC-KR" %>
<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=euc-kr" />
	<title>������</title>
	<%@ include file="/jsp/include/include.jsp"%>
	<%String path = request.getParameter("path");
	//out.println(path);%>
	<body>
	<script language=javascript>
	window.open("http://222.112.196.235:89/<%=path%>","", "width=1200,heigth=1500,scrollbars=yes, resizable=yes");
	</script>
</body>
</html>