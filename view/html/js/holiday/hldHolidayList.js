/**
 * PROJ : Nexfron Intranet
 * NAME : hldHolidayList.js
 * DESC : 휴가 신청/조회
 * Author : 박준규 과장
 * Copyright 2009 Nexfron All rights reserved
 * ============================================================================================
 * 								변		경		사		항
 * ============================================================================================
 * VERSION		DATE		AUTHOR		DESCRIPTION
 * ============================================================================================
 * 1.0		2012.03.20		박준규		최초작성
 */
var oGrid;									//휴가신청내역
var arrObj;									//폼객체배열
var G_HLDINFO = new Array();				// 내 휴가 정보
var SELECT_SERVICE_0101 = "UCHLD020S_1";	//휴가지급일수조회
var SELECT_SERVICE_02 	= "UCHLD021S";		//휴가신청내역 GRID
var SELECT_SERVICE_03 	= "UCHLD022S";		//내 휴가 정보,일수 조회
var INSERT_SERVICE_01	= "UCHLD021I";		//휴가등록
var INSERT_SERVICE_02	= "UCSYS044I";		//휴가결재등록
var INSERT_SERVICE_03	= "UCSMS002I";		//SMS발송 - 휴가결재등록
var DELETE_SERVICE_01	= "UCHLD021D";		//휴가삭제
var UPDATE_SERVICE_01	= "UCHLD021U";		//휴가수정
//var UPDATE_SERVICE_02	= "UCHLD022U";		//휴가결재수정 -사용안함
//var UPDATE_SERVICE_02	= "UCHLD023U";		//휴가결재취소 - 사용안함
//var DELETE_SERVICE_01	= "UCHLD022D";		//휴가결재삭제 - 사용안함
var SELECT_SERVICE_04 	= "UCHLD023S";		//내휴가정보 GRID

/**
 * init
 */
function init()
{
	oGrid = document.getElementById(SELECT_SERVICE_02);
	arrObj = new Array (  f1.bse_y		 , f1.hldy_knd_seq , f1.strt_dt , f1.end_dt
						, f1.cntc_tel_no , f1.hldy_plc     , f1.prj_seq , f1.hldy_rsn );
	setMode("I");
	initPeriod();
	searchHldyInfo();
}
/**
 * 조회 기간 초기화
 */
function initPeriod()
{
	fQuery.strt_q_date.value = fQuery.thisYear.value + "-01-01";
	fQuery.end_q_date.value  = getUserDate(0, "-");
}
/**
 * 휴가 정보 조회
 */
function searchHldyInfo()
{
	fQuery.q_bse_y.value = removeMask(fQuery.strt_q_date.value).substr(0,4);

	var trans = new Trans();
	trans.setPageRow(-1);
	trans.setSvc(SELECT_SERVICE_0101);
	//trans.setSvc(SELECT_SERVICE_04+","+SELECT_SERVICE_02+","+SELECT_SERVICE_0101);
	//trans.setWiseGrid("1,1,0");
	//trans.setForwardId("wgdsl","");
	trans.setCallBack("callbackSearchHldyInfo");
	trans.open("fQuery","fInfo","/common.do");
	//trans.open("fQuery","fInfo","/wisegrid.do");
}
/**
 * 휴가 정보 조회 콜백
 * svcid:서비스아이디
 */
