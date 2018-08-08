/**
 * PROJ : Nexfron Intranet
 * NAME : main.js
 * DESC : 메인 자바스크립트
 * Author : 정희인 대리
 * VER  : 1.0
 * Copyright 2009 Nexfron All rights reserved
 * ============================================================================================
 * 								변		경		사		항
 * ============================================================================================
 * VERSION		DATE		AUTHOR		DESCRIPTION
 * ============================================================================================
 * 1.0		2009.08.13		김은수		주석추가
 * 1.1		2009.08.20		김은수		쪽지 관련 로직 추가
 */

var gMenu = Array();
var gMenuId;
var gMenuSubId;
var index=0;
var demoyn = "N";
var g_custInfoHash = new Hashtable();		//고객정보

var g_thisFrame = null;		//Opener용 자신 프래임 객체
var g_thisForm = null;		//Opener용 자신 폼 객체

var g_ctiloginyn = "N";
var g_tabindex;		// main에서 tab 클릭시의 index를 담아둔다.
var g_inout = 1;		// inbound, outbound 구분(default : 1) - outbound
var g_worktype = "N";

//###################################
// ONLOAD
//###################################
function setInit()
{
	//setMsgCnt();
}

//###################################
// ONLOAD
//###################################
function init()
{
	goHome();
}

/** 로고 클릭시 home으로 분기
 */
function goHome()
{
	for(var i=0; i<menu.length-1; i++)
	{
		menu[i].className = "tmmenu";

		//if(i == 0) lmenu.innerHTML = "<img src='" +scriptPath+ "/images/menu/tab_left_off.gif' >";
		//if(i == (menu.length-2)) rmenu[i].innerHTML = "<img src='" +scriptPath+ "/images/menu/tab_right_off.gif' >";
		//else	rmenu[i].innerHTML = "<img src='" +scriptPath+ "/images/menu/tab_link_off.gif' >";

	}

	menu_click("000000", "home.jsp", "Home", "Home");
	//menu_click("030700", "knowledge/kmsMain.jsp", "지식검색", "나의지식",  "null", 1);
}

/**
 * 화면에서 객체의 Top 좌표를 구한다.
 * obj : 객체
 */
function getObjTop(obj)
{
	if(obj.offsetParent == document.body)
	{
		return obj.offsetTop;
	}
	else
	{
		return obj.offsetTop + getObjTop(obj.offsetParent);
	}
}

/**
 * 화면에서 객체의 Left 좌표를 구한다.
 * obj : 객체
 */
function getObjLeft(obj)
{
	if(obj.offsetParent == document.body)
	{
		return obj.offsetLeft;
	}
	else
	{
		return obj.offsetLeft + getObjLeft(obj.offsetParent);
	}
}

/*******************  MDI관련 START ***********************************/

var g_mdiCnt = 8; //mdi유형으로 보여줄 화면 갯수
var arrMdiInfo = new Array();

for(var i=0; i < g_mdiCnt; i++)
{
	arrMdiInfo[i] = new Array();
	arrMdiInfo[i][0] = i; //iframe index
	arrMdiInfo[i][1] = ""; //url
	arrMdiInfo[i][2] = -1; // menutab index
	arrMdiInfo[i][3] = -1; // parentMenu index
}

var oldTabNo = 0;

/**
 * 상담메인 탭 클릭시 - 상담메인은 다른 탭메뉴들과 다르게 단독 탭으로 구성되어있다.
 * @return
 */
