<%@ page language="java" contentType="text/html; charset=EUC-KR"%>
<%@ include file="/jsp/include/include.jsp"%>    
<html>
<head>
<title>첨부파일 샘플</title>
<script language="javascript" src="js/smpFileUpload.js"></script>
</head>
<body>
<form name="f">

<ucare:table type="detail" width="680">
	<tr>
		<td class=MANTDT width=80>로컬파일</td>
		<td class=MANTDM>
		
			<!-- File Upload Sample -->
			<iframe name="iUpload" height="25" width="100%" src="/jsp/common/upload.jsp?ftp_send=true" frameborder="0"></iframe>
			
		</td>
		<td class=MANTDM>
			<ucare:imgbtn width="80" name="btnUpload" value="파일업로드" onClick="uploadFile()"/>
			<ucare:imgbtn width="80" name="btnReset" value="초기화" onClick="fileRest()"/>
		</td>
	</tr>
	<tr>
		<td class=MANTDT>파일</td>
		<td class=MANTDM colspan=2>
			<input type=text class=TXT name=_filenm style="width:220" readonly>
		</td>
	</tr>
	<tr>
		<td class=MANTDT>파일명</td>
		<td class=MANTDM colspan=2>
			<input type=text class=TXT name=filenm style="width:220" readonly>
		</td>
	</tr>
	<tr>
		<td class=MANTDT>업로드경로</td>
		<td class=MANTDM colspan=2>
			grobal.properties => UPLOAD_PATH 에 설정한다.
		</td>
	 </tr>
</ucare:table>

</form>

</body>
</html>