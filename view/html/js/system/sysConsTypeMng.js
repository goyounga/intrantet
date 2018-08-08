var SELECT_CONSTYPE_ID = "UCSYS011S";
var SELECT_DUPCHECK_ID = "UCSYS012S";
var INSERT_CONSTYPE_ID = "UCSYS012I";
var UPDATE_CONSTYPE_ID = "UCSYS013U";
var DELETE_CONSTYPE_ID = "UCSYS014D";

var SELECT_CONSEXCEL_ID = "UCSYS015S";
var INSERT_CONSEXCEL_ID = "UCSYS015I";


var gsXaFlag;		//���
var g_rowIdx;		//���� row Index
var g_rowIdxExcel;	//�ϰ���� row Index
var dupChkFlag	= true;

var corp_cd;

//�ʱ⼳��
function init()
{		
	document.all(SELECT_CONSEXCEL_ID).bExcelImportAllColumn = true;
	queryList();
}

/********************
* ���������ȸ �̺�Ʈ
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
* ������ �̺�Ʈ
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
			
			//��з�
			if(step == "1")
				setMode("HU");
			//�ߺз�
			else if(step == "2")
				setMode("MU");
			//�Һз�
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
* ���Ŭ�� �̺�Ʈ
* �ϰ���� ����Ʈ ���Ľ� RowIndex���� �ʱ�ȭ
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
* ��ü����� ȣ��
*****************/
function getComCorp()
{
	queryList();
}
/*****************
* ��ü������ �����´�.
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
* ��з���� �̺�Ʈ
********************/
function hAdd()
{
	setMode("HA");
}

/********************
* �ߺз���� �̺�Ʈ
********************/
function mAdd()
{
	if(document.all(SELECT_CONSTYPE_ID).GetRowCount() < 1)
	{
		MessageBox("SYSNotReg", "E", "�ߺз�");
		return;
	}
	setMode("MA");
}

/********************
* �Һз���� �̺�Ʈ
********************/
function lAdd()
{
	var gridObj = document.all(SELECT_CONSTYPE_ID);
	var flag = false;
	if(gridObj.GetRowCount() < 1)
	{
		MessageBox("SYSNotReg", "E", "�Һз�");
		return;
	}
	
	setMode("LA");
}

/********************
* �ߺ�äũ �̺�Ʈ
********************/
function dubCheck()
{
	if(f.cnsl_tp_cd.value == "")
	{
		MessageBox("InputFail", "E", "������� �ڵ�");
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
* �ڵ庯���
********************/
function codeChange()
{
	dupChkFlag = false;
	f.btnDupChk.disabled = false;
}

/********************
* ���� �̺�Ʈ
********************/
function save()
{
	if(!dupChkFlag)
	{
		MessageBox("SYSDupFail", "E", "������� �ڵ�");
		return;
	}
	var cdLen;
	var queryID;
	var msg;
	cdLen = f.cnsl_tp_cd.value.length;
	
	//��з�
	if(f.step.value == "1")
	{
		if(cdLen != 4)
		{
			MessageBox("SYSCipher", "E", "������� ��з� �ڵ�� 4");
			f.cnsl_tp_cd.select();
			return;
		}
	}
	//�ߺз�
	else if(f.step.value == "2")
	{
		if(cdLen != 7)
		{
			MessageBox("SYSCipher", "E", "������� �ߺз� �ڵ�� 7");
			f.cnsl_tp_cd.select();
			return;
		}
	}
	//�Һз�
	else if(f.step.value == "3")
	{
		if(cdLen != 10)
		{
			MessageBox("SYSCipher", "E", "������� �ߺз� �Һз� �ڵ�� 10");
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
* ���� �̺�Ʈ
********************/
function del()
{
	var msg="";
	
	if(f.step.value == "1" || f.step.value == "2")
		msg = "��з��� �ߺз� ������ ������� ��ü�� �����˴ϴ�.\n\n";

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
* ����Ű ��ȸ
********************/
function checkEnterKey()
{
	if(isEnterKey())
	{
		queryList();
	}
}

/********************
* �����޴��� ����
********************/
function up_tp_nm()
{
	var cnslIDArr=DataSet.getParamArr(SELECT_CONSTYPE_ID, 1, "cnsl_tp_cd"); 		//�ڵ尪
	var cnslNMArr=DataSet.getParamArr(SELECT_CONSTYPE_ID, 1, "cnsl_tp_nm"); 		//�ڵ��
	
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
* Excel �ҷ�����
********************/
function excelImport()
{
	var GridObj = document.all(SELECT_CONSEXCEL_ID);
	//Dialog ���� ��ġ ��������
	GridObj.ExcelImport('', 'importselectcolumn','row', false, true);
	//Header�����θ� import
	//GridObj.ExcelImport('', 'importall','row', true, true);
	
	for(var i=0; i<GridObj.GetRowCount(); i++)
	{
		GridObj.SetCellHiddenValue("CRUD", i, "C");
		GridObj.SetCellValue("CRUD", i, "����");
	}
}

/********************
* ���߰� ��ư
********************/
function rowAdd()
{
	document.all(SELECT_CONSEXCEL_ID).AddRow();
}

/********************
* �ٻ��� ��ư
********************/
function rowDel()
{
	if(g_rowIdxExcel == null)
	{
		MessageBox("SelectFail3", "E", "������ ROW");
		return;
	}
	
	document.all(SELECT_CONSEXCEL_ID).DeleteRow(g_rowIdxExcel);
}

/********************
* ���� ��ư
********************/
function ExcelSave()
{
	
	var GridObj = document.all(SELECT_CONSEXCEL_ID);
	
	if(GridObj.GetRowCount() == "0")
	{
		MessageBox("NotChecked", "E", "�ϰ���� ����Ʈ��");
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
			//��������ڵ�
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
				MessageBox(msg, "E", (i+1)+"��° ROW�� "+GridObj.GetColHDText(GridObj.GetColHDKey(col)));
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
* �ݹ�
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
				MessageBox("Fail", "E", "��Ͽ�");
				
			break;
			
		case UPDATE_CONSTYPE_ID:
			if (DataSet.getParam(sid, 1, 0, "SUCCESS_COUNT") > 0)
			{
				MessageBox("Success", "I", "");
				queryList();
			}
			else
				MessageBox("Fail", "E", "������");
			break;
			
		case DELETE_CONSTYPE_ID:
			if (DataSet.getParam(sid, 1, 0, "SUCCESS_COUNT") > 0)
			{
				MessageBox("Success", "I", "");
				queryList();
			}
			else
				MessageBox("Fail", "E", "������");
				
			break;
		
		//�ߺ�äũ
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
				MessageBox("Fail", "E", "���뿡");
				
			break;	
		default:
			break;
	}
}

/********************
* ���º��� �̺�Ʈ
********************/
function setMode(sType)
{
	gsXaFlag = sType;
	
	switch(sType)
	{
		//��з� �������
		case "HU":
			//��ư ��庯��
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
			
		//�ߺз� �������
		case "MU":
			//��ư ��庯��
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
			
		//�Һз� �������
		case "LU":
			//��ư ��庯��
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
		
		//��з����
		case "HA":
			//��ư ��庯��
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
			
			//Elements �ʱ�ȭ
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
		
		//�ߺз����
		case "MA":
			//��ư ��庯��
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
			
			//Elements �ʱ�ȭ
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
		
		//�Һз����
		case "LA":
			//��ư ��庯��
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
			
			//Elements �ʱ�ȭ
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