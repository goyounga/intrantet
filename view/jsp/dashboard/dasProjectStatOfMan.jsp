<!--
  PROJ : Nexfron Intranet
  NAME : dasProjectStatOfMan.jsp
  DESC : 현황판 - 프로젝트현황-개인별
  Author : 박준규 과장
  VER  : 1.0
  Copyright 2009 Nexfron All rights reserved
  ============================================================================================
  								변		경		사		항
  ============================================================================================
  VERSION		DATE		AUTHOR		DESCRIPTION
  ============================================================================================
  1.0		2010.09.06		박준규		개발
  -->
<%@ page language="java" contentType="text/html; charset=EUC-KR"%>
<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=euc-kr">
	<title>개인별 프로젝트현황</title>
	<%@ include file="/jsp/include/include.jsp"%>
	<script language="javascript" src="<%=scriptPath%>/js/dashboard/dasProjectStatOfMan.js"></script>
</head>
<body onLoad="init()" style="padding:0 0 0 0;">
<table width="1250" cellpadding="0" cellspacing="0" border="0">
	<!--tr>
		<td><ucare:xtitle title="개인별 프로젝트현황"/></td>
	</tr-->
	<tr>
		<td class="hmargin5"></td>
	</tr>
	<form name="f" method="post">
	<input type="hidden" name="prj_seq" value="">
	<tr>
		<td>
			<table width="1238" cellpadding="0" cellspacing="0" border="0">
				<col width="1238" />
				<tr>
					<td valign="top">
						<ucare:grid id="UCDAS012S" width="1238" height="730" no="true">
							<tr event="O">
								<td width="95" 	column="dept_cd" 		title="부서" 					align="center" format="COMBO" brcode="SYS012"></td>
								<td width="110"	column="user_nm2" 		title=" 이름   [ 직급 ]" 		align="center" ></td>
								<td width="250"	column="prj_nm" 		title="프로젝트명"				align="left"   ></td>
								<td width="70"  column="etrn_c_cd" 		title="투입구분" 				align="center" format="COMBO" brcode="PRJ002"></td>
								<td width="70"  column="job_c_cd" 		title="업무구분" 				align="center" format="COMBO" brcode="PRJ010"></td>
								<td width="180" column="etrn" 			title="투입일자  [ 예정일자 ]"	align="center" ></td>
								<td width="180" column="ot" 			title="철수일자  [ 예정일자 ]"	align="center" ></td>
								<td width="50" 	column="pos_nm" 		title="직급"					align="center" hidden="true" ></td>
								<td width="75"	column="user_nm" 		title="이름" 					align="center" hidden="true" ></td>
								<td width="90" 	column="etrn_dt" 		title="투입일자"				align="center" hidden="true" format="DATE" ></td>
								<td width="90" 	column="etrn_du_dt" 	title="투입예정일자"			align="center" hidden="true" format="DATE" ></td>
								<td width="90" 	column="ot_dt" 			title="철수일자"				align="center" hidden="true" format="DATE" ></td>
								<td width="90" 	column="ot_du_dt" 		title="철수예정일자"			align="center" hidden="true" format="DATE" ></td>
								<td width="245" column="chrgjob" 		title="담당업무"				align="left"   ></td>
							</tr>
						</ucare:grid>
					</td>
				</tr>
				<tr>
					<td height="5"></td>
				</tr>
				<tr>
					<td align="right">
						<ucare:imgbtn width="60" name="btnQuery"	value="조회"	 onClick="queryList()"/>&nbsp;
					</td>
				</tr>
			</table>
		</td>
	</tr>
	</form>
</table>
</body>
</html>