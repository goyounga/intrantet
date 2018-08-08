// 파일 업로드 실행
function uploadFile()
{
	f._filenm.value = "";
	f.filenm.value = "";
	
	setQueryStatus("파일 업로드 중입니다.", 30);
		
	iUpload.upload("");		// 실제 업로드를 실행하는 함수
}

// 파일 업로드를 실행한 후 호출되는 함수이므로 반드시 구현해야 한다.
// 업로드된 파일명을 넘겨준다.
function setFileName(filenm)
{
	f._filenm.value = filenm;
	f.filenm.value = filenm.substring(0,filenm.lastIndexOf("."));
	
	setQueryStatusClose("");
}

// 초기화
function fileRest()
{
	clear(f);
	//iUpload.fUpload._UPLOAD_FILE.value = "";
	iUpload.location.href="/jsp/common/upload.jsp";		// 직접 초기화를 할 수 없어서 ifame을 다시 불러오게 했다.
}