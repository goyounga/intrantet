/**
 * PROJ : Nexfron Intranet
 * NAME : hldHolidaySnc.js
 * DESC : 휴가결재
 * Author : 이창욱 과장
 * VER  : 1.0
 * Copyright 2009 Nexfron All rights reserved
 * ============================================================================================
 * 								변		경		사		항
 * ============================================================================================
 * VERSION		DATE		AUTHOR		DESCRIPTION
 * ============================================================================================
 * 1.0		2009.06.18		이창욱		최초작성
 * 1.1		2009.08.14		김은수		주석추가
 */

var SELECT_SERVICE_01 	= "UCHLD030S";	//휴가신청내역
var SELECT_SERVICE_02	= "UCHLD032S";
var SELECT_SERVICE_03	= "UCHLD020S";
var UPDATE_SERVICE_01	= "UCHLD030U,UCHLD031U,UCHLD032U";
var INSERT_SERVICE_03	= "UCSMS002I";		//SMS발송 - 휴가결재등록
/**
*	화면 로딩
* author  lee,chang-uk
* since   2009/06/22
*/
function on_Load()
{
	//해당페이지가 팀장,파트장,관리자만 쓴다는 가정하에 파트장은 본인결재대상만조회
	if(fQuery.gradecd.value == "06") //파트장
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
* 조회 기간 초기화
* author  lee,chang-uk
* since   2009/06/18
*/
function initPeriod()
{
	fQuery.q_date_from.value = getUserDate(-30, "-");
	fQuery.q_date_to.value = getUserDate(0, "-");
}

/**
* 초기화
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
* 휴가 신청 내역 조회
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
 * 콜백 : 휴가신청내역조회
 * svcid:서비스아이디
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
 * 휴가결재 저장
 */
function saveSign()
{
	if( getValidation(f, true) == false ) return false;

	var g_Obj = document.all(SELECT_SERVICE_01);
	var nRow  = g_Obj.GetActiveRowIndex();

	if( nRow < 0 )
	{
		MessageBox("","I","선택된 데이터가 존재하지 않습니다.");
		return;
	}
	//SYS019:결재진행상태-01:신청(1차결재대기중), 02:2차결재대기중, 03:3차결재대기중, 04:승인, 05:반려, 06:임시저장
	var s_PrgsStts = g_Obj.GetCellHiddenValue("sign_prgs_stts_cd", nRow);

	if( Number(s_PrgsStts) > 3 )
	{
		MessageBox("","I","[승인],[반려]상태는 변경이 불가능 합니다.");
		return;
	}

	if(( g_Obj.GetCellValue("alnc", nRow) == "0" )
	 &&( g_Obj.GetCellValue("rtn" , nRow) == "0" ))
	{
		MessageBox("","I","[승인] 혹은 [반려]를 선택하세요.");
		return;
	}

	if(( g_Obj.GetCellValue("alnc", nRow) == "1")
	 &&( g_Obj.GetCellValue("rtn" , nRow) == "1"))
	{
		MessageBox("","I","[승인] 혹은 [반려] 하나만 선택하세요.");
		return;
	}

	var now_sign_stg_cd = -1;
	var send_mode = "";

	if( g_Obj.GetCellValue("alnc", nRow) == "1" )
	{
		f1.alnc_rtn.value = "A";

		var sign_stg_cd = g_Obj.GetCellHiddenValue("sign_stg_cd", nRow);//최종 결재단계
		now_sign_stg_cd = g_Obj.GetCellValue("now_sign_stg_cd", nRow);	//현재 결재단계

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

	if( !MessageBox("","C", (f1.alnc_rtn.value=="A"?"승인":"반려")+" 하시겠습니까?" )) return;

	var trans = new Trans();
//	trans.setSvc(UPDATE_SERVICE_01);
	trans.setSvc(UPDATE_SERVICE_01+","+INSERT_SERVICE_03);
	trans.setMyUserParams("send_mode"		, send_mode);		//sms	문자 메시지 구분-요청:REQUEST,승인:APPROVAL,반려:REJECT
	trans.setMyUserParams("now_sign_stg_cd"	, now_sign_stg_cd);	//sms	결재자 다음단계
	trans.setMyUserParams("saveflag" 		, "UPDATE");		//sms	UPDATE
	trans.setCallBack("callbackSaveSign");
	trans.open("f1","f1","/common.do");
}
/**
 * 콜백 : 휴가결재저장
 * svcid:서비스아이디
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
* 그리드 클릭시 상세 정보를 보여준다.
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
* 개인별 휴가 신청 내역 조회
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
 * 콜백 : 개인별 휴가 신청 내역 조회
 * svcid:서비스아이디
 */
function callbackSearchDetail(svcid)
{
	if(DataSet.isError(svcid) == "true") return;

	// 개인별 휴가 정보 조회
	searchHldyInfo();
}
/**
* 휴가 정보 조회
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
 * 콜백 : 휴가 정보 조회
 * svcid:서비스아이디
 */
function callbackSearchHldyInfo(svcid)
{
	if( DataSet.getTotalCount(serviceId) <= 0 )
	{
		f0.reset();
	}
}
/**
* 사용자 조직도 팝업
* author  lee,chang-uk
* since   2009/06/18
*/
function openUserOrg()
{
	//Opener 의 정보를 설정해줌 (form 객체를 넘긴다)
	//setOpener(fQuery);

	//openPopup("/jsp/common/comUserOrg.jsp", "UserOrg", 800, 545);

	var cwp = getPopupProperties("", "", "800", "580");

	window.open("/jsp/common/comUserOrg.jsp" ,"UserOrg", cwp);
}

/**
* 조직도에서 사용자 정보 가져오기
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