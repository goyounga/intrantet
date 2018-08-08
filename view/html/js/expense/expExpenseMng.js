var SELECT_SERVICE_01 	= "UCEXP020S";
var SELECT_SERVICE_02 	= "UCEXP021S";
var SAVE_SERVICE		= "UCEXP020U,UCEXP021U";
var UPDATE_SERVICE		= "UCEXP023U";

/**
*	화면 로딩
* author  lee,chang-uk
* since   2009/06/18
*/
function on_Load()
{
	//해당페이지가 팀장,파트장,관리자만 쓴다는 가정하에 파트장은 본인결재대상만조회
	if(fQuery.gradecd.value == "06") //파트장
	{
		fQuery.q_sign_obj.value = "01"; 
		fQuery.q_sign_obj.disabled = true;
	}
	else
	{
		fQuery.q_sign_obj.disabled = false;
	}

	var g_Obj = document.all(SELECT_SERVICE_01);
	var g_Obj2 = document.all(SELECT_SERVICE_02);

	// 콤보 박스
	g_Obj.SetColButtonDisplayStyle('pmt_dt','always');

	// 포멧 주기
	g_Obj.SetNumberFormat('exps_sum','###,###');
	g_Obj.SetNumberFormat('pmt_amt','###,###');
	g_Obj.SetNumberFormat('upmt_amt','###,###');

	g_Obj2.SetNumberFormat('expt_amt','###,###');

	g_Obj.SetColFix('exps_sum');

	//initPeriod();
	on_Search();
}

/**
* 조회 기간 초기화
* author  lee,chang-uk
* since   2009/06/18
*/
function initPeriod()
{
	fQuery.q_date_from.value = getUserDate(-30, "-");
	fQuery.q_date_to.value = getUserDate(0, "-");
}

/**
* 초기화
* author  lee,chang-uk
* since   2009/06/18
*/
function on_Init()
{
	document.all(SELECT_SERVICE_01).RemoveAllData();
	document.all(SELECT_SERVICE_02).RemoveAllData();

	fQuery.reset();
	f0.reset();
	f1.reset();

	initPeriod();
}

/**
* 조회 버튼 클릭시
* author  lee,chang-uk
* since   2009/06/18
*/
function on_Search()
{
	if( getValidation(fQuery, true) == false ) return false;

	if( fQuery.q_sign_obj.value == "01" )
	{
		fQuery.q_sign_id.value 	= fQuery.user_id.value;
		fQuery.q_alnc_rtn.value = "0";
		fQuery.q_chk.value 		= "";
	}
	else
	{
		fQuery.q_sign_id.value = "";
		fQuery.q_alnc_rtn.value = "";
		fQuery.q_chk.value 		= "0";
	}

	var trans = new Trans();
	trans.setPageRow(-1);
	trans.setSvc(SELECT_SERVICE_01);
	trans.setDefClick(true);
	trans.setWiseGrid("1");
	trans.setForwardId("wgdsl","");
	trans.open("fQuery","f","/wisegrid.do");
}

/**
* 지출 내역 조회
* author  lee,chang-uk
* since   2009/06/18
*/
function on_DetailSearch()
{
	f1.exps_seq.value = f0.exps_seq.value;

	var trans = new Trans();
		trans.setPageRow(-1);
		trans.setSvc(SELECT_SERVICE_02);
		trans.setWiseGrid("1");
		trans.setForwardId("wgdsl","");
		trans.open("f1","f1","/wisegrid.do");
}

