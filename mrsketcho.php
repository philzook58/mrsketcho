<?php
/*
Plugin Name: mrsketcho
Plugin URI: http://www.philipzucker.com
Description: A Simple Fast Inline Sketcher
Version: 0.1
Author: Philip Zucker
Author URI: http://www.philipzucker.com
*/

if ( ! defined( 'ABSPATH' ) )
	die( "Can't load this file directly" );

class MyGallery
{
	function __construct() {
		add_action( 'admin_init', array( $this, 'action_admin_init' ) );
		error_log("At leSTMADE THIS");
	}

	function action_admin_init() {
		// only hook up these filters if we're in the admin panel, and the current user has permission
		// to edit posts and pages
		if ( current_user_can( 'edit_posts' ) && current_user_can( 'edit_pages' ) ) {
			add_filter( 'mce_buttons', array( $this, 'filter_mce_button' ) );
			add_filter( 'mce_external_plugins', array( $this, 'filter_mce_plugin' ) );
		}
	}

	function filter_mce_button( $buttons ) {
		// add a separation before our button, here our button's id is "mygallery_button"
		array_push( $buttons, '|', 'mygallery_button' );
		return $buttons;
	}

	function filter_mce_plugin( $plugins ) {
		// this plugin file will work the magic of our button
		$plugins['mygallery'] = plugin_dir_url( __FILE__ ) . 'mygallery_plugin.js';
		error_log("Hey fredo");
		error_log($plugins['mygallery']);
		return $plugins;
	}
}

$mygallery = new MyGallery();
