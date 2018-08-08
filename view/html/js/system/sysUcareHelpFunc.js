var SELECT_CTGRINFO_ID	= "UCSYS301S";	//ī�װ� ��ȸ(���������)
var SELECT_FUNC_ID		= "UCSYS302S";		//Function ��ȸ
var INSERT_FUNC_ID		= "UCSYS301I";		//Function �߰�
var UPDATE_FUNC_ID		= "UCSYS301U";		//Function ����
var DELETE_FUNC_ID		= "UCSYS301D";		//Function ����

var g_Flag;			//�����÷���
var g_Func_idx;	//Function ����Ʈ index
var update_flag = false;

/********************
* �ݹ�
********************/
function callback(sServiceID)
{
	switch (sServiceID)
	{
		case SELECT_CTGRINFO_ID:
			var curpage =(DataSet.getDsAttribute(sServiceID, "curpage"));
			var cd = new Array();
			var nm = new Array();

			for(var i = 0 ; i < DataSet.getTotalCount(sServiceID) ; i++){
				cd[i] = DataSet.getParam(sServiceID, curpage, i, "help_ctgr_seq");
				nm[i] = DataSet.getParam(sServiceID, curpage, i, "ctgr_nm");
			}

			setOptions(fQuery.help_ctgr_seq, cd, nm, false, true);
			setOptions(f.help_ctgr_seq, cd, nm, false, true);
		break;
		
		case INSERT_FUNC_ID :
			if (DataSet.getParam(sServiceID, 1, 0, "SUCCESS_COUNT") > 0)
			{
				MessageBox("InfSuccess", "I", "");
				queryList();
			}
			else
			{
				MessageBox("InfFail", "E", "Function(INSERT)");
			}

			break;
		
		case UPDATE_FUNC_ID :
			if (DataSet.getParam(sServiceID, 1, 0, "SUCCESS_COUNT") > 0)
			{
				MessageBox("InfSuccess", "I", "");
				queryList();
			}
			else
			{
				MessageBox("InfFail", "E", "Function(UPDATE)");
			}

			break;
		
		case DELETE_FUNC_ID :
			if (DataSet.getParam(sServiceID, 1, 0, "SUCCESS_COUNT") > 0)
			{
				MessageBox("Success", "I", "");
				queryList();
			}
			else
			{
				MessageBox("Fail", "E", "Function(DELETE)");
			}

			break;
		
		default:	
			
			break;
	}
}

/********************
* �ʱ�ȭ
********************/
function init()
{
	setMode("INIT");
	f.userid.value = "1111"; //�ӽ�...
}

/********************
* ��� ������ ���� ī�װ� ��� ��ȸ
********************/
function getCtgrList()
{
	if (fQuery.lang_tp_cd.value == "") return;

	var trans = new Trans();
	trans.setPageRow(999);
	trans.setSvc(SELECT_CTGRINFO_ID);
	trans.open("fQuery","","/common.do");
}

/********************
* �ڷ� ��ȸ
********************/
function queryList()
{
	if(!fQuery.lang_tp_cd.value)
	{
		MessageBox("Required", "E", "�������");
		return;
	}

	setMode("A");
	
	var girdObj = document.all(SELECT_FUNC_ID);

	girdObj.setParam("rg_dtm_format", "DATET");
	girdObj.setParam("mdf_dtm_format", "DATET");

	var trans = new Trans();
	trans.setPageRow(999);
	trans.setSvc(SELECT_FUNC_ID);
	trans.setDefClick(true);
	trans.setWiseGrid("1");
	trans.setForwardId("wgdsl","");
	trans.open("fQuery","f","/wisegrid.do");
}

/*****************/
//������
//�׸��� onclick �̺�Ʈ �Լ�
/*****************/
function showDetailO_obj(id, strColumnKey, nRow)
{
	if(DataSet.getTotalCount(id) == "0")
		return;
				
	switch(id)
	{
		//�Խ��� ����Ʈ Ŭ����
		case SELECT_FUNC_ID:
			
			setMode("U");
			g_Func_idx = nRow;
			showDetailByWise(id, nRow, f);

			var gridObj = document.all(SELECT_FUNC_ID);
			f.func_seq.value = gridObj.GetCellValue("func_seq", nRow);
			
		break;
	}
}

/*****************/
//��Ϲ�ư
/*****************/
function funcAdd()
{
	setMode("A");
}

/*****************/
//�����ư
/*****************/
function funcSave()
{	
	if(!f.help_ctgr_seq.value)
	{
		MessageBox("Required", "E", "ī�װ�");
		return;
	}
	if(!f.func_nm.value)
	{
		MessageBox("Required", "E", "�Լ���");
		return;
	}

	var msg;
	var queryID;

	if(g_Flag == "A")
	{
		msg		= "SavConfirm";
		queryID	= INSERT_FUNC_ID;
	}
	else if(g_Flag == "U")
	{
		msg		= "ChgConfirm";
		queryID	= UPDATE_FUNC_ID;
	}
	
	if(!MessageBox(msg, "C", ""))
		return;
		
	var tran = new Trans();
	tran.setSvc(queryID);
	tran.open("f","f","/common.do");
}

/*****************/
//������ư
/*****************/
function funcDel()
{		
	if(!f.func_nm.value)
	{
		MessageBox("NotSelectedGrid", "E", "");
		return;
	}
	
	if(!MessageBox("DelConfirm", "C", "Function��"))
		return;
	
	var tran = new Trans();
	tran.setSvc(DELETE_FUNC_ID);
	tran.open("f","f","/common.do");
}

/********************
* ��庯��
********************/
function setMode(sType)
{
	g_Flag = sType;
	
	switch(sType)
	{
		case "INIT":	//�ʱ�ȭ
			f.func_nm.disabled		= true;
			f.func_par.disabled		= true;
			f.func_desc.disabled	= true;
			f.func_ex.disabled		= true;
			f.func_src.disabled		= true;
			f.func_rmk.disabled		= true;
		break;
		
		case "A":		//�Լ� ���
			f.func_nm.disabled		= false;
			f.func_par.disabled		= false;
			f.func_desc.disabled	= false;
			f.func_ex.disabled		= false;
			f.func_src.disabled		= false;
			f.func_rmk.disabled		= false;
			f.func_nm.value	= "";
			f.func_par.value	= "";
			f.func_desc.value	= "";
			f.func_ex.value	= "";
			f.func_src.value	= "";
			f.func_rmk.value	= "";
			f.rg_nm.value		= "";
			f.rg_dtm.value		= "";
			f.mdf_nm.value		= "";
			f.mdf_dtm.value		= "";
			
			f.btnDel.disabled	= true;
		break;

		case "U":
			f.btnDel.disabled	= false;
		break;

		default:
		break;
	}
}

/*****************/
//Űüũ
/*****************/
function checkKeyPress()
{
	if(isEnterKey())
	{
		queryList();
	}
}
