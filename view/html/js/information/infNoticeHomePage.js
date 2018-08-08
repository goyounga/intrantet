/**
 * PROJECT : INTRANET
 * NAME    : infNoticeHomePage.js
 * DESC    : Ȩ���������� ����
 * AUTHOR  : ���ر� ����
 * VERSION : 1.0
 * Copyright �� 2010 Nexfron. All rights reserved.
 * ============================================================================================
 * 							��		��		��		��
 * ============================================================================================
 * VERSION	   DATE		  	AUTHOR		DESCRIPTION
 * ============================================================================================
 * 1.0		2011.10.20		���ر�		����
 */

var SELECT_BOARD_ID		= "UCINF210S";		//�Խ��Ǹ���Ʈ ��ȸ
var SELECT_ID 			= "UCINF126S";		//��ȸ
var INSERT_ID 			= "UCINF126I";		//���
var SEQ_SELECT_ID		= "UCINF127S";		//SEQ��ȸ
var UPDATE_ID 			= "UCINF126U";		//����
var DELETE_ID 			= "UCINF126D";		//����
var CHG_UPDATE_ID       = "UCINF126U_2"		//��ȸȽ��������Ʈ
var CONTENT_SELECT_ID	= "UCINF126S_2";	//����������ȸ
var FILE_INSERT_ID 		= "UCINF132I";		//���ε� ���� DB INSERT
var FILE_INSERT_ID2		= "UCCOM030I";		//���ε� ���� DB INSERT2 - param��
var FILE_REMOVE_ID 		= "UCPRJ126R";		//���� ���� svcID
var FILE_DELETE_ID 		= "UCCOM030D";		//���� ����
var FILE_SELECT_ID 		= "UCCOM030S";		//���� ��ȸ
var OTHERS_SELECT_ID 	= CHG_UPDATE_ID +","+ CONTENT_SELECT_ID +","+ FILE_SELECT_ID;	//��ȸȽ��������Ʈ+����������ȸ

var UPLOAD_PATH 		= "UPLOAD_PATH";
var UPLOAD_FOLDER_NAME 	= "homepage";
var bFileDelMode 		= false;	//���ϻ�������

var SELECT_BOARDAUTH_ID	= "UCINF118S";		//�Խ��� ���α��� ��ȸ
var gbUseYn				= false;			//������
var gbReadAuth			= false;			//�б����
var gbWriteAuth			= false;			//�������

var gridBrd				= null;				//�Խ��Ǳ׸���
var gridObj				= null;				//�׸��尴ü
var gsCurrow			= -1;				//���÷ο�
var gsXaFlag 			= "";				//ȭ�����
var arrInput			= null;				//�������迭
var arrButton			= null;				//��ư�迭
var arrQuery			= null;				//��ȸ���迭
var aBtnMode			=					//��ư���
[
	//���	, ����	, ����	, ����	, ���	, ��ȸ	    //��ư / ����
	[ false , true  , true  , true  , true	, false	] ,	// I   : ����
	[ false , false , false , true  , true	, false	] ,	// V   : ����
	[ true  , true  , true  , false , false , false	] ,	// A   : ���
	[ true  , true  , true  , false , false , false	] ,	// U   : ����
	[ true  , true  , true  , true  , true  , true 	]	// X   : ���ŷ
];
/**
 * init
 */
function init()
{
	gridBrd = document.getElementById(SELECT_BOARD_ID);
	gridBrd.strScrollBars = "vertical";
	gridBrd.bStatusbarVisible = false;
	gridObj = document.getElementById(SELECT_ID);
	arrInput  = new Array(f.notice_type, f.notice_sbjt, f.notice_cont, f.board_tp_seq, f.pwd);
	arrButton = new Array(f.btnAdd, f.btnUpd, f.btnDel, f.btnSave, f.btnCan, fQuery.btnsearch);
//	arrQuery  = new Array(fQuery.q_datefrom, fQuery.q_dateto,  fQuery.notice_type
	//					 ,fQuery.searchtype, fQuery.searchstr, fQuery.q_rg_id);
	setDisabledObj(arrQuery, true);
	setMode("X");
	//queryList();
	getBoardAuth();
}
/**
 * �Խ��� ���α��� ��ȸ
 */
