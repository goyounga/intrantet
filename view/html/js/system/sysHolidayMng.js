var gsXaFlag;				// XA Flag(holiday)
var gsBXaFlag;
var gsWXaFlag;				// XA Flag(week)
var gsWBXaFlag;

var SELECT_ID 			= "UCSYS131S,UCSYS133S";
var CHECK_ID			= "UCSYS132S";
var SELECT_HOLIDAY_ID	= "UCSYS131S";
var INSERT_HOLIDAY_ID	= "UCSYS131I,UCSYS130S";
var UPDATE_HOLIDAY_ID	= "UCSYS131U,UCSYS134U,UCSYS133U";
var DELETE_HOLIDAY_ID	= "UCSYS134U,UCSYS131D";
var INSERT_HOLIDAY_ID2	= "UCSYS133U";

var SELECT_CALENDAR_ID	= "UCSYS133S";

var CURINDEX = 0;

var objArr 	= new Array();
var objWArr	= new Array();
var weekdayArr = new Array("일요일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일");
var g_userid;
/**
 * 초기화
 */
function setInit(yyyymm)
{
	g_userid = f.userid.value;

	//setButtonByAuth();
	//setButton(fEdit.btnSave_E, false);

	gsXaFlag = "I";
	gsBXaFlag = "I"

	objArr = new Array(fHoliday.ofd_nm, fHoliday.ofd_dt, fHoliday.effectyear, fHoliday.expireyear, fHoliday.slr_f_cd[0], fHoliday.slr_f_cd[1], fHoliday.hldy_f[0], fHoliday.hldy_f[1]);

	setMode(gsXaFlag);

	//gsWXaFlag = "I";
	//gsWBXaFlag = "I";

	//objWArr = new Array(fWeek.week, fWeek.startdate, fWeek.enddate, calSpan1, calSpan2);

	//setWMode(gsWXaFlag);

	var gridObj = document.getElementById(SELECT_HOLIDAY_ID);
	gridObj.setParam("vld_st_dt_format", "DATE");
	gridObj.setParam("vld_end_dt_format", "DATE");

	fCalendar.year.value = yyyymm.substring(0,4);
	fCalendar.month.value = yyyymm.substring(4);

	//fCalendar.year.value = new Date().getYear();
	//fCalendar.month.value = make2Byte(new Date().getMonth() + 1);

	//setWeek();

	selectAllInfo();
}

/**
 * 달력, 휴가정보 모두 조회
 */
function selectAllInfo()
{
	var params = "";
	params += "from_dd=" + fCalendar.year.value + fCalendar.month.value + "01";
	params += "&to_dd=" + fCalendar.year.value + fCalendar.month.value + "31";

	var tran = new Trans();
	tran.setDefClick(true);
	tran.setSvc(SELECT_ID);
	tran.setWiseGrid("1,0");
	tran.setForwardId("wgdsl","");
	tran.setPageRow("999");
	tran.setUserParams(params);
	//DEBUG = true;
	tran.open("fHoliday", "fHoliday", "/wisegrid.do");
}

/**
 * 달력정보 조회
 * flag : - (이전 달 조회), + (다음 달 조회)
 */
function getMonth(flag)
{
	var year = parseInt(fCalendar.year.value, 10);
	var month = parseInt(fCalendar.month.value, 10);

	if (flag == "-")
	{
		month = month - 1;

		if (month == 0)
		{
			year = year - 1;
			month = 12;
		}
	}
	else if (flag == "+")
	{
		month = month + 1;

		if (month == 13)
		{
			year = year + 1;
			month = 1;
		}
	}

	fCalendar.year.value = year;
	fCalendar.month.value = lpad(month+"", "0", 2);

	var params = "";
	params += "from_dd=" + fCalendar.year.value + fCalendar.month.value + "01";
	params += "&to_dd=" + fCalendar.year.value + fCalendar.month.value + "31";

	var trans = new Trans();
	trans.setSvc(SELECT_CALENDAR_ID);
	trans.setPageRow(31);
	trans.setUserParams(params);
	trans.open("fCalendar", "fCalendar", "/common.do");

	document.all(SELECT_HOLIDAY_ID).focus();
}

