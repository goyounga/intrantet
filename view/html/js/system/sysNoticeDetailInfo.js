/**
 * PROJ : Nexfron Intranet
 * NAME : sysNoticeDetailInfo.js
 * DESC : 공지사항 상세내용  자바스크립트
 * Author : 김은수 과장
 * VER  : 1.0
 * Copyright 2009 Nexfron All rights reserved
 * ============================================================================================
 * 								변		경		사		항
 * ============================================================================================
 * VERSION		DATE		AUTHOR		DESCRIPTION
 * ============================================================================================
 * 1.0		2009.08.13		김은수		주석추가
 */

/*
	1. 각 사용자에게 할당된 부서정보가 부서테이블에 없을 경우 출력되지 않도록 하였음.
	   그렇기 때문에 사용자 정보가 테이블에 있는데도 조회되지 않을 수 있음.
	2. 상위 부서를 선택하면 하위 부서들에 속한 사용자만 출력됨.
	   또한 사용여부가 사용인 부서의 사용자만 조회됨.
	3. 사용자 정보를 받을때는 opener의 이름이 메인인 경우와 메인이 아닌경우로 나뉘어
	   해당 opener로 getOrgUserInfo(user_id, user_name, user_dept) 함수를 이용하여 정보를 넘겨줌.
*/

var SELECT_NOTICE_ID = "UCSYS110_1S";
var UPDATE_NOTICE_ID = "UCSYS110U";

var FILE_SELECT_ID = "UCCOM030S";

var SELECT_BOARD_ID = "UCSYS113_1S";
var UPDATE_BOARD_ID = "UCSYS113U";

var SELECT_UPG_ID   = "UCSYS099_1S";
//Upload File
var UPLOAD_PATH 		= "UPLOAD_PATH";
var UPLOAD_FOLDER_NAME 	= "notice";

var UPLOAD_BOARD_PATH 		= "UPLOAD_PATH";
var UPLOAD_BOARD_FOLDER_NAME 	= "board";
//var grid1 = new comGrid(); //공지사항

var SELECT_REPLYLIST_ID		= "UCINF215S";		//게시판댓글 조회
var INSERT_REPLYLIST_ID		= "UCINF215I";		//게시판댓글 저장
var RPLY_UP_BOARDLIST_ID	= "UCINF116U";		//게시글 댓글수 +1
var RPLY_DOWN_BOARDLIST_ID	= "UCINF117U";		//게시글 댓글수 -1
var DELETE_REPLYLIST_ID		= "UCINF215D";		//게시판댓글 삭제

var g_Obj = "";
//***********************************
// ONLOAD
//***********************************
function init()
{
	query();
	g_Obj = document.all(SELECT_REPLYLIST_ID);
	//g_Obj.strScrollBars = 'automatic';
    g_Obj.bStatusbarVisible = false;
    g_Obj.SetColCellMultiLine("rply_cont", true);
    g_Obj.strRowSizing = "autofree";
    g_Obj.nCellPadding = 2;

	g_Obj.strScrollBars = "vertical";
    g_Obj.strHDClickAction 	= "select";

}

//***********************************
// 조회
//***********************************
function query()
{
	if(fQuery.gubun.value =="notice")
	{
		divFile.style.display = "";
		divComment.style.display = "none";
		divExps.style.display = "none";
		serviceId = SELECT_NOTICE_ID;
		fQuery.prg_id.value = "NOTICE";
		UPLOAD_FOLDER_NAME 	= "notice";

	}else if(fQuery.gubun.value =="board")
	{
		divFile.style.display = "";
		divComment.style.display = "";
		divExps.style.display = "none";
		serviceId = SELECT_BOARD_ID;
		fQuery.prg_id.value = "BOARD";
		UPLOAD_FOLDER_NAME 	= "board";
	}else if(fQuery.gubun.value =="upg")
	{
		divFile.style.display = "none";
		divComment.style.display = "none";
		divExps.style.display = "";
		serviceId = SELECT_UPG_ID;
	}

	var tran = new Trans();
	tran.setSvc(serviceId);
	tran.open("fQuery","fQuery","/common.do");


}

//***********************************
// 목록버튼
//***********************************
function openNotice()
{
	if(fQuery.gubun.value =="notice")
	{
		location.href="/jsp/system/sysNoticeInfo.jsp";

	}else if(fQuery.gubun.value =="board")
	{
		location.href="/jsp/system/sysTeamNoticeInfo.jsp";
	}
}

