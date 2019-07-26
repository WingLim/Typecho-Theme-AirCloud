<?php if (!defined('__TYPECHO_ROOT_DIR__')) exit; ?>
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="description" content="<?php $this->options->description() ?>">
        <meta name="keyword"  content="<?php $this->options->keywords() ?>">
        <!--<link rel="shortcut icon" href="<%= config.root %>img/favicon.ico">-->

        <title>
        <?php $this->archiveTitle(array(
                'category'  =>  _t('分类 %s 下的文章'),
                'search'    =>  _t('包含关键字 %s 的文章'),
                'tag'       =>  _t('标签 %s 下的文章'),
                'author'    =>  _t('%s 发布的文章')
            ), '', ' - '); ?><?php $this->options->title(); ?>
        </title>

        <!-- Custom CSS -->
        <link rel="stylesheet" href="<?php $this->options->themeUrl('aircloud.css'); ?>">
        <!--<link rel="stylesheet" href="https://imsun.github.io/gitment/style/default.css">-->
        <link href="//at.alicdn.com/t/font_620856_pl6z7sid89qkt9.css" rel="stylesheet" type="text/css">
        <!-- ga & ba script hoook -->
        <script></script>
    </head>
    <body>
        <div class="site-nav-toggle" id="site-nav-toggle">
        <button>
            <span class="btn-bar"></span>
            <span class="btn-bar"></span>
            <span class="btn-bar"></span>
        </button>
        </div>
        <div class="index-about">
            <i> <?php $this->options->description() ?> </i>
        </div>
        <div class="index-container">
            <div class="index-left">
                <?php $this->need('nav.php') ?>
                <div class="index-about-mobile">
                    <i> <?php $this->options->description() ?> </i>
                </div>
            </div>
