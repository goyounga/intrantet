/**
 * PROJ : Nexfron Intranet
 * NAME : astMtrlMng.js
 * DESC : ������� �ڹٽ�ũ��Ʈ
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
var Gridid, GridstrColumnKey, GridnRow;
var actionMode="II";
var g_frm;

var adetailtxt1 = new Array( "mtrl_seq", "prdt_nm", "prdt_no", "mco", "buy_dt", "buy_amt",
							"rnt_id", "rnt_nm", "rnt_dt", "rtn_dt", "mtrl_rmk"
					 	);
var adetailtxt2 = new Array( "sub_mtrl_seq", "prdt_nm", "prdt_no", "mtrl_mco", "buy_dt", "buy_amt", "sub_mtrl_rmk"
					 	);

var oGrid = "";
//***********************************
// ONLOAD
//***********************************
function init()
{
	oGrid = document.all("UCAST020S");
	oGrid.bRowSelectorVisible 	= false;
	oGrid.strHDClickAction 	= "select";
	setMode("I");
	setMode("II");
	actionMode="II";

//	queryList();
}
/**
 * �׸��� ��� �׸���
 * svcid  : ����ID
 */
function makeGridHeaderByMtrl()
{
	oGrid.ClearGrid();
	setProperty(oGrid);
	if (getArrayData( fQuery.queryType, "index" )==0)
	{
		oGrid.AddHeader( "mtrl_c_nm" 	, "���籸��"	 , "t_text"    , -1, "70"  ,	false);
		oGrid.AddHeader( "mco" 		    , "������"		 , "t_text"    , -1, "100" ,	false);
		oGrid.AddHeader( "prdt_nm"	    , "��ǰ��"		 , "t_text"    , -1, "150" ,	false);
		oGrid.AddHeader( "rnt_c_cd" 	, "�뿩����"	 , "t_text"    , -1, "60"  ,	false);
		oGrid.AddHeader( "rnt_nm"		, "�����뿩��"	 , "t_text"    , -1, "70"  , 	false);
	}
	else
	{
		oGrid.AddHeader( "rnt_nm"		, "�����뿩��"	 , "t_text"    , -1, "70"  , 	false);
		oGrid.AddHeader( "mtrl_c_nm" 	, "���籸��"	 , "t_text"    , -1, "70"  ,	false);
		oGrid.AddHeader( "mco" 		    , "������"		 , "t_text"    , -1, "100" ,	false);
		oGrid.AddHeader( "prdt_nm"	    , "��ǰ��"		 , "t_text"    , -1, "150" ,	false);
		oGrid.AddHeader( "rnt_c_cd" 	, "�뿩����"	 , "t_text"    , -1, "60"  ,	false);
	}
	oGrid.AddHeader( "rnt_dt" 	    , "�����뿩����" , "t_date"    , -1, "75"  , 	false);
	oGrid.AddHeader( "rtn_dt" 	    , "�����ݳ�����" , "t_date"    , -1, "75"  , 	false);
	oGrid.AddHeader( "buy_dt" 	    , "��������"	 , "t_date"    , -1, "75"  , 	false);
	oGrid.AddHeader( "buy_amt" 	    , "���԰���"	 , "t_number"  , -1, "55"  , 	false);
	oGrid.AddHeader( "cnt" 	    	, "�μ�ǰ"	 	 , "t_number"  , -1, "50"  , 	false);

	oGrid.AddHeader( "prdt_no" 	    , "��ǰ��ȣ"	 , "t_text"    , -1, "150"  , 	false);
	oGrid.AddHeader( "mtrl_seq" 	, "�������"	 , "t_text"    , -1, "60"  ,	false);
	oGrid.AddHeader( "mtrl_c_cd" 	, "���籸���ڵ�" , "t_text"    , -1, "60"  ,	false);
	oGrid.AddHeader( "mtrl_rmk"	    , "���"		 , "t_text"    , -1, "60"  ,	false);
	oGrid.AddHeader( "rnt_id" 	    , "�뿩��ID"	 , "t_text"    , -1, "60"  ,	false);
	oGrid.AddHeader( "rg_dt" 		, "�������"	 , "t_text"    , -1, "60"  , 	false);
	oGrid.AddHeader( "rg_tm" 		, "��Ͻð�"	 , "t_text"    , -1, "60"  , 	false);
	oGrid.AddHeader( "rg_id" 		, "�����ID"	 , "t_text"    , -1, "60"  , 	false);
	oGrid.AddHeader( "rg_nm" 		, "�����"		 , "t_text"    , -1, "60"  , 	false);
	oGrid.AddHeader( "mdf_dt"		, "��������"	 , "t_date"    , -1, "75"  , 	false);
	oGrid.AddHeader( "mdf_tm"		, "����ð�"	 , "t_date"    , -1, "60"  , 	false);
	oGrid.AddHeader( "mdf_id"		, "������ID"	 , "t_text"    , -1, "60"  , 	false);
	oGrid.AddHeader( "mdf_nm"		, "������"		 , "t_text"    , -1, "60"  , 	false);
	oGrid.BoundHeader();
//	oGrid.SetColHide( "prdt_no" 	, true);
	oGrid.SetColHide( "mtrl_seq" 	, true);
	oGrid.SetColHide( "mtrl_c_cd" 	, true);
	oGrid.SetColHide( "mtrl_rmk"	, true);
	oGrid.SetColHide( "rnt_id" 	    , true);
	oGrid.SetColHide( "rg_dt" 		, true);
	oGrid.SetColHide( "rg_tm" 		, true);
	oGrid.SetColHide( "rg_id" 		, true);
	oGrid.SetColHide( "rg_nm" 		, true);
//	oGrid.SetColHide( "mdf_dt"		, true);
//	oGrid.SetColHide( "mdf_tm"		, true);
//	oGrid.SetColHide( "mdf_id"		, true);
//	oGrid.SetColHide( "mdf_nm"		, true);
	oGrid.SetColCellAlign ("rnt_c_cd" 	, "center");
	oGrid.SetColCellAlign ("rnt_nm"		, "center");
	oGrid.SetColCellAlign ("rnt_dt" 	, "center");
	oGrid.SetColCellAlign ("rtn_dt" 	, "center");
	oGrid.SetColCellAlign ("buy_dt" 	, "center");
	oGrid.SetColCellAlign ("buy_amt"  	, "right");
	oGrid.SetColCellAlign ("cnt"  		, "center");
	oGrid.SetColCellAlign ("mdf_dt"  	, "center");
	oGrid.SetColCellAlign ("mdf_tm"  	, "center");
	oGrid.SetColCellAlign ("mdf_id"  	, "center");
	oGrid.SetColCellAlign ("mdf_nm"  	, "center");
	
	oGrid.SetDateFormat('rnt_dt','yyyy-MM-dd');
	oGrid.SetDateFormat('rtn_dt','yyyy-MM-dd');
	oGrid.SetDateFormat('buy_dt','yyyy-MM-dd');

	oGrid.SetDateFormat('mdf_dt','yyyy-MM-dd');


	oGrid.SetNumberFormat('buy_amt','#,###');
	oGrid.SetColCellFgColor("cnt","24|100|228");
	oGrid.SetColCellFontBold("cnt","true");
}
//***********************************
// queryList ��ȸ
//***********************************
function queryList()
{
	setMode("I");
	setMode("II");
	actionMode="II";

	var orderByStr = (getArrayData( fQuery.queryType, "index" )==0)
						? "mtrl_c_nm,mco,prdt_nm,rnt_nm"
						: "rnt_nm,mtrl_c_nm,mco,prdt_nm";
	makeGridHeaderByMtrl();
	oGrid.setParam("mdf_tm_format" , "TIME");
	var trans = new Trans();
	trans.setSvc("UCAST020S");					// ����ID
	trans.setPageRow("9999");					// 1Page�� �� ���� Row�� ����� ���ΰ�?
	trans.setWiseGrid("1");					// wisegrid�� ����ϴ� ��� �ݵ�� �߰�
	trans.setForwardId("wgdsl","");			// wisegrid�� ����ϴ� ��� �ݵ�� �߰�
	trans.setUserParams("orderby="+orderByStr);
	trans.setCallBack("callbackqQueryList");
	trans.open("fQuery", "f","/wisegrid.do");
}
/**
 * �򰡹���,����������ȸ�ݹ�
 * svcid  : ����ID
 */
