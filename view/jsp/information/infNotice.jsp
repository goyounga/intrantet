<%@ page language="java" contentType="text/html; charset=EUC-KR"%>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=EUC-KR">
<title>공지사항</title>
<%@ include file="/jsp/include/include.jsp"%>
<script language="javascript" src="/html/js/information/infNotice.js"></script>
</head>
<body onload="init()" leftmargin="5">

<form name="fQuery" method="post" target="iLog" action="/common.do">
<input type="hidden" name="q_notice_sbjt">
<input type="hidden" name="q_notice_cont">
<input type="hidden" name="board_tp_seq" value="2"><!--2:공지사항-->
<table width="1225" cellpadding="0" cellspacing="0" border="0">
	<tr>
		<td height="5"></td>
	</tr>
		<td colspan=5>
			<ucare:table type="query" width="1215">
				<tr>
					<td width=80 align="right">등록일자&nbsp;</td>
					<td>
						<ucare:input type="text" name="q_datefrom" styleClass="input_text" width="65" required="false" requirednm="조회시작일" title="조회시작일" maxlength="10"  format="DATE" value='<%=CUtil.getMyDate(-1, "yyyy-MM-dd")%>'  tag="onKeyUp=\"pressEnter('queryList(this)')\""/><span class=calendar onclick="openCalendar('fQuery.q_datefrom',fQuery.q_datefrom.value)"></span>&nbsp;~
						<ucare:input type="text" name="q_dateto" styleClass="input_text" width="65" required="false" requirednm="조회종료일" title="조회종료일" maxlength="10" format="DATE" value="<%=CUtil.getDisplayDate(CDateUtil.getToday())%>" tag="onKeyUp=\"pressEnter('queryList(this)')\""/><span class=calendar onclick="openCalendar('fQuery.q_dateto',fQuery.q_dateto.value)"></span>
					</td>
					<td width="80" align="right">공지구분&nbsp;</td>
					<td>
						<ucare:select name="notice_type" brcode="COM014" styleClass="combo_text" option="10" width="100" />
					</td>
					<td width="80" align="right">검색어&nbsp;</td>
					<td>
						<table border=0 cellpadding=0 cellspacing=0>
							<tr>
								<td>
									<select name="searchtype" class="combo_text" style="width:60">
										<option value="q_notice_sbjt">제목</option>
										<option value="q_notice_cont">내용</option>
									</select>
								</td>
								<td width=3></td>
								<td>
									<ucare:input type="text" styleClass="input_text" name="searchstr" width="200" mode="active" tag="onKeyUp=\"pressEnter('queryList(this)')\""/>
								</td>
							</tr>
						</table>
					</td>
					<td width=80 align="right">등록자&nbsp;</td>
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
<input type="hidden" name="board_tp_seq" value="2"><!--2:공지사항-->
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
		<td class="stitle">공지사항 목록</td>
	</tr>
	<tr>
		<td valign="top">
			<ucare:grid id="UCINF126S" width="1225" height="328" crud="false" no="false">
				<tr event="O">
					<td width="40"	column="notice_seq" 		title="No."				align="center"></td>
					<td width="80"	column="notice_type_nm"		title="공지구분"	 	align="center" format="COMBO" brcode="COM014" option="0"></td>
					<td width="460"	column="notice_sbjt" 		title="제목" 			align="left" maxlength="1000"></td>
					<td width="40"	column="qry_cnt" 			title="조회수"			align="center"></td>
					<td width="80"	column="valid_strt_dt" 		title="유효시작일자"		align="center" format="DATE"></td>
					<td width="80"	column="valid_end_dt" 		title="유효종료일자"		align="center" format="DATE"></td>
					<td width="80"	column="rg_dt" 				title="등록일자"		align="center"></td>
					<td width="70"	column="rg_tm" 				title="등록시간"		align="center"></td>
					<td width="60"	column="rg_nm" 				title="등록자"			align="center"></td>
					<td width="80"	column="mdf_dt" 			title="수정일자"		align="center"></td>
					<td width="70"	column="mdf_tm" 			title="수정시간"		align="center"></td>
					<td width="66"	column="mdf_nm" 			title="수정자"			align="center"></td>

					<td width="0"	column="notice_type" 		title="notice_type"		align="center"></td>
					<td width="0"	column="rg_id" 				title="rg_id"			align="center"></td>
					<td width="0"	column="mdf_id" 			title="mdf_id"			align="center"></td>
				</tr>
			</ucare:grid>
		</td>
	</tr>
	<tr class=hmargin><td></td></tr>

	<tr><td><span class="stitle">공지사항 상세정보</span></td></tr>

	<tr>
		<td valign="top" width="100%">
			<ucare:table type="detail" width="100%">
				<tr>
					<td class=MANTDT width="100">공지구분</td>
					<td class=MANTDM width="200">
						<ucare:select name="notice_type" brcode="COM014" styleClass="combo_required" required="true" requirednm="공지구분" option="4" width="100" />
					</td>
					<td class=MANTDT width="100">유효게시일자</td>
					<td class=MANTDM width="200">
						<ucare:input type="text" name="valid_strt_dt" styleClass="input_text" width="65" required="true" requirednm="조회시작일" title="조회시작일" maxlength="10"  format="DATE" value='<%=CUtil.getDisplayDate(CDateUtil.getToday())%>'  tag="onKeyUp=\"pressEnter('queryList(this)')\""/><span class=calendar onclick="openCalendar('f.valid_strt_dt',f.valid_strt_dt.value)"></span>&nbsp;~
						<ucare:input type="text" name="valid_end_dt" styleClass="input_text" width="65" required="true" requirednm="조회종료일" title="조회종료일" maxlength="10" format="DATE" value="<%=CUtil.getMyDate(1, \"yyyy-MM-dd\")%>" tag="onKeyUp=\"pressEnter('queryList(this)')\""/><span class=calendar onclick="openCalendar('f.valid_end_dt',f.valid_end_dt.value)"></span>
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
					<td class=MANTDT>제목</td>
					<td class=MANTDM colspan=3>
						<ucare:input type="text" name="notice_sbjt" styleClass="input_required" required="true" requirednm="제목" width="495" mode="active" maxsize="100"/>
					</td>
				</tr>
				<tr>
					<td class=MANTDT>내용</td>
					<td class=MANTDM colspan="5" valign=top>
						<textarea name="notice_cont" styleClass="textarea_required" required="true" requirednm="내용" style="width:1110;height:250"></Textarea>
					</td>
				</tr>
				<tr>
					<td class=MANTDT style="height:25" width="105">등록자</td>
					<td class=MANTDM width="500" colspan=3>
						<span id="rg_info">&nbsp;</span>
					</td>
					<td class=MANTDT style="height:25" width="105">수정자</td>
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
					<td align="right"><ucare:imgbtn name="btnSendMail"	kind="R" 	value="메일전송" onClick="sendMail()"/></td>
				</tr>
			</table>
		</td>
	</tr>
</table>
</form>

<%@ include file="/jsp/include/include_car.jsp" %>
</body>
</html>
