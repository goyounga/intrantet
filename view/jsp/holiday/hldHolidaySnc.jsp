<!--
  PROJ   : Nexfron Intranet
  NAME   : hldHolidaySnc.jsp
  DESC   : �ް����� ȭ��
  Author : ��â�� ����
  VER    : 1.0
  Copyright 2009 Nexfron All rights reserved
  ============================================================================================
  								��		��		��		��
  ============================================================================================
  VERSION		DATE		AUTHOR		DESCRIPTION
  ============================================================================================
  1.0		2009.06.18		��â��		�����ۼ�
  1.1		2009.08.14		������		�ּ��߰�
  -->
<%@ page language="java" contentType="text/html; charset=EUC-KR"%>
<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=EUC-KR">
	<title>�ް�����</title>
	<%@ include file="/jsp/include/include.jsp"%>
	<script language="javascript" src="/html/js/holiday/hldHolidaySnc.js"></script>
	<link rel="stylesheet" href = "/html/style/ucareStyle.css" type = "text/css">
</head>
<body class="mainbody" onLoad="on_Load();">
<table border="0" cellpadding="0" cellspacing="0" width="100%" bordercolor="red">
	<tr>
		<td class="hmargin5"></td>
	</tr>
 	<tr>
		<td>
			<form name="fQuery" >
			<input type="hidden" name="q_bse_y" 	value="">
			<input type="hidden" name="q_user_id" 	value="<%=sessioninfo.getUserID()%>">
			<input type="hidden" name="q_sign_id" 	value="">
			<input type="hidden" name="gradecd" 	value="<%=sessioninfo.getUserGradeCD()%>">
				<table class="tblSearch" width="100%">
					<col width="70"	/>
					<col width="210"/>
					<col width="70"	/>
					<col width="105"/>
					<col width="70"	/>
					<col width="145"/>
					<col width="70"	/>
					<col width="105"/>
					<col width="70"	/>
					<col width="130"/>
					<col width=""/>
					<tr>
						<th>��ȸ�Ⱓ</th>
						<td>
							<ucare:input type="text" name="q_date_from" width="70" title="��ȸ����" format="DATE" value="<%=CUtil.getMyDate(-3, \"yyyy-MM-dd\")%>" pattern="D" required="false" requirednm="������" maxlength="10" tag="onKeyUp=\"pressEnter('searchSignList()')\""/>
							<span class=calendar onclick="openCalendar('fQuery.q_date_from' , fQuery.q_date_from.value)"></span>
							&nbsp;~&nbsp;
							<ucare:input type="text" name="q_date_to" width="70" title="��ȸ����" format="DATE" value="<%=CUtil.getCurrDate(\"yyyy-MM-dd\")%>" pattern="D" required="false" requirednm="������" maxlength="10" tag="onKeyUp=\"pressEnter('searchSignList()')\""/>
							<span class=calendar onclick="openCalendar('fQuery.q_date_to' , fQuery.q_date_to.value)"></span>
						</td>
						<th>������</th>
						<td><ucare:select name="q_sign_obj" brcode="SYS022" width="100" option="10" styleClass="combo_required" selCode="01"/></td>
						<th>�������</th>
						<td><ucare:select name="q_sign_prgs_stts_cd" brcode="SYS019" option="10" width="140"/></td>
						<th>�ް�����</th>
						<td><ucare:select name="q_hldy_knd_seq" queryid="UCHLD000S" code="code" codename="codenm" option="10" width="100" styleClass="combo_text"/></td>
						<th>��û��</th>
						<td>
							<input type="hidden" name="q_hldy_id">
							<input type="text" class="frm_readonly" name="q_hldy_nm"" style="width:75" readOnly>
							<span id="btnUserId" class=search onClick="openUserOrg();"></span>
							<span class="clear" onClick="clearUser();" style="background:url('/html/images/icon/icon_scissors.gif') no-repeat left top;margin:0 2 0 2;width:19px;height:19px;cursor:hand;"></span>
						</td>
		 				<td class="rbtn">
		 					<ucare:imgbtn name="btnQuery" value="��ȸ" width="50" onClick="searchSignList()"/>
		 					<ucare:imgbtn name="btnInit" value="�ʱ�ȭ" width="60" onClick="on_Init()"/>
		 				</td>
		 			</tr>
				</table>
			</form>
		</td>
	</tr>
	<tr>
		<td class="hmargin"></td>
	</tr>
	<tr>
		<td>
			<table border="0" cellpadding="0" cellspacing="0" >
				<tr>
					<td valign="top">
						<table border="0" cellpadding="0" cellspacing="0">
							<form name="f" method="post">
							<tr>
								<td class="stitle">�ް���û����</td>
							</tr>
							<tr>
								<td>
									<ucare:grid id="UCHLD030S" width="950" height="452" no="true">
										<tr event="O">
											<td width="30" 	column="alnc"				title="����" 			align="center"	format="CHECKBOX" editable="true" sortable="false"></td>
											<td width="30" 	column="rtn"				title="�ݷ�" 			align="center"	format="CHECKBOX" editable="true" sortable="false"></td>
											<td width="0"   column="bse_y"				title="���س⵵" 		align="center" format="COMBO" brcode="HLD002"></td>
											<td width="80"	column="rg_dt"				title="��û����"		align="center" format="DATE"></td>
											<td width="70"	column="hldy_nm"			title="��û��"			align="center"></td>
											<td width="100"	column="hldy_knd_seq"		title="�ް�����"		align="center" format="COMBO" queryid="UCHLD000S"></td>
										    <td width="80"	column="st_dt"				title="�ް�������"		align="center" format="DATE"></td>
										    <td width="80"	column="end_dt"				title="�ް�������"		align="center" format="DATE"></td>
										    <td width="35"	column="hldy_dy"			title="�ϼ�"			align="right"></td>
										    <td width="115" column="sign_prgs_stts_cd"	title="�������"		align="center" format="COMBO" brcode="SYS019"></td>
										    <td width="70"	column="rtn_f_cd"			title="�ݷ�����"		align="center"></td>
										    <td width="70"	column="sign_nm"			title="�����ڸ�"		align="center"></td>
										    <td width="70"	column="sign_stg_cd"		title="����ܰ�"		align="center" format="COMBO" brcode="SYS018"></td>
										    <td width="80"	column="now_sign_stg"		title="�������ܰ�"	align="center"></td>
										    <td width="0"	column="now_sign_stg_cd"	title="�������ܰ��ڵ�" align="center" hidden="true"></td>

										    <td width="0" 	column="hldy_plc"			hidden="true"></td>
										    <td width="0" 	column="cntc_tel_no"		hidden="true"></td>
										    <td width="0" 	column="hldy_knd_nm"		hidden="true"></td>
										    <td width="0"	column="hldy_rsn" 			hidden="true"></td>
										    <td width="0"	column="hldy_rmk" 			hidden="true"></td>
										    <td width="0"	column="hldy_seq" 			hidden="true"></td>
										    <td width="0"	column="hldy_id" 			hidden="true"></td>

										    <td width="0"	column="sign_stg_nm" 		hidden="true"></td>
										    <td width="0"	column="sign_prgs_stts_nm" 	hidden="true"></td>
										    <td width="0"	column="sign_rsn" 			hidden="true"></td>
										 </tr>
									</ucare:grid>
								</td>
							</tr>
							</form>
							<tr>
								<td class="hmargin"></td>
							</tr>
							<form name="f0" method="post">
							<input type="hidden" name="q_bse_y">
							<input type="hidden" name="q_userid">
							<tr>
								<td class="stitle">���κ� �ް� ����</td>
							</tr>
							<tr>
								<td>
									<table class="tblData" width="950">
										<col width="100"/>
										<col width="130"/>
										<col width="100"/>
										<col width="130"/>
										<col width="100"/>
										<col width="130"/>
										<col width="100"/>
										<col width=""/>
										<tr>
											<th>���س⵵</td>
											<td><input type="text" name="bse_y_nm" class="input_transparent" style="width:100%;" readonly></td>
											<th>�ް������ϼ�</td>
											<td><input type="text" name="pmt_dy" class="input_transparent" style="width:100%;" readonly></td>
											<th>�ް��ѻ���ϼ�</td>
											<td><input type="text" name="use_dy" class="input_transparent" style="width:100%;" readonly></td>
											<th>�ް��ܿ��ϼ�</td>
											<td><input type="text" name="rmn_dy" class="input_transparent" style="width:100%;" readonly></td>
										</tr>
									</table>
								</td>
							</tr>
							<tr><td class="hmargin5"></td></tr>
							<tr>
								<td>
									<ucare:grid id="UCHLD032S" width="950" height="220" no="true">
										<tr event="">
											<td width="60"	column="bse_y"				title="���س⵵"	align="center" format="COMBO" brcode="HLD002"></td>
											<td width="80"	column="rg_dt"				title="��û����"	align="center" format="DATE"></td>
											<td width="80"	column="hldy_nm"			title="��û��"		align="center"></td>
											<td width="100"	column="hldy_knd_seq"		title="�ް�����"	align="center" format="COMBO" queryid="UCHLD000S"></td>
										    <td width="80"	column="st_dt"				title="�ް�������"	align="center" format="DATE"></td>
										    <td width="80"	column="end_dt"				title="�ް�������"	align="center" format="DATE"></td>
										    <td width="40"	column="hldy_dy"			title="�ϼ�"		align="right"></td>
										    <td width="160" column="hldy_plc"			title="�༱��"		align="left"></td>
										    <td width="90"  column="cntc_tel_no"		title="����ó"		align="center"></td>
										    <td width="140" column="sign_prgs_stts_cd"	title="�������"	align="center" format="COMBO" brcode="SYS019"></td>
										    <td width="60" 	column="rtn_f_cd"			title="�ݷ�����"	align="center"></td>
										    <td width="200"	column="hldy_rsn" 			title="����"		align="left"></td>
										    <td width="200"	column="hldy_rmk" 			title="���"		align="left"></td>

										    <td width="0"	column="hldy_seq" 	hidden="true"></td>
										    <td width="0"	column="hldy_id" 	hidden="true"></td>
										 </tr>
									</ucare:grid>
								</td>
							</tr>
							</form>
						</table>
					</td>
					<td class="wmargin5"></td>
					<td valign="top">
						<form name="f1" method="post">
						<input type="hidden" name="user_id" value="<%=sessioninfo.getUserID()%>">
						<input type="hidden" name="bse_y">
						<input type="hidden" name="hldy_seq">
						<input type="hidden" name="hldy_id">
						<input type="hidden" name="hldy_knd_seq">
						<input type="hidden" name="sign_prgs_stts_cd">
						<input type="hidden" name="sign_stg_cd">
						<input type="hidden" name="alnc_rtn">
						<table border="0" cellpadding="0" cellspacing="0">
							<tr>
								<td class="stitle">������</td>
							</tr>
							<tr>
								<td>
									<table class="tblData" width="283">
										<col width="80"	/>
										<col width=""	/>
										<tr>
											<th>���س⵵</th>
											<td><input type="text" name="bse_y_nm" class="input_transparent" style="width:100%;" readonly></td>
										</tr>
										<tr>
											<th>��û��</th>
											<td><input type="text" name="hldy_nm" class="input_transparent" style="width:100%;" readonly></td>
										</tr>
										<tr>
											<th>��û����</th>
											<td><input type="text" name="rg_dt" format="DATE" class="input_transparent" style="width:100%;" readonly></td>
										</tr>
										<tr>
											<th>�������</th>
											<td><input type="text" name="sign_prgs_stts_nm" class="input_transparent" style="width:100%;" readonly></td>
										</tr>
										<tr>
											<th>�ް��ϼ�</th>
											<td><input type="text" name="hldy_dy" class="input_transparent" style="width:100%;" readonly></td>
										</tr>
										<tr>
											<th>�ް�����</th>
											<td><input type="text" name="hldy_knd_nm" class="input_transparent" style="width:100%;" readonly></td>
										</tr>
										<tr>
											<th>��������</th>
											<td><input type="text" name="st_dt" format="DATE" class="input_transparent" style="width:100%;" readonly></td>
										</tr>
										<tr>
											<th>��������</th>
											<td><input type="text" name="end_dt" format="DATE" class="input_transparent" style="width:100%;" readonly></td>
										</tr>
										<tr>
											<th>����ó</th>
											<td><input type="text" name="cntc_tel_no" format="TEL" class="input_transparent" style="width:100%;" readonly></td>
										</tr>
										<tr>
											<th>�༱��</th>
											<td><input type="text" name="hldy_plc" class="input_transparent" style="width:100%;" readonly></td>
										</tr>
										<tr>
											<th>������</th>
											<td><input type="text" name="sign_nm" class="input_transparent" style="width:100%;" readonly></td>
										</tr>
										<tr>
											<th>����ܰ�</th>
											<td><input type="text" name="sign_stg_nm" class="input_transparent" style="width:100%;" readonly></td>
										</tr>
										<tr>
											<th>�������ܰ�</th>
											<td><input type="text" name="now_sign_stg" class="input_transparent" style="width:100%;" readonly></td>
										</tr>
										<tr>
											<th>�ް�����</th>
											<td><textarea name="hldy_rsn"  class="input_textarea_readonly" style="width:100%;height:170px;" maxlength="500" readonly></textarea></td>
										</tr>
										<tr>
											<th>���</th>
											<td><textarea name="hldy_rmk"  class="input_textarea_required" style="width:100%;height:206px;" maxlength="500"></textarea></td>
										</tr>
									</table>
								</td>
							</tr>
							<tr><td class="hmargin5"></td></tr>
						</table>
						<table class="tbl_button" align="right">
							<tr>
								<td><ucare:imgbtn name="btnSave" kind="S" width="60" onClick="saveSign()"/></td>
							</tr>
						</table>
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