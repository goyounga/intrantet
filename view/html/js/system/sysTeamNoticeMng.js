
var SELECT_ORG_ID		= "UCCOM009S"; 		//�μ� ��ȸ

var SELECT_NOTICE_ID = "UCSYS120S";
var INSERT_NOTICE_ID = "UCSYS120I";
var UPDATE_NOTICE_ID = "UCSYS120U";
var DELETE_NOTICE_ID = "UCSYS120D";

var SELECT_NOTICE_ID2 = "UCSYS121S";
var INSERT_NOTICE_ID2 = "UCSYS121I";
var DELETE_NOTICE_ID2 = "UCSYS121D";

var setMode ="";
var corp_cd;


/********************
* ��ü����� ����ȸ
********************/
function getComCorp()
{
	team_ntce_query();
}

/********************
* ONLOAD
/*******************/
function init()
{
	editor();
	team_ntce_query();
}

/********************
* ��ȸ
/*******************/
function team_ntce_query()
{		
	getCorp();

	clear(f);

	editor_setHTML('ntce_txt', '');
	document.all("ntce_sbjt").innerHTML ="&nbsp;";
	document.all("rg_nm").innerHTML ="&nbsp;";
	document.all("rg_dtm").innerHTML ="&nbsp;";
	document.all("mdf_nm").innerHTML ="&nbsp;";
	document.all("mdf_dtm").innerHTML ="&nbsp;";

	document.all("atch_file_nm").value ="";
	document.all("team_ntce_id").value ="";
		
	document.all("file_down").style.display ="none";
	document.all("file_up").style.display ="";

	var trans = new Trans();
	trans.setPageRow(50);
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
	var tmp = top.document.all("corp_cd_chng").value;

	if(tmp == corp_cd)
		return;
		
	corp_cd = top.document.all("corp_cd_chng").value;	
	corp_nm = top.document.all("corp_nm_chng").value;
	
	fQuery.corp_cd.value = corp_cd;
	fQuery.corp_nm.value = corp_nm;
	
	makeOrgLCombo(f, corp_cd);
}

/********************
* �����μ� ����Ʈ ��ȸ
********************/
function team_query()
{		
	
	var trans = new Trans();
	trans.setPageRow(50);
	trans.setSvc(SELECT_NOTICE_ID2);
	trans.setWiseGrid("1");			// wisegrid�� ����ϴ� ��� �ݵ�� �߰�			
	trans.setForwardId("wgdsl","");	// wisegrid�� ����ϴ� ��� �ݵ�� �߰�
	trans.setUserParams("&team_ntce_id=" +document.all("team_ntce_id").value);
	trans.open("", "f","/wisegrid.do");
}

/********************
* ������ �̺�Ʈ
********************/
function showDetailO_obj(id, strColumnKey, nRow)
{
	if(id == SELECT_NOTICE_ID)
	{
		setMode = "U";
		g_rowIdx = nRow;

		showDetailByWise(id, nRow, f);

		editor_setHTML('ntce_txt', f.ntce_txt.value);

		var gridObj = document.all(SELECT_NOTICE_ID);
		
//		if(DataSet.getParam(SELECT_NOTICE_ID, DataSet.getCurPage(SELECT_NOTICE_ID), nRow, "filenm")!="")
		if(gridObj.GetCellValue("filenm", nRow)!="")
		{
			document.all("file_down").style.display ="";
			document.all("file_up").style.display ="none";
		}
		else
		{
			document.all("file_down").style.display ="none";
			document.all("file_up").style.display ="";
			
			iUpload.location.reload();
		}
		team_query();
	}
}

/********************
* ��Ϲ�ư�� ������ ��
********************/
function add()
{
	clear(f);

	editor_setHTML('ntce_txt', '');
	document.all("ntce_sbjt").innerHTML ="&nbsp;";
	document.all("rg_nm").innerHTML ="&nbsp;";
	document.all("rg_dtm").innerHTML ="&nbsp;";
	document.all("mdf_nm").innerHTML ="&nbsp;";
	document.all("mdf_dtm").innerHTML ="&nbsp;";

	document.all("atch_file_nm").value ="";
	document.all("team_ntce_id").value ="";
		
	document.all("file_down").style.display ="none";
	document.all("file_up").style.display ="";
	
	var obj = document.all(SELECT_NOTICE_ID2);
  	obj.RemoveAllData();
   	InitUcareData.removeDataSet(SELECT_NOTICE_ID2);
	
	setMode = "A";			//set_mode�� ������� ...	

	f.corp_cd.value = fQuery.corp_cd.value;
}

