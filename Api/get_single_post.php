<?php
require_once 'db.php';

$id = $_GET['id'] ?? 0;

if ($id > 0) {
    // Pobieramy wpis wraz z nazwą autora
    $sql = "SELECT users.username, posts.* FROM posts 
            JOIN users ON posts.author_id = users.id 
            WHERE posts.id = :id LIMIT 1";
            
    $stmt = $conn->prepare($sql);
    $stmt->bindParam(':id', $id);
    $stmt->execute();
    
    $post = $stmt->fetch(PDO::FETCH_ASSOC);
    
    if ($post) {
        echo json_encode($post);
    } else {
        echo json_encode(["error" => "Nie znaleziono wpisu"]);
    }
} else {
    echo json_encode(["error" => "Brak ID"]);
}
?>