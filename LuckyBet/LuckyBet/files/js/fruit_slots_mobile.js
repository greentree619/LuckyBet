    var ben_txtheight=91;
    var mainframeBorder = 350;
    var b_d_height = 62;
    var dgt_width = 69;
    var sectime =120;
    var dice_point = 0;
    var bet_rate = 1.96;
    var bet_state = 0;
    var coin = 0;
    var num_rate = 1;

    var spin_eff_sound = 0;
    var betbtn_eff_sound = 0;
    var finshbtn_eff_sound = 0;
    var initbtn_eff_sound = 0;
    var selchip_eff_sound = 0;   
    var bg_sound = 0;
    var luckspin_eff_sound = 0;
    var luck_eff_sound = 0;
    var countdown_eff_sound = 0;
    var countdown_1_sound = 0
    var countdown_2_sound = 0;
    var countdown_3_sound = 0;
    var countdown_go_sound = 0;
    var betting_start_sound = 0;
    var betting_stop_sound = 0;
    
    var apple_sound_eff = 0;
    var orenge_sound_eff = 0;
    var mongo_sound_eff = 0;
    var bell_sound_eff = 0;
    var watermellon_sound_eff = 0;
    var star_sound_eff = 0;
    var seven_sound_eff = 0;
    var bar_sound_eff = 0;
    

    var csstypell = ['b_apple', 's_apple', 'b_coconut', 'b_watermelons', 's_watermelons', 'b_cha',
        'b_apple', 's_orange', 'b_orange', 'b_alarm', 's_seven', 'b_seven', 'b_apple',  's_coconut',
        'b_coconut', 'b_star', 's_star', 'cha', 'b_apple', 's_alarm', 'b_orange', 'b_alarm', 's_bar', 'b_bar'];
    var slotlogcss = ['m_b_apple', 'm_s_apple', 'm_b_coconut', 'm_b_watermelons', 'm_s_watermelons', 'm_b_cha',
            'm_b_apple', 'm_s_orange', 'm_b_orange', 'm_b_alarm', 'm_s_seven', 'm_b_seven', 'm_b_apple', 'm_s_coconut',
            'm_b_coconut', 'm_b_star', 'm_s_star', 'm_cha', 'm_b_apple', 'm_s_alarm', 'm_b_orange', 'm_b_alarm', 'm_s_bar', 'm_b_bar'];
    var taisailogcss = ['_dice_smallm_', '_dice_bigm_'];
    var evoddlogcss = ['_dice_evenm_', '_dice_oddm_'];

    var item_name = ['大苹果', '小苹果', '大芒果', '大西瓜', '小西瓜', 'Luck',
        '大苹果', '小橙子', '大橙子', '大钟', '小七七', '大七七', '大苹果', '小芒果',
        '大芒果', '大星星', '小星星', 'Luck', '大苹果', '小钟', '大橙子', '大钟', '小吧', '大吧'];

    ///   Angle-adjustable 7-segment creation
    function display_segment(id, value, digit, dwidth, dheight, dangle) {
        var segtext = value.toString();
        var spacetext = "";
        if (segtext.length < digit)
          {
              for(var i=0; i< digit-segtext.length; i++)
             {
                 spacetext = spacetext + ' ';
              }
          }

        var patternDgt = "";
        for(var i=0; i< digit; i++)
        {
            patternDgt = patternDgt + "#";
        }

        var display = new SegmentDisplay(id);
        display.pattern         = patternDgt;
        display.cornerType      = 2;
        display.displayType     = 7;
        display.displayAngle    = dangle;
        display.digitHeight     = dheight;
        display.digitWidth      = dwidth;
        display.digitDistance   = 2;
        display.segmentWidth    = 3;
        display.segmentDistance = 0.5;
        display.colorOn         = "rgba(0, 255, 0, 0.9)";
        display.colorOff        = "rgba(100, 106, 130, 0.1)";
        display.setValue(spacetext + segtext);

    }

/// 7 segment generation for 11-digit display///
    function digit7_total(id, value, digit) {
        var segtext = value.toString();
        var spacetext = "";
        if (segtext.length < digit)
        {
            for(var i=0; i< digit-segtext.length; i++)
            {
                spacetext = spacetext + ' ';
            }
        }
        $(document).ready(function () {
            $(id).jqSegmentedDisplay({
                background: '#5B2D00',
                border: {
                    padding: 0,
                    lineWidth: 0,
                    strokeStyle: '#5B2D00'
                },
                digits: digit,
                segmentMode: 'sevenSegment',
                text: spacetext + segtext,
                textForeground: '#F3E967',
                textForegroundUnlit: 'rgba(60, 44, 0, 0.5)'
            });
        });
    }
 

/// set property ///
    function wLaoHuJi(id) {
        this.frameid = id;
        this._doc = document;
        this._config = { 
            cardwidth: 98,
            cardheight: 98,
            betcardwidth:57,
            betcardheight:90,
            margin:5,
            maxbet: 9999,
        };
        this._piecelist = [];
        // rate per assignment.
        this._multitype = {
            "b_bar":120,
            "s_bar":50,
            "b_seven": 40,
            "b_star":30,
            "b_watermelons":20,
            "b_alarm":20,
            "b_coconut":15,
            "b_orange":10,
            "b_apple":5,
            "small":2,
            "cha":0
        };
        this._piecelistposition = {};
        this._piecelistmulti = {};
        this._piecelisttype = {};

        this._money = 0;
        this._total = usercoin;           //The default value of holding money is 100 points.
        this._startbox = 1;         //上次结果，此次的起点  starting point
        this._endbox = 1;          //这是这次的结果
        this._jumpnum = 1;        //这些需要算出来
        this._currentshowlist = [1];  
        
        //(状态值)(game state)
        this._isfirstbet = true;
        this._isrun = false;
        //定时器(timer)
        this._interval = null;
        
        this._mainDiv = null;
        this.frame = {
            "piece": {"bg":null,"run":null},
            "bet": null
        };
        this._self = this;
        for (var i = 1; i < 25; i++) {
            this._piecelist.push(i);
        }
    }

    wLaoHuJi.prototype.$ = function(id) {
        if (!this._doc) {
            this._doc = document;
        }
        if (id && typeof (id) === "string") {
            return this._doc.getElementById(id);
        }
        return null;
    };


    wLaoHuJi.prototype.isArray = function(obj) {
        return Object.prototype.toString.call(obj) === '[object Array]';
    }

    wLaoHuJi.prototype.in_Array = function(arr, e) {
        for (var i = 0; i < arr.length; i++) {
            if (arr[i] == e)
                return true;
        }
        return false;
    }
    
    //生成随机数
    wLaoHuJi.prototype.rand = function(min, max) {
        return parseInt(Math.random() * (max - min + 1) + min);
    }

// Spinbox comprehensive information (box type, css class name, box number, box name)
    wLaoHuJi.prototype._getpieceinfo = function(i, j) {
        switch (i + "-" + j) {
            case "0-0":
                return { "type":"orange","css": "b_orange", "list": 21, "multi": "b_orange" };
            case "0-1":
                return { "type": "alarm", "css": "b_alarm", "list": 22, "multi": "b_alarm" };
            case "0-2":
                return { "type": "bar", "css": "s_bar", "list": 23, "multi": "s_bar" };
            case "0-3":
                return { "type": "bar", "css": "b_bar", "list": 24, "multi": "b_bar" };
            case "0-4":
                return { "type": "apple", "css": "b_apple", "list": 1, "multi": "b_apple" };
            case "0-5":
                return { "type": "apple", "css": "s_apple", "list": 2, "multi": "small" };
            case "0-6":
                return { "type": "coconut", "css": "b_coconut", "list": 3, "multi": "b_coconut" };
            case "1-0":
                return { "type": "alarm", "css": "s_alarm", "list": 20, "multi": "small" };
            case "2-0":
                return { "type": "apple", "css": "b_apple", "list": 19, "multi": "b_apple" };
            case "3-0":
                return { "type": "cha", "css": "cha", "list": 18, "multi": "cha" };
            case "4-0":
                return { "type": "star", "css": "s_star", "list": 17, "multi": "small" };
            case "5-0":
                return { "type": "star", "css": "b_star", "list": 16, "multi": "b_star" };
            case "6-0":
                return { "type": "coconut", "css": "b_coconut", "list": 15, "multi": "b_coconut" };
            case "6-1":
                return { "type": "coconut", "css": "s_coconut", "list": 14, "multi": "small" };
            case "6-2":
                return { "type": "apple", "css": "b_apple", "list": 13, "multi": "b_apple" };
            case "6-3":
                return { "type": "seven", "css": "b_seven", "list": 12, "multi": "b_seven" };
            case "6-4":
                return { "type": "seven", "css": "s_seven", "list": 11, "multi": "small" };
            case "6-5":
                return { "type": "alarm", "css": "b_alarm", "list": 10, "multi": "b_alarm" };
            case "6-6":
                return { "type": "orange", "css": "b_orange", "list": 9, "multi": "b_orange" };
            case "5-6":
                return { "type": "orange", "css": "s_orange", "list": 8, "multi": "small" };
            case "4-6":
                return { "type": "apple", "css": "b_apple", "list": 7, "multi": "b_apple" };
            case "3-6":
                return { "type": "cha", "css": "b_cha", "list": 6, "multi": "b_cha" };
            case "2-6":
                return { "type": "watermelons", "css": "s_watermelons", "list": 5, "multi": "small" };
            case "1-6":
                return { "type": "watermelons", "css": "b_watermelons", "list": 4, "multi": "b_watermelons" };
            default:
                return { "type": "", "css": "", "list": 0, "multi": "" };
        }
    };

    //显示单个或多个灯
    ////  Displaying boxes that move on spin ////
    wLaoHuJi.prototype.showbox = function(index) {
        var i, len, tpleft, tptop, box = '', indexj;
        var  cssString ='';
        if (typeof (index) === 'number' && index > 0 && index < 25) {
            //tpleft = this._piecelistposition[index].left;
            //tptop = this._piecelistposition[index].top;
            //var cssString = csstypell[index-1];
            //box = "<div style='position:absolute;width:" + this._config.cardwidth + "px;height:" + this._config.cardheight + "px;left:" + tpleft + "px;top:" + tptop + "px;' class='"+ cssString +"'></div>";
            //this.frame.piece.run.innerHTML = box;           
            if (index > 24) index = index - 24;
            if (index > 48) index = index - 48;
            if (index > 72) index = index - 72;
            if (index > 96) index = index - 96;
            indexj = index - 1;
            if (indexj == 0) indexj = 24;
            document.getElementById(indexj).style.display = 'none';
            document.getElementById(index).style.display = 'block';
            spin_eff_sound = 1;
        }
        else if (this.isArray(index) && index.length > 0) {
            len = index.length;
            for (i = 0; i < len; i++) {
                //tpleft = this._piecelistposition[index[i]].left;
                //tptop = this._piecelistposition[index[i]].top;
                //cssString = csstypell[index-1];
                //box += "<div style='position:absolute;width:" + this._config.cardwidth + "px;height:" + this._config.cardheight + "px;left:" + tpleft + "px;top:" + tptop + "px;' class='"+ cssString +"'></div>";
                if (index > 24) index = index - 24;
                if (index > 48) index = index - 48;
                if (index > 72) index = index - 72;
                if (index > 96) index = index - 96;
                indexj = index - 1;
                if (indexj == 0) indexj = 24;
                document.getElementById(indexj).style.display = 'none';
                document.getElementById(index).style.display = 'block';
            }
            //this.frame.piece.run.innerHTML = box;
            spin_eff_sound = 1;
        }
    }

    //每次改变需要显示的box，返回速度 
    // Adjust speed increase/decrease at start and end of slot machine (Start: 300,250,210...150/ End: 70, ...,300,360,430 ms increase/decrease)
    wLaoHuJi.prototype.changeshowlist = function(jumpindex) {
        var i,
            len = this._currentshowlist.length,
            jumpmax = this._jumpnum;
        switch (jumpindex) {
            case 0:
                var v = this._currentshowlist[0] + 1;
                this._currentshowlist.length = 0;
                v = v > 24 ? v - 24 : v;
                this._currentshowlist[0] = v;                
                return 300;
            case 1:
                var v = this._currentshowlist[0] + 1;
                this._currentshowlist.length = 0;
                v = v > 24 ? v - 24 : v;
                this._currentshowlist[0] = v;               
                return 250;
            case 2:
                var v = this._currentshowlist[0] + 1;
                this._currentshowlist.length = 0;
                v = v > 24 ? v - 24 : v;
                this._currentshowlist[0] = v;                
                return 210;
            case 3:
                var v = this._currentshowlist[0] + 1;
                this._currentshowlist.length = 0;
                v = v > 24 ? v - 24 : v;
                this._currentshowlist[0] = v;                
                return 180;
            case 4:
                var v = this._currentshowlist[0] + 1;
                this._currentshowlist.length = 0;
                v = v > 24 ? v - 24 : v;
                this._currentshowlist[0] = v;                
                return 160;
            case 5:
                var v = this._currentshowlist[0] + 1;
                this._currentshowlist.length = 0;
                v = v > 24 ? v - 24 : v;
                this._currentshowlist[0] = v;                
                return 150;
            case jumpmax - 1:
                var v = this._currentshowlist[0] + 1;
                this._currentshowlist.length = 0;
                v = v > 24 ? v - 24 : v;
                this._currentshowlist[0] = v;
                return 430;
            case jumpmax - 2:
                var v = this._currentshowlist[0] + 1;
                this._currentshowlist.length = 0;
                v = v > 24 ? v - 24 : v;
                this._currentshowlist[0] = v;
                return 360;
            case jumpmax - 3:
                var v = this._currentshowlist[0] + 1;
                this._currentshowlist.length = 0;
                v = v > 24 ? v - 24 : v;
                this._currentshowlist[0] = v;
                return 300;
            case jumpmax - 4:
                var v = this._currentshowlist[0] + 1;
                this._currentshowlist.length = 0;
                v = v > 24 ? v - 24 : v;
                this._currentshowlist[0] = v;
                return 250;
            case jumpmax - 5:
                var v = this._currentshowlist[0] + 1;
                this._currentshowlist.length = 0;
                v = v > 24 ? v - 24 : v;
                this._currentshowlist[0] = v;
                return 210;
            case jumpmax - 6:
                var v = this._currentshowlist[0] + 1;
                this._currentshowlist.length = 0;
                v = v > 24 ? v - 24 : v;
                this._currentshowlist[0] = v;
                return 180;
            case jumpmax - 7:
                var v = this._currentshowlist[0] + 1;
                this._currentshowlist.length = 0;
                v = v > 24 ? v - 24 : v;
                this._currentshowlist[0] = v;                
                return 160;
            case jumpmax - 8:
                var v = this._currentshowlist[0] + 1;
                this._currentshowlist.length = 0;
                v = v > 24 ? v - 24 : v;
                this._currentshowlist[0] = v;
                return 150;
            default:
                for (i = 0; i < len; i++) {
                    this._currentshowlist[i]++;
                    if (this._currentshowlist[i] > 24) {
                        this._currentshowlist[i] -= 24;
                    }
                }
                return 40;
        }
    }