/********************
* �����ư�� ������ ��  
  setMode�� "A"�϶� �� ���� ��� 
  "U"�� ���� 
********************/
function save()
{
	getCorp();

	if(f.ntce_sbjt.value =="")
	{
		alert("������ �Է����ּ���");
		f.ntce_sbjt.focus();
		return;
	}
	
	if(f.anc_st_dt.value =="")
	{
		alert("�ԽñⰣ�� �Է����ּ���");
		f.anc_st_dt.focus();
		return;
	}
	if(f.anc_st_dt.value =="" && f.anc_end_dt.value =="" )
	{
		alert("�ԽñⰣ�� �Է����ּ���");
		return;
	}
	if(f.ntce_tp_cd.value =="")
	{
		alert("�Խñ����� �������ּ���");
		f.ntce_tp_cd.focus();
		return;
	}
	
	if(setMode =="A")
	{	
		if(!confirm("���� ����Ͻðڽ��ϱ�?")) return;
		if(iUpload.fUpload._UPLOAD_FILE.value !="")
		{
			
			iUpload.upload("");
		}
		else 
		{
			ntce_save();
		}
	}
	
	else if(setMode=="U")
	{
		if(!confirm("�����Ͻðڽ��ϱ�?")) return;
		
		if(iUpload.fUpload._UPLOAD_FILE.value !="")
		{
			iUpload.upload("");
		}
		else 
		{
			ntce_save();
		}
	}
}

function ntce_save()
{
	var queryID = "";
	
	if(setMode == "U")
		queryID = UPDATE_NOTICE_ID;
	else if(setMode == "A")
		queryID = INSERT_NOTICE_ID;
	
	var trans = new Trans();
	trans.setSvc(queryID);
	trans.open("f","","/common.do");
}

function addTeam()
{
	if(DataSet.getTotalCount(SELECT_NOTICE_ID) < 1)
	{
		alert("�߰��� ����������  �������ּ���.");
		return;
	}
	
	if(document.all("up_org_cd").value =="")
	{
		alert("�߰��� ���� ������ �ּ���");
		document.all("up_org_cd").focus();
		return;
	}
	
	if(document.all("org_cd1").value =="")
	{
		alert("�߰��� �μ��� ������ �ּ���");
		document.all("org_cd1").focus();
		return;
	}
	
	var grid = document.getElementById("UCSYS121S");
	var grid_length = grid.GetRowCount();
	
	for(var i=0;i<grid_length;i++)
	{
//		var team_cd = DataSet.getParam("UCSYS121S", DataSet.getCurPage("UCSYS121S"), i, "team_cd");
		var team_cd = grid.GetCellValue("team_cd", i);

		if(document.all("org_cd1").value == team_cd)
		{
			alert("�̹� �߰��� �μ��Դϴ�.");
			return;
		}
	}
	
	if(!confirm("�߰� �Ͻðڽ��ϱ�?"))
		return;
	
	var trans = new Trans();
	trans.setSvc(INSERT_NOTICE_ID2);
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
	trans.setSvc(DELETE_NOTICE_ID+","+DELETE_NOTICE_ID2);
	trans.open("f","","/common.do");
}

/********************
* ��������� ����
********************/
function targetDel()
{
	var obj	= document.UCSYS121S;
	var team_cd			= "";
	var insp_obj_seq	= "";
	
	for(var i=0; i<obj.GetRowCount(); i++)
	{
		if(obj.GetCellValue("selected", i) == "1")	//üũ�Ǿ��ٸ�..
		{
			//���õ� ����� id
			if(team_cd)
				team_cd	+=	""+ obj.GetCellValue("team_cd", i);
			else
				team_cd	+=	""+ obj.GetCellValue("team_cd", i);
				
			if(insp_obj_seq)
				insp_obj_seq	+=	""+ obj.GetCellValue("insp_obj_seq", i);
			else
				insp_obj_seq	+=	""+ obj.GetCellValue("insp_obj_seq", i);
		}
	}

	if(!team_cd)
	{
		MessageBox("SYSSelectRow", "E", "");
		return;
	}
	
	var params = "&team_cd="+team_cd+"&insp_obj_seq="+insp_obj_seq;
	
	if(!MessageBox("SYSUserExempt", "C", ""))
		return;
	
	var trans = new Trans();
	trans.setSvc(DELETE_NOTICE_ID2);
	trans.setUserParams(params);
	trans.open("f", "","/common.do");
}


