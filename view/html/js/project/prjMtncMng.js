/**
 * PROJECT : INTRANET
 * NAME    : prjMtncMng.js
 * DESC    : ������������
 * AUTHOR  : ���ر� ����
 * VERSION : 1.0
 * Copyright �� 2010 Nexfron. All rights reserved.
 * ============================================================================================
 * 							��		��		��		��
 * ============================================================================================
 * VERSION	   DATE		  	AUTHOR		DESCRIPTION
 * ============================================================================================
 * 1.0		2010.09.12		���ر�		����
 */
var SELECT_ID 		= "UCPRJ031S";	//������������Ʈ
var SELECT_ID_CODE 	= "UCPRJ012S";	//�ڵ� DataSet
var	SELECT_ID_CHK   = "UCPRJ032S";	//���Ἲ�˻�
var SELECT_ID_TOP40 = "UCPRJ033S";	//������������Ʈ top40
var INSERT_ID 		= "UCPRJ031I";	//�������� ���
var UPDATE_ID     	= "UCPRJ031U";	//�������� ����
var DELETE_ID     	= "UCPRJ031D";	//�������� ����
var oGridS     		= "";           //������������Ʈ
var oGridC      	= "";           //�ý���
var gsXaFlag      	= "";			//ȭ�����
var gsCurrow      	= -1;			//���÷ο�
var gsCurGrid     	= "";			//���ñ׸���
var gsCurKey     	= "";			//���õȰ���Ű : f.mtnc_seq�� ����. �׸������ �����ĺ�Ű�̴�.
var aForms        	= null; 		//����ü��
var gaCode 			= new Array();	//�ڵ� Array
var aButton       	= null;			//��ư�迭
var aBtnMode      	=				//��ư���
[
	//���	, ����	, ����	, ���	, ��ȸ	    //��ư / ����
	[ false , true  , true  , true	, false	] ,	// I   : �ʱ�ȭ
	[ true  , false , true  , false , false	] ,	// A   : ���
	[ false , false , false , false , false	] ,	// U   : ����
	[ true  , true  , true  , true  , true 	]	// X   : ���ŷ
];
/**
 *�ʱ�ȭ
 */
function init()
{
	//��ư�ʱ�ȭ
	aButton = [ f.btnAdd, f.btnSave, f.btnDel, f.btnCancel, fQuery.btnSearch ];

	//����ü�ʱ�ȭ
	aForms = [ f.mtnc_nm  	, f.strt_date	, f.end_date	  , f.mtnc_cost	 	, f.regular_chk
	         , f.mtnc_type  , f.dvlp_frwk	, f.rmk ];

		   //, f.clnt_corp_seq , f.clnt_corp_nm 	, f.coop_corp_seq	, f.coop_corp_nm

	//�׸����ʱ�ȭ
	oGridS = document.getElementById(SELECT_ID);
	oGridC = document.getElementById(SELECT_ID_CODE);
	oGridC.bHDVisible  		 = false;
	oGridC.strHDClickAction  = "select";
 	oGridC.strScrollBars 	 = "vertical";
 	oGridC.bStatusbarVisible = false;
 	oGridC.nHDLineSize 		 = 17;

	//ȭ���ʱ�ȭ
	setReset();

	//�ʱ���ȸ
	//query();
	queryCode();
}
/**
 * ȭ���ʱ�ȭ
 */
function setReset()
{
	gsCurrow  = -1;
	gsCurGrid = "";
	gsCurKey  = "";
	setMode("I",f);
	setDisabledObj(aForms, true);
	clear(f);//selectbox, input-text, textarea
	f.mtnc_seq.value      = "";//hidden
	f.prj_seq.value		  = "";//hidden
	f.clnt_corp_seq.value = "";//hidden
	f.coop_corp_seq.value = "";//hidden
	f.mtnc_system.value   = "";//hidden
	resetWorkRange();
}
/**
 * ��ư��Ʈ��
 * sType:��ư���
 */
function setMode(sType)
{
	gsXaFlag = sType;
	var mode = -1;
	switch (sType)
	{
		case "I" :	mode = 0;	break;
		case "A" :	mode = 1;	break;
		case "U" :	mode = 2;	break;
		case "X" :	mode = 3;	break;
		default  : 	break;
	}
	for( var i=0; i<aButton.length; i++ )
	{
		setButton( aButton[i], aBtnMode[mode][i]);
	}
}
/**
 * �ڵ���ȸ
 */
