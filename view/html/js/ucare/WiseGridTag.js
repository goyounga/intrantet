var gRowActiveBg = "238|223|204";	// WiseGrid Active Row Color

/**
 * WiseGrid 초기화
 * objName : WiseGrid ID
 * width : WiseGrid width
 * height : WiseGrid height
 */
 function initWiseGrid(objName, width, height)
{
  var WISEGRID_TAG = "<OBJECT ID='" + objName + "' codebase='"+scriptPath+"/cab/WiseGrid.cab#version=5,3,1,1'";
  WISEGRID_TAG = WISEGRID_TAG + " NAME='" + objName + "' WIDTH=" + width + " HEIGHT=" + height + " border=0";
  WISEGRID_TAG = WISEGRID_TAG + " CLASSID='CLSID:E8AA1760-8BE5-4891-B433-C53F7333710F'>";
  WISEGRID_TAG = WISEGRID_TAG + " <PARAM NAME = 'strLicenseKeyList' VALUE='E569F4792B6DD6D2252CA6E5D09C3A7A'>";
  //  WISEGRID_TAG = WISEGRID_TAG + " <PARAM NAME = 'strLicenseKeyList' VALUE='FDADF885C0891084793018DB020CFE5F'>"; --192.168.123.6 서버 라이센스
  
  WISEGRID_TAG = WISEGRID_TAG + "</OBJECT>"

  document.write(WISEGRID_TAG);
} 
 
function setPropertyBlue(obj)
{
	 //푸른색상
    // Header Color
    obj.strHDBgColor = setRGB("#E5ECF6");
    obj.strHDFgColor = setRGB("#1F4778");
   
    // Cell Color
    obj.strGridBgColor = setRGB("#FFFFFF");
    obj.strCellBgColor = setRGB("#FFFFFF");
    obj.strCellFgColor = setRGB("#1F4778");
    
    // Border Color
    obj.strGridBorderColor = setRGB("#8D8F8E");

    // ETC Color
    obj.strSelectedCellBgColor = "242|255|223";
    obj.strSelectedCellFgColor = setRGB("#1F4778");
    obj.strStatusbarBgColor = "243|243|243";
    obj.strStatusbarFgColor = "101|101|101";
    obj.strProgressbarColor = "0|126|174";
    
	obj.strActiveRowBgColor = gRowActiveBg;
   
	setComProperty(obj);
}

function setPropertyGreen(obj)
{
	 //초록색상
    // Header Color
    obj.strHDBgColor = setRGB("#DBEED8");
    obj.strHDFgColor = setRGB("#1C451D");
   
    // Cell Color
    obj.strGridBgColor = setRGB("#FFFFFF");
    obj.strCellBgColor = setRGB("#FFFFFF");
    obj.strCellFgColor = setRGB("#1C451D");
    
    // Border Color
    obj.strGridBorderColor = setRGB("#819A7D");

    // ETC Color
    obj.strSelectedCellBgColor = "242|255|223";
    obj.strSelectedCellFgColor = setRGB("#1C451D");
    obj.strStatusbarBgColor = "243|243|243";
    obj.strStatusbarFgColor = "101|101|101";
    obj.strProgressbarColor = "0|126|174";
    
	obj.strActiveRowBgColor = gRowActiveBg;
    
	setComProperty(obj);
}

function setPropertyGray(obj)
{
	 //푸른색상
    // Header Color
    obj.strHDBgColor = setRGB("#F1F3F1");
    obj.strHDFgColor = setRGB("#000000");
   
    // Cell Color
    obj.strGridBgColor = setRGB("#FFFFFF");
    obj.strCellBgColor = setRGB("#FFFFFF");
    obj.strCellFgColor = setRGB("#000000");
    
    // Border Color
    obj.strGridBorderColor = setRGB("#8D8F8E");

    // ETC Color
    obj.strSelectedCellBgColor = "242|255|223";
    obj.strSelectedCellFgColor = setRGB("#000000");
    obj.strStatusbarBgColor = "243|243|243";
    obj.strStatusbarFgColor = "101|101|101";
    obj.strProgressbarColor = "0|126|174";
    
	obj.strActiveRowBgColor = gRowActiveBg;
   
	setComProperty(obj);
}

function setPropertyBeige(obj)
{
	setComProperty(obj);
}

function setProperty(obj)
{
	setPropertyGray(obj);
	setComProperty(obj);
}

