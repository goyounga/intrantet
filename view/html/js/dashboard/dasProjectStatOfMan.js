/**
 * PROJ : Nexfron Intranet
 * NAME : dasProjectStatOfMan.js
 * DESC : ��Ȳ�� - ������Ʈ��Ȳ-���κ�
 * Author : ���ر� ����
 * VER  : 1.0
 * Copyright 2009 Nexfron All rights reserved
 * ============================================================================================
 * 								��		��		��		��
 * ============================================================================================
 * VERSION		DATE		AUTHOR		DESCRIPTION
 * ============================================================================================
 * 1.0		2010.09.06		���ر�		����
 */
var oGrid             	= "";           //������Ʈ��Ȳ
var SELECT_ID 	      	= "UCDAS012S";	//������Ʈ��Ȳ
/**
 *�ʱ�ȭ
 */
function init()
{
	oGrid  = document.getElementById(SELECT_ID);
//	oGrid.bRowSelectorVisible = false;
//	oGrid.strHDClickAction = "select"
	queryList();
}
/**
 * ��ȸ
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
 * ��ȸ �� �ݹ�
 * sServiceID  : ����ID
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