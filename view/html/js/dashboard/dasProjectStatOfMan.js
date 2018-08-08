/**
 * PROJ : Nexfron Intranet
 * NAME : dasProjectStatOfMan.js
 * DESC : 현황판 - 프로젝트현황-개인별
 * Author : 박준규 과장
 * VER  : 1.0
 * Copyright 2009 Nexfron All rights reserved
 * ============================================================================================
 * 								변		경		사		항
 * ============================================================================================
 * VERSION		DATE		AUTHOR		DESCRIPTION
 * ============================================================================================
 * 1.0		2010.09.06		박준규		개발
 */
var oGrid             	= "";           //프로젝트현황
var SELECT_ID 	      	= "UCDAS012S";	//프로젝트현황
/**
 *초기화
 */
function init()
{
	oGrid  = document.getElementById(SELECT_ID);
//	oGrid.bRowSelectorVisible = false;
//	oGrid.strHDClickAction = "select"
	queryList();
}
/**
 * 조회
 */
function queryList()
{
	var tran = new Trans();
	tran.setSvc(SELECT_ID);
	tran.setPageRow("9999");
	tran.setWiseGrid("1");
	tran.setForwardId("wgdsl","");
	tran.setCallBack("callbackQueryList");
	tran.open("", "f","/wisegrid.do");
}
/**
 * 조회 후 콜백
 * sServiceID  : 서비스ID
 */
function callbackQueryList(sServiceID)
{
	if( oGrid.GetRowCount()>0 )
	{
		try{
			//oGrid.SetGroupMerge("user_nm2");
			oGrid.SetColCellMerge("user_nm2", true);
		}catch(e){alert(e.description);}
	}
}
function showDetailO_obj(id, strColumnKey, nRow)
{
}