//入口函数
$(function () {
  //一:一进到后台首页,就应该获取登录的管理员的个人信息,显示在页面上.
  // //用原生js发送ajax请求.
  // //如何把token带过去?设置请求头
  // var xhr = new XMLHttpRequest();
  // xhr.open('get','http://localhost:8080/api/v1/admin/user/info');
  // //设置请求头('键:后端人员规定的',存放在localStorage中token令牌的值)
  // xhr.setRequestHeader('Authorization',localStorage.getItem('token'));
  // xhr.onload = function(){
  //     console.log(xhr.response);
  // }
  // xhr.send();

  // //一:一进到后台首页,就应该获取登录的管理员的个人信息,显示在页面上.
  //jQuery发送ajax请求,如何把token令牌带过去呢? 也是一样的设置请求头.
  //1.1 发送ajax请求,获取个人信息.
  $.ajax({
    type: "get",
    // url: 'http://localhost:8080/api/v1/admin/user/info',
    url: BigNew.user_info, //使用的是http.js中的接口地址
    //设置请求头(键,值)
    // headers: {
    //     'Authorization': localStorage.getItem('token')
    // },
    success: function (backData) {
      console.log(backData);
      if (backData.code == 200) {
        //1.2 个人信息显示在页面上.
        $(".user_info>span>i").text(backData.data.nickname);
        $(".user_info>img").attr("src", backData.data.userPic);
        $(".user_center_link>img").attr("src", backData.data.userPic);
      }
    },
  });

  //每一个ajax请求都要设置token令牌,不然人家接口以为你没有登录,那就不给你数据.
  //每一个ajax请求都要设置token令牌,那就很烦人了.
  //那我们就想可不可以在一个地方设置,每次发送ajax请求之前都去执行那个地方.
  //那每次发送ajax请求不都有token令牌了吗?
  //我们把这种叫做全局设置.
  //我们每次发送ajax请求,都是用的jQuery发送的.
  //每次都要引入jQuery, 也就是说这个引入的jQuery文件每次都会执行的.
  //所以这个全局设置写在这个引入的jQuery文件中.

  //二:登出系统
  //2.1 给登出按钮设置一个点击事件.
  $(".logout").on("click", function (e) {
    //阻止a标签的默认跳转
    e.preventDefault();
    if (confirm("你确定要退出吗?")) {
      //删除token
      localStorage.removeItem("token");
      //跳转到登录页
      window.location.href = "./login.html";
    }
  });

  //三:左侧一级菜单(首页,文章管理,评论管理,个人中心)设置点击事件.
  $("div.level01").on("click", function () {
    //3.1 当前点击的这个一级菜单添加active类,其他的兄弟一级菜单移除这个active类
    $(this).addClass("active").siblings("div").removeClass("active");
    //3.2 判断一下当前点击的是否是"文章管理"这个一级菜单.
    if ($(this).index() == 1) {
      //二级菜单ul 显示就隐藏,隐藏就显示
      $("ul.level02").slideToggle();
      //小尖尖(b标签)要做cs动画(实际上就是添加/移除一个类rotate0)
      $(this).find("b").toggleClass("rotate0");

      //首页你要明白给谁注册的事件:
      //第一个二级菜单(文章列表)里面的a标签,转成dom对象,触发他的单击事件.
      //a标签的dom元素的单击事件, 不仅会触发单击事件,还会触发超链接
      //触发超链接就会用iframe标签打开这个超链接对应的页面
      //触发单击事件,会事件冒泡,那不就相当于触发了她的父亲也就是li标签的单击事件吗
      //那不就有了选中的文字颜色了吗?
      $("ul.level02>li:eq(0)>a")[0].click();
    }
  });

  //四:左侧二级菜单(文章列表,发表文章,文章类别管理)点击事件的.
  $("ul.level02>li").on("click", function () {
    //当前点击的二级菜单添加active类,其他的兄弟二级菜单移除这个类.
    $(this).addClass("active").siblings("li").removeClass("active");

    //待解决的需求:
    //点击一级菜单 "文章管理" 默认选中二级菜单 "文章列表"
    //有2种做法:
    //一个简单
    //一个难一点
  });
});
