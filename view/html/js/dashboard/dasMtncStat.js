/**
 * PROJ : Nexfron Intranet
 * NAME : dasMtncStat.js
 * DESC : 현황판 - 프로젝트현황
 * Author : 박준규 과장
 * VER  : 1.0
 * Copyright 2009 Nexfron All rights reserved
 * ============================================================================================
 * 								변		경		사		항
 * ============================================================================================
 * VERSION		DATE		AUTHOR		DESCRIPTION
 * ============================================================================================
 * 1.0		2010.09.06		박준규		개발
 */
var oGrid             	= "";           //프로젝트현황
var SELECT_ID 	      	= "UCDAS021S";	//프로젝트현황
var SELECT_CODE_ID 	    = "UCPRJ012S";	//코드 DataSet
var gaCode 			  	= new Array();	//코드 Array
/**
 *초기화
 */
function init()
{
	oGrid  = document.getElementById(SELECT_ID);
	queryCode();
}
/**
 * 코드조회
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
 * 코드조회 후 콜백
 * sSvcId  : 서비스ID
 */
function callbackQueryCode(sSvcId)
{
	setCode();
	queryList();
}
/**
 * 코드셋팅
 */
function setCode()
{
	var k	     = 0;
	var nTotCnt	 = DataSet.getTotalCount(SELECT_CODE_ID);
	var hParam   = "";
	var sCode    = "";
	var sCodeNm  = "";

	//코드배열생성
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
 * 조회
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
 * 조회 후 콜백
 * sServiceID  : 서비스ID
 */
function callbackQueryList(sServiceID)
{
	setWorkRange();
}
/**
 * 업무범위 문자열생성
 * sSvcId  : 서비스ID
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

			if(work_range!="")	//없어도 배열길이는1이다
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