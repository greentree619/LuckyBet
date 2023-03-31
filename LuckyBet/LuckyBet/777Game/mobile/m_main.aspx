<%@ Page Language="C#" AutoEventWireup="true" CodeFile="m_main.aspx.cs" Inherits="_777Game_mobile_m_main" %>

<%@ Register Src="~/777Game/chat_mobile.ascx" TagPrefix="uc1" TagName="chat_mobile" %>
<%@ Register Src="~/777Game/giftsend_mobile.ascx" TagPrefix="uc1" TagName="giftsend_mobile" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title>水果老虎机</title>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
	<meta name="viewport" content="user-scalable=no, width=720px" />
        
    <script src="/files/js/jquery-1.8.3.min.js"></script>      
    <script src="phaser/phaser.min.js"></script>

    <script type="text/javascript" src="/files/js/segment-display.js"></script>
    <script type="text/javascript" src="/files/js/jquery.jqGauges.min.js"></script>
    <script type="text/javascript" src="/files/js/jquery.mobile-1.4.5.js"></script>
    <script type="text/javascript" src="/files/js/slots_mobile_light.js"></script>
   <%-- <script type="text/javascript" src="//player.wowza.com/player/latest/wowzaplayer.min.js"></script> --%>
    <script src="/files/js/jwplayer.js"></script>
    <script>jwplayer.key = "gESqN5xJRRkppyDGnZbzKugu91grnuoIhVplCg==";</script>

    <link href="/files/css/common.css" rel="stylesheet" />
    
    <style type="text/css">
        * {
            font-size: 16px;
            font-family: 宋体;
            margin: 0;
            padding: 0;
        }

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
    
        var bg_sound_state = 1;
        var eff_sound_state = 1;
        var zhubo_sound_state = 1;        

        var user_id = '<%= Session["user_id"] %>';      

        (function ($) {
            $.fn.nodoubletapzoom = function () {
                $(this).bind('touchstart', function preventZoom(e) {
                    var t2 = e.timeStamp
                      , t1 = $(this).data('lastTouch') || t2
                      , dt = t2 - t1
                      , fingers = e.originalEvent.touches.length;
                    $(this).data('lastTouch', t2);
                    if (!dt || dt > 500 || fingers > 1) return; // not double-tap

                    e.preventDefault(); // double tap - prevent the zoom
                    // also synthesize click events we just swallowed up
                    $(this).trigger('click').trigger('click');
                });
            };
        })(jQuery);

     
        PostAjax("/Ajax/loginstate.ashx", "category=2&user_id=" + user_id + "&loginfir=" + 1);
        setInterval(function () {
            PostAjax("/Ajax/loginstate.ashx", "category=2&user_id=" + user_id);
        }, 30 * 1000);

        var room = 1;
        var zhubo_state = PostAjax("/Ajax/tvroom_manager.ashx", "user_id=" + user_id + "&room=" + room + "&state=0");
        $(window).on("beforeunload", function () {
            PostAjax("/Ajax/tvroom_manager.ashx", "user_id=" + user_id + "&room=" + room + "&state=1");
            return "Buy now!!!";
        });

        var bet_item_rate = [120, 40, 30, 20, 20, 15, 10, 5];
        var dice_rate = 1.96;
        var bg_sound_state = 1;
        var eff_sound_state = 1;
        var zhubo_sound_state = 1;

        var user_id = '<%= Session["user_id"] %>';
        var username = '<%= Session["User"] %>';         
        <%--var zhibo_id = '<%= Session["zhibo_id"] %>';
        zhibo_id = parseInt(zhibo_id);--%>
        zhibo_id = 45;

        <%--var usercoin = '<%= Session["coin"] %>';       --%>
        var usercoin = PostAjax("/Ajax/GetuserCoin.ashx", "user_id=" + user_id);       
        usercoin = parseFloat(usercoin);

        //if (zhubo_state == "1") alert("주보중");
        

    </script>