function callbackSearchHldyInfo(svcid)
{
	if(DataSet.isError(svcid) == "true") return;

	//setSummaryStyle(document.getElementById(SELECT_SERVICE_04), document.getElementById(SELECT_SERVICE_04).GetRowCount()-1, "")

	// get 내 휴가 정보
	var dsHldInfo = DataSet.getParamArrHash(SELECT_SERVICE_0101, 1);

	var aCode 	= new Array();
	var aCodeNm = new Array();
	var aPmtDy 	= new Array();
	var aUseDy 	= new Array();
	var aRmnDy 	= new Array();

	if(dsHldInfo.length > 0)
	{
		for(var i=0; i<dsHldInfo.length; i++)
		{
			var hs = dsHldInfo[i];

			aCode.push(hs.get("bse_y"));
			aCodeNm.push(hs.get("bse_y_nm"));
			aPmtDy.push(hs.get("pmt_dy"));	//지급_일수
			aUseDy.push(hs.get("use_dy"));	//사용_일수
			aRmnDy.push(hs.get("rmn_dy"));	//남은_일수

			if(fQuery.q_bse_y.value == hs.get("bse_y"))
			{
				fInfo.pmt_dy.value = hs.get("pmt_dy");
				fInfo.use_dy.value = hs.get("use_dy");
				fInfo.rmn_dy.value = hs.get("rmn_dy");
			}
		}

		G_HLDINFO = new Array(aCode, aCodeNm, aPmtDy, aUseDy, aRmnDy);	// 휴가정보 전역변수 배열에 셋팅
		setOptions(fInfo.bse_y_nm, aCode, aCodeNm, false, false);		// 휴가 기준년도 cbx add option
		fInfo.bse_y_nm.value = fQuery.q_bse_y.value;					// 셋팅 후 기준년도 현재년도로

		searchHldy();
	}
	else
	{
		MessageBox("","I","해당년에 휴가 정보가 존재하지 않습니다. 먼저 휴가정보를 등록하세요.");
		setMode("I");
		return;
	}
}
/**
 * 휴가신청내역 조회
 */
function searchHldy()
{
	if( getValidation(fQuery, true) == false ) return false;
	if( !checkTermDate(fQuery.strt_q_date, fQuery.end_q_date, true, true, "")) return;

	var trans = new Trans();
	trans.setPageRow(-1);
	trans.setSvc(SELECT_SERVICE_02);
	trans.setDefClick(true);
	trans.setWiseGrid("1");
	trans.setForwardId("wgdsl","");
	trans.setCallBack("callbackSearchHldy");
	trans.open("fQuery","f","/wisegrid.do");
}
/**
 * 휴가신청내역 조회 콜백
 * svcid:서비스아이디
 */
function callbackSearchHldy(svcid)
{
	if(DataSet.isError(svcid) == "true") return;
	if( DataSet.getTotalCount(svcid) < 1 ) {setMode("I");}
}
/**
 * 등록
 */
function regHldy()
{
	setMode("A");
}
/**
 * 취소
 */
function canlHldy()
{
	var idx = oGrid.GetActiveRowIndex();
	if (idx == -1)
	{
		setMode(f,"I");
	}else{
		showDetailO_obj(SELECT_SERVICE_02, "hldy_knd_seq", idx);
	}
}
/**
 * 그리드 클릭시 상세 정보를 보여준다.
 * id           : 클릭한 그리드객체ID
 * strColumnKey : 클릭한 컬럼명
 * nRow         : 클릭한Row Index
 */
function showDetailO_obj(id, strColumnKey, nRow)
{
	showDetailByWise(id, nRow, f1);

	var s_sign_prgs_stts_cd = oGrid.GetCellHiddenValue("sign_prgs_stts_cd", oGrid.GetActiveRowIndex());
	if( s_sign_prgs_stts_cd != "06" )//06:임시저장
	{
		setMode("V");
	}else{
		setMode("U");
	}
}
/**
 * 화면모드 설정
 */
