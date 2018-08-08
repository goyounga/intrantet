/**
 * PROJ : Nexfron Intranet
 * NAME : dasMain.js
 * DESC : 현황판 - 전광판
 * Author : 박준규 과장
 * VER  : 1.0
 * Copyright 2009 Nexfron All rights reserved
 * ============================================================================================
 * 								변		경		사		항
 * ============================================================================================
 * VERSION		DATE		AUTHOR		DESCRIPTION
 * ============================================================================================
 * 1.0		2010.09.06		박준규		개발
 */
var gnTermTimer=5000;	//기본타이머길이 5초
var gtabidx=0;			//현재 보이는 탭 인덱스
var gTimerId;			//실행중인 타이머 ID
var gaScreenTab;		//전체 화면개수
var gaBtnScreen;		//전체 버튼개수	*** 중요 *** 화면이 늘어나면 각각 쌍으로 버튼도 생성해주어야 한다.
var gaScreenInit;		//화면INIT 쿼리체크
var gnMaxIdx = 0;

/**
 *초기화
 */
function init()
{
	gaScreenTab  = document.all("itab");
	gaBtnScreen  = document.all("btnScreen");
	gnMaxIdx     = gaScreenTab.length-1;
	gaScreenInit = new Array(gaScreenTab.length); //스크린 개수만큼 배열을 생성하여  INIT 쿼리를 체크해준다.
	checkInitQuery(gtabidx);
	startTimer();
}
/**
 * 시작
 */
function startTimer()
{
	var sec = trim(numberMask(f.nTermTimer.value));
	f.nTermTimer.value = sec;

	if(sec.length==0)
	{
		alert("초를 입력하세요.");
		f.nTermTimer.focus();
		return;
	}
	if(parseInt(sec)<1)
	{
		alert("초를 확인하세요");
		f.nTermTimer.focus();
		return;
	}

	f.btnStart.disabled = true;
	f.btnKill.disabled  = false;
	gnTermTimer = parseInt(sec)*1000;
	setTimer();
}
/**
 * 타이머 셋팅
 */
function setTimer()
{
	gTimerId = setInterval( changeScreen, gnTermTimer );
}
/**
 * 화면전환
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
 * 탭변경
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
 * 초기조회
 * 탭이 변할때마다 순서대로 조회를 시작한다.
 * 초기조회가 시작되면 동시에 조회 타이머가 각각 시작된다.
 * 동시에 조회시 에러나는걸 방지하기 위해 텀을 둔다.
 * 아니면 부모창에서 모든쿼리를 한번에 조회하여 각 화면에 보내주는 방식으로 변경하자
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
 * 중지
 */
function stopTimer()
{
	clearInterval(gTimerId);
	f.btnStart.disabled = false;
	f.btnKill.disabled  = true;
}
/**
 * 각화면 조회 타이머 시작
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
 * 각화면 조회 타이머 중지
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
 * 컨트롤 판넬 보이기/감추기
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
 * 컨트롤 판넬 감추기
 */
function hideController()
{
	spnController.style.display="none";
}