function getBoardAuth()
{
	var tran = new Trans();
	tran.setSvc(SELECT_BOARDAUTH_ID);
	tran.setMyUserParams("board_tp_seq"	, fQuery.board_tp_seq.value);
	//tran.setMyUserParams("board_tp_seq"	, 17);
	tran.setMyUserParams("userid"		, f.userid.value);
	tran.setCallBack("callbackGetBoardAuth");
	tran.open("","","/common.do");
}
/**
 * �Խ��� ���α��� ��ȸ �ݹ�
 * svcid : service id
 */
function callbackGetBoardAuth(svcid)
{
	if (DataSet.isError(svcid) == "true") return;

	if(DataSet.getTotalCount(svcid) > 0)
	{
		gbUseYn 	= true;
		gbReadAuth	= (DataSet.getParam(SELECT_BOARDAUTH_ID, 1, 0, "read_auth_f")=="1")?true:false;
		gbWriteAuth	= (DataSet.getParam(SELECT_BOARDAUTH_ID, 1, 0, "wrt_auth_f" )=="1")?true:false;
		setMode("I");

		if(gbUseYn&&gbReadAuth)
		{
			setDisabledObj(arrQuery, false);
			queryBoardList();
		}
	}else{
		setDisabledObj(arrQuery, true);
	}
}
/**
 * ��忡 ������ ��ư ����
 * sType : I:�ʱ�ȭ, A:���, U;����, X:���ŷ
 */
function setMode(sType)
{
	gsXaFlag 	= sType;	//ȭ����
	var btnMode = -1;		//��ư���
	var frmMode = false;	//�����

	switch (sType)
	{
		case "I"	:	frmMode = true;		btnMode = 0;	f.reset();	gsCurrow = -1;

						iconDisabled(["icoBig", "icoSmall", "icoUploadFiles", "icoShowFiles"], true);//���۹�ư ��Ʈ��
						initUploadFile();			//�ʱ�ȭ
						uploadFileDisabled(false);	//������ : false:���, true:�Է���
						//uploadFormSetDisabled(true);//���Ϲڽ� ���
						
						break;
		case "V"	:	frmMode = true;		btnMode = 1;

						iconDisabled(["icoBig", "icoSmall"], false);
						iconDisabled(["icoUploadFiles", "icoShowFiles"], true);
					//	initUploadFile();
						uploadFileDisabled(false);	//������
					//	uploadFormSetDisabled(false);

						break;
		case "A"	:	frmMode = false;	btnMode = 2;	f.reset();

						iconDisabled(["icoBig", "icoSmall", "icoUploadFiles", "icoShowFiles"], true);//���۹�ư ��Ʈ��
						initUploadFile();			//�ʱ�ȭ
						uploadFileDisabled(false);	//������ : false:���, true:�Է���	

						/*
						iconDisabled(["icoBig", "icoSmall"], false);
						iconDisabled(["icoUploadFiles", "icoShowFiles"], true);
						initUploadFile();
						uploadFileDisabled(true);	//������
					//	uploadFormSetDisabled(false);
						*/

						f.file_nm.value 	= "";
						f.new_file_nm.value = "";					

						break;
		case "U"	:	frmMode = false;	btnMode = 3;
		
						iconDisabled(["icoBig", "icoSmall"], false);
						iconDisabled(["icoUploadFiles", "icoShowFiles"], false);
						iUpload.init();	//initUploadFile();
					//	uploadFileDisabled(false);	//������

						f.file_nm.value 	= "";
						f.new_file_nm.value = "";

						break;
		case "X" 	:	frmMode = true;		btnMode = 4;
						break;
	}

	//��ư
	for( var i=0; i<arrButton.length; i++ )
	{
		setButton( arrButton[i], aBtnMode[btnMode][i]);
	}

	//��
	setDisabledObj(arrInput, frmMode);

	//��-����-password
	f.pwd.readOnly	= frmMode;
	f.pwd.className = (frmMode == true ? "input_readonly" : "input_required");

	if(frmMode)
	{
		document.getElementById("btnList"  ).style.display = "";
		document.getElementById("btnDetail").style.display = "none";
	}else{
		document.getElementById("btnList"  ).style.display = "none";
		document.getElementById("btnDetail").style.display = "";
	}

	if(!gbWriteAuth)
	{
		setButton(f.btnAdd,true);
		setButton(f.btnUpd,true);
		setButton(f.btnDel,true);
	}

	if(sType=="U")
	{
		setDisabledObj([f.board_tp_seq], true);
		if(f.board_tp_seq.value=="16")
		{
			setDisabledObj([f.notice_type], false);
			f.pwd.readOnly	= true;
			f.pwd.className = "input_readonly";
		}else{
			setDisabledObj([f.notice_type], true );
			f.pwd.readOnly	= false;
			f.pwd.className = "input_required";
		}
	}
}
/**
 * �Խ��� ���� ��ȸ
 */
