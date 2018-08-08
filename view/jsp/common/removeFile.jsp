<%	ucare.jpattern.common.actionform.ComActionForm comForm = null;
	ucare.jaf.common.CParamSet 	cParamSet 	= null;
	ucare.jaf.database.IDataSet iDataSet 	= null;
	ucare.jaf.database.IDataSet aDataSet 	= null;

	String path 			= "";
	String filePath		= null;
	String fileName		= null;
	String folderName   = "";
	int iCount = 0;

	try
	{
		comForm 	 = (ucare.jpattern.common.actionform.ComActionForm)request.getAttribute("comForm");
		cParamSet 	 = comForm.getParamset();
		
		response.setContentType("text/xml;charset=euc-kr");
	
		response.setHeader("Cache-Control","no-chace");
		request.setCharacterEncoding("EUC-KR");
		
		filePath 	 = cParamSet.getParam("filepath").asString("UPLOAD_PATH");
		folderName 	 = cParamSet.getParam("foldername").asString("");
		fileName 	 = cParamSet.getParam("filename").asString("");
		
		//File Path
		if ("".equals(filePath))
		{
			filePath = "UPLOAD_PATH";
		}
		path = ucare.jaf.common.CIni.getParam(filePath).asString();
		//폴더명이 있을 경우 경로에 폴더명 추가
		if(!folderName.equals(""))
		{
			path += "/" + folderName;
		}
	
		String[] temp = ucare.jaf.common.CUtil.split(fileName, "");

		for (int i=0; i < temp.length;i++)
		{
			String sFile = temp[i];
			ucare.jaf.common.ILogger.log.error("removeFile path : " + path +",fileName="+sFile);
			if (ucare.jaf.common.CFileUtil.removeFile(path, sFile) == true) iCount++;
		}
		
	}
	catch (Exception e)
	{
		ucare.jaf.common.ILogger.log.error("removeFile Exception : " + e.getMessage());
	}
	
	// 파일삭제결과 정보
	aDataSet = new ucare.jaf.database.CDataSet();
	String[] name  = { "SUCCEESS_COUNT" };
	String[] value = { String.valueOf(iCount)     }; 
	
	aDataSet.addNewRow(name, value);
	aDataSet.setViewType("none");
	
	//
	iDataSet = new ucare.jaf.database.CDataSet();

	String[] sKeys = {cParamSet.getParam("_SERVICE_ID").asString("removefile")};
	ucare.jaf.database.IDataSet[] sVals = {aDataSet};

	iDataSet.addNewRow(sKeys, sVals);
	
	// xml 구성
	StringBuffer datasetSb = new StringBuffer();

	try
	{
		String dataxml= ucare.jpattern.xmlhandler.CXmlDataSet.getXml(cParamSet,iDataSet);
		datasetSb.append(dataxml);										//comform to Data xml
	}catch(Exception e){
		datasetSb.delete(0,datasetSb.length());
		datasetSb.append(ucare.jpattern.xmlhandler.CXmlDataSet.errorXml(this.getClass().getName(),"9000",this.getClass().getName(),e.getMessage()));
	}finally{
		if(ucare.jaf.common.CIni.getString("APP_SERVER").equals("tomcat") || ucare.jaf.common.CIni.getString("APP_SERVER").equals("websphere"))
			out.print(new String(datasetSb.toString().getBytes("KSC5601"),"8859_1"));
		else
			out.print(datasetSb.toString());
	}%>