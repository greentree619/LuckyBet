var spin_top = 80;
var spin_left = 408;
var sectime = 120;
var dice_point = 0;
var bet_rate = 1.96;
var bet_state = 0;
var coin = 0;
var num_rate = 1;

var bar = 0;
var seven = 0;
var star = 0;
var watermelon = 0;
var bell = 0;
var lemon = 0;
var orange = 0;
var apple = 0;
var doub = 0;
var singl = 0;
var big = 0;
var small = 0;

var csstypell = ['b_apple', 's_apple', 'b_coconut', 'b_watermelons', 's_watermelons', 'b_cha',
    'b_apple', 's_orange', 'b_orange', 'b_alarm', 's_seven', 'b_seven', 'b_apple', 's_coconut',
    'b_coconut', 'b_star', 's_star', 'cha', 'b_apple', 's_alarm', 'b_orange', 'b_alarm', 's_bar', 'b_bar'];
var slotlogcss = ['_b_apple', '_s_apple', '_b_coconut', '_b_watermelons', '_s_watermelons', '_b_cha',
        '_b_apple', '_s_orange', '_b_orange', '_b_alarm', '_s_seven', '_b_seven', '_b_apple', '_s_coconut',
        '_b_coconut', '_b_star', '_s_star', '_cha', '_b_apple', '_s_alarm', '_b_orange', '_b_alarm', '_s_bar', '_b_bar'];
var taisailogcss = ['_dice_small_', '_dice_big_'];
var evoddlogcss = ['_dice_even_', '_dice_odd_'];

var item_name = ['大苹果', '小苹果', '大芒果', '大西瓜', '小西瓜', 'Luck',
        '大苹果', '小橙子', '大橙子', '大钟', '小七七', '大七七', '大苹果', '小芒果',
        '大芒果', '大星星', '小星星', 'Luck', '大苹果', '小钟', '大橙子', '大钟', '小吧', '大吧'];

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
    display.colorOn = "rgba(255, 255, 64, 0.9)";
    display.colorOff = "rgba(100, 106, 130, 0.1)";
    display.setValue(spacetext + segtext);

}

