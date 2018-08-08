<!--
  PROJECT : INTRANET
  NAME    : prjCorpMngP.jsp
  DESC    : 업체조회 팝업
  AUTHOR  : 박준규 과장
  VERSION : 1.0
  Copyright ⓒ 2010 Nexfron. All rights reserved.
  ============================================================================================
  							변		경		사		항
  ============================================================================================
  VERSION	   DATE		  	AUTHOR		DESCRIPTION
  ============================================================================================
  1.0		2010.09.12		박준규 		개발
  -->
<%@ page language="java" contentType="text/html; charset=euc-kr"%>
<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=euc-kr">
	<title>업체조회</title>
	<%@ include file="/jsp/include/include.jsp" %>
	<script language="javascript" src="<%=scriptPath%>/js/project/prjCorpMngP.js"></script>
	<% String pCorp 	= request.getParameter("corp"); %>
</head>
<body class="mainbody" onLoad="init();" style="padding:0 5 0 5;">
<form name="fQuery" method="post" onsubmit="return false;">
<input type="hidden" name="corp" value="<%=pCorp%>">
<table border="0" cellpadding="0" cellspacing="0" width="300" >
	<tr>
 		<td>
 			<table width="100%" cellpadding="0" cellspacing="0" border="0" background="/html/images/common/popupbg.gif">
 				<tr height="30">
 					<td class="popup_tit"><b>업체조회</b></td>
 				</tr>
 			</table>
		</td>
	</tr>
	<tr><td class="hmargin5"></td></tr>
	<tr>
		<td>
			<ucare:table type="query" width="100%">
				<tr>
					<th width="80" >업체명 : </th>
					<td class="lbtn">
						<ucare:input type="text" name="corp_nm" width="150" maxsize="100" mode="active" tag="onKeyUp=\"pressEnter('query()')\"" />
					</td>

					<td>&nbsp;</td>
					<td width="1" bgcolor=#CCCCCC></td>
					<td width="55" class="rbtn" align="right">
						<ucare:imgbtn name="btnSearch" kind="R"  onClick="query()"/>
					</td>
				</tr>
			</ucare:table>
		</td>
	</tr>
</table>
</form>
<form name="f">
<table border="0" cellpadding="0" cellspacing="0" width="300" bordercolor="red" >
	<tr>
		<td class="hmargin"></td>
	</tr>
	<tr>
		<td>
			<table width="100%" cellpadding="0" cellspacing="0" border="0" bordercolor="red" >
				<tr>
					<td class="stitle">업체목록</td>
				</tr>
				<tr>
					<td>
						<ucare:grid id="UCPRJ041S" width="300" height="450" no="true" >
							<tr event="O,D">
								<td width="262"	column="corp_nm" 		title="업체명" 		align="left" ></td>
								<td width="80"	column="corp_seq" 		title="업체순번" 	align="center" hidden="true"></td>
								<td width="542"	column="rmk" 			title="비고" 		align="left" maxlength="2000" hidden="true"></td>
							</tr>
						</ucare:grid>
					</td>
				</tr>
			</table>
		</td>
	</tr>
	<tr>
		<td class="hmargin5"></td>
	</tr>
	<tr>
		<td align="right" >
			<table class="tbl_button" border="0" cellpadding="0" cellspacing="0" >
				<tr>
					<td ><ucare:imgbtn name="btnApply" value="선택" onClick="selectCode();"/></td>
					<td ><ucare:imgbtn name="btnClose" kind="X" onClick="self.close();"/></td>
				</tr>
			</table>
		</td>
	</tr>
</table>
</form>
</body>
</html>