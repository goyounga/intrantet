/**
 * PROJECT : Nexfron Intranet
 * NAME    : infQnA.js
 * DESC    : 프로젝트 Q&A
 * AUTHOR  : 박준규 과장
 * VERSION : 1.0
 * Copyright ⓒ 2012 Nexfron. All rights reserved.
 * ============================================================================================
 * 							변		경		사		항
 * ============================================================================================
 * VERSION	   DATE		  	AUTHOR		DESCRIPTION
 * ============================================================================================
 * 1.0		2012.02.28		박준규		개발
 */
var SELECT_ID			= "UCINF218S";		//질문 - 목록조회
var QUEST_INSERT_ID		= "UCINF123I";		//질문 - 등록
var QUEST_SEQ_SELECT_ID	= "UCINF123S";		//질문 - SEQ 조회
var QUEST_ALL_INSERT_ID = QUEST_INSERT_ID+","+QUEST_SEQ_SELECT_ID	//등록+SEQ조회
var QUEST_UPDATE_ID		= "UCINF123U";		//질문 - 수정
var QUEST_DELETE_ID		= "UCINF123D2";		//질문 - 삭제	DELETE->UCINF123D
var ANSWER_UPDATE_ID	= "UCINF124U";		//답변 - 답변등록 UPDATE
var REPLY_SELECT_ID		= "UCINF128S";		//댓글 조회
var REPLY_INSERT_ID		= "UCINF128I";		//댓글 저장
var REPLY_UPDATE_ID		= "UCINF128U";		//댓글 수정
var REPLY_DELETE_ID		= "UCINF128D";		//댓글 삭제
var RPLYCNT_UP_UPDATE_ID	= "UCINF129U";		//댓글수 증가
var RPLYCNT_DOWN_UPDATE_ID	= "UCINF130U";		//댓글수 감소
var QRY_CNT_UPDATE_ID 	= "UCINF221U";		//조회수 증가
var CONTENT_SELECT_ID 	= "UCINF221S";		//상세내용 조회
var DETAIL_SELECT_ID  	= QRY_CNT_UPDATE_ID+","+CONTENT_SELECT_ID+","+REPLY_SELECT_ID	//조회수증가+상세조회+댓글
var oGrid				= null;				//그리드객체
var gsCurrow			= -1;				//선택로우
var g_frm;									//선택된 폼 - 프로젝트 팝업용
var aQuestForm			= null;				//편집폼배열
/**
 * 초기화
 */
function init()
{
	fQuery.strt_dt.value = "2012-01-01";
	fQuery.end_dt.value  = "2999-12-31";

	oGrid = document.getElementById(SELECT_ID);
	oGrid.SetColCellFont("quest_title","돋움",9,"false","false","true","false");
	oGrid.SetColCellFgColor("quest_title","0|128|255");
	oGrid.SetColCellCursor("quest_title","hand");

	aQuestForm = new Array(fQuest.quest_title, fQuest.prj_nm, fQuest.quest_type, fQuest.quest_cntn);
	editor_generate("quest_cntn");
	editor_generate("answ_cntn");

	queryList();
}
/**
 * 조회 - 질문
 */
function queryList()
{
	if((trim(fQuery.strt_dt.value)=="" && trim(fQuery.end_dt.value)!="")
	|| (trim(fQuery.strt_dt.value)!="" && trim(fQuery.end_dt.value)==""))
	{
		MessageBox("", "I", "등록일자는 두 값을 모두 입력해야 합니다.");
		return;
	}
	setMode("INIT_QUEST");

	var trans = new Trans();
	trans.setPageRow(100);
	trans.setSvc(SELECT_ID);
	trans.setMyUserParams( fQuery.query_keyword.value, trim(fQuery.query_keyword_value.value));
	trans.setWiseGrid("1");
	trans.setForwardId("wgdsl","");
	trans.setCallBack("callbackQueryList");
	trans.open("fQuery","fList","/wisegrid.do");
}
/**
 * 조회 콜백
 * svcid : service id
 */
function callbackQueryList(svcid)
{
	if(DataSet.isError(svcid) == "true") return;
}
/**
 * 리스트 더블 클릭 시
 * id           : Grid ID
 * strColumnKey : 현재 선택된 컬럼명
 * nRow         : Row 번호
 */
