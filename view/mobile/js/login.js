/**
 * ONLOAD
 */
function init(mode)
{
	if(mode =="init"){
		var userid = getCookie("ucare_userid");
		var saveid = getCookie("ucare_saveid");

		if (saveid == "Y") {f.saveid.checked = true; }
		else               {f.saveid.checked = false;}
		
		if(typeof(userid) != "undefined" &&  userid.length > 0)
		{
			f.user_id.value = userid;
			f.user_pwd.focus();
		}
	}
	else{
		callbackSetLogin();
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
	var fObj = document.getElementById("f");
	
	if(fObj.user_id.value == "" || fObj.user_id.value == null){
		return alert("아이디를 입력하세요.");
	}
	if(fObj.user_pwd.value == "" || fObj.user_pwd.value == null){
		return alert("비밀번호를 입력하세요.");
	}
	
	if(!fObj.saveid.checked)  fObj.save_chk.value = "N";
	fObj.mode.value = "loginSend";
	fObj.user_id.value = fObj.user_id.value.toUpperCase();
	fObj.action = "login.jsp";
	fObj.submit();
}
/**
 * LOGIN CALLBACK
 */
function callbackSetLogin()
{
	var fObj = document.getElementById("f");
	
	if (fObj.row_cnt.value == 0)
	{
		return alert("아이디가 존재하지 않거나 비밀번호가 일치 하지 않습니다");
	}
	if(fObj.use_f.value == "N")
	{
		return alert("사용할 수 없는 아이디입니다.\n관리자에게 문의하세요");
	}

	if (fObj.save_chk.value == "Y")
	{
		setCookie("ucare_userid", fObj.user_id.value, -1);	//로그인창 캐쉬용
	}
	else
	{
		setCookie("ucare_userid", "", -1);
	}

	setCookie("ucare_saveid"   , fObj.save_chk.value , -1);	//로그인창 캐쉬용
	setCookie("intranet_userid", Nf_Encode(fObj.user_id.value) , 0);	//로그인인증
	
	fObj.action = "board.jsp";
	fObj.submit();
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