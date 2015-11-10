// closure to avoid namespace collision
(function(){
	// creates the plugin
	tinymce.create('tinymce.plugins.mygallery', {
		// creates control instances based on the control's id.
		// our button's id is "mygallery_button"
		init : function(ed, url) {
			console.log("Buddooooo222")

				// creates the button
				console.log("Buddooolk;oo")
				var button = ed.addButton('mygallery_button', {
					title : 'MyGallery Shortcode', // title of the button
					image : '../wp-includes/images/smilies/icon_mrgreen.gif',  // path to the button's image
					onclick : function() {
						// triggers the thickbox
						var width = jQuery(window).width(), H = jQuery(window).height(), W = ( 720 < width ) ? 720 : width;
						W = W - 80;
						H = H - 84;
						var canvas = document.getElementById('sketchycan');
				    var ctx = canvas.getContext("2d");
				    var w = canvas.width;
				    var h = canvas.height;
						ctx.clearRect(0, 0, w, h);
						tb_show( 'Draw Yo Image', '#TB_inline?width=' + W + '&height=' + H + '&inlineId=mygallery-form' );
					}
				});

		}
	});

	// registers the plugin. DON'T MISS THIS STEP!!!
	tinymce.PluginManager.add('mygallery', tinymce.plugins.mygallery);
	//console.log("BUddo")
	// executes this when the DOM is ready
	jQuery(function(){
		// creates a form to be displayed everytime the button is clicked
		// you should achieve this using AJAX instead of direct html code like this
		var form = jQuery('<div id="mygallery-form">\
		<canvas id="sketchycan" width="400" height="400" style="border:2px solid;"></canvas>\
		<p class="submit">\
			<input type="button" id="mygallery-submit" class="button-primary" value="Insert Sketch" name="submit" />\
		</p>\
		</div>');

		//var table = form.find('table');
		form.appendTo('body').hide();

		var canvas, ctx, flag = false,
		    prevX = 0,
		    currX = 0,
		    prevY = 0,
		    currY = 0,
		    dot_flag = false;

		// dot flag draws single dots

		//Stroke color and width. Wut?
		var x = "black" //,
		    //y = 2;
				var strokesize = 4;
				var y = strokesize;
		function init() {
		    canvas = document.getElementById('sketchycan');
		    ctx = canvas.getContext("2d");
		    w = canvas.width;
		    h = canvas.height;
				ctx.clearRect(0, 0, w, h);

		    canvas.addEventListener("mousemove", function (e) {
		        findxy('move', e)
		    }, false);
		    canvas.addEventListener("mousedown", function (e) {
		        findxy('down', e)
		    }, false);
		    canvas.addEventListener("mouseup", function (e) {
		        findxy('up', e)
		    }, false);
		    canvas.addEventListener("mouseout", function (e) {
		        findxy('out', e)
		    }, false);
		}




		function draw() {
		    ctx.beginPath();
		    ctx.moveTo(prevX, prevY);
		    ctx.lineTo(currX, currY);
		    ctx.strokeStyle = x;
		    ctx.lineWidth = y;
		    ctx.stroke();
		    ctx.closePath();
		}

		function getCanvasPos(el) {
	    var mycanvas = canvas;//document.getElementById(el);
	    var _x = mycanvas.offsetLeft;
	    var _y = mycanvas.offsetTop;

	    while(mycanvas = mycanvas.offsetParent) {
				if (canvas){
	        _x += mycanvas.offsetLeft - mycanvas.scrollLeft;
	        _y += mycanvas.offsetTop - mycanvas.scrollTop;
				}
	    }

	    return {
	        left : _x,
	        top : _y
	    }
		};

function mousePos(e) {

    var mouseX = e.clientX - getCanvasPos(e.target).left; //+ window.pageXOffset;
    var mouseY = e.clientY - getCanvasPos(e.target).top; //+ window.pageYOffset;
    return {
        x : mouseX,
        y : mouseY
    };
};

function updateCurr(e){
	var pos = mousePos(e);
	currX = pos.x;
	currY = pos.y;
}

		function findxy(res, e) {
		    if (res == 'down') {
		        prevX = currX;
		        prevY = currY;
						updateCurr(e);
		        //currX = e.clientX - canvas.parentNode.offsetLeft;
		        //currY = e.clientY - canvas.parentNode.offsetTop;
						//console.log(e.clientX);
						//console.log(canvas.parentNode.parentNode.offsetLeft)
						//console.log(canvas.clientTop)

		        flag = true;
		        dot_flag = true;
		        //Dot flag makes so single clicks drawa little dot.
		        if (dot_flag) {
		            ctx.beginPath();
		            ctx.fillStyle = x;
		            ctx.fillRect(currX, currY, 2, 2); //shou;d proably be y, y at end
		            ctx.closePath();
		            dot_flag = false;
		        }
		    }
		    if (res == 'up' || res == "out") {
		        flag = false;
		    }
		    if (res == 'move') {
		        if (flag) {
		            prevX = currX;
		            prevY = currY;
		            //currX = e.clientX - canvas.offsetLeft;
		            //currY = e.clientY - canvas.offsetTop;
								updateCurr(e);
								draw();
		        }
		    }
		}

		init();

		// handles the click event of the submit button
		function dataURItoBlob(dataURI) {
    // convert base64/URLEncoded data component to raw binary data held in a string
    var byteString;
    if (dataURI.split(',')[0].indexOf('base64') >= 0)
        byteString = atob(dataURI.split(',')[1]);
    else
        byteString = unescape(dataURI.split(',')[1]);

    // separate out the mime component
    var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

    // write the bytes of the string to a typed array
    var ia = new Uint8Array(byteString.length);
    for (var i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
    }

    return new Blob([ia], {type:mimeString});
}

		form.find('#mygallery-submit').click(function(){
			// defines the options and their default values
			// again, this is not the most elegant way to do this
			// but well, this gets the job done nonetheless
			tb_remove();
			/*var frame = wp.media({
      title: 'Select or Upload Media Of Your Chosen Persuasion',
      button: {
        text: 'Use this media'
      },
      multiple: false  // Set to true to allow multiple files to be selected
    });
		frame.open();
		console.log(wp.media)
		*/
			// closes Thickbox
			var image = new Image();
			image.src = canvas.toDataURL("image/png");
			var dataURL = canvas.toDataURL("image/png");
			var blob = dataURItoBlob(dataURL);
			var formData = new FormData();
			var filename = new Date() + ".png"
			formData.append('my_image_upload', blob, filename);
			//formData.append('birdup', "BIRDUP")
			//console.log(formData);
			jQuery.ajax({
				type: 'POST',
				url:"/wp-content/plugins/mrsketcho/upload_image.php",
				data:formData,
				contentType: false,
    		processData: false,

				success: function(data){
					console.log(data);
					var mytext = "<img src=" + data + "/>"
					tinyMCE.activeEditor.execCommand('mceInsertContent', 0, mytext);
				}
			});




		});
	});
})()
