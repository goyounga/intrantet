/**
 * PROJ : Nexfron Intranet
 * NAME : sysWeeklyRpt.js
 * DESC : �ְ����� �ڹٽ�ũ��Ʈ
 * Author : ������ ����
 * VER  : 1.0
 * Copyright 2009 Nexfron All rights reserved
 * ============================================================================================
 * 								��		��		��		��
 * ============================================================================================
 * VERSION		DATE		AUTHOR		DESCRIPTION
 * ============================================================================================
 * 1.0		2009.08.12		������		�ּ��߰�
 */
var SELECT_SEQ_ID	= "UCSYS103S";						//�ְ����� ���� ��ȸ
var SELECT_ID		= "UCSYS100S";						//�ְ����� ��ȸ
var DETAIL_ID		= "UCSYS101S,UCSYS102S";			//�ְ����� ����ȸ
var INSERT_ID		= "UCSYS100I,UCSYS101I,UCSYS044I";	//�ְ����� ����
//var INSERT_SIGN_ID	= "UCSYS044I";						//�������� ����
var UPDATE_ID		= "UCSYS101D,UCSYS100U,UCSYS101I,UCSYS102D,UCSYS044I";	//�ְ����� ����
var UPDATE_EDIT_ID	= "UCSYS101D,UCSYS101I";			//�ְ����� ����
var DELETE_ID		= "UCSYS101D,UCSYS100D,UCSYS102D";	//�ְ����� �������� ����
var SELECT_DAY_ID	= "UCSYS106S";						//������ ��¥�� ���� �޹����� ��ȸ

var g_Flag;		//�����÷���
var gid;
var gnext_val;
var objArr = new Array();
var popupGubun = "";
var savemode = ""; //���� ����

/********************
* �ʱ�ȭ
********************/
function init()
{
	if(f.gradecd.value != '03'){
		fQuery.qrg_id.value = f.userid.value;
		fQuery.qrg_nm.value = f.usernm.value;
		fQuery.qrg_nm.disabled = true;
		btnUserId.disabled = true;
	}

	objArr = new Array(f.subject, f.user_prj_seq,f.weekly_content, f.next_weekly_content, f.issue);
	setMode("INIT");
}

/********************
* �������� �ð�����
********************/
function setWorkTime()
{
	for(var i = 0 ; i < f.start_tm.length-2 ; i++){
		f.start_tm[i].value	= "09:00";
		f.end_tm[i].value	= "18:00";
	}
}


/********************
* ��ȸ
********************/
function queryList()
{
	if (getValidation(fQuery, true) == false) return;

	if (checkTermDate(fQuery.date_from, fQuery.date_to, true, true) == false) return;

	if(fQuery.dept_cd.value == "05")
	{
		fQuery.subQuery2.value = "";
	}
	else if(fQuery.dept_cd.value == "03")	//���������� + ������Ʈ��
	{
		fQuery.subQuery2.value = "'02','03'";
	}
	else if(fQuery.dept_cd.value == "01")	//�ַ�ǿ����� + CS��
	{
		fQuery.subQuery2.value = "'01','06'";
	}
	else
	{
		fQuery.subQuery2.value = fQuery.dept_cd.value;
	}

	var trans = new Trans();
	trans.setPageRow(999);
	trans.setSvc(SELECT_ID);
	trans.setDefClick(false);
	trans.setWiseGrid("1");
	trans.setForwardId("wgdsl","");
	trans.open("fQuery","f","/wisegrid.do");
}

