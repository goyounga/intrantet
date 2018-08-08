<!--
  PROJ : Nexfron Intranet
  NAME : hldHolidayUseList.jsp
  DESC : �ް���볻����ȸ
  Author : nexfron
  VER  : 1.0
  Copyright 2009 Nexfron All rights reserved
  ============================================================================================
  								��		��		��		��
  ============================================================================================
  VERSION		DATE		AUTHOR		DESCRIPTION
  ============================================================================================
  1.0		2010.07.20		nexfron		�����ۼ�

  -->

<%@ page language="java" contentType="text/html; charset=EUC-KR"%>
<%@ include file="/jsp/include/include.jsp"%>
<html>
<head>
<title>�ް���볻����ȸ</title>
<script language="javascript" src="/html/js/holiday/hldHolidayUseList.js"></script>

</head>
<body onLoad="on_Load();">
<table border=0 cellpadding=1 cellspacing=1 id=tblList width="1217">
	<tr>
		<td height="5"></td>
	</tr>
 	<tr>
		<td>
			<form name="fQuery" method="post">
			<input type="hidden" name="q_userid" value="<%=sessioninfo.getUserID()%>">
			<input type="hidden" name="thisYear" value="<%=CDateUtil.getYear()%>">
			
				<ucare:table type="query" width="1215">
					<tr>
						<td width="100" align=right>�ް����⵵&nbsp;</td>
						<td width="230">
							<ucare:select name="q_bse_y" brcode="HLD002" code="code" codename="codenm" option="5" width="80" styleClass="combo_required"/>
						</td>
						<td>&nbsp;</td>
						<td style="display:none"><input type=text name="dummy"></td>
						<td width=1 bgcolor=#CCCCCC></td>
		 				<td width=130 align="center">
		 					<ucare:imgbtn name="btnQuery" value="��ȸ" width="50" onClick="query()"/>
		 				</td>
		 			</tr>
				</ucare:table>
			</form>
		</td>
	</tr>
	<tr>
		<td valign="top">
			<table border=0 cellpadding=0 cellspacing=0>
				<tr>
					<td valign="top">
						<form name="f" method="post">
						<input type="hidden" name="userid" value="<%=sessioninfo.getUserID()%>">
				
						<ucare:table type="border">
							<tr>
								<td class="stitle">�ް���볻��</td>
							</tr>
						</ucare:table>
						<ucare:grid id="UCHLD033S" width="1220" height="675" no="true">
							<tr event="O">
								<td width="80"	column="bse_y"			title="���س⵵"		hidden="true" align="center" format="COMBO" brcode="HLD002"></td>
								<td width="80"	column="exec_year"		title="��û�⵵"		align="center" format="COMBO" brcode="HLD002"></td>
								<td width="150" column="hldy_id"		title="�����"		align="left"></td>
								<td width="80" column="hldy_knd_seq_01"	title="�����ް���"	align="center"></td>
								<td width="80" column="hldy_knd_seq_11"	title="�����ް�"		align="center"></td>
								<td width="80" column="hldy_knd_seq_25"	title="�������ް�"	align="center"></td>
								<td width="80" column="hldy_knd_seq_12"	title="���ΰ�ȥ"		align="center"></td>
								<td width="80" column="hldy_knd_seq_26"	title="�ڳ�����ް�"	align="center"></td>
								<td width="80" column="hldy_knd_seq_27"	title="��������"		align="center"></td>
								<td width="80" column="hldy_knd_seq_28"	title="����"			align="center"></td>
								<td width="80" column="hldy_knd_seq_etc"	title="��Ÿ�ް�"		align="center"></td>
								<td width="80" column="tot"				title="�հ�"			align="center"></td>
								<td width="80" column="hldy_pre_year"				title="�����⵵����"			align="center"></td>
								<td width="80" column="hldy_this_year"				title="���س⵵����"			align="center"></td>
							 
							 </tr>
						</ucare:grid>
						</form>
					</td>
				</tr>
			</table>
		</td>
	</tr>
</table>

<%@ include file="/jsp/include/include_car.jsp" %>
</body>
</html>