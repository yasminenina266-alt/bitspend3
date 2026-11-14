import React from 'react';
import { ChevronRight } from 'lucide-react';
import { AppView } from '../types';

interface ConversionFooterProps {
  onGetStarted: () => void;
  onNavigate: (view: AppView, sectionId?: string) => void;
}

export const ConversionFooter: React.FC<ConversionFooterProps> = ({
  onGetStarted,
  onNavigate,
}) => {
  return (
    <>
      {/* Conversion CTA Section */}
      <section className="bg-white py-20 border-b border-[#E3E8EE]">
        <div className="max-w-6xl mx-auto px-6 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
          <div className="max-w-xl space-y-3">
            <h2 className="text-3xl font-extrabold tracking-tight text-[#0A2540] text-balance">
              Ready to spend straight from your wallet?
            </h2>
            <p className="text-base text-[#425466] leading-relaxed">
              Create your Bitspend account in under a minute, link Ledger, Phantom, or Trust
              Wallet, and add your card to Apple Pay or Google Pay with zero upfront deposit.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={onGetStarted}
              className="inline-flex items-center gap-2 px-5 py-3 text-sm font-semibold text-white bg-[#635BFF] hover:bg-[#5249F5] rounded-md transition-colors cursor-pointer whitespace-nowrap"
            >
              <span>Create your card</span>
              <ChevronRight className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => onNavigate('login')}
              className="px-5 py-3 text-sm font-semibold text-[#0A2540] bg-[#F6F9FC] hover:bg-[#EDF2F7] border border-[#E3E8EE] rounded-md transition-colors cursor-pointer whitespace-nowrap"
            >
              Sign in
            </button>
          </div>
        </div>
      </section>

      {/* Quiet Footer */}
      <footer className="bg-[#F6F9FC] py-12">
        <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="space-y-1">
            <div className="text-lg font-extrabold tracking-tight text-[#0A2540]">Bitspend</div>
            <div className="text-xs text-[#64748B]">
              Self-custody crypto card infrastructure · Internal team preview
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-6 text-xs font-semibold text-[#425466]">
            <a
              href="#features"
              onClick={(e) => {
                e.preventDefault();
                onNavigate('landing', 'features');
              }}
              className="hover:text-[#0A2540] transition-colors"
            >
              Features
            </a>
            <a
              href="#wallets"
              onClick={(e) => {
                e.preventDefault();
                onNavigate('landing', 'wallets');
              }}
              className="hover:text-[#0A2540] transition-colors"
            >
              Wallets
            </a>
            <a
              href="#cards"
              onClick={(e) => {
                e.preventDefault();
                onNavigate('landing', 'cards');
              }}
              className="hover:text-[#0A2540] transition-colors"
            >
              Cards
            </a>
            <button
              type="button"
              onClick={() => onNavigate('login')}
              className="hover:text-[#0A2540] transition-colors cursor-pointer"
            >
              Sign in
            </button>
          </div>
        </div>
      </footer>
    </>
  );
};
