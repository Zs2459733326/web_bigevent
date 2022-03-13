$(function () {
    var layer = layui.layer
    var form = layui.form
    // 通过 form.verift() 函数自定义校验规则
    form.verify({
        pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
        repwd: function (value) {
            // 通过形参拿到的是确认密码框中的内容
            // 还要拿到密码框中的内容
            // 然后进行一次等于的判断
            // 如果判断失败，则return一个提示消息

            // 这里用到了属性选择器
            var pwd = $('.layui-card-body [name=newPwd]').val()
            if (pwd !== value) {
                return '两次密码不一致'
            }
        }
    })


    // 监听表单提交请求  提交 重置密码的请求 
    $(".layui-form").on("submit", function (e) {
        e.preventDefault();
        $.ajax({
            method: 'post',
            url: '/my/updatepwd',
            data: 
            {
                oldPwd: $('[name=oldPwd]').val(),
                newPwd: $('[name=newPwd]').val()
            },

            // $(this).serialize(), //使用这个为什么会显示 newPwd 需要是一个 string
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('修改密码失败')
                }
                layer.msg('修改密码成功')
                // 重置表单
                $(".layui-form")[0].reset();
            }

        })
    })

})