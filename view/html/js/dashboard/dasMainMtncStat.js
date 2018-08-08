/**
 * PROJ : Nexfron Intranet
 * NAME : dasMainMtncStat.js
 * DESC : 현황판 - 전광판 - 유지보수현황
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
var SELECT_ID 	      	= "UCDAS112S";	//유지보수현황
var SELECT_CODE_ID 	    = "UCPRJ012S";	//코드 DataSet
var gaCode 			  	= new Array();	//코드 Array
//var gnTermTimer 		= 300000;		//기본타이머길이 5분
var gnTermTimer 		= 60000;		//기본타이머길이 5분
var gTimerId;							//실행중인 타이머 ID
/**
 *초기화
 */
function init()
{
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
	//tran.setCallBack( "callbackQueryCode" );
	tran.setCallBack("setCode");
	tran.setWait(false);
	tran.open("","","/common.do");
}
/**
 * 코드조회 후 콜백
 * sSvcId  : 서비스ID

function callbackQueryCode(sSvcId)
{
	setCode();
	queryList();
}
*/
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
	queryList();
	startTimer();
}
/**
 * 조회
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
 * 조회 후 콜백
 * sServiceID  : 서비스ID

function callbackQueryList(sServiceID)
{
	setWorkRange();
}
 */
/**
 *  테이블생성
 */
function setQueryList()
{
	//try{

	var size  	= DataSet.getTotalCount(SELECT_ID);
	var table	= document.getElementById("tblList");
	var sHtml 	= "";
	var index 	= 0;
	var max	  	= parseInt(f.listMaxCnt.value);	//화면에 보여질 최대치
	var colsize = 9;							//테이블의 컬럼개수

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

	if(index<max)//여백채우기
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
 * 테이블에 TD 생성
 * objTr : 타겟테이블
 * val   : TD의 Text
 * align : TD의 정렬
 */
function makeColumn( objTr, val, align)
{
	var newCell=objTr.insertCell();
	newCell.innerHTML = val;
	newCell.className = "table_data";
	newCell.style.textAlign=align;
}
/**
 * 업무범위 문자열생성
 * pCode  : 코드
 * return : 코드명 문자열
 */
function getWorkRangeNm(pCode)
{
	//try{
	var nlen       = gaCode.length;
	var codenm     = "";
	var work_range = trim(pCode);

	if(work_range!="")	//없어도 배열길이는1이다
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
 * 타이머 시작
 */
function startTimer()
{
	try{clearInterval(gTimerId);}catch(e){}
	gTimerId = setInterval( queryList, gnTermTimer );
}
/**
 * 타이머 중지
 */
function stopTimer()
{
	clearInterval(gTimerId);
}