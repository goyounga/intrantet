var SELECT_DATA_ID		= "UCINF216S";		//�ڷ� ��ȸ
var INSERT_DATA_ID		= "UCINF122I";		//�ڷ� �߰�
var UPDATE_DATA_ID		= "UCINF121U";		//�ڷ� ����
var DELETE_DATA_ID		= "UCINF122D";		//�ڷ� ����
var REMOVE_FILE_ID		= "UCINF122U";		//���� ���� ����

var g_Flag;			//�����÷���
var g_Data_idx;	//�ڷ� ����Ʈ index
var update_flag = false;

//Upload File
var UPLOAD_PATH 		= "UPLOAD_PATH";
var UPLOAD_FOLDER_NAME 	= "data";

/********************
* �ݹ�
********************/
function callback(sServiceID)
{
	switch (sServiceID)
	{
		case SELECT_DATA_ID :
			break;

		case INSERT_DATA_ID :
			if (DataSet.getParam(sServiceID, 1, 0, "SUCCESS_COUNT") > 0)
			{
				MessageBox("InfSuccess", "I", "");
				queryList();
			}
			else
			{
				MessageBox("InfFail", "E", "�ڷ�(INSERT)");
			}

			break;

		case UPDATE_DATA_ID :
			if (DataSet.getParam(sServiceID, 1, 0, "SUCCESS_COUNT") > 0)
			{
				MessageBox("InfSuccess", "I", "");
				queryList();
			}
			else
			{
				MessageBox("InfFail", "E", "�ڷ�(UPDATE)");
			}

			break;

		case DELETE_DATA_ID :
			if (DataSet.getParam(sServiceID, 1, 0, "SUCCESS_COUNT") > 0)
			{
				MessageBox("Success", "I", "");
				queryList();
			}
			else
			{
				MessageBox("Fail", "E", "�ڷ�(DELETE)");
			}

			break;

		case REMOVE_FILE_ID:
//			if (DataSet.getParam(sServiceID, 1, 0, "SUCCESS_COUNT") > 0)
//			{
				MessageBox("Success", "I", "");
				queryList();
//			}
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
	document.getElementById(SELECT_DATA_ID).strScrollBars = "vertical";
	setMode("INIT");
}
/********************
* �ڷ� ��ȸ
********************/
function queryList()
{
	setMode("A");

	var girdObj = document.all(SELECT_DATA_ID);

	girdObj.setParam("rg_dtm_format", "DATET");
	girdObj.setParam("mdf_dtm_format", "DATET");

	var trans = new Trans();
	trans.setPageRow(999);
	trans.setSvc(SELECT_DATA_ID);
	trans.setMyUserParams(fQuery.searchType.value, trim(fQuery.searchText.value));
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
		case SELECT_DATA_ID:

			setMode("U");
			g_Data_idx = nRow;
			showDetailByWise(id, nRow, f);

			var gridObj = document.all(SELECT_DATA_ID);
			var file_nm;

			f.data_seq.value = gridObj.GetCellValue("data_seq", nRow);

			file_nm = gridObj.GetCellValue("atch_file_nm", nRow);

			f.file_nm.value = 	file_nm;

			if(file_nm)
			{
				document.all("atch_file_nm").innerHTML = file_nm;
				document.all("nbsp_span").innerText = "";
				document.frames("iUpload").fUpload._UPLOAD_FILE.disabled = true;
				document.all("file_span").style.display = "block";
			}
			else
			{
				document.all("atch_file_nm").innerHTML = "";
				document.all("nbsp_span").innerHTML = "&nbsp;";
				document.frames("iUpload").fUpload._UPLOAD_FILE.disabled = false;
				document.all("file_span").style.display = "none";
			}

		break;
	}
}

/*****************/
//��Ϲ�ư
/*****************/
function dataAdd()
{
	setMode("A");
}

/********************
* ���ϸ� �޴� �̺�Ʈ
* iUpload(upload.jsp)�κ��� ȣ��ȴ�.
********************/
function setFileName(oldFileName, newFileName)
{
    f.file_nm.value = newFileName;
    dataSave1();
}

/********************
* ���� �ٿ�ε�
********************/
function openFile()
{
	var gridObj = document.all(SELECT_DATA_ID);
	var file_nm = gridObj.GetCellValue("atch_file_nm", g_Data_idx);

	if(!file_nm)
		return;

	location.href("/jsp/common/downFile.jsp?filename="+escape(encodeURIComponent(file_nm))+"&newfilename=" + escape(encodeURIComponent(file_nm)) + "&delete=NO&foldername=data&filepath=UPLOAD_PATH");
}

/********************
* ���� ���� ����
********************/
function delFile()
{
	var gridObj = document.all(SELECT_DATA_ID);
	var file_nm = gridObj.GetCellValue("atch_file_nm", g_Data_idx);

	if(!file_nm)
		return;

	var trans = new Trans();
	trans.setPageRow("9999");
	trans.setSvc(REMOVE_FILE_ID);
	trans.setForwardId("commonjsp","/jsp/common/removeFile.jsp?filename="+ file_nm +"&foldername=data&filepath=UPLOAD_PATH");
	trans.open("f","f","/forward.do");
}

/*****************/
//�����ư
/*****************/
function dataSave()
{
	if(!f.data_sbjt.value)
	{
		MessageBox("Required", "E", "�ڷ�����");
		return;
	}

	var msg;
	var queryID;

	if(g_Flag == "A" || g_Flag == "INIT")
		msg		= "SavConfirm";
	else if(g_Flag == "U")
		msg		= "ChgConfirm";

	if(!MessageBox(msg, "C", ""))
		return;

	if(iUpload.fUpload._UPLOAD_FILE.value !="")
	{
		iUpload.upload("");
	}
	else
	{
		dataSave1();
	}
}

/*****************/
//�������� ����
/*****************/
function dataSave1()
{
	var queryID;

	if(g_Flag == "A")
		queryID	= INSERT_DATA_ID;
	else if(g_Flag == "U")
		queryID	= UPDATE_DATA_ID;

	var tran = new Trans();
	tran.setSvc(queryID);
	tran.open("f","f","/common.do");
}

/*****************/
//������ư
/*****************/
function dataDel()
{
	if(!f.data_sbjt.value)
	{
		MessageBox("NotSelectedGrid", "E", "");
		return;
	}

	if(!MessageBox("DelConfirm", "C", "�ڷ�"))
		return;

	var tran = new Trans();
	tran.setSvc(DELETE_DATA_ID);
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
			f.data_sbjt.disabled	= true;
		break;

		case "A":		//�ڷ� ���
			f.data_sbjt.disabled	= false;
			f.data_sbjt.value	= "";
			f.rg_nm.value		= "";
			f.rg_dtm.value		= "";
			f.mdf_nm.value		= "";
			f.mdf_dtm.value		= "";
			f.file_nm.value		= "";
			f.data_cont.value	= "";

			var file_path;

			file_path = document.frames("iUpload").fUpload.file_path.value;
			document.frames("iUpload").fUpload.reset();
			document.frames("iUpload").fUpload.file_path.value = file_path;
			document.all("file_span").style.display = "none";
			document.all("nbsp_span").innerHTML = "&nbsp;";
			document.frames("iUpload").fUpload._UPLOAD_FILE.disabled = false;

			f.btnDel.disabled	= true;
		break;

		case "U":
			var file_path;

			file_path = document.frames("iUpload").fUpload.file_path.value;
			document.frames("iUpload").fUpload.reset();
			document.frames("iUpload").fUpload.file_path.value = file_path;

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
