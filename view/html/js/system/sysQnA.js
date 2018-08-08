var SELECT_PRJINFO_ID	= "UCSYS217S";		//������Ʈ ����Ʈ ��ȸ
var SELECT_QST_ID		= "UCSYS218S";		//���� ��ȸ
var INSERT_QST_ID		= "UCSYS123I";		//���� �߰�
var UPDATE_QST_ID		= "UCSYS123U";		//���� ����
var DELETE_QST_ID		= "UCSYS123D";		//���� ����
var DELETE_QNA_ID		= "UCSYS124D";		//������ ��ϵ� �亯 ���� ����
var SELECT_ANW_ID		= "UCSYS219S";		//�亯 ��ȸ
var INSERT_ANW_ID		= "UCSYS124I";		//�亯 �߰�
var UPDATE_ANW_ID		= "UCSYS124U";		//�亯 ����
var DELETE_ANW_ID		= "UCSYS125D";		//�亯 ����

var g_QstFlag;	//���� �����÷���
var g_AnwFlag;	//���� �����÷���
var g_Qst_idx;	//���� ����Ʈ index
var g_Anw_idx;	//�亯 ����Ʈ index
var update_flag = false;

/********************
* �ݹ�
********************/
function callback(sServiceID)
{
	switch (sServiceID)
	{
		case INSERT_QST_ID :
			if (DataSet.getParam(sServiceID, 1, 0, "SUCCESS_COUNT") > 0)
			{
				MessageBox("InfSuccess", "I", "");
				queryList();
			}
			else
			{
				MessageBox("InfFail", "E", "����(INSERT)");
			}

			break;
		
		case UPDATE_QST_ID :
			if (DataSet.getParam(sServiceID, 1, 0, "SUCCESS_COUNT") > 0)
			{
				MessageBox("InfSuccess", "I", "");
				queryList();
			}
			else
			{
				MessageBox("InfFail", "E", "����(UPDATE)");
			}

			break;
		
		case DELETE_QST_ID+","+DELETE_QNA_ID :
//			if (DataSet.getParam(sServiceID, 1, 0, "SUCCESS_COUNT") > 0)
//			{
				MessageBox("Success", "I", "");
				queryList();
//			}
/*			else
			{
				MessageBox("Fail", "E", "����(DELETE)");
			}
*/
			break;
		
		case INSERT_ANW_ID :
			if (DataSet.getParam(sServiceID, 1, 0, "SUCCESS_COUNT") > 0)
			{
				MessageBox("InfSuccess", "I", "");
				queryList1();
			}
			else
			{
				MessageBox("InfFail", "E", "�亯(INSERT)");
			}

			break;
		
		case UPDATE_ANW_ID :
			if (DataSet.getParam(sServiceID, 1, 0, "SUCCESS_COUNT") > 0)
			{
				MessageBox("InfSuccess", "I", "");
				queryList1();
			}
			else
			{
				MessageBox("InfFail", "E", "�亯(UPDATE)");
			}

			break;
		
		case DELETE_ANW_ID :
			if (DataSet.getParam(sServiceID, 1, 0, "SUCCESS_COUNT") > 0)
			{
				MessageBox("Success", "I", "");
				queryList1();
			}
			else
			{
				MessageBox("Fail", "E", "�亯(DELETE)");
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
* ���� ��ȸ
********************/
function queryList()
{
	setMode("QA");
	
	var girdObj = document.all(SELECT_QST_ID);

	girdObj.setParam("q_rg_dtm_format", "DATET");
	girdObj.setParam("q_mdf_dtm_format", "DATET");

	var trans = new Trans();
	trans.setPageRow(999);
	trans.setSvc(SELECT_QST_ID);
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
		//���� ����Ʈ Ŭ����
		case SELECT_QST_ID:
			
			setMode("QU");
			g_Qst_idx = nRow;
			showDetailByWise(id, nRow, f);

			var gridObj = document.all(SELECT_QST_ID);
			f.qst_seq.value = gridObj.GetCellValue("qst_seq", nRow);

			queryList1();
			
		break;

		//�亯 ����Ʈ Ŭ����
		case SELECT_ANW_ID:
			
			setMode("AU");
			g_Anw_idx = nRow;
			showDetailByWise(id, nRow, f);

			var gridObj = document.all(SELECT_ANW_ID);
			f.anw_seq.value = gridObj.GetCellValue("anw_seq", nRow);
			
		break;
	}
}

/********************
* �亯 ��ȸ
********************/
function queryList1()
{
	setMode("AA");
	
	var girdObj = document.all(SELECT_ANW_ID);
	girdObj.setParam("a_rg_dtm_format", "DATET");
	girdObj.setParam("a_mdf_dtm_format", "DATET");
	
	var trans = new Trans();
	trans.setPageRow(999);
	trans.setSvc(SELECT_ANW_ID);
	trans.setDefClick(true);
	trans.setWiseGrid("1");
	trans.setForwardId("wgdsl","");
	trans.open("f","f","/wisegrid.do");
}

/*****************/
//��Ϲ�ư
/*****************/
function qstAdd()
{
	setMode("QA");
}

/*****************/
//�����ư
/*****************/
function qstSave()
{	
	if(!f.qst_cont.value)
	{
		MessageBox("Required", "E", "��������");
		return;
	}
	if(!f.prj_seq.value)
	{
		MessageBox("Required", "E", "������Ʈ");
		return;
	}
	if(!f.qst_tp_cd.value)
	{
		MessageBox("Required", "E", "��������");
		return;
	}

	var msg;
	var queryID;

	if(g_QstFlag == "QA")
	{
		msg		= "SavConfirm";
		queryID	= INSERT_QST_ID;
	}
	else if(g_QstFlag == "QU")
	{
		msg		= "ChgConfirm";
		queryID	= UPDATE_QST_ID;
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
function qstDel()
{		
	if(!f.qst_cont.value)
	{
		MessageBox("NotSelectedGrid", "E", "");
		return;
	}
	
	if(!MessageBox("DelConfirm", "C", "��ϵ� �亯�� ���� �����˴ϴ�."))
		return;
	
	var tran = new Trans();
	tran.setSvc(DELETE_QST_ID+","+DELETE_QNA_ID);
	tran.open("f","f","/common.do");
}

/*****************/
//��Ϲ�ư
/*****************/
function anwAdd()
{
	setMode("AA");
}

/*****************/
//�����ư
/*****************/
function anwSave()
{	
	if(!f.anw_cont.value)
	{
		MessageBox("Required", "E", "��������");
		return;
	}

	var msg;
	var queryID;

	if(g_AnwFlag == "AA")
	{
		msg		= "SavConfirm";
		queryID	= INSERT_ANW_ID;
	}
	else if(g_AnwFlag == "AU")
	{
		msg		= "ChgConfirm";
		queryID	= UPDATE_ANW_ID;
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
function anwDel()
{		
	if(!f.anw_cont.value)
	{
		MessageBox("NotSelectedGrid", "E", "");
		return;
	}
	
	if(!MessageBox("DelConfirm", "C", "�亯��"))
		return;
	
	var tran = new Trans();
	tran.setSvc(DELETE_ANW_ID);
	tran.open("f","f","/common.do");
}

/********************
* ��庯��
********************/
function setMode(sType)
{
	switch(sType)
	{
		case "INIT":	//�ʱ�ȭ
			f.qst_cont.disabled	= true;
			f.anw_cont.disabled	= true;
		break;
		
		case "QA":		//���� ���
			g_QstFlag = sType;

			f.qst_cont.disabled	= false;
			f.qst_cont.value	= "";
			f.prj_seq.value	= "";
			f.qst_tp_cd.value	= "";
			f.q_rg_nm.value		= "";
			f.q_rg_dtm.value		= "";
			f.q_mdf_nm.value		= "";
			f.q_mdf_dtm.value		= "";
			
			wisegridClear(SELECT_ANW_ID);
			f.anw_cont.disabled	= true;
			f.anw_cont.value	= "";
			f.a_rg_nm.value		= "";
			f.a_rg_dtm.value		= "";
			f.a_mdf_nm.value		= "";
			f.a_mdf_dtm.value		= "";

			f.btnQstDel.disabled	= true;
		break;

		case "QU":
			g_QstFlag = sType;

			f.btnQstDel.disabled	= false;
		break;

		case "AA":		//�亯 ���
			g_AnwFlag = sType;
	
			f.anw_cont.disabled	= false;
			f.anw_cont.value	= "";
			f.a_rg_nm.value		= "";
			f.a_rg_dtm.value		= "";
			f.a_mdf_nm.value		= "";
			f.a_mdf_dtm.value		= "";
			
			f.btnAnwDel.disabled	= true;
		break;

		case "AU":
			g_AnwFlag = sType;

			f.btnAnwDel.disabled	= false;
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
