var SERVICE_ID 	= "SMPCODEBOOKS";
var GRID_ID		= "TEST";

function setInit()
{
	var gridObj = document.all(GRID_ID);
	gridObj.bNullValueNumberFormat = false; 
}

// ��ȸ
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

// ���, ����, ����
function saveCode()
{
	// FIXME : null���� �Ѿ ��� ���װ� ����. ���� ������ �� �����̰� ������ ������.
	var tran = new Trans();							
	tran.setSvc(SERVICE_ID);
	tran.setPageRow("50");			
	tran.setWiseGrid("1");			
	tran.setForwardId("wgdsl","");
	//tran.setDefClick("true");	
	tran.setMode("save");		// �ݵ�� �߰�
	//tran.setSaveDataSetId("SMPCODEBOOKI");
	tran.setSaveAutoSelect(true);
	//DEBUG = true;
	tran.open("f", "f","/wisegrid.do");	
}

// Row �������·� ����
function removeCode()
{
	var GridObj = document.all(GRID_ID);
	GridObj.DeleteRow(GridObj.GetActiveRowIndex());
}

// Row �߰�
function lineInsert()
{
	var GridObj = document.all(GRID_ID);
	GridObj.AddRow();
}

// CRUD ��� : grid�� �ٽ� �ʱ�ȭ��
function cancel()
{
	var GridObj = document.all(GRID_ID);
	GridObj.CancelCRUD();
}

function callback(dsnm)
{
//	alert(dsnm);
}