/********************
* �ݹ�
********************/
function callback(dsnm)
{
	switch (dsnm)
	{
		case SELECT_SEQ_ID :
			if(DataSet.getParam(dsnm, 1, 0, "next_val") != ""){
				gnext_val = DataSet.getParam(dsnm, 1, 0, "next_val");
				save_callback();
			}
			break;

		case SELECT_ID :
			setMode("INIT");
			break;

		case DETAIL_ID :
			for(var i=0 ; i < DataSet.getTotalCount("UCSYS102S") ; i++){
				f.content[i].value	= DataSet.getParam("UCSYS102S", 1, i, "content");
				f.start_tm[i].value = getFormatData(DataSet.getParam("UCSYS102S", 1, i, "start_tm"), "TIME");
				f.end_tm[i].value	= getFormatData(DataSet.getParam("UCSYS102S", 1, i, "end_tm"), "TIME");
				f.holi_gb[i].value	= DataSet.getParam("UCSYS102S", 1, i, "holi_gb");
				f.prj_seq[i].value	= DataSet.getParam("UCSYS102S", 1, i, "prj_seq");
			}

			setWeekDay();
			break;

		case INSERT_ID :
			if (DataSet.getParam("UCSYS100I", 1, 0, "SUCCESS_COUNT") > 0 && DataSet.getParam("UCSYS101I", 1, 0, "SUCCESS_COUNT") > 0)
			{
				MessageBox("InfSuccess", "I", "");
				queryList();
			}
			else
			{
				MessageBox("InfFail", "E", "");
			}

			break;

		case UPDATE_ID :
			if (DataSet.getParam("UCSYS100U", 1, 0, "SUCCESS_COUNT") > 0)
			{
				MessageBox("InfSuccess", "I", "");
				queryList();
			}
			else
			{
				MessageBox("InfFail", "E", "");
			}

			break;

		case DELETE_ID :
			if (DataSet.getParam("UCSYS100D", 1, 0, "SUCCESS_COUNT") > 0 && DataSet.getParam("UCSYS101D", 1, 0, "SUCCESS_COUNT") > 0)
			{
				MessageBox("Success", "I", "");
				clear(f);
				queryList();
			}
			else
			{
				MessageBox("Fail", "E", "");
			}

			break;

		case SELECT_DAY_ID :
			for(var i=0 ; i < DataSet.getTotalCount("UCSYS106S") ; i++){
				if(DataSet.getParam("UCSYS106S", 1, i, "hldy_f") == "Y" ||
					(DataSet.getParam("UCSYS106S", 1, i, "dayw") == "1" || DataSet.getParam("UCSYS106S", 1, i, "dayw") == "7") )
				{
					spnDayNm[i].innerHTML = "(<font color='red'>" + getFormatData(DataSet.getParam("UCSYS106S", 1, i, "bse_dt"), "DATE") + "</font>)";
					if(g_Flag!="U")
					{
						f.holi_gb[i].value = "H";
					}
				}
				else
				{
					spnDayNm[i].innerHTML = "(" + getFormatData(DataSet.getParam("UCSYS106S", 1, i, "bse_dt"), "DATE") + ")";
					if(g_Flag!="U")
					{
						f.holi_gb[i].value = "W";
					}
				}
			}
		default:

			break;
	}
}


/*****************/
//������
//�׸��� onclick �̺�Ʈ �Լ�
/*****************/
function showDetailO_obj(id, strColumnKey, nRow)
{
	switch(id)
	{
		//����Ʈ Ŭ����
		case SELECT_ID:

			setMode("U");
			//showDetailByWise(id, nRow, f);

			var obj = document.all(SELECT_ID);
			gid = obj.GetCellValue("id", nRow);

			if(gid == "") return;

			var trans = new Trans();
			trans.setUserParams("id="+gid);
			trans.setSvc(DETAIL_ID);
			trans.setWiseGrid("0");
			trans.open("f", "f", "/common.do");

		break;
	}
}

/*****************/
//��Ϲ�ư
/*****************/
function add()
{
	setMode("A");
}

/*****************/
//�����ư Ŭ���� ���� ��������
/*****************/
function save(mode)
{
	if (mode == "edit")
	{
		savemode = mode;
		save_callback();
		return;
	}
	
	if(g_Flag == "U" && !(f.statcd.value == "01" || f.statcd.value == "05" || f.statcd.value == "06")) //01 1����û, 05 �ݷ�, 06 �ӽ�����
	{
		MessageBox("RPTError3", "I", "");
		return;
	}

	if (getValidation(f, true) == false) return;

	if(!MessageBox("SavConfirm", "C", ""))
		return;

	savemode = mode;

	if(g_Flag == "A")
	{
		var trans = new Trans();
		trans.setSvc(SELECT_SEQ_ID);
		trans.setWiseGrid("0");
		trans.open("f", "f", "/common.do");
	}
	else if(g_Flag == "U")
	{
		if(gid == "") return;

		save_callback();
	}
}

/*****************/
//�����ư
/*****************/
function save_callback()
{
	var batchData = Array();
	var index = 0;
	var sParam = "";
	var sServiceID;

	addDay(removeMask(f.start_dt.value).substring(0,4), removeMask(f.start_dt.value).substring(4,6), removeMask(f.start_dt.value).substring(6,8), 1);

	for (var i=0; i<f.content.length; i++) {

		batchData[index] = "&qseq_no="+ i;
		batchData[index] += "&qcontent="+ paramEscape(f.content[i].value);
		batchData[index] += "&qwork_dt="+ addDay(removeMask(f.start_dt.value).substring(0,4), removeMask(f.start_dt.value).substring(4,6), removeMask(f.start_dt.value).substring(6,8), i);
		batchData[index] += "&qstart_tm="+ f.start_tm[i].value;
		batchData[index] += "&qend_tm="+ f.end_tm[i].value;
		batchData[index] += "&qholi_gb="+ f.holi_gb[i].value;
		batchData[index] += "&qprj_seq="+ f.prj_seq[i].value;

		sParam += batchData[index];
		index++;
	}

	if(savemode=="temp")
		sParam += "&tstatcd=06";
	else
		sParam += "&tstatcd=01";

	sParam += "&sign_tp_cd=02";
	var tran = new Trans();

	if(g_Flag == "A")
	{
		sServiceID	= INSERT_ID;
		tran.setUserParams("id="+gnext_val+sParam);
	}
	else if(g_Flag == "U")
	{
		if(gid == "") return;
		
		if (savemode == "edit")
		{
			sServiceID	= UPDATE_EDIT_ID;
			tran.setUserParams("id="+gid+sParam);
		}
		else
		{
			sServiceID	= UPDATE_ID;
			tran.setUserParams("id="+gid+sParam);
		}
	}

	tran.setSvc(sServiceID);
	tran.open("f","f","/common.do");
}

