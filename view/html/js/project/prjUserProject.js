var SELECT_SERVICE_01 	= "UCPRJ200S";

function on_Load()
{
	//fQuery.q_bse_y.value = fQuery.thisYear.value;
}

function query()
{
	if( getValidation(fQuery, true) == false ) return false;

	var trans = new Trans();
	trans.setPageRow(-1);
	trans.setSvc(SELECT_SERVICE_01);
	trans.setDefClick(true);
	trans.setWiseGrid("1");
	trans.setForwardId("wgdsl","");
	trans.open("fQuery","f","/wisegrid.do");
}


/********************
* 사용자 선택버튼
********************/
function openUserOrg(frm)
{
	g_frm = frm;
	
	if(typeof(openPopup) == "object")
		openPopup.close();
	
	openPopup("/jsp/common/comUserOrg.jsp", "", "popup", "0", "300", "800", "580", "toolbar=no,scrollbars=no");
}

/********************
* 사용자 조직도(g_pop) 창에서 선택했을때 setOrgUserInfo를 호출한다.
********************/
function setOrgUserInfo(id, nm, cd)
{
	g_frm.user_id.value = id;
	g_frm.user_nm.value = nm;

}

/********************
* 사용자 Clear버튼
********************/
function del_userID(frm)
{
	frm.user_id.value = "";
	frm.user_nm.value = "";
}