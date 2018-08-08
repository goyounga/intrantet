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
var SELECT_USER_ID = "UCSYS022S";	//사용자 리스트 조회
var oGridTr     = null; 		//조직도
var oGrid       = null;         //사용자목록
/**
 * init
 */
function init()
{
	oGrid   = document.getElementById(SELECT_USER_ID);	//사용자
	oGridTr = document.getElementById(SELECT_TREE_ID);	//조직도
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
	trans.setCallBack("callbackMakeTree");
	trans.open("f", "f","/wisegrid.do");
}
/**
 * 콜백 - 조직 트리 조회
 * svcId : service id
 */
function callbackMakeTree(svcId)
{
	if (DataSet.isError(svcId) == "true") return;
	userQuery();
}
/**
 * 트리 클릭
 */
function treeClick(obj, strTreeKey, strArea)
{
	if( obj == SELECT_TREE_ID)
	{
		var nRow  = oGridTr.GetRowIndexFromTreeKey(strTreeKey);
		userQuery(nRow);
	}
}
/**
 * 사용자 조회
 */
function userQuery(nRow)
{
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
		trans.setSvc(SELECT_USER_ID);
		trans.setPageRow(9999);
		trans.setWiseGrid("1");
		trans.setMyUserParams("use_f","Y");
		if(skey!=""){trans.setMyUserParams(skey,sVal);}
		trans.setCallBack("callbackUserQuery");
		trans.open("","","/wisegrid.do");
	}
	else //조회조건에서 조회
	{
		f.searchstr.value = trim(f.searchstr.value);

		var trans = new GridTrans();
		trans.setSvc(SELECT_USER_ID);
		trans.setPageRow(9999);
		trans.setWiseGrid("1");
		trans.setMyUserParams("use_f","Y");
		if( f.searchstr.value!="" )
		{
			trans.setMyUserParams(f.searchtype.value, f.searchstr.value);
		}
		trans.setCallBack("callbackUserQuery");
		trans.open("f","","/wisegrid.do");
	}
}
/**
 * 콜백 - 조회
 * svcid : service_id
 */
function callbackUserQuery(svcid)
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
	if(id==SELECT_USER_ID)
	{
		if(strColumnKey=="chk")
		{
			if(oGrid.GetCellValue("chk", nRow)=="1")
			{
				if(f.multiyn.value!="Y")
				{
					var len = oGrid.GetRowCount();
					for( var i=(nRow+1); i<len; i++)
					{
						oGrid.SetCellValue("chk", i, 0);
					}
					for( var i=(nRow-1); i>-1; i--)
					{
						oGrid.SetCellValue("chk", i, 0);
					}
				}
			}

		}
	}
}
/**
 * 그리드 더블클릭시 상세 정보를 보여준다.
 * id           : 클릭한 그리드객체ID
 * strColumnKey : 클릭한 컬럼명
 * nRow         : 클릭한Row Index
 */
function showDetailB_obj(id, strColumnKey, nRow)
{
	if(id==SELECT_USER_ID)
	{
		if(f.multiyn.value!="Y")
		{
			opener.setOrgUserInfo(oGrid.GetCellValue("user_id", nRow), oGrid.GetCellValue("user_nm", nRow));
			window.close();
		}
	}
}
/**
 * 선택
 * single : 주간보고 관리 작성자
 */
function check_event()
{
	var len = oGrid.GetRowCount();
	var nRow = -1;

	for(var i=0; i<len; i++)
	{
		if(oGrid.GetCellValue("chk", i) == "1")
		{
			nRow = i;
			break;
		}
	}
	if(nRow>-1)
	{
		//if(!MessageBox("","C",user_nm+"["+user_id+"] 사용자를 선택하시겠습니까?")) return;
		opener.setOrgUserInfo(oGrid.GetCellValue("user_id", nRow), oGrid.GetCellValue("user_nm", nRow));
		window.close();
	}
	else
	{
		MessageBox("", "E", "선택된 사용자가 없습니다.");
	}
}
/**
 * 선택
 * multi : 쪽지 받을 사람
 */
function choice_user()
{
	var obj	= document.UCSYS022S;
	var len = obj.GetRowCount();
	var user_id="";
	var user_nm="";
	var ps=0;

	for(i=0;i<len;i++)
	{
		chk = obj.GetCellValue("chk", i);
		if(chk == 1)
		{
			user_id = obj.GetCellValue("user_id", i);
			user_nm = obj.GetCellValue("user_nm", i);
			ps++;

		}
	}
	ps-=1;
	if(!confirm(user_nm+"["+user_id+"] 외 "+ps+"명의 사용자를 선택하시겠습니까?"))
				return;
	for(i=0;i<len;i++)
	{
		chk = obj.GetCellValue("chk", i);
		if(chk == 1)
		{
			user_id = obj.GetCellValue("user_id", i);
			user_nm = obj.GetCellValue("user_nm", i);
			opener.setOrgUserInfo(user_id, user_nm);
		}
	}
	window.close();
}


function unLoad()
{
	opener.g_pop = "";
}




