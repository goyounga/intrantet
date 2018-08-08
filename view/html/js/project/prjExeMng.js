/**
 * PROJECT : INTRANET
 * NAME    : prjExeMng.js
 * DESC    : ������Ʈ����
 * AUTHOR  : ���ر� ����
 * VERSION : 1.0
 * Copyright �� 2009 Nexfron. All rights reserved.
 * ============================================================================================
 * 							��		��		��		��
 * ============================================================================================
 * VERSION		   DATE		   AUTHOR		DESCRIPTION
 * ============================================================================================
 * 1.0		    2010.09.07	 ���ر� ����		����
 */

var Gridid, GridstrColumnKey, GridnRow;
var actionMode="II";
var g_frm;

//var adetailtxt1 = new Array( "prj_seq", "prj_nm", "rl_st_dt", "rl_end_dt", "cntr_man_m", "rl_etrn_m_m",
//							"pgs_rt", "prj_loc", "prj_desc", "coper_co", "clnt_co", "etrn_m");
var adetailtxt2 = new Array( "user_id", "user_nm", "etrn_du_dt", "ot_du_dt", "etrn_dt", "ot_dt", "chrgjob" );
var adetailtxt1 = new Array( "prj_seq"   , "prj_nm"     , "rl_st_dt"
                           , "rl_end_dt" , "cntr_man_m" , "rl_etrn_m_m"
                           , "jdk_ver"   , "prj_loc"    , "prj_desc"
                           , "coper_co"  , "clnt_co"    , "etrn_m" );

var SELECT_CODE_ID 	    = "UCPRJ012S";	//�ڵ� DataSet
var oGrid             	= "";           //�ް�����Ȳ
//***********************************
// ONLOAD
//***********************************
function init()
{
	oGrid  = document.getElementById(SELECT_CODE_ID);
	//oGrid.bHDVisible  = false;
	oGrid.strHDClickAction 	= "select";
 	oGrid.strScrollBars = "vertical";
 	oGrid.bStatusbarVisible = false;
 	oGrid.nHDLineSize = 17;
	document.UCPRJ011S.bStatusbarVisible = false;
	document.UCPRJ011S.strScrollBars = "vertical";

	setMode("I");
	setMode("II");
	actionMode="II";

	fQuery.prj_knd_cd.selectedIndex = 1;

//	queryList();

	queryCode();
}
/**
 * �ڵ���ȸ
 */
function queryCode()
{
	var tran = new GridTrans();
	tran.setPageRow("9999");
	tran.setSvc(SELECT_CODE_ID);
	tran.setUserParams("up_cd=PRJ013");
	tran.setWait(false);
	tran.open("","f","/wisegrid.do");
}

//***********************************
// queryList ��ȸ
//***********************************
function queryList()
{

	//��¥üũ
	if (checkTermDate(fQuery.startdt, fQuery.enddt, true, true) == false) return;

	setMode("I");
	setMode("II");
	actionMode="II";

	var gridObj = document.UCPRJ010S;
		gridObj.setParam("rl_st_dt", "DATE");
		gridObj.setParam("rl_end_dt", "DATE");
		gridObj.setParam("rg_dt", "DATE");
		gridObj.setParam("rg_tm", "TIME");
		gridObj.setParam("mdf_dt", "DATE");
		gridObj.setParam("mdf_tm", "TIME");

	var trans = new Trans();
	trans.setSvc("UCPRJ010S");					// ����ID
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

	if(f.prj_seq.value=="") return;

	var gridObj = document.UCPRJ011S;
		gridObj.setParam("etrn_dt", "DATE");
		gridObj.setParam("ot_dt", "DATE");

	var trans = new Trans();
	trans.setSvc("UCPRJ011S");					// ����ID
	trans.setPageRow("9999");					// 1Page�� �� ���� Row�� ����� ���ΰ�?
	trans.setWiseGrid("1");					// wisegrid�� ����ϴ� ��� �ݵ�� �߰�
	trans.setForwardId("wgdsl","");			// wisegrid�� ����ϴ� ��� �ݵ�� �߰�
	trans.setUserParams("prj_seq="+f.prj_seq.value);
	trans.open("", "fmb","/wisegrid.do");
}

