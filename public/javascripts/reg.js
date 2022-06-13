//返回上一页
$('.back').click(function(){
    history.back(-1);
});
//获取验证码
$('.code-img').click(function(){
    axios({
        method:"post",
        url:"http://vueshop.glbuys.com/api/vcode/chkcode?token=1ec949a15fb709370f"
    }).then((res)=>{
        // console.log(res.data)//乱码
        $(this).find('#re').attr('src',"http://vueshop.glbuys.com/api/vcode/chkcode?token=1ec949a15fb709370f");
    });
});
//判断验证码
// $('.code-btn').click(function(){
//     axios({
//         method:"post",
//         url:"http://vueshop.glbuys.com/api/home/user/checkvcode?token=1ec949a15fb709370f",
//         data:"vcode="+$('#code-num').val()
//     }).then((res)=>{
//         console.log($('#code-num').val())
//         console.log(res.data);
//     });
// });
//输入手机号
var reg = /^1\d{10}$/;
var cellphone = $('.cellphone').children('input');
$('.code-btn').addClass('dis');
cellphone.keyup(function(){
    if(reg.test(cellphone.val()) == true){
        $('.code-btn').addClass('red').removeClass('dis');
    }else{
        $('.code-btn').removeClass('red').addClass('dis');
    }
});
//获取验证码
function gCode(){
    $('.code-btn').click(function () {
        if($('#code-num').val().length == 0){
            $('.toast').html('请输入图形验证码');
            toast();
        }else if($('#code-num').val().length != 4){
            $('.toast').html('您输入的图形验证码不正确');
            toast();
        }else{
            var n = 10;
            $('.code-btn').addClass('dis').removeClass('red').html(`重新获取(${n})`);
            var codetime = setInterval(getCode, 1000);
            function getCode() {
                n--;
                $('.code-btn').addClass('dis').html(`重新获取(${n})`);
                if (n < 0) {
                    stop();
                    $('.code-btn').addClass('red').removeClass('dis').html('获取短信验证码');
                }
            }
            function stop() {
                clearInterval(codetime);
            }
        }
    });
}gCode()
//弹出提示框
function toast(){
    $('.bottom-toast').fadeIn();
    setTimeout(() => {
        $('.bottom-toast').fadeOut(1500);
    }, 1000);
}
//开关
$('.van-switch').click(function(){
    if($('.van-switch').attr('class') == "van-switch"){
        $(this).addClass('van_switch');
        $(this).children('.switch_node').addClass("switch-node");
        $('.password').children('input').removeAttr('type','password').attr('type','text');
    }else{
        $(this).removeClass('van_switch');
        $(this).children('.switch_node').removeClass("switch-node");
        $('.password').children('input').removeAttr('type','text').attr('type','password');
    }
});
//注册会员
$('.sure').click(function(){
    //验证注册
    axios({
        method: 'post',
        url: 'http://vueshop.glbuys.com//api/home/user/isreg?token=1ec949a15fb709370f',
        data: "username="+$('#phone').val()
    }).then((res) => {
        if (res.data.code == 200) {
            if(res.data.data.isreg=="1"){
                $('.toast').html('此手机号已被注册，请更换手机号');
                toast();
            }else{
                if($('.code-wrap').children('input').val() == ""){
                    $('.toast').html('请输入短信验证码');
                    toast();
                }else if($('.code-wrap').children('input').val().length != 4){
                    $('.toast').html('您输入的短信验证码格式不正确');
                    toast();
                }else{
                    //注册成功
                    axios({
                        method: "post",
                        url: "http://vueshop.glbuys.com/api/home/user/reg?token=1ec949a15fb709370f",
                        data: "cellphone=" + $('#phone').val() + "&password=" + $('.password').children('input').val()
                    }).then((res) => {
                        if (res.data.code == 200) {
                            location.href = "login.html";
                        }else{
                            $('.toast').html('请输入密码');
                            toast();
                        }
                    });
                }
                
            }
        }else{
            if($('#code-num').val().length == 0){
                $('.toast').html('请输入图形验证码');
                toast();
            }else if($('#code-num').val().length != 4){
                $('.toast').html('您输入的图形验证码不正确');
                toast();
            }else if(cellphone.val() == ""){
                $('.toast').html('请输入手机号');
                toast();
            }else if(!reg.test(cellphone.val())){
                $('.toast').html('您输入的手机号格式不正确');
                toast();
            }else if($('.code-wrap').children('input').val() == ""){
                $('.toast').html('请输入短信验证码');
                toast();
            }
        }
    });
})