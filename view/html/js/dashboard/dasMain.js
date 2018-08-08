/**
 * PROJ : Nexfron Intranet
 * NAME : dasMain.js
 * DESC : ��Ȳ�� - ������
 * Author : ���ر� ����
 * VER  : 1.0
 * Copyright 2009 Nexfron All rights reserved
 * ============================================================================================
 * 								��		��		��		��
 * ============================================================================================
 * VERSION		DATE		AUTHOR		DESCRIPTION
 * ============================================================================================
 * 1.0		2010.09.06		���ر�		����
 */
var gnTermTimer=5000;	//�⺻Ÿ�̸ӱ��� 5��
var gtabidx=0;			//���� ���̴� �� �ε���
var gTimerId;			//�������� Ÿ�̸� ID
var gaScreenTab;		//��ü ȭ�鰳��
var gaBtnScreen;		//��ü ��ư����	*** �߿� *** ȭ���� �þ�� ���� ������ ��ư�� �������־�� �Ѵ�.
var gaScreenInit;		//ȭ��INIT ����üũ
var gnMaxIdx = 0;

/**
 *�ʱ�ȭ
 */
function init()
{
	gaScreenTab  = document.all("itab");
	gaBtnScreen  = document.all("btnScreen");
	gnMaxIdx     = gaScreenTab.length-1;
	gaScreenInit = new Array(gaScreenTab.length); //��ũ�� ������ŭ �迭�� �����Ͽ�  INIT ������ üũ���ش�.
	checkInitQuery(gtabidx);
	startTimer();
}
/**
 * ����
 */
function startTimer()
{
	var sec = trim(numberMask(f.nTermTimer.value));
	f.nTermTimer.value = sec;

	if(sec.length==0)
	{
		alert("�ʸ� �Է��ϼ���.");
		f.nTermTimer.focus();
		return;
	}
	if(parseInt(sec)<1)
	{
		alert("�ʸ� Ȯ���ϼ���");
		f.nTermTimer.focus();
		return;
	}

	f.btnStart.disabled = true;
	f.btnKill.disabled  = false;
	gnTermTimer = parseInt(sec)*1000;
	setTimer();
}
/**
 * Ÿ�̸� ����
 */
function setTimer()
{
	gTimerId = setInterval( changeScreen, gnTermTimer );
}
/**
 * ȭ����ȯ
 */
function changeScreen()
{
	var idx = 0;
	if( parseInt(gtabidx) == gnMaxIdx )
	{
		idx = 0;
	}else{
		idx = parseInt(gtabidx) + 1;
	}
	changeTab(idx);
}
/**
 * �Ǻ���
 */
function changeTab(tabidx)
{
	for( var i=0; i<gaScreenTab.length; i++ )
	{
		if( i == parseInt(tabidx) )
		{
			gaScreenTab[i].style.display = "";
			gaBtnScreen[i].disabled      = true;
		}
		else
		{
			gaScreenTab[i].style.display = "none";
			gaBtnScreen[i].disabled      = false;
		}
	}

	gtabidx = tabidx;

	checkInitQuery(gtabidx);
}
/**
 * �ʱ���ȸ
 * ���� ���Ҷ����� ������� ��ȸ�� �����Ѵ�.
 * �ʱ���ȸ�� ���۵Ǹ� ���ÿ� ��ȸ Ÿ�̸Ӱ� ���� ���۵ȴ�.
 * ���ÿ� ��ȸ�� �������°� �����ϱ� ���� ���� �д�.
 * �ƴϸ� �θ�â���� ��������� �ѹ��� ��ȸ�Ͽ� �� ȭ�鿡 �����ִ� ������� ��������
 */
function checkInitQuery(pIdx)
{
	if( gaScreenInit[pIdx]!="OK" )
	{
		switch (pIdx)
		{
			case 0 : ifmScreen1.init(); break;
			case 1 : ifmScreen2.init(); break;
			case 2 : ifmScreen3.init();	break;
			default: break;
		}

		gaScreenInit[pIdx] = "OK";
	}
}
/**
 * ����
 */
function stopTimer()
{
	clearInterval(gTimerId);
	f.btnStart.disabled = false;
	f.btnKill.disabled  = true;
}
/**
 * ��ȭ�� ��ȸ Ÿ�̸� ����
 */
function startQuery()
{
	try{
	ifmScreen1.startTimer();
	ifmScreen2.startTimer();
	ifmScreen3.startTimer();
	}catch(e){alert(e.description);}
	f.btnQuery.disabled  = true;
	f.btnCancel.disabled = false;
}
/**
 * ��ȭ�� ��ȸ Ÿ�̸� ����
 */
function stopQuery()
{
	try{
	ifmScreen1.stopTimer();
	ifmScreen2.stopTimer();
	ifmScreen3.stopTimer();
	}catch(e){alert(e.description);}
	f.btnQuery.disabled  = false;
	f.btnCancel.disabled = true;
}
/**
 * ��Ʈ�� �ǳ� ���̱�/���߱�
 */
function viewController(bl)
{
	if( spnController.style.display == "none" )
	{
		spnController.style.display = "";
	}else{
		spnController.style.display = "none";
	}
}
/**
 * ��Ʈ�� �ǳ� ���߱�
 */
function hideController()
{
	spnController.style.display="none";
}