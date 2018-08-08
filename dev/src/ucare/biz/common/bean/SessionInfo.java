package ucare.biz.common.bean;

import java.io.Serializable;
import java.util.Properties;
import java.util.StringTokenizer;

import ucare.jaf.common.CUtil;

public class SessionInfo implements Serializable
{
	Properties userProperty	 		= new Properties();				// ���������
	Properties ctiProperty			= new Properties();				// CTI ���� ����
	Properties custProperty			= new Properties();				// ������

	// ���� ����(GET)
	public String getUserID()									{ return CUtil.nvl(userProperty.getProperty("USERID"));}			// ���� ID
	public String getUserName()									{ return CUtil.nvl(userProperty.getProperty("USERNAME"));}			// ���� ��
	public String getUserRID()									{ return CUtil.nvl(userProperty.getProperty("USERRID"));}			// ���� �ֹι�ȣ
	public String getUserGradeCD()								{ return CUtil.nvl(userProperty.getProperty("USERGRADECD"));}		// ���� ����ڵ�
	public String getUserPartCD()								{ return CUtil.nvl(userProperty.getProperty("USERPARTCD"));}		// ���� �μ�
	public String getUserPositionCD()							{ return CUtil.nvl(userProperty.getProperty("USERPOSITIONCD"));}	// ���� ��å�ڵ�
	public String getUserMenuGroupID()							{ return CUtil.nvl(userProperty.getProperty("USERMENUGROUPID"));}	// ���� �޴� �׷� ID
	public String getUserInLine()								{ return CUtil.nvl(userProperty.getProperty("USERINLINE"));}		// ���� ������ȣ
	public String getUserLoginIP()								{ return CUtil.nvl(userProperty.getProperty("USERLOGINIP"));}		// ���� IP Address
	public String getUserLoginDT()								{ return CUtil.nvl(userProperty.getProperty("USERLOGINDT"));}		// ���� �α��� ����
	public String getUserLoginTM()								{ return CUtil.nvl(userProperty.getProperty("USERLOGINTM"));}		// ���� �α��� �ð� 
	public String getUserMessageID()							{ return CUtil.nvl(userProperty.getProperty("USERMESSAGEID"));}		// ���� ���� �＼�� �޼��� ID
	public String getUserCtiLoginID()							{ return CUtil.nvl(userProperty.getProperty("USERCTILOGINID"));}	// ���� CTI �α��� ID
	public String getUserCtiLoginPWD()							{ return CUtil.nvl(userProperty.getProperty("USERCTILOGINPWD"));}	// ���� CTI �α��� PWD
	public String getUserAgentYN()								{ return CUtil.nvl(userProperty.getProperty("USERAGENTYN"));}		// ����� �븮�� ����
	public String getUserAgentCode()							{ return CUtil.nvl(userProperty.getProperty("USERAGENTCODE"));}		// ����� �븮�� ����
	public String getUserCorpID()								{ return CUtil.nvl(userProperty.getProperty("CORPID"));}			// ��ü�ڵ�
	public String getUserCorpName()								{ return CUtil.nvl(userProperty.getProperty("CORPNAME"));}			// ��ü��
	public String getUserPrjID()								{ return CUtil.nvl(userProperty.getProperty("USERPRJID"));}			// ������Ʈ ID	
	public String getViewOrg1Cd()								{ return CUtil.nvl(userProperty.getProperty("VIEWORG1CD"));}		// �������ڵ�1
	public String getViewOrg2Cd()								{ return CUtil.nvl(userProperty.getProperty("VIEWORG2CD"));}		// �������ڵ�2
	public String getViewOrg3Cd()								{ return CUtil.nvl(userProperty.getProperty("VIEWORG3CD"));}		// �������ڵ�3
	
	// ���� ���� (SET)
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
			
	// ������ (GET)
	public String getCustKey()									{ return CUtil.nvl(custProperty.getProperty("CUSTNAME"));}			// ��Ű
	public String getCustGB()									{ return CUtil.nvl(custProperty.getProperty("CUSTGB"));}			// ������
	public String getCustShopNM()								{ return CUtil.nvl(custProperty.getProperty("CUSTSHOPNM"));}		// ��ȣ
	public String getCustNM()									{ return CUtil.nvl(custProperty.getProperty("CUSTNM"));}			// ��ǥ�ڸ�
	public String getCustRegNO()								{ return CUtil.nvl(custProperty.getProperty("CUSTREGNO"));}			// ����ڹ�ȣ
	public String getCustMobileTelno()							{ return CUtil.nvl(custProperty.getProperty("CUSTMOBILETELNO"));}	// �޴�����ȭ��ȣ
	public String getCustOfficeTelno()							{ return CUtil.nvl(custProperty.getProperty("CUSTOFFICETELNO"));}	// �繫����ȭ��ȣ
	public String getCustFaxno()								{ return CUtil.nvl(custProperty.getProperty("CUSTFAXNO"));}			// FAX��ȣ
	public String getCustEmail()								{ return CUtil.nvl(custProperty.getProperty("CUSTEMAIL"));}			// EMAIL �ּ�
	public String getCatID()									{ return CUtil.nvl(custProperty.getProperty("CATID"));}				// �ܸ��� ��ȣ

	// ������ (SET)	
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

	// CTI ���� ���� (GET)
	public String getCTIContactDate()								{ return CUtil.nvl(ctiProperty.getProperty("CTICONTACTDATE"));}			// ��ȭ���� ��
	public String getCTIContactStartTime()							{ return CUtil.nvl(ctiProperty.getProperty("CTICONTACTSTARTTIME"));}	// ��ȭ���� �ð�
	public String getCTIContactEndTime()							{ return CUtil.nvl(ctiProperty.getProperty("CTICONTACTENDTIME"));}		// ��ȭ���� �ð�
	public String getCTIDialNo()									{ return CUtil.nvl(ctiProperty.getProperty("CTIDIALNO"));}				// �߽���ȭ ��ȣ
	public String getCTIDialGubun()									{ return CUtil.nvl(ctiProperty.getProperty("CTIDIALGUBUN"));}			// �߽���ȭ ����
	public String getCTIDialResult()								{ return CUtil.nvl(ctiProperty.getProperty("CTIDIALRESULT"));}			// ��ȭ���
	public String getCTIChannelType()								{ return CUtil.nvl(ctiProperty.getProperty("CTICHANNELTYPE"));}			// ��ȭ���
	
	// CTI ���� ���� (SET)
	public void setCTIContactDate(String cticontactdate)			{ ctiProperty.setProperty("CTICONTACTDATE", cticontactdate);}
	public void setCTIContactStartTime(String cticontactstarttime)	{ ctiProperty.setProperty("CTICONTACTSTARTTIME", cticontactstarttime);}
	public void setCTIContactEndTime(String cticontactendtime)		{ ctiProperty.setProperty("CTICONTACTENDTIME", cticontactendtime);}
	public void setCTIDialNo(String ctidialno)						{ ctiProperty.setProperty("CTIDIALNO", ctidialno);}
	public void setCTIDialGubun(String ctidialgubun)				{ ctiProperty.setProperty("CTIDIALGUBUN", ctidialgubun);}
	public void setCTIDialResult(String ctidialresult)				{ ctiProperty.setProperty("CTIDIALRESULT", ctidialresult);}
	public void setCTIChannelType(String ctichanneltype)			{ ctiProperty.setProperty("CTICHANNELTYPE", ctichanneltype);}

/*
	// ���� ����
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
	
	// �������� Clear
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