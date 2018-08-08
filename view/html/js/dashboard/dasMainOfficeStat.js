/**
 * PROJ : Nexfron Intranet
 * NAME : dasMainOfficeStat.js
 * DESC : ��Ȳ�� - ������ - �����η���Ȳ
 * Author : ���ر� ����
 * VER  : 1.0
 * Copyright 2009 Nexfron All rights reserved
 * ============================================================================================
 * 								��		��		��		��
 * ============================================================================================
 * VERSION		DATE		AUTHOR		DESCRIPTION
 * ============================================================================================
 * 1.0		2010.09.06		���ر�		����
 */
var SELECT_ID 		= "UCDAS113S";	//�����η���Ȳ
//var gnTermTimer 	= 300000;		//�⺻Ÿ�̸ӱ��� 5��
var gnTermTimer 	= 60000;		//�⺻Ÿ�̸ӱ��� 5��
var gTimerId;						//�������� Ÿ�̸� ID
/**
 *�ʱ�ȭ
 */
function init()
{
	queryList();
	startTimer();
}
/**
 * ��ȸ
 */
function queryList()
{
	var tran = new Trans();
	tran.setSvc(SELECT_ID);
	tran.setPageRow(parseInt(f.listMaxCnt.value));
	tran.setCallBack("setQueryList");
	tran.setWait(false);
	tran.open("", "", "/common.do");
}
/**
 *  ���̺����
 */
function setQueryList()
{
	//try{

	var size  	= DataSet.getTotalCount(SELECT_ID);
	var table	= document.getElementById("tblList");
	var sHtml 	= "";
	var index 	= 0;
	var max	  	= parseInt(f.listMaxCnt.value);	//ȭ�鿡 ������ �ִ�ġ
	var colsize = 6;							//���̺��� �÷�����

	for( var j=table.rows.length-1; j>0; j-- ) {table.deleteRow(j);}

	if (size > 0)
	{
		for (var i=0; i<size; i++)
		{
			if(index<max)
			{
				var user_nm 	 = DataSet.getParam(SELECT_ID, 1, i, "user_nm" 		);
				var dept_cd 	 = DataSet.getParam(SELECT_ID, 1, i, "dept_cd"		);
				var in_offc_stat = DataSet.getParam(SELECT_ID, 1, i, "in_offc_stat" );
				var work_scdl  	 = DataSet.getParam(SELECT_ID, 1, i, "work_scdl"	);
				var rtn_scdl 	 = DataSet.getParam(SELECT_ID, 1, i, "rtn_scdl"		);
				var work_rmk 	 = DataSet.getParam(SELECT_ID, 1, i, "work_rmk"     );

				var nTr         = table.insertRow();
				makeColumn( nTr,  user_nm 	     , "center" );
				makeColumn( nTr,  dept_cd 	     , "center" );
				makeColumn( nTr,  in_offc_stat   , "center" );
				makeColumn( nTr,  work_scdl  	 , "left"   );
				makeColumn( nTr,  rtn_scdl 	     , "left"  	);
				makeColumn( nTr,  work_rmk 	     , "left"   );
				index ++;
			}
		}
	}

	if(index<max)//����ä���
	{
		var empty = max-index;

		for (var i=0; i<empty; i++)
		{
			var nTr = table.insertRow();

			for (var j=0; j<colsize; j++)
			{
				makeColumn( nTr, "" ,"center");
			}
		}
	}

	//}catch(e){alert(e.description);}
}
/**
 * ���̺� TD ����
 * objTr : Ÿ�����̺�
 * val   : TD�� Text
 * align : TD�� ����
 */
function makeColumn( objTr, val, align)
{
	var newCell=objTr.insertCell();
	newCell.innerHTML = val;
	newCell.className = "table_data";
	newCell.style.textAlign=align;
}
/**
 * Ÿ�̸� ����
 */
function startTimer()
{
	try{clearInterval(gTimerId);}catch(e){}
	gTimerId = setInterval( queryList, gnTermTimer );
}
/**
 * Ÿ�̸� ����
 */
function stopTimer()
{
	clearInterval(gTimerId);
}