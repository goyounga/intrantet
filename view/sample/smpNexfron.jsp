<%@ page language="java" contentType="text/html; charset=euc-kr"%>
<%@ include file="/jsp/include/include.jsp"%> 
<html>
<head>
	<title>넥스프론 직원 조회</title>
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
						<!-- 넥스프론 -->
						<div id="vtabview" style="display:; width:900; height:500">
							<ucare:table type="detail" width="900">
								<tr>
									<td class=MANTDT width=80>이름</td>
									<td class=MANTDM>
										<ucare:input type="text" name="user_nm" width="100" mode="active" tag="onKeyUp=\"pressEnter('searchUser()')\"" />
										<ucare:imgbtn name="btnSearch" value="조회" onClick="searchUser()" />
									</td>
								</tr>
								<tr>
									<td class="MANTDM" colspan="2">
										<!-- 리스트  -->
										<ucare:grid id="UCSMP001S" width="500" height="504" no="true">
											<tr event="O">
												<td width="100" column="user_nm" title="이름" align="center"></td>
												<td	width="60" column="pos_nm"	title="직급" align="center"></td>
												<td width="100" column="hdp_no" title="휴대폰" align="center"></td>
												<td width="200" column="em_addr" title="E-mail"></td>
											</tr>
										</ucare:grid>		
									</td>
								</tr>
							</ucare:table>		
						</div>
						<!-- 업체 -->
						<div id="vtabview" style="display:none; width:900; height:500">
							<ucare:table type="detail" width="900">
								<tr>
									<td class=MANTDT width=80>업체구분</td>
									<td class=MANTDM>
										<ucare:select name="q_clnt_type" brcode="SYS023" width="100" option="10"/>
									</td>
									<td class=MANTDT width=80>업체명</td>
									<td class=MANTDM>
										<ucare:input type="text" name="q_clnt_co" width="100" mode="active" tag="onKeyUp=\"pressEnter('searchChrg()')\"" />
									</td>
									<td class=MANTDT width=80>이름</td>
									<td class=MANTDM>
										<ucare:input type="text" name="q_chrg_nm" width="100" mode="active" tag="onKeyUp=\"pressEnter('searchChrg()')\"" />
										<ucare:imgbtn name="btnSearch" value="조회" onClick="searchChrg()" />
									</td>
								</tr>
								<tr>
									<td class="MANTDM" colspan="6">
										<!-- 리스트  -->
										<ucare:grid id="UCSMP002S" width="900" height="504" no="true" crud="true">
											<tr event="O">
												<td	width="70" column="clnt_type"	title="업체구분" align="center" format="COMBO" brcode="SYS023" option="0" editable="true"></td>
												<td	width="100" column="clnt_co"	title="업체명" align="center" editable="true"></td>
												<td width="100" column="chrg_nm" title="담당자" align="center" editable="true"></td>												
												<td width="100" column="tel_no" title="전화번호" align="center" editable="true"></td>
												<td width="100" column="hdp_no" title="휴대폰" align="center" editable="true"></td>
												<td width="156" column="em_addr" title="E-mail" editable="true"></td>
												<td width="200" column="memo" title="메모" editable="true"></td>
												<td width="0" column="chrg_id" title="chrg_id" editable="true"></td>
											</tr>
										</ucare:grid>		
									</td>
								</tr>
								<tr>
									<td class="MANTDM" colspan="6" align="right">
										<ucare:imgbtn name="btnAdd" kind="A" value="열추가" onClick="lineInsert()" />
										<ucare:imgbtn name="btnDel" kind="D" value="열삭제" onClick="removeCode()" />
										<ucare:imgbtn name="btnCancel" kind="C" onClick="removeCode()" />
										<ucare:imgbtn name="btnSave" kind="S" onClick="saveChrg()" />
									</td>
								</tr>
							</ucare:table>			
						</div>
					</td>
					<td class=MANTDM>
						<ucare:table id="tab" type="vtab" name="넥<br>스<br>프<br>론<br>,업<br>체<br>담<br>당<br>자<br>" height="200">
						</ucare:table>
					</td>
				</tr>
			</ucare:table>
		</td>
	</tr>
	
	<tr>
		<td colspan="10">
			<ucare:input type="text" name="telno" width="100" format="TEL"/>
			<ucare:imgbtn name="btnCall" value="전화걸기" onClick="call()"/>
			<ucare:imgbtn name="btnCall" value="전화끊기" onClick="hookOffTel()"/>
		</td>
	</tr>
</ucare:table>
<ucare:input type="text" name="phoneStatus" width="100"/>

</form>


<!-- FROM : 전화 컴포넌트 로드 -->
<OBJECT
	id="iPhone"
	classid="clsid:308867ED-D08E-4046-B35A-B41D636EEEE8"
	width=100 height=20
>
</OBJECT>

<!-- 전화 컴포넌트 이벤트 핸들러 여기부터-->
<!-- PhoneStatus 값의 의미 -->
<!--    0 : 의미없음 -->
<!--    1 : 장치선택완료 -->
<!--    2 : 장치연결해제완료 -->
<!--    3 : 장치연결완료 -->
<!--    4 : HOOK ON -->
<!--    5 : HOOK OFF -->
<!--    6 : 전화거는 중 -->
<!--    7 : 전화오는 중 -->
<!--    8 : 전화오다 끊어짐 -->
<!--    9 : 전화걸기 오류발생 -->
<!--    10 : 알 수 없는 오류발생 -->
<SCRIPT LANGUAGE="javascript" FOR="iPhone" EVENT="OnDevStatus">
	var msgText = iPhone.PhoneStatusTOStr(iPhone.PhoneStatus);
	f.phoneStatus.value = iPhone.PhoneStatus;
	window.status = msgText;
</script>
<!--  
<script language=javascript for=ObjZiPhone event="DevBell(BellFlag)">
	// 전화인입시 전화알림창 팝업.
alert(BellFlag);
</script>

<script language=javascript for=ObjZiPhone event="DevCidData(CallTm, CalledNo, CalledName)">
	// CI DATA 인입
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
<!-- 전화 컴포넌트 이벤트 핸들러 여기까지-->

<!-- iPhone, NPhone -->

</body>
</html>