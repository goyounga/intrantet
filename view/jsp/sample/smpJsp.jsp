<!--
  PROJ : Intranet
  NAME : smpJsp.js
  DESC : Jsp File Sample
  Author : ������ ����
  VER  : 1.0
  Copyright 2009 Nexfron All rights reserved
  ============================================================================================
  								��		��		��		��
  ============================================================================================
  VERSION		DATE		AUTHOR		DESCRIPTION
  ============================================================================================
  1.0		2009.09.11		������		�����ۼ�
  -->

<%@ page language="java" contentType="text/html; charset=euc-kr"%>

<html>
<head>
	<%@ include file="/jsp/include/include.jsp"%>
	<script language="javascript" src="<%= scriptPath %>/js/sample/smpJsp.js"></script>
</head>
<body class="mainbody">

<form name="f">

<!-- ȭ�� ���� -->

</form>

<!-- �޷��� ����ϴ� ��� �߰� -->
<%@ include file="/jsp/include/include_car.jsp" %>
</body>
</html>