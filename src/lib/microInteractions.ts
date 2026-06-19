/**
 * Micro-interactions and animation utilities
 * Provides gold shimmer effects, haptic-style feedback, and smooth transitions
 */

export const microInteractions = {
  // Gold shimmer effect CSS
  goldShimmer: `
    @keyframes goldShimmer {
      0% {
        background-position: -1000px 0;
      }
      100% {
        background-position: 1000px 0;
      }
    }

    .shimmer-gold {
      background: linear-gradient(
        90deg,
        transparent,
        rgba(212, 175, 55, 0.3),
        transparent
      );
      background-size: 1000px 100%;
      animation: goldShimmer 2s infinite;
    }

    .shimmer-gold-hover:hover {
      background: linear-gradient(
        90deg,
        transparent,
        rgba(212, 175, 55, 0.5),
        transparent
      );
      background-size: 1000px 100%;
      animation: goldShimmer 1.5s infinite;
    }
  `,

  // Pulse effect
  pulse: `
    @keyframes pulse {
      0%, 100% {
        opacity: 1;
      }
      50% {
        opacity: 0.5;
      }
    }

    .pulse {
      animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
    }
  `,

  // Float effect
  float: `
    @keyframes float {
      0%, 100% {
        transform: translateY(0px);
      }
      50% {
        transform: translateY(-10px);
      }
    }

    .float {
      animation: float 3s ease-in-out infinite;
    }
  `,

  // Glow effect
  glow: `
    @keyframes glow {
      0%, 100% {
        box-shadow: 0 0 5px rgba(212, 175, 55, 0.5);
      }
      50% {
        box-shadow: 0 0 20px rgba(212, 175, 55, 0.8);
      }
    }

    .glow {
      animation: glow 2s ease-in-out infinite;
    }
  `,
};

// Haptic feedback simulator (visual feedback)
export const hapticFeedback = {
  // Bounce effect on click
  bounce: `
    @keyframes bounce {
      0%, 100% {
        transform: scale(1);
      }
      50% {
        transform: scale(0.95);
      }
    }

    .haptic-bounce:active {
      animation: bounce 0.3s ease-in-out;
    }
  `,

  // Ripple effect
  ripple: `
    @keyframes ripple {
      0% {
        transform: scale(0);
        opacity: 1;
      }
      100% {
        transform: scale(4);
        opacity: 0;
      }
    }

    .ripple-effect::after {
      content: '';
      position: absolute;
      top: 50%;
      left: 50%;
      width: 10px;
      height: 10px;
      background: rgba(212, 175, 55, 0.5);
      border-radius: 50%;
      transform: translate(-50%, -50%);
      animation: ripple 0.6s ease-out;
      pointer-events: none;
    }
  `,
};

// Shared element transition helper
export const sharedElementTransition = {
  // Setup transitionName for layout animations
  getTransitionName: (elementId: string) => `transition-${elementId}`,

  // CSS for smooth shared element transitions
  css: `
    @supports (view-transition-name: none) {
      .shared-element {
        view-transition-name: var(--shared-transition-name);
      }

      ::view-transition-old(root),
      ::view-transition-new(root) {
        animation: none;
        mix-blend-mode: normal;
      }

      ::view-transition-old(root) {
        z-index: 1;
      }

      ::view-transition-new(root) {
        z-index: 0;
      }
    }
  `,
};

// Utility to trigger shared element transitions
export const triggerSharedElementTransition = (callback: () => void) => {
  if (document.startViewTransition) {
    document.startViewTransition(callback);
  } else {
    callback();
  }
};
