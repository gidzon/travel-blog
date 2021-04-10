<?php
namespace app\Http\Controllers;

use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;
use Twig\Environment;
use app\QueryBuilder;
use app\Database;

class ArticlesController
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

    public function index(ServerRequestInterface $request, ResponseInterface $response, array $arrgs): ResponseInterface
    {
        $categories = $this->queryBuilder->select('categories', [], $this->database);
        $articles = $this->queryBuilder->select('articles', ['id_category' => $arrgs['id']], $this->database);
        
        
        $template = $this->view->render('articles.twig', [
            'categories' => $categories,
            'articles'   => $articles
            ]);
        $response->getBody()->write($template);
        return $response;
    }

    public function show(ServerRequestInterface $request, ResponseInterface $response, array $arrgs): ResponseInterface
    {
        $categories = $this->queryBuilder->select('categories', [], $this->database);
        $article = $this->queryBuilder->select('articles', ['id' => $arrgs['id']], $this->database);
        
        $template = $this->view->render('article.twig', [
            'categories' => $categories,
            'article'   => $article[0]
            ]);
        $response->getBody()->write($template);
        return $response;
    }
}