<%@ page language="java" contentType="text/html; charset=EUC-KR"%>
<%@ include file="/jsp/include/include.jsp"%>
<html>
<head>
	<title>Ucare Help ī�װ� ����</title>
	<script language="javascript" src="/html/js/system/sysUcareHelpCtgr.js"></script>
</head>
<body topmargin="0" leftmargin="5"  onLoad="init()">
<table width="1225" cellpadding="0" cellspacing="0" border="0">
	<tr>
		<td><ucare:xtitle title="Ucare Help ī�װ� ����"/></td>
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
					<td width="80" align="right">������� :&nbsp;</td>
					<td width="220">
						<ucare:select name="lang_tp_cd"  option="4" brcode="UCR001" code="code" codename="codenm"  width="150" styleClass="combo_required" />
					</td>
					<td width="80" align="right">�˻����� : &nbsp;</td>
					<td width="300">
						<select name="searchType" class="combo_text">
							<option value=""> == ���� == </option>
							<option value="CTGR_NM">ī�װ���</option>
							<option value="CTGR_DESC">ī�װ�����</option>
						</select>
						<input type=text class="input_text" name="searchText" size=15 onkeyup="return(isEnterKey()? queryList():false);" >
					</td>
					<td width="80" align="right">&nbsp;</td>
					<td width="500">
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
	<input type="hidden" name="help_ctgr_seq" value="">
	<tr>
		<td>
			<table width="1225" cellpadding="0" cellspacing="0" border="0">
				<col width="600" />
				<col width="25" />
				<col width="600" />
				<tr>
					<!-- ī�װ� ����Ʈ S -->
					<td valign="top">
						<table width="600" cellpadding="0" cellspacing="0" border="0">
							<tr>
								<td class="stitle">ī�װ� ����Ʈ</td>
							</tr>
							<tr>
								<td>
									<ucare:grid id="UCSYS300S" width="600" height="680" no="false">
										<tr event="O">
											<td width="50" column="help_ctgr_seq" 	title="help_ctgr_seq" hidden="true"></td>
											<td width="50" column="lang_tp_cd" 	title="lang_tp_cd" hidden="true"></td>
											<td width="100" column="ctgr_nm" 	title="ī�װ�"></td>
											<td width="260" column="ctgr_desc" 	title="ī�װ�����"></td>
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
					<!-- ī�װ� ����Ʈ E -->
					<td></td>
					<!-- ī�װ� ������ S -->
					<td valign="top">
						<table width="600" cellpadding="0" cellspacing="0" border="0">
							<tr>
								<td class="stitle">ī�װ� ������</td>
							</tr>
							<tr>
								<td>
									<ucare:table type="detail" width="600">
										<tr>
											<td class="MANTDT" width="100">��� ����</td>
											<td class="MANTDM" width="500" colspan="3">
												<ucare:select name="lang_tp_cd" option="4" brcode="UCR001" code="code" codename="codenm" width="150" styleClass="combo_required" />
											</td>
										</tr>
										<tr>
											<td class="MANTDT">ī�װ���</td>
											<td class="MANTDM" colspan="3">
												<input type=text class="input_required" name="ctgr_nm" required="true" requirednm="ī�װ���" style="width:502;">
											</td>
										</tr>
										<tr>
											<td class="MANTDT" width="100">����</td>
											<td class="MANTDM" width="390" colspan="3">
												<textarea class="input_required" name="ctgr_desc" style="width:502;height:180;"></textarea>
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
									<ucare:imgbtn width="70" name="btnAdd"		kind="A"	onClick="ctgrAdd()"/><!-- ��� -->
									<ucare:imgbtn width="70" name="btnSave"		kind="S"	onClick="ctgrSave()"/><!-- ���� -->
									<ucare:imgbtn width="70" name="btnDel"		kind="D"	onClick="ctgrDel()"/><!-- ���� -->
								</td>
							</tr>
						</table>
					</td>
					<!-- ī�װ� ������ E -->
				</tr>
			</table>
		</td>
	</tr>
	</form>
	<!-- ���� E -->
</table>
</body>
</html>