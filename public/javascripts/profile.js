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
//获取会员信息
axios({
    method: "get",
    url: "http://vueshop.glbuys.com//api/user/myinfo/userinfo/uid/" + user.uid + "?token=1ec949a15fb709370f"
}).then((res) => {
    console.log(res.data);
    if(res.data.data.head!=""){
        $('.head>li>img').attr('src',res.data.data.head);
    }
    $('.nickname').val(res.data.data.nickname);
    if(res.data.data.gender==1){
        $('.gender').val('男');
        $('.gender').attr('num','1');
    }else{
        $('.gender').val('女');
        $('.gender').attr('num','2');
    }
});
$('.gender').click(function(){
    $('.mask').css('display','block');
    $('.action-sheet').css('display','block');
    event.stopPropagation();
});
$(document).click(function(){
    $('.mask').css('display','none');
    $('.action-sheet').css('display','none');
});
$('.menu-title').click(function(event){
    event.stopPropagation();
});
$('.select>li').click(function(){
    var num = $(this).attr('num');
    if(num == 1){
        $('.gender').val("男");
        $('.gender').attr('num','1');
    }else{
        $('.gender').val('女');
        $('.gender').attr('num','2');
    }
});
$('.right-btn').click(function(){
    let nickname = $('.nickname').val();
    let gender = $('.gender').attr('num');
    axios({
        method:"post",
        url:"http://vueshop.glbuys.com//api/user/myinfo/updateuser?token=1ec949a15fb709370f",
        data:"uid="+user.uid+"&nickname="+nickname+"&gender="+gender
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
});