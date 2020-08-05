function move(obj,json,callback){   //callback执行时机是在    move执行后执行
    clearInterval(obj.timer);
    var attr=null;
    var target={};//属性目标值
    for(var attr in json){
        if(attr=="opacity"){
            target[attr]=json[attr];
        }else{
            target[attr]=parseInt(json[attr]);
        }
    }
    obj.timer=setInterval(function(){
        var flag=true;
        for(attr in json){
            var objCss=null;
            if(attr=="opacity"){
                objCss=css(obj,attr);
            }else{
                objCss=parseInt(css(obj,attr));
            }

            if(attr=="opacity"){
                var speed=(target[attr]-objCss)*100*.2;
                speed=(speed>0)?Math.ceil(speed):Math.floor(speed);
                obj.style[attr]=(parseInt(objCss*100)+speed)/100;
                obj.style.filter="alpha(opacity="+(parseInt(objCss*100)+speed)+")";
            }else{
                var speed=(target[attr]-objCss)*.2;
                speed=(speed>0)?Math.ceil(speed):Math.floor(speed);
                obj.style[attr]=objCss+(speed)+"px";
            }
            flag=objCss!=target[attr]?false:true;
            /*console.log(objCss);*/
        }
        if(flag){
            clearInterval(obj.timer);
            callback&&callback.call(obj);
        }
    },13);
}