function showDetailB_obj(id, strColumnKey, nRow)
{
	if(id == SELECT_ID)
	{
		if(strColumnKey!="quest_title")
		{
			gsCurrow = nRow;
			viewContent(nRow);
		}
	}
}
/**
 * 리스트 클릭 시
 * id           : Grid ID
 * strColumnKey : 현재 선택된 컬럼명
 * nRow         : Row 번호
 */
function showDetailO_obj(id, strColumnKey, nRow)
{
	if(id == SELECT_ID)
	{
		if(strColumnKey=="quest_title")
		{
			gsCurrow = nRow;
			viewContent(nRow);
		}
	}
}
/**
 * 상세보기
 */
function viewContent(nRow)
{
	var quest_mn_id = oGrid.GetCellValue("quest_mn_id", nRow);
	if(quest_mn_id != fQuest.userid.value)
	{
		oGrid.SetCellValue("qry_cnt", nRow, (parseInt( oGrid.GetCellValue("qry_cnt", nRow) ,10) + 1) );
	}
	var qna_seq = oGrid.GetCellValue("qna_seq", nRow);
	queryContent(qna_seq);	//내용조회
}
/**
 * 내용조회
 */
function queryContent(qna_seq)
{
	var tran = new Trans();
	tran.setSvc(DETAIL_SELECT_ID);
	tran.setPageRow(9999);
	tran.setMyUserParams("qna_seq"	, qna_seq );
	tran.setMyUserParams("userid"	, fQuest.userid.value);
//	tran.setMyUserParams("up_seq"	, f.board_seq.value);	//첨부파일용
//	tran.setMyUserParams("prg_id"	, "BOARD");				//첨부파일용
	tran.setCallBack("callbackQueryContent");
	tran.open("", "fQuest", "/common.do");
}
/**
 * 내용조회 콜백
 * svcid : service id
 */
function callbackQueryContent(svcid)
{
	if(DataSet.isError(svcid) == "true") return;

	if( parseInt(DataSet.getTotalCount(CONTENT_SELECT_ID),10)>0 )
	{
		document.getElementById("view_quest_cntn").innerHTML = DataSet.getParam(CONTENT_SELECT_ID, 1, 0, "quest_cntn");
		editor_setHTML("quest_cntn", fQuest.quest_cntn.value);
		document.getElementById("view_answ_cntn").innerHTML = DataSet.getParam(CONTENT_SELECT_ID, 1, 0, "answ_cntn");
		editor_setHTML("answ_cntn", fQuest.answ_cntn.value);
	//	showUploadFileList();
		showReplyList();
		setMode("VIEW_QUEST");
	}
}
/**
 * 등록 - 질문
 */
function addQuest()
{
	setMode("ADD_QUEST");
}
/**
 * 수정 - 질문
 */
function updateQuest()
{
	//if(checkAuth("U") == false) return;
	setMode("UPDATE_QUEST");
}
/**
 * 취소 - 질문
 */
function cancelQuest()
{
	if( gsXaFlag == "UPDATE_QUEST" )
	{
		queryContent(fQuest.qna_seq.value);
	}else{
		queryList();
	}
}
/**
 * 저장 - 질문
 */
function saveQuest()
{
	if( fQuest.quest_cntn.value =="<P>&nbsp;</P>" ){ fQuest.quest_cntn.value = "";}	//에디터에서는 전부 지워지지 않는다.
	if(getValidation(fQuest, true) == false) return;
	if(MessageBox("SavConfirm", "C", "") == false) return;

	var tran = new Trans();
	tran.setSvc((gsXaFlag=="ADD_QUEST")?QUEST_ALL_INSERT_ID:QUEST_UPDATE_ID);
	tran.setCallBack("callbackSaveQuest");
	tran.open("fQuest", "fQuest", "/common.do");
}
/**
 * 저장 - 질문 콜백
 * svcid : service id
 */
