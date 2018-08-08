/**
 * PROJ : Nexfron Intranet
 * NAME : astBookMng.js
 * DESC : �������� �ڹٽ�ũ��Ʈ
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

var adetailtxt1 = new Array( "book_seq", "book_sbjt", "book_co", "book_writ", "buy_dt", "buy_amt",
							"dnat_id", "dnat_nm", "book_rmk"
					 	);
var adetailtxt2 = new Array( "book_rnt_hst_seq", "rnt_id", "rnt_nm", "rnt_dt", "rtn_dt", "rnt_rmk"
					 	);
//***********************************
// ONLOAD
//***********************************
function init()
{
	setMode("I");
	setMode("II");
	actionMode="II";
	
//	queryList();
}

//***********************************
// queryList ��ȸ
//***********************************
function queryList()
{
	setMode("I");
	setMode("II");
	actionMode="II";

	var trans = new Trans();							
	trans.setSvc("UCAST010S");					// ����ID
	trans.setPageRow("9999");					// 1Page�� �� ���� Row�� ����� ���ΰ�?		
	trans.setWiseGrid("1");					// wisegrid�� ����ϴ� ��� �ݵ�� �߰�			
	trans.setForwardId("wgdsl","");			// wisegrid�� ����ϴ� ��� �ݵ�� �߰�
	trans.open("fQuery", "f","/wisegrid.do");
}

//***********************************
// queryList ��ȸ
//***********************************
function queryListMB()
{
	setMode("II");
	actionMode="II";
	if (fmb.btnAddMB)  	fmb.btnAddMB.disabled = false;
	
	if(f.book_seq.value=="") return;

	var trans = new Trans();							
	trans.setSvc("UCAST011S");					// ����ID
	trans.setPageRow("9999");					// 1Page�� �� ���� Row�� ����� ���ΰ�?	
	trans.setWiseGrid("1");					// wisegrid�� ����ϴ� ��� �ݵ�� �߰�			
	trans.setForwardId("wgdsl","");			// wisegrid�� ����ϴ� ��� �ݵ�� �߰�
	trans.setUserParams("book_seq="+f.book_seq.value);
	trans.open("", "fmb","/wisegrid.do");
}

/********************
* �׸��� Ŭ��
********************/
function showDetailO_obj(id, strColumnKey, nRow)
{
	var GridObj;
	
	if(id=="UCAST010S"){
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
		setMode("S");
		
		queryListMB();
	}else if(id=="UCAST011S"){
		GridObj = document.all[id];
		
		for(var i=0; i<adetailtxt2.length; i++)
		{
			document.fmb(adetailtxt2[i]).value = GridObj.GetCellValue(adetailtxt2[i], nRow);
		}
		fmb.rnt_dt.value = checkDate(fmb.rnt_dt.value);
		fmb.rtn_dt.value = checkDate(fmb.rtn_dt.value);
		
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
	if(f.book_sbjt.value == "")
	{
		MessageBox("Required", "E", "��������");
		f.book_sbjt.focus();
		return;
	}
	
	var svcid = "";
	if(f.book_seq.value == "")
	{
		svcid = "UCAST010I";
	}else
	{
		svcid = "UCAST010U";
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

	if(f.book_seq.value == "")
	{
		MessageBox("NotChecked", "E", "");
		return;
	}

	if(!MessageBox("DelConfirm", "C", "")) return;
	
	var tran=new Trans();
	tran.setSvc("UCAST011D,UCAST010D");
	tran.setUserParams("book_seq="+f.book_seq.value);
	tran.open("","","/common.do");
}
//***********************************
// ���� ���� �뿩�ڵ�� 
//***********************************
function AddMB()
{
	setMode("UU");
	actionMode="UU";
}

//***********************************
// ���� ���� �뿩������ 
//***********************************
function SaveMB()
{
	if(f.userid.value == "")
	{
		alert("�α��� ������ �����ϴ�. ��α��� �ϼ���.");
		return;
	}

	if(fmb.rnt_id.value == "")
	{
		MessageBox("Required", "E", "�뿩��");
		fmb.rnt_id.focus();
		return;
	}
	//��¥üũ
	if (checkTermDate(fmb.rnt_dt, fmb.rtn_dt, true, true) == false) return;
	
	var svcid = "";
	if(actionMode == "UU")
	{
		svcid = "UCAST012U,UCAST011I";
	}else
	{
		svcid = "UCAST012U,UCAST011U";
	}
	
	var tran=new Trans();
	tran.setSvc(svcid);
	tran.setUserParams("book_seq="+f.book_seq.value);
	tran.open("fmb","","/common.do");
}

//***********************************
// ���� ���� ���� �뿩��
//***********************************
function DelMB()
{
	if(f.userid.value == "")
	{
		alert("�α��� ������ �����ϴ�. ��α��� �ϼ���.");
		return;
	}

	if(fmb.rnt_id.value == "")
	{
		MessageBox("NotChecked", "E", "");
		return;
	}

	if(!MessageBox("DelConfirm", "C", "")) return;
	
	var tran=new Trans();
	tran.setSvc("UCAST011D");
	tran.setUserParams("book_seq="+f.book_seq.value+"&book_rnt_hst_seq="+fmb.book_rnt_hst_seq.value);
	tran.open("","","/common.do");
}

/********************
* CALLBACK
********************/
function callback(sServiceID)
{
	switch (sServiceID)
	{
		case "UCAST010I":	
			queryList();	
			break;
		case "UCAST010U":		
			queryList();	
			break;
		case "UCAST011D,UCAST010D":		
			queryList();
			break;
		case "UCAST012U,UCAST011I":	
			document.UCAST010S.SetCellValue("rnt_c_cd", GridnRow, fmb.rnt_c_cd.value);
			queryListMB();	
			break;
		case "UCAST012U,UCAST011U":		
			document.UCAST010S.SetCellValue("rnt_c_cd", GridnRow, fmb.rnt_c_cd.value);
			queryListMB();	
			break;
		case "UCAST011D":		
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
			var GridObj = document.UCAST010S;
			GridObj.RemoveAllData();
			
			for(var i=0; i<adetailtxt1.length; i++)
			{
				document.f(adetailtxt1[i]).value = "";
			}
			
			if (f.btnAdd)  		f.btnAdd.disabled = false;
			if (f.btnSave)  	f.btnSave.disabled = true;
			if (f.btnDel)  		f.btnDel.disabled = true;
			
			break;
		case "II":	//�ʱ�ȭ
			var GridObj = document.UCAST011S;
			GridObj.RemoveAllData();
			
			for(var i=0; i<adetailtxt2.length; i++)
			{
				document.fmb(adetailtxt2[i]).value = "";
			}
			fmb.rnt_c_cd.selectedIndex = 0;
			
			if (fmb.btnAddMB)  	fmb.btnAddMB.disabled = true;
			if (fmb.btnSaveMB)  fmb.btnSaveMB.disabled = true;
			if (fmb.btnDelMB)  	fmb.btnDelMB.disabled = true;
			
			break;
		case "U":	//������ ���			
			
			for(var i=0; i<adetailtxt1.length; i++)
			{
				document.f(adetailtxt1[i]).value = "";
			}
			
			if (f.btnAdd)  		f.btnAdd.disabled = false;
			if (f.btnSave)  	f.btnSave.disabled = false;
			if (f.btnDel)  		f.btnDel.disabled = true;
			
			break;
		case "UU":	//������ ���			
			for(var i=0; i<adetailtxt2.length; i++)
			{
				document.fmb(adetailtxt2[i]).value = "";
			}
			fmb.rnt_c_cd.selectedIndex = 0;
			
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
	if(actionMode=="SS")return;
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
	if(g_frm.name =="f")
	{
		g_frm.dnat_id.value = id;
		g_frm.dnat_nm.value = nm;
	
	}else
	{
		g_frm.rnt_id.value = id;
		g_frm.rnt_nm.value = nm;
	}

}

/********************
* ����� Clear��ư
********************/
function del_userID(frm)
{
	if(actionMode=="SS")return;
	if(frm.name =="f")
	{
		frm.dnat_id.value = "";
		frm.dnat_nm.value = "";
	}else
	{
		frm.rnt_id.value = "";
		frm.rnt_nm.value = "";
	}
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
