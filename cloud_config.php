<?php
use Cloudinary\Configuration\Configuration;
// configure globally via a JSON object
Configuration::instance([
  'cloud' => [
    'cloud_name' => 'leetb', 
    'api_key' => '598415572587841', 
    'api_secret' => 'PjOdghEot_dJGaRL6O4XjqvkD2I'],
  'url' => [
    'secure' => true]]);
?>