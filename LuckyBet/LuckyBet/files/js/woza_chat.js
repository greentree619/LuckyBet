var ChannelInfo = "";
var e = jQuery;
var c = jQuery("a.side-spread"),
    s = jQuery("div.column3");

//expand or colapse chat box
c.on("click", function (w) {
    var v = e(this);
    if (v.hasClass("side-spread-hide")) {
        s.css("marginRight", 0);
        v.removeClass("side-spread-hide").attr("title", "收起观众列表")
    } else {
        s.css("marginRight", 0);
        v.addClass("side-spread-hide").attr("title", "展开观众列表")
    }
});

//Initialize For Select specify user.https://www.youtube.com/watch?v=SWkMWxd_6vk
var userMenu = {
    html: '<div class="userWrap">		<h6></h6>			<b class="underline"></b>			<p class="icon"><b class="underline"></b></p>			<p class="main_2">			<a href="" class="number_off">封号</a>			<a href="" class="ip_off_2">封IP</a>			<a href="" class="menu_s resolve">解决争议</a>			<b class="underline"></b>			</p>			<p class="oTeQuan">			<span class="more-list super-rich" t="t1"><i class="arrows"></i>超富特权				<em class="more">				<a href="" class="oJinyan">特权禁言</a>				<a href="" class="oJinyan_r">特权恢复发言</a>				<a href="" class="oTiren">特权踢人</a>				<a href="" class="chuanyue">穿越</a>				</em>			</span>			<b class="underline"></b>			</p>			<p class="main_1">			<a href="" class="kick">踢出2小时</a>			<a href="" class="say_off">禁言15分钟</a>			<a href="" class="say_on">恢复发言</a>			<span class="more-list user-oper" t="t2"><i class="arrows"></i>人员管理				<em class="more">				<a href="" class="set_power">提拔为管理</a>				<a href="" class="del_power">撤销管理</a>				<a href="" class="set_power_z">提拔为总管</a>				<a href="" class="del_power_z">撤销总管</a>				</em>			</span>			<a href="" class="ip_off">封IP2小时</a>			<b class="underline"></b>			</p>			<p class="base">			<a href="" class="sendGift" data-tracing="iqg9rucn">赠送礼物</a>			<a href="" class="add_f" data-tracing="iqg9ruco">加好友</a>			<a href="" class="del_note">揭掉贴条</a>			<a href="" class="menu_s add_note" data-tracing="iqg9rucp"><i class="arrows"></i>贴条</a>			<a href="" class="say_pub" data-tracing="iqg9rucq">公开说</a>			<a href="" class="say_pri" data-tracing="iqg9rucr">悄悄说<span class="to-chat-pri" title="打开私聊窗口"></span></a>			<a href="" class="say_pri_del" data-tracing="iqg9rucs">拉黑</a>			<b class="underline"></b>			<a href="" class="userinfo" data-tracing="iqg9ruct">个人资料</a>			</p>			</div>			',
    create: function () {
        var c = this;
        this.sug = jQuery("<div>", {
            "class": "user-manager",
            style: "visibility:hidden; top:-10000px",
            html: this.html
        }).bind("mouseover", function () {
            clearTimeout(c.t)
        }).bind("mouseout", function () {
            c.iHidden()
        }).appendTo(document.body);
        this.times = {
            t1: 0,
            t2: 0
        };
        this.sug.find(".super-rich, .user-oper").bind("mouseenter mouseleave", function (i) {
            var h = jQuery(this),
                d = h.attr("t");
            clearTimeout(Room.userMenu.times[d]);
            var g, f;
            if (i.type == "mouseenter") {
                g = "block";
                f = 500
            } else {
                g = "none";
                f = 200
            }
            Room.userMenu.times[d] = setTimeout(function () {
                h.find(".more").css("display", g)
            }, f)
        });
        this.icons = this.sug.find("p.icon:eq(0)");
        this.username = this.sug.find("h6");
        this.sug.find("span.to-chat-pri").click(function (d) {
            d.stopPropagation();
            c.iHidden("y");
            ChatPrivateWin.open({
                uid: c.uid,
                alias: c.alias
            });
            return false
        });
        this.sug.on("click", "a", function (d) {
            var e = jQuery(this);
            if (!e.hasClass("is_link")) {
                d.preventDefault()
            }
            if (!e.hasClass("menu_s")) {
                c.iHidden()
            }
            var f = e.prop("class").replace(/^.+\s+/, "");
            if (!pageMessage.userCheck && !jQuery.inArray(f, ["into_room", "userinfo"])) {
                Login.toLogin();
                return
            }
            switch (f) {
                case "sendGift":
                    Room.present.setTou({
                        uid: c.uid,
                        alias: c.alias,
                        rid: c.rid
                    });
                    setTimeout(function () {
                        Room.present.set_gift(e)
                    }, 50);
                    break;
                case "add_f":
                    IM.add.apply_friend(c.uid);
                    break;
                case "add_follow":
                    Room.follow(c.uid);
                    break;
                case "say_pub":
                    Room.chatList.setCurUser({
                        uid: c.uid,
                        alias: c.alias,
                        rid: c.rid
                    });
                    break;
                case "say_pri":
                    Room.chatList.setCurUser({
                        uid: c.uid,
                        alias: c.alias,
                        rid: c.rid,
                        pri: 1
                    });
                    break;
                case "into_room":
                    d.target.href = "/" + c.rid;
                    return true;
                    break;
                case "del_note":
                    Room.stickNote.deStick();
                    break;
                case "stone":
                    Stone.start({
                        uid: c.uid,
                        alias: c.alias
                    });
                    break;
                case "oJinyan":
                    Room.userPower.set("j");
                    break;
                case "oJinyan_r":
                    Room.userPower.set("rj");
                    break;
                case "oTiren":
                    Room.userPower.set("t");
                    break;
                case "chuanyue":
                    Room.userPower.chuanyue();
                    break;
                case "kick":
                    Room.HostPower.forbid("t");
                    break;
                case "say_off":
                    Room.HostPower.forbid("j");
                    break;
                case "say_on":
                    Room.HostPower.forbid("c");
                    break;
                case "set_power":
                    Room.HostPower.setManager(1);
                    break;
                case "del_power":
                    Room.HostPower.setManager(0);
                    break;
                case "set_power_z":
                    Prompt.confirm("总管具有提拔/撤销普通房管的权限，任期为1个月。<br/>您确定要提拨 " + Room.userMenu.alias + " 为总管吗？", function (g) {
                        if (g) {
                            Room.HostPower.setManager_z(1)
                        }
                    });
                    break;
                case "del_power_z":
                    Room.HostPower.setManager_z(0);
                    break;
                case "ip_off":
                    Room.HostPower.mdelIp();
                    break;
                case "resolve":
                    Room.resolve(e);
                    break;
                case "move":
                    Room.HostPower.moveUser(e.attr("rid"));
                    break;
                case "number_off":
                    Room.HostPower.killUser("no");
                    break;
                case "ip_off_2":
                    Room.HostPower.mdelIp();
                    break;
                case "say_pri_del":
                    if (!confirm("确定要拉入黑名单吗？")) {
                        return
                    }
                    Room.Msg.send("room_addbaduser", {
                        t: Room.userMenu.uid
                    });
                    break;
                case "userinfo":
                    UserCard_win.getCard(Room.userMenu.uid);
                    break
            }
        });
        var a = this.sug.find("a.sendGift").eq(0);
        this.oTeQuan = this.sug.find("p.oTeQuan");
        this.oJinyanBtn = this.sug.find("a.oJinyan");
        this.oJinyanrBtn = this.sug.find("a.oJinyan_r");
        this.oTirenBtn = this.sug.find("a.oTiren");
        this.oChuanyue = this.sug.find("a.chuanyue")
    },
    no_badges: [7570, 7569, 7122, 7839, 7946, 7827, 7828, 7829],
    t: 0,
    visible: function (f, a) {
        clearTimeout(this.t);
        Room.userList.isOver2 = 1;
        try {
            if (this.par) {
                this.par.removeClass("on")
            }
            f.addClass("on")
        } catch (h) { }
        this.par = jQuery(f);
        if (!a) {
            a = Room.listUsers[f.id]
        }
        if (jQuery.inArray(Room.user.role / 1, [10, 8, 9, 3]) > -1) {
            if (Room.user.role == 10) {
                if (jQuery.inArray(a.role / 1, [10, 9, 3]) > -1) {
                    this.sug.find(".main_1 .more-list").css("display", "none")
                } else {
                    this.sug.find(".main_1 .more-list").css("display", "block");
                    if (a.role == 7) {
                        d = ".del_power";
                        _selector_h = ".set_power, .del_bo"
                    } else {
                        d = ".set_power";
                        _selector_h = ".del_power"
                    }
                    this.sug.find(d).css("display", "block");
                    this.sug.find(_selector_h).css("display", "none")
                }
            } else {
                if ("893".indexOf(Room.user.role) > -1) {
                    if (jQuery.inArray(a.role / 1, [9, 3]) > -1) {
                        this.sug.find(".main_1 .more-list").css("display", "none")
                    } else {
                        this.sug.find(".main_1 .more-list").css("display", "block");
                        var d, c;
                        switch (a.role / 1) {
                            case 5:
                                d = ".set_power_z";
                                _selector_h = ".del_power, .del_power_z,.set_power";
                                break;
                            case 7:
                                d = ".del_power,  .set_power_z";
                                _selector_h = ".set_power, .del_power_z";
                                break;
                            case 10:
                                d = ".del_power_z";
                                _selector_h = ".set_power, .del_power, .set_power_z";
                                break;
                            default:
                                d = ".set_power, .set_power_z";
                                _selector_h = ".del_power, .del_power_z"
                        }
                        this.sug.find(d).css("display", "block");
                        this.sug.find(_selector_h).css("display", "none")
                    }
                }
            }
        }
        if (a.isNote && a.uid == _puser.uid) {
            this.note.add_note.css("display", "none");
            this.note.del_note.css("display", "block")
        } else {
            this.note.add_note.css("display", "block");
            this.note.del_note.css("display", "none")
        }
        this.username.html(a.alias + "：");
        this.uid = a.uid;
        this.rid = a.rid;
        this.alias = a.alias;
        this.dj = a.dj;
        var g = this;
        a.ico = a.ico || [];
        a.ico = jQuery.grep(a.ico, function (e) {
            return jQuery.inArray(e / 1, g.no_badges) < 0
        });
        if (a.ico && a.ico.length > 0) {
            this.icons.addClass("iconVis");
            this.icons.html('<i class="badge_' + a.ico.join('"></i><i class="badge_') + '"></i><b class="underline"></b>')
        } else {
            this.icons.removeClass("iconVis");
            this.icons.empty()
        }
        this.set_pos();
        this.sug.css("visibility", "visible");
        this.vis = 1;
        jQuery(document.body).bind("click", this.dev)
    },
    iHidden: function (a) {
        clearTimeout(this.t);
        if (a == "y") {
            this.hid()
        } else {
            this.t = setTimeout(this.hid, 200)
        }
    },
    hid_fn: {},
    add_hid_fn: function (a) {
        jQuery.extend(this.hid_fn, a)
    },
    on_hid: function () {
        for (var c in this.hid_fn) {
            try {
                this.hid_fn[c]()
            } catch (a) {
                console.log(c)
            }
        }
    },
    hid: function () {
        var a = Room.userMenu;
        try {
            a.par.removeClass("on")
        } catch (c) { }
        Room.userList.isOver2 = 0;
        Room.chatList.rollChange(1);
        a.par = null;
        a.sug.css({
            visibility: "hidden",
            top: -9999
        });
        a.sug.find("ul.ul_list").css("top", -99999);
        Room.magic.hid();
        a.vis = 0;
        jQuery(document.body).unbind("click", a.dev);
        a.on_hid()
    },
    dev: function (c) {
        if (!c) {
            return
        }
        var a = jQuery(c.target),
            d = Room.userMenu;
        while (a[0] && !a.is("body")) {
            if (a[0] == d.sug[0] || (d.par && a[0] == d.par[0])) {
                return
            }
            a = a.parent()
        }
        d.iHidden("y")
    },
    set_pos: function () {
        var h = this.par.offset(),
            e, g;
        if (!this.par.is("li")) {
            e = h.left + this.par.width();
            if ((e + 200 + 30) > jQuery(document.body).width()) {
                e = h.left - 200
            }
        } else {
            e = h.left - 200
        }
        var g = h.top,
            d = jQuery(window).height(),
            a = jQuery(document.body).scrollTop(),
            c = this.sug.height() + 45,
            f = this.sug.width();
        if (g + c > d + a) {
            if (d > c) {
                g = d + a - c
            } else {
                g = a
            }
        }
        if (h.left - f < 5) {
            e = h.left + this.par.width()
        }
        this.sug.css({
            top: g,
            left: e
        })
    }
}
userMenu.create();

