<%@ page language="java" contentType="text/html; charset=euc-kr"%>
<%@ include file="/jsp/include/include.jsp"%> 
<html>
<head>
	<title>�ؽ����� ���� ��ȸ</title>
	<script language="javascript" src="js/smpNexfron.js"></script>
</head>
<body onLoad="setInit();">
<form name="f">

<ucare:table type="border" width="980">
	<tr>
		<td class=MANTDM>
			<ucare:table type="border">
				<tr>
					<td class=MANTDM>
						<!-- �ؽ����� -->
						<div id="vtabview" style="display:; width:900; height:500">
							<ucare:table type="detail" width="900">
								<tr>
									<td class=MANTDT width=80>�̸�</td>
									<td class=MANTDM>
										<ucare:input type="text" name="user_nm" width="100" mode="active" tag="onKeyUp=\"pressEnter('searchUser()')\"" />
										<ucare:imgbtn name="btnSearch" value="��ȸ" onClick="searchUser()" />
									</td>
								</tr>
								<tr>
									<td class="MANTDM" colspan="2">
										<!-- ����Ʈ  -->
										<ucare:grid id="UCSMP001S" width="500" height="504" no="true">
											<tr event="O">
												<td width="100" column="user_nm" title="�̸�" align="center"></td>
												<td	width="60" column="pos_nm"	title="����" align="center"></td>
												<td width="100" column="hdp_no" title="�޴���" align="center"></td>
												<td width="200" column="em_addr" title="E-mail"></td>
											</tr>
										</ucare:grid>		
									</td>
								</tr>
							</ucare:table>		
						</div>
						<!-- ��ü -->
						<div id="vtabview" style="display:none; width:900; height:500">
							<ucare:table type="detail" width="900">
								<tr>
									<td class=MANTDT width=80>��ü����</td>
									<td class=MANTDM>
										<ucare:select name="q_clnt_type" brcode="SYS023" width="100" option="10"/>
									</td>
									<td class=MANTDT width=80>��ü��</td>
									<td class=MANTDM>
										<ucare:input type="text" name="q_clnt_co" width="100" mode="active" tag="onKeyUp=\"pressEnter('searchChrg()')\"" />
									</td>
									<td class=MANTDT width=80>�̸�</td>
									<td class=MANTDM>
										<ucare:input type="text" name="q_chrg_nm" width="100" mode="active" tag="onKeyUp=\"pressEnter('searchChrg()')\"" />
										<ucare:imgbtn name="btnSearch" value="��ȸ" onClick="searchChrg()" />
									</td>
								</tr>
								<tr>
									<td class="MANTDM" colspan="6">
										<!-- ����Ʈ  -->
										<ucare:grid id="UCSMP002S" width="900" height="504" no="true" crud="true">
											<tr event="O">
												<td	width="70" column="clnt_type"	title="��ü����" align="center" format="COMBO" brcode="SYS023" option="0" editable="true"></td>
												<td	width="100" column="clnt_co"	title="��ü��" align="center" editable="true"></td>
												<td width="100" column="chrg_nm" title="�����" align="center" editable="true"></td>												
												<td width="100" column="tel_no" title="��ȭ��ȣ" align="center" editable="true"></td>
												<td width="100" column="hdp_no" title="�޴���" align="center" editable="true"></td>
												<td width="156" column="em_addr" title="E-mail" editable="true"></td>
												<td width="200" column="memo" title="�޸�" editable="true"></td>
												<td width="0" column="chrg_id" title="chrg_id" editable="true"></td>
											</tr>
										</ucare:grid>		
									</td>
								</tr>
								<tr>
									<td class="MANTDM" colspan="6" align="right">
										<ucare:imgbtn name="btnAdd" kind="A" value="���߰�" onClick="lineInsert()" />
										<ucare:imgbtn name="btnDel" kind="D" value="������" onClick="removeCode()" />
										<ucare:imgbtn name="btnCancel" kind="C" onClick="removeCode()" />
										<ucare:imgbtn name="btnSave" kind="S" onClick="saveChrg()" />
									</td>
								</tr>
							</ucare:table>			
						</div>
					</td>
					<td class=MANTDM>
						<ucare:table id="tab" type="vtab" name="��<br>��<br>��<br>��<br>,��<br>ü<br>��<br>��<br>��<br>" height="200">
						</ucare:table>
					</td>
				</tr>
			</ucare:table>
		</td>
	</tr>
	
	<tr>
		<td colspan="10">
			<ucare:input type="text" name="telno" width="100" format="TEL"/>
			<ucare:imgbtn name="btnCall" value="��ȭ�ɱ�" onClick="call()"/>
			<ucare:imgbtn name="btnCall" value="��ȭ����" onClick="hookOffTel()"/>
		</td>
	</tr>
</ucare:table>
<ucare:input type="text" name="phoneStatus" width="100"/>

</form>


<!-- FROM : ��ȭ ������Ʈ �ε� -->
<OBJECT
	id="iPhone"
	classid="clsid:308867ED-D08E-4046-B35A-B41D636EEEE8"
	width=100 height=20
>
</OBJECT>

<!-- ��ȭ ������Ʈ �̺�Ʈ �ڵ鷯 �������-->
<!-- PhoneStatus ���� �ǹ� -->
<!--    0 : �ǹ̾��� -->
<!--    1 : ��ġ���ÿϷ� -->
<!--    2 : ��ġ���������Ϸ� -->
<!--    3 : ��ġ����Ϸ� -->
<!--    4 : HOOK ON -->
<!--    5 : HOOK OFF -->
<!--    6 : ��ȭ�Ŵ� �� -->
<!--    7 : ��ȭ���� �� -->
<!--    8 : ��ȭ���� ������ -->
<!--    9 : ��ȭ�ɱ� �����߻� -->
<!--    10 : �� �� ���� �����߻� -->
<SCRIPT LANGUAGE="javascript" FOR="iPhone" EVENT="OnDevStatus">
	var msgText = iPhone.PhoneStatusTOStr(iPhone.PhoneStatus);
	f.phoneStatus.value = iPhone.PhoneStatus;
	window.status = msgText;
</script>
<!--  
<script language=javascript for=ObjZiPhone event="DevBell(BellFlag)">
	// ��ȭ���Խ� ��ȭ�˸�â �˾�.
alert(BellFlag);
</script>

<script language=javascript for=ObjZiPhone event="DevCidData(CallTm, CalledNo, CalledName)">
	// CI DATA ����
	alert(CallTm+","+ CalledNo+","+ CalledName);
</script>

<script language=javascript for=ObjZiPhone event="DevGoingOut(GoingOutFlag)">
	
</script>

<script language=javascript for=ObjZiPhone event="DevHook(HookFlag)">
</script>

<script language=javascript for=ObjZiPhone event="DevInput(Key)">
	
</script>

<script language=javascript for=ObjZiPhone event="DevRecord(RecordFlag)">
	
</script>

<script language=javascript for=ObjZiPhone event="DevReverse(ReverseFlag)">
	
</script>
-->
<!-- ��ȭ ������Ʈ �̺�Ʈ �ڵ鷯 �������-->

<!-- iPhone, NPhone -->

</body>
</html>