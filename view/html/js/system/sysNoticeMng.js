
var SELECT_NOTICE_ID = "UCSYS061S";
var INSERT_NOTICE_ID = "UCSYS062I";
var UPDATE_NOTICE_ID = "UCSYS063U";
var DELETE_NOTICE_ID = "UCSYS064D";

var SELECT_TARGET_ID = "UCSYS065S";
var DELETE_TARGET_ID = "UCSYS068D"; 

var g_year;				//현재년도
var g_month;			//현재달
var g_month1;			//다음달
var g_day;				//현재일
var gsXaFlag;			//모드
var g_rowIdx;			//선택된 row Index
var popObj;				//popup Object(열람대상자 사용자리스트)


/********************
* 업체변경시 재조회
********************/
function getComCorp()
{
	query();
}

/********************
* init
********************/
function init()
{
	editor();

	query();
}

/********************
* 공지사항 조회
********************/
function query()
{
	getCorp();

	setMode("A");

	var trans = new Trans();
	trans.setSvc(SELECT_NOTICE_ID);
	trans.setDefClick(true);
	trans.setWiseGrid("1");			// wisegrid를 사용하는 경우 반드시 추가			
	trans.setForwardId("wgdsl","");	// wisegrid를 사용하는 경우 반드시 추가
	trans.open("fQuery", "f","/wisegrid.do");
}

/*************************
* 업체정보를 가져온다.
*************************/
function getCorp()
{
	corp_cd = top.document.all("corp_cd_chng").value;
	corp_nm = top.document.all("corp_nm_chng").value;

	fQuery.corp_cd.value = corp_cd;
	fQuery.corp_nm.value = corp_nm;

//	var params;
//	params = "&corp_cd="+corp_cd;
//	params += "&corp_nm="+corp_nm;
//	
//	return params;
}


/********************
* 열람대상조회
********************/
function tarQuery()
{
	var tran = new Trans();
	tran.setSvc(SELECT_TARGET_ID);
	tran.setWiseGrid("1");			// wisegrid를 사용하는 경우 반드시 추가			
	tran.setForwardId("wgdsl","");	// wisegrid를 사용하는 경우 반드시 추가
	tran.open("f2", "","/wisegrid.do");
}

/********************
* 상세정보 이벤트
********************/
function showDetailO_obj(id, strColumnKey, nRow)
{
	if(id == SELECT_NOTICE_ID)
	{
		setMode("U");

		g_rowIdx = nRow;

		showDetail(SELECT_NOTICE_ID, nRow, f);

		var gridObj = document.all(SELECT_NOTICE_ID);

		f2.ntce_id.value = gridObj.GetCellValue("ntce_id", nRow);

		editor_setHTML('ntce_txt', f.ntce_txt.value);
		
//		if(DataSet.getParam(SELECT_NOTICE_ID, DataSet.getCurPage(SELECT_NOTICE_ID), nRow, "atch_file_nm")!="")
//		{
//			document.all("file_down").style.display ="";
//			document.all("file_up").style.display ="none";
//		}
//		else
//		{
//			document.all("file_down").style.display ="none";
//			document.all("file_up").style.display ="";
//			
//			iUpload.location.reload();
//		}
		
		tarQuery();
	}
}

/********************
* 등록 이벤트
********************/
function add()
{
	setMode("A");
	
	var obj = document.all(SELECT_TARGET_ID);
		obj.RemoveAllData();

   	InitUcareData.removeDataSet(SELECT_TARGET_ID);
}

/********************
* 저장 이벤트
********************/
function save()
{
	var queryID = "";
	
	if(gsXaFlag == "U")
		queryID = UPDATE_NOTICE_ID;
	else if(gsXaFlag == "A")
		queryID = INSERT_NOTICE_ID;
	
	var trans = new Trans();
	trans.setSvc(queryID);
	trans.open("f","","/common.do");	
}

/********************
* 삭제 이벤트
********************/
function del()
{
	if(!MessageBox("DelConfirm", "C", ""))
		return;
	
	var trans = new Trans();
	trans.setSvc(DELETE_NOTICE_ID+","+DELETE_TARGET_ID);	
	trans.open("f","","/common.do");
}



