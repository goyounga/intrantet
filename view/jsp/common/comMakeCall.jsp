<%@ include file="/jsp/include/include.jsp" %>
<%@ page contentType="text/html;charset=euc-kr" %>
<%
	String officetelno = CUtil.replace(CUtil.nvl(request.getParameter("officetelno")), "-", "");
	String mobiletelno = CUtil.replace(CUtil.nvl(request.getParameter("mobiletelno")), "-", "");
	String etctelno = CUtil.replace(CUtil.nvl(request.getParameter("etctelno")), "-", "");
	String telnogb = CUtil.nvl(request.getParameter("telnogb"));
%>
<html>
<head>
<title>전화걸기</title>

<script language="javascript">
function setInit(){
	f.no_check[<%=telnogb%>].checked = 1;
	f.telno[<%=telnogb%>].focus();
}

function makeCall(){
	var telno = "";
	
	for(var i = 0 ; i < f.no_check.length ; i++)
	{
		if(f.no_check[i].checked == 1)
		{
			telno = numberMask(f.telno[i].value);
		}
	}
	
	if(telno == ""){
		alert("전화번호를 입력하세요.");
		return;
	}
	
	opener.MakeCall(telno);
	self.close();
}

function changeCheck(index)
{
	f.no_check[index].checked = true;
}

function changeFocus(index)
{
	f.telno[index].focus();
	f.telno[index].select();
}
</script>
</head>

<body topmargin="0" leftmargin="0" rightmargin="0" onLoad="setInit()">
<center>
<form name="f" method="post">
	<table border="0" cellpadding="0" cellspacing="0" width="95%">
		<tr>
			<td class="stitle">전화걸기</td>
		</tr>
	</table>
	<ucare:table type="query" width="280">
		<tr height=2>
			<td colspan=3></td>
		</tr>
		<tr height=23>
			<td width="50" align=right><input type="radio" name="no_check" class="frm_radio" onclick="changeFocus(0);"></td>
			<td width="80" align="right">전화번호 :&nbsp;</td>
			<td width="190" align="left">
				<input type="text" name="telno" class="frm_text" size="20" onfocus="changeCheck(0)" value="<%=officetelno%>" onkeypress="checkKey('makeCall');">
			</td>
		</tr>
		<!-- <tr height=23>
			<td align=right><input type="radio" name="no_check" class="frm_radio" onclick="changeFocus(1);"></td>
			<td align="right">휴대전화 :&nbsp;</td>
			<td align="left">
				<input type="text" name="telno" class="frm_text" size="20" onfocus="changeCheck(1)" value="<%=mobiletelno%>" onkeypress="checkKey('makeCall');">
			</td>
		</tr>
		<tr height=23>
			<td align=right><input type="radio" name="no_check" class="frm_radio" onclick="changeFocus(2);"></td>
			<td align="right">기타 :&nbsp;</td>
			<td align="left">
				<input type="text" name="telno" class="frm_text" size="20" onfocus="changeCheck(2)" value="<%=etctelno%>" onkeypress="checkKey('makeCall');">
			</td>
		</tr> -->
	</ucare:table>
	<table border="0" width="280">
	  	<tr height=35>
	  		<td align="center">
	  			<ucare:imgbtn name="btnCall" value="전화걸기"  width="60" onClick="makeCall()" classL="imgbtnLeft" classM="imgbtn" classR="imgbtnRight" />
	  			<ucare:imgbtn name="btnClose" value="닫기"  width="40" onClick="window.close()" classL="imgbtnLeft" classM="imgbtn" classR="imgbtnRight" />
	  		</td>
	  	</tr>
	</table>
</form>
</center>
</body>
</html>