var SELECT_ID = "UCSYS042S";
var INSERT_ID = "UCSYS043I";
var UPDATE_ID = "UCSYS042U";
var DELETE_ID = "UCSYS042D";
var CHECK_ID  = "UCSYS044S";

var gsXaFlag = "";
var signidGb = "";
var tRow = -1;
function init()
{
	gsXaFlag = "I";
	setMode(gsXaFlag);
}

function queryList()
{
	gsXaFlag = "I";
	setMode(gsXaFlag);
	
	var trans = new Trans();							
	trans.setSvc(SELECT_ID);					// ����ID
	trans.setPageRow("9999");					// 1Page�� �� ���� Row�� ����� ���ΰ�?		
	trans.setWiseGrid("1");					// wisegrid�� ����ϴ� ��� �ݵ�� �߰�			
	trans.setForwardId("wgdsl","");			// wisegrid�� ����ϴ� ��� �ݵ�� �߰�
	trans.open("fQuery", "f","/wisegrid.do");
}

function add(obj)
{
	gsXaFlag = "A";
	setMode(gsXaFlag);
}

function cancel(obj)
{
	if (gsXaFlag == "U")
	{
		showDetailO_obj(SELECT_ID, "", tRow);	//���� ���õǾ��� Row ����
	}else if(tRow > -1)
	{
		showDetailO_obj(SELECT_ID, "", tRow);	//���� ���õǾ��� Row ����
	}
	else 
	{
		gsXaFlag = "I";
		setMode(gsXaFlag);
	}
}

function setMode(sType)
{

	switch (sType)
	{
		case "I":
			tRow = -1;
			f.sign_tp_cd.value = "";
			f.org_cd.value = "";
			f.org_nm.value = "";
			f.sign_id1.value = "";
			f.sign_nm1.value = "";
			f.sign_id2.value = "";
			f.sign_nm2.value = "";
			f.sign_id3.value = "";
			f.sign_nm3.value = "";
			f.sign_stg_cd.value = "";
			f.regnm.value = "";
			f.regdt.value = "";
			f.chgnm.value = "";
			f.chgdt.value = "";
			onChange_sign_stg_cd(f.sign_stg_cd);
			f.sign_tp_cd.disabled 	= true;
		    f.sign_tp_cd.className 	= "combo_disabled";
		    f.sign_stg_cd.disabled 	= true;
		    f.sign_stg_cd.className 	= "combo_disabled";
		
			if (f.btnAdd)  		f.btnAdd.disabled = false;
			if (f.btnSave)  	f.btnSave.disabled = true;
			if (f.btnDel)  		f.btnDel.disabled = true;
			if (f.btnCancel)  	f.btnCancel.disabled = true;

			break;
			
		case "A":
			f.sign_tp_cd.value = "";
			f.org_cd.value = "";
			f.org_nm.value = "";
			f.sign_id1.value = "";
			f.sign_nm1.value = "";
			f.sign_id2.value = "";
			f.sign_nm2.value = "";
			f.sign_id3.value = "";
			f.sign_nm3.value = "";
			f.sign_stg_cd.value = "";
			f.regnm.value = "";
			f.regdt.value = "";
			f.chgnm.value = "";
			f.chgdt.value = "";
			onChange_sign_stg_cd(f.sign_stg_cd);
			f.sign_tp_cd.disabled 	= false;
		    f.sign_tp_cd.className 	= "combo_required";
		    f.sign_stg_cd.disabled 	= false;
		    f.sign_stg_cd.className 	= "combo_required";
		
			if (f.btnAdd)  		f.btnAdd.disabled = false;
			if (f.btnSave)  	f.btnSave.disabled = false;
			if (f.btnDel)  		f.btnDel.disabled = true;
			if (f.btnCancel)  	f.btnCancel.disabled = false;

			break;
			
		case "U":
			
			f.sign_tp_cd.disabled 	= true;
		    f.sign_tp_cd.className 	= "combo_disabled";
		    f.sign_stg_cd.disabled 	= false;
		    f.sign_stg_cd.className 	= "combo_required";
		    
			if (f.btnAdd)  		f.btnAdd.disabled = false;
			if (f.btnSave)  	f.btnSave.disabled = false;
			if (f.btnDel)  		f.btnDel.disabled = false;
			if (f.btnCancel)  	f.btnCancel.disabled = false;

			break;
			
		default:
			break;
	}
}

function save(obj)
{
	if (getValidation(f, true) == false) return;

	if(f.org_cd.value == "")
	{
		MessageBox("Required", "E", "������Ʈ")
		return;
	
	}
	if(f.sign_stg_cd.value == "1" && f.sign_id1.value=="")
	{
		alert("�����ڸ� Ȯ���ϼ���.");
		return;
	
	}else if(f.sign_stg_cd.value == "2" && (f.sign_id1.value=="" || f.sign_id2.value==""))
	{
		alert("�����ڸ� Ȯ���ϼ���.");
		return;
	
	}else if(f.sign_stg_cd.value == "3" && (f.sign_id1.value=="" || f.sign_id2.value=="" || f.sign_id3.value==""))
	{
		alert("�����ڸ� Ȯ���ϼ���.");
		return;
	
	}

	if(!MessageBox("SavConfirm", "C", "")){
		return;
	}

	var sServiceID;	
	if (gsXaFlag == "A") {
		sServiceID = CHECK_ID;		
	} else {
		sServiceID	= UPDATE_ID;
	}
	
	var tran = new Trans();
	tran.setSvc(sServiceID);
	tran.open("f", "", "/common.do");
}

