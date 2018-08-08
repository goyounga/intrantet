/**
 * PROJ : Nexfron Intranet
 * NAME : dasMtncStat.js
 * DESC : ��Ȳ�� - ������Ʈ��Ȳ
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
var SELECT_ID 	    = "UCPRJ034S";	//������Ʈ��Ȳ

var SELECT_ID_2		= "UCPRJ035S";	//��������
var INSERT_ID_2		= "UCPRJ035I";	//�������� ���
var UPDATE_ID_2	= "UCPRJ035U";	//�������� ����
var DELETE_ID_2		= "UCPRJ035D";	//�������� ����

var SELECT_ID_3		= "UCPRJ036S";	//�۾�����
var INSERT_ID_3		= "UCPRJ036I";	//�۾����� ���
var UPDATE_ID_3	= "UCPRJ036U";	//�۾����� ����
var DELETE_ID_3		= "UCPRJ036D";	//�۾����� ����

var SELECT_ID_4		= "UCPRJ037S";	//�������������
var INSERT_ID_4		= "UCPRJ037I";	//������������� ���
var UPDATE_ID_4	= "UCPRJ037U";	//������������� ����
var DELETE_ID_4		= "UCPRJ037D";	//������������� ����

var SELECT_ID_CODE 	= "UCPRJ012S";	//�ڵ� DataSet

var gaCode 			  	= new Array();	//�ڵ� Array

var MERGE_ID = "UCPRJ034U";

var oGrid1;
var oGrid2;
var oGrid3;

/**
 *�ʱ�ȭ
 */
function init()
{
	initMode();

	oGrid1  = document.getElementById(SELECT_ID_2);
	oGrid2  = document.getElementById(SELECT_ID_3);
	oGrid3  = document.getElementById(SELECT_ID_4);

	oGrid1.bStatusbarVisible = false;
	oGrid2.bStatusbarVisible = false;
	oGrid3.bStatusbarVisible = false;
	
	queryList();
}

/**
 * �ʱ� ȭ�� ����
 */
function initMode()
{
	//����, �ý���, ��౸��, ���Ⱓ, ��������, ������������
	var disabledObj = new Array(fQuery.clnt_corp_nm, fQuery.mtnc_system_nm, fQuery.mtnc_cost, fQuery.mtnc_date, fQuery.regular_chk, fQuery.mtnc_type)
	setDisabledObj(disabledObj, true);
}

/**
 * ��ȸ
 */
function queryList()
{
	var sParams = "up_cd=PRJ013"
				+ "&mtnc_seq=" + fQuery.mtnc_seq.value;
	
	var tran = new GridTrans();

	tran.setSvc(SELECT_ID+","+SELECT_ID_CODE+","+SELECT_ID_2+","+SELECT_ID_3+","+SELECT_ID_4);
	tran.setWiseGrid("0,0,1,1,1");
	tran.setUserParams(sParams);
	tran.setCallBack("callbackQueryList");
	tran.open("", "fQuery","/wisegrid.do");
}

/**
 * ��ȸ �� �ݹ�
 * sServiceID  : ����ID
 */
function callbackQueryList(sServiceID)
{
	setSystemName();
	
	switch(sServiceID)
	{
		case SELECT_ID+","+SELECT_ID_CODE+","+SELECT_ID_2+","+SELECT_ID_3+","+SELECT_ID_4:
			newRow(SELECT_ID_2);
			newRow(SELECT_ID_3);
			newRow(SELECT_ID_4);
			break;
			
		default:
		break;
	}
}

/**
 * ���Ŭ��
 * id           : Ŭ���� �׸��尴üID
 * strColumnKey : Ŭ���� �÷���
 * nRow         : Ŭ����Row Index
 */
function showDetailO_obj(id, strColumnKey, nRow)
{
	var clickObj = document.all[id];

	if(strColumnKey == "add_del") 
	{
		// �̹��� index ���� if�� --------- �߰� : 0 // ���� : 1
		if(clickObj.GetCellImage("add_del", nRow) == 0) newRow(id);
		else if(clickObj.GetCellImage("add_del", nRow) == 1) removeWiseGridRow(id, nRow);
	}
}

/**
 * addRow ����
 */
function newRow(id)
{
	var newObj = document.all[id];
	newObj.AddRow();
	newObj.SetCellImage("add_del", newObj.GetRowCount()-1, 0);
	
	// ����Ǿ��ִ� ������ ���� ����
	if(newObj.GetRowCount() > 1) newObj.SetCellImage("add_del", newObj.GetRowCount()-2, 1);
}

/**
 * ������ ����row üũ
 */
