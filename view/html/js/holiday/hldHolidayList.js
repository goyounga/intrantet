/**
 * PROJ : Nexfron Intranet
 * NAME : hldHolidayList.js
 * DESC : �ް� ��û/��ȸ
 * Author : ���ر� ����
 * Copyright 2009 Nexfron All rights reserved
 * ============================================================================================
 * 								��		��		��		��
 * ============================================================================================
 * VERSION		DATE		AUTHOR		DESCRIPTION
 * ============================================================================================
 * 1.0		2012.03.20		���ر�		�����ۼ�
 */
var oGrid;									//�ް���û����
var arrObj;									//����ü�迭
var G_HLDINFO = new Array();				// �� �ް� ����
var SELECT_SERVICE_0101 = "UCHLD020S_1";	//�ް������ϼ���ȸ
var SELECT_SERVICE_02 	= "UCHLD021S";		//�ް���û���� GRID
var SELECT_SERVICE_03 	= "UCHLD022S";		//�� �ް� ����,�ϼ� ��ȸ
var INSERT_SERVICE_01	= "UCHLD021I";		//�ް����
var INSERT_SERVICE_02	= "UCSYS044I";		//�ް�������
var INSERT_SERVICE_03	= "UCSMS002I";		//SMS�߼� - �ް�������
var DELETE_SERVICE_01	= "UCHLD021D";		//�ް�����
var UPDATE_SERVICE_01	= "UCHLD021U";		//�ް�����
//var UPDATE_SERVICE_02	= "UCHLD022U";		//�ް�������� -������
//var UPDATE_SERVICE_02	= "UCHLD023U";		//�ް�������� - ������
//var DELETE_SERVICE_01	= "UCHLD022D";		//�ް�������� - ������
var SELECT_SERVICE_04 	= "UCHLD023S";		//���ް����� GRID

/**
 * init
 */
function init()
{
	oGrid = document.getElementById(SELECT_SERVICE_02);
	arrObj = new Array (  f1.bse_y		 , f1.hldy_knd_seq , f1.strt_dt , f1.end_dt
						, f1.cntc_tel_no , f1.hldy_plc     , f1.prj_seq , f1.hldy_rsn );
	setMode("I");
	initPeriod();
	searchHldyInfo();
}
/**
 * ��ȸ �Ⱓ �ʱ�ȭ
 */
function initPeriod()
{
	fQuery.strt_q_date.value = fQuery.thisYear.value + "-01-01";
	fQuery.end_q_date.value  = getUserDate(0, "-");
}
/**
 * �ް� ���� ��ȸ
 */
function searchHldyInfo()
{
	fQuery.q_bse_y.value = removeMask(fQuery.strt_q_date.value).substr(0,4);

	var trans = new Trans();
	trans.setPageRow(-1);
	trans.setSvc(SELECT_SERVICE_0101);
	//trans.setSvc(SELECT_SERVICE_04+","+SELECT_SERVICE_02+","+SELECT_SERVICE_0101);
	//trans.setWiseGrid("1,1,0");
	//trans.setForwardId("wgdsl","");
	trans.setCallBack("callbackSearchHldyInfo");
	trans.open("fQuery","fInfo","/common.do");
	//trans.open("fQuery","fInfo","/wisegrid.do");
}
/**
 * �ް� ���� ��ȸ �ݹ�
 * svcid:���񽺾��̵�
 */
