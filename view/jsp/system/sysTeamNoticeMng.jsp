<%@ page contentType="text/html;charset=euc-kr" %>
<%@ include file="/jsp/include/include.jsp"%>
<html>
<head>
<title>��Ʈ�������� ����</title>
<script language="javascript" src="/html/js/system/sysTeamNoticeMng.js"></script>
</script>
</head>
<body topmargin=0 leftmargin=5 onload="init()">
<table width="1225" cellpadding="0" cellspacing="0" border="0">
	<tr>
		<td  colspan="3"><ucare:xtitle title="��Ʈ�������� ����"/></td>
	</tr>
	<tr>
		<td height="5"></td>
	</tr>
	<!-- ��ȸ���� S -->
	<form name="fQuery" method="post">
	<input type="hidden" name="corp_cd" />
	<input type="hidden" name="corp_nm" />
	<tr>
		<td colspan="3">
			<ucare:table type="query" width="1215">
				<tr>
					<td align="right" width="100">�ԽñⰣ :&nbsp;</td>
					<td width="210">
						<input type="text" readonly class="input_readonly" name="startdt" size=10  pattern="D" value="<%=CUtil.getMyDate(-1, "yyyy-MM-dd")%>">
						<span class=calendar onClick="return ifrmCal.service(fQuery.startdt,'pop')"></span>&nbsp; 
						~
						<input type=text readonly class="input_readonly" name="enddt" size=10  pattern="D" value="<%=CUtil.getMyDate(0, "yyyy-MM-dd")%>">
						<span class=calendar onClick="return ifrmCal.service(fQuery.enddt,'pop')"></span>
					</td>
					<td width="80" align=right style="padding:2 0 0 0 ">�� �� :&nbsp;</td>
					<td width="100"><input type="text" name="ntce_sbjt" class="input_text" size=30 onKeyPress="checkEnterKey();"></td>
					<td width="80" align=right style="padding:2 0 0 0 ">�ۼ��� :&nbsp;</td>
					<td width="100"><input type="text" name="reg_nm" class="input_text" size=20 onKeyPress="checkEnterKey();"></td>
					<td>&nbsp;</td>
					<td width="1" bgcolor=#CCCCCC></td>
	 				<td width="80" align=center>
	 					<ucare:imgbtn name="btnQuery" kind="R"  width="70" onClick="team_ntce_query()" /><!-- ��ȸ -->
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
	<input type="hidden"	name="userid" value="<%=sessioninfo.getUserID()%>">
	<input type="hidden"	name="team_ntce_id" value="">
	<input type="hidden"	name="atch_file_nm" value="">
	<input type="hidden"	name="corp_cd" />
	<tr>
		<td>
			<table border=0 cellspacing=0 cellpadding=0>
				<tr>
					<td class="stitle">��Ʈ��������</td>
				</tr>
				<tr>
					<td>
						<ucare:grid id="UCSYS120S" width="680" height="720" no="true">
							<tr event="O">
								<td width="50" 	column="ntce_tp_nm"		title="����"		align="center"/>
								<td width="212" column="ntce_sbjt"		title="��  ��"		align="left"	length="35" />					
								<td width="80"  column="anc_st_dt"		title="�Խ� ������"	align="center"	format="DATE" />
								<td width="80"  column="anc_end_dt"		title="�Խ� ������"	align="center"	format="DATE" />
								<td width="60"  column="qry_cnt"		title="��ȸ��"		align="center"/>
								<td width="80"  column="rg_name"		title="�ۼ���"		align="center"/>
								<td width="80"  column="rg_dt"			title="�ۼ�����"	align="center"	format="DATE" />
								<td width="80"  column="filenm"			title="filenm"	 	align="center"	hidden="true" />
								<td width="80"  column="corp_cd"		title="corp_cd"	 	align="center"	hidden="true" />
								<td width="80"  column="corp_nm"		title="corp_nm"	 	align="center"	hidden="true" />
								<td width="80"  column="rg_dtm"			title="rg_dtm"	 	align="center"	hidden="true" />
								<td width="80"  column="rg_nm"			title="rg_nm"	 	align="center"	hidden="true" />
								<td width="80"  column="mdf_dtm"		title="mdf_dtm"	 	align="center"	hidden="true" />
								<td width="80"  column="mdf_nm"			title="mdf_nm"	 	align="center"	hidden="true" />
								<td width="80"  column="ntce_txt"		title="ntce_txt"	align="center"	hidden="true" />
								<td width="80"  column="ntce_tp_cd"		title="ntce_tp_cd"	align="center"	hidden="true" />
								<td width="80"  column="team_ntce_id"	title="team_ntce_id"	align="center"	hidden="true" />
							</tr>
						</ucare:grid>
					</td>
				</tr>
			</table>
		</td>
		<td width="10">
		</td>
		<td>
			<table width="530" cellpadding="0" cellspacing="0" border="0">
				<tr>
					<td valign="top">
						<table width="530" cellpadding="0" cellspacing="0" border="0">
							<tr>
								<td class="stitle">������</td>
							</tr>
							<tr>
								<td>
									<ucare:table type="detail" width="530">
										<col width="60"	/>
										<col width="205"/>
										<col width="60"	/>
										<col width="205"/>
										<tr>
											<td class="MANTDT" >�� ��</td>
											<td class="MANTDM" colspan="3">
												<input type="text" class="input_required" name="ntce_sbjt" maxlength="100" style="width:465;" required="true" requirednm="����">	
											</td>
										</tr>
										<tr>
											<td class="MANTDT">�ԽñⰣ</td>
											<td class="MANTDM">					
												<input type=text class="input_readonly" rmode="Y,Y,Y" rclear="N" name="anc_st_dt" readonly required=true requirednm="�Խ� �Ⱓ"  pattern="D" format="DATE" value="" style="width:70;"><span class=calendar onclick="return top.ifrmCal.service(f.anc_st_dt)"></span>
												~
												<input type=text class="input_readonly" rmode="Y,Y,Y" rclear="N" name="anc_end_dt" readonly required=true requirednm="�Խ� �Ⱓ"  pattern="D" format="DATE" value="" style="width:70;"><span class=calendar onclick="return top.ifrmCal.service(f.anc_end_dt)"></span>	
											</td>
											<td class="MANTDT">�Խñ���</td>
											<td class="MANTDM">
												<ucare:select name="ntce_tp_cd" option="4" brcode="SYS003" code="code" codename="codenm" width="200" styleClass="combo_required" tag="required='true' requirednm='�Խñ���'" />
											</td>
										</tr>
										<tr>
											<td class="MANTDT">�� ��</td>
											<td class="MANTDM" colspan="3">
												<textarea class="input_textarea" name="ntce_txt" style="width:465;height:260" requirednm="����"></textarea>
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
										
										<tr style="display:none">
											
											<td class="MANTDT">����÷��</td>
											<td class="MANTDM" colspan="3">
												<div style="display:" id="file_up">
												<iframe name="iUpload" height="25" width="450" src="/jsp/common/upload.jsp?file_path=UPLOAD_PATH" frameborder="0"></iframe>						
												<iframe name="fRemove" height="0" width="0%" src="/jsp/common/blank.jsp" frameborder="0"></iframe>	
												</div>
												<div style="display:none" id="file_down">
												<label width ="200" style="cursor:hand" onClick="openFile()"><font color=blue id=filenm></font></label>&nbsp; <ucare:imgbtn type="btn60" name="btnSave" width="70" value="���ϻ���" onClick="delFile(this)"/>
												</div>				
											</td>
										</tr>
										<tr>
											<td class="MANTDT">�� �� ��</td>
											<td class="MANTDM" id="rg_nm">&nbsp;</td>
											<td class="MANTDT">����Ͻ�</td>
											<td class="MANTDM" id="rg_dtm" format="DATET">&nbsp;</td>
										</tr>
										<tr>
											<td class="MANTDT">�� �� ��</td>
											<td class="MANTDM" id="mdf_nm">&nbsp;</td>
											<td class="MANTDT">�����Ͻ�</td>
											<td class="MANTDM" id="mdf_dtm" format="DATET">&nbsp;</td>
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
									<ucare:imgbtn name="btnSave"  	kind="S"  width="70" 	onClick="save()"/><!-- ���� -->
									<ucare:imgbtn name="btnDel"  	kind="D"  width="70" 	onClick="del()"/><!-- ���� -->
								</td>
							</tr>
						</table>
					</td>
				</tr>
				<tr>
					<td valign="top">
						<table width="530" cellpadding="0" cellspacing="0" border="0">
							<tr>
								<td class="stitle">�������� �߰�</td>
							</tr>
							<tr>
								<td>
									<ucare:table type="detail" width="530">
										<tr>
											<td class="MANTDT"  align=right>���� :&nbsp;</td>
											<td class="MANTDM">
												<select name="up_org_cd" class="combo_text" onChange="makeOrgCombo(this.form, this, fQuery.corp_cd.value)" style="width:100">
													<option value="">��ü</option>
												</select>
												<select name="org_cd1" style="width:100" class="combo_text">
													<option value="">��ü</option>
												</select>
												&nbsp;&nbsp;<ucare:imgbtn name="selectUser"	value="����߰�"  	width="70" 	onClick="addTeam()"/>	
											</td>
										</tr>
									</ucare:table>
								</td>
							</tr>
						</table>
					</td>
				</tr>
				<tr>
					<td valign="top">
						<table width="530" cellpadding="0" cellspacing="0" border="0">
							<tr>
								<td class="stitle">���� ����</td>
							</tr>
							<tr>
								<td>
									<ucare:grid id="UCSYS121S" width="530" height="160" no="true">
										<tr event="O">
											<td  width="40" column="selected" 		title="����"			format="CHECKBOX" hcheckbox="true" editable="true"></td>
											<td width="212" column="team_nm1" 		title="��" 				align="center"	required="true" requirednm="�μ�"	></td>
											<td width="240" column="team_nm2"		title="�μ�"			align="center"	required="true" requirednm="�μ�"	></td>
											<td width="240" column="team_cd"		title="team_cd"			hidden="true"></td>
											<td width="240" column="insp_obj_seq"	title="insp_obj_seq"	hidden="true"></td>
										</tr>
									</ucare:grid>
								</td>
							</tr>
							<tr>
								<td height="5"></td>
							</tr>
							<tr>
								<td align="right">
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
</body>
</html>