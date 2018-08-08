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
var SELECT_USER_ID = "UCSYS022S";	//����� ����Ʈ ��ȸ
var oGridTr     = null; 		//������
var oGrid       = null;         //����ڸ��
/**
 * init
 */
function init()
{
	oGrid   = document.getElementById(SELECT_USER_ID);	//�����
	oGridTr = document.getElementById(SELECT_TREE_ID);	//������
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
	trans.setCallBack("callbackMakeTree");
	trans.open("f", "f","/wisegrid.do");
}
/**
 * �ݹ� - ���� Ʈ�� ��ȸ
 * svcId : service id
 */
function callbackMakeTree(svcId)
{
	if (DataSet.isError(svcId) == "true") return;
	userQuery();
}
/**
 * Ʈ�� Ŭ��
 */
function treeClick(obj, strTreeKey, strArea)
{
	if( obj == SELECT_TREE_ID)
	{
		var nRow  = oGridTr.GetRowIndexFromTreeKey(strTreeKey);
		userQuery(nRow);
	}
}
/**
 * ����� ��ȸ
 */
function userQuery(nRow)
{
	if(typeof(nRow)!="undefined")	//���������� ��ȸ
	{
		var skey = "";
		var sVal = "";
		switch (oGridTr.GetCellValue("depth", nRow))
		{
			case "0" : skey = "tree_view_org_0"; break;
			case "1" : skey = "tree_view_org_1"; break;
			case "2" : skey = "tree_view_org_2"; break;
			case "3" : skey = "tree_view_org_3"; break;
		}
		sVal = oGridTr.GetCellValue("orgcd_org", nRow);

		var trans = new GridTrans();
		trans.setSvc(SELECT_USER_ID);
		trans.setPageRow(9999);
		trans.setWiseGrid("1");
		trans.setMyUserParams("use_f","Y");
		if(skey!=""){trans.setMyUserParams(skey,sVal);}
		trans.setCallBack("callbackUserQuery");
		trans.open("","","/wisegrid.do");
	}
	else //��ȸ���ǿ��� ��ȸ
	{
		f.searchstr.value = trim(f.searchstr.value);

		var trans = new GridTrans();
		trans.setSvc(SELECT_USER_ID);
		trans.setPageRow(9999);
		trans.setWiseGrid("1");
		trans.setMyUserParams("use_f","Y");
		if( f.searchstr.value!="" )
		{
			trans.setMyUserParams(f.searchtype.value, f.searchstr.value);
		}
		trans.setCallBack("callbackUserQuery");
		trans.open("f","","/wisegrid.do");
	}
}
/**
 * �ݹ� - ��ȸ
 * svcid : service_id
 */
function callbackUserQuery(svcid)
{
	if(DataSet.isError(svcid) == "true") return;
}
/**
 * �׸��� Ŭ���� �� ������ �����ش�.
 * id           : Ŭ���� �׸��尴üID
 * strColumnKey : Ŭ���� �÷���
 * nRow         : Ŭ����Row Index
 */
function showDetailO_obj(id, strColumnKey, nRow)
{
	if(id==SELECT_USER_ID)
	{
		if(strColumnKey=="chk")
		{
			if(oGrid.GetCellValue("chk", nRow)=="1")
			{
				if(f.multiyn.value!="Y")
				{
					var len = oGrid.GetRowCount();
					for( var i=(nRow+1); i<len; i++)
					{
						oGrid.SetCellValue("chk", i, 0);
					}
					for( var i=(nRow-1); i>-1; i--)
					{
						oGrid.SetCellValue("chk", i, 0);
					}
				}
			}

		}
	}
}
/**
 * �׸��� ����Ŭ���� �� ������ �����ش�.
 * id           : Ŭ���� �׸��尴üID
 * strColumnKey : Ŭ���� �÷���
 * nRow         : Ŭ����Row Index
 */
function showDetailB_obj(id, strColumnKey, nRow)
{
	if(id==SELECT_USER_ID)
	{
		if(f.multiyn.value!="Y")
		{
			opener.setOrgUserInfo(oGrid.GetCellValue("user_id", nRow), oGrid.GetCellValue("user_nm", nRow));
			window.close();
		}
	}
}
/**
 * ����
 * single : �ְ����� ���� �ۼ���
 */
function check_event()
{
	var len = oGrid.GetRowCount();
	var nRow = -1;

	for(var i=0; i<len; i++)
	{
		if(oGrid.GetCellValue("chk", i) == "1")
		{
			nRow = i;
			break;
		}
	}
	if(nRow>-1)
	{
		//if(!MessageBox("","C",user_nm+"["+user_id+"] ����ڸ� �����Ͻðڽ��ϱ�?")) return;
		opener.setOrgUserInfo(oGrid.GetCellValue("user_id", nRow), oGrid.GetCellValue("user_nm", nRow));
		window.close();
	}
	else
	{
		MessageBox("", "E", "���õ� ����ڰ� �����ϴ�.");
	}
}
/**
 * ����
 * multi : ���� ���� ���
 */
function choice_user()
{
	var obj	= document.UCSYS022S;
	var len = obj.GetRowCount();
	var user_id="";
	var user_nm="";
	var ps=0;

	for(i=0;i<len;i++)
	{
		chk = obj.GetCellValue("chk", i);
		if(chk == 1)
		{
			user_id = obj.GetCellValue("user_id", i);
			user_nm = obj.GetCellValue("user_nm", i);
			ps++;

		}
	}
	ps-=1;
	if(!confirm(user_nm+"["+user_id+"] �� "+ps+"���� ����ڸ� �����Ͻðڽ��ϱ�?"))
				return;
	for(i=0;i<len;i++)
	{
		chk = obj.GetCellValue("chk", i);
		if(chk == 1)
		{
			user_id = obj.GetCellValue("user_id", i);
			user_nm = obj.GetCellValue("user_nm", i);
			opener.setOrgUserInfo(user_id, user_nm);
		}
	}
	window.close();
}


function unLoad()
{
	opener.g_pop = "";
}




