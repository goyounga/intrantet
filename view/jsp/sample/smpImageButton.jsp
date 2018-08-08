<!--
  PROJ : Intranet
  NAME : smpWiseGrid.jsp
  DESC : Image Button Tag Sample
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

<html>
<head>
	<%@ include file="/jsp/include/include.jsp"%>
	<script language="javascript" src="<%= scriptPath %>/js/sample/smpImageButton.js"></script>
</head>
<body topmargin="20" leftmargin="30" scroll="auto">

<form>

<ucare:table border="detail">
	<tr>
		<td class=MANTDT width=100 rowspan="15">imgbtn</td>
		<td class=MANTDM>type</td>
		<td class=MANTDM><ucare:imgbtn type="B" value="버튼"/></td>
		<td class=MANTDM>
			&lt;ucare:imgbtn <font color="red">type="B"</font> value="버튼"/&gt;
		</td>
		<td>
			버튼에 색상종류를 설정한다.<br>
			type을 주지 않으면 기본색상(주황색)을 준다.<br>
			<table border=1>
				<tr>
					<td class="MANTDT" width=60>type</td>
					<td class="MANTDT" width=60>button</td>
				</tr>
				<tr>
					<td>없음</td>
					<td><ucare:imgbtn kind="R" type="" value="버튼"/></td>
				</tr>
				<tr>
					<td>G</td>
					<td><ucare:imgbtn kind="R" type="G" value="버튼"/></td>
				</tr>
			</table>
		</td>
	</tr>
	<tr>
		<td class=MANTDM>kind</td>
		<td class=MANTDM><ucare:imgbtn kind="R"/></td>
		<td class=MANTDM>
			&lt;ucare:imgbtn <font color="red">kind="R"</font>/&gt;
		</td>
		<td>
			버튼종류를 설정하다. 버튼은 코드로 관리한다. <br>
			<b>global.properties에 있는 속성을 참조한다. <br>
			imgbtn_code=COM002에 대분류 코드를 지정한다. <br>
			imgbtn_auth=etc1 (버튼 권한정보)<br>
			imgbtn_value=codenm (버튼명)
			</b><br>
			<table border=1>
				<tr>
					<td class="MANTDT">LCD</td>
					<td class="MANTDT">CD</td>
					<td class="MANTDT">CD_NM</td>
					<td class="MANTDT">ETC_1</td>
					<td class="MANTDT">BUTTON</td>
				</tr>
				<tr>
					<td>COM002</td>
					<td>##</td>
					<td>버튼명설정</td>
					<td>C:등록 R:조회 U:수정 D:삭제 F:파일 P:인쇄 O:팝업 NUL:전체</td>
					<td>&nbsp;</td>
				</tr>
				<tr>
					<td>COM003</td>
					<td>A</td>
					<td>신규</td>
					<td>C</td>
					<td><ucare:imgbtn kind="A"/></td>
				</tr>
				<tr>
					<td>COM002</td>
					<td>C</td>
					<td>취소</td>
					<td>&nbsp;</td>
					<td><ucare:imgbtn kind="C"/></td>
				</tr>
				<tr>
					<td>COM002</td>
					<td>D</td>
					<td>삭제</td>
					<td>D</td>
					<td><ucare:imgbtn kind="D"/></td>
				</tr>
				<tr>
					<td>COM002</td>
					<td>E</td>
					<td>엑셀</td>
					<td>F</td>
					<td><ucare:imgbtn kind="E"/></td>
				</tr>
				<tr>
					<td>COM002</td>
					<td>O</td>
					<td>팝업</td>
					<td>O</td>
					<td><ucare:imgbtn kind="O"/></td>
				</tr>
				<tr>
					<td>COM002</td>
					<td>P</td>
					<td>인쇄</td>
					<td>P</td>
					<td><ucare:imgbtn kind="P"/></td>
				</tr>
				<tr>
					<td>COM002</td>
					<td>R</td>
					<td>조회</td>
					<td>R</td>
					<td><ucare:imgbtn kind="R"/></td>
				</tr>
				<tr>
					<td>COM002</td>
					<td>S</td>
					<td>저장</td>
					<td>U</td>
					<td><ucare:imgbtn kind="S"/></td>
				</tr>
				<tr>
					<td>COM002</td>
					<td>U</td>
					<td>수정</td>
					<td>U</td>
					<td><ucare:imgbtn kind="U"/></td>
				</tr>
				<tr>
					<td>COM002</td>
					<td>X</td>
					<td>닫기</td>
					<td>&nbsp;</td>
					<td><ucare:imgbtn kind="X"/></td>
				</tr>
			</table>
		</td>
	</tr>
	<tr>
		<td class=MANTDM>name</td>
		<td class=MANTDM><ucare:imgbtn name="btnSearch" kind="R"/></td>
		<td class=MANTDM>
			&lt;ucare:imgbtn <font color="red">name="btnSearch"</font> kind="R"/&gt;
		</td>
		<td>
			button name을 설정한다.<br>
		</td>
	</tr>
	<tr>
		<td class=MANTDM>value</td>
		<td class=MANTDM><ucare:imgbtn kind="R" value="버튼샘플"/></td>
		<td class=MANTDM>
			&lt;ucare:imgbtn kind="R" <font color="red">value="버튼샘플"</font>/&gt;
		</td>
		<td>
			버튼명을 설정한다. value값이 없으면 kind에 따라 버튼명을 설정해 준다.<br>
		</td>
	</tr>
	<tr>
		<td class=MANTDM>auth</td>
		<td class=MANTDM><ucare:imgbtn name="btnSearch" kind="R" auth="U"/></td>
		<td class=MANTDM>
			&lt;ucare:imgbtn name="btnSearch" kind="R" <font color="red">auth="U"</font>/&gt;
		</td>
		<td>
			버튼권한을 설정한다. auth값이 없으면 kind에 따라 권한을 설정해 준다.<br>
			앞의 예제는 kind="R"이어서 조회권한을 체크해야 하지만 auth="U"로 줬기 때문에 수정권한을 체크하게 된다.<br>
			사용자의 권한이 없다면 그 button을 비활성화 시킨다. 	ucare_util.js의 setButtonByAuth함수참조<br>
		</td>
	</tr>
	<tr>
		<td class=MANTDM>width</td>
		<td class=MANTDM><ucare:imgbtn name="btnSearch" kind="R" width="100"/></td>
		<td class=MANTDM>
			&lt;ucare:imgbtn name="btnSearch" kind="R" <font color="red">width="100"</font>/&gt;
		</td>
		<td>
			button width를 설정한다.<br>
			width값이 없다면 <b>icon을 사용하면 60, icon을 사용하지 않으면 40</b>으로 자동설정된다.<br>
		</td>
	</tr>
	<tr>
		<td class=MANTDM>title</td>
		<td class=MANTDM><ucare:imgbtn name="btnSearch" kind="R" title="조회를 합니다."/></td>
		<td class=MANTDM>
			&lt;ucare:imgbtn name="btnSearch" kind="R" <font color="red">title="조회를 합니다."</font>/&gt;
		</td>
		<td>
			title을 설정한다.(풍선말 기능)<br>
		</td>
	</tr>
	<tr>
		<td class=MANTDM>disable</td>
		<td class=MANTDM><ucare:imgbtn name="btnSearch" kind="R" disable="true"/></td>
		<td class=MANTDM>
			&lt;ucare:imgbtn name="btnSearch" kind="R" <font color="red">disable="true"</font>/&gt;
		</td>
		<td>
			button에 disabled을 설정한다. <br>
			button 활성/비활성 컨트롤은 ucare_util.js의 setButton함수를 이용한다.<br>
			예) setButton(f.btnSearch, false);
		</td>
	</tr>
	<tr>
		<td class=MANTDM>onClick</td>
		<td class=MANTDM><ucare:imgbtn name="btnSearch" kind="R" onClick="query()"/></td>
		<td class=MANTDM>
			&lt;ucare:imgbtn name="btnSearch" kind="R" <font color="red">onClick="query()"</font>/&gt;
		</td>
		<td>
			onClick 이벤트시 호출되는 함수를 설정한다. <br>
		</td>
	</tr>
	<tr>
		<td class=MANTDM>styleClass</td>
		<td class=MANTDM><ucare:imgbtn name="btnSearch" kind="R" styleClass="button_class"/></td>
		<td class=MANTDM>
			&lt;ucare:imgbtn name="btnSearch" kind="R" <font color="red">styleClass="button_class"</font>/&gt;
		</td>
		<td>
			button class를 설정한다. <br>
			styleClass값이 없으면 class는 img_button으로 자동 설정된다.
		</td>
	</tr>
	<tr>
		<td class=MANTDM>classL</td>
		<td class=MANTDM><ucare:imgbtn name="btnSearch" kind="R" classL="button_class"/></td>
		<td class=MANTDM>
			&lt;ucare:imgbtn name="btnSearch" kind="R" <font color="red">classL="button_class"</font>/&gt;
		</td>
		<td>
			button 왼쪽부분을 class를 설정한다. <br>
			classL값이 없으면 class는 imgbtnL로 자동 설정된다.
		</td>
	</tr>
	<tr>
		<td class=MANTDM>classM</td>
		<td class=MANTDM><ucare:imgbtn name="btnSearch" kind="R" classM="button_class"/></td>
		<td class=MANTDM>
			&lt;ucare:imgbtn name="btnSearch" kind="R" <font color="red">classM="button_class"</font>/&gt;
		</td>
		<td>
			button 가운데 부분을 class를 설정한다. <br>
			classM값이 없으면 class는 imgbtnM으로 자동 설정된다.
		</td>
	</tr>
	<tr>
		<td class=MANTDM>classR</td>
		<td class=MANTDM><ucare:imgbtn name="btnSearch" kind="R" classR="button_class"/></td>
		<td class=MANTDM>
			&lt;ucare:imgbtn name="btnSearch" kind="R" <font color="red">classR="button_class"</font>/&gt;
		</td>
		<td>
			button 오른쪽 부분 class를 설정한다. <br>
			classR값이 없으면 class는 imgbtnR로 자동 설정된다.
		</td>
	</tr>
	<tr>
		<td class=MANTDM>src</td>
		<td class=MANTDM><ucare:imgbtn name="btnSearch" kind="R" src=""/></td>
		<td class=MANTDM>
			&lt;ucare:imgbtn name="btnSearch" kind="R" <font color="red">src=""</font>/&gt;
		</td>
		<td>
			현재 사용안함.<br>
		</td>
	</tr>
	<tr>
		<td class=MANTDM>tabIndex</td>
		<td class=MANTDM><ucare:imgbtn name="btnSearch" kind="R" tabIndex="1"/></td>
		<td class=MANTDM>
			&lt;ucare:imgbtn name="btnSearch" kind="R" <font color="red">tabIndex="1"</font>/&gt;
		</td>
		<td>
			현재 사용안함.<br>
		</td>
	</tr>
</ucare:table>

</form>
</body>
</html>