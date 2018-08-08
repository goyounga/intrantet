/**
 * PROJECT : INTRANET
 * NAME    : prjMtncMng.js
 * DESC    : 유지보수관리
 * AUTHOR  : 박준규 과장
 * VERSION : 1.0
 * Copyright ⓒ 2010 Nexfron. All rights reserved.
 * ============================================================================================
 * 							변		경		사		항
 * ============================================================================================
 * VERSION	   DATE		  	AUTHOR		DESCRIPTION
 * ============================================================================================
 * 1.0		2010.09.12		박준규		개발
 */
var SELECT_ID 		= "UCPRJ031S";	//유지보수리스트
var SELECT_ID_CODE 	= "UCPRJ012S";	//코드 DataSet
var	SELECT_ID_CHK   = "UCPRJ032S";	//무결성검사
var SELECT_ID_TOP40 = "UCPRJ033S";	//유지보수리스트 top40
var INSERT_ID 		= "UCPRJ031I";	//유지보수 등록
var UPDATE_ID     	= "UCPRJ031U";	//유지보수 수정
var DELETE_ID     	= "UCPRJ031D";	//유지보수 삭제
var oGridS     		= "";           //유지보수리스트
var oGridC      	= "";           //시스템
var gsXaFlag      	= "";			//화면상태
var gsCurrow      	= -1;			//선택로우
var gsCurGrid     	= "";			//선택그리드
var gsCurKey     	= "";			//선택된고유키 : f.mtnc_seq와 같다. 그리드상의 고유식별키이다.
var aForms        	= null; 		//폼객체들
var gaCode 			= new Array();	//코드 Array
var aButton       	= null;			//버튼배열
var aBtnMode      	=				//버튼모드
[
	//등록	, 저장	, 삭제	, 취소	, 조회	    //버튼 / 상태
	[ false , true  , true  , true	, false	] ,	// I   : 초기화
	[ true  , false , true  , false , false	] ,	// A   : 등록
	[ false , false , false , false , false	] ,	// U   : 수정
	[ true  , true  , true  , true  , true 	]	// X   : 블로킹
];
/**
 *초기화
 */
function init()
{
	//버튼초기화
	aButton = [ f.btnAdd, f.btnSave, f.btnDel, f.btnCancel, fQuery.btnSearch ];

	//폼객체초기화
	aForms = [ f.mtnc_nm  	, f.strt_date	, f.end_date	  , f.mtnc_cost	 	, f.regular_chk
	         , f.mtnc_type  , f.dvlp_frwk	, f.rmk ];

		   //, f.clnt_corp_seq , f.clnt_corp_nm 	, f.coop_corp_seq	, f.coop_corp_nm

	//그리드초기화
	oGridS = document.getElementById(SELECT_ID);
	oGridC = document.getElementById(SELECT_ID_CODE);
	oGridC.bHDVisible  		 = false;
	oGridC.strHDClickAction  = "select";
 	oGridC.strScrollBars 	 = "vertical";
 	oGridC.bStatusbarVisible = false;
 	oGridC.nHDLineSize 		 = 17;

	//화면초기화
	setReset();

	//초기조회
	//query();
	queryCode();
}
/**
 * 화면초기화
 */
function setReset()
{
	gsCurrow  = -1;
	gsCurGrid = "";
	gsCurKey  = "";
	setMode("I",f);
	setDisabledObj(aForms, true);
	clear(f);//selectbox, input-text, textarea
	f.mtnc_seq.value      = "";//hidden
	f.prj_seq.value		  = "";//hidden
	f.clnt_corp_seq.value = "";//hidden
	f.coop_corp_seq.value = "";//hidden
	f.mtnc_system.value   = "";//hidden
	resetWorkRange();
}
/**
 * 버튼컨트롤
 * sType:버튼모드
 */
function setMode(sType)
{
	gsXaFlag = sType;
	var mode = -1;
	switch (sType)
	{
		case "I" :	mode = 0;	break;
		case "A" :	mode = 1;	break;
		case "U" :	mode = 2;	break;
		case "X" :	mode = 3;	break;
		default  : 	break;
	}
	for( var i=0; i<aButton.length; i++ )
	{
		setButton( aButton[i], aBtnMode[mode][i]);
	}
}
/**
 * 코드조회
 */
