
function getData(form) {
    name = form.elements['name_inp'].value;
    msg = form.elements['message_inp'].value;

    console.log(name, msg)

    mail_request = "mailto:shoura.o@northeastern.edu?subject=Message from " + name + "&body=" + msg;
    window.open(mail_request);

}
  
document.getElementById("myForm").addEventListener("submit", function (e) {
e.preventDefault();
getData(e.target);
});
  