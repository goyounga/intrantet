<!--
  PROJ : Nexfron Intranet
  NAME : dasMainMtncStat.jsp
  DESC : 현황판 - 전광판 - 유지보수현황
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
	<script language="javascript" src="<%=scriptPath%>/js/dashboard/dasMainMtncStat.js"></script>
	<%int listMaxCnt = 32;%>
</head>
<body class="mainbody" onLoad="//queryCode();//init()">
<form name="f" method="post" onsubmit="return false;">
<input type="hidden" name="listMaxCnt" value="<%=String.valueOf(listMaxCnt)%>" />
<table width="1260" cellpadding="0" cellspacing="0" border="0">
	<tr onclick="parent.viewController()" style="cursor:hand">
		<td><ucare:xtitle title="유지보수현황" /></td>
	</tr>
	<tr>
		<td class="hmargin5"></td>
	</tr>
	<tr>
		<td>
			<table id="tblList" width="1260" border="0" cellpadding="1" cellspacing="1" class="table_line" style="table-layout:fixed;">
				<col width="200">
				<col width="120">
				<col width="150">
				<col width="200">
				<col width="80">
				<col width="150">
				<col width="80">
				<col width="120">
				<col width="157">
                <tr style="height:25px;">
					<td class="table_header" style="font-size:14px;font-weight:bold;">유지보수명</td>
					<td class="table_header" style="font-size:14px;font-weight:bold;">고객사</td>
					<td class="table_header" style="font-size:14px;font-weight:bold;">시스템</td>
					<td class="table_header" style="font-size:14px;font-weight:bold;">유지보수유형</td>
					<td class="table_header" style="font-size:14px;font-weight:bold;">비용</td>
					<td class="table_header" style="font-size:14px;font-weight:bold;">기간</td>
					<td class="table_header" style="font-size:14px;font-weight:bold;">정기점검</td>
					<td class="table_header" style="font-size:14px;font-weight:bold;">협력사</td>
					<td class="table_header" style="font-size:14px;font-weight:bold;">프레임워크</td>
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