/////****   slot machine spin play  /////
    wLaoHuJi.prototype.run = function() {
        var self = this._self,
            time = 500,
            inx = 0,
            shownum = 1,
            boxmax = this._config.runboxlength,
            runloopnum = 0,
            jumpmax = this._jumpnum,
            jumpindex = 0,
            timer = null;
        function timerdo() {
            time = self.changeshowlist(jumpindex);
            self.showbox(self._currentshowlist);
            jumpindex++;
            if (jumpindex >= jumpmax) {
                clearTimeout(timer);
                self._startbox = self._endbox;
                setTimeout(function() { self.result(); }, 200);
            }
            else {
                timer = setTimeout(timerdo, time);
            }
        }
        timerdo();
    }
 

/////*****   Calculate gameplay/betting results start *****/////
    wLaoHuJi.prototype.result = function () {      

        var winbox = this._endbox;  // spinning endbox
        var taisai = 0;
        var evodd = 1;
        var type = this._piecelisttype[winbox];  // spinning endbox type        

        // slot machine log
        var cssName = slotlogcss[winbox - 1];
        var text = "<div style='width:65px;height:60px' class='" + cssName + "'></div>"
        if (text.length) {
            //   $('<li />', { html: text }).appendTo('ul.slot_log')
            $('<li />', { html: text }).prependTo('ul.slot_log')
        }
        //$("#slot_log").scrollTop($("#slot_log")[0].scrollHeight);     
        ///////////////////////

        if (type == "cha" || winbox == 6) {  //Handling when spin-end in luck
            //未得奖，或别的奖，暂无        
            luck_eff_sound = 1; //effect sound            

            var rst = PostAjax("/Ajax/game_result.ashx");
            var grst = new Array(5);
            grst = rst.split(',');
            var aa = parseInt(grst[0]);
            var bb = parseInt(grst[1]);
            var cc = parseInt(grst[2]);
            var dd = parseInt(grst[3]);
            var ee = parseInt(grst[4]);

            var type1 = this._piecelisttype[aa];
            var betid1 = "lhj_bet_txt_" + type1;
            var type2 = this._piecelisttype[bb];
            var betid2 = "lhj_bet_txt_" + type2;
            var type3 = this._piecelisttype[cc];
            var betid3 = "lhj_bet_txt_" + type3;
            if(dd != 0) {
                var type4 = this._piecelisttype[dd];
                var betid4 = "lhj_bet_txt_" + type4;
            }
            if(ee != 0) {
                var type5 = this._piecelisttype[ee];
                var betid5 = "lhj_bet_txt_" + type5;
            }
            parseInt(this.$(betid1).value);
            if (bet_state == 1) {
                this._money = parseInt(this._piecelistmulti[aa]) * parseInt(this.$(betid1).value);
                this._money += parseInt(this._piecelistmulti[bb]) * parseInt(this.$(betid2).value);
                this._money += parseInt(this._piecelistmulti[cc]) * parseInt(this.$(betid3).value);
                if (dd != 0) this._money += parseInt(this._piecelistmulti[dd]) * parseInt(this.$(betid4).value);
                if (ee != 0) this._money += parseInt(this._piecelistmulti[ee]) * parseInt(this.$(betid5).value);
            }

            var showtimet = 1500;
            ////tail
            if (ee == 2 || ee == 3)
            {
                showtimet = 3500;
                var tail_len = 0;
                if (ee == 2) tail_len = 3;
                if (ee == 3) tail_len = 4;
                for (i = winbox + 1; i <= (winbox + tail_len) ; i++) {
                    (function (i) {
                        this.setTimeout(function () {
                            document.getElementById(i).style.display = 'block';
                            spin_eff_sound = 1; //effect sound
                            bflat.play();
                        }, 200 * (i - winbox));
                    })(i);
                }

                var i = winbox;
                function trail() {
                    if (i < (24 * 2 + aa)) {
                        var ir = i;
                        if (ir > 24) { ir = i % 24; }
                        if (i == 48) ir = 24;
                        document.getElementById(ir).style.display = 'none';
                        var ii = ir + tail_len;
                        if (ii > 24) { ii = ii % 24; }
                        document.getElementById(ii).style.display = 'block';
                        luckspin_eff_sound = 1;    //effect sound                        
                        i++;
                        var t = 0;
                        if (i > (48 + aa - 10)) t = i * 2;
                        tid = setTimeout(trail, 20 + t);
                    } else {
                        clearTimeout(tid);
                        return;
                    }
                }
                setTimeout(trail, 1200);
            }
            if (ee != 0) {
                setTimeout(function () {
                    document.getElementById(aa).style.display = 'block';
                    spin_eff_sound = 1;     //effect sound                
                    setTimeout(function () {
                        document.getElementById(bb).style.display = 'block';
                        spin_eff_sound = 1;     //effect sound                    
                        setTimeout(function () {
                            document.getElementById(cc).style.display = 'block';
                            spin_eff_sound = 1;     //effect sound                        
                            setTimeout(function () {
                                if (dd != 0) {
                                    document.getElementById(dd).style.display = 'block';
                                    spin_eff_sound = 1;     //effect sound                                
                                }
                                //tTimeout(function () {
                                //    if (ee != 0)  document.getElementById(ee).style.display = 'block';

                                setTimeout(function () {
                                    document.getElementById(aa).style.display = 'none';
                                    document.getElementById(bb).style.display = 'none';
                                    document.getElementById(cc).style.display = 'none';
                                    if (dd != 0) document.getElementById(dd).style.display = 'none';
                                    if (ee != 0) document.getElementById(ee).style.display = 'none';
                                }, 3000);
                                // 500);
                            }, 500);
                        }, 500);
                    }, 500);
                }, showtimet);
            }
        }
        else {  // Handling normal spin results
            //effect sound
            if (winbox == 1 || winbox == 2 || winbox == 7 || winbox == 13 || winbox == 19) apple_sound_eff = 1;
            if (winbox == 8 || winbox == 9 || winbox == 21) orenge_sound_eff = 1;
            if (winbox == 3 || winbox == 15 || winbox == 14) mongo_sound_eff = 1;
            if (winbox == 10 || winbox == 20 || winbox == 22) bell_sound_eff = 1;
            if (winbox == 4 || winbox == 5) watermellon_sound_eff = 1;
            if (winbox == 16 || winbox == 17) star_sound_eff = 1;
            if (winbox == 11 || winbox == 12) seven_sound_eff = 1;
            if (winbox == 23 || winbox == 24) bar_sound = 1;
            
            var betid = "lhj_bet_txt_" + type;
            var betnum = parseInt(this.$(betid).value);
            if (betnum > 0 && bet_state == 1) {
                this._money = parseInt(this._piecelistmulti[winbox]) * betnum;
                this.$('lhj_ben_txt_money').innerHTML = this._money;                
            }
        }

        if(this._money > 0)
        {   // When an item is hit in a spin, the hit and dividend result are displayed on the game log window
            var text = "<span style='color:red; font-size:14px'>恭喜 </span>";
            text += " " + username + " ";
            text+= "<span style='color:black; font-size:14px'> 猜中 </span>";
            text+= " '"+item_name[winbox-1].toString()+"' ";
            text+= "<span style='color:black; font-size:14px'>  获得 </span>";
            text+= this._money.toString()+"金市";

            if(text.length){
                $('<li />', {html: text}).appendTo('ul.total_log')
            }
            $("#total_log").scrollTop($("#total_log")[0].scrollHeight);
        }

        var text1 = "";
        if (bet_state == 1) { // When the betting confirmation button is pressed
            if (dice_point < 11) { // Spread the hit and dividend result to the game log window when hitting 'cow' in Daisai
                this._money = parseInt(this._money + (dice_bet_txt_small.value) * bet_rate);
                if ((dice_bet_txt_small.value) * bet_rate > 0) {
                    text1 = "<span style='color:red; font-size:14px'>恭喜 </span>";
                    text1 += " " + username + " ";
                    text1 += "<span style='color:black; font-size:14px'> 猜中 '</span>";
                    text1 += "<span style='color:red; font-size:14px'>小</span>";
                    text1 += "<span style='color:black; font-size:14px'>'  获得 </span>";
                    text1 += (parseInt((dice_bet_txt_small.value) * bet_rate)).toString() + "金市";
                    $('<li />', { html: text1 }).appendTo('ul.total_log')
                    $("#total_log").scrollTop($("#total_log")[0].scrollHeight);
                }
            } else { // Spread the hit and payout result to the game log window when hitting 'large' in Daisai
                this._money = parseInt(this._money + (dice_bet_txt_big.value) * bet_rate);
                if ((dice_bet_txt_big.value) * bet_rate > 0) {
                    text1 = "<span style='color:red; font-size:14px'>恭喜 </span>";
                    text1 += " " + username + " ";
                    text1 += "<span style='color:black; font-size:14px'> 猜中 '</span>";
                    text1 += "<span style='color:red; font-size:14px'>大</span>";
                    text1 += "<span style='color:black; font-size:14px'>'  获得 </span>";
                    text1 += (parseInt((dice_bet_txt_big.value) * bet_rate)).toString() + "金市";
                    $('<li />', { html: text1 }).appendTo('ul.total_log')
                    $("#total_log").scrollTop($("#total_log")[0].scrollHeight);
                }
            }
            if (dice_point % 2 == 0) { // Spread the hit and payout result to the game log window when hitting 'pair' in Daisai
                this._money = parseInt(this._money + (dice_bet_txt_even.value) * bet_rate);
                if ((dice_bet_txt_even.value) * bet_rate > 0) {
                    text1 = "<span style='color:red; font-size:14px'>恭喜 </span>";
                    text1 += " " + username + " ";
                    text1 += "<span style='color:black; font-size:14px'> 猜中 '</span>";
                    text1 += "<span style='color:red; font-size:14px'>双</span>";
                    text1 += "<span style='color:black; font-size:14px'>'  获得 </span>";
                    text1 += (parseInt((dice_bet_txt_even.value) * bet_rate)).toString() + "金市";
                    $('<li />', { html: text1 }).appendTo('ul.total_log')
                    $("#total_log").scrollTop($("#total_log")[0].scrollHeight);
                }
            } else {  // Spread the hit and payout result to the game log window when hitting the 'hole' in Daisai
                this._money = parseInt(this._money + (dice_bet_txt_odd.value) * bet_rate);
                if ((dice_bet_txt_odd.value) * bet_rate > 0) {
                    text1 = "<span style='color:red; font-size:14px'>恭喜 </span>";
                    text1 += " " + username + " ";
                    text1 += "<span style='color:black; font-size:14px'> 猜中 '</span>";
                    text1 += "<span style='color:red; font-size:14px'>单</span>";
                    text1 += "<span style='color:black; font-size:14px'>'  获得 </span>";
                    text1 += (parseInt((dice_bet_txt_odd.value) * bet_rate)).toString() + "金市";
                    $('<li />', { html: text1 }).appendTo('ul.total_log')
                    $("#total_log").scrollTop($("#total_log")[0].scrollHeight);
                }
            }
            
            coin = this._money - coin;
           
        }
        bet_state = 0;
        
        if (dice_point > 10) taisai = 1;
        if (dice_point % 2 == 0) evodd = 0;

        // Dice logging start
        var csstaisai = taisailogcss[taisai];
        var text = "<div style='width:45px;height:48px' class='" + csstaisai + "'></div>"
        if (text.length) {
            $('<li />', { html: text }).prependTo('ul.diceTai_log')
        }
        //$("#diceTai_log").scrollTop($("#diceTai_log")[0].scrollHeight);

        var cssevodd = evoddlogcss[evodd];
        var text = "<div style='width:45px;height:48px' class='" + cssevodd + "'></div>"
        if (text.length) {
            $('<li />', { html: text }).prependTo('ul.diceodd_log')
        }
        //$("#diceodd_log").scrollTop($("#diceodd_log")[0].scrollHeight);
        // Dice logging end
        
        this._isfirstbet = true;
        this._isrun = false;
        $("#red_lamp").attr("src", "/files/image/images/led-green.png");        
        this.$('bet_finish').disabled = false;

    }
