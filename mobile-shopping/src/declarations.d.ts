// Khai báo để TS hiểu file .scss và ảnh
declare module "*.module.scss" {
  const styles: { [className: string]: string };
  export default styles;
}

declare module "*.scss" {
  const content: string;
  export default content;
}

declare module "*.css" {
  const content: string;
  export default content;
}

declare module "*.png" {
  const src: string;
  export default src;
}

declare module "*.webp" {
  const src: string;
  export default src;
}
