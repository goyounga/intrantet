var SELECT_CONSTYPE_ID = "UCSYS011S";
var SELECT_DUPCHECK_ID = "UCSYS012S";
var INSERT_CONSTYPE_ID = "UCSYS012I";
var UPDATE_CONSTYPE_ID = "UCSYS013U";
var DELETE_CONSTYPE_ID = "UCSYS014D";

var SELECT_CONSEXCEL_ID = "UCSYS015S";
var INSERT_CONSEXCEL_ID = "UCSYS015I";


var gsXaFlag;		//모드
var g_rowIdx;		//선택 row Index
var g_rowIdxExcel;	//일괄등록 row Index
var dupChkFlag	= true;

var corp_cd;

//초기설정
function init()
{		
	document.all(SELECT_CONSEXCEL_ID).bExcelImportAllColumn = true;
	queryList();
}

/********************
* 상담유형조회 이벤트
********************/
function queryList()
{
	getCorp();
	
	var trans = new Trans();
	trans.setPageRow(1000);
	trans.setSvc(SELECT_CONSTYPE_ID);
	trans.setDefClick(true);
	trans.setWiseGrid("1");
	trans.setForwardId("wgdsl","");
	trans.open("fQuery","f","/wisegrid.do");
}

/********************
* 상세정보 이벤트
********************/
function showDetailO_obj(id, strColumnKey, nRow)
{
	var gridObj = document.all(id);
	if(gridObj.GetRowCount() == "0")
		return;
	
	switch(id)
	{
		case SELECT_CONSTYPE_ID:
			g_rowIdx = nRow;
			
			var step;
			step = gridObj.GetCellValue("step", nRow);
			
			//대분류
			if(step == "1")
				setMode("HU");
			//중분류
			else if(step == "2")
				setMode("MU");
			//소분류
			else if(step == "3")
				setMode("LU");
			
			showDetailByWise(SELECT_CONSTYPE_ID, nRow, f);
			break;
		case SELECT_CONSEXCEL_ID:
			g_rowIdxExcel = nRow;
		break;
	}
}

/********************
* 헤더클릭 이벤트
* 일괄등록 리스트 정렬시 RowIndex값을 초기화
********************/
function showDetailH_obj(id, strColumnKey, nRow)
{
	var gridObj = document.all(id);
	if(gridObj.GetRowCount() == "0")
		return;
	
	switch(id)
	{
		case SELECT_CONSEXCEL_ID:
			g_rowIdxExcel = null;
		break;
	}
}

/*****************
* 업체변경시 호출
*****************/
function getComCorp()
{
	queryList();
}
/*****************
* 업체정보를 가져온다.
*****************/
function getCorp()
{
	var tmp = top.document.all("corp_cd_chng").value;
	
	if(tmp == corp_cd)
		return;
		
	corp_cd = tmp;
	
	fQuery.corp_cd.value = corp_cd;
}

/********************
* 대분류등록 이벤트
********************/
function hAdd()
{
	setMode("HA");
}

/********************
* 중분류등록 이벤트
********************/
function mAdd()
{
	if(document.all(SELECT_CONSTYPE_ID).GetRowCount() < 1)
	{
		MessageBox("SYSNotReg", "E", "중분류");
		return;
	}
	setMode("MA");
}

/********************
* 소분류등록 이벤트
********************/
function lAdd()
{
	var gridObj = document.all(SELECT_CONSTYPE_ID);
	var flag = false;
	if(gridObj.GetRowCount() < 1)
	{
		MessageBox("SYSNotReg", "E", "소분류");
		return;
	}
	
	setMode("LA");
}

/********************
* 중복채크 이벤트
********************/
function dubCheck()
{
	if(f.cnsl_tp_cd.value == "")
	{
		MessageBox("InputFail", "E", "상담유형 코드");
		return;
	}

	var params;
	params = "&corp_cd="+fQuery.corp_cd.value;
	
	var tran = new Trans();
	tran.setPageRow(1);
	tran.setSvc(SELECT_DUPCHECK_ID);
	tran.setUserParams(params);
	tran.open("f","f","/common.do");
}

