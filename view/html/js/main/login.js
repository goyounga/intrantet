/**
 * PROJ : Nexfron Intranet
 * NAME : login.js
 * DESC : LOGIN �ڹٽ�ũ��Ʈ
 * Author : ����� �븮
 * VER  : 1.0
 * Copyright 2009 Nexfron All rights reserved
 * ============================================================================================
 * 								��		��		��		��
 * ============================================================================================
 * VERSION		DATE		AUTHOR		DESCRIPTION
 * ============================================================================================
 * 1.0		2009.08.13		������		�ּ��߰�
 */

var SELECT_ID	= "UCCOMLOGINCHECK";
var LOGIN_ID	= "UCCOMLOGIN";
var WORK_ID		= "UCCOMWORKIN";
var gIP;

/**
 * ONLOAD
 */
function init()
{
	f.user_id.focus();

	var userid = getCookie("ucare_userid");
	var saveid = getCookie("ucare_saveid");

	if (saveid == "Y") {f.saveid.checked = true; }
	else               {f.saveid.checked = false;}

	if(typeof(userid) != "undefined")
	{
		f.user_id.value = userid;
	}

	if ( f.user_id.value.length >0)
	{
		f.user_pwd.focus();
	}
}
/**
 * USER ID ONKEYDOWN
 */
function userid_onkeydown()
{
	if (window.event.keyCode == 13) {setLogin();}
}
/**
 * PWD ONKEYDOWN
 */
function password_onkeydown()
{
	if (window.event.keyCode == 13) {setLogin();}
}
/**
 * LOGIN
 */
function setLogin()
{
	f.user_id.value = f.user_id.value.toUpperCase();

	var trans = new Trans();
	trans.setPageRow("20");
	trans.setSvc(SELECT_ID);
	trans.setCallBack("callbackSetLogin");
	trans.setWait(false);
	trans.open("f", "f","/common.do");
}
/**
 * LOGIN CALLBACK
 */
function callbackSetLogin(dsnm)
{
	switch(dsnm)
	{
		case SELECT_ID :

			if (DataSet.getTotalCount(SELECT_ID) == 0)
			{
				alert("���̵� �������� �ʰų� ��й�ȣ�� ��ġ ���� �ʽ��ϴ�");
				f.user_id.focus();
				return;
			}

			var ht = DataSet.getHashParam(SELECT_ID, 1, 0);

			if(ht.get("use_f") == "N")
			{
				alert("����� �� ���� ���̵��Դϴ�.\n�����ڿ��� �����ϼ���");
				return;
			}

			/*
			//�α��� �Ǿ� �ְ� �����ǰ� ���� ����� IP�� ���� ���
			if (ht.get("loginyn") == "Y" && ht.get("loi_ip") != gIP) {
				if(ht.get("ctiuseyn") == "N") {		//CTI�� ������� �ʴ� ������� ��� �α��� ����
					if(confirm("�̹� �α��ε� ���̵� �Դϴ�.\n\n�α��� �Ͻðڽ��ϱ�?")) {
						main_open();
					}
				}
				else {		//CTI�� ����ϴ� ������ ��� �ٽ� �α��� �� �� ����.
					alert("�̹� �α��ε� ���̵� �Դϴ�.\n\n�����ڿ��� �����ϼ���.");
					return;
				}

			}
			//CTI �α��� ���� ���� ���
			else if(ht.get("ctiuseyn") == "N") {
				f.ctilogin.checked = false;		// CTI�α��� üũ�� �Ͽ��. cti�����ID�� ������ cti�α����� �Ƚ�Ų��.

				if (f.saveid.checked == true) {
					setCookie("ucare_userid", f.user_id.value);
					setCookie("ucare_saveid", (f.saveid.checked?"Y":"N"));
					setCookie("ucare_ctilogin", (f.ctilogin.checked?"Y":"N"));
					setCookie("ucare_userinline", f.user_extno.value);
				}

				var trans = new Trans();
				trans.setSvc(LOGIN_ID+","+WORK_ID);
				trans.setWait(false);
				trans.open("f", "f", "/common.do");
			}
			*/

			if (f.saveid.checked == true)
			{
				setCookie("ucare_userid", f.user_id.value, -1);	//�α���â ĳ����
			}
			else
			{
				setCookie("ucare_userid", "", -1);
			}

			setCookie("ucare_saveid"   , (f.saveid.checked?"Y":"N") , -1);	//�α���â ĳ����
			setCookie("intranet_userid", Nf_Encode(f.user_id.value) , 0);	//�α�������
			main_open();

			break;
/*
		case LOGIN_ID+","+WORK_ID :

			if (DataSet.getParam(LOGIN_ID, 1, 0, "SUCCESS_COUNT") > 0)
			{
				if (f.saveid.checked == true)
				{
					setCookie("ucare_userid"	, f.user_id.value	, -1);
					setCookie("ucare_saveid"	, (f.saveid.checked?"Y":"N")  , -1);
					setCookie("ucare_ctilogin"	, (f.ctilogin.checked?"Y":"N"), -1);
					setCookie("ucare_userinline", f.user_extno.value, -1);
				}
				main_open();
			}
			break;
*/
		default :
			break;
	}
}
/**
 * CALL MAIN
 */
function main_open()
{
	var scrollbar = "no";		//�ػ󵵰� ������ ��ũ�ѹٰ� �����

	if(screen.availHeight < 980) //�۾�ǥ���� �� ��ġ
	{
		scrollbar = "yes, resizable=yes";
	}

	var winW   = 1270;
	var winH   = 940;

    window.open("/jsp/main/main.jsp",'intranet' ,'left=0, top=0, width='+winW+', height='+winH+',status=no,resizable=no,scrollbars=' + scrollbar);
    window.close();
}
/**
 * ��ŰȮ��
 */
function getCookie(uName)
{
	var flag = document.cookie.indexOf(uName+'=');

	if (flag != -1)
	{
		flag += uName.length + 1;
		var end = document.cookie.indexOf(';', flag);

		if (end == -1) end = document.cookie.length;
		return unescape(document.cookie.substring(flag, end));
	}
}
/**
 * ��Ű����
 */
function setCookie(name, value, term)
{
	var today;
	var expire;

	if (term == -1)
	{
		today  = new Date();
		expire = new Date(today.getTime() + 60*60*24*31*1000);
	}

	var cookie = name + "=" + escape(value) + "; path=/;" + ( (expire) ? " expires=" + expire.toGMTString() : "; ");
	document.cookie = cookie;
}
/**
 * ��ȣȭ
 */
function Nf_Encode(sVal)
{
	var codeChar = sVal;
	var strkey = "NE&SH#!K";
	var rtnCodeChar= '';

	//if(sVal == "" || sVal == undefined) return rtnCodeChar;

	for(i=0;i<codeChar.length;++i)
	{
		if( (strkey.charAt(i % strkey.length).charCodeAt(0) ^ codeChar.charAt(i).charCodeAt(0)) == (1^1) ){
			rtnCodeChar += '\0';
		}
		else if( codeChar.charAt(i).charCodeAt(0) == '\0' ){
			rtnCodeChar += strkey.charAt(i % strkey.length);
		}
		else {
			rtnCodeChar += String.fromCharCode( strkey.charAt(i % strkey.length).charCodeAt(0) ^ codeChar.charAt(i).charCodeAt(0) );
		}
	}

	return  rtnCodeChar;
}