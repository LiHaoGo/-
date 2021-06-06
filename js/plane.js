// 专门创建飞机的类


class Plane{
    constructor(type){
        var that = this;

        // 根据不同的飞机的类型，样式和速度不一样的，单独判断
        var className = "";
        var speed = 0;
        if(type === 1){
            className = "plane1";
            speed = 3;
        }else if(type === 2){
            className = "plane2";
            speed = 2;
        }else if(type === 3){
            className = "plane3";
            speed = 1;
        }else if(type === 4){
            className = "bomb_supply";
            speed = 3;
        }

        // 创建
        that.planeElement = document.createElement("div");
        // 选择
        var contELement = document.getElementById("box");
        // 插入
        contELement.appendChild(that.planeElement);
        // 设置元素的样式
        that.planeElement.className = className;
        // 设置初始的top
        that.planeElement.style.top = -that.planeElement.offsetHeight + "px";
        // 设置随机的left
        that.planeElement.style.left = random(0, contELement.offsetWidth - that.planeElement.offsetWidth) + "px";


        // 开始运动
        var t = setInterval(function(){
            if(that.planeElement.offsetTop > contELement.offsetHeight - 300){
                // 运动停止
                clearInterval(t);
                // 停止之后，让飞机爆炸
                that.die(type);
            }else{
                // 在自身原有基础上增加
                that.planeElement.style.top = that.planeElement.offsetTop + speed + "px";
            }
        }, 30);
    }
    die(type){
        var that = this;

        // 根据不同的飞机的类型，爆炸图的数量也不一致，单独判断
        // var target = 0;
        // if(type === 1){
        //     target = 4;
        // }else if(type === 2){
        //     target = 5;
        // }else if(type === 3 ){
        //     target = 7;
        // }
        
        // var num = 1;
        // 通过计时器设置爆炸图，出现动画效果
        // var t = setInterval(function(){
        //     if(num === target){
        //         clearInterval(t);
        //         that.planeElement.remove();
        //     }else{
        //         that.planeElement.style.background = "url(images/boom.png)";
        //     }
        // }, 100);
      setTimeout(function(){
        that.planeElement.style.background = "url(images/boom.gif)";
        that.planeElement.style.backgroundSize = "100% 100%";
        setTimeout(function(){
            that.planeElement.remove();
        },500)
     },100)
    }
}


// 测试：随机创建不同的飞机

setInterval(function(){
    new Plane(1);
}, random(800, 1200));

setInterval(function(){
    new Plane(2);
}, random(2000, 2500));

setInterval(function(){
    new Plane(3);
}, random(9000, 10000));
setInterval(function(){
    new Plane(4);
}, random(7000, 9000));






function random(min,max){
    return Math.round(Math.random()*(max-min) + min);
}