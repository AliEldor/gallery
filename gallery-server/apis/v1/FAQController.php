<?php
header("Access-Control-Allow-Origin: *");
header('Access-Control-Allow-Headers: *');
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Content-Type: application/json; charset=UTF-8");

require(__DIR__ . '/../../models/Faq.php');

class FAQController{

    static function loadFAQs(){
        echo json_encode(Faq::all());
    }

    static function addFAQ(){
        //check the $_POST[]... 
        Faq::create($question, $answer);
        Faq::save();
        echo json_encode(["response" => 1]);
    }
}    

?>