/**
 * PROJ : Nexfron Intranet
 * NAME : sysWeeklyRpt.js
 * DESC : 주간보고 자바스크립트
 * Author : 김은수 과장
 * VER  : 1.0
 * Copyright 2009 Nexfron All rights reserved
 * ============================================================================================
 * 								변		경		사		항
 * ============================================================================================
 * VERSION		DATE		AUTHOR		DESCRIPTION
 * ============================================================================================
 * 1.0		2009.08.12		김은수		주석추가
 */
var SELECT_SEQ_ID	= "UCSYS103S";						//주간보고 순번 조회
var SELECT_ID		= "UCSYS100S";						//주간보고 조회
var DETAIL_ID		= "UCSYS101S,UCSYS102S";			//주간보고 상세조회
var INSERT_ID		= "UCSYS100I,UCSYS101I,UCSYS044I";	//주간보고 저장
//var INSERT_SIGN_ID	= "UCSYS044I";						//결재정보 저장
var UPDATE_ID		= "UCSYS101D,UCSYS100U,UCSYS101I,UCSYS102D,UCSYS044I";	//주간보고 수정
var UPDATE_EDIT_ID	= "UCSYS101D,UCSYS101I";			//주간보고 수정
var DELETE_ID		= "UCSYS101D,UCSYS100D,UCSYS102D";	//주간보고 결재정보 삭제
var SELECT_DAY_ID	= "UCSYS106S";						//일주일 날짜에 대한 휴무여부 조회

var g_Flag;		//상태플러그
var gid;
var gnext_val;
var objArr = new Array();
var popupGubun = "";
var savemode = ""; //저장 구분

/********************
* 초기화
********************/
function init()
{
	if(f.gradecd.value != '03'){
		fQuery.qrg_id.value = f.userid.value;
		fQuery.qrg_nm.value = f.usernm.value;
		fQuery.qrg_nm.disabled = true;
		btnUserId.disabled = true;
	}

	objArr = new Array(f.subject, f.user_prj_seq,f.weekly_content, f.next_weekly_content, f.issue);
	setMode("INIT");
}

/********************
* 근태정보 시간설정
********************/
function setWorkTime()
{
	for(var i = 0 ; i < f.start_tm.length-2 ; i++){
		f.start_tm[i].value	= "09:00";
		f.end_tm[i].value	= "18:00";
	}
}


/********************
* 조회
********************/
function queryList()
{
	if (getValidation(fQuery, true) == false) return;

	if (checkTermDate(fQuery.date_from, fQuery.date_to, true, true) == false) return;

	if(fQuery.dept_cd.value == "05")
	{
		fQuery.subQuery2.value = "";
	}
	else if(fQuery.dept_cd.value == "03")	//연구개발팀 + 프로젝트팀
	{
		fQuery.subQuery2.value = "'02','03'";
	}
	else if(fQuery.dept_cd.value == "01")	//솔루션영업팀 + CS팀
	{
		fQuery.subQuery2.value = "'01','06'";
	}
	else
	{
		fQuery.subQuery2.value = fQuery.dept_cd.value;
	}

	var trans = new Trans();
	trans.setPageRow(999);
	trans.setSvc(SELECT_ID);
	trans.setDefClick(false);
	trans.setWiseGrid("1");
	trans.setForwardId("wgdsl","");
	trans.open("fQuery","f","/wisegrid.do");
}

