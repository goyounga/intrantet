<!--
  PROJ : Nexfron Intranet
  NAME : prjUserProject.jsp
  DESC : ���κ��̷���ȸ
  Author : nexfron
  VER  : 1.0
  Copyright 2009 Nexfron All rights reserved
  ============================================================================================
  								��		��		��		��
  ============================================================================================
  VERSION		DATE		AUTHOR		DESCRIPTION
  ============================================================================================
  1.0		2010.07.30		nexfron		�����ۼ�

  -->

<%@ page language="java" contentType="text/html; charset=EUC-KR"%>
<%@ include file="/jsp/include/include.jsp"%>
<html>
<head>
<title>���κ��̷���ȸ</title>
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
						<td width="100" align=right>�����:&nbsp;</td>
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
		 					<ucare:imgbtn name="btnQuery" value="��ȸ" width="50" onClick="query()"/>
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
								<td class="stitle">���κ��̷�</td>
							</tr>
						</ucare:table>
						<ucare:grid id="UCPRJ200S" width="1220" height="675" no="true">
							<tr event="O">
								<td width="300" column="prj_nm"		title="������Ʈ"		align="left"></td>
								<td width="80"	column="rl_st_dt"	title="������"		format="DATE" align="center"></td>
								<td width="80"	column="rl_end_dt"	title="������"		format="DATE" align="center"></td>
								<td width="80"	column="etrn_dt"	title="������"		format="DATE" align="center"></td>
								<td width="80"	column="ot_dt"		title="ö����"		format="DATE" align="center"></td>
								<td width="140" column="clnt_co"	title="����"		align="left"></td>
								<td width="140" column="coper_co"	title="���»�"		align="left"></td>
								<td width="140" column="dvlp_tool"	title="������"		align="left"></td>
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