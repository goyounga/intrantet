<!--
  PROJ : Nexfron Intranet
  NAME : dasProjectStat.jsp
  DESC : 현황판 - 프로젝트현황
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
	<title>프로젝트현황</title>
	<%@ include file="/jsp/include/include.jsp"%>
	<script language="javascript" src="<%=scriptPath%>/js/dashboard/dasProjectStat.js"></script>
</head>
<body onLoad="init()" style="padding:0 0 0 0;">
<table width="1250" cellpadding="0" cellspacing="0" border="0">
	<!--tr>
		<td><ucare:xtitle title="프로젝트현황"/></td>
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
						<ucare:grid id="UCDAS011S" width="1238" height="730" no="true">
							<tr event="O">
								<td width="250"		column="prj_nm" 		title="프로젝트명"		align="left" ></td>
								<td width="180" 	column="work_range" 	title="업무범위"		align="center" hidden="true"></td>
								<td width="180" 	column="work_range_nm" 	title="업무범위"		align="center" ></td>
								<td width="130" 	column="mbr_cnt" 		title="인력현황"		align="center" ></td>
								<td width="130" 	column="pogr_stat" 		title="진행상황"		align="center" ></td>
								<td width="130" 	column="rl_end_dt" 		title="기간"			align="center" ></td>
								<td width="380" 	column="rmk" 			title="비고"			align="left" ></td>
								<td width="100" 	column="prj_seq" 		title="프로젝트순번"	align="center"  hidden="true"></td>
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