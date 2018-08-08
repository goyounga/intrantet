/**
 * PROJ : Nexfron Intranet
 * NAME : home.js
 * DESC : ����(home) �ڹٽ�ũ��Ʈ
 * Author : ������ �븮
 * VER  : 1.0
 * Copyright 2009 Nexfron All rights reserved
 * ============================================================================================
 * 								��		��		��		��
 * ============================================================================================
 * VERSION		DATE		AUTHOR		DESCRIPTION
 * ============================================================================================
 * 1.0		2009.08.13		������		�ּ��߰�
 * 2.0		2010.09.09		���ر�		�ٹ������߰�
 * 3.0		2012.02.20		��¿� 	������� �߰�
 */

var NOTICE_ID			= "UCSYS110S";		//��������
var BOARD_ID			= "UCSYS113S";		//�Խ�����ȸ
var QNA_ID				= "UCSYS119S";		//Q&A��ȸ
var UPG_ID				= "UCSYS099S";		//���׷��̵���ȸ
var SELECT_ID_WORK 	    = "UCDAS032S";		//�ٹ�����
var UPDATE_ID 	      	= "UCDAS071U";		//�����η���Ȳ
var SIGN_Y_ID			= "UCSYS205S";		// ������ �̰��� �Ǽ�
var SIGN_N_ID			= "UCSYS205S_2";		// �ڽ� �̰��� �Ǽ� ��ȸ
var SIGN_USER_ID		= "UCSYS206S"		// ������ ���� ��ȸ
var aForms1        		= null; 			//�ٹ�����-����ü��1
var aForms2        		= null; 			//�ٹ�����-����ü��2

var aArry = new Array();				// ����
var aArry1 = new Array();				// ����
var aArry2 = new Array();				// ����

var G_SIGN_F_CD = "N";				// ���� ���� �ڵ�

//###################################
// ONLOAD
//###################################
function init()
{
	aForms1 = [ f3.in_offc_stat[0] , f3.in_offc_stat[1] ];
	aForms2 = [ f3.rtn_scdl   , f3.work_scdl, f3.work_rmk ];
	setOfficeWork( "INIT" );
	top.setInit();
	signUserQuery();
	//showNotice();
}

//###################################
//���� ���� ��ȸ
//###################################
function signUserQuery()
{
	var trans = new Trans();
	trans.setSvc(SIGN_USER_ID);
	trans.setWait(false);
	trans.open("f","","/common.do");
}

//###################################
// �������� ��ȸ
//###################################
function showNotice()
{
	var svc_id = "";
	
	if(f.sign_tp.value != "") svc_id = NOTICE_ID+","+BOARD_ID+","+QNA_ID+","+UPG_ID+","+SELECT_ID_WORK+","+SIGN_Y_ID;
	else if(f.sign_tp.value == "") svc_id = NOTICE_ID+","+BOARD_ID+","+QNA_ID+","+UPG_ID+","+SELECT_ID_WORK+","+SIGN_N_ID;
		
	var trans = new Trans();
	trans.setSvc(svc_id);
	trans.setPageRow(12);
	trans.setWait(false);
	trans.open("f","f3","/common.do");
}

//###################################
//�������� ���
//###################################
function openNoticeInfo(obj, num)
{
	//setOpener(obj);

	if(num ==1){
		//openPopup("/jsp/system/sysNoticeInfo.jsp", "", "NoticeInfo", 0, 0, 800, 582, "", "")
		parent.topmenu_click(5,'0800', '/jsp/common/blank.jsp','null');
		parent.menu_click('0805', '/jsp/information/infNotice.jsp', '��������', '�ڷ����', '', 5, 'Y', '');
	}else if(num ==2)
	{
		parent.topmenu_click(5,'0800', '/jsp/common/blank.jsp','null');
		parent.menu_click('0804', '/jsp/information/infBoardList.jsp', '�Խ���', '�ڷ����', '', 5, 'Y', '');
	}else if(num ==3)
	{
		parent.topmenu_click(5,'1100', '/jsp/common/blank.jsp','null');
		parent.menu_click('1111', '/jsp/ucareprogram/ucrUpgradeMng.jsp', 'UCare', '�����ӿ�  ���׷��̵� ����', '', 5, 'Y', '');
	}else if(num ==4)
	{
		parent.topmenu_click(5,'0800', '/jsp/common/blank.jsp','null');
		parent.menu_click('0802', '/jsp/information/infQnA.jsp', 'Q&A', '�ڷ����', '', 5, 'Y', '');
	}
}

