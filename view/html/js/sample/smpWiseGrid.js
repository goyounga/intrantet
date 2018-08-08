/**
 * PROJ : Intranet
 * NAME : smpWiseGrid.js
 * DESC : WiseGrid Tag Sample 자바스크립트
 * Author : 김은수 과장
 * VER  : 1.0
 * Copyright 2009 Nexfron All rights reserved
 * ============================================================================================
 * 								변		경		사		항
 * ============================================================================================
 * VERSION		DATE		AUTHOR		DESCRIPTION
 * ============================================================================================
 * 1.0		2009.09.08		김은수		주석추가
 */

function setInit()
{
}

function searchCode(dissvc)
{if (getValidation(f, true) == false) return;
	var tran = new Trans();							
	tran.setSvc("SMPCODEBOOKS");	// 쿼리ID
	tran.setDisSvc(dissvc);		// gridID
	tran.setPageRow("9999");		// 1Page에 몇 개의 Row를 출력할 것인가?			
	tran.setWiseGrid("1");			// wisegrid를 사용하는 경우 반드시 추가			
	tran.setForwardId("wgdsl","");	// wisegrid를 사용하는 경우 반드시 추가
	//tran.setDefClick("true");	
	//DEBUG = true;
	tran.open("f", "f","/wisegrid.do");	
}

function testDefClick(dissvc)
{
	var tran = new Trans();							
	tran.setSvc("SMPCODEBOOKS");	// 쿼리ID
	tran.setDisSvc(dissvc);			// gridID
	tran.setPageRow("9999");		// 1Page에 몇 개의 Row를 출력할 것인가?			
	tran.setWiseGrid("1");			// wisegrid를 사용하는 경우 반드시 추가			
	tran.setForwardId("wgdsl","");	// wisegrid를 사용하는 경우 반드시 추가
	tran.setDefClick("true");		// 조회한 후 첫 번째 Row 자동 선택	
	//DEBUG = true;
	tran.open("f", "f","/wisegrid.do");
}

function testPage(dissvc)
{
	var tran = new Trans();							
	tran.setSvc("SMPCODEBOOKS2");	// 쿼리ID
	tran.setDisSvc(dissvc);			// gridID
	tran.setPageRow("10");		// 1Page에 몇 개의 Row를 출력할 것인가?			
	tran.setWiseGrid("1");			// wisegrid를 사용하는 경우 반드시 추가			
	tran.setForwardId("wgdsl","");	// wisegrid를 사용하는 경우 반드시 추가
	//tran.setDefClick("true");		// 조회한 후 첫 번째 Row 자동 선택	
	//DEBUG = true;
	tran.open("f", "f","/wisegrid.do");
}

function testPage2()
{
	var tran = new Trans();							
	tran.setSvc("SMPCODEBOOKS2,SMPCODEBOOKS2");	// 쿼리ID
	tran.setDisSvc("grid55,grid66");			// gridID
	tran.setPageRow("10");		// 1Page에 몇 개의 Row를 출력할 것인가?			
	tran.setWiseGrid("1,1");			// wisegrid를 사용하는 경우 반드시 추가			
	tran.setForwardId("wgdsl","");	// wisegrid를 사용하는 경우 반드시 추가
	//tran.setDefClick("true");		// 조회한 후 첫 번째 Row 자동 선택	
	//DEBUG = true;
	tran.open("f", "f","/wisegrid.do");
}

function callback(dsnm)
{
	//alert("callback => " + dsnm);
}

function wiseCallback(dsnm)
{
	//alert("wiseCallback => " + dsnm);
}

// 마우스 왼쪽 클릭 	: <tr event="O">
function showDetailO_obj(id, strColumnKey, nRow) 
{ 
	// 로직추가 
	alert(id + " / " + strColumnKey + " / " + nRow);
}

// 마우스 왼쪽  더블 클릭 	: <tr event="D">
function showDetailB_obj(id, strColumnKey, nRow) 
{ 
	// 로직추가 
	alert(id + " / " + strColumnKey + " / " + nRow);
} 

// 마우스 오른쪽 클릭: <tr event="R">
function showDetailR_obj(id, strColumnKey, nRow)
{ 
	// 로직추가 
	alert(id + " / " + strColumnKey + " / " + nRow);
}	

// Cell Change: <tr event="C">
function showDetailC_obj(id, strColumnKey, nRow, vtOldValue, vtNewValue) 
{ 
	// 로직추가
	alert(id + " / " + strColumnKey + " / " + nRow + " / " + vtOldValue + " / " + vtNewValue); 
}

// Combobox Change: <tr event="S">
function showDetailS_obj(id, strColumnKey, nRow, nOldIndex, nNewIndex) 
{ 
	// 로직추가 
	alert(id + " / " + strColumnKey + " / " + nRow + " / " + nOldIndex + " / " + nNewIndex); 
}
