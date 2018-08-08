SET DEFAULT_PATH=%PATH%
SET DEFAULT_CLASSPATH=%CLASSPATH%

SET PATH=%JAVA_HOME%\bin;%DEFAULT_PATH%
SET BATCH_LIB=C:\project\workspace\ucareecho\lib
SET CLASSPATH=%DEFAULT_CLASSPATH%;%BATCH_LIB%\commons-logging-1.0.4.jar;%BATCH_LIB%\echoserver.jar;%BATCH_LIB%\jdom.jar;%BATCH_LIB%\log4j-1.2.12.jar;%BATCH_LIB%\classes12.zip;%BATCH_LIB%\commons-dbcp-1.2.2.jar;

java ucare.daemon.server.Test c:/project/workspace/ucareecho/lib/sys.properties 192.168.10.107 4200

SET PATH=%DEFAULT_PATH%
SET CLASSPATH=%DEFAULT_CLASSPATH%