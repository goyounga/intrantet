/**
 * PROJECT : INTRANET
 * NAME    : sysUserMng.js
 * DESC    : ����� ����
 * AUTHOR  : ��������
 * VERSION : 1.0
 * Copyright �� 2010 Nexfron. All rights reserved.
 * ============================================================================================
 * 							��		��		��		��
 * ============================================================================================
 * VERSION	   DATE		  	AUTHOR		DESCRIPTION
 * ============================================================================================
 * 1.0		2013.01.03		���ر�		����
 */
var SELECT_ORG_TREE_ID = "UCSYS021S_1";			//����� ������ ��ȸ
var SELECT_USERLIST_ID = "UCSYS022S";			//����� ����Ʈ ��ȸ
var SELECT_MENULIST_ID = "UCSYS046S";			//���Ѻο��ȸ޴����
var DELETE_USERLIST_ID = "UCSYS024D";			//����� ����
var SELECRT_NEW_ORG_ID = "UCSYS024S";			//�� ������ �ڵ�
var CHECK_USER_ID      = "UCSYS023S";			//�����ID �ߺ�üũ
var INSERT_USER_ID     = "UCSYS023I";			//����� ���
var UPDATE_USER_ID     = "UCSYS023U";			//����� ����
var SELECT_DEPT_C      = "UCSYS053S1";			//���ڵ���ȸ
var oGrid       = null;         //����ڸ��
var oGridMn     = null;			//�޴����
var oGridTr     = null; 		//������
var gsXaFlag    = "";			//ȭ����
var aFormCtl    = null;			//����Ʈ�ѹ迭
var aView_org_2 = new Array(3);	//��������2����
var aView_org_3 = new Array(3);	//��������3����
/**
 * init
 */
function init()
{
	oGrid   = document.getElementById(SELECT_USERLIST_ID);	//�����
	oGridMn = document.getElementById(SELECT_MENULIST_ID);	//���Ѹ޴�
	oGridTr = document.getElementById(SELECT_ORG_TREE_ID);	//������
	aFormCtl = new Array(f.user_nm          , f.user_id   ,
                         f.pos_cd           , f.grd_cd    , f.mnu_grp_id  , f.user_pwd  ,
                         f.use_f            , f.em_addr   , f.ext_no      , f.tel_no    ,
                         f.hdp_no           , f.brth      , f.wed_mday    , f.brth_tc   ,
                         f.eic_dt           , f.rtrm_dt   , f.home_zipcd  , f.home_addr ,
                         f.home_detail_addr , f.view_org_1, f.view_org_2  , f.view_org_3,
                         f.atch_file_nm );	//f.nex_dept_cd , f.dept_cd   (�� ����)
	setMode(f,"I")
	makeTree();
}
/**
 * ȭ�� ��� ����
 */
function setMode(f,sType)
{
	gsXaFlag = sType;

	switch (sType)
	{
		case "I" :	clear(f);
					setButtonDisable(f.btnAdd  , false);
					setButtonDisable(f.btnSave , true );
					setButtonDisable(f.btnDel  , true );
					setButtonDisable(f.btnCanl , true );
					setButtonDisable(f.btnPhoto, true );
					setDisabledObj(aFormCtl, true);
					oGridMn.RemoveAllData();
					closePhoto();
					f.view_org_1.selectedIndex = 0;
					for(var j=f.view_org_2.options.length-1; j>0; j--){f.view_org_2.remove(j);}
					for(var j=f.view_org_3.options.length-1; j>0; j--){f.view_org_3.remove(j);}
					document.getElementById("tdIdPhoto").innerHTML = "";
					document.getElementById("spnUserNm").innerText = "";
					break;
		case "A" :	clear(f);
					setButtonDisable(f.btnAdd  , true );
					setButtonDisable(f.btnSave , false);
					setButtonDisable(f.btnDel  , true );
					setButtonDisable(f.btnCanl , false);
					setButtonDisable(f.btnPhoto, false);
					setDisabledObj(aFormCtl, false);
					oGridMn.RemoveAllData();
					closePhoto();
					f.view_org_1.selectedIndex = 0;
					for(var j=f.view_org_2.options.length-1; j>0; j--){f.view_org_2.remove(j);}
					for(var j=f.view_org_3.options.length-1; j>0; j--){f.view_org_3.remove(j);}
					document.getElementById("tdIdPhoto").innerHTML = "";
					document.getElementById("spnUserNm").innerText = "";
					break;
		case "U" :	setButtonDisable(f.btnAdd  , false);
					setButtonDisable(f.btnSave , false);
					setButtonDisable(f.btnDel  , false);
					setButtonDisable(f.btnCanl , false);
					setButtonDisable(f.btnPhoto, false);
					setDisabledObj(aFormCtl, false);
					setDisabledObj(new Array(f.user_id), true);
					closePhoto();
					break;
	}
}
/**
 * ���� Ʈ�� ��ȸ
 */