function del(obj)
{
	if(!MessageBox("DelConfirm", "C", "")){
		return;
	}

	var params = "";

	params = "org_cd="+f.org_cd.value+"&sign_tp_cd="+f.sign_tp_cd.value;

	var tran = new Trans();
	tran.setSvc(DELETE_ID);
	tran.setUserParams(params);
	tran.open("","","/common.do");
}

/**
 * ����Ʈ Ŭ����
 */
function showDetailO_obj(id, strColumnKey, nRow)
{
	var obj = document.all[id];
	
	tRow = nRow;
	f.sign_tp_cd.value = obj.GetCellValue("sign_tp_cd",nRow);
	f.org_cd.value = obj.GetCellValue("org_cd",nRow);
	f.org_nm.value = obj.GetCellValue("org_nm",nRow);
	f.sign_id1.value = obj.GetCellValue("sign_id1",nRow);
	f.sign_nm1.value = obj.GetCellValue("sign_nm1",nRow);
	f.sign_id2.value = obj.GetCellValue("sign_id2",nRow);
	f.sign_nm2.value = obj.GetCellValue("sign_nm2",nRow);
	f.sign_id3.value = obj.GetCellValue("sign_id3",nRow);
	f.sign_nm3.value = obj.GetCellValue("sign_nm3",nRow);
	f.sign_stg_cd.value = obj.GetCellValue("sign_stg_cd",nRow);
	f.regnm.value = obj.GetCellValue("regnm",nRow);
	f.regdt.value = obj.GetCellValue("regdt",nRow);
	f.chgnm.value = obj.GetCellValue("chgnm",nRow);
	f.chgdt.value = obj.GetCellValue("chgdt",nRow);
	onChange_sign_stg_cd(f.sign_stg_cd);
	
	gsXaFlag = "U";
	setMode(gsXaFlag);
}

function callback(dsnm)
{
	switch (dsnm)
	{
		case CHECK_ID:
			if(DataSet.getParam(CHECK_ID, 1, 0, "cnt") > 0)
			{
				alert("������ ������Ʈ, ���������� ��ϵǾ� �ֽ��ϴ�.");
				return;
			}
			else
			{
				var tran = new Trans();
				tran.setSvc(INSERT_ID);
				tran.open("f", "", "/common.do");
			}
			
			break;

		case INSERT_ID:
			if(DataSet.getParam(INSERT_ID, 1, 0, "SUCCESS_COUNT") > 0){
				MessageBox("Success", "I", "");
				
				queryList();
				return;
			}else{
				MessageBox("InfFail", "I", "");
				return;
			}
		break;

		case UPDATE_ID:
			if(DataSet.getParam(UPDATE_ID, 1, 0, "SUCCESS_COUNT") > 0){
				MessageBox("Success", "I", "");
				
				queryList();
				return;
			}else{
				MessageBox("InfFail", "I", "");
				return;
			}
		break;

		case DELETE_ID:
			if(DataSet.getParam(DELETE_ID, 1, 0, "SUCCESS_COUNT") > 0){
				MessageBox("Success", "I", "");
				
				queryList();
				return;
			}else{
				MessageBox("InfFail", "I", "");
				return;
			}
			break;
	}
}




/**
 * ����ܰ� ����
 * obj ����ܰ� �޺��ڽ� ��ü
 */
function onChange_sign_stg_cd(obj)
{
	signidGb = obj.value;
}

/********************
* ������Ʈ ���ù�ư
********************/
function openOrg(frm)
{
	if(frm.name == "f" && (gsXaFlag == "I" || gsXaFlag == "U"))return;

	g_frm = frm;
	
	if(typeof(openPopup) == "object")
		openPopup.close();
	
	openPopup("/jsp/common/comOrgPop.jsp", "", "popup", "0", "300", "320", "582", "toolbar=no,scrollbars=no");
//	openPopup("/jsp/project/prjExePOP.jsp", "", "popup", "0", "300", "800", "565", "toolbar=no,scrollbars=no");
}

/********************
* ������Ʈ â���� ���������� setProject�� ȣ���Ѵ�.
********************/
function setOrg(org_cd, org_nm)
{
	g_frm.org_cd.value = org_cd;
	g_frm.org_nm.value = org_nm;

}

/********************
* ������Ʈ Clear��ư
********************/
function delOrg(frm)
{
	if(frm.name == "f" && (gsXaFlag == "I" || gsXaFlag == "U"))return;
	
	frm.org_cd.value = "";
	frm.org_nm.value = "";
}

var g_idx = "";
/********************
* ����� ���ù�ư
********************/
function openUserOrg(idx)
{
	if(gsXaFlag == "I")return;

	if(signidGb == "")
	{
		alert("����ܰ踦 �����ϼ���.");
		return;
	}else if(Number(signidGb) < Number(idx))
	{
		alert("����ܰ躸�� �����ڰ� ���� �� �����ϴ�.");
		return;
	}

	g_idx = idx;
	
	if(typeof(openPopup) == "object")
		openPopup.close();
	
	openPopup("/jsp/common/comUserOrg.jsp", "", "popup", "0", "300", "800", "580", "toolbar=no,scrollbars=no");
}

/********************
* ����� ������(g_pop) â���� ���������� setOrgUserInfo�� ȣ���Ѵ�.
********************/
function setOrgUserInfo(id, nm, cd)
{
	document.f["sign_id"+g_idx].value = id;
	document.f["sign_nm"+g_idx].value = nm;

}

/********************
* ����� Clear��ư
********************/
function del_userID(idx)
{
	document.f["sign_id"+idx].value = "";
	document.f["sign_nm"+idx].value = "";
}