//###################################
//�������� ������
//###################################
function noticeSelect(obj, index)
{
	//��ĭ�� Ŭ���������� ����
	if(aArry.length > index)
	{
		f.notice_seq.value = DataSet.getParam(NOTICE_ID, 1, index, "notice_seq");

		openPopup("/jsp/system/sysNoticeDetailInfo.jsp", "seq="+f.notice_seq.value+"&gubun=notice", "NoticeInfo", 0, 0, 800, 512, "", "")
	}
}

//###################################
//�Խ��� ������
//###################################
function board_noticeselect(obj, index)
{
	//��ĭ�� Ŭ���������� ����
	if(aArry1.length > index)
	{
		f.board_seq.value = DataSet.getParam(BOARD_ID, 1, index, "board_seq");

		openPopup("/jsp/system/sysNoticeDetailInfo.jsp", "seq="+f.board_seq.value+"&gubun=board", "NoticeInfo", 0, 0, 800, 682, "", "")
	}
}

//###################################
//���׷��̵� ������
//###################################
function upg_noticeselect(obj, index)
{
	//��ĭ�� Ŭ���������� ����
	if(aArry2.length > index)
	{
		var upg_seq = DataSet.getParam(UPG_ID, 1, index, "upg_seq");

		openPopup("/jsp/system/sysNoticeDetailInfo.jsp", "seq="+upg_seq+"&gubun=upg", "NoticeInfo", 0, 0, 800, 682, "", "")
	}
}

//###################################
//�̰��� ��
//###################################
function sign_noticeselect(obj, index)
{
	//��ĭ�� Ŭ���������� ����
	if(4 > index)
	{
		if(obj.id == "myInf") 
		{
			signInf.style.display = "";
			myInf.style.display = "none";
			
			svc_id = SIGN_N_ID;
		}
		else if(obj.id == "signInf") 
		{
			signInf.style.display = "none";
			myInf.style.display = "";
			
			svc_id = SIGN_Y_ID;
		}
		
		if(f.sign_tp.value != "" && signInf.style.display == "none" && myInf.style.display == "none")
		{
			kind = "SIGN";
		}
		else if(f.sign_tp.value != "" && signInf.style.display == "" && myInf.style.display == "none")
		{
			kind = "INFO";
		}
		else if(f.sign_tp.value != "" && signInf.style.display == "none" && myInf.style.display == "")
		{
			kind = "SIGN";
		}
		else if(f.sign_tp.value == "")
		{
			kind = "INFO";
		}
		
		if(kind == "SIGN")
		{
			switch(UCSYS205S_IDX[index].innerHTML)
			{
				case '01':
					top.menu_click('0202', '/jsp/holiday/hldHolidaySnc.jsp', '�ް�����', '�ް�', '01', '1', '');
					break;
				case '02':
					top.menu_click('0102', '/jsp/management/mngWeeklyRptMng.jsp', '�ְ��������', '�ְ�����', '01', '0', '');
					break;
				case '03':
					top.menu_click('0302', '/jsp/expense/expExpenseMng.jsp', '������', '���', '01', '2', '');
					break;
				case '04':
					top.menu_click('0303', '/jsp/expense/expHoliday.jsp', '���ϱٹ���û', '���', '01', '2', '');
					break;
			}
		}
		else if(kind == "INFO")
		{
			switch(UCSYS205S_IDX[index].innerHTML)
			{
				case '01':
					top.menu_click('0201', '/jsp/holiday/hldHolidayList.jsp', '�ް���û/��ȸ', '�ް�', '01', '1', '');
					break;
				case '02':
					top.menu_click('0101', '/jsp/management/mngWeeklyRpt.jsp', '�ְ�����', '�ְ�����', '01', '0', '');
					break;
				case '03':
					top.menu_click('0301', '/jsp/expense/expExpenseList.jsp', '����û/��ȸ', '���', '01', '2', '');
					break;
				case '04':
					top.menu_click('0303', '/jsp/expense/expHoliday.jsp', '���ϱٹ���û', '���', '01', '2', '');
					break;
			}
		}
	}
}

