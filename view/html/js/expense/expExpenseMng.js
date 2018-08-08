var SELECT_SERVICE_01 	= "UCEXP020S";
var SELECT_SERVICE_02 	= "UCEXP021S";
var SAVE_SERVICE		= "UCEXP020U,UCEXP021U";
var UPDATE_SERVICE		= "UCEXP023U";

/**
*	ȭ�� �ε�
* author  lee,chang-uk
* since   2009/06/18
*/
function on_Load()
{
	//�ش��������� ����,��Ʈ��,�����ڸ� ���ٴ� �����Ͽ� ��Ʈ���� ���ΰ�������ȸ
	if(fQuery.gradecd.value == "06") //��Ʈ��
	{
		fQuery.q_sign_obj.value = "01"; 
		fQuery.q_sign_obj.disabled = true;
	}
	else
	{
		fQuery.q_sign_obj.disabled = false;
	}

	var g_Obj = document.all(SELECT_SERVICE_01);
	var g_Obj2 = document.all(SELECT_SERVICE_02);

	// �޺� �ڽ�
	g_Obj.SetColButtonDisplayStyle('pmt_dt','always');

	// ���� �ֱ�
	g_Obj.SetNumberFormat('exps_sum','###,###');
	g_Obj.SetNumberFormat('pmt_amt','###,###');
	g_Obj.SetNumberFormat('upmt_amt','###,###');

	g_Obj2.SetNumberFormat('expt_amt','###,###');

	g_Obj.SetColFix('exps_sum');

	//initPeriod();
	on_Search();
}

/**
* ��ȸ �Ⱓ �ʱ�ȭ
* author  lee,chang-uk
* since   2009/06/18
*/
function initPeriod()
{
	fQuery.q_date_from.value = getUserDate(-30, "-");
	fQuery.q_date_to.value = getUserDate(0, "-");
}

/**
* �ʱ�ȭ
* author  lee,chang-uk
* since   2009/06/18
*/
function on_Init()
{
	document.all(SELECT_SERVICE_01).RemoveAllData();
	document.all(SELECT_SERVICE_02).RemoveAllData();

	fQuery.reset();
	f0.reset();
	f1.reset();

	initPeriod();
}

/**
* ��ȸ ��ư Ŭ����
* author  lee,chang-uk
* since   2009/06/18
*/
function on_Search()
{
	if( getValidation(fQuery, true) == false ) return false;

	if( fQuery.q_sign_obj.value == "01" )
	{
		fQuery.q_sign_id.value 	= fQuery.user_id.value;
		fQuery.q_alnc_rtn.value = "0";
		fQuery.q_chk.value 		= "";
	}
	else
	{
		fQuery.q_sign_id.value = "";
		fQuery.q_alnc_rtn.value = "";
		fQuery.q_chk.value 		= "0";
	}

	var trans = new Trans();
	trans.setPageRow(-1);
	trans.setSvc(SELECT_SERVICE_01);
	trans.setDefClick(true);
	trans.setWiseGrid("1");
	trans.setForwardId("wgdsl","");
	trans.open("fQuery","f","/wisegrid.do");
}

/**
* ���� ���� ��ȸ
* author  lee,chang-uk
* since   2009/06/18
*/
function on_DetailSearch()
{
	f1.exps_seq.value = f0.exps_seq.value;

	var trans = new Trans();
		trans.setPageRow(-1);
		trans.setSvc(SELECT_SERVICE_02);
		trans.setWiseGrid("1");
		trans.setForwardId("wgdsl","");
		trans.open("f1","f1","/wisegrid.do");
}

