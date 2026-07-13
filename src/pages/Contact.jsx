import "./Contact.css"
import React, { useState } from 'react';
import { Send, Phone, Mail, MapPin, Clock, Globe, Upload } from 'lucide-react';
import { db } from '../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

export default function Contact(){
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    subject: '',
    message: ''
  });

  // Track the physical file selected by the user
  const [selectedFile, setSelectedFile] = useState(null);
  const [status, setStatus] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Intercept the file when chosen through the window browser explorer
  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus('Sending your inquiry...');

    try {
      // Add document to Firestore
      await addDoc(collection(db, 'inquiries'), {
        fullName: formData.fullName,
        email: formData.email,
        subject: formData.subject,
        message: formData.message,
        attachment: selectedFile ? selectedFile.name : null,
        timestamp: serverTimestamp()
      });

      setStatus('Inquiry sent successfully! Our stone experts will review it. ✅');
      setFormData({ fullName: '', email: '', subject: '', message: '' });
      setSelectedFile(null);
    } catch (error) {
      console.error('Error submitting inquiry:', error);
      setStatus('Something went wrong. Please try again. ❌');
    } finally {
      setIsSubmitting(false);
    }
  };

  return(
    <div className="contact-page-container">
      <div className="discuss-project-section">
        <div className="discuss-project">
          <h2 className="discuss-project-heading">Let's Discuss Your Project</h2>
          <p className="discuss-project-text">
            Whether you are an architect sourcing for a large-scale development or a homeowner selecting the perfect marble for your kitchen, our stone experts are here to assist.
          </p>
        </div>
      </div>  
      
      <div className="contact-layout-grid">
        <main className="inquiry-form-section">
          <h1 className="form-main-title">Send an Inquiry</h1>
          <p className="form-subtitle">Fill out the form below and we will get back to you within 24 hours.</p>
          
          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-row-twin">
              <div className="form-group">
                <label htmlFor="fullName">FULL NAME</label>
                <input type="text" id="fullName" name="fullName" required placeholder="e.g. Alexander Stone" value={formData.fullName} onChange={handleChange} />
              </div>
              <div className="form-group">
                <label htmlFor="email">EMAIL ADDRESS</label>
                <input type="email" id="email" name="email" required placeholder="alexander@architect.com" value={formData.email} onChange={handleChange} />
              </div>
            </div>

            <div className="form-group full-width">
              <label htmlFor="subject">SUBJECT</label>
              <input type="text" id="subject" name="subject" required placeholder="How can we help you?" value={formData.subject} onChange={handleChange} />
            </div>

            <div className="form-group full-width">
              <label htmlFor="message">MESSAGE</label>
              <textarea id="message" name="message" rows="6" required placeholder="Tell us about your project requirements..." value={formData.message} onChange={handleChange}></textarea>
            </div>

            <div className="form-group full-width">
              <label>ATTACHMENTS <span className="optional-text">(OPTIONAL)</span></label>
              
              {/* Click triggers the hidden document explorer tag below */}
              <div 
                className="upload-dropzone" 
                onClick={() => document.getElementById('architecture-file-portal').click()}
                style={{ cursor: 'pointer', borderColor: selectedFile ? '#c4a70b' : '' }}
              >
                <input 
                  type="file" 
                  id="architecture-file-portal" 
                  style={{ display: 'none' }} 
                  onChange={handleFileChange} 
                />
                <Upload size={24} className="upload-icon" style={{ color: selectedFile ? '#c4a70b' : '#666' }} />
                <p className="upload-main-text" style={{ color: selectedFile ? '#fff' : '' }}>
                  {selectedFile ? `Selected asset: ${selectedFile.name}` : 'Click to upload architectural plans or reference images'}
                </p>
                <p className="upload-sub-text">Max file size: 10MB (PDF, JPG, PNG)</p>
              </div>
            </div>

            <button type="submit" className="form-submit-btn">
              <span>Submit Inquiry</span>
              <Send size={16} />
            </button>

            {status && (
              <p style={{ marginTop: '15px', padding: '12px', background: '#f4f4f5', borderRadius: '6px', textAlign: 'center', fontWeight: '600', fontSize: '14px', color: '#111' }}>
                {status}
              </p>
            )}
          </form>
        </main>

        <aside className="contact-sidebar-section">
          <div className="sidebar-card info-card">
            <h2>Contact Details</h2>
            <div className="info-stream">
              <div className="info-item">
                <div className="icon-wrapper"><Phone size={18} /></div>
                <div className="info-text"><span className="info-label">PHONE</span><strong>+1 (800) STONE-ST</strong></div>
              </div>
              <div className="info-item">
                <div className="icon-wrapper"><Mail size={18} /></div>
                <div className="info-text"><span className="info-label">EMAIL</span><strong>sales@stonestore.com</strong></div>
              </div>
              <div className="info-item">
                <div className="icon-wrapper"><MapPin size={18} /></div>
                <div className="info-text"><span className="info-label">SHOWROOM</span><address>123 Stone Way, Carrara, MS, Italy</address></div>
              </div>
              <div className="info-item alignment-top">
                <div className="icon-wrapper"><Clock size={18} /></div>
                <div className="info-text">
                  <span className="info-label">BUSINESS HOURS</span>
                  <div className="hours-grid">
                    <span className="day">Mon - Fri:</span><span className="time">09:00 - 18:00</span>
                    <span className="day">Saturday:</span><span className="time">10:00 - 14:00</span>
                    <span className="day">Sunday:</span><span className="time closed-status">Closed</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="sidebar-section-block">
            <div className="block-header-row">
              <h3>Find Us</h3>
              <a href="#maps" className="maps-link-action"><span>Open in Maps</span><Globe size={14} /></a>
            </div>
            <div className="map-media-wrapper">
              <img src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&q=80" alt="Showroom Map" />
              <span className="showroom-pill-badge">Flagship Showroom</span>
            </div>
          </div>
        </aside>
      </div>
    </div>
  )
}