var Input_sug;
function changeUser(a) {
    //if (!a.uid) {
    //    this.toUserId = "";
    //    this.userInput.val("所有人");
    //    this.isPriveCheck.prop("checked", false);
    //    this.isPriveCheck.prop("disabled", true);
    //    this.toPub.addClass("to_select");
    //    this.isPriveCheck.trigger("change");
    //    if (this.sendInput.hasClass("input_text_prive")) {
    //        this.sendInput.removeClass("input_text_prive");
    //        this.notice_cover(0)
    //    }
    //    return
    //}
    //this.isPriveCheck.prop("disabled", false);
    //if (a.pri) {
    //    this.isPriveCheck.prop("checked", true);
    //    this.sendInput.addClass("input_text_prive");
    //    this.notice_cover(1)
    //} else {
    //    if (this.sendInput.hasClass("input_text_prive")) {
    //        this.isPriveCheck.prop("checked", false);
    //        this.sendInput.removeClass("input_text_prive");
    //        this.notice_cover(0)
    //    }
    //}
    //this.isPriveCheck.trigger("change");
    //if (!a.pub) {
    //    this.inputFocus()
    //}
    //this.toPub.removeClass("to_select");
    //this.toUserId = a.uid;
    //this.toUserRid = a.rid;
    //this.toName = a.alias.unescapeHTML();
    //this.userInput.val(a.alias.unescapeHTML())
};

