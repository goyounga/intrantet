<!--
  PROJ   : Nexfron Intranet
  NAME   : comMailSendP.jsp
  DESC   : ���Ϲ߼�
  Author : ���ر� ����
  VER    : 1.0
  Copyright 2012 Nexfron All rights reserved
  ============================================================================================
  								��		��		��		��
  ============================================================================================
  VERSION		DATE		AUTHOR		DESCRIPTION
  ============================================================================================
  1.0		2012.04.08		���ر�		����
  -->
<%@ page language="java" contentType="text/html; charset=EUC-KR"%>
<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=EUC-KR">
	<title>������ƮQ&A</title>
	<%@ include file="/jsp/include/include.jsp"%>
	<script language="javascript" src="<%=scriptPath%>/js/common/comMailSendP.js"></script>
	<link rel="stylesheet" href="/html/style/ucareStyle.css" type="text/css">
	<style>
		.receiver_view {border:1px solid #B5C5DE;overflow-y:auto;padding:5 5 5 5;text-align:left;}
		.spnReceiver   {border:1px solid #C0C0C0;height:20px; padding:4 4 4 4;margin:0 4 4 0;font-weight:bold;  cursor:pointer;}
		.spnReceiverDel{border:1px solid #C0C0C0;height:20px; padding:4 4 4 4;margin:0 4 4 0;font-weight:bold;cursor:pointer;text-decoration:line-through;color:red}
	</style>
</head>
<body topmargin="0" leftmargin="0"  onload="init();" style="text-align:center">
<table width="100%" cellpadding="0" cellspacing="0" border="0" background="/html/images/common/popupbg.gif">
	<tr height="30">
		<td class="ptitle"><b> ���Ϲ߼� </b></td>
	</tr>
</table>
<table width="99%" cellpadding="0" cellspacing="0" border="0">
	<tr>
		<td class="hmargin5"></td>
	</tr>
	<tr>
		<td>
			<form name="f">
			<table class="tblData" width="100%">
				<col width="80"	/>
				<col width=""	/>
				<input type="hidden" name="userid" 		value="">
				<input type="hidden" name="username" 	value="">
				<input type="hidden" name="em_addr" 	value="">
				<tr >
					<th >�޴»��</th>
					<td style="height:120; text-align:right">
						<div id="divReceiver" class="receiver_view" style="height:100"></div>
						<b>e-mail :</b>
						<input type="text" name="email_receiver" style="width:220" class="input_text">
						<span class="plus" onClick="addMailAddress();"></span>
						<span class="refresh" onClick="delMailAddress();"></span>
						<span class="search" onClick="openOrgAddress()"></span>
					</td>
				</tr>
				<tr>
					<th>����</th>
					<td>
						<select name="email_type">
							<option></option>
							<option>[����]</option>
							<option>[��ü����]</option>
							<option>[��Ʈ����]</option>
							<option>[�ʵ�]</option>
							<option>[�˸�]</option>
						</select>
						<input type="text" name="email_title" class="input_required" style="width:87%;ime-mode:active;">
					</td>
				</tr>
				<tr>
					<td  colspan="2">
						<textarea name="email_cntn" class="input_textarea_required" style="width:100%;height:500;" maxlength="500"></textarea>
					</td>
				</tr>
			</table>
			</form>
		</td>
	</tr>
	<tr><td class="hmargin5"></td></tr>
	<tr>
		<td align="right">
			<table class="tbl_button" border="0" cellpadding="0" cellspacing="0">
				<tr>
					<td><ucare:imgbtn name="btnReset"	kind="A" onClick="resetAll()"	value="�ʱ�ȭ" 	width="60"/></td>
					<td><ucare:imgbtn name="btnSend" 	kind="A" onClick="sendMail()"	value="�߼�"	width="50"/></td>
					<td><ucare:imgbtn name="btnClose" 	kind="X" onClick="self.close()"	width="50"/></td>
				</tr>
			</table>
		</td>
	</tr>
</table>
</body>
</html>