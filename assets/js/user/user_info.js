$(function() {
    var form = layui.form
    var layer = layui.layer

    // 定义昵称的规则
    form.verify({
        nickname: function(value) {
            if (value.length > 6) {
                return '昵称长度必须在 1~6 个字符之间'
            }
        }
    })
    // 调用 初始化用户基本信息 函数
    initUserinfo()










    
// 初始化用户基本信息
function initUserinfo() {
    $.ajax({
        method: 'get',
        url: '/my/userinfo',
        success: function (res){
            if (res.status !== 0) {
                return layer.msg('获取用户信息失败')
            }
            // console.log(res);
            // 传统方法
            // $("#username").val(res.data.username)
            // layui 自带方法 快速为表单赋值
            form.val('formUserInfo', res.data)
        }
    })
}

// 提交修改信息 发起ajax请求
$('.layui-form').on("submit", function(e) {
    e.preventDefault();
    
    $.ajax({
        method: 'post',
        url:'/my/userinfo',
        data: $(this).serialize(),
        success: function(res) {
            if (res.status !== 0) {
                return layer.msg(res.message)
            }
            layer.msg('更新用户信息成功')


            // 核心要点
            // 调用父页面中的方法，重新渲染用户的头像和用户的信息
            window.parent.getUserInfo()
        }
    })
    })
})

