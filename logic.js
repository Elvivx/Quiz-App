// Quizz api fetching......
const questions = document.querySelector('.question p')
const questionNumber = document.querySelector('.quesNumb')

let quizz = []

async function getQuizz() {
    try {
        
        let get = await fetch('https://the-trivia-api.com/v2/questions')
        let res = await get.json()
        
        res.map((ques)=>{
            quizz.push(ques)
        })

        all()
    } catch (error) {
        throw error
    }
}
getQuizz()

function all(){
    
    let currentQuestion = 1
    
    const quizContain = document.querySelector('.quizz-container')
    let btns
    
    let answers = []
    function getAnswers(){
        quizz.forEach((i)=>{
            answers.push(i.correctAnswer)
        })
    }
    
    function rend(question){
    
        question.map((quest, index)=>{
            correctAnswer = quest.correctAnswer
            let option = quest.incorrectAnswers.concat(correctAnswer)
            let options = option.sort( () => .5 - Math.random() )
            let answers = ''
            id = Math.random() * 20  // id fo the input select
            options.forEach(ops => {
                answers+= `
                    <button class="btn">
                    <input type="radio" name="${id}" value="${ops}" id="rad">
                        <label for="${id}" value="${ops}" >${ops}</label>
                    </button>
    
                `  
            });
            // displaying the questions to the viewport
            quizContain.innerHTML += `
            <div class="quiz" data-indexs="${index + 1}">
                <section class="questions">
                    <h2>Question</h2>
                    <div class="question">
                        <p>
                            ${quest.question.text}
                        </p>
                    </div>
                    <p class="quesNumb">${index + 1} / ${quizz.length }</p>
                </section>
                <section class="answers">
                    <!-- div.btns -->
                    <div class="answers-options">
                        ${answers}
                    </div>
                    <section class="nav">
                        <button class="prev">Prev</button>
                        <button class="retake hide"> Take Another Quiz </button>
                        <button class="next">Next</button>
                    </section>
                </section>
            </div>
            `
          
    
            btns = document.querySelectorAll('.btn')
            // buttons function on click 
            btns.forEach(btn => {
                btn.onclick = (e)=>{
                    let select = e.currentTarget.querySelector('#rad')
                    select.checked = true                
                    // setting the selected button to be visible
                    btns.forEach((n)=>{
                        n.classList.remove('sel')
                        if(!n.classList.contains('sel') && n.childNodes[1].checked){
                            n.classList.add('sel')
                        }
                    })
                    getAnswers()
    
                }
    
            })
    
        }) 
    }
    rend(quizz)
    
    const quizQuest = document.querySelectorAll('.quiz')
    const prevBtn = document.querySelectorAll('.nav .prev')
    const nextBtn = document.querySelectorAll('.nav .next')
    const reTake = document.querySelectorAll('.nav .retake')
    
    function navQuiz(){
        // adding the navigations to the questions
        quizQuest.forEach((quest)=>{
            
            // setting only the current question to be visible
            quest.dataset.indexs == currentQuestion ? quest.classList.remove('hide') : quest.classList.add('hide')
            
            // next button 
            nextBtn.forEach((btn)=>{
                currentQuestion == quizz.length ? btn.textContent = 'Submit' : btn.textContent = 'Next'
                
                btn.onclick = () =>{
                    if(btn.textContent == 'Submit') {
                        checkWin()
                        // take new quiz
                        reTake.forEach((Btn)=>{
                            Btn.classList.remove('hide')
                            Btn.onclick = ()=>{
                                location.reload(true)
                            }
                            btn.classList.add('hide')
                        })
                    }
                    currentQuestion == quizz.length ? currentQuestion : currentQuestion++
                    navQuiz()
                }
            })
    
            // previous button
            prevBtn.forEach((btn)=>{
                currentQuestion == 1 ? btn.style.display = 'none' : btn.style.display = 'block' 
                btn.onclick = () =>{
                    currentQuestion--
                    navQuiz()
                }
            })
            
            
            
        })
    }
    
    navQuiz()
    
    
    function checkWin(){
        // loop thru all the btns and set attributes 
        btns.forEach((a)=>{
            a.classList.add('wrong')
            a.setAttribute('disabled', true)
            a.childNodes[1].setAttribute('disabled', true)
    
            // loop thru the answers array to set the correct answer color
            answers.forEach((s)=>{
                if(s == a.childNodes[1].value){
                    a.classList.replace('wrong', 'correct')
                }
            })
        })
    
    }
}
