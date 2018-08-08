/**
 * PROJ : Nexfron Intranet
 * NAME : astMtrlMng.js
 * DESC : 자재관리 자바스크립트
 * Author : 김은수 과장
 * VER  : 1.0
 * Copyright 2009 Nexfron All rights reserved
 * ============================================================================================
 * 								변		경		사		항
 * ============================================================================================
 * VERSION		DATE		AUTHOR		DESCRIPTION
 * ============================================================================================
 * 1.0		2009.08.13		김은수		주석추가
 */
var Gridid, GridstrColumnKey, GridnRow;
var actionMode="II";
var g_frm;

var adetailtxt1 = new Array( "mtrl_seq", "prdt_nm", "prdt_no", "mco", "buy_dt", "buy_amt",
							"rnt_id", "rnt_nm", "rnt_dt", "rtn_dt", "mtrl_rmk"
					 	);
var adetailtxt2 = new Array( "sub_mtrl_seq", "prdt_nm", "prdt_no", "mtrl_mco", "buy_dt", "buy_amt", "sub_mtrl_rmk"
					 	);

var oGrid = "";
//***********************************
// ONLOAD
//***********************************
function init()
{
	oGrid = document.all("UCAST020S");
	oGrid.bRowSelectorVisible 	= false;
	oGrid.strHDClickAction 	= "select";
	setMode("I");
	setMode("II");
	actionMode="II";

//	queryList();
}
/**
 * 그리드 헤더 그리기
 * svcid  : 서비스ID
 */
