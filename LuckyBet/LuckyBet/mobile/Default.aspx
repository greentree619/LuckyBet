<%@ Page Language="C#" AutoEventWireup="true" CodeFile="Default.aspx.cs" Inherits="_777Game_mobile_Default" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <meta charset="utf-8" />
    <link rel="stylesheet" href="app.css" type="text/css" />
    <link href="/files/css/common.css" rel="stylesheet" /> 

    <script src="node_modules/phaser/dist/phaser.js"></script>   

    <script src="/files/js/jquery-1.8.3.min.js"></script>
    <script type="text/javascript" src="//player.wowza.com/player/latest/wowzaplayer.min.js"></script>
    <script type="text/javascript" src="/files/js/segment-display.js"></script>

    <script>
        var bet_item_rate = [120,40,30,20,20,15,10,5];
        var dice_rate = 1.98;
        var csstypell = ['b_apple', 's_apple', 'b_coconut', 'b_watermelons', 's_watermelons', 'b_cha',
        'b_apple', 's_orange', 'b_orange', 'b_alarm', 's_seven', 'b_seven', 'b_apple', 's_coconut',
        'b_coconut', 'b_star', 's_star', 'cha', 'b_apple', 's_alarm', 'b_orange', 'b_alarm', 's_bar', 'b_bar'];
        var slotlogcss = ['_b_apple', '_s_apple', '_b_coconut', '_b_watermelons', '_s_watermelons', '_b_cha',
           '_b_apple', '_s_orange', '_b_orange', '_b_alarm', '_s_seven', '_b_seven', '_b_apple', '_s_coconut',
           '_b_coconut', '_b_star', '_s_star', '_cha', '_b_apple', '_s_alarm', '_b_orange', '_b_alarm', '_s_bar', '_b_bar'];
        var taisailogcss = ['_dice_small_', '_dice_big_'];
        var evoddlogcss = ['_dice_even_', '_dice_odd_'];
    </script>
