var SERVICE_ID 	= "SMPCODEBOOKS";
var GRID_ID		= "TEST";

function setInit()
{
	var gridObj = document.all(GRID_ID);
	gridObj.bNullValueNumberFormat = false; 
}

// 조회
function searchCode()
{
	//var gridObj = document.all(GRID_ID);
	//gridObj.setParam("_testparm", "this is test");
	
	var tran = new Trans();							
	tran.setSvc(SERVICE_ID);
	tran.setDisSvc(GRID_ID);
	tran.setPageRow("50");			
	tran.setWiseGrid("1");			
	tran.setForwardId("wgdsl","");
	//tran.setDefClick("true");	
	//DEBUG = true;
	tran.open("f", "f", "/wisegrid.do");	
}

// 등록, 수정, 삭제
function saveCode()
{
	// FIXME : null값이 넘어갈 경우 버그가 있음. 현재 인지를 한 상태이고 수정할 예정임.
	var tran = new Trans();							
	tran.setSvc(SERVICE_ID);
	tran.setPageRow("50");			
	tran.setWiseGrid("1");			
	tran.setForwardId("wgdsl","");
	//tran.setDefClick("true");	
	tran.setMode("save");		// 반드시 추가
	//tran.setSaveDataSetId("SMPCODEBOOKI");
	tran.setSaveAutoSelect(true);
	//DEBUG = true;
	tran.open("f", "f","/wisegrid.do");	
}

// Row 삭제상태로 세팅
function removeCode()
{
	var GridObj = document.all(GRID_ID);
	GridObj.DeleteRow(GridObj.GetActiveRowIndex());
}

// Row 추가
function lineInsert()
{
	var GridObj = document.all(GRID_ID);
	GridObj.AddRow();
}

// CRUD 취소 : grid를 다시 초기화함
function cancel()
{
	var GridObj = document.all(GRID_ID);
	GridObj.CancelCRUD();
}

function callback(dsnm)
{
//	alert(dsnm);
}