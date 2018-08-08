/**
 * PROJ : Nexfron Intranet
 * NAME : home.js
 * DESC : 메인(home) 자바스크립트
 * Author : 정희인 대리
 * VER  : 1.0
 * Copyright 2009 Nexfron All rights reserved
 * ============================================================================================
 * 								변		경		사		항
 * ============================================================================================
 * VERSION		DATE		AUTHOR		DESCRIPTION
 * ============================================================================================
 * 1.0		2009.08.13		김은수		주석추가
 * 2.0		2010.09.09		박준규		근무설정추가
 * 3.0		2012.02.20		백승우 	결재관련 추가
 */

var NOTICE_ID			= "UCSYS110S";		//공지사항
var BOARD_ID			= "UCSYS113S";		//게시판조회
var QNA_ID				= "UCSYS119S";		//Q&A조회
var UPG_ID				= "UCSYS099S";		//업그레이드조회
var SELECT_ID_WORK 	    = "UCDAS032S";		//근무설정
var UPDATE_ID 	      	= "UCDAS071U";		//본사인력현황
var SIGN_Y_ID			= "UCSYS205S";		// 결재자 미결재 건수
var SIGN_N_ID			= "UCSYS205S_2";		// 자신 미결재 건수 조회
var SIGN_USER_ID		= "UCSYS206S"		// 결재자 여부 조회
var aForms1        		= null; 			//근무일정-폼객체들1
var aForms2        		= null; 			//근무일정-폼객체들2

var aArry = new Array();				// 센터
var aArry1 = new Array();				// 센터
var aArry2 = new Array();				// 센터

var G_SIGN_F_CD = "N";				// 결재 여부 코드

//###################################
// ONLOAD
//###################################
function init()
{
	aForms1 = [ f3.in_offc_stat[0] , f3.in_offc_stat[1] ];
	aForms2 = [ f3.rtn_scdl   , f3.work_scdl, f3.work_rmk ];
	setOfficeWork( "INIT" );
	top.setInit();
	signUserQuery();
	//showNotice();
}

//###################################
//결재 여부 조회
//###################################
function signUserQuery()
{
	var trans = new Trans();
	trans.setSvc(SIGN_USER_ID);
	trans.setWait(false);
	trans.open("f","","/common.do");
}

//###################################
// 공지사항 조회
//###################################
function showNotice()
{
	var svc_id = "";
	
	if(f.sign_tp.value != "") svc_id = NOTICE_ID+","+BOARD_ID+","+QNA_ID+","+UPG_ID+","+SELECT_ID_WORK+","+SIGN_Y_ID;
	else if(f.sign_tp.value == "") svc_id = NOTICE_ID+","+BOARD_ID+","+QNA_ID+","+UPG_ID+","+SELECT_ID_WORK+","+SIGN_N_ID;
		
	var trans = new Trans();
	trans.setSvc(svc_id);
	trans.setPageRow(12);
	trans.setWait(false);
	trans.open("f","f3","/common.do");
}

//###################################
//공지사항 목록
//###################################
function openNoticeInfo(obj, num)
{
	//setOpener(obj);

	if(num ==1){
		//openPopup("/jsp/system/sysNoticeInfo.jsp", "", "NoticeInfo", 0, 0, 800, 582, "", "")
		parent.topmenu_click(5,'0800', '/jsp/common/blank.jsp','null');
		parent.menu_click('0805', '/jsp/information/infNotice.jsp', '공지사항', '자료공유', '', 5, 'Y', '');
	}else if(num ==2)
	{
		parent.topmenu_click(5,'0800', '/jsp/common/blank.jsp','null');
		parent.menu_click('0804', '/jsp/information/infBoardList.jsp', '게시판', '자료공유', '', 5, 'Y', '');
	}else if(num ==3)
	{
		parent.topmenu_click(5,'1100', '/jsp/common/blank.jsp','null');
		parent.menu_click('1111', '/jsp/ucareprogram/ucrUpgradeMng.jsp', 'UCare', '프레임웍  업그레이드 정보', '', 5, 'Y', '');
	}else if(num ==4)
	{
		parent.topmenu_click(5,'0800', '/jsp/common/blank.jsp','null');
		parent.menu_click('0802', '/jsp/information/infQnA.jsp', 'Q&A', '자료공유', '', 5, 'Y', '');
	}
}

