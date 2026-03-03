<?php
// Api/get_about_image.php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

// Szukamy pliku zaczynającego się od about_image
$files = glob('../uploads/about_image.*');

if (count($files) > 0) {
    $protocol = isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on' ? "https" : "http";
    $base_path = str_replace('\\', '/', dirname(dirname($_SERVER['SCRIPT_NAME'])));
    if($base_path == '/' || $base_path == '.') $base_path = '';
    
    $filename = basename($files[0]);
    echo json_encode(["url" => "$protocol://" . $_SERVER['HTTP_HOST'] . "$base_path/uploads/$filename"]);
} else {
    echo json_encode(["url" => null]);
}
?>