/**
* ��� ��û ���� ������Ʈ
* author  lee,chang-uk
* since   2009/06/18
*/
function on_Save()
{

	var params	= "";
	var s_chkInfo = "";
	var i_chkCnt = 0;

	var g_Obj = document.all(SELECT_SERVICE_01);

	if( g_Obj.GetRowCount() <= 0 )
	{
		alert("��ȸ�� �����Ͱ� �������� �ʽ��ϴ�.");
		return;
	}

	for( var i = 0; i < g_Obj.GetRowCount(); i++ )
	{
		if( g_Obj.GetCellValue("alnc", i) == 1 || g_Obj.GetCellValue("rtn", i) == 1 )
		{
			if( g_Obj.GetCellValue("alnc", i) == 1 && g_Obj.GetCellValue("rtn", i) == 1 )
			{
				alert("[����] Ȥ�� [�ݷ�] �ϳ��� �����ϼ���.");
				return;
			}

			if( Number(g_Obj.GetCellHiddenValue("sign_prgs_stts_cd", i)) > 3 )
			{
				alert("�̹� [����] �� [���] ������ �����Ͱ� �����մϴ�. ������ �� �����ϴ�. ");
				return;
			}

			if( g_Obj.GetCellValue("rtn", i) == 1 && g_Obj.GetCellValue("rtn_f_cd", i) == "Y" )
			{
				alert("�̹� [�ݷ�] ������ �����Ͱ� �����մϴ�. ������ �� �����ϴ�. ");
				return;
			}

			if( g_Obj.GetCellValue("alnc", i) == 1 )
			{
				if( Number(g_Obj.GetCellValue("upmt_amt", i)) == 0 || g_Obj.GetCellValue("upmt_amt", i) == "" )
				{
					alert("�����޾��� �ʼ� �Է��Դϴ�.");
					return;
				}
			}

			params	+= "&pmt_dt="	+ g_Obj.GetCellValue("pmt_dt", i) ;
			params	+= "&pmt_amt="	+ g_Obj.GetCellValue("pmt_amt", i);
			params	+= "&upmt_amt="	+ g_Obj.GetCellValue("upmt_amt", i);
			params	+= "&exps_seq="	+ g_Obj.GetCellValue("exps_seq", i);

			if( g_Obj.GetCellValue("alnc", i) == 1 )
			{
				if( Number(g_Obj.GetCellValue("exps_sum", i)) <  Number(g_Obj.GetCellValue("upmt_amt", i)) )
				{
					s_chkInfo += "[" + (i + 1) + "]���� - " + getFormatData(g_Obj.GetCellValue("rg_dt", i), "DATE") + " " + g_Obj.GetCellValue("rg_nm", i);
					s_chkInfo += " ����հ� : " + getFormatData(g_Obj.GetCellValue("exps_sum", i), "MONEY");
					s_chkInfo += "�� < �����޾� : " + getFormatData(g_Obj.GetCellValue("upmt_amt", i), "MONEY") + "��\n";
				}

				params	+= "&alnc_rtn=A";
			}
			else if( g_Obj.GetCellValue("rtn", i) == 1 )
			{
				params	+= "&alnc_rtn=R";
			}
			else
			{
				params	+= "&alnc_rtn=";
			}

			i_chkCnt++;
		}

	}

	if( i_chkCnt <= 0 )
	{
		alert("���õ� �����Ͱ� �������� �ʽ��ϴ�.");
		return;
	}

	if( s_chkInfo != "" )
	{
		if( !confirm(s_chkInfo + "\n\n���� ���� ������ �����Ͱ� �����մϴ�. �����Ͻðڽ��ϱ�?"))
		{
			return;
		}
	}

	var trans = new Trans();
	trans.setSvc(SAVE_SERVICE);
	trans.setUserParams(params);
	trans.open("f","f","/common.do");
}

/**
* ��ư ��Ʈ��
* author  lee,chang-uk
* since   2009/06/18
*/
function fn_BtnControl()
{
	if( fQuery.q_sign_obj.value == "01" )
	{
		document.all("btnSave").disabled = false;
		document.all("btnApply").disabled = false;

		document.all("btnPmtApply").disabled = true;
		document.all("btnPmtSave").disabled = true;

		f.pmt_date.disabled = true;
	}
	else
	{
		document.all("btnSave").disabled = true;
		document.all("btnApply").disabled = true;

		document.all("btnPmtApply").disabled = false;
		document.all("btnPmtSave").disabled = false;

		f.pmt_date.disabled = false;
	}
}

