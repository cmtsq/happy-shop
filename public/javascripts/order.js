//返回上一页
$('.back').click(function () {
    history.back(-1);
});
//本地用户数据
var user = JSON.parse(localStorage.getItem('user'));
//收货地址
if(localStorage.getItem('aid')!=null){
    axios.get('http://vueshop.glbuys.com/api/user/address/info?uid='+user.uid+'&aid='+localStorage.getItem('aid')+'&token=1ec949a15fb709370f').then((res)=>{
        if (res.data.code == 200) {
            $('.address-wrap').prepend(`
            <div class="persion-info" style="">
                <span>收货人：${res.data.data.name}</span>
                <span>${res.data.data.cellphone}</span>
            </div>
            <div class="address" id="${res.data.data.aid}">
                <img src="images/home/cart/map.png" alt="收货地址">
                <span>${res.data.data.province + res.data.data.city + res.data.data.area + res.data.data.address}</span>
            </div>
            `);
        }else{
            $('.address-wrap').prepend('<div class="address-null">您的收货地址为空,点击添加收货地址</div>');
        }
        //更换收货地址
        $('.address-wrap').click(function () {
            location.href = "address.html";
        });
    });
}else{
    //默认收货地址
    axios.get('http://vueshop.glbuys.com/api/user/address/defaultAddress?uid=' + user.uid + '&token=1ec949a15fb709370f').then((res) => {
        if (res.data.code == 200) {
            $('.address-wrap').prepend(`
            <div class="persion-info" style="">
                <span>收货人：${res.data.data.name}</span>
                <span>${res.data.data.cellphone}</span>
            </div>
            <div class="address" id="${res.data.data.aid}">
                <img src="images/home/cart/map.png" alt="收货地址">
                <span>${res.data.data.province + res.data.data.city + res.data.data.area + res.data.data.address}</span>
            </div>
        `);
        } else {
            $('.address-wrap').prepend('<div class="address-null">您的收货地址为空,点击添加收货地址</div>');
        }
        //更换收货地址
        $('.address-wrap').click(function () {
            location.href = "address.html";
        });
    });
}
//要结算的商品
var settleGoods = JSON.parse(localStorage.getItem('cartData'));
$('.goods-wrap').html(template('tpl-settle-goods',{data:settleGoods}));
//总计
var sum=0;
var freight=0;
for(var i=0;i<settleGoods.length;i++){
    if(settleGoods[i].checked==true){
        sum+=settleGoods[i].price;
        freight+=settleGoods[i].freight;
    }
}
var total=parseInt(sum)+parseInt(freight);
$('.sum').html("￥"+sum.toFixed(2));
$('.freight').html("￥"+freight.toFixed(2));
$('.total').html("￥"+total.toFixed(2));

//提交订单
$('.balance-btn').click(function(){
    var goodsData = [];
    for(var j=0;j<settleGoods.length;j++){
        if(settleGoods[j].checked==true){
            goodsData.push(settleGoods[j]);
        }
    }
    for(var n=settleGoods.length-1;n>=0;n--){
        if(settleGoods[n].checked==true){
            settleGoods.splice(n,1);
        }
    }
    localStorage.cartData = JSON.stringify(settleGoods);
    axios({
        method:"post",
        url:"http://vueshop.glbuys.com/api/order/add?token=1ec949a15fb709370f",
        data:"uid="+user.uid+"&freight="+freight+"&addsid="+$('.address').attr('id')+"&goodsData="+JSON.stringify(goodsData)
    }).then((res)=>{
        if(res.data.code==200){
            location.href="end.html";
        }
    });
});