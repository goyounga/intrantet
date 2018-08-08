<!--
  PROJ : Intranet
  NAME : smpWiseGrid.jsp
  DESC : WiseGrid Tag Sample
  Author : 김은수 과장
  VER  : 1.0
  Copyright 2009 Nexfron All rights reserved
  ============================================================================================
  								변		경		사		항
  ============================================================================================
  VERSION		DATE		AUTHOR		DESCRIPTION
  ============================================================================================
  1.0		2009.09.08		김은수		주석추가
  -->
  
<%@ page language="java" contentType="text/html; charset=euc-kr"%>
<%@ include file="/jsp/include/include.jsp"%>    
<html>
<head>
<title>Grid Sample</title>
<script language="javascript" src="<%= scriptPath %>/js/sample/smpWiseGrid.js"></script>
</head>
<body topmargin="20" leftmargin="30" scroll="auto" onLoad="setInit();">
<form name="f" target="iLog">

<ucare:table type="detail" width="100%">
	<!-- Grid : 참고URL  -->
	<tr>
		<td class=MANTDT width=100>참고 URL</td>
		<td class=MANTDM>
			<A href='http://wisegrid.icompia.com/'>http://wisegrid.icompia.com/</A>
		</td>
	</tr>
	
	<!-- Grid : 기본 코딩방법  -->
	<tr>
		<td class=MANTDT width=100>기본 코딩방법</td>
		<td class=MANTDM>
			<font color="blue">1. Tag 작성방법</font> <br> 
			예) <br>
			 &lt;ucare:grid <font color="red">id="SMPCODEBOOKS"</font> width="350" height="120"&gt; <br>
			 &nbsp;&nbsp;&nbsp;&nbsp;	&lt;tr event=""&gt; <br>
			 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;		&lt;td  width="100" column="up_cd" title="대분류"&gt;&lt;/td&gt; <br>
			 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;		&lt;td  width="100" column="code" title="소분류"&gt;&lt;/td&gt; <br>
			 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;		&lt;td  width="100" column="code_nm" title="코드명"&gt;&lt;/td&gt; <br>
			 &nbsp;&nbsp;&nbsp;&nbsp;	&lt;/tr&gt; <br>
			&lt;/ucare:grid&gt; <br>
			<font color="blue">2. javascript 작성방법</font> <br>
			function query() <br>
			{<br>
			&nbsp;&nbsp;&nbsp;&nbsp;	var tran = new Trans();	<br>							
			&nbsp;&nbsp;&nbsp;&nbsp;	<font color="red">tran.setSvc("SMPCODEBOOKS");</font>	<br>
			&nbsp;&nbsp;&nbsp;&nbsp;	tran.setWiseGrid("1");			<br>			
			&nbsp;&nbsp;&nbsp;&nbsp;	tran.setForwardId("wgdsl","");	<br>
			&nbsp;&nbsp;&nbsp;&nbsp;	tran.open("f", "f","/wisegrid.do");	<br>
			}
		</td>
	</tr>
	
	<!-- Grid : 번호추가  -->
	<tr>
		<td class=MANTDT width=100 rowspan="3">번호주기</td>
		<td class=MANTDM width=100><ucare:imgbtn name="btnSearch" value="조회" onClick="searchCode('grid01')" /></td>
	</tr>
	<tr>
		<td class="MANTDM">
			<ucare:grid id="grid01" width="350" height="120" no="true">
				<tr event="">
					<td  width="100" column="up_cd" title="대분류"></td>
					<td  width="100" column="code" title="소분류"></td>
					<td  width="100" column="code_nm" title="코드명"></td>
				</tr>
			</ucare:grid>		
		</td>
	</tr>
	<tr>
		<td class="MANTDM">
			방법은 기존과 같습니다. <br>
			예) &lt;ucare:grid id="UCFSTEventS" width="280" height="420" <font color="red">no="true"</font>&gt;	
		</td>
	</tr>
	
	<!-- Grid : Title 숨기기  -->
	<tr>
		<td class=MANTDT width=100 rowspan="3">Title 숨기기</td>
		<td class=MANTDM width=100><ucare:imgbtn name="btnSearch" value="조회" onClick="searchCode('grid09')" /></td>
	</tr>
	<tr>
		<td class="MANTDM">
			<ucare:grid id="grid09" width="350" height="120" title="false">
				<tr event="">
					<td  width="100" column="up_cd" title="대분류"></td>
					<td  width="100" column="code" title="소분류"></td>
					<td  width="100" column="code_nm" title="코드명"></td>
				</tr>
			</ucare:grid>		
		</td>
	</tr>
	<tr>
		<td class="MANTDM">
			- 보이기 : title="true" <br>
			- 숨기기 : title="false" <br>
			예) &lt;ucare:grid id="UCFSTEventS" width="280" height="420" <font color="red">title="false"</font>&gt;	
		</td>
	</tr>
	
	<!-- Grid : 고정틀  -->
	<tr>
		<td class=MANTDT width=100 rowspan="3">고정틀</td>
		<td class=MANTDM width=100><ucare:imgbtn name="btnSearch" value="조회" onClick="searchCode('grid17')" /></td>
	</tr>
	<tr>
		<td class="MANTDM">
			<ucare:grid id="grid17" width="450" height="120" fixed="2">
				<tr event="">
					<td  width="100" column="up_cd" title="대분류"></td>
					<td  width="100" column="code" title="소분류"></td>
					<td  width="100" column="code_nm" title="코드명"></td>
					<td  width="100" column="etc1" title="기타1"></td>
					<td  width="100" column="etc2" title="기타2"></td>
					<td  width="100" column="etc3" title="기타3"></td>
				</tr>
			</ucare:grid>		
		</td>
	</tr>
	<tr>
		<td class="MANTDM">
			방법은 기존과 같습니다. <br>
			예) &lt;ucare:grid id="UCFSTEventS" width="280" height="420" <font color="red">fixed="2"</font>&gt;	
		</td>
	</tr>
	
	<!-- Grid : CRUD 사용하기  -->
	<tr>
		<td class=MANTDT width=100 rowspan="2">CRUD 사용하기</td>
		<td class=MANTDM>
			<font color="green">smpCodebook.jsp 참조</font>
		</td>
	</tr>
	<tr>
		<td class="MANTDM">
			<font color="blue">1. Tag 방법</font> <br>
			예) <br>
			&lt;ucare:grid id="SMPCODEBOOKS" width="980" height="620" <font color="red"> crud="true" </font>&gt; <br>
			&nbsp;&nbsp;&nbsp;&nbsp;	&lt;tr event="O"&gt; <br>
			&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;		&lt;td  width="100" column="uppercd" title="대분류" editable="true"&gt;&lt;/td&gt; <br>
			&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;		&lt;td  width="100" column="code" title="소분류" editable="true"&gt;&lt;/td&gt; <br>
			&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;		&lt;td  width="100" column="codenm" title="코드명" editable="true"&gt;&lt;/td&gt; <br>
			&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;		&lt;td  width="100" column="etc1" title="기타1" editable="true"&gt;&lt;/td&gt; <br>
			&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;		&lt;td  width="100" column="etc2" title="기타2" editable="true"&gt;&lt;/td&gt; <br>
			&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;		&lt;td  width="100" column="etc3" title="기타3" editable="true"&gt;&lt;/td&gt; <br>
			&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;		&lt;td  width="100" column="sort" title="정렬" editable="true"&gt;&lt;/td&gt; <br>
			&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;		&lt;td  width="100" column="useyn" title="사용여부" editable="true" format="COMBO" brcode="USEYN"&gt;&lt;/td&gt; <br>
			&nbsp;&nbsp;&nbsp;&nbsp;	&lt;/tr&gt; <br>
			&lt;/ucare:grid&gt; <br>
			
			<br>
			<font color="blue">2. javascript 방법</font> <br>
			// 등록, 수정, 삭제<br>
			function saveCode()<br>
			{<br>
			&nbsp;&nbsp;&nbsp;&nbsp;	var tran = new Trans();<br>							
			&nbsp;&nbsp;&nbsp;&nbsp;	tran.setSvc("SMPCODEBOOKS");<br>
			&nbsp;&nbsp;&nbsp;&nbsp;	tran.setWiseGrid("1");			<br>
			&nbsp;&nbsp;&nbsp;&nbsp;	tran.setForwardId("wgdsl","");<br>
			&nbsp;&nbsp;&nbsp;&nbsp;	<font color="red">tran.setMode("save");</font>		// 반드시 추가<br>
			&nbsp;&nbsp;&nbsp;&nbsp;	tran.open("f", "f","/wisegrid.do");<br>	
			}<br>
			<br>
			// Row 삭제상태로 세팅<br>
			function removeCode()<br>
			{<br>
			&nbsp;&nbsp;&nbsp;&nbsp;	var GridObj = document.SMPCODEBOOKS;<br>
			&nbsp;&nbsp;&nbsp;&nbsp;	GridObj.DeleteRow(GridObj.GetActiveRowIndex());<br>
			}<br>
			<br>
			// Row 추가<br>
			function lineInsert()<br>
			{<br>
			&nbsp;&nbsp;&nbsp;&nbsp;	var GridObj = document.SMPCODEBOOKS;<br>
			&nbsp;&nbsp;&nbsp;&nbsp;	GridObj.AddRow();<br>
			}<br>
			<br>
			// CRUD 취소 : grid를 다시 초기화함<br>
			function cancel()<br>
			{<br>
			&nbsp;&nbsp;&nbsp;&nbsp;	var GridObj = document.SMPCODEBOOKS;<br>
			&nbsp;&nbsp;&nbsp;&nbsp;	GridObj.CancelCRUD();<br>
			}<br>			
		</td>
	</tr>
		
	<!-- Grid : 이벤트  -->
	<tr>
		<td class=MANTDT width=100 rowspan="3">이벤트</td>
		<td class=MANTDM width=100>&nbsp;</td>
	</tr>
	<tr>
		<td class="MANTDM">
			<ucare:table type="border">
				<tr>
					<td><ucare:imgbtn name="btnSearch" width="110" value="마우스 왼쪽 클릭" onClick="searchCode('grid03')" /></td>
					<td><ucare:imgbtn name="btnSearch" width="130" value="마우스 오른쪽 클릭" onClick="searchCode('grid04')" /></td>
				</tr>
				<tr>
					<td>
						<ucare:grid id="grid03" width="350" height="120">
							<tr event="O">
								<td  width="100" column="uppercd" title="대분류" align="center"></td>
								<td  width="100" column="code" title="소분류" align="left"></td>
								<td  width="100" column="codenm" title="코드명" align="right"></td>
							</tr>
						</ucare:grid>
					</td>
					<td>
						<ucare:grid id="grid04" width="350" height="120">
							<tr event="R">
								<td  width="100" column="uppercd" title="대분류" align="center"></td>
								<td  width="100" column="code" title="소분류" align="left"></td>
								<td  width="100" column="codenm" title="코드명" align="right"></td>
							</tr>
						</ucare:grid>
					</td>
				</tr>
				<tr>
					<td><ucare:imgbtn name="btnSearch" width="120" value="마우스 더블 클릭" onClick="searchCode('grid18')" /></td>
					<td><ucare:imgbtn name="btnSearch" width="100" value="Cell Change" onClick="searchCode('grid05')" /></td>
				</tr>
				<tr>
					<td>
						<ucare:grid id="grid18" width="350" height="120">
							<tr event="D">
								<td  width="100" column="uppercd" title="대분류" align="center" editable="true"></td>
								<td  width="100" column="code" title="소분류" align="left" editable="true"></td>
								<td  width="100" column="codenm" title="코드명" align="right" editable="true"></td>
							</tr>
						</ucare:grid>
					</td>
					<td>
						<ucare:grid id="grid05" width="350" height="120">
							<tr event="C">
								<td  width="100" column="uppercd" title="대분류" align="center" editable="true"></td>
								<td  width="100" column="code" title="소분류" align="left" editable="true"></td>
								<td  width="100" column="codenm" title="코드명" align="right" editable="true"></td>
							</tr>
						</ucare:grid>
					</td>
				</tr>
				<tr>
					<td><ucare:imgbtn name="btnSearch" width="120" value="Combobox Change" onClick="searchCode('grid23')" /></td>
					<td><ucare:imgbtn name="btnSearch" width="130" value="이벤트 여러개 주기" onClick="searchCode('grid24')" /></td>
				</tr>
				<tr>
					<td>
						<ucare:grid id="grid23" width="350" height="120">
							<tr event="S">
								<td  width="80" column="uppercd" title="대분류" align="center" editable="false"></td>
								<td  width="80" column="code" title="소분류" align="left" editable="false"></td>
								<td  width="80" column="codenm" title="코드명" align="right" editable="false"></td>
								<td  width="80" column="useyn" title="사용여부" format="COMBO" brcode="USEYN" align="center" editable="true"></td>
							</tr>
						</ucare:grid>
					</td>
					<td>
						<ucare:grid id="grid24" width="350" height="120">
							<tr event="D,S">
								<td  width="80" column="uppercd" title="대분류" align="center" editable="false"></td>
								<td  width="80" column="code" title="소분류" align="left" editable="false"></td>
								<td  width="80" column="codenm" title="코드명" align="right" editable="false"></td>
								<td  width="80" column="useyn" title="사용여부" format="COMBO" brcode="USEYN" align="center" editable="true"></td>
							</tr>
						</ucare:grid>
					</td>
				</tr>
				<tr>
					<td><ucare:imgbtn name="btnSearch" value="마우스 왼쪽클릭 & 더블클릭" onClick="searchCode('grid25')" /></td>
					<td>&nbsp;</td>
				</tr>
				<tr>
					<td>
						<ucare:grid id="grid25" width="350" height="120">
							<tr event="B">
								<td  width="80" column="uppercd" title="대분류" align="center" editable="false"></td>
								<td  width="80" column="code" title="소분류" align="left" editable="false"></td>
								<td  width="80" column="codenm" title="코드명" align="right" editable="false"></td>
								<td  width="80" column="useyn" title="사용여부" format="COMBO" brcode="USEYN" align="center" editable="true"></td>
							</tr>
						</ucare:grid>
					</td>
					<td>
						&nbsp;
					</td>
				</tr>
			</ucare:table>
		</td>
	</tr>
	<tr>
		<td class="MANTDM">
			- 마우스 왼쪽 클릭	: <font color="red">&lt;tr event="O"&gt;</font> =&gt; function showDetailO_obj(id, strColumnKey, nRow) { // 로직추가 } <br> 
			- 마우스 더블 클릭	: <font color="red">&lt;tr event="D"&gt;</font> =&gt; function showDetailB_obj(id, strColumnKey, nRow) { // 로직추가 } <br>
			- 마우스 오른쪽 클릭: <font color="red">&lt;tr event="R"&gt;</font> =&gt; function showDetailR_obj(id, strColumnKey, nRow) { // 로직추가 }	<br> 
			- Cell Change: <font color="red">&lt;tr event="C"&gt;</font> =&gt; function showDetailC_obj(id, strColumnKey, nRow, vtOldValue, vtNewValue) { // 로직추가 }<br> 
			- Combobox Change: <font color="red">&lt;tr event="S"&gt;</font> =&gt; function showDetailS_obj(id, strColumnKey, nRow, nOldIndex, nNewIndex) { // 로직추가 }<br>
			- 여러개 주기 :  <font color="red">&lt;tr event="D,S"&gt;</font> <br>
			=&gt;  function showDetailB_obj(id, strColumnKey, nRow) { // 로직추가 }<br>
				function showDetailS_obj(id, strColumnKey, nRow, nOldIndex, nNewIndex) { // 로직추가 }<br>	
			- 동시에 마우스 왼쪽 클릭, 더블 클릭 주기 :  <font color="red">&lt;tr event="B"&gt;</font> <br>
			  기존 코딩방식을 따릅니다.<br>
			=&gt;  function showDetailO_obj(id, strColumnKey, nRow) { // 로직추가 }<br>
				function showDetailB_obj(id, strColumnKey, nRow) { // 로직추가 }<br>
		</td>
	</tr>
	
	<!-- Grid : 정렬  -->
	<tr>
		<td class=MANTDT width=100 rowspan="3">정렬</td>
		<td class=MANTDM width=100><ucare:imgbtn name="btnSearch" value="조회" onClick="searchCode('grid21')" /></td>
	</tr>
	<tr>
		<td class="MANTDM">
			<ucare:grid id="grid21" width="450" height="120" sort="sortmulti">
				<tr event="">
					<td  width="100" column="up_cd" title="대분류"></td>
					<td  width="100" column="code" title="소분류"></td>
					<td  width="100" column="code_nm" title="코드명"></td>
					<td  width="100" column="etc1" title="기타1"></td>
					<td  width="100" column="etc2" title="기타2"></td>
					<td  width="100" column="etc3" title="기타3"></td>
				</tr>
			</ucare:grid>		
		</td>
	</tr>
	<tr>
		<td class="MANTDM">
			WiseGrid의 strHDClickAction속성을 세팅할 수 있는 기능을 추가했습니다.<br>
			sort 속성을 주면 되는데 안주면 기본으로 sortsingle입니다. <br>
			- select : 클릭한 컬럼의 모든 셀을 선택한다 <br>
	 		- sortsingle : (기본설정)클릭한 컬럼의 모든 셀을 정렬한다. <br>
	 		- sortmulti : Shift키가 눌려있는 상태에서 여러 컬럼을 선택시 선택한 순서대로 다중정렬한다. <br>
			예) &lt;ucare:grid id="UCFSTEventS" width="280" height="420" <font color="red">sort="sortmulti"</font>&gt;	
		</td>
	</tr>
	
	<!-- Grid : 글자정렬  -->
	<tr>
		<td class=MANTDT width=100 rowspan="3">글자정렬</td>
		<td class=MANTDM width=100><ucare:imgbtn name="btnSearch" value="조회" onClick="searchCode('grid02')" /></td>
	</tr>
	<tr>
		<td class="MANTDM">
			<ucare:grid id="grid02" width="350" height="120">
				<tr event="">
					<td  width="100" column="up_cd" title="대분류" align="center"></td>
					<td  width="100" column="code" title="소분류" align="left"></td>
					<td  width="100" column="code_nm" title="코드명" align="right"></td>
				</tr>
			</ucare:grid>		
		</td>
	</tr>
	<tr>
		<td class="MANTDM">
			방법은 기존과 같습니다. <br>
			예) &lt;td  width="80" column="name" title="이름" <font color="red">align="center"</font>&gt;&lt;/td&gt;
		</td>
	</tr>
	
	<!-- Grid : 체크박스  -->
	<tr>
		<td class=MANTDT width=100 rowspan="3">체크박스</td>
		<td class=MANTDM width=100><ucare:imgbtn name="btnSearch" value="조회" onClick="searchCode('grid11')" /></td>
	</tr>
	<tr>
		<td class="MANTDM">
			<ucare:grid id="grid11" width="350" height="120">
				<tr event="">
					<td  width="20" column="chk" title=" " format="CHECKBOX" hcheckbox="true" editable="true"></td>
					<td  width="100" column="up_cd" title="대분류"></td>
					<td  width="100" column="code" title="소분류"></td>
					<td  width="100" column="code_nm" title="코드명"></td>
				</tr>
			</ucare:grid>		
		</td>
	</tr>
	<tr>
		<td class="MANTDM">
			- format="CHECKBOX" : checkbox를 만들어준다.<br>
			- hcheckbox="true" : Title에 checkbox를 만들어준다.<br>
			<b>!주의사항 : 수정모드(editable="true")로 하지 않으면 checkbox가 비활성화 된다.</b><br>
			예) &lt;td  width="20" column="chk" title="선택" <font color="red">format="CHECKBOX" hcheckbox="true" editable="true"</font>&gt;&lt;/td&gt;
		</td>
	</tr>
	
	<!-- Grid : 콤보박스  -->
	<tr>
		<td class=MANTDT width=100 rowspan="3">콤보박스</td>
		<td class=MANTDM>
			<ucare:imgbtn name="btnSearch" value="조회" onClick="searchCode('grid12')" />
			(사용여부에 마우스를 가져가 보세요.)
		</td>
	</tr>
	<tr>
		<td class="MANTDM">
			<ucare:grid id="grid12" width="450" height="120">
				<tr event="">
					<td  width="100" column="up_cd" title="대분류"></td>
					<td  width="100" column="code" title="소분류"></td>
					<td  width="100" column="code_nm" title="코드명"></td>
					<td  width="100" column="use_f" title="사용여부" format="COMBO" brcode="USEYN" option="4" editable="true"></td>
				</tr>
			</ucare:grid>		
		</td>
	</tr>
	<tr>
		<td class="MANTDM">
			- format="COMBO" : 콤보박스를 만들어준다.<br>
			- brcode="USEYN" : 코드북 조회시 대분류코드값을 지정한다.<br>
			<b>!주의사항 : 수정모드(editable="true")로 하지 않으면 콤보박스가 비활성화 된다.</b><br>
			예) &lt;td  width="100" column="useyn" title="사용여부" <font color="red">format="COMBO" brcode="USEYN" editable="true"</font>&gt;&lt;/td&gt;<br>
			- option="4" : option를 설정한다. <br>
			<table border="1">
				<tr>
					<td>option</td>
					<td>결과</td>
				</tr>
				<tr>
					<td>0</td>
					<td>&lt;option value=""&gt;&lt;/option&gt;</td>
				</tr>
				<tr>
					<td>1</td>
					<td>&lt;option value="00"&gt;전체&lt;/option&gt;</td>
				</tr>
				<tr>
					<td>2</td>
					<td>&lt;option value="00"&gt;== 선택 ==&lt;/option&gt;</td>
				</tr>
				<tr>
					<td>3</td>
					<td>&lt;option value="%"&gt;전체&lt;/option&gt;</td>
				</tr>
				<tr>
					<td>4</td>
					<td>&lt;option value=""&gt;== 선택 ==&lt;/option&gt;</td>
				</tr>
				<tr>
					<td>6</td>
					<td>&lt;option value="0"&gt;== 선택 ==&lt;/option&gt;</td>
				</tr>
				<tr>
					<td>10</td>
					<td>&lt;option value=""&gt;전체&lt;/option&gt;</td>
				</tr>
			</table>
			조회된 값이 바로 나와야 하는 경우 <b>option="-1"</b>을 권장한다.
		</td>
	</tr>
	
	<!-- Grid : 달력  -->
	<tr>
		<td class=MANTDT width=100 rowspan="3">달력</td>
		<td class=MANTDM>
			<ucare:imgbtn name="btnSearch" value="조회" onClick="searchCode('grid13')" />
			(달력에 마우스를 가져가 보세요.)
		</td>
	</tr>
	<tr>
		<td class="MANTDM">
			<ucare:grid id="grid13" width="450" height="120">
				<tr event="">
					<td  width="100" column="up_cd" title="대분류"></td>
					<td  width="100" column="code" title="소분류"></td>
					<td  width="100" column="code_nm" title="코드명"></td>
					<td  width="100" column="dd" title="달력" format="DATE" editable="true"></td>
				</tr>
			</ucare:grid>		
		</td>
	</tr>
	<tr>
		<td class="MANTDM">
			- format="DATE" : 달력을 만들어준다.<br>
			<b>!주의사항 : 수정모드(editable="true")로 하지 않으면 달력이 비활성화 된다.</b><br>
			예) &lt;td  width="100" column="dd" title="달력" <font color="red">format="DATE" editable="true"</font>&gt;&lt;/td&gt;
		</td>
	</tr>
	
	<!-- Grid : 숫자  -->
	<tr>
		<td class=MANTDT width=100 rowspan="3">숫자</td>
		<td class=MANTDM>
			<ucare:imgbtn name="btnSearch" value="조회" onClick="searchCode('grid14')" />
		</td>
	</tr>
	<tr>
		<td class="MANTDM">
			<ucare:grid id="grid14" width="450" height="120">
				<tr event="">
					<td  width="100" column="up_cd" title="대분류"></td>
					<td  width="100" column="code" title="소분류"></td>
					<td  width="100" column="code_nm" title="코드명"></td>
					<td  width="50" column="num1" title="정수" format="MONEY"></td>
					<td  width="50" column="num2" title="실수" format="MONEY" maxlength="3.2"></td>
				</tr>
			</ucare:grid>		
		</td>
	</tr>
	<tr>
		<td class="MANTDM">
			- format="MONEY" : 숫자형으로 표현한다.<br>
			<b>!주의사항 : format="MONEY"와 상관없이 maxlength을 주지않으면 20byte입니다.</b><br>
			예) &lt;td  width="50" column="num1" title="정수" <font color="red">format="MONEY"</font>&gt;&lt;/td&gt; <br>
			&lt;td  width="50" column="num2" title="실수" <font color="red">format="MONEY" maxlength="3.2"</font>&gt;&lt;/td&gt;
		</td>
	</tr>
	
	<!-- Grid : Title 그룹지정  -->
	<tr>
		<td class=MANTDT width=100 rowspan="3">Title 그룹지정 </td>
		<td class=MANTDM>
			<ucare:imgbtn name="btnSearch" value="조회" onClick="searchCode('grid15')" />
		</td>
	</tr>
	<tr>
		<td class="MANTDM">
			<ucare:grid id="grid15" width="450" height="120">
				<tr event="">
					<td  width="100" column="uppercd" title="대분류"></td>
					<td  width="100" column="code" title="소분류"></td>
					<td  width="100" column="codenm" title="코드명"></td>
					<td  width="50" column="num1" title="정수" groupid="num" grouptitle="숫자" format="MONEY"></td>
					<td  width="50" column="num2" title="실수" groupid="num" grouptitle="숫자" format="MONEY" maxlength="3.2"></td>
				</tr>
			</ucare:grid>		
		</td>
	</tr>
	<tr>
		<td class="MANTDM">
			- groupid="num" : 같은 그룹ID로 지정한다.<br>
			- grouptitle="숫자" : 같은 그룹ID의 Title을 지정한다.<br>
			<b>!주의사항 : groupid와 grouptitle을 지정할 때 같은 그룹TD 순서대로 해야 한다. 떨어지면 안됩니다.</b><br>
			예) &lt;td  width="50" column="num1" title="정수" <font color="red">groupid="num" grouptitle="숫자"</font>&gt;&lt;/td&gt; <br>
			&lt;td  width="50" column="num2" title="실수" <font color="red">groupid="num" grouptitle="숫자"</font>&gt;&lt;/td&gt;
		</td>
	</tr>
	
	<!-- Grid : 이미지 추가하는 방법  -->
	<tr>
		<td class=MANTDT width=100 rowspan="3">이미지 추가하는 방법</td>
		<td class=MANTDM width=100><ucare:imgbtn name="btnSearch" value="조회" onClick="searchCode('grid07')" /></td>
	</tr>
	<tr>
		<td class="MANTDM">
			<ucare:grid id="grid07" width="350" height="120">
				<tr event="">
					<td  width="100" column="uppercd" title="대분류"></td>
					<td  width="100" column="code" title="소분류"></td>
					<td  width="100" column="codenm" title="코드명" format="IMAGE" image="search"></td>
				</tr>
			</ucare:grid>		
		</td>
	</tr>
	<tr>
		<td class="MANTDM">
			- format에 IMAGE라고 설정하고 원하는 이미지는 image에 설정하면 됩니다. (global.properties : #Grid Icon Image URL 참조) <br>
			예) &lt;td  width="160" column="eventnm" title="이벤트명"	<font color="red">format="IMAGE" image="search"</font>&gt;&lt;/td&gt; <br>
			* search : 조회 <br>
			* doc : 문서 <br>
			* scissors : 가위 <br>
			* del : 휴지통 <br>
			* play : 미디어 플레이 <br>
			* 그 밖에 images안에 있는 이미지는 그 이후 폴더명부터 기술 하면 됩니다. 예) image="smallbtn/play_2.gif" <br>
		</td>
	</tr>
	
	<!-- Grid : Cell Merge  -->
	<tr>
		<td class=MANTDT width=100 rowspan="3">Cell Merge</td>
		<td class=MANTDM width=100><ucare:imgbtn name="btnSearch" value="조회" onClick="searchCode('grid20')" /></td>
	</tr>
	<tr>
		<td class="MANTDM">
			<ucare:grid id="grid20" width="350" height="120">
				<tr event="">
					<td  width="100" column="up_cd" title="대분류" merge="true"></td>
					<td  width="100" column="code" title="소분류"></td>
					<td  width="100" column="code_nm" title="코드명"></td>
				</tr>
			</ucare:grid>		
		</td>
	</tr>
	<tr>
		<td class="MANTDM">
			- merge="true" 하면 그 컬럼을 merge 한다.<br>
			예) &lt;td  width="100" column="uppercd" title="대분류" <font color="red">merge="true"</font>&gt;&lt;/td&gt; <br>
		</td>
	</tr>
	
	<!-- Grid : Grid 조회 시 첫 번째 Row 자동 클릭 이벤트  -->
	<tr>
		<td class=MANTDT width=100 rowspan="3">Grid 조회 시 첫 번째 Row 자동 클릭 이벤트</td>
		<td class=MANTDM width=100><ucare:imgbtn name="btnSearch" value="조회" onClick="testDefClick('grid08')" /></td>
	</tr>
	<tr>
		<td class="MANTDM">
			<ucare:grid id="grid08" width="350" height="120">
				<tr event="">
					<td  width="100" column="uppercd" title="대분류"></td>
					<td  width="100" column="code" title="소분류"></td>
					<td  width="100" column="codenm" title="코드명" format="IMAGE" image="search"></td>
				</tr>
			</ucare:grid>		
		</td>
	</tr>
	<tr>
		<td class=MANTDM>
			 방법은 기존과 같습니다. <br>
			  예) <br>
			 function query() <br> 
		  	 { <br>
		  	&nbsp;&nbsp;&nbsp;&nbsp;	var tran = new Trans(); <br>
			&nbsp;&nbsp;&nbsp;&nbsp;	tran.setSvc(SELECT_ID); <br>
			&nbsp;&nbsp;&nbsp;&nbsp;	<font color="red">tran.setDefClick("true");	// 여기 추가 </font> <br>			
			&nbsp;&nbsp;&nbsp;&nbsp;	tran.setWiseGrid("1");	<br>		
			&nbsp;&nbsp;&nbsp;&nbsp;	tran.setForwardId("wgdsl",""); <br>
			&nbsp;&nbsp;&nbsp;&nbsp;	tran.open("fQuery", "f","/wisegrid.do"); <br>	
		  	 } 	
		</td>
	</tr>
	
	<!-- Grid : Grid 컬럼 수정/읽기 모드 세팅 방법 변경  -->
	<tr>
		<td class=MANTDT width=100 rowspan="3">Grid 컬럼 수정/읽기 모드 세팅 방법 변경</td>
		<td class=MANTDM>
			<ucare:imgbtn name="btnSearch" value="조회" onClick="searchCode('grid06')" />
			(Cell을 더블 클릭해보세요.)
		</td>
	</tr>
	<tr>
		<td class="MANTDM">
			<ucare:grid id="grid06" width="350" height="120">
				<tr event="">
					<td  width="100" column="up_cd" title="대분류" editable="true"></td>
					<td  width="100" column="code" title="소분류" editable="false"></td>
					<td  width="100" column="code_nm" title="코드명" editable="true"></td>
				</tr>
			</ucare:grid>		
		</td>
	</tr>
	<tr>
		<td class="MANTDM">
			- editable속성으로 주어 개발자 맘대로 지정할 수 있습니다. Default값은 false이기 때문에 자동으로 읽기 모드가 됩니다.<br>
	   		예) &lt;td  width="20" column="eventid" title="ID" <font color="red">editable="true"</font> align="center"&gt;&lt;/td&gt;
		</td>
	</tr>
	
	<!-- Grid : 다중열 기능  -->
	<tr>
		<td class=MANTDT width=100 rowspan="3">다중열 기능</td>
		<td class=MANTDM width=100><ucare:imgbtn name="btnSearch" value="조회" onClick="searchCode('grid10')" /></td>
	</tr>
	<tr>
		<td class="MANTDM">
			<ucare:grid id="grid10" width="350" height="120" level="2">
				<tr event="">
					<!-- 첫 번째 줄 : level="0" -->
					<td  width="100" column="uppercd" title="대분류" level="0"></td>
					<td  width="100" column="code" title="소분류" level="0"></td>
					<td  width="100" column="codenm" title="코드명" level="0"></td>
					<!-- 두 번째 줄 : level="1" -->
					<td  width="100" column="etc1" title="기타1" level="1"></td>
					<td  width="100" column="etc2" title="기타2" level="1"></td>
					<td  width="100" column="etc3" title="기타3" level="1"></td>
				</tr>
			</ucare:grid>
		</td>
	</tr>
	<tr>
		<td class="MANTDM">
			- &lt;ucare:grid <font color="red">level="3"</font>&gt; 이 부분에 설정한 level은 1개의 Row Data를 3개의 줄로 보여주겠다는 표시 <br>
			- &lt;td <font color="red">level="0"</font>&gt; 이 부분에 설정한 level은 이 컬럼을 첫 번째 줄에 보여주겠다는 표시  <br>
		</td>
	</tr>
	
	<!-- Grid : 페이지  -->
	<%--  
	<tr>
		<td class=MANTDT width=100 rowspan="3">페이지</td>
		<td class=MANTDM width=100><ucare:imgbtn name="btnSearch" value="조회" onClick="testPage('grid16')" /></td>
	</tr>
	<tr>
		<td class="MANTDM">
			<ucare:grid id="grid16" width="550" height="120">
				<tr event="">
					<td  width="100" column="uppercd" title="대분류"></td>
					<td  width="100" column="code" title="소분류"></td>
					<td  width="100" column="codenm" title="코드명"></td>
				</tr>
			</ucare:grid>		
		</td>
	</tr>
	--%>
	<tr>
		<td class=MANTDT width=100 rowspan="3">페이지</td>
		<td class=MANTDM width=100><ucare:imgbtn name="btnSearch" value="조회" onClick="testPage2()" /></td>
	</tr>
	<tr>
		<td class="MANTDM">
			<table>
				<tr>
					<td>
						<ucare:grid id="grid55" width="550" height="120">
							<tr event="">
								<td  width="100" column="uppercd" title="대분류"></td>
								<td  width="100" column="code" title="소분류"></td>
								<td  width="100" column="codenm" title="코드명"></td>
							</tr>
						</ucare:grid>
					</td>
					<td>
						<ucare:grid id="grid66" width="550" height="120">
							<tr event="">
								<td  width="100" column="uppercd" title="대분류"></td>
								<td  width="100" column="code" title="소분류"></td>
								<td  width="100" column="codenm" title="코드명"></td>
							</tr>
						</ucare:grid>
					</td>
				</tr>
			</table>		
		</td>
	</tr>
	<tr>
		<td class="MANTDM">
			<b>쿼리작성시 query-exec-type을 page로 설정하기만 하면 됩니다.</b>	
		</td>
	</tr>
	
	<!-- Grid : Tree  -->
	<tr>
		<td class=MANTDT width=100 rowspan="2">Tree</td>
		<td class=MANTDM>
			<font color="green">smpTree.jsp 참조</font>
		</td>
	</tr>
	<tr>
		<td class="MANTDM">
			<font color="blue">1. Tag 방법</font> <br>
			&lt;ucare:grid id="SMPTREES" width="200" height="370" <font color="red">tree="true"</font>&gt; <br>
            &nbsp;&nbsp;&nbsp;&nbsp;	&lt;tr class="LIST" event="O"&gt; <br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;    	&lt;td  width="200" column="codenm" <font color="red">format="TREE" image="search"</font>&gt;&lt;/td&gt; <br>
            &nbsp;&nbsp;&nbsp;&nbsp;    &lt;/tr&gt; <br>
			&lt;/ucare:grid&gt; <br>
			
			<font color="blue">2. 쿼리작성 방법</font> <br>
			<b>!주의사항 : table방식을 경우 view type을 tree로 선언했지만 WiseGrid는 grid로 선언해야 합니다. </b><br>
			<font color="red">&lt;query-view-type&gt;grid&lt;/query-view-type&gt;</font> <br>
			
			<font color="blue">3. Tree 이벤트</font> <br>
			function treeClick(obj, strTreeKey, strArea)<br> 
			{<br>
			&nbsp;&nbsp;&nbsp;&nbsp;	alert(strTreeKey);<br>
			&nbsp;&nbsp;&nbsp;&nbsp;	alert(strArea);<br>
			} <br>
			
		</td>
	</tr>
</ucare:table>	

</form>




</body>
</html>