/**
 * PROJECT : Nexfron Intranet
 * NAME    : comSmsSendP.js
 * DESC    : SMS����
 * AUTHOR  : ���ر� ����
 * VERSION : 1.0
 * Copyright �� 2012 Nexfron. All rights reserved.
 * ============================================================================================
 * 							��		��		��		��
 * ============================================================================================
 * VERSION	   DATE		  	AUTHOR		DESCRIPTION
 * ============================================================================================
 * 1.0		2012.04.16		���ر�		����
 */
var SELECT_ID  = "UCCOM041S_1";	//������ ��ȸ
//var SELECT_ID2 = "UCCOM042S";	//�ڽ��� �����ڵ� ��ȸ (��)
var INSERT_ID  = "UCSMS001I";	//SMS�߼� - �ް�������

var oGrid;
/**
 * init
 */
function init()
{
	f.userid.value 	 = opener.top.f.userid.value;
	f.username.value = opener.top.f.usernm.value;
	f.hdp_no.value   = opener.top.f.hdp_no.value;

	oGrid = document.getElementById(SELECT_ID);
	oGrid.SetColCellCursor("em_addr","hand");
	oGrid.SetColCellCursor("hdp_no" ,"hand");
	oGrid.SetColCellCursor("chk"    ,"hand");

	//�帱�ٿ���
	//oGrid.bHDVisible = true;
	//oGrid.bContextMenuVisible  = true;
	//oGrid.strRowBorderStyle = "solidline";
	//oGrid.strCellBorderStyle = "solidline";
	query();
}
/**
 * ������ ��ȸ
 */
function query()
{
	var trans = new Trans();
	//trans.setSvc(SELECT_ID+","+SELECT_ID2);
	trans.setSvc(SELECT_ID);
	trans.setPageRow(9999);
	trans.setMyUserParams("dept_cd", f.dept_cd.value);
	trans.setWiseGrid("1,0");
	trans.setForwardId("wgdsl","");
	trans.setCallBack("callbackQuery");
	trans.open("", "","/wisegrid.do");
}
/**
 * ������ ��ȸ �ݹ�
 * svcid : service id
 */
function callbackQuery(svcid)
{
	if(svcid==(SELECT_ID))
	{
		if(DataSet.isError(svcid) == "true") return;

		oGrid.CollapseTreeAll();
		oGrid.ExpandTreeNode (oGrid.GetTreeFirstNodeKey(),false);

		var view_org_1 = "SYS031"+f.view_org_1.value;
		var view_org_2 = "SYS032"+f.view_org_2.value;
		var view_org_3 = "SYS033"+f.view_org_3.value;

		if(f.view_org_1.value=="")
		{
			oGrid.ExpandTreeNode(oGrid.GetTreeFirstNodeKey(),true);
		}
		else if(f.view_org_2.value=="")
		{
			oGrid.ExpandTreeNode(view_org_1,true);
		}
		else if(f.view_org_3.value=="")
		{
			oGrid.ExpandTreeNode(view_org_1,false);
			oGrid.ExpandTreeNode(view_org_2,true);
		}
		else
		{
			oGrid.ExpandTreeNode(view_org_1,false);
			oGrid.ExpandTreeNode(view_org_2,false);
			oGrid.ExpandTreeNode(view_org_3,true);
		}

		/* //������ �������� ó�� ���� *******************************
		if(f.dept_cd.value=="05")	//VIP
		{
			oGrid.ExpandTreeNode ("SYS01205",true);
			oGrid.ExpandTreeNode ("SYS02501",true);
		}
		else if(parseInt(DataSet.getTotalCount(SELECT_ID2),10)> 0)
		{
			var hq = DataSet.getParam(SELECT_ID2, 1, 0, "hq");
			oGrid.ExpandTreeNode(hq,true);
		}
		************************************************************* */
	}
}
/**
 * Ʈ�� Ŭ���̺�Ʈ
 */
function treeClick(obj, strTreeKey, strArea)
{
	if(strArea=="signbox"||strArea=="image")
	{
		if(oGrid.IsTreeNodeExpand(strTreeKey))
		{
			oGrid.CollapseTreeNode(strTreeKey);
		}else{
			oGrid.ExpandTreeNode (strTreeKey,false);
		}
	}
	else
	{
		var nRow  = oGrid.GetRowIndexFromTreeKey(strTreeKey);
		var gubun = oGrid.GetCellValue("gubun", nRow);
		if(gubun=="MAN")
		{
			var sVal = "1";
			var bVal = true;
			if(oGrid.GetCellValue("chk", nRow)=="1")
			{
				sVal = "0"
				bVal = false;
			}
			oGrid.SetCellValue("chk", nRow, sVal);
			setOrgValueControl("SMS", nRow, bVal);
		}
	}
}
/**
 * ����Ʈ Ŭ�� ��
 * id           : Grid ID
 * strColumnKey : ���� ���õ� �÷���
 * nRow         : Row ��ȣ
 */
