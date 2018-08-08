

var SELECT_GROUPMENULIST_ID = "UCSYS041S";			//메뉴그룹 리스트 SELECT
var INSERT_GROUPMENULIST_ID = "UCSYS042I";
var UPDATE_GROUPMENULIST_ID = "UCSYS043U";
var DELETE_GROUPMENULIST_ID = "UCSYS044D";

var SELECT_GROUPMENULISTYN_ID	= "UCSYS045S,UCSYS046S";		//권한 부여 가능한 리스트 SELECT
var SELECT_GROUPMENULISTYES_ID	= "UCSYS046S";		//권한 부여된 리스트 SELECT
var INSERT_GROUPMENULISTNO_ID	= "UCSYS047I";		//권한 부여 가능한 리스트 INSERT
var DELETE_GROUPMENULISTYES_ID	= "UCSYS048D";		//권한 부여된 리스트 DELETE
var DELETE_USERGROUP_ID			= "UCSYS049D";


/********************
* 업체변경시 재조회
********************/
function getComCorp()
{
	init();
}

//초기화
function init()
{
	query();
}

function initForm()
{
	setMode(f,"I");
	setMode(f2,"I");
	
	f.reset();
	f2.reset();
	
	document.UCSYS045S.RemoveAllData();
	document.UCSYS046S.RemoveAllData();
}

/*****************/
//조회
//메뉴그룹 리스트
/*****************/
function query()
{
	initForm();
	//getCorp();

	var trans = new Trans();
	trans.setPageRow(9999);
	trans.setSvc(SELECT_GROUPMENULIST_ID);
	trans.setDefClick(true);
	trans.setWiseGrid("1");			// wisegrid를 사용하는 경우 반드시 추가			
	trans.setForwardId("wgdsl","");	// wisegrid를 사용하는 경우 반드시 추가
	trans.open("fQuery", "f","/wisegrid.do");
}

/*************************
* 업체정보를 가져온다.
*************************/
function getCorp()
{
	corp_cd = top.document.all("corp_cd_chng").value;
	corp_nm = top.document.all("corp_nm_chng").value;

	fQuery.corp_cd.value = corp_cd;
	fQuery.corp_nm.value = corp_nm;
}

/*****************/
//조회
//권한 부여 메뉴 리스트
/*****************/
function query1()
{
	var trans = new Trans();
	trans.setPageRow(9999);
	trans.setSvc(SELECT_GROUPMENULISTYN_ID);
	trans.setWiseGrid("1,1");			// wisegrid를 사용하는 경우 반드시 추가			
	trans.setForwardId("wgdsl","");		// wisegrid를 사용하는 경우 반드시 추가
	trans.open("f", "f2","/wisegrid.do")
}


/*****************/
//상세정보
//그리드 onclick 이벤트 함수
/*****************/
function showDetailO_obj(id, strColumnKey, nRow)
{
	//메뉴 그룹리스트 클릭시
	if(id == SELECT_GROUPMENULIST_ID)
	{
		if(DataSet.getTotalCount(SELECT_GROUPMENULIST_ID) == "0")
			return;
		
		setMode(f,"U");

		showDetailByWise(SELECT_GROUPMENULIST_ID, nRow,f);

		f2.mnu_grp_id.value = f.mnu_grp_id.value;

		query2 = true;
		query1();
	}
}

/*****************/
//상세정보
//등록 버튼 클릭시
/*****************/
function add()
{
	setMode(f,"A");	

	f.mnu_grp_nm.focus();

	clear(f);

	f.corp_cd.value = fQuery.corp_cd.value;
}

/*****************/
//상세정보
//저장 버튼 클릭시 
/*****************/
function save()
{		
	if(f.mnu_grp_nm.value=="")
	{
		MessageBox("Required", "E", "메뉴그륩명")
		f.mnu_grp_nm.focus();
		return;
	}
	
	
	//등록일때			
	if (gsXaFlag == "A")
	{
		if(!MessageBox("SavConfirm", "C", ""))
			return;
		var tran = new Trans();
		tran.setSvc(INSERT_GROUPMENULIST_ID);
		tran.open("f","f","/common.do");
	}
	//수정일때
	else if (gsXaFlag == "U")
	{	
		if(!MessageBox("ChgConfirm", "C", ""))
			return;
		var tran = new Trans();
		tran.setSvc(UPDATE_GROUPMENULIST_ID);
		tran.open("f","f","/common.do");		
	}
}

/*****************/
//상세정보
//삭제 버튼 클릭시 
/*****************/
function del()
{	
	if(f.mnu_grp_id.value == "")
	{
		MessageBox("SYSDel", "E", "메뉴그룹 전체를");
	}
	else if (confirm("'" + f.mnu_grp_nm.value + "' 메뉴그룹을 삭제하시겠습니까?"))
	{	
		var tran = new Trans();
		tran.setSvc(DELETE_GROUPMENULISTYES_ID + "," + DELETE_GROUPMENULIST_ID + "," + DELETE_USERGROUP_ID);
		tran.open("f","f","/common.do");
	}
}

