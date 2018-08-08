var gsXaFlag = "";
var gsBXaFlag = "";
var gsTabFlag = 0;

var SELECT_ID 			= "UCINF126S";
var INSERT_ID 			= "UCINF126I";
var UPDATE_ID 			= "UCINF126U";
var CHG_UPDATE_ID       = "UCINF126U_2"
var DELETE_ID 			= "UCINF126D";
var CONTENT_SELECT_ID	= "UCINF126S_2";

//������ INSERT �� ��� �������� �����ͼ� ���� ���̺� ���� INSERT �ؾ��ϱ� ������ �� Ʈ��������� ó���Ѵ�. 
//������ UPDATE �� ��쿡�� �������� �̸� �˰� �ֱ� ������ �� Ʈ��������� ó���� �����ϴ�.
var ALL_INSERT_ID 	= "UCINF126I,UCINF127S";		//�� �߰� + ���� ���� ������ ��ȸ
var ALL_INSERT_ID2	= "UCCOM030I";					//���� �߰�
var ALL_UPDATE_ID	= "UCINF126U,UCCOM030I";			//�� ���� + ���� �߰�
var ALL_DELETE_ID 	= "UCINF126D,UCCOM030D";			//�� ����+ ���� ����

var FILE_SELECT_ID 	= "UCCOM030S";		//���� ��ȸ
var FILE_DELETE_ID 	= "UCCOM030D";		//���ϸ� ����
var FILE_REMOVE_ID 	= "removefile";

var OTHERS_SELECT_ID 	= "UCINF126U_2,UCINF126S_2,UCCOM030S";

var gridObj;

//Upload File
var UPLOAD_PATH 		= "UPLOAD_PATH";
var UPLOAD_FOLDER_NAME 	= "notice";

/**
 * Load �� ���� ����
 */
function init()
{
	initAll();
	
	queryList();
}

/**
 * ��ü �ʱ�ȭ
 */
function initAll()
{
	gridObj = getGridObj(SELECT_ID);
	gridObj.setParam("rg_dt_format", "DATE");
	gridObj.setParam("rg_tm_format", "TIME");
	gridObj.setParam("mdf_dt_format", "DATE");
	gridObj.setParam("mdf_tm_format", "TIME");
	
	initForm();

	gsXaFlag = "I";
	gsBXaFlag = gsXaFlag;
	setMode(gsXaFlag);
}

function getGridObj(id)
{
	return document.getElementById(id);
}

/**
 * �� �ʱ�ȭ
 */
function initForm()
{
	f.reset();
	
//	initUploadFile();
	
	document.getElementById("rg_info").innerText = "";
	document.getElementById("mdf_info").innerText = "";
}

/**
 * ��ȸ
 */
function queryList()
{
	if (fQuery.q_datefrom.value != "" && fQuery.q_dateto.value == "")
	{
		fQuery.q_dateto.value = fQuery.q_datefrom.value;
	}
	else if(fQuery.q_datefrom.value == "" && fQuery.q_dateto.value != "")
	{
		fQuery.q_datefrom.value = fQuery.q_dateto.value;
	}
	
	var params = "";
	if(fQuery.q_datefrom.value != "" && fQuery.q_dateto.value != "")
	{
		params = "q_date= AND A.rg_dt BETWEEN '" + removeMask(fQuery.q_datefrom.value) + "' AND '" + removeMask(fQuery.q_dateto.value) + "'";
	}

	if (getValidation(fQuery, true) == false) return;
	if (checkTermDate(fQuery.q_datefrom, fQuery.q_dateto, true, true) == false) return;

	comSearch(fQuery);
	
	var tran = new Trans();
	tran.setSvc(SELECT_ID);
	tran.setPageRow(50);
	tran.setWiseGrid("1");
	tran.setForwardId("wgdsl","");
	tran.setDefClick(true);
	tran.setUserParams(params);
	tran.open("fQuery", "f", "/wisegrid.do");
}

/**
 * �޺��ڽ��� �ؽ�Ʈ�ڽ� �ΰ��� ��� ����Ͽ� �˻��ϴ� ��� ����Ѵ�.
 * f : ��
 */
