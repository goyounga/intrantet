/**
 * PROJ : Nexfron Intranet
 * NAME : sysNoticeDetailInfo.js
 * DESC : �������� �󼼳���  �ڹٽ�ũ��Ʈ
 * Author : ������ ����
 * VER  : 1.0
 * Copyright 2009 Nexfron All rights reserved
 * ============================================================================================
 * 								��		��		��		��
 * ============================================================================================
 * VERSION		DATE		AUTHOR		DESCRIPTION
 * ============================================================================================
 * 1.0		2009.08.13		������		�ּ��߰�
 */

/*
	1. �� ����ڿ��� �Ҵ�� �μ������� �μ����̺� ���� ��� ��µ��� �ʵ��� �Ͽ���.
	   �׷��� ������ ����� ������ ���̺� �ִµ��� ��ȸ���� ���� �� ����.
	2. ���� �μ��� �����ϸ� ���� �μ��鿡 ���� ����ڸ� ��µ�.
	   ���� ��뿩�ΰ� ����� �μ��� ����ڸ� ��ȸ��.
	3. ����� ������ �������� opener�� �̸��� ������ ���� ������ �ƴѰ��� ������
	   �ش� opener�� getOrgUserInfo(user_id, user_name, user_dept) �Լ��� �̿��Ͽ� ������ �Ѱ���.
*/

var SELECT_NOTICE_ID = "UCSYS110_1S";
var UPDATE_NOTICE_ID = "UCSYS110U";

var FILE_SELECT_ID = "UCCOM030S";

var SELECT_BOARD_ID = "UCSYS113_1S";
var UPDATE_BOARD_ID = "UCSYS113U";

var SELECT_UPG_ID   = "UCSYS099_1S";
//Upload File
var UPLOAD_PATH 		= "UPLOAD_PATH";
var UPLOAD_FOLDER_NAME 	= "notice";

var UPLOAD_BOARD_PATH 		= "UPLOAD_PATH";
var UPLOAD_BOARD_FOLDER_NAME 	= "board";
//var grid1 = new comGrid(); //��������

var SELECT_REPLYLIST_ID		= "UCINF215S";		//�Խ��Ǵ�� ��ȸ
var INSERT_REPLYLIST_ID		= "UCINF215I";		//�Խ��Ǵ�� ����
var RPLY_UP_BOARDLIST_ID	= "UCINF116U";		//�Խñ� ��ۼ� +1
var RPLY_DOWN_BOARDLIST_ID	= "UCINF117U";		//�Խñ� ��ۼ� -1
var DELETE_REPLYLIST_ID		= "UCINF215D";		//�Խ��Ǵ�� ����

var g_Obj = "";
//***********************************
// ONLOAD
//***********************************
function init()
{
	query();
	g_Obj = document.all(SELECT_REPLYLIST_ID);
	//g_Obj.strScrollBars = 'automatic';
    g_Obj.bStatusbarVisible = false;
    g_Obj.SetColCellMultiLine("rply_cont", true);
    g_Obj.strRowSizing = "autofree";
    g_Obj.nCellPadding = 2;

	g_Obj.strScrollBars = "vertical";
    g_Obj.strHDClickAction 	= "select";

}

//***********************************
// ��ȸ
//***********************************
function query()
{
	if(fQuery.gubun.value =="notice")
	{
		divFile.style.display = "";
		divComment.style.display = "none";
		divExps.style.display = "none";
		serviceId = SELECT_NOTICE_ID;
		fQuery.prg_id.value = "NOTICE";
		UPLOAD_FOLDER_NAME 	= "notice";

	}else if(fQuery.gubun.value =="board")
	{
		divFile.style.display = "";
		divComment.style.display = "";
		divExps.style.display = "none";
		serviceId = SELECT_BOARD_ID;
		fQuery.prg_id.value = "BOARD";
		UPLOAD_FOLDER_NAME 	= "board";
	}else if(fQuery.gubun.value =="upg")
	{
		divFile.style.display = "none";
		divComment.style.display = "none";
		divExps.style.display = "";
		serviceId = SELECT_UPG_ID;
	}

	var tran = new Trans();
	tran.setSvc(serviceId);
	tran.open("fQuery","fQuery","/common.do");


}

