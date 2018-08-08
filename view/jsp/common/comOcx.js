if(gCtilogin == "Y"){	 //Cti사용유무
	//CTI Object
	document.writeln('<OBJECT ID="DmCallCon" ');
	document.writeln('				CLASSID="CLSID:E76C5DE1-5C0F-4928-910C-BFFBAC92DF4C" ');
	document.writeln('				CODEBASE="/cab/DmCallCon.CAB#version=1,0,0,0" style="width:0;height:0;">');
	document.writeln('</OBJECT>');

	document.writeln('<OBJECT id="ctl_RunDm" ');
	document.writeln('				classid="clsid:40367C1F-7772-4303-AB23-6ADD32AA343F" CODEBASE="/cab/DMStart.ocx#version=1,0,0,1" style="width:0;height:0;">');
	document.writeln('</OBJECT>');

	document.writeln('<OBJECT id="DmMonitor" ');
	document.writeln('				classid="CLSID:369BA108-B92D-48AF-BD1A-34D23E9672D6" CODEBASE="/cab/DmMonitor.CAB#version=1,0,0,0" style="width:0;height:0;">');
	document.writeln('</OBJECT>');

	document.writeln('<OBJECT id="UCTcpctl"  ');
	document.writeln('				classid="clsid:D64A6034-81FE-426B-8CC3-0C5B677E42D0" codebase="/cab/UCTCPControl.ocx#version=1,0,0,4" style="width:0;height:0;">');
	document.writeln('</OBJECT>');
}

