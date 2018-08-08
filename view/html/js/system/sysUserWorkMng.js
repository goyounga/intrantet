/**
 * PROJECT : INTRANET
 * NAME    : sysUserWorkMng.js
 * DESC    : �ٹ�����
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

var SELECT_ID_ORG 	= "UCSYS091S";	//�����������
var SELECT_ID     	= "UCSYS092S";	//����ڸ��
var UPDATE_ID_WORK	= "UCDAS071U";	//�����η���Ȳ
var aForms1        	= null; 		//�ٹ�����-����ü��1
var aForms2        	= null; 		//�ٹ�����-����ü��2
var oGrid     	  	= "";           //������������Ʈ
var gsCurrow      	= -1;			//���÷ο�
var gsCurGrid     	= "";			//���ñ׸���
var gsCurKey     	= "";			//���õȰ���Ű, �׸������ �����ĺ�Ű�̴�.
var gsQueryFrom		= "";			//���������� ��ȸ�� ��Ʈ
var gsQueryVal		= "";			//���������� ��ȸ�� ��
var gsXaFlag      	= "";			//ȭ�����
var aButton       	= null;			//��ư�迭
var aBtnMode      	=				//��ư���
[
	//����	, ����muti, ��ȸ	//��ư / ����
	[ true  , true  , false	] ,	// I   : �ʱ�ȭ
	[ false , true  , false	] ,	// A   : ���-������
	[ false , false , false	] ,	// U   : ����
	[ true  , true  , true 	]	// X   : ���ŷ
];
/**
 *�ʱ�ȭ
 */
function init()
{
	//��ư�ʱ�ȭ
	aButton = [ f.btnSave, f.btnSaveMulti, fQuery.btnSearch ];

	//����ü�ʱ�ȭ
	aForms1 = [ f.in_offc_stat[0] , f.in_offc_stat[1] ];
	aForms2 = [ f.rtn_scdl   , f.work_scdl, f.work_rmk ];

	//�׸����ʱ�ȭ
	oGrid = document.getElementById(SELECT_ID);
	oGrid.SetColCellFontBold("user_nm","true");

	//ȭ���ʱ�ȭ
	setReset();

	//�ʱ���ȸ
	//query();
	queryOrgTree();
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
	f.work_type_cd[0].checked = false;
	f.work_type_cd[1].checked = false;
	f.work_type_cd[2].checked = false;
	setOfficeWork( "INIT" );
	clear(f);//selectbox, input-text, textarea
	f.user_id.value = "";//hidden
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
 * ������ ��ȸ
 */
function queryOrgTree()
{
	var tran = new Trans();
	tran.setPageRow(-1);
	tran.setSvc(SELECT_ID_ORG);
	tran.setDefClick("true");		//������ treeClick �ƴϰ� showDetailO_obj�� ȣ���Ѵ�.
	tran.setWiseGrid("1");
	tran.setForwardId("wgdsl","");
	tran.setCallBack("callbackQueryOrgTree");
	setMode("X", f);
	tran.open("fQuery","f","/wisegrid.do");
}
/**
 * ������ ��ȸ�ݹ�
 * svcid  : ����ID
 */
function callbackQueryOrgTree(sSvcId)
{
	setMode("I", f);
	query();
}
/**
 * Ʈ�� Ŭ��
 * id           : Ŭ���� �׸��尴üID
 * strTreeKey   : �ش� �ο��� key�� NodeKey
 * strArea      : Ŭ���� ����(text, image, back)
 */
function treeClick(id, strTreeKey, strArea)
{
	if( id == SELECT_ID_ORG)
	{
		if(strTreeKey == "ROOT")
		{
			query("TREE","");
		}else{
			query("TREE",strTreeKey);
		}
	}
}
/**
 * ��ȸ
 */
function query(aFrom, val)
{
	if(aFrom!="TREE")
	{
		if ( getValidation(fQuery, true) == false ) {return;}
	}
	var sFromForm = "";
	var tran = new Trans();
	tran.setPageRow("9999");
	tran.setSvc(SELECT_ID);
	tran.setDefClick("true");
	tran.setWiseGrid("1");
	tran.setForwardId("wgdsl","");
	tran.setCallBack("callbackQuery");
	if(aFrom=="TREE")
	{
		tran.setUserParams("org_cd="+val);
		sFromForm   = "";
		gsQueryFrom	= "TREE";
		gsQueryVal	= val;
	}else{
		sFromForm   = "fQuery";
		gsQueryFrom	= "";
		gsQueryVal	= "";
	}
	tran.open(sFromForm,"f","/wisegrid.do");
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
	 	gsCurKey  = oGrid.GetCellValue("user_id", nRow);
		setMode("U",f);

		showDetailByWise(id, nRow, f);

		setDisabledObj(aForms1, true);
		setDisabledObj(aForms2, true);

		if( getArrayData(f.work_type_cd, "value")=="01" )
		{
			setDisabledObj(aForms1, false);

			if( getArrayData(f.in_offc_stat, "value")=="02" )
			{
				setDisabledObj(aForms2, false);
			}
		}
	}
}
/**
 * �ٹ����� üũ�ڽ� ����
 */
