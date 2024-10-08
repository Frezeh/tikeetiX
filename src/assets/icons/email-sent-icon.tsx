function EmailSentIcon({ ...props }) {
  return (
    <svg width={104} height={104} viewBox="0 0 104 104" fill="none" {...props}>
      <circle
        opacity={0.1}
        cx={51.8069}
        cy={51.8573}
        r={51.4286}
        fill="#9DF316"
      />
      <circle opacity={0.5} cx={51.8069} cy={52} r={39} fill="#9DF316" />
      <circle cx={51.9497} cy={51.1427} r={32.8571} fill="#133205" />
      <path
        d="M57.628 37.875l-12.981 4.312c-8.726 2.918-8.726 7.677 0 10.58l3.852 1.28 1.28 3.852c2.904 8.726 7.676 8.726 10.58 0l4.327-12.966c1.926-5.822-1.237-8.999-7.058-7.058zm.46 7.733L52.625 51.1a1.066 1.066 0 01-.762.316c-.273 0-.546-.1-.762-.316a1.084 1.084 0 010-1.524l5.463-5.491a1.085 1.085 0 011.524 0 1.085 1.085 0 010 1.523z"
        fill="#fff"
      />
    </svg>
  );
}

export default EmailSentIcon;
