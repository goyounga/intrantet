<%@ page language="java" contentType="text/html; charset=EUC-KR"%>
<%@ include file="/jsp/include/include.jsp"%>  
<html>
<head>
<title>타이틀</title>
<script language="javascript" src=""></script>
</head>
<body>
<form name="fQuery" method="post">

<table border=0 cellpadding=1 cellspacing=1 id=tblList width="100%">
 	<tr><td colspan=2><ucare:xtitle title="타이틀"/></td></tr>	
 	<tr>
		<td colspan=2>
			<ucare:table type="query" name="" width="100%">
				<tr>
					<td width="80" align=right >실행기간 :&nbsp;</td>
					<td width="200">
						<input type=text class=frm_text name=date_from size=10 required=true title="등록일자" pattern="D" value=""><span class=calendar onclick="return ifrmCal.service(fQuery.date_from,document.all.calDiv)"></span>&nbsp; 
						~
						<input type=text class=frm_text name=date_to size=10 required=true title="등록일자"  pattern="D" value=""><span class=calendar onclick="return ifrmCal.service(fQuery.date_to,document.all.calDiv)"></span>
					</td>
					<td width="90" align=right>캠페인유형 :&nbsp;</td>
					<td width="70">

					</td>
					<td width=85 align=right>캠페인명 :&nbsp;</td>
					<td >
						<input type=text class=frm_text name=qcamp_nm size=27 required=false>
					</td>
					<td width=1 bgcolor=#CCCCCC></td>
	 				<td width=60 align=center><ucare:imgbtn name="btnQuery" value="조회"  width="40" onClick="" classL="imgbtnLeft" classM="imgbtn" classR="imgbtnRight" /></td>
	 			</tr>		
			</ucare:table>
		</td>
	</tr>	
</form>




<form name="f" method="post"> 
	<tr>
		<td>
			<ucare:table id="UCCAM001S" rows="20"  type="list" width="800" height="232" pageman="true" summary="false" no="true">
				<tr class="LIST" event="O" >
					<td width="100" column="camp_nm" title="캠페인명" length="25"  ></td>
					<td width="100" column="camp_stts_nm" title="진행상태" align="center"  ></td>
					<td width="100" column="extract_cnt" title="추출" format="MONEY" align="right"></td>
					<td width="100" column="allot_cnt" title="할당" format="MONEY" align="right"></td>
					<td width="100" column="notallot_cnt" title="미할당" format="MONEY" align="right"></td>
					<td width="100" column="file_cnt" title="파일수" format="MONEY" align="right"></td>
					<td width="100" column="camp_st_dt" title="시작일자" format="DATE" align="center"></td>
					<td width="100" column="camp_end_dt" title="종료일자" format="DATE" align="center" ></td>
				</tr>
			</ucare:table>
		</td>
		<td>
			<ucare:table type="detail" width="300">
				<tr>
					<td class=MANTDT width=80>텍스트</td>
					<td class=MANTDM>
						<input type=text class="frm_text" name=camp_nm size=27 required="false">
					</td>
				</tr>
				<tr>
					<td class=MANTDT width=80>읽기전용</td>
					<td class=MANTDM>
						<input type=text class="frm_readonly" name=camp_nm size=27 required="false" readonly>
					</td>
				</tr>
				<tr>
					<td class=MANTDT width=80>숫자</td>
					<td class=MANTDM>
						<input type=text class="frm_number" name=camp_nm size=27 required="false" value="123456">
					</td>
				</tr>
				<tr>
					<td class=MANTDT width=80>Textarea</td>
					<td class=MANTDM>
						<textarea class="frm_textarea" name="" cols=25 rows=8></textarea>
					</td>
				</tr>
				<tr>
					<td class=MANTDT>날짜</td>
					<td class=MANTDM>
						<input type=text readonly class="frm_text" name=camp_st_dt size=23 required="false" title="시작일자" format="DATE" value="" maxlength="10">
						<span class=calendar onclick="return ifrmCal.service(f.camp_st_dt,document.all.calDiv);" ></span>
					</td>
				</tr>
				<tr>
					<td class=MANTDT>콤보박스</td>
					<td class=MANTDM><ucare:select name="" brcode="QUE001" option="4" styleClass="frm_select"/>
					</td>
				</tr>
				<tr>
					<td class=MANTDT>라디오</td>
					<td class=MANTDM>
						<input type="radio" name="radio" class="frm_radio"> 사용
						<input type="radio" name="radio" class="frm_radio"> 사용안함
						</select>
					</td>
				</tr>
				<tr>
					<td class=MANTDT>체크박스</td>
					<td class=MANTDM>
						<input type="checkbox" name="check" class="frm_checkbox"> 사용
						<input type="checkbox" name="check" class="frm_checkbox"> 사용안함
						</select>
					</td>
				</tr>
			</ucare:table>
		</td>
	</tr>
</form>




	<tr>
		<td align=right colspan=2>
			<ucare:imgbtn name="btnSave" value="저장"  width="40" onClick="" classL="imgbtnLeft" classM="imgbtn" classR="imgbtnRight" />
			<ucare:imgbtn name="btnSave" value="취소"  width="40" onClick="" classL="imgbtnLeft" classM="imgbtn" classR="imgbtnRight" />
		</td>
	</tr>
</table>
</body>
</html>



