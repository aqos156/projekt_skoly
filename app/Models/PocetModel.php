<?php

namespace App\Models;

use CodeIgniter\Model;

class PocetModel extends Model
{
  protected $table      = 'pocet_prijatych';
  protected $primaryKey = 'id';

  protected $returnType     = 'array';
  protected $useSoftDeletes = true;

  protected $allowedFields = ['pocet', 'rok', "obor", "skola"];

  protected $validationMessages = [];
  protected $skipValidation     = false;

  protected $validationRules    = [
    'pocet'     => 'required|numeric',
    'rok'     => 'required|numeric',
    'obor'        => 'required|numeric',
    'skola'        => 'required|numeric'
  ];
}
