<?php
/**
 * @package WordPress
 * @subpackage <%= themeName %>
 * @since <%= themeName %> 1.0
 *
 * A unique identifier is defined to store the options in the database and reference them from the theme.
 * By default it uses the theme name, in lowercase and without spaces, but this can be changed if needed.
 * If the identifier changes, it'll appear as if the options have been reset.
 */

function optionsframework_option_name() {

	// This gets the theme name from the stylesheet
	$themename = get_option( 'stylesheet' );
	$themename = preg_replace("/\W/", "_", strtolower($themename) );

	$optionsframework_settings = get_option( 'optionsframework' );
	$optionsframework_settings['id'] = $themename;
	update_option( 'optionsframework', $optionsframework_settings );
}

/**
 * Defines an array of options that will be used to generate the settings page and be saved in the database.
 * When creating the 'id' fields, make sure to use all lowercase and no spaces.
 *
 * If you are making your theme translatable, you should replace '<%= themeNameSpace %>'
 * with the actual text domain for your theme.  Read more:
 * http://codex.wordpress.org/Function_Reference/load_theme_textdomain
 */

function optionsframework_options() {

	// If using image radio buttons, define a directory path
	$imagepath =  get_template_directory_uri() . '/static/images/';


	// Pull all the categories into an array
	$options_categories = array();
	$options_categories_obj = get_categories();
	foreach ($options_categories_obj as $category) {
		$options_categories[$category->cat_ID] = $category->cat_name;
	}
	
	// Pull all tags into an array
	$options_tags = array();
	$options_tags_obj = get_tags();
	foreach ( $options_tags_obj as $tag ) {
		$options_tags[$tag->term_id] = $tag->name;
	}

	// Pull all the pages into an array
	$options_pages = array();
	$options_pages_obj = get_pages('sort_column=post_parent,menu_order');
	$options_pages[''] = 'Select a page:';
	foreach ($options_pages_obj as $page) {
		$options_pages[$page->ID] = $page->post_title;
	}

	$options = array();

	$options[] = array(
		'name' => __('Header Meta', '<%= themeNameSpace %>'),
		'type' => 'heading');

// Standard Meta
	$options[] = array(
		'name' => __('Head ID', '<%= themeNameSpace %>'),
		'desc' => __("", '<%= themeNameSpace %>'),
		'id' => 'meta_headid',
		'std' => '<%= themeNameSpace %>',
		'type' => 'text');
	$options[] = array(
		'name' => __('Google Webmasters', '<%= themeNameSpace %>'),
		'desc' => __("Speaking of Google, don't forget to set your site up: <a href='http://google.com/webmasters' target='_blank'>http://google.com/webmasters</a>", '<%= themeNameSpace %>'),
		'id' => 'meta_google',
		'std' => '',
		'type' => 'text');
	$options[] = array(
		'name' => __('Author Name', '<%= themeNameSpace %>'),
		'desc' => __('Populates meta author tag.', '<%= themeNameSpace %>'),
		'id' => 'meta_author',
		'std' => '',
		'type' => 'text');
	$options[] = array(
		'name' => __('Mobile Viewport', '<%= themeNameSpace %>'),
		'desc' => __('Uncomment to use; use thoughtfully!', '<%= themeNameSpace %>'),
		'id' => 'meta_viewport',
		'std' => 'width=device-width, initial-scale=1.0',
		'type' => 'text');

// Icons
	$options[] = array(
		'name' => __('Site Favicon', '<%= themeNameSpace %>'),
		'desc' => __('', '<%= themeNameSpace %>'),
		'id' => 'head_favicon',
		'type' => 'upload');
	$options[] = array(
		'name' => __('Apple Touch Icon', '<%= themeNameSpace %>'),
		'desc' => __('', '<%= themeNameSpace %>'),
		'id' => 'head_apple_touch_icon',
		'type' => 'upload');

// App: Windows 8
	$options[] = array(
		'name' => __('App: Windows 8', '<%= themeNameSpace %>'),
		'desc' => __('Application Name', '<%= themeNameSpace %>'),
		'id' => 'meta_app_win_name',
		'std' => '',
		'type' => 'text');
	$options[] = array(
		'name' => __('', '<%= themeNameSpace %>'),
		'desc' => __('Tile Color', '<%= themeNameSpace %>'),
		'id' => 'meta_app_win_color',
		'std' => '',
		'type' => 'color');
	$options[] = array(
		'name' => __('', '<%= themeNameSpace %>'),
		'desc' => __('Tile Image', '<%= themeNameSpace %>'),
		'id' => 'meta_app_win_image',
		'std' => '',
		'type' => 'upload');

// App: Twitter
	$options[] = array(
		'name' => __('App: Twitter Card', '<%= themeNameSpace %>'),
		'desc' => __('twitter:card (summary, photo, gallery, product, app, player)', '<%= themeNameSpace %>'),
		'id' => 'meta_app_twt_card',
		'std' => '',
		'type' => 'text');
	$options[] = array(
		'name' => __('', '<%= themeNameSpace %>'),
		'desc' => __('twitter:site (@username of website)', '<%= themeNameSpace %>'),
		'id' => 'meta_app_twt_site',
		'std' => '',
		'type' => 'text');
	$options[] = array(
		'name' => __('', '<%= themeNameSpace %>'),
		'desc' => __("twitter:title (the user's Twitter ID)", '<%= themeNameSpace %>'),
		'id' => 'meta_app_twt_title',
		'std' => '',
		'type' => 'text');
	$options[] = array(
		'name' => __('', '<%= themeNameSpace %>'),
		'desc' => __('twitter:description (maximum 200 characters)', '<%= themeNameSpace %>'),
		'id' => 'meta_app_twt_description',
		'std' => '',
		'type' => 'textarea');
	$options[] = array(
		'name' => __('', '<%= themeNameSpace %>'),
		'desc' => __('twitter:url (url for the content)', '<%= themeNameSpace %>'),
		'id' => 'meta_app_twt_url',
		'std' => '',
		'type' => 'text');

// App: Facebook
	$options[] = array(
		'name' => __('App: Facebook', '<%= themeNameSpace %>'),
		'desc' => __('og:title', '<%= themeNameSpace %>'),
		'id' => 'meta_app_fb_title',
		'std' => '',
		'type' => 'text');
	$options[] = array(
		'name' => __('', '<%= themeNameSpace %>'),
		'desc' => __('og:description', '<%= themeNameSpace %>'),
		'id' => 'meta_app_fb_description',
		'std' => '',
		'type' => 'textarea');
	$options[] = array(
		'name' => __('', '<%= themeNameSpace %>'),
		'desc' => __('og:url', '<%= themeNameSpace %>'),
		'id' => 'meta_app_fb_url',
		'std' => '',
		'type' => 'text');
	$options[] = array(
		'name' => __('', '<%= themeNameSpace %>'),
		'desc' => __('og:image', '<%= themeNameSpace %>'),
		'id' => 'meta_app_fb_image',
		'std' => '',
		'type' => 'upload');

	return $options;

	/* FIELD OPTIONS */
	/*
	// Test data
	$test_array = array(
		'one' => __('One', 'options_check'),
		'two' => __('Two', 'options_check'),
		'three' => __('Three', 'options_check'),
		'four' => __('Four', 'options_check'),
		'five' => __('Five', 'options_check')
	);

	// Multicheck Array
	$multicheck_array = array(
		'one' => __('French Toast', 'options_check'),
		'two' => __('Pancake', 'options_check'),
		'three' => __('Omelette', 'options_check'),
		'four' => __('Crepe', 'options_check'),
		'five' => __('Waffle', 'options_check')
	);

	// Multicheck Defaults
	$multicheck_defaults = array(
		'one' => '1',
		'five' => '1'
	);

	// Background Defaults
	$background_defaults = array(
		'color' => '',
		'image' => '',
		'repeat' => 'repeat',
		'position' => 'top center',
		'attachment'=>'scroll' );

	// Typography Defaults
	$typography_defaults = array(
		'size' => '15px',
		'face' => 'georgia',
		'style' => 'bold',
		'color' => '#bada55' );

	// Typography Options
	$typography_options = array(
		'sizes' => array( '6','12','14','16','20' ),
		'faces' => array( 'Helvetica Neue' => 'Helvetica Neue','Arial' => 'Arial' ),
		'styles' => array( 'normal' => 'Normal','bold' => 'Bold' ),
		'color' => false
	);

	// Pull all the categories into an array
	$options_categories = array();
	$options_categories_obj = get_categories();
	foreach ($options_categories_obj as $category) {
		$options_categories[$category->cat_ID] = $category->cat_name;
	}

	// Pull all tags into an array
	$options_tags = array();
	$options_tags_obj = get_tags();
	foreach ( $options_tags_obj as $tag ) {
		$options_tags[$tag->term_id] = $tag->name;
	}

	// Pull all the pages into an array
	$options_pages = array();
	$options_pages_obj = get_pages('sort_column=post_parent,menu_order');
	$options_pages[''] = 'Select a page:';
	foreach ($options_pages_obj as $page) {
		$options_pages[$page->ID] = $page->post_title;
	}

	

	$options = array();

	$options[] = array(
		'name' => __('Basic Settings', 'options_check'),
		'type' => 'heading');

	$options[] = array(
		'name' => __('Input Text Mini', 'options_check'),
		'desc' => __('A mini text input field.', 'options_check'),
		'id' => 'example_text_mini',
		'std' => 'Default',
		'class' => 'mini',
		'type' => 'text');

	$options[] = array(
		'name' => __('Input Text', 'options_check'),
		'desc' => __('A text input field.', 'options_check'),
		'id' => 'example_text',
		'std' => 'Default Value',
		'type' => 'text');

	$options[] = array(
		'name' => __('Textarea', 'options_check'),
		'desc' => __('Textarea description.', 'options_check'),
		'id' => 'example_textarea',
		'std' => 'Default Text',
		'type' => 'textarea');

	$options[] = array(
		'name' => __('Input Select Small', 'options_check'),
		'desc' => __('Small Select Box.', 'options_check'),
		'id' => 'example_select',
		'std' => 'three',
		'type' => 'select',
		'class' => 'mini', //mini, tiny, small
		'options' => $test_array);

	$options[] = array(
		'name' => __('Input Select Wide', 'options_check'),
		'desc' => __('A wider select box.', 'options_check'),
		'id' => 'example_select_wide',
		'std' => 'two',
		'type' => 'select',
		'options' => $test_array);

	$options[] = array(
		'name' => __('Select a Category', 'options_check'),
		'desc' => __('Passed an array of categories with cat_ID and cat_name', 'options_check'),
		'id' => 'example_select_categories',
		'type' => 'select',
		'options' => $options_categories);

	if ( $options_tags ) {
	$options[] = array(
		'name' => __('Select a Tag', 'options_check'),
		'desc' => __('Passed an array of tags with term_id and term_name', 'options_check'),
		'id' => 'example_select_tags',
		'type' => 'select',
		'options' => $options_tags);
	}

	$options[] = array(
		'name' => __('Select a Page', 'options_check'),
		'desc' => __('Passed an array of pages with ID and post_title', 'options_check'),
		'id' => 'example_select_pages',
		'type' => 'select',
		'options' => $options_pages);

	$options[] = array(
		'name' => __('Input Radio (one)', 'options_check'),
		'desc' => __('Radio select with default options "one".', 'options_check'),
		'id' => 'example_radio',
		'std' => 'one',
		'type' => 'radio',
		'options' => $test_array);

	$options[] = array(
		'name' => __('Example Info', 'options_check'),
		'desc' => __('This is just some example information you can put in the panel.', 'options_check'),
		'type' => 'info');

	$options[] = array(
		'name' => __('Input Checkbox', 'options_check'),
		'desc' => __('Example checkbox, defaults to true.', 'options_check'),
		'id' => 'example_checkbox',
		'std' => '1',
		'type' => 'checkbox');

	$options[] = array(
		'name' => __('Advanced Settings', 'options_check'),
		'type' => 'heading');

	$options[] = array(
		'name' => __('Check to Show a Hidden Text Input', 'options_check'),
		'desc' => __('Click here and see what happens.', 'options_check'),
		'id' => 'example_showhidden',
		'type' => 'checkbox');

	$options[] = array(
		'name' => __('Hidden Text Input', 'options_check'),
		'desc' => __('This option is hidden unless activated by a checkbox click.', 'options_check'),
		'id' => 'example_text_hidden',
		'std' => 'Hello',
		'class' => 'hidden',
		'type' => 'text');

	$options[] = array(
		'name' => __('Uploader Test', 'options_check'),
		'desc' => __('This creates a full size uploader that previews the image.', 'options_check'),
		'id' => 'example_uploader',
		'type' => 'upload');

	$options[] = array(
		'name' => "Example Image Selector",
		'desc' => "Images for layout.",
		'id' => "example_images",
		'std' => "2c-l-fixed",
		'type' => "images",
		'options' => array(
			'1col-fixed' => $imagepath . '1col.png',
			'2c-l-fixed' => $imagepath . '2cl.png',
			'2c-r-fixed' => $imagepath . '2cr.png')
	);

	$options[] = array(
		'name' =>  __('Example Background', 'options_check'),
		'desc' => __('Change the background CSS.', 'options_check'),
		'id' => 'example_background',
		'std' => $background_defaults,
		'type' => 'background' );

	$options[] = array(
		'name' => __('Multicheck', 'options_check'),
		'desc' => __('Multicheck description.', 'options_check'),
		'id' => 'example_multicheck',
		'std' => $multicheck_defaults, // These items get checked by default
		'type' => 'multicheck',
		'options' => $multicheck_array);

	$options[] = array(
		'name' => __('Colorpicker', 'options_check'),
		'desc' => __('No color selected by default.', 'options_check'),
		'id' => 'example_colorpicker',
		'std' => '',
		'type' => 'color' );

	$options[] = array( 'name' => __('Typography', 'options_check'),
		'desc' => __('Example typography.', 'options_check'),
		'id' => "example_typography",
		'std' => $typography_defaults,
		'type' => 'typography' );

	$options[] = array(
		'name' => __('Custom Typography', 'options_check'),
		'desc' => __('Custom typography options.', 'options_check'),
		'id' => "custom_typography",
		'std' => $typography_defaults,
		'type' => 'typography',
		'options' => $typography_options );

	$options[] = array(
		'name' => __('Text Editor', 'options_check'),
		'type' => 'heading' );


	$wp_editor_settings = array(
		'wpautop' => true, // Default
		'textarea_rows' => 5,
		'tinymce' => array( 'plugins' => 'wordpress' )
	);

	$options[] = array(
		'name' => __('Default Text Editor', 'options_check'),
		'desc' => sprintf( __( 'You can also pass settings to the editor.  Read more about wp_editor in <a href="%1$s" target="_blank">the WordPress codex</a>', 'options_check' ), 'http://codex.wordpress.org/Function_Reference/wp_editor' ),
		'id' => 'example_editor',
		'type' => 'editor',
		'settings' => $wp_editor_settings );

	$wp_editor_settings = array(
		'wpautop' => true, // Default
		'textarea_rows' => 5,
		'media_buttons' => true
	);

	$options[] = array(
		'name' => __('Additional Text Editor', 'options_check'),
		'desc' => sprintf( __( 'This editor includes media button.', 'options_check' ), 'http://codex.wordpress.org/Function_Reference/wp_editor' ),
		'id' => 'example_editor_media',
		'type' => 'editor',
		'settings' => $wp_editor_settings );


	return $options;

	*/

}