/**
 * 신규등록버튼 클릭
 * type : 버튼 타입 (H : 휴일, W : 주차)
 */
function setAddMode(type)
{
	if (type == "W" )
	{
	}
	else
	{
		if (gsXaFlag == "U")
		{
			gsBXaFlag = "U";
		}

		gsXaFlag = "A";
		setMode(gsXaFlag);
	}
}

/**
 * 취소버튼 클릭
 * type : 버튼 타입 (H : 휴일, W : 주차)
 */
function setCancelMode(type)
{
	if (type == "W")
	{
		setReset('W');
	}
	else
	{
		if (gsBXaFlag == "U")
		{
			setMode("U");
			showDetailO_obj(SELECT_HOLIDAY_ID, "", CURINDEX);
		}
		else
		{
			setMode(gsBXaFlag);
		}
	}
}

/*
 * 저장버튼 클릭시
 */
function checkSave()
{
	fHoliday.vld_st_dt.value = fHoliday.effectyear.value + "-01-01";
	fHoliday.vld_end_dt.value = fHoliday.expireyear.value + "-12-31";

	if (MessageBox("SavConfirm", "C", "") == false) return;
	if (getValidation(fHoliday, true) == false) return;
	if (checkTermDate(fHoliday.vld_st_dt, fHoliday.vld_end_dt, true, true) == false) return;

	// true
	var tran = new Trans();
	tran.setSvc(CHECK_ID);
	tran.open("fHoliday", "fHoliday", "/common.do");
}

/**
 * 실제저장
 * type : (H : 휴일, W : 주차s)
 */
function save(type)
{
	var queryid = "";
	var params = "";

	if (type == "W")	//사용하지 않음
	{
		/*
		if (getValidataion(fWeek, true) == false) return;

		queryid = UPDATE_WEEK_ID;
		params = "userid=" + g_userid;

		var tran = new Trans();
		tran.setSvc(queryid);
		tran.setUserParams(params);
		tran.open("fWeek", "fWeek", "/common.do");
		*/
	}
	else if (type == "H")
	{
		if (gsXaFlag == "A")
		{
			queryid = INSERT_HOLIDAY_ID;

			params = "userid=" + g_userid;

			if (fHoliday.slr_f_cd[0].checked == true)
			{
				params += "&column=bse_dt";
			}
			else
			{
				params += "&column=lnr_dt";
			}
		}
		else
		{
			if (fHoliday.ofd_seq.value == "")	return;

			queryid = UPDATE_HOLIDAY_ID;
			params = "userid=" + g_userid;
			//params += "&ofd_seq=" + fHoliday.ofd_seq.value;
			params += getParams();
		}

		var tran = new Trans();
		tran.setSvc(queryid);
		tran.setUserParams(params);
		tran.open("fHoliday", "fHoliday", "/common.do");

	}
}

function updateQuery()
{
	var userid = DataSet.getReqParam("UCSYS131I", "userid");
	var column = DataSet.getReqParam("UCSYS131I", "column");
	var params = "userid=" + userid + "&column=" + column;

	var tran = new Trans();
	tran.setSvc(INSERT_HOLIDAY_ID2);
	tran.setUserParams(params);
	tran.open("fHoliday", "fHoliday", "/common.do");
}

/**
 * 원본 DATA정보를 읽어와 params를 만들어준다.
 */
