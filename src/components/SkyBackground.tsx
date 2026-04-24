const SkyBackground = ({ hearts = true, swans = true, clouds = true }: { hearts?: boolean; swans?: boolean; clouds?: boolean }) => (
  <div className="bg-decor" aria-hidden="true">
    {clouds && (
      <>
        <div className="cloud cloud-1" />
        <div className="cloud cloud-2" />
        <div className="cloud cloud-3" />
        <div className="cloud cloud-4" />
      </>
    )}
    {swans && (
      <>
        <Swan className="swan swan-1" />
        <Swan className="swan swan-2" />
      </>
    )}
    {hearts && (
      <>
        {[1,2,3,4,5,6,7,8].map((i) => (
          <span key={i} className={`heart heart-${i} ${i % 2 === 0 ? 'gold' : ''}`}>♥</span>
        ))}
      </>
    )}
  </div>
);

const Swan = ({ className }: { className: string }) => (
  <svg className={className} width="60" height="40" viewBox="0 0 60 40" fill="none">
    <path d="M10 30 Q 15 10, 30 14 Q 45 18, 50 30 Z" fill="#fff" />
    <circle cx="44" cy="14" r="3" fill="#fff" />
    <path d="M46 12 L 52 10" stroke="#D4AF37" strokeWidth="1.5" strokeLinecap="round" />
    <g className="swan-wing" style={{ transformOrigin: '30px 22px' }}>
      <path d="M22 22 Q 30 14, 38 22 Q 30 24, 22 22 Z" fill="#F5F5F5" />
    </g>
  </svg>
);

export default SkyBackground;
