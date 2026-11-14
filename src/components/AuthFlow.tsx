import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ArrowLeft,
  Check,
  CheckCircle2,
  ChevronRight,
  Eye,
  EyeOff,
  Lock,
  ShieldCheck,
  Smartphone,
  Wallet,
} from 'lucide-react';
import { BitspendUser, CardFinish, CurrencyCode } from '../types';
import { DEMO_TEAM_USER, SUPPORTED_WALLETS } from '../data/wallets';
import { InteractiveDigitalCard } from './BitspendCardVisual';
import { ApplePayMark, GooglePayMark, WalletLogo } from './WalletLogo';

interface AuthFlowProps {
  mode: 'login' | 'register';
  preselectedWalletId?: string;
  existingUsers: BitspendUser[];
  onSwitchMode: (mode: 'login' | 'register') => void;
  onCompleteAuth: (user: BitspendUser, isNewUser: boolean) => void;
  onBackToSite: () => void;
}

function generateCardNumber(): string {
  const block2 = Math.floor(1000 + Math.random() * 9000);
  const block3 = Math.floor(1000 + Math.random() * 9000);
  const block4 = Math.floor(1000 + Math.random() * 9000);
  return `4532 ${block2} ${block3} ${block4}`;
}

export const AuthFlow: React.FC<AuthFlowProps> = ({
  mode,
  preselectedWalletId,
  existingUsers,
  onSwitchMode,
  onCompleteAuth,
  onBackToSite,
}) => {
  // Login state
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [showLoginPw, setShowLoginPw] = useState(false);
  const [loginError, setLoginError] = useState('');
  const [forgotSent, setForgotSent] = useState(false);

  // Registration multi-step state (4 steps)
  const [regStep, setRegStep] = useState<1 | 2 | 3 | 4>(1);
  const [fullName, setFullName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [showRegPw, setShowRegPw] = useState(false);
  const [currency, setCurrency] = useState<CurrencyCode>('USD');
  const [agreedTerms, setAgreedTerms] = useState(true);
  const [regError, setRegError] = useState('');

  // Step 2: Card design
  const [cardFinish, setCardFinish] = useState<CardFinish>('obsidian');

  // Step 3: Wallet connection
  const [selectedWalletId, setSelectedWalletId] = useState<string>(
    preselectedWalletId || 'ledger'
  );
  const [customAddress, setCustomAddress] = useState('');
  const [walletConnected, setWalletConnected] = useState(false);
  const [connectingWallet, setConnectingWallet] = useState(false);

  // Step 4: Apple Pay / Google Pay provisioning
  const [applePayLinked, setApplePayLinked] = useState(true);
  const [googlePayLinked, setGooglePayLinked] = useState(false);
  const [issuingCard, setIssuingCard] = useState(false);

  const selectedWalletObj =
    SUPPORTED_WALLETS.find((w) => w.id === selectedWalletId) || SUPPORTED_WALLETS[0];

  const passwordStrength =
    regPassword.length >= 10
      ? 'Strong'
      : regPassword.length >= 6
        ? 'Good'
        : regPassword.length > 0
          ? 'Too short'
          : '';

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    const normalized = loginEmail.trim().toLowerCase();
    const matched = existingUsers.find(
      (u) => u.email.toLowerCase() === normalized && u.password === loginPassword
    );
    if (!matched) {
      setLoginError('Invalid email or password. Try the team demo credentials below.');
      return;
    }
    onCompleteAuth(matched, false);
  };

  const handleGoogleDemoLogin = () => {
    onCompleteAuth(DEMO_TEAM_USER, false);
  };

  const handleStep1Next = (e: React.FormEvent) => {
    e.preventDefault();
    setRegError('');
    if (!fullName.trim()) {
      setRegError('Please enter your name for card personalization.');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(regEmail.trim())) {
      setRegError('Please enter a valid email address.');
      return;
    }
    if (regPassword.length < 6) {
      setRegError('Password must be at least 6 characters.');
      return;
    }
    if (!agreedTerms) {
      setRegError('Please confirm the account agreement to continue.');
      return;
    }
    const exists = existingUsers.some(
      (u) => u.email.toLowerCase() === regEmail.trim().toLowerCase()
    );
    if (exists) {
      setRegError('An account with this email already exists. Please sign in instead.');
      return;
    }
    setRegStep(2);
  };

  const handleSimulateWalletLink = () => {
    setConnectingWallet(true);
    window.setTimeout(() => {
      setConnectingWallet(false);
      setWalletConnected(true);
    }, 550);
  };

  const handleFinishRegistration = () => {
    setIssuingCard(true);
    window.setTimeout(() => {
      const newUser: BitspendUser = {
        id: `user-${Date.now()}`,
        fullName: fullName.trim(),
        email: regEmail.trim().toLowerCase(),
        password: regPassword,
        currency,
        cardFinish,
        cardNumber: generateCardNumber(),
        cardExpiry: '11/29',
        cardCvv: String(Math.floor(100 + Math.random() * 900)),
        cardFrozen: false,
        applePayLinked,
        googlePayLinked,
        connectedWalletId: selectedWalletObj.id,
        walletAddress: customAddress.trim() || selectedWalletObj.sampleAddress,
        btcBalance: 0.365,
        createdAt: new Date().toISOString(),
        transactions: [
          {
            id: `tx-init-${Date.now()}`,
            merchant: 'Bitspend Card Activated',
            category: 'Card Provisioning',
            fiatAmount: 0,
            currency,
            btcAmount: 0,
            walletName: selectedWalletObj.name,
            paymentRail: applePayLinked
              ? 'Apple Pay'
              : googlePayLinked
                ? 'Google Pay'
                : 'Virtual Card',
            timestamp: 'Just now',
            status: 'Settled',
          },
        ],
      };
      setIssuingCard(false);
      onCompleteAuth(newUser, true);
    }, 650);
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-[#F6F9FC] py-10 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6 flex items-center justify-between">
          <button
            type="button"
            onClick={onBackToSite}
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#425466] hover:text-[#0A2540] transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Bitspend</span>
          </button>

          <div className="text-xs font-medium text-[#64748B]">
            Team Preview · Local Browser Mockup
          </div>
        </div>

        {mode === 'login' ? (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
            className="max-w-md mx-auto bg-white border border-[#E3E8EE] rounded-2xl p-7 sm:p-9 shadow-sm"
          >
            <div className="space-y-1.5 mb-6">
              <h1 className="text-2xl font-extrabold tracking-tight text-[#0A2540]">
                Sign in to Bitspend
              </h1>
              <p className="text-sm text-[#425466]">
                Access your crypto card, Apple Pay / Google Pay settings, and connected wallets.
              </p>
            </div>

            <form onSubmit={handleLoginSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[#0A2540] mb-1.5">
                  Email address
                </label>
                <input
                  type="email"
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  placeholder="team@bitspend.io"
                  required
                  className="w-full px-3.5 py-2.5 text-sm bg-white border border-[#E3E8EE] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#635BFF] focus:border-transparent"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-xs font-semibold text-[#0A2540]">Password</label>
                  <button
                    type="button"
                    onClick={() => setForgotSent(true)}
                    className="text-xs font-semibold text-[#635BFF] hover:text-[#5249F5] cursor-pointer"
                  >
                    Forgot password?
                  </button>
                </div>
                <div className="relative">
                  <input
                    type={showLoginPw ? 'text' : 'password'}
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    placeholder="••••••••"
                    required
                    className="w-full px-3.5 py-2.5 pr-10 text-sm bg-white border border-[#E3E8EE] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#635BFF] focus:border-transparent"
                  />
                  <button
                    type="button"
                    onClick={() => setShowLoginPw((s) => !s)}
                    aria-label={showLoginPw ? 'Hide password' : 'Show password'}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#64748B] hover:text-[#0A2540] cursor-pointer"
                  >
                    {showLoginPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {forgotSent && (
                <div className="p-3 rounded-lg bg-[#F6F9FC] border border-[#E3E8EE] text-xs text-[#0A2540]">
                  Mockup notice: Password recovery email simulated. Use{' '}
                  <span className="font-mono font-semibold">team@bitspend.io</span> /{' '}
                  <span className="font-mono font-semibold">bitspend2026</span>.
                </div>
              )}

              {loginError && (
                <div className="p-3 rounded-lg bg-rose-50 border border-rose-200 text-xs text-rose-700 font-medium">
                  {loginError}
                </div>
              )}

              <button
                type="submit"
                className="w-full py-2.5 px-4 text-sm font-semibold text-white bg-[#635BFF] hover:bg-[#5249F5] rounded-lg transition-colors cursor-pointer"
              >
                Sign in
              </button>
            </form>

            <div className="my-5 flex items-center gap-3">
              <div className="flex-1 h-px bg-[#E3E8EE]" />
              <span className="text-xs text-[#64748B]">or</span>
              <div className="flex-1 h-px bg-[#E3E8EE]" />
            </div>

            <button
              type="button"
              onClick={handleGoogleDemoLogin}
              className="w-full py-2.5 px-4 text-sm font-semibold text-[#0A2540] bg-white hover:bg-[#F6F9FC] border border-[#E3E8EE] rounded-lg transition-colors flex items-center justify-center gap-2.5 cursor-pointer"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" aria-hidden="true">
                <path
                  fill="#4285F4"
                  d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17Z"
                />
                <path
                  fill="#34A853"
                  d="M12 24c3.3 0 6.08-1.09 8.11-2.96l-3.88-3.05c-1.1.74-2.51 1.18-4.23 1.18-3.25 0-6.01-2.2-7-5.15H.98v3.14C3.05 21.3 7.21 24 12 24Z"
                />
                <path
                  fill="#FBBC05"
                  d="M5 14.02c-.25-.74-.39-1.54-.39-2.36 0-.82.14-1.62.39-2.36V6.16H.98C.35 7.42 0 8.85 0 10.34s.35 2.92.98 4.18l4.02-3.14Z"
                />
                <path
                  fill="#EA4335"
                  d="M12 4.75c1.8 0 3.41.62 4.68 1.84l3.51-3.51C18.07 1.19 15.3 0 12 0 7.21 0 3.05 2.7.98 6.16l4.02 3.14c.99-2.95 3.75-5.15 7-5.15Z"
                />
              </svg>
              <span>Continue with Google (Team Demo)</span>
            </button>

            <div className="mt-5 p-3.5 rounded-lg bg-[#F6F9FC] border border-[#E3E8EE] text-xs text-[#425466] space-y-1">
              <div className="font-semibold text-[#0A2540]">Pre-seeded team demo account</div>
              <div className="font-mono">
                Email: team@bitspend.io · Pass: bitspend2026
              </div>
            </div>

            <div className="mt-6 text-center text-sm text-[#425466]">
              New to Bitspend?{' '}
              <button
                type="button"
                onClick={() => onSwitchMode('register')}
                className="font-semibold text-[#635BFF] hover:text-[#5249F5] cursor-pointer"
              >
                Create your card
              </button>
            </div>
          </motion.div>
        ) : (
          /* Fully Fledged 4-Step Registration Flow */
          <div className="bg-white border border-[#E3E8EE] rounded-2xl shadow-sm overflow-hidden">
            {/* Step Progress Header */}
            <div className="px-6 sm:px-9 py-5 border-b border-[#E3E8EE] bg-[#F6F9FC]/60 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h1 className="text-xl font-extrabold tracking-tight text-[#0A2540]">
                  Create your Bitspend card
                </h1>
                <p className="text-xs text-[#425466] mt-0.5">
                  No KYC or ID upload required · $0 upfront deposit
                </p>
              </div>

              <div className="flex items-center gap-2">
                {[
                  { n: 1, label: 'Account' },
                  { n: 2, label: 'Card' },
                  { n: 3, label: 'Wallet' },
                  { n: 4, label: 'Mobile Pay' },
                ].map((s) => {
                  const done = regStep > s.n;
                  const active = regStep === s.n;
                  return (
                    <div key={s.n} className="flex items-center gap-1.5">
                      <div
                        className={`w-6 h-6 rounded-full text-xs font-bold flex items-center justify-center ${
                          done
                            ? 'bg-emerald-600 text-white'
                            : active
                              ? 'bg-[#635BFF] text-white'
                              : 'bg-[#E3E8EE] text-[#64748B]'
                        }`}
                      >
                        {done ? <Check className="w-3.5 h-3.5" /> : s.n}
                      </div>
                      <span
                        className={`hidden sm:inline text-xs font-semibold ${
                          active ? 'text-[#0A2540]' : 'text-[#64748B]'
                        }`}
                      >
                        {s.label}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="p-6 sm:p-9">
              <AnimatePresence mode="wait">
                {regStep === 1 && (
                  <motion.form
                    key="step1"
                    initial={{ opacity: 0, x: 12 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -12 }}
                    transition={{ duration: 0.2 }}
                    onSubmit={handleStep1Next}
                    className="grid grid-cols-1 lg:grid-cols-12 gap-8"
                  >
                    <div className="lg:col-span-7 space-y-4">
                      <div>
                        <label className="block text-xs font-semibold text-[#0A2540] mb-1.5">
                          Name on card
                        </label>
                        <input
                          type="text"
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          placeholder="e.g. Alex Mercer"
                          className="w-full px-3.5 py-2.5 text-sm border border-[#E3E8EE] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#635BFF]"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-[#0A2540] mb-1.5">
                          Email address
                        </label>
                        <input
                          type="email"
                          value={regEmail}
                          onChange={(e) => setRegEmail(e.target.value)}
                          placeholder="you@domain.com"
                          className="w-full px-3.5 py-2.5 text-sm border border-[#E3E8EE] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#635BFF]"
                        />
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <div className="flex items-center justify-between mb-1.5">
                            <label className="block text-xs font-semibold text-[#0A2540]">
                              Password
                            </label>
                            {passwordStrength && (
                              <span
                                className={`text-[11px] font-semibold ${
                                  passwordStrength === 'Strong'
                                    ? 'text-emerald-600'
                                    : passwordStrength === 'Good'
                                      ? 'text-[#635BFF]'
                                      : 'text-rose-600'
                                }`}
                              >
                                {passwordStrength}
                              </span>
                            )}
                          </div>
                          <div className="relative">
                            <input
                              type={showRegPw ? 'text' : 'password'}
                              value={regPassword}
                              onChange={(e) => setRegPassword(e.target.value)}
                              placeholder="Min. 6 characters"
                              className="w-full px-3.5 py-2.5 pr-10 text-sm border border-[#E3E8EE] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#635BFF]"
                            />
                            <button
                              type="button"
                              onClick={() => setShowRegPw((s) => !s)}
                              aria-label={showRegPw ? 'Hide password' : 'Show password'}
                              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#64748B] cursor-pointer"
                            >
                              {showRegPw ? (
                                <EyeOff className="w-4 h-4" />
                              ) : (
                                <Eye className="w-4 h-4" />
                              )}
                            </button>
                          </div>
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-[#0A2540] mb-1.5">
                            Settlement currency
                          </label>
                          <select
                            value={currency}
                            onChange={(e) => setCurrency(e.target.value as CurrencyCode)}
                            className="w-full px-3.5 py-2.5 text-sm border border-[#E3E8EE] rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-[#635BFF]"
                          >
                            <option value="USD">USD — US Dollar</option>
                            <option value="EUR">EUR — Euro</option>
                            <option value="GBP">GBP — British Pound</option>
                          </select>
                        </div>
                      </div>

                      <label className="flex items-start gap-2.5 pt-1 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={agreedTerms}
                          onChange={(e) => setAgreedTerms(e.target.checked)}
                          className="mt-0.5 rounded border-[#CBD5E1] text-[#635BFF] focus:ring-[#635BFF]"
                        />
                        <span className="text-xs text-[#425466] leading-relaxed">
                          I understand Bitspend connects directly to my self-custody wallet with zero
                          upfront deposit and requires no ID verification to open a standard card.
                        </span>
                      </label>

                      {regError && (
                        <div className="p-3 rounded-lg bg-rose-50 border border-rose-200 text-xs text-rose-700 font-medium">
                          {regError}
                        </div>
                      )}

                      <div className="pt-2 flex items-center justify-between gap-4">
                        <div className="text-xs text-[#425466]">
                          Already registered?{' '}
                          <button
                            type="button"
                            onClick={() => onSwitchMode('login')}
                            className="font-semibold text-[#635BFF] hover:text-[#5249F5] cursor-pointer"
                          >
                            Sign in
                          </button>
                        </div>

                        <button
                          type="submit"
                          className="inline-flex items-center gap-1.5 px-5 py-2.5 text-sm font-semibold text-white bg-[#635BFF] hover:bg-[#5249F5] rounded-lg transition-colors cursor-pointer"
                        >
                          <span>Continue</span>
                          <ChevronRight className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    <div className="lg:col-span-5 bg-[#F6F9FC] border border-[#E3E8EE] rounded-xl p-5 space-y-4">
                      <div className="text-sm font-bold text-[#0A2540]">
                        Included with your Bitspend account
                      </div>
                      <ul className="space-y-3 text-xs text-[#425466]">
                        <li className="flex items-start gap-2.5">
                          <ShieldCheck className="w-4 h-4 text-[#635BFF] shrink-0 mt-0.5" />
                          <span>No passport, selfie, or KYC required on registration</span>
                        </li>
                        <li className="flex items-start gap-2.5">
                          <Wallet className="w-4 h-4 text-[#635BFF] shrink-0 mt-0.5" />
                          <span>Zero pre-deposit—spend directly from your connected wallet</span>
                        </li>
                        <li className="flex items-start gap-2.5">
                          <Smartphone className="w-4 h-4 text-[#635BFF] shrink-0 mt-0.5" />
                          <span>Instant Apple Pay &amp; Google Pay provisioning on step 4</span>
                        </li>
                      </ul>
                    </div>
                  </motion.form>
                )}

                {regStep === 2 && (
                  <motion.div
                    key="step2"
                    initial={{ opacity: 0, x: 12 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -12 }}
                    transition={{ duration: 0.2 }}
                    className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
                  >
                    <div className="lg:col-span-6 space-y-5">
                      <div>
                        <h2 className="text-lg font-bold text-[#0A2540]">
                          Choose your Bitspend card finish
                        </h2>
                        <p className="text-sm text-[#425466] mt-1">
                          Both finishes issue an instant virtual card for mobile wallets immediately
                          after step 4.
                        </p>
                      </div>

                      <div className="space-y-3">
                        <button
                          type="button"
                          onClick={() => setCardFinish('obsidian')}
                          className={`w-full text-left p-4 rounded-xl border transition-all cursor-pointer ${
                            cardFinish === 'obsidian'
                              ? 'border-[#635BFF] bg-[#635BFF]/5'
                              : 'border-[#E3E8EE] hover:bg-[#F6F9FC]'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-bold text-[#0A2540]">
                              Obsidian Titanium
                            </span>
                            <span className="text-xs font-semibold text-[#635BFF]">
                              Virtual + Metal option
                            </span>
                          </div>
                          <p className="text-xs text-[#425466] mt-1">
                            Matte brushed black titanium aesthetic with subtle Bitcoin mark.
                          </p>
                        </button>

                        <button
                          type="button"
                          onClick={() => setCardFinish('aurora')}
                          className={`w-full text-left p-4 rounded-xl border transition-all cursor-pointer ${
                            cardFinish === 'aurora'
                              ? 'border-[#635BFF] bg-[#635BFF]/5'
                              : 'border-[#E3E8EE] hover:bg-[#F6F9FC]'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-bold text-[#0A2540]">
                              Aurora Iridescent
                            </span>
                            <span className="text-xs font-semibold text-[#635BFF]">
                              Instant Virtual
                            </span>
                          </div>
                          <p className="text-xs text-[#425466] mt-1">
                            Frosted pearl-indigo holographic gradient built for Apple &amp; Google
                            Wallet.
                          </p>
                        </button>
                      </div>

                      <div className="pt-2 flex items-center justify-between">
                        <button
                          type="button"
                          onClick={() => setRegStep(1)}
                          className="px-4 py-2 text-sm font-semibold text-[#425466] hover:text-[#0A2540] cursor-pointer"
                        >
                          Back
                        </button>
                        <button
                          type="button"
                          onClick={() => setRegStep(3)}
                          className="inline-flex items-center gap-1.5 px-5 py-2.5 text-sm font-semibold text-white bg-[#635BFF] hover:bg-[#5249F5] rounded-lg transition-colors cursor-pointer"
                        >
                          <span>Continue to Wallet</span>
                          <ChevronRight className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    <div className="lg:col-span-6 flex justify-center">
                      <InteractiveDigitalCard
                        finish={cardFinish}
                        holderName={fullName || 'ALEX MERCER'}
                        walletLabel="Preview Card"
                      />
                    </div>
                  </motion.div>
                )}

                {regStep === 3 && (
                  <motion.div
                    key="step3"
                    initial={{ opacity: 0, x: 12 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -12 }}
                    transition={{ duration: 0.2 }}
                    className="space-y-6 max-w-lg mx-auto py-4 text-center"
                  >
                    <div>
                      <h2 className="text-xl font-bold text-[#0A2540]">
                        Connect your self-custody wallet
                      </h2>
                      <p className="text-sm text-[#425466] mt-1">
                        Connect your Web3 wallet securely using WalletConnect to enable direct bitcoin spending.
                      </p>
                    </div>

                    <div className="p-8 rounded-2xl bg-[#F6F9FC] border border-[#E3E8EE] flex flex-col items-center justify-center space-y-5">
                      <div className="w-14 h-14 rounded-2xl bg-[#635BFF]/10 flex items-center justify-center text-[#635BFF]">
                        <Wallet className="w-7 h-7" />
                      </div>

                      <div className="space-y-1">
                        <div className="text-sm font-bold text-[#0A2540]">
                          Web3 Wallet Connection
                        </div>
                        <div className="text-xs text-[#425466]">
                          Click below to initiate your WalletConnect session.
                        </div>
                      </div>

                      <button
                        type="button"
                        id="connect-wallet"
                        data-connect-wallet
                        className="connect-wallet w-full sm:w-auto min-w-[220px] px-6 py-3 text-sm font-semibold text-white bg-[#635BFF] hover:bg-[#5249F5] active:bg-[#4E46E5] rounded-xl transition-all shadow-sm cursor-pointer flex items-center justify-center gap-2"
                      >
                        <Wallet className="w-4 h-4" />
                        <span>Connect Wallet</span>
                      </button>
                    </div>

                    <div className="flex items-center justify-between pt-4">
                      <button
                        type="button"
                        onClick={() => setRegStep(2)}
                        className="px-4 py-2 text-sm font-semibold text-[#425466] hover:text-[#0A2540] cursor-pointer"
                      >
                        Back
                      </button>
                      <button
                        type="button"
                        onClick={() => setRegStep(4)}
                        className="inline-flex items-center gap-1.5 px-6 py-3 text-sm font-semibold text-white bg-[#635BFF] hover:bg-[#5249F5] rounded-xl transition-colors cursor-pointer shadow-sm"
                      >
                        <span>Continue to Apple Pay &amp; Google Pay</span>
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </motion.div>
                )}

                {regStep === 4 && (
                  <motion.div
                    key="step4"
                    initial={{ opacity: 0, x: 12 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -12 }}
                    transition={{ duration: 0.2 }}
                    className="space-y-6"
                  >
                    <div>
                      <h2 className="text-lg font-bold text-[#0A2540]">
                        Connect Apple Pay or Google Pay instantly
                      </h2>
                      <p className="text-sm text-[#425466] mt-1">
                        Provision your virtual Bitspend card to your mobile wallet right away.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <button
                        type="button"
                        onClick={() => setApplePayLinked((v) => !v)}
                        className={`p-5 rounded-xl border text-left transition-all cursor-pointer ${
                          applePayLinked
                            ? 'border-[#635BFF] bg-[#635BFF]/5'
                            : 'border-[#E3E8EE] hover:bg-[#F6F9FC]'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-3">
                          <ApplePayMark className="h-7 w-auto" />
                          <span
                            className={`text-xs font-semibold ${
                              applePayLinked ? 'text-emerald-700' : 'text-[#64748B]'
                            }`}
                          >
                            {applePayLinked ? 'Selected' : 'Optional'}
                          </span>
                        </div>
                        <p className="text-xs text-[#425466]">
                          Add Bitspend virtual card to Apple Wallet for iPhone &amp; Apple Watch
                          tap-to-pay.
                        </p>
                      </button>

                      <button
                        type="button"
                        onClick={() => setGooglePayLinked((v) => !v)}
                        className={`p-5 rounded-xl border text-left transition-all cursor-pointer ${
                          googlePayLinked
                            ? 'border-[#635BFF] bg-[#635BFF]/5'
                            : 'border-[#E3E8EE] hover:bg-[#F6F9FC]'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-3">
                          <GooglePayMark className="h-7 w-auto" />
                          <span
                            className={`text-xs font-semibold ${
                              googlePayLinked ? 'text-emerald-700' : 'text-[#64748B]'
                            }`}
                          >
                            {googlePayLinked ? 'Selected' : 'Optional'}
                          </span>
                        </div>
                        <p className="text-xs text-[#425466]">
                          Provision Bitspend card into Google Wallet on Android and Chrome checkout.
                        </p>
                      </button>
                    </div>

                    <div className="p-4 rounded-xl bg-[#F6F9FC] border border-[#E3E8EE] text-[#0A2540] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div className="space-y-1">
                        <div className="text-xs text-[#425466] flex items-center gap-1.5">
                          <Lock className="w-3.5 h-3.5 text-[#635BFF]" />
                          <span>Ready to issue · {selectedWalletObj.name} linked</span>
                        </div>
                        <div className="text-sm font-bold">
                          {fullName} · {cardFinish === 'obsidian' ? 'Obsidian Titanium' : 'Aurora Virtual'}
                        </div>
                      </div>
                      <div className="font-mono text-xs font-semibold text-emerald-700">
                        $0.00 Upfront Deposit
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-2">
                      <button
                        type="button"
                        onClick={() => setRegStep(3)}
                        className="px-4 py-2 text-sm font-semibold text-[#425466] hover:text-[#0A2540] cursor-pointer"
                      >
                        Back
                      </button>

                      <button
                        type="button"
                        onClick={handleFinishRegistration}
                        disabled={issuingCard}
                        className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-white bg-[#635BFF] hover:bg-[#5249F5] rounded-lg transition-colors cursor-pointer"
                      >
                        <span>
                          {issuingCard ? 'Issuing virtual card...' : 'Activate Bitspend Card'}
                        </span>
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
