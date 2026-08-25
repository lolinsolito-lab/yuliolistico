import React, { useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import { useNavigate } from 'react-router-dom';
import { Lock, Loader } from 'lucide-react';

const LoginPage: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        const { error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (error) {
            setError(error.message);
            setLoading(false);
        } else {
            navigate('/admin');
        }
    };

    return (
        <div className="min-h-screen bg-[#292524] flex items-center justify-center p-4">
            <div className="max-w-md w-full bg-[#faf9f6] rounded-xl shadow-2xl overflow-hidden">
                <div className="p-8 text-center">
                    <div className="w-16 h-16 bg-[#d4af37]/10 rounded-full flex items-center justify-center mx-auto mb-6">
                        <Lock className="w-8 h-8 text-[#d4af37]" />
                    </div>
                    <h2 className="font-serif text-3xl text-[#292524] mb-2">Area Riservata</h2>
                    <p className="text-[#57534e] text-sm">Accedi al Trono di Controllo</p>
                </div>

                <form onSubmit={handleLogin} className="p-8 pt-0 space-y-6">
                    {error && (
                        <div className="p-3 bg-red-50 text-red-600 text-xs rounded border border-red-100 flex items-center gap-2">
                            <span>⚠️ {error}</span>
                        </div>
                    )}

                    <div>
                        <label className="block text-xs font-bold uppercase tracking-widest text-[#a8a29e] mb-2">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full bg-white border border-stone-200 p-3 rounded text-[#292524] focus:outline-none focus:border-[#c07a60] transition-colors"
                            placeholder="admin@yuliolistico.com"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-bold uppercase tracking-widest text-[#a8a29e] mb-2">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full bg-white border border-stone-200 p-3 rounded text-[#292524] focus:outline-none focus:border-[#c07a60] transition-colors"
                            placeholder="••••••••"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-4 bg-[#292524] text-white uppercase tracking-[0.2em] font-bold text-xs hover:bg-[#c07a60] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center gap-2 group"
                    >
                        {loading ? <Loader className="animate-spin w-4 h-4" /> : 'Entra nel Sistema'}
                    </button>
                </form>

                <div className="bg-stone-100 p-4 text-center text-[10px] text-stone-400 uppercase tracking-widest">
                    Insolito Empire System v1.0
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
