<%@ page contentType="text/html;charset=euc-kr" %>
<%@ include file="/jsp/include/include.jsp"%>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=EUC-KR">
<title>���� ��ȭ</title>
<script language="javascript" src="/html/js/common/comReservedCall.js"></script>
</head>
<body topmargin=0 leftmargin=0 onload="init();">
<form name="fQuery">
	<input type="hidden" name="userid" value="<%=sessioninfo.getUserID()%>">

<table border=0 cellpadding=0 cellspacing=0 width=800>
	<tr>
		<td>
			<table width="100%" height="30" border="0" cellpadding="0" cellspacing="0" background="/html/images/common/popupbg.gif">
				<tr>
					<td class="popup_tit"><b>���� ��ȭ</b></td>
				</tr>
			</table>
		</td>
	</tr>
</table>
<table border=0 cellpadding=1 cellspacing=1 width=800>
	<tr valign=top>
		<td>
			<ucare:grid id="UCSYS092S" width="602" height="467" no="true">
				  <tr class="LIST" event="D">
					<td width="100"	column="res_dt"				title="��������"		align="center"	 format="DATE"></td>
					<td width="83"	column="res_tm"				title="����ð�" 		align="center"></td>
					<td width="130"	column="atcl_no"			title="�Ź���ȣ" 		align="center"></td>
					<td width="130"	column="res_tp_nm" 		title="��������" 		align="center"></td>
					<td width="120"	column="m_res_tel_no"		title="��ȭ��ȣ" 		align="center"></td>
				  </tr>
				</ucare:grid>
		</td>
	</tr>
</table>
</form>
</body>
</html>