function showDetailO_obj(id, strColumnKey, nRow)
{
	if(strColumnKey!="full_orgnm")	//treekey�϶��� �߻��Ѵ�.
	{
		var sVal = "1";
		var bVal = true;
		if(oGrid.GetCellValue("chk", nRow)=="1")
		{
			sVal = "0"
			bVal = false;
		}

		if(strColumnKey=="chk")
		{
			oGrid.SetCellValue("chk", nRow, sVal);
			setOrgValueControl("SMS", nRow, bVal);

			var strTreeKey = oGrid.GetTreeKeyFromRowIndex(nRow);
			if(oGrid.HasTreeChildNode(strTreeKey))
			{
				var nCnt = oGrid.GetTreeChildNodeCount(strTreeKey, true);
				for(var i=(nRow+1); i<=(nRow+nCnt); i++ )
				{
					oGrid.SetCellValue("chk", i, sVal);
					var gubun = oGrid.GetCellValue("gubun", i);
					if(gubun=="MAN")
					{
						setOrgValueControl("SMS", i, bVal);
					}
				}
			}
		}
		else
		{
			var gubun = oGrid.GetCellValue("gubun", nRow);
			if(gubun=="MAN")
			{
				oGrid.SetCellValue("chk", nRow, sVal);
				setOrgValueControl("SMS", nRow, bVal);
			}
		}
	}
}
/**
 * �������� �߰�/����
 */