function makeTree()
{
	var trans = new GridTrans();
	trans.setPageRow(-1);
	trans.setSvc(SELECT_ORG_TREE_ID+","+SELECRT_NEW_ORG_ID);
	trans.setWiseGrid("1,0");
	trans.setCallBack("callbackMakeTree");
	trans.open("fQuery","f","/wisegrid.do");
}
/**
 * �ݹ� - ���� Ʈ�� ��ȸ
 * svcid : service id
 */
function callbackMakeTree(svcid)
{
	if (DataSet.isError(svcid) == "true") return;

	aView_org_2[0] = new Array();
	aView_org_2[1] = new Array();
	aView_org_2[2] = new Array();
	aView_org_3[0] = new Array();
	aView_org_3[1] = new Array();
	aView_org_3[2] = new Array();

	var aData = DataSet.getParamArrHash(SELECRT_NEW_ORG_ID, 1);
	var hData = "";
	var idx2  = 0;
	var idx3  = 0;

	for(var i=0; i<aData.length; i++)
	{
		hData = aData[i];
		if(hData.get("up_cd")=="SYS032")
		{
			aView_org_2[0][idx2] = hData.get("code");
			aView_org_2[1][idx2] = hData.get("code_nm");
			aView_org_2[2][idx2] = hData.get("etc1");//�θ��ڵ�
			idx2++;
		}else{
			aView_org_3[0][idx3] = hData.get("code");
			aView_org_3[1][idx3] = hData.get("code_nm");
			aView_org_3[2][idx3] = hData.get("etc1");//�θ��ڵ�
			idx3++;
		}
	}
}
/**
 * �� ������ �޺� ����
 */
function make_view_org(lvl, obj, tg1, tg2)
{
	if(lvl=="2")
	{
		for(var j=tg1.options.length-1; j>0; j--){tg1.remove(j);}
		for(var j=tg2.options.length-1; j>0; j--){tg2.remove(j);}
		for(var i=0; i<aView_org_2[2].length; i++)
		{
			if(obj.value==aView_org_2[2][i])
			{
				tg1.options[tg1.options.length] = new Option(aView_org_2[1][i], aView_org_2[0][i], false, false);
			}
		}
	}
	else
	{
		for(var j=tg1.options.length-1; j>0; j--){tg1.remove(j);}
		for(var i=0; i<aView_org_3[2].length; i++)
		{
			if(obj.value==aView_org_3[2][i])
			{
				tg1.options[tg1.options.length] = new Option(aView_org_3[1][i], aView_org_3[0][i], false, false);
			}
		}
	}
}
/**
 * Ʈ�� Ŭ��
 */
function treeClick(obj, strTreeKey, strArea)
{
	if( obj == SELECT_ORG_TREE_ID)
	{
		var nRow  = oGridTr.GetRowIndexFromTreeKey(strTreeKey);
		userListQuery(nRow);
	}
}
/**
 * ����� ����Ʈ ��ȸ
 */
function userListQuery(nRow)
{
	setMode(f,"I");

	if(typeof(nRow)!="undefined")	//���������� ��ȸ
	{
		var skey = "";
		var sVal = "";
		switch (oGridTr.GetCellValue("depth", nRow))
		{
			case "0" : skey = "tree_view_org_0"; break;
			case "1" : skey = "tree_view_org_1"; break;
			case "2" : skey = "tree_view_org_2"; break;
			case "3" : skey = "tree_view_org_3"; break;
		}
		sVal = oGridTr.GetCellValue("orgcd_org", nRow);

		var trans = new GridTrans();
		trans.setSvc(SELECT_USERLIST_ID);
		trans.setPageRow(9999);
		trans.setWiseGrid("1");
		trans.setDefClick(true);
		trans.setMyUserParams("use_f","Y");
		if(skey!=""){trans.setMyUserParams(skey,sVal);}
		trans.setCallBack("callbackUserList");
		trans.open("","","/wisegrid.do");
	}
	else //��ȸ���ǿ��� ��ȸ
	{
		fQuery.searchstr.value = trim(fQuery.searchstr.value);

		var trans = new GridTrans();
		trans.setSvc(SELECT_USERLIST_ID);
		trans.setPageRow(9999);
		trans.setWiseGrid("1");
		trans.setDefClick(true);
		if( fQuery.searchstr.value!="" )
		{
			trans.setMyUserParams(fQuery.searchtype.value, fQuery.searchstr.value);
		}
		trans.setCallBack("callbackUserList");
		trans.open("fQuery","","/wisegrid.do");
	}
}
/**
 * �ݹ� - ��ȸ
 * svcid : service_id
 */
