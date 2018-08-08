var gsXaFlag = "";
var gsBXaFlag = "";
var gsTabFlag = 0;

var SELECT_ID 			= "UCINF126S";
var INSERT_ID 			= "UCINF126I";
var UPDATE_ID 			= "UCINF126U";
var CHG_UPDATE_ID       = "UCINF126U_2"
var DELETE_ID 			= "UCINF126D";
var CONTENT_SELECT_ID	= "UCINF126S_2";

//질문을 INSERT 할 경우 시퀀스를 가져와서 파일 테이블에 같이 INSERT 해야하기 때문에 두 트랜잭션으로 처리한다. 
//질문을 UPDATE 할 경우에는 시퀀스를 미리 알고 있기 때문에 한 트랜잭션으로 처리가 가능하다.
var ALL_INSERT_ID 	= "UCINF126I,UCINF127S";		//글 추가 + 현재 질문 시퀀스 조회
var ALL_INSERT_ID2	= "UCCOM030I";					//파일 추가
var ALL_UPDATE_ID	= "UCINF126U,UCCOM030I";			//글 수정 + 파일 추가
var ALL_DELETE_ID 	= "UCINF126D,UCCOM030D";			//글 삭제+ 파일 삭제

var FILE_SELECT_ID 	= "UCCOM030S";		//파일 조회
var FILE_DELETE_ID 	= "UCCOM030D";		//파일만 삭제
var FILE_REMOVE_ID 	= "removefile";

var OTHERS_SELECT_ID 	= "UCINF126U_2,UCINF126S_2,UCCOM030S";

var gridObj;

//Upload File
var UPLOAD_PATH 		= "UPLOAD_PATH";
var UPLOAD_FOLDER_NAME 	= "notice";

/**
 * Load 시 최초 실행
 */
function init()
{
	initAll();
	
	queryList();
}

/**
 * 전체 초기화
 */
function initAll()
{
	gridObj = getGridObj(SELECT_ID);
	gridObj.setParam("rg_dt_format", "DATE");
	gridObj.setParam("rg_tm_format", "TIME");
	gridObj.setParam("mdf_dt_format", "DATE");
	gridObj.setParam("mdf_tm_format", "TIME");
	
	initForm();

	gsXaFlag = "I";
	gsBXaFlag = gsXaFlag;
	setMode(gsXaFlag);
}

function getGridObj(id)
{
	return document.getElementById(id);
}

/**
 * 폼 초기화
 */
function initForm()
{
	f.reset();
	
//	initUploadFile();
	
	document.getElementById("rg_info").innerText = "";
	document.getElementById("mdf_info").innerText = "";
}

/**
 * 조회
 */
function queryList()
{
	if (fQuery.q_datefrom.value != "" && fQuery.q_dateto.value == "")
	{
		fQuery.q_dateto.value = fQuery.q_datefrom.value;
	}
	else if(fQuery.q_datefrom.value == "" && fQuery.q_dateto.value != "")
	{
		fQuery.q_datefrom.value = fQuery.q_dateto.value;
	}
	
	var params = "";
	if(fQuery.q_datefrom.value != "" && fQuery.q_dateto.value != "")
	{
		params = "q_date= AND A.rg_dt BETWEEN '" + removeMask(fQuery.q_datefrom.value) + "' AND '" + removeMask(fQuery.q_dateto.value) + "'";
	}

	if (getValidation(fQuery, true) == false) return;
	if (checkTermDate(fQuery.q_datefrom, fQuery.q_dateto, true, true) == false) return;

	comSearch(fQuery);
	
	var tran = new Trans();
	tran.setSvc(SELECT_ID);
	tran.setPageRow(50);
	tran.setWiseGrid("1");
	tran.setForwardId("wgdsl","");
	tran.setDefClick(true);
	tran.setUserParams(params);
	tran.open("fQuery", "f", "/wisegrid.do");
}

