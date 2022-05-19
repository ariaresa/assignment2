const tambah = document.querySelector('.tambah');
const wishlist = document.querySelector('.wishlist');
const reading = document.querySelector('.reading');
const finish = document.querySelector('.finish');
const subMenuCari = document.querySelector('.menu-cari');
const cancel = document.getElementById('cancel');
const subMenuWish = document.querySelector('.menu-wishlist');
const subMenuReading = document.querySelector('.menu-reading');
const subMenuFinish = document.querySelector('.menu-finish');
const tampilWish = document.querySelectorAll('.boxWish');
const tampilReading = document.querySelector('.tampilReading');
const tampilFinish = document.querySelector('.tampilFinish');
const daftarBaca = document.querySelector('.daftar-baca');
const lgsgBaca = document.getElementById('inputBookIsComplete');
const jmlWish = document.querySelector('.jumlahWish');
const jmlhReading = document.querySelector('.jumlahReading');
const jmlFinish = document.querySelector('.jumlahFinish');
const ketikJudul = document.querySelector('.ketik-judul');
const cariJudul = document.querySelector('.cari-judul');
const BOOK_ID = "itemId";
const SEDANG_DIBACA = "diBaca";
const SUDAH_DIBACA = "sudahBaca";


// Awal Fungsi Tombol Submenu

function toggleForm() {
    const bookForm = document.querySelector('.book-form'); 
    bookForm.classList.toggle('tampil-form');
    tambah.classList.toggle('rotasi-tambah');
};

function tombolWish() {
    const tampilReading = document.querySelectorAll('.boxReading');
    const tampilFinish = document.querySelectorAll('.boxFinish');
    const tampilWish = document.querySelectorAll('.boxWish');
    const tampilCari = document.querySelectorAll('.boxCari');

    wishlist.style.backgroundColor = 'rgb(105, 101, 101)';

    for(itemWish of tampilWish) {
        itemWish.style.display = 'block';
    }

    for(itemReading of tampilReading) {
        itemReading.style.display = 'none';
    }

    for(itemFinish of tampilFinish) {
        itemFinish.style.display = 'none';
    }

    for(itemCari of tampilCari) {
        itemCari.style.display = 'none';
    }
};

function tombolReading() {
    const tampilWish = document.querySelectorAll('.boxWish');
    const tampilFinish = document.querySelectorAll('.boxFinish');
    const tampilReading = document.querySelectorAll('.boxReading');
    const tampilCari = document.querySelectorAll('.boxCari');

    reading.style.backgroundColor = 'gold';

    for(itemReading of tampilReading) {
        itemReading.style.display = 'block';
    }

    for(itemWish of tampilWish) {
        itemWish.style.display = 'none';
    }

    for(itemFinish of tampilFinish) {
        itemFinish.style.display = 'none';
    }

    for(itemCari of tampilCari) {
        itemCari.style.display = 'none';
    }
};

function tombolFinish() {
    const tampilWish = document.querySelectorAll('.boxWish');
    const tampilFinish = document.querySelectorAll('.boxFinish');
    const tampilReading = document.querySelectorAll('.boxReading');
    const tampilCari = document.querySelectorAll('.boxCari');

    finish.style.backgroundColor = 'rgb(118, 147, 165)';
    
    for(itemReading of tampilReading) {
        itemReading.style.display = 'none';
    }

    for(itemWish of tampilWish) {
        itemWish.style.display = 'none';
    }

    for(itemFinish of tampilFinish) {
        itemFinish.style.display = 'block';
    }

    for(itemCari of tampilCari) {
        itemCari.style.display = 'none';
    }

};

