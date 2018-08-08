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
			input type ���� (<b>text, checkbox, radio, hidden</b>)���� ������ �� �ִ�.
		</td>
	</tr>
	<tr>
		<td class=MANTDM>name</td>
		<td class=MANTDM><ucare:input type="text" name="myname"/></td>
		<td class=MANTDM>
			&lt;ucare:input type="text" <font color="red">name="myname"</font>/&gt;
		</td>
		<td>name ����</td>
	</tr>
	<tr>
		<td class=MANTDM>required</td>
		<td class=MANTDM><ucare:input type="text" name="myname" required="true"/></td>
		<td class=MANTDM>
			&lt;ucare:input type="text" name="myname" <font color="red">required="true"</font>/&gt;
		</td>
		<td>
			required�� �����Ѵ�. <br>
			=> checkValidation �Ǵ� getValidation �Լ����� ���ȴ�.(ucare_format.js ����)<br>
			required�� ���ų� false�� ��� input�� class�� input_text�� �ڵ� �����ȴ�.<br>
			required�� true�� ��� input�� class�� input_required�� �ڵ� �����ȴ�.<br>	
		</td>
	</tr>
	<tr>
		<td class=MANTDM>requirednm</td>
		<td class=MANTDM><ucare:input type="text" name="myname" required="true" requirednm="�̸�"/></td>
		<td class=MANTDM>
			&lt;ucare:input type="text" name="myname" required="true" <font color="red">requirednm="�̸�"</font>/&gt;
		</td>
		<td>
			requirednm�� �����Ѵ�. <br>
			=> checkValidation �Ǵ� getValidation �Լ����� ���ȴ�.(ucare_format.js ����)<br>
			required�� true�� ��� checkValidation �Ǵ� getValidation �Լ� �˻翡�� �ɸ� ��� requirednm���� �޽����� �����ش�.<br>
			��) �̸���(��) �ʼ��Է� �׸� �Դϴ�. 	<br>
		</td>
	</tr>
	<tr>
		<td class=MANTDM>format</td>
		<td class=MANTDM><ucare:input type="text" name="startdt" required="true" format="DATE"/></td>
		<td class=MANTDM>
			&lt;ucare:input type="text" name="startdt" required="true" <font color="red">format="DATE"</font>/&gt;
		</td>
		<td>
			checkValidation �Ǵ� getValidation �Լ����� �˻��� foramt�� �����Ѵ�.<br>
			=> checkValidation �Ǵ� getValidation �Լ����� ���ȴ�.(ucare_format.js ����)<br>
			<b>MONEY : �ݾ�, NUMBER : ����, DATE : ��¥, TIME : �ð� FLOAT : float</b><br>
		</td>
	</tr>
	<tr>
		<td class=MANTDM>maxsize</td>
		<td class=MANTDM><ucare:input type="text" name="myname" required="true" maxsize="20"/></td>
		<td class=MANTDM>
			&lt;ucare:input type="text" name="myname" required="true" <font color="red">maxsize="20"</font>/&gt;
		</td>
		<td>
			checkValidation �Ǵ� getValidation �Լ����� �˻��� max byte�� �����Ѵ�.<br>
			=> checkValidation �Ǵ� getValidation �Լ����� ���ȴ�.(ucare_format.js ����)<br>
		</td>
	</tr>
	<tr>
		<td class=MANTDM>width</td>
		<td class=MANTDM><ucare:input type="text" name="myname" width="80"/></td>
		<td class=MANTDM>
			&lt;ucare:input type="text" name="myname" <font color="red">width="80"</font>/&gt;
		</td>
		<td>
			width�� �����Ѵ�.<br>
		</td>
	</tr>
	<tr>
		<td class=MANTDM>styleClass</td>
		<td class=MANTDM><ucare:input type="text" name="myname" styleClass="input_readonly"/></td>
		<td class=MANTDM>
			&lt;ucare:input type="text" name="myname" <font color="red">styleClass="input_readonly"</font>/&gt;
		</td>
		<td>
			class�� �����Ѵ�. <br>
			<table border="1">
				<tr>
					<td>styleClass</td>
					<td>required</td>
					<td>readonly</td>
					<td>disable</td>
					<td class=MANTDT>class</td>
				</tr>
				<tr>
					<td>����</td>
					<td>���� �Ǵ� false</td>
					<td>���� �Ǵ� false</td>
					<td>���� �Ǵ� false</td>
					<td class="input_text">input_text</td>
				</tr>
				<tr>
					<td>����</td>
					<td>true</td>
					<td>���� �Ǵ� false</td>
					<td>���� �Ǵ� false</td>
					<td class="input_required">input_required</td>
				</tr>
				<tr>
					<td>����</td>
					<td>���� �Ǵ� false</td>
					<td>true</td>
					<td>���� �Ǵ� false</td>
					<td class="input_readonly">input_readonly</td>
				</tr>
				<tr>
					<td>����</td>
					<td>���� �Ǵ� false</td>
					<td>���� �Ǵ� false</td>
					<td>true</td>
					<td class="input_readonly">input_readonly</td>
				</tr>
				<tr>
					<td>����</td>
					<td>true</td>
					<td>���� �Ǵ� false</td>
					<td>true</td>
					<td class="input_readonly">input_readonly</td>
				</tr>
				<tr>
					<td>����</td>
					<td>true</td>
					<td>true</td>
					<td>true</td>
					<td class="input_readonly">input_readonly</td>
				</tr>
				<tr>
					<td>����</td>
					<td colspan="3">� ���� ������ </td>
					<td>styleClas�� ������ class</td>
				</tr>
			</table>
		</td>
	</tr>
	<tr>
		<td class=MANTDM>title</td>
		<td class=MANTDM><ucare:input type="text" name="myname" required="true" title="�̸�"/></td>
		<td class=MANTDM>
			&lt;ucare:input type="text" name="myname" required="true" <font color="red">title="�̸�"</font>/&gt;
		</td>
		<td>
			title�� �����Ѵ�.(ǳ���� ���) <br>
			=> checkValidation �Ǵ� getValidation �Լ����� ���ȴ�.(ucare_format.js ����)<br>
			required�� true�� ��� checkValidation �Ǵ� getValidation �Լ� �˻翡�� �ɸ� ��� requirednm�� ������ title�� �޽����� �����ش�.<br>
			��) �̸���(��) �ʼ��Է� �׸� �Դϴ�. 	<br>
		</td>
	</tr>
	<tr>
		<td class=MANTDM>value</td>
		<td class=MANTDM><ucare:input type="text" name="myname" value="ȫ�浿"/></td>
		<td class=MANTDM>
			&lt;ucare:input type="text" name="myname" <font color="red">value="ȫ�浿"</font>/&gt;
		</td>
		<td>
			value�� �����Ѵ�.<br>
		</td>
	</tr>
	<tr>
		<td class=MANTDM>readonly</td>
		<td class=MANTDM><ucare:input type="text" name="myname" readonly="true"/></td>
		<td class=MANTDM>
			&lt;ucare:input type="text" name="myname" <font color="red">readonly="true"</font>/&gt;
		</td>
		<td>
			readonly�� �����Ѵ�. <br>
			readonly�� true�� ��� input class�� input_readonly�� �ڵ� �����ȴ�.<br>	
		</td>
	</tr>
	<tr>
		<td class=MANTDM>disable</td>
		<td class=MANTDM><ucare:input type="text" name="myname" disable="true"/></td>
		<td class=MANTDM>
			&lt;ucare:input type="text" name="myname" <font color="red">disable="true"</font>/&gt;
		</td>
		<td>
			disabled�� �����Ѵ�. <br>
			disable�� true�� ��� input class�� input_readonly�� �ڵ� �����ȴ�.<br>	
		</td>
	</tr>
	<tr>
		<td class=MANTDM>maxlength</td>
		<td class=MANTDM><ucare:input type="text" name="myname" maxlength="10"/></td>
		<td class=MANTDM>
			&lt;ucare:input type="text" name="myname" <font color="red">maxlength="10"</font>/&gt;
		</td>
		<td>
			maxlength�� �����Ѵ�.<br>
		</td>
	</tr>
	<tr>
		<td class=MANTDM>onBlur</td>
		<td class=MANTDM><ucare:input type="text" name="myname" title="�̸�" onBlur="checkMyName(this)"/></td>
		<td class=MANTDM>
			&lt;ucare:input type="text" name="myname" title="�̸�" <font color="red">onBlur="checkMyName(this)"</font>/&gt;
		</td>
		<td>
			onBlur �Լ��� �����Ѵ�.<br>
			�⺻������ onBlur�� �������� ������ global.properties�� input_onblur���� ����� �Լ��� �ڵ� �����Ѵ�.<br>
			==> ���� input_onblur�� checkValidation(this, true, false)�Լ��� ����Ǿ� �ִ�.<br>
			���� onBlur�� �����ϸ� ������ �Լ��� �켱������ �ִ�.<br>
		</td>
	</tr>
	<tr>
		<td class=MANTDM>onClick</td>
		<td class=MANTDM><ucare:input type="text" name="myname" title="�̸�" onClick="checkMyName(this)"/></td>
		<td class=MANTDM>
			&lt;ucare:input type="text" name="myname" title="�̸�" <font color="red">onClick="checkMyName(this)"</font>/&gt;
		</td>
		<td>
			onClick �Լ��� �����Ѵ�.<br>
		</td>
	</tr>
	<tr>
		<td class=MANTDM>tabindex</td>
		<td class=MANTDM><ucare:input type="text" name="myname" title="�̸�" tabIndex="1"/></td>
		<td class=MANTDM>
			&lt;ucare:input type="text" name="myname" title="�̸�" <font color="red">tabIndex="1"</font>/&gt;
		</td>
		<td>
			tabindex�� �����Ѵ�.<br>
		</td>
	</tr>
	<tr>
		<td class=MANTDM>mode</td>
		<td class=MANTDM><ucare:input type="text" name="myname" mode="active"/></td>
		<td class=MANTDM>
			&lt;ucare:input type="text" name="myname" <font color="red">mode="active"</font>/&gt;
		</td>
		<td>
			ime-mode�� �����Ѵ�. (active : �ѱ�, inactive : ����)<br>
		</td>
	</tr>
	<tr>
		<td class=MANTDM>pattern</td>
		<td class=MANTDM><ucare:input type="text" name="myname" format="DATE" pattern="M" value="200905"/></td>
		<td class=MANTDM>
			&lt;ucare:input type="text" name="myname" <font color="red">format="DATE" pattern="M"</font>/&gt;
		</td>
		<td>
			pattern�� �����Ѵ�. ��¥ ������ �� �� ����Ѵ�. <br>
			(Y : YYYY, M : YYYY-MM, D : YYYY-MM-DD) <br>
			ucare_util.js setCalendar ����<br>
			
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
					<td>����</td>
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
			������ �Ӽ� �̿��� �Ӽ��� �ʿ��� ��� tag�� ������ �� �ִ�.<br>
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
			required�� �����Ѵ�. <br>
			=> checkValidation �Ǵ� getValidation �Լ����� ���ȴ�.(ucare_format.js ����)<br>
			required�� ���ų� false�� ��� input�� class�� input_checkbox�� �ڵ� �����ȴ�.<br>
			required�� true�� ��� input�� class�� input_checkbox_required�� �ڵ� �����ȴ�.<br>	
		</td>
	</tr>
	<tr>
		<td class=MANTDM>requirednm</td>
		<td class=MANTDM><ucare:input type="checkbox" name="myname" required="true" requirednm="�̸�"/></td>
		<td class=MANTDM>
			&lt;ucare:input type="checkbox" name="myname" required="true" <font color="red">requirednm="�̸�"</font>/&gt;
		</td>
		<td>
			requirednm�� �����Ѵ�. <br>
			=> checkValidation �Ǵ� getValidation �Լ����� ���ȴ�.(ucare_format.js ����)<br>
			required�� true�� ��� checkValidation �Ǵ� getValidation �Լ� �˻翡�� �ɸ� ��� requirednm���� �޽����� �����ش�.<br>
			��) �̸���(��) �ʼ��Է� �׸� �Դϴ�. 	<br>
		</td>
	</tr>
	<tr>
		<td class=MANTDM>styleClass</td>
		<td class=MANTDM><ucare:input type="checkbox" name="myname" styleClass="input_readonly"/></td>
		<td class=MANTDM>
			&lt;ucare:input type="checkbox" name="myname" <font color="red">styleClass="input_readonly"</font>/&gt;
		</td>
		<td>
			class�� �����Ѵ�. <br>
			<table border="1">
				<tr>
					<td>styleClass</td>
					<td>required</td>
					<td>disable</td>
					<td class=MANTDT>class</td>
				</tr>
				<tr>
					<td>����</td>
					<td>���� �Ǵ� false</td>
					<td>���� �Ǵ� false</td>
					<td class="input_checkbox">input_checkbox</td>
				</tr>
				<tr>
					<td>����</td>
					<td>true</td>
					<td>���� �Ǵ� false</td>
					<td class="input_checkbox_required">input_checkbox_required</td>
				</tr>
				<tr>
					<td>����</td>
					<td>���� �Ǵ� false</td>
					<td>true</td>
					<td class="input_checkbox_disabled">input_checkbox_disabled</td>
				</tr>
				<tr>
					<td>����</td>
					<td>true</td>
					<td>true</td>
					<td class="input_checkbox_disabled">input_checkbox_disabled</td>
				</tr>
				<tr>
					<td>����</td>
					<td colspan="2">� ���� ������ </td>
					<td>styleClas�� ������ class</td>
				</tr>
			</table>
		</td>
	</tr>
	<tr>
		<td class=MANTDM>title</td>
		<td class=MANTDM><ucare:input type="checkbox" name="myname" required="true" title="�̸�"/></td>
		<td class=MANTDM>
			&lt;ucare:input type="checkbox" name="myname" required="true" <font color="red">title="�̸�"</font>/&gt;
		</td>
		<td>
			title�� �����Ѵ�.(ǳ���� ���) <br>
			=> checkValidation �Ǵ� getValidation �Լ����� ���ȴ�.(ucare_format.js ����)<br>
			required�� true�� ��� checkValidation �Ǵ� getValidation �Լ� �˻翡�� �ɸ� ��� requirednm�� ������ title�� �޽����� �����ش�.<br>
			��) �̸���(��) �ʼ��Է� �׸� �Դϴ�. 	<br>
		</td>
	</tr>
	<tr>
		<td class=MANTDM>value</td>
		<td class=MANTDM><ucare:input type="checkbox" name="myname" value="ȫ�浿"/></td>
		<td class=MANTDM>
			&lt;ucare:input type="checkbox" name="myname" <font color="red">value="ȫ�浿"</font>/&gt;
		</td>
		<td>
			value�� �����Ѵ�.<br>
		</td>
	</tr>
	<tr>
		<td class=MANTDM>disable</td>
		<td class=MANTDM><ucare:input type="checkbox" name="myname" disable="true"/></td>
		<td class=MANTDM>
			&lt;ucare:input type="checkbox" name="myname" <font color="red">disable="true"</font>/&gt;
		</td>
		<td>
			disabled�� �����Ѵ�. <br>
			disable�� true�� ��� input class�� input_checkbox_disable�� �ڵ� �����ȴ�.<br>	
		</td>
	</tr>
	<tr>
		<td class=MANTDM>onClick</td>
		<td class=MANTDM><ucare:input type="checkbox" name="myname" title="�̸�" onClick="checkMyName(this)"/></td>
		<td class=MANTDM>
			&lt;ucare:input type="checkbox" name="myname" title="�̸�" <font color="red">onClick="checkMyName(this)"</font>/&gt;
		</td>
		<td>
			onClick �Լ��� �����Ѵ�.<br>
		</td>
	</tr>
	<tr>
		<td class=MANTDM>tabindex</td>
		<td class=MANTDM><ucare:input type="checkbox" name="myname" title="�̸�" tabIndex="1"/></td>
		<td class=MANTDM>
			&lt;ucare:input type="checkbox" name="myname" title="�̸�" <font color="red">tabIndex="1"</font>/&gt;
		</td>
		<td>
			tabindex�� �����Ѵ�.<br>
		</td>
	</tr>
	<tr>
		<td class=MANTDM>tag</td>
		<td class=MANTDM><ucare:input type="checkbox" name="myname" tag="style=color:blue;BACKGROUND-COLOR:#aff"/></td>
		<td class=MANTDM>
			&lt;ucare:input type="checkbox" name="myname" <font color="red">tag="style=color:blue;BACKGROUND-COLOR:#aff"</font>/&gt;
		</td>
		<td>
			������ �Ӽ� �̿��� �Ӽ��� �ʿ��� ��� tag�� ������ �� �ִ�.<br>
		</td>
	</tr>
	<tr>
		<td class=MANTDM>checked</td>
		<td class=MANTDM><ucare:input type="checkbox" name="myCheck" checked="true"/></td>
		<td class=MANTDM>
			&lt;ucare:input type="checkbox" name="myCheck" <font color="red">checked="true"</font>/&gt;
		</td>
		<td>
			checked�� �����Ѵ�.<br>
		</td>
	</tr>
	<tr>
		<td class=MANTDM>checkcode</td>
		<td class=MANTDM><ucare:input type="checkbox" name="myCheck2" value="1" checkcode="1"/></td>
		<td class=MANTDM>
			&lt;ucare:input type="checkbox" name="myCheck2" value="1" <font color="red">checkcode="1"</font>/&gt;
		</td>
		<td>
			value�� ���� ������ checked=true�� �����Ѵ�.<br>		
		</td>
	</tr>
	<tr>
		<td class=MANTDM>�ڵ�� �о����</td>
		<td class=MANTDM><ucare:input type="checkbox" name="useyn" brcode="USEYN" code="code" codename="codenm" checkcode="N" option="10"/></td>
		<td class=MANTDM>
			&lt;ucare:input type="checkbox" name="useyn" <font color="red">brcode="USEYN" code="code" codename="etc1" option="10"</font> checkcode="N"/&gt;
		</td>
		<td>
			�޺��ڽ��� ���� �ڵ�Ͽ��� �о�� checkbox�� ������ش�.<br>
		</td>
	</tr>
	<tr>
		<td class=MANTDM>����ID �ֱ�</td>
		<td class=MANTDM><ucare:input type="checkbox" name="useyn2" queryid="smpradio" code="code" codename="codenm" checkcode="AC" option="-1"/></td>
		<td class=MANTDM>
			&lt;ucare:input type="checkbox" name="useyn2" <font color="red">queryid="smpradio" code="code" codename="codenm" option="-1"</font> checkcode="AC"/&gt;
		</td>
		<td>
			����ID�� �о�� checkbox�� ������ش�.<br>
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
			required�� �����Ѵ�. <br>
			=> checkValidation �Ǵ� getValidation �Լ����� ���ȴ�.(ucare_format.js ����)<br>
			required�� ���ų� false�� ��� input�� class�� input_text�� �ڵ� �����ȴ�.<br>
			required�� true�� ��� input�� class�� input_required�� �ڵ� �����ȴ�.<br>	
		</td>
	</tr>
	<tr>
		<td class=MANTDM>requirednm</td>
		<td class=MANTDM><ucare:input type="radio" name="myname" required="true" requirednm="�̸�"/></td>
		<td class=MANTDM>
			&lt;ucare:input type="radio" name="myname" required="true" <font color="red">requirednm="�̸�"</font>/&gt;
		</td>
		<td>
			requirednm�� �����Ѵ�. <br>
			=> checkValidation �Ǵ� getValidation �Լ����� ���ȴ�.(ucare_format.js ����)<br>
			checkValidation �Ǵ� getValidation �Լ� �˻翡�� �ɸ� ��� requirednm���� �޽����� �����ش�.<br>
			��) �̸���(��) �ʼ��Է� �׸� �Դϴ�. 	<br>
		</td>
	</tr>
	<tr>
		<td class=MANTDM>styleClass</td>
		<td class=MANTDM><ucare:input type="radio" name="myname" styleClass="input_readonly"/></td>
		<td class=MANTDM>
			&lt;ucare:input type="radio" name="myname" <font color="red">styleClass="input_readonly"</font>/&gt;
		</td>
		<td>
			class�� �����Ѵ�. <br>
			<table border="1">
				<tr>
					<td>styleClass</td>
					<td>required</td>
					<td>disable</td>
					<td class=MANTDT>class</td>
				</tr>
				<tr>
					<td>����</td>
					<td>���� �Ǵ� false</td>
					<td>���� �Ǵ� false</td>
					<td class="input_radio">input_radio</td>
				</tr>
				<tr>
					<td>����</td>
					<td>true</td>
					<td>���� �Ǵ� false</td>
					<td class="input_radio_required">input_radio_required</td>
				</tr>
				<tr>
					<td>����</td>
					<td>���� �Ǵ� false</td>
					<td>true</td>
					<td class="input_radio_disabled">input_radio_disabled</td>
				</tr>
				<tr>
					<td>����</td>
					<td>true</td>
					<td>true</td>
					<td class="input_radio_disabled">input_radio_disabled</td>
				</tr>
				<tr>
					<td>����</td>
					<td colspan="2">� ���� ������ </td>
					<td>styleClas�� ������ class</td>
				</tr>
			</table>
		</td>
	</tr>
	<tr>
		<td class=MANTDM>title</td>
		<td class=MANTDM><ucare:input type="radio" name="myname" required="true" title="�̸�"/></td>
		<td class=MANTDM>
			&lt;ucare:input type="radio" name="myname" required="true" <font color="red">title="�̸�"</font>/&gt;
		</td>
		<td>
			title�� �����Ѵ�.(ǳ���� ���) <br>
			=> checkValidation �Ǵ� getValidation �Լ����� ���ȴ�.(ucare_format.js ����)<br>
			required�� true�� ��� checkValidation �Ǵ� getValidation �Լ� �˻翡�� �ɸ� ��� requirednm�� ������ title�� �޽����� �����ش�.<br>
			��) �̸���(��) �ʼ��Է� �׸� �Դϴ�. 	<br>
		</td>
	</tr>
	<tr>
		<td class=MANTDM>value</td>
		<td class=MANTDM><ucare:input type="radio" name="myname" value="ȫ�浿"/></td>
		<td class=MANTDM>
			&lt;ucare:input type="radio" name="myname" <font color="red">value="ȫ�浿"</font>/&gt;
		</td>
		<td>
			value�� �����Ѵ�.<br>
		</td>
	</tr>
	<tr>
		<td class=MANTDM>disable</td>
		<td class=MANTDM><ucare:input type="radio" name="myname" disable="true"/></td>
		<td class=MANTDM>
			&lt;ucare:input type="radio" name="myname" <font color="red">disable="true"</font>/&gt;
		</td>
		<td>
			disabled�� �����Ѵ�. <br>
			disable�� true�� ��� input class�� input_readonly�� �ڵ� �����ȴ�.<br>	
		</td>
	</tr>
	<tr>
		<td class=MANTDM>onClick</td>
		<td class=MANTDM><ucare:input type="radio" name="myname" title="�̸�" onClick="checkMyName(this)"/></td>
		<td class=MANTDM>
			&lt;ucare:input type="radio" name="myname" title="�̸�" <font color="red">onClick="checkMyName(this)"</font>/&gt;
		</td>
		<td>
			onClick �Լ��� �����Ѵ�.<br>
		</td>
	</tr>
	<tr>
		<td class=MANTDM>tabindex</td>
		<td class=MANTDM><ucare:input type="radio" name="myname" title="�̸�" tabIndex="1"/></td>
		<td class=MANTDM>
			&lt;ucare:input type="radio" name="myname" title="�̸�" <font color="red">tabIndex="1"</font>/&gt;
		</td>
		<td>
			tabindex�� �����Ѵ�.<br>
		</td>
	</tr>
	<tr>
		<td class=MANTDM>tag</td>
		<td class=MANTDM><ucare:input type="radio" name="myname" tag="style=color:blue;BACKGROUND-COLOR:#aff"/></td>
		<td class=MANTDM>
			&lt;ucare:input type="radio" name="myname" <font color="red">tag="style=color:blue;BACKGROUND-COLOR:#aff"</font>/&gt;
		</td>
		<td>
			������ �Ӽ� �̿��� �Ӽ��� �ʿ��� ��� tag�� ������ �� �ִ�.<br>
		</td>
	</tr>
	<tr>
		<td class=MANTDM>checked</td>
		<td class=MANTDM><ucare:input type="radio" name="myRadio" checked="true"/></td>
		<td class=MANTDM>
			&lt;ucare:input type="radio" name="myRadio" <font color="red">checked="true"</font>/&gt;
		</td>
		<td>
			checked�� �����Ѵ�.<br>
		</td>
	</tr>
	<tr>
		<td class=MANTDM>checkcode</td>
		<td class=MANTDM><ucare:input type="radio" name="myname" value="1" checkcode="1"/></td>
		<td class=MANTDM>
			&lt;ucare:input type="radio" name="myname" value="1" <font color="red">checkcode="1"</font>/&gt;
		</td>
		<td>
			value�� ���� ������ checked=true�� �����Ѵ�.<br>
			���� codebook���� �ڵ带 �о�� checkbox�� ������ִ� ������ �߰��� ������.<br>
		</td>
	</tr>
	<tr>
		<td class=MANTDM>�ڵ�� �о����</td>
		<td class=MANTDM><ucare:input type="radio" name="rdoUseyn" brcode="USEYN" checkcode="N" option="10"/></td>
		<td class=MANTDM>
			&lt;ucare:input type="radio" name="useyn" <font color="red">brcode="USEYN" option="10"</font> checkcode="N"/&gt;
		</td>
		<td>
			�޺��ڽ��� ���� �ڵ�Ͽ��� �о�� radio�� ������ش�.<br>
		</td>
	</tr>
	<tr>
		<td class=MANTDM>����ID �ֱ�</td>
		<td class=MANTDM><ucare:input type="radio" name="rdoCntrcd" queryid="smpradio" code="code" codename="codenm" checkcode="AC" option="-1"/></td>
		<td class=MANTDM>
			&lt;ucare:input type="radio" name="rdoCntrcd" <font color="red">queryid="smpradio" code="code" codename="codenm" option="-1"</font> checkcode="AC"/&gt;
		</td>
		<td>
			�޺��ڽ��� ���� ����ID�� �о�� radio�� ������ش�.<br>
		</td>
	</tr>
</ucare:table>

</form>
</body>
</html>
