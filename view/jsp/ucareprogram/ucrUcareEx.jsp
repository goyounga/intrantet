<%@ page language="java" contentType="text/html; charset=EUC-KR"%>
<%@ include file="/jsp/include/include.jsp"%>
<html>
<head>
	<title>Ucare Example</title>
	<script language="javascript" src="/html/js/ucareprogram/ucrUcareEx.js"></script>
	<script language="javascript">
	_editor_url = "/screditor/";
	_userid = "<%=sessioninfo.getUserID()%>";
	UPLOAD_IMG_PATH = "UPLOAD_IMG_PATH";
	UPLOAD_FOLDER_NAME = "";
	</script>
</head>
<body topmargin="0" leftmargin="5"  onLoad="init()">
<table width="1225" cellpadding="0" cellspacing="0" border="0">
	<tr>
		<td height="5"></td>
	</tr>

	<!-- �˻����� S -->
	<form	name="fQuery" method="post">
	<input type="hidden" name="search" value="">
	<tr>
		<td>
			<ucare:table type="query" width="1215">
				<tr>
					<td width="80" align="right">�˻����� :&nbsp;</td>
					<td width="300">
						<select name="searchType" class="combo_text">
							<option value=""> == ���� == </option>
							<option value="EX_NM">������</option>
							<option value="EX_CONT">��������</option>
						</select>
						<input type=text class="input_text" name="searchText" size=30 onkeyup="return(isEnterKey()? queryList():false);" >
					</td>
					<td width="80" align="right">&nbsp;</td>
					<td width="800">
					</td>
					<td width="1" bgcolor=#CCCCCC></td>
					<td width="80" align="right">
						<ucare:imgbtn name="btnQuery"	value="��ȸ"	 onClick="queryList()"/><!-- ��ȸ -->
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
	<input type="hidden" name="ex_seq" value="">
	<tr>
		<td>
			<table width="1225" cellpadding="0" cellspacing="0" border="0">
				<col width="600" />
				<col width="25" />
				<col width="600" />
				<tr>
					<!-- Example ����Ʈ S -->
					<td valign="top">
						<table width="600" cellpadding="0" cellspacing="0" border="0">
							<tr>
								<td class="stitle">Example ����Ʈ</td>
							</tr>
							<tr>
								<td>
									<ucare:grid id="UCUCR303S" width="600" height="720" no="false">
										<tr event="O">
											<td width="50" column="ex_seq" 		title="ex_seq" hidden="true"></td>
											<td width="380" column="ex_nm" 		title="������"></td>
											<td width="260" column="ex_cont" 	title="��������" hidden="true"></td>
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
					<!-- Example ����Ʈ E -->
					<td></td>
					<!-- Example ������ S -->
					<td valign="top">
						<table width="600" cellpadding="0" cellspacing="0" border="0">
							<tr>
								<td class="stitle">Example ������</td>
							</tr>
							<tr>
								<td>
									<ucare:table type="detail" width="600">
										<tr>
											<td class="MANTDT">������</td>
											<td class="MANTDM" colspan="3">
												<input type=text class="input_required" name="ex_nm" required="true" requirednm="������" style="width:502;" maxlength="100">
											</td>
										</tr>
										<tr>
											<td class="MANTDT">��������</td>
											<td class="MANTDM" colspan="3">
												<textarea class="input_required" name="ex_cont" style="width:502;height:560;"></textarea>
												<SCRIPT language=javascript>
													function editor()
													{
														//onload�ÿ� edit�������� ������ �����Ƿ� onload �� ������� ȣ���ؼ� �� ���� �� init2�� ȣ���� �ʱ�ȭ�� �Ѵ�.
														if(editor_generate('ex_cont'))
														{
															init2();
														}
													}
												</SCRIPT>
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
									<ucare:imgbtn name="btnAdd"		value="���"	onClick="exAdd()"/><!-- ��� -->
									<ucare:imgbtn name="btnSave"		value="����"	onClick="exSave()"/><!-- ���� -->
									<ucare:imgbtn name="btnDel"		value="����"	onClick="exDel()"/><!-- ���� -->
								</td>
							</tr>
						</table>
					</td>
					<!-- Example ������ E -->
				</tr>
			</table>
		</td>
	</tr>
	</form>
	<!-- ���� E -->
</table>
</body>
</html>