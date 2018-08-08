/**
 * PROJ : Nexfron Intranet
 * NAME : sysWeeklyRptSta.js
 * DESC : �ְ�������Ȳ �ڹٽ�ũ��Ʈ
 * Author : ������ ����
 * VER  : 1.0
 * Copyright 2009 Nexfron All rights reserved
 * ============================================================================================
 * 								��		��		��		��
 * ============================================================================================
 * VERSION		DATE		AUTHOR		DESCRIPTION
 * ============================================================================================
 * 1.0		2009.08.13		������		�����ۼ�
 */

var SELECT_RPT_ID		= "UCSYS141S";		// �ְ�������Ȳ ��ȸ
var SELECT_USER_ID		= "";				// ����� ��ȸ
//var g_Flag;		//�����÷���
//var gid;
//var objArr = new Array();
//var popupGubun = "";


/**
 * �ʱ�ȭ
 **/
function init()
{
}

/**
 * ��ȸ
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
 * �����ư
 **/
function save()
{	
//	var tran = new Trans();
//	tran.setUserParams("id="+gid);
//	tran.setSvc(UPDATE_ID);
//	tran.open("f","f","/common.do");
}

/**
 * �ݹ�
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
 * ������
 * �׸��� onclick �̺�Ʈ �Լ�
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
 * ��庯��
 **/
function setMode(sType)
{
	g_Flag = sType;
	
	switch(sType)
	{
		case "INIT":	//�ʱ�ȭ
//			f.btnSave.disabled = true;
//			clearInput();	//�Է°� �ʱ�ȭ
//			setInput(true);	//�Է°� Ȱ��ȭ or ��Ȱ��ȭ
//			setDisabledObj(objArr, true);	//�Է°� Ȱ��ȭ or ��Ȱ��ȭ
//			break;
		
		case "U":		//����
//			f.btnSave.disabled = false;
//			f.response.readOnly = false;
//			break;

		default:
			break;
	}
}