/*
	1. �� ����ڿ��� �Ҵ�� �μ������� �μ����̺� ���� ��� ��µ��� �ʵ��� �Ͽ���.
	   �׷��� ������ ����� ������ ���̺� �ִµ��� ��ȸ���� ���� �� ����.
	2. ���� �μ��� �����ϸ� ���� �μ��鿡 ���� ����ڸ� ��µ�.
	   ���� ��뿩�ΰ� ����� �μ��� ����ڸ� ��ȸ��.
	3. ����� ������ �������� opener�� �̸��� ������ ���� ������ �ƴѰ��� ������
	   �ش� opener�� getOrgUserInfo(user_id, user_name, user_dept) �Լ��� �̿��Ͽ� ������ �Ѱ���.
*/

var SELECT_NOTICE_ID = "UCSYS094S";

function init()
{	
	query();
	
}

//��ȸ
function query()
{	
	var tran = new Trans();
	tran.setPageRow(30);
	tran.setSvc(SELECT_NOTICE_ID);
	tran.open("fQuery","fQuery","/common.do");
}

function openNotice()
{
	location.href="/jsp/system/sysFdikNoticeInfo.jsp";
}

function popupClose()
{
	window.close();
}

function callback(sServiceID)
{
	switch (sServiceID)
	{
		case SELECT_NOTICE_ID:
			showDetail(SELECT_NOTICE_ID, 0, fQuery);	
			//seqCNT();
			break;
		default : 
			break;
	}				
}	