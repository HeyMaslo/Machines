
var docTitle = document.title;



 $(document).mouseup(function () {
   
 });

$(function() {

        $(window).bind("hashchange", function(){
            var newHash = window.location.hash.substring(1);
			
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

function launcher(t){	
	setTimeout(function(){ 
		ajax(t);
		$("#leftContainer, #nameContainer, #personalityContainer, #rightContainer, #experienceContainer").css({'opacity': 1});
	}, 300);
	
};
function cleaner(){	
	 $("#leftContainer, #nameContainer, #personalityContainer, #rightContainer, #experienceContainer").css({'opacity': 0});
	setTimeout(function(){ $("#leftContainer, #nameContainer, #personalityContainer, #rightContainer, #experienceContainer").empty();}, 250);
};

function grabber(t){
   	window.location.hash = t;
	
};
function backHome(){	
	window.location.hash = 'home';
};
