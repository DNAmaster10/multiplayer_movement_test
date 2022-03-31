<?php
	if (!isset($conn)) {
		if (!isset($file_path)) {
			$file_path = $_SERVER["DOCUMENT_ROOT"];
		}
		include $file_path."/php/dbh.php";
	}
	$sql = "SELECT ".$column_name." FROM ".$table_name." WHERE (".$where_column.") = ('".$where_value."');";
	$raw_result = mysqli_query($conn, $sql) or die (mysqli_error($conn));
	if ($raw_result->num_rows > 0) {
		$row = $raw_result->fetch_assoc();
		$result = $row[$column_name];
		unset($row);
		unset($raw_result);
	}
	else {
		$result = "null";
	}
?>
