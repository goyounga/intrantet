<!--
  PROJ : Nexfron Intranet
  NAME : dasMainOfficeStat.jsp
  DESC : ��Ȳ�� - ������ - �����η���Ȳ
  Author : ���ر� ����
  VER  : 1.0
  Copyright 2009 Nexfron All rights reserved
  ============================================================================================
  								��		��		��		��
  ============================================================================================
  VERSION		DATE		AUTHOR		DESCRIPTION
  ============================================================================================
  1.0		2010.09.06		���ر�		����
  -->
<%@ page language="java" contentType="text/html; charset=EUC-KR"%>
<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=euc-kr">
	<title>�����η���Ȳ</title>
	<%@ include file="/jsp/include/include.jsp"%>
	<script language="javascript" src="<%=scriptPath%>/js/dashboard/dasMainOfficeStat.js"></script>
	<%int listMaxCnt = 32;%>
</head>
<body class="mainbody" onLoad="//queryList();//init();" >
<form name="f" method="post" onsubmit="return false;">
<input type="hidden" name="listMaxCnt" value="<%=String.valueOf(listMaxCnt)%>" />
<table width="1260" cellpadding="0" cellspacing="0" border="0">
	<tr onclick="parent.viewController()" style="cursor:hand">
		<td><ucare:xtitle title="�����η���Ȳ"/></td>
	</tr>
	<tr>
		<td class="hmargin5"></td>
	</tr>
	<tr>
		<td>
			<table id="tblList" width="1260" border="0" cellpadding="1" cellspacing="1" class="table_line" style="table-layout:fixed;">
				<col width="100">
				<col width="130">
				<col width="130">
				<col width="260">
				<col width="200">
				<col width="440">
                <tr style="height:25px;">
					<td class="table_header" style="font-size:14px;font-weight:bold;">����</td>
					<td class="table_header" style="font-size:14px;font-weight:bold;">�Ҽ�</td>
					<td class="table_header" style="font-size:14px;font-weight:bold;">��ǿ���</td>
					<td class="table_header" style="font-size:14px;font-weight:bold;">�ܱ�����</td>
					<td class="table_header" style="font-size:14px;font-weight:bold;">�ͻ翹��</td>
					<td class="table_header" style="font-size:14px;font-weight:bold;">���</td>
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