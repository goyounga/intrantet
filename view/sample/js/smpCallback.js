function searchCode()
{
	var tran = new Trans();
	tran.setPageRow("10");
	tran.setSvc("SMPCODEBOOKS");
	tran.setWiseGrid("1");			
	tran.setForwardId("wgdsl","");
	tran.open("f", "f", "/wisegrid.do");
}

function callback(dsnm)
{
	alert(dsnm);
}

function wiseCallback(dsnm)
{
//	alert(dsnm);
}

function showDetail_obj(id, strColumnKey, nRow)
{
	var tran = new Trans();
	tran.setPageRow("9999");
	tran.setSvc("SMPCODEBOOKS2");
	tran.setDisSvc("grid2");
	tran.setWiseGrid("1");			
	tran.setForwardId("wgdsl","");
	tran.open("f", "f", "/wisegrid.do");
}