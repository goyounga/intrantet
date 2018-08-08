<!--
  PROJ : Nexfron Intranet
  NAME : comChangePwd.jsp
  DESC : 비밀번호 변경 화면
  Author : 김은수 과장
  VER  : 1.0
  Copyright 2009 Nexfron All rights reserved
  ============================================================================================
  								변		경		사		항
  ============================================================================================
  VERSION		DATE		AUTHOR		DESCRIPTION
  ============================================================================================
  1.0		2009.09.22		김은수		주석추가
  -->
  
<%@ page contentType="text/html;charset=euc-kr" %>

<html>
<head>
	<title>비밀번호변경</title>
	<%@ include file="/jsp/include/include.jsp"%>
	<script language="javascript" src="<%= scriptPath %>/js/common/comChangePwd.js"></script>
</head>

<body topmargin=0 leftmargin=0 onload="init();" >

<table width="280" cellpadding="0" cellspacing="0" border="0">
	<tr>
 		<td>
 			<table width="280" cellpadding="0" cellspacing="0" border="0" background="/html/images/common/popupbg.gif">
 				<tr height="30">
 					<td class="popup_tit"><b>비밀번호변경</b></td>
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
								<td class=MANTDT width="120">현재 비밀번호</td>
								<td class=MANTDM width="150">
									<input class='input_required' type="password" name="oldpwd" style='width:100%;  ime-mode:inactive; ' required="true" requirednm="현재 비밀번호" maxlength="10" maxsize="10"  value="" onblur="checkValidation(this, true, false)" onfocus="select()" onKeyPress="login_onKeyPress('oldpwd')"/>
								</td>
							</tr>
							<tr>
								<td class=MANTDT width="120">새 비밀번호</td>
								<td class=MANTDM width="150">
									<input class='input_required' type="password" name="newpwd" style='width:100%;  ime-mode:inactive; ' required="true" requirednm="새 비밀번호" maxlength="10" maxsize="10"  value="" onblur="checkValidation(this, true, false)" onfocus="select()" onKeyPress="login_onKeyPress('newpwd')"/>
								</td>
							</tr>
							<tr>
								<td class=MANTDT width="120">새 비밀번호 확인</td>
								<td class=MANTDM width="150">
									<input class='input_required' type="password" name="newpwdok" style='width:100%;  ime-mode:inactive; ' required="true" requirednm="새 비밀번호 확인" maxlength="10" maxsize="10"  value="" onblur="checkValidation(this, true, false)" onfocus="select()" onKeyPress="login_onKeyPress('newpwdok')"/>
								</td>
							</tr>
						</ucare:table>
					</td>
				<tr>
					<td height="5"></td>
				</tr>
				<tr>
					<td align="right">
						<ucare:imgbtn name="btnApply" value="저장"   onClick="checkSave();"/>&nbsp;
						<ucare:imgbtn name="btnApply" value="다시입력"   onClick="refresh();"/>&nbsp;
						<ucare:imgbtn name="btnClose" value="닫기"   onClick="pwdclose();"/>
					</td>
				</tr>
			</table>
		</td>
	</tr>
</table>
</form>

</body>
</html>