function setComProperty(obj)
{
    // Cell Font Setting
    obj.strCellFontName = "돋움";
    obj.nCellFontSize = 9;

    // Header Font Setting
    obj.strHDFontName = "돋움";
    obj.nHDFontSize = 9;
    obj.nHDLineSize = 20;
    obj.bHDFontBold = false;

    // Border Style
    obj.strGridBorderStyle = "solidline";
    obj.strHDBorderStyle = "solidline";
    obj.strCellBorderStyle = "solidline";
    
    // ETC
    obj.bHDMoving = false;
    obj.bHDSwapping = false;
//    obj.strHDClickAction = "sortsingle"

	// Header Duble Click시 CheckBox 전체 체크 사용 여부 
	obj.bHDDblClickAction = false;
	
    obj.strRowBorderStyle="none";
    obj.nRowSpacing=0;
//    obj.strHDClickAction="select";
    
    obj.bMultiRowMenuVisible = true;
    obj.nAlphaLevel = 0;
    obj.nRowHeight = 22;
    
    // ScrollBar
    // none 		: 스크롤 바를 감춘다. 
	// horizontal 	: 수평 스크롤 바만 보이게 한다. 
	// vertical 	: 수직 스크롤 바만 보이게 한다. 
	// both 		: 수평, 수직 스크롤 바 둘 다 보이게 한다. 
	// automatic 	: (기본값)스크롤 바를 자동으로 보이게 한다. 
    obj.strScrollBars = 'automatic'; 
    obj.bStatusbarVisible = true;
    
    obj.SetProgressbarPaneSize(50); 
	obj.SetStatusbarSubMsgPaneSize(60); 
	//obj.SetStatusbarSubMsg('Rows:9999'); 
	obj.strRowSizing = "fixed";
	
	obj.bStatusbarBorderVisible = false;
	
	/**
	 * edit 		: 클릭한 셀은 선택되고 수정 모드로 변경된다. 
	 * rowselect 	: 클릭한 셀의 로우가 선택된다. (셀의 값을 수정할 수가 없다.) 
	 * cellselect 	: 클릭한 셀이 선택된다. (수정 모드로 들어가지는 않는다.) 
	 */
	obj.strCellClickAction = "edit";
	
	// 숫자 null일 경우
	obj.bNullValueNumberFormat = false;
	
	obj.bDoQueryDynamic = true;	
	
	/**
	 * nextcell		: 오른쪽 셀로 이동한다. (마지막 셀인경우 다음로우의 첫번째 셀로 이동)
	 * belowcell	: (기본값) 아래쪽 셀로 이동한다. 
	 * activecell	: 현 위치에서 이동하지 않는다. 
	 */
	obj.strEnterNavigate = "activecell";  
}

/**
 * WiseGrid SummaryBar 추가하기
 * obj : WiseGrid 객체
 * name : SummaryBar Key
 * sMergeColumn : Merge된 ColumnKey (전체 합계를 구할 때는 'summaryall'를 입력한다.)
 * sText : SummarayBar Text
 * sFunc : 수식	(sum, count, average)
 * sColumn : 수식이 적용될 컬럼키 리스트
 * 예) summaryWiseGrid(GridObj, "SUMMARY1", "summaryall", "합계", "sum", "cnt01,cnt02");	// 전체 합계를 구함
 * 예) summaryWiseGrid(GridObj, "SUMMARY1", "name", "소계", "sum", "cnt01,cnt02");		// Mearge된 컬럼별 소계를 구함
 */
function summaryWiseGrid(obj, name, sMergeColumn, sText, sFunc, sColumn)
{ 
 	var GridObj = obj;

//	if(GridObj.GetRowCount() == 0) {
//		alert("먼저 조회하십시오.");
//		return;
//	}
	
	//모든 SummaryBar를 Clear한다. 
	//	GridObj.ClearSummaryBar();

	//Group Merge를 Clear한다. 
	//GridObj.ClearGroupMerge();

	//WiseGrid에 SummaryBar를 추가한다. 
	GridObj.AddSummaryBar(name, sText, sMergeColumn, sFunc, sColumn); 

	//SummaryBar의 색상을 조절한다.
	GridObj.SetSummaryBarColor(name, '100|100|100', '250|222|222'); 

	//SummaryBar의 폰트를 조절한다
	GridObj.SetSummaryBarFont(name, "돋움", "10", false, false, false, false);

	//Row Selector 를 로우수 -1 로 이동한다.
	GridObj.MoveRow(GridObj.GetRowCount() - 1);
}

