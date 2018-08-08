<!--
  PROJ : Nexfron Intranet
  NAME : astBookMng.jsp
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
	<script language="javascript" src="/html/js/asset/astBookMng.js"></script>
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
					<td width="80" align="right">������ : &nbsp;</td>
					<td width="115">
						<input type="text" name="book_sbjt" class="input_text" style="width:100" onKeyPress="pressEnter('queryList()')">
					</td>
					<td width="80" align="right">���ǻ� : &nbsp;</td>
					<td width="115">
						<input type="text" name="book_co" class="input_text" style="width:100" onKeyPress="pressEnter('queryList()')">
					</td>
					<td width="80" align="right">���� : &nbsp;</td>
					<td width="115">
						<input type="text" name="book_writ" class="input_text" style="width:100" onKeyPress="pressEnter('queryList()')">
					</td>
					<td width="80" align="right">�뿩���� : &nbsp;</td>
					<td width="115">
						<ucare:select name="rnt_c_cd"  option="10" brcode="COM002" code="code" codename="codenm"  width="60" styleClass="combo_text" />
					</td>
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
	<input type="hidden" name="book_seq" value="">
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
								<td class="stitle">����  ����Ʈ</td>
							</tr>
							<tr>
								<td>
									<ucare:grid id="UCAST010S" width="800" height="730" no="true">
										<tr event="O">
											<td width="242" column="book_sbjt" 		title="��������"			align="left" ></td>
											<td width="150" column="book_co" 		title="���ǻ�"			align="left" ></td>
											<td width="150" column="book_writ"		title="����"				align="center" ></td>
											<td width="70" column="buy_dt" 			title="��������"			align="center" format="DATE"></td>
											<td width="90" column="buy_amt" 		title="���԰���"			align="right" format="MONEY"></td>
											<td width="60" column="rnt_c_cd" 		title="�뿩����"			align="center" ></td>
											<td width="60"  column="book_rmk"		title="���"				align="center" hidden="true"></td>
											<td width="60" 	column="book_seq" 		title="��������"			align="center"  hidden="true"></td>
											<td width="60" 	column="dnat_nm" 		title="������"			align="center"  hidden="true"></td>
											<td width="60" 	column="dnat_id" 		title="������ID"			align="center"  hidden="true"></td>
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
											<td class="MANTDT" width="80">��������</td>
											<td class="MANTDM" width="335" colspan="3">
												<input type=text class=input_required  name="book_sbjt" style="width:335;ime-mode:active" maxlength="100">
											</td>
										</tr>
										<tr>
											<td class="MANTDT" width="80">���ǻ�</td>
											<td class="MANTDM" width="125">
												<input type="text" class="input_text" name="book_co" style="width:125;ime-mode:active;"  maxlength="25">
											</td>
											<td class="MANTDT" width="80">����</td>
											<td class="MANTDM" width="125">
												<input type="text" class="input_text" name="book_writ" style="width:125;ime-mode:active;"  maxlength="25">
											</td>
										</tr>
										<tr>
											<td class="MANTDT" >��������</td>
											<td class="MANTDM" >
												<ucare:input type="text" name="buy_dt" width="95" title="��������" format="DATE" pattern="D" required="false" maxlength="10"/>
												<span class=calendar onclick="openCalendar('f.buy_dt', f.buy_dt.value)"></span>
											</td>
											<td class="MANTDT" >���԰���</td>
											<td class="MANTDM" >
												<input type="text" class="input_number" name="buy_amt" style="width:125;" maxlength="20" onKeyDown="checkOnlyNumber()">
											</td>
										</tr>
										<tr>
											<td class="MANTDT" >������</td>
											<td class="MANTDM" colspan="3">
												<input type="text" name="dnat_id" readOnly class="input_readonly" style="width:80;">
												<input type="text" name="dnat_nm" readOnly class="input_readonly" style="width:80;">
												<span class="search" onClick="openUserOrg(f)"></span>
												<span class="minus" onClick="del_userID(f);"></span>
											</td>
										</tr>
										<tr>
											<td class="MANTDT" width="80">���</td>
											<td class="MANTDM" colspan="3">
												<textarea name="book_rmk" class="input_textarea_text"  style="width:335;height:118;ime-mode:active" maxlength="500"></textarea>
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
	<input type="hidden" name="book_rnt_hst_seq" value="">
							<tr>
								<td class="stitle">���� �뿩 ����</td>
							</tr>
							<tr>
								<td>
									<ucare:grid id="UCAST011S" width="420" height="225" no="false">
										<tr event="O">
											<td width="66" 	column="rnt_nm"			title="�뿩��"			align="center" ></td>
											<td width="70" 	column="rnt_dt" 		title="�뿩����"			align="center" format="DATE"></td>
											<td width="70" 	column="rtn_dt" 		title="�ݳ�����"			align="center" format="DATE"></td>
											<td width="195" column="rnt_rmk" 		title="���"				align="left"></td>
											
											<td width="60" 	column="book_seq" 		title="��������"			align="center"  hidden="true"></td>
											<td width="60" 	column="book_rnt_hst_seq" 		title="�����뿩��������"			align="center"  hidden="true"></td>
											<td width="60" 	column="rnt_id" 		title="�뿩��ID"			align="center"  hidden="true"></td>
											<td width="60" 	column="rg_dt" 			title="�������"			align="center"  hidden="true"></td>
											<td width="60" 	column="rg_tm" 			title="��Ͻð�"			align="center"  hidden="true"></td>
											<td width="60" 	column="rg_id" 			title="�����ID"			align="center"  hidden="true"></td>
											<td width="60" 	column="rg_nm" 			title="�����"			align="center"  hidden="true"></td>
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
											<td class="MANTDT" >�뿩��</td>
											<td class="MANTDM" colspan="3">
												<input type="text" name="rnt_id" readOnly class="input_readonly" style="width:80;">
												<input type="text" name="rnt_nm" readOnly class="input_readonly" style="width:80;">
												<span class="search" onClick="openUserOrg(fmb)"></span>
												<span class="minus" onClick="del_userID(fmb);"></span>
											</td>
										</tr>
										<tr>
											<td class="MANTDT" >�뿩����</td>
											<td class="MANTDM" colspan="3">
												<ucare:select name="rnt_c_cd"  option="-1" brcode="COM002" code="code" codename="codenm"  width="95" styleClass="combo_text" />
											</td>
										</tr>
										<tr>
											<td class="MANTDT" width="80">�뿩����</td>
											<td class="MANTDM" width="125">
												<ucare:input type="text" name="rnt_dt" width="95" title="�뿩����" format="DATE" pattern="D" required="false" maxlength="10"/>
												<span class=calendar onclick="openCalendar('fmb.rnt_dt', fmb.rnt_dt.value)"></span>
											</td>
											<td class="MANTDT" width="80">�ݳ�����</td>
											<td class="MANTDM" width="125">
												<ucare:input type="text" name="rtn_dt" width="95" title="�ݳ�����" format="DATE" pattern="D" required="false" maxlength="10"/>
												<span class=calendar onclick="openCalendar('fmb.rtn_dt', fmb.rtn_dt.value)"></span>
											</td>
										</tr>
										<tr>
											<td class="MANTDT" width="80">���</td>
											<td class="MANTDM" colspan="3">
												<textarea name="rnt_rmk" class="input_textarea_text"  style="width:335;height:100;ime-mode:active" maxlength="500"></textarea>
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