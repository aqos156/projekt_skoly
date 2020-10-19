<?php

namespace App\Controllers;

class Home extends BaseController
{
	public function index()
	{
		return file_get_contents("./index.html");
	}

	//--------------------------------------------------------------------

}
