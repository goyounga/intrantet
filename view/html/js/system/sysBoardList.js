var SELECT_BOARDINFO_ID		= "UCSYS117S";		//�Խ��� ����Ʈ ��ȸ
var SELECT_BOARDAUTH_ID		= "UCSYS118S";		//�Խ��� ���α��� ��ȸ
var SELECT_BOARDLIST_ID		= "UCSYS214S";		//�� ��� ��ȸ

var INSERT_BOARDLIST_ID		= "UCSYS214I";		//�Խñ� ����
var UPDATE_BOARDLIST_ID		= "UCSYS214U";		//�Խñ� ����
var DELETE_BOARDLIST_ID		= "UCSYS214D";		//�Խñ� ����
var DELETE_BOARDRPLY_ID		= "UCSYS216D";		//�Խñۿ� ��ϵ� ��� ���ÿ� ����
var REMOVE_BOARDFILE_ID		= "UCSYS216U";		//�Խñ� ÷������ ����
var QRY_UP_BOARDLIST_ID		= "UCSYS115U";		//�Խñ� ��ȸ�� +1

var SELECT_REPLYLIST_ID		= "UCSYS215S";		//�Խ��Ǵ�� ��ȸ
var INSERT_REPLYLIST_ID		= "UCSYS215I";		//�Խ��Ǵ�� ����
var UPDATE_REPLYLIST_ID		= "UCSYS215U";		//�Խ��Ǵ�� ����
var DELETE_REPLYLIST_ID		= "UCSYS215D";		//�Խ��Ǵ�� ����

var RPLY_UP_BOARDLIST_ID		= "UCSYS116U";		//�Խñ� ��ۼ� +1
var RPLY_DOWN_BOARDLIST_ID		= "UCSYS117U";		//�Խñ� ��ۼ� -1

var g_ReadFlag;		//�б� ����
var g_WriteFlag;	//���� ����
var g_BoardFlag;	//�Խù� �����÷���
var g_ReplyFlag;	//��� �����÷���
var g_Board_idx;	//�Խ��� ����Ʈ index

