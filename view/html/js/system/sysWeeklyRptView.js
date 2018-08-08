var SELECT_ID		= "UCSYS100S";				//�ְ����� ��ȸ
var DETAIL_ID		= "UCSYS101S,UCSYS102S";	//�ְ����� ����ȸ
var UPDATE_APP_ID	= "UCSYS102U,UCSYS103U";	//�ְ����� ��������
/**
 * PROJ : Nexfron Intranet
 * NAME : sysWeeklyRptView.js
 * DESC : �ְ����� �ڹٽ�ũ��Ʈ
 * Author : ������ ����
 * VER  : 1.0
 * Copyright 2009 Nexfron All rights reserved
 * ============================================================================================
 * 								��		��		��		��
 * ============================================================================================
 * VERSION		DATE		AUTHOR		DESCRIPTION
 * ============================================================================================
 * 1.0		2011.03.03		������		�����ۼ�
 */

var SELECT_ID = "UCSYS101S,UCSYS102S";

/**
 * �ʱ�ȭ
 **/
function init()
{
	searchInfo();
}

/**
 * �ְ����� ��ȸ 
 */
function searchInfo()
{
	var trans = new Trans();
	trans.setSvc(SELECT_ID);
	trans.open("f", "f", "/common.do");
}

/**
 * �ݹ�
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
