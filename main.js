let form = document.querySelector("form"),
  fName = document.getElementById("first-name"),
  lName = document.getElementById("last-name"),
  mail = document.getElementById("email-address"),
  qGeneral = document.getElementById("query-general"),
  qSupp = document.getElementById("query-support"),
  msg = document.getElementById("msg"),
  contacted = document.getElementById("contacted"),
  successedComponent = document.querySelector(".succeeded-component"),
  data = {};
const NAME_regEx = /^[A-Za-z]+$/;
const MAIL_regEx = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
const createErrMsg = (el, msg = "This Field is required") => {
  let p = document.createElement("p");
  p.textContent = msg;
  p.classList.add("err-msg")
  el.parentNode.appendChild(p);
}
const nameValidation = () => {
  if (!fName.value) {
    createErrMsg(fName)
    fName.style.border = "1px solid #d73c3c"
    data.firstName = "";
  } else if (!fName.value.match(NAME_regEx)) {
    createErrMsg(fName, "Please enter a valid name")
    fName.style.border = "1px solid #d73c3c"
    data.firstName = "";
  } else {
    fName.style.border = "1px solid #0c7d69"
    data.firstName = fName.value;
  }
  if (!lName.value) {
    createErrMsg(lName)
    lName.style.border = "1px solid #d73c3c";
    data.lastName = "";
  } else if (!lName.value.match(NAME_regEx)) {
    createErrMsg(lName, "Please enter a valid Name")
    lName.style.border = "1px solid #d73c3c";
    data.lastName = "";
  } else {
    lName.style.border = "1px solid #0c7d69"
    data.lastName = lName.value;
  }
}
const emailValidation = () => {
  if (!mail.value) {
    createErrMsg(mail)
    mail.style.border = "1px solid #d73c3c";
    data.email = ""
  } else if (!mail.value.match(MAIL_regEx)) {
    createErrMsg(mail, "Please enter a valid email address")
    mail.style.border = "1px solid #d73c3c";
    data.email = ""
  } else {
    mail.style.border = "1px solid #0c7d69"
    data.email = mail.value;
  }
}
const queryValidation = () => {
  if (qGeneral.checked) {
    data.selectedQuery = "general enquiry"
  } else if (qSupp.checked) {
    data.selectedQuery = "support request"
  } else {
    createErrMsg(qGeneral.parentNode, "Please select a query type")
    data.selectedQuery = ""
  }
}
const msgAndAgreedValidation = () => {
  if (!msg.value) {
    createErrMsg(msg)
    msg.style.border = "1px solid #d73c3c";
    data.message = ""
  } else {
    msg.style.border = "1px solid #0c7d69"
    data.message = msg.value
  }
  if (!contacted.checked) {
    createErrMsg(contacted, "To submit this form, please consent to being contacted")
    data.agreeForContact = "";
  } else {
    data.agreeForContact = "agree to being contacted "
  }
}

qGeneral.addEventListener("change", () => {
  qGeneral.parentNode.style.backgroundColor = "#dff1e7"
  qSupp.parentNode.style.backgroundColor = "#fff"
})
qSupp.addEventListener("change", () => {
  qSupp.parentNode.style.backgroundColor = "#dff1e7"
  qGeneral.parentNode.style.backgroundColor = "#fff"
})

const resetForm = () => {
  const errMsg = document.querySelectorAll(".err-msg")
  errMsg.forEach(msg => {
    msg.remove()
  });
  qSupp.parentNode.style.backgroundColor = "#fff"
  qGeneral.parentNode.style.backgroundColor = "#fff"
  form.reset()
}
form.addEventListener("submit", (e) => {
  e.preventDefault();
  nameValidation();
  emailValidation();
  queryValidation();
  msgAndAgreedValidation();

  for (const key in data) {
    if (data[key] === "") {
      return successedComponent.classList.remove("success")
    }
  }
  resetForm();
  return successedComponent.classList.add("success")
})
