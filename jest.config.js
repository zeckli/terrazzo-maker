module.exports = {
  moduleFileExtensions: ['js', 'json', 'ts'],
  testRegex: '(/__tests__/.*|(\\.|/)(test))\\.(ts|js)?$',
  transform: {
    '^.+\\.(ts)$': 'ts-jest'
  },
  coverageDirectory: './coverage/',
  collectCoverage: true
}
