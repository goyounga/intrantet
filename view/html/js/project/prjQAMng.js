var SELECT_PRJINFO_ID	= "UCPRJ217S";		//프로젝트 리스트 조회
var SELECT_QST_ID		= "UCPRJ218S";		//질문 조회
var INSERT_QST_ID		= "UCPRJ123I";		//질문 추가
var UPDATE_QST_ID		= "UCPRJ123U";		//질문 수정
var DELETE_QST_ID		= "UCPRJ123D";		//질문 삭제
var DELETE_QNA_ID		= "UCPRJ124D";		//질문에 등록된 답변 동시 삭제
var SELECT_ANW_ID		= "UCPRJ219S";		//답변 조회
var INSERT_ANW_ID		= "UCPRJ124I";		//답변 추가
var UPDATE_ANW_ID		= "UCPRJ124U";		//답변 수정
var DELETE_ANW_ID		= "UCPRJ125D";		//답변 삭제

//질문을 INSERT 할 경우 시퀀스를 가져와서 파일 테이블에 같이 INSERT 해야하기 때문에 두 트랜잭션으로 처리한다. 
//질문을 UPDATE 할 경우에는 시퀀스를 미리 알고 있기 때문에 한 트랜잭션으로 처리가 가능하다.
var ALL_INSERT_QST_ID 	= "UCPRJ123I,UCPRJ127S";			//질문 추가 + 현재 질문 시퀀스 조회
var ALL_INSERT_QST_ID2	= "UCPRJ126I";						//파일 추가
var ALL_UPDATE_QST_ID	= "UCPRJ123U,UCPRJ126I";			//질문 수정 + 파일 추가
var ALL_DELETE_QST_ID 	= "UCPRJ124D,UCPRJ123D,UCPRJ126D";	//답변 삭제(먼저 삭제) + 질문 삭제+ 파일 삭제
var FILE_SELECT_ID 		= "UCPRJ126S";		//파일 조회
var FILE_DELETE_ID 		= "UCPRJ126D";		//파일만 삭제

var g_QstFlag;	//질문 상태플러그
var g_AnwFlag;	//질문 상태플러그
var g_Qst_idx;	//질문 리스트 index
var g_Anw_idx;	//답변 리스트 index
var update_flag = false;

var UPLOAD_PATH 		= "UPLOAD_PATH";
var UPLOAD_FOLDER_NAME 	= "prj";

