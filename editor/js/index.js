var canvas = new fabric.Canvas('c');
canvas.imageSmoothingEnabled = false;
canvas.backgroundColor = 'rgba(0,0,0,0.05)';

var currentFontSize;

// Define an array with all fonts
var fonts = ["Pacifico", "VT323", "Quicksand", "Inconsolata", "Roboto", "YoungSerif"];
var alignments = ["left", "center", "right"];
var fontStyles = {
	"regular": "",
	"bold": "bold",
	"italic": "italic"
};

var textbox = new fabric.Textbox('Text', {
	left: 50,
	top: 50,
	width: 150,
	fontSize: 20,
	text: "Lorum ipsum dolor sit amet",
	editable: false,
	textAlign: "left",
	cornerStyle: "circle",
	fontStyle: ""
});

textbox.setControlsVisibility({
	bl: false, // bottom left
	br: false, // bottom right
	tl: false, // top left
	tr: false, // top right
	mb: false, // middle bottom
	ml: true, // middle left
	mr: true, // middle right
	mt: false, // middle top
	mtr: false, // middle top rotate
});
// textbox.setText("What")
// canvas.add(textbox).setActiveObject(textbox);

canvas.add(textbox);

fonts.unshift('Times New Roman');
// Populate the fontFamily select
var select = document.getElementById("font-family");
fonts.forEach(function(font) {
	var option = document.createElement('option');
	option.innerHTML = font;
	option.value = font;
	select.appendChild(option);
});

var align = document.getElementById("text-alignment");
alignments.forEach(function(alignment) {
	var option = document.createElement('option');
	option.innerHTML = alignment;
	option.value = alignment;
	align.appendChild(option);
});

var fontStyle = document.getElementById("font-style");

allFontStyles = Object.keys(fontStyles);

allFontStyles.forEach(function(fs) {
	// console.log(Object.keys(fs)[0])
	var option = document.createElement('option');
	option.innerHTML = fs;
	option.value = fs;
	fontStyle.appendChild(option);
});

function removeEmojis(string) {
	var regex = /(?:[\u2700-\u27bf]|(?:\ud83c[\udde6-\uddff]){2}|[\ud800-\udbff][\udc00-\udfff]|[\u0023-\u0039]\ufe0f?\u20e3|\u3299|\u3297|\u303d|\u3030|\u24c2|\ud83c[\udd70-\udd71]|\ud83c[\udd7e-\udd7f]|\ud83c\udd8e|\ud83c[\udd91-\udd9a]|\ud83c[\udde6-\uddff]|\ud83c[\ude01-\ude02]|\ud83c\ude1a|\ud83c\ude2f|\ud83c[\ude32-\ude3a]|\ud83c[\ude50-\ude51]|\u203c|\u2049|[\u25aa-\u25ab]|\u25b6|\u25c0|[\u25fb-\u25fe]|\u00a9|\u00ae|\u2122|\u2139|\ud83c\udc04|[\u2600-\u26FF]|\u2b05|\u2b06|\u2b07|\u2b1b|\u2b1c|\u2b50|\u2b55|\u231a|\u231b|\u2328|\u23cf|[\u23e9-\u23f3]|[\u23f8-\u23fa]|\ud83c\udccf|\u2934|\u2935|[\u2190-\u21ff])/g;
	return string.replace(regex, "");
};

objs = canvas.getObjects();
$('#custom-text').keyup(function(e) {
	// console.log(e)
	var emojiTest = /\p{Extended_Pictographic}/u.test(this.value);
	if (emojiTest) {
		var output = removeEmojis(this.value);
	} else {
		var output = this.value;
	};
	objs[0].text = output;
	canvas.renderAll();
});

// canvas.on('object:scaled', function(options) {
// if(fontSizeX === fontSizeY){
// 	options.target.fontSize = fontSizeX*100;
// 	// console.log(options.target.fontSize);
// }
// })

// console.log(canvas.item(0).fontSize)

// canvas.on('object:scaling', function(options) {
// 	console.log("scaleX", options.target.scaleX)
// 	console.log("scaleY", options.target.scaleY)
// 	console.log("fontSize", options.target.fontSize)
// 	console.log("newFontSize", options.target.scaleX*100)

// 	var fontSizeX = options.target.scaleX;
// 	var fontSizeY = options.target.scaleY;

// 	newFontSize = fontSizeX*100

// 	if (newFontSize < 40 && fontSizeX === fontSizeY) {
// 		newFontSize = 40
// 	}

// 	if(fontSizeX === fontSizeY){
// 		currentFontSize = fontSizeX*options.target.fontSize;
// 		// options.target.fontSize = fontSizeX*100;
// 		// console.log(options.target.fontSize);
// 	}
// })

// canvas.on('object:scaled', function(options) {
// 	console.log(currentFontSize)
// 	options.target.fontSize = currentFontSize;
// })

canvas.on('before:transform', function(e) {
	// console.log(canvas.item(0).fontSize)
	currentFontSize = canvas.item(0).fontSize;
});

canvas.on('object:modified', function(options) {

	// console.log(options.target.getScaledWidth())
	// console.log(options.target.getHeightOfLine(1))
	// console.log(options.target.calcTextHeight)
	var errorBox = document.getElementById("size-error");

	if (options.target.getScaledWidth() > canvas.width + 10) {
		errorBox.innerHTML = "Too big";
		options.target.scaleToWidth(canvas.width);
	} else {
		errorBox.innerHTML = "";
	};



	// if (options.target.lineHeight() < canvas.width) {

	// }
});

// document.getElementById('custom-text').onchange = function() {
// 	// console.log("TEST")
// 	objs = canvas.getObjects();
// 	// console.log(objs)
// 	objs[0].text = this.value
// 	canvas.renderAll()
// }

