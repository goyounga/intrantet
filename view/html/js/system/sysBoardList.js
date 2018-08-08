var SELECT_BOARDINFO_ID		= "UCSYS117S";		//게시판 리스트 조회
var SELECT_BOARDAUTH_ID		= "UCSYS118S";		//게시판 세부권한 조회
var SELECT_BOARDLIST_ID		= "UCSYS214S";		//글 목록 조회

var INSERT_BOARDLIST_ID		= "UCSYS214I";		//게시글 저장
var UPDATE_BOARDLIST_ID		= "UCSYS214U";		//게시글 수정
var DELETE_BOARDLIST_ID		= "UCSYS214D";		//게시글 삭제
var DELETE_BOARDRPLY_ID		= "UCSYS216D";		//게시글에 등록된 댓글 동시에 삭제
var REMOVE_BOARDFILE_ID		= "UCSYS216U";		//게시글 첨부파일 삭제
var QRY_UP_BOARDLIST_ID		= "UCSYS115U";		//게시글 조회수 +1

var SELECT_REPLYLIST_ID		= "UCSYS215S";		//게시판댓글 조회
var INSERT_REPLYLIST_ID		= "UCSYS215I";		//게시판댓글 저장
var UPDATE_REPLYLIST_ID		= "UCSYS215U";		//게시판댓글 수정
var DELETE_REPLYLIST_ID		= "UCSYS215D";		//게시판댓글 삭제

var RPLY_UP_BOARDLIST_ID		= "UCSYS116U";		//게시글 댓글수 +1
var RPLY_DOWN_BOARDLIST_ID		= "UCSYS117U";		//게시글 댓글수 -1

var g_ReadFlag;		//읽기 권한
var g_WriteFlag;	//쓰기 권한
var g_BoardFlag;	//게시물 상태플러그
var g_ReplyFlag;	//댓글 상태플러그
var g_Board_idx;	//게시판 리스트 index

