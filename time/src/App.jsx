import { useEffect } from "react";
import "./App.css";
import img from "./assets/1.jpg";
import Player from "./Player";
import { useState } from "react";
function App() {
  const [city, setcity] = useState("cairo");
  const [prayerTimes, setprayerTimes] = useState({});

  const cities = [
    { name: "القاهرة", value: "Cairo" },
    { name: "الإسكندرية", value: "Alexandria" },
    { name: "الجيزة", value: "Giza" },
    { name: "الشرقية", value: "Sharqia" },
    { name: "الدقهلية", value: "Dakahlia" },
    { name: "المنوفية", value: "Monufia" },
    { name: "الغربية", value: "Gharbia" },
    { name: "القليوبية", value: "Qalyubia" },
    { name: "البحيرة", value: "Beheira" },
    { name: "كفر الشيخ", value: "Kafr El Sheikh" },
    { name: "الفيوم", value: "Faiyum" },
    { name: "بني سويف", value: "Beni Suef" },
    { name: "المنيا", value: "Minya" },
    { name: "أسيوط", value: "Asyut" },
    { name: "سوهاج", value: "Sohag" },
    { name: "قنا", value: "Qena" },
    { name: "الأقصر", value: "Luxor" },
    { name: "أسوان", value: "Aswan" },
    { name: "الوادي الجديد", value: "New Valley" },
    { name: "البحر الأحمر", value: "Red Sea" },
    { name: "مطروح", value: "Matrouh" },
    { name: "شمال سيناء", value: "North Sinai" },
    { name: "جنوب سيناء", value: "South Sinai" },
    { name: "بورسعيد", value: "Port Said" },
    { name: "السويس", value: "Suez" },
    { name: "الإسماعيلية", value: "Ismailia" },
    { name: "دمياط", value: "Damietta" },
  ];

  useEffect(() => {
    async function gettimes() {
      try {
        await fetch(
          `https://api.aladhan.com/v1/timingsByCity?city=${city}&country=EG&method=2`
        )
          .then((response) => response.json())
          .then((data) => setprayerTimes(data.data));
      } catch (error) {
        console.error("Error fetching prayer times:", error);
      }
    }
    gettimes();
  }, [city]);

  function convertTime(time) {
    if (!time) return "N/A";

    let [hours, minutes] = time.split(":").map(Number);
    let period = hours >= 12 ? "PM" : "AM";
    hours = hours % 12 || 12;

    return `${hours}:${minutes.toString().padStart(2, "0")} ${period}`;
  }

  return (
    <section
      className="h-screen flex justify-end  items-center w-screen select-none"
      style={{
        backgroundImage: `url(${img})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="container flex  items-end justify-start flex-wrap   flex-col  backdrop-blur-md w-max h-max rounded-4xl mr-5.5  p-6">
        <div className="top flex justify-between text-right w-full p-5 text-white">
          <div className="left flex-1 font-bold">
            <h3 className="text-lg font-semibold ">التاريخ</h3>
            {prayerTimes?.date?.gregorian?.date || "Loading..."}
          </div>
          <div className="right flex-1" dir="rtl">
            <h3 className="text-xl font-semibold">المدينة</h3>
            <div className="select mt-2">
              <select
                className="bg-amber-700 text-white px-4 py-1 rounded-3xl focus:outline-none"
                onChange={(e) => setcity(e.target.value)}
                value={city}
              >
                {cities.map((item) => {
                  return (
                    <option value={item.value} key={item.value}>
                      {item.name}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>
        </div>

        <div className="bottom">
          <Player
            name="الفجر"
            time={convertTime(prayerTimes?.timings?.Fajr) || "N/A"}
          />
          <Player
            name="الظهر"
            time={convertTime(prayerTimes?.timings?.Dhuhr) || "N/A"}
          />
          <Player
            name="العصر"
            time={convertTime(prayerTimes?.timings?.Asr) || "N/A"}
          />
          <Player
            name="المغرب"
            time={convertTime(prayerTimes?.timings?.Maghrib) || "N/A"}
          />
          <Player
            name="العشاء"
            time={convertTime(prayerTimes?.timings?.Isha) || "N/A"}
          />
        </div>
      </div>
    </section>
  );
}

export default App;