/********************
* 코드변경시
********************/
function codeChange()
{
	dupChkFlag = false;
	f.btnDupChk.disabled = false;
}

/********************
* 저장 이벤트
********************/
function save()
{
	if(!dupChkFlag)
	{
		MessageBox("SYSDupFail", "E", "상담유형 코드");
		return;
	}
	var cdLen;
	var queryID;
	var msg;
	cdLen = f.cnsl_tp_cd.value.length;
	
	//대분류
	if(f.step.value == "1")
	{
		if(cdLen != 4)
		{
			MessageBox("SYSCipher", "E", "상담유형 대분류 코드는 4");
			f.cnsl_tp_cd.select();
			return;
		}
	}
	//중분류
	else if(f.step.value == "2")
	{
		if(cdLen != 7)
		{
			MessageBox("SYSCipher", "E", "상담유형 중분류 코드는 7");
			f.cnsl_tp_cd.select();
			return;
		}
	}
	//소분류
	else if(f.step.value == "3")
	{
		if(cdLen != 10)
		{
			MessageBox("SYSCipher", "E", "상담유형 중분류 소분류 코드는 10");
			f.cnsl_tp_cd.select();
			return;
		}
	}
	
	if(gsXaFlag == "HA" || gsXaFlag == "MA" || gsXaFlag == "LA")
	{
		queryID = INSERT_CONSTYPE_ID;
		msg		= "SavConfirm";
	}
	else if(gsXaFlag == "HU" || gsXaFlag == "MU" || gsXaFlag == "LU")
	{
		queryID = UPDATE_CONSTYPE_ID;
		msg		= "ChgConfirm";
	}
		
	if(!MessageBox(msg, "C", ""))
		return;
	
	var params;
	params = "&corp_cd="+fQuery.corp_cd.value;
	
	var trans = new Trans();
	trans.setSvc(queryID);
	trans.setUserParams(params);
	trans.open("f","f","/common.do");
}

/********************
* 삭제 이벤트
********************/
function del()
{
	var msg="";
	
	if(f.step.value == "1" || f.step.value == "2")
		msg = "대분류나 중분류 삭제시 하위노드 전체가 삭제됩니다.\n\n";

	if(!MessageBox("DelConfirm", "C", msg))
		return;
		
	var params;
	params = "&corp_cd="+fQuery.corp_cd.value;
	
	var trans = new Trans();
	trans.setSvc(DELETE_CONSTYPE_ID);
	trans.setUserParams(params);
	trans.open("f","f","/common.do");
}

/********************
* 엔터키 조회
********************/
function checkEnterKey()
{
	if(isEnterKey())
	{
		queryList();
	}
}

/********************
* 상위메뉴명 추출
********************/
function up_tp_nm()
{
	var cnslIDArr=DataSet.getParamArr(SELECT_CONSTYPE_ID, 1, "cnsl_tp_cd"); 		//코드값
	var cnslNMArr=DataSet.getParamArr(SELECT_CONSTYPE_ID, 1, "cnsl_tp_nm"); 		//코드명
	
	for(i=0; i<cnslIDArr.length; i++)
	{
		var len;
		
		if(f.step.value == 2)
			len = 4;
		else if(f.step.value == 3)
			len = 7;
			
		if(cnslIDArr[i].length != len || f.up_tp_cd.value != cnslIDArr[i])
			continue;
		else
		{
			f.up_tp_nm.value = cnslNMArr[i];
			break;
		}
	}
}

/********************
* Excel 불러오기
********************/
function excelImport()
{
	var GridObj = document.all(SELECT_CONSEXCEL_ID);
	//Dialog 에서 위치 조정가능
	GridObj.ExcelImport('', 'importselectcolumn','row', false, true);
	//Header순으로만 import
	//GridObj.ExcelImport('', 'importall','row', true, true);
	
	for(var i=0; i<GridObj.GetRowCount(); i++)
	{
		GridObj.SetCellHiddenValue("CRUD", i, "C");
		GridObj.SetCellValue("CRUD", i, "생성");
	}
}

