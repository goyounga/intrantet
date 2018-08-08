/**
 * PROJECT : INTRANET
 * NAME    : prjCorpMng.js
 * DESC    : 업체관리
 * AUTHOR  : 박준규 과장
 * VERSION : 1.0
 * Copyright ⓒ 2010 Nexfron. All rights reserved.
 * ============================================================================================
 * 							변		경		사		항
 * ============================================================================================
 * VERSION	   DATE		  	AUTHOR		DESCRIPTION
 * ============================================================================================
 * 1.0		2010.09.12		박준규		개발
 */
var SELECT_ID 		= "UCPRJ041S";	//업체관리 리스트
var	SELECT_ID_CHK   = "UCPRJ042S";	//무결성검사
var SELECT_ID_TOP40 = "UCPRJ043S";	//유지보수리스트 top40
var INSERT_ID 		= "UCPRJ041I";	//유지보수 등록
var UPDATE_ID     	= "UCPRJ041U";	//유지보수 수정
var DELETE_ID     	= "UCPRJ041D";	//유지보수 삭제

var oGrid     		= "";           //업체관리 리스트
var gsXaFlag      	= "";			//화면상태
var gsCurrow      	= -1;			//선택로우
var gsCurGrid     	= "";			//선택그리드
var gsCurKey     	= "";			//선택된고유키 : 그리드상의 고유식별키이다. 주로 PK,SEQ
var aForms        	= null; 		//폼객체들
var aButton       	= null;			//버튼배열
var aBtnMode      	=				//버튼모드
[
	//등록	, 저장	, 삭제	, 취소	, 조회	    //버튼 / 상태
	[ false , true  , true  , true	, false	] ,	// I   : 초기화
	[ true  , false , true  , false , false	] ,	// A   : 등록
	[ false , false , false , false , false	] ,	// U   : 수정
	[ true  , true  , true  , true  , true 	]	// X   : 블로킹
];
/**
 *초기화
 */
function init()
{
	//버튼초기화
	aButton = [ f.btnAdd, f.btnSave, f.btnDel, f.btnCancel, fQuery.btnSearch ];

	//폼객체초기화
	aForms = [ f.corp_nm, f.rmk ];

	//그리드초기화
	oGrid = document.getElementById(SELECT_ID);

	//화면초기화
	setReset();

	//초기조회
	//query();
}
/**
 * 화면초기화
 */
function setReset()
{
	gsCurrow  = -1;
	gsCurGrid = "";
	gsCurKey  = "";
	setMode("I",f);
	setDisabledObj(aForms, true);
	clear(f);//selectbox, input-text, textarea
	f.corp_seq.value = "";//hidden
}
/**
 * 버튼컨트롤
 * sType:버튼모드
 */
function setMode(sType)
{
	gsXaFlag = sType;
	var mode = -1;
	switch (sType)
	{
		case "I" :	mode = 0;	break;
		case "A" :	mode = 1;	break;
		case "U" :	mode = 2;	break;
		case "X" :	mode = 3;	break;
		default  : 	break;
	}
	for( var i=0; i<aButton.length; i++ )
	{
		setButton( aButton[i], aBtnMode[mode][i]);
	}
}
/**
 * 조회
 */
function query( aFlg )
{
	var svc_id = "";
	if( aFlg == "REFRESH" )
	{
		svc_id = SELECT_ID_TOP40;
	}else{
		if ( getValidation(fQuery, true) == false ) {return;}
	//	if ( !checkTermDate(fQuery.reg_dt_s, fQuery.reg_dt_e, true, true, "") ){return;}
		svc_id = SELECT_ID;
	}

	var tran = new Trans();
	tran.setPageRow("9999");
	tran.setSvc( svc_id );
	tran.setDisSvc(SELECT_ID);
	tran.setWiseGrid("1");
	tran.setForwardId("wgdsl","");
	tran.setDefClick("true");
	tran.setCallBack("callbackQuery");
	setMode("X", f);
	tran.open("fQuery","f","/wisegrid.do");
}
/**
 * 조회콜백
 * svcid  : 서비스ID
 */
