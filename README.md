# HotelBookingApp
HotelBookingApp

---

# Requirements:
- NodeJS
- MySQL
- JWT

`cd ~/Desktop`

`git clone https://github.com/Arun221196/HotelBookingApp.git/`

`cd HotelBookingApp`

Server should start on localhost:3400

Attached postman collection for reference
 
---

# REST
### POST  /login


```javascript
{
    "username": "foo",
    "password": "qwerty"
}       
```


### POST /signup

```javascript
{
    "username": "foo",
    "password": "qwerty",
    "roleId":2 
}
```

### POST /addhotel

```javascript
{
    "hotelName": "The Residency Towers Chennai",
    "hotelDesc": "The Residency Towers Chennai",
    "hotelLocation":"Chennnai",
    "ownerId":4 
}
```

### PUT /updatehotel

```javascript
{
    "hotelId":2,
    "hotelName": "Holiday INN"
}
```

### GET /gethotel