function queryBoardList()
{
	var trans = new GridTrans();
	trans.setPageRow(99999);
	trans.setSvc(SELECT_BOARD_ID);
	trans.setWiseGrid("1");
	trans.setForwardId("wgdsl","");
	trans.setDefClick(true);
	trans.setCallBack("callbackQueryBoardList");
	trans.setMyUserParams("use_f"	 , "Y");
	trans.setMyUserParams("board_knd", "03");
	trans.open("","","/wisegrid.do");
}
/**
 * �Խ��� ���� ��ȸ �ݹ�
 */
function callbackQueryBoardList(svcid)
{
}
/**
 * �Խñ� ��ȸ
 */
function queryList()
{
	if(!gbUseYn||!gbReadAuth){return;}
	//if(!gbReadAuth){MessageBox("", "I", "��ȸ ������ �����ϴ�.\n\n�����ڿ��� ���� �ٶ��ϴ�.");return;}	//INFAuthFailRead

	if (fQuery.q_datefrom.value != "" && fQuery.q_dateto.value == "")
	{
		fQuery.q_dateto.value = fQuery.q_datefrom.value;
	}
	else if(fQuery.q_datefrom.value == "" && fQuery.q_dateto.value != "")
	{
		fQuery.q_datefrom.value = fQuery.q_dateto.value;
	}

	if (getValidation(fQuery, true) == false) return;
	if (checkTermDate(fQuery.q_datefrom, fQuery.q_dateto, true, true) == false) return;

	gridObj.setParam("rg_dt_format"  , "DATE");	//DATE�� tag�� ������ format�� GetCellValue���� ������ �������� ���Ѵ�
	gridObj.setParam("rg_tm_format"  , "TIME");
	gridObj.setParam("mdf_dt_format" , "DATE");
	gridObj.setParam("mdf_tm_format" , "TIME");

	var tran = new GridTrans();
	tran.setSvc(SELECT_ID);
	tran.setPageRow(50);
	tran.setWiseGrid("1");
	tran.setForwardId("wgdsl","");
	if(trim(fQuery.searchstr.value)!="")
	{
		tran.setMyUserParams(fQuery.searchtype.value, fQuery.searchstr.value);
	}
	tran.setCallBack("callbackQueryList");
	//tran.setDefClick(true);
	tran.open("fQuery", "f", "/wisegrid.do");
}
/**
 * �׸��� ��ȸ �ݹ�
 * svcid : service id
 */
function callbackQueryList(svcid)
{
	if (DataSet.isError(svcid) == "true") return;
	setMode("I");
	setGridColor();
}
/**
 * �׸��� �� ����
 * ���� �� ��� ���� ����
 */
