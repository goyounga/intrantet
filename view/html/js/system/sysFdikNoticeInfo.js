/*
	1. �� ����ڿ��� �Ҵ�� �μ������� �μ����̺� ���� ��� ��µ��� �ʵ��� �Ͽ���.
	   �׷��� ������ ����� ������ ���̺� �ִµ��� ��ȸ���� ���� �� ����.
	2. ���� �μ��� �����ϸ� ���� �μ��鿡 ���� ����ڸ� ��µ�.
	   ���� ��뿩�ΰ� ����� �μ��� ����ڸ� ��ȸ��.
	3. ����� ������ �������� opener�� �̸��� ������ ���� ������ �ƴѰ��� ������
	   �ش� opener�� getOrgUserInfo(user_id, user_name, user_dept) �Լ��� �̿��Ͽ� ������ �Ѱ���.
*/

var SELECT_NOTICE_ID = "UCSYS094S";

var grid1 = new comGrid(); //��������

function init()
{	
	query();
}

//��ȸ
function query()
{	
	var tran = new Trans();
	tran.setPageRow(20);
	tran.setSvc(SELECT_NOTICE_ID);
	tran.open("fQuery","fQuery","/common.do");		
}


/*
�׸��� onclick �̺�Ʈ �Լ� 
*/
function showDetailO_obj(obj){
	var descHtml="";
	if (obj.cells[0].id == SELECT_NOTICE_ID+"_IDX"){//�������� �׸���Ŭ����
		grid1.rowIndex = getRowIndex(obj);
		grid1.rowObj = obj;
		if(!comShowDetail(SELECT_NOTICE_ID,obj,f)){
		}
		else{
			showDetail(SELECT_NOTICE_ID, grid1.rowIndex,f);
			openFdikNoticeDetail(obj);			
		}
	}
}
function openFdikNoticeDetail(obj)
{
	location.href="/jsp/system/sysFdikNoticeDetailInfo.jsp?seq_no="+f.seq_no.value;
	return;
}

function popupClose()
{
	window.close();
}

//����Ű ��ȸ
function checkEnterKey()
{
	if(isEnterKey())
	{
		query();
	}
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
			*/
			/*
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
			*/
			break;
		default : 
			break;
	}				
}	