/**
* 경비 신청 내역 업데이트
* author  lee,chang-uk
* since   2009/06/18
*/
function on_Save()
{

	var params	= "";
	var s_chkInfo = "";
	var i_chkCnt = 0;

	var g_Obj = document.all(SELECT_SERVICE_01);

	if( g_Obj.GetRowCount() <= 0 )
	{
		alert("조회된 데이터가 존재하지 않습니다.");
		return;
	}

	for( var i = 0; i < g_Obj.GetRowCount(); i++ )
	{
		if( g_Obj.GetCellValue("alnc", i) == 1 || g_Obj.GetCellValue("rtn", i) == 1 )
		{
			if( g_Obj.GetCellValue("alnc", i) == 1 && g_Obj.GetCellValue("rtn", i) == 1 )
			{
				alert("[승인] 혹은 [반려] 하나만 선택하세요.");
				return;
			}

			if( Number(g_Obj.GetCellHiddenValue("sign_prgs_stts_cd", i)) > 3 )
			{
				alert("이미 [승인] 및 [취소] 상태인 데이터가 포함합니다. 결재할 수 없습니다. ");
				return;
			}

			if( g_Obj.GetCellValue("rtn", i) == 1 && g_Obj.GetCellValue("rtn_f_cd", i) == "Y" )
			{
				alert("이미 [반려] 상태인 데이터가 포함합니다. 결재할 수 없습니다. ");
				return;
			}

			if( g_Obj.GetCellValue("alnc", i) == 1 )
			{
				if( Number(g_Obj.GetCellValue("upmt_amt", i)) == 0 || g_Obj.GetCellValue("upmt_amt", i) == "" )
				{
					alert("미지급액은 필수 입력입니다.");
					return;
				}
			}

			params	+= "&pmt_dt="	+ g_Obj.GetCellValue("pmt_dt", i) ;
			params	+= "&pmt_amt="	+ g_Obj.GetCellValue("pmt_amt", i);
			params	+= "&upmt_amt="	+ g_Obj.GetCellValue("upmt_amt", i);
			params	+= "&exps_seq="	+ g_Obj.GetCellValue("exps_seq", i);

			if( g_Obj.GetCellValue("alnc", i) == 1 )
			{
				if( Number(g_Obj.GetCellValue("exps_sum", i)) <  Number(g_Obj.GetCellValue("upmt_amt", i)) )
				{
					s_chkInfo += "[" + (i + 1) + "]라인 - " + getFormatData(g_Obj.GetCellValue("rg_dt", i), "DATE") + " " + g_Obj.GetCellValue("rg_nm", i);
					s_chkInfo += " 비용합계 : " + getFormatData(g_Obj.GetCellValue("exps_sum", i), "MONEY");
					s_chkInfo += "원 < 미지급액 : " + getFormatData(g_Obj.GetCellValue("upmt_amt", i), "MONEY") + "원\n";
				}

				params	+= "&alnc_rtn=A";
			}
			else if( g_Obj.GetCellValue("rtn", i) == 1 )
			{
				params	+= "&alnc_rtn=R";
			}
			else
			{
				params	+= "&alnc_rtn=";
			}

			i_chkCnt++;
		}

	}

	if( i_chkCnt <= 0 )
	{
		alert("선택된 데이터가 존재하지 않습니다.");
		return;
	}

	if( s_chkInfo != "" )
	{
		if( !confirm(s_chkInfo + "\n\n위와 같이 상이한 데이터가 존재합니다. 결재하시겠습니까?"))
		{
			return;
		}
	}

	var trans = new Trans();
	trans.setSvc(SAVE_SERVICE);
	trans.setUserParams(params);
	trans.open("f","f","/common.do");
}

/**
* 버튼 컨트롤
* author  lee,chang-uk
* since   2009/06/18
*/
function fn_BtnControl()
{
	if( fQuery.q_sign_obj.value == "01" )
	{
		document.all("btnSave").disabled = false;
		document.all("btnApply").disabled = false;

		document.all("btnPmtApply").disabled = true;
		document.all("btnPmtSave").disabled = true;

		f.pmt_date.disabled = true;
	}
	else
	{
		document.all("btnSave").disabled = true;
		document.all("btnApply").disabled = true;

		document.all("btnPmtApply").disabled = false;
		document.all("btnPmtSave").disabled = false;

		f.pmt_date.disabled = false;
	}
}