function chkLastRow(id)
{
	var chkGrid = document.all[id];
	
	var chk = false;
	
	for(var i=1; i<chkGrid.GetColCount(); i++)
	{
//		alert(chkGrid.GetColHDVisibleKey(i) +  ' = ' + chkGrid.GetCellValue(chkGrid.GetColHDVisibleKey(i), chkGrid.GetRowCount()-1))
		if(chkGrid.GetCellValue(chkGrid.GetColHDVisibleKey(i), chkGrid.GetRowCount()-1) != "") chk = true;
	}
	if(!chk) removeWiseGridRow(id, chkGrid.GetRowCount()-1);
	
	return chk;
}

/**
 * �׸��� CRUD�� ���� QUERY ID RETURN
 */
function rtnCRUDSvcId()
{
	chkLastRow(SELECT_ID_2);
	chkLastRow(SELECT_ID_3);
	chkLastRow(SELECT_ID_4);
	
	// �������� crud row �迭
	var insert1 = findRowList(oGrid1, "����", "CRUD");
	var update1 = findRowList(oGrid1, "����", "CRUD");
	var delete1 = findRowList(oGrid1, "����", "CRUD");
	
	// ���α׷�/�������̽�/�۾����� crud row �迭
	var insert2 = findRowList(oGrid2, "����", "CRUD");
	var update2 = findRowList(oGrid2, "����", "CRUD");
	var delete2 = findRowList(oGrid2, "����", "CRUD");
	
	// ��������� crud row �迭
	var insert3 = findRowList(oGrid3, "����", "CRUD");
	var update3 = findRowList(oGrid3, "����", "CRUD");
	var delete3 = findRowList(oGrid3, "����", "CRUD");
	
	var svc_id = "";
	
	if(insert1.length > 0) svc_id += svc_id == "" ? INSERT_ID_2 : "," + INSERT_ID_2;
	if(update1.length > 0) svc_id += svc_id == "" ? UPDATE_ID_2 : "," + UPDATE_ID_2;
	if(delete1.length > 0) svc_id += svc_id == "" ? DELETE_ID_2 : "," + DELETE_ID_2;

	if(insert2.length > 0) svc_id += svc_id == "" ? INSERT_ID_3 : "," + INSERT_ID_3;
	if(update2.length > 0) svc_id += svc_id == "" ? UPDATE_ID_3 : "," + UPDATE_ID_3;
	if(delete2.length > 0) svc_id += svc_id == "" ? DELETE_ID_3 : "," + DELETE_ID_3;

	if(insert3.length > 0) svc_id += svc_id == "" ? INSERT_ID_4 : "," + INSERT_ID_4;
	if(update3.length > 0) svc_id += svc_id == "" ? UPDATE_ID_4 : "," + UPDATE_ID_4;
	if(delete3.length > 0) svc_id += svc_id == "" ? DELETE_ID_4 : "," + DELETE_ID_4;

	// crud ������ ������ ���� ���� param ����
	if(svc_id != "") rtnCRUDParam(insert1, update1, delete1, insert2, update2, delete2, insert3, update3, delete3);
	
	return svc_id;
}

/**
 * �׸��� CRUD QUERY �� param ����
 */