(function () {
    var a = jQuery;
    Input_sug = function () {
        this.initialize.apply(this, arguments)
    };
    a.extend(Input_sug.prototype, {
        items: [],
        input: 0,
        list: [],
        cur: null,
        max: 20,
        initialize: function (c) {
            this.callback = c.callback || function () { };
            this.input = a(c.input);
            this.is_order = c.order == 0 ? 0 : 1;
            this.box = a('<div class="preUserSug"><ul></ul></div>').appendTo(document.body).addClass(c._class || "");
            this.upList(c.items || []);
            this.input.bind("keydown", a.proxy(this.nextUserList, this));
            this.input.bind("click", a.proxy(function () {
                if (!this.vis) {
                    this.visible(this.input, c.posBox)
                } else {
                    this.iHidden()
                }
            }, this));
            if (c.btn && c.btn[0]) {
                c.btn.bind("click", a.proxy(function () {
                    if (!this.vis) {
                        this.visible(c.btn, c.posBox)
                    } else {
                        this.iHidden()
                    }
                }, this))
            }
        },
        addItem: function (c) {
            var d = a.grep(this.items, function (e) {
                return e.uid != c.uid
            });
            d.unshift(c);
            if (d.length > this.max) {
                d.pop()
            }
            this.upList(d || [])
        },
        empty: function () {
            this.items = [];
            this.box.find("ul").remove()
        },
        upList: function (c) {
            if (c.length < 1) {
                return
            }
            this.items = c;
            this.box.find("ul").remove();
            var d = a("<ul>"),
                e = this;
            a.each(this.items, function (f, g) {
                a("<li>", {
                    html: g.alias,
                    mouseover: a.proxy(e.setOver, e, f),
                    mouseout: a.proxy(e.setOut, e, f),
                    click: a.proxy(e.setCallback, e, f)
                }).appendTo(d).attr("u", g.uid)
            });
            this.box.append(d);
            this.list = this.box.find("li")
        },
        setOver: function (d) {
            var c = this.list;
            if (this.cur != null) {
                c.eq(this.cur).removeClass("on")
            }
            c.eq(d).addClass("on");
            this.cur = d
        },
        setOut: function (c) {
            this.list.eq(c).removeClass("on");
            delete this.cur
        },
        setCallback: function (e) {
            if (this.list.eq(e).length < 1) {
                return
            }
            var d = this.list.eq(e).attr("u"),
                c = this.getItem(d);
            this.callback(c);
            if (this.is_order) {
                this.addItem(c)
            }
            this.iHidden();
            return false
        },
        getItem: function (d) {
            for (var c = 0; c < this.items.length; c++) {
                if (this.items[c].uid == d) {
                    return this.items[c]
                }
            }
        },
        nextUserList: function (f) {
            if (this.items.length < 1) {
                return false
            }
            var d = this.list;
            if (!this.vis) {
                this.visible()
            }
            switch (f.which) {
                case 40:
                    if (this.cur == null) {
                        this.setOver(0)
                    } else {
                        var c = this.cur + 1;
                        if (!d[c]) {
                            c = 0
                        }
                        this.setOver(c)
                    }
                    break;
                case 38:
                    if (this.cur == null) {
                        this.setOver(this.items.length - 1)
                    } else {
                        var c = this.cur - 1;
                        if (!d[c]) {
                            c = this.items.length - 1
                        }
                        this.setOver(c)
                    }
                    break;
                case 13:
                    this.setCallback(this.cur);
                    break
            }
            return true
        },
        visible: function (f, e) {
            this.vt = jQuery(f);
            if (this.items.length < 1) {
                return
            }
            var d = this.box,
                c = (e || this.input).offset();
            d.css({
                width: (e || this.input).width(),
                left: c.left,
                top: c.top - d.height(),
                opacity: 1,
                visibility: "visible"
            });
            this.vis = 1;
            if (!this.devPreSug) {
                this.devPreSug = a.proxy(this.dev, this)
            }
            a(document.body).bind("click", this.devPreSug)
        },
        iHidden: function () {
            this.box.css({
                opacity: 0,
                visibility: "hidden"
            });
            this.vis = 0;
            delete this.vt;
            this.setOut(this.cur || 0);
            a(document.body).unbind("click", this.devPreSug)
        },
        dev: function (d) {
            var c = a(d.target);
            while (!c.is("body")) {
                if (c[0] == this.input[0] || c[0] == this.vt[0]) {
                    return
                }
                c = c.parent()
            }
            this.iHidden()
        }
    })
})();