/**
 * SummaryBar을 사용하지 않고 따로 Row를 추가한 Summary Row의 속성을 설정한다.
 * GridObj : WiseGrid 객체
 * nRow : Row Index
 * strActivation : Row의 컬럼 편집속성 
 */
function setSummaryStyle(GridObj, nRow, strActivation)
{
	var colCount = GridObj.GetColCount(); 
	for (var j=0; j<colCount; j++) 
	{ 
		var col = GridObj.GetColHDKey(j); 
		GridObj.SetCellFgColor(col, nRow, '31|73|121'); 
		GridObj.SetCellBgColor(col, nRow, '214|229|253'); 
		GridObj.SetCellFont( col, nRow, '우리돋움', 9,'false','false','false','false');
		
		if (strActivation && strActivation != "")
		{
			/**
			 * edit			  : 지정한 컬럼에 대해 편집가능하게 한다.
			 * activateonly   : 셀 안의 커서를 움직일 수 있고 선택할 수 있지만 편집할 수는 없다.
			 * disable		  : 선택할 수 없고 편집할 수 없다.
			 * activatenoedit : 단순히 셀을 선택할 수 있게 한다. 
			 */
			GridObj.SetCellActivation(col, nRow, strActivation);
		}   
	}
} 

/**
 * WiseGrid Tree 속성을 설정한다.
 * obj : WiseGrid 객체
 */
function setTreeProperty(obj)
{
    setProperty(obj);
	obj.nCellFontSize = 9;
	//클릭한 컬럼의 셀을 선택한다 
	obj.strHDClickAction = "select";
	 
	//헤더를 WiseGrid에서 숨긴다.
	obj.bHDVisible = false;
	 
	//Statusbar를 WiseGrid에서 숨긴다.
	obj.bStatusbarVisible = false;
	 
	//로우 셀렉터를 WiseGrid에서 숨긴다.
	obj.bRowSelectorVisible = false;
	 
	//셀의 테두리에 아무것도 나타나지 않는다.
	obj.strCellBorderStyle = "none";
	 
	//그리드의의 테두리에 아무것도 나타나지 않는다.
	//obj.strGridBorderStyle = "none";
	obj.strGridBorderColor = "181|197|222";
	obj.strGridBorderStyle = "solidline";
	 
	//로우의 테두리에 아무것도 나타나지 않는다.
	obj.strRowBorderStyle = "none";
	 
	//사용자 컨텍스트메뉴를 사용한다.
	obj.bUserContextMenu = true;
	 
	// 기본 컨텍스트 메뉴를 사용하지 않는다.
	obj.bUseDefaultContextMenu = false;
	 
	//Drag로 선택된 셀의 배경색상을 변경할 수 있다 
 	obj.strSelectedCellBgColor = "182|225|106"; 
}

/**
 * 그리드에서 사용하는 포맷의 RGB값을 구한다.
 * rgb : html에서 사용하는 RGB값(ex:#FFFE26)
 */
function setRGB(rgb)
{
	var red;
	var green;
	var blue;

	var retval = new StringBuffer();

	if (rgb == "") return "255|255|255"; //white

	rgb = rgb.replace("#", "");
	red = parseInt(rgb.substring(0,2),16);
	green = parseInt(rgb.substring(2,4),16);
	blue = parseInt(rgb.substring(4,6),16);

	retval.append(red.toString()+"|");
	retval.append(green.toString()+"|");
	retval.append(blue.toString());

	return retval.toString();
}


/**
 * grid event 세팅
 * obj : WiseGrid 객체
 * rowactivebg : rowactive시 색을 줄 지 여부
 */
