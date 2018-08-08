/**
 * PROJECT : INTRANET
 * NAME    : comUserOrg.js
 * DESC    : ����ڰ˻�
 * AUTHOR  : ��������
 * VERSION : 1.0
 * Copyright �� 2009 Nexfron. All rights reserved.
 * ============================================================================================
 * 							��		��		��		��
 * ============================================================================================
 * VERSION	   DATE		  	AUTHOR		DESCRIPTION
 * ============================================================================================
 * 1.0		2009.08.13		������		�ּ��߰�
 * 2.0		2013.01.13		���ر�		����
 */
/*
	1. �� ����ڿ��� �Ҵ�� �μ������� �μ����̺� ���� ��� ��µ��� �ʵ��� �Ͽ���.
	   �׷��� ������ ����� ������ ���̺� �ִµ��� ��ȸ���� ���� �� ����.
	2. ���� �μ��� �����ϸ� ���� �μ��鿡 ���� ����ڸ� ��µ�.
	   ���� ��뿩�ΰ� ����� �μ��� ����ڸ� ��ȸ��.
	3. ����� ������ �������� opener�� �̸��� ������ ���� ������ �ƴѰ��� ������
	   �ش� opener�� getOrgUserInfo(user_id, user_name, user_dept) �Լ��� �̿��Ͽ� ������ �Ѱ���.
*/

var SELECT_TREE_ID = "UCSYS021S_1";	//����� ������ ��ȸ
var oGridTr     = null; 		//������
/**
 * init
 */
function init()
{
	oGridTr   = document.getElementById(SELECT_TREE_ID);	//�����
	makeTree();
}
/**
 * ���� Ʈ�� ��ȸ
 */
function makeTree()
{
	var trans = new GridTrans();
	trans.setSvc(SELECT_TREE_ID);
	trans.setPageRow(-1);
	trans.setWiseGrid("1");
	trans.open("f", "f","/wisegrid.do");
}

/**********************
* ����
**********************/
function Apply()
{
	var GridObj = document.all[SELECT_TREE_ID];
	var nRow = GridObj.GetActiveRowIndex();
	
	if(nRow < 0) return;
		
	var org_cd = GridObj.GetCellValue("orgcd_org", nRow);
	var org_nm = GridObj.GetCellValue("orgnm", nRow);
	
	opener.setOrg(org_cd, org_nm, "");
	window.close();
	
}


function unLoad()
{
	opener.g_pop = "";
}




