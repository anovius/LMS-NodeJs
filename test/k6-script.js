// Auto-generated by the postman-to-k6 converter

import "./libs/shim/core.js";
import "./libs/shim/urijs.js";
import { group } from "k6";

export let options = { maxRedirects: 4, iterations: 100 };

const Request = Symbol.for("request");
postman[Symbol.for("initial")]({
  options,
  collection: {
    appUrl: "localhost:3000",
    tokenAdmin:
      "Token eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiYWRtaW5AZ21haWwuY29tIiwiaWF0IjoxNjI0ODI2Mzk1fQ.rcoUTR5NLSNDgT9Ss5onIXPTk18z704NjDGGygZY4mA",
    tokenUser:
      "Token eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoidXNtYW5AZ21haWwuY29tIiwiaWF0IjoxNjI0ODI2NDE4fQ.x5ue-D_CYgRoJFPNjn9GwqQpUxCZ8keDI-OBc8ETTVI",
    name: "",
    email: "",
    password: "",
    bookId: "",
    title: "",
    ISBN: "",
    authors: "",
    orderISBN: "",
    orderId: ""
  },
  environment: {
    appUrl: "http://localhost:3000"
  }
});

export default function() {
  group("User", function() {
    postman[Request]({
      name: "Login",
      id: "6ff50c70-4b63-4c78-9bf3-8bfa26f24182",
      method: "GET",
      address: "{{appUrl}}/api/users/login",
      data:
        '{\r\n    "email":"{{email}}",\r\n    "password":"{{password}}"\r\n}'
    });

    postman[Request]({
      name: "Sign Up",
      id: "3471cf46-1610-4bcb-84a4-62ff6afa4e32",
      method: "POST",
      address: "localhost:3000/api/users/signUp",
      data:
        '{\n    "name":"{{name}}",\n    "email":"{{email}}",\n    "password":"{{password}}"\n}'
    });

    postman[Request]({
      name: "Get All Users",
      id: "1aa23252-6052-4885-b219-594958409bef",
      method: "GET",
      address: "localhost:3000/api/users/getAllUsers",
      headers: {
        Authorization: "{{tokenAdmin}}"
      }
    });
  });

  group("Book", function() {
    postman[Request]({
      name: "Get All Books",
      id: "683e3ec5-667a-4901-8d70-af06e2c231fd",
      method: "GET",
      address: "localhost:3000/api/books",
      headers: {
        Authorization: "{{tokenUser}}"
      }
    });

    postman[Request]({
      name: "AddBook",
      id: "abc370fa-619d-4957-a293-01ffe662ea04",
      method: "POST",
      address: "localhost:3000/api/books/addBook",
      data:
        '{\r\n    "title":"{{title}}",\r\n    "ISBN":"{{ISBN}}",\r\n    "authors": {{authors}}\r\n}',
      headers: {
        Authorization: "{{tokenAdmin}}"
      }
    });

    postman[Request]({
      name: "SearchBook",
      id: "e046cde3-a114-41d9-b962-aa233cb3aeb5",
      method: "GET",
      address: "localhost:3000/api/books/search/global program",
      headers: {
        Authorization: "{{tokenUser}}"
      }
    });

    postman[Request]({
      name: "Update Book",
      id: "78408edc-1bb5-48ce-9671-f0e901e41b5e",
      method: "PUT",
      address: "localhost:3000/api/books/update",
      data:
        '{\r\n    "id":"{{bookId}}",\r\n    "title": "{{title}}",\r\n    "ISBN": "{{ISBN}}"\r\n}',
      headers: {
        Authorization: "{{tokenAdmin}}"
      }
    });
  });

  group("Author", function() {
    postman[Request]({
      name: "Get All Authors",
      id: "ef1c8305-ab1f-448f-8b0d-eb574f3c9f7a",
      method: "GET",
      address: "localhost:3000/api/authors/",
      headers: {
        Authorization: "{{tokenAdmin}}"
      }
    });
  });

  group("Orders", function() {
    postman[Request]({
      name: "Gett All Orders",
      id: "2e556b10-9c37-4f56-b390-3971fc84f7fd",
      method: "GET",
      address: "localhost:3000/api/orders/",
      headers: {
        Authorization: "{{tokenAdmin}}"
      }
    });

    postman[Request]({
      name: "Place Order",
      id: "e4f4fa04-5ecd-4dbd-938f-50de74486256",
      method: "POST",
      address: "localhost:3000/api/orders/placeOrder",
      data: '{\r\n    "ISBN":"{{orderISBN}}"\r\n}',
      headers: {
        Authorization: "{{tokenUser}}"
      }
    });

    postman[Request]({
      name: "Return Book",
      id: "3674146e-d94e-4a64-9d4e-f252a7a95948",
      method: "PUT",
      address: "localhost:3000/api/orders/return",
      data: '{\r\n    "orderId":"{{orderId}}}"\r\n}',
      headers: {
        Authorization: "{{tokenAdmin}}"
      }
    });
  });
}
