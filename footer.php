<?php if (!defined('__TYPECHO_ROOT_DIR__')) exit; ?>
        </div>
        </div>
        <?php if($this->is('index')): ?>
        <div class="pager" id="load_more">
            <?php $this->pageLink('加载更多文章','next'); ?>
        </div>
        <?php endif; ?>
        <footer class="footer">
        <p>&copy; <?php echo date('Y'); ?> <a href="<?php $this->options->siteUrl(); ?>"><?php $this->options->title(); ?></a></p>
            <p>Power By <a href="https://typecho.org/" target="_blank">Typecho</a>  Theme <a href="https://github.com/aircloud/hexo-theme-aircloud">AirCloud</a></p>
        </footer>
        <script async src="//busuanzi.ibruce.info/busuanzi/2.3/busuanzi.pure.mini.js"></script>
        <script src="<?php $this->options->themeUrl('index.js'); ?>"></script>
    </body>
</html>
