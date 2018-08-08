/**
 * PROJECT : Nexfron Intranet
 * NAME    : comMailSendP.js
 * DESC    : 메일발송
 * AUTHOR  : 박준규 과장
 * VERSION : 1.0
 * Copyright ⓒ 2012 Nexfron. All rights reserved.
 * ============================================================================================
 * 							변		경		사		항
 * ============================================================================================
 * VERSION	   DATE		  	AUTHOR		DESCRIPTION
 * ============================================================================================
 * 1.0		2012.04.08		박준규		개발
 */
_editor_url = "/screditor/";
/**
 * 초기화
 */
function init()
{
	f.userid.value 	 = opener.top.f.userid.value;
	f.username.value = opener.top.f.usernm.value;
	f.em_addr.value  = opener.top.f.em_addr.value;
	editor_generate("email_cntn");
}
/**
 * 화면 초기화
 */
function resetAll()
{
	delMailAddress();
	f.email_receiver.value		= "";
	f.email_type.selectedIndex 	= 0;
	f.email_title.value			= "";
	f.email_cntn.value			= "";
	editor_setHTML("email_cntn", "");
}
/**
 * 메일발송
 */
function sendMail()
{
	var receive_value = getReceiveValue();
	if(receive_value=="")
	{
		MessageBox("", "E", "수신 이메일을 입력해 주세요.");
		f.email_receiver.focus();
		return;
	}
	if(trim(f.email_title.value)=="")
	{
		MessageBox("", "E", "제목을 입력해 주세요.");
		f.email_title.focus();
		return;
	}

	if( f.email_cntn.value =="<P>&nbsp;</P>" ){ f.email_cntn.value = "";}	//에디터에서는 전부 지워지지 않는다.
	if(trim(f.email_cntn.value)=="")
	{
		MessageBox("", "E", "내용을 입력해 주세요.");
		return;
	}

	if(!MessageBox("", "C", "메일을 발송 하시겠습니까?")) return;

	var title = "["+f.username.value+"님이 보낸 메일]";
	title	 += f.email_type[f.email_type.selectedIndex].text;
	title	 += f.email_title.value;

	if(trim(f.em_addr.value)!="")
	{
		receive_value += (","+f.em_addr.value);	//보낸메일을 확인할수 없으므로 자신에게도 메일을 발신한다.
	}

	var tran=new Trans();
	tran.setSvc("SENDMAIL");
	tran.setSvcType("");
	tran.setForwardId("mailresult"		, "");
//	tran.setMyUserParams("mail_id"		, "nexfron");
//	tran.setMyUserParams("mail_pwd"		, "비밀번호");
	tran.setMyUserParams("mail_from"	, f.em_addr.value);//기능하지 않는다.
	tran.setMyUserParams("mail_to"		, receive_value);//자신을 추가한다.
    tran.setMyUserParams("mail_subject"	, title);//자신을 표기한다.
    tran.setMyUserParams("mail_content"	, f.email_cntn.value);
	tran.setCallBack("callbackSendMail");
	tran.setDataSetMode("N");	//??? 중요, 반드시 설정
    tran.open("","","/mail.do");
}
/**
 * 콜백 - 메일발송
 */
function callbackSendMail(sSvc)
{
	if (DataSet.getParam(sSvc, 1, 0 , "resultcd") == "0")
	{
		MessageBox("","I","메일이 발송 되었습니다.");
		window.close();
	}else{
		MessageBox("","E","메일 발송에 실패하였습니다. errCode["+DataSet.getParam(sSvc, 1, 0 , "resultcd")+"]");
	}
}
/**
 * 받는사람 얻기
 */
function getReceiveValue()
{
	var receiver_list = document.getElementById("divReceiver");
	var receive_value = "";

	if(receiver_list.hasChildNodes())
	{
		var receiver = receiver_list.childNodes;
		for ( var i=0; i<receiver.length; i++ )
		{
			receive_value += (","+ receiver[i].getAttribute("receive-value"));
		}
		receive_value = receive_value.substr(1);
	}

	return receive_value;
}
/**
 * 받는사람 얻기
 */
function getReceiver()
{
	var receiver_list = document.getElementById("divReceiver");

	var receive_value = "";
	var receive_name  = "";

	var arrReceiver	  = new Array(2);
	arrReceiver[0] 	  = "";
	arrReceiver[1] 	  = "";

	if(receiver_list.hasChildNodes())
	{
		var receiver = receiver_list.childNodes;
		for ( var i=0; i<receiver.length; i++ )
		{
			receive_value += (""+ receiver[i].getAttribute("receive-value"));
			receive_name  += (""+ receiver[i].getAttribute("receive-name"));
		}
		receive_value 	= receive_value.substr(1);
		receive_name 	= receive_name.substr(1);

		arrReceiver[0] 	= receive_value;
		arrReceiver[1] 	= receive_name;
	}

	return arrReceiver;
}
/**
 * 주소록 오픈
 */
function openOrgAddress()
{
	var receiver_list = getReceiver();
	setPopupParamInfo("comMailSendAddressP", receiver_list);
	openPopup("/jsp/common/comMailSendAddressP.jsp", "job=SETRECEIVER", "comMailSendAddressP", "", "", 850, 650, "toolbar=no,scrollbars=no", "");
}
/**
 * UUtil.openPopup전 팝업 화면에 넘겨줄 파라미터를 설정한다.
 * sWinKey  : 팝업 창 이름 (ex: "cmnUsrFnd")
 * aParams  : 파람 배열
 */