//Initialize For Face imoticon
var FaceSymbols = { "0": "/狂笑", "1": "/大笑", "2": "/惊讶", "3": "/害羞", "4": "/窃笑", "5": "/发怒", "6": "/大哭", "7": "/色色", "8": "/坏笑", "9": "/火大", "10": "/汗", "11": "/奸笑", "12": "/欢迎", "13": "/再见", "14": "/白眼", "15": "/挖鼻", "16": "/顶", "17": "/胜利", "18": "/欧耶", "19": "/抱拳", "20": "/囧", "21": "/淡定", "22": "/美女", "23": "/靓仔", "24": "/神马", "25": "/开心", "26": "/给力", "27": "/飞吻", "28": "/眨眼", "29": "/V5", "30": "/来吧", "31": "/围观", "32": "/飘过", "33": "/地雷", "34": "/菜刀", "35": "/帅", "36": "/审视", "37": "/无语", "38": "/无奈", "39": "/亲亲", "40": "/勾引", "41": "/后后", "42": "/吐血", "44": "/媚眼", "45": "/愁人", "46": "/肿么了", "47": "/调戏", "48": "/抽", "49": "/哼哼", "50": "/bs", "52": "/鸡冻", "53": "/眼馋", "54": "/热汗", "55": "/输", "56": "/石化", "57": "/蔑视", "58": "/哭", "59": "/骂", "60": "/狂哭", "61": "/狂汗", "62": "/笑哭", "63": "/狗狗", "64": "/喵喵" };
var FaceVip = { vip1: "/真好听", vip2: "/嗨起来", vip3: "/霸气", vip4: "/红包刷起来", vip5: "/太漂亮了", vip6: "/马上投票", vip7: "/玫瑰在哪里", vip8: "/土豪来啦", vip9: "/爱死你了", vip10: "/啵一个", vip11: "/新货求关注", vip12: "/要抱抱", vip13: "/冒个泡", vip14: "/有黑幕", vip15: "/爱你1314", vip16: "/好甜呀", vip17: "/坑爹", vip18: "/女汉子", vip19: "/鼓掌", vip20: "/加油", vip21: "/天然呆", vip22: "/赞" };
var FaceSafe = { s11: "/被扁", s12: "/变脸", s13: "/吃饭", s14: "/吹裙子", s15: "/打劫", s16: "/憨笑", s17: "/泪流满面", s18: "/傻笑", s19: "/惊吓", s20: "/惊恐", s21: "/好囧", s22: "/蹲墙角", s23: "/可爱", s24: "/委屈落泪", s25: "/抠鼻", s26: "/亲一个", s27: "/色迷迷", s28: "/闪闪发光", s29: "/虐", s31: "/幸福", s32: "/装帅", s33: "/拍砖", s30: "/左吐", s34: "/右吐", s35: "/左闪", s36: "/右躲", s1: "/白富美", s2: "/心动的感觉", s3: "/兄弟们上", s4: "/求交往", s5: "/嫁给我吧", s6: "/在一起", s7: "/看好老婆", s8: "/好基友", s9: "/屌爆了", s10: "/走你" };
function insertFace(c, i) {
    if (!document.selection) {
        var k = c.selectionStart;
        var h = c.selectionEnd;
        var d = c.value;
        d = d.substr(0, k) + i + d.substr(h, d.length);
        c.value = d;
        c.selectionStart = c.selectionEnd = k + i.length;
        c.focus();
        return
    }
    c.focus();
    var f = document.selection.createRange();
    var a = c.createTextRange();
    var d = c.value;
    var j;
    var g = f.text.length;
    var l = "&^asdjfls2FFFF325%$^&";
    f.text = l;
    j = c.value.indexOf(l);
    f.moveStart("character", -l.length);
    f.text = "";
    c.value = d.substr(0, j) + i + d.substr(j + g, d.length);
    a.collapse(true);
    a.moveStart("character", j + i.length);
    a.select()
}
(function () {
    var a = jQuery;
    window.Faces = function () {
        this.initialize.apply(this, arguments)
    };
    a.extend(Faces.prototype, {
        init: 0,
        initialize: function (c) {
            this.haveVip = c.vip;
            this.haveSafe = c.safe;
            this.isSafe = c.safe;// && Room.user.safe || Room.user.role == 9;
            this.isVip = c.vip;// && (/7103|7104|7105|7559/.test(Room.user.prop) || Room.user.role == 9);
            this.btn = a(c.btn);
            this.btn.bind("click", a.proxy(this.visible, this));
            this.input_text = a(c.input_text);
            this.smile = {
                base: FaceSymbols,
                vip: FaceVip,
                safe: FaceSafe
            };
            this.cells = {
                base: 9,
                vip: 3,
                safe: 4
            };
            this.isTitle = c.isTitle

        },
        insertFace: function (c) {
            if (this.input_text.prop("disabled")) {
                return
            }
            if (this.input_text.val() == this.input_text.attr("title") || this.input_text.hasClass("notice_default")) {
                this.input_text.focus()
            }
            insertFace(this.input_text[0], c)
        },
        visible: function (c) {
            c.preventDefault();
            c.stopPropagation();
            if (!this.panel) {
                this.createPanel()
            }
            this.panel.visible()
        },
        createPanel: function () {
            var c = this;
            c.panel = {};
            c.panel.box = a("<div>", {
                "class": "face-pop"
            }).on("click", "td", function (d) {
                console.log(this);
                c.insertFace("/" + this.title);
                c.panel.iHidden()
            }).appendTo(document.body);
            a.extend(c.panel, {
                vis: 0,
                isInit: 0,
                gifInit: function () {
                    this.isInit = 1;
                    var f = a('<div class="face-default"/>').appendTo(c.panel.box);
                    var g = a('<div class="face-vip"/>').appendTo(c.panel.box);
                    var h = a('<div class="face-safe"/>').appendTo(c.panel.box);
                    f.append(this.get_smile_table("base"));
                    if (c.isVip) {
                        g.append(this.get_smile_table("vip"))
                    }
                    if (c.isSafe) {
                        h.append(this.get_smile_table("safe"))
                    }
                    var e = a('<div class="tab"/>').html('<a class="default on" data-type="face-default" title="普通表情"><i></i></a><a class="vip" data-type="face-vip" title="VIP和绿卡专用表情"><i></i></a><a class="safe" data-type="face-safe" title="守护专用表情"><i></i></a>').appendTo(c.panel.box);
                    var i = c.panel.box.find("div.face-default, div.face-vip, div.face-safe"),
                        d = e.find("a");
                    if (!c.haveVip) {
                        d.filter(".vip").css("display", "none")
                    }
                    if (!c.haveSafe) {
                        d.filter(".safe").css("display", "none")
                    }
                    d.click(function (k) {
                        k.preventDefault();
                        var j = a(this).attr("data-type");
                        if (j == "face-vip" && !c.isVip) {
                            Prompt.create({
                                content: "您没有VIP或绿卡，不能使用会员专属表情。<br/>是否现在购买VIP？",
                                btn_sure: {
                                    text: "立即购买",
                                    link: "/user/shopprop.php",
                                    target: "shop"
                                },
                                btn_cancel: {
                                    text: "取消"
                                }
                            })
                        } else {
                            if (j == "face-safe" && !c.isSafe) {
                                Prompt.create({
                                    content: "您不是本房间的守护，不能使用专属表情和礼物。<br/>现在去查看守护的各类尊贵特权吗？",
                                    btn_sure: {
                                        text: "立即查看",
                                        link: "/user/prop/showBuyProp.php?rid=" + page.rid,
                                        target: "_target"
                                    },
                                    btn_cancel: {
                                        text: "取消"
                                    }
                                })
                            } else {
                                i.css("display", "none");
                                i.filter("." + j).css("display", "block");
                                d.removeClass("on");
                                a(this).addClass("on")
                            }
                        }
                    });
                    this.dev = a.proxy(this._dev, this)
                },
                get_smile_table: function (k) {
                    FaceUrl = "/files/image/6cn_face/";
                    var j = c.smile[k],
                        o = document.createElement("table"),
                        q = c.cells[k],
                        m = o.insertRow(0),
                        r = 0,
                        g = 1;
                    var l = [];

                    for (var d in j) {
                        l.push([d, j[d]])
                    }
                    r = l.length / 1 + l.length % q / 1;
                    for (var h = 0; h < r; h++) {
                        if (h % q == 0 && h != 0) {
                            var m = o.insertRow(Math.floor(h / q))
                        }
                        var f = m.insertCell(h % q);
                        var e = l[h];
                        if (e) {
                            var n = e[1].slice(1);
                            f.title = n;
                            f.innerHTML = '<img alt="' + n + '" src="' + FaceUrl + e[0] + '.gif" />';
                        } else {
                            f.innerHTML = ""
                        }
                    }
                    return o
                },
                visible: function () {
                    if (!this.isInit) {
                        this.gifInit()
                    }
                    if (this.vis) {
                        return this.iHidden()
                    }
                    var d = c.btn.offset();
                    this.box.css({
                        left: d.left - 80,
                        top: d.top - 280,
                        opacity: 1,
                        visibility: "visible"
                    });
                    this.vis = 1;
                    a(document).on("click", this.dev)
                },
                iHidden: function () {
                    this.box.css({
                        top: -10000,
                        opacity: 0,
                        visibility: "hidden"
                    });
                    this.vis = 0;
                    this.btn = null;
                    a(document).off("click", this.dev);
                    return false
                },
                _dev: function (e) {
                    var d = e.target;
                    if (!a.contains(this.box[0], d) && d != this.box[0]) {
                        this.iHidden()
                    }
                }
            })
        }
    })
})();