function crsScreenMenu_onClick()
{
	for(var i=0; i<mscreen.length-1; i++)
	{
		tblscreen[i].className = "screentab";
		mscreen[i].className = "screentab_bg";
		lscreen[i].className = "screentab_left";
		rscreen[i].className = "screentab_right";
	}

	if(tdCrsScreen.innerHTML == "")
	{
		var strMenu = "<table id=tblCrsScreen class='screentab_select' onclick='crsScreenMenu_onClick()' ondblclick='crsScreenMenu_onDblClick()'>";
		strMenu += "<tr>";
		strMenu += "	<td id=lCrsScreen class='screentab_select_left' style='width:5px'></td>";
		strMenu += "	<td id=mCrsScreen class='screentab_select_bg' style='width:120px'>상담메인</td>";
		//strMenu += "	<td id=rCrsScreen class='screentab_select_right' style='width:5px'></td>";
		strMenu += "	<td id=rCrsScreen class='screentab_select_right' style='width:10px;padding:0 3 0 0'><img src='" + scriptPath + "/images/menu/type_2/screen_close.gif' onClick='closeCrsTab()' style='cursor:hand'></td>";

		strMenu += "</tr>";
		strMenu += "</table>";

		tdCrsScreen.innerHTML = strMenu;

	}
	else
	{
		tblCrsScreen.className = "screentab_select";
		mCrsScreen.className = "screentab_select_bg";
		lCrsScreen.className = "screentab_select_left";
		rCrsScreen.className = "screentab_select_right";
	}

	//topmenu_click(0, "", "");
	changSelMenu(index);
//	divMain[0].style.display = "none";
//	divMain[1].style.display = "";
}

/**
 * 상담메인 더블 클릭시 - refresh
 * @return
 */
function crsScreenMenu_onDblClick()
{
	ifmMain.location.href = "/jsp/customer/crsMain.jsp";
}
/**
 * 상담메인 닫기버튼 클릭시 - 탭 닫음.
 * @return
 */
function closeCrsTab()
{
	var bCloseMenu = false;
	for (var i=0; i<arrMdiInfo.length; i++)
	{
		if (arrMdiInfo[i][1] != "")
		{
			bCloseMenu = true;
			break;
		}
	}

	if (bCloseMenu == false)
	{
		MessageBox("INFCloseScreen", "I", "");
		return;
	}

	tdCrsScreen.innerHTML = "";
	divMain[0].style.display = "";
	divMain[1].style.display = "none";

	findLastTab();
}

/**
 * 메뉴탭 클릭시
 * @param index
 * @return
 */
function screenMenu_onClick(index)
{
	//상담메인 disable
	if(tdCrsScreen.innerHTML != "")
	{
		tblCrsScreen.className = "screentab";
		mCrsScreen.className = "screentab_bg";
		lCrsScreen.className = "screentab_left";
		rCrsScreen.className = "screentab_right";
	}

	for(var i=0; i<mscreen.length-1; i++)
	{
		tblscreen[i].className = "screentab";
		mscreen[i].className = "screentab_bg";
		lscreen[i].className = "screentab_left";
		rscreen[i].className = "screentab_right";
	}

	tblscreen[index].className = "screentab_select";
	mscreen[index].className = "screentab_select_bg";
 	lscreen[index].className = "screentab_select_left";
	rscreen[index].className = "screentab_select_right";
}

/**
 * 메뉴탭 클릭시
 * @param index
 * @param parentMenuIndex : 주메뉴 index
 * @return
 */
function screenTab_onClick(index, parentMenuIndex)
{
//	divMain[0].style.display = "";
//	divMain[1].style.display = "none";

	if(parentMenuIndex > 0 && parentMenuIndex) topmenu_click(parentMenuIndex, "", "", "1");
//	else clearMenu();

//	topmenu_click(parentMenuIndex, "", "", "1");

	if(oldTabNo != -1)	document.all("divMain" + oldTabNo).style.display = "none";
	document.all("divMain" + index).style.display = "";

	oldTabNo = index;

	// 2011.2.10 home 메뉴 클릭시만 새로고침 SKYU
	if(document.all("ifmWorkMain" + (index)).src == "home.jsp"){
		screenTab_onDblClick(index, parentMenuIndex);
	}

	//screenTab_onDblClick(index, parentMenuIndex)
}

/**
 * 메뉴탭 더블 클릭시 화면 refresh
 * @param index : index
 * @param parentMenuIndex : 주메뉴 index
 * @return
 */
function screenTab_onDblClick(index, parentMenuIndex)
{
	document.all("ifmWorkMain" + (index)).src = arrMdiInfo[index][1];
}