function callbackqQueryList(sSvcId)
{
	if(sSvcId=="UCAST020S")
	{try{
		if (getArrayData( fQuery.queryType, "index" )==0)
		{
			//fGrid.ClearGroupMerge();
			oGrid.SetGroupMerge( "mtrl_c_nm,mco,prdt_nm,rnt_nm");
		}
		else
		{
			//oGrid.SetColIndex("rnt_nm",0);
			//alert();
			oGrid.SetGroupMerge( "rnt_nm,mtrl_c_nm,mco,prdt_nm");
		}
	}catch(e){alert(e.description);}
	}
}
//***********************************
// queryList ��ȸ
//***********************************
function queryListMB()
{
	setMode("II");
	actionMode="II";
	if (fmb.btnAddMB)  	fmb.btnAddMB.disabled = false;

	if(f.mtrl_seq.value=="") return;

	var trans = new Trans();
	trans.setSvc("UCAST021S");					// ����ID
	trans.setPageRow("9999");					// 1Page�� �� ���� Row�� ����� ���ΰ�?
	trans.setWiseGrid("1");					// wisegrid�� ����ϴ� ��� �ݵ�� �߰�
	trans.setForwardId("wgdsl","");			// wisegrid�� ����ϴ� ��� �ݵ�� �߰�
	trans.setUserParams("mtrl_seq="+f.mtrl_seq.value);
	trans.open("", "fmb","/wisegrid.do");
}

