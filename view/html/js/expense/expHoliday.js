/**
 * PROJ : Nexfron Intranet
 * NAME : expHoliday.js
 * DESC : �ָ�/���� �ٹ� ��ȸ �ڹٽ�ũ��Ʈ
 * Author : ������
 * VER  : 1.0
 * Copyright 2010 Nexfron All rights reserved
 * ============================================================================================
 * 								��		��		��		��
 * ============================================================================================
 * VERSION		DATE		AUTHOR		DESCRIPTION
 * ============================================================================================
 * 1.0		2010.07.07		������		
 */
var SELECT_SERVICE_01 	 = "UCEXP025S";	
var SELECT_SERVICE_03 	 = "UCEXP028S";
var SELECT_SERVICE_04 	 = "UCEXP029S";
var SELECT_SIGN_HLDY	 = "UCEXP030S";
var INSERT_SIGN_HLDY_NEW = "UCEXP012I,UCEXP014I,UCSYS044I";
var INSERT_SIGN_HLDY_ADD = "UCEXP012I,UCEXP016D,UCSYS044I";
var DELETE_SIGN_HLDY  	 = "UCEXP014D,UCEXP017D,UCEXP015D";
var UPDATE_SIGN_HLDY_01	 = "UCSYS102U";

var popupGubun = "";

var bDefClick	= false;

/** 
* �ʱ�ȭ
*/ 
function init()
{	
	setMode("I");

	// �޴����ѿ� ���� ����
	setButton(fQuery.btnSearch, false);
	
	if (isManager() == true)
	{
		fQuery.rg_id.value 	= "";
		fQuery.qrg_nm.value = "";
		
		setButton(f.btnSign, false);
		setButton(f.btnSignCan, false);
	}
	else
	{
		fQuery.rg_id.value 	= f.userid.value;
		fQuery.qrg_nm.value = f.usernm.value;
		btnUserId.disabled 	= true;
		
		setButton(f.btnSign, true);
		setButton(f.btnSignCan, true);
	}
	
	// �̽�û �ָ��ٹ����� ��ȸ
	queryBeforeAppl()
}

/**
 * ������ �Ǵܿ���
 * @return
 */
function isManager()
{
	var myId		= f.userid.value;
	var myGradeCd	= f.gradecd.value;
	var mySignId1	= f.sign_id1.value;
	var mySignId2	= f.sign_id2.value;
	var mySignId3	= f.sign_id3.value;
	
	if (myId == "nexfron" || myId == "ibegins27" || myGradeCd == "03" || myId == mySignId1 || myId == mySignId2 || myId == mySignId3)
	{
		return true;
	}
	else
	{
		return false;
	}
}


/** 
* ��ȸ ��ư Ŭ����
*/ 
function query()
{
	setMode("R");

	if(getValidation(fQuery, true) == false ) return;
	
	bDefClick = true;
	f.appl_seq.value	= "";
	var param = "";
	var tran = new Trans();       
	tran.setSvc(SELECT_SERVICE_03 + "," + SELECT_SERVICE_01);
	tran.setPageRow(9999);
	tran.setDefClick(true);
	if (fQuery.subGubun.value != "")	param="&subUser=" + f.userid.value;

	tran.setUserParams(param+"&userid=" + f.userid.value);
	tran.setWiseGrid("1,1");
	tran.setForwardId("wgdsl", "wgdsl", "");
	tran.open("fQuery", "", "/wisegrid.do");
}

/**
 * �̽�û �ָ��ٹ����� ��ȸ
 */
function queryBeforeAppl()
{
	if(getValidation(fQuery, true) == false ) return;

	var tran = new Trans();       
	tran.setSvc(SELECT_SERVICE_01);
	tran.setPageRow(9999);
	tran.setWiseGrid("1");
	tran.setForwardId("wgdsl", "wgdsl", "");
	tran.setUserParams("&userid=" + f.userid.value);
	tran.open("fQuery", "", "/wisegrid.do");
}

/**
 * ���ϱٹ� ����û ���翩��
 */
function checkExpAppl(flag)
{
	var applMonth = numberMask(f.req_appl_month.value);
	
	if (applMonth == "" || applMonth.length < 6)
	{
		printMsg("3", "��û���� �Է��Ͻʽÿ�.");
		return;
	}
	
	var tran = new Trans();       
	tran.setSvc(SELECT_SIGN_HLDY);
	tran.setPageRow(9999);
	tran.setUserParams("appl_month="+applMonth+"&userid="+f.userid.value);
	tran.open("", "", "/common.do");
}

/**
 * ���ϱٹ� ����û
 */
