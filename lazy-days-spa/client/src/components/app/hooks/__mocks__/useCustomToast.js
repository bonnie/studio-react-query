const mockToast = jest.fn();

module.exports = {
  ...jest.requireActual('../useCustomToast'),
  __esModule: true,
  mockToast,
  useCustomToast: jest.fn().mockReturnValue(mockToast),
};
