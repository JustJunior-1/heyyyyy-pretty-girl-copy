import { useState, useEffect } from "react";
import { useWindowSize } from "react-use";
import Confetti from "react-confetti";
import { motion } from "framer-motion";
import { LogSnag } from "@logsnag/node";


const logsnag = new LogSnag({
  token: "214253659a6e4a40420bd75172591356",
  project: "kwamebio"
});

const track = async () => {
  await logsnag.track({
    channel: "track_vals",
  event: "she said yes",
  user_id: "yes",
    description: "Queenster",
    icon: "💰",
    notify: true,
    tags: {
      shipping: "",
      quantity: ""
    }
  });
};
const trackNo = async () => {
  await logsnag.track({
    channel: "track_no",
    event: "she_said_no",
    user_id: "kwameduah",
    description: "sheBounced",
    icon: "💰",
    notify: true,
    tags: {
      shipping: "",
      quantity: ""
    }
  });
function App() {
  const steps = [
    {
      content: "Heyyyyy, pretty girl.",
      image: "/character/one.png",
    },
    {
      content: `I have been with you for nearly 3 years.
      And you've been on my mind ever since.
      `,
      image: "/character/two.png",
    },
    {
      content: `When we went on our first date, I realized...yhup, I want this girl. For life.
      `,
      image: "/character/three.png",
    },
    {
      content: `You're beautiful, you're smart, you're fun,
and you make spending time together feel too short.`,
      image: "/character/four.png",
    },
    {
      content: `I always look forward to seeing you,
holding your hands and those playful little fights where you prove your strength - though i cant say i enjoy the ass smacks`,
      image: "/character/five.png",
    },
    {
      content: "So now I've got a question for you…",
      image: "/character/six.png",
    },
    {
      content: "After THREEEEEEE amazing years i still get excited just thinking about you. So I have a question for! will you be my Valentine? ❤️ and maybe a movie night on friday?",
      image: "/character/seven.png",
    },
  ];
  const [currentStep, setCurrentStep] = useState(0);
  const [sheWantsToBeMyValentine, setSheWantsToBeMyValentine] = useState(false);
  const [sheSaidNo, setSheSaidNo] = useState(false);
  const { width, height } = useWindowSize();

  useEffect(() => {
    const imagePaths = [
      ...steps.map((step) => step.image),
      "/character/yayyyy.png",
    ];

    imagePaths.forEach((path) => {
      const img = new Image();
      img.src = path;
    });
  }, []);

  return (
    <>
      {sheWantsToBeMyValentine && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Confetti width={width} height={height} />
          <div className="fixed top-0 left-0 w-full h-full bg-[#FFC5D3] flex flex-col items-center justify-center">
            <motion.h1
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, type: "spring" }}
              className="text-white text-4xl font-bold"
            >
              Yayyyyyyy!!!!!
            </motion.h1>
            <img
              src="/character/yayyyy.png"
              alt=""
              className="w-40 animate-bounce"
            />
          </div>
        </motion.div>
      )}
      {sheSaidNo && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {/* <Confetti width={width} height={height} /> */}
          <div className="fixed top-0 left-0 w-full h-full bg-[#FFC5D3] flex flex-col items-center justify-center">
            <motion.h1
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, type: "spring" }}
              className="text-white text-4xl font-bold"
            >
              Nooooooooooooooooo!!!!!
            </motion.h1>
            <img
              src="/character/nooo.png"
              alt=""
              // className="w-40 animate-bounce"
            />
          </div>
        </motion.div>
      )}
      <div className="bg-[#FFC5D3] min-h-screen text-white p-5 flex flex-col items-center justify-center max-w-md mx-auto">
        <motion.img
          key={currentStep}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          src={steps[currentStep].image}
          alt=""
          className="w-40"
        />
        <motion.div
          key={currentStep + "-text"}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="font-josefin text-4xl font-bold"
        >
          {steps[currentStep].content}
        </motion.div>

        {currentStep < 6 && (
          <>
            <button
              onClick={() => setCurrentStep(currentStep + 1)}
              className="bg-white text-[#FFC5D3] py-3 text-xl rounded-xl w-full mt-10 font-semibold"
            >
              Next
            </button>
            {currentStep > 0 && (
              <button
                onClick={() => setCurrentStep(currentStep - 1)}
                className="bg-white text-[#FFC5D3] py-3 text-xl rounded-xl w-full mt-2 font-semibold opacity-90"
              >
                Back
              </button>
            )}
          </>
        )}
        {currentStep === 6 && (
          <>
            <button
              onClick={async () => {
                setSheWantsToBeMyValentine(true);
                await track();
              }}
              className="bg-white text-[#FFC5D3] py-3 text-xl rounded-xl w-full mt-10 font-semibold"
            >
              Yes
            </button>

            <button
              onClick={async () => {
                setSheSaidNo(true);
                await track();
              }}
              className="bg-white text-[#FFC5D3] py-3 text-xl rounded-xl w-full mt-2 font-semibold"
            >
              No
            </button>
          </>
        )}
      </div>
    </>
  );
}

export default App;
