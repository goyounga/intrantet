<!--
  PROJ : Intranet
  NAME : smpSelect.jsp
  DESC : Select Tag Sample
  Author : ������ ����
  VER  : 1.0
  Copyright 2009 Nexfron All rights reserved
  ============================================================================================
  								��		��		��		��
  ============================================================================================
  VERSION		DATE		AUTHOR		DESCRIPTION
  ============================================================================================
  1.0		2009.09.08		������		�ּ��߰�
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
			combobox name�� �����Ѵ�. <br>
		</td>
	</tr>
	<tr>
		<td class=MANTDM>brcode</td>
		<td class=MANTDM><ucare:select name="mycombo" brcode="COM002"/></td>
		<td class=MANTDM>
			&lt;ucare:select name="mycombo" <font color="red">brcode="COM002"</font>/&gt;
		</td>
		<td>
			brcode�� combobox�� ����� ���� ���� ��ȸ�� �� �� where���� �� ���ǰ��� ���Ѵ�.<br>
			<b>(common.xml�� COM000001�� ����)</b><br>
			queryid�� ���� ��� ��з��ڵ带 �Է��ϸ� �ǰ� queryid�� �ִٸ� �� ������ �ش��ϴ� ��ȸ���ǰ��� �����ϸ� �ȴ�. <br>
		</td>
	</tr>
	<tr>
		<td class=MANTDM>queryid</td>
		<td class=MANTDM><ucare:select name="mycombo" queryid="samplecombobyquery" brcode="" code="etc1" codename="code_nm"/></td>
		<td class=MANTDM>
			&lt;ucare:select name="mycombo" <font color="red">queryid="samplecombobyquery"</font> brcode="" code="etc1" codename="code_nm"/&gt;
		</td>
		<td>
			���� ������ �ۼ��Ͽ� combobox�� ���� ��쿡 queryid�� �ۼ��� ������ id�� �����Ѵ�.<br>
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
			���� ������ �ۼ��Ͽ� combobox�� ���� ��쿡 value���� �ش��ϴ� �÷��� �����Ѵ�.<br>
		</td>
	</tr>
	<tr>
		<td class=MANTDM>codename</td>
		<td class=MANTDM><ucare:select name="mycombo" queryid="samplecombobyquery" brcode="" code="etc1" codename="codenm"/></td>
		<td class=MANTDM>
			&lt;ucare:select name="mycombo" queryid="samplecombobyquery" brcode="" code="etc1" <font color="red">codename="codenm"</font>/&gt;
		</td>
		<td>
			���� ������ �ۼ��Ͽ� combobox�� ���� ��쿡 text���� �ش��ϴ� �÷��� �����Ѵ�.<br>
		</td>
	</tr>
	<tr>
		<td class=MANTDM>styleClass</td>
		<td class=MANTDM><ucare:select name="mycombo" styleClass="combo_class"/></td>
		<td class=MANTDM>
			&lt;ucare:select name="mycombo" <font color="red">styleClass="combo_class"</font>/&gt;
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
					<td class="combo_text">combo_text</td>
				</tr>
				<tr>
					<td>����</td>
					<td>true</td>
					<td>���� �Ǵ� false</td>
					<td class="combo_required">combo_required</td>
				</tr>
				<tr>
					<td>����</td>
					<td>���� �Ǵ� false</td>
					<td>true</td>
					<td class="combo_disabled">combo_disabled</td>
				</tr>
				<tr>
					<td>����</td>
					<td>true</td>
					<td>true</td>
					<td class="combo_disabled">combo_disabled</td>
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
		<td class=MANTDM>option</td>
		<td class=MANTDM><ucare:select name="mycombo" option="1"/></td>
		<td class=MANTDM>
			&lt;ucare:select name="mycombo" <font color="red">option="1"</font>/&gt;
		</td>
		<td>
			option�� �����Ѵ�. <br>
			<table border="1">
				<tr>
					<td>option</td>
					<td>���</td>
				</tr>
				<tr>
					<td>0</td>
					<td>&lt;option value=""&gt;&lt;/option&gt;</td>
				</tr>
				<tr>
					<td>1</td>
					<td>&lt;option value="00"&gt;��ü&lt;/option&gt;</td>
				</tr>
				<tr>
					<td>2</td>
					<td>&lt;option value="00"&gt;== ���� ==&lt;/option&gt;</td>
				</tr>
				<tr>
					<td>3</td>
					<td>&lt;option value="%"&gt;��ü&lt;/option&gt;</td>
				</tr>
				<tr>
					<td>4</td>
					<td>&lt;option value=""&gt;== ���� ==&lt;/option&gt;</td>
				</tr>
				<tr>
					<td>6</td>
					<td>&lt;option value="0"&gt;== ���� ==&lt;/option&gt;</td>
				</tr>
				<tr>
					<td>10</td>
					<td>&lt;option value=""&gt;��ü&lt;/option&gt;</td>
				</tr>
			</table>
			��ȸ�� ���� �ٷ� ���;� �ϴ� ��� <b>option="-1"</b>�� �����Ѵ�.
		</td>
	</tr>
	<tr>
		<td class=MANTDM>onChange</td>
		<td class=MANTDM><ucare:select name="mycombo" brcode="COM002" onChange="getSelectedText(this)"/></td>
		<td class=MANTDM>
			&lt;ucare:select name="mycombo" brcode="COM002" <font color="red">onChange="getSelectedText(this)"</font>/&gt;
		</td>
		<td>
			onChange �̺�Ʈ�� �Լ��� �����Ѵ�. <br>
		</td>
	</tr>
	<tr>
		<td class=MANTDM>onClick</td>
		<td class=MANTDM><ucare:select name="mycombo" brcode="COM002" onClick="getSelectedText(this)"/></td>
		<td class=MANTDM>
			&lt;ucare:select name="mycombo" brcode="COM002" <font color="red">onClick="getSelectedText(this)"</font>/&gt;
		</td>
		<td>
			onClick �̺�Ʈ�� �Լ��� �����Ѵ�. <br>
		</td>
	</tr>
	<tr>
		<td class=MANTDM>onDblClick</td>
		<td class=MANTDM><ucare:select name="mycombo" brcode="COM002" height="3" onDblClick="getSelectedText(this)"/></td>
		<td class=MANTDM>
			&lt;ucare:select name="mycombo" brcode="COM002" <font color="red">onDblClick="getSelectedText(this)"</font>/&gt;
		</td>
		<td>
			onDblClick �̺�Ʈ�� �Լ��� �����Ѵ�. <br>
		</td>
	</tr>
	<tr>
		<td class=MANTDM>width</td>
		<td class=MANTDM><ucare:select name="mycombo" width="120"/></td>
		<td class=MANTDM>
			&lt;ucare:select name="mycombo" <font color="red">width="120"</font>/&gt;
		</td>
		<td>
			width�� �����Ѵ�. <br>
		</td>
	</tr>
	<tr>
		<td class=MANTDM>height</td>
		<td class=MANTDM><ucare:select name="mycombo" height="5"/></td>
		<td class=MANTDM>
			&lt;ucare:select name="mycombo" <font color="red">height="5"</font>/&gt;
		</td>
		<td>
			size�� �����Ѵ�. <br>
		</td>
	</tr>
	<tr>
		<td class=MANTDM>multiple</td>
		<td class=MANTDM><ucare:select name="mycombo" brcode="COM003" height="5" multiple="true"/></td>
		<td class=MANTDM>
			&lt;ucare:select name="mycombo" brcode="COM003" height="5" <font color="red">multiple="true"</font>/&gt;
		</td>
		<td>
			multiple�� �����Ѵ�.(���� ����) <br>
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
			�⺻���� ������ �ڵ带 �����Ѵ�.
		</td>
	</tr>
	<tr>
		<td class=MANTDM>required</td>
		<td class=MANTDM><ucare:select name="mycombo" required="true"/></td>
		<td class=MANTDM>
			&lt;ucare:select name="mycombo" <font color="red">required="true"</font>/&gt;
		</td>
		<td>
			required�� �����Ѵ�. <br>
			=> checkValidation �Ǵ� getValidation �Լ����� ���ȴ�.(ucare_format.js ����)<br>
			required�� ���ų� false�� ��� combobox�� class�� combo_text�� �ڵ� �����ȴ�.<br>
			required�� true�� ��� combobox class�� combo_required�� �ڵ� �����ȴ�.<br>	
		</td>
	</tr>
	<tr>
		<td class=MANTDM>requirednm</td>
		<td class=MANTDM><ucare:select name="mycombo" required="true" requirednm="�̸�"/></td>
		<td class=MANTDM>
			&lt;ucare:select name="mycombo" required="true" <font color="red">requirednm="�̸�"</font>/&gt;
		</td>
		<td>
			requirednm�� �����Ѵ�. <br>
			=> checkValidation �Ǵ� getValidation �Լ����� ���ȴ�.(ucare_format.js ����)<br>
			required�� true�� ��� checkValidation �Ǵ� getValidation �Լ� �˻翡�� �ɸ� ��� requirednm���� �޽����� �����ش�.<br>
			��) �̸���(��) �ʼ��Է� �׸� �Դϴ�. 	<br>
		</td>
	</tr>
	<tr>
		<td class=MANTDM>disable</td>
		<td class=MANTDM><ucare:select name="mycombo" disable="true"/></td>
		<td class=MANTDM>
			&lt;ucare:select name="mycombo" <font color="red">disable="true"</font>/&gt;
		</td>
		<td>
			disabled�� �����Ѵ�. <br>
			disable�� true�� ��� cobobox class�� combo_disabled�� �ڵ� �����ȴ�.<br>	
		</td>
	</tr>
	<tr>
		<td class=MANTDM>event</td>
		<td class=MANTDM><ucare:select name="mycombo" event="true"/></td>
		<td class=MANTDM>
			&lt;ucare:select name="mycombo" <font color="red">event="true"</font>/&gt;
		</td>
		<td>
			���̺� �±� �ȿ� �� ��� eventó������ ���� <br>
		</td>
	</tr>
	<tr>
		<td class=MANTDM>tag</td>
		<td class=MANTDM><ucare:select name="mycombo" tag="style=color:blue;BACKGROUND-COLOR:#aff"/></td>
		<td class=MANTDM>
			&lt;ucare:select name="mycombo" <font color="red">tag="style=color:blue;BACKGROUND-COLOR:#aff"</font>/&gt;
		</td>
		<td>
			������ �Ӽ� �̿��� �Ӽ��� �ʿ��� ��� tag�� ������ �� �ִ�.<br>
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
			������ �Ӽ� �̿��� �Ӽ��� �ʿ��� ��� tag�� ������ �� �ִ�.<br>
		</td>
	</tr>-->
</ucare:table>

</form>
</body>
</html>