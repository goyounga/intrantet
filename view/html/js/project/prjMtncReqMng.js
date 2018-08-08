var Gridid, GridstrColumnKey, GridnRow;
var g_frm;
var SELECT_ID			= "UCPRJ020S";
var INSERT_ID			= "UCPRJ020I";
var DELETE_ID			= "UCPRJ020D";
var UPDATE_ID			= "UCPRJ020U";
var FILE_INSERT_ID2		= "UCPRJ128I";
var FILE_INSERT_ID 		= "UCPRJ126I";		//파일 추가
var FILE_SELECT_ID 		= "UCPRJ126S";		//파일 조회
var FILE_DELETE_ID 		= "UCPRJ126D";		//파일만 삭제
var FILE_REMOVE_ID 		= "UCPRJ126R";		//파일만 삭제
var UPLOAD_PATH 		= "UPLOAD_PATH";
var UPLOAD_FOLDER_NAME 	= "sch";
var bFileDelMode		= false;

//***********************************
// ONLOAD
//***********************************/

function init()
{
	setMode("INIT");
}

//***********************************
// queryList 조회
//***********************************/
function queryList()
{
	//setMode("I");
	var girdObj = document.all[SELECT_ID];
	
	girdObj.setParam("rg_dtm_format", "DATET");
	girdObj.setParam("mdf_dtm_format", "DATET");
	girdObj.setParam("sch_cont_format", "UNHTML");
	girdObj.setParam("sch_cont_format", "UNHTML");

	var trans = new Trans();							
	trans.setSvc("UCPRJ020S");					// 쿼리ID
	trans.setPageRow("50");					// 1Page에 몇 개의 Row를 출력할 것인가?		
	trans.setDefClick("true");
	trans.setWiseGrid("1");					// wisegrid를 사용하는 경우 반드시 추가			
	trans.setForwardId("wgdsl","");			// wisegrid를 사용하는 경우 반드시 추가
	trans.open("fQuery", "f","/wisegrid.do");
}


/********************
* 그리드 클릭
********************/
function showDetailO_obj(id, strColumnKey, nRow)
{
	var GridObj = document.all[id];

	if(id==SELECT_ID)
	{
		showDetailByWise(id, nRow, f);
		f.isRnmDate.checked=false;
		setMode("S");
		if (GridObj.GetCellValue("file_cnt",nRow) > 0)
		{
			queryUploadFile();
		}
	}	
}

function queryUploadFile()
{
	f.up_seq.value = f.sch_seq.value;
	var tran = new Trans();
	tran.setSvc(FILE_SELECT_ID);
	tran.setPageRow(9999);
	tran.setAsync(false);
	tran.setCallBack("showUploadFileList"); 
	tran.open("f", "f", "/common.do");
}

//***********************************
//프로젝트 등록 
//***********************************/
function Add()
{
	setMode("I");
	//actionMode="U";
}

//***********************************
//프로젝트 수정 
//***********************************/
function Update()
{
	setMode("U");
	//actionMode="U";
}

//***********************************
// 프로젝트 저장 
//***********************************/
function saveData()
{
	if(getValidation(f,true)== false) return;
	//파일업로드 시
	if (iUpload.existsUploadFile() == true)
	{
		iUpload.upload(UPLOAD_PATH, UPLOAD_FOLDER_NAME);
	}
	else
	{
		save();
	}
}	
//***********************************
// 프로젝트 저장 
//***********************************/
function save()
{
	if(f.userid.value == "")
	{
		alert("로그인 정보가 없습니다. 재로그인 하세요.");
		return;
	}
	if(f.clnt_nm.value == "")
	{
		MessageBox("Required", "E", "고객사");
		f.clnt_nm.focus();
		return;
	}
	
	var svcid = "";
	var sCallback = "";
	if(f.sch_seq.value == "")
	{
		svcid = INSERT_ID;
		if (iUpload.existsUploadFile() == true)
		{
			svcid += ","+FILE_INSERT_ID2;
		}
		sCallback = "callbackInsert()";
	}else
	{
		svcid =  UPDATE_ID;
		sCallback = "callbackUpdate()";
		f.up_seq.value = f.sch_seq.value;
		if (iUpload.existsUploadFile() == true)
		{
			svcid += ","+FILE_INSERT_ID;
		}
	}
	
	var tran=new Trans();
	tran.setCallBack(sCallback);
	tran.setSvc(svcid);
	tran.open("f","","/common.do");
}

