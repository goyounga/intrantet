<%@ page language="java" contentType="text/html; charset=EUC-KR"
    pageEncoding="EUC-KR" %>
<% 	
	//response.setContentType("text/xml;charset=euc-kr");
	//response.setHeader("Cache-Control","no-chace");
	ucare.jpattern.common.actionform.ComActionForm comForm = (ucare.jpattern.common.actionform.ComActionForm)request.getAttribute("comForm");
	//CParamSet cParamSet 	= comForm.getParamset();
	ucare.jaf.database.IDataSet ds1	= null;
	StringBuffer sb = new StringBuffer();
	sb.append("<?xml version=\"1.0\" encoding=\"EUC-KR\"?>");
	sb.append("<menus>\r\n");

	try {		
		ucare.jaf.database.IDataSet ds = comForm.getDataset();
		ds.next();
		String[] ids = ds.getColumnName();
	
		ds1 = (ucare.jaf.database.IDataSet)ds.getParam(ids[0]).toObject();	//메뉴내용
		int maxcount=ds1.getMaxRowCount();
		String menuL="";
		for (int i=0; i < maxcount; i++)
		{	
			ds1.next();
			String menuid = ds1.getParam("mnu_id").asString("");
			if (menuid.substring(2,4).equals("00"))	//대분류
			{
				if (!menuL.equals("")) sb.append("\t</menu"+menuL+">\r\n");
				menuL = menuid;
				sb.append("\t<menu"+menuid+" name=\""+ds1.getParam("mnu_nm").asString("")+"\" id=\""+ds1.getParam("mnu_id").asString("")+"\" src=\""+ds1.getParam("sr_url").asString("")+"\">\r\n");
			}	
			else
				sb.append("\t\t<menu"+menuid+" src=\""+ds1.getParam("sr_url").asString("")+"\" target=\""+ds1.getParam("sr_frm_cdnm").asString("")+"\" width=\""+ds1.getParam("pup_sr_wth").asString("")+"\" height=\""+ds1.getParam("pup_sr_hgt").asString("")+"\" top=\""+ds1.getParam("pup_y_cdt").asString("")+"\" left=\""+ds1.getParam("pup_x_cdt").asString("")+"\">"+ds1.getParam("mnu_nm").asString("")+"</menu"+menuid+">\r\n");
				
		}		
		sb.append("\t</menu"+menuL+">\r\n");
		sb.append("</menus>\r\n");
		ucare.jaf.common.CUtil.writeFile(sb.toString(), ucare.jaf.common.CIni.getString("MENU_FILE_PATH"));
		
		out.println("<script>parent.msg();</script>");
	}		
	catch(Exception e) {
		e.printStackTrace();
	}
%>
