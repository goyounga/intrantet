var SELECT_ID = "UCSYS051S";
var INSERT_ID = "UCSYS051I";
var DELETE_ID = "UCSYS051D";
var UPDATE_ID = "UCSYS051U";
var SELECT_ID_BRTH = "UCSYS052S";
var SELECT_DEPT_C = "UCSYS053S";


var gsXaFlag = "";
var gsBXaFlag = "";
var gCurDay = "";
var day = "" ;
var CURINDEX = "";
var cntrcd = "";
var showmode = "";


/**
  * onLoad시 호출
  * 조회값중 년도를 저장
  * 조회값중 월을 저장
  * 조회값을 기준으로 조회한다.
  * 오늘날짜를 gCurDay에 저장
  * getMonth() 조회값을 기준으로 조회
  */
function init(sDay, sMode)
{
	gsXaFlag = "I";
	gsBXaFlag = "I";
	setMode(gsXaFlag);

	fQuery.year.value = sDay.substring(0,4);
	fQuery.month.value = sDay.substring(4,6);

	gCurDay = sDay;

	//화면 초기화
	var obj = document.all[SELECT_ID];
	for (var i=0; i < 42; i++)
	{
		obj[i].parentNode.className="";
		obj[i].rows[0].cells[0].innerText = "";
		obj[i].rows[0].cells[1].innerText = "";
		obj[i].rows[1].cells[0].innerText = "";
	}

	if((f.pos_cd.value=="05")	//차장
	|| (f.pos_cd.value=="06")	//팀장
	|| (f.pos_cd.value=="07")	//사장
	|| (f.pos_cd.value=="08")	//부장
	|| (f.pos_cd.value=="09")	//상무이사
	|| ((f.org_dept_cd.value=="04" && parent.f.nex_dept_cd.value=="01"))	//고객만족본부 - 경영관리팀-전은정 : 일단 hard cording
	){
		document.getElementById("ScheduleNotice").style.display = "";
	}

	//로딩 시 쿼리 자동 실행
	//if(f.query.value == "true")
	{
		getMonth('');
	}
}

/**
  * 조회값을 기준으로 달력 조회
  * sParam 쿼리 조회시 사용할 조회월(yyyymm)과 조회일(yyyymmdd)을 입력
  * 화면을 초기화한다.
  * 조회값으로 쿼리실행한다.
  */
function getMonth(flag)
{
	if (getValidation(fQuery,true)== false) return false;
	gsXaFlag = "I";
	setMode(gsXaFlag);
	var sParam ="yyyymm=";
	if (gCurDay != "") gCurDay.className= "tbl_td01";

	if (flag != "")
	{
		var index = fQuery.month.selectedIndex +(flag=="+"?1:-1) ;
		if (index < 0 )
		{
			if (fQuery.year.options.length  >	fQuery.year.selectedIndex+1)
			{
				fQuery.year.selectedIndex = 	fQuery.year.selectedIndex+1;
				fQuery.month.selectedIndex = 11;
			}
		}
		else if (fQuery.month.options.length  <=	index)
		{
			if (fQuery.year.selectedIndex != 0)
			{
				fQuery.year.selectedIndex = 	fQuery.year.selectedIndex-1;
				fQuery.month.selectedIndex = 0;
			}
		}
		else
			fQuery.month.selectedIndex = index;
	}

	//조회월
	day = fQuery.year.value+""+fQuery.month.value;
	sParam += day;
	//화면 초기화

	var obj = document.all[SELECT_ID];
	for (var i=0; i < 42; i++)
	{
		obj[i].parentNode.className="";
		//obj[i].rows[0].cells[0].innerText = "";
		obj[i].rows[0].cells[0].innerHTML = "<font id='calDay_" + i + "'>&nbsp</font>"
		obj[i].rows[0].cells[1].innerText = "";
		obj[i].rows[1].cells[0].innerText = "";
	}
	//쿼리실행
	var trans = new Trans();
	trans.setUserParams(sParam);
	trans.setSvc(SELECT_ID + "," + SELECT_ID_BRTH);
	//trans.setSvc(SELECT_ID);
	trans.setCallBack("showCalendar");
	trans.setPageRow(300);
	trans.open("fQuery","f","/common.do");
	setMode("C");
}

/**
 * 기념일 셋팅
 * day    : 해당 날짜
 * index  : 달력 순번
 * return : 기념일 내용
 */