function reqExpAppl(flag)
{
	var applMonth = numberMask(f.req_appl_month.value);
	var index	 = 0;
	var appIndex = 0;
	var usrArr	= new Array();
	var wdtArr	= new Array();
	var wtmArr	= new Array();
	var appArr	= new Array();
	var temp	= "";
	
	if (applMonth == "" || applMonth.length < 6)
	{
		printMsg("3", "��û���� �Է��Ͻʽÿ�.");
		return;
	}
	else 
	{
		var gridObj = document.all(SELECT_SERVICE_01);
		var nSize	= gridObj.GetRowCount();
		var bCheck	= false;
		
		for (var i=0; i<nSize; i++)
		{
			if (gridObj.GetCellValue("chk", i) == "1" && parseInt(nvl(gridObj.GetCellValue("work_tm_sec", i), "0"), 10) > 0)
			{
				bCheck = true;
				
				usrArr[index] = gridObj.GetCellValue("rg_id", i);
				wdtArr[index] = numberMask(gridObj.GetCellValue("work_dt", i));
				wtmArr[index] = numberMask(gridObj.GetCellValue("work_tm_sec", i));
				index++;
				
				if (temp != gridObj.GetCellValue("rg_id", i))
				{
					appArr[appIndex++] = gridObj.GetCellValue("rg_id", i);
					temp = gridObj.GetCellValue("rg_id", i);
				}
			}
		}
		
		if (bCheck == false)
		{
			printMsg("3", "��û�Ϸ��� ���ϱٹ������� �����Ͻʽÿ�.");
			return;
		}
	}
	
	//
	var sParam	= "";
	sParam += "&chk_appl_user=" + makeParamArray(usrArr);
	sParam += "&chk_work_dt=" + makeParamArray(wdtArr);
	sParam += "&chk_work_tm=" + makeParamArray(wtmArr);
	sParam += "&appl_user=" + makeParamArray(appArr);
	sParam += "&appl_month=" + applMonth;
	sParam += "&prj_seq=" + f.prj_seq.value;
	sParam += "&appl_seq=" + f.appl_seq.value;
	alert(flag);
	
	
	var tran = new Trans();
	
	if (flag == "NEW")	tran.setSvc(INSERT_SIGN_HLDY_NEW);
	else				tran.setSvc(INSERT_SIGN_HLDY_ADD);
	
	tran.setMyUserParams("id", "@@IDENTITY");
	tran.setMyUserParams("sign_tp_cd", "04");
	tran.setMyUserParams("user_id", f.userid.value);
	tran.setUserParams(sParam);
	tran.open("", "", "/common.do");
	
	printMsg("3", "");
		
}

/**
 * ���ϱٹ� ����û ��� 
 */
function cancelExpAppl()
{
	var applMonth = numberMask(f.appl_month.value);
	var index	= 0;
	var appIndex = 0;
	var usrArr	= new Array();
	var wdtArr	= new Array();
	var appArr	= new Array();
	var temp	= "";
	
	if (applMonth == "" || applMonth.length < 6)
	{
		printMsg("2", "��û���� �Է��Ͻʽÿ�.");
		return;
	}
	else 
	{
		var gridObj = document.all(SELECT_SERVICE_04);
		var nSize	= gridObj.GetRowCount();
		var bCheck	= false;
		
		for (var i=0; i<nSize; i++)
		{
			if (gridObj.GetCellValue("chk", i) == "1")
			{
				bCheck = true;
				
				usrArr[index] = gridObj.GetCellValue("appl_user", i);
				wdtArr[index] = numberMask(gridObj.GetCellValue("work_dt", i));
				index++;
				
				if (temp != gridObj.GetCellValue("appl_user", i))
				{
					appArr[appIndex++] = gridObj.GetCellValue("appl_user", i);
					temp = gridObj.GetCellValue("appl_user", i);
				}
			}
		}
		
		if (bCheck == false)
		{
			printMsg("2", "����Ϸ��� ���ϱٹ������� �����Ͻʽÿ�.");
			return;
		}
	}
	
	//
	var sParam	= "";
	sParam += "&chk_appl_user=" + makeParamArray(usrArr);
	sParam += "&chk_work_dt=" + makeParamArray(wdtArr);
	sParam += "&appl_user=" + makeParamArray(appArr);
	
	gridObj.RemoveAllData();
	
	var tran = new Trans();       
	tran.setSvc(DELETE_SIGN_HLDY);
	tran.setUserParams(sParam);
	tran.open("f", "", "/common.do");
	
	printMsg("2", "");
}

