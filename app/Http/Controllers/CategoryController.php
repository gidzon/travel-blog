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

    /**
     * @param ServerRequestInterface $request
     * @param ResponseInterface $response
     * @return ResponseInterface
     */
    public function store(ServerRequestInterface $request, ResponseInterface $response): ResponseInterface
    {

        $contents = json_decode(file_get_contents('php://input'), true);
        if (isset($contents['id'])){
            $keys = array_keys($contents);
            $values = array_values($contents);

            $this->queryBuilder->update('categories', $values, $keys, $this->database);
        } else {
            $this->queryBuilder->insert('categories', $contents, $this->database);
        }
        $categories = $this->queryBuilder->select('categories', [], $this->database);

        $data = json_encode($categories);


        $response->getBody()->write($data);
        return $response->withHeader('Content-Type', 'application/json');
    }

    /**
     * @param ServerRequestInterface $request
     * @param ResponseInterface $response
     * @param array $args
     * @return ResponseInterface
     */
    public function getData(ServerRequestInterface $request, ResponseInterface $response, array $args): ResponseInterface
    {
        $category =  $this->queryBuilder->select('categories', ['id' => $args['id']], $this->database);
        $data = json_encode($category[0]);
        $response->getBody()->write($data);
        return $response->withHeader('Content-Type', 'application/json');
    }
}