function rtnCRUDParam(insert1, update1, delete1, insert2, update2, delete2, insert3, update3, delete3)
{
	// �������� insert param
	var aPrmKind = new Array();
	var aPrmNm = new Array();
	var aSrvrIp = new Array();
	var aSrvrOs = new Array();
	var aOsCnetInf = new Array();
	var aPrmCnetInf = new Array();
	var aUserId = new Array();
	var aSrvrInfSeq = new Array();
	
	for(var i=0; i<insert1.length; i++)
	{
		var prmKind = oGrid1.GetCellValue("prm_kind", insert1[i]);
		var prmNm = oGrid1.GetCellValue("prm_nm", insert1[i]);
		var srvrIp = oGrid1.GetCellValue("srvr_ip", insert1[i]);
		var srvrOs = oGrid1.GetCellValue("srvr_os", insert1[i]);
		var osCnetInf = oGrid1.GetCellValue("os_cnet_inf", insert1[i]);
		var prmCnetInf = oGrid1.GetCellValue("prm_cnet_inf", insert1[i]);
		var userid = gInfo.user_id.value;
		
		aPrmKind.push(prmKind);
		aPrmNm.push(prmNm);
		aSrvrIp.push(srvrIp);
		aSrvrOs.push(srvrOs);
		aOsCnetInf.push(osCnetInf);
		aPrmCnetInf.push(prmCnetInf);
		aUserId.push(userid);
	}
	
	fQuery.grid1_i_prm_kind.value = makeParamArray(aPrmKind);
	fQuery.grid1_i_prm_nm.value = makeParamArray(aPrmNm);
	fQuery.grid1_i_srvr_ip.value = makeParamArray(aSrvrIp);
	fQuery.grid1_i_srvr_os.value = makeParamArray(aSrvrOs);
	fQuery.grid1_i_os_cnet_inf.value = makeParamArray(aOsCnetInf);
	fQuery.grid1_i_prm_cnet_inf.value = makeParamArray(aPrmCnetInf);
	fQuery.grid1_i_user_id.value = makeParamArray(aUserId);

	// �������� update param
	aPrmKind = new Array();
	aPrmNm = new Array();
	aSrvrIp = new Array();
	aSrvrOs = new Array();
	aOsCnetInf = new Array();
	aPrmCnetInf = new Array();
	aUserId = new Array();
	aSrvrInfSeq = new Array();
	
	for(var i=0; i<update1.length; i++)
	{
		var prmKind = oGrid1.GetCellValue("prm_kind", update1[i]);
		var prmNm = oGrid1.GetCellValue("prm_nm", update1[i]);
		var srvrIp = oGrid1.GetCellValue("srvr_ip", update1[i]);
		var srvrOs = oGrid1.GetCellValue("srvr_os", update1[i]);
		var osCnetInf = oGrid1.GetCellValue("os_cnet_inf", update1[i]);
		var prmCnetInf = oGrid1.GetCellValue("prm_cnet_inf", update1[i]);
		var userid = gInfo.user_id.value;
		var srvrInfSeq = oGrid1.GetCellValue("srvr_inf_seq", update1[i]);
		
		aPrmKind.push(prmKind);
		aPrmNm.push(prmNm);
		aSrvrIp.push(srvrIp);
		aSrvrOs.push(srvrOs);
		aOsCnetInf.push(osCnetInf);
		aPrmCnetInf.push(prmCnetInf);
		aUserId.push(userid);
		aSrvrInfSeq.push(srvrInfSeq);
	}
	
	fQuery.grid1_u_prm_kind.value = makeParamArray(aPrmKind);
	fQuery.grid1_u_prm_nm.value = makeParamArray(aPrmNm);
	fQuery.grid1_u_srvr_ip.value = makeParamArray(aSrvrIp);
	fQuery.grid1_u_srvr_os.value = makeParamArray(aSrvrOs);
	fQuery.grid1_u_os_cnet_inf.value = makeParamArray(aOsCnetInf);
	fQuery.grid1_u_prm_cnet_inf.value = makeParamArray(aPrmCnetInf);
	fQuery.grid1_u_user_id.value = makeParamArray(aUserId);
	fQuery.grid1_u_srvr_inf_seq.value = makeParamArray(aSrvrInfSeq);
	
	// �������� delete param
	aSrvrInfSeq = new Array();
	
	for(var i=0; i<delete1.length; i++)
	{
		var srvrInfSeq = oGrid1.GetCellValue("srvr_inf_seq", delete1[i]);
		
		aSrvrInfSeq.push(srvrInfSeq);
	}
	
	fQuery.grid1_d_srvr_inf_seq.value = makeParamArray(aSrvrInfSeq);
	//////////////////////////// �������� ��
	
	// ���α׷�/�������̽�/�۾����� insert param
	var aPgmLrg = new Array();
	var aPgmMrg = new Array();
	var aPgmNm = new Array();
	var aUserId = new Array();
	var aWorkInfSeq = new Array();
	
	for(var i=0; i<insert2.length; i++)
	{
		var pgmLrg = oGrid2.GetCellValue("pgm_lrg", insert2[i]);
		var pgmMrg = oGrid2.GetCellValue("pgm_mrg", insert2[i]);
		var pgmNm = oGrid2.GetCellValue("pgm_nm", insert2[i]);
		var userid = gInfo.user_id.value;
		
		aPgmLrg.push(pgmLrg);
		aPgmMrg.push(pgmMrg);
		aPgmNm.push(pgmNm);
		aUserId.push(userid);
	}
	
	fQuery.grid2_i_pgm_lrg.value = makeParamArray(aPgmLrg);
	fQuery.grid2_i_pgm_mrg.value = makeParamArray(aPgmMrg);
	fQuery.grid2_i_pgm_nm.value = makeParamArray(aPgmNm);
	fQuery.grid2_i_user_id.value = makeParamArray(aUserId);

	// ���α׷�/�������̽�/�۾����� update param
	aPgmLrg = new Array();
	aPgmMrg = new Array();
	aPgmNm = new Array();
	aUserId = new Array();
	aWorkInfSeq = new Array();
	
	for(var i=0; i<update2.length; i++)
	{
		var pgmLrg = oGrid2.GetCellValue("pgm_lrg", update2[i]);
		var pgmMrg = oGrid2.GetCellValue("pgm_mrg", update2[i]);
		var pgmNm = oGrid2.GetCellValue("pgm_nm", update2[i]);
		var userid = gInfo.user_id.value;
		var workInfSeq = oGrid2.GetCellValue("work_inf_seq", update2[i]);
		
		aPgmLrg.push(pgmLrg);
		aPgmMrg.push(pgmMrg);
		aPgmNm.push(pgmNm);
		aUserId.push(userid);
		aWorkInfSeq.push(workInfSeq);
	}
	
	fQuery.grid2_u_pgm_lrg.value = makeParamArray(aPgmLrg);
	fQuery.grid2_u_pgm_mrg.value = makeParamArray(aPgmMrg);
	fQuery.grid2_u_pgm_nm.value = makeParamArray(aPgmNm);
	fQuery.grid2_u_user_id.value = makeParamArray(aUserId);
	fQuery.grid2_u_work_inf_seq.value = makeParamArray(aWorkInfSeq);
	
	// ���α׷�/�������̽�/�۾����� delete param
	aWorkInfSeq = new Array();
	
	for(var i=0; i<delete2.length; i++)
	{
		var workInfSeq = oGrid2.GetCellValue("work_inf_seq", delete2[i]);
		
		aWorkInfSeq.push(workInfSeq);
	}
	
	fQuery.grid2_u_work_inf_seq.value = makeParamArray(aWorkInfSeq);
	////////////////////////////���α׷�/�������̽�/�۾����� ��
	
	// ���� ����� insert param
	var aChrgCorp = new Array();
	var aChrgUsrNm = new Array();
	var aChrgDuty = new Array();
	var aChrgJob = new Array();
	var aMoblNo = new Array();
	var aTelNo = new Array();
	var aEmail = new Array();
	var aChrgUsrSeq = new Array();
	var aUserId = new Array();
	
	for(var i=0; i<insert3.length; i++)
	{
		var chrgCorp = oGrid3.GetCellValue("chrg_corp", insert3[i]);
		var chrgUsrNm = oGrid3.GetCellValue("chrg_usr_nm", insert3[i]);
		var chrgDuty = oGrid3.GetCellValue("chrg_duty", insert3[i]);
		var chrgJob = oGrid3.GetCellValue("chrg_job", insert3[i]);
		var moblNo = oGrid3.GetCellValue("mobl_no", insert3[i]);
		var telNo = oGrid3.GetCellValue("tel_no", insert3[i]);
		var eMail = oGrid3.GetCellValue("email", insert3[i]);
		var userid = gInfo.user_id.value;

		aChrgCorp.push(chrgCorp);
		aChrgUsrNm.push(chrgUsrNm);
		aChrgDuty.push(chrgDuty);
		aChrgJob.push(chrgJob);
		aMoblNo.push(moblNo);
		aTelNo.push(telNo);
		aEmail.push(eMail);
		aUserId.push(userid);
	}
	fQuery.grid3_i_chrg_corp.value = makeParamArray(aChrgCorp); 
	fQuery.grid3_i_chrg_usr_nm.value = makeParamArray(aChrgUsrNm);
	fQuery.grid3_i_chrg_duty.value = makeParamArray(aChrgDuty);
	fQuery.grid3_i_chrg_job.value = makeParamArray(aChrgJob);
	fQuery.grid3_i_mobl_no.value = makeParamArray(aMoblNo);
	fQuery.grid3_i_tel_no.value = makeParamArray(aTelNo);
	fQuery.grid3_i_email.value = makeParamArray(aEmail);
	fQuery.grid3_i_user_id.value = makeParamArray(aUserId);
	
	// ���� ����� update param
	aChrgCorp = new Array();
	aChrgUsrNm = new Array();
	aChrgDuty = new Array();
	aChrgJob = new Array();
	aMoblNo = new Array();
	aTelNo = new Array();
	aEmail = new Array();
	aChrgUsrSeq = new Array();
	aUserId = new Array();
	
	for(var i=0; i<update3.length; i++)
	{
		var chrgCorp = oGrid3.GetCellValue("chrg_corp", update3[i]);
		var chrgUsrNm = oGrid3.GetCellValue("chrg_usr_nm", update3[i]);
		var chrgDuty = oGrid3.GetCellValue("chrg_duty", update3[i]);
		var chrgJob = oGrid3.GetCellValue("chrg_job", update3[i]);
		var moblNo = oGrid3.GetCellValue("mobl_no", update3[i]);
		var telNo = oGrid3.GetCellValue("tel_no", update3[i]);
		var eMail = oGrid3.GetCellValue("email", update3[i]);
		var chrgUsrSeq = oGrid3.GetCellValue("chrg_usr_seq", update3[i]);
		var userid = gInfo.user_id.value;
		
		aChrgCorp.push(chrgCorp);
		aChrgUsrNm.push(chrgUsrNm);
		aChrgDuty.push(chrgDuty);
		aChrgJob.push(chrgJob);
		aMoblNo.push(moblNo);
		aTelNo.push(telNo);
		aEmail.push(eMail);
		aChrgUsrSeq.push(chrgUsrSeq);
		aUserId.push(userid);
	}
	
	fQuery.grid3_u_chrg_corp.value = makeParamArray(aChrgCorp); 
	fQuery.grid3_u_chrg_usr_nm.value = makeParamArray(aChrgUsrNm);
	fQuery.grid3_u_chrg_duty.value = makeParamArray(aChrgDuty);
	fQuery.grid3_u_chrg_job.value = makeParamArray(aChrgJob);
	fQuery.grid3_u_mobl_no.value = makeParamArray(aMoblNo);
	fQuery.grid3_u_tel_no.value = makeParamArray(aTelNo);
	fQuery.grid3_u_email.value = makeParamArray(aEmail);
	fQuery.grid3_u_chrg_usr_seq.value = makeParamArray(aChrgUsrSeq);
	fQuery.grid3_u_user_id.value = makeParamArray(aUserId);
	
	// ���� ����� delete param
	aChrgUsrSeq = new Array();
	
	for(var i=0; i<delete3.length; i++)
	{
		var chrgUsrSeq = oGrid3.GetCellValue("chrg_usr_seq", delete3[i]);
		
		aChrgUsrSeq.push(chrgUsrSeq);
	}
	
	fQuery.grid3_d_chrg_usr_seq.value = makeParamArray(aChrgUsrSeq);
}

