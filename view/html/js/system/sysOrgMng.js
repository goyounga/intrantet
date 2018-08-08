/**
 * PROJ : Nexfron
 * NAME : sysOrgMng.js
 * DESC : ��������
 * Author : ���������� 
 * VER  : 1.0
 * Copyright 2009 Nexfron All rights reserved
 * ============================================================================================
 * 								��		��		��		��
 * ============================================================================================
 * VERSION		DATE		AUTHOR		DESCRIPTION
 * ============================================================================================
 * 1.0		2010.08.19		����������		�ű��ۼ�
 */

var ORG_SELECT_ID 	= "UCSYS201S";	//��ȸ
var ORG_INSERT_ID 	= "UCSYS201I";		//����
var ORG_UPDATE_ID	= "UCSYS201U";	//����
var ORG_DELETE_ID 	= "UCSYS201D";	//����(update)
var UP_ORG_DELETE_ID 	= "UCSYS202D";	//�����ڵ����(update)

//var SELECT_DUPCHECK_ID = "UCSYS012S";		//������� �ߺ���ȸ SELECT
//var SELECT_ORGEXECL_ID = "UCSYS015S";		//�ϰ���� �׸���ID
//var INSERT_ORGEXECL_ID = "UCSYS015I";		//����������� �ϰ���� INSERT

var gsXaFlag;		//���
//var g_rowIdx;		//���� row Index
//var g_rowIdxExcel;	//�ϰ���� row Index
var dupChkFlag	= true;

var objGrid;
var aCol;
var gKey = "";

/**
*�ʱ⼳��
**/
function init()
{

	objGrid = document.all(ORG_SELECT_ID);
	aCol = new Array(f.org_cd, f.org_nm, f.use_yn, f.ord);
	
	setMode(f,"I");
	addUpData();
//	makeTree();
	query();
}

/**
*Ʈ������
**/
function query()
{
	var sKey="";
	var sVal="";
	if (fQuery.org_cd.value != "")
	{
			sKey ="org_cd";
			sVal = fQuery.org_cd.value;
	}
	else
	{
			sKey ="org_nm";
			sVal = fQuery.org_nm.value;
	}	

	//setMode(f,"I");
	
	makeTree();
	

}

/**
*Ʈ������
**/
function makeTree()
{
	var trans = new Trans();
	trans.setPageRow(999);
	trans.setSvc(ORG_SELECT_ID);
	trans.setWiseGrid("1");
	trans.setCallBack("callbackMakeTree");
//	trans.setDefClick(true);
	trans.setForwardId("wgdsl","");
	trans.open("fQuery","f","/wisegrid.do");
}

function callbackMakeTree()
{
	if(objGrid.GetRowCount()<1) return;

	var check = "false";
	for (var i=0; i < objGrid.GetRowCount(); i ++)
	{
		if (objGrid.GetCellValue("org_id", i) ==gKey )
		{
			check=="true";
			break;
		}
	}
	if(check=="false") gKey = objGrid.GetTreeFirstNodeKey();
	
	treeClick(ORG_SELECT_ID, gKey, "");
}


/**
*wiseGrid Ʈ�� �̺�Ʈ
**/
function treeClick(obj, strTreeKey, strArea)
{
	gKey =strTreeKey;
	showDetailByWise(ORG_SELECT_ID, objGrid.GetRowIndexFromTreeKey(strTreeKey), f);	

	objGrid.MoveRow(objGrid.GetRowIndexFromTreeKey(strTreeKey));
	//objGrid.SetRowBgColor(objGrid.GetRowIndexFromTreeKey(strTreeKey), objGrid.strActiveRowBgColor );
	
	if (objGrid.HasTreeParentNode(strTreeKey))
	{
		f.up_org_id.value = objGrid.GetTreeParentNodeKey(strTreeKey);
		f.up_org_nm.value = objGrid.GetCellValue("org_nm",objGrid.GetRowIndexFromTreeKey(objGrid.GetTreeParentNodeKey(strTreeKey)));
		setMode(f,"U");
	}
	else
	{
		f.up_org_id.value = "";
		f.up_org_nm.value = "";
		setMode(f,"U");
	}
}

/**
*��Ϲ�ư
**/
function addUpData()
{
	var upcd = f.up_org_id.value;
	var upnm = f.up_org_nm.value;
	
	setMode(f,"A");
	
	if (gKey == "")
	{
		f.up_org_id.value = "";
		f.up_org_nm.value = "";
		f.etc_1.value = "1";
	}
	else
	{
		if (objGrid.HasTreeParentNode(gKey))
		{
			var iRow = objGrid.GetRowIndexFromTreeKey(objGrid.GetTreeParentNodeKey(gKey));

			if (objGrid.GetCellValue("etc_1", iRow)  == "1")			//�ߺз����
			{
				f.up_org_id.value = objGrid.GetCellValue("org_id", iRow);
				f.up_org_nm.value = objGrid.GetCellValue("org_nm", iRow);
				f.etc_1.value = "2";
			}	
			else														//�Һз����
			{					
				f.up_org_id.value = objGrid.GetCellValue("org_id", iRow);
				f.up_org_nm.value = objGrid.GetCellValue("org_nm", iRow);
				f.etc_1.value = "3";
			}	
		}
		else
		{	
				f.up_org_id.value = "";
				f.up_org_nm.value = "";
				f.etc_1.value = "1";
		}	
	}
}

