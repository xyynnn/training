var dlzc=document.getElementById("dlzc");
var dlzcc=document.getElementById("dlzcc");
var user=document.getElementById("user");
var img=document.getElementById("img");
var around=document.getElementById("around");
var sou=document.getElementById("sou");
var store=document.getElementById("store");
var count=document.getElementById("count");
var hy=document.getElementById("hy");
var zn=document.getElementById("zn");
var gzdd=document.getElementById("gzdd");
var qyxz=document.getElementById("qyxz");
var hymz=document.getElementById("hymz");
var xzzn=document.getElementById("xzzn");
var dd=document.getElementById("dd");
var qy=document.getElementById("qy");
var trade=document.getElementById("trade");
var intel=document.getElementById("intel");
var made=document.getElementById("made");
var qiye=document.getElementById("qiye");
var logo=document.getElementById("logo");
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
var type=window.location.href.split("&type=")[1];
daohang=sureMenu();
if(parseInt(type)==0){
    fill(daohang,"",parseInt(type));
}else{
    if(window.location.href.split("&username=")[1] && window.location.href.split("&photo=")[1]){
        var username=window.location.href.split("&username=")[1].split("&")[0];
        var photo=window.location.href.split("&photo=")[1].split("&")[0];
        dlzc.style="display:none";
        dlzcc.style="display:block";
        user.innerHTML=username;
        img.src=photo;
        daohang=sureMenu();
        fill(daohang,username,parseInt(type));
    }
}
function sureMenu(){
    for(var i=0;i<all.length;i++){
        if(type==all[i].type){
            return all[i].menu;
        }
    }
}
function fill(daohang,username,type){
    if(window.location.href.split("&photo=")[1]){
        var photo=window.location.href.split("&photo=")[1].split("&")[0];
    }
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

//
sou.onclick=function(){
    var url=decodeURIComponent(location.href).split("?")[0];
    if(decodeURIComponent(location.href).split("username=")[1]){
        var other=decodeURIComponent(location.href).split("username=")[1];
        location.replace(url+"?name="+around.value+"&username="+other);
    }else{
        var other=decodeURIComponent(location.href).split("&")[1];
        location.replace(url+"?name="+around.value+"&"+other);
    }
    a();
}

var tiaojian=decodeURIComponent(location.href).split("name=")[1].split("&")[0];
around.value=tiaojian;
var fenreg=/\s+/;
if(fenreg.test(tiaojian)){
    var r=tiaojian.split(fenreg);
    var tiaojian='';
    for(var j in r){
        tiaojian+=r[j]+'|';
    }
    tiaojian=tiaojian.substr(0, tiaojian.length - 1);
}
var reg=new RegExp(tiaojian);
var sT=new Date();
trade.onclick=function(){
    var endT=new Date();
    if(endT-sT>500){
        span(trade);
        sT=new Date();
    }
}
intel.onclick=function(){
    var endT=new Date();
    if(endT-sT>500){
        span(intel);
        sT=new Date();
    }
}
made.onclick=function(){
    var endT=new Date();
    if(endT-sT>500){
        span(made);
        sT=new Date();
    }
}
qiye.onclick=function(){
    var endT=new Date();
    if(endT-sT>500){
        span(qiye);
        sT=new Date();
    }
}
a();
function a(){
    ajax({
        'method':'get',
        'url':'result_json.txt',
        'data':{
            'name':tiaojian,
        },
        'success':function(text){
            var json=eval(text);
            var z=0;
            var z2=0;
            var z3=0;
            var z4=0;
            var str="";
            var str2="";
            var str3="";
            var str4="";
            var hystr="";
            var znstr="";
            var gzddstr="";
            var qyxzstr="";
            for(var i=0;i<json.length;i++){
                if(reg.test(json[i].job)||reg.test(json[i].company)){
                    z++;
                    str+='<ul class="two"><li>'+json[i].job+'<span>'+json[i].span+'</span></li><li>'+json[i].company+'</li><li><img src="Jobeasyimages/location.png" alt="">'+json[i].adress+'</li><li>'+json[i].time+'</li><li>面议</li></ul>';
                }
                if(xzzn.innerHTML==json[i].job){
                    tiaojian=xzzn.innerHTML;
                    z2++;
                    str2+='<ul class="two"><li>'+json[i].job+'<span>'+json[i].span+'</span></li><li>'+json[i].company+'</li><li><img src="Jobeasyimages/location.png" alt="">'+json[i].adress+'</li><li>'+json[i].time+'</li><li>面议</li></ul>';
                }
                if((dd.innerHTML==json[i].adress&&reg.test(json[i].job))||(dd.innerHTML==json[i].adress&&reg.test(json[i].company))){
                    tiaojian=dd.innerHTML;
                    z3++;
                    str3+='<ul class="two"><li>'+json[i].job+'<span>'+json[i].span+'</span></li><li>'+json[i].company+'</li><li><img src="Jobeasyimages/location.png" alt="">'+json[i].adress+'</li><li>'+json[i].time+'</li><li>面议</li></ul>';
                }
                if((qy.innerHTML==json[i].nature&&reg.test(json[i].job))||(qy.innerHTML==json[i].nature&&reg.test(json[i].company))){
                    z4++;
                    str4+='<ul class="two"><li>'+json[i].job+'<span>'+json[i].span+'</span></li><li>'+json[i].company+'</li><li><img src="Jobeasyimages/location.png" alt="">'+json[i].adress+'</li><li>'+json[i].time+'</li><li>面议</li></ul>';
                }
            }
            var tmp = new Array();
            var tmp2 = new Array();
            var tmp3 = new Array();
            var tmp4 = new Array();
            for(var i in json){
                if(tmp.indexOf(json[i].trade)==-1){
                    tmp.push(json[i].trade);
                }
                if(hymz.innerHTML==json[i].trade){
                    if(tmp2.indexOf(json[i].job)==-1){
                        tmp2.push(json[i].job);
                    }
                }
                if(tmp3.indexOf(json[i].adress)==-1){
                    tmp3.push(json[i].adress);
                }
                if(tmp4.indexOf(json[i].nature)==-1){
                    tmp4.push(json[i].nature);
                }
            }
            for(var i in tmp){
                hystr+='<li>'+tmp[i]+'</li>';
            }
            for(var i in tmp2){
                znstr+='<li>'+tmp2[i]+'</li>';
            }
            for(var i in tmp3){
                gzddstr+='<li>'+tmp3[i]+'</li>';
            }
            for(var i in tmp4){
                qyxzstr+='<li>'+tmp4[i]+'</li>';
            }
            if(tiaojian){
                var regg=/\|/;
                if(regg.test(tiaojian)){
                    var r=tiaojian.split(regg);
                    for(var j in r){
                        var reg2=new RegExp(r[j],"g");
                        str=str.replace(reg2,"<font class='font' color='red'>"+r[j]+"</font>");
                        str4=str4.replace(reg2,"<font class='font' color='red'>"+r[j]+"</font>");
                    }
                }else{
                    var reg2=new RegExp(tiaojian,"g");
                    str=str.replace(reg2,"<font class='font' color='red'>"+tiaojian+"</font>");
                    str4=str4.replace(reg2,"<font class='font' color='red'>"+tiaojian+"</font>");
                }
                var reg2=new RegExp(tiaojian,"g");
                str2=str2.replace(reg2,"<font class='font' color='red'>"+tiaojian+"</font>");
                str3=str3.replace(reg2,"<font class='font' color='red'>"+tiaojian+"</font>");
            }
            if(xzzn.innerHTML!="选择职能"){
                count.innerHTML=z2;
                store.innerHTML=str2;
            }else if(dd.innerHTML!="工作地点"){
                count.innerHTML=z3;
                store.innerHTML=str3;
            }else if(qy.innerHTML!="企业性质"){
                count.innerHTML=z4;
                store.innerHTML=str4;
            }else{
                count.innerHTML=z;
                store.innerHTML=str;
            }
            hy.innerHTML=hystr;
            if(hymz.innerHTML=="选择行业"){
                zn.innerHTML="请先选择行业";
            }else{
                zn.innerHTML=znstr;
            }
            gzdd.innerHTML=gzddstr;
            qyxz.innerHTML=qyxzstr;
            goPage(1,10);
        }
    });
}
var c=0;
function span(b){
    var xz=b.firstElementChild;
    var bqi=xz.firstElementChild;
    var span=bqi.nextElementSibling;
    var ul=xz.lastElementChild;
    var imgdown=ul.previousSibling;
    var newimg=imgdown.previousSibling;
    var li=ul.childNodes;
    var lih=xz.clientHeight;
    if(c%2==0){
        if(b==made || b==qiye){
            newimg.src="Jobeasyimages/search/re_02.png";
        }else{
            span.innerHTML="-";
        }
        for(var i=0;i<li.length;i++){
            xz.style="transition:height 0.5s ease-in;height:"+[(i+2)*(lih+2)-2]+"px";
            li[i].onclick=function(){
                bqi.innerHTML=this.innerHTML;
                a();
            }
        }
    }else{
        if(b==made || b==qiye){
            newimg.src="Jobeasyimages/search/re_01.png";
        }else{
            span.innerHTML="+";
        }
        for(var i=0;i<li.length;i++){
            xz.style="transition:height 0.5s ease-in;height:40px";
        }
    }
    c++;
}

function goPage(pno,psize){
    var num = store.childNodes.length;
    var totalPage = 0;//总页数
    var pageSize = psize;//每页显示行数
    if(num/pageSize > parseInt(num/pageSize)){
            totalPage=parseInt(num/pageSize)+1;
       }else{
           totalPage=parseInt(num/pageSize);
       }
    var currentPage = pno;//当前页数
    var startRow = (currentPage - 1) * pageSize+1;//开始显示的行
       var endRow = currentPage * pageSize;//结束显示的行
       endRow = (endRow > num)? num : endRow;
       //遍历显示数据实现分页
    for(var i=1;i<(num+1);i++){
        var irow = store.childNodes[i-1];
        if(i>=startRow && i<=endRow){
            irow.style.display = "block";
        }else{
            irow.style.display = "none";
        }
    }
    var pageEnd = document.getElementById("pageEnd");
    var tempStr = "当前第"+currentPage+"页 共"+totalPage+"页";
    if(currentPage>1){
        tempStr += " &nbsp; &nbsp; <a style='color:#08a3f3' href='' onclick='goPage("+(1)+","+psize+");return false;'>首页</a>";
        tempStr += "&nbsp;<a style='color:#08a3f3' href='' onclick='goPage("+(currentPage-1)+","+psize+");return false;'><上一页</a>"
    }else{
        tempStr += " &nbsp; &nbsp; 首页";
        tempStr += "&nbsp;<上一页";
    }

    if(currentPage<totalPage){
        tempStr += "&nbsp;<a style='color:#08a3f3' href='' onclick='goPage("+(currentPage+1)+","+psize+");return false;'>下一页></a>";
        tempStr += "&nbsp;<a style='color:#08a3f3' href='' onclick='goPage("+(totalPage)+","+psize+");return false;'>尾页</a>";
    }else{
        tempStr += "&nbsp;下一页>";
        tempStr += "&nbsp;尾页";
    }
    document.getElementById("barcon").innerHTML = tempStr;
}