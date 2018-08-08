package ucare.biz.common.bean;

import java.io.Serializable;
import java.util.Properties;
import java.util.StringTokenizer;

import ucare.jaf.common.CUtil;

public class SessionInfo implements Serializable
{
	Properties userProperty	 		= new Properties();				// 사용자정보
	Properties ctiProperty			= new Properties();				// CTI 관련 정보
	Properties custProperty			= new Properties();				// 고객정보

	// 상담원 정보(GET)
	public String getUserID()									{ return CUtil.nvl(userProperty.getProperty("USERID"));}			// 상담원 ID
	public String getUserName()									{ return CUtil.nvl(userProperty.getProperty("USERNAME"));}			// 상담원 명
	public String getUserRID()									{ return CUtil.nvl(userProperty.getProperty("USERRID"));}			// 상담원 주민번호
	public String getUserGradeCD()								{ return CUtil.nvl(userProperty.getProperty("USERGRADECD"));}		// 상담원 등급코드
	public String getUserPartCD()								{ return CUtil.nvl(userProperty.getProperty("USERPARTCD"));}		// 상담원 부서
	public String getUserPositionCD()							{ return CUtil.nvl(userProperty.getProperty("USERPOSITIONCD"));}	// 상담원 직책코드
	public String getUserMenuGroupID()							{ return CUtil.nvl(userProperty.getProperty("USERMENUGROUPID"));}	// 상담원 메뉴 그룹 ID
	public String getUserInLine()								{ return CUtil.nvl(userProperty.getProperty("USERINLINE"));}		// 상담원 내선번호
	public String getUserLoginIP()								{ return CUtil.nvl(userProperty.getProperty("USERLOGINIP"));}		// 상담원 IP Address
	public String getUserLoginDT()								{ return CUtil.nvl(userProperty.getProperty("USERLOGINDT"));}		// 상담원 로그인 일자
	public String getUserLoginTM()								{ return CUtil.nvl(userProperty.getProperty("USERLOGINTM"));}		// 상담원 로그인 시간 
	public String getUserMessageID()							{ return CUtil.nvl(userProperty.getProperty("USERMESSAGEID"));}		// 상담원 최종 억세스 메세지 ID
	public String getUserCtiLoginID()							{ return CUtil.nvl(userProperty.getProperty("USERCTILOGINID"));}	// 상담원 CTI 로그인 ID
	public String getUserCtiLoginPWD()							{ return CUtil.nvl(userProperty.getProperty("USERCTILOGINPWD"));}	// 상담원 CTI 로그인 PWD
	public String getUserAgentYN()								{ return CUtil.nvl(userProperty.getProperty("USERAGENTYN"));}		// 사용자 대리점 여부
	public String getUserAgentCode()							{ return CUtil.nvl(userProperty.getProperty("USERAGENTCODE"));}		// 사용자 대리점 여부
	public String getUserCorpID()								{ return CUtil.nvl(userProperty.getProperty("CORPID"));}			// 업체코드
	public String getUserCorpName()								{ return CUtil.nvl(userProperty.getProperty("CORPNAME"));}			// 업체명
	public String getUserPrjID()								{ return CUtil.nvl(userProperty.getProperty("USERPRJID"));}			// 프로젝트 ID	
	public String getViewOrg1Cd()								{ return CUtil.nvl(userProperty.getProperty("VIEWORG1CD"));}		// 신조직코드1
	public String getViewOrg2Cd()								{ return CUtil.nvl(userProperty.getProperty("VIEWORG2CD"));}		// 신조직코드2
	public String getViewOrg3Cd()								{ return CUtil.nvl(userProperty.getProperty("VIEWORG3CD"));}		// 신조직코드3
	
