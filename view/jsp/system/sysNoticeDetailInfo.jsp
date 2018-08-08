<!--
  PROJ : Nexfron Intranet
  NAME : sysNoticeDetailInfo.jsp
  DESC : 공지사항 상세내용 화면
  Author : 김은수 과장
  VER  : 1.0
  Copyright 2009 Nexfron All rights reserved
  ============================================================================================
  								변		경		사		항
  ============================================================================================
  VERSION		DATE		AUTHOR		DESCRIPTION
  ============================================================================================
  1.0		2009.08.13		김은수		주석추가
  -->

<%@ page contentType="text/html;charset=euc-kr" %>
<%@ include file="/jsp/include/include.jsp"%>
<%
 	String seq = request.getParameter("seq");
 	String gubun = request.getParameter("gubun");
%>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=EUC-KR">
<title>상세내용</title>
<script language="javascript" src="/html/js/system/sysNoticeDetailInfo.js"></script>
<script language=javascript for="UCINF215S" event="MouseOver(strType ,strColumnKey, nRow)">
	MouseOver("UCINF215S", strType, strColumnKey, nRow);
</script>
</head>
<body topmargin=0 leftmargin=0 onload="init()">
<form name="fQuery">
<input type="hidden" name="notice_seq" value="<%=seq%>" >
<input type="hidden" name="up_seq" value="<%=seq%>" >
<input type="hidden" name="prg_id" value="NOTICE" >
<input type="hidden" name="gubun" value="<%=gubun%>" >
<input type="hidden" name="NOTICE_FILE_PATH" value="<%=CIni.getString("UPLOAD_PATH_NOTICE")%>">
<input type="hidden" name="userid" value="<%=sessioninfo.getUserID()%>">
<table border=0 cellpadding=0 cellspacing=0 width="800">
	<tr>
 		<td>
 			<table width="800" cellpadding="0" cellspacing="0" border="0" background="/html/images/common/popupbg.gif">
 				<tr height="30">
 					<td class="ptitle">상세내용</td>
 				</tr>
 			</table>
		</td>
	</tr>
	<tr>
		<td height="5"></td>
	</tr>
