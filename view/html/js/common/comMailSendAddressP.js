/**
 * PROJECT : Nexfron Intranet
 * NAME    : comMailSendAddressP.js
 * DESC    : 메일주소록
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
var SELECT_ID  = "UCCOM041S_1";	//조직도 조회
//var SELECT_ID2 = "UCCOM042S";	//자신의 본부코드 조회 (구)
var oGrid;
/**
 * init
 */
function init()
{
	oGrid = document.getElementById(SELECT_ID);
	oGrid.SetColCellCursor("em_addr","hand");
	oGrid.SetColCellCursor("hdp_no" ,"hand");
	oGrid.SetColCellCursor("chk"    ,"hand");

	//드릴다운기능----------------------------
	//oGrid.bHDVisible 			= true;
	//oGrid.bContextMenuVisible = true;
	//oGrid.strRowBorderStyle 	= "solidline";
	//oGrid.strCellBorderStyle 	= "solidline";
	//----------------------------------------

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
		
		setReceiverInit();
	}
}
/**
 * 받는사람 초기화
 */
function setReceiverInit()
{
	var arrReceiver 	= new Array();
	arrReceiver 		= opener.getPopupParamInfo("comMailSendAddressP");
	var receive_mail  	= arrReceiver[0].split("");
	var receive_name  	= arrReceiver[1].split("");

	for ( var i=0; i<receive_mail.length; i++ )
	{
		if(receive_mail[i]!="")//값이 없어도 split 하면 배열이 1개가 된다.
		{
			setOrgValue(receive_mail[i], receive_name[i]);
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
		receiver.setAttribute("receive-name" , strRcvName  );
		receiver.setAttribute("receive-value", strRcvValue );
		receiver.attachEvent("onmouseover",new Function ("setOverClass('"+strId+"')"));
		receiver.attachEvent("onmouseout" ,new Function ("setOutClass('" +strId+"')"));
		receiver.attachEvent("onclick"    ,new Function ("delReceiver('" +strId+"')"));
		receiver_list.appendChild(receiver);
		setListCnt();
	}
}
/**
 * 주소록 전달
 */
function setReceiver()
{
	var receiver_list = document.getElementById("divReceiver");
	var receive_mail  = "";
	var receive_name  = "";
	var arrReceiver	  = new Array(3);
	arrReceiver[0] 	  = "";
	arrReceiver[1] 	  = "";

	if(receiver_list.hasChildNodes())
	{
		var receiver = receiver_list.childNodes;
		for ( var i=0; i<receiver.length; i++ )
		{
			receive_mail += (""+ receiver[i].getAttribute("receive-value"));
			receive_name += (""+ receiver[i].getAttribute("receive-name"));
		}
		receive_mail	= receive_mail.substr(1);
		receive_name	= receive_name.substr(1);
		arrReceiver[0] 	= receive_mail;
		arrReceiver[1] 	= receive_name;
	}

	opener.setOrgAddress(f.job.value, arrReceiver);
	window.close();
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
		//MessageBox("", "E", "입력된 이메일이 없습니다.");
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

	if(rtnVal)
	{
		strMailAll 	= strMail1+"@"+strMail2_1+"."+strMail2_2;
	}else{
		//MessageBox("Format", "I", "입력한 이메일");
	}

	arrRtnVal[0] = rtnVal;
	arrRtnVal[1] = strMailAll;
	return arrRtnVal;
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
			setOrgValueControl("MAIL", nRow, bVal);
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
			setOrgValueControl("MAIL", nRow, bVal);

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
						setOrgValueControl("MAIL", i, bVal);
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
				setOrgValueControl("MAIL", nRow, bVal);
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
	var arrOrgValue = checkMailValidation(orgValue);	//mail validation

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
 * 조직도값 건수
 */
function setListCnt()
{
	var receiver_list = document.getElementById("divReceiver");
	document.getElementById("cnt").innerText = receiver_list.childNodes.length;
}