//***********************************
// ��Ϲ�ư
//***********************************
function openNotice()
{
	if(fQuery.gubun.value =="notice")
	{
		location.href="/jsp/system/sysNoticeInfo.jsp";

	}else if(fQuery.gubun.value =="board")
	{
		location.href="/jsp/system/sysTeamNoticeInfo.jsp";
	}
}

//***********************************
// �ݱ��ư
//***********************************
function popupClose()
{
	window.close();
}

//�۳��뿡�� ÷�� ���� Ŭ����
function openFile(){
	location.href("/jsp/common/downFile.jsp?filename="+fQuery.atch_file_nm.value);
}

//***********************************
// CALLBACK
//***********************************
function callback(sServiceID)
{
	switch (sServiceID)
	{
		case SELECT_NOTICE_ID:

			showDetail(SELECT_NOTICE_ID, 0, fQuery);

			board_cont.innerText = DataSet.getParam(SELECT_NOTICE_ID, 1, 0, "notice_cont") ;

			seqCNT();

			queryUploadFile();

			break;

		case SELECT_BOARD_ID:

			showDetail(SELECT_BOARD_ID, 0, fQuery);

			board_cont.innerHTML = DataSet.getParam(SELECT_BOARD_ID, 1, 0, "notice_cont");

			seqCNT();

			queryUploadFile();

			break;

		case SELECT_UPG_ID:

			showDetail(SELECT_UPG_ID, 0, fQuery);
			break;


		case FILE_SELECT_ID :

			showUploadFileList();

			queryComment();

			break;

		default :
			break;
	}
}



function seqCNT()
{
	if(fQuery.gubun.value =="notice")
	{
		serviceId = UPDATE_NOTICE_ID;

	}else if(fQuery.gubun.value =="board")
	{
		serviceId = UPDATE_BOARD_ID;
	}

	var tran = new Trans();
	tran.setSvc(serviceId);
	tran.setAsync(false);
	tran.open("fQuery","fQuery","/common.do");

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
	tran.open("fQuery", "fQuery", "/common.do");
}

/**
 * ÷������ ����Ʈ ���
 */
function showUploadFileList()
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
		var args = "";

		if(fQuery.gubun.value =="board")
		{
			args = "filename=" + escape(encodeURIComponent(filename)) + "&newfilename=" + escape(encodeURIComponent(newfilename)) + "&delete=NO&foldername=" + UPLOAD_BOARD_FOLDER_NAME + "&filepath=" + UPLOAD_BOARD_PATH;
		}
		else
		{
			args = "filename=" + escape(encodeURIComponent(filename)) + "&newfilename=" + escape(encodeURIComponent(newfilename)) + "&delete=NO&foldername=" + UPLOAD_FOLDER_NAME + "&filepath=" + UPLOAD_PATH;
		}

		if(arrfilename.length > 1 && (trim(arrfilename[arrfilename.length - 1]).toUpperCase() == "HTML" || trim(arrfilename[arrfilename.length - 1]).toUpperCase() == "HTM"))
		{

			uploadFileHTML.append("<a target='iLog' href=\"\" onclick=\"javascript:openPopup('/jsp/common/downFile.jsp', '" + args + "' , 'down', '', '', '1000', '600', 'scrollbars=yes');\">" + filename + "</a>&nbsp;");
		}
		else
		{
			uploadFileHTML.append("<a target='iLog' href=\"/jsp/common/downFile.jsp?" + args + "\">" + filename + "</a>&nbsp;");

		}

		//uploadFileHTML.append("<label onClick=\"delUploadFile_DB("+seq+", '" + newfilename + "')\" style=\"cursor:hand\">");
		//uploadFileHTML.append("<font color=red>X</font></label>");

		uploadFileHTML.append("</td>");
		uploadFileHTML.append("</tr>");
	}

	//f.arr_uploadfileseq.value = makeParamArray(arrSeq);

	uploadFileHTML.append("</table>");

	document.getElementById("divUploadFile").innerHTML = uploadFileHTML.toString();
}

