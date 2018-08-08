<%@ page contentType="text/html;charset=euc-kr" %>
<%@ include file="/jsp/include/include.jsp"%>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=EUC-KR">
<title>공지 사항</title>
<script language="javascript" src="/html/js/system/sysNoticeInfo.js"></script>
</head>
<!--
<body topmargin=0 leftmargin=0 onload="init(<%=request.getParameter("frame")%>);">
-->
<body topmargin=0 leftmargin=0 onload="init()">
<form name="fQuery">
<input type="hidden" name="userid" value="<%=sessioninfo.getUserID()%>">
<table border=0 cellpadding=0 cellspacing=0 width=800>
	<tr>
 		<td>
 			<table width="800" cellpadding="0" cellspacing="0" border="0" background="/html/images/common/popupbg.gif">
 				<tr height="30">
 					<td class="ptitle">센터 공지사항</td>
 				</tr>
 			</table>
		</td>
	</tr>
	<tr>
		<td height="5"></td>
	</tr>
	<tr>
		<td><ucare:xtitle title="센터 공지사항"/></td>
	</tr>
	<tr>
		<td height="5"></td>
	</tr>
</table>
<table border=0 cellpadding=1 cellspacing=1 width="800">
	<tr valign=top>
		<td>
			<table border=0 cellpadding=1 cellspacing=1 width=100%>
				<tr>
					<td>
						<ucare:table type="query" width="100%">
							<tr>
								<td width=80 align=right style="padding:2 0 0 0 ">제 목 :&nbsp;</td>
								<td width=100><input type="text" name="noticetitle" class="frm_text" size=20 onKeyPress="pressEnter('query()')"></td>
								<td width=80 align=right style="padding:2 0 0 0 ">작성자 :&nbsp;</td>
								<td width=100><input type="text" name="regid_nm" class="frm_text" size=20 onKeyPress="pressEnter('query()')"></td>
								<td width=80 align=right style="padding:2 0 0 0 ">게시구분 :&nbsp;</td>
								<td width=100><ucare:select name="noticetype" option="4" brcode="SYS003" code="code" codename="codenm" width="100" styleClass="frm_select" /></td>
								<td>&nbsp;</td>
								<td width=1 bgcolor=#CCCCCC></td>
				 				<td width=80 align=center>
				 					<ucare:imgbtn name="btnQuery" kind="R"  width="70" onClick="query()"  /><!-- 조회 -->
							</tr>
						</ucare:table>
					</td>
				</tr>
				<tr>
					<td>
						<ucare:grid id="UCSYS070S" width="790" height="430" no="true">
							<tr event="D">
								<td width="430" column="noticetitle" 	title="제목"  	align="left" ></td>
								<td width="80"  column="noticetype_nm"	title="게시구분" align="center"></td>
								<td width="100" column="regdt"			title="작성일" 	align="center" format="DATE"></td>
								<td width="90"  column="regid_nm" 		title="작성자" 	align="center" ></td>
								<td width="50"  column="querycnt"		title="조회수" 	align="center"></td>
							</tr>                                                                           
						</ucare:grid>	
					</td>
				</tr>
			</table>
		</td>
	</tr>
	<tr><td height="5"></td></tr>
	<tr><td colspan=3 align=right><ucare:imgbtn name="btnClose"  value="닫기"  width="70" onClick="popupClose()" />&nbsp;&nbsp;</td></tr>
</table>
</form>
<form name="f">
	<input type="hidden" name="noticeid">
</form>

</body>
</html>