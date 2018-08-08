var SELECT_CTGR_ID		= "UCUCR300S";		//카테고리 조회
var INSERT_CTGR_ID		= "UCUCR300I";		//카테고리 추가
var UPDATE_CTGR_ID		= "UCUCR300U";		//카테고리 수정
var DELETE_CTGR_ID		= "UCUCR300D";		//카테고리 삭제

var g_Flag;			//상태플러그
var g_Ctgr_idx;	//자료 리스트 index
var update_flag = false;

/********************
* 콜백
********************/
function callback(sServiceID)
{
	switch (sServiceID)
	{
		case SELECT_CTGR_ID :
			break;

		case INSERT_CTGR_ID :
			if (DataSet.getParam(sServiceID, 1, 0, "SUCCESS_COUNT") > 0)
			{
				MessageBox("InfSuccess", "I", "");
				queryList();
			}
			else
			{
				MessageBox("InfFail", "E", "자료(INSERT)");
			}

			break;
		
		case UPDATE_CTGR_ID :
			if (DataSet.getParam(sServiceID, 1, 0, "SUCCESS_COUNT") > 0)
			{
				MessageBox("InfSuccess", "I", "");
				queryList();
			}
			else
			{
				MessageBox("InfFail", "E", "자료(UPDATE)");
			}

			break;
		
		case DELETE_CTGR_ID :
			if (DataSet.getParam(sServiceID, 1, 0, "SUCCESS_COUNT") > 0)
			{
				MessageBox("Success", "I", "");
				queryList();
			}
			else
			{
				MessageBox("Fail", "E", "자료(DELETE)");
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
* 자료 조회
********************/
function queryList()
{
	if(!fQuery.lang_tp_cd.value)
	{
		MessageBox("Required", "E", "언어유형");
		return;
	}
	if(fQuery.searchType.value && !fQuery.searchText.value)
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

	setMode("A");
	
	var girdObj = document.all(SELECT_CTGR_ID);

	girdObj.setParam("rg_dtm_format", "DATET");
	girdObj.setParam("mdf_dtm_format", "DATET");

	var trans = new Trans();
	trans.setPageRow(999);
	trans.setSvc(SELECT_CTGR_ID);
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
		case SELECT_CTGR_ID:
			
			setMode("U");
			g_Ctgr_idx = nRow;
			showDetailByWise(id, nRow, f);

			var gridObj = document.all(SELECT_CTGR_ID);
			f.help_ctgr_seq.value = gridObj.GetCellValue("help_ctgr_seq", nRow);
			
		break;
	}
}

/*****************/
//등록버튼
/*****************/
function ctgrAdd()
{
	setMode("A");
}

/*****************/
//저장버튼
/*****************/
function ctgrSave()
{	
	if(!f.lang_tp_cd.value)
	{
		MessageBox("Required", "E", "언어유형");
		return;
	}
	if(!f.ctgr_nm.value)
	{
		MessageBox("Required", "E", "카테고리명");
		return;
	}

	var msg;
	var queryID;

	if(g_Flag == "A")
	{
		msg		= "SavConfirm";
		queryID	= INSERT_CTGR_ID;
	}
	else if(g_Flag == "U")
	{
		msg		= "ChgConfirm";
		queryID	= UPDATE_CTGR_ID;
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
function ctgrDel()
{		
	if(!f.ctgr_nm.value)
	{
		MessageBox("NotSelectedGrid", "E", "");
		return;
	}
	
	if(!MessageBox("DelConfirm", "C", "자료"))
		return;
	
	var tran = new Trans();
	tran.setSvc(DELETE_CTGR_ID);
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
			f.ctgr_nm.disabled	= true;
			f.ctgr_desc.disabled	= true;
		break;
		
		case "A":		//카테고리 등록
			f.ctgr_nm.disabled	= false;
			f.ctgr_desc.disabled	= false;
			f.ctgr_nm.value	= "";
			f.ctgr_desc.value	= "";
			f.use_f.value	= "Y";
			f.rg_nm.value		= "";
			f.rg_dtm.value		= "";
			f.mdf_nm.value		= "";
			f.mdf_dtm.value		= "";
			
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
