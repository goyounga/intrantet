
var gsXaFlag;
var htSelRow = new Hashtable()
/*
 * ����Ű Ŭ���� ��ȸ�ϱ�
 * sFunction : ȣ��� �Լ�
 */
function pressEnter(sFunction)
{
	if(isEnterKey()) eval(sFunction);
}

/* window Load��*/
function winInit() 
{	
	UEvent.showDetailByWiseByAuth();
	
	try
	{
		top.tdStatus.innerHTML = "";
		
	}catch(e){}	
}

/* ��ȸ��ư Ŭ����*/
function query() 
{
	var tran = new Trans();

	tran.setPageRow("50");							
	tran.setSvc(SELECT_ID);			
	tran.open("f", "f","/common.do");						

//	setQueryStatus('��ȸ��');	
}

// �� ��ȸ (for html)
function showDetail_obj(obj, size)
{
	var index = getRowIndex(obj);
	//showDetail(SELECT_ID, index, f);
	
}

// �� ��ȸ (for WiseGrid)
function showDetailO_obj(id, strColumnKey, nRow)
{
	//
}

function treeClick()
{
}
function showDetailC_obj(id, strColumnKey, nRow)	//��Ŭ��
{
}


/*�� ��ȸ ��ư*/
function showDetail(SELECT_ID, index, f)
{
	if (DataSet.getTotalCount(SELECT_ID) <= 0)
	{
		return;
	}
	
	htSelRow.put(SELECT_ID, index);
	if (!f) f=document.forms[0];
	
	var ht = DataSet.getHashParam(SELECT_ID, DataSet.getCurPage(SELECT_ID), index);
	var aKey = ht.getNames();
	for (var i=0; i < aKey.length; i++)
	{
		var col = aKey[i];
		var val =ht.get(aKey[i]);
		var oj=f.elements[col];
		var suboj;
		var loop=1;

		if(!oj) oj=document.all(col);
		if (!oj) continue;
		if(oj.length>0 && oj.type!="select-one"&& oj.type!="select-multiple") loop=oj.length;
		for(var l=0;l<loop;l++)
		{
			if(typeof(oj[l])=="undefined" || oj.type=="select-one" || oj.type=="select-multiple") suboj=oj;
			else suboj=oj[l];
			otype=suboj.getAttribute("type");
			format=suboj.getAttribute("format");
			len=suboj.getAttribute("length");
			if  (format != null) val = getFormatData(val,format,len);
			if(otype==null){//innerText
				suboj.innerText=val;
				//tip attribute
				suboj.setAttribute("title",getFormatData(val,format,""));
			}else if(otype=="HTML") {
				format=suboj.getAttribute("format");
				len=suboj.getAttribute("length");
				suboj.innerHTML=val;
			}else if(otype=="checkbox" || otype=="radio"){//checked
				suboj.checked=HtmlUtil.decode(val,suboj.value,true,false);
			}else if (otype=="select-multiple")
			{
				var aArr = val.split("|");
				suboj.value = "";
				for (var m=0; m < aArr.length; m++)
				{
					for (var j=0; j < suboj.options.length; j++)
					{	
						if (aArr[m] == suboj.options[j].value) 
						{
							suboj.options[j].selected=true;
							break;
						}	
					}	
				}	
			}else{//value
				suboj.value= val;
				//tip attribute
				//suboj.setAttribute("title",getFormatData(val,format,""));
			}
		}					
				/*			
									if (f.elements[aKey[i]]) 
		{
			var obj = f.elements[aKey[i]]
			otype=obj.getAttribute("type");
			//alert(obj.format);
			obj.value = getFormatData(ht.get(aKey[i]),obj.format,obj.len);
		}
		else if (document.all[aKey[i]])	
		{
			var obj = document.all[aKey[i]]
			//alert(obj.format);
			obj.innerHTML = getFormatData(ht.get(aKey[i]),obj.format,obj.len);
		}*/
	}
}

