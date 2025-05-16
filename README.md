# Desafio entrega 1 - Coderhouse

## Curso: Programação BackEnd I

### Descrição Geral

Desenvolver um servidor que contenha os endpoints e serviços necessários para gerenciar os produtos e carrinhos de compras para sua API.

### Configuração do ambiente

1. Clone o projeto:
```
git clone https://github.com/PedroJardel/desafio_coder_primeira_entrega.git
```

2. Rode o comando:
```
npm run setup
```
> Este comando instala as dependências, cria o arquivo .env localmente e roda a aplicação na porta 8080.

### Requisitos da Primeira Entrega

**Desenvolvimento do Servidor**
O servidor deve ser baseado em ``Node.js`` e ``Express``, e deve escutar na porta ``8080``. Devem estar disponíveis dois grupos de rotas: ``/products`` e ``/carts``. 
Esses endpoints devem ser implementados com o router do Express, com as seguintes especificações:

### Rotas para Gerenciamento de Produtos

‼️ **OBS =>** No repositório está incluso o JSON de configuração para o postman, é só importar e utilizar.
> CURSO BACK-END I CODER.postman_collection.json

``(/api/products/)``

``GET /:``

Deve listar todos os produtos do banco de dados.

``GET /:pid:``

Deve retornar apenas o produto com o id fornecido.

``POST /:``

Deve adicionar um novo produto com os seguintes campos:

* id: Number/String - ``Não deve ser enviado pelo body, é gerado automaticamente para garantir que os ids nunca se repitam``

* title: String

* description: String

* code: String

* price: Number

* status: Boolean

* stock: Number

* category: String

* thumbnails: Array de Strings - ``caminhos onde estão armazenadas as imagens do produto``.

``PUT /:pid:``
> Deve atualizar um produto com os campos enviados pelo body. Não se deve atualizar nem remover o id no momento da atualização.

``DELETE /:pid:``
Deve remover o produto com o pid indicado. 

### Rotas para Gerenciamento de Carrinhos 

``(/api/carts/)``

``POST /:``

Deve criar um novo carrinho com a seguinte estrutura:
* id: Number/String - ``Gerado automaticamente para garantir que os ids nunca se repitam.``

* products: Array que conterá objetos representando cada produto.

EXEMPLO JSON:
```
{
  id: 1
  products: []
}
```

``GET /:cid:``

Deve listar os produtos que pertencem ao carrinho com o cid fornecido.

``POST /:cid/product/:pid:``

Deve adicionar o produto ao array products do carrinho selecionado, utilizando o seguinte formato:

* product: ``Deve conter apenas o ID do produto.``

* quantity: ``Deve conter o número de unidades do produto (será adicionado um por vez).``

EXEMPLO JSON:
```
{
  id: 1
  products: [
    { product: 1, quantity: 3 },
    { product: 3, quantity: 2 },
    { product: 2, quantity: 1 }
  ]
}
```

Se um produto já existente for adicionado novamente, o campo ``quantity`` desse produto deve ser incrementado. 

### Persistência da Informação

A persistência será implementada utilizando o sistema de arquivos, onde os arquivos ``products.json`` e ``carts.json`` armazenarão as informações.

Deve-se utilizar o ``ProductManager`` desenvolvido no desafio anterior e criar um ``CartManager`` para gerenciar o armazenamento desses arquivos JSON.

#### **🗒️ Nota** 
> Não é necessário realizar nenhuma implementação visual, todo o fluxo pode ser feito via Postman ou outro cliente de sua preferência.

### Formato da Entrega

Fornecer um link para o repositório do GitHub com o projeto completo, sem a pasta ``node_modules``.