function callbackSaveQuest(svcid)
{
	if(DataSet.isError(svcid) == "true") return;

	if(gsXaFlag == "ADD_QUEST")	//등록
	{
		if(parseInt(DataSet.getParam(QUEST_INSERT_ID, 1, 0, "SUCCESS_COUNT"),10) > 0)
		{
			var qna_seq	= DataSet.getParam(QUEST_SEQ_SELECT_ID, 1, 0, "qna_seq");
			queryContent(qna_seq);
		}
	}
	else //if(gsXaFlag == "UPDATE_QUEST")	//수정
	{
		if(parseInt(DataSet.getParam(QUEST_UPDATE_ID, 1, 0, "SUCCESS_COUNT"),10) > 0)
		{
			var qna_seq	= fQuest.qna_seq.value;
			queryContent(qna_seq);
		}
	}
}
/**
 * 삭제 - 질문
 */
function deleteQuest()
{
//	if(checkAuth("D") == false) return false;
	if(MessageBox("DelConfirm", "C", "") == false) return;

	var tran = new Trans();
	tran.setSvc(QUEST_DELETE_ID);
	tran.setMyUserParams("qna_seq"	, fQuest.qna_seq.value);
	tran.setMyUserParams("userid"	, fQuest.userid.value);
	tran.setCallBack("callbackDeleteQuest");
	tran.open("", "", "/common.do");
}
/**
 * 삭제 - 질문 콜백
 * svcid : service id
 */
function callbackDeleteQuest(svcid)
{
	if(DataSet.isError(svcid) == "true") return;

	if(parseInt(DataSet.getParam(QUEST_DELETE_ID, 1, 0, "SUCCESS_COUNT"),10) > 0)
	{
		queryList();
	}
}
/**
 * 목록
 */
function viewList()
{
	queryList();
}
/**
 * 답변
 */
function updateAnswer()
{
	setMode("UPDATE_ANSWER");
}
/**
 * 취소 - 답변
 */
function cancelAnswer()
{
	if( gsXaFlag == "UPDATE_ANSWER" )
	{
		queryContent(fQuest.qna_seq.value);
	}
}
/**
 * 저장 - 답변
 */
function saveAnswer(arg)
{
	if( fQuest.answ_cntn.value =="<P>&nbsp;</P>" ){ fQuest.answ_cntn.value = "";}	//에디터에서는 전부 지워지지 않는다.
	if( trim(fQuest.answ_cntn.value)=="" )
	{
		MessageBox("Required", "I", "답변내용");
		setFocus(fQuest.answ_cntn);
		return false;
	}
	if(MessageBox("SavConfirm", "C", "") == false) return;

	var tran = new Trans();
	tran.setSvc(ANSWER_UPDATE_ID);
	tran.setMyUserParams( "proc_stat", (arg=="CMPT"?"03":"02"));	//02:처리중, 03:완료
	tran.setCallBack("callbackSaveAnswer");
	tran.open("fQuest", "fQuest", "/common.do");
}
/**
 * 저장 - 답변 콜백
 * svcid : service id
 */
function callbackSaveAnswer(svcid)
{
	if(DataSet.isError(svcid) == "true") return;

	if(parseInt(DataSet.getParam(ANSWER_UPDATE_ID, 1, 0, "SUCCESS_COUNT"),10) > 0)
	{
		var qna_seq	= fQuest.qna_seq.value;
		queryContent(qna_seq);
	}
}
/**
 * 권한체크
 */
function checkAuth(mode)
{
	var val = false;

	if(mode == "UPDATE_QUEST")
	{
		if(fQuest.userid.value == fQuest.quest_mn_id.value)
		{
			val = true;
		}
	}
	if(mode == "UPDATE_ANSWER")
	{
		if(fQuest.usergradecd.value=="05")	//시스템관리자
		{
			val = true;
		}
	}

	return val;
}
/**
 * 모드에 따르는 버튼 형태
 * sType : I:초기화, A:등록, U;수정, X:블로킹
 */