var hsPopupParamInfo = new Hashtable();
function setPopupParamInfo(sWinKey, aParams)
{
	if( hsPopupParamInfo.get(sWinKey) != "" )
	{
		hsPopupParamInfo.remove(sWinKey);
	}

	hsPopupParamInfo.put(sWinKey, aParams);
}
/**
 * UUtil.openPopup 전에 셋팅한 파라미터 정보를 얻는다.
 * sWinKey  : 팝업 창 이름 (ex: "cmnUsrFnd")
 * rtnArrayVal 	: sWinKey에 해당하는 값 Array
 */
function getPopupParamInfo(sWinKey)
{
    var rtnArrayVal = new Array();
	try{
		rtnArrayVal = hsPopupParamInfo.get(sWinKey);
	}catch(e){}
	return rtnArrayVal;
}
/**
 * 주소록 받기
 */
function setOrgAddress(job, arrReceiver)
{
	if(job=="SETRECEIVER")
	{
		delMailAddress();

		var receive_value = arrReceiver[0].split("");
		var receive_name  = arrReceiver[1].split("");

		for ( var i=0; i<receive_value.length; i++ )
		{
			if(receive_value[i]!="")//값이 없어도 split 하면 배열이 1개가 된다.
			{try{
				setOrgValue(receive_value[i], receive_name[i]);
			}catch(e){alert(e.description);}
			}
		}
	}
}
/**
 * 받는사람 셋팅
 */
function setOrgValue(strRcvValue,strRcvName)
{
	if( !document.getElementById("spn_"+strRcvValue) )
	{
		var receiver_list 	= document.getElementById("divReceiver");
		var strId			= "spn_"+strRcvValue;
		var receiver 		= document.createElement("span");
		receiver.innerText 	= strRcvName+" ["+strRcvValue+"]";
		receiver.className 	= "spnReceiver";
		receiver.setAttribute("id", strId);
		receiver.setAttribute("receive-name", strRcvName  );
		receiver.setAttribute("receive-value", strRcvValue );
		receiver.attachEvent("onmouseover",new Function ("setOverClass('"+strId+"')"));
		receiver.attachEvent("onmouseout" ,new Function ("setOutClass('" +strId+"')"));
		receiver.attachEvent("onclick"    ,new Function ("delReceiver('" +strId+"')"));
		receiver_list.appendChild(receiver);
	}
}
/**
 * 받는사람 추가
 */
function addMailAddress()
{
	var rtn = checkMailValidation(f.email_receiver.value);
	if(rtn[0])
	{
		setOrgValue(rtn[1],"");
		f.email_receiver.value = "";
		f.email_receiver.focus();
	}
	else
	{
		setFocus(f.email_receiver);
	}
}
/**
 * mouse over event
 * obj : receiver span id
 */
function setOverClass (obj)
{
	document.getElementById(obj).className = "spnReceiverDel";
}
/**
 * mouse out event
 * obj : receiver span id
 */
function setOutClass (obj)
{
	document.getElementById(obj).className = "spnReceiver";
}
/**
 * click event
 * obj : receiver span id
 */
function delReceiver (obj)
{
	document.getElementById(obj).removeNode(true);
}
/**
 * 받는사람 삭제
 * obj : receiver span id
 */
function delMailAddress()
{
	var receiver_list = document.getElementById("divReceiver");
	var receiver 	  = receiver_list.childNodes;

	for ( var i=(receiver.length-1); i>-1; i-- )
	{
		receiver[i].removeNode(true);
	}
}
/**
 * 이메일 체크
 * obj : 이메일 obj
 */
function checkMailValidation(arg)
{
	var sMail		= arg;
	var arrRtnVal	= new Array(2);
	var rtnVal 		= true;
	var strMailAll 	= "";
	var strMail1 	= "";
	var strMail2 	= "";
	var strMail2_1 	= "";
	var strMail2_2 	= "";

	if(trim(sMail)=="")
	{
		MessageBox("", "E", "입력된 이메일이 없습니다.");
		arrRtnVal[0] = false;
		arrRtnVal[1] = "";
		return arrRtnVal;
	}

	if(sMail.indexOf("@")==-1){rtnVal = false;}
	else
	{
		var strEmail = sMail.split("@");
		strMail1 = trim(strEmail[0]);
		strMail2 = trim(strEmail[1]);

		if(strMail1==""){rtnVal = false;}
		else
		{
			if(strMail2==""){rtnVal = false;}
			else
			{
				if(strMail2.indexOf(".")==-1){rtnVal = false;}
				else
				{
					var strEmail2 = strMail2.split(".");
					strMail2_1 = trim(strEmail2[0]);
					strMail2_2 = trim(strEmail2[1]);

					if(strMail2_1==""){rtnVal = false;}
					else
					{
						if(strMail2_2==""){rtnVal = false;}
					}
				}
			}
		}
	}

	if(!rtnVal)
	{
		MessageBox("Format", "I", "입력한 이메일");
	}else{
		strMailAll 	= strMail1+"@"+strMail2_1+"."+strMail2_2;
	}

	arrRtnVal[0] = rtnVal;
	arrRtnVal[1] = strMailAll;
	return arrRtnVal;
}