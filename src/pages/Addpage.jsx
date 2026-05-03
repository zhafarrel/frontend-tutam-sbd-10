import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

function AddPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nama_barang: '', kategori: '', jumlah: 0, deskripsi: '', image_url: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('https://backend-tutam-10-sbd-six.vercel.app/api/items', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      
      if (response.ok) {
        navigate('/');
      } else {
        alert("Gagal menyimpan data ke server!");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Terjadi kesalahan jaringan!");
    }
  };

  return (
    <div className="form-container">
      <h3 className="form-title">Tambah Barang Baru</h3>
      <form onSubmit={handleSubmit} className="form-group">
        <input className="input-field" type="text" name="nama_barang" placeholder="Nama Barang" onChange={handleChange} required />
        <input className="input-field" type="text" name="kategori" placeholder="Kategori (misal: Alat Musik)" onChange={handleChange} required />
        <input className="input-field" type="number" name="jumlah" placeholder="Jumlah Stok" onChange={handleChange} required />
        <textarea className="input-field" name="deskripsi" placeholder="Deskripsi Barang" onChange={handleChange} rows="3" />
        
        <input className="input-field" type="text" name="image_url" placeholder="Link URL Gambar" onChange={handleChange} required />
        
        <div className="btn-group">
          <button type="submit" className="btn-save">Simpan Barang</button>
          <Link to="/" className="btn-cancel">Batal</Link>
        </div>
      </form>
    </div>
  );
}

export default AddPage;