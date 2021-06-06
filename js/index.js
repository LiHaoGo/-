var start = document.getElementsByClassName('start')[0];
var ui = document.getElementsByClassName('ui')[0];
var btnList = document.getElementsByClassName('btnList')[0];
var logo = document.getElementById('logo');
var num = 1;
var lh = 0;
var wj = false;
var time = setInterval(function () {
    logo.style.transform = "rotateY(" + num++ + "deg)";
    if (num === 30) {
        num = num * -1;
    } else if (num === -30) {
        num = num * -1;

    }
    setTimeout(() => {
        clearInterval(time)
    }, 800);
}, 10)
start.onclick = function () {
    logo.remove();
    ui.classList.add('ui1');
    btnList.style.display = 'block';
    this.remove();
}

// 引擎
var cont = document.getElementById("box");
// 选择按钮元素
var btn1 = document.getElementById("btn1");
var btn2 = document.getElementById("btn2");
var btn3 = document.getElementById("btn3");
var btn4 = document.getElementById("btn4");
var loading_ = document.getElementsByClassName('loading')[0];
var number = document.getElementsByClassName('number')[0];
var move = document.getElementsByClassName('move')[0];
var fight = document.getElementsByClassName('fight')[0];
// 给按钮添加点击事件
// 点击时传入不同的难度等级
btn1.onclick = function () {
    loading(1)
}
btn2.onclick = function () {
    loading(2)
}
btn3.onclick = function () {
    loading(3)
}
btn4.onclick = function () {
    loading(4)
}

// 加载logo和loading效果
function loading(type) {
    // 删除所有按钮
    btn1.remove();
    btn2.remove();
    btn3.remove();
    btn4.remove();
    cont.classList.remove('cont');
    ui.remove();
    loading_.style.display = "block";
    // 背景图运动，模拟飞行效果
    var y = 0;
    setInterval(function () {
        cont.style.backgroundPositionY = y++ + "px";
    }, 30);
    var q = 1;
    var j = 0;
    var timer = setInterval(function () {

        number.innerHTML = j++;
        if (j > 100) {
            clearInterval(timer)
        }
    }, 100)
    var time = setInterval(function () {
        move.style.width = q++ + "px";
        console.log(move);
        
        if (q > 300) {
            clearInterval(time);
            document.getElementsByClassName('score')[0].style.display = 'block';
            gameStart(type);
            var z = 0;
            var x = setInterval(() => {
                fight.style.opacity = z++/10 ;
                if (z >= 10) {
                    clearInterval(x);
                    var k = 10;
                    var w = setInterval(() => {
                        fight.style.opacity = k--/10 ;
                        if (z <= 0) {
                            clearInterval(w);
                        }
                    }, 100);
                }

            }, 100);

            loading_.remove();
        }
    }, 10);

}

// 游戏开始
function gameStart(type) {
    console.log(type);
    // 创建我的飞机
    myPlane.create();
    // 我的飞机开火
    myPlane.fire(type);
    // 随机创建小敌机
    setInterval(function () {
        new Plane(1);
    }, random(1500, 3000));
    // 随机创建中敌机
    setInterval(function () {
        new Plane(2);
    }, random(3000, 5000));
    // 随机创建大敌机
    setInterval(function () {
        new Plane(3);
    }, random(10000, 20000));
    setTimeout(function () {
        new Plane(4);
    }, 2000);
}

