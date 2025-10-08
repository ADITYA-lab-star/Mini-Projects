// RANDOM PASSWORD GENERATOR

function generatePassword(
  length,
  includeLowercase,
  includeUppercase,
  includeNumbers,
  includeSymbols
) {
  const lowercaseChars = "abcdefghijklmnopqrstuvwxyz";
  const uppercaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const numberChars = "0123456789";
  const symbolChars = "!@#$%^&*(){}/?:%_[]+-=";

  let allowedChars = "";
  let password = "";

  allowedChars += includeLowercase ? lowercaseChars : "";
  allowedChars += includeUppercase ? uppercaseChars : "";
  allowedChars += includeNumbers ? numberChars : "";
  allowedChars += includeSymbols ? symbolChars : "";

  if (length <= 0) {
    return null;
  }
  if (allowedChars.length === 0) {
    return null;
  }

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * allowedChars.length);
    password += allowedChars[randomIndex];
  }

  return password;
}

// --- Taking input from user ---
// Support both browser (prompt/confirm/alert) and Node.js (readline) environments.
(async function main() {
  const isBrowser =
    typeof prompt === "function" &&
    typeof confirm === "function" &&
    typeof alert === "function";

  if (isBrowser) {
    const passwordLengthRaw = prompt("Enter password length:");
    const passwordLength = Number.isFinite(Number(passwordLengthRaw))
      ? parseInt(passwordLengthRaw, 10)
      : NaN;

    if (!Number.isInteger(passwordLength) || passwordLength < 1) {
      alert("Invalid password length. Please provide an integer >= 1.");
      return;
    }

    const includeLowercase = confirm("Include lowercase letters?");
    const includeUppercase = confirm("Include uppercase letters?");
    const includeNumbers = confirm("Include numbers?");
    const includeSymbols = confirm("Include symbols?");

    const password = generatePassword(
      passwordLength,
      includeLowercase,
      includeUppercase,
      includeNumbers,
      includeSymbols
    );

    if (!password) {
      alert("Failed to generate password. Check your options.");
    } else {
      console.log(`Generated password: ${password}`);
      alert(`Generated password: ${password}`);
    }

    return;
  }

  // Node.js fallback using readline
  const readline = require("readline");
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  const question = (q) =>
    new Promise((res) => rl.question(q, (ans) => res(ans)));

  try {
    const passwordLengthRaw = await question("Enter password length: ");
    const passwordLength = Number.isFinite(Number(passwordLengthRaw))
      ? parseInt(passwordLengthRaw, 10)
      : NaN;

    if (!Number.isInteger(passwordLength) || passwordLength < 1) {
      console.error("Invalid password length. Please provide an integer >= 1.");
      rl.close();
      return;
    }

    const askConfirm = async (msg) => {
      const ans = (await question(msg + " (y/n): ")).trim().toLowerCase();
      return ans === "y" || ans === "yes";
    };

    const includeLowercase = await askConfirm("Include lowercase letters?");
    const includeUppercase = await askConfirm("Include uppercase letters?");
    const includeNumbers = await askConfirm("Include numbers?");
    const includeSymbols = await askConfirm("Include symbols?");

    const password = generatePassword(
      passwordLength,
      includeLowercase,
      includeUppercase,
      includeNumbers,
      includeSymbols
    );

    if (!password) {
      console.error("Failed to generate password. Check your options.");
    } else {
      console.log(`Generated password: ${password}`);
    }
  } finally {
    rl.close();
  }
})();