/********************
//����Ű ��ȸ
********************/
function checkEnterKey()
{
	if(isEnterKey())
	{
		team_ntce_query();
	}
}

/********************
* ���ϸ� �޴� �̺�Ʈ
* iUpload(upload.jsp)�κ��� ȣ��ȴ�.
********************/
function setFileName(filenm) 
{
    f.atch_file_nm.value = filenm;
    ntce_save();
}

/********************
* ÷�����ϻ���
********************/
function delFile(obj)
{
	if (!(confirm("������ �����Ͻðڽ��ϱ�?"))) 
	{
			return;	
	}
	
	removeFile("UPLOAD_PATH", f.atch_file_nm.value);
	
	var tran=new Trans();
	tran.setSvc("UCSYS120_1U");
	tran.open("f","f","/common.do");
}


/********************
//�۳��뿡�� ÷�� ���� Ŭ���� 
********************/
function openFile()
{
	location.href("/jsp/common/downFile.jsp?filename="+f.atch_file_nm.value);
}


/********************
// callback
********************/
function callback(sServiceID)
{
	var sServiceID = sServiceID.split(",");
	
	switch(sServiceID[0])
	{
		case SELECT_NOTICE_ID:
			break;

		case INSERT_NOTICE_ID:

			if (DataSet.getParam(INSERT_NOTICE_ID, 1, 0, "SUCCESS_COUNT") > 0)
			{
				MessageBox("InfSuccess", "I", "");

				if(iUpload.fUpload._UPLOAD_FILE.value !="")
					iUpload.location.replace("/jsp/common/upload.jsp?file_path=UPLOAD_PATH");

				team_ntce_query();
			}
			else
				alert("��� ����");

			break;
		case "UCSYS120_1U":
			if (DataSet.getParam("UCSYS120_1U", 1, 0, "SUCCESS_COUNT") > 0)
			{
				document.all("file_down").style.display ="none";
				document.all("file_up").style.display ="";
			
				iUpload.location.reload();
				team_ntce_query();
			}	
			break;
		case UPDATE_NOTICE_ID:
			if (DataSet.getParam(UPDATE_NOTICE_ID, 1, 0, "SUCCESS_COUNT") > 0)
			{
				
				alert("�����Ǿ����ϴ�");
				if(iUpload.fUpload._UPLOAD_FILE.value !="")
					iUpload.location.replace("/jsp/common/upload.jsp?file_path=UPLOAD_PATH");
				team_ntce_query();
			}	
			break;
		case DELETE_NOTICE_ID:
			if (DataSet.getParam(DELETE_NOTICE_ID, 1, 0, "SUCCESS_COUNT") > 0)
			{
				
				alert("�����Ǿ����ϴ�");
				team_ntce_query();
			}	
			break;
		case INSERT_NOTICE_ID2:
			if (DataSet.getParam(INSERT_NOTICE_ID2, 1, 0, "SUCCESS_COUNT") > 0)
			{
				alert("�߰� �Ǿ����ϴ�");
				document.all("up_org_cd").value="";
				document.all("org_cd1").value="";
				team_query();
			}	
			break;
		case SELECT_NOTICE_ID2:
			break;
		case DELETE_NOTICE_ID2:
			if (DataSet.getParam(DELETE_NOTICE_ID2, 1, 0, "SUCCESS_COUNT") > 0)
			{
				alert("���� �Ǿ����ϴ�");
				team_query();
			}	
			break;
		default:
			break;
	}
}


/********************
* ���� ÷�����ϻ��� �̺�Ʈ
********************/
function fileDel()
{
	var file_nm = DataSet.getParam(SELECT_NOTICE_ID, DataSet.getCurPage(SELECT_NOTICE_ID), g_rowIdx, "atch_file_nm");
	
	if(!file_nm)
		return;
		
	var trans = new Trans();
	trans.setPageRow("9999");
	trans.setSvc(SELECT_NOTICE_ID);
	trans.setForwardId("commonjsp","/jsp/common/removeFile.jsp?file_name="+ file_nm +"&file_path=UPLOAD_PATH");
	//tran.setCallBack("callbackSave");
	trans.open("f","f","/common.do");
}
