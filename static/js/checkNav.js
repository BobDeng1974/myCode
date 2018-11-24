 var checkNavVersion = function () {
    var ua = window.navigator.userAgent;
    retName = '';
    retVer = '';
    if (/Firefox/g.test(ua)) {
        ua = ua.split(" ");
        retName = 'Firefox';
        retVer = ua[ua.length - 1].split("/")[1];
    } else if (/MSIE/g.test(ua)) {
        ua = ua.split(";");
        retName = 'IE';
        retVer = ua[1].split(" ")[2];
    } else if (/Opera/g.test(ua)) {
        ua = ua.split(" ");
        retName = 'Opera';
        retVer = ua[ua.length - 1].split("/")[1];
    } else if (/Chrome/g.test(ua)) {
        ret = "Chrome|" + ua[ua.length - 2].split("/")[1];
        retName = 'Chrome';
        retVer = ua[ua.length - 2].split("/")[1];
        if (retVer == "undefined") {
            retVer = ua.substr(ua.lastIndexOf("Chrome/") + 7, 2);
        }
    } else if (/^apple\s+/i.test(navigator.vendor)) {
        ua = ua.split(" ");
        retName = 'Safair';
        retVer = ua[ua.length - 2].split("/")[1];
    } else {
        ua = ua.split(" ");
        retName = '未知浏览器';
    } 
    if (retName === "IE" && retVer < 9) { 
        window.location.href = '../../static/downNav.html';
        return true;
    } else {
        return false;
    } 
};   
if (checkNavVersion()) { 
    console.log('12312');
    window.location.href = '../../static/downNav.html';
}
