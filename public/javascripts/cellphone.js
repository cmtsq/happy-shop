//获取本地储存的用户数据
var user = JSON.parse(localStorage.getItem('user'));
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
//验证手机号
let reg = /^1\d{10}$/;
$('.save-btn').click(function(){
    if ($('.cellphone').val() == "") {
        $('.toast').html("请输入手机号");
        toast();
    } else if (!reg.test($('.cellphone').val())) {
        $('.toast').html("您输入的手机号格式不正确");
        toast();
    } else if ($('.cellphone').val() == user.cellphone) {
        $('.toast').html("此手机已被注册过，请更换手机号");
        toast();
    } else if ($('.code').val() == "") {
        $('.toast').html("请输入短信验证码");
        toast();
    } else if ($('.code').val().length != 4) {
        $('.toast').html("验证码错误");
        toast();
    }else{
        axios({
            method:'post',
            url:'http://vueshop.glbuys.com//api/user/myinfo/updatecellphone?token=1ec949a15fb709370f',
            data:"uid="+user.uid+"&cellphone="+$('.cellphone').val()
        }).then((res)=>{
            if(res.data.code==200){
                $('.toast').html(res.data.data);
                toast();
                console.log(res.data.data)
                setTimeout(() => {
                    location.href="my.html"
                }, 2500);
            }else{
                console.log(res.data.data)
                $('.toast').html(res.data.data);
                toast();
            }
        });
    }
});
//键盘校验
$('.code-btn').addClass('dis');
$('.cellphone').keyup(function(){
    if(reg.test($('.cellphone').val())){
        $('.code-btn').addClass('success').removeClass('dis');
    }else{
        $('.code-btn').removeClass('success').addClass('dis');
    }
});
//获取验证码
$('.code-btn').click(function(){
    var n = 10;
    $('.code-btn').addClass('dis').removeClass('success').html(`重新获取(${n})`);
    var codetime = setInterval(getCode, 1000);
    function getCode() {
        n--;
        $('.code-btn').addClass('dis').html(`重新获取(${n})`);
        if (n < 0) {
            stop();
            $('.code-btn').addClass('success').removeClass('dis').html('获取验证码');
        }
    }
    function stop() {
        clearInterval(codetime);
    }
});