function setMode(sType)
{
	gsXaFlag = sType;

	switch(sType)
	{

		case "I" :	setButtonDisable(f1.btnReg		, false);
					setButtonDisable(f1.btnSave		, true );
					setButtonDisable(f1.btnDelete	, true );
					setButtonDisable(f1.btnCancel	, true );
					setButtonDisable(f1.btnRegSign	, true );
				//	setButtonDisable(f1.btnCanlSign	, true );
					setDisabledObj(arrObj, true);
					clear(f1);
					f1.hldy_seq.value = "";
					break;

		case "A" :	setButtonDisable(f1.btnReg		, true );
					setButtonDisable(f1.btnSave		, false);
					setButtonDisable(f1.btnDelete	, true );
					setButtonDisable(f1.btnCancel	, false);
					setButtonDisable(f1.btnRegSign	, false);
				//	setButtonDisable(f1.btnCanlSign	, true );
					setDisabledObj(arrObj			, false);
					clear(f1);	//f1.reset(); //reset을 사용할경우 hidden도 자동으로 된다.
					f1.hldy_seq.value = "";
					f1.bse_y.value = fInfo.bse_y.value;	// pjk차후 수정
					break;

		case "U" :	setButtonDisable(f1.btnReg		, false);
					setButtonDisable(f1.btnSave		, false);
					setButtonDisable(f1.btnDelete	, false);
					setButtonDisable(f1.btnCancel	, false);
					setButtonDisable(f1.btnRegSign	, false);
				//	setButtonDisable(f1.btnCanlSign	, true );
					setDisabledObj(arrObj			, false);
					setDisabledObj([f1.bse_y]		, true );
					break;

		case "V" :	setButtonDisable(f1.btnReg		, false);
					setButtonDisable(f1.btnSave		, true );
					setButtonDisable(f1.btnDelete	, true );
					setButtonDisable(f1.btnCancel	, true );
					setButtonDisable(f1.btnRegSign	, true );
					/*var s_sign_prgs_stts_cd = oGrid.GetCellHiddenValue("sign_prgs_stts_cd", oGrid.GetActiveRowIndex());
					if( s_sign_prgs_stts_cd == "04" || s_sign_prgs_stts_cd == "05" )	//04:승인,05:반려
					{
						setButtonDisable(f1.btnCanlSign	, true);
					}else{
						setButtonDisable(f1.btnCanlSign	, false);
					}*/
					setDisabledObj(arrObj, true);
					break;
	}
}
/**
 * 내 휴가정보 기준년도 셋팅
 */
function chgBseYNm()
{
	var len = G_HLDINFO[0].length;

	for(var i = 0; i<len; i++)
	{
		if(fInfo.bse_y_nm.value == G_HLDINFO[0][i])
		{
			fInfo.pmt_dy.value = G_HLDINFO[2][i];
			fInfo.use_dy.value = G_HLDINFO[3][i];
			fInfo.rmn_dy.value = G_HLDINFO[4][i];
			break;
		}
	}
}
/**
 * 저장 버튼 클릭 : 휴가저장
 * 결재상신 버튼 클릭 : arg : Y
 */
function saveHldy(arg)
{
	if( f1.hldy_knd_seq.value=="25" )
	{
		var str = "---------------------------------------------\n";
		str +=    "               휴가 정산중입니다.\n";
		str +=    "---------------------------------------------\n\n";
		str +=    "남아있는 '정기휴가'를 먼저 신청 해주세요.\n";
		MessageBox("","I",str);
		return;
	}
	
	if( gsXaFlag == "U" && f1.hldy_seq.value == "" )
	{
		MessageBox("","I","저장할 데이터가 존재하지 않습니다.");
		return;
	}

	if( getValidation(f1, true) == false ) return;
	if( !checkTermDate(f1.strt_dt, f1.end_dt, true, true, "")) return;

	//---이미 화면과 버튼이 막혀있어서 이제는 이부분을 체크 하지 않아도 된다
	if( gsXaFlag == "U" && oGrid.GetRowCount() > 0 )
	{
		var s_sign_prgs_stts_cd = oGrid.GetCellHiddenValue("sign_prgs_stts_cd", oGrid.GetActiveRowIndex());

		if( s_sign_prgs_stts_cd != "06" )
		{
			MessageBox("", "I", "결재가 이미 진행되어 수정 할 수 없습니다.");
			return;
		}
	}
	//---------------------------------------------------------------------------//

	var trans = new Trans();
	trans.setSvc(SELECT_SERVICE_03);//휴가일수 조회
	trans.setCallBack("callbackSaveHldy('"+SELECT_SERVICE_03+"','"+arg+"')");
	trans.open("f1","f1","/common.do");
}
/**
 * 콜백 - 저장 버튼 클릭 : 휴가저장
 * svcid : service id
 * arg   : 결재상신여부 Y/N
 */