function getAnniversarySchedule( day, index )
{
	try{

	var aArry = DataSet.getParamArrHash(SELECT_ID_BRTH, DataSet.getCurPage(SELECT_ID_BRTH));
	var sHTML = "";

			for (var j=0; j < aArry.length; j++)
			{
				var ht2 = aArry[j];

				if (day == ht2.get("bse_dt"))
				{
					var brthnm = ht2.get("brthnm");
					var no     = ht2.get("no");
					var shortBrthNm = (brthnm.length > 10) ? brthnm.substr(0,9)+"..." : brthnm;
					//sHTML += "<span><font style='font-weight:normal;font-color:black'>"+brthnm+"</font></span>&nbsp;<br>";

					//sHTML += "<span onclick=showDetail_obj('ANNIV',"+index+",'"+day+"','"+encodeURIComponent(brthnm)+"') style='font-weight:bold;font-color:red' style=cursor:hand title="+(brthnm+" 축하드립니다.")+">";
					//sHTML +=     "<font id='chgtitle' onmouseover=boldChgOver(this,'OVER') onmouseout=boldChgOut(this,'OUT') style='font-weight:normal;font-color:black'>" + shortBrthNm + "</font></span>&nbsp;<br>";

					if((f.pos_cd.value=="05")	//차장
					|| (f.pos_cd.value=="06")	//팀장
					|| (f.pos_cd.value=="07")	//사장
					|| (f.pos_cd.value=="08")	//부장
					|| (f.pos_cd.value=="09")	//상무이사
					|| ((f.org_dept_cd.value=="04" && parent.f.nex_dept_cd.value=="01"))	//고객만족본부 - 경영관리팀-전은정 : 일단 hard cording
					){
						if(no=="1")	//기념일
						{
							sHTML += "<span onclick=showDetail_obj('ANNIV',"+index+",'"+day+"','"+encodeURIComponent(brthnm)+"') style='font-weight:bold;font-color:red' style=cursor:hand title="+(brthnm+" 축하드립니다.")+">";
							sHTML +=     "<font id='chgtitle' onmouseover=boldChgOver(this,'OVER') onmouseout=boldChgOut(this,'OUT') style='font-weight:normal;font-color:black' color='black'>" + shortBrthNm + "</font></span>&nbsp;<br>";
						}
						else		//휴가전체
						{
							sHTML +=     "<font id='chgtitle' style='font-weight:normal;font-color:blue;cursor:arrow' color='#3070E7'>" + shortBrthNm + "</font>&nbsp;<br>";
						}
					}
					else
					{
						if(no=="1")	//기념일
						{
							sHTML += "<span onclick=showDetail_obj('ANNIV',"+index+",'"+day+"','"+encodeURIComponent(brthnm)+"') style='font-weight:bold;font-color:red' style=cursor:hand title="+(brthnm+" 축하드립니다.")+">";
							sHTML +=     "<font id='chgtitle' onmouseover=boldChgOver(this,'OVER') onmouseout=boldChgOut(this,'OUT') style='font-weight:normal;font-color:black'>" + shortBrthNm + "</font></span>&nbsp;<br>";
						}
						else		//휴가
						{
							var user_id = ht2.get("user_id");
							if(f.userid.value==user_id)	//자신만
							{
								sHTML +=     "<font id='chgtitle' style='font-weight:normal;font-color:blue;cursor:arrow' color='#3070E7'>" + shortBrthNm + "</font>&nbsp;<br>";
							}
						}						
					}
				}
			}//for

	return sHTML;
	}catch(e){alert(e.description);}
}
/**
  * getMonth()에서 실행한 쿼리의 callback이다.
  * SELECT_ID를 조회한값을 화면에 그려준다
  * obj : SELECT_ID의 object이다.
  * aArray : 조회한 SELECT_ID의 data들의 array값이다.
  * week : 1년의 몇째주인지 나타낸다.
  * ht : SELECT_ID의 i번째 row값들
  * ht2 : SELECT_ID의 j번째 row값들
  * day : 조회한 월의 날짜(1~31)
  * index : 화면의 42칸중에 실제data가 들어가는 값의 index이다.
  */