function callbackUserList(svcid)
{
	if(DataSet.isError(svcid) == "true") return;
}
/**
 * �׸��� Ŭ���� �� ������ �����ش�.
 * id           : Ŭ���� �׸��尴üID
 * strColumnKey : Ŭ���� �÷���
 * nRow         : Ŭ����Row Index
 */
function showDetailO_obj(id, strColumnKey, nRow)
{
	if(id==SELECT_USERLIST_ID)
	{
		setMode(f,"U");
		showDetailByWise(id, nRow, f);
		make_view_org("2", f.view_org_1, f.view_org_2, f.view_org_3);
		f.view_org_2.value = oGrid.GetCellHiddenValue("view_org_2", nRow);
		make_view_org("3", f.view_org_2, f.view_org_3);
		f.view_org_3.value = oGrid.GetCellHiddenValue("view_org_3", nRow);
		viewIdPhoto(nRow);	//��������
		searchUserMenu();	//����� �޴���� ��ȸ
	}
}
/**
 * ����ڸ޴���� ��ȸ
 */
function searchUserMenu()
{
	var trans = new GridTrans();
	trans.setPageRow(-1);
	trans.setSvc(SELECT_MENULIST_ID);
	trans.setWiseGrid("1");
	trans.open("f","f","/wisegrid.do");
}
/**
 * ���
 */
function addData()
{
	setMode(f,"A");
}
/**
 * ���
 */
function canlData()
{
	var idx = oGrid.GetActiveRowIndex();
	if (idx == -1)
	{
		setMode(f,"I");
	}else{
		showDetailO_obj(SELECT_USERLIST_ID, "user_nm", idx);
	}
}
/**
 * ���� 1st - �����ID �ߺ�üũ
 */
function checkSave()
{
	if(getValidation(f, true) == false) return;

	if(gsXaFlag =="A")
	{
		if(!MessageBox("RegConfirm", "C", "")) return;

		var tran = new Trans();
		tran.setSvc(CHECK_USER_ID);//�ߺ�üũ
		tran.setCallBack("callbackCheckUserId");
		tran.open("f","f","/common.do");
	}
	else if(gsXaFlag =="U")
	{
		if(!MessageBox("ChgConfirm", "C", "")) return;
		saveData();
	}
}
/**
 * �ݹ� - ���� 1st : ����� �ߺ�üũ
 * svcid : service_id
 */
function callbackCheckUserId(svcid)
{
	if(DataSet.isError(svcid) == "true") return;
	var cnt = parseInt(DataSet.getParam(CHECK_USER_ID, 1, 0, "cnt"),10);
	if(cnt==0){saveData();}
	else      {MessageBox("INFUserExist", "E", "");}
}
/**
 * ���� 2nd
 */
function saveData()
{
	var service_id = "";
	if     (gsXaFlag =="A"){service_id = INSERT_USER_ID;}
	else if(gsXaFlag =="U"){service_id = UPDATE_USER_ID;}

	var tran = new Trans();
	tran.setSvc(service_id);
	tran.setCallBack("callbackSaveData");
	tran.open("f","","/common.do");
}
/**
 * �ݹ� - ���� 2nd
 * svcid : service_id
 */
function callbackSaveData(svcid)
{
	if(DataSet.isError(svcid) == "true") return;
	userListQuery();
}
/**
 * ����
 */
