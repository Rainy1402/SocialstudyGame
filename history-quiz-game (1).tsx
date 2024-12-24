import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Trophy, Star, Heart, ArrowRight, RotateCcw } from 'lucide-react';

const HistoryQuizGame = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [gameState, setGameState] = useState('playing'); // playing, win, lose
  const [streak, setStreak] = useState(0);
  const [highScore, setHighScore] = useState(0);

  const questions = [
    {
      question: "ยุคใดเป็นยุคที่มีอัศวินในชุดเกราะ?",
      options: ["สมัยโบราณ", "สมัยกลาง", "สมัยใหม่", "สมัยปัจจุบัน"],
      correct: 1
    },
    {
      question: "ใครเป็นคนค้นพบทวีปอเมริกา?",
      options: ["นีล อาร์มสตรอง", "โสเครตีส", "คริสโตเฟอร์ โคลัมบัส", "จูเลียส ซีซาร์"],
      correct: 2
    },
    {
      question: "สิ่งก่อสร้างใดอยู่ในสมัยโรมัน?",
      options: ["โคลอสเซียม", "หอไอเฟล", "ตึกเอ็มไพร์สเตท", "โตเกียวสกายทรี"],
      correct: 0
    },
    {
      question: "ใครเป็นมนุษย์คนแรกที่เดินบนดวงจันทร์?",
      options: ["กาลิเลโอ", "นิวตัน", "อเล็กซานเดอร์มหาราช", "นีล อาร์มสตรอง"],
      correct: 3
    },
    {
      question: "อารยธรรมใดเป็นต้นกำเนิดประชาธิปไตย?",
      options: ["โรมัน", "กรีก", "อียิปต์", "เปอร์เซีย"],
      correct: 1
    },
    {
      question: "ใครเป็นนักปราชญ์ที่มีชื่อเสียงของกรีกโบราณ?",
      options: ["เซียนหมี่", "โสเครตีส", "ขงเบ้ง", "เลโอนาร์โด ดาวินชี"],
      correct: 1
    },
    {
      question: "การปฏิวัติอุตสาหกรรมเกิดขึ้นในยุคใด?",
      options: ["สมัยโบราณ", "สมัยกลาง", "สมัยใหม่", "สมัยปัจจุบัน"],
      correct: 2
    },
    {
      question: "ใครเป็นผู้ค้นพบแรงโน้มถ่วง?",
      options: ["ไอน์สไตน์", "นิวตัน", "กาลิเลโอ", "ดาร์วิน"],
      correct: 1
    },
    {
      question: "สงครามครูเสดเกิดขึ้นในยุคใด?",
      options: ["สมัยโบราณ", "สมัยกลาง", "สมัยใหม่", "สมัยปัจจุบัน"],
      correct: 1
    },
    {
      question: "การฟื้นฟูศิลปวิทยาการ (Renaissance) เกิดขึ้นในยุคใด?",
      options: ["สมัยโบราณ", "สมัยกลาง", "สมัยใหม่", "สมัยปัจจุบัน"],
      correct: 2
    },
    {
      question: "ใครวาดภาพโมนาลิซา?",
      options: ["ไมเคิลแองเจโล", "ราฟาเอล", "เลโอนาร์โด ดาวินชี", "แวนโก๊ะ"],
      correct: 2
    },
    {
      question: "อินเทอร์เน็ตถูกพัฒนาขึ้นในยุคใด?",
      options: ["สมัยโบราณ", "สมัยกลาง", "สมัยใหม่", "สมัยปัจจุบัน"],
      correct: 3
    },
    {
      question: "จักรวรรดิโรมันล่มสลายในยุคใด?",
      options: ["สมัยโบราณ", "สมัยกลาง", "สมัยใหม่", "สมัยปัจจุบัน"],
      correct: 0
    },
    {
      question: "ผู้นำคนสำคัญของโรมันคือใคร?",
      options: ["อเล็กซานเดอร์มหาราช", "จูเลียส ซีซาร์", "คลีโอพัตรา", "ฮานนิบาล"],
      correct: 1
    },
    {
      question: "กีฬาโอลิมปิกเริ่มต้นครั้งแรกที่ไหน?",
      options: ["โรม", "กรีซ", "อียิปต์", "เปอร์เซีย"],
      correct: 1
    },
    {
      question: "ใครประดิษฐ์กล้องดูดาวคนแรก?",
      options: ["นิวตัน", "กาลิเลโอ", "ไอน์สไตน์", "คอเปอร์นิคัส"],
      correct: 1
    },
    {
      question: "สงครามโลกครั้งที่ 1 เกิดขึ้นในยุคใด?",
      options: ["สมัยโบราณ", "สมัยกลาง", "สมัยใหม่", "สมัยปัจจุบัน"],
      correct: 3
    },
    {
      question: "ใครเป็นผู้นำการสำรวจทางทะเลของโปรตุเกส?",
      options: ["วาสโก ดา กามา", "โคลัมบัส", "มาเจลลัน", "เฮนรี่ นักเดินเรือ"],
      correct: 0
    },
    {
      question: "การปฏิวัติฝรั่งเศสเกิดขึ้นในยุคใด?",
      options: ["สมัยโบราณ", "สมัยกลาง", "สมัยใหม่", "สมัยปัจจุบัน"],
      correct: 2
    },
    {
      question: "เครื่องพิมพ์ถูกประดิษฐ์ขึ้นในยุคใด?",
      options: ["สมัยโบราณ", "สมัยกลาง", "สมัยใหม่", "สมัยปัจจุบัน"],
      correct: 1
    }
  ];

  const handleAnswer = (selectedIndex) => {
    if (selectedIndex === questions[currentQuestion].correct) {
      setScore(score + 100);
      setStreak(streak + 1);
      if (streak + 1 > 2) { // โบนัสคะแนนเมื่อตอบถูก 3 ครั้งติด
        setScore(prev => prev + 50);
      }
    } else {
      setLives(lives - 1);
      setStreak(0);
    }

    if (currentQuestion + 1 < questions.length) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      if (score > highScore) {
        setHighScore(score);
      }
      setGameState('win');
    }

    if (lives - 1 === 0) {
      if (score > highScore) {
        setHighScore(score);
      }
      setGameState('lose');
    }
  };

  const resetGame = () => {
    setCurrentQuestion(0);
    setScore(0);
    setLives(3);
    setGameState('playing');
    setStreak(0);
  };

  return (
    <div className="w-full max-w-xl mx-auto p-4">
      <Card className="mb-4">
        <CardHeader>
          <CardTitle className="text-2xl text-center">เกมตอบคำถามประวัติศาสตร์</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between mb-4">
            <div className="flex items-center gap-2">
              <Trophy className="text-yellow-500" />
              <span>{score}</span>
            </div>
            <div className="flex items-center gap-2">
              <Star className="text-yellow-500" />
              <span>สถิติสูงสุด: {highScore}</span>
            </div>
            <div className="flex items-center gap-2">
              <Heart className="text-red-500" />
              <span>x{lives}</span>
            </div>
          </div>

          {gameState === 'playing' && (
            <>
              <div className="text-lg mb-4">
                คำถามข้อที่ {currentQuestion + 1} จาก {questions.length}: {questions[currentQuestion].question}
              </div>
              <div className="grid grid-cols-1 gap-2">
                {questions[currentQuestion].options.map((option, index) => (
                  <Button
                    key={index}
                    onClick={() => handleAnswer(index)}
                    className="text-left p-4"
                    variant="outline"
                  >
                    {option}
                  </Button>
                ))}
              </div>
              {streak > 1 && (
                <div className="mt-4 text-center text-yellow-500">
                  🔥 ตอบถูก {streak} ครั้งติด!
                </div>
              )}
            </>
          )}

          {gameState === 'win' && (
            <div className="text-center">
              <h2 className="text-2xl mb-4">🎉 ยินดีด้วย! คุณตอบคำถามครบทุกข้อแล้ว</h2>
              <p className="mb-4">คุณได้ {score} คะแนน</p>
              <Button onClick={resetGame} className="flex items-center gap-2">
                <RotateCcw size={16} />
                เล่นอีกครั้ง
              </Button>
            </div>
          )}

          {gameState === 'lose' && (
            <div className="text-center">
              <h2 className="text-2xl mb-4">😢 เกมจบ</h2>
              <p className="mb-4">คุณได้ {score} คะแนน</p>
              <p className="mb-4">ตอบได้ถึงข้อที่ {currentQuestion + 1} จาก {questions.length}</p>
              <Button onClick={resetGame} className="flex items-center gap-2">
                <RotateCcw size={16} />
                เล่นใหม่
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default HistoryQuizGame;
