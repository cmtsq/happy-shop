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
//判断收货地址信息
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
    }else if($('.area').val()==""){
        $('.toast').html('请选择所在地区');
        toast();
    }else if($('.address').val()==""){
        $('.toast').html('请输入详细地址');
        toast();
    }else{
        let arr = $('.area').val().split(" ");
        let province = arr[0];
        let city = arr[1];
        let area = arr[2];
        if($('.check')[0].checked==true){
            var isdefault = 1;
        }else{
            var isdefault = 0;
        }
        //添加成功
        axios({
            method:"post",
            url:"http://vueshop.glbuys.com//api/user/address/add?token=1ec949a15fb709370f",
            data:"uid="+user.uid+"&name="+$('.linkname').val()+"&cellphone="+$('.cellphone').val()+"&province="+province+"&city="+city+"&area="+area+"&address="+$('.address').val()+"&isdefault="+isdefault
        }).then((res)=>{
            if(res.data.code==200){
                $('.toast').html('添加成功');
                toast();
                setTimeout(() => {
                    location.replace(document.referrer);
                }, 2500);
            }else{
                $('.toast').html('添加成功');
                toast();
            }
        });
    }
});