//***********************************
// 삭제
//***********************************/
function Del()
{
	if(f.userid.value == "")
	{
		alert("로그인 정보가 없습니다. 재로그인 하세요.");
		return;
	}

	if(f.sch_seq.value == "")
	{
		MessageBox("NotChecked", "E", "");
		return;
	}

	if(!MessageBox("DelConfirm", "C", "")) return;
	
	var tran=new Trans();
	tran.setSvc(DELETE_ID+","+FILE_DELETE_ID);
	if (f.file_cnt.value > 0)
	{
		tran.setCallBack("delUploadFileAll");
		bFileDelMode		= true;
	}
	else
	{
		tran.setCallBack("callbackDel");
	}
	tran.setMyUserParams("prg_id",f.prg_id.value);
	tran.setMyUserParams("up_seq",f.sch_seq.value);
	tran.setMyUserParams("sch_seq",f.sch_seq.value);
	tran.open("","","/common.do");
}

//***********************************
//취소
//***********************************/
function Cancel()
{
	var GridObj = document.all[SELECT_ID];
	var GridIdx = GridObj.GetActiveRowIndex();
	
	if(GridIdx > -1)
	{
		setMode("S");
		showDetailByWise(SELECT_ID, GridIdx, f);
	}
	else setMode("INIT");
}

//신규등록후 콜백
function callbackInsert()
{
	if (DataSet.isError(INSERT_ID) == "true") return;
	//insertWiseGridRow(FAQ_SELECT_ID, -1, f)
	//oList.SetCellImage("view", oList.GetActiveRowIndex(), 0);
	setMode(f,"U");
	queryList();
}

//수정후 콜백
function callbackUpdate()
{
	if (DataSet.isError(UPDATE_ID) == "true") return;
	setMode(f,"U");
	queryList();
}


//삭제후 콜백
function callbackDel()
{	
	
	//removeWiseGridRow  (FAQ_SELECT_ID, oList.GetActiveRowIndex());
	//	setMode("I");
	alert("선택하신 자료가 삭제 되었습니다.");
	queryList();

}
/********************
* CALLBACK
********************/
function callback(sServiceID)
{
	switch (sServiceID)
	{
		case FILE_DELETE_ID:

			if (DataSet.getParam(FILE_DELETE_ID, 1, 0, "SUCCESS_COUNT") > 0)
			{
				MessageBox("Success", "E", "");
				delUploadFile(f.new_file_nm.value, UPLOAD_FOLDER_NAME, UPLOAD_PATH);

				queryUploadFile();
			}
			break;
		case FILE_REMOVE_ID:	

			if (bFileDelMode==true)	callbackDel();
			bFileDelMode		= false;
			break;
		default:		
			break;
	}
}


