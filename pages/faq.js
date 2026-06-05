import Navbar from "@/components/Navbar";
import { useState } from "react";

const faqs = [
  {
    id: 1,
    question: "Bagaimana cara melakukan pemesanan?",
    answer:
      "Pilih produk yang kamu inginkan, klik 'Add to Cart', lalu lanjutkan ke proses checkout dan ikuti instruksi pembayaran.",
  },
  {
    id: 2,
    question: "Berapa lama pengiriman?",
    answer:
      "Pengiriman reguler 3-5 hari kerja. Pengiriman express 1-2 hari kerja. Tersedia untuk seluruh wilayah Indonesia.",
  },
  {
    id: 3,
    question: "Apakah bisa melakukan pengembalian produk?",
    answer:
      "Ya, produk dapat dikembalikan dalam 7 hari setelah diterima dengan kondisi masih tersegel dan belum digunakan.",
  },
  {
    id: 4,
    question: "Metode pembayaran apa saja yang tersedia?",
    answer:
      "Kami menerima Transfer Bank, GoPay, OVO, Dana, QRIS, dan Kartu Kredit/Debit Visa & Mastercard.",
  },
  {
    id: 5,
    question: "Apakah produk bergaransi?",
    answer:
      "Semua produk elektronik dilengkapi garansi resmi dari produsen minimal 1 tahun. Detail garansi tertera di halaman produk.",
  },
];

export default function FAQ() {
  const [openId, setOpenId] = useState(null);

  const toggle = (id) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      {/* Header */}
      <div className="bg-blue-600 text-white text-center py-16 px-4">
        <h1 className="text-4xl font-bold mb-3">❓ FAQ</h1>
        <p className="text-lg text-blue-100">
          Pertanyaan yang sering ditanyakan
        </p>
      </div>

      {/* FAQ Accordion */}
      <div className="max-w-3xl mx-auto px-4 py-10">
        {faqs.map((faq) => (
          <div
            key={faq.id}
            className="bg-white rounded-xl shadow-md mb-4 overflow-hidden"
          >
            <button
              onClick={() => toggle(faq.id)}
              className="w-full text-left px-6 py-4 flex justify-between items-center hover:bg-gray-50 transition"
            >
              <span className="font-semibold text-gray-800">
                {faq.question}
              </span>
              <span className="text-blue-600 text-xl">
                {openId === faq.id ? "−" : "+"}
              </span>
            </button>
            {openId === faq.id && (
              <div className="px-6 pb-4 text-gray-500 leading-relaxed">
                {faq.answer}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
