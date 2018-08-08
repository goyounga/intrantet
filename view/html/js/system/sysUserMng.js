/**
 * PROJECT : INTRANET
 * NAME    : sysUserMng.js
 * DESC    : 사용자 관리
 * AUTHOR  : 연구개발
 * VERSION : 1.0
 * Copyright ⓒ 2010 Nexfron. All rights reserved.
 * ============================================================================================
 * 							변		경		사		항
 * ============================================================================================
 * VERSION	   DATE		  	AUTHOR		DESCRIPTION
 * ============================================================================================
 * 1.0		2013.01.03		박준규		수정
 */
var SELECT_ORG_TREE_ID = "UCSYS021S_1";			//사용자 조직도 조회
var SELECT_USERLIST_ID = "UCSYS022S";			//사용자 리스트 조회
var SELECT_MENULIST_ID = "UCSYS046S";			//권한부여된메뉴목록
var DELETE_USERLIST_ID = "UCSYS024D";			//사용자 삭제
var SELECRT_NEW_ORG_ID = "UCSYS024S";			//신 조직도 코드
var CHECK_USER_ID      = "UCSYS023S";			//사용자ID 중복체크
var INSERT_USER_ID     = "UCSYS023I";			//사용자 등록
var UPDATE_USER_ID     = "UCSYS023U";			//사용자 수정
var SELECT_DEPT_C      = "UCSYS053S1";			//팀코드조회
var oGrid       = null;         //사용자목록
var oGridMn     = null;			//메뉴목록
var oGridTr     = null; 		//조직도
var gsXaFlag    = "";			//화면모드
var aFormCtl    = null;			//폼컨트롤배열
var aView_org_2 = new Array(3);	//신조직도2레벨
var aView_org_3 = new Array(3);	//신조직도3레벨
/**
 * init
 */
function init()
{
	oGrid   = document.getElementById(SELECT_USERLIST_ID);	//사용자
	oGridMn = document.getElementById(SELECT_MENULIST_ID);	//권한메뉴
	oGridTr = document.getElementById(SELECT_ORG_TREE_ID);	//조직도
	aFormCtl = new Array(f.user_nm          , f.user_id   ,
                         f.pos_cd           , f.grd_cd    , f.mnu_grp_id  , f.user_pwd  ,
                         f.use_f            , f.em_addr   , f.ext_no      , f.tel_no    ,
                         f.hdp_no           , f.brth      , f.wed_mday    , f.brth_tc   ,
                         f.eic_dt           , f.rtrm_dt   , f.home_zipcd  , f.home_addr ,
                         f.home_detail_addr , f.view_org_1, f.view_org_2  , f.view_org_3,
                         f.atch_file_nm );	//f.nex_dept_cd , f.dept_cd   (구 조직)
	setMode(f,"I")
	makeTree();
}
/**
 * 화면 모드 설정
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
 * 조직 트리 조회
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
 * 콜백 - 조직 트리 조회
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
			aView_org_2[2][idx2] = hData.get("etc1");//부모코드
			idx2++;
		}else{
			aView_org_3[0][idx3] = hData.get("code");
			aView_org_3[1][idx3] = hData.get("code_nm");
			aView_org_3[2][idx3] = hData.get("etc1");//부모코드
			idx3++;
		}
	}
}
/**
 * 신 조직도 콤보 생성
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
 * 트리 클릭
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
 * 사용자 리스트 조회
 */
function userListQuery(nRow)
{
	setMode(f,"I");

	if(typeof(nRow)!="undefined")	//조직도에서 조회
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
	else //조회조건에서 조회
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
 * 콜백 - 조회
 * svcid : service_id
 */
function callbackUserList(svcid)
{
	if(DataSet.isError(svcid) == "true") return;
}
/**
 * 그리드 클릭시 상세 정보를 보여준다.
 * id           : 클릭한 그리드객체ID
 * strColumnKey : 클릭한 컬럼명
 * nRow         : 클릭한Row Index
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
		viewIdPhoto(nRow);	//사진보기
		searchUserMenu();	//사용자 메뉴목록 조회
	}
}
/**
 * 사용자메뉴목록 조회
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
 * 등록
 */
function addData()
{
	setMode(f,"A");
}
/**
 * 취소
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
 * 저장 1st - 사용자ID 중복체크
 */
function checkSave()
{
	if(getValidation(f, true) == false) return;

	if(gsXaFlag =="A")
	{
		if(!MessageBox("RegConfirm", "C", "")) return;

		var tran = new Trans();
		tran.setSvc(CHECK_USER_ID);//중복체크
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
 * 콜백 - 저장 1st : 사용자 중복체크
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
 * 저장 2nd
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
 * 콜백 - 저장 2nd
 * svcid : service_id
 */
function callbackSaveData(svcid)
{
	if(DataSet.isError(svcid) == "true") return;
	userListQuery();
}
/**
 * 삭제
 */
function delData()
{
	if(f.user_id.value == "")
	{
		MessageBox("", "E", "삭제할 사용자가 없습니다."); return;
	}

	var str = "\n";
	str += "※ 사용자가 삭제됩니다. 삭제를 원치 않을경우\n\n";
	str += "'사용여부'를 '사용안함' 으로 저장하세요. \n\n\n";
	str += f.user_nm.value + "(" + f.user_id.value + ") 사용자를";
	if(!MessageBox("DelConfirm", "C", str)) return;

	var tran = new Trans();
	tran.setSvc(DELETE_USERLIST_ID);
	tran.setUserParams("user_id="+f.user_id.value);
	tran.setCallBack("callbackDelete");
	tran.open("","","/common.do");
}
/**
 * 콜백-삭제
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
 * 메뉴그룹 선택
 */
function changeGroup()
{
	searchUserMenu();
}
/**
 *  사진등록 창 오픈
 */
function photoUpload()
{
	document.getElementById("divUpload").style.display = "";
}
/**
 * 사진등록 파일첨부 창 클리어
 */
function closePhoto()
{
	document.frames("iUpload").location.reload();
	document.getElementById("divUpload").style.display = "none";
}
/**
 * 사진저장
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
			alert("확장자가 GIF, JPG파일만 등록가능 합니다.")
		}
	}
}
/**
 * 파일명 받는 이벤트
 * iUpload(upload.jsp)로부터 호출된다.
 */
function setFileName(oldFileName, newFileName)
{
    f.atch_file_nm.value = newFileName;
	closePhoto();
}
/**
 * 사진 셋팅
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
 * 사진 리사이징
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
 * 부서코드등록
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
 * 부서코드등록 콜백
 */
function callbackChgDept(dept_cd)
{
     if(dept_cd == "undefined") dept_cd = "";

	 f.dept_cd.value = dept_cd;
}