function comSearch(f)
{
	//�ʱ�ȭ
	for(var i = 0 ; i < f.searchtype.length ; i++)
	{
		eval(f.name + "." + f.searchtype.options[i].value + ".value = ''");
	}

	//���� ������ ���� �˻�� hidden�� �Ҵ��Ѵ�.
	if(f.searchstr.value != "")
	{
		eval(f.name + "." + f.searchtype.value + ".value = " + f.name + ".searchstr.value");
	}
}

/**
 * ����Ʈ Ŭ�� ��
 * id : Grid ID
 * strColumnKey : ���� ���õ� �÷���
 * nRow : Row ��ȣ
 */
function showDetailO_obj(id, strColumnKey, nRow)
{
	if(id == SELECT_ID)
	{		
		showDetailByWise(SELECT_ID, nRow, f);

		var rg_id = gridObj.GetCellValue("rg_id", nRow);
		var rg_nm = gridObj.GetCellValue("rg_nm", nRow);
		var rg_dt = gridObj.GetCellValue("rg_dt", nRow);
		var rg_tm = gridObj.GetCellValue("rg_tm", nRow);
		
		var mdf_id = gridObj.GetCellValue("mdf_id", nRow);
		var mdf_nm = gridObj.GetCellValue("mdf_nm", nRow);
		var mdf_dt = gridObj.GetCellValue("mdf_dt", nRow);
		var mdf_tm = gridObj.GetCellValue("mdf_tm", nRow);
		
		document.getElementById("rg_info").innerText = rg_nm + " / " + rg_dt + " " + rg_tm;
		document.getElementById("mdf_info").innerText = mdf_nm + " / " + mdf_dt + " " + mdf_tm;
		
		CURINDEX = nRow;
		gsXaFlag = "U";
		gsBXaFlag = gsXaFlag;
		setMode(gsXaFlag);
		
		f.up_seq.value = gridObj.GetCellValue("notice_seq", nRow);		//���� ���ε�, ���� �� ���
		
		if(rg_id != f.userid.value)
		{
			f.qry_cnt.value = Number(gridObj.GetCellValue("qry_cnt", nRow)) + 1;
			gridObj.SetCellValue("qry_cnt", nRow, f.qry_cnt.value);
		}
		//�׿� ����
		queryOthers();
	}
}

/**
 * �ű� ��ư Ŭ�� ��
 */
