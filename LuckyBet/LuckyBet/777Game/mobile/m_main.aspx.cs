using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

public partial class _777Game_mobile_m_main : System.Web.UI.Page
{
    string[] bet_item = { "吧", "七七", "星星", "西瓜", "钟", "芒果", "橙子", "苹果", "单", "双", "大", "小"};

    string[] fruit_name = { "大苹果", "小苹果", "大芒果", "大西瓜", "小西瓜", "Luck",
        "大苹果", "小橙子", "大橙子", "大钟", "小七七", "大七七", "大苹果", "小芒果",
        "大芒果", "大星星", "小星星", "Luck", "大苹果", "小钟", "大橙子", "大钟", "小吧", "大吧"};
    string[] evodd_name = { "双", "单"};
    string[] taisai_name = { "小", "大" };

    protected void Page_Load(object sender, EventArgs e)
    {
        utility.DestorySessionForTrial(Session, this);

        string user_id = (string)(Session["user_id"]);

        if (Session["user_id"] == null)
        {
            Response.Redirect(String.Format("/login.aspx?"));
        }
        if (Session["rating"] == null)
        {
            string rating = Session["rating"].ToString();

            if (rating.CompareTo("777") == 0)
            {

            }
        }
    }

    public String GetFruitName(String kinds_id)
    {
        int index = Convert.ToInt32(kinds_id);
        String strName = bet_item[index-1];
        return strName;
    }
    
    public String GetColletName(String fruit, String taisai, String evodd, String kinds_id)
    {
        String strName = "";
        int index = Convert.ToInt32(kinds_id);
        if (index > 8 && index < 11)
        {
            strName = evodd_name[Convert.ToInt32(evodd)];
        }
        if (index > 10)
        {
            strName = taisai_name[Convert.ToInt32(taisai)];
        }
        if (index < 9)
        {
            strName = fruit_name[Convert.ToInt32(fruit)-1];
        }

            return strName;
    }
}