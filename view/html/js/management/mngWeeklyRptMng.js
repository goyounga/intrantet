var SELECT_ID		= "UCSYS100S";				//�ְ����� ��ȸ
var DETAIL_ID		= "UCSYS101S,UCSYS102S";	//�ְ����� ����ȸ
var UPDATE_APP_ID	= "UCSYS102U,UCSYS103U";	//�ְ����� ��������
var UPDATE_ID		= "UCSYS101U";				//�ְ����� �亯����

var g_Flag;		//�����÷���
var gid;
var objArr = new Array();
var popupGubun = "";


/********************
* �ʱ�ȭ
********************/
function init()
{
	objArr = new Array(f.subject, f.start_dt, f.end_dt, f.weekly_content, f.next_weekly_content, f.issue ,f.response);

	setMode("INIT");

	//�ش��������� ����,��Ʈ��,�����ڸ� ���ٴ� �����Ͽ� ��Ʈ���� ���ΰ�������ȸ
	if(f.gradecd.value == "06") //��Ʈ��
	{
		fQuery.subGubun.disabled = true;
	}
	else
	{
		fQuery.subGubun.disabled = false;
	}


}

/********************
* ��ȸ
********************/
function queryList()
{
	if (getValidation(fQuery, true) == false) return;

	if (checkTermDate(fQuery.date_from, fQuery.date_to, true, true) == false) return;

	if(fQuery.subGubun.value == "01"){	//���� ������
		//fQuery.subQuery.value = " AND nowsignid = '"+f.userid.value+"'";
		fQuery.subQuery.value = f.userid.value;
	}else{	//��ü
		fQuery.subQuery.value = "";
	}
	
	//���� ���������� ��������2�� ó���Ǿ�����, ���Ŀ� �ڵ�� ������ �������Ͽ� �з��Ͽ��� ��	2011.12.26 PJK
	if(fQuery.dept_cd.value == "05")			//SYS012:05:��ǥ�̻�
	{
		fQuery.subQuery2.value = "";
	}
	else if(fQuery.dept_cd.value == "02")		//02:����������
	{
		fQuery.subQuery2.value = "'02','07'";		//02:����������
	}	
	else if(fQuery.dept_cd.value == "01")		//01:����ġâ���� + 06:����ġ������ + 04:�濵������
	{
		fQuery.subQuery2.value = "'01','06','04'";
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
	trans.setUserParams("tstatcd=06");
	trans.open("fQuery","f","/wisegrid.do");
}


/*****************/
//�����ư
/*****************/
function save()
{
	var tran = new Trans();
	tran.setUserParams("id="+gid);
	tran.setSvc(UPDATE_ID);
	tran.open("f","f","/common.do");
}

/*****************/
//���������ư
/*****************/
function saveApp()
{
	var batchData	= new Array();
	var index		= 0;
	var sParam		= "";

	var obj = document.all["UCSYS100S"];

	for(var i = 0 ; i < obj.GetRowCount() ; i++){

		if(obj.GetCellValue("approval", i) == "1" || obj.GetCellValue("back", i) == "1"){

			batchData[index] = "&sign_tp_cd=02";	//02�� �ְ��������� �ڵ���.
			batchData[index] += "&id="+obj.GetCellValue("id",i);
			batchData[index] += "&userid="+f.userid.value;

			if(obj.GetCellValue("approval", i) == "1"){		//������ ����

				if(obj.GetCellValue("statcd",i) == "01"){	//���� ����������°� '01'(��û �� 1����������) ���¶��...
					if(parseNumeric(obj.GetCellValue("statcd",i)) < parseNumeric(obj.GetCellValue("sign_stg_cd",i))){	//���� ���� ������°� �������� ���º��� �۴ٸ�(���ܰ���)...
						batchData[index] += "&statcd=02";
					}else{
						batchData[index] += "&statcd=04"
					}

					batchData[index] += "&sign_dt1="+f.today.value;
					batchData[index] += "&sign_f_cd1=Y";

				}else if(obj.GetCellValue("statcd",i) == "02"){	//���� ����������°� '02'(2����������) ���¶��...

					if(parseNumeric(obj.GetCellValue("statcd",i)) < parseNumeric(obj.GetCellValue("sign_stg_cd",i))){	//���� ���� ������°� �������� ���º��� �۴ٸ�(���ܰ���)...
						batchData[index] += "&statcd=03";
					}else{
						batchData[index] += "&statcd=04"
					}

					batchData[index] += "&sign_dt2="+f.today.value;
					batchData[index] += "&sign_f_cd2=Y";

				}else if(obj.GetCellValue("statcd",i) == "03"){	//���� ����������°� '03'(3����������) ���¶��...

					batchData[index] += "&statcd=04"
					batchData[index] += "&sign_dt3="+f.today.value;
					batchData[index] += "&sign_f_cd3=Y";
				}

			}else{	//�����ڹݷ�
				batchData[index] += "&statcd=05";	//������ �ݷ�

				if(obj.GetCellValue("statcd",i) == "01"){	//���� ����������°� '01'(��û �� 1����������) ���¶��...
					batchData[index] += "&sign_dt1="+f.today.value;
					batchData[index] += "&sign_f_cd1=Y";
				}else if(obj.GetCellValue("statcd",i) == "02"){	//���� ����������°� '02'(2����������) ���¶��...
					batchData[index] += "&sign_dt2="+f.today.value;
					batchData[index] += "&sign_f_cd2=Y";
				}else if(obj.GetCellValue("statcd",i) == "03"){	//���� ����������°� '03'(3����������) ���¶��...
					batchData[index] += "&sign_dt3="+f.today.value;
					batchData[index] += "&sign_f_cd3=Y";
				}
			}


			sParam += batchData[index];

			index++;
		}
	}

	var tran = new Trans();
	tran.setUserParams(sParam);
	tran.setSvc(UPDATE_APP_ID);
	tran.open("","f","/common.do");

}

/********************
* �ݹ�
********************/
function callback(dsnm)
{
	switch (dsnm)
	{
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

			break;

		case UPDATE_ID :
			if (DataSet.getParam(UPDATE_ID, 1, 0, "SUCCESS_COUNT") > 0)
			{
				MessageBox("InfSuccess", "I", "");
			}
			else
			{
				MessageBox("InfFail", "E", "");
			}

			break;

		case UPDATE_APP_ID :
			if (DataSet.getParam("UCSYS102U", 1, 0, "SUCCESS_COUNT") > 0 && DataSet.getParam("UCSYS103U", 1, 0, "SUCCESS_COUNT") > 0)
			{
				MessageBox("InfSuccess", "I", "");
				queryList();
			}
			else
			{
				MessageBox("InfFail", "E", "");
			}

			break;
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

			if(strColumnKey == "approval" || strColumnKey == "back" ){
				var obj = document.all(SELECT_ID);

				if(obj.GetCellValue("approval",nRow) == "1" && obj.GetCellValue("back",nRow) == "1"){
					MessageBox("RPTError1", "I", "");
					obj.SetCellValue(strColumnKey, nRow , '0');
					return;
				}

				if(obj.GetCellValue("nowsignid",nRow) != f.userid.value){
					MessageBox("RPTError2", "I", "");
					obj.SetCellValue(strColumnKey, nRow , '0');
					return;
				}

			}else{
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
			}
		break;
	}
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
			f.btnSave.disabled = true;
			clearInput();	//�Է°� �ʱ�ȭ
			setInput(true);	//�Է°� Ȱ��ȭ or ��Ȱ��ȭ
			setDisabledObj(objArr, true);	//�Է°� Ȱ��ȭ or ��Ȱ��ȭ
			break;

		case "U":		//����
			f.btnSave.disabled = false;
			f.response.readOnly = false;
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
	var input_list	= new Array("subject", "start_dt", "end_dt", "weekly_content", "next_weekly_content", "statcdnm", "response", "issue", "rg_nm", "rg_dt", "mdf_nm", "mdf_dt");

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
		 //f.content[i].disabled	= gb;
		 f.content[i].readOnly	= gb;
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

/**
 * 2011.03.03
 * �ְ����� ��ȭ�� ����
 */
function openDetailView()
{
	var oGrid = document.all[SELECT_ID];
	
	if(oGrid.GetActiveRowIndex() == -1) 
	{
		MessageBox("NotSelectedGrid", "E", "");  
		return;
	}	
	
	window.open("mngWeeklyRptView.jsp?rpt_id="+gid ,"rptView", "width=680,height=860,resizable=yes,scrollbars=yes");
}