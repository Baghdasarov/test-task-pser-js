import { getUtcYearAndWeekNumber, roundToTop } from '../../helpers/utils.mjs'

describe('roundToTop', () => {
  it('rounds up a positive number to the nearest specified decimal place', () => {
    expect(roundToTop(5.234, 2)).toBe(5.24)
    expect(roundToTop(5.238, 2)).toBe(5.24)
    expect(roundToTop(5.231, 1)).toBe(5.3)
    expect(roundToTop(5.239, 0)).toBe(6)
  })

  it('rounds up a negative number to the nearest specified decimal place', () => {
    expect(roundToTop(-5.234, 2)).toBe(-5.23)
    expect(roundToTop(-5.238, 2)).toBe(-5.23)
    expect(roundToTop(-5.231, 1)).toBe(-5.2)
    expect(roundToTop(-5.239, 0)).toBe(-5)
  })
})

describe('getUtcYearAndWeekNumber', () => {
  it('returns the correct year and week number for a given date string', () => {
    const dateString = '2023-03-16';
    const expectedOutput = {
      year: 2023,
      weekNumber: 11,
    };
    const actualOutput = getUtcYearAndWeekNumber(dateString);
    expect(actualOutput).toEqual(expectedOutput);
  });

  it('returns the correct year and week number for a date string in a different year', () => {
    const dateString = '2021-01-01';
    const expectedOutput = {
      year: 2020,
      weekNumber: 53,
    };
    const actualOutput = getUtcYearAndWeekNumber(dateString);
    expect(actualOutput).toEqual(expectedOutput);
  });

  it('returns the correct year and week number for a date string in a different month', () => {
    const dateString = '2023-02-01';
    const expectedOutput = {
      year: 2023,
      weekNumber: 5,
    };
    const actualOutput = getUtcYearAndWeekNumber(dateString);
    expect(actualOutput).toEqual(expectedOutput);
  });
});