function setOrgValueControl(arg, nRow, bVal)
{
	var orgnm	 = oGrid.GetCellValue("orgnm"   , nRow);
	var orgValue = "";

	if(arg=="MAIL")
	{
		orgValue = oGrid.GetCellValue("em_addr" , nRow);
	}
	else if(arg=="SMS")
	{
		orgValue = oGrid.GetCellValue("hdp_no" , nRow);
	}
	var arrOrgValue = checkMbpNumValidation(orgValue);	//SMS validation
	if(bVal)
	{
		if(arrOrgValue[0])
		{
			setOrgValue(arrOrgValue[1],orgnm);
		}
	}else{
		if(document.getElementById("spn_"+arrOrgValue[1]))
		{
			document.getElementById("spn_"+arrOrgValue[1]).removeNode(true);
			setListCnt();
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
		setListCnt();
	}
}
/**
 * �������� �Ǽ�
 */
function setListCnt()
{
	var receiver_list = document.getElementById("divReceiver");
	document.getElementById("cnt").innerText = receiver_list.childNodes.length;
}
/**
 * ���콺 ����
 * mouse over event
 * obj : receiver span id
 */
function setOverClass (obj)
{
	document.getElementById(obj).className = "spnReceiverDel";
}
/**
 * ���콺 �ƿ�
 * mouse out event
 * obj : receiver span id
 */
function setOutClass (obj)
{
	document.getElementById(obj).className = "spnReceiver";
}
/**
 * ���콺 Ŭ�� : ����
 * click event
 * obj : receiver span id
 */
function delReceiver (obj)
{
	document.getElementById(obj).removeNode(true);
	setListCnt();
}
/**
 * �޴»�� ����
 * obj : receiver span id
 */
function delReceiveList()
{
	var receiver_list = document.getElementById("divReceiver");
	var receiver 	  = receiver_list.childNodes;

	for ( var i=(receiver.length-1); i>-1; i-- )
	{
		receiver[i].removeNode(true);
	}
	document.getElementById("cnt").innerText = "0";
}
/**
 * �޴»�� �߰�
 */
function addReceive()
{
	var rtn = checkMbpNumValidation(f.receive_value.value);
	if(rtn[0])
	{
		setOrgValue(rtn[1],"");
		f.receive_value.value = "";
		f.receive_value.focus();
	}
	else
	{
		setFocus(f.receive_value);
	}
}
/**
 * �޴»�� ���
 */
function getReceiveValue()
{
	var receiver_list = document.getElementById("divReceiver");
	var receive_value = "";
	var receive_array = new Array();	//MULTI����
	var index         = 0;

	if(receiver_list.hasChildNodes())
	{
		var receiver = receiver_list.childNodes;
		for ( var i=0; i<receiver.length; i++ )
		{
			receive_array[index] = removeMask(receiver[i].getAttribute("receive-value"));
			index++;
		}
		receive_value = makeParamArray(receive_array);
	}

	return receive_value;
}

/**
 * SMS�߼�
 */
function sendSMS()
{
	var receive_value = getReceiveValue();
	if(receive_value=="")
	{
		MessageBox("", "E", "���� ��ȣ�� �Է��� �ּ���.");
		f.receive_value.focus();
		return;
	}
	if(trim(f.sms_cntn.value)=="")
	{
		MessageBox("", "E", "������ �Է��� �ּ���.");
		f.sms_cntn.focus();
		return;
	}

	if(!MessageBox("", "C", "�޽����� ���� �Ͻðڽ��ϱ�?")) return;

	var trans = new Trans();
	trans.setSvc(INSERT_ID);
	trans.setMyUserParams("snd_phn_id" , f.hdp_no.value);		//sms - �ڱ��ȣ,�ݹ��ȣ
	trans.setMyUserParams("rcv_phn_id" , receive_value);		//sms - ���Ź�ȣ
	trans.setMyUserParams("snd_msg"    , f.sms_cntn.value);		//sms - �޽���
	trans.setCallBack("callbackSendSMS");
	trans.open("","","/common.do");
}
/**
 * �ݹ� - SMS�߼�
 * svcid:���񽺾��̵�
 */
function callbackSendSMS(svcid)
{
	if(DataSet.isError(svcid) == "true") return;

	if( parseInt(DataSet.getParam(INSERT_ID, 1, 0, "SUCCESS_COUNT"),10) > 0 )
	{
		MessageBox("","I","SMS�� �߼� �Ǿ����ϴ�.");
		//window.close();
	}else{
		MessageBox("","E","SMS �߼ۿ� �����Ͽ����ϴ�.");
	}
}
/**
 * byte check
 * obj : target form control
 * max_len : limit string size
 */
function cal_pre_keyup(obj, max_len)
{
	var query = obj.value;
	var len   = getStrByteLength(query);

	if(len > max_len)
	{
		MessageBox("","E","�޽��� ������ " + max_len +" Byte �̻� ���� �Ͻ� �� �����ϴ�.");
		query = getTextByteEx(query, max_len);
		len   = getStrByteLength(query);
		obj.value = query;
	}

	f.byte.value = len;
}

/**
 * ���ڿ� ���� ��� BYTE
 * ���� ���ڰ� 2Byte(13+10) ����...
 * strVal : Ÿ�� ���ڿ�
 * return : ���ڿ� ����
 */
function getStrByteLength(strVal)
{
	var strLen = 0;

	for(var i=0; i<strVal.length; i++)
	{
		var chrCode = strVal.charCodeAt(i);
		strLen++;

		if(chrCode > 255){strLen++;}
	}
	return strLen;
}

/**
 * �ش� ����Ʈ ��ŭ�� ��������
 * strVal : Ÿ�� ���ڿ�
 * limitByte : ���� ���ڿ� ����
 */
function getTextByteEx(strVal, limitByte)
{
	var strLen = 0;
	var retVal = "";

	for(var i=0; i<strVal.length; i++)
	{
		var chrCode = strVal.charCodeAt(i);
		strLen++;

		if(chrCode > 255      ){strLen++;}
		if(strLen  > limitByte){break;   }

		retVal += strVal.charAt(i);
	}
	return retVal;
}
/**
 * ��ȭ��ȣ üũ
 * obj : �̸��� obj
 */
function checkMbpNumValidation(arg)
{
	var sSMS		= arg;
	var arrRtnVal	= new Array(2);
	var rtnVal 		= true;
	var rtnStr		= "";

	if(trim(sSMS)=="")
	{
		//MessageBox("", "E", "�Էµ� ��ȣ�� �����ϴ�.");
		arrRtnVal[0] = false;
		arrRtnVal[1] = "";
		return arrRtnVal;
	}

	sSMS = numberMask(sSMS);

	if(sSMS=="")
	{
		//MessageBox("", "E", "�Էµ� ��ȣ�� Ȯ���ϼ���.");
		arrRtnVal[0] = false;
		arrRtnVal[1] = "";
		return arrRtnVal;
	}

	if(sSMS.length<7)
	{
		//MessageBox("", "E", "�Էµ� ��ȣ�� Ȯ���ϼ���.");
		arrRtnVal[0] = false;
		arrRtnVal[1] = sSMS;
		return arrRtnVal;
	}

	rtnStr = getFormatData(sSMS,"TEL",0);
	arrRtnVal[0] = rtnVal;
	arrRtnVal[1] = rtnStr;
	return arrRtnVal;
}