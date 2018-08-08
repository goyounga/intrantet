/**
 * PROJ : Intranet
 * NAME : comChangePwd.js
 * DESC : 비밀번호 변경 자바스크립트
 * Author : 김은수 과장
 * VER  : 1.0
 * Copyright 2009 Nexfron All rights reserved
 * ============================================================================================
 * 								변		경		사		항
 * ============================================================================================
 * VERSION		DATE		AUTHOR		DESCRIPTION
 * ============================================================================================
 * 1.0		2009.09.22		김은수		주석추가
 */
 
var SELECT_ID = "UCCOM028S";
var UPDATE_ID = "UCCOM028U";
/* 
 * 화면 onload시 호출됨.
 */
function init()
{
	f.oldpwd.focus();
}

function login_onKeyPress(flag)
{
	if(window.event.keyCode == 13)
	{
		if(flag == "userid")
		{
			f.oldpwd.select();
		}
		else if(flag == "oldpwd")
		{
			f.newpwd.select();
		}
		else if(flag == "newpwd")
		{
			f.newpwdok.select();
		}
		else if(flag == "newpwdok")
		{
			checkSave();
		}		
	}
}

function checkSave()
{
	if (getValidation(f,true)== false) return false;
	if (pwdValidataion()== false) return false;
	if (!MessageBox("PasswordConfirm", "C", "")) return;	

	var tran = new Trans();
	tran.setSvc(SELECT_ID);
	tran.open("f", "f", "/common.do");
}

function pwdValidataion()
{

	if(f.userid.value == f.newpwd.value)
	{
		MessageBox("LoginErrPassword1", "I", "");
		return false;
	}
	if(f.newpwd.value.length < 6 )
	{
		MessageBox("LoginErrPassword2", "I", "");
		return false;
	}
	var chk1 = /^[a-z\d]{8,12}$/i;  //a-z와 0-9이외의 문자가 있는지 확인
    var chk2 = /[a-z]/i;  //적어도 한개의 a-z 확인
    var chk3 = /\d/;  //적어도 한개의 0-9 확인

	if(!(chk2.test(f.newpwd.value) && chk3.test(f.newpwd.value)))
	{
		MessageBox("LoginErrPassword3", "I", "");
		return false;
	}

	if(f.userid.value == f.newpwd.value)
	{
		MessageBox("LoginErrPassword1", "I", "");
		return false;
	}
	if ( f.newpwd.value != f.newpwdok.value )
	{
		MessageBox("LoginNewPassword", "I", "");
		return false;
	}
	return true;
}

function save()
{
	var tran = new Trans();
	tran.setSvc(UPDATE_ID);
	tran.open("f", "f", "/common.do");
}

function refresh()
{
	f.reset();
}

function pwdclose()
{
	window.close();
}

function checkPWD(pwd)
{
	if ( f.oldpwd.value != pwd )
	{
		MessageBox("LoginPassword", "I", "");
	}
	else 
	{
		save();
	}
}


/**
  * callback()
  */
function callback(sServiceID)
{
	switch (sServiceID)
	{
		case SELECT_ID:
			var size = DataSet.getTotalCount(SELECT_ID);

			if ( size > 0 )
			{
				var userid = DataSet.getParam(SELECT_ID, 1, 0, "user_id");
				var pwd = DataSet.getParam(SELECT_ID, 1, 0, "user_pwd"); 
				checkPWD(pwd);
			}
			else 
			{
				MessageBox("LoginUser", "I", "");
			}
			break;
		case UPDATE_ID:
			pwdclose();
			break;
		default:	
			break;
	}
}
 