/**
* ������ �ݹ�
* author  lee,chang-uk
* since   2009/06/18
*/
function callback(serviceId)
{
	if( serviceId == SELECT_SERVICE_01 )
	{
		if( DataSet.getTotalCount(serviceId) <= 0 )
		{
			f.reset();
			f0.reset();
			f1.reset();

			document.all(SELECT_SERVICE_01).RemoveAllData();
			document.all(SELECT_SERVICE_02).RemoveAllData();
		}
		else
		{
			setMainSummary();
		}

		fn_BtnControl();
	}
	else if( serviceId == SELECT_SERVICE_02 )
	{
		if( DataSet.getTotalCount(serviceId) <= 0 )
		{
			f1.reset();

			document.all(SELECT_SERVICE_02).RemoveAllData();
		}
		else
		{
			setDetailSummary();
		}
	}
	else if( serviceId == SAVE_SERVICE )
	{
		if( DataSet.getParam("UCEXP020U", 1, 0, "SUCCESS_COUNT") > 0 )
		{
			on_Search();
		}
	}
	else if( serviceId == UPDATE_SERVICE )
	{
		if( DataSet.getParam(UPDATE_SERVICE, 1, 0, "SUCCESS_COUNT") > 0 )
		{
			on_Search();
		}
	}
}

/**
* �׸��� Ŭ���� �� ������ �����ش�.
* author  lee,chang-uk
* since   2009/06/18
*/
function showDetailO_obj(id, strColumnKey, nRow)
{
	var g_Obj = document.all(SELECT_SERVICE_01);

	showDetailByWise(id, g_Obj.GetActiveRowIndex(), f0);

	on_DetailSearch();

}

/**
* ����� ������ �˾�
* author  lee,chang-uk
* since   2009/06/18
*/
function openUserOrg()
{
	//Opener �� ������ �������� (form ��ü�� �ѱ��)
	//setOpener(fQuery);

	//openPopup("/jsp/common/comUserOrg.jsp", "UserOrg", 800, 545);

	var cwp = getPopupProperties("", "", "800", "580");

	window.open("/jsp/common/comUserOrg.jsp" ,"UserOrg", cwp);
}

/**
* ���������� ����� ���� ��������
* author  lee,chang-uk
* since   2009/06/18
*/
function setOrgUserInfo(user_id, user_name, user_dept)
{
	fQuery.q_user_id.value = user_id;
	fQuery.q_user_nm.value = user_name;
}

/**
* ��� ��û ���� - ������ �ϰ� ����
* author  lee,chang-uk
* since   2009/06/18
*/
function on_LumpApply()
{
	var i_chkCnt = 0;
	var g_Obj = document.all(SELECT_SERVICE_01);

	if( g_Obj.GetRowCount() <= 0 )
	{
		alert("��ȸ�� �����Ͱ� �������� �ʽ��ϴ�.");
		return;
	}

	for( var i = 0; i < g_Obj.GetRowCount(); i++ )
	{
		if( g_Obj.GetCellValue("alnc", i) == 1 )
		{
			g_Obj.SetCellValue("upmt_amt", i, g_Obj.GetCellValue("exps_sum", i));

			i_chkCnt++;
		}
	}

	if( i_chkCnt <= 0 )
	{
		alert("üũ�� �����Ͱ� �������� �ʽ��ϴ�.");
		return;
	}
}

/**
* ��� ��û ���� - ��������, ���޾�
* author  lee,chang-uk
* since   2009/06/18
*/
function on_PmtLumpApply()
{
	var i_chkCnt = 0;
	var g_Obj = document.all(SELECT_SERVICE_01);

	if( g_Obj.GetRowCount() <= 0 )
	{
		alert("��ȸ�� �����Ͱ� �������� �ʽ��ϴ�.");
		return;
	}

	for( var i = 0; i < g_Obj.GetRowCount(); i++ )
	{
		if( g_Obj.GetCellValue("chk", i) == 1 )
		{
			g_Obj.SetCellValue("pmt_dt", i, removeMask(f.pmt_date.value));
			g_Obj.SetCellValue("pmt_amt", i, g_Obj.GetCellValue("exps_sum", i));
			g_Obj.SetCellValue("upmt_amt", i, 0);

			i_chkCnt++;
		}
	}

	if( i_chkCnt <= 0 )
	{
		alert("üũ�� �����Ͱ� �������� �ʽ��ϴ�.");
		return;
	}
}

