<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="google-site-verification" content="xBT4GhYoi5qRD5tr338pgPM5OWHHIDR6mNg1a3euekI" />
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="<%= config.description %>">
    <meta name="keyword"  content="<%= config.keyword %>">
    <link rel="shortcut icon" href="<%= config.root %>img/favicon.ico">

    <title>
        <% if (page.title) { %>
        <%= page.title + ' - ' + config.SEOTitle %>
        <% } else{%>
        <%= config.SEOTitle %>
        <% } %>
    </title>

    <!-- Custom CSS -->
    <%- css('css/aircloud.css') %>
    <%- css('css/gitment.css') %>
    <!--<link rel="stylesheet" href="https://imsun.github.io/gitment/style/default.css">-->
    <link href="//at.alicdn.com/t/font_620856_pl6z7sid89qkt9.css" rel="stylesheet" type="text/css">
    <!-- ga & ba script hoook -->
    <script></script>
</head>
