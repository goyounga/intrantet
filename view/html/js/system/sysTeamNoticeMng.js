
var SELECT_ORG_ID		= "UCCOM009S"; 		//부서 조회

var SELECT_NOTICE_ID = "UCSYS120S";
var INSERT_NOTICE_ID = "UCSYS120I";
var UPDATE_NOTICE_ID = "UCSYS120U";
var DELETE_NOTICE_ID = "UCSYS120D";

var SELECT_NOTICE_ID2 = "UCSYS121S";
var INSERT_NOTICE_ID2 = "UCSYS121I";
var DELETE_NOTICE_ID2 = "UCSYS121D";

var setMode ="";
var corp_cd;


/********************
* 업체변경시 재조회
********************/
function getComCorp()
{
	team_ntce_query();
}

/********************
* ONLOAD
/*******************/
function init()
{
	editor();
	team_ntce_query();
}

/********************
* 조회
/*******************/
function team_ntce_query()
{		
	getCorp();

	clear(f);

	editor_setHTML('ntce_txt', '');
	document.all("ntce_sbjt").innerHTML ="&nbsp;";
	document.all("rg_nm").innerHTML ="&nbsp;";
	document.all("rg_dtm").innerHTML ="&nbsp;";
	document.all("mdf_nm").innerHTML ="&nbsp;";
	document.all("mdf_dtm").innerHTML ="&nbsp;";

	document.all("atch_file_nm").value ="";
	document.all("team_ntce_id").value ="";
		
	document.all("file_down").style.display ="none";
	document.all("file_up").style.display ="";

	var trans = new Trans();
	trans.setPageRow(50);
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
	var tmp = top.document.all("corp_cd_chng").value;

	if(tmp == corp_cd)
		return;
		
	corp_cd = top.document.all("corp_cd_chng").value;	
	corp_nm = top.document.all("corp_nm_chng").value;
	
	fQuery.corp_cd.value = corp_cd;
	fQuery.corp_nm.value = corp_nm;
	
	makeOrgLCombo(f, corp_cd);
}

/********************
* 열람부서 리스트 조회
********************/
function team_query()
{		
	
	var trans = new Trans();
	trans.setPageRow(50);
	trans.setSvc(SELECT_NOTICE_ID2);
	trans.setWiseGrid("1");			// wisegrid를 사용하는 경우 반드시 추가			
	trans.setForwardId("wgdsl","");	// wisegrid를 사용하는 경우 반드시 추가
	trans.setUserParams("&team_ntce_id=" +document.all("team_ntce_id").value);
	trans.open("", "f","/wisegrid.do");
}

/********************
* 상세정보 이벤트
********************/
function showDetailO_obj(id, strColumnKey, nRow)
{
	if(id == SELECT_NOTICE_ID)
	{
		setMode = "U";
		g_rowIdx = nRow;

		showDetailByWise(id, nRow, f);

		editor_setHTML('ntce_txt', f.ntce_txt.value);

		var gridObj = document.all(SELECT_NOTICE_ID);
		
//		if(DataSet.getParam(SELECT_NOTICE_ID, DataSet.getCurPage(SELECT_NOTICE_ID), nRow, "filenm")!="")
		if(gridObj.GetCellValue("filenm", nRow)!="")
		{
			document.all("file_down").style.display ="";
			document.all("file_up").style.display ="none";
		}
		else
		{
			document.all("file_down").style.display ="none";
			document.all("file_up").style.display ="";
			
			iUpload.location.reload();
		}
		team_query();
	}
}

/********************
* 등록버튼을 눌렀을 때
********************/
function add()
{
	clear(f);

	editor_setHTML('ntce_txt', '');
	document.all("ntce_sbjt").innerHTML ="&nbsp;";
	document.all("rg_nm").innerHTML ="&nbsp;";
	document.all("rg_dtm").innerHTML ="&nbsp;";
	document.all("mdf_nm").innerHTML ="&nbsp;";
	document.all("mdf_dtm").innerHTML ="&nbsp;";

	document.all("atch_file_nm").value ="";
	document.all("team_ntce_id").value ="";
		
	document.all("file_down").style.display ="none";
	document.all("file_up").style.display ="";
	
	var obj = document.all(SELECT_NOTICE_ID2);
  	obj.RemoveAllData();
   	InitUcareData.removeDataSet(SELECT_NOTICE_ID2);
	
	setMode = "A";			//set_mode를 등록으로 ...	

	f.corp_cd.value = fQuery.corp_cd.value;
}

