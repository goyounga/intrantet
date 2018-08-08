<!--
  PROJ : Nexfron Intranet
  NAME : sysWeeklyRptSta.jsp
  DESC : �ְ�����  ��Ȳ ȭ��
  Author : ������ ����
  VER  : 1.0
  Copyright 2009 Nexfron All rights reserved
  ============================================================================================
  								��		��		��		��
  ============================================================================================
  VERSION		DATE		AUTHOR		DESCRIPTION
  ============================================================================================
  1.0		2009.08.13		������		�����ۼ�
  -->
  
<%@ page language="java" contentType="text/html; charset=EUC-KR"%>
<%@ include file="/jsp/include/include.jsp"%>

<html>
<head>
	<title>�ְ����� ����</title>
	<script language="javascript" src="/html/js/management/mngWeeklyRptSta.js"></script>
</head>

<body topmargin="0" leftmargin="5"  onLoad="init()">
<table width="1225" cellpadding="0" cellspacing="0" border="0">
	<tr>
		<td height="5"></td>
	</tr>

	<!-- �˻����� S -->
	<form name="fQuery" method="post">
	<input type="hidden" name="subQuery">
	<tr>
		<td>
			<ucare:table type="query" width="1215">
				<tr>
					<td width="80" align="right">�����Ⱓ :&nbsp;</td>
					<td>
						<ucare:input type="text" name="date_from" width="70" title="������" format="DATE" value="<%=CUtil.getMyDate(-1, \"yyyy-MM-dd\")%>" pattern="D" required="true" requirednm="������" maxlength="10" tag="onKeyUp=\"pressEnter('queryList(this)')\""/>
						<span class=calendar onclick="openCalendar('fQuery.date_from' , fQuery.date_from.value)"></span>&nbsp;
						~&nbsp;
						<ucare:input type="text" name="date_to" width="70" title="������" format="DATE" value="<%=CUtil.getMyDate(0, \"yyyy-MM-dd\")%>" pattern="D" required="true" requirednm="������" maxlength="10" tag="onKeyUp=\"pressEnter('queryList(this)')\""/>
						<span class=calendar onclick="openCalendar('fQuery.date_to' , fQuery.date_to.value)"></span>
					</td>
					<td width="1" bgcolor="#CCCCCC"></td>
					<td width="80" align="right">
						<ucare:imgbtn name="btnSearch" kind="R" onClick="queryList()"/><!-- ��ȸ -->
					</td>
				</tr>
			</ucare:table>
		</td>
	</tr>
	</form>
	<!-- �˻����� E -->

	<tr>
		<td height="5"></td>
	</tr>

	<!-- ���� S -->
	<form name="f" method="post">
	<input type="hidden" name="userid"	value="<%=sessioninfo.getUserID()%>">
	<input type="hidden" name="usernm"	value="<%=sessioninfo.getUserName()%>">
	<input type="hidden" name="gradecd" value="<%=sessioninfo.getUserGradeCD()%>">
	<input type="hidden" name="today"	value="<%=CUtil.getCurrDate("yyyyMMdd")%>"/>
	<tr>
		<td>
			<table width="1225" cellpadding="0" cellspacing="0" border="0">
				<col width="650" />
				<col width="5" />
				<col width="570" />
				<tr>
					<!-- Function ����Ʈ S -->
					<td valign="top">
						<table width="650" cellpadding="0" cellspacing="0" border="0">
							<tr>
								<td class="stitle">�ְ����� ��Ȳ</td>
							</tr>
							<tr>
								<td>
									<ucare:grid id="UCSYS141S" width="650" height="680">
										<tr event="O">
											<td width="85"	column="s_bse_dt"	title="����������" 	format="DATE"	align="center"></td>
											<td width="85"	column="e_bse_dt"	title="����������" 	format="DATE"	align="center"></td>
											<td width="40"	column="wk"		title="����" 	align="center"></td>
											<td width="60"	column="cnt"	title="��ü"		align="center"></td>
											<td width="60"	column="cnt00"	title="���ۼ�"	align="center"></td>
											<td width="60"	column="cnt01"	title="1�����"	align="center"></td>
											<td width="60"	column="cnt02"	title="2�����"	align="center"></td>
											<td width="60"	column="cnt03"	title="3�����"	align="center"></td>
											<td width="60"	column="cnt04"	title="����Ϸ�"	align="center"></td>
											<td width="60"	column="cnt05"	title="�ݷ�"		align="center"></td>
										</tr>
									</ucare:grid>
								</td>
							</tr>
						</table>
					</td>
					<!-- Function ����Ʈ E -->
					<td></td>
					<!-- Function ����Ʈ S -->
					<td valign="top">
						<table width="570" cellpadding="0" cellspacing="0" border="0">
							<tr>
								<td class="stitle">����� ����Ʈ <label id="status_title"></label></td>
							</tr>
							<tr>
								<td>
									<ucare:grid id="userlist" width="570" height="680" no="true">
										<tr event="">
											<td width="60"	column="user_nm"	title="�̸�"></td>
											<td width="160"	column="subject"	title="����"></td>
											<td width="70"	column="start_dt"	title="����������"	format="DATE"	align="center"></td>
											<td width="70"	column="end_dt"		title="����������"	format="DATE"	align="center"></td>
											<td width="100"	column="nowsignnm"	title="������"></td>
											<td width="70"	column="rg_dt"		title="�ۼ�����"		format="DATE"	align="center"></td>
										</tr>
									</ucare:grid>
								</td>
							</tr>
							<tr>
								<td height="10"></td>
							</tr>
							<tr style="display:none">
								<td align="right">
									<ucare:imgbtn width="70" name="btnSave"	value="�亯����" 	kind="S"	onClick="save()"/><!-- ���� -->
								</td>
							</tr>
						</table>
					</td>
					<!-- Function ����Ʈ E -->
				</tr>
			</table>
		</td>
	</tr>
	</form>
	<!-- ���� E -->
</table>
<%@ include file="/jsp/include/include_car.jsp" %>
</body>
</html>