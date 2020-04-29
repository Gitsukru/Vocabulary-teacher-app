//Dom da sorulari olusturma fonksiyonu
function renderToData() {
    quizData.map(questionsItem => {
        quizItemTemplate += `
       <div class="card">
          <button style="animation-delay:${questionsItem.questionsId/10}s" class="btn btn-primary btn-lg btn-block mb-3 question-item-button soldanGel" type="button" data-toggle="collapse"
             data-target="#collapse-${questionsItem.questionsId}" aria-expanded="true" aria-controls="collapseOne">${questionsItem.questions}
          </button>
          <div id="collapse-${questionsItem.questionsId}" class="collapse" aria-labelledby="headingOne" data-parent="#accordionExample">
                <div class="card-body d-flex">
                ${questionsItem.answer.map(answerOptions => 
                   `<div class="flex-fill">
                            <input class="form-check-input" type="radio" name="exampleRadios" id="opt-${questionsItem.questionsId}-${answerOptions.optC}"
                            onchange="setAnswer('${questionsItem.questionsId}', '${answerOptions.optC}', '${answerOptions.optT}')">
 
                            <label class="form-check-label btn btn-info d-block mx-2" for="opt-${questionsItem.questionsId}-${answerOptions.optC}">
                            <span class="badge badge-light mr-2">${answerOptions.optC}</span> ${answerOptions.optT}</label>
                      </div>`
                      ).join("")
                }
                </div>
          </div>
       </div>`
    });
    quizItemContainer.innerHTML = quizItemTemplate;
}
//Baslama butonuna basilinca sorulari getiren fonksiyon sayaci baslatan
startQuizBtn.addEventListener("click", function () {
    renderToData();
    questionTitle.style.display = "block";
    this.classList.add("d-none");

    timer(1, 20);
})
//secilen cevaplari dogrumu yanlismi karsilastiran ve sonuclari gosteren fonksiyon
function setAnswer(id, sign, name) {
    let newObj = {
        questionId: parseInt(id),
        answerSign: sign,
        answerName: name,
        correctSign: false
    }
    if (userSelectedAnswer.filter(item => item.questionId === parseInt(id)).length == 0) {
        userSelectedAnswer.push(newObj);
    } else {
        let answerValues = userSelectedAnswer.filter(item => item.questionId === newObj.questionId)[0];
        answerValues.answerSign = sign;
        answerValues.answerName = name;
        answerValues.correctSign = false;
    }
    correctAnswers.filter(item => item.questionsId === parseInt(id))
        .filter(filteredItem => {
            if (filteredItem.correctAnswer === sign) {
                userSelectedAnswer.filter(item => item.questionId === newObj.questionId)[0].correctSign = true;

            }
        })
    quizData.length === userSelectedAnswer.length ? showResult.style.display = "block" : "none";
};

// sonucu göster ve dom a yazdir fonksiyonu 
showResult.addEventListener("click", function () {
    let selectedAnswerTemplate = "";
    userSelectedAnswer.sort(function (a, b) {
        return a.questionId - b.questionId;
    });
    userSelectedAnswer.map(item => {
        selectedAnswerTemplate += `<div class="btn btn-outline-${item.correctSign == true ? "success" : "danger"} btn-block mb-2 text-left" role="alert">
       <span class="badge badge-light mr-2">${item.questionId} - ${item.answerSign}</span>${item.answerName}</div>`
    })
    userSelectedAnswerContainer.innerHTML = selectedAnswerTemplate;
    let totalPoint = userSelectedAnswer.filter(trueVal => trueVal.correctSign == true).reduce((calc) => {

        return calc + refPoint;
    }, 0);

    userPoint.innerHTML = Math.round(totalPoint);
    clearInterval(timeFire);
    setQuestionsDisabled();
    setCollapseHide();
})

// sayaç fonksiyonu
function timer(minute, second) {
    timeFire = setInterval(countDown, 1000);
    function countDown() {
        second--;
        let currentTime = minute + ":" + (second < 10 ? "0" : "") + second;
        timerBox.innerHTML = currentTime;
        if (second == 0) {
            if (minute > 0 && second == 0) {
                minute--;
                second = 60;
            } else {
                clearInterval(timeFire);
                showResult.click();
                setQuestionsDisabled();
                setCollapseHide();
            }
        }
    }
}

//soru butonlarini iptal butonu
function setQuestionsDisabled() {
    let questionItemBtn = document.querySelectorAll(".question-item-button");
    questionItemBtn.forEach(item => {
        item.setAttribute("disabled", "true");
    })
}

// sorular bitince kapansin fonksiyonu
function setCollapseHide() {
    let allCollapse = document.querySelectorAll(".collapse");
    allCollapse.forEach(item => {
        item.classList.remove("show");
    })
}