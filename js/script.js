document.addEventListener("DOMContentLoaded", () => {
	let currentQuestionIndex = 0
	let questions = []
	let originQuestions = []
	let correctCount = 0
	let incorrectCount = 0
	let incorrectQuestions = []
	let startTime = null
	let questionTimes = [] // To store time taken for each question
	let timerInterval = null // Timer interval reference

	fetch("lib/quiz.json")
		.then((response) => response.json())
		.then((data) => {
			questions = data.questions
			originQuestions = data.questions
			showInputModal()
			document.getElementById("quizAmount").innerHTML = `<h2>학습 목표치 설정</h2><span>총 문제 수 - ${questions.length}</span>`
		})

	function showInputModal() {
		document.querySelector("#input-modal").style.display = "flex"
	}

	document.querySelector("#start-quiz").addEventListener("click", () => {
		const numberOfQuestions = parseInt(document.querySelector("#number-of-questions").value, 10)
		if (isNaN(numberOfQuestions) || numberOfQuestions <= 0) {
			alert(`${questions.length}개 중 학습하실 문제양을 입력해주세요.`)
			return
		}

		// Shuffle the questions
		questions = shuffleArray(originQuestions)

		// Limit the questions to the specified number
		questions = questions.slice(0, numberOfQuestions)

		document.querySelector("#input-modal").style.display = "none"
		document.querySelector(".card").style.display = "flex"
		document.querySelector(".front").style.display = "flex"
		showQuestion()
	})

	document.querySelector("#close-input-modal").addEventListener("click", () => {
		document.querySelector("#input-modal").style.display = "none"
		document.getElementById("outro").style.display = "flex"
	})

	function shuffleArray(array) {
		for (let i = array.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1))
			;[array[i], array[j]] = [array[j], array[i]]
		}
		return array
	}

	function formatTime(seconds) {
		const hrs = String(Math.floor(seconds / 3600)).padStart(2, "0")
		const mins = String(Math.floor((seconds % 3600) / 60)).padStart(2, "0")
		const secs = String(seconds % 60).padStart(2, "0")
		return `${hrs}:${mins}:${secs}`
	}

	function startTimer() {
		let seconds = 0
		timerInterval = setInterval(() => {
			seconds++
			document.querySelector("#timer").textContent = `타이머 ${formatTime(seconds)}`
		}, 1000)
	}

	function stopTimer() {
		clearInterval(timerInterval)
	}

	function showQuestion() {
		if (currentQuestionIndex < questions.length) {
			const question = questions[currentQuestionIndex]
			document.querySelector("#sentence").innerHTML = `<h2>${question.category}</h2><p>${question.question}</p>`
			const optionsDiv = document.querySelector("#options")
			optionsDiv.innerHTML = ""

			const incorrectAnswers = [...question.incorrectAnswers]
			const randomIncorrects = []
			while (randomIncorrects.length < 3 && incorrectAnswers.length) {
				const index = Math.floor(Math.random() * incorrectAnswers.length)
				randomIncorrects.push(incorrectAnswers.splice(index, 1)[0])
			}

			const allAnswers = [question.correctAnswer, ...randomIncorrects]
			const shuffledAnswers = allAnswers.sort(() => 0.5 - Math.random())

			shuffledAnswers.forEach((answer) => {
				const option = document.createElement("div")
				option.className = "option"
				option.textContent = answer
				option.addEventListener("click", () => handleAnswerClick(answer, question))
				optionsDiv.appendChild(option)
			})

			// Record start time for the current question
			startTime = new Date()
			startTimer()
			updateQuestionCounter()
		} else {
			showScoreModal()
		}
	}

	function handleAnswerClick(selectedAnswer, question) {
		const isCorrect = selectedAnswer === question.correctAnswer
		document.querySelector(".card").classList.add("flipped")

		document.querySelector("#answer-status").textContent = isCorrect ? "정답입니다!" : "오답입니다!"
		document.querySelector("#selected-answer").innerHTML = `<span>선택한 답</span> <p>${selectedAnswer}</p>`

		const examplesList = document.querySelector("#examples")
		examplesList.innerHTML = `
			<li>${question.usage[0]}<span class="translation"><br>${question.usageMeaning[0]}</span></li>
			<li>${question.usage[1]}<span class="translation"><br>${question.usageMeaning[1]}</span></li>
			<li>${question.usage[2]}<span class="translation"><br>${question.usageMeaning[2]}</span></li>
		`
		changeNxtBtn()
		document.querySelector("#word-meanings").innerHTML = question.wordMeanings.map((w) => `<li>${w.word}<br>${w.meaning}</li>`).join("")

		// Record time taken for the current question
		if (startTime) {
			const endTime = new Date()
			const timeTaken = Math.round((endTime - startTime) / 1000)
			questionTimes.push(timeTaken)
		}

		stopTimer()

		if (isCorrect) {
			correctCount++
		} else {
			incorrectCount++
			incorrectQuestions.push(question)
		}

		updateScoreDisplay()
		document.querySelector("#next-question").style.display = "block"
	}

	function showScoreModal() {
		const scoreSummary = document.querySelector("#score-summary")
		scoreSummary.innerHTML = `<span>정답 ${correctCount}</span><span>오답 ${incorrectCount}</span>`

		const totalTime = questionTimes.reduce((total, time) => total + time, 0)
		const averageTime = (totalTime / questionTimes.length).toFixed(2)
		document.querySelector("#time-summary").innerHTML = `총 시간 ${formatTime(totalTime)}<br>평균 시간 ${formatTime(averageTime)}초`

		document.querySelector("#score-modal").style.display = "flex"
		document.querySelector(".card").style.display = "none"
	}

	function updateScoreDisplay() {
		document.querySelector("#score-count").innerHTML = `정답 ${correctCount} | 오답 ${incorrectCount}<div id="timer">타이머 00:00:00</div>`
		updateQuestionCounter()
	}

	function updateQuestionCounter() {
		document.querySelector("#question-number").textContent = `문제 ${currentQuestionIndex + 1} / ${questions.length}`
		const currentTime = startTime ? Math.round((new Date() - startTime) / 1000) : 0
		document.querySelector("#time-taken").textContent = `시간: ${formatTime(currentTime)}`
	}

	function changeNxtBtn() {
		if (currentQuestionIndex + 1 == questions.length) {
			document.getElementById("next-question").textContent = "결과"
		} else {
			document.getElementById("next-question").textContent = "다음"
		}
	}

	document.querySelector("#next-question").addEventListener("click", () => {
		document.querySelector(".card").classList.remove("flipped")
		currentQuestionIndex++
		showQuestion()
	})

	document.querySelector("#close-modal").addEventListener("click", () => {
		document.querySelector("#score-modal").style.display = "none"
		document.getElementById("outro").style.display = "flex"
	})

	document.querySelector("#retry-quiz").addEventListener("click", () => {
		document.querySelector("#score-modal").style.display = "none"
		currentQuestionIndex = 0
		correctCount = 0
		incorrectCount = 0
		incorrectQuestions = []
		questionTimes = [] // Reset time records
		stopTimer() // Stop the timer
		document.querySelector("#timer").textContent = `타이머 00:00:00`
		showInputModal()
		updateScoreDisplay()
	})

	document.querySelector("#retry-incorrect").addEventListener("click", () => {
		questions = incorrectQuestions
		currentQuestionIndex = 0
		correctCount = 0
		incorrectCount = 0
		incorrectQuestions = []
		questionTimes = [] // Reset time records
		stopTimer() // Stop the timer
		document.querySelector("#timer").textContent = `타이머 00:00:00`
		showQuestion()
		document.querySelector("#score-modal").style.display = "none"
		document.querySelector(".card").style.display = "flex"
		updateScoreDisplay()
	})
})

document.getElementById("restart").addEventListener("click", () => {
	location.reload()
})
