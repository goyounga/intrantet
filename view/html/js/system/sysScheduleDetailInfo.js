/*
	1. �� ����ڿ��� �Ҵ�� �μ������� �μ����̺� ���� ��� ��µ��� �ʵ��� �Ͽ���.
	   �׷��� ������ ����� ������ ���̺� �ִµ��� ��ȸ���� ���� �� ����.
	2. ���� �μ��� �����ϸ� ���� �μ��鿡 ���� ����ڸ� ��µ�.
	   ���� ��뿩�ΰ� ����� �μ��� ����ڸ� ��ȸ��.
	3. ����� ������ �������� opener�� �̸��� ������ ���� ������ �ƴѰ��� ������
	   �ش� opener�� getOrgUserInfo(user_id, user_name, user_dept) �Լ��� �̿��Ͽ� ������ �Ѱ���.
*/
var SCHEDULEMANAGE_ID= "UCSYS091S";		//�������� 

function init()
{	
	query();
}

//��ȸ
function query()
{	
	var tran = new Trans();
	tran.setPageRow(999);
	tran.setSvc(SCHEDULEMANAGE_ID);
	tran.open("fQuery","fQuery","/common.do");
}

function popupClose()
{
	window.close();
}

function callback(sServiceID)
{
	switch (sServiceID)
	{
		case SCHEDULEMANAGE_ID:
			showDetail(SCHEDULEMANAGE_ID, 0, fQuery);	
			break;
		default : 
			break;
	}				
}	