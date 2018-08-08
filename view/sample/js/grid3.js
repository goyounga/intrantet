function setInit()
{
}

function searchCode(dissvc)
{
alert(1);

	var tran = new Trans();							
	tran.setSvc("SMPCODEBOOKS");
	tran.setDisSvc(dissvc);
	tran.setPageRow("9999");
	tran.setWiseGrid("1");
	tran.setForwardId("wgdsl","");
	//tran.setDefClick("true");	
	//DEBUG = true;
	tran.open("f", "f","/wisegrid.do");	
}