/********************
* �׸��� Ŭ��
********************/
function showDetailO_obj(id, strColumnKey, nRow)
{try{
	var GridObj;

	if(id=="UCPRJ010S"){
		GridObj = document.all[id];

		Gridid = id;
		GridstrColumnKey = strColumnKey;
		GridnRow = nRow;

		for(var i=0; i<adetailtxt1.length; i++)
		{
			document.f(adetailtxt1[i]).value = GridObj.GetCellValue(adetailtxt1[i], nRow);
		}
		f.rl_st_dt.value = checkDate(f.rl_st_dt.value);
		f.rl_end_dt.value = checkDate(f.rl_end_dt.value);
		f.prj_c_cd.value = GridObj.GetCellValue("prj_c_cd", nRow);
		onChange_prj_c_cd();
		f.prj_c_dtl_cd.value = GridObj.GetCellValue("prj_c_dtl_cd", nRow);
		f.was_type.value = GridObj.GetCellValue("was_type", nRow);
		f.dvlp_tool.value = GridObj.GetCellValue("dvlp_tool", nRow);
		f.dbms.value = GridObj.GetCellValue("dbms", nRow);
		f.prj_knd_cd.value = GridObj.GetCellValue("prj_knd_cd", nRow);

		f.pogr_stat.value = GridObj.GetCellValue("pogr_stat", nRow);//������Ȳ
		f.rmk.value = GridObj.GetCellValue("rmk", nRow);//���
		setWorkRange(GridObj.GetCellValue("work_range", nRow));//��������

		setMode("S");

		queryListMB();
	}else if(id=="UCPRJ011S"){
		GridObj = document.all[id];

		for(var i=0; i<adetailtxt2.length; i++)
		{
			document.fmb(adetailtxt2[i]).value = GridObj.GetCellValue(adetailtxt2[i], nRow);
		}
		fmb.etrn_du_dt.value = checkDate(fmb.etrn_du_dt.value);
		fmb.ot_du_dt.value = checkDate(fmb.ot_du_dt.value);
		fmb.etrn_dt.value = checkDate(fmb.etrn_dt.value);
		fmb.ot_dt.value = checkDate(fmb.ot_dt.value);
		fmb.etrn_c_cd.value = GridObj.GetCellValue("etrn_c_cd", nRow);
		fmb.job_c_cd.value = GridObj.GetCellValue("job_c_cd", nRow);


		setMode("SS");
		actionMode="SS";

	}}catch(e){alert(e.description);}
}

//***********************************
// ������Ʈ ���
//***********************************
function Add()
{
	setMode("U");
	setMode("II");
	actionMode="U";
}

