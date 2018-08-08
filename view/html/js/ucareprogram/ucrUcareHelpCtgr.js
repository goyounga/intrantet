var SELECT_CTGR_ID		= "UCUCR300S";		//ī�װ� ��ȸ
var INSERT_CTGR_ID		= "UCUCR300I";		//ī�װ� �߰�
var UPDATE_CTGR_ID		= "UCUCR300U";		//ī�װ� ����
var DELETE_CTGR_ID		= "UCUCR300D";		//ī�װ� ����

var g_Flag;			//�����÷���
var g_Ctgr_idx;	//�ڷ� ����Ʈ index
var update_flag = false;

/********************
* �ݹ�
********************/
function callback(sServiceID)
{
	switch (sServiceID)
	{
		case SELECT_CTGR_ID :
			break;

		case INSERT_CTGR_ID :
			if (DataSet.getParam(sServiceID, 1, 0, "SUCCESS_COUNT") > 0)
			{
				MessageBox("InfSuccess", "I", "");
				queryList();
			}
			else
			{
				MessageBox("InfFail", "E", "�ڷ�(INSERT)");
			}

			break;
		
		case UPDATE_CTGR_ID :
			if (DataSet.getParam(sServiceID, 1, 0, "SUCCESS_COUNT") > 0)
			{
				MessageBox("InfSuccess", "I", "");
				queryList();
			}
			else
			{
				MessageBox("InfFail", "E", "�ڷ�(UPDATE)");
			}

			break;
		
		case DELETE_CTGR_ID :
			if (DataSet.getParam(sServiceID, 1, 0, "SUCCESS_COUNT") > 0)
			{
				MessageBox("Success", "I", "");
				queryList();
			}
			else
			{
				MessageBox("Fail", "E", "�ڷ�(DELETE)");
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
	if(fQuery.searchType.value && !fQuery.searchText.value)
	{
		MessageBox("InputFail", "E", fQuery.searchType.options[fQuery.searchType.selectedIndex].text);
		fQuery.searchText.focus();
		return;
	}
	else if(!fQuery.searchType.value && fQuery.searchText.value)
	{
		MessageBox("SelectFail2", "E", "");
		fQuery.searchType.focus();
		return;
	}
	
	if(fQuery.searchType.value && fQuery.searchText.value)
		fQuery.search.value = "AND "+fQuery.searchType.value+" LIKE '%"+fQuery.searchText.value+"%'";
	else
		fQuery.search.value = "";

	setMode("A");
	
	var girdObj = document.all(SELECT_CTGR_ID);

	girdObj.setParam("rg_dtm_format", "DATET");
	girdObj.setParam("mdf_dtm_format", "DATET");

	var trans = new Trans();
	trans.setPageRow(999);
	trans.setSvc(SELECT_CTGR_ID);
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
		case SELECT_CTGR_ID:
			
			setMode("U");
			g_Ctgr_idx = nRow;
			showDetailByWise(id, nRow, f);

			var gridObj = document.all(SELECT_CTGR_ID);
			f.help_ctgr_seq.value = gridObj.GetCellValue("help_ctgr_seq", nRow);
			
		break;
	}
}

/*****************/
//��Ϲ�ư
/*****************/
function ctgrAdd()
{
	setMode("A");
}

/*****************/
//�����ư
/*****************/
function ctgrSave()
{	
	if(!f.lang_tp_cd.value)
	{
		MessageBox("Required", "E", "�������");
		return;
	}
	if(!f.ctgr_nm.value)
	{
		MessageBox("Required", "E", "ī�װ���");
		return;
	}

	var msg;
	var queryID;

	if(g_Flag == "A")
	{
		msg		= "SavConfirm";
		queryID	= INSERT_CTGR_ID;
	}
	else if(g_Flag == "U")
	{
		msg		= "ChgConfirm";
		queryID	= UPDATE_CTGR_ID;
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
function ctgrDel()
{		
	if(!f.ctgr_nm.value)
	{
		MessageBox("NotSelectedGrid", "E", "");
		return;
	}
	
	if(!MessageBox("DelConfirm", "C", "�ڷ�"))
		return;
	
	var tran = new Trans();
	tran.setSvc(DELETE_CTGR_ID);
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
			f.ctgr_nm.disabled	= true;
			f.ctgr_desc.disabled	= true;
		break;
		
		case "A":		//ī�װ� ���
			f.ctgr_nm.disabled	= false;
			f.ctgr_desc.disabled	= false;
			f.ctgr_nm.value	= "";
			f.ctgr_desc.value	= "";
			f.use_f.value	= "Y";
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
