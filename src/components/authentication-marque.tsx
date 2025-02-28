const tags = [
  "Marketing",
  "Events",
  "Settings",
  "Ticket management",
  "Revenue",
  "Withdrawals",
  "Teams",
  "Manage orders",
];

export default function AuthenticationMarque() {
  return (
    <div className="space-y-4">
      <div className="w-full flex-shrink-0 flex items-center overflow-hidden [mask-image:_linear-gradient(to_right,transparent_0,_black_128px,_black_calc(100%-200px),transparent_100%)]">
        <div className="whitespace-nowrap will-change-transform animate-marquee flex items-center justify-center gap-[18px]">
          {tags.map((t, i) => (
            <p className="text-[#72B354] xl:text-2xl transition-colors" key={i}>
              {t}
            </p>
          ))}
        </div>
        <div
          className="whitespace-nowrap will-change-transform animate-marquee flex items-center justify-center gap-[18px] pl-10"
          aria-hidden="true"
        >
          {tags.map((t, i) => (
            <p className="text-[#72B354] xl:text-2xl transition-colors" key={i}>
              {t}
            </p>
          ))}
        </div>
      </div>
      <div className="w-full flex-shrink-0 flex items-center overflow-hidden [mask-image:_linear-gradient(to_right,transparent_0,_black_128px,_black_calc(100%-200px),transparent_100%)]">
        <div className="whitespace-nowrap will-change-transform animate-marquee-fast flex items-center justify-center gap-[18px]">
          {tags.map((t, i) => (
            <p className="text-[#72B354] xl:text-2xl transition-colors" key={i}>
              {t}
            </p>
          ))}
        </div>
        <div
          className="whitespace-nowrap will-change-transform animate-marquee-fast flex items-center justify-center gap-[18px] pl-10"
          aria-hidden="true"
        >
          {tags.map((t, i) => (
            <p className="text-[#72B354] xl:text-2xl transition-colors" key={i}>
              {t}
            </p>
          ))}
        </div>
      </div>
      <div className="w-full flex-shrink-0 flex items-center overflow-hidden [mask-image:_linear-gradient(to_right,transparent_0,_black_128px,_black_calc(100%-200px),transparent_100%)]">
        <div className="whitespace-nowrap will-change-transform animate-marquee-slow flex items-center justify-center gap-[18px]">
          {tags.map((t, i) => (
            <p className="text-[#72B354] xl:text-2xl transition-colors" key={i}>
              {t}
            </p>
          ))}
        </div>
        <div
          className="whitespace-nowrap will-change-transform animate-marquee-slow flex items-center justify-center gap-[18px] pl-10"
          aria-hidden="true"
        >
          {tags.map((t, i) => (
            <p className="text-[#72B354] xl:text-2xl transition-colors" key={i}>
              {t}
            </p>
          ))}
        </div>
      </div>
      <div className="w-full flex-shrink-0 flex items-center overflow-hidden [mask-image:_linear-gradient(to_right,transparent_0,_black_128px,_black_calc(100%-200px),transparent_100%)]">
        <div className="whitespace-nowrap will-change-transform animate-marquee flex items-center justify-center gap-[18px]">
          {tags.map((t, i) => (
            <p className="text-[#72B354] xl:text-2xl transition-colors" key={i}>
              {t}
            </p>
          ))}
        </div>
        <div
          className="whitespace-nowrap will-change-transform animate-marquee flex items-center justify-center gap-[18px] pl-10"
          aria-hidden="true"
        >
          {tags.map((t, i) => (
            <p className="text-[#72B354] xl:text-2xl transition-colors" key={i}>
              {t}
            </p>
          ))}
        </div>
      </div>
      <div className="w-full flex-shrink-0 flex items-center overflow-hidden [mask-image:_linear-gradient(to_right,transparent_0,_black_128px,_black_calc(100%-200px),transparent_100%)]">
        <div className="whitespace-nowrap will-change-transform animate-marquee-fast flex items-center justify-center gap-[18px]">
          {tags.map((t, i) => (
            <p className="text-[#72B354] xl:text-2xl transition-colors" key={i}>
              {t}
            </p>
          ))}
        </div>
        <div
          className="whitespace-nowrap will-change-transform animate-marquee-fast flex items-center justify-center gap-[18px] pl-10"
          aria-hidden="true"
        >
          {tags.map((t, i) => (
            <p className="text-[#72B354] xl:text-2xl transition-colors" key={i}>
              {t}
            </p>
          ))}
        </div>
      </div>
      <div className="w-full flex-shrink-0 flex items-center overflow-hidden [mask-image:_linear-gradient(to_right,transparent_0,_black_128px,_black_calc(100%-200px),transparent_100%)]">
        <div className="whitespace-nowrap will-change-transform animate-marquee-slow flex items-center justify-center gap-[18px]">
          {tags.map((t, i) => (
            <p className="text-[#72B354] xl:text-2xl transition-colors" key={i}>
              {t}
            </p>
          ))}
        </div>
        <div
          className="whitespace-nowrap will-change-transform animate-marquee-slow flex items-center justify-center gap-[18px] pl-10"
          aria-hidden="true"
        >
          {tags.map((t, i) => (
            <p className="text-[#72B354] xl:text-2xl transition-colors" key={i}>
              {t}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}
