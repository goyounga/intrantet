
/**
  * 사용자ID를 넘겨준다.
  * return : 사용자ID
  */
function getSessionInfo(key)
{
	try{
		if(whoAreU == "login") return "";
	}catch(e){}

	var obj = getTopOpener();

	if (obj.whoAreU && obj.whoAreU == "top")
	{
		// obj = getTopOpener(); // 그대로
	}
	else
	{
		obj = obj.top;

		if (obj.whoAreU && obj.whoAreU == "top")
		{
			// obj = getTopOpener(); // 그대로
		}
		else
		{
			obj = obj.parent.getTopOpener();	//부모창에서 한번더 뽑아준다.
			obj = obj.top;
		}
	}

	try
	{
		//모달창으로 떴는지 확인.
		var pOpener = window.dialogArguments;
		if(pOpener) obj = pOpener.top;

	}catch(e){}

	return obj.aSessionArr[key];
}

/**
  * 사용자ID를 넘겨준다.
  * return : 사용자ID
  */
function getUserID()
{	try{
	return getSessionInfo("userId");
	}catch(e){}//openr에서 오류가 발생하므로 임시로 이곳만trycacht해놓는다.
}

/**
  * 사용자이름을  넘겨준다.
  * return : 사용자이름
  */
function getUserNM()
{
	return getSessionInfo("userNm");
}

/**
  * 사용자 등급을 넘겨준다.
  * return : 사용자 등급
  */
function getGradeCD()
{
	return getSessionInfo("gradeCd");
}

/**
  * 사용자 CTI 로그인 ID를 넘겨준다.
  * return : 사용자 CTI 로그인 ID
  */
function getCtiLoginId()
{
	return getSessionInfo("ctiLoginId");
}

/**
  * 사용자 내선번호를 넘겨준다.
  * return : 사용자 내선번호
  */
function getInlnNo()
{
	return getSessionInfo("inlnNo");
}

/**
  * 사용자 업체코드를 넘겨준다.
  * return : 업체코드
  */
function getCorpCD()
{
	return getSessionInfo("corpCd");
}

/**
  * 사용자의 센터코드 (화면컨트롤 용임)
  * code : 지정된 센터가 아닐 경우 넘겨줄 코드
  * return : 센터코드
  */
function getCenterView(code)
{
	var centercd = getSessionInfo("cntrcd");
	switch(centercd)
	{
		case "JO"	:
		case "AC"	:
			return centercd;
		default		:
			return code;
	}
}

/**
  * 사용자 소속 센터코드를 넘겨준다.
  * return : 사용자 소속 센터코드
  */
function getTeamLCD()
{
	var aArray = document.location.href.split("/");
	if (aArray[4] == "result")
		return "AMWAY-CC";		//잠시만 oracle converting후 제거
	else
		return getSessionInfo("teamLcd");
}

/**
  * 사용자 소속 팀코드를  넘겨준다.
  * return : 사용자 소속 팀코드
  */
function getTeamMCD()
{
	return getSessionInfo("teamMcd");
}

/**
  * 사용자 소속 파트코드를  넘겨준다.
  * return : 사용자 소속 파트코드
  */
function getTeamSCD()
{
	return getSessionInfo("teamScd");
}

function getLoginDate()
{
	return getSessionInfo("logindate");
}

function getToday()
{
	return today;
}