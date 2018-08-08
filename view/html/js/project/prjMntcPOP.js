/*
최초기본설정 
*/
function init(){
	queryList();
}


//***********************************
// queryList 조회
//***********************************
function queryList()
{
	var gridObj = document.UCPRJ031S;

	var trans = new Trans();							
	trans.setSvc("UCPRJ031S");					// 쿼리ID
	trans.setPageRow("100");
	trans.setWiseGrid("1");					// wisegrid를 사용하는 경우 반드시 추가			
	trans.setForwardId("wgdsl","");			// wisegrid를 사용하는 경우 반드시 추가
	trans.open("fQuery", "f","/wisegrid.do");
}


/**********************
* 상세정보(더블 클릭)
**********************/
function showDetailB_obj(id, strColumnKey, nRow)
{
	Apply();
}

/**********************
* 적용
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
* 콜백
**********************/
function callback(sServiceID)
{
	switch (sServiceID)
	{
		default:		
		break;
	}
}