function callbackQuery(sSvcId)
{
	if ( parseInt( oGrid.GetRowCount()) < 1 ){setReset();}
}
/**
 * 목록클릭
 * id           : 클릭한 그리드객체ID
 * strColumnKey : 클릭한 컬럼명
 * nRow         : 클릭한Row Index
 */
function showDetailO_obj(id, strColumnKey, nRow)
{
	if(id==SELECT_ID)
	{
	 	gsCurrow  = nRow;
	 	gsCurGrid = id;
	 	gsCurKey  = oGrid.GetCellValue("corp_seq", nRow);
		setMode("U",f);
		setDisabledObj(aForms ,false);
		showDetailByWise(id, nRow, f);
	}
}
/**
 * 등록버튼클릭
 */
function add()
{
	setMode("A",f);
	setDisabledObj(aForms ,false);
	clear(f);
	f.corp_seq.value      = "";//hidden
}
/**
 * 취소버튼클릭
 */
function cancel()
{
	if( gsCurrow>-1 )
	{
		gsCurrow = findGridRow(oGrid, "corp_seq", gsCurKey);
		showDetailO_obj( gsCurGrid, "", gsCurrow );
	}else{
		setReset();
	}
}
/**
 * 저장버튼클릭
 */
function save()
{
	if ( getValidation(f, true) == false ) {return;}
	if      (gsXaFlag == "A"){ insert(); }
	else if (gsXaFlag == "U"){ checkUsing("UPDATE"); }
}
/**
 * 사용건 조회
 * sMode : 수정, 삭제 구분값
 */
function checkUsing(sMode)
{
	var tran = new Trans();
	tran.setPageRow("9999");
	tran.setSvc(SELECT_ID_CHK);
	tran.setUserParams("corp_seq="+f.corp_seq.value);
	tran.setCallBack( (sMode=="UPDATE") ? "update" : "deleteList" );
	setMode("X", f);
	tran.open("","","/common.do");
}
/**
 * 사용건 목록작성
 * sDataSet : 사용건 DataSet
 */
function makeUsingList(sDataSet)
{
	/*
	var aSheetNm = DataSet.getParamArr(sDataSet, DataSet.getCurPage(sDataSet), "plan_nm");
	var nTotCnt  = DataSet.getTotalCount(sDataSet);
	var nLenth   = ((aSheetNm.length>5) ? 5 : aSheetNm.length);
	var sTempNm  = "";

	for( var i=0; i<nLenth; i++ )
	{
		sTempNm += (aSheetNm[i] + "\n");
	}

	if( aSheetNm.length>5 ){ sTempNm +=("...\n"); }

	var sMessage = "평가계획에서 사용중인 평가지입니다.\n\n";
	sMessage    += "★ 평가계획명 (총 "+nTotCnt+"건) ★\n";
	sMessage    += "----------------------------------------\n";
	sMessage    += sTempNm;
	sMessage    += "----------------------------------------\n\n";
	*/

	var nTotCnt   = DataSet.getParam(SELECT_ID_CHK, 1, 0, "cnt");
	var nMtncCnt  = DataSet.getParam(SELECT_ID_CHK, 1, 0, "mtnc_cnt");
	var nPrjCnt   = DataSet.getParam(SELECT_ID_CHK, 1, 0, "prj_cnt");

	var sMessage = "★ 사용중인 업체 입니다. ★\n\n";
	sMessage    += "-------------------------------\n";
	if(parseInt(nPrjCnt)>0)
	{
		sMessage    += "(프로젝트관리에 사용 : "+nPrjCnt+"건)\n";
	}
	if(parseInt(nMtncCnt)>0)
	{
		sMessage    += "(유지보수관리에 사용 : "+nMtncCnt+"건)\n";
	}

	sMessage += "\n";
	return sMessage;
}
/**
 * 수정
 */
