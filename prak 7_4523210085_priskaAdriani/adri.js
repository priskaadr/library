document.addEventListener("DOMContentLoaded", function () {
    const daftarBukuEl = document.getElementById("daftar-buku");
    const daftarFavoritEl = document.getElementById("daftar-favorit");
    const formTambahBuku = document.getElementById("form-tambah-buku");
    const namaPenggunaInput = document.getElementById("namaPengguna");
    const btnSimpanNama = document.getElementById("btnSimpanNama");
    const salamPenggunaEl = document.getElementById("salamPengguna");

    const daftarBuku = [];
    const bukuFavorit = [];

    const namaPengguna = localStorage.getItem("namaPengguna");
    if (namaPengguna) {
        tampilkanSalam(namaPengguna);
    }

    function tampilkanSalam(nama) {
        salamPenggunaEl.textContent = `Halo, ${nama}! Selamat datang di Perpustakaan Adri.`;
    }

    btnSimpanNama.addEventListener("click", function () {
        const nama = namaPenggunaInput.value.trim();
        if (nama) {
            localStorage.setItem("namaPengguna", nama);  
            tampilkanSalam(nama);
            namaPenggunaInput.value = "";
        }
    });

    formTambahBuku.addEventListener("submit", function (event) {
        event.preventDefault();

        const judul = document.getElementById("judul").value;
        const penulis = document.getElementById("penulis").value;
        const tahun = document.getElementById("tahun").value;

        const bukuBaru = { judul, penulis, tahun };
        daftarBuku.push(bukuBaru);  
        tampilkanDaftarBuku();     
        
        formTambahBuku.reset();
    });

    function tampilkanDaftarBuku() {
        daftarBukuEl.innerHTML = "";  
        daftarBuku.forEach((buku, index) => {
            const bukuEl = document.createElement("div");
            bukuEl.classList.add("border-b", "border-gray-300", "pb-4", "mb-4");

            bukuEl.innerHTML = `
                <h3 class="font-semibold text-lg">${buku.judul}</h3>
                <p>Penulis: ${buku.penulis}</p>
                <p>Tahun: ${buku.tahun}</p>
                <button class="bg-indigo-500 text-white px-4 py-2 mt-2 rounded-lg hover:bg-indigo-600" onclick="tambahKeFavorit(${index})">Tambahkan ke Favorit</button>
            `;

            daftarBukuEl.appendChild(bukuEl);
        });
    }

    function tampilkanFavorit() {
        daftarFavoritEl.innerHTML = ""; 

        if (bukuFavorit.length === 0) {
            daftarFavoritEl.innerHTML = "<p>Belum ada buku favorit.</p>";
        } else {
            bukuFavorit.forEach((buku) => {
                const favoritEl = document.createElement("div");
                favoritEl.classList.add("border-b", "border-gray-300", "pb-4", "mb-4");

                favoritEl.innerHTML = `
                    <h3 class="font-semibold text-lg">${buku.judul}</h3>
                    <p>Penulis: ${buku.penulis}</p>
                    <p>Tahun: ${buku.tahun}</p>
                `;

                daftarFavoritEl.appendChild(favoritEl);
            });
        }
    }

    window.tambahKeFavorit = function (index) {
        const buku = daftarBuku[index];
        
        if (!bukuFavorit.includes(buku)) {
            bukuFavorit.push(buku);
            tampilkanFavorit();
        } else {
            alert("Buku sudah ada di daftar favorit!");
        }
    }
});
