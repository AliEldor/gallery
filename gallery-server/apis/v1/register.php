<?php
include("../../../../gallery-app/gallery-server/connection/connection.php");
include("../../../../gallery-app/gallery-server/models/User.php");

header("Content-Type: application/json");

header("Access-Control-Allow-Origin: http://localhost:5174"); // Update the port number if different
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");


try{
if($_SERVER["REQUEST_METHOD" ] !== "POST"){
    throw new Exception("Invalid request method");
    
}

$fullname=isset($_POST['fullname'])? trim($_POST['fullname']):'';
$email=isset($_POST['email'])? trim($_POST['email']):'';
$password=isset($_POST['password'])? $_POST['password']: '';

if (empty($fullname) || empty($email) || empty($password)) {
    throw new Exception("All fields are required.");
    
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    throw new Exception("Invalid email format.");
    
}


$user = new User($conn);

$result= $user->register($fullname, $email, $password);


echo json_encode($result);
}catch(Exception $e){
    echo json_encode([
        "success" => false,
        "message" => $e->getMessage()
    ]);
}