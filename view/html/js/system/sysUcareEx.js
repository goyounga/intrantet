var SELECT_EX_ID		= "UCSYS303S";		//Example ��ȸ
var INSERT_EX_ID		= "UCSYS302I";		//Example �߰�
var UPDATE_EX_ID		= "UCSYS302U";		//Example ����
var DELETE_EX_ID		= "UCSYS302D";		//Example ����

var g_Flag;			//�����÷���
var g_Ex_idx;	//Example ����Ʈ index
var update_flag = false;

/********************
* �ݹ�
********************/
function callback(sServiceID)
{
	switch (sServiceID)
	{
		case INSERT_EX_ID :
			if (DataSet.getParam(sServiceID, 1, 0, "SUCCESS_COUNT") > 0)
			{
				MessageBox("InfSuccess", "I", "");
				queryList();
			}
			else
			{
				MessageBox("InfFail", "E", "Example(INSERT)");
			}

			break;
		
		case UPDATE_EX_ID :
			if (DataSet.getParam(sServiceID, 1, 0, "SUCCESS_COUNT") > 0)
			{
				MessageBox("InfSuccess", "I", "");
				queryList();
			}
			else
			{
				MessageBox("InfFail", "E", "Example(UPDATE)");
			}

			break;
		
		case DELETE_EX_ID :
			if (DataSet.getParam(sServiceID, 1, 0, "SUCCESS_COUNT") > 0)
			{
				MessageBox("Success", "I", "");
				queryList();
			}
			else
			{
				MessageBox("Fail", "E", "Example(DELETE)");
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
* Example ��ȸ
********************/
function queryList()
{
	setMode("A");
	
	var girdObj = document.all(SELECT_EX_ID);

	girdObj.setParam("rg_dtm_format", "DATET");
	girdObj.setParam("mdf_dtm_format", "DATET");

	var trans = new Trans();
	trans.setPageRow(999);
	trans.setSvc(SELECT_EX_ID);
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
		case SELECT_EX_ID:
			
			setMode("U");
			g_Ex_idx = nRow;
			showDetailByWise(id, nRow, f);

			var gridObj = document.all(SELECT_EX_ID);
			f.ex_seq.value = gridObj.GetCellValue("ex_seq", nRow);
			
		break;
	}
}

/*****************/
//��Ϲ�ư
/*****************/
function exAdd()
{
	setMode("A");
}

/*****************/
//�����ư
/*****************/
function exSave()
{
	if(!f.ex_nm.value)
	{
		MessageBox("Required", "E", "������");
		return;
	}

	var msg;
	var queryID;

	if(g_Flag == "A")
	{
		msg		= "SavConfirm";
		queryID	= INSERT_EX_ID;
	}
	else if(g_Flag == "U")
	{
		msg		= "ChgConfirm";
		queryID	= UPDATE_EX_ID;
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
function exDel()
{		
	if(!f.ex_nm.value)
	{
		MessageBox("NotSelectedGrid", "E", "");
		return;
	}
	
	if(!MessageBox("DelConfirm", "C", "Example��"))
		return;
	
	var tran = new Trans();
	tran.setSvc(DELETE_EX_ID);
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
			f.ex_nm.disabled		= true;
			f.ex_cont.disabled	= true;
		break;
		
		case "A":		//�Լ� ���
			f.ex_nm.disabled		= false;
			f.ex_cont.disabled	= false;
			f.ex_nm.value	= "";
			f.ex_cont.value	= "";
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
