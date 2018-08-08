export DEFAULT_PATH="${PATH}"
export DEFAULT_CLASSPATH="${CLASSPATH}"

export BATCH_LIB="/home/nhn/ucareecho/lib"
export CLASSPATH=.${DEFAULT_CLASSPATH}:${BATCH_LIB}/commons-logging-1.0.4.jar:${BATCH_LIB}/echoserver.jar:${BATCH_LIB}/jdom.jar:${BATCH_LIB}/log4j-1.2.12.jar:${BATCH_LIB}/classes12.jar:${BATCH_LIB}/commons-dbcp-1.2.2.jar

java ucare.daemon.server.Test /home/nhn/ucareecho/lib/sys.properties 192.168.10.112 4200

export PATH="${DEFAULT_PATH}"
export CLASSPATH="${DEFAULT_CLASSPATH}"
