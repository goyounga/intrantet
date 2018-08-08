/**
 * PROJECT : INTRANET
 * NAME    : infBoardHtml5.js
 * DESC    : �Խ���-HTML5
 * AUTHOR  : ���ر� ����
 * VERSION : 1.0
 * Copyright �� 2010 Nexfron. All rights reserved.
 * ============================================================================================
 * 							��		��		��		��
 * ============================================================================================
 * VERSION	   DATE		  	AUTHOR		DESCRIPTION
 * ============================================================================================
 * 1.0		2011.10.31		���ر�		����
 */

var SELECT_BOARDAUTH_ID		= "UCINF118S";		//��ȸ - �Խ��� ���α��� ��ȸ
var SELECT_BOARDLIST_ID 	= "UCINF214S";		//��ȸ - �Խñ۸��
var QRY_UP_BOARDLIST_ID		= "UCINF115U_1";	//������Ʈ - �Խñ� ��ȸ�� +1
var SELECT_BOARDDETAIL_ID	= "UCINF220S";		//��ȸ - �Խñ۳���
var FILE_SELECT_ID 			= "UCCOM030S";		//��ȸ - ÷������

var SELECT_REPLYLIST_ID		= "UCINF215S";		//�Խ��Ǵ�� ��ȸ
var INSERT_REPLYLIST_ID		= "UCINF215I";		//�Խ��Ǵ�� ����
var UPDATE_REPLYLIST_ID		= "UCINF215U";		//�Խ��Ǵ�� ����
var DELETE_REPLYLIST_ID		= "UCINF215D";		//�Խ��Ǵ�� ����
var RPLY_UP_BOARDLIST_ID	= "UCINF116U";		//�Խñ� ��ۼ� +1
var RPLY_DOWN_BOARDLIST_ID	= "UCINF117U";		//�Խñ� ��ۼ� -1

var OTHERS_SELECT_ID 		= QRY_UP_BOARDLIST_ID +","+ SELECT_BOARDDETAIL_ID +","+ FILE_SELECT_ID +","+SELECT_REPLYLIST_ID;	//��ȸȽ��������Ʈ+�Խñ۳�����ȸ+÷������

var INSERT_BOARDLIST_ID		= "UCINF214I";		//��� - �Խñ�
var SEQ_SELECT_ID			= "UCINF214S_1";	//��ȸ - �ű� �Խñ� SEQ��ȸ
var ALL_INSERT_ID			= INSERT_BOARDLIST_ID 	+","+ SEQ_SELECT_ID;		//��� + SEQ��ȸ

var UPDATE_ID				= "UCINF214U";		//���� - �Խñ�

var DELETE_ID 				= "UCINF126D";		//���� - �Խñ�
var DELETE_BOARDLIST_ID		= "UCINF214D";		//���� - �Խñ�
var FILE_DELETE_ID 			= "UCCOM030D";		//���� - ����

//var ALL_DELETE_ID 			= "UCINF214D,UCCOM030D,UCINF215D";	//���� - �Խñ�+����+���
var ALL_DELETE_ID 			= DELETE_BOARDLIST_ID ;//+ "UCINF214D,UCCOM030D,UCINF215D";	//���� - �Խñ�+����+���



var gbUseYn				= false;			//������
var gbReadAuth			= false;			//�б����
var gbWriteAuth			= false;			//�������

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
	gridObj = document.getElementById(SELECT_BOARDLIST_ID);
//	gridObj.setParam("rg_dt_format"  , "DATE");	//DATE�� tag�� ������ format�� GetCellValue���� ������ �������� ���Ѵ�
//	gridObj.setParam("rg_tm_format"  , "TIME");
//	gridObj.setParam("mdf_dt_format" , "DATE");
//	gridObj.setParam("mdf_tm_format" , "TIME");
	arrInput  = new Array(f.board_sbjt, f.board_cont);
	arrButton = new Array(f.btnAdd, f.btnUpd, f.btnDel, f.btnSave, f.btnCan, fQuery.btnsearch);
	arrQuery  = new Array(fQuery.q_searchtype, fQuery.searchstr);
	setDisabledObj(arrQuery, true);
	setMode("X");
	editor_generate("board_cont");
	getBoardAuth();	//queryList();
}
/**
 * �Խ��� ���α��� ��ȸ
 */
