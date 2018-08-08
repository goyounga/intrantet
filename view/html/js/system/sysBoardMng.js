var SELECT_BOARD_ID		= "UCSYS210S";		//게시판리스트 조회
var INSERT_BOARD_ID		= "UCSYS210I";		//게시판리스트 추가
var UPDATE_BOARD_ID		= "UCSYS210U";		//게시판리스트 수정
var DELETE_BOARD_ID		= "UCSYS210D";		//게시판리스트 삭제

var SELECT_GRD1_ID		= "UCSYS211S";		//권한부여된 사용자등급 조회
var INSERT_GRD1_ID		= "UCSYS211I";		//권한부여된 사용자등급 추가
var UPDATE_GRD1_ID		= "UCSYS211U";		//권한부여된 사용자등급 수정
var DELETE_GRD1_ID		= "UCSYS211D";		//권한부여된 사용자등급 삭제

var SELECT_GRD2_ID		= "UCSYS212S";		//권한부여 안된 사용자등급

var g_Flag;			//상태플러그
var g_Board_idx;	//게시판 리스트 index
var g_pop;			//게시판 미리보기 창
var update_flag = false;

/********************
* 콜백
********************/
function callback(sServiceID)
{
	switch (sServiceID)
	{
		case SELECT_BOARD_ID :
			break;

		case SELECT_GRD1_ID :
			if(update_flag)
			{
				update_flag = false;

				queryList1();
			}
			else
			{
				queryList2();
			}
			break;

		case SELECT_GRD2_ID :
			break;
		
		case INSERT_BOARD_ID :
			if (DataSet.getParam(sServiceID, 1, 0, "SUCCESS_COUNT") > 0)
			{
				MessageBox("InfSuccess", "I", "");
				queryList();
			}
			else
			{
				MessageBox("InfFail", "E", "게시판(INSERT)");
			}

			break;
		
		case UPDATE_BOARD_ID :
			if (DataSet.getParam(sServiceID, 1, 0, "SUCCESS_COUNT") > 0)
			{
				MessageBox("InfSuccess", "I", "");
				queryList();
			}
			else
			{
				MessageBox("InfFail", "E", "게시판(UPDATE)");
			}

			break;
		
		case DELETE_BOARD_ID :
			if (DataSet.getParam(sServiceID, 1, 0, "SUCCESS_COUNT") > 0)
			{
				MessageBox("Success", "I", "");
				queryList();
			}
			else
			{
				MessageBox("Fail", "E", "게시판(DELETE)");
			}

			break;
		
		case UPDATE_GRD1_ID :
			if (DataSet.getParam(sServiceID, 1, 0, "SUCCESS_COUNT") > 0)
			{
				queryList1();
			}
			else
			{
				MessageBox("Fail", "I", "");
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
	queryList();
}

/********************
* 게시판 조회
********************/
function queryList()
{
	setMode("A");
	
	var girdObj = document.all(SELECT_BOARD_ID);

	girdObj.setParam("rg_dtm_format", "DATET");
	girdObj.setParam("mdf_dtm_format", "DATET");

	var trans = new Trans();
	trans.setPageRow(999);
	trans.setSvc(SELECT_BOARD_ID);
	trans.setDefClick(true);
	trans.setWiseGrid("1");
	trans.setForwardId("wgdsl","");
	trans.open("fQuery","f","/wisegrid.do");
}

/********************
* 권한부여된 사용자등급 리스트
********************/
function queryList1()
{	
	update_flag = false;

	var trans = new Trans();
	trans.setPageRow(999);
	trans.setSvc(SELECT_GRD1_ID);
	trans.setWiseGrid("1");
	trans.setForwardId("wgdsl","");
	trans.open("f","f","/wisegrid.do");
}

/********************
* 권한부여 안된 사용자등급 리스트
********************/
function queryList2()
{
	var trans = new Trans();
	trans.setPageRow(999);
	trans.setSvc(SELECT_GRD2_ID);
	trans.setWiseGrid("1");
	trans.setForwardId("wgdsl","");
	trans.open("f","f","/wisegrid.do");
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
		case SELECT_BOARD_ID:
			
			var gridObj = document.all(SELECT_BOARD_ID);

			setMode("U");
			
			if(strColumnKey == "view")
			{
				if(typeof(g_pop) == "object")
				{
					g_pop.close();
					g_pop = "";
				}

				var param;
					param	=	"board_id="+gridObj.GetCellValue("board_id", nRow);
					param	+=	"&board_nm="+document.all(id).GetCellValue("board_nm", nRow);
//					g_pop =  window.open("/system/sysBoardList.jsp?"+param, "popup", "toolbar=no,scrollbars=no,top=0,left=100,width=1010,height=700");				
					g_pop =  openPopup("/jsp/system/sysBoardList.jsp", "param"+param, "popup", "0", "100", "1010", "700", "toolbar=no,scrollbars=no");
				return;
			}

			showDetailByWise(id, nRow, f);

			f.board_tp_seq.value = gridObj.GetCellValue("board_tp_seq", nRow);
			queryList1();
			
		break;
	}
}

/*****************/
//등록버튼
/*****************/
function boardAdd()
{
	setMode("A");
	wisegridClear(SELECT_GRD1_ID);
	wisegridClear(SELECT_GRD2_ID);
}

/*****************/
//저장버튼
/*****************/
function boardsave()
{	
	if(!f.board_knd_cd.value)
	{
		MessageBox("Required", "E", "게시판종류");
		return;
	}
	if(!f.board_nm.value)
	{
		MessageBox("Required", "E", "게시판명");
		return;
	}
	if(!f.use_f.value)
	{
		MessageBox("Required", "E", "사용여부");
		return;
	}

	var msg;
	var queryID;
	var gridObj = document.all(SELECT_BOARD_ID);

	if(g_Flag == "A")
	{
		msg			= "SavConfirm";
		queryID		= INSERT_BOARD_ID;
	}
	else if(g_Flag == "U")
	{
		msg		= "ChgConfirm";
		queryID	= UPDATE_BOARD_ID;
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
function boarddel()
{		
	if(!f.board_nm.value)
	{
		MessageBox("NotSelectedGrid", "E", "");
		return;
	}
	
	if(!MessageBox("DelConfirm", "C", "선택된 게시판을 "))
		return;
	
	var gridObj = document.all(SELECT_BOARD_ID);

	var tran = new Trans();
	tran.setSvc(DELETE_BOARD_ID);
	tran.open("f","f","/common.do");
}

/*****************/
//권한 저장
/*****************/
function authSave()
{
	var GridObj = document.all(SELECT_GRD1_ID);
	var Obj		= document.all(SELECT_BOARD_ID);
	
	if(GridObj.GetRowCount() < 1)
	{		
		MessageBox("SYSNotCnt", "E", "");
		return;
	}
	
	update_flag = true;

	var trans = new Trans();
	trans.setSvc(SELECT_GRD1_ID);
	trans.setMode("save");
	trans.setWiseGrid("1");
	trans.setForwardId("wgdsl","");
	trans.open("f","f","/wisegrid.do");
}

/**********************
* 필드 리스트 테이블 Row 이동
**********************/
function moveRow(fromObj, toObj)
{
	var fromGridObj = document.all(fromObj);
	var toGridObj = document.all(toObj);

	if(!chkSelected(fromGridObj))
	{
		MessageBox("SYSSelectRow", "E", "");
		return;
	}
	
	for(i = 0; i < fromGridObj.GetRowCount(); i++)
	{
		if(fromGridObj.GetCellValue("chk", i) == "1")
		{
			toGridObj.AddRow();
			for(j = 0; j < toGridObj.GetColCount(); j++)
			{
				if(fromObj == SELECT_GRD2_ID)
				{
					if(toGridObj.GetColHDKey(j) != "CRUD")
						toGridObj.SetCellValue(toGridObj.GetColHDKey(j), toGridObj.GetRowCount()-1, fromGridObj.GetCellValue(toGridObj.GetColHDKey(j), i));
				}
				else
				{
					if(fromGridObj.GetColHDKey(j) != "CRUD")
						toGridObj.SetCellValue(toGridObj.GetColHDKey(j), toGridObj.GetRowCount()-1, fromGridObj.GetCellValue(toGridObj.GetColHDKey(j), i));
				}
			}
		}
	}

	for(i = fromGridObj.GetRowCount()-1; i >= 0; i--)
	{
		if(fromGridObj.GetCellValue("chk", i) == "1")
		{
			fromGridObj.DeleteRow(i);
		}
	}
}

/**********************
* 그리드에 선택된 CheckBox가 있는지 체크
**********************/
function chkSelected(GridObj)
{
	for(i = 0; i < GridObj.GetRowCount(); i++)
	{
		if(GridObj.GetCellValue("chk", i) == "1")
		{
			return true;
		}
	}	
	return false;
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
			var obj = document.all(SELECT_GRD2_ID);
			obj.SetColHide('r_auth_f', true);
			obj.SetColHide('w_auth_f', true);

			f.board_nm.disabled	= true;
		break;
		
		case "A":		//게시판정보 등록
			f.board_nm.disabled	= false;
			f.board_nm.value	= "";
			f.use_f.value		= "Y";
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
