/**
 * PROJ : Nexfron Intranet
 * NAME : infBoardList.js
 * DESC : �Խ��� �ڹٽ�ũ��Ʈ
 * Author : ������ ����
 * VER  : 1.0
 * Copyright 2009 Nexfron All rights reserved
 * ============================================================================================
 * 								��		��		��		��
 * ============================================================================================
 * VERSION		DATE		AUTHOR		DESCRIPTION
 * ============================================================================================
 * 1.0		2009.08.21		������		�ּ��߰�
 */
var SELECT_BOARDINFO_ID		= "UCINF117S";		//�Խ��� ����Ʈ ��ȸ
var SELECT_BOARDAUTH_ID		= "UCINF118S";		//�Խ��� ���α��� ��ȸ
var SELECT_BOARDLIST_ID		= "UCINF214S";		//�� ��� ��ȸ
var SELECT_BOARDDETAIL_ID	= "UCINF220S";		//�� ���� ��ȸ

var INSERT_BOARDLIST_ID		= "UCINF214I";		//�Խñ� ����
var UPDATE_ID				= "UCINF214U";		//�Խñ� ����
var DELETE_BOARDLIST_ID		= "UCINF214D";		//�Խñ� ����
var DELETE_BOARDRPLY_ID		= "UCINF216D";		//�Խñۿ� ��ϵ� ��� ���ÿ� ����
var REMOVE_BOARDFILE_ID		= "UCINF216U";		//�Խñ� ÷������ ����
var QRY_UP_BOARDLIST_ID		= "UCINF115U";		//�Խñ� ��ȸ�� +1

var SELECT_REPLYLIST_ID		= "UCINF215S";		//�Խ��Ǵ�� ��ȸ
var INSERT_REPLYLIST_ID		= "UCINF215I";		//�Խ��Ǵ�� ����
var UPDATE_REPLYLIST_ID		= "UCINF215U";		//�Խ��Ǵ�� ����
var DELETE_REPLYLIST_ID		= "UCINF215D";		//�Խ��Ǵ�� ����

var RPLY_UP_BOARDLIST_ID	= "UCINF116U";		//�Խñ� ��ۼ� +1
var RPLY_DOWN_BOARDLIST_ID	= "UCINF117U";		//�Խñ� ��ۼ� -1

//������ INSERT �� ��� �������� �����ͼ� ���� ���̺� ���� INSERT �ؾ��ϱ� ������ �� Ʈ��������� ó���Ѵ�.
//������ UPDATE �� ��쿡�� �������� �̸� �˰� �ֱ� ������ �� Ʈ��������� ó���� �����ϴ�.
var ALL_INSERT_ID 			= "UCINF214I,UCINF130I";			//�� �߰�
var ALL_UPDATE_ID			= "UCINF214U,UCCOM030I";			//�� ���� + ���� �߰�
var ALL_DELETE_ID 			= "UCINF214D,UCCOM030D,UCINF215D";	//�� ����+ ���� ����

var FILE_SELECT_ID 			= "UCCOM030S";		//���� ��ȸ
var FILE_DELETE_ID 			= "UCCOM030D";		//���ϸ� ����
var FILE_REMOVE_ID 			= "removefile";

var g_ReadFlag;		//�б� ����
var g_WriteFlag;	//���� ����
var g_ReplyFlag;	//��� �����÷���
var gsXaFlag;

//Upload File
var UPLOAD_PATH 		= "UPLOAD_PATH";
var UPLOAD_FOLDER_NAME 	= "board";