function getBoardAuth()
{
	var tran = new Trans();
	tran.setSvc(SELECT_BOARDAUTH_ID);
	tran.setMyUserParams("board_tp_seq"	, f.board_tp_seq.value);
	tran.setMyUserParams("userid"		, f.userid.value);
	tran.setCallBack("callbackGetBoardAuth");
	tran.open("","","/common.do");
}
/**
 * �׸��� ��ȸ �ݹ�
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
			queryList();
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
		case "I"	:	frmMode = true;		btnMode = 0;	f.reset();
						document.getElementById("board_cont_view").innerHTML = "";
						//document.getElementById("divUploadFile"  ).innerHTML = "";
						document.getElementById("board_reply").style.display = "none";
						document.getElementById("board_file").innerHTML = "";
						editor_setHTML("board_cont", "");
						gsCurrow = -1;
						break;

		case "V"	:	frmMode = true;		btnMode = 1;
						//document.getElementById("board_cont_view").scrollTop = 0;
						document.getElementById("board_reply").style.display = "block";
						document.getElementById("board_view").scrollTop = 0;
						break;

		case "A"	:	frmMode = false;	btnMode = 2;	f.reset();
						document.getElementById("board_cont_view").innerHTML = "";
						document.getElementById("divUploadFile"  ).innerHTML = "";
						editor_setHTML("board_cont", "");
						break;

		case "U"	:	frmMode = false;	btnMode = 3;
						editor_scrollTop("board_cont", 0);
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

	if(frmMode)
	{
		document.getElementById("trBtnView"		).style.display = "block";
		document.getElementById("trBtnEdit"		).style.display = "none";
		document.getElementById("trContentView"	).style.display = "block";
		document.getElementById("trContentEdit"	).style.display = "none";
		//document.getElementById("td1"			).style.height  = "10px";
		document.getElementById("divFile"		).style.display = "none";

	}else{
		document.getElementById("trBtnView"		).style.display = "none";
		document.getElementById("trBtnEdit"		).style.display = "block";
		document.getElementById("trContentView"	).style.display = "none";
		document.getElementById("trContentEdit"	).style.display = "block";
		//document.getElementById("td1"			).style.height  = "5px";
//		document.getElementById("divFile"		).style.display = "block";

		document.getElementById("board_file").innerHTML = "";

		var table	= document.getElementById("tblReplyList");
		for( var j=table.rows.length-1; j>=0; j-- ) {table.deleteRow(j);}
		f.rply_cont.value = "";
	}

	if(!gbWriteAuth)
	{
		setButton(f.btnAdd,true);
		setButton(f.btnUpd,true);
		setButton(f.btnDel,true);
	}
}

/**
 * ��ȸ
 */
function queryList()
{
	if(!gbUseYn||!gbReadAuth){return;}
	//if(!gbReadAuth){MessageBox("", "I", "��ȸ ������ �����ϴ�.\n\n�����ڿ��� ���� �ٶ��ϴ�.");return;}	//INFAuthFailRead
	/*
	if (fQuery.q_datefrom.value != "" && fQuery.q_dateto.value == "")
	{
		fQuery.q_dateto.value = fQuery.q_datefrom.value;
	}
	else if(fQuery.q_datefrom.value == "" && fQuery.q_dateto.value != "")
	{
		fQuery.q_datefrom.value = fQuery.q_dateto.value;
	}
	*/
	if (getValidation(fQuery, true) == false) return;
	//if (checkTermDate(fQuery.q_datefrom, fQuery.q_dateto, true, true) == false) return;

	gridObj.setParam("rg_dtm_format" , "DATET");
	gridObj.setParam("mdf_dtm_format", "DATET");

	var tran = new Trans();
	tran.setSvc(SELECT_BOARDLIST_ID);
	tran.setPageRow(50);
	tran.setWiseGrid("1");
	tran.setForwardId("wgdsl","");

	tran.setMyUserParams("startdt"	, "20080101");	//��¥����������
	tran.setMyUserParams("enddt"	, "20301231");	//��¥����������

	if(trim(fQuery.searchstr.value)!="")
	{
		tran.setMyUserParams(fQuery.q_searchtype.value, fQuery.searchstr.value);
	}
	tran.setCallBack("callbackQueryList");
	tran.open("fQuery", "f", "/wisegrid.do");
}
/**
 * �׸��� ��ȸ �ݹ�
 * svcid : service id
 */
