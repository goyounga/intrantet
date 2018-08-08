
var SELECT_MENUMNG_ID	= "UCSYS031S";		//메뉴 트리
var SELECT_MENUMNG_ID1	= "UCSYS032S";		//메뉴 상세조회
var INSERT_MENUMNG_ID	= "UCSYS032I";
var UPDATE_MENUMNG_ID	= "UCSYS033U";
var DELETE_MENUMNG_ID	= "UCSYS034D";
var UPDATE_SORT_ID	 	= "UCSYS035U";
var DELETE_GROUPMENULISTYES_ID = "UCSYS048D";	

var radioFlag ="DOWN";
var gsXaFlag ="";
var sortIdx = -1;

/****************/
// 초기화
/*****************/
function init()
{
	makeTree();		
}

//트리구조 
function query()
{	
	var trans = new Trans();
	trans.setPageRow(999);
	trans.setSvc(SELECT_MENUMNG_ID);
	trans.setWiseGrid("1");
	trans.setDefClick(true);
	trans.setForwardId("wgdsl","");
	trans.open("fQuery","f","/wisegrid.do");
}

//트리구조 
function makeTree()
{
	var trans = new Trans();
	trans.setPageRow(999);
	trans.setSvc(SELECT_MENUMNG_ID);
	trans.setWiseGrid("1");
	trans.setDefClick(true);
	trans.setForwardId("wgdsl","");
	trans.open("fQuery","f","/wisegrid.do");
}

//wiseGrid 트리이벤트
function treeClick(obj, strTreeKey, strArea)
{
	var params = "";
	
	params = "mnu_id="+strTreeKey;

	var trans = new Trans();
	trans.setPageRow(1);
	trans.setUserParams(params);
	trans.setSvc(SELECT_MENUMNG_ID1);
	trans.open("","f","/common.do");
}

function detailView()
{
	setMode(f,"I");

	showDetail(SELECT_MENUMNG_ID1, 0, f);

	f.fst_id.value	= f.mnu_id.value.substr(0,2);
	f.lst_id.value	= f.mnu_id.value.substr(2,2);

	upMenuState();
	
	f.orgmenuid.value = f.mnu_id.value;
	
	selectType();
}

//상위메뉴시 변경 불가
function upMenuState()
{	
	if(f.upmnu_id.value == "0000")
	{
		f.fst_id.disabled = true;
		f.lst_id.disabled = true;				
	}
}

//화면위치 입력 방식
function selectURL()
{
	if(f.urlType.value == "PATH")
	{
		f.sr_url.readOnly = false;
		f.sr_url.disabled = false;
		f.sr_url.value = "" ;
		openFileDir();
	}
	else if(f.urlType.value == "LINK")
	{
		f.sr_url.readOnly = false;
		f.sr_url.disabled = false;
		f.sr_url.focus();
		//f.screenURL.value = "" ;
	}
	else
	{
		//f.sr_url.readOnly = true;
		//f.sr_url.disabled = true;
	}
}

function callback(sid)
{
	switch (sid)
	{
		case INSERT_MENUMNG_ID:

			if (DataSet.getParam(INSERT_MENUMNG_ID, 1, 0, "SUCCESS_COUNT") > 0)
			{
				init();
			}

			break;
			
		case UPDATE_MENUMNG_ID:

			if (DataSet.getParam(UPDATE_MENUMNG_ID, 1, 0, "SUCCESS_COUNT") > 0)
			{
				init();
			}

			break;
			
		case UPDATE_SORT_ID:

			if (DataSet.getParam(UPDATE_SORT_ID, 1, 0, "SUCCESS_COUNT") > 0)
			{
				init();
			}

			break;
			
		case DELETE_GROUPMENULISTYES_ID+","+ DELETE_MENUMNG_ID:

			init();

			break;
			
		case SELECT_MENUMNG_ID:

			if (DataSet.getTotalCount(SELECT_MENUMNG_ID) > 0)
			{
				document.all(SELECT_MENUMNG_ID).CollapseTreeAll();

				treeClick(SELECT_MENUMNG_ID, DataSet.getParam(SELECT_MENUMNG_ID, 1, 0, "mnu_id"), '');
			}

			break;
			
		case SELECT_MENUMNG_ID1:

			detailView();

			break;
			
		default:
			break;			
	}
}
















