$(function () {
    resetBoxCSS();
    initBtn();
    initTab();
    setLeftAndRight();
})

//重设ibox-content样式
function resetBoxCSS() {
    $(".ibox-content").css("border-style", "none");
    $(".ibox-content").css("padding", "15px 15px 15px 15px");
}

//初始化tab样式
function initTab() {
    $(".tab-item-title").click(function () {
        $(".tab-item-title").removeClass("tab-item-over");
        $(this).addClass("tab-item-over");
        var contentId = $(this).attr("content");
        $(".tab-item-content").hide();
        $("#" + contentId).show();
    })
}

//初始化btn样式
function initBtn() {
    $(".frame-4-btn").each(function () {
        var text = $(this).html();
        var icon = $(this).attr("icon");
        var iconName = getBtnIconName(icon);
        var url = staticServer + "/images/frame/" + iconName;
        var html =
            "<div class='frame-4-btn-box'>" +
            "<div class='frame-4-btn-box-inner'>" +
            "<div class='frame-4-btn-box-icon' style='background-image:url(" + url + ")'></div>" +
            "<div class='frame-4-btn-box-text'>" + text + "</div>" +
            "</div>" +
            "</div>";
        $(this).html(html);
    })
}

//重新table样式,表格数据加载完成后
function resetTableCSS(tableId) {
    // if (!tableId) tableId = 'table_list';
    // $("#" + tableId + " th").css({"font-size": "12px", "text-align": "center", "color": "black", "background": "#e5eff6"});
    // $("#" + tableId + " td").css({"font-size": "12px", "text-align": "center", "color": "black"});
    // $("#" + tableId).css({"border-left": "1px solid #e4eaec", "border-right": "1px solid #e4eaec"});
    // $(".fixed-table-container").css("border", 0);
    // $(".fixed-table-body").css("height", "auto");
    // var count = 1;
    // $("#" + tableId + " tbody tr").each(function () {
    //     if (count % 2 == 1) {
    //         $(this).css("background-color", "#f8fcff");
    //     }
    //     count++;
    // });
}

function resetTableCSS2() {
    $("#table_list th").css("font-size", "12px");
    $("#table_list th").css("text-align", "center");
    $("#table_list th").css("color", "black");
    $("#table_list th").css("background", "#e5eff6");

    $("#table_list td").css("font-size", "12px");
    $("#table_list td").css("color", "black");
    $("#table_list").css("border-left", "1px solid #e4eaec");
    $("#table_list").css("border-right", "1px solid #e4eaec");
    $(".fixed-table-container").css("border", 0);
    $(".fixed-table-body").css("height", "auto");
    var count = 1;
    $("#table_list tbody tr").each(function () {

        if (count % 2 == 1) {
            $(this).css("background-color", "#f8fcff");
        }
        count++;
    })
}


function setLeftAndRight() {

    var left_html = $(".frame-con-left2").html();
    if (left_html != undefined) {
        calculate();
    }

}


function calculate() {
    var w_total = $("body").width();
    var h_total = $("body").height();

    var w_back = parseInt(w_total) - parseInt(30);
    var h_back = parseInt(h_total) - parseInt(30)

    $("#div-4-back").css("width", w_back);
    $("#div-4-back").css("height", h_back);

    var w_left = getCssValue(".frame-con-left", "width");
    var w_right = parseInt(w_back) - parseInt(w_left) - parseInt(15);
    $(".frame-con-right").css("width", w_right);
}


//=====================================================================================================
function getCssValue(ele, css) {
    var value = $(ele).css(css);
    if (value.indexOf("px") > -1) {
        value = value.substring(0, value.indexOf("px"));
    }
    return value;
}

//按钮组件，根据图标icon获取显示的图片
function getBtnIconName(icon) {
    if (icon == "start") {
        return "a6.png";
    }
    if (icon == "edit") {
        return "a7.png";
    }
    if (icon == "add") {
        return "a8.png";
    }
    if (icon == "forbid") {
        return "a9.png";
    }
    if (icon == "pwd") {
        return "a10.png";
    }
    if (icon == "search") {
        return "a11.png";
    }
}