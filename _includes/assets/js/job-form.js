// document.addEventListener("DOMContentLoaded", function () {
//   let currentStep = 1;
//   const totalSteps = 3;

//   function updateProgress() {
//     document.getElementById("form-progress").style.width =
//       `${(currentStep / totalSteps) * 100}%`;
//     document.getElementById("current-step").textContent = currentStep;
//   }

//   function showStep(step) {
//     // Hide all steps
//     document
//       .querySelectorAll(".form-step")
//       .forEach((el) => (el.style.display = "none"));
//     // Show current step
//     document.getElementById(`step-${step}`).style.display = "block";

//     // Update buttons
//     const prevBtn = document.getElementById("prev-btn");
//     const nextBtn = document.getElementById("next-btn");
//     const submitBtn = document.getElementById("submit-btn");

//     prevBtn.style.display = step === 1 ? "none" : "block";
//     nextBtn.style.display = step === totalSteps ? "none" : "block";
//     submitBtn.style.display = step === totalSteps ? "block" : "none";

//     updateProgress();

//     if (step === 3) {
//       updatePreview();
//     }
//   }

//   function updatePreview() {
//     document.getElementById("preview-name").textContent =
//       document.getElementById("name").value;
//     document.getElementById("preview-email").textContent =
//       document.getElementById("email").value;
//     document.getElementById("preview-phone").textContent =
//       document.getElementById("phone").value;
//     document.getElementById("preview-cv").textContent =
//       document.getElementById("cv").files[0]?.name || "No file selected";
//     document.getElementById("preview-cover-letter").textContent =
//       document.getElementById("cover-letter").value ||
//       "No cover letter provided";
//   }

//   function validateCurrentStep() {
//     const currentStepEl = document.getElementById(`step-${currentStep}`);
//     const inputs = currentStepEl.querySelectorAll(
//       "input[required], textarea[required]",
//     );
//     let isValid = true;

//     inputs.forEach((input) => {
//       if (!input.value || (input.type === "email" && !input.validity.valid)) {
//         isValid = false;
//         input.classList.add("error");

//         // Remove existing error message if any
//         const existingError =
//           input.parentElement.querySelector(".error-message");
//         if (existingError) existingError.remove();

//         // Add error message
//         const errorMessage = document.createElement("div");
//         errorMessage.className = "error-message";
//         errorMessage.textContent =
//           input.type === "email"
//             ? "Please enter a valid email address"
//             : `${input.placeholder} is required`;
//         input.parentElement.appendChild(errorMessage);
//       } else {
//         input.classList.remove("error");
//         const existingError =
//           input.parentElement.querySelector(".error-message");
//         if (existingError) existingError.remove();
//       }
//     });

//     return isValid;
//   }

//   // Event Listeners
//   document.getElementById("next-btn").addEventListener("click", () => {
//     if (validateCurrentStep()) {
//       currentStep++;
//       showStep(currentStep);
//     }
//   });

//   document.getElementById("prev-btn").addEventListener("click", () => {
//     currentStep--;
//     showStep(currentStep);
//   });

//   // Clear errors on input
//   document.querySelectorAll("input, textarea").forEach((input) => {
//     input.addEventListener("input", () => {
//       input.classList.remove("error");
//       const existingError = input.parentElement.querySelector(".error-message");
//       if (existingError) existingError.remove();
//     });
//   });

//   // Initialize
//   showStep(1);
// });