/**
 * 콤보박스와 텍스트박스 두가지 모두 사용하여 검색하는 경우 사용한다.
 * f : 폼
 */
function comSearch(f)
{
	//초기화
	for(var i = 0 ; i < f.searchtype.length ; i++)
	{
		eval(f.name + "." + f.searchtype.options[i].value + ".value = ''");
	}

	//실제 쿼리에 넣을 검색어를 hidden에 할당한다.
	if(f.searchstr.value != "")
	{
		eval(f.name + "." + f.searchtype.value + ".value = " + f.name + ".searchstr.value");
	}
}

/**
 * 리스트 클릭 시
 * id : Grid ID
 * strColumnKey : 현재 선택된 컬럼명
 * nRow : Row 번호
 */
function showDetailO_obj(id, strColumnKey, nRow)
{
	if(id == SELECT_ID)
	{		
		showDetailByWise(SELECT_ID, nRow, f);

		var rg_id = gridObj.GetCellValue("rg_id", nRow);
		var rg_nm = gridObj.GetCellValue("rg_nm", nRow);
		var rg_dt = gridObj.GetCellValue("rg_dt", nRow);
		var rg_tm = gridObj.GetCellValue("rg_tm", nRow);
		
		var mdf_id = gridObj.GetCellValue("mdf_id", nRow);
		var mdf_nm = gridObj.GetCellValue("mdf_nm", nRow);
		var mdf_dt = gridObj.GetCellValue("mdf_dt", nRow);
		var mdf_tm = gridObj.GetCellValue("mdf_tm", nRow);
		
		document.getElementById("rg_info").innerText = rg_nm + " / " + rg_dt + " " + rg_tm;
		document.getElementById("mdf_info").innerText = mdf_nm + " / " + mdf_dt + " " + mdf_tm;
		
		CURINDEX = nRow;
		gsXaFlag = "U";
		gsBXaFlag = gsXaFlag;
		setMode(gsXaFlag);
		
		f.up_seq.value = gridObj.GetCellValue("notice_seq", nRow);		//파일 업로드, 삭제 시 사용
		
		if(rg_id != f.userid.value)
		{
			f.qry_cnt.value = Number(gridObj.GetCellValue("qry_cnt", nRow)) + 1;
			gridObj.SetCellValue("qry_cnt", nRow, f.qry_cnt.value);
		}
		//그외 쿼리
		queryOthers();
	}
}

/**
 * 신규 버튼 클릭 시
 */
function add()
{
	if (gsXaFlag == "U")
	{
		gsBXaFlag = gsXaFlag;
	}

	initForm();

	gsXaFlag = "A";
	setMode(gsXaFlag);
}

/**
 * 저장 버튼 클릭 시 파일 업로드 체크
 */
function checkSave()
{
	if(checkAuth("U") == false) return false;
	
	//파일업로드 시
	if (iUpload.existsUploadFile() == true)
	{
		if(checkSaveData() == false) return;

		iUpload.upload(UPLOAD_PATH, UPLOAD_FOLDER_NAME);
	}
	else
	{
		save();
	}
}

/**
 * 저장할 데이터를 체크한다.
 */
function checkSaveData()
{
	if (getValidation(f, true) == false) return false;
	if (MessageBox("SavConfirm", "C", "") == false) return false;
}

/**
 * 저장 쿼리 실행
 */
function save()
{
	if(iUpload.existsUploadFile() == false && checkSaveData() == false) return;

	var svcID;
	var params;

	if (gsXaFlag == "A")
	{
		svcID = ALL_INSERT_ID;
	}
	else
	{
		if (iUpload.existsUploadFile() == true)
		{
			svcID = ALL_UPDATE_ID;
		}
		else
		{
			svcID = UPDATE_ID;
		}
	}
	
	var tran = new Trans();
	tran.setSvc(svcID);
	//tran.setUserParams(params);
	tran.open("f", "f", "/common.do");
}

