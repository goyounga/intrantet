function setInit()
{
}

function searchCode(dissvc)
{
	var tran = new Trans();							
	tran.setSvc("SMPCODEBOOKS");	// ����ID
	tran.setDisSvc(dissvc);		// gridID
	tran.setPageRow("9999");		// 1Page�� �� ���� Row�� ����� ���ΰ�?			
	tran.setWiseGrid("1");			// wisegrid�� ����ϴ� ��� �ݵ�� �߰�			
	tran.setForwardId("wgdsl","");	// wisegrid�� ����ϴ� ��� �ݵ�� �߰�
	//tran.setDefClick("true");	
	//DEBUG = true;
	tran.open("f", "f","/wisegrid.do");	
}

function testDefClick(dissvc)
{
	var tran = new Trans();							
	tran.setSvc("SMPCODEBOOKS");	// ����ID
	tran.setDisSvc(dissvc);			// gridID
	tran.setPageRow("9999");		// 1Page�� �� ���� Row�� ����� ���ΰ�?			
	tran.setWiseGrid("1");			// wisegrid�� ����ϴ� ��� �ݵ�� �߰�			
	tran.setForwardId("wgdsl","");	// wisegrid�� ����ϴ� ��� �ݵ�� �߰�
	tran.setDefClick("true");		// ��ȸ�� �� ù ��° Row �ڵ� ����	
	//DEBUG = true;
	tran.open("f", "f","/wisegrid.do");
}

function testPage(dissvc)
{
	var tran = new Trans();							
	tran.setSvc("SMPCODEBOOKS2");	// ����ID
	tran.setDisSvc(dissvc);			// gridID
	tran.setPageRow("10");		// 1Page�� �� ���� Row�� ����� ���ΰ�?			
	tran.setWiseGrid("1");			// wisegrid�� ����ϴ� ��� �ݵ�� �߰�			
	tran.setForwardId("wgdsl","");	// wisegrid�� ����ϴ� ��� �ݵ�� �߰�
	//tran.setDefClick("true");		// ��ȸ�� �� ù ��° Row �ڵ� ����	
	//DEBUG = true;
	tran.open("f", "f","/wisegrid.do");
}

function callback(dsnm)
{
	//alert(dsnm);
}

// ���콺 ���� Ŭ�� 	: <tr event="O"> 
function showDetail_obj(id, strColumnKey, nRow) 
{ 
	// �����߰� 
	alert(id + " / " + strColumnKey + " / " + nRow);
} 

// ���콺 ������ Ŭ��: <tr event="R">
function showDetailR_obj(id, strColumnKey, nRow)
{ 
	// �����߰� 
	alert(id + " / " + strColumnKey + " / " + nRow);
}	

// Cell Change: <tr event="C">
function showDetailC_obj(id, strColumnKey, nRow, vtOldValue, vtNewValue) 
{ 
	// �����߰�
	alert(id + " / " + strColumnKey + " / " + nRow + " / " + vtOldValue + " / " + vtNewValue); 
}