import { useLayoutEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useLayoutEffect(() => {
    window.scrollTo(0, 0);

    // window.document.documentElement.scrollTop = 0;
    // window.document.getElementById('wrapper')?.scrollTo(0, 0);
    // window.document.getElementById('wrapper')?.scrollIntoView();
  }, [pathname]);
  return null;
};

export default ScrollToTop;
