$(function(){	

	/*导航选中样式*/
	$(".nav ul li").click(function(){
		$(this).children("a").addClass('selected');
		$(this).siblings().children("a").removeClass('selected');
	});

	/*注册登陆弹窗*/
	var oLogin = $('#doLogin');
	var oReg = $('#doReg');

    /*登陆弹窗*/
    $('#openLogin').click(function() {

        //遮罩层
        $("#form_bg").css({
            display: "block",
            height: $(document).height()
        });

        oLogin.css('display', 'block');
        $('.head').append(oLogin);

        //登录框居中
        oLogin.css('left', ($(window).width() - oLogin.outerWidth()) / 2);
        oLogin.css('top', ($(window).height() - oLogin.outerHeight()) / 2);

        //关闭
        $('.close').click(function() {
            oLogin.remove();
            $("#form_bg").css('display', 'none');
        });
        //登录框随滚动条移动
	 	$(window).on('resize scroll', function(){
	 		oLogin.css('left', ($(window).width() - oLogin.outerWidth())/2 );
			oLogin.css('top', ($(window).height() - oLogin.outerHeight())/2 + $(window).scrollTop() );
 		});
    });
	

    /*注册弹窗*/
    $('#openRegister').click(function() {

        //遮罩层
        $("#form_bg").css({
            display: "block",
            height: $(document).height()
        });

        oReg.css('display', 'block');
        $('.head').append(oReg);

        //注册框居中
        oReg.css('left', ($(window).width() - oReg.outerWidth()) / 2);
        oReg.css('top', ($(window).height() - oReg.outerHeight()) / 2);

        //关闭
        $('.close').click(function() {
            oReg.remove();
            $("#form_bg").css('display', 'none');

        });

        //注册框随滚动条移动
        $(window).on('resize scroll',
        function() {
            oReg.css('left', ($(window).width() - oReg.outerWidth()) / 2);
            oReg.css('top', ($(window).height() - oReg.outerHeight()) / 2 + $(window).scrollTop());
        });

    });


	/*视频清晰度遮罩层*/
	$(".definition").click(function(){
		$(".definition_bg").toggle();
	});
		
	$(".definition_bg").click(function(){
		$(this).hide();
	});
		
   
	/*  保存笔记  */
	$(".save_button").click(function(){
	    var notes = $(".save textarea").val();
	    var html  =  "<div class='write_notes'>";
		html += "<p>"+notes+"</p>"
		html += "<span> X </span>"
		html += "</div>"
		if(notes){
			$('.save').after(html);	
		}  

    	$(".write_notes span").click(function(){
			$(this).parent().remove();
    	});
    	$(".save textarea").val("");
	});



	/*视频右侧伸缩条*/
	$(".show_hide").click(function() {
		$(this).hide();
		$(".video .video_catalog").fadeIn();
		$("a").filter(".selected_video").removeClass("selected_video selected_note selected_knowledge selected_teach selected_activity selected_expert");
		$(".video .saw-feel").hide();    
		$(".video .knowledge_show").hide();
		$(".video .teach_link").hide();
		$(".video .join_activity").hide();
		$(".video .expert_comment").hide();
	});


	/*视频最右侧tab切换*/
	$("a").filter(".note_show").click(function(){
		init();	
		$(".show_hide").show();
		$("div").filter(".saw-feel").fadeIn();
		$(this).addClass("selected_video selected_note");
	});
	$("a").filter(".knowledge_dis").click(function(){
		init();
		$(".show_hide").show();
		$("div").filter(".knowledge_show").fadeIn();
		$(this).addClass("selected_video selected_knowledge");
	});
	$("a").filter(".teach_show").click(function(){
		init();	
		$(".show_hide").show();
		$("div").filter(".teach_link").fadeIn();
		$(this).addClass("selected_video selected_teach");
	});
	$("a").filter(".activity_show").click(function(){
		init();	
		$(".show_hide").show();
		$("div").filter(".join_activity").fadeIn();
		$(this).addClass("selected_video selected_activity");
	});
	$("a").filter(".expert_show").click(function(){
		init();	
		$(".show_hide").show();
		$("div").filter(".expert_comment").fadeIn();
		$(this).addClass("selected_video selected_expert");
	});

	function init(){
		$(".video .video_catalog").hide();
		$("div").filter(".saw-feel").hide();
		$("a").filter(".note_show").removeClass("selected_video selected_note");
		$("div").filter(".knowledge_show").hide();
		$("a").filter(".knowledge_dis").removeClass("selected_video selected_knowledge");
		$("div").filter(".teach_link").hide();
		$("a").filter(".teach_show").removeClass("selected_video selected_teach");
		$("div").filter(".join_activity").hide();
		$("a").filter(".activity_show").removeClass("selected_video selected_activity");
		$("div").filter(".expert_comment").hide();
		$("a").filter(".expert_show").removeClass("selected_video selected_expert");
	};

	/*轮播*/
	//鼠标移入 按钮出现 离开消失
		//jq如何获取对象
		var timeInter = null;
		var _index = 0;
		var len = $(".banner .pic ul li").length;
		$(".banner").hover(function(){
			$(".banner a").show();
		},function(){
			$(".banner a").hide();	
		});
			
	
		//数字按钮切换
		
		$(".banner .num-but ul li").hover(function(){
			_index = $(this).index();//获取当前序列
			auto();
		});
		//轮播函数
		function auto(){
			$(".banner .num-but ul li").eq(_index).addClass("red").siblings().removeClass("red");
			$(".banner .pic ul li").eq(_index).fadeIn().siblings().fadeOut();
		}
		$(".banner a.but-r").click(function(){
			_index++;
			if(_index>len-1){
				_index = 0
			}
			auto();
		});

		$(".banner a.b").hover(function(){
			$(this).css('opacity','1');
		},function(){
			$(this).css('opacity','0.8');
		});
		

		$(".banner a.but-l").click(function(){
			_index--;
			if(_index<0){
				_index = len-1;
			}
			auto();
		});

		$(".banner").hover(function() {
        	clearInterval(timeInter);
    	},function() {
        timeInter = setInterval(function(){
						_index++;
						if(_index>len-1){
						_index = 0;
					}
					auto();
			},3000);
     }).trigger("mouseout");

});
	


	/*百度搜索*/
	var oTexts = document.getElementById('search_input');
	var oUls = document.getElementById('baidu_search');

	oTexts.onkeyup = function() {		
		if ( this.value != '' ) {
			var oScript = document.createElement('script');
			oScript.src = 'http://suggestion.baidu.com/su?wd='+this.value+'&cb=search';
			document.body.appendChild(oScript);
		} else {
			oUls.style.display = 'none';
		}
	}	

	document.onclick = function(){
		oUls.style.display = 'none';
	}


	function search(data) {	
		var oUls = document.getElementById('baidu_search');
		var html = '';
		if (data.s.length) {
			oUls.style.display = 'block';
			for (var i=0; i<data.s.length; i++) {
				html += '<li><a target="_blank" href="http://www.baidu.com/s?wd='+data.s[i]+'">'+ data.s[i] +'</a></li>';
			}
			oUls.innerHTML = html;
		} else {
			oUls.style.display = 'none';
		}
	}


	/*滚动出现锚点*/
	var oTop = document.getElementById('top');
	var oPage = document.documentElement.clientHeight;
	var timer = null;

	window.onscroll = function(){
        var backtop = document.body.scrollTop;
        if(backtop >= oPage){
            oTop.style.display = "block";
        }else{
            oTop.style.display = "none";
        }
	}

	oTop.onclick = function () {
    	timer = setInterval(function () {
            var backtop = document.body.scrollTop;
            document.body.scrollTop = backtop*(9/10);  //控制向上滚动的速度
            if(backtop ==0){
                clearInterval(timer);
            }
        }, 10);
	}
	
