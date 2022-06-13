//返回上一页
$('.back').click(function(){
    history.back(-1);
});
//用户数据
var user = JSON.parse(localStorage.getItem('user'));
// 我的收藏
axios.get('http://vueshop.glbuys.com/api/user/fav/index?uid='+user.uid+'&token=1ec949a15fb709370f').then((res)=>{
    if(res.data.code==200){
        var pagenum = parseInt(res.data.pageinfo.pagenum);
        for(var i=1;i<=pagenum;i++){
            axios.get('http://vueshop.glbuys.com/api/user/fav/index?uid='+user.uid+'&token=1ec949a15fb709370f&page='+i).then((res)=>{
                if(res.data.code==200){
                    $.each(res.data.data,function(n,val){
                        $('.main').append(`
                        <div class="goods-list" id="${val.fid}">
                            <div class="image">
                                <img src="${val.image}" alt="">
                            </div>
                            <div class="title">${val.title}</div>
                            <div class="price">¥${val.price}</div>
                            <div class="btn-wrap" id="${val.gid}">
                                <div class="btn buy">购买</div>
                                <div class="btn del">删除</div>
                            </div>
                        </div>
                        `);
                    });
                }else{
                    $('.no-data').css("dislplay","block");
                }
                //点击进入商品详情
                $('.buy').click(function(){
                    location.href="details.html?gid="+$(this).parent().attr('id');
                });
                //删除/取消收藏
                $('.del').click(function(){
                    var fid = $(this).parents('.goods-list').attr('id');

                    $('#confirm').css('display', 'block');
                    $('.yes').click(function () {
                        $('#confirm').css('display', 'none');
                        axios({
                            method: "get",
                            url: "http://vueshop.glbuys.com/api/user/fav/del?uid="+user.uid+"&fid="+fid+"&token=1ec949a15fb709370f"
                        }).then((res) => {
                            if (res.data.code == 200) {
                                $(`#${fid}`).remove();
                                $('.toast').html(res.data.data);
                                toast();
                            }
                        });
                    });
                    $('.no').click(function () {
                        $('#confirm').css('display', 'none');
                    });
                });
            });
        }
    }
});
//弹出提示框
function toast() {
    $('.bottom-toast').fadeIn();
    setTimeout(() => {
        $('.bottom-toast').fadeOut(1500);
    }, 1000);
}