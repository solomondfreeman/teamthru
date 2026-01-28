<?php
$databases = [];
$settings['hash_salt'] = getenv('DRUPAL_HASH_SALT') ?: 'teamthru-drupal11';
$settings['update_free_access'] = FALSE;
$settings['file_public_path'] = 'sites/default/files';
$settings['file_private_path'] = 'sites/default/private';
$settings['trusted_host_patterns'] = ['.*'];

if (file_exists($app_root . '/' . $site_path . '/settings.pantheon.php')) {
  include $app_root . '/' . $site_path . '/settings.pantheon.php';
}
