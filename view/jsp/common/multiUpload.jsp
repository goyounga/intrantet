<%@ page language="java" contentType="text/html; charset=EUC-KR"%>
    
<html>
<head>
	<META http-equiv="Content-Type" content="text/html; charset=EUC-KR"> 
	<title>업로드</title>
	<%@ include file="/jsp/include/include.jsp"%>
	<script language="javascript" src="/html/js/common/multiUpload.js"></script>
</head>

<%
	String ftp_send = CUtil.nvlNequal(request.getParameter("ftp_send"), "false");
%>

<body topmargin="0" leftmargin="0" rightmargin="0" onload="init()">
<form name="fUpload" method="post" accept-charset="EUC-KR" enctype="multipart/form-data" target="iLog" action="/savefile.do">
<input type="hidden" name="file_path"	value="UPLOAD_PATH">
<input type="hidden" name="folder_name">
<input type="hidden" name="img_link">
<input type="hidden" name="userid" value="<%=sessioninfo.getUserID()%>">
<input type="hidden" name="upload_type"	value="MULTI">
<input type="hidden" name="ftp_send"	value="<%= ftp_send %>">

<span id="divUploadForm"></span>

<!-- for debug

<input type="button" onclick="addFileBox()" value="add">
<input type="button" onclick="removeFileBox()" value="remove">
<input type="button" onclick="showUploadForm(5)" value="    5    ">
<input type="button" onclick="upload()" value="Upload">

-->
</form>
<iframe name="iLog" height="0" width="0"></iframe>
</body>
</html>