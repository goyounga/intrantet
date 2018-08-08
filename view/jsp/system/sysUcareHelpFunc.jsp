<%@ page language="java" contentType="text/html; charset=EUC-KR"%>
<%@ include file="/jsp/include/include.jsp"%>
<html>
<head>
	<title>Ucare Help Function</title>
	<script language="javascript" src="/html/js/system/sysUcareHelpFunc.js"></script>
</head>
<body topmargin="0" leftmargin="5"  onLoad="init()">
<table width="1225" cellpadding="0" cellspacing="0" border="0">
	<tr>
		<td><ucare:xtitle title="Ucare Help Function"/></td>
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
						<ucare:select name="lang_tp_cd"  option="4" brcode="UCR001" code="code" codename="codenm" width="150" styleClass="combo_required" onChange="getCtgrList()"/>
					</td>
					<td width="80" align="right">ī�װ� :&nbsp;</td>
					<td width="220">
						<ucare:select name="help_ctgr_seq"  option="4" code="help_ctgr_seq" codename="ctgr_nm"  width="150" styleClass="combo_required" />
					</td>
					<td width="80" align="right">�˻����� : &nbsp;</td>
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
					<td width="80" align="right">&nbsp;</td>
					<td width="200">
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
						<table width="600" cellpadding="0" cellspacing="0" border="0">
							<tr>
								<td class="stitle">Function ����Ʈ</td>
							</tr>
							<tr>
								<td>
									<ucare:grid id="UCSYS302S" width="600" height="680" no="false">
										<tr event="O">
											<td width="50" column="func_seq" 			title="func_seq" hidden="true"></td>
											<td width="50" column="lang_tp_cd" 		title="lang_tp_cd" hidden="true"></td>
											<td width="50" column="help_ctgr_seq" title="help_ctgr_seq" hidden="true"></td>
											<td width="100" column="ctgr_nm" 			title="ī�װ�"		align="center"></td>
											<td width="120" column="func_nm" 			title="�Լ���"		align="center"></td>
											<td width="120" column="func_par" 		title="func_par" hidden="true"></td>
											<td width="120" column="func_desc" 		title="func_desc" hidden="true"></td>
											<td width="120" column="func_ex" 			title="func_ex" hidden="true"></td>
											<td width="160" column="func_src" 		title="Source"></td>
											<td width="120" column="func_rmk" 		title="func_rmk" hidden="true"></td>
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
					<!-- Function ����Ʈ E -->
					<td></td>
					<!-- Function ������ S -->
					<td valign="top">
						<table width="600" cellpadding="0" cellspacing="0" border="0">
							<tr>
								<td class="stitle">Function ������</td>
							</tr>
							<tr>
								<td>
									<ucare:table type="detail" width="600">
										<tr>
											<td class="MANTDT" width="100">ī�װ�</td>
											<td class="MANTDM" width="500" colspan="3">
												<ucare:select name="help_ctgr_seq" option="4" code="help_ctgr_seq" codename="ctgr_nm" width="150" styleClass="combo_required" />
											</td>
										</tr>
										<tr>
											<td class="MANTDT">�Լ���</td>
											<td class="MANTDM" colspan="3">
												<input type=text class="input_required" name="func_nm" required="true" requirednm="�Լ���" style="width:502;">
											</td>
										</tr>
										<tr>
											<td class="MANTDT">Parameter</td>
											<td class="MANTDM" colspan="3">
												<textarea class="input_required" name="func_par" style="width:502;height:80;"></textarea>
											</td>
										</tr>
										<tr>
											<td class="MANTDT">Description</td>
											<td class="MANTDM" colspan="3">
												<textarea class="input_required" name="func_desc" style="width:502;height:80;"></textarea>
											</td>
										</tr>
										<tr>
											<td class="MANTDT">Example</td>
											<td class="MANTDM" colspan="3">
												<textarea class="input_required" name="func_ex" style="width:502;height:300;"></textarea>
											</td>
										</tr>
										<tr>
											<td class="MANTDT">Source</td>
											<td class="MANTDM" colspan="3">
												<input type=text class="input_required" name="func_src" required="true" requirednm="Source" style="width:502;">
											</td>
										</tr>
										<tr>
											<td class="MANTDT">���</td>
											<td class="MANTDM" colspan="3">
												<textarea class="input_required" name="func_rmk" style="width:502;height:40;"></textarea>
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
									<ucare:imgbtn width="70" name="btnAdd"		kind="A"	onClick="funcAdd()"/><!-- ��� -->
									<ucare:imgbtn width="70" name="btnSave"		kind="S"	onClick="funcSave()"/><!-- ���� -->
									<ucare:imgbtn width="70" name="btnDel"		kind="D"	onClick="funcDel()"/><!-- ���� -->
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