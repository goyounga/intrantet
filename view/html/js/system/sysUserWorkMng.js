/**
 * PROJECT : INTRANET
 * NAME    : sysUserWorkMng.js
 * DESC    : 근무관리
 * AUTHOR  : 박준규 과장
 * VERSION : 1.0
 * Copyright ⓒ 2010 Nexfron. All rights reserved.
 * ============================================================================================
 * 							변		경		사		항
 * ============================================================================================
 * VERSION	   DATE		  	AUTHOR		DESCRIPTION
 * ============================================================================================
 * 1.0		2010.09.12		박준규		개발
 */

var SELECT_ID_ORG 	= "UCSYS091S";	//사용자조직도
var SELECT_ID     	= "UCSYS092S";	//사용자목록
var UPDATE_ID_WORK	= "UCDAS071U";	//본사인력현황
var aForms1        	= null; 		//근무일정-폼객체들1
var aForms2        	= null; 		//근무일정-폼객체들2
var oGrid     	  	= "";           //유지보수리스트
var gsCurrow      	= -1;			//선택로우
var gsCurGrid     	= "";			//선택그리드
var gsCurKey     	= "";			//선택된고유키, 그리드상의 고유식별키이다.
var gsQueryFrom		= "";			//최종적으로 조회한 루트
var gsQueryVal		= "";			//최종적으로 조회한 값
var gsXaFlag      	= "";			//화면상태
var aButton       	= null;			//버튼배열
var aBtnMode      	=				//버튼모드
[
	//저장	, 저장muti, 조회	//버튼 / 상태
	[ true  , true  , false	] ,	// I   : 초기화
	[ false , true  , false	] ,	// A   : 등록-사용안함
	[ false , false , false	] ,	// U   : 수정
	[ true  , true  , true 	]	// X   : 블로킹
];
/**
 *초기화
 */
function init()
{
	//버튼초기화
	aButton = [ f.btnSave, f.btnSaveMulti, fQuery.btnSearch ];

	//폼객체초기화
	aForms1 = [ f.in_offc_stat[0] , f.in_offc_stat[1] ];
	aForms2 = [ f.rtn_scdl   , f.work_scdl, f.work_rmk ];

	//그리드초기화
	oGrid = document.getElementById(SELECT_ID);
	oGrid.SetColCellFontBold("user_nm","true");

	//화면초기화
	setReset();

	//초기조회
	//query();
	queryOrgTree();
}
/**
 * 화면초기화
 */
function setReset()
{
	gsCurrow  = -1;
	gsCurGrid = "";
	gsCurKey  = "";
	setMode("I",f);
	f.work_type_cd[0].checked = false;
	f.work_type_cd[1].checked = false;
	f.work_type_cd[2].checked = false;
	setOfficeWork( "INIT" );
	clear(f);//selectbox, input-text, textarea
	f.user_id.value = "";//hidden
}
/**
 * 버튼컨트롤
 * sType:버튼모드
 */
function setMode(sType)
{
	gsXaFlag = sType;
	var mode = -1;
	switch (sType)
	{
		case "I" :	mode = 0;	break;
		case "A" :	mode = 1;	break;
		case "U" :	mode = 2;	break;
		case "X" :	mode = 3;	break;
		default  : 	break;
	}
	for( var i=0; i<aButton.length; i++ )
	{
		setButton( aButton[i], aBtnMode[mode][i]);
	}
}
/**
 * 조직도 조회
 */
function queryOrgTree()
{
	var tran = new Trans();
	tran.setPageRow(-1);
	tran.setSvc(SELECT_ID_ORG);
	tran.setDefClick("true");		//하지만 treeClick 아니고 showDetailO_obj를 호출한다.
	tran.setWiseGrid("1");
	tran.setForwardId("wgdsl","");
	tran.setCallBack("callbackQueryOrgTree");
	setMode("X", f);
	tran.open("fQuery","f","/wisegrid.do");
}
/**
 * 조직도 조회콜백
 * svcid  : 서비스ID
 */
function callbackQueryOrgTree(sSvcId)
{
	setMode("I", f);
	query();
}
/**
 * 트리 클릭
 * id           : 클릭한 그리드객체ID
 * strTreeKey   : 해당 로우의 key값 NodeKey
 * strArea      : 클릭한 영역(text, image, back)
 */
function treeClick(id, strTreeKey, strArea)
{
	if( id == SELECT_ID_ORG)
	{
		if(strTreeKey == "ROOT")
		{
			query("TREE","");
		}else{
			query("TREE",strTreeKey);
		}
	}
}
/**
 * 조회
 */
function query(aFrom, val)
{
	if(aFrom!="TREE")
	{
		if ( getValidation(fQuery, true) == false ) {return;}
	}
	var sFromForm = "";
	var tran = new Trans();
	tran.setPageRow("9999");
	tran.setSvc(SELECT_ID);
	tran.setDefClick("true");
	tran.setWiseGrid("1");
	tran.setForwardId("wgdsl","");
	tran.setCallBack("callbackQuery");
	if(aFrom=="TREE")
	{
		tran.setUserParams("org_cd="+val);
		sFromForm   = "";
		gsQueryFrom	= "TREE";
		gsQueryVal	= val;
	}else{
		sFromForm   = "fQuery";
		gsQueryFrom	= "";
		gsQueryVal	= "";
	}
	tran.open(sFromForm,"f","/wisegrid.do");
}
/**
 * 조회콜백
 * svcid  : 서비스ID
 */
function callbackQuery(sSvcId)
{
	if ( parseInt( oGrid.GetRowCount()) < 1 ){setReset();}
}
/**
 * 목록클릭
 * id           : 클릭한 그리드객체ID
 * strColumnKey : 클릭한 컬럼명
 * nRow         : 클릭한Row Index
 */
