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
	var gridObj = document.UCPRJ031S;

	var trans = new Trans();							
	trans.setSvc("UCPRJ031S");					// ����ID
	trans.setPageRow("100");
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
	var GridObj = document.UCPRJ031S;
	var nRow = GridObj.GetActiveRowIndex();
	
	if(nRow < 0)return;
		
	var prj_seq = GridObj.GetCellValue("mtnc_seq", nRow);
	var prj_nm = GridObj.GetCellValue("mtnc_nm", nRow);
	var clnt_corp_nm = GridObj.GetCellValue("clnt_corp_nm", nRow);
	var cs_user_id = GridObj.GetCellValue("cs_user_id", nRow);
	var cs_user_id_nm = GridObj.GetCellValue("cs_user_id_nm", nRow);
	
	opener.setProject(prj_seq, prj_nm, clnt_corp_nm, cs_user_id, cs_user_id_nm);
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
