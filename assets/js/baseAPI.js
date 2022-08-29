// 注意每次调用$.get() $.post() 或者$.ajax()的时候‘
// 会先调用 ajaxPrefilter函数
// 在这个函数，可以拿到Ajax提供的配置对象

$.ajaxPrefilter(function(options) {
    console.log(options.url); 
  // 在发起真正的 Ajax 请求之前，统一拼接请求的根路径
 options.url = "http://www.liulongbin.top:3007" + options.url
 console.log(options.url); 
})