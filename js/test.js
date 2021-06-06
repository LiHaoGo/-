
var contElement = document.getElementById("box");

// 创建子弹
var bulletElement = document.createElement("div");
bulletElement.className = "bullet";
contElement.appendChild(bulletElement);

bulletElement.style.left = 135 + "px";
bulletElement.style.top = 500 + "px";

setInterval(function(){
    bulletElement.style.top = bulletElement.offsetTop - 2 + "px";
},30)


// 创建敌机
var planeElement = document.createElement("div");
planeElement.className = "plane1";
contElement.appendChild(planeElement);

planeElement.style.left = 100 + "px";
planeElement.style.top = 0 + "px";

setInterval(function(){
    planeElement.style.top = planeElement.offsetTop + 2 + "px";

    // 因为飞机的存活时间比子弹要长，所以在飞机的运动过程中，进行碰撞检测
    if(
        // 左边
        bulletElement.offsetLeft + bulletElement.offsetWidth > planeElement.offsetLeft
        &&
        // 右边
        planeElement.offsetLeft + planeElement.offsetWidth > bulletElement.offsetLeft
        &&
        // 上边
        bulletElement.offsetTop + bulletElement.offsetHeight > planeElement.offsetTop
        &&
        // 下边
        planeElement.offsetTop + planeElement.offsetHeight > bulletElement.offsetTop
    ){
        alert("撞到了")
        // 子弹爆炸
        // 敌机掉血
        // 血量为0，再爆炸
    }

},30)

