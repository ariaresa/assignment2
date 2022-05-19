document.addEventListener("DOMContentLoaded", loadScreen);

function loadScreen() {

    const submit = document.getElementById('bookSubmit');
    submit.addEventListener('click', function(event) {

        const kolomForm = document.querySelectorAll('.input-title');

        for(kolom of kolomForm) {
            if(kolom.value == ""){
                return
            }
        }

        if(lgsgBaca.checked == true) {
            addReading();
            tombolReading();
        } else {
            addWish();
            tombolWish();
        };

        for(kolom of kolomForm) {
            kolom.value = "";
        }
        
        event.preventDefault();
    });

    if(isStorageExist()){
        loadDataFromStorage();
    }
}

document.addEventListener("ondatasaved", () => {
    console.log("Data berhasil disimpan.");
 });

 document.addEventListener("ondataloaded", () => {
    refreshDataFromRak();
 });
