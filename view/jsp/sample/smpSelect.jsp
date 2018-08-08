<!--
  PROJ : Intranet
  NAME : smpSelect.jsp
  DESC : Select Tag Sample
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
</head>
<body topmargin="20" leftmargin="30" scroll="auto">

<form>

<ucare:table border="detail">
	<tr>
		<td class=MANTDT width=100 rowspan="21">select</td>
		<td class=MANTDM>name</td>
		<td class=MANTDM><ucare:select name="mycombo"/></td>
		<td class=MANTDM>
			&lt;ucare:select <font color="red">name="mycombo"</font>/&gt;
		</td>
		<td>
			combobox name을 설정한다. <br>
		</td>
	</tr>
	<tr>
		<td class=MANTDM>brcode</td>
		<td class=MANTDM><ucare:select name="mycombo" brcode="COM002"/></td>
		<td class=MANTDM>
			&lt;ucare:select name="mycombo" <font color="red">brcode="COM002"</font>/&gt;
		</td>
		<td>
			brcode는 combobox를 만들기 위해 쿼리 조회를 할 때 where절에 들어갈 조건값을 말한다.<br>
			<b>(common.xml의 COM000001를 참조)</b><br>
			queryid가 없을 경우 대분류코드를 입력하면 되고 queryid가 있다면 그 쿼리에 해당하는 조회조건값을 설정하면 된다. <br>
		</td>
	</tr>
	<tr>
		<td class=MANTDM>queryid</td>
		<td class=MANTDM><ucare:select name="mycombo" queryid="samplecombobyquery" brcode="" code="etc1" codename="code_nm"/></td>
		<td class=MANTDM>
			&lt;ucare:select name="mycombo" <font color="red">queryid="samplecombobyquery"</font> brcode="" code="etc1" codename="code_nm"/&gt;
		</td>
		<td>
			따로 쿼리를 작성하여 combobox를 만들 경우에 queryid에 작성한 쿼리의 id를 설정한다.<br>
			<br>
		</td>
	</tr>
	<tr>
		<td class=MANTDM>code</td>
		<td class=MANTDM><ucare:select name="mycombo" queryid="samplecombobyquery" brcode="" code="etc1" codename="codenm"/></td>
		<td class=MANTDM>
			&lt;ucare:select name="mycombo" queryid="samplecombobyquery" brcode="" <font color="red">code="etc1"</font> codename="codenm"/&gt;
		</td>
		<td>
			따로 쿼리를 작성하여 combobox를 만들 경우에 value값에 해당하는 컬럼을 지정한다.<br>
		</td>
	</tr>
	<tr>
		<td class=MANTDM>codename</td>
		<td class=MANTDM><ucare:select name="mycombo" queryid="samplecombobyquery" brcode="" code="etc1" codename="codenm"/></td>
		<td class=MANTDM>
			&lt;ucare:select name="mycombo" queryid="samplecombobyquery" brcode="" code="etc1" <font color="red">codename="codenm"</font>/&gt;
		</td>
		<td>
			따로 쿼리를 작성하여 combobox를 만들 경우에 text값에 해당하는 컬럼을 지정한다.<br>
		</td>
	</tr>
	<tr>
		<td class=MANTDM>styleClass</td>
		<td class=MANTDM><ucare:select name="mycombo" styleClass="combo_class"/></td>
		<td class=MANTDM>
			&lt;ucare:select name="mycombo" <font color="red">styleClass="combo_class"</font>/&gt;
		</td>
		<td>
			class를 설정한다. <br>
			<table border="1">
				<tr>
					<td>styleClass</td>
					<td>required</td>
					<td>disable</td>
					<td class=MANTDT>class</td>
				</tr>
				<tr>
					<td>없음</td>
					<td>없음 또는 false</td>
					<td>없음 또는 false</td>
					<td class="combo_text">combo_text</td>
				</tr>
				<tr>
					<td>없음</td>
					<td>true</td>
					<td>없음 또는 false</td>
					<td class="combo_required">combo_required</td>
				</tr>
				<tr>
					<td>없음</td>
					<td>없음 또는 false</td>
					<td>true</td>
					<td class="combo_disabled">combo_disabled</td>
				</tr>
				<tr>
					<td>없음</td>
					<td>true</td>
					<td>true</td>
					<td class="combo_disabled">combo_disabled</td>
				</tr>
				<tr>
					<td>있음</td>
					<td colspan="2">어떤 값이 오더라도 </td>
					<td>styleClas에 설정한 class</td>
				</tr>
			</table>
		</td>
	</tr>
	<tr>
		<td class=MANTDM>option</td>
		<td class=MANTDM><ucare:select name="mycombo" option="1"/></td>
		<td class=MANTDM>
			&lt;ucare:select name="mycombo" <font color="red">option="1"</font>/&gt;
		</td>
		<td>
			option를 설정한다. <br>
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
	<tr>
		<td class=MANTDM>onChange</td>
		<td class=MANTDM><ucare:select name="mycombo" brcode="COM002" onChange="getSelectedText(this)"/></td>
		<td class=MANTDM>
			&lt;ucare:select name="mycombo" brcode="COM002" <font color="red">onChange="getSelectedText(this)"</font>/&gt;
		</td>
		<td>
			onChange 이벤트시 함수를 설정한다. <br>
		</td>
	</tr>
	<tr>
		<td class=MANTDM>onClick</td>
		<td class=MANTDM><ucare:select name="mycombo" brcode="COM002" onClick="getSelectedText(this)"/></td>
		<td class=MANTDM>
			&lt;ucare:select name="mycombo" brcode="COM002" <font color="red">onClick="getSelectedText(this)"</font>/&gt;
		</td>
		<td>
			onClick 이벤트시 함수를 설정한다. <br>
		</td>
	</tr>
	<tr>
		<td class=MANTDM>onDblClick</td>
		<td class=MANTDM><ucare:select name="mycombo" brcode="COM002" height="3" onDblClick="getSelectedText(this)"/></td>
		<td class=MANTDM>
			&lt;ucare:select name="mycombo" brcode="COM002" <font color="red">onDblClick="getSelectedText(this)"</font>/&gt;
		</td>
		<td>
			onDblClick 이벤트시 함수를 설정한다. <br>
		</td>
	</tr>
	<tr>
		<td class=MANTDM>width</td>
		<td class=MANTDM><ucare:select name="mycombo" width="120"/></td>
		<td class=MANTDM>
			&lt;ucare:select name="mycombo" <font color="red">width="120"</font>/&gt;
		</td>
		<td>
			width를 설정한다. <br>
		</td>
	</tr>
	<tr>
		<td class=MANTDM>height</td>
		<td class=MANTDM><ucare:select name="mycombo" height="5"/></td>
		<td class=MANTDM>
			&lt;ucare:select name="mycombo" <font color="red">height="5"</font>/&gt;
		</td>
		<td>
			size를 설정한다. <br>
		</td>
	</tr>
	<tr>
		<td class=MANTDM>multiple</td>
		<td class=MANTDM><ucare:select name="mycombo" brcode="COM003" height="5" multiple="true"/></td>
		<td class=MANTDM>
			&lt;ucare:select name="mycombo" brcode="COM003" height="5" <font color="red">multiple="true"</font>/&gt;
		</td>
		<td>
			multiple을 설정한다.(다중 선택) <br>
		</td>
	</tr>
	<tr>
		<td class=MANTDM>step</td>
		<td class=MANTDM><ucare:select name="mycombo" brcode="COM004" step="2"/></td>
		<td class=MANTDM>
			&lt;ucare:select name="mycombo" brcode="COM004" <font color="red">step="2"</font>/&gt;
		</td>
		<td>
			&nbsp;
		</td>
	</tr>
	<tr>
		<td class=MANTDM>selCode</td>
		<td class=MANTDM><ucare:select name="mycombo" brcode="COM003" selCode="A"/></td>
		<td class=MANTDM>
			&lt;ucare:select name="mycombo" brcode="COM003" <font color="red">selCode="A"</font>/&gt;
		</td>
		<td>
			기본으로 선택할 코드를 지정한다.
		</td>
	</tr>
	<tr>
		<td class=MANTDM>required</td>
		<td class=MANTDM><ucare:select name="mycombo" required="true"/></td>
		<td class=MANTDM>
			&lt;ucare:select name="mycombo" <font color="red">required="true"</font>/&gt;
		</td>
		<td>
			required를 설정한다. <br>
			=> checkValidation 또는 getValidation 함수에서 사용된다.(ucare_format.js 참조)<br>
			required가 없거나 false인 경우 combobox의 class는 combo_text로 자동 설정된다.<br>
			required가 true인 경우 combobox class는 combo_required로 자동 설정된다.<br>	
		</td>
	</tr>
	<tr>
		<td class=MANTDM>requirednm</td>
		<td class=MANTDM><ucare:select name="mycombo" required="true" requirednm="이름"/></td>
		<td class=MANTDM>
			&lt;ucare:select name="mycombo" required="true" <font color="red">requirednm="이름"</font>/&gt;
		</td>
		<td>
			requirednm을 설정한다. <br>
			=> checkValidation 또는 getValidation 함수에서 사용된다.(ucare_format.js 참조)<br>
			required가 true인 경우 checkValidation 또는 getValidation 함수 검사에서 걸린 경우 requirednm으로 메시지를 보여준다.<br>
			예) 이름는(은) 필수입력 항목 입니다. 	<br>
		</td>
	</tr>
	<tr>
		<td class=MANTDM>disable</td>
		<td class=MANTDM><ucare:select name="mycombo" disable="true"/></td>
		<td class=MANTDM>
			&lt;ucare:select name="mycombo" <font color="red">disable="true"</font>/&gt;
		</td>
		<td>
			disabled를 설정한다. <br>
			disable이 true인 경우 cobobox class는 combo_disabled로 자동 설정된다.<br>	
		</td>
	</tr>
	<tr>
		<td class=MANTDM>event</td>
		<td class=MANTDM><ucare:select name="mycombo" event="true"/></td>
		<td class=MANTDM>
			&lt;ucare:select name="mycombo" <font color="red">event="true"</font>/&gt;
		</td>
		<td>
			테이블 태그 안에 들어갈 경우 event처리할지 여부 <br>
		</td>
	</tr>
	<tr>
		<td class=MANTDM>tag</td>
		<td class=MANTDM><ucare:select name="mycombo" tag="style=color:blue;BACKGROUND-COLOR:#aff"/></td>
		<td class=MANTDM>
			&lt;ucare:select name="mycombo" <font color="red">tag="style=color:blue;BACKGROUND-COLOR:#aff"</font>/&gt;
		</td>
		<td>
			지정된 속성 이외의 속성이 필요할 경우 tag로 지정할 수 있다.<br>
		</td>
	</tr>
<!--	<tr>
		<td class=MANTDM>tag</td>
		<td class=MANTDM>
			<ucare:select name="mycombo" queryid="mycombo" code="code" codename="codenm" brcode="0" onChange="onChangeMyCombo(this)"/>
			<ucare:select name="mycombo2"/>
			</td>
		<td class=MANTDM>
			&lt;ucare:select name="mycombo" <font color="red">tag="style='height:30' ondbclick=getMyName()"</font>/&gt;
		</td>
		<td>
			지정된 속성 이외의 속성이 필요할 경우 tag로 지정할 수 있다.<br>
		</td>
	</tr>-->
</ucare:table>

</form>
</body>
</html>