/// 11자리수 현시용 7segment 생성///
function digit7_total(id, value, digit) {
    var segtext = value.toString();
    var spacetext = "";
    if (segtext.length < digit) {
        for (var i = 0; i < digit - segtext.length; i++) {
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


/// 프로퍼티 설정 ///
function wLaoHuJi(id) {
    this.frameid = id;
    this._doc = document;
    this._config = {
        cardwidth: 88,
        cardheight: 88,        
        margin: 5,
        maxbet: 9999,
    };
    this._piecelist = [];
    // 배당률
    this._multitype = {
        "b_bar": 120,
        "s_bar": 50,
        "b_seven": 40,
        "b_star": 30,
        "b_watermelons": 20,
        "b_alarm": 20,
        "b_coconut": 15,
        "b_orange": 10,
        "b_apple": 5,
        "small": 2,
        "cha": 0
    };
    this._piecelistposition = {};
    this._piecelistmulti = {};
    this._piecelisttype = {};

    this._money = 0;
    this._total = usercoin;           //보유머니 기본값은 100 점이다
    this._startbox = 1;         //上次?果，此次的起点  시작점
    this._endbox = 1;          //?是?次的?果
    this._jumpnum = 1;        //?些需要算出?
    this._currentshowlist = [1];

    //(???)(게임상태)
    this._isfirstbet = true;
    this._isrun = false;
    //定?器(timer)
    this._interval = null;

    this._mainDiv = null;
    this.frame = {
        "piece": { "bg": null, "run": null },
        "bet": null
    };
    this._self = this;
    for (var i = 1; i < 25; i++) {
        this._piecelist.push(i);
    }
}

wLaoHuJi.prototype.$ = function (id) {
    if (!this._doc) {
        this._doc = document;
    }
    if (id && typeof (id) === "string") {
        return this._doc.getElementById(id);
    }
    return null;
};


wLaoHuJi.prototype.isArray = function (obj) {
    return Object.prototype.toString.call(obj) === '[object Array]';
}

wLaoHuJi.prototype.in_Array = function (arr, e) {
    for (var i = 0; i < arr.length; i++) {
        if (arr[i] == e)
            return true;
    }
    return false;
}

//生成?机?
wLaoHuJi.prototype.rand = function (min, max) {
    return parseInt(Math.random() * (max - min + 1) + min);
}

// 스핀박스 포괄정보(박스형, css클라스명, 박스번호, 박스이름)
wLaoHuJi.prototype._getpieceinfo = function (i, j) {
    switch (i + "-" + j) {
        case "0-0":
            return { "type": "orange", "css": "b_orange", "list": 21, "multi": "b_orange" };
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

//?示??或多??
////  스핀시 이동하는 박스 현시하기 ////
wLaoHuJi.prototype.showbox = function (index) {
    var i, len, tpleft, tptop, box = '';
    var cssString = '';
    if (typeof (index) === 'number' && index > 0 && index < 25) {
        tpleft = this._piecelistposition[index].left;
        tptop = this._piecelistposition[index].top;
        var cssString = csstypell[index - 1];
        box = "<div style='position:absolute;width:" + this._config.cardwidth + "px;height:" + this._config.cardheight + "px;left:" + tpleft + "px;top:" + tptop + "px;' class='" + cssString + "'><audio src='../files/audio/bet.mp3' autoplay=''></audio> </div>";
        this.frame.piece.run.innerHTML = box;
    }
    else if (this.isArray(index) && index.length > 0) {
        len = index.length;
        for (i = 0; i < len; i++) {
            tpleft = this._piecelistposition[index[i]].left;
            tptop = this._piecelistposition[index[i]].top;
            cssString = csstypell[index - 1];
            box += "<div style='position:absolute;width:" + this._config.cardwidth + "px;height:" + this._config.cardheight + "px;left:" + tpleft + "px;top:" + tptop + "px;' class='" + cssString + "'><audio src='../files/audio/bet.mp3' autoplay=''></audio></div>";
        }
        this.frame.piece.run.innerHTML = box;
    }
}

//每次改?需要?示的box，返回速度 
// 슬롯머신 시작과 끝에 속도 증가/감소 조정(사작:300,250,210...150/ 끝:70, ...,300,360,430ms간격으로 증가/감소)
wLaoHuJi.prototype.changeshowlist = function (jumpindex) {
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
wLaoHuJi.prototype.run = function () {
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
            setTimeout(function () { self.result(); }, 200);
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
    var text = "<div style='width:68px;height:72px' class='" + cssName + "'></div>"
    if (text.length) {
        //   $('<li />', { html: text }).appendTo('ul.slot_log')
        $('<li />', { html: text }).prependTo('ul.slot_log');
    }
    //$("#slot_log").scrollTop($("#slot_log")[0].scrollHeight);     
    ///////////////////////

    if (type == "cha" || winbox == 6) {  //luck에서 스핀엔드 했을시 처리
        //未得?，或?的?，?无        
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

        var type1 = this._piecelisttype[aa];
        var betid1 = "lhj_bet_txt_" + type1;
        var type2 = this._piecelisttype[bb];
        var betid2 = "lhj_bet_txt_" + type2;
        var type3 = this._piecelisttype[cc];
        var betid3 = "lhj_bet_txt_" + type3;
        if (dd != 0) {
            var type4 = this._piecelisttype[dd];
            var betid4 = "lhj_bet_txt_" + type4;
        }
        if (ee != 0) {
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
        ////꼬리
        if (ee == 2 || ee == 3) {
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
        if (ee != 0) {
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
    else {  // 일반스핀결과 처리
        var betid = "lhj_bet_txt_" + type;
        var betnum = parseInt(this.$(betid).value);       
        if (betnum > 0 && bet_state == 1) {
            this._money = parseInt(this._piecelistmulti[winbox]) * betnum;
            this.$('lhj_ben_txt_money').innerHTML = this._money;
        }
    }   
    if (this._money > 0) {   // 스핀에서 어떤 아이템에 적중했을시 적중 및 배당결과를 게임로그창에 뿌리기
        var text = "<span style='color:red; font-size:14px'>恭喜 </span>";
        text += " " + username + " ";
        text += "<span style='color:black; font-size:14px'> 猜中 </span>";
        text += " '" + item_name[winbox - 1].toString() + "' ";
        text += "<span style='color:black; font-size:14px'>   获得 </span>";
        text += this._money.toString() + "金市";

        if (text.length) {
            $('<li />', { html: text }).appendTo('ul.total_log');
        }
        $("#total_log").scrollTop($("#total_log")[0].scrollHeight);
    }

    var text1 = "";
    if (bet_state == 1) { // 배팅확정버튼을 눌렀을시
        if (dice_point < 11) { // 다이사이에서 '소'에 적중했을시 적중 및 배당결과를 게임로그창에 뿌리기
            this._money = parseInt(this._money + (dice_bet_txt_small.value) * bet_rate);
            if ((dice_bet_txt_small.value) * bet_rate > 0) {
                text1 = "<span style='color:red; font-size:14px'>恭喜 </span>";
                text1 += " " + username + " ";
                text1 += "<span style='color:black; font-size:14px'> 猜中 '</span>";
                text1 += "<span style='color:red; font-size:14px'>小</span>";
                text1 += "<span style='color:black; font-size:14px'>'  获得 </span>";
                text1 += (parseInt((dice_bet_txt_small.value) * bet_rate)).toString() + "金市";
                $('<li />', { html: text1 }).appendTo('ul.total_log');
                $("#total_log").scrollTop($("#total_log")[0].scrollHeight);
            }
        } else { // 다이사이에서 '대'에 적중했을시 적중 및 배당결과를 게임로그창에 뿌리기
            this._money = parseInt(this._money + (dice_bet_txt_big.value) * bet_rate);
            if ((dice_bet_txt_big.value) * bet_rate > 0) {
                text1 = "<span style='color:red; font-size:14px'>恭喜 </span>";
                text1 += " " + username + " ";
                text1 += "<span style='color:black; font-size:14px'> 猜中 '</span>";
                text1 += "<span style='color:red; font-size:14px'>大</span>";
                text1 += "<span style='color:black; font-size:14px'>'  获得 </span>";
                text1 += (parseInt((dice_bet_txt_big.value) * bet_rate)).toString() + "金市";
                $('<li />', { html: text1 }).appendTo('ul.total_log');
                $("#total_log").scrollTop($("#total_log")[0].scrollHeight);
            }
        }
        if (dice_point % 2 == 0) { // 다이사이에서 '짝'에 적중했을시 적중 및 배당결과를 게임로그창에 뿌리기
            this._money = parseInt(this._money + (dice_bet_txt_even.value) * bet_rate);
            if ((dice_bet_txt_even.value) * bet_rate > 0) {
                text1 = "<span style='color:red; font-size:14px'>恭喜 </span>";
                text1 += " " + username + " ";
                text1 += "<span style='color:black; font-size:14px'> 猜中 '</span>";
                text1 += "<span style='color:red; font-size:14px'>双</span>";
                text1 += "<span style='color:black; font-size:14px'>'  获得 </span>";
                text1 += (parseInt((dice_bet_txt_even.value) * bet_rate)).toString() + "金市";
                $('<li />', { html: text1 }).appendTo('ul.total_log');
                $("#total_log").scrollTop($("#total_log")[0].scrollHeight);
            }
        } else {  // 다이사이에서 '홀'에 적중했을시 적중 및 배당결과를 게임로그창에 뿌리기
            this._money = parseInt(this._money + (dice_bet_txt_odd.value) * bet_rate);
            if ((dice_bet_txt_odd.value) * bet_rate > 0) {
                text1 = "<span style='color:red; font-size:14px'>恭喜 </span>";
                text1 += " " + username + " ";
                text1 += "<span style='color:black; font-size:14px'> 猜中 '</span>";
                text1 += "<span style='color:red; font-size:14px'>单</span>";
                text1 += "<span style='color:black; font-size:14px'>'  获得 </span>";
                text1 += (parseInt((dice_bet_txt_odd.value) * bet_rate)).toString() + "金市";
                $('<li />', { html: text1 }).appendTo('ul.total_log');
                $("#total_log").scrollTop($("#total_log")[0].scrollHeight);
            }
        }
        //alert(coin);
        coin = this._money - coin;
        //var AjaxValue = PostAjax("../Ajax/sendbet.aspx", "coin=" + coin + "&round=" + round);
    }
    bet_state = 0;
    digit7_total(txt_money_7dgt, this._money, 12);  // 배팅배당금액 현시

    if (dice_point > 10) taisai = 1;
    if (dice_point % 2 == 0) evodd = 0;

    // 다이스 로그기록  start
    var csstaisai = taisailogcss[taisai];
    var text = "<div style='width:68px;height:72px' class='" + csstaisai + "'></div>"
    if (text.length) {
        $('<li />', { html: text }).prependTo('ul.diceTai_log');
    }
    //$("#diceTai_log").scrollTop($("#diceTai_log")[0].scrollHeight);

    var cssevodd = evoddlogcss[evodd];
    var text = "<div style='width:68px;height:72px' class='" + cssevodd + "'></div>"
    if (text.length) {
        $('<li />', { html: text }).prependTo('ul.diceodd_log');
    }
    //$("#diceodd_log").scrollTop($("#diceodd_log")[0].scrollHeight);
    // 다이스 로그기록  end

    ///자료기지기록 로직으로....
    //var AjaxValue1 = PostAjax("../Ajax/sendbet.aspx", "round=" + round + "&fruit=" + winbox + "&taisai=" + taisai + "&evodd=" + evodd);

    //this._isfirstbet = true;
    this._isrun = false;
    $("#red_lamp").attr("src", "../files/image/images_n/led-green.png");
    $("#vetlabel").attr("src", "../files/image/images_n/t1.png");
    this.$('bet_finish').disabled = false;

    var step = (this._endbox - this._startbox) > 0 ? this._endbox - this._startbox : 24 - this._startbox + this._endbox;
    this._jumpnum = 24 * 2 + step; //?些需要算出?
    //this.run();
}
/////*****   게임플레이/배팅 결과 산출하기 end *****/////


/////*****  페지가 로딩될때 실행되는 초기화 및 기본로직 /////
wLaoHuJi.prototype.init = function () {
    var i, j, piecewidth, pieceheight, betwidth, betheight, piecehtml, bethtml, self = this._self;

    ///  플레이부분(lhj_piece_run)과 배팅부분(lhj_bet)으로 나누어진 기본 div 속성값 설정 ///
    this._mainDiv = this.$(this.frameid);

    piecewidth = (this._config.cardwidth + this._config.margin) * 7 + this._config.margin + 2;
    pieceheight = (this._config.cardheight + this._config.margin) * 7 + this._config.margin + 2;

    betwidth = 1430;
    betheight = 220;

    this._mainDiv.style.border = "1px solid green";
    this._mainDiv.style.width = 1918 + "px";
    this._mainDiv.style.height = 972 + "px";
    this._mainDiv.style.margin = "0";
    this._mainDiv.style.padding = "0";
    this._mainDiv.id = "Game_mainframe";

    //  플레이부분(lhj_piece_run)과 배팅부분(lhj_bet)으로 나누어진 기본 div 안장 ///
    var mainhtml = "<div style = 'position: relative;top:0px;left:0px;width:" + piecewidth + "px;height:" + pieceheight + "px;'>"
    mainhtml +=    " <div id='lhj_piece_bg' style='position:absolute;top:0,left:0;z-index:101;'></div>"
    mainhtml +=    " <div id='lhj_piece_run' style='position:absolute;top:0,left:0;z-index:102;'></div>"
    mainhtml +=    "</div>"
    mainhtml +=    "<div id='lhj_bet'> </div>";    
    this._mainDiv.innerHTML = mainhtml;

    this.frame.piece.bg = this.$('lhj_piece_bg');
    this.frame.piece.run = this.$('lhj_piece_run');
    this.frame.bet = this.$('lhj_bet');

    //初始化piece
    piecehtml = [];

    ///  숨긴 text입력창 배팅배당금액/usercoin잔액  ///
    piecehtml.push("<span class='lhj_span'><br /><span class='lhj_input lhj_money_input' id='lhj_ben_txt_money' />0</span></span>"); //배팅배당금액  text입력창
    piecehtml.push("<span class='lhj_span'><br /><span class='lhj_input lhj_money_input' id='lhj_ben_txt_total' />0</span></span>"); //usercoin잔액  text입력창
    ///   배팅배당금액 &&  usercoin잔액  7segment   ////
    piecehtml.push("<div id='txt_money_7dgt' style='width:277px; height:32px; position: absolute; left:315px; top:16px'></div>");   ///배팅배당금액  7segment
    piecehtml.push("<div id='txt_total_7dgt' style='width:277px; height:32px; position: absolute; left:603px; top:16px'></div>");   ///usercoin잔액  7segment
    piecehtml.push("<canvas id='countdown' style='width:65px; height:26px; position: absolute; left:1030px; top:18px'></canvas>");  ///카운트다운 7segment

    ////   슬롯머신 스핀닝박스 안장(24개) 현재는 배경이미지로 대체(현시안함)
    for (i = 0; i < 7; i++) {
        for (j = 0; j < 7; j++) {
            if (i == 0 || j == 0 || i == 6 || j == 6) {
                var tpleft = j * (this._config.cardwidth + this._config.margin) + spin_left;
                var tptop = i * (this._config.cardheight + this._config.margin) + spin_top;
                var tpinfo = this._getpieceinfo(i, j);
                piecehtml.push("<div id='" + tpinfo.list + "' style='position:absolute;width:" + this._config.cardwidth + "px;height:" + this._config.cardheight + "px;left:" + tpleft + "px;top:" + tptop + "px; display: none' class='piece " + tpinfo.css + "'></div>");
                this._piecelistposition[tpinfo.list] = { left: tpleft, top: tptop };
                this._piecelistmulti[tpinfo.list] = this._multitype[tpinfo.multi];
                this._piecelisttype[tpinfo.list] = tpinfo.type;
            }
        }
    }

    ////    다이스롤링 결과 포인트값 현시 7segment안장
    piecehtml.push("<canvas id='taisai_result' style='width:70px; height:35px; position: absolute; left:690px; top:412px'></canvas>");
    ////    1번 다이스 안장  ////
    piecehtml.push("<div id='dicediv0' style='position: absolute; width:70px; height:70px; left:605px; top:477px;'>");
    piecehtml.push("<image id='dice0' width='70' height='70' src ='/files/image/images_n/dice_1.png' />");
    piecehtml.push("</div>");
    ////    2번 다이스 안장  ////
    //piecehtml.push("<div id='platform1' style='position: absolute; left:702px; top:460px'>");
    //piecehtml.push("    <div id='dice1'>");
    //piecehtml.push("        <div class='side front'>");
    //piecehtml.push("            <div class='dot center'></div>");
    //piecehtml.push("        </div>");
    //piecehtml.push("        <div class='side front inner'></div>");
    //piecehtml.push("        <div class='side top'>");
    //piecehtml.push("            <div class='dot dtop dleft'></div>");
    //piecehtml.push("            <div class='dot dbottom dright'></div>");
    //piecehtml.push("        </div>");
    //piecehtml.push("        <div class='side top inner'></div>");
    //piecehtml.push("        <div class='side right'>");
    //piecehtml.push("            <div class='dot dtop dleft'></div>");
    //piecehtml.push("            <div class='dot center'></div>");
    //piecehtml.push("            <div class='dot dbottom dright'></div>");
    //piecehtml.push("        </div>");
    //piecehtml.push("        <div class='side right inner'></div>");
    //piecehtml.push("        <div class='side left'>");
    //piecehtml.push("            <div class='dot dtop dleft'></div>");
    //piecehtml.push("            <div class='dot dtop dright'></div>");
    //piecehtml.push("            <div class='dot dbottom dleft'></div>");
    //piecehtml.push("            <div class='dot dbottom dright'></div>");
    //piecehtml.push("        </div>");
    //piecehtml.push("        <div class='side left inner'></div>");
    //piecehtml.push("        <div class='side bottom'>");
    //piecehtml.push("            <div class='dot center'></div>");
    //piecehtml.push("            <div class='dot dtop dleft'></div>");
    //piecehtml.push("            <div class='dot dtop dright'></div>");
    //piecehtml.push("            <div class='dot dbottom dleft'></div>");
    //piecehtml.push("            <div class='dot dbottom dright'></div>");
    //piecehtml.push("        </div>");
    //piecehtml.push("        <div class='side bottom inner'></div>");
    //piecehtml.push("        <div class='side back'>");
    //piecehtml.push("            <div class='dot dtop dleft'></div>");
    //piecehtml.push("            <div class='dot dtop dright'></div>");
    //piecehtml.push("            <div class='dot dbottom dleft'></div>");
    //piecehtml.push("            <div class='dot dbottom dright'></div>");
    //piecehtml.push("            <div class='dot center dleft'></div>");
    //piecehtml.push("            <div class='dot center dright'></div>");
    //piecehtml.push("        </div>");
    //piecehtml.push("        <div class='side back inner'></div>");
    //piecehtml.push("        <div class='side cover x'></div>");
    //piecehtml.push("        <div class='side cover y'></div>");
    //piecehtml.push("        <div class='side cover z'></div>");
    //piecehtml.push("    </div>");
    //piecehtml.push("</div>");
    /////    3번 다이스 안장  ///
    piecehtml.push("<div id='dicediv3' style='position: absolute; width:70px; height:70px; left:780px; top:477px;'>");
    piecehtml.push("<image id='dice3' width='70' height='70' src ='/files/image/images_n/dice_1.png' />");
    piecehtml.push("</div>");
    piecehtml.push("<div id='dicediv4' style='position: absolute; width:70px; height:70px; left:693px; top:477px;'>");
    piecehtml.push("<image id='dice4' width='70' height='70' src ='/files/image/images_n/dice_1.png' />");
    piecehtml.push("</div>");

    //piecehtml.push("<div id='platform2' style='position: absolute; left:790px; top:460px'>");
    //piecehtml.push("    <div id='dice2'>");
    //piecehtml.push("        <div class='side front'>");
    //piecehtml.push("            <div class='dot center'></div>");
    //piecehtml.push("        </div>");
    //piecehtml.push("        <div class='side front inner'></div>");
    //piecehtml.push("        <div class='side top'>");
    //piecehtml.push("            <div class='dot dtop dleft'></div>");
    //piecehtml.push("            <div class='dot dbottom dright'></div>");
    //piecehtml.push("        </div>");
    //piecehtml.push("        <div class='side top inner'></div>");
    //piecehtml.push("        <div class='side right'>");
    //piecehtml.push("            <div class='dot dtop dleft'></div>");
    //piecehtml.push("            <div class='dot center'></div>");
    //piecehtml.push("            <div class='dot dbottom dright'></div>");
    //piecehtml.push("        </div>");
    //piecehtml.push("        <div class='side right inner'></div>");
    //piecehtml.push("        <div class='side left'>");
    //piecehtml.push("            <div class='dot dtop dleft'></div>");
    //piecehtml.push("            <div class='dot dtop dright'></div>");
    //piecehtml.push("            <div class='dot dbottom dleft'></div>");
    //piecehtml.push("            <div class='dot dbottom dright'></div>");
    //piecehtml.push("        </div>");
    //piecehtml.push("        <div class='side left inner'></div>");
    //piecehtml.push("        <div class='side bottom'>");
    //piecehtml.push("            <div class='dot center'></div>");
    //piecehtml.push("            <div class='dot dtop dleft'></div>");
    //piecehtml.push("            <div class='dot dtop dright'></div>");
    //piecehtml.push("            <div class='dot dbottom dleft'></div>");
    //piecehtml.push("            <div class='dot dbottom dright'></div>");
    //piecehtml.push("        </div>");
    //piecehtml.push("        <div class='side bottom inner'></div>");
    //piecehtml.push("        <div class='side back'>");
    //piecehtml.push("            <div class='dot dtop dleft'></div>");
    //piecehtml.push("            <div class='dot dtop dright'></div>");
    //piecehtml.push("            <div class='dot dbottom dleft'></div>");
    //piecehtml.push("            <div class='dot dbottom dright'></div>");
    //piecehtml.push("            <div class='dot center dleft'></div>");
    //piecehtml.push("            <div class='dot center dright'></div>");
    //piecehtml.push("        </div>");
    //piecehtml.push("        <div class='side back inner'></div>");
    //piecehtml.push("        <div class='side cover x'></div>");
    //piecehtml.push("        <div class='side cover y'></div>");
    //piecehtml.push("        <div class='side cover z'></div>");
    //piecehtml.push("    </div>");
    //piecehtml.push("</div>");
    ////   다이스 대,소,홋,단 박스안장  (초기 숨김상태)
    piecehtml.push("<div id='diceBox_big' style = 'width:77px; height:79px; background:url(/files/image/images_n/dice_big.png); position: absolute; left:571px; top:554px; display: none'></div>");
    piecehtml.push("<div id='diceBox_small' style = 'width:77px; height:79px; background:url(/files/image/images_n/dice_small.png); position: absolute; left:648px; top:554px; display: none'></div>");
    piecehtml.push("<div id='diceBox_odd' style = 'width:77px; height:79px; background:url(/files/image/images_n/dice_odd.png); position: absolute; left:725px; top:554px; display: none'></div>");
    piecehtml.push("<div id='diceBox_even' style = 'width:77px; height:79px; background:url(/files/image/images_n/dice_even.png); position: absolute; left:802px; top:554px; display: none'></div>");

    this.frame.piece.bg.innerHTML = piecehtml.join('');

    //初始化bet
    bethtml = [];
    ////  슬롯머신 배팅액수 현시창 (7segment) 8개 안장   ///        
    bethtml.push("<canvas id='dgt_bar' style='width:101px; height:60px; position: absolute; left:315px; top:762px'></canvas>");
    bethtml.push("<canvas id='dgt_seven' style='width:101px; height:60px; position: absolute; left:440px; top:762px'></canvas>");
    bethtml.push("<canvas id='dgt_star' style='width:101px; height:60px; position: absolute; left:562px; top:762px'></canvas>");
    bethtml.push("<canvas id='dgt_watermelons' style='width:96px; height:58px; position: absolute; left:682px; top:762px'></canvas>");
    bethtml.push("<canvas id='dgt_alarm' style='width:95px; height:57px; position: absolute; left:814px; top:762px '></canvas>");
    bethtml.push("<canvas id='dgt_coconut' style='width:95px; height:57px; position: absolute; left:934px; top:762px'></canvas>");
    bethtml.push("<canvas id='dgt_orange' style='width:95px; height:57px; position: absolute; left:1050px; top:762px'></canvas>");
    bethtml.push("<canvas id='dgt_apple' style='width:95px; height:57px; position: absolute; left:1168px; top:762px'></canvas>");
    ////  슬롯머신 배팅버튼 (빗선 8개) 안장   ////
    bethtml.push("<svg width='1059' height='137' style='left:265px; top:831px; position:absolute'>");
    bethtml.push("<defs>");
    bethtml.push("<clipPath id='b1'><polygon points='28,0 144,0 126,137 0,137'/></clipPath>");
    bethtml.push("<clipPath id='b2'><polygon points='153,0 270,0 259,137 133,137'/></clipPath>");
    bethtml.push("<clipPath id='b3'><polygon points='276,0 391,0 387,137 267,137'/></clipPath>");
    bethtml.push("<clipPath id='b4'><polygon points='401,0 520,0 520,137 399,137'/></clipPath>");
    bethtml.push("<clipPath id='b5'><polygon points='545,0 664,0 665,137 544,137'/></clipPath>");
    bethtml.push("<clipPath id='b6'><polygon points='673,0 786,0 796,137 675,137'/></clipPath>");
    bethtml.push("<clipPath id='b7'><polygon points='794,0 908,0 930,137 806,137'/></clipPath>");
    bethtml.push("<clipPath id='b8'><polygon points='917,0 1032,0 1059,137 934,137'/></clipPath>");
    bethtml.push("</defs>");
    bethtml.push("<image id='lhj_bet_bar' width='1059' height='137' xlink:href='../files/image/images_n/bet_btn_area.png' clip-path='url(#b1)'/>");
    bethtml.push("<image id='lhj_bet_seven' width='1059' height='137' xlink:href='../files/image/images_n/bet_btn_area.png' clip-path='url(#b2)'/>");
    bethtml.push("<image id='lhj_bet_star' width='1059' height='137' xlink:href='../files/image/images_n/bet_btn_area.png' clip-path='url(#b3)'/>");
    bethtml.push("<image id='lhj_bet_watermelons' width='1059' height='137' xlink:href='../files/image/images_n/bet_btn_area.png' clip-path='url(#b4)'/>");
    bethtml.push("<image id='lhj_bet_alarm' width='1059' height='137' xlink:href='../files/image/images_n/bet_btn_area.png' clip-path='url(#b5)'/>");
    bethtml.push("<image id='lhj_bet_coconut' width='1059' height='137' xlink:href='../files/image/images_n/bet_btn_area.png' clip-path='url(#b6)'/>");
    bethtml.push("<image id='lhj_bet_orange' width='1059' height='137' xlink:href='../files/image/images_n/bet_btn_area.png' clip-path='url(#b7)'/>");
    bethtml.push("<image id='lhj_bet_apple' width='1059' height='137' xlink:href='../files/image/images_n/bet_btn_area.png' clip-path='url(#b8)'/>");
    bethtml.push("</svg>");
    ///  다이사이 배팅버튼 (원형4개) 안장 //left:1344px; top:835px
    bethtml.push("<svg width='109' height='218' style='left:1306px; top:753px; position: absolute '>");
    bethtml.push("<defs>");
    bethtml.push("<clipPath id='dice_b1'><polygon points='0,0 57,0 57,53 0,53'/></clipPath>");
    bethtml.push("<clipPath id='dice_b2'><polygon points='13,56 73,56 73,110 13,110'/></clipPath>");
    bethtml.push("<clipPath id='dice_b3'><polygon points='30,112 91,112 91,165 30,165'/></clipPath>");
    bethtml.push("<clipPath id='dice_b4'><polygon points='52,166 109,166 109,218 52,218'/></clipPath>");
    bethtml.push("</defs>");
    bethtml.push("<image id='dice_bet_odd' width='109' height='218' xlink:href='/files/image/images_n/dice_btn_area.png' clip-path='url(#dice_b1)'/>");
    bethtml.push("<image id='dice_bet_even' width='109' height='218' xlink:href='/files/image/images_n/dice_btn_area.png' clip-path='url(#dice_b2)'/>");
    bethtml.push("<image id='dice_bet_big' width='109' height='218' xlink:href='/files/image/images_n/dice_btn_area.png' clip-path='url(#dice_b3)'/>");
    bethtml.push("<image id='dice_bet_small' width='109' height='218' xlink:href='/files/image/images_n/dice_btn_area.png' clip-path='url(#dice_b4)'/>");
    bethtml.push("</svg>");
    ///  다이사이 배팅액수 현시창 인스탄스   ///
    bethtml.push("<canvas id='dice_odd' style='width:70px; height:35px; position: absolute; left:1371px; top:764px'></canvas>");
    bethtml.push("<canvas id='dice_even' style='width:70px; height:35px; position: absolute; left:1385px; top:814px'></canvas>");
    bethtml.push("<canvas id='dice_big' style='width:70px; height:35px; position: absolute; left:1403px; top:870px'></canvas>");
    bethtml.push("<canvas id='dice_small' style='width:70px; height:35px; position: absolute; left:1421px; top:925px'></canvas>");
    ///  배팅끝내기/확정  && 배팅초기화 버튼 안장  ///
    bethtml.push("<svg width='155' height='195' style='left:1513px; top:763px; position: absolute '>");
    bethtml.push("<defs>");
    bethtml.push("<clipPath id='m_b1'><polygon points='0,0 107,0 132,93 23,93'/></clipPath>");
    bethtml.push("<clipPath id='m_b2'><polygon points='28,105 134,105 155,195 54,195 50,192'/></clipPath>");
    bethtml.push("</defs>");
    bethtml.push("<image id='bet_finish' width='155' height='195' xlink:href='../files/image/images_n/main_btn_area.png' clip-path='url(#m_b1)'/>");
    bethtml.push("<image id='bet_init' width='155' height='195' xlink:href='../files/image/images_n/main_btn_area.png' clip-path='url(#m_b2)'/>");
    bethtml.push("</svg>");
    ///신호등
    bethtml.push("<img width='115' height='40' src ='/files/image/images_n/countdn.png' style='left:905px; top:12px; position: absolute '/>");
    bethtml.push("<img id='vetlabel' width='138' height='43' src ='/files/image/images_n/t1.png' style='left:1140px; top:10px; position: absolute '/>");
    bethtml.push("<img id='red_lamp' width='25' height='25' src ='/files/image/images_n/led-green.png' style='left:1290px; top:20px; position: absolute '/>");
    ///배율        
    bethtml.push("<image id='1000chip' width='50' height='50' src ='/files/image/images_n/1000chip.png' style='left:1360px; top:6px; position: absolute; '/>");
    bethtml.push("<image id='100chip' width='50' height='50' src ='/files/image/images_n/100chip.png' style='left:1415px; top:6px; position: absolute; '/>");
    bethtml.push("<image id='10chip' width='50' height='50' src ='/files/image/images_n/10chip.png' style='left:1470px; top:6px; position: absolute; '/>");
    bethtml.push("<image id='1chip' width='50' height='50' src ='/files/image/images_n/1chip.png' style='left:1525px; top:6px; position: absolute; '/>");

    ///  배팅액수 입력 text창 (숨김상태)  ///
    bethtml.push("<div style='position:relative; width:1200px;left:100px; top:100px;'>");
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

    digit7_total(txt_money_7dgt, self._money, 12);  /// 배팅배당금 coin량 7segment현시 (초기값 0)
    digit7_total(txt_total_7dgt, self._total, 12);  /// usercoin잔액 7segment현시 (초기값 세션에서 읽은값)
    display_segment("taisai_result", dice_point, 2, 12, 20, 2);   /// 다이스롤링 포인트값 7segment현시(초기 0)

    ////   카운트 다운 7segment 현시   ////
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


    sectime = 120 - remain_gtime;
    setInterval(function () {
        sectime = sectime - 1;
        if (sectime == 0) {
            sectime = 120;
            round += 1;
            spin_play();          
        }
        if (sectime == 20) {
            self._total += self._money;
            self._money = 0;
            self.$('lhj_ben_txt_total').innerHTML = self._total;
            self.$('lhj_ben_txt_money').innerHTML = self._money;

            bar = parseInt(self.$('lhj_bet_txt_bar').value);
            seven = parseInt(self.$('lhj_bet_txt_seven').value);
            star = parseInt(self.$('lhj_bet_txt_star').value);
            watermelon = parseInt(self.$('lhj_bet_txt_watermelons').value);
            bell = parseInt(self.$('lhj_bet_txt_alarm').value);
            lemon = parseInt(self.$('lhj_bet_txt_coconut').value);
            orange = parseInt(self.$('lhj_bet_txt_orange').value);
            apple = parseInt(self.$('lhj_bet_txt_apple').value);
            doub = parseInt(self.$('dice_bet_txt_even').value);
            singl = parseInt(self.$('dice_bet_txt_odd').value);
            big = parseInt(self.$('dice_bet_txt_big').value);
            small = parseInt(self.$('dice_bet_txt_small').value);

            var betcount = bar + seven + star + watermelon + bell + lemon + orange + apple + doub + singl + big + small;
            if (betcount > 0) {
               var AjaxValue = PostAjax("../Ajax/sendbet.aspx", "user_id=" + user_id + "&round=" + round + "&bet_coin=" + betcount + "&bar=" + bar + "&seven=" + seven
               + "&star=" + star + "&watermelon=" + watermelon + "&bell=" + bell + "&lemon=" + lemon + "&orange=" + orange + "&apple=" + apple
               + "&doub=" + doub + "&singl=" + singl + "&big=" + big + "&small=" + small + "&zhibo_id=" + zhibo_id);                          
               bet_state = 1;
            }            
            
            self._isrun = true;
            $("#red_lamp").attr("src", "../files/image/images_n/led-red.png");
            $("#vetlabel").attr("src", "../files/image/images_n/t1_.png");           
            
        }
        if (sectime < 20) {
            self._isrun = true;
            $("#red_lamp").attr("src", "../files/image/images_n/led-red.png");
            $("#vetlabel").attr("src", "../files/image/images_n/t1_.png");
        }
        if (sectime == 105) {
            self._total = self._total + self._money;
            self._money = 0;

            digit7_total(txt_money_7dgt, self._money, 12);
            digit7_total(txt_total_7dgt, self._total, 12);

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

            display_segment("dgt_bar", 0, 4, 12, 20, 20);
            display_segment("dgt_seven", 0, 4, 12, 20, 15);
            display_segment("dgt_star", 0, 4, 12, 20, 10);
            display_segment("dgt_watermelons", 0, 4, 12, 20, 5);
            display_segment("dgt_alarm", 0, 4, 12, 20, 0);
            display_segment("dgt_coconut", 0, 4, 12, 20, -5);
            display_segment("dgt_orange", 0, 4, 12, 20, -10);
            display_segment("dgt_apple", 0, 4, 12, 20, -15);
            display_segment("dice_even", 0, 4, 12, 20, -15);
            display_segment("dice_odd", 0, 4, 12, 20, -15);
            display_segment("dice_big", 0, 4, 12, 20, -15);
            display_segment("dice_small", 0, 4, 12, 20, -15);

            st = srvTime();
            today = new Date(st);
            times = today.getHours() * 3600 + today.getMinutes() * 60 + today.getSeconds();
            remain_gtime = times % 120;
            sectime = 120 - remain_gtime;
        }
        
        display_segment("countdown", sectime, 3, 12, 20, 2);

    }, 1000);


    ///  배팅액수 현시창 7 segment  ///
    display_segment("dgt_bar", lhj_bet_txt_bar.value, 4, 12, 20, 20);
    display_segment("dgt_seven", lhj_bet_txt_seven.value, 4, 12, 20, 15);
    display_segment("dgt_star", lhj_bet_txt_star.value, 4, 12, 20, 10);
    display_segment("dgt_watermelons", lhj_bet_txt_watermelons.value, 4, 12, 20, 5);
    display_segment("dgt_alarm", lhj_bet_txt_alarm.value, 4, 12, 20, 0);
    display_segment("dgt_coconut", lhj_bet_txt_coconut.value, 4, 12, 20, -5);
    display_segment("dgt_orange", lhj_bet_txt_orange.value, 4, 12, 20, -10);
    display_segment("dgt_apple", lhj_bet_txt_apple.value, 4, 12, 20, -15);

    display_segment("dice_odd", 0, 4, 12, 20, -15);
    display_segment("dice_even", 0, 4, 12, 20, -15);
    display_segment("dice_big", 0, 4, 12, 20, -15);
    display_segment("dice_small", 0, 4, 12, 20, -15);

    //display_segment("numRate", 1000, 4, 12, 28, 2);


    ////******** 배팅 리얼 / 배팅액수 증가 구현 start  ////
    var betmoeny = function (id) {
        if (self._isrun) {
            return;
        }
        //先?得分???
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

            display_segment("dgt_bar", lhj_bet_txt_bar.value, 4, 12, 20, 20);
            display_segment("dgt_seven", lhj_bet_txt_seven.value, 4, 12, 20, 15);
            display_segment("dgt_star", lhj_bet_txt_star.value, 4, 12, 20, 10);
            display_segment("dgt_watermelons", lhj_bet_txt_watermelons.value, 4, 12, 20, 5);
            display_segment("dgt_alarm", lhj_bet_txt_alarm.value, 4, 12, 20, 0);
            display_segment("dgt_coconut", lhj_bet_txt_coconut.value, 4, 12, 20, -5);
            display_segment("dgt_orange", lhj_bet_txt_orange.value, 4, 12, 20, -10);
            display_segment("dgt_apple", lhj_bet_txt_apple.value, 4, 12, 20, -15);

            display_segment("dice_even", dice_bet_txt_even.value, 4, 12, 20, -15);
            display_segment("dice_odd", dice_bet_txt_odd.value, 4, 12, 20, -15);
            display_segment("dice_big", dice_bet_txt_big.value, 4, 12, 20, -15);
            display_segment("dice_small", dice_bet_txt_small.value, 4, 12, 20, -15);
        }

        var tpv = parseInt(self.$(id).value);
        if ((self._total - num_rate) > 0 && (tpv + num_rate) <= self._config.maxbet) {
            self._total -= num_rate;
            self.$(id).value = tpv + num_rate;
            self.$('lhj_ben_txt_total').innerHTML = self._total;
            digit7_total(txt_total_7dgt, self._total, 12);
        }

        //digit7_total(txt_total_7dgt, self._total, 12);
    }
    //// ******배팅 리얼 / 배팅액수 증가 구현 end  ////



    /// ***** 아이템별 버튼눌러 배팅액수 입력하기 (배팅버튼 눌림처리)  start  **********////        

    this.$('lhj_bet_bar').onmousedown = function (event) {  // 누르면 증가
        $("#lhj_bet_bar").attr("xlink:href", "../files/image/images_n/bet_btn_area_.png");
        betInterval = setInterval(function () {
            betmoeny('lhj_bet_txt_bar');
            display_segment("dgt_bar", lhj_bet_txt_bar.value, 4, 12, 20, 20);
            //효과음
            if (self._isrun == false) {
                bflat = new Audio("../files/audio/collect_coin_in.mp3");
                bflat.play();
            }
        }, 100);
    }
    this.$('lhj_bet_bar').onmouseup = function (event) {  // 놓으면 증가 중지
        $("#lhj_bet_bar").attr("xlink:href", "../files/image/images_n/bet_btn_area.png");
        clearInterval(betInterval);
    }
    this.$('lhj_bet_bar').onclick = function () {
        $("#lhj_bet_bar").attr("xlink:href", "../files/image/images/bet_btn_area_.png");
        if (self._isrun == false) {
            bflat = new Audio("../files/audio/collect_coin_in.mp3");
            bflat.play();
        }
        betmoeny('lhj_bet_txt_bar');
        display_segment("dgt_bar", lhj_bet_txt_bar.value, 4, 12, 20, 20);
        setTimeout(function () { $("#lhj_bet_bar").attr("xlink:href", "../files/image/images/bet_btn_area.png"); }, 50);
    }

    ///////////////////////////////////////////  1


    this.$('lhj_bet_seven').onmousedown = function (event) {
        $("#lhj_bet_seven").attr("xlink:href", "../files/image/images_n/bet_btn_area_.png");
        betInterval = setInterval(function () {
            betmoeny('lhj_bet_txt_seven');
            display_segment("dgt_seven", lhj_bet_txt_seven.value, 4, 12, 20, 15);
            //효과음
            if (self._isrun == false) {
                bflat = new Audio("../files/audio/collect_coin_in.mp3");
                bflat.play();
            }
        }, 100);
    }
    this.$('lhj_bet_seven').onmouseup = function (event) {
        $("#lhj_bet_seven").attr("xlink:href", "../files/image/images_n/bet_btn_area.png");
        clearInterval(betInterval);
    }
    this.$('lhj_bet_seven').onclick = function () {
        $("#lhj_bet_seven").attr("xlink:href", "../files/image/images/bet_btn_area_.png");
        //효과음
        if (self._isrun == false) {
            bflat = new Audio("../files/audio/collect_coin_in.mp3");
            bflat.play();
        }
        betmoeny('lhj_bet_txt_seven');
        display_segment("dgt_seven", lhj_bet_txt_seven.value, 4, 12, 20, 15);
        setTimeout(function () { $("#lhj_bet_seven").attr("xlink:href", "../files/image/images/bet_btn_area.png"); }, 50);
    }

    ///////////////////////////////////////////  2       

    this.$('lhj_bet_star').onmousedown = function (event) {
        $("#lhj_bet_star").attr("xlink:href", "../files/image/images_n/bet_btn_area_.png");
        betInterval = setInterval(function () {
            betmoeny('lhj_bet_txt_star');
            display_segment("dgt_star", lhj_bet_txt_star.value, 4, 12, 20, 10);
            //효과음
            if (self._isrun == false) {
                bflat = new Audio("../files/audio/collect_coin_in.mp3");
                bflat.play();
            }
        }, 100);
    }
    this.$('lhj_bet_star').onmouseup = function (event) {
        $("#lhj_bet_star").attr("xlink:href", "../files/image/images_n/bet_btn_area.png");
        clearInterval(betInterval);
    }
    this.$('lhj_bet_star').onclick = function () {
        $("#lhj_bet_star").attr("xlink:href", "../files/image/images/bet_btn_area_.png");
        //효과음
        if (self._isrun == false) {
            bflat = new Audio("../files/audio/collect_coin_in.mp3");
            bflat.play();
        }
        betmoeny('lhj_bet_txt_star');
        display_segment("dgt_star", lhj_bet_txt_star.value, 4, 12, 20, 10);
        setTimeout(function () { $("#lhj_bet_star").attr("xlink:href", "../files/image/images/bet_btn_area.png"); }, 50);
    }


    ///////////////////////////////////////////   3        

    this.$('lhj_bet_watermelons').onmousedown = function (event) {  // 놓으면 증가 중지
        $("#lhj_bet_watermelons").attr("xlink:href", "../files/image/images_n/bet_btn_area_.png");
        betInterval = setInterval(function () {
            betmoeny('lhj_bet_txt_watermelons');
            display_segment("dgt_watermelons", lhj_bet_txt_watermelons.value, 4, 12, 20, 5);
            //효과음
            if (self._isrun == false) {
                bflat = new Audio("../files/audio/collect_coin_in.mp3");
                bflat.play();
            }
        }, 100);
    }
    this.$('lhj_bet_watermelons').onmouseup = function (event) {  // 놓으면 증가 중지
        $("#lhj_bet_watermelons").attr("xlink:href", "../files/image/images_n/bet_btn_area.png");
        clearInterval(betInterval);
    }
    this.$('lhj_bet_watermelons').onclick = function () {
        $("#lhj_bet_watermelons").attr("xlink:href", "../files/image/images/bet_btn_area_.png");
        //효과음
        if (self._isrun == false) {
            bflat = new Audio("../files/audio/collect_coin_in.mp3");
            bflat.play();
        }
        betmoeny('lhj_bet_txt_watermelons');
        display_segment("dgt_watermelons", lhj_bet_txt_watermelons.value, 4, 12, 20, 5);
        setTimeout(function () { $("#lhj_bet_watermelons").attr("xlink:href", "../files/image/images/bet_btn_area.png"); }, 50);        
    }


    ///////////////////////////////////////////   4               

    this.$('lhj_bet_alarm').onmousedown = function (event) {  // 놓으면 증가 중지
        $("#lhj_bet_alarm").attr("xlink:href", "../files/image/images_n/bet_btn_area_.png");
        betInterval = setInterval(function () {
            betmoeny('lhj_bet_txt_alarm');
            display_segment("dgt_alarm", lhj_bet_txt_alarm.value, 4, 12, 20, 0);
            //효과음
            if (self._isrun == false) {
                bflat = new Audio("../files/audio/collect_coin_in.mp3");
                bflat.play();
            }
        }, 100);
    }
    this.$('lhj_bet_alarm').onmouseup = function (event) {  // 놓으면 증가 중지
        $("#lhj_bet_alarm").attr("xlink:href", "../files/image/images_n/bet_btn_area.png");
        clearInterval(betInterval);
    }
    this.$('lhj_bet_alarm').onclick = function () {
        $("#lhj_bet_alarm").attr("xlink:href", "../files/image/images/bet_btn_area_.png");
        //효과음
        if (self._isrun == false) {
            bflat = new Audio("../files/audio/collect_coin_in.mp3");
            bflat.play();
        }
        betmoeny('lhj_bet_txt_alarm');
        display_segment("dgt_alarm", lhj_bet_txt_alarm.value, 4, 12, 20, 0);
        setTimeout(function () { $("#lhj_bet_alarm").attr("xlink:href", "../files/image/images/bet_btn_area.png"); }, 50);        
    }

    //////////////////////////////////////////   5        

    this.$('lhj_bet_coconut').onmousedown = function (event) {  // 놓으면 증가 중지
        $("#lhj_bet_coconut").attr("xlink:href", "../files/image/images_n/bet_btn_area_.png");
        betInterval = setInterval(function () {
            betmoeny('lhj_bet_txt_coconut');
            display_segment("dgt_coconut", lhj_bet_txt_coconut.value, 4, 12, 20, -5);
            //효과음
            if (self._isrun == false) {
                bflat = new Audio("../files/audio/collect_coin_in.mp3");
                bflat.play();
            }
        }, 100);
    }
    this.$('lhj_bet_coconut').onmouseup = function (event) {  // 놓으면 증가 중지
        $("#lhj_bet_coconut").attr("xlink:href", "../files/image/images_n/bet_btn_area.png");
        clearInterval(betInterval);
    }
    this.$('lhj_bet_coconut').onclick = function () {
        $("#lhj_bet_coconut").attr("xlink:href", "../files/image/images/bet_btn_area_.png");
        //효과음
        if (self._isrun == false) {
            bflat = new Audio("../files/audio/collect_coin_in.mp3");
            bflat.play();
        }
        betmoeny('lhj_bet_txt_coconut');
        display_segment("dgt_coconut", lhj_bet_txt_coconut.value, 4, 12, 20, -5);
        setTimeout(function () { $("#lhj_bet_coconut").attr("xlink:href", "../files/image/images/bet_btn_area.png"); }, 50);        
    }

    //////////////////////////////////////////    6       

    this.$('lhj_bet_orange').onmousedown = function (event) {  // 놓으면 증가 중지
        $("#lhj_bet_orange").attr("xlink:href", "../files/image/images_n/bet_btn_area_.png");
        betInterval = setInterval(function () {
            betmoeny('lhj_bet_txt_orange');
            display_segment("dgt_orange", lhj_bet_txt_orange.value, 4, 12, 20, -10);
            //효과음
            if (self._isrun == false) {
                bflat = new Audio("../files/audio/collect_coin_in.mp3");
                bflat.play();
            }
        }, 100);
    }
    this.$('lhj_bet_orange').onmouseup = function (event) {  // 놓으면 증가 중지
        $("#lhj_bet_orange").attr("xlink:href", "../files/image/images_n/bet_btn_area.png");
        clearInterval(betInterval);
    }
    this.$('lhj_bet_orange').onclick = function () {
        $("#lhj_bet_orange").attr("xlink:href", "../files/image/images/bet_btn_area_.png");
        //효과음
        if (self._isrun == false) {
            bflat = new Audio("../files/audio/collect_coin_in.mp3");
            bflat.play();
        }
        betmoeny('lhj_bet_txt_orange');
        display_segment("dgt_orange", lhj_bet_txt_orange.value, 4, 12, 20, -10);
        setTimeout(function () { $("#lhj_bet_orange").attr("xlink:href", "../files/image/images/bet_btn_area.png"); }, 50);        
    }

    ///////////////////////////////////////////   7

    this.$('lhj_bet_apple').onmousedown = function (event) {  // 놓으면 증가 중지
        $("#lhj_bet_apple").attr("xlink:href", "../files/image/images_n/bet_btn_area_.png");
        betInterval = setInterval(function () {
            betmoeny('lhj_bet_txt_apple');
            display_segment("dgt_apple", lhj_bet_txt_apple.value, 4, 12, 20, -15);
            //효과음
            if (self._isrun == false) {
                bflat = new Audio("../files/audio/collect_coin_in.mp3");
                bflat.play();
            }
        }, 100);
    }
    this.$('lhj_bet_apple').onmouseup = function (event) {  // 놓으면 증가 중지
        $("#lhj_bet_apple").attr("xlink:href", "../files/image/images_n/bet_btn_area.png");
        clearInterval(betInterval);
    }
    this.$('lhj_bet_apple').onclick = function () {
        $("#lhj_bet_apple").attr("xlink:href", "../files/image/images/bet_btn_area_.png");
        //효과음
        if (self._isrun == false) {
            bflat = new Audio("../files/audio/collect_coin_in.mp3");
            bflat.play();
        }
        betmoeny('lhj_bet_txt_apple');
        display_segment("dgt_apple", lhj_bet_txt_apple.value, 4, 12, 20, -15);
        setTimeout(function () { $("#lhj_bet_apple").attr("xlink:href", "../files/image/images/bet_btn_area.png"); }, 50);        
    }

    ///////////////////////////////////////////   8

    this.$('dice_bet_even').onmousedown = function (event) {
        $("#dice_bet_even").attr("xlink:href", "../files/image/images_n/dice_btn_area_.png");
        betInterval = setInterval(function () {
            betmoeny('dice_bet_txt_even');
            display_segment("dice_even", dice_bet_txt_even.value, 4, 12, 20, -15);
            //효과음
            if (self._isrun == false) {
                bflat = new Audio("../files/audio/collect_coin_in.mp3");
                bflat.play();
            }
        }, 100);
    }
    this.$('dice_bet_even').onmouseup = function (event) {  // 놓으면 증가 중지
        $("#dice_bet_even").attr("xlink:href", "../files/image/images_n/dice_btn_area.png");
        clearInterval(betInterval);
    }
    this.$('dice_bet_even').onclick = function () {
        $("#dice_bet_even").attr("xlink:href", "../files/image/images/dice_btn_area_.png");
        //효과음
        if (self._isrun == false) {
            bflat = new Audio("../files/audio/collect_coin_in.mp3");
            bflat.play();
        }
        betmoeny('dice_bet_txt_even');
        display_segment("dice_even", dice_bet_txt_even.value, 4, 12, 20, -15);
        setTimeout(function () { $("#dice_bet_even").attr("xlink:href", "../files/image/images/dice_btn_area.png"); }, 50);        
    }

    ///////////////////////////////////////////   9

    this.$('dice_bet_odd').onmousedown = function (event) {
        $("#dice_bet_odd").attr("xlink:href", "../files/image/images_n/dice_btn_area_.png");
        betInterval = setInterval(function () {
            betmoeny('dice_bet_txt_odd');
            display_segment("dice_odd", dice_bet_txt_odd.value, 4, 12, 20, -15);
            //효과음
            if (self._isrun == false) {
                bflat = new Audio("../files/audio/collect_coin_in.mp3");
                bflat.play();
            }
        }, 100);
    }
    this.$('dice_bet_odd').onmouseup = function (event) {  // 놓으면 증가 중지
        $("#dice_bet_odd").attr("xlink:href", "../files/image/images_n/dice_btn_area.png");
        clearInterval(betInterval);
    }
    this.$('dice_bet_odd').onclick = function () {
        $("#dice_bet_odd").attr("xlink:href", "../files/image/images/dice_btn_area_.png");
        //효과음
        if (self._isrun == false) {
            bflat = new Audio("../files/audio/collect_coin_in.mp3");
            bflat.play();
        }
        betmoeny('dice_bet_txt_odd');
        display_segment("dice_odd", dice_bet_txt_odd.value, 4, 12, 20, -15);
        setTimeout(function () { $("#dice_bet_odd").attr("xlink:href", "../files/image/images/dice_btn_area.png"); }, 50);        
    }

    ///////////////////////////////////////////    10

    this.$('dice_bet_big').onmousedown = function (event) {  // 놓으면 증가 중지
        $("#dice_bet_big").attr("xlink:href", "../files/image/images_n/dice_btn_area_.png");
        betInterval = setInterval(function () {
            betmoeny('dice_bet_txt_big');
            display_segment("dice_big", dice_bet_txt_big.value, 4, 12, 20, -15);
            //효과음
            if (self._isrun == false) {
                bflat = new Audio("../files/audio/collect_coin_in.mp3");
                bflat.play();
            }
        }, 100);
    }
    this.$('dice_bet_big').onmouseup = function (event) {  // 놓으면 증가 중지
        $("#dice_bet_big").attr("xlink:href", "../files/image/images_n/dice_btn_area.png");
        clearInterval(betInterval);
    }
    this.$('dice_bet_big').onclick = function () {
        $("#dice_bet_big").attr("xlink:href", "../files/image/images/dice_btn_area_.png");
        //효과음
        if (self._isrun == false) {
            bflat = new Audio("../files/audio/collect_coin_in.mp3");
            bflat.play();
        }
        betmoeny('dice_bet_txt_big');
        display_segment("dice_big", dice_bet_txt_big.value, 4, 12, 20, -15);
        setTimeout(function () { $("#dice_bet_big").attr("xlink:href", "../files/image/images/dice_btn_area.png"); }, 50);        
    }

    ///////////////////////////////////////////      11

    this.$('dice_bet_small').onmousedown = function (event) {  // 놓으면 증가 중지
        $("#dice_bet_small").attr("xlink:href", "../files/image/images_n/dice_btn_area_.png");
        betInterval = setInterval(function () {
            betmoeny('dice_bet_txt_small');
            display_segment("dice_small", dice_bet_txt_small.value, 4, 12, 20, -15);
            //효과음
            if (self._isrun == false) {
                bflat = new Audio("../files/audio/collect_coin_in.mp3");
                bflat.play();
            }
        }, 100);
    }
    this.$('dice_bet_small').onmouseup = function (event) {  // 놓으면 증가 중지
        $("#dice_bet_small").attr("xlink:href", "../files/image/images_n/dice_btn_area.png");
        clearInterval(betInterval);
    }
    this.$('dice_bet_small').onclick = function () {
        $("#dice_bet_small").attr("xlink:href", "../files/image/images/dice_btn_area_.png");
        //효과음
        if (self._isrun == false) {
            bflat = new Audio("../files/audio/collect_coin_in.mp3");
            bflat.play();
        }
        betmoeny('dice_bet_txt_small');
        display_segment("dice_small", dice_bet_txt_small.value, 4, 12, 20, -15);
        setTimeout(function () { $("#dice_bet_small").attr("xlink:href", "../files/image/images/dice_btn_area.png"); }, 50);        
    }

    /// ***** 아이템별 버튼눌러 배팅액수 입력하기 end      12
    ///배팅액수 단위설정
    this.$('1000chip').onclick = function () {
        num_rate = 1000;
        $("#1000chip").attr("src", "../files/image/images_n/1000_chip.png");
        $("#100chip").attr("src", "../files/image/images_n/100chip.png");
        $("#10chip").attr("src", "../files/image/images_n/10chip.png");
        $("#1chip").attr("src", "../files/image/images_n/1chip.png");
        //효과음            
        bflat = new Audio("../files/audio/chose_machine.mp3");
        bflat.play();
    }
    this.$('100chip').onclick = function () {
        num_rate = 100;
        $("#1000chip").attr("src", "../files/image/images_n/1000chip.png");
        $("#100chip").attr("src", "../files/image/images_n/100_chip.png");
        $("#10chip").attr("src", "../files/image/images_n/10chip.png");
        $("#1chip").attr("src", "../files/image/images_n/1chip.png");
        //효과음            
        bflat = new Audio("../files/audio/chose_machine.mp3");
        bflat.play();
    }
    this.$('10chip').onclick = function () {
        num_rate = 10;
        $("#1000chip").attr("src", "../files/image/images_n/1000chip.png");
        $("#100chip").attr("src", "../files/image/images_n/100chip.png");
        $("#10chip").attr("src", "../files/image/images_n/10_chip.png");
        $("#1chip").attr("src", "../files/image/images_n/1chip.png");
        //효과음            
        bflat = new Audio("../files/audio/chose_machine.mp3");
        bflat.play();
    }
    this.$('1chip').onclick = function () {
        num_rate = 1;
        $("#1000chip").attr("src", "../files/image/images_n/1000chip.png");
        $("#100chip").attr("src", "../files/image/images_n/100chip.png");
        $("#10chip").attr("src", "../files/image/images_n/10chip.png");
        $("#1chip").attr("src", "../files/image/images_n/1_chip.png");
        //효과음            
        bflat = new Audio("../files/audio/chose_machine.mp3");
        bflat.play();
    }

    /// ***** 이전값으로 배팅 버튼누르기 start **********////
    this.$('bet_finish').onclick = function () {
        $("#bet_finish").attr("xlink:href", "../files/image/images_n/main_btn_area_.png");
        setTimeout(function () { $("#bet_finish").attr("xlink:href", "../files/image/images_n/main_btn_area.png"); }, 50);

        if (self._isrun) {
            return;
        }
        //이전값을 텍스트완충기에 넣기
        self.$('lhj_bet_txt_bar').value = bar;
        self.$('lhj_bet_txt_seven').value = seven;
        self.$('lhj_bet_txt_star').value = star;
        self.$('lhj_bet_txt_watermelons').value = watermelon;
        self.$('lhj_bet_txt_alarm').value = bell;
        self.$('lhj_bet_txt_coconut').value = lemon;
        self.$('lhj_bet_txt_orange').value = orange;
        self.$('lhj_bet_txt_apple').value = apple;
        self.$('dice_bet_txt_even').value = doub;
        self.$('dice_bet_txt_odd').value = singl;
        self.$('dice_bet_txt_big').value = big;
        self.$('dice_bet_txt_small').value = small;

        bar = 0;
        seven = 0;
        star = 0;
        watermelon = 0;
        bell = 0;
        lemon = 0;
        orange = 0;
        apple = 0;
        doub = 0;
        singl = 0;
        big = 0;
        small = 0;

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
            return;
        }
        if (self._total > betcount ) {
            self._total -= betcount;
            self.$('lhj_ben_txt_total').innerHTML = self._total;

            display_segment("dgt_bar", lhj_bet_txt_bar.value, 4, 12, 20, 20);
            display_segment("dgt_seven", lhj_bet_txt_seven.value, 4, 12, 20, 15);
            display_segment("dgt_star", lhj_bet_txt_star.value, 4, 12, 20, 10);
            display_segment("dgt_watermelons", lhj_bet_txt_watermelons.value, 4, 12, 20, 5);
            display_segment("dgt_alarm", lhj_bet_txt_alarm.value, 4, 12, 20, 0);
            display_segment("dgt_coconut", lhj_bet_txt_coconut.value, 4, 12, 20, -5);
            display_segment("dgt_orange", lhj_bet_txt_orange.value, 4, 12, 20, -10);
            display_segment("dgt_apple", lhj_bet_txt_apple.value, 4, 12, 20, -15);
            display_segment("dice_even", dice_bet_txt_even.value, 4, 12, 20, -15);
            display_segment("dice_odd", dice_bet_txt_odd.value, 4, 12, 20, -15);
            display_segment("dice_big", dice_bet_txt_big.value, 4, 12, 20, -15);
            display_segment("dice_small", dice_bet_txt_small.value, 4, 12, 20, -15);
        }
        if (self._total < betcount) {
            alert("?的?分不?下注，?投?！");
            return;
        }
        digit7_total(txt_money_7dgt, self._money, 12);
        digit7_total(txt_total_7dgt, self._total, 12);
        

        //self._isrun = true;
        //$("#red_lamp").attr("src", "../files/image/images_n/led-red.png");
        //$("#vetlabel").attr("src", "../files/image/images_n/t1_.png");
        bet_state = 1;
    }
    
    this.$('bet_finish').onmousedown = function (event) {  // 누르면 들어가기
        $("#bet_finish").attr("xlink:href", "../files/image/images_n/main_btn_area_.png");
        //효과음
        if (self._isrun == false) {
            bflat = new Audio("../files/audio/pop_coin.mp3");
            bflat.play();
        }
    }
    this.$('bet_finish').onmouseup = function (event) {  // 놓으면 나오기
        $("#bet_finish").attr("xlink:href", "../files/image/images_n/main_btn_area.png");
    }
    /// ***** 이전값으로 배팅 버튼누르기 end  **********////

    /// ***** 배팅액수입력창 초기화 start  **********////
    this.$('bet_init').onclick = function () {
        $("#bet_init").attr("xlink:href", "../files/image/images_n/main_btn_area_.png");
        setTimeout(function () { $("#bet_init").attr("xlink:href", "../files/image/images_n/main_btn_area.png"); }, 50);

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
        digit7_total(txt_total_7dgt, self._total, 12);

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

        display_segment("dgt_bar", lhj_bet_txt_bar.value, 4, 12, 20, 20);
        display_segment("dgt_seven", lhj_bet_txt_seven.value, 4, 12, 20, 15);
        display_segment("dgt_star", lhj_bet_txt_star.value, 4, 12, 20, 10);
        display_segment("dgt_watermelons", lhj_bet_txt_watermelons.value, 4, 12, 20, 5);
        display_segment("dgt_alarm", lhj_bet_txt_alarm.value, 4, 12, 20, 0);
        display_segment("dgt_coconut", lhj_bet_txt_coconut.value, 4, 12, 20, -5);
        display_segment("dgt_orange", lhj_bet_txt_orange.value, 4, 12, 20, -10);
        display_segment("dgt_apple", lhj_bet_txt_apple.value, 4, 12, 20, -15);

        display_segment("dice_even", dice_bet_txt_even.value, 4, 12, 20, -15);
        display_segment("dice_odd", dice_bet_txt_odd.value, 4, 12, 20, -15);
        display_segment("dice_big", dice_bet_txt_big.value, 4, 12, 20, -15);
        display_segment("dice_small", dice_bet_txt_small.value, 4, 12, 20, -15);
    }
    
    this.$('bet_init').onmousedown = function (event) {
        $("#bet_init").attr("xlink:href", "../files/image/images_n/main_btn_area_.png");
        //효과음
        if (self._isrun == false) {
            bflat = new Audio("../files/audio/push_coin.mp3");
            bflat.play();
        }
    }
    this.$('bet_init').onmouseup = function (event) {
        $("#bet_init").attr("xlink:href", "../files/image/images_n/main_btn_area.png");
    }

    /// ***** 배팅액수입력창 초기화  end  **********////

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
        var action_num = 0;
        var action_num3 = 0;
        var action_num4 = 0;

        var timer = setInterval(function () {
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
                $("#dice0").attr("src", "/files/image/images_n/dice_3.png");
            }
            action_num = Math.floor(Math.random() * 4) ;
            $("#dice0").attr("src", "/files/image/images_n/dice_action_" + action_num + ".png");
            action_num3 = Math.floor(Math.random() * 4);
            $("#dice3").attr("src", "/files/image/images_n/dice_action_" + action_num3 + ".png");
            action_num4 = Math.floor(Math.random() * 4);
            $("#dice4").attr("src", "/files/image/images_n/dice_action_" + action_num4 + ".png");
        }, 100);

        //先?得分???
        self._total += self._money;
        self._money = 0;
        self.$('lhj_ben_txt_total').innerHTML = self._total;
        self.$('lhj_ben_txt_money').innerHTML = self._money;
        //?机得到中??果
        //判?分??不?下注

        this.disabled = true;
        self._isrun = true;

        digit7_total(txt_money_7dgt, self._money, 12);
        digit7_total(txt_total_7dgt, self._total, 12);
        //算出?行步?
        self._endbox = box_num;
        var step = (self._endbox - self._startbox) > 0 ? self._endbox - self._startbox : 24 - self._startbox + self._endbox;
        self._jumpnum = 24 * 4 + step; //?些需要算出?
        self.run();

        // 다이사이 다이스 롤링 및 결과보여주기
        display_segment("taisai_result", 0, 2, 12, 20, 2);
        //$('#platform').removeClass('stop').addClass('playing');
        $('#platform1').removeClass('stop').addClass('playing');
        $('#platform2').removeClass('stop').addClass('playing');
        $('#dice');
        $('#dice1');
        $('#dice2');
        setTimeout(function () {
            //$('#platform').removeClass('playing').addClass('stop');
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
            //$('#dice').css({ 'transform': 'rotateX(' + x + 'deg) rotateY(' + y + 'deg) rotateZ(' + z + 'deg)' });
            //$('#platform').css({ 'transform': 'translate3d(0,0, 0px)' });

            $('#dice1').css({ 'transform': 'rotateX(' + x1 + 'deg) rotateY(' + y1 + 'deg) rotateZ(' + z1 + 'deg)' });
            $('#platform1').css({ 'transform': 'translate3d(0,0, 0px)' });

            $('#dice2').css({ 'transform': 'rotateX(' + x2 + 'deg) rotateY(' + y2 + 'deg) rotateZ(' + z2 + 'deg)' });
            $('#platform2').css({ 'transform': 'translate3d(0,0, 0px)' });

            dice_point = number + number1 + number2;
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
            
            $("#dice0").attr("src", "/files/image/images_n/dice_" + number + ".png");
            $("#dice3").attr("src", "/files/image/images_n/dice_" + number2 + ".png");
            $("#dice4").attr("src", "/files/image/images_n/dice_" + number1 + ".png");
        }, 7000);
    }

}