//###################################
// CALLBACK
//###################################
function callback(dsnm)
{
	var svc_id = dsnm.split(",");

	for(var x=0; x<svc_id.length; x++)
	{
		if(svc_id[x] == SIGN_USER_ID)
		{
				// �̰��� ����
				var ds = DataSet.getParamArrHash(SIGN_USER_ID, 1);
				var dsCnt = ds.length;
				var val = "";
	
				if(dsCnt > 0)
				{
					for(var i=0; i<dsCnt; i++)
					{
						var ht = ds[i];
						if(val != "") val += ", ";
						val += "'" + ht.get("sign_tp_cd") + "'";
					}
					
					f.sign_tp.value = "AND sign_tp_cd IN (" + val + ")";
				}
				else
				{
					f.sign_tp.value = "";
				}
	
				if(dsCnt == 0 || dsCnt >= 4) // ������� ���� ���� or ������� �� ���� �ִ� ����
				{
					if(dsCnt >= 4) sign_title.innerText = "�̰��� ����";
					else if(dsCnt == 0) sign_title.innerText = "������ ����";
					
					signInf.style.display = "none";
					myInf.style.display = "none";
				}
				else if(dsCnt > 0 && dsCnt < 4) // �Ϻ� ������� ����
				{
					sign_title.innerText = "�̰��� ����";
					
					signInf.style.display = "none";
					myInf.style.display = "";
				}
				showNotice();
		}
		else if(svc_id[x] == NOTICE_ID)
		{
			if(DataSet.getTotalCount(NOTICE_ID) > 0)
			{
				var objTbl = document.all[NOTICE_ID];
				var iCnt = DataSet.getTotalCount(NOTICE_ID);

				aArry = DataSet.getParamArrHash(NOTICE_ID, "1");

				for (var i=0; i < aArry.length; i++)
				{
					if(i < 12){
						var ht = aArry[i];
						var temp = "...";

						//����
						if(ht.get("notice_type")=="02")
						{
							UCSYS110S_notice_seq[i].innerHTML = "<img src=/html/images/icon/notice.gif border=0>";
						}else
						{
							UCSYS110S_notice_seq[i].innerText = ht.get("notice_seq") +".";
						}

						if(ht.get("notice_sbjt").length > 24)
						{
							temp = ht.get("notice_sbjt").substr(0,24) + temp;
						}
						else {
							temp = ht.get("notice_sbjt").substr(0,24);
						}

						//����
						if(ht.get("notice_type")=="02")
						{
							temp = "<font color=orange><b>" + temp + "</b></font>";
							UCSYS110S_notice_sbjt[i].innerHTML = temp;
						}
						else
						{
							UCSYS110S_notice_sbjt[i].innerText = temp;
						}

						UCSYS110S_rg_nm[i].innerText = ht.get("rg_nm");
						UCSYS110S_rg_dt[i].innerText = ht.get("rg_dt").substr(0,4)+ "/" +  ht.get("rg_dt").substr(4,2)+ "/"+  ht.get("rg_dt").substr(6,2);
					}
				}
			}
		}
		else if(svc_id[x] == BOARD_ID)
		{
			if(DataSet.getTotalCount(BOARD_ID) > 0){

				var objTbl = document.all[BOARD_ID];
				var iCnt = DataSet.getTotalCount(BOARD_ID);

				aArry1 = DataSet.getParamArrHash(BOARD_ID, DataSet.getCurPage(BOARD_ID));

				for (var i=0; i < aArry1.length; i++)
				{
					if(i < 5){
						var ht = aArry1[i];
						var temp = "...";

						UCSYS113S_seq[i].innerText = ht.get("board_seq") +".";

						if(ht.get("board_sbjt").length > 37)
						{
							UCSYS113S_ntce_sbjt[i].innerHTML = ht.get("board_sbjt").substr(0,37) + temp;
						}
						else {
							UCSYS113S_ntce_sbjt[i].innerHTML = ht.get("board_sbjt").substr(0,37);
						}

						if(ht.get("board_nm").length > 10)
						{
							UCSYS113S_board_nm[i].innerHTML = ht.get("board_nm").substr(0,10) + temp;
						}
						else {
							UCSYS113S_board_nm[i].innerHTML = ht.get("board_nm").substr(0,10);
						}

						UCSYS113S_rg_nm[i].innerText = ht.get("rg_nm");
						UCSYS113S_rg_dt[i].innerText = ht.get("rg_dt").substr(0,4)+ "/" +  ht.get("rg_dt").substr(4,2)+ "/"+  ht.get("rg_dt").substr(6,2);
					}
				}
			}
		}
		else if(svc_id[x] == QNA_ID)
		{
			if(DataSet.getTotalCount(QNA_ID) > 0){

				var objTbl = document.all[QNA_ID];
				var iCnt = DataSet.getTotalCount(QNA_ID);

				aArry1 = DataSet.getParamArrHash(QNA_ID, DataSet.getCurPage(QNA_ID));

				for (var i=0; i < aArry1.length; i++)
				{
					if(i < 4){
						var ht = aArry1[i];
						var temp = "...";

						UCSYS119S_seq[i].innerText = ht.get("qna_seq") +".";

						if(ht.get("quest_title").length > 37)
						{
							UCSYS119S_quest_title[i].innerHTML = ht.get("quest_title").substr(0,37) + temp;
						}
						else {
							UCSYS119S_quest_title[i].innerHTML = ht.get("quest_title").substr(0,37);
						}
						
						UCSYS119S_quest_type_nm[i].innerHTML = ht.get("quest_type_nm");
						UCSYS119S_rg_nm[i].innerText = ht.get("quest_mn_nm");
						UCSYS119S_rg_dt[i].innerText = ht.get("rg_dt");
					}
				}
			}
		}
		else if(svc_id[x] == UPG_ID)
		{
			if(DataSet.getTotalCount(UPG_ID) > 0)
			{
				var objTbl = document.all[UPG_ID];
				var iCnt = DataSet.getTotalCount(UPG_ID);
				aArry2 = DataSet.getParamArrHash(UPG_ID, DataSet.getCurPage(UPG_ID));

				for (var i=0; i < aArry2.length; i++)
				{
					var ht = aArry2[i];
					var temp = "...";

					UCSYS099S_upg_seq[i].innerText = (i+1) +".";
					var sTitle
					if(ht.get("upg_title").length > 12)
					{
						sTitle = ht.get("upg_title").substr(0,26) + temp;
					}
					else {
						sTitle = ht.get("upg_title").substr(0,26);
					}
					if (ht.get("new_yn") == "Y") sTitle += "&nbsp;&nbsp;<img src=/html/images/icon/icon_new.gif>";
					UCSYS099S_upg_title[i].innerHTML = sTitle;

					//UCSYS099S_upg_type_cd[i].innerText = ht.get("upg_type_cd");
					//UCSYS099S_reg_user_nm[i].innerText = ht.get("reg_user_id");
					UCSYS099S_reg_dt[i].innerText = ht.get("reg_dt").substr(0,4)+ "/" +  ht.get("reg_dt").substr(4,2)+ "/"+  ht.get("reg_dt").substr(6,2);
				}
			}
		}
/*
			if( getArrayData(f3.work_type_cd, "value")=="01" )
			{
				setDisabledObj(aForms1, false);

				if( getArrayData(f3.in_offc_stat, "value")=="02" )
				{
					setDisabledObj(aForms2, false);
				}
			}
*/
		else if(svc_id[x] == SIGN_Y_ID || svc_id[x] == SIGN_N_ID)
		{
			// �̰��� ����
			var dsSignInfo = "";
			
			if(svc_id[x] == SIGN_Y_ID) dsSignInfo = DataSet.getParamArrHash(SIGN_Y_ID, 1);
			else if(svc_id[x] == SIGN_N_ID) dsSignInfo = DataSet.getParamArrHash(SIGN_N_ID, 1);
				
			var dsCnt = dsSignInfo.length;
			var idx = 1;
			
			if(dsCnt > 0)
			{
				for(var i=0; i<4; i++)
				{
					if(i < dsCnt)
					{
						var ht = dsSignInfo[i];

						UCSYS205S_sign_seq[i].innerText = (idx++) +".";
						UCSYS205S_sign_title[i].innerHTML = ht.get("sign_tp_nm");
						UCSYS205S_sign_cnt[i].innerHTML = ht.get("sign_cnt") + " ��";
						UCSYS205S_IDX[i].innerHTML = ht.get("sign_tp_cd");
					}
					else
					{
						UCSYS205S_sign_seq[i].innerText = "";
						UCSYS205S_sign_title[i].innerHTML = "";
						UCSYS205S_sign_cnt[i].innerHTML = "";
						UCSYS205S_IDX[i].innerHTML = "";
					}
				}
			}
		}
	}
}


