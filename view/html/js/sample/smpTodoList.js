/**
 * PROJ : Intranet
 * NAME : smpTodoList.js
 * DESC : 개인 Todo List 관리 화면 자바스크립트
 * Author : 김은수 과장
 * VER  : 1.0
 * Copyright 2009 Nexfron All rights reserved
 * ============================================================================================
 * 								변		경		사		항
 * ============================================================================================
 * VERSION		DATE		AUTHOR		DESCRIPTION
 * ============================================================================================
 * 1.0		2009.09.15		김은수		최초작성
 */

var gsXaFlag;
var gsBXaFlag;

var aElement = new Array();

/**
 * 화면 초기화
 */
function setInit()
{
	var nIndex = 0;
	aElement[nIndex++] = f.jobnm;
	aElement[nIndex++] = f.rg_id;
	aElement[nIndex++] = f.rg_nm;
	aElement[nIndex++] = btnUserId;
	aElement[nIndex++] = f.statcd;
	aElement[nIndex++] = f.prj_seq;
	aElement[nIndex++] = f.memo;
	
	gsXaFlag = "I";
	gsBXaFlag = "I"
	
	setMode(gsXaFlag);
}

/**
 * 등록버튼 클릭
 */
function setAddMode()
{
	if (gsXaFlag == "U")
	{
		gsBXaFlag = "U";
	}
	
	gsXaFlag = "A";
	setMode(gsXaFlag);
} 

/**
 * 취소버튼 클릭
 */
function setCancelMode()
{
	if (gsBXaFlag == "U")
	{
		setMode("U");
//		showDetail_obj(SELECT_ID, "", CURINDEX);
	}
	else
	{
		setMode(gsBXaFlag);
	}
}

/**
 * 화면모드 컨트롤
 * mode : 화면모드 구분자
 */
function setMode(mode)
{
	if (mode == "I")
	{
		setDisabledObj(aElement, true);
		//
		setButton(f.btnAdd, 	false);
		setButton(f.btnSave, 	true);
		setButton(f.btnDel, 	true);
		setButton(f.btnCancel, 	true);
	}
	else if (mode == "A")
	{
		setDisabledObj(aElement, false);
		//
		setButton(f.btnAdd, 	true);
		setButton(f.btnSave, 	false);
		setButton(f.btnDel, 	true);
		setButton(f.btnCancel, 	false);
	}
}

/**
 *	사용자 조직도 팝업
 **/
function openUserOrg(gb)
{
	window.open("/jsp/common/comUserOrg.jsp" ,"UserOrg", "width=800,height=580");
}