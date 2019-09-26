$(document).ready(function(){
    var x,y,Lx,Ly,MD=false,LH=false,OLH=LH,OMy=y,PH=($(window).height()/5),scroll=$(document).scrollTop(),Oscroll=scroll
    $("#menu").css({"height":$("#menu").height()})
    $(".list").mousedown(function(event){
        if($(this).is(".re_li"))return false
        $(this).addClass("move_list_set").parent(".li").addClass("move_li_set")
        $(".re_li").removeClass("re_li").css({"position":"relative","z-index":"0","border":"none","background":"#fff"})
        $(".li").each(function(){
            // if($(this).is(".move_li_set"))return false
            if($(this).index()>$(".move_li_set").index())$(this).addClass("un_li")
            if($(this).index()<$(".move_li_set").index())$(this).addClass("on_li")
        })
        MD=true
        // LH=false
        cx=event.offsetX
        cy=event.offsetY
    })
    $(document).mouseup(function(){
        if($(".li").is(".ho_li")){
            if($(".move_li").is(".under")){
                $(".move_li").insertAfter(".ho_li")
            }else{
                $(".move_li").insertBefore(".ho_li")
            }
            $(".li").css({"transition":"none"}).css({"transform":`none`})
        }
        $(".li").css({"transform":`none`})
        $(".move_list_set").removeClass("move_list_set")
        $(".move_li_set").removeClass("move_li_set").siblings().removeClass("un_li").removeClass("on_li")
        if($(".list").is(".move_list")){
            $(".ho_li").removeClass("ho_li")
            $(".move_list").css({"left":x-cx-$(".move_li").offset().left,"top":y-cy-$(".move_li").offset().top}).addClass("re_list").removeClass("move_list")
            $(".move_li").removeClass("move_li").removeClass("under").css({"position":"relative"})
        }
        $(".li").css({"transition":"0.1s"})
        MD=false
    })
    .scroll(function(){
        scroll=$(document).scrollTop()
        // console.log(scroll,Oscroll)
        if(MD==true){
            y=y+(scroll-Oscroll)
            $(".move_list").css({"position":"absolute","left":x-cx,"top":y-cy,"z-index":"1000","border":"1px solid green","background":"#eeffee"})
            // if(y>=$("#menu").height())y=$("#menu").height()
            move_li()
        }
        Oscroll=scroll
    })
    function move_li(){
        WL=$("#menu").offset().left
        WR=WL+$("#menu").width()+20
        WT=$("#menu").offset().top
        WB=WT+$("#menu").height()+20
        Lx=x-cx+($(".move_li").width()/2)
        Ly=y-cy+($(".move_li").height()/2)
        if(Lx<WR&&Lx>WL&&Ly<WB&&Ly>WT){
            LH=false
            $("#menu").css({"background":"#fdd"})
            if(OLH!=LH){
                // console.log("enter")
                // $(".li").css({"transform":`none`})
                $(".li").each(function(){
                    if($(this).is(".move_li"))return true
                    // console.log("hover")
                    LL=$(this).offset().left
                    LR=LL+$(this).width()
                    LT=$(this).offset().top+5
                    LB=LT+$(this).height()+5
                    if(Lx<LR&&Lx>LL&&Ly<LB&&Ly>LT){
                        // if($(this).is(":animated"))return true
                        // if($(this).is(".move_li"))return true
                        if($(this).is(":animated"))return true
                        $(this).next().addClass("ho_li").siblings().removeClass("ho_li")
                            if($(this).is(".on_li")){
                                $(this).css({"transform":`none`}).prevAll(".on_li").css({"transform":`none`})
                                $(this).nextAll(".on_li").css({"transform":`translate(0,${$(".move_li").height()+10}px)`})
                            }
                            if($(this).is(".un_li")){
                                $(this).css({"transform":`translate(0,-${$(".move_li").height()+10}px)`}).prevAll(".un_li").css({"transform":`translate(0,-${$(".move_li").height()+10}px)`}).prevAll(".on_li").css({"transform":`none`})
                                // $(this).nextAll(".on_li").css({"transform":`translate(0,-${$(".move_li").height()+10}px)`})
                            }
                    }
                    if($(this).is(":last-child")){
                        if(Lx<LR&&Lx>LL&&Ly>LB){
                            $(this).addClass("ho_li").siblings().removeClass("ho_li")
                            $(".move_li").addClass("under")
                        }
                    }
                })
                OLH=LH
            }else{
                $(".li").each(function(){
                    if($(this).is(".move_li"))return true
                    // console.log("hover")
                    LL=$(this).offset().left
                    LR=LL+$(this).width()
                    LT=$(this).offset().top+5
                    LB=LT+$(this).height()+5
                    if(Lx<LR&&Lx>LL&&Ly<LB&&Ly>LT){
                        // if($(this).is(":animated"))return true
                        // if($(this).is(".move_li"))return true
                        if($(this).is(":animated"))return true
                        if(y>OMy){
                            $(this).next().addClass("ho_li").siblings().removeClass("ho_li")
                            if($(this).is(".on_li")){
                                $(this).css({"transform":`none`}).prevAll(".on_li").css({"transform":`none`})
                                $(this).nextAll(".on_li").css({"transform":`translate(0,${$(".move_li").height()+10}px)`})
                            }
                            if($(this).is(".un_li")){
                                $(this).css({"transform":`translate(0,-${$(".move_li").height()+10}px)`}).prevAll(".un_li").css({"transform":`translate(0,-${$(".move_li").height()+10}px)`}).prevAll(".on_li").css({"transform":`none`})
                                // $(this).nextAll(".on_li").css({"transform":`translate(0,-${$(".move_li").height()+10}px)`})
                            }
                        }else{
                            $(this).addClass("ho_li").siblings().removeClass("ho_li")
                            if($(this).is(".un_li")){
                                $(".on_li,.ho_li").css({"transform":`none`}).siblings(".ho_li~.un_li").css({"transform":`none`})
                                $(this).css({"transform":`none`}).prevAll(".un_li").css({"transform":`translate(0,-${$(".move_li").height()+10}px)`})
                                // $(this).nextAll(".on_li").css({"transform":`translate(0,-${$(".move_li").height()+10}px)`})
                            }
                            if($(this).is(".on_li")){
                                $(".un_li").css({"transform":`none`}).siblings(".ho_li~.on_li").css({"transform":`translate(0,${$(".move_li").height()+10}px)`})
                                $(this).css({"transform":`translate(0,${$(".move_li").height()+10}px)`}).prevAll(".on_li").css({"transform":`none`})
                                $(this).nextAll(".on_li").css({"transform":`translate(0,${$(".move_li").height()+10}px)`})
                            }
                        }
                    }
                    if((Lx>LR||Lx<LL)||(Ly>LB||Ly<LT)){
                    }
                    if($(this).is(":last-child")){
                        if(Lx<LR&&Lx>LL&&Ly>LB){
                            $(this).addClass("ho_li").siblings().removeClass("ho_li")
                            $(".move_li").addClass("under")
                        }
                    }
                })
            }
        }
        if((Lx>WR||Lx<WL)||(Ly>WB||Ly<WT)){
            LH=true
            $("#menu").css({"background":"#ddf"})
            if(OLH!=LH){
                // console.log("leave")
                $(".un_li").css({"transform":`translate(0,-${$(".move_li").height()+10}px)`})
                $(".on_li").css({"transform":`none`})
                $(".ho_li").removeClass("ho_li")
                OLH=LH
            }
        }
    }
    $(document).mousemove(function(event){
        $(".move_li").removeClass("under")
        if(MD==true){
            $(".move_list_set").addClass("move_list").removeClass("move_list_set").parent(".li").addClass("move_li").css({"height":$(".move_list").height()+20,"position":"static"})
            
            x=event.pageX
            y=event.pageY
            $(".move_list").css({"position":"absolute","left":x-cx,"top":y-cy,"z-index":"1000","border":"1px solid green","background":"#eeffee"})
            move_li()
        }
        OMy=y
    })
    // .scroll(function(){
    //     if(MD==true){
    //         y=Oscroll-scroll
    //         $(".move_list").css({"position":"absolute","left":x-cx,"top":y-cy,"z-index":"1000","border":"1px solid green","background":"#eeffee"})
    //         Oscroll=scroll
    //     }
    // })
    setInterval(function(event){
        $(".re_list").animate({"left":0,"top":0},200/*,"linear"*/).addClass("re_li").removeClass("re_list")
        if($(".list").is(".re_li")){
            if($(".re_li").is(":animated")){
                return false
            }
            setTimeout(function(){
                $(".re_li").removeClass("re_li").css({"position":"relative","z-index":"0","border":"none","background":"#fff"})
                if($(".li").is(".move_li"))return false
                $("#menu").css({"background":"#ddd"})
            },300)
        }
        // /*
        if($(".li").is(".move_li")){
            // if(y-scrollY<PH*3.5&&y-scrollY>PH*1.5)return false
            // console.log($(document).height() - $(window).height());
            // console.log($(window).height());
            // if($(window).scrollTop() >= 1103) return;
            if(y-scrollY>PH*3.5&&$(window).scrollTop()<=$(window).height()+3){
                if(y-scrollY>=$(window).height())return false
                // console.log($("body").prop("scrollHeight")-$(".body").height(),scrollY)
                $(document).scrollTop(scrollY+1)
                if(y-scrollY>PH*4){
                    $(document).scrollTop(scrollY+1)
                    if(y-scrollY>PH*4.4){
                        $(document).scrollTop(scrollY+2)
                        if(y-scrollY>PH*4.8){
                            $(document).scrollTop(scrollY+4)
                        }
                    }
                }
                move_li()
            }
            if(y-scrollY<PH*1.5&&scrollY>=1){
                if(scrollY<=0)return false
                $(document).scrollTop(scrollY-1)
                if(y-scrollY<PH&&scrollY>=1){
                    $(document).scrollTop(scrollY-1)
                    if(y-scrollY<PH*0.6&&scrollY>=1){
                        $(document).scrollTop(scrollY-2)
                        if(y-scrollY<PH*0.2&&scrollY>=1){
                            $(document).scrollTop(scrollY-4)
                        }
                    }
                }
                move_li()
            }
            // if($(window).scrollTop()>=$(window).height()||scrollY<=0){
            //     // console.log("end")
            //     return false
            // }
            // scroll=$(document).scrollTop()
            // console.log(scroll)
            $(".move_list").css({"position":"absolute","left":x-cx,"top":y-cy,"z-index":"1000","border":"1px solid green","background":"#eeffee"})
        }
        // */
    })
})