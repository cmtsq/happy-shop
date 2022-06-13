//渲染商品分类和商品信息
axios.get('http://vueshop.glbuys.com/api/home/category/menu?token=1ec949a15fb709370f').then((res) => {
    $(".box").html(template('tpl-type', res.data));
    var cid = [];
    $.each(res.data.data, function (i, val) {
        cid.push(res.data.data[i].cid);
    });
    if (str) {
        $(`#${str[1]}`).addClass('active');
        axios.get('http://vueshop.glbuys.com/api/home/category/show?cid=' + str[1] + '&token=1ec949a15fb709370f').then((res) => {
            $(".bigbox").html(template('tpl-type-goods', res.data));
            goodsDetail();
        });
    } else {
        //进来默认选中第一项
        $('.classify-item:first').addClass('active');
        axios.get('http://vueshop.glbuys.com/api/home/category/show?&token=1ec949a15fb709370f').then((res) => {
            $(".bigbox").html(template('tpl-type-goods', res.data));
            goodsDetail()
        });
    }

    //点击切换
    for (let i = 0; i < cid.length; i++) {
        $(`#${cid[i]}`).on('click', function () {
            $(this).addClass('active');
            $(this).siblings().removeClass('active');
            history.pushState('', '', 'http://127.0.0.1:3000/goods.html?cid=' + cid[i]);
            axios.get('http://vueshop.glbuys.com/api/home/category/show?cid=' + cid[i] + '&token=1ec949a15fb709370f').then((res) => {
                if (res.data.data == "没有数据") {
                    $('.no-data').show();
                    $('.bigbox').hide();
                } else {
                    $('.no-data').hide();
                    $('.bigbox').show();
                    $(".bigbox").html(template('tpl-type-goods', res.data));
                    goodsDetail()
                }
            });
        });
    }
});

//跳转到商品详情
function goodsDetail(){
    $('.goods-items-wrap>ul').click(function(){
        var gid = $(this).attr('id');
        window.location.href="http://127.0.0.1:3000/details.html?gid="+gid;
    });
}
//点击返回
$('.back').click(function(){
    window.location.href="http://127.0.0.1:3000/index.html";
});

//进入搜索页面
$('.search').click(function (){
    $('.search-input-wrap>.search').val("");
    $('.search-component').css("display","block");
    $('.search-btn').click(function(){
        console.log($('.search-input-wrap>.search').val());
        var kwords = $('.search-input-wrap>.search').val();
        historyWords(kwords);
        window.location.href = "http://127.0.0.1:3000/search.html?keywords="+kwords;
    });
});

//上下滑动样式
function initBScroll(code) {
    var tag = document.querySelector(code);
    var bs = BetterScroll.createBScroll(tag, {
    pullDownRefresh: {
        threshold: 30,
    },
    pullUpLoad: {
        threshold: -30,
    },
    click: true
    });
    bs.on('pullingDown', () => {
        bs.finishPullDown();
        bs.refresh();
    });
    bs.on('pullingUp', () => {
        bs.finishPullDown();
        bs.refresh();
    });
}
initBScroll('.classify-wrap');
initBScroll('.goods-content');