/**
 * PROJECT : Nexfron Intranet
 * NAME    : comSmsSendP.js
 * DESC    : SMS전송
 * AUTHOR  : 박준규 과장
 * VERSION : 1.0
 * Copyright ⓒ 2012 Nexfron. All rights reserved.
 * ============================================================================================
 * 							변		경		사		항
 * ============================================================================================
 * VERSION	   DATE		  	AUTHOR		DESCRIPTION
 * ============================================================================================
 * 1.0		2012.04.16		박준규		개발
 */
var SELECT_ID  = "UCCOM041S_1";	//조직도 조회
//var SELECT_ID2 = "UCCOM042S";	//자신의 본부코드 조회 (구)
var INSERT_ID  = "UCSMS001I";	//SMS발송 - 휴가결재등록

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

	//드릴다운기능
	//oGrid.bHDVisible = true;
	//oGrid.bContextMenuVisible  = true;
	//oGrid.strRowBorderStyle = "solidline";
	//oGrid.strCellBorderStyle = "solidline";
	query();
}
/**
 * 조직도 조회
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
 * 조직도 조회 콜백
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

		/* //구버전 조직구도 처리 로직 *******************************
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
 * 트리 클릭이벤트
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
 * 리스트 클릭 시
 * id           : Grid ID
 * strColumnKey : 현재 선택된 컬럼명
 * nRow         : Row 번호
 */
function showDetailO_obj(id, strColumnKey, nRow)
{
	if(strColumnKey!="full_orgnm")	//treekey일때도 발생한다.
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
 * 조직도값 추가/삭제
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
		setListCnt();
	}
}
/**
 * 조직도값 건수
 */
function setListCnt()
{
	var receiver_list = document.getElementById("divReceiver");
	document.getElementById("cnt").innerText = receiver_list.childNodes.length;
}
/**
 * 마우스 오버
 * mouse over event
 * obj : receiver span id
 */
function setOverClass (obj)
{
	document.getElementById(obj).className = "spnReceiverDel";
}
/**
 * 마우스 아웃
 * mouse out event
 * obj : receiver span id
 */
function setOutClass (obj)
{
	document.getElementById(obj).className = "spnReceiver";
}
/**
 * 마우스 클릭 : 삭제
 * click event
 * obj : receiver span id
 */
function delReceiver (obj)
{
	document.getElementById(obj).removeNode(true);
	setListCnt();
}
/**
 * 받는사람 삭제
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
 * 받는사람 추가
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
 * 받는사람 얻기
 */
function getReceiveValue()
{
	var receiver_list = document.getElementById("divReceiver");
	var receive_value = "";
	var receive_array = new Array();	//MULTI유형
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
 * SMS발송
 */
function sendSMS()
{
	var receive_value = getReceiveValue();
	if(receive_value=="")
	{
		MessageBox("", "E", "수신 번호를 입력해 주세요.");
		f.receive_value.focus();
		return;
	}
	if(trim(f.sms_cntn.value)=="")
	{
		MessageBox("", "E", "내용을 입력해 주세요.");
		f.sms_cntn.focus();
		return;
	}

	if(!MessageBox("", "C", "메시지를 전송 하시겠습니까?")) return;

	var trans = new Trans();
	trans.setSvc(INSERT_ID);
	trans.setMyUserParams("snd_phn_id" , f.hdp_no.value);		//sms - 자기번호,콜백번호
	trans.setMyUserParams("rcv_phn_id" , receive_value);		//sms - 수신번호
	trans.setMyUserParams("snd_msg"    , f.sms_cntn.value);		//sms - 메시지
	trans.setCallBack("callbackSendSMS");
	trans.open("","","/common.do");
}
/**
 * 콜백 - SMS발송
 * svcid:서비스아이디
 */
function callbackSendSMS(svcid)
{
	if(DataSet.isError(svcid) == "true") return;

	if( parseInt(DataSet.getParam(INSERT_ID, 1, 0, "SUCCESS_COUNT"),10) > 0 )
	{
		MessageBox("","I","SMS가 발송 되었습니다.");
		//window.close();
	}else{
		MessageBox("","E","SMS 발송에 실패하였습니다.");
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
		MessageBox("","E","메시지 내용은 " + max_len +" Byte 이상 전송 하실 수 없습니다.");
		query = getTextByteEx(query, max_len);
		len   = getStrByteLength(query);
		obj.value = query;
	}

	f.byte.value = len;
}

/**
 * 문자열 길이 계산 BYTE
 * 리턴 문자가 2Byte(13+10) 계산됨...
 * strVal : 타겟 문자열
 * return : 문자열 길이
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
 * 해당 바이트 만큼만 가져오기
 * strVal : 타겟 문자열
 * limitByte : 제한 문자열 길이
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
 * 전화번호 체크
 * obj : 이메일 obj
 */
function checkMbpNumValidation(arg)
{
	var sSMS		= arg;
	var arrRtnVal	= new Array(2);
	var rtnVal 		= true;
	var rtnStr		= "";

	if(trim(sSMS)=="")
	{
		//MessageBox("", "E", "입력된 번호가 없습니다.");
		arrRtnVal[0] = false;
		arrRtnVal[1] = "";
		return arrRtnVal;
	}

	sSMS = numberMask(sSMS);

	if(sSMS=="")
	{
		//MessageBox("", "E", "입력된 번호를 확인하세요.");
		arrRtnVal[0] = false;
		arrRtnVal[1] = "";
		return arrRtnVal;
	}

	if(sSMS.length<7)
	{
		//MessageBox("", "E", "입력된 번호를 확인하세요.");
		arrRtnVal[0] = false;
		arrRtnVal[1] = sSMS;
		return arrRtnVal;
	}

	rtnStr = getFormatData(sSMS,"TEL",0);
	arrRtnVal[0] = rtnVal;
	arrRtnVal[1] = rtnStr;
	return arrRtnVal;
}