function setMode(sType)
{
	gsXaFlag 	= sType;	//화면모드

	switch (sType)
	{
		case "INIT_QUEST"	:	//button
								document.getElementById("trBtnList"			).style.display = "block";
								document.getElementById("trBtnView"			).style.display = "none";
								document.getElementById("trBtnQuestEdit"	).style.display = "none";
								document.getElementById("trBtnAnswerEdit"	).style.display = "none";
								//screen
								document.getElementById("trList"		).style.display = "block";
								document.getElementById("trDetail"		).style.display = "none";
								//obj - value
								//clear(fQuest);				//form
								//fQuest.prj_seq.value = "";	//hidden
								//document.getElementById("view_quest_cntn").innerHTML = "";	//etc - div
								//editor_setHTML("quest_cntn", "");
								//document.getElementById("divUploadFile"  ).innerHTML = "";
								//document.getElementById("board_file").innerHTML = "";
								gsCurrow = -1;
								break;

		case "ADD_QUEST"	:	//button
								document.getElementById("trBtnList"			).style.display = "none";
								document.getElementById("trBtnView"			).style.display = "none";
								document.getElementById("trBtnQuestEdit"	).style.display = "block";
								document.getElementById("trBtnAnswerEdit"	).style.display = "none";
								//screen
								document.getElementById("trList"		).style.display = "none";
								document.getElementById("trDetail"		).style.display = "block";
								//screen - trDetail - Quest
								document.getElementById("tdViewQuest"	).style.display = "none";
								document.getElementById("tdEditQuest"	).style.display = "block";
								//screen - trDetail - Answer
//								document.getElementById("trAnswer"		).style.display = "none";
//								document.getElementById("tdViewAnswer"	).style.display = "none";
								document.getElementById("tdViewAnswer"	).style.display = "block";
								document.getElementById("tdEditAnswer"	).style.display = "none";
								//obj - value
								clear(fQuest);												//form
								fQuest.prj_seq.value = "";									//hidden
								document.getElementById("view_quest_cntn").innerHTML = "";	//etc - div
								editor_setHTML("quest_cntn", "");
								document.getElementById("view_answ_cntn").innerHTML = "";
								editor_setHTML("answ_cntn", "");
								//document.getElementById("divUploadFile"  ).innerHTML = "";
								//obj - disable
								setDisabledObj(aQuestForm, false);
								fQuest.prj_nm.readOnly = true;

								document.getElementById("qna_reply").style.display = "none";

								break;

		case "VIEW_QUEST"	:	//button
								document.getElementById("trBtnList"			).style.display = "none";
								document.getElementById("trBtnView"			).style.display = "block";
								document.getElementById("trBtnQuestEdit"	).style.display = "none";
								document.getElementById("trBtnAnswerEdit"	).style.display = "none";

								//질문수정가능여부
								var q_udt_yn = ((checkAuth("UPDATE_QUEST"))==true ? "block" : "none");
								document.getElementsByName("tdQstUpdate")[0].style.display = q_udt_yn;
								document.getElementsByName("tdQstUpdate")[1].style.display = q_udt_yn;

								//답변가능여부
								var a_udt_yn = ((checkAuth("UPDATE_ANSWER"))==true ? "block" : "none");
								document.getElementsByName("tdAnsUpdate")[0].style.display = a_udt_yn;

								//screen
								document.getElementById("trList"		).style.display = "none";
								document.getElementById("trDetail"		).style.display = "block";
								//screen - trDetail - Quest
								document.getElementById("tdViewQuest"	).style.display = "block";
								document.getElementById("tdEditQuest"	).style.display = "none";
								//screen - trDetail - Answer
								//document.getElementById("trAnswer"	).style.display = "block";
								document.getElementById("tdViewAnswer"	).style.display = "block";
								document.getElementById("tdEditAnswer"	).style.display = "none";
								//obj - disable
								setDisabledObj(aQuestForm, true);
								document.getElementById("view_quest_cntn").scrollTop = 0;
								document.getElementById("divViewAnswer").scrollTop = 0;
								document.getElementById("qna_reply").style.display = "block";
								break;

		case "UPDATE_QUEST"	:	//button
								document.getElementById("trBtnList"			).style.display = "none";
								document.getElementById("trBtnView"			).style.display = "none";
								document.getElementById("trBtnQuestEdit"	).style.display = "block";
								document.getElementById("trBtnAnswerEdit"	).style.display = "none";
								//screen
								document.getElementById("trList"		).style.display = "none";
								document.getElementById("trDetail"		).style.display = "block";
								//screen - trDetail - Quest
								document.getElementById("tdViewQuest"	).style.display = "none";
								document.getElementById("tdEditQuest"	).style.display = "block";
								//screen - trDetail - Answer
//								document.getElementById("trAnswer"		).style.display	= "block";
								document.getElementById("tdViewAnswer"	).style.display = "block";
								document.getElementById("tdEditAnswer"	).style.display = "none";
								//obj - disable
								setDisabledObj(aQuestForm, false);
								fQuest.prj_nm.readOnly = true;
								editor_scrollTop("quest_cntn", 0);

								//textarea 버그로 존재한는 문자열이 일부만 보이고 엔터를 쳤을때 전체가 나타나는 현상이 있다
								//이문제를 해결하기 위해 한번더 dataset에서 textarea에 값을 셋팅해주는 식으로 한다.
								//fQuest.quest_cntn.value = DataSet.getParam(CONTENT_SELECT_ID, 1, 0, "quest_cntn");
								break;

		case "UPDATE_ANSWER" :	//button
								document.getElementById("trBtnList"			).style.display = "none";
								document.getElementById("trBtnView"			).style.display = "none";
								document.getElementById("trBtnQuestEdit"	).style.display = "none";
								document.getElementById("trBtnAnswerEdit"	).style.display = "block";
								//screen
								document.getElementById("trList"		).style.display = "none";
								document.getElementById("trDetail"		).style.display = "block";
								//screen - trDetail - Quest
								document.getElementById("trQuest"		).style.display	= "block";
								document.getElementById("tdViewQuest"	).style.display = "block";
								document.getElementById("tdEditQuest"	).style.display = "none";
								//screen - trDetail - Answer
//								document.getElementById("trAnswer"		).style.display	= "block";
								document.getElementById("tdViewAnswer"	).style.display = "none";
								document.getElementById("tdEditAnswer"	).style.display = "block";

								editor_scrollTop("answ_cntn", 0);
								break;
	}
}
/**
 * 프로젝트 선택 팝업
 */
