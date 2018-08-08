<!--
  PROJ : Nexfron Intranet
  NAME : dasMtncStat.jsp
  DESC : 현황판 - 유지보수현황
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
	<title>유지보수현황</title>
	<%@ include file="/jsp/include/include.jsp"%>
	<script language="javascript" src="<%=scriptPath%>/js/dashboard/dasMtncStat.js"></script>
</head>
<body onLoad="init()" style="padding:0 0 0 0;">
<table width="1250" cellpadding="0" cellspacing="0" border="0">
	<tr>
		<td height="5"></td>
	</tr>
	<form name="f" method="post">
	<input type="hidden" name="prj_seq" value="">
	<tr>
		<td>
			<table width="1238" cellpadding="0" cellspacing="0" border="0">
				<col width="1238" />
				<tr>
					<td valign="top">
						<ucare:grid id="UCDAS021S" width="1238" height="775" no="true" >
							<tr event="O">
								<td width="200"	column="mtnc_nm" 		title="유지보수명" 		align="left" ></td>
								<td width="120"	column="clnt_corp_nm" 	title="고객사" 			align="center" ></td>
								<td width="150"	column="mtnc_system_nm" title="시스템" 			align="center" ></td>
								<td width="200"	column="mtnc_type" 		title="유지보수유형" 	align="center" format="COMBO" brcode="PRJ017"></td>
								<td width="80"	column="mtnc_cost" 		title="비용" 			align="center" format="COMBO" brcode="PRJ014"></td>
								<td width="150"	column="mtnc_period" 	title="기간" 			align="center" ></td>
								<td width="80"	column="regular_chk" 	title="정기점검" 		align="center" format="COMBO" brcode="PRJ015"></td>
								<td width="120"	column="coop_corp_nm" 	title="협력사" 			align="center" ></td>
								<td width="100"	column="dvlp_frwk" 		title="프레임워크" 		align="center" format="COMBO" brcode="PRJ016"></td>
								<td width="120"	column="rmk" 			title="특이사항" 		align="center" hidden="true" maxlength="2000"></td>

								<td width="0"	column="mtnc_seq" 		title="유지보수SEQ" 	align="center" hidden="true"></td>
								<td width="0"	column="clnt_corp_seq" 	title="고객사SEQ" 		align="center" hidden="true"></td>
								<td width="100"	column="mtnc_system" 	title="시스템cd" 		align="center" hidden="true"></td>
								<td width="0"	column="strt_date" 		title="시작일자" 		align="center" hidden="true"></td>
								<td width="0"	column="end_date" 		title="종료일자" 		align="center" hidden="true"></td>
								<td width="0"	column="coop_corp_seq" 	title="협력사SEQ" 		align="center" hidden="true"></td>
							</tr>
						</ucare:grid>
					</td>
				</tr>
				<tr>
					<td height="5"></td>
				</tr>
				<tr>
					<td align="right">
						<ucare:imgbtn width="60" name="btnQuery"	kind="R"	 onClick="queryList()"/>
					</td>
				</tr>
			</table>
		</td>
	</tr>
	</form>
</table>
<%@ include file="/jsp/include/include_car.jsp" %>
</body>
</html>