function setGridColor()
{
	if(fQuery.board_tp_seq.value == "16")	//Ȩ���������� �϶���
	{	
		var notice_type = "";
	
		for(var i=0 ; i<gridObj.GetRowCount(); i++)
		{
			notice_type = gridObj.GetCellHiddenValue("notice_type",i);
			if( notice_type=="01" )
			{
				gridObj.SetCellFgColor("notice_sbjt"	, i, "51|51|51");
				gridObj.SetCellFgColor("notice_type"	, i, "51|51|51" );
				gridObj.SetCellFontBold("notice_sbjt"	, i, "false");
				gridObj.SetCellFontBold("notice_type"	, i, "false");
			}else{
				gridObj.SetCellFgColor("notice_sbjt"	, i, "255|90|0");
				gridObj.SetCellFgColor("notice_type"	, i, "255|0|0" );
				gridObj.SetCellFontBold("notice_sbjt"	, i, "true");
				gridObj.SetCellFontBold("notice_type"	, i, "true");
			}
		}
	}
}
/**
 * ����Ʈ Ŭ�� ��
 * id           : Grid ID
 * strColumnKey : ���� ���õ� �÷���
 * nRow         : Row ��ȣ
 */
function showDetailO_obj(id, strColumnKey, nRow)
{
	if(id == SELECT_BOARD_ID)
	{
		document.getElementById("board_title").innerText = gridBrd.GetCellValue("board_nm", nRow);
		fQuery.board_tp_seq.value = gridBrd.GetCellValue("board_tp_seq", nRow);
	}
	else if(id == SELECT_ID)
	{
		showDetailByWise(SELECT_ID, nRow, f);

		f.rg_dt_tm.value  = f.rg_dt.value  + "  " + f.rg_tm.value;
		f.mdf_dt_tm.value = f.mdf_dt.value + "  " + f.mdf_tm.value;
		f.up_seq.value	  = f.notice_seq.value;

		if(f.rg_id.value != f.userid.value)
		{
			f.qry_cnt.value = parseInt(f.qry_cnt.value,10) + 1;
			gridObj.SetCellValue("qry_cnt", nRow, f.qry_cnt.value);
		}
		gsCurrow = nRow;
		setMode("V");
		queryContent();	//������ȸ
	}
}
/**
 * ������ȸ
 */
function queryContent()
{//log("queryContent");
	var tran = new Trans();
	tran.setSvc(OTHERS_SELECT_ID);
	tran.setPageRow(9999);
	tran.setCallBack("callbackQueryContent");
	tran.open("f", "f", "/common.do");
}
/**
 * ������ȸ �ݹ�
 * svcid : service id
 */
function callbackQueryContent(svcid)
{
//log("svcid:"+svcid);
	if(DataSet.isError(svcid) == "true") return;
	if( DataSet.getTotalCount(CONTENT_SELECT_ID)>0 )
	{
		f.notice_cont.value = DataSet.getParam(CONTENT_SELECT_ID, 1, 0, "notice_cont");
	}
	showUploadFileList1();//showUploadFileList(FILE_SELECT_ID,"file_seq","file_nm","new_file_nm");
}
/**
 * ���
 */
function addItem()
{
	setMode("A");
}
/**
 * ����
 */
function updateItem()
{
	//if(checkAuth("U") == false) return;
	setMode("U");
}
/**
 * ���
 */
function cancel()
{
	if( gsCurrow>-1 )
	{
		showDetailO_obj(SELECT_ID, "", gsCurrow);
	}else{
		setMode("I");
	}
}
/**
 * ����1 : ���� ���ε�
 */
function checkFile()
{
	if(getValidation(f, true) == false) return;
	if(f.board_tp_seq.value!="16")
	{
		if(f.pwd.value=="")
		{
			MessageBox("","I","��й�ȣ�� �ʼ� �Է� �׸� �Դϴ�.");return;
		}
	}
	if(MessageBox("SavConfirm", "C", "") == false) return;

	if (iUpload.existsUploadFile() == true)	//���Ͼ��ε� ��
	{
		iUpload.upload(UPLOAD_PATH, UPLOAD_FOLDER_NAME);
	}else{
		save();
	}
}
/**
 * ����2
 */
