<%@ page language="java" contentType="text/html; charset=EUC-KR"%>
<%@ include file="/jsp/include/include.jsp"%>    
<html>
<head>
<title>���̺�(Table) ����</title>
<script language="javascript" src="js/smpTable.js"></script>
</head>
<body>
<form name="f">

<ucare:table type="border" width="980">
	<tr>
		<td class="MANTDT">query</td>
		<td height="30">
		
			
			<!-- Table Tag Sample -->		
			<ucare:table type="query" width="400">
				<tr>
					<td>&nbsp;</td>
				</tr>		
			</ucare:table>
		
		
		</td>
		<td>
			&nbsp;
		</td>
	</tr>
	<tr>
		<td class="MANTDT">list</td>
		<td height="150">
			
			
			<!-- Table Tag Sample -->
			<ucare:table id="samplemytable1" rows="13"  type="list" width="550" height="100" no="true">
				<tr event="O">
					<td width="60" column="code" title="�ҷ��ڵ�" align="center"></td>
					<td width="80" column="codenm" title="����(����)" length="6"></td>
					<td width="80" column="useyn" title="��뿩��(combo)"><ucare:select name="combo0" brcode="USEYN" width="80" option="4" event="true"/></td>
					<td width="80" column="useyn2" title="��뿩��(checkbox)"><input type="checkbox" value="Y" title="true"/></td>
					<td width="0" column="uppercd" title="��з�" style="display:none"></td>
				</tr>
			</ucare:table>
			
			
		</td>
		<td>
			<ucare:imgbtn width="60" name="btnTest13" value="�׽�Ʈ1" onClick="selectMyTable1()"/>
		</td>
	</tr>
	<tr>
		<td class="MANTDT">detail</td>
		<td height="150">
			
			
			<!-- Table Tag Sample -->
			<ucare:table width="550">
				<tr>
					<td class=MANTDT width=80>��з��ڵ�</td>
					<td class=MANTDM>
						<input type=text class=TXT name=uppercd style="width:100">
					</td>
				</tr>
				<tr>
					<td class=MANTDT>�ҷ��ڵ�</td>
					<td class=MANTDM>
						<input type=text class=TXT name=code style="width:100">
					</td>
				</tr>
				<tr>
					<td class=MANTDT>����</td>
					<td class=MANTDM>
						<input type=text class=TXT name=codenm style="width:200">
					</td>
				</tr>
				<tr>
					<td class=MANTDT>��뿩�� (combobox)</td>
					<td class=MANTDM>
						<ucare:select name="useyn" brcode="USEYN" width="60" option="-1" styleClass="Input_mb05"/>
					</td>
				</tr>
				<tr>
					<td class=MANTDT>��뿩�� (checkbox)</td>
					<td class=MANTDM>
						<input type=checkbox name"useyn2" value="Y">
					</td>
				</tr>	
			</ucare:table>
			
			
		</td>
		<td>
		</td>
	</tr>
	<tr>
		<td class="MANTDT">list2</td>
		<td>
		
			
			<!-- Table Tag Sample -->
			<ucare:table id="samplemytable2" rows="20"  type="list" width="650" height="100" no="true" pageman="true" fixed="2">
				<tr event="B">
					<td width="60" column="contractornm" title="����" align="center" format="HTML"></td>
					<td width="90" column="contractorrid" title="�ֹι�ȣ" align="center" format="SID" sortable="true"></td>
					<td width="60" column="payamt" title="�ݾ�" align="right" format="MONEY" sortable="true"></td>
					<td width="60" column="homezipcd" title="�����ȣ" align="center" format="POST"></td>					
					<td width="80" column="firstregdt" title="��¥" align="center" format="DATE"></td>
					<td width="80" column="firstregdt" title="��¥2" align="center" format="DATE2"></td>
					<td width="60" column="firstregtm" title="�ð�" align="center" format="TIME"></td>
					<td width="120" column="firstregtime" title="��¥�ð�" align="center" format="DATET"></td>
					<td width="80" column="hometelno" title="��ȭ��ȣ" align="center" format="TEL"></td>
				</tr>
			</ucare:table>
			
			
		</td>
		<td>
			<ucare:imgbtn width="60" name="btnTest2" value="�׽�Ʈ2" onClick="selectMyTable2()"/>
		</td>
	</tr>
	<tr>
		<td>&nbsp;</td>
		<td>
			onClick : <span class="txt02"><label id="amtlabel"></label></span>
		</td>
		<td></td>
	</tr>
	<tr>
		<td>&nbsp;</td>
		<td>
			onDbClick : <span class="txt01"><label id="sidlabel"></label></span>
		</td>
		<td></td>
	</tr>
	<tr>
		<td class="MANTDT">list3</td>
		<td><table border="0"><tr><td>
		
			
			<!-- Table Tag Sample -->
			<ucare:table id="samplemytable3" rows="20"  type="list" width="400" height="90" no="flase" pageman="true" fixed="2" summary="true" style="table-layout:fixed;">
				<tr event="O">
					<td width="80" column="uppercd" title="��з�" align="center" format="HTML"></td>
					<td width="80" column="code" title="�ڵ�" align="center"></td>
					<td width="80" column="codenm" title="�ڵ��" align="left"></td>
					<td width="80" column="etc1" title="��Ÿ1" align="left"></td>					
					<td width="80" column="etc2" title="��Ÿ2" align="left"></td>
					<td width="80" column="etc3" title="��Ÿ3" align="left"></td>
					<td width="80" column="useyn" title="��뿩��" align="center"></td>
					<td width="80" column="sort" title="����" align="center"></td>
				</tr>
			</ucare:table>
			
			
		</td>
		<td>
		
			<!-- Table Tag Sample -->
			<ucare:table id="samplemytable4" rows="20"  type="list" width="400" height="90" no="flase" pageman="true" title="no">
				<tr event="">
					<td width="80" column="uppercd" title="��з�" align="center" format="HTML"></td>
					<td width="80" column="code" title="�ڵ�" align="center"></td>
					<td width="80" column="codenm" title="�ڵ��" align="left"></td>
					<td width="80" column="etc1" title="��Ÿ1" align="left"></td>					
					<td width="80" column="etc2" title="��Ÿ2" align="left"></td>
					<td width="80" column="etc3" title="��Ÿ3" align="left"></td>
					<td width="80" column="useyn" title="��뿩��" align="center"></td>
					<td width="80" column="sort" title="����" align="center"></td>
				</tr>
			</ucare:table>


		
		</td></tr></table>
		</td>
		<td>
			<ucare:imgbtn width="60" name="btnTest3" value="�׽�Ʈ3" onClick="selectMyTable3()"/>
		</td>
	</tr>
</ucare:table>	

</form>

</body>
</html>