// dataset�� ������ row ����
function removeDataSet(dsnm, rowIndex)
{
	var pageNo =DataSet.getCurPage(dsnm);
	try{
    	var xmlobj=DataSet.getUcareData(dsnm);			//dataset obj
    	var pagenm="page-"+pageNo;							//page number create
    	var dsroot=xmlobj.getElementsByTagName(pagenm);			//page xml get
    	var objRs = dsroot[0];
    	var objNode = objRs.childNodes.item(rowIndex);
		objRs.removeChild(objNode);

		var objLeft = document.all[dsnm+"_left"];
		var objTbl = document.all[dsnm];
		for(var i=0;i<objTbl.rowSize;i++)
		{
			if (objLeft)
			{
				var trobj=objLeft.rows(rowIndex+i);
				objLeft.tBodies[0].removeChild(trobj);
			}
			var trobj=objTbl.rows(rowIndex+i);
			objTbl.tBodies[0].removeChild(trobj);
		}
		
	}catch(e){
		alert("DataSet.removeReqParam: "+ e.decription);
	}
}

// dataset row ������Ʈ
function updateDataSet(orgdsnm, dsnm, rowIndex)
{
	var pageNo =DataSet.getCurPage(dsnm);
	
	try{
    	var xmlobj=DataSet.getUcareData(dsnm);			//dataset obj
    	var pagenm="page-"+pageNo;							//page number create
    	var dsroot=xmlobj.getElementsByTagName(pagenm);			//page xml get
    	var objRs = dsroot[0];
    	var objNode = objRs.childNodes.item(rowIndex);
		for(var i=0;i<objNode.childNodes.length;i++)
		{
			var oc=objNode.childNodes[i];
			if (DataSet.existReqParam(orgdsnm, oc.nodeName))
			{
				oc.text = DataSet.getReqParam(orgdsnm, oc.nodeName);
			}	
		}
		
		if (DataSet.getViewType(dsnm) == "GRID")
		{
			var objLeft = document.all[dsnm+"_left"];
			var objTbl = document.all[dsnm];
			var m =1;
			var rowSize = objTbl.rowSize;
			var iRow = rowIndex*objTbl.rowSize;
			for (var n=0; n < rowSize; n++)
			{
				iRow += n;
				if (objLeft)
				{
					for (var k=0; k < objLeft.rows[iRow].cells.length; k++)
					{
						setTdData(objRs, rowIndex, objLeft.rows[iRow].cells[k]);
					}
				}

				for (var k=m; k < objTbl.rows[iRow].cells.length; k++)
				{
					setTdData(objRs, rowIndex, objTbl.rows[iRow].cells[k]);
				}	
				m=0;
			}
		}
	}catch(e)
	{
		//alert("DataSet.getPageChildCount: "+ e.decription);
	}
	finally{
    	return val;
	}
	
}

/**
 * WiseGrid�� �������� �����Ѵ�.
 * id : WiseGrid ��ü ID
 * index : Row Index
 * f : �������� ������ Form ��ü 
 */
function showDetailByWise(id, index, f)
{
	var gridObj = document.all(id);
	
	if (isWiseGridObj(gridObj, id, index) == false)
	{
		return;
	}	

	if (!f) f = document.forms[0];
	
	var colCount = gridObj.GetColCount();
	var colFormat = "";

	for (var i=0; i < colCount; i++)
	{
		var col = gridObj.GetColHDKey(i);
		var val = "";
		var selIndex = -1;
		
		colFormat = getWiseGridCellType(gridObj, col, index);
		
		if (colFormat == "t_combo")
		{
			selIndex = gridObj.GetComboSelectedIndex(col, index);
			
			if (selIndex < 0)
			{
				val = "";
			}
			else
			{
				val = gridObj.GetComboHiddenValue(col, selIndex);
			}
		}
		else
		{
			val = gridObj.GetCellValue(col, index);
		}
 		
		var oj = f.elements[col];
		var suboj;
		var loop=1;

		if(typeof(oj) != 'object')
			oj=document.all(col);
		if (!oj) continue;
		if (oj.length>0 && oj.type!="select-one" && oj.type!="select-multiple") loop=oj.length;
		
		for(var l=0; l<loop; l++)
		{
			if (typeof(oj[l])=="undefined" || oj.type=="select-one" || oj.type=="select-multiple") suboj = oj;
			else suboj = oj[l];
			
			otype = suboj.getAttribute("type");
			format = suboj.getAttribute("format");
			len = suboj.getAttribute("length");
			
			if (format != null)
			{
				if (otype && otype=="textarea")
				{
					val = getFormatData(val, "WISEGRID", len);
				}
				else	val = getFormatData(val, format, len);
			}
			if (otype == null) {//innerText
				suboj.innerText=val;
				//tip attribute
				suboj.setAttribute("title",getFormatData(val,format,""));
			} else if (otype == "HTML") {
				format = suboj.getAttribute("format");
				len = suboj.getAttribute("length");
				suboj.innerHTML = val;
			} else if (otype == "checkbox" || otype == "radio") {//checked
				suboj.checked = HtmlUtil.decode(val, suboj.value, true, false);
			} else if (otype == "select-multiple") {
				var aArr = val.split("|");
				suboj.value = "";
				for (var m=0; m < aArr.length; m++)
				{
					for (var j=0; j < suboj.options.length; j++)
					{	
						if (aArr[m] == suboj.options[j].value) 
						{
							suboj.options[j].selected = true;
							break;
						}	
					}	
				}	
			} else {//value
				suboj.value = val;
				//tip attribute
				//suboj.setAttribute("title",getFormatData(val,format,""));
			}
		}					
	}
}