function queryCode()
{
	var tran = new GridTrans();
	tran.setPageRow("9999");
	tran.setSvc(SELECT_ID_CODE);
	tran.setUserParams("up_cd=PRJ013");
	tran.setWait(false);
	tran.setCallBack("callbackQueryCode");
	tran.open("","f","/wisegrid.do");
}
/**
 * �ڵ���ȸ �ݹ�
 */
function callbackQueryCode(sSvcId)
{
	setCode();
}
/**
 * �ڵ����
 */
function setCode()
{
	var k	     = 0;
	//var nTotCnt	 = DataSet.getTotalCount(SELECT_ID_CODE);
	var nTotCnt	 = oGridC.GetRowCount();
	var hParam   = "";
	var sCode    = "";
	var sCodeNm  = "";

	//�ڵ�迭����
	for(var i=0; i<nTotCnt; i++)
	{
		//hParam   = DataSet.getHashParam(SELECT_ID_CODE, "1", i);
		//sCode    = hParam.get( "code"    );
		//sCodeNm  = hParam.get( "code_nm" );

		sCode    = oGridC.GetCellValue("code", i);
		sCodeNm  = oGridC.GetCellValue("code_nm", i);

		gaCode[k] = new Array(2);
		gaCode[k][0] = sCode;
		gaCode[k][1] = sCodeNm;
		k++;
	}
}

var old_stnd_date= ""
function getEndYn(obj)
{
	if (obj.checked == true) 
	{
		fQuery.stnd_date.disabled=false;
		fQuery.stnd_date.value = old_stnd_date ;
	}	
	else 
	{
		old_stnd_date = fQuery.stnd_date.value;
		fQuery.stnd_date.disabled=true;
		fQuery.stnd_date.value ="";
	}
}
/**
 * ��ȸ
 */
function query( aFlg )
{
	var svc_id = "";
	if( aFlg == "REFRESH" )
	{
		svc_id = SELECT_ID_TOP40;
	}else{
		if ( getValidation(fQuery, true) == false ) {return;}
	//	if ( !checkTermDate(fQuery.reg_dt_s, fQuery.reg_dt_e, true, true, "") ){return;}
		svc_id = SELECT_ID;
	}

	var tran = new Trans();
	tran.setPageRow("9999");
	tran.setSvc( svc_id );
	tran.setDisSvc(SELECT_ID);
	tran.setWiseGrid("1");
	tran.setForwardId("wgdsl","");
	tran.setDefClick("true");
	tran.setCallBack("callbackQuery");
	setMode("X", f);
	if (fQuery.user_type.value != "") 
	{
		tran.setMyUserParams("user_"+fQuery.user_type.value, "1");
		tran.setMyUserParams(fQuery.user_type.value+"_user_id", fQuery.user_id.value);
	}
	tran.open("fQuery","f","/wisegrid.do");
}
/**
 * ��ȸ�ݹ�
 * svcid  : ����ID
 */
function callbackQuery(sSvcId)
{
	setSystemName();
	if ( parseInt( oGridS.GetRowCount()) < 1 ){setReset();}
}
/**
 * ���Ŭ��
 * id           : Ŭ���� �׸��尴üID
 * strColumnKey : Ŭ���� �÷���
 * nRow         : Ŭ����Row Index
 */
function showDetailO_obj(id, strColumnKey, nRow)
{
	if(id==SELECT_ID)
	{
	 	gsCurrow  = nRow;
	 	gsCurGrid = id;
	 	gsCurKey  = oGridS.GetCellValue("mtnc_seq", nRow);
		setMode("U",f);
		setDisabledObj(aForms ,false);
		showDetailByWise(id, nRow, f);
		setWorkRange(oGridS.GetCellValue("mtnc_system", nRow));//��������

		
	}
}

/**
 * ��� ���� Ŭ��
 * id           : Ŭ���� �׸��尴üID
 * strColumnKey : Ŭ���� �÷���
 * nRow         : Ŭ����Row Index
 */
function showDetailB_obj(id, strColumnKey, nRow)
{
	var url = "/jsp/dashboard/dasMtncStatP.jsp";
	var str = "";
	str += "mtnc_seq="+ f.mtnc_seq.value;
	openPopup(url, str, "dasMtncStatP", "", "", "1025", "910", "toolbar=no,scrollbars=no,resizable=no");
}

/**
 * �������� ���ڿ�����
 * sSvcId  : ����ID
 */
