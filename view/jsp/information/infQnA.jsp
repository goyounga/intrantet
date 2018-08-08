<!--
  PROJ   : Nexfron Intranet
  NAME   : infQnA.jsp
  DESC   : ������Ʈ Q&A
  Author : ���ر� ����
  VER    : 1.0
  Copyright 2009 Nexfron All rights reserved
  ============================================================================================
  								��		��		��		��
  ============================================================================================
  VERSION		DATE		AUTHOR		DESCRIPTION
  ============================================================================================
  1.0		2012.02.28		���ر�		����
  -->
<%@ page language="java" contentType="text/html; charset=EUC-KR"%>
<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=EUC-KR">
	<title>������ƮQ&A</title>
	<%@ include file="/jsp/include/include.jsp"%>
	<script language="javascript" src="/html/js/information/infQnA.js"></script>
	<script language="javascript">
	_editor_url = "/screditor/";
	_userid = "<%=sessioninfo.getUserID()%>";
	UPLOAD_IMG_PATH = "UPLOAD_IMG_PATH";
	UPLOAD_FOLDER_NAME = "board";
	</script>
	<style>
		.qna_view{border:1px solid #e3e3e3;height:100%;overflow-y:auto;padding:5 10 5 10}
		table.tblreply		{color:#BEB8AC; text-decoration:none; font-weight:bold; }
		table.tblreply	th	{padding:2 2 2 2; height:25px; text-align:center; color:#6A6252; background-color:#ECE8DD; border:0px solid #BEB8AC; font-weight:normal; }
		table.tblreply	td	{padding:2 2 2 2; height:25px; text-align:left;   color:#6A6252; background-color:#ECE8DD; border:0px solid #BEB8AC; }
		table.tblreply	td.rbtn	{text-align:right;border-top:1px solid #8D8F8E;border-right:1px solid #8D8F8E;border-left:1px solid #FFFFFF;border-bottom:1px solid #8D8F8E;vertical-align:bottom;}
	</style>
</head>
<body topmargin="0" leftmargin="5"  onload="init();">
<table width="1225" cellpadding="0" cellspacing="0" border="0" bordercolor="red">
	<tr>
		<td class="hmargin5"></td>
	</tr>
	<form name="fQuery">
	<tr>
		<td>
			<table class="tblSearch" width="100%">
				<col width="60"	/>
				<col width="200"/>
				<col width="60"	/>
				<col width="200"/>
				<col width="60" />
				<col width="70"/>
				<col width="60" />
				<col width="90"/>
				<col width="60" />
				<col width="" 	/>
				<col width="" 	/>
				<tr>
					<th>�������</th>
					<td>
						<ucare:search name="dt" type="TERM" width="70"
								formnm="fQuery"
								required="false"
								requirednm="�������"
								strtval="<%=CUtil.getCurrDate(\"yyyy-MM-dd\")%>"
								endval="<%=CUtil.getCurrDate(\"yyyy-MM-dd\")%>"
								format="DATE"
								pattern="D"
								onKeyPress="pressEnter('queryList()')">
						</ucare:search>
					</td>
					<th>������Ʈ</th>
					<td>
						<input type="hidden" name="prj_seq">
						<ucare:input type="text" name="prj_nm" width="150" readonly="true"/>
						<span class="search" onClick="openProject(fQuery)"></span>
						<span class="minus" onClick="del_Project(fQuery);"></span>
					</td>
					<th>ó������</th>
					<td><ucare:select name="q_proc_stat" brcode="INF001" option="10" width="65" /></td>
					<th>��������</th>
					<td><ucare:select name="quest_type" brcode="COM010" option="10" width="85" /></td>
					<th>�˻���</th>
					<td>
						<select name="query_keyword" style="width:65" class="combo_text">
							<option value="quest_title">����</option>
							<option value="quest_cntn">����</option>
							<option value="answ_cntn">�亯</option>
							<option value="quest_mn_nm">������</option>
						</select>
						<ucare:input type="text" name="query_keyword_value" width="130" onKeyPress="pressEnter('queryList()')"/>
					</td>
					<td class="rbtn" width="70" align="center"><ucare:imgbtn name="btnQuery" kind="R" onClick="queryList()"/></td>
				</tr>
			</table>
		</td>
	</tr>
	<tr><td class="hmargin5"></td></tr>
	</form>
	<form name="fList">
	<tr id="trList">
		<td>
			<table cellpadding="0" cellspacing="0" border="0" width="100%">
				<tr>
					<td class="stitle">���� ���</td>
				</tr>
				<tr>
					<td>
						<ucare:grid id="UCINF218S" width="100%" height="712" no="false">
							<tr event="O,D">
								<td width="50" 	column="qna_seq" 		title="��ȣ" 		align="center" />
								<td width="0"	column="prj_seq" 		title="prj_seq" 	hidden="true" />
								<td width="190" column="prj_nm" 		title="������Ʈ" 	/>
								<td width="80"	column="quest_type" 	title="��������"	align="center" format="COMBO" brcode="COM010" />
								<td width="523" column="quest_title" 	title="��������"	/>
								<td width="0"	column="quest_mn_id" 	title="������ID"	hidden="true" />
								<td width="80"	column="quest_mn_nm" 	title="������"		align="center" />
								<td width="80"	column="proc_stat" 		title="����"		align="center"  format="COMBO" brcode="INF001"/>
								<td width="120"	column="reg_dt" 		title="����Ͻ�"	align="center" />
								<td width="50"	column="qry_cnt" 		title="��ȸ"		align="center" />
								<td width="50"	column="rply_cnt" 		title="���"		align="center" />
							</tr>
						</ucare:grid>

					</td>
				</tr>
			</table>
		</td>
	</tr>
	</form>
	<form name="fQuest">
	<tr id="trDetail" style="display:none">
		<td>
			<table cellpadding="0" cellspacing="0" border="0" width="100%">
				<tr>
					<td class="stitle">���� ������</td>
				</tr>
				<tr>
					<td>
						<table class="tblData" width="100%">
							<col width="80"	/>
							<col width=""	/>
							<col width="80"	/>
							<col width="100"/>
							<col width="50"	/>
							<col width="50"	/>
							<col width="80"	/>
							<col width="85"/>
							<col width="80"	/>
							<col width="130"/>
							<input type="hidden" name="userid" value="<%=sessioninfo.getUserID()%>">
							<input type="hidden" name="usergradecd" value="<%=sessioninfo.getUserGradeCD()%>">
							<tr>
								<th>����</th>
								<td ><ucare:input type="text" name="quest_title" width="439" required="true" requirednm="����" mode="active" maxsize="100"/></td>
								<th>ó������</th>
								<td><ucare:input type="text" name="proc_stat_nm" width="96" styleClass="input_transparent" readonly="true" tag="style=\"text-align:center;font-weight:bold;color:#3C9EDF\""/></td>
								<th>�۹�ȣ</th>
								<td><ucare:input type="text" name="qna_seq"  width="48" styleClass="input_transparent" readonly="true" tag="style=\"text-align:center;font-weight:bold;color:#3C9EDF\""/></td>
								<th>������</th>
								<td>
									<ucare:input type="text" name="quest_mn_nm" width="80" styleClass="input_transparent" readonly="true" tag="style=\"text-align:center;\"" />
									<input type="hidden" name="quest_mn_id" >
								</td>
								<th>����Ͻ�</th>
								<td style="text-align:center;"><ucare:input type="text" name="reg_dt" width="115" styleClass="input_transparent" readonly="true" /></td>
							</tr>
							<tr>
								<th>������Ʈ</th>
								<td>
									<input type="hidden" name="prj_seq">
									<ucare:input type="text" name="prj_nm" width="390" readonly="true" required="true" requirednm="������Ʈ" />
									<span class="search" onClick="openProject(fQuest)"></span>
									<span class="minus" onClick="del_Project(fQuest);"></span>
								</td>
								<th>��������</th>
								<td><ucare:select name="quest_type" brcode="COM010" option="4" width="96" required="true" requirednm="��������" /></td>
								<th>��ȸ</th>
								<td><ucare:input type="text" name="qry_cnt" width="48" styleClass="input_transparent" readonly="true" tag="style=\"text-align:center;\"" /></td>
								<th>�亯��</th>
								<td><ucare:input type="text" name="answ_mn_nm" width="80" styleClass="input_transparent" readonly="true" tag="style=\"text-align:center;\"" /></td>
								<th>�亯�Ͻ�</th>
								<td style="text-align:center;"><ucare:input type="text" name="answ_dt" width="115" styleClass="input_transparent" readonly="true" /></td>
							</tr>
						</table>
					</td>
				</tr>
				<tr><td class="hmargin5"></td></tr>
				<tr>
					<td>
						<table class="tblData" >
							<tr >
								<th style="width:610;" >��������</th>
								<th style="width:610;" >�亯����</th>
							</tr>
							<tr id="trQuest" >
								<td id="tdViewQuest" style="width:610px;height:627px;display:">
									<div id="view_quest_cntn" class="qna_view"></div>
								</td>
								<td id="tdEditQuest" style="width:610px;height:627px;display:none">
									<textarea name="quest_cntn" class="input_textarea_required" required="true" requirednm="��������" style="width:100%;height:580px;" maxlength="500"></textarea>
								</td>
								<td id="tdViewAnswer" style="width:610px;display:">
									<div id="divViewAnswer" class="qna_view">
										<label style="height:470px" id="view_answ_cntn" ></label>
										<label style="height:10"></label>
										<label id="qna_reply" style="display:">
											<table class="tblreply" width="100%">
												<tr><th style="height:20px"><label style='width:96%;background: url(<%=scriptPath%>/images/common/dotline.gif) repeat-x left;'></label></th></tr>
											</table>
											<table class="tblreply" width="100%" id="tblReplyList">
												<col width="80"/>
												<col width=""/>
											</table>
											<table class="tblreply" width="100%" id="tblReplyReg">
												<col width="80"/>
												<col width=""/>
												<tr>
													<th><%=sessioninfo.getUserName()%></th>
													<td style="padding:0 10 0 0"><textarea name="rply_cntn" class="input_textarea_text" required="false" requirednm="����" style="width:100%;height:80"></textarea></td>
												</tr>
												<tr>
													<td colspan="2" style="text-align:right;padding:5 10 10 0"><ucare:imgbtn name="btnReplyReg" width="50"	type="G" kind="S" onClick="replyInsert()"/></td>
												</tr>
											</table>
										</label>
									</div>
								</td>
								<td id="tdEditAnswer" style="width:610px;display:none">
									<textarea name="answ_cntn" class="input_textarea_required" required="false" requirednm="�亯����" style="width:100%;height:580px;" maxlength="500"></textarea>
								</td>
							</tr>
						</table>
					</td>
				</tr>
			</table>
		</td>
	</tr>
	<tr><td class="hmargin5"></td></tr>
	<tr>
		<td align="right">
			<table class="tbl_button" border="0" cellpadding="0" cellspacing="0" bordercolor="red">
				<tr id="trBtnList" >
					<td align="right"><ucare:imgbtn name="btnAddQuest" 		kind="A" onClick="addQuest()"	 	value="���"/></td>
				</tr>
				<tr id="trBtnView" style="display:none">
					<td align="right" id="tdQstUpdate" style="display:none"><ucare:imgbtn name="btnUpdateQuest" 	kind="U" onClick="updateQuest()" 	value="����" type="G"/></td>
					<td align="right" id="tdQstUpdate" style="display:none"><ucare:imgbtn name="btnDeleteQuest" 	kind="D" onClick="deleteQuest()" 	value="����" type="G"/></td>
					<td align="right" id="tdAnsUpdate" style="display:none"><ucare:imgbtn name="btnUpdateAnswer" 	kind="U" onClick="updateAnswer()" 	value="�亯" /></td>
					<td align="right"><ucare:imgbtn name="btnViewList" 		kind="C" onClick="viewList()" 			value="���" /></td>
				</tr>
				<tr id="trBtnQuestEdit" style="display:none">
					<td align="right"><ucare:imgbtn name="btnSaveQuest"		kind="S" onClick="saveQuest()"	 		value="����" type="B"/></td>
					<td align="right"><ucare:imgbtn name="btnCancelQuest" 	kind="C" onClick="cancelQuest()" 		value="���" type="B"/></td>
					<td style="width:610"></td>
				</tr>
				<tr id="trBtnAnswerEdit" style="display:none">
					<td align="right"><ucare:imgbtn name="btnSaveAnswer"	kind="S" onClick="saveAnswer('TEMP')"	value="�ӽ�����" type="B"/></td>
					<td align="right"><ucare:imgbtn name="btnSaveAnswer"	kind="S" onClick="saveAnswer('CMPT')"	value="�Ϸ�" type="B"/></td>
					<td align="right"><ucare:imgbtn name="btnCancelAnswer"	kind="C" onClick="cancelAnswer()"		value="���" type="B"/></td>
				</tr>
			</table>
		</td>
	</tr>
	</form>
</table>
<%@ include file="/jsp/include/include_car.jsp" %>
</body>
</html>