function openProject(frm)
{
	g_frm = frm;
	if(typeof(openPopup) == "object"){openPopup.close();}
	openPopup("/jsp/project/prjExePOP.jsp", "", "popup", "0", "300", "800", "565", "toolbar=no,scrollbars=no");
}
/**
 * 프로젝트 셋팅
 */
function setProject(prj_seq, prj_nm)
{
	g_frm.prj_seq.value = prj_seq;
	g_frm.prj_nm.value  = prj_nm;
}
/**
 * 프로젝트 삭제
 */
function del_Project(frm)
{
	frm.prj_seq.value = "";
	frm.prj_nm.value  = "";
}
/* ** 댓글 S *********************************************************************** */
/**
 * 댓글 등록
 */
function replyInsert()
{
	if(!fQuest.rply_cntn.value)
	{
		MessageBox("Required", "E", "내용");
		fQuest.rply_cntn.focus();
		return;
	}

	if(!MessageBox("SavConfirm", "C", "")) return;

	var tran = new Trans();
	tran.setSvc(REPLY_INSERT_ID+","+RPLYCNT_UP_UPDATE_ID);
	tran.setMyUserParams("qna_seq"	, fQuest.qna_seq.value);
	tran.setMyUserParams("userid"	, fQuest.userid.value);
	tran.setMyUserParams("rply_cntn", fQuest.rply_cntn.value);
	tran.setCallBack("callbackReplyInsert");
	tran.open("","","/common.do");
}
/**
 * 댓글 등록 콜백
 * svcid : service id
 */
function callbackReplyInsert(svcid)
{
	if(DataSet.isError(svcid) == "true") return;
	queryReplyList();
}
/**
 * 댓글 조회
 */
function queryReplyList()
{
	var tran = new Trans();
	tran.setSvc(REPLY_SELECT_ID);
	tran.setPageRow(9999);
	tran.setMyUserParams("qna_seq", fQuest.qna_seq.value);
	tran.setCallBack("callbackQueryReplyList");
	tran.open("", "", "/common.do");
}
/**
 * 댓글 조회 콜백
 * svcid : service id
 */
function callbackQueryReplyList(svcid)
{
	if(DataSet.isError(svcid) == "true") return;
	showReplyList();
}
/**
 * 댓글 리스트 출력
 */