//scroll between public and private chat box
var c = e;
var m = c("#all_chat"),
    k = c("#chatForm"),
    n = k.find("input");
var l, h = jQuery("#only_chat");
l = {
    pub_box: h.find("div.talk-public div.stream"),
    pri_box: h.find("div.talk-private div.stream"),
    pub_hand: h.find(".pubHandBox:eq(0)"),
    pri_hand: h.find(".pubHandBox:eq(1)"),
    tab_btn: c(".room-chat-tab a.only_chat"),
    tome_box: h.find("#watchTalk_me"),
    bar: h.find("#watchTalk_slideBar")
};

var DoInit = function (d) {
    container = d.publicBox.find("ul");
    if (container.length < 1) {
        container = jQuery("<ul>").appendTo(d.publicBox)
    }
    container.addClass("chatList");
    scrollBox = d.publicBox.parent();
    publicBox = d.publicBox;
    priveBox = d.priveBox;
    is_vip_face = d.is_vip_face == null ? 1 : d.is_vip_face;
    sendBtn = d.chatSendBtn;
    sendBtn.data("def_class", sendBtn.prop("class"));
    sendBtn.bind("mouseover", function () {
        jQuery(this).addClass("on")
    });

    sendBtn.bind("mouseout", function () {
        jQuery(this).removeClass("on")
    });
    sendInput = d.chatInput.val("").attr("disabled", false);
    userInput = d.userInput;
    userInput.val("所有人");
    userSug = new Input_sug({
        callback: jQuery.proxy(changeUser, this),
        input: this.userInput[0],
        posBox: d.posBox
    });

    var g = jQuery("#pubHandBox").hide().css({
        visibility: "visible",
        opacity: 1
    });
    g.bind("visible hidden mouseenter", function (j) {
        switch (j.type) {
            case "visible":
                jQuery(this).show();
                break;
            case "hidden":
                jQuery(this).hide();
                break;
            case "mouseenter":
                jQuery(this).show()
        }
    });
    scrollBox.bind("mouseenter", function () {
        g.trigger("visible")
    });
    scrollBox.bind("mouseleave", function () {
        g.trigger("hidden")
    });
    g.find(".clearListBtn").bind("click", function () {
        a.clearList("pub")
    });
    rollBtn = g.find(".rollPauseBtn");
    rollBtn.bind("click", this.rollChange);
    isPriveCheck = d.isPriveCheck;

    if (isPriveCheck && d.checkboxSubstitue) {
        d.checkboxSubstitue.bind("click", function () {
            var j = d.checkboxSubstitue;
            var k = isPriveCheck;
            if (k.prop("disabled")) {
                return
            }
            k.prop("checked", j.hasClass("checkbox-checked") ? false : true);
            k.trigger("change")
        });
        isPriveCheck.bind("change", function () {
            var l = a.isPriveCheck;
            var j = d.checkboxSubstitue;
            var k = a.sendInput;
            if (l.prop("disabled")) {
                j.addClass("checkbox-disabled")
            } else {
                j.removeClass("checkbox-disabled")
            }
            if (l.prop("checked")) {
                k.addClass("input_text_prive");
                j.addClass("checkbox-checked");
                a.notice_cover(1)
            } else {
                k.removeClass("input_text_prive");
                j.removeClass("checkbox-checked");
                a.notice_cover(0)
            }
        })
    }
    if (d.priveBox.length > 0) {
        isPriveCheck.prop("checked", false);
        isPriveCheck.prop("disabled", true);
        isPriveCheck.trigger("change");
        priveContainer = jQuery("<ul>").appendTo(d.priveBox);
        priveScrollBox = d.priveBox.parent();
        priveContainer.addClass("chatList");
        priveContainer.on("click", "a, .to-chat-pri", function (m) {
            var l = jQuery(this),
                n = l.attr("user");
            if (n) {
                m.preventDefault();
                var k = n.split(",");
                n = {
                    uid: k[0],
                    rid: k[1],
                    alias: k[2],
                    ico: (k[3] && k[3].split("|") || []),
                    role: k[4],
                    pri: 1
                };
                //setCurUser(n);
                //visible(l, n)
            } else {
                if (l.hasClass("to-chat-pri")) {
                    var j = l.siblings("a[user]").attr("user").split(",");
                    ChatPrivateWin.open({
                        alias: j[2],
                        uid: j[0]
                    })
                }
            }
        });
        var c = jQuery("#priHandBox").hide().css({
            visibility: "visible",
            opacity: 1
        });
        c.bind("visible hidden mouseenter", function (j) {
            switch (j.type) {
                case "visible":
                    jQuery(this).show();
                    break;
                case "hidden":
                    jQuery(this).hide();
                    break;
                case "mouseenter":
                    jQuery(this).show()
            }
        });
        priveScrollBox.bind("mouseenter", function () {
            if (!_puser.uid) {
                return
            }
            c.trigger("visible")
        });
        priveScrollBox.bind("mouseleave", function () {
            c.trigger("hidden")
        });
        c.find(".clearListBtn").bind("click", function () {
            a.clearList("pri")
        });
        priHandBox = c;

        var i = sendInput;
        isPriveCheck.bind("click", function () {
            if (this.checked) {
                i.addClass("input_text_prive");
                a.notice_cover(1)
            } else {
                i.removeClass("input_text_prive");
                a.notice_cover(0)
            }
        })
    }

    sliderBar = jQuery("#watchChat_slideBar");
    if (sliderBar) {
        jQuery("#watchChat_slideBar").bind("mousedown", function (o) {
            var k = parseInt(priHandBox.css("bottom")),
                j = parseInt(scrollBox.css("height")),
                n = parseInt(priveScrollBox.css("height")),
                m = parseInt(sliderBar.css("bottom"));
            var l = scrollBox.attr("min") / 1;
            jQuery(document).bind("mousemove", function (r) {
                var q = r.pageY - o.pageY,
                    s = q + j,
                    p = -q + n;
                if (s < 100 || p < 50) {
                    return
                }
                sliderBar.css("bottom", -q + m);
                priHandBox.css("bottom", k - q);
                scrollBox.css("height", s);
                priveScrollBox.css("height", p)
            });
            jQuery(document).bind("mouseup", function () {
                jQuery(document).unbind("mousemove");
                jQuery(document).unbind("mouseup")
            });
            return false
        })
    }

    var f = [];
    for (var h in FaceSymbols) {
        f.push(FaceSymbols[h])
    }
    Fsm = f.join("|");

    toPub = d.toPub ? d.toPub : jQuery("#chatForm, #chatInput, #chatBox").find("a.toPub").addClass("to_select");
    toPub.bind("click", function (j) {
        j.preventDefault();
        if (jQuery(this).hasClass("to_select")) {
            if (Room.chatList.userSug.vis) {
                Room.chatList.userSug.iHidden()
            } else {
                Room.chatList.userSug.visible(this, d.posBox)
            }
        } else {
            Room.chatList.setCurUser({})
        }
    });

    var e = d.faceBtn;
    _face = new Faces({
        btn: e[0],
        input_text: sendInput,
        fname: "chat",
        vip: 1,
        safe: 1
    });
};
DoInit({
    publicBox: m.find("#watchChat_pub div.stream"),
    priveBox: m.find("#watchChat_pri div.stream"),
    userInput: n.eq(0),
    isPriveCheck: n.eq(1),
    chatInput: k.find(".to-text input"),
    chatSendBtn: k.find("a.btn_text:eq(0)"),
    faceBtn: k.find(".to-face"),
    toPub: k.find("a.toPub"),
    only_chat: l,
    posBox: n.eq(0).parent()
});

