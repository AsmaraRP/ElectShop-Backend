# Electshop Project (BACK-END)

![electshop motto](https://user-images.githubusercontent.com/95269946/169771744-74b70bbb-1281-4f4b-8266-0f51edb1ab7b.png)


## Description

In the repository, we have a Front-end project for electshop that representing the electronic marketplace. The electronic marketplace, electshop, is specifically help people for getting electronic product. In this project, we just trade a electronic product because we want to make sure that customer get the goal product without affected by another product. 

## Content
We got some content for help front-end can be integrated with databases and make some features from front end can be used. In this content we have some request include auth, user, product, checkout, and transaction manage.

### Auth
  In this type, requests are used to manage authentication and authorization proccess, the request include::
Login = /auth/login
Register = /auth/register/
Logout = /auth/logout
Refresh Token = /auth/refresh
Activation /auth/activation?token={token}

### User
  In this type, requests are used to manage information about user's profile and manage it, the request include:
Get User By Id = /user/{idUser}
Update Profile = /user/profile/{idUser}
Update Password = /user/password/{idUser}

### Product
  In this type, requests are used to manage product both uploading or creating product and getting access each product, the request include:
Get All Product = /product/
Get Product By Id = /product/{idProduct}
Create Product = /product/{idProduct}
Update Product = /product/{idProduct}
Delete Product = /product/{idProduct}

### Checkout
  In this type, requests are used to manage order both uploading or creating order and saving product in cart page, the request include:
Get Checkout By User Id = /checkout/{idUser}
Get Checkout By Product Id = /checkout/{idProduct}
Create Product = /checkout/{idCheckout}
Update Product = /checkout/{idCheckout}
Delete Product = /checkout/{idCheckout}

### Transaction
  In this type, requests are used to manage transaction result both historical order and managing orders from admin page, the request include:
Get All Transaction = /transaction
Create Product = /transaction/{idTransaction}
Update Product = /transaction/{idTransaction}
Delete Product = /transaction/{idTransaction}
  
  