function queryCode()
{
	var tran = new GridTrans();
	tran.setPageRow("9999");
	tran.setSvc(SELECT_ID_CODE);
	tran.setUserParams("up_cd=PRJ013");
	tran.setWait(false);
	tran.setCallBack("callbackQueryCode");
	tran.open("","f","/wisegrid.do");
}
/**
 * 코드조회 콜백
 */
function callbackQueryCode(sSvcId)
{
	setCode();
}
/**
 * 코드셋팅
 */
function setCode()
{
	var k	     = 0;
	//var nTotCnt	 = DataSet.getTotalCount(SELECT_ID_CODE);
	var nTotCnt	 = oGridC.GetRowCount();
	var hParam   = "";
	var sCode    = "";
	var sCodeNm  = "";

	//코드배열생성
	for(var i=0; i<nTotCnt; i++)
	{
		//hParam   = DataSet.getHashParam(SELECT_ID_CODE, "1", i);
		//sCode    = hParam.get( "code"    );
		//sCodeNm  = hParam.get( "code_nm" );

		sCode    = oGridC.GetCellValue("code", i);
		sCodeNm  = oGridC.GetCellValue("code_nm", i);

		gaCode[k] = new Array(2);
		gaCode[k][0] = sCode;
		gaCode[k][1] = sCodeNm;
		k++;
	}
}

var old_stnd_date= ""
function getEndYn(obj)
{
	if (obj.checked == true) 
	{
		fQuery.stnd_date.disabled=false;
		fQuery.stnd_date.value = old_stnd_date ;
	}	
	else 
	{
		old_stnd_date = fQuery.stnd_date.value;
		fQuery.stnd_date.disabled=true;
		fQuery.stnd_date.value ="";
	}
}
/**
 * 조회
 */
function query( aFlg )
{
	var svc_id = "";
	if( aFlg == "REFRESH" )
	{
		svc_id = SELECT_ID_TOP40;
	}else{
		if ( getValidation(fQuery, true) == false ) {return;}
	//	if ( !checkTermDate(fQuery.reg_dt_s, fQuery.reg_dt_e, true, true, "") ){return;}
		svc_id = SELECT_ID;
	}

	var tran = new Trans();
	tran.setPageRow("9999");
	tran.setSvc( svc_id );
	tran.setDisSvc(SELECT_ID);
	tran.setWiseGrid("1");
	tran.setForwardId("wgdsl","");
	tran.setDefClick("true");
	tran.setCallBack("callbackQuery");
	setMode("X", f);
	if (fQuery.user_type.value != "") 
	{
		tran.setMyUserParams("user_"+fQuery.user_type.value, "1");
		tran.setMyUserParams(fQuery.user_type.value+"_user_id", fQuery.user_id.value);
	}
	tran.open("fQuery","f","/wisegrid.do");
}
/**
 * 조회콜백
 * svcid  : 서비스ID
 */
function callbackQuery(sSvcId)
{
	setSystemName();
	if ( parseInt( oGridS.GetRowCount()) < 1 ){setReset();}
}
/**
 * 목록클릭
 * id           : 클릭한 그리드객체ID
 * strColumnKey : 클릭한 컬럼명
 * nRow         : 클릭한Row Index
 */
function showDetailO_obj(id, strColumnKey, nRow)
{
	if(id==SELECT_ID)
	{
	 	gsCurrow  = nRow;
	 	gsCurGrid = id;
	 	gsCurKey  = oGridS.GetCellValue("mtnc_seq", nRow);
		setMode("U",f);
		setDisabledObj(aForms ,false);
		showDetailByWise(id, nRow, f);
		setWorkRange(oGridS.GetCellValue("mtnc_system", nRow));//업무범위

		
	}
}

/**
 * 목록 더블 클릭
 * id           : 클릭한 그리드객체ID
 * strColumnKey : 클릭한 컬럼명
 * nRow         : 클릭한Row Index
 */
function showDetailB_obj(id, strColumnKey, nRow)
{
	var url = "/jsp/dashboard/dasMtncStatP.jsp";
	var str = "";
	str += "mtnc_seq="+ f.mtnc_seq.value;
	openPopup(url, str, "dasMtncStatP", "", "", "1025", "910", "toolbar=no,scrollbars=no,resizable=no");
}

/**
 * 업무범위 문자열생성
 * sSvcId  : 서비스ID
 */
