//获取本地储存的用户数据
var user = JSON.parse(localStorage.getItem('user'));
//返回上一页
$('.back').click(function(){
    history.back(-1);
});
//展示地址列表
axios({
    method:"get",
    url:"http://vueshop.glbuys.com/api/user/address/index?uid="+user.uid+"&token=1ec949a15fb709370f"
}).then((res)=>{
    if(res.data.code==200){
        $('.main').html(template('tpl-address-list', res.data));
        $('.list').click(function () {
            //跳转到地址详情
            let aid = $(this).attr('id');
            location.href = "revise.html?aid=" + aid;
        });
    }
});
//添加新地址
$('.add-btn').click(function(){
    location.href="add.html";
});