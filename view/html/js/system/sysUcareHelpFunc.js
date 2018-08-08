var SELECT_CTGRINFO_ID	= "UCSYS301S";	//카테고리 조회(언어유형별)
var SELECT_FUNC_ID		= "UCSYS302S";		//Function 조회
var INSERT_FUNC_ID		= "UCSYS301I";		//Function 추가
var UPDATE_FUNC_ID		= "UCSYS301U";		//Function 수정
var DELETE_FUNC_ID		= "UCSYS301D";		//Function 삭제

var g_Flag;			//상태플러그
var g_Func_idx;	//Function 리스트 index
var update_flag = false;

/********************
* 콜백
********************/
function callback(sServiceID)
{
	switch (sServiceID)
	{
		case SELECT_CTGRINFO_ID:
			var curpage =(DataSet.getDsAttribute(sServiceID, "curpage"));
			var cd = new Array();
			var nm = new Array();

			for(var i = 0 ; i < DataSet.getTotalCount(sServiceID) ; i++){
				cd[i] = DataSet.getParam(sServiceID, curpage, i, "help_ctgr_seq");
				nm[i] = DataSet.getParam(sServiceID, curpage, i, "ctgr_nm");
			}

			setOptions(fQuery.help_ctgr_seq, cd, nm, false, true);
			setOptions(f.help_ctgr_seq, cd, nm, false, true);
		break;
		
		case INSERT_FUNC_ID :
			if (DataSet.getParam(sServiceID, 1, 0, "SUCCESS_COUNT") > 0)
			{
				MessageBox("InfSuccess", "I", "");
				queryList();
			}
			else
			{
				MessageBox("InfFail", "E", "Function(INSERT)");
			}

			break;
		
		case UPDATE_FUNC_ID :
			if (DataSet.getParam(sServiceID, 1, 0, "SUCCESS_COUNT") > 0)
			{
				MessageBox("InfSuccess", "I", "");
				queryList();
			}
			else
			{
				MessageBox("InfFail", "E", "Function(UPDATE)");
			}

			break;
		
		case DELETE_FUNC_ID :
			if (DataSet.getParam(sServiceID, 1, 0, "SUCCESS_COUNT") > 0)
			{
				MessageBox("Success", "I", "");
				queryList();
			}
			else
			{
				MessageBox("Fail", "E", "Function(DELETE)");
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
* 언어 유형에 따라 카테고리 목록 조회
********************/
function getCtgrList()
{
	if (fQuery.lang_tp_cd.value == "") return;

	var trans = new Trans();
	trans.setPageRow(999);
	trans.setSvc(SELECT_CTGRINFO_ID);
	trans.open("fQuery","","/common.do");
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

	setMode("A");
	
	var girdObj = document.all(SELECT_FUNC_ID);

	girdObj.setParam("rg_dtm_format", "DATET");
	girdObj.setParam("mdf_dtm_format", "DATET");

	var trans = new Trans();
	trans.setPageRow(999);
	trans.setSvc(SELECT_FUNC_ID);
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
		case SELECT_FUNC_ID:
			
			setMode("U");
			g_Func_idx = nRow;
			showDetailByWise(id, nRow, f);

			var gridObj = document.all(SELECT_FUNC_ID);
			f.func_seq.value = gridObj.GetCellValue("func_seq", nRow);
			
		break;
	}
}

/*****************/
//등록버튼
/*****************/
function funcAdd()
{
	setMode("A");
}

/*****************/
//저장버튼
/*****************/
function funcSave()
{	
	if(!f.help_ctgr_seq.value)
	{
		MessageBox("Required", "E", "카테고리");
		return;
	}
	if(!f.func_nm.value)
	{
		MessageBox("Required", "E", "함수명");
		return;
	}

	var msg;
	var queryID;

	if(g_Flag == "A")
	{
		msg		= "SavConfirm";
		queryID	= INSERT_FUNC_ID;
	}
	else if(g_Flag == "U")
	{
		msg		= "ChgConfirm";
		queryID	= UPDATE_FUNC_ID;
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
function funcDel()
{		
	if(!f.func_nm.value)
	{
		MessageBox("NotSelectedGrid", "E", "");
		return;
	}
	
	if(!MessageBox("DelConfirm", "C", "Function을"))
		return;
	
	var tran = new Trans();
	tran.setSvc(DELETE_FUNC_ID);
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
			f.func_nm.disabled		= true;
			f.func_par.disabled		= true;
			f.func_desc.disabled	= true;
			f.func_ex.disabled		= true;
			f.func_src.disabled		= true;
			f.func_rmk.disabled		= true;
		break;
		
		case "A":		//함수 등록
			f.func_nm.disabled		= false;
			f.func_par.disabled		= false;
			f.func_desc.disabled	= false;
			f.func_ex.disabled		= false;
			f.func_src.disabled		= false;
			f.func_rmk.disabled		= false;
			f.func_nm.value	= "";
			f.func_par.value	= "";
			f.func_desc.value	= "";
			f.func_ex.value	= "";
			f.func_src.value	= "";
			f.func_rmk.value	= "";
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
