var newHash;
var docTitle = document.title;
var currentURL = '';



$(function() {

        $(window).bind("hashchange", function(){
            newHash = window.location.hash.substring(1);
			
			if(newHash){

				if(newHash == 'home'){
					document.title = docTitle;
					cleaner();
				}else{
					cleaner();
                	launcher(newHash);
					
					hashtitle = newHash.toUpperCase();
					document.title = docTitle + " ." + hashtitle;

				}
			}
			oldHash = newHash;
        });
        $(window).trigger("hashchange");
});


//////////////////////////////////////////////////////////// GO LOCAL
function ajax(t){
	var str = null;
	
	$.ajax({
		url:"projects/"+t+".html",
		dataType:'html',
		success:function(data){
			$("#experienceContainer").append($($.parseHTML(data)).filter('#experience'));
			$("#leftContainer").append($($.parseHTML(data)).filter('#left'));
			$("#nameContainer").append($($.parseHTML(data)).filter('#name'));
			$("#personalityContainer").append($($.parseHTML(data)).filter('#personality'));
			$("#rightContainer").append($($.parseHTML(data)).filter('#right'));
		}, 
		error: function() {
			
		}
	});
	
};

function launcher(t){	////////////INPUT SELECTOR
	setTimeout(function(){ 
		
		if(currentURL==''){
			ajax(t);// LOCAL LOAD
			$("#leftContainer, #nameContainer, #personalityContainer, #rightContainer, #experienceContainer").css({'opacity': 1});
			$("#experienceContainer").css({'z-index': '2'});
		}else{// iframe LOAD
			$("#iFrameInput").attr("src", currentURL); ////////////GO IFRAME
			$("#iFrameInput").css({'opacity': 1});
			$("#experienceContainer").css({'z-index': ''});
			//$("#id").html('<p>'+t+'</p>');
		}
		
		$("#id").css({'opacity': 1});
	}, 300);
	
};
function cleaner(){	
	 $("#leftContainer, #nameContainer, #personalityContainer, #rightContainer, #experienceContainer, #iFrameInput, #id").css({'opacity': 0});
	setTimeout(function(){ 
		$("#leftContainer, #nameContainer, #personalityContainer, #rightContainer, #experienceContainer, #id").empty();
		$("#iFrameInput").attr("src", '');
	}, 250);
};

function grabber(t, url){
   	window.location.hash = t;
	currentURL = url;
};
function backHome(){	
	window.location.hash = 'home';
};
