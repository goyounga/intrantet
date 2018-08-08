<!--
  PROJ : INTRANET
  NAME : comUserOrg.jsp
  DESC : ����ڰ˻�
  Author : ��������
  VER  : 1.0
  Copyright 2009 Nexfron All rights reserved
  ============================================================================================
  								��		��		��		��
  ============================================================================================
  VERSION		DATE		AUTHOR		DESCRIPTION
  ============================================================================================
  1.0		2009.08.13		������		�ּ��߰�
  2.0		2013.01.13		���ر�		����
  -->
<%@ page language="java" contentType="text/html; charset=EUC-KR"%>
<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=EUC-KR">
	<%@ include file="/jsp/include/include.jsp"%>
	<title>�������˻�</title>
	<script language="javascript" src="/html/js/common/comOrgPop.js"></script>
	<link rel="stylesheet" href="/html/style/ucareStyle.css" type="text/css">
	<%
		request.setCharacterEncoding("EUC-KR");
		String corp_cd = request.getParameter("corp_cd");
		String mode    = request.getParameter("mode");
		String multiyn = CUtil.nvl(request.getParameter("multiyn"),"N");
	%>
</head>
<body topmargin="0" leftmargin="0" onLoad="init();" onunLoad="unLoad();">

<form name="f" onsubmit="return false;">
<input type="hidden" name="multiyn" value="<%=multiyn %>">
<input type="hidden" name="userid" value="<%=sessioninfo.getUserID()%>">
<input type="hidden" name="use_f" value="Y"><!-- ���� ������ΰ͸� ������������ -->
<input type="hidden" name="org_cd" />
<input type="hidden" name="bb_org_cd" />
<input type="hidden" name="user_nm" />
<input type="hidden" name="search" />
<input type="hidden" name="corp_cd" value="<%=corp_cd%>"/>
<input type="hidden" name="mode" value="<%=mode%>"/>

<table width="100%" cellpadding="0" cellspacing="0" border="0" bordercolor="red">
	<tr>
		<td>
			<table width="100%" cellpadding="0" cellspacing="0" border="0" background="/html/images/common/popupbg.gif">
				<tr height="30">
					<td class="popup_tit"><b>����������</b></td>
				</tr>
			</table>
		</td>
	</tr>
	<tr>
		<td class="hmargin5"></td>
	</tr>
	<tr>
		<td align=center>
			<table width="200" cellpadding="0" cellspacing="0" border="0">
				<tr>
					<td class="stitle">������</td>
				</tr>
				<tr>
					<td>
						<ucare:grid id="UCSYS021S_1" width="300" height="480" tree="true">
							<tr>
								<td width="180" column="orgnm" image="doc" format="TREE" action="false" />
								<td width="0"   column="orgcd_org" />
								<td width="0"   column="depth" />
							</tr>
						</ucare:grid>
					</td>
				</tr>
				<tr>
					<td align=right>
						<ucare:imgbtn name="btnChoice" value="����"  width="70" onClick="Apply()" />
						<ucare:imgbtn name="btnQuery" kind="X"  width="70" onClick="self.close()" />
					</td>
				</tr>	
			</table>
		</td>
	</tr>
	<tr>
	</tr>
</table>
</form>
</body>
</html>