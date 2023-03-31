<%@ Page Language="C#" AutoEventWireup="true" CodeFile="betting_log.aspx.cs" Inherits="_777Game_qqqqqq" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
  <title></title>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
	<meta name="viewport" content="user-scalable=no, width=720px; " />

    <script src="/files/js/jquery-1.8.3.min.js"></script>       
    <script src="/files/js/jPages.js"></script>
  
    <script>  
	  $(function() {
		/* initiate plugin */
		$("div.holder").jPages({
			containerID : "itemContainer",
			first: false,
			previous: "上一步",
			next: "下一步",
			last: false,
            perPage     : 5
		});
	  });	   
    </script>
  
    <style type="text/css">
	  .holder {
		margin: 10px 0;
	  }
	  .holder a {         
		font-size: 24px;
		cursor: pointer;
		margin: 0 5px;
		color: #333;     
        background-color: #FAC3DE;   
        padding: 5px;       
	  }
	  .holder a:hover {
		background-color: #00FFFF;
		color: #fff;
	  }
	  .holder a.jp-previous { margin-right: 10px; }
	  .holder a.jp-next { margin-left: 10px; }
	  .holder a.jp-current, a.jp-current:hover {
        background-color: #00FFFF;
		color: #FF4242;
		font-weight: bold;
	  }
	  .holder a.jp-disabled, a.jp-disabled:hover {
		color: #bbb;
	  }
	  .holder a.jp-current, a.jp-current:hover,
	  .holder a.jp-disabled, a.jp-disabled:hover {
		cursor: default;
		background: none;
	  }
	  .holder span { margin: 0 5px; }
    </style>
</head>
<body>
    <form id="form1" runat="server">
        <div style="width: 720px; height: 1190px; position: absolute; left: 0px; top: 0px; background-image: url(/files/image/images_m/log_area.png); " >
            <img id="closebtn" src="/files/image/images_m/close_btn1.png" style="position: absolute; left: 607px; top: 113px;" onclick='javascript:window.close()' />
            <div id="container" style="width: 560px; height: 620px; position: absolute; left: 80px; top: 200px; margin: 11px; margin-left: 20px;">
              <ul id="itemContainer" class="itemContainer">	</ul>

              <div class="holder"></div>   
            </div>
        </div>
    </form>
</body>
</html>
<script>
    var text = "";
    var user_id = '<%= Session["user_id"] %>';

    var bet_item = ["吧", "七七", "星星", "西瓜", "钟", "芒果", "橙子", "苹果", "单", "双", "大", "小"];
    var fruit_name = ["大苹果", "小苹果", "大芒果", "大西瓜", "小西瓜", "Luck", "大苹果", "小橙子", "大橙子", "大钟", "小七七", "大七七", "大苹果", "小芒果",
        "大芒果", "大星星", "小星星", "Luck", "大苹果", "小钟", "大橙子", "大钟", "小吧", "大吧"];
    var evodd_name = ["双", "单"];
    var taisai_name = ["小", "大"];
    var betkinds = "";
    var collkinds = "";

    function GetFruitName(kinds_id)
    {
        var index = parseInt(kinds_id);
        var strName = bet_item[index-1];
        return strName;
    }
    function GetColletName( fruit, taisai, evodd, kinds_id) {
        var strName = "";
        var evodd = parseInt(evodd);
        var taisai = parseInt(taisai);
        var fruit = parseInt(fruit);

        var index = parseInt(kinds_id);
        if (index > 8 && index < 11){
            strName = evodd_name[evodd];
        }
        if (index > 10){
            strName = taisai_name[taisai];
        }
        if (index < 9){
            strName = fruit_name[fruit];
        }
        return strName;
    }
    

    var msg = PostAjax("/Ajax/bettinglog.ashx", "user_id=" + user_id);
    var myArray = new Array(100);
    myArray = msg.split('-');
    var semi = new Array(10);
    for (var i = 0; i < 100; i++) {
        semi = myArray[i].split(',');
        betkinds = GetFruitName(semi[6]);
        collkinds = GetColletName(semi[7], semi[8], semi[9], semi[6]);

        text = "<span style='color:white; font-size:22px'>" + semi[0] + "</span><span style='color:green; font-size:22px'> " + semi[1] + "期  注单号: " + semi[2] + " </span></br>";
        text += "<span style='color:blue; font-size:24px'>" + semi[3] + ": </span><span style='color:white; font-size:22px'>下注 [" + betkinds + "] -" + semi[4] + "金币 </span></br>";
        text += "<span style='color:red; font-size:24px'> 中奖 [" + collkinds + "]  奖金  +" + semi[5] + "金币 </span></br></br>";
        
        if (text.length) {
            $('<li />', { html: text }).appendTo('ul.itemContainer');
        }
        //$("#total_log").scrollTop($("#total_log")[0].scrollHeight);
    }
   
</script>
