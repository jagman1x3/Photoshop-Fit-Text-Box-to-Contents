function angleFromMatrix(yy, xy) {
    var toDegs = 180/Math.PI;
    return Math.atan2(yy, xy) * toDegs - 90;
}

function getActiveLayerRotation() {
    var ref = new ActionReference();
    ref.putEnumerated( charIDToTypeID("Lyr "), charIDToTypeID("Ordn"), charIDToTypeID("Trgt") );
    var desc = executeActionGet(ref).getObjectValue(stringIDToTypeID('textKey'))
    if (desc.hasKey(stringIDToTypeID('transform')))
    {
        desc = desc.getObjectValue(stringIDToTypeID('transform'))
        var yy = desc.getDouble(stringIDToTypeID('yy'));
        var xy = desc.getDouble(stringIDToTypeID('xy'));
        return angleFromMatrix(yy, xy);
    }
    return 0;
}

//Todo: Skip layers that are already small enough, try to stop the text from moving around

var PADDING = 2;
var doc = app.activeDocument;
var layers = doc.artLayers;
for (var i = 0; i < layers.length; i++){
    var layer = layers[i];
        if (layer.kind == LayerKind.TEXT){
            if (layer.textItem.kind == TextType.PARAGRAPHTEXT){
                var newtext = layer.duplicate();
                newtext.rasterize(RasterizeType.ENTIRELAYER);
			  doc.activeLayer = layer;
                var rotation = getActiveLayerRotation();
                var w, h;
                if (rotation == 90 || rotation == -90) {
                	h = newtext.bounds[2] - newtext.bounds[0]; w = newtext.bounds[3] - newtext.bounds[1];
                    }
                else {
	                w = newtext.bounds[2] - newtext.bounds[0]; h = newtext.bounds[3] - newtext.bounds[1];
                    }
                newtext.remove();
                var text = layer.textItem;
                text.width = w + PADDING;
                text.height = h + PADDING;
        }
    }
}
