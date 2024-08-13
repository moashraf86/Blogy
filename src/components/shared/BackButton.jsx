import { RiArrowLeftSLine } from "@remixicon/react";

import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";

export const BackButton = () => {
  const navigate = useNavigate();
  /**
   * Handle Navigation
   * - Navigate to the previous page
   * - Scroll to the top of the page
   */
  const handleNavigation = () => {
    // NAVIGATE TO THE PREVIOUS PAGE
    navigate(-1);
    // SCROLL TO THE TOP OF THE PAGE
    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 10);
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      title="Go back"
      onClick={handleNavigation}
    >
      <RiArrowLeftSLine className="inline-block" />
    </Button>
  );
};
