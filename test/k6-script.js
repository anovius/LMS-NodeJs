// Auto-generated by the postman-to-k6 converter

import "./libs/shim/core.js";
import "./libs/shim/urijs.js";
import "./libs/shim/expect.js";
import { group } from "k6";

export let options = { maxRedirects: 4 };

const Request = Symbol.for("request");
postman[Symbol.for("initial")]({
  options,
  collection: {
    name: "",
    email: "",
    password: "",
    bookId: "",
    titile: "",
    ISBN: "",
    authors: "",
    orderISBN: "",
    orderId: ""
  },
  environment: {
    appUrl: "http://64.227.10.141",
    tokenAdmin: "",
    tokenUser: ""
  }
});

export default function() {
  group("User", function() {
    postman[Request]({
      name: "Login",
      id: "d0e46fcc-3ef4-487d-b31a-477e6d3c92c6",
      method: "POST",
      address: "http://l{{appUrl}}/api/users/login",
      data:
        '{\r\n    "email":"admin@gmail.com",\r\n    "password":"admin123"\r\n}',
      post(response) {
        pm.test("Successful Login request", function() {
          pm.response.to.have.status(200);
        });

        var bodyData = pm.response.json();
        var token = "Token " + bodyData.token;
        pm.environment.set("tokenAdmin", token);
      }
    });

    postman[Request]({
      name: "Sign Up",
      id: "f89fad78-c3c5-4c6a-a36a-40704fe71354",
      method: "POST",
      address: "{{appUrl}}/api/users/signUp",
      data:
        '{\n    "name":"{{$randomFullName}}",\n    "email":"{{$randomEmail}}",\n    "password":"{{$randomPassword}}"\n}',
      post(response) {
        pm.test("Successful Sign Up request", function() {
          pm.response.to.have.status(201);
        });

        var bodyData = pm.response.json();
        var token = "Token " + bodyData.token;
        pm.environment.set("tokenUser", token);
      }
    });

    postman[Request]({
      name: "Get All Users",
      id: "13eb1342-1b29-4c97-9a83-e20ece79931f",
      method: "GET",
      address: "{{appUrl}}/api/users/getAllUsers",
      headers: {
        Authorization: "{{tokenAdmin}}"
      },
      post(response) {
        pm.test("Successful get all user request", function() {
          pm.response.to.have.status(200);
        });
      }
    });
  });

  group("Book", function() {
    postman[Request]({
      name: "Get All Books",
      id: "ce9d6146-549a-4d5d-beb8-53a58a780767",
      method: "GET",
      address: "{{appUrl}}/api/books",
      headers: {
        Authorization: "{{tokenUser}}"
      },
      post(response) {
        pm.test("Successful books request", function() {
          pm.response.to.have.status(200);
        });
      }
    });

    postman[Request]({
      name: "AddBook",
      id: "139513e1-99bc-4551-9eb2-ea78493b3195",
      method: "POST",
      address: "{{appUrl}}/api/books/addBook",
      data:
        '{\r\n    "title":"{{$randomProductName}}",\r\n    "ISBN":"93434",\r\n    "authors": ["60dabf66ed5cf3ef93ae9e89"]\r\n}',
      headers: {
        Authorization: "{{tokenAdmin}}"
      },
      post(response) {
        pm.test("Successful add Book request", function() {
          pm.expect(pm.response.code).to.be.oneOf([201, 203]);
        });
      }
    });

    postman[Request]({
      name: "SearchBook",
      id: "d1dfbc36-1ed6-4f5f-aea5-d8bf1328236a",
      method: "GET",
      address: "{{appUrl}}/api/books/search/global program",
      headers: {
        Authorization: "{{tokenUser}}"
      },
      post(response) {
        pm.test("Successfull serach request", function() {
          pm.response.to.have.status(200);
        });
      }
    });

    postman[Request]({
      name: "Update Book",
      id: "7630b508-6416-42bf-b048-961c52cfdcfd",
      method: "PUT",
      address: "{{appUrl}}/api/books/update",
      data:
        '{\r\n    "id":"60dabf75764eb9efaedd189b",\r\n    "title": "Global Program Technician Updated"\r\n}',
      headers: {
        Authorization: "{{tokenAdmin}}"
      },
      post(response) {
        pm.test("Successfull update request", function() {
          pm.response.to.have.status(200);
        });
      }
    });
  });

  group("Author", function() {
    postman[Request]({
      name: "Get All Authors",
      id: "17730fa5-d204-49ce-b2b6-0c2817b7d38c",
      method: "GET",
      address: "{{appUrl}}/api/authors/",
      headers: {
        Authorization: "{{tokenAdmin}}"
      },
      post(response) {
        pm.test("Successfull authors request", function() {
          pm.response.to.have.status(200);
        });
      }
    });
  });

  group("Orders", function() {
    postman[Request]({
      name: "Gett All Orders",
      id: "38ca991f-d975-472a-a670-15c2a261eb73",
      method: "GET",
      address: "{{appUrl}}/api/orders/",
      headers: {
        Authorization: "{{tokenAdmin}}"
      },
      post(response) {
        pm.test("Successfull orders request", function() {
          pm.response.to.have.status(302);
        });
      }
    });

    postman[Request]({
      name: "Place Order",
      id: "a9e1f23f-4b06-4bc5-9407-6324422ae9b3",
      method: "POST",
      address: "{{appUrl}}/api/orders/placeOrder",
      data: '{\r\n    "ISBN":"72977"\r\n}',
      headers: {
        Authorization: "{{tokenUser}}"
      },
      post(response) {
        pm.test("Successful place order request", function() {
          pm.expect(pm.response.code).to.be.oneOf([203, 201]);
        });
      }
    });

    postman[Request]({
      name: "Return Book",
      id: "815a317c-aedb-47ae-aa09-6845e0859182",
      method: "PUT",
      address: "{{appUrl}}/api/orders/return",
      data: '{\r\n    "orderId":"60dabfc2ba2a4befff69d4e0"\r\n}',
      headers: {
        Authorization: "{{tokenAdmin}}"
      },
      post(response) {
        pm.test("Successful return bool request", function() {
          pm.response.to.have.status(302);
        });
      }
    });
  });
}
