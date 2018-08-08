/**
 * PROJ : Nexfron Intranet
 * NAME : common.js
 * DESC : 메인공통 자바스크립트
 * Author : 김은수 과장
 * VER  : 1.0
 * Copyright 2009 Nexfron All rights reserved
 * ============================================================================================
 * 								변		경		사		항
 * ============================================================================================
 * VERSION		DATE		AUTHOR		DESCRIPTION
 * ============================================================================================
 * 1.0		2009.08.13		김은수		주석추가
 */

var gMenu = Array();
var gMenuId;
var gMenuSubId;
var index=0;
var gUserId = "nexfron1";
var gTid;
var loginYN = "N";

if(typeof scriptPath == "undefined")
{
	var scriptPath = "";
}

/** 로고 클릭시 home으로 분기
 */
function goHome()
{
	for(var i=0; i<menu.length-1; i++)
	{
		menu[i].className = "topmenu";

		if(i == 0) lmenu.innerHTML = "<img src='" +scriptPath+ "/html/images/menu/tab_left_off.gif' >";
		if(i == (menu.length-2)) rmenu[i].innerHTML = "<img src='" +scriptPath+ "/html/images/menu/tab_right_off.gif' >";
		else	rmenu[i].innerHTML = "<img src='" +scriptPath+ "/html/images/menu/tab_link_off.gif' >";

	}

	menu_click("000000", "home.jsp", "", "Home");

}

/** 로그아웃 버튼 클릭시 창 닫기
 */
function logout()
{
	if(MessageBox("Logout", "C"))
	{
		msgLogout();
		window.location.replace("login.jsp");
		//window.close();
	}
}

/**
  * 익스프로어가 닫히기 전에 쪽지창을 초기화 함.
  */
function explorerEnd()
{
	for (var i=0; i < 6 ; i++ )
	{
		initMsg(i);
	}
	if (getMsgLoginYN() == "Y") iframeMsg.mserverlogout();
}

// function subMenu()
// {
// }

// 소메뉴 마우스 in
function lmmenu_over(obj)
{
	if (obj.className != "topmenu_2dep_select")  obj.className="topmenu_2dep_select";
	//obj.style.textDecoration = "underline";
}

//소메뉴 마우스 out
function lmmenu_out(obj)
{
	if (obj.className != "topmenu_2dep")  obj.className="topmenu_2dep";
	//obj.style.textDecoration = "";
}

// submenu create
var CalDiv = window.createPopup();
CalDiv.document.createStyleSheet(scriptPath+"/style/common.css");
var CalDivBody = CalDiv.document.body;
function CalDivShow(index){
	CalDivBody.innerHTML = left_menu[index].innerHTML;
	CalDivBody.onunload = submenu_onUnload;
	var left = 0;
	var height = 20;

	//left = 240 + (75 * index);
	left = 180 + (75 * index);	//20100908 pjk

	var menucnt = 0;
	if(!sMenuCnt.length) menecnt = sMenuCnt.innerText;
	else menecnt = sMenuCnt[index].innerText;

	height = parseInt(menecnt) * 21 + 32;

	// show( left, top, width, height, 좌표의 기준이 되는 Object )
	CalDiv.show(left, 60, 145, height, document.body);
}

function submenu_onUnload()
{
	if(!bMenuClick && currIndex > 0)  topmenu_click(currIndex, "", "", "1");
}

/** 톱메뉴 클릭
	index : 톱메뉴 Index
	menuId : 메뉴 ID - 사용안함
	menuSrc :메뉴 URL - 사용안함
	flag : 서브메뉴 표시여부
 */
function topmenu_click(index, menuId, menuSrc, flag)
{
	for(var i=0; i <menu.length-1; i++)
	{
		menu[i].className="tmmenu";
	}

 	menu[index].className="tmclick";

	if(index == "0"){

		//divMain[0].style.display = "none";
		//divMain[1].style.display = "";
		if(!flag) flag = "2";

		//
		bMenuClick = false;

		index = index-1;

		if(flag == "2") CalDivShow(index+1); //메뉴추가
	}else{

		if(!flag) flag = "2";

		//
		bMenuClick = false;

		index = index-1;

		if(flag == "2") CalDivShow(index+1); //메뉴추가
	}
}