/**
 * 탭의 X버튼 클릭시 화면 닫음.
 * @param index : index
 * @param parentMenuIndex : 주메뉴 index
 * @return
 */
function closeMdiTab(index, parentMenuIndex)
{
	var bCloseMenu = false;
	for (var i=0; i<arrMdiInfo.length; i++)
	{
		if (i != index && arrMdiInfo[i][1] != "")
		{
			bCloseMenu = true;
			break;
		}
	}

	if (bCloseMenu == false && tdCrsScreen.innerHTML == "")
	{
		MessageBox("INFCloseScreen", "I", "");
		return;
	}

	//alert(index);
	document.all("ifmWorkMain" + (index)).src = "#";
	document.all("divMain" + (index)).style.display = "none";

	tdScreen[arrMdiInfo[index][2]].innerHTML = "";
	arrMdiInfo[index][1] = "";
	arrMdiInfo[index][2] = -1;
	arrMdiInfo[index][3] = -1;

	//삭제된 tab화면목록 하나씩 앞으로 밀어서 채우기
	mekeScreenTab(index);

	//상담메인이 선택되어 있는 경우
	/*if(divMain[1].style.display == "")
	{
		topmenu_click(0, "", "");
		return;
	}*/

	findLastTab();
}

/**
 * 상담메인을  제외하고,  마지막 Tab찾기
 */
function findLastTab()
{
	var count = 0;
	var lastIndex = -1;
	for(var i=0; i < tdScreen.length-1; i++)
	{
		//화면띄운 갯수 세기
		if(arrMdiInfo[i][1] != "")
		{
			count++;
		}

		//맨마지막 인덱스 찾기
		if(tdScreen[i].innerHTML != "")
		{
			lastIndex = i;
		}
	}

	if(count == 0)
	{
		oldTabNo = -1;

		//탭 모두 닫히고  상담메인만 오픈되었을때 상담메인 화면 오픈시킨다.
		if(tdCrsScreen.innerHTML != "") crsScreenMenu_onClick();
	}
	else
	{
		for(var i=0; i < arrMdiInfo.length; i++)
		{
			if(arrMdiInfo[i][2] == lastIndex)
			{
				screenTab_onClick(arrMdiInfo[i][0], arrMdiInfo[i][3]);
				screenMenu_onClick(lastIndex);
				break;
			}
		}
	}
}

/**
 * 메뉴 선택시 탭 추가하기
 * @param url : 추가할 url
 * @param screenName : 화면명
 * @param parentMenuIndex : 주메뉴 index
 * @return
 */
