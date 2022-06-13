//获取本地储存的用户数据
var user = JSON.parse(localStorage.getItem('user'));
//获取会员信息
if(user != null){
    axios({
        method: "get",
        url: "http://vueshop.glbuys.com//api/user/myinfo/userinfo/uid/" + user.uid + "?token=1ec949a15fb709370f"
    }).then((res) => {
        localStorage.setItem('user',JSON.stringify(res.data.data));
        user = JSON.parse(localStorage.getItem('user'));
    });
    //渲染昵称头像
    $('.nickname').html(user.nickname);
    $('.header>img').attr('src',user.head);
    $('.btn').html('安全退出');
}
//订单跳转
$('.show-all').click(function(){
    if(user==null){
        location.href="login.html";
    }else{
        location.href="orderlist.html";
    }
});
$('.item').click(function(){
    if(user==null){
        location.href="login.html";
    }else{
        var index = $(this).index();
        location.href="orderlist.html?status="+index;
    }
});
//个人资料
$('.meau-list>ul:eq(0)').click(function(){
    if(user==null){
        location.href="login.html";
    }else{
        location.href="profile.html"
    }
});
//收货地址
$('.meau-list>ul:eq(1)').click(function(){
    if(user==null){
        location.href="login.html";
    }else{
        location.href="addressManage.html"
    }
});
//绑定手机
$('.meau-list>ul:eq(2)').click(function(){
    // islogin();
    if(user==null){
        location.href="login.html";
    }else{
        location.href="cellphone.html"
    }
});
//修改密码
$('.meau-list>ul:eq(3)').click(function(){
    // islogin();
    if(user==null){
        location.href="login.html";
    }else{
        location.href="password.html"
    }
});
//我的收藏
$('.meau-list>ul:eq(4)').click(function(){
    // islogin();
    if(user==null){
        location.href="login.html";
    }else{
        location.href="collection.html"
    }
});
//安全退出
$('.btn').click(function(){
    if(user==null){
        location.href="login.html";
    }else{
        $('#confirm').css('display', 'block');
        $('.yes').click(function () {
            $('#confirm').css('display', 'none');
            axios({
                method: "post",
                url: "http://vueshop.glbuys.com/api/home/user/safeout?token=1ec949a15fb709370f",
                data: "uid=" + user.uid
            }).then((res) => {
                if (res.data.code == 200) {
                    //console.log(res.data.data)//"已安全退出"
                    //安全退出后清空本地所有储存
                    localStorage.clear();
                    location.href = "my.html";
                }
            });
        });
        $('.no').click(function () {
            $('#confirm').css('display', 'none');
        });
    }
});
//小红点
if(localStorage.getItem('cartData') != null) {
    $('.spot').css('display', 'block');
}else{
    $('.spot').css('display', 'none');
}