/**
* ��� ��û ���� - �������� ������Ʈ
* author  lee,chang-uk
* since   2009/06/18
*/
function on_PmtSave()
{
	var params		= "";
	var i_chkCnt 	= 0;
	var i_chkStts 	= 0;
	var g_Obj = document.all(SELECT_SERVICE_01);

	if( g_Obj.GetRowCount() <= 0 )
	{
		alert("��ȸ�� �����Ͱ� �������� �ʽ��ϴ�.");
		return;
	}

	for( var i = 0; i < g_Obj.GetRowCount(); i++ )
	{
		if( g_Obj.GetCellValue("chk", i) == 1 )
		{
			if( Number(g_Obj.GetCellHiddenValue("sign_prgs_stts_cd", i)) != 4 ) i_chkStts++;

			if( g_Obj.GetCellValue("rtn_f_cd", i) == "Y" ) i_chkStts++;

			if( g_Obj.GetCellValue("pmt_dt", i) == "" )
			{
				alert("���������� �ʼ� �Է��Դϴ�.");
				return;
			}

			if( Number(g_Obj.GetCellValue("pmt_amt", i)) == 0 || g_Obj.GetCellValue("pmt_amt", i) == "")
			{
				alert("���޾��� �ʼ� �Է��Դϴ�.");
				return;
			}

			params	+= "&pmt_dt="	+ g_Obj.GetCellValue("pmt_dt", i) ;
			params	+= "&pmt_amt="	+ g_Obj.GetCellValue("pmt_amt", i);
			params	+= "&upmt_amt="	+ g_Obj.GetCellValue("upmt_amt", i);
			params	+= "&exps_seq="	+ g_Obj.GetCellValue("exps_seq", i);

			i_chkCnt++;
		}
	}

	if( i_chkCnt <= 0 )
	{
		alert("üũ�� �����Ͱ� �������� �ʽ��ϴ�.");
		return;
	}

	if(i_chkStts > 0 )
	{
		if( !confirm("�̽��ΰ� Ȥ�� �ݷ����� ���ԵǾ� �ֽ��ϴ�. ���������� �����Ͻðڽ��ϱ�?") )
		{
			return;
		}
	}

	var trans = new Trans();
	trans.setSvc(UPDATE_SERVICE);
	trans.setUserParams(params);
	trans.open("f","f","/common.do");
}

/**
* ��� ��û ���� �հ�
* author  kim zeong kyun
* since   2009/07/27
*/
function setMainSummary()
{
	var gridObj = document.all(SELECT_SERVICE_01);

	if(gridObj.GetRowCount() == 0)
	{
		return;
	}

	gridObj.ClearSummaryBar();

	summaryWiseGrid(gridObj, "SUMMARY1", "summaryall", "�հ�", "sum", "exps_sum,pmt_amt,upmt_amt");

	gridObj.MoveRow(0);
}

/**
* ���� �� ���� �հ�
* author  kim zeong kyun
* since   2009/07/27
*/
function setDetailSummary()
{
	var gridObj = document.all(SELECT_SERVICE_02);

	if(gridObj.GetRowCount() == 0)
	{
		return;
	}

	gridObj.ClearSummaryBar();

	summaryWiseGrid(gridObj, "SUMMARY1", "summaryall", "�հ�", "sum", "expt_amt");

	gridObj.MoveRow(0);
}

function Excel()
{
	openPopup("expExpenseExcel.jsp", "", "expenseExcel", "", "", 400, 50, "");
}