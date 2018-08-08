<%@ page language="java" contentType="text/html; charset=EUC-KR"%>
<%@ include file="/jsp/include/include.jsp"%>    
<html>
<head>
<title>메뉴권한 샘플</title>
<script language="javascript" src="js/smpMenuAuth.js"></script>
</head>
<body onLoad="setInit()">
<form name="f">

<table border=0>
	<tr>
		<td>
			<!-- ImageButton Tag Sample -->
			<ucare:imgbtn width="90" name="btnEvent" value="버튼 이벤트" kind="read" onClick="imageButtonTest()"/> 
		</td>
	</tr>
	<tr>
		<td>
			<!-- ImageButton Tag Sample -->
			<ucare:imgbtn width="90" name="btnActive" value="버튼 비활성화" kind="write" disable="true"/> 
		</td>
	</tr>
	<tr>
		<td>
			<!-- ImageButton Tag Sample -->
			<ucare:imgbtn width="90" name="btnActive" value="버튼 활성화" kind="write" disable="false"/> 
		</td>
	</tr>
	<tr>
		<td>
			<!-- ImageButton Tag Sample -->
			<ucare:imgbtn width="90" name="btnTooltip" value="버튼 툴팁" kind="read" title="버튼 설명은 여기에 하세요. 글씨말고 이미지에 마우스 포인터를 두세요."/> 
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