import React from "react";

const SocialMediaShare = () => {
  const shareUrl = "https://brasiliapp.com.br"; //

  return (
    <div className="">
      <p className="my-3">Compartilhe nas suas redes sociais</p>
      {/* Facebook Share Link */}
      <a
        href={`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`}
        target="_blank"
        rel="noopener"
        className="text-blue-600 hover:text-blue-800 mr-4"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          className="h-5 w-5 inline-block mr-2"
        >
          <path
            fill="currentColor"
            d="M22.675 0H1.325C.593 0 0 .593 0 1.325v21.351C0 23.407.593 24 1.325 24H12.82v-9.294H9.692v-3.622h3.128V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116c.73 0 1.323-.593 1.323-1.325V1.325C24 .593 23.407 0 22.675 0z"
          ></path>
        </svg>
        Facebook
      </a>

      {/* Twitter Share Link */}
      <a
        href={`https://twitter.com/intent/tweet?url=${shareUrl}&text=Confira os gastos dos políticos no: `}
        target="_blank"
        rel="noopener"
        className="text-blue-400 hover:text-blue-600 mr-4"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          className="h-5 w-5 inline-block mr-2"
        >
          <path
            fill="currentColor"
            d="M24 4.557a9.83 9.83 0 01-2.828.775 4.932 4.932 0 002.165-2.724 9.864 9.864 0 01-3.127 1.195 4.916 4.916 0 00-3.594-1.555c-3.179 0-5.515 2.966-4.797 6.045A13.978 13.978 0 011.671 3.149a4.93 4.93 0 001.523 6.574 4.903 4.903 0 01-2.229-.616c-.054 2.281 1.581 4.415 3.949 4.89a4.935 4.935 0 01-2.224.084 4.928 4.928 0 004.6 3.419A9.9 9.9 0 010 19.54a13.94 13.94 0 007.548 2.212c9.142 0 14.307-7.721 13.995-14.646A10.025 10.025 0 0024 4.557z"
          ></path>
        </svg>
        Twitter
      </a>

      {/* Instagram Share Link */}
      <a
        href="https://www.instagram.com/"
        target="_blank"
        rel="noopener"
        className="text-pink-600 hover:text-pink-800 mr-4 "
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          className="h-5 w-5 inline-block mr-2"
        >
          <path
            fill="currentColor"
            d="M15.233 5.488c-.843-.038-1.097-.046-3.233-.046s-2.389.008-3.232.046c-2.17.099-3.181 1.127-3.279 3.279-.039.844-.048 1.097-.048 3.233s.009 2.389.047 3.233c.099 2.148 1.106 3.18 3.279 3.279.843.038 1.097.047 3.233.047 2.137 0 2.39-.008 3.233-.046 2.17-.099 3.18-1.129 3.279-3.279.038-.844.046-1.097.046-3.233s-.008-2.389-.046-3.232c-.099-2.153-1.111-3.182-3.279-3.281zM12 16.108a4.108 4.108 0 110-8.215 4.108 4.108 0 010 8.215zm4.271-7.418a.96.96 0 110-1.92.96.96 0 010 1.92zM14.667 12a2.667 2.667 0 11-5.334 0 2.667 2.667 0 015.334 0zM19 0H5a5 5 0 00-5 5v14a5 5 0 005 5h14a5 5 0 005-5V5a5 5 0 00-5-5zm.952 15.298c-.132 2.909-1.751 4.521-4.653 4.654-.854.039-1.126.048-3.299.048s-2.444-.009-3.298-.048c-2.908-.133-4.52-1.748-4.654-4.654C4.009 14.445 4 14.173 4 12c0-2.172.009-2.445.048-3.298.134-2.908 1.748-4.521 4.654-4.653C9.556 4.009 9.827 4 12 4s2.445.009 3.299.048c2.908.133 4.523 1.751 4.653 4.653.039.854.048 1.127.048 3.299 0 2.173-.009 2.445-.048 3.298z"
          ></path>
        </svg>
        Instagram
      </a>

      {/* LinkedIn Share Link */}
      <a
        href={`https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`}
        target="_blank"
        rel="noopener"
        className="text-blue-700 hover:text-blue-900 mr-4"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          className="h-5 w-5 inline-block mr-2"
        >
          <path
            fill="currentColor"
            d="M19 0H5a5 5 0 00-5 5v14a5 5 0 005 5h14a5 5 0 005-5V5a5 5 0 00-5-5zM8 19H5V8h3v11zM6.5 6.732c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zM20 19h-3v-5.604c0-3.368-4-3.113-4 0V19h-3V8h3v1.765c1.396-2.586 7-2.777 7 2.476V19z"
          ></path>
        </svg>
        LinkedIn
      </a>
    </div>
  );
};

export default SocialMediaShare;
