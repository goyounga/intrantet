/**
 * PROJECT : INTRANET
 * NAME    : infNoticeHomePage.js
 * DESC    : 홈페이지공지 관리
 * AUTHOR  : 박준규 과장
 * VERSION : 1.0
 * Copyright ⓒ 2010 Nexfron. All rights reserved.
 * ============================================================================================
 * 							변		경		사		항
 * ============================================================================================
 * VERSION	   DATE		  	AUTHOR		DESCRIPTION
 * ============================================================================================
 * 1.0		2011.10.20		박준규		개발
 */

var SELECT_BOARD_ID		= "UCINF210S";		//게시판리스트 조회
var SELECT_ID 			= "UCINF126S";		//조회
var INSERT_ID 			= "UCINF126I";		//등록
var SEQ_SELECT_ID		= "UCINF127S";		//SEQ조회
var UPDATE_ID 			= "UCINF126U";		//수정
var DELETE_ID 			= "UCINF126D";		//삭제
var CHG_UPDATE_ID       = "UCINF126U_2"		//조회횟수업데이트
var CONTENT_SELECT_ID	= "UCINF126S_2";	//공지내용조회
var FILE_INSERT_ID 		= "UCINF132I";		//업로드 파일 DB INSERT
var FILE_INSERT_ID2		= "UCCOM030I";		//업로드 파일 DB INSERT2 - param용
var FILE_REMOVE_ID 		= "UCPRJ126R";		//파일 삭제 svcID
var FILE_DELETE_ID 		= "UCCOM030D";		//파일 삭제
var FILE_SELECT_ID 		= "UCCOM030S";		//파일 조회
var OTHERS_SELECT_ID 	= CHG_UPDATE_ID +","+ CONTENT_SELECT_ID +","+ FILE_SELECT_ID;	//조회횟수업데이트+공지내용조회

var UPLOAD_PATH 		= "UPLOAD_PATH";
var UPLOAD_FOLDER_NAME 	= "homepage";
var bFileDelMode 		= false;	//파일삭제여부

var SELECT_BOARDAUTH_ID	= "UCINF118S";		//게시판 세부권한 조회
var gbUseYn				= false;			//사용권한
var gbReadAuth			= false;			//읽기권한
var gbWriteAuth			= false;			//쓰기권한

var gridBrd				= null;				//게시판그리드
var gridObj				= null;				//그리드객체
var gsCurrow			= -1;				//선택로우
var gsXaFlag 			= "";				//화면상태
var arrInput			= null;				//편집폼배열
var arrButton			= null;				//버튼배열
var arrQuery			= null;				//조회폼배열
var aBtnMode			=					//버튼모드
[
	//등록	, 수정	, 삭제	, 저장	, 취소	, 조회	    //버튼 / 상태
	[ false , true  , true  , true  , true	, false	] ,	// I   : 리셋
	[ false , false , false , true  , true	, false	] ,	// V   : 보기
	[ true  , true  , true  , false , false , false	] ,	// A   : 등록
	[ true  , true  , true  , false , false , false	] ,	// U   : 수정
	[ true  , true  , true  , true  , true  , true 	]	// X   : 블로킹
];
/**
 * init
 */
function init()
{
	gridBrd = document.getElementById(SELECT_BOARD_ID);
	gridBrd.strScrollBars = "vertical";
	gridBrd.bStatusbarVisible = false;
	gridObj = document.getElementById(SELECT_ID);
	arrInput  = new Array(f.notice_type, f.notice_sbjt, f.notice_cont, f.board_tp_seq, f.pwd);
	arrButton = new Array(f.btnAdd, f.btnUpd, f.btnDel, f.btnSave, f.btnCan, fQuery.btnsearch);
//	arrQuery  = new Array(fQuery.q_datefrom, fQuery.q_dateto,  fQuery.notice_type
	//					 ,fQuery.searchtype, fQuery.searchstr, fQuery.q_rg_id);
	setDisabledObj(arrQuery, true);
	setMode("X");
	//queryList();
	getBoardAuth();
}
/**
 * 게시판 세부권한 조회
 */
function getBoardAuth()
{
	var tran = new Trans();
	tran.setSvc(SELECT_BOARDAUTH_ID);
	tran.setMyUserParams("board_tp_seq"	, fQuery.board_tp_seq.value);
	//tran.setMyUserParams("board_tp_seq"	, 17);
	tran.setMyUserParams("userid"		, f.userid.value);
	tran.setCallBack("callbackGetBoardAuth");
	tran.open("","","/common.do");
}
/**
 * 게시판 세부권한 조회 콜백
 * svcid : service id
 */
