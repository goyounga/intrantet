function setInit()
{
}

function searchCode(dissvc)
{
	var gridObj = document.all(dissvc);
	gridObj.setParam("hdp_no_format", "TEL");
	
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

function callback(dsnm)
{
	//alert(dsnm);
}
