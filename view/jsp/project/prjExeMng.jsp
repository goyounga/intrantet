<!--
  PROJ : Nexfron Intranet
  NAME : sysWeeklyRptMng.jsp
  DESC : ������Ʈ - ���� ȭ��
  Author : ������ ����
  VER  : 1.0
  Copyright 2009 Nexfron All rights reserved
  ============================================================================================
  								��		��		��		��
  ============================================================================================
  VERSION		DATE		AUTHOR		DESCRIPTION
  ============================================================================================
  1.0		2009.08.19		������		�ּ��߰�
  1.1		2010.09.07		���ر�		������Ʈ ���׸��߰�
  -->

<%@ page language="java" contentType="text/html; charset=EUC-KR"%>
<%@ include file="/jsp/include/include.jsp"%>
<html>
<head>
	<title>������Ʈ����</title>
	<script language="javascript" src="/html/js/project/prjExeMng.js"></script>
</head>
<body onLoad="init()" style="padding:0 0 0 0;">
<table width="1238" height="" cellpadding="0" cellspacing="0" border="0" bordercolor="red">
	<tr>
		<td width="5"></td>
	</tr>
	<tr>
		<td height="5"></td>
	</tr>
	<!-- �˻����� S -->
	<form name="fQuery" method="post">
	<tr>
		<td>
			<ucare:table type="query" width="100%">
				<tr>
					<td width="100" align="right">������Ʈ���� :&nbsp;</td>
					<td width="225">
						<ucare:input type="text" name="startdt" width="70" title="������" format="DATE" value="<%=CUtil.getMyDate(-1, \"yyyy-MM-dd\")%>" pattern="D" required="true" requirednm="������" maxlength="10" tag="onKeyUp=\"pressEnter('queryList(this)')\""/>
						<span class=calendar onclick="openCalendar('fQuery.startdt' , fQuery.startdt.value)"></span>&nbsp;
						~&nbsp;
						<ucare:input type="text" name="enddt" width="70" title="������" format="DATE" value="<%=CUtil.getMyDate(0, \"yyyy-MM-dd\")%>" pattern="D" required="true" requirednm="������" maxlength="10" tag="onKeyUp=\"pressEnter('queryList(this)')\""/>
						<span class=calendar onclick="openCalendar('fQuery.enddt' , fQuery.enddt.value)"></span>
					</td>
					<td width="100" align="right">������Ʈ���� : &nbsp;</td>
					<td width="">
						<ucare:select name="prj_knd_cd" option="10" brcode="PRJ009" code="code" codename="codenm"  width="100" styleClass="combo_text" />
					</td>
					<td width="100" align="right">������Ʈ���� :&nbsp;</td>
					<td width="170" >
						<ucare:select name="prj_c_cd"  option="10" brcode="PRJ001" code="code" codename="codenm"  width="150" styleClass="combo_text" />
					</td>
					<td width="80" align="right">������Ʈ�� : &nbsp;</td>
					<td width="115">
						<input type="text" name="prj_nm" class="input_text" style="width:100" onKeyPress="pressEnter('queryList()')">
					</td>
					<td width="70" align="right">������Ȳ :&nbsp;</td>
					<td width="100" >
						<ucare:select name="pogr_stat"  option="10" brcode="PRJ011" code="code" codename="codenm"  width="80" styleClass="combo_text" />
					</td>
					<td>&nbsp;</td>
					<td width="1" bgcolor=#CCCCCC></td>
					<td width="80" align="right">
						<ucare:imgbtn width="60" name="btnQuery"	value="��ȸ"	 onClick="queryList()"/><!-- ��ȸ -->
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
	<input type="hidden" name="userid" value="<%=sessioninfo.getUserID()%>">
	<input type="hidden" name="prj_seq" value="">
	<tr>
		<td>
			<table width="100%" border="0" cellpadding="0" cellspacing="0" border="0" >
				<col width="800" />
				<col width="5" />
				<col width="430" />
				<tr>
					<!-- ������Ʈ����Ʈ S -->
					<td valign="top" colspan="5">
						<table width="800" cellpadding="0" cellspacing="0" border="0" >
							<tr>
								<td class="stitle">������Ʈ ����Ʈ</td>
							</tr>
							<tr>
								<td>
									<ucare:grid id="UCPRJ010S" width="1230" height="295" no="true">
										<tr event="O">
											<td width="75" 	column="rl_st_dt" 		title="��������"			align="center" format="DATE"></td>
											<td width="75" 	column="rl_end_dt" 		title="��������"			align="center" format="DATE"></td>
											<td width="80" column="prj_c_cd_nm"	title="������Ʈ����"		align="center" ></td>
											<td width="242" column="prj_nm" 		title="������Ʈ��"			align="left"></td>
											<td width="70" 	column="cntr_man_m" 	title="���M/M"				align="right" format="MONEY"></td>
											<td width="70" 	column="rl_etrn_m_m" 	title="������M/M"			align="right" format="MONEY"></td>
											<td width="60" 	column="pgs_rt" 		title="������%"				align="right" format="MONEY" hidden="true"></td><!--������-->
											<td width="60" 	column="end_f_cd_nm"	title="�ϷῩ��"			align="center"  hidden="true"></td>
											<td width="60" 	column="prj_seq" 		title="������Ʈ����"		align="center"  hidden="true"></td>
											<td width="60" 	column="prj_c_cd" 		title="������Ʈ�����ڵ�"	align="center"  hidden="true"></td>
											<td width="60" 	column="prj_desc" 		title="������Ʈ����"		align="center"  hidden="true"></td>
											<td width="60" 	column="prj_loc" 		title="������Ʈ��ġ"		align="center"  hidden="true"></td>
											<td width="60" 	column="end_f_cd" 		title="�ϷῩ��CD"			align="center"  hidden="true"></td>
											

											<td width="60" 	column="prj_c_dtl_cd"	title="������Ʈ���л�"	align="center"  hidden="true"></td>
											<td width="60" 	column="coper_co"		title="���»�"				align="center"  hidden="true"></td>
											<td width="90" 	column="clnt_co"		title="����"				align="center"  hidden="false"></td>
											<td width="60" 	column="etrn_m"			title="�����ο�"			align="center"  hidden="true"></td>
											<td width="60" 	column="dvlp_tool"		title="������"				align="center"  hidden="true"></td>
											<td width="60" 	column="dbms"			title="DBMS"				align="center"></td>
											<td width="60" 	column="prj_knd_cd"		title="������Ʈ����"		align="center"  hidden="true"></td>
											<td width="60" 	column="jdk_ver"		title="JDK����"				align="center"></td>
											<td width="60" 	column="was_type"		title="WAS����"				align="center"></td>
											<td width="0" 	column="pogr_stat"		title="������Ȳ"			align="center"  hidden="true"></td>
											<td width="0" 	column="work_range"		title="��������"			align="center"  hidden="true"></td>
											<td width="0" 	column="rmk"			title="���"				align="center"  hidden="true"></td>
											<td width="60" 	column="pogr_stat_nm"	title="������Ȳ"			align="center"  ></td>
											<td width="65" 	column="rg_dt" 			title="�������"			align="center" format="DATE"></td>
											<td width="60" 	column="rg_tm" 			title="��Ͻð�"			align="center"  hidden="true"></td>
											<td width="60" 	column="rg_id" 			title="�����ID"			align="center"  hidden="true"></td>
											<td width="60" 	column="rg_nm" 			title="�����"				align="center"></td>
											<td width="65" 	column="mdf_dt"			title="��������"			align="center" format="DATE"></td>
											<td width="60" 	column="mdf_tm"			title="����ð�"			align="center"  hidden="true"></td>
											<td width="60" 	column="mdf_id"			title="������ID"			align="center"  hidden="true"></td>
											<td width="60" 	column="mdf_nm"			title="������"				align="center"></td>
										</tr>
									</ucare:grid>
								</td>
							</tr>
						</table>
					</td>
				</tr>
				<!-- ������Ʈ����Ʈ E -->
				<tr>
				<!-- ������Ʈ���� S -->
					<td valign="top">
						<table width="430" cellpadding="0" cellspacing="0" border="0" bordercolor="red" >
							<tr>
								<td class="stitle">������Ʈ ������</td>
							</tr>
							<tr>
								<td>
									<table class="MANTBL" cellspacing='1' cellpadding = "0" border='0' width="430" height="0" style="table-layout:fixed;">
									<!--ucare:table type="detail" width="430" -->
									<col width="100"  />
									<col width="180" />
									<col width="100" />
									<col width="180"/>
										<tr>
											<td class="MANTDT" width="80">������Ʈ��</td>
											<td class="MANTDM" width="" colspan="3">
												<input type=text class=input_required  name="prj_nm" style="width:348;ime-mode:active" maxlength="50">
											</td>
										</tr>
										<tr>
											<td class="MANTDT" width="80">������Ʈ����</td>
											<td class="MANTDM" colspan="3">
												<ucare:select name="prj_c_cd"  option="4" brcode="PRJ001" code="code" codename="codenm"  width="172" styleClass="combo_text" onChange="onChange_prj_c_cd()"/>
												<select name="prj_c_dtl_cd"  style="width:172" code="code" codename="codenm" class="combo_text"  option="4"><option value="">== ���� ==</option></select>
											</td>
										</tr>
										<tr>
											<td class="MANTDT" width="80">��������</td>
											<td class="MANTDM" width="">
												<ucare:input type="text" name="rl_st_dt" width="105" title="������Ʈ��������" format="DATE" value="<%=CUtil.getMyDate(0, \"yyyy-MM-dd\")%>" pattern="D" required="false" requirednm="����������" maxlength="10"/>
												<span class=calendar onclick="openCalendar('f.rl_st_dt' , f.rl_st_dt.value)"></span>
											</td>
											<td class="MANTDT" width="80">��������</td>
											<td class="MANTDM" width="">
												<ucare:input type="text" name="rl_end_dt" width="105" title="������Ʈ��������" format="DATE" value="<%=CUtil.getMyDate(0, \"yyyy-MM-dd\")%>" pattern="D" required="false" requirednm="����������" maxlength="10"/>
												<span class=calendar onclick="openCalendar('f.rl_end_dt' , f.rl_end_dt.value)"></span>
											</td>
										</tr>
										<tr>
											<td class="MANTDT" >������Ʈ����</td>
											<td class="MANTDM" >
												<ucare:select name="prj_knd_cd"  option="4" brcode="PRJ009" code="code" codename="codenm"  width="131" styleClass="combo_required" />
											</td>
											<td class="MANTDT" >�����ο�</td>
											<td class="MANTDM">
												<input type="text" class="input_number" name="etrn_m" style="width:131;"  maxlength="10" onKeyDown="checkOnlyNumber()">
											</td>
										</tr>
										<tr>
											<td class="MANTDT" >���»�</td>
											<td class="MANTDM" >
												<input type="text" class="input_text" name="coper_co" style="width:131;ime-mode:active;"  maxlength="50">
											</td>
											<td class="MANTDT" >����</td>
											<td class="MANTDM" >
												<input type="text" class="input_text" name="clnt_co" style="width:131;ime-mode:active;" maxlength="50" >
											</td>
										</tr>
										<tr>
											<td class="MANTDT" >������</td>
											<td class="MANTDM" >
												<ucare:select name="dvlp_tool"  option="4" brcode="PRJ007" code="code" codename="codenm"  width="131" styleClass="combo_text" />
											</td>
											<td class="MANTDT" >DBMS</td>
											<td class="MANTDM" >
												<ucare:select name="dbms"  option="4" brcode="PRJ008" code="code" codename="codenm"  width="131" styleClass="combo_text" />
											</td>
										</tr>
										<tr>
											<td class="MANTDT" >���M/M</td>
											<td class="MANTDM" >
												<input type="text" class="input_number" name="cntr_man_m" style="width:131;"  maxlength="10" onKeyDown="checkOnlyNumber()">
											</td>
											<td class="MANTDT" >������M/M</td>
											<td class="MANTDM" >
												<input type="text" class="input_number" name="rl_etrn_m_m" style="width:131;" maxlength="10" onKeyDown="checkOnlyNumber()">
											</td>
										</tr>
										<!--tr>
											<td class="MANTDT" >������</td>
											<td class="MANTDM" >
												<input type="text" class="input_number" name="pgs_rt" style="width:115;" maxlength="10" onKeyDown="checkOnlyNumber()"> %
											</td>
											<td class="MANTDT" >�ϷῩ��</td>
											<td class="MANTDM" >
												<ucare:select name="end_f_cd"  option="-1" brcode="USEYN" code="code" codename="codenm"  width="131" styleClass="combo_text" />
											</td>
										</tr-->
										<tr>
											<td class="MANTDT" >JDK����</td>
											<td class="MANTDM" >
												<input type="text" class="input_text" name="jdk_ver" style="width:131; maxlength="50">
											</td>
											<td class="MANTDT" >WAS����</td>
											<td class="MANTDM" >
												<ucare:select name="was_type"  option="4" brcode="PRJ012" code="code" codename="codenm"  width="131" styleClass="combo_text" />
											</td>
										</tr>
										<tr>
											<td class="MANTDT" width="80">������Ʈ��ġ</td>
											<td class="MANTDM" colspan="3">
												<input type=text class="input_text"  name="prj_loc" style="width:348;ime-mode:active" maxlength="100">
											</td>
										</tr>
										<tr height="50">
											<td class="MANTDT" width="80">������Ʈ����</td>
											<td class="MANTDM"  colspan="3">
												<textarea name="prj_desc" class="input_textarea_text" style="width:380;height:50;ime-mode:active" maxlength="1000"></textarea>
											</td>
										</tr>
										<tr height="62">
											<td class="MANTDT" width="80" >���</td>
											<td class="MANTDM" colspan="3"><textarea name="rmk" class="input_textarea_text"  style="width:380;height:56;ime-mode:active" maxlength="1000"></textarea></td>
										</tr>
										<tr height="27" >
											<td class="MANTDT" width="80"   >������Ȳ</td>
											<td class="MANTDM" width="215" colspan="3"><ucare:select name="pogr_stat"  option="4" brcode="PRJ011" code="code" codename="codenm"  width="210" required="true" requirednm="������Ȳ"  /></td>
										</tr>
									<!--/ucare:table-->
									</table>
								</td>
							</tr>
							<tr>
								<td height="5"></td>
							</tr>
							<tr>
								<td align="right">
									<ucare:imgbtn width="60" name="btnAdd"		value="���"		onClick="Add()"/><!-- ��� -->
									<ucare:imgbtn width="60" name="btnSave"		value="����"		onClick="Save()"/><!-- ���� -->
								</td>
							</tr>
						</table>
					</td>
					<td width="10px"></td>
					<td valign="top" algin="center">
						<table cellpadding="0" cellspacing="0" border="0" width="100%">
							<tr>
								<td class="stitle">��������</td>
								<td></td>
							</tr>
						</table>
						<ucare:grid id="UCPRJ012S" width="135" height="395" no="false">
							<tr event="O">
								<td width="18"	column="chk" 		title="��������" 			align="center" format="CHECKBOX" hcheckbox="true" editable="true" />
								<td width="98"  column="code_nm"	title="��������"	align="center"></td>
								<td width="80"  column="code"		title="��������cd"	align="center" hidden="true"></td>
							</tr>
						</ucare:grid>
					</td>
					<td width="10px"></td>
					<td>
						<table width="430" cellpadding="0" cellspacing="0" border="0" bordercolor="red" >
							<tr>
								<td>
									<table cellpadding="0" cellspacing="0" border="0" width="100%">
										<tr>
											<td class="stitle">������Ʈ ����</td>
											<td></td>
										</tr>
									</table>
								</td>
							</tr>
	</form>
	<form name="fmb" method="post">
							<tr>
								<td>
									<ucare:grid id="UCPRJ011S" width="530" height="225" no="true">
										<tr event="O">
											<td width="76" 	column="user_nm"		title="�̸�"				align="center" ></td>
											<td width="55"  column="etrn_c_cd_nm"	title="���Ա���"			align="center"></td>
											<td width="70" 	column="etrn_dt" 		title="��������"			align="center" format="DATE"></td>
											<td width="70" 	column="ot_dt" 			title="ö������"			align="center" format="DATE"></td>
											<td width="70" 	column="etrn_du_dt" 	title="���Կ�������"		align="center" format="DATE" ></td>
											<td width="70" 	column="ot_du_dt" 		title="ö����������"		align="center" format="DATE" ></td>
											<td width="60" 	column="user_id" 		title="�̸�ID"			align="center"  hidden="true"></td>
											<td width="60" 	column="prj_seq" 		title="������Ʈ����"		align="center"  hidden="true"></td>
											<td width="60" 	column="etrn_c_cd" 		title="���Ա����ڵ�"		align="center"  hidden="true"></td>
											<td width="60" 	column="job_c_cd" 		title="���������ڵ�"		align="center"  hidden="true"></td>
											<td width="60" 	column="chrgjob" 		title="������"		align="center"  hidden="true"></td>
											<td width="60" 	column="rg_dt" 			title="�������"			align="center"  hidden="true"></td>
											<td width="60" 	column="rg_tm" 			title="��Ͻð�"			align="center"  hidden="true"></td>
											<td width="60" 	column="rg_id" 			title="�����ID"			align="center"  hidden="true"></td>
											<td width="60" 	column="rg_nm" 			title="�����"			align="center"  hidden="true"></td>
											<td width="60" 	column="mdf_dt"			title="��������"			align="center"  hidden="true"></td>
											<td width="60" 	column="mdf_tm"			title="����ð�"			align="center"  hidden="true"></td>
											<td width="60" 	column="mdf_id"			title="������ID"			align="center"  hidden="true"></td>
											<td width="60" 	column="mdf_nm"			title="������"			align="center"  hidden="true"></td>
										</tr>
									</ucare:grid>
								</td>
							</tr>
							<tr>
								<td height="5"></td>
							</tr>
							<tr>
								<td >
									<table class="MANTBL" cellspacing='1' cellpadding = "0" border='0' width="430" height="0" style="table-layout:fixed;">
									<!--ucare:table type="detail" width="430" -->
									<col width="100"  />
									<col width="165" />
									<col width="100" />
									<col width="165"/>
										<tr>
											<td class="MANTDT" >����</td>
											<td class="MANTDM" colspan="3">
												<input type="text" name="user_id" readOnly class="input_readonly" style="width:80;">
												<input type="text" name="user_nm" readOnly class="input_readonly" style="width:80;">
												<span class="search" onClick="openUserOrg(fmb)"></span>
												<span class="minus" onClick="del_userID(fmb);"></span>
											</td>
										</tr>
										<tr>
											<td class="MANTDT" >���Ա���</td>
											<td class="MANTDM">
												<ucare:select name="etrn_c_cd"  option="-1" brcode="PRJ002" code="code" codename="codenm"  width="131" styleClass="combo_text" />
											</td>
											<td class="MANTDT" >��������</td>
											<td class="MANTDM">
												<ucare:select name="job_c_cd"  option="-1" brcode="PRJ010" code="code" codename="codenm"  width="131" styleClass="combo_text" />
											</td>
										</tr>
										<tr>
											<td class="MANTDT" width="80">���Կ�������</td>
											<td class="MANTDM" >
												<ucare:input type="text" name="etrn_du_dt" width="105" title="���Կ�������" format="DATE" value="<%=CUtil.getMyDate(0, \"yyyy-MM-dd\")%>" pattern="D" required="false" requirednm="���Կ�������" maxlength="10"/>
												<span class=calendar onclick="openCalendar('fmb.etrn_du_dt' , fmb.etrn_du_dt.value)"></span>
											</td>
											<td class="MANTDT" width="80">ö����������</td>
											<td class="MANTDM" width="">
												<ucare:input type="text" name="ot_du_dt" width="105" title="ö����������" format="DATE" value="<%=CUtil.getMyDate(0, \"yyyy-MM-dd\")%>" pattern="D" required="false" requirednm="ö����������" maxlength="10"/>
												<span class=calendar onclick="openCalendar('fmb.ot_du_dt' , fmb.ot_du_dt.value)"></span>
											</td>
										</tr>
										<tr>
											<td class="MANTDT">��������</td>
											<td class="MANTDM">
												<ucare:input type="text" name="etrn_dt" width="105" title="��������" format="DATE" value="<%=CUtil.getMyDate(0, \"yyyy-MM-dd\")%>" pattern="D" required="false" requirednm="��������" maxlength="10"/>
												<span class=calendar onclick="openCalendar('fmb.etrn_dt' , fmb.etrn_dt.value)"></span>
											</td>
											<td class="MANTDT">ö������</td>
											<td class="MANTDM">
												<ucare:input type="text" name="ot_dt" width="105" title="ö������" format="DATE" value="<%=CUtil.getMyDate(0, \"yyyy-MM-dd\")%>" pattern="D" required="false" requirednm="ö������" maxlength="10"/>
												<span class=calendar onclick="openCalendar('fmb.ot_dt' , fmb.ot_dt.value)"></span>
											</td>
										</tr>
										<tr height="50">
											<td class="MANTDT" width="80">������</td>
											<td class="MANTDM" colspan="3">
												<textarea name="chrgjob" class="input_textarea_text"  style="width:348;height:48;ime-mode:active" maxlength="1000"></textarea>
											</td>
										</tr>
									<!--/ucare:table-->
									</table>
								</td>
							</tr>
							<tr>
								<td height="5"></td>
							</tr>
							<tr>
								<td align="right">
									<ucare:imgbtn width="60" name="btnAddMB"		value="���"		onClick="AddMB()"/><!-- ��� -->
									<ucare:imgbtn width="60" name="btnSaveMB"		value="����"		onClick="SaveMB()"/><!-- ���� -->
									<ucare:imgbtn width="60" name="btnDelMB"		value="����"		onClick="DelMB()"/><!-- ���� -->
								</td>
							</tr>
						</table>
					</td>
					<!-- ������Ʈ���� E -->
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