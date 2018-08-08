<!--
  PROJ : Nexfron Intranet
  NAME : comCalendar.jsp
  DESC : 달력 화면
  Author : 김은수 과장
  VER  : 1.0
  Copyright 2009 Nexfron All rights reserved
  ============================================================================================
  								변		경		사		항
  ============================================================================================
  VERSION		DATE		AUTHOR		DESCRIPTION
  ============================================================================================
  1.0		2009.08.13		김은수		주석추가
  -->
  
<%@ page language="java" contentType="text/html; charset=EUC-KR"%>
<html>
<head>
	<title>달력</title>
	<%@ include file="/jsp/include/include.jsp"%>
</head>
<%
	// DB2를 위한 로직추가
	/*String date = CUtil.nvlNequal(request.getParameter("date"), "");
	out.println(date);
	if(date.equals("") && date.length() < 8) date = CUtil.getCurrDate("yyyyMMdd");
	String yyyymm = date.substring(0,6);
	
	if(date.length() == 6) yyyymm = yyyymm + "01";
	
	String yyyymmdd = CDateUtil.getFormatString(date, "yyyy-MM-dd");*/

	String date = CUtil.nvlNequal(request.getParameter("date"), "");

	if(date.equals("")) date = CUtil.getCurrDate("yyyyMMdd");
	
	String yyyymm = "";
	String yyyymmdd = "";
	String sSelDate = "";
	
	if(date.length() == 8)
	{
		yyyymm = date.substring(0,6);
		yyyymmdd = CDateUtil.getFormatString(date, "yyyy-MM-dd");
		sSelDate = yyyymmdd;
	}
	else if(date.length() == 6)
	{
		yyyymm = date;
		yyyymmdd = CDateUtil.getFormatString(yyyymm + "01", "yyyy-MM-dd");
		sSelDate = CUtil.getCurrDate("yyyyMMdd");
	}
	else if(date.length() == 4)
	{
		yyyymm = date + "01";
		yyyymmdd = CDateUtil.getFormatString(yyyymm + "01", "yyyy-MM-dd");
		sSelDate = CUtil.getCurrDate("yyyyMMdd");
	}
	else
	{
		date = CUtil.getCurrDate("yyyyMMdd");
		yyyymm = date.substring(0,6);
		yyyymmdd = CDateUtil.getFormatString(date, "yyyy-MM-dd");
		sSelDate = CUtil.getCurrDate("yyyyMMdd");
	}
%>

<script language="javascript">
// DB2를 위해 로직추가 및 변경
var day = "<%=yyyymm%>";
var yyyymm = "<%=yyyymm%>";
var yyyymmdd = "<%=yyyymmdd%>";
var gseldate = "<%=sSelDate%>";

var CALENDAR_ID = "UCCOMCALENDAR";
var gCurDay = "";

function getMonth(flag)
{

	var sParam = "calendar=";
	if (gCurDay != "") gCurDay.className = "tbl_td01";

	if (flag == "+" || flag == "-")
	{
		var index = f.month.selectedIndex + (flag == "+" ? 1 : -1);
		if (index < 0 )
		{
			if (f.year.options.length >	f.year.selectedIndex+1)
			{
				f.year.selectedIndex = 	f.year.selectedIndex+1;
				f.month.selectedIndex = 11;
			}
		}
		else if (f.month.options.length <=	index)
		{
			if (f.year.selectedIndex != 0)
			{
				f.year.selectedIndex = 	f.year.selectedIndex-1;
				f.month.selectedIndex = 0;
			}
		}
		else
		{
			f.month.selectedIndex = index;
		}

		day = f.year.value + "" + f.month.value;
	}

	sParam += day;

	// DB2를 위한 로직 추가
	if (flag == "0" || flag == "+" || flag == "-")
	{
		yyyymm = f.year.value + "" + f.month.value;
		yyyymmdd = f.year.value + "-" + f.month.value + "-01";
	}

	sParam += "&yyyymm="+yyyymm+"&yyyymmdd="+yyyymmdd;
	//

	//document.all("UCCOM001S").focus();
	
	var trans = new Trans();
	trans.setUserParams(sParam);

	trans.setSvc(CALENDAR_ID);
	trans.setPageRow(31);
	trans.open("","f","/common.do");
}

