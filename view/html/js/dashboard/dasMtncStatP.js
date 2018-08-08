/**
 * PROJ : Nexfron Intranet
 * NAME : dasMtncStat.js
 * DESC : 현황판 - 프로젝트현황
 * Author : 박준규 과장
 * VER  : 1.0
 * Copyright 2009 Nexfron All rights reserved
 * ============================================================================================
 * 								변		경		사		항
 * ============================================================================================
 * VERSION		DATE		AUTHOR		DESCRIPTION
 * ============================================================================================
 * 1.0		2010.09.06		박준규		개발
 */
var SELECT_ID 	    = "UCPRJ034S";	//프로젝트현황

var SELECT_ID_2		= "UCPRJ035S";	//서버정보
var INSERT_ID_2		= "UCPRJ035I";	//서버정보 등록
var UPDATE_ID_2	= "UCPRJ035U";	//서버정보 수정
var DELETE_ID_2		= "UCPRJ035D";	//서버정보 삭제

var SELECT_ID_3		= "UCPRJ036S";	//작업정보
var INSERT_ID_3		= "UCPRJ036I";	//작업정보 등록
var UPDATE_ID_3	= "UCPRJ036U";	//작업정보 수정
var DELETE_ID_3		= "UCPRJ036D";	//작업정보 삭제

var SELECT_ID_4		= "UCPRJ037S";	//업무담당자정보
var INSERT_ID_4		= "UCPRJ037I";	//업무담당자정보 등록
var UPDATE_ID_4	= "UCPRJ037U";	//업무담당자정보 수정
var DELETE_ID_4		= "UCPRJ037D";	//업무담당자정보 삭제

var SELECT_ID_CODE 	= "UCPRJ012S";	//코드 DataSet

var gaCode 			  	= new Array();	//코드 Array

var MERGE_ID = "UCPRJ034U";

var oGrid1;
var oGrid2;
var oGrid3;

/**
 *초기화
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
 * 초기 화면 셋팅
 */
function initMode()
{
	//고객사, 시스템, 계약구분, 계약기간, 정기점검, 유지보수유형
	var disabledObj = new Array(fQuery.clnt_corp_nm, fQuery.mtnc_system_nm, fQuery.mtnc_cost, fQuery.mtnc_date, fQuery.regular_chk, fQuery.mtnc_type)
	setDisabledObj(disabledObj, true);
}

/**
 * 조회
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
 * 조회 후 콜백
 * sServiceID  : 서비스ID
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
 * 목록클릭
 * id           : 클릭한 그리드객체ID
 * strColumnKey : 클릭한 컬럼명
 * nRow         : 클릭한Row Index
 */
function showDetailO_obj(id, strColumnKey, nRow)
{
	var clickObj = document.all[id];

	if(strColumnKey == "add_del") 
	{
		// 이미지 index 따른 if문 --------- 추가 : 0 // 삭제 : 1
		if(clickObj.GetCellImage("add_del", nRow) == 0) newRow(id);
		else if(clickObj.GetCellImage("add_del", nRow) == 1) removeWiseGridRow(id, nRow);
	}
}

/**
 * addRow 셋팅
 */
function newRow(id)
{
	var newObj = document.all[id];
	newObj.AddRow();
	newObj.SetCellImage("add_del", newObj.GetRowCount()-1, 0);
	
	// 저장되어있는 데이터 있을 때만
	if(newObj.GetRowCount() > 1) newObj.SetCellImage("add_del", newObj.GetRowCount()-2, 1);
}

/**
 * 마지막 생성row 체크
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
 * 그리드 CRUD에 따른 QUERY ID RETURN
 */
function rtnCRUDSvcId()
{
	chkLastRow(SELECT_ID_2);
	chkLastRow(SELECT_ID_3);
	chkLastRow(SELECT_ID_4);
	
	// 서버정보 crud row 배열
	var insert1 = findRowList(oGrid1, "생성", "CRUD");
	var update1 = findRowList(oGrid1, "수정", "CRUD");
	var delete1 = findRowList(oGrid1, "삭제", "CRUD");
	
	// 프로그램/인터페이스/작업정보 crud row 배열
	var insert2 = findRowList(oGrid2, "생성", "CRUD");
	var update2 = findRowList(oGrid2, "수정", "CRUD");
	var delete2 = findRowList(oGrid2, "삭제", "CRUD");
	
	// 업무담당자 crud row 배열
	var insert3 = findRowList(oGrid3, "생성", "CRUD");
	var update3 = findRowList(oGrid3, "수정", "CRUD");
	var delete3 = findRowList(oGrid3, "삭제", "CRUD");
	
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

	// crud 저장할 내용이 있을 때만 param 생성
	if(svc_id != "") rtnCRUDParam(insert1, update1, delete1, insert2, update2, delete2, insert3, update3, delete3);
	
	return svc_id;
}

/**
 * 그리드 CRUD QUERY 용 param 생성
 */
function rtnCRUDParam(insert1, update1, delete1, insert2, update2, delete2, insert3, update3, delete3)
{
	// 서버정보 insert param
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

	// 서버정보 update param
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
	
	// 서버정보 delete param
	aSrvrInfSeq = new Array();
	
	for(var i=0; i<delete1.length; i++)
	{
		var srvrInfSeq = oGrid1.GetCellValue("srvr_inf_seq", delete1[i]);
		
		aSrvrInfSeq.push(srvrInfSeq);
	}
	
	fQuery.grid1_d_srvr_inf_seq.value = makeParamArray(aSrvrInfSeq);
	//////////////////////////// 서버정보 끝
	
	// 프로그램/인터페이스/작업정보 insert param
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

	// 프로그램/인터페이스/작업정보 update param
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
	
	// 프로그램/인터페이스/작업정보 delete param
	aWorkInfSeq = new Array();
	
	for(var i=0; i<delete2.length; i++)
	{
		var workInfSeq = oGrid2.GetCellValue("work_inf_seq", delete2[i]);
		
		aWorkInfSeq.push(workInfSeq);
	}
	
	fQuery.grid2_u_work_inf_seq.value = makeParamArray(aWorkInfSeq);
	////////////////////////////프로그램/인터페이스/작업정보 끝
	
	// 업무 담당자 insert param
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
	
	// 업무 담당자 update param
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
	
	// 업무 담당자 delete param
	aChrgUsrSeq = new Array();
	
	for(var i=0; i<delete3.length; i++)
	{
		var chrgUsrSeq = oGrid3.GetCellValue("chrg_usr_seq", delete3[i]);
		
		aChrgUsrSeq.push(chrgUsrSeq);
	}
	
	fQuery.grid3_d_chrg_usr_seq.value = makeParamArray(aChrgUsrSeq);
}

/**
 * 저장
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
 * 저장 콜백
 */
function callBackSave()
{
	queryList();
}

/**
 * 업무범위 문자열생성
 * sSvcId  : 서비스ID
 */
function setSystemName()
{
	try{
		var nlen     = DataSet.getTotalCount(SELECT_ID_CODE); 
		var codenm   = "";

		var work_range = trim(fQuery.mtnc_system.value);

		if(work_range!="")	//없어도 배열길이는1이다
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
 * 엑셀
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



