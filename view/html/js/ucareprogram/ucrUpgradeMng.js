var SELECT_UPG_ID		= "UCUCR306S";		//업그레이드정보 조회
var INSERT_UPG_ID		= "UCUCR306I";		//업그레이드정보 추가
var UPDATE_UPG_ID		= "UCUCR306U";		//업그레이드정보 수정
var DELETE_UPG_ID		= "UCUCR306D";		//업그레이드정보 삭제

var g_Flag;			//상태플러그
var g_Ex_idx;	//업그레이드정보 리스트 index
var update_flag = false;

/********************
* 콜백
********************/
function callback(sServiceID)
{
	switch (sServiceID)
	{
		case INSERT_UPG_ID :
			if (DataSet.getParam(sServiceID, 1, 0, "SUCCESS_COUNT") > 0)
			{
				MessageBox("InfSuccess", "I", "");
				queryList();
			}
			else
			{
				MessageBox("InfFail", "E", "업그레이드정보(INSERT)");
			}

			break;
		
		case UPDATE_UPG_ID :
			if (DataSet.getParam(sServiceID, 1, 0, "SUCCESS_COUNT") > 0)
			{
				MessageBox("InfSuccess", "I", "");
				queryList();
			}
			else
			{
				MessageBox("InfFail", "E", "업그레이드정보(UPDATE)");
			}

			break;
		
		case DELETE_UPG_ID :
			if (DataSet.getParam(sServiceID, 1, 0, "SUCCESS_COUNT") > 0)
			{
				MessageBox("Success", "I", "");
				queryList();
			}
			else
			{
				MessageBox("Fail", "E", "업그레이드정보(DELETE)");
			}

			break;
		
		default:	
			
			break;
	}
}

/********************
* 초기화
********************/
function init()
{
	setMode("INIT");
}

/********************
* 업그레이드정보 조회
********************/
function queryList()
{
/*	if(fQuery.searchType.value && !fQuery.searchText.value)
	{
		MessageBox("InputFail", "E", fQuery.searchType.options[fQuery.searchType.selectedIndex].text);
		fQuery.searchText.focus();
		return;
	}
	else if(!fQuery.searchType.value && fQuery.searchText.value)
	{
		MessageBox("SelectFail2", "E", "");
		fQuery.searchType.focus();
		return;
	}
	
	if(fQuery.searchType.value && fQuery.searchText.value)
		fQuery.search.value = "AND "+fQuery.searchType.value+" LIKE '%"+fQuery.searchText.value+"%'";
	else
		fQuery.search.value = "";
*/
	setMode("A");
	
	var trans = new Trans();
	trans.setPageRow(999);
	trans.setSvc(SELECT_UPG_ID);
	trans.setDefClick(true);
	trans.setWiseGrid("1");
	trans.setForwardId("wgdsl","");
	trans.open("fQuery","f","/wisegrid.do");
}

/*****************/
//상세정보
//그리드 onclick 이벤트 함수
/*****************/
function showDetailO_obj(id, strColumnKey, nRow)
{
	if(DataSet.getTotalCount(id) == "0")
		return;
				
	switch(id)
	{
		//게시판 리스트 클릭시
		case SELECT_UPG_ID:
			
			setMode("U");
			g_Ex_idx = nRow;
			showDetailByWise(id, nRow, f);

		break;
	}
}

/*****************/
//등록버튼
/*****************/
function exAdd()
{
	setMode("A");
}

/*****************/
//저장버튼
/*****************/
function exSave()
{
	var msg;
	var queryID;

	if(g_Flag == "A")
	{
		msg		= "SavConfirm";
		queryID	= INSERT_UPG_ID;
	}
	else if(g_Flag == "U")
	{
		msg		= "ChgConfirm";
		queryID	= UPDATE_UPG_ID;
	}
	
	if(!MessageBox(msg, "C", ""))
		return;
		
	var tran = new Trans();
	tran.setSvc(queryID);
	tran.open("f","f","/common.do");
}

/*****************/
//삭제버튼
/*****************/
function exDel()
{		
	if(!f.upg_seq.value)
	{
		MessageBox("NotSelectedGrid", "E", "");
		return;
	}
	
	if(!MessageBox("DelConfirm", "C", "업그레이드정보을"))
		return;
	
	var tran = new Trans();
	tran.setSvc(DELETE_UPG_ID);
	tran.open("f","f","/common.do");
}

/********************
* 모드변경
********************/
function setMode(sType)
{
	g_Flag = sType;
	
	switch(sType)
	{
		case "INIT":	//초기화
			clear(f);
//			f.ex_nm.disabled		= true;
//			f.ex_cont.disabled	= true;
		break;
		
		case "A":		//함수 등록
			clear(f);
/*			f.ex_nm.disabled		= false;
			f.ex_cont.disabled	= false;
			f.ex_nm.value	= "";
			f.ex_cont.value	= "";
			editor_setHTML("ex_cont",""); 
			f.rg_nm.value		= "";
			f.rg_dtm.value		= "";
			f.mdf_nm.value		= "";
			f.mdf_dtm.value		= "";
	*/		
			f.btnDel.disabled	= true;
		break;

		case "U":
			f.btnDel.disabled	= false;
		break;

		default:
		break;
	}
}

/*****************/
//키체크
/*****************/
function checkKeyPress()
{
	if(isEnterKey())
	{
		queryList();
	}
}
