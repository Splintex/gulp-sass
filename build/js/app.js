(function() {
	
	$(document).click(function(){
		$(".js-time").removeClass("is-visible");
		$(".js-choose-time").removeClass("is-active");
		$(".js-info-tip").fadeOut(500);
	});

	function scrollHeader() {
		var header = $(".js-header-index");
		if ($(document).scrollTop() > 0) {
			header.removeClass("no-bg");
		}
		else {
			header.addClass("no-bg");
		}
	}
	scrollHeader();

	$(window).scroll(function(){
		scrollHeader();
	});

	$(".js-slide-links a").on("click", function(){
		var slide = $(this).attr("href");
		$(".js-slide[data-slide="+slide+"]").addClass("is-visible");
		$(".js-default-img").fadeOut(500);
		$(".js-slide-img[data-slide="+slide+"]").fadeIn(500);
		return false;
	});

	$(".js-close-slide").on("click", function(){
		$(".js-slide").removeClass("is-visible");
		$(".js-default-img").fadeIn(500);
		$(".js-slide-img").fadeOut(500);
		return false;
	});


	
	$(".js-tabs a").on("click", function(){
		var index = $(this).parent().index();
		var group = $(this).parents(".js-tabs").attr("data-group");
		$(this).parents(".js-tabs").find("li").removeClass("is-active");
		$(this).parent().addClass("is-active");
		$("."+group).find(".js-tab-cont").hide().removeClass("is-visible");;
		$("."+group).find(".js-tab-cont").eq(index).show().addClass("is-visible");
		return false;
	});

	var end = $(".js-video-slide").length;
	var count=1;
	var count2=1;
	var player = document.getElementById('myVideo');
	var mp4Vid = document.getElementById('mp4Source');
	var webmVid = document.getElementById('webmSource');
	var ogvVid = document.getElementById('ogvSource');
	var animDuration = 500;

	if(player) {
		player.addEventListener('canplay',videoStart,false);
		player.addEventListener('ended',videoEnd,false);
	}
	
	
	function videoStart() {
		
    	var time = player.duration*1000;
    	// loader
		var circle = new ProgressBar.Circle('.js-circle-'+count2, {
		    color: '#fff',
		    strokeWidth: 3,
		    fill: 'none',
		    duration: time
		});
		circle.animate(1, function(){
			circle.destroy();
		});

		count2++;
	    if (count2 > end) {
	    	count2 = 1;
	    }

	    setTimeout(function(){
			$("#myVideo").fadeOut(animDuration);
			$(".js-video-slide").fadeOut(animDuration);
		}, time-animDuration);
	}

    function videoEnd(e) {
	    if(!e) {
	        e = window.event; 
	    }
	    count++;
	    if (count > end) {
	    	count = 1;
	    }

		$("#myVideo").fadeIn(animDuration);
		$('[data-slide="js-video-'+count+'"]').fadeIn(animDuration);

		$(mp4Vid).attr('src', "video/"+count+".mp4");
		$(webmVid).attr('src', "video/"+count+".webm");
		$(ogvVid).attr('src', "video/"+count+".ogv");

		player.load();
		player.play();
   }
// make loader
	// var circle = new ProgressBar.Circle('.js-circle', {
		//     color: '#fff',
		//     strokeWidth: 4,
		//     fill: 'none',
		//     duration: videoDuration*1000
		// });
		// circle.animate(1, function(){});

	$(".js-popup-toggle").on("click", function(){
		var popup = $(this).attr("href");
		$(".js-popup").hide();
		$("."+popup).fadeIn(300);
		$("html").addClass("has-open-popup");
		return false;
	});

	$(".js-close-popup").on("click", function(){
		$(this).parents(".js-popup").hide();
		$("html").removeClass("has-open-popup");
		return false;
	});

	window.sr = new scrollReveal();

	$(".js-hide-parent").on("click", function(){
		$(this).parents(".js-parent-hidden").fadeOut(300);
	});	

	$(".js-target-link a").on("click", function(){
		var hash = $(this).attr("href");
		$("html, body").animate({
			scrollTop: $("[data-target="+hash+"]").offset().top
		}, 800);
		window.location.hash = this.hash;
		return false;
	});

	function loadNav() {
		if (window.location.hash) {
		  var hash = window.location.hash;
			$("html, body").animate({
			  scrollTop: $("[data-target="+hash+"]").offset().top
		  }, 800);
		}
	   
		
	}
   loadNav();

   $(".js-select select").on("change", function(){
		var val = $(this).val();
		$(this).parent().find("input").val(val);
		$(this).parent().find(".js-placeholder").hide();
		return false;
	});

   $("body").on("click", ".js-close-window", function(){
		$(this).parents(".js-window").fadeOut(300);
		$("html").removeClass("no-scroll");
		$("html").removeClass("has-open-calendar");
		if ($(".js-header-index").hasClass("js-no-bg")) {
			$(".js-header-index").addClass("no-bg");
			$(".js-header-index").removeClass("js-no-bg");
		}
		return false;
	});

   $(".js-window-toggle").on("click", function(){
		var win = $(this).attr("href");
		$(".js-window").hide();
		$("."+win).fadeIn(300);
		$("html").addClass("no-scroll");
		if ($(".js-header-index").hasClass("no-bg")) {
			$(".js-header-index").removeClass("no-bg");
			$(".js-header-index").addClass("js-no-bg");
		}
		return false;
	});

   $(".js-toggle-date").on("click", function(){
		$(".js-window-calendar").fadeIn(300);
		$("html").addClass("has-open-calendar");
		return false;
	});

   // $(".js-input input").on("keydown", function(){
   // 		if ($(this).val().length>=0) {
   // 			$(this).parent().find(".js-placeholder").hide();
   // 		}
   // 		else {
   // 			$(this).parent().find(".js-placeholder").show();
   // 		}
   		
   // });

   $(".js-input").on("change", function(){
   		if ($(this).val().length>0) {
   			$(this).parent().find(".js-placeholder").hide();
   		}
   		else {
   			$(this).parent().find(".js-placeholder").show();
   		}
   		
   });

	$(".js-input").each(function(){
   		if ($(this).val().length>0) {
   			$(this).parent().find(".js-placeholder").hide();
   		}
   		else {
   			$(this).parent().find(".js-placeholder").show();
   		}
   		
   });

	$(".js-input").focus(function(){
		$(".js-input-tip").fadeIn(300);
	});

	// validation form
	function validate() {
		$('.js-validate').each(function(){
			if ($(this).length > 0) {
				$(this).validate({
					errorClass: 'has-error',
					rules: {
						name: {
							minlength: 2
						},
						any: {
							minlength: 2
						},
						password: {
							minlength: 5
						},
						confirm_password: {
							minlength: 5,
							equalTo: '#password'
						},
						//email: {
						//	email: true
						//},
						//tel: {
							//minlength: 5,
							//digits: true
						//},
						digits: {
							//minlength: 2,
							digits: true
						},
						date: {
							date: true
						},
						address: {
							minlength: 2
						},
						show: {
							minlength: 2
						},
						message: {
							minlength: 4
						},
						field: {
							required: true
						},
						// fruit: {
						//   required: true
						// }
					},
					messages: {
						firstname: 'Вас так зовут?',
						name: 'У вас такая фамилия?',
						fathername: 'У вас такое отчество?',
						password: {
							required: 'Введите пароль',
							minlength: 'Минимум 5 символов'
						},
						confirm_password: {
							 required: 'Пароли не совпадают',
							 minlength: 'Минимум 5 символов',
							 equalTo: 'Пароли не совпадают'
						},
						email: 'Неверный формат',
						address: 'Это Ваш адрес?',
						any: 'Заполните поле',
						company: 'Заполните поле',
						date: 'Заполните поле',
						username: 'Ваше имя',
						tel: {
							required: 'Заполните поле',
							digits: 'Только цыфры'
						},
						digits: "Только цыфры",
						message: {
							required: 'Заполните поле',
							minlength: 'Заполните поле'
						}
					}
				});
			}
		});
	}
		
	validate();


	$('input[name="email"]').on('keyup', function(){
    	var value = $(this).val();
	    var re = /[\sА-Яа-я]$/;
	    var regMail = /[-0-9a-zA-Z.+_]+@[-0-9a-zA-Z.+_]+\.[a-zA-Z]{2,4}$/;
	    if (re.test(value)) {
	        value = value.replace(re, '');
	        $(this).val(value);
	    }
	    if (regMail.test(value)) {
	    	$(this).removeClass('has-error');
	    } else {
	    	$(this).addClass('has-error');
	    }
    });
   $('input[name="phone"]').on('keyup', function(){
        var value = $(this).val();
        var re = /[^0-9,]/;
        if (re.test(value)) {
	        value = value.replace(re, '');
	        $(this).val(value);
	    }

    	if($(this).val().length < 5 || $(this).val().length > 12) {
    		$(this).addClass('has-error');
    	} else {
	    	$(this).removeClass('has-error');
	    }
    });

    $('input[name="name"]').on('keyup', function(){
    	var value = $(this).val();
	    var reg = /[^\sa-zA-Zа-яА-Я]$/i;
	    var regFinal = /([a-zA-Zа-яА-Я]{2,})$/i;
	    if (reg.test(value)) {
	        value = value.replace(reg, '');
	        $(this).val(value);
	    }
	    if (regFinal.test(value)) {
	    	$(this).removeClass('has-error');
	    } else {
    	    $(this).addClass('has-error');
	    }
    });

	$(".js-choose-time").on("click", function(event){
		if ($(this).hasClass("is-active")) {
			$(this).parent().find(".js-time").removeClass("is-visible");
			$(this).removeClass("is-active");
		}
		else {
			$(".js-time").removeClass("is-visible");
			$(".js-choose-time").removeClass("is-active");
			$(this).parent().find(".js-time").addClass("is-visible");
			$(this).addClass("is-active");
		}
		
		event.stopPropagation();
		return false;
	});
	$(".js-time").on("click", function(event){
		event.stopPropagation();
	});

	setTimeout(function(){
		$(".js-timeout-tickets").addClass("is-active");
	}, 1000);
	setTimeout(function(){
		$(".js-timeout-scheck").slideDown(800);
	}, 1500);

	setInterval(function(){

		// if ($(".js-tips-group-4").find(".is-visible").next().length>0) {
	 //     	$(".js-tips-group-4").find(".is-visible").removeClass("is-visible").next().addClass("is-visible");
	 //  	}
	 //  	else {
	 //  		$(".js-tips-group-4 .js-tip").removeClass("is-visible");
	 //     	$(".js-tips-group-4 .js-tip").first().addClass("is-visible");
	 //  	}
	
	}, 7000)

	function number() { 
        var number = $(".js-number");
        number.each(function(){
            var max_number = +($(this).attr("data-max-number"));
            var input = $(this).find("input");
            var plus = $(this).find(".js-plus-number");
            var minus = $(this).find(".js-minus-number");
            if(input.val() == 0) {
            	minus.addClass("is-disabled");
            }
            plus.on("click", function(){
                var val = +(input.val());
                if (val >= max_number) {
                    return false
                }
                else {
                    val += 1;
                    input.val(val);
                }
               $(this).parent().find(".js-minus-number").removeClass("is-disabled");
            });
            minus.on("click", function(){
                var val = +(input.val());
                if (val > 0) {
                    val -= 1;
                    input.val(val);
                }
                if (val == 0) {
                	$(this).addClass("is-disabled");
                } 
                else {
                	
                    return false;
                }
            });

        });
    }
    number();


    $(".js-show-tip").on("click", function(event){
    	$(this).parents(".js-info-tip-group").find(".js-info-tip").fadeOut(500);
    	$(this).parent().find(".js-info-tip").fadeIn(500);
    	event.stopPropagation();
    });

    $(".js-hover-tip").hover(function(){
    	$(".js-info-tip").fadeIn(500);
    });

    $(".js-toggle-map").on("click", function(){
    	var text = $(this).text();
    	var attr = $(this).attr("data-text");
		$(".js-map").toggleClass("is-active");
		$(this).text(attr);
		$(this).attr("data-text",text);
		return false;
	});

	$(".js-close-map").on("click", function(){

		var text = $(".js-toggle-map").text();
    	var attr = $(".js-toggle-map").attr("data-text");

    	$(".js-map").removeClass("is-active");

    	$(".js-toggle-map").text(attr);
		$(".js-toggle-map").attr("data-text",text);
		return false;
	});

	$(".js-radiobox").on("click", function(){
    	$(".js-radiobox").removeClass("is-active");
    	$(this).addClass("is-active");
		return false;
	});

	$(".js-row-hover").hover(
    	function(){
	    	var hover = $(this).attr("data-hover");
	    	$(".js-row").attr("class", "js-row");
	    	$("[data-row="+hover+"]").attr("class", "js-row is-active");
   	 	},
   	 	function(){
	    	$(".js-row").attr("class", "js-row");
   	 	}
    );

	$(".js-row").hover(
		function(){
			var row = $(this).attr("data-row");
			$(".js-row-hover").removeClass("is-active");
			$("[data-hover="+row+"]").addClass("is-active");
			var color = $(this).children().attr("stroke");
			$(this).children().attr("fill", color);
		},
		function(){
			$(".js-row-hover").removeClass("is-active");
			$(this).children().attr("fill", "#fff");
		}
	);
	$(".js-row").on("click", function(){
    	var row = $(this).attr("data-row");
		$(".js-plan-tip").removeClass("is-visible").hide();
		$("[data-hover="+row+"]").find(".js-plan-tip").addClass("is-visible").fadeIn(300);
		return false;
	});

	$(".js-open-disqus").on("click", function(){
    	$(".js-disqus").addClass("is-visible");
		return false;
	});
	$(".js-close-disqus").on("click", function(){
    	$(".js-disqus").removeClass("is-visible");
		return false;
	});

	$('.js-play-video').on('click', function() {
	    $(".js-video-youtube iframe")[0].src += "&autoplay=1";
	    $(this).fadeOut(300);
	   // ev.preventDefault();
	});

	$(".js-plan path").hover(
		function(){
			var html = $(this).attr("data-info");
			$(".js-path-tip").html(html);
			var top = $(this).position().top;
			var left = $(this).position().left;
			var height = $(".js-path-tip").outerHeight();

			$(".js-path-tip").show().css({
				top: top-height,
				left: left
			});
		}
	);
	$(".js-plan path").on('click', function() {
	    if ($(this).attr("class") == "is-selected") {
	    	$(this).attr("class", "")
	    }
	    else {
	    	$(this).attr("class", "is-selected");
	    }
	});


})();