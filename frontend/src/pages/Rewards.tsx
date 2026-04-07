import { useEffect, useState } from 'react';
import { ShoppingBag, CheckCircle2 } from 'lucide-react';
import { API_BASE_URL } from '../config';
import { useUser } from '../context/UserContext';

interface Reward {
  _id: string;
  title: string;
  description?: string;
  cost: number;
  icon: string;
}

const Rewards = () => {
  const { currentUser, refreshUsers } = useUser();
  const [rewards, setRewards] = useState<Reward[]>([]);
  const [redeemed, setRedeemed] = useState<string[]>([]);

  useEffect(() => {
    // Fetch Rewards
    fetch(`${API_BASE_URL}/rewards`)
      .then(res => res.json())
      .then(data => setRewards(data))
      .catch(() => {});
  }, []);

  if (!currentUser) return null;

  const redeem = async (reward: Reward) => {
    if (currentUser.points < reward.cost) {
      alert('Nicht genug Sterne! Sammle noch ein paar mehr Helden-Taten.');
      return;
    }

    const res = await fetch(`${API_BASE_URL}/rewards/redeem`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ rewardId: reward._id, userId: currentUser._id }) 
    });

    if (res.ok) {
      refreshUsers(); // Update points in context
      setRedeemed([...redeemed, reward._id]);
      alert(`Glückwunsch! Du hast '${reward.title}' eingelöst! 🎇`);
    } else {
      alert('Da ist etwas schiefgelaufen. Frag mal Stefan oder Alexandra.');
    }
  };

  return (
    <div className="rewards-page">
      <div className="point-hero glass">
        <div className="point-info">
          <span>Dein aktuelles Sternen-Konto</span>
          <h2>{currentUser.points} ⭐</h2>
        </div>
        <ShoppingBag size={48} className="shop-icon" />
      </div>

      <div className="rewards-grid">
        {rewards.map(reward => (
          <div key={reward._id} className="reward-card glass">
            <div className="reward-icon">{reward.icon}</div>
            <div className="reward-details">
              <h4>{reward.title}</h4>
              <p>{reward.description || 'Eine tolle Belohnung für einen echten Helden.'}</p>
            </div>
            <div className="reward-action">
              <span className="cost-tag">{reward.cost} ★</span>
              {redeemed.includes(reward._id) ? (
                <button className="redeemed-btn" disabled>
                  <CheckCircle2 size={18} /> Eingelöst
                </button>
              ) : (
                <button 
                  className="redeem-btn" 
                  onClick={() => redeem(reward)}
                  disabled={currentUser.points < reward.cost}
                >
                  Einlösen
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Rewards;
