<?php

namespace App\Controllers;

use App\Models\MestoModel;
use App\Models\OborModel;
use App\Models\PocetModel;
use App\Models\SkolaModel;
use CodeIgniter\API\ResponseTrait;
use CodeIgniter\Database\ResultInterface;

class SchoolsApiController extends BaseController
{
  use ResponseTrait;

  /**
   * Mohli bysme to dát do modelu, ale jelikož to zasahuje všude
   * a je to pouze jedna metoda, tak to dáme sem
   */
  private function getAllFiltered(string $filterBy = null, $orderBy = ""): ResultInterface
  {
    $db =  \Config\Database::connect();
    $builder = $db->table("pocet_prijatych as p");

    $builder = $builder->join("skola as s", "s.id = p.skola", "left");
    $builder = $builder->join("obor as o", "o.id = p.obor", "left");

    $builder = $builder->join("mesto as m", "m.id = s.mesto", "left");

    $builder = $builder->select("p.pocet as pocet, s.nazev as skola, o.nazev as obor, m.nazev as mesto, p.rok as rok");

    return $builder->get();
  }

  public function get()
  {
    $data = $this->getAllFiltered()->getResult();

    return $this->respond($data);
  }

  public function getAll()
  {
    $skola = new SkolaModel();
    $obor = new OborModel();
    $mesto = new MestoModel();


    return $this->respond([
      "skola" => $skola->getIdNames(),
      "obor" => $obor->getIdNames(),
      "mesto" => $mesto->getIdNames(),
    ]);
  }

  public function getPositions()
  {
    $skola = new SkolaModel();


    return $this->respond($skola->getIdNamesPosition());
  }

  public function createPocet()
  {

    $session = \Config\Services::session();

    $user = $session->get("user");
    if (!$user) {
      return $this->respond(["errors" => ["login" => "Musíte bvýt příhlášen k přidání počtu"]]);
    }

    $data = json_decode($this->request->getBody());

    $pocet = new PocetModel();

    $pocet->insert($data);

    if ($pocet->errors()) {
      return $this->respond($pocet->errors(), 400);
    }

    return $this->respondCreated(["status" => "success"]);
  }

  //--------------------------------------------------------------------

}