/**
 * 삭제 쿼리 실행
 */
function del()
{
	if(checkAuth("D") == false) return false;
	if (MessageBox("DelConfirm", "C", "") == false) return;

	var tran = new Trans();
	tran.setSvc(ALL_DELETE_ID);
	tran.open("f", "f", "/common.do");
}

/**
 * 취소 상태
 */
function cancel()
{
	if (gsBXaFlag == "U")
	{
		setMode(gsBXaFlag);
		showDetailO_obj(SELECT_ID, "", CURINDEX);	//먼저 선택되었던 Row 선택
	}
	else
	{
		initForm();

		gsXaFlag = "I";
		setMode(gsXaFlag);
	}
}

function checkAuth(mode)
{
	var msgId;
	
	if(mode == "U")
	{
		msgId = "INFAuthFailMod";
	}
	else if(mode == "D")
	{
		msgId = "INFAuthFailDel";
	}

	if(gsXaFlag == "U" && f.userid.value != f.rg_id.value)
	{
		if(typeof msgId != "undefined")
		{
			MessageBox(msgId, "E", "");
			return false;
		}
	}
}
/**
 * 그외 조회
 */
function queryOthers()
{
	var tran = new Trans();
	tran.setSvc(OTHERS_SELECT_ID);
	tran.setPageRow(9999);
	tran.open("f", "f", "/common.do");
}

/**
 * 업로드 파일 조회
 */
function queryUploadFile()
{
	var tran = new Trans();
	tran.setSvc(FILE_SELECT_ID);
	tran.setPageRow(9999);
	tran.open("f", "f", "/common.do");
}

/**
 * Callback
 * svcID : tran open 시 setSvc에 설정해준 QueryID
 */
function callback(svcID)
{
	switch (svcID)
	{
		case SELECT_ID:

			initForm();
		
			gsXaFlag = "I";
			gsBXaFlag = gsXaFlag;
			setMode(gsXaFlag);
			
			setGridColor();
			
			break;
			
		case ALL_INSERT_ID2 :
			
			afterInsert();
			
			break;
			
		case ALL_INSERT_ID:

			if (iUpload.existsUploadFile() == true)
			{
				f.up_seq.value = DataSet.getParam("UCINF127S", 1, 0, "seq");
			
				insertUpFile();
			}
			else
			{
				f.up_seq.value = DataSet.getParam("UCINF127S", 1, 0, "seq");

				afterInsert();
			}
			break;

		case ALL_UPDATE_ID:
		case UPDATE_ID:

			if (DataSet.getParam(UPDATE_ID, 1, 0, "SUCCESS_COUNT") > 0)
			{
				setDataForWiseGrid("UPDATE");

				updateWiseGridRow(SELECT_ID, CURINDEX, f);

				setGridColor();
				
				initForm();
				
				gsXaFlag = "I";
				gsBXaFlag = gsXaFlag;
				setMode(gsXaFlag);
			}
			break;

		case ALL_DELETE_ID:

			if (DataSet.getParam(DELETE_ID, 1, 0, "SUCCESS_COUNT") > 0)
			{
				MessageBox("Success", "E", "");

				removeWiseGridRow(SELECT_ID, CURINDEX);

				initForm();

				gsBXaFlag = gsXaFlag;
				gsXaFlag = "I";
				setMode(gsXaFlag);
			}
			break;

		case OTHERS_SELECT_ID:

			showContent();

			showUploadFileList();
			
			break;

		case FILE_SELECT_ID:

			showUploadFileList();

			break;

		case FILE_DELETE_ID:

			if (DataSet.getParam("UCCOM030D", 1, 0, "SUCCESS_COUNT") > 0)
			{
				MessageBox("Success", "E", "");

				//실제 첨부파일을 삭제하지 않고 다시 첨부파일 리스트 조회
				queryUploadFile();
			}
			break;
	}
}

