// Button Interaction

document.getElementById("learnBtn")
.addEventListener("click", function(){

    alert(
        "This webpage is optimized for performance and accessibility!"
    );

});

// Contact Form

document.querySelector(".contact-form")
.addEventListener("submit", function(event){

    event.preventDefault();

    alert(
        "Message Sent Successfully!"
    );

});