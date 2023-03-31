<%@ Page Language="C#" AutoEventWireup="true" CodeFile="wowza_live_m.aspx.cs" Inherits="_777Game_mobile_wowza_live_m" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
    <meta charset="utf-8" />    

    <script type="text/javascript" src="//player.wowza.com/player/latest/wowzaplayer.min.js"></script> 
    <%--<script src="/files/js/jquery-1.8.3.min.js"></script>   
    <script src="/files/js/jwplayer.js"></script>
    <script>jwplayer.key = "gESqN5xJRRkppyDGnZbzKugu91grnuoIhVplCg==";</script>--%>
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
</head>
<body>
    <form id="form1" runat="server">
        <div id='wowza_player' style='width: 720px; height: 400px; left: 0px; top: 0px;'></div>
        <%--<script id='player_embed' src='//player.cloud.wowza.com/hosted/t9hp0wfl/wowza.js' type='text/javascript'></script>--%>
        <%--<% utility.LivePlayer_mobile(Response); %>--%>
        <!--<script id='player_embed' src='//player.cloud.wowza.com/hosted/t9hp0wfl/wowza.js' type='text/javascript'></script>-->
        <script>
            var strem_player = WowzaPlayer.create('wowza_player',
                             {
                                 "license": "PLAY1-aaTQP-Nnbb7-Q3d8z-tYNbm-6ajk8",
                                 "title": "testing",
                                 "description": "",
                                 "sourceURL": "http://103.53.224.51:1935/mylive/stream/playlist.m3u8",
                                 //"sourceURL": "http://wowzaprdxhi-lh.akamaihd.net/i/0be49513_1@433777/master.m3u8",
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
<%--        <script>      
            $(document).ready(function () {
                jwplayer("wowza_player").setup({
                    playlist: [{
                        'sources': [
                            {
                                'file': 'rtmp://103.53.224.51:1935/mylive/stream',
                                //'file': 'rtmp://tianhe01.top:1935/mylive/stream',                                
                            }
                            
                        ]
                    }],
                    width: 720,
                    height: 400,
                    autostart: 'true',
                    stretching: 'exactfit',
                    displayclick: 'none',
                    hlshtml: 'true',
                    //mute: 'true'
                });
            });
            $(".jwfullscreen").css("z-index", "-1");
        </script>--%>
    </form>
</body>
</html>
