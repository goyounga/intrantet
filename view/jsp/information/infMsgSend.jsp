<!--
  PROJ : Nexfron Intranet
  NAME : infMsgSend.jsp
  DESC : �޼���������  ȭ��
  Author : ��¿�
  VER  : 1.0
  Copyright 2009 Nexfron All rights reserved
  ============================================================================================
  								��		��		��		��
  ============================================================================================
  VERSION		DATE		AUTHOR		DESCRIPTION
  ============================================================================================
  1.0		2009.08.18		��¿�		�����ۼ�
  -->
<%@ page language="java" contentType="text/html; charset=euc-kr"%>
<%@ include file="/jsp/include/include.jsp"%>
<%
	String recv_id = CUtil.nvl(request.getParameter("send_id"),"");
	String send_nm = CUtil.nvl(request.getParameter("send_nm"),"");
	String reMsg = CUtil.nvl(request.getParameter("reMsg"),"");
%>
<html>
<head>
<title></title>
<script language="javascript" src="js/infMsgSend.js"></script>
</head>
<body topmargin=0 leftmargin=0 onload="reMsgSend()">
<form name="f0">
<input type="hidden" name="recv_id" value="<%=recv_id%>" >
<input type="hidden" name="send_nm" value="<%=send_nm%>">
<input type="hidden" name="reMsg" value="<%=reMsg%>">
</form>
<form name="f">
<input type="hidden" name="send_id" value="<%=sessioninfo.getUserID()%>">
<table width="300" cellpadding="0" cellspacing="0" border="0" background="/html/images/common/popupbg.gif">
 	<tr height="30">
 		<td class="popup_tit"><b>���� ������</b><br></td>
	</tr>
</table>
<table align="center">
	<tr>
		<td>
			<ucare:table type="detail" width="300">
				<tr>
					<td class=MANTDT width="60">�� ��</td>
					<td class=MANTDM width="240"><ucare:input type="text" name="title" required="true" requirednm="����" width="220" mode="active"/> </td>
				</tr>
				<tr>
					<td class=MANTDT width="60">�� ��</td>
					<td class=MANTDM width="240"><textarea name="contents" rows="10" cols="33" required="true" requirednm="����" mode="active"></textarea></td>
				</tr>
				<tr>
				<td class=MANTDT width="60" rowspan="2">�޴»��</td>
				<td class=MANTDM width="240">
					<ucare:grid id="UCINF002I" width="220" height="150" no="true" title="true">
						<tr event="O">
							<td width="40" column="chk"  title="����" format="CHECKBOX" hcheckbox="true" editable="true"/>	
							<td width="140" column="recv_nm" title="�޴»��"/>
							<td width="0" column="recv_id" title="�޴»�� ID"/>
						</tr>
					</ucare:grid>
				</td></tr><tr>
				<td class="MANTDT4" width="220"><ucare:imgbtn width="70" name="btnImage" value="�߰�" onClick="openUserOrg('UCINF002I')"/>
												<ucare:imgbtn width="70" name="btnImage" value="����" onClick="ps_Del()"/></td>
				</tr>
				<tr>
					<td class="MANTDT4" width="275" colspan="2"><ucare:imgbtn width="70" name="btnImage" value="������" onClick="send_Query()"/><ucare:imgbtn name="btnQuery" kind="X"  width="70" onClick="self.close()" /></td>
				</tr>
			</ucare:table>	
		</td>
	</tr>
</table>
</form>
<form name="ff">
<input type="hidden" name="recv_nm">
<input type="hidden" name="recv_id">
</form>
</body>
</html>