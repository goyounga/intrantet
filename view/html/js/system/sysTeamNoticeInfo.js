
var SELECT_NOTICE_ID = "UCSYS113S_1";


//***********************************
// ONLOAD
//***********************************
function init()
{	
	query();
}

//***********************************
// ��ȸ
//***********************************
function query()
{	
	var trans = new Trans();
	trans.setSvc(SELECT_NOTICE_ID);
	trans.setWiseGrid("1");			// wisegrid�� ����ϴ� ��� �ݵ�� �߰�			
	trans.setForwardId("wgdsl","");	// wisegrid�� ����ϴ� ��� �ݵ�� �߰�
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
// �׸��� onclick �̺�Ʈ �Լ� 
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
// �ݱ� ��ư
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
			��ũ��Ʈ ����Ʈ���� ķ������ �̽�ũ��Ʈ�� ����ϰ� �ִٸ� ����Ʈ���� �ؽ�Ʈ ������  �ٲ۴�. 
			
			var objTbl = document.all[SELECT_NOTICE_ID];
			var noticeArry = DataSet.getParamArr(SELECT_NOTICE_ID,1,"noticetype_nm");
			for(var i=0; i< noticeArry.length; i++){
				if( noticeArry[i] == "���"){
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
