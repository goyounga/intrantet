<%@ page language="java" contentType="text/html; charset=EUC-KR"%>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=EUC-KR">
<title>��������</title>
<%@ include file="/jsp/include/include.jsp"%>
<script language="javascript" src="/html/js/information/infNotice.js"></script>
</head>
<body onload="init()" leftmargin="5">

<form name="fQuery" method="post" target="iLog" action="/common.do">
<input type="hidden" name="q_notice_sbjt">
<input type="hidden" name="q_notice_cont">
<input type="hidden" name="board_tp_seq" value="2"><!--2:��������-->
<table width="1225" cellpadding="0" cellspacing="0" border="0">
	<tr>
		<td height="5"></td>
	</tr>
		<td colspan=5>
			<ucare:table type="query" width="1215">
				<tr>
					<td width=80 align="right">�������&nbsp;</td>
					<td>
						<ucare:input type="text" name="q_datefrom" styleClass="input_text" width="65" required="false" requirednm="��ȸ������" title="��ȸ������" maxlength="10"  format="DATE" value='<%=CUtil.getMyDate(-1, "yyyy-MM-dd")%>'  tag="onKeyUp=\"pressEnter('queryList(this)')\""/><span class=calendar onclick="openCalendar('fQuery.q_datefrom',fQuery.q_datefrom.value)"></span>&nbsp;~
						<ucare:input type="text" name="q_dateto" styleClass="input_text" width="65" required="false" requirednm="��ȸ������" title="��ȸ������" maxlength="10" format="DATE" value="<%=CUtil.getDisplayDate(CDateUtil.getToday())%>" tag="onKeyUp=\"pressEnter('queryList(this)')\""/><span class=calendar onclick="openCalendar('fQuery.q_dateto',fQuery.q_dateto.value)"></span>
					</td>
					<td width="80" align="right">��������&nbsp;</td>
					<td>
						<ucare:select name="notice_type" brcode="COM014" styleClass="combo_text" option="10" width="100" />
					</td>
					<td width="80" align="right">�˻���&nbsp;</td>
					<td>
						<table border=0 cellpadding=0 cellspacing=0>
							<tr>
								<td>
									<select name="searchtype" class="combo_text" style="width:60">
										<option value="q_notice_sbjt">����</option>
										<option value="q_notice_cont">����</option>
									</select>
								</td>
								<td width=3></td>
								<td>
									<ucare:input type="text" styleClass="input_text" name="searchstr" width="200" mode="active" tag="onKeyUp=\"pressEnter('queryList(this)')\""/>
								</td>
							</tr>
						</table>
					</td>
					<td width=80 align="right">�����&nbsp;</td>
					<td>
						<ucare:input type="text" name="q_rg_id" width="55" onBlur="userid_onBlur('q_rg_id')" mode="disabled" tag="onKeyDown=\"checkNotHangul()\" onKeyUp=\"pressEnter('queryList(this)')\"" maxlength="7"/>
						<ucare:input type="text" name="q_rg_nm" width="70" disable="true" mode="active"/>
						<span class="search" name="searchUser" onclick="openUserOrg('q_rg_id')"></span>
					</td>
					<td width=100>&nbsp;</td>
	 				<td width="70" align="right">
	 					 <ucare:imgbtn name="btnsearch" kind="R" onClick="queryList()"/>
	 				</td>
				</tr>
			</ucare:table>
		</td>
	</tr>
</form>
<form name="f" method="post" target="iLog" action="/common.do">
<input type="hidden" name="board_tp_seq" value="2"><!--2:��������-->
<input type="hidden" name="notice_seq">
<input type="hidden" name="qry_cnt">
<input type="hidden" name="rg_id">
<input type="hidden" name="rg_nm">
<input type="hidden" name="rg_dt">
<input type="hidden" name="rg_tm">
<input type="hidden" name="mdf_id">
<input type="hidden" name="mdf_nm">
<input type="hidden" name="mdf_dt">
<input type="hidden" name="mdf_tm">