function afterInsert()
{
	if (DataSet.getParam(INSERT_ID, 1, 0, "SUCCESS_COUNT") > 0)
	{				
		var gRow;

		//그리드에 데이터가 없을경우 -1 있을 경우 0을 셋팅한다.
		if(DataSet.getTotalCount(SELECT_ID) == 0)
		{
			gRow = -1;
		}
		else
		{
			gRow = 0;
		}
		
		setDataForWiseGrid("INSERT");

		insertWiseGridRow(SELECT_ID, gRow, f);
		//mail 전송
//		sendMail();

		setGridColor();
		
		initForm();

		gsXaFlag = "I";
		gsBXaFlag = gsXaFlag;
		setMode(gsXaFlag);
		
	}
}

/**
 * 등록, 수정을 한 후 정보변경시 공통으로 할 수 없는 것은 따로 처리한다.
 * flag : INSERT 등록 UPDATE 수정
 */
function setDataForWiseGrid(flag)
{
	var curdt = getCurDay("-", "");
	var curtm = getCurDay(":", "T");
	
	//수정
	if(flag == "UPDATE")
	{
		f.notice_type_nm.value = f.notice_type.value;
		
		f.mdf_dt.value = curdt;
		f.mdf_tm.value = curtm;
		f.mdf_id.value = f.userid.value;
		f.mdf_nm.value = f.usernm.value;
	}
	//등록
	else if(flag == "INSERT")
	{
		f.notice_seq.value = f.up_seq.value;
		f.qry_cnt.value = 0;
		f.notice_type_nm.value = f.notice_type.value;
		
		f.rg_dt.value = curdt;
		f.rg_tm.value = curtm;
		f.rg_id.value = f.userid.value;
		f.rg_nm.value = f.usernm.value;

		f.mdf_dt.value = curdt;
		f.mdf_tm.value = curtm;
		f.mdf_id.value = f.userid.value;
		f.mdf_nm.value = f.usernm.value;
	}
}

/**
 * 모드에 따르는 버튼 형태
 * sType : I:등록, S:수정
 */
function setMode(sType)
{
	//Input
	var arrInput = new Array(f.notice_type, f.notice_sbjt, f.notice_cont, f.valid_strt_dt, f.valid_end_dt);

	var inputStatus = false;
	var modifyStatus = false;
	
	if (!f) f = document.forms[0];

	switch (sType)
	{
		case "I"://초기화
			inputStatus = true;
			modifyStatus = true;

			setButton(f.btnAdd, false);
			setButton(f.btnSave, true);
			setButton(f.btnDel, true);
			setButton(f.btnSendMail, true);
			
			break;

		case "A"://추가
			inputStatus = false;
			modifyStatus = true;

			setButton(f.btnAdd, true);
			setButton(f.btnSave, false);
			setButton(f.btnDel, true);
			setButton(f.btnSendMail, true);

			break;

		case "U"://수정
			inputStatus = false;
			modifyStatus = false;

			setButton(f.btnAdd, false);
			setButton(f.btnSave, false);
			setButton(f.btnDel, false);
			setButton(f.btnSendMail, false);

			break;

	}
	
	setDisabledObj(arrInput, inputStatus);			//Input Boxes Set Disabled
	
	//upload
	iconDisabled(["icoBig", "icoSmall", "icoUploadFiles", "icoShowFiles"], inputStatus);
	initUploadFile();
	uploadFileDisabled(modifyStatus);
	uploadFormSetDisabled(inputStatus);
}


/**
 *파일업로드 시 질문 순번을 조회 한 후 INSERT 하기 위해
 */
function insertUpFile()
{
	var tran = new Trans();
	tran.setSvc(ALL_INSERT_ID2);
	tran.open("f","f","/common.do");
}


/**
 * 내용 출력
 */
