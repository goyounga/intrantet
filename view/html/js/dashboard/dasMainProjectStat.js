/**
 * PROJ : Nexfron Intranet
 * NAME : dasMainProjectStat.js
 * DESC : ��Ȳ�� - ������ - ������Ʈ��Ȳ
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
var SELECT_ID 	      	= "UCDAS111S";	//������Ʈ��Ȳ
var SELECT_CODE_ID 	    = "UCPRJ012S";	//�ڵ� DataSet
var gaCode 			  	= new Array();	//�ڵ� Array
//var gnTermTimer 		= 300000;		//�⺻Ÿ�̸ӱ��� 5��
var gnTermTimer 		= 60000;		//�⺻Ÿ�̸ӱ��� 1��
var gTimerId;							//�������� Ÿ�̸� ID
/**
 *�ʱ�ȭ
 */
function init()
{
	queryCode();
}
/**
 * �ڵ���ȸ
 */
function queryCode()
{
	var tran = new Trans();
	tran.setPageRow("9999");
	tran.setSvc(SELECT_CODE_ID);
	tran.setUserParams("up_cd=PRJ013");
	//tran.setCallBack("callbackQueryCode");
	tran.setCallBack("setCode");
	tran.setWait(false);
	tran.open("","","/common.do");
}
/**
 * �ڵ���ȸ �� �ݹ�
 * sSvcId  : ����ID

function callbackQueryCode(sSvcId)
{
	setCode();
}
*/
/**
 * �ڵ����
 */
function setCode()
{
	var k	     = 0;
	var nTotCnt	 = DataSet.getTotalCount(SELECT_CODE_ID);
	var hParam   = "";
	var sCode    = "";
	var sCodeNm  = "";

	//�ڵ�迭����
	for(var i=0; i<nTotCnt; i++)
	{
		hParam   = DataSet.getHashParam(SELECT_CODE_ID, "1", i);
		sCode    = hParam.get( "code"    );
		sCodeNm  = hParam.get( "code_nm" );

		gaCode[k] = new Array(2);
		gaCode[k][0] = sCode;
		gaCode[k][1] = sCodeNm;
		k++;
	}

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
	//tran.setCallBack("callbackQueryList");
	tran.setCallBack("setQueryList");
	tran.setWait(false);
	tran.open("", "", "/common.do");
}
/**
 * ��ȸ �� �ݹ�
 * sServiceID  : ����ID

function callbackQueryList(sServiceID)
{
	setQueryList();
}
*/
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
				var prj_nm 		= DataSet.getParam(SELECT_ID, 1, i, "prj_nm" 	);
				var work_range 	= DataSet.getParam(SELECT_ID, 1, i, "work_range");
				var mbr_cnt 	= DataSet.getParam(SELECT_ID, 1, i, "mbr_cnt"   );
				var pogr_stat  	= DataSet.getParam(SELECT_ID, 1, i, "pogr_stat"	);
				var rl_end_dt 	= DataSet.getParam(SELECT_ID, 1, i, "rl_end_dt"	);
				var rmk 		= DataSet.getParam(SELECT_ID, 1, i, "rmk"     	);
				work_range      = getWorkRangeNm(work_range);

				var nTr         = table.insertRow();
				makeColumn( nTr, prj_nm 	, "left"   );
				makeColumn( nTr, work_range	, "center" );
				makeColumn( nTr, mbr_cnt 	, "center" );
				makeColumn( nTr, pogr_stat	, "center" );
				makeColumn( nTr, rl_end_dt 	, "center" );
				makeColumn( nTr, rmk 		, "left"   );
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
 * �������� ���ڿ�����
 * pCode  : �ڵ�
 * return : �ڵ�� ���ڿ�
 */
function getWorkRangeNm(pCode)
{
	//try{
	var nlen       = gaCode.length;
	var codenm     = "";
	var work_range = trim(pCode);

	if(work_range!="")	//��� �迭���̴�1�̴�
	{
		var aCodes = work_range.split(",");

		for(var j=0; j<aCodes.length ;j++)
		{
			for(var k=0; k<nlen; k++)
			{
				if(aCodes[j] == gaCode[k][0])
				{
					codenm += ((codenm.length>0 ? ", " : "") + gaCode[k][1]);
					break;
				}
			}
		}
	}

	return codenm;
	//}catch(e){}
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