var mbox=document.querySelector('.box');
var sideNavDom=document.querySelector(".sideNav");
var sidelen=sideNavDom.children.length;
var sT=document.body.scrollTop||document.documentElement.scrollTop;
sideNavDom.style="position:absolute;top:"+disTop(mbox.children[0])+"px";
for(var k=0;k<sidelen;k++){
    sideNavDom.children[k].onmouseover=function(){
        this.style.width="150px";
    }
    sideNavDom.children[k].onmouseout=function(){
        this.style.width="50px";
    }
    sideNavDom.children[k].setAttribute("disindex",k);
    sideClick(sideNavDom.children[k],mbox.children[k]);
}
//点击
function sideClick(sideBtn,content){
    sideBtn.onclick=function(){
        var sideT=disTop(this);
        if(sideNavDom.style.position=="absolute"){
            var sideT=sideT-disTop(mbox.children[0])+200;
        }
        var eleT=disTop(content)+content.clientHeight/2;
        var dis=eleT-sideT;
        var disindex=sideBtn.getAttribute("disindex");
        if(disTop(content)==0){
            var eleT=disTop(mbox.children[disindex])+mbox.children[disindex].clientHeight/2;
            var dis=eleT-sideT;
        }
        sideCss(sideBtn);
        animate(document.body,dis);
        animate(document.documentElement,dis);
    }
}
function animate(docObj,dis){
    clearInterval(docObj.id);
    docObj.id=setInterval(function(){
        var sT=docObj.scrollTop;
        var speed=(sT-dis)*.3;
        speed=speed>0?Math.ceil(speed):Math.floor(speed);
        docObj.scrollTop-=speed;
        if(docObj.scrollTop==dis){
            clearInterval(docObj.id);
            /*console.log(1);*/
        }
    },50);
}
//显示不显示
function sideCss(sideBtn){
    var btnList=sideBtn.offsetParent.children;
    for(var k=0;k<btnList.length;k++){
        btnList[k].className="";
    }
    sideBtn.className="on";
}

function disTop(ele){//求ele对象到页面顶端的距离
    return ele.offsetParent===null||ele.offsetParent===undefined||ele.offsetParent.nodeName==="BODY"?ele.offsetTop:ele.offsetTop+disTop(ele.offsetParent);
}
//滚轮
window.onscroll=function(){
    sideNavDom.style="position:fixed;top:200px;";
    var term1=(document.body.scrollTop||document.documentElement.scrollTop)>=disTop(mbox.children[0])-disTop(sideNavDom.children[0]);
    var term2=(document.body.scrollTop||document.documentElement.scrollTop)<=(disTop(mbox.children[sidelen-1])+mbox.children[sidelen-1].clientHeight)-(disTop(sideNavDom.children[sidelen-1])+sideNavDom.children[sidelen-1].clientHeight);
    if((term1)&(term2)){
        sideNavDom.style="position:fixed;top:200px;";
    }else{
        sideNavDom.style="position:absolute;top:"+disTop(mbox.children[0])+"px";
    }
    if(sideNavDom.style.position=="fixed"){
        for(var k=0;k<sidelen;k++){
            var h1=disTop(sideNavDom.children[k]),h1h=sideNavDom.children[k].clientHeight;
            var sT1=disTop(mbox.children[k])-h1;
            var sT2=sT1+(mbox.children[k].clientHeight-h1h);
            var sT=(document.body.scrollTop||document.documentElement.scrollTop)+50;
            if(sT>sT1&&sT<sT2){
                sideCss(sideNavDom.children[k]);
            }
        }
    }
    if((document.body.scrollTop||document.documentElement.scrollTop)>0){
        bigmenu.style.position="fixed";
        bigmenu.style.bottom="80px";
    }else{
        bigmenu.style.position="absolute";
        bigmenu.style.bottom=(document.body.clientHeight-80)+"px";
    }
}