var currIndex = -1;
var bMenuClick = false;
/** 서브메뉴 클릭시 해당 url로 분기 및 메뉴 map(오른쪽 업무영역 상단에 위치)을 표시한다.
	menuId : menu ID
	menuSrc : 메뉴 URL
	submenuNm : 메뉴 map 표시를 위한 서브메뉴 명
	mainmenuNm : 메뉴 map표시를 위한 메인메뉴 명
 */
function menu_click(menuId, menuSrc, submenuNm, mainmenuNm, target, parentIndex)
{
	bMenuClick = true;
	currIndex = parentIndex;
	//top.tdStatus.innerHTML = ""; //status의 메시지 삭제
	gMenuId = menuId;

	if(menuSrc == "" || menuSrc == "#") return;

	if(divMain[0].style.display == "none"){
		divMain[0].style.display = "";
		divMain[1].style.display = "none";
	}

	ifmWorkMain.location.href = menuSrc;

	parent.CalDiv.hide();

	//mainmenunm.innerHTML = mainmenuNm + (submenuNm==""?"":" &gt ");
	//submenunm.innerHTML = submenuNm;

	/*
	if( mainmenuNm =="Home")
	{
		spnTitle.className = "";
		spnTitle.innerText = "";
	}
	else
	{
		spnTitle.className = "title";
		spnTitle.innerText = submenuNm;
	}
	*/
	return;

	if (!document.all[menuId]) return;
}

// layout 보여주기 (MyMenu)
function openLayer(id)
{
	//document.all[id].style.display = "";
}

// layout 숨기기 (MyMenu)
function closeLayer(id)
{
	//document.all[id].style.display = "none";
}

// mymenu move control
var isNav_mylinker,isIE_mylinker;
var X_layer_mylinker 				= -1;
var Y_layer_mylinker 				= -1;
var oldX_mouse_mylinker 			= -1;
var oldY_mouse_mylinker 			= -1;
var oldScrollX_IE_mylinker			= 0;
var oldScrollY_IE_mylinker			= 0;
var width_layer_mylinker			= 150;
var height_layer_mylinker			= 200;
var bSelected_layer_mylinker		= false;
var bFirstStartDrag_layer_mylinker	= true;
var bOnlyDownload_mylinker			= false;
var bPositionFix_mylinker			= false;
var bPopupWindow_mylinker			= true;
var uncertiUrl_mylinker				=  "http://dizzo.delivery.mylinker.co.kr/servlet/shotech.mylinker.deliver.Deliver?msg=%e1%f4%3e%c0%20S0%e1%ab%a9%b9%d3%d1%a8%d3%a8%ab";
var uncertiUrl2_mylinker 			= "http://dizzo.delivery.mylinker.co.kr/servlet/shotech.mylinker.deliver.Deliver?msg=%e1%f8%3e%c0%20S0%e1%ab%a9%b9%d3%d1%a8%d3%a8%ab";

if (parseInt(navigator.appVersion)>= 4)
{
	if (navigator.appName == "Netscape")
	{
		isNav_mylinker = true;
	}
	else
	{
		isIE_mylinker = true;
	}
}

// mymenu zindex설정
function setZIndex_mylinker(obj,zOrder)
{
  obj.zIndex = zOrder;
}

// mymenu 이미지 옮기기
function moveTo_mylinker(obj,x,y)
{
  obj.style.pixelLeft	= x;
  obj.style.pixelTop	= y;
}