function showCalendar()
{
	var obj = document.all[SELECT_ID];
	var aArry = DataSet.getParamArrHash(SELECT_ID,DataSet.getCurPage(SELECT_ID));
	var week = aArry[0].get("week_ord");
	var tempweek = 0;

	for (var i=0; i < aArry.length; i++)
	{
		//SELECT_ID의 i번째 row값들
		var ht = aArry[i];
		//해당월의 일자(1~31)
		var day = ht.get("bse_dt");
		//실제 data가 있는 그리드의 index값
		var index = (parseInt(ht.get("dayw"))-1) + (parseInt(ht.get("week_ord")) - parseInt(week)) * 7;

		var hldy_f  = ht.get("hldy_f");
		var hldy_nm = ht.get("hldy_nm");
//		var brth 	= ht.get("brth");	//직원생일

		if (index >41) continue;
		var sHTML = "";
		//오늘 날자의 그리드 색을 변경
		if (day == gCurDay)
		{
			 obj[index].parentNode.className="cal_today";
		}
		//화면에 날자를 그려준다
		//obj[index].rows[0].cells[0].innerText = ht.get("bse_dt").substr(6,8);
		obj[index].rows[0].cells[0].innerHTML = "<font id='calDay_" + index + "'>" + ht.get("bse_dt").substr(6,8) + "</font>"
		eval("calTd_" + index).style.cursor = "hand";
		//calTr[index].onmouseover = boldChgOver;
		//calTr[index].onmouseout = boldChgOut;

		//토,일요일이면 빨강색으로 표시한다.
		if (ht.get("dayw") == "1")
		{
			//주말
			obj[index].rows[0].cells[0].className = "cal2";
			obj[index].rows[0].cells[1].className = "cal2";
			if ( hldy_f == "N" )
			{
				obj[index].rows[0].cells[0].className = "cal2";
				obj[index].rows[0].cells[1].className = "cal1";
				if(hldy_nm != "")
				{
					obj[index].rows[0].cells[1].innerText = hldy_nm;
				}
			}
			if(hldy_nm != "")
			{
				obj[index].rows[0].cells[1].innerText = hldy_nm;
			}
		}
		else if (ht.get("dayw") == "7")
		{
			//주말
			obj[index].rows[0].cells[0].className = "cal3";
			obj[index].rows[0].cells[1].className = "cal3";

			if ( hldy_f == "N" )
			{
				obj[index].rows[0].cells[0].className = "cal3";
				obj[index].rows[0].cells[1].className = "cal1";
				if(hldy_nm != "")
				{
					obj[index].rows[0].cells[1].innerText = hldy_nm;
				}
			}
			if(hldy_nm != "")
			{
				obj[index].rows[0].cells[1].innerText = hldy_nm;
			}
		}
		else if ( hldy_f == "Y" )
		{
			obj[index].rows[0].cells[0].className = "cal2";
			obj[index].rows[0].cells[1].className = "cal2";
			if(hldy_nm != "")
			{
				obj[index].rows[0].cells[1].innerText = hldy_nm;
			}
		}
		else
		{	//평일
			obj[index].rows[0].cells[0].className = "cal1";
			obj[index].rows[0].cells[1].className = "cal1";
			if(hldy_nm != "")
			{
				obj[index].rows[0].cells[1].innerText = hldy_nm;
			}
		}
		sHTML += getAnniversarySchedule( day, index );	//기념일 채운다

		//해당일에 일정이 있으면 화면에 그려준다.
		if (ht.get("cen_sch_sbjt") != "")
		{
			for (var j=i; j < aArry.length; j++)
			{
				var ht2 = aArry[j];
				//해당일에 일정이 존재하면
				if (day == ht2.get("date"))
				{
					//일정제목이 10글자 이상이면 9글자만 보여준다.
					if(ht2.get("cen_sch_sbjt").length > 10)
					{
						var changeTitle	= ht2.get("cen_sch_sbjt").substr(0,9);
						changeTitle = changeTitle + "...";
					}
					else changeTitle	= ht2.get("cen_sch_sbjt");

					if(changeTitle != "")

					//span을 통해 화면에 일정제목을 표시하고 onclick=showDetail_obj()와 onclick=del()를 설정한다.
					sHTML += "<span onclick=showDetail_obj("+j+","+index+") style='font-weight:bold;font-color:red' style=cursor:hand title="+ht2.get("cen_sch_cont")+"><font id='chgtitle' onmouseover=boldChgOver(this,'OVER') onmouseout=boldChgOut(this,'OUT') style='font-weight:normal;font-color:black'>" + changeTitle + "</font></span>&nbsp;"+
					"<font color=red style='font-weight:bold'  onclick=del("+ht2.get("cen_sch_id")+") style=cursor:hand>x</font><br>";
				}
				else
				{
					//일정이 존재하지 않으면 j-1로  i값을 변경하고 가장 가까운 for문을 빠져나간다.
					i = j-1;
					break;
				}
			}
		}

		//해당일자의 일정란에 span값을 입력해 실제 화면에 뿌려준다.
		obj[index].rows[1].cells[0].innerHTML = sHTML;

		if (tempweek < (parseInt(ht.get("week_ord")) - parseInt(week)))
		{
			tempweek = (parseInt(ht.get("week_ord")) - parseInt(week));
		}
	}

	// 사용하지 않는 TR 숨기기
	var trObj;
	var trHeight;
	for (var i=0; i<6; i++)
	{
		trObj = document.all("calTr"+i);
		trHeight = 	100 / (tempweek+1);

		if (i < tempweek+1)
		{
			trObj.style.display = "";
			trObj.style.height =trHeight+"%";
		}
		else
		{
			trObj.style.display = "none";
			trObj.style.height = 0;
		}
	}

}

