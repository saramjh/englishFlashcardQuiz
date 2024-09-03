const fs = require("fs")

// quiz.json 파일 읽기
fs.readFile("quiz.json", "utf8", (err, data) => {
	if (err) {
		console.error("파일을 읽는 데 오류가 발생했습니다:", err)
		return
	}

	const quizData = JSON.parse(data)
	console.log(quizData)
	const filteredQuestions = quizData.questions.filter((question) => question.incorrectAnswers.includes(question.correctAnswer))

	// 결과를 fixed.json 파일로 저장
	const result = { questions: filteredQuestions }

	fs.writeFile("fixed.json", JSON.stringify(result, null, 2), "utf8", (err) => {
		if (err) {
			console.error("파일을 쓰는 데 오류가 발생했습니다:", err)
			return
		}
		console.log("fixed.json 파일에 저장되었습니다.")
	})
})
