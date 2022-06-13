//回退
$('.back').click(function () {
    window.history.go(-1);
});
//从搜索页进行搜索
$('.search-icon').click(function(){
    location.href="search.html?keywords="+$('.search-text').text();
});
var result={
    otype:'all',
    kwords:'',
    cid:'',
    param:'',
    price1:'',
    price2:''
};
var searchKey = JSON.parse(localStorage.getItem('kwords'))[0];
result.kwords = searchKey;
$('.search-text').text(searchKey);

//跳转到商品详情
function goodsDetail(){
    $('.goods-list').click(function(){
        var gid = $(this).attr('id');
        window.location.href="http://127.0.0.1:3000/details.html?gid="+gid;
    });
}

//渲染分类页面
var cid = []//保存cid的值
function kwords() {
    return axios({
        method: 'get',
        url: 'http://vueshop.glbuys.com/api/home/category/menu?token=1ec949a15fb709370f'
        }).then((res) => {
            if (res.data.code == 200) {
                $('.item-wrap')[0].innerHTML = res.data.data.map((v, i) => {
                cid.push(v.cid);
                return `
                <div class="item">${v.title}</div>
                `
                }).join('');
            }
            for (let i = 0; i < $('.item').length; i++) {
                $('.item')[i].onclick = function () {
                    if ($(this).hasClass('active')) {
                        $(this).removeClass('active');
                    }else {
                        $(this).addClass('active').siblings().removeClass('active')
                    }
                }
            }
        });
} kwords();

// 渲染分类属性
var pid = [];
var param = [];//保存pid值
function key(){
    axios.get('http://vueshop.glbuys.com/api/home/goods/param?kwords='+searchKey+'&token=1ec949a15fb709370f').then((res) => {
        if (res.data.code == 200) {
            $('.content').html(template('tpl-goods-tab',res.data));
            hideType();
            res.data.data.map((v,i)=>{
                v.param.map((v,i)=>{
                    pid.push(v.pid);
                });
            });
            for (let i = 0; i < $('.content').find('.item').length; i++) {
                // $('.content').find('.item')[i].index = i;
                $('.content').find('.item')[i].index = pid[i];
                // console.log(pid[i]);
                $('.content').find('.item')[i].onclick = function () {
                    if ($(this).hasClass('active')) {
                        $(this).removeClass('active');
                    } else {
                        $(this).addClass('active');
                    }
                }
            }
        }
    });
}
//打开分类页面
$('.screen-btn').click(function () {
    param=[]//重置商品热词
    $('.screen')[0].className = 'screen move'
    $('.mask').css('display', 'block');
    if(localStorage.getItem('kwords')){
        key();
    }

    //价格区间
    var pri = document.getElementsByClassName('item-wrap')[1];
    for (let i = 0; i < pri.children.length; i++) {
        pri.children[i].onclick = function () {
            if ($(this).hasClass('active')) {
                $(this).removeClass('active');
                $('.maxp')[0].value = ""
                $('.minp')[0].value = ""
            } else {
                $(this).addClass('active').siblings().removeClass('active')
                $('.minp')[0].value = (pri.children[i].innerHTML).split('-')[1];
                $('.maxp')[0].value = (pri.children[i].innerHTML).split('-')[0];
            }
        }
    }
    //全部重置
    $('.reset')[0].onclick = function () {
        for (let i = 0; i < $('.item').length; i++) {
            if ($('.item')[i].className == 'item active') {
                $('.item')[i].className = 'item'
                result = {
                    otype:'all',
                    kwords:searchKey,
                    cid:'',
                    param:'',
                    price1:'',
                    price2:''}
            }
        }
    }
    //确认搜索
    $('.sure')[0].onclick = function () {
        //关闭筛选页面展示结果
        $('.screen')[0].className = 'screen unmove'
        $('.mask').css('display', 'none');
        //获取cid
        for(let i=0;i<$('.item-wrap')[0].children.length;i++){
            if($('.item-wrap').eq(0).children().eq(i).hasClass('active')){
                var _index = i;
            }
        }
        //获取param
        for(let i=0;i<$('.content').find('.item').length;i++){
            $('.content').find('.item')[i].index = i;
            if($('.content').find('.item')[i].className=='item active'){
                param.push(pid[i]);
            }
        }
        //进行各项传值
        result.cid = cid[_index];
        result.param = JSON.stringify(param);
        result.price1 = $('.maxp').val();
        result.price2 = $('.minp').val();
        $('.goods-main').html("");
        // console.log(result);
        goodsResult(result);
    }
});
//关闭筛选
$('.mask').click(function () {
    if ($('.screen')[0].className == 'screen move') {
        $('.screen')[0].className = 'screen unmove';
        $('.mask').css('display', 'none');
    }
});
//隐藏分类
function hideType(){
    $('.attr-icon').click(function () {
        // console.log($(this).attr('class'))
        if ($(this).attr('class') == "attr-icon") {
            $(this).attr('class',"attr-icon up");
            $(this).parent().next('.item-wrap').css("display", "none");
        }else{
            $(this).attr('class',"attr-icon");
            $(this).parent().next('.item-wrap').css("display", "flex");
        }
    });
}hideType()

