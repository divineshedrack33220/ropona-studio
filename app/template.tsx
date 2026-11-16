/**
 * Remounts on every navigation, giving each route a subtle fade-in without
 * animating transform (which would break `position: fixed` children such as
 * the case-study progress rail). Reduced-motion is handled globally in CSS.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  return <div className="page-enter">{children}</div>;
}