var isPlayShape = false;//Wether play gift.

// gift animation 
function gift_animation(num, shape, imgname) {
    var classid = nonShapeGift(num, imgname);
    $("#giftNum").val("");
    removeNonShapeGift(classid);
}

//선물의 형태를 지정하지 않고 보낼때 선물을 그리는 함수
function nonShapeGift(num, imgname) {
    var classid = "giftShowBox" + parseInt(getRandomArbitrary(0, 10000));
    var f = document.createElement("div");
    f.className = classid;
    f.style.width = "940px";
    f.style.left = "50%";
    f.style.top = "0";
    f.style.zIndex = 3000;
    f.style.marginTop = "-80px";
    f.style.marginLeft = "-1000px";
    f.style.marginBottom = "850px";
    f.style.marginRight = "150px";
    for (var i = 1; i <= num; i++) {
        var img = document.createElement("div");
        img.style.width = "150px";
        img.style.height = "150px";
        img.style.zIndex = 3000;

        var left_rand_no = parseInt(getRandomArbitrary(500, 1000));
        var top_rand_no = parseInt(getRandomArbitrary(120, 570));

        img.style.left = left_rand_no + "px";
        img.style.top = top_rand_no + "px";
        img.style.backgroundImage = "url(/files/image/live/nonShapeGift/gift_" + imgname + ".png)"
        img.style.backgroundPosition = "center center";
        img.style.backgroundRepeat = "no-repeat";
        img.style.position = "absolute";
        f.appendChild(img);
    }
    document.body.appendChild(f);

    return classid;
}

