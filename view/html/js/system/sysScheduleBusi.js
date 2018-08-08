var sServiceID = "UCCOMCODELIST";
var sServiceIDs = "";

var BUSI_SELECT = "UCSYS1510S"
var BUSI_CHO_SELECT = "UCSYS1511S"
var SELECT_ID = "UCSYS1512S";
var INSERT_ID = "UCSYS1510I";
var DELETE_ID = "UCSYS1510D";
var UPDATE_ID = "UCSYS1510U";

var cen_sch_id;

var gsXaFlag = "";
var gsBXaFlag = "";
var gCurDay = "";
var day = "" ;
var CURINDEX = "";
var cntrcd = "";
var showmode = "";
var mode = "";

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
	//trans.setSvc(SELECT_ID + "," + CALENDAR_ID);
	trans.setSvc(SELECT_ID);	
	trans.setCallBack("showCalendar");
	trans.setPageRow(300);
	trans.open("","","/common.do");
	setMode("C");
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
		default:
			break;
	}
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

	var temp = f.bse_dt.value;
	clear(f);

	f.bse_dt.value = temp;	
	f.cen_sch_sbjt.focus();
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
	if (gsXaFlag == "A") sServiceIDs = INSERT_ID;
	else sServiceIDs	= UPDATE_ID;
	
	var tran = new Trans();
	tran.setUserParams(sParam);
	tran.setSvc(sServiceIDs);	
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
		sServiceIDs	= DELETE_ID;
		
		var tran = new Trans();
		tran.setUserParams("cen_sch_id="+cen_sch_id);
		tran.setSvc(DELETE_ID);			
		tran.open("","f","/common.do");						
	}
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
		f.bse_dt.value = fQuery.year.value+"-"+fQuery.month.value+"-"+document.all[SELECT_ID][CURINDEX].rows[0].cells[0].innerText;
		setMode(gsBXaFlag);
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
function showDetail_obj(index, divindex)
{
		
	gsXaFlag = "U";
	gsBXaFlag = "U";
	showmode = "U";
	setMode(gsXaFlag);
	divPlan.style.display="";
	CURINDEX = index;

	var top;
	var left;

	//화면을 4등분하여 divPlan을 각각의 절대좌표에 divPlan을 그려준다.
	if(divindex < 21)
	{
		if(divindex % 7 < 4)
		{
			//좌측위
			top = 150;
			left = 100;
		}
		else
		{	
			//우측위
			top = 150;
			left = 450;
		}
	}
	else
	{
		if(divindex % 7 < 4)
		{
			//좌측아래
			top = 400;
			left = 100;
		}
		else
		{
			//우측아래
			top = 400;
			left = 450;
		}
	}
	divPlan.style.top  = top;
	divPlan.style.left = left;

	//화면에 상세내용을 뿌려준다.
	showDetail(SELECT_ID, index, f);		
}

/**
  * 닫기버튼 클릭시 호출한다.
  * 화면에 보여지는 divPlan을 지운다.
  */
function closePlan()
{
	divPlan.style.display="none";
}

function calPrint()
{
	divbutton.style.display = "none";
	window.print();
	divbutton.style.display = "";
}

/**
  * 닫기
  */
