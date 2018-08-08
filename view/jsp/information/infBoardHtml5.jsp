<!--
  PROJECT : INTRANET
  NAME    : infBoardHtml5.jsp
  DESC    : 게시판-HTML5
  AUTHOR  : 박준규 과장
  VERSION : 1.0
  Copyright ⓒ 2010 Nexfron. All rights reserved.
  ============================================================================================
  							변		경		사		항
  ============================================================================================
  VERSION	   DATE		  	AUTHOR		DESCRIPTION
  ============================================================================================
  1.0		2011.10.31		박준규 		개발
  -->
<%@ page language="java" contentType="text/html; charset=EUC-KR"%>
<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=EUC-KR">
	<title>HTML5게시판</title>
	<%@ include file="/jsp/include/include.jsp"%>
	<script language="javascript" src="<%=scriptPath%>/js/information/infBoardHtml5.js"></script>
	<script language="javascript">
	_editor_url = "/screditor/";
	_userid = "<%=sessioninfo.getUserID()%>";
	UPLOAD_IMG_PATH = "UPLOAD_IMG_PATH";
	UPLOAD_FOLDER_NAME = "board";
	</script>
</head>
<body class="mainbody" onload="init();" >
<table width="100%" cellpadding="0" cellspacing="0" border="0" bordercolor="red">
	<tr>
		<td width="400" valign="top">
			<table width="400" cellpadding="0" cellspacing="0" border="0" bordercolor="blue">
				<tr><td class="hmargin" ></td></tr>
				<tr><td><ucare:xtitle title="HTML5 &nbsp;어렵지 &nbsp;않아요"/></td></tr>
				<tr><td class="hmargin5" ></td></tr>
				<tr>
					<td>
						<fieldset  style="padding:5 5 5 11;color:#999999" >
							<table cellpadding="0" cellspacing="0" border="0" width="100%" bordercolor="red">
							<tr>
								<td align="center">&nbsp;<img src="/html/images/icon/HTML5_Logo_64.png" width="35" height="35"></td>
								<td width="15" ></td>
								<td>
									HTML5 정보, 스터디, 진행사항관련 게시판입니다.<br>
									기초학습에 도움이 되었으면 좋겠습니다.
								</td>
							</tr>
							</table>
						</fieldset>
					</td>
				</tr>
				<tr><td class="hmargin5"></td></tr>
				<!--tr><td class="stitle">HTML5</td></tr-->
				<tr>
					<td valign="top">
						<ucare:grid id="UCINF214S" width="400" height="665" crud="false" no="false">
							<tr event="O">
								<td width="40" 	column="board_seq"			title="번호"			align="center" 	></td>
								<td width="0"	column="board_tp_seq" 		title="게시판번호"		align="center"></td>
								<td width="221"	column="board_sbjt" 		title="제목" 			align="left" maxlength="1000"></td>
								<!--td width="0"	column="board_cont" 		title="내용"			align="center"></td-->
								<td width="40"	column="qry_cnt" 			title="조회"			align="center"></td>
								<td width="40" 	column="rply_cnt"			title="댓글"			align="center"></td>
								<td width="40"	column="fileyn" 			title="파일"			align="center" format="IMAGE" image="save"></td>
								<td width="40"	column="filecnt" 			title="첨부파일건수"	align="center" ></td>
								<td width="140" column="rg_dtm" 			title="작성일시"		align="center"></td>
								<td width="60"	column="rg_nm" 				title="작성자"			align="center"></td>
								<td width="80"	column="rg_dt" 				title="작성일자"		align="center" hidden="true" ></td>
								<td width="80"	column="rg_tm" 				title="작성시간"		align="center" hidden="true" format="TIME"></td>
								<td width="0"	column="rg_id" 				title="rg_id"			align="center"></td>
								<td width="140" column="mdf_dtm" 			title="수정일시"		align="center" hidden="true"></td>
								<td width="60"	column="mdf_nm" 			title="수정자"			align="center" hidden="true"></td>
								<td width="80"	column="mdf_dt" 			title="수정일자"		align="center" hidden="true" ></td>
								<td width="80"	column="mdf_tm" 			title="수정시간"		align="center" hidden="true" format="TIME"></td>
								<td width="0"	column="mdf_id" 			title="mdf_id"			align="center"></td>
								<td width="0" 	column="rnum"				title="자료순번"		align="center"></td>
							</tr>
						</ucare:grid>
					</td>
				</tr>
				<tr><td class="hmargin"  ></td></tr>
				<tr>
					<td>
						<form name="fQuery" method="post" onsubmit="return false;">
						<input type="hidden" name="board_tp_seq" value="17"><!--17:HTML5-->
						<ucare:table type="query" width="390">
							<tr>
								<td width="20">&nbsp;</td>
								<td >
									<select name="q_searchtype" style="width:80" class="combo_text" >
										<option value="q_board_sbjt">제목</option>
										<option value="q_board_cont">내용</option>
									</select>
									<ucare:input type="text" name="searchstr" width="205" mode="active" tag="onKeyUp=\"pressEnter('queryList(this)')\""/>
								</td>
				 				<td width="75" align="">
				 					 <ucare:imgbtn name="btnsearch" kind="R" value="검색" width="60" onClick="queryList()"/>
								</td>
							</tr>
						</ucare:table>
						</form>
					</td>
				</tr>
			</table>
		</td>
		<td class="wmargin" style="width:10px"></td>
		<td  valign="top" >
			<form name="f" method="post" onsubmit="return false;">
			<input type="hidden" name="board_tp_seq" value="17"><!--17:HTML5-->
			<input type="hidden" name="userid" value="<%=sessioninfo.getUserID()%>">
			<input type="hidden" name="usernm" value="<%=sessioninfo.getUserName()%>">
			<table cellpadding="0" cellspacing="0" border="0" width="100%" bordercolor="blue" id="tbl01">
				<tr><td class="hmargin5" ></td></tr>
				<!--tr>
					<td><span class="stitle">상세정보</span></td>
				</tr-->
				<tr>
					<td valign="top">
						<table class="MANTBL" border="0" cellpadding="0" cellspacing="1" width="828" style="table-layout:fixed;">
							<col width="80">
							<col width="200">
							<col width="80">
							<col width="100">
							<col width="80">
							<col width="130">
							<col width="80">
							<col width="50">
							<tr>
								<td class="MANTDM" colspan="2">&nbsp;&nbsp;<span class="stitle" style="color:#4e81cd; font-weight:bold;" id="board_nm">&nbsp;</span></td>
								<td class="MANTDT">작성자</td>
								<td class="MANTDM">&nbsp;<ucare:input type="text" name="rg_nm" width="80" styleClass="input_transparent" readonly="true" tag="style=\"text-align:center;\""/>
									<input type="hidden" name="mdf_id">
									<input type="hidden" name="rg_id">
									<input type="hidden" name="mdf_nm">
								</td>
								<td class="MANTDT">작성일시</td>
								<td class="MANTDM">&nbsp;<ucare:input type="text" name="mdf_dtm" width="115" styleClass="input_transparent" readonly="true"/>
									<input type="hidden" name="mdf_dt">
									<input type="hidden" name="mdf_tm">
									<input type="hidden" name="rg_dtm">
									<input type="hidden" name="rg_dt">
									<input type="hidden" name="rg_tm">
								</td>
								<td class="MANTDT">조회</td>
								<td class="MANTDM">&nbsp;<ucare:input type="text" name="qry_cnt" width="40" styleClass="input_transparent" readonly="true" tag="style=\"text-align:center;\""/><ucare:input type="hidden" name="rply_cnt" width="40" /></td>
							</tr>
							<tr>
								<td class="MANTDT">제목</td>
								<td class="MANTDM" colspan="5"><ucare:input type="text" name="board_sbjt" required="true" requirednm="제목" width="595" mode="active" maxsize="100"/></td>
								<td class="MANTDT">번호</td>
								<td class="MANTDM"><ucare:input type="text" name="board_seq" width="48" styleClass="input_transparent" readonly="true" tag="style=\"text-align:center;font-weight:bold;padding:3 0 0 3;color:#3C9EDF\""/></td>
							</tr>
							<!--tr valign="top" height="720"><td class="MANTDM" colspan="8"></td></tr-->
						</table>
					</td>
				</tr>
				<tr>
					<td class="hmargin5"></td>
				</tr>
				<tr id="trContentView" style="display:block;height:716;">
					<td style="height:704;">
						<div id="board_view" style="border:1px solid #e3e3e3;width:828;height:100%;overflow-y:auto;padding:5 10 5 10">
							<label id="board_cont_view" ></label>
							<label id="board_file" ></label>
							<label id="board_reply" style="display:none">
								<table border="0" cellpadding="0" cellspacing="0" width="100%" >
									<tr><td class="hmargin" style="height:20px"></td></tr>
									<tr><td class="MANTDT" style="height:20px"><label style='width:96%;background: url(/html//images/common/dotline.gif) repeat-x left;'></label></td></tr>
								</table>
								<table class="MANTBL" border="0" cellpadding="0" cellspacing="0" width="100%" id="tblReplyList">
									<col width="100"/>
									<col width="717"/>
								</table>
								<table class="MANTBL" border="0" cellpadding="0" cellspacing="0" width="100%" id="tblReplyReg">
									<col width="100"/>
									<col width="717"/>
									<tr>
										<td class="MANTDT" style="padding:0 0 0 0;color:#555555;"><%=sessioninfo.getUserName()%></td>
										<td class="MANTDT" style="text-align:left;padding:0 10 0 0"><textarea name="rply_cont" class="input_textarea_text" required="false" requirednm="내용" style="width:100%;height:80"></Textarea></td>
									</tr>
									<tr><td colspan="2" class="MANTDT" style="text-align:right;padding:5 10 10 0"><ucare:imgbtn name="btnReplyReg" width="50"	type="G" kind="S" onClick="replyInsert()"/></td></tr>
								</table>
							</label>
						</div>
					</td>
				</tr>
				<tr id="trContentEdit" style="display:none">
					<td><textarea name="board_cont" styleClass="textarea_required" required="true" requirednm="내용" style="width:100%;height:680"></Textarea></td>
				</tr>
			</table>
			<div id="divFile">
			<table><tr><td style="height:2"></td></tr></table>
			<table class="MANTBL" border="0" cellpadding="0" cellspacing="1" width="820" style="table-layout:fixed;">
				<col width="80" />
				<col width="737"/>
				<tr height="50">
					<td class="MANTDT">첨부파일</td>
					<td class="MANTDM"><div id="divUploadFile" style="overflow-y:auto;width:100%;height:100%"></div><iframe name="iLog" width="0" height="0"></iframe></td>
				</tr>
			</table>
			</div>
			<table cellpadding="0" cellspacing="0" border="0" width="820" bordercolor="blue" >
				<tr>
					<td id="td1" class="hmargin"></td>
				</tr>
				<tr>
					<td align="right">
						<table class="tbl_button" border="0" cellpadding="0" cellspacing="0" >
							<tr id="trBtnView" >
								<td align="right"><ucare:imgbtn name="btnAdd" 	kind="A" onClick="addItem()"	/></td>
								<td align="right"><ucare:imgbtn name="btnUpd" 	kind="U" onClick="updateItem()"	/></td>
								<td align="right"><ucare:imgbtn name="btnDel" 	kind="D" onClick="delItem()"	/></td>
							</tr>
							<tr id="trBtnEdit" style="display:none">
								<td align="right"><ucare:imgbtn name="btnSave" 	kind="S" onClick="saveItem()"	/></td>
								<td align="right"><ucare:imgbtn name="btnCan" 	kind="C" onClick="cancel()"		/></td>
							</tr>
						</table>
					</td>
				</tr>
			</table>
			</form>
		</td>
	</tr>
</table>
</body>
</html>