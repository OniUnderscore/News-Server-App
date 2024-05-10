import Lottie from "lottie-react";
import Animation from "./images/Animation - 1715350378279.json";

export function ErrorPage() {
  return (
    <section>
      <h2>404: Page Not Found</h2>
      <Lottie animationData={Animation} loop={true} />
    </section>
  );
}
