<%@ page language="java" contentType="text/html; charset=EUC-KR"%>
<%@ include file="/jsp/include/include.jsp"%>    
<html>
<head>
<title>Validataion ����</title>
<script language="javascript" src="js/smpValidataion.js"></script>
</head>
<body>
<form name="f" target="iLog">

<ucare:table type="detail" width="980">
	<tr>
		<td class="MANTDM" style="width:80">����ڸ�</td>
		<td class="MANTDM"><input requirednm="����ڸ�" name="pty_kor_name" required=true disabled></td>
	</tr>
	<tr>
		<td class="MANTDM">�ݾ�</td>
		<td class="MANTDM"><input name="pty_amt" requirednm="�ݾ�" required=true format="MONEY"></td>
	</tr>
	<tr>
		<td class="MANTDM" colspan="2">
			<ucare:imgbtn width="80" name="btnCheck" value="CHECK" onClick="dataCheck()"/>
		</td>
	</tr>
	<tr>
		<td colspan="2">
			MONEY, NUMBER, DATE, MAX
		</td>
	</tr>
</ucare:table>	

</form>

</body>
</html>