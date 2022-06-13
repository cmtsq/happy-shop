//返回上一页
$('.back').click(function () {
    location.replace(document.referrer);
});
//本地用户数据
var user = JSON.parse(localStorage.getItem('user'));
//展示地址列表
axios({
    method:"get",
    url:"http://vueshop.glbuys.com/api/user/address/index?uid="+user.uid+"&token=1ec949a15fb709370f"
}).then((res)=>{
    if(res.data.code==200){
        console.log(res.data)
        $('.box').html(template('tpl-address-list',res.data));
    }else{
        $('.no-data').css("display","block");
        $('.box').css("display","none");
    }
    //添加收货地址
    $('.address-nav-name-2').click(function(){
        location.href="add.html";
    });
    //修改地址信息
    $('.edit').click(function(event){
        event.stopPropagation();
        var aid = $(this).parents('.address-list').attr('id');
        location.href="revise.html?aid="+aid;
    });
    //删除地址
    $('.del').click(function (event) {
        event.stopPropagation();
        var aid = $(this).parents('.address-list').attr('id');
        $('#confirm').css('display', 'block');
        $('.yes').click(function(){
            $('#confirm').css('display', 'none');
            axios({
                method: "get",
                url: "http://vueshop.glbuys.com/api/user/address/del?uid=" + user.uid + "&aid=" + aid + "&token=1ec949a15fb709370f"
            }).then((res) => {
                if(res.data.code==200){
                    $(`#${aid}`).remove();
                }
            });
        });
        $('.no').click(function () {
            $('#confirm').css('display', 'none');
        });
    });
    //选择收货地址
    $('.address-list').click(function(){
        localStorage.setItem('aid',$(this).attr('id'));
        history.back(-1);
    });
});