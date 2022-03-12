
$(function() {
    getUserInfo()
    // 
    var layer = layui.layer
    // 
    $("#btnLogout").on("click", function() {
        layer.confirm('确定退出登录吗?', {icon: 3, title:'提示'}, function(index){
            // do something
            // 1.清空本地存储中的 token
            localStorage.removeItem('token')
            // 2.重新跳转到登录页面
            location.href = './login.html'
            // localStorage.removeItem('href')
            layer.close(index)

        })
    })
})

// 使用ajax 动态获取用户基本信息
function getUserInfo() {
    $.ajax({
        method: 'get',
        url: '/my/userinfo',
        // headers 就是请求头配置对象
        // headers: {
        //     // Authorization 的值取 本地存储里的token 如果没有 就取空字符
        //     Authorization: localStorage.getItem('token') || ''
        // },
        success: function(res) {
            if (res.status !== 0) {
                // 利用 layui 里的layer 对象 里的msg 方法 弹出错误信息
                return layui.layer.msg('获取用户信息失败！')
            }
            // 调用 renderAvatar 渲染用户的头像
            renderAvatar(res.data)
        },
    })
}

// 渲染用户头像
function renderAvatar(user) {
    // 1.获取用户的名称
    var name = user.nickname || user.username
    // 2.设置欢迎的文本
    $('#welcome').html('你好！&nbsp;' + name)

    // 3.按需渲染头像
    if(user.user_pic !== null) {
        // 3.1 渲染图片头像
        $(".text-avatar").hide()
        $(".layui-nav-img").attr('src', user.user_pic).show()
    } else {
        // 3.2 渲染文本头像
        $(".layui-nav-img").hide()
        var first = name[0].toUpperCase()
        $('.text-avatar').html(first).show()

    }
}