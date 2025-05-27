import React from 'react';

const schedule = [
  { time: '14:00 - 15:00 น.', activity: 'ซาวน์เช็ค วงประกวด' },
  { time: '15:00 - 16:30 น.', activity: 'ซาวน์เช็ค Sillyfools' },
  { time: '16:30 - 18:00 น.', activity: 'ซาวน์เช็ค Labanoon' },
  { time: '18:00 - 19:30 น.', activity: 'DJ + MC + Ceremony' },
  { time: '19:30 - 20:30 น.', activity: 'วงประกวด' },
  { time: '21:00 - 22:10 น.', activity: 'Sillyfools' },
  { time: '22:45 - 24:00 น.', activity: 'Labanoon' },
  { time: '00:00 - 02:00 น.', activity: 'กิจกรรมรอบกองไฟ + folk songs' },
];

const LineupSchedule: React.FC = () => {
  return (
    <section className="bg-black text-white py-16 px-6">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-10">
        ตารางเวลาแสดง
      </h2>
      <div className="max-w-4xl mx-auto space-y-6">
        {schedule.map((item, index) => (
          <div key={index} className="flex flex-col md:flex-row justify-between bg-gray-800 p-4 rounded-lg shadow-md hover:bg-gray-700 transition">
            <div className="font-semibold text-yellow-400 text-lg md:text-xl">{item.time}</div>
            <div className="text-white text-lg md:text-xl mt-2 md:mt-0">{item.activity}</div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default LineupSchedule;
