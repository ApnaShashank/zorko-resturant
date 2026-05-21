'use client';
import { useState, useEffect, useCallback } from 'react';

const TOKEN = 'zorko19042026';
const AUTH_KEY = 'zorko_admin_auth';

const GAME_LABELS = {
  tic_tac_toe: 'Tic Tac Toe',
  rock_paper_scissors: 'Rock Paper Scissors',
  food_catcher: 'Food Catcher',
  memory_match: 'Memory Match'
};

const actionIcons = {
  delete_user: '🗑️', adjust_coins: '🪙', create_discount: '✨', edit_discount: '✏️',
  delete_discount: '❌', redeem_discount: '🎫'
};

// ─── Inline styles ───
const C = {
  orange: '#FF8119', orangeL: '#FF9A45', red: '#EF4444', green: '#22C55E', blue: '#60A5FA',
  bg: '#070707', surface: '#0F0F0F', card: '#161616', border: '#202020',
  text: '#F0F0F0', muted: '#666', soft: '#999', white: '#fff'
};

const S = {
  page: { minHeight: '100vh', background: C.bg, color: C.text, fontFamily: "'Plus Jakarta Sans', sans-serif", display: 'flex' },
  sidebar: { width: '240px', background: C.surface, borderRight: `1px solid ${C.border}`, display: 'flex', flexDirection: 'column', minHeight: '100vh', flexShrink: 0, position: 'sticky', top: 0, height: '100vh', overflowY: 'auto' },
  sidebarHeader: { padding: '24px 20px 16px', borderBottom: `1px solid ${C.border}` },
  logo: { fontSize: '20px', fontWeight: 900, color: C.orange, display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '4px' },
  logoSub: { fontSize: '10px', color: C.muted, letterSpacing: '1px', textTransform: 'uppercase' },
  navItem: (active) => ({ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 20px', cursor: 'pointer', fontSize: '13px', fontWeight: 700, color: active ? C.orange : C.soft, background: active ? `rgba(255,129,25,0.08)` : 'transparent', borderRight: active ? `3px solid ${C.orange}` : '3px solid transparent', transition: 'all 0.2s', userSelect: 'none' }),
  navIcon: { fontSize: '16px', width: '20px', textAlign: 'center' },
  content: { flex: 1, padding: '32px', overflowY: 'auto', maxHeight: '100vh' },
  pageTitle: { fontSize: '24px', fontWeight: 900, color: C.text, marginBottom: '8px' },
  pageSubtitle: { fontSize: '13px', color: C.muted, marginBottom: '28px' },
  statsGrid: { display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '28px' },
  statCard: (color) => ({ background: C.card, border: `1px solid ${C.border}`, borderRadius: '16px', padding: '20px 24px', borderTop: `3px solid ${color}` }),
  statNum: (color) => ({ fontSize: '32px', fontWeight: 900, color: color, lineHeight: 1, marginBottom: '6px' }),
  statLabel: { fontSize: '11px', color: C.muted, textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 700 },
  card: { background: C.card, border: `1px solid ${C.border}`, borderRadius: '16px', padding: '24px', marginBottom: '20px' },
  cardTitle: { fontSize: '15px', fontWeight: 900, color: C.text, marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' },
  table: { width: '100%', borderCollapse: 'collapse' },
  th: { padding: '10px 14px', textAlign: 'left', fontSize: '10px', fontWeight: 800, letterSpacing: '1px', textTransform: 'uppercase', color: C.muted, borderBottom: `1px solid ${C.border}`, whiteSpace: 'nowrap' },
  td: { padding: '12px 14px', fontSize: '12px', borderBottom: `1px solid #111`, verticalAlign: 'top' },
  badge: (color, bg) => ({ display: 'inline-flex', alignItems: 'center', padding: '3px 10px', borderRadius: '50px', fontSize: '11px', fontWeight: 700, color: color, background: bg }),
  btn: (color, bg) => ({ padding: '7px 14px', borderRadius: '8px', border: 'none', cursor: 'pointer', fontSize: '11px', fontWeight: 700, color: color, background: bg, transition: 'all 0.2s', display: 'inline-flex', alignItems: 'center', gap: '5px' }),
  btnPrimary: { padding: '10px 20px', borderRadius: '10px', border: 'none', cursor: 'pointer', fontSize: '13px', fontWeight: 800, color: '#fff', background: C.orange, transition: 'all 0.2s' },
  input: { padding: '10px 14px', borderRadius: '10px', border: `1px solid ${C.border}`, background: '#1A1A1A', color: C.text, fontSize: '13px', width: '100%', boxSizing: 'border-box', outline: 'none', fontFamily: "'Plus Jakarta Sans', sans-serif" },
  label: { fontSize: '11px', fontWeight: 700, color: C.muted, textTransform: 'uppercase', letterSpacing: '0.5px', display: 'block', marginBottom: '6px' },
  overlay: { position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(6px)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' },
  modal: { background: '#121212', border: `1px solid ${C.border}`, borderRadius: '20px', padding: '32px', width: '100%', maxWidth: '480px', position: 'relative' },
  modalTitle: { fontSize: '18px', fontWeight: 900, color: C.text, marginBottom: '20px' },
  discountCard: (color) => ({ background: C.card, border: `1px solid ${C.border}`, borderRadius: '14px', padding: '18px', borderLeft: `4px solid ${color}`, marginBottom: '10px', display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '12px' }),
  historyItem: { display: 'flex', gap: '14px', padding: '12px 0', borderBottom: `1px solid ${C.border}` },
  historyDot: (color) => ({ width: '32px', height: '32px', borderRadius: '50%', background: `${color}22`, border: `2px solid ${color}44`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontSize: '14px' }),
  loginPage: { minHeight: '100vh', background: C.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'Plus Jakarta Sans', sans-serif" },
  loginCard: { background: C.surface, border: `1px solid ${C.border}`, borderRadius: '24px', padding: '48px 40px', width: '100%', maxWidth: '420px' },
  redCard: { background: `rgba(239,68,68,0.08)`, border: `1px solid rgba(239,68,68,0.2)`, borderRadius: '12px', padding: '12px 16px', color: '#EF4444', fontSize: '13px', fontWeight: 600, marginBottom: '16px' },
  successCard: { background: `rgba(34,197,94,0.08)`, border: `1px solid rgba(34,197,94,0.2)`, borderRadius: '16px', padding: '20px', color: C.green, marginTop: '16px' },
  infoRow: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 0', borderBottom: `1px solid ${C.border}` },
};

function Loading() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '200px', color: C.muted }}>
      <div style={{ textAlign: 'center' }}>
        <div style={{ fontSize: '32px', marginBottom: '12px', animation: 'spin 1s linear infinite' }}>⚙️</div>
        <div style={{ fontSize: '13px' }}>Loading data...</div>
      </div>
    </div>
  );
}

function getActionColor(action) {
  if (action?.includes('delete')) return C.red;
  if (action?.includes('redeem')) return C.orange;
  if (action?.includes('create')) return C.green;
  if (action?.includes('adjust')) return C.blue;
  return C.muted;
}

export default function AdminPage() {
  const [isAuth, setIsAuth] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [loginErr, setLoginErr] = useState('');
  const [tab, setTab] = useState('dashboard');
  const [users, setUsers] = useState([]);
  const [discounts, setDiscounts] = useState([]);
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [userSearch, setUserSearch] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Modals
  const [coinModal, setCoinModal] = useState(null);
  const [coinValue, setCoinValue] = useState('');
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [expandedUser, setExpandedUser] = useState(null);

  // Discount form
  const [showDForm, setShowDForm] = useState(false);
  const [editingD, setEditingD] = useState(null);
  const [dForm, setDForm] = useState({ title: '', description: '', badge: '🎉', color: '#FF8119', active: true });
  const [dSaving, setDSaving] = useState(false);
  const [dMsg, setDMsg] = useState('');

  // Redemption
  const [rName, setRName] = useState('');
  const [rUID, setRUID] = useState('');
  const [rResult, setRResult] = useState(null);
  const [rError, setRError] = useState('');
  const [rLoading, setRLoading] = useState(false);

  const adminFetch = useCallback((url, opts = {}) =>
    fetch(url, {
      ...opts,
      headers: { 'Content-Type': 'application/json', 'x-admin-token': TOKEN, ...(opts.headers || {}) }
    }), []);

  const fetchAll = useCallback(async () => {
    setLoading(true);
    try {
      await adminFetch('/api/admin/migrate', { method: 'POST' });
      const [uRes, dRes, lRes] = await Promise.all([
        adminFetch('/api/admin/users'),
        adminFetch('/api/admin/discounts'),
        adminFetch('/api/admin/history')
      ]);
      const [u, d, l] = await Promise.all([uRes.json(), dRes.json(), lRes.json()]);
      if (u.success) setUsers(u.users);
      if (d.success) setDiscounts(d.discounts);
      if (l.success) setLogs(l.logs);
    } catch (e) { console.error(e); }
    finally { setLoading(false); }
  }, [adminFetch]);

  const fetchLogs = useCallback(async () => {
    const res = await adminFetch('/api/admin/history');
    const data = await res.json();
    if (data.success) setLogs(data.logs);
  }, [adminFetch]);

  useEffect(() => {
    const stored = localStorage.getItem(AUTH_KEY);
    if (stored === TOKEN) { setIsAuth(true); fetchAll(); }
    setCheckingAuth(false);
  }, [fetchAll]);

  const handleLogin = (e) => {
    e.preventDefault();
    if (email.trim() === 'admin@zorko.com' && pass === 'zorko19042026') {
      localStorage.setItem(AUTH_KEY, TOKEN);
      setIsAuth(true);
      setLoginErr('');
      fetchAll();
    } else {
      setLoginErr('Invalid email or password');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem(AUTH_KEY);
    setIsAuth(false);
    setUsers([]); setDiscounts([]); setLogs([]);
  };

  const deleteUser = async (user) => {
    const res = await adminFetch('/api/admin/users', { method: 'DELETE', body: JSON.stringify({ phone: user.phone, name: user.name }) });
    const data = await res.json();
    if (data.success) {
      setUsers(prev => prev.filter(u => u.phone !== user.phone));
      setDeleteConfirm(null);
      fetchLogs();
    }
  };

  const adjustCoins = async () => {
    if (!coinModal || coinValue === '') return;
    const res = await adminFetch('/api/admin/users', { method: 'PATCH', body: JSON.stringify({ phone: coinModal.phone, coins: parseInt(coinValue), name: coinModal.name }) });
    const data = await res.json();
    if (data.success) {
      setUsers(prev => prev.map(u => u.phone === coinModal.phone ? { ...u, coins: parseInt(coinValue) } : u));
      setCoinModal(null); setCoinValue('');
      fetchLogs();
    }
  };

  const saveDiscount = async () => {
    if (!dForm.title.trim()) { setDMsg('Title is required'); return; }
    setDSaving(true); setDMsg('');
    try {
      const method = editingD ? 'PATCH' : 'POST';
      const body = editingD ? { ...dForm, id: editingD } : dForm;
      const res = await adminFetch('/api/admin/discounts', { method, body: JSON.stringify(body) });
      const data = await res.json();
      if (data.success) {
        setDMsg(editingD ? 'Discount updated!' : '✅ Discount created & notifications sent!');
        const dRes = await adminFetch('/api/admin/discounts');
        const dData = await dRes.json();
        if (dData.success) setDiscounts(dData.discounts);
        fetchLogs();
        setTimeout(() => { setShowDForm(false); setEditingD(null); setDForm({ title: '', description: '', badge: '🎉', color: '#FF8119', active: true }); setDMsg(''); }, 2000);
      } else { setDMsg(data.error || 'Failed'); }
    } catch (e) { setDMsg('Server error'); }
    finally { setDSaving(false); }
  };

  const deleteDiscount = async (d) => {
    const res = await adminFetch('/api/admin/discounts', { method: 'DELETE', body: JSON.stringify({ id: d._id, title: d.title }) });
    const data = await res.json();
    if (data.success) { setDiscounts(prev => prev.filter(x => x._id !== d._id)); fetchLogs(); }
  };

  const openEditDiscount = (d) => {
    setEditingD(d._id);
    setDForm({ title: d.title, description: d.description || '', badge: d.badge || '🎉', color: d.color || '#FF8119', active: d.active });
    setShowDForm(true);
  };

  const redeemDiscount = async (e) => {
    e.preventDefault();
    setRLoading(true); setRError(''); setRResult(null);
    try {
      const res = await adminFetch('/api/admin/redeem', { method: 'POST', body: JSON.stringify({ name: rName.trim(), uid: rUID.trim() }) });
      const data = await res.json();
      if (data.success) {
        setRResult(data.user);
        setUsers(prev => prev.map(u => u.uid === rUID.trim() ? { ...u, coins: 0 } : u));
        fetchLogs();
      } else { setRError(data.error || 'Redemption failed'); }
    } catch (e) { setRError('Connection error'); }
    finally { setRLoading(false); }
  };

  const stats = {
    totalUsers: users.length,
    totalLogins: users.reduce((s, u) => s + (u.loginHistory?.length || 0), 0),
    totalCoins: users.reduce((s, u) => s + (u.coins || 0), 0),
    totalPlays: users.reduce((s, u) => s + Object.values(u.gameStats || {}).reduce((a, g) => a + (g.plays || 0), 0), 0),
  };

  const filteredUsers = users.filter(u =>
    !userSearch || u.name?.toLowerCase().includes(userSearch.toLowerCase()) ||
    u.phone?.includes(userSearch) || u.uid?.includes(userSearch)
  );

  if (checkingAuth) return <div style={S.loginPage}><div style={{ color: C.muted }}>Loading...</div></div>;

  // ─── Login Screen ───
  if (!isAuth) return (
    <div style={S.loginPage}>
      <div style={S.loginCard}>
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <div style={{ fontSize: '48px', marginBottom: '12px' }}>🔐</div>
          <h1 style={{ fontSize: '24px', fontWeight: 900, color: C.text, marginBottom: '6px' }}>Zorko Admin</h1>
          <p style={{ fontSize: '13px', color: C.muted }}>Restaurant Management Panel</p>
        </div>
        {loginErr && <div style={S.redCard}>{loginErr}</div>}
        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <label style={S.label}>Email Address</label>
            <input style={S.input} type="email" placeholder="admin@zorko.com" value={email} onChange={e => setEmail(e.target.value)} required autoComplete="email" />
          </div>
          <div>
            <label style={S.label}>Password</label>
            <input style={S.input} type="password" placeholder="Enter admin password" value={pass} onChange={e => setPass(e.target.value)} required autoComplete="current-password" />
          </div>
          <button type="submit" style={{ ...S.btnPrimary, padding: '14px', marginTop: '8px', width: '100%', fontSize: '14px' }}>
            Login to Admin Panel
          </button>
        </form>
        <p style={{ textAlign: 'center', fontSize: '11px', color: C.muted, marginTop: '20px' }}>Zorko Jiyanpur • Authorized Access Only</p>
      </div>
    </div>
  );

  // ─── Dashboard ───
  const NAV = [
    { id: 'dashboard', icon: '📊', label: 'Dashboard' },
    { id: 'users', icon: '👥', label: 'Users' },
    { id: 'discounts', icon: '🎁', label: 'Discounts' },
    { id: 'redeem', icon: '🎫', label: 'Redeem Discount' },
    { id: 'history', icon: '📜', label: 'Activity History' },
  ];

  return (
    <div className="admin-page-container" style={S.page}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;700;800;900&display=swap');
        * { box-sizing: border-box; }
        ::-webkit-scrollbar { width: 5px; } ::-webkit-scrollbar-track { background: #0a0a0a; }
        ::-webkit-scrollbar-thumb { background: #2a2a2a; border-radius: 5px; }
        input::placeholder { color: #444; }
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes fadeIn { from { opacity:0; transform:translateY(10px); } to { opacity:1; transform:translateY(0); } }
        .ad-row:hover { background: rgba(255,129,25,0.03) !important; }
        .ad-nav:hover { background: rgba(255,255,255,0.04) !important; }
        .ad-btn-hover:hover { opacity: 0.85; transform: scale(0.97); }

        /* Responsive Layouts */
        .admin-mobile-header {
          display: none;
        }

        .mobile-only-details {
          display: none !important;
        }

        @media (max-width: 992px) {
          .admin-stats-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }

        @media (max-width: 768px) {
          .admin-page-container {
            flex-direction: column !important;
          }
          .admin-sidebar {
            position: fixed !important;
            left: 0 !important;
            top: 0 !important;
            height: 100vh !important;
            z-index: 1010 !important;
            transform: translateX(-100%);
            transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            box-shadow: 10px 0 30px rgba(0,0,0,0.5);
          }
          .admin-sidebar.open {
            transform: translateX(0);
          }
          .admin-content-area {
            padding: 20px 16px !important;
            margin-top: 60px !important;
            max-height: none !important;
            overflow-y: visible !important;
          }
          .admin-mobile-header {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 0 16px;
            height: 60px;
            background: ${C.surface};
            border-bottom: 1px solid ${C.border};
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            z-index: 999;
          }
          
          /* Table Responsive Hides */
          .col-phone, .col-password, .col-logins, .col-joined {
            display: none !important;
          }

          .mobile-only-details {
            display: flex !important;
          }
        }

        @media (max-width: 576px) {
          .admin-stats-grid {
            grid-template-columns: 1fr !important;
          }
          .admin-header-flex {
            flex-direction: column !important;
            align-items: stretch !important;
            gap: 12px !important;
          }
          .admin-header-flex button {
            align-self: flex-start;
          }
          .admin-discount-card {
            flex-direction: column !important;
            align-items: stretch !important;
            gap: 16px !important;
          }
          .admin-discount-card > div:last-child {
            justify-content: flex-end;
          }
          .admin-modal {
            padding: 20px !important;
            border-radius: 16px !important;
            max-height: 90vh;
            overflow-y: auto;
          }
        }
      `}</style>

      {/* Mobile Header */}
      <header className="admin-mobile-header">
        <button 
          onClick={() => setMobileMenuOpen(true)}
          style={{
            background: 'none',
            border: 'none',
            color: C.text,
            fontSize: '24px',
            cursor: 'pointer',
            padding: '8px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          ☰
        </button>
        <div style={{ fontSize: '18px', fontWeight: 900, color: C.orange, display: 'flex', alignItems: 'center', gap: '8px' }}>
          🍔 Zorko Admin
        </div>
        <div style={{ width: '40px' }} />
      </header>

      {/* Sidebar Mobile Backdrop */}
      {mobileMenuOpen && (
        <div 
          onClick={() => setMobileMenuOpen(false)}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.6)',
            backdropFilter: 'blur(3px)',
            zIndex: 1005,
          }}
        />
      )}

      {/* ─── Sidebar ─── */}
      <aside className={`admin-sidebar ${mobileMenuOpen ? 'open' : ''}`} style={S.sidebar}>
        <div style={S.sidebarHeader}>
          <div style={S.logo}>🍔 Zorko</div>
          <div style={S.logoSub}>Admin Panel</div>
        </div>
        <nav style={{ padding: '12px 0', flex: 1 }}>
          {NAV.map(item => (
            <div key={item.id} className="ad-nav" style={S.navItem(tab === item.id)} onClick={() => { setTab(item.id); setMobileMenuOpen(false); }}>
              <span style={S.navIcon}>{item.icon}</span>
              {item.label}
            </div>
          ))}
        </nav>
        <div style={{ padding: '16px 20px', borderTop: `1px solid ${C.border}` }}>
          <button onClick={handleLogout} style={{ ...S.btn('#EF4444', 'rgba(239,68,68,0.1)'), width: '100%', justifyContent: 'center', padding: '10px', borderRadius: '10px' }}>
            🔒 Logout
          </button>
        </div>
      </aside>

      {/* ─── Main Content ─── */}
      <main className="admin-content-area" style={S.content}>

        {/* DASHBOARD */}
        {tab === 'dashboard' && (
          <div style={{ animation: 'fadeIn 0.3s ease' }}>
            <h1 style={S.pageTitle}>Dashboard Overview</h1>
            <p style={S.pageSubtitle}>Real-time stats for Zorko Game Zone</p>
            <div className="admin-stats-grid" style={S.statsGrid}>
              {[
                { label: 'Total Users', value: stats.totalUsers, color: C.blue, icon: '👥' },
                { label: 'Total Logins', value: stats.totalLogins, color: C.green, icon: '🔑' },
                { label: 'Coins in Play', value: stats.totalCoins, color: C.orange, icon: '🪙' },
                { label: 'Games Played', value: stats.totalPlays, color: '#A78BFA', icon: '🎮' },
              ].map(s => (
                <div key={s.label} style={S.statCard(s.color)}>
                  <div style={{ fontSize: '24px', marginBottom: '8px' }}>{s.icon}</div>
                  <div style={S.statNum(s.color)}>{loading ? '—' : s.value}</div>
                  <div style={S.statLabel}>{s.label}</div>
                </div>
              ))}
            </div>

            {/* Recent Activity */}
            <div style={S.card}>
              <div style={S.cardTitle}><span>📋</span> Recent Activity</div>
              {logs.slice(0, 8).map((log, i) => (
                <div key={i} style={S.historyItem}>
                  <div style={S.historyDot(getActionColor(log.action))}>
                    <span>{actionIcons[log.action] || '⚡'}</span>
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: '13px', color: C.text, fontWeight: 600 }}>{log.description}</div>
                    <div style={{ fontSize: '11px', color: C.muted, marginTop: '3px' }}>
                      {new Date(log.timestamp).toLocaleString('en-IN')}
                    </div>
                  </div>
                </div>
              ))}
              {logs.length === 0 && !loading && <div style={{ color: C.muted, fontSize: '13px', textAlign: 'center', padding: '24px' }}>No activity yet</div>}
            </div>

            {/* Top 5 Users */}
            <div style={S.card}>
              <div style={S.cardTitle}><span>🏆</span> Top Players by Coins</div>
              {[...users].sort((a, b) => (b.coins || 0) - (a.coins || 0)).slice(0, 5).map((u, i) => (
                <div key={u.phone} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '10px 0', borderBottom: `1px solid ${C.border}` }}>
                  <span style={{ fontSize: '18px', width: '24px', textAlign: 'center' }}>
                    {i === 0 ? '🥇' : i === 1 ? '🥈' : i === 2 ? '🥉' : `#${i + 1}`}
                  </span>
                  <span style={{ flex: 1, fontSize: '13px', fontWeight: 700, color: C.text }}>{u.name}</span>
                  <span style={{ ...S.badge(C.orange, 'rgba(255,129,25,0.1)') }}>{u.coins || 0} 🪙</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* USERS */}
        {tab === 'users' && (
          <div style={{ animation: 'fadeIn 0.3s ease' }}>
            <div className="admin-header-flex" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
              <div>
                <h1 style={S.pageTitle}>All Users</h1>
                <p style={S.pageSubtitle}>{users.length} registered players</p>
              </div>
              <button onClick={fetchAll} style={S.btn(C.text, C.card)}>🔄 Refresh</button>
            </div>
            <div style={{ marginBottom: '16px' }}>
              <input style={{ ...S.input, maxWidth: '320px' }} placeholder="🔍 Search by name, phone, or UID..." value={userSearch} onChange={e => setUserSearch(e.target.value)} />
            </div>
            {loading ? <Loading /> : (
              <div style={{ ...S.card, padding: 0, overflow: 'hidden' }}>
                <div style={{ overflowX: 'auto' }}>
                  <table style={S.table}>
                    <thead>
                      <tr style={{ background: '#0F0F0F' }}>
                        {['UID', 'Name', 'Phone', 'Password', 'Coins', 'Games', 'Logins', 'Joined', 'Actions'].map(h => {
                          let className = '';
                          if (h === 'Phone') className = 'col-phone';
                          else if (h === 'Password') className = 'col-password';
                          else if (h === 'Logins') className = 'col-logins';
                          else if (h === 'Joined') className = 'col-joined';
                          return <th key={h} className={className} style={S.th}>{h}</th>;
                        })}
                      </tr>
                    </thead>
                    <tbody>
                      {filteredUsers.map((u) => {
                        const totalPlays = Object.values(u.gameStats || {}).reduce((s, g) => s + (g.plays || 0), 0);
                        const totalWins = Object.values(u.gameStats || {}).reduce((s, g) => s + (g.wins || 0), 0);
                        return (
                          <tr key={u._id} className="ad-row">
                            <td style={S.td}>
                              <span style={{ ...S.badge(C.blue, 'rgba(96,165,250,0.1)'), fontFamily: 'monospace', fontSize: '12px' }}>
                                {u.uid || '—'}
                              </span>
                            </td>
                            <td style={{ ...S.td, fontWeight: 700, color: C.text }}>{u.name}</td>
                            <td className="col-phone" style={{ ...S.td, color: C.soft }}>{u.phone}</td>
                            <td className="col-password" style={{ ...S.td }}>
                              <span style={{ background: '#1A1A1A', padding: '3px 8px', borderRadius: '6px', fontFamily: 'monospace', fontSize: '11px', color: C.muted }}>
                                {u.password}
                              </span>
                            </td>
                            <td style={S.td}>
                              <span style={{ color: C.orange, fontWeight: 800, fontSize: '14px' }}>{u.coins || 0}</span>
                              <span style={{ color: C.muted, marginLeft: '3px' }}>🪙</span>
                            </td>
                            <td style={S.td}>
                              <button
                                onClick={() => setExpandedUser(expandedUser === u._id ? null : u._id)}
                                style={{ ...S.btn(C.text, '#1A1A1A'), fontSize: '11px' }}
                              >
                                {totalPlays} plays / {totalWins} wins
                              </button>
                              {expandedUser === u._id && (
                                <div style={{ marginTop: '8px', fontSize: '11px', color: C.muted, display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                  {/* Mobile-only fields shown in expanded view */}
                                  <div className="mobile-only-details" style={{ display: 'none', flexDirection: 'column', gap: '4px', background: '#090909', padding: '8px', borderRadius: '8px', border: `1px solid ${C.border}` }}>
                                    <div>📞 Phone: <span style={{ color: C.text, fontWeight: 600 }}>{u.phone}</span></div>
                                    <div>🔑 Password: <span style={{ color: C.text, fontFamily: 'monospace' }}>{u.password}</span></div>
                                    <div>🚪 Logins: <span style={{ color: C.text }}>{u.loginHistory?.length || 0} times</span></div>
                                    <div>📅 Joined: <span style={{ color: C.text }}>{u.createdAt ? new Date(u.createdAt).toLocaleDateString('en-IN') : '—'}</span></div>
                                  </div>
                                  <div>
                                    <div style={{ fontWeight: 700, marginBottom: '4px', color: C.soft }}>Game Stats:</div>
                                    {Object.entries(u.gameStats || {}).length === 0
                                      ? 'No games yet'
                                      : Object.entries(u.gameStats).map(([k, v]) => (
                                        <div key={k} style={{ padding: '3px 0' }}>
                                          🎮 {GAME_LABELS[k] || k}: <b style={{ color: C.text }}>{v.plays}p / {v.wins}w</b>
                                        </div>
                                      ))
                                    }
                                  </div>
                                </div>
                              )}
                            </td>
                            <td className="col-logins" style={{ ...S.td, color: C.soft }}>{u.loginHistory?.length || 0}</td>
                            <td className="col-joined" style={{ ...S.td, color: C.muted, fontSize: '11px' }}>
                              {u.createdAt ? new Date(u.createdAt).toLocaleDateString('en-IN') : '—'}
                            </td>
                            <td style={S.td}>
                              <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                                <button className="ad-btn-hover" style={S.btn(C.blue, 'rgba(96,165,250,0.1)')}
                                  onClick={() => { setCoinModal(u); setCoinValue(String(u.coins || 0)); }}>
                                  🪙 Coins
                                </button>
                                <button className="ad-btn-hover" style={S.btn(C.red, 'rgba(239,68,68,0.1)')}
                                  onClick={() => setDeleteConfirm(u)}>
                                  🗑️ Delete
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                  {filteredUsers.length === 0 && (
                    <div style={{ textAlign: 'center', padding: '40px', color: C.muted }}>No users found</div>
                  )}
                </div>
              </div>
            )}
          </div>
        )}

        {/* DISCOUNTS */}
        {tab === 'discounts' && (
          <div style={{ animation: 'fadeIn 0.3s ease' }}>
            <div className="admin-header-flex" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
              <div>
                <h1 style={S.pageTitle}>Discount Offers</h1>
                <p style={S.pageSubtitle}>Manage live offers shown on the website. Creating sends push notifications!</p>
              </div>
              <button onClick={() => { setShowDForm(true); setEditingD(null); setDForm({ title: '', description: '', badge: '🎉', color: '#FF8119', active: true }); setDMsg(''); }} style={{ ...S.btnPrimary, fontSize: '13px' }}>
                + New Discount
              </button>
            </div>

            {discounts.length === 0 && !loading && (
              <div style={{ ...S.card, textAlign: 'center', padding: '48px', color: C.muted }}>
                <div style={{ fontSize: '48px', marginBottom: '12px' }}>🎁</div>
                No discounts yet. Create your first offer!
              </div>
            )}

            {discounts.map(d => (
              <div key={d._id} className="admin-discount-card" style={S.discountCard(d.color || C.orange)}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '14px', flex: 1 }}>
                  <span style={{ fontSize: '28px' }}>{d.badge || '🎉'}</span>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                      <span style={{ fontSize: '15px', fontWeight: 800, color: C.text }}>{d.title}</span>
                      <span style={{ ...S.badge(d.active ? C.green : C.muted, d.active ? 'rgba(34,197,94,0.1)' : 'rgba(100,100,100,0.1)'), fontSize: '10px' }}>
                        {d.active ? '● LIVE' : '○ INACTIVE'}
                      </span>
                    </div>
                    <p style={{ fontSize: '13px', color: C.soft, margin: 0 }}>{d.description}</p>
                    <p style={{ fontSize: '11px', color: C.muted, margin: '4px 0 0' }}>
                      Added {d.createdAt ? new Date(d.createdAt).toLocaleDateString('en-IN') : 'recently'}
                    </p>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '8px', flexShrink: 0 }}>
                  <button className="ad-btn-hover" style={S.btn(C.blue, 'rgba(96,165,250,0.1)')} onClick={() => openEditDiscount(d)}>✏️ Edit</button>
                  <button className="ad-btn-hover" style={S.btn(C.red, 'rgba(239,68,68,0.1)')} onClick={() => deleteDiscount(d)}>🗑️ Delete</button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* REDEEM */}
        {tab === 'redeem' && (
          <div style={{ animation: 'fadeIn 0.3s ease', maxWidth: '560px' }}>
            <h1 style={S.pageTitle}>Redeem Discount</h1>
            <p style={S.pageSubtitle}>Customer shows their app — you enter name + 7-digit UID to verify and apply discount.</p>
            <div style={S.card}>
              <form onSubmit={redeemDiscount} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div>
                  <label style={S.label}>Customer Name</label>
                  <input style={S.input} placeholder="Enter customer's full name" value={rName} onChange={e => { setRName(e.target.value); setRResult(null); setRError(''); }} required />
                </div>
                <div>
                  <label style={S.label}>7-Digit Unique ID</label>
                  <input style={{ ...S.input, fontFamily: 'monospace', fontSize: '18px', letterSpacing: '4px', textAlign: 'center' }} placeholder="0000000" value={rUID} onChange={e => { setRUID(e.target.value.replace(/\D/g, '').slice(0, 7)); setRResult(null); setRError(''); }} maxLength={7} required />
                </div>
                {rError && <div style={S.redCard}>❌ {rError}</div>}
                <button type="submit" style={{ ...S.btnPrimary, padding: '14px', fontSize: '14px' }} disabled={rLoading}>
                  {rLoading ? '⏳ Verifying...' : '✅ Verify & Redeem Discount'}
                </button>
              </form>

              {rResult && (
                <div style={S.successCard}>
                  <div style={{ fontWeight: 900, fontSize: '18px', marginBottom: '16px' }}>🎉 Discount Applied!</div>
                  {[
                    ['Customer', rResult.name],
                    ['Phone', rResult.phone],
                    ['UID', rResult.uid],
                    ['Coins Redeemed', `${rResult.prevCoins} 🪙`],
                    ['Discount Applied', `${rResult.discountPct}% OFF`],
                  ].map(([k, v]) => (
                    <div key={k} style={S.infoRow}>
                      <span style={{ fontSize: '12px', color: C.green, opacity: 0.7 }}>{k}</span>
                      <span style={{ fontWeight: 800, fontSize: '14px' }}>{v}</span>
                    </div>
                  ))}
                  <div style={{ marginTop: '16px', fontSize: '13px', opacity: 0.7 }}>
                    Customer&apos;s {rResult.prevCoins} coins have been cleared. Give them {rResult.discountPct}% discount on their order!
                  </div>
                  <button onClick={() => { setRResult(null); setRName(''); setRUID(''); }} style={{ ...S.btn(C.green, 'rgba(34,197,94,0.15)'), marginTop: '16px', width: '100%', justifyContent: 'center', padding: '10px', borderRadius: '10px' }}>
                    ✓ Done — Redeem Another
                  </button>
                </div>
              )}
            </div>

            {/* Quick lookup */}
            <div style={S.card}>
              <div style={S.cardTitle}><span>🔍</span> Quick User Lookup</div>
              <table style={S.table}>
                <thead><tr><th style={S.th}>UID</th><th style={S.th}>Name</th><th style={S.th}>Coins</th><th style={S.th}>Discount</th></tr></thead>
                <tbody>
                  {[...users].filter(u => u.coins >= 100).sort((a, b) => (b.coins || 0) - (a.coins || 0)).slice(0, 10).map(u => (
                    <tr key={u.phone} className="ad-row">
                      <td style={{ ...S.td, fontFamily: 'monospace', color: C.blue }}>{u.uid}</td>
                      <td style={{ ...S.td, fontWeight: 700 }}>{u.name}</td>
                      <td style={{ ...S.td, color: C.orange, fontWeight: 800 }}>{u.coins} 🪙</td>
                      <td style={{ ...S.td, color: C.green, fontWeight: 800 }}>{(u.coins / 100).toFixed(1)}% OFF</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {users.filter(u => u.coins >= 100).length === 0 && (
                <p style={{ color: C.muted, fontSize: '13px', textAlign: 'center', padding: '20px 0' }}>No users with 100+ coins yet</p>
              )}
            </div>
          </div>
        )}

        {/* HISTORY */}
        {tab === 'history' && (
          <div style={{ animation: 'fadeIn 0.3s ease' }}>
            <div className="admin-header-flex" style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
              <div>
                <h1 style={S.pageTitle}>Activity History</h1>
                <p style={S.pageSubtitle}>{logs.length} logged actions — newest first</p>
              </div>
              <button onClick={fetchLogs} style={S.btn(C.text, C.card)}>🔄 Refresh</button>
            </div>
            <div style={S.card}>
              {logs.map((log, i) => (
                <div key={log._id || i} style={{ ...S.historyItem, animation: `fadeIn 0.2s ease ${i * 0.02}s both` }}>
                  <div style={S.historyDot(getActionColor(log.action))}>
                    <span>{actionIcons[log.action] || '⚡'}</span>
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: '13px', fontWeight: 700, color: C.text, marginBottom: '3px' }}>{log.description}</div>
                    <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                      <span style={{ ...S.badge(getActionColor(log.action), `${getActionColor(log.action)}18`), fontSize: '10px' }}>
                        {log.action?.replace(/_/g, ' ')?.toUpperCase()}
                      </span>
                      <span style={{ fontSize: '11px', color: C.muted }}>
                        {new Date(log.timestamp).toLocaleString('en-IN', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
              {logs.length === 0 && <div style={{ textAlign: 'center', padding: '40px', color: C.muted }}>No activity recorded yet</div>}
            </div>
          </div>
        )}
      </main>

      {/* ─── Coin Adjust Modal ─── */}
      {coinModal && (
        <div style={S.overlay} onClick={() => setCoinModal(null)}>
          <div className="admin-modal" style={S.modal} onClick={e => e.stopPropagation()}>
            <h3 style={S.modalTitle}>🪙 Adjust Coins — {coinModal.name}</h3>
            <p style={{ color: C.muted, fontSize: '12px', marginBottom: '20px' }}>UID: {coinModal.uid || 'N/A'} | Current: {coinModal.coins} coins</p>
            <label style={S.label}>New Coin Balance</label>
            <input style={{ ...S.input, fontSize: '24px', fontWeight: 800, textAlign: 'center', marginBottom: '20px' }}
              type="number" min="0" value={coinValue} onChange={e => setCoinValue(e.target.value)} autoFocus />
            <div style={{ display: 'flex', gap: '10px' }}>
              <button onClick={() => setCoinModal(null)} style={{ ...S.btn(C.muted, C.card), flex: 1, justifyContent: 'center', padding: '12px', borderRadius: '10px' }}>Cancel</button>
              <button onClick={adjustCoins} style={{ ...S.btnPrimary, flex: 1, justifyContent: 'center', textAlign: 'center' }}>Save Changes</button>
            </div>
          </div>
        </div>
      )}

      {/* ─── Delete Confirm Modal ─── */}
      {deleteConfirm && (
        <div style={S.overlay} onClick={() => setDeleteConfirm(null)}>
          <div className="admin-modal" style={S.modal} onClick={e => e.stopPropagation()}>
            <h3 style={{ ...S.modalTitle, color: C.red }}>🗑️ Delete User</h3>
            <p style={{ color: C.soft, fontSize: '14px', marginBottom: '8px' }}>
              Are you sure you want to delete <b style={{ color: C.text }}>{deleteConfirm.name}</b>?
            </p>
            <p style={{ color: C.muted, fontSize: '12px', marginBottom: '24px' }}>
              Phone: {deleteConfirm.phone} | UID: {deleteConfirm.uid} | Coins: {deleteConfirm.coins}<br />
              This action cannot be undone. User will lose all coins and history.
            </p>
            <div style={{ display: 'flex', gap: '10px' }}>
              <button onClick={() => setDeleteConfirm(null)} style={{ ...S.btn(C.muted, C.card), flex: 1, justifyContent: 'center', padding: '12px', borderRadius: '10px' }}>Cancel</button>
              <button onClick={() => deleteUser(deleteConfirm)} style={{ ...S.btn('#fff', C.red), flex: 1, justifyContent: 'center', padding: '12px', borderRadius: '10px', fontWeight: 800 }}>Delete Permanently</button>
            </div>
          </div>
        </div>
      )}

      {/* ─── Discount Create/Edit Modal ─── */}
      {showDForm && (
        <div style={S.overlay} onClick={() => { setShowDForm(false); setEditingD(null); setDMsg(''); }}>
          <div className="admin-modal" style={{ ...S.modal, maxWidth: '520px' }} onClick={e => e.stopPropagation()}>
            <h3 style={S.modalTitle}>{editingD ? '✏️ Edit Discount' : '✨ Create New Discount'}</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div>
                <label style={S.label}>Title *</label>
                <input style={S.input} placeholder="e.g. Weekend Special Combo" value={dForm.title} onChange={e => setDForm(p => ({ ...p, title: e.target.value }))} />
              </div>
              <div>
                <label style={S.label}>Description</label>
                <textarea style={{ ...S.input, minHeight: '80px', resize: 'vertical' }} placeholder="Describe the offer..." value={dForm.description} onChange={e => setDForm(p => ({ ...p, description: e.target.value }))} />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={S.label}>Badge Emoji</label>
                  <input style={{ ...S.input, textAlign: 'center', fontSize: '24px' }} placeholder="🎉" value={dForm.badge} onChange={e => setDForm(p => ({ ...p, badge: e.target.value }))} maxLength={4} />
                </div>
                <div>
                  <label style={S.label}>Accent Color</label>
                  <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                    <input type="color" value={dForm.color} onChange={e => setDForm(p => ({ ...p, color: e.target.value }))} style={{ width: '48px', height: '44px', borderRadius: '8px', border: `1px solid ${C.border}`, background: 'none', cursor: 'pointer' }} />
                    <input style={{ ...S.input, flex: 1, fontFamily: 'monospace' }} value={dForm.color} onChange={e => setDForm(p => ({ ...p, color: e.target.value }))} />
                  </div>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <input type="checkbox" id="activeChk" checked={dForm.active} onChange={e => setDForm(p => ({ ...p, active: e.target.checked }))} style={{ width: '18px', height: '18px', cursor: 'pointer', accentColor: C.orange }} />
                <label htmlFor="activeChk" style={{ ...S.label, margin: 0, cursor: 'pointer' }}>Show on website (Active)</label>
              </div>
              {dMsg && (
                <div style={{ ...S.redCard, background: dMsg.includes('✅') ? 'rgba(34,197,94,0.08)' : 'rgba(239,68,68,0.08)', borderColor: dMsg.includes('✅') ? 'rgba(34,197,94,0.2)' : 'rgba(239,68,68,0.2)', color: dMsg.includes('✅') ? C.green : C.red }}>
                  {dMsg}
                </div>
              )}
              {!editingD && (
                <div style={{ background: 'rgba(255,129,25,0.05)', border: `1px solid rgba(255,129,25,0.15)`, borderRadius: '10px', padding: '10px 14px', fontSize: '12px', color: C.orange }}>
                  🔔 Creating this discount will send push notifications to all subscribed users!
                </div>
              )}
            </div>
            <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
              <button onClick={() => { setShowDForm(false); setEditingD(null); setDMsg(''); }} style={{ ...S.btn(C.muted, C.card), flex: 1, justifyContent: 'center', padding: '12px', borderRadius: '10px' }}>Cancel</button>
              <button onClick={saveDiscount} style={{ ...S.btnPrimary, flex: 1, textAlign: 'center' }} disabled={dSaving}>
                {dSaving ? '⏳ Saving...' : editingD ? '✏️ Update' : '✨ Create & Notify'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
