<%@ page contentType="text/html;charset=euc-kr" %>
<%@ include file="/jsp/include/include.jsp"%>
<%
	request.setCharacterEncoding("EUC-KR");
	String frm = request.getParameter("frm");	
	String corp_cd = request.getParameter("corp_cd");	
%>  

<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=EUC-KR">
<title>������� �˻�</title>
<script language="javascript" src="/html/js/common/comConsType.js"></script>
</head>
<body topmargin="0" leftmargin="0" onload="init();">
<form name="fQuery">
<input type="hidden" name="frame" value="<%=frm%>"><!-- frm ��� -->
<input type="hidden" name="corp_cd" value="<%=corp_cd%>"><!-- corp_cd ��� -->
<input type="hidden" name="lcode">
<input type="hidden" name="mcode">
<input type="hidden" name="scode">

<table border=0 cellpadding=0 cellspacing=0 width="790">
	<tr>
		<td>
			<table width="790" cellpadding="0" cellspacing="0" border="0">
				<tr>
					<td><ucare:xtitle title="������� �˻�"/></td>
				</tr>
			</table>
		</td>
	</tr>
</table>
<table border=0 cellpadding=1 cellspacing=1 width=800>
	<tr valign=top>
		<td>
			<table border=0 cellpadding=1 cellspacing=1 width=100%>
				<tr>
					<td>
						<ucare:table type="query" width="100%">
							<tr>
								<td width=80 align=right>������� :&nbsp;</td>
								<td width=150><input type="text" name="constype" class="frm_text" size="30" onKeyPress="checkEnterKey();"></td>
								<td>&nbsp;</td>
								<td width=1 bgcolor=#CCCCCC></td>
				 				<td width=80 align=center>
				 					<ucare:imgbtn name="btnQuery" kind="R"  width="70" onClick="query()"/>	<!-- ��ȸ -->
							</tr>
						</ucare:table>
					</td>
				</tr>
				<tr>
					<td>
						<ucare:grid id="UCCOM005S" width="790" height="421" no="true">
							<tr event="D">
								<td width="196" column="lcodenm" title="�������(��)" align="left" distinct="true"></td>
								<td width="200" column="mcodenm" title="�������(��)" align="left" distinct="true"></td>
								<td width="350" column="scodenm" title="�������(��)" align="left"></td>
								<td width="196" column="lcode"	 title="�������(��)" hidden="true"  align="left" distinct="true"></td>
								<td width="200" column="mcode"	 title="�������(��)" hidden="true"  align="left" distinct="true"></td>
								<td width="350" column="scode"	 title="�������(��)" hidden="true"  align="left"></td>
							</tr>
						</ucare:grid>
					</td>
				</tr>
			</table>
		</td>
	</tr>
</table>
</form>

</body>
</html>