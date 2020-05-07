/**
 * 获取链接上的参数值
 * @param name 参数名
 * @returns {*}
 */
function getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return (r[2]);
    return null;
}

/**
 * 输入框保留3位小数
 * @param e : 控件 (this)
 * @param d : 默认值(可空)
 */
function check3DecimalPlaces(e, d) {
    if (d != null && !e.value) e.value = d;
    e.value = e.value.replace(/[^\d.]/g, ""); //清除"数字"和"."以外的字符
    e.value = e.value.replace(/^\./g, ""); //验证第一个字符是数字而不是
    e.value = e.value.replace(/\.{2,}/g, "."); //只保留第一个. 清除多余的
    e.value = e.value.replace(".", "$#$").replace(/\./g, "").replace("$#$", ".");
    e.value = e.value.replace(/^(\-)*(\d+)\.(\d\d\d).*$/, '$1$2.$3'); //只能输入三个小数
    e.value = e.value * 1;
}

/**
 * 过滤特殊字符, 检查长度
 * @param e
 * @param maxLen
 */
function specialCharacterFilter(e, maxLen) {
    var strExp = /<|>|"|'/g; //敏感字符,
    if (strExp.test($(e).val())) {
        var res = $(e).val().match(strExp);
        layer.msg('备注信息检测到非法字符 <span style="color: #ED4A4B;">' + res[0] + ' </span>');
        return false;
    }
    if (maxLen != null && maxLen > 0 && $(e).val().length > maxLen) {
        layer.msg('备注信息允许保存字符数的最大值为' + maxLen);
        return false;
    }
    return true;
}

/**
 * 输入页数翻页输入框限制
 */
function jumpPageLimit(e, pageLimit) {
    e.value = e.value.replace(/[^\d]/g, '');
    if (isNaN(e.value) || !e.value || e.value == 0) e.value = 1; else e.value = parseInt(e.value);
    if (pageLimit != null && !isNaN(pageLimit) && e.value > pageLimit) e.value = pageLimit;
}

/**
 * 限制搜索框内只能输入字母和数字
 */
function numAndletterOnly(e) {
    e.value = e.value.replace(/[^\d\w]/g, '');
}

/**
 * 限制搜索框内只能输入和数字
 */
function numOnly(e) {
    e.value = e.value.replace(/[^\d]/g, '');
}

/**
 * 判断表单是否存在修改
 *      select类型要设置data-default-value="默认值"
 * @param forms
 * @returns {boolean}
 */
function formIsDirty(forms) {
    if (!forms || forms.length <= 0) return false;
    var isDirty = false;
    forms.each(function () {
        var form = this;
        for (var i = 0; i < form.elements.length; i++) {
            var element = form.elements[i];
            var type = element.type;
            if (type == "checkbox" || type == "radio") {
                if (element.checked != element.defaultChecked) {
                    isDirty = true;
                    break;
                }
            } else if (type == "hidden" || type == "password" || type == "text" || type == "textarea") {
                if (element.value != element.defaultValue) {
                    isDirty = true;
                    break;
                }
            } else if (type == "select-one" || type == "select-multiple") {
                var dValue = $(element).data("default-value")
                if (!!dValue && element.value != dValue) {
                    isDirty = true;
                    break;
                }
                /*for (var j = 0; j < element.options.length; j++) {
                    if (element.options[j].selected != element.options[j].defaultSelected) {
                        isDirty = true;
                        break;
                    }
                }*/
            }
        }
    });
    return isDirty;
}

/**
 * 判断是否有权限
 * @param loginInfo
 * @param permissionId
 */
function rightHasFunction(permissionId) {

    var isFunction = false;
    jQuery.ajax({
        type: "POST",
        url: "/app/account/hasAuth.json",
        dataType: "json",
        async: false,
        data: {permissionId: permissionId},
        success: function (Result) {

            if (Result.status == "OK") {

                return Result.data;
            } else {
                layer.msg(Result.message);
            }
        }
    });

}

function setFilePathAndName(filePathId, filePathValue, fileNameId, fileNameValue) {
    if (filePathValue != null && filePathValue != "") {
        $("#" + filePathId).val(filePathValue);
        $("#" + fileNameId).val(fileNameValue);
        $("[inputId='" + filePathId + "']").attr("href", filePathValue);
        $("[inputId='" + fileNameId + "']").attr("href", filePathValue);
        $("[inputId='" + fileNameId + "']").html(fileNameValue);
    } else {
        $("[inputId='" + filePathId + "']").attr("href", "javascript:void(0)");
        $("[inputId='" + fileNameId + "']").attr("href", "javascript:void(0)");
        $("[inputId='" + fileNameId + "']").html("");
    }
}

function setMultiFiles(filePathId, filePathValue, fileNameId, fileNameValue) {
    var fileStr = new Array();
    var fileNameStr = new Array();
    var html = "";
    if (filePathValue != null && filePathValue != "") {
        fileStr = filePathValue.split(",");
        fileNameStr = fileNameValue.split(",");
    }
    for (i = 0; i < fileStr.length; i++) {
        var filePath = fileStr[i];
        var fileName = fileNameStr[i];
        html += "<div class='s-img image-child' style='width:248px;margin-left:5px;margin-bottom:10px;text-align:center;display: inline-block;'>";
        html += "<span class='qy-cr-del imgDel'><i class='ico-del'></i></span>";
        html += "<a class='pz-pic file-download' alt='' src='' name='" + filePathId + "Temp' inputId='" + filePathId + "' href='" + filePath + "' style='display: none'></a>"
        html += "<a class='pz-pic file-download-name' alt='' src='' inputId='" + fileNameId + "' href='" + filePath + "'>" + fileName + "</a></div>";
    }
    return html;
}

