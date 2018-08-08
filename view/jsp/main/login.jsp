<!--
  PROJ : Nexfron Intranet
  NAME : login.jsp
  DESC : 로그인 화면
  Author : 김은수 과장
  VER  : 1.0
  Copyright 2009 Nexfron All rights reserved
  ============================================================================================
  								변		경		사		항
  ============================================================================================
  VERSION		DATE		AUTHOR		DESCRIPTION
  ============================================================================================
  1.0		2009.08.13		김은수		주석추가
  -->
<%@ page language="java" contentType="text/html; charset=EUC-KR"
	import ="java.io.*,ucare.jaf.common.*"%>
<html>
<head>
<meta http-equiv="X-UA-Compatible" content="IE=EmulateIE7,IE=EmulateIE8,IE=EmulateIE9" />
<title>NEXFRON - INTRANET</title>
<link rel = "stylesheet" href = "/html/style/common.css" type = "text/css">
<script language="javascript">
var scriptPath = "";
window.status = "";
</script>
<script language="JavaScript" src="/html/js/ucare/ucare_objectUtils.js"></script>
<script language="JavaScript" src="/html/js/ucare/ucare_transaction.js"></script>
<script language="JavaScript" src="/html/js/ucare/ucare_htmlUtil.js"></script>
<script language="JavaScript" src="/html/js/ucare/ucare_dataset.js"></script>
<script language="JavaScript" src="/html/js/ucare/ucare_util.js"></script>
<script language="JavaScript" src="/html/js/ucare/ucare_intranet.js"></script>
<script language="JavaScript" src="/html/js/main/login.js"></script>
</head>
<body topmargin="0" leftmargin="0" bgcolor="#FFFFFF" text="#000000" onload="init();">
<form name="f">
<table width="450" height="320" cellpadding="0" cellspacing="0" border="0">
	<tr>
		<td background="/html/images/login/pop_top_line.gif" height="10"></td>
	</tr>
	<tr>
		<td align="center" valign="top">
			<table width="400" cellpadding="0" cellspacing="0" border="0">
				<tr>
					<td height="35">&nbsp;</td>
				</tr>
				<tr>
					<td><img src="/html/images/login/pop_login_title.gif"></td>
				</tr>
				<tr>
					<td height="30">&nbsp;</td>
				</tr>
				<tr>
					<td align="center">
						<table width="260" cellpadding="0" cellspacing="0" border="0">
							<tr>
								<td width="8" ><img width="8" src="/html/images/login/login_table_lf.gif"></td>
								<td height="75" align="middle" background="/html/images/login/login_table_bg.gif">
									<table cellpadding="0" cellspacing="0" border="0">
										<tr>
											<td align="right">
												<table width="175" cellpadding="0" cellspacing="1" border="0">
													<tr>
														<td width="50">아이디</td>
														<td width="110"><input type="text" name="user_id" class="frm_text" style="width:110px" onkeypress="userid_onkeydown()" tabindex="1"></td>
													</tr>
													<tr>
														<td>비밀번호</td>
														<td><input type="password" name="user_pwd" class="frm_text" style="width:110px" onkeydown="password_onkeydown()" tabindex="2"></td>
													</tr>
												</table>
											</td>
											<td width="62"><img width="62" height="58" src="/html/images/login/btn_login.gif" onclick="setLogin()" style="cursor:pointer"></td>
										</tr>
									</table>
								</td>
								<td width="8" align="right"><img width="8" src="/html/images/login/login_table_rt.gif"></td>
							</tr>
						</table>
					</td>
				</tr>
				<tr align="center" height="30">
					<td>
						<label for="saveid" style="cursor:pointer"><input type="checkbox" id="saveid" name="saveid" value="Y" class="frm_checkbox">아이디 기억하기</label>
					</td>
				</tr>
				<!--tr>
					<td align="center">
						<table width="300" cellpadding="0"  cellspacing="0" border="0">
							<tr>
								<td height="5">&nbsp;</td>
							</tr>
							<tr height="20">
								<td><a href="http://222.112.196.235:8104"><font style="font-weight:bold;color:blue">WFM(8104)&nbsp;</font><span></td>
								<td><a href="http://222.112.196.235:8400"><font style="font-weight:bold;color:blue">ASP(8400)&nbsp;</font><span></td>
								<td><a href="http://222.112.196.235:8200"><font style="font-weight:bold;color:blue">KMS(8200)&nbsp;</font><span></td>
								<td><a href="http://222.112.196.235:8300"><font style="font-weight:bold;color:blue">VOC(8300)</font><span></td>
							</tr>
							<tr>
								<td height=5>&nbsp;</td>
							</tr>
						</table>
					</td>
				</tr-->
			</table>
		</td>
	</tr>
	<tr>
		<td height="47">
			<table width="450" height="47" cellpadding="0" cellspacing"0" border="0">
				<tr>
					<td background="/html/images/login/pop_footer_line.gif" colspan="2" height="12"></td>
				</tr>
				<tr>
					<td align="center" style="padding: 0 0 0 28"><img src="/html/images/login/pop_footer.gif"></td>
					<td align="right" width="100" style="padding: 0 10 0 0"><img src="/html/images/login/btn_close.gif" style="cursor:hand" onclick="top.close();"></td>
				</tr>
			</table>
		</td>
	</tr>
</table>
</form>
</body>
</html>