/********************
* 줄추가 버튼
********************/
function rowAdd()
{
	document.all(SELECT_CONSEXCEL_ID).AddRow();
}

/********************
* 줄삭제 버튼
********************/
function rowDel()
{
	if(g_rowIdxExcel == null)
	{
		MessageBox("SelectFail3", "E", "제거할 ROW");
		return;
	}
	
	document.all(SELECT_CONSEXCEL_ID).DeleteRow(g_rowIdxExcel);
}

/********************
* 적용 버튼
********************/
function ExcelSave()
{
	
	var GridObj = document.all(SELECT_CONSEXCEL_ID);
	
	if(GridObj.GetRowCount() == "0")
	{
		MessageBox("NotChecked", "E", "일괄등록 리스트에");
		return;
	}
	var cnsl_tp_cd	= "";
	var cnsl_tp_nm	= "";
	var up_tp_cd	= "";
	var use_f		= "";
	var lup_ord		= "";

	for(var i=0; i<GridObj.GetRowCount(); i++)
	{
		for(var j=1; j<GridObj.GetColCount(); j++)
		{
			var tmp = GridObj.GetCellValue(GridObj.GetColHDKey(j), i);
			var flag = false;
			var msg = "Required";
			var col = j;
			//상담유형코드
			if(GridObj.GetColHDKey(j) == "cnsl_tp_cd1")
			{
				if(tmp == "")
					flag = true;
					
				if(cnsl_tp_cd)
					cnsl_tp_cd	+=	""+tmp;
				else
					cnsl_tp_cd	=	tmp;
			}
			else if(GridObj.GetColHDKey(j) == "cnsl_tp_nm1")
			{
				if(tmp == "")
					flag = true;
					
				if(cnsl_tp_nm)
					cnsl_tp_nm	+=	""+tmp;
				else
					cnsl_tp_nm	=	tmp;
			}
			else if(GridObj.GetColHDKey(j) == "up_tp_cd1")
			{
				if(tmp == "")
					flag = true;
					
				if(up_tp_cd)
					up_tp_cd	+=	""+tmp;
				else
					up_tp_cd	=	tmp;
			}
			else if(GridObj.GetColHDKey(j) == "use_f1")
			{
				if(tmp == "")
					flag = true;
				else if(tmp != "Y" && tmp != "N")
				{
					flag = true;
					msg = "Format";
				}
				
				if(use_f)
					use_f	+=	""+tmp;
				else
					use_f	=	tmp;
			}
			else if(GridObj.GetColHDKey(j) == "lup_ord1")
			{
				if(tmp == "")
					flag = true;
				else if(isNaN(tmp))
				{
					flag = true;
					msg = "IsNum";
				}
				
				if(lup_ord)
					lup_ord	+=	""+tmp;
				else
					lup_ord	=	tmp;
			}
			
			if(flag)
			{
				MessageBox(msg, "E", (i+1)+"번째 ROW의 "+GridObj.GetColHDText(GridObj.GetColHDKey(col)));
				GridObj.MoveRow(i);
				return;
			}
		}
	}
	
	if(!MessageBox("aplConfirm", "C", ""))
		return;
	
	var params;
	params  = "&a_cnsl_tp_cd="+cnsl_tp_cd;
	params  += "&a_cnsl_tp_nm="+cnsl_tp_nm;
	params  += "&a_up_tp_cd="+up_tp_cd;
	params  += "&a_use_f="+use_f;
	params  += "&a_lup_ord="+lup_ord;
	params	+= "&corp_cd="+fQuery.corp_cd.value;
	
	var trans = new Trans();
	trans.setSvc(INSERT_CONSEXCEL_ID);
	trans.setUserParams(params);
	trans.open("f","f","/common.do");
}