function callbackSearchHldyInfo(svcid)
{
	if(DataSet.isError(svcid) == "true") return;

	//setSummaryStyle(document.getElementById(SELECT_SERVICE_04), document.getElementById(SELECT_SERVICE_04).GetRowCount()-1, "")

	// get �� �ް� ����
	var dsHldInfo = DataSet.getParamArrHash(SELECT_SERVICE_0101, 1);

	var aCode 	= new Array();
	var aCodeNm = new Array();
	var aPmtDy 	= new Array();
	var aUseDy 	= new Array();
	var aRmnDy 	= new Array();

	if(dsHldInfo.length > 0)
	{
		for(var i=0; i<dsHldInfo.length; i++)
		{
			var hs = dsHldInfo[i];

			aCode.push(hs.get("bse_y"));
			aCodeNm.push(hs.get("bse_y_nm"));
			aPmtDy.push(hs.get("pmt_dy"));	//����_�ϼ�
			aUseDy.push(hs.get("use_dy"));	//���_�ϼ�
			aRmnDy.push(hs.get("rmn_dy"));	//����_�ϼ�

			if(fQuery.q_bse_y.value == hs.get("bse_y"))
			{
				fInfo.pmt_dy.value = hs.get("pmt_dy");
				fInfo.use_dy.value = hs.get("use_dy");
				fInfo.rmn_dy.value = hs.get("rmn_dy");
			}
		}

		G_HLDINFO = new Array(aCode, aCodeNm, aPmtDy, aUseDy, aRmnDy);	// �ް����� �������� �迭�� ����
		setOptions(fInfo.bse_y_nm, aCode, aCodeNm, false, false);		// �ް� ���س⵵ cbx add option
		fInfo.bse_y_nm.value = fQuery.q_bse_y.value;					// ���� �� ���س⵵ ����⵵��

		searchHldy();
	}
	else
	{
		MessageBox("","I","�ش�⿡ �ް� ������ �������� �ʽ��ϴ�. ���� �ް������� ����ϼ���.");
		setMode("I");
		return;
	}
}
/**
 * �ް���û���� ��ȸ
 */
function searchHldy()
{
	if( getValidation(fQuery, true) == false ) return false;
	if( !checkTermDate(fQuery.strt_q_date, fQuery.end_q_date, true, true, "")) return;

	var trans = new Trans();
	trans.setPageRow(-1);
	trans.setSvc(SELECT_SERVICE_02);
	trans.setDefClick(true);
	trans.setWiseGrid("1");
	trans.setForwardId("wgdsl","");
	trans.setCallBack("callbackSearchHldy");
	trans.open("fQuery","f","/wisegrid.do");
}
/**
 * �ް���û���� ��ȸ �ݹ�
 * svcid:���񽺾��̵�
 */
function callbackSearchHldy(svcid)
{
	if(DataSet.isError(svcid) == "true") return;
	if( DataSet.getTotalCount(svcid) < 1 ) {setMode("I");}
}
/**
 * ���
 */
function regHldy()
{
	setMode("A");
}
/**
 * ���
 */
function canlHldy()
{
	var idx = oGrid.GetActiveRowIndex();
	if (idx == -1)
	{
		setMode(f,"I");
	}else{
		showDetailO_obj(SELECT_SERVICE_02, "hldy_knd_seq", idx);
	}
}
/**
 * �׸��� Ŭ���� �� ������ �����ش�.
 * id           : Ŭ���� �׸��尴üID
 * strColumnKey : Ŭ���� �÷���
 * nRow         : Ŭ����Row Index
 */
function showDetailO_obj(id, strColumnKey, nRow)
{
	showDetailByWise(id, nRow, f1);

	var s_sign_prgs_stts_cd = oGrid.GetCellHiddenValue("sign_prgs_stts_cd", oGrid.GetActiveRowIndex());
	if( s_sign_prgs_stts_cd != "06" )//06:�ӽ�����
	{
		setMode("V");
	}else{
		setMode("U");
	}
}
/**
 * ȭ���� ����
 */
