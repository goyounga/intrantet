<%@ page language="java" contentType="text/html; charset=EUC-KR"%>
<%@ include file="/jsp/include/include.jsp"%>
<html>
<head>
	<title>������ƮQ&A</title>
	<script language="javascript" src="/html/js/project/prjQAMng.js"></script>
</head>
<body topmargin="0" leftmargin="5"  onLoad="init()">
<table width="1225" cellpadding="0" cellspacing="0" border="0" bordercolor="red">
	<tr>
		<td height="5"></td>
	</tr>
	<!-- �˻����� S -->
	<form	name="fQuery" method="post">
	<input type="hidden" name="prj_seq" value="">
	<tr>
		<td>
			<ucare:table type="query" width="1215">
				<tr>
					<td width="80" align="right">������Ʈ :&nbsp;</td>
					<td width="230">
						<input type="text" name="prj_nm" readOnly class="input_readonly" style="width:180;">
						<span class="search" onClick="openProject(fQuery)"></span>
						<span class="minus" onClick="del_Project(fQuery);"></span>
					</td>
					<td width="80" align="right">�ڷ����� :&nbsp;</td>
					<td width="200">
						<ucare:select name="qst_tp_cd"  option="10" brcode="COM010" code="code" codename="codenm"  width="150" styleClass="combo_text" />
					</td>
					<td width="80" align="right">�ڷ᳻�� :&nbsp;</td>
					<td>
						<input type="text" name="qst_cont" class="input_text" style="width:200" onKeyPress="checkKeyPress()">
					</td>
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
	<input type="hidden" name="qst_seq" value="">
	<input type="hidden" name="anw_seq" value="">
	<input type="hidden" name="prj_seq" value="">

	<input type="hidden" name="up_seq" value="">
	<input type="hidden" name="prg_id" value="PRJ_QNA">
	<input type="hidden" name="file_nm" value="">
	<input type="hidden" name="new_file_nm" value="">
	<tr>
		<td>
			<table width="1225" cellpadding="0" cellspacing="0" border="0">
				<col width="600" />
				<col width="25" />
				<col width="600" />
				<tr>
					<!-- ���� S -->
					<td valign="top">
						<table width="600" cellpadding="0" cellspacing="0" border="0">
							<tr>
								<td class="stitle">������Ʈ �ڷ� ���</td>
							</tr>
							<tr>
								<td>
									<ucare:grid id="UCPRJ218S" width="600" height="320" no="false">
										<tr event="O">
											<td width="50" column="qst_seq" 		title="qst_seq" 	hidden="true"></td>
											<td width="50" column="prj_seq" 		title="prj_seq" 	hidden="true"></td>
											<td width="110" column="prj_nm" 		title="������Ʈ" 	align="left"></td>
											<td width="80" column="qst_tp" 			title="�ڷ�����"		align="center"></td>
											<td width="80" column="qst_tp_cd" 		title="qst_tp_cd" 	hidden="true"></td>
											<td width="220" column="qst_cont" 		title="�ڷ᳻��"	></td>
											<td width="50" column="q_rg_nm" 		title="�����"		align="center"></td>
											<td width="120" column="q_rg_dtm" 		title="����Ͻ�"	align="center"></td>
											<td width="60" 	column="q_mdf_nm" 		title="mdf_nm"		align="center"  hidden="true"></td>
											<td width="60" 	column="q_mdf_dtm" 		title="mdf_dtm"		align="center"  hidden="true"></td>
										</tr>
									</ucare:grid>
								</td>
							</tr>
							<tr>
								<td height="5"></td>
							</tr>
							<tr>
								<td class="stitle">������Ʈ �ڷ� ������</td>
							</tr>
							<tr>
								<td>
									<ucare:table type="detail" width="600">
										<tr>
											<td class="MANTDT" width="100">�ڷ᳻��</td>
											<td class="MANTDM" colspan="3">
												<textarea name="qst_cont" class="input_required" required="true" requirednm="��������" style="width:503;height:185;ime-mode:active" maxlength="500"></textarea>
											</td>
										</tr>
										<tr>
											<td width=600 colspan="4">
												<jsp:include page="/jsp/common/comUploadForm.jsp" flush="true">
													<jsp:param name="title_width"			value="88"/>
													<jsp:param name="fileBox_width"			value="488"/>
													<jsp:param name="fileListBox_width"		value="510"/>
													<jsp:param name="fileListBox_height"	value="80"/>
												</jsp:include>
											</td>
										</tr>
										<tr>
											<td class="MANTDT">������Ʈ</td>
											<td class="MANTDM">
												<input type="text" name="prj_nm" readOnly class="input_readonly" style="width:150;">
												<span class="search" onClick="openProject(f)"></span>
												<span class="minus" onClick="del_Project(f);"></span>
											</td>
											<td class="MANTDT">�ڷ�����</td>
											<td class="MANTDM">
												<ucare:select name="qst_tp_cd" option="4" brcode="COM010" code="code" codename="codenm"  width="197" styleClass="combo_required" />
											</td>
										</tr>
										<tr>
											<td class="MANTDT">�����</td>
											<td class="MANTDM" width="200">
												<input type=text class=input_readonly readonly name="q_rg_nm" style="width:197;">
											</td>
											<td class="MANTDT" width="100">����Ͻ�</td>
											<td class="MANTDM" width="200">
												<input type=text class=input_readonly readonly name="q_rg_dtm" style="width:197;">
											</td>
										</tr>
										<tr>
											<td class="MANTDT">������</td>
											<td class="MANTDM">
												<input type=text class=input_readonly readonly name="q_mdf_nm" style="width:197;">
											</td>
											<td class="MANTDT">�����Ͻ�</td>
											<td class="MANTDM">
												<input type=text class=input_readonly readonly name="q_mdf_dtm" style="width:197;">
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
									<ucare:imgbtn width="70" name="btnQstAdd"		value="���"	onClick="qstAdd()"/><!-- ��� -->
									<ucare:imgbtn width="70" name="btnQstSave"		value="����"	onClick="qstSave()"/><!-- ���� -->
									<ucare:imgbtn width="70" name="btnQstDel"		value="����"	onClick="qstDel()"/><!-- ���� -->
								</td>
							</tr>
						</table>
					</td>
					<!-- ���� E -->
					<td></td>
					<!-- �亯 S -->
					<td valign="top">
						<table width="600" cellpadding="0" cellspacing="0" border="0">
							<tr>
								<td class="stitle">�ڷῡ ���� ���</td>
							</tr>
							<tr>
								<td>
									<ucare:grid id="UCPRJ219S" width="600" height="320" no="false">
										<tr event="O">
											<td width="50" column="anw_seq" 	title="anw_seq" hidden="true"></td>
											<td width="410" column="anw_cont"	title="��۳���"></td>
											<td width="50" column="a_rg_nm" 	title="�����"		align="center"></td>
											<td width="120" column="a_rg_dtm" 	title="����Ͻ�"	align="center"></td>
											<td width="60" 	column="a_mdf_nm" 	title="mdf_nm"		align="center"  hidden="true"></td>
											<td width="60" 	column="a_mdf_dtm" 	title="mdf_dtm"		align="center"  hidden="true"></td>
										</tr>
									</ucare:grid>
								</td>
							</tr>
							<tr>
								<td height="5"></td>
							</tr>
							<tr>
								<td class="stitle">��� ������</td>
							</tr>
							<tr>
								<td>
									<ucare:table type="detail" width="600">
										<tr>
											<td class="MANTDT">��۳���</td>
											<td class="MANTDM" colspan="3">
												<textarea name="anw_cont" class="input_required" required="true" requirednm="�亯����" style="width:503;height:292;ime-mode:active" maxlength="500"></textarea>
											</td>
										</tr>
										<tr>
											<td class="MANTDT">�����</td>
											<td class="MANTDM" width="200">
												<input type=text class=input_readonly readonly name="a_rg_nm" style="width:197;">
											</td>
											<td class="MANTDT" width="100">����Ͻ�</td>
											<td class="MANTDM" width="200">
												<input type=text class=input_readonly readonly name="a_rg_dtm" style="width:197;">
											</td>
										</tr>
										<tr>
											<td class="MANTDT">������</td>
											<td class="MANTDM">
												<input type=text class=input_readonly readonly name="a_mdf_nm" style="width:197;">
											</td>
											<td class="MANTDT">�����Ͻ�</td>
											<td class="MANTDM">
												<input type=text class=input_readonly readonly name="a_mdf_dtm" style="width:197;">
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
									<ucare:imgbtn width="70" name="btnAnwAdd"		value="���"	onClick="anwAdd()"/><!-- ��� -->
									<ucare:imgbtn width="70" name="btnAnwSave"		value="����"	onClick="anwSave()"/><!-- ���� -->
									<ucare:imgbtn width="70" name="btnAnwDel"		value="����"	onClick="anwDel()"/><!-- ���� -->
								</td>
							</tr>
						</table>
					</td>
					<!-- �亯 E -->
				</tr>
			</table>
		</td>
	</tr>
	</form>
	<!-- ���� E -->
</table>
</body>
</html>