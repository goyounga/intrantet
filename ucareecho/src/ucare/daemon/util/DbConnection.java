package ucare.daemon.util;

////import java.sql.Connection;
////import javax.naming.InitialContext;
////import javax.naming.NamingException;
////import javax.naming.Context;
////import javax.sql.DataSource;
import java.util.*;
import java.sql.*;
import ucare.daemon.server.*;
import ucare.echo.server.*;

public class DbConnection implements ILogger {
  
	public static Connection getConnection(){
	  Connection conn = null;	  
	  try{
		  conn = DriverManager.getConnection("jdbc:apache:commons:dbcp:/testPool");	  
	  }catch (SQLException e){	   
	   log.error("애러"+e.toString());
	  }
	  return conn ;
	 }
	
	public static  boolean close(Connection conn){		
		try{
			if(conn != null)
				conn.close();
		}catch(SQLException e) {  
			log.error("애러"+e.toString()); 
			return false;
		}
		return true;
	}
}











///**
//* Jeus Jndi 를 이용하여 Jeus Connection Pool을 가져온다. 
//*/
//public class DbConnection implements ILogger {
//	
//	private DbConnection(){}
//	
//	/**
//     * Jeus Jndi 를 이용하여 Jeus Connection Pool을 가져온다.<br>
//     * 공통 POOL
//     */
//	public static Connection getConnection(String dburl, String dbuser, String dbpass) throws Exception {
//		Connection conn = null;		
//		try{
////			RoleXmlParser rx=new RoleXmlParser(CIni.getString("rolexmlurl"));
////			Hashtable hs=rx.getJobComplexList("C001");
////			
////			Properties p=new Properties();
////			p.put(Context.INITIAL_CONTEXT_FACTORY, (String)hs.get("INITIAL_CONTEXT_FACTORY"));
////			p.put(Context.PROVIDER_URL, (String)hs.get("PROVIDER_URL"));
////			p.put(Context.PROVIDER_URL , (String)hs.get("PROVIDER_URL")) ;
////			p.put(Context.SECURITY_PRINCIPAL, (String)hs.get("SECURITY_PRINCIPAL"));
////			p.put(Context.SECURITY_CREDENTIALS, (String)hs.get("SECURITY_CREDENTIALS"));
////			
////			Context ctx=new InitialContext(p);
////			DataSource ds=(DataSource)ctx.lookup((String)hs.get("POOLNAME"));
////			con=ds.getConnection();
////			log.debug("jeus connection(jobid:C001) : "+con);
//		
//			Class.forName( "oracle.jdbc.driver.OracleDriver");
//			conn = DriverManager.getConnection(dburl, dbuser, dbpass);
//			   
//		}catch(Exception e){
//			try{ if(conn!=null) conn.close(); }catch(Exception ee){}
//			throw new Exception(e);
//		}
//		return conn;
//	}
//	
//	/**
//     * Jeus Jndi 를 이용하여 Jeus Connection Pool을 가져온다.<br>
//     * Parameter jobid 의 POOL을 get 한다.
//     */
////	public static Connection getUserConnection(String jobid) throws Exception {
////		Connection con=null;
////		
////		try{
////			RoleXmlParser rx=new RoleXmlParser(CIni.getString("rolexmlurl"));
////			Hashtable hs=rx.getJobComplexList(jobid);
////			
////			Properties p=new Properties();
////			p.put(Context.INITIAL_CONTEXT_FACTORY, (String)hs.get("INITIAL_CONTEXT_FACTORY"));
////			p.put(Context.PROVIDER_URL, (String)hs.get("PROVIDER_URL"));
////			p.put(Context.PROVIDER_URL , (String)hs.get("PROVIDER_URL")) ;
////			p.put(Context.SECURITY_PRINCIPAL, (String)hs.get("SECURITY_PRINCIPAL"));
////			p.put(Context.SECURITY_CREDENTIALS, (String)hs.get("SECURITY_CREDENTIALS"));
////			
////			Context ctx=new InitialContext(p);
////			DataSource ds=(DataSource)ctx.lookup((String)hs.get("POOLNAME"));
////			con=ds.getConnection();
////			log.debug("jeus connection(jobid :"+jobid+" : "+con);
////		
////		}catch(Exception e){
////			try{ if(con!=null) con.close(); }catch(Exception ee){}
////			throw new Exception(e);
////		}
////		return con;
////	}
//}