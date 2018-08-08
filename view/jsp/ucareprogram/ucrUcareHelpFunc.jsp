<%@ page language="java" contentType="text/html; charset=EUC-KR"%>
<%@ include file="/jsp/include/include.jsp"%>
<html>
<head>
	<title>Ucare Help Function</title>
	<script language="javascript" src="<%=scriptPath %>/js/ucareprogram/ucrUcareHelpFunc.js"></script>
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
	<input type="hidden" name="lang_tp_cd" value="03"/>	<!-- ��������� javascript�� ���� -->
	
	<tr>
		<td>
			<ucare:table type="query" width="1215">
				<tr>
					<td width="80" align="right">ī�װ� :&nbsp;</td>
					<td width="220">
						<ucare:select name="help_ctgr_seq"  option="10" code="help_ctgr_seq" codename="ctgr_nm"  width="150" styleClass="combo_text" />
					</td>
					<td width="80" align="right">�Լ����� :&nbsp;</td>
					<td width="220">
						<ucare:select name="func_src"  option="10" brcode="UCR006" width="150" styleClass="combo_text" />
					</td>
					<td width="80" align="right">�˻����� :&nbsp;</td>
					<td width="300">
						<select name="searchType" class="combo_text">
							<option value=""> == ���� == </option>
							<option value="A.FUNC_NM">�Լ���</option>
							<option value="A.FUNC_PAR">Parameter</option>
							<option value="A.FUNC_DESC">Description</option>
							<option value="A.FUNC_EX">Example</option>
							<option value="A.FUNC_SRC">Source</option>
						</select>
						<input type=text class="input_text" name="searchText" size=15 onkeyup="return(isEnterKey()? queryList():false);" >
					</td>
					<td width="80" align="right">��뿩�� :&nbsp;</td>
					<td>
						<ucare:select name="use_f"  option="10" brcode="USEYN" width="80" selCode="Y"/>
					</td>
					<td width="80" align="right">&nbsp;</td>
					<td width="200">
					</td>
					<td width="1" bgcolor=#CCCCCC></td>
					<td width="80" align="right">
						<ucare:imgbtn name="btnQuery"	value="��ȸ"	 onClick="queryList()"/><!-- ��ȸ -->
					</td>
					<td style="display:none"><input type=text name="noname" size=2/></td>
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
	<input type="hidden" name="func_seq" value="">
	<tr>
		<td>
			<table width="1225" cellpadding="0" cellspacing="0" border="0">
				<col width="600" />
				<col width="25" />
				<col width="600" />
				<tr>
					<!-- Function ����Ʈ S -->
					<td valign="top">
						<table cellpadding="0" cellspacing="0" border="0">
							<tr>
								<td class="stitle">Function ����Ʈ</td>
							</tr>
							<tr>
								<td>
									<ucare:grid id="UCUCR302S" width="600" height="700" no="false">
										<tr event="O">
											<td width="80"	column="ctgr_nm" 		title="ī�װ�"			align="center"></td>
											<td width="150"	column="func_nm" 		title="�Լ���"			align="left"></td>
											<td width="80"	column="func_src_nm"	title="�Լ�����"			align="center"></td>
											<td width="272"	column="func_desc" 		title="����" 			align="left"></td>
											<!-- hidden -->
											<td width="0" 	column="func_seq" 		title="func_seq" 		hidden="true"></td>
											<td width="0" 	column="lang_tp_cd" 	title="lang_tp_cd" 		hidden="true"></td>
											<td width="0" 	column="help_ctgr_seq"	title="help_ctgr_seq" 	hidden="true"></td>
											<td width="0"	column="func_src" 		title="func_src"		hidden="true"></td>
											<td width="0" 	column="func_par" 		title="func_par" 		hidden="true"></td>
											<td width="0" 	column="func_ex" 		title="func_ex" 		hidden="true"></td>
											<td width="0" 	column="func_rmk" 		title="func_rmk" 		hidden="true"></td>
											<td width="0" 	column="mdf_nm" 		title="mdf_nm"			hidden="true"></td>
											<td width="0" 	column="mdf_dtm" 		title="mdf_dtm"			hidden="true"></td>
											<td width="0" 	column="rg_nm" 			title="�����"			hidden="true"></td>
											<td width="0" 	column="rg_dtm" 		title="����Ͻ�"			hidden="true"></td>
											<td width="0" 	column="use_f" 			title="��뿩��"			hidden="true"></td>
										</tr>
									</ucare:grid>
									<table border="0" width="100%">
										<tr>
											<td height="10"></td>
										</tr>
										<tr>
											<td align="right">
												<ucare:imgbtn name="btnExl"		value="����"	onClick="funcExl()"/><!-- ���� -->
											</td>
										</tr>
									</table>
								</td>
							</tr>
						</table>
					</td>
					<!-- Function ����Ʈ E -->
					<td></td>
					<!-- Function ������ S -->
					<td valign="top">
						<table cellpadding="0" cellspacing="0" border="0">
							<tr>
								<td>
									<ucare:table type="tab" width="100" name="�󼼳���,�������" id="Tab">
										<tr id="viewTab" style="display:">
											<td>
												<iframe name="iDetail" height="708" width="600" src="ucrUcareHelpFuncP.jsp" frameborder="0" scrolling="yes" style="border:1px solid #CCCCCC;padding-left:1px"></iframe>
											</td>
										</tr>
										<tr id="viewTab" style="display:none">
											<td>
											
												<ucare:table type="detail" width="600">
													<tr>
														<td class="MANTDT" width="100">ī�װ�</td>
														<td class="MANTDM">
															<ucare:select name="help_ctgr_seq" option="4" code="help_ctgr_seq" codename="ctgr_nm" width="150" styleClass="combo_required" />
														</td>
														<td class="MANTDT" width="100">�Լ�����</td>
														<td class="MANTDM">
															<ucare:select name="func_src"  option="4" brcode="UCR006" width="150" styleClass="combo_text" />
														</td>
													</tr>
													<tr>
														<td class="MANTDT">�Լ���</td>
														<td class="MANTDM" colspan="3">
															<input type=text class="input_required" name="func_nm" required="true" requirednm="�Լ���" style="width:502;" maxlength="100">
														</td>
													</tr>
													<tr>
														<td class="MANTDT">Parameter</td>
														<td class="MANTDM" colspan="3">
															<textarea class="input_required" name="func_par" style="width:502;height:100;" maxlength="250"></textarea>
														</td>
													</tr>
													<tr>
														<td class="MANTDT">Description</td>
														<td class="MANTDM" colspan="3">
															<textarea class="input_required" name="func_desc" style="width:502;height:100;" maxlength="250"></textarea>
														</td>
													</tr>
													<tr>
														<td class="MANTDT">Example</td>
														<td class="MANTDM" colspan="3">
															<textarea class="input_required" name="func_ex" style="width:502;height:280;"></textarea>
															<SCRIPT language=javascript>
																function editor()
																{
																	//onload�ÿ� edit�������� ������ �����Ƿ� onload �� ������� ȣ���ؼ� �� ���� �� init2�� ȣ���� �ʱ�ȭ�� �Ѵ�.
																	if(editor_generate('func_ex'))
																	{
																		init2();
																	}
																}
															</SCRIPT>
														</td>
													</tr>
													<tr>
														<td class="MANTDT">���</td>
														<td class="MANTDM" colspan="3">
															<textarea class="input_required" name="func_rmk" style="width:502;height:50;" maxlength="500"></textarea>
														</td>
													</tr>
													<tr>
														<td class="MANTDT">��뿩��</td>
														<td class="MANTDM" colspan="3">
															<ucare:select name="use_f"  option="-1" brcode="USEYN" width="150"/>
														</td>
													</tr>
													<tr style="display:none">
														<td class="MANTDT">�����</td>
														<td class="MANTDM" width="200">
															<input type=text class=input_readonly readonly name="rg_nm" style="width:197;">
														</td>
														<td class="MANTDT" width="100">����Ͻ�</td>
														<td class="MANTDM" width="200">
															<input type=text class=input_readonly readonly name="rg_dtm" style="width:197;">
														</td>
													</tr>
													<tr style="display:none">
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
												<table border="0" width="100%">
													<tr>
														<td height="10"></td>
													</tr>
													<tr>
														<td align="right">
															<!--  <ucare:imgbtn name="btnExl"		value="����"	onClick="funcExl()"/>--><!-- ���� -->
															<ucare:imgbtn name="btnAdd"		value="���"	onClick="funcAdd()"/><!-- ��� -->
															<ucare:imgbtn name="btnSave"		value="����"	onClick="funcSave()"/><!-- ���� -->
															<ucare:imgbtn name="btnDel"		value="����"	onClick="funcDel()"/><!-- ���� -->
														</td>
													</tr>
												</table>
											</td>
										</tr>
									</ucare:table>
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
</body>
</html>