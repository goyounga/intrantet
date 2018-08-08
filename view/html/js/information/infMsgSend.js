/**
 * PROJ : Nexfron Intranet
 * NAME : infMegSend.js
 * DESC : 메세지보내기 자바스크립트
 * Author : 백승우
 * VER  : 1.0
 * Copyright 2009 Nexfron All rights reserved
 * ============================================================================================
 * 								변		경		사		항
 * ============================================================================================
 * VERSION		DATE		AUTHOR		DESCRIPTION
 * ============================================================================================
 * 1.0		2009.08.18		백승우		최초작성
 */
 var popugGubun = "";
 
//쪽지 받는 사람 팝업창
function openUserOrg(gd)
{
	popupGubun = gd;

	window.open("/jsp/common/comUserOrg.jsp?multiyn=Y&mode=memo" ,"UserOrg", "width=800,height=580");
}
//쪽지 받는 사람 셋팅
function setOrgUserInfo(user_id, user_nm)
{
	popupGubun="UCINF002I";
	if(popupGubun == "UCINF002I")
	{
		ff.recv_nm.value=user_nm;
		ff.recv_id.value=user_id;
		insertWiseGridRow(popupGubun, -1, ff);
	}
}
//쪽지받는 사람 삭제
function ps_Del()
{
	var obj	= document.UCINF002I;
	var len = obj.GetRowCount();
	var chked = 0;
	if(len==0)
	{
		alert('삭제 할 사람은 필수입력 항목 입니다.');
	}
	else
	{
		for(i=len-1;i>=0;i--)
		{
			chked = obj.GetCellValue("chk", i);
			if(chked==1)
			{
				removeWiseGridRow("UCINF002I", i);
			}
		}
	}
}
//쪽지 보내기
function send_Query()
{
	var obj	= document.UCINF002I;
	var len = obj.GetRowCount();
	
	if(getValidation(f,true)==false)
	{
		return;
	}
	else if(len==0)
	{
		alert('보낼사람은 필수입력 항목 입니다.');return;
	}
	else
	{
		var idArr = new Array();
		var keyArr = new Array();
		var index = 0;
		
		for (var i=0; i<len; i++)
		{
				keyArr[index] = "recv_id";
				idArr[index++] = obj.GetCellValue("recv_id", i);
		}
		alert(idArr);
		var tran = new Trans();
		tran.setSvc("UCINF002I");
		tran.setArrUserParams(keyArr, idArr);
		tran.setWiseGrid("1");
		tran.setForwardId("wgdsl","");
		tran.open("f","f","/wisegrid.do");
		window.close();
	}
}

function reMsgSend()
{
	var send_nm = new Array();
	var recv_id = new Array();
	var reMsg = new Array();

	if(f0.reMsg.value!="")
	{
		send_nm=f0.send_nm.value.split(',');
		recv_id=f0.recv_id.value.split(',');
	}
	for(i=0;i<send_nm.length;i++)
	{
		setOrgUserInfo(recv_id[i], send_nm[i]);
	}
}

