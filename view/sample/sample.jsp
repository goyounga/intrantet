<%@ page language="java" contentType="text/html; charset=EUC-KR"%>
<%@ include file="/jsp/include/include.jsp"%>  
<html>
<head>
<title>Ÿ��Ʋ</title>
<script language="javascript" src=""></script>
</head>
<body>
<form name="fQuery" method="post">

<table border=0 cellpadding=1 cellspacing=1 id=tblList width="100%">
 	<tr><td colspan=2><ucare:xtitle title="Ÿ��Ʋ"/></td></tr>	
 	<tr>
		<td colspan=2>
			<ucare:table type="query" name="" width="100%">
				<tr>
					<td width="80" align=right >����Ⱓ :&nbsp;</td>
					<td width="200">
						<input type=text class=frm_text name=date_from size=10 required=true title="�������" pattern="D" value=""><span class=calendar onclick="return ifrmCal.service(fQuery.date_from,document.all.calDiv)"></span>&nbsp; 
						~
						<input type=text class=frm_text name=date_to size=10 required=true title="�������"  pattern="D" value=""><span class=calendar onclick="return ifrmCal.service(fQuery.date_to,document.all.calDiv)"></span>
					</td>
					<td width="90" align=right>ķ�������� :&nbsp;</td>
					<td width="70">

					</td>
					<td width=85 align=right>ķ���θ� :&nbsp;</td>
					<td >
						<input type=text class=frm_text name=qcamp_nm size=27 required=false>
					</td>
					<td width=1 bgcolor=#CCCCCC></td>
	 				<td width=60 align=center><ucare:imgbtn name="btnQuery" value="��ȸ"  width="40" onClick="" classL="imgbtnLeft" classM="imgbtn" classR="imgbtnRight" /></td>
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
					<td width="100" column="camp_nm" title="ķ���θ�" length="25"  ></td>
					<td width="100" column="camp_stts_nm" title="�������" align="center"  ></td>
					<td width="100" column="extract_cnt" title="����" format="MONEY" align="right"></td>
					<td width="100" column="allot_cnt" title="�Ҵ�" format="MONEY" align="right"></td>
					<td width="100" column="notallot_cnt" title="���Ҵ�" format="MONEY" align="right"></td>
					<td width="100" column="file_cnt" title="���ϼ�" format="MONEY" align="right"></td>
					<td width="100" column="camp_st_dt" title="��������" format="DATE" align="center"></td>
					<td width="100" column="camp_end_dt" title="��������" format="DATE" align="center" ></td>
				</tr>
			</ucare:table>
		</td>
		<td>
			<ucare:table type="detail" width="300">
				<tr>
					<td class=MANTDT width=80>�ؽ�Ʈ</td>
					<td class=MANTDM>
						<input type=text class="frm_text" name=camp_nm size=27 required="false">
					</td>
				</tr>
				<tr>
					<td class=MANTDT width=80>�б�����</td>
					<td class=MANTDM>
						<input type=text class="frm_readonly" name=camp_nm size=27 required="false" readonly>
					</td>
				</tr>
				<tr>
					<td class=MANTDT width=80>����</td>
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
					<td class=MANTDT>��¥</td>
					<td class=MANTDM>
						<input type=text readonly class="frm_text" name=camp_st_dt size=23 required="false" title="��������" format="DATE" value="" maxlength="10">
						<span class=calendar onclick="return ifrmCal.service(f.camp_st_dt,document.all.calDiv);" ></span>
					</td>
				</tr>
				<tr>
					<td class=MANTDT>�޺��ڽ�</td>
					<td class=MANTDM><ucare:select name="" brcode="QUE001" option="4" styleClass="frm_select"/>
					</td>
				</tr>
				<tr>
					<td class=MANTDT>����</td>
					<td class=MANTDM>
						<input type="radio" name="radio" class="frm_radio"> ���
						<input type="radio" name="radio" class="frm_radio"> ������
						</select>
					</td>
				</tr>
				<tr>
					<td class=MANTDT>üũ�ڽ�</td>
					<td class=MANTDM>
						<input type="checkbox" name="check" class="frm_checkbox"> ���
						<input type="checkbox" name="check" class="frm_checkbox"> ������
						</select>
					</td>
				</tr>
			</ucare:table>
		</td>
	</tr>
</form>




	<tr>
		<td align=right colspan=2>
			<ucare:imgbtn name="btnSave" value="����"  width="40" onClick="" classL="imgbtnLeft" classM="imgbtn" classR="imgbtnRight" />
			<ucare:imgbtn name="btnSave" value="���"  width="40" onClick="" classL="imgbtnLeft" classM="imgbtn" classR="imgbtnRight" />
		</td>
	</tr>
</table>
</body>
</html>