function showReplyList()
{
	var table	= document.getElementById("tblReplyList");
	for( var j=table.rows.length-1; j>=0; j-- ) {table.deleteRow(j);}
	fQuest.rply_cntn.value = "";

	var sbHTML = new StringBuffer();

	var cnt = parseInt(DataSet.getTotalCount(REPLY_SELECT_ID),10);
	for (var i = 0; i < cnt; i++)
	{
		var qna_seq 	= DataSet.getParam(REPLY_SELECT_ID, 1, i, "qna_seq" 	);
		var rply_seq 	= DataSet.getParam(REPLY_SELECT_ID, 1, i, "rply_seq"    );
		var rply_cntn 	= DataSet.getParam(REPLY_SELECT_ID, 1, i, "rply_cntn"   );
		var reg_user_nm = DataSet.getParam(REPLY_SELECT_ID, 1, i, "reg_user_nm"	);
		var rply_chg_dt = DataSet.getParam(REPLY_SELECT_ID, 1, i, "rply_chg_dt"	);
		var reg_user_id	= DataSet.getParam(REPLY_SELECT_ID, 1, i, "reg_user_id"	);
		var tr_id 		= "tr_rply_seq_"+rply_seq;	//댓글 TR
		var td_id 		= "td_rply_seq_"+rply_seq;	//댓글 TD

		sbHTML.clear();
		sbHTML.append("&nbsp;&nbsp;<font color='#888888'>");
		sbHTML.append("("+rply_chg_dt+")");
	//	sbHTML.append("&nbsp;&nbsp;<A href='javascript:replyAdd("+tr_id+")' style='color:#808000'>댓글</A>");
		if(reg_user_id==fQuest.userid.value)
		{
			sbHTML.append(" | <A href='javascript:replyChange("+td_id+","+rply_seq+")' style='color:#808000'>수정</A>");
			sbHTML.append(" | <A href='javascript:replyDel("+rply_seq+")' style='color:#808000'>삭제</A>");
		}
		sbHTML.append("</font>");

		var nTr	= table.insertRow();
		nTr.id	= tr_id;
		makeColumn( nTr, reg_user_nm , "center"	, ""				, ""			, "block");	//이름
		makeColumn( nTr, rply_cntn	 , "left"	, sbHTML.toString()	, td_id			, "block");	//내용 VIEW
		makeColumn( nTr, ""			 , "right"	, ""				, td_id+"_edit"	, "none");	//내용 편집

		nTr = table.insertRow();
		makeLine( nTr, 2 );
	}

	var divViewAnswer = document.getElementById("divViewAnswer");
	divViewAnswer.scrollTop = divViewAnswer.scrollHeight;
}
/**
 * 테이블에 TD 생성
 * objTr : 생성할 TR
 * val   : TD의 Text
 * align : TD의 정렬
 * val   : TD의 Text의 일자,수정,삭제
 * sId   : TD의 ID
 * dis   : TD의 display
 */
function makeColumn( objTr, val, align, dtm, sId, dis)
{
	var newCell				= objTr.insertCell();
	newCell.id 				= sId;
	newCell.innerText 		= val;
	newCell.innerHTML 		= newCell.innerHTML+dtm;
	newCell.style.textAlign	= align;
	newCell.style.padding	= "0 0 0 0";
	newCell.style.display	= dis;
	return newCell;
}
/**
 * 테이블에 TD 생성 - 라인생성
 * objTr : 생성할 TR
 * nCol  : colspan 개수
 */
function makeLine( nTr, nCol)
{
	var newCell				= nTr.insertCell();
	newCell.colSpan 		= nCol;
	newCell.style.textAlign	= "center";
	newCell.innerHTML 		= "<label style='width:96%;background: url("+scriptPath+"/images/common/dotline.gif) repeat-x left;'></label>";
}
/**
 * 댓글 삭제
 */
function replyDel(rply_seq)
{
	if(!MessageBox("DelConfirm", "C", "")) return;

	var tran = new Trans();
	tran.setSvc(REPLY_DELETE_ID+","+RPLYCNT_DOWN_UPDATE_ID);
	tran.setMyUserParams("qna_seq"	, fQuest.qna_seq.value);
	tran.setMyUserParams("userid"	, fQuest.userid.value);
	tran.setMyUserParams("rply_seq"	, rply_seq);
	tran.setCallBack("callbackReplyDel");
	tran.open("","","/common.do");
}
/**
 * 댓글 삭제 콜백
 * svcid : service id
 */
