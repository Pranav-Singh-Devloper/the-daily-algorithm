import { useEffect, Component } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Lenis from "lenis";
import "@/App.css";
import Home from "@/pages/Home";
import CaseStudy from "@/pages/CaseStudy";
import PenCursor from "@/components/PenCursor";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { err: false };
  }
  static getDerivedStateFromError() {
    return { err: true };
  }
  render() {
    return this.state.err ? (
      <div style={{ padding: 48, fontFamily: "Georgia, serif" }}>
        This edition failed to print. Please refresh the page.
      </div>
    ) : (
      this.props.children
    );
  }
}

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    if (window.__lenis) window.__lenis.scrollTo(0, { immediate: true });
    else window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function App() {
  useEffect(() => {
    const lenis = new Lenis({ lerp: 0.09, smoothWheel: true });
    window.__lenis = lenis;
    let raf;
    const loop = (t) => {
      lenis.raf(t);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
      window.__lenis = null;
    };
  }, []);

  return (
    <ErrorBoundary>
      <BrowserRouter>
        <ScrollToTop />
        <PenCursor />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projects/:slug" element={<CaseStudy />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </ErrorBoundary>
  );
}

export default App;
