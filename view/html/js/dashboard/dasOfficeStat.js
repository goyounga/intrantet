/**
 * PROJ : Nexfron Intranet
 * NAME : dasOfficeStat.js
 * DESC : ��Ȳ�� - �����η���Ȳ
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
var oGrid             	= "";           //�����η���Ȳ
var SELECT_ID 	      	= "UCDAS031S";	//�����η���Ȳ
//var UPDATE_ID 	      	= "UCDAS071U";	//�����η���Ȳ
//var aForms1        		= null; 		//����ü��1
//var aForms2        		= null; 		//����ü��2
/**
 *�ʱ�ȭ
 */
function init()
{
	//aForms1 = [ f.in_offc_stat[0] , f.in_offc_stat[1] ];
	//aForms2 = [ f.rtn_scdl   , f.work_scdl, f.work_rmk ];
	oGrid  = document.getElementById(SELECT_ID);
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
	tran.open("", "f","/wisegrid.do");
}
/**
 * �ٹ����� üũ�ڽ� ����

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
}*/

/**
 * �ٹ�����ȭ�� ��Ʈ��

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
}*/
/**
 * ��ǿ��� ���� ����

function in_offc_stat_onClick( obj )
{
	if(obj.value=="01")
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
}*/
/**
 * �ٹ����� ����

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
	tran.setSvc(UPDATE_ID);
	tran.setCallBack("callbacksaveWork");
	tran.open("f","f","/common.do");
}*/

/**
 * �ٹ����� ���� �� �ݹ�

function callbacksaveWork()
{
	if (DataSet.getParam(UPDATE_ID, 1, 0, "SUCCESS_COUNT") > 0)
	{
		MessageBox("InfSuccess", "I", "");
	}
	else
	{
		MessageBox("InfFail", "E", "");
	}
}*/