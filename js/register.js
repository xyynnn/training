var point=document.getElementById("point");
var zhuce=document.getElementById("zhuce");
var zhuce2=document.getElementById("zhuce2");
var uploadFile=document.getElementById("uploadFile");
var changepic=document.getElementById("changepic");
var uploadFile2=document.getElementById("uploadFile2");
var changepic2=document.getElementById("changepic2");
var phoneval=document.getElementById("phoneval");
var psdval=document.getElementById("psdval");
var postval=document.getElementById("postval");
var ppsdval=document.getElementById("ppsdval");
var logon=document.getElementById("logon");
var logon2=document.getElementById("logon2");
var agree=document.getElementById("agree");
var agree2=document.getElementById("agree2");
var agreement=document.getElementById("agreement");
var agreement2=document.getElementById("agreement2");
var bigbox=document.getElementById("bigbox");
var bg=document.getElementById("bg");
var close=document.getElementById("close");
var append=document.getElementById("append");
var put=document.getElementById("put");
var picyzm=document.getElementById("picyzm");
var phoneyzm=document.getElementById("phoneyzm");
var reset=document.getElementById("reset");
var checkCode=document.getElementById("checkCode");
//手机邮箱切换
phone=function(){
    moveTime(point,{"left":115},function(){
        zhuce2.style="display:none";
        zhuce.style="display:block";
    });
}
post=function(){
    moveTime(point,{"left":365},function(){
        zhuce.style="display:none";
        zhuce2.style="display:block";
    });
}


//上传头像
var imgStr = /\.(jpg|jpeg|png|bmp|BMP|JPG|PNG|JPEG)$/;
uploadFile.onchange=function(){upload(uploadFile,changepic)};
uploadFile2.onchange=function(){upload(uploadFile2,changepic2)};
var src;
function upload(up,pic){
    if(!imgStr.test(up.files[0].name)) {
        up.value="";
        alert("文件不是图片类型，请重新上传");
        pic.src="Jobeasyimages/user_photo/user_photo.png";
    }else{
        var oFReader = new FileReader();
        oFReader.readAsDataURL(up.files[0]);
        oFReader.onloadend = function(oFRevent){
            src = oFRevent.target.result;
            pic.src=src;
        }
    }
}

//协议
agree.onclick=function(){agrees(agree)};
agree2.onclick=function(){agrees(agree2)};
function agrees(agree){
    if(agree.className=="agree"){
        agree.className="";
    }else{
        agree.className="agree";
    }
}
bg.style.width=document.body.clientWidth+"px";
bg.style.height=(document.body.clientHeight+50)+"px";
var ar=0;
agreement.onclick=function(){aggreement();ar=1;return false;};
agreement2.onclick=function(){aggreement();ar=2;return false;};
function aggreement(){
    bigbox.style="display:block";
}
close.onclick=function(){
    bigbox.style="display:none";
}
append.onclick=function(){
    bigbox.style="display:none";
    if(ar==1){
        agree.className="agree";
    }else{
        agree2.className="agree";
    }
}

//图片验证码
function create(){
    createCode(4,checkCode);
}
window.onload=create;
checkCode.onclick=create;
reset.onclick=create;

//获取短信验证码
put.onclick=function(){
    put.style.background="grey";
    var miao=30;
    put.value="30秒后重发";
    put.disabled="false";
    puttime=setInterval(function(){
        miao--;
        put.value=miao+"秒后重发";
        if(miao==0){
            clearInterval(puttime);
            put.style.background="#0aa5f5";
            put.value="获取验证码";
            put.disabled="";
        }
    },1000);
}

