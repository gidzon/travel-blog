<?php

use app\Http\Controllers\HomeController;
use app\Http\Controllers\CategoryController;
use app\Http\Controllers\ArticlesController;
use app\Http\Controllers\AdminDashboardController;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;
use Twig\Environment;
use Twig\Loader\FilesystemLoader;
use app\Database;
use app\QueryBuilder;
use Slim\Routing\RouteCollectorProxy;

$loader = new FilesystemLoader('templates');
$twig = new Environment($loader);
$database = new Database('admin', 'sumakaki', 'travel_blog');
$queryBuilder = new QueryBuilder();

$app->get('/', function (ServerRequestInterface $request, ResponseInterface $response) use ($twig, 
$database, $queryBuilder){
    $homeController = new HomeController($twig, $database, $queryBuilder);
    
    return $homeController->show($request, $response);
});

$app->get('/articles/{id}', function (ServerRequestInterface $request, ResponseInterface $response, array $arrgs) use ($twig, 
$database, $queryBuilder){
    $ArticlesController = new ArticlesController($twig, $database, $queryBuilder);
    
    return $ArticlesController->index($request, $response, $arrgs);
});

$app->get('/articles/show/{id}', function (ServerRequestInterface $request, ResponseInterface $response, array $arrgs) use ($twig, 
$database, $queryBuilder){
    $ArticlesController = new ArticlesController($twig, $database, $queryBuilder);
    
    return $ArticlesController->show($request, $response, $arrgs);
});


$app->get('/admin/dashboard/index', function (ServerRequestInterface $request, ResponseInterface $response, array $args) use ($twig, 
$database, $queryBuilder){
    $AdminDashboardController = new AdminDashboardController($twig, $database, $queryBuilder);
    
    return $AdminDashboardController->index($request, $response);
});


$app->post('/admin/dashboard/store', function (ServerRequestInterface $request, ResponseInterface $response) use ($twig, 
$database, $queryBuilder){
    $AdminDashboardController = new AdminDashboardController($twig, $database, $queryBuilder);
    
    return $AdminDashboardController->store($request, $response);
});


$app->post('/admin/dashboard/category/store', function (ServerRequestInterface $request, ResponseInterface $response) use ($twig, 
$database, $queryBuilder){
    $AdminDashboardController = new CategoryController($twig, $database, $queryBuilder);
    
    return $AdminDashboardController->store($request, $response);
});

$app->get('/admin/dashboard/categories/{id}', function (ServerRequestInterface $request, ResponseInterface $response, array $args) use ($twig, 
$database, $queryBuilder){
    $AdminDashboardController = new CategoryController($twig, $database, $queryBuilder);
    
    return $AdminDashboardController->getData($request, $response, $args);
});