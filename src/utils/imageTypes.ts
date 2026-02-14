export type ImageType = "vertical" | "horizontal" | "square";

export function getImageType(width: number, height: number): ImageType {
  const ratio = height / width;

  if (ratio > 1.2) {
    return "vertical";
  } else if (ratio < 0.8) {
    return "horizontal";
  } else {
    return "square";
  }
}

export function getImageStyle(type: ImageType): React.CSSProperties {
  switch (type) {
    case "vertical":
      return {
        width: "auto",
        height: "100%",
        maxWidth: "100%",
        objectFit: "contain",
      };
    case "horizontal":
      return {
        width: "100%",
        height: "auto",
        maxHeight: "100%",
        objectFit: "contain",
      };
    case "square":
    default:
      return {
        width: "100%",
        height: "100%",
        objectFit: "contain",
      };
  }
}
