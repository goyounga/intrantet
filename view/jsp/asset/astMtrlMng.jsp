<!--
  PROJ : Nexfron Intranet
  NAME : astMtrlMng.jsp
  DESC : ���� ���� ȭ��
  Author : ������ ����
  VER  : 1.0
  Copyright 2009 Nexfron All rights reserved
  ============================================================================================
  								��		��		��		��
  ============================================================================================
  VERSION		DATE		AUTHOR		DESCRIPTION
  ============================================================================================
  1.0		2009.08.13		������		�ּ��߰�
  -->
<%@ page language="java" contentType="text/html; charset=EUC-KR"%>
<%@ include file="/jsp/include/include.jsp"%>
<html>
<head>
	<title>���� ����</title>
	<script language="javascript" src="/html/js/asset/astMtrlMng.js"></script>
</head>
<body onLoad="init()" style="padding:0 0 0 5;">

<table width="1225" cellpadding="0" cellspacing="0" border="0">
	<tr>
		<td height="5"></td>
	</tr>

	<!-- �˻����� S -->
	<form	name="fQuery" method="post">
	<tr>
		<td>
			<ucare:table type="query" width="1215">
				<tr>
					<th width="80" align="right">��ȸ���� :&nbsp;</th>
					<td width="150">
						<ucare:input type="radio" name="queryType"  tag="style=BACKGROUND-COLOR:#F4F4F4" checked="true" /> ��ǰ��&nbsp;&nbsp;&nbsp;
						<ucare:input type="radio" name="queryType"	tag="style=BACKGROUND-COLOR:#F4F4F4" /> ������
					</td>
					<th width="80" align="right">���籸�� :&nbsp;</th>
					<td width="125" ><ucare:select name="mtrl_c_cd"  option="10" brcode="AST001" code="code" codename="codenm"  width="125" styleClass="combo_text" /></td>

					<th width="80" align="right">��ǰ�� :&nbsp;</th>
					<td width="100"><input type="text" name="prdt_nm" class="input_text" style="width:100" onKeyPress="pressEnter('queryList()')"></td>

					<th width="80" align="right">�뿩���� :&nbsp;</th>
					<td width="115"><ucare:select name="rnt_c_cd"  option="10" brcode="COM002" code="code" codename="codenm"  width="60" styleClass="combo_text" /></td>
					<td>&nbsp;</td>
					<td width="1" bgcolor=#CCCCCC></td>
					<td width="80" align="right">
						<ucare:imgbtn width="70" name="btnQuery"	value="��ȸ"	 onClick="queryList()"/><!-- ��ȸ -->
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
	<input type="hidden" name="mtrl_seq" value="">
	<tr>
		<td>
			<table width="1225" cellpadding="0" cellspacing="0" border="0">
				<col width="800" />
				<col width="5" />
				<col width="420" />
				<tr>
					<!-- ������Ʈ����Ʈ S -->
					<td valign="top">
						<table width="800" cellpadding="0" cellspacing="0" border="0">
							<tr>
								<td class="stitle">���� ����Ʈ</td>
							</tr>
							<tr>
								<td>
									<ucare:grid id="UCAST020S" width="800" height="730" no="true">
										<tr event="O">
											<td width="70" 	column="mtrl_c_nm" 		title="���籸��"		align="left" 	></td>
											<td width="100" column="mco" 			title="������"			align="left" 	></td>
											<td width="150" column="prdt_nm"		title="��ǰ��"			align="left" 	></td>
											<td width="60" 	column="rnt_c_cd" 		title="�뿩����"		align="center" 	></td>
											<td width="70" 	column="rnt_nm"			title="�����뿩��"		align="center"	></td>
											<td width="75" 	column="rnt_dt" 		title="�����뿩����"	align="center" 	format="DATE"></td>
											<td width="75" 	column="rtn_dt" 		title="�����ݳ�����"	align="center" 	format="DATE"></td>
											<td width="75" 	column="buy_dt" 		title="��������"		align="center" 	format="DATE"></td>
											<td width="55" 	column="buy_amt" 		title="���԰���"		align="right" 	format="MONEY"></td>
											<td width="50" 	column="cnt" 			title="�μ�ǰ"			align="center" 	></td>
											<td width="150" column="prdt_no" 		title="��ǰ��ȣ"		align="left" 	></td>
											<td width="60" 	column="mtrl_seq" 		title="�������"		align="center"  hidden="true"></td>
											<td width="60" 	column="mtrl_c_cd" 		title="���籸���ڵ�"	align="center"  hidden="true"></td>
											<td width="60"  column="mtrl_rmk"		title="���"			align="center"  hidden="true"></td>
											<td width="60" 	column="rnt_id" 		title="�뿩��ID"		align="center"  hidden="true"></td>
											<td width="60" 	column="rg_dt" 			title="�������"		align="center"  hidden="true"></td>
											<td width="60" 	column="rg_tm" 			title="��Ͻð�"		align="center"  hidden="true"></td>
											<td width="60" 	column="rg_id" 			title="�����ID"		align="center"  hidden="true"></td>
											<td width="60" 	column="rg_nm" 			title="�����"			align="center"  hidden="true"></td>
											<td width="60" 	column="mdf_dt"			title="��������"		align="center"  ></td>
											<td width="60" 	column="mdf_tm"			title="����ð�"		align="center"  ></td>
											<td width="60" 	column="mdf_id"			title="������ID"		align="center"  ></td>
											<td width="60" 	column="mdf_nm"			title="������"			align="center"  ></td>
										</tr>
									</ucare:grid>
								</td>
							</tr>
						</table>
					</td>
					<!-- ������Ʈ����Ʈ E -->
					<td></td>
					<!-- ������Ʈ���� S -->
					<td valign="top">
						<table width="420" cellpadding="0" cellspacing="0" border="0">
							<tr>
								<td class="stitle">���� ������</td>
							</tr>
							<tr>
								<td>
									<ucare:table type="detail" width="420">
										<tr>
											<td class="MANTDT" >���籸��</td>
											<td class="MANTDM" >
												<ucare:select name="mtrl_c_cd"  option="-1" brcode="AST001" code="code" codename="codenm"  width="125" styleClass="combo_required" />
											</td>
											<td class="MANTDT" >��ǰ��</td>
											<td class="MANTDM" >
												<input type="text" class="input_required" name="prdt_nm" style="width:125;ime-mode:active;"  maxlength="25">
											</td>
										</tr>
										<tr>
											<td class="MANTDT" >��ǰ��ȣ</td>
											<td class="MANTDM" >
												<input type="text" class="input_text" name="prdt_no" style="width:125;ime-mode:active;"  maxlength="25">
											</td>
											<td class="MANTDT" >������</td>
											<td class="MANTDM" >
												<input type="text" class="input_text" name="mco" style="width:125;ime-mode:active;" maxlength="25" >
											</td>
										</tr>
										<tr>
											<td class="MANTDT" >��������</td>
											<td class="MANTDM" >
												<ucare:input type="text" name="buy_dt" width="70" title="��������" format="DATE" pattern="D" required="false" maxlength="10"/>
												<span class=calendar onclick="openCalendar('f.buy_dt', f.buy_dt.value)"></span>
											</td>
											<td class="MANTDT" >���԰���</td>
											<td class="MANTDM" >
												<input type="text" class="input_number" name="buy_amt" style="width:125;" maxlength="20" onKeyDown="checkOnlyNumber()">
											</td>
										</tr>
										<tr>
											<td class="MANTDT" >�뿩����</td>
											<td class="MANTDM" colspan="3">
												<ucare:select name="rnt_c_cd"  option="-1" brcode="COM002" code="code" codename="codenm"  width="60" styleClass="combo_text" />
											</td>
										</tr>
										<tr>
											<td class="MANTDT" >�뿩��</td>
											<td class="MANTDM" colspan="3">
												<input type="text" name="rnt_id" readOnly class="input_readonly" style="width:80;">
												<input type="text" name="rnt_nm" readOnly class="input_readonly" style="width:80;">
												<span class="search" onClick="openUserOrg(f)"></span>
												<span class="minus" onClick="del_userID(f);"></span>
											</td>
										</tr>
										<tr>
											<td class="MANTDT" width="80">�뿩����</td>
											<td class="MANTDM" width="125">
												<ucare:input type="text" name="rnt_dt" width="70" title="�뿩����" format="DATE" pattern="D" required="false" maxlength="10"/>
												<span class=calendar onclick="openCalendar('f.rnt_dt', f.rnt_dt.value)"></span>
											</td>
											<td class="MANTDT" width="80">�ݳ�����</td>
											<td class="MANTDM" width="125">
												<ucare:input type="text" name="rtn_dt" width="70" title="�ݳ�����" format="DATE" pattern="D" required="false" maxlength="10"/>
												<span class=calendar onclick="openCalendar('f.rtn_dt', f.rtn_dt.value)"></span>
											</td>
										</tr>
										<tr>
											<td class="MANTDT" width="80">���</td>
											<td class="MANTDM" colspan="3">
												<textarea name="mtrl_rmk" class="input_textarea_text"  style="width:335;height:100;ime-mode:active" maxlength="500"></textarea>
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
									<ucare:imgbtn width="70" name="btnAdd"		value="���"		onClick="Add()"/><!-- ��� -->
									<ucare:imgbtn width="70" name="btnSave"		value="����"		onClick="Save()"/><!-- ���� -->
								 	<ucare:imgbtn width="70" name="btnDel"		value="����"		onClick="Del()"/><!--���� -->
								</td>
							</tr>
	</form>
	<form name="fmb" method="post">
	<input type="hidden" name="sub_mtrl_seq" value="">
							<tr>
								<td class="stitle">���� �μ�ǰ</td>
							</tr>
							<tr>
								<td>
									<ucare:grid id="UCAST021S" width="420" height="190" no="false">
										<tr event="O">
											<td width="80" 	column="mtrl_c_nm" 		title="���籸��"			align="left" ></td>
											<td width="160" column="prdt_nm"		title="��ǰ��"			align="left" ></td>
											<td width="70" column="buy_dt" 			title="��������"			align="center" format="DATE"></td>
											<td width="90" column="buy_amt" 		title="���԰���"			align="right" format="MONEY"></td>

											<td width="60" column="prdt_no" 		title="��ǰ��ȣ"			align="left" hidden="true"></td>
											<td width="60" column="mtrl_mco" 		title="������"			align="left" hidden="true"></td>
											<td width="60" 	column="sub_mtrl_seq" 	title="����μ�ǰ����"	align="center"  hidden="true"></td>
											<td width="60" 	column="mtrl_seq" 		title="�������"			align="center"  hidden="true"></td>
											<td width="60" 	column="mtrl_c_cd" 		title="���籸���ڵ�"		align="center"  hidden="true"></td>
											<td width="60"  column="sub_mtrl_rmk"	title="���"				align="center"  hidden="true"></td>
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
								<td>
									<ucare:table type="detail" width="420">
										<tr>
											<td class="MANTDT" width="80">���籸��</td>
											<td class="MANTDM" width="125">
												<ucare:select name="mtrl_c_cd"  option="-1" brcode="AST001" code="code" codename="codenm"  width="125" styleClass="combo_required" />
											</td>
											<td class="MANTDT" width="80">��ǰ��</td>
											<td class="MANTDM" width="125">
												<input type="text" class="input_required" name="prdt_nm" style="width:125;ime-mode:active;"  maxlength="25">
											</td>
										</tr>
										<tr>
											<td class="MANTDT" >��ǰ��ȣ</td>
											<td class="MANTDM" >
												<input type="text" class="input_text" name="prdt_no" style="width:125;ime-mode:active;"  maxlength="25">
											</td>
											<td class="MANTDT" >������</td>
											<td class="MANTDM" >
												<input type="text" class="input_text" name="mtrl_mco" style="width:125;ime-mode:active;" maxlength="25" >
											</td>
										</tr>
										<tr>
											<td class="MANTDT" >��������</td>
											<td class="MANTDM" >
												<ucare:input type="text" name="buy_dt" width="70" title="��������" format="DATE" pattern="D" required="false" maxlength="10"/>
												<span class=calendar onclick="openCalendar('fmb.buy_dt', fmb.buy_dt.value)"></span>
											</td>
											<td class="MANTDT" >���԰���</td>
											<td class="MANTDM" >
												<input type="text" class="input_number" name="buy_amt" style="width:125;" maxlength="20" onKeyDown="checkOnlyNumber()">
											</td>
										</tr>
										<tr>
											<td class="MANTDT" width="80">���</td>
											<td class="MANTDM" colspan="3">
												<textarea name="sub_mtrl_rmk" class="input_textarea_text"  style="width:335;height:100;ime-mode:active" maxlength="500"></textarea>
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
									<ucare:imgbtn width="70" name="btnAddMB"		value="���"		onClick="AddMB()"/><!-- ��� -->
									<ucare:imgbtn width="70" name="btnSaveMB"		value="����"		onClick="SaveMB()"/><!-- ���� -->
									<ucare:imgbtn width="70" name="btnDelMB"		value="����"		onClick="DelMB()"/><!-- ���� -->
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