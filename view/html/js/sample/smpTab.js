/**
 * PROJ : Intranet
 * NAME : smpTab.js
 * DESC : Tab Tag Sample �ڹٽ�ũ��Ʈ
 * Author : ������ ����
 * VER  : 1.0
 * Copyright 2009 Nexfron All rights reserved
 * ============================================================================================
 * 								��		��		��		��
 * ============================================================================================
 * VERSION		DATE		AUTHOR		DESCRIPTION
 * ============================================================================================
 * 1.0		2009.09.09		������		�ּ��߰�
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