function callbackSaveHldy(svcid, arg)
{
	if(DataSet.isError(svcid) == "true") return;

	var i_rmn_dy  = parseFloat(fInfo.rmn_dy.value);										// pjk 휴가 잔여 일수 - 나중에 실시간 쿼리로 변경
	if (DataSet.getParam(SELECT_SERVICE_03, 1, 0, "ddct_f_cd") == 'N')
	{
		i_rmn_dy = parseFloat(DataSet.getParam(SELECT_SERVICE_03, 1, 0, "hldy_posb_dy"));	
	}
	var i_hldy_dy = parseFloat(DataSet.getParam(SELECT_SERVICE_03, 1, 0, "hldy_dy"));	// 예상 휴가 일수
	var msg2	  = "";
	var msg		  = "";
	msg += "휴가신청일수 : " + i_hldy_dy + " 일\n";
	msg += "휴가잔여일수 : " + i_rmn_dy  + " 일\n\n";

	if( (i_rmn_dy - i_hldy_dy) < 0 )
	{
		msg2 = "휴가 신청일수가 휴가 잔여일수 보다 많습니다.\n";
		msg2 += "--------------------------\n";
		msg2 += msg;
		if( !MessageBox("","E",msg2) ) return;
	}

	if(arg=="Y")	//결재상신여부
	{
		msg2 += "\n결재요청 하시겠습니까?\n";
	}else{
		msg2 += "\n휴가정보를 저장 하시겠습니까?\n";
	}
	msg2 += "--------------------------\n";
	msg2 += msg;

	if( !MessageBox("","C",msg2) ) return;

	saveHldyInfo(arg);
}
/**
 * 휴가저장
 * arg   : 결재상신여부 Y/N
 */
function saveHldyInfo(arg)
{
	var svcId 		= "";	//서비스아이디
	var sCallbackId = "";	//콜백메서드
	var sqlFlag 	= "";	//SQL구분
	var sqlId       = "";
	if( gsXaFlag == "U" )
	{
		svcId 		= UPDATE_SERVICE_01;
		sqlId       = f1.hldy_seq.value;
		sCallbackId = "callbackSavehldyinfoUpdate()";
		sqlFlag 	= "UPDATE";
	}
	else //if( gsXaFlag == "A" )
	{
		svcId 		= INSERT_SERVICE_01;
		sqlId       = "IDENT_CURRENT('UC_HLDY')";
		sCallbackId = "callbackSavehldyinfoInsert";
		sqlFlag 	= "INSERT";
	}

	if(arg=="Y"){svcId += (","+INSERT_SERVICE_02 + "," + INSERT_SERVICE_03);}	//결재일때

	var trans = new Trans();
	trans.setSvc(svcId);
	trans.setMyUserParams("saveflag",sqlFlag);
	trans.setMyUserParams("id", sqlId);
	trans.setMyUserParams("sign_tp_cd", "01");
	trans.setMyUserParams("send_mode","REQUEST");	//문자 메시지 구분-요청:REQUEST,승인:APPROVAL,반려:REJECT
	trans.setMyUserParams("now_sign_stg_cd","1");	//SMS용 - 결재단계
	trans.setCallBack(sCallbackId);
	trans.open("f1","f1","/common.do");
}
/**
 * 콜백 - 휴가저장 - 등록
 * svcid : service id
 */
function callbackSavehldyinfoInsert(svcid)
{
	if(DataSet.isError(svcid) == "true") return;

	if( parseInt(DataSet.getParam(INSERT_SERVICE_01, 1, 0, "SUCCESS_COUNT"),10) > 0 )
	{
		var msg = ""
		if(svcid==INSERT_SERVICE_01)
		{
			msg = "저장되었습니다.\n\n(결재상신을 요청해야 실제 휴가신청이 진행됩니다.)";
		}else{
			msg = "휴가신청 결재가 요청 되었습니다.";
		}
		MessageBox("", "I", msg);
		searchHldy();
	}
}
/**
 * 콜백 - 휴가저장 - 수정
 * svcid : service id
 */
