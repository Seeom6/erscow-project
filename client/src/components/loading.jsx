import { Audio } from "react-loader-spinner";

const Loading = ({chatLoading}) => {
  return (
    <div className="w-[100%] h-screen flex flex-col justify-center items-center bg-[#161616c5] gap-[30px]">
      <Audio
        height="150"
        width="150"
        radius="9"
        color="#01426a"
        ariaLabel="loading"
        wrapperStyle
        wrapperClass
      />
      <div className="flex flex-col capitalize text-green-500">
        <h1>please do not leave this page...</h1>
        {
          chatLoading&&
        <p>live chat with our agent will start automatically</p>
        }
      </div>
    </div>
  );
};

export default Loading;
