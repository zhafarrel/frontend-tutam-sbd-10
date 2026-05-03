import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function Home() {
  const [items, setItems] = useState([]);
  const [filter, setFilter] = useState('semua');

  useEffect(() => {
    fetch('https://backend-tutam-10-sbd-six.vercel.app/api/items')
      .then(res => res.json())
      .then(data => setItems(data));
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Hapus barang ini?")) {
      await fetch(`https://backend-tutam-10-sbd-six.vercel.app/api/items/${id}`, { method: 'DELETE' });
      setItems(items.filter(i => i.id !== id));
    }
  };

  // Kategori Dinamis
  const categories = ['semua', ...new Set(items.map(item => item.kategori.toLowerCase()))];

  const filteredItems = filter === 'semua' 
    ? items 
    : items.filter(i => i.kategori.toLowerCase() === filter);

  return (
    <div>
      <div className="header-container">
        <div className="header-logo-box">
            <img src="/logo.png" alt="Logo" className="logo-img" />
        </div>
        <div className="header-text-group">
          <h1 className="header-title">Katalog Barang </h1>
          <p className="header-subtitle">Cek Ketersediaan Barang</p>
        </div>
      </div>

      <div className="filter-section">
        {categories.map(cat => (
          <button 
            key={cat}
            className={`filter-pill ${filter === cat ? 'active' : ''}`}
            onClick={() => setFilter(cat)}
          >
            {cat}
          </button>
        ))}
        <Link to="/tambah" className="btn-add-new">+ Tambah Barang</Link>
      </div>

      <div className="catalog-grid">
        {filteredItems.map((item) => (
          <div key={item.id} className="item-card">
            <div className="image-wrapper">
              <img src={item.image_url} alt={item.nama_barang} className="item-image" />
              {item.jumlah > 0 && <span className="badge-status">Tersedia</span>}
            </div>
            <div className="card-body">
              <p className="card-category">{item.kategori}</p>
              <h4 className="card-title">{item.nama_barang}</h4>
              {/* DESKRIPSI DI BAWAH NAMA BARANG */}
              <p className="card-desc">{item.deskripsi}</p>
                <div className="card-footer">
                    <span className="location-text">📍 Rak Depan</span>
                    {/* Tombol hapus */}
                    <button onClick={() => handleDelete(item.id)} className="btn-delete-text">
                        Hapus
                    </button>
                </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;