//###################################
//공지사항 상세정보
//###################################
function noticeSelect(obj, index)
{
	//빈칸을 클릭했을때는 무시
	if(aArry.length > index)
	{
		f.notice_seq.value = DataSet.getParam(NOTICE_ID, 1, index, "notice_seq");

		openPopup("/jsp/system/sysNoticeDetailInfo.jsp", "seq="+f.notice_seq.value+"&gubun=notice", "NoticeInfo", 0, 0, 800, 512, "", "")
	}
}

//###################################
//게시판 상세정보
//###################################
function board_noticeselect(obj, index)
{
	//빈칸을 클릭했을때는 무시
	if(aArry1.length > index)
	{
		f.board_seq.value = DataSet.getParam(BOARD_ID, 1, index, "board_seq");

		openPopup("/jsp/system/sysNoticeDetailInfo.jsp", "seq="+f.board_seq.value+"&gubun=board", "NoticeInfo", 0, 0, 800, 682, "", "")
	}
}

//###################################
//업그레이드 상세정보
//###################################
function upg_noticeselect(obj, index)
{
	//빈칸을 클릭했을때는 무시
	if(aArry2.length > index)
	{
		var upg_seq = DataSet.getParam(UPG_ID, 1, index, "upg_seq");

		openPopup("/jsp/system/sysNoticeDetailInfo.jsp", "seq="+upg_seq+"&gubun=upg", "NoticeInfo", 0, 0, 800, 682, "", "")
	}
}

//###################################
//미결재 정
//###################################
function sign_noticeselect(obj, index)
{
	//빈칸을 클릭했을때는 무시
	if(4 > index)
	{
		if(obj.id == "myInf") 
		{
			signInf.style.display = "";
			myInf.style.display = "none";
			
			svc_id = SIGN_N_ID;
		}
		else if(obj.id == "signInf") 
		{
			signInf.style.display = "none";
			myInf.style.display = "";
			
			svc_id = SIGN_Y_ID;
		}
		
		if(f.sign_tp.value != "" && signInf.style.display == "none" && myInf.style.display == "none")
		{
			kind = "SIGN";
		}
		else if(f.sign_tp.value != "" && signInf.style.display == "" && myInf.style.display == "none")
		{
			kind = "INFO";
		}
		else if(f.sign_tp.value != "" && signInf.style.display == "none" && myInf.style.display == "")
		{
			kind = "SIGN";
		}
		else if(f.sign_tp.value == "")
		{
			kind = "INFO";
		}
		
		if(kind == "SIGN")
		{
			switch(UCSYS205S_IDX[index].innerHTML)
			{
				case '01':
					top.menu_click('0202', '/jsp/holiday/hldHolidaySnc.jsp', '휴가결재', '휴가', '01', '1', '');
					break;
				case '02':
					top.menu_click('0102', '/jsp/management/mngWeeklyRptMng.jsp', '주간보고결재', '주간보고', '01', '0', '');
					break;
				case '03':
					top.menu_click('0302', '/jsp/expense/expExpenseMng.jsp', '경비결재', '경비', '01', '2', '');
					break;
				case '04':
					top.menu_click('0303', '/jsp/expense/expHoliday.jsp', '휴일근무신청', '경비', '01', '2', '');
					break;
			}
		}
		else if(kind == "INFO")
		{
			switch(UCSYS205S_IDX[index].innerHTML)
			{
				case '01':
					top.menu_click('0201', '/jsp/holiday/hldHolidayList.jsp', '휴가신청/조회', '휴가', '01', '1', '');
					break;
				case '02':
					top.menu_click('0101', '/jsp/management/mngWeeklyRpt.jsp', '주간보고', '주간보고', '01', '0', '');
					break;
				case '03':
					top.menu_click('0301', '/jsp/expense/expExpenseList.jsp', '경비신청/조회', '경비', '01', '2', '');
					break;
				case '04':
					top.menu_click('0303', '/jsp/expense/expHoliday.jsp', '휴일근무신청', '경비', '01', '2', '');
					break;
			}
		}
	}
}

