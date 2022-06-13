//得到商品详情数据
axios.get('http://vueshop.glbuys.com/api/home/goods/info?gid='+str[1]+'&type=details&token=1ec949a15fb709370f').then((res)=>{
    $.each(res.data.data.images,function(i,val){
        $('.page>.swiper-container>.swiper-wrapper').append(`
            <div class='swiper-slide'>
                <img src="${res.data.data.images[i]}">
            </div>
        `);
    });
    $('.goods-ele-main').html(template('tpl-goods-detail',res.data));
    $('.content').html(res.data.data.bodys);
});

//得到评论信息
axios.get('http://vueshop.glbuys.com/api/home/reviews/index?gid='+str[1]+'&token=1ec949a15fb709370f&page=1').then((res) => {
    $('.reviews-main').html(template('tpl-goods-reviews', res.data));
    //查看更多评价
    $('.reviews-more').click(function(){
        $('.tab-wrap>div').eq(2).addClass('active');
        $('.tab-wrap>div').eq(2).siblings().removeClass('active');
        $('.sub-page>div').eq(2).show();
        $('.sub-page>div').eq(2).siblings().hide();
    });
    if(res.data.code==200){
        var pagenum = parseInt(res.data.pageinfo.pagenum);
        $('.reviews-data').html(`<div class="reviews-main">
        <div class="reviews-title">商品评价(${res.data.pageinfo.total})</div>
        <div class="reviews-wrap">
        </div>
    </div>`);
        for (var i = 0; i < pagenum; i++) {
            axios.get('http://vueshop.glbuys.com/api/home/reviews/index?gid=' + str[1] + '&token=1ec949a15fb709370f&page=' + (i + 1)).then((res) => {
                for (var j = 0; j < res.data.data.length; j++) {
                    $(".reviews-data>.reviews-main>.reviews-wrap").append(`
                <div class="reviews-list">
                    <div class="uinfo">
                        <div class="head">
                            <img alt="" src="${res.data.data[j].head}">
                        </div>
                        <div class="nickname">${res.data.data[j].nickname}</div>
                    </div>
                    <div class="reviews-content">${res.data.data[j].content}</div>
                    <div class="reviews-date">${res.data.data[j].times}</div>
                </div>
                `);
                }
            });
        }
    }
});
//得到购买商品规格信息
axios.get('http://vueshop.glbuys.com/api/home/goods/info?gid=' + str[1] + '&type=details&token=1ec949a15fb709370f').then((res) => {
    $('.goods-info').html(template('tpl-goods-info', res.data));
    $(".close").click(function (event) {
        $('.cart-panel').attr('class', 'cart-panel down');
        $('.mask').hide();
        event.stopPropagation();
    });
    $('.cart-panel').click(function (event) {
        $('.cart-panel').attr('class', 'cart-panel up');
        event.stopPropagation();
    });
    document.addEventListener('click', function () {
        $('.cart-panel').attr('class', 'cart-panel down');
        $('.mask').hide();
    });
});

//规格信息
axios.get('http://vueshop.glbuys.com/api/home/goods/info?gid=' + str[1] + '&type=spec&token=1ec949a15fb709370f').then((res) => {
    $('.attr-wrap').html(template('tpl-goods-spec', res.data));
    //选择要加入购物车的规格
    // console.log(res.data)
    $('.attr-list>.val-wrap>.val').click(function () {
        $(this).addClass('active');
        $(this).siblings().removeClass('active');
    });
});
$(".cart").click(function(event){
    $('.attr-list>.val-wrap>.val').removeClass('active');
    $('.cart-panel').attr('class','cart-panel up');
    $('.mask').show();
    event.stopPropagation();
});
//选择加购数量
numFun();
function numFun(){
    //减
    $('.dec').click(function(){
        $(".dec").addClass('active');
        var num = parseInt($(".amount-input").val());
        if(num<=1){
            $(".dec").addClass('active');
            num=1;
        }else{
            if(num==2){
                $(".dec").addClass('active');
            }else{
                $(".dec").removeClass('active');
            }
            num--;
        }
        $(".amount-input").val(num);
    });
    //加
    $('.inc').click(function(){
        $(".dec").removeClass('active');
        var num = parseInt($(this).prev('input').val());
        num++;
        $(".amount-input").val(num);
    });
}
//选项切换
$('.tab-wrap>div').click(function(){
    var index = $(this).index();
    $(this).addClass('active');
    $(this).siblings().removeClass('active');
    if(index==0){
        $('.sub-page>div').eq(0).show();
        $('.sub-page>div').eq(0).siblings().hide();
    }else if(index==1){
        $('.sub-page>div').eq(1).show();
        $('.sub-page>div').eq(1).siblings().hide();
    }else{
        $('.sub-page>div').eq(2).show();
        $('.sub-page>div').eq(2).siblings().hide();
    }
});

