<%@ include file="/jsp/include/include.jsp" %>
<%@ page contentType="text/html;charset=euc-kr" %>

<html>
<head>
<title>3�� ��ȭ</title>

<script language="javascript">
function setInit(){
	document.all("btnconn").disabled=true;
	document.all("btncancel").disabled=true;
	
	f.telno.focus();
}

//3��
function conference(){
	var telno = numberMask(f.telno.value);
	
	if(f.telno.value==""){
		alert("��ȭ��ȣ�� �Է��ϼ���.");
		f.telno.focus();
		return;
	}
	
	opener.InitiateConference(telno);
	
	document.all("btnconn").disabled=true;
	document.all("btncancel").disabled=false;
	
	//����Ǹ� �Ϸ� ��ư Ȱ��ȭ
	document.all("btntxt").disabled=true;
	document.all("btnconn").disabled=false;
	document.all("btncancel").disabled=false;
}

//����
function confComplete(){

	opener.CompleteConference();
	
	window.close();
}

//���
function cancel(){
	opener.ReconnectCall();
	
	document.all("btntxt").disabled=false;
	document.all("btnconn").disabled=true;
	document.all("btncancel").disabled=true;
}
</script>
</head>

<body topmargin="0" leftmargin="0" rightmargin="0" onLoad="setInit()">
<center>
<form name="f" method="post" onsubmit="return false;">

	<table border="0" cellpadding="0" cellspacing="0" width="95%">
		<tr>
			<td class="stitle">3�� ��ȭ</td>
		</tr>
	</table>
	<ucare:table type="query" width="280">
		<tr>
			<td height="5"></td>
		</tr>
		<tr>
			<td class="box_td01"  width="110" align="right">��ȭ��ȣ :&nbsp;</td>
			<td class="box_td02" width="160" align="left">
				<input type="text" name="telno" class="frm_text" size="20" onkeypress="checkKey('makeCall');">
			</td>
		</tr>
		<tr>
			<td height="5"></td>
		</tr>
	</ucare:table>
	<table border="0" width="280">
	  	<tr height=35>
	  		<td align="center">
	  			<ucare:imgbtn name="btntxt" value="3����ȭ"  width="60" onClick="conference()" classL="imgbtnLeft" classM="imgbtn" classR="imgbtnRight" />
	  			<ucare:imgbtn name="btnconn" value="����"  width="40" onClick="confComplete()" classL="imgbtnLeft" classM="imgbtn" classR="imgbtnRight" />
	  			<ucare:imgbtn name="btncancel" value="���"  width="40" onClick="cancel()" classL="imgbtnLeft" classM="imgbtn" classR="imgbtnRight" />
	  		</td>
	  	</tr>
	</table>
</form>
</center>
</body>
</html>