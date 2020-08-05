function css(ele,attr,value){
            if(arguments.length==2){//获取样式
                return getCss(ele,attr);
            }else{//三个
                if(attr=="opacity"){
                    ele.style.filter="alpha(opacity="+value*100+")";
                }
                ele.style[attr]=value;
            }
            function getCss(ele,attr){
                /*return ele.currentStyle?ele.currentStyle[attr]:getComputedStyle(ele,null)[attr];*/
                if(ele.currentStyle){
                    if(attr=="opacity"&&ele.style.opacity===undefined)
                        return 1;
                    else return ele.currentStyle[attr];
                }else{
                    return getComputedStyle(ele,null)[attr];
                }
            }
        }