//###################################
// CALLBACK
//###################################
function callback(dsnm)
{
	var svc_id = dsnm.split(",");

	for(var x=0; x<svc_id.length; x++)
	{
		if(svc_id[x] == SIGN_USER_ID)
		{
				// 미결재 정보
				var ds = DataSet.getParamArrHash(SIGN_USER_ID, 1);
				var dsCnt = ds.length;
				var val = "";
	
				if(dsCnt > 0)
				{
					for(var i=0; i<dsCnt; i++)
					{
						var ht = ds[i];
						if(val != "") val += ", ";
						val += "'" + ht.get("sign_tp_cd") + "'";
					}
					
					f.sign_tp.value = "AND sign_tp_cd IN (" + val + ")";
				}
				else
				{
					f.sign_tp.value = "";
				}
	
				if(dsCnt == 0 || dsCnt >= 4) // 결재권한 없는 유저 or 결재권한 다 갖고 있는 유저
				{
					if(dsCnt >= 4) sign_title.innerText = "미결재 정보";
					else if(dsCnt == 0) sign_title.innerText = "내결재 정보";
					
					signInf.style.display = "none";
					myInf.style.display = "none";
				}
				else if(dsCnt > 0 && dsCnt < 4) // 일부 결재권한 유저
				{
					sign_title.innerText = "미결재 정보";
					
					signInf.style.display = "none";
					myInf.style.display = "";
				}
				showNotice();
		}
		else if(svc_id[x] == NOTICE_ID)
		{
			if(DataSet.getTotalCount(NOTICE_ID) > 0)
			{
				var objTbl = document.all[NOTICE_ID];
				var iCnt = DataSet.getTotalCount(NOTICE_ID);

				aArry = DataSet.getParamArrHash(NOTICE_ID, "1");

				for (var i=0; i < aArry.length; i++)
				{
					if(i < 12){
						var ht = aArry[i];
						var temp = "...";

						//공지
						if(ht.get("notice_type")=="02")
						{
							UCSYS110S_notice_seq[i].innerHTML = "<img src=/html/images/icon/notice.gif border=0>";
						}else
						{
							UCSYS110S_notice_seq[i].innerText = ht.get("notice_seq") +".";
						}

						if(ht.get("notice_sbjt").length > 24)
						{
							temp = ht.get("notice_sbjt").substr(0,24) + temp;
						}
						else {
							temp = ht.get("notice_sbjt").substr(0,24);
						}

						//공지
						if(ht.get("notice_type")=="02")
						{
							temp = "<font color=orange><b>" + temp + "</b></font>";
							UCSYS110S_notice_sbjt[i].innerHTML = temp;
						}
						else
						{
							UCSYS110S_notice_sbjt[i].innerText = temp;
						}

						UCSYS110S_rg_nm[i].innerText = ht.get("rg_nm");
						UCSYS110S_rg_dt[i].innerText = ht.get("rg_dt").substr(0,4)+ "/" +  ht.get("rg_dt").substr(4,2)+ "/"+  ht.get("rg_dt").substr(6,2);
					}
				}
			}
		}
		else if(svc_id[x] == BOARD_ID)
		{
			if(DataSet.getTotalCount(BOARD_ID) > 0){

				var objTbl = document.all[BOARD_ID];
				var iCnt = DataSet.getTotalCount(BOARD_ID);

				aArry1 = DataSet.getParamArrHash(BOARD_ID, DataSet.getCurPage(BOARD_ID));

				for (var i=0; i < aArry1.length; i++)
				{
					if(i < 5){
						var ht = aArry1[i];
						var temp = "...";

						UCSYS113S_seq[i].innerText = ht.get("board_seq") +".";

						if(ht.get("board_sbjt").length > 37)
						{
							UCSYS113S_ntce_sbjt[i].innerHTML = ht.get("board_sbjt").substr(0,37) + temp;
						}
						else {
							UCSYS113S_ntce_sbjt[i].innerHTML = ht.get("board_sbjt").substr(0,37);
						}

						if(ht.get("board_nm").length > 10)
						{
							UCSYS113S_board_nm[i].innerHTML = ht.get("board_nm").substr(0,10) + temp;
						}
						else {
							UCSYS113S_board_nm[i].innerHTML = ht.get("board_nm").substr(0,10);
						}

						UCSYS113S_rg_nm[i].innerText = ht.get("rg_nm");
						UCSYS113S_rg_dt[i].innerText = ht.get("rg_dt").substr(0,4)+ "/" +  ht.get("rg_dt").substr(4,2)+ "/"+  ht.get("rg_dt").substr(6,2);
					}
				}
			}
		}
		else if(svc_id[x] == QNA_ID)
		{
			if(DataSet.getTotalCount(QNA_ID) > 0){

				var objTbl = document.all[QNA_ID];
				var iCnt = DataSet.getTotalCount(QNA_ID);

				aArry1 = DataSet.getParamArrHash(QNA_ID, DataSet.getCurPage(QNA_ID));

				for (var i=0; i < aArry1.length; i++)
				{
					if(i < 4){
						var ht = aArry1[i];
						var temp = "...";

						UCSYS119S_seq[i].innerText = ht.get("qna_seq") +".";

						if(ht.get("quest_title").length > 37)
						{
							UCSYS119S_quest_title[i].innerHTML = ht.get("quest_title").substr(0,37) + temp;
						}
						else {
							UCSYS119S_quest_title[i].innerHTML = ht.get("quest_title").substr(0,37);
						}
						
						UCSYS119S_quest_type_nm[i].innerHTML = ht.get("quest_type_nm");
						UCSYS119S_rg_nm[i].innerText = ht.get("quest_mn_nm");
						UCSYS119S_rg_dt[i].innerText = ht.get("rg_dt");
					}
				}
			}
		}
		else if(svc_id[x] == UPG_ID)
		{
			if(DataSet.getTotalCount(UPG_ID) > 0)
			{
				var objTbl = document.all[UPG_ID];
				var iCnt = DataSet.getTotalCount(UPG_ID);
				aArry2 = DataSet.getParamArrHash(UPG_ID, DataSet.getCurPage(UPG_ID));

				for (var i=0; i < aArry2.length; i++)
				{
					var ht = aArry2[i];
					var temp = "...";

					UCSYS099S_upg_seq[i].innerText = (i+1) +".";
					var sTitle
					if(ht.get("upg_title").length > 12)
					{
						sTitle = ht.get("upg_title").substr(0,26) + temp;
					}
					else {
						sTitle = ht.get("upg_title").substr(0,26);
					}
					if (ht.get("new_yn") == "Y") sTitle += "&nbsp;&nbsp;<img src=/html/images/icon/icon_new.gif>";
					UCSYS099S_upg_title[i].innerHTML = sTitle;

					//UCSYS099S_upg_type_cd[i].innerText = ht.get("upg_type_cd");
					//UCSYS099S_reg_user_nm[i].innerText = ht.get("reg_user_id");
					UCSYS099S_reg_dt[i].innerText = ht.get("reg_dt").substr(0,4)+ "/" +  ht.get("reg_dt").substr(4,2)+ "/"+  ht.get("reg_dt").substr(6,2);
				}
			}
		}
/*
			if( getArrayData(f3.work_type_cd, "value")=="01" )
			{
				setDisabledObj(aForms1, false);

				if( getArrayData(f3.in_offc_stat, "value")=="02" )
				{
					setDisabledObj(aForms2, false);
				}
			}
*/
		else if(svc_id[x] == SIGN_Y_ID || svc_id[x] == SIGN_N_ID)
		{
			// 미결재 정보
			var dsSignInfo = "";
			
			if(svc_id[x] == SIGN_Y_ID) dsSignInfo = DataSet.getParamArrHash(SIGN_Y_ID, 1);
			else if(svc_id[x] == SIGN_N_ID) dsSignInfo = DataSet.getParamArrHash(SIGN_N_ID, 1);
				
			var dsCnt = dsSignInfo.length;
			var idx = 1;
			
			if(dsCnt > 0)
			{
				for(var i=0; i<4; i++)
				{
					if(i < dsCnt)
					{
						var ht = dsSignInfo[i];

						UCSYS205S_sign_seq[i].innerText = (idx++) +".";
						UCSYS205S_sign_title[i].innerHTML = ht.get("sign_tp_nm");
						UCSYS205S_sign_cnt[i].innerHTML = ht.get("sign_cnt") + " 건";
						UCSYS205S_IDX[i].innerHTML = ht.get("sign_tp_cd");
					}
					else
					{
						UCSYS205S_sign_seq[i].innerText = "";
						UCSYS205S_sign_title[i].innerHTML = "";
						UCSYS205S_sign_cnt[i].innerHTML = "";
						UCSYS205S_IDX[i].innerHTML = "";
					}
				}
			}
		}
	}
}