</table>
<table border=0 cellpadding=1 cellspacing=1 width="800">
	<tr>
		<!--<td><span class="stitle">상세 내용</span></td> style="table-layout:fixed;" -->
	</tr>
	<tr valign=top>
		<td>
			<!--ucare:table id="" type="detail" width="100%" -->
			<table cellspacing='1' border='0' class="MANTBL" cellpadding = "0" id = "" width="100%" height="0" bordercolor="red" style="table-layout:fixed;">
				<col width="80"  />
				<col width="380" />
				<col width="80"  />
				<col width="120" />
				<col width="80"  />
				<col width="50"  />
				<tr>
					<td class="MANTDT" width="80">제목</td>
					<td class="MANTDM" width="" id="notice_sbjt">&nbsp;</td>
					<td class="MANTDT"><% if("notice".equals(gubun)) %>공지구분<% else %>게시판구분</td>
					<td class="MANTDM" id="" colspan="3" >&nbsp;<span id="notice_type"></td>
				</tr>
				<!--
				<tr>
					<td class="MANTDT">게시기간</td>
					<td class="MANTDM" colspan=3 id="ntce_dt">&nbsp;</td>
				</tr>
				-->
				<tr>
					<td class="MANTDT" >작성자</td>
					<td class="MANTDM" id="rg_nm" >&nbsp;</td>
					<!--td class="MANTDT" width="80">작성일</td>
					<td class="MANTDM" id="rg_dt" width="100" format="DATE">&nbsp;</td-->
					<td class="MANTDT" width="100">작성일시</td>
					<td class="MANTDM" id="rg_dt_tm" width="150" style="text-align:center;">&nbsp;</td>
					<td class="MANTDT" width="80">조회수</td>
					<td class="MANTDM" id="qry_cnt" width="100" style="text-align:center;">&nbsp;</td>
				</tr>
				<tr height="300">
					<td class="MANTDT">내 용</td>
					<td class="MANTDM" colspan="5">
						<div  style="width:711;height:300;overflow:auto">
							<table border=0 cellpadding=0 cellspacing=0>
								<tr>
									<td id="board_cont">&nbsp;</td>
								</tr>
							</table>
						</div>
					</td>
				</tr>
			</table>
				<div id="divFile">
				<table><tr><td style="height:2"></td></tr></table>
				<table cellspacing='1' border='0' class="MANTBL" cellpadding = "0" id = "" width="100%" height="0" bordercolor="red" style="table-layout:fixed;" >
					<col width="80"  />
					<col width="603" />
					<col width="107" />
					<tr height="85">
						<td class="MANTDT">첨부파일</td>
						<td  class="MANTDM" colspan="5">
							<div id="divUploadFile" style="overflow-y:scroll;width:700;height:85"></div>
						</td>
					</tr>
				</table>
				</div>
				<div id="divExps">
				<table><tr><td style="height:2"></td></tr></table>
				<table cellspacing='1' border='0' class="MANTBL" cellpadding = "0" id = "" width="100%" height="0" bordercolor="red" style="table-layout:fixed;" >
					<col width="80"  />
					<col width="603" />
					<col width="107" />
					<tr height="250">
					<td class="MANTDT">사용예시</td>
					<td  class="MANTDM" colspan="5" >
						<div style="overflow:scroll;width:700;height:100%">
							<table border=0 cellpadding=0 cellspacing=0>
								<tr>
									<td id="upg_exps">&nbsp;</td>
								</tr>
							</table>
						</div>
					</td>
				</tr>
				</table>
				</div>
		</form>
		<form name="f" method="post" onsubmit="return false;">
			<div id="divComment">
			<table><tr><td style="height:2"></td></tr></table>
			<table cellspacing='1' border='0' class="MANTBL" cellpadding = "0" id = "" width="100%" height="0" bordercolor="red" style="table-layout:fixed;" >
				<col width="80"  />
				<col width="603" />
				<col width="107" />
				<tr height="115" id="trComment">
					<td class="MANTDT" rowspan="2">댓글</td>
					<td colspan="2" valign="top">
						<ucare:grid id="UCINF215S" width="715" height="115" no="false">
							<tr event="O">
								<td width="70" 		column="rply_rg_nm" 	title="작성자"		align="center"></td>
								<td width="516" 	column="rply_cont" 		title="내용" 		align="left" 	format="MEMO"></td>
								<td width="90" 		column="rply_rg_dtm" 	title="작성일시"	align="center"></td>
								<td width="0" 		column="rply_seq"		title="rply_seq"	hidden="true"></td>
								<td width="20" 		column="del" 			title="X" 			align="center" format="IMAGE" image="del" ></td>
								<td width="0" 		column="rg_id" 			title="작성자"		align="center" hidden="true"></td>
							</tr>
						</ucare:grid>
					</td>
				</tr>
				<tr height="50" >
					<td class="MANTDM"  >
						<textarea name="rply_cont" class="input_textarea" required="false" requirednm="내용" style="width:604; height:43;" maxlength="1000"></textarea>
					</td>
					<td class="MANTDM" valign="middle" align="center">
						<ucare:imgbtn name="btnRplySave" value="댓글저장" width="80" onClick="replySave()" />
					</td>
				</tr>
			<!--/ucare:table-->
			</table>
			</div>
		</td>
	</tr>
	<tr>
		<td align="right">
			<!--<ucare:imgbtn name="btnOpen"  value="목록"  width="70" onClick="openNotice()"  />-->
			<ucare:imgbtn name="btnClose" value="닫기"  width="70" onClick="popupClose()" />
		</td>
	</tr>
	<td align="right">
		<ucare:table type="border" cellspacing="0">
			<tr>
				<td colspan="4"><iframe name="ifmMenu" src="/jsp/common/blank.jsp"  style="height:100" scrolling="no" frameborder="0" ></iframe></td>
			</tr>
		</ucare:table>
	</td>
</table>
</form>
</body>
</html>
<iframe name="iLog" width=0 height=0></iframe>
