// src/pages/OnboardingPage.tsx
import React, { useState } from 'react';
import './OnboardingPage.scss';

export const OnboardingPage: React.FC = () => {
  const [step, setStep] = useState(1);

  return (
    <section className="onboarding">
      <h2>Lite Setup Wizard</h2>
      <p>Answer a few questions to seed your liquidity profile.</p>

      <div className="onboarding-steps">
        <div className={step === 1 ? 'step active' : 'step'}>1. Company</div>
        <div className={step === 2 ? 'step active' : 'step'}>2. Risk</div>
        <div className={step === 3 ? 'step active' : 'step'}>3. Preview</div>
      </div>

      <div className="onboarding-body">
        {step === 1 && <p>Collect basic company info (name, size, currency).</p>}
        {step === 2 && <p>Set risk tolerance and liquidity preferences.</p>}
        {step === 3 && <p>Review your generated snapshot and finish.</p>}
      </div>

      <div className="onboarding-actions">
        <button disabled={step === 1} onClick={() => setStep((s) => s - 1)}>
          Back
        </button>
        {step < 3 ? (
          <button onClick={() => setStep((s) => s + 1)}>Next</button>
        ) : (
          <button className="primary">Finish</button>
        )}
      </div>
    </section>
  );
};
