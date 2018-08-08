
/**
  * �����ID�� �Ѱ��ش�.
  * return : �����ID
  */
function getSessionInfo(key)
{
	try{
		if(whoAreU == "login") return "";
	}catch(e){}

	var obj = getTopOpener();

	if (obj.whoAreU && obj.whoAreU == "top")
	{
		// obj = getTopOpener(); // �״��
	}
	else
	{
		obj = obj.top;

		if (obj.whoAreU && obj.whoAreU == "top")
		{
			// obj = getTopOpener(); // �״��
		}
		else
		{
			obj = obj.parent.getTopOpener();	//�θ�â���� �ѹ��� �̾��ش�.
			obj = obj.top;
		}
	}

	try
	{
		//���â���� ������ Ȯ��.
		var pOpener = window.dialogArguments;
		if(pOpener) obj = pOpener.top;

	}catch(e){}

	return obj.aSessionArr[key];
}

/**
  * �����ID�� �Ѱ��ش�.
  * return : �����ID
  */
function getUserID()
{	try{
	return getSessionInfo("userId");
	}catch(e){}//openr���� ������ �߻��ϹǷ� �ӽ÷� �̰���trycacht�س��´�.
}

/**
  * ������̸���  �Ѱ��ش�.
  * return : ������̸�
  */
function getUserNM()
{
	return getSessionInfo("userNm");
}

/**
  * ����� ����� �Ѱ��ش�.
  * return : ����� ���
  */
function getGradeCD()
{
	return getSessionInfo("gradeCd");
}

/**
  * ����� CTI �α��� ID�� �Ѱ��ش�.
  * return : ����� CTI �α��� ID
  */
function getCtiLoginId()
{
	return getSessionInfo("ctiLoginId");
}

/**
  * ����� ������ȣ�� �Ѱ��ش�.
  * return : ����� ������ȣ
  */
function getInlnNo()
{
	return getSessionInfo("inlnNo");
}

/**
  * ����� ��ü�ڵ带 �Ѱ��ش�.
  * return : ��ü�ڵ�
  */
function getCorpCD()
{
	return getSessionInfo("corpCd");
}

/**
  * ������� �����ڵ� (ȭ����Ʈ�� ����)
  * code : ������ ���Ͱ� �ƴ� ��� �Ѱ��� �ڵ�
  * return : �����ڵ�
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
  * ����� �Ҽ� �����ڵ带 �Ѱ��ش�.
  * return : ����� �Ҽ� �����ڵ�
  */
function getTeamLCD()
{
	var aArray = document.location.href.split("/");
	if (aArray[4] == "result")
		return "AMWAY-CC";		//��ø� oracle converting�� ����
	else
		return getSessionInfo("teamLcd");
}

/**
  * ����� �Ҽ� ���ڵ带  �Ѱ��ش�.
  * return : ����� �Ҽ� ���ڵ�
  */
function getTeamMCD()
{
	return getSessionInfo("teamMcd");
}

/**
  * ����� �Ҽ� ��Ʈ�ڵ带  �Ѱ��ش�.
  * return : ����� �Ҽ� ��Ʈ�ڵ�
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