<%@ page contentType="text/html;charset=euc-kr" %>
<%@ include file="/jsp/include/include.jsp"%>
<html>
<head>
<title>�������� ����</title>
<script language="javascript" src="/html/js/system/sysNoticeMng.js"></script>
</script>
</head>
<body topmargin=0 leftmargin=5 onload="init()">
<table width="1225" cellpadding="0" cellspacing="0" border="0">
	<tr>
		<td><ucare:xtitle title="�������� ����"/></td>
	</tr>
	<tr>
		<td height="5"></td>
	</tr>
	<!-- ��ȸ���� S -->
	<form name="fQuery" method="post">
	<input type="hidden" name="corp_cd" />
	<input type="hidden" name="corp_nm" />
	<tr>
		<td>
			<ucare:table type="query" width="1215">
				<tr>
					<td width="80" align=right style="padding:2 0 0 0 ">�� �� :&nbsp;</td>
					<td width="100"><input type="text" name="ntce_sbjt" class="input_text" size=20 onKeyPress="pressEnter('query()')"></td>
					<td width="80" align=right style="padding:2 0 0 0 ">�ۼ��� :&nbsp;</td>
					<td width="100"><input type="text" name="reg_nm" class="input_text" size=20 onKeyPress="pressEnter('query()')"></td>
					<td>&nbsp;</td>
					<td width="1" bgcolor=#CCCCCC></td>
	 				<td width="80" align=center>
	 					<ucare:imgbtn name="btnQuery" kind="R"  width="70" onClick="query()" /><!-- ��ȸ -->
	 				</td>
				</tr>
			</ucare:table>
		</td>
	</tr>
	</form>
	<!-- ��ȸ���� E -->

	<tr>
		<td height="5"></td>
	</tr>

	<!-- ���� S -->
	<form name="f" method="post">
	<input type="hidden" name="userid" value="<%=sessioninfo.getUserID()%>">
	<input type="hidden" name="ntce_id">
	<input type="hidden" name="atch_file_nm" value="">
	<tr>
		<td class="stitle">��������</td>
	</tr>
	<tr>
		<td>
			<ucare:grid id="UCSYS061S" width="1225" height="211" no="true">
				<tr event="O">
					<td width="80" 	column="ntce_tp_nm"		title="����"		align="center"/>
					<td width="500" column="ntce_sbjt"		title="��  ��"		align="left"	length="35"/>
					<td width="120" column="anc_st_dt"		title="�Խ� ������"	align="center"	format="DATE"/>
					<td width="120" column="anc_end_dt"		title="�Խ� ������"	align="center"	format="DATE"/>
					<td width="100" column="qry_cnt"		title="��ȸ��"		align="center"/>
					<td width="145" column="rg_name"		title="�ۼ���"		align="center"/>
					<td width="120" column="rg_dt"			title="�ۼ�����"	align="center"	format="DATE"/>
					<td width="120" column="ntce_id"		title="ntce_id"	 	align="center"	hidden="true"/>
				</tr>
			</ucare:grid>
		</td>
	</tr>
	<tr>
		<td height="5"></td>
	</tr>
	<tr>
		<td>
			<table width="1225" cellpadding="0" cellspacing="0" border="0">
				<col width="605"/>
				<col width="20"/>
				<col width="600"/>
				<tr>
					<td valign="top">
						<table width="600" cellpadding="0" cellspacing="0" border="0">
							<tr>
								<td class="stitle">�� ����</td>
							</tr>
							<tr>
								<td>
									<ucare:table type="detail" width="600">
										<col width="90"	/>
										<col width="210"/>
										<col width="90"	/>
										<col width="210"/>
										<tr>
											<td class="MANTDT" width="100">�� ��</td>
											<td class="MANTDM" width="505" colspan="3">
												<input type="text" class="input_required" name="ntce_sbjt" maxlength="100" style="width:500;" required="true" requirednm="����">
											</td>
										</tr>
										<tr>
											<td class="MANTDT">�ԽñⰣ</td>
											<td class="MANTDM">
												<input type=text class="input_readonly" rmode="Y,Y,Y" rclear="N" name="anc_st_dt" readonly required=true requirednm="�Խ� �Ⱓ"  pattern="D" format="DATE" value="<%=CDateUtil.getDateString() %>" style="width:70;"><span class=calendar onclick="return top.ifrmCal.service(f.anc_st_dt)"></span>&nbsp;
												~
												<input type=text class="input_readonly" rmode="Y,Y,Y" rclear="N" name="anc_end_dt" readonly required=true requirednm="�Խ� �Ⱓ"  pattern="D" format="DATE" value="<%=CUtil.getMyDate(+1, "yyyy/MM/dd") %>" style="width:70;"><span class=calendar onclick="return top.ifrmCal.service(f.anc_end_dt)"></span>
											</td>
											<td class="MANTDT">�Խñ���</td>
											<td class="MANTDM">
												<ucare:select name="ntce_tp_cd" option="-1" brcode="SYS003" code="code" codename="codenm" width="100" styleClass="combo_required" tag="required='true' requirednm='�Խñ���'" />
											</td>
										</tr>
											<td class="MANTDT">�� ��</td>
											<td class="MANTDM" colspan="3">
												<textarea class="input_text" name="ntce_txt" style="width:500;height:260" requirednm="����"></textarea>
												<SCRIPT language=javascript>
													function editor(){
													//onload�ÿ� �� edit�������� ������ �����Ƿ� onload�ÿ� ������� ȣ���ؼ� �� ���� �� init2�� ȣ���� �ʱ�ȭ�� �Ѵ�.
														if(editor_generate('ntce_txt')){
															//init2();
														}
													}
												</SCRIPT>
											</td>
										</tr>
										<tr>
											<td class="MANTDT">�����</td>
											<td class="MANTDM">
												<input type="text" name="rg_nm" readonly class="input_readonly" required="false"  style="width:195;">
											</td>
											<td class="MANTDT">����Ͻ�</td>
											<td class="MANTDM">
												<input type="text" name="rg_dtm" readonly class="input_readonly" required="false"  style="width:195;" format="DATET">
											</td>
										</tr>
										<tr>
											<td class="MANTDT">������</td>
											<td class="MANTDM">
												<input type="text" name="mdf_nm" readonly class="input_readonly" required="false"  style="width:195;">
											</td>
											<td class="MANTDT">�����Ͻ�</td>
											<td class="MANTDM">
												<input type="text" name="mdf_dtm" readonly class="input_readonly" required="false"  style="width:195;" format="DATET">
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
									<ucare:imgbtn name="btnAdd"  	kind="A"  width="70" 	onClick="add()"/><!-- ��� -->
									<ucare:imgbtn name="btnSave"  	kind="S"  width="70" 	onClick="fileUpLoad()"/><!-- ���� -->
									<ucare:imgbtn name="btnDel"  	kind="D"  width="70" 	onClick="del()"/><!-- ���� -->
								</td>
							</tr>
						</table>
					</td>
					<td></td>
				</form>
				<form name="f2" method="post">
				<input type="hidden" name="ntce_id">
					<td valign="top">
						<table width="600" cellpadding="0" cellspacing="0" border="0">
							<tr>
								<td class="stitle">���� ���</td>
							</tr>
							<tr>
								<td>
									<ucare:grid id="UCSYS065S" width="600" height="450" no="true">
										<tr>
											<td  width="40" column="userid_chk"		title="����"		format="CHECKBOX" hcheckbox="true" editable="true"></td>
											<td width="130" column="org_nm" 		title="����" 		align="center"></td>
											<td width="193" column="user_id"		title="����� ID" 	align="center"></td>
											<td width="200" column="user_nm" 		title="����ڸ�" 	align="center"></td>
											<td width="200" column="insp_obj_seq" 	title="insp_seq"	align="center"	hidden="true"></td>
										</tr>
									</ucare:grid>
								</td>
							</tr>
							<tr>
								<td height="5"></td>
							</tr>
							<tr>
								<td align="right">
									<ucare:imgbtn name="selectUser"		value="����߰�"  	width="70" 	onClick="openUserOrg()"/>
									<ucare:imgbtn name="btnTargetDel"	value="�������"  	width="70" 	onClick="targetDel()"/>
								</td>
							</tr>
						</table>
					</td>
				</tr>
			</table>
		</td>
	</tr>
	<!-- ���� E -->
	</form>
</table>