function setMode(sType)
{
	gsXaFlag = sType;

	switch(sType)
	{

		case "I" :	setButtonDisable(f1.btnReg		, false);
					setButtonDisable(f1.btnSave		, true );
					setButtonDisable(f1.btnDelete	, true );
					setButtonDisable(f1.btnCancel	, true );
					setButtonDisable(f1.btnRegSign	, true );
				//	setButtonDisable(f1.btnCanlSign	, true );
					setDisabledObj(arrObj, true);
					clear(f1);
					f1.hldy_seq.value = "";
					break;

		case "A" :	setButtonDisable(f1.btnReg		, true );
					setButtonDisable(f1.btnSave		, false);
					setButtonDisable(f1.btnDelete	, true );
					setButtonDisable(f1.btnCancel	, false);
					setButtonDisable(f1.btnRegSign	, false);
				//	setButtonDisable(f1.btnCanlSign	, true );
					setDisabledObj(arrObj			, false);
					clear(f1);	//f1.reset(); //reset�� ����Ұ�� hidden�� �ڵ����� �ȴ�.
					f1.hldy_seq.value = "";
					f1.bse_y.value = fInfo.bse_y.value;	// pjk���� ����
					break;

		case "U" :	setButtonDisable(f1.btnReg		, false);
					setButtonDisable(f1.btnSave		, false);
					setButtonDisable(f1.btnDelete	, false);
					setButtonDisable(f1.btnCancel	, false);
					setButtonDisable(f1.btnRegSign	, false);
				//	setButtonDisable(f1.btnCanlSign	, true );
					setDisabledObj(arrObj			, false);
					setDisabledObj([f1.bse_y]		, true );
					break;

		case "V" :	setButtonDisable(f1.btnReg		, false);
					setButtonDisable(f1.btnSave		, true );
					setButtonDisable(f1.btnDelete	, true );
					setButtonDisable(f1.btnCancel	, true );
					setButtonDisable(f1.btnRegSign	, true );
					/*var s_sign_prgs_stts_cd = oGrid.GetCellHiddenValue("sign_prgs_stts_cd", oGrid.GetActiveRowIndex());
					if( s_sign_prgs_stts_cd == "04" || s_sign_prgs_stts_cd == "05" )	//04:����,05:�ݷ�
					{
						setButtonDisable(f1.btnCanlSign	, true);
					}else{
						setButtonDisable(f1.btnCanlSign	, false);
					}*/
					setDisabledObj(arrObj, true);
					break;
	}
}
/**
 * �� �ް����� ���س⵵ ����
 */
function chgBseYNm()
{
	var len = G_HLDINFO[0].length;

	for(var i = 0; i<len; i++)
	{
		if(fInfo.bse_y_nm.value == G_HLDINFO[0][i])
		{
			fInfo.pmt_dy.value = G_HLDINFO[2][i];
			fInfo.use_dy.value = G_HLDINFO[3][i];
			fInfo.rmn_dy.value = G_HLDINFO[4][i];
			break;
		}
	}
}
/**
 * ���� ��ư Ŭ�� : �ް�����
 * ������ ��ư Ŭ�� : arg : Y
 */
function saveHldy(arg)
{
	if( f1.hldy_knd_seq.value=="25" )
	{
		var str = "---------------------------------------------\n";
		str +=    "               �ް� �������Դϴ�.\n";
		str +=    "---------------------------------------------\n\n";
		str +=    "�����ִ� '�����ް�'�� ���� ��û ���ּ���.\n";
		MessageBox("","I",str);
		return;
	}
	
	if( gsXaFlag == "U" && f1.hldy_seq.value == "" )
	{
		MessageBox("","I","������ �����Ͱ� �������� �ʽ��ϴ�.");
		return;
	}

	if( getValidation(f1, true) == false ) return;
	if( !checkTermDate(f1.strt_dt, f1.end_dt, true, true, "")) return;

	//---�̹� ȭ��� ��ư�� �����־ ������ �̺κ��� üũ ���� �ʾƵ� �ȴ�
	if( gsXaFlag == "U" && oGrid.GetRowCount() > 0 )
	{
		var s_sign_prgs_stts_cd = oGrid.GetCellHiddenValue("sign_prgs_stts_cd", oGrid.GetActiveRowIndex());

		if( s_sign_prgs_stts_cd != "06" )
		{
			MessageBox("", "I", "���簡 �̹� ����Ǿ� ���� �� �� �����ϴ�.");
			return;
		}
	}
	//---------------------------------------------------------------------------//

	var trans = new Trans();
	trans.setSvc(SELECT_SERVICE_03);//�ް��ϼ� ��ȸ
	trans.setCallBack("callbackSaveHldy('"+SELECT_SERVICE_03+"','"+arg+"')");
	trans.open("f1","f1","/common.do");
}
/**
 * �ݹ� - ���� ��ư Ŭ�� : �ް�����
 * svcid : service id
 * arg   : �����ſ��� Y/N
 */