function setSystemName()
{
	try{
		var nRowCnt  = oGridS.GetRowCount();
		var nlen     = gaCode.length;
		var codenm   = "";

		for( var i=0; i<nRowCnt; i++ )
		{
			var work_range = trim(oGridS.GetCellValue("mtnc_system" , i));

			if(work_range!="")	//없어도 배열길이는1이다
			{
				var aCodes     = work_range.split(",");

				for(var j=0; j<aCodes.length ;j++)
				{
					for(var k=0; k<nlen; k++)
					{
						if(aCodes[j] == gaCode[k][0])
						{
							codenm += ((codenm.length>0 ? ", " : "") + gaCode[k][1]);
							break;
						}
					}
				}

				oGridS.SetCellValue( "mtnc_system_nm" , i, codenm );
				codenm = "";
			}
		}
	}catch(e){}
}
/**
 * 시스템 초기화
 */
function resetWorkRange()
{
	for(var j=0; j<oGridC.GetRowCount(); j++)
	{
		oGridC.SetCellValue("chk", j, 0);
	}
	if(oGridC.GetRowCount()>0)
	{
		oGridC.MoveRow(0);	//selectRow(oGrid, 0); 설정에러난다.
	}
}
/**
 * 시스템 값 셋팅
 * pWorkRange  : 시스템코드
 */
function setWorkRange( pWorkRange )
{
	resetWorkRange();

	if(pWorkRange != "")
	{
		var aWorkRange = pWorkRange.split(",");

		for(var i=0; i<aWorkRange.length; i++)
		{
			for(var j=0; j<oGridC.GetRowCount(); j++)
			{
				if(aWorkRange[i] == oGridC.GetCellValue("code", j))
				{
					oGridC.SetCellValue("chk", j, 1);
					break;

				}
			}
		}
	}
}
/**
 * 시스템 값 추출
 * return  : 시스템코드
 */
function getWorkRange()
{
	var sWorkRange = "";

	for(var i=0; i<oGridC.GetRowCount(); i++)
	{
		if( oGridC.GetCellValue("chk", i)==1 )
		{
			sWorkRange += (","+oGridC.GetCellValue("code", i));
		}
	}
	return (sWorkRange.substr(1));
}
/**
 * 등록버튼클릭
 */
function add()
{
	setMode("A",f);
	setDisabledObj(aForms ,false);
	clear(f);
	f.mtnc_seq.value      = "";//hidden
	f.clnt_corp_seq.value = "";//hidden
	f.coop_corp_seq.value = "";//hidden
	f.mtnc_system.value   = "";//hidden
	resetWorkRange();
}
/**
 * 취소버튼클릭
 */
function cancel()
{
	if( gsCurrow>-1 )
	{
		gsCurrow = findGridRow(oGridS, "mtnc_seq", gsCurKey);
		showDetailO_obj( gsCurGrid, "", gsCurrow );
	}else{
		setReset();
	}
}
/**
 * 저장버튼클릭
 */
function save()
{
	if ( getValidation(f, true) == false ) {return;}
	if      (gsXaFlag == "A"){ insert(); }
	else if (gsXaFlag == "U"){ checkUsing("UPDATE"); }
}
/**
 * 사용건 조회
 * sMode : 수정, 삭제 구분값
 */
function checkUsing(sMode)
{
	var tran = new Trans();
	tran.setPageRow("9999");
	tran.setSvc(SELECT_ID_CHK);
	tran.setUserParams("mtnc_seq="+f.mtnc_seq.value);
	tran.setCallBack( (sMode=="UPDATE") ? "update" : "deleteList" );
	setMode("X", f);
	tran.open("","","/common.do");
}
/**
 * 사용건 목록작성
 * sDataSet : 사용건 DataSet
 */
function makeUsingList(sDataSet)
{
	/*
	var aSheetNm = DataSet.getParamArr(sDataSet, DataSet.getCurPage(sDataSet), "plan_nm");
	var nTotCnt  = DataSet.getTotalCount(sDataSet);
	var nLenth   = ((aSheetNm.length>5) ? 5 : aSheetNm.length);
	var sTempNm  = "";

	for( var i=0; i<nLenth; i++ )
	{
		sTempNm += (aSheetNm[i] + "\n");
	}

	if( aSheetNm.length>5 ){ sTempNm +=("...\n"); }

	var sMessage = "평가계획에서 사용중인 평가지입니다.\n\n";
	sMessage    += "★ 평가계획명 (총 "+nTotCnt+"건) ★\n";
	sMessage    += "----------------------------------------\n";
	sMessage    += sTempNm;
	sMessage    += "----------------------------------------\n\n";
	*/

	var nTotCnt  = DataSet.getParam(SELECT_ID_CHK, 1, 0, "cnt");
	var sMessage = "★ 사용중인 유지보수계약 입니다. ★\n\n";
	sMessage    += "(등록된 총 유지보수 요청건 : "+nTotCnt+"건)\n\n";
	return sMessage;
}
/**
 * 수정
 */