/*****************/
//권한부여 된 목록으로
//▶ 클릭시
/*****************/
function nextMenu()
{
	var obj	= document.UCSYS045S;
	var mnu_id		= "";
	var wrt_f		= "";
	
	for(var i=0; i<obj.GetRowCount(); i++)
	{
		if(obj.GetCellValue("mnuid_chk", i) == "1")	//채크되었다면..
		{
			//권한부여할 메뉴ID
			if(mnu_id)
				mnu_id	+=	""+obj.GetCellValue("mnu_id", i);
			else
				mnu_id	=	obj.GetCellValue("mnu_id", i);
		}
	}

	if(!mnu_id)
	{
		alert("선택된 ROW가 없습니다.");
		return;
	}
	
	var params = "&mnu_id="+mnu_id+"&wrt_f="+wrt_f;
	
	//저장
	var trans = new Trans();
	trans.setSvc(INSERT_GROUPMENULISTNO_ID);
	trans.setUserParams(params);
	trans.open("f2", "","/common.do")
}

/*****************/
//권한부여 가능 목록으로
//◀ 클릭시
/*****************/
function prevMenu()
{
	var obj	= document.UCSYS046S;
	var mnu_id		= "";
	
	for(var i=0; i<obj.GetRowCount(); i++)
	{
		if(obj.GetCellValue("mnuid_chk", i) == "1")	//채크되었다면..
		{
			//권한부여할 메뉴ID
			if(mnu_id)
				mnu_id	+=	""+obj.GetCellValue("mnu_id", i);
			else
				mnu_id	=	obj.GetCellValue("mnu_id", i);
			
		}
	}

	if(!mnu_id)
	{
		MessageBox("SYSSelectRow", "E", "");
		return;
	}
	
	var params = "&mnu_id="+mnu_id;
	
	//저장
	var trans = new Trans();
	trans.setSvc(DELETE_GROUPMENULISTYES_ID);
	trans.setUserParams(params);
	trans.open("f2", "","/common.do")
}

/*****************/
//콜백
/*****************/
function callback(sServiceID)
{
	switch (sServiceID)
	{	
		//메뉴 그룹 리스트
		case SELECT_GROUPMENULIST_ID:
			//setMode(f,"I");
			break;
		//메뉴 리스트(권한부여안된것, 된것)
		case SELECT_GROUPMENULISTYN_ID:
			break;
		case INSERT_GROUPMENULISTNO_ID:
			if (DataSet.getParam(sServiceID, 1, 0, "SUCCESS_COUNT") > 0){
				query1();
			}
			break;
		case DELETE_GROUPMENULISTYES_ID:
			if (DataSet.getParam(sServiceID, 1, 0, "SUCCESS_COUNT") > 0){
				query1();
			}
			break;
		case INSERT_GROUPMENULIST_ID:
			if (DataSet.getParam(sServiceID, 1, 0, "SUCCESS_COUNT") > 0){
				query();
			}
			break;
		case UPDATE_GROUPMENULIST_ID:
			if (DataSet.getParam(sServiceID, 1, 0, "SUCCESS_COUNT") > 0){
				query();
			}
			break;
		//메뉴 그룹 리스트 삭제
		case DELETE_GROUPMENULISTYES_ID + "," + DELETE_GROUPMENULIST_ID + "," + DELETE_USERGROUP_ID:
			query();

			break;			
		default :
			break;
	}		
}
			
//키 체크
function checkKeyPress()
{
	if(isEnterKey())
	{
		query();
	}
}

//등록시 조건에 맞게 클리어
function setMode(formName,sType)
{
	gsXaFlag = sType;
	if (!formName) formName = document.forms[0];

	if (formName!=null)
	{	
		for (var i=0; i<formName.length; i++)
		{ 	
			if(gsXaFlag == "I"){	
				if(formName.elements[i].name == "btnAdd")
						formName.elements[i].disabled = false;
				else				
					formName.elements[i].disabled = true;
			}	
			else if(gsXaFlag == "A")
			{
				if(formName.elements[i].name == "btnDel")
						formName.elements[i].disabled = true;
				else				
					formName.elements[i].disabled = false;
			}	
			else {				
				/*
				if(formName.elements[i].name == "btnSave")
					formName.elements[i].disabled = false;
				else if(formName.elements[i].name == "btnDel")
					formName.elements[i].disabled = false;
				else if(formName.elements[i].name == "menugroupnm")
					formName.elements[i].disabled = false;
				else if(formName.elements[i].name == "menugroupdesc")
				*/
					formName.elements[i].disabled = false;	
			}	
			if (formName.elements[i].type == "select-one")
				formName.elements[i].selectedIndex=0;
			else if((formName.elements[i].type == "text") || (formName.elements[i].type == "textarea"))
				formName.elements[i].value = "";
						
		}
	}		
}