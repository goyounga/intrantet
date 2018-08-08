/**
 * PROJECT : INTRANET
 * NAME    : prjCorpMngP.js
 * DESC    : 업체조회 팝업
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
var oGrid     		= "";           //업체관리 리스트
var gsXaFlag      	= "";			//화면상태
var aButton       	= null;			//버튼배열
var aBtnMode      	=				//버튼모드
[
	//선택	, 닫기	, 조회	    //버튼 / 상태
	[ true  , false , false	] ,	// I   : 초기화
	[ true  , false , false	] ,	// A   : 등록
	[ false , false , false	] ,	// U   : 수정
	[ true  , true  , true 	]	// X   : 블로킹
];
/**
 *초기화
 */
function init()
{
	//버튼초기화
	aButton = [ f.btnApply, f.btnClose, fQuery.btnSearch ];

	//그리드초기화
	oGrid = document.getElementById(SELECT_ID);
	oGrid.SetColCellCursor("corp_nm","hand");

	//화면초기화
	setReset();

	//초기조회
	query();
}
/**
 * 화면초기화
 */
function setReset()
{
	setMode("I",f);
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
function query()
{
	var tran = new Trans();
	tran.setPageRow("9999");
	tran.setSvc( SELECT_ID );
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
		setMode("U",f);
	}
}
/**
 * 목록 더블 클릭
 * id           : 클릭한 그리드객체ID
 * strColumnKey : 클릭한 컬럼명
 * nRow         : 클릭한Row Index
 */
function showDetailB_obj(id, strColumnKey, nRow)
{
	setCorp(nRow);
}
/**
 * 선택 버튼 클릭
 */
function selectCode()
{
	var nRow = oGrid.GetActiveRowIndex();
	setCorp(nRow);
}
/**
 * 선택된 코드 셋팅
 * nRow : 클릭한Row Index
 */
function setCorp(nRow)
{
	var corp_seq = oGrid.GetCellValue("corp_seq", nRow);
	var corp_nm  = oGrid.GetCellValue("corp_nm" , nRow);
	opener.setCorp(fQuery.corp.value, corp_seq,corp_nm);
	window.close();
}