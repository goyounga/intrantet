/**
 * PROJ : Nexfron Intranet
 * NAME : hldHolidaySnc.js
 * DESC : �ް�����
 * Author : ��â�� ����
 * VER  : 1.0
 * Copyright 2009 Nexfron All rights reserved
 * ============================================================================================
 * 								��		��		��		��
 * ============================================================================================
 * VERSION		DATE		AUTHOR		DESCRIPTION
 * ============================================================================================
 * 1.0		2009.06.18		��â��		�����ۼ�
 * 1.1		2009.08.14		������		�ּ��߰�
 */

var SELECT_SERVICE_01 	= "UCHLD030S";	//�ް���û����
var SELECT_SERVICE_02	= "UCHLD032S";
var SELECT_SERVICE_03	= "UCHLD020S";
var UPDATE_SERVICE_01	= "UCHLD030U,UCHLD031U,UCHLD032U";
var INSERT_SERVICE_03	= "UCSMS002I";		//SMS�߼� - �ް�������
/**
*	ȭ�� �ε�
* author  lee,chang-uk
* since   2009/06/22
*/
function on_Load()
{
	//�ش��������� ����,��Ʈ��,�����ڸ� ���ٴ� �����Ͽ� ��Ʈ���� ���ΰ�������ȸ
	if(fQuery.gradecd.value == "06") //��Ʈ��
	{
		fQuery.q_sign_obj.disabled = true;
	}
	else
	{
		fQuery.q_sign_obj.disabled = false;
	}

	//document.all(SELECT_SERVICE_01).SetColFix('sign_prgs_stts_cd');

//	initPeriod();
	searchSignList();
}

/**
* ��ȸ �Ⱓ �ʱ�ȭ
* author  lee,chang-uk
* since   2009/06/18
*/
function initPeriod()
{
	fQuery.q_date_from.value = getUserDate(-30, "-");
	fQuery.q_date_to.value = getUserDate(0, "-");
}

/**
* �ʱ�ȭ
* author  lee,chang-uk
* since   2009/06/18
*/
function on_Init()
{
	document.all(SELECT_SERVICE_01).RemoveAllData();
	document.all(SELECT_SERVICE_02).RemoveAllData();

	fQuery.reset();
	f0.reset();
	f1.reset();

	initPeriod();
}

/**
* �ް� ��û ���� ��ȸ
* author  lee,chang-uk
* since   2009/06/24
*/
function searchSignList()
{
	if( getValidation(fQuery, true) == false ) return false;
	/*
	var g_Obj = document.all(SELECT_SERVICE_01);
		g_Obj.setParam("cntc_tel_no_format", "TEL");
	*/
	if( fQuery.q_sign_obj.value == "01" )
	{
		fQuery.q_sign_id.value = fQuery.q_user_id.value;
	}
	else
	{
		fQuery.q_sign_id.value = "";
	}

	var trans = new Trans();
	trans.setPageRow(-1);
	trans.setSvc(SELECT_SERVICE_01);
	trans.setDefClick(true);
	trans.setWiseGrid("1");
	trans.setForwardId("wgdsl","");
	trans.setCallBack("callbackSearchSignList");
	trans.open("fQuery","f","/wisegrid.do");
}
/**
 * �ݹ� : �ް���û������ȸ
 * svcid:���񽺾��̵�
 */
function callbackSearchSignList(svcid)
{
	if(DataSet.isError(svcid) == "true") return;

	if( DataSet.getTotalCount(svcid) <= 0 )
	{
		f0.reset();
		f1.reset();

		document.all(SELECT_SERVICE_01).RemoveAllData();
		document.all(SELECT_SERVICE_02).RemoveAllData();
	}

	if( fQuery.q_sign_obj.value == "01" )
	{
		document.all("btnSave").disabled = false;
	}else{
		document.all("btnSave").disabled = true;
	}
}
/**
 * �ް����� ����
 */
