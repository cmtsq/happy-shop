//快速注册
$('.fastreg>div:last').click(function(){
    location.href="reg.html";
});
//返回上一页
$('.back').click(function(){
    history.back(-1);
});
//弹出提示框
function toast(){
    $('.bottom-toast').fadeIn();
    setTimeout(() => {
        $('.bottom-toast').fadeOut(1500);
    }, 1000);
}
//开关
$('.van-switch').click(function(){
    if($('.van-switch').attr('class') == "van-switch") {
        $(this).addClass('van_switch');
        $(this).children('.switch_node').addClass("switch-node");
        $('.password').children('input').removeAttr('type', 'password').attr('type', 'text');
    }else{
        $(this).removeClass('van_switch');
        $(this).children('.switch_node').removeClass("switch-node");
        $('.password').children('input').removeAttr('type', 'text').attr('type', 'password');
    }
});
//会员登录
$('.sure').click(function(){
    var username = $('.code').children('input').val();
    var reg = /^1\d{10}$/;
    var password = $('.password').children('input').val();
    if (username == "") {
        $('.toast').html('请输入手机号');
        toast();
    } else if (!reg.test(username)) {
        $('.toast').html('您输入的手机号格式不正确');
        toast();
    } else if (password == "") {
        $('.toast').html('请输入密码');
        toast();
    } else {
        //验证登录的账号
        axios({
            method:"post",
            url:"http://vueshop.glbuys.com/api/home/user/pwdlogin?token=1ec949a15fb709370f",
            data:"cellphone="+username+"&password="+password
        }).then((res)=>{
           if(res.data.code==200){
                localStorage.setItem('user',JSON.stringify(res.data.data));
                location.href="my.html";
           }else{
                $('.toast').html('您输入的用户名或密码不正确');
                toast();
           }
        });
    }
});