/**
 * WiseGrid Row�� �����Ѵ�.
 * id : WiseGrid ��ü ID
 * index : Row Index
 */
function removeWiseGridRow(id, index)
{
	var gridObj = document.all(id);
	
	if (isWiseGridObj(gridObj, id, index) == false)
	{
		return;
	}	
	
	gridObj.DeleteRow(index); 
}

/**
 * ������ ������ WiseGrid�� �����Ѵ�.
 * id : WiseGrid ��ü ID
 * index : Row Index
 * f : ������ ������ ������ Form ��ü   
 */
function updateWiseGridRow(id, index, f)
{
	var gridObj = document.all(id);

	if (isWiseGridObj(gridObj, id, index) == false)
	{
		return;
	}
	
	if (!f) return;

	var colCount = gridObj.GetColCount();
	var colFormat = "";

	for (var i=0; i < colCount; i++)
	{
		var col = gridObj.GetColHDKey(i);

		var oj = f.elements[col];
		if (!oj) continue;

		var val = "";
		var loop = 1;
		
		if (oj.length)	loop = oj.length;
		
		if (oj.type == "select-one")
		{
			val = oj.value;
		}
		else
		{
			if (loop > 1)
			{
				for (var x=0; x<loop; x++)
				{
					if (oj[x].type == "checkbox" || oj[x].type == "radio")
					{
						if (oj[x].checked == true)
						{
							val = oj[x].value;
							break;
						}
					}
					else
					{
						val = oj[x].value;
					}
				}
			}
			else
			{
				val = oj.value;
			}
		}

 		colFormat = getWiseGridCellType(gridObj, col, index); 
		if (colFormat == "t_date")
		{
			gridObj.SetCellValue(col, index, removeMask(val));
		}
		else if (colFormat == "t_number")
		{
			gridObj.SetCellValue(col, index, numberMask(val));
		}
		else if (colFormat == "t_combo")
		{
			gridObj.SetComboSelectedHiddenValue(col, index, val);
		}
		else
		{
			gridObj.SetCellValue(col, index, val);
		}		
	}	
}

/**
 * ��ϵ� ������ WiseGrid�� �߰��Ѵ�.
 * id : WiseGrid ��ü ID
 * rowIndex : �߰��� Row Index (�������� �߰��ϰ� ������ -1)
 * f : ������ ������ ������ Form ��ü
 * return ��ϵ� Row Index   
 */
function insertWiseGridRow(id, rowIndex, f)
{
	var gridObj = document.all(id);
	// Grid�� Row�� ���� ��� rowIndex üũ���� �ɸ��� �ʵ��� -1�� �Ѵ�.
	var nChekRowIndex = rowIndex == 0 ? -1 : rowIndex;
	
	if (isWiseGridObj(gridObj, id, nChekRowIndex) == false)
	{
		return;
	}
	
	if (!f) return;

	if (gridObj.GetRowCount() > 0)
	{
		gridObj.InsertRow(rowIndex);
	}
	else
	{
		gridObj.AddRow();
	}	
	
	var index = gridObj.GetActiveRowIndex();
	var colCount = gridObj.GetColCount();
	var colFormat = "";

	for (var i=0; i < colCount; i++)
	{
		var col = gridObj.GetColHDKey(i);
		var oj = f.elements[col];

		if (!oj) continue;
		
		var val = "";
		var loop = 1;
		
		if (oj.length)	loop = oj.length;
		
		if (oj.type == "select-one")
		{
			val = oj.value;
		}
		else
		{
			if (loop > 1)
			{
				for (var x=0; x<loop; x++)
				{
					if (oj[x].type == "checkbox" || oj[x].type == "radio")
					{
						if (oj[x].checked == true)
						{
							val = oj[x].value;
							break;
						}
					}
					else if (oj[x].type == "select-one")
					{
						val = oj.value;
						break; 
					}
					else
					{
						val = oj[x].value;
					}
				}
			}
			else
			{
				val = oj.value;
			}
		}
					
 		colFormat = getWiseGridCellType(gridObj, col, index); 
		
		if (colFormat == "t_date")
		{
			gridObj.SetCellValue(col, index, removeMask(val));
		}
		else if (colFormat == "t_number")
		{
			gridObj.SetCellValue(col, index, numberMask(val));
		}
		else if (colFormat == "t_combo")
		{
			gridObj.SetComboSelectedHiddenValue(col, index, val);
		}
		else
		{
			gridObj.SetCellValue(col, index, val);
			
			if (colFormat == "t_imagetext")
			{
				gridObj.SetCellImage(col, index, 0); 
			}
		}		
	}
	
	return index;	
}

