// 我的飞机的功能
var myPlane = {
    init(){
        var that = this;
        // 选择
        var contElement = document.getElementById("box");

        // 创建我的飞机
        that.meElement = document.createElement("div");
        that.meElement.className = "me";
        contElement.appendChild(that.meElement);

        // 计算我的飞机的最大的left
        var maxLeft = contElement.offsetWidth - that.meElement.offsetWidth;
        var maxTop = contElement.offsetHeight - that.meElement.offsetHeight;
        
        // 初始位置：最下方的中间
        that.meElement.style.top = maxTop + "px";
        that.meElement.style.left = contElement.offsetWidth/2 - that.meElement.offsetWidth/2 + "px";
        
        // 为了游戏体验，给整个网页添加移动事件
        document.onmousemove = function(e){
            // console.log("鼠标移动了")
            // 获取鼠标在页面上的坐标，准备用来计算出我的飞机的位置
            // console.log(e.pageX, e.pageY)

            // 提前计算我的飞机的位置
            var l = e.pageX - that.meElement.offsetWidth/2 - contElement.offsetLeft;
            var t = e.pageY - that.meElement.offsetHeight/2;
            
            // 对我的飞机的位置进行边界限定
            // 右
            if(l > maxLeft){
                l = maxLeft
            }
            // 左
            if(l < 0){
                l = 0
            }
            // 上
            if(t < 0){
                t = 0
            }

            // 将边界限定后的位置，设置给我的飞机
            // document.getElementsByClassName('shield')[0].style.top = t - 45 +'px';
            // document.getElementsByClassName('shield')[0].style.left = l - 15 +'px';
            that.meElement.style.left = l + "px";
            that.meElement.style.top = t + "px";
        }
    },
    die(){
        // 为了游戏体验，当飞机要爆炸了，就不能再跟着鼠标走了
        document.onmousemove = null;

        var that = this;

        // 切换我的飞机的爆炸图
        var num = 1;
        var t = setInterval(function(){
            if(num === 5){
                clearInterval(t);
                that.meElement.remove();
            }else{
                that.meElement.style.background = "url(images/me_die"+ num +".png)";
                num++
            }
        }, 100);
    },
    fire(){
        setInterval(function(){
            console.log("创建子弹");
        }, 1000);
    }
}

// 执行创建我的飞机
myPlane.init();



