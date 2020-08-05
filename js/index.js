//导航
var gr=document.getElementById("gr");
var dl=document.getElementById("dl");
var checkCode=document.getElementById("checkCode");
var check=document.getElementById("check");
var zc=document.getElementById("zc");
var grzc=document.getElementById("grzc");
var qyzc=document.getElementById("qyzc");
var dl1=document.getElementById("dl1");
var dll=document.getElementById("dll");
var dl2=document.getElementById("dl2");
var qy=document.getElementById("qy");
var kuang=document.getElementById("kuang");
var dlzc=document.getElementById("dlzc");
var dlzcc=document.getElementById("dlzcc");
var user=document.getElementById("user");
var user2=document.getElementById("user2");
var img=document.getElementById("img");
var img2=document.getElementById("img2");
var gg=document.getElementById("gg");
var qq=document.getElementById("qq");
var name1=document.getElementById("name1");
var password1=document.getElementById("pwd1");
var name2=document.getElementById("name2");
var password2=document.getElementById("pwd2");
var in1=document.getElementById("in1");
var in2=document.getElementById("in2");
var xian=document.getElementById("xian");
var logo=document.getElementById("logo");
//轮播
var btns=document.getElementById("btn").getElementsByTagName("span");
var listbox=document.getElementById("list");
var boxDom=document.getElementById("box");
var imgDoms=listbox.getElementsByTagName("li");
var points=document.getElementById("points");
var lis=points.getElementsByTagName("li");
var len=imgDoms.length;
var w=boxDom.clientWidth;
var timer;
var i=0;//图片索引
var index=0;//小圆点索引
//在线职位统计
var onLineDom=document.getElementById("onLine");
var oLis=onLineDom.getElementsByTagName("li");
//搜索
var around=document.getElementById("around");
var sou=document.getElementById("sou");
var jr=document.getElementById("jr");
var xz=document.getElementById("xz");
var xs=document.getElementById("xs");
var it=document.getElementById("it");
//友情链接
var seo=document.getElementById("seo");
var link=document.getElementById("link");
//img
var listchild=listbox.children;
//导航存放
var all=[{
        type:0,
        menu:[{label1:"首页",labelA:"index.html"},
            {label1:"找工作",labelA:"myjob.html"},
            {label1:"校园招聘",labelA:"myjob.html"}
        ]},
        {
        type:1,
        menu:[{label1:"首页",labelA:"index.html"},
            {label1:"我的易工作",labelA:"myjob.html"},
            {label1:"找工作",labelA:"myjob.html"},
            {label1:"我的投递",labelA:"myjob.html"},
            {label1:"我的收藏",labelA:"myjob.html"},
            {label1:"个人简历",labelA:"myjob.html"},
            {label1:"校园招聘",labelA:"myjob.html"}
        ]},
        {
        type:2,
        menu:[{label1:"首页",labelA:"index.html"},
            {label1:"企业中心",labelA:"myjob.html"},
            {label1:"发布职位",labelA:"myjob.html"},
            {label1:"搜索简历",labelA:"myjob.html"},
            {label1:"职位管理",labelA:"myjob.html"},
            {label1:"企业信息",labelA:"myjob.html"},
            {label1:"校园招聘",labelA:"myjob.html"}
        ]}
        ]

//---------------------导航实现-------------------------
type=0;
//注册
zc.onclick=function(){
    location.href="register.html?type=1";
}
grzc.onclick=function(){
    location.href="register.html?type=1";
}
qyzc.onclick=function(){
    location.href="register.html?type=2";
}
//验证码
function create(){
    createCode(4,checkCode);
}
window.onload=create;
checkCode.onclick=create;
reset.onclick=create;
//切换
gr=function(){
    moveTime(xian,{"right":160},function(){
        dll.style="display:none";
        dl1.style="display:block";
    });
}
qy=function(){
    moveTime(xian,{"right":0},function(){
        dl1.style="display:none";
        dll.style="display:block";
    });
}
//个人用户登录点击事件
in1.onclick=function(){
    type=1;
    sureUser();
}
//企业用户登录点击事件
in2.onclick=function(){
    type=2;
    sureUser();
}


