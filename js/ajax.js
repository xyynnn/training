function ajax(json){
    var method=json.method||'get';
    var url=json.url;
    var data=json.data;
    var success=json.success;
    var error=json.error;
    var syn=json.syn||true;
    var xhr=new XMLHttpRequest();
        if(typeof data=="object"){
            var str='';
            for(var k in data){
                str+=k+"="+data[k]+"&";
            }
            data=str+"_t="+new Date().getTime();
        }
        /*if(method=='get'){
            url+="?"+data;
        }*/
        if(data&&/^get$/i.test(method)){
            url+="?"+data;
        }
        xhr.open(method,url,syn);
        xhr.setRequestHeader('content-type','application/x-www-form-urlencoded');
        xhr.send(data);
        xhr.onreadystatechange=function(){
            if(xhr.readyState==4&&xhr.status==200){
                success&&success(xhr.responseText);
            }else{
                error&&error(xhr.status);
            }
        }
}