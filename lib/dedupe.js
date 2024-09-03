const fs = require("fs")

// quiz.json 파일 읽기
fs.readFile("quiz.json", "utf8", (err, data) => {
	if (err) {
		console.error(err)
		return
	}

	// JSON 파싱
	const jsonData = JSON.parse(data)
	const questions = jsonData.questions

	// 중복 제거
	const uniqueQuestions = []
	const questionSet = new Set()

	questions.forEach((questionObj) => {
		if (!questionSet.has(questionObj.question)) {
			questionSet.add(questionObj.question)
			uniqueQuestions.push(questionObj)
		}
	})

	// 결과를 fixed.json으로 저장
	const outputData = { questions: uniqueQuestions }

	fs.writeFile("fixed.json", JSON.stringify(outputData, null, 4), (err) => {
		if (err) {
			console.error(err)
			return
		}
		console.log("fixed.json 파일이 성공적으로 저장되었습니다.")
	})
})
