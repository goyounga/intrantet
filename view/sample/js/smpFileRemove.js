function removeMyFile()
{
	// 파일삭제 실행
	// grobal.properties => UPLOAD_PATH 경로에 있는 파일을 삭제하겠다는 의미이다.
	removeFile("UPLOAD_PATH", f.testfile.value);
}

// 파일삭제 후 호출된다.
function callback(dsnm)
{
	// 파일삭제 DataSet명은 무조건 removefile이다.
	// removefile은 viewtype이 Free이기 때문에 화면에 element(errcode, errmsg)가 있다면 자동으로 출력된다.
	if (dsnm == "removefile")
	{
		alert(DataSet.getParam("removefile", 1, 0, "errmsg"));
	}
}