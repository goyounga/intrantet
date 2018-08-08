<%@ page language="java" contentType="text/html; charset=euc-kr"%>

<html>
<head>
	<%@ include file="/jsp/include/include.jsp"%>
</head>
<body>

<form>

<!-- text -->
<ucare:table border="detail">
	<tr>
		<td class=MANTDT width=100 rowspan="19">text</td>
		<td class=MANTDM width=100>type</td>
		<td class=MANTDM width=120><ucare:input type="text"/></td>
		<td class=MANTDM>
			&lt;ucare:input <font color="red">type="text"</font>/&gt;
		</td>
		<td>
			input type 지정 (<b>text, checkbox, radio, hidden</b>)으로 설정할 수 있다.
		</td>
	</tr>
	<tr>
		<td class=MANTDM>name</td>
		<td class=MANTDM><ucare:input type="text" name="myname"/></td>
		<td class=MANTDM>
			&lt;ucare:input type="text" <font color="red">name="myname"</font>/&gt;
		</td>
		<td>name 설정</td>
	</tr>
	<tr>
		<td class=MANTDM>required</td>
		<td class=MANTDM><ucare:input type="text" name="myname" required="true"/></td>
		<td class=MANTDM>
			&lt;ucare:input type="text" name="myname" <font color="red">required="true"</font>/&gt;
		</td>
		<td>
			required를 설정한다. <br>
			=> checkValidation 또는 getValidation 함수에서 사용된다.(ucare_format.js 참조)<br>
			required가 없거나 false인 경우 input의 class는 input_text로 자동 설정된다.<br>
			required가 true인 경우 input이 class는 input_required로 자동 설정된다.<br>	
		</td>
	</tr>
	<tr>
		<td class=MANTDM>requirednm</td>
		<td class=MANTDM><ucare:input type="text" name="myname" required="true" requirednm="이름"/></td>
		<td class=MANTDM>
			&lt;ucare:input type="text" name="myname" required="true" <font color="red">requirednm="이름"</font>/&gt;
		</td>
		<td>
			requirednm을 설정한다. <br>
			=> checkValidation 또는 getValidation 함수에서 사용된다.(ucare_format.js 참조)<br>
			required가 true인 경우 checkValidation 또는 getValidation 함수 검사에서 걸린 경우 requirednm으로 메시지를 보여준다.<br>
			예) 이름는(은) 필수입력 항목 입니다. 	<br>
		</td>
	</tr>
	<tr>
		<td class=MANTDM>format</td>
		<td class=MANTDM><ucare:input type="text" name="startdt" required="true" format="DATE"/></td>
		<td class=MANTDM>
			&lt;ucare:input type="text" name="startdt" required="true" <font color="red">format="DATE"</font>/&gt;
		</td>
		<td>
			checkValidation 또는 getValidation 함수에서 검사할 foramt을 설정한다.<br>
			=> checkValidation 또는 getValidation 함수에서 사용된다.(ucare_format.js 참조)<br>
			<b>MONEY : 금액, NUMBER : 숫자, DATE : 날짜, TIME : 시간 FLOAT : float</b><br>
		</td>
	</tr>
	<tr>
		<td class=MANTDM>maxsize</td>
		<td class=MANTDM><ucare:input type="text" name="myname" required="true" maxsize="20"/></td>
		<td class=MANTDM>
			&lt;ucare:input type="text" name="myname" required="true" <font color="red">maxsize="20"</font>/&gt;
		</td>
		<td>
			checkValidation 또는 getValidation 함수에서 검사할 max byte를 설정한다.<br>
			=> checkValidation 또는 getValidation 함수에서 사용된다.(ucare_format.js 참조)<br>
		</td>
	</tr>
	<tr>
		<td class=MANTDM>width</td>
		<td class=MANTDM><ucare:input type="text" name="myname" width="80"/></td>
		<td class=MANTDM>
			&lt;ucare:input type="text" name="myname" <font color="red">width="80"</font>/&gt;
		</td>
		<td>
			width를 설정한다.<br>
		</td>
	</tr>
	<tr>
		<td class=MANTDM>styleClass</td>
		<td class=MANTDM><ucare:input type="text" name="myname" styleClass="input_readonly"/></td>
		<td class=MANTDM>
			&lt;ucare:input type="text" name="myname" <font color="red">styleClass="input_readonly"</font>/&gt;
		</td>
		<td>
			class를 설정한다. <br>
			<table border="1">
				<tr>
					<td>styleClass</td>
					<td>required</td>
					<td>readonly</td>
					<td>disable</td>
					<td class=MANTDT>class</td>
				</tr>
				<tr>
					<td>없음</td>
					<td>없음 또는 false</td>
					<td>없음 또는 false</td>
					<td>없음 또는 false</td>
					<td class="input_text">input_text</td>
				</tr>
				<tr>
					<td>없음</td>
					<td>true</td>
					<td>없음 또는 false</td>
					<td>없음 또는 false</td>
					<td class="input_required">input_required</td>
				</tr>
				<tr>
					<td>없음</td>
					<td>없음 또는 false</td>
					<td>true</td>
					<td>없음 또는 false</td>
					<td class="input_readonly">input_readonly</td>
				</tr>
				<tr>
					<td>없음</td>
					<td>없음 또는 false</td>
					<td>없음 또는 false</td>
					<td>true</td>
					<td class="input_readonly">input_readonly</td>
				</tr>
				<tr>
					<td>없음</td>
					<td>true</td>
					<td>없음 또는 false</td>
					<td>true</td>
					<td class="input_readonly">input_readonly</td>
				</tr>
				<tr>
					<td>없음</td>
					<td>true</td>
					<td>true</td>
					<td>true</td>
					<td class="input_readonly">input_readonly</td>
				</tr>
				<tr>
					<td>있음</td>
					<td colspan="3">어떤 값이 오더라도 </td>
					<td>styleClas에 설정한 class</td>
				</tr>
			</table>
		</td>
	</tr>
	<tr>
		<td class=MANTDM>title</td>
		<td class=MANTDM><ucare:input type="text" name="myname" required="true" title="이름"/></td>
		<td class=MANTDM>
			&lt;ucare:input type="text" name="myname" required="true" <font color="red">title="이름"</font>/&gt;
		</td>
		<td>
			title을 설정한다.(풍선말 기능) <br>
			=> checkValidation 또는 getValidation 함수에서 사용된다.(ucare_format.js 참조)<br>
			required가 true인 경우 checkValidation 또는 getValidation 함수 검사에서 걸린 경우 requirednm이 없으면 title로 메시지를 보여준다.<br>
			예) 이름는(은) 필수입력 항목 입니다. 	<br>
		</td>
	</tr>
	<tr>
		<td class=MANTDM>value</td>
		<td class=MANTDM><ucare:input type="text" name="myname" value="홍길동"/></td>
		<td class=MANTDM>
			&lt;ucare:input type="text" name="myname" <font color="red">value="홍길동"</font>/&gt;
		</td>
		<td>
			value를 설정한다.<br>
		</td>
	</tr>
	<tr>
		<td class=MANTDM>readonly</td>
		<td class=MANTDM><ucare:input type="text" name="myname" readonly="true"/></td>
		<td class=MANTDM>
			&lt;ucare:input type="text" name="myname" <font color="red">readonly="true"</font>/&gt;
		</td>
		<td>
			readonly를 설정한다. <br>
			readonly가 true인 경우 input class는 input_readonly로 자동 설정된다.<br>	
		</td>
	</tr>
	<tr>
		<td class=MANTDM>disable</td>
		<td class=MANTDM><ucare:input type="text" name="myname" disable="true"/></td>
		<td class=MANTDM>
			&lt;ucare:input type="text" name="myname" <font color="red">disable="true"</font>/&gt;
		</td>
		<td>
			disabled를 설정한다. <br>
			disable이 true인 경우 input class는 input_readonly로 자동 설정된다.<br>	
		</td>
	</tr>
	<tr>
		<td class=MANTDM>maxlength</td>
		<td class=MANTDM><ucare:input type="text" name="myname" maxlength="10"/></td>
		<td class=MANTDM>
			&lt;ucare:input type="text" name="myname" <font color="red">maxlength="10"</font>/&gt;
		</td>
		<td>
			maxlength를 설정한다.<br>
		</td>
	</tr>
	<tr>
		<td class=MANTDM>onBlur</td>
		<td class=MANTDM><ucare:input type="text" name="myname" title="이름" onBlur="checkMyName(this)"/></td>
		<td class=MANTDM>
			&lt;ucare:input type="text" name="myname" title="이름" <font color="red">onBlur="checkMyName(this)"</font>/&gt;
		</td>
		<td>
			onBlur 함수를 설정한다.<br>
			기본적으로 onBlur를 설정하지 않으면 global.properties에 input_onblur으로 선언된 함수를 자동 설정한다.<br>
			==> 현재 input_onblur에 checkValidation(this, true, false)함수가 선언되어 있다.<br>
			만약 onBlur를 설정하면 설정한 함수에 우선순위가 있다.<br>
		</td>
	</tr>
	<tr>
		<td class=MANTDM>onClick</td>
		<td class=MANTDM><ucare:input type="text" name="myname" title="이름" onClick="checkMyName(this)"/></td>
		<td class=MANTDM>
			&lt;ucare:input type="text" name="myname" title="이름" <font color="red">onClick="checkMyName(this)"</font>/&gt;
		</td>
		<td>
			onClick 함수를 설정한다.<br>
		</td>
	</tr>
	<tr>
		<td class=MANTDM>tabindex</td>
		<td class=MANTDM><ucare:input type="text" name="myname" title="이름" tabIndex="1"/></td>
		<td class=MANTDM>
			&lt;ucare:input type="text" name="myname" title="이름" <font color="red">tabIndex="1"</font>/&gt;
		</td>
		<td>
			tabindex를 설정한다.<br>
		</td>
	</tr>
	<tr>
		<td class=MANTDM>mode</td>
		<td class=MANTDM><ucare:input type="text" name="myname" mode="active"/></td>
		<td class=MANTDM>
			&lt;ucare:input type="text" name="myname" <font color="red">mode="active"</font>/&gt;
		</td>
		<td>
			ime-mode를 설정한다. (active : 한글, inactive : 영문)<br>
		</td>
	</tr>
	<tr>
		<td class=MANTDM>pattern</td>
		<td class=MANTDM><ucare:input type="text" name="myname" format="DATE" pattern="M" value="200905"/></td>
		<td class=MANTDM>
			&lt;ucare:input type="text" name="myname" <font color="red">format="DATE" pattern="M"</font>/&gt;
		</td>
		<td>
			pattern를 설정한다. 날짜 포맷을 줄 때 사용한다. <br>
			(Y : YYYY, M : YYYY-MM, D : YYYY-MM-DD) <br>
			ucare_util.js setCalendar 참조<br>
			
			<table border="1">
				<tr>
					<td>Y</td>
					<td><ucare:input type="text" name="myname" width="70" format="DATE" pattern="Y" value="2009"/></td>
				</tr>
				<tr>
					<td>M</td>
					<td><ucare:input type="text" name="myname" width="70" format="DATE" pattern="M" value="200905"/></td>
				</tr>
				<tr>
					<td>D</td>
					<td><ucare:input type="text" name="myname" width="70" format="DATE" pattern="D" value="20090501"/></td>
				</tr>
				<tr>
					<td>없음</td>
					<td><ucare:input type="text" name="myname" width="70" format="DATE" value="20090501"/></td>
				</tr>
			</table>
		</td>
	</tr>
	<tr>
		<td class=MANTDM>tag</td>
		<td class=MANTDM><ucare:input type="text" name="myname" tag="style='height:30' ondbclick=getMyName()"/></td>
		<td class=MANTDM>
			&lt;ucare:input type="text" name="myname" <font color="red">tag="style='height:30' ondbclick=getMyName()"</font>/&gt;
		</td>
		<td>
			지정된 속성 이외의 속성이 필요할 경우 tag로 지정할 수 있다.<br>
		</td>
	</tr>
	
	<!-- checkbox -->
	<tr>
		<td class=MANTDT width=100 rowspan="15">checkbox</td>
		<td class=MANTDM width=100>type</td>
		<td class=MANTDM width=120><ucare:input type="checkbox"/></td>
		<td class=MANTDM>
			&lt;ucare:input <font color="red">type="checkbox"</font>/&gt;
		</td>
	</tr>
	<tr>
		<td class=MANTDM>name</td>
		<td class=MANTDM><ucare:input type="checkbox" name="mycheck"/></td>
		<td class=MANTDM>
			&lt;ucare:input type="checkbox" <font color="red">name="mycheck"</font>/&gt;
		</td>
	</tr>
	<tr>
		<td class=MANTDM>required</td>
		<td class=MANTDM><ucare:input type="checkbox" name="mycheck" required="true"/></td>
		<td class=MANTDM>
			&lt;ucare:input type="checkbox" name="mycheck" <font color="red">required="true"</font>/&gt;
		</td><td>
			required를 설정한다. <br>
			=> checkValidation 또는 getValidation 함수에서 사용된다.(ucare_format.js 참조)<br>
			required가 없거나 false인 경우 input의 class는 input_checkbox로 자동 설정된다.<br>
			required가 true인 경우 input이 class는 input_checkbox_required로 자동 설정된다.<br>	
		</td>
	</tr>
	<tr>
		<td class=MANTDM>requirednm</td>
		<td class=MANTDM><ucare:input type="checkbox" name="myname" required="true" requirednm="이름"/></td>
		<td class=MANTDM>
			&lt;ucare:input type="checkbox" name="myname" required="true" <font color="red">requirednm="이름"</font>/&gt;
		</td>
		<td>
			requirednm을 설정한다. <br>
			=> checkValidation 또는 getValidation 함수에서 사용된다.(ucare_format.js 참조)<br>
			required가 true인 경우 checkValidation 또는 getValidation 함수 검사에서 걸린 경우 requirednm으로 메시지를 보여준다.<br>
			예) 이름는(은) 필수입력 항목 입니다. 	<br>
		</td>
	</tr>
	<tr>
		<td class=MANTDM>styleClass</td>
		<td class=MANTDM><ucare:input type="checkbox" name="myname" styleClass="input_readonly"/></td>
		<td class=MANTDM>
			&lt;ucare:input type="checkbox" name="myname" <font color="red">styleClass="input_readonly"</font>/&gt;
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
					<td class="input_checkbox">input_checkbox</td>
				</tr>
				<tr>
					<td>없음</td>
					<td>true</td>
					<td>없음 또는 false</td>
					<td class="input_checkbox_required">input_checkbox_required</td>
				</tr>
				<tr>
					<td>없음</td>
					<td>없음 또는 false</td>
					<td>true</td>
					<td class="input_checkbox_disabled">input_checkbox_disabled</td>
				</tr>
				<tr>
					<td>없음</td>
					<td>true</td>
					<td>true</td>
					<td class="input_checkbox_disabled">input_checkbox_disabled</td>
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
		<td class=MANTDM>title</td>
		<td class=MANTDM><ucare:input type="checkbox" name="myname" required="true" title="이름"/></td>
		<td class=MANTDM>
			&lt;ucare:input type="checkbox" name="myname" required="true" <font color="red">title="이름"</font>/&gt;
		</td>
		<td>
			title을 설정한다.(풍선말 기능) <br>
			=> checkValidation 또는 getValidation 함수에서 사용된다.(ucare_format.js 참조)<br>
			required가 true인 경우 checkValidation 또는 getValidation 함수 검사에서 걸린 경우 requirednm이 없으면 title로 메시지를 보여준다.<br>
			예) 이름는(은) 필수입력 항목 입니다. 	<br>
		</td>
	</tr>
	<tr>
		<td class=MANTDM>value</td>
		<td class=MANTDM><ucare:input type="checkbox" name="myname" value="홍길동"/></td>
		<td class=MANTDM>
			&lt;ucare:input type="checkbox" name="myname" <font color="red">value="홍길동"</font>/&gt;
		</td>
		<td>
			value를 설정한다.<br>
		</td>
	</tr>
	<tr>
		<td class=MANTDM>disable</td>
		<td class=MANTDM><ucare:input type="checkbox" name="myname" disable="true"/></td>
		<td class=MANTDM>
			&lt;ucare:input type="checkbox" name="myname" <font color="red">disable="true"</font>/&gt;
		</td>
		<td>
			disabled를 설정한다. <br>
			disable이 true인 경우 input class는 input_checkbox_disable로 자동 설정된다.<br>	
		</td>
	</tr>
	<tr>
		<td class=MANTDM>onClick</td>
		<td class=MANTDM><ucare:input type="checkbox" name="myname" title="이름" onClick="checkMyName(this)"/></td>
		<td class=MANTDM>
			&lt;ucare:input type="checkbox" name="myname" title="이름" <font color="red">onClick="checkMyName(this)"</font>/&gt;
		</td>
		<td>
			onClick 함수를 설정한다.<br>
		</td>
	</tr>
	<tr>
		<td class=MANTDM>tabindex</td>
		<td class=MANTDM><ucare:input type="checkbox" name="myname" title="이름" tabIndex="1"/></td>
		<td class=MANTDM>
			&lt;ucare:input type="checkbox" name="myname" title="이름" <font color="red">tabIndex="1"</font>/&gt;
		</td>
		<td>
			tabindex를 설정한다.<br>
		</td>
	</tr>
	<tr>
		<td class=MANTDM>tag</td>
		<td class=MANTDM><ucare:input type="checkbox" name="myname" tag="style=color:blue;BACKGROUND-COLOR:#aff"/></td>
		<td class=MANTDM>
			&lt;ucare:input type="checkbox" name="myname" <font color="red">tag="style=color:blue;BACKGROUND-COLOR:#aff"</font>/&gt;
		</td>
		<td>
			지정된 속성 이외의 속성이 필요할 경우 tag로 지정할 수 있다.<br>
		</td>
	</tr>
	<tr>
		<td class=MANTDM>checked</td>
		<td class=MANTDM><ucare:input type="checkbox" name="myCheck" checked="true"/></td>
		<td class=MANTDM>
			&lt;ucare:input type="checkbox" name="myCheck" <font color="red">checked="true"</font>/&gt;
		</td>
		<td>
			checked를 설정한다.<br>
		</td>
	</tr>
	<tr>
		<td class=MANTDM>checkcode</td>
		<td class=MANTDM><ucare:input type="checkbox" name="myCheck2" value="1" checkcode="1"/></td>
		<td class=MANTDM>
			&lt;ucare:input type="checkbox" name="myCheck2" value="1" <font color="red">checkcode="1"</font>/&gt;
		</td>
		<td>
			value와 값이 같으면 checked=true로 설정한다.<br>		
		</td>
	</tr>
	<tr>
		<td class=MANTDM>코드북 읽어오기</td>
		<td class=MANTDM><ucare:input type="checkbox" name="useyn" brcode="USEYN" code="code" codename="codenm" checkcode="N" option="10"/></td>
		<td class=MANTDM>
			&lt;ucare:input type="checkbox" name="useyn" <font color="red">brcode="USEYN" code="code" codename="etc1" option="10"</font> checkcode="N"/&gt;
		</td>
		<td>
			콤복박스와 같이 코드북에서 읽어와 checkbox를 만들어준다.<br>
		</td>
	</tr>
	<tr>
		<td class=MANTDM>쿼리ID 주기</td>
		<td class=MANTDM><ucare:input type="checkbox" name="useyn2" queryid="smpradio" code="code" codename="codenm" checkcode="AC" option="-1"/></td>
		<td class=MANTDM>
			&lt;ucare:input type="checkbox" name="useyn2" <font color="red">queryid="smpradio" code="code" codename="codenm" option="-1"</font> checkcode="AC"/&gt;
		</td>
		<td>
			쿼리ID로 읽어와 checkbox를 만들어준다.<br>
		</td>
	</tr>
	
	<!-- radio -->
	<tr>
		<td class=MANTDT width=100 rowspan="15">radio</td>
		<td class=MANTDM width=100>type</td>
		<td class=MANTDM width=120><ucare:input type="radio"/></td>
		<td class=MANTDM>
			&lt;ucare:input <font color="red">type="radio"/&gt;
		</td>
		<td>&nbsp;</td>
	</tr>
	<tr>
		<td class=MANTDM>name</td>
		<td class=MANTDM><ucare:input type="radio" name="myradio"/></td>
		<td class=MANTDM>
			&lt;ucare:input type="radio" <font color="red">name="myradio"</font>/&gt;
		</td>
		<td>&nbsp;</td>
	</tr>
	<tr>
		<td class=MANTDM>required</td>
		<td class=MANTDM><ucare:input type="radio" name="myradio" required="true"/></td>
		<td class=MANTDM>
			&lt;ucare:input type="radio" name="myradio" <font color="red">required="true"</font>/&gt;
		</td>
		<td>
			required를 설정한다. <br>
			=> checkValidation 또는 getValidation 함수에서 사용된다.(ucare_format.js 참조)<br>
			required가 없거나 false인 경우 input의 class는 input_text로 자동 설정된다.<br>
			required가 true인 경우 input이 class는 input_required로 자동 설정된다.<br>	
		</td>
	</tr>
	<tr>
		<td class=MANTDM>requirednm</td>
		<td class=MANTDM><ucare:input type="radio" name="myname" required="true" requirednm="이름"/></td>
		<td class=MANTDM>
			&lt;ucare:input type="radio" name="myname" required="true" <font color="red">requirednm="이름"</font>/&gt;
		</td>
		<td>
			requirednm을 설정한다. <br>
			=> checkValidation 또는 getValidation 함수에서 사용된다.(ucare_format.js 참조)<br>
			checkValidation 또는 getValidation 함수 검사에서 걸린 경우 requirednm으로 메시지를 보여준다.<br>
			예) 이름는(은) 필수입력 항목 입니다. 	<br>
		</td>
	</tr>
	<tr>
		<td class=MANTDM>styleClass</td>
		<td class=MANTDM><ucare:input type="radio" name="myname" styleClass="input_readonly"/></td>
		<td class=MANTDM>
			&lt;ucare:input type="radio" name="myname" <font color="red">styleClass="input_readonly"</font>/&gt;
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
					<td class="input_radio">input_radio</td>
				</tr>
				<tr>
					<td>없음</td>
					<td>true</td>
					<td>없음 또는 false</td>
					<td class="input_radio_required">input_radio_required</td>
				</tr>
				<tr>
					<td>없음</td>
					<td>없음 또는 false</td>
					<td>true</td>
					<td class="input_radio_disabled">input_radio_disabled</td>
				</tr>
				<tr>
					<td>없음</td>
					<td>true</td>
					<td>true</td>
					<td class="input_radio_disabled">input_radio_disabled</td>
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
		<td class=MANTDM>title</td>
		<td class=MANTDM><ucare:input type="radio" name="myname" required="true" title="이름"/></td>
		<td class=MANTDM>
			&lt;ucare:input type="radio" name="myname" required="true" <font color="red">title="이름"</font>/&gt;
		</td>
		<td>
			title을 설정한다.(풍선말 기능) <br>
			=> checkValidation 또는 getValidation 함수에서 사용된다.(ucare_format.js 참조)<br>
			required가 true인 경우 checkValidation 또는 getValidation 함수 검사에서 걸린 경우 requirednm이 없으면 title로 메시지를 보여준다.<br>
			예) 이름는(은) 필수입력 항목 입니다. 	<br>
		</td>
	</tr>
	<tr>
		<td class=MANTDM>value</td>
		<td class=MANTDM><ucare:input type="radio" name="myname" value="홍길동"/></td>
		<td class=MANTDM>
			&lt;ucare:input type="radio" name="myname" <font color="red">value="홍길동"</font>/&gt;
		</td>
		<td>
			value를 설정한다.<br>
		</td>
	</tr>
	<tr>
		<td class=MANTDM>disable</td>
		<td class=MANTDM><ucare:input type="radio" name="myname" disable="true"/></td>
		<td class=MANTDM>
			&lt;ucare:input type="radio" name="myname" <font color="red">disable="true"</font>/&gt;
		</td>
		<td>
			disabled를 설정한다. <br>
			disable이 true인 경우 input class는 input_readonly로 자동 설정된다.<br>	
		</td>
	</tr>
	<tr>
		<td class=MANTDM>onClick</td>
		<td class=MANTDM><ucare:input type="radio" name="myname" title="이름" onClick="checkMyName(this)"/></td>
		<td class=MANTDM>
			&lt;ucare:input type="radio" name="myname" title="이름" <font color="red">onClick="checkMyName(this)"</font>/&gt;
		</td>
		<td>
			onClick 함수를 설정한다.<br>
		</td>
	</tr>
	<tr>
		<td class=MANTDM>tabindex</td>
		<td class=MANTDM><ucare:input type="radio" name="myname" title="이름" tabIndex="1"/></td>
		<td class=MANTDM>
			&lt;ucare:input type="radio" name="myname" title="이름" <font color="red">tabIndex="1"</font>/&gt;
		</td>
		<td>
			tabindex를 설정한다.<br>
		</td>
	</tr>
	<tr>
		<td class=MANTDM>tag</td>
		<td class=MANTDM><ucare:input type="radio" name="myname" tag="style=color:blue;BACKGROUND-COLOR:#aff"/></td>
		<td class=MANTDM>
			&lt;ucare:input type="radio" name="myname" <font color="red">tag="style=color:blue;BACKGROUND-COLOR:#aff"</font>/&gt;
		</td>
		<td>
			지정된 속성 이외의 속성이 필요할 경우 tag로 지정할 수 있다.<br>
		</td>
	</tr>
	<tr>
		<td class=MANTDM>checked</td>
		<td class=MANTDM><ucare:input type="radio" name="myRadio" checked="true"/></td>
		<td class=MANTDM>
			&lt;ucare:input type="radio" name="myRadio" <font color="red">checked="true"</font>/&gt;
		</td>
		<td>
			checked를 설정한다.<br>
		</td>
	</tr>
	<tr>
		<td class=MANTDM>checkcode</td>
		<td class=MANTDM><ucare:input type="radio" name="myname" value="1" checkcode="1"/></td>
		<td class=MANTDM>
			&lt;ucare:input type="radio" name="myname" value="1" <font color="red">checkcode="1"</font>/&gt;
		</td>
		<td>
			value와 값이 같으면 checked=true로 설정한다.<br>
			추후 codebook에서 코드를 읽어와 checkbox를 만들어주는 로직을 추가할 예정임.<br>
		</td>
	</tr>
	<tr>
		<td class=MANTDM>코드북 읽어오기</td>
		<td class=MANTDM><ucare:input type="radio" name="rdoUseyn" brcode="USEYN" checkcode="N" option="10"/></td>
		<td class=MANTDM>
			&lt;ucare:input type="radio" name="useyn" <font color="red">brcode="USEYN" option="10"</font> checkcode="N"/&gt;
		</td>
		<td>
			콤복박스와 같이 코드북에서 읽어와 radio를 만들어준다.<br>
		</td>
	</tr>
	<tr>
		<td class=MANTDM>쿼리ID 주기</td>
		<td class=MANTDM><ucare:input type="radio" name="rdoCntrcd" queryid="smpradio" code="code" codename="codenm" checkcode="AC" option="-1"/></td>
		<td class=MANTDM>
			&lt;ucare:input type="radio" name="rdoCntrcd" <font color="red">queryid="smpradio" code="code" codename="codenm" option="-1"</font> checkcode="AC"/&gt;
		</td>
		<td>
			콤복박스와 같이 쿼리ID로 읽어와 radio를 만들어준다.<br>
		</td>
	</tr>
</ucare:table>

</form>
</body>
</html>
