<%@ page language="java" contentType="text/html; charset=EUC-KR"%>
<%@ include file="/jsp/include/include.jsp"%>
<html>
<head>
	<title>�Խ���</title>
	<script language="javascript" src="/html/js/system/sysBoardList.js"></script>
</head>
<body topmargin="0" leftmargin="5"  onLoad="init()">
<!--<div style="position:absolute;left:840px;top:5px;z-index:2;">
�б���� :&nbsp;<span id="r_auth_span">��</span><label>&nbsp;|&nbsp;</label>
������� :&nbsp;<span id="w_auth_span">��</span>
</div>-->
<table width="1000" cellpadding="0" cellspacing="0" border="0">
	<tr>
		<td><ucare:xtitle title="�Խ���"/></td>
	</tr>
	<tr>
		<td height="5"></td>
	</tr>

	<!-- �˻����� S -->
	<form	name="fQuery" method="post">
<!--	<input type="hidden" name="gradecd" value="<%=sessioninfo.getUserGradeCD()%>">-->
	<input type="hidden" name="gradecd" value="01">
	<tr>
		<td>
			<ucare:table type="query" width="990">
				<tr>
					<td width="80" align="right">�Խ��Ǹ� :&nbsp;</td>
					<td width="160">
						<ucare:select name="board_nm" option="4" code="board_tp_seq" codename="board_nm"  width="150" styleClass="combo_text" onChange="getBoardAuth()"/>
					</td>
					<td width="80" align="right">�˻����� : &nbsp;</td>
					<td width="200">
						<select name="searchType" class="combo_text">
							<option value=""> == ���� == </option>
							<option value="B.USER_ID">�ۼ���ID</option>
							<option value="B.USER_NM">�ۼ��ڸ�</option>
							<option value="A.BOARD_SBJT">����</option>
							<option value="A.BOARD_CONT">����</option>
						</select>
						<input type=text class="input_text" name="searchText" size=15 onkeyup="return(isEnterKey()? queryList():false);" >
					</td>
					<td width="80" align="right">������� :&nbsp;</td>
					<td>
						<input type="text" readonly class="input_readonly" name="startdt" size=10  value="<%=CUtil.getMyDate(-1, "yyyy-MM-dd")%>">
						<span class=calendar onClick="return ifrmCal.service(fQuery.startdt,'pop')"></span>&nbsp; 
						~
						<input type=text readonly class="input_readonly" name="enddt" size=10  value="<%=CUtil.getMyDate(0, "yyyy-MM-dd")%>">
						<span class=calendar onClick="return ifrmCal.service(fQuery.enddt,'pop')"></span>
					</td>
					<td width="1" bgcolor=#CCCCCC></td>
					<td width="80" align="right">
						<ucare:imgbtn width="70" name="btnQuery"	kind="R"	onClick="queryList()"/><!-- ��ȸ -->
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
	<input type="hidden" name="board_seq" value="">
	<input type="hidden" name="file_nm_1">
	<input type="hidden" name="file_nm_2">
	<input type="hidden" name="file_nm_3">
	<input type="hidden" name="rply_seq" value="">
	<tr>
		<td class="stitle">�� ���</td>
	</tr>
	<tr>
		<td>
			<ucare:grid id="UCSYS214S" width="1000" height="250" no="true">
				<tr event="O">
					<td width="50" 	column="board_seq"		hidden="true"	title="board_seq"	align="center"></td>
					<td width="560" 	column="board_sbjt" 		title="����" 		></td>
					<td width="75" 		column="qry_cnt" 		title="��ȸ��" 		align="center"></td>
					<td width="75" 		column="rply_cnt"		title="��ۼ�"		align="center"></td>
					<td width="100" 	column="rg_nm" 		title="�ۼ���"		align="center"></td>
					<td width="150" 	column="rg_dtm" 	title="�ۼ��Ͻ�"	align="center"></td>
					<td width="150" 	column="atch_file_nm_1" 	hidden="true"	title="atch_file_nm_1"	align="center"></td>
					<td width="150" 	column="atch_file_nm_2" 	hidden="true"	title="atch_file_nm_2"	align="center"></td>
					<td width="150" 	column="atch_file_nm_3" 	hidden="true"	title="atch_file_nm_3"	align="center"></td>
				</tr>
			</ucare:grid>
		</td>
	</tr>
	<tr>
		<td>
			<table width="1000" cellpadding="0" cellspacing="0" border="0">
				<col width="490" />
				<col width="20" />
				<col width="490" />
				<tr>
					<td valign="top">
						<table width="490" cellpadding="0" cellspacing="0" border="0">
							<tr>
								<td class="stitle">�Խñ� ������</td>
							</tr>
							<tr>
								<td>
									<ucare:table type="detail" width="490">
										<tr>
											<td class="MANTDT" width="100">����</td>
											<td class="MANTDM" width="390" colspan="3">
												<input type=text class="input_required" name="board_sbjt" style="width:393;">
											</td>
										</tr>
										<tr>
											<td class="MANTDT" width="100">����</td>
											<td class="MANTDM" width="390" colspan="3">
												<textarea class="input_required" name="board_cont" style="width:393;height:180;"></textarea>
											</td>
										</tr>
										<tr>
											<td class="MANTDT" width="100">÷������1</td>
											<td class="MANTDM" width="245" colspan="2">
												<iframe name="iUpload1" height="25" width="245" src="/jsp/common/upload.jsp?file_path=UPLOAD_PATH" frameborder="0"></iframe>
											</td>
											<td class="MANTDM">
												<span id="file_span_1" style="display:none;">
													<span width ="100" style="cursor:hand" onClick="openFile(1)">
														<font color="blue" id=atch_file_nm_1></font>
													</span>&nbsp;
													<span style="cursor:hand" onClick="delFile(1)">
														<font color="red"><B>x</B></font>
													</span>
												</span>
												<span id="nbsp_span_1">&nbsp;</span>
											</td>
										</tr>