/**
  * 센터일정에 마우스 오버시 폰트 변경
  */
function boldChgOver(obj, chg, idx)
{
	if(chg == "OVER")
	{
		obj.className="Fblue";
		obj.style.fontWeight="bold";
	}
	else
	{
		try {eval("calDay_"+idx).style.fontWeight="bold";} catch (e) {}
	}
}

/**
  * 센터일정에 마우스 아웃시 폰트 변경
  */
function boldChgOut(obj, chg, idx)
{
	if(chg == "OUT")
	{
		obj.className="";
		obj.style.fontWeight="normal";
	}
	else
	{
		try {eval("calDay_"+idx).style.fontWeight="normal";} catch (e) {}
	}
}

/**
  * 일정을 원클릭시 호출한다.
  * gsXaFlag를 U로 하며 버튼을 수정모드(setMode())로 변경한다.
  * 화면에 센터일정을(divPlan) 보여준다.
  * top : y좌표를 나타낸다.
  * left : x좌표를 나타낸다.
  * index 실제화면에 뿌려진 날짜의 index
  * divindex 화면 42칸의 index
  * 화면에 클릭한 일정의 상세내용을 표시한다.
  */
function showDetail_obj(index, divindex, arg3, arg4)
{
	var top;
	var left;

	//화면을 4등분하여 divPlan을 각각의 절대좌표에 divPlan을 그려준다.
	if(divindex < 21)
	{
		if(divindex % 7 < 4)
		{
			//좌측위
			top = 200;
			left = 100;
		}
		else
		{
			//우측위
			top = 200;
			left = 450;
		}
	}
	else
	{
		if(divindex % 7 < 4)
		{
			//좌측아래
			top = 500;
			left = 100;
		}
		else
		{
			//우측아래
			top = 500;
			left = 450;
		}
	}
	divPlan.style.top  = top;
	divPlan.style.left = left;

	if( index=="ANNIV" )
	{
		showmode = "U";		//showDetail_obj호출시  showPlan도 타기때문에 showmode로 처리해준다... 누군가 꼼수로 처리해놓은 로직.... 제발 이런짓은 자제하자
		setMode("X");
		divPlan.style.display = "";
		clear(f);
		f.date.value          = dateMask(arg3);
		f.cen_sch_sbjt.value  = decodeURIComponent(arg4);
		f.cen_sch_cont.value  = decodeURIComponent(arg4) + " 축하드립니다.";
		f.cen_sch_sbjt.readOnly  = true;
		f.cen_sch_cont.readOnly  = true;
	}
	else
	{
		gsXaFlag = "U";
		gsBXaFlag = "U";
		showmode = "U";
		setMode(gsXaFlag);
		divPlan.style.display="";
		CURINDEX = index;

		f.cen_sch_sbjt.readOnly  = false;
		f.cen_sch_cont.readOnly  = false;

		//화면에 상세내용을 뿌려준다.
		showDetail(SELECT_ID, index, f);

		chgDept_cd(DataSet.getParam(SELECT_ID, 1, index, "dept_cd"));

	}
}

/**
  * 부서코드등록
  */
function chgDept_cd(dept_cd)
{
	var trans = new Trans();
	trans.setSvc(SELECT_DEPT_C);
	trans.setPageRow(9999);
	trans.setAsync(false);
	trans.setWait(false);
	trans.setMyUserParams("id",   "dept_cd");
	trans.setMyUserParams("etc1",   f.nex_dept_cd.value);
	trans.setCallBack("callbackChgDept_cd('"+dept_cd+"')");
	trans.open("","f","/common.do");
}

