<!--
  PROJ : Intranet
  NAME : smpJsp.js
  DESC : Jsp File Sample
  Author : 김은수 과장
  VER  : 1.0
  Copyright 2009 Nexfron All rights reserved
  ============================================================================================
  								변		경		사		항
  ============================================================================================
  VERSION		DATE		AUTHOR		DESCRIPTION
  ============================================================================================
  1.0		2009.09.11		김은수		최초작성
  -->

<%@ page language="java" contentType="text/html; charset=euc-kr"%>

<html>
<head>
	<%@ include file="/jsp/include/include.jsp"%>
	<script language="javascript" src="<%= scriptPath %>/js/sample/smpJsp.js"></script>
</head>
<body class="mainbody">

<form name="f">

<!-- 화면 구현 -->

</form>

<!-- 달력을 사용하는 경우 추가 -->
<%@ include file="/jsp/include/include_car.jsp" %>
</body>
</html>