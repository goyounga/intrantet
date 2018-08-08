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
	//날짜체크
	if (checkTermDate(fQuery.startdt, fQuery.enddt, true, true) == false) return;
	
	var gridObj = document.UCPRJ010S;
		gridObj.setParam("rl_st_dt", "DATE");
		gridObj.setParam("rl_end_dt", "DATE");
		gridObj.setParam("rg_dt", "DATE");
		gridObj.setParam("rg_tm", "TIME");
		gridObj.setParam("mdf_dt", "DATE");
		gridObj.setParam("mdf_tm", "TIME");

	var trans = new Trans();							
	trans.setSvc("UCPRJ010S");					// 쿼리ID
	trans.setPageRow("50");					// 1Page에 몇 개의 Row를 출력할 것인가?		
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
	var GridObj = document.UCPRJ010S;
	var nRow = GridObj.GetActiveRowIndex();
	
	if(nRow < 0)return;
		
	var prj_seq = GridObj.GetCellValue("prj_seq", nRow)
	var prj_nm = GridObj.GetCellValue("prj_nm", nRow)
	
	opener.setProject(prj_seq, prj_nm);
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
