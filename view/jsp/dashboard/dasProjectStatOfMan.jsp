<!--
  PROJ : Nexfron Intranet
  NAME : dasProjectStatOfMan.jsp
  DESC : ��Ȳ�� - ������Ʈ��Ȳ-���κ�
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
	<title>���κ� ������Ʈ��Ȳ</title>
	<%@ include file="/jsp/include/include.jsp"%>
	<script language="javascript" src="<%=scriptPath%>/js/dashboard/dasProjectStatOfMan.js"></script>
</head>
<body onLoad="init()" style="padding:0 0 0 0;">
<table width="1250" cellpadding="0" cellspacing="0" border="0">
	<!--tr>
		<td><ucare:xtitle title="���κ� ������Ʈ��Ȳ"/></td>
	</tr-->
	<tr>
		<td class="hmargin5"></td>
	</tr>
	<form name="f" method="post">
	<input type="hidden" name="prj_seq" value="">
	<tr>
		<td>
			<table width="1238" cellpadding="0" cellspacing="0" border="0">
				<col width="1238" />
				<tr>
					<td valign="top">
						<ucare:grid id="UCDAS012S" width="1238" height="730" no="true">
							<tr event="O">
								<td width="95" 	column="dept_cd" 		title="�μ�" 					align="center" format="COMBO" brcode="SYS012"></td>
								<td width="110"	column="user_nm2" 		title=" �̸�   [ ���� ]" 		align="center" ></td>
								<td width="250"	column="prj_nm" 		title="������Ʈ��"				align="left"   ></td>
								<td width="70"  column="etrn_c_cd" 		title="���Ա���" 				align="center" format="COMBO" brcode="PRJ002"></td>
								<td width="70"  column="job_c_cd" 		title="��������" 				align="center" format="COMBO" brcode="PRJ010"></td>
								<td width="180" column="etrn" 			title="��������  [ �������� ]"	align="center" ></td>
								<td width="180" column="ot" 			title="ö������  [ �������� ]"	align="center" ></td>
								<td width="50" 	column="pos_nm" 		title="����"					align="center" hidden="true" ></td>
								<td width="75"	column="user_nm" 		title="�̸�" 					align="center" hidden="true" ></td>
								<td width="90" 	column="etrn_dt" 		title="��������"				align="center" hidden="true" format="DATE" ></td>
								<td width="90" 	column="etrn_du_dt" 	title="���Կ�������"			align="center" hidden="true" format="DATE" ></td>
								<td width="90" 	column="ot_dt" 			title="ö������"				align="center" hidden="true" format="DATE" ></td>
								<td width="90" 	column="ot_du_dt" 		title="ö����������"			align="center" hidden="true" format="DATE" ></td>
								<td width="245" column="chrgjob" 		title="������"				align="left"   ></td>
							</tr>
						</ucare:grid>
					</td>
				</tr>
				<tr>
					<td height="5"></td>
				</tr>
				<tr>
					<td align="right">
						<ucare:imgbtn width="60" name="btnQuery"	value="��ȸ"	 onClick="queryList()"/>&nbsp;
					</td>
				</tr>
			</table>
		</td>
	</tr>
	</form>
</table>
</body>
</html>