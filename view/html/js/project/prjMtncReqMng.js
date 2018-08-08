var Gridid, GridstrColumnKey, GridnRow;
var g_frm;
var SELECT_ID			= "UCPRJ020S";
var INSERT_ID			= "UCPRJ020I";
var DELETE_ID			= "UCPRJ020D";
var UPDATE_ID			= "UCPRJ020U";
var FILE_INSERT_ID2		= "UCPRJ128I";
var FILE_INSERT_ID 		= "UCPRJ126I";		//���� �߰�
var FILE_SELECT_ID 		= "UCPRJ126S";		//���� ��ȸ
var FILE_DELETE_ID 		= "UCPRJ126D";		//���ϸ� ����
var FILE_REMOVE_ID 		= "UCPRJ126R";		//���ϸ� ����
var UPLOAD_PATH 		= "UPLOAD_PATH";
var UPLOAD_FOLDER_NAME 	= "sch";
var bFileDelMode		= false;

//***********************************
// ONLOAD
//***********************************/

function init()
{
	setMode("INIT");
}

//***********************************
// queryList ��ȸ
//***********************************/
function queryList()
{
	//setMode("I");
	var girdObj = document.all[SELECT_ID];
	
	girdObj.setParam("rg_dtm_format", "DATET");
	girdObj.setParam("mdf_dtm_format", "DATET");
	girdObj.setParam("sch_cont_format", "UNHTML");
	girdObj.setParam("sch_cont_format", "UNHTML");

	var trans = new Trans();							
	trans.setSvc("UCPRJ020S");					// ����ID
	trans.setPageRow("50");					// 1Page�� �� ���� Row�� ����� ���ΰ�?		
	trans.setDefClick("true");
	trans.setWiseGrid("1");					// wisegrid�� ����ϴ� ��� �ݵ�� �߰�			
	trans.setForwardId("wgdsl","");			// wisegrid�� ����ϴ� ��� �ݵ�� �߰�
	trans.open("fQuery", "f","/wisegrid.do");
}


/********************
* �׸��� Ŭ��
********************/
function showDetailO_obj(id, strColumnKey, nRow)
{
	var GridObj = document.all[id];

	if(id==SELECT_ID)
	{
		showDetailByWise(id, nRow, f);
		f.isRnmDate.checked=false;
		setMode("S");
		if (GridObj.GetCellValue("file_cnt",nRow) > 0)
		{
			queryUploadFile();
		}
	}	
}

function queryUploadFile()
{
	f.up_seq.value = f.sch_seq.value;
	var tran = new Trans();
	tran.setSvc(FILE_SELECT_ID);
	tran.setPageRow(9999);
	tran.setAsync(false);
	tran.setCallBack("showUploadFileList"); 
	tran.open("f", "f", "/common.do");
}

//***********************************
//������Ʈ ��� 
//***********************************/
function Add()
{
	setMode("I");
	//actionMode="U";
}

//***********************************
//������Ʈ ���� 
//***********************************/
function Update()
{
	setMode("U");
	//actionMode="U";
}

//***********************************
// ������Ʈ ���� 
//***********************************/
function saveData()
{
	if(getValidation(f,true)== false) return;
	//���Ͼ��ε� ��
	if (iUpload.existsUploadFile() == true)
	{
		iUpload.upload(UPLOAD_PATH, UPLOAD_FOLDER_NAME);
	}
	else
	{
		save();
	}
}	
//***********************************
// ������Ʈ ���� 
//***********************************/
function save()
{
	if(f.userid.value == "")
	{
		alert("�α��� ������ �����ϴ�. ��α��� �ϼ���.");
		return;
	}
	if(f.clnt_nm.value == "")
	{
		MessageBox("Required", "E", "����");
		f.clnt_nm.focus();
		return;
	}
	
	var svcid = "";
	var sCallback = "";
	if(f.sch_seq.value == "")
	{
		svcid = INSERT_ID;
		if (iUpload.existsUploadFile() == true)
		{
			svcid += ","+FILE_INSERT_ID2;
		}
		sCallback = "callbackInsert()";
	}else
	{
		svcid =  UPDATE_ID;
		sCallback = "callbackUpdate()";
		f.up_seq.value = f.sch_seq.value;
		if (iUpload.existsUploadFile() == true)
		{
			svcid += ","+FILE_INSERT_ID;
		}
	}
	
	var tran=new Trans();
	tran.setCallBack(sCallback);
	tran.setSvc(svcid);
	tran.open("f","","/common.do");
}