//确认账密是否匹配
function sureUser(){
    if(type==1){
        var username=name1.value;
        var pwd=password1.value;
    }
    if(type==2){
        var username=name2.value;
        var pwd=password2.value;
    }
    ajax({
        'method':'POST',
        'url':'user_json.txt',
        'data':{
            'user':username,
            'pwd':pwd
        },
        'success':function(text){
            var json=eval(text);
            if(decodeURIComponent(location.href).split("?")[1]){
                if(decodeURIComponent(location.href).split("pwd=")[1]){
                    var URL=decodeURIComponent(location.href);
                    var typee=URL.split("type=")[1].split("&")[0];
                    var usernamee=URL.split("username=")[1].split("&")[0];
                    var pwdd=URL.split("pwd=")[1].split("&")[0];
                    var photoo=URL.split("photo=")[1].split("&")[0];
                    json.push({type:parseInt(typee),username:usernamee,pwd:pwdd,photo:photoo});
                }
            }
            var i;
            for(i=0;i<json.length;i++){
                if(type==json[i].type){
                    if(username==json[i].username && pwd==json[i].pwd){
                        if(type==2){
                            if(check.value.toUpperCase()==checkCode.innerHTML.toUpperCase()){
                                d();
                            }else{
                                alert("验证码填写错误");
                                create();
                                check.value="";
                            }
                        }
                        if(type==1){
                            d();
                        }
                        function d(){
                            dlzc.style="display:none";
                            dlzcc.style="display:block";
                            dl1.style="display:none";
                            dll.style="display:none";
                            dl2.style="display:block";
                            xian.style="display:none";
                            user.innerHTML=username;
                            user2.innerHTML=username;
                            img.src=json[i].photo;
                            img2.src=json[i].photo;
                            daohang=sureMenu();
                            type=json[i].type;
                            fill(daohang,username,type,json[i].photo);
                            alert("登录成功");
                            location.href="index.html?username="+username+"&type="+type+"&photo="+json[i].photo;
                        }
                        return;
                    }
                }
            }
            if(i==json.length){
                alert("登录失败，账号不存在或密码有误");
            }
        },
        /*'error':function(){
            alert("error!");
        }*/
    });
}

function sureMenu(){
    for(var i=0;i<all.length;i++){
        if(type==all[i].type){
            return all[i].menu;
        }
    }
}
function fill(daohang,username,type,photo){
    var str="";
    for(var i=0;i<daohang.length;i++){
        str+="<a href='"+daohang[i].labelA+"?username="+username+"&type="+type+"&photo="+photo+"'>"+daohang[i].label1+"</a>";
    }
    if(type==0){
        dlzc.style="display:block";
        dlzcc.style="display:none";
    }
    navv.innerHTML=str;
    logo.onclick=function(){
        location.href="index.html?username="+username+"&type="+type+"&photo="+photo;
    }
}
daohang=sureMenu();
fill(daohang,"",0);


//---------------------轮播实现-------------------------
var sT=new Date();
for(var k=0;k<btns.length;k++){
    btns[k].index=k;    //自定义属性index存放k索引值
    btns[k].onclick=function(){
        var endT=new Date();
        if(endT-sT>400){
            if(this.index){  //右按钮
                auto();
            }else{  //左按钮
                btnLeft();
            }
            sT=new Date();
        }
    }
}
//左按钮
function btnLeft(){
    i--;
    if(i==-1){
        imgDoms[len-1].style.position="relative";
        imgDoms[len-1].style.left=-w*len+"px";
        moveTime(listbox,{"left":-w*i},function(){
            imgDoms[len-1].style.position="static";
            i=len-1;
            listbox.style.left=-i*w+"px";
        });
    }else{
        moveTime(listbox,{"left":-w*i});
    }
    leftp();
}
//小圆点
function btnShow(){
    for(var j=0;j<lis.length;j++){
        lis[j].className="";
    }
    lis[index].className='on';
}
//小圆点点击事件
for(var j=0;j<lis.length;j++){
    lis[j].index=j;
    lis[j].onclick=function(){
        i=this.index;
        moveTime(listbox,{left:(-w*i)});
        index=this.index;
        btnShow();
    }
}
function rightp(){
    index+=1;
    if(index>len-1){index=0;}
    btnShow();
}
function leftp(){
    index-=1;
    if(index<0){index=len-1;}
    btnShow();
}
//右按钮及轮播
function auto(){
    i++;
    if(i==len){
        imgDoms[0].style.position="relative";
        imgDoms[0].style.left=w*len+"px";
        moveTime(listbox,{left:(-i*w)},function(){
            imgDoms[0].style.position="static";
            i=0;
            listbox.style.left=-i*w+"px";
        });
    }else{
        moveTime(listbox,{left:-i*w});
    }
    rightp();
}
timer=setInterval(function(){auto()},800);
function play(){
    timer=setInterval(function(){auto()},800);
}
function stop(){
    clearInterval(timer);
}
boxDom.onmouseover=stop;
boxDom.onmouseout=play;
if (document.addEventListener){//ie
    document.addEventListener('msvisibilitychange',function(){
        if(document.msVisibilityState=='hidden'){
            clearInterval(timer);
        }else{
            timer=setInterval(function(){auto()},800);
        }
    });
};
if (document.addEventListener){ //火狐
    document.addEventListener('mozvisibilitychange',function(){
        if(document.mozVisibilityState=='hidden'){
            clearInterval(timer);
        }else{
            timer=setInterval(function(){auto()},800);
        }
    });
};
if (document.addEventListener){//google等
    document.addEventListener('webkitvisibilitychange',function(){
        if(document.webkitVisibilityState=='hidden'){
            clearInterval(timer);
        }else{
            timer=setInterval(function(){auto()},800);
        }
    });
};
/*window.addEventListener("visibilitychange",function(){
    if(document.hidden==true){
        clearInterval(timer);
    }else{
        timer=setInterval(function(){auto()},800);
    }
});*/

