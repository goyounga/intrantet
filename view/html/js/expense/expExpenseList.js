var SELECT_SERVICE_01 	= "UCEXP010S";
var SELECT_SERVICE_02 	= "UCEXP011S";
var DELETE_SERVICE_01	= "UCEXP010D,UCEXP011D,UCEXP013D";
var DELETE_SERVICE_02	= "UCEXP011D,UCEXP011U";
var SAVE_SERVICE_01		= "UCEXP010U,UCEXP013U";
var SAVE_SERVICE_02		= "UCEXP011D,UCEXP011I,UCEXP011U";
var INSERT_SERVICE_01	= "UCEXP010I,UCSYS044I";

var G_FLAG 	= "UPDATE";

/**
*	ȭ�� �ε�
* author  lee,chang-uk
* since   2009/06/18
*/
function on_Load()
{
	var g_Obj = document.all(SELECT_SERVICE_01);
	var g_Obj2 = document.all(SELECT_SERVICE_02);

	// �޺� �ڽ�
	g_Obj.SetColButtonDisplayStyle('prj_seq','always');
	g_Obj.SetColButtonDisplayStyle('ptt_stts_cd','always');

	g_Obj2.SetColButtonDisplayStyle('expt_dt','always');
	g_Obj2.SetColButtonDisplayStyle('expt_c_cd','always');
	g_Obj2.SetColButtonDisplayStyle('expt_act_cd','always');
	g_Obj2.SetColButtonDisplayStyle('rip_doc_f','always');

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
	fQuery.q_date_from.value = getUserDate(-7, "-");
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
		//trans.setDefClick(true);
		trans.setWiseGrid("1");
		trans.setForwardId("wgdsl","");
		trans.open("f1","f1","/wisegrid.do");
}

/**
* ��� ���� ����
* author  lee,chang-uk
* since   2009/06/24
*/
function fn_Save()
{
	var SVCID = "";
	var g_Obj = document.all(SELECT_SERVICE_01);

	if( G_FLAG == "UPDATE" && f0.exps_seq.value == "" )
	{
		alert("������ �����Ͱ� �������� �ʽ��ϴ�.");
		return;
	}

	if( getValidation(f0, true) == false ) return;

	if( G_FLAG == "UPDATE" && g_Obj.GetRowCount() > 0 )
	{
		var s_sign_prgs_stts_cd = g_Obj.GetCellHiddenValue("sign_prgs_stts_cd", g_Obj.GetActiveRowIndex());

		if(  Number(s_sign_prgs_stts_cd) > 1 && Number(s_sign_prgs_stts_cd) <= 3 )
		{
			alert("���� �������Դϴ�. ������ �� �����ϴ�.");
			return;
		}
		else if( Number(s_sign_prgs_stts_cd) == 4 )
		{
			alert("���� �Ϸ� �����Դϴ�. ������ �� �����ϴ�.");
			return;
		}
		else if( Number(s_sign_prgs_stts_cd) == 5 )
		{
			alert("��� �����Դϴ�. ������ �� �����ϴ�.");
			return;
		}
	}

	if( G_FLAG == "INSERT" )
	{
		SVCID = INSERT_SERVICE_01;
	}
	else
	{
		//��û��
		if(f0.ptt_stts_cd.value == "01")
		{
			f0.cmplt_dt.value = "";
		}
		//��û�Ϸ� �� �Ϸ����ڸ� ������Ʈ ���ش�.
		else
		{
			f0.cmplt_dt.value = ", cmplt_dt = CONVERT(varchar(8),GETDATE(), 112) ";
		}

		SVCID = SAVE_SERVICE_01;
	}

	if( f0.ptt_stts_cd.value == "01" )
	{
		alert("������ ��û���¸� [��û�Ϸ�]�� ������Ʈ�ϼ���.");
	}

	var trans = new Trans();
	trans.setMyUserParams("id", "@@IDENTITY");
	trans.setMyUserParams("sign_tp_cd", "03");
	trans.setSvc(SVCID);
	trans.open("f0","f0","/common.do");
}

