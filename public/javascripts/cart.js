//返回上一页
$('.back').click(function () {
    history.back(-1);
});
//小红点
if (localStorage.getItem('cartData') != null && localStorage.getItem('cartData') != '[]') {
    $('.spot').css('display', 'block');
} else {
    $('.spot').css('display', 'none');
}
//展示购物车商品
var cartGoods = JSON.parse(localStorage.getItem('cartData'));

$('.main-shopping').html(template('tpl-cart-goods', {
    data: cartGoods
}));
//全选或全不选
if(cartGoods!=null){
    $('.selectbtn').addClass('active');
    $('.select-wrap').click(function () {
        if ($(this).children('.selectbtn').hasClass('active')) {
            for (var j = 0; j < cartGoods.length; j++) {
                $(this).children('.selectbtn').removeClass('active');
                $('.cart-list').eq(j).children('.select-btn').removeClass('active');
                cartGoods[j].checked = false;
            }
        } else {
            for (var j = 0; j < cartGoods.length; j++) {
                $(this).children('.selectbtn').addClass('active');
                $('.cart-list').eq(j).children('.select-btn').addClass('active');
                cartGoods[j].checked = true;
            }
        }
        localStorage.cartData = JSON.stringify(cartGoods);
        settleBtn();
        total();
    });
}
//勾选商品
$('.select-btn').click(function(){
    var index = $(this).parent().index();
    if($(this).hasClass('active')){
        $(this).removeClass('active');
        cartGoods[index].checked = false;
    }else{
        $(this).addClass('active');
        cartGoods[index].checked = true;
    }
    //商品全被选中全选框被选中，否则不选中
    if($('.cart-list').length == $('.cart-list .select-btn.active').length){
        $('.selectbtn').addClass('active');
    }else{
        $('.selectbtn').removeClass('active');
    }
    localStorage.cartData = JSON.stringify(cartGoods);
    settleBtn();
    total();
});
//结算按钮
function settleBtn(){
    if($('.select-btn').hasClass('active')){
        $('.settle').css("background","red");
    }else{
        $('.settle').css("background","#BFBFBF")
    }
    $('.settle').click(function(){
        if ($('.cart-list .select-btn').hasClass('active') == true) {
            if(localStorage.getItem('user')!=null){
                location.href = 'order.html';
            }else{
                location.href = 'login.html';
            }
        }
    });
}settleBtn()
//计算邮费和总价
function total(){
    var freight = 0;
    var sum = 0;
    if(cartGoods != null){
        for (var i = 0; i < cartGoods.length; i++) {
            if (cartGoods[i].checked == true) {
                freight += cartGoods[i].freight;
                sum += cartGoods[i].price * cartGoods[i].amount;
            }
        }
        $('.freight').html("￥" + freight.toFixed(2));
        $('.sum').html("￥" + sum.toFixed(2));
    }
}total()
//加商品件数
$('.inc').click(function(){
    var index = $(this).parents('.cart-list').index();
    $(this).prev().prev().removeClass('active');
    var num = parseInt($(this).prev().children('input').val());
    num++;
    $(this).prev().children('input').val(num);
    cartGoods[index].amount+=1;
    localStorage.cartData = JSON.stringify(cartGoods);
    total();
});
//减商品件数
$('.dec').click(function(){
    var index = $(this).parents('.cart-list').index();
    $(this).addClass('active');
    var num = parseInt($(this).next().children('input').val());
    if (num <= 1) {
        $(this).addClass('active');
        num = 1;
        cartGoods[index].amount=1;
        localStorage.cartData = JSON.stringify(cartGoods);
    } else {
        if (num == 2) {
            $(this).addClass('active');
        } else {
            $(this).removeClass('active');
        }
        num--;
        cartGoods[index].amount-=1;
        localStorage.cartData = JSON.stringify(cartGoods);
    }
    $(this).next().children('input').val(num);
    total();
});
for(var n=0;n<$('.amount-input').length;n++){
    if($(`.amount-input:eq(${n})`).children('input').val()==1){
        $(`.amount-input:eq(${n})`).prev().addClass('active');
    }else{
        $(`.amount-input:eq(${n})`).prev().removeClass('active');
    }
}

//删除购物车商品
$('.del').click(function(){
    var index = $(this).parent().parent().index();
    $('#confirm').css('display', 'block');
    $('.yes').unbind('click').click(function () {
        $('.cart-list').eq(index).remove();
        cartGoods.splice(index,1);
        localStorage.cartData = JSON.stringify(cartGoods);
        fun();
        $('#confirm').css('display', 'none');
        $('.spot').css('display', 'none');
    });
    $('.no').click(function () {
        $('#confirm').css('display', 'none');
    });
});

//删除商品时本地存储没有商品key名是否为[]判断
function fun(){
    if(localStorage.getItem("cartData") == '[]'){
        localStorage.removeItem("cartData");
        $('.selectbtn').removeClass('active');
    }
    settleBtn();
    total();
}fun()