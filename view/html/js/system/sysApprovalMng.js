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
	trans.setSvc(SELECT_ID);					// 쿼리ID
	trans.setPageRow("9999");					// 1Page에 몇 개의 Row를 출력할 것인가?		
	trans.setWiseGrid("1");					// wisegrid를 사용하는 경우 반드시 추가			
	trans.setForwardId("wgdsl","");			// wisegrid를 사용하는 경우 반드시 추가
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
		showDetailO_obj(SELECT_ID, "", tRow);	//먼저 선택되었던 Row 선택
	}else if(tRow > -1)
	{
		showDetailO_obj(SELECT_ID, "", tRow);	//먼저 선택되었던 Row 선택
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
		MessageBox("Required", "E", "프로젝트")
		return;
	
	}
	if(f.sign_stg_cd.value == "1" && f.sign_id1.value=="")
	{
		alert("결재자를 확인하세요.");
		return;
	
	}else if(f.sign_stg_cd.value == "2" && (f.sign_id1.value=="" || f.sign_id2.value==""))
	{
		alert("결재자를 확인하세요.");
		return;
	
	}else if(f.sign_stg_cd.value == "3" && (f.sign_id1.value=="" || f.sign_id2.value=="" || f.sign_id3.value==""))
	{
		alert("결재자를 확인하세요.");
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
 * 리스트 클릭시
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
				alert("동일한 프로젝트, 결재유형이 등록되어 있습니다.");
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
 * 결재단계 변경
 * obj 결재단계 콤보박스 객체
 */
function onChange_sign_stg_cd(obj)
{
	signidGb = obj.value;
}

/********************
* 프로젝트 선택버튼
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
* 프로젝트 창에서 선택했을때 setProject를 호출한다.
********************/
function setOrg(org_cd, org_nm)
{
	g_frm.org_cd.value = org_cd;
	g_frm.org_nm.value = org_nm;

}

/********************
* 프로젝트 Clear버튼
********************/
function delOrg(frm)
{
	if(frm.name == "f" && (gsXaFlag == "I" || gsXaFlag == "U"))return;
	
	frm.org_cd.value = "";
	frm.org_nm.value = "";
}

var g_idx = "";
/********************
* 사용자 선택버튼
********************/
function openUserOrg(idx)
{
	if(gsXaFlag == "I")return;

	if(signidGb == "")
	{
		alert("결재단계를 선택하세요.");
		return;
	}else if(Number(signidGb) < Number(idx))
	{
		alert("결재단계보다 결재자가 많을 수 없습니다.");
		return;
	}

	g_idx = idx;
	
	if(typeof(openPopup) == "object")
		openPopup.close();
	
	openPopup("/jsp/common/comUserOrg.jsp", "", "popup", "0", "300", "800", "580", "toolbar=no,scrollbars=no");
}

/********************
* 사용자 조직도(g_pop) 창에서 선택했을때 setOrgUserInfo를 호출한다.
********************/
function setOrgUserInfo(id, nm, cd)
{
	document.f["sign_id"+g_idx].value = id;
	document.f["sign_nm"+g_idx].value = nm;

}

/********************
* 사용자 Clear버튼
********************/
function del_userID(idx)
{
	document.f["sign_id"+idx].value = "";
	document.f["sign_nm"+idx].value = "";
}