/**
 * ����
 */
function save()
{
	if(getValidation(fQuery, true) == false ) return; 
	
	if (MessageBox("SavConfirm", "C", "") == false) return;
	
	var svc_id = rtnCRUDSvcId();

	if(svc_id == "") svc_id = MERGE_ID;
	else if(svc_id != "") svc_id = MERGE_ID + "," + svc_id;
	
	var tran = new Trans();
	tran.setSvc(svc_id);
	tran.setCallBack("callBackSave");
	tran.open("fQuery", "fQuery","/common.do");
}

/**
 * ���� �ݹ�
 */
function callBackSave()
{
	queryList();
}

/**
 * �������� ���ڿ�����
 * sSvcId  : ����ID
 */
function setSystemName()
{
	try{
		var nlen     = DataSet.getTotalCount(SELECT_ID_CODE); 
		var codenm   = "";

		var work_range = trim(fQuery.mtnc_system.value);

		if(work_range!="")	//��� �迭���̴�1�̴�
		{
			var aCodes     = work_range.split(",");

			for(var j=0; j<aCodes.length ;j++)
			{
				for(var k=0; k<nlen; k++)
				{
					if(aCodes[j] == DataSet.getParam(SELECT_ID_CODE, 1, k, "code")) 
					{
						codenm += ((codenm.length>0 ? ", " : "") + DataSet.getParam(SELECT_ID_CODE, 1, k, "code_nm"));
						break;
					}
				}
			}
			fQuery.mtnc_system_nm.value = codenm ;
		}
	}catch(e){}
}

/**
 * ����
 **/
function excel()
{
	var params = "_SERVICE_TYPE=SQLSERVICE,SQLSERVICE,SQLSERVICE,SQLSERVICE,SQLSERVICE&_SERVICE_ID=" + SELECT_ID+","+SELECT_ID_2+","+SELECT_ID_3+","+SELECT_ID_4+","+SELECT_ID_CODE
			   + "&_FORWARD_ID=commonjsp&_FORWARD_PAGE=jsp/dashboard/dasMtncStatPExcel.jsp"
			   + "&_PAGE_ROW=9999&_START_ROW=1&_EXEC_TYPE=SELECT"
			   + "&up_cd=PRJ013"
			   + "&mtnc_seq=" + fQuery.mtnc_seq.value
			   + "&prj_nm=" + fQuery.clnt_corp_nm.value
			   + "&mtnc_system=" + trim(fQuery.mtnc_system.value);
	
	fExcel.method = "post";
	fExcel.target = "iLog";
	fExcel.action = "/common.do?"+params;
	fExcel.submit();
}



