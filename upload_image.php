<?php
$rel  = __DIR__ . '/../../../';

include("../../../wp-load.php");
require_once( $rel . 'wp-admin/includes/image.php' );
require_once( $rel . 'wp-admin/includes/file.php' );
require_once( $rel .  'wp-admin/includes/media.php' );
// Check that the nonce is valid, and the user can edit this post.
if (
	//isset( $_POST['my_image_upload_nonce'], $_POST['post_id'] )
	//&& wp_verify_nonce( $_POST['my_image_upload_nonce'], 'my_image_upload' )
	//&& current_user_can( 'edit_post', $_POST['post_id'] )

  current_user_can( 'edit_posts' ) && current_user_can( 'edit_pages' )
) {
	// The nonce was valid and the user has the capabilities, it is safe to continue.

	// These files need to be included as dependencies when on the front end.
  //error_log(ABSPATH);
  ///error_log(dirname(__FILE__))
  //error_log(__DIR__);
//error_log($_POST['birdup']);
//error_log(count($_FILES));
//error_log(count($_POST));
//error_log(implode("",array_keys($_POST)));
//error_log($_POST['my_image_upload']);
//error_log($_FILES['my_image_upload']['tmp_name']);
	// Let WordPress handle the upload.
	// Remember, 'my_image_upload' is the name of our file input in our form above.
	$attachment_id = media_handle_upload( 'my_image_upload', 0);//$_POST['post_id'] );

	if ( is_wp_error( $attachment_id ) ) {
		// There was an error uploading the image.
    error_log("error uploading image");
	} else {
		// The image was uploaded successfully!
    echo wp_get_attachment_url( $attachment_id );
	}

} else {

	// The security check failed, maybe show the user an error.
}




 ?>
