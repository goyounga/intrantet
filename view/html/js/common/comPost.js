
var SELECT_POST_ID = "UCCOM011S";

var nRow;

/********************
* 초기 이벤트
********************/
function init()
{
	fQuery.address_s.focus();
}

/********************
* 조회
********************/
function queryList()
{	
	if(fQuery.address_s.value == "")
	{
		alert("주소를 입력하세요.");
		fQuery.address_s.focus();
		return;
	}

	var trans = new Trans();							
	trans.setSvc(SELECT_POST_ID);			// 쿼리ID
	trans.setDefClick(true);
	trans.setPageRow("999");				// 1Page에 몇 개의 Row를 출력할 것인가?			
	trans.setWiseGrid("1");					// wisegrid를 사용하는 경우 반드시 추가			
	trans.setForwardId("wgdsl","");			// wisegrid를 사용하는 경우 반드시 추가
	trans.open("fQuery", "f","/wisegrid.do");
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
	
	postApply();
}

/********************
* 적용버튼
********************/
function postApply()
{	
	opener.setPost(fQuery.frm.value, fQuery.post.value, fQuery.address.value);

	self.close();
}