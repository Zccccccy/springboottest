<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="renderer" content="webkit">
    <title>用户列表</title>
    <meta name="keywords" content="">
    <meta name="description" content="">

    <link href="../static/css/bootstrap.min.css" rel="stylesheet">
    <link href="../static/css/font-awesome.css" rel="stylesheet">
    <link href="../static/css/plugins/bootstrap-table/bootstrap-table.min.css" rel="stylesheet">
    <link href="../static/css/plugins/bootstrap-select/bootstrap-select.min.css" rel="stylesheet">
    <link href="../static/css/animate.css" rel="stylesheet">
    <link href="../static/css/style.css?v=4.1.0" rel="stylesheet">
    <link href="../static/css/frame/frame.css" rel="stylesheet">
    <link href="../static/scripts/plugins/select2/css/select2.min.css" rel="stylesheet">

</head>
<body>

<div class="frame-4-content">
    <div class="ibox-content">
        <table id="table_list" class="table table-hover"></table>
    </div>
</div>
<!--jquery-->
<script src="../static/scripts/jquery-2.1.1.min.js"></script>
<script src="../static/scripts/jquery.form.js"></script>
<!--momentjs-->
<script src="../static/scripts/plugins/fullcalendar/moment.min.js"></script>
<!--bootstrap-->
<script src="../static/scripts/plugins/bootstrap/js/bootstrap.min.js"></script>
<script src="../static/scripts/plugins/bootstrap-table/bootstrap-table.min.js"></script>
<script src="../static/scripts/plugins/bootstrap-table/bootstrap-table-editable.min.js"></script>
<script src="../static/scripts/plugins/bootstrap3-editable/js/bootstrap-editable.min.js"></script>
<script src="../static/scripts/plugins/bootstrap-table/bootstrap-table-mobile.min.js"></script>
<script src="../static/scripts/plugins/bootstrap-table/locale/bootstrap-table-zh-CN.js"></script>
<script src="../static/scripts/plugins/bootstrap-select/bootstrap-select.min.js"></script>

<script src="../static/scripts/plugins/bootstrap-table/extensions/export/bootstrap-table-export.js"></script>
<script src="../static/scripts/plugins/tableExport/tableExport.js"></script>
<script>
    $(document).ready(function () {
        $('.selectpicker').selectpicker({//初始化
            size: 8
        });

        $("#table_list").bootstrapTable({

            method: "POST",
            contentType: "application/x-www-form-urlencoded",
            url: "/user/queryAllUser1",
            striped: true,
            pagination: true,
            pageSize: 10,
            pageNumber: 1,
            pageList: [10, 20, 25, 50, 100, 200, 'ALL'],
            sidePagination: "server",
            toolbar: '#toolbar',


            queryParams: function (params) { // 请求服务器数据时发送的参数，可以在这里添加额外的查询参数，返回false则终止请求
                return {
                    pageSize: params.limit, // 每页要显示的数据条数
                    pageNum: (params.offset/params.limit)+1, // 每页显示数据的开始行号
                    sort: params.sort, // 要排序的字段
                    sortOrder: params.order,
                    id:$("#id").val(),
                    username:$("#username").val(),
                    age:$("#age").val()
                    // companyCode:$("#companyCode").val(),
                    // status:$("#status").val()
                };
            },
            responseHandler: function (res) {
                return {
                    total: res.total,
                    rows: res.list
                };
            },
            search: false,
            detailView: false,
            columns: [
                {
                    title: "用户id",
                    field: "id"
                }, {
                    title: "用户名称",
                    field: "username"
                },{
                    title: "年龄",
                    field: "age"
                }],
            onLoadSuccess:function(data){
                // resetTableCSS();
            }
        });

        $('#table_list').bootstrapTable('hideColumn', 'memberId');
    });
</script>

</body>

</html>