//***********************************
// 닫기버튼
//***********************************
function popupClose()
{
	window.close();
}

//글내용에서 첨부 파일 클릭시
function openFile(){
	location.href("/jsp/common/downFile.jsp?filename="+fQuery.atch_file_nm.value);
}

//***********************************
// CALLBACK
//***********************************
function callback(sServiceID)
{
	switch (sServiceID)
	{
		case SELECT_NOTICE_ID:

			showDetail(SELECT_NOTICE_ID, 0, fQuery);

			board_cont.innerText = DataSet.getParam(SELECT_NOTICE_ID, 1, 0, "notice_cont") ;

			seqCNT();

			queryUploadFile();

			break;

		case SELECT_BOARD_ID:

			showDetail(SELECT_BOARD_ID, 0, fQuery);

			board_cont.innerHTML = DataSet.getParam(SELECT_BOARD_ID, 1, 0, "notice_cont");

			seqCNT();

			queryUploadFile();

			break;

		case SELECT_UPG_ID:

			showDetail(SELECT_UPG_ID, 0, fQuery);
			break;


		case FILE_SELECT_ID :

			showUploadFileList();

			queryComment();

			break;

		default :
			break;
	}
}



function seqCNT()
{
	if(fQuery.gubun.value =="notice")
	{
		serviceId = UPDATE_NOTICE_ID;

	}else if(fQuery.gubun.value =="board")
	{
		serviceId = UPDATE_BOARD_ID;
	}

	var tran = new Trans();
	tran.setSvc(serviceId);
	tran.setAsync(false);
	tran.open("fQuery","fQuery","/common.do");

}


/**
 * 업로드 파일 조회
 */
function queryUploadFile()
{
	var tran = new Trans();
	tran.setSvc(FILE_SELECT_ID);
	tran.setPageRow(9999);
	tran.setAsync(false);
	tran.open("fQuery", "fQuery", "/common.do");
}

/**
 * 첨부파일 리스트 출력
 */
function showUploadFileList()
{
	var cnt = DataSet.getTotalCount(FILE_SELECT_ID);

	var uploadFileHTML = new StringBuffer();

	uploadFileHTML.append("<table border=0 width=100%>");

	//var arrSeq = new Array();	//파일 변경이력 저장용

	for (var i = 0; i < cnt; i++)
	{
		var seq		= DataSet.getParam(FILE_SELECT_ID, 1, i, "file_seq");
		var filename = trim(DataSet.getParam(FILE_SELECT_ID, 1, i, "file_nm"));
		var newfilename = trim(DataSet.getParam(FILE_SELECT_ID, 1, i, "new_file_nm"));

		var arrfilename = filename.split(".");

		//arrSeq.push(seq);

		uploadFileHTML.append("<tr>");
		uploadFileHTML.append("<td>");
		var args = "";

		if(fQuery.gubun.value =="board")
		{
			args = "filename=" + escape(encodeURIComponent(filename)) + "&newfilename=" + escape(encodeURIComponent(newfilename)) + "&delete=NO&foldername=" + UPLOAD_BOARD_FOLDER_NAME + "&filepath=" + UPLOAD_BOARD_PATH;
		}
		else
		{
			args = "filename=" + escape(encodeURIComponent(filename)) + "&newfilename=" + escape(encodeURIComponent(newfilename)) + "&delete=NO&foldername=" + UPLOAD_FOLDER_NAME + "&filepath=" + UPLOAD_PATH;
		}

		if(arrfilename.length > 1 && (trim(arrfilename[arrfilename.length - 1]).toUpperCase() == "HTML" || trim(arrfilename[arrfilename.length - 1]).toUpperCase() == "HTM"))
		{

			uploadFileHTML.append("<a target='iLog' href=\"\" onclick=\"javascript:openPopup('/jsp/common/downFile.jsp', '" + args + "' , 'down', '', '', '1000', '600', 'scrollbars=yes');\">" + filename + "</a>&nbsp;");
		}
		else
		{
			uploadFileHTML.append("<a target='iLog' href=\"/jsp/common/downFile.jsp?" + args + "\">" + filename + "</a>&nbsp;");

		}

		//uploadFileHTML.append("<label onClick=\"delUploadFile_DB("+seq+", '" + newfilename + "')\" style=\"cursor:hand\">");
		//uploadFileHTML.append("<font color=red>X</font></label>");

		uploadFileHTML.append("</td>");
		uploadFileHTML.append("</tr>");
	}

	//f.arr_uploadfileseq.value = makeParamArray(arrSeq);

	uploadFileHTML.append("</table>");

	document.getElementById("divUploadFile").innerHTML = uploadFileHTML.toString();
}

