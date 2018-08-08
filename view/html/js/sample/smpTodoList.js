/**
 * PROJ : Intranet
 * NAME : smpTodoList.js
 * DESC : ���� Todo List ���� ȭ�� �ڹٽ�ũ��Ʈ
 * Author : ������ ����
 * VER  : 1.0
 * Copyright 2009 Nexfron All rights reserved
 * ============================================================================================
 * 								��		��		��		��
 * ============================================================================================
 * VERSION		DATE		AUTHOR		DESCRIPTION
 * ============================================================================================
 * 1.0		2009.09.15		������		�����ۼ�
 */

var gsXaFlag;
var gsBXaFlag;

var aElement = new Array();

/**
 * ȭ�� �ʱ�ȭ
 */
function setInit()
{
	var nIndex = 0;
	aElement[nIndex++] = f.jobnm;
	aElement[nIndex++] = f.rg_id;
	aElement[nIndex++] = f.rg_nm;
	aElement[nIndex++] = btnUserId;
	aElement[nIndex++] = f.statcd;
	aElement[nIndex++] = f.prj_seq;
	aElement[nIndex++] = f.memo;
	
	gsXaFlag = "I";
	gsBXaFlag = "I"
	
	setMode(gsXaFlag);
}

/**
 * ��Ϲ�ư Ŭ��
 */
function setAddMode()
{
	if (gsXaFlag == "U")
	{
		gsBXaFlag = "U";
	}
	
	gsXaFlag = "A";
	setMode(gsXaFlag);
} 

/**
 * ��ҹ�ư Ŭ��
 */
function setCancelMode()
{
	if (gsBXaFlag == "U")
	{
		setMode("U");
//		showDetail_obj(SELECT_ID, "", CURINDEX);
	}
	else
	{
		setMode(gsBXaFlag);
	}
}

/**
 * ȭ���� ��Ʈ��
 * mode : ȭ���� ������
 */
function setMode(mode)
{
	if (mode == "I")
	{
		setDisabledObj(aElement, true);
		//
		setButton(f.btnAdd, 	false);
		setButton(f.btnSave, 	true);
		setButton(f.btnDel, 	true);
		setButton(f.btnCancel, 	true);
	}
	else if (mode == "A")
	{
		setDisabledObj(aElement, false);
		//
		setButton(f.btnAdd, 	true);
		setButton(f.btnSave, 	false);
		setButton(f.btnDel, 	true);
		setButton(f.btnCancel, 	false);
	}
}

/**
 *	����� ������ �˾�
 **/
function openUserOrg(gb)
{
	window.open("/jsp/common/comUserOrg.jsp" ,"UserOrg", "width=800,height=580");
}