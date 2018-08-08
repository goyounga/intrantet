package ucare.echo.server;

import java.io.File;
import java.io.FileNotFoundException;
import java.util.*;

import org.jdom.*;
import org.jdom.input.SAXBuilder;

import ucare.echo.server.*;

/**
 * Batch �ϱ� ���� Job���� �Ӽ� �� ���� ���� ���� Role.xml �� �Ľ��ϰ�<br>
 * �پ��� ���·� get �� �� �ְ� ���� �ִ� Ŭ���� �̴�.
 */
public class RoleXmlParser implements ILogger {
	private Element root=null;
	private Hashtable jobhash=null;
	
	public RoleXmlParser(){}
	
	public RoleXmlParser(String strId) throws Exception{
		loadXml(strId);
	}
	
	/**
     * XML loadding
     * Note: �ش� ����� XML�� �Ľ��Ѵ�.
     * @param strId
     * @throws Exception
     */
	public void loadXml(String strId) throws Exception{
		try{
			SAXBuilder builder=new SAXBuilder(false);
			//Document doc=builder.build(new File(getFilePath(strId)));
			Document doc=builder.build(new File(strId));
			root=doc.getRootElement();
			jobhash=getJobsList();
		}catch(FileNotFoundException e){
			String msg="role.xml NotFound!";
			log.error(msg);
			throw new Exception(msg);
		}catch(Exception e){
			log.error(e.getMessage());
			throw new Exception(e.getMessage());
		}
	}
	
	/**
     * Get Job List
     * Note: Job Tag�� Object�� Hashtable�� Job Id�� ���´�.
     * @return Hashtable
     * @throws Exception
     */
	private Hashtable getJobsList() throws Exception {
		Hashtable hs=new Hashtable();
		try{
			List jobsList=root.getChildren("job");
			Iterator jobs=jobsList.iterator();
			
			while(jobs.hasNext()){
				Element job=(Element)jobs.next();
				hs.put(job.getAttributeValue("id"),job);
			}
		}catch(Exception e){
			throw new Exception(e.getMessage());
		}
		return hs;
	}
	
	//get File Path
	private String getFilePath(String strid) throws Exception{
		String _path="";
		try{
			_path="D:/DiaQ/diaq-batch-1_0/role"+strid+".xml";
		}catch(Exception e){
			throw new Exception(e.getMessage());
		}
		return _path;
	}

	/**
     * Get Job id
     * Note: Job�� ID�� String Array�� �����Ѵ�.
     * @return String[], or null.
     * @throws Exception
     */
	public String[] getJobsIdList() throws Exception {
		String[] rtn=null;
		try{
			Hashtable hs=jobhash;
			Enumeration e=hs.keys();
			rtn=new String[hs.size()];
			int i=0;
			while(e.hasMoreElements()){
				rtn[i++]=(String)e.nextElement();
			}
		}catch(Exception e){
			throw new Exception(e.getMessage());
		}
		return rtn;
	}
	
	/**
     * Get Job Complex tag list
     * Note: ID�� �ش��ϴ� Job�� Complex�� name,value�� Hsahtable���·� �����Ѵ�.
     * @return Hashtable
     * @throws Exception
     */
	public Hashtable getJobComplexList(String jobid) throws Exception {
		Hashtable hs=new Hashtable();
		try{
			Hashtable job=jobhash;
			Element e=(Element)job.get(jobid);
			List jobelement=e.getChildren("complex");
			Iterator k=jobelement.iterator();
			
			while(k.hasNext()){
				Element ecomplex=(Element)k.next();
				List complexlist=ecomplex.getChildren();
				Iterator k1=complexlist.iterator();
				while(k1.hasNext()){
					Element element=(Element)k1.next();
					hs.put(element.getAttributeValue("name"),element.getAttributeValue("value"));
				}
			}
		}catch(Exception e){
			throw new Exception(e.getMessage());
		}
		return hs;
	}

