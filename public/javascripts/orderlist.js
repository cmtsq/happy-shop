if(str==0){
    $('.tags:eq(1)').addClass('active').siblings().removeClass('active');
    orderlist(str);
}else if(str==1){
    $('.tags:eq(2)').addClass('active').siblings().removeClass('active');
    orderlist(str);
}else if(str==2){
    $('.tags:eq(3)').addClass('active').siblings().removeClass('active');
    eva();
}else{
    orderlist("all");
}
//订单列表
function orderlist(status){
    axios('http://vueshop.glbuys.com/api/user/myorder/index?uid='+user.uid+'&status='+status+'&token=1ec949a15fb709370f').then((res)=>{
        if(res.data.code==200){
            var pagenum = parseInt(res.data.pageinfo.pagenum);
            // console.log(res.data)
            for (var i = 1; i <= pagenum; i++) {
                axios('http://vueshop.glbuys.com/api/user/myorder/index?uid=' + user.uid + '&status=' + status + '&token=1ec949a15fb709370f&page=' + i).then((res) => {
                    $.each(res.data.data, (m, val) => {
                        var itemlist = val.goods.map((item) => {
                            return `
                            <div class="item-list">
                                <div class="image">
                                    <img src="${item.image}" alt="">
                                </div>
                                <div class="title">${item.title}</div>
                                <div class="amount">x ${item.amount}</div>
                            </div>
                        `
                        }).join('');
                        $('.main').append(`
                    <div class="order-list">
                        <div class="ordernum-wrap">
                            <div class="ordernum" id="${val.ordernum}">订单编号：${val.ordernum}</div>
                            <div class="status">${val.status == 0 ? "待付款" : val.status == 1 ? "待收货" : "已收货"}</div>
                        </div>
                        ${itemlist}
                        <div class="total-wrap">
                            <div class="total">实付金额：¥${val.total}</div>
                            <div class="status-wrap">
                                ${(function () {
                                if (val.status == 0) {
                                    return `<div class="status-btn cancel">取消订单</div>
                                            <div class="status-btn receiving">去付款</div>`
                                } else if (val.status == 1) {
                                    return `<div class="status-btn">待收货</div>`
                                } else {
                                    return `<div class="status-btn">已收货</div>`
                                }
                            })()
                            }
                            </div>
                        </div>
                    </div>
                    `);
                    });
                    //查看订单详情
                    $('.order-list').click(function(){
                        location.href="orderdls.html?ordernum="+$(this).children('.ordernum-wrap').children('.ordernum').attr('id');
                    });
                    //取消订单
                    $('.cancel').click(function(event){
                        event.stopPropagation();
                        var oid = $(this).parents('.order-list').children('.ordernum-wrap').children('.ordernum').attr('id');
                        $('#confirm').css('display', 'block');
                        $('.yes').click(function () {
                            $('#confirm').css('display', 'none');
                            axios({
                                method: "get",
                                url: "http://vueshop.glbuys.com/api/user/myorder/clearorder?uid="+user.uid+"&ordernum="+oid+"&token=1ec949a15fb709370f"
                            }).then((res) => {
                                if (res.data.code == 200) {
                                    $(`#${oid}`).parent().parent().remove();
                                }
                            });
                        });
                        $('.no').click(function () {
                            $('#confirm').css('display', 'none');
                        });
                    });
                    //确认收货
                    $('.receiving').click(function(event){
                        event.stopPropagation();
                        var oid = $(this).parents('.order-list').children('.ordernum-wrap').children('.ordernum').attr('id');
                        axios({
                            method: "get",
                            url: "http://vueshop.glbuys.com/api/user/myorder/finalorder?uid="+user.uid+"&ordernum="+oid+"&token=1ec949a15fb709370f"
                        }).then((res) => {
                            console.log(res.data)
                            if (res.data.code == 200) {
                                location.reload();
                            }
                        });
                    });
                });
            }
        }
    });
}
//待评价订单
function eva(){
    axios.get('http://vueshop.glbuys.com/api/user/myorder/reviewOrder?uid='+user.uid+'&page=1&token=1ec949a15fb709370f').then((res)=>{
        if(res.data.code==200){
            var pagenum = parseInt(res.data.pageinfo.pagenum);
            for (var i = 1; i <= pagenum; i++) {
                axios.get('http://vueshop.glbuys.com/api/user/myorder/reviewOrder?uid='+user.uid+'&page='+i+'&token=1ec949a15fb709370f').then((res)=>{
                    $.each(res.data.data,(m,val)=>{
                        var itemlist = val.goods.map((item)=>{
                            return `
                            <div class="item-list" gid="${item.gid}">
                                <div class="image">
                                    <img src="${item.image}" alt="">
                                </div>
                                <div class="title">${item.title}</div>
                                <div class="amount">x ${item.amount}</div>
                                <div class="status-btn eva">${item.isreview==0?"评价":"追加评价"}</div>
                            </div>
                            `
                        }).join('');
                        $('.main').append(`
                        <div class="order-list">
                            <div class="ordernum-wrap">
                                <div class="ordernum" id="${val.ordernum}">订单编号：${val.ordernum}</div>
                                <div class="status">已收货</div>
                            </div>
                            ${itemlist}
                        </div>
                        `);
                    });
                    //查看订单详情
                    $('.order-list').click(function(){
                        location.href="orderdls.html?ordernum="+$(this).children('.ordernum-wrap').children('.ordernum').attr('id');
                    });
                    //评价
                    $(".eva").click(function(event){
                        event.stopPropagation();
                        location.href="review.html?gid="+$(this).parent().attr('gid')+"&ordernum="+$(this).parent().parent().children('.ordernum-wrap').children('.ordernum').attr('id');
                    });
                });
            }
        }
    });
}
//选项卡切换
$('.tags').click(function(){
    $('.main').empty();
    $(this).addClass('active').siblings().removeClass('active');
    var index = $(this).index();
    if(index==0){
        orderlist("all");
    }else if(index==1){
        orderlist(0);
    }else if(index==2){
        orderlist(1);
    }else{
        eva();
    }
});