function update()
{
//	if(DataSet.getTotalCount(SELECT_ID_CHK) > 0)
	if(parseInt(DataSet.getParam(SELECT_ID_CHK,1,0,"cnt")) > 0)
	{
		var sMessage = makeUsingList(SELECT_ID_CHK);
		if(!MessageBox("ChgConfirm", "C", sMessage))
		{
			setMode("U", f);
			return;
		}
	}else{
		if ( !MessageBox("SavConfirm", "C", "") )
		{
			setMode("U", f);
			return;
		}
	}

	var tran = new Trans();
	tran.setSvc(UPDATE_ID);
	//tran.setUserParams("chg_user_id="+getUserID());
	tran.setCallBack("callbackUpdate");
	setMode("X", f);
	tran.open("f","f","/common.do");
}
/**
 * 수정후콜백
 * svcid  : 서비스ID
 */
function callbackUpdate(sSvcId)
{
	if (parseInt(DataSet.getParam(sSvcId, 1, 0, "SUCCESS_COUNT"),10) > 0)
	{
		gsCurrow = findGridRow(oGrid, "corp_seq", gsCurKey);
		updateWiseGridRow(gsCurGrid, gsCurrow, f);
		setMode("U", f);
	}
}
/**
 * 등록
 */
function insert()
{
	if ( !MessageBox("SavConfirm", "C", "")){return;}

	var tran = new Trans();
	tran.setSvc(INSERT_ID);
	//tran.setUserParams("reg_user_id=" + getUserID());
	tran.setCallBack("callbackInsert");
	setMode("X", f);
	tran.open("f","f","/common.do");
}
/**
 * 저장후콜백
 * sSvcId  : 서비스ID
 */
function callbackInsert(sSvcId)
{
	/*
	if (parseInt(DataSet.getParam(sSvcId, 1, 0, "SUCCESS_COUNT"),10) > 0)
	{
		var sNewSeq	        = DataSet.getReqParam( sSvcId ,"_SEQ_NEXVAL");
		f.quest_cnt.value 	= 0;
		f.tot_point.value 	= 0;
		f.reg_dt.value 		= getCurDay("-");
		f.reg_user_nm.value = getUserNM();
		f.sheet_seq.value 	= sNewSheetSeq;

		var nRow  = insertWiseGridRow(SELECT_ID, -1, f);
	 	gsCurrow  = nRow;
	 	gsCurGrid = SELECT_ID;
	 	gsCurKey  = sNewSeq;
		setMode("U", f);
	}
	*/
	if (DataSet.isError(INSERT_ID) == "true") {return;}
	query( "REFRESH" );
}
/**
 * 삭제버튼클릭
 */
function del()
{
	checkUsing("DELETE");
}
/**
 * 삭제
 */
function deleteList()
{
//	if(DataSet.getTotalCount(SELECT_ID_CHK) > 0)
	if(parseInt(DataSet.getParam(SELECT_ID_CHK,1,0,"cnt")) > 0)
	{
		var sMessage = makeUsingList(SELECT_ID_CHK);
	//	MessageBox("PRJDeleteMTNC", "I",sMessage);	//먼저 유지보수 요청건을 삭제하세요.
		MessageBox("", "I", sMessage + "먼저 사용처를 삭제해 주세요." );
		setMode("U", f);
		return;
	}
	if( !MessageBox("DelConfirm", "C", "" ) )
	{
		setMode("U", f);
		return;
	}

	var tran = new Trans();
	tran.setSvc(DELETE_ID);
	tran.setUserParams("corp_seq="+f.corp_seq.value);
	tran.setCallBack("callbackDelete");
	setMode("X", f);
	tran.open("","","/common.do");
}
/**
 * 삭제후콜백
 * sSvcId : 서비스ID
 */
function callbackDelete(sSvcId)
{
//	if (DataSet.isError(INSERT_ID) == "true") {return;}
	if (parseInt(DataSet.getParam(DELETE_ID, 1, 0, "SUCCESS_COUNT"),10) > 0)
	{
		gsCurrow = findGridRow(oGrid, "corp_seq", gsCurKey);
		removeWiseGridRow(SELECT_ID, gsCurrow);
		setReset();
	}
}