function callbackQueryList(svcid)
{
	if (DataSet.isError(svcid) == "true") return;
	callbackQueryComment();
	setMode("I");
}

/**
 * �׸��� ��ȸ �� �ݹ�
 * sSvcId  : ����ID
 */
function callbackQueryComment()
{
	for(var i=0; i<gridObj.GetRowCount(); i++)
	{
		if( parseInt(gridObj.GetCellValue("filecnt", i),10)<1 )
		{
			gridObj.SetCellImage("fileyn", i, -1);
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
	if(id == SELECT_BOARDLIST_ID)
	{
		showDetailByWise(SELECT_BOARDLIST_ID, nRow, f);

	//	f.rg_dt_tm.value  = f.rg_dt.value  + "  " + f.rg_tm.value;
	//	f.mdf_dt_tm.value = f.mdf_dt.value + "  " + f.mdf_tm.value;
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
{
	var tran = new Trans();
	tran.setSvc(OTHERS_SELECT_ID);
	tran.setPageRow(9999);
	tran.setMyUserParams("board_seq", f.board_seq.value);
	tran.setMyUserParams("userid"	, f.userid.value);
	tran.setMyUserParams("up_seq"	, f.board_seq.value);	//÷�����Ͽ�
	tran.setMyUserParams("prg_id"	, "BOARD");				//÷�����Ͽ�
	tran.setCallBack("callbackQueryContent");
	tran.open("", "f", "/common.do");
}
/**
 * ������ȸ �ݹ�
 * svcid : service id
 */
function callbackQueryContent(svcid)
{
	if(DataSet.isError(svcid) == "true") return;
	document.getElementById("board_cont_view").innerHTML = DataSet.getParam(SELECT_BOARDDETAIL_ID, 1, 0, "board_cont");
	editor_setHTML("board_cont", f.board_cont.value);
	showUploadFileList();
	showReplyList();
}
/*
fQuery.prg_id.value = "BOARD";
UPLOAD_FOLDER_NAME 	= "board";
*/
var UPLOAD_PATH 		= "UPLOAD_PATH";
var UPLOAD_FOLDER_NAME 	= "board";
//var UPLOAD_BOARD_PATH 		= "UPLOAD_PATH";
//var UPLOAD_BOARD_FOLDER_NAME 	= "board";

/**
 * ���ε� ���� ��ȸ

function queryUploadFile()
{
	var tran = new Trans();
	tran.setSvc(FILE_SELECT_ID);
	tran.setPageRow(9999);
	tran.setAsync(false);
	tran.setMyUserParams("up_seq", f.board_seq.value);
	tran.setMyUserParams("prg_id", "BOARD");
	tran.setCallBack("showUploadFileList");
	tran.open("", "", "/common.do");
}
*/
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
	if(checkAuth("U") == false) return;
	setMode("U");
}
/**
 * ���
 */
function cancel()
{
	if( gsCurrow>-1 )
	{
		showDetailO_obj(SELECT_BOARDLIST_ID, "", gsCurrow);
	}else{
		setMode("I");
	}
}
/**
 * ����
 */
function saveItem()
{
	if( f.board_cont.value =="<P>&nbsp;</P>" ){ f.board_cont.value = "";}	//�����Ϳ����� ���� �������� �ʴ´�.
	if(getValidation(f, true) == false) return;
	if(MessageBox("SavConfirm", "C", "") == false) return;

	var tran = new Trans();
	tran.setSvc((gsXaFlag=="A")?ALL_INSERT_ID:UPDATE_ID);
	tran.setCallBack("callbackSaveItem");
	tran.open("f", "f", "/common.do");
}
/**
 * ���� �ݹ�
 * svcid : service id
 */
function callbackSaveItem(svcid)
{
	if(DataSet.isError(svcid) == "true") return;

	//�̹� ����� �̶� query.xml�� �����Ҽ� ���� ��ũ��Ʈ���� ó��
	//�������ʹ� query.xml �� <query-view-type></query-view-type>�� ����Ͽ� �����ϵ��� ��
	//<query-view-type> ������ ���� ������ �޽����� ǥ������ �ʴ´�.
	//query�� ������ ������ ��� ������ ����� ���� �����ϸ� query.xml���� ó�� �����Ҽ� ����
	//�ε����Ѱ�츸 script���� ó���ϵ��� ��
	MessageBox("Success", "I", "");

	if(gsXaFlag == "A"){afterInsert();}
	else               {afterUpdate();}
}
/**
 * ��� ��
 */
function afterInsert()
{
	if(parseInt(DataSet.getParam(INSERT_BOARDLIST_ID, 1, 0, "SUCCESS_COUNT"),10) > 0)
	{
		f.board_seq.value	= DataSet.getParam(SEQ_SELECT_ID, 1, 0, "seq");
		f.qry_cnt.value 	= 0;
		f.rply_cnt.value	= 0;
		f.rg_dt.value 		= getCurDay("-", "");
		f.rg_tm.value 		= getCurDay(":", "T");
		f.rg_id.value 		= f.userid.value;
		f.rg_nm.value 		= f.usernm.value;
		f.rg_dtm.value  	= f.rg_dt.value +"  "+f.rg_tm.value;
		f.mdf_dt.value 		= f.rg_dt.value;
		f.mdf_tm.value 		= f.rg_tm.value;
		f.mdf_id.value 		= f.userid.value;
		f.mdf_nm.value 		= f.usernm.value;
		f.mdf_dtm.value 	= f.mdf_dt.value+"  "+f.mdf_tm.value;
		gsCurrow  			= 0;
		document.getElementById("board_cont_view").innerHTML = f.board_cont.value;
		insertWiseGridRow(SELECT_BOARDLIST_ID, gsCurrow, f);
		setMode("V");
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
		f.mdf_dtm.value 	= f.mdf_dt.value+"  "+f.mdf_tm.value;
		document.getElementById("board_cont_view").innerHTML = f.board_cont.value;
		updateWiseGridRow(SELECT_BOARDLIST_ID, gsCurrow, f);
		//setMode("V");
		showDetailO_obj(SELECT_BOARDLIST_ID, "board_sbjt", gsCurrow);
	}
}
/**
 * ����
 */
function delItem()
{
	if(checkAuth("D") == false) return false;
	if(MessageBox("DelConfirm", "C", "") == false) return;

	var tran = new Trans();
	tran.setSvc(ALL_DELETE_ID);
	tran.setCallBack("callbackDelItem");
	tran.open("f", "f", "/common.do");
}
/**
 * ���� �ݹ�
 * svcid : service id
 */
function callbackDelItem(svcid)
{
	if(DataSet.isError(svcid) == "true") return;
	if(parseInt(DataSet.getParam(DELETE_BOARDLIST_ID, 1, 0, "SUCCESS_COUNT"),10) > 0)
	{
		MessageBox("Success", "E", "");
		removeWiseGridRow(SELECT_BOARDLIST_ID, gsCurrow);
		setMode("I");
	}
}
/**
 * ����üũ
 */
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

	if(gsXaFlag != "A" && f.userid.value != f.mdf_id.value)
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

var popupGubun = ""
function openUserOrg(gb)
{
	popupGubun = gb;
	window.open("/jsp/common/comUserOrg.jsp" ,"UserOrg", "width=800,height=545");
}
 */
/**
 * ��������� ����

function setOrgUserInfo(user_id, user_name)
{
	if(popupGubun == "q_rg_id")
	{
		fQuery.q_rg_id.value = user_id;
		fQuery.q_rg_nm.value = user_name;
	}
}
 */
/**
 * �ۼ��� onBlur

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
 */

/**
 * ÷������ ����Ʈ ���
 */
function showUploadFileList()
{
	document.getElementById("board_file").innerHTML = "";
	var cnt = parseInt(DataSet.getTotalCount(FILE_SELECT_ID),10);
	if( cnt<1) return;

	var uploadFileHTML = new StringBuffer();
	uploadFileHTML.append("<BR><HR>");
	uploadFileHTML.append("<table class='MANTBL' border='0' cellpadding='0' cellspacing='1'><tr><td class='MANTDT' width='100'>÷������</td><td class='MANTDM'>");

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

			uploadFileHTML.append("<a target='iLog' href=\"\" onclick=\"javascript:openPopup('/jsp/common/downFile.jsp', '" + args + "' , 'down', '', '', '1000', '600', 'scrollbars=yes');\">" + filename + "</a>&nbsp;");
		}
		else
		{
			uploadFileHTML.append("<a target='iLog' href=\"/jsp/common/downFile.jsp?" + args + "\">" + filename + "</a>&nbsp;");

		}

		if(f.userid.value == f.mdf_id.value)
		{
			uploadFileHTML.append("<label onClick=\"delUploadFile_DB("+seq+", '" + newfilename + "')\" style=\"cursor:hand\">");
			uploadFileHTML.append("<font color=red>X</font>&nbsp;</label>");
		}
		uploadFileHTML.append("</td>");
		uploadFileHTML.append("</tr>");
	}

	//f.arr_uploadfileseq.value = makeParamArray(arrSeq);

	uploadFileHTML.append("</table>");

	uploadFileHTML.append("</td></tr></table>");

	//document.getElementById("divUploadFile").innerHTML = uploadFileHTML.toString();
	document.getElementById("board_file").innerHTML = uploadFileHTML.toString();

}
/**
 * ���̺� TD ����
 * objTr : Ÿ�����̺�
 * val   : TD�� Text
 * align : TD�� ����
 */
function makeColumn( objTr, val, align, dtm, sId, dis)
{
	var newCell=objTr.insertCell();
	newCell.id = sId;
	newCell.className = "MANTDT";
	newCell.style.color="#555555";
	newCell.innerText = val;
	newCell.innerHTML = newCell.innerHTML+dtm;
	newCell.style.textAlign=align;
	newCell.style.padding="0 0 0 0";
	newCell.style.display=dis;
	return newCell;
}
function makeLine( nTr, nCol)
{
	var newCell		= nTr.insertCell();
	newCell.colSpan = nCol;
	newCell.className = "MANTDT";
	newCell.innerHTML = "<label style='width:96%;background: url("+scriptPath+"/images/common/dotline.gif) repeat-x left;'></label>";
}
/**
 * ��� ����Ʈ ���
 */
function showReplyList()
{

	var table	= document.getElementById("tblReplyList");
	for( var j=table.rows.length-1; j>=0; j-- ) {table.deleteRow(j);}
	f.rply_cont.value = "";

	var sbHTML = new StringBuffer();

	var cnt = DataSet.getTotalCount(SELECT_REPLYLIST_ID);
	for (var i = 0; i < cnt; i++)
	{
		sbHTML.clear();
		var board_seq 	= DataSet.getParam(SELECT_REPLYLIST_ID, 1, i, "board_seq" );	//get value
		var rply_seq 	= DataSet.getParam(SELECT_REPLYLIST_ID, 1, i, "rply_seq"      );
		var rply_cont 	= DataSet.getParam(SELECT_REPLYLIST_ID, 1, i, "rply_cont"    );
		var rply_rg_nm  = DataSet.getParam(SELECT_REPLYLIST_ID, 1, i, "rply_rg_nm");
		var rply_rg_dtm = DataSet.getParam(SELECT_REPLYLIST_ID, 1, i, "rply_rg_dtm"   );
		var rg_id 		= DataSet.getParam(SELECT_REPLYLIST_ID, 1, i, "rg_id"     );

		var tr_id 		= "tr_rply_seq_"+rply_seq;	//��� TR
		var td_id 		= "td_rply_seq_"+rply_seq;	//��� TD

		var nTr         = table.insertRow();
		nTr.id 			= tr_id;
		makeColumn( nTr, rply_rg_nm ,"center","","","block");

		sbHTML.append("&nbsp;&nbsp;<font color='#888888'>");
		sbHTML.append("("+rply_rg_dtm+")");
		//sbHTML.append("&nbsp;&nbsp;<A href='javascript:replyAdd("+tr_id+")' style='color:#808000'>���</A>");

		if(rg_id==f.userid.value)
		{
			sbHTML.append(" | <A href='javascript:replyChange("+td_id+","+rply_seq+")' style='color:#808000'>����</A>");
			sbHTML.append(" | <A href='javascript:replyDel("+rply_seq+")' style='color:#808000'>����</A>");
		}
		sbHTML.append("</font>");

		makeColumn( nTr, rply_cont,"left", sbHTML.toString(),td_id,"block");
		makeColumn( nTr, "","right", "",td_id+"_edit","none");

		nTr = table.insertRow();
		makeLine( nTr, 2 );
	}
}
/**
 * ����� ���
 */

function replyAdd(tr)
{
	var table	= document.getElementById("tblReplyList");
	var nTr     = table.insertRow(tr.rowIndex+2);
	//makeColumn( nTr, f.usernm.value ,"center","","","block");
	var newCell = makeColumn( nTr, "��" ,"center","","","block");
	newCell.style.textAlign="right";
	newCell.style.verticalAlign="top";
	newCell.style.padding="10 0 0 0";


	//makeColumn( nTr, f.usernm.value ,"center","","","block");

	var sbHTML 		= new StringBuffer();
	sbHTML.append("<textarea name='' styleClass='input_textarea_text' required='false' requirednm='����' style='width:100%;height:80'></Textarea>");
	sbHTML.append("<br><br>");
	makeColumn( nTr, "", "left", sbHTML.toString(), "", "block");

//document.getElementById(td_edit).style.padding = "0 10 0 0";
	nTr         = table.insertRow(tr.rowIndex+3);
	makeLine( nTr, 2 );
}
/**
 * ��� ���� ���
 */
function replyCancel(td_id)
{
	document.getElementById(td_id).style.display = "block";
	document.getElementById(td_id+"_edit").style.display = "none";
}
/**
 * ��� ����
 */
function replyChange(td_id, rply_seq)
{
	var strVal 		= td_id.innerText;
	var idx 		= strVal.lastIndexOf("(");
	var sbHTML 		= new StringBuffer();
	var rply_cont 	= "rply_cont"+rply_seq;	//��� TEXTAREA

	sbHTML.append("<textarea name='"+rply_cont+"' styleClass='input_textarea_text' required='false' requirednm='����' style='width:100%;height:80'>"+strVal.substring(0,idx-2)+"</Textarea>");
	sbHTML.append("<br>");
	sbHTML.append(getButton(td_id,rply_seq,rply_cont));

	var td_edit = td_id.id + "_edit";
	document.getElementById(td_edit).innerHTML = sbHTML.toString();
	document.getElementById(td_edit).style.display = "block";
	document.getElementById(td_edit).style.padding = "0 10 0 0";
	td_id.style.display = "none";
}
function getButton(td_id,rply_seq,rply_cont)
{
	var sbHTML = new StringBuffer();
	sbHTML.append("<table border='0' cellpadding='0' cellspacing='0' width='100%' ><tr><td style='padding:5 0 0 0;text-align:right'>");
	sbHTML.append("<button class='img_button' style='width:50' value='����' onclick=replyUpdate("+rply_seq+",'"+rply_cont+"') >");
	sbHTML.append("<table class='tblButton' width='100%' >");
	sbHTML.append("<tr>");
	sbHTML.append("<td id='btnReplyReg_TdL' class='btnLG'></td>");
	sbHTML.append("<td id='btnReplyReg_TdM' class='btnMG' style='background-position-x:70%'>����</td>");
	sbHTML.append("<td id='btnReplyReg_TdR' class='btnRG'></td>");
	sbHTML.append("</tr>");
	sbHTML.append("</table>");
	sbHTML.append("</button>&nbsp;");
	sbHTML.append("<button class='img_button' style='width:50' value='���' onclick=replyCancel('"+td_id.id+"') >");
	sbHTML.append("<table class='tblButton' width='100%'>");
	sbHTML.append("<tr>");
	sbHTML.append("<td id='btnReplyReg_TdL' class='btnLG'></td>");
	sbHTML.append("<td id='btnReplyReg_TdM' class='btnMG' style='background-position-x:70%'>���</td>");
	sbHTML.append("<td id='btnReplyReg_TdR' class='btnRG'></td>");
	sbHTML.append("</tr>");
	sbHTML.append("</table>");
	sbHTML.append("</button>");
	sbHTML.append("</td></tr></table>");
	return sbHTML.toString();
}
/**
 * ��� ����
 */
function replyUpdate(rply_seq,rply_cont)
{
	var frm_rply_cont	= document.getElementById(rply_cont);

	if(!frm_rply_cont.value)
	{
		MessageBox("Required", "E", "����");
		frm_rply_cont.focus();
		return;
	}

	if(!MessageBox("ChgConfirm", "C", "")) return;

	var tran = new Trans();
	tran.setSvc(UPDATE_REPLYLIST_ID);
	tran.setMyUserParams("rply_seq"		, rply_seq);
	tran.setMyUserParams("userid"		, f.userid.value);
	tran.setMyUserParams("rply_cont"	, frm_rply_cont.value);
	tran.setCallBack("callbackReplyUpdate");
	tran.open("","","/common.do");
}
/**
 * ��� ���� �ݹ�
 * svcid : service id
 */
function callbackReplyUpdate(svcid)
{
	if(DataSet.isError(svcid) == "true") return;
	MessageBox("Success", "I", "");	//�������� ó���� ���آZ��.�����̶� ���������� ��������
	queryReplyList();
}
/**
 * ��� ���
 */
function replyInsert()
{
	if(!f.rply_cont.value)
	{
		MessageBox("Required", "E", "����");
		f.rply_cont.focus();
		return;
	}

	if(!MessageBox("SavConfirm", "C", "")) return;

	var tran = new Trans();
	tran.setSvc(INSERT_REPLYLIST_ID+","+RPLY_UP_BOARDLIST_ID);
	tran.setMyUserParams("board_seq"	, f.board_seq.value);
	tran.setMyUserParams("userid"		, f.userid.value);
	tran.setMyUserParams("rply_cont"	, f.rply_cont.value);
	tran.setCallBack("callbackReplyInsert");
	tran.open("","","/common.do");
}
/**
 * ��� ��� �ݹ�
 * svcid : service id
 */
function callbackReplyInsert(svcid)
{
	if(DataSet.isError(svcid) == "true") return;
	queryReplyList();
}
/**
 * ��� ��ȸ
 */
function queryReplyList()
{
	var tran = new Trans();
	tran.setSvc(SELECT_REPLYLIST_ID);
	tran.setPageRow(9999);
	tran.setMyUserParams("board_seq", f.board_seq.value);
	tran.setCallBack("callbackQueryReplyList");
	tran.open("", "", "/common.do");
}
/**
 * ��� ��ȸ �ݹ�
 * svcid : service id
 */
function callbackQueryReplyList(svcid)
{
	if(DataSet.isError(svcid) == "true") return;
	showReplyList();
	setReplyCnt( parseInt(DataSet.getTotalCount(SELECT_REPLYLIST_ID),10) );

	var board_view = document.getElementById("board_view");
	board_view.scrollTop = board_view.scrollHeight;

}
/**
 * ��� �Ǽ� ����
 */
function setReplyCnt(nCnt)
{
	for(var i=0; i<gridObj.GetRowCount(); i++)
	{
		if( gridObj.GetCellValue("board_seq", i)==f.board_seq.value )
		{
			//var cnt = gridObj.GetCellValue("rply_cnt", i);
			gridObj.SetCellValue("rply_cnt", i, (nCnt) );
			break;
		}
	}
}
/**
 * ��� ����
 */
function replyDel(rply_seq)
{
	if(!MessageBox("DelConfirm", "C", "")) return;

	var tran = new Trans();
	tran.setSvc(DELETE_REPLYLIST_ID+","+RPLY_DOWN_BOARDLIST_ID);
	tran.setMyUserParams("board_seq"	, f.board_seq.value);
	tran.setMyUserParams("userid"		, f.userid.value);
	tran.setMyUserParams("rply_seq"		, rply_seq);
	tran.setCallBack("callbackReplyDel");
	tran.open("","","/common.do");
}
/**
 * ��� ���� �ݹ�
 * svcid : service id
 */
function callbackReplyDel(svcid)
{
	if(DataSet.isError(svcid) == "true") return;
	queryReplyList();
}