<!--
  PROJ : Nexfron Intranet
  NAME : prjUserProject.jsp
  DESC : 개인별이력조회
  Author : nexfron
  VER  : 1.0
  Copyright 2009 Nexfron All rights reserved
  ============================================================================================
  								변		경		사		항
  ============================================================================================
  VERSION		DATE		AUTHOR		DESCRIPTION
  ============================================================================================
  1.0		2010.07.30		nexfron		최초작성

  -->

<%@ page language="java" contentType="text/html; charset=EUC-KR"%>
<%@ include file="/jsp/include/include.jsp"%>
<html>
<head>
<title>개인별이력조회</title>
<script language="javascript" src="/html/js/project/prjUserProject.js"></script>

</head>
<body onLoad="on_Load();">
<table border=0 cellpadding=1 cellspacing=1 id=tblList width="1217">
	<tr>
		<td width="5"></td>
	</tr>
 	<tr>
		<td>
			<form name="fQuery" method="post">
			<input type="hidden" name="q_userid" value="<%=sessioninfo.getUserID()%>">
			<input type="hidden" name="thisYear" value="<%=CDateUtil.getYear()%>">
			
				<ucare:table type="query" width="1215">
					<tr>
						<td width="100" align=right>사용자:&nbsp;</td>
						<td width="230">
							<input type="text" name="user_id" readOnly class="input_readonly" style="width:60;">
							<input type="text" name="user_nm" readOnly class="input_readonly" style="width:60;">
							<span class="search" onClick="openUserOrg(fQuery)"></span>
							<span class="minus" onClick="del_userID(fQuery);"></span>
						</td>
						<td>&nbsp;</td>
						<td style="display:none"><input type=text name="dummy"></td>
						<td width=1 bgcolor=#CCCCCC></td>
		 				<td width=130 align="center">
		 					<ucare:imgbtn name="btnQuery" value="조회" width="50" onClick="query()"/>
		 				</td>
		 			</tr>
				</ucare:table>
			</form>
		</td>
	</tr>
	<tr>
		<td valign="top">
			<table border=0 cellpadding=0 cellspacing=0>
				<tr>
					<td valign="top">
						<form name="f" method="post">
						<input type="hidden" name="userid" value="<%=sessioninfo.getUserID()%>">
				
						<ucare:table type="border">
							<tr>
								<td class="stitle">개인별이력</td>
							</tr>
						</ucare:table>
						<ucare:grid id="UCPRJ200S" width="1220" height="675" no="true">
							<tr event="O">
								<td width="300" column="prj_nm"		title="프로젝트"		align="left"></td>
								<td width="80"	column="rl_st_dt"	title="시작일"		format="DATE" align="center"></td>
								<td width="80"	column="rl_end_dt"	title="종료일"		format="DATE" align="center"></td>
								<td width="80"	column="etrn_dt"	title="투입일"		format="DATE" align="center"></td>
								<td width="80"	column="ot_dt"		title="철수일"		format="DATE" align="center"></td>
								<td width="140" column="clnt_co"	title="고객사"		align="left"></td>
								<td width="140" column="coper_co"	title="협력사"		align="left"></td>
								<td width="140" column="dvlp_tool"	title="개발툴"		align="left"></td>
								<td width="140" column="dbms"		title="DBMS"		align="left"></td>
							 </tr>
						</ucare:grid>
						</form>
					</td>
				</tr>
			</table>
		</td>
	</tr>
</table>

<%@ include file="/jsp/include/include_car.jsp" %>
</body>
</html>