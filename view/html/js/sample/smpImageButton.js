/**
 * PROJ : Intranet
 * NAME : smpImageButton.js
 * DESC : Image Button Tag Sample �ڹٽ�ũ��Ʈ
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

var toggle = 0;

function setInit()
{
}

function imageButtonTest()
{
	if (toggle == 0)
	{
		setButton(f.btnActive[0], false);	// ��ư Ȱ��ȭ
		setButton(f.btnActive[1], true);	// ��ư ��Ȱ��ȭ
		toggle = 1;
	}
	else
	{
		setButton(f.btnActive[0], true);
		setButton(f.btnActive[1], false);
		toggle = 0;
	}
}