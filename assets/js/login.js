$(function () {
    // 点击 “去注册” 隐藏登录页面 显示注册页面
    $("#link_reg").on("click", function () {
        $(".login-box").hide()
        $(".reg-box").show()
    })
    // 点击 “去登录” 隐藏注册页面 显示登录页面
    $("#link_login").on("click", function () {
        $(".reg-box").hide()
        $(".login-box").show()
    })


    // 自定义校验规则
    // 从 layUI 中获取 form 对象 （??????????????????//）
    var form = layui.form
    // 
    var layer = layui.layer
    // 通过 form.verify() 函数自定义校验规则
    form.verify({
        // 自定义了一个叫做 pwd 校验规则
        pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
        // 验证两次密码是否一致的规则
        repwd: function (value) {
            // 通过形参拿到的是确认密码框中的内容
            // 还要拿到密码框中的内容
            // 然后进行一次等于的判断
            // 如果判断失败，则return一个提示消息

            // 这里用到了属性选择器
            var pwd = $('.reg-box [name=password]').val()
            if (pwd !== value) {
                return '两次密码不一致'
            }
        }
    })

    // 监听注册表单的提交事件
    $('#form_reg').on("submit", function (e) {
        // 注意；这里data不能定义出 监听注册表单的提交事件 的范围，比如，定义在它外面，为一个全局变量，此时，此时表单为空, 所以里面 username 和password 拿到表单里面的值为空
        var data = {
            username: $('#form_reg [name=username]').val(),
            password: $('#form_reg [name=password]').val()
        }
        // 阻止表单默认提交行为
        e.preventDefault();
        $.post('/api/reguser', data, function (res) {
            if (res.status !== 0) {
                return layer.msg(res.message)
            }
            layer.msg('注册成功');
            // 模拟人的点击行为
            $("#link_login").click();

        })

    })
    // 监听登录表单的提交事件
    $('#form_login').on("submit", function (e) {
        e.preventDefault();
        $.ajax({
            url:'/api/login',
            method:'post',
            // 快速获取表单数据 返回的是序列化表单数据
            data: $(this).serialize(),
            success: function(res) {
                if(res.status !== 0) {
                    return layer.msg('用户名不存在或者密码错误')
                }
              
                // console.log(res.token);
                layer.msg('登录成功')
                  // 将登录成功得到的 token 字符串，保存到 localStorage 中
                  localStorage.setItem('token', res.token)
                // 跳转到后台主页
                location.href = './index.html'
            }
        })
    })






})