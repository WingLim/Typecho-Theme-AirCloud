<?php
if (!defined('__TYPECHO_ROOT_DIR__')) exit;
function themeConfig($form) {
	$thename = new Typecho_Widget_Helper_Form_Element_Text('thename', NULL, NULL, _t('首页用户名自定义'), _t('默认管理员昵称'));
    $form->addInput($thename);
    
    $avatar_url = new Typecho_Widget_Helper_Form_Element_Text('avatar_url', NULL, NULL, _t('头像地址'), NULL);
    $form->addInput($avatar_url);

    $beian = new Typecho_Widget_Helper_Form_Element_Text('beian', NULL, NULL, _t('备案号'), NULL);
    $form->addInput($beian);

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

function themeInit($archive) {
    if ($archive->is('single')) {
        $archive->content = createCatalog($archive->content);
    }
}

function createCatalog($obj) {    //为文章标题添加锚点
    global $catalog;
    $catalog = array();
    $obj = preg_replace_callback('/<h([1-6])(.*?)>(.*?)<\/h\1>/i', function($obj) {
        global $catalog;
        $catalog[] = array('text' => trim(strip_tags($obj[3])), 'depth' => $obj[1]);
        return '<h'.$obj[1].$obj[2].' id="'.$obj[3].'"><a name="'.$obj[3].'"></a>'.$obj[3].'</h'.$obj[1].'>';
    }, $obj);
    return $obj;
}

function getCatalog() {    //输出文章目录容器
    global $catalog;
    $index = '';
    if ($catalog) {
        $index = '<ol class="toc">'."\n";
        $prev_depth = '';
        $to_depth = 0;
        foreach($catalog as $catalog_item) {
            $catalog_depth = $catalog_item['depth'];
            if ($prev_depth) {
                if ($catalog_depth == $prev_depth) {
                    $index .= '</li>'."\n";
                } elseif ($catalog_depth > $prev_depth) {
                    $to_depth++;
                    $index .= '<ol class="toc-child">'."\n";
                } else {
                    $to_depth2 = ($to_depth > ($prev_depth - $catalog_depth)) ? ($prev_depth - $catalog_depth) : $to_depth;
                    if ($to_depth2) {
                        for ($i=0; $i<$to_depth2; $i++) {
                            $index .= '</li>'."\n".'</ol>'."\n";
                            $to_depth--;
                        }
                    }
                    $index .= '</li>';
                }
            }
            $index .= '<li class="toc-item"><a class="toc-link" href="#'.$catalog_item['text'].'">'.'<span class="toc-text">'.$catalog_item['text'].'</span>'.'</a>';
            $prev_depth = $catalog_item['depth'];
        }
        for ($i=0; $i<=$to_depth; $i++) {
            $index .= '</li>'."\n".'</ol>'."\n";
        }
    $index = '<div id="toc" class="toc-article">'."\n".$index.'</div>'."\n";
    }
    echo $index;
}

function getCommentAt($coid){
	$db   = Typecho_Db::get();
	$prow = $db->fetchRow($db->select('parent')
		->from('table.comments')
		->where('coid = ? AND status = ?', $coid, 'approved'));
	$parent = $prow['parent'];
	if ($parent != "0") {
		$arow = $db->fetchRow($db->select('author','status')
			->from('table.comments')
			->where('coid = ?', $parent));
		$author = $arow['author'];
		$status = $arow['status'];
		if($author){
			if($status=='approved'){
				$href   = ' <a class="at" uid="'.$parent.'" onclick="scrollt(\'comment-'.$parent.'\'); return false;">@'.$author.'</a>';
			}else if($status=='waiting'){
				$href   = '<a href="javascript:void(0)">评论审核中···</a>';
			}
		}
		echo $href;
	} else {
		echo "";
	}
}

function timesince($older_date,$comment_date = false) {
	$chunks = array(
		array(86400 , '天'),
		array(3600 , '小时'),
		array(60 , '分钟'),
		array(1 , '秒'),
	);
	$newer_date = time();
	$since = abs($newer_date - $older_date);

	for ($i = 0, $j = count($chunks); $i < $j; $i++){
		$seconds = $chunks[$i][0];
		$name = $chunks[$i][1];
		if (($count = floor($since / $seconds)) != 0) break;
	}
	$output = $count.$name;

	return $output;
}
?>