function makeGridHeaderByMtrl()
{
	oGrid.ClearGrid();
	setProperty(oGrid);
	if (getArrayData( fQuery.queryType, "index" )==0)
	{
		oGrid.AddHeader( "mtrl_c_nm" 	, "자재구분"	 , "t_text"    , -1, "70"  ,	false);
		oGrid.AddHeader( "mco" 		    , "제조사"		 , "t_text"    , -1, "100" ,	false);
		oGrid.AddHeader( "prdt_nm"	    , "제품명"		 , "t_text"    , -1, "150" ,	false);
		oGrid.AddHeader( "rnt_c_cd" 	, "대여여부"	 , "t_text"    , -1, "60"  ,	false);
		oGrid.AddHeader( "rnt_nm"		, "최종대여자"	 , "t_text"    , -1, "70"  , 	false);
	}
	else
	{
		oGrid.AddHeader( "rnt_nm"		, "최종대여자"	 , "t_text"    , -1, "70"  , 	false);
		oGrid.AddHeader( "mtrl_c_nm" 	, "자재구분"	 , "t_text"    , -1, "70"  ,	false);
		oGrid.AddHeader( "mco" 		    , "제조사"		 , "t_text"    , -1, "100" ,	false);
		oGrid.AddHeader( "prdt_nm"	    , "제품명"		 , "t_text"    , -1, "150" ,	false);
		oGrid.AddHeader( "rnt_c_cd" 	, "대여여부"	 , "t_text"    , -1, "60"  ,	false);
	}
	oGrid.AddHeader( "rnt_dt" 	    , "최종대여일자" , "t_date"    , -1, "75"  , 	false);
	oGrid.AddHeader( "rtn_dt" 	    , "최종반납일자" , "t_date"    , -1, "75"  , 	false);
	oGrid.AddHeader( "buy_dt" 	    , "구입일자"	 , "t_date"    , -1, "75"  , 	false);
	oGrid.AddHeader( "buy_amt" 	    , "구입가격"	 , "t_number"  , -1, "55"  , 	false);
	oGrid.AddHeader( "cnt" 	    	, "부속품"	 	 , "t_number"  , -1, "50"  , 	false);

	oGrid.AddHeader( "prdt_no" 	    , "제품번호"	 , "t_text"    , -1, "150"  , 	false);
	oGrid.AddHeader( "mtrl_seq" 	, "자재순번"	 , "t_text"    , -1, "60"  ,	false);
	oGrid.AddHeader( "mtrl_c_cd" 	, "자재구분코드" , "t_text"    , -1, "60"  ,	false);
	oGrid.AddHeader( "mtrl_rmk"	    , "비고"		 , "t_text"    , -1, "60"  ,	false);
	oGrid.AddHeader( "rnt_id" 	    , "대여자ID"	 , "t_text"    , -1, "60"  ,	false);
	oGrid.AddHeader( "rg_dt" 		, "등록일자"	 , "t_text"    , -1, "60"  , 	false);
	oGrid.AddHeader( "rg_tm" 		, "등록시간"	 , "t_text"    , -1, "60"  , 	false);
	oGrid.AddHeader( "rg_id" 		, "등록자ID"	 , "t_text"    , -1, "60"  , 	false);
	oGrid.AddHeader( "rg_nm" 		, "등록자"		 , "t_text"    , -1, "60"  , 	false);
	oGrid.AddHeader( "mdf_dt"		, "변경일자"	 , "t_date"    , -1, "75"  , 	false);
	oGrid.AddHeader( "mdf_tm"		, "변경시간"	 , "t_date"    , -1, "60"  , 	false);
	oGrid.AddHeader( "mdf_id"		, "변경자ID"	 , "t_text"    , -1, "60"  , 	false);
	oGrid.AddHeader( "mdf_nm"		, "변경자"		 , "t_text"    , -1, "60"  , 	false);
	oGrid.BoundHeader();
//	oGrid.SetColHide( "prdt_no" 	, true);
	oGrid.SetColHide( "mtrl_seq" 	, true);
	oGrid.SetColHide( "mtrl_c_cd" 	, true);
	oGrid.SetColHide( "mtrl_rmk"	, true);
	oGrid.SetColHide( "rnt_id" 	    , true);
	oGrid.SetColHide( "rg_dt" 		, true);
	oGrid.SetColHide( "rg_tm" 		, true);
	oGrid.SetColHide( "rg_id" 		, true);
	oGrid.SetColHide( "rg_nm" 		, true);
//	oGrid.SetColHide( "mdf_dt"		, true);
//	oGrid.SetColHide( "mdf_tm"		, true);
//	oGrid.SetColHide( "mdf_id"		, true);
//	oGrid.SetColHide( "mdf_nm"		, true);
	oGrid.SetColCellAlign ("rnt_c_cd" 	, "center");
	oGrid.SetColCellAlign ("rnt_nm"		, "center");
	oGrid.SetColCellAlign ("rnt_dt" 	, "center");
	oGrid.SetColCellAlign ("rtn_dt" 	, "center");
	oGrid.SetColCellAlign ("buy_dt" 	, "center");
	oGrid.SetColCellAlign ("buy_amt"  	, "right");
	oGrid.SetColCellAlign ("cnt"  		, "center");
	oGrid.SetColCellAlign ("mdf_dt"  	, "center");
	oGrid.SetColCellAlign ("mdf_tm"  	, "center");
	oGrid.SetColCellAlign ("mdf_id"  	, "center");
	oGrid.SetColCellAlign ("mdf_nm"  	, "center");
	
	oGrid.SetDateFormat('rnt_dt','yyyy-MM-dd');
	oGrid.SetDateFormat('rtn_dt','yyyy-MM-dd');
	oGrid.SetDateFormat('buy_dt','yyyy-MM-dd');

	oGrid.SetDateFormat('mdf_dt','yyyy-MM-dd');


	oGrid.SetNumberFormat('buy_amt','#,###');
	oGrid.SetColCellFgColor("cnt","24|100|228");
	oGrid.SetColCellFontBold("cnt","true");
}
//***********************************
// queryList 조회
//***********************************
function queryList()
{
	setMode("I");
	setMode("II");
	actionMode="II";

	var orderByStr = (getArrayData( fQuery.queryType, "index" )==0)
						? "mtrl_c_nm,mco,prdt_nm,rnt_nm"
						: "rnt_nm,mtrl_c_nm,mco,prdt_nm";
	makeGridHeaderByMtrl();
	oGrid.setParam("mdf_tm_format" , "TIME");
	var trans = new Trans();
	trans.setSvc("UCAST020S");					// 쿼리ID
	trans.setPageRow("9999");					// 1Page에 몇 개의 Row를 출력할 것인가?
	trans.setWiseGrid("1");					// wisegrid를 사용하는 경우 반드시 추가
	trans.setForwardId("wgdsl","");			// wisegrid를 사용하는 경우 반드시 추가
	trans.setUserParams("orderby="+orderByStr);
	trans.setCallBack("callbackqQueryList");
	trans.open("fQuery", "f","/wisegrid.do");
}
/**
 * 평가문항,평가지문항조회콜백
 * svcid  : 서비스ID
 */
