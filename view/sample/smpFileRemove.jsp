<%@ page language="java" contentType="text/html; charset=EUC-KR"%>
<%@ include file="/jsp/include/include.jsp"%>    
<html>
<head>
<title>���ϻ��� ����</title>
<script language="javascript" src="js/smpFileRemove.js"></script>
</head>
<body>
<form name="f">

<ucare:table type="detail" width="680">
	<tr>
		<td class=MANTDT>���ϸ�(Ȯ��������)</td>
		<td class=MANTDM colspan="2">
			<input type="text" name="testfile" size="20"> <!-- ������ ���ϸ��� �Է��Ѵ�. -->
			<ucare:imgbtn width="80" name="btnRemove" value="���ϻ���" onClick="removeMyFile()"/>
		</td>
	</tr>
	<tr>
		<td class=MANTDT>����ڵ�</td>
		<td class=MANTDM colspan=2>
			<input type=text class=TXT name=errcode style="width:220" readonly>
		</td>
	</tr>
	<tr>
		<td class=MANTDT>�����޼���</td>
		<td class=MANTDM colspan=2>
			<input type=text class=TXT name=errmsg style="width:220" readonly>
		</td>
	</tr>
</ucare:table>

</form>

</body>
</html>