function showContent()
{
	var notice_cont = DataSet.getParam(CONTENT_SELECT_ID, 1, 0, "notice_cont");

	f.notice_cont.value = notice_cont;
}

function setButton(obj, val)
{
	try
	{
		obj.disabled = val;
	}
	catch(e)
	{
	}
}

/**
 *	사용자 조직도 팝업
 **/
var popupGubun = ""
function openUserOrg(gb)
{
	popupGubun = gb;

	window.open("/jsp/common/comUserOrg.jsp" ,"UserOrg", "width=800,height=545");
}

//사용자정보 셋팅
function setOrgUserInfo(user_id, user_name)
{
	if(popupGubun == "q_rg_id"){
		fQuery.q_rg_id.value = user_id;
		fQuery.q_rg_nm.value = user_name;
	}
}

/**
 * 작성자 onBlur
 */
function userid_onBlur(gb)
{
	if(gb == "q_rg_id"){
		fQuery.q_rg_id.value = "";
		fQuery.q_rg_nm.value = "";
	}
}

/**
 * 그리드 색 설정
 */
function setGridColor()
{
	for(var i = 0 ; i < gridObj.GetRowCount(); i ++)
	{
		//공지 일 경우 색깔 지정
		if(gridObj.GetCellValue("notice_type", i) == "02")
		{
			gridObj.SetCellFgColor("notice_sbjt", i, '255|90|0');
			gridObj.SetCellFontBold('notice_sbjt', i, 'true');
			gridObj.SetCellFgColor("notice_type_nm", i, '255|0|0');
			gridObj.SetCellFontBold('notice_type_nm', i, 'true');
		}
	}
}

function sendMail()
{
	if (confirm("해당 내용을 메일로 전송하시겠습니까?"))
	{
        var tran=new Trans();
        //tran.setSvc("test01");
//        DEBUG=true;
        tran.setSvc("SENDMAIL");
        tran.setSvcType("");
        tran.setForwardId("mailresult","");
        //	DEBUG=true;
        tran.setMyUserParams("mail_from","ibeigns@nexfron.com")
        tran.setMyUserParams("mail_to",top.gUserList)
//        tran.setMyUserParams("mail_to","hykim@nexfron.com,paye18@daum.net")
        tran.setMyUserParams("mail_subject",f.notice_sbjt.value)
        tran.setMyUserParams("mail_content",f.notice_cont.value)
/*
		if (iUpload.existsUploadFile())
		{
			var sFileName=f.new_file_nm.value;
			var aFileName=sFileName.split("");
			var sList="";
			for (var i = 0; i < aFileName.length; i++)
			{
				if (sList !="") sList +="";
				sList += f.file_path.value+"/"+UPLOAD_FOLDER_NAME+"/"+aFileName[i];
			}
	        tran.setMyUserParams("mail_file",sList);
		}*/
			
		var cnt = DataSet.getTotalCount(FILE_SELECT_ID);
		var sList="";
		for (var i = 0; i < cnt; i++)
		{
			var seq		= DataSet.getParam(FILE_SELECT_ID, 1, i, "file_seq");
			var filename = trim(DataSet.getParam(FILE_SELECT_ID, 1, i, "file_nm"));
			var newfilename = trim(DataSet.getParam(FILE_SELECT_ID, 1, i, "new_file_nm"));

			if (sList !="") sList +="";
			sList += f.file_path.value+"/"+UPLOAD_FOLDER_NAME+"/"+newfilename;
		}	

        tran.setMyUserParams("mail_file",sList);
		tran.setCallBack("callbackMail");
        tran.open("f","f","/mail.do");
	}
}

function callbackMail(sSvc)
{
	if (DataSet.getParam(sSvc, 1, 0 , "resultcd") == "0")
		alert("메일이 전송되었습니다.");
	else	
		alert("메일이  전송에 실패하였습니다. errCode["+DataSet.getParam(sSvc, 1, 0 , "resultcd")+"]");
}