function save()
{
	/* ******************************************************
	if(getValidation(f, true) == false) return;
	if(f.board_tp_seq.value!="16")
	{
		if(f.pwd.value=="")
		{
			MessageBox("","I","��й�ȣ�� �ʼ� �Է� �׸� �Դϴ�.");return;
		}
	}
	if(MessageBox("SavConfirm", "C", "") == false) return;
	******************************************************* */

	var svc_id = "";
	if(gsXaFlag=="A")
	{
		svc_id = (INSERT_ID +","+ SEQ_SELECT_ID);

		if(f.file_nm.value != "")		//���� ����� ������ ������ ���
		{
			svc_id += (","+FILE_INSERT_ID);
		}
	}
	else //if(gsXaFlag =="U")
	{
		svc_id = UPDATE_ID;

		if(f.file_nm.value != "")		//���� ����� ������ ������ ���
		{
			svc_id += (","+FILE_INSERT_ID2);
		}
	}
	
	if(f.file_nm.value.substr(0,1)=="")	//���׷�  �� ÷���� ��Ȳ�� �߻�
	{
		f.file_nm.value 	= f.file_nm.value.substr(1);
		f.new_file_nm.value = f.new_file_nm.value.substr(1);
	}
									
	var tran = new Trans();
	tran.setSvc(svc_id);
	tran.setWait(true);
	tran.setCallBack("callbackSave");
	tran.open("f", "f", "/common.do");
}
/**
 * ���� �ݹ�
 * svcid : service id
 */
function callbackSave(svcid)
{
	if(DataSet.isError(svcid) == "true") return;
	if(gsXaFlag == "A"){afterInsert();}
	else               {afterUpdate();}
}
/**
 * ��� ��
 */
function afterInsert()
{
	if(parseInt(DataSet.getParam(INSERT_ID, 1, 0, "SUCCESS_COUNT"),10) > 0)
	{
		f.notice_seq.value	= DataSet.getParam(SEQ_SELECT_ID, 1, 0, "seq");
		f.up_seq.value		= f.notice_seq.value;
		f.qry_cnt.value 	= 0;
		f.rg_dt.value 		= getCurDay("-", "");
		f.rg_tm.value 		= getCurDay(":", "T");
		f.rg_id.value 		= f.userid.value;
		f.rg_nm.value 		= f.usernm.value;
		f.rg_dt_tm.value  	= f.rg_dt.value +"  "+f.rg_tm.value;
		f.mdf_dt.value 		= f.rg_dt.value;
		f.mdf_tm.value 		= f.rg_tm.value;
		f.mdf_id.value 		= f.userid.value;
		f.mdf_nm.value 		= f.usernm.value;
		f.mdf_dt_tm.value 	= f.mdf_dt.value+"  "+f.mdf_tm.value;
		gsCurrow  			= 0;

		insertWiseGridRow(SELECT_ID, gsCurrow, f);
		setGridColor();
		setMode("V");

		queryUploadFile();//÷������ ��� ��ȸ
	}
}
/**
 * ���� ��
 */
