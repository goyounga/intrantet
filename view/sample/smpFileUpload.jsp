<%@ page language="java" contentType="text/html; charset=EUC-KR"%>
<%@ include file="/jsp/include/include.jsp"%>    
<html>
<head>
<title>÷������ ����</title>
<script language="javascript" src="js/smpFileUpload.js"></script>
</head>
<body>
<form name="f">

<ucare:table type="detail" width="680">
	<tr>
		<td class=MANTDT width=80>��������</td>
		<td class=MANTDM>
		
			<!-- File Upload Sample -->
			<iframe name="iUpload" height="25" width="100%" src="/jsp/common/upload.jsp?ftp_send=true" frameborder="0"></iframe>
			
		</td>
		<td class=MANTDM>
			<ucare:imgbtn width="80" name="btnUpload" value="���Ͼ��ε�" onClick="uploadFile()"/>
			<ucare:imgbtn width="80" name="btnReset" value="�ʱ�ȭ" onClick="fileRest()"/>
		</td>
	</tr>
	<tr>
		<td class=MANTDT>����</td>
		<td class=MANTDM colspan=2>
			<input type=text class=TXT name=_filenm style="width:220" readonly>
		</td>
	</tr>
	<tr>
		<td class=MANTDT>���ϸ�</td>
		<td class=MANTDM colspan=2>
			<input type=text class=TXT name=filenm style="width:220" readonly>
		</td>
	</tr>
	<tr>
		<td class=MANTDT>���ε���</td>
		<td class=MANTDM colspan=2>
			grobal.properties => UPLOAD_PATH �� �����Ѵ�.
		</td>
	 </tr>
</ucare:table>

</form>

</body>
</html>