require('../css/index.less');
require('../css/common.less');
require('../css/swiper.min.less');
import $ from 'jquery';
import Swiper from 'swiper';
import Footer from '../footer/footer'

$(function () {
    const App=function(){
        var dom=document.getElementById('footerHtml');
        let footer=new Footer();
        dom.innerHTML=footer.tpl;
    }
    new App();

    new cocogc();
    function cocogc() {
        //生产接口
        this.apiUrl = "https://api.cocogc.cn/";

        //banner
        var swiperLen = $('.swiper-wrapper').children('.swiper-slide').length;
        this.mySwiperNav = new Swiper('#header-nav .swiper-container', {
          loop: swiperLen>1?true:false,
          autoplay:swiperLen>1?true:false,
          pagination: swiperLen>1?{el: '.swiper-pagination'}:'',
          allowTouchMove:swiperLen>1?true:false,
        })

        $.ajax({
            type: "POST",
            url: this.apiUrl + "news/newsList",
            data: JSON.stringify({
                "catId": 255,
                "startNum": 0,
                "num": 20
            }),
            contentType: 'application/json',
            dataType: "json",
            success: function (res) {
                if(res.resultCode===0){
                    var data = res.data;
                    for (var i = 0; i < 3; i++) {
                        $(".contenHid").html(data[i].noticeContent);
                        var noticeContent = $(".contenHid").text();
                        var createTime = data[i].url?data[i].url.split(' ')[0].replace(/-/g, '.'):'';
                        var html = `
                            <div class="swiper-slide">
                              <a class="news-left" href="articel.html?noticeId=${data[i].noticeId}" >
                                <img src="${data[i].img}" alt="">
                                <div class="news-left-info">
                                  <h4>${data[i].noticeTitle}</h4>
                                  <p class="time">${createTime}</p>
                                  <div class="content">${noticeContent}</div>
                                </div>
                              </a>
                            </div>
                        `
                        $(".news-wrapper").append(html);
                    }
                    for (var i = 3; i < 6; i++) {
                        var day = data[i].url?(data[i].url.split('-')[2].split(' ')[0]):'';
                        var year = data[i].url?(data[i].url.split(' ')[0].split('-')[0]+'.'+ data[i].url.split(' ')[0].split('-')[1]):'';
                        var html = `
                            <li>
                                <a href="articel.html?noticeId=${data[i].noticeId}">
                                    <div class="time">
                                    <p class="day">${day}</p>
                                    <p class="year">${year}</p>
                                    </div>
                                    <h5>${data[i].noticeTitle}</h5>
                                </a>
                            </li>
                        `
                        $(".news-right").append(html);
                    }
                    //新闻事件
                    this.mySwiperNav = new Swiper('#News .swiper-container', {
                        pagination:  {el: '.swiper-pagination',clickable :true},
                        loop: true,
                        autoplayDisableOnInteraction : false,
                    })
                }
            },
            error: function (result) {

            }
        })
        
        $(".close").on('click',function(){
            $(".zizhi-wrap").hide();
            $(".zizhi").css('transform','translateY(0px)');
        })

        $(".zizhi-wrap .bnt").on('click',function(){
            $(".zizhi-wrap").hide();
            $(".zizhi").css('transform','translateY(0px)');
        })

        $('.showZizhi').on('click',function(){
            $(".zizhi-wrap").show();
            $(".zizhi").show().css('transform','translateY(150px)');
        })

        var top = document.documentElement.scrollTop || document.body.scrollTop;
        if(top>0){
            $('.nav-Wrap').css('background','#22ADF7')
        }else{
            $('.nav-Wrap').css('background','transparent')
        }
        $('.brand-wrap').removeClass('scroll-hidden').addClass('scroll-visible');


    var ua = navigator.userAgent;
    var ipad = ua.match(/(iPad).*OS\s([\d_]+)/);
    var isIphone =!ipad && ua.match(/(iPhone\sOS)\s([\d_]+)/);
    var isAndroid = ua.match(/(Android)\s+([\d.]+)/);
    var isMobile = isIphone || isAndroid || ipad;
    if(!isMobile){
    $(window).on('scroll', function (e) {
            let top = document.documentElement.scrollTop || document.body.scrollTop;
            if(top>0){
                $('.nav-Wrap').css('background','#22ADF7')
            }else{
                $('.nav-Wrap').css('background','transparent')
            }
            let distance = top - 1140
            $('.bg-circle .cricle01').css('transform',`translate(${distance/2}px,${distance}px)`)
            $('.bg-circle .cricle02').css('transform',`translate(${-distance/2}px,${distance}px)`)
            $('.bg-circle .cricle03').css('transform',`translate(${distance/2}px,${-distance}px)`)
            $('.bg-circle .cricle04').css('transform',`translate(${-distance/2}px,${-distance}px)`)
            $('.bg-circle .cricle05').css('transform',`translate(${distance/2}px,${distance}px)`)
            $('.bg-circle .cricle06').css('transform',`translate(${-distance/2}px,${distance}px)`)
            $('.bg-circle .cricle07').css('transform',`translate(${distance/2}px,${-distance}px)`)
            $('.bg-circle .cricle08').css('transform',`translate(${-distance/2}px,${-distance}px)`)
            //隐藏
            if(top<295){
                $('#Product h2').addClass('scroll-hidden').removeClass('scroll-visible');
            }
            if(top<250){
                $('#Product .dec').addClass('scroll-hidden').removeClass('scroll-visible');
            }
            if(top<425){
                $('.product-wrap ul li').eq(0).removeClass('scroll-visible').addClass('scroll-hidden');
            }
            if(top<860){
                $('.product-wrap ul li').eq(1).removeClass('scroll-visible').addClass('scroll-hidden');
            }
            if(top<1280){
                $('.product-wrap ul li').eq(2).removeClass('scroll-visible').addClass('scroll-hidden');
            }
            if(top<1720){
                $('.product-wrap ul li').eq(3).removeClass('scroll-visible').addClass('scroll-hidden');
            }
            if(top<2460){
                $('#Profile h2').removeClass('scroll-visible').addClass('scroll-hidden');
            }
            if(top<2520){
                $('#Profile .dec').removeClass('scroll-visible').addClass('scroll-hidden');
            }
            if(top<2600){
                $('#Profile ul').removeClass('scroll-visible').addClass('scroll-hidden');
            }
            if(top<3040){
                $('#News h2').removeClass('scroll-visible').addClass('scroll-hidden');
            }
            if(top<3090){
                $('#News .dec').removeClass('scroll-visible').addClass('scroll-hidden');
            }
            if(top<3170){
                $('#News .news-info').removeClass('scroll-visible').addClass('scroll-hidden');
            }
            if(top<3680){
                $('#Culture h2').removeClass('scroll-visible').addClass('scroll-hidden');
            }
            if(top<3750){
                $('#Culture .dec').removeClass('scroll-visible').addClass('scroll-hidden');
            }
            if(top<3830){
                $('#Culture ul').removeClass('scroll-visible').addClass('scroll-hidden');
            }
            if(top<4125){
                $('#Consultation p').removeClass('scroll-visible').addClass('scroll-hidden');
            }
            if(top<4170){
                $('#Consultation span').removeClass('scroll-visible').addClass('scroll-hidden');
            }
        
            //出现
            if(top>324){
                $('#Product h2').removeClass('scroll-hidden').addClass('scroll-visible');
            }
            if(top>370){
                $('#Product .dec').removeClass('scroll-hidden').addClass('scroll-visible');
            }
            if(top>505){
                $('.product-wrap ul li').eq(0).removeClass('scroll-hidden').addClass('scroll-visible');
            }
            if(top>940){
                $('.product-wrap ul li').eq(1).removeClass('scroll-hidden').addClass('scroll-visible');
            }
            if(top>1360){
                $('.product-wrap ul li').eq(2).removeClass('scroll-hidden').addClass('scroll-visible');
            }
            if(top>1800){
                $('.product-wrap ul li').eq(3).removeClass('scroll-hidden').addClass('scroll-visible');
            }
            if(top>2500){
                $('#Profile h2').removeClass('scroll-hidden').addClass('scroll-visible');
            }
            if(top>2547){
                $('#Profile .dec').removeClass('scroll-hidden').addClass('scroll-visible');
            }
            if(top>2680){
                $('#Profile ul').removeClass('scroll-hidden').addClass('scroll-visible');
            }
            if(top>3076){
                $('#News h2').removeClass('scroll-hidden').addClass('scroll-visible');
            }
            if(top>3120){
                $('#News .dec').removeClass('scroll-hidden').addClass('scroll-visible');
            }
            if(top>3273){
                $('#News .news-info').removeClass('scroll-hidden').addClass('scroll-visible');
            }
            if(top>3730){
                $('#Culture h2').removeClass('scroll-hidden').addClass('scroll-visible');
            }
            if(top>3770){
                $('#Culture .dec').removeClass('scroll-hidden').addClass('scroll-visible');
            }
            if(top>3910){
                $('#Culture ul').removeClass('scroll-hidden').addClass('scroll-visible');
            }
            if(top>4175){
                $('#Consultation p').removeClass('scroll-hidden').addClass('scroll-visible');
            }
            if(top>4220){
                $('#Consultation span').removeClass('scroll-hidden').addClass('scroll-visible');
            }
        })
    }

    }    
})
