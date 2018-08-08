<!--
  PROJECT : INTRANET
  NAME    : infNoticeHomePage.jsp
  DESC    : 홈페이지공지 관리
  AUTHOR  : 박준규 과장
  VERSION : 1.0
  Copyright ⓒ 2010 Nexfron. All rights reserved.
  ============================================================================================
  							변		경		사		항
  ============================================================================================
  VERSION	   DATE		  	AUTHOR		DESCRIPTION
  ============================================================================================
  1.0		2011.10.20		박준규 		개발
  -->
<%@ page language="java" contentType="text/html; charset=EUC-KR"%>
<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=EUC-KR">
	<title>홈페이지공지</title>
	<%@ include file="/jsp/include/include.jsp"%>
	<script language="javascript" src="<%=scriptPath%>/js/information/infNoticeHomePage.js"></script>
	<link rel="stylesheet" href = "/html/style/ucareStyle.css" type = "text/css">
</head>
<body class="mainbody" onload="init()" >
<table width="100%" cellpadding="0" cellspacing="0" border="0" bordercolor="red">
	<tr>
		<td class="hmargin5"></td>
	</tr>
	<tr>
		<td valign="top">
			<table width="100%" cellpadding="0" cellspacing="0" border="0" bordercolor="red">
				<tr>
					<td class="stitle">홈페이지 게시판</td>
				</tr>
				<tr>
					<td>
						<form name="fQuery" method="post" onsubmit="return false;">
						<input type="hidden" name="board_tp_seq" value="16"><!--16:홈페이지공지-->
						<table class="tblSearch" width="560">
							<col width="150"/>
							<col width="80"	/>
							<col width=""/>
							<col width=""/>
							<tr>
								<td rowspan="5" valign="top">
									<ucare:grid id="UCINF210S" width="150" height="116" no="false">
										<tr event="O">
											<td width="25" 	column="lup_ord" 		title="No" 				align="center"></td>
											<td width="106" column="board_nm" 		title="게시판명"		align="center"></td>
											<td width="0" 	column="board_tp_seq" 	title="게시판유형순번"	align="center" hidden="true"></td>
										</tr>
									</ucare:grid>
								</td>
							</tr>
							<tr>
								<th>등록일자</th>
								<td colspan="2">
									<ucare:input type="text" name="q_datefrom" width="70" required="false" requirednm="조회시작일" title="조회시작일" maxlength="10" format="DATE" value='<%=CUtil.getMyDate(-12, "yyyy-MM-dd")%>'         tag="onKeyUp=\"pressEnter('queryList(this)')\""/><span class=calendar onclick="openCalendar('fQuery.q_datefrom',fQuery.q_datefrom.value)"></span>&nbsp;~
									<ucare:input type="text" name="q_dateto"   width="70" required="false" requirednm="조회종료일" title="조회종료일" maxlength="10" format="DATE" value="<%=CUtil.getDisplayDate(CDateUtil.getToday())%>" tag="onKeyUp=\"pressEnter('queryList(this)')\""/><span class=calendar onclick="openCalendar('fQuery.q_dateto'  ,fQuery.q_dateto.value)"  ></span>
								</td>
							</tr>
							<tr>
								<th>공지구분</th>
								<td colspan="2"><ucare:select name="notice_type" width="70" brcode="COM014" option="10"/></td>
							</tr>
							<tr>
								<th>등록자</th>
								<td colspan="2">
									<ucare:input type="text" name="q_rg_id" width="70" onBlur="userid_onBlur('q_rg_id')" mode="disabled" tag="onKeyDown=\"checkNotHangul()\" onKeyUp=\"pressEnter('queryList(this)')\"" maxlength="7"/>
									<ucare:input type="text" name="q_rg_nm" width="110" disable="true" mode="active"/>
									<span class="search" name="searchUser" onclick="openUserOrg('q_rg_id')"></span>
								</td>
							</tr>
							<tr>
								<th>검색어</th>
								<td>
									<select name="searchtype" style="width:70" class="combo_text" >
										<option value="q_notice_sbjt">제목</option>
										<option value="q_notice_cont">내용</option>
									</select>
									<ucare:input type="text" name="searchstr" width="135" mode="active" tag="onKeyUp=\"pressEnter('queryList(this)')\""/>
								</td>
								<td class="rbtn">
									<ucare:imgbtn name="btnsearch" kind="R" onClick="queryList()" width="60"/>
								</td>
							</tr>
						</table>
						</form>
					</td>
				</tr>
				<tr>
					<td class="hmargin5"></td>
				</tr>
				<tr>
					<td>
						<table cellpadding="0" cellspacing="0" border="0" bordercolor="blue">
							<tr>
								<td class="stitle"><span id="board_title">홈페이지공지</span></td>
							</tr>
							<tr>
								<td valign="top">
									<ucare:grid id="UCINF126S" width="558" height="632" crud="false" no="false">
										<tr event="O">
											<td width="40"	column="notice_seq" 		title="번호"			align="center"></td>
											<td width="60"	column="notice_type" 		title="공지구분"		align="center" format="COMBO" brcode="COM014"></td>
											<td width="318"	column="notice_sbjt" 		title="제목" 			align="left" maxlength="1000"></td>
											<td width="40"	column="qry_cnt" 			title="조회"			align="center"></td>
											<td width="80"	column="rg_dt" 				title="작성일"			align="center" ></td>
											<td width="60"	column="rg_nm" 				title="작성자"			align="center"></td>
											<td width="80"	column="rg_tm" 				title="작성시간"		align="center" format="TIME"></td>
											<td width="60"	column="mdf_nm" 			title="수정자"			align="center"></td>
											<td width="80"	column="mdf_dt" 			title="수정일자"		align="center" ></td>
											<td width="80"	column="mdf_tm" 			title="수정시간"		align="center" format="TIME"></td>
											<td width="0"	column="valid_strt_dt" 		title="유효시작일자"	align="center" format="DATE" hidden="true"></td>
											<td width="0"	column="valid_end_dt" 		title="유효종료일자"	align="center" format="DATE" hidden="true"></td>
											<td width="0"	column="rg_id" 				title="rg_id"			align="center"></td>
											<td width="0"	column="mdf_id" 			title="mdf_id"			align="center"></td>
											<td width="0"	column="notice_cont" 		title="내용"			align="center"></td>
											<td width="0"	column="board_tp_seq" 		title="게시판유형순번"	align="center"></td>
											<td width="0"	column="pwd" 				title="pwd"				align="center"></td>
										</tr>
									</ucare:grid>
								</td>
							</tr>
						</table>
					</td>
				</tr>
			</table>
		<td style="width:10px"></td>
		<td valign="top" width="670" >
			<form name="f" method="post" onsubmit="return false;">
			<input type="hidden" name="userid" value="<%=sessioninfo.getUserID()%>">
			<input type="hidden" name="usernm" value="<%=sessioninfo.getUserName()%>">
			<table cellpadding="0" cellspacing="0" border="0" width="670" bordercolor="blue" >
				<tr>
					<td><span class="stitle">상세정보</span></td>
				</tr>
				<tr>
					<td valign="top">
						<table class="tblData" width="670">
							<col width="60">
							<col width="55">
							<col width="60">
							<col width="105">
							<col width="60">
							<col width="105">
							<col width="60">
							<col width="">
							<tr>
								<th>글번호</th>
								<td><ucare:input type="text" name="notice_seq" width="53" styleClass="input_transparent" readonly="true" tag="style=\"text-align:center;font-weight:bold;padding:3 0 0 3;color:#3C9EDF\""/></td>
								<th>게시판</th>
								<td><ucare:select name="board_tp_seq" brcode="" queryid="UCINF131S" code="board_tp_seq" codename="board_nm" required="true" requirednm="게시판" option="4" width="150" onChange="setBoardType();"/></td>
								<th>공지구분</th>
								<td><ucare:select name="notice_type" brcode="COM014" required="true" requirednm="공지구분" option="4" width="100"/></td>
								<th>조회</th>
								<td>&nbsp;<ucare:input type="text" name="qry_cnt" width="50" styleClass="input_transparent" readonly="true"/></td>
							</tr>
							<tr>
								<th>제목</th>
								<td colspan="7"><ucare:input type="text" name="notice_sbjt" required="true" requirednm="제목" width="100%" mode="active" maxsize="100"/></td>
							</tr>
							<tr height="300">
								<th>내용</th>
								<td colspan="7"><textarea name="notice_cont" styleClass="textarea_required" required="true" requirednm="내용" style="width:100%;height:297"></Textarea></td>
							</tr>
							<tr>
								<th>비밀번호</th>
								<td colspan="7"><ucare:input type="password" name="pwd" width="45%" required="false" requirednm="비밀번호"/></td>
							</tr>
							<tr>
								<th>작성자</th>
								<td colspan="3">&nbsp;<input type="hidden" name="rg_id"><ucare:input type="text" name="rg_nm" width="230" styleClass="input_transparent" readonly="true"/></td>
								<th>작성일시</th>
								<td colspan="3">
									<input type="hidden" name="rg_dt">
									<input type="hidden" name="rg_tm">
									&nbsp;<ucare:input type="text" name="rg_dt_tm" width="230" styleClass="input_transparent" readonly="true"/>
								</td>
							</tr>
							<tr>
								<th>수정자</th>
								<td colspan="3">&nbsp;<input type="hidden" name="mdf_id"><ucare:input type="text" name="mdf_nm" width="230" styleClass="input_transparent" readonly="true"/></td>
								<th>수정일시</th>
								<td colspan="3">
									<input type="hidden" name="mdf_dt">
									<input type="hidden" name="mdf_tm">
									&nbsp;<ucare:input type="text" name="mdf_dt_tm" width="230" styleClass="input_transparent" readonly="true"/>
								</td>
							</tr>
						<!--/table-->
						<!--comUploadForm.jsp start-->
						<!--table class="tblData" border=0 cellpadding=0 cellspacing=0 width=670 height=87-->
							<tr >
								<script language="javascript">defaultBoxHeight = (80);</script>
								<script language="javascript" src="/html/js/common/comUploadForm.js"></script>
								<input type="hidden" name="minus_width" value="1"/>
								<input type="hidden" name="file_nm">
								<input type="hidden" name="new_file_nm">
								<input type="hidden" name="up_seq" value="">
								<input type="hidden" name="prg_id" value="HOME_BOARD">
								<th width="60" style="height:87">
									첨부파일
									<br>
									<span id="icoUploadFiles" style="display:"     class="search" onclick="uploadFileDisabled(true);"></span>
									<span id="icoShowFiles"   style="display:none" class="doc"    onclick="uploadFileDisabled(false);"></span>
									<br><br>
									<span id="icoBig"   class="big"   onclick="expandUploadFile()"></span>
									<span id="icoSmall" class="small" onclick="contractUploadFile()"></span>
								</th>
								<td id="uploadFileArea" colspan="7">
									<!-- 첨부파일이 없을 경우 첨부파일 선택 폼 보이기-->
									<div id="divUploadFile" style="position:absolute;top:0;left:634; width=101%">
										<table class="tblData" border=0 cellpadding=0 cellspacing=0 width="100%">
											<tr>
												<td width="97%"><iframe name="iUpload" height="75" width="100%" src="/jsp/common/multiUpload.jsp?ftp_send=false" frameborder="0" scrolling="yes" style="border:1px solid #CCCCCC;padding-left:1px"></iframe></td>
												<td class="rbtn" valign=top style="padding:1 0 0 0;border-left-color:FFFFFF;">
													<span class="plus" 	onclick="addFileBox();"></span><br>
													<span class="clear" onclick="removeFileBox();"></span>
												</td>
											</tr>
										</table>
									</div>
									<!-- 첨부파일이 있을 경우 첨부파일 다운로드 폼 보이기 -->
									<div id="divUploadFile" style="display:none;position:absolute;top:0;left:634;overflow-y:scroll;width:101%;background-Color:white"><iframe frameborder=0 width=100% height=100%></iframe></div>
									<div id="divUploadFile" style="display:none;position:absolute;top:0;left:634;overflow-y:scroll;width:101%;background-Color:white;border:1px solid #597992"></div>
									<iframe name="iDownFile" width=0 height=0></iframe>
								</td>
							</tr>
						</table>
						<!--comUploadForm.jsp end-->
					</td>
				</tr>
				<tr><td class="hmargin"></td></tr>
				<tr>
					<td align="right">
						<table class="tbl_button" border="0" cellpadding="0" cellspacing="0" >
							<tr id="btnList" >
								<td align="right"><ucare:imgbtn name="btnAdd" 	kind="A" onClick="addItem()"/></td>
								<td align="right"><ucare:imgbtn name="btnUpd" 	kind="U" onClick="updateItem()"/></td>
								<td align="right"><ucare:imgbtn name="btnDel" 	kind="D" onClick="delItem()"/></td>
							</tr>
							<tr id="btnDetail" style="display:none">
								<td align="right"><ucare:imgbtn name="btnSave" 	kind="S" onClick="checkFile()"/></td>
								<td align="right"><ucare:imgbtn name="btnCan" 	kind="C" onClick="cancel()"/></td>
							</tr>
						</table>
					</td>
				</tr>
				<tr><td class="hmargin" style="height:30px"></td></tr>
				<tr>
					<td align="center">
						<fieldset style="width:600; height:170;border: 1px solid #999999;" >
							<legend  class="stitle">&nbsp;알림사항&nbsp;&nbsp;</legend>
							<table cellpadding="0" cellspacing="0" border="0" bordercolor="red">
								<tr><td class="hmargin" style="height:20px"></td></tr>
								<tr><td><a href="http://www.nexfron.com/company01_06.html" target="new"><span class="Bblue" style="color:#4e81cd; font-weight:bold;font-size:16px;">* 등록된 공지사항 및 자료는 회사 홈페이지에 게시됩니다.</span></a></td></tr>
								<tr><td class="hmargin" style="height:10px"></td></tr>
								<!--tr><td align="right"><a href=javascript:viewContent('')><span class="Bblue" style="color:#848484; font-weight:bold;font-size:14px;">홈페이지 확인하기</span></a></td></tr-->
								<tr><td class="hmargin"></td></tr>
								<tr><td align="right"><a href="http://www.nexfron.com/jsp/page_news.jsp" target="new"><img src="/jsp/homepage/images/top_logo.gif" style="border: 1px solid #D5D5D5;" alt="www.nexfron.com"></a></td></tr>
							</table>
						</fieldset>
					</td>
				</tr>
			</table>
			</form>
		</td>
	</tr>
	<tr>
		<td class="hmargin"></td>
	</tr>
	<tr>
		<td>
			<table width="100%" cellpadding="0" cellspacing="0" border="1" bordercolor="blue">
				<tr>

				</tr>
			</table>
		</td>
	</tr>
</table>
<%@ include file="/jsp/include/include_car.jsp" %>
</body>
</html>