function callbackGetBoardAuth(svcid)
{
	if (DataSet.isError(svcid) == "true") return;

	if(DataSet.getTotalCount(svcid) > 0)
	{
		gbUseYn 	= true;
		gbReadAuth	= (DataSet.getParam(SELECT_BOARDAUTH_ID, 1, 0, "read_auth_f")=="1")?true:false;
		gbWriteAuth	= (DataSet.getParam(SELECT_BOARDAUTH_ID, 1, 0, "wrt_auth_f" )=="1")?true:false;
		setMode("I");

		if(gbUseYn&&gbReadAuth)
		{
			setDisabledObj(arrQuery, false);
			queryBoardList();
		}
	}else{
		setDisabledObj(arrQuery, true);
	}
}
/**
 * 모드에 따르는 버튼 형태
 * sType : I:초기화, A:등록, U;수정, X:블로킹
 */
function setMode(sType)
{
	gsXaFlag 	= sType;	//화면모드
	var btnMode = -1;		//버튼모드
	var frmMode = false;	//폼모드

	switch (sType)
	{
		case "I"	:	frmMode = true;		btnMode = 0;	f.reset();	gsCurrow = -1;

						iconDisabled(["icoBig", "icoSmall", "icoUploadFiles", "icoShowFiles"], true);//조작버튼 컨트롤
						initUploadFile();			//초기화
						uploadFileDisabled(false);	//보기모드 : false:목록, true:입력폼
						//uploadFormSetDisabled(true);//파일박스 모드
						
						break;
		case "V"	:	frmMode = true;		btnMode = 1;

						iconDisabled(["icoBig", "icoSmall"], false);
						iconDisabled(["icoUploadFiles", "icoShowFiles"], true);
					//	initUploadFile();
						uploadFileDisabled(false);	//보기모드
					//	uploadFormSetDisabled(false);

						break;
		case "A"	:	frmMode = false;	btnMode = 2;	f.reset();

						iconDisabled(["icoBig", "icoSmall", "icoUploadFiles", "icoShowFiles"], true);//조작버튼 컨트롤
						initUploadFile();			//초기화
						uploadFileDisabled(false);	//보기모드 : false:목록, true:입력폼	

						/*
						iconDisabled(["icoBig", "icoSmall"], false);
						iconDisabled(["icoUploadFiles", "icoShowFiles"], true);
						initUploadFile();
						uploadFileDisabled(true);	//보기모드
					//	uploadFormSetDisabled(false);
						*/

						f.file_nm.value 	= "";
						f.new_file_nm.value = "";					

						break;
		case "U"	:	frmMode = false;	btnMode = 3;
		
						iconDisabled(["icoBig", "icoSmall"], false);
						iconDisabled(["icoUploadFiles", "icoShowFiles"], false);
						iUpload.init();	//initUploadFile();
					//	uploadFileDisabled(false);	//보기모드

						f.file_nm.value 	= "";
						f.new_file_nm.value = "";

						break;
		case "X" 	:	frmMode = true;		btnMode = 4;
						break;
	}

	//버튼
	for( var i=0; i<arrButton.length; i++ )
	{
		setButton( arrButton[i], aBtnMode[btnMode][i]);
	}

	//폼
	setDisabledObj(arrInput, frmMode);

	//폼-예외-password
	f.pwd.readOnly	= frmMode;
	f.pwd.className = (frmMode == true ? "input_readonly" : "input_required");

	if(frmMode)
	{
		document.getElementById("btnList"  ).style.display = "";
		document.getElementById("btnDetail").style.display = "none";
	}else{
		document.getElementById("btnList"  ).style.display = "none";
		document.getElementById("btnDetail").style.display = "";
	}

	if(!gbWriteAuth)
	{
		setButton(f.btnAdd,true);
		setButton(f.btnUpd,true);
		setButton(f.btnDel,true);
	}

	if(sType=="U")
	{
		setDisabledObj([f.board_tp_seq], true);
		if(f.board_tp_seq.value=="16")
		{
			setDisabledObj([f.notice_type], false);
			f.pwd.readOnly	= true;
			f.pwd.className = "input_readonly";
		}else{
			setDisabledObj([f.notice_type], true );
			f.pwd.readOnly	= false;
			f.pwd.className = "input_required";
		}
	}
}
/**
 * 게시판 종류 조회
 */