function setSystemName()
{
	try{
		var nRowCnt  = oGridS.GetRowCount();
		var nlen     = gaCode.length;
		var codenm   = "";

		for( var i=0; i<nRowCnt; i++ )
		{
			var work_range = trim(oGridS.GetCellValue("mtnc_system" , i));

			if(work_range!="")	//��� �迭���̴�1�̴�
			{
				var aCodes     = work_range.split(",");

				for(var j=0; j<aCodes.length ;j++)
				{
					for(var k=0; k<nlen; k++)
					{
						if(aCodes[j] == gaCode[k][0])
						{
							codenm += ((codenm.length>0 ? ", " : "") + gaCode[k][1]);
							break;
						}
					}
				}

				oGridS.SetCellValue( "mtnc_system_nm" , i, codenm );
				codenm = "";
			}
		}
	}catch(e){}
}
/**
 * �ý��� �ʱ�ȭ
 */
function resetWorkRange()
{
	for(var j=0; j<oGridC.GetRowCount(); j++)
	{
		oGridC.SetCellValue("chk", j, 0);
	}
	if(oGridC.GetRowCount()>0)
	{
		oGridC.MoveRow(0);	//selectRow(oGrid, 0); ������������.
	}
}
/**
 * �ý��� �� ����
 * pWorkRange  : �ý����ڵ�
 */
function setWorkRange( pWorkRange )
{
	resetWorkRange();

	if(pWorkRange != "")
	{
		var aWorkRange = pWorkRange.split(",");

		for(var i=0; i<aWorkRange.length; i++)
		{
			for(var j=0; j<oGridC.GetRowCount(); j++)
			{
				if(aWorkRange[i] == oGridC.GetCellValue("code", j))
				{
					oGridC.SetCellValue("chk", j, 1);
					break;

				}
			}
		}
	}
}
/**
 * �ý��� �� ����
 * return  : �ý����ڵ�
 */
function getWorkRange()
{
	var sWorkRange = "";

	for(var i=0; i<oGridC.GetRowCount(); i++)
	{
		if( oGridC.GetCellValue("chk", i)==1 )
		{
			sWorkRange += (","+oGridC.GetCellValue("code", i));
		}
	}
	return (sWorkRange.substr(1));
}
/**
 * ��Ϲ�ưŬ��
 */
function add()
{
	setMode("A",f);
	setDisabledObj(aForms ,false);
	clear(f);
	f.mtnc_seq.value      = "";//hidden
	f.clnt_corp_seq.value = "";//hidden
	f.coop_corp_seq.value = "";//hidden
	f.mtnc_system.value   = "";//hidden
	resetWorkRange();
}
/**
 * ��ҹ�ưŬ��
 */
function cancel()
{
	if( gsCurrow>-1 )
	{
		gsCurrow = findGridRow(oGridS, "mtnc_seq", gsCurKey);
		showDetailO_obj( gsCurGrid, "", gsCurrow );
	}else{
		setReset();
	}
}
/**
 * �����ưŬ��
 */
function save()
{
	if ( getValidation(f, true) == false ) {return;}
	if      (gsXaFlag == "A"){ insert(); }
	else if (gsXaFlag == "U"){ checkUsing("UPDATE"); }
}
/**
 * ���� ��ȸ
 * sMode : ����, ���� ���а�
 */
function checkUsing(sMode)
{
	var tran = new Trans();
	tran.setPageRow("9999");
	tran.setSvc(SELECT_ID_CHK);
	tran.setUserParams("mtnc_seq="+f.mtnc_seq.value);
	tran.setCallBack( (sMode=="UPDATE") ? "update" : "deleteList" );
	setMode("X", f);
	tran.open("","","/common.do");
}
/**
 * ���� ����ۼ�
 * sDataSet : ���� DataSet
 */