/**
* ��� ��û ����
* author  lee,chang-uk
* since   2009/06/18
*/
function on_Delete()
{
	var g_Obj = document.all(SELECT_SERVICE_01);

	if( g_Obj.GetRowCount() <= 0 )
	{
		alert("��ȸ�� �����Ͱ� ���� ���� �ʽ��ϴ�.");
		return;
	}

	var params	= "";
	var i_chkCnt = 0;

	for( var i = 0; i < g_Obj.GetRowCount(); i++ )
	{
		if( g_Obj.GetCellValue("chk", i) == 1 )
		{
			var s_sign_prgs_stts_cd = g_Obj.GetCellHiddenValue("sign_prgs_stts_cd", i);

			if( Number(s_sign_prgs_stts_cd) > 1 && Number(s_sign_prgs_stts_cd) < 4 )
			{
				alert("���� ������ �����Ͱ� �����մϴ�. ������ �� �����ϴ�.");
				return;
			}
			else if( Number(s_sign_prgs_stts_cd) == 4 )
			{
				alert("���� �Ϸ���� ������ �� �����ϴ�.");
				return;
			}

			params	+= "&exps_seq=" + g_Obj.GetCellValue("exps_seq", i) ;
			i_chkCnt++;
		}

	}
	//alert(f0.exps_seq.value);
	//return;
	if( i_chkCnt <= 0 && f0.exps_seq.value == "" )
	{
		alert("���õ� �����Ͱ� �������� �ʽ��ϴ�.");
		return;
	}

	if( !confirm("��� ��û �� ���� �� ������ �Բ� �����˴ϴ�. ���� �Ͻðڽ��ϱ�?") )
	{
		return;
	}

	var trans = new Trans();
	trans.setSvc(DELETE_SERVICE_01);
	trans.setUserParams(params);
	trans.open("f0","f0","/common.do");

}

/**
* ���� ���� ����
* author  lee,chang-uk
* since   2009/06/18
*/
function fn_DetailDelete()
{
	var params	= "";
	var i_chkCnt = 0;
	var i_expsSum = 0;

	var g_Obj1 = document.all(SELECT_SERVICE_01);
	var g_Obj2 = document.all(SELECT_SERVICE_02);

	if( g_Obj1.GetRowCount() <= 0 )
	{
		alert("��ȸ�� �����Ͱ� ���� ���� �ʽ��ϴ�.");
		return;
	}

	if( g_Obj2.GetRowCount() <= 0 )
	{
		alert("��ȸ�� �����Ͱ� ���� ���� �ʽ��ϴ�.");
		return;
	}

	var s_sign_prgs_stts_cd = g_Obj1.GetCellHiddenValue("sign_prgs_stts_cd", g_Obj1.GetActiveRowIndex());

	if( Number(s_sign_prgs_stts_cd) > 1 && Number(s_sign_prgs_stts_cd) < 4 )
	{
		alert("���� ������ �����ʹ� ������ �� �����ϴ�.");
		return;
	}
	else if( Number(s_sign_prgs_stts_cd) == 4 )
	{
		alert("���� �Ϸ���� ������ �� �����ϴ�.");
		return;
	}

	for(j = g_Obj2.GetRowCount()-1; j >= 0; j--)
	{
		if( g_Obj2.GetCellValue("chk", j) == 1 && g_Obj2.GetCellHiddenValue("CRUD", j) == "C" )
		{
			g_Obj2.DeleteRow(j, false);
		}
	}

	for( var i = 0; i < g_Obj2.GetRowCount(); i++ )
	{
		if( g_Obj2.GetCellValue("chk", i) == 1 )
		{

			params	+= "&expt_hst_seq=" + g_Obj2.GetCellValue("expt_hst_seq", i) ;

			i_chkCnt++;
		}
		else
		{
			i_expsSum += Number(g_Obj2.GetCellValue("expt_amt", i));
		}
	}

	if( i_chkCnt <= 0 )
	{
		alert("���õ� �����Ͱ� �������� �ʽ��ϴ�.");
		return;
	}

	if( !confirm("���� �� ������ ���� �Ͻðڽ��ϱ�?") )
	{
		return;
	}

	params += "&exps_sum=" + i_expsSum;

	var trans = new Trans();
	trans.setSvc(DELETE_SERVICE_02);
	trans.setUserParams(params);
	trans.open("f1","f1","/common.do");

}