function screenTabAdd(url, screenName, parentMenuIndex, param)
{

	for(var i=0; i < arrMdiInfo.length; i++)
	{
		if (trim(arrMdiInfo[i][1]) == trim(url) )
		{
			screenTab_onClick(i, arrMdiInfo[i][3]);
			screenMenu_onClick(arrMdiInfo[i][2]);

			if (param || url == "home.jsp") document.all("ifmWorkMain" + i).src = url+(param?"?"+param:""); //home 화면은 새로고침되도록 변경
			return;
		}

		/*
		//2011.08.02 변수값이 다르면 새로고침
		var tempUrl_1 = trim(arrMdiInfo[i][1]).split("?")[0];
		var tempUrl_2 = trim(url).split("?")[0];

		var tempUrlParam_1 = trim(arrMdiInfo[i][1]).split("&")[0];
		var tempUrlParam_2 = trim(url).split("&")[0];


		if(tempUrl_1 == tempUrl_2 && tempUrl_2 != "/jsp/knowledge/kmsBordMng.jsp")
		{
			screenTab_onClick(i, arrMdiInfo[i][3]);
			screenMenu_onClick(arrMdiInfo[i][2]);
			if (param || url == "home.jsp") document.all("ifmWorkMain" + i).src = url+(param?"?"+param:""); //home 화면은 새로고침되도록 변경

			if (trim(arrMdiInfo[i][1]) != trim(url) )	//2011.08.02 변수값이 다르면 새로고침
			{
				arrMdiInfo[i][1] = url;
				document.all("ifmWorkMain" + i).src = url+(param?"?"+param:"");
			}
			return;
		}

		else if (tempUrl_2 == "/jsp/knowledge/kmsBordMng.jsp")  //kmsBordMng파일은 여러 매뉴로 사용되기 때문에 data_type_cd의 변수값에 따라 구별함
		{
			if(tempUrlParam_1 == tempUrlParam_2 )
			{
				screenTab_onClick(i, arrMdiInfo[i][3]);
				screenMenu_onClick(arrMdiInfo[i][2]);
				arrMdiInfo[i][1] = url;
				document.all("ifmWorkMain" + i).src = url+(param?"?"+param:"");
				return;
			}
		}
		*/
	}

	var bEmptyYN = false;
	var tdmenuIndex = 0;

	for(var i=0; i < tdScreen.length-1; i++)
	{
		if(arrMdiInfo[i][1] == "") //url이  null인지 체크
		{
			bEmptyYN = true;
			var tdmenuIndex = 0;

			for(var j=0; j < tdScreen.length-1; j++)
			{
				if(tdScreen[j].innerHTML == "")
				{
					tdmenuIndex = j;
					break;
				}
			}


			var tabWidth = screenName.length*13;
			if(screenName.length*13 < 120) tabWidth = 120;

			var strMenu = "<table id=tblscreen class='screentab_select' onclick='screenTab_onClick("+(i)+", "+ parentMenuIndex +")' ondblclick='screenTab_onDblClick("+(i)+", "+ parentMenuIndex +")'>";
			strMenu += "<tr>";
			strMenu += "	<td id=lscreen class='screentab_select_left' style='width:5px'></td>";
			strMenu += "	<td id=mscreen class='screentab_select_bg' style='width:"+ tabWidth +"px'>"+screenName+"</td>";
			strMenu += "	<td id=rscreen class='screentab_select_right' style='width:15px;padding:0 3 0 0'><img src='" + scriptPath + "/images/menu/type_2/screen_close.gif' onClick='closeMdiTab("+(i)+", "+ parentMenuIndex +")' style='cursor:hand'></td>";
			strMenu += "</tr>";
			strMenu += "</table>";

			arrMdiInfo[i][1] = url+(param?"?"+param:"");
			arrMdiInfo[i][2] = tdmenuIndex;
			arrMdiInfo[i][3] = parentMenuIndex;

			tdScreen[tdmenuIndex].innerHTML = strMenu;
			screenTab_onClick(i, parentMenuIndex);
			screenMenu_onClick(tdmenuIndex);

			document.all("ifmWorkMain" + i).src = url+(param?"?"+param:"");
			break;
		}
	}

	if(!bEmptyYN)
	{
		if(!MessageBox("INFOpenScreen", "C", "")) return;

		for(var i=0; i < arrMdiInfo.length; i++)
		{
			if(arrMdiInfo[i][2] == 0)
			{
				closeMdiTab(i, arrMdiInfo[i][3]);
				AddScreen(url, screenName, parentMenuIndex, param);
				break;
			}
		}

	}
}

/**
 * 맨처음 인덱스찾아서 다시 오픈. - 코딩하기 싫어서 그냥 copy
 * @param url : 추가할 url
 * @param screenName : 화면명
 * @param parentMenuIndex : 주메뉴 index
 * @return
 */