/********************
* �׸��� Ŭ��
********************/
function showDetailO_obj(id, strColumnKey, nRow)
{
	var GridObj;

	if(id=="UCAST020S"){
		GridObj = document.all[id];

		Gridid = id;
		GridstrColumnKey = strColumnKey;
		GridnRow = nRow;

		for(var i=0; i<adetailtxt1.length; i++)
		{
			document.f(adetailtxt1[i]).value = GridObj.GetCellValue(adetailtxt1[i], nRow);
		}
		f.buy_dt.value = checkDate(f.buy_dt.value);
		f.buy_amt.value = moneyMask(f.buy_amt.value);
		f.rnt_dt.value = checkDate(f.rnt_dt.value);
		f.rtn_dt.value = checkDate(f.rtn_dt.value);
		f.mtrl_c_cd.value = GridObj.GetCellValue("mtrl_c_cd", nRow);
		f.rnt_c_cd.value = GridObj.GetCellValue("rnt_c_cd", nRow);

		setMode("S");

		queryListMB();
	}else if(id=="UCAST021S"){
		GridObj = document.all[id];

		for(var i=0; i<adetailtxt2.length; i++)
		{
			document.fmb(adetailtxt2[i]).value = GridObj.GetCellValue(adetailtxt2[i], nRow);
		}
		fmb.buy_dt.value = checkDate(fmb.buy_dt.value);
		fmb.buy_amt.value = moneyMask(fmb.buy_amt.value);
		fmb.mtrl_c_cd.value = GridObj.GetCellValue("mtrl_c_cd", nRow);

		setMode("SS");
		actionMode="SS";

	}
}

//***********************************
// ���� ���� ���
//***********************************
function Add()
{
	setMode("U");
	setMode("II");
	actionMode="U";
}

//***********************************
// ���� ���� ����
//***********************************
function Save()
{
	if(f.userid.value == "")
	{
		alert("�α��� ������ �����ϴ�. ��α��� �ϼ���.");
		return;
	}
	if(f.mtrl_c_cd.value == "")
	{
		MessageBox("Required", "E", "���籸��");
		f.mtrl_c_cd.focus();
		return;
	}
	if(f.prdt_nm.value == "")
	{
		MessageBox("Required", "E", "��ǰ��");
		f.prdt_nm.focus();
		return;
	}

	if (checkTermDate(f.rnt_dt, f.rtn_dt, true, true) == false) return;

	var svcid = "";
	if(f.mtrl_seq.value == "")
	{
		svcid = "UCAST020I";
	}else
	{
		svcid = "UCAST020U";
	}

	var tran=new Trans();
	tran.setSvc(svcid);
	tran.open("f","","/common.do");
}

//***********************************
// ����
//***********************************
function Del()
{
	if(f.userid.value == "")
	{
		alert("�α��� ������ �����ϴ�. ��α��� �ϼ���.");
		return;
	}

	if(f.mtrl_seq.value == "")
	{
		MessageBox("NotChecked", "E", "");
		return;
	}

	if(!MessageBox("DelConfirm", "C", "")) return;

	var tran=new Trans();
	tran.setSvc("UCAST021D,UCAST020D");
	tran.setUserParams("mtrl_seq="+f.mtrl_seq.value);
	tran.open("","","/common.do");
}
//***********************************
// ���� ���� MB���
//***********************************
function AddMB()
{
	setMode("UU");
	actionMode="UU";
}

//***********************************
// ���� ���� MB����
//***********************************
function SaveMB()
{
	if(f.userid.value == "")
	{
		alert("�α��� ������ �����ϴ�. ��α��� �ϼ���.");
		return;
	}

	if(fmb.mtrl_c_cd.value == "")
	{
		MessageBox("Required", "E", "���籸��");
		fmb.mtrl_c_cd.focus();
		return;
	}

	if(fmb.prdt_nm.value == "")
	{
		MessageBox("Required", "E", "��ǰ��");
		fmb.prdt_nm.focus();
		return;
	}

	var svcid = "";
	if(actionMode == "UU")
	{
		svcid = "UCAST021I";
	}else
	{
		svcid = "UCAST021U";
	}

	var tran=new Trans();
	tran.setSvc(svcid);
	tran.setUserParams("mtrl_seq="+f.mtrl_seq.value);
	tran.open("fmb","","/common.do");
}

