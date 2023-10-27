const axios = require("axios");
const fs = require("fs"); // Import modul fs (file system)
const FormData = require("form-data");

const apiKey = "fOZZ5deS2mejucewiuUPKQ6XsIRhBEMP";
const deviceKey = "9zdfxg";
const destination = "6285315624489"; //Your Doi Number

const targetDate = new Date("2023-10-31T00:00:00");
const jakartaTimezone = "Asia/Jakarta";
const options = { timeZone: jakartaTimezone };

let timeDifference = 0;

function updateCountdown() {
  function sendImage(imagePath, caption) {
    const url = "https://wapisender.id/api/v5/message/image";
    const form = new FormData();

    form.append("api_key", apiKey);
    form.append("device_key", deviceKey);
    form.append("destination", destination);
    form.append("caption", caption);

    // Membaca berkas gambar dari path
    const imageStream = fs.createReadStream(imagePath);
    form.append("image", imageStream);

    axios({
      method: "post",
      url,
      data: form,
      headers: {
        ...form.getHeaders(),
      },
    })
      .then((response) => {
        console.log(response.data);
        if (response.data.status === "ok") {
          console.log("Bot Successfully Sends Caption & Image✔️");
        } else {
          console.log("Failed:)");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  // Tanggal dan waktu saat ini dalam zona waktu Asia/Jakarta
  const currentDate = new Date().toLocaleString("en-US", options);
  const currentDateObj = new Date(currentDate);

  // Hitung selisih waktu antara target dan saat ini
  timeDifference = targetDate - currentDateObj;

  // Hitung hari, jam, menit, dan detik
  const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);
  const imagePath = "assets/happy_birthday.jpg";
  const caption ="_Happy Brithday Cantik 🥳_. _semoga panjang umur sehat selalu_. _Yang paling penting kita sama - sama terus yahhh~..._. _Eza punya kue ayang_ ```Kalo mau tiup lilin ketik``` *#tiuplilin*";

  // Cek apakah sudah mencapai target
  if (timeDifference <= 0) {
    sendImage(imagePath, caption);
    console.log(`Happy Birthday Sayang❤`);
    clearInterval(intervalId); // Hentikan interval
  } else {
    console.log(`Beauty's Birthday❤ ${days} Hari -> ${hours} Jam -> ${minutes} Menit -> ${seconds} Detik`);
  }
}

// Panggil updateCountdown() setiap detik
const intervalId = setInterval(updateCountdown, 1000);