/********************
* 열람대상 사용자 리스트 open
********************/
function openUserOrg()
{
	popObj = openPopup("/jsp/system/sysUserOrg.jsp", "ntce_id="+f.ntce_id.value, "UserOrg", "0", "300", "800", "582", "toolbar=no,scrollbars=no");
}

/********************
* 열람대상자 삭제
********************/
function targetDel()
{
	var obj	= document.UCSYS065S;
	var user_id		= "";
	var seq			= "";
	
	for(var i=0; i<obj.GetRowCount(); i++)
	{
		if(obj.GetCellValue("userid_chk", i) == "1")	//채크되었다면..
		{	
			//선택된 사용자 id
			if(user_id)
				user_id	+=	""+obj.GetCellValue("user_id", i);
			else
				user_id	=	obj.GetCellValue("user_id", i);
				
			if(seq)
				seq +=	""+obj.GetCellValue("insp_obj_seq", i);
			else
				seq =	obj.GetCellValue("insp_obj_seq", i);			
		}
	}

	if(!user_id)
	{
		MessageBox("SYSSelectRow", "E", "");
		return;
	}
	
	if(!MessageBox("SYSUserExempt", "C", ""))
		return;
	
	var params = "&user_id="+user_id+"&seq="+seq;
	
	//저장
	var trans = new Trans();
	trans.setSvc(DELETE_TARGET_ID);
	trans.setUserParams(params);
	trans.open("f2", "","/common.do")
}

/********************
* unLoad
********************/
function unLoad()
{
	if(typeof(popObj) == "object")
		popObj.close();
}

/********************
* 파일업로드 이벤트
********************/
function fileUpLoad()
{
	if(!f.ntce_sbjt.value)
	{
		MessageBox("Required", "E", "제목");
		return;
	}
	if(!f.ntce_tp_cd.value)
	{
		MessageBox("Required", "E", "게시구분");
		return;
	}

	if(!MessageBox("SavConfirm", "C", ""))
		return;
		
		save();
}

/********************
* 파일명 받는 이벤트
* iUpload(upload.jsp)로부터 호출된다.
********************/
function setFileName(filenm) 
{
    f.atch_file_nm.value = filenm;
    save();
}

/********************
* 기존 첨부파일삭제 이벤트
********************/
function fileDel()
{
	var obj = document.all(SELECT_NOTICE_ID);

	var file_nm = obj.GetCellValue("atch_file_nm", g_rowIdx);
	
	if(!file_nm)
		return;
		
	var trans = new Trans();
	trans.setPageRow("9999");
	trans.setSvc(SELECT_NOTICE_ID);
	trans.setForwardId("commonjsp","/jsp/common/removeFile.jsp?file_name="+ file_nm +"&file_path=UPLOAD_PATH");
	//tran.setCallBack("callbackSave");
	trans.open("f","f","/common.do");
}

/********************
* 콜백
********************/
function callback(serviceID)
{

	switch(serviceID)
	{
		//조회
		case SELECT_NOTICE_ID:

			break;
			
		case SELECT_TARGET_ID:

			if (DataSet.getTotalCount(SELECT_TARGET_ID) < 1)
				f.btnTargetDel.disabled = true;
			else
				f.btnTargetDel.disabled = false;

			break;
		
		//등록
		case INSERT_NOTICE_ID:

			if (DataSet.getParam(serviceID, 1, 0, "SUCCESS_COUNT") > 0)
			{
//				if(iUpload.fUpload._UPLOAD_FILE.value !="")
//					iUpload.location.replace("/jsp/common/upload.jsp?file_path=UPLOAD_PATH");
				MessageBox("InfSuccess", "I", "");

				query();
			}
			else
			{
				MessageBox("InfFail", "E", "");
			}
				
			break;
		
		//수정
		case UPDATE_NOTICE_ID:

			if (DataSet.getParam(serviceID, 1, 0, "SUCCESS_COUNT") > 0)
			{
//				if(iUpload.fUpload._UPLOAD_FILE.value !="")
//					iUpload.location.replace("/jsp/common/upload.jsp?file_path=UPLOAD_PATH");
				MessageBox("InfSuccess", "I", "");

				query();
			}
			else
			{
				MessageBox("InfFail", "E", "");
			}
				
			break;
		
		//삭제
		case DELETE_NOTICE_ID+","+DELETE_TARGET_ID:

			if (DataSet.getParam(DELETE_TARGET_ID, 1, 0, "SUCCESS_COUNT") > 0)

				query();
			else
			{
				MessageBox("Fail", "E", "삭제를");
			}
				
			break;
		
		//열람대상자 제외
		case DELETE_TARGET_ID:

			if (DataSet.getParam(serviceID, 1, 0, "SUCCESS_COUNT") > 0)
				tarQuery();
			else
			{
				MessageBox("Fail", "E", "열람대상자 제외를");
			}

			break;

		case "UCSYS063_1U":

			if (DataSet.getParam("UCSYS063_1U", 1, 0, "SUCCESS_COUNT") > 0)
			{
//				document.all("file_down").style.display ="none";
//				document.all("file_up").style.display ="";
//			
//				iUpload.location.reload();
				query();
			}	

			break;

		default:
			break;
	}
}