/**
*�����ڵ� ��� ��ư
**/
function addDownData()
{
	setMode(f,"A");
	var iRow = objGrid.GetRowIndexFromTreeKey(gKey);
	f.up_org_id.value = objGrid.GetCellValue("org_id", iRow);
	f.up_org_nm.value = objGrid.GetCellValue("org_nm", iRow);
	
	if (objGrid.GetCellValue("etc_1", iRow)  == "1")			//�ߺз����
	{
		f.etc_1.value = "2";
	}	
	else														//�Һз����
	{	
		f.etc_1.value = "3";
	}	
}


/**
*�����ư
**/
function saveData()
{
	if(getValidation(f,true)== false) return;
	var svc_id ;
	var sCallback;
	
	var tran = new Trans();
	
	if(gsXaFlag =="A")	//����� ���
	{
		if(!MessageBox("RegConfirm", "C", "����"))	 return;
		svc_id = ORG_INSERT_ID;
		sCallback = "callbackInsert()";
		tran.setMyUserParams("mode", "A");
	}	
	if(gsXaFlag =="U")	//������ ���
	{
		if(!MessageBox("ChgConfirm", "C", ""))		return;
		svc_id = ORG_UPDATE_ID;
		sCallback = "callbackUpdate()";
		tran.setMyUserParams("mode", "U");
	}
	
	tran.setSvc(svc_id);
	tran.setCallBack(sCallback);
	tran.open("f", "f","/common.do");

}
/**
*�űԵ���� �ݹ�
**/
function callbackInsert()
{
	if (DataSet.isError(ORG_INSERT_ID) == "true") return; 
	makeTree();
	setMode(f,"U");
}

/**
*������ �ݹ�
**/
function callbackUpdate()
{
	if (DataSet.isError(ORG_UPDATE_ID) == "true") return; 
	makeTree();
}

/**
*������ư
**/
function delData()
{
	if (gsXaFlag == "A")
	{
		MessageBox("NoDelete","I","��� ���� ");
		return;
	}
	
	var iRow = objGrid.GetRowIndexFromTreeKey(gKey);
	f.org_id.value = objGrid.GetCellValue("org_id", iRow);
	f.up_org_id.value = objGrid.GetCellValue("up_org_id", iRow);
	
	if (confirm("�����Ͻðڽ��ϱ�?"))
	{
		if (objGrid.GetCellValue("etc_1", iRow)  == "1")			//�ߺз����
		{
			var tran = new Trans();
			tran.setSvc(ORG_DELETE_ID+","+UP_ORG_DELETE_ID);
			tran.setCallBack("callbackDel()");
			tran.open("f","f","/common.do");
		}	
		else														//�Һз����
		{	
			var tran = new Trans();
			tran.setSvc(ORG_DELETE_ID);
			tran.setCallBack("callbackDel()");
			tran.open("f","f","/common.do");
		}	
	}
}
/**
*������ �ݹ�
**/
function callbackDel()
{
	if (DataSet.isError(ORG_DELETE_ID) == "true") return; 
	//if (objGrid.HasTreeParentNode(gKey)) gKey =objGrid.GetTreeParentNodeKey(gKey);

	makeTree();
	//setMode("I");
}

/**
*��� ��ư
**/
function canlData()
{
	var index = objGrid.GetActiveRowIndex();
	
	if (index == -1) return;
	treeClick(objGrid, objGrid.GetTreeKeyFromRowIndex (index), "");
	//showDetail(ORG_SELECT_ID, index, f);
}

/**
*Űüũ
**/
function checkKeyPress()
{
	if(isEnterKey())
	{
		query();
	}
}

function prevView(sData)
{
	var wWin = window.open("/jsp/knowledge/kmsReqErrP.jsp?know_type_cd=CASE&know_seq=11452&reg_user_id=skyu","","width=500 height=600 scrollbar=yes");
	//wWin.document.write(sData);
}

/**
*ȭ�� ��� ����
**/
function setMode(f,sType)
{
	gsXaFlag = sType;

	switch (sType)
	{
		case "I":	//�ʱ�ȭ��
			clear(f);
			winInit();
			setButton(f.btnUpAdd,true);
			setButton(f.btnDownAdd,true);
			setButton(f.btnSave,true);
			setButton(f.btnDel,true);
			break;
		case "A":	//���
			clear(f);
			winInit();
			setButton(f.btnUpAdd,true);
			setButton(f.btnDownAdd,true);
			setButton(f.btnSave,false);
			setButton(f.btnDel,true);
			
			setDisabledObj(aCol, false);
			break;
		case "U":	//����
			
			winInit();
			
			if (f.etc_1.value == "1")							//�ֻ���
			{
				setButton(f.btnUpAdd,false);
				setButton(f.btnDownAdd,false);
			}	
			else if (f.etc_1.value == "2")
			{	
				setButton(f.btnUpAdd,false);
				setButton(f.btnDownAdd,false);
			}	
			else
			{	
				setButton(f.btnUpAdd,false);
				setButton(f.btnDownAdd,false);
				//setButton(f.btnDownAdd,true);
			}
			setButton(f.btnSave,false);
			setButton(f.btnDel,false);
			
			setDisabledObj(aCol, false);
			break;
		default:		
			clear(f);
			winInit();
			setButton(f.btnUpAdd,false);
			setButton(f.btnDownAdd,false);
			setDisabledObj(aCol, true);
			break;
	}

}


function wgclear(obj)
{
	obj.RemoveAllData();
}