/********************
* �ݹ�
********************/
function callback(sServiceID)
{
	switch (sServiceID)
	{
		case SELECT_BOARDINFO_ID:
/*			document.all("r_auth_span").innerText = DataSet.getParam(sServiceID, 1, 0, "r_auth_span");
			document.all("w_auth_span").innerText = DataSet.getParam(sServiceID, 1, 0, "w_auth_span");
			document.all("d_auth_span").innerText = DataSet.getParam(sServiceID, 1, 0, "d_auth_span");
*/
			var curpage =(DataSet.getDsAttribute(SELECT_BOARDINFO_ID,"curpage"));
			var cd = new Array();
			var nm = new Array();

			for(var i = 0 ; i < DataSet.getTotalCount(SELECT_BOARDINFO_ID) ; i++){
				cd[i] = DataSet.getParam(SELECT_BOARDINFO_ID, curpage, i, "board_tp_seq");
				nm[i] = DataSet.getParam(SELECT_BOARDINFO_ID, curpage, i, "board_nm");
			}

			setOptions(fQuery.board_nm, cd, nm, false, true);
		break;
		
		case SELECT_BOARDAUTH_ID:

			g_ReadFlag = DataSet.getParam(SELECT_BOARDAUTH_ID, 1, 0, "read_auth_f");
			g_WriteFlag = DataSet.getParam(SELECT_BOARDAUTH_ID, 1, 0, "wrt_auth_f");

			setAuth();
		break;

		case QRY_UP_BOARDLIST_ID :
			queryList1();
		break;

		case INSERT_BOARDLIST_ID :
			if (DataSet.getParam(sServiceID, 1, 0, "SUCCESS_COUNT") > 0)
			{
				MessageBox("Success", "I", "");
				queryList();
			}
			else
			{
				MessageBox("InfFail", "E", "�Խñ�(INSERT)");
			}
		break;
		
		case UPDATE_BOARDLIST_ID :
			if (DataSet.getParam(sServiceID, 1, 0, "SUCCESS_COUNT") > 0)
			{
				MessageBox("Success", "I", "");
				queryList();
			}
			else
			{
				MessageBox("InfFail", "E", "�Խñ�(UPDATE)");
			}
		break;
		
		case DELETE_BOARDLIST_ID+","+DELETE_BOARDRPLY_ID :
//			if (DataSet.getParam(sServiceID, 1, 0, "SUCCESS_COUNT") > 0)
//			{
				MessageBox("Success", "I", "");
				queryList();
//			}
/*			else
			{
				MessageBox("Fail", "E", "�Խñ�(DELETE)");
			}
*/		break;
		
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
				MessageBox("Success", "I", "");
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
				MessageBox("Success", "I", "");
				queryList1();
//			}
/*			else
			{
				MessageBox("Fail", "E", "���(DELETE)");
			}
*/		break;
		
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
	queryInfo();
}

/********************
* �Խ��� ����Ʈ ��ȸ
********************/
function queryInfo()
{
	var trans = new Trans();
	trans.setPageRow(999);
	trans.setSvc(SELECT_BOARDINFO_ID);
	trans.open("fQuery","","/common.do");
}

/********************
* �Խ��� ���α��� ��ȸ
********************/
function getBoardAuth()
{
	var trans = new Trans();
	trans.setSvc(SELECT_BOARDAUTH_ID);
	trans.open("fQuery","","/common.do");
}

/********************
* �Խ��� ��� ��ȸ
********************/
function queryList()
{
	if(!fQuery.board_nm.value)
	{
		MessageBox("Required", "E", "�Խ��Ǹ�");
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
	
	setMode("BA");
	
	var girdObj = document.all(SELECT_BOARDLIST_ID);
	girdObj.setParam("rg_dtm_format", "DATET");
	
	var trans = new Trans();
	trans.setPageRow(999);
	trans.setSvc(SELECT_BOARDLIST_ID);
	trans.setDefClick(true);
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
function showDetailO_obj(id, strColumnKey, nRow)
{
	if(DataSet.getTotalCount(id) == "0")
		return;

	switch(id)
	{
		//�Խ��� ����Ʈ Ŭ����
		case SELECT_BOARDLIST_ID:
		
			setMode("BU");

			g_Board_idx = nRow;

			showDetail(id, nRow, f);
			
			var gridObj = document.all(SELECT_BOARDLIST_ID);
			var file_nm_1, file_nm_2, file_nm_3;
			
			f.board_seq.value = gridObj.GetCellValue("board_seq", nRow);

			file_nm_1 = gridObj.GetCellValue("atch_file_nm_1", nRow);
			file_nm_2 = gridObj.GetCellValue("atch_file_nm_2", nRow);
			file_nm_3 = gridObj.GetCellValue("atch_file_nm_3", nRow);

			if(file_nm_1)
			{
				document.all("nbsp_span_1").innerText = "";
				document.frames("iUpload1").fUpload._UPLOAD_FILE.disabled = true;
				document.all("file_span_1").style.display = "block";
			}
			else
			{
				document.all("nbsp_span_1").innerHTML = "&nbsp;";
				document.frames("iUpload1").fUpload._UPLOAD_FILE.disabled = false;
				document.all("file_span_1").style.display = "none";
			}
/*			if(file_nm_2)
			{
				document.all("nbsp_span_2").innerText = "";
				document.frames("iUpload2").fUpload._UPLOAD_FILE.disabled = true;
				document.all("file_span_2").style.display = "block";
			}
			else
			{
				document.all("nbsp_span_2").innerHTML = "&nbsp;";
				document.frames("iUpload2").fUpload._UPLOAD_FILE.disabled = false;
				document.all("file_span_2").style.display = "none";
			}
			if(file_nm_3)
			{
				document.all("nbsp_span_3").innerText = "";
				document.frames("iUpload3").fUpload._UPLOAD_FILE.disabled = true;
				document.all("file_span_3").style.display = "block";
			}
			else
			{
				document.all("nbsp_span_3").innerHTML = "&nbsp;";
				document.frames("iUpload3").fUpload._UPLOAD_FILE.disabled = false;
				document.all("file_span_3").style.display = "none";
			}
*/
			readCntPlus();
		
		break;
		
		case SELECT_REPLYLIST_ID :
		
			setMode("RU");
			g_Reply_idx = nRow;
			showDetail(id, nRow, f);
			
			var gridObj = document.all(SELECT_BOARDLIST_ID);
			
			f.rply_seq.value = gridObj.GetCellValue("rply_seq", nRow);

		break;
	}
}

/*****************/
//��Ϲ�ư
/*****************/
function boardAdd()
{
	setMode("BA");
}

/********************
* ���ϸ� �޴� �̺�Ʈ
* iUpload(upload.jsp)�κ��� ȣ��ȴ�.
********************/
function setFileName(filenm) 
{
    f.file_nm_1.value = filenm;
    boardSave1();
}

/********************
* ���� �ٿ�ε�
********************/
function openFile(fileno)
{
	var gridObj = document.all(SELECT_BOARDLIST_ID);
	var file_nm = gridObj.GetCellValue("atch_file_nm_"+fileno, g_Board_idx);
	
	if(!file_nm)
		return;

	location.href("/jsp/common/downFile.jsp?filename="+file_nm+"&delete=NO");
}

/********************
* ���� ÷�����ϻ��� �̺�Ʈ
********************/
function delFile(fileno)
{
	var gridObj = document.all(SELECT_BOARDLIST_ID);
	var file_nm = gridObj.GetCellValue("atch_file_nm_"+fileno, g_Board_idx);
	
	if(!file_nm)
		return;

	var params = "filenm="+"atch_file_nm_"+fileno;
	
	var trans = new Trans();
	trans.setPageRow("9999");
	trans.setSvc(REMOVE_BOARDFILE_ID);
	trans.setForwardId("commonjsp","/jsp/common/removeFile.jsp?file_name="+ file_nm +"&file_path=UPLOAD_PATH");
	trans.setUserParams(params);
	trans.open("f","f","/common.do");
}

/*****************/
//�����ư(���� �ִ��� ������ üũ)
/*****************/
function boardSave()
{
	if(!f.board_sbjt.value)
	{
		MessageBox("Required", "E", "����");
		return;
	}
	if(!fQuery.board_nm.value)
	{
		MessageBox("Required", "E", "�Խ��Ǹ�");
		return;
	}
	if(!f.board_cont.value)
	{
		MessageBox("Required", "E", "����");
		return;
	}
	
	if(g_BoardFlag =="BA")
		msg = "SavConfirm";
	else if(g_BoardFlag =="BU")
		msg = "ChgConfirm";
	
	if(!MessageBox(msg, "C", ""))
		return;
	
	if(iUpload1.fUpload._UPLOAD_FILE.value !="")
	{
		document.frames("iUpload1").upload("");
	}
	else
	{
		f.file_nm_1.value = document.all("atch_file_nm_1").innerText;
		boardSave1();
	}
}

/*****************/
//�Խù� ����
/*****************/
function boardSave1()
{	
	var queryID;
	var params = "";
	var gridObj = document.all(SELECT_BOARDLIST_ID);
	
	params += "board_nm="+fQuery.board_nm.value;

	if(g_BoardFlag =="BA")
		queryID		= INSERT_BOARDLIST_ID;
	else if(g_BoardFlag =="BU")
		queryID		= UPDATE_BOARDLIST_ID;
	
	var tran = new Trans();
	tran.setSvc(queryID);
	tran.setUserParams(params);
	tran.open("f","f","/common.do");
}

/*****************/
//������ư
/*****************/
function boardDel()
{		
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
	switch(sType)
	{
		case "INIT":	//�ʱ�ȭ
			f.board_sbjt.disabled		= true;
			f.board_cont.disabled		= true;
			f.rply_cont.disabled		= true;
			
		break;
		
		case "BA":		//�Խñ� ���
		
			g_BoardFlag = sType;
			
			f.board_sbjt.disabled		= false;
			f.board_cont.disabled		= false;
			f.board_sbjt.value		= "";
			f.board_cont.value		= "";
			f.file_nm_1.value			= "";
			f.file_nm_2.value			= "";
			f.file_nm_3.value			= "";
			f.rg_nm.value					= "";
			f.rg_dtm.value				= "";
			f.mdf_nm.value				= "";
			f.mdf_dtm.value				= "";
			
			var file_path;

			file_path = document.frames("iUpload1").fUpload.file_path.value;
			document.frames("iUpload1").fUpload.reset();
			document.frames("iUpload1").fUpload.file_path.value = file_path;
			document.all("file_span_1").style.display = "none";
/*			
			file_path = document.frames("iUpload2").fUpload.file_path.value;
			document.frames("iUpload2").fUpload.reset();
			document.frames("iUpload2").fUpload.file_path.value = file_path;
			document.all("file_span_2").style.display = "none";
			
			file_path = document.frames("iUpload3").fUpload.file_path.value;
			document.frames("iUpload3").fUpload.reset();
			document.frames("iUpload3").fUpload.file_path.value = file_path;
			document.all("file_span_3").style.display = "none";
*/			
		break;
		
		case "BU":		//�Խñ� ����
		
			g_BoardFlag = sType;
			
			var file_path;

			file_path = document.frames("iUpload1").fUpload.file_path.value;
			document.frames("iUpload1").fUpload.reset();
			document.frames("iUpload1").fUpload.file_path.value = file_path;
/*			
			file_path = document.frames("iUpload2").fUpload.file_path.value;
			document.frames("iUpload2").fUpload.reset();
			document.frames("iUpload2").fUpload.file_path.value = file_path;
			
			file_path = document.frames("iUpload3").fUpload.file_path.value;
			document.frames("iUpload3").fUpload.reset();
			document.frames("iUpload3").fUpload.file_path.value = file_path;
*/			
		break;
		
		case "RA":		//��� ���
		
			g_ReplyFlag = sType;
			
			f.rply_cont.disabled	= false;
			f.rply_cont.value			= "";
			
		break;
		
		case "RU":		//��� ����
		
			g_ReplyFlag = sType;
			
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

/*****************/
//�Խ��� ���� üũ
/*****************/
function setAuth()
{
	if(g_WriteFlag == "0")
	{
		document.all("btnBoardAdd").disabled = true;
		document.all("btnBoardSave").disabled = true;
		document.all("btnReplyAdd").disabled = true;
		document.all("btnReplySave").disabled = true;
	}
	else
	{
		document.all("btnBoardAdd").disabled = false;
		document.all("btnBoardSave").disabled = false;
		document.all("btnReplyAdd").disabled = false;
		document.all("btnReplySave").disabled = false;
	}
}
