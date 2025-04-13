/**
 * @jest-environment jsdom
 */
test('jsdom should have document and window objects', () => {
  expect(document).toBeDefined();
  expect(window).toBeDefined();
  expect(document.createElement('div')).toBeTruthy();
});