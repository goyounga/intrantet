<!--
  PROJ : Nexfron Intranet
  NAME : sysWeeklyRptMng.jsp
  DESC : �ְ�����  ���� ȭ��
  Author : ������ ����
  VER  : 1.0
  Copyright 2009 Nexfron All rights reserved
  ============================================================================================
  								��		��		��		��
  ============================================================================================
  VERSION		DATE		AUTHOR		DESCRIPTION
  ============================================================================================
  1.0		2009.08.12		������		�ּ��߰�
  -->

<%@ page language="java" contentType="text/html; charset=EUC-KR"%>
<%@ include file="/jsp/include/include.jsp"%>
<html>
<head>
	<title>�ְ����� ����</title>
	<script language="javascript" src="/html/js/management/mngWeeklyRptMng.js"></script>
</head>
<body topmargin="0" leftmargin="5"  onLoad="init()">
<table width="1225" cellpadding="0" cellspacing="0" border="0">
	<tr>
		<td height="5"></td>
	</tr>

	<!-- �˻����� S -->
	<form name="fQuery" method="post">
	<input type="hidden" name="dept_cd" value="<%=sessioninfo.getUserPartCD()%>">
	<input type="hidden" name="subQuery">
	<input type="hidden" name="subQuery2">
	<tr>
		<td>
			<ucare:table type="query" width="1215">
				<tr>
					<td width="80" align="right">�ۼ����� :&nbsp;</td>
					<td width="240">
						<ucare:input type="text" name="date_from" width="70" title="������" format="DATE" value="<%=CUtil.getMyDate(-1, \"yyyy-MM-dd\")%>" pattern="D" required="true" requirednm="������" maxlength="10" tag="onKeyUp=\"pressEnter('queryList(this)')\""/><span class=calendar onclick="openCalendar('fQuery.date_from' , fQuery.date_from.value)"></span>&nbsp;
						~&nbsp;
						<ucare:input type="text" name="date_to" width="70" title="������" format="DATE" value="<%=CUtil.getMyDate(0, \"yyyy-MM-dd\")%>" pattern="D" required="true" requirednm="������" maxlength="10" tag="onKeyUp=\"pressEnter('queryList(this)')\""/><span class=calendar onclick="openCalendar('fQuery.date_to' , fQuery.date_to.value)"></span>
					</td>
					<td width="80" align="right">���� :&nbsp;</td>
					<td width="140">
						<ucare:input type="text" name="qsubject" width="130" title="����" required="false" requirednm="����" tag="onKeyUp=\"pressEnter('queryList(this)')\""/>
					</td>
					<td width="80" align="right">�ۼ��� :&nbsp;</td>
					<td width="250">
						<ucare:input type="text" name="qrg_id" width="60" title="�ۼ���ID" required="false" requirednm="�ۼ���ID" readonly="true"/>
						<ucare:input type="text" name="qrg_nm" width="100" title="�ۼ���" required="false" requirednm="�ۼ���" tag="onKeyUp=\"pressEnter('queryList(this)')\"" onBlur="usernm_onBlur(this)"/>
						<span id="btnUserId" class=search onClick="openUserOrg('qrg_id')"></span>
					</td>
					<td width="80" align="right">������ :&nbsp;</td>
					<td width="250">
						<ucare:select name="subGubun" brcode="SYS022" width="100" option="1" selCode="01"/>
					</td>
					<td width="1" bgcolor="#CCCCCC"></td>
					<td width="80" align="right">
						<ucare:imgbtn name="btnSearch"	kind="R" onClick="queryList()"/><!-- ��ȸ -->
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
				<col width="590" />
				<col width="5" />
				<col width="630" />
				<tr>
					<!-- Function ����Ʈ S -->
					<td valign="top">
						<table width="590" cellpadding="0" cellspacing="0" border="0">
							<tr>
								<td class="stitle">�ְ����� ����Ʈ</td>
							</tr>
							<tr>
								<td>
									<ucare:grid id="UCSYS100S" width="590" height="680" no="true">
										<tr event="O">
											<td width="0"	column="id"			title="����"			editable="false"	align="center"></td>
											<td width="30"	column="approval"	title="����" align="center" format="CHECKBOX" editable="true" hcheckbox="true"></td>
											<td width="47"	column="back"		title="�ݷ�" align="center" format="CHECKBOX" editable="true" hcheckbox="true"></td>
											<td width="180"	column="subject"	title="����"			editable="false"></td>
											<td width="0"	column="statcd"		title="��������ڵ�"	editable="false"></td>
											<td width="70"	column="start_dt"	title="����������"		editable="false"	format="DATE"	align="center"></td>
											<td width="70"	column="end_dt"		title="����������"		editable="false"	format="DATE"	align="center"></td>
											<td width="90"	column="statcdnm"	title="�������"		editable="false"></td>
											<td width="45"	column="rg_nm"		title="�ۼ���"			editable="false"></td>
											<td width="0"	column="nowsignid"	title="������ID"		editable="false"></td>
											<td width="120"	column="nowsignnm"	title="�����ڸ�"		editable="false"></td>
											<td width="0"	column="sign_stg_cd" title="����ܰ�"		editable="false"	align="center"></td>
											<td width="0"	column="nowdepth"	title="�������ܰ�"	editable="false"></td>
											<td width="80"	column="rg_id"		title="�ۼ���ID"			editable="false" hidden="true"></td>
											<td width="70"	column="rg_dt"		title="�ۼ�����"		editable="false"	format="DATE"	align="center"></td>
											<td width="80"	column="mdf_id"		title="������"			editable="false" hidden="true"></td>
											<td width="70"	column="mdf_dt"		title="��������"		editable="false"	format="DATE"	align="center" hidden="true"></td>
										</tr>
									</ucare:grid>
								</td>
							</tr>
							<tr>
								<td height="10"></td>
							</tr>
							<tr>
								<td align="right">
									<ucare:imgbtn name="btnAppSave"	value="��������" kind="S"	onClick="saveApp()"/><!-- ���� -->
								</td>
							</tr>
						</table>
					</td>
					<!-- Function ����Ʈ E -->
					<td></td>
					<!-- Function ������ S -->
					<td valign="top">
						<table width="630" cellpadding="0" cellspacing="0" border="0">
							<tr>
								<td class="stitle">�ְ����� ������</td>
							</tr>
							<tr>
								<td>
									<ucare:table type="detail" width="630">
										<tr>
											<td class="MANTDT" width="115">����</td>
											<td class="MANTDM" width="200">
												<ucare:input type="text" name="subject" width="180" title="����" required="false" requirednm="����"/>
											</td>
											<td class="MANTDT" width="115">�������</td>
											<td class="MANTDM" width="200">
												<!--
												<ucare:input type="text" name="statcd" width="0" title="�������" required="false" requirednm="�������" maxlength="10" readonly="true"/>-->
												<ucare:input type="text" name="statcdnm" width="180" title="�������" required="false" requirednm="�������" readonly="true"/>
											</td>
										</tr>
										<tr>
											<td class="MANTDT" width="115">����������</td>
											<td class="MANTDM" width="200">
												<ucare:input type="text" name="start_dt" width="70" title="����������" format="DATE" value="<%=CUtil.getMyDate(0, \"yyyy-MM-dd\")%>" pattern="D" required="false" requirednm="����������" maxlength="10"/><span class=calendar onclick="openCalendar('f.start_dt' , f.start_dt.value)"></span>
											</td>
											<td class="MANTDT" width="115">����������</td>
											<td class="MANTDM" width="200">
												<ucare:input type="text" name="end_dt" width="70" title="����������" format="DATE" value="<%=CUtil.getMyDate(0, \"yyyy-MM-dd\")%>" pattern="D" required="false" requirednm="����������" maxlength="10"/><span class=calendar onclick="openCalendar('f.end_dt' , f.end_dt.value)"></span>
											</td>
										</tr>
										<tr>
											<td class="MANTDT">���־�������</td>
											<td class="MANTDM" colspan="3">
												<textarea name="weekly_content" required="false" requirednm="���־�������" style="width:502;height:90;"></textarea>
											</td>
										</tr>
										<tr>
											<td class="MANTDT">���־�����ȹ</td>
											<td class="MANTDM" colspan="3">
												<textarea name="next_weekly_content" required="false" requirednm="���־�����ȹ" style="width:502;height:60;"></textarea>
											</td>
										</tr>
										<tr>
											<td class="MANTDT">�̽�����</td>
											<td class="MANTDM" colspan="3">
												<textarea class="input_text" name="issue" style="width:502;height:50;" readonly="true"></textarea>
											</td>
										</tr>
									<%
										String dayNm[] = {"������","ȭ����","������","�����","�ݿ���","�����","�Ͽ���"};
										for (int i=0; i<7; i++) { %>
										<tr>
											<td class="MANTDT" width="115"><%=dayNm[i]%></td>
											<td class="MANTDM" width="200">
												<textarea name="content" style="width:200;height:38" maxsize="2000" class="Input_text" required="false" requirednm="���־�������"></textarea>
											</td>
											<td class="MANTDM" width="115">
												<ucare:input type="text" name="start_tm" width="45" format="TIME" tag="onKeyDown=\"checkOnlyNumber()\""  maxlength="5" maxsize="5"/>
												~
												<ucare:input type="text" name="end_tm" width="45" format="TIME"  maxlength="5" maxsize="5"/>
											</td>
											<td class="MANTDM" width="200">
												<ucare:select name="holi_gb" brcode="SYS021" width="60" option="0"/>&nbsp;
												<ucare:select name="prj_seq" queryid="UCSYS104S" brcode="" width="100" option="0"/>

											</td>
										</tr>
									<% } %>
										<tr>
											<td class="MANTDT">�亯</td>
											<td class="MANTDM" colspan="3">
												<textarea name="response"  required="true" requirednm="�亯" style="width:502;height:60;"></textarea>
											</td>
										</tr>
										<tr>
											<td class="MANTDT">�����</td>
											<td class="MANTDM">
												<input type=text class="input_readonly" readonly name="rg_nm" style="width:197;">
											</td>
											<td class="MANTDT">�������</td>
											<td class="MANTDM">
												<ucare:input type="text" name="rg_dt" width="197" title="�������" format="DATE" pattern="D" required="false" requirednm="�������" maxlength="10" readonly="true"/>
											</td>
										</tr>
										<tr>
											<td class="MANTDT">������</td>
											<td class="MANTDM">
												<input type=text class="input_readonly" readonly name="mdf_nm" style="width:197;">
											</td>
											<td class="MANTDT">��������</td>
											<td class="MANTDM">
												<ucare:input type="text" name="mdf_dt" width="197" title="��������" format="DATE" pattern="D" required="false" requirednm="��������" maxlength="10" readonly="true"/>
											</td>
										</tr>
									</ucare:table>
								</td>
							</tr>
							<tr>
								<td height="10"></td>
							</tr>
							<tr>
								<td align="right">
									<ucare:imgbtn name="btnView"	value="ũ�Ժ���" 	kind="S"	onClick="openDetailView()"/>
									<ucare:imgbtn name="btnSave"	value="�亯����" 	kind="S"	onClick="save()"/><!-- ���� -->
								</td>
							</tr>
						</table>
					</td>
					<!-- Function ������ E -->
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