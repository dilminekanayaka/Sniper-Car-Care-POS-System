import { useEffect, useRef } from 'react';

const Reveal = ({ children, delay = 0 }) => {
  const elementRef = useRef(null);

  useEffect(() => {
    const node = elementRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );

    observer.observe(node);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div ref={elementRef} className="reveal" style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  );
};

const stats = [
  { label: 'Happy Customers', value: '12k+' },
  { label: 'Detailing Sessions', value: '48k+' },
  { label: 'Google Rating', value: '4.9/5' },
  { label: 'Mobile Vans', value: '24/7' },
];

const packages = [
  {
    name: 'Full Service',
    price: '20 AED',
    accent: 'Complete refresh',
    features: ['Full interior & exterior detail', 'Foam shampoo pre-wash', 'Comprehensive vacuum & wipe-down', 'Glass, wheel, and tire finish'],
  },
  {
    name: 'Full Body Wash + Shampoo',
    price: '10 AED',
    accent: 'Daily driver favorite',
    featured: true,
    features: [
      'Foam cannon shampoo wash',
      'Wheel & tire clean',
      'Spot-free rinse and hand dry',
      'Light interior vacuum',
    ],
  },
  {
    name: 'Water Body Wash',
    price: '5 AED',
    accent: 'Quick rinse',
    features: ['Pure water exterior wash', 'Gentle rinse & dry', 'Wheel face rinse', 'Ready in 10 minutes'],
  },
];

const testimonials = [
  {
    name: 'Maria L.',
    location: 'SoHo, NYC',
    quote: 'Sniper Car Care revived my Tesla in under an hour. Waterless interior clean was spotless and the finish still beads weeks later!',
    rating: 5,
  },
  {
    name: 'James R.',
    location: 'Brooklyn, NYC',
    quote: 'Booked between meetings and the van pulled up right on time. They treated my M3 like a concours-level detail.',
    rating: 5,
  },
  {
    name: 'Chloe P.',
    location: 'Upper East Side, NYC',
    quote: 'The ceramic package is worth every penny. The team was friendly, efficient, and meticulous with every surface.',
    rating: 5,
  },
];