/**
* 저장후 콜백
* author  lee,chang-uk
* since   2009/06/18
*/
function callback(serviceId)
{
	if( serviceId == SELECT_SERVICE_01 )
	{
		if( DataSet.getTotalCount(serviceId) <= 0 )
		{
			f.reset();
			f0.reset();
			f1.reset();

			document.all(SELECT_SERVICE_01).RemoveAllData();
			document.all(SELECT_SERVICE_02).RemoveAllData();
		}
		else
		{
			setMainSummary();
		}

		fn_BtnControl();
	}
	else if( serviceId == SELECT_SERVICE_02 )
	{
		if( DataSet.getTotalCount(serviceId) <= 0 )
		{
			f1.reset();

			document.all(SELECT_SERVICE_02).RemoveAllData();
		}
		else
		{
			setDetailSummary();
		}
	}
	else if( serviceId == SAVE_SERVICE )
	{
		if( DataSet.getParam("UCEXP020U", 1, 0, "SUCCESS_COUNT") > 0 )
		{
			on_Search();
		}
	}
	else if( serviceId == UPDATE_SERVICE )
	{
		if( DataSet.getParam(UPDATE_SERVICE, 1, 0, "SUCCESS_COUNT") > 0 )
		{
			on_Search();
		}
	}
}

/**
* 그리드 클릭시 상세 정보를 보여준다.
* author  lee,chang-uk
* since   2009/06/18
*/
function showDetailO_obj(id, strColumnKey, nRow)
{
	var g_Obj = document.all(SELECT_SERVICE_01);

	showDetailByWise(id, g_Obj.GetActiveRowIndex(), f0);

	on_DetailSearch();

}

/**
* 사용자 조직도 팝업
* author  lee,chang-uk
* since   2009/06/18
*/
function openUserOrg()
{
	//Opener 의 정보를 설정해줌 (form 객체를 넘긴다)
	//setOpener(fQuery);

	//openPopup("/jsp/common/comUserOrg.jsp", "UserOrg", 800, 545);

	var cwp = getPopupProperties("", "", "800", "580");

	window.open("/jsp/common/comUserOrg.jsp" ,"UserOrg", cwp);
}

/**
* 조직도에서 사용자 정보 가져오기
* author  lee,chang-uk
* since   2009/06/18
*/
function setOrgUserInfo(user_id, user_name, user_dept)
{
	fQuery.q_user_id.value = user_id;
	fQuery.q_user_nm.value = user_name;
}

/**
* 경비 신청 내역 - 미지급 일괄 적용
* author  lee,chang-uk
* since   2009/06/18
*/
function on_LumpApply()
{
	var i_chkCnt = 0;
	var g_Obj = document.all(SELECT_SERVICE_01);

	if( g_Obj.GetRowCount() <= 0 )
	{
		alert("조회된 데이터가 존재하지 않습니다.");
		return;
	}

	for( var i = 0; i < g_Obj.GetRowCount(); i++ )
	{
		if( g_Obj.GetCellValue("alnc", i) == 1 )
		{
			g_Obj.SetCellValue("upmt_amt", i, g_Obj.GetCellValue("exps_sum", i));

			i_chkCnt++;
		}
	}

	if( i_chkCnt <= 0 )
	{
		alert("체크한 데이터가 존재하지 않습니다.");
		return;
	}
}

