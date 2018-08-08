
var SELECT_ID = "SEARCH_JOB";

/********************
* 초기 이벤트
********************/
function init()
{

}

/********************
* 조회
********************/
function queryList()
{	
	var trans = new Trans();							
	trans.setSvc(SELECT_ID);			// 쿼리ID
	trans.setDefClick(true);
	trans.setPageRow("999");				// 1Page에 몇 개의 Row를 출력할 것인가?			
	trans.setWiseGrid("1");					// wisegrid를 사용하는 경우 반드시 추가			
	trans.setForwardId("wgdsl","");			// wisegrid를 사용하는 경우 반드시 추가
	trans.open("fQuery", "f","/wisegrid.do");
}

function chngJob()
{
	queryList();
}

/*****************/
// 엔터
/*****************/
function checkKeyPress()
{
	if(isEnterKey())
	{
		queryList();
	}
}


/********************
* 그리드 클릭
********************/
function showDetailO_obj(id, strColumnKey, nRow)
{
	if(document.all(id).GetRowCount() == 0)
		return;

	showDetailByWise(id, nRow, fQuery);

}

/********************
* 그리드 더블클릭
********************/
function showDetailB_obj(id, strColumnKey, nRow)
{
	if(document.all(id).GetRowCount() == 0)
		return;

	showDetailByWise(id, nRow, fQuery);
	
	apply();
}


/********************
* 적용버튼
********************/
function apply()
{
	opener.setJob(fQuery.frm.value, fQuery.job_cd.value, fQuery.job_cd_nm.value);

	self.close();
}