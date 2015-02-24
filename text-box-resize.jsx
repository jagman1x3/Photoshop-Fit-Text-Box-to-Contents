var PADDING = 10;
var layers = app.activeDocument.artLayers;
for (var i = 0; i < layers.length; i++){
    var layer = layers[i];
        if (layer.kind == LayerKind.TEXT){
            if (layer.textItem.kind == TextType.PARAGRAPHTEXT){
                var newtext = layer.duplicate();
                newtext.rasterize(RasterizeType.ENTIRELAYER);
                var w = newtext.bounds[2] - newtext.bounds[0], h = newtext.bounds[3] - newtext.bounds[1];
                newtext.remove();
                var text = layer.textItem;
                text.width = w + PADDING;
                text.height = h + PADDING;
        }
    }
}