/********************
* 저장버튼을 눌렀을 때  
  setMode가 "A"일때 는 새로 등록 
  "U"는 수정 
********************/
function save()
{
	getCorp();

	if(f.ntce_sbjt.value =="")
	{
		alert("제목을 입력해주세요");
		f.ntce_sbjt.focus();
		return;
	}
	
	if(f.anc_st_dt.value =="")
	{
		alert("게시기간을 입력해주세요");
		f.anc_st_dt.focus();
		return;
	}
	if(f.anc_st_dt.value =="" && f.anc_end_dt.value =="" )
	{
		alert("게시기간을 입력해주세요");
		return;
	}
	if(f.ntce_tp_cd.value =="")
	{
		alert("게시구분을 선택해주세요");
		f.ntce_tp_cd.focus();
		return;
	}
	
	if(setMode =="A")
	{	
		if(!confirm("새로 등록하시겠습니까?")) return;
		if(iUpload.fUpload._UPLOAD_FILE.value !="")
		{
			
			iUpload.upload("");
		}
		else 
		{
			ntce_save();
		}
	}
	
	else if(setMode=="U")
	{
		if(!confirm("수정하시겠습니까?")) return;
		
		if(iUpload.fUpload._UPLOAD_FILE.value !="")
		{
			iUpload.upload("");
		}
		else 
		{
			ntce_save();
		}
	}
}

function ntce_save()
{
	var queryID = "";
	
	if(setMode == "U")
		queryID = UPDATE_NOTICE_ID;
	else if(setMode == "A")
		queryID = INSERT_NOTICE_ID;
	
	var trans = new Trans();
	trans.setSvc(queryID);
	trans.open("f","","/common.do");
}

function addTeam()
{
	if(DataSet.getTotalCount(SELECT_NOTICE_ID) < 1)
	{
		alert("추가할 공지사항을  선택해주세요.");
		return;
	}
	
	if(document.all("up_org_cd").value =="")
	{
		alert("추가할 팀을 선택해 주세요");
		document.all("up_org_cd").focus();
		return;
	}
	
	if(document.all("org_cd1").value =="")
	{
		alert("추가할 부서를 선택해 주세요");
		document.all("org_cd1").focus();
		return;
	}
	
	var grid = document.getElementById("UCSYS121S");
	var grid_length = grid.GetRowCount();
	
	for(var i=0;i<grid_length;i++)
	{
//		var team_cd = DataSet.getParam("UCSYS121S", DataSet.getCurPage("UCSYS121S"), i, "team_cd");
		var team_cd = grid.GetCellValue("team_cd", i);

		if(document.all("org_cd1").value == team_cd)
		{
			alert("이미 추가된 부서입니다.");
			return;
		}
	}
	
	if(!confirm("추가 하시겠습니까?"))
		return;
	
	var trans = new Trans();
	trans.setSvc(INSERT_NOTICE_ID2);
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
	trans.setSvc(DELETE_NOTICE_ID+","+DELETE_NOTICE_ID2);
	trans.open("f","","/common.do");
}

/********************
* 열람대상자 삭제
********************/
function targetDel()
{
	var obj	= document.UCSYS121S;
	var team_cd			= "";
	var insp_obj_seq	= "";
	
	for(var i=0; i<obj.GetRowCount(); i++)
	{
		if(obj.GetCellValue("selected", i) == "1")	//체크되었다면..
		{
			//선택된 사용자 id
			if(team_cd)
				team_cd	+=	""+ obj.GetCellValue("team_cd", i);
			else
				team_cd	+=	""+ obj.GetCellValue("team_cd", i);
				
			if(insp_obj_seq)
				insp_obj_seq	+=	""+ obj.GetCellValue("insp_obj_seq", i);
			else
				insp_obj_seq	+=	""+ obj.GetCellValue("insp_obj_seq", i);
		}
	}

	if(!team_cd)
	{
		MessageBox("SYSSelectRow", "E", "");
		return;
	}
	
	var params = "&team_cd="+team_cd+"&insp_obj_seq="+insp_obj_seq;
	
	if(!MessageBox("SYSUserExempt", "C", ""))
		return;
	
	var trans = new Trans();
	trans.setSvc(DELETE_NOTICE_ID2);
	trans.setUserParams(params);
	trans.open("f", "","/common.do");
}