//화면형태 선택
function selectType()
{
	if(f.sr_frm_cd.value == "01")
	{
		f.pup_sr_wth.disabled = true;
		f.pup_sr_hgt.disabled = true;
		f.pup_x_cdt.disabled = true;
		f.pup_y_cdt.disabled = true;
		f.pup_sr_wth.value = "";
		f.pup_sr_hgt.value = "";
		f.pup_x_cdt.value = "";
		f.pup_y_cdt.value = "";
	}	
	else if(f.sr_frm_cd.value == "02")
	{		
		f.pup_sr_wth.disabled = false;
		f.pup_sr_hgt.disabled = false;
		f.pup_x_cdt.disabled = false;
		f.pup_y_cdt.disabled = false;
		f.pup_sr_wth.focus();
	}
	else
	{
		f.pup_sr_wth.disabled = true;
		f.pup_sr_hgt.disabled = true;
		f.pup_x_cdt.disabled = true;
		f.pup_y_cdt.disabled = true;
		f.pup_sr_wth.value = "";
		f.pup_sr_hgt.value = "";
		f.pup_x_cdt.value = "";
		f.pup_y_cdt.value = "";
	}
}

//내려받기
function setMenu()
{
	if (confirm("현재 메뉴를 적용하시겠습니까?"))
	{
		ifmMenu.location.href= "/common.do?_SERVICE_ID=UCSYS031S&_FORWARD_ID=commonjsp&_FORWARD_PAGE=/jsp/system/sysMenuWrite.jsp&_PAGE_ROW=9999&_START_ROW=1&column=1&keyword=1";
	}
}

function msg()
{
	alert("처리되었습니다.");	
}

//파일 경로
function openFileDir(){
	window.open("/jsp/common/comFilePath.jsp", "dirWin", "toolbar=no,scrollbars=no,top=0,left=300,width=320,height=250");	
	//setOpener(f);
	//openPopup("/common/comFilePath.jsp","FilePath" ,320,250);	
}
//파일 경로 받기
function setFilePath(fileName){
	//alert(fileName);
	f.sr_url.value = fileName;	
}

//상위메뉴 등록
function hAdd()
{   
	setMode(f,"HA");
	//상위메뉴 등록일시 기본값 셋팅
	f.fst_id.focus(); 
	f.upmnu_id.value ="0000";
	f.upmnu_nm.value = "ROOT";
	f.lst_id.value	= f.upmnu_id.value.substr(2,2);
	f.mnu_id.value = "";
	f.lup_ord.value = 0;
}

//하위메뉴 등록
function lAdd()
{   
	if(!f.mnu_id.value) return;
	setMode(f,"LA");
	//하위메뉴 등록일시 기본값 셋팅
	f.lst_id.focus();
	f.upmnu_id.value = f.mnu_id.value.substr(0,2) + "00";
	//upMenunm();	
	f.fst_id.value	= f.mnu_id.value.substr(0,2);
	f.mnu_id.value = "";
}

function mod()
{
	setMode(f,"M");
}