//***********************************
// ����
//***********************************/
function Del()
{
	if(f.userid.value == "")
	{
		alert("�α��� ������ �����ϴ�. ��α��� �ϼ���.");
		return;
	}

	if(f.sch_seq.value == "")
	{
		MessageBox("NotChecked", "E", "");
		return;
	}

	if(!MessageBox("DelConfirm", "C", "")) return;
	
	var tran=new Trans();
	tran.setSvc(DELETE_ID+","+FILE_DELETE_ID);
	if (f.file_cnt.value > 0)
	{
		tran.setCallBack("delUploadFileAll");
		bFileDelMode		= true;
	}
	else
	{
		tran.setCallBack("callbackDel");
	}
	tran.setMyUserParams("prg_id",f.prg_id.value);
	tran.setMyUserParams("up_seq",f.sch_seq.value);
	tran.setMyUserParams("sch_seq",f.sch_seq.value);
	tran.open("","","/common.do");
}

//***********************************
//���
//***********************************/
function Cancel()
{
	var GridObj = document.all[SELECT_ID];
	var GridIdx = GridObj.GetActiveRowIndex();
	
	if(GridIdx > -1)
	{
		setMode("S");
		showDetailByWise(SELECT_ID, GridIdx, f);
	}
	else setMode("INIT");
}

//�űԵ���� �ݹ�
function callbackInsert()
{
	if (DataSet.isError(INSERT_ID) == "true") return;
	//insertWiseGridRow(FAQ_SELECT_ID, -1, f)
	//oList.SetCellImage("view", oList.GetActiveRowIndex(), 0);
	setMode(f,"U");
	queryList();
}

//������ �ݹ�
function callbackUpdate()
{
	if (DataSet.isError(UPDATE_ID) == "true") return;
	setMode(f,"U");
	queryList();
}


//������ �ݹ�
function callbackDel()
{	
	
	//removeWiseGridRow  (FAQ_SELECT_ID, oList.GetActiveRowIndex());
	//	setMode("I");
	alert("�����Ͻ� �ڷᰡ ���� �Ǿ����ϴ�.");
	queryList();

}
/********************
* CALLBACK
********************/
function callback(sServiceID)
{
	switch (sServiceID)
	{
		case FILE_DELETE_ID:

			if (DataSet.getParam(FILE_DELETE_ID, 1, 0, "SUCCESS_COUNT") > 0)
			{
				MessageBox("Success", "E", "");
				delUploadFile(f.new_file_nm.value, UPLOAD_FOLDER_NAME, UPLOAD_PATH);

				queryUploadFile();
			}
			break;
		case FILE_REMOVE_ID:	

			if (bFileDelMode==true)	callbackDel();
			bFileDelMode		= false;
			break;
		default:		
			break;
	}
}


