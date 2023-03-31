<%@ Page Language="C#" AutoEventWireup="true" CodeFile="spin_mobile.aspx.cs" Inherits="_777Game_mobile_spin_mobile" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
   
    <link href="/files/css/common.css" rel="stylesheet" />
    <script src="/files/js/jquery-1.8.3.min.js"></script>
    <script type="text/javascript" src="/files/js/slots_mobile_light.js"></script>

    <script type="text/javascript" src="/files/js/segment-display.js"></script>
    <script type="text/javascript" src="/files/js/jquery.jqGauges.min.js"></script>
    <script type="text/javascript" src="/files/js/jquery.mobile-1.4.5.js"></script>
    

     <style type="text/css">     
       body {
         margin-left: 0px;
         margin-top: 0px;
         margin-right: 0px;
         margin-bottom: 0px;
         overflow-y: hidden;
         overflow-x: hidden;
        }
    </style>

    <script type="text/javascript">   
       var bet_item_rate = [120, 40, 30, 20, 20, 15, 10, 5];
        var dice_rate = 1.96;
        var bg_sound_state = 1;
        var eff_sound_state = 1;
        var zhubo_sound_state = 1;

        var user_id = '<%= Session["user_id"] %>';
        var username = '<%= Session["User"] %>';         
        var zhibo_id = '<%= Session["zhibo_id"] %>';
        zhibo_id = parseInt(zhibo_id);
        zhibo_id = 15;

        <%--var usercoin = '<%= Session["coin"] %>';       --%>
        var usercoin = PostAjax("/Ajax/GetuserCoin.ashx", "user_id=" + user_id);       
        usercoin = parseFloat(usercoin);        

    </script>
</head>
<body style="width:720px; height:790px">
    <form id="form1" runat="server">
    <div>
        <div id="play" class="game_main_mobile"></div>

        <div id="mein_menu" style=" width: 720px; height: 70px; position: absolute; left: 0px; top: 720px; background-image: url(img/main_menu.png);">            
            <img id='menu_bet' width='40' height='40' src="img/menu_bet.png" style="position: absolute; left: 340px; top: 15px" />            
        </div>
            <script>
                var g = new wLaoHuJi("play");
                g.init();

                var showstate = 0;
                document.getElementById("menu_bet").onclick = function () {
                    if (showstate != 1) {
                        document.getElementById("bet_area").style.display = 'block';
                        $('#gift_area', parent.document).css("display", "none");
                        parent.showstate = 0;
                        showstate = 1
                    }
                    else {
                        document.getElementById("bet_area").style.display = 'none';
                        showstate = 0;
                    }
                }


            </script>
    </div>
    </form>
</body>
</html>