</head>
<body>  
    <div id="waiting" style="z-index:-5">
            <img src='/files/image/loader.gif' style='position:absolute;left:300px; top:400px' />            
    </div>
      
    <div id="main_div" style="visibility:hidden">
        <form id="form1" runat="server">
                    
            <div id='livestreaming' style='width: 720px; height: 510px; left: 0px; top: 0px; background-image:url("/files/image/player_logo.jpg")'>
                <%--<iframe width="720" height="400" src="wowza_live_m.aspx" style="overflow-y:hidden; overflow-x:hidden"></iframe>--%>
                <div id='wowza_player' style='width: 720px; height: 510px; left: 0px; top: 0px; '></div>
                    <script>
                        //var strem_player = WowzaPlayer.create('wowza_player',
                        //     {
                        //         "license": "PLAY1-aaTQP-Nnbb7-Q3d8z-tYNbm-6ajk8",
                        //         "title": "testing",
                        //         "description": "",
                        //         "sourceURL": "http://103.53.224.51:1935/mylive/stream/playlist.m3u8",
                        //         //"sourceURL": "http://wowzaprdxhi-lh.akamaihd.net/i/0be49513_1@433777/master.m3u8",
                        //         //"sourceURL": "http://103.249.107.127:1935/myvod/_definst_/volvo/mp4:volvo.mp4/playlist.m3u8",
                        //         "autoPlay": true,
                        //         "volume": "75",
                        //         "mute": false,
                        //         "loop": false,
                        //         "audioOnly": false,
                        //         "uiShowQuickRewind": true,
                        //         "uiQuickRewindSeconds": "30",                                 
                        //     }
                        // );
                                                
                            jwplayer("wowza_player").setup({
                                playlist: [{
                                    'sources': [
                                        {
                                            'file': 'http://103.53.224.51:1935/mylive/stream/playlist.m3u8',
                                            //'file': 'rtmp://tianhe01.top:1935/mylive/stream',     
                                            //'file': 'rtsp://103.53.224.51:1935/mylive/stream',
                                        }

                                    ]
                                }],
                                width: 720,
                                height: 510,
                                autostart: 'true',
                                stretching: 'exactfit', // exactfit  uniform
                                displayclick: 'none',
                                hlshtml: 'true',
                                image: '/files/image/player_logo.jpg',
                                //mute: 'true'
                            });                      
                            
                    </script>
                <div id="zhubo_msg" style ="position:absolute; width:500px; height:25px; top:0px; left:0px; background-color:black; color:coral; padding-left:200px; " >主播暂时停止播放</div>
                
            </div>                      
             
            <div id="slot_machine" style="width: 720px; height: 720px">
                <%--<iframe id="777game" width="720" height="790" src="spin_mobile.aspx" style="overflow-y:hidden; overflow-x:hidden;"></iframe>--%>	
                <div id="play" class="game_main_mobile" style="width: 720px; height: 720px; margin:0px; padding:0px"></div>

                <%--<div id="ins_menu" style=" width: 720px; height: 70px; position: fixed; left: 0px; bottom: 0px; background-image: url(img/main_menu.png); opacity:1;"></div> --%>
                <div id="mein_menu" style=" width: 720px; height: 70px; position: fixed; left: 0px; bottom: 0px; background-image: url(img/main_menu.png);">            
                    <img id='menu_bet' width='40' height='40' src="img/menu_bet.png" style="position: absolute; left: 340px; top: 15px" />           
                    
                    <div id='menu_chat' style="width:100px; height:70px; position: absolute; left: 40px; " > 
                        <img width='40' height='40' src="img/menu_chat.png" style="position: relative; left: 18px; top: 18px;" /> </div>              
                    <div id='menu_gift' style="width:100px; height:70px; position: absolute; left: 600px; " > 
                        <img id="gift_button" width='40' height='40' src="img/menu_gift.png" style="position: relative; left: 13px; top: 14px" /></div>                      
                </div>
                    <script>
                        var g = new wLaoHuJi("play");
                        g.init();

                        var game = new Phaser.Game(0, 0, Phaser.CANVAS, 'phaser-example', { preload: preload, create: create, update: update });

                        function preload() {
                            game.load.audio('bg_music', ['assets/music/bg.mp3']);
                            game.load.audio('spin_sound', ['assets/music/bet.mp3']);
                            game.load.audio('lucksound', ['assets/music/luck.mp3']);
                            game.load.audio('luckspin', ['assets/music/hit.mp3']);
                            game.load.audio('betfinisheff', ['assets/music/pop_coin.mp3']);
                            game.load.audio('betiniteff', ['assets/music/push_coin.mp3']);
                            game.load.audio('beteff', ['assets/music/collect_coin_in.mp3']);
                            game.load.audio('selchipeff', ['assets/music/chose_machine.mp3']);
                            game.load.audio('countdown_beep', ['assets/music/count_down.mp3']);
                            game.load.audio('countdown_one', ['assets/music/countdown_1.mp3']);
                            game.load.audio('countdown_two', ['assets/music/countdown_2.mp3']);
                            game.load.audio('countdown_three', ['assets/music/countdown_3.mp3']);
                            game.load.audio('countdown_go', ['assets/music/countdown_go.mp3']);
                            game.load.audio('betting_start', ['assets/music/start_add_chip.mp3']);
                            game.load.audio('betting_stop', ['assets/music/stop_add_chip.mp3']);
                            game.load.audio('apple_sound', ['assets/music/Y101.mp3']);
                            game.load.audio('orenge_sound', ['assets/music/Y102.mp3']);
                            game.load.audio('mongo_sound', ['assets/music/Y103.mp3']);
                            game.load.audio('bell_sound', ['assets/music/Y104.mp3']);
                            game.load.audio('watermellon_sound', ['assets/music/Y105.mp3']);
                            game.load.audio('star_sound', ['assets/music/Y106.mp3']);
                            game.load.audio('seven_sound', ['assets/music/Y107.mp3']);
                            game.load.audio('bar_sound', ['assets/music/Y108.mp3']);
                        }
                        var bg_music, spin_sound, betfinish_sound, betinit_sound, bet_sound, selchip_sound;
                        var luck_sound, luck_spin, countdown_sound, countdown_1, countdown_2, countdown_3, countdown_go, betting_start, betting_stop;
                        var apple_sound, orenge_sound, mongo_sound, bell_sound, watermellon_sound, star_sound, seven_sound, bar_sound;

                        function create() {
                            bg_music = game.add.audio('bg_music');
                            bg_music.loop = true;
                            bg_music.play();
                            spin_sound = game.add.audio('spin_sound');
                            betfinish_sound = game.add.audio('betfinisheff');
                            betinit_sound = game.add.audio('betiniteff');
                            bet_sound = game.add.audio('beteff');
                            selchip_sound = game.add.audio('selchipeff');
                            luck_sound = game.add.audio('lucksound');
                            luck_spin = game.add.audio('luckspin');
                            countdown_sound = game.add.audio('countdown_beep');
                            countdown_1 = game.add.audio('countdown_one');
                            countdown_2 = game.add.audio('countdown_two');
                            countdown_3 = game.add.audio('countdown_three');
                            countdown_go = game.add.audio('countdown_go');
                            betting_start = game.add.audio('betting_start');
                            betting_stop = game.add.audio('betting_stop');

                            apple_sound = game.add.audio('apple_sound');
                            orenge_sound = game.add.audio('orenge_sound');
                            mongo_sound = game.add.audio('mongo_sound');
                            bell_sound = game.add.audio('bell_sound');
                            watermellon_sound = game.add.audio('watermellon_sound');
                            star_sound = game.add.audio('star_sound');
                            seven_sound = game.add.audio('seven_sound');
                            bar_sound = game.add.audio('bar_sound');
                        }

                        function update() {

                            if (bg_sound_state == 0) { // 게임 배경음악
                                bg_music.stop();
                            } else {
                                if (bg_sound == 1) {
                                    bg_music.play();
                                    bg_sound = 0;
                                }
                            }

                            if (eff_sound_state == 1) {
                                if (spin_eff_sound == 1) { // 스핀 효과음
                                    spin_sound.play();
                                    spin_eff_sound = 0;
                                }

                                if (betbtn_eff_sound == 1) {// 배팅버튼 효과음
                                    bet_sound.play();
                                    betbtn_eff_sound = 0;
                                }

                                if (finshbtn_eff_sound == 1) {// 이전값으로 배팅버튼 효과음
                                    betfinish_sound.play();
                                    finshbtn_eff_sound = 0;
                                }

                                if (initbtn_eff_sound == 1) {// 배팅값초기화버튼 효과음
                                    betinit_sound.play();
                                    initbtn_eff_sound = 0;
                                }

                                if (selchip_eff_sound == 1) {// 배팅단위결정버튼 효과음
                                    selchip_sound.play();
                                    selchip_eff_sound = 0;
                                }

                                if (luck_eff_sound == 1) {// luck 효과음
                                    luck_sound.play();
                                    luck_eff_sound = 0;
                                }
                                if (luckspin_eff_sound == 1) {// luck 스핀 효과음
                                    luck_spin.play();
                                    luckspin_eff_sound = 0;
                                }
                                if (countdown_eff_sound == 1) {// 카운트다운 경고음
                                    countdown_sound.play();
                                    countdown_eff_sound = 0;
                                }
                                if (countdown_1_sound == 1) {// 카운트다운 "one"
                                    countdown_1.play();
                                    countdown_1_sound = 0;
                                }
                                if (countdown_2_sound == 1) {// 카운트다운 "two"
                                    countdown_2.play();
                                    countdown_2_sound = 0;
                                }
                                if (countdown_3_sound == 1) {// 카운트다운 "three"
                                    countdown_3.play();
                                    countdown_3_sound = 0;
                                }
                                if (countdown_go_sound == 1) {// 카운트다운 "three"
                                    countdown_go.play();
                                    countdown_go_sound = 0;
                                }
                                if (betting_start_sound == 1) {// 베팅시작
                                    betting_start.play();
                                    betting_start_sound = 0;
                                }
                                if (betting_stop_sound == 1) {// 베팅시작
                                    betting_stop.play();
                                    betting_stop_sound = 0;
                                }

                                if (apple_sound_eff == 1) {// 사과
                                    apple_sound.play();
                                    apple_sound_eff = 0;
                                }
                                if (orenge_sound_eff == 1) {// 오렌지
                                    orenge_sound.play();
                                    orenge_sound_eff = 0;
                                }
                                if (mongo_sound_eff == 1) {// 망고
                                    mongo_sound.play();
                                    mongo_sound_eff = 0;
                                }
                                if (bell_sound_eff == 1) {// 종
                                    bell_sound.play();
                                    bell_sound_eff = 0;
                                }
                                if (watermellon_sound_eff == 1) {// 수박
                                    watermellon_sound.play();
                                    watermellon_sound_eff = 0;
                                }
                                if (star_sound_eff == 1) {// 별
                                    star_sound.play();
                                    star_sound_eff = 0;
                                }
                                if (seven_sound_eff == 1) {// 77
                                    seven_sound.play();
                                    seven_sound_eff = 0;
                                }
                                if (bar_sound_eff == 1) {// 바
                                    bar_sound.play();
                                    bar_sound_eff = 0;
                                }
                            }

                        }
                        
                        var showstate = 1;
                        var giftstate = 0;
                        var chatstate = 0; chatfocus = 0;
                        var betstate = 0;
                        document.getElementById("menu_bet").onclick = function () {
                            if (betstate != 1 && document.getElementById("menu_bet").style.opacity != 0.5) {
                                document.getElementById("bet_area").style.display = 'block';
                                document.getElementById("gift_area").style.display = 'none';
                                document.getElementById("chat_area").style.display = 'none';                                
                                betstate = 1; giftstate = 0; chatstate = 0;
                            }
                            else {
                                document.getElementById("bet_area").style.display = 'none';
                                betstate = 0;
                            }
                        }                        

                        document.getElementById("menu_chat").onclick = function () {
                            if (chatstate != 1) {
                                document.getElementById("bet_area").style.display = 'none';
                                betstate = 0;
                                //alert(chatstate);
                                visibleInput(true);
                                $("#chat_area").css("pointer-events", "auto");                                
                                document.getElementById("gift_area").style.display = 'none';
                                giftstate = 0;
                                document.getElementById("chat_area").style.display = 'block';
                                $("#chat_input").get(0).focus(function () { this.select(); });
                                chatstate = 1; chatfocus = 1;
                            }
                            else {
                                visibleInput(false);
                                $("#chat_area").css("pointer-events", "none");
                                document.getElementById("chat_area").style.display = 'none';
                                chatstate = 0;
                            }
                        }

                        if (zhubo_state == "1") {
                            document.getElementById("gift_button").style.opacity = 1;
                            document.getElementById("zhubo_msg").style.opacity = 0;
                        }
                        else {
                            document.getElementById("gift_button").style.opacity = 0.5;
                            document.getElementById("zhubo_msg").style.opacity = 1;
                        }

                        document.getElementById("menu_gift").onclick = function () {
                            if (giftstate != 1 && zhubo_state == "1") {
                                visibleInput(false);
                                $("#chat_area").css("pointer-events", "none");
                                document.getElementById("gift_area").style.display = 'block';
                                document.getElementById("bet_area").style.display = 'none';
                                giftstate = 1; betstate = 0;
                            }
                            else {
                                document.getElementById("gift_area").style.display = 'none';
                                giftstate = 0;
                            }
                        }
                        
                        document.getElementById("lhj_piece_bg").onclick = function () {
                            if (showstate != 1) {
                                document.getElementById("mein_menu").style.display = 'block';
                                showstate = 1
                            }
                            else {
                                document.getElementById("mein_menu").style.display = 'none';
                                showstate = 0;
                            }

                            if (chatfocus == 1) {
                                //alert(chatstate);                                
                                $("#chat_area").css("pointer-events", "none");
                                visibleInput(false);
                                chatfocus = 0;
                                document.getElementById("mein_menu").style.display = 'block';
                                showstate = 1

                            }
                            if (giftstate == 1) {
                                document.getElementById("gift_area").style.display = 'none';
                                giftstate = 0;
                            }
                        }

                       
                        //if (!document.getElementById("bet_area").hasFocus()) {
                        //    document.getElementById("bet_area").style.display = 'none';
                        //}
                           
                        //window.onclick = function (event) {
                        //if (showstate == 2 || showstate == 3) {
                        //    document.getElementById("gift_area").style.display = 'none';
                        //    visibleInput(false);
                        //    $("#chat_area").css("pointer-events", "none");
                        //    showstate = 0;
                        //}                
                        //if (!event.target.matches('to-gift')) {
                        //    jQuery(".gift_panel").hide();
                        //}

                        //if (!event.target.matches('.user-manager') && !event.target.matches('#chat_user')) {
                        //    jQuery(".user-manager").hide();
                        //}
                        //}              

                    </script>				
            </div>            

            <div id="chat_area" style="pointer-events:none; display:block;width: 720px; height: 400px; position: absolute; left: 0px; top: 0px; background-image:url('/files/image/transparency.png'); display:none">
                <div id="live_chat_area" style="width: 720px; height: 400px">
                    <!--chat area-->
                    <uc1:chat_mobile runat="server" ID="chat_mobile" />                    
                </div>
            </div>
            <div id="gift_area" style="width: 720px; height: 500px; position: fixed; left: 0px; bottom:70px;  background-color: antiquewhite; display: none">
                <div id="live_gift_area" style="width: 720px; height: 500px">
                    <!--chat area-->
                    <uc1:giftsend_mobile runat="server" ID="giftsend_mobile" />
                </div>
            </div>

            <div id='arrow' style="width:100px; height:100px; position: absolute; left: 0px; top: 0px; z-index:103; " > 
            <img src="/files/image/images_m/arrow.png" style="width: 30px; height: 40px; position: absolute; left: 30px; top: 20px;z-index:103" /></div>
            <script>
                document.getElementById("arrow").onclick = function () {
                    document.getElementById("popup_menu").style.display = 'block';
                }

                document.getElementById("user_coin_span").innerHTML = usercoin;
            </script>            
            

            <div id="popup_menu" style="width: 600px; height: 418px; position: absolute; left: 60px; top: 500px; background-image: url(/files/image/images_m/popup_menu.png); z-index:102; display: none;">
                <img id="close_pop_btn" src="../../files/image/images_m/close_btn.png" style="position: absolute; left: 530px; top: 3px;" />
                <img id="mute_bg_btn" src="../../files/image/images_m/mute_bg_btn.png" style="position: absolute; left: 78px; top: 87px;" />
                <img id="mute_eff_btn" src="../../files/image/images_m/mute_eff_btn.png" style="position: absolute; left: 239px; top: 87px;" />
                <img id="mute_zhubo_btn" src="../../files/image/images_m/mute_zhubo_btn.png" style="position: absolute; left: 400px; top: 87px;" />
                <img id="gohome_btn" src="../../files/image/images_m/gohome_btn.png" style="position: absolute; left: 78px; top: 230px;" />
                <%--<img id="goroom_btn" src="../../files/image/images_m/goroom_btn.png" />--%>
                <img id="showlog_btn" src="../../files/image/images_m/showlog_btn.png" style="position: absolute; left: 402px; top: 230px;" />
            </div>
            <script>
                document.getElementById("close_pop_btn").onclick = function () {
                    document.getElementById("popup_menu").style.display = 'none';
                }
                document.getElementById("showlog_btn").onclick = function () {
                    window.open('betting_log.aspx', '客服代表', 'toolbar=no, menubar=no, scrollbars=no, resizable=no');
                }
                document.getElementById("gohome_btn").onclick = function () {
                    location.href = "/main/sky_driver.aspx";
                }
                document.getElementById("mute_bg_btn").onclick = function () {
                    if (bg_sound_state == 1) {
                        document.getElementById("mute_bg_btn").style.opacity = 0.1;
                        bg_sound_state = 0;                        
                    }
                    else {
                        document.getElementById("mute_bg_btn").style.opacity = 1;
                        bg_sound_state = 1;
                        bg_sound = 1;                        
                    }
                }
                document.getElementById("mute_eff_btn").onclick = function () {
                    if (eff_sound_state == 1) {
                        document.getElementById("mute_eff_btn").style.opacity = 0.1;
                        eff_sound_state = 0;                        
                    }
                    else {
                        document.getElementById("mute_eff_btn").style.opacity = 1;
                        eff_sound_state = 1;                       
                    }
                }
                document.getElementById("mute_zhubo_btn").onclick = function () {
                    
                    if (zhubo_sound_state == 1) {
                        document.getElementById("mute_zhubo_btn").style.opacity = 0.1;
                        zhubo_sound_state = 0;
                        strem_player.mute(true);
                    }
                    else {
                        document.getElementById("mute_zhubo_btn").style.opacity = 1;
                        zhubo_sound_state = 1;
                        strem_player.mute(false);
                    }
                }

                

            </script>
        
        </form>
    </div>
    
</body>
</html>

<script type="text/javascript">
    
    window.onload = function () {
        document.getElementById("waiting").style.display = "none"
        document.getElementById("main_div").style.visibility = "visible";
    };   

  
    //document.addEventListener('touchstart', this.touchstart);
    //document.addEventListener('touchmove', this.touchmove);

    //function touchstart(e) {
    //    window.scrollTo(0, 1);
    //    e.preventDefault()
    //}

    //function touchmove(e) {
    //    window.scrollTo(0, 1);
    //    e.preventDefault()
    //}
</script>