	// 상담원 정보 (SET)
	public void setUserID(String userid)						{ userProperty.setProperty("USERID", userid);} 	
	public void setUserName(String username)					{ userProperty.setProperty("USERNAME", username);}
	public void setUserRID(String userrid)						{ userProperty.setProperty("USERRID", userrid);}
	public void setUserGradeCD(String usergradecd)				{ userProperty.setProperty("USERGRADECD", usergradecd);}
	public void setUserPartCD(String userpartcd)				{ userProperty.setProperty("USERPARTCD", userpartcd);}
	public void setUserPositionCD(String userpositioncd)		{ userProperty.setProperty("USERPOSITIONCD", userpositioncd);}
	public void setUserMenuGroupID(String usermenugroupid)		{ userProperty.setProperty("USERMENUGROUPID", usermenugroupid);}
	public void setUserInLine(String userinline)				{ userProperty.setProperty("USERINLINE", userinline);}
	public void setUserLoginIP(String userloginip)				{ userProperty.setProperty("USERLOGINIP", userloginip);}
	public void setUserLoginDT(String userlogindt)				{ userProperty.setProperty("USERLOGINDT", userlogindt);}
	public void setUserLoginTM(String userlogintm)				{ userProperty.setProperty("USERLOGINTM", userlogintm);}
	public void setUserMessageID(String usermessageid)			{ userProperty.setProperty("USERMESSAGEID", usermessageid);}
	public void setUserCtiLoginID(String userctiloginid)		{ userProperty.setProperty("USERCTILOGINID", userctiloginid);}
	public void setUserCtiLoginPWD(String userctiloginpwd)		{ userProperty.setProperty("USERCTILOGINPWD", userctiloginpwd);}
	public void setUserAgentYN(String useragentyn)				{ userProperty.setProperty("USERAGENTYN", useragentyn);}
	public void setUserAgentCode(String useragentcode)			{ userProperty.setProperty("USERAGENTCODE", useragentcode);}
	public void setUserCorpID(String corpid)					{ userProperty.setProperty("CORPID", corpid);}
	public void setUserCorpName(String corpname)				{ userProperty.setProperty("CORPNAME", corpname);}
	public void setUserPrjID(String userprjid)					{ userProperty.setProperty("USERPRJID", userprjid);}
	public void setViewOrg1Cd(String vieworg1cd)				{ userProperty.setProperty("VIEWORG1CD", vieworg1cd);}
	public void setViewOrg2Cd(String vieworg2cd)				{ userProperty.setProperty("VIEWORG2CD", vieworg2cd);}
	public void setViewOrg3Cd(String vieworg3cd)				{ userProperty.setProperty("VIEWORG3CD", vieworg3cd);}
			
	// 고객정보 (GET)
	public String getCustKey()									{ return CUtil.nvl(custProperty.getProperty("CUSTNAME"));}			// 고객키
	public String getCustGB()									{ return CUtil.nvl(custProperty.getProperty("CUSTGB"));}			// 고객구분
	public String getCustShopNM()								{ return CUtil.nvl(custProperty.getProperty("CUSTSHOPNM"));}		// 상호
	public String getCustNM()									{ return CUtil.nvl(custProperty.getProperty("CUSTNM"));}			// 대표자명
	public String getCustRegNO()								{ return CUtil.nvl(custProperty.getProperty("CUSTREGNO"));}			// 사업자번호
	public String getCustMobileTelno()							{ return CUtil.nvl(custProperty.getProperty("CUSTMOBILETELNO"));}	// 휴대폰전화번호
	public String getCustOfficeTelno()							{ return CUtil.nvl(custProperty.getProperty("CUSTOFFICETELNO"));}	// 사무실전화번호
	public String getCustFaxno()								{ return CUtil.nvl(custProperty.getProperty("CUSTFAXNO"));}			// FAX번호
	public String getCustEmail()								{ return CUtil.nvl(custProperty.getProperty("CUSTEMAIL"));}			// EMAIL 주소
	public String getCatID()									{ return CUtil.nvl(custProperty.getProperty("CATID"));}				// 단말기 번호

