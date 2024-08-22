'use client';

import React, { FormEvent, useState } from 'react';
// import { Beer, Edit, Tag, FileText } from 'lucide-react';

const BeerCardForm = () => {
  const [beerName, setBeerName] = useState<string>('');
  const [brewery, setBrewery] = useState<string>('');
  const [origin, setOrigin] = useState<string>('');
  const [style, setStyle] = useState<string>('');
  const [hops, setHops] = useState<string>('');
  const [abv, setAbv] = useState<string>('');
  const [ibu, setIbu] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<boolean>(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    setSuccess(false);

    try {
      console.log('Beer card form submitted', {
        beerName,
        brewery,
        origin,
        style,
        hops,
        abv,
        ibu,
        description,
      });

      setSuccess(true);
    } catch (error) {
      console.error('Unexpected error during form submission:', error);
      setError('予期しないエラーが発生しました。もう一度お試しください。');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="font-['Comic_Sans_MS',_cursive] bg-amber-50 min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-lg shadow-xl overflow-hidden transform transition-all hover:scale-105 duration-300">
          <div className="p-8">
            <div className="text-center mb-8">
              <Beer className="w-20 h-20 mx-auto text-amber-500" />
            </div>
            {error && (
              <div className="mb-4 text-red-500 text-center">{error}</div>
            )}
            {success && (
              <div className="mb-4 text-green-500 text-center">
                カードが保存されました！
              </div>
            )}
            <form onSubmit={handleSubmit}>
              <div className="mb-6">
                <label className="block text-gray-700 mb-2" htmlFor="beerName">
                  商品名
                </label>
                <div className="relative">
                  <Edit
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                    size={20}
                  />
                  <input
                    id="beerName"
                    type="text"
                    className="w-full pl-10 pr-3 py-2 rounded-lg bg-white border border-gray-300 focus:outline-none focus:border-amber-500"
                    placeholder="（例）HackSonicIPA"
                    value={beerName}
                    onChange={(e) => setBeerName(e.target.value)}
                    required
                  />
                </div>
              </div>
              <div className="mb-6">
                <label className="block text-gray-700 mb-2" htmlFor="brewery">
                  醸造所
                </label>
                <div className="relative">
                  <Tag
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                    size={20}
                  />
                  <input
                    id="brewery"
                    type="text"
                    className="w-full pl-10 pr-3 py-2 rounded-lg bg-white border border-gray-300 focus:outline-none focus:border-amber-500"
                    placeholder="（例）G's BREWERY"
                    value={brewery}
                    onChange={(e) => setBrewery(e.target.value)}
                    required
                  />
                </div>
              </div>
              <div className="mb-6">
                <label className="block text-gray-700 mb-2" htmlFor="origin">
                  産地
                </label>
                <div className="relative">
                  <Tag
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                    size={20}
                  />
                  <input
                    id="origin"
                    type="text"
                    className="w-full pl-10 pr-3 py-2 rounded-lg bg-white border border-gray-300 focus:outline-none focus:border-amber-500"
                    placeholder="（例）東京"
                    value={origin}
                    onChange={(e) => setBrewery(e.target.value)}
                    required
                  />
                </div>
              </div>
              <div className="mb-6">
                <label className="block text-gray-700 mb-2" htmlFor="style">
                  スタイル
                </label>
                <div className="relative">
                  <Tag
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                    size={20}
                  />
                  <input
                    id="style"
                    type="text"
                    className="w-full pl-10 pr-3 py-2 rounded-lg bg-white border border-gray-300 focus:outline-none focus:border-amber-500"
                    placeholder="（例）Hazy IPA"
                    value={style}
                    onChange={(e) => setStyle(e.target.value)}
                    required
                  />
                </div>
              </div>
              <div className="mb-6">
                <label className="block text-gray-700 mb-2" htmlFor="hops">
                  ホップ
                </label>
                <div className="relative">
                  <Tag
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                    size={20}
                  />
                  <input
                    id="hops"
                    type="text"
                    className="w-full pl-10 pr-3 py-2 rounded-lg bg-white border border-gray-300 focus:outline-none focus:border-amber-500"
                    placeholder="（例）NELSON、CITRA、SIMCOE"
                    value={hops}
                    onChange={(e) => setStyle(e.target.value)}
                    required
                  />
                </div>
              </div>
              <div className="mb-6">
                <label className="block text-gray-700 mb-2" htmlFor="abv">
                  ABV（%）
                </label>
                <div className="relative">
                  <Tag
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                    size={20}
                  />
                  <input
                    id="abv"
                    type="number"
                    step="0.1"
                    min="0"
                    max="100"
                    className="w-full pl-10 pr-3 py-2 rounded-lg bg-white border border-gray-300 focus:outline-none focus:border-amber-500"
                    placeholder="（例）6.5  ※数字で入力"
                    value={abv}
                    onChange={(e) => setAbv(e.target.value)}
                    required
                  />
                </div>
              </div>
              <div className="mb-6">
                <label className="block text-gray-700 mb-2" htmlFor="ibu">
                  IBU
                </label>
                <div className="relative">
                  <Tag
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                    size={20}
                  />
                  <input
                    id="ibu"
                    type="number"
                    step="0.1"
                    min="0"
                    max="100"
                    className="w-full pl-10 pr-3 py-2 rounded-lg bg-white text-black border border-gray-300 focus:outline-none focus:border-yellow-500"
                    placeholder="（例）30"
                    value={ibu}
                    onChange={(e) => setIbu(e.target.value)}
                    required
                  />
                </div>
              </div>
              <div className="mb-6">
                <label
                  className="block text-gray-700 mb-2"
                  htmlFor="description"
                >
                  説明
                </label>
                <div className="relative">
                  <FileText
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                    size={20}
                  />
                  <textarea
                    id="description"
                    className="w-full pl-10 pr-3 py-2 rounded-lg bg-white border border-gray-300 focus:outline-none focus:border-amber-500"
                    placeholder="ビールの説明を入力"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                  />
                </div>
              </div>
              <button
                type="submit"
                className="w-full bg-amber-500 text-white rounded-lg px-4 py-2 hover:bg-amber-600 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-opacity-50 transition-colors duration-300"
                disabled={loading}
              >
                {loading ? '保存中...' : '保存'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BeerCardForm;
