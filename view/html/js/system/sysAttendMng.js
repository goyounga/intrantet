var SELECT_ATTEND_ID	= "UCSYS051S";
var INSERT_ATTEND_ID	= "UCSYS052I";
var UPDATE_ATTEND_ID	= "UCSYS053U";
var DELETE_ATTEND_ID	= "UCSYS054D";

var SELECT_ORG_ID		= "UCCOM009S";
//var SELECT_ATTENDUSER_ID = "UCSYS029S"; //��Ͻ� �������� ��ȸ

var gsXaFlag;
var g_rowIdx;
var g_pop;
var g_frm;
var corp_cd;

/********************
* ��ü����� ����ȸ
********************/
function getComCorp()
{
	init();
}

/********************
* init
********************/
function init()
{
	//f.up_org_cd.disabled	= "true";
	//f.org_cd1.disabled	= "true";

	query();
	
}

/********************
* �������� ��ȸ
********************/
function query()
{
	getCorp();

	if(!fQuery.startdt.value)
	{
		MessageBox("InputFail", "E", "��������")
		return;
	}
	else if(!fQuery.enddt.value)
	{
		MessageBox("InputFail", "E", "��������")	
		return;
	}
	
	setMode("A");
	
	var param;
		params = "&org_cd=" ;
	
	if(fQuery.up_org_cd.value && fQuery.org_cd1.value)
		param = "&org_cd="+fQuery.org_cd1.value;
	else(fQuery.up_org_cd.value && !fQuery.org_cd1.value)
		param = "&org_cd="+fQuery.up_org_cd.value.substr(0,3);
	
	var trans = new Trans();
	trans.setPageRow(-1);
	trans.setSvc(SELECT_ATTEND_ID);
	trans.setUserParams(param);
	trans.setDefClick(true);
	trans.setWiseGrid("1");			// wisegrid�� ����ϴ� ��� �ݵ�� �߰�			
	trans.setForwardId("wgdsl","");	// wisegrid�� ����ϴ� ��� �ݵ�� �߰�
	trans.open("fQuery", "f","/wisegrid.do");
}

/*************************
* ��ü������ �����´�.
*************************/
function getCorp()
{
	var tmp = top.document.all("corp_cd_chng").value;

	if(tmp == corp_cd)
		return;
		
	corp_cd = top.document.all("corp_cd_chng").value;	
	corp_nm = top.document.all("corp_nm_chng").value;
	
	fQuery.corp_cd.value = corp_cd;
	fQuery.corp_nm.value = corp_nm;
	
	makeOrgLCombo(fQuery, corp_cd);
	makeOrgLCombo(f, corp_cd);

}

/********************
* ������ �̺�Ʈ
********************/
function showDetailO_obj(id, strColumnKey, nRow)
{
	if(DataSet.getTotalCount(SELECT_ATTEND_ID) < 1)
		return;
		
	setMode("U");

	g_rowIdx = nRow;

	showDetailByWise(SELECT_ATTEND_ID, nRow, f);

	makeOrgCombo(f, f.up_org_cd, fQuery.corp_cd.value);
	f.org_cd1.value = document.all(id).GetCellValue('org_cd1', nRow);


}

/********************
* ��Ϲ�ư
********************/
function add()
{   
	setMode("A");
}

/********************
* �����ư
********************/
function save()
{
	if(!f.user_id.value)
	{
		if(!MessageBox("SelectFail3", "E", "����"))
		return;
	}
	else if(!f.work_dt.value)
	{
		if(!MessageBox("SelectFail3", "E", "������"))
		return;
	}
	else if(!f.work_cd.value)
	{
		if(!MessageBox("SelectFail3", "E", "���±���"))
		f.work_cd.focus();
		return;
	}
	else if (getValidationPk() == false)
	{
		return;
	}
	
	if(!MessageBox("SavConfirm", "C", ""))
		return;
	
	var queryID;
	if(gsXaFlag == "A")
		queryID = INSERT_ATTEND_ID;
	else if(gsXaFlag == "U")
		queryID = UPDATE_ATTEND_ID;
	
	var trans = new Trans();
	trans.setSvc(queryID);
	trans.open("f", "", "/common.do");
}

/********************
* ������ư
********************/
function del()
{
	if(f.user_id.value == "")
	{
		MessageBox("SYSDel", "E", "���� ��ü ����������");
	}
	
	if (!confirm(f.user_nm.value + "(" + f.user_id.value + ") ���� ���������� �����Ͻðڽ��ϱ�?"))
		return;	
		
	var trans = new Trans();
	trans.setSvc(DELETE_ATTEND_ID);
	trans.open("f","","/common.do");
}

