var SELECT_PRJINFO_ID	= "UCPRJ217S";		//������Ʈ ����Ʈ ��ȸ
var SELECT_QST_ID		= "UCPRJ218S";		//���� ��ȸ
var INSERT_QST_ID		= "UCPRJ123I";		//���� �߰�
var UPDATE_QST_ID		= "UCPRJ123U";		//���� ����
var DELETE_QST_ID		= "UCPRJ123D";		//���� ����
var DELETE_QNA_ID		= "UCPRJ124D";		//������ ��ϵ� �亯 ���� ����
var SELECT_ANW_ID		= "UCPRJ219S";		//�亯 ��ȸ
var INSERT_ANW_ID		= "UCPRJ124I";		//�亯 �߰�
var UPDATE_ANW_ID		= "UCPRJ124U";		//�亯 ����
var DELETE_ANW_ID		= "UCPRJ125D";		//�亯 ����

//������ INSERT �� ��� �������� �����ͼ� ���� ���̺� ���� INSERT �ؾ��ϱ� ������ �� Ʈ��������� ó���Ѵ�. 
//������ UPDATE �� ��쿡�� �������� �̸� �˰� �ֱ� ������ �� Ʈ��������� ó���� �����ϴ�.
var ALL_INSERT_QST_ID 	= "UCPRJ123I,UCPRJ127S";			//���� �߰� + ���� ���� ������ ��ȸ
var ALL_INSERT_QST_ID2	= "UCPRJ126I";						//���� �߰�
var ALL_UPDATE_QST_ID	= "UCPRJ123U,UCPRJ126I";			//���� ���� + ���� �߰�
var ALL_DELETE_QST_ID 	= "UCPRJ124D,UCPRJ123D,UCPRJ126D";	//�亯 ����(���� ����) + ���� ����+ ���� ����
var FILE_SELECT_ID 		= "UCPRJ126S";		//���� ��ȸ
var FILE_DELETE_ID 		= "UCPRJ126D";		//���ϸ� ����

var g_QstFlag;	//���� �����÷���
var g_AnwFlag;	//���� �����÷���
var g_Qst_idx;	//���� ����Ʈ index
var g_Anw_idx;	//�亯 ����Ʈ index
var update_flag = false;

var UPLOAD_PATH 		= "UPLOAD_PATH";
var UPLOAD_FOLDER_NAME 	= "prj";