function initializedGrid(obj, rowactivebg)
{
//	var aKey = htGrid.getNames();
//	for (var i=0; i < aKey.length; i++)
//	{
//		if (aKey[i] == obj.id)
//		{
	var objId = obj.id
	var sFun  = "setHeader_"+objId+"('"+objId+"')";
	eval(sFun);	//
	var aEvent = htGrid.get(objId);
	var objGrid = document.all[objId];
	objGrid.SetParam("rowactivebg", rowactivebg);

	var hs={};
	for(var i=0;i<objGrid.GetParamCount();i++){
		hs[objGrid.GetParamKey(i)]= objGrid.GetParam(objGrid.GetParamKey(i));
	}
	aGridPrp[objId] = hs;
	
	for (var j=0; j < aEvent.length; j++)
	{
		var sEventFun = "";
		switch (aEvent[j])
		{
			case "CellClick":
				setCellClickEvent(objGrid, objId, aEvent[j]);
				break;

			case "CellDblClick":
				setCellDbClickEvent(objGrid, objId, aEvent[j]);
				break;
			break;

			case "RowActivate":
				setRowActivateEvent(objGrid, objId, aEvent[j]);
				break;

			case "CellRClick":
				setCellClickEvent(objGrid, objId, aEvent[j]);
				break;

			case "ChangeCell":
				setChangeCellEvent(objGrid, objId, aEvent[j]);
				break;

			case "ChangeCombo":
				setChangeComboEvent(objGrid, objId, aEvent[j]);
				break;

			case "TreeNodeClick":
				setTreeNodeClickEvent(objGrid, objId, aEvent[j]);
				break;

			// 기존 코딩방식을 따라가기 위해
			case "CellClickCellDblClick":
				setCellBClickEvent(objGrid, objId, aEvent[j]);
				break;

			case "RowScroll":
				setScrollRowEvent(objGrid, objId, aEvent[j]);
				break;

			case "HeaderClick":
				setHeaderClickEvent(objGrid, objId, aEvent[j]);
				break;
		}
	}
}

// Grid CellClick Event setting
function setCellClickEvent(obj, id, aEvent)
{
	obj.attachEvent(aEvent, function CellClick(strColumnKey, nRow) {
		eval("showDetailO_obj('"+id+"', strColumnKey, nRow)") } );
}

// Grid CellDblClick Event setting
function setCellDbClickEvent(obj, id, aEvent)
{
	obj.attachEvent(aEvent, function CellDblClick(strColumnKey, nRow) {
		eval("showDetailB_obj('"+id+"', strColumnKey, nRow)") } );
}

// Grid RowActivate Event setting
function setRowActivateEvent(obj, id, aEvent)
{
	obj.attachEvent(aEvent, function RowActivate(nRow) {
		eval("showDetailA_obj('"+id+"', '', nRow)") } );
}

// Grid CellRClick Event setting
function setCellRClickEvent(obj, id, aEvent)
{
	obj.attachEvent(aEvent, function CellClick(strColumnKey, nRow) {
		eval("showDetailR_obj('"+id+"', strColumnKey, nRow)") } );
}

// Grid ChangeCell Event setting
function setChangeCellEvent(obj, id, aEvent)
{
	obj.attachEvent(aEvent, function ChangeCell(strColumnKey, nRow, vtOldValue, vtNewValue) {
		eval("showDetailC_obj('"+id+"', strColumnKey, nRow, vtOldValue, vtNewValue)") } );
}

// Grid ChangeCombo Event setting
function setChangeComboEvent(obj, id, aEvent)
{
	obj.attachEvent(aEvent, function ChangeCombo(strColumnKey, nRow, nOldIndex, nNewIndex) {
		eval("showDetailS_obj('"+id+"', strColumnKey, nRow, nOldIndex, nNewIndex)") } );
}

// Grid TreeNodeClick Event setting
function setTreeNodeClickEvent(obj, id, aEvent, rowactivebg)
{
 obj.attachEvent(aEvent, function TreeNodeClick(strTreeKey, strArea) { eval("treeClick('"+id+"', strTreeKey, strArea)") } );
}

// Grid CellClick & CellDblClick Event setting
function setCellBClickEvent(obj, id, aEvent)
{
	obj.attachEvent("CellClick", function CellClick(strColumnKey, nRow) { 
		eval("showDetailO_obj('"+id+"', strColumnKey, nRow)") } );
	obj.attachEvent("CellDblClick", function CellDblClick(strColumnKey, nRow) { 
		eval("showDetailB_obj('"+id+"', strColumnKey, nRow)") } );
}

// Grid Scroll Event setting
function setScrollRowEvent(obj, id, aEvent)
{
	obj.attachEvent(aEvent, function RowScroll(nFirstRow, nLastRow) { eval("scrollRow_obj('"+id+"', nFirstRow, nLastRow)") } );
}