function getParams()
{
	var params = "";
	var ofd_seq = fHoliday.ofd_seq.value;
	var ofd_nm = "";
	var slr_f_cd = "";
	var gridObj = document.all(SELECT_HOLIDAY_ID)
	var size = gridObj.GetRowCount();
	//alert("size => " + size);
	for (var i=0; i<size; i++)
	{//alert(gridObj.GetCellValue("ofd_seq", i));
		if (gridObj.GetCellValue("ofd_seq", i) == ofd_seq)
		{
			ofd_nm = gridObj.GetCellValue("org_hldy_nm", i);
			slr_f_cd = gridObj.GetCellValue("org_slr_f_cd", i);
			break;
		}
	}
	//params += "&org_hldy_nm=" + ofd_nm;

	if (slr_f_cd == "Y")
	{
		params += "&column=bse_dt";
	}
	else
	{
		params += "&column=lnr_dt";
	}

	return params;
}

/**
 * 삭제버튼 클릭시
 */
function remove()
{
	if (MessageBox("DelConfirm", "C", "") == false) return;

	if (fHoliday.ofd_seq.value == "")	return;

	var params = "";
	params += "userid=" + g_userid;
	params += getParams();

	var tran = new Trans();
	tran.setSvc(DELETE_HOLIDAY_ID);
	tran.setUserParams(params);
	tran.open("fHoliday", "fHoliday", "/common.do");
}

/**
 * 공휴일 리스트 클릭시
 * id : WiseGrid 객체 ID
 * strColumnKey : 컬럼
 * nRow : Row Index
 */
function showDetailO_obj(id, strColumnKey, nRow)
{
	if (id == SELECT_HOLIDAY_ID)
	{
		showDetailByWise(SELECT_HOLIDAY_ID, nRow, fHoliday);

		//
		CURINDEX = nRow;
		gsBXaFlag = gsXaFlag;
		gsXaFlag = "U";
		setMode(gsXaFlag);
	}
}

/**
 * 일자 포맷주기
 * obj : 객체
 */
function onBlurDD(obj)
{
	var dd = numberMask(obj.value);
	obj.value = dd.substring(0,2) + "-" + dd.substring(2,4);
}

/**
 * callback
 * danm : DataSet ID(Query ID or WiseGrid ID)
 */
function callback(dsnm)
{
	if (DataSet.isError() == "true")	return; // FIXME 어떻게 할 것인지?

	if (dsnm == SELECT_ID || dsnm == SELECT_CALENDAR_ID)
	{
		setCalendarInfo();
	}
	else if (dsnm == INSERT_HOLIDAY_ID)
	{
		fHoliday.ofd_seq.value = DataSet.getParam("UCSYS130S", 1, 0, "seq");

		updateQuery();
	}
	else if (dsnm == CHECK_ID)
	{
		if (parseInt(DataSet.getParam(CHECK_ID, 1, 0, "cnt"), 10) > 0)
		{
			MessageBox("FCSHasData", "I", "");
			return;
		}
		else
		{
			save('H');
		}
	}
	else if (dsnm == INSERT_HOLIDAY_ID2)
	{
		if (DataSet.getParam(INSERT_HOLIDAY_ID2, 1, 0, "SUCCESS_COUNT") > 0)
		{
			fHoliday.org_hldy_nm.value = fHoliday.ofd_nm.value;

			if (fHoliday.slr_f_cd[0].checked == true)
			{
				fHoliday.org_slr_f_cd.value = "Y";
			}
			else
			{
				fHoliday.org_slr_f_cd.value = "N";
			}
			// grid 세팅
			CURINDEX = insertWiseGridRow(SELECT_HOLIDAY_ID, -1, fHoliday);

			gsXaFlag = "U";
			gsBXaFlag = gsXaFlag;
			setMode(gsXaFlag);

			//
			getMonth("0");
		}
	}
	else if (dsnm == UPDATE_HOLIDAY_ID)
	{
		if (DataSet.getParam("UCSYS131U", 1, 0, "SUCCESS_COUNT") > 0)
		{
			fHoliday.org_hldy_nm.value = fHoliday.ofd_nm.value;

			if (fHoliday.slr_f_cd[0].checked == true)
			{
				fHoliday.org_slr_f_cd.value = "Y";
			}
			else
			{
				fHoliday.org_slr_f_cd.value = "N";
			}

			// grid 세팅
			updateWiseGridRow(SELECT_HOLIDAY_ID, CURINDEX, fHoliday);

			gsBXaFlag = gsXaFlag;

			//
			getMonth("0");
		}
	}
	else if (dsnm == DELETE_HOLIDAY_ID)
	{
		if (DataSet.getParam("UCSYS131D", 1, 0, "SUCCESS_COUNT") > 0)
		{
			removeWiseGridRow(SELECT_HOLIDAY_ID, CURINDEX);

			gsBXaFlag = gsXaFlag;
			gsXaFlag = "I";
			setMode(gsXaFlag);

			//
			getMonth("0");
		}
	}
	/*
	//사용하지 않음
	else if (dsnm == UPDATE_WEEK_ID)
	{
		getMonth("0");
	}
	else if (dsnm == UPDATE_DD_ID)
	{
		getMonth("0");
	}
	*/
}

