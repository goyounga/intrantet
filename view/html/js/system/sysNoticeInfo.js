/*
	1. 각 사용자에게 할당된 부서정보가 부서테이블에 없을 경우 출력되지 않도록 하였음.
	   그렇기 때문에 사용자 정보가 테이블에 있는데도 조회되지 않을 수 있음.
	2. 상위 부서를 선택하면 하위 부서들에 속한 사용자만 출력됨.
	   또한 사용여부가 사용인 부서의 사용자만 조회됨.
	3. 사용자 정보를 받을때는 opener의 이름이 메인인 경우와 메인이 아닌경우로 나뉘어
	   해당 opener로 getOrgUserInfo(user_id, user_name, user_dept) 함수를 이용하여 정보를 넘겨줌.
*/

var SELECT_NOTICE_ID = "UCSYS070S";

//var grid1 = new comGrid(); //공지사항


//***********************************
// ONLOAD
//***********************************
function init()
{	
	query();
}

//***********************************
// 조회
//***********************************
function query()
{	
	var trans = new Trans();
	trans.setPageRow(999);
	trans.setSvc(SELECT_NOTICE_ID);
	trans.setWiseGrid("1");			// wisegrid를 사용하는 경우 반드시 추가			
	trans.setForwardId("wgdsl","");	// wisegrid를 사용하는 경우 반드시 추가
	trans.open("fQuery", "fQuery","/wisegrid.do");
}


//***********************************
// showDetail
//***********************************
function showDetailO_obj(id, strColumnKey, nRow)
{
	f.noticeid.value = DataSet.getParam(id, DataSet.getCurPage(id), nRow, "noticeid");

	openNoticeDetail();	

 }

function openNoticeDetail(obj)
{
	location.href="/jsp/system/sysNoticeDetailInfo.jsp?ntce_id="+f.noticeid.value+"&gubun=ntce";
	return;
}

//***********************************
// 닫기 버튼
//***********************************
function popupClose()
{
	window.close();
}

//***********************************
// EnterKey
//***********************************
function checkEnterKey()
{
	if(isEnterKey())
	{
		query();
	}
}

//***********************************
// CALLBACK
//***********************************
function callback(sServiceID)
{
	switch (sServiceID)
	{
		case SELECT_NOTICE_ID:
		/*
			if(fQuery.idx.value != null)
			{
				showDetail(SELECT_NOTICE_ID, fQuery.idx.value, fQuery);	
				clear(fQuery)
				fQuery.idx.value = null;
			}
		*/
			/*
			스크립트 리스트에서 캠페인이 이스크립트를 사용하고 있다면 리스트에서 텍스트 색깔을  바꾼다. 
			*/
			var objTbl = document.all[SELECT_NOTICE_ID];
			var noticeArry = DataSet.getParamArr(SELECT_NOTICE_ID,1,"noticetype_nm");
			for(var i=0; i< noticeArry.length; i++){
				if( noticeArry[i] == "긴급"){
					objTbl.rows[i].style.color = "red";
				}
				else{
					objTbl.rows[i].style.color = "#555555";
				}
			}
			break;
		default : 
			break;
	}				
}	





function fileDown()
{ 
	var filepath = "";
	filepath = "D:/project/workspace/UCareFD/upload/Re_Re_safekeepingclosingSKUlist.odi" + fQuery.filenm.value;
	alert(filepath);
}
