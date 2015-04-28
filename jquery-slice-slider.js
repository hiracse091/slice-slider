currentSlide = 0;
row = 2
col = 4
width = 940
height = 470
gap = 2;
animationDelay = 600;
offset = 150;
duration_total = (row*col-1)*offset ;
autoSlide = '';
stop = 0;
sleft =  0;
function init(){
	console.log('called');
	duration_spent = animationDelay ;

	width = $('.slide').width();
	height = $('.slide').height();
	slice_width = parseInt(width /col);
	slice_height = parseInt(height/row);
	$('#pager').html('');
	var pager = $('<ul/>')
		.addClass('pager')
		.appendTo('#pager');
	for(i=0; i<$('.slide').length ; i++)
	{
	    var li = $('<li/>')
	        .addClass('pager-item')
	        .attr('ind', i )
	        .appendTo(pager);
	    var aaa = $('<a/>')
	        .addClass('pager-link')
	        /*.text(i+1)*/
	        .appendTo(li);
	}
	$('.pager .pager-item').click(function(){
		clearInterval(autoSlide);
		console.log($(this).index());
		currentSlide = $(this).index();
		slide();
		setTimeout(function(){
			auto_slide();
		},duration_total+300)
	})
	slide();
	auto_slide();
}
function auto_slide(){
	autoSlide = setInterval(function() {
		
		if(currentSlide >= ($('.slide').length-1)){
			currentSlide = 0;
		}else{
			currentSlide++;
		}
	  	slide();
	}, 2500);
}
function slide(){

	/*duration_spent = animationDelay ;

	width = $('.slide').width();
	height = $('.slide').height();*/

	slideImg =  $($('.slide')[currentSlide]).find('img').attr('src');

	$('.current_slide').html(currentSlide+1)
	
	/*slice_width = parseInt(width /col);
	slice_height = parseInt(height/row);*/

	var html = '';
	for(i=0; i<row; i++){
		stop = slice_top = 0;
		sleft = slice_left = 0;
		/*top = slice_top;
		left = slice_left;*/
		
		for(j =0 ; j<col; j++){
			
			stop = slice_top = i * slice_height;
			sleft = slice_left = j* slice_width; 

			if(j > 0 ){	
				//console.log(j);			
				sleft += gap*j;
			}
			if(i > 0 ){
				stop += 2;
				//console.log(stop);
			}
			console.log(slice_left+', '+ slice_top);
			console.log(sleft+', '+ stop);
			html += '<div style="background-image:url('+slideImg+');background-position:-'+slice_left+'px  -'+slice_top+'px; left:'+sleft+'px; top:'+stop+'px;"></div>'
		}
		
	}
	
	if($('.fake-slide-'+currentSlide).length>0){
		$('.fake-slide-'+currentSlide).remove();
	}
	$('.fake-img').append('<div class="fake-slide fake-slide-'+currentSlide+'">'+html+'</div>');
	
	$(".fake-slide-"+currentSlide+" div").css({width:'0px',height:slice_height,backgroundSize: width+'px '+height+'px',opacity:0});
	animateSlide();
	
	
}
function animateSlide(){
	

	function animate(obj) {
	    setTimeout(function(){
			if($(obj).index() > 0){
		    	duration_spent += offset;	
		    }		    	
		    //console.log(duration_spent);
	    	
			
	        $(obj).animate({
	            opacity: "1",
	            width:slice_width+'px'
	        }, animationDelay);
	    },$(obj).index()*offset)

	    
	}

	$(".fake-img .fake-slide-"+currentSlide+" div").each(function(){
	    animate(this);
	})
}
$(window).resize(function(){
	width = $('.slide').width();
	height = $('.slide').height();
	$('.fake-img').html('');
	
})
