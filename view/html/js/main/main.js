/**
 * PROJ : Nexfron Intranet
 * NAME : main.js
 * DESC : ���� �ڹٽ�ũ��Ʈ
 * Author : ������ �븮
 * VER  : 1.0
 * Copyright 2009 Nexfron All rights reserved
 * ============================================================================================
 * 								��		��		��		��
 * ============================================================================================
 * VERSION		DATE		AUTHOR		DESCRIPTION
 * ============================================================================================
 * 1.0		2009.08.13		������		�ּ��߰�
 * 1.1		2009.08.20		������		���� ���� ���� �߰�
 */

var gMenu = Array();
var gMenuId;
var gMenuSubId;
var index=0;
var demoyn = "N";
var g_custInfoHash = new Hashtable();		//������

var g_thisFrame = null;		//Opener�� �ڽ� ������ ��ü
var g_thisForm = null;		//Opener�� �ڽ� �� ��ü

var g_ctiloginyn = "N";
var g_tabindex;		// main���� tab Ŭ������ index�� ��Ƶд�.
var g_inout = 1;		// inbound, outbound ����(default : 1) - outbound
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

/** �ΰ� Ŭ���� home���� �б�
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
	//menu_click("030700", "knowledge/kmsMain.jsp", "���İ˻�", "��������",  "null", 1);
}

/**
 * ȭ�鿡�� ��ü�� Top ��ǥ�� ���Ѵ�.
 * obj : ��ü
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
 * ȭ�鿡�� ��ü�� Left ��ǥ�� ���Ѵ�.
 * obj : ��ü
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

/*******************  MDI���� START ***********************************/

var g_mdiCnt = 8; //mdi�������� ������ ȭ�� ����
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
 * ������ �� Ŭ���� - �������� �ٸ� �Ǹ޴���� �ٸ��� �ܵ� ������ �����Ǿ��ִ�.
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
		strMenu += "	<td id=mCrsScreen class='screentab_select_bg' style='width:120px'>������</td>";
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
 * ������ ���� Ŭ���� - refresh
 * @return
 */
function crsScreenMenu_onDblClick()
{
	ifmMain.location.href = "/jsp/customer/crsMain.jsp";
}
/**
 * ������ �ݱ��ư Ŭ���� - �� ����.
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
 * �޴��� Ŭ����
 * @param index
 * @return
 */
function screenMenu_onClick(index)
{
	//������ disable
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
 * �޴��� Ŭ����
 * @param index
 * @param parentMenuIndex : �ָ޴� index
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

	// 2011.2.10 home �޴� Ŭ���ø� ���ΰ�ħ SKYU
	if(document.all("ifmWorkMain" + (index)).src == "home.jsp"){
		screenTab_onDblClick(index, parentMenuIndex);
	}

	//screenTab_onDblClick(index, parentMenuIndex)
}

/**
 * �޴��� ���� Ŭ���� ȭ�� refresh
 * @param index : index
 * @param parentMenuIndex : �ָ޴� index
 * @return
 */
function screenTab_onDblClick(index, parentMenuIndex)
{
	document.all("ifmWorkMain" + (index)).src = arrMdiInfo[index][1];
}

/**
 * ���� X��ư Ŭ���� ȭ�� ����.
 * @param index : index
 * @param parentMenuIndex : �ָ޴� index
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

	//������ tabȭ���� �ϳ��� ������ �о ä���
	mekeScreenTab(index);

	//�������� ���õǾ� �ִ� ���
	/*if(divMain[1].style.display == "")
	{
		topmenu_click(0, "", "");
		return;
	}*/

	findLastTab();
}

/**
 * ��������  �����ϰ�,  ������ Tabã��
 */
