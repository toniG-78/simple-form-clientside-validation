// INIT
const form = document.getElementById("form");
const usernameInput = document.getElementById("username");
const emailInput = document.getElementById("email");
const phoneInput = document.getElementById("phone");
const passwordInput = document.getElementById("password");
const c_passwordInput = document.getElementById("passwordconfirm");

let isvalid = false;

//SUBMIT EVENT LISTENER
form.addEventListener("submit", (e) => {
  if (!isvalid) {
    e.preventDefault();
    checkInputs();
  } else {
    Swal.fire({
      title: "Hello: " + username + ", form was submited!",
      text: "Do you want to continue",
      icon: "success",
      confirmButtonText: "Ok!",
    });
  }
  // Send form / show a succes message
});

// VALIDATION FUNCTION
const checkInputs = () => {
  const username = usernameInput.value.trim();
  const email = emailInput.value.trim();
  const phone = phoneInput.value.trim();
  const password = passwordInput.value;
  const c_password = c_passwordInput.value;

  // validate username
  if (username === "") {
    setErrorMsg(usernameInput, "Username cannot be blank");
  } else if (username.length <= 2) {
    setErrorMsg(usernameInput, "Username must have at lest 3 chars");
  } else {
    setSuccessMsg(usernameInput);
  }

  // validate email
  if (email === "") {
    setErrorMsg(emailInput, "Email cannot be blank");
  } else if (!isEmail(email)) {
    setErrorMsg(emailInput, "Email is not valid");
  } else {
    setSuccessMsg(emailInput);
  }

  // validate phone
  if (phone === "") {
    setErrorMsg(phoneInput, "Phone number cannot be blank");
  } else {
    setSuccessMsg(phoneInput);
  }

  // validate password
  if (password === "") {
    setErrorMsg(passwordInput, "Password cannot be blank");
  } else if (password.length < 6) {
    setErrorMsg(passwordInput, "At least 6 chars");
  } else {
    setSuccessMsg(passwordInput);
  }

  // validate confirm password
  if (c_password === "") {
    setErrorMsg(c_passwordInput, "Password cannot be blank");
  } else if (c_password !== password) {
    setErrorMsg(c_passwordInput, "Password don't match");
  } else {
    setSuccessMsg(c_passwordInput);
  }

  //AFTER SUBMIT CHECK IF ALL IMPUTS ARE CORRECT BEFORE SUBMIT DATA TO THE SERVER
  successSubmit(username);
};

//VALIDATE EMAIL PATTERN
const isEmail = (email) => {
  let atSymbol = email.indexOf("@");
  if (atSymbol < 1) return false;
  let dot = email.lastIndexOf(".");
  if (dot <= atSymbol + 2) return false;
  if (dot === email.length - 1) return false;
  return true;
};
//TODO: validate phone and password , show strong password info

function setErrorMsg(input, message) {
  const formControl = input.parentElement;
  const small = formControl.querySelector("small");
  small.innerText = message;
  formControl.className = "form-control error";
}

function setSuccessMsg(input) {
  const formControl = input.parentElement;
  formControl.className = "form-control success";
}

// CHECK IF ALL INPUTS ARE CORRECT
function successSubmit(username) {
  let formControl = document.querySelectorAll(".form-control");

  let count = formControl.length - 1;
  for (let i = 0; i < formControl.length; i++) {
    if (formControl[i].className === "form-control success") {
      let sRate = 0 + i;
      console.log(sRate);
      sendData(username, sRate, count);
    } else {
      return false; //will not submit data
    }
  }
}

// SUBMIT DATA TO SERVER
const sendData = (username, sRate, count) => {
  if (sRate === count) {
    isvalid = true;
  }
};
