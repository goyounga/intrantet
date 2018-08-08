package ucare.echo.server;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

public interface ILogger {
	public Log log=LogFactory.getLog(ILogger.class);
}