/********************
* �ݹ�
********************/
function callback(sServiceID)
{

	switch (sServiceID)
	{

		case SELECT_BOARDINFO_ID:
//			document.all("r_auth_span").innerText = DataSet.getParam(sServiceID, 1, 0, "r_auth_span");
//			document.all("w_auth_span").innerText = DataSet.getParam(sServiceID, 1, 0, "w_auth_span");
//			document.all("d_auth_span").innerText = DataSet.getParam(sServiceID, 1, 0, "d_auth_span");
//

			//var curpage =(DataSet.getDsAttribute(SELECT_BOARDINFO_ID,"curpage"));
			var cd = new Array();
			var nm = new Array();

			var g_Obj = document.all(SELECT_BOARDINFO_ID);
			for(var i = 0 ; i < g_Obj.getRowCount() ; i++){
				cd[i] = g_Obj.GetCellValue("board_tp_seq", i);
				nm[i] = g_Obj.GetCellValue("board_nm", i);
			}

			//setOptions(fQuery.board_nm, cd, nm, false, true);
			setOptions(f.board_tp_seq, cd, nm, false, true);

			queryList(1);
		break;

		case SELECT_BOARDAUTH_ID:

			g_ReadFlag = DataSet.getParam(SELECT_BOARDAUTH_ID, 1, 0, "read_auth_f");
			g_WriteFlag = DataSet.getParam(SELECT_BOARDAUTH_ID, 1, 0, "wrt_auth_f");

			setAuth();
		break;

		case QRY_UP_BOARDLIST_ID :
			//queryList1();
		break;

		case INSERT_BOARDLIST_ID:
		case ALL_INSERT_ID :
			if (DataSet.getParam(INSERT_BOARDLIST_ID, 1, 0, "SUCCESS_COUNT") > 0)
			{
				MessageBox("Success", "I", "");
				queryList();

				callTabClick('Tab',0,'', '');
			}
			else
			{
				MessageBox("InfFail", "E", "�Խñ�(INSERT)");
			}
		break;

		case UPDATE_ID :
			if (DataSet.getParam(sServiceID, 1, 0, "SUCCESS_COUNT") > 0)
			{
				MessageBox("Success", "I", "");
				queryList();

				callTabClick('Tab',0,'', '');
			}
			else
			{
				MessageBox("InfFail", "E", "�Խñ�(UPDATE)");
			}
		break;

		case ALL_UPDATE_ID :
			if (DataSet.getParam("UCINF214U", 1, 0, "SUCCESS_COUNT") > 0)
			{
				MessageBox("Success", "I", "");
				queryList();

				callTabClick('Tab',0,'', '');
			}
			else
			{
				MessageBox("InfFail", "E", "�Խñ�(UPDATE)");
			}
		break;

		case ALL_DELETE_ID :
			if (DataSet.getParam(DELETE_BOARDLIST_ID, 1, 0, "SUCCESS_COUNT") > 0)
			{
				MessageBox("Success", "I", ""); queryList();

				callTabClick('Tab',0,'', '');
			}
		break;

		case REMOVE_BOARDFILE_ID:
//			if (DataSet.getParam(sServiceID, 1, 0, "SUCCESS_COUNT") > 0)
//			{
				MessageBox("Success", "I", "");
				queryList();
//			}
		break;

		case INSERT_REPLYLIST_ID+","+RPLY_UP_BOARDLIST_ID:
//			if (DataSet.getParam(sServiceID, 1, 0, "SUCCESS_COUNT") > 0)
//			{
				//MessageBox("Success", "I", "");
				queryList1();
//			}
/*			else
			{
				MessageBox("InfFail", "E", "���(INSERT)");
			}
*/		break;

		case UPDATE_REPLYLIST_ID :
			if (DataSet.getParam(sServiceID, 1, 0, "SUCCESS_COUNT") > 0)
			{
				MessageBox("Success", "I", "");
				queryList1();
			}
			else
			{
				MessageBox("InfFail", "E", "���(UPDATE)");
			}
		break;

		case DELETE_REPLYLIST_ID+","+RPLY_DOWN_BOARDLIST_ID:
//			if (DataSet.getParam(sServiceID, 1, 0, "SUCCESS_COUNT") > 0)
//			{
				//MessageBox("Success", "I", "");
				queryList1();
//			}
/*			else
			{
				MessageBox("Fail", "E", "���(DELETE)");
			}
*/		break;

		case FILE_SELECT_ID:

			showUploadFileList();

			queryList1();

		break;

		case FILE_DELETE_ID:

			if (DataSet.getParam("UCCOM030D", 1, 0, "SUCCESS_COUNT") > 0)
			{
				MessageBox("Success", "E", "");

				//���� ÷�������� �������� �ʰ� �ٽ� ÷������ ����Ʈ ��ȸ
				queryUploadFile();
			}
		break;

		case SELECT_REPLYLIST_ID :
			if( f.userid.value != f.rg_id.value )
			{
				readCntPlus();
			}
		break;
		case SELECT_BOARDDETAIL_ID :
			//�������� ����
			var board_cont = f.board_cont.value;
			editor_setHTML('board_cont', board_cont);
			//�б��� ����
			board_cont_html.innerHTML = f.board_cont.value;

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

	divTab[1].style.display = "none";

	setMode("I");
	fQuery.gradecd.value = "01";
	editor();
	queryInfo();

	var g_Obj = document.all("UCINF215S");
	g_Obj.SetColCellMultiLine("rply_cont", true);
    g_Obj.strRowSizing = "autofree";
    g_Obj.nCellPadding = 2;
}

//***********************************
// ONLOAD 2
//***********************************
function init2()
{
//	setMode("I");
}

/********************
* �Խ��� ����Ʈ ��ȸ
********************/
function queryInfo()
{
	var trans = new Trans();
	trans.setPageRow(999);
	trans.setSvc(SELECT_BOARDINFO_ID);
	trans.setWiseGrid("1");
	trans.setForwardId("wgdsl","");
	trans.open("fQuery","f","/wisegrid.do");
}

/********************
* �Խ��� ���α��� ��ȸ
********************/
function getBoardAuth()
{
	var trans = new Trans();
	trans.setSvc(SELECT_BOARDAUTH_ID);
	trans.open("f","","/common.do");
}

/********************
* �Խ��� ��� ��ȸ
********************/
function queryList(gb)
{
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

	if( gb != 1 )
	{
		fQuery.board_tp_seq.value = "";
	}
	setMode("A");

	var girdObj = document.all(SELECT_BOARDLIST_ID);
	girdObj.setParam("rg_dtm_format", "DATET");

	var trans = new Trans();
	trans.setPageRow(999);
	trans.setSvc(SELECT_BOARDLIST_ID);
	//trans.setDefClick(true);
	trans.setMyUserParams("board_except"	, "AND   A.BOARD_TP_SEQ NOT IN (17)");	
	trans.setWiseGrid("1");
	trans.setForwardId("wgdsl","");
	trans.open("fQuery","f","/wisegrid.do");
}

function readCntPlus()
{
	var trans = new Trans();
	trans.setSvc(QRY_UP_BOARDLIST_ID);
	trans.open("f","f","/common.do");
}

/********************
* �Խ��� ��� ��ȸ
********************/
function queryList1()
{
	setMode("RA");

	var girdObj = document.all(SELECT_REPLYLIST_ID);
	//girdObj.SetColCellMultiLine("rply_cont","true");
	girdObj.setParam("rply_rg_dtm_format", "DATET");

	var trans = new Trans();
	trans.setPageRow(999);
	trans.setSvc(SELECT_REPLYLIST_ID);
	trans.setDefClick(true);
	trans.setWiseGrid("1");
	trans.setForwardId("wgdsl","");
	trans.open("f","f","/wisegrid.do");
}

/*****************/
//������
//�׸��� onclick �̺�Ʈ �Լ�
/*****************/
function showDetailB_obj(id, strColumnKey, nRow)
{
	if(DataSet.getTotalCount(id) == "0")
		return;

	switch(id)
	{
		//�Խ��� ����Ʈ Ŭ����
		case SELECT_BOARDLIST_ID:

			callTabClick('Tab',1,'', '');

			setMode("U");

			var g_Obj = document.all(SELECT_BOARDLIST_ID);
			//showDetail(id, nRow, f);
			showDetailByWise(id, nRow, f);
			//f.board_cont.value = DataSet.getParam(id, 1, g_Obj.GetCellValue("rnum", g_Obj.GetActiveRowIndex())-1, "board_cont")
			f.board_seq.value 	= g_Obj.GetCellValue("board_seq", nRow);
			f.up_seq.value 		= g_Obj.GetCellValue("board_seq", nRow);

			var trans = new Trans();
			trans.setSvc(SELECT_BOARDDETAIL_ID);
			trans.open("f","f","/common.do");

			/*//�������� ����
			var board_cont = f.board_cont.value;
			editor_setHTML('board_cont', board_cont);
			//�б��� ����
			board_cont_html.innerHTML = f.board_cont.value;

			cont_read_tr.style.display = "";
			cont_edit_tr.style.display = "none";

			var gridObj = document.all(SELECT_BOARDLIST_ID);

			f.board_seq.value 	= gridObj.GetCellValue("board_seq", nRow);
			f.up_seq.value 		= gridObj.GetCellValue("board_seq", nRow);

			queryUploadFile();
			*/

			//readCntPlus();

		break;
	}
}


function showDetailO_obj(id, strColumnKey, nRow)
{
	if(DataSet.getTotalCount(id) == "0")
		return;

	switch(id)
	{
		//�Խ��Ǹ�� ����Ʈ Ŭ����
		case SELECT_BOARDINFO_ID :

			var g_Obj = document.all(SELECT_BOARDINFO_ID);

			fQuery.board_tp_seq.value = g_Obj.GetCellValue("board_tp_seq", g_Obj.GetActiveRowIndex());

			queryList(1);

		break;

		case SELECT_REPLYLIST_ID :

			setMode("RU");
			g_Reply_idx = nRow;
			showDetailByWise(id, nRow, f);

			var gridObj = document.all(SELECT_REPLYLIST_ID);

			f.rply_seq.value = gridObj.GetCellValue("rply_seq", nRow);


		break;
	}
}

/*****************/
//��Ϲ�ư
/*****************/
function boardAdd()
{
	setMode("A");
}

/**
 * ���� ��ư Ŭ�� �� ���� ���ε� üũ
 */
function checkSave()
{
	if(checkAuth("U") == false) return false;

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

function checkAuth(mode)
{
	var msgId;

	if(mode == "U")
	{
		msgId = "INFAuthFailMod";
	}
	else if(mode == "D")
	{
		msgId = "INFAuthFailDel";
	}

	if(gsXaFlag == "U" && f.userid.value != f.rg_id.value && f.userid.value != "nexfron")
	{
		if(typeof msgId != "undefined")
		{
			MessageBox(msgId, "E", "");
			return false;
		}
	}
}

/**
 * ������ �����͸� üũ�Ѵ�.
 */
function checkSaveData()
{
	if(!f.board_tp_seq.value)
	{
		MessageBox("Required", "E", "�Խ��Ǹ�");
		return false;
	}
	if(!f.board_sbjt.value)
	{
		MessageBox("Required", "E", "����");
		return false;
	}
	if(!f.board_cont.value)
	{
		MessageBox("Required", "E", "����");
		return false;
	}

	if (MessageBox("SavConfirm", "C", "") == false) return false;
}

/*****************/
//�Խù� ����
/*****************/
function save()
{

	if(iUpload.existsUploadFile() == false && checkSaveData() == false) return;

	var svcID;
	var params;

	if (gsXaFlag == "A")
	{
		if (iUpload.existsUploadFile() == true)
		{
			svcID = ALL_INSERT_ID;
		}
		else
		{
			svcID = INSERT_BOARDLIST_ID;
		}
	}
	else
	{
		if (iUpload.existsUploadFile() == true)
		{
			svcID = ALL_UPDATE_ID;
		}
		else
		{
			svcID = UPDATE_ID;
		}
	}

	var tran = new Trans();
	tran.setSvc(svcID);
	//tran.setUserParams(params);
	tran.open("f", "f", "/common.do");

/*
	var queryID;
	var gridObj = document.all(SELECT_BOARDLIST_ID);

	if(g_BoardFlag =="BA")
		queryID		= ALL_INSERT_ID;
	else if(g_BoardFlag =="BU")
		queryID = ALL_UPDATE_ID;

	var tran = new Trans();
	tran.setSvc(queryID);
	tran.open("f","f","/common.do");
*/
}



/*****************/
//������ư
/*****************/
function boardDel()
{
	if(checkAuth("D") == false) return false;
	if (MessageBox("DelConfirm", "C", "��ϵ� ��۵� ���� �����˴ϴ�.") == false) return;

	var tran = new Trans();
	tran.setSvc(ALL_DELETE_ID);
	tran.open("f", "f", "/common.do");
	/*
	if(!f.board_sbjt.value)
	{
		MessageBox("NotSelectedGrid", "E", "");
		return;
	}

	if(!MessageBox("DelConfirm", "C", "��ϵ� ��۵� ���� �����˴ϴ�."))
		return;

	var tran = new Trans();
	tran.setSvc(DELETE_BOARDLIST_ID+","+DELETE_BOARDRPLY_ID);
	tran.open("f","f","/common.do");
	*/
}

/*****************/
//��� ��Ϲ�ư
/*****************/
function replyAdd()
{
	setMode("RA");
}

/*****************/
//��� �����ư
/*****************/
function replySave()
{
	if(!f.rply_cont.value)
	{
		MessageBox("Required", "E", "����");
		f.rply_cont.focus();
		return;
	}

	var msg;
	var queryID;

	if(g_ReplyFlag == "RA")
	{
		msg			= "SavConfirm";
		queryID		= INSERT_REPLYLIST_ID+","+RPLY_UP_BOARDLIST_ID;
	}
	else if(g_ReplyFlag == "RU")
	{
		msg = "ChgConfirm";
		queryID		= UPDATE_REPLYLIST_ID;
	}

	if(!MessageBox(msg, "C", ""))
		return;

	var tran = new Trans();
	tran.setSvc(queryID);
	tran.open("f","f","/common.do");
}

/*****************/
//��� ������ư
/*****************/
function replyDel()
{
	if(!f.rply_cont.value)
	{
		MessageBox("NotSelectedGrid", "E", "");
		return;
	}

	if(!MessageBox("DelConfirm", "C", "���õ� ����� "))
		return;

	var tran = new Trans();
	tran.setSvc(DELETE_REPLYLIST_ID+","+RPLY_DOWN_BOARDLIST_ID);
	tran.open("f","f","/common.do");
}

/********************
* ��庯��
********************/
function setMode(sType)
{
	var inputStatus = false;
	var modifyStatus = false;

	switch(sType)
	{
		case "I":	//�ʱ�ȭ
			inputStatus = true;
			modifyStatus = false;

			setButton(f.btnBoardAdd, false);
			setButton(f.btnBoardSave, true);
			setButton(f.btnBoardDel, true);
			setButton(f.btnSendMail, true);

			setButton(f.board_tp_seq, true);
			setButton(f.board_sbjt, true);
			setButton(f.board_cont, true);
			setButton(f.rply_cont, true);

			setButton(f.btnReplyAdd, true);
			setButton(f.btnReplySave, true);
			setButton(f.btnReplyDel, true);

			gsXaFlag = sType;

		break;

		case "A":		//�Խñ� ���
			gsXaFlag = sType;
			inputStatus = false;
			modifyStatus = true;
			f.board_sbjt.disabled		= false;
			f.board_sbjt.readOnly 		= false;
			f.board_cont.disabled		= false;
			f.board_sbjt.value			= "";
			f.board_cont.value			= "";
			editor_setHTML("board_cont","");
			f.rg_nm.value				= "";
			f.rg_dtm.value				= "";
			f.rply_cont.value			= "";
			f.board_tp_seq.value		= "";

			document.all(SELECT_REPLYLIST_ID).RemoveAllData();

			setButton(f.btnBoardAdd, true);
			setButton(f.btnBoardSave, false);
			setButton(f.btnBoardDel, true);
			setButton(f.btnSendMail, true);

			setButton(f.board_tp_seq, false);
			setButton(f.board_sbjt, false);
			setButton(f.board_cont, false);
			setButton(f.rply_cont, true);

			setButton(f.btnReplyAdd, true);
			setButton(f.btnReplySave, true);
			setButton(f.btnReplyDel, true);

			cont_read_tr.style.display = "none";
			cont_edit_tr.style.display = "";

		break;

		case "U":		//�Խñ� ����
			gsXaFlag = sType;
			inputStatus = false;
			modifyStatus = false;

			setButton(f.btnBoardAdd, false);
			setButton(f.btnBoardSave, false);
			setButton(f.btnBoardDel, false);
			setButton(f.btnSendMail, false);

			setButton(f.board_tp_seq, false);
			setButton(f.board_sbjt, false);
			setButton(f.board_cont, false);
			setButton(f.rply_cont, false);

			setButton(f.btnReplyAdd, false);
			setButton(f.btnReplySave, false);
			setButton(f.btnReplyDel, false);

			f.board_tp_seq.disabled = true;
			f.board_sbjt.readOnly = true;

		break;

		case "RA":		//��� ���

			g_ReplyFlag = sType;

			f.rply_cont.value			= "";

			setButton(f.rply_cont, false);

			setButton(f.btnReplyAdd, true);
			setButton(f.btnReplySave, false);
			setButton(f.btnReplyDel, true);

		break;

		case "RU":		//��� ����

			g_ReplyFlag = sType;

			setButton(f.btnReplyAdd, false);
			setButton(f.btnReplySave, false);
			setButton(f.btnReplyDel, false);

		break;

		default:
		break;

	}

	if(sType == "I" || sType == "A" || sType == "U")
	{
		//upload
		iconDisabled(["icoBig", "icoSmall", "icoUploadFiles", "icoShowFiles"], inputStatus);
		initUploadFile();
		uploadFileDisabled(modifyStatus);
		uploadFormSetDisabled(inputStatus);
	}

}

/*****************/
//��ư Ȱ��/��Ȱ��
/*****************/
function setButton(obj, val)
{
	try
	{
		obj.disabled = val;
	}
	catch(e)
	{
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

/*****************/
//�Խ��� ���� üũ
/*****************/
function setAuth()
{
	if(g_WriteFlag == "1")
	{
		f.btnBoardAdd.disabled = false;
		f.btnBoardSave.disabled = false;
		f.btnBoardDel.disabled = false;
		f.btnReplyAdd.disabled = false;
		f.btnReplySave.disabled = false;
		f.btnReplyDel.disabled = false;

	}
	else
	{
		f.btnBoardAdd.disabled = true;
		f.btnBoardSave.disabled = true;
		f.btnBoardDel.disabled = true;
		f.btnReplyAdd.disabled = true;
		f.btnReplySave.disabled = true;
		f.btnReplyDel.disabled = true;
	}
}

/**
 *	�� �̵�
 **/
function Tab_onclick(index)
{
	for( var i = 0; i < divTab.length; i++ )
	{
		divTab[i].style.display = "none";
	}
	divTab[index].style.display = "";

	if(index == 1)
	{
		initUploadFile();

		showUploadFileList();
	}

}

/**
 * ���ε� ���� ��ȸ
 */
function queryUploadFile()
{
	var tran = new Trans();
	tran.setSvc(FILE_SELECT_ID);
	tran.setPageRow(9999);
	tran.setAsync(false);
	tran.open("f", "f", "/common.do");
}

/**
 * �������� ����
 */
function boardEdit()
{
	f.board_tp_seq.disabled = false;
	f.board_sbjt.readOnly = false;

	cont_read_tr.style.display = "none";
	cont_edit_tr.style.display = "";
}

//���� ����
function sendMail()
{
	if (confirm("�ش� ������ ���Ϸ� �����Ͻðڽ��ϱ�?"))
	{
        var tran=new Trans();
        //tran.setSvc("test01");
        tran.setSvc("SENDMAIL");
        tran.setSvcType("");
        tran.setForwardId("mailresult","");
        //	DEBUG=true;
/*        tran.setMyUserParams("mail_ip","smtp.gmail.com");
        tran.setMyUserParams("mail_port","587")
        tran.setMyUserParams("mail_tls","true")
        tran.setMyUserParams("mail_id","hykim@nexfron.com")
        tran.setMyUserParams("mail_pwd","hykim1004")
*/
        tran.setMyUserParams("mail_from","nexfron@nexfron.com")
//        tran.setMyUserParams("mail_to","hykim@nexfron.com");
        tran.setMyUserParams("mail_to",top.gUserList)
        tran.setMyUserParams("mail_subject",f.board_sbjt.value)
        tran.setMyUserParams("mail_content",board_cont_html.innerHTML)
        tran.setDataSetMode("N");

		var cnt = DataSet.getTotalCount(FILE_SELECT_ID);
		var sList="";
		for (var i = 0; i < cnt; i++)
		{
			var seq		= DataSet.getParam(FILE_SELECT_ID, 1, i, "file_seq");
			var filename = trim(DataSet.getParam(FILE_SELECT_ID, 1, i, "file_nm"));
			var newfilename = trim(DataSet.getParam(FILE_SELECT_ID, 1, i, "new_file_nm"));

			if (sList !="") sList +="";
			sList += f.file_path.value+"/"+UPLOAD_FOLDER_NAME+"/"+newfilename;
		}

        tran.setMyUserParams("mail_file",sList);
		tran.setCallBack("callbackMail");
        tran.open("f","f","/mail.do");
	}
}

function callbackMail(sSvc)
{
	if (DataSet.getParam(sSvc, 1, 0 , "resultcd") == "0")
		alert("������ ���۵Ǿ����ϴ�.");
	else
		alert("������  ���ۿ� �����Ͽ����ϴ�. errCode["+DataSet.getParam(sSvc, 1, 0 , "resultcd")+"]");
}