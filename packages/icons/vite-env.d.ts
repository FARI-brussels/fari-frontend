declare module '*.svg?raw' {
  const value: string;
  export = value; // Use CommonJS-style export to force inlining
}

// declare module '*.svg' {
// 	const content: any
// 	export { content }
// }