/********************
* 모드변경
********************/
function setMode(sType)
{
	gsXaFlag = sType;

	var cntrForm = new Array(
								f.clnt_nm, f.system_nm, f.pgm_nm, f.req_nm, f.req_tel, f.req_date, f.cntr_cd, f.mtnc_cd, 
								f.rnm_mtd_cd, f.rnm_strt_date,  f.rnm_end_date, f.proc_time, f.cf_nm, f.end_yn, 
								f.sch_cont, f.rsn_cont, f.prcs_cont
							);
	
	switch(sType)
	{
		case "INIT":	//초기화
	 		clear(f);
			
	 		setDisabledObj(cntrForm, true);
			
			f.isRnmDate.checked=false;
			uploadFileDisabled(false);
			initUploadFile();
			if (f.btnAdd)  		f.btnAdd.disabled = false;
			if (f.btnUpdate)  	f.btnUpdate.disabled = true;
			if (f.btnSave)  	f.btnSave.disabled = true;
			if (f.btnDel)  		f.btnDel.disabled = true;
			if (f.btnCancel)  	f.btnCancel.disabled = true;
			
			break;
			
		case "I":	//등록
			setDisabledObj(cntrForm, false);
			
	 		clear(f);
	 		
	 		f.system_nm.value = "uCare";
	 		
	 		f.prcs_k_id.value = gInfo.userid.value;
			f.prcs_k_nm.value = gInfo.usernm.value;
			
			f.req_date.value = gInfo.today.value;
			f.rnm_strt_date.value = gInfo.today.value;
			f.rnm_end_date.value = gInfo.today.value;
			
			f.sch_seq.value = "";
			f.up_seq.value  = "";
			
			f.isRnmDate.checked=false;
			uploadFileDisabled(false);
			initUploadFile();
			if (f.btnAdd)  		f.btnAdd.disabled = true;
			if (f.btnUpdate)  	f.btnUpdate.disabled = true;
			if (f.btnSave)  	f.btnSave.disabled = false;
			if (f.btnDel)  		f.btnDel.disabled = true;
			if (f.btnCancel)  	f.btnCancel.disabled = false;
			
			break;
		case "U":	//상세정보 등록			
			setDisabledObj(cntrForm, false);
			
			f.isRnmDate.checked=false;
			uploadFileDisabled(false);
			initUploadFile();
			
			if (f.btnAdd)  		f.btnAdd.disabled = true;
			if (f.btnUpdate)  	f.btnUpdate.disabled = true;
			if (f.btnSave)  	f.btnSave.disabled = false;
			if (f.btnDel)  		f.btnDel.disabled = true;
			if (f.btnCancel)  	f.btnCancel.disabled = false;
			
			break;
		case "S":	//상세정보 수정
			setDisabledObj(cntrForm, true);
			
			f.isRnmDate.checked=false;
			uploadFileDisabled(false);
			initUploadFile();
			if (f.btnAdd)  		f.btnAdd.disabled = false;
			if (f.btnUpdate)  	f.btnUpdate.disabled = false;
			if (f.btnSave)  	f.btnSave.disabled = true;
			if (f.btnDel)  		f.btnDel.disabled = false;
			if (f.btnCancel)  	f.btnCancel.disabled = true;

			break;
		default:
			break;
	}
}

/********************
* 프로젝트 선택버튼
********************/
function openProject(frm)
{
	g_frm = frm;
	
	if(typeof(openPopup) == "object")
		openPopup.close();
	
	openPopup("/jsp/project/prjMntcPOP.jsp", "", "popup", "0", "300", "800", "565", "toolbar=no,scrollbars=no");
}

/********************
* 프로젝트 창에서 선택했을때 setProject를 호출한다.
********************/
function setProject(prj_seq, prj_nm, clnt_corp_nm)
{
	g_frm.mtnc_seq.value 	= prj_seq;
	g_frm.mtnc_nm.value 	= prj_nm;
	
	if (g_frm.name == "f")
		g_frm.clnt_nm.value = clnt_corp_nm;

}

/********************
* 프로젝트 Clear버튼
********************/
function del_Project(frm)
{
	frm.mtnc_seq.value = "";
	frm.mtnc_nm.value = "";
	
	if (frm.name == "f")
		frm.clnt_nm.value = "";
}

/********************
* 사용자 선택버튼
********************/
function openUserOrg(frm)
{
	g_frm = frm;
	
	if(typeof(openPopup) == "object")
		openPopup.close();
	
	openPopup("/jsp/common/comUserOrg.jsp", "", "popup", "0", "300", "800", "580", "toolbar=no,scrollbars=no");
}

/********************
* 사용자 조직도(g_pop) 창에서 선택했을때 setOrgUserInfo를 호출한다.
********************/
function setOrgUserInfo(id, nm, cd)
{
	g_frm.prcs_k_id.value = id;
	g_frm.prcs_k_nm.value = nm;

}

/********************
* 사용자 Clear버튼
********************/
function del_userID(frm)
{
	frm.prcs_k_id.value = "";
	frm.prcs_k_nm.value = "";
}

//***********************************
// checkEnterKey 엔터키
//***********************************
function checkEnterKey()
{
	if(isEnterKey())
	{
		queryList();
	}
}