//최소와 최대값 사이에서 우연수를 발생시킨다.
function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}

//형태를 지정하지 않은 선물을 지우는 함수
function removeNonShapeGift(classid) {
    setTimeout(function () {
        $("div").remove("." + classid);
    }, 10000);
}

//Show gift - type=/GIFT/Name/Num/
function ShowGift(strMsg) {
    var strVal = strMsg;
    var giftHead = "", giftTail = "</li>";
    idx = strVal.indexOf("/GIFT/", 0);
    if (idx >= 0) {
        if ($('.gift_hide').attr('checked') != 'checked')
        {
            giftHead = strVal.substr(0, idx);
            strGift = strVal.substr(idx + 6, strVal.length - (idx + 6));
            strGiftInfo = strGift.split("/");

            strVal = "";
            var nCnt = strGiftInfo[1];
            nCnt = parseInt(nCnt, 10);
            var nAnimationCnt = strGiftInfo[1];
            var name = strGiftInfo[0].split('gift_');

            setTimeout(function () {
                putGiftList(giftHead, giftTail, strGiftInfo[0], nCnt);
            }, 100);

            gift_animation(nAnimationCnt, false, name[1]);
            nAnimationCnt = 0;
        }
        strVal = "";//giftHead + strVal + giftTail;
    }
    return strVal;
}