/********************
* 콜백
********************/
function callback(sServiceID)
{
	switch (sServiceID)
	{
		case ALL_INSERT_QST_ID :

			f.up_seq.value = DataSet.getParam("UCPRJ127S", 1, 0, "seq");
			
			insertUpFile();
			
			break;

		case ALL_INSERT_QST_ID2 :
		case INSERT_QST_ID :
			if (DataSet.getParam(INSERT_QST_ID, 1, 0, "SUCCESS_COUNT") > 0)
			{
				MessageBox("InfSuccess", "I", "");
				
				initUploadFile();
				
				queryList();
			}
			else
			{
				MessageBox("InfFail", "E", "질문(INSERT)");
			}

			break;
		
		case ALL_UPDATE_QST_ID :
		case UPDATE_QST_ID :
			if (DataSet.getParam(UPDATE_QST_ID, 1, 0, "SUCCESS_COUNT") > 0)
			{
				MessageBox("InfSuccess", "I", "");
				
				initUploadFile();
				
				queryList();
			}
			else
			{
				MessageBox("InfFail", "E", "질문(UPDATE)");
			}

			break;
		
		case ALL_DELETE_QST_ID:
//			if (DataSet.getParam(ALL_DELETE_QST_ID, 1, 0, "SUCCESS_COUNT") > 0)
//			{
				MessageBox("Success", "I", "");
				
				initUploadFile();
				
				queryList();
//			}
/*			else
			{
				MessageBox("Fail", "E", "질문(DELETE)");
			}
*/
			break;
		
		case INSERT_ANW_ID :
			if (DataSet.getParam(INSERT_ANW_ID, 1, 0, "SUCCESS_COUNT") > 0)
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
			if (DataSet.getParam(UPDATE_ANW_ID, 1, 0, "SUCCESS_COUNT") > 0)
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
			if (DataSet.getParam(DELETE_ANW_ID, 1, 0, "SUCCESS_COUNT") > 0)
			{
				MessageBox("Success", "I", "");
				queryList1();
			}
			else
			{
				MessageBox("Fail", "E", "답변(DELETE)");
			}

			break;
		
		case FILE_SELECT_ID:

			showUploadFileList();

			break;

		case FILE_DELETE_ID:

			if (DataSet.getParam(FILE_DELETE_ID, 1, 0, "SUCCESS_COUNT") > 0)
			{
				MessageBox("Success", "E", "");

				queryUploadFile();
			}
			break;
		case SELECT_ANW_ID :
		
			queryUploadFile();
		
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
	
	//첨부파일 div 초기화
	setUploadFile("&nbsp;");
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
			f.up_seq.value = gridObj.GetCellValue("qst_seq", nRow);		//파일 업로드, 삭제 시 사용
					
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
 * 업로드 파일 조회
********************/
function queryUploadFile()
{
	var tran = new Trans();
	tran.setSvc(FILE_SELECT_ID);
	tran.setPageRow(9999);
	tran.setAsync(false);
	tran.open("f", "f", "/common.do");
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
	//파일업로드 시
	if (iUpload.existsUploadFile() == true)
	{
		if(checkSaveData() == false) return;

		iUpload.upload(UPLOAD_PATH, UPLOAD_FOLDER_NAME);
	}
	else
	{
		save();
	}
}

function checkSaveData()
{
	if(!f.qst_cont.value)
	{
		MessageBox("Required", "E", "질문내용");
		return false;
	}
	if(!f.prj_seq.value)
	{
		MessageBox("Required", "E", "프로젝트");
		return false;
	}
	if(!f.qst_tp_cd.value)
	{
		MessageBox("Required", "E", "질문유형");
		return false;
	}
}

function save()
{
	if(iUpload.existsUploadFile() == false && checkSaveData() == false) return;

	var msg;
	var queryID;

	if(g_QstFlag == "QA")
	{
		msg		= "SavConfirm";
		
		if (iUpload.existsUploadFile() == true)
		{
			queryID	= ALL_INSERT_QST_ID;
		}
		else
		{
			queryID	= INSERT_QST_ID;
		}
	}
	else if(g_QstFlag == "QU")
	{
		msg		= "ChgConfirm";
		
		if (iUpload.existsUploadFile() == true)
		{
			queryID	= ALL_UPDATE_QST_ID;
		}
		else
		{
			queryID	= UPDATE_QST_ID;
		}
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
	tran.setSvc(ALL_DELETE_QST_ID);
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
	if(f.prj_seq.value == "")
	{
		alert("질문을 선택하세요.");
		return;
	}
	
	if(!f.anw_cont.value)
	{
		MessageBox("Required", "E", "답변내용");
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
//파일업로드 시 질문 순번을 조회 한 후 INSERT 하기 위해
/*****************/
function insertUpFile()
{
	var tran = new Trans();
	tran.setSvc(ALL_INSERT_QST_ID2);
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
	var inputStatus;
	
	switch(sType)
	{
		case "INIT":	//초기화
			f.qst_cont.disabled	= true;
			f.anw_cont.disabled	= true;
			
			inputStatus = true;
			uploadFileDisabled(false);
			initUploadFile();
		break;
		
		case "QA":		//질문 등록
			g_QstFlag = sType;

			f.qst_cont.disabled	= false;
			f.qst_cont.value	= "";
			f.prj_seq.value	= "";
			f.prj_nm.value	= "";
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

			inputStatus = false;
			uploadFileDisabled(true);
			initUploadFile();
		break;

		case "QU":
			g_QstFlag = sType;

			f.btnQstDel.disabled	= false;
			
			inputStatus = false;
			uploadFileDisabled(false);
			initUploadFile();
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
	
	if(typeof inputStatus != "undefined")
	{
		uploadFormSetDisabled(inputStatus);
		iconDisabled(["icoBig", "icoSmall", "icoUploadFiles", "icoShowFiles"], inputStatus);
	}
}

/********************
* 프로젝트 선택버튼
********************/
function openProject(frm)
{
	g_frm = frm;
	
	if(typeof(openPopup) == "object")
		openPopup.close();
	
	openPopup("/jsp/project/prjExePOP.jsp", "", "popup", "0", "300", "800", "565", "toolbar=no,scrollbars=no");
}

/********************
* 프로젝트 창에서 선택했을때 setProject를 호출한다.
********************/
function setProject(prj_seq, prj_nm)
{
	g_frm.prj_seq.value = prj_seq;
	g_frm.prj_nm.value = prj_nm;

}

/********************
* 프로젝트 Clear버튼
********************/
function del_Project(frm)
{
	frm.prj_seq.value = "";
	frm.prj_nm.value = "";
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