function winClose()
{
	parent.window.close();
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
		eval("calDay_"+idx).style.fontWeight="bold";
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
		eval("calDay_"+idx).style.fontWeight="normal";
	}
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
	if ((obj[index].rows[0].cells[0].innerText) == ""){
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
			top = 150;
			left = 100;
		}
		else
		{
			//우측위
			top = 150;
			left = 450;
		}
	}
	else
	{
		if(index % 7 < 4)
		{
			//좌측아래
			top = 400;
			left = 100;
		}
		else
		{
			//우측아래
			top = 400;
			left = 450;
		}
	}
	divPlan.style.top  = top;
	divPlan.style.left = left;
	
	//더블 클릭한 그리드의 날짜
	
	f.bse_dt.value = day.substr(0,4) + "-" + day.substr(4,2) + "-" + obj[index].rows[0].cells[0].innerText;

	if (gsXaFlag == "U")
	{
		gsBXaFlag = "U";
	}
	gsXaFlag = "A";
	setMode(gsXaFlag);
	f.cen_sch_sbjt.focus();
	divPlan.style.display = "";
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
	
		var hldy_f = ht.get("hldy_f");
		var hldy_nm = ht.get("hldy_nm");
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
		}

		//해당일에 일정이 있으면 화면에 그려준다.
		if (ht.get("cen_sch_sbjt") != "")
		{
			for (var j=i; j < aArry.length; j++)
			{
				var ht2 = aArry[j];
				//해당일에 일정이 존재하면 
				if (day == ht2.get("bse_dt"))
				{
					//일정제목이 10글자 이상이면 9글자만 보여준다.
					if(ht2.get("cen_sch_sbjt").length > 10)
					{
						var changeTitle	= ht2.get("cen_sch_sbjt").substr(0,9);
						changeTitle = changeTitle + "...";
					}
					else changeTitle	= ht2.get("cen_sch_sbjt");
					
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
			//해당일자의 일정란에 span값을 입력해 실제 화면에 뿌려준다.
			obj[index].rows[1].cells[0].innerHTML = sHTML;
		}	
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



/******************************************************여기까지가 탭 1 달력부분*********************************************************************************/

/**
 * 메인 시작시
 */
function inits()
{
	//setButton(fs.btnSave, true);
}

/**
 * 팝업 시작시
 */
function setInit(pop_type)
{
	mode = "1";
	gsXaFlag = pop_type;
	gsBXaFlag = pop_type;
	
	if("U" == pop_type){
		update_query();
	}
}

/**
 * 조회버튼 클릭시
 */
function queryList()
{
	if (getValidation(fQuerys, true) == false) return;

	var tran = new Trans();    
	 
	tran.setSvc(BUSI_SELECT);
	tran.setWiseGrid("1");
	tran.setForwardId("wgdsl","");
	tran.open("fQuerys","fs","/wisegrid.do");
}

/**
 * 리스트 클릭시
 */
 
function showDetailO_obj(id, strColumnKey, nRow)
{
	cen_sch_id = DataSet.getParam(BUSI_SELECT, 1, nRow, "cen_sch_id");
	fs.btnSave.disabled = false;
}

/**
 * 팝업창 내용 가지고 갈때
 * obj : 버튼객체
 */
function update_query()
{
	 var tran = new Trans();    
	 tran.setSvc(BUSI_CHO_SELECT);
	 tran.open("fDetail", "fDetail", "/common.do"); 
}

/**
 * 고객상담팝업
 */
 var winReg;
function conslpop(type)
{
	winReg = openPopup("/jsp/system/sysScheduleBusiP.jsp", "pop_type="+type+"&cen_sch_id="+cen_sch_id, "SchedualBusiPop", "", "", "750", "350", "scrollbars=no");
}

/**
 * 저장버튼 클릭시
 */
function saves()
{
	 if (MessageBox("SavConfirm", "C", "") == false) return;
	 if (getValidation(fDetail, true) == false) return;
	 
	 var tran = new Trans();
	 
	 if (gsXaFlag == "A")
	 {
	  	tran.setSvc(INSERT_ID);
		tran.open("fDetail", "fDetail", "/common.do"); 
	 }
	 else if (gsXaFlag == "U" )
	 {
	  	tran.setSvc(UPDATE_ID);
		tran.open("fDetail", "fDetail", "/common.do"); 
	 }
}

 /**
 * 상담이력 삭제버튼 클릭시
 */
function remove()
{
	var GridObj  = document.getElementById(BUSI_SELECT);
	var rowCount = GridObj.GetRowCount();
	var chk = 0;
	var chkpoint = 0;
	var addchk = new Array();
	var params = "";
	
	if(rowCount > 0)
	{	
		for(var i=0; i<rowCount; i++)
		{
			if(GridObj.GetCellValue("chk1",i) == "1")
			{
				 addchk[chkpoint]= GridObj.GetCellValue("cen_sch_id",i);
				 chk += chk + 1;
				 chkpoint++;
			}
		}
		if(chk < 1) 
		{
			MessageBox("NotChecked", "I", "")
			return;
		}
	}
	
	 if (MessageBox("DelConfirm", "C", "") == false) return;
	 
	 var tran = new Trans(); 
	 tran.setSvc(DELETE_ID);
	 tran.setUserParams(params);
	 tran.open("fs", "fs", "/common.do");
}

/*
  기능 : 상담유형 대,중,소 선택시 변화
*/   
var code_name;
function setConslCd(name, obj, brcode)
{
	 code_name = name;
	 var sUserParams = "lcd=" +brcode +"&etc_1="+obj;
	
	 var tran = new Trans();    
	 tran.setSvc(sServiceID);
	 tran.setUserParams(sUserParams); 
	 tran.open("", "", "/common.do"); 
}

/*
  기능 : check 글자를 입력했을때
*/ 
 function f_key(tar)
 {
 	if("1" == tar)
 	{
 		var sLen = checkBytes(fDetail.req_consl_desc.value);
	  	fDetail.inbyte_1.value = sLen;
 	}
 	else
 	{
 		var sLen = checkBytes(fDetail.answ_consl_desc.value);
	  	fDetail.inbyte_2.value = sLen;
 	}
 }

 /*
  기능 :  한글(2Byte), 영문,숫자(1Byte)로 계산된 문자열의
      실제 바이트수를 리턴하는 함수
*/
 function checkBytes(expression)
 {
  var VLength=0;
  var temp = expression;
  var EscTemp;
  if(temp!="" & temp !=null)
  {
  	for(var i=0;i<temp.length;i++) 
  	{
    	if (temp.charAt(i)!=escape(temp.charAt(i)))  
    	{
     		EscTemp=escape(temp.charAt(i));
     		if (EscTemp.length>=6)
      		VLength+=2;
     		else
      		VLength+=1;
    	}
    	else
     	VLength+=1;
   	}
  }
  return VLength;
 }

/**
 *	탭 이동
 **/
function Tab_onclick(index)
{
	for( var i = 0; i < divTab.length; i++ )
	{
		divTab[i].style.display = "none";
	}
	divTab[index].style.display = "";
	
	if(index == 1)
	{
		mode = "1";
		fs.btnSave.disabled = true;
	}
	else if(index == 0)
	{
		mode = "0";
		getMonth('');
		top.ifmSubMain.callNote();
	}
}

/********************
* 콜백
********************/
function callback(sServiceID)
{
	//alert(sServiceID + "==="+ mode + "==="+ sServiceIDs);
	switch (sServiceID)
	{
		case BUSI_SELECT:
			//alert("조회하였습니다.");
		break;
		
		case SELECT_ID:
			gsXaFlag = "I";
			setMode("gsXaFlag");
		break;
		
		case INSERT_ID:
			if("1" == mode)
			{
				if (DataSet.getParam(INSERT_ID, 1, 0, "SUCCESS_COUNT") > 0)
				{
					opener.queryList();
					self.close();
				}
			}else if("0" == mode)
			{
				if (DataSet.getParam(sServiceIDs, 1, 0, "SUCCESS_COUNT") > 0)
				{
					divPlan.style.display="none";
					getMonth('');
					top.ifmSubMain.callNote();
				}
			}
		break;
		
		case UPDATE_ID:
			if("1" == mode)
			{
				if (DataSet.getParam(UPDATE_ID, 1, 0, "SUCCESS_COUNT") > 0)
				{
					opener.queryList();
					self.close();
				}
			}else if("0" == mode)
			{
				if (DataSet.getParam(sServiceIDs, 1, 0, "SUCCESS_COUNT") > 0)
				{
					divPlan.style.display="none";
					getMonth('');
					top.ifmSubMain.callNote();
				}
			}
		break;
		
		case DELETE_ID:
			if("1" == mode)
			{
				if (DataSet.getParam(DELETE_ID, 1, 0, "SUCCESS_COUNT") > 0)
				{
					queryList();
				}
			}else if("0" == mode)
			{
				if (DataSet.getParam(sServiceIDs, 1, 0, "SUCCESS_COUNT") > 0)
				{
					divPlan.style.display="none";
					getMonth('');
					top.ifmSubMain.callNote();
				}
			}
		break;
		
		default:		
		break;
	}
}