function tombolCari() {
    const tampilWish = document.querySelectorAll('.boxWish');
    const tampilFinish = document.querySelectorAll('.boxFinish');
    const tampilReading = document.querySelectorAll('.boxReading');
    const tampilCari = document.querySelectorAll('.boxCari');

    subMenuCari.style.backgroundColor = 'khaki';

    for(itemReading of tampilReading) {
        itemReading.style.display = 'none';
    }

    for(itemWish of tampilWish) {
        itemWish.style.display = 'none';
    }

    for(itemFinish of tampilFinish) {
        itemFinish.style.display = 'none';
    }

    for(itemCari of tampilCari) {
        itemCari.style.display = 'block';
    }

};

// Akhir Fungsi Tombol Submenu

// Awal Fungsi Buat Tombol

tambah.addEventListener('click', toggleForm);
cancel.addEventListener('click', function() {
    const kolomInput = document.querySelectorAll('.input-title');

    for(kolom of kolomInput) {
        kolom.removeAttribute('required');
        kolom.value = "";
    }
});

wishlist.addEventListener('click', tombolWish);
reading.addEventListener('click', tombolReading);
finish.addEventListener('click', tombolFinish);
subMenuCari.addEventListener('click', tombolCari)

cariJudul.addEventListener('click', function(event) {
    const tampilCari = document.querySelector('.tampil-cari');
    tampilCari.classList.add('daftar-cari');
    tombolCariJudul();
    tombolCari();
    ketikJudul.value = "";
    event.preventDefault;
});

function buatTombol(buttonTypeClass, keterangan, eventListener) {
    const button = document.createElement("button");
    button.classList.add(buttonTypeClass);
    button.innerText = keterangan;
    button.setAttribute("type", "input");
    button.addEventListener("click", function (event) {
        eventListener(event);
    });
    return button;
}

function tombolHapus() {
    return buatTombol("hapus", "Hapus", function(event) {
        hapusBuku(event.target.parentElement);
    });  
};

function tombolHapusDibaca() {
    return buatTombol("hapusDibaca", "Hapus", function(event) {
        hapusBuku(event.target.parentElement);
    });  
};

function tombolBaca() {
    return buatTombol("baca", "Baca", function(event) {
        sedangDibaca(event.target.parentElement);
        tombolReading();
    });
};

function tombolBacaLagi() {
    return buatTombol("lagi", "Baca Lagi", function(event) {
        dibacaLagi(event.target.parentElement);
        tombolReading();
    });
};

function tommbolSelesai() {
    return buatTombol("selesai", "Selesai", function(event) {
        sudahDibaca(event.target.parentElement);
        tombolFinish();
    });
};

// Akhir Fungsi Buat Tombol

// Fungsi Aksi Tombol

function tombolCariJudul() {
    const tampilCari = document.querySelector('.tampil-cari');
    const judulBuku = ketikJudul.value.toLowerCase();
 
    if(judulBuku === "") {
        return
    }
 
     for(buku of rakBuku) {
         if(buku.judul.toLowerCase().indexOf(judulBuku) > -1 ) {
             alert(judulBuku+ " ada di rak");
             
             const rakCari = menuCari(buku.judul, buku.penulis, buku.tahun ,buku.isCompleted);
             
     
                if(buku.isCompleted === true) {
                 tampilCari.append(rakCari);
                } else if(buku.isCompleted === null) {
                 tampilCari.append(rakCari);
                } else if(buku.isCompleted === false){
                 tampilCari.append(rakCari);
                } 
                return
         }
     }
 
     for(buku of rakBuku) {
         if(buku.judul.toLowerCase().indexOf(judulBuku) === -1 ) {
             alert("Buku yang anda cari tidak ada di rak");
         } 
         return
     } 
 }

function hapusBuku(elemenTarget) {

    const posisiBuku = cariBukuIndex(elemenTarget[BOOK_ID]);
    rakBuku.splice(posisiBuku, 1);

    elemenTarget.remove();
    updateDataToStorage();
};