function callbackqQueryList(sSvcId)
{
	if(sSvcId=="UCAST020S")
	{try{
		if (getArrayData( fQuery.queryType, "index" )==0)
		{
			//fGrid.ClearGroupMerge();
			oGrid.SetGroupMerge( "mtrl_c_nm,mco,prdt_nm,rnt_nm");
		}
		else
		{
			//oGrid.SetColIndex("rnt_nm",0);
			//alert();
			oGrid.SetGroupMerge( "rnt_nm,mtrl_c_nm,mco,prdt_nm");
		}
	}catch(e){alert(e.description);}
	}
}
//***********************************
// queryList 조회
//***********************************
function queryListMB()
{
	setMode("II");
	actionMode="II";
	if (fmb.btnAddMB)  	fmb.btnAddMB.disabled = false;

	if(f.mtrl_seq.value=="") return;

	var trans = new Trans();
	trans.setSvc("UCAST021S");					// 쿼리ID
	trans.setPageRow("9999");					// 1Page에 몇 개의 Row를 출력할 것인가?
	trans.setWiseGrid("1");					// wisegrid를 사용하는 경우 반드시 추가
	trans.setForwardId("wgdsl","");			// wisegrid를 사용하는 경우 반드시 추가
	trans.setUserParams("mtrl_seq="+f.mtrl_seq.value);
	trans.open("", "fmb","/wisegrid.do");
}

/********************
* 그리드 클릭
********************/
function showDetailO_obj(id, strColumnKey, nRow)
{
	var GridObj;

	if(id=="UCAST020S"){
		GridObj = document.all[id];

		Gridid = id;
		GridstrColumnKey = strColumnKey;
		GridnRow = nRow;

		for(var i=0; i<adetailtxt1.length; i++)
		{
			document.f(adetailtxt1[i]).value = GridObj.GetCellValue(adetailtxt1[i], nRow);
		}
		f.buy_dt.value = checkDate(f.buy_dt.value);
		f.buy_amt.value = moneyMask(f.buy_amt.value);
		f.rnt_dt.value = checkDate(f.rnt_dt.value);
		f.rtn_dt.value = checkDate(f.rtn_dt.value);
		f.mtrl_c_cd.value = GridObj.GetCellValue("mtrl_c_cd", nRow);
		f.rnt_c_cd.value = GridObj.GetCellValue("rnt_c_cd", nRow);

		setMode("S");

		queryListMB();
	}else if(id=="UCAST021S"){
		GridObj = document.all[id];

		for(var i=0; i<adetailtxt2.length; i++)
		{
			document.fmb(adetailtxt2[i]).value = GridObj.GetCellValue(adetailtxt2[i], nRow);
		}
		fmb.buy_dt.value = checkDate(fmb.buy_dt.value);
		fmb.buy_amt.value = moneyMask(fmb.buy_amt.value);
		fmb.mtrl_c_cd.value = GridObj.GetCellValue("mtrl_c_cd", nRow);

		setMode("SS");
		actionMode="SS";

	}
}

//***********************************
// 자재 관리 등록
//***********************************
function Add()
{
	setMode("U");
	setMode("II");
	actionMode="U";
}

//***********************************
// 자재 관리 저장
//***********************************
function Save()
{
	if(f.userid.value == "")
	{
		alert("로그인 정보가 없습니다. 재로그인 하세요.");
		return;
	}
	if(f.mtrl_c_cd.value == "")
	{
		MessageBox("Required", "E", "자재구분");
		f.mtrl_c_cd.focus();
		return;
	}
	if(f.prdt_nm.value == "")
	{
		MessageBox("Required", "E", "제품명");
		f.prdt_nm.focus();
		return;
	}

	if (checkTermDate(f.rnt_dt, f.rtn_dt, true, true) == false) return;

	var svcid = "";
	if(f.mtrl_seq.value == "")
	{
		svcid = "UCAST020I";
	}else
	{
		svcid = "UCAST020U";
	}

	var tran=new Trans();
	tran.setSvc(svcid);
	tran.open("f","","/common.do");
}

//***********************************
// 삭제
//***********************************
function Del()
{
	if(f.userid.value == "")
	{
		alert("로그인 정보가 없습니다. 재로그인 하세요.");
		return;
	}

	if(f.mtrl_seq.value == "")
	{
		MessageBox("NotChecked", "E", "");
		return;
	}

	if(!MessageBox("DelConfirm", "C", "")) return;

	var tran=new Trans();
	tran.setSvc("UCAST021D,UCAST020D");
	tran.setUserParams("mtrl_seq="+f.mtrl_seq.value);
	tran.open("","","/common.do");
}
//***********************************
// 자재 관리 MB등록
//***********************************
function AddMB()
{
	setMode("UU");
	actionMode="UU";
}

