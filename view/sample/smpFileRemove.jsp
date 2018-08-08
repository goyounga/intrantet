<%@ page language="java" contentType="text/html; charset=EUC-KR"%>
<%@ include file="/jsp/include/include.jsp"%>    
<html>
<head>
<title>파일삭제 샘플</title>
<script language="javascript" src="js/smpFileRemove.js"></script>
</head>
<body>
<form name="f">

<ucare:table type="detail" width="680">
	<tr>
		<td class=MANTDT>파일명(확장자포함)</td>
		<td class=MANTDM colspan="2">
			<input type="text" name="testfile" size="20"> <!-- 삭제할 파일명을 입력한다. -->
			<ucare:imgbtn width="80" name="btnRemove" value="파일삭제" onClick="removeMyFile()"/>
		</td>
	</tr>
	<tr>
		<td class=MANTDT>결과코드</td>
		<td class=MANTDM colspan=2>
			<input type=text class=TXT name=errcode style="width:220" readonly>
		</td>
	</tr>
	<tr>
		<td class=MANTDT>에러메세지</td>
		<td class=MANTDM colspan=2>
			<input type=text class=TXT name=errmsg style="width:220" readonly>
		</td>
	</tr>
</ucare:table>

</form>

</body>
</html>