/********************
* 콜백
********************/
function callback(dsnm)
{
	switch (dsnm)
	{
		case SELECT_SEQ_ID :
			if(DataSet.getParam(dsnm, 1, 0, "next_val") != ""){
				gnext_val = DataSet.getParam(dsnm, 1, 0, "next_val");
				save_callback();
			}
			break;

		case SELECT_ID :
			setMode("INIT");
			break;

		case DETAIL_ID :
			for(var i=0 ; i < DataSet.getTotalCount("UCSYS102S") ; i++){
				f.content[i].value	= DataSet.getParam("UCSYS102S", 1, i, "content");
				f.start_tm[i].value = getFormatData(DataSet.getParam("UCSYS102S", 1, i, "start_tm"), "TIME");
				f.end_tm[i].value	= getFormatData(DataSet.getParam("UCSYS102S", 1, i, "end_tm"), "TIME");
				f.holi_gb[i].value	= DataSet.getParam("UCSYS102S", 1, i, "holi_gb");
				f.prj_seq[i].value	= DataSet.getParam("UCSYS102S", 1, i, "prj_seq");
			}

			setWeekDay();
			break;

		case INSERT_ID :
			if (DataSet.getParam("UCSYS100I", 1, 0, "SUCCESS_COUNT") > 0 && DataSet.getParam("UCSYS101I", 1, 0, "SUCCESS_COUNT") > 0)
			{
				MessageBox("InfSuccess", "I", "");
				queryList();
			}
			else
			{
				MessageBox("InfFail", "E", "");
			}

			break;

		case UPDATE_ID :
			if (DataSet.getParam("UCSYS100U", 1, 0, "SUCCESS_COUNT") > 0)
			{
				MessageBox("InfSuccess", "I", "");
				queryList();
			}
			else
			{
				MessageBox("InfFail", "E", "");
			}

			break;

		case DELETE_ID :
			if (DataSet.getParam("UCSYS100D", 1, 0, "SUCCESS_COUNT") > 0 && DataSet.getParam("UCSYS101D", 1, 0, "SUCCESS_COUNT") > 0)
			{
				MessageBox("Success", "I", "");
				clear(f);
				queryList();
			}
			else
			{
				MessageBox("Fail", "E", "");
			}

			break;

		case SELECT_DAY_ID :
			for(var i=0 ; i < DataSet.getTotalCount("UCSYS106S") ; i++){
				if(DataSet.getParam("UCSYS106S", 1, i, "hldy_f") == "Y" ||
					(DataSet.getParam("UCSYS106S", 1, i, "dayw") == "1" || DataSet.getParam("UCSYS106S", 1, i, "dayw") == "7") )
				{
					spnDayNm[i].innerHTML = "(<font color='red'>" + getFormatData(DataSet.getParam("UCSYS106S", 1, i, "bse_dt"), "DATE") + "</font>)";
					if(g_Flag!="U")
					{
						f.holi_gb[i].value = "H";
					}
				}
				else
				{
					spnDayNm[i].innerHTML = "(" + getFormatData(DataSet.getParam("UCSYS106S", 1, i, "bse_dt"), "DATE") + ")";
					if(g_Flag!="U")
					{
						f.holi_gb[i].value = "W";
					}
				}
			}
		default:

			break;
	}
}


/*****************/
//상세정보
//그리드 onclick 이벤트 함수
/*****************/
function showDetailO_obj(id, strColumnKey, nRow)
{
	switch(id)
	{
		//리스트 클릭시
		case SELECT_ID:

			setMode("U");
			//showDetailByWise(id, nRow, f);

			var obj = document.all(SELECT_ID);
			gid = obj.GetCellValue("id", nRow);

			if(gid == "") return;

			var trans = new Trans();
			trans.setUserParams("id="+gid);
			trans.setSvc(DETAIL_ID);
			trans.setWiseGrid("0");
			trans.open("f", "f", "/common.do");

		break;
	}
}

/*****************/
//등록버튼
/*****************/
function add()
{
	setMode("A");
}

/*****************/
//저장버튼 클릭시 순번 가져오기
/*****************/
function save(mode)
{
	if (mode == "edit")
	{
		savemode = mode;
		save_callback();
		return;
	}
	
	if(g_Flag == "U" && !(f.statcd.value == "01" || f.statcd.value == "05" || f.statcd.value == "06")) //01 1차신청, 05 반려, 06 임시저장
	{
		MessageBox("RPTError3", "I", "");
		return;
	}

	if (getValidation(f, true) == false) return;

	if(!MessageBox("SavConfirm", "C", ""))
		return;

	savemode = mode;

	if(g_Flag == "A")
	{
		var trans = new Trans();
		trans.setSvc(SELECT_SEQ_ID);
		trans.setWiseGrid("0");
		trans.open("f", "f", "/common.do");
	}
	else if(g_Flag == "U")
	{
		if(gid == "") return;

		save_callback();
	}
}

/*****************/
//저장버튼
/*****************/
function save_callback()
{
	var batchData = Array();
	var index = 0;
	var sParam = "";
	var sServiceID;

	addDay(removeMask(f.start_dt.value).substring(0,4), removeMask(f.start_dt.value).substring(4,6), removeMask(f.start_dt.value).substring(6,8), 1);

	for (var i=0; i<f.content.length; i++) {

		batchData[index] = "&qseq_no="+ i;
		batchData[index] += "&qcontent="+ paramEscape(f.content[i].value);
		batchData[index] += "&qwork_dt="+ addDay(removeMask(f.start_dt.value).substring(0,4), removeMask(f.start_dt.value).substring(4,6), removeMask(f.start_dt.value).substring(6,8), i);
		batchData[index] += "&qstart_tm="+ f.start_tm[i].value;
		batchData[index] += "&qend_tm="+ f.end_tm[i].value;
		batchData[index] += "&qholi_gb="+ f.holi_gb[i].value;
		batchData[index] += "&qprj_seq="+ f.prj_seq[i].value;

		sParam += batchData[index];
		index++;
	}

	if(savemode=="temp")
		sParam += "&tstatcd=06";
	else
		sParam += "&tstatcd=01";

	sParam += "&sign_tp_cd=02";
	var tran = new Trans();

	if(g_Flag == "A")
	{
		sServiceID	= INSERT_ID;
		tran.setUserParams("id="+gnext_val+sParam);
	}
	else if(g_Flag == "U")
	{
		if(gid == "") return;
		
		if (savemode == "edit")
		{
			sServiceID	= UPDATE_EDIT_ID;
			tran.setUserParams("id="+gid+sParam);
		}
		else
		{
			sServiceID	= UPDATE_ID;
			tran.setUserParams("id="+gid+sParam);
		}
	}

	tran.setSvc(sServiceID);
	tran.open("f","f","/common.do");
}

