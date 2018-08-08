var gRowActiveBg = "238|223|204";	// WiseGrid Active Row Color

/**
 * WiseGrid �ʱ�ȭ
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
  //  WISEGRID_TAG = WISEGRID_TAG + " <PARAM NAME = 'strLicenseKeyList' VALUE='FDADF885C0891084793018DB020CFE5F'>"; --192.168.123.6 ���� ���̼���
  
  WISEGRID_TAG = WISEGRID_TAG + "</OBJECT>"

  document.write(WISEGRID_TAG);
} 
 
function setPropertyBlue(obj)
{
	 //Ǫ������
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
	 //�ʷϻ���
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
	 //Ǫ������
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
    obj.strCellFontName = "����";
    obj.nCellFontSize = 9;

    // Header Font Setting
    obj.strHDFontName = "����";
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

	// Header Duble Click�� CheckBox ��ü üũ ��� ���� 
	obj.bHDDblClickAction = false;
	
    obj.strRowBorderStyle="none";
    obj.nRowSpacing=0;
//    obj.strHDClickAction="select";
    
    obj.bMultiRowMenuVisible = true;
    obj.nAlphaLevel = 0;
    obj.nRowHeight = 22;
    
    // ScrollBar
    // none 		: ��ũ�� �ٸ� �����. 
	// horizontal 	: ���� ��ũ�� �ٸ� ���̰� �Ѵ�. 
	// vertical 	: ���� ��ũ�� �ٸ� ���̰� �Ѵ�. 
	// both 		: ����, ���� ��ũ�� �� �� �� ���̰� �Ѵ�. 
	// automatic 	: (�⺻��)��ũ�� �ٸ� �ڵ����� ���̰� �Ѵ�. 
    obj.strScrollBars = 'automatic'; 
    obj.bStatusbarVisible = true;
    
    obj.SetProgressbarPaneSize(50); 
	obj.SetStatusbarSubMsgPaneSize(60); 
	//obj.SetStatusbarSubMsg('Rows:9999'); 
	obj.strRowSizing = "fixed";
	
	obj.bStatusbarBorderVisible = false;
	
	/**
	 * edit 		: Ŭ���� ���� ���õǰ� ���� ���� ����ȴ�. 
	 * rowselect 	: Ŭ���� ���� �ο찡 ���õȴ�. (���� ���� ������ ���� ����.) 
	 * cellselect 	: Ŭ���� ���� ���õȴ�. (���� ���� ������ �ʴ´�.) 
	 */
	obj.strCellClickAction = "edit";
	
	// ���� null�� ���
	obj.bNullValueNumberFormat = false;
	
	obj.bDoQueryDynamic = true;	
	
	/**
	 * nextcell		: ������ ���� �̵��Ѵ�. (������ ���ΰ�� �����ο��� ù��° ���� �̵�)
	 * belowcell	: (�⺻��) �Ʒ��� ���� �̵��Ѵ�. 
	 * activecell	: �� ��ġ���� �̵����� �ʴ´�. 
	 */
	obj.strEnterNavigate = "activecell";  
}

/**
 * WiseGrid SummaryBar �߰��ϱ�
 * obj : WiseGrid ��ü
 * name : SummaryBar Key
 * sMergeColumn : Merge�� ColumnKey (��ü �հ踦 ���� ���� 'summaryall'�� �Է��Ѵ�.)
 * sText : SummarayBar Text
 * sFunc : ����	(sum, count, average)
 * sColumn : ������ ����� �÷�Ű ����Ʈ
 * ��) summaryWiseGrid(GridObj, "SUMMARY1", "summaryall", "�հ�", "sum", "cnt01,cnt02");	// ��ü �հ踦 ����
 * ��) summaryWiseGrid(GridObj, "SUMMARY1", "name", "�Ұ�", "sum", "cnt01,cnt02");		// Mearge�� �÷��� �Ұ踦 ����
 */
