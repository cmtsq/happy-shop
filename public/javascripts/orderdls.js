//返回上一页
$('.back').click(function(){
    history.back(-1);
});
//获取用户数据
var user = JSON.parse(localStorage.getItem('user'));
//订单详情信息
axios.get('http://vueshop.glbuys.com/api/user/myorder/desc?uid='+user.uid+'&ordernum='+parseInt(str)+'&token=1ec949a15fb709370f').then((res)=>{
    console.log(res.data);
    $('.main').html(template('tpl-order-detail',res.data));
    //点击进入详情
    $('.goods-list').click(function(){
        location.href="details.html?gid="+$(this).attr('id');
    });
});