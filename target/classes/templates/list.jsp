<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>用户信息</title>
</head>
<body>
    <form action="" method="post">
        <input type="hidden" name="_method" value="delete"/>
    </form>

    <c:if test=" ${ empty list}"><h2 align="center">没有用户信息</h2></h2></c:if>
    <c:if test="${!empty list }">
        <h2 align="center">用户信息</h2>
        <table border="1" cellpadding="10" align="center" cellspacing="0">
            <thead>
                <th>ID</th>
                <th>用户名</th>
                <th>年龄</th>
                <th>修改</th>
                <th>删除</th>
            </thead>
            <tbody>
            <c:forEach items="${list}" var="list">
                <tr>
                    <td>${list.id}</td>
                    <td>${list.username}</td>
                    <td>${list.age}</td>
                    <td><a href="${pageContext.request.contextPath}/update/${list.id}">修改</a> </td>
                    <td><a href="${pageContext.request.contextPath}/user/delete_id/${liat.id}" class="del"</td>
                </tr>
            </c:forEach>
            </tbody>
        </table>
    </c:if>
</body>