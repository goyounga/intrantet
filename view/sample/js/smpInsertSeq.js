/**
 * zzz
 * @return
 */
function save()
{
	var trans = new Trans();
	trans.setSvc("UCTES001I");
	trans.open("f", "f", "/common.do");
}