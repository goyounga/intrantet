<!--
  PROJ : Nexfron Intranet
  NAME : sysWeeklyRptMng.jsp
  DESC : 자료공유 - 게시판 화면
  Author : 김은수 과장
  VER  : 1.0
  Copyright 2009 Nexfron All rights reserved
  ============================================================================================
  								변		경		사		항
  ============================================================================================
  VERSION		DATE		AUTHOR		DESCRIPTION
  ============================================================================================
  1.0		2009.08.19		김은수		주석추가
  -->

<%@ page language="java" contentType="text/html; charset=EUC-KR"%>
<%@ include file="/jsp/include/include.jsp"%>
<html>
<head>
	<title>게시판</title>
	<script language="javascript" src="/html/js/information/infBoardList.js"></script>
	<script language="javascript">
	_editor_url = "/screditor/";
	_userid = "<%=sessioninfo.getUserID()%>";
	UPLOAD_IMG_PATH = "UPLOAD_IMG_PATH";
	UPLOAD_FOLDER_NAME = "board";
	</script>
</head>
<body topmargin="0" leftmargin="5"  onLoad="init()">
<!--<div style="position:absolute;left:840px;top:5px;z-index:2;">
읽기권한 :&nbsp;<span id="r_auth_span">□</span><label>&nbsp;|&nbsp;</label>
쓰기권한 :&nbsp;<span id="w_auth_span">□</span>
</div>-->
<table width="1225" cellpadding="0" cellspacing="0" border="0">
	<tr>
		<td height="5"></td>
	</tr>

	<!-- 검색조건 S -->
	<form name="fQuery" method="post">
	<input type="hidden" name="gradecd" value="<%=sessioninfo.getUserGradeCD()%>">
	<input type="hidden" name="search" value="">
	<input type="hidden" name="board_tp_seq" value="">
	<input type="hidden" name="userid" value="<%=sessioninfo.getUserID()%>">
	
	<tr>
		<td>
			<ucare:table type="query" width="1215">
				<tr>
					<td width="80" align="right">등록일자 :&nbsp;</td>
					<td width="220">
						<ucare:input type="text" name="startdt" width="70" title="시작일" format="DATE" value="<%=CUtil.getMyDate(-12, \"yyyy-MM-dd\")%>" pattern="D" required="true" requirednm="시작일" maxlength="10" tag="onKeyUp=\"pressEnter('queryList(this)')\""/>
						<span class=calendar onclick="openCalendar('fQuery.startdt' , fQuery.startdt.value)"></span>&nbsp;
						~&nbsp;
						<ucare:input type="text" name="enddt" width="70" title="종료일" format="DATE" value="<%=CUtil.getMyDate(0, \"yyyy-MM-dd\")%>" pattern="D" required="true" requirednm="종료일" maxlength="10" tag="onKeyUp=\"pressEnter('queryList(this)')\""/>
						<span class=calendar onclick="openCalendar('fQuery.enddt' , fQuery.enddt.value)"></span>
					</td>
					<td width="80" align="right">검색조건 :&nbsp;</td>
					<td width="200">
						<select name="searchType" class="combo_text">
							<option value=""> == 선택 == </option>
							<option value="B.USER_ID">작성자ID</option>
							<option value="B.USER_NM">작성자명</option>
							<option value="A.BOARD_SBJT">제목</option>
							<option value="A.BOARD_CONT">내용</option>
						</select>
						<input type=text class="input_text" name="searchText" size=15 onkeyup="return(isEnterKey()? queryList():false);" >
					</td>
					<td>&nbsp;</td>
					<td width="1" bgcolor=#CCCCCC></td>
					<td width="75" align="right">
						<ucare:imgbtn name="btnQuery"	value="조회"	onClick="queryList()"/><!-- 조회 -->
					</td>
				</tr>
			</ucare:table>
		</td>
	</tr>
	</form>
	<!-- 검색조건 E -->

	<tr>
		<td height="5"></td>
	</tr>
	
	<!-- 본문 S -->
	<form name="f" method="post">
	<input type="hidden" name="userid" value="<%=sessioninfo.getUserID()%>">
	<input type="hidden" name="board_seq" value="">
	<input type="hidden" name="rply_seq" value="">
	<input type="hidden" name="rg_id" value="">
	
	<input type="hidden" name="up_seq" value="">
	<input type="hidden" name="prg_id" value="BOARD">
	<input type="hidden" name="file_nm">
	<input type="hidden" name="new_file_nm">
	<input type="hidden" name="file_path"	value="<%=CIni.getParam("UPLOAD_PATH").asString()%>">

	<ucare:table type="tab" width="100" name="게시판 목록,상세정보" id="Tab">
		<tr id="divTab" style="display:" align="center">
			<td>
				<table width="1225" cellpadding="0" cellspacing="0" border="0">
					<col width="250"/>
					<col width="5"/>
					<col width="970"/>
					
					<tr>
						<td valign="top">
							<table cellpadding="0" cellspacing="0" border="0">
								<tr>
									<td class="stitle">게시판 목록</td>
								</tr>
								<tr>
									<td>
										<ucare:grid id="UCINF117S" width="250" height="700" no="true">
											<tr event="O">
												<td width="210" column="board_nm"		title="게시판명"></td>
												<td width="0" 	column="board_tp_seq"	hidden="true"></td>
											</tr>
										</ucare:grid>
									</td>
								</tr>
							</table>
						</td>
						<td></td>
						<td>
							<table cellpadding="0" cellspacing="0" border="0">
								<tr>
									<td class="stitle">글 목록</td>
								</tr>
								<tr>
									<td>
										<ucare:grid id="UCINF214S" width="970" height="700" no="true">
											<tr event="D">
												<td width="0" 	column="rnum"			hidden="true"		title="자료순번"></td>
												<td width="0" 	column="board_seq"		hidden="true"		title="게시판순번"></td>
												<td width="0" 	column="board_tp_seq"	hidden="true"		title="게시판종류순번"></td>
												<td width="100" column="board_nm"		title="게시판종류"></td>
												<td width="0" 	column="rg_id" 			hidden="true"		title="작성자ID"></td>
												<td width="430" column="board_sbjt" 	title="제목"></td>
												<td width="75" 	column="qry_cnt" 		title="조회수" 		align="center"></td>
												<td width="75" 	column="rply_cnt"		title="댓글수"		align="center"></td>
												<td width="100" column="rg_nm" 			title="작성자"		align="center"></td>
												<td width="150" column="rg_dtm" 		title="작성일시"	align="center"></td>
											</tr>
										</ucare:grid>
									</td>
								</tr>
							</table>
						</td>
					</tr>	
				</table>
			</td>
		</tr>
		<tr id="divTab" style="display:" align="center">
			<td>
				<table width="1225" cellpadding="0" cellspacing="0" border="0">
					<col width="880"/>
					<col width="5"/>
					<col width="340"/>
					
					<tr>
						<td align="top">
							<table cellpadding="0" cellspacing="0" border="0">
								<tr>
									<td class="stitle">게시글 상세정보</td>
								</tr>
								<tr>
									<td>
										<ucare:table type="detail" width="880">
											<tr>
												<td class="MANTDT" width="70">게시판명</td>
												<td class="MANTDM" width="390">
													<ucare:select name="board_tp_seq" option="4" tag="required='true' requirednm='게시판명'" code="board_tp_seq" codename="board_nm"  width="150" styleClass="combo_required" onChange="getBoardAuth()"/>
												</td>
												<td width=410 rowspan="2" colspan="2">
													<jsp:include page="/jsp/common/comUploadForm.jsp" flush="true">
														<jsp:param name="title_width"			value="100"/>
														<jsp:param name="fileBox_width"			value="189"/>
														<jsp:param name="fileListBox_width"		value="315"/>
														<jsp:param name="fileListBox_height"	value="52"/>
														<jsp:param name="minus_width"			value="340"/>
													</jsp:include>
												</td>
											</tr>
											<tr>
												<td class="MANTDT">제목</td>
												<td class="MANTDM">
													<input type=text class="input_required" requirednm="제목" name="board_sbjt" style="width:100%;" maxlength="50">
												</td>
											</tr>
											<tr id="cont_read_tr" style="display:">
												<td class="MANTDT">내용</td>
												<td class="MANTDM" colspan="3">
													<div style="background-color:#FFFFFF;overflow:auto;width:100%;height:574px">
														<label id="board_cont_html"></label>
													</div>
												</td>
											</tr>
											<tr id="cont_edit_tr" style="display:none">
												<td class="MANTDT">내용</td>
												<td class="MANTDM" colspan="3">
													<textarea class="input_required" name="board_cont" tag="required='true' requirednm='내용'" style="width:100%;height:548;"></textarea>
													<SCRIPT language=javascript>
														function editor()
														{
															//onload시에 edit프레임이 생기지 않으므로 onload 시 여기부터 호출해서 다 생신 후 init2를 호출해 초기화를 한다.
															if(editor_generate('board_cont'))
															{
																init2();
															}
														}
													</SCRIPT>
												</td>
											</tr>
											<tr>
												<td class="MANTDT">등록자</td>
												<td class="MANTDM">
													<input type=text class=input_readonly readonly name="rg_nm" style="width:142;">
												</td>
												<td class="MANTDT">등록일시</td>
												<td class="MANTDM" width="300">
													<input type=text class=input_readonly readonly name="rg_dtm" style="width:142;" format="DATET">
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
										<ucare:imgbtn name="btnBoardAdd"	kind="A" 	value="새글추가"		onClick="boardAdd()"/><!-- 등록모드변경 -->
										<ucare:imgbtn name="btnBoardEdit"	kind="R" 	value="편집하기"		onClick="boardEdit()"/><!-- 수정모드변경 -->
										<ucare:imgbtn name="btnBoardSave"	kind="S" 	onClick="checkSave()"/><!-- 저장 -->
										<ucare:imgbtn name="btnBoardDel"	kind="D" 	onClick="boardDel()"/><!-- 삭제 -->
										<ucare:imgbtn name="btnSendMail"	kind="R" 	value="메일전송" onClick="sendMail()"/><!-- 메일전송 -->
									</td>
								</tr>
							</table>
						</td>
						<td></td>
						<td valign="top">
							<table cellpadding="0" cellspacing="0" border="0">
								<tr>
									<td class="stitle">게시글 댓글정보</td>
								</tr>
								<tr>
									<td>
										<ucare:grid id="UCINF215S" width="340" height="550" no="true">
											<tr event="O">
												<td width="50" 		column="rply_rg_nm" 	title="작성자"		align="center"></td>
												<td width="300" 	column="rply_cont" 		title="내용"></td>
												<td width="120" 	column="rply_rg_dtm" 	title="작성일시"	align="center"></td>
												<td width="150" 	column="rply_seq"		title="rply_seq"	hidden="true"></td>
											</tr>
										</ucare:grid>
									</td>
								</tr>
								<tr>
									<td height="5"></td>
								</tr>
								<tr>
									<td>
										<ucare:table type="detail" width="340">
											<tr>
												<td class="MANTDM" colspan="3">
													<textarea name="rply_cont" class="input_required" required="true" requirednm="내용" style="width:100%; height:80;" maxlength="1000"></textarea>
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
										<ucare:imgbtn name="btnReplyAdd"	value="댓글등록" onClick="replyAdd()"/>
										<ucare:imgbtn name="btnReplySave"	value="댓글저장" onClick="replySave()"/>
										<ucare:imgbtn name="btnReplyDel"	value="댓글삭제" onClick="replyDel()"/>
									</td>
								</tr>
							</table>
						</td>
					</tr>
					<!---->
				</table>
			</td>
		</tr>
	</ucare:table>
	</form>				
	
	<!-- 본문 E -->
</table>
<%@ include file="/jsp/include/include_car.jsp" %>
</body>
</html>