function queryComment()
{
	if(fQuery.gubun.value =="board")
	{
		var trans = new Trans();
		trans.setPageRow(999);
		trans.setSvc(SELECT_REPLYLIST_ID);
		trans.setUserParams("board_seq=" + fQuery.notice_seq.value);
		trans.setWiseGrid("1");
		trans.setForwardId("wgdsl","");
		trans.setCallBack("callbackQueryComment");
		trans.open("fQuery","fQuery","/wisegrid.do");
	}
}


/**
 * 댓글 조회 후 콜백
 * sSvcId  : 서비스ID
 */
function callbackQueryComment(sSvcId)
{
	for(var i=0; i<g_Obj.GetRowCount(); i++)
	{
		if( g_Obj.GetCellValue("rg_id", i) != fQuery.userid.value )
		{
			g_Obj.SetCellImage("del", i, -1);
		}
	}
}
/**
 * 마우스가 cell위로 올라갔을때 호출
 * obj : 그리드 객체명
 * strType : cell header row
 * strColumnKey : 컬럼명
 * nRow : row index
 */
function MouseOver(obj, strType, strColumnKey, nRow)
{
	if( strType == "cell" && strColumnKey=="del"  )
	{
		if( g_Obj.GetCellValue("rg_id", nRow) != fQuery.userid.value )
		{
			g_Obj.SetCellCursor('del', nRow ,"arrow");
		}
	}
}
/**
 * 댓글 저장
 */
function replySave()
{
	if(!f.rply_cont.value)
	{
		//MessageBox("Required", "E", "내용");
		MessageBox("", "I", "내용을 입력해 주세요.");
		f.rply_cont.focus();
		return;
	}

	if(!MessageBox("SavConfirm", "C", "댓글을")){return;}
	var sParam = "board_seq=" + fQuery.up_seq.value;
	sParam    += "&userid="   + fQuery.userid.value;

	var tran = new Trans();
	tran.setSvc( INSERT_REPLYLIST_ID + "," + RPLY_UP_BOARDLIST_ID );
	tran.setUserParams(sParam);
	tran.setCallBack("callbackReplySave");
	setButton(f.btnRplySave,true);
	tran.open("f","f","/common.do");
}
/**
 * 저장후콜백
 * sSvcId  : 서비스ID
 */
function callbackReplySave(sSvcId)
{
	if (DataSet.isError(INSERT_REPLYLIST_ID) == "true") {return;}
	else
	{
		f.rply_cont.value = "";
		setButton(f.btnRplySave,false);
		queryComment();
	}
}
/**
 * 목록클릭
 * id           : 클릭한 그리드객체ID
 * strColumnKey : 클릭한 컬럼명
 * nRow         : 클릭한Row Index
 */
function showDetailO_obj(id, strColumnKey, nRow)
{
	if( (id==SELECT_REPLYLIST_ID) && (strColumnKey=="del") )
	{
		if( fQuery.userid.value == g_Obj.GetCellValue("rg_id", nRow) )
		{
			replyDel(nRow);
		}
	}
}
/**
 * 댓글 삭제
 */
function replyDel(nRow)
{
	if(!MessageBox("DelConfirm", "C", "댓글을 ")) {return;}
	var tran = new Trans();
	tran.setSvc(DELETE_REPLYLIST_ID+","+RPLY_DOWN_BOARDLIST_ID);

	var sParam = "board_seq=" + fQuery.up_seq.value;
	sParam    += "&userid="   + fQuery.userid.value;
	sParam    += "&rply_seq=" + g_Obj.GetCellValue("rply_seq", nRow);
	tran.setUserParams(sParam);
	tran.setCallBack("callbackReplyDel");
	setButton(f.btnRplySave,true);
	tran.open("","","/common.do");
}
/**
 * 삭제 후 콜백
 * sSvcId  : 서비스ID
 */
function callbackReplyDel(sSvcId)
{
	if (DataSet.isError(DELETE_REPLYLIST_ID) == "true") {return;}
	else
	{
		setButton(f.btnRplySave,false);
		queryComment();
	}
}