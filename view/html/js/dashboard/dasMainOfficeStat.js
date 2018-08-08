/**
 * PROJ : Nexfron Intranet
 * NAME : dasMainOfficeStat.js
 * DESC : 현황판 - 전광판 - 본사인력현황
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
var SELECT_ID 		= "UCDAS113S";	//본사인력현황
//var gnTermTimer 	= 300000;		//기본타이머길이 5분
var gnTermTimer 	= 60000;		//기본타이머길이 5분
var gTimerId;						//실행중인 타이머 ID
/**
 *초기화
 */
function init()
{
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
	tran.setCallBack("setQueryList");
	tran.setWait(false);
	tran.open("", "", "/common.do");
}
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
	var colsize = 6;							//테이블의 컬럼개수

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