// canvas.on('object:moving', function (e) {
// 	var obj = e.target;
// 	obj.setCoords();
// 	console.log(obj.getScaledHeight(), obj.canvas.height)
// 	 // if object is too big ignore
// 	if(obj.getScaledHeight() > obj.canvas.height || obj.getScaledWidth() > obj.canvas.width){
// 		return;
// 	}


// 	var halfw = obj.getScaledWidth()/2;
// 	var halfh = obj.getScaledHeight()/2;
// 	var bounds = {
// 		tl: {
// 			x: halfw, y:halfh
// 		},
// 		br: {
// 			// x: obj.canvas.width-halfw,
// 			x: obj.canvas.width-halfw,
// 			y: obj.canvas.height-halfh
// 			y: obj.canvas.height-halfh
// 		}
// 	};

// 	// top-left	corner

// 	// console.log(obj)
// 	// console.log(bounds)
// 	// console.log(halfw, halfh)
// 	if(obj.top < bounds.tl.y || obj.left < bounds.tl.x){
// 		obj.top = Math.max(obj.top, bounds.tl.y);
// 		obj.left = Math.max(obj.left, bounds.tl.x)
// 	}

// 	// bot-right corner
// 	if(obj.top > bounds.br.y || obj.left > bounds.br.x){
// 		obj.top = Math.min(obj.top, bounds.br.y);
// 		obj.left = Math.min(obj.left, bounds.br.x)
// 	}
// });

document.getElementById('reset-btn').onclick = function() {

	canvas.setActiveObject(canvas.item(0));
	// canvas.getActiveObject().set("fontSize", 20);
	canvas.getActiveObject().center();

	canvas.discardActiveObject().renderAll();
	canvas.requestRenderAll();
};

// $('#text-size').on('keyup', function(event) {
document.getElementById('text-size').onkeyup = function() {
	if (event.keyCode == 13) {
		// console.log("submit")
		// console.log(event)
		canvas.setActiveObject(canvas.item(0));
		canvas.getActiveObject().set("fontSize", this.value);
		canvas.discardActiveObject().renderAll();
		canvas.requestRenderAll();
	};
};

document.getElementById('drawing-colour').onchange = function() {
	canvas.setActiveObject(canvas.item(0));
	canvas.getActiveObject().set("fill", this.value);
	canvas.discardActiveObject().renderAll();
	canvas.requestRenderAll();
};

document.getElementById('font-style').onchange = function() {
	canvas.setActiveObject(canvas.item(0));
	canvas.getActiveObject().set("fontStyle", fontStyles[this.value]);
	canvas.discardActiveObject().renderAll();
	canvas.requestRenderAll();
};

var vertLine = new fabric.Line([
	canvas.width / 2, 0,
	canvas.width / 2, canvas.width
], {
	stroke: 'green',
	opacity: 0,
});
vertLine.selectable = false;
vertLine.evented = false;
canvas.add(vertLine);

var horiLine = new fabric.Line([
	0, canvas.height / 2,
	canvas.height, canvas.height / 2
], {
	stroke: 'blue',
	opacity: 0,
})
horiLine.selectable = false;
horiLine.evented = false;
canvas.add(horiLine);

// used for grids
var snapZone = 15;
canvas.on('object:moving', function(options) {
	var objectHorizontalMiddle = options.target.left + options.target.getScaledWidth() / 2;
	if (objectHorizontalMiddle > canvas.width / 2 - snapZone && objectHorizontalMiddle < canvas.width / 2 + snapZone) {
		options.target.set({
			left: canvas.width / 2 - options.target.getScaledWidth() / 2,
		}).setCoords();
		vertLine.opacity = 1;
	} else {
		vertLine.opacity = 0;
	}

	var objectVerticalMiddle = options.target.top + options.target.getScaledHeight() / 2;
	if (objectVerticalMiddle > canvas.height / 2 - snapZone && objectVerticalMiddle < canvas.height / 2 + snapZone) {
		options.target.set({
			top: canvas.height / 2 - options.target.getScaledHeight() / 2,
		}).setCoords();
		horiLine.opacity = 1;
	} else {
		horiLine.opacity = 0;
	}

});

canvas.item(0).on('deselected', function(options) {
	// setTimeout(() => {
	vertLine.opacity = 0;
	horiLine.opacity = 0;
	// }, 0)
});

document.getElementById('text-alignment').onchange = function() {
	canvas.setActiveObject(canvas.item(0));
	canvas.getActiveObject().set("textAlign", this.value);
	canvas.discardActiveObject().renderAll();
	canvas.requestRenderAll();
};

// Apply selected font on change
document.getElementById('font-family').onchange = function() {
	if (this.value !== 'Times New Roman') {
		loadAndUse(this.value);
	} else {
		// canvas.setActiveObject(canvas.item(1))
		// canvas.setActiveObject()
		// test.set("fontFamily", this.value)
		// console.log(this.value)
		canvas.setActiveObject(canvas.item(0));
		canvas.getActiveObject().set("fontFamily", this.value);

		// console.log("tEST")
		// objs[0].fontFamily = this.value
		canvas.discardActiveObject().renderAll();
		canvas.requestRenderAll();
	};
};

function loadAndUse(font) {
	var myfont = new FontFaceObserver(font);
	myfont.load()
		.then(function() {
			// when font is loaded, use it.
			canvas.setActiveObject(canvas.item(0));
			canvas.getActiveObject().set("fontFamily", font);
			// test.set("fontFamily", font);
			// console.log("tEST2")
			// canvas.getActiveObject().set("fontFamily", font);
			canvas.discardActiveObject().renderAll();
			canvas.requestRenderAll();
		}).catch(function(e) {
			console.log(e);
			alert('font loading failed ' + font);
		});
};