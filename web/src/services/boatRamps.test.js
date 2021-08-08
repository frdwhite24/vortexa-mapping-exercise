import { expect } from 'chai';

import {
  getCentroid,
  getMaterialsCount,
  getAreaRange,
  getAreaRangesCount,
  isWithinBounds,
} from './boatRamps';

describe('Getting the centre of a polygon', () => {
  it('returns the correct values for simple case', () => {
    const coords = [
      [
        [
          [1, 1],
          [0, 1],
          [0, 0],
          [1, 0],
        ],
      ],
    ];
    expect(getCentroid(coords)).to.deep.equal({ lng: 0.5, lat: 0.5 });
  });

  it('returns the correct values for real case', () => {
    const coords = [
      [
        [
          [153.35732722988723, -27.882479845213826],
          [153.35732761975348, -27.8825986197843],
          [153.3572877478754, -27.882599896666484],
          [153.35728392552318, -27.882481852275653],
          [153.35732722988723, -27.882479845213826],
        ],
      ],
    ];
    expect(getCentroid(coords)).to.deep.equal({
      lng: 153.3573107505853,
      lat: -27.882528011830818,
    });
  });

  it('returns the correct values for zero case', () => {
    const coords = [
      [
        [
          [0, 0],
          [0, 0],
          [0, 0],
        ],
      ],
    ];
    expect(getCentroid(coords)).to.deep.equal({
      lng: 0,
      lat: 0,
    });
  });
});

describe('Getting the boat ramp count by material', () => {
  it('returns the correct values for simple case', () => {
    const boatRamps = [
      { properties: { material: 'gravel' } },
      { properties: { material: 'gravel' } },
      { properties: { material: 'gravel' } },
      { properties: { material: 'concrete' } },
      { properties: { material: 'concrete' } },
      { properties: { material: 'gravel' } },
      { properties: { material: 'earth' } },
      { properties: { material: 'other' } },
    ];
    expect(getMaterialsCount(boatRamps)).to.deep.equal({
      gravel: 4,
      concrete: 2,
      earth: 1,
      other: 1,
    });
  });

  it('handles empty case', () => {
    expect(getMaterialsCount([])).to.be.undefined;
  });
});

describe('Getting the area range of an area', () => {
  it('returns correct values for all cases', () => {
    // With jest i'd use the test.each(cases)... syntax, not as familiar with the
    // web-test-runner so will just define these within the same test
    // the only problem with doing it this way is if you're comparing things like
    // bools, you won't know which case has failed
    const cases = [
      [0, 'low [0-50]'],
      [1, 'low [0-50]'],
      [50, 'med [50-200]'],
      [189, 'med [50-200]'],
      [450, 'high [200-526]'],
    ];

    cases.forEach(([area, expectedRange]) => {
      expect(getAreaRange(area)).to.equal(expectedRange);
    });
  });
});

describe('Getting the count of area by range', () => {
  it('returns the correct values for simple case', () => {
    const boatRamps = [
      { properties: { area_: 100 } },
      { properties: { area_: 0 } },
      { properties: { area_: 1 } },
      { properties: { area_: 49 } },
      { properties: { area_: 106 } },
      { properties: { area_: 148 } },
      { properties: { area_: 201 } },
      { properties: { area_: 400 } },
    ];

    expect(getAreaRangesCount(boatRamps)).to.deep.equal({
      'low [0-50]': 3,
      'med [50-200]': 3,
      'high [200-526]': 2,
    });
  });
});

describe('Checking if coord is within bounds', () => {
  it('returns correct values for all cases', () => {
    const cases = [
      [{ lat: 0.5, lng: 0.5 }, { north: 1, south: 0, east: 1, west: 0 }, true],
      [{ lat: 1.5, lng: 0.5 }, { north: 1, south: 0, east: 1, west: 0 }, false],
      [{ lat: 0.5, lng: 1.5 }, { north: 1, south: 0, east: 1, west: 0 }, false],
      [{ lat: 1, lng: 1 }, { north: 1, south: 0, east: 1, west: 0 }, true],
      [{ lat: 1.5, lng: 1.5 }, { north: 1, south: 0, east: 1, west: 0 }, false],
    ];

    cases.forEach(([coord, bounds, expectedValue]) => {
      expect(isWithinBounds(coord, bounds)).to.equal(expectedValue);
    });
  });
});