/** 
* ���� ��ư Ŭ����
*/
function Sign()
{
	var gridObj = document.all(SELECT_SERVICE_03);
	var nSize	= gridObj.GetRowCount();
	var bCheck	= false;
	
	var index	= 0;
	var idArr	= new Array();
	var staArr	= new Array();
	var sngdtArr1	= new Array();
	var sngdtArr2	= new Array();
	var sngdtArr3	= new Array();
	var sngcdArr1	= new Array();
	var sngcdArr2	= new Array();
	var sngcdArr3	= new Array();
	
	for (var i=0; i<nSize; i++)
	{
		if (   gridObj.GetCellValue("nowsignid", i) == f.userid.value 
			&& (gridObj.GetCellValue("appchk", i) == "1" || gridObj.GetCellValue("rtnchk", i) == "1"))
		{
			bCheck = true;
			
			idArr[index]	= gridObj.GetCellValue("appl_seq", i);
			
			sngdtArr1[index] = "";
			sngcdArr1[index] = "";
			sngdtArr2[index] = "";
			sngcdArr2[index] = "";
			sngdtArr3[index] = "";
			sngcdArr3[index] = "";
			
			//������ ����
			if (gridObj.GetCellValue("appchk", i) == "1") {
				if (gridObj.GetCellValue("statcd", i) == "01") {
					//���� ���� ������°� �������� ���º��� �۴ٸ�(���ܰ���)...
					if (parseNumeric(gridObj.GetCellValue("statcd", i)) < parseNumeric(gridObj.GetCellValue("sign_stg_cd",i))){
						staArr[index] = "02";
					} else {
						staArr[index] = "04";
					}
					
					sngdtArr1[index] = f.today.value;
					sngcdArr1[index] = "Y";
				// ���� ����������°� '02'(2����������) ���¶��...
				} else if(gridObj.GetCellValue("statcd", i) == "02") {	 
					//���� ���� ������°� �������� ���º��� �۴ٸ�(���ܰ���)...
					if(parseNumeric(gridObj.GetCellValue("statcd",i)) < parseNumeric(gridObj.GetCellValue("sign_stg_cd",i))) {	
						staArr[index] = "03";
					}else{
						staArr[index] = "04";
					}
	
					sngdtArr2[index] = f.today.value;
					sngcdArr2[index] = "Y";
					
				// ���� ����������°� '03'(3����������) ���¶��...
				} else if(gridObj.GetCellValue("statcd", i) == "03") {
					staArr[index] = "04";
						
					sngdtArr3[index] = f.today.value;
					sngcdArr3[index] = "Y";
					
				// ���� ����������°� '05'(�ݷ�) ���¶��...
				} else if(gridObj.GetCellValue("statcd", i) == "05") {
					staArr[index] = "04";
					
					if (gridObj.GetCellValue("nowdepth", i) == "1")
					{
						sngdtArr1[index] = f.today.value;
						sngcdArr1[index] = "Y";
					} 
					else if (gridObj.GetCellValue("nowdepth", i) == "2")
					{
						sngdtArr2[index] = f.today.value;
						sngcdArr2[index] = "Y";
					}
					else if (gridObj.GetCellValue("nowdepth", i) == "3")
					{
						sngdtArr3[index] = f.today.value;
						sngcdArr3[index] = "Y";
					}
				}
			
			// �����ڹݷ�
			} else {
				staArr[index] = "05";
				
				// ���� ����������°� '01'(��û �� 1����������) ���¶��...
				if (gridObj.GetCellValue("statcd",i) == "01") {	
					sngdtArr1[index] = f.today.value;
					sngcdArr1[index] = "N";
				
				// ���� ����������°� '02'(2����������) ���¶��...
				} else if(gridObj.GetCellValue("statcd",i) == "02") {	
					sngdtArr2[index] = f.today.value;
					sngcdArr2[index] = "N";
				
				// ���� ����������°� '03'(3����������) ���¶��...
				} else if(gridObj.GetCellValue("statcd",i) == "03") {	
					sngdtArr3[index] = f.today.value;
					sngcdArr3[index] = "N";
				}
			}
			
			index++;
		}
	}
	
	if (bCheck == false)
	{
		printMsg("1", "�����Ϸ��� ���ϱٹ� ��û��/��û�ڸ� �����Ͻʽÿ�.");
		return;
	}
	
	//
	var sParam	= "";
	sParam += "&sign_tp_cd=04";
	sParam += "&id=" + makeParamArray(idArr);
	sParam += "&statcd=" + makeParamArray(staArr);
	sParam += "&sign_dt1=" + makeParamArray(sngdtArr1);
	sParam += "&sign_f_cd1=" + makeParamArray(sngcdArr1);
	sParam += "&sign_dt2=" + makeParamArray(sngdtArr2);
	sParam += "&sign_f_cd2=" + makeParamArray(sngcdArr2);
	sParam += "&sign_dt3=" + makeParamArray(sngdtArr3);
	sParam += "&sign_f_cd3=" + makeParamArray(sngcdArr3);
	
	var tran = new Trans();       
	tran.setSvc(UPDATE_SIGN_HLDY_01);
	tran.setUserParams(sParam);
	tran.open("f", "", "/common.do");
	
	printMsg("1", "");
}