/********************
* 콜백
********************/
function callback(sServiceID)
{
	switch (sServiceID)
	{
		case SELECT_BOARDINFO_ID:
/*			document.all("r_auth_span").innerText = DataSet.getParam(sServiceID, 1, 0, "r_auth_span");
			document.all("w_auth_span").innerText = DataSet.getParam(sServiceID, 1, 0, "w_auth_span");
			document.all("d_auth_span").innerText = DataSet.getParam(sServiceID, 1, 0, "d_auth_span");
*/
			var curpage =(DataSet.getDsAttribute(SELECT_BOARDINFO_ID,"curpage"));
			var cd = new Array();
			var nm = new Array();

			for(var i = 0 ; i < DataSet.getTotalCount(SELECT_BOARDINFO_ID) ; i++){
				cd[i] = DataSet.getParam(SELECT_BOARDINFO_ID, curpage, i, "board_tp_seq");
				nm[i] = DataSet.getParam(SELECT_BOARDINFO_ID, curpage, i, "board_nm");
			}

			setOptions(fQuery.board_nm, cd, nm, false, true);
		break;
		
		case SELECT_BOARDAUTH_ID:

			g_ReadFlag = DataSet.getParam(SELECT_BOARDAUTH_ID, 1, 0, "read_auth_f");
			g_WriteFlag = DataSet.getParam(SELECT_BOARDAUTH_ID, 1, 0, "wrt_auth_f");

			setAuth();
		break;

		case QRY_UP_BOARDLIST_ID :
			queryList1();
		break;

		case INSERT_BOARDLIST_ID :
			if (DataSet.getParam(sServiceID, 1, 0, "SUCCESS_COUNT") > 0)
			{
				MessageBox("Success", "I", "");
				queryList();
			}
			else
			{
				MessageBox("InfFail", "E", "게시글(INSERT)");
			}
		break;
		
		case UPDATE_BOARDLIST_ID :
			if (DataSet.getParam(sServiceID, 1, 0, "SUCCESS_COUNT") > 0)
			{
				MessageBox("Success", "I", "");
				queryList();
			}
			else
			{
				MessageBox("InfFail", "E", "게시글(UPDATE)");
			}
		break;
		
		case DELETE_BOARDLIST_ID+","+DELETE_BOARDRPLY_ID :
//			if (DataSet.getParam(sServiceID, 1, 0, "SUCCESS_COUNT") > 0)
//			{
				MessageBox("Success", "I", "");
				queryList();
//			}
/*			else
			{
				MessageBox("Fail", "E", "게시글(DELETE)");
			}
*/		break;
		
		case REMOVE_BOARDFILE_ID:
//			if (DataSet.getParam(sServiceID, 1, 0, "SUCCESS_COUNT") > 0)
//			{
				MessageBox("Success", "I", "");
				queryList();
//			}
		break;
		
		case INSERT_REPLYLIST_ID+","+RPLY_UP_BOARDLIST_ID:
//			if (DataSet.getParam(sServiceID, 1, 0, "SUCCESS_COUNT") > 0)
//			{
				MessageBox("Success", "I", "");
				queryList1();
//			}
/*			else
			{
				MessageBox("InfFail", "E", "댓글(INSERT)");
			}
*/		break;
		
		case UPDATE_REPLYLIST_ID :
			if (DataSet.getParam(sServiceID, 1, 0, "SUCCESS_COUNT") > 0)
			{
				MessageBox("Success", "I", "");
				queryList1();
			}
			else
			{
				MessageBox("InfFail", "E", "댓글(UPDATE)");
			}
		break;
		
		case DELETE_REPLYLIST_ID+","+RPLY_DOWN_BOARDLIST_ID:
//			if (DataSet.getParam(sServiceID, 1, 0, "SUCCESS_COUNT") > 0)
//			{
				MessageBox("Success", "I", "");
				queryList1();
//			}
/*			else
			{
				MessageBox("Fail", "E", "댓글(DELETE)");
			}
*/		break;
		
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
	queryInfo();
}

/********************
* 게시판 리스트 조회
********************/
function queryInfo()
{
	var trans = new Trans();
	trans.setPageRow(999);
	trans.setSvc(SELECT_BOARDINFO_ID);
	trans.open("fQuery","","/common.do");
}

/********************
* 게시판 세부권한 조회
********************/
function getBoardAuth()
{
	var trans = new Trans();
	trans.setSvc(SELECT_BOARDAUTH_ID);
	trans.open("fQuery","","/common.do");
}

/********************
* 게시판 목록 조회
********************/
function queryList()
{
	if(!fQuery.board_nm.value)
	{
		MessageBox("Required", "E", "게시판명");
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
	
	setMode("BA");
	
	var girdObj = document.all(SELECT_BOARDLIST_ID);
	girdObj.setParam("rg_dtm_format", "DATET");
	
	var trans = new Trans();
	trans.setPageRow(999);
	trans.setSvc(SELECT_BOARDLIST_ID);
	trans.setDefClick(true);
	trans.setWiseGrid("1");
	trans.setForwardId("wgdsl","");
	trans.open("fQuery","f","/wisegrid.do");
}

function readCntPlus()
{
	var trans = new Trans();
	trans.setSvc(QRY_UP_BOARDLIST_ID);
	trans.open("f","f","/common.do");
}

/********************
* 게시판 댓글 조회
********************/
function queryList1()
{
	setMode("RA");
	
	var girdObj = document.all(SELECT_REPLYLIST_ID);
	girdObj.setParam("rply_rg_dtm_format", "DATET");
	
	var trans = new Trans();
	trans.setPageRow(999);
	trans.setSvc(SELECT_REPLYLIST_ID);
	trans.setDefClick(true);
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
		case SELECT_BOARDLIST_ID:
		
			setMode("BU");

			g_Board_idx = nRow;

			showDetail(id, nRow, f);
			
			var gridObj = document.all(SELECT_BOARDLIST_ID);
			var file_nm_1, file_nm_2, file_nm_3;
			
			f.board_seq.value = gridObj.GetCellValue("board_seq", nRow);

			file_nm_1 = gridObj.GetCellValue("atch_file_nm_1", nRow);
			file_nm_2 = gridObj.GetCellValue("atch_file_nm_2", nRow);
			file_nm_3 = gridObj.GetCellValue("atch_file_nm_3", nRow);

			if(file_nm_1)
			{
				document.all("nbsp_span_1").innerText = "";
				document.frames("iUpload1").fUpload._UPLOAD_FILE.disabled = true;
				document.all("file_span_1").style.display = "block";
			}
			else
			{
				document.all("nbsp_span_1").innerHTML = "&nbsp;";
				document.frames("iUpload1").fUpload._UPLOAD_FILE.disabled = false;
				document.all("file_span_1").style.display = "none";
			}
/*			if(file_nm_2)
			{
				document.all("nbsp_span_2").innerText = "";
				document.frames("iUpload2").fUpload._UPLOAD_FILE.disabled = true;
				document.all("file_span_2").style.display = "block";
			}
			else
			{
				document.all("nbsp_span_2").innerHTML = "&nbsp;";
				document.frames("iUpload2").fUpload._UPLOAD_FILE.disabled = false;
				document.all("file_span_2").style.display = "none";
			}
			if(file_nm_3)
			{
				document.all("nbsp_span_3").innerText = "";
				document.frames("iUpload3").fUpload._UPLOAD_FILE.disabled = true;
				document.all("file_span_3").style.display = "block";
			}
			else
			{
				document.all("nbsp_span_3").innerHTML = "&nbsp;";
				document.frames("iUpload3").fUpload._UPLOAD_FILE.disabled = false;
				document.all("file_span_3").style.display = "none";
			}
*/
			readCntPlus();
		
		break;
		
		case SELECT_REPLYLIST_ID :
		
			setMode("RU");
			g_Reply_idx = nRow;
			showDetail(id, nRow, f);
			
			var gridObj = document.all(SELECT_BOARDLIST_ID);
			
			f.rply_seq.value = gridObj.GetCellValue("rply_seq", nRow);

		break;
	}
}

/*****************/
//등록버튼
/*****************/
function boardAdd()
{
	setMode("BA");
}

/********************
* 파일명 받는 이벤트
* iUpload(upload.jsp)로부터 호출된다.
********************/
function setFileName(filenm) 
{
    f.file_nm_1.value = filenm;
    boardSave1();
}

/********************
* 파일 다운로드
********************/
function openFile(fileno)
{
	var gridObj = document.all(SELECT_BOARDLIST_ID);
	var file_nm = gridObj.GetCellValue("atch_file_nm_"+fileno, g_Board_idx);
	
	if(!file_nm)
		return;

	location.href("/jsp/common/downFile.jsp?filename="+file_nm+"&delete=NO");
}

/********************
* 기존 첨부파일삭제 이벤트
********************/
function delFile(fileno)
{
	var gridObj = document.all(SELECT_BOARDLIST_ID);
	var file_nm = gridObj.GetCellValue("atch_file_nm_"+fileno, g_Board_idx);
	
	if(!file_nm)
		return;

	var params = "filenm="+"atch_file_nm_"+fileno;
	
	var trans = new Trans();
	trans.setPageRow("9999");
	trans.setSvc(REMOVE_BOARDFILE_ID);
	trans.setForwardId("commonjsp","/jsp/common/removeFile.jsp?file_name="+ file_nm +"&file_path=UPLOAD_PATH");
	trans.setUserParams(params);
	trans.open("f","f","/common.do");
}

/*****************/
//저장버튼(파일 있는지 없는지 체크)
/*****************/
function boardSave()
{
	if(!f.board_sbjt.value)
	{
		MessageBox("Required", "E", "제목");
		return;
	}
	if(!fQuery.board_nm.value)
	{
		MessageBox("Required", "E", "게시판명");
		return;
	}
	if(!f.board_cont.value)
	{
		MessageBox("Required", "E", "내용");
		return;
	}
	
	if(g_BoardFlag =="BA")
		msg = "SavConfirm";
	else if(g_BoardFlag =="BU")
		msg = "ChgConfirm";
	
	if(!MessageBox(msg, "C", ""))
		return;
	
	if(iUpload1.fUpload._UPLOAD_FILE.value !="")
	{
		document.frames("iUpload1").upload("");
	}
	else
	{
		f.file_nm_1.value = document.all("atch_file_nm_1").innerText;
		boardSave1();
	}
}

/*****************/
//게시물 저장
/*****************/
function boardSave1()
{	
	var queryID;
	var params = "";
	var gridObj = document.all(SELECT_BOARDLIST_ID);
	
	params += "board_nm="+fQuery.board_nm.value;

	if(g_BoardFlag =="BA")
		queryID		= INSERT_BOARDLIST_ID;
	else if(g_BoardFlag =="BU")
		queryID		= UPDATE_BOARDLIST_ID;
	
	var tran = new Trans();
	tran.setSvc(queryID);
	tran.setUserParams(params);
	tran.open("f","f","/common.do");
}

/*****************/
//삭제버튼
/*****************/
function boardDel()
{		
	if(!f.board_sbjt.value)
	{
		MessageBox("NotSelectedGrid", "E", "");
		return;
	}
	
	if(!MessageBox("DelConfirm", "C", "등록된 댓글도 같이 삭제됩니다."))
		return;
	
	var tran = new Trans();
	tran.setSvc(DELETE_BOARDLIST_ID+","+DELETE_BOARDRPLY_ID);
	tran.open("f","f","/common.do");
}

/*****************/
//댓글 등록버튼
/*****************/
function replyAdd()
{
	setMode("RA");
}

/*****************/
//댓글 저장버튼
/*****************/
function replySave()
{	
	if(!f.rply_cont.value)
	{
		MessageBox("Required", "E", "내용");
		f.rply_cont.focus();
		return;
	}
	
	var msg;
	var queryID;
	
	if(g_ReplyFlag == "RA")
	{
		msg			= "SavConfirm";
		queryID		= INSERT_REPLYLIST_ID+","+RPLY_UP_BOARDLIST_ID;
	}
	else if(g_ReplyFlag == "RU")
	{
		msg = "ChgConfirm";
		queryID		= UPDATE_REPLYLIST_ID;
	}
	
	if(!MessageBox(msg, "C", ""))
		return;
		
	var tran = new Trans();
	tran.setSvc(queryID);
	tran.open("f","f","/common.do");
}

/*****************/
//댓글 삭제버튼
/*****************/
function replyDel()
{		
	if(!f.rply_cont.value)
	{
		MessageBox("NotSelectedGrid", "E", "");
		return;
	}
	
	if(!MessageBox("DelConfirm", "C", "선택된 댓글을 "))
		return;
	
	var tran = new Trans();
	tran.setSvc(DELETE_REPLYLIST_ID+","+RPLY_DOWN_BOARDLIST_ID);
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
			f.board_sbjt.disabled		= true;
			f.board_cont.disabled		= true;
			f.rply_cont.disabled		= true;
			
		break;
		
		case "BA":		//게시글 등록
		
			g_BoardFlag = sType;
			
			f.board_sbjt.disabled		= false;
			f.board_cont.disabled		= false;
			f.board_sbjt.value		= "";
			f.board_cont.value		= "";
			f.file_nm_1.value			= "";
			f.file_nm_2.value			= "";
			f.file_nm_3.value			= "";
			f.rg_nm.value					= "";
			f.rg_dtm.value				= "";
			f.mdf_nm.value				= "";
			f.mdf_dtm.value				= "";
			
			var file_path;

			file_path = document.frames("iUpload1").fUpload.file_path.value;
			document.frames("iUpload1").fUpload.reset();
			document.frames("iUpload1").fUpload.file_path.value = file_path;
			document.all("file_span_1").style.display = "none";
/*			
			file_path = document.frames("iUpload2").fUpload.file_path.value;
			document.frames("iUpload2").fUpload.reset();
			document.frames("iUpload2").fUpload.file_path.value = file_path;
			document.all("file_span_2").style.display = "none";
			
			file_path = document.frames("iUpload3").fUpload.file_path.value;
			document.frames("iUpload3").fUpload.reset();
			document.frames("iUpload3").fUpload.file_path.value = file_path;
			document.all("file_span_3").style.display = "none";
*/			
		break;
		
		case "BU":		//게시글 수정
		
			g_BoardFlag = sType;
			
			var file_path;

			file_path = document.frames("iUpload1").fUpload.file_path.value;
			document.frames("iUpload1").fUpload.reset();
			document.frames("iUpload1").fUpload.file_path.value = file_path;
/*			
			file_path = document.frames("iUpload2").fUpload.file_path.value;
			document.frames("iUpload2").fUpload.reset();
			document.frames("iUpload2").fUpload.file_path.value = file_path;
			
			file_path = document.frames("iUpload3").fUpload.file_path.value;
			document.frames("iUpload3").fUpload.reset();
			document.frames("iUpload3").fUpload.file_path.value = file_path;
*/			
		break;
		
		case "RA":		//댓글 등록
		
			g_ReplyFlag = sType;
			
			f.rply_cont.disabled	= false;
			f.rply_cont.value			= "";
			
		break;
		
		case "RU":		//댓글 수정
		
			g_ReplyFlag = sType;
			
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

/*****************/
//게시판 권한 체크
/*****************/
function setAuth()
{
	if(g_WriteFlag == "0")
	{
		document.all("btnBoardAdd").disabled = true;
		document.all("btnBoardSave").disabled = true;
		document.all("btnReplyAdd").disabled = true;
		document.all("btnReplySave").disabled = true;
	}
	else
	{
		document.all("btnBoardAdd").disabled = false;
		document.all("btnBoardSave").disabled = false;
		document.all("btnReplyAdd").disabled = false;
		document.all("btnReplySave").disabled = false;
	}
}
