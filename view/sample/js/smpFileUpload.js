// ���� ���ε� ����
function uploadFile()
{
	f._filenm.value = "";
	f.filenm.value = "";
	
	setQueryStatus("���� ���ε� ���Դϴ�.", 30);
		
	iUpload.upload("");		// ���� ���ε带 �����ϴ� �Լ�
}

// ���� ���ε带 ������ �� ȣ��Ǵ� �Լ��̹Ƿ� �ݵ�� �����ؾ� �Ѵ�.
// ���ε�� ���ϸ��� �Ѱ��ش�.
function setFileName(filenm)
{
	f._filenm.value = filenm;
	f.filenm.value = filenm.substring(0,filenm.lastIndexOf("."));
	
	setQueryStatusClose("");
}

// �ʱ�ȭ
function fileRest()
{
	clear(f);
	//iUpload.fUpload._UPLOAD_FILE.value = "";
	iUpload.location.href="/jsp/common/upload.jsp";		// ���� �ʱ�ȭ�� �� �� ��� ifame�� �ٽ� �ҷ����� �ߴ�.
}