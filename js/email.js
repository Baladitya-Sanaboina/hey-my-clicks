// email.js

(function () {
  emailjs.init("THFL48zK1pQCUGNdt"); // Replace with your EmailJS Public Key
})();

document
  .querySelector(".fotofly_fn_contactsendbtn")
  .addEventListener("click", function (e) {
    e.preventDefault();

    // Hide previous messages
    document.querySelector(".empty_notice").style.display = "none";
    document.querySelector(".returnmessage").style.display = "none";

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const subject = document.getElementById("subject").value.trim();
    const message = document.getElementById("message").value.trim();

    // Validation
    if (!name || !email || !subject || !message) {
      document.querySelector(".empty_notice").style.display = "block";
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      document.querySelector(".empty_notice").innerHTML =
        "<span>Please enter a valid email address</span>";
      document.querySelector(".empty_notice").style.display = "block";
      return;
    }

    // Show loading state
    const sendBtn = document.querySelector(".fotofly_fn_contactsendbtn");
    const originalValue = sendBtn.value;
    sendBtn.value = "Sending...";
    sendBtn.disabled = true;

    const templateParams = {
      from_name: name,
      from_email: email,
      subject: subject,
      message: message,
    };

    emailjs.send("service_hn49tdf", "template_0d31vae", templateParams).then(
      function (response) {
        console.log("SUCCESS!", response.status, response.text);
        document.querySelector(".returnmessage").innerHTML =
          "Your message has been received, We will contact you soon.";
        document.querySelector(".returnmessage").style.display = "block";
        document.getElementById("contact_form").reset();

        // Reset button
        sendBtn.value = originalValue;
        sendBtn.disabled = false;
      },
      function (error) {
        console.error("FAILED...", error);
        document.querySelector(".empty_notice").innerHTML =
          "<span>Failed to send message. Please try again.</span>";
        document.querySelector(".empty_notice").style.display = "block";

        // Reset button
        sendBtn.value = originalValue;
        sendBtn.disabled = false;
      }
    );
  });
