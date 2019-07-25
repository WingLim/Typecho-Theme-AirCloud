<?php
if (!defined('__TYPECHO_ROOT_DIR__')) exit;
function themeConfig($form) {
	$thename = new Typecho_Widget_Helper_Form_Element_Text('thename', NULL, NULL, _t('NAV用户名'), _t('Lim'));
    $form->addInput($thename);
    
    $avatar_url = new Typecho_Widget_Helper_Form_Element_Text('avatar_url', NULL, NULL, _t('头像地址'), NULL);
    $form->addInput($avatar_url);

    $avatar_style = new Typecho_Widget_Helper_Form_Element_Radio('avatar_style',
        array('square' => _t('方形'),
            'circular' => _t('圆形'),
        ),
        'square', _t('头像显示模式'), _t('默认方形'));
    $form->addInput($avatar_style);

    $indent = new Typecho_Widget_Helper_Form_Element_Radio('indent',
        array('able' => _t('启用'),
            'disable' => _t('关闭'),
        ),
        'able', _t('首行缩进'), _t('文章页面首行缩进两个汉字'));
    $form->addInput($indent);
}
?>