//-----------------在线职位统计实现---------------------
var time0=new Date();
var hours0=time0.getHours();
var minutes0=time0.getMinutes();
var seconds0=time0.getSeconds();
var str0=zero(hours0)+zero(minutes0)+zero(seconds0);
for(var j=0;j<oLis.length;j++){
    // console.log(j+":");
    var imgg=oLis[j].getElementsByTagName("img");
    imgg[0].index=str0.charAt(j);
    imgg[0].src="Jobeasyimages/Statistics/"+str0.charAt(j)+".png";
    playy(oLis[j],j);//第i个li作为传递参数
}
function playy(oli,j){
    var num=0;//可见区图片的索引
    setInterval(function(){
        var time1=new Date();
        var hours1=time1.getHours();
        var minutes1=time1.getMinutes();
        var seconds1=time1.getSeconds();
        var str1=zero(hours1)+zero(minutes1)+zero(seconds1);
        var imgg=oli.getElementsByTagName("img");
        if(str1.charAt(j)!=imgg[num].index){
            //三步：1、等待区的i位置的图片换成str1对应位置数字图片，同步定义属性
            //      2、可见区图片往上走
            //      3、等待区的图片上去，完全到达可见区后，将2中上的图片拉回等待区
            moveTime(imgg[num],{"top":-50});
            if(num==0){
                imgg[1].index=str1.charAt(j);
                imgg[1].src="Jobeasyimages/Statistics/"+str1.charAt(j)+".png";
                moveTime(imgg[1],{"top":0},function(){//运动到可见区
                    imgg[num].style.top="50px";
                    num=1;
                });
            }else if(num==1){
                imgg[0].index=str1.charAt(j);
                imgg[0].src="Jobeasyimages/Statistics/"+str1.charAt(j)+".png";
                moveTime(imgg[0],{"top":0},function(){//运动到可见区
                    imgg[num].style.top="50px";
                    num=0;
                });
            }
        }
    },1000);
}
function zero(num){
    return num>=10?""+num:"0"+num;
}

if(decodeURIComponent(location.href).split("?")[1]){
    if(!decodeURIComponent(location.href).split("pwd=")[1]){
        var URL=decodeURIComponent(location.href);
        type=parseInt(URL.split("type=")[1].split("&")[0]);
        var username=URL.split("username=")[1].split("&")[0];
        var photo=URL.split("photo=")[1];
        dlzc.style="display:none";
        dlzcc.style="display:block";
        if(type!=0){
            dl1.style="display:none";
            dll.style="display:none";
            dl2.style="display:block";
            xian.style="display:none";
        }
        user.innerHTML=username;
        user2.innerHTML=username;
        if(photo!="undefined"){
            img.src=photo;
            img2.src=photo;
        }
        daohang=sureMenu();
        fill(daohang,username,type,photo);
    }
}

//-------------------img------------------------
for(var j=0;j<listchild.length;j++){
    get(j);
}
function get(j){
    listchild[j].children[0].onclick=function(){
        if(decodeURIComponent(location.href).split("?")[1]){
            if(!decodeURIComponent(location.href).split("pwd=")[1]){
               this.href="img.html?img="+j+"&username="+username+"&photo="+photo+"&type="+type;
           }
        }else{
            this.href="img.html?img="+j+"&type="+type;
        }
    }
}


