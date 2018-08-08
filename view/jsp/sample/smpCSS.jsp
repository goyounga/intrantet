<!--
  PROJ : Intranet
  NAME : smpCSS.jsp
  DESC : CSS Sample
  Author : 임자영 차장
  VER  : 1.0
  Copyright 2009 Nexfron All rights reserved
  ============================================================================================
  								변		경		사		항
  ============================================================================================
  VERSION		DATE		AUTHOR		DESCRIPTION
  ============================================================================================
  1.0		2009.09.08		김은수		주석추가
  -->
  
<%@ page language="java" contentType="text/html; charset=EUC-KR"%>
<%@ include file="/jsp/include/include.jsp"%>
<html>	
<head>
<title></title>
<script language="javascript">
function moveTab_onclick(gb)
{
	
}

function moveTab2_onclick(gb)
{
	
}
</script>
</head>
<body topmargin="20" leftmargin="30" scroll="auto">

<table cellspacing=1 class="tblD" style="background-color:#597992;color:#597992; text-decoration:none;letter-spacing:-1px;">
	<tr>
		<th width=60>유형</th>
		<th width=80>class name</th>
		<th width=300>sample code</th>
		<th width=200>view</th>
		<th width=100>설명</th>
	</tr>
	<tr>
		<td>window</td>
		<td>class="mainbody"</td>
		<td>
			&lt;body  <font class="Borange">class="mainbody"</font>&gt;
		</td>
		<td>
			
		</td>
		<td>메인윈도우</td>
	</tr>
	<tr>
		<td>window</td>
		<td>class="pbody"</td>
		<td>
			&lt;body  <font class="Borange">class="pbody"</font>&gt;
		</td>
		<td>
			
		</td>
		<td>팝업윈도우</td>
	</tr>
	<tr>
		<td>table</td>
		<td>class="tblData"</td>
		<td>
			&lt;table <font class="Borange">class="tblData"</font>&gt;<br>
			&lt;tr&gt;<br>
					&lt;th>menuTabIndex&lt;/th&gt;<br>
					&lt;td id=menuTabIndex>에러파일 베이스 디렉터리&lt;/td&gt;<br>
				&lt;/tr&gt;<br>
			&lt;/table&gt;<br>
			
		</td>
		<td>
			<table class="tblData">
				<tr>
					<th>screenTabIndex</th>
					<td id=screenTabIndex>11111</td>
				</tr>
				<tr>
					<th>menuTabIndex</th>
					<td id=menuTabIndex>에러파일 베이스 디렉터리</td>
				</tr>
				<tr>
					<th>lastiIndex</th>
					<td id=lastindex></td>
				</tr>
			</table>
		</td>
		<td>메인이 되는 데이터 테이블에 사용한다.
			<br>
			타이틀은 th 로 데이터부는 td로 tag를 입력한다. 따로 class는 지정하지 않는다.</td>
	</tr>
	<tr>
		<td>table</td>
		<td>class="tblSearch"</td>
		<td>
			&lt;table <font class="Borange">class="tblSearch"</font>&gt;<br>
				&lt;tr&gt;<br>
					&lt;th>menuTabIndex&lt;/th&gt;<br>
					&lt;td id=menuTabIndex>에러파일 베이스 디렉터리&lt;/td&gt;<br>
				&lt;/tr&gt;<br>
			&lt;/table&gt;<br>
			
		</td>
		<td>
			<table class="tblSearch">
				<tr>
					<th>screenTabIndex</th>
					<td id=screenTabIndex>11111</td>
				</tr>
				<tr>
					<th>menuTabIndex</th>
					<td id=menuTabIndex>에러파일 베이스 디렉터리</td>
				</tr>
				<tr>
					<th>lastiIndex</th>
					<td id=lastindex></td>
				</tr>
			</table>
		</td>
		<td>조회조건부가 들어가는 데이터 테이블에 사용한다.<br>
			타이틀은 th 로 데이터부는 td로 tag를 입력한다. 따로 class는 지정하지 않는다.</td>
	</tr>
	<tr>
		<td>table</td>
		<td>class="tblData_b"</td>
		<td>
			&lt;table <font class="Borange">class="tblData_b"</font>&gt;
			&lt;/table&gt;
		</td>
		<td>
			<table class="tblData_b">
				<tr>
					<th>screenTabIndex</th>
					<td id=screenTabIndex>11111</td>
				</tr>
				<tr>
					<th>menuTabIndex</th>
					<td id=menuTabIndex>에러파일 베이스 디렉터리</td>
				</tr>
				<tr>
					<th>lastiIndex</th>
					<td id=lastindex></td>
				</tr>
			</table>
		</td>
		<td>기타 데이터 테이블에 사용한다.</td>
	</tr>
	<tr>
		<td>button</td>
		<td>type="" 또는 쓰지않는다.</td>
		<td>
			&lt;ucare:imgbtn name="btnSave" kind="S" value="접수저장"/&gt;
		</td>
		<td>
			<ucare:imgbtn name="btnSave" kind="S" value="접수저장"/>
		</td>
		<td>버튼</td>
	</tr>
	<tr>
		<td>button</td>
		<td>type="G"</td>
		<td>
			&lt;ucare:imgbtn name="btnSave" kind="S" <font class="Borange">type="G"</font> value="접수저장"/&gt;
		</td>
		<td>
			<ucare:imgbtn name="btnSave" kind="S" type="G" value="접수저장"/>
		</td>
		<td>버튼</td>
	</tr>
	<tr>
		<td>tab</td>
		<td>tabType="_g"</td>
		<td>
			&lt;ucare:table type="tab" width="50" name="탭1,탭2,탭3" id="tabMnt" <font class="Borange">tabType="_g"</font>&gt;
			&lt;/ucare:table&gt;
		</td>
		<td>
			<ucare:table id="moveTab2" type="tab" name="탭1,탭2,탭3" width="50" tabType="_g">
				<tr>
					<td id="itab" style="display:" valign="top" align="left">
						<Iframe scrolling="NO" height="10" width="300" id="ifmTab1" frameborder="0" marginwidth="0" marginheight="0" framespacing="0" alias="rstQualitativeResult" src="" ></Iframe>
					</td>
				</tr>
			</ucare:table>
		</td>
		<td>탭</td>
	</tr>
	<tr>
		<td>tab</td>
		<td>tabType="_g"</td>
		<td>
			&lt;ucare:table type="tab" width="50" name="탭1,탭2,탭3" id="tabMnt" <font class="Borange">tabType="_g"  tabbox="true"</font>&gt;
			&lt;/ucare:table&gt;
		</td>
		<td>
			<ucare:table id="moveTab2" type="tab" name="탭1,탭2,탭3" width="50" tabType="_g" tabbox="true">
				<tr>
					<td id="itab" style="display:" valign="top" align="left">
						<Iframe scrolling="NO" height="10" width="300" id="ifmTab1" frameborder="0" marginwidth="0" marginheight="0" framespacing="0" alias="rstQualitativeResult" src="" ></Iframe>
					</td>
				</tr>
			</ucare:table>
		</td>
		<td> 탭 테두리 </td>
	</tr>
	<tr>
		<td>tab</td>
		<td>tabType="" 또는 쓰지않는다.</td>
		<td>
			&lt;ucare:table type="tab" width="50" name="탭1,탭2,탭3" id="tabMnt"&gt;
			&lt;/ucare:table&gt;
		</td>
		<td>
			<ucare:table id="moveTab2" type="tab" name="탭1,탭2,탭3" width="50">
				<tr>
					<td id="itab" style="display:" valign="top" align="left">
						<Iframe scrolling="NO" height="10" width="300" id="ifmTab1" frameborder="0" marginwidth="0" marginheight="0" framespacing="0" alias="rstQualitativeResult" src="" ></Iframe>
					</td>
				</tr>
			</ucare:table>
		</td>
		<td>탭</td>
	</tr>
	<tr>
		<td>tab</td>
		<td>tabType="" 또는 쓰지않는다.</td>
		<td>
			&lt;ucare:table type="tab" width="50" name="탭1,탭2,탭3" id="tabMnt" <font class="Borange">tabbox="true"</font>&gt;
			&lt;/ucare:table&gt;
		</td>
		<td>
			<ucare:table id="moveTab2" type="tab" name="탭1,탭2,탭3" width="50" tabbox="true">
				<tr>
					<td id="itab" style="display:" valign="top" align="left">
						<Iframe scrolling="NO" height="10" width="300" id="ifmTab1" frameborder="0" marginwidth="0" marginheight="0" framespacing="0" alias="rstQualitativeResult" src="" ></Iframe>
					</td>
				</tr>
			</ucare:table>
		</td>
		<td>탭 테두리</td>
	</tr>
	<tr>
		<td>title</td>
		<td>class="wtitle"</td>
		<td>
			&lt;td  <font class="Borange">class="wtitle"</font>&gt;고객불만관리&lt;/td&gt;
		</td>
		<td>
			<span class="wtitle">고객불만관리</span>
		</td>
		<td> 윈도우 타이틀</td>
	</tr>
	<tr>
		<td>title</td>
		<td>class="stitle"</td>
		<td>
			&lt;td  <font class="Borange">class="stitle"</font>&gt;부품청구&lt;/td&gt;
		</td>
		<td>
			<span class="stitle">부품청구</span>
		</td>
		<td>소 타이틀</td>
	</tr>
	<tr>
		<td>title</td>
		<td>class="gtitle"</td>
		<td>
			&lt;td  <font class="Borange">class="gtitle"</font>&gt;부품청구&lt;/td&gt;
		</td>
		<td>
			<span class="gtitle">부품청구</span>
		</td>
		<td>소 타이틀</td>
	</tr>
	<tr>
		<td>grid</td>
		<td>stylegb="" 또는 쓰지않는다.</td>
		<td>
			&lt;ucare:grid id="TEST2" width="190" height="140" no="false"&gt;
			&lt;/ucare:grid&gt;
		</td>
		<td>
			<ucare:grid id="TEST1" width="190" height="140" no="false">
			  <tr class="LIST" event="" >
				<td width="70" column="cust_id"		title="성명"			align="center"></td>
				<td width="100" column="cust_nm"		title="접수일시"			align="center"></td>
			  </tr>
			</ucare:grid>
		</td>
		<td>그리드</td>
	</tr>
	<tr>
		<td>grid</td>
		<td>stylegb="Green"</td>
		<td>
			&lt;ucare:grid id="TEST2" width="190" height="140" no="false" <font class="Borange">stylegb="Green"</font>&gt;
			&lt;/ucare:grid&gt;
		</td>
		<td>
			<ucare:grid id="TEST2" width="190" height="140" no="false" stylegb="Green">
			  <tr class="LIST" event="" >
				<td width="70" column="cust_id"		title="성명"			align="center"></td>
				<td width="100" column="cust_nm"		title="접수일시"			align="center"></td>
			  </tr>
			</ucare:grid>
		</td>
		<td>그리드</td>
	</tr>
	<tr>
		<td>icon</td>
		<td>class="search"</td>
		<td>
			&lt;span <font class="Borange">class="search"</font> &gt;&lt;/span&gt;
		</td>
		<td>
			<span class="search"></span>
		</td>
		<td>찾기 아이콘</td>
	</tr>
	<tr>
		<td>icon</td>
		<td>class="calendar"</td>
		<td>
			&lt;span <font class="Borange">class="calendar"</font> &gt;&lt;/span&gt;
		</td>
		<td>
			<span class="calendar"></span>
		</td>
		<td>달력 아이콘</td>
	</tr>
		<tr>
		<td>icon</td>
		<td>class="zoomin"</td>
		<td>
			&lt;span <font class="Borange">class="zoomin"</font> &gt;&lt;/span&gt;
		</td>
		<td>
			<span class="zoomin"></span>
		</td>
		<td>확대 아이콘</td>
	</tr>
	<tr>
		<td>icon</td>
		<td>class="zoomout"</td>
		<td>
			&lt;span <font class="Borange">class="zoomout"</font> &gt;&lt;/span&gt;
		</td>
		<td>
			<span class="zoomout"></span>
		</td>
		<td>축소 아이콘</td>
	</tr>
	<tr>
		<td>icon</td>
		<td>class="copy"</td>
		<td>
			&lt;span <font class="Borange">class="copy"</font> &gt;&lt;/span&gt;
		</td>
		<td>
			<span class="copy"></span>
		</td>
		<td>복사 아이콘</td>
	</tr>
	<tr>
		<td>icon</td>
		<td>class="clear"</td>
		<td>
			&lt;span <font class="Borange">class="clear"</font> &gt;&lt;/span&gt;
		</td>
		<td>
			<span class="clear"></span>
		</td>
		<td>삭제(clear) 아이콘</td>
	</tr>
	<tr>
		<td>icon</td>
		<td>class="play"</td>
		<td>
			&lt;span <font class="Borange">class="play"</font> &gt;&lt;/span&gt;
		</td>
		<td>
			<span class="play"></span>
		</td>
		<td>Play 아이콘</td>
	</tr>
	<tr>
		<td>icon</td>
		<td>class="moveright"</td>
		<td>
			&lt;span <font class="Borange">class="moveright"</font> &gt;&lt;/span&gt;
		</td>
		<td>
			<span class="moveright"></span>
		</td>
		<td> 오른쪽이동 아이콘</td>
	</tr>
	<tr>
		<td>icon</td>
		<td>class="moveleft"</td>
		<td>
			&lt;span <font class="Borange">class="moveleft"</font> &gt;&lt;/span&gt;
		</td>
		<td>
			<span class="moveleft"></span>
		</td>
		<td> 왼쪽이동 아이콘</td>
	</tr>
	<tr>
		<td>icon</td>
		<td>class="doc"</td>
		<td>
			&lt;span <font class="Borange">class="doc"</font> &gt;&lt;/span&gt;
		</td>
		<td>
			<span class="doc"></span>
		</td>
		<td>문서 아이콘</td>
	</tr>
	<tr>
		<td>icon</td>
		<td>class="save"</td>
		<td>
			&lt;span <font class="Borange">class="save"</font> &gt;&lt;/span&gt;
		</td>
		<td>
			<span class="save"></span>
		</td>
		<td>저장 아이콘</td>
	</tr>
		<tr>
		<td>icon</td>
		<td>class="phone"</td>
		<td>
			&lt;span <font class="Borange">class="phone"</font> &gt;&lt;/span&gt;
		</td>
		<td>
			<span class="phone"></span>
		</td>
		<td>전화기 아이콘</td>
	</tr>
		<tr>
		<td>icon</td>
		<td>class="picture"</td>
		<td>
			&lt;span <font class="Borange">class="picture"</font> &gt;&lt;/span&gt;
		</td>
		<td>
			<span class="picture"></span>
		</td>
		<td>사진 아이콘</td>
	</tr>
	<tr>
		<td>icon_button</td>
		<td>class="left"</td>
		<td>
			&lt;span <font class="Borange">class="left"</font> &gt;&lt;/span&gt;
		</td>
		<td>
			<span class="left"></span>
		</td>
		<td>왼쪽이동 버튼 </td>
	</tr>
	<tr>
		<td>icon_button</td>
		<td>class="right"</td>
		<td>
			&lt;span <font class="Borange">class="right"</font> &gt;&lt;/span&gt;
		</td>
		<td>
			<span class="right"></span>
		</td>
		<td>오른쪽이동 버튼</td>
	</tr>
	<tr>
		<td>icon_button</td>
		<td>class="up"</td>
		<td>
			&lt;span <font class="Borange">class="up"</font> &gt;&lt;/span&gt;
		</td>
		<td>
			<span class="up"></span>
		</td>
		<td>위로이동 버튼</td>
	</tr>
	<tr>
		<td>icon_button</td>
		<td>class="down"</td>
		<td>
			&lt;span <font class="Borange">class="down"</font> &gt;&lt;/span&gt;
		</td>
		<td>
			<span class="down"></span>
		</td>
		<td>아래로이동 버튼</td>
	</tr>
	<tr>
		<td>icon_button</td>
		<td>class="leftall"</td>
		<td>
			&lt;span <font class="Borange">class="leftall"</font> &gt;&lt;/span&gt;
		</td>
		<td>
			<span class="leftall"></span>
		</td>
		<td>왼쪽all이동 버튼 </td>
	</tr>
	<tr>
		<td>icon_button</td>
		<td>class="rightall"</td>
		<td>
			&lt;span <font class="Borange">class="rightall"</font> &gt;&lt;/span&gt;
		</td>
		<td>
			<span class="rightall"></span>
		</td>
		<td>오른쪽all이동 버튼</td>
	</tr>
	<tr>
		<td>icon_button</td>
		<td>class="upall"</td>
		<td>
			&lt;span <font class="Borange">class="upall"</font> &gt;&lt;/span&gt;
		</td>
		<td>
			<span class="upall"></span>
		</td>
		<td>위로all이동 버튼</td>
	</tr>
	<tr>
		<td>icon_button</td>
		<td>class="downall"</td>
		<td>
			&lt;span <font class="Borange">class="downall"</font> &gt;&lt;/span&gt;
		</td>
		<td>
			<span class="downall"></span>
		</td>
		<td>아래로all이동 버튼</td>
	</tr>
	<tr>
		<td>icon_button</td>
		<td>class="minus"</td>
		<td>
			&lt;span <font class="Borange">class="minus"</font> &gt;&lt;/span&gt;
		</td>
		<td>
			<span class="minus"></span>
		</td>
		<td>minus 버튼</td>
	</tr>
	<tr>
		<td>icon_button</td>
		<td>class="plus"</td>
		<td>
			&lt;span <font class="Borange">class="plus"</font> &gt;&lt;/span&gt;
		</td>
		<td>
			<span class="plus"></span>
		</td>
		<td>plus 버튼</td>
	</tr>
	<tr>
		<td>icon_button</td>
		<td>class="new"</td>
		<td>
			&lt;span <font class="Borange">class="new"</font> &gt;&lt;/span&gt;
		</td>
		<td>
			<span class="new"></span>
		</td>
		<td>new</td>
	</tr>
	<tr>
		<td>font</td>
		<td>class="blue"</td>
		<td>
			&lt;font <font class="Borange">class="blue"</font>&gt;파란글씨&lt;/font&gt;
		</td>
		<td>
			<font class="blue">파란글씨</font>
		</td>
		<td>파란글씨</td>
	</tr>
	<tr>
		<td>font</td>
		<td>class="Bblue"</td>
		<td>
			&lt;font <font class="Borange">class="Bblue"</font>&gt;파란글씨&lt;/font&gt;
		</td>
		<td>
			<font class="Bblue">파란글씨</font>
		</td>
		<td>굵은파란글씨</td>
	</tr>
	<tr>
		<td>font</td>
		<td>class="orange"</td>
		<td>
			&lt;font <font class="Borange">class="orange"</font>&gt;오렌지색글씨&lt;/font&gt;
		</td>
		<td>
			<font class="orange">오렌지색글씨</font>
		</td>
		<td>오렌지색글씨</td>
	</tr>
	<tr>
		<td>font</td>
		<td>class="Borange"</td>
		<td>
			&lt;font <font class="Borange">class="Borange"</font>&gt;오렌지색글씨&lt;/font&gt;
		</td>
		<td>
			<font class="Borange">오렌지색글씨</font>
		</td>
		<td>굵은오렌지색글씨</td>
	</tr>
</table>
</body>