const products = [
  {
    name: 'Signature Air Freshener Pods',
    description: 'Long-lasting fragrance capsules that clip onto vents for a clean, crisp cabin every drive.',
    price: '$12',
    accent: 'Best Seller',
    art: (props) => (
      <svg viewBox="0 0 320 220" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <defs>
          <linearGradient id="podBody" x1="60" y1="40" x2="260" y2="180" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#38bdf8" />
            <stop offset="55%" stopColor="#6366f1" />
            <stop offset="100%" stopColor="#a855f7" />
          </linearGradient>
          <radialGradient id="podGlow" cx="50%" cy="45%" r="60%">
            <stop offset="0%" stopColor="#bae6fd" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#0f172a" stopOpacity="0" />
          </radialGradient>
        </defs>
        <rect width="320" height="220" rx="32" fill="#0f172a" />
        <rect width="320" height="220" rx="32" fill="url(#podGlow)" />
        <g opacity="0.2">
          {Array.from({ length: 8 }).map((_, i) => (
            <circle key={i} cx={40 + i * 40} cy={200 - (i % 2) * 18} r="3" fill="#94a3b8" />
          ))}
        </g>
        <path d="M110 58h100c12 0 22 10 22 22v60c0 12-10 22-22 22H110c-12 0-22-10-22-22V80c0-12 10-22 22-22z" fill="url(#podBody)" />
        <path d="M124 78h72c8 0 14 6 14 14v36c0 8-6 14-14 14h-72c-8 0-14-6-14-14V92c0-8 6-14 14-14z" fill="#0f172a" opacity="0.6" />
        <circle cx="160" cy="132" r="18" stroke="#bae6fd" strokeWidth="6" opacity="0.65" />
        <path d="M160 98c-14-10-16-24-10-34" stroke="#e0f2fe" strokeWidth="6" strokeLinecap="round" opacity="0.5" />
        <path d="M160 98c14-10 16-24 10-34" stroke="#e0f2fe" strokeWidth="6" strokeLinecap="round" opacity="0.3" />
      </svg>
    ),
    benefits: ['Clips securely to vents', 'Scents inspired by boutique hotels', 'Adjustable fragrance dial']
  },
  {
    name: 'Premium Seat Cover Duo',
    description: 'Form-fitting neoprene covers protect against spills while keeping the cabin cool and breathable.',
    price: '$89',
    accent: 'Pro grade',
    art: (props) => (
      <svg viewBox="0 0 320 220" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <defs>
          <linearGradient id="seatGradient" x1="80" y1="40" x2="240" y2="200" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#4f46e5" />
            <stop offset="45%" stopColor="#0ea5e9" />
            <stop offset="100%" stopColor="#38bdf8" />
          </linearGradient>
          <radialGradient id="seatGlow" cx="55%" cy="40%" r="65%">
            <stop offset="0%" stopColor="#60a5fa" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#020617" stopOpacity="0" />
          </radialGradient>
        </defs>
        <rect width="320" height="220" rx="32" fill="#0f172a" />
        <rect width="320" height="220" rx="32" fill="url(#seatGlow)" />
        <path d="M94 180h40l10-50c2-8 2-18-2-26l-18-44c-4-8-12-12-20-12-8 0-16 4-20 12l-18 44c-4 8-4 18-2 26l10 50z" fill="#1e293b" />
        <path d="M186 180h40l10-50c2-8 2-18-2-26l-18-44c-4-8-12-12-20-12-8 0-16 4-20 12l-18 44c-4 8-4 18-2 26l10 50z" fill="#1e293b" />
        <path d="M96 174h36l9-46c2-8 1-16-2-22l-15-36c-2-5-6-8-10-8-4 0-8 3-10 8l-15 36c-3 6-4 14-2 22l9 46z" fill="url(#seatGradient)" />
        <path d="M188 174h36l9-46c2-8 1-16-2-22l-15-36c-2-5-6-8-10-8-4 0-8 3-10 8l-15 36c-3 6-4 14-2 22l9 46z" fill="url(#seatGradient)" opacity="0.85" />
        <path d="M120 60h16" stroke="#93c5fd" strokeWidth="4" strokeLinecap="round" opacity="0.5" />
        <path d="M212 60h16" stroke="#93c5fd" strokeWidth="4" strokeLinecap="round" opacity="0.45" />
        <path d="M110 138h20" stroke="#e0f2fe" strokeWidth="4" strokeLinecap="round" opacity="0.35" />
        <path d="M202 138h20" stroke="#e0f2fe" strokeWidth="4" strokeLinecap="round" opacity="0.3" />
      </svg>
    ),
    benefits: ['Easy slip-on install', 'Water-resistant neoprene', 'Machine washable']
  },
  {
    name: 'Smart Floor Mat Bundle',
    description: 'Laser-cut mats with raised edges lock in dirt and slush while matching your interior perfectly.',
    price: '$129',
    accent: 'Limited Drop',
    art: (props) => (
      <svg viewBox="0 0 320 220" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <defs>
          <linearGradient id="matGradient" x1="100" y1="60" x2="240" y2="200" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#38bdf8" />
            <stop offset="60%" stopColor="#22d3ee" />
            <stop offset="100%" stopColor="#14b8a6" />
          </linearGradient>
          <radialGradient id="matGlow" cx="45%" cy="40%" r="70%">
            <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.28" />
            <stop offset="100%" stopColor="#020617" stopOpacity="0" />
          </radialGradient>
        </defs>
        <rect width="320" height="220" rx="32" fill="#0f172a" />
        <rect width="320" height="220" rx="32" fill="url(#matGlow)" />
        <rect x="82" y="54" width="156" height="112" rx="26" fill="#0b1221" />
        <rect x="90" y="62" width="140" height="84" rx="20" fill="#111c33" />
        <rect x="102" y="74" width="116" height="72" rx="18" fill="url(#matGradient)" />
        <path d="M120 92h80" stroke="#0f172a" strokeWidth="4" strokeLinecap="round" opacity="0.5" />
        <path d="M120 108h80" stroke="#0f172a" strokeWidth="4" strokeLinecap="round" opacity="0.35" />
        <path d="M120 124h80" stroke="#0f172a" strokeWidth="4" strokeLinecap="round" opacity="0.35" />
        <rect x="140" y="150" width="40" height="18" rx="6" fill="#0f172a" opacity="0.5" />
        <path d="M118 176h84" stroke="#38bdf8" strokeWidth="6" strokeLinecap="round" opacity="0.35" />
      </svg>
    ),
    benefits: ['Edge-to-edge spill barrier', 'Anti-slip backing', 'Custom color stitching available']
  }
];

