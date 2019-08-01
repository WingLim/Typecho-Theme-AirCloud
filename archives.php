<?php 
/**
* 文章归档
*
* @package custom
*/
if (!defined('__TYPECHO_ROOT_DIR__')) exit;
$this->need('header.php');
?>

<!-- 归档列表 -->
<div class="index-middle">
    <div class="archives-container">
        <?php
        $this->widget('Widget_Contents_Post_Recent', 'pageSize=10000')->to($archives);   
        $year=0; $mon=0; $i=0; $j=0;   
        $output = '';   
        while($archives->next()):   
            $year_tmp = date('Y',$archives->created);   
            $mon_tmp = date('m',$archives->created);   
            $y=$year; $m=$mon;   
            if ($mon != $mon_tmp && $mon > 0) $output .= '</ul></li>';   
            if ($year != $year_tmp && $year > 0) $output .= '</ul></div>';   
            if ($year != $year_tmp) {   
                $year = $year_tmp;   
                $output .= '
                <div class="one-tag-list">
                    <span class="fa fa-calendar-times-o listing-seperator" id="'. $year .'">
                        <span class="tag-text">'. $year .'</span>
                    </span><ul>';   
            }   
            $output .= '<li><span>'.date('m-d',$archives->created).'</span><a href="'.$archives->permalink.'"><span>'. $archives->title .'</span></a></li>'; //输出文章日期和标题   
        endwhile;   
        $output .= '</ul></li></ul>';
        echo $output;
        ?>
    </div>
</div>
<?php $this->need('footer.php'); ?>