/*****************/
//삭제버튼
/*****************/
function del()
{
	if(g_Flag == "U" && f.statcd.value != "01"  && f.statcd.value != "06")
	{
		MessageBox("RPTError4", "I", "");
		return;
	}

	if(!MessageBox("DelConfirm", "C", ""))
		return;

	if(gid == "") return;

	var tran = new Trans();
	tran.setSvc(DELETE_ID);
	tran.setUserParams("id="+gid);
	tran.open("f","f","/common.do");
}

/********************
* 모드변경
********************/
function setMode(sType)
{
	g_Flag = sType;

	switch(sType)
	{
		case "INIT":	//초기화
			f.btnAdd.disabled = false;
			f.btnTempSave.disabled = true;
			f.btnSave.disabled = true;
			f.btnEdit.disabled = true;
			f.btnDel.disabled = true;
			clearInput();	//입력값 초기화
			setDisabledObj(objArr, true);	//입력값 활성화 or 비활성화
			setInput(true);	//입력값 활성화 or 비활성화
			f.chk.disabled = true;
			f.chk.checked = false;
			break;

		case "A":		//등록
			f.btnAdd.disabled = false;
			f.btnTempSave.disabled = false;
			f.btnSave.disabled = false;
			f.btnEdit.disabled = true;
			f.btnDel.disabled = true;
			clearInput();	//입력값 초기화
			setWorkTime();	//시간설정
			setDisabledObj(objArr, false);	//입력값 활성화 or 비활성화
			setInput(false);	//입력값 활성화 or 비활성화
			f.chk.disabled = false;
			//이번주 월요일 / 일요일까지 날짜 가져오기
			setCalendar("f.start_dt", f.today.value);
			//f.start_dt.value 	= getCurWeekDay(f.today.value, "1");	//월요일
			//f.end_dt.value 		= getCurWeekDay(f.today.value, "7");	//차주 일요일
			break;

		case "U":		//수정
			f.btnAdd.disabled = false;
			f.btnTempSave.disabled = false;
			f.btnSave.disabled = false;
			f.btnEdit.disabled = false;
			f.btnDel.disabled = false;
			setDisabledObj(objArr, false);	//입력값 활성화 or 비활성화
			setInput(false);	//입력값 활성화 or 비활성화
			f.chk.disabled = false;
			f.chk.checked = false;
			break;

		default:
			break;
	}
}

/**
 *	사용자 조직도 팝업
 **/
function openUserOrg(gb)
{
	popupGubun = gb;

	window.open("/jsp/common/comUserOrg.jsp" ,"UserOrg", "width=800,height=580");
}

//사용자정보 셋팅
function setOrgUserInfo(user_id, user_name)
{
	if(popupGubun == "qrg_id"){
		fQuery.qrg_id.value = user_id;
		fQuery.qrg_nm.value = user_name;
	}else{
		f.report_object.value = user_id;
		f.report_object_nm.value = user_name;
	}
}

/**
 * 작성자 onBlur
 */
function usernm_onBlur(obj)
{
	if(popupGubun == "qrg_id"){
		if(obj.value == "") {
			fQuery.qrg_id.value = "";
			fQuery.qrg_nm.value = "";
		}
	}else{
		if(obj.value == "") {
			f.report_object.value = "";
			f.report_object_nm.value = "";
		}
	}
}

/********************
* 입력정보 초기화
********************/
function clearInput()
{
	var input_list	= new Array("subject", "user_prj_seq", "start_dt", "end_dt", "weekly_content", "next_weekly_content", "statcdnm", "response", "issue", "rg_nm", "rg_dt", "mdf_nm", "mdf_dt");

	for(var i = 0 ; i < input_list.length ; i++){
		document.getElementById(input_list[i]).value	= "";
	}

	for(var i = 0 ; i < f.content.length ; i++){
		 f.content[i].value	= "";
	}

	for(var i = 0 ; i < f.start_tm.length ; i++){
		f.start_tm[i].value	= "";
		f.end_tm[i].value	= "";
	}

	for(var i = 0 ; i < f.holi_gb.length ; i++){
		if(i == 5 || i ==6){
			f.holi_gb[i].value	= "H";
		}else{
			f.holi_gb[i].value	= "W";
		}
	}

	for(var i = 0 ; i < f.prj_seq.length ; i++){
		f.prj_seq[i].value	= "";
	}
}

