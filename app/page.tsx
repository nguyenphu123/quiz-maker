"use client";

import { useState } from "react";

export default function Home() {
  let [quizList, setQuizList]: any = useState([]);
  let [textTitle, setTextTitle]: any = useState("");
  function getRandomInt(max: number) {
    return Math.floor(Math.random() * max);
  }
  function addQuiz() {
    let newQuiz = {
      id: getRandomInt(100000),
      question: "",
      type: "singleChoice",
      score: 0,
      anwsers: [
        {
          id: getRandomInt(100000),
          text: "",
          isCorrect: false,
        },
      ],
    };
    setQuizList([...quizList, newQuiz]);
  }
  function removeQuestion(index: any) {
    let newQuizsList = [...quizList];

    newQuizsList.splice(index, 1);
    setQuizList([...newQuizsList]);
  }
  function addAnwser(index: any) {
    let newQuizsList = [...quizList];
    let newAnwser = {
      id: getRandomInt(100000),
      text: "",
      isCorrect: false,
    };
    newQuizsList[index].anwsers = [...newQuizsList[index].anwsers, newAnwser];
    setQuizList([...newQuizsList]);
  }
  function removeAnwser(index: any, jindex: any) {
    let newQuizsList = [...quizList];

    newQuizsList[index].anwsers.splice(jindex, 1);
    setQuizList([...newQuizsList]);
  }
  function questionOnChangeText(e: any, index: any) {
    e.preventDefault();
    let newQuizsList = [...quizList];
    newQuizsList[index].question = e.target.value;
    setQuizList(() => [...newQuizsList]);
  }
  function questionOnChangeScore(e: any, index: any) {
    e.preventDefault();
    let newQuizsList = [...quizList];
    newQuizsList[index].score = e.target.value;
    setQuizList(() => [...newQuizsList]);
  }
  function questionOnChangeType(e: any, index: any) {
    e.preventDefault();
    let newQuizsList = [...quizList];
    newQuizsList[index].type = e.target.value;
    setQuizList(() => [...newQuizsList]);
  }
  function awnserOnChange(e: any, index: any, jindex: any) {
    // e.preventDefault();
    let newQuizsList = [...quizList];
    newQuizsList[index].anwsers[jindex].text = e.target.id.value;
    setQuizList(() => [...newQuizsList]);
  }

  function correctAwnserOnChange(e: any, index: any, id: any) {
    // e.preventDefault();
    let newQuizsList = [...quizList];
    if (newQuizsList[index].type == "singleChoice") {
      if (e.target.checked == true) {
        let checkExistAnswer = newQuizsList[index].anwsers
          .map((item: any) => item.isCorrect == true)
          .indexOf(true);
        if (checkExistAnswer != -1) {
          alert("Sorry only one correct anwser for single choice question");
          return;
        } else {
        }
      } else {
      }
    } else {
    }
    let newAwnserList = newQuizsList[index].anwsers.map((item: any) => {
      return item.id === id ? { ...item, isCorrect: e.target.checked } : item;
    });
    newQuizsList[index].anwsers = [...newAwnserList];
    setQuizList(newQuizsList);
  }
  function submit() {
    if (quizList.length == 0) {
      alert("Please add some questions");
    } else {
      let newQuizsList = [...quizList];
      let checkScore = newQuizsList.map((item: any) =>
        item.anwsers.map((item: any) => item.score)
      );
      if (checkScore.indexOf(0) != -1) {
        alert("Sorry all questions must have score > 0");
        return;
      } else {
        let checkAnswersList = newQuizsList.map((item: any) =>
          item.anwsers.map((item: any) => item.isCorrect == true).indexOf(true)
        );

        if (checkAnswersList.indexOf(-1) != -1) {
          alert("Sorry all questions must have at least one correct anwser");
          return;
        } else {
        }
      }
    }
    alert("Test created");
  }
  return (
    <main className=" min-h-screen  justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm ">
        <input
          type="text"
          name={"text_title"}
          onChange={(e) => setTextTitle(e.target.value)}
        />

        <div>
          total score:
          {quizList.reduce(
            (n: any, { score }: any) => parseInt(n) + parseInt(score),
            0
          )}
        </div>
        <button onClick={() => addQuiz()}>+</button>
        {quizList.map((quiz: any, index: any) => {
          return (
            <div key={quiz.id}>
              <button onClick={() => removeQuestion(index)}>X</button>
              <input
                type="text"
                name={quiz.id + " name"}
                onChange={(e) => questionOnChangeText(e, index)}
              />
              <input
                type="text"
                value={quiz.score}
                name={quiz.id + " score"}
                onChange={(e) => questionOnChangeScore(e, index)}
              />

              <select
                onChange={(e) => questionOnChangeType(e, index)}
                name={quiz.id + " type"}
              >
                <option value="singleChoice">Single choice</option>
                <option value="multiChoice">Multiple choice</option>
              </select>

              {quiz.anwsers.map((anwser: any, jindex: any) => {
                return (
                  <div key={anwser.id}>
                    {/* <input type="radio" name={jindex} /> */}
                    <button onClick={() => removeAnwser(index, jindex)}>
                      X
                    </button>
                    <input
                      type="text"
                      name={anwser.id}
                      onChange={(e) => awnserOnChange(e, index, jindex)}
                    />
                    <input
                      type="checkbox"
                      checked={anwser.isCorrect}
                      name={index}
                      onChange={(e) =>
                        correctAwnserOnChange(e, index, anwser.id)
                      }
                    />
                    <label htmlFor={anwser.id}>is correct?</label>
                  </div>
                );
              })}

              <button onClick={() => addAnwser(index)}>+</button>
            </div>
          );
        })}
        <button onClick={() => submit()}>Submit</button>
      </div>
    </main>
  );
}
