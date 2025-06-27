import { useState, useEffect } from 'react';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    nom: '',
    email: '',
    content: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }


  useEffect(() => {
    setFormData({
      nom: '',
      email: '',
      content: '',
    });
  }, []);

  const handleSubmit =async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    console.log('LOG formData', formData);
    await fetch(`/api/sendMessage`, {
      method: 'POST',
      body: formData,
    });

    setFormData({
      nom: '',
      email: '',
      content: 'Message envoyé avec succès !',
    });
  };

  return (
  <form id="form" onSubmit={handleSubmit} className=" flex flex-col gap-[2em] w-[100%] p-4">
    <div className="flex justify-between gap-[3em]">
      <div className="w-[50%]">
        <p>Nom</p>
        <input type="text" name="nom" value={formData.nom} onChange={handleChange} required className="border-[1px] w-[100%]" />
      </div>
      <div className="w-[50%]">
      <p>Email</p>
        <input type="text" name="email" value={formData.email} onChange={handleChange} required className="border-[1px] w-[100%]" />
      </div>
    </div>
    <div>
    <p>Message</p>
    <textarea name="content" spellCheck="false" value={formData.content} onChange={handleChange} rows="8" cols="50" required className="border-[1px] w-full"></textarea>
    </div>
    <div className="flex justify-end">
    <button type="submit" className="border-[1px] w-[8em] cursor-pointer orange">Envoyer</button>
    </div>
  </form>


)}