/********************
* ����� ���ù�ư
********************/
function openUserOrg(frm)
{
	g_frm = frm;
	
	if(typeof(openPopup) == "object")
		openPopup.close();
	
	openPopup("/jsp/common/comUserOrg.jsp", "", "popup", "0", "300", "800", "565", "toolbar=no,scrollbars=no");
}

/********************
* ����� ������(g_pop) â���� ���������� setOrgUserInfo�� ȣ���Ѵ�.
********************/
function setOrgUserInfo(id, nm, cd)
{
	g_frm.user_id.value = id;
	g_frm.user_nm.value = nm;

	//����
	if(!cd)
		return;

	if(cd.substr(3,3) == "000")
		g_frm.up_org_cd.value = cd;
	else
		g_frm.up_org_cd.value = cd.substr(0,3)+"000";
	
	makeOrgCombo(g_frm, g_frm.up_org_cd , g_frm.corp_cd.value);
	
	if(cd.substr(3,3) != "000")
		g_frm.org_cd1.value = cd;

}

/********************
* ����� Clear��ư
********************/
function del_userID()
{
	fQuery.user_id.value = "";
	fQuery.user_nm.value = "";
}

/********************
* ����� ���� ��Ͽ��� äũ
********************/
function getValidationPk()
{
	if(gsXaFlag == "A")
	{
		var workdt = DataSet.getParamArr(SELECT_ATTEND_ID, 1, "work_dt"); 
		var userid = DataSet.getParamArr(SELECT_ATTEND_ID, 1, "user_id");
		for(i=0; i<workdt.length; i++){
			if(workdt[i] == replaceAll(f.work_dt.value, "-", "")){
				if(userid[i] == f.user_id.value)
				{
					MessageBox("SYSReg", "E", "");
					return false;
				}
			}
		}
	}
	return true;	
}

/********************
* ����Ű ��ȸ
********************/
function checkEnterKey()
{
	if(isEnterKey())
	{
		query();
	}
}

/********************
* �ݹ�
********************/
function callback(sServiceID)
{
	switch (sServiceID)
	{
		case SELECT_ATTEND_ID:
			break;
		case INSERT_ATTEND_ID:
			if (DataSet.getParam(sServiceID, 1, 0, "SUCCESS_COUNT") > 0){
				query();
			}
			break;
		case UPDATE_ATTEND_ID:
			if (DataSet.getParam(sServiceID, 1, 0, "SUCCESS_COUNT") > 0){
				query();
			}
			break;
		case DELETE_ATTEND_ID:
			if (DataSet.getParam(sServiceID, 1, 0, "SUCCESS_COUNT") > 0){
				query();
			}
			break;
		default : 
			break;
		}				
}

/********************
* ��庯�� �̺�Ʈ
********************/
function setMode(sType)
{
	gsXaFlag = sType;

	if(sType == "U")
	{
		//��ư ��� ����
		f.btnAdd.disabled	= false;
		f.btnSave.disabled	= false;
		f.btnDel.disabled	= false;
		
		//Elements �ʱ�ȭ
		f.user_id.value		= "";
		f.user_nm.value		= "";
		f.up_org_cd.value	= "";
//		org_remove(f.org_cd1);
		f.work_dt.value		= "";
		f.work_cd.value		= "";
		f.loi_tm.value		= "";
		f.lot_tm.value		= "";
		f.rg_nm.value		= "";
		f.rg_dt.value		= "";
		f.rg_tm.value		= "";
		f.mdf_nm.value		= "";
		f.mdf_dt.value		= "";
		f.mdf_tm.value		= "";
		f.work_rmk.value	= "";
		
		document.all.selectUser.style.display="none";
		document.all.workdate.style.display="none";
		
	}
	else if(sType == "A")
	{
		//��ư ��� ����
		f.btnAdd.disabled	= false;
		f.btnSave.disabled	= false;
		f.btnDel.disabled	= true;
		
		//Elements �ʱ�ȭ
		f.user_id.value		= "";
		f.user_nm.value		= "";
		f.up_org_cd.value	= "";
//		org_remove(f.org_cd1);
		f.work_dt.value		= f.today.value;
		f.work_cd.value		= "";
		f.loi_tm.value		= "";
		f.lot_tm.value		= "";
		f.rg_nm.value		= "";
		f.rg_dt.value		= "";
		f.rg_tm.value		= "";
		f.mdf_nm.value		= "";
		f.mdf_dt.value		= "";
		f.mdf_tm.value		= "";
		f.work_rmk.value	= "";
		
		document.all.selectUser.style.display="";
		document.all.workdate.style.display="";
	}
}

