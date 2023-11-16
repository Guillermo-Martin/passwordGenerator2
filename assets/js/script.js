// ---------- Checkbox functionality ----------
let checklist = document.querySelector(".checklist");
let checklistItems = document.querySelectorAll(".checklist-item")
let lowercaseLetters = document.getElementById("lowercase-letters");
let uppercaseLetters = document.getElementById("uppercase-letters");
let numbersBox = document.getElementById("numbers");
let specialCharacters = document.getElementById("special-characters");
let createPasswordBtn = document.getElementById("create-password");
let passwordLengthInput = document.getElementById("pw-length");
let passwordBox = document.querySelector(".password-box");
let newPasswordBtn = document.getElementById("new-password");
let optionsWarning = document.querySelector(".option-warning");
let lengthWarning = document.querySelector(".length-warning");

// console.log("line 13", numbers);
// console.log(optionsWarning);

// ----------------------------------------------------------------


// create password function
createPasswordBtn.addEventListener("click", () => {
  console.log("let's create a password!");
  // password options
  let passwordOptions = {};
  let passwordLength = passwordLengthInput.value;
  let optionsFalse = 0;
  
  // final password
  let finalPassword = "";

  // functions to create a password
  function lowercase() {
    var randomNum = Math.floor(Math.random() * letters.length);
    var randomL = letters[randomNum];
    finalPassword = finalPassword + randomL;
  }

  function uppercase() {
    var randomNum = Math.floor(Math.random() * letters.length);
    var randomU = letters[randomNum].toUpperCase();
    finalPassword = finalPassword + randomU;
  }

  function number() {
    var randomNum = Math.floor(Math.random() * numbers.length);
    var randomN = numbers[randomNum];
    finalPassword = finalPassword + randomN;
  }

  function specialCharactersFunc() {
    var randomNum = Math.floor(Math.random() * special.length);
    var randomS = special[randomNum];
    finalPassword = finalPassword + randomS;
  }





  // 1. check which boxes are checked and update the passwordOptions object
  for(let i = 0; i < checklistItems.length; i++) {
    // update the object keys with the check status
    passwordOptions[checklistItems[i].id] = checklistItems[i].checked;
  }

  
  console.log(passwordOptions);
  console.log("line 31", passwordLength);

  
  // 2. when button is clicked, check to see if at least one box was selected, check to see if length is within range
  // loop through the object and see if everything is false
  for(let key in passwordOptions) {
    // if an option is false, add it to the "optionsFalse" variable
    if(`${passwordOptions[key]}` === 'false') {
      optionsFalse++
    }
  }

  // if optionsFalse equals 4 (meaning no options were checked), warn user
  if(optionsFalse === 4) {
    // alert("you must select at least one option!");
    optionsWarning.textContent = "You must select at least one option!";
  }

  // check to see if the number is between 8 and 128
  if(passwordLength < 8 || passwordLength > 128) {
    // warn user and don't create a password
    // alert("please pick a number between 8 and 128!");
    lengthWarning.textContent = "Please pick a number between 8 and 128!";
  } else {
    // create a password
    // 3. use these to create a password using the functions below
    for(let j = 0; j < passwordLength; j++) {
      // Generate random lowercase letter based on prompt
      if (passwordOptions["lowercase-letters"] && finalPassword.length < passwordLength) {
        var letters = "abcdefghijklmnopqrstuvwxyz";
        lowercase();
      }

      // // Generate random uppercase letter based on prompt
      if (passwordOptions["uppercase-letters"] && finalPassword.length < passwordLength) {
        var letters = "abcdefghijklmnopqrstuvwxyz";
        uppercase();
      }

      // Generate random number based on prompt
      if (passwordOptions["numbers"] && finalPassword.length < passwordLength) {
        var numbers = "1234567890";
        number();
      }

      // Generate random special based on prompt
      if (passwordOptions["special-characters"] && finalPassword.length < passwordLength) {
        var special = " !\"#$%&'()*+,-./:;<=>?@[\\]^_`{|}~";
        specialCharactersFunc();
      }
    }

  }

  // display password to the user
  passwordBox.textContent = finalPassword;
  console.log("final password", finalPassword, finalPassword.length);

  // show the "Create new password" button when a password is shown, hide the "Create password"
  if(finalPassword.length !== 0) {
    createPasswordBtn.classList.add("hide");
    newPasswordBtn.classList.add("show");

    // NEXT STEP *** disable inputs of checkboxes and number input
    lowercaseLetters.disabled = true;
    uppercaseLetters.disabled = true;
    numbersBox.disabled = true;
    specialCharacters.disabled = true;
    passwordLengthInput.disabled = true;
  }
});

// ---------------------------------------------------------------
// when you click on any of the options, see if the warning message is showing

// ----------------------------------------------------------------

newPasswordBtn.addEventListener("click", () => {
  // alert("hello!");
  // when you click the new password button, reset the password options object
  passwordOptions = {};
  

  // remove checkmarks from boxes
  lowercaseLetters.checked = false;
  uppercaseLetters.checked = false;
  numbers.checked = false;
  specialCharacters.checked = false;

  // remove the value from the number input
  passwordLengthInput.value = "";

  // remove the password
  passwordBox.textContent = "";

  // show the "Create password button"
  createPasswordBtn.classList.remove("hide");

  // hide the "Create another password" button
  newPasswordBtn.classList.remove("show");

  console.log(passwordOptions);

  // enable all the inputs
  lowercaseLetters.disabled = false;
  uppercaseLetters.disabled = false;
  numbersBox.disabled = false;
  specialCharacters.disabled = false;
  passwordLengthInput.disabled = false;
});



// check to see if the warning message is there
for(let k = 0; k < checklistItems.length; k++) {
  checklistItems[k].addEventListener("click", () => {
    // alert("you clicked on an option!");
    console.log(optionsWarning.textContent, "line 186");
    if(optionsWarning.textContent === "You must select at least one option!"){
      optionsWarning.textContent = "";
    }
  });
};


// NEXT STEPS -
// replace alerts with warning messages
// add a copy function