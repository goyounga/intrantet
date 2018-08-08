var SELECT_UPG_ID		= "UCUCR306S";		//���׷��̵����� ��ȸ
var INSERT_UPG_ID		= "UCUCR306I";		//���׷��̵����� �߰�
var UPDATE_UPG_ID		= "UCUCR306U";		//���׷��̵����� ����
var DELETE_UPG_ID		= "UCUCR306D";		//���׷��̵����� ����

var g_Flag;			//�����÷���
var g_Ex_idx;	//���׷��̵����� ����Ʈ index
var update_flag = false;

/********************
* �ݹ�
********************/
function callback(sServiceID)
{
	switch (sServiceID)
	{
		case INSERT_UPG_ID :
			if (DataSet.getParam(sServiceID, 1, 0, "SUCCESS_COUNT") > 0)
			{
				MessageBox("InfSuccess", "I", "");
				queryList();
			}
			else
			{
				MessageBox("InfFail", "E", "���׷��̵�����(INSERT)");
			}

			break;
		
		case UPDATE_UPG_ID :
			if (DataSet.getParam(sServiceID, 1, 0, "SUCCESS_COUNT") > 0)
			{
				MessageBox("InfSuccess", "I", "");
				queryList();
			}
			else
			{
				MessageBox("InfFail", "E", "���׷��̵�����(UPDATE)");
			}

			break;
		
		case DELETE_UPG_ID :
			if (DataSet.getParam(sServiceID, 1, 0, "SUCCESS_COUNT") > 0)
			{
				MessageBox("Success", "I", "");
				queryList();
			}
			else
			{
				MessageBox("Fail", "E", "���׷��̵�����(DELETE)");
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
* ���׷��̵����� ��ȸ
********************/
function queryList()
{
/*	if(fQuery.searchType.value && !fQuery.searchText.value)
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
*/
	setMode("A");
	
	var trans = new Trans();
	trans.setPageRow(999);
	trans.setSvc(SELECT_UPG_ID);
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
		case SELECT_UPG_ID:
			
			setMode("U");
			g_Ex_idx = nRow;
			showDetailByWise(id, nRow, f);

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
	var msg;
	var queryID;

	if(g_Flag == "A")
	{
		msg		= "SavConfirm";
		queryID	= INSERT_UPG_ID;
	}
	else if(g_Flag == "U")
	{
		msg		= "ChgConfirm";
		queryID	= UPDATE_UPG_ID;
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
	if(!f.upg_seq.value)
	{
		MessageBox("NotSelectedGrid", "E", "");
		return;
	}
	
	if(!MessageBox("DelConfirm", "C", "���׷��̵�������"))
		return;
	
	var tran = new Trans();
	tran.setSvc(DELETE_UPG_ID);
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
			clear(f);
//			f.ex_nm.disabled		= true;
//			f.ex_cont.disabled	= true;
		break;
		
		case "A":		//�Լ� ���
			clear(f);
/*			f.ex_nm.disabled		= false;
			f.ex_cont.disabled	= false;
			f.ex_nm.value	= "";
			f.ex_cont.value	= "";
			editor_setHTML("ex_cont",""); 
			f.rg_nm.value		= "";
			f.rg_dtm.value		= "";
			f.mdf_nm.value		= "";
			f.mdf_dtm.value		= "";
	*/		
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
