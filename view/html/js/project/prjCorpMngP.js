/**
 * PROJECT : INTRANET
 * NAME    : prjCorpMngP.js
 * DESC    : ��ü��ȸ �˾�
 * AUTHOR  : ���ر� ����
 * VERSION : 1.0
 * Copyright �� 2010 Nexfron. All rights reserved.
 * ============================================================================================
 * 							��		��		��		��
 * ============================================================================================
 * VERSION	   DATE		  	AUTHOR		DESCRIPTION
 * ============================================================================================
 * 1.0		2010.09.12		���ر�		����
 */
var SELECT_ID 		= "UCPRJ041S";	//��ü���� ����Ʈ
var oGrid     		= "";           //��ü���� ����Ʈ
var gsXaFlag      	= "";			//ȭ�����
var aButton       	= null;			//��ư�迭
var aBtnMode      	=				//��ư���
[
	//����	, �ݱ�	, ��ȸ	    //��ư / ����
	[ true  , false , false	] ,	// I   : �ʱ�ȭ
	[ true  , false , false	] ,	// A   : ���
	[ false , false , false	] ,	// U   : ����
	[ true  , true  , true 	]	// X   : ���ŷ
];
/**
 *�ʱ�ȭ
 */
function init()
{
	//��ư�ʱ�ȭ
	aButton = [ f.btnApply, f.btnClose, fQuery.btnSearch ];

	//�׸����ʱ�ȭ
	oGrid = document.getElementById(SELECT_ID);
	oGrid.SetColCellCursor("corp_nm","hand");

	//ȭ���ʱ�ȭ
	setReset();

	//�ʱ���ȸ
	query();
}
/**
 * ȭ���ʱ�ȭ
 */
function setReset()
{
	setMode("I",f);
}
/**
 * ��ư��Ʈ��
 * sType:��ư���
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
 * ��ȸ
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
 * ��ȸ�ݹ�
 * svcid  : ����ID
 */
function callbackQuery(sSvcId)
{
	if ( parseInt( oGrid.GetRowCount()) < 1 ){setReset();}
}
/**
 * ���Ŭ��
 * id           : Ŭ���� �׸��尴üID
 * strColumnKey : Ŭ���� �÷���
 * nRow         : Ŭ����Row Index
 */
function showDetailO_obj(id, strColumnKey, nRow)
{
	if(id==SELECT_ID)
	{
		setMode("U",f);
	}
}
/**
 * ��� ���� Ŭ��
 * id           : Ŭ���� �׸��尴üID
 * strColumnKey : Ŭ���� �÷���
 * nRow         : Ŭ����Row Index
 */
function showDetailB_obj(id, strColumnKey, nRow)
{
	setCorp(nRow);
}
/**
 * ���� ��ư Ŭ��
 */
function selectCode()
{
	var nRow = oGrid.GetActiveRowIndex();
	setCorp(nRow);
}
/**
 * ���õ� �ڵ� ����
 * nRow : Ŭ����Row Index
 */
function setCorp(nRow)
{
	var corp_seq = oGrid.GetCellValue("corp_seq", nRow);
	var corp_nm  = oGrid.GetCellValue("corp_nm" , nRow);
	opener.setCorp(fQuery.corp.value, corp_seq,corp_nm);
	window.close();
}