<!--
  PROJ : Intranet
  NAME : smpCSS.jsp
  DESC : CSS Sample
  Author : ���ڿ� ����
  VER  : 1.0
  Copyright 2009 Nexfron All rights reserved
  ============================================================================================
  								��		��		��		��
  ============================================================================================
  VERSION		DATE		AUTHOR		DESCRIPTION
  ============================================================================================
  1.0		2009.09.08		������		�ּ��߰�
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
		<th width=60>����</th>
		<th width=80>class name</th>
		<th width=300>sample code</th>
		<th width=200>view</th>
		<th width=100>����</th>
	</tr>
	<tr>
		<td>window</td>
		<td>class="mainbody"</td>
		<td>
			&lt;body  <font class="Borange">class="mainbody"</font>&gt;
		</td>
		<td>
			
		</td>
		<td>����������</td>
	</tr>
	<tr>
		<td>window</td>
		<td>class="pbody"</td>
		<td>
			&lt;body  <font class="Borange">class="pbody"</font>&gt;
		</td>
		<td>
			
		</td>
		<td>�˾�������</td>
	</tr>
	<tr>
		<td>table</td>
		<td>class="tblData"</td>
		<td>
			&lt;table <font class="Borange">class="tblData"</font>&gt;<br>
			&lt;tr&gt;<br>
					&lt;th>menuTabIndex&lt;/th&gt;<br>
					&lt;td id=menuTabIndex>�������� ���̽� ���͸�&lt;/td&gt;<br>
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
					<td id=menuTabIndex>�������� ���̽� ���͸�</td>
				</tr>
				<tr>
					<th>lastiIndex</th>
					<td id=lastindex></td>
				</tr>
			</table>
		</td>
		<td>������ �Ǵ� ������ ���̺� ����Ѵ�.
			<br>
			Ÿ��Ʋ�� th �� �����ͺδ� td�� tag�� �Է��Ѵ�. ���� class�� �������� �ʴ´�.</td>
	</tr>
	<tr>
		<td>table</td>
		<td>class="tblSearch"</td>
		<td>
			&lt;table <font class="Borange">class="tblSearch"</font>&gt;<br>
				&lt;tr&gt;<br>
					&lt;th>menuTabIndex&lt;/th&gt;<br>
					&lt;td id=menuTabIndex>�������� ���̽� ���͸�&lt;/td&gt;<br>
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
					<td id=menuTabIndex>�������� ���̽� ���͸�</td>
				</tr>
				<tr>
					<th>lastiIndex</th>
					<td id=lastindex></td>
				</tr>
			</table>
		</td>
		<td>��ȸ���Ǻΰ� ���� ������ ���̺� ����Ѵ�.<br>
			Ÿ��Ʋ�� th �� �����ͺδ� td�� tag�� �Է��Ѵ�. ���� class�� �������� �ʴ´�.</td>
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
					<td id=menuTabIndex>�������� ���̽� ���͸�</td>
				</tr>
				<tr>
					<th>lastiIndex</th>
					<td id=lastindex></td>
				</tr>
			</table>
		</td>
		<td>��Ÿ ������ ���̺� ����Ѵ�.</td>
	</tr>
	<tr>
		<td>button</td>
		<td>type="" �Ǵ� �����ʴ´�.</td>
		<td>
			&lt;ucare:imgbtn name="btnSave" kind="S" value="��������"/&gt;
		</td>
		<td>
			<ucare:imgbtn name="btnSave" kind="S" value="��������"/>
		</td>
		<td>��ư</td>
	</tr>
	<tr>
		<td>button</td>
		<td>type="G"</td>
		<td>
			&lt;ucare:imgbtn name="btnSave" kind="S" <font class="Borange">type="G"</font> value="��������"/&gt;
		</td>
		<td>
			<ucare:imgbtn name="btnSave" kind="S" type="G" value="��������"/>
		</td>
		<td>��ư</td>
	</tr>
	<tr>
		<td>tab</td>
		<td>tabType="_g"</td>
		<td>
			&lt;ucare:table type="tab" width="50" name="��1,��2,��3" id="tabMnt" <font class="Borange">tabType="_g"</font>&gt;
			&lt;/ucare:table&gt;
		</td>
		<td>
			<ucare:table id="moveTab2" type="tab" name="��1,��2,��3" width="50" tabType="_g">
				<tr>
					<td id="itab" style="display:" valign="top" align="left">
						<Iframe scrolling="NO" height="10" width="300" id="ifmTab1" frameborder="0" marginwidth="0" marginheight="0" framespacing="0" alias="rstQualitativeResult" src="" ></Iframe>
					</td>
				</tr>
			</ucare:table>
		</td>
		<td>��</td>
	</tr>
	<tr>
		<td>tab</td>
		<td>tabType="_g"</td>
		<td>
			&lt;ucare:table type="tab" width="50" name="��1,��2,��3" id="tabMnt" <font class="Borange">tabType="_g"  tabbox="true"</font>&gt;
			&lt;/ucare:table&gt;
		</td>
		<td>
			<ucare:table id="moveTab2" type="tab" name="��1,��2,��3" width="50" tabType="_g" tabbox="true">
				<tr>
					<td id="itab" style="display:" valign="top" align="left">
						<Iframe scrolling="NO" height="10" width="300" id="ifmTab1" frameborder="0" marginwidth="0" marginheight="0" framespacing="0" alias="rstQualitativeResult" src="" ></Iframe>
					</td>
				</tr>
			</ucare:table>
		</td>
		<td> �� �׵θ� </td>
	</tr>
	<tr>
		<td>tab</td>
		<td>tabType="" �Ǵ� �����ʴ´�.</td>
		<td>
			&lt;ucare:table type="tab" width="50" name="��1,��2,��3" id="tabMnt"&gt;
			&lt;/ucare:table&gt;
		</td>
		<td>
			<ucare:table id="moveTab2" type="tab" name="��1,��2,��3" width="50">
				<tr>
					<td id="itab" style="display:" valign="top" align="left">
						<Iframe scrolling="NO" height="10" width="300" id="ifmTab1" frameborder="0" marginwidth="0" marginheight="0" framespacing="0" alias="rstQualitativeResult" src="" ></Iframe>
					</td>
				</tr>
			</ucare:table>
		</td>
		<td>��</td>
	</tr>
	<tr>
		<td>tab</td>
		<td>tabType="" �Ǵ� �����ʴ´�.</td>
		<td>
			&lt;ucare:table type="tab" width="50" name="��1,��2,��3" id="tabMnt" <font class="Borange">tabbox="true"</font>&gt;
			&lt;/ucare:table&gt;
		</td>
		<td>
			<ucare:table id="moveTab2" type="tab" name="��1,��2,��3" width="50" tabbox="true">
				<tr>
					<td id="itab" style="display:" valign="top" align="left">
						<Iframe scrolling="NO" height="10" width="300" id="ifmTab1" frameborder="0" marginwidth="0" marginheight="0" framespacing="0" alias="rstQualitativeResult" src="" ></Iframe>
					</td>
				</tr>
			</ucare:table>
		</td>
		<td>�� �׵θ�</td>
	</tr>
	<tr>
		<td>title</td>
		<td>class="wtitle"</td>
		<td>
			&lt;td  <font class="Borange">class="wtitle"</font>&gt;���Ҹ�����&lt;/td&gt;
		</td>
		<td>
			<span class="wtitle">���Ҹ�����</span>
		</td>
		<td> ������ Ÿ��Ʋ</td>
	</tr>
	<tr>
		<td>title</td>
		<td>class="stitle"</td>
		<td>
			&lt;td  <font class="Borange">class="stitle"</font>&gt;��ǰû��&lt;/td&gt;
		</td>
		<td>
			<span class="stitle">��ǰû��</span>
		</td>
		<td>�� Ÿ��Ʋ</td>
	</tr>
	<tr>
		<td>title</td>
		<td>class="gtitle"</td>
		<td>
			&lt;td  <font class="Borange">class="gtitle"</font>&gt;��ǰû��&lt;/td&gt;
		</td>
		<td>
			<span class="gtitle">��ǰû��</span>
		</td>
		<td>�� Ÿ��Ʋ</td>
	</tr>
	<tr>
		<td>grid</td>
		<td>stylegb="" �Ǵ� �����ʴ´�.</td>
		<td>
			&lt;ucare:grid id="TEST2" width="190" height="140" no="false"&gt;
			&lt;/ucare:grid&gt;
		</td>
		<td>
			<ucare:grid id="TEST1" width="190" height="140" no="false">
			  <tr class="LIST" event="" >
				<td width="70" column="cust_id"		title="����"			align="center"></td>
				<td width="100" column="cust_nm"		title="�����Ͻ�"			align="center"></td>
			  </tr>
			</ucare:grid>
		</td>
		<td>�׸���</td>
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
				<td width="70" column="cust_id"		title="����"			align="center"></td>
				<td width="100" column="cust_nm"		title="�����Ͻ�"			align="center"></td>
			  </tr>
			</ucare:grid>
		</td>
		<td>�׸���</td>
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
		<td>ã�� ������</td>
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
		<td>�޷� ������</td>
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
		<td>Ȯ�� ������</td>
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
		<td>��� ������</td>
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
		<td>���� ������</td>
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
		<td>����(clear) ������</td>
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
		<td>Play ������</td>
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
		<td> �������̵� ������</td>
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
		<td> �����̵� ������</td>
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
		<td>���� ������</td>
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
		<td>���� ������</td>
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
		<td>��ȭ�� ������</td>
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
		<td>���� ������</td>
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
		<td>�����̵� ��ư </td>
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
		<td>�������̵� ��ư</td>
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
		<td>�����̵� ��ư</td>
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
		<td>�Ʒ����̵� ��ư</td>
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
		<td>����all�̵� ��ư </td>
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
		<td>������all�̵� ��ư</td>
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
		<td>����all�̵� ��ư</td>
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
		<td>�Ʒ���all�̵� ��ư</td>
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
		<td>minus ��ư</td>
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
		<td>plus ��ư</td>
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
			&lt;font <font class="Borange">class="blue"</font>&gt;�Ķ��۾�&lt;/font&gt;
		</td>
		<td>
			<font class="blue">�Ķ��۾�</font>
		</td>
		<td>�Ķ��۾�</td>
	</tr>
	<tr>
		<td>font</td>
		<td>class="Bblue"</td>
		<td>
			&lt;font <font class="Borange">class="Bblue"</font>&gt;�Ķ��۾�&lt;/font&gt;
		</td>
		<td>
			<font class="Bblue">�Ķ��۾�</font>
		</td>
		<td>�����Ķ��۾�</td>
	</tr>
	<tr>
		<td>font</td>
		<td>class="orange"</td>
		<td>
			&lt;font <font class="Borange">class="orange"</font>&gt;���������۾�&lt;/font&gt;
		</td>
		<td>
			<font class="orange">���������۾�</font>
		</td>
		<td>���������۾�</td>
	</tr>
	<tr>
		<td>font</td>
		<td>class="Borange"</td>
		<td>
			&lt;font <font class="Borange">class="Borange"</font>&gt;���������۾�&lt;/font&gt;
		</td>
		<td>
			<font class="Borange">���������۾�</font>
		</td>
		<td>�������������۾�</td>
	</tr>
</table>
</body>