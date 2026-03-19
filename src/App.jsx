import React, { useState, useEffect } from 'react';

// Fortune Data with Categories and Assets
const fortuneData = [
  { id: 1, title: "บัวพ้นน้ำ", category: "การงาน", color: "bg-[#FF007A]", textColor: "text-white", asset: "/brain/c7ef3d8c-a745-4f77-ace5-acca9eafd208/nong_bua_elephant_1773775418303.png", text: "ชีวิตช่วงนี้เปรียบเหมือนดอกบัวพ้นน้ำรับอรุณ ผลให้การเงินไหลมาเทมาไม่ขาดสาย อีกทั้งมีการงานราบรื่นเพราะมีผู้ใหญ่เอ็นดูคอยประคองส่ง เกณฑ์พบคนใจบุญเข้ามาเกื้อกูลกันในด้านความรัก" },
  { id: 2, title: "บัวคู่บุญ", category: "การเงิน", color: "bg-[#FFEA00]", textColor: "text-ci-dark", asset: "/brain/c7ef3d8c-a745-4f77-ace5-acca9eafd208/nong_bua_finance_1773775770791.png", text: "พลังแห่งมิตรภาพนำพาความสำเร็จมาให้ งานที่ต้องร่วมแรงร่วมใจจะเสร็จไวและได้ผลดีเกินคาด การเงินมีโชคลาภจากคนใกล้ชิด ส่วนความรักหวานชื่นเหมือนน้ำเย็นรดตัวช้าง คนโสดมีเกณฑ์พบคนจริงใจ" },
  { id: 3, title: "บัวรออรุณ", category: "สุขภาพ", color: "bg-[#0070FF]", textColor: "text-white", asset: "/brain/c7ef3d8c-a745-4f77-ace5-acca9eafd208/nong_bua_health_1773775823906.png", text: "ช่วงนี้ต้องใช้ความอดทนรอคอยเหมือนบัวที่ค่อยๆ เติบโต แม้การงานจะดูนิ่งไปบ้างแต่ขอให้ใจเย็นและประหยัดอดออมไว้ก่อน เพราะลาภใหญ่กำลังเดินทางมาหา ในด้านความรักต้องใช้ความเข้าใจสยบความใจร้อน" },
  { id: 4, title: "บัวกลางแกร่ง", category: "ความรัก", color: "bg-[#FF007A]", textColor: "text-white", asset: "/brain/c7ef3d8c-a745-4f77-ace5-acca9eafd208/nong_bua_love_1773775862488.png", text: "แม้งานในช่วงนี้จะหนักและเหนื่อยแต่ผลลัพธ์คุ้มค่าแน่นอน ความพยายามส่งผลให้การเงินหมุนเวียนได้ทันท่วงที ส่วนความรักต้องอาศัยการจับมือกันให้แน่นเพื่อก้าวผ่านอุปสรรคไปสู่ความมั่นคงร่วมกัน" },
  { id: 5, title: "บัวรับโชค", category: "มิตรสหาย", color: "bg-[#FFEA00]", textColor: "text-ci-dark", asset: "/brain/c7ef3d8c-a745-4f77-ace5-acca9eafd208/nong_bua_finance_1773775770791.png", text: "เป็นช่วงเวลาแห่งวาสนา ใหญ่พูนทวีเข้ากระเป๋า การงานได้รับโอกาสทองแบบไม่คาดฝันส่งผลให้มีเกณฑ์ได้รับเงินก้อน ในด้านเสน่ห์เปี่ยมเมตตาจนมีคนอยากเข้ามาอาสาดูแลหัวใจให้พองโต" },
  { id: 6, title: "บัวใสกระจ่าง", category: "การเดินทาง", color: "bg-[#0070FF]", textColor: "text-white", asset: "/brain/c7ef3d8c-a745-4f77-ace5-acca9eafd208/nong_bua_travel_v2_177376790332.png", text: "เรื่องร้ายกำลังจะกลายเป็นดี ปัญหางานที่ค้างคาคลี่คลายเพราะมีคนดีเข้ามาช่วยชี้ทาง การเงินเริ่มฟื้นตัวมีกำไรให้ชื่นใจ ส่วนความรักที่เคยขุ่นมัวจะกลับมาใสสะอาดและเข้าใจกันดีเหมือนน้ำในสระบัว" },
  { id: 7, title: "บัวนิ่งสงบ", category: "การงาน", color: "bg-[#FF007A]", textColor: "text-white", asset: "/brain/c7ef3d8c-a745-4f77-ace5-acca9eafd208/nong_bua_elephant_1773775418303.png", text: "ความสำเร็จขึ้นอยู่กับสติและการวางตัว การงานต้องรอบคอบไม่หลงเชื่อข่าวลือ การเงินประคองตัวไปได้ด้วยความพอดี ส่วนเรื่องความรักต้องหนักแน่นในคำสัญญา ไม่ปล่อยให้เสียงรอบข้างมาสั่นคลอนความเชื่อใจ" },
  { id: 8, title: "บัวบารมี", category: "การเงิน", color: "bg-[#FFEA00]", textColor: "text-ci-dark", asset: "/brain/c7ef3d8c-a745-4f77-ace5-acca9eafd208/nong_bua_finance_1773775770791.png", text: "การเงินมั่นคงมีกินมีใช้ บุญกุศลหนุนนำให้ชื่อเสียงโดดเด่นและมีคนยอมรับในฝีมือการทำงาน ครอบครัวมีความรักความเข้าใจและเหลือเฟือแบบไม่ขัดสน ในด้านหัวใจเป็นที่รักของคนรอบข้าง อยู่กันพร้อมหน้าพร้อมตา" },
  { id: 9, title: "บัวเปลี่ยนกระถาง", category: "สุขภาพ", color: "bg-[#0070FF]", textColor: "text-white", asset: "/brain/c7ef3d8c-a745-4f77-ace5-acca9eafd208/nong_bua_health_1773775823906.png", text: "เตรียมรับการเปลี่ยนแปลงที่ดี มีเกณฑ์โยกย้ายงานไปสู่ตำแหน่งที่สูงขึ้นหรือที่ที่ดีกว่าเดิม การเงินมีช่องทางใหม่ๆ ให้เก็บเกี่ยวรายได้ ส่วนความรักจะได้เริ่มต้นความสัมพันธ์ที่สดใสและทำให้หัวใจกลับมามีความสุข" },
  { id: 10, title: "บัวสวรรค์", category: "ความรัก", color: "bg-[#FF007A]", textColor: "text-white", asset: "/brain/c7ef3d8c-a745-4f77-ace5-acca9eafd208/nong_bua_love_1773775862488.png", text: "ชีวิตถึงจุดที่สมบูรณ์พูนสุข การงานสำเร็จเส็จสิ้นตามที่หวังไว้ทุกประการส่งผลให้มั่งคั่งร่ำรวยเป็นเศรษฐี ผู้ใจบุญ ส่วนความรักลงตัวและมีความสุขที่สุด เปรียบเหมือนได้พักผ่อนในสวนบัวที่เงียบสงบและงดงาม" }
];

