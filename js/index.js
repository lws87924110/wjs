$(function () {
    // 动态生成轮播图结构
    getBanner();
    var ismobile;
    function getBanner() {
        $.ajax({
            type: "get",
            url: "./js/imgsrc.json",
            dataType: "json",
            success: function (res) {
                // console.log(res);
                var swidth = $(window).width();
                // console.log(swidth);
                if (swidth < 768) {
                    ismobile = true;
                } else {
                    ismobile = false;
                }
                var html = template('imgTemp', {
                    imgs: res,
                    width: swidth
                })
                var ballhtml = template('ballTemp', { imgs: res })
                $('.carousel-inner').html(html)
                $('.wjs_banner .carousel-indicators').html(ballhtml);
            }
        });
    }
    // 工作中并不需要这个需求
    $(window).on('resize', function () {
        var changeWidth = $(window).width();
        // console.log(width);
        // 现在的宽度大于768且之前是true
        if (changeWidth > 768 && ismobile || changeWidth < 768 && !ismobile) {
            getBanner();
        }
    })
    // bootstrap的轮播图初始化，设置间隔时长
    $('.carousel').carousel({
        interval: 2000
    })
    // 滑动事件
    var startX, distanceX;
    var banner_ul = $('.carousel-inner')[0];
    // console.log(banner_ul);
    banner_ul.addEventListener('touchstart', function (event) {
        startX = event.targetTouches[0].clientX;
        // console.log(startX);
    })
    banner_ul.addEventListener('touchend', function () {
        endX = event.changedTouches[0].clientX;
        distanceX = endX - startX;
        // console.log(distanceX);
        if (Math.abs(distanceX) > 50) {
            if (distanceX > 0) {
                $('.carousel').carousel('prev');
            } else if (distanceX < 0) {
                $('.carousel').carousel('next');
            }
        }
    })

    // 产品栏滑动
    proscroll();
    function proscroll() {
        var pro_ul = $('.wjs_product .nav-tabs');
        var pro_lis = pro_ul.find('li');
        console.log(pro_lis);
        var lisWidth = 0;
        pro_lis.each(function (index, value) {
            // console.log(index + ':' + value);
            lisWidth += $(value).innerWidth();
        })
        // console.log(lisWidth);
        pro_ul.width(lisWidth);
        // iscroll.js插件初始化脚本
        var myScroll = new IScroll('.pro_box', {
            scrollX: true
        });
    }
    // 初始化上弹工具
    $(function () {
        $('[data-toggle="tooltip"]').tooltip()
    })
})