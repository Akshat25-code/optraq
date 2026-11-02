import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import WelcomePage from '@/features/workspace/WelcomePage';
import Header from '@/components/layout/Header';
import { AuthProvider } from '@/contexts/AuthContext';

const VIDEO_URL =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260813_092641_de52eb87-daf2-41db-92cb-7a56eae012a5.mp4';

describe('landing Apogee hero & system', () => {
  it('states the headline with primary CTAs, telemetry instrument, and background video', () => {
    render(
      <MemoryRouter>
        <WelcomePage />
      </MemoryRouter>,
    );
    expect(screen.getByText('Elevate your essential code to peak performance')).toBeTruthy();
    expect(screen.getByText(/Deterministic AST reasoning/i)).toBeTruthy();

    // CTA links share "Try OPTRAQ"
    const ctas = screen.getAllByRole('link', { name: /try optraq/i });
    expect(ctas.length).toBeGreaterThanOrEqual(2);

    const video = document.querySelector('video');
    expect(video).toBeTruthy();
    expect(video.getAttribute('src')).toBe(VIDEO_URL);
  });

  it('renders the live telemetry performance instrument with benchmarks', () => {
    render(
      <MemoryRouter>
        <WelcomePage />
      </MemoryRouter>,
    );
    expect(screen.getByText('Optimization Throughput')).toBeTruthy();
    expect(screen.getByText('-74.2%')).toBeTruthy();
    expect(screen.getByText('+3.8x Throughput')).toBeTruthy();
    expect(screen.getByText('vs. baseline unoptimized AST')).toBeTruthy();
  });

  it('renders desktop and mobile navigation links', () => {
    render(
      <AuthProvider>
        <MemoryRouter>
          <Header />
          <WelcomePage />
        </MemoryRouter>
      </AuthProvider>,
    );
    const featuresBtn = screen.getByRole('button', { name: /features/i });
    fireEvent.click(featuresBtn);

    expect(screen.getAllByRole('link', { name: /workbench/i }).length).toBeGreaterThan(0);
    expect(screen.getAllByRole('link', { name: /review/i }).length).toBeGreaterThan(0);
    expect(screen.getAllByRole('link', { name: /rules/i }).length).toBeGreaterThan(0);
    expect(screen.getAllByRole('link', { name: /visualize/i }).length).toBeGreaterThan(0);
  });

  it('renders the below-fold story: pipeline stages, proof, instrument, FAQ', () => {
    render(
      <MemoryRouter>
        <WelcomePage />
      </MemoryRouter>,
    );
    expect(screen.getByText('Four stages. One proof.')).toBeTruthy();
    expect(screen.getByText('Measured, not promised.')).toBeTruthy();
    expect(screen.getByText('Asked, answered.')).toBeTruthy();
  });
});
