var SELECT_ID_01 = "UCUCR305S";

function init()
{
	var GridObj = document.all(SELECT_ID_01);
	GridObj.setParam("rg_tm_format", "TIME");
	GridObj.setParam("mdf_tm_format", "TIME");
}

function callback(dsnm)
{
	//if(dsnm == SELECT_ID_01)
	
		//alert('wise' + dsnm);
	

}

function wiseCallback(dsnm)
{
	//alert('wise' + dsnm);
}


//��ȸ
function query()
{
	var tran = new Trans();							
	tran.setSvc(SELECT_ID_01);
	tran.setPageRow("9999");			
	tran.setWiseGrid("1");			
	tran.setForwardId("wgdsl");

	if(fQuery.keyword.value == "") fQuery.keycode.value = "";
	else fQuery.keycode.value = fQuery.keycode_t.value;
	//tran.setDefClick("true");	
	//DEBUG = true;
	tran.open("fQuery", "f","/wisegrid.do");	
		
}
//������ư
function deleteRow()
{
	var GridObj = document.all(SELECT_ID_01);
	GridObj.DeleteRow(GridObj.GetActiveRowIndex());
}

//���, ����, ����
function save()
{
/*	var GridObj = document.all(SELECT_ID_01);
	
	for( var i = 0; i < GridObj.GetRowCount(); i++ )
	{
		if( GridObj.GetCellValue("chk", i) == "0" ) continue;
		
		params	+= "&colm_nm="		+ g_Obj2.GetCellValue("colm_nm", i) ;
		params	+= "&kor_nm="		+ g_Obj2.GetCellValue("kor_nm", i);
		params	+= "&word_desc="	+ g_Obj2.GetCellHiddenValue("word_desc", i);
	}
*/
	// FIXME : null���� �Ѿ ��� ���װ� ����. ���� ������ �� �����̰� ������ ������.
	var tran = new Trans();							
	tran.setSvc(SELECT_ID_01); // ������ UCUCR305I ���ۼ�(insert�� ���) U, D 
	tran.setPageRow("9999");			
	tran.setWiseGrid("1");			
	tran.setForwardId("wgdsl","");
	//tran.setDefClick("true");	
	tran.setMode("save");		// �ݵ�� �߰�
	tran.setAsync(false);
	//DEBUG = true;
	tran.open("f", "f","/wisegrid.do");	
	
	query();
}

/** 
* ������� �׸��� ROW �߰�
* author  nexfron   
* since   2009/09/01 	                                              
*/ 
function appendRow()
{
	document.all(SELECT_ID_01).AddRow();
} 