/**
 * 화면 컨트롤
 * mode : 화면모드 타입 (I : 초기화면, A : 등록모드, U : 수정모드)
 */
function setMode(mode)
{
	switch (mode)
	{
		case "I" 	:
			setButton(fHoliday.btnAdd_H, false);
			setButton(fHoliday.btnSave_H, true);
			setButton(fHoliday.btnDel_H, true);
			setButton(fHoliday.btnCancel_H, true);

			setReset('H');
			setDisabledObj(objArr, true);
			break;

		case "A"	:
			setButton(fHoliday.btnAdd_H, true);
			setButton(fHoliday.btnSave_H, false);
			setButton(fHoliday.btnDel_H, true);
			setButton(fHoliday.btnCancel_H, false);

			setDisabledObj(objArr, false);
			setReset('H');

			break;

		case "U"	:
			setButton(fHoliday.btnAdd_H, false);
			setButton(fHoliday.btnSave_H, false);
			setButton(fHoliday.btnDel_H, false);
			setButton(fHoliday.btnCancel_H, false);

			setDisabledObj(objArr, false);

			break;

		default 	:
			break;
	}
}

/**
 * 주차정보  버튼  컨트롤
 * mode : 화면모드 타입 (I : 초기화면, A : 등록모드, U : 수정모드)
 */
function setWMode(mode)
{
	switch (mode)
	{
		case "I" 	:
			setButton(fWeek.btnSave_W, true);

			setReset('W');
			setDisabledObj(objWArr, true);

			break;

		case "U"	:
			setButton(fWeek.btnSave_W, false);

			setDisabledObj(objWArr, false);

			break;

		default 	:
			break;
	}

//	mylog("이전상태 : " + gsBXaFlag);
}

/**
 * 상세정보 초기화
 * type : 버튼 타입 (H : 휴일, W : 주차)
 */
function setReset(type)
{
	if (type == "W")
	{
		fWeek.week.value = "";
		fWeek.startdate.value = "";
		fWeek.enddate.value = "";
	}
	else if (type == "H")
	{
		fHoliday.ofd_seq.value = "";
		fHoliday.ofd_seq.value = "";
		clear(fHoliday);

		fHoliday.slr_f_cd[0].checked = true;
		fHoliday.chkHoliType.checked = false;
		setEffectDate(fHoliday.chkHoliType);
	}
}

/**
 * 유효기간에 날짜를 세팅한다.
 * obj : checkbox 객체
 */
function setEffectDate(obj)
{
	if (obj.checked == true)
	{
		var now = new Date();

		fHoliday.effectyear.value = now.getYear();
		fHoliday.expireyear.value = now.getYear();
	}
	else
	{
		fHoliday.effectyear.value = "2003";
		fHoliday.expireyear.value = "2050";
	}
}

/**
 * 달력정보 세팅
 */
