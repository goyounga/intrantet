<%@ page contentType="text/html;charset=euc-kr" %>
<%@ include file="/jsp/include/include.jsp"%>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=EUC-KR">
<title>�޴��׷� ����</title>

<script language="javascript" src="/html/js/system/sysMenuGrpMng.js">
</script>
</head>
<body topmargin=0 leftmargin=5 onload="eventGrid();init();">
<table width="1225" cellpadding="0" cellspacing="0" border="0">
	<tr>
		<td height="5"></td>
	</tr>
	
	<!-- �˻����� S -->
	<form name="fQuery">
	<input type="hidden" name="corp_cd" />
	<input type="hidden" name="corp_nm" />
	<tr>
		<td>
			<ucare:table type="query" width="1215">
				<tr>
					<td width=80 align=right style="padding:2 0 0 0 ">�޴� �׷�� :&nbsp;</td>
					<td width=100>
						<input type="text" name="menugroupnm" class="input_text" onKeyPress="checkKeyPress();" size=12>
					</td>
					<td>&nbsp;</td>
					<td width=1 bgcolor=#CCCCCC></td>
	 				<td width=80 align=center>
	 					<ucare:imgbtn name="btnQuery" kind="R"  width="70" onClick="query()" /><!-- ��ȸ -->
	 				</td>
				</tr>
			</ucare:table>
		</td>
	</tr>
	</form>
	<!-- �˻����� E -->
	
	<!-- ���� S -->
	<form name="f">
	<input type="hidden" name="userid" value="<%=sessioninfo.getUserID()%>">
	<input type="hidden" name="mnu_grp_id">
	<input type="hidden" name="corp_cd" />
	<tr>
		<td>
			<table width="1225" cellpadding="0" cellspacing="0" border="0">
			<col width="600"	/>
			<col width="25"		/>
			<col width="600"	/>
				<tr>
					<!-- �޴��׷� ����Ʈ S -->
					<td valign="top">
						<table width="600" cellpadding="0" cellspacing="0" border="0">
							<tr>
								<td class="stitle">�޴��׷� ����Ʈ</td>
							</tr>
							<tr>
								<td>
									<ucare:grid id="UCSYS041S" width="600" height="250" no="true">
										<tr event="O">
											<td width="282" column="mnu_grp_nm"	title="���Ѹ�"	align="left"	length="20"></td>
											<td width="140" column="rg_nm"		title="�����"	align="center"></td>
											<td width="140" column="rg_dt"		title="�����"	align="center" 	format="DATE"></td>
											<td width="140" column="rg_dtm"		title="�����"	align="center" 	hidden="true"></td>
											<td width="140" column="mdf_nm"		title="������"	align="center"	hidden="true"></td>
											<td width="140" column="mdf_dtm"	title="������"	align="center" 	hidden="true"></td>
											<td width="140" column="mnu_grp_id"	title="�޴��׷�" align="center" 	hidden="true"></td>
											<td width="140" column="mnu_grp_desc"	title="�޴��׷�" align="center" 	hidden="true"></td>
											<td width="140" column="corp_cd"	title="corp_cd"	 align="center" 	hidden="true"></td>
										</tr>
									</ucare:grid>
								</td>
							</tr>
						</table>
					</td>
					<!-- �޴��׷� ����Ʈ E -->
					<td></td>
					<!-- �޴��׷� ���� S -->
					<td valign="top">
						<table width="600" cellpadding="0" cellspacing="0" border="0">
							<tr>
								<td class="stitle">�޴��׷� ����</td>
							</tr>
							<tr>
								<td>
									<table width="600" cellpadding="0" cellspacing="0" border="0">
										<tr>
											<td>
												<ucare:table id="" type="detail" width="600">
												<col  width="100"	/>
												<col  width="500"	/>
													<tr>
														<td class="MANTDT">�޴� �׷��</td>
														<td class="MANTDM">
															<input type="text" class="input_required" name="mnu_grp_nm" maxlength="25" style="width:499;">	
														</td>
													</tr>
													<tr>
														<td class="MANTDT">����</td>
														<td class="MANTDM">
															<textarea class="input_text" name="mnu_grp_desc" maxlength="300" style="width:499;height:95"></textarea>
														</td>
													</tr>
													<tr>
														<td class="MANTDT">�����</td>
														<td class="MANTDM">									
															<input type="text" name="rg_nm" class="input_readonly" readonly style="width:150;">
														</td>
													</tr>
													<tr>
														<td class=MANTDT>��� �Ͻ�</td>
														<td class="MANTDM">									
															<input type="text" name="rg_dtm" class="input_readonly" readonly style="width:150;" format="DATET">
														</td>
													</tr>
													<tr>
														<td class=MANTDT>������</td>
														<td class="MANTDM">
															<input type="text" name="mdf_nm" class="input_readonly" readonly style="width:150;">
														</td>
													</tr>
													<tr>
														<td class=MANTDT>���� �Ͻ�</td>
														<td class="MANTDM">
															<input type="text" name="mdf_dtm" class="input_readonly" readonly style="width:150;" format="DATET">
														</td>
													</tr>
												</ucare:table>
											</td>
										</tr>
										<tr>
											<td height="5"></td>
										</tr>
										<tr>
											<td align="right">
												<ucare:imgbtn name="btnAdd"  kind="A"  width="70" onClick="add()" /><!-- ��� -->
												<ucare:imgbtn name="btnSave" kind="S"  width="70" onClick="save()" /><!-- ���� -->
												<ucare:imgbtn name="btnDel"  kind="D"  width="70" onClick="del()" /><!-- ���� -->
											</td>
										</tr>
									</table>
								</td>
							</tr>
						</table>
					</td>
					<!-- �޴��׷� ���� E -->
				</tr>
				</form>
				
				<form name="f2">
				<input type="hidden" name="mnu_grp_id">
				<input type="hidden" name="corp_cd">
				<input type="hidden" name="userid" value="<%=sessioninfo.getUserID()%>">
				<tr>
					<!-- ���� �ο� ������ �޴� ����Ʈ S -->
					<td>
						<table width="600" cellpadding="0" cellspacing="0" border="0">
							<tr>
								<td class="stitle">���� �ο� ������ �޴� ����Ʈ</td>
							</tr>
							<tr>
								<td>
									<ucare:grid id="UCSYS045S" width="600" height="440" no="true">
										<tr event="O">
											<td width="40" column="mnuid_chk" 	title="����" 		align="center" format="CHECKBOX" hcheckbox="true" editable="true"></td>
											<td width="400" column="mnu_nm" 	title="�޴���" 		align="left"	length="30"></td>
											<td width="120" column="mnu_id" 	title="�޴�ID" 		align="center"	name="menuid"></td>
										</tr>
									</ucare:grid>
								</td>
							</tr>
						</table>
					</td>
					<!-- ���� �ο� ������ �޴� ����Ʈ E -->
					<td align="center">
						<span class="prev" onclick="prevMenu()"></span><br>
						<span class="next" onclick="nextMenu()"></span>
					</td>
					<!-- ���� �ο� �� �޴� ����Ʈ S -->
					<td>
						<table width="600" cellpadding="0" cellspacing="0" border="0">
							<tr>
								<td class="stitle">���� �ο� �� �޴� ����Ʈ</td>
							</tr>
							<tr>
								<td>
									<ucare:grid id="UCSYS046S" width="600" height="440" no="true">
										<tr event="O">
											<td  width="40" column="mnuid_chk" title="����" format="CHECKBOX" hcheckbox="true" editable="true"></td>
											<td width="400" column="mnu_nm" title="�޴���" align="left"></td>
											<td width="120" column="mnu_id" title="�޴�ID" align="center"></td>
											<!--
											<td width="40" column="read_auth_f" title="�б�" align="center"></td>
											<td width="40" column="wrt_auth_f" title="����" align="center"></td>
											-->
										</tr>
									</ucare:grid>
								</td>
							</tr>
						</table>
					</td>
					<!-- ���� �ο� �� �޴� ����Ʈ E -->
				</tr>
				</form>
			</table>
		</td>
	</tr>
	<!-- ���� E -->
</table>

</body>
</html>