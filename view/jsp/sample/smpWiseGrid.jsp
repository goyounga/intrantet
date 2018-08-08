<!--
  PROJ : Intranet
  NAME : smpWiseGrid.jsp
  DESC : WiseGrid Tag Sample
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
<%@ include file="/jsp/include/include.jsp"%>    
<html>
<head>
<title>Grid Sample</title>
<script language="javascript" src="<%= scriptPath %>/js/sample/smpWiseGrid.js"></script>
</head>
<body topmargin="20" leftmargin="30" scroll="auto" onLoad="setInit();">
<form name="f" target="iLog">

<ucare:table type="detail" width="100%">
	<!-- Grid : ����URL  -->
	<tr>
		<td class=MANTDT width=100>���� URL</td>
		<td class=MANTDM>
			<A href='http://wisegrid.icompia.com/'>http://wisegrid.icompia.com/</A>
		</td>
	</tr>
	
	<!-- Grid : �⺻ �ڵ����  -->
	<tr>
		<td class=MANTDT width=100>�⺻ �ڵ����</td>
		<td class=MANTDM>
			<font color="blue">1. Tag �ۼ����</font> <br> 
			��) <br>
			 &lt;ucare:grid <font color="red">id="SMPCODEBOOKS"</font> width="350" height="120"&gt; <br>
			 &nbsp;&nbsp;&nbsp;&nbsp;	&lt;tr event=""&gt; <br>
			 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;		&lt;td  width="100" column="up_cd" title="��з�"&gt;&lt;/td&gt; <br>
			 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;		&lt;td  width="100" column="code" title="�Һз�"&gt;&lt;/td&gt; <br>
			 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;		&lt;td  width="100" column="code_nm" title="�ڵ��"&gt;&lt;/td&gt; <br>
			 &nbsp;&nbsp;&nbsp;&nbsp;	&lt;/tr&gt; <br>
			&lt;/ucare:grid&gt; <br>
			<font color="blue">2. javascript �ۼ����</font> <br>
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
	
	<!-- Grid : ��ȣ�߰�  -->
	<tr>
		<td class=MANTDT width=100 rowspan="3">��ȣ�ֱ�</td>
		<td class=MANTDM width=100><ucare:imgbtn name="btnSearch" value="��ȸ" onClick="searchCode('grid01')" /></td>
	</tr>
	<tr>
		<td class="MANTDM">
			<ucare:grid id="grid01" width="350" height="120" no="true">
				<tr event="">
					<td  width="100" column="up_cd" title="��з�"></td>
					<td  width="100" column="code" title="�Һз�"></td>
					<td  width="100" column="code_nm" title="�ڵ��"></td>
				</tr>
			</ucare:grid>		
		</td>
	</tr>
	<tr>
		<td class="MANTDM">
			����� ������ �����ϴ�. <br>
			��) &lt;ucare:grid id="UCFSTEventS" width="280" height="420" <font color="red">no="true"</font>&gt;	
		</td>
	</tr>
	
	<!-- Grid : Title �����  -->
	<tr>
		<td class=MANTDT width=100 rowspan="3">Title �����</td>
		<td class=MANTDM width=100><ucare:imgbtn name="btnSearch" value="��ȸ" onClick="searchCode('grid09')" /></td>
	</tr>
	<tr>
		<td class="MANTDM">
			<ucare:grid id="grid09" width="350" height="120" title="false">
				<tr event="">
					<td  width="100" column="up_cd" title="��з�"></td>
					<td  width="100" column="code" title="�Һз�"></td>
					<td  width="100" column="code_nm" title="�ڵ��"></td>
				</tr>
			</ucare:grid>		
		</td>
	</tr>
	<tr>
		<td class="MANTDM">
			- ���̱� : title="true" <br>
			- ����� : title="false" <br>
			��) &lt;ucare:grid id="UCFSTEventS" width="280" height="420" <font color="red">title="false"</font>&gt;	
		</td>
	</tr>
	
	<!-- Grid : ����Ʋ  -->
	<tr>
		<td class=MANTDT width=100 rowspan="3">����Ʋ</td>
		<td class=MANTDM width=100><ucare:imgbtn name="btnSearch" value="��ȸ" onClick="searchCode('grid17')" /></td>
	</tr>
	<tr>
		<td class="MANTDM">
			<ucare:grid id="grid17" width="450" height="120" fixed="2">
				<tr event="">
					<td  width="100" column="up_cd" title="��з�"></td>
					<td  width="100" column="code" title="�Һз�"></td>
					<td  width="100" column="code_nm" title="�ڵ��"></td>
					<td  width="100" column="etc1" title="��Ÿ1"></td>
					<td  width="100" column="etc2" title="��Ÿ2"></td>
					<td  width="100" column="etc3" title="��Ÿ3"></td>
				</tr>
			</ucare:grid>		
		</td>
	</tr>
	<tr>
		<td class="MANTDM">
			����� ������ �����ϴ�. <br>
			��) &lt;ucare:grid id="UCFSTEventS" width="280" height="420" <font color="red">fixed="2"</font>&gt;	
		</td>
	</tr>
	
	<!-- Grid : CRUD ����ϱ�  -->
	<tr>
		<td class=MANTDT width=100 rowspan="2">CRUD ����ϱ�</td>
		<td class=MANTDM>
			<font color="green">smpCodebook.jsp ����</font>
		</td>
	</tr>
	<tr>
		<td class="MANTDM">
			<font color="blue">1. Tag ���</font> <br>
			��) <br>
			&lt;ucare:grid id="SMPCODEBOOKS" width="980" height="620" <font color="red"> crud="true" </font>&gt; <br>
			&nbsp;&nbsp;&nbsp;&nbsp;	&lt;tr event="O"&gt; <br>
			&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;		&lt;td  width="100" column="uppercd" title="��з�" editable="true"&gt;&lt;/td&gt; <br>
			&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;		&lt;td  width="100" column="code" title="�Һз�" editable="true"&gt;&lt;/td&gt; <br>
			&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;		&lt;td  width="100" column="codenm" title="�ڵ��" editable="true"&gt;&lt;/td&gt; <br>
			&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;		&lt;td  width="100" column="etc1" title="��Ÿ1" editable="true"&gt;&lt;/td&gt; <br>
			&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;		&lt;td  width="100" column="etc2" title="��Ÿ2" editable="true"&gt;&lt;/td&gt; <br>
			&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;		&lt;td  width="100" column="etc3" title="��Ÿ3" editable="true"&gt;&lt;/td&gt; <br>
			&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;		&lt;td  width="100" column="sort" title="����" editable="true"&gt;&lt;/td&gt; <br>
			&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;		&lt;td  width="100" column="useyn" title="��뿩��" editable="true" format="COMBO" brcode="USEYN"&gt;&lt;/td&gt; <br>
			&nbsp;&nbsp;&nbsp;&nbsp;	&lt;/tr&gt; <br>
			&lt;/ucare:grid&gt; <br>
			
			<br>
			<font color="blue">2. javascript ���</font> <br>
			// ���, ����, ����<br>
			function saveCode()<br>
			{<br>
			&nbsp;&nbsp;&nbsp;&nbsp;	var tran = new Trans();<br>							
			&nbsp;&nbsp;&nbsp;&nbsp;	tran.setSvc("SMPCODEBOOKS");<br>
			&nbsp;&nbsp;&nbsp;&nbsp;	tran.setWiseGrid("1");			<br>
			&nbsp;&nbsp;&nbsp;&nbsp;	tran.setForwardId("wgdsl","");<br>
			&nbsp;&nbsp;&nbsp;&nbsp;	<font color="red">tran.setMode("save");</font>		// �ݵ�� �߰�<br>
			&nbsp;&nbsp;&nbsp;&nbsp;	tran.open("f", "f","/wisegrid.do");<br>	
			}<br>
			<br>
			// Row �������·� ����<br>
			function removeCode()<br>
			{<br>
			&nbsp;&nbsp;&nbsp;&nbsp;	var GridObj = document.SMPCODEBOOKS;<br>
			&nbsp;&nbsp;&nbsp;&nbsp;	GridObj.DeleteRow(GridObj.GetActiveRowIndex());<br>
			}<br>
			<br>
			// Row �߰�<br>
			function lineInsert()<br>
			{<br>
			&nbsp;&nbsp;&nbsp;&nbsp;	var GridObj = document.SMPCODEBOOKS;<br>
			&nbsp;&nbsp;&nbsp;&nbsp;	GridObj.AddRow();<br>
			}<br>
			<br>
			// CRUD ��� : grid�� �ٽ� �ʱ�ȭ��<br>
			function cancel()<br>
			{<br>
			&nbsp;&nbsp;&nbsp;&nbsp;	var GridObj = document.SMPCODEBOOKS;<br>
			&nbsp;&nbsp;&nbsp;&nbsp;	GridObj.CancelCRUD();<br>
			}<br>			
		</td>
	</tr>
		
	<!-- Grid : �̺�Ʈ  -->
	<tr>
		<td class=MANTDT width=100 rowspan="3">�̺�Ʈ</td>
		<td class=MANTDM width=100>&nbsp;</td>
	</tr>
	<tr>
		<td class="MANTDM">
			<ucare:table type="border">
				<tr>
					<td><ucare:imgbtn name="btnSearch" width="110" value="���콺 ���� Ŭ��" onClick="searchCode('grid03')" /></td>
					<td><ucare:imgbtn name="btnSearch" width="130" value="���콺 ������ Ŭ��" onClick="searchCode('grid04')" /></td>
				</tr>
				<tr>
					<td>
						<ucare:grid id="grid03" width="350" height="120">
							<tr event="O">
								<td  width="100" column="uppercd" title="��з�" align="center"></td>
								<td  width="100" column="code" title="�Һз�" align="left"></td>
								<td  width="100" column="codenm" title="�ڵ��" align="right"></td>
							</tr>
						</ucare:grid>
					</td>
					<td>
						<ucare:grid id="grid04" width="350" height="120">
							<tr event="R">
								<td  width="100" column="uppercd" title="��з�" align="center"></td>
								<td  width="100" column="code" title="�Һз�" align="left"></td>
								<td  width="100" column="codenm" title="�ڵ��" align="right"></td>
							</tr>
						</ucare:grid>
					</td>
				</tr>
				<tr>
					<td><ucare:imgbtn name="btnSearch" width="120" value="���콺 ���� Ŭ��" onClick="searchCode('grid18')" /></td>
					<td><ucare:imgbtn name="btnSearch" width="100" value="Cell Change" onClick="searchCode('grid05')" /></td>
				</tr>
				<tr>
					<td>
						<ucare:grid id="grid18" width="350" height="120">
							<tr event="D">
								<td  width="100" column="uppercd" title="��з�" align="center" editable="true"></td>
								<td  width="100" column="code" title="�Һз�" align="left" editable="true"></td>
								<td  width="100" column="codenm" title="�ڵ��" align="right" editable="true"></td>
							</tr>
						</ucare:grid>
					</td>
					<td>
						<ucare:grid id="grid05" width="350" height="120">
							<tr event="C">
								<td  width="100" column="uppercd" title="��з�" align="center" editable="true"></td>
								<td  width="100" column="code" title="�Һз�" align="left" editable="true"></td>
								<td  width="100" column="codenm" title="�ڵ��" align="right" editable="true"></td>
							</tr>
						</ucare:grid>
					</td>
				</tr>
				<tr>
					<td><ucare:imgbtn name="btnSearch" width="120" value="Combobox Change" onClick="searchCode('grid23')" /></td>
					<td><ucare:imgbtn name="btnSearch" width="130" value="�̺�Ʈ ������ �ֱ�" onClick="searchCode('grid24')" /></td>
				</tr>
				<tr>
					<td>
						<ucare:grid id="grid23" width="350" height="120">
							<tr event="S">
								<td  width="80" column="uppercd" title="��з�" align="center" editable="false"></td>
								<td  width="80" column="code" title="�Һз�" align="left" editable="false"></td>
								<td  width="80" column="codenm" title="�ڵ��" align="right" editable="false"></td>
								<td  width="80" column="useyn" title="��뿩��" format="COMBO" brcode="USEYN" align="center" editable="true"></td>
							</tr>
						</ucare:grid>
					</td>
					<td>
						<ucare:grid id="grid24" width="350" height="120">
							<tr event="D,S">
								<td  width="80" column="uppercd" title="��з�" align="center" editable="false"></td>
								<td  width="80" column="code" title="�Һз�" align="left" editable="false"></td>
								<td  width="80" column="codenm" title="�ڵ��" align="right" editable="false"></td>
								<td  width="80" column="useyn" title="��뿩��" format="COMBO" brcode="USEYN" align="center" editable="true"></td>
							</tr>
						</ucare:grid>
					</td>
				</tr>
				<tr>
					<td><ucare:imgbtn name="btnSearch" value="���콺 ����Ŭ�� & ����Ŭ��" onClick="searchCode('grid25')" /></td>
					<td>&nbsp;</td>
				</tr>
				<tr>
					<td>
						<ucare:grid id="grid25" width="350" height="120">
							<tr event="B">
								<td  width="80" column="uppercd" title="��з�" align="center" editable="false"></td>
								<td  width="80" column="code" title="�Һз�" align="left" editable="false"></td>
								<td  width="80" column="codenm" title="�ڵ��" align="right" editable="false"></td>
								<td  width="80" column="useyn" title="��뿩��" format="COMBO" brcode="USEYN" align="center" editable="true"></td>
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
			- ���콺 ���� Ŭ��	: <font color="red">&lt;tr event="O"&gt;</font> =&gt; function showDetailO_obj(id, strColumnKey, nRow) { // �����߰� } <br> 
			- ���콺 ���� Ŭ��	: <font color="red">&lt;tr event="D"&gt;</font> =&gt; function showDetailB_obj(id, strColumnKey, nRow) { // �����߰� } <br>
			- ���콺 ������ Ŭ��: <font color="red">&lt;tr event="R"&gt;</font> =&gt; function showDetailR_obj(id, strColumnKey, nRow) { // �����߰� }	<br> 
			- Cell Change: <font color="red">&lt;tr event="C"&gt;</font> =&gt; function showDetailC_obj(id, strColumnKey, nRow, vtOldValue, vtNewValue) { // �����߰� }<br> 
			- Combobox Change: <font color="red">&lt;tr event="S"&gt;</font> =&gt; function showDetailS_obj(id, strColumnKey, nRow, nOldIndex, nNewIndex) { // �����߰� }<br>
			- ������ �ֱ� :  <font color="red">&lt;tr event="D,S"&gt;</font> <br>
			=&gt;  function showDetailB_obj(id, strColumnKey, nRow) { // �����߰� }<br>
				function showDetailS_obj(id, strColumnKey, nRow, nOldIndex, nNewIndex) { // �����߰� }<br>	
			- ���ÿ� ���콺 ���� Ŭ��, ���� Ŭ�� �ֱ� :  <font color="red">&lt;tr event="B"&gt;</font> <br>
			  ���� �ڵ������ �����ϴ�.<br>
			=&gt;  function showDetailO_obj(id, strColumnKey, nRow) { // �����߰� }<br>
				function showDetailB_obj(id, strColumnKey, nRow) { // �����߰� }<br>
		</td>
	</tr>
	
	<!-- Grid : ����  -->
	<tr>
		<td class=MANTDT width=100 rowspan="3">����</td>
		<td class=MANTDM width=100><ucare:imgbtn name="btnSearch" value="��ȸ" onClick="searchCode('grid21')" /></td>
	</tr>
	<tr>
		<td class="MANTDM">
			<ucare:grid id="grid21" width="450" height="120" sort="sortmulti">
				<tr event="">
					<td  width="100" column="up_cd" title="��з�"></td>
					<td  width="100" column="code" title="�Һз�"></td>
					<td  width="100" column="code_nm" title="�ڵ��"></td>
					<td  width="100" column="etc1" title="��Ÿ1"></td>
					<td  width="100" column="etc2" title="��Ÿ2"></td>
					<td  width="100" column="etc3" title="��Ÿ3"></td>
				</tr>
			</ucare:grid>		
		</td>
	</tr>
	<tr>
		<td class="MANTDM">
			WiseGrid�� strHDClickAction�Ӽ��� ������ �� �ִ� ����� �߰��߽��ϴ�.<br>
			sort �Ӽ��� �ָ� �Ǵµ� ���ָ� �⺻���� sortsingle�Դϴ�. <br>
			- select : Ŭ���� �÷��� ��� ���� �����Ѵ� <br>
	 		- sortsingle : (�⺻����)Ŭ���� �÷��� ��� ���� �����Ѵ�. <br>
	 		- sortmulti : ShiftŰ�� �����ִ� ���¿��� ���� �÷��� ���ý� ������ ������� ���������Ѵ�. <br>
			��) &lt;ucare:grid id="UCFSTEventS" width="280" height="420" <font color="red">sort="sortmulti"</font>&gt;	
		</td>
	</tr>
	
	<!-- Grid : ��������  -->
	<tr>
		<td class=MANTDT width=100 rowspan="3">��������</td>
		<td class=MANTDM width=100><ucare:imgbtn name="btnSearch" value="��ȸ" onClick="searchCode('grid02')" /></td>
	</tr>
	<tr>
		<td class="MANTDM">
			<ucare:grid id="grid02" width="350" height="120">
				<tr event="">
					<td  width="100" column="up_cd" title="��з�" align="center"></td>
					<td  width="100" column="code" title="�Һз�" align="left"></td>
					<td  width="100" column="code_nm" title="�ڵ��" align="right"></td>
				</tr>
			</ucare:grid>		
		</td>
	</tr>
	<tr>
		<td class="MANTDM">
			����� ������ �����ϴ�. <br>
			��) &lt;td  width="80" column="name" title="�̸�" <font color="red">align="center"</font>&gt;&lt;/td&gt;
		</td>
	</tr>
	
	<!-- Grid : üũ�ڽ�  -->
	<tr>
		<td class=MANTDT width=100 rowspan="3">üũ�ڽ�</td>
		<td class=MANTDM width=100><ucare:imgbtn name="btnSearch" value="��ȸ" onClick="searchCode('grid11')" /></td>
	</tr>
	<tr>
		<td class="MANTDM">
			<ucare:grid id="grid11" width="350" height="120">
				<tr event="">
					<td  width="20" column="chk" title=" " format="CHECKBOX" hcheckbox="true" editable="true"></td>
					<td  width="100" column="up_cd" title="��з�"></td>
					<td  width="100" column="code" title="�Һз�"></td>
					<td  width="100" column="code_nm" title="�ڵ��"></td>
				</tr>
			</ucare:grid>		
		</td>
	</tr>
	<tr>
		<td class="MANTDM">
			- format="CHECKBOX" : checkbox�� ������ش�.<br>
			- hcheckbox="true" : Title�� checkbox�� ������ش�.<br>
			<b>!���ǻ��� : �������(editable="true")�� ���� ������ checkbox�� ��Ȱ��ȭ �ȴ�.</b><br>
			��) &lt;td  width="20" column="chk" title="����" <font color="red">format="CHECKBOX" hcheckbox="true" editable="true"</font>&gt;&lt;/td&gt;
		</td>
	</tr>
	
	<!-- Grid : �޺��ڽ�  -->
	<tr>
		<td class=MANTDT width=100 rowspan="3">�޺��ڽ�</td>
		<td class=MANTDM>
			<ucare:imgbtn name="btnSearch" value="��ȸ" onClick="searchCode('grid12')" />
			(��뿩�ο� ���콺�� ������ ������.)
		</td>
	</tr>
	<tr>
		<td class="MANTDM">
			<ucare:grid id="grid12" width="450" height="120">
				<tr event="">
					<td  width="100" column="up_cd" title="��з�"></td>
					<td  width="100" column="code" title="�Һз�"></td>
					<td  width="100" column="code_nm" title="�ڵ��"></td>
					<td  width="100" column="use_f" title="��뿩��" format="COMBO" brcode="USEYN" option="4" editable="true"></td>
				</tr>
			</ucare:grid>		
		</td>
	</tr>
	<tr>
		<td class="MANTDM">
			- format="COMBO" : �޺��ڽ��� ������ش�.<br>
			- brcode="USEYN" : �ڵ�� ��ȸ�� ��з��ڵ尪�� �����Ѵ�.<br>
			<b>!���ǻ��� : �������(editable="true")�� ���� ������ �޺��ڽ��� ��Ȱ��ȭ �ȴ�.</b><br>
			��) &lt;td  width="100" column="useyn" title="��뿩��" <font color="red">format="COMBO" brcode="USEYN" editable="true"</font>&gt;&lt;/td&gt;<br>
			- option="4" : option�� �����Ѵ�. <br>
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
	
	<!-- Grid : �޷�  -->
	<tr>
		<td class=MANTDT width=100 rowspan="3">�޷�</td>
		<td class=MANTDM>
			<ucare:imgbtn name="btnSearch" value="��ȸ" onClick="searchCode('grid13')" />
			(�޷¿� ���콺�� ������ ������.)
		</td>
	</tr>
	<tr>
		<td class="MANTDM">
			<ucare:grid id="grid13" width="450" height="120">
				<tr event="">
					<td  width="100" column="up_cd" title="��з�"></td>
					<td  width="100" column="code" title="�Һз�"></td>
					<td  width="100" column="code_nm" title="�ڵ��"></td>
					<td  width="100" column="dd" title="�޷�" format="DATE" editable="true"></td>
				</tr>
			</ucare:grid>		
		</td>
	</tr>
	<tr>
		<td class="MANTDM">
			- format="DATE" : �޷��� ������ش�.<br>
			<b>!���ǻ��� : �������(editable="true")�� ���� ������ �޷��� ��Ȱ��ȭ �ȴ�.</b><br>
			��) &lt;td  width="100" column="dd" title="�޷�" <font color="red">format="DATE" editable="true"</font>&gt;&lt;/td&gt;
		</td>
	</tr>
	
	<!-- Grid : ����  -->
	<tr>
		<td class=MANTDT width=100 rowspan="3">����</td>
		<td class=MANTDM>
			<ucare:imgbtn name="btnSearch" value="��ȸ" onClick="searchCode('grid14')" />
		</td>
	</tr>
	<tr>
		<td class="MANTDM">
			<ucare:grid id="grid14" width="450" height="120">
				<tr event="">
					<td  width="100" column="up_cd" title="��з�"></td>
					<td  width="100" column="code" title="�Һз�"></td>
					<td  width="100" column="code_nm" title="�ڵ��"></td>
					<td  width="50" column="num1" title="����" format="MONEY"></td>
					<td  width="50" column="num2" title="�Ǽ�" format="MONEY" maxlength="3.2"></td>
				</tr>
			</ucare:grid>		
		</td>
	</tr>
	<tr>
		<td class="MANTDM">
			- format="MONEY" : ���������� ǥ���Ѵ�.<br>
			<b>!���ǻ��� : format="MONEY"�� ������� maxlength�� ���������� 20byte�Դϴ�.</b><br>
			��) &lt;td  width="50" column="num1" title="����" <font color="red">format="MONEY"</font>&gt;&lt;/td&gt; <br>
			&lt;td  width="50" column="num2" title="�Ǽ�" <font color="red">format="MONEY" maxlength="3.2"</font>&gt;&lt;/td&gt;
		</td>
	</tr>
	
	<!-- Grid : Title �׷�����  -->
	<tr>
		<td class=MANTDT width=100 rowspan="3">Title �׷����� </td>
		<td class=MANTDM>
			<ucare:imgbtn name="btnSearch" value="��ȸ" onClick="searchCode('grid15')" />
		</td>
	</tr>
	<tr>
		<td class="MANTDM">
			<ucare:grid id="grid15" width="450" height="120">
				<tr event="">
					<td  width="100" column="uppercd" title="��з�"></td>
					<td  width="100" column="code" title="�Һз�"></td>
					<td  width="100" column="codenm" title="�ڵ��"></td>
					<td  width="50" column="num1" title="����" groupid="num" grouptitle="����" format="MONEY"></td>
					<td  width="50" column="num2" title="�Ǽ�" groupid="num" grouptitle="����" format="MONEY" maxlength="3.2"></td>
				</tr>
			</ucare:grid>		
		</td>
	</tr>
	<tr>
		<td class="MANTDM">
			- groupid="num" : ���� �׷�ID�� �����Ѵ�.<br>
			- grouptitle="����" : ���� �׷�ID�� Title�� �����Ѵ�.<br>
			<b>!���ǻ��� : groupid�� grouptitle�� ������ �� ���� �׷�TD ������� �ؾ� �Ѵ�. �������� �ȵ˴ϴ�.</b><br>
			��) &lt;td  width="50" column="num1" title="����" <font color="red">groupid="num" grouptitle="����"</font>&gt;&lt;/td&gt; <br>
			&lt;td  width="50" column="num2" title="�Ǽ�" <font color="red">groupid="num" grouptitle="����"</font>&gt;&lt;/td&gt;
		</td>
	</tr>
	
	<!-- Grid : �̹��� �߰��ϴ� ���  -->
	<tr>
		<td class=MANTDT width=100 rowspan="3">�̹��� �߰��ϴ� ���</td>
		<td class=MANTDM width=100><ucare:imgbtn name="btnSearch" value="��ȸ" onClick="searchCode('grid07')" /></td>
	</tr>
	<tr>
		<td class="MANTDM">
			<ucare:grid id="grid07" width="350" height="120">
				<tr event="">
					<td  width="100" column="uppercd" title="��з�"></td>
					<td  width="100" column="code" title="�Һз�"></td>
					<td  width="100" column="codenm" title="�ڵ��" format="IMAGE" image="search"></td>
				</tr>
			</ucare:grid>		
		</td>
	</tr>
	<tr>
		<td class="MANTDM">
			- format�� IMAGE��� �����ϰ� ���ϴ� �̹����� image�� �����ϸ� �˴ϴ�. (global.properties : #Grid Icon Image URL ����) <br>
			��) &lt;td  width="160" column="eventnm" title="�̺�Ʈ��"	<font color="red">format="IMAGE" image="search"</font>&gt;&lt;/td&gt; <br>
			* search : ��ȸ <br>
			* doc : ���� <br>
			* scissors : ���� <br>
			* del : ������ <br>
			* play : �̵�� �÷��� <br>
			* �� �ۿ� images�ȿ� �ִ� �̹����� �� ���� ��������� ��� �ϸ� �˴ϴ�. ��) image="smallbtn/play_2.gif" <br>
		</td>
	</tr>
	
	<!-- Grid : Cell Merge  -->
	<tr>
		<td class=MANTDT width=100 rowspan="3">Cell Merge</td>
		<td class=MANTDM width=100><ucare:imgbtn name="btnSearch" value="��ȸ" onClick="searchCode('grid20')" /></td>
	</tr>
	<tr>
		<td class="MANTDM">
			<ucare:grid id="grid20" width="350" height="120">
				<tr event="">
					<td  width="100" column="up_cd" title="��з�" merge="true"></td>
					<td  width="100" column="code" title="�Һз�"></td>
					<td  width="100" column="code_nm" title="�ڵ��"></td>
				</tr>
			</ucare:grid>		
		</td>
	</tr>
	<tr>
		<td class="MANTDM">
			- merge="true" �ϸ� �� �÷��� merge �Ѵ�.<br>
			��) &lt;td  width="100" column="uppercd" title="��з�" <font color="red">merge="true"</font>&gt;&lt;/td&gt; <br>
		</td>
	</tr>
	
	<!-- Grid : Grid ��ȸ �� ù ��° Row �ڵ� Ŭ�� �̺�Ʈ  -->
	<tr>
		<td class=MANTDT width=100 rowspan="3">Grid ��ȸ �� ù ��° Row �ڵ� Ŭ�� �̺�Ʈ</td>
		<td class=MANTDM width=100><ucare:imgbtn name="btnSearch" value="��ȸ" onClick="testDefClick('grid08')" /></td>
	</tr>
	<tr>
		<td class="MANTDM">
			<ucare:grid id="grid08" width="350" height="120">
				<tr event="">
					<td  width="100" column="uppercd" title="��з�"></td>
					<td  width="100" column="code" title="�Һз�"></td>
					<td  width="100" column="codenm" title="�ڵ��" format="IMAGE" image="search"></td>
				</tr>
			</ucare:grid>		
		</td>
	</tr>
	<tr>
		<td class=MANTDM>
			 ����� ������ �����ϴ�. <br>
			  ��) <br>
			 function query() <br> 
		  	 { <br>
		  	&nbsp;&nbsp;&nbsp;&nbsp;	var tran = new Trans(); <br>
			&nbsp;&nbsp;&nbsp;&nbsp;	tran.setSvc(SELECT_ID); <br>
			&nbsp;&nbsp;&nbsp;&nbsp;	<font color="red">tran.setDefClick("true");	// ���� �߰� </font> <br>			
			&nbsp;&nbsp;&nbsp;&nbsp;	tran.setWiseGrid("1");	<br>		
			&nbsp;&nbsp;&nbsp;&nbsp;	tran.setForwardId("wgdsl",""); <br>
			&nbsp;&nbsp;&nbsp;&nbsp;	tran.open("fQuery", "f","/wisegrid.do"); <br>	
		  	 } 	
		</td>
	</tr>
	
	<!-- Grid : Grid �÷� ����/�б� ��� ���� ��� ����  -->
	<tr>
		<td class=MANTDT width=100 rowspan="3">Grid �÷� ����/�б� ��� ���� ��� ����</td>
		<td class=MANTDM>
			<ucare:imgbtn name="btnSearch" value="��ȸ" onClick="searchCode('grid06')" />
			(Cell�� ���� Ŭ���غ�����.)
		</td>
	</tr>
	<tr>
		<td class="MANTDM">
			<ucare:grid id="grid06" width="350" height="120">
				<tr event="">
					<td  width="100" column="up_cd" title="��з�" editable="true"></td>
					<td  width="100" column="code" title="�Һз�" editable="false"></td>
					<td  width="100" column="code_nm" title="�ڵ��" editable="true"></td>
				</tr>
			</ucare:grid>		
		</td>
	</tr>
	<tr>
		<td class="MANTDM">
			- editable�Ӽ����� �־� ������ ����� ������ �� �ֽ��ϴ�. Default���� false�̱� ������ �ڵ����� �б� ��尡 �˴ϴ�.<br>
	   		��) &lt;td  width="20" column="eventid" title="ID" <font color="red">editable="true"</font> align="center"&gt;&lt;/td&gt;
		</td>
	</tr>
	
	<!-- Grid : ���߿� ���  -->
	<tr>
		<td class=MANTDT width=100 rowspan="3">���߿� ���</td>
		<td class=MANTDM width=100><ucare:imgbtn name="btnSearch" value="��ȸ" onClick="searchCode('grid10')" /></td>
	</tr>
	<tr>
		<td class="MANTDM">
			<ucare:grid id="grid10" width="350" height="120" level="2">
				<tr event="">
					<!-- ù ��° �� : level="0" -->
					<td  width="100" column="uppercd" title="��з�" level="0"></td>
					<td  width="100" column="code" title="�Һз�" level="0"></td>
					<td  width="100" column="codenm" title="�ڵ��" level="0"></td>
					<!-- �� ��° �� : level="1" -->
					<td  width="100" column="etc1" title="��Ÿ1" level="1"></td>
					<td  width="100" column="etc2" title="��Ÿ2" level="1"></td>
					<td  width="100" column="etc3" title="��Ÿ3" level="1"></td>
				</tr>
			</ucare:grid>
		</td>
	</tr>
	<tr>
		<td class="MANTDM">
			- &lt;ucare:grid <font color="red">level="3"</font>&gt; �� �κп� ������ level�� 1���� Row Data�� 3���� �ٷ� �����ְڴٴ� ǥ�� <br>
			- &lt;td <font color="red">level="0"</font>&gt; �� �κп� ������ level�� �� �÷��� ù ��° �ٿ� �����ְڴٴ� ǥ��  <br>
		</td>
	</tr>
	
	<!-- Grid : ������  -->
	<%--  
	<tr>
		<td class=MANTDT width=100 rowspan="3">������</td>
		<td class=MANTDM width=100><ucare:imgbtn name="btnSearch" value="��ȸ" onClick="testPage('grid16')" /></td>
	</tr>
	<tr>
		<td class="MANTDM">
			<ucare:grid id="grid16" width="550" height="120">
				<tr event="">
					<td  width="100" column="uppercd" title="��з�"></td>
					<td  width="100" column="code" title="�Һз�"></td>
					<td  width="100" column="codenm" title="�ڵ��"></td>
				</tr>
			</ucare:grid>		
		</td>
	</tr>
	--%>
	<tr>
		<td class=MANTDT width=100 rowspan="3">������</td>
		<td class=MANTDM width=100><ucare:imgbtn name="btnSearch" value="��ȸ" onClick="testPage2()" /></td>
	</tr>
	<tr>
		<td class="MANTDM">
			<table>
				<tr>
					<td>
						<ucare:grid id="grid55" width="550" height="120">
							<tr event="">
								<td  width="100" column="uppercd" title="��з�"></td>
								<td  width="100" column="code" title="�Һз�"></td>
								<td  width="100" column="codenm" title="�ڵ��"></td>
							</tr>
						</ucare:grid>
					</td>
					<td>
						<ucare:grid id="grid66" width="550" height="120">
							<tr event="">
								<td  width="100" column="uppercd" title="��з�"></td>
								<td  width="100" column="code" title="�Һз�"></td>
								<td  width="100" column="codenm" title="�ڵ��"></td>
							</tr>
						</ucare:grid>
					</td>
				</tr>
			</table>		
		</td>
	</tr>
	<tr>
		<td class="MANTDM">
			<b>�����ۼ��� query-exec-type�� page�� �����ϱ⸸ �ϸ� �˴ϴ�.</b>	
		</td>
	</tr>
	
	<!-- Grid : Tree  -->
	<tr>
		<td class=MANTDT width=100 rowspan="2">Tree</td>
		<td class=MANTDM>
			<font color="green">smpTree.jsp ����</font>
		</td>
	</tr>
	<tr>
		<td class="MANTDM">
			<font color="blue">1. Tag ���</font> <br>
			&lt;ucare:grid id="SMPTREES" width="200" height="370" <font color="red">tree="true"</font>&gt; <br>
            &nbsp;&nbsp;&nbsp;&nbsp;	&lt;tr class="LIST" event="O"&gt; <br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;    	&lt;td  width="200" column="codenm" <font color="red">format="TREE" image="search"</font>&gt;&lt;/td&gt; <br>
            &nbsp;&nbsp;&nbsp;&nbsp;    &lt;/tr&gt; <br>
			&lt;/ucare:grid&gt; <br>
			
			<font color="blue">2. �����ۼ� ���</font> <br>
			<b>!���ǻ��� : table����� ��� view type�� tree�� ���������� WiseGrid�� grid�� �����ؾ� �մϴ�. </b><br>
			<font color="red">&lt;query-view-type&gt;grid&lt;/query-view-type&gt;</font> <br>
			
			<font color="blue">3. Tree �̺�Ʈ</font> <br>
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