const App = () => {
  const [appState, setAppState] = useState('SELECTION'); // SELECTION, SHAKING, RESULT
  const [selectedId, setSelectedId] = useState(null);

  const handleSelect = (id) => {
    setSelectedId(id);
    setAppState('SHAKING');
  };

  useEffect(() => {
    if (appState === 'SHAKING') {
      const timer = setTimeout(() => {
        setAppState('RESULT');
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, [appState]);

  const resetGame = () => {
    setSelectedId(null);
    setAppState('SELECTION');
  };

  const currentFortune = fortuneData.find(f => f.id === selectedId);

  return (
    <div className="min-h-screen max-w-md mx-auto bg-white flex flex-col shadow-2xl relative overflow-hidden font-sans select-none">
      
      {/* State 1: Selection */}
      {appState === 'SELECTION' && (
        <div className="flex-grow flex flex-col bg-ci-dark relative animate-fade-in overflow-y-auto">
            {/* Logo/Banner Section */}
            <div className="bg-gradient-to-b from-[#FFEA00] to-[#D4AF37] px-8 pt-10 pb-16 rounded-b-[60px] shadow-xl relative z-10">
                <div className="w-24 h-24 bg-white/20 rounded-full absolute -top-10 -right-10 blur-2xl"></div>
                <h1 className="text-5xl font-black text-ci-pink italic text-center drop-shadow-[0_4px_4px_rgba(255,255,255,0.5)] leading-tight">
                    คำทำนาย <br/> <span className="text-ci-dark not-italic">บัวบุญ</span>
                </h1>
                <p className="text-center text-ci-pink/80 font-bold mt-4 tracking-widest text-sm bg-white/30 backdrop-blur-sm py-1 rounded-full px-4 inline-block mx-auto w-fit">BANG BUA THONG EVENT</p>
            </div>

            <div className="px-6 py-10 relative z-10 flex-grow">
                <h2 className="text-white text-center text-2xl font-black mb-8">“ ตั้งจิตอธิษฐานแล้วเลือกหมายเลข ”</h2>
                <div className="grid grid-cols-2 gap-6">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                    <button
                        key={num}
                        onClick={() => handleSelect(num)}
                        className="h-28 bg-gradient-to-br from-[#FF007A] to-[#9D00FF] rounded-[30px] flex flex-col items-center justify-center shadow-[0_8px_0_#4a004a] active:translate-y-1 active:shadow-none transition-all border-4 border-white/10 group"
                    >
                        <span className="text-4xl font-black text-white group-hover:scale-110 transition-transform">{num}</span>
                        <div className="w-8 h-1 bg-ci-yellow mt-1 rounded-full opacity-60"></div>
                    </button>
                ))}
                </div>
            </div>

            <footer className="p-8 text-center text-white/30 text-xs font-black tracking-widest uppercase">
                 © 2026 Bang Bua Thong Special
            </footer>
        </div>
      )}

      {/* State 2: Shaking */}
      {appState === 'SHAKING' && (
        <div className="flex-grow flex flex-col items-center justify-center bg-ci-pink animate-fade-in relative">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,234,0,0.4)_0%,transparent_70%)] animate-pulse"></div>
            <div className="w-48 h-72 bg-[#CC0062] rounded-t-[120px] rounded-b-[40px] border-[8px] border-ci-yellow relative shadow-[0_30px_60px_rgba(0,0,0,0.5)] animate-shake overflow-hidden z-20">
                <div className="absolute top-0 right-0 w-full h-full bg-white/5 skew-x-[-15deg] translate-x-1/2"></div>
                <div className="absolute inset-0 flex flex-col items-center justify-end pb-12">
                   <div className="w-3 h-48 bg-[#FFEA00] rounded-full blur-[1px] opacity-60"></div>
                </div>
                <div className="absolute top-10 left-1/2 -translate-x-1/2 w-16 h-16 bg-white/10 rounded-full animate-ping"></div>
            </div>
            <h2 className="mt-16 text-5xl font-black text-ci-yellow drop-shadow-[0_4px_0_#A52A2A] tracking-[0.2em] relative z-20">เขย่า...</h2>
            <p className="mt-4 text-white text-xl font-bold italic opacity-80 z-20">ตั้งใจรับพรของท่าน</p>
        </div>
      )}

      {/* State 3: Result (Physical Card Style) */}
      {appState === 'RESULT' && currentFortune && (
        <div className={`flex-grow flex flex-col ${currentFortune.color} animate-fade-in p-2 select-text`}>
            
            {/* Outer Decorative Card Frame */}
            <div className="flex-grow border-[12px] border-ci-yellow rounded-[40px] flex flex-col shadow-[inset_0_0_50px_rgba(0,0,0,0.3)] relative overflow-hidden">
                
                {/* Dotted Pattern Overlay */}
                <div className="absolute inset-0 opacity-10 pointer-events-none" style={{backgroundImage: 'radial-gradient(circle, white 1.5px, transparent 1.5px)', backgroundSize: '15px 15px'}}></div>
                
                {/* Category Header Bar */}
                <div className="h-20 flex items-center justify-center relative z-10 mt-2">
                    <h2 className="text-6xl font-black text-white drop-shadow-[0_4px_0_rgba(0,0,0,0.5)] tracking-tighter">
                        {currentFortune.category}
                    </h2>
                </div>

                {/* Main Arch Frame Section */}
                <div className="flex-grow flex flex-col items-center px-6 relative z-10">
                    
                    {/* The Arch */}
                    <div className="w-full aspect-[4/5] bg-[#004e30] rounded-t-full border-[6px] border-ci-yellow/80 mt-2 relative overflow-hidden flex items-end justify-center shadow-2xl">
                        
                        {/* Sunray Glow Background */}
                        <div className="absolute inset-x-0 bottom-0 h-[80%] bg-[radial-gradient(circle_at_bottom,rgba(255,234,0,0.4)_0%,transparent_70%)] animate-pulse"></div>
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200%] h-[200%] bg-[conic-gradient(from_0deg,transparent_0deg,rgba(255,234,0,0.05)_5deg,transparent_10deg)] animate-[spin_30s_linear_infinite]"></div>

                        {/* Character Image */}
                        <img 
                            src={currentFortune.asset} 
                            alt={currentFortune.title} 
                            className="w-[90%] z-20 relative mb-4 drop-shadow-[0_15px_15px_rgba(0,0,0,0.5)] animate-float"
                        />

                        {/* Event Logo Placeholder */}
                        <div className="absolute bottom-6 z-30 bg-ci-pink px-4 py-1 rounded-full border-2 border-ci-yellow shadow-lg flex items-center justify-center transform hover:scale-105 transition-transform">
                             <span className="text-ci-yellow text-[10px] font-black tracking-widest leading-none">บางบัวทอง</span>
                        </div>
                    </div>

                    {/* Prediction Text */}
                    <div className="flex-grow flex flex-col items-center justify-center text-center mt-6">
                         <h3 className="text-ci-yellow text-4xl font-black mb-4 drop-shadow-[0_2px_2px_rgba(0,0,0,1)] bg-black/30 px-6 py-1 rounded-full">
                            “ {currentFortune.title} ”
                         </h3>
                         <p className={`${currentFortune.textColor} text-base font-black leading-tight drop-shadow-[0_1px_1px_rgba(0,0,0,0.5)]`}>
                            {currentFortune.text}
                         </p>
                    </div>
                </div>

                {/* Card Bottom Bar */}
                <div className="h-16 flex items-center justify-center border-t-2 border-white/20 px-8">
                     <div className="w-full h-[1px] bg-white/30 relative flex items-center justify-center">
                         <div className="bg-ci-yellow px-4 absolute text-ci-dark font-black text-[10px] tracking-widest italic rounded-full h-5 flex items-center">BUA BOON SIAMSI NO. {currentFortune.id}</div>
                     </div>
                </div>
            </div>

            {/* Action Buttons (Below Card) */}
            <div className="px-4 py-6 flex flex-col gap-4">
                <button 
                  onClick={() => console.log('Downloading...')}
                  className="w-full bg-[#FFEA00] text-ci-dark py-5 rounded-[24px] font-black text-2xl shadow-[0_8px_0_#D4AF37] active:translate-y-1 active:shadow-none transition-all flex items-center justify-center gap-3 border-2 border-white/20"
                >
                  📥 โหลดรูปเสริมบารมี
                </button>
                <div className="grid grid-cols-2 gap-4">
                    <button 
                      onClick={() => console.log('Line Sharing...')}
                      className="bg-[#00B900] text-white py-4 rounded-2xl font-black text-lg shadow-lg active:scale-95 transition-all text-center"
                    >
                        LINE SHARE
                    </button>
                    <button 
                      onClick={resetGame}
                      className="bg-ci-dark text-ci-pink border-4 border-ci-pink py-4 rounded-2xl font-black text-lg shadow-lg active:scale-95 transition-all text-center"
                    >
                        สุ่มใหม่อีกครั้ง
                    </button>
                </div>
            </div>
        </div>
      )}

      {/* Global CSS */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-15px); }
        }
        .animate-float {
          animation: float 4s ease-in-out infinite;
        }
        @keyframes shake {
          0%, 100% { transform: rotate(0deg) translateX(0); }
          25% { transform: rotate(-5deg) translateX(-10px); }
          75% { transform: rotate(5deg) translateX(10px); }
        }
        .animate-shake {
          animation: shake 0.2s linear infinite;
        }
      `}</style>

    </div>
  );
};

export default App;
