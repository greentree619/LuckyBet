    var ben_txtheight=91;
    var mainframeBorder = 350;
    var b_d_height = 62;
    var dgt_width = 69;
    var sectime =120;
    var dice_point = 0;      

    var csstypell = ['b_apple', 's_apple', 'b_coconut', 'b_watermelons', 's_watermelons', 'b_cha',
        'b_apple', 's_orange', 'b_orange', 'b_alarm', 's_seven', 'b_seven', 'b_apple',  's_coconut',
        'b_coconut', 'b_star', 's_star', 'cha', 'b_apple', 's_alarm', 'b_orange', 'b_alarm', 's_bar', 'b_bar'];
    var slotlogcss = ['_b_apple', '_s_apple', '_b_coconut', '_b_watermelons', '_s_watermelons', '_b_cha',
            '_b_apple', '_s_orange', '_b_orange', '_b_alarm', '_s_seven', '_b_seven', '_b_apple', '_s_coconut',
            '_b_coconut', '_b_star', '_s_star', '_cha', '_b_apple', '_s_alarm', '_b_orange', '_b_alarm', '_s_bar', '_b_bar'];
    var taisailogcss = ['_dice_small_', '_dice_big_'];
    var evoddlogcss = ['_dice_even_', '_dice_odd_'];


    ///   각도조절가능한 7segment 생성
    function display_segment(id, value, digit, dwidth, dheight, dangle) {
        var segtext = value.toString();
        var spacetext = "";
        if (segtext.length < digit)  {
            for (var i = 0; i < digit - segtext.length; i++) {
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
        display.colorOn         = "rgba(255, 255, 64, 0.9)";
        display.colorOff        = "rgba(100, 106, 130, 0.1)";
        display.setValue(spacetext + segtext);
    }

/// 프로퍼티 설정 ///
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
        // 배당률
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

        this._startbox = 1;         //上次结果，此次的起点  시작점
        this._endbox = 1;          //这是这次的结果
        this._jumpnum = 1;        //这些需要算出来
        this._currentshowlist = [1];  
        
        //(状态值)(게임상태)
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

    wLaoHuJi.prototype._getpieceinfo = function (i, j) {     // 스핀박스 포괄정보(박스형, css클라스명, 박스번호, 박스이름)
        switch (i + "-" + j) {
            case "0-0": return { "type": "orange", "css": "b_orange", "list": 21, "multi": "b_orange" };
            case "0-1": return { "type": "alarm", "css": "b_alarm", "list": 22, "multi": "b_alarm" };
            case "0-2": return { "type": "bar", "css": "s_bar", "list": 23, "multi": "s_bar" };
            case "0-3": return { "type": "bar", "css": "b_bar", "list": 24, "multi": "b_bar" };
            case "0-4": return { "type": "apple", "css": "b_apple", "list": 1, "multi": "b_apple" };
            case "0-5": return { "type": "apple", "css": "s_apple", "list": 2, "multi": "small" };
            case "0-6": return { "type": "coconut", "css": "b_coconut", "list": 3, "multi": "b_coconut" };
            case "1-0": return { "type": "alarm", "css": "s_alarm", "list": 20, "multi": "small" };
            case "2-0": return { "type": "apple", "css": "b_apple", "list": 19, "multi": "b_apple" };
            case "3-0": return { "type": "cha", "css": "cha", "list": 18, "multi": "cha" };
            case "4-0": return { "type": "star", "css": "s_star", "list": 17, "multi": "small" };
            case "5-0": return { "type": "star", "css": "b_star", "list": 16, "multi": "b_star" };
            case "6-0": return { "type": "coconut", "css": "b_coconut", "list": 15, "multi": "b_coconut" };
            case "6-1": return { "type": "coconut", "css": "s_coconut", "list": 14, "multi": "small" };
            case "6-2": return { "type": "apple", "css": "b_apple", "list": 13, "multi": "b_apple" };
            case "6-3": return { "type": "seven", "css": "b_seven", "list": 12, "multi": "b_seven" };
            case "6-4": return { "type": "seven", "css": "s_seven", "list": 11, "multi": "small" };
            case "6-5": return { "type": "alarm", "css": "b_alarm", "list": 10, "multi": "b_alarm" };
            case "6-6": return { "type": "orange", "css": "b_orange", "list": 9, "multi": "b_orange" };
            case "5-6": return { "type": "orange", "css": "s_orange", "list": 8, "multi": "small" };
            case "4-6": return { "type": "apple", "css": "b_apple", "list": 7, "multi": "b_apple" };
            case "3-6": return { "type": "cha", "css": "b_cha", "list": 6, "multi": "b_cha" };
            case "2-6": return { "type": "watermelons", "css": "s_watermelons", "list": 5, "multi": "small" };
            case "1-6": return { "type": "watermelons", "css": "b_watermelons", "list": 4, "multi": "b_watermelons" };
            default: return { "type": "", "css": "", "list": 0, "multi": "" };
        }
    };

    //显示单个或多个灯
    ////  스핀시 이동하는 박스 현시하기 ////
    wLaoHuJi.prototype.showbox = function(index) {
        var i, len, tpleft, tptop, box = '';
        var  cssString ='';
        if (typeof (index) === 'number' && index > 0 && index < 25) {
            tpleft = this._piecelistposition[index].left;
            tptop = this._piecelistposition[index].top;
            var cssString = csstypell[index-1];
            box = "<div style='position:absolute;width:" + this._config.cardwidth + "px;height:" + this._config.cardheight + "px;left:" + tpleft + "px;top:" + tptop + "px;' class='"+ cssString +"'><audio src='../files/audio/bet.mp3' autoplay=''></audio> </div>";
            this.frame.piece.run.innerHTML = box;
        }
        else if (this.isArray(index) && index.length > 0) {
            len = index.length;
            for (i = 0; i < len; i++) {
                tpleft = this._piecelistposition[index[i]].left;
                tptop = this._piecelistposition[index[i]].top;
                cssString = csstypell[index-1];
                box += "<div style='position:absolute;width:" + this._config.cardwidth + "px;height:" + this._config.cardheight + "px;left:" + tpleft + "px;top:" + tptop + "px;' class='"+ cssString +"'><audio src='../files/audio/bet.mp3' autoplay=''></audio></div>";
            }
            this.frame.piece.run.innerHTML = box;
        }
    }

    //每次改变需要显示的box，返回速度 
    // 슬롯머신 시작과 끝에 속도 증가/감소 조정(사작:300,250,210...150/ 끝:70, ...,300,360,430ms간격으로 증가/감소)
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


/////****   슬롯머신 스핀 플레이  /////
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
 

/////*****   게임플레이/배팅 결과 산출하기 start *****/////
    wLaoHuJi.prototype.result = function () {      

        var winbox = this._endbox;  // 스핀닝 endbox
        var taisai = 0;
        var evodd = 1;
        var type = this._piecelisttype[winbox];  // 스핀닝 endbox형        

        // 슬롯머신 로그기록
        var cssName = slotlogcss[winbox - 1];
        var text = "<div style='width:75px;height:80px' class='" + cssName + "'></div>"
        if (text.length) {            
            $('<li />', { html: text }).prependTo('ul.slot_log')
        }        

        if (type == "cha" || winbox == 6) {  //luck에서 스핀엔드 했을시 처리
                   
            bflat = new Audio("../files/audio/luck.mp3"); //효과음
            bflat.play();

            var rst = PostAjax("/Ajax/game_result.ashx");
            var grst = new Array(5);
            grst = rst.split(',');
            var aa = parseInt(grst[0]);
            var bb = parseInt(grst[1]);
            var cc = parseInt(grst[2]);
            var dd = parseInt(grst[3]);
            var ee = parseInt(grst[4]);

            if (ee != 0) {
                var showtimet = 1500;                
                if (ee == 2 || ee == 3) {////꼬리
                    showtimet = 3500;
                    var tail_len = 0;
                    if (ee == 2) tail_len = 3;
                    if (ee == 3) tail_len = 4;
                    for (i = winbox + 1; i <= (winbox + tail_len) ; i++) {
                        (function (i) {
                            this.setTimeout(function () {
                                document.getElementById(i).style.display = 'block';
                                bflat = new Audio("../files/audio/bet.mp3"); //효과음
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
                            bflat = new Audio("../files/audio/hit.mp3");     //효과음
                            bflat.play();
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

                setTimeout(function () {
                    document.getElementById(aa).style.display = 'block';
                    bflat = new Audio("../files/audio/bet.mp3");     //효과음
                    bflat.play();
                    setTimeout(function () {
                        document.getElementById(bb).style.display = 'block';
                        bflat = new Audio("../files/audio/bet.mp3");     //효과음
                        bflat.play();
                        setTimeout(function () {
                            document.getElementById(cc).style.display = 'block';
                            bflat = new Audio("../files/audio/bet.mp3");     //효과음
                            bflat.play();
                            setTimeout(function () {
                                if (dd != 0) {
                                    document.getElementById(dd).style.display = 'block';
                                    bflat = new Audio("../files/audio/bet.mp3");     //효과음
                                    bflat.play();
                                }     
                                setTimeout(function () {
                                    document.getElementById(aa).style.display = 'none';
                                    document.getElementById(bb).style.display = 'none';
                                    document.getElementById(cc).style.display = 'none';
                                    if (dd != 0) document.getElementById(dd).style.display = 'none';
                                    if (ee != 0) document.getElementById(ee).style.display = 'none';
                                }, 3000);                                
                            }, 500);
                        }, 500);
                    }, 500);
                }, showtimet);
            }
        }       
        
        if (dice_point > 10) taisai = 1;
        if (dice_point % 2 == 0) evodd = 0;

        // 다이스 로그기록  
        var csstaisai = taisailogcss[taisai];
        var text = "<div style='width:75px;height:80px' class='" + csstaisai + "'></div>"
        if (text.length) {
            $('<li />', { html: text }).prependTo('ul.diceTai_log')
        }        
        var cssevodd = evoddlogcss[evodd];
        var text = "<div style='width:75px;height:80px' class='" + cssevodd + "'></div>"
        if (text.length) {
            $('<li />', { html: text }).prependTo('ul.diceodd_log')
        }       
 
    }
/////*****   게임플레이/배팅 결과 산출하기 end *****/////


/////*****  페지가 로딩될때 실행되는 초기화 및 기본로직 /////
    wLaoHuJi.prototype.init = function() {
        var i, j, piecewidth, pieceheight, betwidth, betheight, tnhtml, piecehtml, bethtml, advwidth, advheight, advleft, advtop, bsheight, self = this._self;

        ///  플레이부분(lhj_piece_run)과 배팅부분(lhj_bet)으로 나누어진 기본 div 속성값 설정 ///
        this._mainDiv = this.$(this.frameid);
        
        piecewidth = (this._config.cardwidth + this._config.margin) * 7 + this._config.margin + 2;
        pieceheight = (this._config.cardheight + this._config.margin) * 7 + this._config.margin + 2 + ben_txtheight;
        betwidth = (this._config.betcardwidth + this._config.margin) * 8 + this._config.margin + 2;
        betheight = (this._config.betcardwidth + this._config.margin + 100)* 2 ;
        this._mainDiv.style.border = "1px solid green";
        this._mainDiv.style.width = 1920 + "px";
        this._mainDiv.style.height = 1080 + "px";
        this._mainDiv.style.margin = "0";
        this._mainDiv.style.padding = "0";
        this._mainDiv.id = "Game_mainframe";

        ///  플레이부분(lhj_piece_run)과 배팅부분(lhj_bet)으로 나누어진 기본 div 안장 ///
        mainhtml = "<div style = 'position: relative;top:0px;left:0px;width:" + piecewidth + "px;height:" + pieceheight + "px;'><div id='lhj_piece_bg' style='position:absolute;top:0,left:0;z-index:101;'></div><div id='lhj_piece_run' style='position:absolute;top:0,left:0;z-index:102;'></div></div><div id='lhj_bet'> </div>";
        this._mainDiv.innerHTML = mainhtml;
        this.frame.piece.bg = this.$('lhj_piece_bg'); //this._mainDiv.childNodes[0].childNodes[0].childNodes[0];
        this.frame.piece.run = this.$('lhj_piece_run');
        this.frame.bet = this.$('lhj_bet'); //this._mainDiv.childNodes[0].childNodes[0].childNodes[1];
                
        piecehtml = [];
        piecehtml.push("<canvas id='countdown' style='width:80px; height:30px; position: absolute; left:1038px; top:22px'></canvas>");  ///카운트다운 7segment

        ////   슬롯머신 스핀닝박스 안장(24개) 현재는 배경이미지로 대체(현시안함)
        for (i = 0; i < 7; i++) {
            for (j = 0; j < 7; j++) {
                if (i == 0 || j == 0 || i == 6 || j == 6) {
                    var tpleft = j * (this._config.cardwidth + this._config.margin) + mainframeBorder;
                    var tptop = i * (this._config.cardheight + this._config.margin) + ben_txtheight;
                    var tpinfo = this._getpieceinfo(i, j);
                    piecehtml.push("<div id='" + tpinfo.list + "' style='position:absolute;width:" + this._config.cardwidth + "px;height:" + this._config.cardheight + "px;left:" + tpleft + "px;top:" + tptop + "px; display: none' class='piece " + tpinfo.css + "'></div>");
                    this._piecelistposition[tpinfo.list] = { left: tpleft, top: tptop };
                    this._piecelistmulti[tpinfo.list] = this._multitype[tpinfo.multi];
                    this._piecelisttype[tpinfo.list] = tpinfo.type;
                }
            }
        }

        ////    다이스롤링 결과 포인트값 현시 7segment안장
        piecehtml.push("<canvas id='taisai_result' style='width:76px; height:40px; position: absolute; left:665px; top:458px'></canvas>");
        ////    1번 다이스 안장  ////
        piecehtml.push("<div id='dicediv0' style='position: absolute; width:70px; height:70px; left:572px; top:530px;'>");
        piecehtml.push("<image id='dice0' width='70' height='70' src ='/files/image/images_n/dice_1.png' />");
        piecehtml.push("</div>");
        ////    2번 다이스 안장  ////
        piecehtml.push("<div id='dicediv4' style='position: absolute; width:70px; height:70px; left:670px; top:530px;'>");
        piecehtml.push("<image id='dice4' width='70' height='70' src ='/files/image/images_n/dice_1.png' />");
        piecehtml.push("</div>");
        ////    3번 다이스 안장  ///
        piecehtml.push("<div id='dicediv3' style='position: absolute; width:70px; height:70px; left:768px; top:530px;'>");
        piecehtml.push("<image id='dice3' width='70' height='70' src ='/files/image/images_n/dice_1.png' />");
        piecehtml.push("</div>");
        ////   다이스 대,소,홋,단 박스안장  (초기 숨김상태)
        piecehtml.push("<div id='diceBox_big' style = 'width:85px; height:85px; background:url(../files/image/images/dice_big.png); position: absolute; left:534px; top:617px; display: none'></div>");
        piecehtml.push("<div id='diceBox_small' style = 'width:85px; height:85px; background:url(../files/image/images/dice_small.png); position: absolute; left:619px; top:617px; display: none'></div>");
        piecehtml.push("<div id='diceBox_odd' style = 'width:85px; height:85px; background:url(../files/image/images/dice_odd.png); position: absolute; left:704px; top:617px; display: none'></div>");
        piecehtml.push("<div id='diceBox_even' style = 'width:85px; height:85px; background:url(../files/image/images/dice_even.png); position: absolute; left:789px; top:617px; display: none'></div>");
        this.frame.piece.bg.innerHTML = piecehtml.join('');
 
        bethtml = [];
        ///신호등
        bethtml.push("<image width='125' height='41' src ='../files/image/images/countdn.png' style='left:910px; top:20px; position: absolute '/>");
        bethtml.push("<image id='vetlabel' width='138' height='43' src ='../files/image/images/t1.png' style='left:1150px; top:18px; position: absolute '/>");
        bethtml.push("<image id='red_lamp' width='25' height='25' src ='../files/image/images/led-green.png' style='left:1300px; top:30px; position: absolute '/>");
        bethtml.push("<audio id='bflat'> </audio>");
        this.frame.bet.innerHTML = bethtml.join('');
        
        display_segment("taisai_result", dice_point, 2, 12, 20, 2);   /// 다이스롤링 포인트값 7segment현시(초기 0)

        /// 서버시간 읽어오기 & 계수기시간, 회차계산
        var xmlHttp;
        function srvTime() {
            if (window.XMLHttpRequest) {//분기하지 않으면 IE에서만 작동된다.
                xmlHttp = new XMLHttpRequest(); // IE 7.0 이상, 크롬, 파이어폭스 등
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

        ////   카운트 다운 7segment 현시   ////
        sectime = 120-remain_gtime;
        setInterval(function () {
            sectime = sectime - 1;

            if(sectime == 0) {
                sectime = 120;
                round += 1;
                spin_play();   /// play
                
            }
            if (sectime == 106) {
                $("#red_lamp").attr("src", "../files/image/images/led-green.png");
                $("#vetlabel").attr("src", "../files/image/images/t1.png");

                st = srvTime();
                today = new Date(st);
                times = today.getHours() * 3600 + today.getMinutes() * 60 + today.getSeconds();
                remain_gtime = times % 120;
                sectime = 120 - remain_gtime;
            }
            if (sectime < 20) {                
                $("#red_lamp").attr("src", "/files/image/images/led-red.png");
                $("#vetlabel").attr("src", "/files/image/images/t1_.png");
            }            
            display_segment("countdown", sectime, 3, 12, 20, 2);   
        },1000);
                
           
        /// 스핀구현
        var spin_play = function () {
            var rst = "";
            var rst = PostAjax("/Ajax/game_result.ashx", "round=" + round);
            if (rst == "") location.href = "main.aspx";
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
                action_num = Math.floor(Math.random() * 8);
                $("#dice0").attr("src", "/files/image/images_n/dice_action_" + action_num + ".png");
                action_num3 = Math.floor(Math.random() * 8);
                $("#dice3").attr("src", "/files/image/images_n/dice_action_" + action_num3 + ".png");
                action_num4 = Math.floor(Math.random() * 8);
                $("#dice4").attr("src", "/files/image/images_n/dice_action_" + action_num4 + ".png");
            }, 100);

            self._endbox = box_num;
            var step = (self._endbox - self._startbox) > 0 ? self._endbox - self._startbox : 24 - self._startbox + self._endbox;
            self._jumpnum = 24 * 4 + step; //这些需要算出来
            self.run();

            // 다이사이 다이스 롤링 및 결과보여주기            
            setTimeout(function () {
                dice_point = dice1_point + dice2_point + dice3_point;
                display_segment("taisai_result", dice_point, 2, 12, 20, 2);

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
                $("#dice0").attr("src", "/files/image/images_n/dice_" + dice1_point + ".png");
                $("#dice3").attr("src", "/files/image/images_n/dice_" + dice3_point + ".png");
                $("#dice4").attr("src", "/files/image/images_n/dice_" + dice2_point + ".png");
            }, 7000);
        }

    }