function queryBoardList()
{
	var trans = new GridTrans();
	trans.setPageRow(99999);
	trans.setSvc(SELECT_BOARD_ID);
	trans.setWiseGrid("1");
	trans.setForwardId("wgdsl","");
	trans.setDefClick(true);
	trans.setCallBack("callbackQueryBoardList");
	trans.setMyUserParams("use_f"	 , "Y");
	trans.setMyUserParams("board_knd", "03");
	trans.open("","","/wisegrid.do");
}
/**
 * 게시판 종류 조회 콜백
 */
function callbackQueryBoardList(svcid)
{
}
/**
 * 게시글 조회
 */
function queryList()
{
	if(!gbUseYn||!gbReadAuth){return;}
	//if(!gbReadAuth){MessageBox("", "I", "조회 권한이 없습니다.\n\n관리자에게 문의 바랍니다.");return;}	//INFAuthFailRead

	if (fQuery.q_datefrom.value != "" && fQuery.q_dateto.value == "")
	{
		fQuery.q_dateto.value = fQuery.q_datefrom.value;
	}
	else if(fQuery.q_datefrom.value == "" && fQuery.q_dateto.value != "")
	{
		fQuery.q_datefrom.value = fQuery.q_dateto.value;
	}

	if (getValidation(fQuery, true) == false) return;
	if (checkTermDate(fQuery.q_datefrom, fQuery.q_dateto, true, true) == false) return;

	gridObj.setParam("rg_dt_format"  , "DATE");	//DATE는 tag에 선언한 format은 GetCellValue에서 포멧을 가지오지 못한다
	gridObj.setParam("rg_tm_format"  , "TIME");
	gridObj.setParam("mdf_dt_format" , "DATE");
	gridObj.setParam("mdf_tm_format" , "TIME");

	var tran = new GridTrans();
	tran.setSvc(SELECT_ID);
	tran.setPageRow(50);
	tran.setWiseGrid("1");
	tran.setForwardId("wgdsl","");
	if(trim(fQuery.searchstr.value)!="")
	{
		tran.setMyUserParams(fQuery.searchtype.value, fQuery.searchstr.value);
	}
	tran.setCallBack("callbackQueryList");
	//tran.setDefClick(true);
	tran.open("fQuery", "f", "/wisegrid.do");
}
/**
 * 그리드 조회 콜백
 * svcid : service id
 */
function callbackQueryList(svcid)
{
	if (DataSet.isError(svcid) == "true") return;
	setMode("I");
	setGridColor();
}
/**
 * 그리드 색 설정
 * 공지 일 경우 색깔 지정
 */