/**
  * 부서코드등록 콜백
  */
function callbackChgDept_cd(dept_cd)
{
     if(dept_cd == "undefined") dept_cd = "";

	 f.dept_cd.value = dept_cd;
}

/**
  * 그리드를 더블클릭시 호출한다.
  * gsXaFlag를 A로 하며 버튼을 등록모드(setMode())로 변경한다.
  * 화면에 센터일정을(divPlan) 보여준다.
  * top : y좌표를 나타낸다.
  * left : x좌표를 나타낸다.
  * index 화면 42칸의 index
  * 화면에 클릭한 일정의 상세내용을 표시한다.
  */
function showPlan(obj, index)
{
	if(showmode == "U" || showmode == "D")
	{
		showmode = "";
		return;
	}
	gsXaFlag = "A";
	gsBXaFlag = "A";
	setMode(gsXaFlag);
	CURINDEX = index;
	clear(f);
	var obj = document.all[SELECT_ID];
	//더블 클릭한 그리드의 날짜가 없으면 divPlan을 지운다.
	if ( trim(obj[index].rows[0].cells[0].innerText) == "" )
	{
		divPlan.style.display="none";
		return;
	}
	divPlan.style.display="";

	var top;
	var left;

	//화면을 4등분하여 divPlan을 각각의 절대좌표에 divPlan을 그려준다.
	if(index < 21)
	{
		if(index % 7 < 4)
		{
			//좌측위
			top = 200;
			left = 100;
		}
		else
		{
			//우측위
			top = 200;
			left = 450;
		}
	}
	else
	{
		if(index % 7 < 4)
		{
			//좌측아래
			top = 500;
			left = 100;
		}
		else
		{
			//우측아래
			top = 500;
			left = 450;
		}
	}
	divPlan.style.top  = top;
	divPlan.style.left = left;

	//더블 클릭한 그리드의 날짜
	f.date.value = day.substr(0,4) + "-" + day.substr(4,2) + "-" + obj[index].rows[0].cells[0].innerText;

	if (gsXaFlag == "U")
	{
		gsBXaFlag = "U";
	}
	gsXaFlag = "A";
	setMode(gsXaFlag);
	f.cen_sch_sbjt.readOnly  = false;
	f.cen_sch_cont.readOnly  = false;
	f.cen_sch_sbjt.focus();
	divPlan.style.display = "";
}

/**
  * 저장버튼 클릭시 호출한다.
  * 입력값의 getValidataion을 체크한다.
  * 소속의 분류를 구분한다.
  * gsXaFlag로 등록인지 수정인지 구별한다.
  * 쿼리를 실행한다.
  */
function save(obj, f, bMag)
{
	if (!f) f = document.forms[0];
	if (getValidation(f, true) == false) return;
	if (MessageBox("SavConfirm", "C", "") == false) return;

	var sParam = "";

	// 등록 or 수정
	var sServiceID;
	if (gsXaFlag == "A") sServiceID = INSERT_ID;
	else sServiceID	= UPDATE_ID;

	var tran = new Trans();
	tran.setUserParams(sParam);
	tran.setSvc(sServiceID);
	tran.open("f","f","/common.do");

	setMode("C");
}


/**
  * 삭제버튼 클릭시 호출한다.
  * 다시한번 삭제할것인지 확인한다.
  * 쿼리를 실행한다.
  */
function del(cen_sch_id)
{
	if( cen_sch_id == undefined ) cen_sch_id = f.cen_sch_id.value;

	showmode = "D";
	if (MessageBox("DelConfirm", "C", ""))
	{
		var tran = new Trans();
		tran.setUserParams("cen_sch_id="+cen_sch_id);
		tran.setSvc(DELETE_ID);
		tran.open("","f","/common.do");
	}
}

/**
  * 닫기버튼 클릭시 호출한다.
  * 화면에 보여지는 divPlan을 지운다.
  */
function closePlan()
{
	divPlan.style.display="none";
}

/**
  * 추가버튼 클릭시 호출한다.
  * gsXaFlag를 A로 하며 버튼을 등록모드(setMode())로 변경한다.
  * 등록 콤보박스를 비활성화 시킨다.
  * 기준 일자를 뺀 모든것을 클리어한다.
  */