// 我的飞机
var myPlane = {
    create() {
        // 选择
        this.contElement = document.getElementById("box");
        // 创建我的飞机
        this.meElement = document.createElement("div");
        this.meElement.className = "me";
        this.contElement.appendChild(this.meElement);

        // 计算我的飞机的最大的left
        this.maxLeft = this.contElement.offsetWidth - this.meElement.offsetWidth;
        this.maxTop = this.contElement.offsetHeight - this.meElement.offsetHeight;

        // 初始位置：最下方的中间
        this.meElement.style.top = this.maxTop + "px";
        this.meElement.style.left = this.contElement.offsetWidth / 2 - this.meElement.offsetWidth / 2 + "px";
        document.getElementsByClassName('shield')[0].style.left = this.contElement.offsetWidth / 2 - this.meElement.offsetWidth / 2 + "px";
        document.getElementsByClassName('shield')[0].style.top = this.maxTop + "px";
        this.addEvent();
    },
    addEvent() {
        var that = this;
        // 为了游戏体验，给整个网页添加移动事件
        document.onmousemove = function (e) {
            // 提前计算我的飞机的位置
            var l = e.pageX - that.meElement.offsetWidth / 2 - that.contElement.offsetLeft;
            var t = e.pageY - that.meElement.offsetHeight / 2;

            // 对我的飞机的位置进行边界限定
            // 右
            if (l > that.maxLeft) {
                l = that.maxLeft
            }
            // 左
            if (l < 0) {
                l = 0
            }
            // 上
            if (t < 0) {
                t = 0
            }

            // 将边界限定后的位置，设置给我的飞机
            that.meElement.style.left = l + "px";
            that.meElement.style.top = t + "px";
            document.getElementsByClassName('shield')[0].style.left = l - 20 + 'px';
            document.getElementsByClassName('shield')[0].style.top = t - 40 + 'px';
        }
    },
    die() {

        // 为了游戏体验，当飞机要爆炸了，就不能再跟着鼠标走了
        document.onmousemove = null;

        document.getElementsByClassName('score')[0].style.display = "none";
        document.getElementById('lastScore').innerHTML = lh;
        console.log(lh)
        document.getElementsByClassName('bg_title')[0].style.display = "block";
        document.getElementsByClassName('people')[0].style.display = "block";
        var that = this;

        that.meElement.style.backgroundImage = "url(images/boom.gif)";
        setTimeout(function () {
            that.meElement.remove();

            if (confirm("game over, 是否重新开始")) {
                window.location.reload();
            } else {
                close();
            }
        }, 1000)
    },
    fire(type) {
        var that = this;
        that.t = setInterval(function () {
            // 创建子弹对象
            var b = new Bullet();
            // 将子弹对象保存到我的飞机对象身上的一个数组属性内
            that.bullets.push(b);
        }, 1000 / type);
    },
    bullets: []
}

// 子弹
class Bullet {
    constructor() {
        // 选择容器
        this.cont = document.getElementById("box");
        // 创建子弹元素
        this.bulletEle = document.createElement("div");
        this.bulletEle.className = "bullet";
        this.cont.appendChild(this.bulletEle);
        // 设置子弹的初始位置
        this.bulletEle.style.left = myPlane.meElement.offsetLeft + myPlane.meElement.offsetWidth / 2 - this.bulletEle.offsetWidth / 2 + "px";

        this.bulletEle.style.top = myPlane.meElement.offsetTop - this.bulletEle.offsetHeight + "px";
        // 开始运动
        this.move();
    }
    move() {
        var that = this;
        // 开启计时器
        var t = setInterval(function () {
            // 判断是否到顶
            if (that.bulletEle.offsetTop < 0) {
                // 停止计时器
                clearInterval(t);
                // 让子弹爆炸
                that.die();
            } else {
                // 持续向上运动
                that.bulletEle.style.top = that.bulletEle.offsetTop - 5 + "px";
            }
        }, 30);
    }
    die() {
        // 子弹爆炸
        var that = this;
        clearInterval(that.t);
        // 将当前这个子弹对象，从子弹数组中删除
        for (var i = 0; i < myPlane.bullets.length; i++) {
            if (myPlane.bullets[i].bulletEle === this.bulletEle) {
                myPlane.bullets.splice(i, 1);
                break;
            }
        }
        // 切换成子弹爆炸的样式
        // that.bulletEle.className = "bullet_die";
        that.bulletEle.style.backgroundImage = "url(images/boom.png)";
        setTimeout(function () {
            that.bulletEle.remove();
        }, 100)
    }
}