function callbackSaveHldy(svcid, arg)
{
	if(DataSet.isError(svcid) == "true") return;

	var i_rmn_dy  = parseFloat(fInfo.rmn_dy.value);										// pjk �ް� �ܿ� �ϼ� - ���߿� �ǽð� ������ ����
	if (DataSet.getParam(SELECT_SERVICE_03, 1, 0, "ddct_f_cd") == 'N')
	{
		i_rmn_dy = parseFloat(DataSet.getParam(SELECT_SERVICE_03, 1, 0, "hldy_posb_dy"));	
	}
	var i_hldy_dy = parseFloat(DataSet.getParam(SELECT_SERVICE_03, 1, 0, "hldy_dy"));	// ���� �ް� �ϼ�
	var msg2	  = "";
	var msg		  = "";
	msg += "�ް���û�ϼ� : " + i_hldy_dy + " ��\n";
	msg += "�ް��ܿ��ϼ� : " + i_rmn_dy  + " ��\n\n";

	if( (i_rmn_dy - i_hldy_dy) < 0 )
	{
		msg2 = "�ް� ��û�ϼ��� �ް� �ܿ��ϼ� ���� �����ϴ�.\n";
		msg2 += "--------------------------\n";
		msg2 += msg;
		if( !MessageBox("","E",msg2) ) return;
	}

	if(arg=="Y")	//�����ſ���
	{
		msg2 += "\n�����û �Ͻðڽ��ϱ�?\n";
	}else{
		msg2 += "\n�ް������� ���� �Ͻðڽ��ϱ�?\n";
	}
	msg2 += "--------------------------\n";
	msg2 += msg;

	if( !MessageBox("","C",msg2) ) return;

	saveHldyInfo(arg);
}
/**
 * �ް�����
 * arg   : �����ſ��� Y/N
 */
function saveHldyInfo(arg)
{
	var svcId 		= "";	//���񽺾��̵�
	var sCallbackId = "";	//�ݹ�޼���
	var sqlFlag 	= "";	//SQL����
	var sqlId       = "";
	if( gsXaFlag == "U" )
	{
		svcId 		= UPDATE_SERVICE_01;
		sqlId       = f1.hldy_seq.value;
		sCallbackId = "callbackSavehldyinfoUpdate()";
		sqlFlag 	= "UPDATE";
	}
	else //if( gsXaFlag == "A" )
	{
		svcId 		= INSERT_SERVICE_01;
		sqlId       = "IDENT_CURRENT('UC_HLDY')";
		sCallbackId = "callbackSavehldyinfoInsert";
		sqlFlag 	= "INSERT";
	}

	if(arg=="Y"){svcId += (","+INSERT_SERVICE_02 + "," + INSERT_SERVICE_03);}	//�����϶�

	var trans = new Trans();
	trans.setSvc(svcId);
	trans.setMyUserParams("saveflag",sqlFlag);
	trans.setMyUserParams("id", sqlId);
	trans.setMyUserParams("sign_tp_cd", "01");
	trans.setMyUserParams("send_mode","REQUEST");	//���� �޽��� ����-��û:REQUEST,����:APPROVAL,�ݷ�:REJECT
	trans.setMyUserParams("now_sign_stg_cd","1");	//SMS�� - ����ܰ�
	trans.setCallBack(sCallbackId);
	trans.open("f1","f1","/common.do");
}
/**
 * �ݹ� - �ް����� - ���
 * svcid : service id
 */
function callbackSavehldyinfoInsert(svcid)
{
	if(DataSet.isError(svcid) == "true") return;

	if( parseInt(DataSet.getParam(INSERT_SERVICE_01, 1, 0, "SUCCESS_COUNT"),10) > 0 )
	{
		var msg = ""
		if(svcid==INSERT_SERVICE_01)
		{
			msg = "����Ǿ����ϴ�.\n\n(�������� ��û�ؾ� ���� �ް���û�� ����˴ϴ�.)";
		}else{
			msg = "�ް���û ���簡 ��û �Ǿ����ϴ�.";
		}
		MessageBox("", "I", msg);
		searchHldy();
	}
}
/**
 * �ݹ� - �ް����� - ����
 * svcid : service id
 */