/********************
* 모드변경 이벤트
********************/
function setMode(sType)
{
	gsXaFlag = sType;
	switch(sType)
	{
		case "U":
			//버튼 모드변경
			f.btnAdd.disabled		= false;
			f.btnSave.disabled		= false;
			f.btnDel.disabled		= false;
			
			//Elements 초기화
			f.ntce_id.value			= "";
			f.ntce_sbjt.value		= "";
			f.anc_st_dt.value		= "";
			f.anc_end_dt.value		= "";
			f.ntce_tp_cd.value		= "02";
			f.atch_file_nm.value	= "";
			f.ntce_txt.value		= "";
			editor_setHTML('ntce_txt', '');
			f.rg_nm.value			= "";
			f.rg_dtm.value			= "";
			f.mdf_nm.value			= "";
			f.mdf_dtm.value			= "";
			break;
		
		case "A":
			//버튼 모드변경
			f.btnAdd.disabled		= false;
			f.btnSave.disabled		= false;
			f.btnDel.disabled		= true;
			
			//Elements 초기화
			f.ntce_id.value			= "";
			f.ntce_sbjt.value		= "";
			f.anc_st_dt.value		= "";
			f.anc_end_dt.value		= "";
			f.ntce_tp_cd.value		= "02";
			f.atch_file_nm.value	= "";
			f.ntce_txt.value		= "";
			editor_setHTML('ntce_txt', '');
			f.rg_nm.value			= "";
			f.rg_dtm.value			= "";
			f.mdf_nm.value			= "";
			f.mdf_dtm.value			= "";
			break;
		
		default:
			break;
	}
}


//글내용에서 첨부 파일 클릭시 
function openFile()
	{
	location.href("/jsp/common/downFile.jsp?filename="+f.atch_file_nm.value);
}


//첨부파일삭제
function delFile(obj)
{	
	if(!MessageBox("DelConfirm", "C", "파일을"))
		return;
	
	removeFile("UPLOAD_PATH", f.atch_file_nm.value);
	
	var tran=new Trans();
	tran.setSvc("UCSYS063_1U");
	tran.open("f","f","/common.do");
}

/*
// 파일명 받기 
function setFileName(filenm) 
{
    f2.filenm.value = filenm;
    save();
}

//파일 다운로드
function fileDown(){
    if(iUpload.fUpload._UPLOAD_FILE.value =="")
	{
		save();
	}
	else if(iUpload.fUpload._UPLOAD_FILE.value !="")
	{		
		if( gsXaFlag == "U")
		{	
			//수정시 기존 첨부파일 삭제
			fileDel();
		}
		//save는 setFileName(filenm)파일명을 받는데서 함.
		iUpload.upload(""); 
	}
}
//등록시
function add()
{
	setMode(f2,"A");
	editorMode("noticedesc","write");
	editor_setHTML('noticedesc', f2.noticedesc.value);
	comGridDeleteAll(SELECT_INSPECTTARGET_ID,2);
}
*/

//등록or수정시 공지사항 내용없을때 
function getEditorValidation(frm,objname){
	var editor_obj = document.all["_" +objname + "_editor"];	
	if(editor_obj.contentWindow.document.body.innerText.length == 0){
		alert(eval("frm."+objname+".requirednm")+"는 필수 입니다.");
		editor_obj.contentWindow.document.body.focus();
		return false;
	}
	return true;
}

//엔터키 조회
function checkEnterKey()
{
	if(isEnterKey())
	{
		query();
	}
}

