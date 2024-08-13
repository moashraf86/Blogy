import { useContext, useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { SignInModal } from "../shared/SignInModal";
import { User } from "../shared/User";
import { ModeToggle } from "../shared/ModeToggler";
import { LoadingSpinner } from "../ui/loading-spinner";
import { BackButton } from "../shared/BackButton";
import { Button, buttonVariants } from "../ui/button";
import { RiEditLine } from "@remixicon/react";
export default function Header() {
  const { currentUser, loading } = useContext(AuthContext);
  const [showModal, setShowModal] = useState(false);
  const headerRef = useRef(null);
  const [scrollDirection, setScrollDirection] = useState(null);
  const [lastScrollY, setLastScrollY] = useState(0);
  const { pathname } = useLocation();
  /**
   * Handle scroll event
   * - add sticky class to header on scroll up and remove on scroll down
   */
  const handleScroll = () => {
    const currentScrollY = window.scrollY;

    if (currentScrollY > lastScrollY) {
      setScrollDirection("down");
    } else {
      setScrollDirection("up");
    }

    setLastScrollY(currentScrollY);
  };

  useEffect(() => {
    // Add scroll event listener
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]);

  return (
    <>
      <header
        ref={headerRef}
        className={` sticky ${
          scrollDirection === "up" ? "top-0" : "-top-full"
        }  w-full transition-[top] duration-200 z-10 bg-background/60 backdrop-blur border-b border-border`}
      >
        <div className="container px-5 sm:px-8 flex justify-between items-center py-3 px-sm">
          <div className="flex items-center gap-3">
            {pathname !== "/" && <BackButton />}
            <Link
              to="/"
              className="text-2xl font-semibold text-zinc-50 flex items-center gap-3"
            >
              {/* <span className="bg-gradient-to-t from-zinc-950 to-zinc-700 text-zinc-50 text-primary w-10 h-10 rounded-full flex items-center justify-center">
                <RiEditLine size={18} className="fill-current" />
              </span> */}
              <h1 className="text-2xl font-normal text-zinc-950 dark:text-zinc-50 font-Monofett">
                Blogify
              </h1>
            </Link>
          </div>
          <nav>
            <ul className="flex gap-2 items-center">
              {pathname !== "/create" && currentUser && (
                <li>
                  <Link
                    className={
                      buttonVariants({ variant: "default", size: "lg" }) +
                      " " +
                      "hidden sm:flex gap-1"
                    }
                    to="/create"
                    aria-label="Write a post"
                  >
                    <RiEditLine size={18} className="fill-current" />
                    <span>Write</span>
                  </Link>
                  <Link
                    className={
                      buttonVariants({ variant: "ghost", size: "icon" }) +
                      " " +
                      "sm:hidden"
                    }
                    to="/create"
                    aria-label="Write a post"
                  >
                    <RiEditLine size={18} className="fill-current" />
                  </Link>
                </li>
              )}
              <li>
                <ModeToggle />
              </li>
              <li className="ml-2 sm:ml-0">{currentUser && <User />}</li>
              {!currentUser && (
                <li>
                  {loading ? (
                    <LoadingSpinner />
                  ) : (
                    <Button size="lg" onClick={() => setShowModal(true)}>
                      Sign In
                    </Button>
                  )}
                </li>
              )}
            </ul>
          </nav>
        </div>
      </header>
      <SignInModal showModal={showModal} onCancel={() => setShowModal(false)} />
    </>
  );
}