function saveSign()
{
	if( getValidation(f, true) == false ) return false;

	var g_Obj = document.all(SELECT_SERVICE_01);
	var nRow  = g_Obj.GetActiveRowIndex();

	if( nRow < 0 )
	{
		MessageBox("","I","���õ� �����Ͱ� �������� �ʽ��ϴ�.");
		return;
	}
	//SYS019:�����������-01:��û(1����������), 02:2����������, 03:3����������, 04:����, 05:�ݷ�, 06:�ӽ�����
	var s_PrgsStts = g_Obj.GetCellHiddenValue("sign_prgs_stts_cd", nRow);

	if( Number(s_PrgsStts) > 3 )
	{
		MessageBox("","I","[����],[�ݷ�]���´� ������ �Ұ��� �մϴ�.");
		return;
	}

	if(( g_Obj.GetCellValue("alnc", nRow) == "0" )
	 &&( g_Obj.GetCellValue("rtn" , nRow) == "0" ))
	{
		MessageBox("","I","[����] Ȥ�� [�ݷ�]�� �����ϼ���.");
		return;
	}

	if(( g_Obj.GetCellValue("alnc", nRow) == "1")
	 &&( g_Obj.GetCellValue("rtn" , nRow) == "1"))
	{
		MessageBox("","I","[����] Ȥ�� [�ݷ�] �ϳ��� �����ϼ���.");
		return;
	}

	var now_sign_stg_cd = -1;
	var send_mode = "";

	if( g_Obj.GetCellValue("alnc", nRow) == "1" )
	{
		f1.alnc_rtn.value = "A";

		var sign_stg_cd = g_Obj.GetCellHiddenValue("sign_stg_cd", nRow);//���� ����ܰ�
		now_sign_stg_cd = g_Obj.GetCellValue("now_sign_stg_cd", nRow);	//���� ����ܰ�

		if(sign_stg_cd==now_sign_stg_cd)
		{
			send_mode = "APPROVAL";
		}else{
			send_mode = "REQUEST";
			now_sign_stg_cd = (parseInt(now_sign_stg_cd,10)+1);
		}
	}
	else if( g_Obj.GetCellValue("rtn" , nRow) == "1" )
	{
		f1.alnc_rtn.value = "R";
		send_mode = "REJECT";
	}

	if( !MessageBox("","C", (f1.alnc_rtn.value=="A"?"����":"�ݷ�")+" �Ͻðڽ��ϱ�?" )) return;

	var trans = new Trans();
//	trans.setSvc(UPDATE_SERVICE_01);
	trans.setSvc(UPDATE_SERVICE_01+","+INSERT_SERVICE_03);
	trans.setMyUserParams("send_mode"		, send_mode);		//sms	���� �޽��� ����-��û:REQUEST,����:APPROVAL,�ݷ�:REJECT
	trans.setMyUserParams("now_sign_stg_cd"	, now_sign_stg_cd);	//sms	������ �����ܰ�
	trans.setMyUserParams("saveflag" 		, "UPDATE");		//sms	UPDATE
	trans.setCallBack("callbackSaveSign");
	trans.open("f1","f1","/common.do");
}
/**
 * �ݹ� : �ް���������
 * svcid:���񽺾��̵�
 */
function callbackSaveSign(svcid)
{
	if(DataSet.isError(svcid) == "true") return;

	if( parseInt(DataSet.getParam("UCHLD032U", 1, 0, "SUCCESS_COUNT"),10) > 0 )
	{
		searchSignList();
	}
}
/**
* �׸��� Ŭ���� �� ������ �����ش�.
* author  lee,chang-uk
* since   2009/06/18
*/
function showDetailO_obj(id, strColumnKey, nRow)
{
	var g_Obj = document.all(SELECT_SERVICE_01);

	showDetailByWise(id, g_Obj.GetActiveRowIndex(), f1);

	searchDetail();
}
/**
* ���κ� �ް� ��û ���� ��ȸ
* author  lee,chang-uk
* since   2009/06/24
*/
function searchDetail()
{
	var g_Obj = document.all(SELECT_SERVICE_02);
		g_Obj.setParam("cntc_tel_no_format", "TEL");

	f0.q_bse_y.value 	= f1.bse_y.value;
	f0.q_userid.value 	= f1.hldy_id.value;

	var trans = new Trans();
	trans.setPageRow(-1);
	trans.setSvc(SELECT_SERVICE_02);
	trans.setWiseGrid("1");
	trans.setForwardId("wgdsl","");
	trans.setCallBack("callbackSearchDetail");
	trans.open("f0","f0","/wisegrid.do");
}
/**
 * �ݹ� : ���κ� �ް� ��û ���� ��ȸ
 * svcid:���񽺾��̵�
 */
function callbackSearchDetail(svcid)
{
	if(DataSet.isError(svcid) == "true") return;

	// ���κ� �ް� ���� ��ȸ
	searchHldyInfo();
}
/**
* �ް� ���� ��ȸ
* author  lee,chang-uk
* since   2009/06/24
*/
function searchHldyInfo()
{
	var trans = new Trans();
	trans.setPageRow(-1);
	trans.setDsNotF("false");
	trans.setSvc(SELECT_SERVICE_03);
	trans.setCallBack("callbackSearchHldyInfo");
	trans.open("f0","f0","/common.do");
}
/**
 * �ݹ� : �ް� ���� ��ȸ
 * svcid:���񽺾��̵�
 */
function callbackSearchHldyInfo(svcid)
{
	if( DataSet.getTotalCount(serviceId) <= 0 )
	{
		f0.reset();
	}
}
/**
* ����� ������ �˾�
* author  lee,chang-uk
* since   2009/06/18
*/
function openUserOrg()
{
	//Opener �� ������ �������� (form ��ü�� �ѱ��)
	//setOpener(fQuery);

	//openPopup("/jsp/common/comUserOrg.jsp", "UserOrg", 800, 545);

	var cwp = getPopupProperties("", "", "800", "580");

	window.open("/jsp/common/comUserOrg.jsp" ,"UserOrg", cwp);
}

/**
* ���������� ����� ���� ��������
* author  lee,chang-uk
* since   2009/06/18
*/
function setOrgUserInfo(user_id, user_name, user_dept)
{
	fQuery.q_hldy_id.value = user_id;
	fQuery.q_hldy_nm.value = user_name;
}

function clearUser()
{
	fQuery.q_hldy_id.value = "";
	fQuery.q_hldy_nm.value = "";
}