<%@ page contentType="text/html;charset=euc-kr" %>
<%@ include file="/jsp/include/include.jsp"%>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=EUC-KR">
<title>예약 통화</title>
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
					<td class="popup_tit"><b>예약 통화</b></td>
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
					<td width="100"	column="res_dt"				title="예약일자"		align="center"	 format="DATE"></td>
					<td width="83"	column="res_tm"				title="예약시간" 		align="center"></td>
					<td width="130"	column="atcl_no"			title="매물번호" 		align="center"></td>
					<td width="130"	column="res_tp_nm" 		title="예약유형" 		align="center"></td>
					<td width="120"	column="m_res_tel_no"		title="전화번호" 		align="center"></td>
				  </tr>
				</ucare:grid>
		</td>
	</tr>
</table>
</form>
</body>
</html>