function queryComment()
{
	if(fQuery.gubun.value =="board")
	{
		var trans = new Trans();
		trans.setPageRow(999);
		trans.setSvc(SELECT_REPLYLIST_ID);
		trans.setUserParams("board_seq=" + fQuery.notice_seq.value);
		trans.setWiseGrid("1");
		trans.setForwardId("wgdsl","");
		trans.setCallBack("callbackQueryComment");
		trans.open("fQuery","fQuery","/wisegrid.do");
	}
}


/**
 * ��� ��ȸ �� �ݹ�
 * sSvcId  : ����ID
 */
function callbackQueryComment(sSvcId)
{
	for(var i=0; i<g_Obj.GetRowCount(); i++)
	{
		if( g_Obj.GetCellValue("rg_id", i) != fQuery.userid.value )
		{
			g_Obj.SetCellImage("del", i, -1);
		}
	}
}
/**
 * ���콺�� cell���� �ö����� ȣ��
 * obj : �׸��� ��ü��
 * strType : cell header row
 * strColumnKey : �÷���
 * nRow : row index
 */
function MouseOver(obj, strType, strColumnKey, nRow)
{
	if( strType == "cell" && strColumnKey=="del"  )
	{
		if( g_Obj.GetCellValue("rg_id", nRow) != fQuery.userid.value )
		{
			g_Obj.SetCellCursor('del', nRow ,"arrow");
		}
	}
}
/**
 * ��� ����
 */
function replySave()
{
	if(!f.rply_cont.value)
	{
		//MessageBox("Required", "E", "����");
		MessageBox("", "I", "������ �Է��� �ּ���.");
		f.rply_cont.focus();
		return;
	}

	if(!MessageBox("SavConfirm", "C", "�����")){return;}
	var sParam = "board_seq=" + fQuery.up_seq.value;
	sParam    += "&userid="   + fQuery.userid.value;

	var tran = new Trans();
	tran.setSvc( INSERT_REPLYLIST_ID + "," + RPLY_UP_BOARDLIST_ID );
	tran.setUserParams(sParam);
	tran.setCallBack("callbackReplySave");
	setButton(f.btnRplySave,true);
	tran.open("f","f","/common.do");
}
/**
 * �������ݹ�
 * sSvcId  : ����ID
 */
function callbackReplySave(sSvcId)
{
	if (DataSet.isError(INSERT_REPLYLIST_ID) == "true") {return;}
	else
	{
		f.rply_cont.value = "";
		setButton(f.btnRplySave,false);
		queryComment();
	}
}
/**
 * ���Ŭ��
 * id           : Ŭ���� �׸��尴üID
 * strColumnKey : Ŭ���� �÷���
 * nRow         : Ŭ����Row Index
 */
function showDetailO_obj(id, strColumnKey, nRow)
{
	if( (id==SELECT_REPLYLIST_ID) && (strColumnKey=="del") )
	{
		if( fQuery.userid.value == g_Obj.GetCellValue("rg_id", nRow) )
		{
			replyDel(nRow);
		}
	}
}
/**
 * ��� ����
 */
function replyDel(nRow)
{
	if(!MessageBox("DelConfirm", "C", "����� ")) {return;}
	var tran = new Trans();
	tran.setSvc(DELETE_REPLYLIST_ID+","+RPLY_DOWN_BOARDLIST_ID);

	var sParam = "board_seq=" + fQuery.up_seq.value;
	sParam    += "&userid="   + fQuery.userid.value;
	sParam    += "&rply_seq=" + g_Obj.GetCellValue("rply_seq", nRow);
	tran.setUserParams(sParam);
	tran.setCallBack("callbackReplyDel");
	setButton(f.btnRplySave,true);
	tran.open("","","/common.do");
}
/**
 * ���� �� �ݹ�
 * sSvcId  : ����ID
 */
function callbackReplyDel(sSvcId)
{
	if (DataSet.isError(DELETE_REPLYLIST_ID) == "true") {return;}
	else
	{
		setButton(f.btnRplySave,false);
		queryComment();
	}
}