function AddScreen(url, screenName, parentMenuIndex, param)
{
	for(var i=0; i < arrMdiInfo.length; i++)
	{
		if(arrMdiInfo[i][1] == url)
		{
			screenTab_onClick(i, arrMdiInfo[i][3]);
			screenMenu_onClick(arrMdiInfo[i][2]);
			if (param || url == "home.jsp") document.all("ifmWorkMain" + i).src = url+(param?"?"+param:""); //home 화면은 새로고침되도록 변경
			return;
		}
	}

	var bEmptyYN = false;
	var tdmenuIndex = 0;

	for(var i=0; i < tdScreen.length-1; i++)
	{
		if(arrMdiInfo[i][1] == "") //url이  null인지 체크
		{
			bEmptyYN = true;
			var tdmenuIndex = 0;

			for(var j=0; j < tdScreen.length-1; j++)
			{
				if(tdScreen[j].innerHTML == "")
				{
					tdmenuIndex = j;
					break;
				}
			}


			var tabWidth = screenName.length*13;
			if(screenName.length*13 < 120) tabWidth = 120;

			var strMenu = "<table id=tblscreen class='screentab_select' onclick='screenTab_onClick("+(i)+", "+ parentMenuIndex +")' ondblclick='screenTab_onDblClick("+(i)+", "+ parentMenuIndex +")'>";
			strMenu += "<tr>";
			strMenu += "	<td id=lscreen class='screentab_select_left' style='width:5px'></td>";
			strMenu += "	<td id=mscreen class='screentab_select_bg' style='width:"+ tabWidth +"px'>"+screenName+"</td>";
			strMenu += "	<td id=rscreen class='screentab_select_right' style='width:15px;padding:0 3 0 0'><img src='" + scriptPath + "/images/menu/type_2/screen_close.gif' onClick='closeMdiTab("+(i)+", "+ parentMenuIndex +")' style='cursor:hand'></td>";
			strMenu += "</tr>";
			strMenu += "</table>";

			arrMdiInfo[i][1] = url;
			arrMdiInfo[i][2] = tdmenuIndex;
			arrMdiInfo[i][3] = parentMenuIndex;

			tdScreen[tdmenuIndex].innerHTML = strMenu;
			screenTab_onClick(i, parentMenuIndex);
			screenMenu_onClick(tdmenuIndex);

			document.all("ifmWorkMain" + i).src = url+(param?"?"+param:"");
			break;
		}
	}
}


/**
 * X아이콘 마우스 올라갔을때
 */
function btnX_mouseOver(obj)
{
	obj.src = scriptPath + "/images/popup/btn_delete02.gif";
}

/**
 * X아이콘 마우스 벗어났을때
 */
function btnX_mouseOut(obj)
{
	obj.src = scriptPath + "/images/popup/btn_delete02_d.gif";
}
/**
 * 닫힌 탭을 하나씩 앞으로 밀어 넣는다
 */
function mekeScreenTab(index)
{
	for(var i=0; i < tdScreen.length-2; i++)
	{
		if(tdScreen[i].innerHTML == "")
		{
			tdScreen[i].innerHTML = tdScreen[i+1].innerHTML;
			tdScreen[i+1].innerHTML = "";

			for(var j=0; j<arrMdiInfo.length; j++)
			{
				if((arrMdiInfo[j][2] - 1) == i )
				{
					arrMdiInfo[j][2] = arrMdiInfo[j][2] -1;
					break;
				}
			}
		}
	}
}

/**
 * 활성화된 탭을 제외하고 모두 닫는다.
 */
