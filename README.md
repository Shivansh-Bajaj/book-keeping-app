# book-keeping-app

Applicatiom for book keeping

URL : https://bookkeepapp-01.herokuapp.com/  
**Note: the Full text search is not working in the production host link as the production MYSQL server doesnt support FTS**

### Database:  

**Type:**

MySQL  

**tables:**

author:

```
name: String,
info: string
```

book:
```
title: String,
image_url: String,
isbn: String,
published_at: date,
book_edition: Stringm
```

publisher:
```
title: String,
info: string
```

**Association**

One to many:
book to publisher

Many to many:
book to author via book_authors

### Dependencies:  

````
nodeJS, npm, mysql
````

### Steps to build:  

````
export environment="development"
npm install   
npm start  
````

### to reset DB:   

````
npm reset
````

### API:  
#### book:  
##### URL: /api/book

**METHOD: GET**  
Request:
```
method: get,
params: {
q: string (optional search string)
}
```

Response: 
```
{
Status: "success"/"fail",
error: "error object"(in case of fail)
data: [{
        title: String,
        image_url: String,
        isbn: String,
        published_at: date,
        book_edition: Stringm
        authors: {
            name: String,
            info: string
        }
        pubisher: {
            name: String,
            info: String
        }
    }]
}
```

**Method: POST**  
Request:
```
    method: post,
    body: {
        title: String,
        image_url: String,
        isbn: String,
        published_at: date,
        book_edition: String,
        authors: String(comma seperated author name ex: james, lex luthor),
        publisher: String(publisher name)
    }
```

Response: 
```
{
Status: "success"/"fail",
error: error object(in case of fail)
data: [{
        title: String,(required field)
        image_url: String,
        isbn: String,
        published_at: date,(required field)
        book_edition: String
        authors: [{
            name: String,
            info: string
        }]
        pubisher(required field): {
            name: String,
            info: String
        } 
    }]
}
```  


**Method: PUT**  
Request:
```
    method: PUT,
    body: {
        id: number, (required field)
        title: String,
        image_url: String,
        isbn: String,
        published_at: date,
        book_edition: String,
        authors: String(comma seperated author name ex: james, lex luthor),
        publisher: String(publisher name)
    }
```

Response: 
```
{
Status: "success"/"fail",
error: error object(in case of fail)
data: [{
        title: String,
        image_url: String,
        isbn: String,
        published_at: date,
        book_edition: Stringm
        authors: {
            name: String,
            info: string
        }
        pubisher: {
            name: String,
            info: String
        }
    }]
}
```  



**Method: DELETE**  
Request:
```
    method: DELETE,
    body: {
        id: number, (required field)
    }
```

Response: 
```
{
Status: "success"/"fail",
error: error object(in case of fail)

}
```  

#### /author  
##### URL: /api/author  

**METHOD: GET**  
Request:
```
method: get,
params: {
q: string (optional search string)
}
```

Response: 
```
{
Status: "success"/"fail",
error: "error object"(in case of fail)
data: [{
        name: String,
        info: string
    }]
}
```

**Method: POST**  
Request:
```
    method: post,
    body: {
        name: String,
        info: string
    }
```

Response: 
```
{
Status: "success"/"fail",
error: error object(in case of fail)
}
```  


**Method: PUT**  
Request:
```
    method: PUT,
    body: {
        id: number, (required field)
        name: String,
        info: String
    }
```

Response: 
```
{
Status: "success"/"fail",
error: error object(in case of fail)
}
```  



**Method: DELETE**  
Request:
```
    method: DELETE,
    body: {
        id: number, (required field)
    }
```

Response: 
```
{
Status: "success"/"fail",
error: error object(in case of fail)

}
```  


#### /publisher  
##### URL: /api/publisher  

**METHOD: GET**  
Request:
```
method: get,
params: {
q: string (optional search string)
}
```

Response: 
```
{
Status: "success"/"fail",
error: "error object"(in case of fail)
data: [{
        title: String,
        info: string
    }]
}
```

**Method: POST**  
Request:
```
    method: post,
    body: {
        title: String,
        info: string
    }
```

Response: 
```
{
Status: "success"/"fail",
error: error object(in case of fail)
}
```  


**Method: PUT**  
Request:
```
    method: PUT,
    body: {
        id: number, (required field)
        title: String,
        info: String
    }
```

Response: 
```
{
Status: "success"/"fail",
error: error object(in case of fail)
}
```  



**Method: DELETE**  
Request:
```
    method: DELETE,
    body: {
        id: number, (required field)
    }
```

Response: 
```
{
Status: "success"/"fail",
error: error object(in case of fail)

}
```  
