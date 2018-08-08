<%@page pageEncoding="EUC-KR" contentType="text/html; charset=EUC-KR" %>
<%@ include file="/jsp/include/include.jsp"%>    
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<title>¾÷·Îµå</title>
<script language="javascript" src="/html/js/common/upload.js"></script>
</head>
<%
	String filePath = request.getParameter("file_path") != null ? request.getParameter("file_path") : "UPLOAD_PATH";
	String folder_name = request.getParameter("folder_name") != null ? request.getParameter("folder_name") : "";
	String ftp_send = CUtil.nvlNequal(request.getParameter("ftp_send"), "false");
%>
<body topmargin="0" leftmargin="0" rightmargin="0">
<form name="fUpload" method="post" enctype="multipart/form-data" target="iLog" action="/savefile.do">
<input type="hidden" name="file_path"		value="<%= filePath %>">
<input type="hidden" name="folder_name"		value="<%= folder_name %>">
<input type="hidden" name="ftp_send"		value="<%= ftp_send %>">
<input type="hidden" name="_forward_id"		value="savefileresult">
<input type="hidden" name="userid" value="<%=sessioninfo.getUserID()%>">
<table width="100%" height="100%" border=0 cellpadding=0 cellspacing=0 id=tblList>
	<tr>
	    <td>
			<input type="file"  name="_UPLOAD_FILE"  style="width:100%;border: solid 1px #CECECE;cursor:hand"  >
		</td>
	</tr>
</table>
</form>
<iframe name="iLog" height="0" width="0" src="/jsp/common/blank.jsp"></iframe>
</body>
</html>
