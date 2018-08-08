
var SELECT_ORG_ID		= "UCSYS021S";
var SELECT_USER_ID		= "UCSYS022S";
var INSERT_TARGET_ID	= "UCSYS066I";



/********************
* init
********************/
function init()
{
	query();
}

/********************
* 조직 조회
********************/
function query()
{
	getCorp();

	var trans = new Trans();	
	trans.setSvc(SELECT_ORG_ID);
	trans.setPageRow(-1);
	trans.setDefClick(true);
	trans.setWiseGrid("1");				// wisegrid를 사용하는 경우 반드시 추가			
	trans.setForwardId("wgdsl","");		// wisegrid를 사용하는 경우 반드시 추가
	trans.open("f", "f","/wisegrid.do");
}

/*************************
* 사용자 리스트
*************************/
function userQuery()
{
	getCorp();

	//ID, 이름 검색
	if(f.searchtype.value && f.searchstr.value)
	{
		f.search.value = "and u."+f.searchtype.value+" like '"+f.searchstr.value+"%'";
	}
	else if(f.searchtype.value && !f.searchstr.value)
	{
		alert(f.searchtype.options[f.searchtype.selectedIndex].text+"을(를) 입력하세요.");
		f.search.value = "";
		f.searchstr.focus();
		return;
	}
	else if(!f.searchtype.value && f.searchstr.value)
	{
		alert("검색조건을 선택하세요.");
		f.search.value = "";
		f.searchtype.focus();
		return;
	}
	
	var trans = new Trans();	
	trans.setSvc(SELECT_USER_ID);
	trans.setPageRow(-1);
	trans.setDefClick(true);
	trans.setWiseGrid("1");			// wisegrid를 사용하는 경우 반드시 추가			
	trans.setForwardId("wgdsl","");	// wisegrid를 사용하는 경우 반드시 추가
	trans.open("f", "f","/wisegrid.do");
}

/*************************
* 업체정보를 가져온다.
*************************/
function getCorp()
{
	corp_cd = opener.top.document.all("corp_cd_chng").value;
	corp_nm = opener.top.document.all("corp_nm_chng").value;

	f.corp_cd.value = corp_cd;
	f.corp_nm.value = corp_nm;

//	var params;
//	params = "&corp_cd="+corp_cd;
//	params += "&corp_nm="+corp_nm;
//	
//	return params;
}

/********************
* 트리 클릭이벤트
* 없으면 애러남..
* 실제적으로 showDetailO_obj function 실행
********************/
function treeClick(obj, strTreeKey, strArea)
{
}

/********************
* 상세정보 이벤트[트리클릭]
********************/
function showDetailO_obj(id, strColumnKey, nRow)
{
	//사용자 리스트 클릭시
	if(id == SELECT_ORG_ID)
	{
		if(DataSet.getTotalCount(SELECT_ORG_ID) == "0")
			return;

		var org_cd = DataSet.getParam(SELECT_ORG_ID, DataSet.getCurPage(SELECT_ORG_ID), nRow, "org_cd");

		f.org_cd.value = org_cd == '0' ? '' : org_cd;

		userQuery();
	}
}

/********************
* 적용 이벤트
********************/
function save()
{
	var obj	= document.UCSYS022S;
	var user_id		= "";
	var team_cd		= "";
	var seq			= "";
	var cnt			= 0;
	var loi_ip		= "";
	var org_cd		="";
	var user_nm		= "";
	
	for(var i=0; i<obj.GetRowCount(); i++)
	{
		if(obj.GetCellValue("user_chk", i) == "1")	//채크되었다면..
		{
			cnt++;
			
			//선택된 사용자 id
			if(user_id) user_id	+=	""+obj.GetCellValue("user_id", i);
			else user_id	=	obj.GetCellValue("user_id", i);
			
			//소속
			if(team_cd) team_cd	+=	""+obj.GetCellValue("org_cd", i);
			else team_cd	=	obj.GetCellValue("org_cd", i);
			
			// 시퀀스
			if(seq) seq +=	""+obj.GetCellValue("max_seq", i);
			else seq =	parseInt(obj.GetCellValue("max_seq", i))+cnt;
			
			//IP
			if(loi_ip) loi_ip	+=	""+obj.GetCellValue("loi_ip", i);
			else loi_ip	=	obj.GetCellValue("loi_ip", i);
			
			//이름
			if(user_nm) user_nm	+=	""+obj.GetCellValue("user_nm", i);
			else user_nm	=	obj.GetCellValue("user_nm", i);
			
		}
	}

	if(!user_id)
	{
		alert("선택된 ROW가 없습니다.");
		return;
	}
	
	if(f.memo.value == "" || f.memo.value == "null") {
		var params = "&user_id="+user_id+"&team_cd="+team_cd+"&seq="+seq;
		
		//저장
		var trans = new Trans();
		trans.setSvc(INSERT_TARGET_ID);
		trans.setUserParams(params);
		trans.open("f", "","/common.do");
	}
	else {
		var thisFrame = topFrame.getThisFrame();

		if(user_id =="")
		{
			alert("적용할 데이터가 없습니다.");
		}
		else {
			thisFrame.setData(user_id, "", loi_ip, user_nm);
		}

		this.close();
	}
}

/********************
* 엔터키 이벤트
********************/
function checkEnterKey()
{
	if(isEnterKey())
	{
		userQuery();
	}
}

/********************
* 콜백
********************/
function callback(serviceID)
{
	switch(serviceID)
	{
		case INSERT_TARGET_ID:
			if (DataSet.getParam(INSERT_TARGET_ID, 1, 0, "SUCCESS_COUNT") > 0){
				opener.tarQuery();
				userQuery();
			}
			else {
				alert("적용실패");
			}				
			break;
		default:
			break;
	}
}

/********************
* 닫기 이벤트
********************/
function unLoad()
{
	opener.popObj = "";
	//opener.tarQuery();
	self.close();
}