// drag하여 mymenu 위치 옮기기
function onmousedrag_mylinker(evt)
{
	if (bSelected_layer_mylinker == true)
	{
		if (event != null)
		{
			if (bFirstStartDrag_layer_mylinker == true)
			{
				bFirstStartDrag_layer_mylinker = false;
				oldX_mouse_mylinker = event.clientX;
				oldY_mouse_mylinker = event.clientY;
			}

			var availableX = eval(document.body.clientWidth);
			var availableY = eval(document.body.clientHeight);
			var scrollX_mylinker = eval(document.body.scrollLeft);
			var scrollY_mylinker = eval(document.body.scrollTop);
			var tempX = divMenu.style.posLeft+event.clientX
					  - oldX_mouse_mylinker+scrollX_mylinker
					  - oldScrollX_IE_mylinker;
			var tempY = divMenu.style.posTop+event.clientY
					  - oldY_mouse_mylinker+scrollY_mylinker
					  - oldScrollY_IE_mylinker;

			if (width_layer_mylinker >= availableX)
			{
				X_layer_mylinker=0;
			}
			else if (height_layer_mylinker >= availableY)
			{
				Y_layer_mylinker=0;
			}
			else
			{
				divMenu.style.display = "";
				if (tempX<scrollX_mylinker)
				{
					X_layer_mylinker=scrollX_mylinker;
				}
				else if (tempX + width_layer_mylinker < availableX + scrollX_mylinker)
				{
					X_layer_mylinker = tempX;
				}
				else
				{
					X_layer_mylinker = availableX + scrollX_mylinker - width_layer_mylinker;
				}

				if (tempY < scrollY_mylinker)
				{
					Y_layer_mylinker = scrollY_mylinker;
				}
				else if (tempY + height_layer_mylinker < availableY + scrollY_mylinker)
				{
					Y_layer_mylinker = tempY;
				}
				else
				{
					Y_layer_mylinker = availableY + scrollY_mylinker-height_layer_mylinker;
				}
			}

			moveTo_mylinker(divMenu, X_layer_mylinker, Y_layer_mylinker);

			oldX_mouse_mylinker 	= event.clientX;
			oldScrollX_IE_mylinker 	= scrollX_mylinker;
			oldY_mouse_mylinker 	= event.clientY;
			oldScrollY_IE_mylinker 	= scrollY_mylinker;
		}
		else
		{
		}
	}
	return false;
}

// mymenu 이벤트 설정(mousemove)
function fireEvent_mylinker()
{
	document.imgMenu.fireEvent("onmousemove");
}

// mymenu 이벤트 설정(mousedown)
function onmousedown_mylinker()
{
	bSelected_layer_mylinker 		= true;
	bFirstStartDrag_layer_mylinker	= true;
	fireEvent_mylinker();
	return false;
}

// mymenu 이벤트 클리어
function onmouseup_mylinker()
{
  bSelected_layer_mylinker		 = false;
  bFirstStartDrag_layer_mylinker = false;
  return false;
}

// mymenu 이벤트 설정
var bonscroll_start_mylinker = false;
function onresize_mylinker()
{
	onmousedown_mylinker();
	onmousedrag_mylinker();
	onmouseup_mylinker();
	bonscroll_start_mylinker = false;
}

// 화면 스크롤시 mymenu위치 조절
function onscroll_mylinker()
{
	if (bonscroll_start_mylinker == false)
	{
		bonscroll_start_mylinker = true;
		setTimeout("onresize_mylinker()",500);
	}
}
/*
// mymenu  이벤트 제거
function uncerti_mylinker()
{
	divMenu.onmousemove = null;
	divMenu.onmouseup = null;
	window.onresize = null;
	window.onscroll = null;
	divMenu.style.display = "none";
	if (check_expire_mylinker.checked == true)
	{
		checkedExpireDay_mylinker();
	}
	document.all.noauthimg.src = uncertiUrl2_mylinker;
}
  */
// divMenu 제거
// function close_divMenu()
// {
  // divMenu.onmousemove = null;
  // divMenu.onmouseup = null;
  // window.onresize = null;
  // window.onscroll = null;
  // divMenu.style.display = "none";
// }

