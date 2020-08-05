function createCode(length,c) {
    var code="";
    var codeLength = parseInt(length);
    var codeChars = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9,'a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z','A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z');
        //循环组成验证码的字符串
    for (var i = 0; i < codeLength; i++){
        var charNum=Math.floor(Math.random()*codeChars.length);
        code+=codeChars[charNum];
    }
    c.innerHTML = code;
}