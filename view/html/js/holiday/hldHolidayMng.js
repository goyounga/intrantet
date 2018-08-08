/**
 * PROJ : Nexfron Intranet
 * NAME : hldHolidayMng.js
 * DESC : 휴가관리 자바스크립트
 * Author : 김은수 과장
 * VER  : 1.0
 * Copyright 2009 Nexfron All rights reserved
 * ============================================================================================
 * 								변		경		사		항
 * ============================================================================================
 * VERSION		DATE		AUTHOR		DESCRIPTION
 * ============================================================================================
 * 1.0		2009.08.14		김은수		주석추가
 */
 
var SELECT_SERVICE_01 	= "UCHLD010S";
var SELECT_SERVICE_02 	= "UCHLD011S";
var SELECT_SERVICE_03 	= "UCHLD012S";
var SELECT_SERVICE_04 	= "UCHLD011S,UCHLD012S";
var DELETE_SERVICE_01	= "UCHLD010D";
var DELETE_SERVICE_02	= "UCHLD012D";
var SAVE_SERVICE_01		= "UCHLD010I,UCHLD010U";

/**
*	화면 로딩
* author  lee,chang-uk   
* since   2009/06/22 	                                              
*/ 
function on_Load()
{
	var g_Obj1 = document.all(SELECT_SERVICE_01);
	
	// 콤보 박스
	g_Obj1.SetColButtonDisplayStyle('ddct_f_cd','always');
	g_Obj1.SetColButtonDisplayStyle('hf_hldy_f_cd','always');
	
	//이번 년도 셋팅
	f1.q_bse_y.value = f1.q_today.value;
	
	//g_Obj.SetNumberFormat('hldy_dy','#,###.#');
	
	on_Search();
	//setComboOptions();
}

/** 
* 조회 기간 초기화
* author  lee,chang-uk   
* since   2009/06/18 	                                              
*/  
function initPeriod()
{
	fQuery.q_date_from.value = getUserDate(0, "-");
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
		
	var trans = new Trans();
	trans.setPageRow(-1);
	trans.setSvc(SELECT_SERVICE_01);
	trans.setDefClick(true);
	trans.setWiseGrid("1");
	trans.setForwardId("wgdsl","");
	trans.open("fQuery","f","/wisegrid.do");
}

/** 
* 사용자 조회
* author  lee,chang-uk   
* since   2009/06/18 	                                              
*/ 
function on_UserSearch()
{
	if( getValidation(f1, true) == false ) return false;
		
	if( f1.searchType.value == "usernm" )
	{
		f1.q_usernm.value = f1.searchText.value;
		f1.q_userid.value = "";
	}
	else
	{
		f1.q_userid.value = f1.searchText.value;
		f1.q_usernm.value = "";
	}
	
	var trans = new Trans();
	trans.setPageRow(-1);
	trans.setSvc(SELECT_SERVICE_04);
	trans.setDefClick(true);
	trans.setWiseGrid("1,1");
	trans.setForwardId("wgdsl","");
	trans.open("f1","f1","/wisegrid.do");
}

/** 
* 휴가 종류 저장
* author  lee,chang-uk   
* since   2009/06/22	                                              
*/ 
function fn_HolidayKindSave()
{
	var b_chkCrud = true;
	var g_Obj = document.all(SELECT_SERVICE_01);
	
	if( g_Obj.GetRowCount() <= 0 )
	{
		alert("조회된 데이터가 존재하지 않습니다.");
		return;
	}
	
	for( var i = 0; i < g_Obj.GetRowCount(); i++ )
	{		
		if( g_Obj.GetCellHiddenValue("CRUD", i) == "U" || g_Obj.GetCellHiddenValue("CRUD", i) == "C" )
		{	
			if( g_Obj.GetCellValue("hldy_knd_nm", i) == "" )
			{
				alert("휴가종류명은 필수 입력입니다.");
				return;
			}
			if( g_Obj.GetCellValue("hf_hldy_f_cd", i) == "" )
			{
				alert("반휴여부은 필수 입력입니다.");
				return;
			}
			if( g_Obj.GetCellValue("hldy_dy", i) == "" )
			{
				alert("휴가일수는 필수 입력입니다.");
				return;
			}
			if( g_Obj.GetCellHiddenValue("ddct_f_cd", i) == "" )
			{
				alert("휴가일수차감여부는 필수 입력입니다.");
				return;
			}
			
			b_chkCrud = false;
		}
	}
	
	if( b_chkCrud )
	{
		alert("변경된 데이터가 존재하지 않습니다.");
		return;
	}

	var trans = new Trans();
	trans.setSvc(SELECT_SERVICE_01);
	trans.setMode("save"); 
	trans.setWiseGrid("1");
	trans.setForwardId("wgdsl","");
	trans.setSaveAutoSelect("true");
	trans.open("fQuery","f","/wisegrid.do");
}