// mymenu 초기설정 및 기본정보 조회 (현재시간, 로그인시간, 쪽지)
function init_layer_mylinker()
{
//alert(1);
	if (bPositionFix_mylinker == false)
	{
	  var availableX = document.body.clientWidth;
	  var scrollX_mylinker = document.body.scrollLeft;
	  X_layer_mylinker = (availableX - width_layer_mylinker) / 2 + scrollX_mylinker;
	  oldScrollX_IE_mylinker = scrollX_mylinker;
//	  setZIndex_mylinker(divMenu,10000);
//	  document.imgMenu.onmousedown = onmousedown_mylinker;
//	  document.imgMenu.onmousemove = onmousedrag_mylinker;
//	  document.imgMenu.onmouseup = onmouseup_mylinker;
//	  document.imgMenu.style.cursor = "hand";
	  window.onresize = onscroll_mylinker;
	  window.onscroll = onscroll_mylinker;
	}

	setDate();
	setLoginTime();
	//confirmMsg();

	// 1분마다 현재시간 세팅
	gTid = setInterval(setDate, 60000);

//	divMenu.style.display = "";
}

// 현재시간 세팅
function setDate()
{
	var date = new Date() ;
/*	tdCurrent.innerText = (date.getYear()
						+ "/" + paddingStr(date.getMonth(), "L", "0", 2)
						+ "/" + paddingStr(date.getUTCDate(), "L", "0", 2)
						+ " " + paddingStr(date.getHours(), "L", "0", 2)
						+ ":" + paddingStr(date.getMinutes(), "L", "0", 2));
*/
}

// 사용자 로그인 시간 세팅
function setLoginTime()
{
	var date = new Date() ;
	fLoginTime.innerText = paddingStr(date.getHours(),"L","0",2)+":"+paddingStr(date.getMinutes(),"L","0",2);
}

/**
  * 메시지 팝업시 로그인 체크용 플래그
  */
var MSGLOGINCHK = "F";

/**
  * 쪽지() text 클릭시
  */
function showMsg(index, menu, page, seq)
{
	if( menu == "system" );
	else if ( menu == "KMS" ) openPopup("/jsp/knowledge/kmsSearchDetailP.jsp", "sid=" + page + "&skey=" + seq + "&userid=" + getUserID(), "SearchDetailP", "", "", "970", "564", "scrollbars=no");
	else openPopup("/jsp/common/comMsgMng.jsp", "index=" + index, "쪽지관리", "", "", "730", "530", "");
}

/////////////////////////////////////메시지박스 변수값 객체/////////////////////////////////
/**
 * 그리드 리스트
 * 현재 생성된 그리드들을 리스트로 관리한다.
 */
var msgValList = new Array();
var msgValue = new Array();		//메시지 박스 변수값 배열

/**
 * 메시지 박스 변수값 생성자
 * divMsgId      : 메시지박스 ID
 * intervalobj   : 메시지박스 Timer
 * iVal          : 레이아웃 값
 * count         : 메시지박스 번호
 */
function msgVal()
{
	this.divMsgId;
	this.intervalobj;
	this.iVal;
	this.count;

	msgValList.push(this);
}

/**
 * 메시지박스 ID값 리턴
 * divMsgId      : 메시지박스 ID
 */
msgVal.prototype.getDivMsgIdj = function()
{
	return this.divMsgId;
}

/**
 * 메시지박스 Timer 리턴
 * intervalobj      : 메시지박스 Timer
 */
msgVal.prototype.getIntervalobj = function()
{
	return this.intervalobj;
}

/**
 * 레이아웃 값 리턴
 * iVal      : 레이아웃 값
 */
msgVal.prototype.getIVal = function()
{
	return this.iVal;
}

/**
 * 메시지박스 번호 리턴
 * getCount      : 메시지박스 번호
 */
