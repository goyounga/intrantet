function setInit()
{
}

function searchCode(dissvc)
{
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

function testDefClick(dissvc)
{
	var tran = new Trans();							
	tran.setSvc("SMPCODEBOOKS");	// 쿼리ID
	tran.setDisSvc(dissvc);			// gridID
	tran.setPageRow("9999");		// 1Page에 몇 개의 Row를 출력할 것인가?			
	tran.setWiseGrid("1");			// wisegrid를 사용하는 경우 반드시 추가			
	tran.setForwardId("wgdsl","");	// wisegrid를 사용하는 경우 반드시 추가
	tran.setDefClick("true");		// 조회한 후 첫 번째 Row 자동 선택	
	//DEBUG = true;
	tran.open("f", "f","/wisegrid.do");
}

function testPage(dissvc)
{
	var tran = new Trans();							
	tran.setSvc("SMPCODEBOOKS2");	// 쿼리ID
	tran.setDisSvc(dissvc);			// gridID
	tran.setPageRow("10");		// 1Page에 몇 개의 Row를 출력할 것인가?			
	tran.setWiseGrid("1");			// wisegrid를 사용하는 경우 반드시 추가			
	tran.setForwardId("wgdsl","");	// wisegrid를 사용하는 경우 반드시 추가
	//tran.setDefClick("true");		// 조회한 후 첫 번째 Row 자동 선택	
	//DEBUG = true;
	tran.open("f", "f","/wisegrid.do");
}

function callback(dsnm)
{
	//alert(dsnm);
}

// 마우스 왼쪽 클릭 	: <tr event="O"> 
function showDetail_obj(id, strColumnKey, nRow) 
{ 
	// 로직추가 
	alert(id + " / " + strColumnKey + " / " + nRow);
} 

// 마우스 오른쪽 클릭: <tr event="R">
function showDetailR_obj(id, strColumnKey, nRow)
{ 
	// 로직추가 
	alert(id + " / " + strColumnKey + " / " + nRow);
}	

// Cell Change: <tr event="C">
function showDetailC_obj(id, strColumnKey, nRow, vtOldValue, vtNewValue) 
{ 
	// 로직추가
	alert(id + " / " + strColumnKey + " / " + nRow + " / " + vtOldValue + " / " + vtNewValue); 
}