/**
 * WiseGrid�� Ư�� Row�� ����ų� �����ش�.
 * id : WiseGrid ��ü ID
 * col : �񱳴���� �Ǵ� �÷� 
 * value : �񱳰�
 * flag : �񱳰��� ���� ��  row ���迩��
 * antiflag : �񱳰��� �ٸ� �� row ���迩�� (""�� �ָ� �� ���� �״�� �д�.)
 */
function displayWiseGridRow(id, col, value, flag, antiflag)
{
	var gridObj = document.all(id);
	
	if (isWiseGridObj(gridObj, id, 0) == false)
	{
		return false;
	}
	
	var colFormat = getWiseGridCellType(gridObj, col, 0);
	var colValue = ""; 
	var selIndex = -1;
	var i = gridObj.GetRowCount();
	while (i--)
	{
		if (colFormat == "t_combo")
		{
			selIndex = gridObj.GetComboSelectedIndex(col, i);
			
			if (selIndex < 0)
			{
				colValue = "";
			}
			else
			{
				colValue = gridObj.GetComboHiddenValue(col, selIndex);
			}
		}
		else
		{
			colValue = gridObj.GetCellValue(col, i);
		}
		
		if (colValue == value)
		{
			gridObj.SetRowHide(i, flag);
		}
		else
		{
			if (antiflag != "")
			{
				gridObj.SetRowHide(i, antiflag);
			}
		}
	}
}

/**
 * WiseGrid�� Ư�� Cell ������ �����´�.
 * id : WiseGrid ��ü ID
 * col : �񱳴���� �Ǵ� �÷� 
 * index : Row Index
 */
function getWiseGridCellValue(id, col, index)
{
	var gridObj = document.all(id);
	
	if (isWiseGridObj(gridObj, id, index, col) == false)
	{
		return "";
	}
	
	var colFormat = getWiseGridCellType(gridObj, col, index);
	var selIndex = -1;
	var colValue = ""; 
	
	if (colFormat == "t_combo")
	{
		selIndex = gridObj.GetComboSelectedIndex(col, index);
		
		if (selIndex < 0)
		{
			colValue = "";
		}
		else
		{
			colValue = gridObj.GetComboHiddenValue(col, selIndex);
		}
	}
	else
	{
		colValue = gridObj.GetCellValue(col, index);
	}
	
	return colValue;
}

/**
 * WiseGrid�� ������� �� ��ȿ�� üũ
 * obj : WiseGrid ��ü
 * id : WiseGrid ��ü ID
 * index : WiseGrid Row Index
 * col : WiseGrid Column
 * return ��밡�ɿ���
 */
function isWiseGridObj(obj, id, index, col)
{
	if (!obj)
	{
		MessageBox("NotWiseGrid", "E", id);
		return false;
	}
		
	if (obj.GetRowCount() <= index)
	{
		MessageBox("NotWiseRowIndex", "E", id);
		return false;
	}
	
	if (col)
	{
		var isOK = false;
		var i = obj.GetColCount();
		while (i--)
		{
			if (obj.GetColHDKey(i) == col)
			{
				isOK = true;
				break;
			}
		}
		
		if (isOK == false)
		{
			MessageBox("NotWiseGrid", "E", (id + "�� " + col));
			return false;
		}
		else
		{
			return true;
		}
	}
	
	return true;
}

