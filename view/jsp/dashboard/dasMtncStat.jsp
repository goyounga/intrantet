<!--
  PROJ : Nexfron Intranet
  NAME : dasMtncStat.jsp
  DESC : ��Ȳ�� - ����������Ȳ
  Author : ���ر� ����
  VER  : 1.0
  Copyright 2009 Nexfron All rights reserved
  ============================================================================================
  								��		��		��		��
  ============================================================================================
  VERSION		DATE		AUTHOR		DESCRIPTION
  ============================================================================================
  1.0		2010.09.06		���ر�		����
  -->
<%@ page language="java" contentType="text/html; charset=EUC-KR"%>
<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=euc-kr">
	<title>����������Ȳ</title>
	<%@ include file="/jsp/include/include.jsp"%>
	<script language="javascript" src="<%=scriptPath%>/js/dashboard/dasMtncStat.js"></script>
</head>
<body onLoad="init()" style="padding:0 0 0 0;">
<table width="1250" cellpadding="0" cellspacing="0" border="0">
	<tr>
		<td height="5"></td>
	</tr>
	<form name="f" method="post">
	<input type="hidden" name="prj_seq" value="">
	<tr>
		<td>
			<table width="1238" cellpadding="0" cellspacing="0" border="0">
				<col width="1238" />
				<tr>
					<td valign="top">
						<ucare:grid id="UCDAS021S" width="1238" height="775" no="true" >
							<tr event="O">
								<td width="200"	column="mtnc_nm" 		title="����������" 		align="left" ></td>
								<td width="120"	column="clnt_corp_nm" 	title="����" 			align="center" ></td>
								<td width="150"	column="mtnc_system_nm" title="�ý���" 			align="center" ></td>
								<td width="200"	column="mtnc_type" 		title="������������" 	align="center" format="COMBO" brcode="PRJ017"></td>
								<td width="80"	column="mtnc_cost" 		title="���" 			align="center" format="COMBO" brcode="PRJ014"></td>
								<td width="150"	column="mtnc_period" 	title="�Ⱓ" 			align="center" ></td>
								<td width="80"	column="regular_chk" 	title="��������" 		align="center" format="COMBO" brcode="PRJ015"></td>
								<td width="120"	column="coop_corp_nm" 	title="���»�" 			align="center" ></td>
								<td width="100"	column="dvlp_frwk" 		title="�����ӿ�ũ" 		align="center" format="COMBO" brcode="PRJ016"></td>
								<td width="120"	column="rmk" 			title="Ư�̻���" 		align="center" hidden="true" maxlength="2000"></td>

								<td width="0"	column="mtnc_seq" 		title="��������SEQ" 	align="center" hidden="true"></td>
								<td width="0"	column="clnt_corp_seq" 	title="����SEQ" 		align="center" hidden="true"></td>
								<td width="100"	column="mtnc_system" 	title="�ý���cd" 		align="center" hidden="true"></td>
								<td width="0"	column="strt_date" 		title="��������" 		align="center" hidden="true"></td>
								<td width="0"	column="end_date" 		title="��������" 		align="center" hidden="true"></td>
								<td width="0"	column="coop_corp_seq" 	title="���»�SEQ" 		align="center" hidden="true"></td>
							</tr>
						</ucare:grid>
					</td>
				</tr>
				<tr>
					<td height="5"></td>
				</tr>
				<tr>
					<td align="right">
						<ucare:imgbtn width="60" name="btnQuery"	kind="R"	 onClick="queryList()"/>
					</td>
				</tr>
			</table>
		</td>
	</tr>
	</form>
</table>
<%@ include file="/jsp/include/include_car.jsp" %>
</body>
</html>