/**
* 경비 신청 내역 - 지급일자, 지급액
* author  lee,chang-uk
* since   2009/06/18
*/
function on_PmtLumpApply()
{
	var i_chkCnt = 0;
	var g_Obj = document.all(SELECT_SERVICE_01);

	if( g_Obj.GetRowCount() <= 0 )
	{
		alert("조회된 데이터가 존재하지 않습니다.");
		return;
	}

	for( var i = 0; i < g_Obj.GetRowCount(); i++ )
	{
		if( g_Obj.GetCellValue("chk", i) == 1 )
		{
			g_Obj.SetCellValue("pmt_dt", i, removeMask(f.pmt_date.value));
			g_Obj.SetCellValue("pmt_amt", i, g_Obj.GetCellValue("exps_sum", i));
			g_Obj.SetCellValue("upmt_amt", i, 0);

			i_chkCnt++;
		}
	}

	if( i_chkCnt <= 0 )
	{
		alert("체크한 데이터가 존재하지 않습니다.");
		return;
	}
}

/**
* 경비 신청 내역 - 지급정보 업데이트
* author  lee,chang-uk
* since   2009/06/18
*/
function on_PmtSave()
{
	var params		= "";
	var i_chkCnt 	= 0;
	var i_chkStts 	= 0;
	var g_Obj = document.all(SELECT_SERVICE_01);

	if( g_Obj.GetRowCount() <= 0 )
	{
		alert("조회된 데이터가 존재하지 않습니다.");
		return;
	}

	for( var i = 0; i < g_Obj.GetRowCount(); i++ )
	{
		if( g_Obj.GetCellValue("chk", i) == 1 )
		{
			if( Number(g_Obj.GetCellHiddenValue("sign_prgs_stts_cd", i)) != 4 ) i_chkStts++;

			if( g_Obj.GetCellValue("rtn_f_cd", i) == "Y" ) i_chkStts++;

			if( g_Obj.GetCellValue("pmt_dt", i) == "" )
			{
				alert("지급일자은 필수 입력입니다.");
				return;
			}

			if( Number(g_Obj.GetCellValue("pmt_amt", i)) == 0 || g_Obj.GetCellValue("pmt_amt", i) == "")
			{
				alert("지급액은 필수 입력입니다.");
				return;
			}

			params	+= "&pmt_dt="	+ g_Obj.GetCellValue("pmt_dt", i) ;
			params	+= "&pmt_amt="	+ g_Obj.GetCellValue("pmt_amt", i);
			params	+= "&upmt_amt="	+ g_Obj.GetCellValue("upmt_amt", i);
			params	+= "&exps_seq="	+ g_Obj.GetCellValue("exps_seq", i);

			i_chkCnt++;
		}
	}

	if( i_chkCnt <= 0 )
	{
		alert("체크한 데이터가 존재하지 않습니다.");
		return;
	}

	if(i_chkStts > 0 )
	{
		if( !confirm("미승인건 혹은 반려건이 포함되어 있습니다. 지급정보를 저장하시겠습니까?") )
		{
			return;
		}
	}

	var trans = new Trans();
	trans.setSvc(UPDATE_SERVICE);
	trans.setUserParams(params);
	trans.open("f","f","/common.do");
}

/**
* 경비 신청 내역 합계
* author  kim zeong kyun
* since   2009/07/27
*/
function setMainSummary()
{
	var gridObj = document.all(SELECT_SERVICE_01);

	if(gridObj.GetRowCount() == 0)
	{
		return;
	}

	gridObj.ClearSummaryBar();

	summaryWiseGrid(gridObj, "SUMMARY1", "summaryall", "합계", "sum", "exps_sum,pmt_amt,upmt_amt");

	gridObj.MoveRow(0);
}

/**
* 지출 상세 정보 합계
* author  kim zeong kyun
* since   2009/07/27
*/
function setDetailSummary()
{
	var gridObj = document.all(SELECT_SERVICE_02);

	if(gridObj.GetRowCount() == 0)
	{
		return;
	}

	gridObj.ClearSummaryBar();

	summaryWiseGrid(gridObj, "SUMMARY1", "summaryall", "합계", "sum", "expt_amt");

	gridObj.MoveRow(0);
}

function Excel()
{
	openPopup("expExpenseExcel.jsp", "", "expenseExcel", "", "", 400, 50, "");
}