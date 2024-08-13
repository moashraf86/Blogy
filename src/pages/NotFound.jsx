import { RiArrowLeftSLine } from "@remixicon/react";
import { Link } from "react-router-dom";
import { Button } from "../components/ui/button";

export const NotFound = () => {
  return (
    <div className="container text-center h-svh flex flex-col justify-center bg-background">
      <div className="flex self-stretch justify-center items-center mb-8">
        <h1 className="text-3xl sm:text-4xl font-medium border-r border-border pr-4">
          404
        </h1>
        <p className="text-3xl sm:text-4xl font-light leading-tight pl-4">
          Page not found.
        </p>
      </div>
      <Button asChild variant="outline" className="self-center">
        <Link to="/">
          <RiArrowLeftSLine className="mr-2" />
          Back to Home
        </Link>
      </Button>
    </div>
  );
};
