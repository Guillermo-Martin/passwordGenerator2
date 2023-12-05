// ---------- Elements ----------
let checklist = document.querySelector(".checklist");
let checklistItems = document.querySelectorAll(".checklist-item");
let copyMsg = document.querySelector(".copy-message");
let createPasswordBtn = document.getElementById("create-password");
let lengthWarning = document.querySelector(".length-warning");
let lowercaseLetters = document.getElementById("lowercase-letters");
let newPasswordBtn = document.getElementById("new-password");
let numbersBox = document.getElementById("numbers");
let optionsWarning = document.querySelector(".option-warning");
let passwordBox = document.querySelector(".password-box");
let passwordLengthInput = document.getElementById("pw-length");
let specialCharacters = document.getElementById("special-characters");
let uppercaseLetters = document.getElementById("uppercase-letters");

// ---------- Create password function ----------
createPasswordBtn.addEventListener("click", () => {
  // final password
  let finalPassword = "";
  // password options
  let optionsFalse = 0;
  let passwordOptions = {};
  let passwordLength = passwordLengthInput.value;

  // functions to create a password
  let lowercase = () => {
    let randomNum = Math.floor(Math.random() * letters.length);
    let randomL = letters[randomNum];
    finalPassword = finalPassword + randomL;
  }

  let uppercase = () => {
    let randomNum = Math.floor(Math.random() * letters.length);
    let randomU = letters[randomNum].toUpperCase();
    finalPassword = finalPassword + randomU;
  }

  let number = () => {
    let randomNum = Math.floor(Math.random() * numbers.length);
    let randomN = numbers[randomNum];
    finalPassword = finalPassword + randomN;
  }

  let specialCharactersFunc = () => {
    let randomNum = Math.floor(Math.random() * special.length);
    let randomS = special[randomNum];
    finalPassword = finalPassword + randomS;
  }

  // 1. check which boxes are checked and update the passwordOptions object
  for(let i = 0; i < checklistItems.length; i++) {
    // update the object keys with the check status
    passwordOptions[checklistItems[i].id] = checklistItems[i].checked;
  }

  // 2. when button is clicked, check to see if at least one box was selected,
  // loop through the object and see if everything is false
  for(let key in passwordOptions) {
    // if an option is false, add it to the "optionsFalse" variable
    if(`${passwordOptions[key]}` === 'false') {
      optionsFalse++;
    }
  }

  // if optionsFalse equals 4 (meaning no options were checked), warn user
  if(optionsFalse === 4) {
    optionsWarning.textContent = "You must select at least one option!";
  }

  // 3.  check to see if the password length is between 8 and 128
  if(passwordLength < 8 || passwordLength > 128) {
    // if not, warn user and don't create a password
    lengthWarning.textContent = "Please pick a number between 8 and 128!";
  } else {
    // 4. otherwise, create a password using the functions below
    for(let j = 0; j < passwordLength; j++) {
      // Generate random lowercase letter based on prompt
      if (passwordOptions["lowercase-letters"] && finalPassword.length < passwordLength) {
        var letters = "abcdefghijklmnopqrstuvwxyz";
        lowercase();
      }

      // Generate random uppercase letter based on prompt
      if(passwordOptions["uppercase-letters"] && finalPassword.length < passwordLength) {
        var letters = "abcdefghijklmnopqrstuvwxyz";
        uppercase();
      }

      // Generate random number based on prompt
      if(passwordOptions["numbers"] && finalPassword.length < passwordLength) {
        var numbers = "1234567890";
        number();
      }

      // Generate random special based on prompt
      if(passwordOptions["special-characters"] && finalPassword.length < passwordLength) {
        var special = " !\"#$%&'()*+,-./:;<=>?@[\\]^_`{|}~";
        specialCharactersFunc();
      }
    }
  }

  // 5.  display password to the user
  passwordBox.textContent = finalPassword;

  // 6.  show the "Create new password" button when a password is shown, hide the "Create password" button
  if(finalPassword.length !== 0) {
    createPasswordBtn.classList.add("hide");
    newPasswordBtn.classList.add("show");

    // 7.  disable inputs of checkboxes and number input to prevent user from interacting
    lowercaseLetters.disabled = true;
    uppercaseLetters.disabled = true;
    numbersBox.disabled = true;
    specialCharacters.disabled = true;
    passwordLengthInput.disabled = true;

    // 8.  show the copy message so user knows they can copy the password
    copyMsg.textContent = "Tap or click the box to copy your password!";
  }
});

// ---------- Create new password functionality ----------
newPasswordBtn.addEventListener("click", () => {
  // 1. when you click the new password button, reset the password options object
  passwordOptions = {};
  
  // 2. remove checkmarks from boxes
  lowercaseLetters.checked = false;
  uppercaseLetters.checked = false;
  numbers.checked = false;
  specialCharacters.checked = false;

  // 3. remove the value from the number input
  passwordLengthInput.value = "";

  // 4. remove the password
  passwordBox.textContent = "";

  // 5. show the "Create password button"
  createPasswordBtn.classList.remove("hide");

  // 6. hide the "Create another password" button
  newPasswordBtn.classList.remove("show");

  // 7. enable all the inputs
  lowercaseLetters.disabled = false;
  uppercaseLetters.disabled = false;
  numbersBox.disabled = false;
  specialCharacters.disabled = false;
  passwordLengthInput.disabled = false;

  // 8. remove copy message
  copyMsg.textContent = "";
});


// Checkbox functionality with warning message - check to see if the warning message is there.
// if so, remove message after clicking on a checkbox
for(let k = 0; k < checklistItems.length; k++) {
  checklistItems[k].addEventListener("click", () => {
    if(optionsWarning.textContent === "You must select at least one option!"){
      optionsWarning.textContent = "";
    }
  });
};

// Length functionality with warning message - check to see if the warning messsage is there.
// if so, remove message after clicking on the length input
passwordLengthInput.addEventListener("click", () => {
  if(lengthWarning.textContent === "Please pick a number between 8 and 128!") {
    lengthWarning.textContent = "";
  }
});

// ---------- Copy functionality ----------
passwordBox.addEventListener("click", () => {
  if(passwordBox.textContent) {
    // copy functionality:  https://stackoverflow.com/questions/63033012/copy-the-text-to-the-clipboard-without-using-any-input
    navigator.clipboard.writeText(passwordBox.textContent)
    .then(() => {
      // alert user their password was copied
      copyMsg.textContent = "Copied!";

      // change the copy message back to the original message after 1 second
      setTimeout(() => {
        copyMsg.textContent = "Tap or click the box to copy your password!";
      }, 1000);
    })
    .catch((error) => {
      console.error(`Could not copy text: ${error}`);
    });
  }
});