/********************
//엔터키 조회
********************/
function checkEnterKey()
{
	if(isEnterKey())
	{
		team_ntce_query();
	}
}

/********************
* 파일명 받는 이벤트
* iUpload(upload.jsp)로부터 호출된다.
********************/
function setFileName(filenm) 
{
    f.atch_file_nm.value = filenm;
    ntce_save();
}

/********************
* 첨부파일삭제
********************/
function delFile(obj)
{
	if (!(confirm("파일을 삭제하시겠습니까?"))) 
	{
			return;	
	}
	
	removeFile("UPLOAD_PATH", f.atch_file_nm.value);
	
	var tran=new Trans();
	tran.setSvc("UCSYS120_1U");
	tran.open("f","f","/common.do");
}


/********************
//글내용에서 첨부 파일 클릭시 
********************/
function openFile()
{
	location.href("/jsp/common/downFile.jsp?filename="+f.atch_file_nm.value);
}


/********************
// callback
********************/
function callback(sServiceID)
{
	var sServiceID = sServiceID.split(",");
	
	switch(sServiceID[0])
	{
		case SELECT_NOTICE_ID:
			break;

		case INSERT_NOTICE_ID:

			if (DataSet.getParam(INSERT_NOTICE_ID, 1, 0, "SUCCESS_COUNT") > 0)
			{
				MessageBox("InfSuccess", "I", "");

				if(iUpload.fUpload._UPLOAD_FILE.value !="")
					iUpload.location.replace("/jsp/common/upload.jsp?file_path=UPLOAD_PATH");

				team_ntce_query();
			}
			else
				alert("등록 실패");

			break;
		case "UCSYS120_1U":
			if (DataSet.getParam("UCSYS120_1U", 1, 0, "SUCCESS_COUNT") > 0)
			{
				document.all("file_down").style.display ="none";
				document.all("file_up").style.display ="";
			
				iUpload.location.reload();
				team_ntce_query();
			}	
			break;
		case UPDATE_NOTICE_ID:
			if (DataSet.getParam(UPDATE_NOTICE_ID, 1, 0, "SUCCESS_COUNT") > 0)
			{
				
				alert("수정되었습니다");
				if(iUpload.fUpload._UPLOAD_FILE.value !="")
					iUpload.location.replace("/jsp/common/upload.jsp?file_path=UPLOAD_PATH");
				team_ntce_query();
			}	
			break;
		case DELETE_NOTICE_ID:
			if (DataSet.getParam(DELETE_NOTICE_ID, 1, 0, "SUCCESS_COUNT") > 0)
			{
				
				alert("삭제되었습니다");
				team_ntce_query();
			}	
			break;
		case INSERT_NOTICE_ID2:
			if (DataSet.getParam(INSERT_NOTICE_ID2, 1, 0, "SUCCESS_COUNT") > 0)
			{
				alert("추가 되었습니다");
				document.all("up_org_cd").value="";
				document.all("org_cd1").value="";
				team_query();
			}	
			break;
		case SELECT_NOTICE_ID2:
			break;
		case DELETE_NOTICE_ID2:
			if (DataSet.getParam(DELETE_NOTICE_ID2, 1, 0, "SUCCESS_COUNT") > 0)
			{
				alert("제외 되었습니다");
				team_query();
			}	
			break;
		default:
			break;
	}
}


/********************
* 기존 첨부파일삭제 이벤트
********************/
function fileDel()
{
	var file_nm = DataSet.getParam(SELECT_NOTICE_ID, DataSet.getCurPage(SELECT_NOTICE_ID), g_rowIdx, "atch_file_nm");
	
	if(!file_nm)
		return;
		
	var trans = new Trans();
	trans.setPageRow("9999");
	trans.setSvc(SELECT_NOTICE_ID);
	trans.setForwardId("commonjsp","/jsp/common/removeFile.jsp?file_name="+ file_nm +"&file_path=UPLOAD_PATH");
	//tran.setCallBack("callbackSave");
	trans.open("f","f","/common.do");
}
