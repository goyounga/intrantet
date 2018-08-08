
var SELECT_NOTICE_ID = "UCSYS061S";
var INSERT_NOTICE_ID = "UCSYS062I";
var UPDATE_NOTICE_ID = "UCSYS063U";
var DELETE_NOTICE_ID = "UCSYS064D";

var SELECT_TARGET_ID = "UCSYS065S";
var DELETE_TARGET_ID = "UCSYS068D"; 

var g_year;				//����⵵
var g_month;			//�����
var g_month1;			//������
var g_day;				//������
var gsXaFlag;			//���
var g_rowIdx;			//���õ� row Index
var popObj;				//popup Object(��������� ����ڸ���Ʈ)


/********************
* ��ü����� ����ȸ
********************/
function getComCorp()
{
	query();
}

/********************
* init
********************/
function init()
{
	editor();

	query();
}

/********************
* �������� ��ȸ
********************/
function query()
{
	getCorp();

	setMode("A");

	var trans = new Trans();
	trans.setSvc(SELECT_NOTICE_ID);
	trans.setDefClick(true);
	trans.setWiseGrid("1");			// wisegrid�� ����ϴ� ��� �ݵ�� �߰�			
	trans.setForwardId("wgdsl","");	// wisegrid�� ����ϴ� ��� �ݵ�� �߰�
	trans.open("fQuery", "f","/wisegrid.do");
}

/*************************
* ��ü������ �����´�.
*************************/
function getCorp()
{
	corp_cd = top.document.all("corp_cd_chng").value;
	corp_nm = top.document.all("corp_nm_chng").value;

	fQuery.corp_cd.value = corp_cd;
	fQuery.corp_nm.value = corp_nm;

//	var params;
//	params = "&corp_cd="+corp_cd;
//	params += "&corp_nm="+corp_nm;
//	
//	return params;
}


/********************
* ���������ȸ
********************/
function tarQuery()
{
	var tran = new Trans();
	tran.setSvc(SELECT_TARGET_ID);
	tran.setWiseGrid("1");			// wisegrid�� ����ϴ� ��� �ݵ�� �߰�			
	tran.setForwardId("wgdsl","");	// wisegrid�� ����ϴ� ��� �ݵ�� �߰�
	tran.open("f2", "","/wisegrid.do");
}

/********************
* ������ �̺�Ʈ
********************/
function showDetailO_obj(id, strColumnKey, nRow)
{
	if(id == SELECT_NOTICE_ID)
	{
		setMode("U");

		g_rowIdx = nRow;

		showDetail(SELECT_NOTICE_ID, nRow, f);

		var gridObj = document.all(SELECT_NOTICE_ID);

		f2.ntce_id.value = gridObj.GetCellValue("ntce_id", nRow);

		editor_setHTML('ntce_txt', f.ntce_txt.value);
		
//		if(DataSet.getParam(SELECT_NOTICE_ID, DataSet.getCurPage(SELECT_NOTICE_ID), nRow, "atch_file_nm")!="")
//		{
//			document.all("file_down").style.display ="";
//			document.all("file_up").style.display ="none";
//		}
//		else
//		{
//			document.all("file_down").style.display ="none";
//			document.all("file_up").style.display ="";
//			
//			iUpload.location.reload();
//		}
		
		tarQuery();
	}
}

/********************
* ��� �̺�Ʈ
********************/
function add()
{
	setMode("A");
	
	var obj = document.all(SELECT_TARGET_ID);
		obj.RemoveAllData();

   	InitUcareData.removeDataSet(SELECT_TARGET_ID);
}

/********************
* ���� �̺�Ʈ
********************/
function save()
{
	var queryID = "";
	
	if(gsXaFlag == "U")
		queryID = UPDATE_NOTICE_ID;
	else if(gsXaFlag == "A")
		queryID = INSERT_NOTICE_ID;
	
	var trans = new Trans();
	trans.setSvc(queryID);
	trans.open("f","","/common.do");	
}

/********************
* ���� �̺�Ʈ
********************/
function del()
{
	if(!MessageBox("DelConfirm", "C", ""))
		return;
	
	var trans = new Trans();
	trans.setSvc(DELETE_NOTICE_ID+","+DELETE_TARGET_ID);	
	trans.open("f","","/common.do");
}



