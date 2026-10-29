<?php
/**
 * Template Name: Sysmax - Tela Cheia (Canvas)
 * Template Post Type: page
 */
?>
<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
    <meta charset="<?php bloginfo('charset'); ?>">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?php wp_title('|', true, 'right'); bloginfo('name'); ?></title>
    <link rel="icon" type="image/png" href="https://apidata.sysmax.com.br/id-visual-chatwoot/Blue%20(2).png" />
    <?php wp_head(); ?>
    <style>
        body, html { margin: 0; padding: 0; background: #0B132B; overflow-x: hidden; }
        #wpadminbar { display: none !important; }
    </style>
</head>
<body <?php body_class('bg-[#0B132B] text-slate-100'); ?>>
    <?php echo do_shortcode('[sysmax_site]'); ?>
    <?php wp_footer(); ?>
</body>
</html>
