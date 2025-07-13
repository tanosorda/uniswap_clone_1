// Отключаем типы для same-runtime
declare module "same-runtime/dist/jsx-runtime" {
  export const jsx: any;
  export const jsxs: any;
}
