<%@ include file="/jsp/include/include.jsp" %>
<%@ page contentType="text/html;charset=euc-kr" %>

<html>
<head>
<title>전화걸기</title>
<script language="javascript">
var SELECT_ID = "UCCOM103S";
var g_callStatus = "";
var g_agentStatus = "";

//###################################
// ONLOAD
//###################################
function setInit() {
	f.custtelno.value = "";
	f.custtelno.focus();
}

//###################################
//전화걸기
//###################################
function CallTelno(){
	if(f.custtelno.value != ""){
		opener.ifmMain.ifmCrsCons.fConsAdd.calltelno.value = f.custtelno.value;
		opener.ifmMain.ifmCrsCons.fConsAdd.m_calltelno.value = telMask(f.custtelno.value, "M");

		opener.openMakeCall(f.custtelno.value, f.custtelno.value, f.custtelno.value, 2);

		self.close();
	}
}

//###################################
//취소
//###################################
function cancel(){
	f.reset();
}

</script>
</head>

<body topmargin="0" leftmargin="0" rightmargin="0" onLoad="setInit()">
<center>
<form name="f" method="post">
	<input type="hidden" name="mtelno">
	<table border="0" cellpadding="0" cellspacing="0" width="95%">
		<tr>
			<td class="stitle">전화걸기</td>
		</tr>
	</table>
	<ucare:table type="query" width="280">
		<tr height=10>
			<td colspan="2"></td>
		</tr>
		<tr>
			<td class="box_td01"  width="110" align="center">
				전화걸기&nbsp;&nbsp;&nbsp;
			</td>
			<td class="box_td02" width="160" align="left">
				<input type="text" name="custtelno" class="frm_text" size="20">
				<span class=phone onClick="CallTelno()"></span>
			</td>
		</tr>
	</ucare:table>
	<table border="0" width="280">
	  	<tr height=10>
	  		<td align="right">
	  			&nbsp;<ucare:imgbtn name="btncancel" value="닫기"  width="50" onClick="self.close()" />
	  		</td>
	  	</tr>
	</table>
</form>
</body>
</html>