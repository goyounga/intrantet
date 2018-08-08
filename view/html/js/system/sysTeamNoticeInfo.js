
var SELECT_NOTICE_ID = "UCSYS113S_1";


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
	trans.setSvc(SELECT_NOTICE_ID);
	trans.setWiseGrid("1");			// wisegrid를 사용하는 경우 반드시 추가			
	trans.setForwardId("wgdsl","");	// wisegrid를 사용하는 경우 반드시 추가
	trans.open("fQuery", "fQuery","/wisegrid.do");
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
// 그리드 onclick 이벤트 함수 
//***********************************
function showDetailO_obj(id, strColumnKey, nRow)
{
	f.team_ntce_id.value = DataSet.getParam(id, DataSet.getCurPage(id), nRow, "team_ntce_id");

	openNoticeDetail();	
}

function openNoticeDetail(obj)
{
	location.href="/jsp/system/sysNoticeDetailInfo.jsp?ntce_id="+f.team_ntce_id.value+"&gubun=team_ntce";
	return;
}

//***********************************
// 닫기 버튼
//***********************************
function popupClose()
{
	window.close();
}


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
			
			var objTbl = document.all[SELECT_NOTICE_ID];
			var noticeArry = DataSet.getParamArr(SELECT_NOTICE_ID,1,"noticetype_nm");
			for(var i=0; i< noticeArry.length; i++){
				if( noticeArry[i] == "긴급"){
					objTbl.rows[i].style.color = "red";
				}
				else{
					objTbl.rows[i].style.color = "#555555";
				}
			}*/
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
