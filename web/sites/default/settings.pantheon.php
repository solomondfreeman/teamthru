<?php
if (defined('PANTHEON_ENVIRONMENT')) {
  $settings['file_private_path'] = 'private://';
  $config['system.file']['path']['temporary'] = '/tmp';
}