<input type="hidden" name="userid" value="<%=sessioninfo.getUserID()%>">
<input type="hidden" name="usernm" value="<%=sessioninfo.getUserName()%>">
<input type="hidden" name="up_seq" value="">
<input type="hidden" name="prg_id" value="NOTICE">
<input type="hidden" name="file_nm">
<input type="hidden" name="new_file_nm">
<input type="hidden" name="notice_type_nm">
<input type="hidden" name="file_path"	value="<%=CIni.getParam("UPLOAD_PATH").asString()%>">

	<tr class=hmargin><td></td></tr>

	<tr>
		<td class="stitle">�������� ���</td>
	</tr>
	<tr>
		<td valign="top">
			<ucare:grid id="UCINF126S" width="1225" height="328" crud="false" no="false">
				<tr event="O">
					<td width="40"	column="notice_seq" 		title="No."				align="center"></td>
					<td width="80"	column="notice_type_nm"		title="��������"	 	align="center" format="COMBO" brcode="COM014" option="0"></td>
					<td width="460"	column="notice_sbjt" 		title="����" 			align="left" maxlength="1000"></td>
					<td width="40"	column="qry_cnt" 			title="��ȸ��"			align="center"></td>
					<td width="80"	column="valid_strt_dt" 		title="��ȿ��������"		align="center" format="DATE"></td>
					<td width="80"	column="valid_end_dt" 		title="��ȿ��������"		align="center" format="DATE"></td>
					<td width="80"	column="rg_dt" 				title="�������"		align="center"></td>
					<td width="70"	column="rg_tm" 				title="��Ͻð�"		align="center"></td>
					<td width="60"	column="rg_nm" 				title="�����"			align="center"></td>
					<td width="80"	column="mdf_dt" 			title="��������"		align="center"></td>
					<td width="70"	column="mdf_tm" 			title="�����ð�"		align="center"></td>
					<td width="66"	column="mdf_nm" 			title="������"			align="center"></td>

					<td width="0"	column="notice_type" 		title="notice_type"		align="center"></td>
					<td width="0"	column="rg_id" 				title="rg_id"			align="center"></td>
					<td width="0"	column="mdf_id" 			title="mdf_id"			align="center"></td>
				</tr>
			</ucare:grid>
		</td>
	</tr>
	<tr class=hmargin><td></td></tr>

	<tr><td><span class="stitle">�������� ������</span></td></tr>

	<tr>
		<td valign="top" width="100%">
			<ucare:table type="detail" width="100%">
				<tr>
					<td class=MANTDT width="100">��������</td>
					<td class=MANTDM width="200">
						<ucare:select name="notice_type" brcode="COM014" styleClass="combo_required" required="true" requirednm="��������" option="4" width="100" />
					</td>
					<td class=MANTDT width="100">��ȿ�Խ�����</td>
					<td class=MANTDM width="200">
						<ucare:input type="text" name="valid_strt_dt" styleClass="input_text" width="65" required="true" requirednm="��ȸ������" title="��ȸ������" maxlength="10"  format="DATE" value='<%=CUtil.getDisplayDate(CDateUtil.getToday())%>'  tag="onKeyUp=\"pressEnter('queryList(this)')\""/><span class=calendar onclick="openCalendar('f.valid_strt_dt',f.valid_strt_dt.value)"></span>&nbsp;~
						<ucare:input type="text" name="valid_end_dt" styleClass="input_text" width="65" required="true" requirednm="��ȸ������" title="��ȸ������" maxlength="10" format="DATE" value="<%=CUtil.getMyDate(1, \"yyyy-MM-dd\")%>" tag="onKeyUp=\"pressEnter('queryList(this)')\""/><span class=calendar onclick="openCalendar('f.valid_end_dt',f.valid_end_dt.value)"></span>
					</td>
					<td width=610 rowspan="2" colspan="2">
						<jsp:include page="/jsp/common/comUploadForm.jsp" flush="true">
							<jsp:param name="title_width"			value="100"/>
							<jsp:param name="fileBox_width"			value="489"/>
							<jsp:param name="fileListBox_width"		value="512"/>
							<jsp:param name="fileListBox_height"	value="52"/>
						</jsp:include>
					</td>
				</tr>
				<tr>
					<td class=MANTDT>����</td>
					<td class=MANTDM colspan=3>
						<ucare:input type="text" name="notice_sbjt" styleClass="input_required" required="true" requirednm="����" width="495" mode="active" maxsize="100"/>
					</td>
				</tr>
				<tr>
					<td class=MANTDT>����</td>
					<td class=MANTDM colspan="5" valign=top>
						<textarea name="notice_cont" styleClass="textarea_required" required="true" requirednm="����" style="width:1110;height:250"></Textarea>
					</td>
				</tr>
				<tr>
					<td class=MANTDT style="height:25" width="105">�����</td>
					<td class=MANTDM width="500" colspan=3>
						<span id="rg_info">&nbsp;</span>
					</td>
					<td class=MANTDT style="height:25" width="105">������</td>
					<td class=MANTDM width="500">
						<span id="mdf_info">&nbsp;</span>
					</td>
				</tr>
			</ucare:table>
		</td>
	</tr>
</table>

<table border=0 cellpadding=0 cellspacing=0 width="100%">
	<tr>
		<td align="right">
			<table cellpadding=2 cellspacing=0>
				<tr>
					<td align="right"><ucare:imgbtn name="btnAdd" kind="A" onClick="add()"/></td>
					<td align="right"><ucare:imgbtn name="btnSave" kind="S" onClick="checkSave()"/></td>
					<td align="right"><ucare:imgbtn name="btnDel" kind="D" onClick="del()"/></td>
					<td align="right"><ucare:imgbtn name="btnSendMail"	kind="R" 	value="��������" onClick="sendMail()"/></td>
				</tr>
			</table>
		</td>
	</tr>
</table>
</form>

<%@ include file="/jsp/include/include_car.jsp" %>
</body>
</html>
