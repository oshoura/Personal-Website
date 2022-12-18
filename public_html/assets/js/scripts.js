function openResume() {
    url = "../Resume 2022-Shoura.pdf"
    // window.open(url);
    const a = document.createElement('a')
    a.href = url
    a.download = url.split('/').pop()
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
}

function getData(form) {
    name = form.elements['name_inp'].value;
    email = form.elements['email_inp'].value;
    msg = form.elements['message_inp'].value;

    console.log(name, email, msg)

    mail_request = "mailto:shoura.o@northeastern.edu?subject=Message from " + name + "&body=" + msg;
    window.open(mail_request);
    // var formData = new FormData(form);
    // console.log(document.getElementById("myForm").elements);
    // console.log(Object.fromEntries(formData));
}
  
document.getElementById("myForm").addEventListener("submit", function (e) {
e.preventDefault();
getData(e.target);
});
  