//综合条件
$('.order-item').click(function () {
    if($(this).hasClass('active')) {
        $(this).removeClass('active');
        $(this).find('.order-menu').css('display', 'none');
    } else {
        $(this).addClass('active').siblings().removeClass('active');
        $(this).find('.order-menu').css('display', 'block');
    }
    var arr = ['all', 'up', 'down'];
    for (let i = 0; i < $('.order-menu li').length; i++) {
        $('.order-menu li')[i].onclick = function () {
            if ($(this).className == "active") {
                $(this).removeClass('active');
            } else {
                $(this).addClass('active');
                $(this).siblings().removeClass('active');
            }
            $('.goods-main').html("");
            result.otype = arr[i];
            goodsResult(result);
        }
    }
});

//显示搜索的结果
goodsResult(result);
function goodsResult(result){
    axios({
        method:"get",
        url:'http://vueshop.glbuys.com/api/home/goods/search?page=1&token=1ec949a15fb709370f',
        params:result
    }).then((res) => {
        if (res.data.code == 200) {
            var pagenum = parseInt(res.data.pageinfo.pagenum);
            for (let i = 1; i <= pagenum; i++) {
                axios({
                    method:"get",
                    url:'http://vueshop.glbuys.com/api/home/goods/search?&page='+i+'&token=1ec949a15fb709370f',
                    params:result
                }).then((res) => {
                    if (res.data.code == 200) {
                        for (let j = 0; j < res.data.data.length; j++) {
                            $('.goods-main').append(` <div
                                class="goods-list" id="${res.data.data[j].gid}">
                                <div class="image"><img src="${res.data.data[j].image}"></div>
                                <div class="goods-content">
                                    <div class="goods-title">${res.data.data[j].title}</div>
                                    <div class="price">¥${res.data.data[j].price}</div>
                                    <div class="sales">销量<span>${res.data.data[j].sales}</span>件</div>
                                </div>
                                </div>
                            `);
                        }
                        goodsDetail();
                    }
                });
            }
            $('.handel-wrap>.item>span').html(res.data.pageinfo.total);
        }else{
            $('.goods-main').append('<div class="no-data" style="">没有相关商品！</div>');
        }
    });
}

//根据销量
$('.order-item:eq(1)').click(function () {
    $(this).addClass('active').siblings().removeClass('active');
    $('.order-menu').css('display', 'none');
    $('.goods-main')[0].innerHTML = "";
    result.otype = "sales";
    goodsResult(result);
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
initBScroll('.screen');

//进入搜索页面
$('.search-text').click(function (){
    $('.search-input-wrap>.search').val("");
    $('.search-component').css("display","block");
    $('.search-btn').click(function(){
        var kwords = $('.search-input-wrap>.search').val();
        historyWords(kwords);
        window.location.href = "http://127.0.0.1:3000/search.html?keywords="+kwords;
    });
});