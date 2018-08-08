<!--
  PROJ : Nexfron Intranet
  NAME : sysWeeklyRptView.jsp
  DESC : �ְ����� ȭ��
  Author : ������ ����
  VER  : 1.0
  Copyright 2009 Nexfron All rights reserved
  ============================================================================================
  								��		��		��		��
  ============================================================================================
  VERSION		DATE		AUTHOR		DESCRIPTION
  ============================================================================================
  1.0		2011.03.03		������		�ű��ۼ�
  -->

<%@ page language="java" contentType="text/html; charset=EUC-KR"%>
<%@ include file="/jsp/include/include.jsp"%>

<%
	String rpt_id	= CUtil.nvl(request.getParameter("rpt_id"), "-1");
%>

<html>
<head>
	<title>�ְ�����</title>
	<script language="javascript" src="/html/js/management/mngWeeklyRptView.js"></script>
</head>
<body topmargin="0" leftmargin="5"  onLoad="init()">
<table cellpadding="0" cellspacing="0" border="0">
	<tr>
		<td><ucare:xtitle title="�ְ�����"/></td>
	</tr>
	<tr>
		<td height="5"></td>
	</tr>

	<!-- ���� S -->
	<form name="f" method="post">
	<input type="hidden" name="id" value="<%=rpt_id%>">
	
	<tr>
		<td>
			<table cellpadding="0" cellspacing="0" border="0">
				<col width="590" />
				<col width="5" />
				<col width="630" />
				<tr>
					<!-- Function ������ S -->
					<td valign="top">
						<table width="630" cellpadding="0" cellspacing="0" border="0">
							<tr>
								<td>
									<ucare:table type="detail" width="630">
										<tr>
											<td class="MANTDT" width="115">����</td>
											<td class="MANTDM" width="200" id="subject"></td>
											<td class="MANTDT" width="115">�������</td>
											<td class="MANTDM" width="200" id="statcdnm"></td>
										</tr>
										<tr>
											<td class="MANTDT" width="115">����������</td>
											<td class="MANTDM" width="200" id="start_dt" format="DATE"></td>
											<td class="MANTDT" width="115">����������</td>
											<td class="MANTDM" width="200" id="end_dt" format="DATE"></td>
										</tr>
										<tr>
											<td class="MANTDT">���־�������</td>
											<td class="MANTDM" colspan="3" id="weekly_content"></td>
										</tr>
										<tr>
											<td class="MANTDT">���־�����ȹ</td>
											<td class="MANTDM" colspan="3" id="next_weekly_content"></td>
										</tr>
										<tr>
											<td class="MANTDT">�̽�����</td>
											<td class="MANTDM" colspan="3" id="issue"></td>
										</tr>
									<%
										String dayNm[] = {"������","ȭ����","������","�����","�ݿ���","�����","�Ͽ���"};
										for (int i=0; i<7; i++) { %>
										<tr>
											<td class="MANTDT" width="115"><%=dayNm[i]%></td>
											<td class="MANTDM" id="content<%=i%>" colspan="2"></td>
											<td class="MANTDM" width="200" id="workinfo<%=i%>"></td>
										</tr>
									<% } %>
										<tr>
											<td class="MANTDT">�亯</td>
											<td class="MANTDM" colspan="3" id="response"></td>
										</tr>
										<tr>
											<td class="MANTDT">�����</td>
											<td class="MANTDM" id="rg_nm"></td>
											<td class="MANTDT">�������</td>
											<td class="MANTDM" id="rg_dt" format="DATE"></td>
										</tr>
										<tr>
											<td class="MANTDT">������</td>
											<td class="MANTDM" id="mdf_nm"></td>
											<td class="MANTDT">��������</td>
											<td class="MANTDM" id="mdf_dt" format="DATE"></td>
										</tr>
									</ucare:table>
								</td>
							</tr>
						</table>
					</td>
					<!-- Function ������ E -->
				</tr>
			</table>
		</td>
	</tr>
	</form>
	<!-- ���� E -->
</table>
<%@ include file="/jsp/include/include_car.jsp" %>
</body>
</html>