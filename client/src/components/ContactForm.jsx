import { useState } from 'react';

function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      alert('Por favor, completa todos los campos.');
      return;
    }

    console.log('Datos del formulario enviados:', formData);
    setSuccessMessage('¡Mensaje enviado con éxito! Gracias por contactarnos.');
    setFormData({ name: '', email: '', message: '' });
    setTimeout(() => setSuccessMessage(''), 5000);
  };

  return (
    <section className="contact-section" id="contacto">
      <div className="container">
        <div className="contact-header">
          <h1>Contacto</h1>
          <p>¿Tienes alguna pregunta? Envíanos un mensaje y te responderemos a la brevedad.</p>
        </div>
        
        <form className="contact-form" onSubmit={handleSubmit} noValidate>
          <div className="form-group">
            <label htmlFor="name">Nombre</label>
            <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="message">Mensaje</label>
            <textarea id="message" name="message" rows="6" value={formData.message} onChange={handleChange} required></textarea>
          </div>
          <button type="submit" className="btn btn-primary">Enviar Mensaje</button>
        </form>
        
        {successMessage && (
          <div className="form-message success" style={{display: 'block'}}>
            {successMessage}
          </div>
        )}
      </div>
    </section>
  );
}

export default ContactForm;