// 저장 버튼 클릭시 
function save(){	
	//if(getValidation(f,true)== false || idValue() == false) return false;
	
	if(f.fst_id.value=="" ||f.lst_id.value=="")
	{
		alert("메뉴ID를 입력해 주세요");
		return;
	}else if(f.mnu_nm.value =="")
	{
		alert("메뉴명을 입력해 주세요");
		f.mnu_nm.focus();
		return;
//	}else if(f.urlType.value =="")
//	{
//		alert("화면위치를 입력해 주세요");
//		f.urlType.focus();
//		return;
	}else if(f.sr_url.value =="")
	{
		alert("화면위치를 입력해 주세요");
		f.sr_url.focus();
		return;
	}
	alert(1);
	//if(gsXaFlag != "M" && getPkValidation() == false )return false;
	if(false )return false;
	else
	{
		//등록일때
		if (gsXaFlag == "HA" ||gsXaFlag == "LA" )
		{
		
			if(!confirm("등록 하시겠습니까?")) return;
			var trans = new Trans();
			trans.setSvc(INSERT_MENUMNG_ID);
			trans.open("f","f","/common.do");
		}
		//수정일때
		else if (gsXaFlag == "M")
		{
			if(!confirm("수정 하시겠습니까?")) return;
			var trans = new Trans();
			trans.setSvc(UPDATE_MENUMNG_ID);
			trans.open("f","f","/common.do");		
		}
	}
}

//삭제 버튼 클릭시
function del()
{
	var temp = f.mnu_id.value;
	if( f.step.value == 1 ) f.mnu_id.value = f.mnu_id.value.substr(0,2);	
	if(f.mnu_id.value == "" || temp == ""){
		alert("메뉴 전체를 삭제할수 없습니다.");
	}
	else if (!confirm(f.mnu_nm.value + "(" + temp + ") " + "메뉴를 삭제하시겠습니까?"))
		return;
		
	f.menudel.value = f.mnu_id.value;
	var trans = new Trans();
	trans.setSvc(DELETE_GROUPMENULISTYES_ID + "," + DELETE_MENUMNG_ID);
	trans.open("f","f","/common.do");
}

//메뉴 아이디 Validation체크
function getPkValidation()
{
	var menuFlag="F";
	if(f.mnu_id.value.length == 4){
		if(DataSet.getTotalCount(SELECT_MENUMNG_ID, 1, "mnu_id") < 1) {	//처음으로 값 입력시
			return true;		
		}
		else
		{	//값이 존재 할때 입력			
			var pkMenuIDArr=DataSet.getParamArr(SELECT_MENUMNG_ID, 1, "mnu_id"); 
			for(i=0; i<pkMenuIDArr.length; i++){
				if(gsXaFlag == "HA" || gsXaFlag == "LA")
				{
					if(pkMenuIDArr[i] == f.mnu_id.value){			
						alert("메뉴 ID값이 이미 존재 합니다.");
						f.mnu_id.value= "";	
						if(gsXaFlag == "HA")
							f.fst_id.focus();
						else 
							f.lst_id.focus();
							
						return false;
					}
					else if(pkMenuIDArr[i] == (f.mnu_id.value.substr(0,2) + "00"))
					{
						menuFlag = "T";
					}
				}
				else if( gsXaFlag == "M" )
				{
					if( i != sortIdx )
					{
						if(pkMenuIDArr[i] == f.mnu_id.value)
						{			
							alert("메뉴 ID값이 이미 존재 합니다.");
							f.mnu_id.value= "";	
							return false;
						}
						else if(pkMenuIDArr[i] == (f.mnu_id.value.substr(0,2) + "00"))
						{
							menuFlag = "T";
						}
					}
				}
				
			}
		}
	}
	else {
		alert("메뉴ID 길이가 맞지 않습니다");
		return false;
	}
	if(menuFlag == "T" || gsXaFlag == "HA" || f.step.value == 1)
	{
		return true;
	}
	else 
	{
		alert("상위메뉴가 존재하지 않습니다");
		f.fst_id.focus();
		return false;
	}
}

//메뉴 아이디 값 설정
function idValue()
{
	if(f.mnu_id.value.length == 4){

	}	else { 
			alert("ID 길이가 맞지 않습니다");
			if(gsXaFlag == "HA" || f.step.value == 1)
			{
				f.fst_id.focus();	
			}
			else if(gsXaFlag == "LA" || f.step.value == 3)
			{
				f.lst_id.focus();	
			}	
			return false;
		}
	return true;
}

//메뉴코드 합치기
function menuIdMarge()
{
	f.mnu_id.value = f.fst_id.value + f.lst_id.value;
}

