<?php if (!defined('__TYPECHO_ROOT_DIR__')) exit; ?>
        </div>
        </div>
        <?php if($this->is('index')): ?>
        <div class="pager" data-no-instant>
            <?php $this->pageLink('加载更多文章','next'); ?>
        </div>
        <?php endif; ?>
        <footer class="footer">
        <p>
            &copy; <?php echo date('Y'); ?> <a href="<?php $this->options->siteUrl(); ?>"><?php $this->options->title(); ?></a>
            <?php if($this->options->beian != ""): ?> . <a href="http://beian.miit.gov.cn"><?php $this->options->beian(); ?></a><?php endif;?>
        </p>
        <p>Theme <a href="https://github.com/WingLim/Typecho-Theme-AirCloud">AirCloud</a></p>
        </footer>
        <script async src="//busuanzi.ibruce.info/busuanzi/2.3/busuanzi.pure.mini.js"></script>
        <script src="<?php $this->options->themeUrl('index.js'); ?>"></script>
        <script src="//cdnjs.cloudflare.com/ajax/libs/highlight.js/9.15.8/highlight.min.js" data-no-instant></script>
        <script src="<?php $this->options->themeUrl('highlightjs-line-numbers.js'); ?>" data-no-instant></script>
        <script src="<?php $this->options->themeUrl('instantclick.min.js'); ?>" data-no-instant></script>
        <script data-no-instant>InstantClick.init();</script>
        <script>
        (function() {
            let blocks = document.querySelectorAll('pre code');
            for (let i = 0; i < blocks.length; i++) {
                hljs.highlightBlock(blocks[i]);
                hljs.lineNumbersBlock(blocks[i]);
            }
        })()
        </script>
    </body>
</html>