function callbackSavehldyinfoUpdate(svcid)
{
	if(DataSet.isError(svcid) == "true") return;

	if( parseInt(DataSet.getParam(UPDATE_SERVICE_01, 1, 0, "SUCCESS_COUNT"),10) > 0 )
	{
		var msg = ""
		if(svcid==UPDATE_SERVICE_01)
		{
			msg = "����Ǿ����ϴ�.\n\n(�������� ��û�ؾ� ���� �ް���û�� ����˴ϴ�.)";
		}else{
			msg = "�ް���û ���簡 ��û �Ǿ����ϴ�.";
		}
		MessageBox("", "I", msg);
		searchHldy();
	}
}
/**
 * �ް� ����
 */
function deleteHldy()
{
	if( gsXaFlag == "U" && f1.hldy_seq.value == "" )
	{
		MessageBox("","I","������ �����Ͱ� �������� �ʽ��ϴ�.");
		return;
	}
	/*
	var s_sign_prgs_stts_cd = oGrid.GetCellHiddenValue("sign_prgs_stts_cd", oGrid.GetActiveRowIndex());


	if( Number(s_sign_prgs_stts_cd) > 1 && Number(s_sign_prgs_stts_cd) < 4 )
	{
		alert("���� ������ ������ �� �����ϴ�.");
		return;
	}
	else if( Number(s_sign_prgs_stts_cd) == 4 )
	{
		alert("���� �Ϸ���� ������ �� �����ϴ�.");
		return;
	}
	*/

	if( !MessageBox("DelConfirm", "C", "") ){return;}
	var trans = new Trans();
	trans.setSvc(DELETE_SERVICE_01);
	trans.setMyUserParams("hldy_seq",f1.hldy_seq.value);
	trans.setCallBack("callbackDeleteHldy");
	trans.open("","","/common.do");
}
/**
 * �ݹ� - �ް� ����
 * svcid : service id
 */
function callbackDeleteHldy(svcid)
{
	if(DataSet.isError(svcid) == "true") return;

	if( parseInt(DataSet.getParam(DELETE_SERVICE_01, 1, 0, "SUCCESS_COUNT"),10) > 0  )
	{
		searchHldy();
	}
}
/**
 * ���������

function canlSignReq()
{
	if( gsXaFlag == "UPDATE" && f1.hldy_seq.value == "" )
	{
		alert("���õ� �����Ͱ� �������� �ʽ��ϴ�.");
		return;
	}

	if( gsXaFlag == "UPDATE" && oGrid.GetRowCount() > 0 )
	{
		var s_sign_prgs_stts_cd = oGrid.GetCellHiddenValue("sign_prgs_stts_cd", oGrid.GetActiveRowIndex());

		if(  Number(s_sign_prgs_stts_cd) < 4 )
		{
			alert("���� �������Դϴ�. ����� �� �����ϴ�.");
			return;
		}
		else if( Number(s_sign_prgs_stts_cd) == 4 )
		{
			alert("���� �Ϸ� �����Դϴ�. ����� �� �����ϴ�.");
			return;
		}
		else if( Number(s_sign_prgs_stts_cd) == 5 )
		{
			alert("���� ��� �����Դϴ�.");
			return;
		}
	}

	var trans = new Trans();
	trans.setSvc(UPDATE_SERVICE_02);
	trans.setCallBack("callbackCanlSignReq");
	trans.open("f1","f1","/common.do");
}
 */
/**
 * �ݹ� - ���������
 * svcid : service id

function callbackCanlSignReq(svcid)
{
	if(DataSet.isError(svcid) == "true") return;

	if( parseInt(DataSet.getParam(svcid, 1, 0, "SUCCESS_COUNT"),10) > 0 )
	{
		searchHldy();
	}
}
*/