const LandingPage = () => {
  return (
    <div className="bg-slate-950 text-white overflow-hidden">
      <div className="relative min-h-screen pb-20">
        <div className="absolute inset-0 hero-glow opacity-70" aria-hidden="true" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.04),_transparent_65%)]" aria-hidden="true" />

        <header className="relative z-10">
          <nav className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 pt-8">
            <a href="#top" className="text-2xl font-semibold tracking-tight">
              Sniper<span className="text-primary-400">CarCare</span>
            </a>
            <div className="hidden items-center gap-8 text-sm text-slate-200/80 md:flex">
              <a href="#services" className="hover:text-white transition">Services</a>
              <a href="#products" className="hover:text-white transition">Products</a>
              <a href="#reviews" className="hover:text-white transition">Reviews</a>
            </div>
          </nav>
        </header>

        <main className="relative z-10">
          <section id="top" className="mx-auto mt-14 grid max-w-6xl grid-cols-1 gap-16 px-6 md:grid-cols-2 md:items-center">
            <Reveal>
              <div className="space-y-8">
                <div className="inline-flex items-center gap-3 rounded-full bg-white/5 px-5 py-2 text-xs uppercase tracking-[0.2em] text-slate-200/80">
                  <span className="text-amber-300 text-lg">★★★★★</span>
                  <span>Highly rated mobile detailing</span>
                </div>
                <h1 className="text-4xl font-semibold leading-tight tracking-[-0.02em] sm:text-5xl lg:text-6xl">
                  Mobile Car Wash & Detailing Across New York City
                </h1>
                <p className="max-w-xl text-lg text-slate-200/80">
                  Book a wash in minutes and enjoy that showroom shine without leaving your driveway. We make it fast, flawless, and fully mobile.
                </p>
                <div className="flex flex-col sm:flex-row">
                  <a
                    href="#services"
                    className="flex items-center justify-center gap-2 rounded-full border border-white/20 px-8 py-4 text-sm font-semibold text-white/90 transition hover:border-white/40 hover:text-white"
                  >
                    View Packages
                    <span className="text-lg">▸</span>
                  </a>
                </div>
                <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
                  {stats.map((stat) => (
                    <div key={stat.label} className="rounded-2xl border border-white/10 bg-white/5 px-5 py-4 backdrop-blur">
                      <p className="text-2xl font-semibold text-white">{stat.value}</p>
                      <p className="text-xs uppercase tracking-wider text-slate-300/70">{stat.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
            <Reveal delay={150}>
              <div className="relative">
                <div className="absolute -left-6 -top-6 h-24 w-24 rounded-full bg-primary-500/30 blur-2xl animate-pulseGlow" aria-hidden="true" />
                <div className="absolute -right-10 bottom-10 h-28 w-28 rounded-full bg-indigo-500/30 blur-2xl animate-pulseGlow" aria-hidden="true" />
                <div className="relative overflow-hidden rounded-[32px] border border-white/10 bg-gradient-to-br from-white/10 via-white/5 to-transparent p-8 shadow-[0_40px_80px_-40px_rgba(15,23,42,0.85)]">
                  <div className="rounded-3xl border border-white/10 bg-slate-900/60 p-6 text-center">
                    <p className="text-sm uppercase tracking-[0.3em] text-primary-200/80">Sniper Car Care</p>
                    <h3 className="mt-4 text-3xl font-semibold text-white">Shine delivered to your curb.</h3>
                    <p className="mt-3 text-sm text-slate-200/70">
                      Effortless booking, premium products, and detailers obsessed with perfection—all without leaving home. Tap below to explore our most requested packages.
                    </p>
                    <a
                      href="#services"
                      className="mt-6 inline-flex items-center justify-center rounded-full border border-white/15 px-6 py-3 text-sm font-semibold text-white transition hover:border-primary-400 hover:bg-primary-400 hover:text-slate-900"
                    >
                      Explore Services
                    </a>
                  </div>
                </div>
              </div>
            </Reveal>
          </section>
        </main>
      </div>

      <section id="services" className="relative z-10 mx-auto max-w-6xl px-6 pb-24">
        <Reveal>
          <div className="mb-14 text-center">
            <p className="text-sm uppercase tracking-[0.3em] text-primary-300/70">Mobile Detailing Packages</p>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">Engineered for shine. Built for convenience.</h2>
            <p className="mt-3 max-w-2xl mx-auto text-base text-slate-300/80">
              From quick refreshes to ceramic protection, our detailers bring studio-level results directly to your curb.
            </p>
          </div>
        </Reveal>
        <div className="grid gap-8 md:grid-cols-3">
          {packages.map((pkg, idx) => (
            <Reveal key={pkg.name} delay={idx * 120}>
              <div
                className={`glass-card relative flex h-full flex-col justify-between rounded-3xl p-8 transition duration-500 hover:-translate-y-2 hover:shadow-[0_50px_120px_-50px_rgba(56,189,248,0.4)] ${
                  pkg.featured ? 'border-primary-500/40 bg-gradient-to-br from-primary-500/20 via-indigo-500/10 to-transparent' : ''
                }`}
              >
                {pkg.featured && (
                  <span className="absolute right-6 top-6 rounded-full bg-primary-500/90 px-4 py-1 text-xs font-semibold uppercase tracking-wider text-white">
                    Most booked
                  </span>
                )}
                <div className="space-y-4">
                  <p className="text-sm uppercase tracking-[0.25em] text-primary-200/90">{pkg.accent}</p>
                  <h3 className="text-2xl font-semibold">{pkg.name}</h3>
                  <p className="text-4xl font-bold text-white">{pkg.price}</p>
                  <ul className="mt-6 space-y-3 text-sm text-slate-200/80">
                    {pkg.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-3">
                        <span className="mt-0.5 text-primary-300">✓</span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <a
                  href="tel:+12125550123"
                  className="mt-8 inline-flex items-center justify-center rounded-full border border-white/15 px-6 py-3 text-sm font-semibold text-white transition hover:border-primary-400 hover:bg-primary-400 hover:text-slate-900"
                >
                  Schedule Package
                </a>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section id="products" className="relative z-10 mx-auto max-w-6xl px-6 pb-28">
        <div className="relative mx-auto max-w-6xl px-6">
          <Reveal>
            <div className="text-center">
              <p className="text-sm uppercase tracking-[0.3em] text-primary-200/80">Detailing Essentials</p>
              <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">Bring the Sniper Car Care glow home.</h2>
              <p className="mt-3 max-w-2xl mx-auto text-base text-slate-300/80">
                Stock up on the premium products our pros trust between visits. Pick up curbside or have them packed with your next appointment.
              </p>
            </div>
          </Reveal>
          <div className="mt-16 grid gap-8 md:grid-cols-3">
            {products.map((product, index) => (
              <Reveal key={product.name} delay={index * 130}>
                <div className="glass-card relative flex h-full flex-col justify-between overflow-hidden rounded-3xl">
                  <div className="relative h-48 w-full overflow-hidden bg-slate-900/80">
                    {product.art({ className: 'h-full w-full scale-[1.02] object-cover transition duration-700 ease-out hover:scale-105' })}
                    <span className="absolute left-5 top-5 rounded-full bg-black/60 px-4 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-white">
                      {product.accent}
                    </span>
                  </div>
                  <div className="flex flex-1 flex-col justify-between p-7">
                    <div className="flex items-center justify-between text-xs uppercase tracking-[0.3em] text-primary-200/80">
                      <span>Sniper</span>
                      <span className="rounded-full bg-primary-500/20 px-3 py-1 text-[10px] font-semibold text-primary-200 shadow-inner">
                        {product.price}
                      </span>
                    </div>
                    <h3 className="mt-5 text-2xl font-semibold text-white">{product.name}</h3>
                    <p className="mt-3 text-sm text-slate-200/80">{product.description}</p>
                    <ul className="mt-6 space-y-3 text-sm text-slate-200/70">
                      {product.benefits.map((benefit) => (
                        <li key={benefit} className="flex items-start gap-3">
                          <span className="mt-0.5 text-primary-300">•</span>
                          <span>{benefit}</span>
                        </li>
                      ))}
                    </ul>
                    <a
                      href="tel:+12125550123"
                      className="mt-8 inline-flex items-center justify-center rounded-full border border-white/15 px-6 py-3 text-sm font-semibold text-white transition hover:border-primary-400 hover:bg-primary-400 hover:text-slate-900"
                    >
                      Add to Appointment
                    </a>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section id="reviews" className="relative z-10 bg-slate-900/30 py-24">
        <div className="relative mx-auto max-w-6xl px-6">
          <Reveal>
            <div className="text-center">
              <p className="text-sm uppercase tracking-[0.3em] text-primary-200/80">Loved By Locals</p>
              <h2 className="mt-4 text-3xl font-semibold sm:text-4xl">5-star mobile detailing. Every visit.</h2>
            </div>
          </Reveal>
          <div className="mt-16 grid gap-8 md:grid-cols-3">
            {testimonials.map((testimonial, index) => (
              <Reveal key={testimonial.name} delay={index * 140}>
                <div className="glass-card h-full rounded-3xl p-8">
                  <div className="mb-4 flex items-center gap-1 text-amber-300">
                    {'★★★★★'.slice(0, testimonial.rating)}
                  </div>
                  <p className="text-sm text-slate-200/80">“{testimonial.quote}”</p>
                  <div className="mt-6 text-sm font-semibold text-white">
                    {testimonial.name}
                    <span className="block text-xs font-normal uppercase tracking-[0.25em] text-slate-400/70">
                      {testimonial.location}
                    </span>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <footer className="relative z-10 border-t border-white/10 bg-slate-950/80 py-10">
        <div className="mx-auto flex max-w-6xl flex-col-reverse items-center justify-between gap-6 px-6 text-xs text-slate-400/70 md:flex-row">
          <p>© {new Date().getFullYear()} Sniper Car Care. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <a href="#services" className="hover:text-white transition">
              Services
            </a>
            <a href="#reviews" className="hover:text-white transition">
              Reviews
            </a>
            <a href="#products" className="hover:text-white transition">
              Products
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;