function putGiftList(msgHead, msgTail, gName, nCnt)
{
    if (nCnt > 10000) return;
    for (i = 0; i < nCnt; i++) {
        strVal = '<img style="width:22px;height:22px;" src="/files/image/live/swfGIFT/'
         + gName + '.png">';
        if (i > 0) {
            gnth = i + 1;
            strVal += gnth + "连击";
        }
        msg = msgHead + strVal + msgTail;
        jQuery("#watchChat_pub .stream .chatList").append(msg);
        jQuery("#watchChat_pub").scrollTop(1E10);
    }
}

//set timer for receive message.
var line_count = 40;
setInterval(function () {
    if (ChannelInfo.length > 0) {
        var msg = PostAjax("/Ajax/chat_action.ashx", "cmd=recv&chl=" + ChannelInfo);
        if (msg.length > 0) {
            if (isError(msg)) return;

            msglst = msg.split("<li>");//in case come in serveral message together.
            for (n = 0; n < msglst.length; n++) {
                if ( msglst[n].length > 0 )//except first empty token.
                {
                    msg = "<li>" + msglst[n];

                    msg = ShowGift(msg);
                    if (msg.length > 0) {
                        jQuery("#watchChat_pub .stream .chatList").append(msg);
                        jQuery("#watchChat_pub").scrollTop(1E10);

                        while (jQuery("#watchChat_pub .stream .chatList").find('li').length > line_count) {//If exceed line count, remove top lines.
                            jQuery("#watchChat_pub .stream .chatList").find('li:first').remove();
                        }
                    }
                }
            }
        }
    }
}, 3000);

function sendMsg() {
    var txt = jQuery(".to-text input").val();

    if (txt.length > 0) {
        var sresult = PostAjax("/Ajax/chat_action.ashx", "cmd=send&txt=" + jQuery(".to-text input").val() + "&chl=" + ChannelInfo);

        if (isError(sresult)) return;

        jQuery(".to-text input").val("");
    }
}

function isError( msg )
{
    switch (msg) {
        case '\\-1': $("span.pay-px").text("发送信息错误"); return true;
        case '\\1': $("span.pay-px").text("停止聊天 (2个小时)"); return true;
        case '\\2': $("span.pay-px").text("不能发送信息 (15分钟)"); return true;
        case '\\3': $("span.pay-px").text("不能发送信息 (30分钟)"); return true;
        case '\\4': $("span.pay-px").text("不能发送信息 (1个小时)"); return true;
    }

    $("span.pay-px").text("聊天初始化成功");
    return false;
}

jQuery(".flyBtn").bind("click", function () {
    sendMsg();
});

jQuery(".btn_text").bind("click", function () {
    sendMsg();
});

jQuery(".giftflyBtn").bind("click", function () {
    var gift_unit = [1, 2, 2, 5, 5, 10, 10, 20, 20, 50, 100, 200, 500, 1000, 5000];

    var gift = jQuery("#gift-clss").val();    
    var cnt = jQuery(".gift-set .to-count input").val();
    if (gift.length <= 0) {
        alert('请选择送礼物的图标。');
        return;
    }

    if (cnt.length <= 0) {
        alert('请输入送礼物的金额。');
        jQuery(".gift-set .to-count input").focus();
        return;
    }

    //var coin = parseFloat(document.getElementById("user_coin_span").innerText);
    var gift_index = gift.substring(11, gift.length - 1);
    var gift_coin = parseInt(cnt) * gift_unit[parseInt(gift_index) - 1];
        
    if (_total < gift_coin) {
        alert('您的总分不够下注，请投币！');
        jQuery(".to-count input").focus();
        return;
    }

    if (gift.length > 0 && cnt.length > 0) {
        cnt = parseInt(cnt, 10);
        if (cnt > 0) {
            
            var sresult = PostAjax("/Ajax/chat_action.ashx", "cmd=send&txt=" + gift + cnt + "/&chl=" + ChannelInfo + "&gift_coin=" + gift_coin);
            if (isError(sresult)) return;

            jQuery("#gift-clss").val("");
            jQuery(".gift-set .to-count input").val("");

            _total = _total - gift_coin;
            digit7_total(txt_total_7dgt, _total, 12);
        }
    }
});

function isPostBack() {
    return document.referrer.indexOf(document.location.href) > -1;
}

window.onclick = function (event) {//If visible gift pannel and clicked outside of gift pannel, hide.
    if (!event.target.matches('.gift_btn')) {
        jQuery(".gift_panel").hide();
    }
    
    if (!event.target.matches('.user-manager') && !event.target.matches('#chat_user')) {
        jQuery(".user-manager").hide();
    }
}