import React from 'react';

// Custom icon component that uses the webdesign icons
// Styles: 'gradient', 'black-color', 'black-outline', 'solid-black'
const CustomIcon = ({ name, style = 'gradient', className = '', size = 24, alt = '' }) => {
  const stylePaths = {
    'gradient': '/icons/gradient',
    'black-color': '/icons/black and color mix',
    'black-outline': '/icons/black outline',
    'solid-black': '/icons/solid black'
  };
  
  const basePath = stylePaths[style] || stylePaths['gradient'];
  
  return (
    <img 
      src={`${basePath}/${name}.png`}
      alt={alt || name}
      className={className}
      style={{ width: size, height: size, objectFit: 'contain' }}
    />
  );
};

// Pre-configured icon components for common use cases
export const IconSearch = ({ className, size = 24, style = 'gradient' }) => (
  <CustomIcon name="search" style={style} className={className} size={size} />
);

export const IconShield = ({ className, size = 24, style = 'gradient' }) => (
  <CustomIcon name="shield" style={style} className={className} size={size} />
);

export const IconRocket = ({ className, size = 24, style = 'gradient' }) => (
  <CustomIcon name="rocket" style={style} className={className} size={size} />
);

export const IconSpeed = ({ className, size = 24, style = 'gradient' }) => (
  <CustomIcon name="speed test" style={style} className={className} size={size} />
);

export const IconCode = ({ className, size = 24, style = 'gradient' }) => (
  <CustomIcon name="coding" style={style} className={className} size={size} />
);

export const IconCodeTag = ({ className, size = 24, style = 'gradient' }) => (
  <CustomIcon name="code tag" style={style} className={className} size={size} />
);

export const IconWebDev = ({ className, size = 24, style = 'gradient' }) => (
  <CustomIcon name="web development" style={style} className={className} size={size} />
);

export const IconWebProgramming = ({ className, size = 24, style = 'gradient' }) => (
  <CustomIcon name="web programming" style={style} className={className} size={size} />
);

export const IconIdea = ({ className, size = 24, style = 'gradient' }) => (
  <CustomIcon name="idea" style={style} className={className} size={size} />
);

export const IconMind = ({ className, size = 24, style = 'gradient' }) => (
  <CustomIcon name="mind" style={style} className={className} size={size} />
);

export const IconDatabase = ({ className, size = 24, style = 'gradient' }) => (
  <CustomIcon name="database" style={style} className={className} size={size} />
);

export const IconServer = ({ className, size = 24, style = 'gradient' }) => (
  <CustomIcon name="server" style={style} className={className} size={size} />
);

export const IconLock = ({ className, size = 24, style = 'gradient' }) => (
  <CustomIcon name="lock" style={style} className={className} size={size} />
);

export const IconUnlock = ({ className, size = 24, style = 'gradient' }) => (
  <CustomIcon name="unlock" style={style} className={className} size={size} />
);

export const IconChat = ({ className, size = 24, style = 'gradient' }) => (
  <CustomIcon name="chat" style={style} className={className} size={size} />
);

export const IconEmail = ({ className, size = 24, style = 'gradient' }) => (
  <CustomIcon name="email" style={style} className={className} size={size} />
);

export const IconUser = ({ className, size = 24, style = 'gradient' }) => (
  <CustomIcon name="user" style={style} className={className} size={size} />
);

export const IconVision = ({ className, size = 24, style = 'gradient' }) => (
  <CustomIcon name="vision" style={style} className={className} size={size} />
);

export const IconSetting = ({ className, size = 24, style = 'gradient' }) => (
  <CustomIcon name="setting" style={style} className={className} size={size} />
);

export const IconAlert = ({ className, size = 24, style = 'gradient' }) => (
  <CustomIcon name="alert" style={style} className={className} size={size} />
);

export const IconFirewall = ({ className, size = 24, style = 'gradient' }) => (
  <CustomIcon name="firewall" style={style} className={className} size={size} />
);

export const IconCPU = ({ className, size = 24, style = 'gradient' }) => (
  <CustomIcon name="cpu" style={style} className={className} size={size} />
);

export const IconPuzzle = ({ className, size = 24, style = 'gradient' }) => (
  <CustomIcon name="puzzle" style={style} className={className} size={size} />
);

export const IconEyedropper = ({ className, size = 24, style = 'gradient' }) => (
  <CustomIcon name="eyedropper" style={style} className={className} size={size} />
);

export const IconImage = ({ className, size = 24, style = 'gradient' }) => (
  <CustomIcon name="image" style={style} className={className} size={size} />
);

export const IconFile = ({ className, size = 24, style = 'gradient' }) => (
  <CustomIcon name="file" style={style} className={className} size={size} />
);

export const IconFolder = ({ className, size = 24, style = 'gradient' }) => (
  <CustomIcon name="folder" style={style} className={className} size={size} />
);

export const IconRouter = ({ className, size = 24, style = 'gradient' }) => (
  <CustomIcon name="router" style={style} className={className} size={size} />
);

export const IconCyberAttack = ({ className, size = 24, style = 'gradient' }) => (
  <CustomIcon name="cyber attack" style={style} className={className} size={size} />
);

export const IconBinaryCode = ({ className, size = 24, style = 'gradient' }) => (
  <CustomIcon name="binary code" style={style} className={className} size={size} />
);

export const IconClientServer = ({ className, size = 24, style = 'gradient' }) => (
  <CustomIcon name="client server" style={style} className={className} size={size} />
);

export const IconCodingStructure = ({ className, size = 24, style = 'gradient' }) => (
  <CustomIcon name="coding structure" style={style} className={className} size={size} />
);

export const IconLayerCode = ({ className, size = 24, style = 'gradient' }) => (
  <CustomIcon name="layer code" style={style} className={className} size={size} />
);

export const IconShareCode = ({ className, size = 24, style = 'gradient' }) => (
  <CustomIcon name="share code" style={style} className={className} size={size} />
);

export const IconEditCode = ({ className, size = 24, style = 'gradient' }) => (
  <CustomIcon name="edit code" style={style} className={className} size={size} />
);

export const IconCodingBook = ({ className, size = 24, style = 'gradient' }) => (
  <CustomIcon name="coding book" style={style} className={className} size={size} />
);

export const IconInternetBug = ({ className, size = 24, style = 'gradient' }) => (
  <CustomIcon name="internet bug" style={style} className={className} size={size} />
);

export const IconIPAddress = ({ className, size = 24, style = 'gradient' }) => (
  <CustomIcon name="ip address" style={style} className={className} size={size} />
);

export default CustomIcon;
