import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';
import { SUPPORTED_WALLETS } from '../data/wallets';
import { WalletCategory } from '../types';
import { WalletLogo } from './WalletLogo';

interface WalletsSectionProps {
  onConnectWallet: (walletId: string) => void;
}

export const WalletsSection: React.FC<WalletsSectionProps> = ({ onConnectWallet }) => {
  const [filter, setFilter] = useState<'All' | WalletCategory>('All');

  const filteredWallets =
    filter === 'All'
      ? SUPPORTED_WALLETS
      : SUPPORTED_WALLETS.filter((w) => w.category === filter);

  return (
    <section id="wallets" className="bg-white py-20 lg:py-24 border-b border-[#E3E8EE]">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl space-y-3">
            <div className="text-sm font-semibold text-[#635BFF]">Supported wallets</div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#0A2540] leading-[1.12] text-balance">
              Works with Ledger, Phantom, Trust Wallet, and many others.
            </h2>
            <p className="text-base text-[#425466] leading-relaxed">
              Connecting takes one quick signature—your seed phrase never leaves your device, and
              no upfront deposit is ever required.
            </p>
          </div>

          <div className="flex items-center gap-1 p-1 bg-[#F6F9FC] border border-[#E3E8EE] rounded-lg self-start lg:self-auto shrink-0">
            {(['All', 'Hardware', 'Mobile & Browser'] as const).map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setFilter(tab)}
                className={`px-3.5 py-1.5 text-xs font-semibold rounded-md transition-colors cursor-pointer whitespace-nowrap ${
                  filter === tab
                    ? 'bg-white text-[#0A2540] shadow-xs'
                    : 'text-[#425466] hover:text-[#0A2540]'
                }`}
              >
                {tab === 'All' ? 'All wallets' : tab}
              </button>
            ))}
          </div>
        </div>

        {/* Clean Architectural Hairline Grid (Stripe Integration Grid style) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 border-t border-l border-[#E3E8EE]">
          {filteredWallets.map((wallet, index) => (
            <motion.div
              key={wallet.id}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.3, delay: index * 0.03 }}
              className="group p-6 border-r border-b border-[#E3E8EE] bg-white hover:bg-[#F6F9FC]/70 transition-colors flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <WalletLogo walletId={wallet.id} className="w-9 h-9 shrink-0" />
                  <div>
                    <h3 className="text-base font-bold text-[#0A2540]">{wallet.name}</h3>
                    <div className="text-xs text-[#64748B]">{wallet.protocol}</div>
                  </div>
                </div>

                <p className="text-sm text-[#425466] leading-relaxed">{wallet.description}</p>
              </div>

              <div className="mt-6 pt-3 flex items-center justify-between gap-2">
                <span className="text-xs text-[#64748B] truncate">
                  {wallet.chains.join(' · ')}
                </span>

                <button
                  type="button"
                  onClick={() => onConnectWallet(wallet.id)}
                  className="inline-flex items-center gap-1 text-xs font-semibold text-[#635BFF] hover:text-[#5249F5] shrink-0 cursor-pointer"
                >
                  <span>Connect</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-sm text-[#425466]">
          <p>
            Also compatible with <span className="font-semibold text-[#0A2540]">Safe</span>,{' '}
            <span className="font-semibold text-[#0A2540]">Rabby</span>,{' '}
            <span className="font-semibold text-[#0A2540]">OKX Wallet</span>, and many others via
            WalletConnect v2.
          </p>
          <button
            type="button"
            onClick={() => onConnectWallet('ledger')}
            className="text-sm font-semibold text-[#635BFF] hover:text-[#5249F5] whitespace-nowrap self-start sm:self-auto cursor-pointer"
          >
            Connect another wallet →
          </button>
        </div>
      </div>
    </section>
  );
};