function update()
{
//	if(DataSet.getTotalCount(SELECT_ID_CHK) > 0)
	if(parseInt(DataSet.getParam(SELECT_ID_CHK,1,0,"cnt")) > 0)
	{
		var sMessage = makeUsingList(SELECT_ID_CHK);
		if(!MessageBox("ChgConfirm", "C", sMessage))
		{
			setMode("U", f);
			return;
		}
	}else{
		if ( !MessageBox("SavConfirm", "C", "") )
		{
			setMode("U", f);
			return;
		}
	}

	f.mtnc_system.value = getWorkRange();	//시스템목록

	var tran = new Trans();
	tran.setSvc(UPDATE_ID);
	//tran.setUserParams("chg_user_id="+getUserID());
	tran.setCallBack("callbackUpdate");
	setMode("X", f);
	tran.open("f","f","/common.do");
}
/**
 * 수정후콜백
 * svcid  : 서비스ID
 */
function callbackUpdate(sSvcId)
{
	if (parseInt(DataSet.getParam(sSvcId, 1, 0, "SUCCESS_COUNT"),10) > 0)
	{
		gsCurrow = findGridRow(oGridS, "mtnc_seq", gsCurKey);
		updateWiseGridRow(gsCurGrid, gsCurrow, f);

		var mtnc_period = dateMaskLogic( removeMask(f.strt_date.value).substr(0,6), "." )
		        + " ~ " + dateMaskLogic( removeMask(f.end_date.value ).substr(0,6), "." );
		oGridS.SetCellValue("mtnc_period" , gsCurrow, mtnc_period);

		var aCodes = f.mtnc_system.value.split(",");
		var nlen   = gaCode.length;
		var codenm = "";
		for(var j=0; j<aCodes.length ;j++)
		{
			for(var k=0; k<nlen; k++)
			{
				if(aCodes[j] == gaCode[k][0])
				{
					codenm += ((codenm.length>0 ? ", " : "") + gaCode[k][1]);
					break;
				}
			}
		}
		oGridS.SetCellValue( "mtnc_system_nm" , gsCurrow, codenm );

		setMode("U", f);
	}
}
/**
 * 등록
 */
function insert()
{
	if ( !MessageBox("SavConfirm", "C", "")){return;}

	f.mtnc_system.value = getWorkRange();	//시스템목록
	var tran = new Trans();
	tran.setSvc(INSERT_ID);
	//tran.setUserParams("reg_user_id=" + getUserID());
	tran.setCallBack("callbackInsert");
	setMode("X", f);
	tran.open("f","f","/common.do");
}
/**
 * 저장후콜백
 * sSvcId  : 서비스ID
 */
function callbackInsert(sSvcId)
{
	/*
	if (parseInt(DataSet.getParam(sSvcId, 1, 0, "SUCCESS_COUNT"),10) > 0)
	{
		var sNewSeq	        = DataSet.getReqParam( sSvcId ,"_SEQ_NEXVAL");
		f.quest_cnt.value 	= 0;
		f.tot_point.value 	= 0;
		f.reg_dt.value 		= getCurDay("-");
		f.reg_user_nm.value = getUserNM();
		f.sheet_seq.value 	= sNewSheetSeq;

		var nRow  = insertWiseGridRow(SELECT_ID, -1, f);
	 	gsCurrow  = nRow;
	 	gsCurGrid = SELECT_ID;
	 	gsCurKey  = sNewSeq;
		setMode("U", f);
	}
	*/
	if (DataSet.isError(INSERT_ID) == "true") {return;}
	query( "REFRESH" );
}
/**
 * 삭제버튼클릭
 */
function del()
{
	checkUsing("DELETE");
}
/**
 * 삭제
 */
