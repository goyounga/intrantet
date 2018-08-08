<!--
 * PROJ : �ؽ����� �׽�Ʈ
 * NAME : sysScheduleBusiP.jsp
 * DESC : �������ֿ��������� �˾�
 * Author : �輺�� 
 * VER  : 1.0
 * Copyright 2009 Nexfron All rights reserved
 * ============================================================================================
 * 								��		��		��		��
 * ============================================================================================
 * VERSION		DATE		AUTHOR		DESCRIPTION
 * ============================================================================================
 * 1.0		2010.06.25		�輺��		�ű��ۼ�
	-->
<%@ page contentType="text/html;charset=euc-kr" %>
<%@ include file="/jsp/include/include.jsp"%>
<%
	String pop_type = request.getParameter("pop_type");
 	String cen_sch_id = request.getParameter("cen_sch_id");
 	String user_id = sessioninfo.getUserID();
%>
<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=EUC-KR">
	<title>�������ֿ��������� �˾�</title>
	<script language="javascript" src="/html/js/system/sysScheduleBusi.js"></script>
</head>

<body onLoad="setInit('<%=pop_type%>');" style = "margin: 0">
<form name="fDetail">
<table width="100%" cellspacing="0" cellpadding="0" border="0">
	<tr>
		<input type="hidden" name="cen_cd"  value="B" width="150"/>	<!-- �Ϲ�,���� �����ڵ� -->
		<input type="hidden" name="cen_sch_id"  value="<%=cen_sch_id%>" width="150"/> <!-- ����ID -->
		<input type="hidden" name="user_id" value="<%=user_id%>" width="150"/><!-- ����� -->
		<input type="hidden" name="userid"  value="<%=user_id%>" width="150"/><!-- ��� , ������ -->
	</tr>
</table>
<table width="100%" cellspacing="0" cellpadding="0" border="0">
	<tr>
		<td>
			<table class="tblData" width="750">
				<tr>
					<th width="100" align="right">�����Ͻ� :&nbsp;</th>
					<td>
						<ucare:input type="text" name="bse_dt" width="70" title="��������" format="DATE" value="<%=CUtil.getMyDate(0, \"yyyy-MM-dd\")%>" pattern="D" required="true" requirednm="��������" maxlength="10" tag="onKeyUp=\"pressEnter('queryList(this)')\""/>
						<span class=calendar onclick="openCalendar('fDetail.bse_dt' , fDetail.bse_dt.value)"></span>&nbsp;
						<ucare:input type="text" name="bse_tm" format="TIME" maxlength="6" />
					</td>
					<th width="100">�����</th>
					<td>
						<ucare:input type="text" name="user_nm" width="200"/>
					</td>
				</tr>
				<tr>
					<th>�湮ó</th>
					<td>
						<ucare:input type="text" name="clnt_co" width="200"/>
					</td>
					<th>���»�</th>
					<td>
						<ucare:input type="text" name="visit_pat" width="200"/>
					</td>
				</tr>
				<tr>
					<th>�湮����</th>
					<td colspan="3">
						<ucare:input type="text" name="visit_cd" width="600"/>
					</td>
				</tr>
				<tr>
					<th>��������</th>
					<td colspan="3">
						<ucare:input type="text" name="cen_sch_sbjt" width="600"/>
					</td>
				</tr>
				<tr>
					<th>�ֿ䳻��</th>
					<td colspan="3">
						<textarea name="cen_sch_cont" class="input_textarea_required" style="width:600;height:100"  ></textarea>
					</td>
				</tr>
				<tr>
					<th>�湮���</th>
					<td colspan="3">
						<textarea name="visit_reg" class="input_textarea_required" style="width:600;height:100"  ></textarea>
					</td>
				</tr>
			</table>
			<!-- ��ư  -->
			<table border=0 cellpadding=0 cellspacing=0 width="750">
			 <tr>
				  <td align="right">
				   <div class="btnbar"></div>
					   <table class="tbl_button" border="0" cellpadding="0" cellspacing="0">
						    <tr>
							     <td><ucare:imgbtn name="btnSave" value="����" onClick="saves()"/></td>
							     <td><ucare:imgbtn name="btnClose" value="���" onClick="self.close()"/></td>
						    </tr>
					   </table> 
				  </td>
			 </tr>
			</table>
		</td>
	</tr>
</table>
</form>
<%@ include file="/jsp/include/include_car.jsp" %>
</body>
</html>