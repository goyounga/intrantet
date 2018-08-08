/**
 * PROJECT : Nexfron Intranet
 * NAME    : comMailSendP.js
 * DESC    : ���Ϲ߼�
 * AUTHOR  : ���ر� ����
 * VERSION : 1.0
 * Copyright �� 2012 Nexfron. All rights reserved.
 * ============================================================================================
 * 							��		��		��		��
 * ============================================================================================
 * VERSION	   DATE		  	AUTHOR		DESCRIPTION
 * ============================================================================================
 * 1.0		2012.04.08		���ر�		����
 */
_editor_url = "/screditor/";
/**
 * �ʱ�ȭ
 */
function init()
{
	f.userid.value 	 = opener.top.f.userid.value;
	f.username.value = opener.top.f.usernm.value;
	f.em_addr.value  = opener.top.f.em_addr.value;
	editor_generate("email_cntn");
}
/**
 * ȭ�� �ʱ�ȭ
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
 * ���Ϲ߼�
 */
function sendMail()
{
	var receive_value = getReceiveValue();
	if(receive_value=="")
	{
		MessageBox("", "E", "���� �̸����� �Է��� �ּ���.");
		f.email_receiver.focus();
		return;
	}
	if(trim(f.email_title.value)=="")
	{
		MessageBox("", "E", "������ �Է��� �ּ���.");
		f.email_title.focus();
		return;
	}

	if( f.email_cntn.value =="<P>&nbsp;</P>" ){ f.email_cntn.value = "";}	//�����Ϳ����� ���� �������� �ʴ´�.
	if(trim(f.email_cntn.value)=="")
	{
		MessageBox("", "E", "������ �Է��� �ּ���.");
		return;
	}

	if(!MessageBox("", "C", "������ �߼� �Ͻðڽ��ϱ�?")) return;

	var title = "["+f.username.value+"���� ���� ����]";
	title	 += f.email_type[f.email_type.selectedIndex].text;
	title	 += f.email_title.value;

	if(trim(f.em_addr.value)!="")
	{
		receive_value += (","+f.em_addr.value);	//���������� Ȯ���Ҽ� �����Ƿ� �ڽſ��Ե� ������ �߽��Ѵ�.
	}

	var tran=new Trans();
	tran.setSvc("SENDMAIL");
	tran.setSvcType("");
	tran.setForwardId("mailresult"		, "");
//	tran.setMyUserParams("mail_id"		, "nexfron");
//	tran.setMyUserParams("mail_pwd"		, "��й�ȣ");
	tran.setMyUserParams("mail_from"	, f.em_addr.value);//������� �ʴ´�.
	tran.setMyUserParams("mail_to"		, receive_value);//�ڽ��� �߰��Ѵ�.
    tran.setMyUserParams("mail_subject"	, title);//�ڽ��� ǥ���Ѵ�.
    tran.setMyUserParams("mail_content"	, f.email_cntn.value);
	tran.setCallBack("callbackSendMail");
	tran.setDataSetMode("N");	//??? �߿�, �ݵ�� ����
    tran.open("","","/mail.do");
}
/**
 * �ݹ� - ���Ϲ߼�
 */
function callbackSendMail(sSvc)
{
	if (DataSet.getParam(sSvc, 1, 0 , "resultcd") == "0")
	{
		MessageBox("","I","������ �߼� �Ǿ����ϴ�.");
		window.close();
	}else{
		MessageBox("","E","���� �߼ۿ� �����Ͽ����ϴ�. errCode["+DataSet.getParam(sSvc, 1, 0 , "resultcd")+"]");
	}
}
/**
 * �޴»�� ���
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
 * �޴»�� ���
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
 * �ּҷ� ����
 */
function openOrgAddress()
{
	var receiver_list = getReceiver();
	setPopupParamInfo("comMailSendAddressP", receiver_list);
	openPopup("/jsp/common/comMailSendAddressP.jsp", "job=SETRECEIVER", "comMailSendAddressP", "", "", 850, 650, "toolbar=no,scrollbars=no", "");
}
/**
 * UUtil.openPopup�� �˾� ȭ�鿡 �Ѱ��� �Ķ���͸� �����Ѵ�.
 * sWinKey  : �˾� â �̸� (ex: "cmnUsrFnd")
 * aParams  : �Ķ� �迭
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
 * UUtil.openPopup ���� ������ �Ķ���� ������ ��´�.
 * sWinKey  : �˾� â �̸� (ex: "cmnUsrFnd")
 * rtnArrayVal 	: sWinKey�� �ش��ϴ� �� Array
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
 * �ּҷ� �ޱ�
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
			if(receive_value[i]!="")//���� ��� split �ϸ� �迭�� 1���� �ȴ�.
			{try{
				setOrgValue(receive_value[i], receive_name[i]);
			}catch(e){alert(e.description);}
			}
		}
	}
}
/**
 * �޴»�� ����
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
 * �޴»�� �߰�
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
 * �޴»�� ����
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
 * �̸��� üũ
 * obj : �̸��� obj
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
		MessageBox("", "E", "�Էµ� �̸����� �����ϴ�.");
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
		MessageBox("Format", "I", "�Է��� �̸���");
	}else{
		strMailAll 	= strMail1+"@"+strMail2_1+"."+strMail2_2;
	}

	arrRtnVal[0] = rtnVal;
	arrRtnVal[1] = strMailAll;
	return arrRtnVal;
}