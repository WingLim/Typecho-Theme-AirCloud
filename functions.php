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
}
?>