function makeUsingList(sDataSet)
{
	/*
	var aSheetNm = DataSet.getParamArr(sDataSet, DataSet.getCurPage(sDataSet), "plan_nm");
	var nTotCnt  = DataSet.getTotalCount(sDataSet);
	var nLenth   = ((aSheetNm.length>5) ? 5 : aSheetNm.length);
	var sTempNm  = "";

	for( var i=0; i<nLenth; i++ )
	{
		sTempNm += (aSheetNm[i] + "\n");
	}

	if( aSheetNm.length>5 ){ sTempNm +=("...\n"); }

	var sMessage = "�򰡰�ȹ���� ������� �����Դϴ�.\n\n";
	sMessage    += "�� �򰡰�ȹ�� (�� "+nTotCnt+"��) ��\n";
	sMessage    += "----------------------------------------\n";
	sMessage    += sTempNm;
	sMessage    += "----------------------------------------\n\n";
	*/

	var nTotCnt  = DataSet.getParam(SELECT_ID_CHK, 1, 0, "cnt");
	var sMessage = "�� ������� ����������� �Դϴ�. ��\n\n";
	sMessage    += "(��ϵ� �� �������� ��û�� : "+nTotCnt+"��)\n\n";
	return sMessage;
}
/**
 * ����
 */
function update()
{
//	if(DataSet.getTotalCount(SELECT_ID_CHK) > 0)
	if(parseInt(DataSet.getParam(SELECT_ID_CHK,1,0,"cnt")) > 0)
	{
		var sMessage = makeUsingList(SELECT_ID_CHK);
		if(!MessageBox("ChgConfirm", "C", sMessage))
		{
			setMode("U", f);
			return;
		}
	}else{
		if ( !MessageBox("SavConfirm", "C", "") )
		{
			setMode("U", f);
			return;
		}
	}

	f.mtnc_system.value = getWorkRange();	//�ý��۸��

	var tran = new Trans();
	tran.setSvc(UPDATE_ID);
	//tran.setUserParams("chg_user_id="+getUserID());
	tran.setCallBack("callbackUpdate");
	setMode("X", f);
	tran.open("f","f","/common.do");
}
/**
 * �������ݹ�
 * svcid  : ����ID
 */
function callbackUpdate(sSvcId)
{
	if (parseInt(DataSet.getParam(sSvcId, 1, 0, "SUCCESS_COUNT"),10) > 0)
	{
		gsCurrow = findGridRow(oGridS, "mtnc_seq", gsCurKey);
		updateWiseGridRow(gsCurGrid, gsCurrow, f);

		var mtnc_period = dateMaskLogic( removeMask(f.strt_date.value).substr(0,6), "." )
		        + " ~ " + dateMaskLogic( removeMask(f.end_date.value ).substr(0,6), "." );
		oGridS.SetCellValue("mtnc_period" , gsCurrow, mtnc_period);

		var aCodes = f.mtnc_system.value.split(",");
		var nlen   = gaCode.length;
		var codenm = "";
		for(var j=0; j<aCodes.length ;j++)
		{
			for(var k=0; k<nlen; k++)
			{
				if(aCodes[j] == gaCode[k][0])
				{
					codenm += ((codenm.length>0 ? ", " : "") + gaCode[k][1]);
					break;
				}
			}
		}
		oGridS.SetCellValue( "mtnc_system_nm" , gsCurrow, codenm );

		setMode("U", f);
	}
}
/**
 * ���
 */
function insert()
{
	if ( !MessageBox("SavConfirm", "C", "")){return;}

	f.mtnc_system.value = getWorkRange();	//�ý��۸��
	var tran = new Trans();
	tran.setSvc(INSERT_ID);
	//tran.setUserParams("reg_user_id=" + getUserID());
	tran.setCallBack("callbackInsert");
	setMode("X", f);
	tran.open("f","f","/common.do");
}
/**
 * �������ݹ�
 * sSvcId  : ����ID
 */
function callbackInsert(sSvcId)
{
	/*
	if (parseInt(DataSet.getParam(sSvcId, 1, 0, "SUCCESS_COUNT"),10) > 0)
	{
		var sNewSeq	        = DataSet.getReqParam( sSvcId ,"_SEQ_NEXVAL");
		f.quest_cnt.value 	= 0;
		f.tot_point.value 	= 0;
		f.reg_dt.value 		= getCurDay("-");
		f.reg_user_nm.value = getUserNM();
		f.sheet_seq.value 	= sNewSheetSeq;

		var nRow  = insertWiseGridRow(SELECT_ID, -1, f);
	 	gsCurrow  = nRow;
	 	gsCurGrid = SELECT_ID;
	 	gsCurKey  = sNewSeq;
		setMode("U", f);
	}
	*/
	if (DataSet.isError(INSERT_ID) == "true") {return;}
	query( "REFRESH" );
}
/**
 * ������ưŬ��
 */
function del()
{
	checkUsing("DELETE");
}
/**
 * ����
 */
