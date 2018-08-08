var SELECT_PRJINFO_ID	= "UCSYS217S";		//프로젝트 리스트 조회
var SELECT_QST_ID		= "UCSYS218S";		//질문 조회
var INSERT_QST_ID		= "UCSYS123I";		//질문 추가
var UPDATE_QST_ID		= "UCSYS123U";		//질문 수정
var DELETE_QST_ID		= "UCSYS123D";		//질문 삭제
var DELETE_QNA_ID		= "UCSYS124D";		//질문에 등록된 답변 동시 삭제
var SELECT_ANW_ID		= "UCSYS219S";		//답변 조회
var INSERT_ANW_ID		= "UCSYS124I";		//답변 추가
var UPDATE_ANW_ID		= "UCSYS124U";		//답변 수정
var DELETE_ANW_ID		= "UCSYS125D";		//답변 삭제

var g_QstFlag;	//질문 상태플러그
var g_AnwFlag;	//질문 상태플러그
var g_Qst_idx;	//질문 리스트 index
var g_Anw_idx;	//답변 리스트 index
var update_flag = false;

/********************
* 콜백
********************/
function callback(sServiceID)
{
	switch (sServiceID)
	{
		case INSERT_QST_ID :
			if (DataSet.getParam(sServiceID, 1, 0, "SUCCESS_COUNT") > 0)
			{
				MessageBox("InfSuccess", "I", "");
				queryList();
			}
			else
			{
				MessageBox("InfFail", "E", "질문(INSERT)");
			}

			break;
		
		case UPDATE_QST_ID :
			if (DataSet.getParam(sServiceID, 1, 0, "SUCCESS_COUNT") > 0)
			{
				MessageBox("InfSuccess", "I", "");
				queryList();
			}
			else
			{
				MessageBox("InfFail", "E", "질문(UPDATE)");
			}

			break;
		
		case DELETE_QST_ID+","+DELETE_QNA_ID :
//			if (DataSet.getParam(sServiceID, 1, 0, "SUCCESS_COUNT") > 0)
//			{
				MessageBox("Success", "I", "");
				queryList();
//			}
/*			else
			{
				MessageBox("Fail", "E", "질문(DELETE)");
			}
*/
			break;
		
		case INSERT_ANW_ID :
			if (DataSet.getParam(sServiceID, 1, 0, "SUCCESS_COUNT") > 0)
			{
				MessageBox("InfSuccess", "I", "");
				queryList1();
			}
			else
			{
				MessageBox("InfFail", "E", "답변(INSERT)");
			}

			break;
		
		case UPDATE_ANW_ID :
			if (DataSet.getParam(sServiceID, 1, 0, "SUCCESS_COUNT") > 0)
			{
				MessageBox("InfSuccess", "I", "");
				queryList1();
			}
			else
			{
				MessageBox("InfFail", "E", "답변(UPDATE)");
			}

			break;
		
		case DELETE_ANW_ID :
			if (DataSet.getParam(sServiceID, 1, 0, "SUCCESS_COUNT") > 0)
			{
				MessageBox("Success", "I", "");
				queryList1();
			}
			else
			{
				MessageBox("Fail", "E", "답변(DELETE)");
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
* 질문 조회
********************/
function queryList()
{
	setMode("QA");
	
	var girdObj = document.all(SELECT_QST_ID);

	girdObj.setParam("q_rg_dtm_format", "DATET");
	girdObj.setParam("q_mdf_dtm_format", "DATET");

	var trans = new Trans();
	trans.setPageRow(999);
	trans.setSvc(SELECT_QST_ID);
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
		//질문 리스트 클릭시
		case SELECT_QST_ID:
			
			setMode("QU");
			g_Qst_idx = nRow;
			showDetailByWise(id, nRow, f);

			var gridObj = document.all(SELECT_QST_ID);
			f.qst_seq.value = gridObj.GetCellValue("qst_seq", nRow);

			queryList1();
			
		break;

		//답변 리스트 클릭시
		case SELECT_ANW_ID:
			
			setMode("AU");
			g_Anw_idx = nRow;
			showDetailByWise(id, nRow, f);

			var gridObj = document.all(SELECT_ANW_ID);
			f.anw_seq.value = gridObj.GetCellValue("anw_seq", nRow);
			
		break;
	}
}

/********************
* 답변 조회
********************/
function queryList1()
{
	setMode("AA");
	
	var girdObj = document.all(SELECT_ANW_ID);
	girdObj.setParam("a_rg_dtm_format", "DATET");
	girdObj.setParam("a_mdf_dtm_format", "DATET");
	
	var trans = new Trans();
	trans.setPageRow(999);
	trans.setSvc(SELECT_ANW_ID);
	trans.setDefClick(true);
	trans.setWiseGrid("1");
	trans.setForwardId("wgdsl","");
	trans.open("f","f","/wisegrid.do");
}

/*****************/
//등록버튼
/*****************/
function qstAdd()
{
	setMode("QA");
}

/*****************/
//저장버튼
/*****************/
function qstSave()
{	
	if(!f.qst_cont.value)
	{
		MessageBox("Required", "E", "질문내용");
		return;
	}
	if(!f.prj_seq.value)
	{
		MessageBox("Required", "E", "프로젝트");
		return;
	}
	if(!f.qst_tp_cd.value)
	{
		MessageBox("Required", "E", "질문유형");
		return;
	}

	var msg;
	var queryID;

	if(g_QstFlag == "QA")
	{
		msg		= "SavConfirm";
		queryID	= INSERT_QST_ID;
	}
	else if(g_QstFlag == "QU")
	{
		msg		= "ChgConfirm";
		queryID	= UPDATE_QST_ID;
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
function qstDel()
{		
	if(!f.qst_cont.value)
	{
		MessageBox("NotSelectedGrid", "E", "");
		return;
	}
	
	if(!MessageBox("DelConfirm", "C", "등록된 답변도 같이 삭제됩니다."))
		return;
	
	var tran = new Trans();
	tran.setSvc(DELETE_QST_ID+","+DELETE_QNA_ID);
	tran.open("f","f","/common.do");
}

/*****************/
//등록버튼
/*****************/
function anwAdd()
{
	setMode("AA");
}

/*****************/
//저장버튼
/*****************/
function anwSave()
{	
	if(!f.anw_cont.value)
	{
		MessageBox("Required", "E", "질문내용");
		return;
	}

	var msg;
	var queryID;

	if(g_AnwFlag == "AA")
	{
		msg		= "SavConfirm";
		queryID	= INSERT_ANW_ID;
	}
	else if(g_AnwFlag == "AU")
	{
		msg		= "ChgConfirm";
		queryID	= UPDATE_ANW_ID;
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
function anwDel()
{		
	if(!f.anw_cont.value)
	{
		MessageBox("NotSelectedGrid", "E", "");
		return;
	}
	
	if(!MessageBox("DelConfirm", "C", "답변을"))
		return;
	
	var tran = new Trans();
	tran.setSvc(DELETE_ANW_ID);
	tran.open("f","f","/common.do");
}

/********************
* 모드변경
********************/
function setMode(sType)
{
	switch(sType)
	{
		case "INIT":	//초기화
			f.qst_cont.disabled	= true;
			f.anw_cont.disabled	= true;
		break;
		
		case "QA":		//질문 등록
			g_QstFlag = sType;

			f.qst_cont.disabled	= false;
			f.qst_cont.value	= "";
			f.prj_seq.value	= "";
			f.qst_tp_cd.value	= "";
			f.q_rg_nm.value		= "";
			f.q_rg_dtm.value		= "";
			f.q_mdf_nm.value		= "";
			f.q_mdf_dtm.value		= "";
			
			wisegridClear(SELECT_ANW_ID);
			f.anw_cont.disabled	= true;
			f.anw_cont.value	= "";
			f.a_rg_nm.value		= "";
			f.a_rg_dtm.value		= "";
			f.a_mdf_nm.value		= "";
			f.a_mdf_dtm.value		= "";

			f.btnQstDel.disabled	= true;
		break;

		case "QU":
			g_QstFlag = sType;

			f.btnQstDel.disabled	= false;
		break;

		case "AA":		//답변 등록
			g_AnwFlag = sType;
	
			f.anw_cont.disabled	= false;
			f.anw_cont.value	= "";
			f.a_rg_nm.value		= "";
			f.a_rg_dtm.value		= "";
			f.a_mdf_nm.value		= "";
			f.a_mdf_dtm.value		= "";
			
			f.btnAnwDel.disabled	= true;
		break;

		case "AU":
			g_AnwFlag = sType;

			f.btnAnwDel.disabled	= false;
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
