/*
���ʱ⺻���� 
*/
function init(){
	queryList();
}


//***********************************
// queryList ��ȸ
//***********************************
function queryList()
{
	//��¥üũ
	if (checkTermDate(fQuery.startdt, fQuery.enddt, true, true) == false) return;
	
	var gridObj = document.UCPRJ010S;
		gridObj.setParam("rl_st_dt", "DATE");
		gridObj.setParam("rl_end_dt", "DATE");
		gridObj.setParam("rg_dt", "DATE");
		gridObj.setParam("rg_tm", "TIME");
		gridObj.setParam("mdf_dt", "DATE");
		gridObj.setParam("mdf_tm", "TIME");

	var trans = new Trans();							
	trans.setSvc("UCPRJ010S");					// ����ID
	trans.setPageRow("50");					// 1Page�� �� ���� Row�� ����� ���ΰ�?		
	trans.setWiseGrid("1");					// wisegrid�� ����ϴ� ��� �ݵ�� �߰�			
	trans.setForwardId("wgdsl","");			// wisegrid�� ����ϴ� ��� �ݵ�� �߰�
	trans.open("fQuery", "f","/wisegrid.do");
}


/**********************
* ������(���� Ŭ��)
**********************/
function showDetailB_obj(id, strColumnKey, nRow)
{
	Apply();
}

/**********************
* ����
**********************/
function Apply()
{
	var GridObj = document.UCPRJ010S;
	var nRow = GridObj.GetActiveRowIndex();
	
	if(nRow < 0)return;
		
	var prj_seq = GridObj.GetCellValue("prj_seq", nRow)
	var prj_nm = GridObj.GetCellValue("prj_nm", nRow)
	
	opener.setProject(prj_seq, prj_nm);
	window.close();
	
}


/**********************
* �ݹ�
**********************/
function callback(sServiceID)
{
	switch (sServiceID)
	{
		default:		
		break;
	}
}
