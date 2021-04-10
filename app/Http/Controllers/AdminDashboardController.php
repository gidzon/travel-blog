<?php
namespace app\Http\Controllers;

use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;
use Twig\Environment;
use app\QueryBuilder;
use app\Database;

class AdminDashboardController
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

    public function index(ServerRequestInterface $request, ResponseInterface $response): ResponseInterface
    {
        $categories = $this->queryBuilder->select('categories', [], $this->database);
        $articles = $this->queryBuilder->select('articles', [], $this->database);
        $users = $this->queryBuilder->select('users', [], $this->database);
        $comentes = $this->queryBuilder->select('comentes', [], $this->database);
        
        $template = $this->view->render('admin/index.twig', [
            'categories' => $categories,
            'articles'   => $articles,
            'users'      => $users,
            'comentes'   => $comentes,
        ]);
        $response->getBody()->write($template);
        return $response;
    }



    public function store(ServerRequestInterface $request, ResponseInterface $response): ResponseInterface
    {
       $data = $request->getParsedBody(); 
       var_dump( $data['name'], $request->getParsedBody());
       exit;
    }
}