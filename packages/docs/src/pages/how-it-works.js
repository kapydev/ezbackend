import React from "react";
import Layout from "@theme/Layout";
import TechStackImage from "../assets/tech-stack.svg";

function HowItWorks() {
  return (
    <Layout title="How It Works">
      <div id="tailwind">
        <div className="grid place-items-center my-16">
          <div className="text-2xl md:text-2xl font-mono mb-12 font-bold text-center">
            Under the Hood:
          </div>
          <div className="grid place-items-center">
            <TechStackImage className="lg:w-700px lg:h-400px" />
          </div>
          <br />
          <br />
        </div>
      </div>
    </Layout>
  );
}

export default HowItWorks;