//***********************************
// ������Ʈ ����
//***********************************
function Save()
{
	if(f.userid.value == "")
	{
		alert("�α��� ������ �����ϴ�. ��α��� �ϼ���.");
		return;
	}
	if(f.prj_nm.value == "")
	{
		MessageBox("Required", "E", "������Ʈ��");
		f.prj_nm.focus();
		return;
	}
	if(f.rl_st_dt.value == "")
	{
		MessageBox("Required", "E", "��������");
		f.rl_st_dt.focus();
		return;
	}
	if(f.rl_end_dt.value == "")
	{
		MessageBox("Required", "E", "��������");
		f.rl_end_dt.focus();
		return;
	}
	if(f.prj_knd_cd.value == "")
	{
		MessageBox("Required", "E", "������Ʈ����");
		f.prj_knd_cd.focus();
		return;
	}

	if (checkTermDate(f.rl_st_dt, f.rl_end_dt, true, true) == false) return;

	if ( getValidation(f, true) == false ) {return;}

	var svcid = "";
	if(f.prj_seq.value == "")
	{
		svcid = "UCPRJ010I,UCPRJ010I_1";
	}else
	{
		svcid = "UCPRJ010U";
	}

	var tran=new Trans();
	tran.setSvc(svcid);
	tran.setUserParams("work_range=" + getWorkRange());
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

	if(f.prj_seq.value == "")
	{
		MessageBox("NotChecked", "E", "");
		return;
	}

	if(!MessageBox("DelConfirm", "C", "")) return;

	var tran=new Trans();
	tran.setSvc("UCPRJ011D,UCPRJ010D");
	tran.setUserParams("prj_seq="+f.prj_seq.value);
	tran.open("","","/common.do");
}
//***********************************
// ������Ʈ MB���
//***********************************
function AddMB()
{
	setMode("UU");
	actionMode="UU";
}

//***********************************
// ������Ʈ MB����
//***********************************
function SaveMB()
{
	if(f.userid.value == "")
	{
		alert("�α��� ������ �����ϴ�. ��α��� �ϼ���.");
		return;
	}

	if(fmb.user_id.value == "")
	{
		MessageBox("Required", "E", "����");
		fmb.user_id.focus();
		return;
	}

	if (checkTermDate(fmb.etrn_du_dt, fmb.ot_du_dt, true, true) == false) return;

	if (checkTermDate(fmb.etrn_dt, fmb.ot_dt, true, true) == false) return;

	var svcid = "";
	if(actionMode == "UU")
	{
		var GridObj = document.UCPRJ011S;
		for(var i =0; i<GridObj.GetRowCount();i++)
		{
			if(fmb.user_id.value == GridObj.GetCellValue("user_id", i))
			{
				alert(GridObj.GetCellValue("user_nm", i)+"�� �̹� �������� �߰��� �����Դϴ�.")
				return;
			}
		}
		svcid = "UCPRJ011I";
	}else
	{
		svcid = "UCPRJ011U";
	}

	var tran=new Trans();
	tran.setSvc(svcid);
	tran.setUserParams("prj_seq="+f.prj_seq.value+"&userid="+f.userid.value);
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

	if(fmb.user_id.value == "")
	{
		MessageBox("NotChecked", "E", "");
		return;
	}

	if(!MessageBox("DelConfirm", "C", "")) return;

	var tran=new Trans();
	tran.setSvc("UCPRJ011D");
	tran.setUserParams("prj_seq="+f.prj_seq.value+"&user_id="+fmb.user_id.value);
	tran.open("","","/common.do");
}

//***********************************
// onChange_prj_c_cd
//***********************************
function onChange_prj_c_cd()
{
	for(var j=document.all["prj_c_dtl_cd"].options.length-1; j >= 1 ; j--)
	{
		document.all["prj_c_dtl_cd"].remove(j);
	}
	document.all["prj_c_dtl_cd"][0].selected = true;

	if(f.prj_c_cd.value == "") return;

	var tran=new Trans();
	tran.setSvc("UCPRJ010C");
	tran.setPageRow("9999");
	tran.setAsync(false);
	tran.setWait(false);
	tran.setUserParams("id=prj_c_dtl_cd&prj_c_cd="+ f.prj_c_cd.value);
	tran.open("","f","/common.do");
}

