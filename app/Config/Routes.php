<?php

namespace Config;

// Create a new instance of our RouteCollection class.
$routes = Services::routes();

// Load the system's routing file first, so that the app and ENVIRONMENT
// can override as needed.
if (file_exists(SYSTEMPATH . 'Config/Routes.php')) {
	require SYSTEMPATH . 'Config/Routes.php';
}

/**
 * --------------------------------------------------------------------
 * Router Setup
 * --------------------------------------------------------------------
 */
$routes->setDefaultNamespace('App\Controllers');
$routes->setDefaultController('Home');
$routes->setDefaultMethod('index');
$routes->setTranslateURIDashes(false);
$routes->set404Override();
$routes->setAutoRoute(true);

/**
 * --------------------------------------------------------------------
 * Route Definitions
 * --------------------------------------------------------------------
 */

// We get a performance increase by specifying the default
// route since we don't have to scan directories.
$routes->get('/', 'Home::index');

$routes->options('/api/auth/*', 'AuthController::optionsReq');
$routes->get('/api/auth/user', 'AuthController::getUser');
$routes->post('/api/auth/login', 'AuthController::login');
$routes->post('/api/auth/register', 'AuthController::register');
$routes->post('/api/auth/logout', 'AuthController::logout');

$routes->get('/api/schools/all', 'SchoolsApiController::getAll');
$routes->post('/api/schools/pocet', 'SchoolsApiController::createPocet');
$routes->post('/api/schools/skola', 'SchoolsApiController::createSkola');

$routes->get('/api/schools', 'SchoolsApiController::get');

$routes->get('/api/schools/positions', 'SchoolsApiController::getPositions');

/**
 * --------------------------------------------------------------------
 * Additional Routing
 * --------------------------------------------------------------------
 *
 * There will often be times that you need additional routing and you
 * need it to be able to override any defaults in this file. Environment
 * based routes is one such time. require() additional route files here
 * to make that happen.
 *
 * You will have access to the $routes object within that file without
 * needing to reload it.
 */
if (file_exists(APPPATH . 'Config/' . ENVIRONMENT . '/Routes.php')) {
	require APPPATH . 'Config/' . ENVIRONMENT . '/Routes.php';
}
