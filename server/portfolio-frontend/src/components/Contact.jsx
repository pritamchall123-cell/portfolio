import { useState } from 'react';
import { motion } from 'framer-motion';
import './Contact.css';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState({ text: '', type: '' });
  const [sending, setSending] = useState(false);

  function update(field) {
    return (e) => setForm((f) => ({ ...f, [field]: e.target.value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const { name, email, message } = form;

    if (!name.trim() || !email.trim() || !message.trim()) {
      setStatus({ text: 'Please fill in every field.', type: 'error' });
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setStatus({ text: 'That email address looks invalid.', type: 'error' });
      return;
    }

    setSending(true);
    setStatus({ text: 'Sending…', type: 'loading' });

    try {
      const res = await fetch('/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, message }),
      });
      const data = await res.json();

      if (data.success) {
        setStatus({ text: 'Message sent — thanks for reaching out!', type: 'success' });
        setForm({ name: '', email: '', message: '' });
      } else {
        setStatus({ text: data.error || 'Something went wrong.', type: 'error' });
      }
    } catch {
      setStatus({ text: 'Server error — please try again shortly.', type: 'error' });
    } finally {
      setSending(false);
    }
  }

  return (
    <section id="contact" className="contact">
      <motion.div
        className="contact__inner"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      >
        <span className="eyebrow">Contact</span>
        <h2 className="contact__title">Let's build something</h2>
        <p className="contact__lede">
          I'm open to internships, collaborations, and interesting projects.
          If you have something in mind, don't hesitate to reach out.
        </p>

        <form className="contact__form" onSubmit={handleSubmit} noValidate>
          <div className="contact__row">
            <label>
              <span>Name</span>
              <input type="text" value={form.name} onChange={update('name')} placeholder="Your name" />
            </label>
            <label>
              <span>Email</span>
              <input type="email" value={form.email} onChange={update('email')} placeholder="you@example.com" />
            </label>
          </div>
          <label>
            <span>Message</span>
            <textarea rows="5" value={form.message} onChange={update('message')} placeholder="What's on your mind?" />
          </label>

          <div className="contact__submit-row">
            <button className="btn btn--primary" type="submit" disabled={sending}>
              {sending ? 'Sending…' : 'Send message'}
            </button>
            <a className="contact__email-link" href="mailto:pritamchall123@gmail.com">
              or email directly
            </a>
          </div>

          <p className={`contact__status contact__status--${status.type}`} role="status" aria-live="polite">
            {status.text}
          </p>
        </form>

        <div className="contact__socials">
          <a href="https://github.com/pritamchall123-cell" target="_blank" rel="noopener noreferrer">GitHub</a>
          <a href="https://www.linkedin.com/in/pritam-chall-32a0a5296" target="_blank" rel="noopener noreferrer">LinkedIn</a>
        </div>
      </motion.div>
    </section>
  );
}