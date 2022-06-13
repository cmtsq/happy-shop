//轮播图
axios.get("/carousel").then((res)=>{
    // console.log(res.data);
    $(".swiper-wrapper").html(template('tpl-swiperList',res.data));
});
//导航栏
axios({
    url:"http://vueshop.glbuys.com/api/home/index/nav?token=1ec949a15fb709370f",
    method:"GET"
}).then((res)=>{
    $(".quick-nav").html(template('tpl-nav',res.data));
    $('.item').on('click',function(){
        var cid = $(this).attr('id');
        axios.post('/goodsType').then((res)=>{
            window.location.href="goods.html?cid="+cid;
        });
    });
});
//潮流女装
axios({
    url:"http://vueshop.glbuys.com/api/home/index/goodsLevel?token=1ec949a15fb709370f",
    method:"GET",
}).then((res)=>{
    $(".tabs").html(template('tpl-tide',res.data));
    var items = [];
    var gid = [];
    $.each(res.data.data,function(i,val){
        items.push(res.data.data[i].items)
        $.each(items[i],function(j,k){
            gid.push(parseInt(items[i][j].gid));
        });
    });
    for(let n=0;n<gid.length;n++){
        $(`#${gid[n]}`).on('click',function(){
            window.location.href="http://127.0.0.1:3000/details.html?gid="+gid[n];
        });
    }
});
//为您推荐
axios({
    url:"http://vueshop.glbuys.com/api/home/index/recom?token=1ec949a15fb709370f",
    method:"GET"
}).then((res)=>{
    $(".goodsrecom").html(template('tpl-goods',res.data));
    var items = [];
    $.each(res.data.data,function(i,val){
        items.push(res.data.data[i].gid)
    });
    for(let n=0;n<items.length;n++){
        $(`#${items[n]}`).on('click',function(){
            window.location.href="http://127.0.0.1:3000/details.html?gid="+items[n];
        });
    }
});
//跳转到商品分类页面
$(".icon").click(function(){
    window.location.href="http://127.0.0.1:3000/goods.html";
});

//判断是否登录
var user = JSON.parse(localStorage.getItem('user'));
if(user){
    $('#nav>div:last').html("").removeClass('login').addClass('my-icon');
    $('#nav>div:last').click(function(){
        location.href="my.html";
        $('.bottom-nav').eq(2).addClass('active').siblings().removeClass('active');
    });
}else{
    $('.login').click(function(){
        location.href="login.html";
    });
}
//小红点
if(localStorage.getItem('cartData')!=null){
    $('.spot').css('display','block');
}else{
    $('.spot').css('display','none');
}

//进入搜索页面
$('.nav-search').click(function (){
    $('.search').val("");
    $('.search-component').css("display","block");
    $('.search-btn').click(function(){
        var kwords = $('.search').val();
        historyWords(kwords);
        window.location.href = "http://127.0.0.1:3000/search.html?keywords="+$('.search').val();
    });
});