<%@ page language="java" contentType="text/html; charset=EUC-KR"%>
<%@ include file="/jsp/include/include.jsp"%>
<html>
<head>
	<title>�Խ��� ����</title>
	<script language="javascript" src="/html/js/system/sysBoardMng.js"></script>
</head>
<body topmargin="0" leftmargin="5"  onLoad="init()">
<table width="1225" cellpadding="0" cellspacing="0" border="0">
	<tr>
		<td><ucare:xtitle title="�Խ��� ����"/></td>
	</tr>
	<tr>
		<td height="5"></td>
	</tr>

	<!-- �˻����� S -->
	<form	name="fQuery" method="post">
	<tr>
		<td>
			<ucare:table type="query" width="1215">
				<tr>
					<td width="80" align="right">�Խ������� :&nbsp;</td>
					<td width="220" >
						<ucare:select name="board_knd_cd"  option="10" brcode="COM009" code="code" codename="codenm"  width="150" styleClass="combo_text" />
					</td>
					<td width="80" align="right">�Խ��Ǹ� : &nbsp;</td>
					<td>
						<input type="text" name="board_nm" class="input_text" style="width:150" onKeyPress="checkKeyPress()">
					</td>
					<td width="1" bgcolor=#CCCCCC></td>
					<td width="80" align="right">
						<ucare:imgbtn width="70" name="btnQuery"	kind="R"	 onClick="queryList()"/><!-- ��ȸ -->
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
	<input type="hidden" name="board_tp_seq" value="">
	<tr>
		<td>
			<table width="1225" cellpadding="0" cellspacing="0" border="0">
				<col width="600" />
				<col width="25" />
				<col width="600" />
				<tr>
					<!-- �Խ��Ǹ���Ʈ S -->
					<td valign="top">
						<table width="600" cellpadding="0" cellspacing="0" border="0">
							<tr>
								<td class="stitle">�Խ��� ����Ʈ</td>
							</tr>
							<tr>
								<td>
									<ucare:grid id="UCSYS210S" width="600" height="680" no="false">
										<tr event="O">
											<td width="50" column="board_tp_seq" 	title="board_tp_seq" hidden="true"></td>
											<td width="50" column="board_knd_cd" 	title="board_knd_cd" hidden="true"></td>
											<td width="100" column="board_knd" 	title="�Խ�������"></td>
											<td width="200" column="board_nm" 	title="�Խ��Ǹ�"></td>
											<td width="60" 	column="use_f" 		title="��뿩��"	align="center"></td>
											<td width="80" column="rg_nm" 		title="�����"		align="center"></td>
											<td width="120" column="rg_dtm" 	title="����Ͻ�"	align="center"></td>
											<td width="60" 	column="mdf_nm" 	title="mdf_nm"		align="center"  hidden="true"></td>
											<td width="60" 	column="mdf_dtm" 	title="mdf_dtm"		align="center"  hidden="true"></td>
										</tr>
									</ucare:grid>
								</td>
							</tr>
						</table>
					</td>
					<!-- �Խ��Ǹ���Ʈ E -->
					<td></td>
					<!-- �Խ������� S -->
					<td valign="top">
						<table width="600" cellpadding="0" cellspacing="0" border="0">
							<tr>
								<td class="stitle">�Խ��� ������</td>
							</tr>
							<tr>
								<td>
									<ucare:table type="detail" width="600">
										<tr>
											<td class="MANTDT" width="100">�Խ��� ����</td>
											<td class="MANTDM" width="500" colspan="3">
												<ucare:select name="board_knd_cd" option="4" brcode="COM009" code="code" codename="codenm" width="150" styleClass="combo_required" />
											</td>
										</tr>
										<tr>
											<td class="MANTDT">�Խ��Ǹ�</td>
											<td class="MANTDM" colspan="3">
												<input type=text class="input_required" name="board_nm" required="true" requirednm="�Խ��Ǹ�" style="width:502;">
											</td>
										</tr>
										<tr>
											<td class="MANTDT">��뿩��</td>
											<td class="MANTDM" colspan="3">
												<ucare:select name="use_f"  option="4" brcode="COM002" code="code" codename="codenm"  width="150" styleClass="combo_required" />
											</td>
										</tr>
										<tr>
											<td class="MANTDT">�����</td>
											<td class="MANTDM" width="200">
												<input type=text class=input_readonly readonly name="rg_nm" style="width:197;">
											</td>
											<td class="MANTDT" width="100">����Ͻ�</td>
											<td class="MANTDM" width="200">
												<input type=text class=input_readonly readonly name="rg_dtm" style="width:197;">
											</td>
										</tr>
										<tr>
											<td class="MANTDT">������</td>
											<td class="MANTDM">
												<input type=text class=input_readonly readonly name="mdf_nm" style="width:197;">
											</td>
											<td class="MANTDT">�����Ͻ�</td>
											<td class="MANTDM">
												<input type=text class=input_readonly readonly name="mdf_dtm" style="width:197;">
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
									<ucare:imgbtn width="70" name="btnAdd"		kind="A"	onClick="boardAdd()"/><!-- ��� -->
									<ucare:imgbtn width="70" name="btnSave"		kind="S"	onClick="boardsave()"/><!-- ���� -->
									<ucare:imgbtn width="70" name="btnDel"		kind="D"	onClick="boarddel()"/><!-- ���� -->
								</td>
							</tr>
							<tr>
								<td class="stitle">���� �ο��� ����ڵ�� ����Ʈ</td>
							</tr>
							<tr>
								<td>
									<ucare:grid id="UCSYS211S" width="600" height="220" no="false" crud="true">
										<tr>
											<td width="50"	column="chk"		title="����"		format="CHECKBOX" hcheckbox="true" editable="true"></td>
											<td width="50"	column="obj_grd_cd"	title="obj_grd_cd" hidden="true"></td>
											<td width="280"	column="grade"	title="���"	align="center"></td>
											<td width="80"	column="r_auth_f" 	title="�б�"	 	format="CHECKBOX" hcheckbox="false" editable="false"></td>
											<td width="80"	column="w_auth_f" 	title="����" 		format="CHECKBOX" hcheckbox="true"  editable="true"></td>
										</tr>
									</ucare:grid>
								</td>
							</tr>
							<tr>
								<td height="5"></td>
							</tr>
							<tr>
								<td>
									<table width="600" cellpadding="0" cellspacing="0" border="0">
										<tr>
											<td width="500" align="center">			
												<span class="up" onclick="moveRow('UCSYS212S', 'UCSYS211S')"></span>
												&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
												&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
												<span class="down" onclick="moveRow('UCSYS211S', 'UCSYS212S')"></span>
											</td>
											<td align="right">
												<ucare:imgbtn width="70" name="btnSave"		kind="S"	onClick="authSave()"/><!-- ���� -->
											</td>
										</tr>
									</table>
								</td>
							</tr>
							<tr>
								<td class="stitle">���� �ο� �ȵ� ����ڵ�� ����Ʈ</td>
							</tr>
							<tr>
								<td>
									<ucare:grid id="UCSYS212S" width="600" height="220" no="false">
										<tr>
											<td width="50"	column="chk"			title="����"		format="CHECKBOX" hcheckbox="true" editable="true"></td>
											<td width="50"	column="obj_grd_cd"	title="obj_grd_cd" hidden="true"></td>
											<td width="280"	column="grade"	title="���"	align="center"></td>
											<td width="80"	column="r_auth_f" 		title="�б�"	 	format="CHECKBOX" hcheckbox="true" editable="true"></td>
											<td width="80"	column="w_auth_f" 		title="����" 		format="CHECKBOX" hcheckbox="true" editable="true"></td>
										</tr>
									</ucare:grid>
								</td>
							</tr>
						</table>
					</td>
					<!-- �Խ������� E -->
				</tr>
			</table>
		</td>
	</tr>
	</form>
	<!-- ���� E -->
</table>
</body>
</html>