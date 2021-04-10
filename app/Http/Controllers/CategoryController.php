<?php
namespace app\Http\Controllers;

use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;
use Twig\Environment;
use app\QueryBuilder;
use app\Database;

class CategoryController
{
    private $view;
    private $database;
    private $queryBuilder;

    public function __construct(Environment $view, Database $database, 
    QueryBuilder $queryBuilder)
    {
        $this->view = $view;
        $this->database = $database;
        $this->queryBuilder = $queryBuilder;

    }

    public function store(ServerRequestInterface $request, ResponseInterface $response): ResponseInterface
    {
        $test = ['name' => 'nicolay', 'age' => 28, 'email' => 'sumakaki37@gmail.com'];
        $data = json_encode($test);
        $response->getBody()->write($data);
        return $response->withHeader('Content-Type', 'application/json');
    }

    public function getData(ServerRequestInterface $request, ResponseInterface $response, array $args): ResponseInterface
    {
        $category = $categories = $this->queryBuilder->select('categories', ['id' => $args['id']], $this->database);
        $data = json_encode($category[0]);
        $response->getBody()->write($data);
        return $response->withHeader('Content-Type', 'application/json');
    }
}