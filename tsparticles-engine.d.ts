declare module 'tsparticles-engine' {
    export interface Container {
      pause: () => void;
      play: () => void;
      drawers?: any;
      smooth?: any;
      getAnimationStatus?: any;
      setNoise?: any;
      setPath?: any;
    }
  }
  