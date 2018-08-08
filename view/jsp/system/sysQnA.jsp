<%@ page language="java" contentType="text/html; charset=EUC-KR"%>
<%@ include file="/jsp/include/include.jsp"%>
<html>
<head>
	<title>Q&A</title>
	<script language="javascript" src="/html/js/system/sysQnA.js"></script>
</head>
<body topmargin="0" leftmargin="5"  onLoad="init()">
<table width="1225" cellpadding="0" cellspacing="0" border="0">
	<tr>
		<td><ucare:xtitle title="Q&A"/></td>
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
					<td width="80" align="right">������Ʈ : &nbsp;</td>
					<td width="200">
						<ucare:select name="prj" option="10" queryid="UCSYS217S" code="prj_seq" codename="prj_nm"  width="150" styleClass="combo_text" />
					</td>
					<td width="80" align="right">�������� : &nbsp;</td>
					<td width="200">
						<ucare:select name="qst_tp_cd"  option="10" brcode="COM010" code="code" codename="codenm"  width="150" styleClass="combo_text" />
					</td>
					<td width="80" align="right">�������� : &nbsp;</td>
					<td>
						<input type="text" name="qst_cont" class="input_text" style="width:200" onKeyPress="checkKeyPress()">
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
	<input type="hidden" name="qst_seq" value="">
	<input type="hidden" name="anw_seq" value="">
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
								<td class="stitle">���� ����Ʈ</td>
							</tr>
							<tr>
								<td>
									<ucare:grid id="UCSYS218S" width="600" height="300" no="false">
										<tr event="O">
											<td width="50" column="qst_seq" 	title="qst_seq" hidden="true"></td>
											<td width="50" column="prj_seq" 	title="prj_seq" hidden="true"></td>
											<td width="80" column="qst_tp" 		title="��������"		align="center"></td>
											<td width="80" column="qst_tp_cd" 		title="qst_tp_cd" hidden="true"></td>
											<td width="290" column="qst_cont" title="��������"></td>
											<td width="80" column="q_rg_nm" 		title="�����"		align="center"></td>
											<td width="120" column="q_rg_dtm" 	title="����Ͻ�"	align="center"></td>
											<td width="60" 	column="q_mdf_nm" 	title="mdf_nm"		align="center"  hidden="true"></td>
											<td width="60" 	column="q_mdf_dtm" 	title="mdf_dtm"		align="center"  hidden="true"></td>
										</tr>
									</ucare:grid>
								</td>
							</tr>
							<tr>
								<td height="5"></td>
							</tr>
							<tr>
								<td class="stitle">���� ������</td>
							</tr>
							<tr>
								<td>
									<ucare:table type="detail" width="600">
										<tr>
											<td class="MANTDT">��������</td>
											<td class="MANTDM" colspan="3">
												<textarea name="qst_cont" class="input_required" required="true" requirednm="��������" style="width:503;height:177;"></textarea>
											</td>
										</tr>
										<tr>
											<td class="MANTDT">������Ʈ</td>
											<td class="MANTDM">
												<ucare:select name="prj_seq" option="4" queryid="UCSYS217S" code="prj_seq" codename="prj_nm"  width="150" styleClass="combo_required" />
											</td>
											<td class="MANTDT">��������</td>
											<td class="MANTDM">
												<ucare:select name="qst_tp_cd" option="4" brcode="COM010" code="code" codename="codenm"  width="150" styleClass="combo_required" />
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
									<ucare:imgbtn width="70" name="btnQstAdd"		kind="A"	onClick="qstAdd()"/><!-- ��� -->
									<ucare:imgbtn width="70" name="btnQstSave"	kind="S"	onClick="qstSave()"/><!-- ���� -->
									<ucare:imgbtn width="70" name="btnQstDel"		kind="D"	onClick="qstDel()"/><!-- ���� -->
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
								<td class="stitle">�亯 ����Ʈ</td>
							</tr>
							<tr>
								<td>
									<ucare:grid id="UCSYS219S" width="600" height="300" no="false">
										<tr event="O">
											<td width="50" column="anw_seq" 	title="anw_seq" hidden="true"></td>
											<td width="350" column="anw_cont" title="�亯����"></td>
											<td width="80" column="a_rg_nm" 		title="�����"		align="center"></td>
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
								<td class="stitle">�亯 ������</td>
							</tr>
							<tr>
								<td>
									<ucare:table type="detail" width="600">
										<tr>
											<td class="MANTDT">�亯����</td>
											<td class="MANTDM" colspan="3">
												<textarea name="anw_cont" class="input_required" required="true" requirednm="�亯����" style="width:503;height:177;"></textarea>
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
									<ucare:imgbtn width="70" name="btnAnwAdd"		kind="A"	onClick="anwAdd()"/><!-- ��� -->
									<ucare:imgbtn width="70" name="btnAnwSave"	kind="S"	onClick="anwSave()"/><!-- ���� -->
									<ucare:imgbtn width="70" name="btnAnwDel"		kind="D"	onClick="anwDel()"/><!-- ���� -->
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