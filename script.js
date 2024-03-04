var tablinks = document.getElementsByClassName("tab-links");
var tabcontents = document.getElementsByClassName("tab-contents");

function opentab(tabname) {
    for (tablink of tablinks) {
        tablink.classList.remove("active-link");
    }
    for (tabcontent of tabcontents) {
        tabcontent.classList.remove("active-tab");
    }
    event.currentTarget.classList.add("active-link");
    document.getElementById(tabname).classList.add("active-tab");
}

const scriptURL = "https://script.google.com/macros/s/AKfycbwcc_tUU3JIIh8GKCct0TCGAbe9CnaApZ0wU6uLXOqj5BoFFQBN-zzvXVH1oY-WaIx-1g/exec";
const form = document.forms['submit-to-google-sheet'];
const msg = document.getElementById("msg");
const submitButton = document.getElementById('submitBtn');

submitButton.addEventListener('click', () => {
    const formData = new FormData();
    formData.append('Name', form.elements['Name'].value);
    formData.append('Email', form.elements['Email'].value);
    formData.append('Message', form.elements['Message'].value);

    fetch(scriptURL, { method: 'POST', body: formData })
        .then(response => {
            msg.innerHTML = "Success!";
            setTimeout(function () {
                msg.innerHTML = '';
            }, 5000);
            form.reset();
        })
        .catch(error => console.error('Error!', error.message));
});
