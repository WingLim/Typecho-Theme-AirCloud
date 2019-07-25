<?php if (!defined('__TYPECHO_ROOT_DIR__')) exit; ?>
<div class="nav" id="nav">
    <div class="avatar-name">
        <div class="avatar <% if(config.avatar_style && config.avatar_style.radius) {%>radius<% } %>">
            <img src="<%= config['root'] %><%= config['sidebar-avatar'] %>" />
        </div>
        <div class="name">
            <i><?php $this->options->thename(); ?></i>
        </div>
    </div>
    <div class="contents" id="nav-content">
        <ul>
            <li <?php if($this->is('index')): ?> class="active" <?php endif; ?>>
                <a href="<?php $this->options->siteUrl(); ?>">
                    <i class="iconfont icon-shouye1"></i>
                    <span>主页</span>
                </a>
            </li>
            <li <?php if($this->is('page','archives')): ?> class="active" <?php endif; ?>>
                <a href="/archives.html">
                    <i class="iconfont icon-guidang2"></i>
                    <span>归档</span>
                </a>
            </li>
            <li <?php if($this->is('page','about')): ?> class="active" <?php endif; ?>>
                <a href="/about.html">
                    <i class="iconfont icon-guanyu2"></i>
                    <span>关于</span>
                </a>
            </li>
            <li>
                <a id="search">
                    <i class="iconfont icon-sousuo1"></i>
                    <span>搜索</span>
                </a>
            </li>
        </ul>
    </div>
</div>
