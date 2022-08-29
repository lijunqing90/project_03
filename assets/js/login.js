$(function(){
    // 点击(去注册账号的链接
    $("#link_reg").on("click",function(){
        $(".login-box").hide()
        $(".reg-box").show()
    })

    // 点击去登录链接
    $("#link_login").on("click",function(){
        $(".login-box").show()
        $(".reg-box").hide()
    })

    //从layui中获取from对象
    var form = layui.form
    var layer = layui.layer  
    //通过from.verify() 函数自定义校验规则
    form.verify({
        // 自定义一个叫做pwd 校验规则
        pwd:[/^[\S]{6,12}$/,'密码必须6到12位,且不能出现空格'],

        // 校验2次输入密码的值
        repwd : function(value){
            // 拿确认密码框的内容
            // 拿到密码框中的内容
            // 进行一次等于判断
            // 失败 return 一个消息
        var pwd = $(".reg-box [name = password").val()
         console.log(pwd);
         console.log(value);
         if(pwd !== value){
            return "两次密码不一致"
         }

        }
    })
    
    // 监听注册表单的提交事件
    $('#form_reg').on('submit', function(e) {
        // 1. 阻止默认的提交行为
        e.preventDefault()
        // 2. 发起Ajax的POST请求
        var data = {
          username: $('#form_reg [name=username]').val(),
          password: $('#form_reg [name=password]').val()
        }
        $.post('/api/reguser', data, function(res) {
          if (res.status !== 0) {
            return layer.msg(res.message)
          }
          layer.msg('注册成功，请登录！')
          // 模拟人的点击行为
          $('#link_login').click()
        })
      })
    //   监听登录表单事件
    $("#form_login").submit(function(e){
        // 阻止表单的默认提交行为
        e.preventDefault();

        $.ajax({
            url:"/api/login",
            method:"POST",
            // 快速获取表单数据
            data:$(this).serialize(),
            success:function(res){
                if(res.status !== 0 ){
                    return layer.msg("登陆失败")
                }
               console.log(res.token);
               layer.msg("登陆成功")
            //    将登录成功获取的 token字符串  保存到 localStorage   
            localStorage.setItem("token",res.token)
            //    跳转到后台主页 
               location.href ="/index.html"
            }
            
        })
    })
    

})  