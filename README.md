# CEFR B1-B2 영어 무료 학습
![Screenshot 2024-09-02 at 02 08 21](https://github.com/user-attachments/assets/7a9af084-d57f-4252-becc-687465f96f26)
![Screenshot 2024-09-02 at 02 08 22](https://github.com/user-attachments/assets/330547b2-0ebd-4f75-b3d0-33695645902e)
![Screenshot 2024-09-02 at 02 09 49](https://github.com/user-attachments/assets/74b974a2-7cd1-4921-8b66-8e11eae52802)


## 프로젝트 개요

**CEFR B1-B2 영어 무료 학습**은 한국인을 대상으로 한 영어 학습 웹 애플리케이션입니다. 이 애플리케이션은 사용자가 CEFR(유럽언어공통참조기준) B1-B2 수준의 영어를 재미있게 학습할 수 있도록 돕는 것을 목표로 합니다. 퀴즈 형식의 문제를 풀면서 실용적인 영어 표현을 익히고, 학습한 내용을 바로 적용할 수 있습니다.

## 주요 기능

- **학습 목표 설정:** 학습할 문제의 수를 설정하고 학습을 시작할 수 있습니다.
- **퀴즈 문제 풀이:** 각 문제는 사용자의 영어 실력을 테스트할 수 있는 질문과 답변 선택지를 포함합니다.
- **실시간 타이머:** 문제를 푸는 동안 실시간 타이머가 동작하여 시간을 측정합니다.
- **결과 요약:** 퀴즈가 종료된 후 정답과 오답 개수, 문제 풀이에 소요된 총 시간과 평균 시간을 요약해 보여줍니다.
- **오답 재학습:** 틀린 문제만 다시 풀어볼 수 있는 기능을 제공합니다.

## 파일 구조

```bash
.
├── index.html          # 메인 HTML 파일
├── css/
│   └── style.css       # 스타일시트 파일
├── js/
│   └── script.js       # JavaScript 로직 구현 파일
└── lib/
    └── quiz.json       # 퀴즈 데이터가 담긴 JSON 파일
```
````

## 설치 및 실행 방법

1. **프로젝트 클론:**

   ```bash
   git clone https://github.com/saramjh/englishFlashcardQuiz.git
   ```

2. **프로젝트 디렉토리로 이동:**

   ```bash
   cd cefr-b1-b2-quiz
   ```

3. **웹 브라우저에서 실행:**
   프로젝트 디렉토리에서 `index.html` 파일을 더블 클릭하여 웹 브라우저에서 열어 실행합니다.

## 사용 방법

1. **학습 목표 설정:**

   - 퀴즈 시작 전, 학습할 문제의 수를 설정합니다. 총 문제 수 내에서 학습할 문제 갯수를 입력하고 "시작" 버튼을 누르면 퀴즈가 시작됩니다.

2. **문제 풀이:**

   - 각 문제에 대해 제공된 답변 선택지 중 하나를 선택하세요. 선택 후 정답 여부와 추가 설명이 표시됩니다.

3. **결과 확인:**

   - 모든 문제를 풀고 나면, 정답과 오답 개수, 문제 풀이에 소요된 총 시간과 평균 시간이 요약된 결과 화면이 나타납니다.

4. **오답 재학습:**
   - 오답으로 기록된 문제들을 다시 풀어볼 수 있습니다.

## 기여 방법

이 프로젝트에 기여하고 싶다면 다음 단계를 따르세요:

1. 이 저장소를 포크합니다.
2. 새로운 브랜치를 생성합니다 (`git checkout -b feature/new-feature`).
3. 변경 사항을 커밋합니다 (`git commit -m 'Add new feature'`).
4. 브랜치를 푸시합니다 (`git push origin feature/new-feature`).
5. Pull Request를 생성합니다.

## 라이센스

이 프로젝트는 MIT 라이센스 하에 배포됩니다. 자세한 내용은 [LICENSE](./LICENSE) 파일을 참조하세요.

## 저작권 정보

© 2024 [saramjh](https://github.com/saramjh/englishFlashcardQuiz). All rights reserved.
