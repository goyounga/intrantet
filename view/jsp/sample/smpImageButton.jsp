<!--
  PROJ : Intranet
  NAME : smpWiseGrid.jsp
  DESC : Image Button Tag Sample
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
	<script language="javascript" src="<%= scriptPath %>/js/sample/smpImageButton.js"></script>
</head>
<body topmargin="20" leftmargin="30" scroll="auto">

<form>

<ucare:table border="detail">
	<tr>
		<td class=MANTDT width=100 rowspan="15">imgbtn</td>
		<td class=MANTDM>type</td>
		<td class=MANTDM><ucare:imgbtn type="B" value="��ư"/></td>
		<td class=MANTDM>
			&lt;ucare:imgbtn <font color="red">type="B"</font> value="��ư"/&gt;
		</td>
		<td>
			��ư�� ���������� �����Ѵ�.<br>
			type�� ���� ������ �⺻����(��Ȳ��)�� �ش�.<br>
			<table border=1>
				<tr>
					<td class="MANTDT" width=60>type</td>
					<td class="MANTDT" width=60>button</td>
				</tr>
				<tr>
					<td>����</td>
					<td><ucare:imgbtn kind="R" type="" value="��ư"/></td>
				</tr>
				<tr>
					<td>G</td>
					<td><ucare:imgbtn kind="R" type="G" value="��ư"/></td>
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
			��ư������ �����ϴ�. ��ư�� �ڵ�� �����Ѵ�. <br>
			<b>global.properties�� �ִ� �Ӽ��� �����Ѵ�. <br>
			imgbtn_code=COM002�� ��з� �ڵ带 �����Ѵ�. <br>
			imgbtn_auth=etc1 (��ư ��������)<br>
			imgbtn_value=codenm (��ư��)
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
					<td>��ư����</td>
					<td>C:��� R:��ȸ U:���� D:���� F:���� P:�μ� O:�˾� NUL:��ü</td>
					<td>&nbsp;</td>
				</tr>
				<tr>
					<td>COM003</td>
					<td>A</td>
					<td>�ű�</td>
					<td>C</td>
					<td><ucare:imgbtn kind="A"/></td>
				</tr>
				<tr>
					<td>COM002</td>
					<td>C</td>
					<td>���</td>
					<td>&nbsp;</td>
					<td><ucare:imgbtn kind="C"/></td>
				</tr>
				<tr>
					<td>COM002</td>
					<td>D</td>
					<td>����</td>
					<td>D</td>
					<td><ucare:imgbtn kind="D"/></td>
				</tr>
				<tr>
					<td>COM002</td>
					<td>E</td>
					<td>����</td>
					<td>F</td>
					<td><ucare:imgbtn kind="E"/></td>
				</tr>
				<tr>
					<td>COM002</td>
					<td>O</td>
					<td>�˾�</td>
					<td>O</td>
					<td><ucare:imgbtn kind="O"/></td>
				</tr>
				<tr>
					<td>COM002</td>
					<td>P</td>
					<td>�μ�</td>
					<td>P</td>
					<td><ucare:imgbtn kind="P"/></td>
				</tr>
				<tr>
					<td>COM002</td>
					<td>R</td>
					<td>��ȸ</td>
					<td>R</td>
					<td><ucare:imgbtn kind="R"/></td>
				</tr>
				<tr>
					<td>COM002</td>
					<td>S</td>
					<td>����</td>
					<td>U</td>
					<td><ucare:imgbtn kind="S"/></td>
				</tr>
				<tr>
					<td>COM002</td>
					<td>U</td>
					<td>����</td>
					<td>U</td>
					<td><ucare:imgbtn kind="U"/></td>
				</tr>
				<tr>
					<td>COM002</td>
					<td>X</td>
					<td>�ݱ�</td>
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
			button name�� �����Ѵ�.<br>
		</td>
	</tr>
	<tr>
		<td class=MANTDM>value</td>
		<td class=MANTDM><ucare:imgbtn kind="R" value="��ư����"/></td>
		<td class=MANTDM>
			&lt;ucare:imgbtn kind="R" <font color="red">value="��ư����"</font>/&gt;
		</td>
		<td>
			��ư���� �����Ѵ�. value���� ������ kind�� ���� ��ư���� ������ �ش�.<br>
		</td>
	</tr>
	<tr>
		<td class=MANTDM>auth</td>
		<td class=MANTDM><ucare:imgbtn name="btnSearch" kind="R" auth="U"/></td>
		<td class=MANTDM>
			&lt;ucare:imgbtn name="btnSearch" kind="R" <font color="red">auth="U"</font>/&gt;
		</td>
		<td>
			��ư������ �����Ѵ�. auth���� ������ kind�� ���� ������ ������ �ش�.<br>
			���� ������ kind="R"�̾ ��ȸ������ üũ�ؾ� ������ auth="U"�� ��� ������ ���������� üũ�ϰ� �ȴ�.<br>
			������� ������ ���ٸ� �� button�� ��Ȱ��ȭ ��Ų��. 	ucare_util.js�� setButtonByAuth�Լ�����<br>
		</td>
	</tr>
	<tr>
		<td class=MANTDM>width</td>
		<td class=MANTDM><ucare:imgbtn name="btnSearch" kind="R" width="100"/></td>
		<td class=MANTDM>
			&lt;ucare:imgbtn name="btnSearch" kind="R" <font color="red">width="100"</font>/&gt;
		</td>
		<td>
			button width�� �����Ѵ�.<br>
			width���� ���ٸ� <b>icon�� ����ϸ� 60, icon�� ������� ������ 40</b>���� �ڵ������ȴ�.<br>
		</td>
	</tr>
	<tr>
		<td class=MANTDM>title</td>
		<td class=MANTDM><ucare:imgbtn name="btnSearch" kind="R" title="��ȸ�� �մϴ�."/></td>
		<td class=MANTDM>
			&lt;ucare:imgbtn name="btnSearch" kind="R" <font color="red">title="��ȸ�� �մϴ�."</font>/&gt;
		</td>
		<td>
			title�� �����Ѵ�.(ǳ���� ���)<br>
		</td>
	</tr>
	<tr>
		<td class=MANTDM>disable</td>
		<td class=MANTDM><ucare:imgbtn name="btnSearch" kind="R" disable="true"/></td>
		<td class=MANTDM>
			&lt;ucare:imgbtn name="btnSearch" kind="R" <font color="red">disable="true"</font>/&gt;
		</td>
		<td>
			button�� disabled�� �����Ѵ�. <br>
			button Ȱ��/��Ȱ�� ��Ʈ���� ucare_util.js�� setButton�Լ��� �̿��Ѵ�.<br>
			��) setButton(f.btnSearch, false);
		</td>
	</tr>
	<tr>
		<td class=MANTDM>onClick</td>
		<td class=MANTDM><ucare:imgbtn name="btnSearch" kind="R" onClick="query()"/></td>
		<td class=MANTDM>
			&lt;ucare:imgbtn name="btnSearch" kind="R" <font color="red">onClick="query()"</font>/&gt;
		</td>
		<td>
			onClick �̺�Ʈ�� ȣ��Ǵ� �Լ��� �����Ѵ�. <br>
		</td>
	</tr>
	<tr>
		<td class=MANTDM>styleClass</td>
		<td class=MANTDM><ucare:imgbtn name="btnSearch" kind="R" styleClass="button_class"/></td>
		<td class=MANTDM>
			&lt;ucare:imgbtn name="btnSearch" kind="R" <font color="red">styleClass="button_class"</font>/&gt;
		</td>
		<td>
			button class�� �����Ѵ�. <br>
			styleClass���� ������ class�� img_button���� �ڵ� �����ȴ�.
		</td>
	</tr>
	<tr>
		<td class=MANTDM>classL</td>
		<td class=MANTDM><ucare:imgbtn name="btnSearch" kind="R" classL="button_class"/></td>
		<td class=MANTDM>
			&lt;ucare:imgbtn name="btnSearch" kind="R" <font color="red">classL="button_class"</font>/&gt;
		</td>
		<td>
			button ���ʺκ��� class�� �����Ѵ�. <br>
			classL���� ������ class�� imgbtnL�� �ڵ� �����ȴ�.
		</td>
	</tr>
	<tr>
		<td class=MANTDM>classM</td>
		<td class=MANTDM><ucare:imgbtn name="btnSearch" kind="R" classM="button_class"/></td>
		<td class=MANTDM>
			&lt;ucare:imgbtn name="btnSearch" kind="R" <font color="red">classM="button_class"</font>/&gt;
		</td>
		<td>
			button ��� �κ��� class�� �����Ѵ�. <br>
			classM���� ������ class�� imgbtnM���� �ڵ� �����ȴ�.
		</td>
	</tr>
	<tr>
		<td class=MANTDM>classR</td>
		<td class=MANTDM><ucare:imgbtn name="btnSearch" kind="R" classR="button_class"/></td>
		<td class=MANTDM>
			&lt;ucare:imgbtn name="btnSearch" kind="R" <font color="red">classR="button_class"</font>/&gt;
		</td>
		<td>
			button ������ �κ� class�� �����Ѵ�. <br>
			classR���� ������ class�� imgbtnR�� �ڵ� �����ȴ�.
		</td>
	</tr>
	<tr>
		<td class=MANTDM>src</td>
		<td class=MANTDM><ucare:imgbtn name="btnSearch" kind="R" src=""/></td>
		<td class=MANTDM>
			&lt;ucare:imgbtn name="btnSearch" kind="R" <font color="red">src=""</font>/&gt;
		</td>
		<td>
			���� ������.<br>
		</td>
	</tr>
	<tr>
		<td class=MANTDM>tabIndex</td>
		<td class=MANTDM><ucare:imgbtn name="btnSearch" kind="R" tabIndex="1"/></td>
		<td class=MANTDM>
			&lt;ucare:imgbtn name="btnSearch" kind="R" <font color="red">tabIndex="1"</font>/&gt;
		</td>
		<td>
			���� ������.<br>
		</td>
	</tr>
</ucare:table>

</form>
</body>
</html>