/** 
* �׸��� Ŭ��
*/ 
function showDetailO_obj(id, strColumnKey, nRow)
{	
	if (id == SELECT_SERVICE_03)
	{
		var GridObj = document.all(SELECT_SERVICE_03);
		
		if ((strColumnKey == "appchk" || strColumnKey == "rtnchk") && GridObj.GetCellValue("nowsignid", nRow) != f.userid.value)
		{
			GridObj.SetCellValue("appchk", nRow, "0");
			GridObj.SetCellValue("rtnchk", nRow, "0");
			return;
		}
		
		if (strColumnKey == "appchk")
		{
			if (GridObj.GetCellValue("appchk", nRow) == "1")
			{
				GridObj.SetCellValue("rtnchk", nRow, "0");
			}
		}
		
		if (strColumnKey == "rtnchk")
		{
			if (GridObj.GetCellValue("rtnchk", nRow) == "1")
			{
				GridObj.SetCellValue("appchk", nRow, "0");
			}
		}
		
		if (strColumnKey == "appchk" || strColumnKey == "rtnchk")	return;
		
		bDefClick = false;
			
		f.appl_month.value	= GridObj.GetCellValue("appl_month", nRow);
		f.appl_seq.value	= GridObj.GetCellValue("appl_seq", nRow);
		
		var params	= "";	
		params	+= "&appl_user="	+ GridObj.GetCellValue("appl_user", nRow);
		/*���� ���ΰϴ� ��� ��� ���� */
		if (GridObj.GetCellValue("sign_f_cd1", nRow) == "Y") 		setButton(f.btnCancel, true);
		else setButton(f.btnCancel, false);
		var trans = new Trans();
		trans.setSvc(SELECT_SERVICE_04);
		trans.setDefClick(false);
		trans.setWiseGrid("1");
		trans.setForwardId("wgdsl","");
		trans.setUserParams(params);
		trans.open("f", "f", "/wisegrid.do");
	}
}

/**
 * �޽��� ���
 */
function printMsg(id, msg)
{
	var msgObj = document.all("msgTD"+id);
	
	if (msg == "")
		msgObj.innerText = " ";
	else
		msgObj.innerText = msg;
}

/**
* ��庯��
*/
function setMode(sType)
{
	return;
	gsXaFlag = sType;
	
	switch(sType)
	{
		case "I" :		//�ʱ�ȭ
			setButton(fQuery.btnSearch, true);
			setButton(f.btnSave, true); 
			setButton(f.btnSign, true);
			setButton(f.btnSignCan, true);
			setButton(f.btnDel, true);
			break;
		case "A" :		//���
			setButton(f.btnSave, false); 
			setButton(f.btnDel, false);
			break;
		case "R" :		//��ȸ
			wisegridClear(SELECT_SERVICE_04);
			setButton(f.btnSave, true); 
			setButton(f.btnDel, true);
			break;
		default:
			break;
	}
}

/**
* callback
*/
function callback(dsnm)
{	
	switch(dsnm) 
	{
		case INSERT_SIGN_HLDY_NEW :
		case INSERT_SIGN_HLDY_ADD :
		case UPDATE_SIGN_HLDY_01 :
		case DELETE_SIGN_HLDY :
			query();
			break;
		case SELECT_SIGN_HLDY :
			if (DataSet.getTotalCount(SELECT_SIGN_HLDY) <= 0)
			{
				reqExpAppl("NEW");
			} 
			else if (DataSet.getParam(SELECT_SIGN_HLDY, 1,  0, "sign_f_cd1") == "Y")
			{
				MessageBox("","E","�̹� ����ó���� ���Դϴ�. �������� ��û�ϼ���.");
			}
			else{
				reqExpAppl("ADD");
			}
			break;
		default:
			break;
	}
}

/** 
*  ����
*/ 
function downExcel()
{
	if (MessageBox("SavConfirm", "C", "������") == false) return false;
	
	var gridObj = document.getElementById(SELECT_SERVICE_04);
	excelExport(gridObj, f.appl_month.value+"�� ���ϱٹ� ��û����");
}

/**
* ����� ������ �˾�
*/
function openUserOrg(gb)
{
	popupGubun = gb;

	window.open("/jsp/common/comUserOrg.jsp" ,"UserOrg", "width=800,height=580");
}

/** 
* ����� ���� ����
*/ 
function setOrgUserInfo(user_id, user_name)
{
		fQuery.rg_id.value = user_id;
		fQuery.qrg_nm.value = user_name;
}

/**
 * ���� ����
 * @param flag
 * @return
 */
function openHelpDiv(flag)
{
	var divObj = document.all("divHelp"+flag);
	divObj.style.display = "";
}

function closeHelp(flag)
{
	try {
		var divObj = document.all("divHelp"+flag);
		divObj.style.display = "none";
	} catch(e) {}
}