</head>
<body>
    <form id="slot" runat="server">
    <div>
         <!-- Make Sure to install the Javscript Phaser Project Template in order to build Javascript Phaser app in Viusual Studio:
        https://github.com/funzeye/Phaser-Project-Template-Javascript -->
        <div id="streamplay" style="width:720px;height:400px;z-index:102;left:0px;top:0px; cursor:pointer; cursor:hand" onmousedown="startDrag(event, this)" ondblclick="doubleSize(event, this)">
            <script>
               WowzaPlayer.create('streamplay',
                    {
                        "license": "PLAY1-aaTQP-Nnbb7-Q3d8z-tYNbm-6ajk8",
                        "title": "testing",
                        "description": "",
                        "sourceURL": "http://103.249.107.127:1935/live/testing/playlist.m3u8",
                        //"sourceURL": "http://192.168.1.105:1935/demolive/testing/playlist.m3u8",
                        //"sourceURL": "http://103.249.107.127:1935/myvod/_definst_/volvo/mp4:volvo.mp4/playlist.m3u8",
                        "autoPlay": true,
                        "volume": "75",
                        "mute": false,
                        "loop": false,
                        "audioOnly": false,
                        "uiShowQuickRewind": true,
                        "uiQuickRewindSeconds": "30"
                    }
                );

            </script>
        </div>   
        <div id="content"></div>

        <div id="bet_area" style="position:absolute;width:720px;height:650px;z-index:102;left:0px;top:480px; background-color:beige; opacity:1;  display: none ">
            <div id="bet_btn_area">
                <image id='disp_bar' width='84' height='30' src="img/disp_1.png" style="position:absolute;left:80px; top:85px"/>
                <image id='disp_seven' width='84' height='30' src="img/disp_1.png" style="position:absolute;left:200px; top:85px" />
                <image id='disp_star' width='84' height='30' src="img/disp_1.png" style="position:absolute;left:320px; top:85px" />
                <image id='disp_watermelon' width='84' height='30' src="img/disp_1.png" style="position:absolute;left:440px; top:85px" />
                <image id='btn_bar' width='92' height='92' src="img/btn_bar.png" style="position:absolute;left:75px; top:120px" />
                <image id='btn_seven' width='92' height='92' src="img/btn_seven.png" style="position:absolute;left:195px; top:120px" />
                <image id='btn_star' width='92' height='92' src="img/btn_star.png" style="position:absolute;left:315px; top:120px" />
                <image id='btn_watermelon' width='92' height='92' src="img/btn_watermelon.png" style="position:absolute;left:435px; top:120px" />
                <image id='rate_bar' width='84' height='35' src="img/disp_2.png" style="position:absolute;left:80px; top:215px" />
                <image id='rate_seven' width='84' height='35' src="img/disp_2.png" style="position:absolute;left:200px; top:215px" />
                <image id='rate_star' width='84' height='35' src="img/disp_2.png" style="position:absolute;left:320px; top:215px" />
                <image id='rate_watermelon' width='84' height='35' src="img/disp_2.png" style="position:absolute;left:440px; top:215px" />

                <image id='disp_bell' width='84' height='30' src="img/disp_1.png" style="position:absolute;left:80px; top:270px" />
                <image id='disp_mongo' width='84' height='30' src="img/disp_1.png" style="position:absolute;left:200px; top:270px" />
                <image id='disp_orenge' width='84' height='30' src="img/disp_1.png" style="position:absolute;left:320px; top:270px" />
                <image id='disp_apple' width='84' height='30' src="img/disp_1.png" style="position:absolute;left:440px; top:270px" />
                <image id='btn_bell' width='92' height='92' src="img/btn_bell.png" style="position:absolute;left:75px; top:305px" />
                <image id='btn_mongo' width='92' height='92' src="img/btn_mongo.png" style="position:absolute;left:195px; top:305px" />
                <image id='btn_orenge' width='92' height='92' src="img/btn_orenge.png" style="position:absolute;left:315px; top:305px" />
                <image id='btn_apple' width='92' height='92' src="img/btn_apple.png" style="position:absolute;left:435px; top:305px" />
                <image id='rate_bell' width='84' height='35' src="img/disp_2.png" style="position:absolute;left:80px; top:400px" />
                <image id='rate_mongo' width='84' height='35' src="img/disp_2.png" style="position:absolute;left:200px; top:400px" />
                <image id='rate_orenge' width='84' height='35' src="img/disp_2.png" style="position:absolute;left:320px; top:400px" />
                <image id='rate_apple' width='84' height='35' src="img/disp_2.png" style="position:absolute;left:440px; top:400px" />

                <image id='disp_odd' width='84' height='30' src="img/disp_1.png" style="position:absolute;left:80px; top:455px" />
                <image id='disp_even' width='84' height='30' src="img/disp_1.png" style="position:absolute;left:200px; top:455px" />
                <image id='disp_big' width='84' height='30' src="img/disp_1.png" style="position:absolute;left:320px; top:455px" />
                <image id='disp_small' width='84' height='30' src="img/disp_1.png" style="position:absolute;left:440px; top:455px" />
                <image id='btn_odd' width='92' height='92' src="img/btn_odd.png" style="position:absolute;left:75px; top:490px" />
                <image id='btn_even' width='92' height='92' src="img/btn_even.png" style="position:absolute;left:195px; top:490px" />
                <image id='btn_big' width='92' height='92' src="img/btn_big.png" style="position:absolute;left:315px; top:490px" />
                <image id='btn_small' width='92' height='92' src="img/btn_small.png" style="position:absolute;left:435px; top:490px" />
                <image id='rate_odd' width='84' height='35' src="img/disp_2.png" style="position:absolute;left:80px; top:585px" />
                <image id='rate_even' width='84' height='35' src="img/disp_2.png" style="position:absolute;left:200px; top:585px" />
                <image id='rate_big' width='84' height='35' src="img/disp_2.png" style="position:absolute;left:320px; top:585px" />
                <image id='rate_small' width='84' height='35' src="img/disp_2.png" style="position:absolute;left:440px; top:585px" />

                <canvas id='dgt_bar' style='width:77px; height:35px; position: absolute; left:85px; top:83px'></canvas>
                <canvas id='dgt_seven' style='width:77px; height:35px; position: absolute; left:205px; top:83px'></canvas>
                <canvas id='dgt_star' style='width:77px; height:35px; position: absolute; left:325px; top:83px'></canvas>
                <canvas id='dgt_watermelons' style='width:77px; height:35px; position: absolute; left:445px; top:83px'></canvas>
                <canvas id='dgt_alarm' style='width:77px; height:35px; position: absolute; left:85px; top:268px '></canvas>
                <canvas id='dgt_coconut' style='width:77px; height:35px; position: absolute; left:205px; top:268px'></canvas>
                <canvas id='dgt_orange' style='width:77px; height:35px; position: absolute; left:325px; top:268px'></canvas>
                <canvas id='dgt_apple' style='width:77px; height:35px; position: absolute; left:445px; top:268px'></canvas>
                <canvas id='dice_odd' style='width:77px; height:35px; position: absolute; left:85px; top:453px'></canvas>
                <canvas id='dice_even' style='width:77px; height:35px; position: absolute; left:205px; top:453px'></canvas>
                <canvas id='dice_big' style='width:77px; height:35px; position: absolute; left:325px; top:453px'></canvas>
                <canvas id='dice_small' style='width:77px; height:35px; position: absolute; left:445px; top:453px'></canvas>

                <canvas id='dgt_bar_rate' style='width:50px; height:20px; position: absolute; left:107px; top:223px'></canvas>
                <canvas id='dgt_seven_rate' style='width:50px; height:20px; position: absolute; left:227px; top:223px'></canvas>
                <canvas id='dgt_star_rate' style='width:50px; height:20px; position: absolute; left:347px; top:223px'></canvas>
                <canvas id='dgt_watermelons_rate' style='width:50px; height:20px; position: absolute; left:467px; top:223px'></canvas>
                <canvas id='dgt_alarm_rate' style='width:50px; height:20px; position: absolute; left:107px; top:408px '></canvas>
                <canvas id='dgt_coconut_rate' style='width:50px; height:20px; position: absolute; left:227px; top:408px'></canvas>
                <canvas id='dgt_orange_rate' style='width:50px; height:20px; position: absolute; left:347px; top:408px'></canvas>
                <canvas id='dgt_apple_rate' style='width:50px; height:20px; position: absolute; left:467px; top:408px'></canvas>
                <canvas id='dice_odd_rate' style='width:50px; height:20px; position: absolute; left:107px; top:593px'></canvas>
                <canvas id='dice_even_rate' style='width:50px; height:20px; position: absolute; left:227px; top:593px'></canvas>
                <canvas id='dice_big_rate' style='width:50px; height:20px; position: absolute; left:347px; top:593px'></canvas>
                <canvas id='dice_small_rate' style='width:50px; height:20px; position: absolute; left:467px; top:593px'></canvas>

                <image id='1chip' width='80' height='80' src="img/1chip.png" style="position:absolute;left:560px; top:80px" />
                <image id='10chip' width='80' height='80' src="img/10chip.png" style="position:absolute;left:560px; top:165px" />
                <image id='100chip' width='80' height='80' src="img/100chip.png" style="position:absolute;left:560px; top:250px" />
                <image id='1000chip' width='80' height='80' src="img/1000chip.png" style="position:absolute;left:560px; top:335px" />

                <image id='bet_def' width='90' height='85' src="img/bet_def.png" style="position:absolute;left:555px; top:440px" />
                <image id='bet_init' width='90' height='85' src="img/bet_init.png" style="position:absolute;left:555px; top:535px" />           
            </div>   
           <%-- <div id="slot_machine_log" style="width:720px; height:60px; position: absolute; left:0px; top:10px; background-color:blueviolet ">
                <ul id='slot_log' class='slot_log' style="width:720px; height:60px; overflow-x:hidden; display:inline"></ul>
            </div>
            <div id="dice_log1" style="width:45px; height:545px; position: absolute; left:5px; top:80px; background-color:blueviolet ">
                <ul id='diceTai_log' class='diceTai_log' style="width:45px; height:545px; overflow-y:hidden"></ul>
            </div>
            <div id="dice_log2" style="width:45px; height:545px; position: absolute; left:665px; top:80px; background-color:blueviolet ">
                <ul id='diceodd_log' class='diceodd_log' style="width:45px; height:545px; overflow-y:hidden"></ul>
            </div>    --%>

        </div>
         <div id="mein_menu" style="width:720px; height:70px; position: absolute; left:10px; top:1130px; background-image:url(img/main_menu.png);">
             <image id='menu_chat' width='40' height='40' src="img/menu_chat.png" style="position:relative;left:57px; top:18px" />
             <image id='menu_bet' width='40' height='40' src="img/menu_bet.png" style="position:relative;left:297px; top:16px" />
             <image id='menu_gift' width='40' height='40' src="img/menu_gift.png" style="position:relative;left:524px; top:14px" />            
        </div>
        <script>
            var game = new Phaser.Game(0, 0, Phaser.CANVAS, 'phaser-example', { preload: preload, create: create, update: update });

            function preload() {
                game.load.audio('boden', ['assets/music/bg.mp3']);
                game.load.audio('bet', ['assets/music/bet.mp3']);
            }
            var music;
            var music1;

            function create() {
                music = game.add.audio('boden');
                music.play();
                music1 = game.add.audio('bet');

                document.getElementById("menu_bet").onclick = function () {
                    document.getElementById("bet_area").style.display = 'block';
                    music1.play();
                    music.stop();
                }

                setInterval(function () {
                    music1.play();
                }, 1000);

            }
            function update() {
                
            }      
          
            ///   각도조절가능한 7segment 생성
            function display_segment(id, value, digit, dwidth, dheight, dangle) {
                var segtext = value.toString();
                var spacetext = "";
                if (segtext.length < digit) {
                    for (var i = 0; i < digit - segtext.length; i++) {
                        spacetext = spacetext + ' ';
                    }
                }

                var patternDgt = "";
                for (var i = 0; i < digit; i++) {
                    patternDgt = patternDgt + "#";
                }

                var display = new SegmentDisplay(id);
                display.pattern = patternDgt;
                display.cornerType = 2;
                display.displayType = 7;
                display.displayAngle = dangle;
                display.digitHeight = dheight;
                display.digitWidth = dwidth;
                display.digitDistance = 2;
                display.segmentWidth = 3;
                display.segmentDistance = 0.5;
                display.colorOn = "rgba(0, 255, 0, 0.9)";
                display.colorOff = "rgba(100, 106, 130, 0.1)";
                display.setValue(spacetext + segtext);

            }
            
            display_segment("dgt_bar", 99999, 5, 12, 20, 10);
            display_segment("dgt_seven", 99999, 5, 12, 20, 10);
            display_segment("dgt_star", 99999, 5, 12, 20, 10);
            display_segment("dgt_watermelons", 99999, 5, 12, 20, 10);
            display_segment("dgt_alarm", 99999, 5, 12, 20, 10);
            display_segment("dgt_coconut", 99999, 5, 12, 20, 10);
            display_segment("dgt_orange", 99999, 5, 12, 20, 10);
            display_segment("dgt_apple", 99999, 5, 12, 20, 10);
            display_segment("dice_odd", 99999, 5, 12, 20, 10);
            display_segment("dice_even", 99999, 5, 12, 20, 10);
            display_segment("dice_big", 99999, 5, 12, 20, 10);
            display_segment("dice_small", 99999, 5, 12, 20, 10);
            
            display_segment("dgt_bar_rate", bet_item_rate[0], 3, 12, 20, 3);
            display_segment("dgt_seven_rate", bet_item_rate[1], 3, 12, 20, 3);
            display_segment("dgt_star_rate", bet_item_rate[2], 3, 12, 20, 3);
            display_segment("dgt_watermelons_rate", bet_item_rate[3], 3, 12, 20, 3);
            display_segment("dgt_alarm_rate", bet_item_rate[4], 3, 12, 20, 3);
            display_segment("dgt_coconut_rate", bet_item_rate[5], 3, 12, 20, 3);
            display_segment("dgt_orange_rate", bet_item_rate[6], 3, 12, 20, 3);
            display_segment("dgt_apple_rate", bet_item_rate[7], 3, 12, 20, 3);
            display_segment("dice_odd_rate", 198, 3, 12, 20, 3);
            display_segment("dice_even_rate", 198, 3, 12, 20, 3);
            display_segment("dice_big_rate", 198, 3, 12, 20, 3);
            display_segment("dice_small_rate", 198, 3, 12, 20, 3);

     
            var msg = PostAjax("/Ajax/spinlog.ashx", "");
            alert(msg);
            var myArray = new Array(7);
            myArray = msg.split('/');
            var semi = new Array(3);
            for (var i = 0; i < 7; i++) {
                semi = myArray[i].split(',');
                var cssfruit = slotlogcss[semi[0] - 1];
                var text = "<div style='width:75px;height:80px' class='" + cssfruit + "'></div>"
                if (text.length) {
                    $('<li />', { html: text }).appendTo('ul.slot_log')
                }
                //$("#slot_log").scrollTop($("#slot_log")[0].scrollHeight);

                var csstaisai = taisailogcss[semi[1]];
                var text = "<div style='width:75px;height:80px' class='" + csstaisai + "'></div>"
                if (text.length) {
                    $('<li />', { html: text }).appendTo('ul.diceTai_log')
                }
                // $("#diceTai_log").scrollTop($("#diceTai_log")[0].scrollHeight);

                var cssevodd = evoddlogcss[semi[2]];
                var text = "<div style='width:75px;height:80px' class='" + cssevodd + "'></div>"
                if (text.length) {
                    $('<li />', { html: text }).appendTo('ul.diceodd_log')
                }
                //$("#diceodd_log").scrollTop($("#diceodd_log")[0].scrollHeight);
            }
        </script>
    </div>
    </form>
</body>
</html>