////////////////////////////////////////////////////////////
/**
 * ��������
 */
function signInfo(obj)
{
	var svc_id = "";
	
	if(obj.id == "myInf") 
	{
		sign_title.innerText = "������ ����";
		signInf.style.display = "";
		myInf.style.display = "none";
		
		svc_id = SIGN_N_ID;
	}
	else if(obj.id == "signInf") 
	{
		sign_title.innerText = "�̰��� ����";
		signInf.style.display = "none";
		myInf.style.display = "";
		
		svc_id = SIGN_Y_ID;
	}
	
	var trans = new Trans();
	trans.setSvc(svc_id);
	trans.setPageRow(12);
	trans.setWait(false);
	trans.open("f","f3","/common.do");
}

/**
 * �ٹ����� üũ�ڽ� ����
 */
function work_type_cd_onClick(obj)
{
	if(obj.checked)
	{
		for(var i=0; i<f3.work_type_cd.length; i++)
		{
			if(f3.work_type_cd[i]!=obj)
			{
				f3.work_type_cd[i].checked = false;
			}
		}
	}
	else
	{
		obj.checked = true;
	}

	setOfficeWork( obj.value );
}

/**
 * �ٹ�����ȭ�� ��Ʈ��
 */
function setOfficeWork( val )
{
	if(val=="01")
	{
		if(aForms1[0].disabled == true)
		{
			setDisabledObj(aForms1, false);
			aForms1[0].checked = true;
		}
	}
	else
	{
		setDisabledObj(aForms1, true);
		setDisabledObj(aForms2, true);

		for(var i=0; i<aForms1.length; i++)
		{
			aForms1[i].checked = false;
		}
		for(var j=0; j<aForms2.length; j++)
		{
			aForms2[j].value = "";
		}
	}
}
/**
 * ��ǿ��� ���� ����
 */