//***********************************
// ���� MB
//***********************************
function DelMB()
{
	if(f.userid.value == "")
	{
		alert("�α��� ������ �����ϴ�. ��α��� �ϼ���.");
		return;
	}

	if(fmb.sub_mtrl_seq.value == "")
	{
		MessageBox("NotChecked", "E", "");
		return;
	}

	if(!MessageBox("DelConfirm", "C", "")) return;

	var tran=new Trans();
	tran.setSvc("UCAST021D");
	tran.setUserParams("mtrl_seq="+f.mtrl_seq.value+"&sub_mtrl_seq="+fmb.sub_mtrl_seq.value);
	tran.open("","","/common.do");
}

/********************
* CALLBACK
********************/
function callback(sServiceID)
{
	switch (sServiceID)
	{
		case "UCAST020I":
			queryList();
			break;
		case "UCAST020U":
			queryList();
			break;
		case "UCAST021D,UCAST020D":
			queryList();
			break;
		case "UCAST021I":
			queryListMB();
			break;
		case "UCAST021U":
			queryListMB();
			break;
		case "UCAST021D":
			queryListMB();
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

	switch(sType)
	{
		case "I":	//�ʱ�ȭ
			var GridObj = document.UCAST020S;
			GridObj.RemoveAllData();

			for(var i=0; i<adetailtxt1.length; i++)
			{
				document.f(adetailtxt1[i]).value = "";
			}
			f.mtrl_c_cd.selectedIndex = 0;
			f.rnt_c_cd.selectedIndex = 1;

			if (f.btnAdd)  		f.btnAdd.disabled = false;
			if (f.btnSave)  	f.btnSave.disabled = true;
			if (f.btnDel)  		f.btnDel.disabled = true;

			break;
		case "II":	//�ʱ�ȭ
			var GridObj = document.UCAST021S;
			GridObj.RemoveAllData();

			for(var i=0; i<adetailtxt2.length; i++)
			{
				document.fmb(adetailtxt2[i]).value = "";
			}
			fmb.mtrl_c_cd.selectedIndex = 0;

			if (fmb.btnAddMB)  	fmb.btnAddMB.disabled = true;
			if (fmb.btnSaveMB)  fmb.btnSaveMB.disabled = true;
			if (fmb.btnDelMB)  	fmb.btnDelMB.disabled = true;

			break;
		case "U":	//������ ���

			for(var i=0; i<adetailtxt1.length; i++)
			{
				document.f(adetailtxt1[i]).value = "";
			}
			f.mtrl_c_cd.selectedIndex = 0;
			f.rnt_c_cd.selectedIndex = 1;

			if (f.btnAdd)  		f.btnAdd.disabled = false;
			if (f.btnSave)  	f.btnSave.disabled = false;
			if (f.btnDel)  		f.btnDel.disabled = true;

			break;
		case "UU":	//������ ���
			for(var i=0; i<adetailtxt2.length; i++)
			{
				document.fmb(adetailtxt2[i]).value = "";
			}
			fmb.mtrl_c_cd.selectedIndex = 0;

			if (fmb.btnAddMB)  	fmb.btnAddMB.disabled = false;
			if (fmb.btnSaveMB)  fmb.btnSaveMB.disabled = false;
			if (fmb.btnDelMB)  	fmb.btnDelMB.disabled = true;

			break;
		case "S":	//������ ����
			if (f.btnAdd)  		f.btnAdd.disabled = false;
			if (f.btnSave)  	f.btnSave.disabled = false;
			if (f.btnDel)  		f.btnDel.disabled = false;

			break;
		case "SS":	//������ ����
			if (fmb.btnAddMB)  	fmb.btnAddMB.disabled = false;
			if (fmb.btnSaveMB)  fmb.btnSaveMB.disabled = false;
			if (fmb.btnDelMB)  	fmb.btnDelMB.disabled = false;
			break;
		default:
			break;
	}
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
	g_frm.rnt_id.value = id;
	g_frm.rnt_nm.value = nm;

}

/********************
* ����� Clear��ư
********************/
function del_userID(frm)
{
	frm.rnt_id.value = "";
	frm.rnt_nm.value = "";
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