function tips(params, oLayer) {
    oLayer = oLayer ? oLayer : layer;
    if (typeof(params) === 'string') {
        params = {success: false, description: params};
    }
    if (params.description) {
        var icon = params.success ? 1 : 2;
        oLayer.alert(params.description, {
            title: '友情提示',
            icon: icon,
            closeBtn: false
        });
    }
}

/*ajax请求返回JSON结果*/
function ajaxSubmitRespJSON(customSettings) {
    var defaults = {
        url: '',
        method: 'POST',
        data: '',
        contentType: 'application/x-www-form-urlencoded;charset=UTF-8',
        async: true,
        success: $.noop
    };
    var settings = $.extend(defaults, customSettings);
    if (settings.url) {
        $.ajax({
            type: settings.method,
            url: settings.url,
            data: settings.data,
            contentType: settings.contentType,
            async: settings.async,
            dataType: 'json',
            success: function (data) {
                tips(data);
                settings.success(data);
            },
            beforeSend: function () {
                layer.load(); //加载层
            },
            complete: function () {
                layer.closeAll('loading'); //关闭加载层
            }
        });
    }
}

/*multipart 提交表单*/
function ajaxMultiSubmitRespJSON(obj) {
    var defaults = {
        url: '',
        form: '',
        method: 'POST',
        success: $.noop
    };
    var ext = $.extend(defaults, obj);
    if (ext.form && ext.url) {
        $(ext.form).ajaxSubmit({
            url: ext.url,
            method: ext.method,
            success: function (data) {
                tips(data);
                ext.success(data);
            }
        });
    }
}

function confirmDoReq(params) {
    var defaults = {
        url: '',
        title: '友情提示',
        content: '确认删除？',
        btn: ['确定', '取消'],
        success: $.noop
    };
    var options = $.extend(defaults, params);
    var index = layer.confirm(options.content, {
        title: options.title,
        btn: options.btn
    }, function () {
        ajaxSubmitRespJSON(options);
    });
}

//去空格
function strValTrim(str, is_global) {
    var result;
    result = str.replace(/(^\s+)|(\s+$)/g, "");
    if (is_global.toLowerCase() == "g") {
        result = result.replace(/\s/g, "");
    }
    return result;
}

function dateFormatToStr(fmt, date) {
    var o = {
        "M+": date.getMonth() + 1,                      // 月份
        "d+": date.getDate(),                           // 日
        "h+": date.getHours(),                          // 小时
        "m+": date.getMinutes(),                        // 分
        "s+": date.getSeconds(),                        // 秒
        "q+": Math.floor((date.getMonth() + 3) / 3),    // 季度
        "S": date.getMilliseconds()                     // 毫秒
    };
    if (/(y+)/.test(fmt))
        fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt))
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}

function _get_url_param(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r) return decodeURI(r[2]);
    return null;
}

/**
 * 计算2个时间之间的间隔
 *  date1 >= date2
 * @param date1 日期靠后的时间
 * @param date2 日期靠前的时间
 */
function calcTimeInterval(date1, date2) {

    var intervalTimes = date1.getTime() - date2.getTime();
    if (intervalTimes > 0) {
        // 时间之间相差天数
        var days = Math.floor(intervalTimes / (24 * 3600 * 1000));
        // /计算天数后剩余的毫秒数
        var laveTimes = intervalTimes % (24 * 3600 * 1000);
        // 时间之间计算出小时数
        var hours = Math.floor(laveTimes / (3600 * 1000));
        // 计算小时数后剩余的毫秒数
        laveTimes = laveTimes % (3600 * 1000);
        // 时间之间相差分钟数
        var minutes = Math.floor(laveTimes / (60 * 1000));
        // 计算分钟数后剩余的毫秒数
        laveTimes = laveTimes % (60 * 1000);
        // 时间之间相差秒数
        var seconds = Math.round(laveTimes / 1000);
        return days + '天' + hours + '小时' + minutes + '分钟' + seconds + '秒';
    }
    return false;
}

/**
 * 计算对象有多少个属性
 * @param object
 * @returns {number}
 */
function ownPropertyCount(object) {
    var count = 0;
    for (var key in object) {
        if (object.hasOwnProperty(key)) {
            count++;
        }
    }
    return count;
}

/**
 * bootstrapTable 合并单元格
 * @param tableId 要合并单元格的table的id字符串
 * @param fieldList 要合并的字段对象
 *                 {字段:作为一组数据的数组}
 *                 {fieldX:[], fieldY:[field1, field2], ...}
 */
function mergeCells4bootstrapTable(tableId, fieldList) {
    var rows = $('#' + tableId).bootstrapTable('getData');
    var group = {};
    for (var i = 0; i < rows.length; i++) {
        var row = rows[i];
        for (var field in fieldList) {
            if (!group.hasOwnProperty(field)) {
                group[field] = {};
            }
            var k = '';
            var pks = fieldList[field];
            for (var l in pks) k += row[pks[l]] + '@';
            k += row[field];
            if (group[field].hasOwnProperty(k)) {
                group[field][k] += Number(1);
            } else {
                group[field][k] = Number(1);
            }
        }
    }
    for (var field in group) {
        var count = ownPropertyCount(group[field]);
        for (var i = 0; i < count; i++) {
            var index = 0;
            for (var k in group[field]) {
                var rowspan = group[field][k];
                $('#' + tableId).bootstrapTable('mergeCells', {
                    index: index,
                    field: field,
                    rowspan: rowspan
                });
                index += rowspan;
            }
        }
    }
}