function setCalendarInfo()
{
	// table 초기화
	var tblObj;
	for (var i=0; i<6; i++)
	{
		for (var j=0; j<7; j++)
		{
			tblObj = document.all("tblDuty"+i+""+j);
			tblObj.rows[0].cells[0].innerText = "";

			if (j == 0)
			{
				tblObj.rows[0].cells[0].className = "cal2";
			}
			else if (j == 7)
			{
				tblObj.rows[0].cells[0].className = "cal3";
			}
			else
			{
				tblObj.rows[0].cells[0].className = "cal1";
			}

			tblObj.rows[1].cells[0].innerText = "";
			//tblObj.rows[2].cells[0].innerText = "";
			tblObj.rows[0].cells[1].innerText = "";
		}
	}

	// 달력정보 세팅
	var rowIndex = 0;
	var week = "";
	var weekday = 0;
	var day = 0;
	var lunar_dd   = "";
	var hldy_yn = "";
	var hldy_nm = "";
	var size = DataSet.getTotalCount(SELECT_CALENDAR_ID);
	for (var i=0; i<size; i++)
	{
		week 	= DataSet.getParam(SELECT_CALENDAR_ID, 1, i, "week");
		week	= (week == "0" ? "" : (week + "주차"));
		weekday = parseInt(DataSet.getParam(SELECT_CALENDAR_ID, 1, i, "weekday"), 10) - 1;
		day 	= parseInt(DataSet.getParam(SELECT_CALENDAR_ID, 1, i, "dd").substring(6,8), 10);
		lunar_dd = DataSet.getParam(SELECT_CALENDAR_ID, 1, i, "lunar_dd");
		hldy_yn = DataSet.getParam(SELECT_CALENDAR_ID, 1, i, "hldy_yn");
		hldy_nm = DataSet.getParam(SELECT_CALENDAR_ID, 1, i, "hldy_nm");

		tblObj = document.all("tblDuty"+rowIndex+""+weekday);
		tblObj.rows[0].cells[0].innerText = day;

		if (weekday == 0)
		{
			tblObj.rows[0].cells[0].className = "cal2";
		}
		else if (weekday == 6)
		{
			if (hldy_nm == "")
			{
				tblObj.rows[0].cells[0].className = "cal3";
			}
			else
			{
				if (hldy_yn == "N")
				{

				tblObj.rows[0].cells[0].className = "cal3";
				}
				else
			{
				tblObj.rows[0].cells[0].className = "cal2";
			}
			}
		}
		else
		{
			if (hldy_yn == "Y")
			{
				tblObj.rows[0].cells[0].className = "cal2";
			}
			else
			{
				tblObj.rows[0].cells[0].className = "cal1";
			}
		}

		tblObj.rows[1].cells[0].innerText = hldy_nm;
		//tblObj.rows[2].cells[0].innerText = week;
		//tblObj.rows[0].cells[1].innerText = week;

		fCalendar.elements["lunar_dd"+rowIndex+""+weekday].value = lunar_dd;
		fCalendar.elements["weekday"+rowIndex+""+weekday].value = weekday;
		fCalendar.elements["hldy_yn"+rowIndex+""+weekday].value = hldy_yn;
		fCalendar.elements["hldy_nm"+rowIndex+""+weekday].value = hldy_nm;

		if (weekday == 6 && i < (size-1))
		{
			rowIndex++;
		}
	}

	// 사용하지 않는 TR 숨기기
	var trObj;
	for (var i=0; i<6; i++)
	{
		trObj = document.all("calTr"+i);

		if (i <= rowIndex)
		{
			trObj.style.display = "";
		}
		else
		{
			trObj.style.display = "none";
		}
	}
}

/**
 * 달력 클릭시 주차정보 세팅
 */
