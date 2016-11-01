<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<%--
  Created by IntelliJ IDEA.
  User: denis.kalinin
  Date: 10/31/2016
  Time: 6:52 PM
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <meta charset="UTF-8">
    <title>Chatroom</title>


    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css"
          integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"
            integrity="sha384-Tc5IQib027qvyjSMfHjOMaLkfuWVxZxUPnCJA7l2mCWNIpG9mGCD8wGNIcPD7Txa"
            crossorigin="anonymous"></script>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js"></script>
    <spring:url value="/resources/js/registrationHandle.js" var="registationHandle"/>
    <script src="${registationHandle}"></script>

</head>
<body>

<div class="container">
    <div id="header" class="page-header">
        <h1>Chatroom</h1>
        <p>Welcome to chatroom!</p>
    </div>

    <div id="content">
        <button id="signIn" class="btn btn-default">Sign in</button>
        <button id="signUpButton" onclick="showRegistrationFormByJS()" class="btn btn-default">Sign up</button>
    </div>

    <div id="registrationForm"></div>


</div>

</body>
</html>