function deleteList()
{
//	if(DataSet.getTotalCount(SELECT_ID_CHK) > 0)
	if(parseInt(DataSet.getParam(SELECT_ID_CHK,1,0,"cnt")) > 0)
	{
		var sMessage = makeUsingList(SELECT_ID_CHK);
	//	MessageBox("PRJDeleteMTNC", "I",sMessage);	//���� �������� ��û���� �����ϼ���.
		MessageBox("", "I", sMessage + "���� �������� ��û���� �����ϼ���." );
		setMode("U", f);
		return;
	}
	if( !MessageBox("DelConfirm", "C", "" ) )
	{
		setMode("U", f);
		return;
	}

	var tran = new Trans();
	tran.setSvc(DELETE_ID);
	tran.setUserParams("mtnc_seq="+f.mtnc_seq.value);
	tran.setCallBack("callbackDelete");
	setMode("X", f);
	tran.open("","","/common.do");
}
/**
 * �������ݹ�
 * sSvcId : ����ID
 */
function callbackDelete(sSvcId)
{
//	if (DataSet.isError(INSERT_ID) == "true") {return;}
	if (parseInt(DataSet.getParam(DELETE_ID, 1, 0, "SUCCESS_COUNT"),10) > 0)
	{
		gsCurrow = findGridRow(oGridS, "mtnc_seq", gsCurKey);
		removeWiseGridRow(SELECT_ID, gsCurrow);
		setReset();
	}
}
/**
 * ��������
 */
function delInfo(arg)
{
	switch (arg)
	{
		case "clnt_corp" :	f.clnt_corp_seq.value = "";
							f.clnt_corp_nm.value  = "";
							break;
		case "coop_corp" :	f.coop_corp_seq.value = "";
							f.coop_corp_nm.value  = "";
							break;
		case "prj"		 :	f.prj_seq.value 	  = "";
							f.prj_nm.value 		  = "";
							break;
		default :			break;
	}
}
/**
 * ���� �˾�
 */
function openClntCorp()
{
	openCorp( "clnt_corp" );
}
/**
 * ���»��˾�
 */
function openCoopCorp()
{
	openCorp( "coop_corp" );
}
/**
 * ��ü��ȸ �˾�
 */
function openCorp( aFlg )
{
	var url = "/jsp/project/prjCorpMngP.jsp";
	var str = "";
	str += "corp=" + aFlg;
	openPopup(url, str, "prjCorpMngP", "", "", "370", "600", "toolbar=no,scrollbars=no,resizable=no");
}
/**
 * ��ü ��������
 */
function setCorp(corp, corp_seq, corp_nm)
{
	if( corp=="clnt_corp" )
	{
		f.clnt_corp_seq.value = corp_seq;
		f.clnt_corp_nm.value  = corp_nm;
	}
	else //if( corp=="coop_corp" )
	{
		f.coop_corp_seq.value = corp_seq;
		f.coop_corp_nm.value  = corp_nm;
	}
}
/**
 * ������Ʈ �˾�
 */
function openProject(frm)
{
	openPopup("/jsp/project/prjExePOP.jsp", "", "projectPop", "", "", "800", "565", "toolbar=no,scrollbars=no");
}
/**
 * ������Ʈ ��������
 */
function setProject(prj_seq, prj_nm)
{
	f.prj_seq.value = prj_seq;
	f.prj_nm.value  = prj_nm;

}
/**
 * ȸ���� �˾�
 */
function openCorpMng(frm)
{
	//openPopup("/jsp/project/prjCorpMng.jsp", "", "prjCorpMng", "", "", "1230", "830", "toolbar=no,scrollbars=no,resizable=yes");
	openPopup("/jsp/project/prjCorpMng.jsp", "", "prjCorpMng", "", "", "793", "600", "toolbar=no,scrollbars=no,resizable=no");
}

/********************
* ����� ���ù�ư
********************/
var gId ;
function openUserOrg(id)
{
	gId = id;
	
	if(typeof(openPopup) == "object")
		openPopup.close();
	
	openPopup("/jsp/common/comUserOrg.jsp", "", "popup", "0", "300", "800", "580", "toolbar=no,scrollbars=no");
}

/********************
* ����� ������(g_pop) â���� ���������� setOrgUserInfo�� ȣ���Ѵ�.
********************/
function setOrgUserInfo(id, nm, cd)
{
	eval(gId).value = id;
	eval(gId+'_nm').value = nm;

}