function sedangDibaca(elemenTarget) {
    const containerBaca = document.getElementById(SEDANG_DIBACA);
    const judulDibaca = elemenTarget.querySelectorAll('.isiWish > p')[0].innerText.substr(13);
    const penulisDibaca = elemenTarget.querySelectorAll('.isiWish > p')[1].innerText.substr(15);
    const tahunDibaca = elemenTarget.querySelectorAll('.isiWish > p')[2].innerText.substr(15);

    const menuDibaca = menuReading(judulDibaca, penulisDibaca, tahunDibaca, false);
    const buku = cariBuku(elemenTarget[BOOK_ID]);
    buku.isCompleted = false;
    menuDibaca[BOOK_ID] = buku.id;

    containerBaca.append(menuDibaca);
    elemenTarget.remove();

    updateDataToStorage();
}

function sudahDibaca(elemenTarget) {
    const containerSelesai = document.getElementById(SUDAH_DIBACA);
    const judulSelesai = elemenTarget.querySelectorAll('.isiReading > p')[0].innerText.substr(13);
    const penulisSelesai = elemenTarget.querySelectorAll('.isiReading > p')[1].innerText.substr(15);
    const tahunSelesai = elemenTarget.querySelectorAll('.isiReading > p')[2].innerText.substr(15);

    const menuSelesai = menuFinish(judulSelesai, penulisSelesai, tahunSelesai, true);
    const buku = cariBuku(elemenTarget[BOOK_ID]);
    buku.isCompleted = true;
    menuSelesai[BOOK_ID] = buku.id;
    
    containerSelesai.append(menuSelesai);
    elemenTarget.remove();

    updateDataToStorage();
}

function dibacaLagi(elemenTarget) {
    const containerSelesai = document.getElementById(SEDANG_DIBACA);
    const judulLagi = elemenTarget.querySelectorAll('.isiFinish > p')[0].innerText.substr(13);
    const penulisLagi = elemenTarget.querySelectorAll('.isiFinish > p')[1].innerText.substr(15);
    const tahunLagi = elemenTarget.querySelectorAll('.isiFinish > p')[2].innerText.substr(15);

    const menuLagi = menuReading(judulLagi, penulisLagi, tahunLagi, false);
    const buku = cariBuku(elemenTarget[BOOK_ID]);
    buku.isCompleted = false;
    menuLagi[BOOK_ID] = buku.id;


    containerSelesai.append(menuLagi);
    elemenTarget.remove();

    updateDataToStorage();
}

// Akhir Fungsi Aksi Tombol


// Fungsi Fitur Aplikasi

function addWish() {
    const cobaJudul = document.getElementById('inputBookTitle').value;
    const cobaPenulis = document.getElementById('inputBookAuthor').value;
    const cobaTahun = document.getElementById('inputBookYear').value;
    

    const isiWish = menuWish(cobaJudul, cobaPenulis, cobaTahun, null);
    let arrayData = susunData(cobaJudul, cobaPenulis, cobaTahun, null);

    isiWish[BOOK_ID] = arrayData.id;

    rakBuku.push(arrayData);
    daftarBaca.append(isiWish);

    updateDataToStorage();
    
}

function addReading() {
    const cobaJudul = document.getElementById('inputBookTitle').value;
    const cobaPenulis = document.getElementById('inputBookAuthor').value;
    const cobaTahun = document.getElementById('inputBookYear').value;
    const boxReading = document.getElementById(SEDANG_DIBACA);    

    const isiReading = menuReading(cobaJudul, cobaPenulis, cobaTahun, false);
    let arrayData = susunData(cobaJudul, cobaPenulis, cobaTahun, false);

    isiReading[BOOK_ID] = arrayData.id;

    rakBuku.push(arrayData);
    boxReading.append(isiReading);

    updateDataToStorage();
    
}

