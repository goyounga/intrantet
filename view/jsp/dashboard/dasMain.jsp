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
	<script language="javascript" src="<%=scriptPath%>/js/dashboard/dasMain.js"></script>
</head>
<body style="margin-top:0;margin-left:5;margin-bottom:0;margin-right:0;text-align:center" onload="init();">
<form name="f">
	<span id="spnController" style="display:none" >
		<input type="button" name="btnScreen" value="������Ʈ��Ȳ" onclick="changeTab(0)" disabled >	<!--������Ʈ��Ȳ-->
		<input type="button" name="btnScreen" value="����������Ȳ" onclick="changeTab(1)">			<!--����������Ȳ-->
		<input type="button" name="btnScreen" value="�����η���Ȳ" onclick="changeTab(2)">			<!--�����η���Ȳ-->
		&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
		Timer:<input type="text"   name="nTermTimer" value="10" 			size="4">��
			  <input type="button" name="btnStart"   value="ȭ����ȯ����"	onclick="startTimer()">
			  <input type="button" name="btnKill"    value="ȭ����ȯ����" 	onclick="stopTimer()" >
			  <input type="button" name="btndisa"    value="��ư�����" 	onclick="hideController()">
			  <input type="button" name="btnQuery"   value="��ȸ����" 		onclick="startQuery()"  disabled>
			  <input type="button" name="btnCancel"  value="��ȸ����" 		onclick="stopQuery()"  >
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