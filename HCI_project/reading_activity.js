	/* 
	*	Add feature to prevent participant from turning to a previous page 
	*	fix italic word run off 
	*	
	*/

	var element;
	window.onload = function(){
		$("#flipbook").turn({
			width: 1600,
			height: 900,
		});
		make_pages();
		$("#flipbook").turn("disable", true);
		apply_intervention();
		apply_intervention_manually();
		console.log("the current page is "+ $("#flipbook").turn("page"));
		turn_page();

	}

	function apply_intervention(){ 
		var ws = new WebSocket("ws://localhost:9998/echo");
		console.log(ws.readyState);
		ws.onopen = function(){
			console.log("websocket connection is opened");
			//this.send("hello");  //test connection
		};
		ws.onmessage = function (evt){
			var received_msg = evt.data;
			$("#flipbook").turn("disable", false); 
			var page_number = String($("#flipbook").turn("page"));
			console.log(page_number);
			$("#page" + page_number).css("background-color", "yellow");//fix to font
			setTimeout( function(){ 
				$("#page"+page_number).css("background-color", "white");
  			}  , 3000 );
  			$("#flipbook").turn("disable", true);
		}

	}
	function apply_intervention_manually(){
		
		$("#flipbook").click(function() {
			var page_number = $("#flipbook").turn("page");
			var page2 = String(page_number +1);
			var page_number = String(page_number);
			console.log(page_number);
			//$("#page" + page_number).css("margin", "5");
			//$("#page" + page2).css("margin", "5");
			$("#page" + page_number).css("font-style", "italic");
			$("#page" + page2).css("font-style", "italic");
			setTimeout( function(){ 
				console.log("in time out function");
				//$("#page" + page_number).css("margin", "20");
				//$("#page" + page2).css("margin", "20");
				$("#page"+page_number).css("font-style", "normal");
				$("#page" + page2).css("font-style", "normal");
	  		}  , 1000 );
  		});
	}
	function change_font(){
		
			alert("page should turn yellow");
			var page_number = String($("#flipbook").turn("page"));
			$("#page"+page_number).css("background-color", "yellow");
			setTimeout( function(){ 
				//alert( "Handler for .click() called." );
				$("#page"+page_number).css("background-color", "white");
  			}  , 3000 );
	}
	function turn_right(){
			$("#flipbook").turn("disable", false);  //enables peel effect 
			$("#flipbook").turn("next");
			$("#flipbook").turn("disable", true);  //disables peel effect
	}
	function turn_left(){
			$("#flipbook").turn("disable", false);  
			$("#flipbook").turn("previous");
			$("#flipbook").turn("disable", true);
	}
	function turn_page(){
		$(document).keydown(function(e) {
			    
				    switch(e.which) {
				        case 37: // left
				        turn_left();
				        break;

				        case 39: // right
				        turn_right();
				        break;

				        default: return; // exit this handler for other keys
				    }
		});
	}

	