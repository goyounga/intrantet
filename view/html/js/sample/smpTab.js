/**
 * PROJ : Intranet
 * NAME : smpTab.js
 * DESC : Tab Tag Sample 자바스크립트
 * Author : 김은수 과장
 * VER  : 1.0
 * Copyright 2009 Nexfron All rights reserved
 * ============================================================================================
 * 								변		경		사		항
 * ============================================================================================
 * VERSION		DATE		AUTHOR		DESCRIPTION
 * ============================================================================================
 * 1.0		2009.09.09		김은수		주석추가
 */
 
function tabsample1_onclick(index)
{
	for (var i=0; i < tabview.length; i++)
	{	
		tabview[i].style.display = "none";
	}
		
	tabview[index].style.display = "";
}

 
function tabsample2_onclick(index)
{
	for (var i=0; i < tabview2.length; i++)
	{	
		tabview2[i].style.display = "none";
	}
		
	tabview2[index].style.display = "";
}


function tabsample3_onclick(index)
{
	for (var i=0; i < vtabview.length; i++)
	{	
		vtabview[i].style.display = "none";
	}
		
	vtabview[index].style.display = "";
}