function callbackSavehldyinfoUpdate(svcid)
{
	if(DataSet.isError(svcid) == "true") return;

	if( parseInt(DataSet.getParam(UPDATE_SERVICE_01, 1, 0, "SUCCESS_COUNT"),10) > 0 )
	{
		var msg = ""
		if(svcid==UPDATE_SERVICE_01)
		{
			msg = "저장되었습니다.\n\n(결재상신을 요청해야 실제 휴가신청이 진행됩니다.)";
		}else{
			msg = "휴가신청 결재가 요청 되었습니다.";
		}
		MessageBox("", "I", msg);
		searchHldy();
	}
}
/**
 * 휴가 삭제
 */
function deleteHldy()
{
	if( gsXaFlag == "U" && f1.hldy_seq.value == "" )
	{
		MessageBox("","I","삭제할 데이터가 존재하지 않습니다.");
		return;
	}
	/*
	var s_sign_prgs_stts_cd = oGrid.GetCellHiddenValue("sign_prgs_stts_cd", oGrid.GetActiveRowIndex());


	if( Number(s_sign_prgs_stts_cd) > 1 && Number(s_sign_prgs_stts_cd) < 4 )
	{
		alert("결재 진행중 삭제할 수 없습니다.");
		return;
	}
	else if( Number(s_sign_prgs_stts_cd) == 4 )
	{
		alert("결재 완료건은 삭제할 수 없습니다.");
		return;
	}
	*/

	if( !MessageBox("DelConfirm", "C", "") ){return;}
	var trans = new Trans();
	trans.setSvc(DELETE_SERVICE_01);
	trans.setMyUserParams("hldy_seq",f1.hldy_seq.value);
	trans.setCallBack("callbackDeleteHldy");
	trans.open("","","/common.do");
}
/**
 * 콜백 - 휴가 삭제
 * svcid : service id
 */
function callbackDeleteHldy(svcid)
{
	if(DataSet.isError(svcid) == "true") return;

	if( parseInt(DataSet.getParam(DELETE_SERVICE_01, 1, 0, "SUCCESS_COUNT"),10) > 0  )
	{
		searchHldy();
	}
}
/**
 * 결재상신취소

function canlSignReq()
{
	if( gsXaFlag == "UPDATE" && f1.hldy_seq.value == "" )
	{
		alert("선택된 데이터가 존재하지 않습니다.");
		return;
	}

	if( gsXaFlag == "UPDATE" && oGrid.GetRowCount() > 0 )
	{
		var s_sign_prgs_stts_cd = oGrid.GetCellHiddenValue("sign_prgs_stts_cd", oGrid.GetActiveRowIndex());

		if(  Number(s_sign_prgs_stts_cd) < 4 )
		{
			alert("결재 진행중입니다. 취소할 수 없습니다.");
			return;
		}
		else if( Number(s_sign_prgs_stts_cd) == 4 )
		{
			alert("결재 완료 상태입니다. 취소할 수 없습니다.");
			return;
		}
		else if( Number(s_sign_prgs_stts_cd) == 5 )
		{
			alert("현재 취소 상태입니다.");
			return;
		}
	}

	var trans = new Trans();
	trans.setSvc(UPDATE_SERVICE_02);
	trans.setCallBack("callbackCanlSignReq");
	trans.open("f1","f1","/common.do");
}
 */
/**
 * 콜백 - 결재상신취소
 * svcid : service id

function callbackCanlSignReq(svcid)
{
	if(DataSet.isError(svcid) == "true") return;

	if( parseInt(DataSet.getParam(svcid, 1, 0, "SUCCESS_COUNT"),10) > 0 )
	{
		searchHldy();
	}
}
*/