<table class="table table-striped" style="color: black!important; background-color: white!important">

<?php

$content = file_get_contents("admin/examples.txt");

$sentences = explode("\n", $content);

foreach ($sentences as $line) {
	$bg='white';
	$line = trim($line);
	if(!empty($line)) {
		echo "<tr>";
		echo "<td>".$line."</td>";
		echo "<td><button type='button' class='btn btn-default btn-sm' ";
		echo "onclick=\"playsign('".$line."');\"";
		echo ">Play <i class='glyphicon glyphicon-play'></i></button></td>";
		echo "</tr>";
	}
}

?>
</table>