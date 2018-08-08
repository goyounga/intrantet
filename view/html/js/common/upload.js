function upload(obj)
{ 
	fUpload.submit();
}

function callback(oldFileName, newFileName)
{
	parent.setFileName(oldFileName, newFileName);
}