function closeMdiAllTab()
{
	//oldTabNo

	//index, parentMenuIndex

	for (var i=0; i<arrMdiInfo.length; i++)
	{
		if (i != oldTabNo && arrMdiInfo[i][1] != "")
		{
			document.all("ifmWorkMain" + (i)).src = "#";
			document.all("divMain" + (i)).style.display = "none";

			tdScreen[arrMdiInfo[i][2]].innerHTML = "";
			arrMdiInfo[i][1] = "";
			arrMdiInfo[i][2] = -1;
			arrMdiInfo[i][3] = -1;

			//삭제된 tab화면목록 하나씩 앞으로 밀어서 채우기
			mekeScreenTab(i);
		}
	}
}
/*MDI관련 END */



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
CalDiv.document.createStyleSheet(scriptPath+"/style/ucareStyle.css");
var CalDivBody = CalDiv.document.body;
function CalDivShow(index)
{
	if(left_menu.length > 0)
	{
		CalDivBody.innerHTML = left_menu[index].innerHTML;
		CalDivBody.onunload  = submenu_onUnload;
	}
	else
	{
		CalDivBody.innerHTML = leftmenu.innerHTML;
		CalDivBody.onunload = submenu_onUnload;
	}

	var menuTop = 60 - document.body.scrollTop;
	var left = 0;
	var height = 20;

	//left = 115 + (84 * index);	//10(L)+64(M)+10(R)	-> LEFT정렬, WIDTH64일때
	//left = 650 + (95 * index);	//10(L)+75(M)+10(R)

	var index2 = 1;	//메뉴보수index
	index2 = (menu.length-1) + 1 - parseInt(index);	//메뉴보수index = (총메뉴개수+1) - 메뉴index : 메뉴가항상1개더존재한다.
	left = getObjLeft(menu[index]) - document.body.scrollLeft -35 ; //1210-(106 * index2);	//10(L)+75(M)+10(R)-> RIGHT정렬, WIDTH75일때 : totWidth-(tabWidth*indexNum)



/*
	var menucnt = 0;
	if(!sMenuCnt.length) menecnt = sMenuCnt.innerText;
	else menecnt = sMenuCnt[index-1].innerText;
	height = parseInt(menecnt) * 21 + 32;
*/
	height = (tblMenu[index].rows.length/2) * 26 + 25;

	// show( left, top, width, height, 좌표의 기준이 되는 Object )
	CalDiv.show(left, menuTop, 145, height, document.body);

}

function submenu_onUnload()
{
	if(!bMenuClick && currIndex > 0)  topmenu_click(currIndex, "", "", "1");
}

//톱메뉴 마우스over
function topmenu_over(index)
{

}

//톱메뉴 마우스 out
function topmenu_out(index)
{

}

/** 톱메뉴 클릭
	index : 톱메뉴 Index
	menuId : 메뉴 ID - 사용안함
	menuSrc :메뉴 URL - 사용안함
	flag : 서브메뉴 표시여부
 */
function topmenu_click(index, menuId, menuSrc, flag)
{
	if(!flag) flag = "2";

	//
	bMenuClick = false;


	for(var i=0; i<menu.length; i++)
	{
		menu[i].className = "tmmenu";

		//if(i == 0)               lmenu.innerHTML    = "<img src='" +scriptPath+ "/images/menu/tab_left_off.gif'  >";
		//if(i == (menu.length-2)) rmenu[i].innerHTML = "<img src='" +scriptPath+ "/images/menu/tab_right_off.gif' >";
		//else	                 rmenu[i].innerHTML = "<img src='" +scriptPath+ "/images/menu/tab_link_off.gif'  >";
	}

 	menu[index].className = "tmclick";
 	/*
 	if(index == 0)
 	{
 		lmenu.innerHTML = "<img src='" +scriptPath+ "/images/menu/tab_left_on.gif' >";
 	}
 	else
	{
		lmenu.innerHTML          = "<img src='" +scriptPath+ "/images/menu/tab_left_off.gif' >";
		rmenu[index-1].innerHTML = "<img src='" +scriptPath+ "/images/menu/tab_left_link_on.gif' >";
	}

 	if(index == (menu.length-2)) rmenu[index].innerHTML = "<img src='" +scriptPath+ "/images/menu/tab_right_on.gif' >";
	else rmenu[index].innerHTML = "<img src='" +scriptPath+ "/images/menu/tab_link_on.gif' >";
*/
//	if(index == 0){
//		ifmMain.location.href = menuSrc;
//		return;
//	}

	top.tdStatus.innerHTML = "";

	if(flag == "2") CalDivShow(index); //메뉴추가
}

var currIndex = -1;
var bMenuClick = false;
/** 서브메뉴 클릭시 해당 url로 분기 및 메뉴 map(오른쪽 업무영역 상단에 위치)을 표시한다.
	menuId : menu ID
	menuSrc : 메뉴 URL
	submenuNm : 메뉴 map 표시를 위한 서브메뉴 명
	mainmenuNm : 메뉴 map표시를 위한 메인메뉴 명
 */
