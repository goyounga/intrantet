<!--
  PROJ : Nexfron Intranet
  NAME : comChangePwd.jsp
  DESC : ��й�ȣ ���� ȭ��
  Author : ������ ����
  VER  : 1.0
  Copyright 2009 Nexfron All rights reserved
  ============================================================================================
  								��		��		��		��
  ============================================================================================
  VERSION		DATE		AUTHOR		DESCRIPTION
  ============================================================================================
  1.0		2009.09.22		������		�ּ��߰�
  -->
  
<%@ page contentType="text/html;charset=euc-kr" %>

<html>
<head>
	<title>��й�ȣ����</title>
	<%@ include file="/jsp/include/include.jsp"%>
	<script language="javascript" src="<%= scriptPath %>/js/common/comChangePwd.js"></script>
</head>

<body topmargin=0 leftmargin=0 onload="init();" >

<table width="280" cellpadding="0" cellspacing="0" border="0">
	<tr>
 		<td>
 			<table width="280" cellpadding="0" cellspacing="0" border="0" background="/html/images/common/popupbg.gif">
 				<tr height="30">
 					<td class="popup_tit"><b>��й�ȣ����</b></td>
 				</tr>
 			</table>
		</td>
	</tr>
	<tr>
		<td height="5"></td>
	</tr>
	<tr>
		<td style="padding:0 5 0 5;">
			<table width="270" cellpadding="0" cellspacing="0" border="0">
				<form	name="f" method="post">
				<input type="hidden" name="userid" value="<%=sessioninfo.getUserID()%>">
				<tr>
					<td>
						<ucare:table type="detail">
							<tr>
								<td class=MANTDT width="120">���� ��й�ȣ</td>
								<td class=MANTDM width="150">
									<input class='input_required' type="password" name="oldpwd" style='width:100%;  ime-mode:inactive; ' required="true" requirednm="���� ��й�ȣ" maxlength="10" maxsize="10"  value="" onblur="checkValidation(this, true, false)" onfocus="select()" onKeyPress="login_onKeyPress('oldpwd')"/>
								</td>
							</tr>
							<tr>
								<td class=MANTDT width="120">�� ��й�ȣ</td>
								<td class=MANTDM width="150">
									<input class='input_required' type="password" name="newpwd" style='width:100%;  ime-mode:inactive; ' required="true" requirednm="�� ��й�ȣ" maxlength="10" maxsize="10"  value="" onblur="checkValidation(this, true, false)" onfocus="select()" onKeyPress="login_onKeyPress('newpwd')"/>
								</td>
							</tr>
							<tr>
								<td class=MANTDT width="120">�� ��й�ȣ Ȯ��</td>
								<td class=MANTDM width="150">
									<input class='input_required' type="password" name="newpwdok" style='width:100%;  ime-mode:inactive; ' required="true" requirednm="�� ��й�ȣ Ȯ��" maxlength="10" maxsize="10"  value="" onblur="checkValidation(this, true, false)" onfocus="select()" onKeyPress="login_onKeyPress('newpwdok')"/>
								</td>
							</tr>
						</ucare:table>
					</td>
				<tr>
					<td height="5"></td>
				</tr>
				<tr>
					<td align="right">
						<ucare:imgbtn name="btnApply" value="����"   onClick="checkSave();"/>&nbsp;
						<ucare:imgbtn name="btnApply" value="�ٽ��Է�"   onClick="refresh();"/>&nbsp;
						<ucare:imgbtn name="btnClose" value="�ݱ�"   onClick="pwdclose();"/>
					</td>
				</tr>
			</table>
		</td>
	</tr>
</table>
</form>

</body>
</html>