<%@ page language="java" contentType="text/html; charset=EUC-KR"%>
<%@ include file="/jsp/include/include.jsp"%>
<html>
<head>
	<title>�ڷ��</title>
	<script language="javascript" src="/html/js/system/sysDataList.js"></script>
</head>
<body topmargin="0" leftmargin="5"  onLoad="init()">
<table width="1225" cellpadding="0" cellspacing="0" border="0">
	<tr>
		<td><ucare:xtitle title="�ڷ��"/></td>
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
					<td width="80" align="right">�˻����� : &nbsp;</td>
					<td width="200">
						<select name="searchType" class="combo_text">
							<option value=""> == ���� == </option>
							<option value="B.USER_ID">�����ID</option>
							<option value="B.USER_NM">����ڸ�</option>
							<option value="A.DATA_SBJT">����</option>
							<option value="A.ATCH_FILE_NM">���ϸ�</option>
						</select>
						<input type=text class="input_text" name="searchText" size=15 onkeyup="return(isEnterKey()? queryList():false);" >
					</td>
					<td width="80" align="right">&nbsp;</td>
					<td width="800">
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
	<input type="hidden" name="data_seq" value="">
	<input type="hidden" name="file_nm">
	<tr>
		<td>
			<table width="1225" cellpadding="0" cellspacing="0" border="0">
				<col width="600" />
				<col width="25" />
				<col width="600" />
				<tr>
					<!-- �ڷ� ����Ʈ S -->
					<td valign="top">
						<table width="600" cellpadding="0" cellspacing="0" border="0">
							<tr>
								<td class="stitle">�ڷ� ����Ʈ</td>
							</tr>
							<tr>
								<td>
									<ucare:grid id="UCSYS216S" width="600" height="680" no="false">
										<tr event="O">
											<td width="50" column="data_seq" 	title="data_seq" hidden="true"></td>
											<td width="160" column="data_sbjt" 	title="�ڷ�����"></td>
											<td width="200" column="atch_file_nm" 	title="���ϸ�"></td>
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
					<!-- �ڷ� ����Ʈ E -->
					<td></td>
					<!-- �ڷ� ���� S -->
					<td valign="top">
						<table width="600" cellpadding="0" cellspacing="0" border="0">
							<tr>
								<td class="stitle">�ڷ� ������</td>
							</tr>
							<tr>
								<td>
									<ucare:table type="detail" width="600">
										<tr>
											<td class="MANTDT">�ڷ�����</td>
											<td class="MANTDM" colspan="3">
												<input type=text class="input_required" name="data_sbjt" required="true" requirednm="�ڷ�����" style="width:502;">
											</td>
										</tr>
										<tr>
											<td class="MANTDT" width="100">����</td>
											<td class="MANTDM" width="245" colspan="2">
												<iframe name="iUpload" height="25" width="245" src="/jsp/common/upload.jsp?file_path=UPLOAD_PATH" frameborder="0"></iframe>
											</td>
											<td class="MANTDM">
												<span id="file_span" style="display:none;">
													<span width ="100" style="cursor:hand" onClick="openFile()">
														<font color="blue" id=atch_file_nm></font>
													</span>&nbsp;
													<span style="cursor:hand" onClick="delFile()">
														<font color="red"><B>x</B></font>
													</span>
												</span>
												<span id="nbsp_span">&nbsp;</span>
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
									<ucare:imgbtn width="70" name="btnAdd"		kind="A"	onClick="dataAdd()"/><!-- ��� -->
									<ucare:imgbtn width="70" name="btnSave"		kind="S"	onClick="dataSave()"/><!-- ���� -->
									<ucare:imgbtn width="70" name="btnDel"		kind="D"	onClick="dataDel()"/><!-- ���� -->
								</td>
							</tr>
						</table>
					</td>
					<!-- �ڷ� ���� E -->
				</tr>
			</table>
		</td>
	</tr>
	</form>
	<!-- ���� E -->
</table>
</body>
</html>