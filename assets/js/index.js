$(function () {
    // 调用getUserInfo获取用户信息
    getUserInfo()
    var layer = layui.layer
    $("#btnLogout").on("click", function () {
        //提示用户是否确认退出
        layer.confirm('确定退出登录?', { icon: 3, title: '提示' }, function (index) {
            //do something
            console.log("ok");
            // 清楚本地存储的token
            localStorage.removeItem("token")
            location.href = "/login.html"
            // 关闭confirm询问框
            layer.close(index);
        });
    })

})
// 获取用户基本信息
function getUserInfo() {
    $.ajax({
        method: "GET",
        url: "/my/userinfo",
        success: function (res) {
            if (res.status !== 0) {
                return layui.layer.msg("获取用户信息失败")
            }
            //  调用renderAvatar()
            renderAvatar(res.data)
        },

        // // 不论成功还是失败都会调用complete函数
        // complete: function (res) {
        //     console.log("执行了回调函数");
        //     console.log(res);
        //     // 在complete回调函数 可以使用responseJSON 拿到服务器响应会回来的数据
        //     if (res.responseJSON.status === 1 && res.responseJSON.message === "身份认证失败！") {
        //         localStorage.removeItem("token")
        //         location.href = "/login.html"
        //     }
        // }

    })
}
// 渲染头像
function renderAvatar(user) {
    // 1:获取用户名称
    var name = user.nickname || user.username
    // 2：设置欢迎文本
    $("#welcome").html("欢迎&nbsp;" + name)
    // 3：按需求渲染用户头像
    if (user.user_pic !== null) {
        // 渲染图片头像
        $(".layui-nav-img").attr("src", user.user_pic).show();
        $(".text-avatar").hide()
    } else {
        $(".layui-nav-img").hide()
        var first = name[0].toUpperCase()
        $(".text-avatar").html(first).show()
    }

}