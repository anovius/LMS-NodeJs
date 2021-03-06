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
    appUrl: "http://localhost",
    tokenAdmin: "",
    tokenUser: ""
  }
});

export default function() {
  group("User", function() {
    postman[Request]({
      name: "Login",
      id: "73594844-eba8-4976-bd62-859fe25446cf",
      method: "POST",
      address: "{{appUrl}}/api/users/login",
      data:
        '{\r\n    "email":"admin@gmail.com",\r\n    "password":"admin123"\r\n}',
      post(response) {
        pm.test("Successful Login request", function() {
          pm.response.to.have.status(200);
        });
        console.log(response.body)
        var bodyData = pm.response.json();
        var token = "Token " + bodyData.token;
        pm.environment.set("tokenAdmin", token);
      }
    });

    postman[Request]({
      name: "Sign Up",
      id: "cd8dae36-583a-4c1c-9ea4-35f9f12fcde3",
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
      id: "32d56e87-033a-4cde-8a56-8bc039f83289",
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
      id: "326de76e-8d21-4698-a44b-09c778d940a9",
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
      id: "78916c5a-28c9-4c2e-86e5-3f454f54a15a",
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
      id: "c907db15-25c4-4c88-93e2-0fecdacad7d5",
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
      id: "7dc996b3-f1d8-4a53-9238-8543bb584ba1",
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
      id: "4ef07993-e024-4b04-b20c-ee796faf6bbd",
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
      id: "62d55110-4b02-4316-94a7-c6ba572d4d74",
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
      id: "a1b7e78f-421c-4a27-89a0-8c597633f3d9",
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
      id: "ce8faed5-4268-4284-9d4e-937e704874cd",
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
