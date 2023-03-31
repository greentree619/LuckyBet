
var PageTitle = document.title;
function random(min, max) {
    return Math.floor(min + Math.random() * (max - min));
}

function GetTime() {//获取当前时间
    var now = new Date();
    var Hours = now.getHours();
    var Minutes = now.getMinutes();
    var Seconds = now.getSeconds();
    return (Hours < 10 ? ("0" + Hours) : Hours) + ":" + (Minutes < 10 ? ("0" + Minutes) : Minutes);
}
function GetTimeStr() {//获取当前时间
    var now = new Date();
    var Hours = now.getHours();
    var Minutes = now.getMinutes();
    var Seconds = now.getSeconds();
    return (Hours < 10 ? ("0" + Hours) : Hours) + "时" + (Minutes < 10 ? ("0" + Minutes) : Minutes) + "分";
}
function GetLogTime() {//获取当前时间
    var now = new Date();
    var Hours = now.getHours();
    var Minutes = now.getMinutes();
    var Seconds = now.getSeconds();
    return (Hours < 10 ? ("0" + Hours) : Hours) + ":" + (Minutes < 10 ? ("0" + Minutes) : Minutes) + ":" + (Seconds < 10 ? ("0" + Seconds) : Seconds);
}
function GetCarItemHtml(item) {
    var _CarContent = '<li><div class="' + item.uid + '"><p class="carname">' + item.cname + '</p><p class="car"><img src="' + item.car + '" /></p><p class="nub"><a href="/Room?id=' + item.rid + '" target="' + item.rid + '">' + item.rid + '</a></p><p class="name"><a href="/Room/UserHome.aspx?id=' + item.uid + '" target="' + item.rid + '">' + item.uname + '</a></p></div></li>';
    return _CarContent;
}

function ShowEasyReply() {
    if ($('.kjhfcon').is(':visible'))
        $('.kjhfcon').hide();
    else
        $('.kjhfcon').show();
}
function EasyReply(obj) {
    $("#text_message").val($(obj).html());
}
function BannedMsg(type, uid, name) { //禁言
    CallFlexPrivate(type, "banned", uid);
    if (type == 0) {
        var message = GetTime() + '“' + name + '” 已被房间管理员 “' + LoginUser.name + '” 禁言！';
        CallFlex(message, "msg");
    }
}
function SelectGift_UserItem(user) {//将用户添加到送礼物下拉列表
    if ($("#receive_user option[value='" + user + "']").length <= 0) {
        var userItem = user.split('|');
        $("#receive_user").append("<option value='" + user + "'>" + userItem[1] + "</option>");
    }
    $("#receive_user ").val(user);
}
function DoApplyFollow(uid, type) {//关注
    var AjaxValue = PostAjax("/Ajax/ApplyFollow.ashx", "uid=" + uid + "&type=" + type + "&r=" + Math.random());
    if (AjaxValue == "True")
        return true;
    else {
        _Alert(AjaxValue);
        return false;
    }
}
function SelectUserItem(user, num) {//将用户添加到私聊选项卡
    var userItem = user.split('|');
    if (userItem[0] == LoginUser.uid)
        return false;
    $("#list_to_user option:eq(1)").remove();
    $("#list_to_user").append("<option value='" + user + "'>" + userItem[1] + "</option>");
    $("#list_to_user ").val(user);
    if (num == 1)
        $("#check_private_message").attr("checked", "checked");
    else
        $("#check_private_message").removeAttr("checked");
}

function RepliceTitle() {
    if (document.title.indexOf("私聊消息") >= 0)
        document.title = PageTitle;
}

function hideFlash(hidnum) {//隐藏礼物Flash
    $("#ItemFlash" + hidnum).remove();
}
function ShowMsg(val) {//显示用户发送的消息
    $("#list_message").append("<li>" + val + "</li>");
    $("#div_message").scrollTop($("#div_message")[0].scrollHeight);
}
function ShowTopMsg(val) {//显示前10条消息
    var list = val.split('tenmsg');
    for (var i = 0; i < list.length; i++) {
        if (list[i] != "") {
            $("#list_message").append("<li>" + list[i] + "</li>");
            $("#div_message").scrollTop($("#div_message")[0].scrollHeight);
        }
    }
    $("#div_message").scrollTop($("#div_message")[0].scrollHeight);
}
function ShowKickOut(jsonstr) { //显示踢出房间信息
    var Item = eval('(' + jsonstr + ')');
    if (Item.kuid == LoginUser.uid) {
        document.body.innerHTML = "";
        alert("您已被房主" + Item.msg + "！");
        window.location = '/';
    }
    else {
        var message = GetTime() + '“' + Item.kname + '” 被房间管理员 “' + Item.mnane + '” 踢出！';
        ShowMsg(message);
        RemoveUser(Item.kuid);
        ShowNumCount();
        $("." + Item.kuid).parent().remove();
    }
}
function Refresh() {
    if (event.keyCode == 116) {
        event.keyCode = 0;
        event.cancelBubble = true;
        _Confirm("当前正在直播，确定要刷新页面吗？", "location=location;");
        event.returnValue = false;
    }
    else {
        _AlertKeyDown();
    }
}
function RemoveMsg() {//定时移除过多消息
    var messageNum = $("#list_message").find("li").length;
    if (messageNum > 200)
        $("#list_message li:lt(" + (messageNum - 100) + ")").remove();
    var noticeNum = $("#list_notice").find("li").length;
    if (noticeNum > 100)
        $("#list_notice li:lt(" + (noticeNum - 50) + ")").remove();
}
function ReplaceRollMsg() {
    $(".lineban a").html(RollMsg[nowRollMsg].msg);
    $(".lineban a").attr("href", RollMsg[nowRollMsg].url);
    nowRollMsg++;
    if (nowRollMsg == RollMsg.length)
        nowRollMsg = 0;
}
$(document).ready(function () {
    setInterval("RemoveMsg()", 60000);
    var RollMsgCount = RollMsg.length;
    if (RollMsgCount > 0) {
        ReplaceRollMsg();
        setInterval("ReplaceRollMsg()", 10000);
    } 
});