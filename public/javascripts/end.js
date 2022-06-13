//返回上一页
$('.back').click(function(){
    location.replace("cart.html");
});
var user = JSON.parse(localStorage.getItem('user'));
axios.get('http://vueshop.glbuys.com/api/order/lastordernum?uid='+user.uid+'&token=1ec949a15fb709370f').then((res)=>{
    $('.ordernum').html('订单编号：'+res.data.data.ordernum);
});
$('.view').click(function(){
    location.href="orderlist.html";
});