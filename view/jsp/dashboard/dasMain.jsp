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
	<script language="javascript" src="<%=scriptPath%>/js/dashboard/dasMain.js"></script>
</head>
<body style="margin-top:0;margin-left:5;margin-bottom:0;margin-right:0;text-align:center" onload="init();">
<form name="f">
	<span id="spnController" style="display:none" >
		<input type="button" name="btnScreen" value="프로젝트현황" onclick="changeTab(0)" disabled >	<!--프로젝트현황-->
		<input type="button" name="btnScreen" value="유지보수현황" onclick="changeTab(1)">			<!--유지보수현황-->
		<input type="button" name="btnScreen" value="본사인력현황" onclick="changeTab(2)">			<!--본사인력현황-->
		&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
		Timer:<input type="text"   name="nTermTimer" value="10" 			size="4">초
			  <input type="button" name="btnStart"   value="화면전환시작"	onclick="startTimer()">
			  <input type="button" name="btnKill"    value="화면전환중지" 	onclick="stopTimer()" >
			  <input type="button" name="btndisa"    value="버튼숨기기" 	onclick="hideController()">
			  <input type="button" name="btnQuery"   value="조회시작" 		onclick="startQuery()"  disabled>
			  <input type="button" name="btnCancel"  value="조회중지" 		onclick="stopQuery()"  >
	</span>
	<table border="0" cellspacing="0" cellpadding="0" height="100%" bordercolor="red" >
		<tr>
			<td id="itab" style="display:" align="center" valign="top">
				<Iframe scrolling="NO" height="768" width="1270" id="ifmScreen1" name="ifmScreen1" frameborder="0" src="/jsp/dashboard/dasMainProjectStat.jsp" marginwidth="0" marginheight="0" framespacing="0" style="border-style:solid;border-width:0px;border-color:red;" ></Iframe>
			</td>
			<td id="itab" style="display:none" align="center" valign="top">
				<Iframe scrolling="NO" height="768" width="1270" id="ifmScreen2" name="ifmScreen2" frameborder="0" src="/jsp/dashboard/dasMainMtncStat.jsp"    marginwidth="0" marginheight="0" framespacing="0" style="border-style:solid;border-width:0px;border-color:red;" ></Iframe>
			</td>
			<td id="itab" style="display:none" align="center" valign="top">
				<Iframe scrolling="NO" height="768" width="1270" id="ifmScreen3" name="ifmScreen3" frameborder="0" src="/jsp/dashboard/dasMainOfficeStat.jsp"  marginwidth="0" marginheight="0" framespacing="0" style="border-style:solid;border-width:0px;border-color:red;" ></Iframe>
			</td>
		</tr>
	</table>
</form>
</body>
</html>