function removeMyFile()
{
	// ���ϻ��� ����
	// grobal.properties => UPLOAD_PATH ��ο� �ִ� ������ �����ϰڴٴ� �ǹ��̴�.
	removeFile("UPLOAD_PATH", f.testfile.value);
}

// ���ϻ��� �� ȣ��ȴ�.
function callback(dsnm)
{
	// ���ϻ��� DataSet���� ������ removefile�̴�.
	// removefile�� viewtype�� Free�̱� ������ ȭ�鿡 element(errcode, errmsg)�� �ִٸ� �ڵ����� ��µȴ�.
	if (dsnm == "removefile")
	{
		alert(DataSet.getParam("removefile", 1, 0, "errmsg"));
	}
}