////////////////////////////////////////////////////////////
/**
 * 결재정보
 */
function signInfo(obj)
{
	var svc_id = "";
	
	if(obj.id == "myInf") 
	{
		sign_title.innerText = "내결재 정보";
		signInf.style.display = "";
		myInf.style.display = "none";
		
		svc_id = SIGN_N_ID;
	}
	else if(obj.id == "signInf") 
	{
		sign_title.innerText = "미결재 정보";
		signInf.style.display = "none";
		myInf.style.display = "";
		
		svc_id = SIGN_Y_ID;
	}
	
	var trans = new Trans();
	trans.setSvc(svc_id);
	trans.setPageRow(12);
	trans.setWait(false);
	trans.open("f","f3","/common.do");
}

/**
 * 근무유형 체크박스 선택
 */
function work_type_cd_onClick(obj)
{
	if(obj.checked)
	{
		for(var i=0; i<f3.work_type_cd.length; i++)
		{
			if(f3.work_type_cd[i]!=obj)
			{
				f3.work_type_cd[i].checked = false;
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
 * 근무설정화면 컨트롤
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
 * 재실여부 라디오 선택
 */
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
}
/**
 * 근무설정 저장
 */
function saveWork()
{
	var bFlg = false;
	for(var i=0; i<f3.work_type_cd.length; i++)
	{
		if(f3.work_type_cd[i].checked == true)
		{
			bFlg = true;
			break;
		}
	}

	if(!bFlg)
	{
		MessageBox("", "I","근무유형을 선택해주세요.");
		return;
	}

	if(f3.work_type_cd[0].checked == true)
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
			MessageBox("", "I","재실여부를 선택해주세요.");
			return;
		}
	}

	if ( !MessageBox("SavConfirm", "C", "") ) {return;}

	var tran = new Trans();
	tran.setSvc(UPDATE_ID);
	tran.setUserParams("mdf_id="+f3.user_id.value);
	tran.setCallBack("callbacksaveWork");
	tran.open("f3","f3","/common.do");
}

/**
 * 근무설정 저장 후 콜백
 */
function callbacksaveWork()
{
	if (DataSet.getParam(UPDATE_ID, 1, 0, "SUCCESS_COUNT") > 0)
	{
		//MessageBox("InfSuccess", "I", "");
	}
	else
	{
		//MessageBox("InfFail", "E", "");
	}
}