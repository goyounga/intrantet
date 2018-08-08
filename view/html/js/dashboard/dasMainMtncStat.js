/**
 * PROJ : Nexfron Intranet
 * NAME : dasMainMtncStat.js
 * DESC : ��Ȳ�� - ������ - ����������Ȳ
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
var SELECT_ID 	      	= "UCDAS112S";	//����������Ȳ
var SELECT_CODE_ID 	    = "UCPRJ012S";	//�ڵ� DataSet
var gaCode 			  	= new Array();	//�ڵ� Array
//var gnTermTimer 		= 300000;		//�⺻Ÿ�̸ӱ��� 5��
var gnTermTimer 		= 60000;		//�⺻Ÿ�̸ӱ��� 5��
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
	//tran.setCallBack( "callbackQueryCode" );
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
	queryList();
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
	setWorkRange();
}
 */
/**
 *  ���̺�����
 */
function setQueryList()
{
	//try{

	var size  	= DataSet.getTotalCount(SELECT_ID);
	var table	= document.getElementById("tblList");
	var sHtml 	= "";
	var index 	= 0;
	var max	  	= parseInt(f.listMaxCnt.value);	//ȭ�鿡 ������ �ִ�ġ
	var colsize = 9;							//���̺��� �÷�����

	for( var j=table.rows.length-1; j>0; j-- ) {table.deleteRow(j);}

	if (size > 0)
	{
		for (var i=0; i<size; i++)
		{
			if(index<max)
			{
				var mtnc_nm        = DataSet.getParam(SELECT_ID, 1, i, "mtnc_nm" 		);
				var clnt_corp_nm   = DataSet.getParam(SELECT_ID, 1, i, "clnt_corp_nm" 	);
				var mtnc_system    = DataSet.getParam(SELECT_ID, 1, i, "mtnc_system"    );
				var mtnc_type      = DataSet.getParam(SELECT_ID, 1, i, "mtnc_type" 		);
				var mtnc_cost      = DataSet.getParam(SELECT_ID, 1, i, "mtnc_cost" 		);
				var mtnc_period    = DataSet.getParam(SELECT_ID, 1, i, "mtnc_period" 	);
				var regular_chk    = DataSet.getParam(SELECT_ID, 1, i, "regular_chk" 	);
				var coop_corp_nm   = DataSet.getParam(SELECT_ID, 1, i, "coop_corp_nm" 	);
				var dvlp_frwk      = DataSet.getParam(SELECT_ID, 1, i, "dvlp_frwk" 		);
				mtnc_system        = getWorkRangeNm(mtnc_system);

				var nTr         = table.insertRow();
				makeColumn( nTr, mtnc_nm        , "left"   );
				makeColumn( nTr, clnt_corp_nm   , "center" );
				makeColumn( nTr, mtnc_system , "center" );
				makeColumn( nTr, mtnc_type      , "center" );
				makeColumn( nTr, mtnc_cost      , "center" );
				makeColumn( nTr, mtnc_period    , "center" );
				makeColumn( nTr, regular_chk    , "center" );
				makeColumn( nTr, coop_corp_nm   , "center" );
				makeColumn( nTr, dvlp_frwk      , "center" );
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
 * ���̺��� TD ����
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