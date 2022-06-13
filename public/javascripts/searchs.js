//最近搜索数据
var hiswords = JSON.parse(localStorage.getItem('kwords'));
$('.search-component>.search-main:first').html(template('tpl-his-keyWords',{hiswords:hiswords}));
//删除搜索记录
$('.bin').click(function(){
    $('#confirm').css('display', 'block');
    $('.yes').click(function () {
        $('#confirm').css('display', 'none');
        localStorage.removeItem('kwords');
        $('.search-component>.search-main:first').html("");
    })
    $('.no').click(function () {
        $('#confirm').css('display', 'none');
    })
});
//热门搜索数据
axios.get('http://vueshop.glbuys.com/api/home/public/hotwords?token=1ec949a15fb709370f').then((res)=>{
    $('.search-component>.search-main:last').html(template('tpl-hot-keyWords',res.data));
    clikwords();
});

//点击历史搜索和热门搜索
function clikwords(){
    $('.keywords').click(function () {
        var kwords = $(this).text();
        historyWords(kwords);
        window.location.href = "http://127.0.0.1:3000/search.html?keywords=" + kwords;
    });
}
clikwords()
function historyWords(val) {
    if (localStorage.getItem('kwords') == null) {
        var keywords = [];
        keywords.unshift(val);
        localStorage.setItem('kwords', JSON.stringify(keywords));
    } else {
        var arr = [];
        //去重移位
        var keywords = arr.concat(JSON.parse(localStorage.getItem('kwords')));
        for (var x = 0; x < keywords.length; x++) { if (keywords[x] == val) { keywords.splice(x, 1); } }
        keywords.unshift(val); localStorage.setItem('kwords', JSON.stringify(keywords));
    }
}
//关闭
$('.close').click(function(){
    $('.search-component').css("display","none");
});