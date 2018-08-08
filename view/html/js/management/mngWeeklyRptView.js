var SELECT_ID		= "UCSYS100S";				//주간보고 조회
var DETAIL_ID		= "UCSYS101S,UCSYS102S";	//주간보고 상세조회
var UPDATE_APP_ID	= "UCSYS102U,UCSYS103U";	//주간보고 결재저장
/**
 * PROJ : Nexfron Intranet
 * NAME : sysWeeklyRptView.js
 * DESC : 주간보고서 자바스크립트
 * Author : 김은수 과장
 * VER  : 1.0
 * Copyright 2009 Nexfron All rights reserved
 * ============================================================================================
 * 								변		경		사		항
 * ============================================================================================
 * VERSION		DATE		AUTHOR		DESCRIPTION
 * ============================================================================================
 * 1.0		2011.03.03		김은수		최초작성
 */

var SELECT_ID = "UCSYS101S,UCSYS102S";

/**
 * 초기화
 **/
function init()
{
	searchInfo();
}

/**
 * 주간보고서 조회 
 */
function searchInfo()
{
	var trans = new Trans();
	trans.setSvc(SELECT_ID);
	trans.open("f", "f", "/common.do");
}

/**
 * 콜백
 **/
function callback(dsnm)
{
	switch (dsnm)
	{
		case SELECT_ID :
			
			var workinfo	= "";
			var start_tm	= "";
			var end_tm		= "";
			
			for(var i=0 ; i < DataSet.getTotalCount("UCSYS102S") ; i++){
				document.all("content"+i).innerText		= DataSet.getParam("UCSYS102S", 1, i, "content");
				
				start_tm	= getFormatData(DataSet.getParam("UCSYS102S", 1, i, "start_tm"), "TIME");
				end_tm		= getFormatData(DataSet.getParam("UCSYS102S", 1, i, "end_tm"), "TIME");
				
				workinfo	 = "";
				workinfo	+= DataSet.getParam("UCSYS102S", 1, i, "prj_nm");
				workinfo	+= "\n";
				workinfo	+= DataSet.getParam("UCSYS102S", 1, i, "holi_gbnm");
				
				if (start_tm != "" && end_tm != "")
				{
					workinfo	+= " [";
					workinfo	+= start_tm;
					workinfo	+= " ~ ";
					workinfo	+= end_tm;
					workinfo	+= "]";
				}
				
				document.all("workinfo"+i).innerText	= workinfo;
				
			}

			break;

		default:

			break;
	}
}
