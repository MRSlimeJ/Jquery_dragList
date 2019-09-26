$(document).ready(function(){
    var x,y,MD=false,WL,WR,WT,WB,LH=false,OLH=LH,scroll=window.scrollY
    $(".list").mousedown(function(event){
        if($(".list").is(".re_li"))return false
        $(this).addClass("move_list").parent(".li").addClass("move_li").css({"height":$(this).height()+20,"position":"static"})
        MD=true
        // LH=false
        cx=event.offsetX
        cy=event.offsetY
    })
    $(document).mouseup(function(){
        if($(".list").is(".move_list")){
            if(LH==false){
                $(".move_li").insertBefore(".in_li")
            }
            // $(".list").removeClass("move_list").css({"position":"relative","left":0,"top":0,"z-index":"0","border":"none","background":"#fff"})
            $(".move_list").css({"left":x-cx-$(".move_li").offset().left,"top":y-cy-$(".move_li").offset().top}).addClass("re_list").removeClass("move_list")
            $(".move_li").stop().animate({"height":$(".move_li").children(".list").height()+20},200/*,"linear"*/).removeClass("move_li").css({"position":"relative"})
            // $(".move_list").css({"left":x-cx-$(".move_li").offset().left,"top":y-cy-$(".move_li").offset().top})
            // $(".in_li").stop().animate({"margin-bottom":"10px"},200/*,"linear"*/).removeClass("in_li")
            $(".in_li").stop().animate({"margin-top":0,"margin-bottom":"10px"},200/*,"linear"*/).removeClass("in_li")
            LH=false
            MD=false
        }
    })
    $(document).mousemove(function(event){
        if(MD==true){
            if($(".move_li").siblings().is(".in_li")){
                console.log("siblings")
                $(".move_li").stop().animate({"height":0},200/*,"linear"*/)
                $(".li:last-child").addClass("in_li")
            }
            $("#menu").css({"background":"#fcc"})
            x=event.pageX
            y=event.pageY
            $(".move_list").css({"position":"absolute","left":x-cx,"top":y-cy,"z-index":"1000","border":"1px solid green","background":"#eeffee"})
            // var ML=$(".move_list").offset().left
            // var MR=ML+$(".move_list").width()
            // var MT=$(".move_list").offset().top
            // var MB=MT+$(".move_list").height()
            // console.log(ML)
            WL=$("#menu").offset().left+$("#menu").width()
            WR=WL-$("#menu").width()
            WT=$("#menu").offset().top+$("#menu").height()
            WB=WT-$("#menu").height()
            if(x<WL&&x>WR&&y<WT&&y>WB){
                LH=false
            }
            if((x>WL||x<WR)||(y>WT||y<WB)){
                // $(".in_li").stop().animate({"margin-top":0},200/*,"linear"*/)
                LH=true
            }
            if(LH==false){
                $(".li:last-child").stop().animate({"margin-bottom":"10px"},200/*,"linear"*/)
                if(OLH!=LH){
                    // $(".move_li").stop().animate({"height":$(".move_list").height()+20},200/*,"linear"*/)
                    OLH=LH
                    console.log("mouseenter")
                }
            }
            if(LH==true){
                if(OLH!=LH){
                    $(".in_li").stop().animate({"margin-top":"10px"},200/*,"linear"*/)
                    $(".li:last-child").addClass("in_li").stop().animate({"margin-bottom":$(".move_list").height()+40},200/*,"linear"*/).siblings().removeClass("in_li")
                    // if($(".move_li").height()>=1){
                    // }
                    OLH=LH
                    console.log("mouseleave")
                }
            }
            $(".li").each(function(){
                LL=$(this).offset().left+$(this).width()
                LR=LL-$(this).width()
                LT=$(this).offset().top+$(this).height()
                LB=LT-$(this).height()
                if(/*x<LL&&x>LR&&*/y<LT&&y>LB){
                    if(LH==false){
                        console.log("aa")
                        // if($(this).is(".in_li")){
                            // console.log("cc")
                            if($(this).siblings().is(".in_li")){
                                console.log("bb")
                                $(this).addClass("in_li").siblings(".in_li").removeClass("in_li").stop().animate({"margin-top":0},200/*,"linear"*/)
                                $(".in_li").stop().animate({"margin-top":$(".move_list").height()+40,"margin-bottom":"10px"},200/*,"linear"*/)
                            }
                        // }
                    }
                }
            })
        }
    })
    setInterval(function(){
        $(".re_list").animate({"left":0,"top":0},200/*,"linear"*/).addClass("re_li").removeClass("re_list")
        if($(".list").is(".re_li")){
            if($(".re_li").is(":animated")){
                // console.log("stop")
                return false
            }
            setTimeout(function(){
                $(".re_li").removeClass("re_li").css({"position":"relative","z-index":"0","border":"none","background":"#fff"})
                $("#menu").css({"background":"#ccf"})
            },200)
        }
        // if(MD==true){
        //     scroll=window.scrollY
        //     scroll++
        //     $(document).scrollTop(scroll)
        //     $(document).each(function(){
        //         x=event.pageX
        //         y=event.pageY
        //         console.log(x,y)
        //         $(".move_list").css({"position":"absolute","left":x-cx,"top":y-cy,"z-index":"1000","border":"1px solid green","background":"#eeffee"})
        //     })
        // }
    })
})