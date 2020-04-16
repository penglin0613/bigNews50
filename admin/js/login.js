//入口函数
$(function () {
  //一:登录
  //1.1 给登录按钮设置一个点击事件.
  $(".input_sub").on("click", function (e) {
    //1.2 阻止form表单中submit的默认提交行为
    e.preventDefault();
    //1.3 获取用户输入的账号密码
    var username = $(".input_txt").val().trim(); //账号
    var password = $(".input_pass").val().trim(); //密码
    //1.4 非空判断
    if (username == "" || password == "") {
      //在工作中很少会去使用alert的弹出框,因为它真的很丑.
      //你要么就自己写一个div先把他隐藏,等到要弹出的时候就显示.
      //要么就用bootstrap里面为我们提供的弹出框.
      //alert('账号或密码不能为空!');
      $("#myModal .modal-body>p").text("账号或密码不能为空!");
      $("#myModal").modal(); //js代码的方式弹出bootstrap的模态框
      return;
    }
    //1.5 发送ajax请求,完成登录
    $.ajax({
      type: "post",
      // url: 'http://localhost:8080/api/v1/admin/user/login',
      url: BigNew.user_login, //使用http.js里面报错的接口地址
      data: {
        username: username,
        password: password,
      },
      success: function (backData) {
        //console.log(backData);
        if (backData.code == 200) {
          //1.6 如果账号密码没有错误,提示一下登录成功
          //alert('登录成功!');
          $("#myModal .modal-body>p").text("登录成功!");
          $("#myModal").modal(); //js代码的方式弹出bootstrap的模态框
          //页面跳转应该放在模态框关闭事件里面.
          $("#myModal").on("hide.bs.modal", function (e) {
            //把服务器返回回来的Token令牌给保存起来.
            localStorage.setItem("token", backData.token);
            //跳转到首页.
            window.location.href = "./index.html";
          });
        } else {
          //1.7 如果账号密码有误,提示一下
          //alert('账号或者密码有误!');
          $("#myModal .modal-body>p").text("账号或者密码有误!");
          $("#myModal").modal(); //js代码的方式弹出bootstrap的模态框
        }
      },
    });
  });
});
