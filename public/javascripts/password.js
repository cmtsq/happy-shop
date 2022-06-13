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
//提交
$('.save-btn').click(function(){
    if($('.password').children('input').val()==""){
        $('.toast').html('请输入密码');
        toast();
    }else if($('.password').children('input').val().length<6){
        $('.toast').html('密码不能少于6位');
        toast();
    }else{
        axios({
            method:"post",
            url:"http://vueshop.glbuys.com/api/user/myinfo/modpwd?token=1ec949a15fb709370f",
            data:"uid="+user.uid+"&password="+$('.password').children('input').val()
        }).then((res)=>{
            if(res.data.code==200){
                $('.toast').html(res.data.data);
                toast();
                setTimeout(() => {
                    location.href="my.html"
                }, 2500);
            }else{
                $('.toast').html(res.data.data);
                toast();
            }
        });
    }
});