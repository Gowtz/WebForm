import { Menu } from "lucide-react";
import { useState } from "react";
import { cn } from "./lib/utils";
import { motion, AnimatePresence } from "motion/react";
import { Button } from "./components/ui/button";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchUser } from "@/action/fetchUser";
import { RootState } from "@/redux/store";

// Animation variants
const heading1Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const heading2Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, delay: 0.5 } },
};

const image = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 1.2 } },
};
export default function App() {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    //@ts-ignore
    dispatch(fetchUser()); // Fetch user details on app load
  }, [dispatch]);
  const [toggleMobile, setToggleMobile] = useState<boolean>(false);
  return (
    <>
      <header className="absolute top-0 left-0 h-24 w-full border bg-white z-50">
        <nav className="px-7 md:px-20 flex items-center justify-between w-full h-full ">
          <div className="logo text-2xl font-semibold lg:text-2xl w-full">
            <a href="/">Web Forms</a>
          </div>

          <ul className="hidden navlink md:flex items-center gap-7">
            <li>
              <a href="#">Docs</a>
            </li>
            {!isAuthenticated && (
              <>
                <li>
                  <a href="/auth?type=signin">Login</a>
                </li>
                <li>
                  <a href="/auth?type=signup">Signup</a>
                </li>
              </>
            )}
            {isAuthenticated && (
              <>
                <li>
                  <a href="/dashboard">Dashboard</a>
                </li>
              </>
            )}
          </ul>
          <AnimatePresence>
            {toggleMobile && (
              <motion.ul
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -50 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className={cn(
                  "absolute md:hidden top-24 w-full -mx-7 py-10 gap-7 px-10  flex flex-col  items-start  bg-slate-100 z-10",
                )}
              >
                <li>
                  <a href="#">Docs</a>
                </li>
                {!isAuthenticated && (
                  <>
                    <li>
                      <motion.a href="/auth?type=signin">Login</motion.a>
                    </li>
                    <li>
                      <motion.a href="/auth?type=signup">Signup</motion.a>
                    </li>
                  </>
                )}
                {isAuthenticated && (
                  <>
                    <li>
                      <motion.a href="/dashboard">Dashboard</motion.a>
                    </li>
                  </>
                )}
              </motion.ul>
            )}
          </AnimatePresence>

          <div className="mobile block md:hidden ">
            <Menu onClick={() => setToggleMobile((prev) => !prev)} />
          </div>
        </nav>
      </header>

      <div className="hero h-full min-h-screen w-full flex justify-evenly items-center container mx-auto ">
        <div className="text h-screen w-full flex flex-col items-start justify-center">
          <motion.h1
            className="text-3xl md:text-4xl font-bold mb-4 px-7"
            variants={heading1Variants}
            initial="hidden"
            animate="visible"
          >
            Effortless Form Handling: Submit, Send, Simplify!
          </motion.h1>
          <motion.h3
            className="text-lg  mb-4 px-7"
            variants={heading2Variants}
            initial="hidden"
            animate="visible"
          >
            Streamline your workflows with seamless form submissions. Instantly
            send emails and stay connected without the hassle.
          </motion.h3>
          <motion.div
            className="text-lg  mb-4 px-7 flex gap-5 items-start"
            variants={heading2Variants}
            initial="hidden"
            animate="visible"
          >
            <Button type="button">Get Started for Free</Button>
            <Button variant={"secondary"}>Know More</Button>
          </motion.div>
        </div>
        <div className="image hidden md:block">
          <motion.img
            src="/Home1.svg"
            alt="home"
            className="text-lg  mb-4 px-7"
            variants={image}
            initial="hidden"
            animate="visible"
          />
        </div>
      </div>
    </>
  );
}
