var _FunctionName = "";
function _Alert() {
    var len = arguments.length;
    if (len == 1)
        _Alert2(1,arguments[0]);
    else if (len == 2)
        _Alert2(arguments[0], arguments[1]);
    else if (len == 3)
        _Alert3(arguments[0], arguments[1], arguments[2]);
    $("#_AlertButton a:eq(0)").show();
    $("#_AlertButton a:eq(1)").hide();
    _ShowPanel();
    $("#_AlertClose").attr("href", "javascript:_CheckTrue()");
}
//function _Alert1(_content) {
//    _FunctionName = "";
//    $("#_AlertConteng").html(_content);
//}
function _Alert2(type, _content) {
    _FunctionName = "";
    if (_content.indexOf("有误") > 0 || _content.indexOf("失败") > 0)
        EditAlertType(3);
    else
        EditAlertType(type);
    $("#_AlertConteng").html(_content);
}
function _Alert3(type, _content, _ContinueFunction) {
    _FunctionName = _ContinueFunction;
    EditAlertType(type);
    $("#_AlertConteng").html(_content);
}
function EditAlertType(type) {
    if (type == 1) {
        $("#_AlertTitle").html("温馨提示");
        $("#_AlertType").attr("class", "pngico fl");
    }
    else if (type == 2) {
        $("#_AlertTitle").html("成功提示");
        $("#_AlertType").attr("class", "pngico2 fl");
    }
    else if (type == 3) {
        $("#_AlertTitle").html("错误提示");
        $("#_AlertType").attr("class", "pngico3 fl");
    }
}
function _Confirm( _content, _ContinueFunction) {
    _FunctionName = _ContinueFunction;
    $("#_AlertTitle").html("温馨提示");
    $("#_AlertConteng").html(_content);
    $("#_AlertType").attr("class", "pngico fl");
    $("#_AlertButton a:eq(0)").show();
    $("#_AlertButton a:eq(1)").show();
    _ShowPanel();
    $("#_AlertClose").attr("href", "javascript:_PanelHide()");
}

function _ConfirmRoomState(_content) {
    $("#_AlertTitle").html("温馨提示");
    $("#_AlertConteng").html(_content);
    $("#_AlertType").attr("class", "pngico fl");
    $("#_AlertButton a:eq(0)").show();
    $("#_AlertButton a:eq(1)").hide();
    _ShowPanel();
    $("#_AlertClose").attr("href", "/");
    $("#_AlertButton a:eq(0)").attr("href", "/");
    $("#_AlertButton a:eq(1)").attr("href", "/");
}

function _ConfirmPay(_content) {
    $("#_AlertTitle").html("登录第三方支付平台支付");
    $("#_AlertConteng").html(_content);
    $("#_AlertType").attr("class", "pngico fl");
    $("#_AlertButton a:eq(0)").show();
    $("#_AlertButton a:eq(1)").show();
    $("#_AlertButton a:eq(0)").html("已完成支付");
    $("#_AlertButton a:eq(1)").html("重新支付");
    _ShowPanel();
    $("#_AlertClose").attr("href", "javascript:_PanelHide()");
    $("#_AlertButton a:eq(0)").attr("href", "/User/PayHistory.aspx");
    $("#_AlertButton a:eq(1)").attr("href", "/User/Tenpay/");

}

function _CheckTrue() {
    _PanelHide();
    if (_FunctionName != "")
        setTimeout(_FunctionName, 10);
}
function _ShowPanel() {
    var _PanelTop = ($(window).height() - 100) / 2;
    var _PanelLeft = ($(window).width() - 270) / 2;
    if (navigator.appName.indexOf("Microsoft") != -1) {
        _PanelTop = _PanelTop + document.documentElement.scrollTop;
        $("#blacktop").css("height", $(document).height() - 5);
    }
    else {
        _PanelTop = _PanelTop + document.body.scrollTop;
        $("#blacktop").css("height", $(document).height());
    }
    $("#_AlertPanel").show();
    $("#_AlertPanel .popupbig").attr("style", "top:" + _PanelTop + "px;left:" + _PanelLeft + "px;")
}
function _PanelHide() {
    $("#_AlertPanel").hide();
}
function _AlertKeyDown() {
    if ($('#_AlertPanel').is(':visible')) {
        if (event.keyCode == 27) {
            _PanelHide();
        } else if (event.keyCode == 13) {
            _CheckTrue();
        }
    }
}