function menu_click(menuId, menuSrc, submenuNm, mainmenuNm, target, parentIndex, param)
{
	bMenuClick = true;
	currIndex = parentIndex;
	top.tdStatus.innerHTML = ""; //status의 메시지 삭제
	gMenuId = menuId;
	//auth (등록:조회:수정:삭제:파일:프린트)
	/*
	var crud=g_auth_hs.get(menuId).split(":");
	var sb=new StringBuffer();
	sb.append("createyn=");
	sb.append(crud[0]);
	sb.append("&readyn=");
	sb.append(crud[1]);
	sb.append("&updateyn=");
	sb.append(crud[2]);
	sb.append("&deleteyn=");
	sb.append(crud[3]);
	sb.append("&fileyn=");
	sb.append(crud[4]);
	sb.append("&printyn=");
	sb.append(crud[5]);

	ifmMain.location.href = menuSrc+"?menuid="+menuId+"&"+sb.toString();
	*/
	if(menuSrc == "" || menuSrc == "#") return;
//	ifmMain.location.href = "/jsp/" + menuSrc;

/*	if(divMain[0].style.display == "none"){
		divMain[0].style.display = "";
		divMain[1].style.display = "none";
	}
*/
	screenTabAdd(menuSrc, submenuNm, parentIndex, param);

	parent.CalDiv.hide();

/*	mainmenunm.innerHTML = mainmenuNm + (submenuNm==""?"":" &gt ");
	submenunm.innerHTML = submenuNm;

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


















/**
 * 쪽지보기 아이콘 설정
 */
function setMsgCnt()
{
	var nNewMsg = parseInt(f.newmsgcnt.value, 10);

	if (nNewMsg > 0)
	{
		gotnewmsg.style.display = "";
		nomsg.style.display 	= "none";
	}
	else
	{
		gotnewmsg.style.display = "none";
		nomsg.style.display 	= "";
	}
}

//###################################
// 화면전환
//###################################
function chgInOutText(n){
	var cnt     = ifmMain.location.href.indexOf("/" , 7);
	var hostip = ifmMain.location.href.substring(cnt);

	if(n == 0) hostip = "/jsp/customer/crsMainInbound.jsp";
	else if(n == 1) hostip = "/jsp/customer/crsMainOutbound.jsp";

	if(hostip == "/jsp/customer/crsMainOutbound.jsp") inout.innerHTML = "<img src='/html/images/main/inbound.gif' border=0 style='cursor:hand' onclick='chgInOutBound(0)' align='absmiddle' valign='bottom'>";
	else inout.innerHTML = "<img src='/html/images/main/outbound.gif' border=0 style='cursor:hand' onclick='chgInOutBound(1)' align='absmiddle'  valign='bottom'>";
}

//###################################
// 화면전환
//###################################
function chgInOutBound(n){
	if(top.g_ctiloginyn == "Y") {
		if(top.g_state != "AGENTNOTREADY" && top.g_state != "NOTREADYREASON" && top.g_state != "LOGIN") return;
	}

	if(divMain[1].style.display == "none") {
		divMain[0].style.display = "none";
		divMain[1].style.display = "";
		return;
	}

	if(n == 0) ifmMain.location.href="/jsp/customer/crsMainInbound.jsp";
	else ifmMain.location.href="/jsp/customer/crsMainOutbound.jsp";

	g_inout = n;
	chgInOutText(n);
}

//############################ 고객정보 ############################

//###################################
//고객정보 초기화
//###################################
function clearGlobalCustInfo()
{
	g_custInfoHash.clear();
}

//고객정보 Get
function getGlobalCustInfo(key)
{
	return g_custInfoHash.get(key);
}

//고객정보 Hashtable 가져오기
function getGlobalCustInfoHash()
{
	return g_custInfoHash;
}

//고객정보 Set
function setGlobalCustInfo(key, val)
{
	g_custInfoHash.put(key, val);
}

//왼쪽메뉴 스위치기능
function pmenu(menuName, mode)
{
	try
	{
		if (mode == 'open') {
				eval(menuName + "_open").style.display = '';
				eval(menuName + "_close").style.display = 'none';
				ifmMain.resizeTo(1110,830);//(840,590);
				gMode = 'close';
		} else if (mode == 'close') {
				eval(menuName + "_open").style.display = 'none';
				eval(menuName + "_close").style.display = '';
				ifmMain.resizeTo(1245,830);//(973,590);
				gMode = 'open';
		}
	}
	catch(e){}
}

function tabMain_onclick(index)
{
	for (var i=0;i<divMain.length; i++)
	{
		divMain[i].style.display="none";
	}
	divMain[index].style.display="";
}

function checkWinClose()
{
	//Back Screen 보이기
	showBlackScreen();

	event.returnValue="CTI 정보나 사용자 로그인 세션이 강제 로그아웃 됩니다.";

	/**
	 * event.returnValue 이후의 작업은 무조건 event.returnValue를 실행하기 전에 실행되는 것을 방지하기 위해 1초 후에 실행하도록 설정
	 * 아래 스크립트는 confirm 창에서 취소를 클릭했을때 실행
	 * Black Screen을 없애준다.
	 */
	setTimeout(removeBlackScreen, 1000);
}

//Black Screen 보이기
function showBlackScreen()
{
	document.getElementById("blackScreen").style.display = "";
}

//Black Screen 제거
function removeBlackScreen()
{
	document.getElementById("blackScreen").style.display = "none";
}

//로그아웃 창 띄우기
function logout()
{
	//가운데 윈도우 띄우기
	var cwp = getPopupProperties("", "", 300, 100);

	window.open("/jsp/main/logout.jsp?userid="+f.userid.value , "LogOut2", cwp);
	//CTI 로그아웃
//	if(typeof GenesysCTI != undefined && GenesysCTI != null)
//	{
//		Logout();
//	}
}

/*
콜백
*/
function callback(sServiceID)
{
	switch (sServiceID)
	{
		default :
			break;
	}
}

//자신의 프래임 객체를 저장
function setThisFrame(frame)
{
	g_thisFrame = frame;
}

//자신의 프래임 객체를 가져옴
function getThisFrame()
{
	return g_thisFrame;
}

//자신의 폼 객체를 저장
function setThisForm(f)
{
	g_thisForm = f;
}

//자신의 폼 객체를 가져옴
function getThisForm()
{
	return g_thisForm;
}

// 상담지식팝업
function popKnow(v){
	//setOpener();
	//openPopup(winUrl, winArgs, winName, winTop, winLeft, winWidth, winHeight, winEtc, formMethod)

	if(v == 0) openPopup("/jsp/customer/crsKms.jsp", "", "know", "0", "0", "710", "933", "", "")
	else if(v == 1) openPopup("/jsp/customer/crsScript.jsp", "", "script", "0", "200", "710", "933", "", "")
	else if(v == 2) openPopup("/jsp/customer/crsSms.jsp", "", "sms", "0", "200", "150", "500", "", "")
	else if(v == 3) openPopup("/jsp/common/comCorpSearch.jsp", "", "corp", "0", "200", "610", "500", "", "")
}

function setCorp(frm, corp_cd, corp_nm)
{
	document.all("corp_cd_chng").value = corp_cd;
	document.all("corp_nm_chng").value = corp_nm;

	document.frames.ifmWorkMain.getComCorp();
}
// 쪽지보내기 팝업
function openMsgSend()
{
	window.open("/jsp/information/infMsgSend.jsp" ,"", "width=290,height=410");
}

// 내쪽지 확인 팝업
function openMsgList()
{
	var userid = f.userid.value;

	window.open("/jsp/information/infMsgList.jsp?user_id="+userid ,"", "width=670,height=400");

}

function demoLongin()
{
window.open("/jsp/main/demoLogin.jsp", 'frameworklogin', 'width=420px, height=220px');

}
/**
 * 메일쓰기
 */
function openSendMail()
{
	openPopup("/jsp/common/comMailSendP.jsp", "", "comMailSendP", "", "", 800, 770, "resizable=yes", "");
}
/**
 * SMS전송
 */
function openSendSMS()
{
	openPopup("/jsp/common/comSmsSendP.jsp", "", "comSmsSendP", "", "", 980, 650, "resizable=yes", "");
}