/********************
* 콜백
********************/
function callback(sid)
{
	switch(sid)
	{
		case SELECT_CONSTYPE_ID:
			//document.all(SELECT_CONSTYPE_ID).SetGroupMerge("lrg_nm,mdm_nm");
			break;
		case INSERT_CONSTYPE_ID:
			if (DataSet.getParam(sid, 1, 0, "SUCCESS_COUNT") > 0)
			{
				MessageBox("Success", "I", "");
				queryList();
			}
			else
				MessageBox("Fail", "E", "등록에");
				
			break;
			
		case UPDATE_CONSTYPE_ID:
			if (DataSet.getParam(sid, 1, 0, "SUCCESS_COUNT") > 0)
			{
				MessageBox("Success", "I", "");
				queryList();
			}
			else
				MessageBox("Fail", "E", "수정에");
			break;
			
		case DELETE_CONSTYPE_ID:
			if (DataSet.getParam(sid, 1, 0, "SUCCESS_COUNT") > 0)
			{
				MessageBox("Success", "I", "");
				queryList();
			}
			else
				MessageBox("Fail", "E", "삭제에");
				
			break;
		
		//중복채크
		case SELECT_DUPCHECK_ID:
			if(DataSet.getParam(SELECT_DUPCHECK_ID, 1, 0, "cnt") == 0)
			{
				MessageBox("SYSNotUseCode", "I", "");
				dupChkFlag = true;
				//setButton(f.btnCdDupChk, true);
				f.btnDupChk.disabled = true;
			}
			else
			{
				dupChkFlag = false;
				MessageBox("SYSUseCode", "I", "");
			}
			break;
		case INSERT_CONSEXCEL_ID:
			if (DataSet.getParam(sid, 1, 0, "SUCCESS_COUNT") > 0)
			{
				MessageBox("Success", "I", "");
				wgclear(sid);
				queryList();
			}
			else
				MessageBox("Fail", "E", "적용에");
				
			break;	
		default:
			break;
	}
}

