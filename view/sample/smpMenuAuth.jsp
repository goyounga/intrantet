<%@ page language="java" contentType="text/html; charset=EUC-KR"%>
<%@ include file="/jsp/include/include.jsp"%>    
<html>
<head>
<title>�޴����� ����</title>
<script language="javascript" src="js/smpMenuAuth.js"></script>
</head>
<body onLoad="setInit()">
<form name="f">

<table border=0>
	<tr>
		<td>
			<!-- ImageButton Tag Sample -->
			<ucare:imgbtn width="90" name="btnEvent" value="��ư �̺�Ʈ" kind="read" onClick="imageButtonTest()"/> 
		</td>
	</tr>
	<tr>
		<td>
			<!-- ImageButton Tag Sample -->
			<ucare:imgbtn width="90" name="btnActive" value="��ư ��Ȱ��ȭ" kind="write" disable="true"/> 
		</td>
	</tr>
	<tr>
		<td>
			<!-- ImageButton Tag Sample -->
			<ucare:imgbtn width="90" name="btnActive" value="��ư Ȱ��ȭ" kind="write" disable="false"/> 
		</td>
	</tr>
	<tr>
		<td>
			<!-- ImageButton Tag Sample -->
			<ucare:imgbtn width="90" name="btnTooltip" value="��ư ����" kind="read" title="��ư ������ ���⿡ �ϼ���. �۾����� �̹����� ���콺 �����͸� �μ���."/> 
		</td>
	</tr>
	<tr>
		<td>
			<script language=javascript>makeIframe("/jsp/sample/smpImageButton.jsp", 100, 200, "ifmSample")</script>
		</td>
	</tr>
</table>

</form>

</body>
</html>