function menuCari(judul, penulis, tahun, isCompleted) {
    const tesJudul = document.createElement('p');
    tesJudul.innerText = "Judul Buku : " + judul;

    const tesPenulis = document.createElement('p');
    tesPenulis.innerText = "Nama Penulis : " + penulis;

    const tesTahun = document.createElement('p');
    tesTahun.innerText = "Tahun Terbit : " + tahun;

    const lokasiBuku = document.createElement('p');

    const boxSatu = document.createElement('div');
    boxSatu.classList.add('isiCari');
    
    boxSatu.append(tesJudul, tesPenulis, tesTahun, lokasiBuku);

    const boxDua = document.createElement('div');
    boxDua.classList.add('boxCari');
    boxDua.append(boxSatu);

    if(isCompleted == true) {
        lokasiBuku.innerHTML = "<b>Lokasi Buku : <em>Selesai Dibaca</em></b>";
    } else if(isCompleted == null) {
        lokasiBuku.innerHTML = "<b>Lokasi Buku : <em>Wishlist</em><b>";
    } else {
        lokasiBuku.innerHTML = "<b>Lokasi Buku : <em>Sedang Dibaca</em><b>";
    }

    return boxDua
}

function menuWish(judul, penulis, tahun, isCompleted) {
    const tesJudul = document.createElement('p');
    tesJudul.classList.add('kolom-judul');
    tesJudul.innerText = "Judul Buku : " + judul;

    const tesPenulis = document.createElement('p');
    tesPenulis.innerText = "Nama Penulis : " + penulis;

    const tesTahun = document.createElement('p');
    tesTahun.innerText = "Tahun Terbit : " + tahun;

    const boxSatu = document.createElement('div');
    boxSatu.classList.add('isiWish');
    
    boxSatu.append(tesJudul, tesPenulis, tesTahun);

    const boxDua = document.createElement('div');
    boxDua.classList.add('boxWish');
    boxDua.append(boxSatu);

    if(isCompleted) {
        boxDua.append(
            tombolHapus(),
            tombolBacaLagi()
        );
    } else {
        boxDua.append(
            tombolHapus(),
            tombolBaca()
        );
    }

    return boxDua
}

function menuReading(judul, penulis, tahun, isCompleted) {
    const tesJudul = document.createElement('p');
    tesJudul.classList.add('kolom-judul');
    tesJudul.innerText = "Judul Buku : " + judul;

    const tesPenulis = document.createElement('p');
    tesPenulis.innerText = "Nama Penulis : " + penulis;

    const tesTahun = document.createElement('p');
    tesTahun.innerText = "Tahun Terbit : " + tahun;

    const boxReadingSatu = document.createElement('div');
    boxReadingSatu.classList.add('isiReading');
    
    boxReadingSatu.append(tesJudul, tesPenulis, tesTahun);

    const boxReadingDua = document.createElement('div');
    boxReadingDua.classList.add('boxReading');
    boxReadingDua.append(boxReadingSatu);

    if(!isCompleted) {
        boxReadingDua.append(
            tombolHapusDibaca(),
            tommbolSelesai()
        );
    }

    return boxReadingDua

}

function menuFinish(judul, penulis, tahun, isCompleted) {
    const tesJudul = document.createElement('p');
    tesJudul.classList.add('kolom-judul');
    tesJudul.innerText = "Judul Buku : " + judul;

    const tesPenulis = document.createElement('p');
    tesPenulis.innerText = "Nama Penulis : " + penulis;

    const tesTahun = document.createElement('p');
    tesTahun.innerText = "Tahun Terbit : " + tahun;

    const boxFinishSatu = document.createElement('div');
    boxFinishSatu.classList.add('isiFinish');
    
    boxFinishSatu.append(tesJudul, tesPenulis, tesTahun);

    const boxFinishDua = document.createElement('div');
    boxFinishDua.classList.add('boxFinish');
    boxFinishDua.append(boxFinishSatu);

    if(isCompleted) {
        boxFinishDua.append(
            tombolHapus(),
            tombolBacaLagi()
        );
    } else {
        boxFinishDua.append(
            tombolHapus(),
            tommbolSelesai()
        );
    }

    return boxFinishDua

}

