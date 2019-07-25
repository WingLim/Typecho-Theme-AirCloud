<?php if (!defined('__TYPECHO_ROOT_DIR__')) exit; 
$this->need('header.php');
?>

    <div class="index-middle">
        <div class="post-container">
            <div class="post-title">
                <?php $this->title() ?>
            </div>
            <?php if($this->is('post')): ?>
            <div class="post-meta">
                <span class="attr">发布于：<span><?php $this->date() ?></span></span>
                <span class="attr tag">标签：/
                    <?php $this->tags('', true, 'none'); ?>
                </span>
                <span class="attr">访问：<span id="busuanzi_value_page_pv"></span></span>
            </div>
            <?php endif;?>
            <div class="post-content<?php if($this->options->indent == 'disable'): ?> no-indent<?php endif; ?>">
                <?php $this->content(); ?>
                <br />
                <div id="comment-container">
                </div>
                <div id="disqus_thread"></div>

                <div id="lv-container">
                </div>

            </div>
        </div>
    </div>
</div>
<?php $this->need('footer.php'); ?>
