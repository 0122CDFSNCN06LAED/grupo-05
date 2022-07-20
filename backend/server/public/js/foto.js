/* //subir foto
const image_input = document.querySelector("#image_input");
image_input.addEventListener("change", function () {
  const reader = new FileReader();
  reader.addEventListener("load", () => {
    const uploaded_image = reader.result;
    document.querySelector(
      "#display_image"
    ).style.backgroundImage = `url(${uploaded_image})`;
  });
  reader.readAsDataURL(this.files[0]);
}); */

/* const http = require("http");
const options = {
  hostname: "localhost",
  port: 3000,
  path: "/uploadFile",
  method: "POST",
};

const req = http.request(options, (res) => {
  console.log(`status code: ${res.statusCode}`);
  console.log(`header: ${res.headers}`);
});

function file() {
  try {
    req.on("error", (err) => {});
    req.end();
  } catch (error) {
    console.log(error);
  }
} */

const sendHttpRequest = (method, url, data) => {
  const promise = new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open(method, url);

    xhr.responseType = "json";

    if (data) {
      xhr.setRequestHeader("Content-Type", "application/json");
    }

    xhr.onload = () => {
      if (xhr.status >= 400) {
        reject(xhr.response);
      } else {
        resolve(xhr.response);
      }
    };

    xhr.onerror = () => {
      reject("Something went wrong!");
    };

    xhr.send(JSON.stringify(data));
  });
  return promise;
};

const file = () => {
  sendHttpRequest("GET", "http://localhost:3000/mailbox").then(
    (responseData) => {
      console.log(responseData);
    }
  );
};

const files = () => {
  console.log("noooooooooooo");
  sendHttpRequest("POST", "https://localhost:3000/uploadFile", {
    file: "C:\\Users\\ramiro\\Pictures\\707674-MLA42182589961_062020-F.jpg",
  })
    .then((responseData) => {
      console.log(responseData, "ñeeeeeeeeeeeeee");
    })
    .catch((err) => {
      console.log(err);
    });
};
