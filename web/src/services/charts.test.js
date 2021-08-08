import { expect } from 'chai';

import { getDataForChart } from './charts';

describe('When formatting the data for a chart', () => {
  it('it is returned in the correct format', () => {
    const materialCount = {
      gravel: 4,
      concrete: 10,
      other: 2,
    };

    expect(getDataForChart(materialCount)).to.deep.equal([
      { name: 'gravel', count: 4 },
      { name: 'concrete', count: 10 },
      { name: 'other', count: 2 },
    ]);
  });
});
