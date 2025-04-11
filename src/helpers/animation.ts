function slideInOut() {
  document.documentElement.animate(
    [
      {
        opacity: 1,
        transform: "translateY(0)",
      },
      {
        opacity: 0.2,
        transform: "translateY(-35%)",
      },
    ],
    {
      duration: 1500,
      easing: "cubic-bezier(0.87, 0, 0.13, 1)",
      fill: "forwards",
      pseudoElement: "::view-transition-old(root)",
    }
  );

  document.documentElement.animate(
    [
      {
        clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0% 100%)",
      },
      {
        clipPath: "polygon(0 100%, 100% 100%, 100% 0%, 0% 0%)",
      },
    ],
    {
      duration: 1500,
      easing: "cubic-bezier(0.87, 0, 0.13, 1)",
      fill: "forwards",
      pseudoElement: "::view-transition-new(root)",
    }
  );
}

function darkThemeTransition() {
  // Transition out the current page
  document.documentElement.animate(
    [
      {
        opacity: 1,
        transform: "scale(1)",
        filter: "brightness(1)",
      },
      {
        opacity: 0.1,
        transform: "scale(0.97)",
        filter: "brightness(0.5)",
      },
    ],
    {
      duration: 1200,
      easing: "cubic-bezier(0.65, 0, 0.35, 1)",
      fill: "forwards",
      pseudoElement: "::view-transition-old(root)",
    }
  );

  // Transition in the new page with a subtle reveal from bottom
  document.documentElement.animate(
    [
      {
        opacity: 0,
        transform: "translateY(20px)",
        clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)",
      },
      {
        opacity: 1,
        transform: "translateY(0)",
        clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
      },
    ],
    {
      duration: 1400,
      easing: "cubic-bezier(0.22, 1, 0.36, 1)", // Smooth out-expo easing
      fill: "forwards",
      delay: 100,
      pseudoElement: "::view-transition-new(root)",
    }
  );
}

// Alternative version with fade + glow effect
function darkGlowTransition() {
  // Current page fades out with slight shrink
  document.documentElement.animate(
    [
      {
        opacity: 1,
        filter: "brightness(1) blur(0px)",
      },
      {
        opacity: 0,
        filter: "brightness(1.5) blur(8px)",
      },
    ],
    {
      duration: 1000,
      easing: "cubic-bezier(0.4, 0, 0.2, 1)",
      fill: "forwards",
      pseudoElement: "::view-transition-old(root)",
    }
  );

  // New page reveals with subtle glow effect
  document.documentElement.animate(
    [
      {
        opacity: 0,
        transform: "scale(1.02)",
        filter: "brightness(1.2) blur(4px)",
      },
      {
        opacity: 1,
        transform: "scale(1)",
        filter: "brightness(1) blur(0px)",
      },
    ],
    {
      duration: 1200,
      easing: "cubic-bezier(0.16, 1, 0.3, 1)",
      fill: "forwards",
      delay: 200,
      pseudoElement: "::view-transition-new(root)",
    }
  );
}

// Dramatic slide reveal transition
function revealTransition() {
  document.documentElement.animate(
    [
      {
        opacity: 1,
      },
      {
        opacity: 0,
      },
    ],
    {
      duration: 800,
      easing: "cubic-bezier(0.4, 0, 0.2, 1)",
      fill: "forwards",
      pseudoElement: "::view-transition-old(root)",
    }
  );

  document.documentElement.animate(
    [
      {
        clipPath: "polygon(0 0, 0 0, 0 100%, 0 100%)",
      },
      {
        clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
      },
    ],
    {
      duration: 1200,
      easing: "cubic-bezier(0.83, 0, 0.17, 1)",
      fill: "forwards",
      delay: 300,
      pseudoElement: "::view-transition-new(root)",
    }
  );
}

const pageAnimation = () => {
  document.documentElement.animate(
    [
      {
        opacity: 1,
        scale: 1,
        transform: "translateY(0)",
      },
      {
        opacity: 0.5,
        scale: 0.9,
        transform: "translateY(-100px)",
      },
    ],
    {
      duration: 1000,
      easing: "cubic-bezier(0.76, 0, 0.24, 1)",
      fill: "forwards",
      pseudoElement: "::view-transition-old(root)",
    }
  );

  document.documentElement.animate(
    [
      {
        transform: "translateY(100%)",
      },
      {
        transform: "translateY(0)",
      },
    ],
    {
      duration: 1000,
      easing: "cubic-bezier(0.76, 0, 0.24, 1)",
      fill: "forwards",
      pseudoElement: "::view-transition-new(root)",
    }
  );
};

const pageAnimationTwo = () => {
  document.documentElement.animate(
    [
      {
        opacity: 1,
        scale: 1,
        clipPath: "inset(0% 0% 0% 0%)", // fully visible
      },
      {
        opacity: 0.5,
        scale: 0.95,
        clipPath: "inset(100% 0% 0% 0%)", // fully clipped from top
      },
    ],
    {
      duration: 1000,
      easing: "cubic-bezier(0.76, 0, 0.24, 1)",
      fill: "forwards",
      pseudoElement: "::view-transition-old(root)",
    }
  );

  document.documentElement.animate(
    [
      {
        clipPath: "inset(0% 0% 100% 0%)", // clipped from bottom
      },
      {
        clipPath: "inset(0% 0% 0% 0%)", // revealed
      },
    ],
    {
      duration: 1000,
      easing: "cubic-bezier(0.76, 0, 0.24, 1)",
      fill: "forwards",
      pseudoElement: "::view-transition-new(root)",
    }
  );
};

export {
  slideInOut,
  darkThemeTransition,
  darkGlowTransition,
  revealTransition,
  pageAnimation,
  pageAnimationTwo,
};