function deleteList()
{
//	if(DataSet.getTotalCount(SELECT_ID_CHK) > 0)
	if(parseInt(DataSet.getParam(SELECT_ID_CHK,1,0,"cnt")) > 0)
	{
		var sMessage = makeUsingList(SELECT_ID_CHK);
	//	MessageBox("PRJDeleteMTNC", "I",sMessage);	//먼저 유지보수 요청건을 삭제하세요.
		MessageBox("", "I", sMessage + "먼저 유지보수 요청건을 삭제하세요." );
		setMode("U", f);
		return;
	}
	if( !MessageBox("DelConfirm", "C", "" ) )
	{
		setMode("U", f);
		return;
	}

	var tran = new Trans();
	tran.setSvc(DELETE_ID);
	tran.setUserParams("mtnc_seq="+f.mtnc_seq.value);
	tran.setCallBack("callbackDelete");
	setMode("X", f);
	tran.open("","","/common.do");
}
/**
 * 삭제후콜백
 * sSvcId : 서비스ID
 */
function callbackDelete(sSvcId)
{
//	if (DataSet.isError(INSERT_ID) == "true") {return;}
	if (parseInt(DataSet.getParam(DELETE_ID, 1, 0, "SUCCESS_COUNT"),10) > 0)
	{
		gsCurrow = findGridRow(oGridS, "mtnc_seq", gsCurKey);
		removeWiseGridRow(SELECT_ID, gsCurrow);
		setReset();
	}
}
/**
 * 정보삭제
 */
function delInfo(arg)
{
	switch (arg)
	{
		case "clnt_corp" :	f.clnt_corp_seq.value = "";
							f.clnt_corp_nm.value  = "";
							break;
		case "coop_corp" :	f.coop_corp_seq.value = "";
							f.coop_corp_nm.value  = "";
							break;
		case "prj"		 :	f.prj_seq.value 	  = "";
							f.prj_nm.value 		  = "";
							break;
		default :			break;
	}
}
/**
 * 고객사 팝업
 */
function openClntCorp()
{
	openCorp( "clnt_corp" );
}
/**
 * 협력사팝업
 */
function openCoopCorp()
{
	openCorp( "coop_corp" );
}
/**
 * 업체조회 팝업
 */
function openCorp( aFlg )
{
	var url = "/jsp/project/prjCorpMngP.jsp";
	var str = "";
	str += "corp=" + aFlg;
	openPopup(url, str, "prjCorpMngP", "", "", "370", "600", "toolbar=no,scrollbars=no,resizable=no");
}
/**
 * 업체 정보셋팅
 */
function setCorp(corp, corp_seq, corp_nm)
{
	if( corp=="clnt_corp" )
	{
		f.clnt_corp_seq.value = corp_seq;
		f.clnt_corp_nm.value  = corp_nm;
	}
	else //if( corp=="coop_corp" )
	{
		f.coop_corp_seq.value = corp_seq;
		f.coop_corp_nm.value  = corp_nm;
	}
}
/**
 * 프로젝트 팝업
 */
function openProject(frm)
{
	openPopup("/jsp/project/prjExePOP.jsp", "", "projectPop", "", "", "800", "565", "toolbar=no,scrollbars=no");
}
/**
 * 프로젝트 정보셋팅
 */
function setProject(prj_seq, prj_nm)
{
	f.prj_seq.value = prj_seq;
	f.prj_nm.value  = prj_nm;

}
/**
 * 회사등록 팝업
 */
function openCorpMng(frm)
{
	//openPopup("/jsp/project/prjCorpMng.jsp", "", "prjCorpMng", "", "", "1230", "830", "toolbar=no,scrollbars=no,resizable=yes");
	openPopup("/jsp/project/prjCorpMng.jsp", "", "prjCorpMng", "", "", "793", "600", "toolbar=no,scrollbars=no,resizable=no");
}

/********************
* 사용자 선택버튼
********************/
var gId ;
function openUserOrg(id)
{
	gId = id;
	
	if(typeof(openPopup) == "object")
		openPopup.close();
	
	openPopup("/jsp/common/comUserOrg.jsp", "", "popup", "0", "300", "800", "580", "toolbar=no,scrollbars=no");
}

/********************
* 사용자 조직도(g_pop) 창에서 선택했을때 setOrgUserInfo를 호출한다.
********************/
function setOrgUserInfo(id, nm, cd)
{
	eval(gId).value = id;
	eval(gId+'_nm').value = nm;

}
