'use client';
import { useState, useEffect } from 'react';
import quizData from '../data/quiz.json';

type Q = {
  id: number;
  type: 'single' | 'multi' | 'tf';
  question: string;
  options: string[];
  answer: string[];
};

export default function HomePage() {
  const [current, setCurrent] = useState<Q[]>([]);
  const [selected, setSelected] = useState<Record<number,string[]>>({});
  const [results, setResults] = useState<Record<number, boolean>>({});
  const [submitted, setSubmitted] = useState(false);

  function shuffleQuestions() {
    const copy = [...quizData];
    for (let i = copy.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    setCurrent(copy.slice(0, 3));
    setSelected({});
    setResults({});
    setSubmitted(false);
  }

  useEffect(() => {
    shuffleQuestions();
  }, []);

  function onChange(q: Q, idx: number, checked: boolean) {
    setSelected(prev => {
      const letter = String.fromCharCode(65 + idx);
      return { ...prev, [q.id]: [letter] };
    });
  }

  function onSubmit() {
    const res: Record<number, boolean> = {};
    current.forEach(q => {
      const user = selected[q.id] || [];
      res[q.id] = user.join() === q.answer.join();
    });
    setResults(res);
    setSubmitted(true);
  }

  return (
    <section style={{ padding: 20 }}>
      <h2 style={{ fontSize: 24, fontWeight: 'bold' }}>如视100问</h2>
      <button onClick={shuffleQuestions}>换一组题目</button>
      <form onSubmit={e => { e.preventDefault(); onSubmit(); }}>
        {current.map((q, idx) => (
          <div key={q.id} style={{ marginTop: 20 }}>
            <p>{idx+1}. {q.question}</p>
            {q.options.map((opt, oi) => {
              const letter = String.fromCharCode(65 + oi);
              const checked = selected[q.id]?.includes(letter) || false;
              return (
                <label key={oi} style={{ display: 'block' }}>
                  <input
                    type="radio"
                    name={`q${q.id}`}
                    checked={checked}
                    onChange={e => onChange(q, oi, e.target.checked)}
                  />
                  {letter}. {opt}
                </label>
              );
            })}
            {submitted && (
              <p style={{ color: results[q.id] ? 'green' : 'red' }}>
                {results[q.id] ? '✔ 答对了' : `✘ 答错，正确答案：${q.answer.join(',')}`}
              </p>
            )}
          </div>
        ))}
        <button type="submit" style={{ marginTop: 20 }}>提交答案</button>
      </form>
    </section>
  );
}