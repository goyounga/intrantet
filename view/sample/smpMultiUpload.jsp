<%@ page language="java" contentType="text/html; charset=EUC-KR"%>
<html>
<head>
</head>
<body>

<iframe src="/common/multiUpload.jsp" name="ifmUpload" width=500 height=200></iframe>
<br>
<input type="button" onclick="ifmUpload.addFileBox()" value="  +  ">
<input type="button" onclick="ifmUpload.removeFileBox()" value="  -  ">
<input type="button" onclick="ifmUpload.showUploadForm(5)" value="  5  ">
<input type="button" onclick="ifmUpload.showUploadForm(10)" value="  10  ">
<input type="button" onclick="ifmUpload.setDisabled(false)" value=" 활성화 ">
<input type="button" onclick="ifmUpload.setDisabled(true)" value=" 비활성화 ">


</body>
</html>