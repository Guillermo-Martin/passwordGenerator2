// ---------- Checkbox functionality ----------
let checklist = document.querySelector(".checklist");
let checklistItems = document.querySelectorAll(".checklist-item")
let lowercaseLetters = document.getElementById("lowercase-letters");
let uppercaseLetters = document.getElementById("uppercase-letters");
let numbers = document.getElementById("numbers");
let specialCharacters = document.getElementById("special-characters");
let createPaswordBtn = document.getElementById("create-password");
let passwordLengthInput = document.getElementById("password-length");


// ----------------------------------------------------------------


// create password function
createPaswordBtn.addEventListener("click", () => {
  console.log("let's create a password!");
  // password options
  let passwordOptions = {};
  let passwordLength = passwordLengthInput.value;

  // 1. check which boxes are checked and update the passwordOptions object
  for(let i = 0; i < checklistItems.length; i++) {
    // update the object keys with the check status
    passwordOptions[checklistItems[i].id] = checklistItems[i].checked;
  }

  // 2. get the boolean values from the passwordOptions object
  console.log(passwordOptions);

  // 3.  get the length value
  console.log("line 31", passwordLength);

  // 4. use these to create a password using the functions below
});


// ----------------------------------------------------------------





// Assignment Code
var generateBtn = document.querySelector("#generate");

// Write password to the #password input
function writePassword() {

  // ===== Prompts for the user =====

  // Getting the length of the password
  var askLength = parseInt(prompt("How many characters do you want your password to be? (Password must be between 8 and 128 characters.)"));

  // Checking to see if something is a number:  https://mkyong.com/javascript/check-if-variable-is-a-number-in-javascript/
  // This code will check to see if a number not between 8 and 128 was entered or a letter was entered.
  if (askLength < 8 || askLength > 128 || isNaN(askLength) === true) {
    while (askLength < 8 || askLength > 128 || isNaN(askLength) === true) {
      alert("That's not a valid number.");
      askLength = parseInt(prompt("Please enter a number between 8 and 128."));
    }
  }

  var lowerCase = confirm("Do you want lowercase letters?");
  var upperCase = confirm("Do you want uppercase letters?");
  var numeric = confirm("Do you want numeric characters?");
  var specialChar = confirm("Do you want special characters?");


  // Empty string for password to go in
  var finalPassword = "";

  // ===== Generators for letters, numbers, and specials based off user input =====
  for (let i = 0; i <= askLength; i++) {
    // Generate random lowercase letter based on prompt
    if (lowerCase && finalPassword.length !== askLength) {
      var letters = "abcdefghijklmnopqrstuvwxyz";
      lowercase();
    }

    // Generate random uppercase letter based on prompt
    if (upperCase && finalPassword.length !== askLength) {
      var letters = "abcdefghijklmnopqrstuvwxyz";
      uppercase();
    }

    // Generate random number based on prompt
    if (numeric && finalPassword.length !== askLength) {
      var numbers = "1234567890";
      number();
    }

    // Generate random special based on prompt
    if (specialChar && finalPassword.length !== askLength) {
      var special = " !\"#$%&'()*+,-./:;<=>?@[\\]^_`{|}~";
      specialCharacters();
    }
  }

  // Give password
  alert("Here is your password:  " + finalPassword);

  // ===== Functions for generating random letters, numbers, and characters =====

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

  function specialCharacters() {
    var randomNum = Math.floor(Math.random() * special.length);
    var randomS = special[randomNum];
    finalPassword = finalPassword + randomS;
  }

  // var password = generatePassword();

  // ===== This is the text box =======

  var passwordText = document.querySelector("#password");

  passwordText.value = finalPassword;

}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);