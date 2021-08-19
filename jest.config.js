module.exports = {
  collectCoverage: true,
  clearMocks: true,
  coverageProvider: "v8",

  coverageThreshold: {
    global: {
      branches: 60,
      functions: 60,
      lines: 60,
      statements: 60,
    },
  },
  moduleFileExtensions: ["js", "json", "jsx", "ts", "d.ts", "tsx", "node"],
};