function findLastTab()
{
	var count = 0;
	var lastIndex = -1;
	for(var i=0; i < tdScreen.length-1; i++)
	{
		//ȭ���� ���� ����
		if(arrMdiInfo[i][1] != "")
		{
			count++;
		}

		//�Ǹ����� �ε��� ã��
		if(tdScreen[i].innerHTML != "")
		{
			lastIndex = i;
		}
	}

	if(count == 0)
	{
		oldTabNo = -1;

		//�� ��� ������  �����θ� ���µǾ����� ������ ȭ�� ���½�Ų��.
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
 * �޴� ���ý� �� �߰��ϱ�
 * @param url : �߰��� url
 * @param screenName : ȭ���
 * @param parentMenuIndex : �ָ޴� index
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

			if (param || url == "home.jsp") document.all("ifmWorkMain" + i).src = url+(param?"?"+param:""); //home ȭ���� ���ΰ�ħ�ǵ��� ����
			return;
		}

		/*
		//2011.08.02 �������� �ٸ��� ���ΰ�ħ
		var tempUrl_1 = trim(arrMdiInfo[i][1]).split("?")[0];
		var tempUrl_2 = trim(url).split("?")[0];

		var tempUrlParam_1 = trim(arrMdiInfo[i][1]).split("&")[0];
		var tempUrlParam_2 = trim(url).split("&")[0];


		if(tempUrl_1 == tempUrl_2 && tempUrl_2 != "/jsp/knowledge/kmsBordMng.jsp")
		{
			screenTab_onClick(i, arrMdiInfo[i][3]);
			screenMenu_onClick(arrMdiInfo[i][2]);
			if (param || url == "home.jsp") document.all("ifmWorkMain" + i).src = url+(param?"?"+param:""); //home ȭ���� ���ΰ�ħ�ǵ��� ����

			if (trim(arrMdiInfo[i][1]) != trim(url) )	//2011.08.02 �������� �ٸ��� ���ΰ�ħ
			{
				arrMdiInfo[i][1] = url;
				document.all("ifmWorkMain" + i).src = url+(param?"?"+param:"");
			}
			return;
		}

		else if (tempUrl_2 == "/jsp/knowledge/kmsBordMng.jsp")  //kmsBordMng������ ���� �Ŵ��� ���Ǳ� ������ data_type_cd�� �������� ���� ������
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
		if(arrMdiInfo[i][1] == "") //url��  null���� üũ
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
 * ��ó�� �ε���ã�Ƽ� �ٽ� ����. - �ڵ��ϱ� �Ⱦ �׳� copy
 * @param url : �߰��� url
 * @param screenName : ȭ���
 * @param parentMenuIndex : �ָ޴� index
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
			if (param || url == "home.jsp") document.all("ifmWorkMain" + i).src = url+(param?"?"+param:""); //home ȭ���� ���ΰ�ħ�ǵ��� ����
			return;
		}
	}

	var bEmptyYN = false;
	var tdmenuIndex = 0;

	for(var i=0; i < tdScreen.length-1; i++)
	{
		if(arrMdiInfo[i][1] == "") //url��  null���� üũ
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
 * X������ ���콺 �ö�����
 */
function btnX_mouseOver(obj)
{
	obj.src = scriptPath + "/images/popup/btn_delete02.gif";
}

/**
 * X������ ���콺 �������
 */
function btnX_mouseOut(obj)
{
	obj.src = scriptPath + "/images/popup/btn_delete02_d.gif";
}
/**
 * ���� ���� �ϳ��� ������ �о� �ִ´�
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
 * Ȱ��ȭ�� ���� �����ϰ� ��� �ݴ´�.
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

			//������ tabȭ���� �ϳ��� ������ �о ä���
			mekeScreenTab(i);
		}
	}
}
/*MDI���� END */



// �Ҹ޴� ���콺 in
function lmmenu_over(obj)
{
	if (obj.className != "topmenu_2dep_select")  obj.className="topmenu_2dep_select";
	//obj.style.textDecoration = "underline";
}

//�Ҹ޴� ���콺 out
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

	//left = 115 + (84 * index);	//10(L)+64(M)+10(R)	-> LEFT����, WIDTH64�϶�
	//left = 650 + (95 * index);	//10(L)+75(M)+10(R)

	var index2 = 1;	//�޴�����index
	index2 = (menu.length-1) + 1 - parseInt(index);	//�޴�����index = (�Ѹ޴�����+1) - �޴�index : �޴����׻�1���������Ѵ�.
	left = getObjLeft(menu[index]) - document.body.scrollLeft -35 ; //1210-(106 * index2);	//10(L)+75(M)+10(R)-> RIGHT����, WIDTH75�϶� : totWidth-(tabWidth*indexNum)



/*
	var menucnt = 0;
	if(!sMenuCnt.length) menecnt = sMenuCnt.innerText;
	else menecnt = sMenuCnt[index-1].innerText;
	height = parseInt(menecnt) * 21 + 32;
*/
	height = (tblMenu[index].rows.length/2) * 26 + 25;

	// show( left, top, width, height, ��ǥ�� ������ �Ǵ� Object )
	CalDiv.show(left, menuTop, 145, height, document.body);

}