msgVal.prototype.getCount = function()
{
	return this.count;
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
  * 내용을 뿌려줄 메시지 박스 선택
  */
function makeMsgBox(msg, menu, page, seq)
{
	var cnt;
	//아무것도 정의되지 않았을 경우
	if(typeof document.all.trMsg_0 == "undefined")
	{
		cnt = 0;
	}
	else if (typeof document.all.trMsg_1 == "undefined")
	{
		cnt = 1;
	}
	else if (typeof document.all.trMsg_2 == "undefined")
	{
		cnt = 2;
	}
	else if (typeof document.all.trMsg_3 == "undefined")
	{
		cnt = 3;
	}
	else if (typeof document.all.trMsg_4 == "undefined")
	{
		cnt = 4;
	}
	else if (typeof document.all.trMsg_5 == "undefined")
	{
		cnt = 5;
	}
	else
	{
		cnt = 0;
		clearInterval(msgValue[cnt].getIntervalobj());
		initMsg(cnt);

	}

	var sb = new StringBuffer();
	sb.append("<table border='0' cellpadding=0 cellspacing=1 class='table_line' width='200' style='position:absolute;z-index:10000'>");
	sb.append("	<tr id=trMsg_"+cnt+">");
	sb.append("		<td class=table_header width=198 align='center'>쪽지알림</td>");
	sb.append("	</tr>");
	sb.append("	<tr>");
	sb.append("		<td class=MANTDM width=198>");
	sb.append("			<textarea class=input_transparent name='tdmsg' readOnly='true' value='' style='width:191;height:119;overflow-x:hidden;overflow-y:hidden;cursor:hand' onclick=\"showMsg('0' ,'"+menu+"', '"+page+"', '"+seq +"')\" ></textarea>");
	sb.append("		</td>");
	sb.append("	</tr>");
	sb.append("</table>");
	sb.append("<div style='width:200;height:145;z-index:0; position:relative; left:0px; top:-0; background-color:#FFFFFF;'>");
	sb.append("	<iframe id='lineFrame' width='200' height='145' frameborder='0' marginheight='0' marginwidth='0' topmargin='0' leftmargin='0' scrolling='no'></iframe>");
	sb.append("</div>");

	divMsgBox[cnt].innerHTML = sb.toString();

	msgValSet("divMsgBox["+cnt+"]", "", 0, cnt);
	return cnt;
}

/**
  * 변수값 설정
  */
function msgValSet(msgId,interval,iVal,cnt)
{
	msgValue[cnt] = new msgVal();

	msgValue[cnt].divMsgIdj		= msgId;
	msgValue[cnt].intervalobj	= interval;
	msgValue[cnt].iVal			= iVal;
	msgValue[cnt].count			= cnt;
}

/**
  * divMsgBox[cnt]의 변수값 및 태그 초기화
  */
function initMsg(cnt)
{
	divMsgBox[cnt].innerHTML= "";
	if(typeof msgValue[cnt] != "undefined")	clearInterval(msgValue[cnt].getIntervalobj());
	msgValue[cnt] = new msgVal();
}

/**
  * 받은 쪽지
  */
function receiveReturnMessage(errorcd,msg){

	var cnt = ""
	var msgArr = msg.split("_");
	var msgtxt = "";
	var menu;
	var page;
	var seq;

	if ( errorcd != "L" && errorcd != "E" )
	{
		cnt = makeMsgBox(msg, menu, page, seq);
	}
	else return;

	if( 3 < msgArr.length)
	{
		msgtxt = "";
		menu = msgArr[0];
		page = msgArr[1];
		seq = msgArr[2];
		for ( var i = 3; i < msgArr.length ; i++ )
		{
			if (i == 3) msg = msgArr[i];
			else msg += "_" + msgArr[i];
		}
	}

	if(!menu) menu = "system";
	if(!page) page = "system";
	if(!seq)  seq  = "system";

	clearInterval(msgValue[cnt].getIntervalobj());
	divMsgBox[cnt].style.filter = "Alpha(opacity=" + msgValue[cnt].getIVal() +")";

	//도착한 메시지 알림창에 설정
	if(errorcd=="S"){
		if(typeof document.all.tdmsg.length == "undefined") tdmsg.value=msg;
		else tdmsg[cnt].innerText=msg;

		memocnt.innerText = parseInt(memocnt.innerText) + 1;

	}
	else if(errorcd=="O"){
		if(typeof document.all.tdmsg.length == "undefined") tdmsg.value=msg;
		else tdmsg[cnt].innerText=msg;

		if( msg == "메세지 서버에 연결되었습니다." ) loginYN = "Y";
		//return;
	}
	else if(errorcd=="E"){
		//mserverlogin();
		initMsg(cnt);
		return;
	}else if(errorcd=="C"){
		if(typeof document.all.tdmsg.length == "undefined") tdmsg.value=msg;
		else tdmsg[cnt].innerText=msg;

		if(msg == "서버로 부터 접속이 끊어 졌습니다." || msg == "정상 로그아웃 되었습니다.") loginYN = "N";
		//return;
	}else if(errorcd=="L"){
		if(msg == "Y")loginYN = "Y";
		else if(msg == "N")loginYN = "N";

		initMsg(cnt);
		return;
	}

	msgwin(cnt);
}

/**
  * 보낸 쪽지
  */
function sendFixedMsg(user,content)
{
	iframeMsg.EchoApplet.sendFixedMsg(user,content);
}

/**
  * 쪽지 서버 수동 로그인
  */
function mserverlogin(){
	 iframeMsg.EchoApplet.messageStart();
}

/**
  * 쪽지 서버에서 로그아웃한다.
  */
function msgLogout()
{
	for (var i=0; i < 6 ; i++ )
	{
		initMsg(i);
	}

	if (getMsgLoginYN() == "Y") iframeMsg.mserverlogout();
}

/**
  * 알림창 나타내기 timer 시작
  */
function msgwin(cnt){
	divMsgBox[cnt].style.display="";
	msgValue[cnt].intervalobj = setInterval("winstart("+cnt+")",100);
}

/**
  * 알림창 나타내기 및 대기
  */
function winstart(cnt){
	divMsgBox[cnt].style.filter = "Alpha(opacity=" + msgValue[cnt].getIVal() +")";
	if( msgValue[cnt].getIVal() == 100 )
	{
		clearInterval(msgValue[cnt].getIntervalobj());
		msgValue[cnt].intervalobj=setInterval("waitwin("+cnt+")",2000);
	}
	else msgValue[cnt].iVal = msgValue[cnt].getIVal() + 10;
}

/**
  * 알림창 사라지기 timer 시작
  */
function waitwin(cnt){
	clearInterval(msgValue[cnt].getIntervalobj());
	msgValue[cnt].intervalobj = setInterval("winend("+cnt+")",100);
}

/**
  * 알림창 사라지기 및 초기화
  */
function winend(cnt){
	divMsgBox[cnt].style.filter = "Alpha(opacity=" + msgValue[cnt].getIVal() +")";
	if( msgValue[cnt].getIVal() == 0 )
	{

		clearInterval(msgValue[cnt].getIntervalobj());
		initMsg(cnt);
	}
	else msgValue[cnt].iVal = msgValue[cnt].getIVal() - 10;
}

/**
  * 로그인 여부값 리턴
  */
function getMsgLoginYN()
{
	return loginYN;
}
//톱메뉴 마우스over
function topmenu_over(index)
{
/*	for(var i=0; i <submenu.length; i++)
	{
	  submenu[i].style.display = 'none';
	  if (i!=gMenuId) menu[i].className="tmmenu";
	}
*/
	if (menu[index].className != "tmclick") 	menu[index].className="tmover";
	//menu[index].className="tmover";
//	submenu[index].style.display = '';
}
//톱메뉴 마우스 out
function topmenu_out(index)
{
/*	for(var i=0; i <submenu.length; i++)
	{
	  submenu[i].style.display = 'none';
	  if (i!=gMenuId) menu[i].className="tmmenu";
	}*/
	if (menu[index].className != "tmclick") 	menu[index].className="tmmenu";
//	submenu[index].style.display = '';
//	alert(menu[index].className);
//	menu[index].className="tmclick";
//	if (menu[index].className == "tmclick") 	menu[index].className="tmon";
//	submenu[index].style.display = 'none';

}

//게시판 팝업 열기
function menu_board_click(boardid, boardnm)
{
	window.open("/jsp/system/sysBoardList.jsp?board_id="+boardid+"&board_nm="+boardnm, boardid, "toolbar=no,scrollbars=no,top=0,left=100,width=1010,height=700")
}

function showHome()
{
	clearMenu();
	menu_click("0000", "home.jsp", "Home", "Home");
}


//###################################
// WISEGRID 초기화
// DataSet도 함께
//###################################
function wisegridClear(queryID)
{
	document.all(queryID).RemoveAllData();
	InitUcareData.removeDataSet(queryID);
}