/** 
* 휴가 종류 삭제
* author  lee,chang-uk   
* since   2009/06/22
*/
function fn_HolidayKindDelete()
{
	var params	= "";
	var i_chkCnt = 0;
	
	var g_Obj = document.all(SELECT_SERVICE_01);
	
	if( g_Obj.GetRowCount() <= 0 )
	{
		alert("조회된 데이터가 존재 하지 않습니다.");
		return;
	}
	
	for(j = g_Obj.GetRowCount()-1; j >= 0; j--)
	{
		if( g_Obj.GetCellValue("chk", j) == 1 && g_Obj.GetCellHiddenValue("CRUD", j) == "C" )
		{
			g_Obj.DeleteRow(j, false);
		}
	}
	
	for( var i = 0; i < g_Obj.GetRowCount(); i++ )
	{		
		if( g_Obj.GetCellValue("chk", i) == 1 )
		{
			params	+= "&hldy_knd_seq=" + g_Obj.GetCellValue("hldy_knd_seq", i) ;
			
			i_chkCnt++;
		}
	}
	
	if( i_chkCnt <= 0 )
	{
		alert("선택된 데이터가 존재하지 않습니다.");
		return;
	}
	
	if( !confirm("휴가 종류를 삭제 하시겠습니까?") )
	{
		return;
	}
	
	var trans = new Trans();
	trans.setSvc(DELETE_SERVICE_01);
	trans.setUserParams(params);
	trans.open("f","f","/common.do");
	
}

/** 
* 휴가 일수 저장
* author  lee,chang-uk   
* since   2009/06/22	                                              
*/ 
function fn_HolidayDaySave()
{
	var b_chkCrud = true;
	var g_Obj = document.all(SELECT_SERVICE_03);
	/*
	if( g_Obj.GetRowCount() <= 0 )
	{
		alert("조회된 데이터가 존재하지 않습니다.");
		return;
	}
	*/
	for( var i = 0; i < g_Obj.GetRowCount(); i++ )
	{		
		if( g_Obj.GetCellHiddenValue("CRUD", i) == "U" || g_Obj.GetCellHiddenValue("CRUD", i) == "C" )
		{	
			if( g_Obj.GetCellHiddenValue("bse_y", i) == "" )
			{
				alert("적용년도는 필수 입력입니다.");
				return;
			}
			if( g_Obj.GetCellValue("pmt_dy", i) == "" )
			{
				alert("지급일수는 필수 입력입니다.");
				return;
			}
			//사용일수가 지급일수보다 클 경우 에러
			if( Number(g_Obj.GetCellValue("use_dy", i)) > Number(g_Obj.GetCellValue("pmt_dy", i)))
			{
				alert("사용일수가 지급일수보다 큽니다.");
				return;
			}
			
			b_chkCrud = false;
		}
	}
	
	if( b_chkCrud )
	{
		alert("변경된 데이터가 존재하지 않습니다.");
		return;
	}

	var trans = new Trans();
	trans.setSvc(SELECT_SERVICE_03);
	trans.setPageRow(-1);
	trans.setMode("save"); 
	trans.setWiseGrid("1");
	trans.setForwardId("wgdsl","");
	trans.setSaveAutoSelect("true");
	trans.open("f1","f1","/wisegrid.do");
}