function delData()
{
	if(f.user_id.value == "")
	{
		MessageBox("", "E", "������ ����ڰ� �����ϴ�."); return;
	}

	var str = "\n";
	str += "�� ����ڰ� �����˴ϴ�. ������ ��ġ �������\n\n";
	str += "'��뿩��'�� '������' ���� �����ϼ���. \n\n\n";
	str += f.user_nm.value + "(" + f.user_id.value + ") ����ڸ�";
	if(!MessageBox("DelConfirm", "C", str)) return;

	var tran = new Trans();
	tran.setSvc(DELETE_USERLIST_ID);
	tran.setUserParams("user_id="+f.user_id.value);
	tran.setCallBack("callbackDelete");
	tran.open("","","/common.do");
}
/**
 * �ݹ�-����
 */
function callbackDelete()
{
	if(DataSet.isError(DELETE_USERLIST_ID) == "true") return;

	if(parseInt(DataSet.getParam(DELETE_USERLIST_ID, 1, 0, "SUCCESS_COUNT"),10) > 0)
	{
		setMode(f,"I");
		userListQuery();
	}
}
/**
 * �޴��׷� ����
 */
function changeGroup()
{
	searchUserMenu();
}
/**
 *  ������� â ����
 */
function photoUpload()
{
	document.getElementById("divUpload").style.display = "";
}
/**
 * ������� ����÷�� â Ŭ����
 */
function closePhoto()
{
	document.frames("iUpload").location.reload();
	document.getElementById("divUpload").style.display = "none";
}
/**
 * ��������
 */
function photoSave()
{
	if(iUpload.fUpload._UPLOAD_FILE.value !="")
	{
		var file_nm =iUpload.fUpload._UPLOAD_FILE.value;
		filenm = file_nm.split("\\");
		filenm = filenm[filenm.length-1];
		filenm = file_nm.split(".");
		filenm = filenm[filenm.length-1];

		if(filenm.toUpperCase() == "JPG" || filenm.toUpperCase() == "GIF")
		{
			document.frames("iUpload").upload("");
		}
		else
		{
			alert("Ȯ���ڰ� GIF, JPG���ϸ� ��ϰ��� �մϴ�.")
		}
	}
}
/**
 * ���ϸ� �޴� �̺�Ʈ
 * iUpload(upload.jsp)�κ��� ȣ��ȴ�.
 */
function setFileName(oldFileName, newFileName)
{
    f.atch_file_nm.value = newFileName;
	closePhoto();
}
/**
 * ���� ����
 */
function viewIdPhoto(nRow)
{
	var user_id         = oGrid.GetCellValue("user_id", nRow);
	var user_nm         = oGrid.GetCellValue("user_nm", nRow);
	var atch_file_nm    = oGrid.GetCellValue("atch_file_nm", nRow);
	var upload_img_path = f.UPLOAD_IMG_PATH.value.split("view");
//	var img_url         = upload_img_path[1]+"/identification/id_"+user_id+".jpg";
	var img_url         = upload_img_path[1]+ "/" +  atch_file_nm;
	var strHTML         = "<img src='"+img_url+"' border='0' width='165' height='256' onload='resizeingPhoto(this)'><br>";
	document.getElementById("tdIdPhoto").innerHTML = strHTML;
	document.getElementById("spnUserNm").innerText = user_nm;
}
/**
 * ���� ������¡
 */
function resizeingPhoto(objPhoto)
{
	var oImgOrg = new Image();
	oImgOrg.src = objPhoto.src;

	var basisXY;
	if( (oImgOrg.width/objPhoto.width) > (oImgOrg.height/objPhoto.height) )
	{
		basisXY = "W";
	}else{
		basisXY = "H";
	}

	if (basisXY == "W")
	{
		objPhoto.height = Math.round(oImgOrg.height*(objPhoto.width /oImgOrg.width));
	}else{
		objPhoto.width  = Math.round(oImgOrg.width *(objPhoto.height/oImgOrg.height));
	}

	document.getElementById("tdIdPhoto").style.height = objPhoto.height;
}
/**
 * �μ��ڵ���
 */
function chgDept(dept_cd)
{
	var trans = new Trans();
	trans.setSvc(SELECT_DEPT_C);
	trans.setPageRow(9999);
	trans.setAsync(false);
	trans.setWait(false);
	trans.setMyUserParams("id",   "dept_cd");
	trans.setMyUserParams("etc1",   f.nex_dept_cd.value);
	trans.setCallBack("callbackChgDept('"+dept_cd+"')");
	trans.open("","f","/common.do");
}

/**
 * �μ��ڵ��� �ݹ�
 */
function callbackChgDept(dept_cd)
{
     if(dept_cd == "undefined") dept_cd = "";

	 f.dept_cd.value = dept_cd;
}