function moveTime(obj,json,time,M,callback){//obj 在time时间内变化为json状态
    clearInterval(obj.timer);
    /*console.log(typeof time);
    console.log(typeof M);*/
    switch(typeof time){
        case "number"://第三个实参是时间
            time=time;
            if(typeof M=="string"){//第四个实参是模式
                M=M||"linear";
            }else if(typeof M=="function"){//第四个实参是回调函数，即缺变化模式M
                callback=M;
                M="linear";
            }else{  //缺变化模式M和回调函数
                M="linear";
            }
            break;
        case "string"://第三个实参是变化模式M
            if(typeof M=="function"){   //第四个实参是回调函数，缺时间time
                callback=M;
                M=time;
                time=400;
            }else if(typeof M=="number"){    //第四个实参是时间，说明时间和模式交换位置了
                var s=time;
                time=M;
                M=s;
            }else{  //缺 时间time
                M=time;
                time=400;
            }
            break;
        case "function"://缺少时间time和变化模式M，一定有回调
            callback=time;
            time=400;
            M="linear";break;
        default://缺少时间time和变化模式，不一定有回调
            time=400;
            M="linear";
            break;
    }
    /*if(typeof time==="number"){
        M=M||"linear";
    }else if(typeof time==="string"){
        if(typeof M==="number"){
            var t=M;
            M=time;
            time=t||400;
        }else{
            M=time;
            time=400;
        }
    }else if(typeof time=="function"){
        callback=time;
        time=400;
        M=M||"linear";
    }*/
    /*else{
        M=M||"linear";
        time=time||400;
    }*/
    /*M=M||"linear";
    time=time||400;*/
    var attr=null,initial={};//属性目标值
    for(attr in json){
        if(attr=="opacity"){
            initial[attr]=Math.round(css(obj,attr)*100);
        }else{
            initial[attr]=parseFloat(css(obj,attr));
        }
    }
    var t0=new Date().getTime();
    //console.log(t0);
    obj.timer=setInterval(function(){
        var t1=new Date().getTime();
        var _t=time-Math.max(0,(t0-t1+time));
        if(_t>=time){
            for(attr in json){//当前
                if(attr=="opacity"){
                    obj.style[attr]=json[attr];
                    obj.style[attr]="alpha(opacity="+Math.round(json[attr]*100)+")";
                }else{
                    // console.log(json[attr]);
                    obj.style[attr]=json[attr]+"px";//超时的状态下，多余的时间不让它产生变化
                }
            }
            clearInterval(obj.timer);
            callback&&callback.call(obj);
        }else{
            for(attr in json){//当前
                if(attr=="opacity"){
                    /*obj.style[attr]=((json[attr]-initial[attr])*100/time*_t+parseInt(initial[attr]*100))/100;
                    obj.style.filter="alpha(opacity="+((json[attr]-initial[attr])*100/time*_t+parseInt(initial[attr]*100))+")";*/
                    var s=Tween[M](_t,initial[attr],Math.round(json[attr]*100)-initial[attr],time);
                    obj.style[attr]=s/100;
                    obj.style.filter="alpha(opacity="+s+")";
                }else{
                    /*obj.style[attr]=(json[attr]-initial[attr])/time*_t+initial[attr]+"px";*/
                    var s=Tween[M](_t,initial[attr],json[attr]-initial[attr],time);
                    obj.style[attr]=s+"px";
                }
            }
        }
    },13);
}