/*****************/
//������ư
/*****************/
function del()
{
	if(g_Flag == "U" && f.statcd.value != "01"  && f.statcd.value != "06")
	{
		MessageBox("RPTError4", "I", "");
		return;
	}

	if(!MessageBox("DelConfirm", "C", ""))
		return;

	if(gid == "") return;

	var tran = new Trans();
	tran.setSvc(DELETE_ID);
	tran.setUserParams("id="+gid);
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
			f.btnAdd.disabled = false;
			f.btnTempSave.disabled = true;
			f.btnSave.disabled = true;
			f.btnEdit.disabled = true;
			f.btnDel.disabled = true;
			clearInput();	//�Է°� �ʱ�ȭ
			setDisabledObj(objArr, true);	//�Է°� Ȱ��ȭ or ��Ȱ��ȭ
			setInput(true);	//�Է°� Ȱ��ȭ or ��Ȱ��ȭ
			f.chk.disabled = true;
			f.chk.checked = false;
			break;

		case "A":		//���
			f.btnAdd.disabled = false;
			f.btnTempSave.disabled = false;
			f.btnSave.disabled = false;
			f.btnEdit.disabled = true;
			f.btnDel.disabled = true;
			clearInput();	//�Է°� �ʱ�ȭ
			setWorkTime();	//�ð�����
			setDisabledObj(objArr, false);	//�Է°� Ȱ��ȭ or ��Ȱ��ȭ
			setInput(false);	//�Է°� Ȱ��ȭ or ��Ȱ��ȭ
			f.chk.disabled = false;
			//�̹��� ������ / �Ͽ��ϱ��� ��¥ ��������
			setCalendar("f.start_dt", f.today.value);
			//f.start_dt.value 	= getCurWeekDay(f.today.value, "1");	//������
			//f.end_dt.value 		= getCurWeekDay(f.today.value, "7");	//���� �Ͽ���
			break;

		case "U":		//����
			f.btnAdd.disabled = false;
			f.btnTempSave.disabled = false;
			f.btnSave.disabled = false;
			f.btnEdit.disabled = false;
			f.btnDel.disabled = false;
			setDisabledObj(objArr, false);	//�Է°� Ȱ��ȭ or ��Ȱ��ȭ
			setInput(false);	//�Է°� Ȱ��ȭ or ��Ȱ��ȭ
			f.chk.disabled = false;
			f.chk.checked = false;
			break;

		default:
			break;
	}
}

/**
 *	����� ������ �˾�
 **/
function openUserOrg(gb)
{
	popupGubun = gb;

	window.open("/jsp/common/comUserOrg.jsp" ,"UserOrg", "width=800,height=580");
}

//��������� ����
function setOrgUserInfo(user_id, user_name)
{
	if(popupGubun == "qrg_id"){
		fQuery.qrg_id.value = user_id;
		fQuery.qrg_nm.value = user_name;
	}else{
		f.report_object.value = user_id;
		f.report_object_nm.value = user_name;
	}
}

/**
 * �ۼ��� onBlur
 */
function usernm_onBlur(obj)
{
	if(popupGubun == "qrg_id"){
		if(obj.value == "") {
			fQuery.qrg_id.value = "";
			fQuery.qrg_nm.value = "";
		}
	}else{
		if(obj.value == "") {
			f.report_object.value = "";
			f.report_object_nm.value = "";
		}
	}
}

/********************
* �Է����� �ʱ�ȭ
********************/
function clearInput()
{
	var input_list	= new Array("subject", "user_prj_seq", "start_dt", "end_dt", "weekly_content", "next_weekly_content", "statcdnm", "response", "issue", "rg_nm", "rg_dt", "mdf_nm", "mdf_dt");

	for(var i = 0 ; i < input_list.length ; i++){
		document.getElementById(input_list[i]).value	= "";
	}

	for(var i = 0 ; i < f.content.length ; i++){
		 f.content[i].value	= "";
	}

	for(var i = 0 ; i < f.start_tm.length ; i++){
		f.start_tm[i].value	= "";
		f.end_tm[i].value	= "";
	}

	for(var i = 0 ; i < f.holi_gb.length ; i++){
		if(i == 5 || i ==6){
			f.holi_gb[i].value	= "H";
		}else{
			f.holi_gb[i].value	= "W";
		}
	}

	for(var i = 0 ; i < f.prj_seq.length ; i++){
		f.prj_seq[i].value	= "";
	}
}

