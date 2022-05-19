const KUNCI_PENYIMPANAN = "BOOKSHELF_APPS";

let rakBuku = [];
 
function isStorageExist() {
   if(typeof(Storage) === undefined){
       alert("Browser kamu tidak mendukung local storage");
       return false
   }
   return true;
}
 
function saveData() {
   const parsed = JSON.stringify(rakBuku);
   localStorage.setItem(KUNCI_PENYIMPANAN, parsed);
   document.dispatchEvent(new Event("ondatasaved"));
}
 
function loadDataFromStorage() {
   const serializedData = localStorage.getItem(KUNCI_PENYIMPANAN);
   
   let data = JSON.parse(serializedData);
   
   if(data !== null)
       rakBuku = data;
 
   document.dispatchEvent(new Event("ondataloaded"));
}
 
function updateDataToStorage() {
   if(isStorageExist())
       saveData();
}
 
function susunData(judul, penulis, tahun, isCompleted) {
    return {
        id:+ new Date(), judul, penulis, tahun, isCompleted
    };
};
 
function cariBuku(bukuId) {
   for(buku of rakBuku){
       if(buku.id === bukuId)
           return buku;
   }
   return null;
}
 
 
function cariBukuIndex(bukuId) {
   let index = 0
   for (buku of rakBuku) {
       if(buku.id === bukuId)
           return index;
 
       index++;
   }
 
   return -1;
}

function refreshDataFromRak() {
    const belumDibaca = document.querySelector(".daftar-baca");
    const sedangDibaca = document.getElementById(SEDANG_DIBACA);
    let sudahDibaca = document.getElementById(SUDAH_DIBACA);
    
  
    for(buku of rakBuku){
        const rakWish = menuWish(buku.judul, buku.penulis, buku.tahun ,buku.isCompleted);
        const rakReading = menuReading(buku.judul, buku.penulis, buku.tahun ,buku.isCompleted);
        const rakFinish = menuFinish(buku.judul, buku.penulis, buku.tahun ,buku.isCompleted);

        rakWish[BOOK_ID] = buku.id;
        rakReading[BOOK_ID] = buku.id;
        rakFinish[BOOK_ID] = buku.id;
        
        if(buku.isCompleted === true){
            sudahDibaca.append(rakFinish);
        } else if(buku.isCompleted === null) {
            belumDibaca.append(rakWish);
        } else{
            sedangDibaca.append(rakReading);
        }
    }
 };