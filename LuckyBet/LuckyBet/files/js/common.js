/// <reference path="jquery.cookie.js" />

var globTmOut = 0;//total timeout for 777game trial account.
var curTmOut = 0;
var timer777;

if ($.cookie("trialtimeout") != undefined && $.cookie("trialtimeout") != "null" )
{
    globTmOut = $.cookie('trialtimeout');
    var Min = (globTmOut) / 1000;
    Min = parseInt(Min, 10);
    document.title = "[其余时间:" + Min + "]";

    timer777 = setInterval(function () {
        curTmOut += 1000;
        var remainMin = (globTmOut - curTmOut) / 1000;
        var remainMili = globTmOut - curTmOut;
        $.cookie('trialtimeout', remainMili, { path: '/' });

        remainMin = parseInt(remainMin, 10);
        document.title = "[其余时间:"+remainMin+"]";
        if (remainMin <= 0) {
            $.cookie('trialtimeout', '', { expires: -1 , path: '/' });
            clearInterval(timer777);
            window.location = '/login.aspx';
        }
    }, 1000);
}