/**
 * WiseGrid Cell�� type ������ �����´�.
 * obj : WiseGrid ��ü
 * col : WiseGrid cell header key�� (=column)
 * index : WiseGrid Row Index
 */
function getWiseGridCellType(obj, col, index)
{
	// ��ȯ�� ���� ���� ����
	// [bgcolor|fgcolor|activation|isselected|isactive|hidden|fontsize|fontname|fontbold|fontcline|fontuline|fontitalic|type|displaytext]
 	return obj.GetCellInfo("type", col, index);
}

/* ��� ��ư Ŭ���� */
function add(obj, f)
{
	if (!f) f = document.forms[0];
	UEvent.showDetailByWise(obj, true);

	gsXaFlag = "A";
	clear(f);
	setMode(gsXaFlag, f);
}

/* ���� ��ư Ŭ���� */
function save(obj, f, bMag, sParam)
{
	if (!f) f = document.forms[0];
//	if (getValidation(f, true) == false) return;
	UEvent.showDetailByWise(obj, true);

	var sServiceID;
	if (gsXaFlag == "A") sServiceID = INSERT_ID;
	else sServiceID	= UPDATE_ID;

	var tran = new Trans();
	tran.setSvc(sServiceID);	
	if (sParam) tran.setUserParams(sParam);		
	tran.open(f.name,"f","/common.do");		
}

/*���� Ŭ����*/
function del(obj, f)
{
	if (!f) f = document.forms[0];
	if (confirm("�����Ͻðڽ��ϱ�?"))
	{
		UEvent.showDetailByWise(obj, true);
		var tran = new Trans();
		tran.setSvc(DELETE_ID);			
		tran.open(f.name,"f","/common.do");						
	}
}

/*��� Ŭ����*/
function cancel(obj, f)
{
	if (!f) f = document.forms[0];
	if (gsXaFlag == "U")	//upate->insert
		add(f.btnAdd,f);
	else 					//insert->update
	{
		var obj = document.all[SELECT_ID];
		showDetail_obj(obj.rows[CURROW], obj.rowSize);
	}
}

//��忡 ������ ��ư ����
//I:���,S:����,
function setMode(sType, f)
{
	if (!f) f = document.forms[0];
	if (getUserExecAuth() == true)
	{
		switch (sType)
		{
			case "I"://�ʱ�ȭ
				if (f.btnAdd)  UEvent.showDetailByWise(f.btnAdd, false);
				if (f.btnSave) UEvent.showDetailByWise(f.btnSave, true);
				if (f.btnDel)  UEvent.showDetailByWise(f.btnDel, true);
				break;
			case "A"://�߰�
				if (f.btnAdd)  UEvent.showDetailByWise(f.btnAdd, true);
				if (f.btnSave) UEvent.showDetailByWise(f.btnSave, false);
				if (f.btnDel)  UEvent.showDetailByWise(f.btnDel, true);
				break;
			case "U"://����
				if (f.btnAdd)  UEvent.showDetailByWise(f.btnAdd, true);
				if (f.btnSave) UEvent.showDetailByWise(f.btnSave, false);
				if (f.btnDel)  UEvent.showDetailByWise(f.btnDel, false);
				break;
			default:
				break;
		}
	}	
}

/**
  * �׸��忡 �ش� �÷� ���� ����Ȯ��
  * GridObj      : Ÿ�� �׸���
  * str          : ã�� �÷�
  * return       : �������� true/false
  */

function isGridColumn(GridObj,str)
{
	//var GridObj 	= document.getElementById(SELECT_ID);
	var colCount = GridObj.GetColCount();

	for (var i=0; i<colCount; i++)
	{
		if( GridObj.GetColHDKey(i) == str){return true;}
	}
	return false;
}

/**
  * �׸����� Ư�� �÷��� Ư������ �����ϴ� �� ����
  * GridObj    		: �ش�׸���
  * strColumnKey 	: Ÿ���÷�
  * str 			: �˻�Ű����
  * return          : �˻��� �� ���� (������  -1)
  */
function findGridRow(GridObj,strColumnKey,str)
{
//	var GridObj   = document.getElementById(SELECT_ID);
	var colFormat = GridObj.GetColType(strColumnKey);
	var rowCount  = GridObj.GetRowCount();
	var idx       = -1;
	var cellValue = "";

	for (var i=0; i<rowCount; i++)
	{
		if (colFormat == "t_combo")
		{
			idx = GridObj.GetComboSelectedIndex(strColumnKey, i);
			if(idx>-1){ cellValue = GridObj.GetComboHiddenValue(strColumnKey, idx); }
			else      { cellValue = ""; }
		}else{
			cellValue = GridObj.GetCellValue(strColumnKey,i);
		}

		if( cellValue == str){return i;}
	}
	return -1;
}