function add()
{
	if (gsXaFlag == "U")
	{
		gsBXaFlag = "U";
	}
	gsXaFlag = "A";
	setMode(gsXaFlag);

	var temp = f.date.value;
	clear(f);

	f.date.value = temp;
	f.cen_sch_sbjt.focus();
}

function calPrint()
{
	divbutton.style.display = "none";
	window.print();
	divbutton.style.display = "";
}

function setCancelMode()
{
	if (gsBXaFlag == "U")
	{
		setMode("U");
		showDetail(SELECT_ID, CURINDEX, f);
	}
	else
	{
		clear(f);
		f.date.value = fQuery.year.value+"-"+fQuery.month.value+"-"+document.all[SELECT_ID][CURINDEX].rows[0].cells[0].innerText;
		setMode(gsBXaFlag);
	}
}

/**
  * 상태별 버튼제어(disabled)
  */
function setMode(sType)
{
	switch (sType)
	{
		case "I":
			if (f.btnAdd)  		f.btnAdd.disabled = false;
			if (f.btnSave)  	f.btnSave.disabled = true;
			if (f.btnDel)  		f.btnDel.disabled = true;
			if (f.btnClose)  	f.btnClose.disabled = true;
			if (f.btnCancel)  	f.btnCancel.disabled = false;
			break;
		case "A":
			if (f.btnAdd)  		f.btnAdd.disabled = true;
			if (f.btnSave)  	f.btnSave.disabled = false;
			if (f.btnDel)  		f.btnDel.disabled = true;
			if (f.btnClose)  	f.btnClose.disabled = false;
			if (f.btnCancel)  	f.btnCancel.disabled = false;
			break;
		case "U":
			if (f.btnAdd)  		f.btnAdd.disabled = false;
			if (f.btnSave)  	f.btnSave.disabled = false;
			if (f.btnDel)  		f.btnDel.disabled = false;
			if (f.btnClose)  	f.btnClose.disabled = false;
			if (f.btnCancel)  	f.btnCancel.disabled = false;
			break;
		case "C":
			if (f.btnAdd)  		f.btnAdd.disabled = true;
			if (f.btnSave)  	f.btnSave.disabled = true;
			if (f.btnDel)  		f.btnDel.disabled = true;
			if (f.btnClose)  	f.btnClose.disabled = true;
			if (f.btnCancel)  	f.btnCancel.disabled = true;
			break;
		case "X":
			if (f.btnAdd)  		f.btnAdd.disabled 	 = true;
			if (f.btnSave)  	f.btnSave.disabled 	 = true;
			if (f.btnDel)  		f.btnDel.disabled 	 = true;
			if (f.btnClose)  	f.btnClose.disabled  = false;
			if (f.btnCancel)  	f.btnCancel.disabled = true;
			break;
		default:
			break;
	}
}


/**
  * callback()
  */
function callback(sServiceID)
{
	switch (sServiceID)
	{
		case SELECT_ID:
			gsXaFlag = "I";
			setMode("gsXaFlag");
			break;
		case UPDATE_ID:
			if (DataSet.getParam(sServiceID, 1, 0, "SUCCESS_COUNT") > 0)
			{
				divPlan.style.display="none";
				getMonth('');
				//top.ifmSubMain.callNote();
			}
			break;
		case INSERT_ID:
			if (DataSet.getParam(sServiceID, 1, 0, "SUCCESS_COUNT") > 0)
			{
				divPlan.style.display="none";
				getMonth('');
				//top.ifmSubMain.callNote();
			}
			break;
		case DELETE_ID:
			if (DataSet.getParam(sServiceID, 1, 0, "SUCCESS_COUNT") > 0)
			{
				divPlan.style.display="none";
				getMonth('');
				//top.ifmSubMain.callNote();
			}
			break;
		default:
			break;
	}
}

/**
  * 닫기
  */
function winClose()
{
	parent.window.close();
}


/**
  * 부서코드조회
  **/
function chgDept()
{
	var trans = new Trans();
	trans.setSvc(SELECT_DEPT_C);
	trans.setPageRow(9999);
	trans.setAsync(false);
	trans.setWait(false);
	trans.setMyUserParams("id",   "dept_cd");
	trans.setMyUserParams("etc1",   fQuery.nex_dept_cd.value);
	trans.setCallBack("callbackChgDept");
	trans.open("","fQuery","/common.do");
}

/**
  * 부서코드조회 콜백
  **/
function callbackChgDept()
{
	getMonth('');
}

