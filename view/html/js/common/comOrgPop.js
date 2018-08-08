/**
 * PROJECT : INTRANET
 * NAME    : comUserOrg.js
 * DESC    : 사용자검색
 * AUTHOR  : 연구개발
 * VERSION : 1.0
 * Copyright ⓒ 2009 Nexfron. All rights reserved.
 * ============================================================================================
 * 							변		경		사		항
 * ============================================================================================
 * VERSION	   DATE		  	AUTHOR		DESCRIPTION
 * ============================================================================================
 * 1.0		2009.08.13		김은수		주석추가
 * 2.0		2013.01.13		박준규		수정
 */
/*
	1. 각 사용자에게 할당된 부서정보가 부서테이블에 없을 경우 출력되지 않도록 하였음.
	   그렇기 때문에 사용자 정보가 테이블에 있는데도 조회되지 않을 수 있음.
	2. 상위 부서를 선택하면 하위 부서들에 속한 사용자만 출력됨.
	   또한 사용여부가 사용인 부서의 사용자만 조회됨.
	3. 사용자 정보를 받을때는 opener의 이름이 메인인 경우와 메인이 아닌경우로 나뉘어
	   해당 opener로 getOrgUserInfo(user_id, user_name, user_dept) 함수를 이용하여 정보를 넘겨줌.
*/

var SELECT_TREE_ID = "UCSYS021S_1";	//사용자 조직도 조회
var oGridTr     = null; 		//조직도
/**
 * init
 */
function init()
{
	oGridTr   = document.getElementById(SELECT_TREE_ID);	//사용자
	makeTree();
}
/**
 * 조직 트리 조회
 */
function makeTree()
{
	var trans = new GridTrans();
	trans.setSvc(SELECT_TREE_ID);
	trans.setPageRow(-1);
	trans.setWiseGrid("1");
	trans.open("f", "f","/wisegrid.do");
}

/**********************
* 적용
**********************/
function Apply()
{
	var GridObj = document.all[SELECT_TREE_ID];
	var nRow = GridObj.GetActiveRowIndex();
	
	if(nRow < 0) return;
		
	var org_cd = GridObj.GetCellValue("orgcd_org", nRow);
	var org_nm = GridObj.GetCellValue("orgnm", nRow);
	
	opener.setOrg(org_cd, org_nm, "");
	window.close();
	
}


function unLoad()
{
	opener.g_pop = "";
}




