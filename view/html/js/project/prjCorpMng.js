/**
 * PROJECT : INTRANET
 * NAME    : prjCorpMng.js
 * DESC    : ��ü����
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
var	SELECT_ID_CHK   = "UCPRJ042S";	//���Ἲ�˻�
var SELECT_ID_TOP40 = "UCPRJ043S";	//������������Ʈ top40
var INSERT_ID 		= "UCPRJ041I";	//�������� ���
var UPDATE_ID     	= "UCPRJ041U";	//�������� ����
var DELETE_ID     	= "UCPRJ041D";	//�������� ����

var oGrid     		= "";           //��ü���� ����Ʈ
var gsXaFlag      	= "";			//ȭ�����
var gsCurrow      	= -1;			//���÷ο�
var gsCurGrid     	= "";			//���ñ׸���
var gsCurKey     	= "";			//���õȰ���Ű : �׸������ �����ĺ�Ű�̴�. �ַ� PK,SEQ
var aForms        	= null; 		//����ü��
var aButton       	= null;			//��ư�迭
var aBtnMode      	=				//��ư���
[
	//���	, ����	, ����	, ���	, ��ȸ	    //��ư / ����
	[ false , true  , true  , true	, false	] ,	// I   : �ʱ�ȭ
	[ true  , false , true  , false , false	] ,	// A   : ���
	[ false , false , false , false , false	] ,	// U   : ����
	[ true  , true  , true  , true  , true 	]	// X   : ���ŷ
];
/**
 *�ʱ�ȭ
 */
function init()
{
	//��ư�ʱ�ȭ
	aButton = [ f.btnAdd, f.btnSave, f.btnDel, f.btnCancel, fQuery.btnSearch ];

	//����ü�ʱ�ȭ
	aForms = [ f.corp_nm, f.rmk ];

	//�׸����ʱ�ȭ
	oGrid = document.getElementById(SELECT_ID);

	//ȭ���ʱ�ȭ
	setReset();

	//�ʱ���ȸ
	//query();
}
/**
 * ȭ���ʱ�ȭ
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
	 	gsCurrow  = nRow;
	 	gsCurGrid = id;
	 	gsCurKey  = oGrid.GetCellValue("corp_seq", nRow);
		setMode("U",f);
		setDisabledObj(aForms ,false);
		showDetailByWise(id, nRow, f);
	}
}
/**
 * ��Ϲ�ưŬ��
 */
function add()
{
	setMode("A",f);
	setDisabledObj(aForms ,false);
	clear(f);
	f.corp_seq.value      = "";//hidden
}
/**
 * ��ҹ�ưŬ��
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
 * �����ưŬ��
 */
function save()
{
	if ( getValidation(f, true) == false ) {return;}
	if      (gsXaFlag == "A"){ insert(); }
	else if (gsXaFlag == "U"){ checkUsing("UPDATE"); }
}
/**
 * ���� ��ȸ
 * sMode : ����, ���� ���а�
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
 * ���� ����ۼ�
 * sDataSet : ���� DataSet
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

	var sMessage = "�򰡰�ȹ���� ������� �����Դϴ�.\n\n";
	sMessage    += "�� �򰡰�ȹ�� (�� "+nTotCnt+"��) ��\n";
	sMessage    += "----------------------------------------\n";
	sMessage    += sTempNm;
	sMessage    += "----------------------------------------\n\n";
	*/

	var nTotCnt   = DataSet.getParam(SELECT_ID_CHK, 1, 0, "cnt");
	var nMtncCnt  = DataSet.getParam(SELECT_ID_CHK, 1, 0, "mtnc_cnt");
	var nPrjCnt   = DataSet.getParam(SELECT_ID_CHK, 1, 0, "prj_cnt");

	var sMessage = "�� ������� ��ü �Դϴ�. ��\n\n";
	sMessage    += "-------------------------------\n";
	if(parseInt(nPrjCnt)>0)
	{
		sMessage    += "(������Ʈ������ ��� : "+nPrjCnt+"��)\n";
	}
	if(parseInt(nMtncCnt)>0)
	{
		sMessage    += "(�������������� ��� : "+nMtncCnt+"��)\n";
	}

	sMessage += "\n";
	return sMessage;
}
/**
 * ����
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
 * �������ݹ�
 * svcid  : ����ID
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
 * ���
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
 * �������ݹ�
 * sSvcId  : ����ID
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
 * ������ưŬ��
 */
function del()
{
	checkUsing("DELETE");
}
/**
 * ����
 */
function deleteList()
{
//	if(DataSet.getTotalCount(SELECT_ID_CHK) > 0)
	if(parseInt(DataSet.getParam(SELECT_ID_CHK,1,0,"cnt")) > 0)
	{
		var sMessage = makeUsingList(SELECT_ID_CHK);
	//	MessageBox("PRJDeleteMTNC", "I",sMessage);	//���� �������� ��û���� �����ϼ���.
		MessageBox("", "I", sMessage + "���� ���ó�� ������ �ּ���." );
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
 * �������ݹ�
 * sSvcId : ����ID
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