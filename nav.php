<?php if (!defined('__TYPECHO_ROOT_DIR__')) exit; ?>
<div class="nav" id="nav">
    <div class="avatar-name">
        <div class="avatar <?php if($this->options->avatar_style == 'circular'): ?> radius<?php endif; ?>">
            <img src="<?php $this->options->avatar_url(); ?>" />
        </div>
        <div class="name">
            <i><?php $this->options->thename != ''?$this->options->thename():Typecho_Widget::widget('Widget_Users_Admin')->screenName();?></i>
        </div>
    </div>
    <div class="contents" id="nav-content">
        <ul>
            <li <?php if($this->is('index')): ?> class="active" <?php endif; ?>>
                <a href="<?php $this->options->siteUrl(); ?>">
                    <i class="iconfont icon-home"></i>
                    <span>主页</span>
                </a>
            </li>
            <li <?php if($this->is('page','archives')): ?> class="active" <?php endif; ?>>
                <a href="/archives.html">
                    <i class="iconfont icon-archive"></i>
                    <span>归档</span>
                </a>
            </li>
            <li <?php if($this->is('page','about')): ?> class="active" <?php endif; ?>>
                <a href="/about.html">
                    <i class="iconfont icon-about"></i>
                    <span>关于</span>
                </a>
            </li>
            <li>
                <a id="search">
                    <i class="iconfont icon-search"></i>
                    <span>搜索</span>
                </a>
            </li>
        </ul>
    </div>
    <?php if($this->is('post')): ?>
        <?php getCatalog(); ?>
    <?php endif;?>
</div>
<div class="search-field" id="search-field">
    <div class="search-container">
        <div class="search-input">
            <input id="search-input" placeholder="搜索点什么吧..." />
            <span id="esc-search"><i class="iconfont icon-close"></i></span>
        </div>
        <div class="search-result-container" id="search-result-container">
        </div>
    </div>
</div>
<a id="Ty" href="#"></a>
