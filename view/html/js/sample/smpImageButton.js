/**
 * PROJ : Intranet
 * NAME : smpImageButton.js
 * DESC : Image Button Tag Sample 자바스크립트
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

var toggle = 0;

function setInit()
{
}

function imageButtonTest()
{
	if (toggle == 0)
	{
		setButton(f.btnActive[0], false);	// 버튼 활성화
		setButton(f.btnActive[1], true);	// 버튼 비활성화
		toggle = 1;
	}
	else
	{
		setButton(f.btnActive[0], true);
		setButton(f.btnActive[1], false);
		toggle = 0;
	}
}