/********************
* �ݹ�
********************/
function callback(sServiceID)
{
	switch (sServiceID)
	{
		case ALL_INSERT_QST_ID :

			f.up_seq.value = DataSet.getParam("UCPRJ127S", 1, 0, "seq");
			
			insertUpFile();
			
			break;

		case ALL_INSERT_QST_ID2 :
		case INSERT_QST_ID :
			if (DataSet.getParam(INSERT_QST_ID, 1, 0, "SUCCESS_COUNT") > 0)
			{
				MessageBox("InfSuccess", "I", "");
				
				initUploadFile();
				
				queryList();
			}
			else
			{
				MessageBox("InfFail", "E", "����(INSERT)");
			}

			break;
		
		case ALL_UPDATE_QST_ID :
		case UPDATE_QST_ID :
			if (DataSet.getParam(UPDATE_QST_ID, 1, 0, "SUCCESS_COUNT") > 0)
			{
				MessageBox("InfSuccess", "I", "");
				
				initUploadFile();
				
				queryList();
			}
			else
			{
				MessageBox("InfFail", "E", "����(UPDATE)");
			}

			break;
		
		case ALL_DELETE_QST_ID:
//			if (DataSet.getParam(ALL_DELETE_QST_ID, 1, 0, "SUCCESS_COUNT") > 0)
//			{
				MessageBox("Success", "I", "");
				
				initUploadFile();
				
				queryList();
//			}
/*			else
			{
				MessageBox("Fail", "E", "����(DELETE)");
			}
*/
			break;
		
		case INSERT_ANW_ID :
			if (DataSet.getParam(INSERT_ANW_ID, 1, 0, "SUCCESS_COUNT") > 0)
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
			if (DataSet.getParam(UPDATE_ANW_ID, 1, 0, "SUCCESS_COUNT") > 0)
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
			if (DataSet.getParam(DELETE_ANW_ID, 1, 0, "SUCCESS_COUNT") > 0)
			{
				MessageBox("Success", "I", "");
				queryList1();
			}
			else
			{
				MessageBox("Fail", "E", "�亯(DELETE)");
			}

			break;
		
		case FILE_SELECT_ID:

			showUploadFileList();

			break;

		case FILE_DELETE_ID:

			if (DataSet.getParam(FILE_DELETE_ID, 1, 0, "SUCCESS_COUNT") > 0)
			{
				MessageBox("Success", "E", "");

				queryUploadFile();
			}
			break;
		case SELECT_ANW_ID :
		
			queryUploadFile();
		
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
	
	//÷������ div �ʱ�ȭ
	setUploadFile("&nbsp;");
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
			f.up_seq.value = gridObj.GetCellValue("qst_seq", nRow);		//���� ���ε�, ���� �� ���
					
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
 * ���ε� ���� ��ȸ
********************/
function queryUploadFile()
{
	var tran = new Trans();
	tran.setSvc(FILE_SELECT_ID);
	tran.setPageRow(9999);
	tran.setAsync(false);
	tran.open("f", "f", "/common.do");
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
	//���Ͼ��ε� ��
	if (iUpload.existsUploadFile() == true)
	{
		if(checkSaveData() == false) return;

		iUpload.upload(UPLOAD_PATH, UPLOAD_FOLDER_NAME);
	}
	else
	{
		save();
	}
}

function checkSaveData()
{
	if(!f.qst_cont.value)
	{
		MessageBox("Required", "E", "��������");
		return false;
	}
	if(!f.prj_seq.value)
	{
		MessageBox("Required", "E", "������Ʈ");
		return false;
	}
	if(!f.qst_tp_cd.value)
	{
		MessageBox("Required", "E", "��������");
		return false;
	}
}

function save()
{
	if(iUpload.existsUploadFile() == false && checkSaveData() == false) return;

	var msg;
	var queryID;

	if(g_QstFlag == "QA")
	{
		msg		= "SavConfirm";
		
		if (iUpload.existsUploadFile() == true)
		{
			queryID	= ALL_INSERT_QST_ID;
		}
		else
		{
			queryID	= INSERT_QST_ID;
		}
	}
	else if(g_QstFlag == "QU")
	{
		msg		= "ChgConfirm";
		
		if (iUpload.existsUploadFile() == true)
		{
			queryID	= ALL_UPDATE_QST_ID;
		}
		else
		{
			queryID	= UPDATE_QST_ID;
		}
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
	tran.setSvc(ALL_DELETE_QST_ID);
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
	if(f.prj_seq.value == "")
	{
		alert("������ �����ϼ���.");
		return;
	}
	
	if(!f.anw_cont.value)
	{
		MessageBox("Required", "E", "�亯����");
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
//���Ͼ��ε� �� ���� ������ ��ȸ �� �� INSERT �ϱ� ����
/*****************/
function insertUpFile()
{
	var tran = new Trans();
	tran.setSvc(ALL_INSERT_QST_ID2);
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
	var inputStatus;
	
	switch(sType)
	{
		case "INIT":	//�ʱ�ȭ
			f.qst_cont.disabled	= true;
			f.anw_cont.disabled	= true;
			
			inputStatus = true;
			uploadFileDisabled(false);
			initUploadFile();
		break;
		
		case "QA":		//���� ���
			g_QstFlag = sType;

			f.qst_cont.disabled	= false;
			f.qst_cont.value	= "";
			f.prj_seq.value	= "";
			f.prj_nm.value	= "";
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

			inputStatus = false;
			uploadFileDisabled(true);
			initUploadFile();
		break;

		case "QU":
			g_QstFlag = sType;

			f.btnQstDel.disabled	= false;
			
			inputStatus = false;
			uploadFileDisabled(false);
			initUploadFile();
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
	
	if(typeof inputStatus != "undefined")
	{
		uploadFormSetDisabled(inputStatus);
		iconDisabled(["icoBig", "icoSmall", "icoUploadFiles", "icoShowFiles"], inputStatus);
	}
}

/********************
* ������Ʈ ���ù�ư
********************/
function openProject(frm)
{
	g_frm = frm;
	
	if(typeof(openPopup) == "object")
		openPopup.close();
	
	openPopup("/jsp/project/prjExePOP.jsp", "", "popup", "0", "300", "800", "565", "toolbar=no,scrollbars=no");
}

/********************
* ������Ʈ â���� ���������� setProject�� ȣ���Ѵ�.
********************/
function setProject(prj_seq, prj_nm)
{
	g_frm.prj_seq.value = prj_seq;
	g_frm.prj_nm.value = prj_nm;

}

/********************
* ������Ʈ Clear��ư
********************/
function del_Project(frm)
{
	frm.prj_seq.value = "";
	frm.prj_nm.value = "";
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