/********************
* ������~�Ͽ��� �Է����� Ȱ��ȭ or ��Ȱ��ȭ
********************/
function setInput(gb)
{
	for(var i = 0 ; i < f.content.length ; i++){
		 f.content[i].disabled	= gb;
	}

	for(var i = 0 ; i < f.start_tm.length ; i++){
		f.start_tm[i].disabled	= gb;
		f.end_tm[i].disabled	= gb;
	}

	for(var i = 0 ; i < f.holi_gb.length ; i++){
		f.holi_gb[i].disabled	= gb;
		f.prj_seq[i].disabled	= gb;
	}
}

/********************
* �޹����� onchange
********************/
function holi_onChange(gb)
{
	if(f.holi_gb[gb].value == "W"){
		f.start_tm[gb].value	= "09:00";
		f.end_tm[gb].value		= "18:00";
	}else{
		f.start_tm[gb].value	= "";
		f.end_tm[gb].value		= "";
	}
}

/**
 * �̹��� �ش� ���� ��������
 * dt : ���� ��¥
 * day : ���ϰ� ���� ���� (��:0 ��:1 ȭ:2 ... ���� �Ͽ���:7)
 */
function getCurWeekDay(dt, day)
{
	var result = "";

	dt = removeMask(dt);
	var curdt = new Date(dt.substr(0,4),dt.substr(4,2)-1,dt.substr(6,2));
	var curday = curdt.getDay(); //���� ����
	var period = day - curday;

	result = getDateWithOffset(dt, period, "-");

	return result;
}

//���� ������Ʈ �ڵ� ����
function setCurPrj()
{
	if(f.chk.checked)
	{
		for(var i = 0 ; i < 5 ; i++)
		{
			try
			{
				f.prj_seq[i].value = f.user_prj_seq.value;
			}
			catch(e)
			{
				f.prj_seq[i].value = "";
			}
		}
	}
	else
	{
		for(var i = 0 ; i < 5 ; i++)
		{
			f.prj_seq[i].value = "";
		}
	}
}

//�ް� ���� ���� ��
function changeHoliGb(obj)
{
	var CEI = parseInt(getCurElementIdx(obj));	//���� Element Index
	var preElement = f.elements[CEI - 1];		//���� Element		: f.end_tm
	var pPreElement = f.elements[CEI - 2];		//������ Element 	: f.start_tm

	//�޹�
	if(obj.value == "H")
	{
		preElement.value = "";
		pPreElement.value = "";
	}
	//�ް�
	else if(obj.value == "V")
	{
		preElement.value = "";
		pPreElement.value = "";
	}
	//�ٹ�
	else if(obj.value == "W")
	{
		preElement.value = "18:00";
		pPreElement.value = "09:00";
	}
	else
	{
		preElement.value = "";
		pPreElement.value = "";
	}
}

//���� Element Index
function getCurElementIdx(obj)
{
	var f = obj.form;

	for(var i = 0 ; i < f.elements.length ; i ++)
	{
		if(f.elements[i] == obj)
		{
			return i;
		}
	}
}

/**
  * ���õ� ��¥ ���� (ucare_util.js�� �ִ� setCalendar�� �������̵� ��.)
  * sType : ��¥�� ���� text ��ü
  * sDate : text ��ü ��
  * sType(��¥�� ���� text ��ü)�� ������� ����� ������� ��ü�� pattern�Ӽ��� �ְ� ���� M���� �����صд�.
  */
function setCalendar(sType, sDate)
{

	if(sType == "f.start_dt")
	{
		//�̹��� ������ / �Ͽ��ϱ��� ��¥ ��������
		f.start_dt.value 	= getCurWeekDay(sDate, "1");	//������
		f.end_dt.value 		= getCurWeekDay(sDate, "7");	//���� �Ͽ���

		setWeekDay();
	}
	else
	{
		(eval(sType)).value = sDate;
	}
}

function setWeekDay()
{
	var trans = new Trans();
		trans.setSvc(SELECT_DAY_ID);
		trans.open("f", "f", "/common.do");

}

function setCheck()
{
	f.chk.checked = true;

		if(f.chk.checked)
	{
		for(var i = 0 ; i < 5 ; i++)
		{
			try
			{
				f.prj_seq[i].value = f.user_prj_seq.value;
			}
			catch(e)
			{
				f.prj_seq[i].value = "";
			}
		}
	}
	else
	{
		for(var i = 0 ; i < 5 ; i++)
		{
			f.prj_seq[i].value = "";
		}
	}

}
