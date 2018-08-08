
var SELECT_ID = "UCSYS115S";		//추가 할 항목 조회

var SELECT_ID1 = "UCSYS116S";		//추가 된 항목 조회
var INSERT_ID1 = "UCSYS116I";		//추가 된 항목 저장
var DELETE_ID1 = "UCSYS116D";		//추가 된 항목 삭제


/********************
* 초기 이벤트
********************/
function init()
{
	//queryList();
}


/********************************
* 추가할 항목 + 추가된 항목 조회
********************************/
function queryList()
{
	if(fQuery.corp_nm_s.value == "")
	{
		alert("업체명을 입력하세요.");
		MessageBox("Required", "E", "업체명");
		openConsType();
		return;
	}

	var trans = new Trans();					
	trans.setSvc(SELECT_ID+","+SELECT_ID1);	// 쿼리ID
	trans.setPageRow("999");				// 1Page에 몇 개의 Row를 출력할 것인가?			
	trans.setWiseGrid("1,1");				//쿼리 개수
	trans.setForwardId("wgdsl","wgdsl");	// wisegrid를 사용하는 경우 반드시 추가
	trans.open("fQuery", "f","/wisegrid.do");
}

/********************
* 업체명 검색
********************/
function openConsType()
{
	openPopup("/jsp/common/comCorpSearch.jsp", "", "SearchDetailP", "", "", "610", "500", "scrollbars=no");
}

/****************************
* 필드 리스트 테이블 Row 이동
****************************/
function fieldMOVE(fromObj, toObj)
{
	var fromGridObj = document.all(fromObj);
	var toGridObj = document.all(toObj);

	if(!chkSelected(fromGridObj))
	{
		MessageBox("SYSSelectRow", "E", "");
		return;
	}
	
//	if(fromObj == SELECT_ID)
//	{
//		if(!confirm("선택한 항목을 추가 하시겠습니까?")) return;
//	}
//	else
//	{
//		if(!confirm("선택한 항목을 취소 하시겠습니까?")) return;
//	}
	
	for(i = 0; i < fromGridObj.GetRowCount(); i++)
	{
		if(fromGridObj.GetCellValue("selected", i) == "1")
		{
			toGridObj.AddRow();
			for(j = 0; j < toGridObj.GetColCount(); j++)
			{				
				toGridObj.SetCellValue(toGridObj.GetColHDKey(j), toGridObj.GetRowCount()-1, fromGridObj.GetCellValue(toGridObj.GetColHDKey(j), i));
			}
		}
	} 
	
	for(i = fromGridObj.GetRowCount()-1; i >= 0; i--)
	{
		if(fromGridObj.GetCellValue("selected", i) == "1")
			fromGridObj.DeleteRow(i);
	}	
}

/****************************************
* 그리드에 선택된 CheckBox가 있는지 체크
****************************************/
function chkSelected(GridObj)
{
	for(i = 0; i < GridObj.GetRowCount(); i++)
	{
		if(GridObj.GetCellValue("selected", i) == "1")
		{
			return true;
		}
	}
	
	return false;
}


/********************
* 고객항목 추가 저장
********************/
function saveClnt()
{
	var GridObj = document.all(SELECT_ID1);
		
	var itm_id;

	for(i = 0; i < GridObj.GetRowCount(); i++)		//그리드의 row 수만큼 반복하라
	{
		if(itm_id)		//itm_id 있다면..
		{		
			itm_id	+= ""+ GridObj.GetCellValue("itm_id", i);	
			itm_nm	+= ""+ GridObj.GetCellValue("itm_nm", i);	
		}
		else
		{
			itm_id = GridObj.GetCellValue("itm_id", i);
			itm_nm = GridObj.GetCellValue("itm_nm", i);
		}
	}	


	var params ;
		params = "itm_id=" +itm_id;		// 항목ID 가져오기
		params += "&corp_cd_s=" +document.fQuery.corp_cd.value;				// 업체코드 가져오기
		params += "&itm_nm=" +itm_nm;		// 업체명 가져오기


	var queryID = "";

	if(GridObj.GetRowCount() == 0)	//그리드의 row수가 0이면 
	{
		queryID = DELETE_ID1;		//DELETE_ID1 쿼리를 돌아라  할당상담원 전체 삭제
	}
	else
	{
		queryID = DELETE_ID1 +","+ INSERT_ID1;	//아니면 DELETE_ID1 + INSERT_ID1 쿼리를 돌아라
	}


	var trans = new Trans();
	trans.setSvc(queryID);
	trans.setUserParams(params);
	trans.open("f","","/common.do");
}

/********************
* 콜백
********************/
function callback(id)
{
	switch(id)
	{

		//추가된 고객항목 전체 삭제
		case DELETE_ID1:

			if (DataSet.getParam(id, 1, 0, "SUCCESS_COUNT") > 0)
			{
				MessageBox("InfSuccess", "I", "");
				queryList();
			}
			else			
			{
				MessageBox("Fail", "E", "삭제를");
			}

			break;

		//추가된 고객항목 삭제 후 저장
		case DELETE_ID1 +","+ INSERT_ID1:

			if (DataSet.getParam(DELETE_ID1 , 1, 0, "SUCCESS_COUNT") >= 0)
			{
				MessageBox("InfSuccess", "I", "");		// I = 저장
				queryList();
			}
			else
			{
				MessageBox("InfFail", "E", "");	//E = 에러
			}

			break;


		default:
			break;
	}
}



/********************
* 업체명 가져오기
********************/
function setCorp(frm,corp_cd,corp_nm)
{
	document.fQuery.corp_nm_s.value = corp_nm;
	document.fQuery.corp_cd.value	= corp_cd;
}