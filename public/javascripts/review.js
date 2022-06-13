//获取本地储存的用户数据
var user = JSON.parse(localStorage.getItem('user'));
//返回上一页
$('.back').click(function () {
    history.back(-1);
});
//弹出提示框
function toast() {
    $('.bottom-toast').fadeIn();
    setTimeout(() => {
        $('.bottom-toast').fadeOut(1500);
    }, 1000);
}
$('.submit').click(function(){
    if($('.content').val()==""){
        $('.toast').html("请输入评价内容");
        toast();
    }else{
        var rsdata=[
            {"gid":obj.gid,"myid":user.uid,"rsid":"1","score":$('.stars-one>.stars.active').length},
            {"gid":obj.gid,"myid":user.uid,"rsid":"7","score":$('.stars-two>.stars.active').length}
        ];
        axios({
            method:"post",
            url:"http://vueshop.glbuys.com/api/home/reviews/add?token=1ec949a15fb709370f",
            data:"uid="+user.uid+"&gid="+obj.gid+"&ordernum="+obj.ordernum+"&content="+$('.content').val()+"&rsdata="+JSON.stringify(rsdata)
        }).then((res)=>{
            // console.log(res.data)
            if(res.data.code==200){
                $('.toast').html(res.data.data);
                toast();
                setTimeout(() => {
                    history.back();
                }, 2500);
            }else{
                $('.toast').html(res.data.data);
                toast();
            }
        });
    }
});
//点亮星星
function star(){
    $('.stars-one>.stars').click(function(){
        var index = $(this).index();
        $(`.stars-one>.stars:gt(${index})`).removeClass('active');
        $(`.stars-one>.stars:lt(${index+1})`).addClass('active');
    });
    $('.stars-two>.stars').click(function(){
        var index = $(this).index();
        $(`.stars-two>.stars:gt(${index})`).removeClass('active');
        $(`.stars-two>.stars:lt(${index+1})`).addClass('active');
    });
}star()
