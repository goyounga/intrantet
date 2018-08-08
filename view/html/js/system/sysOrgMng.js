/**
 * PROJ : Nexfron
 * NAME : sysOrgMng.js
 * DESC : 조직관리
 * Author : 연구개발팀 
 * VER  : 1.0
 * Copyright 2009 Nexfron All rights reserved
 * ============================================================================================
 * 								변		경		사		항
 * ============================================================================================
 * VERSION		DATE		AUTHOR		DESCRIPTION
 * ============================================================================================
 * 1.0		2010.08.19		연구개발팀		신규작성
 */

var ORG_SELECT_ID 	= "UCSYS201S";	//조회
var ORG_INSERT_ID 	= "UCSYS201I";		//저장
var ORG_UPDATE_ID	= "UCSYS201U";	//수정
var ORG_DELETE_ID 	= "UCSYS201D";	//삭제(update)
var UP_ORG_DELETE_ID 	= "UCSYS202D";	//상위코드삭제(update)

//var SELECT_DUPCHECK_ID = "UCSYS012S";		//상담유형 중복조회 SELECT
//var SELECT_ORGEXECL_ID = "UCSYS015S";		//일괄등록 그리드ID
//var INSERT_ORGEXECL_ID = "UCSYS015I";		//상담유형관리 일괄등록 INSERT

var gsXaFlag;		//모드
//var g_rowIdx;		//선택 row Index
//var g_rowIdxExcel;	//일괄등록 row Index
var dupChkFlag	= true;

var objGrid;
var aCol;
var gKey = "";

/**
*초기설정
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
*트리구조
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
*트리구조
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
*wiseGrid 트리 이벤트
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
*등록버튼
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

			if (objGrid.GetCellValue("etc_1", iRow)  == "1")			//중분류등록
			{
				f.up_org_id.value = objGrid.GetCellValue("org_id", iRow);
				f.up_org_nm.value = objGrid.GetCellValue("org_nm", iRow);
				f.etc_1.value = "2";
			}	
			else														//소분류등록
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
*하위코드 등록 버튼
**/
function addDownData()
{
	setMode(f,"A");
	var iRow = objGrid.GetRowIndexFromTreeKey(gKey);
	f.up_org_id.value = objGrid.GetCellValue("org_id", iRow);
	f.up_org_nm.value = objGrid.GetCellValue("org_nm", iRow);
	
	if (objGrid.GetCellValue("etc_1", iRow)  == "1")			//중분류등록
	{
		f.etc_1.value = "2";
	}	
	else														//소분류등록
	{	
		f.etc_1.value = "3";
	}	
}


/**
*저장버튼
**/
function saveData()
{
	if(getValidation(f,true)== false) return;
	var svc_id ;
	var sCallback;
	
	var tran = new Trans();
	
	if(gsXaFlag =="A")	//등록일 경우
	{
		if(!MessageBox("RegConfirm", "C", "새로"))	 return;
		svc_id = ORG_INSERT_ID;
		sCallback = "callbackInsert()";
		tran.setMyUserParams("mode", "A");
	}	
	if(gsXaFlag =="U")	//수정일 경우
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
*신규등록후 콜백
**/
function callbackInsert()
{
	if (DataSet.isError(ORG_INSERT_ID) == "true") return; 
	makeTree();
	setMode(f,"U");
}

/**
*수정후 콜백
**/
function callbackUpdate()
{
	if (DataSet.isError(ORG_UPDATE_ID) == "true") return; 
	makeTree();
}

/**
*삭제버튼
**/
function delData()
{
	if (gsXaFlag == "A")
	{
		MessageBox("NoDelete","I","등록 중인 ");
		return;
	}
	
	var iRow = objGrid.GetRowIndexFromTreeKey(gKey);
	f.org_id.value = objGrid.GetCellValue("org_id", iRow);
	f.up_org_id.value = objGrid.GetCellValue("up_org_id", iRow);
	
	if (confirm("삭제하시겠습니까?"))
	{
		if (objGrid.GetCellValue("etc_1", iRow)  == "1")			//중분류등록
		{
			var tran = new Trans();
			tran.setSvc(ORG_DELETE_ID+","+UP_ORG_DELETE_ID);
			tran.setCallBack("callbackDel()");
			tran.open("f","f","/common.do");
		}	
		else														//소분류등록
		{	
			var tran = new Trans();
			tran.setSvc(ORG_DELETE_ID);
			tran.setCallBack("callbackDel()");
			tran.open("f","f","/common.do");
		}	
	}
}
/**
*삭제후 콜백
**/
function callbackDel()
{
	if (DataSet.isError(ORG_DELETE_ID) == "true") return; 
	//if (objGrid.HasTreeParentNode(gKey)) gKey =objGrid.GetTreeParentNodeKey(gKey);

	makeTree();
	//setMode("I");
}

/**
*취소 버튼
**/
function canlData()
{
	var index = objGrid.GetActiveRowIndex();
	
	if (index == -1) return;
	treeClick(objGrid, objGrid.GetTreeKeyFromRowIndex (index), "");
	//showDetail(ORG_SELECT_ID, index, f);
}

/**
*키체크
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
*화면 모드 설정
**/
function setMode(f,sType)
{
	gsXaFlag = sType;

	switch (sType)
	{
		case "I":	//초기화면
			clear(f);
			winInit();
			setButton(f.btnUpAdd,true);
			setButton(f.btnDownAdd,true);
			setButton(f.btnSave,true);
			setButton(f.btnDel,true);
			break;
		case "A":	//등록
			clear(f);
			winInit();
			setButton(f.btnUpAdd,true);
			setButton(f.btnDownAdd,true);
			setButton(f.btnSave,false);
			setButton(f.btnDel,true);
			
			setDisabledObj(aCol, false);
			break;
		case "U":	//수정
			
			winInit();
			
			if (f.etc_1.value == "1")							//최상위
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