function add()
{
	if (gsXaFlag == "U")
	{
		gsBXaFlag = gsXaFlag;
	}

	initForm();

	gsXaFlag = "A";
	setMode(gsXaFlag);
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

/**
 * ������ �����͸� üũ�Ѵ�.
 */
function checkSaveData()
{
	if (getValidation(f, true) == false) return false;
	if (MessageBox("SavConfirm", "C", "") == false) return false;
}

/**
 * ���� ���� ����
 */
function save()
{
	if(iUpload.existsUploadFile() == false && checkSaveData() == false) return;

	var svcID;
	var params;

	if (gsXaFlag == "A")
	{
		svcID = ALL_INSERT_ID;
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
}

/**
 * ���� ���� ����
 */
function del()
{
	if(checkAuth("D") == false) return false;
	if (MessageBox("DelConfirm", "C", "") == false) return;

	var tran = new Trans();
	tran.setSvc(ALL_DELETE_ID);
	tran.open("f", "f", "/common.do");
}

/**
 * ��� ����
 */
function cancel()
{
	if (gsBXaFlag == "U")
	{
		setMode(gsBXaFlag);
		showDetailO_obj(SELECT_ID, "", CURINDEX);	//���� ���õǾ��� Row ����
	}
	else
	{
		initForm();

		gsXaFlag = "I";
		setMode(gsXaFlag);
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

	if(gsXaFlag == "U" && f.userid.value != f.rg_id.value)
	{
		if(typeof msgId != "undefined")
		{
			MessageBox(msgId, "E", "");
			return false;
		}
	}
}
/**
 * �׿� ��ȸ
 */
function queryOthers()
{
	var tran = new Trans();
	tran.setSvc(OTHERS_SELECT_ID);
	tran.setPageRow(9999);
	tran.open("f", "f", "/common.do");
}

/**
 * ���ε� ���� ��ȸ
 */
function queryUploadFile()
{
	var tran = new Trans();
	tran.setSvc(FILE_SELECT_ID);
	tran.setPageRow(9999);
	tran.open("f", "f", "/common.do");
}

/**
 * Callback
 * svcID : tran open �� setSvc�� �������� QueryID
 */
function callback(svcID)
{
	switch (svcID)
	{
		case SELECT_ID:

			initForm();
		
			gsXaFlag = "I";
			gsBXaFlag = gsXaFlag;
			setMode(gsXaFlag);
			
			setGridColor();
			
			break;
			
		case ALL_INSERT_ID2 :
			
			afterInsert();
			
			break;
			
		case ALL_INSERT_ID:

			if (iUpload.existsUploadFile() == true)
			{
				f.up_seq.value = DataSet.getParam("UCINF127S", 1, 0, "seq");
			
				insertUpFile();
			}
			else
			{
				f.up_seq.value = DataSet.getParam("UCINF127S", 1, 0, "seq");

				afterInsert();
			}
			break;

		case ALL_UPDATE_ID:
		case UPDATE_ID:

			if (DataSet.getParam(UPDATE_ID, 1, 0, "SUCCESS_COUNT") > 0)
			{
				setDataForWiseGrid("UPDATE");

				updateWiseGridRow(SELECT_ID, CURINDEX, f);

				setGridColor();
				
				initForm();
				
				gsXaFlag = "I";
				gsBXaFlag = gsXaFlag;
				setMode(gsXaFlag);
			}
			break;

		case ALL_DELETE_ID:

			if (DataSet.getParam(DELETE_ID, 1, 0, "SUCCESS_COUNT") > 0)
			{
				MessageBox("Success", "E", "");

				removeWiseGridRow(SELECT_ID, CURINDEX);

				initForm();

				gsBXaFlag = gsXaFlag;
				gsXaFlag = "I";
				setMode(gsXaFlag);
			}
			break;

		case OTHERS_SELECT_ID:

			showContent();

			showUploadFileList();
			
			break;

		case FILE_SELECT_ID:

			showUploadFileList();

			break;

		case FILE_DELETE_ID:

			if (DataSet.getParam("UCCOM030D", 1, 0, "SUCCESS_COUNT") > 0)
			{
				MessageBox("Success", "E", "");

				//���� ÷�������� �������� �ʰ� �ٽ� ÷������ ����Ʈ ��ȸ
				queryUploadFile();
			}
			break;
	}
}

function afterInsert()
{
	if (DataSet.getParam(INSERT_ID, 1, 0, "SUCCESS_COUNT") > 0)
	{				
		var gRow;

		//�׸��忡 �����Ͱ� ������� -1 ���� ��� 0�� �����Ѵ�.
		if(DataSet.getTotalCount(SELECT_ID) == 0)
		{
			gRow = -1;
		}
		else
		{
			gRow = 0;
		}
		
		setDataForWiseGrid("INSERT");

		insertWiseGridRow(SELECT_ID, gRow, f);
		//mail ����
//		sendMail();

		setGridColor();
		
		initForm();

		gsXaFlag = "I";
		gsBXaFlag = gsXaFlag;
		setMode(gsXaFlag);
		
	}
}

/**
 * ���, ������ �� �� ��������� �������� �� �� ���� ���� ���� ó���Ѵ�.
 * flag : INSERT ��� UPDATE ����
 */
function setDataForWiseGrid(flag)
{
	var curdt = getCurDay("-", "");
	var curtm = getCurDay(":", "T");
	
	//����
	if(flag == "UPDATE")
	{
		f.notice_type_nm.value = f.notice_type.value;
		
		f.mdf_dt.value = curdt;
		f.mdf_tm.value = curtm;
		f.mdf_id.value = f.userid.value;
		f.mdf_nm.value = f.usernm.value;
	}
	//���
	else if(flag == "INSERT")
	{
		f.notice_seq.value = f.up_seq.value;
		f.qry_cnt.value = 0;
		f.notice_type_nm.value = f.notice_type.value;
		
		f.rg_dt.value = curdt;
		f.rg_tm.value = curtm;
		f.rg_id.value = f.userid.value;
		f.rg_nm.value = f.usernm.value;

		f.mdf_dt.value = curdt;
		f.mdf_tm.value = curtm;
		f.mdf_id.value = f.userid.value;
		f.mdf_nm.value = f.usernm.value;
	}
}

/**
 * ��忡 ������ ��ư ����
 * sType : I:���, S:����
 */
function setMode(sType)
{
	//Input
	var arrInput = new Array(f.notice_type, f.notice_sbjt, f.notice_cont, f.valid_strt_dt, f.valid_end_dt);

	var inputStatus = false;
	var modifyStatus = false;
	
	if (!f) f = document.forms[0];

	switch (sType)
	{
		case "I"://�ʱ�ȭ
			inputStatus = true;
			modifyStatus = true;

			setButton(f.btnAdd, false);
			setButton(f.btnSave, true);
			setButton(f.btnDel, true);
			setButton(f.btnSendMail, true);
			
			break;

		case "A"://�߰�
			inputStatus = false;
			modifyStatus = true;

			setButton(f.btnAdd, true);
			setButton(f.btnSave, false);
			setButton(f.btnDel, true);
			setButton(f.btnSendMail, true);

			break;

		case "U"://����
			inputStatus = false;
			modifyStatus = false;

			setButton(f.btnAdd, false);
			setButton(f.btnSave, false);
			setButton(f.btnDel, false);
			setButton(f.btnSendMail, false);

			break;

	}
	
	setDisabledObj(arrInput, inputStatus);			//Input Boxes Set Disabled
	
	//upload
	iconDisabled(["icoBig", "icoSmall", "icoUploadFiles", "icoShowFiles"], inputStatus);
	initUploadFile();
	uploadFileDisabled(modifyStatus);
	uploadFormSetDisabled(inputStatus);
}


/**
 *���Ͼ��ε� �� ���� ������ ��ȸ �� �� INSERT �ϱ� ����
 */
function insertUpFile()
{
	var tran = new Trans();
	tran.setSvc(ALL_INSERT_ID2);
	tran.open("f","f","/common.do");
}


/**
 * ���� ���
 */
function showContent()
{
	var notice_cont = DataSet.getParam(CONTENT_SELECT_ID, 1, 0, "notice_cont");

	f.notice_cont.value = notice_cont;
}

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

/**
 *	����� ������ �˾�
 **/
var popupGubun = ""
function openUserOrg(gb)
{
	popupGubun = gb;

	window.open("/jsp/common/comUserOrg.jsp" ,"UserOrg", "width=800,height=545");
}

//��������� ����
function setOrgUserInfo(user_id, user_name)
{
	if(popupGubun == "q_rg_id"){
		fQuery.q_rg_id.value = user_id;
		fQuery.q_rg_nm.value = user_name;
	}
}

/**
 * �ۼ��� onBlur
 */
function userid_onBlur(gb)
{
	if(gb == "q_rg_id"){
		fQuery.q_rg_id.value = "";
		fQuery.q_rg_nm.value = "";
	}
}

/**
 * �׸��� �� ����
 */
function setGridColor()
{
	for(var i = 0 ; i < gridObj.GetRowCount(); i ++)
	{
		//���� �� ��� ���� ����
		if(gridObj.GetCellValue("notice_type", i) == "02")
		{
			gridObj.SetCellFgColor("notice_sbjt", i, '255|90|0');
			gridObj.SetCellFontBold('notice_sbjt', i, 'true');
			gridObj.SetCellFgColor("notice_type_nm", i, '255|0|0');
			gridObj.SetCellFontBold('notice_type_nm', i, 'true');
		}
	}
}

function sendMail()
{
	if (confirm("�ش� ������ ���Ϸ� �����Ͻðڽ��ϱ�?"))
	{
        var tran=new Trans();
        //tran.setSvc("test01");
//        DEBUG=true;
        tran.setSvc("SENDMAIL");
        tran.setSvcType("");
        tran.setForwardId("mailresult","");
        //	DEBUG=true;
        tran.setMyUserParams("mail_from","ibeigns@nexfron.com")
        tran.setMyUserParams("mail_to",top.gUserList)
//        tran.setMyUserParams("mail_to","hykim@nexfron.com,paye18@daum.net")
        tran.setMyUserParams("mail_subject",f.notice_sbjt.value)
        tran.setMyUserParams("mail_content",f.notice_cont.value)
/*
		if (iUpload.existsUploadFile())
		{
			var sFileName=f.new_file_nm.value;
			var aFileName=sFileName.split("");
			var sList="";
			for (var i = 0; i < aFileName.length; i++)
			{
				if (sList !="") sList +="";
				sList += f.file_path.value+"/"+UPLOAD_FOLDER_NAME+"/"+aFileName[i];
			}
	        tran.setMyUserParams("mail_file",sList);
		}*/
			
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