//등록시 조건에 맞게 상태 조정
function setMode(f,sType)
{
	gsXaFlag = sType;
	if (!f) f = document.forms[0];
	if (f!=null)
	{	
		for (var i=0; i<f.length; i++)
		{
			//상위메뉴 버튼만 사용 가능
			if(gsXaFlag == "I")
			{
				if(f.elements[i].name == "btnHAdd")				
					f.elements[i].disabled = false;
				else if(f.elements[i].name == "btnLAdd" && DataSet.getParam(SELECT_MENUMNG_ID1, 1, 0, "step") == "1")
					f.elements[i].disabled = false;
				else if(f.elements[i].name == "btnMod")
					f.elements[i].disabled = false;
				else if(f.elements[i].name == "btnDel")
					f.elements[i].disabled = false;
				else
					f.elements[i].disabled = true;
					
				f.upmnu_id.value = "";
				f.upmnu_nm.value = "";
			}
			else if(gsXaFlag == "HA")
			{
				if(f.elements[i].name == "lst_id")			
					f.elements[i].disabled = true;
				else if(f.elements[i].name == "btnLAdd")			
					f.elements[i].disabled = true;
				else if(f.elements[i].name == "btnDel")			
					f.elements[i].disabled = true;
				else if(f.elements[i].name == "lup_ord")			
					f.elements[i].disabled = true;
				else if(f.elements[i].name == "btnMod")
					f.elements[i].disabled = true;
				else f.elements[i].disabled = false;
			}
			else if(gsXaFlag == "LA")
			{
				if(f.elements[i].name == "fst_id")				
					f.elements[i].disabled = true;
				else if(f.elements[i].name == "btnDel")			
					f.elements[i].disabled = true;
				else if(f.elements[i].name == "btnMod")
					f.elements[i].disabled = true;
				else f.elements[i].disabled = false;
			}
			else if(gsXaFlag == "M")
			{
				if(
					f.elements[i].name == "btnHAdd"
					|| f.elements[i].name == "btnLAdd"
					|| f.elements[i].name == "btnMod"
				)
					f.elements[i].disabled = true;
				else
					f.elements[i].disabled = false;
					
			}
			else f.elements[i].disabled = false;	

			//항상 고정인 요소들		
			/*
			if(f.elements[i].name == "ordertype")
				f.elements[i].disabled = false;
			else if(f.elements[i].name == "orderby")
				f.elements[i].disabled = false;
			else if(f.elements[i].name == "btnOK")
				f.elements[i].disabled = false;	
			else 
			*/
			if(f.elements[i].name == "downXML")
				f.elements[i].disabled = false;
			else if(f.elements[i].name == "upmnu_id")
				f.elements[i].disabled = true;
			else if(f.elements[i].name == "upmnu_nm")
				f.elements[i].disabled = true;
			else if(f.elements[i].name == "sr_url")
				f.elements[i].disabled = true;
			else if(f.elements[i].name == "pup_sr_wth")
				f.elements[i].disabled = true;	
			else if(f.elements[i].name == "pup_sr_hgt")
				f.elements[i].disabled = true;
			else if(f.elements[i].name == "pup_x_cdt")
				f.elements[i].disabled = true;
			else if(f.elements[i].name == "pup_y_cdt")
				f.elements[i].disabled = true;		
					
				
			//나머지 Clear
			if(gsXaFlag == "M" || f.elements[i].name == "upmnu_id" || f.elements[i].name == "upmnu_nm" || f.elements[i].name == "mnu_id")
			{  //상위 메뉴는 클리어 X
			}
			else if (f.elements[i].type == "select-one")
				f.elements[i].selectedIndex=0;
			else if((f.elements[i].type == "text") || (f.elements[i].type == "textarea"))
				f.elements[i].value = "";			
		}
	}		
}

//엔터키 입력시
function checkEnterKey()
{
	if(isEnterKey())
	{
		query();
	}
}

