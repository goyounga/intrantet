<!--
  PROJ : Nexfron Intranet
  NAME : dasProjectStat.jsp
  DESC : ��Ȳ�� - ������Ʈ��Ȳ
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
	<title>������Ʈ��Ȳ</title>
	<%@ include file="/jsp/include/include.jsp"%>
	<script language="javascript" src="<%=scriptPath%>/js/dashboard/dasProjectStat.js"></script>
</head>
<body onLoad="init()" style="padding:0 0 0 0;">
<table width="1250" cellpadding="0" cellspacing="0" border="0">
	<!--tr>
		<td><ucare:xtitle title="������Ʈ��Ȳ"/></td>
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
						<ucare:grid id="UCDAS011S" width="1238" height="730" no="true">
							<tr event="O">
								<td width="250"		column="prj_nm" 		title="������Ʈ��"		align="left" ></td>
								<td width="180" 	column="work_range" 	title="��������"		align="center" hidden="true"></td>
								<td width="180" 	column="work_range_nm" 	title="��������"		align="center" ></td>
								<td width="130" 	column="mbr_cnt" 		title="�η���Ȳ"		align="center" ></td>
								<td width="130" 	column="pogr_stat" 		title="�����Ȳ"		align="center" ></td>
								<td width="130" 	column="rl_end_dt" 		title="�Ⱓ"			align="center" ></td>
								<td width="380" 	column="rmk" 			title="���"			align="left" ></td>
								<td width="100" 	column="prj_seq" 		title="������Ʈ����"	align="center"  hidden="true"></td>
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