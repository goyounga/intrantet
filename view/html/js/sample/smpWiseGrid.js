/**
 * PROJ : Intranet
 * NAME : smpWiseGrid.js
 * DESC : WiseGrid Tag Sample �ڹٽ�ũ��Ʈ
 * Author : ������ ����
 * VER  : 1.0
 * Copyright 2009 Nexfron All rights reserved
 * ============================================================================================
 * 								��		��		��		��
 * ============================================================================================
 * VERSION		DATE		AUTHOR		DESCRIPTION
 * ============================================================================================
 * 1.0		2009.09.08		������		�ּ��߰�
 */

function setInit()
{
}

function searchCode(dissvc)
{if (getValidation(f, true) == false) return;
	var tran = new Trans();							
	tran.setSvc("SMPCODEBOOKS");	// ����ID
	tran.setDisSvc(dissvc);		// gridID
	tran.setPageRow("9999");		// 1Page�� �� ���� Row�� ����� ���ΰ�?			
	tran.setWiseGrid("1");			// wisegrid�� ����ϴ� ��� �ݵ�� �߰�			
	tran.setForwardId("wgdsl","");	// wisegrid�� ����ϴ� ��� �ݵ�� �߰�
	//tran.setDefClick("true");	
	//DEBUG = true;
	tran.open("f", "f","/wisegrid.do");	
}

function testDefClick(dissvc)
{
	var tran = new Trans();							
	tran.setSvc("SMPCODEBOOKS");	// ����ID
	tran.setDisSvc(dissvc);			// gridID
	tran.setPageRow("9999");		// 1Page�� �� ���� Row�� ����� ���ΰ�?			
	tran.setWiseGrid("1");			// wisegrid�� ����ϴ� ��� �ݵ�� �߰�			
	tran.setForwardId("wgdsl","");	// wisegrid�� ����ϴ� ��� �ݵ�� �߰�
	tran.setDefClick("true");		// ��ȸ�� �� ù ��° Row �ڵ� ����	
	//DEBUG = true;
	tran.open("f", "f","/wisegrid.do");
}

function testPage(dissvc)
{
	var tran = new Trans();							
	tran.setSvc("SMPCODEBOOKS2");	// ����ID
	tran.setDisSvc(dissvc);			// gridID
	tran.setPageRow("10");		// 1Page�� �� ���� Row�� ����� ���ΰ�?			
	tran.setWiseGrid("1");			// wisegrid�� ����ϴ� ��� �ݵ�� �߰�			
	tran.setForwardId("wgdsl","");	// wisegrid�� ����ϴ� ��� �ݵ�� �߰�
	//tran.setDefClick("true");		// ��ȸ�� �� ù ��° Row �ڵ� ����	
	//DEBUG = true;
	tran.open("f", "f","/wisegrid.do");
}

function testPage2()
{
	var tran = new Trans();							
	tran.setSvc("SMPCODEBOOKS2,SMPCODEBOOKS2");	// ����ID
	tran.setDisSvc("grid55,grid66");			// gridID
	tran.setPageRow("10");		// 1Page�� �� ���� Row�� ����� ���ΰ�?			
	tran.setWiseGrid("1,1");			// wisegrid�� ����ϴ� ��� �ݵ�� �߰�			
	tran.setForwardId("wgdsl","");	// wisegrid�� ����ϴ� ��� �ݵ�� �߰�
	//tran.setDefClick("true");		// ��ȸ�� �� ù ��° Row �ڵ� ����	
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

// ���콺 ���� Ŭ�� 	: <tr event="O">
function showDetailO_obj(id, strColumnKey, nRow) 
{ 
	// �����߰� 
	alert(id + " / " + strColumnKey + " / " + nRow);
}

// ���콺 ����  ���� Ŭ�� 	: <tr event="D">
function showDetailB_obj(id, strColumnKey, nRow) 
{ 
	// �����߰� 
	alert(id + " / " + strColumnKey + " / " + nRow);
} 

// ���콺 ������ Ŭ��: <tr event="R">
function showDetailR_obj(id, strColumnKey, nRow)
{ 
	// �����߰� 
	alert(id + " / " + strColumnKey + " / " + nRow);
}	

// Cell Change: <tr event="C">
function showDetailC_obj(id, strColumnKey, nRow, vtOldValue, vtNewValue) 
{ 
	// �����߰�
	alert(id + " / " + strColumnKey + " / " + nRow + " / " + vtOldValue + " / " + vtNewValue); 
}

// Combobox Change: <tr event="S">
function showDetailS_obj(id, strColumnKey, nRow, nOldIndex, nNewIndex) 
{ 
	// �����߰� 
	alert(id + " / " + strColumnKey + " / " + nRow + " / " + nOldIndex + " / " + nNewIndex); 
}