//弹出提示框
function toast() {
    $('.bottom-toast').fadeIn();
    setTimeout(() => {
        $('.bottom-toast').fadeOut(1500);
    }, 1000);
}

//加入购物车
function addCart(){
    $('.sure-btn').click(function(){
        var count = parseInt($('.amount-input').val());//获取数量
        var title = $('.goods-wrap>.goods-title').html();//获取商品名
        var freight = parseInt($('.freight').html());//获取运费
        var gid = $('.goods-wrap>.goods-code').html();//获取gid
        var price = parseInt($('.goods-wrap>.price').html());//获取价格
        var img = $('.goods-img>img').attr('src');//获取图片
        var attrs = [];
        var cartGoods = [];
        var t = 0;
        for(var i=0;i<$('.attr-list').length;i++){
            attrs.push({
                attrid:$('.attr-list').eq(i).children('.attr-name').attr('id'),
                title:$('.attr-list').eq(i).children('.attr-name').html(),
                param:[]
            });
            for(var j=0;j<$('.attr-list').eq(i).children('.val-wrap').children('.val').length;j++){
                if($('.attr-list').eq(i).children('.val-wrap').children('.val').eq(j).hasClass('active')){
                    attrs[i].param.push({
                        paramid:$('.attr-list').eq(i).children('.val-wrap').children('.val').eq(j).attr('id'),
                        title:$('.attr-list').eq(i).children('.val-wrap').children('.val').eq(j).html()
                    });
                }
            }
            if(attrs[i].param.length==0){
                $('.toast').html("请选择"+$('.attr-list').eq(i).children('.attr-name').html());
                toast();
                t++;//为判断param是否有值
            }
        }
        cartGoods.push({
            gid:gid,
            title:title,
            img:img,
            price:price,
            amount:count,
            freight:freight,
            checked:true,
            attrs:attrs
        });
        // console.log(cartGoods)
        if(t==0){
            // console.log(t)
            if (localStorage.getItem('cartData') == null) {
                localStorage.setItem('cartData', JSON.stringify(cartGoods));
                $('.spot').css('display', 'block');
            } else {
                //判断购物车是否存在相同商品
                var carts = JSON.parse(localStorage.getItem('cartData'));
                // console.log(carts);
                for (var m = 0; m < carts.length; m++) {
                    var val = 0;
                    // console.log(attrs)
                    if (gid == carts[m].gid) {
                        for (var n = 0; n < carts[m].attrs.length; n++) {
                            if (attrs[n].param[0].title == carts[m].attrs[n].param[0].title) {
                                val++;
                            }
                        }
                    }
                    if (val == carts[m].attrs.length) {
                        carts[m].amount += count;
                        localStorage.setItem('cartData', JSON.stringify(carts));
                    } else {
                        if (m == 0) {
                            var arr = JSON.parse(localStorage.getItem('cartData')).concat(cartGoods);
                            localStorage.setItem('cartData', JSON.stringify(arr));
                        }
                    }
                }
            }
        }
    });
}addCart()
//加入收藏
$('.fav').click(function(){
    if(localStorage.getItem('user')==null){
        $('.toast').html("请先登录会员");
        toast();
    }else{
        var user = JSON.parse(localStorage.getItem('user'));
        axios({
            method: "get",
            url: "http://vueshop.glbuys.com/api/goods/fav?uid="+user.uid+"&gid="+$('.goods-wrap>.goods-code').html()+"&token=1ec949a15fb709370f",
        }).then((res)=>{
            $('.toast').html(res.data.data);
            toast();
        });
    }
});
//小红点
if(localStorage.getItem('cartData')!=null){
    $('.spot').css('display','block');
}else{
    $('.spot').css('display','none');
}
$('.cart-icon').click(function(){
    location.href="cart.html";
});
