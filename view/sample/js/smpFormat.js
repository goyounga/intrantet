function setInit()
{
}

function searchCode(dissvc)
{
	var gridObj = document.all(dissvc);
	gridObj.setParam("hdp_no_format", "TEL");
	
	var tran = new Trans();							
	tran.setSvc("SMPCODEBOOKS");	// 쿼리ID
	tran.setDisSvc(dissvc);		// gridID
	tran.setPageRow("9999");		// 1Page에 몇 개의 Row를 출력할 것인가?			
	tran.setWiseGrid("1");			// wisegrid를 사용하는 경우 반드시 추가			
	tran.setForwardId("wgdsl","");	// wisegrid를 사용하는 경우 반드시 추가
	//tran.setDefClick("true");	
	//DEBUG = true;
	tran.open("f", "f","/wisegrid.do");	
}

function callback(dsnm)
{
	//alert(dsnm);
}