/**
 * obj : Grid ��ü
 * gridHt : grid�� ����� data���� Hashtable (key���� column�� value���� data Array�� �־��ش�.)
 */
function makeGridRawData(obj, gridHt)
{
	obj.RemoveAllData();
	obj.SetParam("WISEGRID_REQUESTURL", "");

	var strRawData = "";
	var data 	= "";
	var keyArr 	= gridHt.getNames();
	var size 	= keyArr.length;
	var valArr	= "";
	var type 	= "";
	var rowCount = 0;
		
	for (var i=0; i<size; i++)
	{
		valArr 	= gridHt.get(keyArr[i]);
		type 	= obj.GetColType(keyArr[i]);
		
		data += keyArr[i] + ",";
		
		if (type == "t_date")
		{
			data += "D=";
		}
		else if (type == "t_number")
		{
			data += "N=";
		}
		else if (type == "t_checkbox")
		{
			data += "C=";
		}
		else if (type == "t_combo")
		{
			var comboData  = "";
			var comboCount = obj.GetComboListCount(keyArr[i]);
			for (var j=0; j<comboCount; j++)
			{
				comboData += obj.GetComboText(keyArr[i], j) + ":" + obj.GetComboHiddenValue(keyArr[i], j) + ":";
			}
			
			data += "L=" + comboData + "~";
		}
		else
		{
			data += "T=";
		}
		
		rowCount = valArr.length;
		
		for (var j=0; j<rowCount; j++)
		{
			if (type == "t_combo")
			{
				//data += valArr[j] + "~";
				
				var comboIndex = "";
				var comboCount = obj.GetComboListCount(keyArr[i]);
				
				for (var k=0; k<comboCount; k++)
				{ 
					//
					if (obj.GetComboHiddenValue(keyArr[i], k) == valArr[j])
					{
						comboIndex += k;
					}
				}
				
				data += comboIndex + "~";
			}
			else
			{
				data += valArr[j] + "~~";
			}
		}
		
		data += "|";
	}
	    
	strRawData = "WISEGRID_DATA="
			   + "WISEGRID_DATATYPE,F=S|"
			   + "WISEGRID_ROWCOUNT,W="+rowCount+"|"
			   + data
			   + "WISEGRID_MESSAGE,M=|"
			   + "WISEGRID_STATUS,U=-1|"
			   + "WISEGRID_LICENSE,X=10.254.28.27,2|"
			   + "WISEGRID_NAVIGATE,V="+rowCount+",0|";
	
	/* for debug 
	strRawData 	= "WISEGRID_DATA="
				+ "WISEGRID_DATATYPE,F=S|"
				+ "WISEGRID_ROWCOUNT,W=2|"
				//+ "dd,D=20070101~~|"//"h,T=~~|w,T=~~|e,T=~~|s,T=~~|d1,T=~~|d2,T=~~|d3,T=~~|d4,T=~~|d5,T=~~|"
				+ "dd,D=20070101~~20070102~~|"
				+ "WISEGRID_MESSAGE,M=|"
				+ "WISEGRID_STATUS,U=-1|"
				+ "WISEGRID_LICENSE,X=10.254.28.27,2|"
				+ "WISEGRID_NAVIGATE,V=2,0|";
	*/
				
	return strRawData;
}

/**
 * DataSet��  makeGridRawData �Լ��� ���� gridHt�� ������ش�.
 * dsnm : DataSet Name
 */
function makeGridHashtable(dsnm)
{
	var gridHt 	 = new Hashtable();
	
	if (parseInt(DataSet.getTotalCount(dsnm),10) > 0)
	{
		var curpage  = DataSet.getCurPage(dsnm);
		var ht 		 = DataSet.getHashParam(dsnm, curpage, 0);
		var keyArr 	 = ht.getNames();
		var size 	 = keyArr.length;
		
		for (var i=0; i<size; i++)
		{
			gridHt.put(keyArr[i], DataSet.getParamArr(dsnm, curpage, keyArr[i]));
		}
	}
	
	return gridHt;
}