function summaryWiseGrid(obj, name, sMergeColumn, sText, sFunc, sColumn)
{ 
 	var GridObj = obj;

//	if(GridObj.GetRowCount() == 0) {
//		alert("���� ��ȸ�Ͻʽÿ�.");
//		return;
//	}
	
	//��� SummaryBar�� Clear�Ѵ�. 
	//	GridObj.ClearSummaryBar();

	//Group Merge�� Clear�Ѵ�. 
	//GridObj.ClearGroupMerge();

	//WiseGrid�� SummaryBar�� �߰��Ѵ�. 
	GridObj.AddSummaryBar(name, sText, sMergeColumn, sFunc, sColumn); 

	//SummaryBar�� ������ �����Ѵ�.
	GridObj.SetSummaryBarColor(name, '100|100|100', '250|222|222'); 

	//SummaryBar�� ��Ʈ�� �����Ѵ�
	GridObj.SetSummaryBarFont(name, "����", "10", false, false, false, false);

	//Row Selector �� �ο�� -1 �� �̵��Ѵ�.
	GridObj.MoveRow(GridObj.GetRowCount() - 1);
}

/**
 * SummaryBar�� ������� �ʰ� ���� Row�� �߰��� Summary Row�� �Ӽ��� �����Ѵ�.
 * GridObj : WiseGrid ��ü
 * nRow : Row Index
 * strActivation : Row�� �÷� �����Ӽ� 
 */
function setSummaryStyle(GridObj, nRow, strActivation)
{
	var colCount = GridObj.GetColCount(); 
	for (var j=0; j<colCount; j++) 
	{ 
		var col = GridObj.GetColHDKey(j); 
		GridObj.SetCellFgColor(col, nRow, '31|73|121'); 
		GridObj.SetCellBgColor(col, nRow, '214|229|253'); 
		GridObj.SetCellFont( col, nRow, '�츮����', 9,'false','false','false','false');
		
		if (strActivation && strActivation != "")
		{
			/**
			 * edit			  : ������ �÷��� ���� ���������ϰ� �Ѵ�.
			 * activateonly   : �� ���� Ŀ���� ������ �� �ְ� ������ �� ������ ������ ���� ����.
			 * disable		  : ������ �� ���� ������ �� ����.
			 * activatenoedit : �ܼ��� ���� ������ �� �ְ� �Ѵ�. 
			 */
			GridObj.SetCellActivation(col, nRow, strActivation);
		}   
	}
} 

/**
 * WiseGrid Tree �Ӽ��� �����Ѵ�.
 * obj : WiseGrid ��ü
 */
function setTreeProperty(obj)
{
    setProperty(obj);
	obj.nCellFontSize = 9;
	//Ŭ���� �÷��� ���� �����Ѵ� 
	obj.strHDClickAction = "select";
	 
	//����� WiseGrid���� �����.
	obj.bHDVisible = false;
	 
	//Statusbar�� WiseGrid���� �����.
	obj.bStatusbarVisible = false;
	 
	//�ο� �����͸� WiseGrid���� �����.
	obj.bRowSelectorVisible = false;
	 
	//���� �׵θ��� �ƹ��͵� ��Ÿ���� �ʴ´�.
	obj.strCellBorderStyle = "none";
	 
	//�׸������� �׵θ��� �ƹ��͵� ��Ÿ���� �ʴ´�.
	//obj.strGridBorderStyle = "none";
	obj.strGridBorderColor = "181|197|222";
	obj.strGridBorderStyle = "solidline";
	 
	//�ο��� �׵θ��� �ƹ��͵� ��Ÿ���� �ʴ´�.
	obj.strRowBorderStyle = "none";
	 
	//����� ���ؽ�Ʈ�޴��� ����Ѵ�.
	obj.bUserContextMenu = true;
	 
	// �⺻ ���ؽ�Ʈ �޴��� ������� �ʴ´�.
	obj.bUseDefaultContextMenu = false;
	 
	//Drag�� ���õ� ���� �������� ������ �� �ִ� 
 	obj.strSelectedCellBgColor = "182|225|106"; 
}

/**
 * �׸��忡�� ����ϴ� ������ RGB���� ���Ѵ�.
 * rgb : html���� ����ϴ� RGB��(ex:#FFFE26)
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
 * grid event ����
 * obj : WiseGrid ��ü
 * rowactivebg : rowactive�� ���� �� �� ����
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

			// ���� �ڵ������ ���󰡱� ����
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

