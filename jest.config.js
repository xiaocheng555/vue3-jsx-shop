const path = require('path')

module.exports = {
  rootDir: path.resolve(__dirname),
  clearMocks: true,
  coverageDirectory: 'coverage',
  coverageProvider: 'v8',
  moduleFileExtensions: ['vue', 'js', 'json', 'jsx', 'ts', 'tsx', 'node'],
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  // 测试文件
  testMatch: [  //  匹配单元测试规则
    "**/?(*.)+(spec).[jt]s?(x)"
  ],

  transform: {
    // '^.+\\.vue$': 'vue-jest',
    '^.+\\js$': 'babel-jest',
    "^.+\\.(t|j)sx?$": "ts-jest"
  }
}
