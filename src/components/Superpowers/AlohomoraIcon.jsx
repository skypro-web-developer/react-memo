import styles from "./Superpowers.module.css";

export function Alohomora({ isAvailable, onClick }) {
  return isAvailable ? (
    <div className={styles.icon} onClick={onClick}>
      <svg
        className={styles.circle}
        width="68"
        height="68"
        viewBox="0 0 68 68"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect width="68" height="68" rx="34" fill="#C2F5FF" />
      </svg>
      <svg
        className={styles.cards}
        width="47"
        height="51"
        viewBox="0 0 47 51"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect
          x="22.7295"
          y="1"
          width="24.9566"
          height="34.761"
          rx="2"
          transform="rotate(15 22.7295 1)"
          fill="url(#paint0_linear_3_5589)"
          stroke="#E4E4E4"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M29.5302 25.4852C29.4143 25.3327 29.2972 25.1797 29.1797 25.0262C27.5408 22.8843 25.8288 20.6471 26.3027 18.6581C26.8981 16.6731 28.4389 16.3711 29.6234 16.6885C30.3167 16.8742 31.0048 17.4818 31.4186 18.3021C32.1243 17.7818 32.9569 17.5817 33.6502 17.7675C34.8346 18.0849 36.1365 19.1485 35.6596 21.1653C35.0534 23.1989 32.3849 24.3165 29.8199 25.3908C29.7345 25.4265 29.6492 25.4622 29.5641 25.4979C29.558 25.5006 29.552 25.5032 29.5459 25.5058C29.5458 25.5057 29.5458 25.5057 29.5458 25.5056C29.5457 25.5057 29.5456 25.5057 29.5455 25.5057C29.5404 25.4989 29.5352 25.492 29.5302 25.4852Z"
          fill="#FF4545"
        />
        <rect
          x="0.806641"
          y="16.6251"
          width="24.9566"
          height="34.761"
          rx="2"
          transform="rotate(-15 0.806641 16.6251)"
          fill="white"
          stroke="#E4E4E4"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M16.1215 27.4952C15.353 26.9918 14.4534 26.8097 13.7601 26.9955C12.5757 27.3129 11.3923 28.3448 11.8692 30.3615C12.4533 32.321 15.0545 33.4026 17.5447 34.438C17.7244 34.5127 17.9035 34.5872 18.0812 34.6617C18.0879 34.6646 18.0945 34.6675 18.1012 34.6703C18.1013 34.6702 18.1013 34.6702 18.1013 34.6701C18.1014 34.6702 18.1015 34.6702 18.1016 34.6703C18.1076 34.6624 18.1135 34.6545 18.1193 34.6466C18.1732 34.5756 18.2272 34.5046 18.2813 34.4335C19.9656 32.2207 21.7177 29.9186 21.2259 27.8543C20.6306 25.8693 18.9713 25.5991 17.7868 25.9164C17.0935 26.1022 16.4725 26.6918 16.1215 27.4952Z"
          fill="#FF4545"
        />
        <defs>
          <linearGradient
            id="paint0_linear_3_5589"
            x1="32.9795"
            y1="9.02177"
            x2="23.1751"
            y2="17.0435"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="white" />
            <stop offset="1" stopColor="#F0F0F0" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  ) : (
    ""
  );
}