function work_type_cd_onClick(obj)
{
	if(obj.checked)
	{
		for(var i=0; i<f.work_type_cd.length; i++)
		{
			if(f.work_type_cd[i]!=obj)
			{
				f.work_type_cd[i].checked = false;
			}
		}
	}
	else
	{
		obj.checked = true;
	}

	setOfficeWork( obj.value );
}
/**
 * �ٹ�����ȭ�� ��Ʈ��
 */
function setOfficeWork( val )
{
	if(val=="01")
	{
		if(aForms1[0].disabled == true)
		{
			setDisabledObj(aForms1, false);
			aForms1[0].checked = true;
		}
	}
	else
	{
		setDisabledObj(aForms1, true);
		setDisabledObj(aForms2, true);

		for(var i=0; i<aForms1.length; i++)
		{
			aForms1[i].checked = false;
		}
		for(var j=0; j<aForms2.length; j++)
		{
			aForms2[j].value = "";
		}
	}
}
/**
 * ��ǿ��� ���� ����
 */
function in_offc_stat_onClick( val )
{
	if(val=="01")
	{
		setDisabledObj(aForms2, true);
		for(var j=0; j<aForms2.length; j++)
		{
			aForms2[j].value = "";
		}
	}
	else
	{
		setDisabledObj(aForms2, false);
	}
}
/**
 * �ٹ����� ����
 */
function saveWork()
{
	var bFlg = false;
	for(var i=0; i<f.work_type_cd.length; i++)
	{
		if(f.work_type_cd[i].checked == true)
		{
			bFlg = true;
			break;
		}
	}

	if(!bFlg)
	{
		MessageBox("", "I","�ٹ������� �������ּ���.");
		return;
	}

	if(f.work_type_cd[0].checked == true)
	{
		var bFlg2 = false;
		for(var i=0; i<aForms1.length; i++)
		{
			if(aForms1[i].checked == true)
			{
				bFlg2 = true;
				break;
			}
		}
		if(!bFlg2)
		{
			MessageBox("", "I","��ǿ��θ� �������ּ���.");
			return;
		}
	}

	if ( !MessageBox("SavConfirm", "C", "") ) {return;}

	var tran = new Trans();
	tran.setSvc(UPDATE_ID_WORK);
	tran.setUserParams("mdf_id="+f.userid.value);
	tran.setCallBack("callbacksaveWork");
	tran.open("f","f","/common.do");
}
/**
 * �ٹ����� ���� �� �ݹ�
 */
function callbacksaveWork(sSvcId)
{
	if (parseInt(DataSet.getParam(sSvcId, 1, 0, "SUCCESS_COUNT"),10) > 0)
	{
		gsCurrow = findGridRow(oGrid, "user_id", gsCurKey);
		updateWiseGridRow(gsCurGrid, gsCurrow, f);
		setMode("U", f);
	}
}
/**
 * �ٹ����� �ϰ�����
 */
function saveWorkMulti()
{
	var batchData = new Array();
	var sParam 	  = "";
	var index 	  = 0;
	var nRowCount = oGrid.GetRowCount();

	for( var i=0; i<nRowCount; i++ )
	{
		if( oGrid.GetCellHiddenValue("CRUD", i)=="U" )
		{
			batchData[index]  = "&work_type_cd="	+ GetGridComboValue(oGrid, "work_type_cd", i );
			batchData[index] += "&in_offc_stat="	+ GetGridComboValue(oGrid, "in_offc_stat", i );
			batchData[index] += "&work_scdl="		+ oGrid.GetCellValue( "work_scdl"	  	 , i );
			batchData[index] += "&rtn_scdl="		+ oGrid.GetCellValue( "rtn_scdl"	  	 , i );
			batchData[index] += "&work_rmk="		+ oGrid.GetCellValue( "work_rmk"	  	 , i );
			batchData[index] += "&user_id="			+ oGrid.GetCellValue( "user_id"	         , i );
			batchData[index] += "&mdf_id="			+ f.userid.value;
			sParam += batchData[index];
			index++;
		}
	}

	if(index<1){MessageBox("", "I", "������ �׸��� �����ϴ�.");return;}
	if( !MessageBox("SavConfirm", "C", "") ){return;}

	var tran = new Trans();
	tran.setUserParams(sParam);
	tran.setSvc(UPDATE_ID_WORK);
	tran.setCallBack("callbackSaveWorkMulti");
	setMode("X", f);
	tran.open("","f","/common.do");
}
/**
 * �������ݹ�
 * svcid  : ����ID
 */
function callbackSaveWorkMulti(sSvcId)
{
	if (parseInt(DataSet.getParam(sSvcId, 1, 0, "SUCCESS_COUNT"),10) > 0)
	{
		setMode("U", f);
		query(gsQueryFrom,gsQueryVal);
	}
}