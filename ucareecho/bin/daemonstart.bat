SET DEFAULT_PATH=%PATH%
SET DEFAULT_CLASSPATH=%CLASSPATH%

SET PATH=%JAVA_HOME%\bin;%DEFAULT_PATH%
SET BATCH_LIB=C:\project\workspace\ucareecho\lib
SET CLASSPATH=.;%BATCH_LIB%\commons-logging-1.0.4.jar;%BATCH_LIB%\echoserver.jar;%BATCH_LIB%\jdom.jar;%BATCH_LIB%\log4j-1.2.12.jar;%BATCH_LIB%\classes12.zip

java -Xms32m -Xmx64m ucare.daemon.server.UCareDaemonMain

SET PATH=%DEFAULT_PATH%
SET CLASSPATH=%DEFAULT_CLASSPATH%