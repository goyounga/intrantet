var SELECT_ID		= "UCSYS100S";				//주간보고 조회
var DETAIL_ID		= "UCSYS101S,UCSYS102S";	//주간보고 상세조회
var UPDATE_APP_ID	= "UCSYS102U,UCSYS103U";	//주간보고 결재저장
var UPDATE_ID		= "UCSYS101U";				//주간보고 답변저장

var g_Flag;		//상태플러그
var gid;
var objArr = new Array();
var popupGubun = "";


/********************
* 초기화
********************/
function init()
{
	objArr = new Array(f.subject, f.start_dt, f.end_dt, f.weekly_content, f.next_weekly_content, f.issue ,f.response);

	setMode("INIT");

	//해당페이지가 팀장,파트장,관리자만 쓴다는 가정하에 파트장은 본인결재대상만조회
	if(f.gradecd.value == "06") //파트장
	{
		fQuery.subGubun.disabled = true;
	}
	else
	{
		fQuery.subGubun.disabled = false;
	}


}

/********************
* 조회
********************/
function queryList()
{
	if (getValidation(fQuery, true) == false) return;

	if (checkTermDate(fQuery.date_from, fQuery.date_to, true, true) == false) return;

	if(fQuery.subGubun.value == "01"){	//본인 결재대상
		//fQuery.subQuery.value = " AND nowsignid = '"+f.userid.value+"'";
		fQuery.subQuery.value = f.userid.value;
	}else{	//전체
		fQuery.subQuery.value = "";
	}
	
	//예전 조직구도라서 조직레벨2로 처리되어있음, 추후에 코드랑 업무를 재정의하여 분류하여야 함	2011.12.26 PJK
	if(fQuery.dept_cd.value == "05")			//SYS012:05:대표이사
	{
		fQuery.subQuery2.value = "";
	}
	else if(fQuery.dept_cd.value == "02")		//02:연구개발팀
	{
		fQuery.subQuery2.value = "'02','07'";		//02:연구개발팀
	}	
	else if(fQuery.dept_cd.value == "01")		//01:고객가치창조팀 + 06:고객가치구현팀 + 04:경영관리팀
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
//저장버튼
/*****************/
function save()
{
	var tran = new Trans();
	tran.setUserParams("id="+gid);
	tran.setSvc(UPDATE_ID);
	tran.open("f","f","/common.do");
}

/*****************/
//결재저장버튼
/*****************/
function saveApp()
{
	var batchData	= new Array();
	var index		= 0;
	var sParam		= "";

	var obj = document.all["UCSYS100S"];

	for(var i = 0 ; i < obj.GetRowCount() ; i++){

		if(obj.GetCellValue("approval", i) == "1" || obj.GetCellValue("back", i) == "1"){

			batchData[index] = "&sign_tp_cd=02";	//02는 주간업무보고 코드임.
			batchData[index] += "&id="+obj.GetCellValue("id",i);
			batchData[index] += "&userid="+f.userid.value;

			if(obj.GetCellValue("approval", i) == "1"){		//결재자 승인

				if(obj.GetCellValue("statcd",i) == "01"){	//현재 결재진행상태가 '01'(신청 및 1차결재대기중) 상태라면...
					if(parseNumeric(obj.GetCellValue("statcd",i)) < parseNumeric(obj.GetCellValue("sign_stg_cd",i))){	//현재 결재 진행상태가 최종결재 상태보다 작다면(전단계라면)...
						batchData[index] += "&statcd=02";
					}else{
						batchData[index] += "&statcd=04"
					}

					batchData[index] += "&sign_dt1="+f.today.value;
					batchData[index] += "&sign_f_cd1=Y";

				}else if(obj.GetCellValue("statcd",i) == "02"){	//현재 결재진행상태가 '02'(2차결재대기중) 상태라면...

					if(parseNumeric(obj.GetCellValue("statcd",i)) < parseNumeric(obj.GetCellValue("sign_stg_cd",i))){	//현재 결재 진행상태가 최종결재 상태보다 작다면(전단계라면)...
						batchData[index] += "&statcd=03";
					}else{
						batchData[index] += "&statcd=04"
					}

					batchData[index] += "&sign_dt2="+f.today.value;
					batchData[index] += "&sign_f_cd2=Y";

				}else if(obj.GetCellValue("statcd",i) == "03"){	//현재 결재진행상태가 '03'(3차결재대기중) 상태라면...

					batchData[index] += "&statcd=04"
					batchData[index] += "&sign_dt3="+f.today.value;
					batchData[index] += "&sign_f_cd3=Y";
				}

			}else{	//결재자반려
				batchData[index] += "&statcd=05";	//결재자 반려

				if(obj.GetCellValue("statcd",i) == "01"){	//현재 결재진행상태가 '01'(신청 및 1차결재대기중) 상태라면...
					batchData[index] += "&sign_dt1="+f.today.value;
					batchData[index] += "&sign_f_cd1=Y";
				}else if(obj.GetCellValue("statcd",i) == "02"){	//현재 결재진행상태가 '02'(2차결재대기중) 상태라면...
					batchData[index] += "&sign_dt2="+f.today.value;
					batchData[index] += "&sign_f_cd2=Y";
				}else if(obj.GetCellValue("statcd",i) == "03"){	//현재 결재진행상태가 '03'(3차결재대기중) 상태라면...
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
* 콜백
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
//상세정보
//그리드 onclick 이벤트 함수
/*****************/
function showDetailO_obj(id, strColumnKey, nRow)
{
	switch(id)
	{
		//리스트 클릭시
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
* 모드변경
********************/
function setMode(sType)
{
	g_Flag = sType;

	switch(sType)
	{
		case "INIT":	//초기화
			f.btnSave.disabled = true;
			clearInput();	//입력값 초기화
			setInput(true);	//입력값 활성화 or 비활성화
			setDisabledObj(objArr, true);	//입력값 활성화 or 비활성화
			break;

		case "U":		//수정
			f.btnSave.disabled = false;
			f.response.readOnly = false;
			break;

		default:
			break;
	}
}

/**
 *	사용자 조직도 팝업
 **/
function openUserOrg(gb)
{
	popupGubun = gb;

	window.open("/jsp/common/comUserOrg.jsp" ,"UserOrg", "width=800,height=580");
}

//사용자정보 셋팅
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
 * 작성자 onBlur
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
* 입력정보 초기화
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
* 월요일~일요일 입력정보 활성화 or 비활성화
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
 * 주간보고 상세화면 열기
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