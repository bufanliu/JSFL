var DOC = fl.getDocumentDOM();
var items = DOC.selection;
var totalItems = items.length;

var doc = fl.getDocumentDOM();
var settings = doc.xmlPanel (fl.configURI + "Commands/Selection to Instance.xml");

if (items.length > 0 && settings.dismiss == "accept") {
	fl.outputPanel.clear();

	var dup = [];
	for(var o in items) dup.push(items[o]);

	var type = settings._type;
	if(type == "_mc") type = "movie clip";
	else if(type == "_graphic") type = "graphic";

	var align = align = "top left";
	if(settings._align == "tc") align = "top center";
	else if(settings._align == "tr") align = "top right";
	else if(settings._align == "cl") align = "center left";
	else if(settings._align == "cc") align = "center";
	else if(settings._align == "cr") align = "center right";
	else if(settings._align == "bl") align = "bottom left";
	else if(settings._align == "bc") align = "bottom center";
	else if(settings._align == "br") align = "bottom right";

	var sName = "";
	dup.reverse();
	for(var i = 0; i < totalItems; ++i) {
		var sel = dup[i];
		DOC.selectNone();
		DOC.selection = [ sel ];
		sName = formatDigits(i, totalItems, settings._prefix, settings._suffix);
		if(sel.elementType == "shape" || sel.elementType == "instance") {
			DOC.convertToSymbol( type, sName, align );
		}
	}

	DOC.selectNone();
}

function formatDigits(num, total, prefix, suffix) {
	var result = num.toString();
	if(num < total) {
		if(total >= 10 && num < 10) result = "0" + num.toString();
		else if(total >= 100 && num < 100) result = "00" + num.toString();
	}
	return prefix + result + suffix;
}