function callbackReplyDel(svcid)
{
	if(DataSet.isError(svcid) == "true") return;
	queryReplyList();
}
/**
 * 댓글 수정
 */
function replyChange(td_id, rply_seq)
{
	var strVal 		= td_id.innerText;
	var idx 		= strVal.lastIndexOf("(");
	var sbHTML 		= new StringBuffer();
	var rply_cntn_id= "rply_cntn"+rply_seq;	//댓글 textarea

	sbHTML.append("<textarea name='"+rply_cntn_id+"' class='input_textarea_text' required='false' requirednm='내용' style='width:100%;height:80'>"+strVal.substring(0,idx-2)+"</textarea>");
	sbHTML.append("<br>");
	sbHTML.append(getButton(td_id, rply_seq, rply_cntn_id));

	var td_edit = td_id.id + "_edit";
	document.getElementById(td_edit).innerHTML = sbHTML.toString();
	document.getElementById(td_edit).style.display = "block";
	document.getElementById(td_edit).style.padding = "0 10 0 0";
	td_id.style.display = "none";
}
/**
 * 댓글 수정버튼, 취소버튼
 */
function getButton(td_id, rply_seq, rply_cntn_id)
{
	var sbHTML = new StringBuffer();
	sbHTML.append("<table border='0' cellpadding='0' cellspacing='0' width='100%' ><tr><td style='padding:5 0 0 0;text-align:right'>");
	sbHTML.append("<button class='img_button' style='width:50' value='저장' onclick=replyUpdate("+rply_seq+",'"+rply_cntn_id+"') >");
	sbHTML.append("<table class='tblButton' width='100%' >");
	sbHTML.append("<tr>");
	sbHTML.append("<td id='btnReplyReg_TdL' class='btnLG'></td>");
	sbHTML.append("<td id='btnReplyReg_TdM' class='btnMG' style='background-position-x:70%'>저장</td>");
	sbHTML.append("<td id='btnReplyReg_TdR' class='btnRG'></td>");
	sbHTML.append("</tr>");
	sbHTML.append("</table>");
	sbHTML.append("</button>&nbsp;");
	sbHTML.append("<button class='img_button' style='width:50' value='취소' onclick=replyCancel('"+td_id.id+"') >");
	sbHTML.append("<table class='tblButton' width='100%'>");
	sbHTML.append("<tr>");
	sbHTML.append("<td id='btnReplyReg_TdL' class='btnLG'></td>");
	sbHTML.append("<td id='btnReplyReg_TdM' class='btnMG' style='background-position-x:70%'>취소</td>");
	sbHTML.append("<td id='btnReplyReg_TdR' class='btnRG'></td>");
	sbHTML.append("</tr>");
	sbHTML.append("</table>");
	sbHTML.append("</button>");
	sbHTML.append("</td></tr></table>");
	return sbHTML.toString();
}
/**
 * 댓글 수정 취소
 */
function replyCancel(td_id)
{
	document.getElementById(td_id).style.display = "block";
	document.getElementById(td_id+"_edit").style.display = "none";
}
/**
 * 댓글 수정
 */
function replyUpdate(rply_seq, rply_cntn_id)
{
	var frm_rply_cntn = document.getElementById(rply_cntn_id);
	if(!trim(frm_rply_cntn.value))
	{
		MessageBox("Required", "E", "내용");
		frm_rply_cntn.focus();
		return;
	}
	if(!MessageBox("ChgConfirm", "C", "")) return;

	var tran = new Trans();
	tran.setSvc(REPLY_UPDATE_ID);
	tran.setMyUserParams("rply_seq"		, rply_seq);
	tran.setMyUserParams("userid"		, fQuest.userid.value);
	tran.setMyUserParams("rply_cntn"	, frm_rply_cntn.value);
	tran.setCallBack("callbackReplyUpdate");
	tran.open("","","/common.do");
}
/**
 * 댓글 수정 콜백
 * svcid : service id
 */
function callbackReplyUpdate(svcid)
{
	if(DataSet.isError(svcid) == "true") return;
	queryReplyList();
}
/* ** 댓글 E *********************************************************************** */