function showDetailO_obj(id, strColumnKey, nRow)
{
	if(id==SELECT_ID)
	{
	 	gsCurrow  = nRow;
	 	gsCurGrid = id;
	 	gsCurKey  = oGrid.GetCellValue("user_id", nRow);
		setMode("U",f);

		showDetailByWise(id, nRow, f);

		setDisabledObj(aForms1, true);
		setDisabledObj(aForms2, true);

		if( getArrayData(f.work_type_cd, "value")=="01" )
		{
			setDisabledObj(aForms1, false);

			if( getArrayData(f.in_offc_stat, "value")=="02" )
			{
				setDisabledObj(aForms2, false);
			}
		}
	}
}
/**
 * 근무유형 체크박스 선택
 */
function work_type_cd_onClick(obj)
{
	if(obj.checked)
	{
		for(var i=0; i<f.work_type_cd.length; i++)
		{
			if(f.work_type_cd[i]!=obj)
			{
				f.work_type_cd[i].checked = false;
			}
		}
	}
	else
	{
		obj.checked = true;
	}

	setOfficeWork( obj.value );
}
/**
 * 근무설정화면 컨트롤
 */
function setOfficeWork( val )
{
	if(val=="01")
	{
		if(aForms1[0].disabled == true)
		{
			setDisabledObj(aForms1, false);
			aForms1[0].checked = true;
		}
	}
	else
	{
		setDisabledObj(aForms1, true);
		setDisabledObj(aForms2, true);

		for(var i=0; i<aForms1.length; i++)
		{
			aForms1[i].checked = false;
		}
		for(var j=0; j<aForms2.length; j++)
		{
			aForms2[j].value = "";
		}
	}
}
/**
 * 재실여부 라디오 선택
 */
function in_offc_stat_onClick( val )
{
	if(val=="01")
	{
		setDisabledObj(aForms2, true);
		for(var j=0; j<aForms2.length; j++)
		{
			aForms2[j].value = "";
		}
	}
	else
	{
		setDisabledObj(aForms2, false);
	}
}
/**
 * 근무설정 저장
 */
function saveWork()
{
	var bFlg = false;
	for(var i=0; i<f.work_type_cd.length; i++)
	{
		if(f.work_type_cd[i].checked == true)
		{
			bFlg = true;
			break;
		}
	}

	if(!bFlg)
	{
		MessageBox("", "I","근무유형을 선택해주세요.");
		return;
	}

	if(f.work_type_cd[0].checked == true)
	{
		var bFlg2 = false;
		for(var i=0; i<aForms1.length; i++)
		{
			if(aForms1[i].checked == true)
			{
				bFlg2 = true;
				break;
			}
		}
		if(!bFlg2)
		{
			MessageBox("", "I","재실여부를 선택해주세요.");
			return;
		}
	}

	if ( !MessageBox("SavConfirm", "C", "") ) {return;}

	var tran = new Trans();
	tran.setSvc(UPDATE_ID_WORK);
	tran.setUserParams("mdf_id="+f.userid.value);
	tran.setCallBack("callbacksaveWork");
	tran.open("f","f","/common.do");
}
/**
 * 근무설정 저장 후 콜백
 */
function callbacksaveWork(sSvcId)
{
	if (parseInt(DataSet.getParam(sSvcId, 1, 0, "SUCCESS_COUNT"),10) > 0)
	{
		gsCurrow = findGridRow(oGrid, "user_id", gsCurKey);
		updateWiseGridRow(gsCurGrid, gsCurrow, f);
		setMode("U", f);
	}
}
/**
 * 근무설정 일괄저장
 */
function saveWorkMulti()
{
	var batchData = new Array();
	var sParam 	  = "";
	var index 	  = 0;
	var nRowCount = oGrid.GetRowCount();

	for( var i=0; i<nRowCount; i++ )
	{
		if( oGrid.GetCellHiddenValue("CRUD", i)=="U" )
		{
			batchData[index]  = "&work_type_cd="	+ GetGridComboValue(oGrid, "work_type_cd", i );
			batchData[index] += "&in_offc_stat="	+ GetGridComboValue(oGrid, "in_offc_stat", i );
			batchData[index] += "&work_scdl="		+ oGrid.GetCellValue( "work_scdl"	  	 , i );
			batchData[index] += "&rtn_scdl="		+ oGrid.GetCellValue( "rtn_scdl"	  	 , i );
			batchData[index] += "&work_rmk="		+ oGrid.GetCellValue( "work_rmk"	  	 , i );
			batchData[index] += "&user_id="			+ oGrid.GetCellValue( "user_id"	         , i );
			batchData[index] += "&mdf_id="			+ f.userid.value;
			sParam += batchData[index];
			index++;
		}
	}

	if(index<1){MessageBox("", "I", "수정된 항목이 없습니다.");return;}
	if( !MessageBox("SavConfirm", "C", "") ){return;}

	var tran = new Trans();
	tran.setUserParams(sParam);
	tran.setSvc(UPDATE_ID_WORK);
	tran.setCallBack("callbackSaveWorkMulti");
	setMode("X", f);
	tran.open("","f","/common.do");
}
/**
 * 수정후콜백
 * svcid  : 서비스ID
 */
function callbackSaveWorkMulti(sSvcId)
{
	if (parseInt(DataSet.getParam(sSvcId, 1, 0, "SUCCESS_COUNT"),10) > 0)
	{
		setMode("U", f);
		query(gsQueryFrom,gsQueryVal);
	}
}