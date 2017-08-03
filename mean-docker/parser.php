<?php

$xmlFile = simplexml_load_file('angular-client/src/complet.xml');
$final = '';

/* for($i=0;$i<count($xmlFile->channel);$i++){
    $final .= json_encode($xmlFile->channel[$i], JSON_FORCE_OBJECT);
    echo $i."\n";
}

file_put_contents('channel.json', $final); */


//var_dump($xmlFile->programme[1]);
 for($i=0; $i<count($xmlFile->programme);$i++){
    echo  json_encode($xmlFile->programme[$i], JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES++O) . ",\n";
}





/*
$f = file_get_contents('channels.json');
$finalFile = str_replace('} {', '', $f);

file_put_contents('channels.json', $finalFile);
*/