function in_offc_stat_onClick( obj )
{
	if(obj.value=="01")
	{
		setDisabledObj(aForms2, true);
		for(var j=0; j<aForms2.length; j++)
		{
			aForms2[j].value = "";
		}
	}
	else
	{
		setDisabledObj(aForms2, false);
	}
}
/**
 * �ٹ����� ����
 */
function saveWork()
{
	var bFlg = false;
	for(var i=0; i<f3.work_type_cd.length; i++)
	{
		if(f3.work_type_cd[i].checked == true)
		{
			bFlg = true;
			break;
		}
	}

	if(!bFlg)
	{
		MessageBox("", "I","�ٹ������� �������ּ���.");
		return;
	}

	if(f3.work_type_cd[0].checked == true)
	{
		var bFlg2 = false;
		for(var i=0; i<aForms1.length; i++)
		{
			if(aForms1[i].checked == true)
			{
				bFlg2 = true;
				break;
			}
		}
		if(!bFlg2)
		{
			MessageBox("", "I","��ǿ��θ� �������ּ���.");
			return;
		}
	}

	if ( !MessageBox("SavConfirm", "C", "") ) {return;}

	var tran = new Trans();
	tran.setSvc(UPDATE_ID);
	tran.setUserParams("mdf_id="+f3.user_id.value);
	tran.setCallBack("callbacksaveWork");
	tran.open("f3","f3","/common.do");
}

/**
 * �ٹ����� ���� �� �ݹ�
 */
function callbacksaveWork()
{
	if (DataSet.getParam(UPDATE_ID, 1, 0, "SUCCESS_COUNT") > 0)
	{
		//MessageBox("InfSuccess", "I", "");
	}
	else
	{
		//MessageBox("InfFail", "E", "");
	}
}