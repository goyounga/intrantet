<%@ page pageEncoding="UTF-8"
		 import =  "java.net.*,
					java.io.*,
					ucare.jaf.database.IDataSet,
					ucare.jaf.common.CParamSet,
					ucare.jaf.common.*,
					ucare.jaf.common.ILogger,
					ucare.jaf.common.CCrypto,
					ucare.jpattern.service.ServiceManagerBean,
					ucare.jpattern.common.actionform.ComActionForm"%>
<%!				
	private void setCookie(HttpServletResponse res, String sKey, String sVal)
	{
		try
		{
			sVal = URLEncoder.encode(sVal, "UTF-8");
		}
		catch (UnsupportedEncodingException e)
		{
			e.printStackTrace();
		}
		Cookie cookie = new Cookie(sKey, sVal);
		cookie.setMaxAge(60*60*24*30);
		cookie.setPath("/");
		res.addCookie(cookie);
		return;
	}

public String Nf_Encode(String code)
{
	if(code != null){
		//암호화 키
		String strkey = "NE&SH#!K";           // 암호화 키
		byte keyChar[] = new byte[strkey.getBytes().length];
		keyChar = strkey.getBytes();

		//암호화할 대상
		byte codeChar[] = new byte[code.getBytes().length];
		codeChar = code.getBytes();

		//XOR 연산
		for(int i=0, j=0; i< code.getBytes().length; i++)
		{
			codeChar[i] = (byte) (codeChar[i] ^ keyChar[j]);
			j = (++j < keyChar.length ? j : 0);
		}

		return new String(codeChar) ; //byte배열인 code를 String으로 변환하여 반환한다.
	}
	else {
		return "";
	}
}

%>
<%	response.setContentType("text/html;charset=utf-8");
	response.setHeader("Cache-Control","no-chace");
	StringBuffer datasetSb	= new StringBuffer("");
	String userId = request.getParameter("user_id");
	setCookie(response, "userid", Nf_Encode(URLDecoder.decode(userId, "euc-kr")) );
	setCookie(response, "intranet_userid", Nf_Encode(URLDecoder.decode(userId, "euc-kr")) );

//	session.setAttribute("userId",			userId);		// 사용자ID
	String sParam="";
	if (!CUtil.nvl(request.getParameter("menu_id"), "").equals("")) sParam = "?menu_id="+request.getParameter("menu_id");
	response.sendRedirect("/jsp/main/main.jsp"+sParam);
	
	ILogger.log.debug("loginAct....debug4___________");
	ILogger.log.debug("TimeStamp...."+CDateUtil.getToday());
	
%>
