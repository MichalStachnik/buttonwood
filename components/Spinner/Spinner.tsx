const Loader = () => {
  return (
    <div className="spinner">
      <span></span>
      <span></span>
      <span></span>
      <style jsx>{`
        .spinner {
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .spinner span {
          display: inline-block;
          height: 3px;
          width: 0;
          border-radius: 50%;
          border: 2px solid rgb(230, 100, 101);
          animation: spinning 0.6s linear infinite;
          transform-origin: center;
        }

        .spinner span:nth-child(2) {
          animation-delay: 0.05s;
          margin: 0 10px;
        }

        .spinner span:nth-child(3) {
          animation-delay: 0.1s;
        }

        @keyframes spinning {
          0% {
            transform: rotate(0deg) translateY(0px);
          }
          25% {
            transform: rotate(90deg) translateY(2px);
          }
          50% {
            transform: rotate(180deg) translateY(4px);
          }
          75% {
            transform: rotate(270deg) translateY(2px);
          }
          100% {
            transform: rotate(360deg) translateY(0px);
          }
        }
      `}</style>
    </div>
  );
};

export default Loader;
