import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NotFound from "../pages/error/NotFound.jsx";
import Authentication from "../pages/authentication/index.jsx";
import Dashboard from "../pages/dashboard/index.jsx";
import { useSideMenuRouter } from "./SideMenuRouter.jsx";
import { useEffect, useState } from "react";
export default function MainRoute() {
  const sideMenuRouter = useSideMenuRouter();
  // console.log("sideMenuRouter", sideMenuRouter);

  const [showNotFound, setShowNotFound] = useState(false);
  useEffect(() => {
    if (!sideMenuRouter.length) setShowNotFound(true);
  }, [sideMenuRouter]);

  return (
    <>
      <Router>
        <Routes>
          <Route path="/authentication" element={<Authentication />} />
          <Route path="/dashboard" element={<Dashboard />}>
            {[...sideMenuRouter]}
            {/* <Route path="iliass" element={<h1>iliass</h1>} /> */}
          </Route>
          <Route path="/" element={<Authentication />} />
          <Route path="/not-found" element={showNotFound && <NotFound />} />
          <Route path="*" element={showNotFound && <NotFound />} />
        </Routes>
      </Router>
    </>
  );
}
