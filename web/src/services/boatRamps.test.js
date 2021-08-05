import { getCentroid } from './boatRamps';
import { expect } from 'chai';

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
