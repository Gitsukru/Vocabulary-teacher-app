/**
 * Amaç insalarin kelime örenmesi
 * 
 * Akis
 *  
 *  - Sayfa yüklendiginde start butonu gelecek basinca sorular siralanacak
 *  - 10 soru olacak her sorunun 4 şıkkı olacak bir şık dogru cevabi olacak 
 *  - bir tane sayac olsun ustte 2dk dan geri sayacak
 *  - tum sorulari cevapladiktan sonra modal acilacak ve dogru cevap ve 
 *        yanlislari görülecek puaniyla beraber
 *  - süre bitmeden tüm sorulari cevaplamis olursa butona tiklayip sonuclari görecek 
 * 
 * analiz
 * 
 *  - bir buton (start) sorulari baslatsin ve bir sayaç görünsün
 *  - sorular gelince start butonu gizlensin sorular görünsün
 *  - sayaç geriye dogru saymaya baslasın
 *  - sorunun altinda 4 sik buton olsun ve her soru butona tıklayınca acılsın
 *  - zaman bitince sonucu göster modal açılsın ve kac dogru kac yanlıs var görülsün
 */

let quizItemTemplate = "",
   quizItemContainer = document.querySelector(".quiz-item-container"),
   userSelectedAnswerContainer = document.querySelector(".result-list-box"),
   showResult = document.querySelector(".show-result"),
   userPoint = document.querySelector(".total-point"),
   counter = document.querySelector(".count-down-box"),
   startQuizBtn = document.querySelector(".quiz-start-btn"),
   questionTitle = document.querySelector(".question-title")
   timerBox = document.querySelector(".count-down-box");

let quizData = [{
      questionsId: 1,
      questions: "La table",
      answer: [{
            optC: "A",
            optT: "Masa"
         },
         {
            optC: "B",
            optT: "Bardak"
         },
         {
            optC: "C",
            optT: "tekne"
         },
         {
            optC: "D",
            optT: "Kus"
         }
      ]
   },
   {
      questionsId: 2,
      questions: "La raison",
      answer: [{
            optC: "A",
            optT: "Okyanus"
         },
         {
            optC: "B",
            optT: "Hüner"
         },
         {
            optC: "C",
            optT: "Beceri"
         },
         {
            optC: "D",
            optT: "Sebep"
         }
      ]
   },
   {
      questionsId: 3,
      questions: "Le jardin",
      answer: [{
            optC: "A",
            optT: "Mutfak"
         },
         {
            optC: "B",
            optT: "Çimen"
         },
         {
            optC: "C",
            optT: "Bahçe"
         },
         {
            optC: "D",
            optT: "Dolap"
         }
      ]
   },
   {
      questionsId: 4,
      questions: "Le tapis",
      answer: [{
            optC: "A",
            optT: "Halı"
         },
         {
            optC: "B",
            optT: "Bardak"
         },
         {
            optC: "C",
            optT: "Tablo"
         },
         {
            optC: "D",
            optT: "Top"
         }
      ]
   },
   {
      questionsId: 5,
      questions: "La mode de vie",
      answer: [{
            optC: "A",
            optT: "Daga tirmanma"
         },
         {
            optC: "B",
            optT: "yasam tarzı"
         },
         {
            optC: "C",
            optT: "Merdivenden inmek"
         },
         {
            optC: "D",
            optT: "Dönme"
         }
      ]
   },
   {
      questionsId: 6,
      questions: "La secret",
      answer: [{
            optC: "A",
            optT: "Kibir"
         },
         {
            optC: "B",
            optT: "Kelepçe"
         },
         {
            optC: "C",
            optT: "Sır"
         },
         {
            optC: "D",
            optT: "Tahta"
         }
      ]
   },
   {
      questionsId: 7,
      questions: "Apprendre",
      answer: [{
            optC: "A",
            optT: "Unutmak"
         },
         {
            optC: "B",
            optT: "Sevinmek"
         },
         {
            optC: "C",
            optT: "Kesmek"
         },
         {
            optC: "D",
            optT: "Ögrenmek"
         }
      ]
   },
   {
      questionsId: 8,
      questions: "Comprendre",
      answer: [{
            optC: "A",
            optT: "anlamak "
         },
         {
            optC: "B",
            optT: "Satmak"
         },
         {
            optC: "C",
            optT: "Ölmek"
         },
         {
            optC: "D",
            optT: "Gezmek"
         }
      ]
   },
   {
      questionsId: 9,
      questions: "Aider",
      answer: [{
            optC: "A",
            optT: "yardım etmek"
         },
         {
            optC: "B",
            optT: "tanımak"
         },
         {
            optC: "C",
            optT: "Görmek"
         },
         {
            optC: "D",
            optT: "Duymak"
         }
      ]
   },
   {
      questionsId: 10,
      questions: "Le pays",
      answer: [{
            optC: "A",
            optT: "Il"
         },
         {
            optC: "B",
            optT: "Sınır"
         },
         {
            optC: "C",
            optT: "Ülke"
         },
         {
            optC: "D",
            optT: "Uzay"
         }
      ]
   }
]

let correctAnswers = [{
      questionsId: 1,
      correctAnswer: "A"
   },
   {
      questionsId: 2,
      correctAnswer: "D"
   },
   {
      questionsId: 3,
      correctAnswer: "C"
   },
   {
      questionsId: 4,
      correctAnswer: "A"
   },
   {
      questionsId: 5,
      correctAnswer: "B"
   },
   {
      questionsId: 6,
      correctAnswer: "C"
   },
   {
      questionsId: 7,
      correctAnswer: "D"
   },
   {
      questionsId: 8,
      correctAnswer: "A"
   },
   {
      questionsId: 9,
      correctAnswer: "A"
   },
   {
      questionsId: 10,
      correctAnswer: "C"
   }
]

//kullanicinin sectifgi cevaplari tutacaggimiz degisken
let userSelectedAnswer = [];

let refPoint = 100 / quizData.length
//Sayaç degiskeni
let timeFire;