function submenu_onUnload()
{
	if(!bMenuClick && currIndex > 0)  topmenu_click(currIndex, "", "", "1");
}

//��޴� ���콺over
function topmenu_over(index)
{

}

//��޴� ���콺 out
function topmenu_out(index)
{

}

/** ��޴� Ŭ��
	index : ��޴� Index
	menuId : �޴� ID - ������
	menuSrc :�޴� URL - ������
	flag : ����޴� ǥ�ÿ���
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

	if(flag == "2") CalDivShow(index); //�޴��߰�
}

var currIndex = -1;
var bMenuClick = false;
/** ����޴� Ŭ���� �ش� url�� �б� �� �޴� map(������ �������� ��ܿ� ��ġ)�� ǥ���Ѵ�.
	menuId : menu ID
	menuSrc : �޴� URL
	submenuNm : �޴� map ǥ�ø� ���� ����޴� ��
	mainmenuNm : �޴� mapǥ�ø� ���� ���θ޴� ��
 */
function menu_click(menuId, menuSrc, submenuNm, mainmenuNm, target, parentIndex, param)
{
	bMenuClick = true;
	currIndex = parentIndex;
	top.tdStatus.innerHTML = ""; //status�� �޽��� ����
	gMenuId = menuId;
	//auth (���:��ȸ:����:����:����:����Ʈ)
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
 * �������� ������ ����
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
// ȭ����ȯ
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
// ȭ����ȯ
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

//############################ ������ ############################

//###################################
//������ �ʱ�ȭ
//###################################
function clearGlobalCustInfo()
{
	g_custInfoHash.clear();
}

//������ Get
function getGlobalCustInfo(key)
{
	return g_custInfoHash.get(key);
}

//������ Hashtable ��������
function getGlobalCustInfoHash()
{
	return g_custInfoHash;
}

//������ Set
function setGlobalCustInfo(key, val)
{
	g_custInfoHash.put(key, val);
}

//���ʸ޴� ����ġ���
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
	//Back Screen ���̱�
	showBlackScreen();

	event.returnValue="CTI ������ ����� �α��� ������ ���� �α׾ƿ� �˴ϴ�.";

	/**
	 * event.returnValue ������ �۾��� ������ event.returnValue�� �����ϱ� ���� ����Ǵ� ���� �����ϱ� ���� 1�� �Ŀ� �����ϵ��� ����
	 * �Ʒ� ��ũ��Ʈ�� confirm â���� ��Ҹ� Ŭ�������� ����
	 * Black Screen�� �����ش�.
	 */
	setTimeout(removeBlackScreen, 1000);
}

//Black Screen ���̱�
function showBlackScreen()
{
	document.getElementById("blackScreen").style.display = "";
}

//Black Screen ����
function removeBlackScreen()
{
	document.getElementById("blackScreen").style.display = "none";
}

//�α׾ƿ� â ����
function logout()
{
	//��� ������ ����
	var cwp = getPopupProperties("", "", 300, 100);

	window.open("/jsp/main/logout.jsp?userid="+f.userid.value , "LogOut2", cwp);
	//CTI �α׾ƿ�
//	if(typeof GenesysCTI != undefined && GenesysCTI != null)
//	{
//		Logout();
//	}
}

/*
�ݹ�
*/
function callback(sServiceID)
{
	switch (sServiceID)
	{
		default :
			break;
	}
}

//�ڽ��� ������ ��ü�� ����
function setThisFrame(frame)
{
	g_thisFrame = frame;
}

//�ڽ��� ������ ��ü�� ������
function getThisFrame()
{
	return g_thisFrame;
}

//�ڽ��� �� ��ü�� ����
function setThisForm(f)
{
	g_thisForm = f;
}

//�ڽ��� �� ��ü�� ������
function getThisForm()
{
	return g_thisForm;
}

// ��������˾�
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
// ���������� �˾�
function openMsgSend()
{
	window.open("/jsp/information/infMsgSend.jsp" ,"", "width=290,height=410");
}

// ������ Ȯ�� �˾�
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
 * ���Ͼ���
 */
function openSendMail()
{
	openPopup("/jsp/common/comMailSendP.jsp", "", "comMailSendP", "", "", 800, 770, "resizable=yes", "");
}
/**
 * SMS����
 */
function openSendSMS()
{
	openPopup("/jsp/common/comSmsSendP.jsp", "", "comSmsSendP", "", "", 980, 650, "resizable=yes", "");
}