function callback(dsnm)
{

	var obj = document.all[CALENDAR_ID];
	var curdate = DataSet.getParam(CALENDAR_ID,1,0,"curday");
	if (curdate != "") day = curdate;

	// DB2를 위한 로직 변경
	//f.year.value = day.substring(0,4);
	//f.month.value = day.substring(4,6);
	f.year.value = yyyymm.substring(0,4);
	f.month.value = yyyymm.substring(4,6);

	var seldate;
	if(gseldate.length < 8) gseldate = "";
	if(gseldate != "") seldate = replaceStr(gseldate, "-", "");

	var Curi = 0;
	var Curj = 0;
	var Seli = 0;
	var Selj = 0;

	if (curdate != "")
	{
		// DB2를 위한 로직 추가
//		if (   (f.year.value != curdate.substring(0,4))
//			|| (f.month.value != curdate.substring(4,6)))
//		{
//			return;
//		}
		//

		var curday = parseNumeric(curdate.substring(6));
		var selday = parseNumeric(seldate.substring(6));

		for (var i=0; i < obj.rows.length; i++)
		{
			for (var j=1; j < obj.rows[i].cells.length; j++)
			{
				if(j==0) obj.rows[i].cells[j].className = 'cal2';
				else  obj.rows[i].cells[j].className = 'cal1';
				
				if (yyyymm == curdate.substring(0,6) && obj.rows[i].cells[j].innerText == curday)
				{
					gCurDay = obj.rows[i].cells[j];
					Curi = i;
					Curj = j;
				}
				
				if (yyyymm == seldate.substring(0,6) && obj.rows[i].cells[j].innerText == selday)
				{
					Seli = i;
					Selj = j;
				}
			}
		}

		obj.rows[Seli].cells[Selj].className = 'cal_selday';
		obj.rows[Curi].cells[Curj].className = 'cal_today';
	}
}

function calendar_mouseover(obj)
{
	if (obj.className == '')  obj.style.backgroundColor='#E5E5E5';
}

function calendar_mouseout(obj)
{
	if (obj.className =='')  obj.style.backgroundColor='#FFFFFF'
}

function calendar_click(obj)
{
	if(obj.innerText != "" &&
		obj.innerText != "일" &&
		obj.innerText != "월" &&
		obj.innerText != "화" &&
		obj.innerText != "수" &&
		obj.innerText != "목" &&
		obj.innerText != "금" &&
		obj.innerText != "토")
	{	//날짜가 있는 경우에만 액션을 아래 액션을 취함
		//obj.style.backgroundColor='#FFFFFF'; 색깔 오류로 주석처리
		var sDate = f.year.value + f.month.value;
		if (obj.innerText<10) sDate += "0";
		sDate += obj.innerText;
		var callerWindowObj = dialogArguments;
		callerWindowObj.setCalendar("<%=CUtil.nvl(request.getParameter("type"))%>", getFormatData(sDate,"DATE2"));
		window.close();
	}
}

</script>
<body marginheight=0 marginwidth=0 leftmargin=5 topmargin=0 bgcolor=#ECF3F6 onload=getMonth("")>
<center>
<form name=f>
<table border=0 cellpadding=0 cellspacing=0 width=200 align="center" style="margin-top:5px">
	<tr align=center height=33>
		<td align=right><span class=calprev onclick=getMonth("-")></span></td>
		<td width=120>
			<ucare:select name="year" brcode="COM011" width="60" option="-1" step="1" onChange="getMonth('0')"/>
			<ucare:select name="month" brcode="COM012" width="48" option="-1" step="1" onChange="getMonth('0')"/>
		</td>
		<td align=left><span class=calnext onclick=getMonth("+")></span></td>
	</tr>
</table>

<ucare:table id="UCCOM001S" rows="5"  type="list" width="240" height="110" scrollY="no">
	<tr>
		<td  width="30" column="sun" title="일" style='text-align:center;color:#FF0000' onclick="calendar_click(this)"></td>
		<td  width="30" column="mon" title="월" style='text-align:center' onclick="calendar_click(this)"></td>
		<td  width="30" column="tue" title="화" style='text-align:center' onclick="calendar_click(this)"></td>
		<td  width="30" column="wed" title="수" style='text-align:center' onclick="calendar_click(this)"></td>
		<td  width="30" column="thu" title="목" style='text-align:center' onclick="calendar_click(this)"></td>
		<td  width="30" column="fri" title="금" style='text-align:center' onclick="calendar_click(this)"></td>
		<td  width="30" column="sat" title="토" style='text-align:center' onclick="calendar_click(this)"></td>
	</tr>
</ucare:table>
<!--<div style="position:absolute; left:225px; top:185px;"><img src="<%=scriptPath%>/images/icon/icon_trash.gif" onClick="selfclose()" style="cursor:hand"></div>-->
</form>
</center>
</body>
