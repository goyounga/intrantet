/*** StringBuffer Object 
 * java의 StringBuffer 와 같은 기능.
 */
function StringBuffer() {
	this.$$=new Array();
}

StringBuffer.prototype.append=function(str) {
	this.$$.push(str);
}

StringBuffer.prototype.toString=function() {
	return this.$$.join("");
}

StringBuffer.prototype.clear=function() {
	this.$$=new Array();
	this.$$.join("");
}

/*** Hashtable Object
 * java의 Hashtable 과 같은 기능.
 */
function Hashtable(){
	this._$key=new Array();		//key
	this._$value=new Array();	//value
}
Hashtable.prototype.put=function(key,value){
	var check=true;
	for(var i=0;i<this._$key.length;i++){
		if(this._$key[i]==key){
			this._$value[i]=value;
			check=false;
			break;
		}
	}
	if(check){
		this._$key.push(key);
		this._$value.push(value);
	}
}
Hashtable.prototype.get=function(key){
	var rtn = "";
	for(var i=0;i<this._$key.length;i++){
		if(key==this._$key[i]){
			rtn=this._$value[i];
			break;
		}
	}
	return rtn;
}

Hashtable.prototype.remove=function(key)
{
	var _$key=new Array();		//key
	var _$value=new Array();	//value

	var rtn;
	for(var i=0;i<this._$key.length;i++){
		if(key!=this._$key[i])
		{
			_$key.push(this._$key[i]);
			_$value.push(this._$value[i]);
		}
	}
	this._$key  =_$key;
	this._$value=_$value;

}

Hashtable.prototype.value=function(i){
	var rtn=this._$value[i];
	return rtn;
}
Hashtable.prototype.getNames=function(){
	return this._$key;
}
Hashtable.prototype.size=function(){
	return this._$key.length;
}
Hashtable.prototype.clear=function(){
	this._$key=new Array();		//key
	this._$value=new Array();	//value
}