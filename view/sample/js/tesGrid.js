function query()
{
	var tran = new Trans(); 
	DEBUG=true;
    tran.setSvc("UCTES001S"); 
    tran.setWiseGrid("1"); 
    tran.setForwardId("wgdsl","");
    tran.open("f", "f", "/wisegrid.do"); 
	
}

function callback(dsnm)
{
	alert("³­ callback");
	switch (dsnm)
	{
		case "UCTES001S" :
			var gridObj = document.all("UCTES001S");
			
			//UCTES001S.SetCellValue("code", 1, "33333");
			//alert(gridObj.GetCellValue("code", 0));
			gridObj.SetCellValue("code", 0, "123456");
			break;
	}
}

function aaa(dsnm)
{
	alert("I am aaa");
}

