import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import type { User } from '../types';

/**
 * Seite zur Aufgabenerstellung
 * Bietet ein Formular zum Anlegen neuer Aufgaben.
 * Demonstriert die "Eingabe von Daten und deren Verarbeitung", wie in der Aufgabenstellung gefordert.
 */
const TaskCreate: React.FC = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState<User[]>([]);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    assignedTo: '',
    pointsReward: 0,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    // Benutzer fuer das Zuweisungs-Dropdown abrufen
    fetch('http://localhost:5000/api/users')
      .then(res => res.json())
      .then(data => setUsers(data))
      .catch(err => console.error('Fehler beim Abrufen der Benutzer:', err));
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'pointsReward' ? parseInt(value) || 0 : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.assignedTo || !formData.title) {
      alert('Bitte fülle alle Pflichtfelder aus.');
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await fetch('http://localhost:5000/api/tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        // Bei Erfolg zurueck zum Dashboard navigieren
        navigate('/');
      } else {
        alert('Fehler beim Erstellen der Aufgabe.');
      }
    } catch (err) {
      console.error('Fehler beim Senden:', err);
      alert('Backend-Verbindung fehlgeschlagen.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="task-create-container" style={{ maxWidth: '600px', margin: '2rem auto', padding: '1rem', background: '#fff', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}>
      <h2 style={{ marginBottom: '1.5rem', color: 'var(--primary)' }}>Neue Helden-Tat erstellen</h2>
      
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
          <label style={{ fontWeight: 600 }}>Titel der Aufgabe *</label>
          <input 
            type="text" 
            name="title" 
            value={formData.title} 
            onChange={handleChange} 
            placeholder="z.B. Tisch decken"
            required
            style={{ padding: '0.8rem', borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '1rem' }}
          />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
          <label style={{ fontWeight: 600 }}>Beschreibung</label>
          <textarea 
            name="description" 
            value={formData.description} 
            onChange={handleChange} 
            placeholder="Details zur Aufgabe..."
            rows={3}
            style={{ padding: '0.8rem', borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '1rem', resize: 'vertical' }}
          />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
            <label style={{ fontWeight: 600 }}>Zuständig *</label>
            <select 
              name="assignedTo" 
              value={formData.assignedTo} 
              onChange={handleChange}
              required
              style={{ padding: '0.8rem', borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '1rem', background: 'white' }}
            >
              <option value="">Wähle ein Mitglied...</option>
              {users.map(user => (
                <option key={user._id} value={user._id}>{user.name} ({user.role === 'parent' ? 'Eltern' : 'Kind'})</option>
              ))}
            </select>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
            <label style={{ fontWeight: 600 }}>Belohnung (Punkte) *</label>
            <input 
              type="number" 
              name="pointsReward" 
              value={formData.pointsReward} 
              onChange={handleChange} 
              min="0"
              required
              style={{ padding: '0.8rem', borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '1rem' }}
            />
          </div>
        </div>

        <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
          <button 
            type="submit" 
            disabled={isSubmitting}
            style={{ flex: 1, padding: '1rem', borderRadius: '12px', border: 'none', background: 'var(--accent)', color: 'white', fontWeight: 600, cursor: 'pointer', opacity: isSubmitting ? 0.7 : 1 }}
          >
            {isSubmitting ? 'Wird gespeichert...' : 'Aufgabe speichern'}
          </button>
          <button 
            type="button" 
            onClick={() => navigate('/')}
            style={{ flex: 1, padding: '1rem', borderRadius: '12px', border: '1px solid #e2e8f0', background: 'white', color: 'var(--primary)', fontWeight: 600, cursor: 'pointer' }}
          >
            Abbrechen
          </button>
        </div>
      </form>
    </div>
  );
};

export default TaskCreate;