//--------------------搜索----------------------
sou.onclick=function(){
    location.href="result.html?name="+around.value+"&type="+type;
}
jr.onclick=function(){
    this.href="result.html?name=金融&type="+type;
}
xz.onclick=function(){
    this.href="result.html?name=行政&type="+type;
}
xs.onclick=function(){
    this.href="result.html?name=销售&type="+type;
}
it.onclick=function(){
    this.href="result.html?name=IT产业&type="+type;
}
if(decodeURIComponent(location.href).split("?")[1]){
    if(!decodeURIComponent(location.href).split("pwd=")[1]){
        sou.onclick=function(){
            location.href="result.html?name="+around.value+"&username="+username+"&photo="+photo+"&type="+type;
        }
        jr.onclick=function(){
            this.href="result.html?name=金融&username="+username+"&photo="+photo+"&type="+type;
        }
        xz.onclick=function(){
            this.href="result.html?name=行政&username="+username+"&photo="+photo+"&type="+type;
        }
        xs.onclick=function(){
            this.href="result.html?name=销售&username="+username+"&photo="+photo+"&type="+type;
        }
        it.onclick=function(){
            this.href="result.html?name=IT产业&username="+username+"&photo="+photo+"&type="+type;
        }
    }
}

//-----------------------模块铺设-----------------------
var mbox=document.querySelector('.box');
var mchildren=document.getElementById('mchildren');
var mukuai=mbox.childNodes;
var tmp = [];
var tmp2 = [];
var strr="";
ajax({
    'method':'POST',
    'url':'trade_json.txt',
    'data':{
    },
    'success':function(text){
        var json=eval(text);
        var str="";

        var str2="";
        for(var i in json){
            if(tmp.indexOf(json[i].trade)==-1){
                tmp.push(json[i].trade);
            }

        }

        for(var i in tmp){
            str+='<div class="mukuai"><div class="container"><div class="left"><h1>'+tmp[i]+'</h1><div class="zhiwei"></div></div><div class="right"></div></div></div>';
        }
        mbox.innerHTML=str;
        for(var k=0;k<mukuai.length;k++){
            var mcontainer=mukuai[k].firstChild;
            var mleft=mcontainer.firstChild;
            var mright=mcontainer.lastChild;
            var mh1=mleft.firstChild;
            var mzhiwei=mleft.lastChild;

            for(var j in json){
                if(mh1.innerHTML==json[j].trade){
                    if(tmp2.indexOf(json[j].location)==-1){
                        tmp2.push(json[j].location);
                    }
                }
            }
            strr="";
            strr+="<div class='span'></div>";
             for(var x in tmp2){
                strr+="<p>"+tmp2[x]+"</p>";
            }

            tmp2=[];
            str2="";
            for(var y in json){
                if(mh1.innerHTML==json[y].trade){
                    str2+='<div class="small"><img src="'+json[y].img+'"><div class="imfor"><p>'+json[y].job+'</p><p>'+json[y].company+'</p><a href="">'+json[y].span+'</a></div><div class="location"><img src="Jobeasyimages/location.png">'+json[y].adress+'</div></div>';
                }
            }
            mzhiwei.innerHTML=strr;
            mright.innerHTML=str2;
        }
    }
});

//--------------------友情链接展开收起------------------
var links=0;
var icon=document.querySelector('#icon');
link.onclick=function(){
    if(links%2==0){
        link.value="展开";
        icon.className="icon on";
        seo.style="height:30px;transition:height 0.5s ease-in;";
    }else{
        link.value="收起";
        icon.className="icon";
        seo.style="height:100px;transition:height 0.5s ease-in;";
    }
    links++;
}

//-----------------------右侧菜单-----------------------
var bigmenu=document.querySelector('.menu');
var rightmenu=bigmenu.children;
for(var r=0;r<rightmenu.length;r++){
    rightmenu[r].onmouseover=function(){
        this.className="one on";
    }
    rightmenu[r].onmouseout=function(){
        this.className="one";
    }
}
rightmenu[rightmenu.length-1].onclick=function(){
    var dis=0;
    animate(document.body,dis);
    animate(document.documentElement,dis);
}
bigmenu.style.position="absolute";
bigmenu.style.bottom=(document.body.clientHeight-80)+"px";

//-----------------------底部导航-----------------------
var easyjob=document.querySelector('.easyjob');
var bottomeasyjob=document.querySelector('.bottomeasyjob');
var close=document.querySelector('#close');
easyjob.onclick=function(){
    moveTime(easyjob,{"left":-easyjob.clientWidth},550);
    moveTime(bottomeasyjob,{"bottom":0},550);
}
close.onclick=function(){
    moveTime(easyjob,{"left":0},550);
    moveTime(bottomeasyjob,{"bottom":-bottomeasyjob.clientHeight},550);
}
