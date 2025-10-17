import { useEffect, useState } from "react";
import starIcon from "../assets/images/icon-star.svg";
import plusIcon from "../assets/images/icon-plus.svg";
import minusIcon from "../assets/images/icon-minus.svg";
import desktopBg from "../assets/images/background-pattern-desktop.svg";
import mobileBg from "../assets/images/background-pattern-mobile.svg";
import "../App.css";

interface FAQItem {
  question: string;
  answer: string;
}

export default function FAQ() {
  const [faqs, setFaqs] = useState<FAQItem[]>([]);
  const [active, setActive] = useState<number | null>(0);

  useEffect(() => {
    fetch("/data.json")
      .then((r) => r.json())
      .then(setFaqs)
      .catch(console.error);
  }, []);

  const toggle = (i: number) => setActive((prev) => (prev === i ? null : i));

  return (
    <div className="faq-page">
      {}
      <picture className="bg-top" aria-hidden="true">
        <source media="(max-width:600px)" srcSet={mobileBg} />
        <img src={desktopBg} alt="" />
      </picture>

      <div className="faq-card">
        <div className="faq-header">
          <img src={starIcon} alt="star" />
          <h1>FAQs</h1>
        </div>

        {faqs.map((faq, i) => (
          <div key={i} className="faq-item" onClick={() => toggle(i)}>
            <div className="faq-question">
              <span>{faq.question}</span>
              <img src={active === i ? minusIcon : plusIcon} alt="" className="faq-toggle-icon" />
            </div>
            <div
              className="faq-answer"
              style={{
                maxHeight: active === i ? "200px" : "0",
                opacity: active === i ? 1 : 0,
              }}
            >
              {faq.answer}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
