<!--
  PROJ : Nexfron Intranet
  NAME : dasMainProjectStat.jsp
  DESC : 현황판 - 전광판 - 프로젝트현황
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
	<script language="javascript" src="/html/js/dashboard/dasMainProjectStat.js"></script>
	
	<%int listMaxCnt = 32;%>
</head>
<body class="mainbody" onLoad="//init();//queryCode();">
<form name="f" method="post" onsubmit="return false;">
<input type="hidden" name="listMaxCnt" value="<%=String.valueOf(listMaxCnt)%>" />
<table width="1260" height="" border="0" cellspacing="0" cellpadding="0" bordercolor="red">
	<tr onclick="parent.viewController()" style="cursor:hand">
		<td ><ucare:xtitle title="프로젝트현황" /></td>
	</tr>
	<tr>
		<td class="hmargin5"></td>
	</tr>
	<tr>
		<td>
			<table id="tblList" width="1260" border="0" cellpadding="1" cellspacing="1" class="table_line" style="table-layout:fixed;">
				<col width="250">
				<col width="180">
				<col width="130">
				<col width="130">
				<col width="130">
				<col width="440">
                <tr style="height:25px;">
					<td class="table_header" style="font-size:14px;font-weight:bold;">프로젝트명</td>
					<td class="table_header" style="font-size:14px;font-weight:bold;">업무범위</td>
					<td class="table_header" style="font-size:14px;font-weight:bold;">인력현황</td>
					<td class="table_header" style="font-size:14px;font-weight:bold;">진행상황</td>
					<td class="table_header" style="font-size:14px;font-weight:bold;">기간</td>
					<td class="table_header" style="font-size:14px;font-weight:bold;">비고</td>
                </tr>
			    <%
			    for (int i=0; i < listMaxCnt; i++)
				{
					out.println("<TR>                                                     ");
					out.println("	<TD class=table_data style='TEXT-ALIGN: center'></TD> ");
					out.println("	<TD class=table_data style='TEXT-ALIGN: center'></TD> ");
					out.println("	<TD class=table_data style='TEXT-ALIGN: center'></TD> ");
					out.println("	<TD class=table_data style='TEXT-ALIGN: center'></TD> ");
					out.println("	<TD class=table_data style='TEXT-ALIGN: center'></TD> ");
					out.println("	<TD class=table_data style='TEXT-ALIGN: center'></TD> ");
					out.println("</TR>                                                    ");
				}
				%>
			</table>
		</td>
	</tr>
</table>
</form>
</body>
</html>