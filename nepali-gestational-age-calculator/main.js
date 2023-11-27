import "./style.css";
import { adToBs, bsToAd } from "@sbmdkl/nepali-date-converter";

const submitBtn = document.querySelector("#submitBtn");

function calculateAge(adDate) {
  // Get today's date in AD format
  const today = new Date();
  const todaysYear = today.getFullYear();
  const todaysMonth = today.getMonth() + 1; // Months are zero-indexed
  const todaysDay = today.getDate();

  // Convert today's date to AD format
  const todaysDateAD = `${todaysYear}-${todaysMonth}-${todaysDay}`;

  // Calculate age in weeks and days
  const conceptionDate = new Date(adDate);
  const todaysDate = new Date(todaysDateAD);
  const ageInMilliseconds = todaysDate - conceptionDate;
  const ageInDays = Math.floor(ageInMilliseconds / (1000 * 60 * 60 * 24));
  const ageInWeeks = Math.floor(ageInDays / 7);
  const remainingDays = ageInDays % 7;

  // Display the calculated age
  const result = `Gestational Age: ${ageInWeeks} week(s), ${remainingDays} day(s)`;
  return result;
}

try {
  submitBtn.addEventListener("click", () => {
    const bsConceptionDate = document.querySelector("#bsConceptionDate");
    const bsDate = bsConceptionDate.value;

    try {
      // Attempt to convert the date from Bikram Sambat (BS) to Anno Domini (AD)
      const adDate = bsToAd(bsDate);
      console.log(adDate);

      // If successful, calculate age and display the result
      const ageResult = calculateAge(adDate);
      const resultContainer = document.querySelector("#result");
      resultContainer.innerHTML = ageResult;
    } catch (conversionError) {
      // If there's an error in the conversion, alert the user with the error message
      alert(`Date conversion error: ${conversionError.message}`);
    }
  });
} catch (error) {
  // Catch any other errors that might occur outside the date conversion
  alert(error.message);
}