/**
* ���� ����  ����/����
* author  lee,chang-uk
* since   2009/06/18
*/
function on_DetailSave()
{
	var params	= "";
	var i_chkCnt = 0;
	var i_expsSum = 0;

	var g_Obj1 = document.all(SELECT_SERVICE_01);
	var g_Obj2 = document.all(SELECT_SERVICE_02);

	if( g_Obj1.GetCellValue("ptt_stts_cd", g_Obj1.GetActiveRowIndex()) == "Y" )
	{
		alert("���� �Ϸ�� �����ʹ� ������ �� �����ϴ�.");
			return;
	}

	if( g_Obj2.GetRowCount() <= 0 )
	{
		alert("�����Ͱ� ���� ���� �ʽ��ϴ�.");
		return;
	}

	if( g_Obj1.GetCellValue("exps_seq", g_Obj1.GetActiveRowIndex()) == "" )
	{
		alert("���õ� �����Ͱ� ���ų� ��� ��û ���� ������ �Ϸ���� �ʾҽ��ϴ�.");
			return;
	}

	for( var i = 0; i < g_Obj2.GetRowCount(); i++ )
	{
		if( g_Obj2.GetCellValue("expt_dt", i) == "" )
		{
			alert("�������ڴ� �ʼ� �Է��Դϴ�.");
			return;
		}
		if( g_Obj2.GetCellValue("expt_amt", i) == "" )
		{
			alert("����ݾ��� �ʼ� �Է��Դϴ�.");
			return;
		}

		params	+= "&expt_dt="		+ g_Obj2.GetCellValue("expt_dt", i) ;
		params	+= "&expt_amt="		+ g_Obj2.GetCellValue("expt_amt", i);
		params	+= "&expt_c_cd="	+ g_Obj2.GetCellHiddenValue("expt_c_cd", i);
		params	+= "&expt_act_cd="	+ g_Obj2.GetCellHiddenValue("expt_act_cd", i);
		params	+= "&rip_doc_f="	+ g_Obj2.GetCellValue("rip_doc_f", i);
		params	+= "&expt_rmk="		+ g_Obj2.GetCellValue("expt_rmk", i);
		//params  += "&exps_seq="		+ g_Obj1.GetCellValue("exps_seq", g_Obj1.GetActiveRowIndex());

		i_expsSum += Number(g_Obj2.GetCellValue("expt_amt", i));
	}

	f1.exps_seq.value = g_Obj1.GetCellValue("exps_seq", g_Obj1.GetActiveRowIndex());

	params += "&exps_sum=" + i_expsSum;

	var trans = new Trans();
	trans.setSvc(SAVE_SERVICE_02);
	trans.setUserParams(params);
	trans.open("f1","f1","/common.do");
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

			setMode("INIT");
		}
		else
		{
			setMainSummary();
		}
	}
	else if( serviceId == INSERT_SERVICE_01 )
	{
		if( DataSet.getParam("UCEXP010I", 1, 0, "SUCCESS_COUNT") > 0 )
		{
			on_Search();
		}
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
	else if( serviceId == DELETE_SERVICE_01 )
	{
		if( DataSet.getParam("UCEXP010D", 1, 0, "SUCCESS_COUNT") > 0 )
		{
			on_Search();
		}

	}
	else if( serviceId == SAVE_SERVICE_01 )
	{
		if( DataSet.getParam("UCEXP010U", 1, 0, "SUCCESS_COUNT") > 0  )
		{
			on_Search();
		}
	}
	else if( serviceId == SAVE_SERVICE_02 )
	{
		if( DataSet.getParam("UCEXP011U", 1, 0, "SUCCESS_COUNT") > 0  )
		{
			on_Search();
		}
	}
	else if( serviceId == DELETE_SERVICE_02 )
	{
		if( DataSet.getParam("UCEXP011D", 1, 0, "SUCCESS_COUNT") > 0  )
		{
			f1.reset();
			on_Search();
		}
	}
}

/**
*	��� ����
* author  lee,chang-uk
* since   2009/06/22
*/
function setMode(val)
{
	switch(val)
	{
		case "INIT" :

				f0.ptt_stts_cd.disabled = true;
				f0.prj_seq.disabled 	= true;

			break;
		case "UPDATE" :

				f0.ptt_stts_cd.disabled = false;
				f0.prj_seq.disabled 	= false;

			break;

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

	G_FLAG = "UPDATE";

	setMode("UPDATE");

	on_DetailSearch();
}

/**
* ��� ��û �׸��� ROW �߰�
* author  lee,chang-uk
* since   2009/06/26
*/
function fn_ExpenseAdd()
{
	f0.reset();

	G_FLAG 	= "INSERT";

	setMode("UPDATE");
}

/**
* ���� ���� �׸��� ROW �߰�
* author  lee,chang-uk
* since   2009/06/18
*/
function fn_ExpenseDtailAdd()
{
	if( document.all(SELECT_SERVICE_01).GetActiveRowIndex() < 0   )
	{
		alert("��� ��û ������ ���õ� �����Ͱ� �������� �ʽ��ϴ�.");
		return;
	}
	document.all(SELECT_SERVICE_02).AddRow();
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