/********************
* ��庯��
********************/
function setMode(sType)
{
	gsXaFlag = sType;

	var cntrForm = new Array(
								f.clnt_nm, f.system_nm, f.pgm_nm, f.req_nm, f.req_tel, f.req_date, f.cntr_cd, f.mtnc_cd, 
								f.rnm_mtd_cd, f.rnm_strt_date,  f.rnm_end_date, f.proc_time, f.cf_nm, f.end_yn, 
								f.sch_cont, f.rsn_cont, f.prcs_cont
							);
	
	switch(sType)
	{
		case "INIT":	//�ʱ�ȭ
	 		clear(f);
			
	 		setDisabledObj(cntrForm, true);
			
			f.isRnmDate.checked=false;
			uploadFileDisabled(false);
			initUploadFile();
			if (f.btnAdd)  		f.btnAdd.disabled = false;
			if (f.btnUpdate)  	f.btnUpdate.disabled = true;
			if (f.btnSave)  	f.btnSave.disabled = true;
			if (f.btnDel)  		f.btnDel.disabled = true;
			if (f.btnCancel)  	f.btnCancel.disabled = true;
			
			break;
			
		case "I":	//���
			setDisabledObj(cntrForm, false);
			
	 		clear(f);
	 		
	 		f.system_nm.value = "uCare";
	 		
	 		f.prcs_k_id.value = gInfo.userid.value;
			f.prcs_k_nm.value = gInfo.usernm.value;
			
			f.req_date.value = gInfo.today.value;
			f.rnm_strt_date.value = gInfo.today.value;
			f.rnm_end_date.value = gInfo.today.value;
			
			f.sch_seq.value = "";
			f.up_seq.value  = "";
			
			f.isRnmDate.checked=false;
			uploadFileDisabled(false);
			initUploadFile();
			if (f.btnAdd)  		f.btnAdd.disabled = true;
			if (f.btnUpdate)  	f.btnUpdate.disabled = true;
			if (f.btnSave)  	f.btnSave.disabled = false;
			if (f.btnDel)  		f.btnDel.disabled = true;
			if (f.btnCancel)  	f.btnCancel.disabled = false;
			
			break;
		case "U":	//������ ���			
			setDisabledObj(cntrForm, false);
			
			f.isRnmDate.checked=false;
			uploadFileDisabled(false);
			initUploadFile();
			
			if (f.btnAdd)  		f.btnAdd.disabled = true;
			if (f.btnUpdate)  	f.btnUpdate.disabled = true;
			if (f.btnSave)  	f.btnSave.disabled = false;
			if (f.btnDel)  		f.btnDel.disabled = true;
			if (f.btnCancel)  	f.btnCancel.disabled = false;
			
			break;
		case "S":	//������ ����
			setDisabledObj(cntrForm, true);
			
			f.isRnmDate.checked=false;
			uploadFileDisabled(false);
			initUploadFile();
			if (f.btnAdd)  		f.btnAdd.disabled = false;
			if (f.btnUpdate)  	f.btnUpdate.disabled = false;
			if (f.btnSave)  	f.btnSave.disabled = true;
			if (f.btnDel)  		f.btnDel.disabled = false;
			if (f.btnCancel)  	f.btnCancel.disabled = true;

			break;
		default:
			break;
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
	
	openPopup("/jsp/project/prjMntcPOP.jsp", "", "popup", "0", "300", "800", "565", "toolbar=no,scrollbars=no");
}

/********************
* ������Ʈ â���� ���������� setProject�� ȣ���Ѵ�.
********************/
function setProject(prj_seq, prj_nm, clnt_corp_nm)
{
	g_frm.mtnc_seq.value 	= prj_seq;
	g_frm.mtnc_nm.value 	= prj_nm;
	
	if (g_frm.name == "f")
		g_frm.clnt_nm.value = clnt_corp_nm;

}

/********************
* ������Ʈ Clear��ư
********************/
function del_Project(frm)
{
	frm.mtnc_seq.value = "";
	frm.mtnc_nm.value = "";
	
	if (frm.name == "f")
		frm.clnt_nm.value = "";
}

/********************
* ����� ���ù�ư
********************/
function openUserOrg(frm)
{
	g_frm = frm;
	
	if(typeof(openPopup) == "object")
		openPopup.close();
	
	openPopup("/jsp/common/comUserOrg.jsp", "", "popup", "0", "300", "800", "580", "toolbar=no,scrollbars=no");
}

/********************
* ����� ������(g_pop) â���� ���������� setOrgUserInfo�� ȣ���Ѵ�.
********************/
function setOrgUserInfo(id, nm, cd)
{
	g_frm.prcs_k_id.value = id;
	g_frm.prcs_k_nm.value = nm;

}

/********************
* ����� Clear��ư
********************/
function del_userID(frm)
{
	frm.prcs_k_id.value = "";
	frm.prcs_k_nm.value = "";
}

//***********************************
// checkEnterKey ����Ű
//***********************************
function checkEnterKey()
{
	if(isEnterKey())
	{
		queryList();
	}
}