function calendar_onclick(id)
{
	return;


	var tblObj = document.all(id);

	var day  = tblObj.rows[0].cells[0].innerText;
	//var week = tblObj.rows[2].cells[0].innerText;
	var week = tblObj.rows[0].cells[1].innerText;

	if (day == "")
	{
		fWeek.week.value = "";
		fWeek.startdate.value = "";
		fWeek.enddate.value = "";

		gsWXaFlag = "I";
		gsWBXaFlag = "I"
		setWMode(gsWXaFlag);
	}
	else
	{
		setWeek();

		fWeek.week.value = numberMask(week);

		if (week == "")
		{
			fWeek.startdate.value = fCalendar.year.value + "-" + fCalendar.month.value + "-" + lpad(day,"0",2);
			fWeek.enddate.value = fCalendar.year.value + "-" + fCalendar.month.value + "-" + lpad(day,"0",2);
		}
		else
		{
			getWeekInfo(day);
		}

		gsWBXaFlag = gsWXaFlag;
		gsWXaFlag = "U";
		setWMode(gsWXaFlag);
	}
}

/**
 * 달력 더블 클릭시 일자정보 조회
 * id : 달력칸 객체 ID
 * i : Row Index
 * j : Cell Index
 */
function calendar_edit(id, i, j)
{//alert(id);

	return;
	var tblObj = document.all(id);

	var day  = tblObj.rows[0].cells[0].innerText;
	var week = tblObj.rows[2].cells[0].innerText;

	if (day == "")	return;

	fEdit.dd.value = fCalendar.year.value + "-" + fCalendar.month.value + "-" + lpad(day,"0",2);
	fEdit.lunar_dd.value = getFormatData(fCalendar.elements["lunar_dd"+i+""+j].value, "DATE", "");
	fEdit.weekdaynm.value = weekdayArr[parseInt(fCalendar.elements["weekday"+i+""+j].value, 10)];
	fEdit.weeknm.value = tblObj.rows[2].cells[0].innerText;
	fEdit.hldy_yn[0].checked = HtmlUtil.decode(fCalendar.elements["hldy_yn"+i+""+j].value, "Y", true, false);
	fEdit.hldy_yn[1].checked = HtmlUtil.decode(fCalendar.elements["hldy_yn"+i+""+j].value, "N", true, false);
	fEdit.hldy_nm.value = fCalendar.elements["hldy_nm"+i+""+j].value;

	var vTop = event.clientY + 10 ;
	var vLeft = event.clientX + 10 ;

	//var vClientW = document.body.clientWidth;
	var vClientW = 610;
	var vClientH = document.body.clientHeight;

	if(vClientH - vTop < 240 ) vTop = vClientH-240;
	if(vClientW - vLeft < 360) vLeft = vClientW - 360;

	divEdit.style.left = vLeft;
	divEdit.style.top = vTop;
	divEdit.style.display = "";
}

/**
 * 일자정보 닫기
 */
function closeDiv()
{
	divEdit.style.display = "none";
}

/**
 * 일자정보 저장

 사용하지 않음

function saveDD()
{
	if (fEdit.dd.value == "")	return;

	//
	var tran = new Trans();
	tran.setSvc(UPDATE_DD_ID);
	tran.setMyUserParams("userid", g_userid);
	//DEBUG = true;
	tran.open("fEdit", "fEdit", "/common.do");
}
 */
/**
 * 주차정보 조회
 * day : 일
 */
function getWeekInfo(day)
{
	var year = fCalendar.year.value;
	var month = fCalendar.month.value;

	var params = "";
	params += "from_dd=" + addDay(year, month, day, -7);
	params += "&to_dd=" + addDay(year, month, day, 7);

	var tran = new Trans();
	tran.setSvc(SELECT_WEEK_ID);
	tran.setUserParams(params);
	//DEBUG = true;
	tran.open("fWeek", "fWeek", "/common.do");
}

/**
 * 주차정보 관리 년월 세팅
 */
function setWeek()
{
	document.all("yyyy").innerText = fCalendar.year.value;
	document.all("mm").innerText = fCalendar.month.value;
}

function setButton(obj, val)
{
	obj.disabled = val;
}