function setGridColor()
{
	if(fQuery.board_tp_seq.value == "16")	//홈페이지공지 일때만
	{	
		var notice_type = "";
	
		for(var i=0 ; i<gridObj.GetRowCount(); i++)
		{
			notice_type = gridObj.GetCellHiddenValue("notice_type",i);
			if( notice_type=="01" )
			{
				gridObj.SetCellFgColor("notice_sbjt"	, i, "51|51|51");
				gridObj.SetCellFgColor("notice_type"	, i, "51|51|51" );
				gridObj.SetCellFontBold("notice_sbjt"	, i, "false");
				gridObj.SetCellFontBold("notice_type"	, i, "false");
			}else{
				gridObj.SetCellFgColor("notice_sbjt"	, i, "255|90|0");
				gridObj.SetCellFgColor("notice_type"	, i, "255|0|0" );
				gridObj.SetCellFontBold("notice_sbjt"	, i, "true");
				gridObj.SetCellFontBold("notice_type"	, i, "true");
			}
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
	if(id == SELECT_BOARD_ID)
	{
		document.getElementById("board_title").innerText = gridBrd.GetCellValue("board_nm", nRow);
		fQuery.board_tp_seq.value = gridBrd.GetCellValue("board_tp_seq", nRow);
	}
	else if(id == SELECT_ID)
	{
		showDetailByWise(SELECT_ID, nRow, f);

		f.rg_dt_tm.value  = f.rg_dt.value  + "  " + f.rg_tm.value;
		f.mdf_dt_tm.value = f.mdf_dt.value + "  " + f.mdf_tm.value;
		f.up_seq.value	  = f.notice_seq.value;

		if(f.rg_id.value != f.userid.value)
		{
			f.qry_cnt.value = parseInt(f.qry_cnt.value,10) + 1;
			gridObj.SetCellValue("qry_cnt", nRow, f.qry_cnt.value);
		}
		gsCurrow = nRow;
		setMode("V");
		queryContent();	//내용조회
	}
}
/**
 * 내용조회
 */
function queryContent()
{//log("queryContent");
	var tran = new Trans();
	tran.setSvc(OTHERS_SELECT_ID);
	tran.setPageRow(9999);
	tran.setCallBack("callbackQueryContent");
	tran.open("f", "f", "/common.do");
}
/**
 * 내용조회 콜백
 * svcid : service id
 */
function callbackQueryContent(svcid)
{
//log("svcid:"+svcid);
	if(DataSet.isError(svcid) == "true") return;
	if( DataSet.getTotalCount(CONTENT_SELECT_ID)>0 )
	{
		f.notice_cont.value = DataSet.getParam(CONTENT_SELECT_ID, 1, 0, "notice_cont");
	}
	showUploadFileList1();//showUploadFileList(FILE_SELECT_ID,"file_seq","file_nm","new_file_nm");
}
/**
 * 등록
 */
function addItem()
{
	setMode("A");
}
/**
 * 수정
 */
function updateItem()
{
	//if(checkAuth("U") == false) return;
	setMode("U");
}
/**
 * 취소
 */
function cancel()
{
	if( gsCurrow>-1 )
	{
		showDetailO_obj(SELECT_ID, "", gsCurrow);
	}else{
		setMode("I");
	}
}
/**
 * 저장1 : 파일 업로드
 */
function checkFile()
{
	if(getValidation(f, true) == false) return;
	if(f.board_tp_seq.value!="16")
	{
		if(f.pwd.value=="")
		{
			MessageBox("","I","비밀번호는 필수 입력 항목 입니다.");return;
		}
	}
	if(MessageBox("SavConfirm", "C", "") == false) return;

	if (iUpload.existsUploadFile() == true)	//파일업로드 시
	{
		iUpload.upload(UPLOAD_PATH, UPLOAD_FOLDER_NAME);
	}else{
		save();
	}
}
/**
 * 저장2
 */
function save()
{
	/* ******************************************************
	if(getValidation(f, true) == false) return;
	if(f.board_tp_seq.value!="16")
	{
		if(f.pwd.value=="")
		{
			MessageBox("","I","비밀번호는 필수 입력 항목 입니다.");return;
		}
	}
	if(MessageBox("SavConfirm", "C", "") == false) return;
	******************************************************* */

	var svc_id = "";
	if(gsXaFlag=="A")
	{
		svc_id = (INSERT_ID +","+ SEQ_SELECT_ID);

		if(f.file_nm.value != "")		//새로 등록한 파일이 존재할 경우
		{
			svc_id += (","+FILE_INSERT_ID);
		}
	}
	else //if(gsXaFlag =="U")
	{
		svc_id = UPDATE_ID;

		if(f.file_nm.value != "")		//새로 등록한 파일이 존재할 경우
		{
			svc_id += (","+FILE_INSERT_ID2);
		}
	}
	
	if(f.file_nm.value.substr(0,1)=="")	//버그로  가 첨가될 상황이 발생
	{
		f.file_nm.value 	= f.file_nm.value.substr(1);
		f.new_file_nm.value = f.new_file_nm.value.substr(1);
	}
									
	var tran = new Trans();
	tran.setSvc(svc_id);
	tran.setWait(true);
	tran.setCallBack("callbackSave");
	tran.open("f", "f", "/common.do");
}
/**
 * 저장 콜백
 * svcid : service id
 */
function callbackSave(svcid)
{
	if(DataSet.isError(svcid) == "true") return;
	if(gsXaFlag == "A"){afterInsert();}
	else               {afterUpdate();}
}
/**
 * 등록 후
 */
function afterInsert()
{
	if(parseInt(DataSet.getParam(INSERT_ID, 1, 0, "SUCCESS_COUNT"),10) > 0)
	{
		f.notice_seq.value	= DataSet.getParam(SEQ_SELECT_ID, 1, 0, "seq");
		f.up_seq.value		= f.notice_seq.value;
		f.qry_cnt.value 	= 0;
		f.rg_dt.value 		= getCurDay("-", "");
		f.rg_tm.value 		= getCurDay(":", "T");
		f.rg_id.value 		= f.userid.value;
		f.rg_nm.value 		= f.usernm.value;
		f.rg_dt_tm.value  	= f.rg_dt.value +"  "+f.rg_tm.value;
		f.mdf_dt.value 		= f.rg_dt.value;
		f.mdf_tm.value 		= f.rg_tm.value;
		f.mdf_id.value 		= f.userid.value;
		f.mdf_nm.value 		= f.usernm.value;
		f.mdf_dt_tm.value 	= f.mdf_dt.value+"  "+f.mdf_tm.value;
		gsCurrow  			= 0;

		insertWiseGridRow(SELECT_ID, gsCurrow, f);
		setGridColor();
		setMode("V");

		queryUploadFile();//첨부파일 목록 조회
	}
}
/**
 * 수정 후
 */
function afterUpdate()
{
	if(parseInt(DataSet.getParam(UPDATE_ID, 1, 0, "SUCCESS_COUNT"),10) > 0)
	{
		f.mdf_dt.value 		= getCurDay("-", "");
		f.mdf_tm.value 		= getCurDay(":", "T");
		f.mdf_id.value 		= f.userid.value;
		f.mdf_nm.value 		= f.usernm.value;
		f.mdf_dt_tm.value	= f.mdf_dt.value+"  "+f.mdf_tm.value;

		updateWiseGridRow(SELECT_ID, gsCurrow, f);
		setGridColor();
		setMode("V");

		queryUploadFile();//첨부파일 목록 조회
	}
}
/**
 * 업로드 파일 조회
 */
function queryUploadFile()
{
	var tran = new Trans();
	tran.setSvc(FILE_SELECT_ID);
	tran.setPageRow(9999);
	tran.setMyUserParams("prg_id", "HOME_BOARD");
	tran.setMyUserParams("up_seq", f.notice_seq.value);
	tran.setCallBack("callbackQueryUploadFile");
	tran.open("", "", "/common.do");
}
/**
 * 업로드 파일 조회
 */
function callbackQueryUploadFile()
{
	showUploadFileList1();	//0건이라도 무조건 호출해준다.
}
/**
 * 삭제
 */
function delItem()
{
	//if(checkAuth("D") == false) return false;
	if(MessageBox("DelConfirm", "C", "") == false) return;

	bFileDelMode = ((DataSet.getTotalCount(FILE_SELECT_ID) > 0)?true:false);
	
	var tran = new Trans();
	tran.setSvc(DELETE_ID+","+FILE_DELETE_ID);
	tran.setMyUserParams("prg_id"	 , "HOME_BOARD");
	tran.setMyUserParams("up_seq"	 , f.notice_seq.value);
	tran.setMyUserParams("notice_seq", f.notice_seq.value);
	tran.setCallBack("callbackDelItem");
	tran.open("", "", "/common.do");
}
/**
 * 삭제 콜백
 * svcid : service id
 */
function callbackDelItem(svcid)
{
	if(DataSet.isError(svcid) == "true") return;
	if(bFileDelMode==true)	{delUploadFileAll()}
	else					{afterDelete();}
}
/**
 * 삭제 후
 */
function afterDelete()
{
	if(parseInt(DataSet.getParam(DELETE_ID, 1, 0, "SUCCESS_COUNT"),10) > 0)
	{
		MessageBox("Success", "E", "");
		removeWiseGridRow(SELECT_ID, gsCurrow);
		setMode("I");
	}
}
/**
 * CALLBACK : 공통 파일삭제 용
 */
function callback(sServiceID)
{
	switch (sServiceID)
	{
		case FILE_DELETE_ID :	if (parseInt(DataSet.getParam(FILE_DELETE_ID, 1, 0, "SUCCESS_COUNT"),10) > 0)
								{
									delUploadFile(f.new_file_nm.value, UPLOAD_FOLDER_NAME, UPLOAD_PATH);
								}
								break;

		case FILE_REMOVE_ID :	if(bFileDelMode==true)
								{
									bFileDelMode = false;
									afterDelete();
								}else{
									bFileDelMode = false;
									MessageBox("Success", "E", "");
									queryUploadFile();
								}
								break;
		default : break;
	}
}
/**
 * 권한체크
 */
function checkAuth(mode)
{return true;
	var msgId;

	if(mode == "U")
	{
		msgId = "INFAuthFailMod";
	}
	else if(mode == "D")
	{
		msgId = "INFAuthFailDel";
	}

	if(gsXaFlag != "A" && f.userid.value != f.rg_id.value)
	{
		if(typeof msgId != "undefined")
		{
			MessageBox(msgId, "E", "");
			return false;
		}
	}
}
/**
 * 사용자 조직도 팝업
 */
var popupGubun = ""
function openUserOrg(gb)
{
	popupGubun = gb;
	window.open("/jsp/common/comUserOrg.jsp" ,"UserOrg", "width=800,height=545");
}
/**
 * 사용자정보 셋팅
 */
function setOrgUserInfo(user_id, user_name)
{
	if(popupGubun == "q_rg_id")
	{
		fQuery.q_rg_id.value = user_id;
		fQuery.q_rg_nm.value = user_name;
	}
}
/**
 * 작성자 onBlur
 */
function userid_onBlur(gb)
{
	if(gb == "q_rg_id")
	{
		if(trim(fQuery.q_rg_id.value)=="")
		{
			fQuery.q_rg_id.value = "";
			fQuery.q_rg_nm.value = "";
		}
	}
}
/**
 * 게시판 속성 셋팅
 */
function setBoardType()
{
	if(f.board_tp_seq.value=="")
	{
		setDisabledObj([f.notice_type], true);
		f.notice_type.value = "";
		f.pwd.readOnly		= true;
		f.pwd.className 	= "input_readonly";
		f.pwd.value 		= "";

		iconDisabled(["icoBig", "icoSmall", "icoUploadFiles", "icoShowFiles"], true);//조작버튼 컨트롤
		initUploadFile();			//초기화
		uploadFileDisabled(false);	//보기모드 : false:목록, true:입력폼		
	}
	else if(f.board_tp_seq.value=="16")	//홈페이지 공지
	{
		setDisabledObj([f.notice_type], false);
		f.notice_type.value = "";
		f.pwd.readOnly		= true;
		f.pwd.className 	= "input_readonly";
		f.pwd.value 		= "";

		iconDisabled(["icoBig", "icoSmall", "icoUploadFiles", "icoShowFiles"], true);//조작버튼 컨트롤
		initUploadFile();			//초기화
		uploadFileDisabled(false);	//보기모드 : false:목록, true:입력폼		
	}else{
		setDisabledObj([f.notice_type], true );
		f.notice_type.value = "01";
		f.pwd.readOnly		= false;
		f.pwd.className 	= "input_required";
		f.pwd.value 		= "";

		iconDisabled(["icoBig", "icoSmall"], false);
		iconDisabled(["icoUploadFiles", "icoShowFiles"], true);
		initUploadFile();
		uploadFileDisabled(true);	//보기모드	
	}
}

/**
 * 첨부파일 리스트 출력
 */
function showUploadFileList1()
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
		
		var args = "filename=" + escape(encodeURIComponent(filename)) + "&newfilename=" + escape(encodeURIComponent(newfilename)) + "&delete=NO&foldername=" + UPLOAD_FOLDER_NAME + "&filepath=" + UPLOAD_PATH;
		
		if(arrfilename.length > 1 && (trim(arrfilename[arrfilename.length - 1]).toUpperCase() == "HTML" || trim(arrfilename[arrfilename.length - 1]).toUpperCase() == "HTM"))
		{
			
			uploadFileHTML.append("<a target='iDownFile' href=\"\" onclick=\"javascript:openPopup('/jsp/common/downFile.jsp', '" + args + "' , 'down', '', '', '1000', '600', 'scrollbars=yes');\">" + filename + "</a>&nbsp;");
		}
		else
		{		
			uploadFileHTML.append("<a target='iDownFile' href=\"/jsp/common/downFile.jsp?" + args + "\">" + filename + "</a>&nbsp;");
																				
		}
		
		if(f.rg_id.value == f.userid.value)
		{
			uploadFileHTML.append("<label onClick=\"delUploadFile_DB("+seq+", '" + newfilename + "','"+UPLOAD_FOLDER_NAME+"','"+UPLOAD_PATH+"')\" style=\"cursor:hand\">");
			uploadFileHTML.append("<font color=red>X</font></label>");
		}

		uploadFileHTML.append("</td>");
		uploadFileHTML.append("</tr>");
	}
	
	//f.arr_uploadfileseq.value = makeParamArray(arrSeq);

	uploadFileHTML.append("</table>");
	
	//alert(uploadFileHTML.toString());
	
	setUploadFile(uploadFileHTML.toString());
}
