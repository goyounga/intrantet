/*
	1. �� ����ڿ��� �Ҵ�� �μ������� �μ����̺� ���� ��� ��µ��� �ʵ��� �Ͽ���.
	   �׷��� ������ ����� ������ ���̺� �ִµ��� ��ȸ���� ���� �� ����.
	2. ���� �μ��� �����ϸ� ���� �μ��鿡 ���� ����ڸ� ��µ�.
	   ���� ��뿩�ΰ� ����� �μ��� ����ڸ� ��ȸ��.
	3. ����� ������ �������� opener�� �̸��� ������ ���� ������ �ƴѰ��� ������
	   �ش� opener�� getOrgUserInfo(user_id, user_name, user_dept) �Լ��� �̿��Ͽ� ������ �Ѱ���.
*/

var SELECT_NOTICE_ID = "UCSYS070S";

//var grid1 = new comGrid(); //��������


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
	trans.setPageRow(999);
	trans.setSvc(SELECT_NOTICE_ID);
	trans.setWiseGrid("1");			// wisegrid�� ����ϴ� ��� �ݵ�� �߰�			
	trans.setForwardId("wgdsl","");	// wisegrid�� ����ϴ� ��� �ݵ�� �߰�
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
// �ݱ� ��ư
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
			��ũ��Ʈ ����Ʈ���� ķ������ �̽�ũ��Ʈ�� ����ϰ� �ִٸ� ����Ʈ���� �ؽ�Ʈ ������  �ٲ۴�. 
			*/
			var objTbl = document.all[SELECT_NOTICE_ID];
			var noticeArry = DataSet.getParamArr(SELECT_NOTICE_ID,1,"noticetype_nm");
			for(var i=0; i< noticeArry.length; i++){
				if( noticeArry[i] == "���"){
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