/** 
* 휴가 지급일 삭제
* author  lee,chang-uk   
* since   2009/06/22
*/
function fn_HolidayDelete()
{
	var params	= "";
	var i_chkCnt = 0;
	
	var g_Obj = document.all("UCHLD012S");
	
	if( g_Obj.GetRowCount() <= 0 )
	{
		alert("조회된 데이터가 존재 하지 않습니다.");
		return;
	}
	
	for( var i = 0; i < g_Obj.GetRowCount(); i++ )
	{		
		if( g_Obj.GetCellValue("chk", i) == 1 )
		{
			params	+= "&bse_y=" + g_Obj.GetCellHiddenValue("bse_y", i) ;
			params	+= "&hldy_id=" + g_Obj.GetCellValue("user_id", i) ;
			
			i_chkCnt++;
		}
	}
	
	if( i_chkCnt <= 0 )
	{
		alert("선택된 데이터가 존재하지 않습니다.");
		return;
	}
	
	if( !confirm("삭제 하시겠습니까?") )
	{
		return;
	}
	
	var trans = new Trans();
	trans.setSvc(DELETE_SERVICE_02);
	trans.setUserParams(params);
	trans.open("f1","f1","/common.do");
	
}

/** 
* 저장후 콜백(/common.do)
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
			
			document.all(SELECT_SERVICE_01).RemoveAllData();
		}
		
		if( document.all(SELECT_SERVICE_02).GetRowCount() <= 0 )
		{
			on_UserSearch();
		}
	}
	if( serviceId == SELECT_SERVICE_02 )
	{
		if( DataSet.getTotalCount(serviceId) <= 0 )
		{
			f.reset();
			
			document.all(SELECT_SERVICE_02).RemoveAllData();
		}
	}
	else if( serviceId == DELETE_SERVICE_01 )
	{
		if( DataSet.getParam(serviceId, 1, 0, "SUCCESS_COUNT") > 0  )
		{
			on_Search();
		}
	}
	else if( serviceId == DELETE_SERVICE_02 )
	{
		if( DataSet.getParam(serviceId, 1, 0, "SUCCESS_COUNT") > 0  )
		{
			on_UserSearch();		
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
	//showDetail(id, document.all(SELECT_SERVICE_01).GetActiveRowIndex(), f);
}

/** 
* 지출 내역 그리드 ROW 추가
* author  lee,chang-uk   
* since   2009/06/18 	                                              
*/ 
function fn_HolidayKindAdd()
{
	document.all(SELECT_SERVICE_01).AddRow();
} 

/** 
* 기준년 셋팅
* author  lee,chang-uk   
* since   2009/06/18 	                                              
*/ 
function setComboOptions()
{
	var datNow		= new Date();
	var strYear		= datNow.getYear();
	var strMonth	= datNow.getMonth() + 1;
	
	var objYear 	= f1.q_bse_y;
	
	var iYindex		= objYear.options.length;
	
	for( var i = 2009; i < Number(strYear) + 10; i++ )
	{
		objYear.options[iYindex++] = new Option(i + "년", i, false, false) ;
	}
}