/********************
* 월요일~일요일 입력정보 활성화 or 비활성화
********************/
function setInput(gb)
{
	for(var i = 0 ; i < f.content.length ; i++){
		 f.content[i].disabled	= gb;
	}

	for(var i = 0 ; i < f.start_tm.length ; i++){
		f.start_tm[i].disabled	= gb;
		f.end_tm[i].disabled	= gb;
	}

	for(var i = 0 ; i < f.holi_gb.length ; i++){
		f.holi_gb[i].disabled	= gb;
		f.prj_seq[i].disabled	= gb;
	}
}

/********************
* 휴무여부 onchange
********************/
function holi_onChange(gb)
{
	if(f.holi_gb[gb].value == "W"){
		f.start_tm[gb].value	= "09:00";
		f.end_tm[gb].value		= "18:00";
	}else{
		f.start_tm[gb].value	= "";
		f.end_tm[gb].value		= "";
	}
}

/**
 * 이번주 해당 요일 가져오기
 * dt : 오늘 날짜
 * day : 구하고 싶은 요일 (일:0 월:1 화:2 ... 차주 일요일:7)
 */
function getCurWeekDay(dt, day)
{
	var result = "";

	dt = removeMask(dt);
	var curdt = new Date(dt.substr(0,4),dt.substr(4,2)-1,dt.substr(6,2));
	var curday = curdt.getDay(); //현재 요일
	var period = day - curday;

	result = getDateWithOffset(dt, period, "-");

	return result;
}

//현재 프로젝트 자동 셋팅
function setCurPrj()
{
	if(f.chk.checked)
	{
		for(var i = 0 ; i < 5 ; i++)
		{
			try
			{
				f.prj_seq[i].value = f.user_prj_seq.value;
			}
			catch(e)
			{
				f.prj_seq[i].value = "";
			}
		}
	}
	else
	{
		for(var i = 0 ; i < 5 ; i++)
		{
			f.prj_seq[i].value = "";
		}
	}
}

//휴가 구분 변경 시
function changeHoliGb(obj)
{
	var CEI = parseInt(getCurElementIdx(obj));	//현재 Element Index
	var preElement = f.elements[CEI - 1];		//이전 Element		: f.end_tm
	var pPreElement = f.elements[CEI - 2];		//이전전 Element 	: f.start_tm

	//휴무
	if(obj.value == "H")
	{
		preElement.value = "";
		pPreElement.value = "";
	}
	//휴가
	else if(obj.value == "V")
	{
		preElement.value = "";
		pPreElement.value = "";
	}
	//근무
	else if(obj.value == "W")
	{
		preElement.value = "18:00";
		pPreElement.value = "09:00";
	}
	else
	{
		preElement.value = "";
		pPreElement.value = "";
	}
}

//현재 Element Index
function getCurElementIdx(obj)
{
	var f = obj.form;

	for(var i = 0 ; i < f.elements.length ; i ++)
	{
		if(f.elements[i] == obj)
		{
			return i;
		}
	}
}

/**
  * 선택된 날짜 셋팅 (ucare_util.js에 있는 setCalendar를 오버라이딩 함.)
  * sType : 날짜를 받을 text 객체
  * sDate : text 객체 값
  * sType(날짜를 받을 text 객체)가 년월일중 년월만 받을경우 객체에 pattern속성을 주고 값을 M으로 셋팅해둔다.
  */
function setCalendar(sType, sDate)
{

	if(sType == "f.start_dt")
	{
		//이번주 월요일 / 일요일까지 날짜 가져오기
		f.start_dt.value 	= getCurWeekDay(sDate, "1");	//월요일
		f.end_dt.value 		= getCurWeekDay(sDate, "7");	//차주 일요일

		setWeekDay();
	}
	else
	{
		(eval(sType)).value = sDate;
	}
}

function setWeekDay()
{
	var trans = new Trans();
		trans.setSvc(SELECT_DAY_ID);
		trans.open("f", "f", "/common.do");

}

function setCheck()
{
	f.chk.checked = true;

		if(f.chk.checked)
	{
		for(var i = 0 ; i < 5 ; i++)
		{
			try
			{
				f.prj_seq[i].value = f.user_prj_seq.value;
			}
			catch(e)
			{
				f.prj_seq[i].value = "";
			}
		}
	}
	else
	{
		for(var i = 0 ; i < 5 ; i++)
		{
			f.prj_seq[i].value = "";
		}
	}

}