<!--										<tr>
											<td class="MANTDT" width="100">÷������2</td>
											<td class="MANTDM" width="245" colspan="2">
												<iframe name="iUpload2" height="25" width="245" src="/jsp/common/upload.jsp?file_path=UPLOAD_PATH" frameborder="0"></iframe>
											</td>
											<td class="MANTDM">
												<span id="file_span_2" style="display:none;">
													<span width ="100" style="cursor:hand" onClick="openFile(2)">
														<font color="blue" id=atch_file_nm_2></font>
													</span>&nbsp;
													<span style="cursor:hand" onClick="delFile(2)">
														<font color="red"><B>x</B></font>
													</span>
												</span>
												<span id="nbsp_span_2">&nbsp;</span>
											</td>
										</tr>
										<tr>
											<td class="MANTDT" width="100">÷������3</td>
											<td class="MANTDM" width="245" colspan="2">
												<iframe name="iUpload3" height="25" width="245" src="/jsp/common/upload.jsp?file_path=UPLOAD_PATH" frameborder="0"></iframe>
											</td>
											<td class="MANTDM">
												<span id="file_span_3" style="display:none;">
													<span width ="100" style="cursor:hand" onClick="openFile(3)">
														<font color="blue" id=atch_file_nm_3></font>
													</span>&nbsp;
													<span style="cursor:hand" onClick="delFile(3)">
														<font color="red"><B>x</B></font>
													</span>
												</span>
												<span id="nbsp_span_3">&nbsp;</span>
											</td>
										</tr>-->
										<tr>
											<td class="MANTDT" width="100">�����</td>
											<td class="MANTDM" width="145">
												<input type=text class=input_readonly readonly name="rg_nm" style="width:142;">
											</td>
											<td class="MANTDT" width="100">����Ͻ�</td>
											<td class="MANTDM" width="145">
												<input type=text class=input_readonly readonly name="rg_dtm" style="width:142;" format="DATET">
											</td>
										</tr>
										<tr>
											<td class="MANTDT">������</td>
											<td class="MANTDM">
												<input type=text class=input_readonly readonly name="mdf_nm" style="width:142;">
											</td>
											<td class="MANTDT">�����Ͻ�</td>
											<td class="MANTDM">
												<input type=text class=input_readonly readonly name="mdf_dtm" style="width:142;" format="DATET">
											</td>
										</tr>
									</ucare:table>
								</td>
							</tr>
							<tr>
								<td height="5"></td>
							</tr>
							<tr align="right">
								<td>
									<ucare:imgbtn width="70" name="btnBoardAdd"		kind="A" onClick="boardAdd()"/><!-- ��� -->
									<ucare:imgbtn width="70" name="btnBoardSave"	kind="S" onClick="boardSave()"/><!-- ���� -->
									<ucare:imgbtn width="70" name="btnBoardDel"		kind="D" onClick="boardDel()"/><!-- ���� -->
								</td>
							</tr>
						</table>
					</td>
					<td></td>
					<td valign="top">
						<table width="490" cellpadding="0" cellspacing="0" border="0">
							<tr>
								<td class="stitle">�Խñ� �������</td>
							</tr>
							<tr>
								<td>
									<ucare:grid id="UCSYS215S" width="490" height="210" no="true">
										<tr event="O">
											<td width="260" 	column="rply_cont" 	title="����" 			></td>
											<td width="60" 		column="rply_rg_nm" 		title="�ۼ���"		align="center"></td>
											<td width="130" 	column="rply_rg_dtm" 	title="�ۼ��Ͻ�"	align="center"></td>
											<td width="150" 	column="rply_seq"	title="rply_seq"	hidden="true"></td>
										</tr>
									</ucare:grid>
								</td>
							</tr>
							<tr>
								<td height="5"></td>
							</tr>
							<tr>
								<td>
									<ucare:table type="detail" width="490">
										<tr>
											<td class="MANTDM" width="490" colspan="3">
												<textarea name="rply_cont" class="input_required" required="true" requirednm="����" style="width:481; height:127;"></textarea>
											</td>
										</tr>
									</ucare:table>
								</td>
							</tr>
							<tr>
								<td height="5"></td>
							</tr>
							<tr align="right">
								<td>
									<ucare:imgbtn width="70" name="btnReplyAdd"		value="��� ���" onClick="replyAdd()"/>
									<ucare:imgbtn width="70" name="btnReplySave"	value="��� ����" onClick="replySave()"/>
									<ucare:imgbtn width="70" name="btnReplyDel"		value="��� ����" onClick="replyDel()"/>
								</td>
							</tr>
						</table>
					</td>
				</tr>
			</table>
		</td>
	</tr>
	</form>
	<!-- ���� E -->
</table>

</body>
</html>