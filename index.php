<?php
/**
 * 一个简洁轻量的博客主题
 *
 * @package AirCloud
 * @author WingLim
 * @version 1.0
 * @link https://limxw.com
 */
if (!defined('__TYPECHO_ROOT_DIR__')) exit;
 $this->need('h.php');
?>
<div class="post-preview-container" style="min-height: <%- config.per_page * 72 %>px">
    <% page.posts.each(function(post){ %>
    <div class="post-preview">
        <div class="post-time"><%= post.date.format(config.date_format) %></div>
        <div class="post-info">
            <a href="<%- config.root %><%- post.path %>">
                <h3>
                    <%- (post.title || "Untitled").replace(/[<>&"]/g,function(c){
                        return {'<':'&lt;','>':'&gt;','&':'&amp;','"':'&quot;'}[c];
                    }) %>
                </h3>
            </a>
            <p>
                <% if (post.tags.length){
                    console.log(post.tags)
                %>
                <span>/</span>
                <% post.tags.forEach(function(tag){ %>
                <a class="tag" href="<%= config.root %>tags/#<%= tag.name %>" title="<%= tag.name %>"><%= tag.name %></a>
                <span>/</span>
                <% }) %>
                <% } %>
            </p>
        </div>
    </div>
    <% }); %>
</div>
<ul class="pager">
    <% if (page.prev){ %>
    <li class="previous">
        <a href="<%- config.root %><%- page.prev_link %>">&larr; Newer Posts</a>
    </li>
    <% } %>
    <% if (page.next){ %>
    <li class="next">
        <a href="<%- config.root %><%- page.next_link %>">Older Posts &rarr;</a>
    </li>
    <% } %>
</ul>