// 敌机
class Plane {
    constructor(type) {
        this.type = type;
        // 根据不同的飞机的类型，样式和速度不一样的，单独判断
        if (this.type === 1) {
            this.size = "plane1";
            this.speed = 3;
            this.target = 4;
            this.hp = 1;
        } else if (type === 2) {
            this.size = "plane2";
            this.speed = 2;
            this.target = 5;
            this.hp = 3;
        } else if (type === 3) {
            this.size = "plane3";
            this.speed = 1;
            this.target = 7;
            this.hp = 7;
        } else {
            this.size = "shieldRed";
            this.speed = 1;
            this.target = 1;
            this.hp = 1;
        }

        // 创建
        this.planeElement = document.createElement("div");
        // 选择
        this.contELement = document.getElementById("box");
        // 插入
        this.contELement.appendChild(this.planeElement);
        // 设置元素的样式
        this.planeElement.className = this.size;
        // 设置初始的top
        this.planeElement.style.top = -this.planeElement.offsetHeight + "px";
        // 设置随机的left
        this.planeElement.style.left = random(0, this.contELement.offsetWidth - this.planeElement.offsetWidth) + "px";

        this.move();
    }
    die() {
        var that = this;
        if (that.planeElement.className === "plane1") {
            lh = lh + 300;
        } else if (that.planeElement.className === "plane2") {
            lh = lh + 600;
        } else if (that.planeElement.className === "plane3") {
            lh = lh + 900;
        } else if (that.planeElement.className === "shieldRed") {
            document.getElementsByClassName('shield')[0].style.opacity = 1;
            document.getElementsByClassName('shield2')[0].style.display = 'block';
            setTimeout(function () {
                document.getElementsByClassName('shield2')[0].style.display = 'none';
            }, 1000)
            wj = true;
            setTimeout(function () {
                document.getElementsByClassName('shield')[0].style.backgroundImage = "url(images/shield3.png)";
            }, 2000)
            setTimeout(function () {
                document.getElementsByClassName('shield')[0].style.opacity = 0;
            }, 4000)

        }

        document.getElementById('score').innerHTML = lh;
        var num = 1;
        var t = setInterval(function () {
            if (num === that.target) {
                clearInterval(t);
                that.planeElement.remove();
            } else if (num < that.target - 2) {
                that.planeElement.style.backgroundImage = "url(images/boom.gif)"
            } else if (num === 1) {
                that.planeElement.style.backgroundImage = "url(images/boom.gif)"
            }
        }, 100);
        // that.planeElement.style.backgroundImage = "url(images/boom.gif)"
        setTimeout(function () {
            that.planeElement.remove();
        }, 1000)
    }
    move() {
        var that = this;
        // 开始运动
        var t = setInterval(function () {
            if (that.planeElement.offsetTop > that.contELement.offsetHeight) {
                // 运动停止
                clearInterval(t);
                // 停止之后，让飞机爆炸
                that.die();
            } else {
                // 在自身原有基础上增加
                that.planeElement.style.top = that.planeElement.offsetTop + that.speed + "px";

                // 敌机和子弹的碰撞检测
                // 获取子弹数组
                // console.log(myPlane.bullets)
                for (var i = 0; i < myPlane.bullets.length; i++) {
                    if (
                        // 左边
                        myPlane.bullets[i].bulletEle.offsetLeft + myPlane.bullets[i].bulletEle.offsetWidth > that.planeElement.offsetLeft &&
                        // 右边
                        that.planeElement.offsetLeft + that.planeElement.offsetWidth > myPlane.bullets[i].bulletEle.offsetLeft &&
                        // 上边
                        myPlane.bullets[i].bulletEle.offsetTop + myPlane.bullets[i].bulletEle.offsetHeight > that.planeElement.offsetTop &&
                        // 下边
                        that.planeElement.offsetTop + that.planeElement.offsetHeight > myPlane.bullets[i].bulletEle.offsetTop
                    ) {
                        // alert("撞到了")
                        // 子弹爆炸
                        myPlane.bullets[i].die();
                        // 敌机掉血
                        that.hp--;
                        // 血量为0，再爆炸
                        if (that.hp === 0) {
                            that.die();
                        }
                    }
                }
                // 敌机和我的飞机的碰撞检
                if (
                    // 左边
                    myPlane.meElement.offsetLeft + myPlane.meElement.offsetWidth > that.planeElement.offsetLeft &&
                    // 右边
                    that.planeElement.offsetLeft + that.planeElement.offsetWidth > myPlane.meElement.offsetLeft &&
                    // 上边
                    myPlane.meElement.offsetTop + myPlane.meElement.offsetHeight > that.planeElement.offsetTop &&
                    // 下边
                    that.planeElement.offsetTop + that.planeElement.offsetHeight > myPlane.meElement.offsetTop
                ) {
                    // 我的飞机爆炸
                    // 游戏结束的功能，在我的飞机的爆炸内部实现
                    if (!wj) {
                        document.getElementsByClassName('shield')[0].style.opacity = 0;
                        wj = false;
                    } else {
                        myPlane.die();
                    }

                    clearInterval(that.t);
                }
            }
        }, 30);
    }

}



function random(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}