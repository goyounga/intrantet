/**
 * PROJ : Nexfron Intranet
 * NAME : sysWeeklyRptSta.js
 * DESC : 주간보고현황 자바스크립트
 * Author : 김은수 과장
 * VER  : 1.0
 * Copyright 2009 Nexfron All rights reserved
 * ============================================================================================
 * 								변		경		사		항
 * ============================================================================================
 * VERSION		DATE		AUTHOR		DESCRIPTION
 * ============================================================================================
 * 1.0		2009.08.13		김은수		최초작성
 */

var SELECT_RPT_ID		= "UCSYS141S";		// 주간보고현황 조회
var SELECT_USER_ID		= "";				// 대상자 조회
//var g_Flag;		//상태플러그
//var gid;
//var objArr = new Array();
//var popupGubun = "";


/**
 * 초기화
 **/
function init()
{
}

/**
 * 조회
 **/
function queryList()
{
	if (getValidation(fQuery, true) == false) return;
	if (checkTermDate(fQuery.date_from, fQuery.date_to, true, true) == false) return;

	var trans = new Trans();
	trans.setPageRow(999);
	trans.setSvc(SELECT_RPT_ID);
	trans.setDefClick(false);
	trans.setWiseGrid("1");
	trans.setForwardId("wgdsl","");
	trans.open("fQuery", "f", "/wisegrid.do");
}


/**
 * 저장버튼
 **/
function save()
{	
//	var tran = new Trans();
//	tran.setUserParams("id="+gid);
//	tran.setSvc(UPDATE_ID);
//	tran.open("f","f","/common.do");
}

/**
 * 콜백
 **/
function callback(dsnm)
{
	switch (dsnm)
	{
		case SELECT_RPT_ID :
			status_title.innerText = "";
			
			break;	
		default:	
			break;
	}
}

/**
 * 상세정보
 * 그리드 onclick 이벤트 함수
 **/
function showDetailO_obj(id, strColumnKey, nRow)
{
	if (id == SELECT_RPT_ID)
	{
		if (strColumnKey == "s_bse_dt" || strColumnKey == "e_bse_dt" || strColumnKey == "wk")
		{
			return;
		}
		else
		{
			var gridObj = document.all(SELECT_RPT_ID);
			
			status_title.innerText = "( " + gridObj.GetColHDText(strColumnKey) + " )";
			
			//
			var sdt = gridObj.GetCellValue("s_bse_dt", nRow);
			var edt = gridObj.GetCellValue("e_bse_dt", nRow);
			var wk  = gridObj.GetCellValue("wk", nRow);
			var scd = "";
			
			if (strColumnKey == "cnt")
			{
				SELECT_USER_ID = "UCSYS142S";
			}
			else if (strColumnKey == "cnt00")
			{
			 	SELECT_USER_ID = "UCSYS143S";
			}
			else
			{
				SELECT_USER_ID = "UCSYS144S";
				scd = strColumnKey.substring(3);
			}
			
			var sParam = "";
			sParam += "&start_dt=" + sdt;
			sParam += "&end_dt=" + edt;
			sParam += "&week_gb=" + wk;
			sParam += "&statcd=" + scd;
			
			var trans = new Trans();
			trans.setPageRow(999);
			trans.setSvc(SELECT_USER_ID);
			trans.setDisSvc("userlist");
			trans.setDefClick(false);
			trans.setWiseGrid("1");
			trans.setForwardId("wgdsl","");
			trans.setUserParams(sParam);
			trans.open("fQuery", "f", "/wisegrid.do");
		}
	}				
}

/**
 * 모드변경
 **/
function setMode(sType)
{
	g_Flag = sType;
	
	switch(sType)
	{
		case "INIT":	//초기화
//			f.btnSave.disabled = true;
//			clearInput();	//입력값 초기화
//			setInput(true);	//입력값 활성화 or 비활성화
//			setDisabledObj(objArr, true);	//입력값 활성화 or 비활성화
//			break;
		
		case "U":		//수정
//			f.btnSave.disabled = false;
//			f.response.readOnly = false;
//			break;

		default:
			break;
	}
}