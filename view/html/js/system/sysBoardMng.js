var SELECT_BOARD_ID		= "UCSYS210S";		//�Խ��Ǹ���Ʈ ��ȸ
var INSERT_BOARD_ID		= "UCSYS210I";		//�Խ��Ǹ���Ʈ �߰�
var UPDATE_BOARD_ID		= "UCSYS210U";		//�Խ��Ǹ���Ʈ ����
var DELETE_BOARD_ID		= "UCSYS210D";		//�Խ��Ǹ���Ʈ ����

var SELECT_GRD1_ID		= "UCSYS211S";		//���Ѻο��� ����ڵ�� ��ȸ
var INSERT_GRD1_ID		= "UCSYS211I";		//���Ѻο��� ����ڵ�� �߰�
var UPDATE_GRD1_ID		= "UCSYS211U";		//���Ѻο��� ����ڵ�� ����
var DELETE_GRD1_ID		= "UCSYS211D";		//���Ѻο��� ����ڵ�� ����

var SELECT_GRD2_ID		= "UCSYS212S";		//���Ѻο� �ȵ� ����ڵ��

var g_Flag;			//�����÷���
var g_Board_idx;	//�Խ��� ����Ʈ index
var g_pop;			//�Խ��� �̸����� â
var update_flag = false;