/********************
* 상태변경 이벤트
********************/
function setMode(sType)
{
	gsXaFlag = sType;
	
	switch(sType)
	{
		//대분류 수정모드
		case "HU":
			//버튼 모드변경
//			setButton(f.btnHAdd,	false);
//			setButton(f.btnMAdd,	false);
//			setButton(f.btnLAdd,	true);
//			setButton(f.btnSave,	false);
//			setButton(f.btnDel,		false);
//			setButton(f.btnDupChk,	true);

			f.btnHAdd.disabled			= false;
			f.btnMAdd.disabled			= false;
			f.btnLAdd.disabled			= true;	
			f.btnSave.disabled			= false;	
			f.btnDel.disabled				= false;	
			f.btnDupChk.disabled		= true;


			break;
			
		//중분류 수정모드
		case "MU":
			//버튼 모드변경
//			setButton(f.btnHAdd,	false);
//			setButton(f.btnMAdd,	false);
//			setButton(f.btnLAdd,	false);
//			setButton(f.btnSave,	false);
//			setButton(f.btnDel,		false);
//			setButton(f.btnDupChk,	true);

			f.btnHAdd.disabled			= false;
			f.btnMAdd.disabled			= false;
			f.btnLAdd.disabled			= false;	
			f.btnSave.disabled			= false;	
			f.btnDel.disabled				= false;	
			f.btnDupChk.disabled		= true;
			break;
			
		//소분류 수정모드
		case "LU":
			//버튼 모드변경
//			setButton(f.btnHAdd,	false);
//			setButton(f.btnMAdd,	false);
//			setButton(f.btnLAdd,	false);
//			setButton(f.btnSave,	false);
//			setButton(f.btnDel,		false);
//			setButton(f.btnDupChk,	true);

			f.btnHAdd.disabled			= false;
			f.btnMAdd.disabled			= false;
			f.btnLAdd.disabled			= false;	
			f.btnSave.disabled			= false;	
			f.btnDel.disabled				= false;	
			f.btnDupChk.disabled		= true;
			break;
		
		//대분류등록
		case "HA":
			//버튼 모드변경
//			setButton(f.btnHAdd,	true);
//			setButton(f.btnMAdd,	true);
//			setButton(f.btnLAdd,	true);
//			setButton(f.btnSave,	false);
//			setButton(f.btnDel,		true);
//			setButton(f.btnDupChk,	false);

			f.btnHAdd.disabled			= true;
			f.btnMAdd.disabled			= true;
			f.btnLAdd.disabled			= true;	
			f.btnSave.disabled			= false;	
			f.btnDel.disabled				= true;	
			f.btnDupChk.disabled		= false;
			
			//Elements 초기화
			f.step.value		= "1";
			f.up_tp_cd.value	= "ROOT";
			f.up_tp_nm.value	= "";
			f.cnsl_tp_cd.value	= "";
			f.cnsl_tp_nm.value	= "";
			f.use_f.value		= "Y";
			f.lup_ord.value		= "";
			f.rg_nm.value		= "";
			f.rg_dt.value		= "";
			f.rg_tm.value		= "";
			f.mdf_nm.value		= "";
			f.mdf_dt.value		= "";
			f.mdf_tm.value		= "";
			break;
		
		//중분류등록
		case "MA":
			//버튼 모드변경
//			setButton(f.btnHAdd,	true);
//			setButton(f.btnMAdd,	true);
//			setButton(f.btnLAdd,	true);
//			setButton(f.btnSave,	false);
//			setButton(f.btnDel,		true);
//			setButton(f.btnDupChk,	false);

			f.btnHAdd.disabled			= true;
			f.btnMAdd.disabled			= true;
			f.btnLAdd.disabled			= true;	
			f.btnSave.disabled			= false;	
			f.btnDel.disabled				= true;	
			f.btnDupChk.disabled		= false;
			
			//Elements 초기화
			f.step.value		= "2";
			f.up_tp_cd.value	= f.cnsl_tp_cd.value.substr(0,4);
			f.up_tp_nm.value	= "";
			f.cnsl_tp_cd.value	= f.cnsl_tp_cd.value.substr(0,4);
			f.cnsl_tp_nm.value	= "";
			f.use_f.value		= "Y";
			f.lup_ord.value		= "";
			f.rg_nm.value		= "";
			f.rg_dt.value		= "";
			f.rg_tm.value		= "";
			f.mdf_nm.value		= "";
			f.mdf_dt.value		= "";
			f.mdf_tm.value		= "";
			up_tp_nm();
			break;
		
		//소분류등록
		case "LA":
			//버튼 모드변경
//			setButton(f.btnHAdd,	true);
//			setButton(f.btnMAdd,	true);
//			setButton(f.btnLAdd,	true);
//			setButton(f.btnSave,	false);
//			setButton(f.btnDel,		true);
//			setButton(f.btnDupChk,	false);

			f.btnHAdd.disabled			= true;
			f.btnMAdd.disabled			= true;
			f.btnLAdd.disabled			= true;	
			f.btnSave.disabled			= false;	
			f.btnDel.disabled				= true;	
			f.btnDupChk.disabled		= false;
			
			//Elements 초기화
			f.step.value		= "3";
			f.up_tp_cd.value	= f.cnsl_tp_cd.value.substr(0,7);
			f.up_tp_nm.value	= "";
			f.cnsl_tp_cd.value	= f.cnsl_tp_cd.value.substr(0,7);;
			f.cnsl_tp_nm.value	= "";
			f.use_f.value		= "Y";
			f.lup_ord.value		= "";
			f.rg_nm.value		= "";
			f.rg_dt.value		= "";
			f.rg_tm.value		= "";
			f.mdf_nm.value		= "";
			f.mdf_dt.value		= "";
			f.mdf_tm.value		= "";
			up_tp_nm();
			break;
			
		default:
			break;
	}
}