	// 고객정보 (SET)	
	public void setCustKey(String custkey)						{ custProperty.setProperty("CUSTKEY", custkey);}
	public void setCustGB(String custgb)						{ custProperty.setProperty("CUSTGB", custgb);}
	public void setCustShopNm(String custshopnm)				{ custProperty.setProperty("CUSTSHOPNM", custshopnm);}
	public void setCustNM(String custnm)						{ custProperty.setProperty("CUSTNM", custnm);}
	public void setCustRegNO(String custregno)					{ custProperty.setProperty("CUSTREGNO", custregno);}
	public void setCustMobileTelno(String custmobiletelno)		{ custProperty.setProperty("CUSTMOBILETELNO", custmobiletelno);}
	public void setCustOfficeTelno(String custofficetelno)		{ custProperty.setProperty("CUSTOFFICETELNO", custofficetelno);}
	public void setCustFaxno(String custfaxno)					{ custProperty.setProperty("CUSTFAXNO", custfaxno);}
	public void setCustEmail(String custemail)					{ custProperty.setProperty("CUSTEMAIL", custemail);}
	public void setCatID(String catid)							{ custProperty.setProperty("CATID", catid);}

	// CTI 관련 정보 (GET)
	public String getCTIContactDate()								{ return CUtil.nvl(ctiProperty.getProperty("CTICONTACTDATE"));}			// 통화시작 일
	public String getCTIContactStartTime()							{ return CUtil.nvl(ctiProperty.getProperty("CTICONTACTSTARTTIME"));}	// 통화시작 시간
	public String getCTIContactEndTime()							{ return CUtil.nvl(ctiProperty.getProperty("CTICONTACTENDTIME"));}		// 통화종료 시간
	public String getCTIDialNo()									{ return CUtil.nvl(ctiProperty.getProperty("CTIDIALNO"));}				// 발신전화 번호
	public String getCTIDialGubun()									{ return CUtil.nvl(ctiProperty.getProperty("CTIDIALGUBUN"));}			// 발신전화 구분
	public String getCTIDialResult()								{ return CUtil.nvl(ctiProperty.getProperty("CTIDIALRESULT"));}			// 통화결과
	public String getCTIChannelType()								{ return CUtil.nvl(ctiProperty.getProperty("CTICHANNELTYPE"));}			// 통화경로
	
	// CTI 관련 정보 (SET)
	public void setCTIContactDate(String cticontactdate)			{ ctiProperty.setProperty("CTICONTACTDATE", cticontactdate);}
	public void setCTIContactStartTime(String cticontactstarttime)	{ ctiProperty.setProperty("CTICONTACTSTARTTIME", cticontactstarttime);}
	public void setCTIContactEndTime(String cticontactendtime)		{ ctiProperty.setProperty("CTICONTACTENDTIME", cticontactendtime);}
	public void setCTIDialNo(String ctidialno)						{ ctiProperty.setProperty("CTIDIALNO", ctidialno);}
	public void setCTIDialGubun(String ctidialgubun)				{ ctiProperty.setProperty("CTIDIALGUBUN", ctidialgubun);}
	public void setCTIDialResult(String ctidialresult)				{ ctiProperty.setProperty("CTIDIALRESULT", ctidialresult);}
	public void setCTIChannelType(String ctichanneltype)			{ ctiProperty.setProperty("CTICHANNELTYPE", ctichanneltype);}

/*
	// 권한 여부
	public boolean isUserAuth(String auth)
	{
		boolean lbolAuth	= false;
		StringTokenizer st 	= new StringTokenizer(getUserAuth(), "|");
	
		while (st.hasMoreTokens())
		{
			String lstrTemp	= st.nextToken();
			
			if (lstrTemp.equals(auth))
			{
				lbolAuth	= true;
				break;
			}
		}
		
		return lbolAuth;
	}
	*/
	
	// 세션정보 Clear
	public void clearUserInfo()
	{
		userProperty.clear();
	}
	
	public void clearCTIInfo()
	{
		ctiProperty.clear();
	}
	
	public void clearCustInfo()
	{
		custProperty.clear();
	}
	
/*	public void clearCampaignInfo()
	{
		campaignProperty.clear();
	}*/
}