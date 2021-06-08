<?php
// Create connection
$connectDatabase = new mysqli("localhost", "root", "", "booksharing");
$connectDatabase->set_charset("utf8");

// Check connection
if ($connectDatabase->connect_error) {
  die("Connection failed: " . $connectDatabase->connect_error);
}
?>