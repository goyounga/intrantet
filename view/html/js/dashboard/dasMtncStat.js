/**
 * PROJ : Nexfron Intranet
 * NAME : dasMtncStat.js
 * DESC : ��Ȳ�� - ������Ʈ��Ȳ
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
var oGrid             	= "";           //������Ʈ��Ȳ
var SELECT_ID 	      	= "UCDAS021S";	//������Ʈ��Ȳ
var SELECT_CODE_ID 	    = "UCPRJ012S";	//�ڵ� DataSet
var gaCode 			  	= new Array();	//�ڵ� Array
/**
 *�ʱ�ȭ
 */
function init()
{
	oGrid  = document.getElementById(SELECT_ID);
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
	tran.setCallBack( "callbackQueryCode" );
	tran.setWait(false);
	tran.open("","","/common.do");
}
/**
 * �ڵ���ȸ �� �ݹ�
 * sSvcId  : ����ID
 */
function callbackQueryCode(sSvcId)
{
	setCode();
	queryList();
}
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
}
/**
 * ��ȸ
 */
function queryList()
{
	var tran = new Trans();
	tran.setSvc(SELECT_ID);
	tran.setPageRow("9999");
	tran.setWiseGrid("1");
	tran.setForwardId("wgdsl","");
	tran.setCallBack("callbackQueryList");
	tran.open("", "f","/wisegrid.do");
}
/**
 * ��ȸ �� �ݹ�
 * sServiceID  : ����ID
 */
function callbackQueryList(sServiceID)
{
	setWorkRange();
}
/**
 * �������� ���ڿ�����
 * sSvcId  : ����ID
 */
function setWorkRange()
{
	try{
		var sRcmd_tc = "";
		var nRowCnt  = oGrid.GetRowCount();
		var nlen     = gaCode.length;
		var codenm   = "";

		for( var i=0; i<nRowCnt; i++ )
		{
			var work_range = trim(oGrid.GetCellValue("mtnc_system" , i));

			if(work_range!="")	//��� �迭���̴�1�̴�
			{
				var aCodes     = work_range.split(",");

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

				oGrid.SetCellValue( "mtnc_system_nm" , i, codenm );
				codenm = "";
			}
		}
	}catch(e){}
}

function showDetailO_obj(id, strColumnKey, nRow)
{
}