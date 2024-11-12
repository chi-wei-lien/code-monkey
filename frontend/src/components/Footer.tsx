const Footer = () => {
  return (
    <div className="flex items-center justify-center bg-red-400 h-60">
      <div>
        <div className="flex items-center justify-center">
          <span className="text-sm text-white">Made by&nbsp;</span>
          <span className="text-2xl text-white font-monofett">
            <a href="https://www.chiweilien.com/" target="_blank">
              Willy Lien
            </a>
          </span>
        </div>
        <div className="flex items-center justify-center">
          <span className="text-sm text-white">
            <a
              href="https://www.freeprivacypolicy.com/live/cf02c831-a6b3-46ea-abbc-c38d77db3f76
"
              target="_blank"
            >
              Privacy Policy
            </a>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Footer;
