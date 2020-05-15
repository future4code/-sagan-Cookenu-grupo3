### POST Signup

````
http://localhost:3000/signup 
```` 
BODY

````
{
	"name": "Alice",
	"email": "alice@lbn.com",
	"password": "123456"
}
````


### POST Login

````
http://localhost:3000/login 
```` 
BODY

````
{
	"email": "alice@lbn.com",
	"password": "123456"
}
````

### GET Profile

````
http://localhost:3000/user/profile
```` 
HEADERS
````
Authorization: "token de autenticação"
````
BODY

````
{
	"id": "id do usuário",
	"name": "Alice",
	"email": "alice@lbn.com"
}
````

### GET Profile Id
````
http://localhost:3000/user/:id
```` 

PATH PARAM
````
id: "id do usuário"
````
HEADERS
````
Authorization: "token de autenticação"
````
BODY

````
{
	"id": "id do usuário",
	"name": "Alice",
	"email": "alice@lbn.com"
}
````


### POST Create Recipe
````
http://localhost:3000/recipe
```` 

HEADERS
````
Authorization: "token de autenticação"
````
BODY

````
{
	"title": "título da receita",
	"description": "descrição da receita"
}
````

### GET Recipe Id
````
http://localhost:3000/recipe/:id
```` 

PATH PARAM
````
id: "id da receita"
````

HEADERS
````
Authorization: "token de autenticação"
````
BODY

````
{
	"id": "id da receita",
	"title": "Ovo Frito",
	"description": "Pega o ovo, põe na frigideira e reza!"
	"cratedAt": "31/12/2020"
}
````
### POST Follow User
````
http://localhost:3000/user/follow
```` 

HEADERS
````
Authorization: "token de autenticação"
````
BODY

````
{
	"userToFollowId": "id do usuário que se deseja seguir"
}
````

### POST Follow User
````
http://localhost:3000/user/unfollow
```` 

HEADERS
````
Authorization: "token de autenticação"
````
BODY

````
{
	"userToUnfollowId": "id do usuário que se deseja deixar de seguir"
}
````

### GET User Feed
````
http://localhost:3000/user/feed
```` 

HEADERS
````
Authorization: "token de autenticação"
````
BODY

````
{
	"recipes": [{
			"id": "id da receita",
			"title": "título da receita",
			"description": "descrição da receita",
			"createdAt": "31/12/2020",
			"userId": "id do usuário que criou a receita",
			"userName": "nome do usuário que criou a receita"
	}]
}
````
### DESAFIOS 


### DEL Delete Recipe
````
http://localhost:3000/recipes/delete/:id
```` 
PATH PARAM
````
id: "id da receita"
````

HEADERS
````
Authorization: "token de autenticação"
````

### DEL Delete User
````
http://localhost:3000/user/delete/:id
```` 
PATH PARAM
````
id: "id do usuário"
````

HEADERS
````
Authorization: "token de autenticação"
````

