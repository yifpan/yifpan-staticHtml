require('../css/articel.less');
require('../css/common.less');
import $ from 'jquery';
import Footer from '../footer/footer'
$(function () {
    const App=function(){
        var dom=document.getElementById('footerHtml');
        let footer=new Footer();
        dom.innerHTML=footer.tpl;
    }
    new App();

  new articel();
  function articel() {
      // 生产地址
      this.apiUrl = "https://api.cocogc.cn/"
      this.noticeId = window.location.search.split("?")[1].split('=')[1];
      this.newsInfo = function (noticeId) {
          $.ajax({
              type: "GET",
              url: this.apiUrl + "news/newsInfo/" + noticeId,
              contentType: 'application/json',
              dataType: "json",
              beforeSend: function () {
                  // $(".load").show();
                  $(".art-contentWrap").hide()
              },
              success: function (result) {
                  var data = result.data;
                  if (data.prevId != null) {
                      var htmlP = `<a href="articel.html?noticeId=${data.prevId}">上一篇：<span class="art-pageP">${data.prevTitle}</span></a>`
                      $('.page-clickP').append(htmlP)
                  }
                  if (data.nextId != null) {
                      var htmlN = `<a href="articel.html?noticeId=${data.nextId}">下一篇：<span class="art-pageP">${data.nextTitle}</span></a>`
                      $('.page-clickN').append(htmlN)
                  }
                  if (data != null) {
                      // $(".load").hide();
                      $('title').text(data.noticeTitle);
                      $('.art-Title').text(data.noticeTitle);
                      $('.art-upTime').text(data.createTime);
                      $('.art-content').html(data.noticeContent);
                      $(".art-contentWrap").show();
                  }
              },
              error: function (result) {
              }
          });
      }
      this.newsInfo(this.noticeId);
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
  }
})