/** 
* 그리드 데이터 이동
* author  lee,chang-uk   
* since   2009/06/18 	                                              
*/ 
function moveData(fromGridObj, toGridObj)
{
	var b_nDelData = false;
	
	if(!chkSelected(fromGridObj))
	{
		alert("선택된 건이 없습니다.");
		return;
	}

	for(i = 0; i < fromGridObj.GetRowCount(); i++)
	{
		if( fromGridObj.id == SELECT_SERVICE_03 )
		{
			if(fromGridObj.GetCellValue("chk", i) == "1" && fromGridObj.GetCellHiddenValue("CRUD", i) == "C" )
			{
				toGridObj.AddRow();
				
				for(j = 0; j < toGridObj.GetColCount(); j++)
				{
					if( toGridObj.GetColHDKey(j) == "user_id" || toGridObj.GetColHDKey(j) == "user_nm")
					{
						toGridObj.SetCellValue(toGridObj.GetColHDKey(j), toGridObj.GetRowCount()-1, fromGridObj.GetCellValue(toGridObj.GetColHDKey(j), i));
						//toGridObj.SetCellBgColor(toGridObj.GetColHDKey(j), toGridObj.GetRowCount()-1, "255|255|255");
					}
					else if(toGridObj.GetColHDKey(j) == "bse_y")
					{
						toGridObj.SetCellValue(toGridObj.GetColHDKey(j), toGridObj.GetRowCount()-1, fromGridObj.GetComboHiddenValue(toGridObj.GetColHDKey(j), fromGridObj.GetComboSelectedIndex(toGridObj.GetColHDKey(j), i)));
					}
				}	
				//toGridObj.SetCellHiddenValue("CRUD", toGridObj.GetRowCount()-1, "U");
			}
		}
		else
		{
			if(fromGridObj.GetCellValue("chk", i) == "1")
			{
				toGridObj.AddRow();
				
				for(j = 0; j < toGridObj.GetColCount(); j++)
				{
					if( toGridObj.GetColHDKey(j) == "user_id" || toGridObj.GetColHDKey(j) == "user_nm")
					{
						toGridObj.SetCellValue(toGridObj.GetColHDKey(j), toGridObj.GetRowCount()-1, fromGridObj.GetCellValue(toGridObj.GetColHDKey(j), i));
						//toGridObj.SetCellBgColor(toGridObj.GetColHDKey(j), toGridObj.GetRowCount()-1, "255|255|255");
					}
					else if(toGridObj.GetColHDKey(j) == "bse_y")
					{
						toGridObj.SetComboSelectedHiddenValue(toGridObj.GetColHDKey(j), toGridObj.GetRowCount()-1, fromGridObj.GetCellValue(toGridObj.GetColHDKey(j), i));
					}
				}	
				//toGridObj.SetCellHiddenValue("CRUD", toGridObj.GetRowCount()-1, "U");
			}
		}
	}
	
	for(i = fromGridObj.GetRowCount()-1; i >= 0; i--)
	{
		if( fromGridObj.id == SELECT_SERVICE_03 )
		{
			if( fromGridObj.GetCellValue("chk", i) == "1" && ( fromGridObj.GetCellHiddenValue("CRUD", i) == "R" ||  fromGridObj.GetCellHiddenValue("CRUD", i) == "U") )
			{
				b_nDelData = true;
			}
			
			if( fromGridObj.GetCellValue("chk", i) == "1" && fromGridObj.GetCellHiddenValue("CRUD", i) == "C" )
			{
				fromGridObj.DeleteRow(i, false);
			}
			
		}
		else
		{
			if( fromGridObj.GetCellValue("chk", i) == "1" )
			{
				fromGridObj.DeleteRow(i, false);
			}
		}
	}
	
	if( b_nDelData ) alert("기존에 등록된 사용자는 이동이 불가능합니다.");
}


/** 
* 그리드 체크박스 체크
* author  lee,chang-uk   
* since   2009/06/18 	                                              
*/  
function chkSelected(GridObj)
{
	for(i = 0; i < GridObj.GetRowCount(); i++)
	{
		if(GridObj.GetCellValue("chk", i) == "1")
		{
			return true;
		}
	}
	return false;
}

/** 
* 일괄지정
* author  lee,chang-uk   
* since   2009/06/18 	                                              
*/ 
function fn_setLump()
{
	
	var g_Obj 	= document.all(SELECT_SERVICE_03);
	var frm_Obj = f1.lumpDay;

	if( frm_Obj.value == "" )
	{
		alert("일괄 지정 일수를 입력하세요.");
		frm_Obj.focus();
		return;	
	}
	
	if( isNaN(frm_Obj.value) )
	{
		alert("숫자만 입력하세요.");
		frm_Obj.value = "";
		frm_Obj.focus();		
		return;
	}
	
	if( g_Obj.GetRowCount() <= 0 )
	{
		alert("반영할 데이터가 존재하지 않습니다.");
		return;
	}
	
	for( var i = 0; i < g_Obj.GetRowCount(); i++ )
	{
		if( g_Obj.GetCellHiddenValue("CRUD", i) == "C" )
		{
			g_Obj.SetCellValue('pmt_dy', i, frm_Obj.value);
		}
	}
}

/** 
* 일괄 지정 일수 체크
* author  lee,chang-uk   
* since   2009/06/18 	                                              
*/ 
function fn_chkDay(obj)
{
	if(isNaN(obj.value))
	{
		alert("숫자만 입력하세요.");
		obj.value = "";
		obj.focus();		
		return false;
	}
}