/********************
* ������� ����� ����Ʈ open
********************/
function openUserOrg()
{
	popObj = openPopup("/jsp/system/sysUserOrg.jsp", "ntce_id="+f.ntce_id.value, "UserOrg", "0", "300", "800", "582", "toolbar=no,scrollbars=no");
}

/********************
* ��������� ����
********************/
function targetDel()
{
	var obj	= document.UCSYS065S;
	var user_id		= "";
	var seq			= "";
	
	for(var i=0; i<obj.GetRowCount(); i++)
	{
		if(obj.GetCellValue("userid_chk", i) == "1")	//äũ�Ǿ��ٸ�..
		{	
			//���õ� ����� id
			if(user_id)
				user_id	+=	""+obj.GetCellValue("user_id", i);
			else
				user_id	=	obj.GetCellValue("user_id", i);
				
			if(seq)
				seq +=	""+obj.GetCellValue("insp_obj_seq", i);
			else
				seq =	obj.GetCellValue("insp_obj_seq", i);			
		}
	}

	if(!user_id)
	{
		MessageBox("SYSSelectRow", "E", "");
		return;
	}
	
	if(!MessageBox("SYSUserExempt", "C", ""))
		return;
	
	var params = "&user_id="+user_id+"&seq="+seq;
	
	//����
	var trans = new Trans();
	trans.setSvc(DELETE_TARGET_ID);
	trans.setUserParams(params);
	trans.open("f2", "","/common.do")
}

/********************
* unLoad
********************/
function unLoad()
{
	if(typeof(popObj) == "object")
		popObj.close();
}

/********************
* ���Ͼ��ε� �̺�Ʈ
********************/
function fileUpLoad()
{
	if(!f.ntce_sbjt.value)
	{
		MessageBox("Required", "E", "����");
		return;
	}
	if(!f.ntce_tp_cd.value)
	{
		MessageBox("Required", "E", "�Խñ���");
		return;
	}

	if(!MessageBox("SavConfirm", "C", ""))
		return;
		
		save();
}

/********************
* ���ϸ� �޴� �̺�Ʈ
* iUpload(upload.jsp)�κ��� ȣ��ȴ�.
********************/
function setFileName(filenm) 
{
    f.atch_file_nm.value = filenm;
    save();
}

/********************
* ���� ÷�����ϻ��� �̺�Ʈ
********************/
function fileDel()
{
	var obj = document.all(SELECT_NOTICE_ID);

	var file_nm = obj.GetCellValue("atch_file_nm", g_rowIdx);
	
	if(!file_nm)
		return;
		
	var trans = new Trans();
	trans.setPageRow("9999");
	trans.setSvc(SELECT_NOTICE_ID);
	trans.setForwardId("commonjsp","/jsp/common/removeFile.jsp?file_name="+ file_nm +"&file_path=UPLOAD_PATH");
	//tran.setCallBack("callbackSave");
	trans.open("f","f","/common.do");
}

/********************
* �ݹ�
********************/
function callback(serviceID)
{

	switch(serviceID)
	{
		//��ȸ
		case SELECT_NOTICE_ID:

			break;
			
		case SELECT_TARGET_ID:

			if (DataSet.getTotalCount(SELECT_TARGET_ID) < 1)
				f.btnTargetDel.disabled = true;
			else
				f.btnTargetDel.disabled = false;

			break;
		
		//���
		case INSERT_NOTICE_ID:

			if (DataSet.getParam(serviceID, 1, 0, "SUCCESS_COUNT") > 0)
			{
//				if(iUpload.fUpload._UPLOAD_FILE.value !="")
//					iUpload.location.replace("/jsp/common/upload.jsp?file_path=UPLOAD_PATH");
				MessageBox("InfSuccess", "I", "");

				query();
			}
			else
			{
				MessageBox("InfFail", "E", "");
			}
				
			break;
		
		//����
		case UPDATE_NOTICE_ID:

			if (DataSet.getParam(serviceID, 1, 0, "SUCCESS_COUNT") > 0)
			{
//				if(iUpload.fUpload._UPLOAD_FILE.value !="")
//					iUpload.location.replace("/jsp/common/upload.jsp?file_path=UPLOAD_PATH");
				MessageBox("InfSuccess", "I", "");

				query();
			}
			else
			{
				MessageBox("InfFail", "E", "");
			}
				
			break;
		
		//����
		case DELETE_NOTICE_ID+","+DELETE_TARGET_ID:

			if (DataSet.getParam(DELETE_TARGET_ID, 1, 0, "SUCCESS_COUNT") > 0)

				query();
			else
			{
				MessageBox("Fail", "E", "������");
			}
				
			break;
		
		//��������� ����
		case DELETE_TARGET_ID:

			if (DataSet.getParam(serviceID, 1, 0, "SUCCESS_COUNT") > 0)
				tarQuery();
			else
			{
				MessageBox("Fail", "E", "��������� ���ܸ�");
			}

			break;

		case "UCSYS063_1U":

			if (DataSet.getParam("UCSYS063_1U", 1, 0, "SUCCESS_COUNT") > 0)
			{
//				document.all("file_down").style.display ="none";
//				document.all("file_up").style.display ="";
//			
//				iUpload.location.reload();
				query();
			}	

			break;

		default:
			break;
	}
}

