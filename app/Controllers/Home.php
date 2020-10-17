<?php

namespace App\Controllers;

class Home extends BaseController
{
	public function index()
	{
		$db = \Config\Database::connect();
		return view('welcome_message');
	}

	//--------------------------------------------------------------------

}
