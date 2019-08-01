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
    <?php if($this->is('post')): ?>
        <?php getCatalog(); ?>
    <?php endif;?>
</div>
<div class="search-field" id="search-field">
    <div class="search-container">
        <div class="search-input">
            <input id="search-input" placeholder="搜索点什么吧..." />
            <span id="esc-search"><svg t="1564660251666" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2096" width="36" height="36" data-spm-anchor-id="a313x.7781069.0.i15"><path d="M514.496 738.944C389.392 738.944 288 637.536 288 512.448c0-125.104 101.392-226.512 226.496-226.512 125.088 0 226.496 101.408 226.496 226.512C740.992 637.536 639.6 738.944 514.496 738.944zM620.72 434.624c6.16-6.16 4.336-18-4.064-26.4l-0.96-0.944c-8.4-8.4-20.224-10.24-26.384-4.064l-75.344 75.36-80.816-80.832c-6.256-6.256-18.24-4.4-26.752 4.128l-0.96 0.96c-8.528 8.512-10.352 20.496-4.112 26.72l80.816 80.832-78.864 78.848c-6.176 6.192-4.352 17.984 4.064 26.4l0.944 0.944c8.4 8.4 20.224 10.256 26.384 4.064l78.88-78.88 76.32 76.336c6.256 6.24 18.224 4.416 26.736-4.112l0.976-0.976c8.528-8.496 10.368-20.48 4.112-26.736l-76.32-76.336L620.72 434.624z" p-id="2097" data-spm-anchor-id="a313x.7781069.0.i13"></path></svg></span>
        </div>
        <div class="search-result-container" id="search-result-container">
        </div>
    </div>
</div>
<a id="Ty" href="#"></a>
