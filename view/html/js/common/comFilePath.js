function init(){
	queryList("");
}

function queryList(obj) {
	openFolder(fQuery.curdir.value, "", fQuery.pardir.value, "", "Y");
}

function openFolder(path, name, prev, comp, isdir)
{
//	alert(path + "\n" + name + "\n" + prev + "\n" + isdir);
	if (isdir == "Y")
	{
		var trans = new Trans();
		var sParam = "curdir="+path+"/";
		sParam += "&pardir="+prev;
		sSvc = "FOLDER";

		trans.setUserParams(sParam);
		trans.setSvc(sSvc);
		trans.open("f","f","/readdir.do");
	}
	else
	{
		opener.setFilePath(comp+name);
		this.close();
	}
}
