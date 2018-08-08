<%@ page contentType="text/html;charset=euc-kr" %>
<%@ include file="/jsp/include/include.jsp" %>
<!-- File Upload Sample -->
<script language="javascript">

function setFileName(filename)
{
	f.filenm.value = filename;
}

/* 사진첨부 */
function uploadfile()
{
	iUpload.upload("");
}

</script>
<form name="f" method="post">
<input type="text" name="filenm"> <!--사진 업로드//-->

<iframe name="iUpload" height="22" width="100%" src="/jsp/common/upload.jsp?file_path=UPLOAD_PATH2" frameborder="0"></iframe>
						<ucare:imgbtn type="btn60" name="btnSave" value="등록" onClick="uploadfile();"/>
</form>