//***********************************
// 자재 관리 MB저장
//***********************************
function SaveMB()
{
	if(f.userid.value == "")
	{
		alert("로그인 정보가 없습니다. 재로그인 하세요.");
		return;
	}

	if(fmb.mtrl_c_cd.value == "")
	{
		MessageBox("Required", "E", "자재구분");
		fmb.mtrl_c_cd.focus();
		return;
	}

	if(fmb.prdt_nm.value == "")
	{
		MessageBox("Required", "E", "제품명");
		fmb.prdt_nm.focus();
		return;
	}

	var svcid = "";
	if(actionMode == "UU")
	{
		svcid = "UCAST021I";
	}else
	{
		svcid = "UCAST021U";
	}

	var tran=new Trans();
	tran.setSvc(svcid);
	tran.setUserParams("mtrl_seq="+f.mtrl_seq.value);
	tran.open("fmb","","/common.do");
}

//***********************************
// 삭제 MB
//***********************************
function DelMB()
{
	if(f.userid.value == "")
	{
		alert("로그인 정보가 없습니다. 재로그인 하세요.");
		return;
	}

	if(fmb.sub_mtrl_seq.value == "")
	{
		MessageBox("NotChecked", "E", "");
		return;
	}

	if(!MessageBox("DelConfirm", "C", "")) return;

	var tran=new Trans();
	tran.setSvc("UCAST021D");
	tran.setUserParams("mtrl_seq="+f.mtrl_seq.value+"&sub_mtrl_seq="+fmb.sub_mtrl_seq.value);
	tran.open("","","/common.do");
}

/********************
* CALLBACK
********************/
function callback(sServiceID)
{
	switch (sServiceID)
	{
		case "UCAST020I":
			queryList();
			break;
		case "UCAST020U":
			queryList();
			break;
		case "UCAST021D,UCAST020D":
			queryList();
			break;
		case "UCAST021I":
			queryListMB();
			break;
		case "UCAST021U":
			queryListMB();
			break;
		case "UCAST021D":
			queryListMB();
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

	switch(sType)
	{
		case "I":	//초기화
			var GridObj = document.UCAST020S;
			GridObj.RemoveAllData();

			for(var i=0; i<adetailtxt1.length; i++)
			{
				document.f(adetailtxt1[i]).value = "";
			}
			f.mtrl_c_cd.selectedIndex = 0;
			f.rnt_c_cd.selectedIndex = 1;

			if (f.btnAdd)  		f.btnAdd.disabled = false;
			if (f.btnSave)  	f.btnSave.disabled = true;
			if (f.btnDel)  		f.btnDel.disabled = true;

			break;
		case "II":	//초기화
			var GridObj = document.UCAST021S;
			GridObj.RemoveAllData();

			for(var i=0; i<adetailtxt2.length; i++)
			{
				document.fmb(adetailtxt2[i]).value = "";
			}
			fmb.mtrl_c_cd.selectedIndex = 0;

			if (fmb.btnAddMB)  	fmb.btnAddMB.disabled = true;
			if (fmb.btnSaveMB)  fmb.btnSaveMB.disabled = true;
			if (fmb.btnDelMB)  	fmb.btnDelMB.disabled = true;

			break;
		case "U":	//상세정보 등록

			for(var i=0; i<adetailtxt1.length; i++)
			{
				document.f(adetailtxt1[i]).value = "";
			}
			f.mtrl_c_cd.selectedIndex = 0;
			f.rnt_c_cd.selectedIndex = 1;

			if (f.btnAdd)  		f.btnAdd.disabled = false;
			if (f.btnSave)  	f.btnSave.disabled = false;
			if (f.btnDel)  		f.btnDel.disabled = true;

			break;
		case "UU":	//상세정보 등록
			for(var i=0; i<adetailtxt2.length; i++)
			{
				document.fmb(adetailtxt2[i]).value = "";
			}
			fmb.mtrl_c_cd.selectedIndex = 0;

			if (fmb.btnAddMB)  	fmb.btnAddMB.disabled = false;
			if (fmb.btnSaveMB)  fmb.btnSaveMB.disabled = false;
			if (fmb.btnDelMB)  	fmb.btnDelMB.disabled = true;

			break;
		case "S":	//상세정보 수정
			if (f.btnAdd)  		f.btnAdd.disabled = false;
			if (f.btnSave)  	f.btnSave.disabled = false;
			if (f.btnDel)  		f.btnDel.disabled = false;

			break;
		case "SS":	//상세정보 수정
			if (fmb.btnAddMB)  	fmb.btnAddMB.disabled = false;
			if (fmb.btnSaveMB)  fmb.btnSaveMB.disabled = false;
			if (fmb.btnDelMB)  	fmb.btnDelMB.disabled = false;
			break;
		default:
			break;
	}
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
	g_frm.rnt_id.value = id;
	g_frm.rnt_nm.value = nm;

}

/********************
* 사용자 Clear버튼
********************/
function del_userID(frm)
{
	frm.rnt_id.value = "";
	frm.rnt_nm.value = "";
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