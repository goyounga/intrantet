<!--
  PROJ : Nexfron Intranet
  NAME : demoLogin.jsp
  DESC : µ¥¸ðÆäÀÌÁö ¸µÅ©
  Author : ±è¼ö¹Î
  VER  : 1.0
  Copyright 2009 Nexfron All rights reserved
  ============================================================================================
  								º¯		°æ		»ç		Ç×
  ============================================================================================
  VERSION		DATE		AUTHOR		DESCRIPTION
  ============================================================================================
  1.0		2012.04.06		±è¼ö¹Î		ÃÖÃÊÀÛ¼º
  -->
  
<%@ page language="java" contentType="text/html; charset=EUC-KR"
	import ="java.io.*,ucare.jaf.common.*"%>

<html>
<head>
<title>NEXFRON - INTRANET</title>

<link rel = "stylesheet" href = "/html/style/common.css" type = "text/css">
<script language="javascript">
	var scriptPath = "";
	window.status = "";
</script>
<%@ include file="/jsp/include/include.jsp"%>
</head>

<body topmargin=0 leftmargin=0 bgcolor=#FFFFFF text=#000000 onload="">
 
<form name=f>
<input type="hidden" name="loginYN" value="<%=request.getParameter("target")%>">
<table height=220 cellspacing=0 cellpadding=0 width=450 border=0>
	<tr>
		<td background="/html/images/login/pop_top_line.gif" height=10></td>
	</tr>
	<tr>
		<td valign=top align=center>
			<table cellspacing=0 cellpadding=0 width=320 border=0 height=120>
				<td align="center">
					<tr>
						<td height=5>&nbsp;</td>
					</tr>
					<tr height="20">
						<td>
							<a href="http://222.112.196.235:8208/jsp/login.jsp?userid=9999999" target="new"><img src="<%=scriptPath%>/images/main/wfm.gif" style="cursor:hand" border="0" alt="wfm Open"></a>
						</td>
						<td>
							<a href="http://222.112.196.235:8400" target="new"><img src="<%=scriptPath%>/images/main/asp.gif" style="cursor:hand" border="0" alt="asp Open"></a>
						</td>
						<td>
							<a href="http://222.112.196.235:8200/jsp/main/kmsLogin.jsp?user_id=skyu" target="new"><img src="<%=scriptPath%>/images/main/kms.gif" style="cursor:hand" border="0" alt="kms Open"></a>
						</td>
						<td>
							<a href="http://222.112.196.235:8300/jsp/main/vocLogin.jsp?user_id=nexfron" target="new"><img src="<%=scriptPath%>/images/main/voc.gif" style="cursor:hand" border="0" alt="voc Open"></a>
						</td>
					</tr>
					<td height=5>&nbsp;</td>
			</table>
		</td>
	</tr>
	<tr>
		<td height=47>
			<table height=47 cellspacing=0 cellpadding=0 width=420 border=0>
				<tr>
					<td background="/html/images/login/pop_footer_line.gif" colspan=2 height=12></td>
				</tr>
				<tr>
					<td align=center><img src="/html/images/login/pop_footer.gif"></td>
					<td align=right width=10 style="padding: 0 10 0 0"><img src="/html/images/login/btn_close.gif" style="cursor:hand" onclick="top.close();"></td>
				</tr>
			</table>
		</td>
	</tr>
</table>
</form>
</body>

</html>

