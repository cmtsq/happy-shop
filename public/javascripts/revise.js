//选择城市
function address() {
    var $target = $('.area');
    $target.citySelect();
    $target.on('click', function (event) {
        event.stopPropagation();
        $target.citySelect('open');
    });
    $target.on('done.ydui.cityselect', function (ret) {
        $(this).val(ret.provance + ' ' + ret.city + ' ' + ret.area);
    });
} address();
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

axios({
    method:"get",
    url:"http://vueshop.glbuys.com/api/user/address/info?uid="+user.uid+"&aid="+aid+"&token=1ec949a15fb709370f"
}).then((res)=>{
    $('.linkname').val(res.data.data.name);
    $('.cellphone').val(res.data.data.cellphone);
    $('.area').val(res.data.data.province+" "+res.data.data.city+" "+res.data.data.area);
    $('.address').val(res.data.data.address);
    if(res.data.data.isdefault==1){
        $('.check')[0].checked = true;
    }else{
        $('.check')[0].checked = false;
    }
    //删除地址
    $('.remove').click(function(){
        $('#confirm').css('display', 'block');
        $('.yes').click(function () {
            $('#confirm').css('display', 'none');
            axios({
                method: "get",
                url: "http://vueshop.glbuys.com/api/user/address/del?uid=" + user.uid + "&aid=" + aid + "&token=1ec949a15fb709370f"
            }).then((res) => {
                if (res.data.code) {
                    location.href = "addressManage.html";
                }
            });
        });
        $('.no').click(function () {
            $('#confirm').css('display', 'none');
        }); 
    });
});
//修改地址信息填写判断
$('.submit-save').click(function(){
    let reg = /^1\d{10}$/;
    if($('.linkname').val()==""){
        $('.toast').html('请输入收货人姓名');
        toast();
    }else if($('.cellphone').val()==""){
        $('.toast').html('请输入手机号');
        toast();
    }else if(!reg.test($('.cellphone').val())){
        $('.toast').html('您输入的手机号格式不正确');
        toast();
    }else if($('.address').val()==""){
        $('.toast').html('请输入详细地址');
        toast();
    }else{
        var arr = $('.area').val().split(" ");
        if ($('.check')[0].checked == true) {
            var isdefault = 1;
        } else {
            var isdefault = 0;
        }
        axios({
            method:"post",
            url:"http://vueshop.glbuys.com/api/user/address/mod?token=1ec949a15fb709370f",
            data:"aid="+aid+"&uid="+user.uid+"&name="+$('.linkname').val()+"&cellphone="+$('.cellphone').val()+
            "&province="+arr[0]+"&city="+arr[1]+"&area="+arr[2]+"&address="+$('.address').val()+"&isdefault="+isdefault
        }).then((res)=>{
            if(res.data.code==200){
                $('.toast').html(res.data.data);
                toast();
                setTimeout(() => {
                    window.location.replace(document.referrer);
                }, 2500);
            }
        });
    }
});