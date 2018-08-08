package ucare.daemon.util;


import java.util.*;
import java.sql.*;
import java.io.ByteArrayOutputStream;
import java.io.FileWriter;
import java.io.File;
import java.io.PrintWriter;
import java.io.LineNumberReader;
import java.io.FileReader;
import org.apache.log4j.PropertyConfigurator;

import ucare.daemon.server.*;
import ucare.echo.server.*;
/**
*    INCAT01
*/
public class INCAT01 extends Thread  implements ILogger {
		
	
	public INCAT01(){
	}

	public void run() {	
		process();
	}
	public void process(){
		HostProcess hp = new HostProcess();
		hp.INCAT01();
	}
}