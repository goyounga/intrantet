/**
 * PROJ : Nexfron Intranet
 * NAME : login.js
 * DESC : LOGIN 자바스크립트
 * Author : 정용삼 대리
 * VER  : 1.0
 * Copyright 2009 Nexfron All rights reserved
 * ============================================================================================
 * 								변		경		사		항
 * ============================================================================================
 * VERSION		DATE		AUTHOR		DESCRIPTION
 * ============================================================================================
 * 1.0		2009.08.13		김은수		주석추가
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
				alert("아이디가 존재하지 않거나 비밀번호가 일치 하지 않습니다");
				f.user_id.focus();
				return;
			}

			var ht = DataSet.getHashParam(SELECT_ID, 1, 0);

			if(ht.get("use_f") == "N")
			{
				alert("사용할 수 없는 아이디입니다.\n관리자에게 문의하세요");
				return;
			}

			/*
			//로그인 되어 있고 아이피가 현재 사용자 IP와 같을 경우
			if (ht.get("loginyn") == "Y" && ht.get("loi_ip") != gIP) {
				if(ht.get("ctiuseyn") == "N") {		//CTI를 사용하지 않는 사용자일 경우 로그인 가능
					if(confirm("이미 로그인된 아이디 입니다.\n\n로그인 하시겠습니까?")) {
						main_open();
					}
				}
				else {		//CTI를 사용하는 상담원일 경우 다시 로그인 할 수 없다.
					alert("이미 로그인된 아이디 입니다.\n\n관리자에게 문의하세요.");
					return;
				}

			}
			//CTI 로그인 하지 않을 경우
			else if(ht.get("ctiuseyn") == "N") {
				f.ctilogin.checked = false;		// CTI로그인 체크를 하였어도. cti사용자ID가 없으면 cti로그인을 안시킨다.

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
				setCookie("ucare_userid", f.user_id.value, -1);	//로그인창 캐쉬용
			}
			else
			{
				setCookie("ucare_userid", "", -1);
			}

			setCookie("ucare_saveid"   , (f.saveid.checked?"Y":"N") , -1);	//로그인창 캐쉬용
			setCookie("intranet_userid", Nf_Encode(f.user_id.value) , 0);	//로그인인증
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
	var scrollbar = "no";		//해상도가 작으면 스크롤바가 생긴다

	if(screen.availHeight < 980) //작업표시줄 뺀 수치
	{
		scrollbar = "yes, resizable=yes";
	}

	var winW   = 1270;
	var winH   = 940;

    window.open("/jsp/main/main.jsp",'intranet' ,'left=0, top=0, width='+winW+', height='+winH+',status=no,resizable=no,scrollbars=' + scrollbar);
    window.close();
}
/**
 * 쿠키확인
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
 * 쿠키셋팅
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
 * 암호화
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