function afterUpdate()
{
	if(parseInt(DataSet.getParam(UPDATE_ID, 1, 0, "SUCCESS_COUNT"),10) > 0)
	{
		f.mdf_dt.value 		= getCurDay("-", "");
		f.mdf_tm.value 		= getCurDay(":", "T");
		f.mdf_id.value 		= f.userid.value;
		f.mdf_nm.value 		= f.usernm.value;
		f.mdf_dt_tm.value	= f.mdf_dt.value+"  "+f.mdf_tm.value;

		updateWiseGridRow(SELECT_ID, gsCurrow, f);
		setGridColor();
		setMode("V");

		queryUploadFile();//÷������ ��� ��ȸ
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
	tran.setMyUserParams("prg_id", "HOME_BOARD");
	tran.setMyUserParams("up_seq", f.notice_seq.value);
	tran.setCallBack("callbackQueryUploadFile");
	tran.open("", "", "/common.do");
}
/**
 * ���ε� ���� ��ȸ
 */
function callbackQueryUploadFile()
{
	showUploadFileList1();	//0���̶� ������ ȣ�����ش�.
}
/**
 * ����
 */
function delItem()
{
	//if(checkAuth("D") == false) return false;
	if(MessageBox("DelConfirm", "C", "") == false) return;

	bFileDelMode = ((DataSet.getTotalCount(FILE_SELECT_ID) > 0)?true:false);
	
	var tran = new Trans();
	tran.setSvc(DELETE_ID+","+FILE_DELETE_ID);
	tran.setMyUserParams("prg_id"	 , "HOME_BOARD");
	tran.setMyUserParams("up_seq"	 , f.notice_seq.value);
	tran.setMyUserParams("notice_seq", f.notice_seq.value);
	tran.setCallBack("callbackDelItem");
	tran.open("", "", "/common.do");
}
/**
 * ���� �ݹ�
 * svcid : service id
 */
function callbackDelItem(svcid)
{
	if(DataSet.isError(svcid) == "true") return;
	if(bFileDelMode==true)	{delUploadFileAll()}
	else					{afterDelete();}
}
/**
 * ���� ��
 */
function afterDelete()
{
	if(parseInt(DataSet.getParam(DELETE_ID, 1, 0, "SUCCESS_COUNT"),10) > 0)
	{
		MessageBox("Success", "E", "");
		removeWiseGridRow(SELECT_ID, gsCurrow);
		setMode("I");
	}
}
/**
 * CALLBACK : ���� ���ϻ��� ��
 */
function callback(sServiceID)
{
	switch (sServiceID)
	{
		case FILE_DELETE_ID :	if (parseInt(DataSet.getParam(FILE_DELETE_ID, 1, 0, "SUCCESS_COUNT"),10) > 0)
								{
									delUploadFile(f.new_file_nm.value, UPLOAD_FOLDER_NAME, UPLOAD_PATH);
								}
								break;

		case FILE_REMOVE_ID :	if(bFileDelMode==true)
								{
									bFileDelMode = false;
									afterDelete();
								}else{
									bFileDelMode = false;
									MessageBox("Success", "E", "");
									queryUploadFile();
								}
								break;
		default : break;
	}
}
/**
 * ����üũ
 */
function checkAuth(mode)
{return true;
	var msgId;

	if(mode == "U")
	{
		msgId = "INFAuthFailMod";
	}
	else if(mode == "D")
	{
		msgId = "INFAuthFailDel";
	}

	if(gsXaFlag != "A" && f.userid.value != f.rg_id.value)
	{
		if(typeof msgId != "undefined")
		{
			MessageBox(msgId, "E", "");
			return false;
		}
	}
}
/**
 * ����� ������ �˾�
 */
var popupGubun = ""
function openUserOrg(gb)
{
	popupGubun = gb;
	window.open("/jsp/common/comUserOrg.jsp" ,"UserOrg", "width=800,height=545");
}
/**
 * ��������� ����
 */
function setOrgUserInfo(user_id, user_name)
{
	if(popupGubun == "q_rg_id")
	{
		fQuery.q_rg_id.value = user_id;
		fQuery.q_rg_nm.value = user_name;
	}
}
/**
 * �ۼ��� onBlur
 */
function userid_onBlur(gb)
{
	if(gb == "q_rg_id")
	{
		if(trim(fQuery.q_rg_id.value)=="")
		{
			fQuery.q_rg_id.value = "";
			fQuery.q_rg_nm.value = "";
		}
	}
}
/**
 * �Խ��� �Ӽ� ����
 */
function setBoardType()
{
	if(f.board_tp_seq.value=="")
	{
		setDisabledObj([f.notice_type], true);
		f.notice_type.value = "";
		f.pwd.readOnly		= true;
		f.pwd.className 	= "input_readonly";
		f.pwd.value 		= "";

		iconDisabled(["icoBig", "icoSmall", "icoUploadFiles", "icoShowFiles"], true);//���۹�ư ��Ʈ��
		initUploadFile();			//�ʱ�ȭ
		uploadFileDisabled(false);	//������ : false:���, true:�Է���		
	}
	else if(f.board_tp_seq.value=="16")	//Ȩ������ ����
	{
		setDisabledObj([f.notice_type], false);
		f.notice_type.value = "";
		f.pwd.readOnly		= true;
		f.pwd.className 	= "input_readonly";
		f.pwd.value 		= "";

		iconDisabled(["icoBig", "icoSmall", "icoUploadFiles", "icoShowFiles"], true);//���۹�ư ��Ʈ��
		initUploadFile();			//�ʱ�ȭ
		uploadFileDisabled(false);	//������ : false:���, true:�Է���		
	}else{
		setDisabledObj([f.notice_type], true );
		f.notice_type.value = "01";
		f.pwd.readOnly		= false;
		f.pwd.className 	= "input_required";
		f.pwd.value 		= "";

		iconDisabled(["icoBig", "icoSmall"], false);
		iconDisabled(["icoUploadFiles", "icoShowFiles"], true);
		initUploadFile();
		uploadFileDisabled(true);	//������	
	}
}

/**
 * ÷������ ����Ʈ ���
 */
function showUploadFileList1()
{
	var cnt = DataSet.getTotalCount(FILE_SELECT_ID);

	var uploadFileHTML = new StringBuffer();

	uploadFileHTML.append("<table border=0 width=100%>");
	
	//var arrSeq = new Array();	//���� �����̷� �����

	for (var i = 0; i < cnt; i++)
	{
		var seq		= DataSet.getParam(FILE_SELECT_ID, 1, i, "file_seq");
		var filename = trim(DataSet.getParam(FILE_SELECT_ID, 1, i, "file_nm"));
		var newfilename = trim(DataSet.getParam(FILE_SELECT_ID, 1, i, "new_file_nm"));

		var arrfilename = filename.split(".");		
		
		//arrSeq.push(seq);

		uploadFileHTML.append("<tr>");
		uploadFileHTML.append("<td>");
		
		var args = "filename=" + escape(encodeURIComponent(filename)) + "&newfilename=" + escape(encodeURIComponent(newfilename)) + "&delete=NO&foldername=" + UPLOAD_FOLDER_NAME + "&filepath=" + UPLOAD_PATH;
		
		if(arrfilename.length > 1 && (trim(arrfilename[arrfilename.length - 1]).toUpperCase() == "HTML" || trim(arrfilename[arrfilename.length - 1]).toUpperCase() == "HTM"))
		{
			
			uploadFileHTML.append("<a target='iDownFile' href=\"\" onclick=\"javascript:openPopup('/jsp/common/downFile.jsp', '" + args + "' , 'down', '', '', '1000', '600', 'scrollbars=yes');\">" + filename + "</a>&nbsp;");
		}
		else
		{		
			uploadFileHTML.append("<a target='iDownFile' href=\"/jsp/common/downFile.jsp?" + args + "\">" + filename + "</a>&nbsp;");
																				
		}
		
		if(f.rg_id.value == f.userid.value)
		{
			uploadFileHTML.append("<label onClick=\"delUploadFile_DB("+seq+", '" + newfilename + "','"+UPLOAD_FOLDER_NAME+"','"+UPLOAD_PATH+"')\" style=\"cursor:hand\">");
			uploadFileHTML.append("<font color=red>X</font></label>");
		}

		uploadFileHTML.append("</td>");
		uploadFileHTML.append("</tr>");
	}
	
	//f.arr_uploadfileseq.value = makeParamArray(arrSeq);

	uploadFileHTML.append("</table>");
	
	//alert(uploadFileHTML.toString());
	
	setUploadFile(uploadFileHTML.toString());
}
