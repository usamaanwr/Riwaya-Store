const reg_Name = document.getElementById("register_name");
const reg_Email = document.getElementById("register_email");
const reg_phone = document.getElementById("register_number");
const reg_Password = document.getElementById("register_password");

const nameError = document.getElementById("nameError");
const emailError = document.getElementById("emailError");
const phoneError = document.getElementById("phoneError");
const passwordError = document.getElementById("passwordError");
let users = JSON.parse(localStorage.getItem("users")) || [];

function isUserSignUp() {
  nameError.innerText = "";
  emailError.innerText = "";
  phoneError.innerText = "";
  passwordError.innerText = "";
  let isValid = true;

  if (!reg_Name.value) {
    nameError.innerText = "name is required";
    isValid = false;
  }
  if (!reg_Email.value) {
    emailError.innerText = "email is required";
    isValid = false;
  }
  if (!reg_phone.value) {
    phoneError.innerText = "phone number is required";
    isValid = false;
  }
  if (!reg_Password.value) {
    passwordError.innerText = "password is required";
    isValid = false;
  }

  if (!isValid) {
    return;
  }
  // email validation
  const emailRegex = /^((?!\.)[\w-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/gim;
  if (!emailRegex.test(reg_Email.value)) {
    emailError.innerText = "Invalid email format";
    return;
  }

  const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
  if (!passwordRegex.test(reg_Password.value)) {
    passwordError.innerText =
      "Password must be at least 8 characters, include uppercase, lowercase & number";
    return;
  }

  for (let i = 0; i < users.length; i++) {
    if (users[i].email === reg_Email.value) {
      Swal.fire("Email already registered");
      return;
    }
  }
  const userObj = {
    name: reg_Name.value,
    email: reg_Email.value,
    phone: reg_phone.value,
    password: reg_Password.value,
  };
  users.push(userObj);
  localStorage.setItem("users", JSON.stringify(users));
  emptyInputValue(reg_Name, reg_Email, reg_phone, reg_Password);
  Swal.fire({
    icon: "success",
    html: "<b>Register Successful</b><br>Redirecting...",
    timer: 2500,
    timerProgressBar: true,
    showConfirmButton: false,
    didOpen: () => {
      Swal.showLoading();
    },
  });

  setTimeout(() => {
    window.location.href = "../HTML/login.html";
  }, 2500);
}

function emptyInputValue(name, email, password, phone) {
  for (let i = 0; i < arguments.length; i++) {
    arguments[i].value = "";
  }
}

function isUserSignIn() {
  users = JSON.parse(localStorage.getItem("users")) || [];
  const login_Email = document.getElementById("login_email");
  const login_password = document.getElementById("login_password");

  if (users.length === 0) {
    Swal.fire("No account found", "Please register first", "warning");
    return;
  }

  let flag = false;

  for (let i = 0; i < users.length; i++) {
    if (
      users[i].email === login_Email.value &&
      users[i].password === login_password.value
    ) {
      flag = true;
      localStorage.setItem("currentUser", JSON.stringify(users[i]));
      emptyInputValue();
      Swal.fire({
        html: "<b>Login Successful</b><br>Redirecting...",
        timer: 2500,
        timerProgressBar: true,
        showConfirmButton: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });

      setTimeout(() => {
        window.location.href = `../HTML/addtocart.html`;
      }, 2500);
    } else if (
      users[i].email === login_Email.value &&
      users[i].password !== login_password.value
    ) {
      flag = true;
      Swal.fire({
        icon: "error",
        title: "Password is Incorrect",
      });
      emptyInputValue(login_password)
      login_password.focus();
      break
      
    }
  }
  if (!flag) {
    Swal.fire("Please register first");
  }
}


const contactForm = document.getElementById("contactSubmited");

contactForm.addEventListener("submit", function(e){
  e.preventDefault(); // page reload nahi hoga

  // Optional: form reset
  contactForm.reset();

  // SweetAlert popup
  Swal.fire({
    icon: 'success',
    title: 'Message Sent!',
    text: 'Thank you! We will get back to you soon.',
    confirmButtonColor: '#007bff'
  });
});

// function isUserLogedIn() {
//   const email = document.getElementById("login_email");
//   const password = document.getElementById("login_password");
//   for (let i = 0; i < users.length; i++) {
//     if (
//       users[i].email === email.value &&
//       users[i].password === password.value
//     ) {
//       flag = true;
//       localStorage.setItem("currentUser", JSON.stringify(users[i]));
//       alert("login Succesfully");
//       emptyInputValue();
//       window.location.href = `/`;
//     } else if (
//       users[i].email === email.value &&
//       users[i].password !== password.value
//     ) {
//       flag = true;
//       alert("password is incorrect");
//       emptyInputValue(password);
//       password.focus();
//       return;
//     }
//   }
//   if (!flag) {
//     alert("please register first");
//     window.location.href = `register.html`;
//   }
// }