/////*****   Calculating Gameplay/Betting Results end *****/////


/////*****  Initialization and basic logic executed when the page loads /////
    wLaoHuJi.prototype.init = function() {
        var i, j, piecewidth, pieceheight, betwidth, betheight, tnhtml, piecehtml, bethtml, advwidth, advheight, advleft, advtop, bsheight, self = this._self;
        var game = new Phaser.Game(0, 0, Phaser.CANVAS, 'phaser-example', { preload: preload, create: create, update: update });

        function preload() {
            game.load.audio('bg_music', ['assets/music/bg.mp3', 'assets/music/bg.m4a']);
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

        ///  Set basic div attribute values divided into play part (lhj_piece_run) and betting part (lhj_bet) ///
        this._mainDiv = this.$(this.frameid);
        if (!this._mainDiv) {
            alert(id + "不存在");
            return;
        }
        piecewidth = (this._config.cardwidth + this._config.margin) * 7 + this._config.margin + 2;
        pieceheight = (this._config.cardheight + this._config.margin) * 7 + this._config.margin + 2 + ben_txtheight;
        betwidth = (this._config.betcardwidth + this._config.margin) * 8 + this._config.margin + 2;
        betheight = (this._config.betcardwidth + this._config.margin + 100)* 2 ;
        this._mainDiv.style.border = "1px solid green";
        this._mainDiv.style.width = 720 + "px";
        this._mainDiv.style.height = 720 + "px";
        this._mainDiv.style.margin = "0";
        this._mainDiv.style.padding = "0";
        //this._mainDiv.id = "Game_mainframe";

        ///  Basic div saddle divided into play part (lhj_piece_run) and betting part (lhj_bet) ///
        mainhtml = "<div style = 'position: relative;top:0px;left:0px;width:" + piecewidth + "px;height:" + pieceheight + "px;'><div id='lhj_piece_bg' style='position:absolute;top:0,left:0;z-index:101;'></div><div id='lhj_piece_run' style='position:absolute;top:0,left:0;z-index:102;'></div></div><div id='lhj_bet'> </div>";
        this._mainDiv.innerHTML = mainhtml;
        this.frame.piece.bg = this.$('lhj_piece_bg'); //this._mainDiv.childNodes[0].childNodes[0].childNodes[0];
        this.frame.piece.run = this.$('lhj_piece_run');
        this.frame.bet = this.$('lhj_bet'); //this._mainDiv.childNodes[0].childNodes[0].childNodes[1];

        //初始化piece
        piecehtml = [];

        ///  Hidden text input window Betting dividend amount/usercoin balance  ///
        piecehtml.push("<span class='lhj_span'><br /><span class='lhj_input lhj_money_input' id='lhj_ben_txt_money' />0</span></span>"); //배팅배당금액  text입력창
        piecehtml.push("<span class='lhj_span'><br /><span class='lhj_input lhj_money_input' id='lhj_ben_txt_total' />0</span></span>"); //usercoin잔액  text입력창
      
        ///   Betting dividend amount && usercoin balance 7segment   ////
        piecehtml.push("<div id='txt_money_7dgt' style='width:307px; height:38px; position: absolute; left:0px; top:0px'></div>");   ///배팅배당금액  7segment
        piecehtml.push("<div id='txt_total_7dgt' style='width:307px; height:38px; position: absolute; left:320px; top:0px'></div>");   ///usercoin잔액  7segment
        piecehtml.push("<canvas id='countdown' style='width:80px; height:30px; position: absolute; left:310px; top:150px'></canvas>");  ///count down 7segment

        ////   Slot machine spinning box saddles (24 pieces) Currently replaced with background images (not shown)
        for (i = 0; i < 7; i++) {
            for (j = 0; j < 7; j++) {
                if (i == 0 || j == 0 || i == 6 || j == 6) {
                    var tpleft = j * (this._config.cardwidth + this._config.margin);
                    var tptop = i * (this._config.cardheight + this._config.margin);
                    var tpinfo = this._getpieceinfo(i, j);
                    piecehtml.push("<div id='" + tpinfo.list + "' style='position:absolute;width:" + this._config.cardwidth + "px;height:" + this._config.cardheight + "px;left:" + tpleft + "px;top:" + tptop + "px; display: none' class='piece " + tpinfo.css + "'></div>");
                    this._piecelistposition[tpinfo.list] = { left: tpleft, top: tptop };
                    this._piecelistmulti[tpinfo.list] = this._multitype[tpinfo.multi];
                    this._piecelisttype[tpinfo.list] = tpinfo.type;
                }
            }
        }

   
        ////    Dice rolling result point value display 7 segment saddle
        piecehtml.push("<canvas id='taisai_result' style='width:80px; height:38px; position: absolute; left:318px; top:370px'></canvas>");
        ////    1's Dice set  ////
        piecehtml.push("<div id='platform' style='position: absolute; left:232px; top:427px'>");
        piecehtml.push("    <div id='dice'>");
        piecehtml.push("        <div class='side front'>");
        piecehtml.push("            <div class='dot center'></div>");
        piecehtml.push("        </div>");
        piecehtml.push("        <div class='side front inner'></div>");
        piecehtml.push("        <div class='side top'>");
        piecehtml.push("            <div class='dot dtop dleft'></div>");
        piecehtml.push("            <div class='dot dbottom dright'></div>");
        piecehtml.push("        </div>");
        piecehtml.push("        <div class='side top inner'></div>");
        piecehtml.push("        <div class='side right'>");
        piecehtml.push("            <div class='dot dtop dleft'></div>");
        piecehtml.push("            <div class='dot center'></div>");
        piecehtml.push("            <div class='dot dbottom dright'></div>");
        piecehtml.push("        </div>");
        piecehtml.push("        <div class='side right inner'></div>");
        piecehtml.push("        <div class='side left'>");
        piecehtml.push("            <div class='dot dtop dleft'></div>");
        piecehtml.push("            <div class='dot dtop dright'></div>");
        piecehtml.push("            <div class='dot dbottom dleft'></div>");
        piecehtml.push("            <div class='dot dbottom dright'></div>");
        piecehtml.push("        </div>");
        piecehtml.push("        <div class='side left inner'></div>");
        piecehtml.push("        <div class='side bottom'>");
        piecehtml.push("            <div class='dot center'></div>");
        piecehtml.push("            <div class='dot dtop dleft'></div>");
        piecehtml.push("            <div class='dot dtop dright'></div>");
        piecehtml.push("            <div class='dot dbottom dleft'></div>");
        piecehtml.push("            <div class='dot dbottom dright'></div>");
        piecehtml.push("        </div>");
        piecehtml.push("        <div class='side bottom inner'></div>");
        piecehtml.push("        <div class='side back'>");
        piecehtml.push("            <div class='dot dtop dleft'></div>");
        piecehtml.push("            <div class='dot dtop dright'></div>");
        piecehtml.push("            <div class='dot dbottom dleft'></div>");
        piecehtml.push("            <div class='dot dbottom dright'></div>");
        piecehtml.push("            <div class='dot center dleft'></div>");
        piecehtml.push("            <div class='dot center dright'></div>");
        piecehtml.push("        </div>");
        piecehtml.push("        <div class='side back inner'></div>");
        piecehtml.push("        <div class='side cover x'></div>");
        piecehtml.push("        <div class='side cover y'></div>");
        piecehtml.push("        <div class='side cover z'></div>");
        piecehtml.push("    </div>");
        piecehtml.push("</div>");
        ////    2's Dice set  ////
        piecehtml.push("<div id='platform1' style='position: absolute; left:330px; top:427px'>");
        piecehtml.push("    <div id='dice1'>");
        piecehtml.push("        <div class='side front'>");
        piecehtml.push("            <div class='dot center'></div>");
        piecehtml.push("        </div>");
        piecehtml.push("        <div class='side front inner'></div>");
        piecehtml.push("        <div class='side top'>");
        piecehtml.push("            <div class='dot dtop dleft'></div>");
        piecehtml.push("            <div class='dot dbottom dright'></div>");
        piecehtml.push("        </div>");
        piecehtml.push("        <div class='side top inner'></div>");
        piecehtml.push("        <div class='side right'>");
        piecehtml.push("            <div class='dot dtop dleft'></div>");
        piecehtml.push("            <div class='dot center'></div>");
        piecehtml.push("            <div class='dot dbottom dright'></div>");
        piecehtml.push("        </div>");
        piecehtml.push("        <div class='side right inner'></div>");
        piecehtml.push("        <div class='side left'>");
        piecehtml.push("            <div class='dot dtop dleft'></div>");
        piecehtml.push("            <div class='dot dtop dright'></div>");
        piecehtml.push("            <div class='dot dbottom dleft'></div>");
        piecehtml.push("            <div class='dot dbottom dright'></div>");
        piecehtml.push("        </div>");
        piecehtml.push("        <div class='side left inner'></div>");
        piecehtml.push("        <div class='side bottom'>");
        piecehtml.push("            <div class='dot center'></div>");
        piecehtml.push("            <div class='dot dtop dleft'></div>");
        piecehtml.push("            <div class='dot dtop dright'></div>");
        piecehtml.push("            <div class='dot dbottom dleft'></div>");
        piecehtml.push("            <div class='dot dbottom dright'></div>");
        piecehtml.push("        </div>");
        piecehtml.push("        <div class='side bottom inner'></div>");
        piecehtml.push("        <div class='side back'>");
        piecehtml.push("            <div class='dot dtop dleft'></div>");
        piecehtml.push("            <div class='dot dtop dright'></div>");
        piecehtml.push("            <div class='dot dbottom dleft'></div>");
        piecehtml.push("            <div class='dot dbottom dright'></div>");
        piecehtml.push("            <div class='dot center dleft'></div>");
        piecehtml.push("            <div class='dot center dright'></div>");
        piecehtml.push("        </div>");
        piecehtml.push("        <div class='side back inner'></div>");
        piecehtml.push("        <div class='side cover x'></div>");
        piecehtml.push("        <div class='side cover y'></div>");
        piecehtml.push("        <div class='side cover z'></div>");
        piecehtml.push("    </div>");
        piecehtml.push("</div>");
        /////    3's Dice set  ///
        piecehtml.push("<div id='platform2' style='position: absolute; left:430px; top:427px'>");
        piecehtml.push("    <div id='dice2'>");
        piecehtml.push("        <div class='side front'>");
        piecehtml.push("            <div class='dot center'></div>");
        piecehtml.push("        </div>");
        piecehtml.push("        <div class='side front inner'></div>");
        piecehtml.push("        <div class='side top'>");
        piecehtml.push("            <div class='dot dtop dleft'></div>");
        piecehtml.push("            <div class='dot dbottom dright'></div>");
        piecehtml.push("        </div>");
        piecehtml.push("        <div class='side top inner'></div>");
        piecehtml.push("        <div class='side right'>");
        piecehtml.push("            <div class='dot dtop dleft'></div>");
        piecehtml.push("            <div class='dot center'></div>");
        piecehtml.push("            <div class='dot dbottom dright'></div>");
        piecehtml.push("        </div>");
        piecehtml.push("        <div class='side right inner'></div>");
        piecehtml.push("        <div class='side left'>");
        piecehtml.push("            <div class='dot dtop dleft'></div>");
        piecehtml.push("            <div class='dot dtop dright'></div>");
        piecehtml.push("            <div class='dot dbottom dleft'></div>");
        piecehtml.push("            <div class='dot dbottom dright'></div>");
        piecehtml.push("        </div>");
        piecehtml.push("        <div class='side left inner'></div>");
        piecehtml.push("        <div class='side bottom'>");
        piecehtml.push("            <div class='dot center'></div>");
        piecehtml.push("            <div class='dot dtop dleft'></div>");
        piecehtml.push("            <div class='dot dtop dright'></div>");
        piecehtml.push("            <div class='dot dbottom dleft'></div>");
        piecehtml.push("            <div class='dot dbottom dright'></div>");
        piecehtml.push("        </div>");
        piecehtml.push("        <div class='side bottom inner'></div>");
        piecehtml.push("        <div class='side back'>");
        piecehtml.push("            <div class='dot dtop dleft'></div>");
        piecehtml.push("            <div class='dot dtop dright'></div>");
        piecehtml.push("            <div class='dot dbottom dleft'></div>");
        piecehtml.push("            <div class='dot dbottom dright'></div>");
        piecehtml.push("            <div class='dot center dleft'></div>");
        piecehtml.push("            <div class='dot center dright'></div>");
        piecehtml.push("        </div>");
        piecehtml.push("        <div class='side back inner'></div>");
        piecehtml.push("        <div class='side cover x'></div>");
        piecehtml.push("        <div class='side cover y'></div>");
        piecehtml.push("        <div class='side cover z'></div>");
        piecehtml.push("    </div>");
        piecehtml.push("</div>");
        ////   Dice large, small, hot, single box saddle (initial hidden state)
        piecehtml.push("<div id='diceBox_big' style = 'width:85px; height:85px; background:url(/files/image/images/dice_big.png); position: absolute; left:184px; top:527px; display: none'></div>");
        piecehtml.push("<div id='diceBox_small' style = 'width:85px; height:85px; background:url(/files/image/images/dice_small.png); position: absolute; left:269px; top:527px; display: none'></div>");
        piecehtml.push("<div id='diceBox_odd' style = 'width:85px; height:85px; background:url(/files/image/images/dice_odd.png); position: absolute; left:354px; top:527px; display: none'></div>");
        piecehtml.push("<div id='diceBox_even' style = 'width:85px; height:85px; background:url(/files/image/images/dice_even.png); position: absolute; left:439px; top:527px; display: none'></div>");
        
        this.frame.piece.bg.innerHTML = piecehtml.join('');
       
        display_segment("taisai_result", dice_point, 2, 14, 20, 2);   /// Dice rolling point value 7 segment display (initial 0)
        digit7_total(txt_money_7dgt, 0, 12);  /// Betting dividend coin amount 7 segments displayed (initial value 0)
        digit7_total(txt_total_7dgt, 1000, 12);  /// Usercoin balance 7 segment display (value read from initial value session) 
       
        function create() {
            bg_music = game.add.audio('bg_music');
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

        ////   Countdown 7 segment display   ////
        var xmlHttp;
        function srvTime() {
            if (window.XMLHttpRequest) {//If you don't branch, it only works in IE.
                xmlHttp = new XMLHttpRequest(); // IE 7.0 or higher, Chrome, Firefox, etc.
                //xmlHttp.open('HEAD', 'http://localhost:64965/login.aspx', false);
                xmlHttp.open('HEAD', window.location.href.toString(), false);
                xmlHttp.setRequestHeader("Content-Type", "text/html");
                xmlHttp.send('');
                return xmlHttp.getResponseHeader("Date");
            } else if (window.ActiveXObject) {
                xmlHttp = new ActiveXObject('Msxml2.XMLHTTP');
                xmlHttp.open('HEAD', window.location.href.toString(), false);
                xmlHttp.setRequestHeader("Content-Type", "text/html");
                xmlHttp.send('');
                return xmlHttp.getResponseHeader("Date");
            }
        }
        var st = srvTime();       
        var today = new Date(st);
        var times = today.getHours() * 3600 + today.getMinutes() * 60 + today.getSeconds();
        var remain_gtime = times % 120;
        var round = parseInt(times / 120);
        var dday = (today.getFullYear() - 2000) * 10000 + (today.getMonth() + 1) * 100 + today.getDate();
        round = dday * 1000 + round;
        
            sectime = 120 - remain_gtime;
            setInterval(function () {
                sectime = sectime - 1;
                if (sectime == 0) {
                    display_segment("countdown", 0, 3, 12, 20, 2);
                    sectime = 120;
                    round += 1;   
                    spin_play();                    
                }
                if (sectime == 16) {
                    betting_stop_sound = 1;
                    self._total += self._money;
                    self._money = 0;
                    self.$('lhj_ben_txt_total').innerHTML = self._total;
                    self.$('lhj_ben_txt_money').innerHTML = self._money;

                    var bar = parseInt(self.$('lhj_bet_txt_bar').value);
                    var seven = parseInt(self.$('lhj_bet_txt_seven').value);
                    var star = parseInt(self.$('lhj_bet_txt_star').value);
                    var watermelon = parseInt(self.$('lhj_bet_txt_watermelons').value);
                    var bell = parseInt(self.$('lhj_bet_txt_alarm').value);
                    var lemon = parseInt(self.$('lhj_bet_txt_coconut').value);
                    var orange = parseInt(self.$('lhj_bet_txt_orange').value);
                    var apple = parseInt(self.$('lhj_bet_txt_apple').value);
                    var doub = parseInt(self.$('dice_bet_txt_even').value);
                    var singl = parseInt(self.$('dice_bet_txt_odd').value);
                    var big = parseInt(self.$('dice_bet_txt_big').value);
                    var small = parseInt(self.$('dice_bet_txt_small').value);

                    var betcount = bar + seven + star + watermelon + bell + lemon + orange + apple + doub + singl + big + small;
                    if (betcount == 0) {
                        // alert("请您先押注。然后再开始。");
                        return;
                    }

                    PostAjax("/Ajax/sendbet.aspx", "user_id=" + user_id + "&round=" + round + "&bet_coin=" + betcount + "&bar=" + bar + "&seven=" + seven
                       + "&star=" + star + "&watermelon=" + watermelon + "&bell=" + bell + "&lemon=" + lemon + "&orange=" + orange + "&apple=" + apple
                       + "&doub=" + doub + "&singl=" + singl + "&big=" + big + "&small=" + small + "&zhibo_id=" + zhibo_id);

                    self._isrun = true;
                    $("#red_lamp").attr("src", "/files/image/images/led-red.png");                   
                    bet_state = 1;                    
                }
                if (sectime < 16) { 
                    self._isrun = true;
                    $("#red_lamp").attr("src", "/files/image/images/led-red.png");                    
                    document.getElementById("bet_area").style.display = 'none';
                }
                if (sectime == 105) {
                    betting_start_sound = 1;
                    display_segment("dgt_bar", 0, 5, 12, 20, 10);
                    display_segment("dgt_seven", 0, 5, 12, 20, 10);
                    display_segment("dgt_star", 0, 5, 12, 20, 10);
                    display_segment("dgt_watermelons", 0, 5, 12, 20, 10);
                    display_segment("dgt_alarm", 0, 5, 12, 20, 10);
                    display_segment("dgt_coconut", 0, 5, 12, 20, 10);
                    display_segment("dgt_orange", 0, 5, 12, 20, 10);
                    display_segment("dgt_apple", 0, 5, 12, 20, 10);
                    display_segment("dice_even", 0, 5, 12, 20, 10);
                    display_segment("dice_odd", 0, 5, 12, 20, 10);
                    display_segment("dice_big", 0, 5, 12, 20, 10);
                    display_segment("dice_small", 0, 5, 12, 20, 10);

                    st = srvTime();
                    today = new Date(st);
                    times = today.getHours() * 3600 + today.getMinutes() * 60 + today.getSeconds();
                    remain_gtime = times % 120;
                    sectime = 120 - remain_gtime;
                }
                if (sectime < 106) display_segment("countdown", sectime, 3, 12, 20, 2);
                
                if (sectime < 31 && sectime > 15) countdown_eff_sound = 1;    //Beep when 20 seconds left, voice countdown from 3 seconds go!
                if (sectime == 4) countdown_3_sound = 1;    
                if (sectime == 3) countdown_2_sound = 1;    
                if (sectime == 2) countdown_1_sound = 1; 
                if (sectime == 1) countdown_go_sound = 1;
            }, 1000);
        
        //初始化bet
        bethtml = [];
                
        bethtml.push("<div id='bet_area' style='position:absolute;width:720px;height:650px;z-index:102;left:0px;top:480px;  background:url(/files/image/images_m/bet_area_cl.png); opacity:0.9;  display: none '>");
        bethtml.push("<div id='bet_btn_area'>");
        /// Betting amount display window ///
        bethtml.push("<image id='idisp_bar' width='84' height='30' src='img/disp_1.png' style='position:absolute;left:80px; top:85px'/>");
        bethtml.push("<image id='idisp_seven' width='84' height='30' src='img/disp_1.png' style='position:absolute;left:200px; top:85px' />");
        bethtml.push("<image id='idisp_star' width='84' height='30' src='img/disp_1.png' style='position:absolute;left:320px; top:85px' />");
        bethtml.push("<image id='idisp_watermelon' width='84' height='30' src='img/disp_1.png' style='position:absolute;left:440px; top:85px' />");
        bethtml.push("<image id='idisp_bell' width='84' height='30' src='img/disp_1.png' style='position:absolute;left:80px; top:270px' />");
        bethtml.push("<image id='idisp_mongo' width='84' height='30' src='img/disp_1.png' style='position:absolute;left:200px; top:270px' />");
        bethtml.push("<image id='idisp_orenge' width='84' height='30' src='img/disp_1.png' style='position:absolute;left:320px; top:270px' />");
        bethtml.push("<image id='idisp_apple' width='84' height='30' src='img/disp_1.png' style='position:absolute;left:440px; top:270px' />");
        bethtml.push("<image id='idisp_odd' width='84' height='30' src='img/disp_1.png' style='position:absolute;left:80px; top:455px' />");
        bethtml.push("<image id='idisp_even' width='84' height='30' src='img/disp_1.png' style='position:absolute;left:200px; top:455px' />");
        bethtml.push("<image id='idisp_big' width='84' height='30' src='img/disp_1.png' style='position:absolute;left:320px; top:455px' />");
        bethtml.push("<image id='idisp_small' width='84' height='30' src='img/disp_1.png' style='position:absolute;left:440px; top:455px' />");
        bethtml.push("<canvas id='dgt_bar' style='width:77px; height:35px; position: absolute; left:85px; top:83px'></canvas>");
        bethtml.push("<canvas id='dgt_seven' style='width:77px; height:35px; position: absolute; left:205px; top:83px'></canvas>");
        bethtml.push("<canvas id='dgt_star' style='width:77px; height:35px; position: absolute; left:325px; top:83px'></canvas>");
        bethtml.push("<canvas id='dgt_watermelons' style='width:77px; height:35px; position: absolute; left:445px; top:83px'></canvas>");
        bethtml.push("<canvas id='dgt_alarm' style='width:77px; height:35px; position: absolute; left:85px; top:268px '></canvas>");
        bethtml.push("<canvas id='dgt_coconut' style='width:77px; height:35px; position: absolute; left:205px; top:268px'></canvas>");
        bethtml.push("<canvas id='dgt_orange' style='width:77px; height:35px; position: absolute; left:325px; top:268px'></canvas>");
        bethtml.push("<canvas id='dgt_apple' style='width:77px; height:35px; position: absolute; left:445px; top:268px'></canvas>");
        bethtml.push("<canvas id='dice_odd' style='width:77px; height:35px; position: absolute; left:85px; top:453px'></canvas>");
        bethtml.push("<canvas id='dice_even' style='width:77px; height:35px; position: absolute; left:205px; top:453px'></canvas>");
        bethtml.push("<canvas id='dice_big' style='width:77px; height:35px; position: absolute; left:325px; top:453px'></canvas>");
        bethtml.push("<canvas id='dice_small' style='width:77px; height:35px; position: absolute; left:445px; top:453px'></canvas>");
        /// batting button saddle ////
        bethtml.push("<image id='lhj_bet_bar' width='92' height='92' src='img/btn_bar.png' oncontextmenu='return false' style='-webkit-touch-callout:none; position:absolute;left:75px; top:120px' />");
        bethtml.push("<image id='lhj_bet_seven' width='92' height='92' src='img/btn_seven.png' oncontextmenu='return false' style='-webkit-touch-callout:none; position:absolute;left:195px; top:120px'/>");
        bethtml.push("<image id='lhj_bet_star' width='92' height='92' src='img/btn_star.png' oncontextmenu='return false' style='-webkit-touch-callout:none; position:absolute;left:315px; top:120px' />");
        bethtml.push("<image id='lhj_bet_watermelons' width='92' height='92' src='img/btn_watermelon.png' oncontextmenu='return false' style='-webkit-touch-callout:none; position:absolute;left:435px; top:120px' />");
        bethtml.push("<image id='lhj_bet_alarm' width='92' height='92' src='img/btn_bell.png' oncontextmenu='return false' style='-webkit-touch-callout:none; position:absolute;left:75px; top:305px' />");
        bethtml.push("<image id='lhj_bet_coconut' width='92' height='92' src='img/btn_mongo.png' oncontextmenu='return false' style='-webkit-touch-callout:none; position:absolute;left:195px; top:305px' />");
        bethtml.push("<image id='lhj_bet_orange' width='92' height='92' src='img/btn_orenge.png' oncontextmenu='return false' style='-webkit-touch-callout:none; position:absolute;left:315px; top:305px' />");
        bethtml.push("<image id='lhj_bet_apple' width='92' height='92' src='img/btn_apple.png' oncontextmenu='return false' style='-webkit-touch-callout:none; position:absolute;left:435px; top:305px' />");
        bethtml.push("<image id='dice_bet_odd' width='92' height='92' src='img/btn_odd.png' oncontextmenu='return false' style='-webkit-touch-callout:none; position:absolute;left:75px; top:490px' />");
        bethtml.push("<image id='dice_bet_even' width='92' height='92' src='img/btn_even.png' oncontextmenu='return false' style='-webkit-touch-callout:none; position:absolute;left:195px; top:490px' />");
        bethtml.push("<image id='dice_bet_big' width='92' height='92' src='img/btn_big.png' oncontextmenu='return false' style='-webkit-touch-callout:none; position:absolute;left:315px; top:490px' />");
        bethtml.push("<image id='dice_bet_small' width='92' height='92' src='img/btn_small.png' oncontextmenu='return false' style='-webkit-touch-callout:none; position:absolute;left:435px; top:490px' />");
        ///time rate setting button   // 
        bethtml.push("<image id='1chip' width='80' height='80' src='img/1chip.png' style='position:absolute;left:560px; top:80px' />");
        bethtml.push("<image id='10chip' width='80' height='80' src='img/10chip.png' style='position:absolute;left:560px; top:165px' />");
        bethtml.push("<image id='100chip' width='80' height='80' src='img/100chip.png' style='position:absolute;left:560px; top:250px' />");
        bethtml.push("<image id='1000chip' width='80' height='80' src='img/1000chip.png' style='position:absolute;left:560px; top:335px' />");
                
        ///  Betting End/Confirm && Batting Accelerator Button Saddle  ///
        bethtml.push("<image id='bet_finish' width='90' height='85' src='img/bet_def.png' style='position:absolute;left:555px; top:440px' />");
        bethtml.push("<image id='bet_init' width='90' height='85' src='img/bet_init.png' style='position:absolute;left:555px; top:535px' />");
        bethtml.push("</div> ");
        //// betting history  ///
        bethtml.push("<nav id='slot_machine_log' style='width:710px; height:60px; position: absolute; left:5px; top:10px;'>");
        bethtml.push("<ul id='slot_log' class='slot_log' style='width:715px; height:60px; overflow-x:hidden;overflow-y:hidden'></ul>");
        bethtml.push("</nav>");
        bethtml.push("<div id='dice_log1' style='width:45px; height:528px; position: absolute; left:5px; top:80px; background-color:blueviolet '>");
        bethtml.push("<ul id='diceTai_log' class='diceTai_log' style='width:45px; height:528px; overflow-y:hidden'></ul>");
        bethtml.push("</div>");
        bethtml.push("<div id='dice_log2' style='width:45px; height:528px; position: absolute; left:665px; top:80px; background-color:blueviolet'>");
        bethtml.push("<ul id='diceodd_log' class='diceodd_log' style='width:45px; height:528px; overflow-y:hidden'></ul>");
        bethtml.push("</div>");
        bethtml.push("</div>");

        ///state red
        bethtml.push("<image id='red_lamp' width='25' height='25' src ='/files/image/images/led-green.png' style='left:500px; top:530px; position: absolute '/>");
        bethtml.push("<image id='red_lamp' width='50' height='50' src ='/files/image/images_m/jp.png' style='left:330px; top:600px; position: absolute '/>");
          
         
        ///  Betting amount input text window (hidden state)  ///
        bethtml.push("<div style='width:1200px;left:100px; display:none'>");
        bethtml.push("<table cellpadding='0' cellspacing='0' class='lhj_bet_table'>");
        bethtml.push("<tr>");
        bethtml.push("<td><input type='text' id='lhj_bet_txt_bar' class='lhj_input lhj_bet_input' value='0' readOnly /></td>");
        bethtml.push("<td><input type='text' id='lhj_bet_txt_seven' class='lhj_input lhj_bet_input' value='0' readOnly /></td>");
        bethtml.push("<td><input type='text' id='lhj_bet_txt_star' class='lhj_input lhj_bet_input' value='0' readOnly /></td>");
        bethtml.push("<td><input type='text' id='lhj_bet_txt_watermelons' class='lhj_input lhj_bet_input' value='0' readOnly /></td>");
        bethtml.push("<td><input type='text' id='lhj_bet_txt_alarm' class='lhj_input lhj_bet_input' value='0' readOnly /></td>");
        bethtml.push("<td><input type='text' id='lhj_bet_txt_coconut' class='lhj_input lhj_bet_input' value='0' readOnly /></td>");
        bethtml.push("<td><input type='text' id='lhj_bet_txt_orange' class='lhj_input lhj_bet_input' value='0' readOnly /></td>");
        bethtml.push("<td><input type='text' id='lhj_bet_txt_apple' class='lhj_input lhj_bet_input' value='0' readOnly /></td>");
        bethtml.push("<td><input type='text' id='dice_bet_txt_odd' class='lhj_input lhj_bet_input' value='0' readOnly /></td>");
        bethtml.push("<td><input type='text' id='dice_bet_txt_even' class='lhj_input lhj_bet_input' value='0' readOnly /></td>");
        bethtml.push("<td><input type='text' id='dice_bet_txt_big' class='lhj_input lhj_bet_input' value='0' readOnly /></td>");
        bethtml.push("<td><input type='text' id='dice_bet_txt_small' class='lhj_input lhj_bet_input' value='0' readOnly /></td>");
        bethtml.push("</tr>");
        bethtml.push("</table>");
        bethtml.push("</div>");
        bethtml.push("<audio id='bflat'> </audio>");
        
        this.frame.bet.innerHTML = bethtml.join('');

        var msg = PostAjax("/Ajax/spinlog.ashx", "lognum=11");    
        var myArray = new Array(11);
        myArray = msg.split('/');
        var semi = new Array(3);
        for (var i = 0; i < 11; i++) {
            semi = myArray[i].split(',');
            var cssfruit = slotlogcss[semi[0] - 1];
            var text = "<div style='width:65px;height:60px' class='" + cssfruit + "'></div>"
            if (text.length) {
                $('<li />', { html: text }).appendTo('ul.slot_log')
            }
            //$("#slot_log").scrollTop($("#slot_log")[0].scrollHeight);

            var csstaisai = taisailogcss[semi[1]];
            var text = "<div style='width:45px;height:48px' class='" + csstaisai + "'></div>"
            if (text.length) {
                $('<li />', { html: text }).appendTo('ul.diceTai_log')
            }
            // $("#diceTai_log").scrollTop($("#diceTai_log")[0].scrollHeight);

            var cssevodd = evoddlogcss[semi[2]];
            var text = "<div style='width:45px;height:48px' class='" + cssevodd + "'></div>"
            if (text.length) {
                $('<li />', { html: text }).appendTo('ul.diceodd_log')
            }
            //$("#diceodd_log").scrollTop($("#diceodd_log")[0].scrollHeight);
        }

        ///  Betting amount display window 7 segment  ///
        display_segment("dgt_bar", lhj_bet_txt_bar.value, 5, 12, 20, 10);
        display_segment("dgt_seven", lhj_bet_txt_seven.value, 5, 12, 20, 10);
        display_segment("dgt_star", lhj_bet_txt_star.value, 5, 12, 20, 10);
        display_segment("dgt_watermelons", lhj_bet_txt_watermelons.value, 5, 12, 20, 10);
        display_segment("dgt_alarm", lhj_bet_txt_alarm.value, 5, 12, 20, 10);
        display_segment("dgt_coconut", lhj_bet_txt_coconut.value, 5, 12, 20, 10);
        display_segment("dgt_orange", lhj_bet_txt_orange.value, 5, 12, 20, 10);
        display_segment("dgt_apple", lhj_bet_txt_apple.value, 5, 12, 20, 10);
        display_segment("dice_odd", 0, 5, 12, 20, 10);
        display_segment("dice_even", 0, 5, 12, 20, 10);
        display_segment("dice_big", 0, 5, 12, 20, 10);
        display_segment("dice_small", 0, 5, 12, 20, 10);

        //display_segment("numRate", 1000, 4, 12, 28, 2);

////******** Betting Real / Betting amount increase implementation start  ////
        var betmoeny = function(id) {
            if (self._isrun) {
                return;
            }
            //先将得分转过来
            self._total += self._money;
            self._money = 0;
            self.$('lhj_ben_txt_total').innerHTML = self._total;
            self.$('lhj_ben_txt_money').innerHTML = self._money;

            if (self._isfirstbet) {
                self.$('lhj_bet_txt_bar').value = 0;
                self.$('lhj_bet_txt_seven').value = 0;
                self.$('lhj_bet_txt_star').value = 0;
                self.$('lhj_bet_txt_watermelons').value = 0;
                self.$('lhj_bet_txt_alarm').value = 0;
                self.$('lhj_bet_txt_coconut').value = 0;
                self.$('lhj_bet_txt_orange').value = 0;
                self.$('lhj_bet_txt_apple').value = 0;
                self.$('dice_bet_txt_even').value = 0;
                self.$('dice_bet_txt_odd').value = 0;
                self.$('dice_bet_txt_big').value = 0;
                self.$('dice_bet_txt_small').value = 0;
                self._isfirstbet = false;

                display_segment("dgt_bar", lhj_bet_txt_bar.value, 5, 12, 20, 10);
                display_segment("dgt_seven", lhj_bet_txt_seven.value, 5, 12, 20, 10);
                display_segment("dgt_star", lhj_bet_txt_star.value, 5, 12, 20, 10);
                display_segment("dgt_watermelons", lhj_bet_txt_watermelons.value, 5, 12, 20, 10);
                display_segment("dgt_alarm", lhj_bet_txt_alarm.value, 5, 12, 20, 10);
                display_segment("dgt_coconut", lhj_bet_txt_coconut.value, 5, 12, 20, 10);
                display_segment("dgt_orange", lhj_bet_txt_orange.value, 5, 12, 20, 10);
                display_segment("dgt_apple", lhj_bet_txt_apple.value, 5, 12, 20, 10);
                display_segment("dice_even", dice_bet_txt_even.value, 5, 12, 20, 10);
                display_segment("dice_odd", dice_bet_txt_odd.value, 5, 12, 20, 10);
                display_segment("dice_big", dice_bet_txt_big.value, 5, 12, 20, 10);
                display_segment("dice_small", dice_bet_txt_small.value, 5, 12, 20, 10);
            } 

            var tpv = parseInt(self.$(id).value);
            if (self._total > 0 && tpv < self._config.maxbet) {
                self._total -= num_rate;
                self.$(id).value = tpv + num_rate;
                self.$('lhj_ben_txt_total').innerHTML = self._total;               
            }
        }
        //// ******Betting Real / Betting amount increase implementation end  ////



/// ***** Enter the betting amount by pressing the button for each item (processing by pressing the betting button) start  **********////        
        $("#lhj_bet_bar").bind("taphold", tapholdHandler1);
        function tapholdHandler1(event) {
            document.getElementById("lhj_bet_bar").style.opacity = 0.1;
            betInterval1 = setInterval(function () {
                betmoeny('lhj_bet_txt_bar');
                display_segment("dgt_bar", lhj_bet_txt_bar.value, 5, 12, 20, 10);
                //effect sound
                if (self._isrun == false) {
                    betbtn_eff_sound = 1;
                }
            }, 50);               
        }
        $("#lhj_bet_bar").bind("touchend", touchendHandler1);
        function touchendHandler1(event) {
            document.getElementById("lhj_bet_bar").style.opacity = 1;
            clearInterval(betInterval1);            
        }
        this.$('lhj_bet_bar').onmouseup = function (event) {  // stop incrementing when released
            document.getElementById("lhj_bet_bar").style.opacity = 1;
            clearInterval(betInterval1);
        }
        $("#lhj_bet_bar").bind("tap", tapHandler1);
        function tapHandler1(event) {
            document.getElementById("lhj_bet_bar").style.display = 'none';
            setTimeout(function () { document.getElementById("lhj_bet_bar").style.display = 'block'; }, 50);
            betmoeny('lhj_bet_txt_bar');
            display_segment("dgt_bar", lhj_bet_txt_bar.value, 5, 12, 20, 10);
            if (self._isrun == false) betbtn_eff_sound = 1;
        }
        
        ///////////////////////////////////////////  1

        $("#lhj_bet_seven").bind("taphold", tapholdHandler2);
        function tapholdHandler2(event) {
            document.getElementById("lhj_bet_seven").style.opacity = 0.1;
            betInterval2 = setInterval(function () {
                betmoeny('lhj_bet_txt_seven');
                display_segment("dgt_seven", lhj_bet_txt_seven.value, 5, 12, 20, 10);
                //effect sound
                if (self._isrun == false) betbtn_eff_sound = 1;
            }, 50);
        }
        $("#lhj_bet_seven").bind("touchend", touchendHandler2);
        function touchendHandler2(event) {
            document.getElementById("lhj_bet_seven").style.opacity = 1;
            clearInterval(betInterval2);            
        }
        this.$('lhj_bet_seven').onmouseup = function (event) {  // stop incrementing when released
            document.getElementById("lhj_bet_seven").style.opacity = 1;
            clearInterval(betInterval2);
        }
        $("#lhj_bet_seven").bind("tap", tapHandler2);
        function tapHandler2(event) {
            document.getElementById("lhj_bet_seven").style.opacity = 0.1;
            setTimeout(function () { document.getElementById("lhj_bet_seven").style.opacity = 1; }, 50);
            betmoeny('lhj_bet_txt_seven');
            display_segment("dgt_seven", lhj_bet_txt_seven.value, 5, 12, 20, 10);
            if (self._isrun == false) betbtn_eff_sound = 1;
        }        

        /////////////////////////////////////////////  2
       
        $("#lhj_bet_star").bind("taphold", tapholdHandler3);
        function tapholdHandler3(event) {
            document.getElementById("lhj_bet_star").style.opacity = 0.1;
            betInterval3 = setInterval(function () {
                betmoeny('lhj_bet_txt_star');
                display_segment("dgt_star", lhj_bet_txt_star.value, 5, 12, 20, 10);
                //effect sound
                if (self._isrun == false) betbtn_eff_sound = 1;                
            }, 50);            
        }
        $("#lhj_bet_star").bind("touchend", touchendHandler3);
        function touchendHandler3(event) {
            document.getElementById("lhj_bet_star").style.opacity = 1;
            clearInterval(betInterval3);
        }        
        this.$('lhj_bet_star').onmouseup = function (event) {  // stop incrementing when released
            document.getElementById("lhj_bet_star").style.opacity = 1;
            clearInterval(betInterval3);
        }
        $("#lhj_bet_star").bind("tap", tapHandler3);
        function tapHandler3(event) {
            document.getElementById("lhj_bet_star").style.opacity = 0.1;
            setTimeout(function () { document.getElementById("lhj_bet_star").style.opacity = 1; }, 50);
            betmoeny('lhj_bet_txt_star');
            display_segment("dgt_star", lhj_bet_txt_star.value, 5, 12, 20, 10);
            if (self._isrun == false) betbtn_eff_sound = 1;
        }

        /////////////////////////////////////////////   3
        
        $("#lhj_bet_watermelons").bind("taphold", tapholdHandler4);
        function tapholdHandler4(event) {
            document.getElementById("lhj_bet_watermelons").style.opacity = 0.1;
            betInterval4 = setInterval(function () {                
                betmoeny('lhj_bet_txt_watermelons');
                display_segment("dgt_watermelons", lhj_bet_txt_watermelons.value, 5, 12, 20, 10);
                //effect sound
                if (self._isrun == false) betbtn_eff_sound = 1;
            }, 50);
        }
        $("#lhj_bet_watermelons").bind("touchend", touchendHandler4);
        function touchendHandler4(event) {
            document.getElementById("lhj_bet_watermelons").style.opacity = 1;
            clearInterval(betInterval4);
        }        
        this.$('lhj_bet_watermelons').onmouseup = function (event) {  // stop incrementing when released
            document.getElementById("lhj_bet_watermelons").style.opacity = 1;
            clearInterval(betInterval4);
        }
        $("#lhj_bet_watermelons").bind("tap", tapHandler4);
        function tapHandler4(event) {
            document.getElementById("lhj_bet_watermelons").style.opacity = 0.1;
            setTimeout(function () { document.getElementById("lhj_bet_watermelons").style.opacity = 1; }, 50);
            betmoeny('lhj_bet_txt_watermelons');
            display_segment("dgt_watermelons", lhj_bet_txt_watermelons.value, 5, 12, 20, 10);
            if (self._isrun == false) betbtn_eff_sound = 1;
        }

        /////////////////////////////////////////////   4

        
        $("#lhj_bet_alarm").bind("taphold", tapholdHandler5);
        function tapholdHandler5(event) {
            document.getElementById("lhj_bet_alarm").style.opacity = 0.1;
            betInterval5 = setInterval(function () {
                betmoeny('lhj_bet_txt_alarm');
                display_segment("dgt_alarm", lhj_bet_txt_alarm.value, 5, 12, 20, 10);
                //effect sound
                if (self._isrun == false) betbtn_eff_sound = 1;
            }, 50);
        }
        $("#lhj_bet_alarm").bind("touchend", touchendHandler5);
        function touchendHandler5(event) {
            document.getElementById("lhj_bet_alarm").style.opacity = 1;
            clearInterval(betInterval5);
        }        
        this.$('lhj_bet_alarm').onmouseup = function (event) {  // stop incrementing when released
            document.getElementById("lhj_bet_alarm").style.opacity = 1;
            clearInterval(betInterval5);
        }
        $("#lhj_bet_alarm").bind("tap", tapHandler5);
        function tapHandler5(event) {
            document.getElementById("lhj_bet_alarm").style.opacity = 0.1;
            setTimeout(function () { document.getElementById("lhj_bet_alarm").style.opacity = 1; }, 50);
            betmoeny('lhj_bet_txt_alarm');
            display_segment("dgt_alarm", lhj_bet_txt_alarm.value, 5, 12, 20, 10);
            if (self._isrun == false) betbtn_eff_sound = 1;
        }

        ////////////////////////////////////////////   5
        

        $("#lhj_bet_coconut").bind("taphold", tapholdHandler6);
        function tapholdHandler6(event) {
            document.getElementById("lhj_bet_coconut").style.opacity = 0.1;
            betInterval6 = setInterval(function () {
                betmoeny('lhj_bet_txt_coconut');
                display_segment("dgt_coconut", lhj_bet_txt_coconut.value, 5, 12, 20, 10);
                //effect sound
                if (self._isrun == false) betbtn_eff_sound = 1;
            }, 50);
        }
        $("#lhj_bet_coconut").bind("touchend", touchendHandler6);
        function touchendHandler6(event) {
            document.getElementById("lhj_bet_coconut").style.opacity = 1;
            clearInterval(betInterval6);
        }
        this.$('lhj_bet_coconut').onmouseup = function (event) {  // stop incrementing when released
            document.getElementById("lhj_bet_coconut").style.opacity = 1;
            clearInterval(betInterval6);
        }
        $("#lhj_bet_coconut").bind("tap", tapHandler6);
        function tapHandler6(event) {
            document.getElementById("lhj_bet_coconut").style.opacity = 0.1;
            setTimeout(function () { document.getElementById("lhj_bet_coconut").style.opacity = 1; }, 50);
            betmoeny('lhj_bet_txt_coconut');
            display_segment("dgt_coconut", lhj_bet_txt_coconut.value, 5, 12, 20, 10);
            if (self._isrun == false) betbtn_eff_sound = 1;
        }

        ////////////////////////////////////////////    6
       

        $("#lhj_bet_orange").bind("taphold", tapholdHandler7);
        function tapholdHandler7(event) {
            document.getElementById("lhj_bet_orange").style.opacity = 0.1;
            betInterval7 = setInterval(function () {
                betmoeny('lhj_bet_txt_orange');
                display_segment("dgt_orange", lhj_bet_txt_orange.value, 5, 12, 20, 10);
                //effect sound
                if (self._isrun == false) betbtn_eff_sound = 1;
            }, 50);
        }
        $("#lhj_bet_orange").bind("touchend", touchendHandler7);
        function touchendHandler7(event) {
            document.getElementById("lhj_bet_orange").style.opacity = 1;
            clearInterval(betInterval7);
        }        
        this.$('lhj_bet_orange').onmouseup = function (event) {  // stop incrementing when released
            document.getElementById("lhj_bet_orange").style.opacity = 1;
            clearInterval(betInterval7);
        }
        $("#lhj_bet_orange").bind("tap", tapHandler7);
        function tapHandler7(event) {
            document.getElementById("lhj_bet_orange").style.opacity = 0.1;
            setTimeout(function () { document.getElementById("lhj_bet_orange").style.opacity = 1; }, 50);
            betmoeny('lhj_bet_txt_orange');
            display_segment("dgt_orange", lhj_bet_txt_orange.value, 5, 12, 20, 10);
            if (self._isrun == false) betbtn_eff_sound = 1;
        }

        /////////////////////////////////////////////   7
        

        $("#lhj_bet_apple").bind("taphold", tapholdHandler8);
        function tapholdHandler8(event) {
            document.getElementById("lhj_bet_apple").style.opacity = 0.1;
            betInterval8 = setInterval(function () {
                betmoeny('lhj_bet_txt_apple');
                display_segment("dgt_apple", lhj_bet_txt_apple.value, 5, 12, 20, 10);
                //effect sound
                if (self._isrun == false) betbtn_eff_sound = 1;
            }, 50);
        }
        $("#lhj_bet_apple").bind("touchend", touchendHandler8);
        function touchendHandler8(event) {
            document.getElementById("lhj_bet_apple").style.opacity = 1;
            clearInterval(betInterval8);
        }        
        this.$('lhj_bet_apple').onmouseup = function (event) {  // stop incrementing when released
            document.getElementById("lhj_bet_apple").style.opacity = 1;
            clearInterval(betInterval8);
        }
        $("#lhj_bet_apple").bind("tap", tapHandler8);
        function tapHandler8(event) {
            document.getElementById("lhj_bet_apple").style.opacity = 0.1;
            setTimeout(function () { document.getElementById("lhj_bet_apple").style.opacity = 1; }, 50);
            betmoeny('lhj_bet_txt_apple');
            display_segment("dgt_apple", lhj_bet_txt_apple.value, 5, 12, 20, 10);
            if (self._isrun == false) betbtn_eff_sound = 1;
        }

        /////////////////////////////////////////////   8

        
        $("#dice_bet_even").bind("taphold", tapholdHandler9);
        function tapholdHandler9(event) {
            document.getElementById("dice_bet_even").style.opacity = 0.1;
            betInterval9 = setInterval(function () {
                betmoeny('dice_bet_txt_even');
                display_segment("dice_even", dice_bet_txt_even.value, 5, 12, 20, 10);
                //effect sound
                if (self._isrun == false) betbtn_eff_sound = 1;
            }, 50);
        }
        $("#dice_bet_even").bind("touchend", touchendHandler9);
        function touchendHandler9(event) {
            document.getElementById("dice_bet_even").style.opacity = 1;
            clearInterval(betInterval9);
        }
        this.$('dice_bet_even').onmouseup = function (event) {  // stop incrementing when released
            document.getElementById("dice_bet_even").style.opacity = 1;
            clearInterval(betInterval9);
        }  
        $("#dice_bet_even").bind("tap", tapHandler9);
        function tapHandler9(event) {
            document.getElementById("dice_bet_even").style.opacity = 0.1;
            setTimeout(function () { document.getElementById("dice_bet_even").style.opacity = 1; }, 50);
            betmoeny('dice_bet_txt_even');
            display_segment("dice_even", dice_bet_txt_even.value, 5, 12, 20, 10);
            if (self._isrun == false) betbtn_eff_sound = 1;
        }

        /////////////////////////////////////////////   9
        
        $("#dice_bet_odd").bind("taphold", tapholdHandler10);
        function tapholdHandler10(event) {
            document.getElementById("dice_bet_odd").style.opacity = 0.1;
            betInterval10 = setInterval(function () {
                betmoeny('dice_bet_txt_odd');
                display_segment("dice_odd", dice_bet_txt_odd.value, 5, 12, 20, 10);
                //effect sound
                if (self._isrun == false) betbtn_eff_sound = 1;
            }, 50);
        }
        $("#dice_bet_odd").bind("touchend", touchendHandler10);
        function touchendHandler10(event) {
            document.getElementById("dice_bet_odd").style.opacity = 1;
            clearInterval(betInterval10);
        }        
        this.$('dice_bet_odd').onmouseup = function (event) {  // stop incrementing when released
            document.getElementById("dice_bet_odd").style.opacity = 1;
            clearInterval(betInterval10);
        }
        $("#dice_bet_odd").bind("tap", tapHandler10);
        function tapHandler10(event) {
            document.getElementById("dice_bet_odd").style.opacity = 0.1;
            setTimeout(function () { document.getElementById("dice_bet_odd").style.opacity = 1; }, 50);
            betmoeny('dice_bet_txt_odd');
            display_segment("dice_odd", dice_bet_txt_odd.value, 5, 12, 20, 10);
            if (self._isrun == false) betbtn_eff_sound = 1;
        }

        /////////////////////////////////////////////    10
        
        $("#dice_bet_big").bind("taphold", tapholdHandler11);
        function tapholdHandler11(event) {
            document.getElementById("dice_bet_big").style.opacity = 0.1;
            betInterval11 = setInterval(function () {
                betmoeny('dice_bet_txt_big');
                display_segment("dice_big", dice_bet_txt_big.value, 5, 12, 20, 10);
                //effect sound
                if (self._isrun == false) betbtn_eff_sound = 1;
            }, 50);
        }
        $("#dice_bet_big").bind("touchend", touchendHandler11);
        function touchendHandler11(event) {
            document.getElementById("dice_bet_big").style.opacity = 1;
            clearInterval(betInterval11);
        }        
        this.$('dice_bet_big').onmouseup = function (event) {  // stop incrementing when released
            document.getElementById("dice_bet_big").style.opacity = 1;
            clearInterval(betInterval11);
        }
        $("#dice_bet_big").bind("tap", tapHandler11);
        function tapHandler11(event) {
            document.getElementById("dice_bet_big").style.opacity = 0.1;
            setTimeout(function () { document.getElementById("dice_bet_big").style.opacity = 1; }, 50);
            betmoeny('dice_bet_txt_big');
            display_segment("dice_big", dice_bet_txt_big.value, 5, 12, 20, 10);
            if (self._isrun == false) betbtn_eff_sound = 1;
        }
        
        /////////////////////////////////////////////      11
        

        $("#dice_bet_small").bind("taphold", tapholdHandler12);
        function tapholdHandler12(event) {
            document.getElementById("dice_bet_small").style.opacity = 0.1;
            betInterval12 = setInterval(function () {
             betmoeny('dice_bet_txt_small');
             display_segment("dice_small", dice_bet_txt_small.value, 5, 12, 20, 10);
                //effect sound
             if (self._isrun == false) betbtn_eff_sound = 1;
            }, 50);
        }
        $("#dice_bet_small").bind("touchend", touchendHandler12);
        function touchendHandler12(event) {
            document.getElementById("dice_bet_small").style.opacity = 1;
            clearInterval(betInterval12);
        }
        this.$('dice_bet_small').onmouseup = function (event) {  // stop incrementing when released
            document.getElementById("dice_bet_small").style.opacity = 1;
            clearInterval(betInterval12);
        }
        $("#dice_bet_small").bind("tap", tapHandler12);
        function tapHandler12(event) {
            document.getElementById("dice_bet_small").style.opacity = 0.1;
            setTimeout(function () { document.getElementById("dice_bet_small").style.opacity = 1; }, 50);
            betmoeny('dice_bet_txt_small');
            display_segment("dice_small", dice_bet_txt_small.value, 5, 12, 20, 10);
            if (self._isrun == false) betbtn_eff_sound = 1;
        }
        ///// ***** Enter the bet amount by pressing the button for each item end      12

        ///Betting amount unit setting
        this.$('1000chip').onclick = function () {
            num_rate = 1000;
            $("#1000chip").attr("src", "img/1000_chip.png");
            $("#100chip").attr("src", "img/100chip.png");
            $("#10chip").attr("src", "img/10chip.png");
            $("#1chip").attr("src", "img/1chip.png");
            //effect sound            
            selchip_eff_sound = 1;
        }
        this.$('100chip').onclick = function () {
            num_rate = 100;
            $("#1000chip").attr("src", "img/1000chip.png");
            $("#100chip").attr("src", "img/100_chip.png");
            $("#10chip").attr("src", "img/10chip.png");
            $("#1chip").attr("src", "img/1chip.png");
            //effect sound            
            selchip_eff_sound = 1;
        }
        this.$('10chip').onclick = function () {
            num_rate = 10;
            $("#1000chip").attr("src", "img/1000chip.png");
            $("#100chip").attr("src", "img/100chip.png");
            $("#10chip").attr("src", "img/10_chip.png");
            $("#1chip").attr("src", "img/1chip.png");
            //effect sound            
            selchip_eff_sound = 1;
        }
        this.$('1chip').onclick = function () {
            num_rate = 1;
            $("#1000chip").attr("src", "img/1000chip.png");
            $("#100chip").attr("src", "img/100chip.png");
            $("#10chip").attr("src", "img/10chip.png");
            $("#1chip").attr("src", "img/1_chip.png");
            //effect sound            
            selchip_eff_sound = 1;
        }

 /// ***** Press the bet button with the previous value start **********////
        $("#bet_finish").bind("tap", tapHandler13);
        function tapHandler13(event) {
            document.getElementById("bet_finish").style.display = 'none';
            setTimeout(function () { document.getElementById("bet_finish").style.display = 'block'; }, 200);
            if (self._isrun == false) finshbtn_eff_sound = 1;
            if (self._isrun) {
                return;
            }            

            self._total += self._money;
            self._money = 0;
            self.$('lhj_ben_txt_total').innerHTML = self._total;
            self.$('lhj_ben_txt_money').innerHTML = self._money;

            var betcount = parseInt(self.$('lhj_bet_txt_bar').value);
            betcount += parseInt(self.$('lhj_bet_txt_seven').value);
            betcount += parseInt(self.$('lhj_bet_txt_star').value);
            betcount += parseInt(self.$('lhj_bet_txt_watermelons').value);
            betcount += parseInt(self.$('lhj_bet_txt_alarm').value);
            betcount += parseInt(self.$('lhj_bet_txt_coconut').value);
            betcount += parseInt(self.$('lhj_bet_txt_orange').value);
            betcount += parseInt(self.$('lhj_bet_txt_apple').value);
            betcount += parseInt(self.$('dice_bet_txt_even').value);
            betcount += parseInt(self.$('dice_bet_txt_odd').value);
            betcount += parseInt(self.$('dice_bet_txt_big').value);
            betcount += parseInt(self.$('dice_bet_txt_small').value);
            coin = betcount;
            if (betcount == 0) {
                alert("请您先押注。然后再开始。");
                return;
            }
            if (self._total > betcount && betcount < self._config.maxbet) {
                self._total -= betcount;
                self.$('lhj_ben_txt_total').innerHTML = self._total;
            }
            if (self._total < betcount) {
                alert("您的总分不够下注，请投币！");
                return;
            }

            display_segment("dgt_bar", lhj_bet_txt_bar.value, 5, 12, 20, 10);
            display_segment("dgt_seven", lhj_bet_txt_seven.value, 5, 12, 20, 10);
            display_segment("dgt_star", lhj_bet_txt_star.value, 5, 12, 20, 10);
            display_segment("dgt_watermelons", lhj_bet_txt_watermelons.value, 5, 12, 20, 10);
            display_segment("dgt_alarm", lhj_bet_txt_alarm.value, 5, 12, 20, 10);
            display_segment("dgt_coconut", lhj_bet_txt_coconut.value, 5, 12, 20, 10);
            display_segment("dgt_orange", lhj_bet_txt_orange.value, 5, 12, 20, 10);
            display_segment("dgt_apple", lhj_bet_txt_apple.value, 5, 12, 20, 10);
            display_segment("dice_even", dice_bet_txt_even.value, 5, 12, 20, 10);
            display_segment("dice_odd", dice_bet_txt_odd.value, 5, 12, 20, 10);
            display_segment("dice_big", dice_bet_txt_big.value, 5, 12, 20, 10);
            display_segment("dice_small", dice_bet_txt_small.value, 5, 12, 20, 10);
            
            self._isrun = true;
            $("#red_lamp").attr("src", "/files/image/images/led-red.png");            
            bet_state = 1;
        }

        /// ***** Press the bet button with the previous value end  **********////

/// ***** Reset bet amount input window start  **********////
        $("#bet_init").bind("tap", tapHandler14);
        function tapHandler14(event) {
            document.getElementById("bet_init").style.display = 'none';
            setTimeout(function () { document.getElementById("bet_init").style.display = 'block'; }, 200);
            if (self._isrun == false) initbtn_eff_sound = 1;
            if (self._isrun) {
                return;
            }
            var betcount = parseInt(self.$('lhj_bet_txt_bar').value);
            betcount += parseInt(self.$('lhj_bet_txt_seven').value);
            betcount += parseInt(self.$('lhj_bet_txt_star').value);
            betcount += parseInt(self.$('lhj_bet_txt_watermelons').value);
            betcount += parseInt(self.$('lhj_bet_txt_alarm').value);
            betcount += parseInt(self.$('lhj_bet_txt_coconut').value);
            betcount += parseInt(self.$('lhj_bet_txt_orange').value);
            betcount += parseInt(self.$('lhj_bet_txt_apple').value);
            betcount += parseInt(self.$('dice_bet_txt_even').value);
            betcount += parseInt(self.$('dice_bet_txt_odd').value);
            betcount += parseInt(self.$('dice_bet_txt_big').value);
            betcount += parseInt(self.$('dice_bet_txt_small').value);
            self._total += betcount;
            self.$('lhj_ben_txt_total').innerHTML = self._total;
            

            self.$('lhj_bet_txt_bar').value = 0;
            self.$('lhj_bet_txt_seven').value = 0;
            self.$('lhj_bet_txt_star').value = 0;
            self.$('lhj_bet_txt_watermelons').value = 0;
            self.$('lhj_bet_txt_alarm').value = 0;
            self.$('lhj_bet_txt_coconut').value = 0;
            self.$('lhj_bet_txt_orange').value = 0;
            self.$('lhj_bet_txt_apple').value = 0;
            self.$('dice_bet_txt_even').value = 0;
            self.$('dice_bet_txt_odd').value = 0;
            self.$('dice_bet_txt_big').value = 0;
            self.$('dice_bet_txt_small').value = 0;

            display_segment("dgt_bar", lhj_bet_txt_bar.value, 5, 12, 20, 10);
            display_segment("dgt_seven", lhj_bet_txt_seven.value, 5, 12, 20, 10);
            display_segment("dgt_star", lhj_bet_txt_star.value, 5, 12, 20, 10);
            display_segment("dgt_watermelons", lhj_bet_txt_watermelons.value, 5, 12, 20, 10);
            display_segment("dgt_alarm", lhj_bet_txt_alarm.value, 5, 12, 20, 10);
            display_segment("dgt_coconut", lhj_bet_txt_coconut.value, 5, 12, 20, 10);
            display_segment("dgt_orange", lhj_bet_txt_orange.value, 5, 12, 20, 10);
            display_segment("dgt_apple", lhj_bet_txt_apple.value, 5, 12, 20, 10);
            display_segment("dice_even", dice_bet_txt_even.value, 5, 12, 20, 10);
            display_segment("dice_odd", dice_bet_txt_odd.value, 5, 12, 20, 10);
            display_segment("dice_big", dice_bet_txt_big.value, 5, 12, 20, 10);
            display_segment("dice_small", dice_bet_txt_small.value, 5, 12, 20, 10);
        }
        $("#bet_init").bind("taphold", tapholdHandler14);
        function tapholdHandler14(event) {
            $("#bet_init").attr("xlink:href", "/files/image/images/main_btn_area_.png");
        }
        $("#bet_init").bind("touchend", touchendHandler14);
        function touchendHandler14(event) {
            $("#bet_init").attr("xlink:href", "/files/image/images/main_btn_area.png");
        }        
        this.$('bet_init').onmouseup = function (event) {  
            $("#bet_init").attr("xlink:href", "/files/image/images/main_btn_area.png");
        }

        /// ***** Reset bet amount input window  end  **********////

        /// spin implementation
        var spin_play = function () {
            var rst = "";            
            var rst = PostAjax("/Ajax/game_result.ashx", "round=" + round);            
            if (rst == "") location.href = "m_main.aspx";

            var grst = new Array(4);
            grst = rst.split(',');
            var box_num = parseInt(grst[0]);
            var dice1_point = parseInt(grst[1]);
            var dice2_point = parseInt(grst[2]);
            var dice3_point = parseInt(grst[3]);

            timer = setInterval(function () {
                if (diceBox_small.style.display == 'none') {
                    diceBox_small.style.display = 'block';
                    diceBox_big.style.display = 'none';
                } else {
                    diceBox_small.style.display = 'none';
                    diceBox_big.style.display = 'block';
                }
                if (diceBox_even.style.display == 'none') {
                    diceBox_even.style.display = 'block';
                    diceBox_odd.style.display = 'none';
                } else {
                    diceBox_even.style.display = 'none';
                    diceBox_odd.style.display = 'block';
                }
            }, 100);
            
            self._total += self._money;
            self._money = 0;
            self.$('lhj_ben_txt_total').innerHTML = self._total;
            self.$('lhj_ben_txt_money').innerHTML = self._money;
            
            this.disabled = true;
            self._isrun = true;
                        
            self._endbox = box_num;
            var step = (self._endbox - self._startbox) > 0 ? self._endbox - self._startbox : 24 - self._startbox + self._endbox;
            self._jumpnum = 24 * 4 + step; //这些需要算出来
            self.run();

            // Rolling dice and showing results
            display_segment("taisai_result", 0, 2, 15, 20, 2);
            $('#platform').removeClass('stop').addClass('playing');
            $('#platform1').removeClass('stop').addClass('playing');
            $('#platform2').removeClass('stop').addClass('playing');
            $('#dice');
            $('#dice1');
            $('#dice2');
            setTimeout(function () {
                $('#platform').removeClass('playing').addClass('stop');
                $('#platform1').removeClass('playing').addClass('stop');
                $('#platform2').removeClass('playing').addClass('stop');
                var number = Math.floor(Math.random() * 6) + 1;
                var number1 = Math.floor(Math.random() * 6) + 1;
                var number2 = Math.floor(Math.random() * 6) + 1;
                number = dice1_point;
                number1 = dice2_point;
                number2 = dice3_point;
                var x = 0, y = 20, z = -20;
                var x1 = 0, y1 = 20, z1 = -20;
                var x2 = 0, y2 = 20, z2 = -20;
                switch (number) {
                    case 1:
                        x = 0; y = 20; z = -20;
                        break;
                    case 2:
                        x = -100; y = -150; z = 10;
                        break;
                    case 3:
                        x = 0; y = -100; z = -10;
                        break;
                    case 4:
                        x = 0; y = 100; z = -10;
                        break;
                    case 5:
                        x = 80; y = 120; z = -10;
                        break;
                    case 6:
                        x = 0; y = 200; z = 10;
                        break;
                }
                switch (number1) {
                    case 1:
                        x1 = 0; y1 = 20; z1 = -20;
                        break;
                    case 2:
                        x1 = -100; y1 = -150; z1 = 10;
                        break;
                    case 3:
                        x1 = 0; y1 = -100; z1 = -10;
                        break;
                    case 4:
                        x1 = 0; y1 = 100; z1 = -10;
                        break;
                    case 5:
                        x1 = 80; y1 = 120; z1 = -10;
                        break;
                    case 6:
                        x1 = 0; y1 = 200; z1 = 10;
                        break;
                }
                switch (number2) {
                    case 1:
                        x2 = 0; y2 = 20; z2 = -20;
                        break;
                    case 2:
                        x2 = -100; y2 = -150; z2 = 10;
                        break;
                    case 3:
                        x2 = 0; y2 = -100; z2 = -10;
                        break;
                    case 4:
                        x2 = 0; y2 = 100; z2 = -10;
                        break;
                    case 5:
                        x2 = 80; y2 = 120; z2 = -10;
                        break;
                    case 6:
                        x2 = 0; y2 = 200; z2 = 10;
                        break;
                }
                $('#dice').css({ 'transform': 'rotateX(' + x + 'deg) rotateY(' + y + 'deg) rotateZ(' + z + 'deg)' });
                $('#platform').css({ 'transform': 'translate3d(0,0, 0px)' });

                $('#dice1').css({ 'transform': 'rotateX(' + x1 + 'deg) rotateY(' + y1 + 'deg) rotateZ(' + z1 + 'deg)' });
                $('#platform1').css({ 'transform': 'translate3d(0,0, 0px)' });

                $('#dice2').css({ 'transform': 'rotateX(' + x2 + 'deg) rotateY(' + y2 + 'deg) rotateZ(' + z2 + 'deg)' });
                $('#platform2').css({ 'transform': 'translate3d(0,0, 0px)' });

                dice_point = number + number1 + number2;
                display_segment("taisai_result", dice_point, 2, 15, 20, 2);

                clearTimeout(timer);
                if (dice_point < 11) {
                    diceBox_small.style.display = 'block';
                    diceBox_big.style.display = 'none';
                } else {
                    diceBox_big.style.display = 'block';
                    diceBox_small.style.display = 'none';
                }
                if (dice_point % 2 == 0) {
                    diceBox_even.style.display = 'block';
                    diceBox_odd.style.display = 'none';
                } else {
                    diceBox_odd.style.display = 'block';
                    diceBox_even.style.display = 'none';
                }
            }, 9000);
        }


        function update() {
            
            if (bg_sound_state == 0) { // game background music
                bg_music.stop();
            } else {
                if (bg_sound == 1) {
                    bg_music.play();
                    bg_sound = 0;
                }
            }

            if (eff_sound_state == 1)
            {
                if (spin_eff_sound == 1) { // spin effect sound
                    spin_sound.play();
                    spin_eff_sound = 0;
                }
                
                if (betbtn_eff_sound == 1) {// betting button effect sound
                    bet_sound.play();
                    betbtn_eff_sound = 0;
                }

                if (finshbtn_eff_sound == 1) {// to prev value, betting button effect sound
                    betfinish_sound.play();
                    finshbtn_eff_sound = 0;
                }

                if (initbtn_eff_sound == 1) {// Betting value reset button effect sound
                    betinit_sound.play();
                    initbtn_eff_sound = 0;
                }

                if (selchip_eff_sound == 1) {// Betting unit decision button effect sound
                    selchip_sound.play();
                    selchip_eff_sound = 0;
                }

                if (luck_eff_sound == 1) {// luck effect sound
                    luck_sound.play();
                    luck_eff_sound = 0;
                }
                if (luckspin_eff_sound == 1) {// luck spin effect sound
                    luck_spin.play();
                    luckspin_eff_sound = 0;
                }
                if (countdown_eff_sound == 1) {// countdown beep
                    countdown_sound.play();
                    countdown_eff_sound = 0;
                }
                if (countdown_1_sound == 1) {// count down "one"
                    countdown_1.play();
                    countdown_1_sound = 0;
                }
                if (countdown_2_sound == 1) {// count down "two"
                    countdown_2.play();
                    countdown_2_sound = 0;
                }
                if (countdown_3_sound == 1) {// count down "three"
                    countdown_3.play();
                    countdown_3_sound = 0;
                }
                if (countdown_go_sound == 1) {// count down "three"
                    countdown_go.play();
                    countdown_go_sound = 0;
                }                
                if (betting_start_sound == 1) {// Start betting
                    betting_start.play();
                    betting_start_sound = 0;
                }
                if (betting_stop_sound == 1) {// Start betting
                    betting_stop.play();
                    betting_stop_sound = 0;
                }
                
                if (apple_sound_eff == 1) {// apple
                    apple_sound.play();
                    apple_sound_eff = 0;
                }
                if (orenge_sound_eff == 1) {// orange
                    orenge_sound.play();
                    orenge_sound_eff = 0;
                }
                if (mongo_sound_eff == 1) {// mango
                    mongo_sound.play();
                    mongo_sound_eff = 0;
                }
                if (bell_sound_eff == 1) {// bell
                    bell_sound.play();
                    bell_sound_eff = 0;
                }
                if (watermellon_sound_eff == 1) {// melon
                    watermellon_sound.play();
                    watermellon_sound_eff = 0;
                }
                if (star_sound_eff == 1) {// star
                    star_sound.play();
                    star_sound_eff = 0;
                }
                if (seven_sound_eff == 1) {// 77
                    seven_sound.play();
                    seven_sound_eff = 0;
                }
                if (bar_sound_eff == 1) {// bar
                    bar_sound.play();
                    bar_sound_eff = 0;
                }
            }
            
        }
    }
