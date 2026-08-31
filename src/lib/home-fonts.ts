// Open Sauce One — used ONLY by the redesigned homepage sections
// (src/components/home/**) and the retokenized SiteExamplesPreviewSection.
// Intentionally NOT imported from the root layout: importing it here keeps
// it in the homepage's own client chunk instead of loading on every route,
// and keeps Navbar/HeroSection/TestimonialsSection/Footer on their current
// fonts until they get their own redesign pass.
import "@fontsource/open-sauce-one/400.css";
import "@fontsource/open-sauce-one/500.css";
import "@fontsource/open-sauce-one/600.css";
import "@fontsource/open-sauce-one/700.css";