/********************
* ��庯�� �̺�Ʈ
********************/
function setMode(sType)
{
	gsXaFlag = sType;
	switch(sType)
	{
		case "U":
			//��ư ��庯��
			f.btnAdd.disabled		= false;
			f.btnSave.disabled		= false;
			f.btnDel.disabled		= false;
			
			//Elements �ʱ�ȭ
			f.ntce_id.value			= "";
			f.ntce_sbjt.value		= "";
			f.anc_st_dt.value		= "";
			f.anc_end_dt.value		= "";
			f.ntce_tp_cd.value		= "02";
			f.atch_file_nm.value	= "";
			f.ntce_txt.value		= "";
			editor_setHTML('ntce_txt', '');
			f.rg_nm.value			= "";
			f.rg_dtm.value			= "";
			f.mdf_nm.value			= "";
			f.mdf_dtm.value			= "";
			break;
		
		case "A":
			//��ư ��庯��
			f.btnAdd.disabled		= false;
			f.btnSave.disabled		= false;
			f.btnDel.disabled		= true;
			
			//Elements �ʱ�ȭ
			f.ntce_id.value			= "";
			f.ntce_sbjt.value		= "";
			f.anc_st_dt.value		= "";
			f.anc_end_dt.value		= "";
			f.ntce_tp_cd.value		= "02";
			f.atch_file_nm.value	= "";
			f.ntce_txt.value		= "";
			editor_setHTML('ntce_txt', '');
			f.rg_nm.value			= "";
			f.rg_dtm.value			= "";
			f.mdf_nm.value			= "";
			f.mdf_dtm.value			= "";
			break;
		
		default:
			break;
	}
}


//�۳��뿡�� ÷�� ���� Ŭ���� 
function openFile()
	{
	location.href("/jsp/common/downFile.jsp?filename="+f.atch_file_nm.value);
}


//÷�����ϻ���
function delFile(obj)
{	
	if(!MessageBox("DelConfirm", "C", "������"))
		return;
	
	removeFile("UPLOAD_PATH", f.atch_file_nm.value);
	
	var tran=new Trans();
	tran.setSvc("UCSYS063_1U");
	tran.open("f","f","/common.do");
}

/*
// ���ϸ� �ޱ� 
function setFileName(filenm) 
{
    f2.filenm.value = filenm;
    save();
}

//���� �ٿ�ε�
function fileDown(){
    if(iUpload.fUpload._UPLOAD_FILE.value =="")
	{
		save();
	}
	else if(iUpload.fUpload._UPLOAD_FILE.value !="")
	{		
		if( gsXaFlag == "U")
		{	
			//������ ���� ÷������ ����
			fileDel();
		}
		//save�� setFileName(filenm)���ϸ��� �޴µ��� ��.
		iUpload.upload(""); 
	}
}
//��Ͻ�
function add()
{
	setMode(f2,"A");
	editorMode("noticedesc","write");
	editor_setHTML('noticedesc', f2.noticedesc.value);
	comGridDeleteAll(SELECT_INSPECTTARGET_ID,2);
}
*/

//���or������ �������� ��������� 
function getEditorValidation(frm,objname){
	var editor_obj = document.all["_" +objname + "_editor"];	
	if(editor_obj.contentWindow.document.body.innerText.length == 0){
		alert(eval("frm."+objname+".requirednm")+"�� �ʼ� �Դϴ�.");
		editor_obj.contentWindow.document.body.focus();
		return false;
	}
	return true;
}

//����Ű ��ȸ
function checkEnterKey()
{
	if(isEnterKey())
	{
		query();
	}
}

