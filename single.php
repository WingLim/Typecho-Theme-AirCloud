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
            <span class="attr">发布于：<span><?php echo timesince($this->created) ?>前</span></span>
            <span class="attr tag">标签：/
                <?php $this->tags('', true, '<a>none</a>'); ?>
            </span>
            <span class="attr">访问：<span id="busuanzi_value_page_pv"></span></span>
        </div>
        <?php endif; ?>
        <div class="post-content <?php if(!empty($this->options->theme_options) && in_array('indent', $this->options->theme_options)): ?>indent<?php endif; ?>">
            <?php $this->content(); ?>
            <br />
        </div>
        <?php $this->need('comment.php'); ?>
    </div>
</div>
<?php $this->need('footer.php'); ?>