	/**
     * Get Job Excute tag value
     * Note: ID�� �ش��ϴ� Job�� Excute ���� String���� �����Ѵ�.
     * @return String or null
     * @throws Exception
     */
	public String getJobExecuteValue(String jobid) throws Exception {
		String rtn=null;
		try{
			Hashtable job=jobhash;
			Element e=(Element)job.get(jobid);
			Element excute=(Element)e.getChild("execute");
			rtn=excute.getText();
		}catch(Exception e){
			throw new Exception(e.getMessage());
		}
		return rtn;
	}
	
	/**
     * Get Job Time tag value
     * Note: ID�� �ش��ϴ� Job�� Time ���� String���� �����Ѵ�.
     * @return String or null
     * @throws Exception
     */
	public String getJobTimeValue(String jobid) throws Exception {
		String rtn=null;
		try{
			Hashtable job=jobhash;
			Element e=(Element)job.get(jobid);
			Element excute=(Element)e.getChild("time");
			rtn=excute.getText();
		}catch(Exception e){
			throw new Exception(e.getMessage());
		}
		return rtn;
	}
	
	/**
     * Get Job Language tag value
     * Note: ID�� �ش��ϴ� Job�� Language ���� String���� �����Ѵ�.
     * @return String or null
     * @throws Exception
     */
	public String getJobLanguageValue(String jobid) throws Exception {
		String rtn=null;
		try{
			Hashtable job=jobhash;
			Element e=(Element)job.get(jobid);
			Element excute=(Element)e.getChild("language");
			rtn=excute.getText();
		}catch(Exception e){
			throw new Exception(e.getMessage());
		}
		return rtn;
	}
	
	/**
     * Get Job Description tag value
     * Note: ID�� �ش��ϴ� Job�� Description ���� String���� �����Ѵ�.
     * @return String or null
     * @throws Exception
     */
	public String getJobDescValue(String jobid) throws Exception {
		String rtn=null;
		try{
			Hashtable job=jobhash;
			Element e=(Element)job.get(jobid);
			Element excute=(Element)e.getChild("description");
			rtn=excute.getText();
		}catch(Exception e){
			throw new Exception(e.getMessage());
		}
		return rtn;
	}
	
	/**
     * Get Job Power tag value
     * Note: ID�� �ش��ϴ� Job�� Power ���� String���� �����Ѵ�.
     * @return String or null
     * @throws Exception
     */
	public String getJobPowerValue(String jobid) throws Exception {
		String rtn=null;
		try{
			Hashtable job=jobhash;
			Element e=(Element)job.get(jobid);
			Element excute=(Element)e.getChild("power");
			rtn=excute.getText();
		}catch(Exception e){
			throw new Exception(e.getMessage());
		}
		return rtn;
	}
	
	/**
     * Get Job Attriube name value
     * Note: ID�� �ش��ϴ� Job�� �Ӽ��� name ���� Stirng���� �����Ѵ�.
     * @return String or null
     * @throws Exception
     */
	public String getJobNameValue(String jobid) throws Exception {
		String rtn=null;
		try{
			Hashtable job=jobhash;
			Element e=(Element)job.get(jobid);
			rtn=e.getAttributeValue("name");
		}catch(Exception e){
			throw new Exception(e.getMessage());
		}
		return rtn;
	}
	
	/**
     * Get Job Args tag value
     * Note: ID�� �ش��ϴ� Job�� Args ���� String���� �����Ѵ�.
     * @return String or null
     * @throws Exception
     */
	public String getJobArgsValue(String jobid) throws Exception {
		String rtn=null;
		try{
			Hashtable job=jobhash;
			Element e=(Element)job.get(jobid);
			Element excute=(Element)e.getChild("arg");
			rtn=excute.getText();
		}catch(Exception e){
			throw new Exception(e.getMessage());
		}
		return rtn;
	}
}