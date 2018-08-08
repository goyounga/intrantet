var SELECT_SERVICE = "UCEXP013S";
var INSERT_SERVICE = "UCEXP010I,UCEXP013I";

/** 
* ���� ���� �׸��� ROW �߰�
* author  lee,chang-uk   
* since   2009/06/18 	                                              
*/ 
function fn_ExpsHstAdd()
{
	document.all(SELECT_SERVICE).AddRow();
} 

/** 
* ����û ����
* author  lee,chang-uk   
* since   2009/06/18 	                                              
*/
function on_Save()
{
	var g_Obj = document.all(SELECT_SERVICE);
	
	if ( getValidation(f, true) == false ) return;
	
	if( g_Obj.GetRowCount() <= 0 )
	{
		alert("�Էµ� ���� ������ ���� ���� �ʽ��ϴ�.");
		return;
	}

	var params	= "";
	var i_expsSum = 0;
	
	for( var i = 0; i < g_Obj.GetRowCount(); i++ )
	{
		if( g_Obj.GetCellValue("expt_dt", i) == "" )
		{
			alert("�������ڴ� �ʼ� �Է��Դϴ�.");
			return;
		}
		if( g_Obj.GetCellValue("expt_amt", i) == "" )
		{
			alert("����ݾ��� �ʼ� �Է��Դϴ�.");
			return;
		}
		
		params	+= "&expt_dt="		+ g_Obj.GetCellValue("expt_dt", i) ;
		params	+= "&expt_amt="		+ g_Obj.GetCellValue("expt_amt", i);
		params	+= "&expt_c_cd="	+ g_Obj.GetCellHiddenValue("expt_c_cd", i);
		params	+= "&expt_act_cd="	+ g_Obj.GetCellHiddenValue("expt_act_cd", i);
		params	+= "&rip_doc_f="	+ g_Obj.GetCellValue("rip_doc_f", i);
		params	+= "&expt_rmk="		+ g_Obj.GetCellValue("expt_rmk", i);
		
		i_expsSum += Number(g_Obj.GetCellValue("expt_amt", i));
	}

	params += "&exps_sum=" + i_expsSum;
	
	var trans = new Trans();
	trans.setSvc(INSERT_SERVICE);
	trans.setUserParams(params);
	//trans.open("f","f","/wisegrid.do");
	trans.open("f","f","/common.do");
}

/** 
* ������ �ݹ�
* author  lee,chang-uk   
* since   2009/06/18 	                                              
*/ 
function callback(serviceId)
{
	if( serviceId == INSERT_SERVICE )
	{
		if( DataSet.getParam("UCEXP010I", 1, 0, "SUCCESS_COUNT") > 0 )
		{
			opener.on_Search();
			
			window.close();
		}
	}
}
