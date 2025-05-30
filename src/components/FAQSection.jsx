import React, { useState, useEffect } from 'react';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';

const FAQItem = ({ question, answer, isOpen, onClick }) => (
  <div style={{ border: '1px solid #e0e0e0', borderRadius: '4px', marginBottom: '10px', overflow: 'hidden' }}>
    <button
      onClick={onClick}
      style={{
        width: '100%',
        padding: '15px',
        backgroundColor: isOpen ? '#f9f9f9' : '#fff',
        border: 'none',
        textAlign: 'left',
        fontSize: '16px',
        fontWeight: '500',
        cursor: 'pointer',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}
    >
      <span style={{ fontWeight: '500', color: '#333' }}>{question}</span>
      {isOpen ? <FiChevronUp /> : <FiChevronDown />}
    </button>
    {isOpen && (
      <div style={{ padding: '15px', backgroundColor: '#f9f9f9' }}>
        <p style={{ color: '#555', fontSize: '14px' }}>{answer}</p>
      </div>
    )}
  </div>
);

const FAQSection = () => {
  const defaultFaqs = [
    {
      question: 'What is your return policy?',
      answer: 'We offer a 30-day return policy from the date of delivery.'
    },
    {
      question: 'How can I track my order?',
      answer: 'Once shipped, you will receive a tracking number via email.'
    },
    {
      question: 'Do you offer international shipping?',
      answer: 'Yes, we ship to many countries worldwide. Shipping fees apply.'
    }
  ];

  const [faqs, setFaqs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [openIndex, setOpenIndex] = useState(null);

  useEffect(() => {
    const fetchFAQs = async () => {
      setLoading(true);
      try {
        const response = await fetch('https://your-api-endpoint.com/faqs');
        if (!response.ok) throw new Error('Failed to fetch FAQs');
        const data = await response.json();
        if (data && data.length > 0) {
          setFaqs(data);
        } else {
          setFaqs(defaultFaqs); // fallback if empty response
        }
      } catch (err) {
        setError('Unable to load FAQs. Showing default FAQs.');
        setFaqs(defaultFaqs); // fallback on error
      } finally {
        setLoading(false);
      }
    };
    fetchFAQs();
  }, []);

  if (loading) return <div style={{ textAlign: 'center', margin: '20px 0' }}>Loading FAQs...</div>;

  return (
    <div style={{ maxWidth: '800px', margin: '40px auto', padding: '0 20px' }}>
      <h2 style={{ marginBottom: '20px', fontSize: '22px', color: '#333' }}>Frequently Asked Questions</h2>
      {error && <div style={{ color: 'red', marginBottom: '10px', textAlign: 'center' }}>{error}</div>}
      {faqs.map((faq, index) => (
        <FAQItem
          key={index}
          question={faq.question}
          answer={faq.answer}
          isOpen={openIndex === index}
          onClick={() => setOpenIndex(openIndex === index ? null : index)}
        />
      ))}
    </div>
  );
};

export default FAQSection;