/********************
* �ݹ�
********************/
function callback(sServiceID)
{
	switch (sServiceID)
	{
		case SELECT_BOARD_ID :
			break;

		case SELECT_GRD1_ID :
			if(update_flag)
			{
				update_flag = false;

				queryList1();
			}
			else
			{
				queryList2();
			}
			break;

		case SELECT_GRD2_ID :
			break;
		
		case INSERT_BOARD_ID :
			if (DataSet.getParam(sServiceID, 1, 0, "SUCCESS_COUNT") > 0)
			{
				MessageBox("InfSuccess", "I", "");
				queryList();
			}
			else
			{
				MessageBox("InfFail", "E", "�Խ���(INSERT)");
			}

			break;
		
		case UPDATE_BOARD_ID :
			if (DataSet.getParam(sServiceID, 1, 0, "SUCCESS_COUNT") > 0)
			{
				MessageBox("InfSuccess", "I", "");
				queryList();
			}
			else
			{
				MessageBox("InfFail", "E", "�Խ���(UPDATE)");
			}

			break;
		
		case DELETE_BOARD_ID :
			if (DataSet.getParam(sServiceID, 1, 0, "SUCCESS_COUNT") > 0)
			{
				MessageBox("Success", "I", "");
				queryList();
			}
			else
			{
				MessageBox("Fail", "E", "�Խ���(DELETE)");
			}

			break;
		
		case UPDATE_GRD1_ID :
			if (DataSet.getParam(sServiceID, 1, 0, "SUCCESS_COUNT") > 0)
			{
				queryList1();
			}
			else
			{
				MessageBox("Fail", "I", "");
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
	queryList();
}

/********************
* �Խ��� ��ȸ
********************/
function queryList()
{
	setMode("A");
	
	var girdObj = document.all(SELECT_BOARD_ID);

	girdObj.setParam("rg_dtm_format", "DATET");
	girdObj.setParam("mdf_dtm_format", "DATET");

	var trans = new Trans();
	trans.setPageRow(999);
	trans.setSvc(SELECT_BOARD_ID);
	trans.setDefClick(true);
	trans.setWiseGrid("1");
	trans.setForwardId("wgdsl","");
	trans.open("fQuery","f","/wisegrid.do");
}

/********************
* ���Ѻο��� ����ڵ�� ����Ʈ
********************/
function queryList1()
{	
	update_flag = false;

	var trans = new Trans();
	trans.setPageRow(999);
	trans.setSvc(SELECT_GRD1_ID);
	trans.setWiseGrid("1");
	trans.setForwardId("wgdsl","");
	trans.open("f","f","/wisegrid.do");
}

/********************
* ���Ѻο� �ȵ� ����ڵ�� ����Ʈ
********************/
function queryList2()
{
	var trans = new Trans();
	trans.setPageRow(999);
	trans.setSvc(SELECT_GRD2_ID);
	trans.setWiseGrid("1");
	trans.setForwardId("wgdsl","");
	trans.open("f","f","/wisegrid.do");
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
		case SELECT_BOARD_ID:
			
			var gridObj = document.all(SELECT_BOARD_ID);

			setMode("U");
			
			if(strColumnKey == "view")
			{
				if(typeof(g_pop) == "object")
				{
					g_pop.close();
					g_pop = "";
				}

				var param;
					param	=	"board_id="+gridObj.GetCellValue("board_id", nRow);
					param	+=	"&board_nm="+document.all(id).GetCellValue("board_nm", nRow);
//					g_pop =  window.open("/system/sysBoardList.jsp?"+param, "popup", "toolbar=no,scrollbars=no,top=0,left=100,width=1010,height=700");				
					g_pop =  openPopup("/jsp/system/sysBoardList.jsp", "param"+param, "popup", "0", "100", "1010", "700", "toolbar=no,scrollbars=no");
				return;
			}

			showDetailByWise(id, nRow, f);

			f.board_tp_seq.value = gridObj.GetCellValue("board_tp_seq", nRow);
			queryList1();
			
		break;
	}
}

/*****************/
//��Ϲ�ư
/*****************/
function boardAdd()
{
	setMode("A");
	wisegridClear(SELECT_GRD1_ID);
	wisegridClear(SELECT_GRD2_ID);
}

/*****************/
//�����ư
/*****************/
function boardsave()
{	
	if(!f.board_knd_cd.value)
	{
		MessageBox("Required", "E", "�Խ�������");
		return;
	}
	if(!f.board_nm.value)
	{
		MessageBox("Required", "E", "�Խ��Ǹ�");
		return;
	}
	if(!f.use_f.value)
	{
		MessageBox("Required", "E", "��뿩��");
		return;
	}

	var msg;
	var queryID;
	var gridObj = document.all(SELECT_BOARD_ID);

	if(g_Flag == "A")
	{
		msg			= "SavConfirm";
		queryID		= INSERT_BOARD_ID;
	}
	else if(g_Flag == "U")
	{
		msg		= "ChgConfirm";
		queryID	= UPDATE_BOARD_ID;
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
function boarddel()
{		
	if(!f.board_nm.value)
	{
		MessageBox("NotSelectedGrid", "E", "");
		return;
	}
	
	if(!MessageBox("DelConfirm", "C", "���õ� �Խ����� "))
		return;
	
	var gridObj = document.all(SELECT_BOARD_ID);

	var tran = new Trans();
	tran.setSvc(DELETE_BOARD_ID);
	tran.open("f","f","/common.do");
}

/*****************/
//���� ����
/*****************/
function authSave()
{
	var GridObj = document.all(SELECT_GRD1_ID);
	var Obj		= document.all(SELECT_BOARD_ID);
	
	if(GridObj.GetRowCount() < 1)
	{		
		MessageBox("SYSNotCnt", "E", "");
		return;
	}
	
	update_flag = true;

	var trans = new Trans();
	trans.setSvc(SELECT_GRD1_ID);
	trans.setMode("save");
	trans.setWiseGrid("1");
	trans.setForwardId("wgdsl","");
	trans.open("f","f","/wisegrid.do");
}

/**********************
* �ʵ� ����Ʈ ���̺� Row �̵�
**********************/
function moveRow(fromObj, toObj)
{
	var fromGridObj = document.all(fromObj);
	var toGridObj = document.all(toObj);

	if(!chkSelected(fromGridObj))
	{
		MessageBox("SYSSelectRow", "E", "");
		return;
	}
	
	for(i = 0; i < fromGridObj.GetRowCount(); i++)
	{
		if(fromGridObj.GetCellValue("chk", i) == "1")
		{
			toGridObj.AddRow();
			for(j = 0; j < toGridObj.GetColCount(); j++)
			{
				if(fromObj == SELECT_GRD2_ID)
				{
					if(toGridObj.GetColHDKey(j) != "CRUD")
						toGridObj.SetCellValue(toGridObj.GetColHDKey(j), toGridObj.GetRowCount()-1, fromGridObj.GetCellValue(toGridObj.GetColHDKey(j), i));
				}
				else
				{
					if(fromGridObj.GetColHDKey(j) != "CRUD")
						toGridObj.SetCellValue(toGridObj.GetColHDKey(j), toGridObj.GetRowCount()-1, fromGridObj.GetCellValue(toGridObj.GetColHDKey(j), i));
				}
			}
		}
	}

	for(i = fromGridObj.GetRowCount()-1; i >= 0; i--)
	{
		if(fromGridObj.GetCellValue("chk", i) == "1")
		{
			fromGridObj.DeleteRow(i);
		}
	}
}

/**********************
* �׸��忡 ���õ� CheckBox�� �ִ��� üũ
**********************/
function chkSelected(GridObj)
{
	for(i = 0; i < GridObj.GetRowCount(); i++)
	{
		if(GridObj.GetCellValue("chk", i) == "1")
		{
			return true;
		}
	}	
	return false;
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
			var obj = document.all(SELECT_GRD2_ID);
			obj.SetColHide('r_auth_f', true);
			obj.SetColHide('w_auth_f', true);

			f.board_nm.disabled	= true;
		break;
		
		case "A":		//�Խ������� ���
			f.board_nm.disabled	= false;
			f.board_nm.value	= "";
			f.use_f.value		= "Y";
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
