<%@ page language="java" contentType="text/html; charset=EUC-KR" pageEncoding="EUC-KR"%>
<%
       //Status�� 200(OK)�� Response���� ������            �������� Default 404 Error Page�� �߰� �ȴ�.
        response.setStatus( HttpServletResponse.SC_OK );

		String msgCode	= request.getParameter("msgCode");
%>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=EUC-KR" />
<title>UCare Error</title>
<style>
.msg1 {color:#f86d2a; font-weight:bold; font-size:13px; font-family:'Dotum','����';}
.msg2 {color:#4e81cd; font-weight:bold; font-size:12px; font-family:'Dotum','����';}
</style>
</head>
<body>
<table width="100%" height="100%" cellpadding="0" cellspacing="0" border="0" bordercolor="red">
	<tr>
		<td valign="middle" align="center" >
			<table width="859" height="377" cellpadding="0" cellspacing="0" border="0" bordercolor="blue">
				<tr>
					<td height="377" background="/html/images/error/error.jpg"></td>
				</tr>
				<tr>
					<td align="center">
						<span id="msg1" class="msg1"></span>&nbsp;&nbsp;
						<a class="msg1" href="/index.jsp">[Login]</a>
						<a class="msg1" href="javascript:winClose();">[Close]</a>
						<br><br>
						<span id="msg2" class="msg2"></span>
					</td>
				</tr>
			</table>
		</td>
	</tr>
</table>
</body>
<script type="text/javascript">
	if("<%=msgCode%>"=="nosession")
	{
		var msg1 = "������ ������ϴ�. ��α��� ���ּ���.";
		var msg2 = "(��ð� �̻��(20��) �Ǵ� ��Ʈ���� �Ҿ����� �� �ֽ��ϴ�.)"
		document.getElementById("msg1").innerHTML = msg1;
		document.getElementById("msg2").innerHTML = msg2;
	}

	function winClose()
	{
		if(navigator.appVersion.indexOf("MSIE 7.0")>=0){
			window.open("test.jsp","_self").close();
		}else if(navigator.appVersion.indexOf("MSIE 8.0")>=0){
			window.open("test.jsp","_self").close();
		}else if(navigator.appVersion.indexOf("MSIE 9.0")>=0){
			window.open("test.jsp","_self").close();
		}else{
		    self.close();
		}
	}
</script>
</html>