/********************
* CALLBACK
********************/
function callback(sServiceID)
{
	switch (sServiceID)
	{
		case "UCPRJ010I,UCPRJ010I_1":
			queryList();
			break;
		case "UCPRJ010U":
			queryList();
			break;
		case "UCPRJ011D,UCPRJ010D":
			queryList();
			break;
		case "UCPRJ011I":
			queryListMB();
			break;
		case "UCPRJ011U":
			queryListMB();
			break;
		case "UCPRJ011D":
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
			var GridObj = document.UCPRJ010S;
			GridObj.RemoveAllData();

			for(var i=0; i<adetailtxt1.length; i++)
			{
				document.f(adetailtxt1[i]).value = "";
			}
			f.prj_c_cd.selectedIndex = 0;
			f.was_type.selectedIndex = 0;
			onChange_prj_c_cd();
			f.dvlp_tool.selectedIndex = 0;
			f.dbms.selectedIndex = 0;
			f.prj_knd_cd.selectedIndex = 0;

			f.pogr_stat.selectedIndex = 0;//������Ȳ
			f.rmk.value = "";	//���
			resetWorkRange();	//��������

			if (f.btnAdd)  		f.btnAdd.disabled = false;
			if (f.btnSave)  	f.btnSave.disabled = true;
			if (f.btnDel)  		f.btnDel.disabled = true;

			break;
		case "II":	//�ʱ�ȭ
			var GridObj = document.UCPRJ011S;
			GridObj.RemoveAllData();

			for(var i=0; i<adetailtxt2.length; i++)
			{
				document.fmb(adetailtxt2[i]).value = "";
			}
			fmb.etrn_c_cd.selectedIndex = 0;

			if (fmb.btnAddMB)  	fmb.btnAddMB.disabled = true;
			if (fmb.btnSaveMB)  fmb.btnSaveMB.disabled = true;
			if (fmb.btnDelMB)  	fmb.btnDelMB.disabled = true;

			break;
		case "U":	//������ ���

			for(var i=0; i<adetailtxt1.length; i++)
			{
				document.f(adetailtxt1[i]).value = "";
			}
			f.prj_c_cd.selectedIndex = 0;
			f.was_type.selectedIndex = 0;
			onChange_prj_c_cd();
			f.dvlp_tool.selectedIndex = 0;
			f.dbms.selectedIndex = 0;
			f.prj_knd_cd.selectedIndex = 0;

			if (f.btnAdd)  		f.btnAdd.disabled = false;
			if (f.btnSave)  	f.btnSave.disabled = false;
			if (f.btnDel)  		f.btnDel.disabled = true;

			break;
		case "UU":	//������ ���
			for(var i=0; i<adetailtxt2.length; i++)
			{
				document.fmb(adetailtxt2[i]).value = "";
			}
			fmb.etrn_c_cd.selectedIndex = 0;

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
	g_frm.user_id.value = id;
	g_frm.user_nm.value = nm;

}

/********************
* ����� Clear��ư
********************/
function del_userID(frm)
{
	if(actionMode=="SS")return;
	frm.user_id.value = "";
	frm.user_nm.value = "";
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

/**
 * �������� �����ʱ�ȭ
 */
function resetWorkRange()
{
	for(var j=0; j<oGrid.GetRowCount(); j++)
	{
		oGrid.SetCellValue("chk", j, 0);
	}
	if(oGrid.GetRowCount()>0)
	{
		oGrid.MoveRow(0);	//selectRow(oGrid, 0); ������������.
	}
}
/**
 * �������� ��������
 */
function setWorkRange( pWorkRange )
{
	resetWorkRange();

	if(pWorkRange != "")
	{
		var aWorkRange = pWorkRange.split(",");

		for(var i=0; i<aWorkRange.length; i++)
		{
			for(var j=0; j<oGrid.GetRowCount(); j++)
			{
				if(aWorkRange[i] == oGrid.GetCellValue("code", j))
				{
					oGrid.SetCellValue("chk", j, 1);
					break;

				}
			}
		}
	}
}
/**
 * �������� �������
 */
function getWorkRange()
{
	var sWorkRange = "";

	for(var i=0; i<oGrid.GetRowCount(); i++)
	{
		if( oGrid.GetCellValue("chk", i)==1 )
		{
			sWorkRange += (","+oGrid.GetCellValue("code", i));
		}
	}
	return (sWorkRange.substr(1));
}