//验证
var phonereg=/^1[3-9]\d{9}$/;
var psdreg=/^(?=[a-zA-Z0-9]*\d)(?=[a-zA-Z0-9]*[a-z])(?=[a-zA-Z0-9]*[A-Z])[a-zA-Z0-9]{6,16}$/;
var emreg=/^\w+@(qq|163|sina|126|vip.sina|hotmail|gmail)+\.com$/;
function check(val,reg,e){
    var ev=window.event||e;
    var one=val.parentNode;//得到父节点
    var msg=one.lastElementChild;
    var vall=val.value;
    if(ev){
        if(ev.type=='focus'){//得到焦点事件
            if(vall.length==0){
                if(val==phoneval){
                    msg.innerHTML="请输入11位手机号码！";
                }else if(val==postval){
                    msg.innerHTML="请输入邮箱！";
                }else{
                    msg.innerHTML="请输入6-16位数字及字母，且必须包含一个大写以及一个小写！";
                }
                val.style="border:1px solid red;";
                return false;
            }
        }
        if(ev.type=='blur'){//失去焦点事件
            if(vall.length==0){
                val.style="border:1px solid #999;";
                msg.innerHTML="";
                return false;
            }
        }
        if(vall.length==0){
            if(val==phoneval){
                msg.innerHTML="请输入11位手机号码！";
            }else if(val==postval){
                msg.innerHTML="请输入邮箱！";
            }else{
                msg.innerHTML="请输入6-16位数字及字母，且必须包含一个大写以及一个小写！";
            }
            val.style="border:1px solid red;";
            return false;
        }else{
            if(reg.test(vall)==true){
                msg.innerHTML="";
                val.style="border:1px solid #999;";
                return true;
            }else{
                if(val==phoneval){
                    msg.innerHTML="手机号格式错误，只支持11位手机号码";
                }else if(val==postval){
                    msg.innerHTML="邮箱格式错误，只支持正确的邮箱格式";
                }else{
                    msg.innerHTML="密码格式错误，只支持数字及字母，长度6-16位且必须包含一个大写以及一个小写！";
                }
                val.style="border:1px solid red;";
                return false;
            }
            return true;
        }
    }
}
phoneval.onfocus=function(){check(phoneval,phonereg)};
phoneval.onblur=function(){check(phoneval,phonereg)};
phoneval.onkeyup=function(){check(phoneval,phonereg)};
psdval.onfocus=function(){check(psdval,psdreg)};
psdval.onblur=function(){check(psdval,psdreg)};
psdval.onkeyup=function(){check(psdval,psdreg)};
postval.onfocus=function(){check(postval,emreg)};
postval.onblur=function(){check(postval,emreg)};
postval.onkeyup=function(){check(postval,emreg)};
ppsdval.onfocus=function(){check(ppsdval,psdreg)};
ppsdval.onblur=function(){check(ppsdval,psdreg)};
ppsdval.onkeyup=function(){check(ppsdval,psdreg)};

//检测
function xieyi(agree){
    if(agree.className=="agree"){
        return true;
    }else{
        return false;
    }
}
function phoneyz(){
    if(phoneyzm.value==""){
        return false;
    }else{
        return true;
    }
}

function picyz(){
    if(picyzm.value.toUpperCase()==checkCode.innerHTML.toUpperCase()){
        return true;
    }else{
        return false;
    }
}

var type=window.location.href.split("?type=")[1];
logon.onclick=function(){
    if(check(phoneval,phonereg)&&check(psdval,psdreg)&&picyz()&&phoneyz()&&xieyi(agree)){
        var username=phoneval.value;
        var pwd=psdval.value;
        src=changepic.value;
        if(src==undefined){
            src="Jobeasyimages/user_photo/user_photo.png";
        }
        ajax({
            'method':'POST',
            'url':'user_json.txt',
            'data':{
                'user':username,
            },
            'success':function(txt){
                var json=eval(txt);
                var j;
                for(j=0;j<json.length;j++){
                    if(type==json[j].type){
                        if(username==json[j].username){
                            alert("账号已被使用");
                            return;
                        }
                    }
                }
                if(j==json.length){
                    alert("注册成功");
                    location.href="index.html?type="+type+"&username="+username+"&pwd="+pwd+"&photo="+src;
                }
            }
        });
    }else{
        if(!check(phoneval,phonereg)){
            alert("手机号码未填写或手机号码格式错误");
        }else
        if(!check(psdval,psdreg)){
            alert("密码未填写或密码格式错误");
        }else
        if(!picyz()){
            alert("图片验证码错误");
            create();
        }else
        if(!phoneyz()){
            alert("请填写短信验证码");
        }else
        if(!xieyi(agree)){
            alert("请接受协议");
        }
    }
}
logon2.onclick=function(){
    if(check(postval,emreg)&&check(ppsdval,psdreg)&&xieyi(agree2)){
        var username=postval.value;
        var pwd=ppsdval.value;
        src=changepic2.value;
        if(src==undefined){
            src="Jobeasyimages/user_photo/user_photo.png";
        }
        ajax({
            'method':'POST',
            'url':'user_json.txt',
            'data':{
                'user':username,
                'pwd':pwd,
            },
            'success':function(text){
                var json=eval(text);
                var j;
                for(j=0;j<json.length;j++){
                    if(type==json[j].type){
                        if(username==json[j].username){
                            alert("账号已被使用");
                            return;
                        }
                    }
                }
                if(j==json.length){
                    alert("注册成功");
                    location.href="index.html?type="+type+"&username="+username+"&pwd="+pwd+"&photo="+src;
                }
            }
        });
    }else{
        if(!check(postval,emreg)){
            alert("邮箱未填写或邮箱格式错误");
        }else
        if(!check(ppsdval,psdreg)){
            alert("密码未填写或密码格式错误");
        }else
        if(!xieyi(agree2)){
            alert("请接受协议");
        }
    }
}

