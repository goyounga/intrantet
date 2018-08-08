var SELECT_EX_ID		= "UCSYS303S";		//Example 조회
var INSERT_EX_ID		= "UCSYS302I";		//Example 추가
var UPDATE_EX_ID		= "UCSYS302U";		//Example 수정
var DELETE_EX_ID		= "UCSYS302D";		//Example 삭제

var g_Flag;			//상태플러그
var g_Ex_idx;	//Example 리스트 index
var update_flag = false;

/********************
* 콜백
********************/
function callback(sServiceID)
{
	switch (sServiceID)
	{
		case INSERT_EX_ID :
			if (DataSet.getParam(sServiceID, 1, 0, "SUCCESS_COUNT") > 0)
			{
				MessageBox("InfSuccess", "I", "");
				queryList();
			}
			else
			{
				MessageBox("InfFail", "E", "Example(INSERT)");
			}

			break;
		
		case UPDATE_EX_ID :
			if (DataSet.getParam(sServiceID, 1, 0, "SUCCESS_COUNT") > 0)
			{
				MessageBox("InfSuccess", "I", "");
				queryList();
			}
			else
			{
				MessageBox("InfFail", "E", "Example(UPDATE)");
			}

			break;
		
		case DELETE_EX_ID :
			if (DataSet.getParam(sServiceID, 1, 0, "SUCCESS_COUNT") > 0)
			{
				MessageBox("Success", "I", "");
				queryList();
			}
			else
			{
				MessageBox("Fail", "E", "Example(DELETE)");
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
	f.userid.value = "1111"; //임시...
}

/********************
* Example 조회
********************/
function queryList()
{
	setMode("A");
	
	var girdObj = document.all(SELECT_EX_ID);

	girdObj.setParam("rg_dtm_format", "DATET");
	girdObj.setParam("mdf_dtm_format", "DATET");

	var trans = new Trans();
	trans.setPageRow(999);
	trans.setSvc(SELECT_EX_ID);
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
		case SELECT_EX_ID:
			
			setMode("U");
			g_Ex_idx = nRow;
			showDetailByWise(id, nRow, f);

			var gridObj = document.all(SELECT_EX_ID);
			f.ex_seq.value = gridObj.GetCellValue("ex_seq", nRow);
			
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
	if(!f.ex_nm.value)
	{
		MessageBox("Required", "E", "예제명");
		return;
	}

	var msg;
	var queryID;

	if(g_Flag == "A")
	{
		msg		= "SavConfirm";
		queryID	= INSERT_EX_ID;
	}
	else if(g_Flag == "U")
	{
		msg		= "ChgConfirm";
		queryID	= UPDATE_EX_ID;
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
	if(!f.ex_nm.value)
	{
		MessageBox("NotSelectedGrid", "E", "");
		return;
	}
	
	if(!MessageBox("DelConfirm", "C", "Example을"))
		return;
	
	var tran = new Trans();
	tran.setSvc(DELETE_EX_ID);
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
			f.ex_nm.disabled		= true;
			f.ex_cont.disabled	= true;
		break;
		
		case "A":		//함수 등록
			f.ex_nm.disabled		= false;
			f.ex_cont.disabled	= false;
			f.ex_nm.value	= "";
			f.ex_cont.value	= "";
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
