async function addNewuser() {
    try {
      const mail = document.getElementById("userEmail").value;
      const password = document.getElementById("userPassword").value;
      const responseName = await axios.post("http://localhost:3000/login", {
        mail: mail,
        password: password,
      });
  
      console.log("Response from server:", responseName.data);
      const data = responseName.data;
      console.log("send the data", data);
      
      if (data == "not found"){
        let responseError = document.getElementById("responseError");
        responseError.innerHTML = "שם משתמש או סיסמה לא נכונים"
      }

      if (responseName.data.redirect) {
        window.location.href = responseName.data.redirect;
        console.log(responseName)
    }


    } catch (error) {
      console.error("Error occurred:", error.message);
    }
  }

  async function postFullName() {
    const fullName = document.getElementById("fullName").value
    if (fullName.length < 3 || IsValidFullName(fullName) == false) {
        console.log("thats not good")
        const error = document.getElementById("errorMessage")
        error.innerHTML = "This name is not valid!"
    }
    else {
        const error = document.getElementById("errorMessage")
        error.innerHTML = ""
        const response = await axios.post("http://localhost:3000/name", { name: fullName })
        if (response.data.redirect) {
          window.location.href = response.data.redirect;
            console.log(response)
        }
    }
}

async function register() {
    let allDetailsConfirmed = true;
    const userName = document.getElementById("newUsername").value
    const mail = document.getElementById("newMail").value
    const password = document.getElementById("newPassword").value
    const confirmMail = document.getElementById("mailError")

    if (password.length < 8 ) {
        const passwordError = document.getElementById("passwordError")
        passwordError.innerHTML = "הסיסמה חייבת להיות באורך של לפחות 8 ספרות"
        allDetailsConfirmed = false
    } else passwordError.innerHTML = ""

    if (userName.includes(" ") || userName.length < 4) {
        const usernameError = document.getElementById("usernameError")
        usernameError.innerHTML = "שם המשתמש לא תקין"
        allDetailsConfirmed = false
    } else usernameError.innerHTML = ""

    if (mail.indexOf("@") == -1){
        confirmMail.innerHTML = "כתובת המייל לא תקינה"
        allDetailsConfirmed = false
    } else confirmMail.innerHTML = ""

    if (allDetailsConfirmed == true) {
        const checkMail = await axios.post("http://localhost:3000/signup", {mail: mail})
        console.log(checkMail)
        if (checkMail.data == "user already exist"){
          const confirmMail = document.getElementById("mailError")
          confirmMail.innerHTML = "כתובת המייל כבר רשומה במערכת"

        }

        if (checkMail.data.redirect) {
            window.location.href = checkMail.data.redirect;
            const registerNewUsername = await axios.post("http://localhost:3000/success", {name: userName, mail: mail, password: password })
            console.log(registerNewUsername)
        }
    }
}

async function getCars() {
  // const selectedValue = document.getElementById("sortResults")
  // if (selectedValue.value = "0"){
  const carList = await axios.get("http://localhost:3000/home")
  const data = carList.data
    const resultCounter = document.getElementById("resultsCounter")
    resultCounter.innerHTML = "תוצאות החיפוש: נמצאו " + data.length + " תוצאות"
  data.forEach((element, index, arr) => {
    const newContainer = document.createElement("div")
    const nameDiv = document.createElement("p");
    nameDiv.innerHTML = "יצרן: " + arr[index].name
    const typeDiv = document.createElement("p")
    typeDiv.innerHTML = "דגם: " + arr[index].type
    const modelDiv = document.createElement("p")
    modelDiv.innerHTML = "שנה: " + arr[index].model
    const priceDiv = document.createElement("p")
    priceDiv.innerHTML = "מחיר: " + arr[index].price + ' ש"ח'
    const imgCar = document.createElement("img")
    imgCar.src = arr[index].picture
    imgCar.style.width = "250px"
    imgCar.style.border = "1px solid black"
    const link = document.createElement('a');
    link.innerHTML = "לרכישה"
    link.id = "link"
    link.href = "http://127.0.0.1:5500/" + arr[index].specialid
    const container = document.getElementById("container");
    container.appendChild(newContainer)
    newContainer.appendChild(nameDiv)
    newContainer.appendChild(typeDiv)
    newContainer.appendChild(modelDiv)
    newContainer.appendChild(priceDiv)
    newContainer.appendChild(imgCar)
    newContainer.appendChild(link)
  });
}